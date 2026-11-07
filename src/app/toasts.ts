import { useSyncExternalStore } from 'react';

export interface Toast {
  id: number;
  text: string;
  tone: 'info' | 'badge';
}

let toasts: Toast[] = [];
let seq = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(text: string, tone: Toast['tone'] = 'info') {
  const id = ++seq;
  toasts = [...toasts, { id, text, tone }];
  emit();
  window.setTimeout(() => dismissToast(id), 4500);
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/** Escape: every toast goes away at once. */
export function dismissAllToasts() {
  if (!toasts.length) return;
  toasts = [];
  emit();
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
 * The toasts lying over `target`, the control that has just received the keyboard focus: they go
 * away, so that it never ends up hidden under one (WCAG 2.4.11). Boxes that only touch do not overlap.
 */
export function toastsOver(target: Box, shown: readonly { id: number; box: Box }[]): number[] {
  return shown
    .filter(({ box }) => box.left < target.right && target.left < box.right && box.top < target.bottom && target.top < box.bottom)
    .map((t) => t.id);
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => toasts,
    () => toasts,
  );
}
