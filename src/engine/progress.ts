import { addDays, dayKey, daysBetween } from './dates';
import type { GradeResult, Verdict } from './grade';
import { MAX_BOX, scheduleCard, scheduleExercise, type CardGrade, type CardState } from './srs';
import type { Exercise } from './types';

export interface ItemState {
  seen: number;
  correct: number;
  last?: Verdict;
  lastSeen?: string;
  box: number;
  due: string;
}

export interface SessionRecord {
  id: string;
  /** ISO date-time */
  at: string;
  kind: string;
  label: string;
  total: number;
  correct: number;
  partial: number;
  xp: number;
  /** Exercise ids answered wrong, for the "mes erreurs" list. */
  missed: string[];
}

export interface Settings {
  theme: 'system' | 'light' | 'dark';
  /** Daily XP goal. */
  dailyGoal: number;
}

export interface DayStats {
  xp: number;
  answered: number;
  correct: number;
}

export interface ProgressState {
  version: 1;
  xp: number;
  days: Record<string, DayStats>;
  items: Record<string, ItemState>;
  cards: Record<string, CardState>;
  lessons: Record<string, string>;
  badges: Record<string, string>;
  /** The most recent sessions only (see SESSION_HISTORY). */
  sessions: SessionRecord[];
  /** Every session ever finished, including those dropped from `sessions`. */
  sessionsDone: number;
  settings: Settings;
  /** Best scores of timed challenges, by challenge id. */
  records: Record<string, number>;
}

/** How many finished sessions are kept in the history. */
export const SESSION_HISTORY = 60;

export const XP = {
  correct: 10,
  partial: 4,
  wrong: 1,
  card: 2,
  lesson: 15,
} as const;

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    xp: 0,
    days: {},
    items: {},
    cards: {},
    lessons: {},
    badges: {},
    sessions: [],
    sessionsDone: 0,
    settings: { theme: 'system', dailyGoal: 60 },
    records: {},
  };
}

/* ---------- Reading untrusted data (localStorage, imported files) ---------- */

type Dict = Record<string, unknown>;

const isDict = (v: unknown): v is Dict => typeof v === 'object' && v !== null && !Array.isArray(v);
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const isDay = (v: unknown): v is string => typeof v === 'string' && DAY.test(v);
/** A finite number ≥ 0, or the fallback. */
const count = (v: unknown, fallback = 0): number => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : fallback);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const VERDICTS: readonly string[] = ['correct', 'partial', 'wrong'];
const THEMES: readonly string[] = ['system', 'light', 'dark'];

/** Keeps the entries `clean` accepts (it returns undefined to drop one). */
function entries<T>(v: unknown, clean: (x: unknown, key: string) => T | undefined): Record<string, T> {
  const out: Record<string, T> = {};
  if (!isDict(v)) return out;
  for (const [k, x] of Object.entries(v)) {
    const c = clean(x, k);
    if (c !== undefined) out[k] = c;
  }
  return out;
}

function cleanItem(v: unknown): ItemState | undefined {
  if (!isDict(v) || !isDay(v.due)) return undefined;
  const item: ItemState = {
    seen: Math.round(count(v.seen)),
    correct: Math.round(count(v.correct)),
    box: Math.min(MAX_BOX, Math.round(count(v.box))),
    due: v.due,
  };
  if (typeof v.last === 'string' && VERDICTS.includes(v.last)) item.last = v.last as Verdict;
  if (isDay(v.lastSeen)) item.lastSeen = v.lastSeen;
  return item;
}

function cleanCard(v: unknown): CardState | undefined {
  if (!isDict(v) || !isDay(v.due)) return undefined;
  return { ease: Math.max(1.3, count(v.ease, 2.5)), interval: Math.round(count(v.interval)), reps: Math.round(count(v.reps)), due: v.due };
}

function cleanDay(v: unknown): DayStats | undefined {
  if (!isDict(v)) return undefined;
  return { xp: count(v.xp), answered: count(v.answered), correct: count(v.correct) };
}

