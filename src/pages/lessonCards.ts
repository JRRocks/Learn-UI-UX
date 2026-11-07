import type { CardState } from '../engine/srs';

export interface LessonCards {
  /** The cards a review of the lesson shows today: those due, then those never reviewed (Cards.tsx). */
  toReview: number;
  /** When none is left: the day the first one comes back. */
  next?: string;
}

/** What « Réviser » can promise for a lesson whose flashcards are `keys` (`module/rule`). */
export function lessonCards(cards: Record<string, CardState>, keys: readonly string[], today: string): LessonCards {
  const toReview = keys.filter((k) => !cards[k] || cards[k].due <= today).length;
  if (toReview > 0) return { toReview };
  const next = keys
    .map((k) => cards[k]?.due)
    .filter((d): d is string => Boolean(d))
    .sort()[0];
  return next ? { toReview, next } : { toReview };
}
