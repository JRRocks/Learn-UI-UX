import { dayKey } from './dates';
import type { ProgressState } from './progress';
import { shuffle, type Rng } from './random';
import type { Difficulty, Exercise, ExerciseType } from './types';

/** "duel" = a choice between visuals; it is a mode, not a separate exercise type. */
export type PracticeType = ExerciseType | 'duel';

/**
 * What building a session reads of an exercise. The light index of the content (src/content/index.ts)
 * lists every exercise this way, so a session is drawn before any lesson is downloaded.
 */
export interface ExerciseSummary {
  id: string;
  module?: string;
  type: ExerciseType;
  difficulty: Difficulty;
  culture?: string;
  /** A choice between visuals (see `isDuel`). */
  duel: boolean;
}

/** A full exercise, or its summary in the light index. */
export type SessionItem = Exercise | ExerciseSummary;

/**
 * What a session draws from.
 * - `theme`: training on the lessons of a theme, the exercises to review and the new ones first;
 *   `evaluation`: the same lessons as an exam, drawn evenly from each, corrected at the end.
 * - `culture`: the exercises about one market (`cultureId`), those of the cultures lesson that name
 *   no market (`CULTURE_COMMON`), or all of them.
 */
export type SessionSpec =
  | { kind: 'daily' }
  | { kind: 'module'; moduleId: string }
  | { kind: 'theme'; themeId: string; moduleIds: readonly string[] }
  | { kind: 'evaluation'; themeId: string; moduleIds: readonly string[] }
  | { kind: 'type'; type: PracticeType }
  | { kind: 'review' }
  | { kind: 'mistakes' }
  | { kind: 'exam' }
  | { kind: 'culture'; cultureId?: string };

export const SESSION_SIZE: Record<SessionSpec['kind'], number> = {
  daily: 10,
  module: 12,
  theme: 12,
  evaluation: 20,
  type: 10,
  review: 20,
  mistakes: 20,
  exam: 30,
  culture: 12,
};

/** The lesson that teaches the cultures, and the id of its exercises that name no market. */
export const CULTURE_MODULE = 'culture';
export const CULTURE_COMMON = 'commun';

/** An exercise of a culture session (see `SessionSpec`). */
export function inCulture(ex: SessionItem, cultureId?: string): boolean {
  if (cultureId === CULTURE_COMMON) return ex.module === CULTURE_MODULE && !ex.culture;
  if (cultureId) return ex.culture === cultureId;
  return Boolean(ex.culture) || ex.module === CULTURE_MODULE;
}

/** The sessions that hold back the corrections until their summary. */
export const isExam = (spec: SessionSpec): boolean => spec.kind === 'exam' || spec.kind === 'evaluation';

export function isDuel(ex: SessionItem): boolean {
  if ('duel' in ex) return ex.duel;
  return ex.type === 'choice' && ex.options.length >= 2 && ex.options.every((o) => o.visual);
}

/** "choice" here means the non-visual or 3+ option choices; visual 2-way choices are duels. */
export function matchesType(ex: SessionItem, type: PracticeType): boolean {
  if (type === 'duel') return isDuel(ex);
  if (type === 'choice') return ex.type === 'choice' && !isDuel(ex);
  return ex.type === type;
}

/** 0 = wrong and due, 1 = due, 2 = never seen, 3 = scheduled later. */
function priority(ex: SessionItem, state: ProgressState, today: string): number {
  const s = state.items[ex.id];
  if (!s) return 2;
  if (s.due <= today) return s.last === 'wrong' ? 0 : 1;
  return 3;
}

function byPriority<E extends SessionItem>(pool: E[], state: ProgressState, today: string, rng: Rng): E[] {
  const shuffled = shuffle(pool, rng);
  return shuffled
    .map((ex, i) => ({ ex, i, p: priority(ex, state, today), box: state.items[ex.id]?.box ?? 0 }))
    .sort((a, b) => a.p - b.p || a.box - b.box || a.i - b.i)
    .map((x) => x.ex);
}

