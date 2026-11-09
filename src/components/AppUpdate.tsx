import { CircleAlert, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  RELEASE_PAGE,
  allowInstalls,
  cancelDownload,
  checkForUpdate,
  inBanner,
  installUpdate,
  installedVersion,
  megabytes,
  putOffUpdate,
  startUpdate,
  usePutOff,
  useUpdate,
  type UpdateState,
} from '../lib/appUpdate';
import { frenchSpacing } from '../lib/markdown';

/** What an update under way asks of the learner now. */
interface Step {
  title: string;
  text?: string;
  progress?: { loaded: number; total: number };
  failed?: boolean;
  /** The one button: its label changes from step to step, the button stays (and keeps the focus). */
  action: { label: string; run: () => Promise<void> | void };
}

function stepOf(s: UpdateState): Step | null {
  switch (s.step) {
    case 'available':
      return {
        title: `Nouvelle version ${s.release.version}`,
        text: `${s.release.size ? `${megabytes(s.release.size)} à télécharger depuis GitHub` : 'À télécharger depuis GitHub'} ; ta progression est gardée.`,
        action: { label: 'Mettre à jour', run: startUpdate },
      };
    case 'downloading':
      return {
        title: `Téléchargement de la version ${s.release.version}`,
        progress: { loaded: s.loaded, total: s.total },
        action: { label: 'Annuler', run: cancelDownload },
      };
    case 'permission':
      return {
        title: 'Autorise les mises à jour',
        text: `${s.refused ? 'Le réglage n’est pas encore activé. ' : ''}Android demande ton accord une seule fois : dans le réglage qui s’ouvre, active « Autoriser cette source », puis reviens ici.`,
        action: { label: 'Ouvrir le réglage', run: allowInstalls },
      };
    case 'ready':
      return {
        title: `Version ${s.release.version} prête`,
        text: 'Confirme l’installation dans la fenêtre d’Android : l’app se met à jour et garde ta progression.',
        action: { label: 'Installer', run: installUpdate },
      };
    case 'failed':
      return s.release ? { title: 'La mise à jour n’a pas abouti', text: s.error, failed: true, action: { label: 'Réessayer', run: startUpdate } } : null;
    default:
      return null;
  }
}

const PERCENT = new Intl.NumberFormat('fr-FR', { style: 'percent' });

function Progress({ loaded, total }: { loaded: number; total: number }) {
  const known = total > 0;
  return (
    <div className="update-progress">
      <progress max={known ? total : undefined} value={known ? Math.min(loaded, total) : undefined} aria-label="Téléchargement de la mise à jour" />
      <p className="small muted">
        {known ? `${PERCENT.format(Math.min(loaded / total, 1))} · ${megabytes(loaded)} sur ${megabytes(total)}` : megabytes(loaded)}
      </p>
    </div>
  );
}

function StepText({ step }: { step: Step }) {
  return (
    <>
      {step.text && (
        <p className="small" style={step.failed ? { color: 'var(--mark-ink)' } : undefined}>
          {frenchSpacing(step.text)}
        </p>
      )}
      {step.progress && <Progress {...step.progress} />}
    </>
  );
}

/** Pressed, the button runs its step; the next step's label comes on the same button. */
function ActionButton({ step, busy }: { step: Step; busy?: boolean }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      aria-disabled={busy || undefined}
      onClick={() => {
        if (!busy) void step.action.run();
      }}
    >
      {step.action.label}
    </button>
  );
}

/**
 * At the top of the pages (but À propos, which has its own section, and the sessions): an update found
 * on GitHub, then the steps of its installation. « Plus tard » puts it off until the next launch.
 */
export function UpdateBanner() {
  const s = useUpdate();
  const off = usePutOff();
  const step = inBanner(s, off) ? stepOf(s) : null;
  if (!step) return null;
  const Icon = step.failed ? CircleAlert : Download;
  return (
    <section className="update-banner" aria-labelledby="update-banner-title">
      {/* The icon on the title's line: the text and the buttons under it keep the banner's whole width. */}
      <p id="update-banner-title" className="update-title">
        <Icon aria-hidden="true" className="update-icon" />
        <span>{step.title}</span>
      </p>
      <StepText step={step} />
      <div className="btn-row">
        <ActionButton key="action" step={step} />
        {s.step !== 'downloading' && (
          <button
            key="later"
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              putOffUpdate();
              // The banner goes: the focus moves on to the page it was above.
              (document.getElementById('main-title') ?? document.getElementById('main'))?.focus({ preventScroll: true });
            }}
          >
            Plus tard
          </button>
        )}
      </div>
    </section>
  );
}

/** In À propos: the version installed, a check on demand, and the update under way if there is one. */
export function UpdateSection() {
  const s = useUpdate();
  const [version, setVersion] = useState<string>();
  useEffect(() => {
    let live = true;
    installedVersion().then(
      (v) => live && setVersion(v),
      () => {},
    );
    return () => {
      live = false;
    };
  }, []);
  const step = stepOf(s);
  const checking = s.step === 'checking';
  const check: Step = { title: '', action: { label: 'Rechercher une mise à jour', run: () => checkForUpdate(true) } };
  return (
    <>
      <h2>Mises à jour</h2>
      <p>{version ? `Version installée : ${version}.` : 'Version installée : …'}</p>
      <p className="small muted">
        {frenchSpacing(
          'À chaque lancement, l’app demande à GitHub si une version plus récente est publiée : une simple requête, qui n’envoie rien de ta progression. La mise à jour s’installe par-dessus l’app, sans rien effacer.',
        )}
      </p>
      <div className="update-panel">
        {step ? (
          <>
            <p className="update-title">{step.title}</p>
            <StepText step={step} />
          </>
        ) : (
          <p className="small" style={s.step === 'failed' ? { color: 'var(--mark-ink)' } : undefined}>
            {checking && 'Recherche d’une mise à jour…'}
            {s.step === 'current' && 'Tu as la dernière version.'}
            {s.step === 'failed' && frenchSpacing(s.error)}
          </p>
        )}
        <div className="btn-row">
          <ActionButton key="action" step={step ?? check} busy={checking} />
          <a className="btn btn-ghost" href={RELEASE_PAGE} target="_blank" rel="noreferrer">
            La version sur GitHub
          </a>
        </div>
      </div>
    </>
  );
}

/** What a screen reader hears of the update: each new step once, never the progress of the download. */
function announcement(s: UpdateState): string {
  switch (s.step) {
    case 'checking':
      return s.manual ? 'Recherche d’une mise à jour…' : '';
    case 'current':
      return s.manual ? 'Tu as la dernière version.' : '';
    case 'available':
      return `Nouvelle version ${s.release.version} disponible.`;
    case 'downloading':
      return `Téléchargement de la version ${s.release.version}…`;
    case 'permission':
      return s.refused ? 'Le réglage n’est pas encore activé.' : 'Android doit autoriser les mises à jour : ouvre le réglage.';
    case 'ready':
      return `Version ${s.release.version} téléchargée : confirme l’installation dans la fenêtre d’Android.`;
    case 'failed':
      return s.release || s.manual ? s.error : '';
    default:
      return '';
  }
}

/** A polite region there from the launch, so that the step that comes is read out (in sessions too). */
export function UpdateAnnouncer() {
  const s = useUpdate();
  return (
    <p className="visually-hidden" role="status">
      {frenchSpacing(announcement(s))}
    </p>
  );
}
