import { describe, expect, it } from 'vitest';
import type { Exercise } from '../../engine/types';
import { completionHint } from './completion';

const base = { difficulty: 1 as const, prompt: 'q', explanation: 'e', takeaway: 't' };
const visual = { html: '<p>x</p>', alt: 'x' };

const grid: Exercise = {
  ...base,
  id: 'm-grid',
  type: 'grid',
  visual,
  scale: { min: 0, max: 4, labels: ['0', '1', '2', '3', '4'] },
  criteria: ['a', 'b', 'c'].map((id) => ({ id, label: id, expert: 2, why: 'w' })),
};

const match: Exercise = {
  ...base,
  id: 'm-match',
  type: 'match',
  leftTitle: 'L',
  rightTitle: 'R',
  pairs: ['a', 'b', 'c', 'd'].map((id) => ({ id, left: id, right: id.toUpperCase() })),
};

describe('completionHint (state-2: what « Valider » still waits for)', () => {
  it('counts the rated criteria of a grid, 0 included', () => {
    expect(completionHint(grid, { type: 'grid', scores: {} })).toBe('0 / 3 critères notés');
    expect(completionHint(grid, { type: 'grid', scores: { a: 0, c: 4 } })).toBe('2 / 3 critères notés');
    expect(completionHint(grid, { type: 'grid', scores: { a: 1, b: 2, c: 3 } })).toBe('3 / 3 critères notés');
  });

  it('counts the chosen pairs of a match, an emptied select excluded', () => {
    expect(completionHint(match, { type: 'match', pairs: {} })).toBe('0 / 4 associations faites');
    expect(completionHint(match, { type: 'match', pairs: { a: 'b', b: '', c: 'c' } })).toBe('2 / 4 associations faites');
  });

  it('says nothing for the formats with a single answer', () => {
    const choice: Exercise = { ...base, id: 'm-choice', type: 'choice', options: [{ id: 'a', label: 'A' }], answer: 'a' };
    expect(completionHint(choice, { type: 'choice', optionId: null })).toBeNull();
  });
});
