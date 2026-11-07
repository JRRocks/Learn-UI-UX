export const meta = {
  name: 'final-integration',
  description: 'Sweep the merged app for integration regressions against the base, confirm them adversarially, then fix, verify and repair in an isolated worktree',
  whenToUse: 'After merging several fix branches that were each verified alone',
  phases: [
    { title: 'Sweep', detail: 'two read-only sweeps of the merged head, compared with the base' },
    { title: 'Confirm', detail: 'a skeptic replays each batch and refutes what does not hold' },
    { title: 'Fix', detail: 'one fixer for every confirmed finding, in worktree fix/final-integ' },
    { title: 'Verify', detail: 'a skeptic replays each fix and hunts regressions' },
    { title: 'Repair', detail: 'one repair round for what the skeptic found' },
  ],
}

const SCRATCH = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad'
const REPO = '/home/user/Learn-UI-UX'
const HEAD_WT = `${SCRATCH}/wt/integ-head`
const BASE_WT = `${SCRATCH}/wt/base-e00241d`
const FIX_WT = `${SCRATCH}/wt/final-integ`
const RUN = `${SCRATCH}/final-integ`

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'identifiant court et stable, en kebab-case' },
          severity: { type: 'string', enum: ['P1', 'P2', 'P3'] },
          title: { type: 'string' },
          where: { type: 'string', description: 'route(s), fichier(s) et sélecteur(s) en cause' },
          scenario: { type: 'string', description: 'étapes exactes, fenêtre, thème, pointeur, état de la progression' },
          evidence: { type: 'string', description: 'mesures, sortie de script (chemin), capture ouverte (chemin)' },
          origin: { type: 'string', enum: ['fusion', 'branche', 'antérieur'], description: 'fusion = n’existe sur aucune branche seule ; branche = introduit par une des quatre branches ; antérieur = déjà présent sur la base e00241d' },
          base: { type: 'string', description: 'ce que fait la base e00241d dans le même scénario' },
          proposedFix: { type: 'string' },
        },
        required: ['id', 'severity', 'title', 'where', 'scenario', 'evidence', 'origin', 'base', 'proposedFix'],
      },
    },
    coverage: { type: 'string', description: 'ce qui a été parcouru (écrans, épreuves, tailles, thèmes, pointeurs) et ce qui ne l’a pas été' },
    checks: { type: 'string' },
  },
  required: ['findings', 'coverage', 'checks'],
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
          severity: { type: 'string', enum: ['P1', 'P2', 'P3'] },
          evidence: { type: 'string' },
          fixAdvice: { type: 'string', description: 'la correction la plus sûre selon toi' },
        },
        required: ['id', 'real', 'severity', 'evidence', 'fixAdvice'],
      },
    },
  },
  required: ['verdicts'],
}

const FIXED = {
  type: 'object',
  properties: {
    fixed: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, how: { type: 'string' } }, required: ['id', 'how'] } },
    notFixed: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] } },
    commits: { type: 'array', items: { type: 'string' } },
    checks: { type: 'string' },
  },
  required: ['fixed', 'notFixed', 'commits', 'checks'],
}

const CHECKED = {
  type: 'object',
  properties: {
    results: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, ok: { type: 'boolean' }, evidence: { type: 'string' } }, required: ['id', 'ok', 'evidence'] } },
    regressions: {
      type: 'array',
      items: { type: 'object', properties: { title: { type: 'string' }, where: { type: 'string' }, evidence: { type: 'string' }, fix: { type: 'string' } }, required: ['title', 'where', 'evidence', 'fix'] },
    },
    checks: { type: 'string' },
  },
  required: ['results', 'regressions', 'checks'],
}

