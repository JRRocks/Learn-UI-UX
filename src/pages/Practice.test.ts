import { describe, expect, it } from 'vitest';
import { cardsHint } from './Practice';

describe('« Fiches » legend (home page and S’entraîner)', () => {
  it('names the cards due today first', () => {
    expect(cardsHint(3, 300, 317)).toBe('Fiches à réviser aujourd’hui');
  });

  it('announces the new cards the link opens when none is due', () => {
    expect(cardsHint(0, 317, 317)).toBe('317 règles d’or à découvrir');
    expect(cardsHint(0, 306, 317)).toBe('Rien à réviser · 306 règles d’or à découvrir');
    expect(cardsHint(0, 1, 317)).toBe('Rien à réviser · 1 règle d’or à découvrir');
  });

  it('says there is nothing to review only when every card waits for its date', () => {
    expect(cardsHint(0, 0, 317)).toBe('Rien à réviser aujourd’hui');
  });
});
