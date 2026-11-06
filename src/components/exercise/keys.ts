/**
 * Keyboard shortcuts shared by the exercises, the flashcards and the timed challenge.
 *
 * - Enter and Space never take over a control that has its own behavior (button, link, select…):
 *   the control acts natively, and a page shortcut only runs from a neutral spot (heading, body,
 *   an answer's radio or checkbox).
 * - Character shortcuts (digits, V, F) only work while the focus is inside the task they act on
 *   (WCAG 2.1.4, « active only on focus »).
 * - A held key (auto-repeat) or a doubled press does not act twice: shortcuts wait a moment after
 *   the screen changed.
 */

/** After an exercise appears or its correction shows, Enter waits this long before acting again. */
export const SETTLE_MS = 400;

/** The element the event really started from: `e.target` is retargeted to the host of a mock's shadow root. */
export function eventOrigin(e: Event): Element | null {
  const first = typeof e.composedPath === 'function' ? e.composedPath()[0] : e.target;
  return typeof Element !== 'undefined' && first instanceof Element ? first : null;
}

/** Radios, checkboxes and ranges are answers: Enter there validates, as in a form. */
const ANSWER_INPUT = ':not([type="radio"]):not([type="checkbox"]):not([type="range"])';
const OWN_KEYS = `a[href], button, select, textarea, summary, [role="button"], [role="link"], [contenteditable]:not([contenteditable="false"]), input${ANSWER_INPUT}`;
const TEXT_ENTRY = `select, textarea, [contenteditable]:not([contenteditable="false"]), input${ANSWER_INPUT}:not([type="button"]):not([type="submit"]):not([type="reset"])`;

/** A control that answers Enter and Space itself (its own click, its own menu). */
export const handlesOwnKeys = (el: Element | null): boolean => Boolean(el?.closest(OWN_KEYS));

/** Typing goes to the control: no character shortcut there. */
export const isTextEntry = (el: Element | null): boolean => Boolean(el?.closest(TEXT_ENTRY));

/** The event happened inside `container`, shadow roots included. */
export function within(e: Event, container: Element | null | undefined): boolean {
  return Boolean(container) && typeof e.composedPath === 'function' && e.composedPath().includes(container as EventTarget);
}

/**
 * The digit a key stands for. The top row is read from its position (`code`), because a French
 * AZERTY keyboard sends « & é " ' ( » there without Shift; the numeric keypad only counts with
 * Num Lock on (otherwise it sends arrows); anything else falls back to the character.
 */
export function digitOf(e: Pick<KeyboardEvent, 'key' | 'code'>): number | null {
  const top = /^Digit(\d)$/.exec(e.code ?? '');
  if (top) return Number(top[1]);
  if (/^Numpad\d$/.test(e.code ?? '')) return /^\d$/.test(e.key) ? Number(e.key) : null;
  return /^\d$/.test(e.key) ? Number(e.key) : null;
}

export const hasModifier = (e: Pick<KeyboardEvent, 'metaKey' | 'ctrlKey' | 'altKey'>) => e.metaKey || e.ctrlKey || e.altKey;
