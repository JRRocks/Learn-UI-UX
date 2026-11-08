/**
 * The curriculum: the lessons grouped into major themes, in the order they are taught. A theme is
 * what the learner chooses to be evaluated on (`/session?mode=evaluation&id=<theme>`); a lesson
 * belongs to exactly one of them (checked by src/content/index.test.ts).
 */
export type ThemeId = 'fondamentaux' | 'psychologie' | 'visuel' | 'parcours' | 'supports' | 'accessibilite' | 'methode' | 'cultures';

export interface Theme {
  id: ThemeId;
  title: string;
  description: string;
  /** Its lessons, by id, in curriculum order. */
  modules: string[];
}

export const THEMES: Theme[] = [
  {
    id: 'fondamentaux',
    title: 'Les fondamentaux',
    description: 'Les quatre modes de visite, le plancher de qualité et les clichés à refuser.',
    modules: ['modes', 'craft-floor', 'antipatterns'],
  },
  {
    id: 'psychologie',
    title: 'Psychologie et éthique',
    description: 'Comment les gens perçoivent, retiennent et décident — et comment ne pas en abuser.',
    modules: ['laws', 'cognitive-load', 'dark-patterns'],
  },
  {
    id: 'visuel',
    title: 'Design visuel',
    description: 'Typographie, couleur, espace, mouvement, intensité et personnalité.',
    modules: ['typography', 'color', 'layout', 'motion', 'intensity', 'delight'],
  },
  {
    id: 'parcours',
    title: 'Parcours et contenus',
    description: 'États, premier usage, cas limites et rédaction : ce qui fait qu’un parcours tient debout.',
    modules: ['polish', 'onboarding', 'harden', 'ux-writing'],
  },
  {
    id: 'supports',
    title: 'Écrans et plateformes',
    description: 'Du bureau au téléphone, iOS et Android, et la vitesse ressentie.',
    modules: ['responsive', 'platforms', 'performance'],
  },
  {
    id: 'accessibilite',
    title: 'Accessibilité et RGAA',
    description: 'Les critères des WCAG 2.2, le référentiel français (RGAA) et l’audit de conformité.',
    modules: ['accessibility', 'rgaa-cadre', 'rgaa-criteres'],
  },
  {
    id: 'methode',
    title: 'Méthode : cadrer et évaluer',
    description: 'Cadrer un projet, en faire un système, puis le critiquer avec des heuristiques et des personas.',
    modules: ['process', 'heuristics', 'personas'],
  },
  {
    id: 'cultures',
    title: 'Cultures',
    description: 'Adapter une interface à un marché, au-delà de la traduction.',
    modules: ['culture'],
  },
];

export const THEME_BY_ID = new Map(THEMES.map((t) => [t.id, t]));

/** Curriculum order: the themes' lessons one after the other. Modules found on disk but missing here come last. */
export const MODULE_ORDER = THEMES.flatMap((t) => t.modules);

/** The theme of a lesson. */
export function themeOf(moduleId: string): Theme | undefined {
  return THEMES.find((t) => t.modules.includes(moduleId));
}
