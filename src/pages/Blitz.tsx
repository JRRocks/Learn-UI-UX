import { CircleCheck, CircleX, Timer, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, navigate } from '../app/router';
import { store, useProgress } from '../app/store';
import { EXERCISES, MODULE_BY_ID } from '../content';
import { grade } from '../engine/grade';
import { addSession, recordAttempt, setRecord } from '../engine/progress';
import { shuffle } from '../engine/random';
import type { TrueFalseExercise } from '../engine/types';
import { MdInline } from '../lib/markdown';

const DURATION = 90;
const RECORD_ID = 'blitz';

interface Answered {
  ex: TrueFalseExercise;
  ok: boolean;
}

/** Timed true/false sprint: the clock stops while the correction is on screen. */
export function Blitz() {
  const progress = useProgress();
  const pool = useMemo(() => shuffle(EXERCISES.filter((e): e is TrueFalseExercise => e.type === 'truefalse')), []);
  const [started, setStarted] = useState(false);
  const [left, setLeft] = useState(DURATION);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<Answered[]>([]);
  const [last, setLast] = useState<Answered | null>(null);
  const saved = useRef(false);
  const best = progress.records[RECORD_ID] ?? 0;
  const over = started && (left <= 0 || index >= pool.length);
  const current = pool[index];
  const score = answered.filter((a) => a.ok).length;

  // Tick only while a question is waiting for an answer.
  useEffect(() => {
    if (!started || over || last) return;
    const t = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(t);
  }, [started, over, last]);

  const answer = (value: boolean) => {
    if (!current || last || over) return;
    const r = grade(current, { type: 'truefalse', value });
    store.update((s) => recordAttempt(s, current, r).state);
    const a = { ex: current, ok: r.verdict === 'correct' };
    setAnswered((x) => [...x, a]);
    setLast(a);
  };

  const next = () => {
    setLast(null);
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!started) {
        if (e.key === 'Enter') setStarted(true);
        return;
      }
      if (over) return;
      if (last && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        next();
      } else if (!last && (e.key === 'v' || e.key === 'V' || e.key === 'ArrowLeft')) answer(true);
      else if (!last && (e.key === 'f' || e.key === 'F' || e.key === 'ArrowRight')) answer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    if (!over || saved.current || answered.length === 0) return;
    saved.current = true;
    store.update((s) =>
      setRecord(
        addSession(s, {
          id: `${Date.now()}`,
          at: new Date().toISOString(),
          kind: 'blitz',
          label: 'Défi chrono',
          total: answered.length,
          correct: score,
          partial: 0,
          xp: 0,
          missed: answered.filter((a) => !a.ok).map((a) => a.ex.id),
        }),
        RECORD_ID,
        score,
      ),
    );
  }, [over, answered, score]);

  useEffect(() => {
    document.getElementById(current && started && !over ? `blitz-q-${current.id}` : 'main-title')?.focus({ preventScroll: true });
  }, [current, started, over]);

  if (!started)
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <h1 id="main-title" tabIndex={-1}>
            Défi chrono
          </h1>
          <p className="lead">
            {DURATION} secondes pour trancher le plus d’affirmations possible : vrai ou faux ? Le chronomètre s’arrête pendant que tu lis la
            correction.
          </p>
          <p className="muted">
            Record : <strong className="num">{best}</strong> bonne{best > 1 ? 's' : ''} réponse{best > 1 ? 's' : ''} · {pool.length} affirmations
            disponibles. Clavier : V ou ← pour vrai, F ou → pour faux, Entrée pour continuer.
          </p>
        </header>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={() => setStarted(true)}>
            <Timer aria-hidden="true" /> Lancer le chrono
          </button>
          <Link to="/entrainement" className="btn btn-ghost">
            Retour
          </Link>
        </div>
      </div>
    );

  if (over)
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <h1 id="main-title" tabIndex={-1}>
            Temps écoulé
          </h1>
          <p className="summary-score">
            <strong>{score}</strong>
            <span className="lead">
              bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {answered.length}
              {score > best ? ' — nouveau record' : ` · record : ${Math.max(best, score)}`}
            </span>
          </p>
        </header>
        {answered.some((a) => !a.ok) && (
          <section className="section" aria-labelledby="blitz-missed">
            <h2 id="blitz-missed">À retenir</h2>
            <ul className="recap">
              {answered
                .filter((a) => !a.ok)
                .map((a) => (
                  <li key={a.ex.id} style={{ padding: 'var(--s3) 0' }}>
                    <p>
                      <MdInline text={a.ex.prompt} /> — <strong>{a.ex.answer ? 'vrai' : 'faux'}</strong>.
                    </p>
                    <p className="small muted">
                      <MdInline text={a.ex.takeaway} />
                    </p>
                  </li>
                ))}
            </ul>
          </section>
        )}
        <div className="btn-row">
          <Link to={`/session?mode=blitz&n=${Date.now()}`} className="btn btn-primary">
            Rejouer
          </Link>
          <Link to="/entrainement" className="btn btn-secondary">
            Autres formats
          </Link>
        </div>
      </div>
    );

  const module = current.module ? MODULE_BY_ID.get(current.module) : undefined;
  return (
    <div className="player">
      <div className="player-top">
        <button type="button" className="icon-btn" onClick={() => navigate('/entrainement')} aria-label="Quitter le défi">
          <X aria-hidden="true" />
        </button>
        <div className="player-progress">
          <div className="player-progress-label">
            <span>Défi chrono · {module?.title}</span>
            <span className="num" aria-live="off">
              {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
            </span>
          </div>
          <div
            className="meter meter--mark"
            role="timer"
            aria-label={`${left} secondes restantes`}
            style={{ '--value': `${(left / DURATION) * 100}%` } as CSSProperties}
          >
            <span />
          </div>
        </div>
        <span className="player-xp num">
          {score} juste{score > 1 ? 's' : ''}
        </span>
      </div>
      <article className="task">
        <h1 id={`blitz-q-${current.id}`} className="task-prompt" tabIndex={-1}>
          <MdInline text={current.prompt} />
        </h1>
        <div className="tf" role="group" aria-label="Ta réponse">
          {[true, false].map((v) => {
            const state = last ? (v === current.answer ? 'right' : 'dim') : 'idle';
            return (
              <button key={String(v)} type="button" className="option" data-state={state} disabled={Boolean(last)} onClick={() => answer(v)}>
                <span className="option-key" aria-hidden="true">
                  {v ? 'V' : 'F'}
                </span>
                {v ? 'Vrai' : 'Faux'}
              </button>
            );
          })}
        </div>
        {last && (
          <section className="feedback" data-verdict={last.ok ? 'correct' : 'wrong'} aria-live="polite">
            <p className="verdict">
              {last.ok ? <CircleCheck aria-hidden="true" /> : <CircleX aria-hidden="true" />}
              {last.ok ? 'Juste' : 'Raté'}
            </p>
            <p className="takeaway">
              <MdInline text={current.takeaway} />
            </p>
          </section>
        )}
        <div className="task-actions">
          {last ? (
            <button type="button" className="btn btn-primary" onClick={next}>
              Affirmation suivante
            </button>
          ) : (
            <span className="shortcut-hint">V ou ← : vrai · F ou → : faux</span>
          )}
        </div>
      </article>
    </div>
  );
}
