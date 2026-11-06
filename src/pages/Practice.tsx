import {
  CalendarCheck,
  Columns2,
  Crosshair,
  GraduationCap,
  Grid3x3,
  Layers,
  Link2,
  ListChecks,
  ListOrdered,
  ListTodo,
  Repeat,
  RotateCcw,
  Scale,
  SlidersHorizontal,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link, navigate, pageTitle, usePageTitle } from '../app/router';
import { useProgress } from '../app/store';
import { EXERCISES, MODULES, RULE_CARDS, RULE_CARD_BY_KEY } from '../content';
import { CULTURE_NAMES } from '../content/cultures';
import { dayKey } from '../engine/dates';
import { dueCardKeys } from '../engine/progress';
import { SESSION_SIZE, matchesType, type PracticeType } from '../engine/session';
import { count } from '../lib/french';
import { frenchSpacing } from '../lib/markdown';

const FORMATS: { type: PracticeType; title: string; text: string; Icon: LucideIcon }[] = [
  { type: 'duel', title: 'Comparaison visuelle', text: 'Deux à quatre versions d’une même interface : choisis celle qu’un expert recommanderait.', Icon: Columns2 },
  { type: 'hotspot', title: 'Chasse aux erreurs', text: 'Clique directement sur les défauts d’une maquette, comme un correcteur sur une épreuve.', Icon: Crosshair },
  { type: 'slider', title: 'Calibrage', text: 'Règle un interlignage, un contraste, une durée ou un espacement à l’œil, puis compare à la valeur experte.', Icon: SlidersHorizontal },
  { type: 'choice', title: 'Le bon choix', text: 'Une situation, plusieurs solutions : laquelle tient la route, et pourquoi les autres échouent.', Icon: ListTodo },
  { type: 'multi', title: 'Tout ce qui s’applique', text: 'Coche toutes les bonnes réponses, et seulement elles.', Icon: ListChecks },
  { type: 'truefalse', title: 'Vrai ou faux', text: 'Des idées reçues à démêler, vite.', Icon: Scale },
  { type: 'order', title: 'Mise en ordre', text: 'Remets une méthode, une échelle ou des priorités dans le bon ordre.', Icon: ListOrdered },
  { type: 'match', title: 'Associations', text: 'Relie concepts et définitions, besoins et réglages, marchés et conventions.', Icon: Link2 },
  { type: 'grid', title: 'Grille de critique', text: 'Note un écran sur les 10 heuristiques de Nielsen et compare ta grille à celle d’un expert.', Icon: Grid3x3 },
];