const PROJECT = `Projet : ${REPO} — application web « Épreuves » (Vite 8 + React 19 + TypeScript), atelier pour progresser en UI/UX, entièrement en français (tutoiement), routage par hash, progression en localStorage (clé et format dans src/engine/progress.ts), service worker en production (src/sw.js, généré dans dist/sw.js), contenu chargé à la demande (src/content/index.ts). Moteur pur dans src/engine, maquettes en Shadow DOM (src/components/Mock.tsx, mockKit.ts), lecteurs d’épreuves (src/components/exercise), pages (src/pages), styles (src/styles : jetons OKLCH clair/sombre dans tokens.css, base.css, app.css). README.md et docs/CONTENU.md décrivent l’ensemble.

CE QUI VIENT D’ÊTRE FUSIONNÉ (tête ${args.head}, base de comparaison ${args.base}) : quatre branches corrigées et vérifiées CHACUNE SEULE, puis fusionnées.
- fix/final-styles : grille des choix visuels (minmax(0, 1fr)), écrans courts (barres non collantes sous 30rem de haut, onglets icône + libellé), toasts (fermés au toucher, fermés quand Tab ou une flèche met le focus dessous, Échap ; placés dans la bande de la barre « Valider » à partir de 720 px, au-dessus d’elle sur téléphone), ligne « leçon · type » au-dessus de la question (prop about d’ExerciseView, Session, Blitz), lien « À propos » de Progression, tailles .md h2/h3/h4, séparateurs .meta, alignement des colonnes chiffrées, .badge, .market-name, règles mortes supprimées, check:overflow étendu aux choix visuels.
- fix/final-pages : cartes de révision promises dans le sommaire replié des leçons (ReviewCards, lessonCards.ts), focus conservé après « Marquer comme lue » (note focalisable) et quand l’épreuve d’une session disparaît (h1#main-title), keepFocusInView (src/lib/focusInView.ts : ramène dans la vue un contrôle atteint au clavier, seulement s’il est masqué), bilan de session avec la correction de chaque épreuve (ExercisePlayer et QuestionStage réutilisés en lecture seule), lien de marque nommé par son texte, aria-current sur Progression dans la barre du haut, SourceLink/SourceList (src/components/SourceLink.tsx) et QUOTED_TITLES (src/content/sources.ts) pour la langue des titres cités.
- fix/final-exercise : badges « Recommandé » / « Ton choix » (OptionBadge) en vrai/faux et dans le Défi chrono, choix faux visible dans le Défi chrono, ScrollRegion (src/components/ScrollRegion.tsx) pour les tableaux qui défilent, boîtes défilantes des maquettes role=img figées en overflow: clip (data-mk-still), 17 zones de hotspot nommées, heure swahilie en lang=sw.
- fix/final-offline : redirections de la page transmises par le service worker, préchargement en arrière-plan qui survit aux coupures (src/content/index.ts), cultures + catalogue (src/content/catalog.ts) + polices gardés pour le hors-ligne, LoadFailed qui vérifie le site avant de recharger (région role=status, vérification annulée quand on quitte la vue ou qu’on passe hors ligne).
Une autre équipe corrige EN MÊME TEMPS, dans son propre worktree (fix/final-text), le défilement horizontal quand la taille de texte par défaut du navigateur est agrandie (20 à 32 px) : grille de .task-actions sous 640 px, .shortcut-hint, .task-prompt, .takeaway, et une passe « texte agrandi » dans scripts/check-overflow.mjs. Ce sujet n’est PAS le tien : ne le rapporte pas et n’y touche pas.

WORKTREES :
- Tête fusionnée, en lecture seule : ${HEAD_WT} (détaché à ${args.head}, node_modules en lien). Sers TOUJOURS celle-ci, jamais ${REPO}, qui peut bouger pendant ton travail.
- Base de comparaison, en lecture seule : ${BASE_WT} (détachée à ${args.base}).
- Les quatre worktrees des branches, si tu dois savoir d’où vient un comportement : ${SCRATCH}/wt/final-styles, final-pages, final-exercise, final-offline. Leurs scripts de reproduction et de mesure sont dans ${SCRATCH}/appfix/run-final-*/ et ${SCRATCH}/appfix/contra-final-*/ : réutilise-les (copie-les dans ton dossier et pointe-les sur tes serveurs).

OUTILS : serveur de dev = script Node qui importe createServer depuis ${REPO}/node_modules/vite/dist/node/index.js avec root: '<worktree>', server: { port: 0, host: '127.0.0.1', hmr: false } (modèle : scripts/shots.mjs) ; build de production = \`npx vite build --outDir <dossier du scratchpad>\` lancé DANS le worktree, servi par un petit serveur statique Node (base relative './') ; Playwright via createRequire('${REPO}/package.json')('playwright') (navigateur déjà installé, ne lance jamais « playwright install ») ; axe-core : ${SCRATCH}/axe/node_modules/axe-core/axe.min.js ; CDP pour la taille de texte (Page.setFontSizes), le ralentissement CPU (Emulation.setCPUThrottlingRate) et l’arbre d’accessibilité. Prends des captures à deviceScaleFactor 1 et OUVRE celles qui fondent un constat.

EXIGENCES DE DESIGN (l’app enseigne impeccable et doit le respecter) : ${SCRATCH}/ext/impeccable/skill/reference/craft-floor.md, operate.md, audit.md ; WCAG 2.2 AA ; contrastes ≥ 4,5:1 (texte) et ≥ 3:1 (contrôles et focus) dans les DEUX thèmes ; cibles ≥ 24 px (44 visés au toucher) ; pas de défilement horizontal à 320 px ; focus toujours visible, jamais masqué par une barre collante ou un toast (2.4.11), jamais perdu ; textes en français, tutoiement, typographie française ; icônes Lucide ; mouvements de 150 à 250 ms sous prefers-reduced-motion: no-preference. Les défauts VOULUS des versions « À éviter » des maquettes, et l’intérieur des maquettes role=img, ne sont pas des constats.`

