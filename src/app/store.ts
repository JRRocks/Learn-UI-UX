import { useSyncExternalStore } from 'react';
import { newBadges, type BadgeContext } from '../engine/badges';
import { dayKey } from '../engine/dates';
import { emptyProgress, normalizeProgress, type ProgressState } from '../engine/progress';
import { toast } from './toasts';

export const STORAGE_KEY = 'learn-ui-ux:v1';

function load(): ProgressState {
  try {
    return normalizeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'));
  } catch {
    return emptyProgress();
  }
}

let state: ProgressState = load();
let badgeContext: BadgeContext | null = null;
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or full storage: progress stays in memory for this visit.
  }
}

function emit() {
  for (const l of listeners) l();
}

function awardBadges() {
  if (!badgeContext) return;
  const earned = newBadges(state, badgeContext);
  if (!earned.length) return;
  const today = dayKey();
  state = { ...state, badges: { ...state.badges, ...Object.fromEntries(earned.map((b) => [b.id, today])) } };
  for (const b of earned) toast(`Badge obtenu : ${b.title}`, 'badge');
}

export const store = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  update(fn: (s: ProgressState) => ProgressState) {
    state = fn(state);
    awardBadges();
    persist();
    emit();
  },
  replace(next: ProgressState) {
    state = normalizeProgress(next);
    persist();
    emit();
  },
  setBadgeContext(ctx: BadgeContext) {
    badgeContext = ctx;
  },
};

// Keep several open tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      emit();
    }
  });
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}