function cleanSession(v: unknown): SessionRecord | undefined {
  if (!isDict(v)) return undefined;
  return {
    id: str(v.id),
    at: str(v.at),
    kind: str(v.kind),
    label: str(v.label),
    total: count(v.total),
    correct: count(v.correct),
    partial: count(v.partial),
    xp: count(v.xp),
    missed: Array.isArray(v.missed) ? v.missed.filter((x): x is string => typeof x === 'string') : [],
  };
}

/**
 * Accept anything parsed from storage or an imported file: fill gaps and drop, entry by entry,
 * whatever does not have the expected shape, so one damaged entry cannot break the app.
 */
export function normalizeProgress(raw: unknown): ProgressState {
  const base = emptyProgress();
  if (!isDict(raw)) return base;
  const sessions = (Array.isArray(raw.sessions) ? raw.sessions : []).map(cleanSession).filter((s): s is SessionRecord => Boolean(s));
  const settings = isDict(raw.settings) ? raw.settings : {};
  const goal = settings.dailyGoal;
  return {
    version: 1,
    xp: count(raw.xp),
    days: entries(raw.days, (v, k) => (DAY.test(k) ? cleanDay(v) : undefined)),
    items: entries(raw.items, cleanItem),
    cards: entries(raw.cards, cleanCard),
    lessons: entries(raw.lessons, (v) => (typeof v === 'string' ? v : undefined)),
    badges: entries(raw.badges, (v) => (typeof v === 'string' ? v : undefined)),
    sessions: sessions.slice(-SESSION_HISTORY),
    // Older saves have no counter: the history is the best estimate.
    sessionsDone: Math.max(Math.round(count(raw.sessionsDone)), sessions.length),
    settings: {
      theme: typeof settings.theme === 'string' && THEMES.includes(settings.theme) ? (settings.theme as Settings['theme']) : base.settings.theme,
      dailyGoal: typeof goal === 'number' && Number.isFinite(goal) && goal > 0 ? goal : base.settings.dailyGoal,
    },
    records: entries(raw.records, (v) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined)),
  };
}

/**
 * Read a file the learner wants to import. Unlike `normalizeProgress`, which repairs what it can,
 * this refuses anything that is not a backup written by « Exporter ma progression »
 * (a `package.json`, an array, another app's export…), so nothing gets replaced by mistake.
 */
export function parseBackup(raw: unknown): ProgressState | null {
  if (!isDict(raw) || raw.version !== 1) return null;
  if (typeof raw.xp !== 'number' || !Number.isFinite(raw.xp)) return null;
  if (!isDict(raw.items) || !isDict(raw.days) || !isDict(raw.cards)) return null;
  for (const k of ['lessons', 'badges', 'records', 'settings'] as const) if (k in raw && !isDict(raw[k])) return null;
  if ('sessions' in raw && !Array.isArray(raw.sessions)) return null;
  return normalizeProgress(raw);
}

export function xpFor(ex: Exercise, verdict: Verdict): number {
  if (verdict === 'correct') return XP.correct * ex.difficulty;
  if (verdict === 'partial') return XP.partial * ex.difficulty;
  return XP.wrong;
}

function bumpDay(days: Record<string, DayStats>, today: string, xp: number, answered: number, correct: number) {
  const d = days[today] ?? { xp: 0, answered: 0, correct: 0 };
  return { ...days, [today]: { xp: d.xp + xp, answered: d.answered + answered, correct: d.correct + correct } };
}

