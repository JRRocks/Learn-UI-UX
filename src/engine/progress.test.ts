import { describe, expect, it } from 'vitest';
import { newBadges } from './badges';
import {
  SESSION_HISTORY,
  addSession,
  dueCardKeys,
  dueExerciseIds,
  emptyProgress,
  normalizeProgress,
  parseBackup,
  recordAttempt,
  recordCard,
  streak,
  type SessionRecord,
} from './progress';
import { scheduleCard } from './srs';
import type { Exercise } from './types';

const ex: Exercise = {
  id: 'm-choice',
  module: 'm',
  type: 'choice',
  difficulty: 1,
  prompt: 'q',
  explanation: 'e',
  takeaway: 't',
  options: [
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
  ],
  answer: 'b',
};

const session = (i: number): SessionRecord => ({
  id: String(i),
  at: '2026-10-27T10:00:00.000Z',
  kind: 'daily',
  label: 'Session du jour',
  total: 10,
  correct: 8,
  partial: 1,
  xp: 90,
  missed: [],
});

/** What « Exporter ma progression » writes: the stored state as JSON. */
function exported() {
  let s = emptyProgress();
  s = recordAttempt(s, ex, { verdict: 'correct', score: 1 }, new Date(2026, 9, 26)).state;
  s = recordCard(s, 'm/r1', 2, new Date(2026, 9, 26));
  s = addSession(s, session(1));
  return JSON.parse(JSON.stringify(s)) as unknown;
}

describe('importing a backup', () => {
  it('accepts a file written by the export', () => {
    const data = parseBackup(exported());
    expect(data).not.toBeNull();
    expect(data?.xp).toBe(12);
    expect(Object.keys(data?.items ?? {})).toEqual(['m-choice']);
    expect(data?.sessionsDone).toBe(1);
  });

  it('accepts an older backup without the newer keys', () => {
    const old = { version: 1, xp: 40, days: {}, items: {}, cards: {}, lessons: {}, badges: {}, sessions: [], settings: { theme: 'dark', dailyGoal: 100 } };
    expect(parseBackup(old)?.settings).toEqual({ theme: 'dark', dailyGoal: 100 });
  });

  it('refuses any JSON that is not a backup, so nothing gets replaced', () => {
    const pkg = { name: 'learn-ui-ux', version: '1.0.0', private: true, scripts: {}, dependencies: {} };
    for (const raw of [pkg, [], [1, 2, 3], null, 42, 'hello', {}, { version: 2, xp: 0, items: {}, days: {}, cards: {} }])
      expect(parseBackup(raw)).toBeNull();
    expect(parseBackup({ version: 1, xp: '100', items: {}, days: {}, cards: {} })).toBeNull();
    expect(parseBackup({ version: 1, xp: 100, items: [], days: {}, cards: {} })).toBeNull();
    expect(parseBackup({ version: 1, xp: 100, items: {}, days: {}, cards: {}, sessions: {} })).toBeNull();
  });
});

