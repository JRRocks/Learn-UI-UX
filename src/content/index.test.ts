import { afterEach, describe, expect, it, vi } from 'vitest';
import RULES from 'virtual:content/rules';
import STATEMENTS from 'virtual:content/statements';
import { newBadges } from '../engine/badges';
import { emptyProgress, recordAttempt, type ProgressState } from '../engine/progress';
import { seeded } from '../engine/random';
import { buildSession, isDuel, matchesType, type PracticeType, type SessionSpec } from '../engine/session';
import type { ModuleContent } from '../engine/types';
import { load } from '../lib/useLoad';
import { ALL_MODULES } from './all';
import { ANTIPATTERNS } from './antipatterns';
import { CULTURES } from './cultures/profiles';
import { contentIndex, fileId, modulesFromFiles, ruleCards, statements } from './derive';
import { EXERCISES, EXERCISE_BY_ID, MODULES, RULE_CARDS, exercisesOf, loadModule, preloadContent } from './index';
import { MODULE_ORDER, THEMES } from './order';

/**
 * The light index is written by the build from the lessons (scripts/vite-plugins.mjs). These tests
 * check that what the app receives matches the lessons as they are on disk, and that everything the
 * app computes from the index (sessions, counts, badges) comes out as it would from the full content.
 */
const FULL = ALL_MODULES.flatMap((m) => m.exercises);

describe('light index', () => {
  it('is what the lessons give, as the build serves it', () => {
    expect({ modules: MODULES, exercises: EXERCISES }).toEqual(contentIndex(ALL_MODULES));
    expect(RULES).toEqual(ruleCards(ALL_MODULES));
    expect(STATEMENTS).toEqual(statements(ALL_MODULES));
  });

  it('lists the lessons in curriculum order', () => {
    const known = MODULES.map((m) => m.id).filter((id) => MODULE_ORDER.includes(id));
    expect(known).toEqual(MODULE_ORDER.filter((id) => known.includes(id)));
    expect(MODULES).toHaveLength(ALL_MODULES.length);
  });

  it('puts every lesson in exactly one theme, and every theme’s lessons on disk', () => {
    const onDisk = ALL_MODULES.map((m) => m.id);
    const listed = THEMES.flatMap((t) => t.modules);
    expect([...listed].sort()).toEqual([...onDisk].sort());
    expect(new Set(listed).size).toBe(listed.length);
    for (const m of MODULES) expect(THEMES.find((t) => t.modules.includes(m.id))?.id).toBe(m.theme);
  });

  it('lists every exercise with its lesson, type, difficulty, market and duel flag', () => {
    expect(EXERCISES.map((e) => e.id)).toEqual(FULL.map((e) => e.id));
    for (const e of FULL) {
      const entry = EXERCISE_BY_ID.get(e.id);
      expect(entry).toMatchObject({ module: e.module, type: e.type, difficulty: e.difficulty, duel: isDuel(e) });
      expect(entry?.culture).toBe(e.culture);
      if (e.type === 'truefalse') expect(entry?.answer).toBe(e.answer);
      for (const t of ['duel', 'choice', 'multi', 'truefalse', 'hotspot', 'order', 'match', 'slider', 'grid'] as PracticeType[])
        expect(matchesType(entry!, t)).toBe(matchesType(e, t));
    }
    for (const m of ALL_MODULES) expect(exercisesOf(m.id).map((e) => e.id)).toEqual(m.exercises.map((e) => e.id));
  });

  it('lists every flashcard', () => {
    expect(RULE_CARDS.map((c) => c.key)).toEqual(ALL_MODULES.flatMap((m) => m.rules.map((r) => `${m.id}/${r.id}`)));
  });

  it('holds plain data only, written as JSON by the build', () => {
    expect(JSON.parse(JSON.stringify(ALL_MODULES))).toEqual(ALL_MODULES);
  });
});

