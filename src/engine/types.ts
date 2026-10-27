/**
 * Content contract for the training engine.
 *
 * Everything the app teaches is plain data typed against these interfaces:
 * lessons (modules), flashcard rules, exercises, cultures. Text fields accept
 * a small Markdown subset (see `src/lib/markdown.tsx`): paragraphs, `- ` lists,
 * `1. ` lists, `### ` headings, `> ` quotes, **bold**, *italic*, `code`, [links](url).
 */

export type Difficulty = 1 | 2 | 3;

/** A rendered mini-interface, displayed inside an isolated Shadow DOM. */
export interface Visual {
  /** Markup of the mock. Elements with `data-hotspot="id"` become clickable in hotspot exercises. */
  html: string;
  /** CSS scoped to this mock only. The mock kit (`.mk-*` classes) is always available. */
  css?: string;
  /** Optional device chrome drawn around the mock. */
  frame?: 'none' | 'phone' | 'browser';
  /** Minimum height of the mock area, in px. */
  height?: number;
  /** Text alternative describing what the mock shows (read by screen readers). */
  alt: string;
  dir?: 'ltr' | 'rtl';
  lang?: string;
}

export interface SourceRef {
  label: string;
  url?: string;
}

/** A source reference can be a key of `SOURCES` (src/content/sources.ts) or an inline reference. */
export type Source = string | SourceRef;

export type ExerciseType =
  | 'choice'
  | 'multi'
  | 'truefalse'
  | 'hotspot'
  | 'order'
  | 'match'
  | 'slider'
  | 'grid';

interface ExerciseBase {
  /** Globally unique, kebab-case, prefixed by the module id: `typography-measure-duel`. */
  id: string;
  /** Module id the exercise belongs to (set automatically by the registry). */
  module?: string;
  difficulty: Difficulty;
  /** The question, short and direct. */
  prompt: string;
  /** Optional brief or scenario shown above the question. */
  context?: string;
  /** Optional visual shown with the question (required for hotspot and slider). */
  visual?: Visual;
  /** "Pourquoi" — the full explanation revealed after answering. */
  explanation: string;
  /** "À retenir" — the rule in one sentence. */
  takeaway: string;
  sources?: Source[];
  tags?: string[];
  /** Culture profile id when the exercise is about a market (`cn`, `jp`, `fr`…). */
  culture?: string;
}

export interface ChoiceOption {
  id: string;
  /** Text of the option, or the neutral caption of a visual option (must not give the answer away). */
  label?: string;
  visual?: Visual;
  /** Feedback shown for this option after answering. */
  why?: string;
}

/** Single answer among 2–6 options (text or visuals). A duel is a choice with two visual options. */
export interface ChoiceExercise extends ExerciseBase {
  type: 'choice';
  options: ChoiceOption[];
  /** Id of the recommended option. */
  answer: string;
  /** Keep the authored order instead of shuffling (for scales, sequences…). */
  fixedOrder?: boolean;
}

/** Several correct answers among the options ("coche tout ce qui s'applique"). */
export interface MultiExercise extends ExerciseBase {
  type: 'multi';
  options: ChoiceOption[];
  answers: string[];
  fixedOrder?: boolean;
}

/** The prompt is a statement; the learner says if it is true. */
export interface TrueFalseExercise extends ExerciseBase {
  type: 'truefalse';
  answer: boolean;
}

export interface Hotspot {
  /** Matches a `data-hotspot` attribute in the visual. */
  id: string;
  /** Short name of the zone, revealed after answering. */
  label: string;
  /** True when this zone is one of the problems to find. */
  correct: boolean;
  why: string;
}

/** Click the problem(s) in the visual. The learner picks as many zones as there are correct ones. */
export interface HotspotExercise extends ExerciseBase {
  type: 'hotspot';
  visual: Visual;
  hotspots: Hotspot[];
}

/** Put the items in order. Items are authored in the CORRECT order and shuffled on display. */
export interface OrderExercise extends ExerciseBase {
  type: 'order';
  items: { id: string; label: string }[];
}

/** Pair each left item with its right item. Rights are shuffled on display. */
export interface MatchExercise extends ExerciseBase {
  type: 'match';
  leftTitle: string;
  rightTitle: string;
  pairs: { id: string; left: string; right: string }[];
}

/**
 * Calibrate a value with a live preview. The slider writes `--v` (value + unit)
 * on the mock host, so the visual's CSS can use `var(--v)`. `--n` holds the raw number.
 */
