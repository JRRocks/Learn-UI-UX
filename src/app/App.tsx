import { BookOpen, ChartColumn, Globe, House, Library, Moon, Sparkles, Sun, Target, type LucideIcon } from 'lucide-react';
import { useEffect, useLayoutEffect } from 'react';
import { EXERCISES, MODULES } from '../content';
import { streak } from '../engine/progress';
import { About } from '../pages/About';
import { Cards } from '../pages/Cards';
import { CultureCompare, CultureDetail, CulturePairPage, Cultures } from '../pages/Cultures';
import { Home } from '../pages/Home';
import { Lab } from '../pages/Lab';
import { Learn } from '../pages/Learn';
import { Lesson } from '../pages/Lesson';
import { NotFound } from '../pages/NotFound';
import { Practice } from '../pages/Practice';
import { Preview } from '../pages/Preview';
import { Progress } from '../pages/Progress';
import { Resources } from '../pages/Resources';
import { SessionPage } from '../pages/Session';
import { Link, useRoute, type Route } from './router';
import { store, useProgress } from './store';
import { dismissToast, useToasts } from './toasts';

store.setBadgeContext({ exercises: EXERCISES, moduleIds: MODULES.map((m) => m.id) });

const NAV: { to: string; label: string; match: string; Icon: LucideIcon }[] = [
  { to: '/', label: 'Accueil', match: '', Icon: House },
  { to: '/apprendre', label: 'Apprendre', match: 'apprendre', Icon: BookOpen },
  { to: '/entrainement', label: 'S’entraîner', match: 'entrainement', Icon: Target },
  { to: '/cultures', label: 'Cultures', match: 'cultures', Icon: Globe },
  { to: '/ressources', label: 'Ressources', match: 'ressources', Icon: Library },
];

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="8" y="4.5" width="17" height="23" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11h9M12 15.5h9M12 20h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10.5 17.2c-4.7-.6-6.9 2.2-4.4 4.1 3 2.3 11.9 2.3 16.3-.1 3.8-2.1 1.4-5.2-4.6-5.4"
        fill="none"
        stroke="var(--mark)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Épreuves, accueil">
      <BrandMark />
      <span>
        Épreuves
        <small>atelier UI/UX</small>
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const p = useProgress();
  const dark =
    p.settings.theme === 'dark' || (p.settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => store.update((s) => ({ ...s, settings: { ...s.settings, theme: dark ? 'light' : 'dark' } }))}
      aria-label={dark ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={dark ? 'Thème clair' : 'Thème sombre'}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}

function Toasts() {
  const toasts = useToasts();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast" onClick={() => dismissToast(t.id)}>
          {t.tone === 'badge' && <Sparkles aria-hidden="true" />}
          {t.text}
        </div>
      ))}
    </div>
  );
}

function page(route: Route) {
  const [section, a, b] = route.path;
  switch (section) {
    case undefined:
      return <Home />;
    case 'apprendre':
      return a ? <Lesson id={a} /> : <Learn />;
    case 'entrainement':
      return <Practice />;
    case 'session':
      return <SessionPage key={route.raw} query={route.query} raw={route.raw} />;
    case 'fiches':
      return <Cards key={route.raw} query={route.query} />;
    case 'cultures':
      if (!a) return <Cultures />;
      if (a === 'labo') return <Lab />;
      if (a === 'comparer') return <CultureCompare query={route.query} />;
      if (a === 'paire' && b) return <CulturePairPage id={b} />;
      return <CultureDetail id={a} />;
    case 'ressources':
      return <Resources tab={a} />;
    case 'progression':
      return <Progress />;
    case 'a-propos':
      return <About />;
    default:
      return <NotFound />;
  }
}

export function App() {
  const route = useRoute();
  const progress = useProgress();
  const [section, param] = route.path;
  const focusMode = section === 'session' || section === 'fiches';

  // Theme: follow the system unless the learner picked one.
  useLayoutEffect(() => {
    const t = progress.settings.theme;
    if (t === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
  }, [progress.settings.theme]);

  // New page: start at the top and move focus to its title for screen readers.
  useEffect(() => {
    if (section === 'session' || section === 'fiches') return;
    window.scrollTo({ top: 0 });
    document.getElementById('main-title')?.focus({ preventScroll: true });
  }, [route.raw, section]);

  useEffect(() => {
    const titles: Record<string, string> = {
      apprendre: 'Apprendre',
      entrainement: 'S’entraîner',
      session: 'Session',
      fiches: 'Fiches',
      cultures: 'Cultures',
      ressources: 'Ressources',
      progression: 'Progression',
      'a-propos': 'À propos',
    };
    const lesson = section === 'apprendre' && param ? MODULES.find((m) => m.id === param)?.title : undefined;
    const name = lesson ?? (section ? titles[section] : undefined);
    document.title = name ? `${name} — Épreuves` : 'Épreuves — atelier UI/UX';
  }, [section, param]);

  if (section === 'apercu' && param) return <Preview target={param} />;

  const current = section ?? '';
  const st = streak(progress);

  return (
    <div className="shell" data-focus={focusMode || undefined}>
      <a className="skip" href="#main" onClick={(e) => (e.preventDefault(), document.getElementById('main')?.focus())}>
        Aller au contenu
      </a>

      {!focusMode && (
        <header className="topbar">
          <Brand />
          <div className="topbar-actions">
            <ThemeToggle />
            <Link to="/progression" className="icon-btn" aria-label="Progression">
              <ChartColumn aria-hidden="true" />
            </Link>
          </div>
        </header>
      )}

      <nav className="rail" aria-label="Navigation principale">
        <Brand />
        <div className="rail-nav">
          {NAV.map(({ to, label, match, Icon }) => (
            <Link key={to} to={to} aria-current={current === match ? 'page' : undefined}>
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
        <div className="rail-nav">
          <Link to="/progression" aria-current={current === 'progression' ? 'page' : undefined}>
            <ChartColumn aria-hidden="true" />
            Progression
          </Link>
        </div>
        <div className="rail-foot">
          <div className="rail-streak">
            <strong>{st.current}</strong> jour{st.current > 1 ? 's' : ''} de suite · {progress.xp} XP
          </div>
          <div className="btn-row">
            <ThemeToggle />
            <Link to="/a-propos" className="small">
              À propos
            </Link>
          </div>
        </div>
      </nav>

      <main id="main" className="main" tabIndex={-1}>
        {page(route)}
      </main>

      {!focusMode && (
        <nav className="tabbar" aria-label="Navigation principale">
          {NAV.map(({ to, label, match, Icon }) => (
            <Link key={to} to={to} aria-current={current === match ? 'page' : undefined}>
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      )}
      <Toasts />
    </div>
  );
}
