export const meta = {
  name: 'fix-app',
  description: 'Fix verified app-audit findings per file group in isolated git worktrees, then adversarially re-verify and repair',
  whenToUse: 'After review-app: apply confirmed findings without touching the files other agents are editing',
  phases: [
    { title: 'Fix', detail: 'one fixer per file group, in its own worktree branch fix/<group>' },
    { title: 'Verify', detail: 'a skeptic replays every original scenario and hunts regressions in the diff' },
    { title: 'Repair', detail: 'one repair round for what the skeptic found' },
  ],
}

const SCRATCH = args.scratch // dossier de travail de la session (scratchpad)
const REPO = '/home/user/Learn-UI-UX'

const FIXED = {
  type: 'object',
  properties: {
    fixed: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, how: { type: 'string' } }, required: ['id', 'how'] } },
    notFixed: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] } },
    outside: { type: 'array', items: { type: 'string' }, description: 'fichiers hors de ton périmètre que tu as dû modifier, et pourquoi' },
    commits: { type: 'array', items: { type: 'string' }, description: 'sha et message de chaque commit de ta branche' },
    checks: { type: 'string', description: 'tsc, vitest, build, reproductions rejouées, captures ouvertes' },
  },
  required: ['fixed', 'notFixed', 'outside', 'commits', 'checks'],
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

function common(g) {
  const wt = `${SCRATCH}/wt/${g.key}`
  return `Projet : ${REPO} — application web « Épreuves » (Vite 8 + React 19 + TypeScript), atelier pour progresser en UI/UX, entièrement en français (tutoiement), routage par hash, progression en localStorage, service worker en production. Moteur pur dans src/engine, maquettes en Shadow DOM (src/components/Mock.tsx, mockKit.ts), lecteurs d’épreuves (src/components/exercise), pages (src/pages), styles (src/styles : jetons OKLCH clair/sombre dans tokens.css, base.css, app.css).

ESPACE DE TRAVAIL ISOLÉ — obligatoire :
- Ton worktree : ${wt}, branche fix/${g.key}. S’il n’existe pas encore : \`git -C ${REPO} worktree add ${wt} -b fix/${g.key} ${args.base}\` puis \`ln -s ${REPO}/node_modules ${wt}/node_modules\`. S’il existe déjà, reprends-le tel quel (git -C ${wt} status / log).
- Travaille UNIQUEMENT dans ${wt} (chemins absolus). Ne modifie RIEN dans ${REPO} : d’autres agents y corrigent le contenu en ce moment, et d’autres groupes corrigent d’autres fichiers de l’app dans leurs propres worktrees.
- Ne touche jamais aux fichiers de contenu : src/content/modules/*, src/content/cultures/profiles.ts, src/content/cultures/pairs.ts, src/content/antipatterns.ts.
- Commite dans ta branche au fil de l’eau (\`git -C ${wt} add -A && git -C ${wt} commit -m "…"\`), messages en anglais à l’impératif, sans nom de modèle ; termine chaque message par les lignes d’attribution suivantes, précédées d’une ligne vide :
${args.attribution}
  Jamais de push, jamais de rebase.
- Fichiers que tu possèdes : ${g.owns}. Si un correctif exige un autre fichier, fais le changement minimal et liste-le dans « outside » (les branches seront fusionnées ensuite).

OUTILS : pour un serveur, un script Node qui importe createServer depuis ${REPO}/node_modules/vite/dist/node/index.js avec root: '${wt}', server: { port: 0, host: '127.0.0.1', hmr: false } (modèle : scripts/shots.mjs) ; Playwright via createRequire('${REPO}/package.json')('playwright') (navigateur déjà installé, ne lance jamais « playwright install ») ; axe-core : ${SCRATCH}/axe/node_modules/axe-core/axe.min.js. Les scripts de reproduction des auditeurs et vérificateurs sont dans ${SCRATCH}/app-audit/ (contra-logic, contra-a11y, contra-design, contra-copy, et les t*.mjs) : ils servent ${REPO} ; copie ceux dont tu as besoin dans ${SCRATCH}/appfix/run-${g.key}/ et pointe-les sur ton worktree. Mets tes scripts et captures dans ${SCRATCH}/appfix/run-${g.key}/. Vérifications dans le worktree : \`npx tsc --noEmit\`, \`npx vitest run\`, \`npx vite build\` (sortie dans un dossier du scratchpad avec --outDir), et \`npm run check:mocks\` si tu touches au rendu des maquettes.

EXIGENCES DE DESIGN (l’app enseigne impeccable et doit le respecter) : ${SCRATCH}/ext/impeccable/skill/reference/craft-floor.md, operate.md, audit.md, clarify.md ; WCAG 2.2 AA ; contrastes ≥ 4,5:1 (texte) et ≥ 3:1 (contrôles) dans les DEUX thèmes ; cibles ≥ 24 px (44 visés au toucher) ; pas de défilement horizontal à 320 px ; textes en français, tutoiement, typographie française (frenchSpacing de src/lib/markdown.tsx) ; icônes Lucide uniquement ; mouvements de 150 à 250 ms, sous prefers-reduced-motion: no-preference.`
}

