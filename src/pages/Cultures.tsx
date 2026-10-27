import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { Link, navigate } from '../app/router';
import { Mock } from '../components/Mock';
import { EXERCISES, MODULE_BY_ID } from '../content';
import { CULTURE_NAMES, HOFSTEDE, REGIONS_ORDER, TOPIC_LABEL, useCultures, type CultureData } from '../content/cultures';
import { LAB_LOCALES } from '../content/cultures/lab';
import { resolveSource } from '../content/sources';
import type { CulturePair, CultureProfile } from '../engine/types';
import { Md, MdInline } from '../lib/markdown';
import { NotFound } from './NotFound';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v)}%` }) as CSSProperties;
const norm = (s: string) => s.replace(/'/g, '’');
const CONTEXT = { faible: 'Contexte faible', moyen: 'Contexte intermédiaire', fort: 'Contexte fort' };

function byRegion(list: CultureProfile[]): [string, CultureProfile[]][] {
  const groups = new Map<string, CultureProfile[]>();
  for (const c of list) groups.set(norm(c.region), [...(groups.get(norm(c.region)) ?? []), c]);
  return [...groups.entries()].sort(([a], [b]) => {
    const ia = REGIONS_ORDER.indexOf(a);
    const ib = REGIONS_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

function sampleDate(locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(new Date(2026, 9, 27));
  } catch {
    return '';
  }
}

function sampleNumber(locale: string) {
  try {
    return new Intl.NumberFormat(locale).format(1234567.89);
  } catch {
    return '';
  }
}

function Sources({ list }: { list: CultureProfile['sources'] }) {
  return (
    <ul className="sources">
      {list.map((s, i) => {
        const r = resolveSource(s);
        return <li key={i}>{r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a> : r.label}</li>;
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ overview */

function Loading() {
  return (
    <div className="page">
      <p className="muted" role="status">
        Chargement des marchés…
      </p>
    </div>
  );
}

export function Cultures() {
  const data = useCultures();
  const [a, setA] = useState('fr');
  const [b, setB] = useState('cn');
  if (!data) return <Loading />;
  const { profiles: CULTURES, pairs: CULTURE_PAIRS } = data;
  const lesson = MODULE_BY_ID.get('culture');
  const count = EXERCISES.filter((e) => e.culture || e.module === 'culture').length;

  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Cultures
        </h1>
        <p className="lead">
          Une interface n’est jamais neutre : densité, couleurs, formulaires, paiement, écriture et cadre légal changent d’un marché à l’autre.
          Localiser, ce n’est pas traduire — c’est adapter ce que les gens attendent, puis le vérifier avec eux.
        </p>
      </header>

      <section className="today" aria-label="Apprendre et s’entraîner">
        <div className="today-main">
          <h2>{lesson ? lesson.title : 'UI interculturelle'}</h2>
          <p>{lesson?.summary ?? 'Les grilles de lecture (Hofstede, Hall), la densité, l’écriture de droite à gauche, les formats et les obligations locales.'}</p>
          <div className="btn-row">
            {lesson && (
              <Link to="/apprendre/culture" className="btn btn-primary">
                Lire la leçon
              </Link>
            )}
          </div>
        </div>
        <div className="today-side">
          <Link to="/session?mode=culture" className="side-link">
            <span>
              S’entraîner sur les cultures
              <small>Duels, chasses aux erreurs culturelles, associations</small>
            </span>
            <strong>{count}</strong>
          </Link>
          <Link to="/cultures/labo" className="side-link">
            <span>
              Labo de localisation
              <small>Un même panier dans {LAB_LOCALES.length} langues et formats</small>
            </span>
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="markets-title">
        <div className="section-head">
          <h2 id="markets-title">Les marchés</h2>
          <p className="small">Des tendances observées et des contraintes réelles, pas des lois : chaque profil se vérifie avec des utilisateurs locaux.</p>
        </div>
        {CULTURES.length === 0 && <p className="muted">Les profils de marchés arrivent.</p>}
        {byRegion(CULTURES).map(([region, list]) => (
          <div key={region} className="section">
            <h3>{region}</h3>
            <div className="markets">
              {list.map((c) => (
                <Link key={c.id} to={`/cultures/${c.id}`} className="market">
                  <span className="market-name">
                    {c.name} <code>{c.locale}</code>
                  </span>
                  <p>
                    <MdInline text={c.summary} />
                  </p>
                  <span className="market-formats">
                    {sampleDate(c.locale)} · {sampleNumber(c.locale)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {CULTURES.length > 1 && (
        <section className="section" aria-labelledby="compare-title">
          <h2 id="compare-title">Comparer deux marchés</h2>
          <form
            className="btn-row"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/cultures/comparer?a=${a}&b=${b}`);
            }}
          >
            <label className="visually-hidden" htmlFor="cmp-a">
              Premier marché
            </label>
            <select id="cmp-a" className="select" value={a} onChange={(e) => setA(e.target.value)}>
              {CULTURES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className="visually-hidden" htmlFor="cmp-b">
              Second marché
            </label>
            <select id="cmp-b" className="select" value={b} onChange={(e) => setB(e.target.value)}>
              {CULTURES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-secondary">
              Comparer
            </button>
          </form>
        </section>
      )}

      {CULTURE_PAIRS.length > 0 && (
        <section className="section" aria-labelledby="pairs-title">
          <div className="section-head">
            <h2 id="pairs-title">Côte à côte</h2>
            <p className="small">Le même composant conçu pour deux marchés, et chaque différence expliquée.</p>
          </div>
          <ul className="toc-list">
            {CULTURE_PAIRS.map((p) => (
              <li key={p.id} className="toc-row">
                <Link to={`/cultures/paire/${p.id}`}>
                  <span className="toc-title">{p.title}</span>
                  <span className="toc-summary">
                    {CULTURE_NAMES[p.a] ?? p.a} / {CULTURE_NAMES[p.b] ?? p.b}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section" aria-labelledby="dims-title">
        <div className="section-head">
          <h2 id="dims-title">Lire les dimensions culturelles</h2>
          <p className="small">
            Hofstede résume des valeurs moyennes par pays sur six axes ; Aaron Marcus en a tiré des pistes pour l’interface. Ce sont des
            hypothèses à tester, jamais des étiquettes à coller sur une personne.
          </p>
        </div>
        <dl className="defs">
          {HOFSTEDE.map((d) => (
            <div key={d.key}>
              <dt>{d.label}</dt>
              <dd>
                {d.low} ↔ {d.high}. {d.ui}
              </dd>
            </div>
          ))}
          <div>
            <dt>Contexte fort / faible</dt>
            <dd>
              Edward T. Hall : dans une culture à contexte fort, une grande partie du sens passe par l’implicite et l’environnement ; à
              contexte faible, on attend des messages explicites et autonomes. En interface, cela joue sur la densité, la place des
              signaux sociaux et le degré d’explication.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ detail */

function Dims({ c }: { c: CultureProfile }) {
  if (!c.hofstede)
    return <p className="muted small">Pas de scores Hofstede fiables publiés pour ce marché : on s’appuie sur l’observation et la recherche locale.</p>;
  return (
    <ul className="dims">
      {HOFSTEDE.map((d) => (
        <li key={d.key} className="dim">
          <span className="dim-label">{d.label}</span>
          <span className="dim-value">{c.hofstede![d.key]}</span>
          <span className="meter" style={pct(c.hofstede![d.key])} aria-hidden="true">
            <span />
          </span>
          <span className="dim-note">
            {d.low} ↔ {d.high}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CultureDetail({ id }: { id: string }) {
  const data = useCultures();
  if (!data) return <Loading />;
  const c = data.byId.get(id);
  if (!c) return <NotFound />;
  const exercises = EXERCISES.filter((e) => e.culture === c.id);
  const pairs = data.pairs.filter((p) => p.a === c.id || p.b === c.id);
  const topics = [...new Set(c.conventions.map((x) => x.topic))];

  return (
    <div className="page">
      <Link to="/cultures" className="back">
        <ArrowLeft aria-hidden="true" /> Cultures
      </Link>
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {c.name}
        </h1>
        <p className="lead">
          <MdInline text={c.summary} />
        </p>
        <p className="meta">
          <span>{c.region}</span>
          <span>
            Locale <code>{c.locale}</code>
          </span>
          <span>{c.dir === 'rtl' ? 'Écriture de droite à gauche' : 'Écriture de gauche à droite'}</span>
          <span>{CONTEXT[c.context]}</span>
        </p>
      </header>

      {c.visual && (
        <section className="section" aria-labelledby="visual-title">
          <h2 id="visual-title">Une interface typique</h2>
          <div className="stage">
            <Mock visual={c.visual} />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="conv-title">
        <h2 id="conv-title">Conventions et attentes</h2>
        {topics.map((t) => (
          <div key={t} className="section">
            <h3 className="small muted">{TOPIC_LABEL[t] ?? t}</h3>
            <div className="conventions">
              {c.conventions
                .filter((x) => x.topic === t)
                .map((x, i) => (
                  <div key={i} className="convention">
                    <h4 style={{ fontSize: 'var(--t-body)' }}>{x.title}</h4>
                    <Md text={x.body} className="small" />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section dodont" aria-label="Adapter son interface">
        <div className="do">
          <h3>
            <CircleCheck aria-hidden="true" /> À faire
          </h3>
          <ul>
            {c.adapt.do.map((x, i) => (
              <li key={i}>
                <MdInline text={x} />
              </li>
            ))}
          </ul>
        </div>
        <div className="dont">
          <h3>
            <CircleX aria-hidden="true" /> À éviter
          </h3>
          <ul>
            {c.adapt.dont.map((x, i) => (
              <li key={i}>
                <MdInline text={x} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="split">
        <section className="section" aria-labelledby="formats-title">
          <h2 id="formats-title">Formats</h2>
          <table className="formats-table">
            <tbody>
              {c.formats.map((f, i) => (
                <tr key={i}>
                  <th scope="row">{f.label}</th>
                  <td lang={c.locale} dir="auto">
                    {f.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="section" aria-labelledby="dims-title">
          <h2 id="dims-title">Dimensions de Hofstede</h2>
          <Dims c={c} />
          <p className="small muted">Scores de l’édition classique (0–100), à lire comme des moyennes nationales et non des portraits.</p>
        </section>
      </div>

      <section className="section" aria-labelledby="eco-title">
        <h2 id="eco-title">Écosystème</h2>
        <p className="btn-row">
          {c.ecosystem.map((x) => (
            <span key={x} className="chip">
              {x}
            </span>
          ))}
        </p>
      </section>

      {pairs.length > 0 && (
        <section className="section" aria-labelledby="pairs-title">
          <h2 id="pairs-title">Comparaisons côte à côte</h2>
          <ul className="toc-list">
            {pairs.map((p) => (
              <li key={p.id} className="toc-row">
                <Link to={`/cultures/paire/${p.id}`}>
                  <span className="toc-title">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section" aria-labelledby="src-title">
        <h2 id="src-title">Sources</h2>
        <Sources list={c.sources} />
      </section>

      <div className="btn-row">
        {exercises.length > 0 && (
          <Link to={`/session?mode=culture&id=${c.id}`} className="btn btn-primary">
            S’entraîner sur ce marché ({exercises.length})
          </Link>
        )}
        <Link to={`/cultures/comparer?a=${c.id}&b=${c.id === 'fr' ? 'cn' : 'fr'}`} className="btn btn-secondary">
          Comparer avec un autre marché
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ compare */

export function CultureCompare({ query }: { query: URLSearchParams }) {
  const data = useCultures();
  if (!data) return <Loading />;
  return <Compare data={data} query={query} />;
}

function Compare({ data, query }: { data: CultureData; query: URLSearchParams }) {
  const CULTURES = data.profiles;
  const a = data.byId.get(query.get('a') ?? '') ?? CULTURES[0];
  const b = data.byId.get(query.get('b') ?? '') ?? CULTURES[1];
  const pair = useMemo(
    () => data.pairs.find((p) => (p.a === a?.id && p.b === b?.id) || (p.a === b?.id && p.b === a?.id)),
    [a, b, data.pairs],
  );
  if (!a || !b) return <NotFound />;
  const topics = [...new Set([...a.conventions, ...b.conventions].map((x) => x.topic))];
  const set = (which: 'a' | 'b', v: string) => navigate(`/cultures/comparer?a=${which === 'a' ? v : a.id}&b=${which === 'b' ? v : b.id}`);

  return (
    <div className="page">
      <Link to="/cultures" className="back">
        <ArrowLeft aria-hidden="true" /> Cultures
      </Link>
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          {a.name} et {b.name}
        </h1>
        <div className="btn-row">
          <label className="visually-hidden" htmlFor="ca">
            Premier marché
          </label>
          <select id="ca" className="select" value={a.id} onChange={(e) => set('a', e.target.value)}>
            {CULTURES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="visually-hidden" htmlFor="cb">
            Second marché
          </label>
          <select id="cb" className="select" value={b.id} onChange={(e) => set('b', e.target.value)}>
            {CULTURES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {pair && <PairBlock pair={pair} />}

      {a.hofstede && b.hofstede && (
        <section className="section" aria-labelledby="h-dims">
          <h2 id="h-dims">Dimensions de Hofstede</h2>
          <ul className="dims">
            {HOFSTEDE.map((d) => (
              <li key={d.key} className="dim dim--pair">
                <span className="dim-label">{d.label}</span>
                <span className="dim-value" aria-hidden="true" />
                <span className="meter" style={pct(a.hofstede![d.key])} aria-label={`${a.name} : ${a.hofstede![d.key]}`}>
                  <span />
                </span>
                <span className="meter meter--mark" style={pct(b.hofstede![d.key])} aria-label={`${b.name} : ${b.hofstede![d.key]}`}>
                  <span />
                </span>
                <span className="dim-note">
                  {a.name} {a.hofstede![d.key]} · <span style={{ color: 'var(--mark-ink)' }}>{b.name} {b.hofstede![d.key]}</span> — {d.ui}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section" aria-labelledby="h-conv">
        <h2 id="h-conv">Conventions</h2>
        <div className="table-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Sujet</th>
                <th scope="col">{a.name}</th>
                <th scope="col">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr key={t}>
                  <th scope="row">{TOPIC_LABEL[t] ?? t}</th>
                  {[a, b].map((c) => (
                    <td key={c.id}>
                      <ul>
                        {c.conventions
                          .filter((x) => x.topic === t)
                          .map((x, i) => (
                            <li key={i}>
                              <strong>{x.title}.</strong> <MdInline text={x.body.split('\n')[0]} />
                            </li>
                          ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">À faire</th>
                {[a, b].map((c) => (
                  <td key={c.id}>
                    <ul>
                      {c.adapt.do.map((x, i) => (
                        <li key={i}>
                          <MdInline text={x} />
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Formats</th>
                {[a, b].map((c) => (
                  <td key={c.id}>
                    <ul>
                      {c.formats.map((f, i) => (
                        <li key={i}>
                          {f.label} : <code dir="auto">{f.value}</code>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ pair */

function PairBlock({ pair, main = false }: { pair: CulturePair; main?: boolean }) {
  const a = { name: CULTURE_NAMES[pair.a] };
  const b = { name: CULTURE_NAMES[pair.b] };
  const Heading = main ? 'h1' : 'h2';
  return (
    <section className="section" aria-labelledby={main ? 'main-title' : `pair-${pair.id}`}>
      <Heading id={main ? 'main-title' : `pair-${pair.id}`} tabIndex={main ? -1 : undefined}>
        {pair.title}
      </Heading>
      <div className="pair-view">
        <figure>
          <figcaption>{a?.name ?? pair.a}</figcaption>
          <div className="stage">
            <Mock visual={pair.visualA} />
          </div>
        </figure>
        <figure>
          <figcaption>{b?.name ?? pair.b}</figcaption>
          <div className="stage">
            <Mock visual={pair.visualB} />
          </div>
        </figure>
      </div>
      <Md text={pair.notes} className="prose" />
    </section>
  );
}

export function CulturePairPage({ id }: { id: string }) {
  const data = useCultures();
  if (!data) return <Loading />;
  const pair = data.pairs.find((p) => p.id === id);
  if (!pair) return <NotFound />;
  return (
    <div className="page">
      <Link to="/cultures" className="back">
        <ArrowLeft aria-hidden="true" /> Cultures
      </Link>
      <PairBlock pair={pair} main />
      <div className="btn-row">
        <Link to={`/cultures/comparer?a=${pair.a}&b=${pair.b}`} className="btn btn-secondary">
          Comparer les deux marchés en détail
        </Link>
      </div>
    </div>
  );
}
