import { useEffect, useSyncExternalStore, type AnchorHTMLAttributes } from 'react';

/** Hash routing keeps deep links working on static hosts such as GitHub Pages. */
export interface Route {
  path: string[];
  query: URLSearchParams;
  raw: string;
}

/** A truncated or hand-typed link (`#/apprendre/typo%`) must not stop the app from starting. */
function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function parseRoute(hash: string): Route {
  const raw = hash.replace(/^#/, '') || '/';
  const [p, q = ''] = raw.split('?');
  return { raw, path: p.split('/').filter(Boolean).map(decode), query: new URLSearchParams(q) };
}

const hasWindow = typeof window !== 'undefined';
let current = parseRoute(hasWindow ? window.location.hash : '');
const listeners = new Set<() => void>();
if (hasWindow)
  window.addEventListener('hashchange', () => {
    current = parseRoute(window.location.hash);
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

/** « Typographie — Épreuves »: the view's name first, so each tab and history entry is distinct. */
export function pageTitle(...parts: string[]): string {
  return [...parts, 'Épreuves'].join(' — ');
}

/** Sets the document title while the view is shown. `null` leaves it to a child view (Page introuvable…). */
export function usePageTitle(title: string | null) {
  useEffect(() => {
    if (title !== null) document.title = title;
  }, [title]);
}
