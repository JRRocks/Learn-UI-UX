import { ArrowDown, ArrowUp, Check, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { useCallback, useMemo, useState, type CSSProperties } from 'react';
import { contrastRatio, criterionMet, grayHex, idealValues, initialValues, measure, orderConcordance, scenarioColor, type Answer } from '../../engine/grade';
import type {
  ChoiceExercise,
  Exercise,
  GridExercise,
  HotspotExercise,
  MatchExercise,
  MultiExercise,
  OrderExercise,
  ScenarioControl,
  ScenarioCriterion,
  ScenarioExercise,
  SliderExercise,
  TrueFalseExercise,
} from '../../engine/types';
import { followFocus } from '../../lib/focusInView';
import { SEP } from '../../lib/french';
import { MdInline, frenchSpacing } from '../../lib/markdown';
import { Mock, MotionControls, type HotspotState, type Mark, type MotionInfo } from '../Mock';

/** Learner's in-progress answer, per exercise type. */
export type Draft =
  | { type: 'choice'; optionId: string | null }
  | { type: 'multi'; optionIds: string[] }
  | { type: 'truefalse'; value: boolean | null }
  | { type: 'hotspot'; ids: string[] }
  | { type: 'order'; ids: string[] }
  | { type: 'match'; pairs: Record<string, string> }
  | { type: 'slider'; value: number }
  | { type: 'grid'; scores: Record<string, number> }
  | { type: 'scenario'; values: Record<string, number> };

export function initialDraft(ex: Exercise, order: string[]): Draft {
  switch (ex.type) {
    case 'choice':
      return { type: 'choice', optionId: null };
    case 'multi':
      return { type: 'multi', optionIds: [] };
    case 'truefalse':
      return { type: 'truefalse', value: null };
    case 'hotspot':
      return { type: 'hotspot', ids: [] };
    case 'order':
      return { type: 'order', ids: order };
    case 'match':
      return { type: 'match', pairs: {} };
    case 'slider':
      return { type: 'slider', value: ex.initial };
    case 'grid':
      return { type: 'grid', scores: {} };
    case 'scenario':
      return { type: 'scenario', values: initialValues(ex) };
  }
}

export function isComplete(ex: Exercise, d: Draft): boolean {
  switch (d.type) {
    case 'choice':
      return d.optionId !== null;
    case 'multi':
      return d.optionIds.length > 0;
    case 'truefalse':
      return d.value !== null;
    case 'hotspot':
      return ex.type === 'hotspot' && d.ids.length === ex.hotspots.filter((h) => h.correct).length;
    case 'order':
    case 'slider':
    case 'scenario':
      return true;
    case 'match':
      return ex.type === 'match' && ex.pairs.every((p) => d.pairs[p.id]);
    case 'grid':
      return ex.type === 'grid' && ex.criteria.every((c) => d.scores[c.id] !== undefined);
  }
}

export function toAnswer(d: Draft): Answer {
  switch (d.type) {
    case 'choice':
      return { type: 'choice', optionId: d.optionId ?? '' };
    case 'multi':
      return { type: 'multi', optionIds: d.optionIds };
    case 'truefalse':
      return { type: 'truefalse', value: Boolean(d.value) };
    case 'hotspot':
      return { type: 'hotspot', ids: d.ids };
    case 'order':
      return { type: 'order', ids: d.ids };
    case 'match':
      return { type: 'match', pairs: d.pairs };
    case 'slider':
      return { type: 'slider', value: d.value };
    case 'grid':
      return { type: 'grid', scores: d.scores };
    case 'scenario':
      return { type: 'scenario', values: d.values };
  }
}

interface P<E extends Exercise, D extends Draft> {
  ex: E;
  draft: D;
  setDraft: (d: D) => void;
  revealed: boolean;
  /** Display order of options / items / right-hand labels. */
  order: string[];
  labelledBy: string;
  /** The exercise's scenario, read with its answers (a11y-contexte-avant-focus). */
  describedBy?: string;
}

/**
 * Mocks of the options sit inside their labels, where a button cannot go: one set of « Rejouer » /
 * « Mettre en pause » under the options drives all of them.
 */
function useOptionMotion() {
  const [infos, setInfos] = useState<Record<string, MotionInfo | null>>({});
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const report = useCallback((id: string, info: MotionInfo | null) => setInfos((x) => ({ ...x, [id]: info })), []);
  const all = Object.values(infos).filter((i): i is MotionInfo => i !== null);
  const info = all.length ? { finite: all.some((i) => i.finite), long: all.some((i) => i.long) } : null;
  const controls = info && (
    <MotionControls
      info={info}
      paused={paused}
      many={all.length > 1}
      onPause={() => setPaused((p) => !p)}
      onReplay={() => {
        setPaused(false);
        setReplay((r) => r + 1);
      }}
    />
  );
  const mockProps = (id: string) => ({ controls: false, paused, replay, onMotion: (i: MotionInfo | null) => report(id, i) });
  return { controls, mockProps };
}

/* ---------------------------------------------------------------- choice */

export type OptionState = 'idle' | 'selected' | 'right' | 'wrong' | 'dim';

/**
 * State of a single-answer tile (Le bon choix, Vrai ou faux, Défi chrono): before validation, chosen
 * or not; after it, the recommended answer, the learner's wrong choice, or an option nobody picked.
 */
export function optionState(selected: boolean, right: boolean, revealed: boolean): OptionState {
  if (!revealed) return selected ? 'selected' : 'idle';
  if (right) return 'right';
  return selected ? 'wrong' : 'dim';
}

/** What a marked tile is, once validated: said in words and drawn as an icon, never by its color alone. */
export function OptionBadge({ state }: { state: OptionState }) {
  if (state !== 'right' && state !== 'wrong') return null;
  return (
    <span className="option-badge">
      {state === 'right' ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
      {state === 'right' ? 'Recommandé' : 'Ton choix'}
    </span>
  );
}

export function ChoicePlayer({ ex, draft, setDraft, revealed, order, labelledBy, describedBy }: P<ChoiceExercise, Extract<Draft, { type: 'choice' }>>) {
  const visual = ex.options.some((o) => o.visual);
  const options = order.map((id) => ex.options.find((o) => o.id === id)!);
  const motion = useOptionMotion();
  return (
    <>
    <fieldset className={visual ? 'options options--visual' : 'options'} data-count={options.length} aria-labelledby={labelledBy} aria-describedby={describedBy}>
      {options.map((o, i) => {
        const selected = draft.optionId === o.id;
        const right = o.id === ex.answer;
        const state = optionState(selected, right, revealed);
        return (
          <label key={o.id} className={visual ? 'option option--visual' : 'option'} data-state={state}>
            <input
              type="radio"
              className="visually-hidden"
              name={`opt-${ex.id}`}
              value={o.id}
              checked={selected}
              disabled={revealed}
              onChange={() => setDraft({ type: 'choice', optionId: o.id })}
            />
            {visual ? (
              <>
                <span className="option-top">
                  <span className="option-key" aria-hidden="true">
                    {i + 1}
                  </span>
                  <OptionBadge state={state} />
                </span>
                <span className="stage">
                  <Mock visual={o.visual!} {...motion.mockProps(o.id)} />
                </span>
                {o.label && (
                  <span className="option-label">
                    <MdInline text={o.label} />
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="option-key" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="option-text">
                  <MdInline text={o.label ?? ''} />
                  {/* A space before the badge: glued to the text, it made one block with its last word, which
                      then broke anywhere on a narrow line, a guillemet starting the next one. */}
                  {revealed && (right || selected) && (
                    <>
                      {' '}
                      <span className="option-badge" style={{ marginInlineStart: 4 }}>
                        {right ? 'Recommandé' : 'Ton choix'}
                      </span>
                    </>
                  )}
                </span>
              </>
            )}
            {revealed && o.why && <span className="option-why"><MdInline text={o.why} /></span>}
          </label>
        );
      })}
    </fieldset>
    {motion.controls}
    </>
  );
}

/* ---------------------------------------------------------------- multi */

export function MultiPlayer({ ex, draft, setDraft, revealed, order, labelledBy, describedBy }: P<MultiExercise, Extract<Draft, { type: 'multi' }>>) {
  const visual = ex.options.some((o) => o.visual);
  const options = order.map((id) => ex.options.find((o) => o.id === id)!);
  const motion = useOptionMotion();
  const toggle = (id: string) =>
    setDraft({ type: 'multi', optionIds: draft.optionIds.includes(id) ? draft.optionIds.filter((x) => x !== id) : [...draft.optionIds, id] });
  return (
    <>
    <fieldset className={visual ? 'options options--visual' : 'options'} data-count={options.length} aria-labelledby={labelledBy} aria-describedby={describedBy}>
      {options.map((o) => {
        const selected = draft.optionIds.includes(o.id);
        const right = ex.answers.includes(o.id);
        const state = !revealed ? (selected ? 'selected' : 'idle') : right ? 'right' : selected ? 'wrong' : 'dim';
        const badge = right ? (selected ? 'À cocher — trouvé' : 'À cocher — oublié') : selected ? 'Ne s’applique pas' : '';
        const box = (
          <span className="check-box" aria-hidden="true">
            {selected && <Check />}
          </span>
        );
        return (
          <label key={o.id} className={visual ? 'option option--visual' : 'option'} data-state={state}>
            <input type="checkbox" className="visually-hidden" checked={selected} disabled={revealed} onChange={() => toggle(o.id)} />
            {visual ? (
              <>
                <span className="option-top">
                  {box}
                  {revealed && badge && <span className="option-badge">{badge}</span>}
                </span>
                <span className="stage">
                  <Mock visual={o.visual!} {...motion.mockProps(o.id)} />
                </span>
                {o.label && (
                  <span className="option-label">
                    <MdInline text={o.label} />
                  </span>
                )}
              </>
            ) : (
              <>
                {box}
                <span className="option-text">
                  <MdInline text={o.label ?? ''} />
                  {revealed && badge && (
                    <>
                      {' '}
                      <span className="option-badge" style={{ marginInlineStart: 4 }}>
                        {badge}
                      </span>
                    </>
                  )}
                </span>
              </>
            )}
            {revealed && o.why && <span className="option-why"><MdInline text={o.why} /></span>}
          </label>
        );
      })}
    </fieldset>
    {motion.controls}
    </>
  );
}

/* ---------------------------------------------------------------- true / false */

export function TrueFalsePlayer({ ex, draft, setDraft, revealed, labelledBy, describedBy }: P<TrueFalseExercise, Extract<Draft, { type: 'truefalse' }>>) {
  const choices: { value: boolean; label: string; key: string }[] = [
    { value: true, label: 'Vrai', key: 'V' },
    { value: false, label: 'Faux', key: 'F' },
  ];
  return (
    <fieldset className="tf" aria-labelledby={labelledBy} aria-describedby={describedBy}>
      {choices.map((c) => {
        const selected = draft.value === c.value;
        const state = optionState(selected, c.value === ex.answer, revealed);
        return (
          <label key={c.label} className="option" data-state={state}>
            <input
              type="radio"
              className="visually-hidden"
              name={`tf-${ex.id}`}
              checked={selected}
              disabled={revealed}
              onChange={() => setDraft({ type: 'truefalse', value: c.value })}
            />
            <span className="option-key" aria-hidden="true">
              {c.key}
            </span>
            {c.label}
            <OptionBadge state={state} />
          </label>
        );
      })}
    </fieldset>
  );
}

/* ---------------------------------------------------------------- hotspot */

export function HotspotPlayer({ ex, draft, setDraft, revealed }: P<HotspotExercise, Extract<Draft, { type: 'hotspot' }>>) {
  const needed = ex.hotspots.filter((h) => h.correct).length;
  // On a touch screen the instruction speaks of touching, not of clicking and tabbing.
  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const [full, setFull] = useState(false);

  const pick = (id: string) => {
    if (revealed) return;
    if (draft.ids.includes(id)) {
      setFull(false);
      setDraft({ type: 'hotspot', ids: draft.ids.filter((x) => x !== id) });
    } else if (draft.ids.length < needed) {
      setDraft({ type: 'hotspot', ids: [...draft.ids, id] });
    } else {
      setFull(true);
    }
  };

  const states = useMemo(() => {
    const out: Record<string, HotspotState | undefined> = {};
    for (const h of ex.hotspots) {
      const picked = draft.ids.includes(h.id);
      if (!revealed) out[h.id] = picked ? 'picked' : undefined;
      else out[h.id] = picked ? (h.correct ? 'hit' : 'wrong') : h.correct ? 'missed' : undefined;
    }
    return out;
  }, [ex.hotspots, draft.ids, revealed]);

  const marks: Mark[] | undefined = useMemo(
    () =>
      revealed
        ? ex.hotspots
            .filter((h) => h.correct)
            .map((h, i) => ({ id: h.id, n: i + 1, kind: draft.ids.includes(h.id) ? ('hit' as const) : ('miss' as const) }))
        : undefined,
    [revealed, ex.hotspots, draft.ids],
  );

  return (
    <div className="section" data-reveal-view="">
      <div className="stage hotspot-stage">
        <Mock visual={ex.visual} onPick={revealed ? undefined : pick} states={states} marks={marks} />
      </div>
      {!revealed && (
        <p className="task-hint" aria-live="polite">
          <span className="hotspot-count">
            {draft.ids.length} / {needed}
          </span>{' '}
          {needed > 1 ? 'zones sélectionnées' : 'zone sélectionnée'}.{' '}
          {full
            ? 'Tu as atteint le nombre de zones\u00A0: désélectionne-en une pour changer.'
            : coarse
              ? 'Touche les éléments fautifs, puis valide.'
              : 'Clique (ou Tab puis Entrée) sur les éléments fautifs, puis valide.'}
        </p>
      )}
      {revealed && (
        <ol className="zones" aria-label="Zones à corriger">
          {ex.hotspots
            .filter((h) => h.correct)
            .map((h, i) => {
              const found = draft.ids.includes(h.id);
              return (
                <li key={h.id}>
                  <span className={found ? 'zone-n' : 'zone-n zone-n--miss'} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <strong>
                      <MdInline text={h.label} />
                    </strong>{' '}
                    — {found ? 'trouvé' : 'manqué'}. <MdInline text={h.why} />
                  </span>
                </li>
              );
            })}
          {ex.hotspots
            .filter((h) => !h.correct && draft.ids.includes(h.id))
            .map((h) => (
              <li key={h.id}>
                <span className="zone-n zone-n--neutral" aria-hidden="true">
                  ·
                </span>
                <span>
                  <strong>
                    Ta sélection{'\u00A0'}: <MdInline text={h.label} />
                  </strong>{' '}
                  — <MdInline text={h.why} />
                </span>
              </li>
            ))}
        </ol>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- order */

const plain = (s: string) => s.replace(/`/g, '').replace(/\*\*/g, '');

export function OrderPlayer({ ex, draft, setDraft, revealed }: P<OrderExercise, Extract<Draft, { type: 'order' }>>) {
  const [said, setSaid] = useState('');
  const move = (from: number, to: number) => {
    // At either end, the button stays focusable (aria-disabled) and does nothing: the focus is never lost.
    if (to < 0 || to >= draft.ids.length) return;
    const ids = draft.ids.slice();
    const [it] = ids.splice(from, 1);
    ids.splice(to, 0, it);
    setDraft({ type: 'order', ids });
    // The focused button moves with its item: the page follows them.
    followFocus('.order-item');
    const label = ex.items.find((x) => x.id === it)?.label ?? '';
    setSaid(frenchSpacing(`« ${plain(label)} » en position ${to + 1} sur ${ids.length}.`));
  };
  const correct = ex.items.map((i) => i.id);
  return (
    <div className="section">
      <ol className="order-list" aria-label="Éléments à ordonner">
        {draft.ids.map((id, i) => {
          const item = ex.items.find((x) => x.id === id)!;
          const state = revealed ? (correct[i] === id ? 'right' : 'wrong') : undefined;
          return (
            <li key={id} className="order-item" data-state={state}>
              <span className="order-pos" aria-hidden="true">
                {i + 1}
              </span>
              <span className="order-label">
                <MdInline text={item.label} />
                {revealed && correct[i] !== id && (
                  <span className="order-correct"> — à placer en position {correct.indexOf(id) + 1}</span>
                )}
              </span>
              {!revealed && (
                <span className="order-moves">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => move(i, i - 1)}
                    aria-disabled={i === 0 || undefined}
                    aria-label={`Monter « ${plain(item.label)} »`}
                  >
                    <ArrowUp aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => move(i, i + 1)}
                    aria-disabled={i === draft.ids.length - 1 || undefined}
                    aria-label={`Descendre « ${plain(item.label)} »`}
                  >
                    <ArrowDown aria-hidden="true" />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {/* Present from the start, so that each move is announced. */}
      <p className="visually-hidden" aria-live="polite">
        {revealed ? '' : said}
      </p>
      {revealed && (
        <p className="task-hint">
          Ordre respecté pour {Math.round(orderConcordance(draft.ids, correct) * 100)}{'\u00A0'}% des paires d’éléments.
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- match */

export function MatchPlayer({ ex, draft, setDraft, revealed, order, describedBy }: P<MatchExercise, Extract<Draft, { type: 'match' }>>) {
  const rights = order.map((id) => ex.pairs.find((p) => p.id === id)!);
  return (
    <div className="match-table" role="group" aria-label={`${ex.leftTitle} et ${ex.rightTitle}`} aria-describedby={describedBy}>
      {ex.pairs.map((p) => {
        const chosen = draft.pairs[p.id] ?? '';
        const state = revealed ? (chosen === p.id ? 'right' : 'wrong') : undefined;
        const selectId = `m-${ex.id}-${p.id}`;
        return (
          <div key={p.id} className="match-row" data-state={state}>
            <label htmlFor={selectId}>
              <MdInline text={p.left} />
            </label>
            <select
              id={selectId}
              className="select"
              value={chosen}
              disabled={revealed}
              onChange={(e) => setDraft({ type: 'match', pairs: { ...draft.pairs, [p.id]: e.target.value } })}
            >
              <option value="">{ex.rightTitle}{'\u00A0'}: choisir…</option>
              {rights.map((r) => (
                <option key={r.id} value={r.id}>
                  {plain(r.right)}
                </option>
              ))}
            </select>
            {revealed && chosen !== p.id && (
              <span className="match-fix">
                Bonne association{'\u00A0'}: <MdInline text={p.right} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- slider */

const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 3 }).format(n);

export function SliderPlayer({ ex, draft, setDraft, revealed }: P<SliderExercise, Extract<Draft, { type: 'slider' }>>) {
  const [replay, setReplay] = useState(0);
  const [showIdeal, setShowIdeal] = useState(false);
  const shown = revealed && showIdeal ? ex.ideal : draft.value;
  const vars = useMemo(() => ({ '--v': `${shown}${ex.unit}`, '--n': String(shown) }), [shown, ex.unit]);
  const inputId = `s-${ex.id}`;
  const ratio = ex.readout?.kind === 'contrast' ? contrastRatio(grayHex(shown), ex.readout.background) : null;

  return (
    <div className="section" data-reveal-view="">
      <div className="stage">
        <Mock key={replay} visual={ex.visual} vars={vars} controls={!ex.replayable} />
      </div>
      <div className="slider-box">
        <div className="slider-head">
          <label htmlFor={inputId} className="field-label">
            {ex.control}
          </label>
          <output htmlFor={inputId} className="slider-value">
            {fmt(shown)}
            {ex.unit ? `\u00A0${ex.unit}` : ''}
          </output>
        </div>
        <input
          id={inputId}
          type="range"
          min={ex.min}
          max={ex.max}
          step={ex.step}
          value={draft.value}
          disabled={revealed}
          onChange={(e) => setDraft({ type: 'slider', value: Number(e.target.value) })}
          onPointerUp={() => ex.replayable && setReplay((r) => r + 1)}
          onKeyUp={() => ex.replayable && setReplay((r) => r + 1)}
        />
        {ratio !== null && (
          <p className="slider-readout" data-pass={ratio >= 4.5}>
            Contraste{'\u00A0'}: <strong>{fmt(Math.round(ratio * 100) / 100)}:1</strong> — minimum AA pour un texte courant{'\u00A0'}: 4,5:1
          </p>
        )}
        <div className="btn-row">
          {ex.replayable && (
            <button type="button" className="btn btn-secondary" onClick={() => setReplay((r) => r + 1)}>
              <RotateCcw aria-hidden="true" /> Rejouer l’animation
            </button>
          )}
          {revealed && (
            <button
              type="button"
              className="btn btn-secondary"
              aria-pressed={showIdeal}
              onClick={() => {
                setShowIdeal((v) => !v);
                // The mock above changes height (a type size, a spacing): the page follows the button.
                followFocus();
              }}
            >
              {showIdeal ? 'Revoir ma valeur' : 'Voir la valeur experte'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- grid */

export function GridPlayer({ ex, draft, setDraft, revealed }: P<GridExercise, Extract<Draft, { type: 'grid' }>>) {
  const tol = ex.tolerance ?? 1;
  const values = Array.from({ length: ex.scale.max - ex.scale.min + 1 }, (_, i) => ex.scale.min + i);
  return (
    <div className="section">
      <div className="stage">
        <Mock visual={ex.visual} />
      </div>
      <p className="task-hint">
        Échelle{'\u00A0'}: {ex.scale.labels.join(SEP)}. Tes notes comptent comme justes à {tol} point près de celles de l’expert.
      </p>
      <div className="grid-score">
        {ex.criteria.map((c, i) => {
          const mine = draft.scores[c.id];
          const ok = mine !== undefined && Math.abs(mine - c.expert) <= tol;
          return (
            // The capture does not change once validated: the correction starts on the first row.
            <div key={c.id} className="grid-row" data-state={revealed ? (ok ? 'right' : 'wrong') : undefined} data-reveal-view={i === 0 ? '' : undefined}>
              <span className="grid-label" id={`g-${ex.id}-${c.id}`}>
                {c.label}
              </span>
              <span className="segmented" role="group" aria-labelledby={`g-${ex.id}-${c.id}`}>
                {values.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={mine === v}
                    aria-label={ex.scale.labels[v - ex.scale.min]}
                    disabled={revealed}
                    onClick={() => setDraft({ type: 'grid', scores: { ...draft.scores, [c.id]: v } })}
                  >
                    {v}
                  </button>
                ))}
              </span>
              {revealed && (
                <p className="grid-why">
                  {ok ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}{' '}
                  <strong>
                    Toi{'\u00A0'}: {mine}{'\u00A0'}· expert{'\u00A0'}: {c.expert}.
                  </strong>{' '}
                  <MdInline text={c.why} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- scenario */

/** The properties a scenario's mock reads: `--<id>`, and `--<id>-n` for a number. */
export function scenarioVars(ex: ScenarioExercise, values: Record<string, number>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const c of ex.controls) {
    const v = values[c.id] ?? c.initial;
    if (c.kind === 'range') {
      out[`--${c.id}`] = `${v}${c.unit}`;
      out[`--${c.id}-n`] = String(v);
    } else out[`--${c.id}`] = scenarioColor(ex, c.id, values);
  }
  return out;
}

/** « 48 px », or the shade of a color ramp as its code (`#B45309`). */
export function settingText(ex: ScenarioExercise, c: ScenarioControl, values: Record<string, number>): string {
  const v = values[c.id] ?? c.initial;
  return c.kind === 'range' ? `${fmt(v)}${c.unit ? ` ${c.unit}` : ''}` : scenarioColor(ex, c.id, values).toUpperCase();
}

/** A contrast ratio as WCAG reads it: cut, never rounded up (4,49:1 does not reach 4,5:1). */
export const contrastText = (ratio: number) => `${fmt(Math.floor(ratio * 100) / 100)}:1`;

/** What a criterion measured on the values set: « 36 px », « 1,5 », « 3,2:1 ». */
export function measuredText(ex: ScenarioExercise, c: ScenarioCriterion, values: Record<string, number>): string {
  const v = measure(ex, c, values);
  const check = c.check;
  if (check.kind === 'contrast') return contrastText(v);
  if (check.kind === 'ratio') return Number.isFinite(v) ? fmt(Math.round(v * 100) / 100) : '—';
  const control = ex.controls.find((x) => x.id === check.control);
  return control ? settingText(ex, control, values) : fmt(v);
}

/** A color ramp drawn on its slider's track, one band per shade. */
function rampTrack(colors: string[]): CSSProperties {
  const step = 100 / colors.length;
  const stops = colors.map((c, i) => `${c} ${(i * step).toFixed(3)}% ${((i + 1) * step).toFixed(3)}%`).join(', ');
  return { '--ramp': `linear-gradient(to right, ${stops})` } as CSSProperties;
}

/**
 * One setting: its name and value, then « − », the slider, « + ». The buttons change it a step at a
 * time without dragging (WCAG 2.5.7), and with a finger, more precisely than the thumb.
 */
function Setting({
  ex,
  c,
  values,
  disabled,
  onChange,
}: {
  ex: ScenarioExercise;
  c: ScenarioControl;
  values: Record<string, number>;
  disabled: boolean;
  onChange: (id: string, v: number) => void;
}) {
  const id = `sc-${ex.id}-${c.id}`;
  const v = values[c.id] ?? c.initial;
  const [min, max, step] = c.kind === 'range' ? [c.min, c.max, c.step] : [0, c.colors.length - 1, 1];
  // Rounded to the step's decimals: 1.1 + 0.05 must give 1.15, not 1.1500000000000001.
  const decimals = (String(step).split('.')[1] ?? '').length;
  const set = (n: number) => onChange(c.id, Number(Math.min(max, Math.max(min, n)).toFixed(decimals)));
  const text = settingText(ex, c, values);
  const color = c.kind === 'ramp' ? scenarioColor(ex, c.id, values) : null;
  const valueText = c.kind === 'ramp' ? `Nuance ${v + 1} sur ${c.colors.length}, de la plus claire à la plus foncée : ${text}` : text;
  return (
    <div className="setting" data-kind={c.kind}>
      <div className="slider-head">
        <label htmlFor={id} className="field-label">
          {c.label}
        </label>
        <output htmlFor={id} className="slider-value">
          {color && <span className="setting-swatch" style={{ background: color }} aria-hidden="true" />}
          {text}
        </output>
      </div>
      <div className="setting-row">
        <button
          type="button"
          className="icon-btn setting-step"
          onClick={() => set(v - step)}
          disabled={disabled}
          aria-disabled={v <= min || undefined}
          aria-label={`Diminuer : ${c.label}`}
        >
          <Minus aria-hidden="true" />
        </button>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          disabled={disabled}
          aria-valuetext={valueText}
          style={c.kind === 'ramp' ? rampTrack(c.colors) : undefined}
          onChange={(e) => set(Number(e.target.value))}
        />
        <button
          type="button"
          className="icon-btn setting-step"
          onClick={() => set(v + step)}
          disabled={disabled}
          aria-disabled={v >= max || undefined}
          aria-label={`Augmenter : ${c.label}`}
        >
          <Plus aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * « Mise en situation »: a realistic screen and its settings, side by side where there is room. Once
 * validated, the settings are evaluated criterion by criterion, and the expert version can be shown
 * in place of the learner's.
 */
export function ScenarioPlayer({ ex, draft, setDraft, revealed }: P<ScenarioExercise, Extract<Draft, { type: 'scenario' }>>) {
  const [showIdeal, setShowIdeal] = useState(false);
  const ideal = useMemo(() => idealValues(ex), [ex]);
  const shown = revealed && showIdeal ? ideal : draft.values;
  const vars = useMemo(() => scenarioVars(ex, shown), [ex, shown]);
  const met = ex.criteria.filter((c) => criterionMet(ex, c, draft.values)).length;
  const onChange = (id: string, v: number) => setDraft({ type: 'scenario', values: { ...draft.values, [id]: v } });

  return (
    <div className="section scenario">
      <div className="scenario-work">
        <div className="stage scenario-stage">
          <Mock visual={ex.visual} vars={vars} />
          {/* Under the screen it changes: on a phone, the change shows right above the button. */}
          {revealed && (
            <div className="scenario-view">
              <p className="scenario-shown">{showIdeal ? 'Version experte' : 'Tes réglages'}</p>
              <button
                type="button"
                className="btn btn-secondary"
                aria-pressed={showIdeal}
                onClick={() => {
                  setShowIdeal((x) => !x);
                  // The screen above changes size (a button, a spacing): the page follows the button.
                  followFocus();
                }}
              >
                {showIdeal ? 'Revoir mes réglages' : 'Voir la version experte'}
              </button>
            </div>
          )}
        </div>
        <div className="scenario-panel">
          <div className="settings" role="group" aria-label="Réglages">
            {ex.controls.map((c) => (
              <Setting key={c.id} ex={ex} c={c} values={draft.values} disabled={revealed} onChange={onChange} />
            ))}
          </div>
          {ex.readouts?.map((r) => {
            const ratio = contrastRatio(scenarioColor(ex, r.a, shown), scenarioColor(ex, r.b, shown));
            return (
              <p key={r.label} className="slider-readout">
                {r.label}
                {' '}: <strong>{contrastText(ratio)}</strong>
              </p>
            );
          })}
          {!revealed && (
            <p className="task-hint">
              {frenchSpacing(`Règle l’écran comme tu le livrerais, puis valide : tes réglages seront évalués sur ${ex.criteria.length} critères.`)}
            </p>
          )}
        </div>
      </div>
      {revealed && (
        <section className="criteria" data-reveal-view="" aria-labelledby={`crit-${ex.id}`}>
          <h2 id={`crit-${ex.id}`} className="criteria-title">
            Évaluation par critères{' '}: {met} sur {ex.criteria.length}
          </h2>
          <ul className="criteria-list">
            {ex.criteria.map((c) => {
              const ok = criterionMet(ex, c, draft.values);
              return (
                <li key={c.id} data-state={ok ? 'right' : 'wrong'}>
                  {ok ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
                  <div>
                    <p className="criteria-label">
                      <span className="visually-hidden">{ok ? 'Respecté : ' : 'Non respecté : '}</span>
                      <MdInline text={c.label} />
                    </p>
                    <p className="criteria-measure">
                      Toi{' '}: <strong>{measuredText(ex, c, draft.values)}</strong>
                      {SEP}expert{' '}: {measuredText(ex, c, ideal)}
                    </p>
                    <p className="criteria-why">
                      <MdInline text={c.why} />
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
