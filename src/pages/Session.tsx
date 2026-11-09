import { ChevronDown, CircleCheck, CircleDot, CircleX, X } from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { Link, navigate } from '../app/router';
import { store } from '../app/store';
import { ExercisePlayer, ExerciseView, QuestionStage, TYPE_LABEL, displayOrder } from '../components/exercise/ExerciseView';
import { Recommended } from '../components/exercise/Feedback';
import type { Draft } from '../components/exercise/players';
import { EXERCISES, EXERCISE_BY_ID, MODULE_BY_ID, THEME_BY_ID, preloadExercises, useExercises, type ExerciseEntry, type ThemeId } from '../content';
import { CULTURE_COMMON_LABEL, CULTURE_NAMES } from '../content/cultures';
import type { GradeResult } from '../engine/grade';
import { addSession, recordAttempt } from '../engine/progress';
import { seeded } from '../engine/random';
import { CULTURE_COMMON, SESSION_SIZE, buildSession, isDuel, isExam, type PracticeType, type SessionItem, type SessionSpec } from '../engine/session';
import type { Exercise } from '../engine/types';
import { keepFocusInView } from '../lib/focusInView';
import { SEP } from '../lib/french';
import { Md, MdInline, frenchSpacing } from '../lib/markdown';
import { PHONE_DOCK, useMedia } from '../lib/useMedia';
import { LoadFailed, Loading } from './LoadFailed';
import {
  answeredCurrent,
  draftFits,
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

const TYPES: PracticeType[] = ['duel', 'choice', 'multi', 'truefalse', 'hotspot', 'order', 'match', 'slider', 'grid', 'scenario'];

export function parseSpec(q: URLSearchParams): SessionSpec {
  const mode = q.get('mode');
  const id = q.get('id') ?? '';
  switch (mode) {
    case 'module':
      return { kind: 'module', moduleId: id };
    case 'theme':
    case 'evaluation': {
      // An unknown theme draws from no lesson: the session says it is empty.
      const theme = THEME_BY_ID.get(id as ThemeId);
      return { kind: mode, themeId: id, moduleIds: theme?.modules ?? [] };
    }
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
      return MODULE_BY_ID.get(spec.moduleId)?.title ?? 'Leçon introuvable';
    case 'theme':
      return THEME_BY_ID.get(spec.themeId as ThemeId)?.title ?? 'Thème introuvable';
    case 'evaluation': {
      const theme = THEME_BY_ID.get(spec.themeId as ThemeId);
      // The dash stays with « Évaluation », as with « Cultures ».
      return theme ? `Évaluation — ${theme.title}` : 'Thème introuvable';
    }
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
      if (spec.cultureId === CULTURE_COMMON) return `Cultures — ${CULTURE_COMMON_LABEL}`;
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

function typeOf(ex: SessionItem): string {
  return isDuel(ex) ? TYPE_LABEL.duel : TYPE_LABEL[ex.type];
}

/**
 * The exercises of a new run, drawn from the light index (no lesson needs to be downloaded for it).
 * « Vrai ou faux » draws true and false statements evenly (tf-balance-1).
 */
function newRun(spec: SessionSpec): ExerciseEntry[] {
  const state = store.get();
  if (spec.kind !== 'type' || spec.type !== 'truefalse') return buildSession(spec, EXERCISES, state);
  // Each side in the engine's order (due first, then new ones).
  const side = (answer: boolean) =>
    buildSession(spec, EXERCISES.filter((e) => e.type === 'truefalse' && e.answer === answer), state).map((e) => ({ ...e, answer }));
  return evenTrueFalse(side(true), side(false), SESSION_SIZE.type);
}

/** Restore the run named in the URL, or build a new one for an entry link. */
function boot(raw: string, query: URLSearchParams, spec: SessionSpec): { id: string; run: Run } {
  const route = routeOf(raw);
  const named = query.get('run');
  const saved = named ? readRun(named) : null;
  if (named && saved && saved.route === route) {
    // An exam never shows a correction; nor can a correction without its answer: move on.
    const skip = answeredCurrent(saved) && (isExam(spec) || !saved.played[saved.index].draft);
    return { id: named, run: skip ? { ...saved, index: saved.played.length } : saved };
  }
  const ids = newRun(spec).map((e) => e.id);
  return { id: newRunId(), run: { route, ids, index: 0, played: [], t: Date.now() } };
}

export function SessionPage({ query, raw }: { query: URLSearchParams; raw: string }) {
  const spec = useMemo(() => parseSpec(query), [query]);
  const exam = isExam(spec);
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

  const items = state.ids.map((id) => EXERCISE_BY_ID.get(id)).filter((e): e is ExerciseEntry => Boolean(e));
  const done = state.index >= items.length;
  const item = items[state.index];
  // What the screen shows: the exercise at hand (its lesson is downloaded first), or every exercise
  // of the run on the summary.
  const shown = useMemo(() => (done ? state.ids : item ? [item.id] : []), [done, item, state.ids]);
  const { value: loaded, failed } = useExercises(shown);
  const current = item && loaded?.get(item.id);
  const xpTotal = state.played.reduce((s, p) => s + p.xp, 0);
  const label = specLabel(spec);

  // While the first exercise is answered, the lessons of the next ones download.
  const started = Boolean(current);
  useEffect(() => {
    if (started) preloadExercises(state.ids);
  }, [started, state.ids]);

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
    // The prompt of the exercise; the title of the summary, or of the view when the exercise cannot be downloaded.
    document.getElementById(current ? `prompt-${current.id}` : 'main-title')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    // Only when the exercise changes, not after each answer.
  }, [current, done, failed]);

  if (items.length === 0) return <EmptySession spec={spec} />;

  if (done) return <Summary label={label} exercises={loaded} failed={failed} played={state.played} exam={exam} spec={spec} runId={runId} />;

  const onAnswered = (r: GradeResult, draft: Draft) => {
    // One attempt per exercise and run: XP and spaced repetition never count an answer twice.
    if (!current || answeredCurrent(state) || answering.current === state.index) return undefined;
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
  const module = MODULE_BY_ID.get(item.module);
  // The exercise's lesson and type, above it, unless the session's name says it already. The top bar
  // only keeps that name, and only where it fits: on phones it leads this line instead (app.css).
  const about = [spec.kind === 'module' ? null : module?.title, spec.kind === 'type' ? null : typeOf(item)].filter(Boolean).join(SEP);
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
            <span className="player-session">
              <MdInline text={label} />
            </span>
            <span className="num">
              {state.index + 1} / {items.length}
            </span>
          </div>
          <div className="proofbar-wrap" role="progressbar" aria-label="Avancement de la session" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={state.index}>
            <ProofBar total={items.length} played={state.played} now={state.index} blind={exam} />
          </div>
        </div>
        <span className="player-xp">
          {exam ? 'Examen' : `+${xpTotal} XP`}
        </span>
      </div>
      {current ? (
        <ExerciseView
          key={`${current.id}-${state.index}`}
          ex={current}
          about={
            <>
              <span className="task-about-session">
                <MdInline text={label} />
                {SEP}
              </span>
              <MdInline text={about} />
            </>
          }
          mode={exam ? 'exam' : 'practice'}
          seed={seedOf(runId, state.index)}
          answered={answered?.draft ? { result: { verdict: answered.verdict, score: answered.score }, draft: answered.draft, xp: answered.xp } : undefined}
          onAnswered={onAnswered}
          onNext={next}
          nextLabel={last ? 'Voir le bilan' : 'Épreuve suivante'}
        />
      ) : failed ? (
        // The view keeps a title, which takes the focus in place of the exercise's prompt.
        <>
          <h1 id="main-title" className="task-prompt" tabIndex={-1}>
            <MdInline text={label} />
          </h1>
          <LoadFailed what="cette épreuve" />
        </>
      ) : (
        <Loading what="de l’épreuve" />
      )}
    </div>
  );
}

/**
 * A run as the control strip a printer leaves at the edge of a proof: one patch an exercise. A right
 * answer fills its patch, a « presque » half of it, a wrong one leaves it hollow, ringed in the
 * correction's red: a shape as well as a colour, for whoever tells red from green badly. The exercise
 * in hand is the blue one. An exam shows no verdict before its end (`blind`): its patches are only done
 * or to do. The strip is a picture of what the text beside it says (« 4 / 10 », the summary's score).
 */
function ProofBar({ total, played, now, blind }: { total: number; played: Played[]; now?: number; blind?: boolean }) {
  return (
    <span className="proofbar" aria-hidden="true" data-dense={total > 16 ? '' : undefined}>
      {Array.from({ length: total }, (_, i) => {
        const p = played[i];
        return <i key={i} data-state={p ? (blind ? 'done' : p.verdict) : i === now ? 'now' : 'todo'} />;
      })}
    </span>
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
          Choisir un autre entraînement
        </Link>
      </div>
    </div>
  );
}

const ICON = { correct: CircleCheck, partial: CircleDot, wrong: CircleX };
const CLASS = { correct: 'ok', partial: 'partial', wrong: 'ko' };
const WORD = { correct: 'Juste', partial: 'Presque', wrong: 'À reprendre' };

/** The answers of a summary are read, not changed. */
const keepDraft = () => {};

/**
 * The answer given, marked as its correction marks it (the right option, the zones found and missed,
 * the expected order…), with the options in the order they were shown, then the recommended answer.
 */
function RecapCorrection({ id, ex, draft, seed }: { id: string; ex: Exercise; draft: Draft; seed: number }) {
  const order = useMemo(() => displayOrder(ex, seeded(seed)), [ex, seed]);
  const contextId = ex.context ? `${id}-context` : undefined;
  return (
    <div className="recap-correction">
      {ex.context && (
        <div id={contextId}>
          <Md text={ex.context} className="task-context" />
        </div>
      )}
      <QuestionStage ex={ex} />
      <ExercisePlayer ex={ex} draft={draft} setDraft={keepDraft} revealed order={order} labelledBy={`${id}-prompt`} describedBy={contextId} />
      <div className="recap-recommended">
        <p>
          <strong>Choix recommandé{'\u00A0'}:</strong>
        </p>
        <Recommended ex={ex} draft={draft} />
      </div>
    </div>
  );
}

/** True once `ref` has come within a screen's height of the screen, while `watch` holds. */
function useNearScreen(ref: RefObject<Element | null>, watch: boolean): boolean {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!watch || near || !el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, watch, near]);
  return near;
}

