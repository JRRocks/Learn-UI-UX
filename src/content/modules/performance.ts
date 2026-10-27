import type { ModuleContent, SourceRef } from '../../engine/types';

/** French punctuation inside mock markup: thin no-break space before ? ! ; » and after «, no-break space before :. */
const fr = (html: string) =>
  html.replace(/ ([?!;»])/g, ' $1').replace(/« /g, '« ').replace(/ :/g, ' :');

/** Escapes code shown as text in a mock. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const NNG_RESPONSE: SourceRef = {
  label: 'Nielsen Norman Group — Response Times: The 3 Important Limits (Jakob Nielsen)',
  url: 'https://www.nngroup.com/articles/response-times-3-important-limits/',
};
const NNG_SKELETON: SourceRef = { label: 'Nielsen Norman Group — Skeleton Screens 101', url: 'https://www.nngroup.com/articles/skeleton-screens/' };
const NNG_PROGRESS: SourceRef = {
  label: 'Nielsen Norman Group — Progress Indicators Make a Slow System Less Insufferable',
  url: 'https://www.nngroup.com/articles/progress-indicators/',
};
const WEBDEV_INP: SourceRef = { label: 'web.dev — Interaction to Next Paint (INP)', url: 'https://web.dev/articles/inp' };
const WEBDEV_INP_CWV: SourceRef = { label: 'web.dev — L’INP devient une Core Web Vital le 12 mars 2024', url: 'https://web.dev/blog/inp-cwv-march-12' };
const WEBDEV_LONG_TASKS: SourceRef = { label: 'web.dev — Optimize long tasks', url: 'https://web.dev/articles/optimize-long-tasks' };
const WEBDEV_RAIL: SourceRef = { label: 'web.dev — Measure performance with the RAIL model', url: 'https://web.dev/articles/rail' };
const WEBDEV_CLS: SourceRef = { label: 'web.dev — Cumulative Layout Shift (CLS)', url: 'https://web.dev/articles/cls' };
const WEBDEV_LCP: SourceRef = { label: 'web.dev — Optimize Largest Contentful Paint', url: 'https://web.dev/articles/optimize-lcp' };
const WEBDEV_LAZY: SourceRef = { label: 'web.dev — The performance effects of too much lazy loading', url: 'https://web.dev/articles/lcp-lazy-loading' };
const WEBDEV_FONTS: SourceRef = { label: 'web.dev — Best practices for fonts', url: 'https://web.dev/articles/font-best-practices' };
const MDN_FONT_DISPLAY: SourceRef = {
  label: 'MDN — font-display',
  url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@font-face/font-display',
};
const MDN_WILL_CHANGE: SourceRef = { label: 'MDN — will-change', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/will-change' };
const DOHERTY: SourceRef = { label: 'Laws of UX — Doherty Threshold', url: 'https://lawsofux.com/doherty-threshold/' };

/* ---------- Shared mock pieces ---------- */

/** Two moments of the same page load, side by side. */
const FRAMES_CSS = `
.fs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; padding: 12px; background: #f4f6f9; }
.fs > div { display: flex; flex-direction: column; }
.fs-cap { font-size: 11px; font-weight: 600; color: #5a6172; margin-bottom: 4px; }
.fs-fr { flex: 1; position: relative; overflow: hidden; padding: 8px 8px 12px; border: 1px solid #d5d9e2; border-radius: 8px; background: #fff; }
.fs-t { font-size: 11px; line-height: 16px; height: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fs-l { height: 6px; margin-top: 5px; border-radius: 3px; background: #dfe3ea; }
.fs-l.m { width: 70%; }
.fs-img { margin-top: 6px; aspect-ratio: 2 / 1; border-radius: 4px; background: linear-gradient(160deg, #b8c7dc 0%, #dfe6f0 60%, #eef2f7 100%); }
.fs-slot { margin-top: 6px; aspect-ratio: 2 / 1; border-radius: 4px; background: #eef1f5; }
.fs-btn { margin-top: 8px; height: 24px; border-radius: 5px; background: #1f4fd8; color: #fff; font-size: 11px; font-weight: 600; display: grid; place-items: center; }
.fs-ban { height: 24px; margin-bottom: 6px; border-radius: 4px; background: #fff1c9; color: #5c4300; font-size: 11px; font-weight: 600; display: grid; place-items: center; }
.fs-res { height: 24px; margin-bottom: 6px; border-radius: 4px; border: 1.5px dashed #c3c8d3; }
.fs-finger { position: absolute; left: 50%; width: 30px; height: 30px; margin-left: -15px; border-radius: 50%; background: rgb(214 120 90 / 0.3); border: 1.5px dashed #b4553a; }
`;

const frame = (caption: string, inner: string) => `<div><p class="fs-cap">${caption}</p><div class="fs-fr">${inner}</div></div>`;

const LINES = `<div class="fs-l"></div><div class="fs-l"></div><div class="fs-l m"></div>`;

const SKELETON_CSS = `
.sk-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.sk-area { height: 300px; position: relative; }
.sk-post { padding: 12px 16px; border-bottom: 1px solid #eceef2; }
.sk-av { width: 32px; height: 32px; border-radius: 50%; background: #e2e6ed; flex: none; }
.sk-img { margin-top: 10px; height: 96px; border-radius: 8px; background: #e9ecf1; }
.sk-spin { position: absolute; top: 50%; left: 50%; width: 36px; height: 36px; margin: -18px 0 0 -18px; border-radius: 50%; border: 3.5px solid #d5dbe5; border-top-color: #1f4fd8; }
`;

const feedHead = fr(`<div class="sk-head"><p class="mk-h2">Fil</p><div class="mk-row" style="--gap:14px"><i data-icon="search"></i><i data-icon="bell"></i></div></div>`);

const skPost = `<div class="sk-post"><div class="mk-row" style="--gap:10px"><span class="sk-av"></span><div class="mk-grow mk-stack" style="--gap:6px"><div class="mk-line mk-line--m"></div><div class="mk-line mk-line--s"></div></div></div><div class="sk-img"></div></div>`;

const UPLOAD_CSS = `
.vu { display: flex; flex-direction: column; gap: 10px; padding: 16px; }
.vu-file { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: #f4f6f9; }
.vu-spin { width: 20px; height: 20px; border-radius: 50%; border: 2.5px solid #d5dbe5; border-top-color: #1f4fd8; flex: none; }
.vu-bar { height: 8px; border-radius: 4px; background: #e2e6ed; overflow: hidden; }
.vu-bar span { display: block; height: 100%; border-radius: 4px; background: #1f4fd8; }
`;

const uploadHead = fr(`<p class="mk-h3">Partager une vidéo</p>
<div class="vu-file"><i data-icon="film"></i><span class="mk-grow">Mariage-Clara-et-Hugo.mp4</span><span class="mk-small mk-muted">2 Go</span></div>`);

