import { CircleCheck, CircleDot, CircleX } from 'lucide-react';
import { forwardRef } from 'react';
import { Link } from '../../app/router';
import { MODULE_BY_ID } from '../../content';
import { SourceList } from '../SourceLink';
import type { GradeResult } from '../../engine/grade';
import type { Exercise } from '../../engine/types';
import { Md, MdInline, frenchSpacing } from '../../lib/markdown';
import type { Draft } from './players';

const VERDICT = {
  correct: { label: 'Juste', Icon: CircleCheck },
  partial: { label: 'Presque', Icon: CircleDot },
  wrong: { label: 'À reprendre', Icon: CircleX },
} as const;

const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 3 }).format(n);

/** What an expert would have answered, in one glance (the correction, and an exam's summary). */
export function Recommended({ ex, draft }: { ex: Exercise; draft: Draft }) {
  switch (ex.type) {
    case 'choice': {
      const o = ex.options.find((x) => x.id === ex.answer)!;
      return (
        <div className="md">
          {o.label ? (
            <p>
              <strong>
                <MdInline text={o.label} />
              </strong>
            </p>
          ) : (
            <p>
              <strong>{frenchSpacing('La version marquée « Recommandé ».')}</strong>
            </p>
          )}
          {/* Its « pourquoi » is already shown under the option itself. */}
        </div>
      );
    }
    case 'multi':
      return (
        <ul className="recommended-list">
          {ex.options
            .filter((o) => ex.answers.includes(o.id))
            .map((o) => (
              <li key={o.id}>{o.label ? <MdInline text={o.label} /> : frenchSpacing('Version marquée « À cocher »')}</li>
            ))}
        </ul>
      );
    case 'truefalse':
      return (
        <p>
          C’est <strong>{ex.answer ? 'vrai' : 'faux'}</strong>.
        </p>
      );
    case 'hotspot':
      return (
        <ol className="recommended-list">
          {ex.hotspots
            .filter((h) => h.correct)
            .map((h) => (
              <li key={h.id}>
                <MdInline text={h.label} />
              </li>
            ))}
        </ol>
      );
    case 'order':
      return (
        <ol className="recommended-list">
          {ex.items.map((i) => (
            <li key={i.id}>
              <MdInline text={i.label} />
            </li>
          ))}
        </ol>
      );
    case 'match':
      return (
        <ul className="recommended-list">
          {ex.pairs.map((p) => (
            <li key={p.id}>
              <MdInline text={p.left} /> → <MdInline text={p.right} />
            </li>
          ))}
        </ul>
      );
    case 'slider': {
      const unit = ex.unit ? `\u00A0${ex.unit}` : '';
      const mine = draft.type === 'slider' ? draft.value : ex.initial;
      return (
        <p>
          Entre <strong>{fmt(ex.target[0])}</strong> et <strong>{fmt(ex.target[1])}</strong>
          {unit}, idéalement <strong>{fmt(ex.ideal)}</strong>
          {unit}. Ta valeur{'\u00A0'}: {fmt(mine)}
          {unit}.
        </p>
      );
    }
    case 'grid': {
      const tol = ex.tolerance ?? 1;
      const scores = draft.type === 'grid' ? draft.scores : {};
      const agree = ex.criteria.filter((c) => Math.abs((scores[c.id] ?? -99) - c.expert) <= tol).length;
      const total = ex.criteria.reduce((s, c) => s + c.expert, 0);
      return (
        <p>
          Note de l’expert{'\u00A0'}: <strong>{total}</strong> / {ex.criteria.length * ex.scale.max}. Accord avec toi sur{' '}
          <strong>
            {agree} / {ex.criteria.length}
          </strong>{' '}
          critères (à {tol} point près).
        </p>
      );
    }
  }
}

interface FeedbackProps {
  ex: Exercise;
  result: GradeResult;
  draft: Draft;
  xp?: number;
}

export const Feedback = forwardRef<HTMLElement, FeedbackProps>(function Feedback({ ex, result, draft, xp }, ref) {
  const { label, Icon } = VERDICT[result.verdict];
  const module = ex.module ? MODULE_BY_ID.get(ex.module) : undefined;
  return (
    <section ref={ref} className="feedback" data-verdict={result.verdict} tabIndex={-1} aria-label="Correction">
      <p className="verdict" role="status">
        <Icon aria-hidden="true" />
        {label}
        {result.verdict === 'partial' && (
          <span className="verdict-xp">
            {ex.type === 'slider' ? 'proche de la plage recommandée' : `${Math.round(result.score * 100)}\u00A0% de la réponse`}
          </span>
        )}
        {xp !== undefined && <span className="verdict-xp">+{xp} XP</span>}
      </p>
      <div className="feedback-grid">
        <div className="feedback-main">
          <h2>Pourquoi</h2>
          <Md text={ex.explanation} className="prose" />
        </div>
        <div className="feedback-side">
          <div className="note">
            <h2 className="note-mark">Choix recommandé</h2>
            <Recommended ex={ex} draft={draft} />
          </div>
          <div className="note">
            <h2 className="note-mark">À retenir</h2>
            <p className="takeaway">
              <MdInline text={ex.takeaway} />
            </p>
          </div>
          {(ex.sources?.length || module) && (
            <div className="note small">
              {ex.sources && ex.sources.length > 0 && <SourceList sources={ex.sources} label="Sources" />}
              {module && <Link to={`/apprendre/${module.id}`}>{frenchSpacing(`Revoir la leçon « ${module.title} »`)}</Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
