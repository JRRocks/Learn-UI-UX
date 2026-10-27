import { ArrowLeft, Check, CircleCheck, CircleX } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link } from '../app/router';
import { store, useProgress } from '../app/store';
import { toast } from '../app/toasts';
import { Mock } from '../components/Mock';
import { MODULES, MODULE_BY_ID, exercisesOf } from '../content';
import { resolveSource } from '../content/sources';
import { dayKey } from '../engine/dates';
import { markLessonRead, mastery, masteryLabel, XP } from '../engine/progress';
import type { LessonExample } from '../engine/types';
import { Md, MdInline } from '../lib/markdown';
import { NotFound } from './NotFound';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

function Example({ e }: { e: LessonExample }) {
  return (
    <div className="example">
      <h3>{e.title}</h3>
      <div className="example-pair">
        {e.bad && (
          <figure>
            <div className="stage">
              <Mock visual={e.bad} />
            </div>
            <figcaption>
              <span className="verdict-tag verdict-tag--bad">
                <CircleX aria-hidden="true" /> À éviter
              </span>
              {e.badNote && (
                <span>
                  <MdInline text={e.badNote} />
                </span>
              )}
            </figcaption>
          </figure>
        )}
        {e.good && (
          <figure>
            <div className="stage">
              <Mock visual={e.good} />
            </div>
            <figcaption>
              <span className="verdict-tag verdict-tag--good">
                <CircleCheck aria-hidden="true" /> Préférer
              </span>
              {e.goodNote && (
                <span>
                  <MdInline text={e.goodNote} />
                </span>
              )}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

export function Lesson({ id }: { id: string }) {
  const p = useProgress();
  const m = MODULE_BY_ID.get(id);
  if (!m) return <NotFound />;

  const exercises = exercisesOf(m.id);
  const ids = exercises.map((e) => e.id);
  const v = mastery(p, ids);
  const touched = ids.some((x) => p.items[x]);
  const read = Boolean(p.lessons[m.id]);
  const idx = MODULES.findIndex((x) => x.id === m.id);
  const next = MODULES[idx + 1];

  const markRead = () => {
    store.update((s) => markLessonRead(s, m.id));
    toast(`Leçon lue : +${XP.lesson} XP`);
  };

  const scheduleCards = () => {
    const today = dayKey();
    store.update((s) => {
      const cards = { ...s.cards };
      for (const r of m.rules) {
        const key = `${m.id}/${r.id}`;
        if (!cards[key]) cards[key] = { ease: 2.5, interval: 0, reps: 0, due: today };
      }
      return { ...s, cards };
    });
  };

  return (
    <div className="page">
      <Link to="/apprendre" className="back">
        <ArrowLeft aria-hidden="true" /> Sommaire
      </Link>

      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {m.title}
        </h1>
        <p className="lead">{m.summary}</p>
        <p className="meta">
          <span>{m.minutes} min de lecture</span>
          <span>{exercises.length} épreuves</span>
          {m.commands?.length ? (
            <span>
              impeccable{' '}
              {m.commands.map((c) => (
                <code key={c}>/{c} </code>
              ))}
            </span>
          ) : null}
          {read && (
            <span>
              <Check aria-hidden="true" width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> lue
            </span>
          )}
        </p>
      </header>

      <div className="lesson">
        <article className="lesson-article">
          {m.sections.map((s) => (
            <section key={s.id} id={s.id} className="lesson-section" aria-labelledby={`h-${s.id}`}>
              <h2 id={`h-${s.id}`}>{s.title}</h2>
              <Md text={s.body} className="prose" />
              {s.examples?.length ? (
                <div className="examples">
                  {s.examples.map((e, i) => (
                    <Example key={i} e={e} />
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <section id="regles" className="lesson-section" aria-labelledby="h-regles">
            <h2 id="h-regles">Règles d’or</h2>
            <ul className="rules-list">
              {m.rules.map((r) => (
                <li key={r.id}>
                  <span className="q">
                    <MdInline text={r.front} />
                  </span>
                  <span className="a">
                    <MdInline text={r.back} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="lesson-section" aria-labelledby="h-sources">
            <h2 id="h-sources">Sources</h2>
            <ul className="sources">
              {m.sources.map((s, i) => {
                const r = resolveSource(s);
                return (
                  <li key={i}>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.label}
                      </a>
                    ) : (
                      r.label
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="btn-row">
            <Link to={`/session?mode=module&id=${m.id}`} className="btn btn-primary">
              S’entraîner sur cette leçon
            </Link>
            {!read && (
              <button type="button" className="btn btn-secondary" onClick={markRead}>
                Marquer comme lue
              </button>
            )}
            {next && (
              <Link to={`/apprendre/${next.id}`} className="btn btn-ghost">
                Leçon suivante : {next.title}
              </Link>
            )}
          </div>
        </article>

        <aside className="lesson-aside" aria-label="Dans cette leçon">
          <nav className="lesson-toc" aria-labelledby="toc-title">
            <h2 id="toc-title" className="small" style={{ fontSize: 'var(--t-small)' }}>
              Dans cette leçon
            </h2>
            <ol>
              {m.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#/apprendre/${m.id}`} onClick={(e) => (e.preventDefault(), document.getElementById(s.id)?.scrollIntoView())}>
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href={`#/apprendre/${m.id}`} onClick={(e) => (e.preventDefault(), document.getElementById('regles')?.scrollIntoView())}>
                  Règles d’or
                </a>
              </li>
            </ol>
          </nav>
          <div className="section">
            <div className="field">
              <span className="field-label">Maîtrise : {masteryLabel(v, touched)}</span>
              <span className="meter" style={pct(v)} aria-hidden="true">
                <span />
              </span>
            </div>
            <Link to={`/session?mode=module&id=${m.id}`} className="btn btn-primary">
              S’entraîner ({exercises.length})
            </Link>
            <Link to={`/fiches?module=${m.id}`} className="btn btn-secondary" onClick={scheduleCards}>
              Réviser les {m.rules.length} fiches
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
