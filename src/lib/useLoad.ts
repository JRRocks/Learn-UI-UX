import { useEffect, useState } from 'react';

const cache = new Map<string, Promise<unknown>>();
const values = new Map<string, unknown>();

export interface LoadState<T> {
  value: T | undefined;
  /** The chunk could not be fetched (offline, or removed by a new deployment). */
  failed: boolean;
}

/** Load a lazily-split resource once per visit, and say when it failed so the view can explain it. */
export function useLoadState<T>(key: string, loader: () => Promise<T>): LoadState<T> {
  const [state, setState] = useState<LoadState<T>>(() => ({ value: values.get(key) as T | undefined, failed: false }));
  useEffect(() => {
    if (values.has(key)) return;
    let alive = true;
    let p = cache.get(key) as Promise<T> | undefined;
    if (!p) {
      p = loader().then((v) => {
        values.set(key, v);
        return v;
      });
      cache.set(key, p);
    }
    p.then(
      (v) => alive && setState({ value: v, failed: false }),
      () => {
        cache.delete(key);
        if (alive) setState({ value: undefined, failed: true });
      },
    );
    return () => {
      alive = false;
    };
  }, [key, loader]);
  return state;
}

/** Load a lazily-split resource once per visit; returns `undefined` until it arrives. */
export function useLoad<T>(key: string, loader: () => Promise<T>): T | undefined {
  return useLoadState(key, loader).value;
}
