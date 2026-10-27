import type { Exercise, KeyRule, ModuleCategory, ModuleContent } from '../engine/types';

/** Curriculum order. Modules found on disk but missing here are appended at the end. */
export const MODULE_ORDER = [
  'modes',
  'craft-floor',
  'antipatterns',
  'laws',
  'cognitive-load',
  'dark-patterns',
  'typography',
  'color',
  'layout',
  'motion',
  'delight',
  'polish',
  'intensity',
  'harden',
  'onboarding',
  'ux-writing',
  'responsive',
  'platforms',
  'performance',
  'heuristics',
  'personas',
  'accessibility',
  'process',
  'culture',
];

export const CATEGORIES: { id: ModuleCategory; title: string; description: string }[] = [
  { id: 'fondations', title: 'Fondations', description: 'Les modes de visite, le plancher de qualité et les clichés à refuser.' },
  { id: 'psychologie', title: 'Psychologie et éthique', description: 'Comment les gens perçoivent, retiennent et décident — et comment ne pas en abuser.' },
  { id: 'enrichir', title: 'Enrichir', description: 'Typographie, couleur, espace, mouvement et personnalité.' },
  { id: 'affiner', title: 'Affiner', description: 'États, finition, dosage de l’intensité, robustesse et premier usage.' },
  { id: 'corriger', title: 'Corriger', description: 'Rédaction UX, adaptation aux écrans et plateformes, performance.' },
  { id: 'evaluer', title: 'Évaluer', description: 'Heuristiques, personas de test, accessibilité et audit.' },
  { id: 'construire', title: 'Construire', description: 'Cadrer un projet et en faire un système.' },
  { id: 'culture', title: 'Cultures', description: 'Adapter une interface à un marché, au-delà de la traduction.' },
];

const files = import.meta.glob<{ default: ModuleContent }>('./modules/*.ts', { eager: true });

const loaded = Object.values(files)
  .map((f) => f.default)
  .filter((m): m is ModuleContent => Boolean(m && m.id));

export const MODULES: ModuleContent[] = loaded.sort((a, b) => {
  const ia = MODULE_ORDER.indexOf(a.id);
  const ib = MODULE_ORDER.indexOf(b.id);
  return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.id.localeCompare(b.id);
});

export const MODULE_BY_ID = new Map(MODULES.map((m) => [m.id, m]));

export const EXERCISES: Exercise[] = MODULES.flatMap((m) => m.exercises.map((e) => ({ ...e, module: m.id })));

export const EXERCISE_BY_ID = new Map(EXERCISES.map((e) => [e.id, e]));

export interface RuleCard {
  key: string;
  moduleId: string;
  rule: KeyRule;
}

export const RULE_CARDS: RuleCard[] = MODULES.flatMap((m) =>
  m.rules.map((rule) => ({ key: `${m.id}/${rule.id}`, moduleId: m.id, rule })),
);

export const RULE_CARD_BY_KEY = new Map(RULE_CARDS.map((c) => [c.key, c]));

export function exercisesOf(moduleId: string): Exercise[] {
  return EXERCISES.filter((e) => e.module === moduleId);
}
