import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';
import { useSyncExternalStore } from 'react';
import { inApp } from './native';

/**
 * Updates of the Android app, from its GitHub release. The « Application Android » workflow publishes
 * every build of main as the release « android », titled with its version (« Épreuves pour Android
 * 1.0.312 »). The app reads that release from GitHub's API at launch, and again when it comes back to
 * the screen after some hours; when the version there is newer than its own, it offers to download the
 * APK and hands it to Android's installer (AppUpdatePlugin.java), which installs it over this one and
 * keeps the progress. Nothing about the learner is sent: one request for the release, then the APK.
 * In a browser the service worker updates the app, and none of this runs.
 */

/** The release of the Android app: always the last build of main (.github/workflows/android.yml). */
export const RELEASE_API = 'https://api.github.com/repos/JRRocks/Learn-UI-UX/releases/tags/android';
/** Its page, where the APK can be downloaded by hand. */
export const RELEASE_PAGE = 'https://github.com/JRRocks/Learn-UI-UX/releases/tag/android';
const APK_NAME = 'Epreuves.apk';

/** How long GitHub has to answer: a stalled connection may never answer at all. */
const CHECK_TIMEOUT_MS = 15_000;
/** Back on screen after this long, the app looks for an update again. */
const RECHECK_MS = 6 * 60 * 60 * 1000;

export interface Release {
  /** « 1.0.312 »: the versionName of the APK, read in the release's title. */
  version: string;
  /** The APK's address. */
  url: string;
  /** Its size in bytes (0 when GitHub does not give it). */
  size: number;
  /** « sha256:… », which the downloaded file must match, when GitHub gives it. */
  digest?: string;
}

/** What the app needs from GitHub's answer; null when it is not a release with the APK and a version. */
export function parseRelease(json: unknown): Release | null {
  if (!json || typeof json !== 'object') return null;
  const r = json as { name?: unknown; assets?: unknown };
  const version = typeof r.name === 'string' ? /(?:^|\s)v?(\d+\.\d+\.\d+)(?=\s|$)/.exec(r.name)?.[1] : undefined;
  const apk = (Array.isArray(r.assets) ? (r.assets as unknown[]) : [])
    .filter((a): a is Record<string, unknown> => Boolean(a) && typeof a === 'object')
    .find((a) => a.name === APK_NAME);
  const url = apk?.browser_download_url;
  // A release asset is served from github.com (which redirects to its storage): nowhere else.
  if (!version || typeof url !== 'string' || !url.startsWith('https://github.com/')) return null;
  const digest = typeof apk?.digest === 'string' && /^sha256:[0-9a-f]{64}$/.test(apk.digest) ? apk.digest : undefined;
  return { version, url, size: typeof apk?.size === 'number' && apk.size > 0 ? apk.size : 0, digest };
}

/** Compares two versions number by number (« 1.0.99 » < « 1.0.312 »): negative, zero or positive. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map((n) => Number.parseInt(n, 10) || 0);
  const pb = b.split('.').map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return Math.sign(d);
  }
  return 0;
}

const MB = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

/** « 4,1 Mo », in the units Android shows (1 Mo = 1 000 000 octets), the number kept with its unit. */
export function megabytes(bytes: number): string {
  return `${MB.format(bytes / 1e6)} Mo`;
}

/** Where an update stands. `installed` is the version of the app running, once known. */
export type UpdateState =
  | { step: 'idle' }
  | { step: 'checking'; installed?: string; manual: boolean }
  | { step: 'current'; installed: string; manual: boolean }
  | { step: 'available'; installed: string; release: Release }
  | { step: 'downloading'; installed: string; release: Release; loaded: number; total: number }
  /** Downloaded; Android has yet to allow this app to install it. `refused`: the learner came back without. */
  | { step: 'permission'; installed: string; release: Release; refused: boolean }
  /** Downloaded and handed to the installer: if the learner closed it, the button opens it again. */
  | { step: 'ready'; installed: string; release: Release }
  /** `release` is there when the update itself failed (to try again), absent when the check did. */
  | { step: 'failed'; installed?: string; release?: Release; error: string; manual: boolean };

