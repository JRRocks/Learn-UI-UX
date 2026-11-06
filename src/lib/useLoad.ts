import { useEffect, useEffectEvent, useState, useSyncExternalStore } from 'react';

const pending = new Map<string, Promise<unknown>>();
const values = new Map<string, unknown>();

export interface LoadState<T> {
  value: T | undefined;
  /** The chunk could not be fetched (offline, or removed by a new deployment). */
  failed: boolean;
}

/**
 * Load a lazily-split resource once per visit and key. A failure is forgotten, so a later call tries
 * again (a module whose download failed stays failed until the page is reloaded, though: the browser
 * keeps the failure for that address).
 */
export function load<T>(key: string, loader: () => Promise<T>): Promise<T> {
  if (values.has(key)) return Promise.resolve(values.get(key) as T);
  let p = pending.get(key) as Promise<T> | undefined;
  if (!p) {
    p = loader().then(
      (v) => {
        values.set(key, v);
        pending.delete(key);
        return v;
      },
      (e: unknown) => {
        pending.delete(key);
        throw e;
      },
    );
    pending.set(key, p);
  }
  return p;
}

/**
 * Load a resource (see `load`) and say when it failed, so the view can explain it. `peek` gives a
 * value already at hand under another key, so the view does not flash a loading state for it.
 */
export function useLoadState<T>(key: string, loader: () => Promise<T>, peek?: () => T | undefined): LoadState<T> {
  const ready = values.has(key) ? (values.get(key) as T) : peek?.();
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const [, setLoaded] = useState(0);
  const run = useEffectEvent(() => loader());
  const missing = ready === undefined;
  useEffect(() => {
    if (!missing) return;
    let alive = true;
    load(key, run).then(
      () => alive && setLoaded((n) => n + 1),
      () => alive && setFailedKey(key),
    );
    return () => {
      alive = false;
    };
  }, [key, missing]);
  return { value: ready, failed: missing && failedKey === key };
}

/** Load a lazily-split resource once per visit; returns `undefined` until it arrives. */
export function useLoad<T>(key: string, loader: () => Promise<T>): T | undefined {
  return useLoadState(key, loader).value;
}

function subscribeOnline(onChange: () => void) {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);
  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
}

/** Whether the browser believes it is connected, kept live. */
export function useOnline(): boolean {
  return useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
}
