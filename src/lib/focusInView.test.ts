import { describe, expect, it } from 'vitest';
import { outsideBand } from './focusInView';

const box = (top: number, height: number) => ({ top, bottom: top + height });

describe('a focused control and the band the bars leave free', () => {
  // 320 × 640 in a session: the top bar ends at 69, the « Vérifier » bar starts at 544.
  const [top, bottom] = [69, 544];

  it('leaves a control wholly in the band', () => {
    expect(outsideBand(box(300, 44), top, bottom)).toBe(false);
    expect(outsideBand(box(69, 44), top, bottom)).toBe(false);
    expect(outsideBand(box(500, 44), top, bottom)).toBe(false);
  });

  it('finds a control that « Descendre » took under the « Vérifier » bar, even by a part, or off the screen', () => {
    expect(outsideBand(box(520, 40), top, bottom)).toBe(true);
    expect(outsideBand(box(707, 40), top, bottom)).toBe(true);
    expect(outsideBand(box(40, 40), top, bottom)).toBe(true);
  });

  it('allows a pixel of rounding at the edges', () => {
    expect(outsideBand(box(68.5, 44), top, bottom)).toBe(false);
    expect(outsideBand(box(500.8, 44), top, bottom)).toBe(false);
  });

  it('leaves a figure taller than the band while part of it shows', () => {
    expect(outsideBand(box(-200, 900), top, bottom)).toBe(false);
    expect(outsideBand(box(544, 900), top, bottom)).toBe(true);
    expect(outsideBand(box(-900, 960), top, bottom)).toBe(true);
  });
});