/** Take items round-robin across modules so a session is not one topic in a row. */
function spreadAcrossModules<E extends SessionItem>(items: E[], size: number): E[] {
  const groups = new Map<string, E[]>();
  for (const ex of items) {
    const key = ex.module ?? '';
    groups.set(key, [...(groups.get(key) ?? []), ex]);
  }
  const queues = [...groups.values()];
  const out: E[] = [];
  while (out.length < size && queues.some((q) => q.length)) {
    for (const q of queues) {
      const next = q.shift();
      if (next) out.push(next);
      if (out.length >= size) break;
    }
  }
  return out;
}

/** Avoid two exercises of the same type back to back when the mix allows it. */
export function interleaveTypes<E extends SessionItem>(items: E[]): E[] {
  const rest = items.slice();
  const out: E[] = [];
  while (rest.length) {
    const prev = out[out.length - 1];
    const idx = prev ? rest.findIndex((e) => e.type !== prev.type) : 0;
    out.push(...rest.splice(idx === -1 ? 0 : idx, 1));
  }
  return out;
}

/** The exercises of a new session, drawn from `all` (full exercises or their summaries, same result). */
export function buildSession<E extends SessionItem>(
  spec: SessionSpec,
  all: E[],
  state: ProgressState,
  rng: Rng = Math.random,
  now: Date = new Date(),
): E[] {
  const today = dayKey(now);
  const size = SESSION_SIZE[spec.kind];

  switch (spec.kind) {
    case 'module':
      return interleaveTypes(byPriority(all.filter((e) => e.module === spec.moduleId), state, today, rng).slice(0, size));
    case 'type':
      return byPriority(all.filter((e) => matchesType(e, spec.type)), state, today, rng).slice(0, size);
    case 'theme': {
      // Its lessons in turn, so that a session is not one lesson in a row.
      const pool = all.filter((e) => spec.moduleIds.includes(e.module ?? ''));
      return interleaveTypes(spreadAcrossModules(byPriority(pool, state, today, rng), size));
    }
    case 'evaluation': {
      // Stratified like the exam, on the theme's lessons only.
      const pool = all.filter((e) => spec.moduleIds.includes(e.module ?? ''));
      return interleaveTypes(shuffle(spreadAcrossModules(shuffle(pool, rng), size), rng));
    }
    case 'culture': {
      const pool = all.filter((e) => inCulture(e, spec.cultureId));
      return interleaveTypes(byPriority(pool, state, today, rng).slice(0, size));
    }
    case 'review': {
      const due = all.filter((e) => priority(e, state, today) <= 1);
      return interleaveTypes(byPriority(due, state, today, rng).slice(0, size));
    }
    case 'mistakes': {
      const missed = all.filter((e) => state.items[e.id]?.last === 'wrong');
      return interleaveTypes(shuffle(missed, rng).slice(0, size));
    }
    case 'exam': {
      // Stratified: one pass per module, mixed difficulties.
      return interleaveTypes(shuffle(spreadAcrossModules(shuffle(all, rng), size), rng));
    }
    case 'daily': {
      const due = byPriority(all.filter((e) => priority(e, state, today) <= 1), state, today, rng).slice(0, 4);
      const taken = new Set(due.map((e) => e.id));
      const read = new Set(Object.keys(state.lessons));
      const fresh = all.filter((e) => !taken.has(e.id) && !state.items[e.id]);
      // Prefer modules the learner has read, then the rest; easy items first for new learners.
      const freshSorted = shuffle(fresh, rng).sort(
        (a, b) => Number(read.has(b.module ?? '')) - Number(read.has(a.module ?? '')) || a.difficulty - b.difficulty,
      );
      const picked = [...due, ...spreadAcrossModules(freshSorted, size - due.length)];
      if (picked.length < size) {
        const ids = new Set(picked.map((e) => e.id));
        picked.push(...byPriority(all.filter((e) => !ids.has(e.id)), state, today, rng).slice(0, size - picked.length));
      }
      return interleaveTypes(picked);
    }
  }
}