function sweepPrompt(s) {
  return `${PROJECT}

TU ES UN AUDITEUR D’INTÉGRATION, en lecture seule : ne modifie AUCUN fichier des worktrees ni de ${REPO}, ne commite rien. Tes scripts, sorties et captures vont dans ${RUN}/${s.key}/.
Chaque branche a été vérifiée seule ; cherche ce qui casse ou se dégrade UNE FOIS FUSIONNÉ (interactions entre branches), et tout autre défaut réel encore présent sur la tête dans ton périmètre.
${s.scope}

Méthode : pour chaque anomalie, reproduis-la au moins deux fois sur la tête (dev ET build de production quand cela peut différer), puis rejoue le même scénario sur la base pour remplir « origin » et « base ». Ne rapporte que des défauts réels et démontrés, avec la mesure ou la capture qui le prouve ; pas d’impressions. Sévérité : P1 = une tâche bloquée, une donnée perdue ou un critère WCAG A échoué ; P2 = un critère AA échoué ou un bug fonctionnel net ; P3 = défaut visible mineur. Dans « coverage », dis précisément ce que tu as parcouru et ce que tu n’as pas pu parcourir.
Rends findings, coverage, checks.`
}

const SWEEPS = [
  {
    key: 'sessions',
    scope: `TON PÉRIMÈTRE : les sessions et ce qui les entoure.
- Une épreuve de CHAQUE format en session (choice texte, choice à options visuelles et duel, multi, truefalse, hotspot, order, match, slider, grid) : avant Valider, après Valider (correction, sources, « Revoir la leçon »), puis « Épreuve suivante ». Modes : #/session?mode=daily, mode=module&id=<leçon>, mode=type&id=<format>, mode=mistakes et mode=review (prépare une progression en localStorage), mode=culture, mode=exam jusqu’au bilan (corrections de chaque épreuve, badges vrai/faux, grille des options visuelles, « Choix recommandé »), mode=blitz (Défi chrono : bonne et mauvaise réponse, badges, fin et record), et les Fiches (#/fiches).
- Toasts (badge « Première épreuve » après la première réponse, « Leçon lue », séries) : position selon la largeur et la hauteur, ce qu’ils recouvrent juste après Valider et en fin de page, fermeture au toucher et au clic sans rien activer dessous, fermeture quand Tab ou une flèche met le focus dessous, Échap, annonces aux lecteurs d’écran.
- Parcours au clavier seul de bout en bout (Tab, Maj+Tab, raccourcis 1–n, V/F, Entrée, Échap) : chaque contrôle atteignable, focus visible, jamais masqué (barre du haut, barre « Valider », toasts), jamais perdu après une action ; keepFocusInView ne doit jamais faire sauter la page au clic ou au toucher.
- Fenêtres : 1366×900, 1024×768, 768×1024 tactile, 390×844 tactile et souris, 360×780, 320×640, et écrans courts 320×256, 640×360, 844×390 tactile ; thèmes clair et sombre ; prefers-reduced-motion: reduce une fois.
- Rejoue aussi les scripts des vérificateurs des quatre branches qui touchent aux sessions (${SCRATCH}/appfix/contra-final-styles/, contra-final-exercise/, contra-final-pages/) sur la tête fusionnée : un scénario qui passait sur sa branche et échoue une fois fusionné est un constat d’origine « fusion ».`,
  },
  {
    key: 'pages-offline',
    scope: `TON PÉRIMÈTRE : toutes les pages hors sessions, et le hors-ligne.
- axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa) sur TOUTES les routes (la liste de ${HEAD_WT}/scripts/check-overflow.mjs) en clair et en sombre, à 1366 et 390 px, sur la tête et sur la base : toute violation nouvelle est un constat ; une violation ancienne réelle (pas un faux positif dans une maquette role=img) aussi.
- Leçons (#/apprendre/<id>) : sommaire replié sous 1100 px et cartes de révision promises, « Marquer comme lue » (focus sur la note), sommaire et sauts, paires d’exemples, sources (langue des titres cités : lang=en, de, sv, ja, pt), parcours clavier. Ressources (catalogue : recherche, filtres, pause des animations, focus ramené dans la vue après chargement tardif ; commandes et leur tableau ScrollRegion ; aide-mémoire ; glossaire ; liens). Cultures (index, profils dont #/cultures/jp et #/cultures/ke avec l’heure swahilie, comparateur, paires, labo). Progression (tableaux ScrollRegion, import/export et leurs dialogues, lien « À propos », aria-current dans la barre du haut). Accueil, Apprendre, S’entraîner, À propos, page introuvable. Barre du haut, rail, barre d’onglets à toutes les largeurs, lien de marque, écrans courts.
- Hors-ligne et PWA sur le build de production : installation du service worker à la première visite, précache complet (BUILD.files de dist/sw.js contre le contenu de dist/), puis hors ligne : chaque route s’ouvre (leçons, cultures, catalogue en français, polices) ; sans service worker (serviceWorkers: 'block') : préchargement en arrière-plan puis hors ligne ; LoadFailed quand un morceau manque (région de statut, annulation quand on quitte la vue) ; mise à jour vers un nouveau build (ancienne version conservée N-1, rechargement).
- Taille et vitesse : poids des fichiers JS et CSS initiaux comparé à la base (seule hausse attendue : la table QUOTED_TITLES, ≈ 2,4 ko gzip), pas de tâche longue > 200 ms au changement de page sous CPU ×4 sur le catalogue et une grande leçon.
- Rejoue aussi les scripts des vérificateurs de fix/final-pages et fix/final-offline (${SCRATCH}/appfix/contra-final-pages/, run-final-offline/round2/ et run-final-offline/contra/) sur la tête fusionnée : un scénario qui passait sur sa branche et échoue une fois fusionné est un constat d’origine « fusion ».`,
  },
]

