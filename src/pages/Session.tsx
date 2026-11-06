import { ChevronDown, CircleCheck, CircleDot, CircleX, X } from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, navigate } from '../app/router';
import { store } from '../app/store';
import { ExerciseView, TYPE_LABEL } from '../components/exercise/ExerciseView';
import type { Draft } from '../components/exercise/players';
import { EXERCISES, EXERCISE_BY_ID, MODULE_BY_ID } from '../content';
import { CULTURE_NAMES } from '../content/cultures';
import type { GradeResult } from '../engine/grade';
import { addSession, recordAttempt } from '../engine/progress';
import { SESSION_SIZE, buildSession, isDuel, type PracticeType, type SessionSpec } from '../engine/session';
import type { Exercise, TrueFalseExercise } from '../engine/types';
import { Md, MdInline, frenchSpacing } from '../lib/markdown';
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
import { evenTrueFalse } from './trueFalseMix';

const TYPES: PracticeType[] = ['duel', 'choice', 'multi', 'truefalse', 'hotspot', 'order', 'match', 'slider', 'grid'];

export function parseSpec(q: URLSearchParams): SessionSpec {
  const mode = q.get('mode');
  const id = q.get('id') ?? '';
  switch (mode) {
    case 'module':
      return { kind: 'module', moduleId: id };
    case 'type':
      return { kind: 'type', type: (TYPES.includes(id as PracticeType) ? id : 'duel') as PracticeType };
    case 'review':
      return { kind: 'review' };
    case 'mistakes':
      return { kind: 'mistakes' };
    case 'exam':
      return { kind: 'exam' };
    case 'culture':
      return { kind: 'culture', cultureId: id || undefined };
    default:
      return { kind: 'daily' };
  }
}

export function specLabel(spec: SessionSpec): string {
  switch (spec.kind) {
    case 'daily':
      return 'Session du jour';
    case 'module':
      return MODULE_BY_ID.get(spec.moduleId)?.title ?? 'Module';
    case 'type':
      return TYPE_LABEL[spec.type];
    case 'review':
      return 'Révisions';
    case 'mistakes':
      return 'Mes erreurs';
    case 'exam':
      return 'Examen blanc';
    case 'culture':
      // The dash stays with « Cultures »: a wrapped label never starts a line with « — Brésil ».
      return spec.cultureId ? `Cultures — ${CULTURE_NAMES[spec.cultureId] ?? spec.cultureId}` : 'Cultures';
  }
}

/* ---------------------------------------------------------------- saved runs (per tab) */

const PREFIX = 'learn-ui-ux:run:';
/** Runs saved by earlier versions, keyed by route: never read again (see logic-1). */
const OLD_PREFIX = 'learn-ui-ux:session:';
/** Finished runs stay so that Back shows their summary again; keep the latest ones only. */
const KEEP = 20;
/** Also kept in memory: the run survives a storage failure and the remount that names it in the URL. */
const memory = new Map<string, Run>();
const known = (id: string) => EXERCISE_BY_ID.has(id);

function readRun(id: string): Run | null {
  const cached = memory.get(id);
  if (cached) return cached;
  try {
    const raw = sessionStorage.getItem(PREFIX + id);
    const run = raw ? parseRun(JSON.parse(raw), known) : null;
    if (run) memory.set(id, run);
    return run;
  } catch {
    return null;
  }
}

function storedRuns(): { id: string; run: Run }[] {
  const out: { id: string; run: Run }[] = [];
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key?.startsWith(PREFIX)) continue;
      const id = key.slice(PREFIX.length);
      const run = readRun(id);
      if (run) out.push({ id, run });
    }
  } catch {
    // Storage unavailable: only this page's runs (in memory) exist.
  }
  for (const [id, run] of memory) if (!out.some((x) => x.id === id)) out.push({ id, run });
  return out;
}

function saveRun(id: string, run: Run) {
  memory.set(id, run);
  try {
    sessionStorage.setItem(PREFIX + id, JSON.stringify(run));
    const old: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(OLD_PREFIX)) old.push(key);
    }
    old.forEach((k) => sessionStorage.removeItem(k));
    const runs = storedRuns().sort((a, b) => b.run.t - a.run.t);
    for (const { id: stale } of runs.slice(KEEP)) {
      sessionStorage.removeItem(PREFIX + stale);
      memory.delete(stale);
    }
  } catch {
    // Private mode or full storage: the run lives in memory for this visit.
  }
}