describe('sessions and badges from the light index', () => {
  // Some answers: wrong and due, right and due, right and scheduled later.
  let state: ProgressState = emptyProgress();
  FULL.slice(0, 60).forEach((e, i) => {
    state = recordAttempt(state, e, { verdict: i % 3 ? 'correct' : 'wrong', score: i % 3 ? 1 : 0 }, new Date(2026, 9, 1 + (i % 20))).state;
  });
  state = { ...state, lessons: { typography: '2026-10-02', color: '2026-10-03' } };
  const now = new Date(2026, 9, 27);
  const cultures = [...new Set(FULL.map((e) => e.culture).filter((c): c is string => Boolean(c)))];
  const specs: SessionSpec[] = [
    { kind: 'daily' },
    { kind: 'review' },
    { kind: 'mistakes' },
    { kind: 'exam' },
    { kind: 'culture' },
    ...cultures.map((cultureId) => ({ kind: 'culture' as const, cultureId })),
    ...ALL_MODULES.map((m) => ({ kind: 'module' as const, moduleId: m.id })),
    ...(['duel', 'choice', 'multi', 'truefalse', 'hotspot', 'order', 'match', 'slider', 'grid'] as PracticeType[]).map((type) => ({ kind: 'type' as const, type })),
  ];

  it('draws the same exercises as the full content', () => {
    for (const spec of specs)
      for (const seed of [1, 2, 3]) {
        const light = buildSession(spec, EXERCISES, state, seeded(seed), now).map((e) => e.id);
        const full = buildSession(spec, FULL, state, seeded(seed), now).map((e) => e.id);
        expect(light, JSON.stringify(spec)).toEqual(full);
      }
  });

  it('awards the same badges', () => {
    let s = state;
    for (const e of FULL) s = recordAttempt(s, e, { verdict: 'correct', score: 1 }, now).state;
    const ids = ALL_MODULES.map((m) => m.id);
    expect(newBadges(s, { exercises: EXERCISES, moduleIds: ids }).map((b) => b.id)).toEqual(newBadges(s, { exercises: FULL, moduleIds: ids }).map((b) => b.id));
  });
});

describe('lessons on demand', () => {
  it('loads a lesson in full, its exercises naming it', async () => {
    const m = await loadModule('typography');
    expect(m).toEqual(ALL_MODULES.find((x) => x.id === 'typography'));
  });

  it('refuses a lesson it does not know', async () => {
    await expect(loadModule('nope')).rejects.toThrow();
  });

  it('needs the id of a lesson to be its file name', () => {
    const m = { ...ALL_MODULES[0], id: 'autre' } as ModuleContent;
    expect(fileId('./modules/craft-floor.ts')).toBe('craft-floor');
    expect(() => modulesFromFiles({ './modules/craft-floor.ts': { default: m } })).toThrow(/nom du fichier/);
  });
});

describe('everything in the background (a page that no service worker stores)', () => {
  afterEach(() => vi.unstubAllGlobals());
  // `load` resolves at once with what is in memory; otherwise it runs this loader, which fails.
  const absent = () => Promise.reject(new Error('absent'));
  const atHand = async () => {
    const lessons = await Promise.all(MODULES.map((m) => load(`module:${m.id}`, absent)));
    const cards = await load<Map<string, unknown>>('rules:*', absent);
    const tf = await load<Map<string, unknown>>('statements', absent);
    const markets = await load<{ profiles: unknown[] }>('cultures', absent);
    const catalog = await load<unknown[]>('catalog', absent);
    return { lessons: lessons.map((m) => (m as ModuleContent).id), cards: cards.size, statements: tf.size, markets: markets.profiles.length, catalog: catalog.length };
  };
  const ALL = { lessons: MODULES.map((m) => m.id), cards: RULES.length, statements: STATEMENTS.length, markets: CULTURES.length, catalog: ANTIPATTERNS.length };

  it('starts nothing offline, and downloads every lesson, flashcard, statement, market and the catalog once back online', async () => {
    const browser = { onLine: false };
    let online: (() => void) | undefined;
    vi.stubGlobal('navigator', browser);
    vi.stubGlobal('window', { addEventListener: (type: string, fn: () => void) => type === 'online' && (online = fn), removeEventListener: () => {} });
    vi.stubGlobal('document', { visibilityState: 'visible', addEventListener: () => {}, removeEventListener: () => {} });
    await preloadContent();
    await expect(load('statements', absent)).rejects.toThrow('absent');
    expect(online).toBeTypeOf('function');
    browser.onLine = true;
    online?.();
    await vi.waitFor(async () => expect(await atHand()).toEqual(ALL), { timeout: 10000, interval: 200 });
  }, 15000);
});
