import { describe, expect, it } from 'vitest';
import { pauseClock, remaining, resumeClock, secondsLeft, startClock } from './blitzClock';

describe('timed challenge clock', () => {
  it('counts every fraction of a second, even on quick answers (logic-11)', () => {
    let now = 0;
    let c = startClock(90_000, now);
    // 20 answers at 0.8 s each, the correction read for 3 s in between.
    for (let i = 0; i < 20; i++) {
      now += 800;
      c = pauseClock(c, now);
      now += 3000;
      c = resumeClock(c, now);
    }
    expect(remaining(c, now)).toBe(74_000);
    expect(secondsLeft(c, now)).toBe(74);
  });

  it('stands still while the correction is on screen', () => {
    const c = pauseClock(startClock(90_000, 1000), 31_000);
    expect(remaining(c, 31_000)).toBe(60_000);
    expect(remaining(c, 500_000)).toBe(60_000);
    expect(pauseClock(c, 600_000)).toBe(c);
  });

  it('shows whole seconds and stops at zero', () => {
    const c = startClock(90_000, 0);
    expect(secondsLeft(c, 800)).toBe(90);
    expect(secondsLeft(c, 1000)).toBe(89);
    expect(secondsLeft(c, 95_000)).toBe(0);
    expect(remaining(c, 95_000)).toBe(0);
  });
});