/** The latest run left unfinished in this tab, to offer « Reprendre » on the home page. */
export function unfinishedSession(): { raw: string; label: string; index: number; total: number } | null {
  const latest = storedRuns()
    .filter(({ run }) => isUnfinished(run))
    .sort((a, b) => b.run.t - a.run.t)[0];
  if (!latest) return null;
  const { id, run } = latest;
  const query = new URLSearchParams(run.route.split('?')[1] ?? '');
  return { raw: withRun(run.route, id), label: specLabel(parseSpec(query)), index: run.index, total: run.ids.length };
}

/* ---------------------------------------------------------------- page */

function typeOf(ex: Exercise): string {
  return isDuel(ex) ? TYPE_LABEL.duel : TYPE_LABEL[ex.type];
}

/** The exercises of a new run. « Vrai ou faux » draws true and false statements evenly (tf-balance-1). */
function newRun(spec: SessionSpec): Exercise[] {
  const state = store.get();
  if (spec.kind !== 'type' || spec.type !== 'truefalse') return buildSession(spec, EXERCISES, state);
  // Each side in the engine's order (due first, then new ones).
  const side = (answer: boolean) =>
    buildSession(spec, EXERCISES.filter((e) => e.type === 'truefalse' && e.answer === answer), state).filter(
      (e): e is TrueFalseExercise => e.type === 'truefalse',
    );
  return evenTrueFalse(side(true), side(false), SESSION_SIZE.type);
}

/** Restore the run named in the URL, or build a new one for an entry link. */
function boot(raw: string, query: URLSearchParams, spec: SessionSpec): { id: string; run: Run } {
  const route = routeOf(raw);
  const named = query.get('run');
  const saved = named ? readRun(named) : null;
  if (named && saved && saved.route === route) {
    // An exam never shows a correction; nor can a correction without its answer: move on.
    const skip = answeredCurrent(saved) && (spec.kind === 'exam' || !saved.played[saved.index].draft);
    return { id: named, run: skip ? { ...saved, index: saved.played.length } : saved };
  }
  const ids = newRun(spec).map((e) => e.id);
  return { id: newRunId(), run: { route, ids, index: 0, played: [], t: Date.now() } };
}

