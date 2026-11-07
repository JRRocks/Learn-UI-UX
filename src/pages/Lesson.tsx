import { ArrowLeft, Check, ChevronDown, CircleCheck, CircleX } from 'lucide-react';
import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { store, useProgress } from '../app/store';
import { toast } from '../app/toasts';
import { Mock } from '../components/Mock';
import { MODULES, MODULE_BY_ID, exercisesOf, useModule } from '../content';
import { resolveSource } from '../content/sources';
import { dayKey } from '../engine/dates';
import { markLessonRead, mastery, masteryLabel, XP } from '../engine/progress';
import { SESSION_SIZE } from '../engine/session';
import type { LessonExample, ModuleContent } from '../engine/types';
import { count, longDay } from '../lib/french';
import { Md, MdInline, frenchSpacing } from '../lib/markdown';
import { Commands } from './Learn';
import { lessonCards, type LessonCards } from './lessonCards';
import { LoadFailed, Loading } from './LoadFailed';
import { NotFound } from './NotFound';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

function Example({ e }: { e: LessonExample }) {
  return (
    <div className="example">
      <h3>{frenchSpacing(e.title)}</h3>
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

/** Table of contents: scroll to the section and move focus there, so Tab and screen readers follow. */
function goTo(e: MouseEvent, headingId: string) {
  e.preventDefault();
  const h = document.getElementById(headingId);
  if (!h) return;
  (h.closest('section') ?? h).scrollIntoView();
  h.focus({ preventScroll: true });
}

/** Its sections, then its key rules: the parts the contents list jumps to. */
const partsOf = (m: ModuleContent) => [...m.sections.map((s) => ({ id: s.id, title: s.title })), { id: 'regles', title: 'Règles d’or' }];

/**
 * « Réviser » with the number of cards the review will show, or the day they come back once they are
 * all up to date. One component for the aside and for the folded contents that replace it below
 * 1100 px, so that both always say the same.
 */
function ReviewCards({ moduleId, cards, onStart }: { moduleId: string; cards: LessonCards; onStart: () => void }) {
  if (cards.toReview > 0)
    return (
      <Link to={`/fiches?module=${moduleId}`} className="btn btn-secondary" onClick={onStart}>
        Réviser {count(cards.toReview, 'fiche', 'fiches')}
      </Link>
    );
  if (cards.next) return <p className="small muted">{frenchSpacing(`Fiches à jour : prochaine révision le ${longDay(cards.next)}.`)}</p>;
  return null;
}

/**
 * « Marquer comme lue », then, at the same place, the state it set. The note takes the focus from the
 * button that goes away, which would leave it to the page (and screen readers lose their place).
 */
function MarkRead({ read, onMark }: { read: boolean; onMark: () => void }) {
  const noteRef = useRef<HTMLSpanElement>(null);
  const marked = useRef(false);
  useEffect(() => {
    if (read && marked.current) noteRef.current?.focus();
    marked.current = false;
  }, [read]);
  if (read)
    return (
      <span ref={noteRef} className="read-note" tabIndex={-1}>
        <Check aria-hidden="true" /> Leçon marquée comme lue
      </span>
    );
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        marked.current = true;
        onMark();
      }}
    >
      Marquer comme lue
    </button>
  );
}

