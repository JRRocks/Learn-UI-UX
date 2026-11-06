import { Award, CircleAlert, Download, Trash2, Upload } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, pageTitle, usePageTitle } from '../app/router';
import { store, useProgress } from '../app/store';
import { toast } from '../app/toasts';
import { EXERCISES, EXERCISE_BY_ID, MODULES, RULE_CARDS, RULE_CARD_BY_KEY, exercisesOf } from '../content';
import { BADGES } from '../engine/badges';
import { addDays, dayKey } from '../engine/dates';
import { emptyProgress, mastery, masteryLabel, parseBackup, streak, type ProgressState } from '../engine/progress';
import { count, longDay, shortDay } from '../lib/french';
import { frenchSpacing } from '../lib/markdown';

const pct = (v: number): CSSProperties => ({ '--value': `${Math.round(v * 100)}%` }) as CSSProperties;

export const LEVELS = [
  { xp: 0, title: 'Repérer' },
  { xp: 150, title: 'Comprendre' },
  { xp: 500, title: 'Appliquer' },
  { xp: 1200, title: 'Critiquer' },
  { xp: 2500, title: 'Concevoir' },
  { xp: 5000, title: 'Transmettre' },
];

export function levelOf(xp: number) {
  let i = 0;
  while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].xp) i++;
  const next = LEVELS[i + 1];
  return { n: i + 1, title: LEVELS[i].title, next, progress: next ? (xp - LEVELS[i].xp) / (next.xp - LEVELS[i].xp) : 1 };
}

const DATE_TIME = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : DATE_TIME.format(d);
};
const isDayKey = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const LIST = new Intl.ListFormat('fr-FR', { type: 'conjunction' });

/** « 640 XP, 12 épreuves suivies et 3 fiches programmées »: what a reset or an import would replace. */
function summarize(s: ProgressState): string {
  // Only what the learner can see: ids removed from the content no longer count.
  const items = Object.keys(s.items).filter((id) => EXERCISE_BY_ID.has(id)).length;
  const cards = Object.keys(s.cards).filter((k) => RULE_CARD_BY_KEY.has(k)).length;
  const parts = [`${s.xp} XP`];
  if (items) parts.push(count(items, 'épreuve suivie', 'épreuves suivies'));
  if (cards) parts.push(count(cards, 'fiche programmée', 'fiches programmées'));
  return LIST.format(parts);
}