interface AppUpdatePlugin {
  canInstall(): Promise<{ allowed: boolean }>;
  openInstallSettings(): Promise<{ allowed: boolean }>;
  download(options: { url: string; digest?: string }): Promise<{ versionName: string; versionCode: number }>;
  cancel(): Promise<void>;
  install(): Promise<void>;
  addListener(event: 'downloadProgress', listener: (progress: { loaded: number; total: number }) => void): Promise<PluginListenerHandle>;
}

const AppUpdate = registerPlugin<AppUpdatePlugin>('AppUpdate');

let state: UpdateState = { step: 'idle' };
/** The version whose banner the learner put off (« Plus tard »): offered again at the next launch. */
let putOff: string | null = null;
/** When GitHub last answered. */
let lastAnswer = 0;
const listeners = new Set<() => void>();

function set(next: UpdateState) {
  state = next;
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useUpdate(): UpdateState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function usePutOff(): string | null {
  return useSyncExternalStore(subscribe, () => putOff, () => putOff);
}

/** Hides the banner of this version until the next launch; À propos still offers it. */
export function putOffUpdate() {
  if ('release' in state && state.release) putOff = state.release.version;
  for (const l of listeners) l();
}

/** The banner shows an update found, and the steps of one under way, unless the learner put it off. */
export function inBanner(s: UpdateState, off: string | null): boolean {
  if (s.step === 'failed') return Boolean(s.release) && s.release?.version !== off;
  if (s.step === 'available' || s.step === 'downloading' || s.step === 'permission' || s.step === 'ready')
    return s.release.version !== off;
  return false;
}

/** An update under way: no check replaces it. */
function busy(s: UpdateState): boolean {
  return s.step === 'checking' || s.step === 'downloading' || s.step === 'permission' || s.step === 'ready';
}

/** The code of a plugin's refusal (« NETWORK », « NOT_ALLOWED »…), if it gave one. */
function codeOf(e: unknown): string | undefined {
  const code = (e as { code?: unknown } | null)?.code;
  return typeof code === 'string' ? code : undefined;
}

class CheckFailed extends Error {}

let running: Promise<string> | null = null;

/** The version of the app running (« 1.0.312 », the APK's versionName). */
export function installedVersion(): Promise<string> {
  running ??= import('@capacitor/app').then(({ App }) => App.getInfo()).then((info) => info.version);
  return running;
}

async function fetchRelease(): Promise<Release> {
  if (!navigator.onLine) throw new CheckFailed('Pas de connexion : impossible de chercher une mise à jour.');
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), CHECK_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(RELEASE_API, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store', signal: abort.signal });
  } catch {
    throw new CheckFailed('GitHub ne répond pas : vérifie la connexion, puis réessaie.');
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 404) throw new CheckFailed('Aucune version Android n’est publiée sur GitHub pour l’instant.');
  if (res.status === 403 || res.status === 429)
    throw new CheckFailed('GitHub limite les vérifications depuis ce réseau : réessaie dans une heure.');
  if (!res.ok) throw new CheckFailed(`GitHub n’a pas pu répondre (erreur ${res.status}) : réessaie plus tard.`);
  const release = parseRelease(await res.json().catch(() => null));
  if (!release) throw new CheckFailed('La version publiée sur GitHub ne se lit pas : télécharge-la depuis sa page.');
  return release;
}

/**
 * Looks for a newer version on GitHub. `manual`: asked from À propos, whose line then says how it
 * went; a check of its own (at launch) only shows when it finds an update.
 */