function confirmPrompt(s, sweep) {
  return `${PROJECT}

TU ES UN CONTRADICTEUR, en lecture seule : ne modifie aucun fichier, ne commite rien ; tes scripts vont dans ${RUN}/confirm-${s.key}/. Un auditeur d’intégration rapporte les constats ci-dessous sur la tête ${args.head}. Pour CHACUN, rejoue le scénario toi-même sur ${HEAD_WT} (et sur ${BASE_WT} pour l’origine) et cherche à le RÉFUTER : mauvaise mesure, défaut voulu d’une maquette « À éviter », intérieur d’une maquette role=img, scénario impossible pour un vrai utilisateur, sujet du texte agrandi (traité ailleurs). real=false par défaut si tu ne peux pas le reproduire. Ajuste la sévérité si elle est mal évaluée, et donne la correction la plus sûre.
Constats (JSON) :
${JSON.stringify(sweep.findings, null, 1)}
Rends verdicts (un par constat).`
}

function fixPrompt(list) {
  return `${PROJECT}

TA MISSION : corriger les constats d’intégration CONFIRMÉS ci-dessous (un auditeur les a trouvés, un contradicteur les a reproduits).
ESPACE DE TRAVAIL : crée ton worktree avec \`git -C ${REPO} worktree add ${FIX_WT} -b fix/final-integ ${args.head}\` puis \`ln -s ${REPO}/node_modules ${FIX_WT}/node_modules\` (s’il existe déjà, reprends-le tel quel). Travaille UNIQUEMENT dans ${FIX_WT}. Commite au fil de l’eau, messages en anglais à l’impératif, sans nom de modèle, terminés par ces deux lignes précédées d’une ligne vide :
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01EL3qoSvc2Q5ZPuKJcjJHox
Jamais de push, jamais de rebase. Tes scripts et captures vont dans ${RUN}/fix/.
Tu peux modifier src/ et scripts/, sauf : le texte enseigné des fichiers de contenu (src/content/modules/*, src/content/cultures/*.ts, src/content/antipatterns.ts : seuls des attributs non textuels y sont permis), et les règles du texte agrandi que fix/final-text modifie en même temps (grille de .task-actions sous 640 px, .shortcut-hint, .task-prompt, .takeaway, passe « texte agrandi » de scripts/check-overflow.mjs).
Pour chaque constat : corrige à la racine (du P1 au P3), ajoute un test vitest pour toute logique testable, rejoue le scénario sur ton worktree, et pour tout changement visuel fais des captures avant/après à 1366, 390 et 320 px en clair ET en sombre, et OUVRE-les. À la fin : \`npx tsc --noEmit\`, \`npx vitest run\`, \`npx vite build --outDir ${RUN}/fix/dist\`, \`npm run check:overflow\` et, si tu touches au rendu des maquettes, \`npm run check:mocks\`, tous verts, et rien n’a régressé sur les écrans touchés (clavier compris).
Constats confirmés (JSON) :
${JSON.stringify(list, null, 1)}
Rends fixed, notFixed (avec la raison précise), commits, checks.`
}

