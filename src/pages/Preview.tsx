import { useEffect, useState, type ReactNode } from 'react';
import { Mock, type Mark } from '../components/Mock';
import type { AntipatternEntry, CulturePair, CultureProfile, Exercise, ModuleContent, Visual } from '../engine/types';
import { Md, MdInline } from '../lib/markdown';

/**
 * Authoring preview: every lesson example and exercise of one module with its
 * answer revealed, for visual QA (`npm run shots -- <module>`). Not linked in the nav.
 */

const moduleFiles = import.meta.glob<{ default: ModuleContent }>('../content/modules/*.ts');
const cultureFiles = import.meta.glob<{ CULTURES?: CultureProfile[]; CULTURE_PAIRS?: CulturePair[] }>([
  '../content/cultures/profiles.ts',
  '../content/cultures/pairs.ts',
]);
const catalogFiles = import.meta.glob<{ ANTIPATTERNS?: AntipatternEntry[] }>('../content/antipatterns.ts');

type Loaded =
  | { kind: 'module'; module: ModuleContent }
  | { kind: 'cultures'; profiles: CultureProfile[]; pairs: CulturePair[] }
  | { kind: 'antipatterns'; list: AntipatternEntry[] }
  | { kind: 'error'; message: string };

async function load(target: string): Promise<Loaded> {
  if (target === 'cultures') {
    const mods = await Promise.all(Object.values(cultureFiles).map((l) => l()));
    return { kind: 'cultures', profiles: mods.flatMap((m) => m.CULTURES ?? []), pairs: mods.flatMap((m) => m.CULTURE_PAIRS ?? []) };
  }
  if (target === 'antipatterns-catalog') {
    const [l] = Object.values(catalogFiles);
    return l ? { kind: 'antipatterns', list: (await l()).ANTIPATTERNS ?? [] } : { kind: 'error', message: 'Catalogue absent' };
  }
  const entry = Object.entries(moduleFiles).find(([f]) => f.endsWith(`/${target}.ts`));
  if (!entry) return { kind: 'error', message: `Module « ${target} » introuvable` };
  return { kind: 'module', module: (await entry[1]()).default };
}

function Shot({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="preview-item" data-shot={id}>
      <h2 className="preview-title">
        <code>{id}</code> {title}
      </h2>
      {children}
    </section>
  );
}

