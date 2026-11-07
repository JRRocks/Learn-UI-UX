/**
 * The content as the app sees it. Two layers:
 * - the light index (always loaded, a few kilobytes): lessons, exercises and flashcards by id, with
 *   what menus, counts, sessions and badges need — written by the build from the lessons
 *   (src/content/derive.ts, scripts/vite-plugins.mjs);
 * - the lessons themselves, one chunk each, downloaded when a page needs them (`useModule`,
 *   `useExercises`), plus two small chunks: every flashcard text and every true/false statement.
 *   A page that no service worker stores downloads them all in the background (`preloadContent`),
 *   with the markets, the anti-pattern catalog and the fonts.
 */
import INDEX from 'virtual:content/index';
import type { Exercise, KeyRule, ModuleContent, TrueFalseExercise } from '../engine/types';
import { load, useLoadState, type LoadState } from '../lib/useLoad';
import { loadCatalog } from './catalog';
import { loadCultures } from './cultures';
import { fileId, withModuleIds, type ExerciseEntry, type ModuleSummary } from './derive';

export { CATEGORIES, MODULE_ORDER } from './order';
export type { ExerciseEntry, ModuleSummary, RuleCard } from './derive';

/* ---------------------------------------------------------------- light index */

export const MODULES: ModuleSummary[] = INDEX.modules;

export const MODULE_BY_ID = new Map(MODULES.map((m) => [m.id, m]));

export const EXERCISES: ExerciseEntry[] = INDEX.exercises;

export const EXERCISE_BY_ID = new Map(EXERCISES.map((e) => [e.id, e]));

/** A flashcard's address: its lesson and its rule. The text comes with `useRuleTexts`. */
export interface RuleRef {
  key: string;
  moduleId: string;
  ruleId: string;
}

export const RULE_CARDS: RuleRef[] = MODULES.flatMap((m) => m.rules.map((ruleId) => ({ key: `${m.id}/${ruleId}`, moduleId: m.id, ruleId })));

export const RULE_CARD_BY_KEY = new Map(RULE_CARDS.map((c) => [c.key, c]));

const BY_MODULE = new Map<string, ExerciseEntry[]>();
for (const e of EXERCISES) {
  const list = BY_MODULE.get(e.module);
  if (list) list.push(e);
  else BY_MODULE.set(e.module, [e]);
}

export function exercisesOf(moduleId: string): ExerciseEntry[] {
  return BY_MODULE.get(moduleId) ?? [];
}

/* ---------------------------------------------------------------- lessons, on demand */

const files = import.meta.glob<{ default: ModuleContent }>('./modules/*.ts');
const LOADERS = new Map(Object.entries(files).map(([path, importer]) => [fileId(path), importer]));
const LOADED = new Map<string, ModuleContent>();
const EXERCISE_CACHE = new Map<string, Exercise>();

/** Reads one lesson from its chunk and keeps it, with its exercises, at hand. */
function lessonReader(id: string): (() => Promise<ModuleContent>) | undefined {
  const importer = LOADERS.get(id);
  if (!importer) return undefined;
  return async () => {
    const m = withModuleIds((await importer()).default);
    LOADED.set(id, m);
    for (const e of m.exercises) EXERCISE_CACHE.set(e.id, e);
    return m;
  };
}

/** One lesson, in full; its exercises name their module. Fetched once per visit. */
export function loadModule(id: string): Promise<ModuleContent> {
  const read = lessonReader(id);
  return read ? load(`module:${id}`, read) : Promise.reject(new Error(`Leçon inconnue : ${id}`));
}

export function useModule(id: string): LoadState<ModuleContent> {
  return useLoadState(`module:${id}`, () => loadModule(id), () => LOADED.get(id));
}

/** The lessons the given exercises come from, in order of first appearance. */
const modulesOf = (ids: readonly string[]) => [...new Set(ids.map((id) => EXERCISE_BY_ID.get(id)?.module).filter((m): m is string => Boolean(m)))];

function exercisesById(ids: readonly string[]): Map<string, Exercise> | undefined {
  const out = new Map<string, Exercise>();
  for (const id of ids) {
    const e = EXERCISE_CACHE.get(id);
    if (e) out.set(id, e);
    else if (EXERCISE_BY_ID.has(id)) return undefined;
  }
  return out;
}

