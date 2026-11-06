import type { Draft } from '../components/exercise/players';
import type { Verdict } from '../engine/grade';
import { frenchSpacing } from '../lib/markdown';

/** One answered exercise of a run. The draft lets a reload or a Back show its correction again. */
export interface Played {
  id: string;
  verdict: Verdict;
  score: number;
  xp: number;
  draft?: Draft;
}

/**
 * A session run, saved per tab under its own id (`run=` in the URL). Entry links carry no id and
 * always start a new run; Back, Forward, a reload or « Reprendre » come back to the same one.
 */
export interface Run {
  /** Route the run belongs to, without its id (`/session?mode=daily`). */
  route: string;
  ids: string[];
  /** Position of the exercise on screen; `ids.length` once the summary is shown. */
  index: number;
  played: Played[];
  /** The finished session is in the history: never add it twice. */
  recorded?: boolean;
  /** Last change (ms), to offer the latest unfinished run and prune old ones. */
  t: number;
}

const VERDICTS: readonly Verdict[] = ['correct', 'partial', 'wrong'];

const isPlayed = (p: unknown): p is Played => {
  if (!p || typeof p !== 'object') return false;
  const x = p as Partial<Played>;
  return (
    typeof x.id === 'string' &&
    VERDICTS.includes(x.verdict as Verdict) &&
    typeof x.score === 'number' &&
    Number.isFinite(x.score) &&
    typeof x.xp === 'number' &&
    Number.isFinite(x.xp) &&
    (x.draft === undefined || (typeof x.draft === 'object' && x.draft !== null && typeof (x.draft as { type?: unknown }).type === 'string'))
  );
};

/**
 * Accept a stored run only when it is whole and consistent: known exercises, at least one of them,
 * answers in the order of the run, and at most the exercise on screen answered ahead of `index`.
 */
export function parseRun(value: unknown, known: (id: string) => boolean): Run | null {
  if (!value || typeof value !== 'object') return null;
  const r = value as Partial<Run>;
  if (typeof r.route !== 'string' || !r.route.startsWith('/session')) return null;
  if (!Array.isArray(r.ids) || r.ids.length === 0 || !r.ids.every((id) => typeof id === 'string' && known(id))) return null;
  const n = r.ids.length;
  if (typeof r.index !== 'number' || !Number.isInteger(r.index) || r.index < 0 || r.index > n) return null;
  if (!Array.isArray(r.played) || !r.played.every(isPlayed)) return null;
  const played = r.played;
  if (played.length > n || played.length < r.index || played.length > r.index + 1) return null;
  if (played.some((p, i) => p.id !== r.ids![i])) return null;
  if (r.index === n && played.length !== n) return null;
  return {
    route: r.route,
    ids: r.ids.slice(),
    index: r.index,
    played: played.slice(),
    recorded: r.recorded === true,
    t: typeof r.t === 'number' && Number.isFinite(r.t) ? r.t : 0,
  };
}

/** The exercise on screen has been answered (its correction is showing). */
export const answeredCurrent = (r: Pick<Run, 'index' | 'played'>) => r.played.length > r.index;

/** Started and not finished: worth a « Reprendre ». */
export const isUnfinished = (r: Pick<Run, 'ids' | 'index' | 'played'>) => r.played.length > 0 && r.index < r.ids.length;

/** A short random id for the URL. */
export function newRunId(rand: () => number = Math.random): string {
  let id = '';
  for (let i = 0; i < 8; i++) id += Math.floor(rand() * 36).toString(36);
  return id;
}

function splitRoute(raw: string): [string, URLSearchParams] {
  const at = raw.indexOf('?');
  return at === -1 ? [raw, new URLSearchParams()] : [raw.slice(0, at), new URLSearchParams(raw.slice(at + 1))];
}

/** The route without its run id (and without the old `n=` cache buster). */
export function routeOf(raw: string): string {
  const [path, q] = splitRoute(raw);
  q.delete('run');
  q.delete('n');
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}

/** The route of a given run. */
export function withRun(raw: string, run: string): string {
  const [path, q] = splitRoute(routeOf(raw));
  q.set('run', run);
  return `${path}?${q.toString()}`;
}

/** FNV-1a: a stable seed per run and position, so a remount shows options in the same order. */
export function seedOf(run: string, index: number): number {
  let h = 0x811c9dc5;
  for (const ch of `${run}:${index}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export interface Tally {
  total: number;
  correct: number;
  partial: number;
  wrong: number;
  xp: number;
}

export function tally(played: Pick<Played, 'verdict' | 'xp'>[]): Tally {
  return {
    total: played.length,
    correct: played.filter((p) => p.verdict === 'correct').length,
    partial: played.filter((p) => p.verdict === 'partial').length,
    wrong: played.filter((p) => p.verdict === 'wrong').length,
    xp: played.reduce((s, p) => s + p.xp, 0),
  };
}

/** « 7 justes, 1 presque et 2 à reprendre sur 10 », with the zero counts left out. */
export function scoreParts(t: Tally): string[] {
  const parts: string[] = [];
  if (t.correct || (!t.partial && !t.wrong)) parts.push(`${t.correct} ${t.correct > 1 ? 'justes' : 'juste'}`);
  if (t.partial) parts.push(`${t.partial} presque`);
  if (t.wrong) parts.push(`${t.wrong} à reprendre`);
  return parts;
}

/**
 * What happens next, in line with the scheduling (engine/srs.ts): a wrong answer goes back to box 0,
 * due today; a partial one to box 1 or 2 (tomorrow or in three days); a right one moves up a box.
 */
export function summaryMessage(t: Tally): string {
  if (!t.total) return '';
  const rate = t.correct / t.total;
  const out: string[] = [];
  if (rate === 1) out.push('Sans faute. Ces épreuves reviendront à intervalles de plus en plus longs, pour ancrer ces règles.');
  else {
    if (rate >= 0.7) out.push('Solide.');
    if (t.wrong) {
      const one = t.wrong === 1;
      out.push(
        rate >= 0.7
          ? `Relis les corrections : ${one ? 'l’épreuve ratée t’attend' : 'les épreuves ratées t’attendent'} dans tes révisions du jour.`
          : `${one ? 'L’épreuve ratée est' : 'Les épreuves ratées sont'} déjà dans tes révisions du jour.`,
      );
    }
    if (t.partial) out.push(t.partial === 1 ? 'La réponse incomplète reviendra dans les prochains jours.' : 'Les réponses incomplètes reviendront dans les prochains jours.');
    if (rate < 0.7) out.push('Relire la leçon associée aide beaucoup.');
  }
  return frenchSpacing(out.join(' '));
}
