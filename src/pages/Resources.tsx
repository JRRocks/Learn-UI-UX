import { useMemo, useState } from 'react';
import { Link } from '../app/router';
import { Mock } from '../components/Mock';
import { DETECTOR_RULES } from '../content/detectorRules';
import { CHEATSHEET, COMMANDS, GLOSSARY, HEURISTICS, PERSONAS, SEVERITY } from '../content/resources';
import { SOURCES, resolveSource } from '../content/sources';
import type { AntipatternEntry } from '../engine/types';

const catalogFile = import.meta.glob<{ ANTIPATTERNS?: AntipatternEntry[] }>('../content/antipatterns.ts', { eager: true });
const ANTIPATTERNS: AntipatternEntry[] = Object.values(catalogFile)[0]?.ANTIPATTERNS ?? [];

const TABS = [
  { id: 'aide-memoire', label: 'Aide-mémoire' },
  { id: 'anti-patterns', label: 'Anti-patterns' },
  { id: 'critique', label: 'Heuristiques et personas' },
  { id: 'commandes', label: 'Commandes impeccable' },
  { id: 'glossaire', label: 'Glossaire' },
  { id: 'liens', label: 'Sources' },
];

const SEVERITY_LABEL = { erreur: 'Erreur', avertissement: 'Avertissement', conseil: 'Conseil' };

function SourceLink({ k }: { k: string }) {
  const r = resolveSource(k);
  return r.url ? (
    <a href={r.url} target="_blank" rel="noopener noreferrer">
      {r.label}
    </a>
  ) : (
    <>{r.label}</>
  );
}

