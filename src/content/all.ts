/**
 * Every lesson at once, for the build and the tests only: the app downloads one lesson at a time
 * (src/content/index.ts). The build evaluates this file to write the light index and the
 * flashcards and statements chunks (scripts/vite-plugins.mjs); never import it from the app.
 */
import type { ModuleContent } from '../engine/types';
import { contentIndex, modulesFromFiles, ruleCards, statements } from './derive';

const files = import.meta.glob<{ default: ModuleContent }>('./modules/*.ts', { eager: true });

export const ALL_MODULES: ModuleContent[] = modulesFromFiles(files);

/** What the build serves as `virtual:content/<key>` (scripts/vite-plugins.mjs). */
export const GENERATED = {
  index: contentIndex(ALL_MODULES),
  rules: ruleCards(ALL_MODULES),
  statements: statements(ALL_MODULES),
};
