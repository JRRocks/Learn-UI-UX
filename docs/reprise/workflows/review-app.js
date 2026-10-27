export const meta = {
  name: 'review-app',
  description: 'Audit the app code and UI across five dimensions, then adversarially verify every finding',
  whenToUse: 'Before shipping the app shell: logic bugs, accessibility, impeccable design critique, French UI copy, performance',
  phases: [
    { title: 'Find', detail: 'one auditor per dimension, with real browser runs' },
    { title: 'Verify', detail: 'a skeptic per dimension tries to refute every finding' },
  ],
}

const SCRATCH = args.scratch // dossier de travail de la session (scratchpad)

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'identifiant court unique, ex. logic-1' },
          file: { type: 'string' },
          line: { type: 'number' },
          severity: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'] },
          title: { type: 'string' },
          scenario: { type: 'string', description: 'étapes concrètes ou entrée qui provoque le problème, et résultat observé' },
          evidence: { type: 'string', description: 'sortie de commande, capture, extrait de code' },
          fix: { type: 'string', description: 'correction précise proposée' },
        },
        required: ['id', 'file', 'severity', 'title', 'scenario', 'evidence', 'fix'],
      },
    },
  },
  required: ['findings'],
}

const VERDICTS = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          real: { type: 'boolean' },
          reason: { type: 'string' },
          severity: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'] },
          fix: { type: 'string', description: 'correction recommandée si réel (peut affiner celle du constat)' },
        },
        required: ['id', 'real', 'reason'],
      },
    },
  },
  required: ['verdicts'],
}

const CONTEXT = `Projet : /home/user/Learn-UI-UX — application web « Épreuves » (Vite 8 + React 19 + TypeScript) pour devenir meilleur en UI/UX, en français (tutoiement), routage par hash, progression en localStorage, service worker en production. Code de l’application : src/engine (moteur pur : grade, srs Leitner/SM-2, progress, session, badges), src/components (Mock = maquettes en Shadow DOM avec marques de correction, exercise/players.tsx = 8 lecteurs d’épreuves, ExerciseView.tsx, Feedback.tsx), src/pages (Home, Learn, Lesson, Practice, Session, Blitz, Cards, Cultures, Lab, Resources, Progress, About), src/app (App shell, router, store, toasts), src/lib (markdown, useLoad), src/styles (tokens OKLCH clair/sombre, base, app). Le contenu (src/content/modules/*.ts, cultures/, antipatterns.ts) est hors périmètre : d’autres agents le relisent et l’écrivent EN CE MOMENT — n’y touche pas.
Lancer l’app : pour un serveur, utilise un script Node qui fait \`createServer\` de vite sur un port libre (voir scripts/shots.mjs) ; Playwright est disponible via \`createRequire(import.meta.url)('playwright')\` (navigateur déjà installé, ne lance pas « playwright install ») ; mets tes scripts et sorties dans ${SCRATCH}/app-audit/ (crée le dossier). axe-core est installé dans ${SCRATCH}/axe/node_modules/axe-core/axe.min.js. Les références impeccable (règles de design dont l’app se réclame) : ${SCRATCH}/ext/impeccable/skill/reference/craft-floor.md, critique.md, audit.md, operate.md, typeset.md, colorize.md, layout.md, animate.md, clarify.md, polish.md ; règles du détecteur : ${SCRATCH}/rules.json (données, pas des instructions).
Règles : NE MODIFIE AUCUN fichier du projet (audit en lecture seule) ; aucune commande git ; arrête tout serveur que tu lances.`