const CHAT_CSS = `
.ct-head { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid #e3e6ec; }
.ct-msgs { position: relative; display: flex; flex-direction: column; gap: 6px; padding: 12px; min-height: 250px; justify-content: flex-end; }
.ct-b { max-width: 80%; padding: 7px 11px; border-radius: 16px; background: #eceef3; line-height: 1.35; }
.ct-b.me { align-self: flex-end; background: #1f4fd8; color: #fff; }
.ct-st { align-self: flex-end; display: flex; align-items: center; gap: 4px; font-size: 11px; color: #5a6172; }
.ct-in { display: flex; align-items: center; gap: 8px; padding: 8px 10px 12px; border-top: 1px solid #e3e6ec; }
.ct-field { flex: 1; min-height: 40px; display: flex; align-items: center; padding: 0 14px; border-radius: 20px; background: #f0f2f6; color: #5a6172; }
.ct-send { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: #1f4fd8; color: #fff; flex: none; }
.ct-off { opacity: 0.45; }
.ct-veil { position: absolute; inset: 0; display: grid; place-items: center; background: rgb(255 255 255 / 0.75); }
.ct-box { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; background: #fff; box-shadow: 0 8px 24px rgb(15 20 35 / 0.16); }
.ct-spin { width: 20px; height: 20px; border-radius: 50%; border: 2.5px solid #d5dbe5; border-top-color: #1f4fd8; }
`;

const chatHead = fr(`<div class="ct-head"><i data-icon="arrow-left"></i><span class="mk-avatar" style="background:#f6d7c3"></span><p class="mk-strong">Inès Moreau</p></div>`);
const chatHistory = fr(`<p class="ct-b">On dîne où samedi ?</p><p class="ct-b me">Le bistrot de la place, il reste de la place à 20 h.</p><p class="ct-b">Parfait, tu réserves ?</p>`);

const ARTICLE_CSS = `
.ar { position: relative; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 8px; }
.ar-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.ar-logo { width: 84px; height: 14px; border-radius: 3px; background: #1d2230; }
.ar-cap { position: absolute; top: 22px; right: 24px; z-index: 1; padding: 2px 8px; border-radius: 999px; background: #1d2230; color: #fff; font-size: 11px; font-weight: 600; }
.ar-img { aspect-ratio: 21 / 9; border-radius: 8px; background: linear-gradient(160deg, #c8d3e4 0%, #dfe6f0 55%, #eef2f7 100%); }
.ar-t { font-size: 19px; line-height: 1.25; font-weight: 700; }
.ar-p { font-size: 13px; line-height: 1.5; }
.ar-btn { align-self: flex-start; min-width: 132px; }
.ar.foit .ar-t, .ar.foit .ar-p, .ar.foit .ar-btn { color: transparent; }
.ar.swap .ar-t, .ar.swap .ar-p { font-family: Georgia, "Times New Roman", serif; }
`;

const article = (mode: 'foit' | 'swap') =>
  fr(`<div class="ar-top"><span class="ar-logo"></span><i data-icon="menu"></i></div>
<div class="ar ${mode}">
  <p class="ar-cap">À 1,2 s</p>
  <div class="ar-img"></div>
  <p class="ar-t">Les marchés couverts reprennent vie</p>
  <p class="ar-p">À Lyon, Nantes ou Lille, les halles rénovées attirent une clientèle nouvelle, venue autant pour les producteurs que pour les tables d’hôtes.</p>
  <span class="mk-btn ar-btn">Lire la suite</span>
</div>`);

const CODE_CSS = `
.cd { display: flex; flex-direction: column; gap: 6px; padding: 12px; background: #f6f8fa; font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; font-size: 12px; line-height: 1.5; color: #1d2230; }
.cd-b { white-space: pre-wrap; overflow-wrap: anywhere; padding: 6px 8px; border-radius: 6px; background: #fff; border: 1px solid #e3e6ec; }
.cd-c { color: #5a6172; }
`;

/** One code block (a hotspot), with an optional comment line giving context. */
const block = (id: string, lines: string[], comment?: string) =>
  `<div class="cd-b" data-hotspot="${id}">${comment ? `<span class="cd-c">${esc(comment)}</span>\n` : ''}${lines.map(esc).join('\n')}</div>`;

const DASH_CSS = `
.db { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
.db-kpis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.db-k { padding: 10px; border-radius: 10px; border: 1px solid #e1e4ea; display: flex; flex-direction: column; gap: 6px; }
.db-chart { height: 110px; border-radius: 10px; border: 1px solid #e1e4ea; padding: 10px; display: flex; align-items: flex-end; gap: 8px; }
.db-chart span { flex: 1; border-radius: 4px 4px 0 0; background: #e9ecf1; }
.db-wait { height: 178px; display: grid; place-items: center; align-content: center; gap: 10px; color: #5a6172; }
.db-spin { width: 40px; height: 40px; border-radius: 50%; border: 4px solid #d5dbe5; border-top-color: #1f4fd8; }
`;

const LIKE_CSS = `
.lk { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
.lk-img { aspect-ratio: 16 / 9; border-radius: 10px; background: linear-gradient(160deg, #c8d3e4 0%, #dfe6f0 55%, #eef2f7 100%); }
.lk-bar { display: flex; align-items: center; gap: 18px; color: #5a6172; }
.lk-act { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-weight: 600; }
.lk-on { color: #c42b2b; }
.lk-on svg { fill: currentColor; }
.lk-wait { color: #8b92a1; }
.lk-spin { width: 18px; height: 18px; border-radius: 50%; border: 2.5px solid #d5dbe5; border-top-color: #5a6172; }
`;

