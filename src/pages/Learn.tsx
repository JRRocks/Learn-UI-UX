import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { useProgress } from '../app/store';
import { JumpNav } from '../components/JumpNav';
import { MODULES, THEMES, exercisesOf, type Theme } from '../content';
import { mastery, masteryLabel, type ProgressState } from '../engine/progress';
import { SEP, count } from '../lib/french';
import { MdInline, frenchSpacing } from '../lib/markdown';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

/** `/impeccable typeset`: the command as impeccable's own documentation writes it. */
export function Commands({ list }: { list: string[] }) {
  return (
    <>
      {list.map((c, i) => (
        <span key={c}>
          {i > 0 && ', '}
          <code className="code-short">/impeccable {c}</code>
        </span>
      ))}
    </>
  );
}

/** The exercises of a theme's lessons, by id. */
export const themeExerciseIds = (t: Theme): string[] => t.modules.flatMap((id) => exercisesOf(id).map((e) => e.id));

/** Where the learner stands on a theme: its mastery, and whether they have started it. */
export function themeMastery(p: ProgressState, t: Theme): { value: number; touched: boolean; label: string } {
  const ids = themeExerciseIds(t);
  const touched = ids.some((id) => p.items[id]);
  const value = mastery(p, ids);
  return { value, touched, label: masteryLabel(value, touched) };
}

/**
 * « S’entraîner », then « S’évaluer », on a theme, in the order one does them. Each says which theme it
 * opens: several of them follow each other on a page (WCAG 2.4.4). Both are outlined: eight themes each
 * with a filled « S’évaluer » put up to four filled buttons on a phone's screen, against « Commencer » of
 * the day's session (one distinct element a screen, for its key action: the lesson « Lois de l’UX »).
 */
export function ThemeActions({ theme }: { theme: Theme }) {
  return (
    <div className="btn-row">
      <Link to={`/session?mode=theme&id=${theme.id}`} className="btn btn-secondary" aria-label={`S’entraîner : ${theme.title}`}>
        S’entraîner
      </Link>
      <Link to={`/session?mode=evaluation&id=${theme.id}`} className="btn btn-secondary" aria-label={`S’évaluer : ${theme.title}`}>
        S’évaluer
      </Link>
    </div>
  );
}

export function Learn() {
  const p = useProgress();
  const read = MODULES.filter((m) => p.lessons[m.id]).length;
  usePageTitle(pageTitle('Leçons'));
  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Leçons
        </h1>
        <p className="lead">
          {frenchSpacing(
            `${MODULES.length} leçons rangées en ${THEMES.length} grands thèmes. Lis une leçon, entraîne-toi dessus, puis évalue-toi sur tout un thème : l’évaluation ne corrige qu’à la fin, comme un examen.`,
          )}
          {read > 0 && ` Tu en as lu ${read}.`}
        </p>
        <JumpNav label="Aller à un thème" items={THEMES.map((t) => ({ id: `theme-${t.id}`, label: t.title }))} />
      </header>

      <div className="toc">
        {THEMES.map((theme) => {
          const mods = MODULES.filter((m) => m.theme === theme.id);
          if (!mods.length) return null;
          const tm = themeMastery(p, theme);
          const exercises = themeExerciseIds(theme).length;
          return (
            <section key={theme.id} className="toc-group" aria-labelledby={`theme-${theme.id}`}>
              <div className="toc-group-head">
                <h2 id={`theme-${theme.id}`} tabIndex={-1}>
                  {frenchSpacing(theme.title)}
                </h2>
                <p>{frenchSpacing(theme.description)}</p>
                <p className="toc-group-meta">
                  {count(mods.length, 'leçon', 'leçons')}
                  {SEP}
                  {count(exercises, 'épreuve', 'épreuves')}
                </p>
                <div className="field theme-mastery">
                  <span className="field-label">
                    Maîtrise du thème{' '}: {tm.label.toLowerCase()}
                  </span>
                  <span className="meter" style={pct(tm.value)} aria-hidden="true">
                    <span />
                  </span>
                </div>
                <ThemeActions theme={theme} />
              </div>
              <ul className="toc-list">
                {mods.map((m) => {
                  const ids = exercisesOf(m.id).map((e) => e.id);
                  const touched = ids.some((id) => p.items[id]);
                  const v = mastery(p, ids);
                  return (
                    <li key={m.id} className="toc-row">
                      <Link to={`/apprendre/${m.id}`}>
                        <span className="toc-title">
                          {frenchSpacing(m.title)}
                          {p.lessons[m.id] && <Check aria-label="Leçon lue" />}
                        </span>
                        <span className="toc-summary">
                          <MdInline text={m.summary} />
                        </span>
                        <span className="toc-meta">
                          {m.minutes}
                          {' '}min de lecture{SEP}
                          {count(ids.length, 'épreuve', 'épreuves')}
                          {m.commands?.length ? (
                            <>
                              {SEP}
                              <Commands list={m.commands} />
                            </>
                          ) : null}
                        </span>
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