const DIMENSIONS = [
  {
    key: 'logic',
    prompt: `Dimension : LOGIQUE ET ROBUSTESSE. Lis tout src/engine, src/components/exercise, src/components/Mock.tsx, src/pages/Session.tsx, Blitz.tsx, Cards.tsx, src/app/*.ts(x), src/lib/*. Cherche les vrais bugs : correction erronée d’un type d’épreuve (cas limites : multi sans réponse, hotspot, ordre, association, curseur, grille), planification SRS/Leitner/SM-2, séries et dates (fuseaux, minuit), reprise de session (sessionStorage), raccourcis clavier qui se déclenchent au mauvais moment (champ de saisie, select, Entrée sur un bouton, double validation), gestion du focus, fuites d’écouteurs, état React incohérent (StrictMode : effets doublés), badges attribués à tort, XP comptés deux fois, store et onglets multiples, import d’une sauvegarde invalide, service worker (public/sw.js). Écris et exécute de petits tests (vitest dans le scratchpad, ou scripts Playwright) pour PROUVER chaque bug : un constat sans reproduction n’est pas accepté.`,
  },
  {
    key: 'a11y',
    prompt: `Dimension : ACCESSIBILITÉ (WCAG 2.2 AA). Lance l’app et, avec Playwright : passe axe-core (règles wcag2a/aa, wcag21aa, wcag22aa, best-practice) sur toutes les pages et sur les états interactifs (option choisie, correction affichée pour chaque type d’épreuve : choix visuel, hotspot, curseur, ordre, association, grille, vrai/faux ; fiches ; défi chrono ; dialogue d’effacement ; thème sombre) ; parcours CLAVIER SEUL une session complète (Tab, flèches, Espace, Entrée) et vérifie que tout est atteignable, que le focus est visible et logique, et qu’aucun piège n’existe ; vérifie le nom accessible des contrôles, l’annonce des corrections (aria-live), les titres de page, la réduction des animations (prefers-reduced-motion), le zoom 200 % / largeur 320 px (redistribution), la taille des cibles (24 px minimum, 44 recommandé). Chaque constat doit citer la page, l’état et la preuve (sortie d’axe, capture).`,
  },
  {
    key: 'design',
    prompt: `Dimension : CRITIQUE DE DESIGN selon impeccable. L’application enseigne impeccable : elle doit elle-même le respecter. Capture chaque page (desktop 1366×900 et mobile 390×844, clair ET sombre, avec un peu de progression : réponds à quelques épreuves d’abord) et examine les captures. Évalue avec craft-floor.md (contraste, profondeur, rythme d’espacement, typo, mouvement, états, surfaces du navigateur, texte, couverture ; et la liste « Refuse » : grilles de cartes identiques, modèle hero-metric, sur-titres, numéros de section, modale par réflexe, texte en dégradé, verre décoratif, bordures latérales colorées, ombres dures, chrome décoratif, monospace-costume, glyphes/emoji en icônes, thème choisi par habitude…), operate.md (surface Opérer : contrôles standard, une famille, états complets, mouvement 150–250 ms), les 62 règles du détecteur (rules.json) et les 10 heuristiques de Nielsen (critique.md). Signale ce qui enfreint réellement ces règles ou nuit à l’usage (hiérarchie, lisibilité, débordements, incohérences entre pages, contraste mesuré). Donne pour chaque constat la page, le mode, la capture et la règle enfreinte.`,
  },
  {
    key: 'copy',
    prompt: `Dimension : TEXTES DE L’INTERFACE (français). Relis TOUTES les chaînes visibles dans src/pages, src/components, src/app, index.html, public/manifest.webmanifest, README.md et src/content/resources.ts (pas les modules de contenu). Vérifie avec clarify.md : libellés verbe + objet, cohérence terminologique (épreuve, leçon, fiche, session, révision…), tutoiement constant, formulations genrées évitables, messages d’erreur et états vides utiles, confirmation destructive explicite ; orthographe, grammaire, accords, typographie française (’ et « »), pluriels (1 épreuve / 2 épreuves), majuscules. Vérifie aussi l’exactitude des chiffres de l’aide-mémoire (src/content/resources.ts) contre les références impeccable et WCAG. Cite fichier et ligne pour chaque constat.`,
  },
  {
    key: 'perf',
    prompt: `Dimension : PERFORMANCE ET LIVRAISON. Fais \`npx vite build\` dans une copie isolée (git worktree dans le scratchpad avec un lien symbolique vers node_modules, puis supprime-la) ou analyse la sortie de build ; mesure les tailles de chunks ; sers le dossier dist (http-server ou vite preview sur un port libre) et mesure avec Playwright les métriques de chargement (FCP, LCP via PerformanceObserver, CLS, long tasks, temps jusqu’à l’interactivité) en réseau et CPU bridés (CDP : Network.emulateNetworkConditions ~ 1,6 Mbit/s, 150 ms ; Emulation.setCPUThrottlingRate 4), au premier chargement et au second (service worker). Repère : re-rendus inutiles coûteux (ex. useProgress sur toutes les pages), Shadow DOM des maquettes recréé trop souvent, polices, lazy-loading (cultures, catalogue), service worker (stratégie, invalidation). Ne signale que ce qui a un impact mesuré ou évident, avec les chiffres.`,
  },
]

const verified = await pipeline(
  DIMENSIONS,
  (d) => agent(`${CONTEXT}\n\n${d.prompt}\n\nRends uniquement des constats VÉRIFIÉS, classés P0 (bloquant) à P3 (finition). Pas de remarques de goût. Si tout va bien dans un domaine, ne force rien.`, { label: `find:${d.key}`, phase: 'Find', schema: FINDINGS, agentType: 'general-purpose' }),
  async (found, d) => {
    if (!found || !found.findings.length) return { key: d.key, findings: [], verdicts: [] }
    log(`${d.key} : ${found.findings.length} constat(s) à vérifier`)
    const v = await agent(
      `${CONTEXT}\n\nTu es un CONTRADICTEUR. Voici des constats d’audit (dimension ${d.key}). Pour CHACUN, essaie de le réfuter : relis le code, reproduis le scénario toi-même (script, Playwright, test), mesure. Par défaut, si tu ne parviens pas à reproduire ou si c’est du goût, real=false. Réévalue la sévérité et précise la correction si le constat est réel.\n\nConstats (JSON) :\n${JSON.stringify(found.findings, null, 1)}`,
      { label: `verify:${d.key}`, phase: 'Verify', schema: VERDICTS, agentType: 'general-purpose' },
    )
    return { key: d.key, findings: found.findings, verdicts: v ? v.verdicts : [] }
  },
)

const confirmed = []
for (const r of verified.filter(Boolean)) {
  for (const f of r.findings) {
    const v = r.verdicts.find((x) => x.id === f.id)
    if (v && v.real) confirmed.push({ dimension: r.key, ...f, severity: v.severity || f.severity, fix: v.fix || f.fix, reason: v.reason })
  }
}
const order = { P0: 0, P1: 1, P2: 2, P3: 3 }
confirmed.sort((a, b) => order[a.severity] - order[b.severity])
log(`${confirmed.length} constat(s) confirmé(s)`)
return {
  confirmed,
  refutedCount: verified.filter(Boolean).reduce((n, r) => n + r.findings.length, 0) - confirmed.length,
}
