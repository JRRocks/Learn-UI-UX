import type { FocusEvent } from 'react';

/** Time for the items the page has just scrolled to to be laid out (two animation frames are not enough). */
const SETTLE_MS = 150;

/**
 * For views drawn with `content-visibility: auto` (a lesson's examples, the anti-pattern catalog): a far
 * item is laid out only once it comes near the screen, at a typical height until then. Tab scrolls to
 * where a far control was estimated to be, then the items around it take their real height and can
 * push it out of view, where nothing shows the focus (WCAG 2.4.11). Once they have, bring it back.
 * Only for a moment after the focus moves: scrolling by hand is never pulled back to the control.
 */
export function keepFocusInView(e: FocusEvent<HTMLElement>) {
  const target = e.target;
  window.setTimeout(() => {
    if (document.activeElement === target) target.scrollIntoView({ block: 'nearest' });
  }, SETTLE_MS);
}