/** The full exercises (prompt, options, visuals, explanation) of the given ids, once their lessons are downloaded. */
export function useExercises(ids: readonly string[]): LoadState<Map<string, Exercise>> {
  const mods = modulesOf(ids);
  return useLoadState(
    `exercises:${[...ids].sort().join(',')}`,
    async () => {
      await Promise.all(mods.map(loadModule));
      return exercisesById(ids) ?? new Map();
    },
    () => exercisesById(ids),
  );
}

/** Download the lessons of these exercises in the background (the rest of a session, while the first one is answered). */
export function preloadExercises(ids: readonly string[]): void {
  for (const m of modulesOf(ids)) loadModule(m).catch(() => {});
}

/* ---------------------------------------------------------------- flashcards and statements */

const ALL_RULE_TEXTS = 'rules:*';
const allRuleTexts = async () => new Map((await import('virtual:content/rules')).default.map((c) => [c.key, c.rule]));

const STATEMENTS = 'statements';
const allStatements = async () => new Map((await import('virtual:content/statements')).default.map((s) => [s.id, s]));

/**
 * The text of the flashcards: those of one lesson (often downloaded already, from its page), or all
 * of them (one small chunk, rather than every lesson).
 */
export function useRuleTexts(moduleId: string | null): LoadState<Map<string, KeyRule>> {
  return useLoadState(
    moduleId ? `rules:${moduleId}` : ALL_RULE_TEXTS,
    moduleId ? async () => new Map((await loadModule(moduleId)).rules.map((r) => [`${moduleId}/${r.id}`, r])) : allRuleTexts,
    () => {
      const m = moduleId ? LOADED.get(moduleId) : undefined;
      return m ? new Map(m.rules.map((r) => [`${m.id}/${r.id}`, r])) : undefined;
    },
  );
}

/** Every true/false statement, for the timed challenge (one small chunk). */
export function useStatements(): LoadState<Map<string, TrueFalseExercise>> {
  return useLoadState(STATEMENTS, allStatements);
}

/* ---------------------------------------------------------------- everything, in the background */

/**
 * The addresses of the files downloaded on demand, which the build writes into the page
 * (scripts/vite-plugins.mjs, `deepLinks`). Absent in development.
 */
interface ContentFiles {
  /** The chunk each route needs: `apprendre/<lesson id>`, `cultures`, `ressources/anti-patterns`. */
  routes: Record<string, string | null>;
  /** Every flashcard text; every true/false statement. */
  rules: string | null;
  statements: string | null;
  /** Every font file: each face (normal, italic, monospace) in each subset (latin, latin-ext). */
  fonts: string[];
}

declare global {
  interface Window {
    __contentFiles?: ContentFiles;
  }
}

/**
 * How a background download went: done (or not needed); cut by a dropped connection or a server
 * error, to be tried again; gone, the files of this version being no longer online (a newer version
 * replaced them); failed, the browser keeping that failure until the page is reloaded.
 */
type Outcome = 'done' | 'cut' | 'gone' | 'failed';

class NotDownloaded extends Error {
  constructor(readonly outcome: 'cut' | 'gone') {
    super(`Téléchargement interrompu (${outcome})`);
  }
}

/** Downloads a file in full into the browser's cache, where an import() of it then finds it. */
async function download(url: string): Promise<'done' | 'cut' | 'gone'> {
  try {
    const res = await fetch(url);
    if (!res.ok) return res.status === 404 || res.status === 410 ? 'gone' : 'cut';
    await res.arrayBuffer();
    return 'done';
  } catch {
    return 'cut';
  }
}

/**
 * A part of the content, kept in memory under the key its views use. Unless it is in memory already,
 * or a view is downloading it, its file is downloaded first and only then imported: the browser keeps
 * a failed import() as failed until the page is reloaded, a failed download not. A dropped connection
 * then costs a new try, never the part.
 */
