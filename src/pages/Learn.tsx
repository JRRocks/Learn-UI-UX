import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { useProgress } from '../app/store';
import { CATEGORIES, MODULES, exercisesOf } from '../content';
import { mastery, masteryLabel } from '../engine/progress';
import { SEP, count } from '../lib/french';
import { MdInline, frenchSpacing } from '../lib/markdown';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

/** impeccable's command families, in the order the curriculum shows them. */
const FAMILIES = CATEGORIES.filter((c) => ['enrichir', 'affiner', 'corriger', 'evaluer', 'construire'].includes(c.id)).map((c) => c.title.toLowerCase());

/** `/impeccable typeset`: the command as impeccable's own documentation writes it. */
export function Commands({ list }: { list: string[] }) {
  return (
    <>
      {list.map((c, i) => (
        <span key={c}>
          {i > 0 && ', '}
          <code className="code-short">/impeccable {c}</code>
        </span>
      ))}
    </>
  );
}

export function Learn() {
  const p = useProgress();
  const read = MODULES.filter((m) => p.lessons[m.id]).length;
  usePageTitle(pageTitle('Sommaire'));
  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Sommaire
        </h1>
        <p className="lead">
          {frenchSpacing(
            `${MODULES.length} leçons : les fondations, la psychologie et l’éthique, puis les familles de commandes d’impeccable (${FAMILIES.join(', ')}) et les cultures.`,
          )}
          {read > 0 && ` Tu en as lu ${read}.`}
        </p>
      </header>

      <div className="toc">
        {CATEGORIES.map((cat) => {
          const mods = MODULES.filter((m) => m.category === cat.id);
          if (!mods.length) return null;
          return (
            <section key={cat.id} className="toc-group" aria-labelledby={`cat-${cat.id}`}>
              <div className="toc-group-head">
                <h2 id={`cat-${cat.id}`}>{cat.title}</h2>
                <p>{frenchSpacing(cat.description)}</p>
              </div>
              <ul className="toc-list">
                {mods.map((m) => {
                  const ids = exercisesOf(m.id).map((e) => e.id);
                  const touched = ids.some((id) => p.items[id]);
                  const v = mastery(p, ids);
                  return (
                    <li key={m.id} className="toc-row">
                      <Link to={`/apprendre/${m.id}`}>
                        <span className="toc-title">
                          {frenchSpacing(m.title)}
                          {p.lessons[m.id] && <Check aria-label="Leçon lue" />}
                        </span>
                        <span className="toc-summary">
                          <MdInline text={m.summary} />
                        </span>
                        <span className="toc-meta">
                          {m.minutes}
                          {' '}min de lecture{SEP}
                          {count(ids.length, 'épreuve', 'épreuves')}
                          {m.commands?.length ? (
                            <>
                              {SEP}
                              <Commands list={m.commands} />
                            </>
                          ) : null}
                        </span>
                        <span className="toc-mastery">
                          <span>{masteryLabel(v, touched)}</span>
                          <span className="meter" style={pct(v)} aria-hidden="true">
                            <span />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