function Cheatsheet() {
  return (
    <div className="cheats">
      {CHEATSHEET.map((g) => (
        <section key={g.title} className="cheat" aria-labelledby={`cs-${g.title}`}>
          <h2 id={`cs-${g.title}`}>{g.title}</h2>
          <table>
            <tbody>
              {g.rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small muted" style={{ marginTop: 'var(--s2)' }}>
            Source : <SourceLink k={g.source} />
          </p>
        </section>
      ))}
    </div>
  );
}

function Catalog() {
  const [q, setQ] = useState('');
  const [family, setFamily] = useState<'all' | 'cliche' | 'qualite'>('all');
  const list = ANTIPATTERNS.length
    ? ANTIPATTERNS
    : DETECTOR_RULES.map((r) => ({ ...r, description: '', fix: '' }) as AntipatternEntry);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return list.filter(
      (a) =>
        (family === 'all' || a.family === family) &&
        (!needle || `${a.name} ${a.id} ${a.description} ${a.fix}`.toLowerCase().includes(needle)),
    );
  }, [q, family, list]);

  return (
    <div className="section">
      <p className="muted" style={{ maxWidth: 'var(--measure)' }}>
        Les {DETECTOR_RULES.length} règles du détecteur déterministe d’impeccable. Les <strong>clichés</strong> trahissent une interface
        générée sans décision ; les défauts de <strong>qualité</strong> nuisent à la lecture ou à l’usage. Une règle « conseil » demande un
        jugement : elle peut être légitime dans un univers qui l’assume.
      </p>
      <div className="catalog-filters">
        <div className="field">
          <label htmlFor="ap-q">Rechercher</label>
          <input id="ap-q" className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ex. contraste, dégradé, carte" />
        </div>
        <div className="segmented" role="group" aria-label="Famille">
          {(
            [
              ['all', 'Toutes'],
              ['cliche', 'Clichés'],
              ['qualite', 'Qualité'],
            ] as const
          ).map(([v, l]) => (
            <button key={v} type="button" aria-pressed={family === v} onClick={() => setFamily(v)}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <p className="small muted" aria-live="polite">
        {shown.length} règle{shown.length > 1 ? 's' : ''}
      </p>
      <ul className="catalog">
        {shown.map((a) => (
          <li key={a.id}>
            <div className="catalog-head">
              <h3>{a.name}</h3>
              <code>{a.id}</code>
              <span className="chip">{a.family === 'cliche' ? 'Cliché' : 'Qualité'}</span>
              <span className="chip">{SEVERITY_LABEL[a.severity]}</span>
            </div>
            {a.description && <p>{a.description}</p>}
            {a.fix && (
              <p className="fix">
                <strong>À la place :</strong> {a.fix}
              </p>
            )}
            {a.demo && (
              <div className="example-pair">
                <figure>
                  <div className="stage">
                    <Mock visual={a.demo.bad} />
                  </div>
                  <figcaption>À éviter</figcaption>
                </figure>
                {a.demo.good && (
                  <figure>
                    <div className="stage">
                      <Mock visual={a.demo.good} />
                    </div>
                    <figcaption>Préférer</figcaption>
                  </figure>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Critique() {
  return (
    <div className="split">
      <section className="section" aria-labelledby="heur-title">
        <h2 id="heur-title">Les 10 heuristiques de Nielsen</h2>
        <dl className="defs">
          {HEURISTICS.map((h) => (
            <div key={h.n}>
              <dt>
                {h.n}. {h.title}
              </dt>
              <dd>{h.text}</dd>
            </div>
          ))}
        </dl>
        <h2>Sévérité</h2>
        <dl className="defs">
          {SEVERITY.map((s) => (
            <div key={s.id}>
              <dt>
                {s.id} — {s.title}
              </dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
        <Link to="/apprendre/heuristics">Leçon : heuristiques et sévérité</Link>
      </section>
      <section className="section" aria-labelledby="pers-title">
        <h2 id="pers-title">Cinq personas de test</h2>
        <dl className="defs">
          {PERSONAS.map((p) => (
            <div key={p.name}>
              <dt>
                {p.name}, {p.role.toLowerCase()}
              </dt>
              <dd>
                {p.text} <br />
                <strong>Signaux d’alerte :</strong> {p.flags}
              </dd>
            </div>
          ))}
        </dl>
        <Link to="/apprendre/personas">Leçon : personas de test</Link>
      </section>
    </div>
  );
}

function Commands() {
  return (
    <div className="section">
      <p className="muted" style={{ maxWidth: 'var(--measure)' }}>
        impeccable donne un vocabulaire commun pour parler de design avec un agent de code : chaque commande correspond à une intention. Les
        leçons de cette application suivent le même découpage.
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">Commande</th>
              <th scope="col">Famille</th>
              <th scope="col">Quand l’utiliser</th>
            </tr>
          </thead>
          <tbody>
            {COMMANDS.map((c) => (
              <tr key={c.cmd}>
                <th scope="row">
                  <code>/impeccable {c.cmd}</code>
                </th>
                <td>{c.family}</td>
                <td>{c.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small">
        Projet : <SourceLink k="imp:site" /> · code source sur{' '}
        <a href="https://github.com/pbakaus/impeccable" target="_blank" rel="noopener noreferrer">
          github.com/pbakaus/impeccable
        </a>{' '}
        (Apache-2.0).
      </p>
    </div>
  );
}

function Glossary() {
  return (
    <dl className="defs">
      {GLOSSARY.map((g) => (
        <div key={g.term}>
          <dt>{g.term}</dt>
          <dd>{g.def}</dd>
        </div>
      ))}
    </dl>
  );
}

function Links() {
  const groups: [string, string[]][] = [
    ['impeccable', Object.keys(SOURCES).filter((k) => k.startsWith('imp:'))],
    ['Références web', Object.keys(SOURCES).filter((k) => !k.startsWith('imp:'))],
  ];
  return (
    <div className="split">
      {groups.map(([title, keys]) => (
        <section key={title} className="section" aria-labelledby={`l-${title}`}>
          <h2 id={`l-${title}`}>{title}</h2>
          <ul className="sources">
            {keys.map((k) => (
              <li key={k}>
                <SourceLink k={k} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function Resources({ tab }: { tab?: string }) {
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];
  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Ressources
        </h1>
        <p className="lead">Les chiffres à garder sous la main, le catalogue des anti-patterns, les grilles de critique et le vocabulaire.</p>
      </header>
      <nav className="segmented" aria-label="Rubriques des ressources" style={{ alignSelf: 'flex-start' }}>
        {TABS.map((t) => (
          <Link key={t.id} to={`/ressources/${t.id}`} aria-current={t.id === current.id ? 'page' : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>
      {current.id === 'aide-memoire' && <Cheatsheet />}
      {current.id === 'anti-patterns' && <Catalog />}
      {current.id === 'critique' && <Critique />}
      {current.id === 'commandes' && <Commands />}
      {current.id === 'glossaire' && <Glossary />}
      {current.id === 'liens' && <Links />}
    </div>
  );
}
