import { CircleCheck, CircleX, Timer, X } from 'lucide-react';
import { useEffect, useEffectEvent, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, navigate } from '../app/router';
import { store, useProgress } from '../app/store';
import { keepInView } from '../components/exercise/ExerciseView';
import { eventOrigin, handlesOwnKeys, hasModifier, within } from '../components/exercise/keys';
import { EXERCISES, MODULE_BY_ID, useStatements } from '../content';
import { grade } from '../engine/grade';
import { addSession, recordAttempt, setRecord } from '../engine/progress';
import type { TrueFalseExercise } from '../engine/types';
import { count } from '../lib/french';
import { MdInline, frenchSpacing } from '../lib/markdown';
import { pauseClock, remaining, resumeClock, secondsLeft, startClock, type Clock } from './blitzClock';
import { LoadFailed, Loading } from './LoadFailed';
import { alternateTrueFalse } from './trueFalseMix';

const DURATION = 90;
const RECORD_ID = 'blitz';

interface Answered {
  ex: TrueFalseExercise;
  ok: boolean;
  xp: number;
}

/** Timed true/false sprint: the clock stops while the correction is on screen. */
export function Blitz() {
  const progress = useProgress();
  // « Vrai » and « faux » come as often as each other while both remain (tf-balance-1). The order is
  // drawn from the light index; the statements themselves come in one small chunk.
  const pool = useMemo(() => alternateTrueFalse(EXERCISES.filter((e) => e.type === 'truefalse').map((e) => ({ id: e.id, answer: Boolean(e.answer) }))), []);
  const { value: statements, failed } = useStatements();
  /** « Lancer le chrono » was used before the statements arrived: the challenge starts with them. */
  const [waiting, setWaiting] = useState(false);
  const [clock, setClock] = useState<Clock | null>(null);
  const [now, setNow] = useState(() => performance.now());
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<Answered[]>([]);
  const [last, setLast] = useState<Answered | null>(null);
  const saved = useRef(false);
  /** The record as it stood when the challenge started: saving the new one must not hide « nouveau record ». */
  const startBest = useRef(0);
  const taskRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLElement>(null);
  const best = progress.records[RECORD_ID] ?? 0;
  const started = clock !== null;
  const left = clock ? secondsLeft(clock, now) : DURATION;
  const current = pool[index] && statements?.get(pool[index].id);
  const over = started && (left <= 0 || !current);
  const score = answered.filter((a) => a.ok).length;

  // Redraw the clock a few times a second while a statement waits for an answer.
  useEffect(() => {
    if (!clock || clock.since === null || over) return;
    const t = window.setInterval(() => setNow(performance.now()), 250);
    return () => window.clearInterval(t);
  }, [clock, over]);

  const begin = () => {
    const t = performance.now();
    startBest.current = best;
    setNow(t);
    setClock(startClock(DURATION * 1000, t));
  };
  // Before the statements have arrived, « Lancer le chrono » waits for them.
  const start = () => (statements ? begin() : setWaiting(true));
  const beginWhenReady = useEffectEvent(begin);
  useEffect(() => {
    if (!waiting || !statements) return;
    setWaiting(false);
    beginWhenReady();
  }, [waiting, statements]);

  const answer = (value: boolean) => {
    const t = performance.now();
    if (!current || !clock || last || over || remaining(clock, t) <= 0) return;
    const r = grade(current, { type: 'truefalse', value });
    let xp = 0;
    store.update((s) => {
      const out = recordAttempt(s, current, r);
      xp = out.xp;
      return out.state;
    });
    const a = { ex: current, ok: r.verdict === 'correct', xp };
    setClock(pauseClock(clock, t));
    setNow(t);
    setAnswered((x) => [...x, a]);
    setLast(a);
  };

  const next = () => {
    const t = performance.now();
    setClock((c) => c && resumeClock(c, t));
    setNow(t);
    setLast(null);
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || hasModifier(e)) return;
      // Buttons and links keep their own Enter and Space (« Quitter le défi » quits, logic-16).
      const own = handlesOwnKeys(eventOrigin(e));
      if (!started) {
        if (e.key === 'Enter' && !e.repeat && !own) {
          e.preventDefault();
          start();
        }
        return;
      }
      if (over) return;
      if (last) {
        // A held key does not run through the corrections.
        if ((e.key === 'Enter' || e.key === ' ') && !e.repeat && !own) {
          e.preventDefault();
          next();
        }
        return;
      }
      // V and F answer only while the focus is in the challenge (WCAG 2.1.4).
      if (e.repeat || !within(e, taskRef.current)) return;
      const key = e.key.toLowerCase();
      if (key === 'v' || e.key === 'ArrowLeft') answer(true);
      else if (key === 'f' || e.key === 'ArrowRight') answer(false);
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
          // The XP already credited answer by answer (logic-17).
          xp: answered.reduce((sum, a) => sum + a.xp, 0),
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

  // The answer buttons switch off once used: the focus moves to the correction instead of being lost.
  useEffect(() => {
    const el = feedbackRef.current;
    if (!last || !el) return;
    el.focus({ preventScroll: true });
    keepInView(el, taskRef.current);
  }, [last]);

  if (!started)
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <h1 id="main-title" tabIndex={-1}>
            Défi chrono
          </h1>
          <p className="lead">
            {frenchSpacing(`${DURATION} secondes pour trancher le plus d’affirmations possible : vrai ou faux ? Le chronomètre s’arrête pendant que tu lis la correction.`)}
          </p>
          <p className="muted">
            Record{'\u00A0'}: <strong className="num">{best}</strong> bonne{best > 1 ? 's' : ''} réponse{best > 1 ? 's' : ''} · {pool.length} affirmations
            disponibles. Clavier{'\u00A0'}: V ou ← pour vrai, F ou → pour faux, Entrée pour continuer.
          </p>
        </header>
        {failed ? (
          <LoadFailed what="les affirmations du défi">
            <Link to="/entrainement" className="btn btn-ghost">
              Retour
            </Link>
          </LoadFailed>
        ) : (
          <>
            <div className="btn-row">
              <button type="button" className="btn btn-primary" onClick={start}>
                <Timer aria-hidden="true" /> Lancer le chrono
              </button>
              <Link to="/entrainement" className="btn btn-ghost">
                Retour
              </Link>
            </div>
            {waiting && <Loading what="des affirmations" />}
          </>
        )}
      </div>
    );

  if (over || !current) {
    const record = startBest.current;
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
              {score > record
                ? ` — nouveau record${record > 0 ? ` (ancien\u00A0: ${record})` : ''}`
                : ` · record\u00A0: ${Math.max(best, score)}`}
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
            Autres entraînements
          </Link>
        </div>
      </div>
    );
  }

  const module = current.module ? MODULE_BY_ID.get(current.module) : undefined;
  return (
    <div className="player">
      <div className="player-top">
        <button type="button" className="icon-btn" onClick={() => navigate('/entrainement')} aria-label="Quitter le défi">
          <X aria-hidden="true" />
        </button>
        <div className="player-progress">
          <div className="player-progress-label">
            <span>Défi chrono</span>
            <span className="num" aria-live="off">
              {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
            </span>
          </div>
          <div
            className="meter meter--mark"
            role="timer"
            aria-label={count(left, 'seconde restante', 'secondes restantes')}
            style={{ '--value': `${(left / DURATION) * 100}%` } as CSSProperties}
          >
            <span />
          </div>
        </div>
        <span className="player-xp num">
          {score} juste{score > 1 ? 's' : ''}
        </span>
      </div>
      <article className="task" ref={taskRef}>
        {/* The statement's lesson: in the top bar, it was cut short on phones. The prompt, which gets the focus, points to it. */}
        {module && (
          <p id={`blitz-about-${current.id}`} className="task-about">
            <MdInline text={module.title} />
          </p>
        )}
        <h1 id={`blitz-q-${current.id}`} className="task-prompt" tabIndex={-1} aria-describedby={module ? `blitz-about-${current.id}` : undefined}>
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
          <section ref={feedbackRef} className="feedback" data-verdict={last.ok ? 'correct' : 'wrong'} tabIndex={-1} aria-label="Correction">
            <p className="verdict">
              {last.ok ? <CircleCheck aria-hidden="true" /> : <CircleX aria-hidden="true" />}
              {last.ok ? 'Juste' : 'À reprendre'}
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
            <span className="shortcut-hint">V ou ←{'\u00A0'}: vrai · F ou →{'\u00A0'}: faux</span>
          )}
        </div>
      </article>
    </div>
  );
}
