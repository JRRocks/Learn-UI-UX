import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TOAST_MS, dismissAllToasts, dismissToast, holdToasts, keyMoves, shownToasts, toast, toastRoom, toastsOver, type Box } from './toasts';

describe('a focus moved by the learner with the keyboard', () => {
  // The tasks after the key's event: the browser has moved the focus before they run.
  const later: (() => void)[] = [];
  const nextTask = () => later.splice(0).forEach((done) => done());

  it('counts the focus change that Tab, Shift+Tab or an arrow makes, in the same task', () => {
    const keys = keyMoves((done) => later.push(done));
    expect(keys.moving).toBe(false);
    for (const key of ['Tab', 'ArrowDown', 'ArrowLeft']) {
      keys.key(key);
      expect(keys.moving).toBe(true);
      nextTask();
      expect(keys.moving).toBe(false);
    }
  });

  it('leaves a focus given back by a closing dialog or set by the page', () => {
    const keys = keyMoves((done) => later.push(done));
    // Shift+Tab to « Remplacer ma progression », then Enter: the dialog closes and gives the focus
    // back to the import button, under the toast « Sauvegarde importée » that Enter has just shown.
    keys.key('Tab');
    nextTask();
    keys.key('Enter');
    expect(keys.moving).toBe(false);
    keys.key(' ');
    keys.key('Escape');
    expect(keys.moving).toBe(false);
  });
});

const box = (left: number, top: number, width: number, height: number): Box => ({ left, top, right: left + width, bottom: top + height });

describe('toasts over the focused control', () => {
  // 320 × 640, in a session: the badge toast sits just above the « Vérifier » bar, where the browser
  // parks a link reached with Tab (scroll-padding-bottom).
  const toast = { id: 1, box: box(16, 454, 288, 78) };

  it('names a toast that hides the control', () => {
    expect(toastsOver(box(16, 460, 288, 24), [toast])).toEqual([1]);
  });

  it('names a toast that hides part of it', () => {
    expect(toastsOver(box(16, 440, 120, 24), [toast])).toEqual([1]);
  });

  it('leaves the toasts that do not reach it', () => {
    expect(toastsOver(box(16, 120, 288, 24), [toast])).toEqual([]);
    expect(toastsOver(box(16, 548, 120, 48), [toast])).toEqual([]);
  });

  it('leaves a toast that only touches it', () => {
    expect(toastsOver(box(16, 430, 288, 24), [toast])).toEqual([]);
    expect(toastsOver(box(304, 460, 40, 24), [toast])).toEqual([]);
  });

  it('names the toast that lies under the point of a tap', () => {
    // A tap closed the toast above; the next one in turn would show under the same finger.
    expect(toastsOver(box(150, 480, 1, 1), [toast])).toEqual([1]);
    expect(toastsOver(box(150, 560, 1, 1), [toast])).toEqual([]);
  });

  it('names only the toasts of the stack that cover it', () => {
    const above = { id: 2, box: box(16, 368, 288, 78) };
    expect(toastsOver(box(16, 400, 200, 24), [above, toast])).toEqual([2]);
    expect(toastsOver(box(16, 420, 200, 60), [above, toast])).toEqual([2, 1]);
  });
});