/** One exercise of the summary: its verdict, its question and, opened, its correction. */
function RecapItem({ id, ex, played: p, seed, startOpen }: { id: string; ex: Exercise; played: Played; seed: number; startOpen: boolean }) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLLIElement>(null);
  // The correction draws mocks: only once open and near the screen. An exam's summary opens every
  // wrong answer, up to 30 with some 70 mocks: drawn at once, they blocked the page 180 ms on a
  // computer, several times longer on a phone.
  const near = useNearScreen(ref, open);
  const Icon = ICON[p.verdict];
  return (
    <li ref={ref}>
      <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary>
          <Icon className={CLASS[p.verdict]} aria-label={WORD[p.verdict]} />
          <span id={`${id}-prompt`}>
            <MdInline text={ex.prompt} />
          </span>
          <ChevronDown aria-hidden="true" />
        </summary>
        <div className="recap-body">
          <p className="small muted">
            <MdInline text={MODULE_BY_ID.get(ex.module ?? '')?.title ?? ''} />
            {SEP}
            {typeOf(ex)}
          </p>
          {/* A run saved before the answers were kept, or an exercise changed since, has only its text. */}
          {open && near && draftFits(ex, p.draft) && <RecapCorrection id={id} ex={ex} draft={p.draft} seed={seed} />}
          <p>
            <strong>À retenir{'\u00A0'}:</strong> <MdInline text={ex.takeaway} />
          </p>
          <Md text={ex.explanation} className="prose small" />
          <Link to={`/apprendre/${ex.module}`} className="small">
            Revoir la leçon
          </Link>
        </div>
      </details>
    </li>
  );
}

