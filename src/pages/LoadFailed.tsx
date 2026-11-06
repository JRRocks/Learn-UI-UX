import type { ReactNode } from 'react';
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

/**
 * A part of the content could not be downloaded: the connection dropped, or a new version of the app
 * went online while the tab was open and the old files are gone. Reloading the page is the way back
 * (in the same page, the browser never fetches a failed module again); offline, the button waits for
 * the connection to come back.
 */
export function LoadFailed({ what, children }: { what: string; children?: ReactNode }) {
  const online = useOnline();
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
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
