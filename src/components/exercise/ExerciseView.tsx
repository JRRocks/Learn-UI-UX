import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { grade, type GradeResult } from '../../engine/grade';
import { seeded, shuffle, shuffleAway, type Rng } from '../../engine/random';
import type { Exercise } from '../../engine/types';
import { Md, MdInline } from '../../lib/markdown';
import { Mock } from '../Mock';
import { completionHint } from './completion';
import { Feedback } from './Feedback';
import { SETTLE_MS, digitOf, eventOrigin, handlesOwnKeys, hasModifier, isTextEntry, within } from './keys';
import {
  ChoicePlayer,
  GridPlayer,
  HotspotPlayer,
  MatchPlayer,
  MultiPlayer,
  OrderPlayer,
  SliderPlayer,
  TrueFalsePlayer,
  initialDraft,
  isComplete,
  toAnswer,
  type Draft,
} from './players';

export const TYPE_LABEL: Record<Exercise['type'] | 'duel', string> = {
  duel: 'Comparaison visuelle',
  choice: 'Le bon choix',
  multi: 'Tout ce qui s’applique',
  truefalse: 'Vrai ou faux',
  hotspot: 'Chasse aux erreurs',
  order: 'Mise en ordre',
  match: 'Associations',
  slider: 'Calibrage',
  grid: 'Grille de critique',
};

function displayOrder(ex: Exercise, rng: Rng): string[] {
  switch (ex.type) {
    case 'choice':
    case 'multi':
      return ex.fixedOrder ? ex.options.map((o) => o.id) : shuffle(ex.options.map((o) => o.id), rng);
    case 'order':
      return shuffleAway(ex.items.map((i) => i.id), rng);
    case 'match':
      return shuffle(ex.pairs.map((p) => p.id), rng);
    default:
      return [];
  }
}

/** Height of the sticky bars that cover the top and the bottom of the page during a session. */
function coveredEdges(article: HTMLElement | null): { top: number; bottom: number } {
  const top = document.querySelector('.player-top')?.getBoundingClientRect().bottom ?? 0;
  const bar = article?.querySelector('.task-actions')?.getBoundingClientRect();
  const bottom = bar && bar.top < window.innerHeight ? window.innerHeight - bar.top : 0;
  return { top: Math.max(0, top), bottom: Math.max(0, bottom) };
}

/** Scroll `target` just below the top bar, unless it is already wholly visible between the bars. */
export function keepInView(target: HTMLElement, article: HTMLElement | null) {
  const r = target.getBoundingClientRect();
  const edges = coveredEdges(article);
  if (r.top >= edges.top && r.bottom <= window.innerHeight - edges.bottom) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: window.scrollY + r.top - edges.top - 12, behavior: reduce ? 'auto' : 'smooth' });
}

interface Props {
  ex: Exercise;
  /** `exam` hides the correction until the end of the session. */
  mode: 'practice' | 'exam';
  /** Seed of the option order, so that the same run always shows the same order. */
  seed?: number;
  /** An answer given earlier (back from a lesson, a reload): the exercise opens on its correction. */
  answered?: { result: GradeResult; draft: Draft; xp?: number };
  /** Called once when the learner validates; returns the XP earned (shown in the feedback). */
  onAnswered: (result: GradeResult, draft: Draft) => number | undefined;
  onNext: () => void;
  nextLabel: string;
  /** Where the exercise comes from (« leçon · type »), on a line above it: the top bar of a session has no room for it on phones. */
  about?: ReactNode;
}

