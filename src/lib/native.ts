import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';

/** Running in the Android app (Capacitor, android/), rather than in a browser. */
export const inApp = Capacitor.isNativePlatform();

/** Where the progress is kept, for the texts that say so: « effacée de ce navigateur ». */
export const here = inApp ? 'cette app' : 'ce navigateur';

/**
 * The icons of the status and navigation bars follow the colour behind them. From WebView 140 the
 * page draws under the bars (Capacitor passes it the safe-area insets): the icons follow the theme of
 * the app, light on the dark theme even when the phone is in light mode. With an older WebView,
 * Capacitor keeps the page between the bars, which sit on the paper of the phone's own theme: the
 * icons follow the phone.
 */
export function syncSystemBars(theme: 'light' | 'dark' | 'system') {
  if (!inApp) return;
  const underBars = Number(/Chrome\/(\d+)/.exec(navigator.userAgent)?.[1] ?? 0) >= 140;
  const style =
    !underBars || theme === 'system' ? SystemBarsStyle.Default : theme === 'dark' ? SystemBarsStyle.Dark : SystemBarsStyle.Light;
  SystemBars.setStyle({ style }).catch(() => {});
}

/**
 * Hands a JSON file to the learner: downloaded in a browser; in the app, where a web view cannot
 * download, written to the cache and offered to the Android share sheet (Files, Drive, a message…).
 */
export async function saveJson(name: string, json: string) {
  if (!inApp) {
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }
  const [{ Filesystem, Directory, Encoding }, { Share }] = await Promise.all([import('@capacitor/filesystem'), import('@capacitor/share')]);
  const { uri } = await Filesystem.writeFile({ path: name, data: json, directory: Directory.Cache, encoding: Encoding.UTF8 });
  // Closing the sheet without choosing rejects: nothing to report.
  await Share.share({ title: name, files: [uri] }).catch(() => {});
}
