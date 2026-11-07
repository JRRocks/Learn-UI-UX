/** Time for the items the page has just scrolled to to be laid out (two animation frames are not enough). */
const SETTLE_MS = 150;

/** Sub-pixel rounding: a control this close to a bar is not under it. */
const SLACK = 1;

/**
 * For views drawn with `content-visibility: auto` (a lesson's examples, the anti-pattern catalog, the
 * corrections of a session's summary): a far item is laid out only once it comes near the screen, at a
 * typical height until then. Tab scrolls to where a far control was estimated to be, then the items around
 * it take their real height and can push it out of view, where nothing shows the focus (WCAG 2.4.11).
 * Once they have, bring it back.
 *
 * Only the focus the keyboard moves (`:focus-visible`: Tab, or a script after a key), and only once it is
 * hidden: a click or a tap lands on a control in view, and the page must not move under the pointer. Only
 * for a moment after the focus moves: scrolling by hand is never pulled back to the control.
 */
export function keepFocusInView() {
  const el = focused();
  if (!el?.matches(':focus-visible')) return;
  window.setTimeout(() => {
    if (focused() === el && hidden(el)) el.scrollIntoView({ block: 'nearest' });
  }, SETTLE_MS);
}

/** The element that has the focus, inside a mock's shadow root too. */
function focused(): Element | null {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

/**
 * Whether `el` is out of the window or under one of the bars that stay on screen (top bar, tab bar,
 * session bars), looked for where they are: at the top and bottom edges of the window, above and below it.
 */
function hidden(el: Element): boolean {
  const r = el.getBoundingClientRect();
  const x = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1);
  const top = barEdge(el, x, 0, 'bottom') ?? 0;
  const bottom = barEdge(el, x, window.innerHeight - 1, 'top') ?? window.innerHeight;
  // Taller than the band left free (a whole figure): hidden only when none of it shows.
  if (r.height > bottom - top) return r.bottom <= top || r.top >= bottom;
  return r.top < top - SLACK || r.bottom > bottom + SLACK;
}

/** The `edge` of the bar at (x, y): a fixed or sticky box, unless it holds `el` (its own controls show). */
function barEdge(el: Element, x: number, y: number, edge: 'top' | 'bottom'): number | undefined {
  const own = inPage(el);
  for (let n = document.elementFromPoint(x, y); n; n = n.parentElement) {
    if (n.contains(own)) return undefined;
    const { position } = getComputedStyle(n);
    if (position === 'fixed' || position === 'sticky') return n.getBoundingClientRect()[edge];
  }
  return undefined;
}

/** `el`, or the mock whose shadow root holds it: what the page's own boxes contain. */
function inPage(el: Element): Element {
  let node: Element = el;
  for (let root = node.getRootNode(); root instanceof ShadowRoot; root = node.getRootNode()) node = root.host;
  return node;
}