function fixPrompt(g) {
  return `${common(g)}

TA MISSION : corriger les constats d’audit VÉRIFIÉS du groupe « ${g.key} », listés en JSON dans ${SCRATCH}/appfix/${g.key}.json (lis le fichier en entier : pour chacun, le scénario, la preuve, la correction proposée et l’avis du vérificateur, qui a reproduit chaque constat). Les identifiants note-* viennent des correcteurs de contenu : traite-les de la même façon.
- Corrige chaque constat à la racine, du plus grave (P1) au moins grave (P3). Si la correction proposée est discutable, choisis la meilleure et explique-la.
- Ajoute un test vitest pour chaque bug de logique testable en unitaire (fonctions pures du moteur, helpers).
- Prouve chaque correction : rejoue la reproduction d’origine sur ton worktree ; pour tout changement visuel, fais des captures avant/après à 1366, 390, 360 et 320 px, en clair ET en sombre, et OUVRE-les.
- À la fin, tsc, vitest et le build passent, et rien n’a régressé sur les écrans que tu as touchés (navigation au clavier comprise).
Rends : fixed (id + comment), notFixed (id + raison précise), outside, commits, checks.`
}

function verifyPrompt(g, fix) {
  return `${common(g)}

TU ES UN CONTRADICTEUR, en lecture seule : ne modifie AUCUN fichier, ne commite rien. La branche fix/${g.key} (worktree ${SCRATCH}/wt/${g.key}, base ${args.base}) prétend corriger les constats de ${SCRATCH}/appfix/${g.key}.json. Diff : \`git -C ${SCRATCH}/wt/${g.key} diff ${args.base}..HEAD\`.
Rapport du correcteur (JSON) :
${JSON.stringify(fix, null, 1)}

1. Pour CHAQUE constat du fichier (corrigé ou non selon le correcteur), rejoue le scénario d’origine sur le worktree et dis s’il est réellement corrigé (ok=true) ; par défaut ok=false si tu ne peux pas le démontrer. Preuve : sortie de script, mesure, capture ouverte.
2. Cherche les RÉGRESSIONS introduites par le diff : parcours au clavier les écrans touchés, axe-core (wcag2a, wcag2aa, wcag21aa, wcag22aa) sur les pages touchées en clair et en sombre, captures à 1366, 390 et 320 px, \`npx tsc --noEmit\`, \`npx vitest run\`, build. Une régression = quelque chose qui marchait à la base et ne marche plus, ou un nouveau défaut visible.
Rends results (un par constat), regressions, checks.`
}

function repairPrompt(g, fix, check) {
  const failed = check.results.filter((r) => !r.ok)
  return `${common(g)}

Un contradicteur a contrôlé ta branche fix/${g.key}. Corrige dans ton worktree ce qui reste, commite, et prouve-le comme avant (reproduction rejouée, captures ouvertes, tsc/vitest/build).
Constats non corrigés selon lui (JSON) :
${JSON.stringify(failed, null, 1)}
Régressions trouvées (JSON) :
${JSON.stringify(check.regressions, null, 1)}
Rapport initial du correcteur, pour mémoire : ${JSON.stringify(fix.notFixed)}
Si tu estimes qu’un point du contradicteur est faux, ne le « corrige » pas : liste-le dans notFixed avec ta preuve. Rends fixed, notFixed, outside, commits, checks.`
}

const out = await pipeline(
  args.groups,
  (g) => agent(fixPrompt(g), { label: `fix:${g.key}`, phase: 'Fix', schema: FIXED, agentType: 'general-purpose' }),
  async (fix, g) => {
    if (!fix) return { key: g.key, fix: null, check: null, repair: null }
    const check = await agent(verifyPrompt(g, fix), { label: `verify:${g.key}`, phase: 'Verify', schema: CHECKED, agentType: 'general-purpose' })
    if (!check) return { key: g.key, fix, check: null, repair: null }
    const bad = check.results.filter((r) => !r.ok).length + check.regressions.length
    log(`${g.key} : ${check.results.filter((r) => r.ok).length} confirmé(s), ${bad} point(s) à reprendre`)
    if (!bad) return { key: g.key, fix, check, repair: null }
    const repair = await agent(repairPrompt(g, fix, check), { label: `repair:${g.key}`, phase: 'Repair', schema: FIXED, agentType: 'general-purpose' })
    return { key: g.key, fix, check, repair }
  },
)

return out.filter(Boolean).map((r) => ({
  key: r.key,
  fixed: r.fix ? r.fix.fixed.map((f) => f.id) : [],
  notFixed: r.fix ? r.fix.notFixed : [],
  outside: [...(r.fix ? r.fix.outside : []), ...(r.repair ? r.repair.outside : [])],
  verifiedOk: r.check ? r.check.results.filter((x) => x.ok).map((x) => x.id) : [],
  verifiedFailed: r.check ? r.check.results.filter((x) => !x.ok) : [],
  regressions: r.check ? r.check.regressions : [],
  repair: r.repair ? { fixed: r.repair.fixed, notFixed: r.repair.notFixed, checks: r.repair.checks } : null,
  commits: [...(r.fix ? r.fix.commits : []), ...(r.repair ? r.repair.commits : [])],
}))