function verifyPrompt(list, fix) {
  return `${PROJECT}

TU ES UN CONTRADICTEUR, en lecture seule : ne modifie aucun fichier, ne commite rien ; tes scripts vont dans ${RUN}/verify/. La branche fix/final-integ (worktree ${FIX_WT}, base ${args.head}) prétend corriger les constats ci-dessous. Diff : \`git -C ${FIX_WT} diff ${args.head}..HEAD\`.
Constats (JSON) :
${JSON.stringify(list, null, 1)}
Rapport du correcteur (JSON) :
${JSON.stringify(fix, null, 1)}
1. Pour CHAQUE constat, rejoue le scénario sur ${FIX_WT} et dis s’il est réellement corrigé (ok=true), avec la preuve ; ok=false par défaut si tu ne peux pas le démontrer.
2. Cherche les RÉGRESSIONS du diff : parcours au clavier des écrans touchés, axe-core en clair et en sombre, captures à 1366, 390 et 320 px, tsc, vitest, build, check:overflow.
Rends results, regressions, checks.`
}

function repairPrompt(check) {
  return `${PROJECT}

Un contradicteur a contrôlé ta branche fix/final-integ (worktree ${FIX_WT}). Corrige ce qui reste, commite, et prouve-le comme avant (scénario rejoué, captures ouvertes, tsc, vitest, build, check:overflow). Mêmes règles d’espace de travail et de périmètre qu’avant : uniquement ${FIX_WT}, pas de push, pas de rebase, messages terminés par les deux lignes d’attribution (Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com> puis Claude-Session: https://claude.ai/code/session_01EL3qoSvc2Q5ZPuKJcjJHox).
Constats non corrigés selon lui (JSON) :
${JSON.stringify(check.results.filter((r) => !r.ok), null, 1)}
Régressions trouvées (JSON) :
${JSON.stringify(check.regressions, null, 1)}
Si un point te semble faux, ne le « corrige » pas : mets-le dans notFixed avec ta preuve. Rends fixed, notFixed, commits, checks.`
}

