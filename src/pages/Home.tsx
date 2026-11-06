import { BookOpen, Layers, Play, Repeat } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link, usePageTitle } from '../app/router';
import { useProgress } from '../app/store';
import { EXERCISES, EXERCISE_BY_ID, MODULES, RULE_CARDS, RULE_CARD_BY_KEY, exercisesOf } from '../content';
import { BADGES } from '../engine/badges';
import { addDays, dayKey } from '../engine/dates';
import { dueCardKeys, dueExerciseIds, mastery, masteryLabel, streak, type ProgressState } from '../engine/progress';
import { count, shortDay } from '../lib/french';
import { frenchSpacing } from '../lib/markdown';
import { unfinishedSession } from './Session';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

/** Lessons worth reopening: the ones in progress (latest first), then the next ones not started. */
function lessonsToContinue(p: ProgressState, max = 3) {
  const rows = MODULES.map((m) => {
    const ids = exercisesOf(m.id).map((e) => e.id);
    const seen = ids.map((id) => p.items[id]).filter(Boolean);
    const v = mastery(p, ids);
    const last = seen.reduce((acc, s) => ((s?.lastSeen ?? '') > acc ? (s?.lastSeen ?? '') : acc), '');
    return { m, v, touched: seen.length > 0, last };
  });
  const inProgress = rows.filter((r) => r.touched && r.v < 0.85).sort((a, b) => (a.last < b.last ? 1 : a.last > b.last ? -1 : 0));
  const next = rows.filter((r) => !r.touched);
  // Everything touched is mastered: the weakest ones still deserve a visit.
  const mastered = rows.filter((r) => r.touched && r.v >= 0.85).sort((a, b) => a.v - b.v);
  return [...inProgress, ...next, ...mastered].slice(0, max);
}

