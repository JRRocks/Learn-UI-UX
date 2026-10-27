import { Link } from '../app/router';
import { EXERCISES, MODULES, RULE_CARDS } from '../content';
import { CULTURES } from '../content/cultures';

export function About() {
  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          À propos
        </h1>
        <p className="lead">
          Épreuves est un atelier pour progresser en UI/UX : {MODULES.length} leçons, {EXERCISES.length} épreuves, {RULE_CARDS.length} fiches
          et {CULTURES.length} profils de marchés.
        </p>
      </header>

      <section className="section prose">
        <h2>D’où vient le contenu</h2>
        <p>
          Les leçons et les épreuves s’appuient sur les références de design d’
          <a href="https://github.com/pbakaus/impeccable" target="_blank" rel="noopener noreferrer">
            impeccable
          </a>{' '}
          (Paul Bakaus, licence Apache-2.0) : modes de visite, plancher de qualité, typographie, couleur, espace, mouvement, rédaction,
          robustesse, critique heuristique, personas, audit et les 62 règles de son détecteur d’anti-patterns. Ces textes ont été traduits,
          adaptés et complétés ; ils ne sont ni publiés ni approuvés par l’auteur d’impeccable.
        </p>
        <p>
          Ils sont enrichis de sources reconnues : Nielsen Norman Group, W3C (WCAG 2.2, i18n), Laws of UX, Deceptive Patterns, Material Design,
          Apple Human Interface Guidelines, web.dev, MDN, la CNIL, et des travaux sur la conception interculturelle (Hofstede, Hall, Marcus).
          Chaque leçon et chaque correction citent leurs sources.
        </p>
        <h2>Comment ça marche</h2>
        <p>
          Chaque épreuve est corrigée avec le choix recommandé, le pourquoi et la règle à retenir. Les épreuves suivent un système de boîtes
          de Leitner, les fiches une variante de SM-2 : ce que tu rates revient vite, ce que tu maîtrises s’espace.
        </p>
        <p>Ta progression reste dans ton navigateur (stockage local). Aucun compte, aucun suivi.</p>
        <h2>Crédits</h2>
        <ul>
          <li>Polices : Schibsted Grotesk (Schibsted Media Group) et Atkinson Hyperlegible Mono (Braille Institute), sous SIL Open Font License.</li>
          <li>Icônes : Lucide (licence ISC).</li>
          <li>Contenu de design : impeccable, Paul Bakaus (Apache-2.0).</li>
        </ul>
      </section>
      <Link to="/" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
        Retour à l’accueil
      </Link>
    </div>
  );
}
