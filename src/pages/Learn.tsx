import { Accessibility, Brain, Check, ClipboardCheck, Compass, Globe, Palette, Route, Smartphone, type LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { useProgress } from '../app/store';
import { JumpNav } from '../components/JumpNav';
import { MODULES, THEMES, exercisesOf, type Theme, type ThemeId } from '../content';
import { mastery, masteryLabel, type ProgressState } from '../engine/progress';
import { SEP, count } from '../lib/french';
import { MdInline, frenchSpacing } from '../lib/markdown';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

/** A mark for each theme, beside its name: eight names in a row read faster with a shape to tell them apart. */
export const THEME_ICON: Record<ThemeId, LucideIcon> = {
  fondamentaux: Compass,
  psychologie: Brain,
  visuel: Palette,
  parcours: Route,
  supports: Smartphone,
  accessibilite: Accessibility,
  methode: ClipboardCheck,
  cultures: Globe,
};

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
        {/* How the page is laid out shows; how a theme is trained or evaluated is said on its two buttons. */}
        <p className="lead">
          {MODULES.length} leçons, {THEMES.length} thèmes
          {read > 0 && `${SEP}${count(read, 'lue', 'lues')}`}
        </p>
        <JumpNav label="Aller à un thème" items={THEMES.map((t) => ({ id: `theme-${t.id}`, label: t.title }))} />
      </header>

      <div className="toc">
        {THEMES.map((theme) => {
          const mods = MODULES.filter((m) => m.theme === theme.id);
          if (!mods.length) return null;
          const tm = themeMastery(p, theme);
          const exercises = themeExerciseIds(theme).length;
          const ThemeIcon = THEME_ICON[theme.id];
          return (
            <section key={theme.id} className="toc-group" aria-labelledby={`theme-${theme.id}`}>
              <div className="toc-group-head">
                <h2 id={`theme-${theme.id}`} tabIndex={-1}>
                  <ThemeIcon aria-hidden="true" />
                  {frenchSpacing(theme.title)}
                </h2>
                {/* Where there is room: on a phone, the names of its lessons, just below, say it. */}
                <p className="toc-group-desc">{frenchSpacing(theme.description)}</p>
                <div className="field theme-mastery">
                  <span className="field-label">
                    {count(mods.length, 'leçon', 'leçons')}
                    {SEP}
                    {count(exercises, 'épreuve', 'épreuves')}
                    {SEP}
                    {tm.label.toLowerCase()}
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
                        {/* On a phone a lesson is a name, its length and where one stands: its summary (five
                            lines) and its commands are on its own page (app.css). */}
                        <span className="toc-summary toc-wide">
                          <MdInline text={m.summary} />
                        </span>
                        <span className="toc-meta">
                          {m.minutes}
                          {'\u00A0'}min
                          <span className="toc-wide">
                            {' '}
                            de lecture{SEP}
                            {count(ids.length, 'épreuve', 'épreuves')}
                            {m.commands?.length ? (
                              <>
                                {SEP}
                                <Commands list={m.commands} />
                              </>
                            ) : null}
                          </span>
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
