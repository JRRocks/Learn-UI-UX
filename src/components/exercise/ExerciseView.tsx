import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { grade, type GradeResult } from '../../engine/grade';
import { shuffle, shuffleAway } from '../../engine/random';
import type { Exercise } from '../../engine/types';
import { Md, MdInline } from '../../lib/markdown';
import { Mock } from '../Mock';
import { Feedback } from './Feedback';
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

function displayOrder(ex: Exercise): string[] {
  switch (ex.type) {
    case 'choice':
    case 'multi':
      return ex.fixedOrder ? ex.options.map((o) => o.id) : shuffle(ex.options.map((o) => o.id));
    case 'order':
      return shuffleAway(ex.items.map((i) => i.id));
    case 'match':
      return shuffle(ex.pairs.map((p) => p.id));
    default:
      return [];
  }
}

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'text'));

interface Props {
  ex: Exercise;
  /** `exam` hides the correction until the end of the session. */
  mode: 'practice' | 'exam';
  /** Called once when the learner validates; returns the XP earned (shown in the feedback). */
  onAnswered: (result: GradeResult, draft: Draft) => number | undefined;
  onNext: () => void;
  nextLabel: string;
}

export function ExerciseView({ ex, mode, onAnswered, onNext, nextLabel }: Props) {
  const order = useMemo(() => displayOrder(ex), [ex]);
  const [draft, setDraft] = useState<Draft>(() => initialDraft(ex, order));
  const [result, setResult] = useState<GradeResult | null>(null);
  const [xp, setXp] = useState<number | undefined>();
  const feedbackRef = useRef<HTMLElement>(null);
  const promptId = `prompt-${ex.id}`;
  const revealed = result !== null && mode === 'practice';
  const complete = isComplete(ex, draft);

  const validate = () => {
    if (result || !complete) return;
    const r = grade(ex, toAnswer(draft));
    setResult(r);
    setXp(onAnswered(r, draft));
    if (mode === 'exam') onNext();
  };

  // Bring the correction into view once it is rendered.
  useEffect(() => {
    if (!revealed) return;
    const el = feedbackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [revealed]);

  // Keyboard: digits pick options, V/F answer true/false, Enter validates then continues.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (e.key === 'Enter') {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === 'BUTTON' || t.tagName === 'A') && !t.closest('.task-actions')) return;
        e.preventDefault();
        if (revealed) onNext();
        else validate();
        return;
      }
      if (revealed || result) return;
      const n = Number.parseInt(e.key, 10);
      if (ex.type === 'truefalse') {
        if (e.key === 'v' || e.key === 'V' || n === 1) setDraft({ type: 'truefalse', value: true });
        if (e.key === 'f' || e.key === 'F' || n === 2) setDraft({ type: 'truefalse', value: false });
        return;
      }
      if (!Number.isNaN(n) && n >= 1 && n <= order.length) {
        const id = order[n - 1];
        if (ex.type === 'choice') setDraft({ type: 'choice', optionId: id });
        if (ex.type === 'multi' && draft.type === 'multi')
          setDraft({ type: 'multi', optionIds: draft.optionIds.includes(id) ? draft.optionIds.filter((x) => x !== id) : [...draft.optionIds, id] });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const common = { revealed, order, labelledBy: promptId };
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
      ? 'Raccourcis : 1–' + order.length + ' pour choisir, Entrée pour valider.'
      : ex.type === 'multi'
        ? 'Coche toutes les bonnes réponses (touches 1–' + order.length + '), puis Entrée.'
        : ex.type === 'truefalse'
          ? 'Raccourcis : V (vrai), F (faux), Entrée pour valider.'
          : 'Entrée pour valider.';

  return (
    <article className="task">
      <header className="task-head">
        {ex.context && <Md text={ex.context} className="task-context" />}
        <h1 id={promptId} className="task-prompt" tabIndex={-1}>
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
            <button type="button" className="btn btn-primary" onClick={validate} disabled={!complete}>
              Valider
            </button>
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