export function Home() {
  const p = useProgress();
  const today = dayKey();
  const todayStats = p.days[today] ?? { xp: 0, answered: 0, correct: 0 };
  const goal = p.settings.dailyGoal;
  const st = streak(p);
  // Same counts as S’entraîner and the sessions: ids gone from the content are left out.
  const due = dueExerciseIds(p, today, EXERCISE_BY_ID).length;
  const cardsDue = dueCardKeys(p, today, RULE_CARD_BY_KEY).length;
  const cardsScheduled = RULE_CARDS.some((c) => p.cards[c.key]);
  const fresh = Object.keys(p.items).length === 0 && Object.keys(p.lessons).length === 0;
  const nextLesson = MODULES.find((m) => !p.lessons[m.id]);
  const dateLabel = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  const last14 = Array.from({ length: 14 }, (_, i) => addDays(today, i - 13));
  const active14 = last14.filter((d) => (p.days[d]?.xp ?? 0) > 0).length;
  const goal14 = last14.filter((d) => (p.days[d]?.xp ?? 0) >= goal).length;
  const earned = BADGES.filter((b) => p.badges[b.id]);
  const resume = unfinishedSession();
  const continueWith = lessonsToContinue(p);
  usePageTitle('Épreuves — atelier UI/UX');

  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {fresh ? 'Deviens meilleur en UI/UX, une épreuve à la fois' : 'Aujourd’hui'}
        </h1>
        <p className="lead">
          {fresh
            ? frenchSpacing(
                'Des leçons courtes tirées des références d’impeccable, puis des épreuves : choisir le meilleur visuel, repérer l’erreur, régler une valeur à l’œil. Chaque réponse est corrigée avec le choix recommandé et son pourquoi.',
              )
            : `${dateLabel.charAt(0).toUpperCase()}${dateLabel.slice(1)}.`}
        </p>
      </header>

      <section className="today" aria-label="Entraînement du jour">
        <div className="today-main">
          <h2>Session du jour</h2>
          <p>
            10 épreuves mêlant tes révisions et de nouvelles notions, environ 8{' '}minutes. Chaque erreur revient plus tard, au bon moment.
          </p>
          <div className="goal">
            <span>
              Objectif du jour{' '}: <strong className="num">{Math.min(todayStats.xp, goal)}</strong> / {goal}
              {' '}XP
              {todayStats.xp >= goal ? ' — atteint' : ''}
            </span>
            <div
              className="meter"
              role="progressbar"
              aria-label="Objectif du jour"
              aria-valuemin={0}
              aria-valuemax={goal}
              aria-valuenow={Math.min(todayStats.xp, goal)}
              style={pct(Math.min(1, todayStats.xp / goal))}
            >
              <span />
            </div>
          </div>
          <Link to="/session?mode=daily" className="btn btn-primary">
            {fresh ? 'Faire ma première session' : 'Commencer'}
          </Link>
        </div>

        <div className="today-side">
          {resume && (
            <Link to={resume.raw} className="side-link">
              <Play aria-hidden="true" />
              <span>
                {frenchSpacing(`Reprendre : ${resume.label}`)}
                <small>Reprise à l’épreuve {resume.index + 1}</small>
              </span>
              <strong>
                {resume.index}/{resume.total}
              </strong>
            </Link>
          )}
          <Link to="/session?mode=review" className="side-link">
            <Repeat aria-hidden="true" />
            <span>
              Révisions
              <small>{due ? 'Épreuves à revoir aujourd’hui' : 'Rien à revoir aujourd’hui'}</small>
            </span>
            {due > 0 && <strong>{due}</strong>}
          </Link>
          <Link to="/fiches" className="side-link">
            <Layers aria-hidden="true" />
            <span>
              Fiches
              <small>
                {cardsDue ? 'Fiches à réviser aujourd’hui' : cardsScheduled ? 'Rien à réviser aujourd’hui' : `${RULE_CARDS.length} règles d’or à découvrir`}
              </small>
            </span>
            {cardsDue > 0 && <strong>{cardsDue}</strong>}
          </Link>
          {nextLesson && (
            <Link to={`/apprendre/${nextLesson.id}`} className="side-link">
              <BookOpen aria-hidden="true" />
              <span>
                {fresh ? 'Commencer par la leçon' : 'Leçon suivante'}
                <small>{frenchSpacing(`${nextLesson.title} · ${nextLesson.minutes} min`)}</small>
              </span>
            </Link>
          )}
        </div>
      </section>

      {fresh && (
        <section className="section welcome" aria-labelledby="how-title">
          <div className="section-head">
            <h2 id="how-title">Comment ça marche</h2>
            <Link to="/apprendre" className="small">
              Voir les {MODULES.length} leçons
            </Link>
          </div>
          <ol>
            <li>
              <strong>Lis une leçon</strong>
              <span className="muted">
                {MODULES.length} leçons couvrent la typographie, la couleur, l’espace, le mouvement, la rédaction, l’accessibilité, la critique… et les
                différences d’interface entre pays.
              </span>
            </li>
            <li>
              <strong>Passe des épreuves</strong>
              <span className="muted">
                {frenchSpacing(
                  `${EXERCISES.length} épreuves en 9 formats : comparaisons visuelles, chasses aux erreurs, calibrage à l’œil, associations, grilles de critique…`,
                )}
              </span>
            </li>
            <li>
              <strong>Laisse la répétition faire son travail</strong>
              <span className="muted">Les épreuves ratées et les règles d’or reviennent à intervalles croissants jusqu’à être acquises.</span>
            </li>
          </ol>
        </section>
      )}

      {!fresh && (
        <section className="section" aria-labelledby="streak-title">
          <div className="section-head">
            <h2 id="streak-title">Série</h2>
            <Link to="/progression" className="small">
              Toute ma progression
            </Link>
          </div>
          <p>
            <strong className="num">{st.current}</strong>
            {' '}
            {st.current > 1 ? 'jours' : 'jour'}
            <span className="muted">
              {' '}
              · record{' '}: {st.best}
            </span>
            {!st.activeToday && st.current > 0 && <span className="muted"> · une épreuve aujourd’hui prolonge la série</span>}
          </p>
          <div
            className="streak-strip"
            role="img"
            aria-label={`Activité des 14 derniers jours : ${count(active14, 'jour actif', 'jours actifs')}, ${goal14 ? `objectif atteint ${count(goal14, 'fois', 'fois')}` : 'objectif jamais atteint'}`}
          >
            {last14.map((d) => {
              const xp = p.days[d]?.xp ?? 0;
              const level = xp === 0 ? 0 : xp < goal / 2 ? 1 : xp < goal ? 2 : 3;
              return <i key={d} data-level={level} title={`${shortDay(d)} : ${xp} XP`} />;
            })}
          </div>
        </section>
      )}

      {!fresh && (
        <section className="section" aria-labelledby="atlas-title">
          <div className="section-head">
            <h2 id="atlas-title">Tes leçons</h2>
            <Link to="/apprendre" className="small">
              Voir les {MODULES.length} leçons
            </Link>
          </div>
          <p className="small muted">La maîtrise monte quand tu réussis une épreuve, puis la réussis encore quelques jours plus tard.</p>
          <ul className="toc-list">
            {continueWith.map(({ m, v, touched }) => (
              <li key={m.id} className="toc-row">
                <Link to={`/apprendre/${m.id}`}>
                  <span className="toc-title">{frenchSpacing(m.title)}</span>
                  <span className="toc-mastery">
                    <span>{masteryLabel(v, touched)}</span>
                    <span className="meter" style={pct(v)} aria-hidden="true">
                      <span />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {earned.length > 0 && (
        <section className="section" aria-labelledby="badges-title">
          <h2 id="badges-title">Badges</h2>
          <p className="muted">
            {earned.map((b) => b.title).join(' · ')} — {earned.length} sur {BADGES.length}.
          </p>
        </section>
      )}
    </div>
  );
}