export function Progress() {
  const p = useProgress();
  const st = streak(p);
  const lvl = levelOf(p.xp);
  const today = dayKey();
  const fileRef = useRef<HTMLInputElement>(null);
  const importButtonRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLDialogElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);
  const importRef = useRef<HTMLDialogElement>(null);
  const cancelImportRef = useRef<HTMLButtonElement>(null);
  const [pending, setPending] = useState<ProgressState | null>(null);
  const [undo, setUndo] = useState<ProgressState | null>(null);
  const [importError, setImportError] = useState(false);
  const seen = EXERCISES.filter((e) => p.items[e.id]).length;
  const active30 = Array.from({ length: 30 }, (_, i) => addDays(today, -i)).filter((d) => (p.days[d]?.xp ?? 0) > 0).length;
  const activity = `${count(active30, 'jour', 'jours')} d’activité sur les 30 derniers`;
  usePageTitle(pageTitle('Progression'));

  // 12 weeks of activity, columns = weeks starting Monday.
  const todayDate = new Date();
  const mondayOffset = (todayDate.getDay() + 6) % 7;
  const start = addDays(today, -mondayOffset - 7 * 11);
  const cells = Array.from({ length: 84 }, (_, i) => addDays(start, i));

  // A valid backup was picked: ask before replacing anything, the safe answer focused.
  useEffect(() => {
    const dialog = importRef.current;
    if (!pending || !dialog) return;
    if (!dialog.open) dialog.showModal();
    cancelImportRef.current?.focus();
  }, [pending]);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(store.get(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epreuves-progression-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (file: File | undefined) => {
    if (!file) return;
    let data: ProgressState | null = null;
    try {
      data = parseBackup(JSON.parse(await file.text()));
    } catch {
      data = null;
    }
    setUndo(null);
    setImportError(!data);
    if (data) setPending(data);
  };

  const confirmImport = () => {
    if (!pending) return;
    setUndo(store.get());
    store.replace(pending);
    toast(frenchSpacing(`Sauvegarde importée : ${summarize(pending)}.`));
  };

  const undoImport = () => {
    if (!undo) return;
    store.replace(undo);
    setUndo(null);
    // This button goes away with the import it undoes: the focus returns to the one that started the import.
    importButtonRef.current?.focus();
    toast('Ta progression d’avant l’import est rétablie.');
  };

  const openReset = () => {
    resetRef.current?.showModal();
    // React does not write `autoFocus` as an attribute, so showModal() would focus the destructive button.
    keepRef.current?.focus();
  };

  const setTheme = (theme: 'system' | 'light' | 'dark') => store.update((s) => ({ ...s, settings: { ...s.settings, theme } }));
  const setGoal = (dailyGoal: number) => store.update((s) => ({ ...s, settings: { ...s.settings, dailyGoal } }));

  return (
    <div className="page">
      <header className="page-head">
        <h1 id="main-title" tabIndex={-1}>
          Progression
        </h1>
        <p className="lead">
          Niveau {lvl.n} — <strong>{lvl.title}</strong> · <span className="num">{p.xp}</span>
          {' '}XP
          {lvl.next && <span className="muted">{frenchSpacing(` · encore ${lvl.next.xp - p.xp} XP avant « ${lvl.next.title} »`)}</span>}
        </p>
        <div className="meter meter--mark" style={pct(lvl.progress)} aria-hidden="true">
          <span />
        </div>
      </header>

      <div className="split">
        <section className="section" aria-labelledby="act-title">
          <h2 id="act-title">Activité</h2>
          <p className="muted">
            Série{' '}: <strong className="num">{st.current}</strong>
            {' '}
            {st.current > 1 ? 'jours' : 'jour'} (record{' '}: {st.best}) · {activity}.
          </p>
          <div className="table-scroll">
            <div className="heatmap" role="img" aria-label={`Activité des 12 dernières semaines : ${activity}`}>
              {cells.map((d) => {
                const xp = p.days[d]?.xp ?? 0;
                const level = xp === 0 ? 0 : xp < p.settings.dailyGoal / 2 ? 1 : xp < p.settings.dailyGoal ? 2 : 3;
                return <i key={d} data-level={level} data-future={d > today ? '' : undefined} title={`${shortDay(d)} : ${xp} XP`} />;
              })}
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="sum-title">
          <h2 id="sum-title">En chiffres</h2>
          <dl className="defs">
            <div>
              <dt>Épreuves vues</dt>
              <dd className="num">
                {seen} sur {EXERCISES.length}
              </dd>
            </div>
            <div>
              <dt>Leçons lues</dt>
              <dd className="num">
                {MODULES.filter((m) => p.lessons[m.id]).length} sur {MODULES.length}
              </dd>
            </div>
            <div>
              <dt>Fiches programmées</dt>
              <dd className="num">
                {RULE_CARDS.filter((c) => p.cards[c.key]).length} sur {RULE_CARDS.length}
              </dd>
            </div>
            <div>
              <dt>Sessions terminées</dt>
              <dd className="num">{p.sessionsDone}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="section" aria-labelledby="mastery-title">
        <h2 id="mastery-title">Maîtrise par leçon</h2>
        <div className="table-scroll">
          <table className="mastery-table">
            <thead>
              <tr>
                <th scope="col">Leçon</th>
                <th scope="col">État</th>
                <th scope="col">Maîtrise</th>
                <th scope="col" className="num">
                  Vues
                </th>
              </tr>
            </thead>
            <tbody>
              {MODULES.map((m) => {
                const ids = exercisesOf(m.id).map((e) => e.id);
                const touched = ids.some((id) => p.items[id]);
                const v = mastery(p, ids);
                return (
                  <tr key={m.id}>
                    <th scope="row">
                      <Link to={`/apprendre/${m.id}`}>{frenchSpacing(m.title)}</Link>
                    </th>
                    <td>{masteryLabel(v, touched)}</td>
                    <td>
                      <span className="meter" style={pct(v)} role="img" aria-label={`${Math.round(v * 100)} %`}>
                        <span />
                      </span>
                    </td>
                    <td className="num">
                      {ids.filter((id) => p.items[id]).length}/{ids.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="badges-title">
        <h2 id="badges-title">Badges</h2>
        <ul className="badges">
          {BADGES.map((b) => {
            const on = p.badges[b.id];
            return (
              <li key={b.id} className="badge" data-earned={on ? '' : undefined}>
                <Award aria-hidden="true" />
                <strong>{b.title}</strong>
                <small>
                  {frenchSpacing(b.description)}
                  {on ? ` Obtenu le ${isDayKey(on) ? longDay(on) : on}.` : ''}
                </small>
              </li>
            );
          })}
        </ul>
      </section>

      {p.sessions.length > 0 && (
        <section className="section" aria-labelledby="hist-title">
          <h2 id="hist-title">Dernières sessions</h2>
          <div className="table-scroll">
            <table className="mastery-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Session</th>
                  <th scope="col" className="num">
                    Score
                  </th>
                  <th scope="col" className="num">
                    XP
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.sessions
                  .slice(-10)
                  .reverse()
                  .map((s, i) => (
                    <tr key={`${s.id}-${i}`}>
                      <td>{fmtDate(s.at)}</td>
                      <td>{frenchSpacing(s.label)}</td>
                      <td className="num">
                        {s.correct}/{s.total}
                      </td>
                      <td className="num">{s.xp}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="section settings" aria-labelledby="set-title">
        <h2 id="set-title">Réglages</h2>
        <div className="field">
          <span className="field-label" id="theme-label">
            Apparence
          </span>
          <div className="segmented" role="group" aria-labelledby="theme-label">
            {(
              [
                ['system', 'Comme le système'],
                ['light', 'Clair'],
                ['dark', 'Sombre'],
              ] as const
            ).map(([v, l]) => (
              <button key={v} type="button" aria-pressed={p.settings.theme === v} onClick={() => setTheme(v)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="field-label" id="goal-label">
            Objectif quotidien
          </span>
          <div className="segmented" role="group" aria-labelledby="goal-label">
            {[30, 60, 100, 150].map((g) => (
              <button key={g} type="button" aria-pressed={p.settings.dailyGoal === g} onClick={() => setGoal(g)}>
                {g}
                {' '}XP
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="field-label">Mes données</span>
          <p className="small muted">
            {frenchSpacing(
              'Tout reste dans ce navigateur : aucun compte, aucun serveur. Exporte une sauvegarde pour changer d’appareil ; l’importer remplace la progression de ce navigateur, après confirmation.',
            )}
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-secondary" onClick={exportData}>
              <Download aria-hidden="true" /> Exporter ma progression
            </button>
            <button ref={importButtonRef} type="button" className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
              <Upload aria-hidden="true" /> Importer une sauvegarde
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="visually-hidden"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(e) => {
                void importData(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </div>
          <div aria-live="polite">
            {importError && (
              <p className="small" style={{ color: 'var(--mark-ink)' }}>
                <CircleAlert aria-hidden="true" width={16} height={16} style={{ display: 'inline', verticalAlign: '-3px', marginInlineEnd: 'var(--s1)' }} />
                {frenchSpacing(
                  'Ce fichier n’est pas une sauvegarde d’Épreuves : rien n’a été modifié. Choisis un fichier créé avec « Exporter ma progression ».',
                )}
              </p>
            )}
          </div>
          {undo && (
            <div className="btn-row">
              <p className="small muted">Tu viens de remplacer ta progression par la sauvegarde.</p>
              <button type="button" className="btn btn-secondary" onClick={undoImport}>
                Annuler l’import
              </button>
            </div>
          )}
        </div>
        <div className="danger-zone">
          <span className="field-label">Repartir de zéro</span>
          <p className="small muted">Efface l’XP, les séries, les révisions programmées et les badges de ce navigateur.</p>
          <button type="button" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={openReset}>
            <Trash2 aria-hidden="true" /> Effacer ma progression…
          </button>
        </div>
        <p className="small">
          <Link to="/a-propos">{frenchSpacing('À propos : contenu, crédits, licences et confidentialité')}</Link>
        </p>
      </section>

      <dialog ref={resetRef} className="dialog" aria-labelledby="reset-title" aria-describedby="reset-desc">
        <h2 id="reset-title">{frenchSpacing('Effacer toute ta progression ?')}</h2>
        <p id="reset-desc">
          {frenchSpacing(`Seront effacés de ce navigateur : ${summarize(p)}, avec tes séries et tes badges.`)} Exporte une sauvegarde d’abord si tu veux
          pouvoir revenir en arrière.
        </p>
        <form method="dialog" className="btn-row">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => {
              store.replace({ ...emptyProgress(), settings: store.get().settings });
              setUndo(null);
              toast('Progression effacée.');
            }}
          >
            Effacer ma progression
          </button>
          <button ref={keepRef} type="submit" className="btn btn-secondary">
            Garder ma progression
          </button>
        </form>
      </dialog>

      <dialog ref={importRef} className="dialog" aria-labelledby="import-title" aria-describedby="import-desc" onClose={() => setPending(null)}>
        <h2 id="import-title">{frenchSpacing('Remplacer ta progression actuelle ?')}</h2>
        <p id="import-desc">
          {pending &&
            frenchSpacing(
              `Ta progression actuelle (${summarize(p)}) et tes réglages seront remplacés par ceux du fichier (${summarize(pending)}).`,
            )}
        </p>
        <form method="dialog" className="btn-row">
          <button type="submit" className="btn btn-danger" onClick={confirmImport}>
            Remplacer ma progression
          </button>
          <button ref={cancelImportRef} type="submit" className="btn btn-secondary">
            Annuler
          </button>
        </form>
      </dialog>
    </div>
  );
}