function V({ visual, marks, vars, caption }: { visual: Visual; marks?: Mark[]; vars?: Record<string, string>; caption?: string }) {
  return (
    <figure className="preview-visual">
      <div className="stage">
        <Mock visual={visual} marks={marks} vars={vars} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function ExercisePreview({ ex }: { ex: Exercise }) {
  return (
    <Shot id={ex.id} title={`${ex.type} · difficulté ${ex.difficulty}${ex.culture ? ` · ${ex.culture}` : ''}`}>
      {ex.context && <Md text={ex.context} className="preview-context" />}
      <p className="preview-prompt">
        <MdInline text={ex.prompt} />
      </p>
      {ex.visual && ex.type !== 'hotspot' && ex.type !== 'slider' && ex.type !== 'grid' && <V visual={ex.visual} />}

      {(ex.type === 'choice' || ex.type === 'multi') && (
        <ol className={ex.options.some((o) => o.visual) ? 'preview-options preview-options--visual' : 'preview-options'}>
          {ex.options.map((o) => {
            const right = ex.type === 'choice' ? o.id === ex.answer : ex.answers.includes(o.id);
            return (
              <li key={o.id} data-right={right}>
                <strong>{right ? '✔ recommandé' : '✘'}</strong> {o.label && <MdInline text={o.label} />}
                {o.visual && <V visual={o.visual} />}
                {o.why && (
                  <p className="preview-why">
                    <MdInline text={o.why} />
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      )}
      {ex.type === 'truefalse' && <p>Réponse : {ex.answer ? 'Vrai' : 'Faux'}</p>}
      {ex.type === 'hotspot' && (
        <>
          <V
            visual={ex.visual}
            marks={ex.hotspots.filter((h) => h.correct).map((h, i) => ({ id: h.id, n: i + 1, kind: 'hit' as const }))}
          />
          <ul>
            {ex.hotspots.map((h) => (
              <li key={h.id}>
                <strong>{h.correct ? '✔' : '·'} {h.label}</strong> — <MdInline text={h.why} />
              </li>
            ))}
          </ul>
        </>
      )}
      {ex.type === 'slider' && (
        <div className="preview-pair">
          <V visual={ex.visual} vars={{ '--v': `${ex.initial}${ex.unit}`, '--n': String(ex.initial) }} caption={`Départ : ${ex.initial}${ex.unit}`} />
          <V visual={ex.visual} vars={{ '--v': `${ex.ideal}${ex.unit}`, '--n': String(ex.ideal) }} caption={`Idéal : ${ex.ideal}${ex.unit} (cible ${ex.target[0]}–${ex.target[1]})`} />
        </div>
      )}
      {ex.type === 'order' && (
        <ol>
          {ex.items.map((i) => (
            <li key={i.id}>
              <MdInline text={i.label} />
            </li>
          ))}
        </ol>
      )}
      {ex.type === 'match' && (
        <table className="preview-table">
          <thead>
            <tr>
              <th>{ex.leftTitle}</th>
              <th>{ex.rightTitle}</th>
            </tr>
          </thead>
          <tbody>
            {ex.pairs.map((p) => (
              <tr key={p.id}>
                <td>
                  <MdInline text={p.left} />
                </td>
                <td>
                  <MdInline text={p.right} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {ex.type === 'grid' && (
        <>
          <V visual={ex.visual} />
          <table className="preview-table">
            <tbody>
              {ex.criteria.map((c) => (
                <tr key={c.id}>
                  <td>{c.label}</td>
                  <td>{c.expert}</td>
                  <td>{c.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <Md text={ex.explanation} className="preview-explanation" />
      <p>
        <strong>À retenir :</strong> <MdInline text={ex.takeaway} />
      </p>
    </Shot>
  );
}

export function Preview({ target }: { target: string }) {
  const [data, setData] = useState<Loaded | null>(null);
  useEffect(() => {
    load(target).then(setData, (e: unknown) => setData({ kind: 'error', message: String(e) }));
  }, [target]);

  if (!data) return <p>Chargement…</p>;
  if (data.kind === 'error') return <p data-preview-ready="error">{data.message}</p>;

  return (
    <div className="preview" data-preview-ready="ok">
      {data.kind === 'module' && (
        <>
          <h1>{data.module.title}</h1>
          {data.module.sections.flatMap((s) =>
            (s.examples ?? []).map((e, i) => (
              <Shot key={`${s.id}-${i}`} id={`lesson-${s.id}-${i + 1}`} title={e.title}>
                <div className="preview-pair">
                  {e.bad && <V visual={e.bad} caption={`À éviter — ${e.badNote ?? ''}`} />}
                  {e.good && <V visual={e.good} caption={`Préférer — ${e.goodNote ?? ''}`} />}
                </div>
              </Shot>
            )),
          )}
          {data.module.exercises.map((ex) => (
            <ExercisePreview key={ex.id} ex={ex} />
          ))}
        </>
      )}
      {data.kind === 'cultures' && (
        <>
          <h1>Cultures</h1>
          {data.profiles.map((p) => (
            <Shot key={p.id} id={`culture-${p.id}`} title={`${p.name} (${p.locale})`}>
              <p>{p.summary}</p>
              {p.visual && <V visual={p.visual} />}
            </Shot>
          ))}
          {data.pairs.map((p) => (
            <Shot key={p.id} id={`pair-${p.id}`} title={`${p.title} — ${p.a} / ${p.b}`}>
              <div className="preview-pair">
                <V visual={p.visualA} caption={p.a} />
                <V visual={p.visualB} caption={p.b} />
              </div>
              <Md text={p.notes} />
            </Shot>
          ))}
        </>
      )}
      {data.kind === 'antipatterns' && (
        <>
          <h1>Catalogue des anti-patterns</h1>
          {data.list
            .filter((a) => a.demo)
            .map((a) => (
              <Shot key={a.id} id={`ap-${a.id}`} title={a.name}>
                <div className="preview-pair">
                  {a.demo?.bad && <V visual={a.demo.bad} caption="À éviter" />}
                  {a.demo?.good && <V visual={a.demo.good} caption="Préférer" />}
                </div>
              </Shot>
            ))}
        </>
      )}
    </div>
  );
}
