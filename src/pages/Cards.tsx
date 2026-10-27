import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, navigate } from '../app/router';
import { store } from '../app/store';
import { MODULE_BY_ID, RULE_CARDS, type RuleCard } from '../content';
import { dayKey } from '../engine/dates';
import { recordCard } from '../engine/progress';
import { shuffle } from '../engine/random';
import { CARD_GRADES, type CardGrade } from '../engine/srs';
import { MdInline } from '../lib/markdown';

const SIZE = 20;

/** Due cards first, then new ones (from the chosen module, or across all lessons). */
function pickCards(moduleId: string | null): RuleCard[] {
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
  const card = cards[index];
  const module = moduleId ? MODULE_BY_ID.get(moduleId) : undefined;

  const gradeCard = (g: CardGrade) => {
    if (!card) return;
    store.update((s) => recordCard(s, card.key, g));
    setGraded((x) => [...x, g]);
    setShown(false);
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!shown && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        setShown(true);
      } else if (shown && ['1', '2', '3', '4'].includes(e.key)) {
        gradeCard((Number(e.key) - 1) as CardGrade);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.getElementById('main-title')?.focus({ preventScroll: true });
  }, [index]);

  const title = module ? `Fiches — ${module.title}` : 'Fiches de révision';

  if (!card) {
    const known = graded.filter((g) => g >= 2).length;
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <h1 id="main-title" tabIndex={-1}>
            {cards.length ? 'Fiches terminées' : title}
          </h1>
          <p className="lead">
            {cards.length
              ? `${known} sur ${graded.length} retrouvées sans aide. Chaque fiche reviendra au moment où tu serais sur le point de l’oublier.`
              : 'Aucune fiche à réviser pour le moment : les fiches déjà vues reviendront à leur date de révision.'}
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
    <div className="page page--narrow">
      <button
        type="button"
        className="btn btn-ghost"
        style={{ alignSelf: 'flex-start', marginInlineStart: 'calc(var(--s3) * -1)' }}
        onClick={() => (module ? navigate(`/apprendre/${module.id}`) : navigate('/entrainement'))}
      >
        <X aria-hidden="true" /> Arrêter la révision
      </button>
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {title}
        </h1>
        <p className="muted">
          Fiche {index + 1} sur {cards.length}. Essaie de répondre de tête avant de retourner la fiche, puis dis honnêtement comment ça s’est
          passé.
        </p>
      </header>
      <div className="card-stack">
        <div className="flashcard" aria-live="polite">
          <p className="flashcard-q">
            <MdInline text={card.rule.front} />
          </p>
          {shown && (
            <p className="flashcard-a">
              <MdInline text={card.rule.back} />
            </p>
          )}
          <p className="flashcard-from">Leçon : {from?.title}</p>
        </div>
        {!shown ? (
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={() => setShown(true)}>
              Retourner la fiche
            </button>
            <span className="shortcut-hint">Espace ou Entrée</span>
          </div>
        ) : (
          <>
            <div className="grades" role="group" aria-label="Comment ça s’est passé ?">
              {CARD_GRADES.map((g, i) => (
                <button key={g.grade} type="button" className="btn btn-secondary" aria-keyshortcuts={String(i + 1)} onClick={() => gradeCard(g.grade)}>
                  {g.label}
                  <small>{g.hint}</small>
                </button>
              ))}
            </div>
            <span className="shortcut-hint">Touches 1 à 4</span>
          </>
        )}
      </div>
    </div>
  );
}