export function SessionPage({ query, raw }: { query: URLSearchParams; raw: string }) {
  const spec = useMemo(() => parseSpec(query), [query]);
  const exam = spec.kind === 'exam';
  const [{ id: runId, run: first }] = useState(() => boot(raw, query, spec));
  const [state, setState] = useState<Run>(first);
  const recorded = useRef(first.recorded === true);
  const answering = useRef(-1);

  // Save every change. An empty selection is not saved: the next visit builds it again.
  useEffect(() => {
    if (state.ids.length) saveRun(runId, { ...state, t: Date.now() });
  }, [runId, state]);

  // Name the run in the address (replacing the entry), so Back, a reload or « Reprendre » find it.
  useEffect(() => {
    if (state.ids.length && query.get('run') !== runId) window.location.replace(`#${withRun(raw, runId)}`);
  }, [query, raw, runId, state.ids.length]);

  const items = state.ids.map((id) => EXERCISE_BY_ID.get(id)!).filter(Boolean);
  const done = state.index >= items.length;
  const current = items[state.index];
  const xpTotal = state.played.reduce((s, p) => s + p.xp, 0);
  const label = specLabel(spec);

  // Record the finished session once: the flag is saved with the run, so a Back to the summary,
  // a reload or a remount never adds it again.
  useEffect(() => {
    if (!done || recorded.current || state.recorded || state.played.length === 0) return;
    recorded.current = true;
    const t = tally(state.played);
    store.update((s) =>
      addSession(s, {
        id: `${Date.now()}`,
        at: new Date().toISOString(),
        kind: spec.kind,
        label,
        total: t.total,
        correct: t.correct,
        partial: t.partial,
        xp: t.xp,
        missed: state.played.filter((p) => p.verdict === 'wrong').map((p) => p.id),
      }),
    );
    setState((st) => ({ ...st, recorded: true }));
  }, [done, label, spec.kind, state.played, state.recorded]);

  useEffect(() => {
    // Back on a correction (after « Revoir la leçon », a reload…): ExerciseView brings it into view.
    if (current && answeredCurrent(state)) return;
    document.getElementById(current ? `prompt-${current.id}` : 'main-title')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    // Only when the exercise changes, not after each answer.
  }, [current, done]);

  if (items.length === 0) return <EmptySession spec={spec} />;

  if (done) return <Summary label={label} items={items} played={state.played} exam={exam} spec={spec} />;

  const onAnswered = (r: GradeResult, draft: Draft) => {
    // One attempt per exercise and run: XP and spaced repetition never count an answer twice.
    if (answeredCurrent(state) || answering.current === state.index) return undefined;
    answering.current = state.index;
    let xp = 0;
    store.update((s) => {
      const out = recordAttempt(s, current, r);
      xp = out.xp;
      return out.state;
    });
    const entry: Played = { id: current.id, verdict: r.verdict, score: r.score, xp, draft };
    setState((st) => (answeredCurrent(st) ? st : { ...st, played: [...st.played, entry] }));
    return exam ? undefined : xp;
  };

  const next = () => setState((st) => (st.index < st.ids.length && answeredCurrent(st) ? { ...st, index: st.index + 1 } : st));
  const module = current.module ? MODULE_BY_ID.get(current.module) : undefined;
  const last = state.index === items.length - 1;
  const answered = answeredCurrent(state) ? state.played[state.index] : undefined;

  return (
    <div className="player">
      <div className="player-top">
        <button type="button" className="icon-btn" onClick={() => navigate('/entrainement')} aria-label="Quitter la session">
          <X aria-hidden="true" />
        </button>
        <div className="player-progress">
          <div className="player-progress-label">
            <span>
              {[spec.kind === 'module' ? null : label, module?.title, spec.kind === 'type' ? null : typeOf(current)].filter(Boolean).join(' · ')}
            </span>
            <span className="num">
              {state.index + 1} / {items.length}
            </span>
          </div>
          <div
            className="meter meter--mark"
            role="progressbar"
            aria-label="Avancement de la session"
            aria-valuemin={0}
            aria-valuemax={items.length}
            aria-valuenow={state.index}
            style={{ '--value': `${(state.index / items.length) * 100}%` } as CSSProperties}
          >
            <span />
          </div>
        </div>
        <span className="player-xp" aria-label={`${exam ? 'Examen' : `${xpTotal} XP gagnés`}`}>
          {exam ? 'Examen' : `+${xpTotal} XP`}
        </span>
      </div>
      <ExerciseView
        key={`${current.id}-${state.index}`}
        ex={current}
        mode={exam ? 'exam' : 'practice'}
        seed={seedOf(runId, state.index)}
        answered={answered?.draft ? { result: { verdict: answered.verdict, score: answered.score }, draft: answered.draft, xp: answered.xp } : undefined}
        onAnswered={onAnswered}
        onNext={next}
        nextLabel={last ? 'Voir le bilan' : 'Épreuve suivante'}
      />
    </div>
  );
}

function EmptySession({ spec }: { spec: SessionSpec }) {
  const text =
    spec.kind === 'review'
      ? 'Aucune épreuve n’est à revoir aujourd’hui. Les épreuves ratées ou réussies reviennent ici à intervalles croissants.'
      : spec.kind === 'mistakes'
        ? 'Tu n’as aucune erreur en attente. Les épreuves ratées apparaîtront ici jusqu’à ce que tu les réussisses.'
        : 'Aucune épreuve ne correspond à cette sélection pour le moment.';
  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {specLabel(spec)}
        </h1>
        <p className="lead">{text}</p>
      </header>
      <div className="btn-row">
        <Link to="/session?mode=daily" className="btn btn-primary">
          Lancer la session du jour
        </Link>
        <Link to="/entrainement" className="btn btn-secondary">
          Choisir un autre format
        </Link>
      </div>
    </div>
  );
}

