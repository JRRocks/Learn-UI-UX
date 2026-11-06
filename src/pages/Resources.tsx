import { CircleCheck, CircleX } from 'lucide-react';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { Mock } from '../components/Mock';
import { DETECTOR_RULES } from '../content/detectorRules';
import { CHEATSHEET, COMMANDS, GLOSSARY, HEURISTICS, PERSONAS, SEVERITY } from '../content/resources';
import { SOURCES, resolveSource } from '../content/sources';
import type { AntipatternEntry, Source } from '../engine/types';
import { count } from '../lib/french';
import { MdInline, frenchSpacing } from '../lib/markdown';
import { useLoadState } from '../lib/useLoad';

// The catalog (with its demo mocks) is its own chunk, fetched when the tab opens.
const catalogFile = import.meta.glob<{ ANTIPATTERNS?: AntipatternEntry[] }>('../content/antipatterns.ts');
const loadCatalog = async (): Promise<AntipatternEntry[]> => {
  const [load] = Object.values(catalogFile);
  return load ? ((await load()).ANTIPATTERNS ?? []) : [];
};

const TABS = [
  { id: 'aide-memoire', label: 'Aide-mémoire' },
  { id: 'anti-patterns', label: 'Anti-patterns' },
  { id: 'critique', label: 'Heuristiques et personas' },
  { id: 'commandes', label: 'Commandes impeccable' },
  { id: 'glossaire', label: 'Glossaire' },
  { id: 'liens', label: 'Sources' },
];

const SEVERITY_LABEL = { erreur: 'Erreur', avertissement: 'Avertissement', conseil: 'Conseil' };
const FAMILY_LABEL = { all: '', cliche: ' dans les clichés', qualite: ' dans les défauts de qualité' };

/** An id usable in `aria-labelledby` (which splits on spaces): « Contraste (WCAG 2.2) » → `contraste-wcag-2-2`. */
const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function SourceLink({ k }: { k: Source }) {
  const r = resolveSource(k);
  return r.url ? (
    <a href={r.url} target="_blank" rel="noopener noreferrer">
      {frenchSpacing(r.label)}
    </a>
  ) : (
    <>{frenchSpacing(r.label)}</>
  );
}