function part(key: string, read: () => Promise<unknown>, url: string | null | undefined): () => Promise<Outcome> {
  return () =>
    load(key, async () => {
      const got = url ? await download(url) : 'done';
      if (got !== 'done') throw new NotDownloaded(got);
      return read();
    }).then(
      () => 'done' as const,
      (error: unknown) => (error instanceof NotDownloaded ? error.outcome : 'failed'),
    );
}

/**
 * The faces of the fonts that no text has needed yet (italics, monospace, accented letters): their
 * files first, then the faces, which find them in the browser's cache (a face that failed to load
 * stays failed, as an import does).
 */
async function loadFonts(urls: readonly string[]): Promise<Outcome> {
  for (const url of urls) {
    const got = await download(url);
    if (got !== 'done') return got;
  }
  const faces = [...document.fonts].filter((face) => face.status === 'unloaded');
  return Promise.all(faces.map((face) => face.load())).then(
    () => 'done' as const,
    () => 'failed' as const,
  );
}

/** Resolves in an idle moment of the page (or after a short delay where the browser cannot tell). */
const idle = () =>
  new Promise<void>((resolve) => {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(() => resolve(), { timeout: 2000 });
    else setTimeout(resolve, 50);
  });

/** After a dropped connection, the next try: 15 s later, then 1 min, then every 5 min. */
const RETRY_MS = [15_000, 60_000, 300_000];

/** Calls `again` once: when the browser says it is back online, when the page is shown again, or after `ms`. */
function whenBack(again: () => void, ms: number): void {
  const go = () => {
    clearTimeout(timer);
    window.removeEventListener('online', go);
    document.removeEventListener('visibilitychange', shown);
    again();
  };
  const shown = () => {
    if (document.visibilityState === 'visible') go();
  };
  const timer = setTimeout(go, ms);
  window.addEventListener('online', go);
  document.addEventListener('visibilitychange', shown);
}

/**
 * Download every flashcard text, every statement, every lesson (in curriculum order), the markets,
 * the anti-pattern catalog and the other faces of the fonts, and keep them in memory, so that no view
 * needs the network any more: for a page that no service worker stores. Two downloads at a time,
 * each started in an idle moment, so a view asked for meanwhile is not queued behind them all and no
 * lesson is read while the page is busy.
 *
 * Nothing starts offline. A dropped connection stops the downloads, which start again where they
 * stopped (`whenBack`): the browser does not always notice the drop (a weak signal, a server out of
 * reach), so no 'online' event may ever come. Whatever is left is downloaded when a view needs it.
 */
export function preloadContent(): Promise<void> {
  const files = window.__contentFiles;
  const routes = files?.routes ?? {};
  const jobs = [part(ALL_RULE_TEXTS, allRuleTexts, files?.rules), part(STATEMENTS, allStatements, files?.statements)];
  for (const m of MODULES) {
    const read = lessonReader(m.id);
    if (read) jobs.push(part(`module:${m.id}`, read, routes[`apprendre/${m.id}`]));
  }
  // The keys of the markets' views (useCultures, useCultureData) and of the catalog tab.
  jobs.push(part('cultures', loadCultures, routes.cultures), part('catalog', loadCatalog, routes['ressources/anti-patterns']));
  if (files?.fonts.length) jobs.push(() => loadFonts(files.fonts));
  let backoff = 0;
  const run = async (): Promise<void> => {
    let stopped = false;
    let progressed = false;
    const lane = async () => {
      while (jobs.length && !stopped) {
        await idle();
        const job = !stopped && navigator.onLine ? jobs.shift() : undefined;
        if (!job) return;
        const outcome = await job();
        if (outcome === 'done') progressed = true;
        else if (outcome === 'cut') {
          // Never imported, so not failed for good: first in line next time.
          jobs.unshift(job);
          stopped = true;
        } else if (outcome === 'gone') jobs.length = 0;
        // 'failed': the browser keeps that failure until the page is reloaded; the rest goes on.
      }
    };
    await Promise.all([lane(), lane()]);
    if (!jobs.length) return;
    if (progressed) backoff = 0;
    whenBack(() => void run(), RETRY_MS[backoff]);
    backoff = Math.min(backoff + 1, RETRY_MS.length - 1);
  };
  return run();
}