describe('toasts in turn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    dismissAllToasts();
  });
  afterEach(() => {
    dismissAllToasts();
    vi.useRealTimers();
  });
  const texts = () => shownToasts().map((t) => t.text);

  it('shows one toast at a time, each for its full time from when it shows', () => {
    // Two badges earned by the same answer: stacked, the second rose above the « Vérifier » bar.
    toast('Badge obtenu : Première épreuve', 'badge');
    toast('Badge obtenu : Trois jours d’affilée', 'badge');
    expect(texts()).toEqual(['Badge obtenu : Première épreuve']);
    vi.advanceTimersByTime(TOAST_MS - 1);
    expect(texts()).toEqual(['Badge obtenu : Première épreuve']);
    vi.advanceTimersByTime(1);
    expect(texts()).toEqual(['Badge obtenu : Trois jours d’affilée']);
    vi.advanceTimersByTime(TOAST_MS - 1);
    expect(texts()).toEqual(['Badge obtenu : Trois jours d’affilée']);
    vi.advanceTimersByTime(1);
    expect(texts()).toEqual([]);
  });

  it('brings the next one as soon as the one on screen is tapped or cleared by the focus', () => {
    toast('un', 'badge');
    toast('deux', 'badge');
    vi.advanceTimersByTime(3000);
    dismissToast(shownToasts()[0].id);
    expect(texts()).toEqual(['deux']);
    vi.advanceTimersByTime(TOAST_MS - 1);
    expect(texts()).toEqual(['deux']);
  });

  it('tells a toast that waited its turn from one that answers the last action', () => {
    toast('un', 'badge');
    toast('deux', 'badge');
    expect(shownToasts()[0].queued).toBe(false);
    dismissToast(shownToasts()[0].id);
    expect(shownToasts()[0].queued).toBe(true);
  });

  it('clears the toasts waiting their turn with Escape', () => {
    toast('un', 'badge');
    toast('deux', 'badge');
    dismissAllToasts();
    expect(texts()).toEqual([]);
    vi.advanceTimersByTime(2 * TOAST_MS);
    expect(texts()).toEqual([]);
  });

  it('holds back the next one, its time stopped, until the keyboard focus has left its place', () => {
    toast('un', 'badge');
    toast('deux', 'badge');
    dismissToast(shownToasts()[0].id);
    holdToasts(true);
    expect(texts()).toEqual([]);
    vi.advanceTimersByTime(3 * TOAST_MS);
    expect(texts()).toEqual([]);
    holdToasts(false);
    expect(texts()).toEqual(['deux']);
    vi.advanceTimersByTime(TOAST_MS - 1);
    expect(texts()).toEqual(['deux']);
    vi.advanceTimersByTime(1);
    expect(texts()).toEqual([]);
  });

  it('shows the answer to the last action at once, in place of the answer to an earlier one', () => {
    toast('Sauvegarde importée : 2 222 XP.');
    vi.advanceTimersByTime(1000);
    toast('Ta progression d’avant l’import est rétablie.');
    expect(texts()).toEqual(['Ta progression d’avant l’import est rétablie.']);
    vi.advanceTimersByTime(TOAST_MS);
    expect(texts()).toEqual([]);
  });

  it('shows the answer to an action before the badges it has earned, which wait their turn', () => {
    // « Marquer comme lue »: the store awards the badge, then the page says the lesson is read.
    toast('Badge obtenu : Lecture complète', 'badge');
    toast('Leçon lue : +10 XP');
    expect(texts()).toEqual(['Leçon lue : +10 XP']);
    vi.advanceTimersByTime(TOAST_MS);
    expect(texts()).toEqual(['Badge obtenu : Lecture complète']);
    expect(shownToasts()[0].queued).toBe(true);
  });

  it('shows the answer to an action even while a badge is held back', () => {
    toast('un', 'badge');
    toast('deux', 'badge');
    dismissToast(shownToasts()[0].id);
    holdToasts(true);
    toast('Progression effacée.');
    expect(texts()).toEqual(['Progression effacée.']);
  });

  it('keeps the same list while the toast on screen stays (useSyncExternalStore)', () => {
    toast('un', 'badge');
    const shown = shownToasts();
    toast('deux', 'badge');
    expect(shownToasts()).toBe(shown);
  });
});

describe('room kept at the end of the page for the toasts', () => {
  it('reaches from the top of the toast on screen to the bottom of the screen', () => {
    // 390 × 844 with a 32 px text: a toast 266 px tall, 24 px above the bottom edge.
    expect(toastRoom(0, 844 - 24 - 266, 844)).toBe(290);
  });

  it('only grows, so that the page does not jump when a toast goes or a shorter one comes', () => {
    expect(toastRoom(290, 844 - 24 - 180, 844)).toBe(290);
    expect(toastRoom(290, null, 844)).toBe(290);
    expect(toastRoom(290, 844 - 24 - 320, 844)).toBe(344);
  });
});
