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
