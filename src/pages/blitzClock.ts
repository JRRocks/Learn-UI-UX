/**
 * Countdown of the timed challenge. It runs while a statement waits for an answer and stops while
 * the correction is read. Time is measured against a deadline, not counted in ticks: a fraction
 * of a second spent on a statement is never lost (logic-11). Times are in ms (`performance.now()`).
 */
export interface Clock {
  /** Time left, as of `since` when running, or exactly when paused. */
  left: number;
  /** When the clock last started running; `null` while paused. */
  since: number | null;
}

export const startClock = (ms: number, now: number): Clock => ({ left: ms, since: now });

export function remaining(c: Clock, now: number): number {
  return Math.max(0, c.since === null ? c.left : c.left - (now - c.since));
}

export const pauseClock = (c: Clock, now: number): Clock => (c.since === null ? c : { left: remaining(c, now), since: null });

export const resumeClock = (c: Clock, now: number): Clock => (c.since === null ? { left: c.left, since: now } : c);

/** Whole seconds on the display: 89.2 s left still reads 1:30. */
export const secondsLeft = (c: Clock, now: number): number => Math.ceil(remaining(c, now) / 1000);
