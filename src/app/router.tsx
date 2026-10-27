import { useSyncExternalStore, type AnchorHTMLAttributes } from 'react';

/** Hash routing keeps deep links working on static hosts such as GitHub Pages. */
export interface Route {
  path: string[];
  query: URLSearchParams;
  raw: string;
}

function read(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [p, q = ''] = raw.split('?');
  return { raw, path: p.split('/').filter(Boolean).map(decodeURIComponent), query: new URLSearchParams(q) };
}

let current = read();
const listeners = new Set<() => void>();
window.addEventListener('hashchange', () => {
  current = read();
  listeners.forEach((l) => l());
});

export function useRoute(): Route {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => current,
    () => current,
  );
}

export function navigate(to: string) {
  window.location.hash = to;
}

export function href(to: string): string {
  return `#${to}`;
}

export function Link({ to, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={href(to)} {...rest} />;
}
