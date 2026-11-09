import {
  ChevronRight,
  Columns2,
  Crosshair,
  GraduationCap,
  Grid3x3,
  Layers,
  Link2,
  MonitorSmartphone,
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
import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link, navigate, pageTitle, usePageTitle } from '../app/router';
import { useProgress } from '../app/store';
import { CountryQuizzes } from '../components/CountryQuizzes';
import { JumpNav } from '../components/JumpNav';
import { EXERCISES, MODULES, RULE_CARDS, RULE_CARD_BY_KEY, THEMES } from '../content';
import { dayKey } from '../engine/dates';
import { dueCardKeys } from '../engine/progress';
import { SESSION_SIZE, matchesType, type PracticeType } from '../engine/session';
import { SEP, count } from '../lib/french';
import { frenchSpacing } from '../lib/markdown';
import { ThemeActions, themeExerciseIds, themeMastery } from './Learn';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

/** The sections of the page, for its links at the top. */
const PARTS = [
  { id: 'today-title', label: 'Recommandé' },
  { id: 'themes-title', label: 'Par thème' },
  { id: 'culture-title', label: 'Par pays' },
  { id: 'module-title', label: 'Par leçon' },
  { id: 'formats-title', label: 'Par format' },
  { id: 'exam-title', label: 'Défis et examen' },
];

export const FORMATS: { type: PracticeType; title: string; text: string; Icon: LucideIcon }[] = [
  { type: 'duel', title: 'Comparaison visuelle', text: 'Deux à quatre versions d’une même interface : choisis celle qu’un expert recommanderait.', Icon: Columns2 },
  { type: 'hotspot', title: 'Chasse aux erreurs', text: 'Clique directement sur les défauts d’une maquette, comme un correcteur sur une épreuve.', Icon: Crosshair },
  { type: 'scenario', title: 'Mise en situation', text: 'Une vraie page, un questionnaire ou une appli : règle tailles, espacements et couleurs, puis fais évaluer ton écran critère par critère.', Icon: MonitorSmartphone },
  { type: 'slider', title: 'Calibrage', text: 'Règle un interlignage, un contraste, une durée ou un espacement à l’œil, puis compare à la valeur experte.', Icon: SlidersHorizontal },
  { type: 'choice', title: 'Le bon choix', text: 'Une situation, plusieurs solutions : laquelle tient la route, et pourquoi les autres échouent.', Icon: ListTodo },
  { type: 'multi', title: 'Tout ce qui s’applique', text: 'Coche toutes les bonnes réponses, et seulement elles.', Icon: ListChecks },
  { type: 'truefalse', title: 'Vrai ou faux', text: 'Tranche vite une série d’affirmations, à peu près autant de vraies que de fausses.', Icon: Scale },
  { type: 'order', title: 'Mise en ordre', text: 'Remets une méthode, une échelle ou des priorités dans le bon ordre.', Icon: ListOrdered },
  { type: 'match', title: 'Associations', text: 'Relie concepts et définitions, besoins et réglages, marchés et conventions.', Icon: Link2 },
  { type: 'grid', title: 'Grille de critique', text: 'Note un écran sur les 10 heuristiques de Nielsen et compare ta grille à celle d’un expert.', Icon: Grid3x3 },
];

/**
 * What « Fiches » says when no card is due today, true to what the link opens (Cards.tsx): the cards never
 * reviewed, else nothing until their next review date.
 */
export function cardsState(fresh: number): string {
  return fresh > 0 ? `${fresh}\u00A0à découvrir` : 'À jour';
}

/** What waits behind a link: its count, or the state that stands for none. */
export function Pending({ n, unit, none = 'À jour' }: { n: number; unit: string; none?: string }) {
  return n > 0 ? (
    <strong>
      {n}
      <span className="visually-hidden"> {unit}</span>
    </strong>
  ) : (
    <span className="side-state">{none}</span>
  );
}

/**
 * One way to train, as a line to tap: its icon, its name, what it holds, then where it leads. The line is
 * the link: ten « Lancer » buttons under ten paragraphs made the page 6 000 px long on a phone. `text`
 * describes it where there is room (app.css); `keep` leaves it on a phone too, when the name alone does
 * not say what one commits to (an exam of thirty exercises).
 */
function Pick({ to, Icon, title, text, keep, n }: { to: string; Icon: LucideIcon; title: string; text: ReactNode; keep?: boolean; n?: number }) {
  return (
    <li>
      <Link to={to} className="pick">
        <Icon aria-hidden="true" />
        <span className="pick-text">
          <span className="pick-title">{title}</span>
          <span className={keep ? 'pick-desc pick-desc--keep' : 'pick-desc'}>{text}</span>
        </span>
        {n !== undefined && (
          <span className="pick-n num">
            {n}
            <span className="visually-hidden"> épreuves</span>
          </span>
        )}
        <ChevronRight aria-hidden="true" className="pick-go" />
      </Link>
    </li>
  );
}