const performanceModule: ModuleContent = {
  id: 'performance',
  title: 'Performance perçue',
  category: 'corriger',
  summary:
    'Rendre une interface rapide pour de vrai, mesurée par les Core Web Vitals, et rapide à l’œil : squelettes, progression honnête, UI optimiste, polices et images bien chargées. Toujours en mesurant d’abord sur des appareils réalistes.',
  minutes: 11,
  commands: ['optimize', 'harden'],
  sources: ['imp:optimize', 'imp:harden', 'web.dev:cwv', 'lawsofux', NNG_RESPONSE, NNG_SKELETON, WEBDEV_INP_CWV, WEBDEV_FONTS],
  sections: [
    {
      id: 'mesurer',
      title: 'Mesurer avant d’optimiser',
      body: `La performance est une fonctionnalité. Avant de toucher au code, trouve **le vrai goulot d’étranglement de cette interface** : optimiser ce qui n’est pas lent coûte du temps et n’apporte rien.

1. **Mesure l’état actuel** : Core Web Vitals (LCP, INP, CLS), temps de chargement, poids du JavaScript, du CSS et des images, fluidité à l’exécution, nombre et poids des requêtes.
2. **Identifie la cause** : qu’est-ce qui est lent (chargement, interactions, animations), pourquoi (images trop lourdes, JavaScript coûteux, recalculs de mise en page), à quel point, et pour qui (tout le monde, le mobile, les connexions lentes).
3. **Corrige le plus gros problème d’abord**, puis **mesure à nouveau** pour comparer avant et après.

Mesure sur de **vrais appareils** et de **vrais réseaux** : Chrome sur un ordinateur rapide en fibre n’est pas représentatif. Un Android d’entrée de gamme et une connexion bridée montrent ce que vivent beaucoup de visiteurs. Les mesures de labo (Lighthouse, panneau Performance) aident à diagnostiquer ; les **données de terrain** (rapport Chrome UX, mesure chez tes vrais utilisateurs) disent ce qu’ils vivent.

N’échange jamais l’accessibilité ou une fonctionnalité contre quelques millisecondes.`,
    },
    {
      id: 'cwv',
      title: 'Les trois Core Web Vitals',
      body: `Google résume l’expérience d’une page en trois **Core Web Vitals** : le chargement (LCP), la réactivité (INP) et la stabilité visuelle (CLS). Leurs seuils « bons » se mesurent au **75e centile** des visites, séparément sur mobile et sur ordinateur :

- **LCP** (*Largest Contentful Paint*) **≤ 2,5 s** : le temps d’affichage du plus grand élément visible (image d’en-tête, bloc de titre). On l’améliore en optimisant et en préchargeant l’image principale, en mettant le CSS critique en ligne, avec un CDN (réseau de serveurs proches des visiteurs) ou un rendu côté serveur. Et **jamais de chargement différé au-dessus de la ligne de flottaison** : \`loading="lazy"\` sur l’image d’en-tête retarde le LCP.
- **INP** (*Interaction to Next Paint*) **≤ 200 ms** : le délai entre une interaction (clic, toucher, frappe) et l’affichage qui suit. Il observe toute la visite et retient l’**interaction la plus lente** (en écartant une valeur extrême toutes les 50 interactions). Il a **remplacé en mars 2024 le FID** (*First Input Delay*), qui ne mesurait que le délai avant le traitement de la première interaction. On l’améliore en **découpant les tâches longues** (plus de 50 ms sur le fil principal, celui qui traite aussi les interactions et le rendu), en différant le JavaScript non critique et en déplaçant les calculs lourds dans un *web worker* (un script exécuté en arrière-plan, hors du fil principal).
- **CLS** (*Cumulative Layout Shift*) **≤ 0,1** : la stabilité visuelle, c’est-à-dire les déplacements inattendus du contenu. On l’améliore en **donnant des dimensions** aux images et vidéos (\`width\` et \`height\`, ou \`aspect-ratio\`), en réservant la place des publicités et intégrations, et en n’insérant jamais de contenu au-dessus de ce qui est déjà affiché.`,
      examples: [
        {
          title: 'Réserver la place d’une image',
          bad: {
            alt: 'Deux instants du chargement d’un article. À 0,5 s, le titre, le texte et le bouton s’affichent sans image ; à 1,4 s, l’image arrive et repousse le texte et le bouton vers le bas.',
            html: fr(`<div class="fs">
  ${frame('À 0,5 s', `<p class="fs-t">Halles rénovées</p>${LINES}<div class="fs-btn">Lire la suite</div>`)}
  ${frame('À 1,4 s', `<p class="fs-t">Halles rénovées</p><div class="fs-img"></div>${LINES}<div class="fs-btn">Lire la suite</div>`)}
</div>`),
            css: FRAMES_CSS,
          },
          badNote: 'Sans dimensions, l’image prend sa place en arrivant : tout ce qui suit saute.',
          good: {
            alt: 'Les deux mêmes instants : à 0,5 s, un emplacement gris de la taille de l’image est déjà réservé ; à 1,4 s, l’image le remplit et rien ne bouge.',
            html: fr(`<div class="fs">
  ${frame('À 0,5 s', `<p class="fs-t">Halles rénovées</p><div class="fs-slot"></div>${LINES}<div class="fs-btn">Lire la suite</div>`)}
  ${frame('À 1,4 s', `<p class="fs-t">Halles rénovées</p><div class="fs-img"></div>${LINES}<div class="fs-btn">Lire la suite</div>`)}
</div>`),
            css: FRAMES_CSS,
          },
          goodNote: '`width` et `height` (ou `aspect-ratio`) réservent la place : CLS nul.',
        },
      ],
    },
    {
      id: 'percu',
      title: 'Le temps perçu',
      body: `Les gens ne chronomètrent pas : ils **ressentent** l’attente. Trois repères de Jakob Nielsen, toujours valables :

- **0,1 s** : la réponse paraît instantanée ;
- **1 s** : le délai se remarque, mais la personne garde le fil de sa pensée ;
- **10 s** : la limite de l’attention ; au-delà, la personne décroche et fait autre chose.

Le **seuil de Doherty** va dans le même sens : sous **400 ms** de réponse, l’échange reste fluide et la productivité grimpe.

Ce qu’on montre pendant l’attente change sa perception :

- **Un retour immédiat** à chaque action (bouton enfoncé, état « Envoi… »), même si le travail continue.
- Sous une seconde environ, **pas d’indicateur** : il clignoterait sans qu’on ait le temps de le lire, et distrairait plus qu’il n’informe.
- Pour le **chargement d’une page**, un **squelette** qui reprend la mise en page plutôt qu’un *spinner* (indicateur qui tourne en boucle) au milieu du contenu : la structure apparaît, l’attente semble plus courte.
- Pour une attente courte et locale (de 2 à 10 s, dans un seul module), un **spinner** suffit.
- Au-delà d’une dizaine de secondes, une **progression déterminée** (pourcentage, temps restant) quand on connaît l’avancement. Jamais de progression inventée.`,
      examples: [
        {
          title: 'Un squelette plutôt qu’un spinner',
          bad: {
            alt: 'Tableau de bord en cours de chargement : sous le titre, toute la zone de contenu est vide avec un grand indicateur rotatif et le mot « Chargement… ».',
            frame: 'browser',
            html: fr(`<div class="db"><p class="mk-h2">Ventes</p><div class="db-wait"><span class="db-spin"></span><span>Chargement…</span></div></div>`),
            css: DASH_CSS,
          },
          badNote: 'Rien ne dit ce qui arrive : on fixe un spinner.',
          good: {
            alt: 'Même tableau de bord : trois cartes d’indicateurs et un graphique apparaissent déjà sous forme de blocs gris à leur emplacement définitif.',
            frame: 'browser',
            html: fr(`<div class="db"><p class="mk-h2">Ventes</p>
  <div class="db-kpis"><div class="db-k"><div class="mk-line mk-line--m"></div><div class="mk-line" style="height:14px"></div></div><div class="db-k"><div class="mk-line mk-line--m"></div><div class="mk-line" style="height:14px"></div></div><div class="db-k"><div class="mk-line mk-line--m"></div><div class="mk-line" style="height:14px"></div></div></div>
  <div class="db-chart"><span style="height:40%"></span><span style="height:65%"></span><span style="height:50%"></span><span style="height:80%"></span><span style="height:60%"></span><span style="height:90%"></span></div>
</div>`),
            css: DASH_CSS,
          },
          goodNote: 'La structure est là, les données la remplissent.',
        },
      ],
    },
    {
      id: 'optimiste',
      title: 'UI optimiste et connexions lentes',
      body: `**L’UI optimiste** affiche le résultat d’une action **tout de suite**, avant la confirmation du serveur : le cœur se remplit, le message apparaît dans la conversation, la tâche se coche. La synchronisation se fait en arrière-plan.

- Elle convient aux actions **fréquentes, qui réussissent presque toujours et dont l’échec se rattrape sans dommage** : aimer, ajouter à une liste, renommer, envoyer un message.
- Elle exige un **retour arrière** honnête : si le serveur refuse, l’interface revient à l’état précédent et le dit clairement (« Message non envoyé · Réessayer »).
- Elle ne convient pas aux actions **coûteuses ou irréversibles** (paiement, virement, suppression définitive) : là, on attend la confirmation réelle.

Pour les **connexions lentes** : chargement progressif des images, squelettes, mise en cache et fonctionnement hors ligne grâce à un *service worker* (un script qui intercepte les requêtes de la page et peut répondre avec une copie en cache), et protection contre la **double soumission** (bouton désactivé pendant l’envoi). Teste avec une connexion bridée, hors ligne, et en appuyant dix fois de suite sur « Envoyer ».`,
      examples: [
        {
          title: 'Répondre tout de suite à un « J’aime »',
          bad: {
            alt: 'Publication avec une photo ; à la place du cœur, un petit indicateur rotatif grisé et le compteur toujours à 128 en attendant le serveur.',
            html: fr(`<div class="lk"><div class="mk-row" style="--gap:10px"><span class="mk-avatar" style="background:#cfe3d4"></span><div><p class="mk-strong">Atelier Morel</p><p class="mk-small mk-muted">Il y a 2 h</p></div></div>
  <div class="lk-img"></div>
  <div class="lk-bar"><span class="lk-act lk-wait"><span class="lk-spin"></span>128</span><span class="lk-act"><i data-icon="message-circle"></i>14</span><span class="lk-act"><i data-icon="share-2"></i></span></div>
</div>`),
            css: LIKE_CSS,
          },
          badNote: 'On attend le serveur pour un geste qui réussit presque toujours.',
          good: {
            alt: 'Même publication : le cœur est déjà rempli en rouge et le compteur est passé à 129.',
            html: fr(`<div class="lk"><div class="mk-row" style="--gap:10px"><span class="mk-avatar" style="background:#cfe3d4"></span><div><p class="mk-strong">Atelier Morel</p><p class="mk-small mk-muted">Il y a 2 h</p></div></div>
  <div class="lk-img"></div>
  <div class="lk-bar"><span class="lk-act lk-on"><i data-icon="heart"></i>129</span><span class="lk-act"><i data-icon="message-circle"></i>14</span><span class="lk-act"><i data-icon="share-2"></i></span></div>
</div>`),
            css: LIKE_CSS,
          },
          goodNote: 'Le résultat s’affiche aussitôt ; en cas d’échec, le cœur se vide et un message l’explique.',
        },
      ],
    },
    {
      id: 'ressources',
      title: 'Images, polices et JavaScript',
      body: `- **Images** : formats modernes (WebP, AVIF), à la bonne taille (pas une image de 3000 px pour un affichage de 300 px), images adaptatives (\`srcset\`), compression (une qualité de 80 à 85 % passe en général inaperçue), et chargement différé **seulement sous la ligne de flottaison**.
- **Polices** : \`font-display: swap\` (le texte s’affiche tout de suite dans la police de repli, puis la police web la remplace) ou \`optional\` (la police web n’est utilisée que si elle arrive presque aussitôt) ; sous-ensembles limités aux caractères utiles ; préchargement de la police critique ; seulement les graisses utilisées. Une **police de repli aux métriques proches** (descripteurs \`size-adjust\`, \`ascent-override\`) limite le saut au moment de l’échange. Quand l’identité le permet, une **pile de polices système** règle tout d’un coup : rien à télécharger, donc ni texte invisible ni saut à l’échange.
- **JavaScript** : découpage par route et par composant, suppression du code et des dépendances inutiles, chargement différé de ce qui n’est pas critique (\`import()\` dynamique), ménage dans les scripts tiers.
- **Chargement** : ressources critiques d’abord, \`defer\` ou \`async\` sur les scripts non critiques, préchargement (\`preload\`) de ce dont la page a besoin tout de suite, prélecture (\`prefetch\`) de la page suivante la plus probable, cache HTTP et compression.`,
    },
    {
      id: 'rendu',
      title: 'Un rendu fluide',
      body: `Pour tenir **60 images par seconde**, chaque image dispose d’environ **16 ms** (1000 ÷ 60 ≈ 16,7 ms) pour tout le travail du navigateur.

- **Anime \`transform\` et \`opacity\`** pour le mouvement : le navigateur les traite sans recalculer la mise en page. Flou, masques et ombres restent permis quand ils apportent quelque chose et restent fluides, sur une zone limitée.
- **Évite d’animer les propriétés de mise en page** (\`width\`, \`height\`, \`top\`, \`left\`, marges) : chaque image recalcule la page.
- **\`will-change\` avec parcimonie**, pour une opération coûteuse connue : chaque déclaration crée une couche et consomme de la mémoire ; posée partout, elle ralentit.
- **Évite les lectures et écritures alternées** du DOM (*layout thrashing*) : regroupe les lectures de dimensions, puis les écritures.
- **Listes longues** : \`content-visibility: auto\`, ou virtualisation (n’afficher que les lignes visibles). Limite la taille et la profondeur du DOM.
- **Défilement** : limite la fréquence des gestionnaires (*throttle*, *debounce*), utilise \`requestAnimationFrame\` pour les animations en JavaScript et \`IntersectionObserver\` pour réagir à l’apparition d’un élément.`,
    },
  ],
  rules: [
    { id: 'cwv', front: 'Quels sont les seuils « bons » des Core Web Vitals ?', back: 'LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, au 75e centile des visites, sur mobile comme sur ordinateur.' },
    { id: 'inp', front: 'Qu’a remplacé l’INP, et quand ?', back: 'Le FID, en mars 2024. L’INP observe toutes les interactions de la visite et retient la plus lente ; le FID ne mesurait que le délai de la première.' },
    { id: 'cls-img', front: 'Comment éviter le décalage d’une image qui se charge ?', back: 'Lui donner ses dimensions (`width` et `height`) ou un `aspect-ratio` : la place est réservée.' },
    { id: 'lazy-hero', front: 'Faut-il charger en différé l’image d’en-tête ?', back: 'Non : jamais de `loading="lazy"` au-dessus de la ligne de flottaison. L’image principale doit partir au plus tôt.' },
    { id: 'long-task', front: 'Qu’est-ce qu’une tâche longue, et que faire ?', back: 'Une tâche de plus de 50 ms sur le fil principal. La découper, différer le JavaScript non critique, déplacer le calcul dans un web worker.' },
    { id: 'nielsen', front: 'Quelles sont les trois limites de temps de réponse de Nielsen ?', back: '0,1 s : instantané ; 1 s : le fil de la pensée tient ; 10 s : limite de l’attention.' },
    { id: 'doherty', front: 'Que dit le seuil de Doherty ?', back: 'Sous 400 ms de réponse, l’échange reste fluide et la productivité grimpe ; au-delà, l’attention se disperse.' },
    { id: 'indicators', front: 'Squelette, spinner ou barre de progression ?', back: 'Rien sous 1 s ; squelette pour charger une page ; spinner pour une attente courte et locale (2 à 10 s) ; barre déterminée au-delà de 10 s.' },
    { id: 'optimistic', front: 'Qu’est-ce qu’une UI optimiste ?', back: 'Montrer le résultat tout de suite, synchroniser en arrière-plan, revenir en arrière avec un message clair en cas d’échec. Jamais pour un paiement.' },
    { id: 'will-change', front: 'Peut-on poser `will-change` partout ?', back: 'Non : chaque déclaration crée une couche et consomme de la mémoire. À réserver à une opération coûteuse connue.' },
    { id: 'animate', front: 'Quelles propriétés animer pour un mouvement fluide ?', back: '`transform` et `opacity`. Pas `width`, `height`, `top` ou `left`, qui recalculent la mise en page à chaque image.' },
    { id: 'fonts', front: 'Comment charger une police web sans texte invisible ?', back: '`font-display: swap` (ou `optional`), sous-ensemble, préchargement, et une police de repli aux métriques proches.' },
    { id: 'devices', front: 'Sur quoi mesurer la performance ?', back: 'Sur un vrai téléphone d’entrée de gamme et un réseau bridé, avec des données de terrain ; pas sur un ordinateur rapide en fibre.' },
    { id: 'frame', front: 'Combien de temps dure une image à 60 images par seconde ?', back: 'Environ 16 ms (1000 ÷ 60), pour tout le travail du navigateur : script, style, mise en page, peinture.' },
  ],
  exercises: [
    {
      id: 'performance-skeleton-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Pendant les deux secondes de chargement de ce fil d’actualité, que montrer ?',
      options: [
        {
          id: 'blank',
          visual: {
            alt: 'Téléphone : l’en-tête « Fil » est affiché, la zone de contenu est entièrement blanche.',
            frame: 'phone',
            html: `${feedHead}<div class="sk-area"></div>`,
            css: SKELETON_CSS,
          },
          why: 'Un écran blanc ne dit même pas que quelque chose se charge : on se demande si l’appli fonctionne.',
        },
        {
          id: 'spinner',
          visual: {
            alt: 'Téléphone : sous l’en-tête « Fil », un indicateur rotatif au milieu de la zone de contenu vide.',
            frame: 'phone',
            html: `${feedHead}<div class="sk-area"><span class="sk-spin"></span></div>`,
            css: SKELETON_CSS,
          },
          why: 'Le spinner dit qu’on attend, sans montrer ce qui arrive : l’attention se fixe sur l’attente elle-même.',
        },
        {
          id: 'skeleton',
          visual: {
            alt: 'Téléphone : sous l’en-tête « Fil », deux publications apparaissent sous forme de blocs gris (avatar, lignes de texte, image) à leur emplacement définitif.',
            frame: 'phone',
            html: `${feedHead}<div class="sk-area">${skPost}${skPost}</div>`,
            css: SKELETON_CSS,
          },
          why: 'La structure de la page apparaît d’emblée : on sait ce qui arrive et où, et l’attente paraît plus courte.',
        },
      ],
      answer: 'skeleton',
      explanation: `Pour le **chargement d’une page**, le squelette affiche la mise en page à venir : blocs de texte, avatars, images, à leur place définitive. La personne comprend ce qui arrive, l’attente paraît plus courte, et le contenu remplit ensuite les blocs sans tout réorganiser.

Le Nielsen Norman Group conseille plutôt le spinner pour **un seul module** (une vidéo, une carte), et le squelette quand **tout l’écran** se charge, pour une attente de moins de 10 s. Impeccable le dit pour les interfaces produit : des squelettes, pas des spinners au milieu du contenu.`,
      takeaway: 'Pour charger une page, montre un squelette de la mise en page plutôt qu’un spinner au milieu du contenu.',
      sources: ['imp:operate', 'imp:harden', NNG_SKELETON],
    },
    {
      id: 'performance-cls-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Pendant le chargement, quelle page reste stable sous le doigt ?',
      context: 'Chaque maquette montre deux instants du chargement. Le disque en pointillés marque l’endroit où le doigt s’apprête à toucher le bouton.',
      options: [
        {
          id: 'shift',
          visual: {
            alt: 'Deux instants d’une page de recette : à 0,8 s, le doigt vise le bouton « Enregistrer » ; à 1,6 s, un bandeau promotionnel apparaît en tête, tout descend et le doigt se retrouve sur le texte.',
            html: fr(`<div class="fs">
  ${frame('À 0,8 s', `<p class="fs-t">Tarte aux poireaux</p>${LINES}<div class="fs-btn">Enregistrer</div><span class="fs-finger" style="top:62px"></span>`)}
  ${frame('À 1,6 s', `<div class="fs-ban">Livraison offerte</div><p class="fs-t">Tarte aux poireaux</p>${LINES}<div class="fs-btn">Enregistrer</div><span class="fs-finger" style="top:62px"></span>`)}
</div>`),
            css: FRAMES_CSS,
          },
          why: 'Le bandeau inséré au-dessus du contenu pousse tout vers le bas : le toucher tombe sur le texte au lieu du bouton.',
        },
        {
          id: 'reserved',
          visual: {
            alt: 'Deux instants de la même page : à 0,8 s, un emplacement en pointillés est déjà réservé en tête ; à 1,6 s, le bandeau le remplit et le bouton reste sous le doigt.',
            html: fr(`<div class="fs">
  ${frame('À 0,8 s', `<div class="fs-res"></div><p class="fs-t">Tarte aux poireaux</p>${LINES}<div class="fs-btn">Enregistrer</div><span class="fs-finger" style="top:92px"></span>`)}
  ${frame('À 1,6 s', `<div class="fs-ban">Livraison offerte</div><p class="fs-t">Tarte aux poireaux</p>${LINES}<div class="fs-btn">Enregistrer</div><span class="fs-finger" style="top:92px"></span>`)}
</div>`),
            css: FRAMES_CSS,
          },
          why: 'La place du bandeau est réservée dès le départ : il s’insère sans rien déplacer, le bouton reste sous le doigt.',
        },
      ],
      answer: 'reserved',
      explanation: `Le **CLS** (*Cumulative Layout Shift*) mesure les déplacements inattendus du contenu ; un bon score est **inférieur ou égal à 0,1**. Au-delà du chiffre, l’effet est concret : on vise un bouton, il bouge, et l’on touche autre chose, parfois une publicité ou un achat.

Les causes classiques : du contenu **inséré au-dessus** de ce qui est déjà affiché (bandeaux, publicités, intégrations), des images et vidéos **sans dimensions**, des polices qui changent la taille du texte en arrivant. Le remède : **réserver la place** (\`min-height\`, \`aspect-ratio\`, \`width\` et \`height\`) avant que l’élément arrive.`,
      takeaway: 'Réserve la place de tout ce qui arrive en retard (images, bandeaux, publicités) : rien ne doit bouger sous le doigt.',
      sources: ['imp:optimize', WEBDEV_CLS],
    },
    {
      id: 'performance-progress-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'L’envoi d’une vidéo de 2 Go prend environ trois minutes. Quel retour afficher ?',
      options: [
        {
          id: 'spinner',
          visual: {
            alt: 'Carte d’envoi de la vidéo « Mariage-Clara-et-Hugo.mp4 » avec un indicateur rotatif et le texte « Envoi en cours… ».',
            html: fr(`<div class="vu">${uploadHead}<div class="mk-row" style="--gap:10px"><span class="vu-spin"></span><span>Envoi en cours…</span></div></div>`),
            css: UPLOAD_CSS,
          },
          why: 'Une animation en boucle pendant trois minutes : impossible de savoir si l’envoi avance, ni s’il vaut mieux attendre ou revenir plus tard.',
        },
        {
          id: 'determinate',
          visual: {
            alt: 'Même carte avec une barre de progression à 32 %, le texte « 640 Mo sur 2 Go · environ 2 min restantes » et la mention qu’on peut continuer à naviguer.',
            html: fr(`<div class="vu">${uploadHead}<div class="vu-bar"><span style="width:32%"></span></div><div class="mk-row mk-between"><span>640 Mo sur 2 Go</span><span class="mk-muted">environ 2 min restantes</span></div><p class="mk-small mk-muted">Tu peux continuer à naviguer : l’envoi se poursuit.</p></div>`),
            css: UPLOAD_CSS,
          },
          why: 'L’avancement réel, le temps restant et la liberté de faire autre chose : l’attente devient prévisible.',
        },
      ],
      answer: 'determinate',
      explanation: `Au-delà d’une dizaine de secondes, une animation en boucle ne suffit plus : la personne a besoin de savoir **où en est l’opération** et **combien de temps il reste**. Le Nielsen Norman Group recommande une progression en pourcentage pour les attentes de **10 secondes ou plus**, et réserve les animations en boucle aux attentes de 2 à 10 secondes.

La progression doit refléter l’avancement **réel** (ici, les octets envoyés). Dire qu’on peut continuer à naviguer transforme une attente subie en tâche de fond.`,
      takeaway: 'Au-delà d’environ 10 s, montre une progression réelle (pourcentage, temps restant) et laisse la personne faire autre chose.',
      sources: ['imp:clarify', NNG_PROGRESS],
    },
    {
      id: 'performance-optimistic-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle réaction de la messagerie, juste après l’appui sur « Envoyer », paraît la plus rapide ?',
      options: [
        {
          id: 'blocking',
          visual: {
            alt: 'Téléphone : la conversation est voilée par un panneau « Envoi du message… » avec un indicateur rotatif, et le champ de saisie est grisé.',
            frame: 'phone',
            html: fr(`${chatHead}<div class="ct-msgs">${chatHistory}<div class="ct-veil"><div class="ct-box"><span class="ct-spin"></span><span>Envoi du message…</span></div></div></div>
<div class="ct-in ct-off"><span class="ct-field">Je réserve pour 20 h.</span><span class="ct-send"><i data-icon="send" style="--ico:18px"></i></span></div>`),
            css: CHAT_CSS,
          },
          why: 'Toute la conversation est bloquée le temps d’une requête qui réussit presque toujours : chaque message coûte une attente.',
        },
        {
          id: 'optimistic',
          visual: {
            alt: 'Téléphone : le message « Je réserve pour 20 h. » est déjà affiché dans la conversation avec la mention « Envoi… », et le champ de saisie est vide et utilisable.',
            frame: 'phone',
            html: fr(`${chatHead}<div class="ct-msgs">${chatHistory}<p class="ct-b me">Je réserve pour 20 h.</p><p class="ct-st"><i data-icon="clock" style="--ico:12px"></i>Envoi…</p></div>
<div class="ct-in"><span class="ct-field">Message</span><span class="ct-send"><i data-icon="send" style="--ico:18px"></i></span></div>`),
            css: CHAT_CSS,
          },
          why: 'Le message s’affiche tout de suite, avec un état discret ; la conversation reste utilisable.',
        },
      ],
      answer: 'optimistic',
      explanation: `L’**UI optimiste** montre le résultat d’une action **avant** la réponse du serveur. Pour une action fréquente qui réussit presque toujours, comme envoyer un message, l’interface paraît instantanée : la réponse visuelle arrive sous le seuil de 0,1 s qui donne l’impression d’immédiateté.

Elle reste **honnête** : un état discret (« Envoi… ») signale que la synchronisation est en cours, et en cas d’échec le message le dit (« Non envoyé · Réessayer ») au lieu de disparaître. On ne l’emploie pas pour un paiement ou une suppression définitive.`,
      takeaway: 'Pour une action fréquente qui réussit presque toujours, affiche le résultat tout de suite et prévois un retour arrière clair en cas d’échec.',
      sources: ['imp:harden', 'imp:optimize', NNG_RESPONSE],
    },
    {
      id: 'performance-font-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Le HTML est arrivé, mais pas encore les polices web. Quelle stratégie de chargement donne la meilleure expérience ?',
      options: [
        {
          id: 'foit',
          visual: {
            alt: 'Page d’article à 1,2 s : l’image et la forme du bouton sont là, mais le titre, le paragraphe et le libellé du bouton sont invisibles.',
            frame: 'browser',
            html: article('foit'),
            css: ARTICLE_CSS,
          },
          why: 'Le texte attend la police web : la page paraît vide, alors que tout le contenu est déjà là.',
        },
        {
          id: 'swap',
          visual: {
            alt: 'Même page à 1,2 s : le titre, le paragraphe et le bouton s’affichent dans une police de repli, lisibles tout de suite.',
            frame: 'browser',
            html: article('swap'),
            css: ARTICLE_CSS,
          },
          why: 'Le texte s’affiche aussitôt dans une police de repli ; la police web la remplacera à son arrivée.',
        },
      ],
      answer: 'swap',
      explanation: `Sans réglage, beaucoup de navigateurs **masquent le texte** pendant une période de blocage (jusqu’à 3 s) en attendant la police web : la page semble vide alors que le contenu est arrivé.

Avec \`font-display: swap\`, le texte s’affiche **tout de suite** dans la police de repli, puis la police web la remplace. Pour que l’échange ne fasse pas sauter la mise en page, choisis une **police de repli aux métriques proches** (descripteurs \`size-adjust\`, \`ascent-override\`), précharge la police critique et limite-la aux caractères et graisses utiles. \`font-display: optional\` va plus loin : la police web n’est utilisée que si elle arrive presque aussitôt.`,
      takeaway: 'Polices web : `font-display: swap` (ou `optional`), préchargement, sous-ensemble et repli aux métriques proches.',
      sources: ['imp:optimize', 'imp:typeset', MDN_FONT_DISPLAY, WEBDEV_FONTS],
    },
    {
      id: 'performance-html-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les trois lignes de ce HTML qui dégradent le LCP ou la stabilité de la page.',
      visual: {
        alt: 'Extrait de HTML en six blocs : préchargement d’une police, script de carrousel dans l’en-tête, script de mesure d’audience différé, image d’en-tête en chargement différé, photo de l’auteur sans dimensions, carte en bas de page en chargement différé.',
        html: `<div class="cd">
${block('preload', ['<link rel="preload" href="/fonts/source-sans-3.woff2"', '      as="font" type="font/woff2" crossorigin>'], '<!-- <head> -->')}
${block('sync', ['<script src="/js/carrousel.js"></script>'], '<!-- <head> -->')}
${block('defer', ['<script src="/js/mesure-audience.js" defer></script>'], '<!-- <head> -->')}
${block('hero', ['<img src="/img/vercors-1600.avif" width="1600" height="900"', '     loading="lazy" alt="Le plateau du Vercors à l’aube">'], '<!-- Image d’en-tête, visible dès l’arrivée -->')}
${block('avatar', ['<img src="/img/lina-perrin.jpg" alt="Lina Perrin">'], '<!-- Signature de l’auteur, sous le titre -->')}
${block('map', ['<img src="/img/carte-itineraire.png" width="800" height="450"', '     loading="lazy" alt="Carte de l’itinéraire">'], '<!-- Carte, tout en bas de l’article -->')}
</div>`,
        css: CODE_CSS,
      },
      hotspots: [
        { id: 'sync', label: 'Script de carrousel synchrone', correct: true, why: 'Un script classique dans l’en-tête bloque l’analyse de la page jusqu’à son téléchargement et son exécution : tout l’affichage attend. Ajoute `defer`.' },
        { id: 'hero', label: 'Image d’en-tête en chargement différé', correct: true, why: 'L’image d’en-tête est probablement l’élément LCP : `loading="lazy"` retarde son téléchargement. Retire-le, voire ajoute `fetchpriority="high"`.' },
        { id: 'avatar', label: 'Photo de l’auteur sans dimensions', correct: true, why: 'Sans `width` ni `height`, sa place n’est pas réservée : quand elle arrive, le texte en dessous saute (CLS).' },
        { id: 'preload', label: 'Préchargement de la police', correct: false, why: 'Précharger la police critique est une bonne pratique : le texte s’affiche plus tôt dans la bonne police.' },
        { id: 'defer', label: 'Script de mesure différé', correct: false, why: '`defer` laisse la page s’afficher avant d’exécuter le script : bonne pratique.' },
        { id: 'map', label: 'Carte en chargement différé', correct: false, why: 'Tout en bas de l’article et avec ses dimensions : le chargement différé est justement fait pour elle.' },
      ],
      explanation: `Trois lignes coûtent cher :

- **Un script synchrone dans l’en-tête** bloque l’affichage de toute la page tant qu’il n’est pas téléchargé et exécuté ; \`defer\` (ou \`async\`) le sort du chemin critique.
- **\`loading="lazy"\` sur l’image d’en-tête** retarde l’élément le plus grand de l’écran, donc le **LCP** : jamais de chargement différé au-dessus de la ligne de flottaison.
- **Une image sans dimensions** fait sauter le contenu qui la suit à son arrivée, ce qui dégrade le **CLS**.

Les trois autres lignes sont de bons réflexes : préchargement de la police critique, script non critique différé, chargement différé d’une image placée tout en bas avec ses dimensions.`,
      takeaway: 'Scripts en `defer`, jamais de `loading="lazy"` sur l’image d’en-tête, et des dimensions sur chaque image.',
      sources: ['imp:optimize', WEBDEV_LCP, WEBDEV_LAZY, WEBDEV_CLS],
    },
    {
      id: 'performance-css-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux règles CSS qui risquent de saccader ou d’alourdir le rendu.',
      visual: {
        alt: 'Extrait de CSS en six blocs : élévation d’une carte au survol, panneau qui anime sa largeur et sa position, will-change appliqué à tous les éléments, déclaration de police, liste longue avec content-visibility, notification animée en opacité et transformation.',
        html: `<div class="cd">
${block('hover', ['.carte:hover {', '  transform: translateY(-2px);', '  transition: transform 200ms ease-out;', '}'])}
${block('panel', ['.panneau {', '  transition: width 300ms ease, left 300ms ease;', '}'])}
${block('all', ['* {', '  will-change: transform, opacity;', '}'])}
${block('font', ['@font-face {', '  font-family: "Source Sans 3";', '  src: url("/fonts/source-sans-3.woff2") format("woff2");', '  font-display: swap;', '}'])}
${block('list', ['.fil > li {', '  content-visibility: auto;', '  contain-intrinsic-size: auto 72px;', '}'])}
${block('toast', ['.toast {', '  transition: opacity 200ms ease-out, transform 200ms ease-out;', '}'])}
</div>`,
        css: CODE_CSS,
      },
      hotspots: [
        { id: 'panel', label: 'Panneau qui anime width et left', correct: true, why: '`width` et `left` déclenchent un recalcul de la mise en page à chaque image : l’animation saccade. Anime `transform: translateX()` à la place.' },
        { id: 'all', label: 'will-change sur tous les éléments', correct: true, why: 'Chaque élément devient une couche à part : la mémoire explose et le rendu ralentit. À réserver à l’élément qui va réellement s’animer.' },
        { id: 'hover', label: 'Élévation au survol', correct: false, why: 'Une transformation courte : rien à recalculer, l’animation reste fluide.' },
        { id: 'font', label: 'Déclaration de police', correct: false, why: '`font-display: swap` affiche le texte sans attendre la police : bonne pratique.' },
        { id: 'list', label: 'Liste avec content-visibility', correct: false, why: 'Le navigateur saute le rendu des lignes hors de l’écran : bonne pratique pour une liste longue.' },
        { id: 'toast', label: 'Notification en opacité et transformation', correct: false, why: '`opacity` et `transform` : les deux propriétés les moins coûteuses à animer.' },
      ],
      explanation: `À 60 images par seconde, le navigateur dispose d’environ **16 ms** par image. Deux règles gaspillent ce budget :

- **Animer \`width\` et \`left\`** oblige à recalculer la mise en page, puis à repeindre, à chaque image. \`transform\` et \`opacity\` produisent le même mouvement sans ce recalcul.
- **\`will-change\` partout** transforme chaque élément en couche : la mémoire grimpe et le rendu ralentit, l’inverse de l’effet voulu. On le réserve à une opération coûteuse connue.

Les autres blocs sont de bons réflexes : élévation en \`transform\`, \`font-display: swap\`, \`content-visibility\` pour une liste longue, notification en \`opacity\` et \`transform\`.`,
      takeaway: 'Anime `transform` et `opacity`, pas la mise en page, et réserve `will-change` à l’élément qui en a besoin.',
      sources: ['imp:optimize', MDN_WILL_CHANGE],
    },
    {
      id: 'performance-fid-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Le FID (First Input Delay) est toujours l’indicateur de réactivité des Core Web Vitals.',
      answer: false,
      explanation: `Depuis le **12 mars 2024**, l’**INP** (*Interaction to Next Paint*) a remplacé le FID parmi les Core Web Vitals. Le FID ne mesurait que le délai avant le traitement de la **première** interaction ; l’INP observe **toutes** les interactions de la visite, jusqu’à l’affichage qui suit, et retient la **plus lente** (en écartant une valeur extrême toutes les 50 interactions).

Un bon INP est **inférieur ou égal à 200 ms**, au 75e centile des visites. On l’améliore en découpant les tâches longues, en différant le JavaScript non critique et en déplaçant les calculs lourds hors du fil principal.`,
      takeaway: 'L’INP (≤ 200 ms) a remplacé le FID en mars 2024 : il observe toutes les interactions de la visite et retient la plus lente.',
      sources: ['imp:optimize', WEBDEV_INP_CWV, WEBDEV_INP, WEBDEV_LONG_TASKS],
    },
    {
      id: 'performance-frame-budget-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Pour une animation à 60 images par seconde, le JavaScript de la page dispose à lui seul d’environ 16 ms par image.',
      answer: false,
      explanation: `1000 ms ÷ 60 images ≈ **16,7 ms** par image, mais ce budget couvre **tout** le travail du navigateur : JavaScript, calcul des styles, mise en page, peinture et composition. Le navigateur a besoin d’environ 6 ms pour rendre chaque image : web.dev conseille donc de produire chaque image d’une animation en **10 ms** au plus. Sur un écran à 120 Hz, le budget entier tombe à environ 8 ms.

D’où les règles de rendu : animer \`transform\` et \`opacity\` plutôt que des propriétés de mise en page, éviter les tâches JavaScript longues pendant une animation, et utiliser \`requestAnimationFrame\` pour les animations pilotées en JavaScript.`,
      takeaway: 'À 60 images par seconde, les 16 ms de chaque image servent à tout le rendu, pas qu’au script : garde le JavaScript court et anime ce qui ne recalcule pas la mise en page.',
      sources: ['imp:optimize', WEBDEV_RAIL],
    },
    {
      id: 'performance-thresholds-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque seuil à ce qu’il garantit.',
      leftTitle: 'Seuil',
      rightTitle: 'Ce qu’il garantit',
      pairs: [
        { id: 'lcp', left: 'LCP ≤ 2,5 s', right: 'Le plus grand élément visible est vite affiché' },
        { id: 'inp', left: 'INP ≤ 200 ms', right: 'L’écran réagit vite à chaque interaction de la visite' },
        { id: 'cls', left: 'CLS ≤ 0,1', right: 'Le contenu ne bouge pas de façon inattendue' },
        { id: 'nielsen', left: '0,1 s (Nielsen)', right: 'La réponse paraît instantanée' },
        { id: 'doherty', left: '400 ms (seuil de Doherty)', right: 'L’échange reste fluide, sans que l’attention décroche' },
      ],
      explanation: `Les trois **Core Web Vitals** mesurent le chargement (LCP), la réactivité (INP) et la stabilité visuelle (CLS), avec des seuils évalués au 75e centile des visites.

Les deux autres repères viennent de la psychologie de l’attente : sous **0,1 s**, une réponse paraît instantanée (Nielsen) ; sous **400 ms**, l’échange garde son rythme (seuil de Doherty). Au-delà d’**1 s**, le fil de la pensée se rompt ; au-delà de **10 s**, l’attention décroche.`,
      takeaway: 'LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 ; et côté perception : 0,1 s pour l’instantané, 400 ms pour la fluidité.',
      sources: ['web.dev:cwv', NNG_RESPONSE, DOHERTY],
    },
    {
      id: 'performance-method-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Range les étapes d’une démarche d’optimisation dans l’ordre.',
      items: [
        { id: 'measure', label: 'Mesurer l’état actuel : données de terrain, puis test sur un appareil et un réseau réalistes' },
        { id: 'find', label: 'Identifier le goulot d’étranglement le plus coûteux' },
        { id: 'fix', label: 'Corriger ce problème-là en priorité' },
        { id: 'compare', label: 'Mesurer à nouveau et comparer avant et après' },
        { id: 'monitor', label: 'Après la mise en ligne, surveiller les données de terrain pour confirmer que le gain tient dans la durée' },
      ],
      explanation: `Impeccable résume la démarche : **mesurer, trouver la vraie cause, corriger, mesurer encore**. Optimiser sans mesure dépense de l’effort sur ce qui ne compte pas ; corriger les détails en ignorant le gros problème ne change rien pour les utilisateurs.

Les **données de terrain** servent deux fois : pour repérer le problème, puis pour confirmer le gain **chez les vrais utilisateurs**, car un test de labo, même sur un appareil modeste, ne couvre pas toute la variété des appareils et des réseaux.`,
      takeaway: 'Mesure (terrain et labo), trouve le plus gros goulot, corrige-le, mesure encore, puis confirme le gain dans les données de terrain.',
      sources: ['imp:optimize'],
    },
    {
      id: 'performance-feedback-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel retour visuel prévoir pendant l’enregistrement ?',
      context: 'L’enregistrement d’un formulaire de profil prend en général entre 300 et 600 ms.',
      options: [
        {
          id: 'instant',
          label: 'Un retour immédiat sur le bouton (« Enregistrement… », bouton désactivé), puis une confirmation discrète',
          why: 'La réponse arrive en moins de 0,1 s, le bouton ne peut pas être actionné deux fois, et aucun indicateur ne clignote.',
        },
        { id: 'modal', label: 'Une fenêtre modale avec un spinner pendant l’enregistrement', why: 'Pour une attente de moins d’une seconde, la modale apparaît et disparaît en un éclair : un flash qui interrompt pour rien.' },
        { id: 'progress', label: 'Une barre de progression de 0 à 100 %', why: 'La progression déterminée sert aux attentes de plus de 10 s ; ici, elle passerait de 0 à 100 % sans être lue.' },
        { id: 'nothing', label: 'Rien : c’est trop court pour être perçu', why: 'Sans retour au clic, on doute que l’action ait été prise en compte, et l’on clique une seconde fois.' },
      ],
      answer: 'instant',
      explanation: `Une action doit répondre **en moins de 0,1 s** pour paraître instantanée, même si le travail continue derrière. Pour une attente de moins d’une seconde, un **indicateur de chargement** n’apporte rien : il apparaîtrait et disparaîtrait aussitôt, sans qu’on ait le temps de le lire, comme un flash qui distrait.

Le bon retour est **local et immédiat** : le bouton change d’état (« Enregistrement… ») et se désactive, ce qui évite aussi la **double soumission**. Une confirmation brève clôt l’action.`,
      takeaway: 'Attente de moins d’une seconde : un retour immédiat sur le bouton, désactivé pendant l’envoi, sans indicateur qui clignote.',
      sources: ['imp:harden', NNG_RESPONSE, NNG_PROGRESS],
    },
    {
      id: 'performance-optimistic-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Pour quelles actions une UI optimiste est-elle adaptée ?',
      options: [
        { id: 'like', label: 'Aimer une publication', why: 'Fréquente, réversible, réussit presque toujours : le cas d’école.' },
        { id: 'wishlist', label: 'Ajouter un article à une liste de souhaits', why: 'Réversible et sans conséquence : afficher le résultat tout de suite est sans risque.' },
        { id: 'task', label: 'Cocher une tâche comme terminée', why: 'Réversible d’un geste ; en cas d’échec, la case se décoche avec un message.' },
        { id: 'transfer', label: 'Valider un virement de 1 200 €', why: 'Coûteux et difficile à annuler : on attend la confirmation réelle de la banque avant d’annoncer le succès.' },
        { id: 'delete', label: 'Supprimer définitivement son compte', why: 'Irréversible : afficher « Compte supprimé » avant la confirmation serait un mensonge si l’opération échoue.' },
      ],
      answers: ['like', 'wishlist', 'task'],
      explanation: `L’UI optimiste parie que l’action va réussir et affiche le résultat **avant** la réponse du serveur. Ce pari est raisonnable pour les actions **fréquentes, réversibles et presque toujours réussies** : en cas d’échec, l’interface revient en arrière et le dit.

Il ne l’est pas pour les actions **coûteuses ou irréversibles** (paiement, virement, suppression définitive) : un faux succès y aurait des conséquences réelles. Là, on montre un état d’attente honnête et l’on annonce le résultat une fois confirmé.`,
      takeaway: 'UI optimiste pour les actions fréquentes et réversibles ; attente honnête pour l’argent et l’irréversible.',
      sources: ['imp:harden', 'imp:optimize'],
    },
    {
      id: 'performance-measure-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Que faire en premier ?',
      context: 'L’équipe trouve l’application rapide sur ses ordinateurs portables récents, en fibre. Les clients, eux, se plaignent de lenteurs.',
      options: [
        {
          id: 'measure',
          label: 'Mesurer sur un Android d’entrée de gamme avec un réseau bridé, et consulter les données de terrain',
          why: 'On reproduit ce que vivent les clients avant de décider quoi corriger.',
        },
        { id: 'will-change', label: 'Ajouter `will-change` sur tous les éléments animés', why: 'Une optimisation à l’aveugle, qui peut même aggraver le rendu en multipliant les couches.' },
        { id: 'images', label: 'Compresser toutes les images au maximum', why: 'Peut-être utile, peut-être pas : sans mesure, on ne sait pas si les images sont le problème, et l’on dégrade leur qualité.' },
        { id: 'rewrite', label: 'Réécrire l’application avec un framework plus récent', why: 'Des mois de travail sans savoir ce qui ralentit : le même goulot peut survivre à la réécriture.' },
      ],
      answer: 'measure',
      explanation: `L’écart entre l’équipe et les clients vient presque toujours du **contexte de mesure** : un ordinateur récent en fibre cache ce qu’un téléphone modeste sur un réseau mobile subit. Impeccable insiste : mesure sur de **vrais appareils**, avec de **vrais réseaux**, et teste sur un Android d’entrée de gamme, pas seulement sur un iPhone haut de gamme.

Les **données de terrain** (rapport Chrome UX, mesure chez les vrais utilisateurs) montrent où se situent réellement le LCP, l’INP et le CLS. Ensuite seulement, on corrige le plus gros goulot.`,
      takeaway: 'Avant d’optimiser, mesure là où vivent tes utilisateurs : appareil modeste, réseau bridé, données de terrain.',
      sources: ['imp:optimize', 'web.dev:cwv'],
    },
  ],
};

export default performanceModule;
