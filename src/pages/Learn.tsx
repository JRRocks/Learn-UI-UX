import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link } from '../app/router';
import { useProgress } from '../app/store';
import { CATEGORIES, MODULES, exercisesOf } from '../content';
import { mastery, masteryLabel } from '../engine/progress';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

export function Learn() {
  const p = useProgress();
  const read = MODULES.filter((m) => p.lessons[m.id]).length;
  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Sommaire
        </h1>
        <p className="lead">
          {MODULES.length} leçons, organisées comme les commandes d’impeccable : évaluer, affiner, enrichir, corriger, construire — plus la
          psychologie, l’éthique et les cultures. {read > 0 && `Tu en as lu ${read}.`}
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
                <p>{cat.description}</p>
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
                          {m.title}
                          {p.lessons[m.id] && <Check aria-label="Leçon lue" />}
                        </span>
                        <span className="toc-summary">{m.summary}</span>
                        <span className="toc-meta">
                          {m.minutes} min de lecture · {ids.length} épreuves
                          {m.commands?.length ? (
                            <>
                              {' · '}
                              {m.commands.map((c) => (
                                <code key={c}>/{c} </code>
                              ))}
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