const ICON = { correct: CircleCheck, partial: CircleDot, wrong: CircleX };
const CLASS = { correct: 'ok', partial: 'partial', wrong: 'ko' };
const WORD = { correct: 'Juste', partial: 'Presque', wrong: 'À reprendre' };

const AGAIN_STYLE: CSSProperties = { whiteSpace: 'normal', textAlign: 'center', textWrap: 'balance', paddingBlock: 'var(--s2)' };

/** The same kind of session again, named for what it starts (an empty review would lead nowhere). */
function nextSession(spec: SessionSpec, label: string): { to: string; text: string } {
  switch (spec.kind) {
    case 'daily':
      return { to: '/session?mode=daily', text: 'Nouvelle session du jour' };
    case 'module':
      return { to: `/session?mode=module&id=${encodeURIComponent(spec.moduleId)}`, text: `Nouvelle session : ${label}` };
    case 'type':
      return { to: `/session?mode=type&id=${spec.type}`, text: `Nouvelle session : ${label}` };
    case 'culture':
      return { to: `/session?mode=culture${spec.cultureId ? `&id=${encodeURIComponent(spec.cultureId)}` : ''}`, text: `Nouvelle session : ${label}` };
    case 'exam':
      return { to: '/session?mode=exam', text: 'Nouvel examen blanc' };
    case 'review':
    case 'mistakes':
      return { to: '/session?mode=daily', text: 'Lancer la session du jour' };
  }
}

function Summary({ label, items, played, exam, spec }: { label: string; items: Exercise[]; played: Played[]; exam: boolean; spec: SessionSpec }) {
  const t = tally(played);
  const parts = scoreParts(t);
  const message = summaryMessage(t);
  // « Mes erreurs » only holds wrong answers: a « presque » is not one (engine/session.ts).
  const missed = t.wrong > 0;
  const again = nextSession(spec, label);

  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Bilan — {label}
        </h1>
        <p className="lead">
          {parts.map((p, i) => {
            const [n, ...word] = p.split(' ');
            return (
              <Fragment key={p}>
                {i > 0 && (i === parts.length - 1 ? ' et ' : ', ')}
                <strong className="num">{n}</strong>&nbsp;{word.join(' ')}
              </Fragment>
            );
          })}{' '}
          {/* Each number keeps its word, and a line never starts with « · ». */}
          sur&nbsp;{t.total}&nbsp;· +{t.xp}&nbsp;XP
        </p>
        {message && <p className="muted">{message}</p>}
      </header>

      <section className="section" aria-labelledby="recap-title">
        <h2 id="recap-title">{exam ? 'Corrections' : 'Revoir les épreuves'}</h2>
        <ul className="recap">
          {played.map((p, i) => {
            const ex = items.find((e) => e.id === p.id);
            if (!ex) return null;
            const Icon = ICON[p.verdict];
            return (
              <li key={`${p.id}-${i}`}>
                <details open={exam && p.verdict !== 'correct'}>
                  <summary>
                    <Icon className={CLASS[p.verdict]} aria-label={WORD[p.verdict]} />
                    <span>
                      <MdInline text={ex.prompt} />
                    </span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="recap-body">
                    <p className="small muted">
                      {MODULE_BY_ID.get(ex.module ?? '')?.title} · {typeOf(ex)}
                    </p>
                    <p>
                      <strong>À retenir :</strong> <MdInline text={ex.takeaway} />
                    </p>
                    <Md text={ex.explanation} className="prose small" />
                    <Link to={`/apprendre/${ex.module}`} className="small">
                      Revoir la leçon
                    </Link>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="btn-row">
        {missed && (
          <Link to="/session?mode=mistakes" className="btn btn-primary">
            Refaire mes erreurs
          </Link>
        )}
        {/* It names the session it starts, which can be long: on narrow screens it wraps on two even
            lines, clear of the button's edges. */}
        <Link to={again.to} className={missed ? 'btn btn-secondary' : 'btn btn-primary'} style={AGAIN_STYLE}>
          {frenchSpacing(again.text)}
        </Link>
        <Link to="/" className="btn btn-ghost">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