export function Practice() {
  const p = useProgress();
  const today = dayKey();
  const due = EXERCISES.filter((e) => (p.items[e.id]?.due ?? '9999') <= today).length;
  const mistakes = EXERCISES.filter((e) => p.items[e.id]?.last === 'wrong').length;
  const cardsDue = dueCardKeys(p, today, RULE_CARD_BY_KEY).length;
  const cardsScheduled = RULE_CARDS.some((c) => p.cards[c.key]);
  const [moduleId, setModuleId] = useState(MODULES[0]?.id ?? '');
  const cultureCount = EXERCISES.filter((e) => e.culture || e.module === 'culture').length;
  usePageTitle(pageTitle('S’entraîner'));

  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          S’entraîner
        </h1>
        <p className="lead">
          {EXERCISES.length} épreuves, chacune corrigée avec le choix recommandé, le pourquoi et la règle à retenir. Les erreurs reviennent
          automatiquement en révision.
        </p>
      </header>

      <section className="today" aria-label="Sessions recommandées">
        <div className="today-main">
          <h2>Session du jour</h2>
          <p>{frenchSpacing(`${SESSION_SIZE.daily} épreuves équilibrées : d’abord ce qui est à revoir, puis de nouvelles notions, réparties sur plusieurs leçons.`)}</p>
          <Link to="/session?mode=daily" className="btn btn-primary">
            Commencer
          </Link>
        </div>
        <div className="today-side">
          <Link to="/session?mode=review" className="side-link">
            <Repeat aria-hidden="true" />
            <span>
              Révisions espacées
              <small>{due ? 'Épreuves à revoir aujourd’hui' : 'Rien à revoir aujourd’hui'}</small>
            </span>
            {due > 0 && <strong>{due}</strong>}
          </Link>
          <Link to="/session?mode=mistakes" className="side-link">
            <RotateCcw aria-hidden="true" />
            <span>
              Mes erreurs
              <small>{mistakes ? 'Épreuves ratées, jusqu’à ce que tu les réussisses' : 'Aucune erreur en attente'}</small>
            </span>
            {mistakes > 0 && <strong>{mistakes}</strong>}
          </Link>
          <Link to="/fiches" className="side-link">
            <Layers aria-hidden="true" />
            <span>
              Fiches de révision
              <small>
                {cardsDue ? 'Fiches à réviser aujourd’hui' : cardsScheduled ? 'Rien à réviser aujourd’hui' : `${RULE_CARDS.length} règles d’or à découvrir`}
              </small>
            </span>
            {cardsDue > 0 && <strong>{cardsDue}</strong>}
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="formats-title">
        <div className="section-head">
          <h2 id="formats-title">Par format d’épreuve</h2>
          <p className="small">{frenchSpacing('Chaque format entraîne un réflexe différent : voir, repérer, doser, décider.')}</p>
        </div>
        <ul className="formats">
          {FORMATS.map((f) => {
            const n = EXERCISES.filter((e) => matchesType(e, f.type)).length;
            return (
              <li key={f.type} className="format">
                <f.Icon aria-hidden="true" />
                <div>
                  <h3>{f.title}</h3>
                  <p>
                    {frenchSpacing(f.text)} <span className="num">({n})</span>
                  </p>
                </div>
                <Link to={`/session?mode=type&id=${f.type}`} className="btn btn-secondary" aria-label={`Lancer : ${f.title}`}>
                  Lancer
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="split">
        <section className="section" aria-labelledby="module-title">
          <h2 id="module-title">Par leçon</h2>
          <p className="muted">{SESSION_SIZE.module} épreuves d’une leçon à la fois, les nouvelles d’abord.</p>
          <form
            className="btn-row"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/session?mode=module&id=${moduleId}`);
            }}
          >
            <label htmlFor="module-pick" className="visually-hidden">
              Leçon
            </label>
            <select id="module-pick" className="select" value={moduleId} onChange={(e) => setModuleId(e.target.value)}>
              {MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {frenchSpacing(m.title)}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-secondary">
              Lancer
            </button>
          </form>
        </section>

        <section className="section" aria-labelledby="culture-title">
          <h2 id="culture-title">Cultures</h2>
          <p className="muted">
            {cultureCount} épreuves sur les différences d’interface entre {Object.keys(CULTURE_NAMES).length} marchés et la façon de s’y adapter.
          </p>
          <div className="btn-row">
            <Link to="/session?mode=culture" className="btn btn-secondary" aria-label="Lancer : Cultures">
              Lancer
            </Link>
            <Link to="/cultures" className="btn btn-ghost">
              Voir les marchés
            </Link>
          </div>
        </section>
      </div>

      <section className="section" aria-labelledby="exam-title">
        <div className="section-head">
          <h2 id="exam-title">Défis</h2>
        </div>
        <div className="format" style={{ borderTop: '1px solid var(--rule)' }}>
          <Timer aria-hidden="true" />
          <div>
            <h3>Défi chrono</h3>
            <p>
              90{'\u00A0'}secondes de vrai ou faux, toutes leçons confondues. Le chrono s’arrête pendant la correction.
              {p.records.blitz ? frenchSpacing(` Ton record : ${count(p.records.blitz, 'bonne réponse', 'bonnes réponses')}.`) : ''}
            </p>
          </div>
          <Link to="/session?mode=blitz" className="btn btn-secondary">
            Relever le défi
          </Link>
        </div>
        <div className="format">
          <GraduationCap aria-hidden="true" />
          <div>
            <h3>Examen blanc</h3>
            <p>
              {frenchSpacing(
                `${SESSION_SIZE.exam} épreuves de toutes les leçons, sans correction pendant l’examen : tout est expliqué dans le bilan. 80 % de réussite débloque un badge.`,
              )}
            </p>
          </div>
          <Link to="/session?mode=exam" className="btn btn-primary">
            Passer l’examen
          </Link>
        </div>
        <p className="small muted">
          <CalendarCheck aria-hidden="true" width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
          {frenchSpacing('Astuce : une session par jour vaut mieux qu’un marathon par semaine — la répétition espacée fait le reste.')}
        </p>
      </section>
    </div>
  );
}