export function Practice() {
  const p = useProgress();
  const today = dayKey();
  const due = EXERCISES.filter((e) => (p.items[e.id]?.due ?? '9999') <= today).length;
  const mistakes = EXERCISES.filter((e) => p.items[e.id]?.last === 'wrong').length;
  const cardsDue = dueCardKeys(p, today, RULE_CARD_BY_KEY).length;
  const cardsNew = RULE_CARDS.filter((c) => !p.cards[c.key]).length;
  const [moduleId, setModuleId] = useState(MODULES[0]?.id ?? '');
  usePageTitle(pageTitle('S’entraîner'));

  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          S’entraîner
        </h1>
        <JumpNav label="Aller à une façon de s’entraîner" items={PARTS} />
      </header>

      <section className="today" aria-labelledby="today-title">
        <div className="today-main">
          <h2 id="today-title" tabIndex={-1}>
            Session du jour
          </h2>
          <p className="today-facts">
            {SESSION_SIZE.daily}{' '}épreuves{SEP}8{' '}min
          </p>
          <Link to="/session?mode=daily" className="btn btn-primary">
            Commencer
          </Link>
        </div>
        <div className="today-side">
          <Link to="/session?mode=review" className="side-link">
            <Repeat aria-hidden="true" />
            <span className="side-text">Révisions</span>
            <Pending n={due} unit="à revoir" />
          </Link>
          <Link to="/session?mode=mistakes" className="side-link">
            <RotateCcw aria-hidden="true" />
            <span className="side-text">Mes erreurs</span>
            <Pending n={mistakes} unit="à refaire" none="Aucune" />
          </Link>
          <Link to="/fiches" className="side-link">
            <Layers aria-hidden="true" />
            <span className="side-text">Fiches</span>
            <Pending n={cardsDue} unit="à réviser" none={cardsState(cardsNew)} />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="themes-title">
        <div className="section-head">
          <h2 id="themes-title" tabIndex={-1}>
            Par thème
          </h2>
          {/* What tells the two buttons apart, and nothing else. */}
          <p className="small">
            {frenchSpacing(`S’entraîner : ${SESSION_SIZE.theme} épreuves corrigées une à une. S’évaluer : ${SESSION_SIZE.evaluation}, corrigées à la fin.`)}
          </p>
        </div>
        <ul className="themes">
          {THEMES.map((t) => {
            const tm = themeMastery(p, t);
            return (
              <li key={t.id} className="theme-row">
                <div className="theme-text">
                  <h3>{frenchSpacing(t.title)}</h3>
                  <p>
                    {count(themeExerciseIds(t).length, 'épreuve', 'épreuves')}
                    {SEP}
                    {tm.label.toLowerCase()}
                  </p>
                  <span className="meter" style={pct(tm.value)} aria-hidden="true">
                    <span />
                  </span>
                </div>
                <ThemeActions theme={t} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section" aria-labelledby="culture-title">
        <div className="section-head">
          <h2 id="culture-title" tabIndex={-1}>
            Par pays
          </h2>
          <Link to="/cultures" className="small">
            Profils des marchés
          </Link>
        </div>
        <CountryQuizzes />
      </section>

      <section className="section" aria-labelledby="module-title">
        <h2 id="module-title" tabIndex={-1}>
          Par leçon
        </h2>
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
            {THEMES.map((t) => (
              <optgroup key={t.id} label={t.title}>
                {MODULES.filter((m) => m.theme === t.id).map((m) => (
                  <option key={m.id} value={m.id}>
                    {frenchSpacing(m.title)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button type="submit" className="btn btn-secondary">
            Lancer
          </button>
        </form>
      </section>

      <section className="section" aria-labelledby="formats-title">
        <h2 id="formats-title" tabIndex={-1}>
          Par format d’épreuve
        </h2>
        <ul className="picks">
          {FORMATS.map((f) => (
            <Pick
              key={f.type}
              to={`/session?mode=type&id=${f.type}`}
              Icon={f.Icon}
              title={f.title}
              text={frenchSpacing(f.text)}
              n={EXERCISES.filter((e) => matchesType(e, f.type)).length}
            />
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="exam-title">
        <h2 id="exam-title" tabIndex={-1}>
          Défis et examen
        </h2>
        <ul className="picks">
          <Pick
            to="/session?mode=blitz"
            Icon={Timer}
            title="Défi chrono"
            keep
            text={
              <>
                90{' '}secondes de vrai ou faux
                {p.records.blitz ? `${SEP}record : ${p.records.blitz}` : ''}
              </>
            }
          />
          <Pick
            to="/session?mode=exam"
            Icon={GraduationCap}
            title="Examen blanc"
            keep
            text={`${SESSION_SIZE.exam} épreuves, corrigées à la fin`}
          />
        </ul>
      </section>
    </div>
  );
}
