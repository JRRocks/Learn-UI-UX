import { Link } from '../app/router';

export function NotFound() {
  return (
    <div className="page page--narrow">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Page introuvable
        </h1>
        <p className="lead">Ce lien ne mène nulle part, ou la leçon a changé de nom.</p>
      </header>
      <div className="btn-row">
        <Link to="/" className="btn btn-primary">
          Retour à l’accueil
        </Link>
        <Link to="/apprendre" className="btn btn-secondary">
          Voir le sommaire
        </Link>
      </div>
    </div>
  );
}
