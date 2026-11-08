import type { MouseEvent } from 'react';
import { href, useRoute } from '../app/router';
import { frenchSpacing } from '../lib/markdown';

/**
 * Links to the sections of a long page (the themes of the lessons, the ways to train). Hash routing
 * leaves no room for `#anchors`: a link scrolls its section into view and moves the focus to its
 * heading, so that Tab and screen readers carry on from there. On a phone the links take one row,
 * which scrolls sideways (app.css).
 */
export function JumpNav({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  const route = useRoute();
  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const h = document.getElementById(id);
    if (!h) return;
    (h.closest('section') ?? h).scrollIntoView();
    h.focus({ preventScroll: true });
  };
  return (
    <nav className="jump" aria-label={label}>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a href={href(route.raw)} onClick={(e) => go(e, it.id)}>
              {frenchSpacing(it.label)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
