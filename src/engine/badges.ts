import { streak, type ProgressState } from './progress';
import type { Exercise } from './types';

export interface BadgeContext {
  exercises: Exercise[];
  moduleIds: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  earned: (s: ProgressState, ctx: BadgeContext) => boolean;
}

const correctWhere = (s: ProgressState, ctx: BadgeContext, pred: (e: Exercise) => boolean) =>
  ctx.exercises.filter((e) => pred(e) && (s.items[e.id]?.correct ?? 0) > 0).length;

export const BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'Première épreuve',
    description: 'Répondre à une première épreuve.',
    earned: (s) => Object.keys(s.items).length > 0,
  },
  {
    id: 'streak-3',
    title: 'Trois jours d’affilée',
    description: 'S’entraîner trois jours de suite.',
    earned: (s) => streak(s).best >= 3,
  },
  {
    id: 'streak-7',
    title: 'Une semaine pleine',
    description: 'S’entraîner sept jours de suite.',
    earned: (s) => streak(s).best >= 7,
  },
  {
    id: 'sharp-eye',
    title: 'Œil de correcteur',
    description: 'Réussir 10 chasses aux erreurs.',
    earned: (s, c) => correctWhere(s, c, (e) => e.type === 'hotspot') >= 10,
  },
  {
    id: 'calibrated',
    title: 'Œil calibré',
    description: 'Réussir 8 épreuves de calibrage.',
    earned: (s, c) => correctWhere(s, c, (e) => e.type === 'slider') >= 8,
  },
  {
    id: 'wordsmith',
    title: 'Plume juste',
    description: 'Réussir 12 épreuves de rédaction UX.',
    earned: (s, c) => correctWhere(s, c, (e) => e.module === 'ux-writing') >= 12,
  },
  {
    id: 'globetrotter',
    title: 'Globe-trotter',
    description: 'Réussir 20 épreuves interculturelles.',
    earned: (s, c) => correctWhere(s, c, (e) => Boolean(e.culture) || e.module === 'culture') >= 20,
  },
  {
    id: 'slop-hunter',
    title: 'Chasseur de clichés',
    description: 'Réussir toutes les épreuves du module Anti-patterns.',
    earned: (s, c) => {
      const pool = c.exercises.filter((e) => e.module === 'antipatterns');
      return pool.length > 0 && pool.every((e) => (s.items[e.id]?.correct ?? 0) > 0);
    },
  },
  {
    id: 'flawless',
    title: 'Sans faute',
    description: 'Terminer une session de 10 épreuves ou plus sans erreur.',
    earned: (s) => s.sessions.some((r) => r.total >= 10 && r.correct === r.total),
  },
  {
    id: 'exam',
    title: 'Examen réussi',
    description: 'Obtenir au moins 80 % à l’examen.',
    earned: (s) => s.sessions.some((r) => r.kind === 'exam' && r.total > 0 && r.correct / r.total >= 0.8),
  },
  {
    id: 'reader',
    title: 'Lecture complète',
    description: 'Lire toutes les leçons.',
    earned: (s, c) => c.moduleIds.length > 0 && c.moduleIds.every((id) => s.lessons[id]),
  },
  {
    id: 'cards-50',
    title: 'Mémoire longue',
    description: 'Programmer 50 fiches de révision.',
    earned: (s) => Object.keys(s.cards).length >= 50,
  },
];

/** Badges earned now but not yet recorded. */
export function newBadges(s: ProgressState, ctx: BadgeContext): Badge[] {
  return BADGES.filter((b) => !s.badges[b.id] && b.earned(s, ctx));
}
