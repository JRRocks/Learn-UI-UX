import { CircleAlert } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { frenchSpacing } from '../lib/markdown';
import { useOnline } from '../lib/useLoad';

/** What a view shows while the part of the content it needs is downloaded. */
export function Loading({ what }: { what: string }) {
  return (
    <p className="muted" role="status">
      {frenchSpacing(`Chargement ${what}…`)}
    </p>
  );
}

/** How long the site has to answer the check: a stalled connection may never answer at all. */
const CHECK_TIMEOUT_MS = 6000;
/** The shortest time the check shows, so that a quick answer still reads as a new try. */
const CHECK_SHOWN_MS = 400;

/**
 * Whether the site answers at the page's address, so that a reload brings the app back: any answer
 * but a server error, a redirect included (the reload follows it). Otherwise a reload would replace
 * the app with the browser's error page. Cancelled through `signal`, the check stops its request and
 * says no.
 */
export async function siteAnswers(signal?: AbortSignal): Promise<boolean> {
  if (signal?.aborted) return false;
  const abort = new AbortController();
  const stop = () => abort.abort();
  const timer = setTimeout(stop, CHECK_TIMEOUT_MS);
  signal?.addEventListener('abort', stop);
  try {
    const res = await fetch(location.href, { method: 'HEAD', cache: 'no-store', redirect: 'manual', signal: abort.signal });
    return res.type === 'opaqueredirect' || res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', stop);
  }
}

/** The line under the buttons: close to them, as the outcome of the one just pressed. */
const LINE = { marginTop: 'var(--s2)' } as const;

/**
 * A part of the content could not be downloaded: the connection dropped, or a new version of the app
 * went online while the tab was open and the old files are gone. Reloading the page is the way back
 * (in the same page, the browser never fetches a failed module again). With a service worker in
 * control, the reload is safe: the worker answers with its copy of the page whatever the network does
 * (src/sw.js). Without one, the button first checks that the site answers; until it does, the page
 * stays open and says so under the button. The check belongs to this view: leaving it, or going
 * offline, cancels it, so that a late answer never reloads the view the learner has moved on to.
 * Offline, there is no button: the message asks to wait for the connection.
 */
export function LoadFailed({ what, children }: { what: string; children?: ReactNode }) {
  const online = useOnline();
  const [check, setCheck] = useState<'idle' | 'checking' | 'down'>('idle');
  /** The check under way, if any. */
  const pending = useRef<AbortController | null>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const cancel = () => {
    pending.current?.abort();
    pending.current = null;
  };
  // Leaving the view stops the check: its answer would reload the view the learner moved on to.
  useEffect(() => cancel, []);
  useEffect(() => {
    // Offline, the message says so: an earlier « no answer », or one still to come, no longer applies.
    if (online) return;
    cancel();
    setCheck('idle');
  }, [online]);
  useEffect(() => {
    // On a short screen the button can sit right above the tab bar: the line under it is brought
    // into view (the room scroll-padding leaves free), without a move when it is visible already.
    line.current?.scrollIntoView({ block: 'nearest' });
  }, [check]);
  const reload = async () => {
    if (pending.current) return;
    if (navigator.serviceWorker?.controller) return window.location.reload();
    const abort = new AbortController();
    pending.current = abort;
    setCheck('checking');
    const [answers] = await Promise.all([siteAnswers(abort.signal), new Promise((resolve) => setTimeout(resolve, CHECK_SHOWN_MS))]);
    if (abort.signal.aborted) return;
    pending.current = null;
    if (answers) window.location.reload();
    else setCheck('down');
  };
  return (
    <div className="section" style={{ maxWidth: 'var(--measure)' }}>
      <p role="alert">
        {frenchSpacing(
          online
            ? `Impossible de télécharger ${what} : la connexion a peut-être été coupée, ou une nouvelle version de l’app vient d’être mise en ligne. Recharge la page pour réessayer.`
            : `Impossible de télécharger ${what} : tu es hors ligne. Recharge la page dès que la connexion revient.`,
        )}
      </p>
      {/* The buttons and the line under them, in one block: empty, the line adds no gap to the section. */}
      <div>
        <div className="btn-row">
          {online && (
            <button type="button" className="btn btn-primary" onClick={() => void reload()}>
              Recharger la page
            </button>
          )}
          {children}
        </div>
        {/* Under the buttons, so that the one just pressed does not move. A polite region of its own,
            there from the start and apart from the alert: screen readers read out each new line alone. */}
        <div role="status">
          {online && check === 'checking' && (
            <p ref={line} className="small muted" style={LINE}>
              Vérification de la connexion…
            </p>
          )}
          {online && check === 'down' && (
            <p ref={line} className="small" style={{ ...LINE, color: 'var(--mark-ink)' }}>
              <CircleAlert aria-hidden="true" width={16} height={16} style={{ display: 'inline', verticalAlign: '-3px', marginInlineEnd: 'var(--s1)' }} />
              {frenchSpacing('Le site ne répond toujours pas : réessaie dans un instant.')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