/** The text of the lesson, once its chunk has arrived. */
function Article({ m }: { m: ModuleContent }) {
  return (
    <>
      {m.sections.map((s) => (
        <section key={s.id} id={s.id} className="lesson-section" aria-labelledby={`h-${s.id}`}>
          <h2 id={`h-${s.id}`} tabIndex={-1}>
            {frenchSpacing(s.title)}
          </h2>
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
        <h2 id="h-regles" tabIndex={-1}>
          Règles d’or
        </h2>
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
                    {frenchSpacing(r.label)}
                  </a>
                ) : (
                  frenchSpacing(r.label)
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export function Lesson({ id }: { id: string }) {
  const p = useProgress();
  const m = MODULE_BY_ID.get(id);
  // The title, summary, counts and buttons come from the light index at once; the text follows.
  const { value: full, failed } = useModule(id);
  usePageTitle(m ? pageTitle(m.title) : null);
  if (!m) return <NotFound />;

  const exercises = exercisesOf(m.id);
  const ids = exercises.map((e) => e.id);
  const v = mastery(p, ids);
  const touched = ids.some((x) => p.items[x]);
  const read = Boolean(p.lessons[m.id]);
  const idx = MODULES.findIndex((x) => x.id === m.id);
  const next = MODULES[idx + 1];
  const today = dayKey();
  // What « Réviser » will really show: the lesson's cards due today, or never reviewed yet.
  const cards = lessonCards(p.cards, m.rules.map((r) => `${m.id}/${r}`), today);
  const sessionSize = Math.min(exercises.length, SESSION_SIZE.module);

  const markRead = () => {
    store.update((s) => markLessonRead(s, m.id));
    toast(`Leçon lue\u00A0: +${XP.lesson}\u00A0XP`);
  };

  const scheduleCards = () => {
    store.update((s) => {
      const cards = { ...s.cards };
      for (const r of m.rules) {
        const key = `${m.id}/${r}`;
        if (!cards[key]) cards[key] = { ease: 2.5, interval: 0, reps: 0, due: today };
      }
      return { ...s, cards };
    });
  };

  const parts = full ? partsOf(full) : null;

  return (
    <div className="page">
      <Link to="/apprendre" className="back">
        <ArrowLeft aria-hidden="true" /> Sommaire
      </Link>

      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {frenchSpacing(m.title)}
        </h1>
        <p className="lead">
          <MdInline text={m.summary} />
        </p>
        <p className="meta">
          <span>
            {m.minutes}
            {'\u00A0'}min de lecture
          </span>
          <span>{count(exercises.length, 'épreuve', 'épreuves')}</span>
          {m.commands?.length ? (
            <span>
              <Commands list={m.commands} />
            </span>
          ) : null}
          {read && (
            <span>
              <Check aria-hidden="true" width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> lue
            </span>
          )}
        </p>
      </header>

      {/* Below 1100 px the aside would only come after the whole article: its contents open the lesson, folded. */}
      {parts && (
        <nav className="lesson-jump" aria-label="Dans cette leçon">
          <details>
            <summary>
              <span>
                <strong>Dans cette leçon</strong>{' '}
                <small>
                  {parts.length} parties · maîtrise&nbsp;: {masteryLabel(v, touched).toLowerCase()}
                </small>
              </span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <ol>
              {parts.map((s) => (
                <li key={s.id}>
                  <a href={`#/apprendre/${m.id}`} onClick={(e) => goTo(e, `h-${s.id}`)}>
                    {frenchSpacing(s.title)}
                  </a>
                </li>
              ))}
            </ol>
            <ReviewCards moduleId={m.id} cards={cards} onStart={scheduleCards} />
          </details>
        </nav>
      )}

      <div className="lesson">
        <article className="lesson-article">
          {full ? (
            <>
              <Article m={full} />
              <div className="btn-row">
                <Link to={`/session?mode=module&id=${m.id}`} className="btn btn-primary">
                  S’entraîner sur cette leçon
                </Link>
                <MarkRead read={read} onMark={markRead} />
                {next && (
                  <Link to={`/apprendre/${next.id}`} className="btn btn-ghost">
                    {frenchSpacing(`Leçon suivante : ${next.title}`)}
                  </Link>
                )}
              </div>
            </>
          ) : failed ? (
            <LoadFailed what="cette leçon" />
          ) : (
            <Loading what="de la leçon" />
          )}
        </article>

        {/* With the text, in one go: nothing in the column moves when its contents list arrives. */}
        {parts && (
          <aside className="lesson-aside" aria-label="Dans cette leçon">
            <nav className="lesson-toc" aria-labelledby="toc-title">
              <h2 id="toc-title" className="small" style={{ fontSize: 'var(--t-small)' }}>
                Dans cette leçon
              </h2>
              <ol>
                {parts.map((s) => (
                  <li key={s.id}>
                    <a href={`#/apprendre/${m.id}`} onClick={(e) => goTo(e, `h-${s.id}`)}>
                      {frenchSpacing(s.title)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="section">
              <div className="field">
                <span className="field-label">
                  Maîtrise{'\u00A0'}: {masteryLabel(v, touched)}
                </span>
                <span className="meter" style={pct(v)} aria-hidden="true">
                  <span />
                </span>
              </div>
              <Link to={`/session?mode=module&id=${m.id}`} className="btn btn-primary">
                S’entraîner ({count(sessionSize, 'épreuve', 'épreuves')})
              </Link>
              <ReviewCards moduleId={m.id} cards={cards} onStart={scheduleCards} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
