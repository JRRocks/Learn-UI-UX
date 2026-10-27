import { ChevronDown, CircleCheck, CircleDot, CircleX, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, navigate } from '../app/router';
import { store } from '../app/store';
import { ExerciseView, TYPE_LABEL } from '../components/exercise/ExerciseView';
import { EXERCISES, EXERCISE_BY_ID, MODULE_BY_ID } from '../content';
import { CULTURE_NAMES } from '../content/cultures';
import type { Verdict } from '../engine/grade';
import { addSession, recordAttempt } from '../engine/progress';
import { buildSession, isDuel, type PracticeType, type SessionSpec } from '../engine/session';
import type { Exercise } from '../engine/types';
import { Md, MdInline } from '../lib/markdown';

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
      return spec.cultureId ? `Cultures — ${CULTURE_NAMES[spec.cultureId] ?? spec.cultureId}` : 'Cultures';
  }
}

interface Played {
  id: string;
  verdict: Verdict;
  score: number;
  xp: number;
}

interface Saved {
  ids: string[];
  index: number;
  played: Played[];
}

const PREFIX = 'learn-ui-ux:session:';
const keyFor = (raw: string) => `${PREFIX}${raw}`;

/** A session left unfinished in this tab, to offer "Reprendre" on the home page. */
export function unfinishedSession(): { raw: string; label: string; index: number; total: number } | null {
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key?.startsWith(PREFIX)) continue;
      const raw = key.slice(PREFIX.length);
      const saved = restore(raw);
      if (saved && saved.index > 0 && saved.index < saved.ids.length)
        return { raw, label: specLabel(parseSpec(new URLSearchParams(raw.split('?')[1] ?? ''))), index: saved.index, total: saved.ids.length };
    }
  } catch {
    // Storage unavailable: nothing to resume.
  }
  return null;
}

function restore(raw: string): Saved | null {
  try {
    const s = JSON.parse(sessionStorage.getItem(keyFor(raw)) ?? 'null') as Saved | null;
    if (s && Array.isArray(s.ids) && s.ids.every((id) => EXERCISE_BY_ID.has(id))) return s;
  } catch {
    // ignore
  }
  return null;
}

function typeOf(ex: Exercise): string {
  return isDuel(ex) ? TYPE_LABEL.duel : TYPE_LABEL[ex.type];
}

export function SessionPage({ query, raw }: { query: URLSearchParams; raw: string }) {
  const spec = useMemo(() => parseSpec(query), [query]);
  const exam = spec.kind === 'exam';
  const [state, setState] = useState<Saved>(() => {
    const saved = restore(raw);
    if (saved) return saved;
    return { ids: buildSession(spec, EXERCISES, store.get()).map((e) => e.id), index: 0, played: [] };
  });
  const recorded = useRef(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(keyFor(raw), JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [raw, state]);

  const items = state.ids.map((id) => EXERCISE_BY_ID.get(id)!).filter(Boolean);
  const done = state.index >= items.length;
  const current = items[state.index];
  const xpTotal = state.played.reduce((s, p) => s + p.xp, 0);
  const label = specLabel(spec);

  // Record the finished session once, then forget the saved run.
  useEffect(() => {
    if (!done || recorded.current || state.played.length === 0) return;
    recorded.current = true;
    store.update((s) =>
      addSession(s, {
        id: `${Date.now()}`,
        at: new Date().toISOString(),
        kind: spec.kind,
        label,
        total: state.played.length,
        correct: state.played.filter((p) => p.verdict === 'correct').length,
        partial: state.played.filter((p) => p.verdict === 'partial').length,
        xp: xpTotal,
        missed: state.played.filter((p) => p.verdict === 'wrong').map((p) => p.id),
      }),
    );
    try {
      sessionStorage.removeItem(keyFor(raw));
    } catch {
      // ignore
    }
  }, [done, label, raw, spec.kind, state.played, xpTotal]);

  useEffect(() => {
    document.getElementById(current ? `prompt-${current.id}` : 'main-title')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [current, done]);

  if (items.length === 0) return <EmptySession spec={spec} />;

  if (done) return <Summary label={label} items={items} played={state.played} exam={exam} spec={spec} />;

  const onAnswered = (r: { verdict: Verdict; score: number }) => {
    let xp = 0;
    store.update((s) => {
      const out = recordAttempt(s, current, r);
      xp = out.xp;
      return out.state;
    });
    setState((st) => ({ ...st, played: [...st.played, { id: current.id, verdict: r.verdict, score: r.score, xp }] }));
    return exam ? undefined : xp;
  };

  const next = () => setState((st) => ({ ...st, index: st.index + 1 }));
  const module = current.module ? MODULE_BY_ID.get(current.module) : undefined;
  const last = state.index === items.length - 1;

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

function Summary({ label, items, played, exam, spec }: { label: string; items: Exercise[]; played: Played[]; exam: boolean; spec: SessionSpec }) {
  const correct = played.filter((p) => p.verdict === 'correct').length;
  const partial = played.filter((p) => p.verdict === 'partial').length;
  const xp = played.reduce((s, p) => s + p.xp, 0);
  const missed = played.some((p) => p.verdict !== 'correct');
  const rate = played.length ? correct / played.length : 0;
  const message =
    rate === 1
      ? 'Sans faute. Les épreuves reviendront dans quelques jours pour ancrer ces règles.'
      : rate >= 0.7
        ? 'Solide. Relis les corrections des épreuves manquées : elles reviendront demain.'
        : 'Les épreuves manquées reviendront dès demain. Relire la leçon associée aide beaucoup.';

  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Bilan — {label}
        </h1>
        <p className="summary-score">
          <strong>
            {correct}/{played.length}
          </strong>
          <span className="lead">
            justes{partial ? `, ${partial} presque` : ''} · +{xp} XP
          </span>
        </p>
        <p className="muted">{message}</p>
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
        <Link to={`/session?mode=${spec.kind === 'module' ? `module&id=${spec.moduleId}` : 'daily'}&n=${Date.now()}`} className={missed ? 'btn btn-secondary' : 'btn btn-primary'}>
          Nouvelle session
        </Link>
        <Link to="/" className="btn btn-ghost">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
