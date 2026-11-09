import { describe, expect, it } from 'vitest';
import { cardsState } from './Practice';

describe('« Fiches » state when no card is due (home page and S’entraîner)', () => {
  it('announces the new cards the link opens', () => {
    expect(cardsState(317)).toBe('317\u00A0à découvrir');
    expect(cardsState(1)).toBe('1\u00A0à découvrir');
  });

  it('says the cards are up to date only when every card waits for its date', () => {
    expect(cardsState(0)).toBe('À jour');
  });
});