/**
 * An evaluation's or an exam's score lesson by lesson, the weakest first: where to go back to. A
 * « presque » counts half, as in the session's score.
 */
function ByLesson({ played }: { played: Played[] }) {
  const rows = new Map<string, { right: number; total: number }>();
  for (const p of played) {
    const module = EXERCISE_BY_ID.get(p.id)?.module;
    if (!module) continue;
    const row = rows.get(module) ?? { right: 0, total: 0 };
    row.right += p.verdict === 'correct' ? 1 : p.verdict === 'partial' ? 0.5 : 0;
    row.total += 1;
    rows.set(module, row);
  }
  const list = [...rows.entries()].sort(([, a], [, b]) => a.right / a.total - b.right / b.total);
  if (list.length < 2) return null;
  return (
    <section className="section" aria-labelledby="by-lesson-title">
      <h2 id="by-lesson-title">Par leçon</h2>
      <ul className="by-lesson">
        {list.map(([id, r]) => (
          <li key={id}>
            <Link to={`/apprendre/${id}`}>{frenchSpacing(MODULE_BY_ID.get(id)?.title ?? id)}</Link>
            <span className="num">
              {String(r.right).replace('.', ',')}
              {'\u00A0'}/ {r.total}
            </span>
            <span className="meter" style={{ '--value': `${Math.round((r.right / r.total) * 100)}%` } as CSSProperties} aria-hidden="true">
              <span />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const AGAIN_STYLE: CSSProperties = { whiteSpace: 'normal', textAlign: 'center', textWrap: 'balance', paddingBlock: 'var(--s2)' };

/**
 * The same kind of session again, named for what it starts (an empty review would lead nowhere). `short`
 * names it in the bar of a phone, beside « Accueil », where the name of a lesson would take four lines:
 * the summary's title says which session it is.
 */
function nextSession(spec: SessionSpec, label: string): { to: string; text: string; short: string } {
  switch (spec.kind) {
    case 'daily':
      return { to: '/session?mode=daily', text: 'Nouvelle session du jour', short: 'Nouvelle session du jour' };
    case 'module':
      return { to: `/session?mode=module&id=${encodeURIComponent(spec.moduleId)}`, text: `Nouvelle session : ${label}`, short: 'Nouvelle session' };
    case 'theme':
      return { to: `/session?mode=theme&id=${encodeURIComponent(spec.themeId)}`, text: `Nouvelle session : ${label}`, short: 'Nouvelle session' };
    case 'evaluation':
      return {
        to: `/session?mode=evaluation&id=${encodeURIComponent(spec.themeId)}`,
        text: `Nouvelle évaluation : ${THEME_BY_ID.get(spec.themeId as ThemeId)?.title ?? ''}`,
        short: 'Nouvelle évaluation',
      };
    case 'type':
      return { to: `/session?mode=type&id=${spec.type}`, text: `Nouvelle session : ${label}`, short: 'Nouvelle session' };
    case 'culture':
      return { to: `/session?mode=culture${spec.cultureId ? `&id=${encodeURIComponent(spec.cultureId)}` : ''}`, text: `Nouvelle session : ${label}`, short: 'Nouvelle session' };
    case 'exam':
      return { to: '/session?mode=exam', text: 'Nouvel examen blanc', short: 'Nouvel examen blanc' };
    case 'review':
    case 'mistakes':
      return { to: '/session?mode=daily', text: 'Lancer la session du jour', short: 'Lancer la session du jour' };
  }
}

interface SummaryProps {
  label: string;
  /** The exercises of the run, once their lessons are downloaded (the score needs none of them). */
  exercises: Map<string, Exercise> | undefined;
  failed: boolean;
  played: Played[];
  exam: boolean;
  spec: SessionSpec;
  /** The run, whose seeds put the options of each exercise back in the order they were shown. */
  runId: string;
}

function Summary({ label, exercises, failed, played, exam, spec, runId }: SummaryProps) {
  const t = tally(played);
  const parts = scoreParts(t);
  const message = summaryMessage(t);
  // « Mes erreurs » only holds wrong answers: a « presque » is not one (engine/session.ts).
  const missed = t.wrong > 0;
  const again = nextSession(spec, label);
  // On a phone the next step stays in a bar at the bottom of the screen, as « Vérifier » did all along
  // the session: at the end of the page, it came after ten corrections (thirty for an exam), on a
  // screen without tabs, no way out in sight.
  const dock = useMedia(PHONE_DOCK);

  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Bilan — <MdInline text={label} />
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
        {/* The run at a glance, as its strip stood at the last exercise. */}
        <ProofBar total={played.length} played={played} />
        {message && <p className="muted">{message}</p>}
      </header>

      {exam && <ByLesson played={played} />}

      <section className="section" aria-labelledby="recap-title">
        <h2 id="recap-title">{exam ? 'Corrections' : 'Revoir les épreuves'}</h2>
        {!exercises && (failed ? <LoadFailed what="les corrections" /> : <Loading what="des corrections" />)}
        {/* A correction drawn as it nears the screen can push the focused control away (keepFocusInView). */}
        <ul className="recap" onFocus={keepFocusInView}>
          {played.map((p, i) => {
            const ex = exercises?.get(p.id);
            if (!ex) return null;
            // An exam showed no correction: the ones it got wrong are open.
            return <RecapItem key={`${p.id}-${i}`} id={`recap-${i}`} ex={ex} played={p} seed={seedOf(runId, i)} startOpen={exam && p.verdict !== 'correct'} />;
          })}
        </ul>
      </section>

      {dock ? (
        <>
          {/* What the bar leaves out, where the page ends. */}
          {missed && (
            <div className="btn-row">
              <Link to={again.to} className="btn btn-secondary" style={AGAIN_STYLE}>
                {frenchSpacing(again.text)}
              </Link>
            </div>
          )}
          <div className="summary-dock">
            {missed ? (
              <Link to="/session?mode=mistakes" className="btn btn-primary">
                Refaire mes erreurs
              </Link>
            ) : (
              // Its name starts with the words it shows (WCAG 2.5.3), then says which session.
              <Link to={again.to} className="btn btn-primary" aria-label={again.text === again.short ? undefined : frenchSpacing(again.text)}>
                {again.short}
              </Link>
            )}
            <Link to="/" className="btn btn-secondary">
              Accueil
            </Link>
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
}