phase('Sweep')
const batches = await pipeline(
  SWEEPS,
  (s) => agent(sweepPrompt(s), { label: `sweep:${s.key}`, phase: 'Sweep', schema: FINDINGS, agentType: 'general-purpose' }),
  async (sweep, s) => {
    if (!sweep) return { key: s.key, sweep: null, confirmed: [] }
    if (!sweep.findings.length) {
      log(`${s.key} : aucun constat`)
      return { key: s.key, sweep, confirmed: [] }
    }
    const v = await agent(confirmPrompt(s, sweep), { label: `confirm:${s.key}`, phase: 'Confirm', schema: VERDICTS, agentType: 'general-purpose' })
    const byId = new Map((v ? v.verdicts : []).map((x) => [x.id, x]))
    const confirmed = sweep.findings
      .filter((f) => byId.get(f.id) && byId.get(f.id).real)
      .map((f) => ({ ...f, severity: byId.get(f.id).severity, confirmation: byId.get(f.id).evidence, fixAdvice: byId.get(f.id).fixAdvice }))
    log(`${s.key} : ${sweep.findings.length} constat(s), ${confirmed.length} confirmé(s)`)
    return { key: s.key, sweep, confirmed, refuted: sweep.findings.filter((f) => !(byId.get(f.id) && byId.get(f.id).real)).map((f) => ({ id: f.id, why: byId.get(f.id) ? byId.get(f.id).evidence : 'non examiné' })) }
  },
)

// One fixer for everything confirmed: both sweeps may point at the same files (app.css, ExerciseView).
const seen = new Set()
const confirmed = []
for (const b of batches.filter(Boolean)) {
  for (const f of b.confirmed) {
    const k = f.id
    if (seen.has(k)) continue
    seen.add(k)
    confirmed.push({ ...f, sweep: b.key })
  }
}
const order = { P1: 0, P2: 1, P3: 2 }
confirmed.sort((a, b) => order[a.severity] - order[b.severity])

const summary = {
  sweeps: batches.filter(Boolean).map((b) => ({ key: b.key, found: b.sweep ? b.sweep.findings.length : null, confirmed: b.confirmed.map((f) => `${f.severity} ${f.id} (${f.origin})`), refuted: b.refuted || [], coverage: b.sweep ? b.sweep.coverage : null })),
}
if (!confirmed.length) {
  log('Aucun constat confirmé : rien à corriger')
  return { ...summary, confirmed: [], fix: null, check: null, repair: null }
}

phase('Fix')
const fix = await agent(fixPrompt(confirmed), { label: 'fix:final-integ', phase: 'Fix', schema: FIXED, agentType: 'general-purpose' })
if (!fix) return { ...summary, confirmed, fix: null, check: null, repair: null }

phase('Verify')
const check = await agent(verifyPrompt(confirmed, fix), { label: 'verify:final-integ', phase: 'Verify', schema: CHECKED, agentType: 'general-purpose' })
if (!check) return { ...summary, confirmed, fix, check: null, repair: null }
const bad = check.results.filter((r) => !r.ok).length + check.regressions.length
log(`final-integ : ${check.results.filter((r) => r.ok).length} confirmé(s), ${bad} point(s) à reprendre`)

let repair = null
if (bad) {
  phase('Repair')
  repair = await agent(repairPrompt(check), { label: 'repair:final-integ', phase: 'Repair', schema: FIXED, agentType: 'general-purpose' })
}

return {
  ...summary,
  confirmed: confirmed.map((f) => ({ id: f.id, severity: f.severity, origin: f.origin, title: f.title })),
  fix: { fixed: fix.fixed, notFixed: fix.notFixed, commits: fix.commits, checks: fix.checks },
  check: { ok: check.results.filter((r) => r.ok).map((r) => r.id), failed: check.results.filter((r) => !r.ok), regressions: check.regressions },
  repair,
}