export function recordAttempt(
  state: ProgressState,
  ex: Exercise,
  res: GradeResult,
  now: Date = new Date(),
): { state: ProgressState; xp: number } {
  const today = dayKey(now);
  const prev = state.items[ex.id];
  const sched = scheduleExercise(prev, res.verdict, today);
  const item: ItemState = {
    seen: (prev?.seen ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (res.verdict === 'correct' ? 1 : 0),
    last: res.verdict,
    lastSeen: today,
    ...sched,
  };
  const xp = xpFor(ex, res.verdict);
  return {
    xp,
    state: {
      ...state,
      xp: state.xp + xp,
      items: { ...state.items, [ex.id]: item },
      days: bumpDay(state.days, today, xp, 1, res.verdict === 'correct' ? 1 : 0),
    },
  };
}

export function recordCard(state: ProgressState, key: string, g: CardGrade, now: Date = new Date()): ProgressState {
  const today = dayKey(now);
  return {
    ...state,
    xp: state.xp + XP.card,
    cards: { ...state.cards, [key]: scheduleCard(state.cards[key], g, today) },
    days: bumpDay(state.days, today, XP.card, 0, 0),
  };
}

export function markLessonRead(state: ProgressState, moduleId: string, now: Date = new Date()): ProgressState {
  if (state.lessons[moduleId]) return state;
  const today = dayKey(now);
  return {
    ...state,
    xp: state.xp + XP.lesson,
    lessons: { ...state.lessons, [moduleId]: today },
    days: bumpDay(state.days, today, XP.lesson, 0, 0),
  };
}

export function setRecord(state: ProgressState, id: string, score: number): ProgressState {
  if ((state.records[id] ?? 0) >= score) return state;
  return { ...state, records: { ...state.records, [id]: score } };
}

export function addSession(state: ProgressState, rec: SessionRecord): ProgressState {
  return { ...state, sessions: [...state.sessions, rec].slice(-SESSION_HISTORY), sessionsDone: state.sessionsDone + 1 };
}

/** Consecutive active days ending today, or yesterday when today has no activity yet. */
export function streak(state: ProgressState, now: Date = new Date()): { current: number; best: number; activeToday: boolean } {
  const active = Object.keys(state.days)
    .filter((k) => (state.days[k]?.xp ?? 0) > 0)
    .sort();
  const today = dayKey(now);
  const set = new Set(active);
  const activeToday = set.has(today);
  let current = 0;
  let cursor = activeToday ? today : addDays(today, -1);
  while (set.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const k of active) {
    run = prev && daysBetween(prev, k) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = k;
  }
  return { current, best: Math.max(best, current), activeToday };
}

/** 0–1 mastery of one exercise, from its Leitner box and last verdict. */
export function itemMastery(s: ItemState | undefined): number {
  if (!s) return 0;
  if (s.last === 'wrong') return s.correct > 0 ? 0.3 : 0.1;
  if (s.last === 'partial') return 0.4;
  return Math.min(1, 0.4 + s.box * 0.2);
}

export function mastery(state: ProgressState, ids: string[]): number {
  if (ids.length === 0) return 0;
  return ids.reduce((sum, id) => sum + itemMastery(state.items[id]), 0) / ids.length;
}

export function masteryLabel(m: number, touched: boolean): string {
  if (!touched) return 'Pas commencé';
  if (m < 0.35) return 'Découverte';
  if (m < 0.6) return 'En progrès';
  if (m < 0.85) return 'Solide';
  return 'Maîtrisé';
}

/** The ids that still exist in the content (a `Map` or `Set` of them). */
export interface KnownIds {
  has(id: string): boolean;
}

/**
 * Exercises due today, most overdue first. Pass `known` to ignore the ones the content no longer
 * has (renamed or removed ids stay in storage, so they would be due forever).
 */
export function dueExerciseIds(state: ProgressState, today: string = dayKey(), known?: KnownIds): string[] {
  return Object.entries(state.items)
    .filter(([id, s]) => s.due <= today && (!known || known.has(id)))
    .sort(([, a], [, b]) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.box - b.box))
    .map(([id]) => id);
}

/** Flashcards due today; `known` works as in `dueExerciseIds`. */
export function dueCardKeys(state: ProgressState, today: string = dayKey(), known?: KnownIds): string[] {
  return Object.entries(state.cards)
    .filter(([k, s]) => s.due <= today && (!known || known.has(k)))
    .map(([k]) => k);
}
