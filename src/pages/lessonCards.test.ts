import { describe, expect, it } from 'vitest';
import type { CardState } from '../engine/srs';
import { lessonCards } from './lessonCards';

const today = '2026-11-07';
const card = (due: string): CardState => ({ ease: 2.5, interval: 1, reps: 1, due });
const keys = ['personas/a', 'personas/b', 'personas/c'];

describe('lessonCards (count-promise-1, rejeu-count-promise-1-b-mobile)', () => {
  it('offers every card of a lesson never reviewed', () => {
    expect(lessonCards({}, keys, today)).toEqual({ toReview: 3 });
  });

  it('counts the cards due today or before, and the new ones, as the review shows them', () => {
    const cards = { 'personas/a': card('2026-11-06'), 'personas/b': card(today), 'personas/c': card('2026-11-08') };
    expect(lessonCards(cards, keys, today)).toEqual({ toReview: 2 });
    // A partial review: the reviewed cards are no longer promised.
    expect(lessonCards({ 'personas/a': card('2026-11-08') }, keys, today)).toEqual({ toReview: 2 });
  });

  it('promises no review once every card is up to date, and names the day the first one comes back', () => {
    const cards = { 'personas/a': card('2026-11-12'), 'personas/b': card('2026-11-08'), 'personas/c': card('2026-11-20') };
    expect(lessonCards(cards, keys, today)).toEqual({ toReview: 0, next: '2026-11-08' });
  });

  it('ignores the cards of other lessons', () => {
    const cards = { 'personas/a': card('2026-11-09'), 'personas/b': card('2026-11-09'), 'personas/c': card('2026-11-09'), 'modes/a': card('2026-11-01') };
    expect(lessonCards(cards, keys, today)).toEqual({ toReview: 0, next: '2026-11-09' });
  });

  it('has nothing to say for a lesson without cards', () => {
    expect(lessonCards({ 'modes/a': card(today) }, [], today)).toEqual({ toReview: 0 });
  });
});
