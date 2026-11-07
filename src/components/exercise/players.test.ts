import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { TrueFalseExercise } from '../../engine/types';
import { TrueFalsePlayer, optionState } from './players';

describe('single-answer tiles after validation (design-final-3)', () => {
  it('before validation, only says which tile is chosen', () => {
    expect(optionState(true, true, false)).toBe('selected');
    expect(optionState(true, false, false)).toBe('selected');
    expect(optionState(false, true, false)).toBe('idle');
    expect(optionState(false, false, false)).toBe('idle');
  });

  it('marks the recommended answer, chosen or not', () => {
    expect(optionState(true, true, true)).toBe('right');
    expect(optionState(false, true, true)).toBe('right');
  });

  it('keeps a wrong choice apart from the answer nobody picked (the Défi chrono dimmed both)', () => {
    expect(optionState(true, false, true)).toBe('wrong');
    expect(optionState(false, false, true)).toBe('dim');
  });

  const ex: TrueFalseExercise = {
    id: 'tf-demo',
    type: 'truefalse',
    difficulty: 1,
    prompt: 'Un exemple.',
    answer: false,
    explanation: 'Parce que.',
    takeaway: 'À retenir.',
  };
  const render = (value: boolean | null, revealed: boolean) =>
    renderToStaticMarkup(
      createElement(TrueFalsePlayer, { ex, draft: { type: 'truefalse', value }, setDraft: () => {}, revealed, order: [], labelledBy: 'p' }),
    );

  it('says « Ton choix » and « Recommandé » in the Vrai ou faux tiles, not with their colors alone', () => {
    const html = render(true, true);
    expect(html).toMatch(/data-state="wrong".*Vrai.*Ton choix/);
    expect(html).toMatch(/data-state="right".*Faux.*Recommandé/);
    // A check and a cross drawn beside the words.
    expect(html.match(/<svg/g)).toHaveLength(2);
  });

  it('shows no badge before validation, nor on a tile left aside', () => {
    expect(render(true, false)).not.toContain('option-badge');
    const right = render(false, true);
    expect(right).toContain('Recommandé');
    expect(right).not.toContain('Ton choix');
  });
});
