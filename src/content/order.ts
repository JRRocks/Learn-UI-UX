import type { ModuleCategory } from '../engine/types';

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
