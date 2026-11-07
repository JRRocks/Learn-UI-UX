import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link, navigate } from '../app/router';
import { store } from '../app/store';
import { SETTLE_MS, digitOf, eventOrigin, handlesOwnKeys, hasModifier, within } from '../components/exercise/keys';
import { MODULE_BY_ID, RULE_CARDS, useRuleTexts, type RuleRef } from '../content';
import { dayKey } from '../engine/dates';
import { recordCard } from '../engine/progress';
import { shuffle } from '../engine/random';
import { CARD_GRADES, type CardGrade } from '../engine/srs';
import { plural } from '../lib/french';
import { MdInline } from '../lib/markdown';
import { LoadFailed, Loading } from './LoadFailed';

const SIZE = 20;

/** Due cards first, then new ones (from the chosen module, or across all lessons). */
function pickCards(moduleId: string | null): RuleRef[] {
  const s = store.get();
  const today = dayKey();
  const pool = moduleId ? RULE_CARDS.filter((c) => c.moduleId === moduleId) : RULE_CARDS;
  const due = pool.filter((c) => s.cards[c.key] && s.cards[c.key].due <= today);
  const fresh = shuffle(pool.filter((c) => !s.cards[c.key]));
  const out = [...shuffle(due), ...fresh].slice(0, SIZE);
  return out;
}

