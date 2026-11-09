import { BookOpen, ChartColumn, Globe, House, Library, Menu, Moon, Sparkles, Sun, Target, X, type LucideIcon } from 'lucide-react';
import { Component, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { UpdateAnnouncer, UpdateBanner } from '../components/AppUpdate';
import { EXERCISES, MODULES, MODULE_BY_ID } from '../content';
import { emptyProgress, streak } from '../engine/progress';
import { watchForUpdates } from '../lib/appUpdate';
import { SEP } from '../lib/french';
import { here, inApp, saveJson, syncSystemBars } from '../lib/native';
import { About } from '../pages/About';
import { Blitz } from '../pages/Blitz';
import { Cards } from '../pages/Cards';
import { CultureCompare, CultureDetail, CulturePairPage, Cultures } from '../pages/Cultures';
import { Home } from '../pages/Home';
import { Lab } from '../pages/Lab';
import { Learn } from '../pages/Learn';
import { Lesson } from '../pages/Lesson';
import { NotFound } from '../pages/NotFound';
import { Practice } from '../pages/Practice';
import { Progress } from '../pages/Progress';
import { Resources } from '../pages/Resources';
import { SessionPage, parseSpec, specLabel } from '../pages/Session';
import { Link, pageTitle, useRoute, type Route } from './router';
import { STORAGE_KEY, store, useProgress } from './store';
import { dismissAllToasts, dismissToast, holdToasts, keyMoves, toastRoom, toastsOver, useToasts } from './toasts';

store.setBadgeContext({ exercises: EXERCISES, moduleIds: MODULES.map((m) => m.id) });

// Authoring preview (#/apercu/<module>), used by `npm run shots`; left out of production builds.
const Preview = import.meta.env.DEV ? lazy(() => import('../pages/Preview').then((m) => ({ default: m.Preview }))) : null;

interface NavItem {
  to: string;
  /** The title of the page it opens, word for word. */
  label: string;
  match: string;
  Icon: LucideIcon;
}

const HOME: NavItem = { to: '/', label: 'Accueil', match: '', Icon: House };
const LESSONS: NavItem = { to: '/apprendre', label: 'Leçons', match: 'apprendre', Icon: BookOpen };
const CULTURES: NavItem = { to: '/cultures', label: 'Cultures', match: 'cultures', Icon: Globe };
const RESOURCES: NavItem = { to: '/ressources', label: 'Ressources', match: 'ressources', Icon: Library };
const PRACTICE: NavItem = { to: '/entrainement', label: 'S’entraîner', match: 'entrainement', Icon: Target };
const PROGRESS: NavItem = { to: '/progression', label: 'Progression', match: 'progression', Icon: ChartColumn };

/**
 * The whole map of the app, grouped by what one comes to do: learn, then train and follow one's
 * progress. The desktop rail and the menu of the phones show it; the tab bar of the phones keeps
 * the five pages used most.
 */
const NAV_GROUPS: { id: string; title: string | null; items: NavItem[] }[] = [
  { id: 'home', title: null, items: [HOME] },
  { id: 'learn', title: 'Apprendre', items: [LESSONS, CULTURES, RESOURCES] },
  { id: 'progress', title: 'Progresser', items: [PRACTICE, PROGRESS] },
];

const TABS: NavItem[] = [HOME, LESSONS, PRACTICE, CULTURES, PROGRESS];

/**
 * The app's icon (public/favicon.svg), beside its name: the proof, a white sheet on the blue, and the
 * correction's red loop round its last line. The same colours in both themes, as on the home screen.
 */
function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#2442d9" />
      <rect x="7" y="4.5" width="18" height="23" rx="2.5" fill="#fff" />
      <path d="M11 10.5h10M11 15h10M11 19.5h5" stroke="#2442d9" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10.8 17.4c-3.2-.4-4.6 1.6-2.9 3 2.2 1.8 9.1 1.8 12.4-.1 2.9-1.6 1-4.1-3.5-4.3"
        fill="none"
        stroke="#db2c2b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Its name is the text it shows, then where it leads (« Épreuves atelier UI/UX — accueil »): « cliquer
 * atelier UI/UX » works by voice too (WCAG 2.5.3).
 */
function Brand() {
  return (
    <Link to="/" className="brand">
      <BrandMark />
      <span>
        Épreuves <small>atelier UI/UX</small>
      </span>
      <span className="visually-hidden"> — accueil</span>
    </Link>
  );
}

const DARK_QUERY = '(prefers-color-scheme: dark)';

function subscribeScheme(onChange: () => void) {
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/** The system scheme, kept live: in « Comme le système », the toggle follows an OS switch at once. */
function useSystemDark(): boolean {
  return useSyncExternalStore(subscribeScheme, () => window.matchMedia(DARK_QUERY).matches, () => false);
}

function ThemeToggle() {
  const p = useProgress();
  const systemDark = useSystemDark();
  const dark = p.settings.theme === 'dark' || (p.settings.theme === 'system' && systemDark);
  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={() => store.update((s) => ({ ...s, settings: { ...s.settings, theme: dark ? 'light' : 'dark' } }))}
      aria-label={dark ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={dark ? 'Thème clair' : 'Thème sombre'}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}

/** A CSS color as `#rrggbb` (theme-color is read by browser chrome that may not parse oklch()). */
function hexColor(css: string): string | null {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/** Where a focused control shows its focus: a hidden radio shows it on its tile. */
function focusBox(el: Element): DOMRect {
  return (el.classList.contains('visually-hidden') ? (el.closest('label') ?? el) : el).getBoundingClientRect();
}

/** The control that has the keyboard focus (a mock's shadow root pierced), if the focus shows. */
function keyboardFocus(): Element | null {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el && el !== document.body && el.matches(':focus-visible') ? el : null;
}

/**
 * The groups of the map: a list of links each, named by its title. A page is named, not described:
 * under each name, the menu of the phones carried a line on what the page holds (« Les leçons, rangées
 * en grands thèmes »), six sentences to read before choosing among six names that say it already.
 */
function NavGroups({ current, prefix }: { current: string; prefix: string }) {
  return (
    <>
      {NAV_GROUPS.map((g) => (
        <div key={g.id} className="nav-group">
          {g.title && (
            <p className="nav-group-title" id={`${prefix}-${g.id}`}>
              {g.title}
            </p>
          )}
          <ul className="rail-nav" aria-labelledby={g.title ? `${prefix}-${g.id}` : undefined}>
            {g.items.map(({ to, label, match, Icon }) => (
              <li key={to}>
                <Link to={to} aria-current={current === match ? 'page' : undefined}>
                  <Icon aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/**
 * « Menu », in the top bar of the phones: the whole map, the pages the tab bar leaves out included
 * (Ressources, À propos). A modal dialog: the focus stays in it, Escape or « Fermer » closes it and
 * the focus goes back to the button; a link followed closes it too.
 */
function MenuButton({ current }: { current: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const route = useRoute();
  useEffect(() => {
    ref.current?.close();
  }, [route.raw]);
  // From 960 px the rail takes over and the top bar, menu included, is hidden: a menu left open there
  // (a tablet turned sideways) would keep the page inert, out of sight.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 60em)');
    const close = () => {
      if (wide.matches) ref.current?.close();
    };
    wide.addEventListener('change', close);
    return () => wide.removeEventListener('change', close);
  }, []);
  const p = useProgress();
  const st = streak(p);
  return (
    <>
      <button type="button" className="icon-btn menu-btn" aria-haspopup="dialog" onClick={() => ref.current?.showModal()}>
        <Menu aria-hidden="true" />
        <span>Menu</span>
      </button>
      <dialog
        ref={ref}
        className="menu-sheet"
        aria-labelledby="menu-title"
        onClick={(e) => {
          // A tap on the shade around the sheet, or on a link (the page shown included), closes it.
          const target = e.target as Element;
          if (target === e.currentTarget || target.closest('a')) e.currentTarget.close();
        }}
      >
        <div className="menu-body">
          <div className="menu-head">
            <p id="menu-title" className="menu-title">
              Menu
            </p>
            <button type="button" className="icon-btn" aria-label="Fermer le menu" onClick={() => ref.current?.close()}>
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Toutes les pages">
            <NavGroups current={current} prefix="menu" />
          </nav>
          <div className="menu-foot">
            <p className="small">
              <strong className="num">{st.current}</strong> {st.current > 1 ? 'jours' : 'jour'} de série{SEP}
              {p.xp}
              {'\u00A0'}XP
            </p>
            <Link to="/a-propos" className="small" aria-current={current === 'a-propos' ? 'page' : undefined}>
              À propos
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Toasts() {
  const toasts = useToasts();
  const region = useRef<HTMLDivElement>(null);
  /** Where the toast held back would show: it comes once the keyboard focus has left that place. */
  const heldAt = useRef<DOMRect | null>(null);
  /** Where a tap or a click has just closed a toast: the next one waits for the next click if it would show there. */
  const tappedAt = useRef<{ x: number; y: number } | null>(null);
  const heldForTap = useRef(false);

  // A toast never hides the control that has the focus (WCAG 2.4.11): those lying over a control
  // reached with Tab or the arrows go away (the status region has read them out already), and Escape
  // dismisses them all. A tap or a click closes the toast it lands on, and nothing under it. They show
  // one at a time (toasts.ts), and one that has waited its turn never comes up over the control that
  // has the keyboard focus: it waits until the focus leaves that place. Nor under the finger that has
  // just closed the one before: it waits for the next tap, which reaches what lay under them (an option
  // of the exam's next question took three taps, two badges closed first).
  useLayoutEffect(() => {
    const t = toasts[0];
    const el = region.current?.querySelector('.toast');
    if (!t?.queued || !el) return;
    const box = el.getBoundingClientRect();
    const tap = tappedAt.current;
    if (tap && toastsOver({ left: tap.x, top: tap.y, right: tap.x + 1, bottom: tap.y + 1 }, [{ id: t.id, box }]).length) {
      heldForTap.current = true;
      holdToasts(true);
      return;
    }
    const focus = keyboardFocus();
    if (!focus || !toastsOver(focusBox(focus), [{ id: t.id, box }]).length) return;
    heldAt.current = box;
    holdToasts(true);
  }, [toasts]);

  // The page keeps room at its end for the toasts (--toast-room, app.css): from the top of the toast on
  // screen to the bottom of the screen. It grows with a taller toast, and goes back to none with the page.
  // Measured on the region, which the toast's entrance (a slide of 8 px) does not move.
  useEffect(() => {
    const el = region.current;
    if (!el) return;
    let room = 0;
    const measure = () => {
      const top = el.querySelector('.toast') ? el.getBoundingClientRect().top : null;
      const next = toastRoom(room, top, window.innerHeight);
      if (next === room) return;
      room = next;
      document.documentElement.style.setProperty('--toast-room', `${room}px`);
    };
    const reset = () => {
      room = 0;
      document.documentElement.style.removeProperty('--toast-room');
      measure();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('hashchange', reset);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', reset);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const keys = keyMoves();
    const release = () => {
      heldAt.current = null;
      holdToasts(false);
    };
    // The next click after the one that closed a toast, or a key, lets the toast held back come, once the
    // control under it has had that click.
    const releaseTap = () => {
      tappedAt.current = null;
      if (!heldForTap.current) return;
      heldForTap.current = false;
      window.setTimeout(() => holdToasts(false), 0);
    };
    const onClick = (e: MouseEvent) => {
      if (region.current && e.composedPath().includes(region.current)) return;
      releaseTap();
    };
    const onFocus = (e: FocusEvent) => {
      const el = e.composedPath()[0];
      if (!(el instanceof HTMLElement)) return;
      const moved = el.tabIndex >= 0 && keys.moving;
      // The toasts on screen now, not one that the same action shows next (« Annuler l’import »).
      const shown = moved ? [...(region.current?.querySelectorAll<HTMLElement>('.toast') ?? [])] : [];
      cancelAnimationFrame(frame);
      // Once the browser has scrolled the control into view.
      frame = requestAnimationFrame(() => {
        const box = focusBox(el);
        const held = heldAt.current;
        if (held && !toastsOver(box, [{ id: 0, box: held }]).length) release();
        if (!moved) return;
        const boxes = shown.filter((t) => t.isConnected).map((t) => ({ id: Number(t.dataset.id), box: t.getBoundingClientRect() }));
        toastsOver(box, boxes).forEach(dismissToast);
      });
    };
    // The focus left for no control (a click on the page's text): nothing is under the held toast any more.
    const onBlur = (e: FocusEvent) => {
      if (!e.relatedTarget && heldAt.current) release();
    };
    // Captured: the key is noted before any widget handles it, and before the focus moves.
    const onKey = (e: KeyboardEvent) => {
      releaseTap();
      if (e.key === 'Escape') dismissAllToasts();
      else keys.key(e.key);
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', onBlur);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('focusout', onBlur);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return (
    <div ref={region} className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast"
          data-id={t.id}
          onClick={(e) => {
            tappedAt.current = { x: e.clientX, y: e.clientY };
            dismissToast(t.id);
          }}
        >
          {t.tone === 'badge' && <Sparkles aria-hidden="true" />}
          {t.text}
        </div>
      ))}
    </div>
  );
}

/** Last resort when a view throws: say so, keep the data safe, offer a way out. */
function PageError() {
  const [confirming, setConfirming] = useState(false);
  const askRef = useRef<HTMLButtonElement>(null);
  const asked = useRef(false);
  useEffect(() => {
    document.title = pageTitle('Erreur');
    document.getElementById('main-title')?.focus({ preventScroll: true });
  }, []);
  // « Garder mes données » goes away with its group: the focus returns to the button that opened it.
  useEffect(() => {
    if (confirming) asked.current = true;
    else if (asked.current) askRef.current?.focus();
  }, [confirming]);
  const download = () => {
    let raw = '';
    try {
      raw = localStorage.getItem(STORAGE_KEY) ?? '';
    } catch {
      raw = JSON.stringify(store.get());
    }
    void saveJson('epreuves-donnees.json', raw);
  };
  const wipe = () => {
    store.replace(emptyProgress());
    window.location.hash = '/';
    window.location.reload();
  };
  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Cette page n’a pas pu s’afficher
        </h1>
        <p className="lead">
          Une erreur l’a interrompue. Recharge la page{' '}; si l’erreur revient, tes données enregistrées sont peut-être abîmées{' '}:
          télécharge-les pour les garder, puis efface-les pour repartir de zéro.
        </p>
      </header>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
          Recharger la page
        </button>
        <button type="button" className="btn btn-secondary" onClick={download}>
          Télécharger mes données
        </button>
        {!confirming && (
          <button ref={askRef} type="button" className="btn btn-ghost" onClick={() => setConfirming(true)}>
            Effacer mes données…
          </button>
        )}
      </div>
      {confirming && (
        <div className="danger-zone" role="group" aria-labelledby="wipe-title">
          <p id="wipe-title" className="small">
            Toute ta progression sera effacée de {here}, sans retour possible. Télécharge tes données d’abord si tu veux les garder.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-danger" onClick={wipe}>
              Effacer et repartir de zéro
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setConfirming(false)} autoFocus>
              Garder mes données
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

class Boundary extends Component<{ resetKey?: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(prev: { resetKey?: string }) {
    // Another page was opened: give it its chance.
    if (this.state.failed && prev.resetKey !== this.props.resetKey) this.setState({ failed: false });
  }

  render() {
    return this.state.failed ? <PageError /> : this.props.children;
  }
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
      if (route.query.get('mode') === 'blitz') return <Blitz key={route.raw} />;
      return <SessionPage key={route.raw} query={route.query} raw={route.raw} />;
    case 'fiches':
      return <Cards key={route.raw} query={route.query} />;
    case 'cultures':
      if (!a) return <Cultures />;
      if (a === 'labo') return <Lab />;
      // Remounted per pair, so its selects start from the markets shown.
      if (a === 'comparer') return <CultureCompare key={route.raw} query={route.query} />;
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

/** Title of the focus-mode views, whose components do not set one. */
function focusModeTitle(route: Route): string {
  const [section] = route.path;
  if (section === 'fiches') {
    const m = MODULE_BY_ID.get(route.query.get('module') ?? '');
    return pageTitle(m ? `Fiches — ${m.title}` : 'Fiches de révision');
  }
  // « Typographie — S’entraîner »: distinct from the lesson page, which is titled « Typographie ».
  return pageTitle(route.query.get('mode') === 'blitz' ? 'Défi chrono' : specLabel(parseSpec(route.query)), 'S’entraîner');
}

function Shell() {
  const route = useRoute();
  const progress = useProgress();
  const [section, param] = route.path;
  const focusMode = section === 'session' || section === 'fiches';

  // Theme: follow the system unless the learner picked one; the browser chrome follows too.
  useLayoutEffect(() => {
    const t = progress.settings.theme;
    if (t === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
    const forced = t === 'system' ? null : hexColor(getComputedStyle(document.body).backgroundColor);
    for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
      // index.html gives one value per system scheme; a forced theme overrides both.
      meta.dataset.system ??= meta.content;
      meta.content = forced ?? meta.dataset.system;
    }
    syncSystemBars(t);
  }, [progress.settings.theme]);

  // New page: start at the top and move focus to its title for screen readers.
  useEffect(() => {
    if (focusMode) return;
    window.scrollTo({ top: 0 });
    const title = () => document.getElementById('main-title');
    const h = title();
    if (h) {
      h.focus({ preventScroll: true });
      return;
    }
    // Views that load their data on demand (Cultures) render their title later: focus it on arrival,
    // unless the learner has moved on in the meantime.
    const from = document.activeElement;
    const main = document.getElementById('main');
    if (!main) return;
    const observer = new MutationObserver(() => {
      const t = title();
      if (!t) return;
      observer.disconnect();
      if (document.activeElement === from || document.activeElement === document.body) t.focus({ preventScroll: true });
    });
    observer.observe(main, { childList: true, subtree: true });
    const stop = window.setTimeout(() => observer.disconnect(), 15000);
    return () => {
      observer.disconnect();
      window.clearTimeout(stop);
    };
  }, [route.raw, focusMode]);

  // Session, challenge and flashcards name themselves from the route; every other view sets its own title.
  useEffect(() => {
    if (focusMode) document.title = focusModeTitle(route);
  }, [route, focusMode]);

  // In the Android app: a newer version published on GitHub is offered at the top of the pages.
  useEffect(() => watchForUpdates(), []);

  if (Preview && section === 'apercu' && param)
    return (
      <Suspense fallback={<p>Chargement…</p>}>
        <Preview target={param} />
      </Suspense>
    );

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
            <MenuButton current={current} />
          </div>
        </header>
      )}

      <nav className="rail" aria-label="Navigation principale">
        <Brand />
        <NavGroups current={current} prefix="rail" />
        <div className="rail-foot">
          <div className="rail-streak">
            <strong>{st.current}</strong>
            {st.current > 1 ? 'jours' : 'jour'} de série{SEP}
            {progress.xp}
            {'\u00A0'}XP
          </div>
          <div className="btn-row">
            <ThemeToggle />
            <Link to="/a-propos" className="small" aria-current={current === 'a-propos' ? 'page' : undefined}>
              À propos
            </Link>
          </div>
        </div>
      </nav>

      <main id="main" className="main" tabIndex={-1}>
        {/* Not in sessions, which it would interrupt, nor in À propos, which has its own section. */}
        {inApp && !focusMode && section !== 'a-propos' && <UpdateBanner />}
        <Boundary resetKey={route.raw}>{page(route)}</Boundary>
      </main>

      {!focusMode && (
        <nav className="tabbar" aria-label="Navigation principale">
          {TABS.map(({ to, label, match, Icon }) => (
            <Link key={to} to={to} aria-current={current === match ? 'page' : undefined}>
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      )}
      <Toasts />
      {inApp && <UpdateAnnouncer />}
    </div>
  );
}

export function App() {
  return (
    <Boundary>
      <Shell />
    </Boundary>
  );
}
