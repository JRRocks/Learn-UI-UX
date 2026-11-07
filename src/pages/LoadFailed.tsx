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
 * the app with the browser's error page.
 */
export async function siteAnswers(): Promise<boolean> {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), CHECK_TIMEOUT_MS);
  try {
    const res = await fetch(location.href, { method: 'HEAD', cache: 'no-store', redirect: 'manual', signal: abort.signal });
    return res.type === 'opaqueredirect' || res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * A part of the content could not be downloaded: the connection dropped, or a new version of the app
 * went online while the tab was open and the old files are gone. Reloading the page is the way back
 * (in the same page, the browser never fetches a failed module again). With a service worker in
 * control, the reload is safe: the worker answers with its copy of the page whatever the network does
 * (src/sw.js). Without one, the button first checks that the site answers; until it does, the page
 * stays open and says so under the button. Offline, there is no button: the message asks to wait for
 * the connection.
 */
export function LoadFailed({ what, children }: { what: string; children?: ReactNode }) {
  const online = useOnline();
  const [check, setCheck] = useState<'idle' | 'checking' | 'down'>('idle');
  const line = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    // Offline, the message says so: an earlier « no answer » no longer applies.
    if (!online) setCheck('idle');
  }, [online]);
  useEffect(() => {
    // On a short screen the button can sit right above the tab bar: the line under it is brought
    // into view (the room scroll-padding leaves free), without a move when it is visible already.
    line.current?.scrollIntoView({ block: 'nearest' });
  }, [check]);
  const reload = async () => {
    if (check === 'checking') return;
    if (navigator.serviceWorker?.controller) return window.location.reload();
    setCheck('checking');
    const [answers] = await Promise.all([siteAnswers(), new Promise((resolve) => setTimeout(resolve, CHECK_SHOWN_MS))]);
    if (answers) window.location.reload();
    else setCheck('down');
  };
  return (
    <div className="section" role="alert" style={{ maxWidth: 'var(--measure)' }}>
      <p>
        {frenchSpacing(
          online
            ? `Impossible de télécharger ${what} : la connexion a peut-être été coupée, ou une nouvelle version de l’app vient d’être mise en ligne. Recharge la page pour réessayer.`
            : `Impossible de télécharger ${what} : tu es hors ligne. Recharge la page dès que la connexion revient.`,
        )}
      </p>
      <div className="btn-row">
        {online && (
          <button type="button" className="btn btn-primary" onClick={() => void reload()}>
            Recharger la page
          </button>
        )}
        {children}
      </div>
      {/* Under the buttons, so that the one just pressed does not move. */}
      {online && check === 'checking' && (
        <p ref={line} className="small muted">
          Vérification de la connexion…
        </p>
      )}
      {online && check === 'down' && (
        <p ref={line} className="small" style={{ color: 'var(--mark-ink)' }}>
          <CircleAlert aria-hidden="true" width={16} height={16} style={{ display: 'inline', verticalAlign: '-3px', marginInlineEnd: 'var(--s1)' }} />
          {frenchSpacing('Le site ne répond toujours pas : réessaie dans un instant.')}
        </p>
      )}
    </div>
  );
}
