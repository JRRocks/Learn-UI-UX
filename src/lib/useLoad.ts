import { useEffect, useState } from 'react';

const cache = new Map<string, Promise<unknown>>();
const values = new Map<string, unknown>();

/** Load a lazily-split resource once per visit; returns `undefined` until it arrives. */
export function useLoad<T>(key: string, loader: () => Promise<T>): T | undefined {
  const [value, setValue] = useState<T | undefined>(() => values.get(key) as T | undefined);
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
    p.then((v) => alive && setValue(v)).catch(() => cache.delete(key));
    return () => {
      alive = false;
    };
  }, [key, loader]);
  return value;
}