function Cheatsheet() {
  return (
    <div className="cheats">
      {CHEATSHEET.map((g) => {
        // Each figure is credited: the group's source, plus the ones its rows name.
        const sources = [...new Map([g.source, ...g.rows.map(([, , s]) => s)].filter((s): s is Source => Boolean(s)).map((s) => [resolveSource(s).label, s])).values()];
        return (
          <section key={g.title} className="cheat" aria-labelledby={`cs-${slug(g.title)}`}>
            <h2 id={`cs-${slug(g.title)}`}>{g.title}</h2>
            <table>
              <tbody>
                {g.rows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{frenchSpacing(k)}</th>
                    <td>{frenchSpacing(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="small muted" style={{ marginTop: 'var(--s2)' }}>
              {sources.length > 1 ? 'Sources' : 'Source'}
              {' '}:{' '}
              {sources.map((s, i) => (
                <span key={i}>
                  {i > 0 && ' · '}
                  <SourceLink k={s} />
                </span>
              ))}
            </p>
          </section>
        );
      })}
    </div>
  );
}

const FALLBACK: AntipatternEntry[] = DETECTOR_RULES.map((r) => ({ ...r, description: '', fix: '' }));
/** The detector's official (English) rule names, which lessons quote: shown and searchable too. */
const EN_NAME = new Map(DETECTOR_RULES.map((r) => [r.id, r.name]));

function Catalog() {
  const [q, setQ] = useState('');
  const [family, setFamily] = useState<'all' | 'cliche' | 'qualite'>('all');
  const searchRef = useRef<HTMLInputElement>(null);
  const { value: loaded, failed } = useLoadState('catalog', loadCatalog);
  // The detector's own (English) names stand in only when the French catalog cannot be fetched.
  const list = loaded?.length ? loaded : failed ? FALLBACK : null;
  // The field answers each key at once; the list (up to a hundred mocks) follows when the browser has time.
  const query = useDeferredValue(q);
  const shownFamily = useDeferredValue(family);
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (list ?? []).filter(
      (a) =>
        (shownFamily === 'all' || a.family === shownFamily) &&
        (!needle || `${a.name} ${EN_NAME.get(a.id) ?? ''} ${a.id} ${a.description} ${a.fix}`.toLowerCase().includes(needle)),
    );
  }, [query, shownFamily, list]);
  const clear = () => {
    setQ('');
    setFamily('all');
    // The button disappears with the empty state: the focus goes to the search field, ready for another word.
    searchRef.current?.focus();
  };

  return (
    <div className="section">
      <p className="muted" style={{ maxWidth: 'var(--measure)' }}>
        <MdInline
          text={`Les ${DETECTOR_RULES.length} règles du détecteur déterministe d’impeccable. Les **clichés** trahissent une interface générée sans décision ; les défauts de **qualité** nuisent à la lecture ou à l’usage. Une règle « conseil » demande un jugement : elle peut être légitime dans un univers qui l’assume.`}
        />
      </p>
      <div className="catalog-filters">
        <div className="field">
          <label htmlFor="ap-q">Rechercher</label>
          <input ref={searchRef} id="ap-q" className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ex. contraste, dégradé, carte" />
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
      <div aria-live="polite">
        {!list ? (
          <p className="small muted">Chargement du catalogue…</p>
        ) : (
          <>
            {failed && (
              <p className="small">
                {frenchSpacing(
                  'Le catalogue détaillé n’a pas pu être chargé : seuls les noms des règles, en anglais, s’affichent. Vérifie ta connexion, puis recharge la page.',
                )}
              </p>
            )}
            {shown.length > 0 ? (
              <p className="small muted">{count(shown.length, 'règle', 'règles')}</p>
            ) : (
              <div className="btn-row">
                <p className="small">
                  {frenchSpacing(
                    query.trim()
                      ? `Aucune règle ne correspond à « ${query.trim()} »${FAMILY_LABEL[shownFamily]}. Essaie un autre mot, par exemple « contraste ».`
                      : `Aucune règle${FAMILY_LABEL[shownFamily]}.`,
                  )}
                </p>
                {/* One label whatever was narrowed, and short enough for a 320 px column. */}
                <button type="button" className="btn btn-secondary" onClick={clear}>
                  Afficher les {count(list.length, 'règle', 'règles')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ul className="catalog">
        {shown.map((a) => (
          <li key={a.id}>
            <div className="catalog-head">
              <h2>{frenchSpacing(a.name)}</h2>
              <code>{a.id}</code>
              {EN_NAME.get(a.id) !== a.name && (
                <span className="small muted" lang="en">
                  {EN_NAME.get(a.id)}
                </span>
              )}
              <span className="chip">{a.family === 'cliche' ? 'Cliché' : 'Qualité'}</span>
              <span className="chip">{SEVERITY_LABEL[a.severity]}</span>
            </div>
            {a.description && (
              <p>
                <MdInline text={a.description} />
              </p>
            )}
            {a.fix && (
              <p className="fix">
                <strong>À la place{' '}:</strong> <MdInline text={a.fix} />
              </p>
            )}
            {a.demo && (
              <div className="example-pair">
                <figure>
                  <div className="stage">
                    <Mock visual={a.demo.bad} />
                  </div>
                  <figcaption>
                    <span className="verdict-tag verdict-tag--bad">
                      <CircleX aria-hidden="true" /> À éviter
                    </span>
                  </figcaption>
                </figure>
                {a.demo.good && (
                  <figure>
                    <div className="stage">
                      <Mock visual={a.demo.good} />
                    </div>
                    <figcaption>
                      <span className="verdict-tag verdict-tag--good">
                        <CircleCheck aria-hidden="true" /> Préférer
                      </span>
                    </figcaption>
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
              <dd>
                <MdInline text={h.text} />
              </dd>
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
              <dd>
                <MdInline text={s.text} />
              </dd>
            </div>
          ))}
        </dl>
        <Link to="/apprendre/heuristics">{frenchSpacing('Leçon : heuristiques et sévérité')}</Link>
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
                <MdInline text={p.text} /> <br />
                <strong>Signaux d’alerte{' '}:</strong> <MdInline text={p.flags} />
              </dd>
            </div>
          ))}
        </dl>
        <Link to="/apprendre/personas">{frenchSpacing('Leçon : personas de test')}</Link>
      </section>
    </div>
  );
}

function Commands() {
  return (
    <div className="section">
      <p className="muted" style={{ maxWidth: 'var(--measure)' }}>
        <MdInline text="impeccable donne un vocabulaire commun pour parler de design avec un agent de code : chaque commande correspond à une intention. Les leçons de cette application suivent le même découpage." />
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
                  <code className="code-short">/impeccable {c.cmd}</code>
                </th>
                <td data-label="Famille">{c.family}</td>
                <td data-label="Quand l’utiliser">
                  <MdInline text={c.when} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small">
        Projet{' '}: <SourceLink k="imp:site" /> · code source sur{' '}
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
          <dd>
            <MdInline text={g.def} />
          </dd>
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
    <>
      <div className="split">
        {groups.map(([title, keys]) => (
          <section key={title} className="section" aria-labelledby={`l-${slug(title)}`}>
            <h2 id={`l-${slug(title)}`}>{title}</h2>
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
      <p className="small">
        Crédits et licences de l’application (polices, icônes, contenu){' '}: <Link to="/a-propos">À propos</Link>.
      </p>
    </>
  );
}

export function Resources({ tab }: { tab?: string }) {
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];
  usePageTitle(pageTitle(current.label, 'Ressources'));
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