export interface SliderExercise extends ExerciseBase {
  type: 'slider';
  visual: Visual;
  min: number;
  max: number;
  step: number;
  initial: number;
  /** Unit appended to the value for `--v` and for display (`px`, `ms`, `ch`, `rem`, ''). */
  unit: string;
  /** Inclusive accepted range. */
  target: [number, number];
  /** The value an expert would pick, shown in the feedback. */
  ideal: number;
  /** Label of the slider control (`Interlignage`, `Durée`…). */
  control: string;
  /**
   * Extra live readout. `contrast`: the slider value is the HSL lightness (0–100, unit `%`)
   * of a neutral gray text, e.g. `color: hsl(0 0% var(--v))`; the WCAG ratio against
   * `background` (hex) is shown live.
   */
  readout?: { kind: 'contrast'; background: string };
  /** Animated previews get a "Rejouer" button that remounts the mock. */
  replayable?: boolean;
}

export interface GridCriterion {
  id: string;
  label: string;
  /** Expert score on the scale. */
  expert: number;
  why: string;
}

/** Score a screen on several criteria (e.g. Nielsen's 10 heuristics, 0–4) and compare with an expert. */
export interface GridExercise extends ExerciseBase {
  type: 'grid';
  visual: Visual;
  scale: { min: number; max: number; labels: string[] };
  criteria: GridCriterion[];
  /** Max distance from the expert score that still counts as agreement (default 1). */
  tolerance?: number;
}

export type Exercise =
  | ChoiceExercise
  | MultiExercise
  | TrueFalseExercise
  | HotspotExercise
  | OrderExercise
  | MatchExercise
  | SliderExercise
  | GridExercise;

/* ---------- Lessons ---------- */

/** A do/don't pair shown inside a lesson section. */
export interface LessonExample {
  title: string;
  bad?: Visual;
  badNote?: string;
  good?: Visual;
  goodNote?: string;
}

export interface LessonSection {
  /** Anchor id, kebab-case, unique within the module. */
  id: string;
  title: string;
  body: string;
  examples?: LessonExample[];
}

/** A key rule; doubles as a flashcard (front = question, back = answer). */
export interface KeyRule {
  id: string;
  front: string;
  back: string;
}

export type ModuleCategory =
  | 'fondations'
  | 'evaluer'
  | 'affiner'
  | 'enrichir'
  | 'corriger'
  | 'construire'
  | 'psychologie'
  | 'culture';

export interface ModuleContent {
  /** kebab-case id, also used in URLs. */
  id: string;
  title: string;
  category: ModuleCategory;
  /** One or two sentences: what the learner will be able to do. */
  summary: string;
  /** Estimated reading time in minutes. */
  minutes: number;
  /** impeccable commands this module covers (`typeset`, `colorize`…). */
  commands?: string[];
  sources: Source[];
  sections: LessonSection[];
  rules: KeyRule[];
  exercises: Exercise[];
}

/* ---------- Cultures ---------- */

export type HofstedeKey = 'pdi' | 'idv' | 'mas' | 'uai' | 'lto' | 'ivr';

export type ConventionTopic =
  | 'densite'
  | 'couleur'
  | 'typo'
  | 'navigation'
  | 'formulaires'
  | 'paiement'
  | 'confiance'
  | 'ton'
  | 'legal'
  | 'formats'
  | 'mobile';

export interface Convention {
  topic: ConventionTopic;
  title: string;
  body: string;
}

export interface CultureProfile {
  id: string;
  name: string;
  region: string;
  /** BCP 47 locale used by the localisation lab (`zh-CN`, `ar-SA`…). */
  locale: string;
  dir: 'ltr' | 'rtl';
  /** One-paragraph portrait of the market's interface expectations. */
  summary: string;
  /** Edward T. Hall's communication context. */
  context: 'faible' | 'moyen' | 'fort';
  /** Hofstede scores (classic 2010 edition), when published for the country. */
  hofstede?: Record<HofstedeKey, number>;
  /** Apps and services that shape local expectations. */
  ecosystem: string[];
  conventions: Convention[];
  adapt: { do: string[]; dont: string[] };
  /** Typical formats, displayed as examples. */
  formats: { label: string; value: string }[];
  /** Representative mock of a local interface. */
  visual?: Visual;
  sources: Source[];
}

/* ---------- Anti-pattern catalog ---------- */

export interface AntipatternEntry {
  /** Rule id from impeccable's detector registry (`side-tab`, `gray-on-color`…). */
  id: string;
  /** French name. */
  name: string;
  /** `cliche` = generated-UI tell ("slop"), `qualite` = quality defect. */
  family: 'cliche' | 'qualite';
  /** impeccable severity: `erreur`, `avertissement` (warning, default) or `conseil` (advisory). */
  severity: 'erreur' | 'avertissement' | 'conseil';
  /** What it is and why it hurts, in French. */
  description: string;
  /** What to do instead. */
  fix: string;
  /** Optional visual demonstration. */
  demo?: { bad: Visual; good?: Visual };
}

/** The same component designed for two markets, side by side. */
export interface CulturePair {
  id: string;
  title: string;
  a: string;
  b: string;
  visualA: Visual;
  visualB: Visual;
  notes: string;
}
