/**
 * The light index of the content, derived from the full lessons. The build writes it once
 * (scripts/vite-plugins.mjs evaluates src/content/all.ts), so the app knows every lesson,
 * exercise and flashcard without downloading them, and fetches a lesson only when it is opened.
 */
import { isDuel, type ExerciseSummary } from '../engine/session';
import type { KeyRule, ModuleContent, TrueFalseExercise } from '../engine/types';
import { MODULE_ORDER, themeOf, type ThemeId } from './order';

/** A lesson as the light index lists it: what menus, counts and badges need, without its text and mocks. */
export interface ModuleSummary {
  id: string;
  title: string;
  /** Its theme (src/content/order.ts); a lesson left out of every theme falls under the last one. */
  theme: ThemeId;
  summary: string;
  minutes: number;
  commands?: string[];
  /** Ids of its key rules (its flashcards), in order. */
  rules: string[];
}

/** An exercise as the light index lists it. A true/false statement also gives its answer, to draw both evenly. */
export interface ExerciseEntry extends ExerciseSummary {
  module: string;
  answer?: boolean;
}

export interface ContentIndex {
  modules: ModuleSummary[];
  exercises: ExerciseEntry[];
}

/** A key rule of a lesson: one flashcard. */
export interface RuleCard {
  key: string;
  moduleId: string;
  rule: KeyRule;
}

/** `./modules/typography.ts` → `typography`: the app fetches a lesson by its id, so the id names the file. */
export const fileId = (path: string): string => path.replace(/^.*\//, '').replace(/\.ts$/, '');

/**
 * The lessons of `src/content/modules`, in curriculum order (modules missing from MODULE_ORDER
 * last, by id), each exercise naming its module.
 */
export function modulesFromFiles(files: Record<string, { default?: ModuleContent }>): ModuleContent[] {
  const list: ModuleContent[] = [];
  for (const [path, file] of Object.entries(files)) {
    const m = file.default;
    if (!m?.id) continue;
    if (m.id !== fileId(path)) throw new Error(`${path} : l’id « ${m.id} » doit être le nom du fichier (« ${fileId(path)} »).`);
    list.push(withModuleIds(m));
  }
  const rank = (id: string) => (MODULE_ORDER.includes(id) ? MODULE_ORDER.indexOf(id) : 999);
  return list.sort((a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id));
}

/** Each exercise names its module: the registry sets it, authors do not. */
export function withModuleIds(m: ModuleContent): ModuleContent {
  return { ...m, exercises: m.exercises.map((e) => ({ ...e, module: m.id })) };
}

export function contentIndex(modules: ModuleContent[]): ContentIndex {
  return {
    modules: modules.map((m) => ({
      id: m.id,
      title: m.title,
      theme: themeOf(m.id)?.id ?? 'cultures',
      summary: m.summary,
      minutes: m.minutes,
      ...(m.commands ? { commands: m.commands } : {}),
      rules: m.rules.map((r) => r.id),
    })),
    exercises: modules.flatMap((m) =>
      m.exercises.map((e) => ({
        id: e.id,
        module: m.id,
        type: e.type,
        difficulty: e.difficulty,
        ...(e.culture ? { culture: e.culture } : {}),
        duel: isDuel(e),
        ...(e.type === 'truefalse' ? { answer: e.answer } : {}),
      })),
    ),
  };
}

/** Every flashcard with its text, for a review across all lessons (one small chunk instead of every lesson). */
export function ruleCards(modules: ModuleContent[]): RuleCard[] {
  return modules.flatMap((m) => m.rules.map((rule) => ({ key: `${m.id}/${rule.id}`, moduleId: m.id, rule })));
}

/** Every true/false statement, for the timed challenge. */
export function statements(modules: ModuleContent[]): TrueFalseExercise[] {
  return modules.flatMap((m) => m.exercises.filter((e): e is TrueFalseExercise => e.type === 'truefalse').map((e) => ({ ...e, module: m.id })));
}
