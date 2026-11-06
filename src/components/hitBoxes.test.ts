import { describe, expect, it } from 'vitest';
import { hitBoxes } from './Mock';

const box = (l: number, t: number, w: number, h: number) => ({ l, t, r: l + w, b: t + h });
const overlap = (a: ReturnType<typeof box>, b: ReturnType<typeof box>) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;

describe('hotspot targets (touch-1)', () => {
  it('grows a small zone to at least 24 × 24 px when there is room', () => {
    const [h] = hitBoxes([box(100, 100, 15, 16)], 400, 400, 4);
    expect(h.r - h.l).toBeGreaterThanOrEqual(24);
    expect(h.b - h.t).toBeGreaterThanOrEqual(24);
  });

  it('never grows into a neighbouring zone', () => {
    // Two lines 6 px apart, plus a zone to their right.
    const zones = [box(10, 100, 274, 17), box(10, 123, 274, 16), box(300, 100, 60, 35)];
    const hits = hitBoxes(zones, 400, 400, 8);
    for (let i = 0; i < hits.length; i++) for (let j = i + 1; j < hits.length; j++) expect(overlap(hits[i], hits[j])).toBe(false);
    // The blocked side is made up for on the free one: both lines still reach 24 px.
    expect(hits[0].b - hits[0].t).toBeGreaterThanOrEqual(24);
    expect(hits[1].b - hits[1].t).toBeGreaterThanOrEqual(24);
  });

  it('keeps a gap between targets that cannot reach 24 px (spacing exception)', () => {
    // platforms-webport: two lines 2 px apart, the zone above 8 px away.
    const zones = [box(10, 76, 274, 16), box(10, 100, 274, 17), box(10, 119, 274, 24), box(10, 151, 274, 20)];
    const [, hover, links] = hitBoxes(zones, 400, 400, 8);
    // The two targets do not touch…
    expect(links.t - hover.b).toBeGreaterThanOrEqual(2);
    // …and the 24 px circle centred on the undersized one stays clear of its neighbour.
    const cy = (hover.t + hover.b) / 2;
    expect(cy + 12).toBeLessThanOrEqual(links.t);
  });

  it('does not grow zones that the mock draws over each other into each other', () => {
    // platforms-android: the menu icon overlaps the top of the list by 2 px.
    const [menu, list] = hitBoxes([box(300, 274, 48, 48), box(42, 320, 306, 224)], 400, 700, 8);
    expect(menu.b).toBe(322);
    expect(list.t).toBe(320);
  });

  it('stays inside the mock', () => {
    const [h] = hitBoxes([box(0, 0, 10, 10)], 300, 200, 8);
    expect(h.l).toBeGreaterThanOrEqual(0);
    expect(h.t).toBeGreaterThanOrEqual(0);
  });
});