describe('normalizing stored progress', () => {
  it('drops damaged entries one by one instead of crashing the app', () => {
    const broken = {
      version: 1,
      xp: 640,
      items: { 'typography-measure-duel': null, ok: { seen: 2, correct: 1, box: 1, due: '2026-10-27', last: 'correct' }, bad: { due: 'demain' } },
      cards: { 'm/r1': null, 'm/r2': { ease: 2.5, interval: 1, reps: 1, due: '2026-10-28' } },
      days: { '2026-10-27': 5, '2026-10-26': { xp: 30, answered: 3, correct: 2 }, nope: { xp: 1 } },
      sessions: [null, 'x', session(1)],
      lessons: { typography: '2026-10-20', color: 12 },
      badges: { 'first-step': '2026-10-20', bad: {} },
      records: { blitz: 14, other: 'beaucoup' },
      settings: { theme: 'neon', dailyGoal: 0 },
    };
    const s = normalizeProgress(broken);
    expect(Object.keys(s.items)).toEqual(['ok']);
    expect(Object.keys(s.cards)).toEqual(['m/r2']);
    expect(s.days).toEqual({ '2026-10-26': { xp: 30, answered: 3, correct: 2 } });
    expect(s.sessions).toHaveLength(1);
    expect(s.lessons).toEqual({ typography: '2026-10-20' });
    expect(s.badges).toEqual({ 'first-step': '2026-10-20' });
    expect(s.records).toEqual({ blitz: 14 });
    expect(s.settings).toEqual({ theme: 'system', dailyGoal: 60 });

    // Everything the home page computes from it works.
    const today = '2026-10-27';
    expect(dueExerciseIds(s, today)).toEqual(['ok']);
    expect(dueCardKeys(s, today)).toEqual([]);
    expect(() => newBadges(s, { exercises: [ex], moduleIds: ['m'] })).not.toThrow();
    expect(streak(s, new Date(2026, 9, 27)).current).toBe(1);
    const after = recordAttempt(s, ex, { verdict: 'correct', score: 1 }, new Date(2026, 9, 27)).state;
    expect(after.days[today]).toEqual({ xp: 10, answered: 1, correct: 1 });
  });

  it('fills missing fields of an entry with safe values', () => {
    const s = normalizeProgress({ items: { a: { due: '2026-10-27', box: 99, seen: -3 } }, cards: { k: { due: '2026-10-27', ease: 0 } } });
    expect(s.items.a).toEqual({ seen: 0, correct: 0, box: 6, due: '2026-10-27' });
    expect(s.cards.k).toEqual({ ease: 1.3, interval: 0, reps: 0, due: '2026-10-27' });
  });
});

describe('finished sessions', () => {
  it('counts every session, not only the history kept', () => {
    let s = emptyProgress();
    for (let i = 0; i < 75; i++) s = addSession(s, session(i));
    expect(s.sessions).toHaveLength(SESSION_HISTORY);
    expect(s.sessionsDone).toBe(75);
    expect(normalizeProgress(JSON.parse(JSON.stringify(s))).sessionsDone).toBe(75);
  });

  it('estimates the count of an older save from its history', () => {
    expect(normalizeProgress({ sessions: [session(1), session(2)] }).sessionsDone).toBe(2);
  });
});

describe('due counters', () => {
  it('ignore exercises and cards the content no longer has', () => {
    let s = emptyProgress();
    const now = new Date(2026, 9, 27);
    s = recordAttempt(s, ex, { verdict: 'wrong', score: 0 }, now).state;
    s = recordAttempt(s, { ...ex, id: 'renamed-id' }, { verdict: 'wrong', score: 0 }, now).state;
    s = recordCard(s, 'm/r1', 0, now);
    s = recordCard(s, 'gone/r9', 0, now);
    const today = '2026-10-27';
    expect(dueExerciseIds(s, today)).toHaveLength(2);
    expect(dueExerciseIds(s, today, new Set(['m-choice']))).toEqual(['m-choice']);
    expect(dueCardKeys(s, today, new Map([['m/r1', 1]]))).toEqual(['m/r1']);
  });
});

describe('flashcards', () => {
  it('waits longer after « Facile » than after « Bien », first review included', () => {
    const fresh = { ease: 2.5, interval: 0, reps: 0, due: '2026-10-27' };
    for (const prev of [undefined, fresh, scheduleCard(undefined, 2, '2026-10-20'), scheduleCard(scheduleCard(undefined, 2, '2026-10-10'), 2, '2026-10-11')]) {
      const good = scheduleCard(prev, 2, '2026-10-27');
      const easy = scheduleCard(prev, 3, '2026-10-27');
      expect(easy.interval).toBeGreaterThan(good.interval);
    }
    expect(scheduleCard(undefined, 3, '2026-10-27')).toMatchObject({ interval: 2, due: '2026-10-29' });
  });
});
