import { describe, expect, it } from 'vitest';
import { badgeSpot, hitBoxes } from './Mock';

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

describe('check badge of a chosen zone', () => {
  const room = { text: [] as ReturnType<typeof box>[], others: [] as ReturnType<typeof box>[], width: 400, height: 300, rtl: false };
  const badge = ({ x, y }: { x: number; y: number }) => ({ l: x - 12, t: y - 12, r: x + 12, b: y + 12 });

  it('sits on the end corner of the outline when nothing is in the way', () => {
    const hit = box(100, 100, 120, 40);
    expect(badgeSpot(hit, room)).toEqual({ x: 220 + Math.SQRT1_2, y: 100 - Math.SQRT1_2 });
    // Right to left: the end corner is on the left.
    expect(badgeSpot(hit, { ...room, rtl: true })).toEqual({ x: 100 - Math.SQRT1_2, y: 100 - Math.SQRT1_2 });
  });

  it('never hides drawn text: « 0 / 20 » right-aligned under the corner (modes-operate)', () => {
    const hit = box(20, 200, 360, 80);
    const text = [box(20, 204, 140, 18), box(330, 204, 46, 18)];
    const spot = badgeSpot(hit, { ...room, text });
    for (const q of text) expect(overlap(badge(spot), q)).toBe(false);
    // Still on the zone's outline (here down the end edge, just below the figures).
    const off = Math.min(Math.abs(spot.x - hit.l), Math.abs(spot.x - hit.r), Math.abs(spot.y - hit.t), Math.abs(spot.y - hit.b));
    expect(off).toBeLessThanOrEqual(1);
    expect(spot).toEqual({ x: 381, y: 236 });
  });

  it('is never cut by the edge of the mock (zone along the top and the end)', () => {
    const hit = box(280, 0, 120, 40);
    const spot = badgeSpot(hit, { ...room, text: [box(300, 10, 90, 18)] });
    expect(spot.x - 12).toBeGreaterThanOrEqual(0);
    expect(spot.x + 12).toBeLessThanOrEqual(400);
    expect(spot.y - 12).toBeGreaterThanOrEqual(0);
    expect(overlap(badge(spot), box(300, 10, 90, 18))).toBe(false);
  });

  it('keeps off a neighbouring zone when the outline allows it', () => {
    // A zone right above: its target would take the corner badge.
    const hit = box(100, 100, 120, 60);
    const above = box(100, 70, 140, 28);
    const spot = badgeSpot(hit, { ...room, others: [above] });
    expect(overlap(badge(spot), above)).toBe(false);
  });

  it('covers as little text as it can when every spot covers some', () => {
    const hit = box(100, 100, 40, 30);
    const wall = box(0, 0, 400, 300);
    const spot = badgeSpot(hit, { ...room, text: [wall] });
    expect(spot.x - 12).toBeGreaterThanOrEqual(0);
    expect(spot.y - 12).toBeGreaterThanOrEqual(0);
  });
});
