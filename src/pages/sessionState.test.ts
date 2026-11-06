import { describe, expect, it } from 'vitest';
import { scheduleExercise } from '../engine/srs';
import { seeded } from '../engine/random';
import {
  answeredCurrent,
  isUnfinished,
  newRunId,
  parseRun,
  routeOf,
  scoreParts,
  seedOf,
  summaryMessage,
  tally,
  withRun,
  type Played,
  type Run,
} from './sessionState';

const known = (id: string) => ['a', 'b', 'c'].includes(id);
const p = (id: string, verdict: Played['verdict'] = 'correct', xp = 10): Played => ({ id, verdict, score: verdict === 'correct' ? 1 : 0, xp, draft: { type: 'truefalse', value: true } });
const run = (over: Partial<Run> = {}): Run => ({ route: '/session?mode=review', ids: ['a', 'b', 'c'], index: 0, played: [], t: 1, ...over });

describe('saved session runs', () => {
  it('never restores an empty run (logic-1)', () => {
    expect(parseRun(run({ ids: [] }), known)).toBeNull();
  });

  it('rejects broken or foreign data', () => {
    expect(parseRun(null, known)).toBeNull();
    expect(parseRun('x', known)).toBeNull();
    expect(parseRun(run({ ids: ['a', 'gone'] }), known)).toBeNull();
    expect(parseRun(run({ route: '/apprendre' }), known)).toBeNull();
    expect(parseRun({ ...run(), index: 1.5 }, known)).toBeNull();
    expect(parseRun({ ...run(), index: 4 }, known)).toBeNull();
    expect(parseRun({ ...run(), played: 'nope' }, known)).toBeNull();
    expect(parseRun({ ...run(), played: [{ id: 'a', verdict: 'maybe', score: 1, xp: 1 }] }, known)).toBeNull();
  });

  it('keeps answers in step with the position (logic-2)', () => {
    // Answered ahead of the position by more than the exercise on screen: corrupted.
    expect(parseRun(run({ index: 0, played: [p('a'), p('b')] }), known)).toBeNull();
    // Fewer answers than exercises passed: corrupted.
    expect(parseRun(run({ index: 2, played: [p('a')] }), known)).toBeNull();
    // Answers out of order: corrupted.
    expect(parseRun(run({ index: 1, played: [p('b')] }), known)).toBeNull();
    // On screen and answered (its correction showing): kept, flagged as answered.
    const shown = parseRun(run({ index: 0, played: [p('a')] }), known);
    expect(shown && answeredCurrent(shown)).toBe(true);
    // Finished: every exercise answered.
    expect(parseRun(run({ index: 3, played: [p('a'), p('b'), p('c')], recorded: true }), known)?.recorded).toBe(true);
  });

  it('offers to resume started, unfinished runs only', () => {
    expect(isUnfinished(run())).toBe(false);
    expect(isUnfinished(run({ index: 0, played: [p('a')] }))).toBe(true);
    expect(isUnfinished(run({ index: 3, played: [p('a'), p('b'), p('c')] }))).toBe(false);
  });

  it('names a run in its route, and an entry link has no name (logic-12)', () => {
    expect(withRun('/session?mode=module&id=color', 'k3x9')).toBe('/session?mode=module&id=color&run=k3x9');
    expect(withRun('/session?mode=daily&run=old&n=123', 'new1')).toBe('/session?mode=daily&run=new1');
    expect(routeOf('/session?mode=daily&run=abc&n=1')).toBe('/session?mode=daily');
    expect(routeOf('/session')).toBe('/session');
    expect(newRunId(seeded(4))).toMatch(/^[0-9a-z]{8}$/);
  });

  it('seeds the option order per run and position', () => {
    expect(seedOf('abc', 2)).toBe(seedOf('abc', 2));
    expect(seedOf('abc', 2)).not.toBe(seedOf('abc', 3));
    expect(seedOf('abc', 2)).not.toBe(seedOf('abd', 2));
  });
});

describe('session summary', () => {
  it('counts verdicts and leaves zero counts out', () => {
    const t = tally([p('a'), p('b', 'partial', 4)]);
    expect(t).toEqual({ total: 2, correct: 1, partial: 1, wrong: 0, xp: 14 });
    expect(scoreParts(t)).toEqual(['1 juste', '1 presque']);
    expect(scoreParts(tally([p('a', 'partial'), p('b', 'partial')]))).toEqual(['2 presque']);
    expect(scoreParts(tally([p('a'), p('b'), p('c', 'wrong', 1)]))).toEqual(['2 justes', '1 à reprendre']);
  });

  it('tells when the missed exercises come back, as the scheduling does (logic-19)', () => {
    const today = '2026-11-06';
    // A wrong answer is due again today; a partial one tomorrow at the earliest.
    expect(scheduleExercise(undefined, 'wrong', today).due).toBe(today);
    expect(scheduleExercise(undefined, 'partial', today).due).toBe('2026-11-07');

    const wrong = summaryMessage(tally([p('a'), p('b'), p('c', 'wrong', 1)]));
    expect(wrong).toContain('révisions du jour');
    expect(wrong).not.toContain('demain');
    const flop = summaryMessage(tally([p('a', 'wrong', 1), p('b', 'wrong', 1)]));
    expect(flop).toMatch(/^Les épreuves ratées sont déjà dans tes révisions du jour\./);
    const partial = summaryMessage(tally([p('a'), p('b', 'partial', 4)]));
    expect(partial).toContain('prochains jours');
    expect(partial).not.toContain('ratée');
    expect(summaryMessage(tally([p('a')]))).toMatch(/^Sans faute\./);
  });

  it('uses French typography', () => {
    expect(summaryMessage(tally([p('a'), p('b'), p('c'), p('a'), p('b', 'wrong', 1)]))).toContain('corrections :');
  });
});
