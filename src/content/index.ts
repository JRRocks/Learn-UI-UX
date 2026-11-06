/**
 * The content as the app sees it. Two layers:
 * - the light index (always loaded, a few kilobytes): lessons, exercises and flashcards by id, with
 *   what menus, counts, sessions and badges need — written by the build from the lessons
 *   (src/content/derive.ts, scripts/vite-plugins.mjs);
 * - the lessons themselves, one chunk each, downloaded when a page needs them (`useModule`,
 *   `useExercises`), plus two small chunks: every flashcard text and every true/false statement.
 *   A page that no service worker stores downloads them all in the background (`preloadContent`).
 */
import INDEX from 'virtual:content/index';
import type { Exercise, KeyRule, ModuleContent, TrueFalseExercise } from '../engine/types';
import { load, useLoadState, type LoadState } from '../lib/useLoad';
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

/** One lesson, in full; its exercises name their module. Fetched once per visit. */
export function loadModule(id: string): Promise<ModuleContent> {
  const importer = LOADERS.get(id);
  if (!importer) return Promise.reject(new Error(`Leçon inconnue : ${id}`));
  return load(`module:${id}`, async () => {
    const m = withModuleIds((await importer()).default);
    LOADED.set(id, m);
    for (const e of m.exercises) EXERCISE_CACHE.set(e.id, e);
    return m;
  });
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

/** Resolves in an idle moment of the page (or after a short delay where the browser cannot tell). */
const idle = () =>
  new Promise<void>((resolve) => {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(() => resolve(), { timeout: 2000 });
    else setTimeout(resolve, 50);
  });

/**
 * Download every flashcard text, every statement and every lesson (in curriculum order) and keep
 * them in memory, so that the lessons, sessions, flashcards and the timed challenge no longer need
 * the network: for a page that no service worker stores. Two downloads at a time, each started in an
 * idle moment, so a view asked for meanwhile is not queued behind them all and no lesson is read
 * while the page is busy.
 *
 * The browser keeps a module that failed to download as failed until the page is reloaded: so
 * nothing starts offline, and the first failure (a dropped connection) stops the rest, which starts
 * again once the browser says it is back online. Whatever is left is downloaded when a view needs it.
 */
export function preloadContent(): Promise<void> {
  const jobs: (() => Promise<unknown>)[] = [() => load(ALL_RULE_TEXTS, allRuleTexts), () => load(STATEMENTS, allStatements)];
  for (const m of MODULES) if (LOADERS.has(m.id)) jobs.push(() => loadModule(m.id));
  const run = async (): Promise<void> => {
    let stopped = false;
    const lane = async () => {
      while (jobs.length && !stopped) {
        await idle();
        const job = !stopped && navigator.onLine ? jobs.shift() : undefined;
        if (!job) return;
        await job().catch(() => {
          stopped = true;
        });
      }
    };
    await Promise.all([lane(), lane()]);
    if (jobs.length) window.addEventListener('online', () => void run(), { once: true });
  };
  return run();
}
