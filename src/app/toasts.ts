import { useSyncExternalStore } from 'react';

export interface Toast {
  id: number;
  text: string;
  tone: 'info' | 'badge';
  /** It waited for another toast to go: it does not answer the learner's last action. */
  queued: boolean;
}

/** How long a toast stays on screen, counted from when it shows. */
export const TOAST_MS = 4500;

/**
 * One toast on screen at a time; the others wait their turn, in order. Two badges earned by the same
 * answer used to stack up: from 720 px, the second rose above the « Valider » bar, over the end of the
 * correction (the band of the bar holds one toast, app.css).
 */
let queue: Toast[] = [];
/** The toast next in turn waits: it would come up over the control that has the keyboard focus. */
let held = false;
let timer: ReturnType<typeof setTimeout> | undefined;
const NONE: readonly Toast[] = [];
/** What is on screen, kept as the same array while it does not change (useSyncExternalStore). */
let shown: readonly Toast[] = NONE;
let seq = 0;
const listeners = new Set<() => void>();

function update() {
  if (!queue.length) held = false;
  const first = held ? undefined : queue[0];
  if (shown[0] !== first) {
    clearTimeout(timer);
    timer = first ? setTimeout(() => dismissToast(first.id), TOAST_MS) : undefined;
    shown = first ? [first] : NONE;
  }
  listeners.forEach((l) => l());
}

/**
 * Show a toast. A badge waits its turn behind the toasts already there. A message (`info`) answers the
 * learner's last action: it shows at once, in place of the answer to an earlier action (« Sauvegarde
 * importée » once « Annuler l’import » is pressed), and ahead of the badges, even those the same action
 * has just earned (« Leçon lue » before « Lecture complète »), which wait their turn again.
 */
export function toast(text: string, tone: Toast['tone'] = 'info') {
  const t: Toast = { id: ++seq, text, tone, queued: false };
  if (tone === 'info') {
    queue = [t, ...queue.filter((x) => x.tone !== 'info').map((x) => (x.queued ? x : { ...x, queued: true }))];
    held = false;
  } else queue = [...queue, { ...t, queued: queue.length > 0 }];
  update();
}

/** Its time is up, it was tapped, or the keyboard focus came under it: the next one in turn shows. */
export function dismissToast(id: number) {
  if (!queue.some((t) => t.id === id)) return;
  queue = queue.filter((t) => t.id !== id);
  update();
}

/** Escape: every toast goes away at once, those waiting their turn included. */
export function dismissAllToasts() {
  if (!queue.length) return;
  queue = [];
  update();
}

/**
 * Keep back the toast next in turn (`true`) while the control that has the keyboard focus lies where it
 * would show, then let it come (`false`): its time on screen starts again when it shows.
 */
export function holdToasts(on: boolean) {
  if (held === on) return;
  held = on;
  update();
}

/** The toast on screen, if any: none while the next one is held back. */
export function shownToasts(): readonly Toast[] {
  return shown;
}

export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Tells whether the focus is being moved by the learner with Tab, Shift+Tab or the arrows of a radio
 * group: the browser moves it right after the key's event, in the same task, before `defer` runs.
 * Only such a move clears the toasts it lands under. The focus that a closing dialog gives back, or
 * that the page sets, comes from another key or later: it keeps the toast its own action has just
 * shown (« Sauvegarde importée », over the import button).
 */
export function keyMoves(defer: (done: () => void) => void = (done) => window.setTimeout(done, 0)) {
  let moving = false;
  return {
    key(key: string) {
      if (key !== 'Tab' && !key.startsWith('Arrow')) return;
      moving = true;
      defer(() => {
        moving = false;
      });
    },
    get moving() {
      return moving;
    },
  };
}

/**
 * The room the page keeps at its end for the toasts, in px: from the top of the toast on screen to the
 * bottom edge of the screen (`viewport`), where the toasts stand once the « Valider » bar no longer sticks
 * there (app.css). Scrolled to its end, the page then shows its last control clear of a toast: at 320 px
 * with a 32 px text, a toast 266 to 320 px tall covered « Épreuve suivante » in the 64 px kept for it.
 * The room only grows (`current`): shrunk when the toast goes, the page would jump under the reader.
 */
export function toastRoom(current: number, toastTop: number | null, viewport: number): number {
  if (toastTop === null) return current;
  return Math.max(current, Math.ceil(viewport - toastTop));
}

/**
 * The toasts lying over `target`, the control that has just received the keyboard focus, or the point
 * of a tap: they go away, or the next one waits, so that a control never ends up hidden under one
 * (WCAG 2.4.11). Boxes that only touch do not overlap.
 */
export function toastsOver(target: Box, shown: readonly { id: number; box: Box }[]): number[] {
  return shown
    .filter(({ box }) => box.left < target.right && target.left < box.right && box.top < target.bottom && target.top < box.bottom)
    .map((t) => t.id);
}

export function useToasts(): readonly Toast[] {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    shownToasts,
    shownToasts,
  );
}
