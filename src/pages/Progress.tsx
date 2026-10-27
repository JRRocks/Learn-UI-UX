import { Award, Download, Trash2, Upload } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { Link } from '../app/router';
import { store, useProgress } from '../app/store';
import { toast } from '../app/toasts';
import { EXERCISES, MODULES, RULE_CARDS, exercisesOf } from '../content';
import { BADGES } from '../engine/badges';
import { addDays, dayKey } from '../engine/dates';
import { emptyProgress, mastery, masteryLabel, normalizeProgress, streak } from '../engine/progress';

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

const fmtDate = (iso: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));

export function Progress() {
  const p = useProgress();
  const st = streak(p);
  const lvl = levelOf(p.xp);
  const today = dayKey();
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const seen = EXERCISES.filter((e) => p.items[e.id]).length;
  const active30 = Array.from({ length: 30 }, (_, i) => addDays(today, -i)).filter((d) => (p.days[d]?.xp ?? 0) > 0).length;

  // 12 weeks of activity, columns = weeks starting Monday.
  const todayDate = new Date();
  const mondayOffset = (todayDate.getDay() + 6) % 7;
  const start = addDays(today, -mondayOffset - 7 * 11);
  const cells = Array.from({ length: 84 }, (_, i) => addDays(start, i));

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
    try {
      const data = normalizeProgress(JSON.parse(await file.text()));
      store.replace(data);
      toast('Progression importée.');
    } catch {
      toast('Ce fichier n’est pas une sauvegarde valide : rien n’a été modifié.');
    }
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
          Niveau {lvl.n} — <strong>{lvl.title}</strong> · <span className="num">{p.xp}</span> XP
          {lvl.next && (
            <span className="muted">
              {' '}
              · encore {lvl.next.xp - p.xp} XP avant « {lvl.next.title} »
            </span>
          )}
        </p>
        <div className="meter meter--mark" style={pct(lvl.progress)} aria-hidden="true">
          <span />
        </div>
      </header>

      <div className="split">
        <section className="section" aria-labelledby="act-title">
          <h2 id="act-title">Activité</h2>
          <p className="muted">
            Série : <strong className="num">{st.current}</strong> jour{st.current > 1 ? 's' : ''} (record {st.best}) · actif {active30} jours sur
            les 30 derniers.
          </p>
          <div className="table-scroll">
            <div className="heatmap" role="img" aria-label={`Activité des 12 dernières semaines : actif ${active30} jours sur les 30 derniers`}>
              {cells.map((d) => {
                const xp = p.days[d]?.xp ?? 0;
                const level = xp === 0 ? 0 : xp < p.settings.dailyGoal / 2 ? 1 : xp < p.settings.dailyGoal ? 2 : 3;
                return <i key={d} data-level={level} data-future={d > today ? '' : undefined} title={`${d} : ${xp} XP`} />;
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
                {Object.keys(p.lessons).length} sur {MODULES.length}
              </dd>
            </div>
            <div>
              <dt>Fiches programmées</dt>
              <dd className="num">
                {Object.keys(p.cards).length} sur {RULE_CARDS.length}
              </dd>
            </div>
            <div>
              <dt>Sessions terminées</dt>
              <dd className="num">{p.sessions.length}</dd>
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
                <th scope="col">Niveau</th>
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
                      <Link to={`/apprendre/${m.id}`}>{m.title}</Link>
                    </th>
                    <td>{masteryLabel(v, touched)}</td>
                    <td>
                      <span className="meter" style={pct(v)} role="img" aria-label={`${Math.round(v * 100)} %`}>
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
          {BADGES.map((b) => (
            <li key={b.id} className="badge" data-earned={p.badges[b.id] ? '' : undefined}>
              <Award aria-hidden="true" />
              <strong>{b.title}</strong>
              <small>
                {b.description}
                {p.badges[b.id] ? ` Obtenu le ${p.badges[b.id]}.` : ''}
              </small>
            </li>
          ))}
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
                  .map((s) => (
                    <tr key={s.id}>
                      <td>{fmtDate(s.at)}</td>
                      <td>{s.label}</td>
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
                {g} XP
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="field-label">Mes données</span>
          <p className="small muted">Tout reste dans ce navigateur : aucun compte, aucun serveur. Exporte une sauvegarde pour changer d’appareil.</p>
          <div className="btn-row">
            <button type="button" className="btn btn-secondary" onClick={exportData}>
              <Download aria-hidden="true" /> Exporter ma progression
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
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
        </div>
        <div className="danger-zone">
          <span className="field-label">Repartir de zéro</span>
          <p className="small muted">Efface l’XP, les séries, les révisions programmées et les badges de ce navigateur.</p>
          <button type="button" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={() => dialogRef.current?.showModal()}>
            <Trash2 aria-hidden="true" /> Effacer ma progression…
          </button>
        </div>
      </section>

      <dialog ref={dialogRef} className="dialog" aria-labelledby="reset-title">
        <h2 id="reset-title">Effacer toute ta progression ?</h2>
        <p>
          {p.xp} XP, {Object.keys(p.items).length} épreuves suivies et {Object.keys(p.cards).length} fiches programmées seront supprimées de ce
          navigateur. Exporte une sauvegarde d’abord si tu veux pouvoir revenir en arrière.
        </p>
        <form method="dialog" className="btn-row">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => {
              store.replace({ ...emptyProgress(), settings: store.get().settings });
              toast('Progression effacée.');
            }}
          >
            Effacer ma progression
          </button>
          <button type="submit" className="btn btn-secondary" autoFocus>
            Garder ma progression
          </button>
        </form>
      </dialog>
    </div>
  );
}
