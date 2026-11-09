import type { Exercise } from '../../engine/types';
import type { Draft } from './players';

/**
 * What the learner has given so far, for the formats where « Vérifier » waits for several answers
 * (every criterion of a grid, every pair of a match): shown next to the disabled button, like the
 * « 0 / 2 zones » of the hotspot. Null for the other formats.
 */
export function completionHint(ex: Exercise, d: Draft): string | null {
  if (ex.type === 'grid' && d.type === 'grid') {
    const done = ex.criteria.filter((c) => d.scores[c.id] !== undefined).length;
    return `${done} / ${ex.criteria.length} critères notés`;
  }
  if (ex.type === 'match' && d.type === 'match') {
    const done = ex.pairs.filter((p) => d.pairs[p.id]).length;
    return `${done} / ${ex.pairs.length} associations faites`;
  }
  return null;
}