export function Cards({ query }: { query: URLSearchParams }) {
  const moduleId = query.get('module');
  const cards = useMemo(() => pickCards(moduleId), [moduleId]);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [graded, setGraded] = useState<CardGrade[]>([]);
  const stackRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);
  const shownAt = useRef(0);
  const card = cards[index];
  const module = moduleId ? MODULE_BY_ID.get(moduleId) : undefined;
  // The cards are picked from the light index; their text comes with the lesson, or in one small chunk.
  const { value: texts, failed } = useRuleTexts(module ? module.id : null);
  const rule = card && texts?.get(card.key);

  const flip = () => {
    shownAt.current = performance.now();
    setShown(true);
  };

  const gradeCard = (g: CardGrade) => {
    if (!card || !rule || !shown) return;
    store.update((s) => recordCard(s, card.key, g));
    setGraded((x) => [...x, g]);
    setShown(false);
    setIndex((i) => i + 1);
  };

  // The grades take the place of « Retourner la fiche »: the second click of a double click lands
  // on « À revoir » and must not grade a card whose answer was never read (logic-21). Only a pointer
  // click can be that second click: Enter or Space on a grade button (detail 0) always grades.
  const onGradeClick = (e: MouseEvent, g: CardGrade) => {
    if (e.detail > 1 || (e.detail > 0 && performance.now() - shownAt.current < SETTLE_MS)) return;
    gradeCard(g);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!rule || e.defaultPrevented || hasModifier(e) || e.repeat) return;
      if (!shown && (e.key === ' ' || e.key === 'Enter')) {
        // Buttons and links keep their own Enter and Space: « Arrêter la révision » stops (logic-9).
        if (handlesOwnKeys(eventOrigin(e))) return;
        e.preventDefault();
        flip();
        return;
      }
      // Digits grade only while the focus is on the card (WCAG 2.1.4); AZERTY sends « & é " ' » there (logic-8).
      const n = digitOf(e);
      if (shown && n !== null && n >= 1 && n <= CARD_GRADES.length && within(e, stackRef.current)) gradeCard((n - 1) as CardGrade);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.getElementById('main-title')?.focus({ preventScroll: true });
  }, [index]);

  // The flashcards open at their top, the title that has the focus in view: the app leaves the pages
  // without navigation where they are, and from a page scrolled down they opened at their bottom on a
  // short screen. Nothing moves when the texts arrive: the learner may have scrolled in the meantime.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Once a card is graded, the next one shows its question, and a turned card its answer: on a short
  // screen (200 % zoom and more) the page kept its place, the next question above the screen and the
  // answer below it. Only as far as needed (the header above would push the card out of a short screen).
  // The end of the set starts at its top, as the results of the challenge do: its title has the focus.
  useEffect(() => {
    if (index === 0) return;
    if (questionRef.current) questionRef.current.scrollIntoView({ block: 'nearest' });
    else window.scrollTo({ top: 0 });
  }, [index]);

  // « Retourner la fiche » disappears once used: the focus moves to the answer instead of being lost.
  useEffect(() => {
    if (!shown) return;
    answerRef.current?.focus({ preventScroll: true });
    answerRef.current?.scrollIntoView({ block: 'nearest' });
  }, [shown]);

  const title = module ? `Fiches — ${module.title}` : 'Fiches de révision';

  if (!card) {
    const known = graded.filter((g) => g >= 2).length;
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <h1 id="main-title" tabIndex={-1}>
            {cards.length ? 'Fiches terminées' : <MdInline text={title} />}
          </h1>
          <p className="lead">
            {cards.length
              ? `${known} sur ${graded.length} ${plural(known, 'retrouvée', 'retrouvées')} sans aide. Chaque fiche reviendra au moment où tu serais sur le point de l’oublier.`
              : 'Aucune fiche à réviser pour le moment\u00A0: les fiches déjà vues reviendront à leur date de révision.'}
          </p>
        </header>
        <div className="btn-row">
          <Link to="/session?mode=daily" className="btn btn-primary">
            Passer à la session du jour
          </Link>
          <Link to="/apprendre" className="btn btn-secondary">
            Choisir une leçon
          </Link>
        </div>
      </div>
    );
  }

  const from = MODULE_BY_ID.get(card.moduleId);
  return (
    <div className="player">
      {/* Same way out as a session or the timed challenge: the labelled X of the top bar. */}
      <div className="player-top">
        <button
          type="button"
          className="icon-btn"
          onClick={() => (module ? navigate(`/apprendre/${module.id}`) : navigate('/entrainement'))}
          aria-label="Arrêter la révision"
        >
          <X aria-hidden="true" />
        </button>
        <div className="player-progress">
          <div className="player-progress-label">
            <span>Révision des fiches</span>
            <span className="num">
              {index + 1} / {cards.length}
            </span>
          </div>
          <div
            className="meter meter--mark"
            role="progressbar"
            aria-label="Avancement de la révision"
            aria-valuemin={0}
            aria-valuemax={cards.length}
            aria-valuenow={index}
            style={{ '--value': `${(index / cards.length) * 100}%` } as CSSProperties}
          >
            <span />
          </div>
        </div>
      </div>
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          <MdInline text={title} />
        </h1>
        <p className="muted">
          Fiche {index + 1} sur {cards.length}. Essaie de répondre de tête avant de retourner la fiche, puis dis honnêtement comment ça s’est
          passé.
        </p>
      </header>
      {!rule ? (
        failed ? (
          <LoadFailed what="les fiches" />
        ) : (
          <Loading what="des fiches" />
        )
      ) : (
        <div className="card-stack" ref={stackRef}>
          <div className="flashcard">
            {/* Each new question is announced; the answer gets the focus when the card turns. */}
            <p ref={questionRef} className="flashcard-q" aria-live="polite">
              <MdInline text={rule.front} />
            </p>
            {shown && (
              <p className="flashcard-a" ref={answerRef} tabIndex={-1}>
                <MdInline text={rule.back} />
              </p>
            )}
            <p className="flashcard-from">
              Leçon{'\u00A0'}: <MdInline text={from?.title ?? ''} />
            </p>
          </div>
          {!shown ? (
            <div className="btn-row">
              <button type="button" className="btn btn-primary" onClick={flip}>
                Retourner la fiche
              </button>
              <span className="shortcut-hint">Espace ou Entrée</span>
            </div>
          ) : (
            <>
              <div className="grades" role="group" aria-label="Comment ça s’est passé ?">
                {CARD_GRADES.map((g, i) => (
                  <button
                    key={g.grade}
                    type="button"
                    className="btn btn-secondary"
                    aria-keyshortcuts={String(i + 1)}
                    onClick={(e) => onGradeClick(e, g.grade)}
                  >
                    {g.label}
                    <small>{g.hint}</small>
                  </button>
                ))}
              </div>
              <span className="shortcut-hint">Touches 1 à 4</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
