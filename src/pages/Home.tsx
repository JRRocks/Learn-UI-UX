import { BookOpen, Layers, Play, Repeat } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { CATEGORIES, EXERCISES, MODULES, RULE_CARDS, exercisesOf } from '../content';
import { BADGES } from '../engine/badges';
import { addDays, dayKey } from '../engine/dates';
import { dueCardKeys, dueExerciseIds, mastery, masteryLabel, streak } from '../engine/progress';
import { unfinishedSession } from './Session';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

export function Home() {
  const p = useProgress();
  const today = dayKey();
  const todayStats = p.days[today] ?? { xp: 0, answered: 0, correct: 0 };
  const goal = p.settings.dailyGoal;
  const st = streak(p);
  const due = dueExerciseIds(p, today).length;
  const cardsDue = dueCardKeys(p, today).length;
  const fresh = Object.keys(p.items).length === 0 && Object.keys(p.lessons).length === 0;
  const nextLesson = MODULES.find((m) => !p.lessons[m.id]);
  const dateLabel = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  const last14 = Array.from({ length: 14 }, (_, i) => addDays(today, i - 13));
  const earned = BADGES.filter((b) => p.badges[b.id]);
  const resume = unfinishedSession();

  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {fresh ? 'Deviens meilleur en UI/UX, une épreuve à la fois' : 'Aujourd’hui'}
        </h1>
        <p className="lead">
          {fresh
            ? 'Des leçons courtes tirées des références d’impeccable, puis des épreuves : choisir le meilleur visuel, repérer l’erreur, régler une valeur à l’œil. Chaque réponse est corrigée avec le choix recommandé et son pourquoi.'
            : `${dateLabel.charAt(0).toUpperCase()}${dateLabel.slice(1)}.`}
        </p>
      </header>

      <section className="today" aria-label="Entraînement du jour">
        <div className="today-main">
          <h2>Session du jour</h2>
          <p>
            10 épreuves mêlant tes révisions et de nouvelles notions, environ 8 minutes. Chaque erreur revient plus tard, au bon moment.
          </p>
          <div className="goal">
            <span>
              Objectif du jour : <strong className="num">{Math.min(todayStats.xp, goal)}</strong> / {goal} XP
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
                Reprendre : {resume.label}
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
              <small>{due ? 'Épreuves à revoir aujourd’hui' : 'Rien à revoir pour l’instant'}</small>
            </span>
            <strong>{due}</strong>
          </Link>
          <Link to="/fiches" className="side-link">
            <Layers aria-hidden="true" />
            <span>
              Fiches
              <small>{cardsDue ? 'Règles d’or à réviser' : `${RULE_CARDS.length} règles disponibles`}</small>
            </span>
            <strong>{cardsDue}</strong>
          </Link>
          {nextLesson && (
            <Link to={`/apprendre/${nextLesson.id}`} className="side-link">
              <BookOpen aria-hidden="true" />
              <span>
                {fresh ? 'Commencer par la leçon' : 'Leçon suivante'}
                <small>
                  {nextLesson.title} · {nextLesson.minutes} min
                </small>
              </span>
            </Link>
          )}
        </div>
      </section>

      {fresh && (
        <section className="section welcome" aria-labelledby="how-title">
          <h2 id="how-title">Comment ça marche</h2>
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
                {EXERCISES.length} épreuves en 9 formats : comparaisons visuelles, chasses aux erreurs, calibrage à l’œil, associations, grilles de critique…
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
            <h2 id="streak-title">Régularité</h2>
            <Link to="/progression" className="small">
              Toute ma progression
            </Link>
          </div>
          <p>
            <strong className="num">{st.current}</strong> jour{st.current > 1 ? 's' : ''} d’affilée
            <span className="muted"> · record : {st.best}</span>
            {!st.activeToday && st.current > 0 && <span className="muted"> · une épreuve aujourd’hui prolonge la série</span>}
          </p>
          <div className="streak-strip" role="img" aria-label="Activité des 14 derniers jours">
            {last14.map((d) => {
              const xp = p.days[d]?.xp ?? 0;
              const level = xp === 0 ? 0 : xp < goal / 2 ? 1 : xp < goal ? 2 : 3;
              return <i key={d} data-level={level} title={`${d} : ${xp} XP`} />;
            })}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="atlas-title">
        <div className="section-head">
          <h2 id="atlas-title">Atlas de maîtrise</h2>
          <p className="small">La maîtrise monte quand tu réussis une épreuve, puis la réussis encore quelques jours plus tard.</p>
        </div>
        <div className="toc">
          {CATEGORIES.map((cat) => {
            const mods = MODULES.filter((m) => m.category === cat.id);
            if (!mods.length) return null;
            return (
              <div key={cat.id} className="toc-group">
                <div className="toc-group-head">
                  <h3>{cat.title}</h3>
                </div>
                <ul className="toc-list">
                  {mods.map((m) => {
                    const ids = exercisesOf(m.id).map((e) => e.id);
                    const touched = ids.some((id) => p.items[id]);
                    const v = mastery(p, ids);
                    return (
                      <li key={m.id} className="toc-row">
                        <Link to={`/apprendre/${m.id}`}>
                          <span className="toc-title">{m.title}</span>
                          <span className="toc-mastery">
                            <span>{masteryLabel(v, touched)}</span>
                            <span className="meter" style={pct(v)} aria-hidden="true">
                              <span />
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

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