export function ExerciseView({ ex, mode, seed, answered, onAnswered, onNext, nextLabel, about }: Props) {
  const order = useMemo(() => displayOrder(ex, seed === undefined ? Math.random : seeded(seed)), [ex, seed]);
  const [draft, setDraft] = useState<Draft>(() => answered?.draft ?? initialDraft(ex, order));
  const [result, setResult] = useState<GradeResult | null>(answered?.result ?? null);
  const [xp, setXp] = useState<number | undefined>(answered?.xp);
  const articleRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLElement>(null);
  const settledAt = useRef(0);
  const promptId = `prompt-${ex.id}`;
  const contextId = ex.context ? `context-${ex.id}` : undefined;
  const aboutId = about ? `about-${ex.id}` : undefined;
  const revealed = result !== null && mode === 'practice';
  const complete = isComplete(ex, draft);
  const remaining = revealed ? null : completionHint(ex, draft);

  const validate = () => {
    if (result || !complete) return;
    const r = grade(ex, toAnswer(draft));
    setResult(r);
    setXp(onAnswered(r, draft));
    if (mode === 'exam') onNext();
  };

  // A new exercise or a new correction on screen: Enter waits a moment before acting again.
  useEffect(() => {
    settledAt.current = performance.now();
  }, [revealed]);

  // Once validated, show where the correction starts (`data-reveal-view`): the scene and its marks
  // for a hotspot, the value against the expert's for a slider (motion-1), the first rated row for a
  // grid; otherwise the verdict. The focus goes to the correction for screen readers.
  useEffect(() => {
    if (!revealed) return;
    const el = feedbackRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    keepInView(articleRef.current?.querySelector<HTMLElement>('[data-reveal-view]') ?? el, articleRef.current);
  }, [revealed]);

  // Keyboard: Enter validates then continues; digits pick options and V/F answer, while the focus is in the exercise.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || hasModifier(e)) return;
      const origin = eventOrigin(e);
      if (e.key === 'Enter') {
        // Buttons, links and zones of a mock act by themselves; a held Enter never chains two steps.
        if (e.repeat || handlesOwnKeys(origin) || isTextEntry(origin)) return;
        e.preventDefault();
        if (performance.now() - settledAt.current < SETTLE_MS) return;
        if (revealed) onNext();
        else validate();
        return;
      }
      if (revealed || result || e.repeat || !within(e, articleRef.current) || isTextEntry(origin)) return;
      const n = digitOf(e);
      const key = e.key.toLowerCase();
      if (ex.type === 'truefalse') {
        if (key === 'v' || n === 1) setDraft({ type: 'truefalse', value: true });
        if (key === 'f' || n === 2) setDraft({ type: 'truefalse', value: false });
        return;
      }
      if (n !== null && n >= 1 && n <= order.length) {
        const id = order[n - 1];
        if (ex.type === 'choice') setDraft({ type: 'choice', optionId: id });
        if (ex.type === 'multi' && draft.type === 'multi')
          setDraft({ type: 'multi', optionIds: draft.optionIds.includes(id) ? draft.optionIds.filter((x) => x !== id) : [...draft.optionIds, id] });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const common = { revealed, order, labelledBy: promptId, describedBy: contextId };
  let body: ReactNode = null;
  switch (ex.type) {
    case 'choice':
      body = <ChoicePlayer ex={ex} draft={draft as Extract<Draft, { type: 'choice' }>} setDraft={setDraft} {...common} />;
      break;
    case 'multi':
      body = <MultiPlayer ex={ex} draft={draft as Extract<Draft, { type: 'multi' }>} setDraft={setDraft} {...common} />;
      break;
    case 'truefalse':
      body = <TrueFalsePlayer ex={ex} draft={draft as Extract<Draft, { type: 'truefalse' }>} setDraft={setDraft} {...common} />;
      break;
    case 'hotspot':
      body = <HotspotPlayer ex={ex} draft={draft as Extract<Draft, { type: 'hotspot' }>} setDraft={setDraft} {...common} />;
      break;
    case 'order':
      body = <OrderPlayer ex={ex} draft={draft as Extract<Draft, { type: 'order' }>} setDraft={setDraft} {...common} />;
      break;
    case 'match':
      body = <MatchPlayer ex={ex} draft={draft as Extract<Draft, { type: 'match' }>} setDraft={setDraft} {...common} />;
      break;
    case 'slider':
      body = <SliderPlayer ex={ex} draft={draft as Extract<Draft, { type: 'slider' }>} setDraft={setDraft} {...common} />;
      break;
    case 'grid':
      body = <GridPlayer ex={ex} draft={draft as Extract<Draft, { type: 'grid' }>} setDraft={setDraft} {...common} />;
      break;
  }

  const hint =
    ex.type === 'choice'
      ? 'Raccourcis\u00A0: 1–\u2060' + order.length + ' pour choisir, Entrée pour valider.'
      : ex.type === 'multi'
        ? 'Coche toutes les bonnes réponses (touches 1–\u2060' + order.length + '), puis Entrée.'
        : ex.type === 'truefalse'
          ? 'Raccourcis\u00A0: V (vrai), F (faux), Entrée pour valider.'
          : 'Entrée pour valider.';

  return (
    <article className="task" ref={articleRef}>
      <header className="task-head">
        {/* Where it comes from and the scenario come first on screen; the prompt, which gets the focus, points to them. */}
        {about && (
          <p id={aboutId} className="task-about">
            {about}
          </p>
        )}
        {ex.context && (
          <div id={contextId}>
            <Md text={ex.context} className="task-context" />
          </div>
        )}
        <h1 id={promptId} className="task-prompt" tabIndex={-1} aria-describedby={[aboutId, contextId].filter(Boolean).join(' ') || undefined}>
          <MdInline text={ex.prompt} />
        </h1>
        {ex.visual && ex.type !== 'hotspot' && ex.type !== 'slider' && ex.type !== 'grid' && (
          <div className="stage">
            <MockFor ex={ex} />
          </div>
        )}
      </header>

      {body}

      {revealed && result && <Feedback ref={feedbackRef} ex={ex} result={result} draft={draft} xp={xp} />}

      <div className="task-actions">
        {!revealed ? (
          <>
            <button type="button" className="btn btn-primary" onClick={validate} disabled={!complete} aria-describedby={remaining ? `left-${ex.id}` : undefined}>
              Valider
            </button>
            {remaining && (
              <span id={`left-${ex.id}`} className="task-remaining">
                {remaining}
              </span>
            )}
            <span className="shortcut-hint">{hint}</span>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={onNext}>
              {nextLabel} <ArrowRight aria-hidden="true" />
            </button>
            <span className="shortcut-hint">Entrée pour continuer.</span>
          </>
        )}
      </div>
    </article>
  );
}

function MockFor({ ex }: { ex: Exercise }) {
  return ex.visual ? <Mock visual={ex.visual} /> : null;
}