export async function checkForUpdate(manual = false): Promise<void> {
  if (!inApp || busy(state)) return;
  const known = 'installed' in state ? state.installed : undefined;
  set({ step: 'checking', installed: known, manual });
  let version = known;
  try {
    version ??= await installedVersion();
    const release = await fetchRelease();
    lastAnswer = Date.now();
    set(
      compareVersions(release.version, version) > 0
        ? { step: 'available', installed: version, release }
        : { step: 'current', installed: version, manual },
    );
  } catch (e) {
    const error = e instanceof CheckFailed ? e.message : 'La recherche de mise à jour a échoué : réessaie plus tard.';
    set({ step: 'failed', installed: version, error, manual });
  }
}

/** Downloads the update found, then hands it to Android's installer. */
export async function startUpdate(): Promise<void> {
  const s = state;
  if (s.step !== 'available' && s.step !== 'failed') return;
  if (!s.installed || !s.release) return;
  const { installed, release } = s;
  set({ step: 'downloading', installed, release, loaded: 0, total: release.size });
  let progress: PluginListenerHandle | undefined;
  try {
    progress = await AppUpdate.addListener('downloadProgress', ({ loaded, total }) => {
      if (state.step === 'downloading') set({ ...state, loaded, total: total > 0 ? total : release.size });
    });
    await AppUpdate.download({ url: release.url, digest: release.digest });
  } catch (e) {
    const code = codeOf(e);
    if (code === 'CANCELLED') set({ step: 'available', installed, release });
    else set({ step: 'failed', installed, release, error: downloadError(code), manual: true });
    return;
  } finally {
    void progress?.remove();
  }
  await install(installed, release);
}

function downloadError(code: string | undefined): string {
  if (code === 'CORRUPT') return 'Le fichier reçu ne correspond pas à celui publié sur GitHub : il a été supprimé. Réessaie.';
  if (code === 'NOT_NEWER') return 'Le fichier publié n’est pas une version plus récente de l’app.';
  return 'Le téléchargement s’est interrompu : vérifie la connexion, puis réessaie.';
}

async function install(installed: string, release: Release, afterSettings = false): Promise<void> {
  try {
    const { allowed } = await AppUpdate.canInstall();
    if (!allowed) return set({ step: 'permission', installed, release, refused: afterSettings });
    await AppUpdate.install();
    set({ step: 'ready', installed, release });
  } catch (e) {
    const code = codeOf(e);
    if (code === 'NOT_ALLOWED') set({ step: 'permission', installed, release, refused: afterSettings });
    // The download is gone from the cache (cleared by Android): download it again.
    else if (code === 'NO_UPDATE') set({ step: 'available', installed, release });
    else set({ step: 'failed', installed, release, error: 'Android n’a pas pu ouvrir l’installeur : télécharge l’APK depuis sa page GitHub.', manual: true });
  }
}

/** Opens the installer again: the learner closed it without installing. */
export async function installUpdate(): Promise<void> {
  if (state.step === 'ready') await install(state.installed, state.release);
}

/** Opens Android's setting for this app; back from it, installs if the learner allowed it. */
export async function allowInstalls(): Promise<void> {
  const s = state;
  if (s.step !== 'permission') return;
  const { allowed } = await AppUpdate.openInstallSettings().catch(() => ({ allowed: false }));
  if (state !== s) return;
  if (allowed) await install(s.installed, s.release, true);
  else set({ ...s, refused: true });
}

export function cancelDownload() {
  if (state.step === 'downloading') void AppUpdate.cancel();
}

/**
 * Looks for an update at launch, then each time the app comes back to the screen or online when
 * GitHub has not answered for six hours. Returns what stops it.
 */
export function watchForUpdates(): () => void {
  if (!inApp) return () => {};
  const look = () => {
    if (document.visibilityState === 'visible' && Date.now() - lastAnswer >= RECHECK_MS) void checkForUpdate();
  };
  look();
  document.addEventListener('visibilitychange', look);
  window.addEventListener('online', look);
  return () => {
    document.removeEventListener('visibilitychange', look);
    window.removeEventListener('online', look);
  };
}
