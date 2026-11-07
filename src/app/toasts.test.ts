import { describe, expect, it } from 'vitest';
import { keyMoves, toastsOver, type Box } from './toasts';

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
  // 320 × 640, in a session: the badge toast sits just above the « Valider » bar, where the browser
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

  it('names only the toasts of the stack that cover it', () => {
    const above = { id: 2, box: box(16, 368, 288, 78) };
    expect(toastsOver(box(16, 400, 200, 24), [above, toast])).toEqual([2]);
    expect(toastsOver(box(16, 420, 200, 60), [above, toast])).toEqual([2, 1]);
  });
});
