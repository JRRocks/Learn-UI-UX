import type { ModuleContent, SourceRef } from '../../engine/types';

const MDN_RM: SourceRef = { label: 'MDN — prefers-reduced-motion', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion' };
const WCAG_222: SourceRef = {
  label: 'W3C — Comprendre le critère 2.2.2 (mettre en pause, arrêter, masquer)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
};
const WCAG_233: SourceRef = {
  label: 'W3C — Comprendre le critère 2.3.3 (animation résultant d’interactions)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
};
const MATERIAL_SPEED: SourceRef = { label: 'Material Design — Speed (durées et courbes)', url: 'https://m2.material.io/design/motion/speed.html' };

/* ---------- Easing diagrams ----------
 * Plot area: time on x (10 → 150), progress on y (100 = départ, 34 = arrivée).
 * A CSS cubic-bezier(x1, y1, x2, y2) maps exactly to the SVG path
 * M10 100 C(10 + 140·x1) (100 − 66·y1) (10 + 140·x2) (100 − 66·y2) 150 34.
 */
const curve = (x1: number, y1: number, x2: number, y2: number) =>
  `M10 100 C${+(10 + 140 * x1).toFixed(1)} ${+(100 - 66 * y1).toFixed(1)} ${+(10 + 140 * x2).toFixed(1)} ${+(100 - 66 * y2).toFixed(1)} 150 34`;

const diagram = (path: string, color: string) => `<svg viewBox="0 0 160 116" class="cv" aria-hidden="true">
  <line x1="10" y1="100" x2="152" y2="100" stroke="#c3c8d3"/><line x1="10" y1="100" x2="10" y2="8" stroke="#c3c8d3"/>
  <line x1="10" y1="34" x2="152" y2="34" stroke="#c3c8d3" stroke-dasharray="3 3"/>
  <text x="152" y="112" text-anchor="end" font-size="9" fill="#5a6172">temps</text><text x="14" y="30" font-size="9" fill="#5a6172">arrivée</text>
  <path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
</svg>`;

/** A knob that travels its track with the given easing (3 runs, then rests on the end mark, leaving room for an overshoot). */
const track = (easing: string, name: string) => ({
  html: `<div class="tr"><span class="tr-knob"></span></div>`,
  css: `.cv { width: 100%; max-width: 230px; }
.tr { position: relative; height: 32px; border-radius: 8px; background: #f4f6f9; container-type: inline-size; }
.tr::after { content: ""; position: absolute; top: 3px; bottom: 3px; left: 86cqw; width: 2px; border-radius: 1px; background: #a9b0bd; }
.tr-knob { position: absolute; top: 4px; left: 4px; width: 24px; height: 24px; border-radius: 6px; background: #1f4fd8; animation: ${name} 2s 0.4s 3 both; }
@keyframes ${name} { 0% { transform: translateX(0); animation-timing-function: ${easing}; } 45%, 100% { transform: translateX(calc(86cqw - 28px)); } }`,
});

const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

const easingVisual = (title: string, x1: number, y1: number, x2: number, y2: number, name: string, color = '#1f4fd8') => {
  const t = track(`cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`, name);
  return {
    html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-small mk-muted">${title}</p>${diagram(curve(x1, y1, x2, y2), color)}${t.html}</div>`,
    css: t.css,
  };
};

/* ---------- Other shared mocks ---------- */

const PREFS = `<p class="mk-h3">Préférences</p>
  <div class="mk-row mk-between"><span>Résumé quotidien par e-mail</span><span class="mk-toggle mk-toggle--on"></span></div>
  <div class="mk-row mk-between"><span>Rappels de paiement</span><span class="mk-toggle"></span></div>`;

const timeline = (open: number, close: number) => `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h3">Panneau de filtres</p>
  <div class="tl-row"><span class="tl-l">Ouverture</span><div class="tl-track"><span class="tl-bar" style="width:${open / 5}%"></span></div><span class="tl-v">${open} ms</span></div>
  <div class="tl-row"><span class="tl-l">Fermeture</span><div class="tl-track"><span class="tl-bar tl-bar--out" style="width:${close / 5}%"></span></div><span class="tl-v">${close} ms</span></div>
  <div class="tl-row mk-small mk-muted"><span class="tl-l"></span><div class="tl-scale"><span>0</span><span>250</span><span>500 ms</span></div><span class="tl-v"></span></div>
</div>`;

const TIMELINE_CSS = `.tl-row { display: grid; grid-template-columns: 76px 1fr 56px; align-items: center; gap: 10px; }
.tl-l { font-size: 13px; font-weight: 600; }
.tl-track { height: 14px; border-radius: 4px; background: #f4f6f9; }
.tl-bar { display: block; height: 100%; border-radius: 4px; background: #1f4fd8; }
.tl-bar--out { background: #5a6172; }
.tl-v { font-size: 13px; font-variant-numeric: tabular-nums; text-align: end; }
.tl-scale { display: flex; justify-content: space-between; }`;

const LANDING = (hidden: boolean) => `<div class="mk-row mk-between hp-nav"><b>Terre &amp; Feu</b><span class="mk-small mk-muted">Cours · Atelier · Contact</span></div>
<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h1">Cours de tournage à Bordeaux</p>
  <div class="mk-stack${hidden ? ' hp-hidden' : ''}" style="--gap:10px">
    <p class="mk-muted">Initiation le samedi matin, ateliers du soir en semaine, groupes de six personnes au plus.</p>
    <span class="mk-btn" style="align-self:flex-start">Voir les cours</span>
    <div class="mk-grid" style="--cols:3;--gap:8px"><div class="mk-img"></div><div class="mk-img"></div><div class="mk-img"></div></div>
    <p class="mk-small mk-muted">Atelier ouvert du mardi au samedi, 14 rue des Potiers.</p>
  </div>
</div>`;

const LANDING_CSS = `.hp-nav { padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.hp-hidden { opacity: 0; transform: translateY(24px); }`;

const LOGOS = ['Boulangerie Masson', 'Studio Lumen', 'Garage Ferrand', 'Atelier Brunet', 'Café des Arts', 'Cabinet Roux'];

const motion: ModuleContent = {
  id: 'motion',
  title: 'Mouvement',
  category: 'enrichir',
  summary:
    'Donner un rôle à chaque animation, choisir des durées et des courbes justes, animer les bonnes propriétés et prévoir un mode réduit qui garde le sens.',
  minutes: 10,
  commands: ['animate'],
  sources: ['imp:animate', 'imp:operate', 'imp:craft-floor', 'imp:detector', 'imp:audit', MDN_RM, WCAG_222],
  sections: [
    {
      id: 'role',
      title: 'Un mouvement a un rôle',
      body: `Le mouvement sert à **expliquer** — un état, une relation, une hiérarchie — ou à créer **un moment signé** que la surface a mérité. Le reste est de la dette d’animation.

Une animation a sa place quand elle :

- **accuse réception** d’une action (appui, envoi, enregistrement) ;
- rend **lisible un changement d’état** ou une relation spatiale (ce panneau sort de ce bouton) ;
- assure la **continuité** pendant une navigation ou un changement de mise en page ;
- **dirige l’attention** à un moment qui compte ;
- **incarne l’univers** visuel choisi.

Sur une surface **Opérer** ou **Lire**, le mouvement sert le retour, l’état et la continuité : transitions rapides et aucune chorégraphie au chargement — l’outil se charge dans la tâche, personne ne veut le regarder se charger. Sur une surface **Persuader** ou **Expérience**, il peut porter la voix, de préférence par une séquence focale soignée plutôt que par des apparitions en série.

Test final : **retirer** l’animation doit faire perdre du sens ou du caractère, pas seulement de la décoration.`,
    },
    {
      id: 'durees',
      title: 'Des durées selon la distance et l’enjeu',
      body: `La durée exprime la distance parcourue et la conséquence de l’action. Les repères d’impeccable :

- **100–150 ms** : retour immédiat (appui, case cochée, survol) ;
- **150–300 ms** : changement d’état courant (menu, onglet, info-bulle) ;
- **300–500 ms** : mise en page, superposition ou transition de vue (panneau, fenêtre modale, page) ;
- **500–800 ms** : une entrée signée, délibérément mise en scène.

En interface produit, la plupart des transitions tiennent entre **150 et 250 ms** : la personne est dans son flux, ne la fais pas attendre.

**La sortie est plus rapide que l’entrée.** À l’entrée, on doit comprendre d’où vient l’élément ; à la sortie, la décision est prise, chaque milliseconde de plus est de l’attente. Et un retour trop long se perçoit comme de la latence.`,
    },
    {
      id: 'courbes',
      title: 'Des courbes qui décélèrent',
      body: `Un objet réel ne démarre ni ne s’arrête d’un coup : il **décélère**. Pour une arrivée assurée, impeccable recommande une décélération naturelle comme \`cubic-bezier(0.16, 1, 0.3, 1)\`, proche d’une courbe exponentielle : l’élément parcourt environ 90 % du trajet dans le premier tiers de la durée, puis se pose en douceur.

- **Entrée** : une courbe qui décélère (*ease-out* quart, quint ou exponentielle).
- **Sortie** : plus courte ; elle peut accélérer (*ease-in*), puisque l’élément quitte la scène.
- **Pas de rebond ni d’élastique par réflexe.** Le détecteur relève les animations nommées *bounce*, *elastic*, *wobble*, *jiggle* ou *spring*, et les \`cubic-bezier\` dont un point de contrôle sort de l’intervalle −0,1 à 1,1 en ordonnée : la courbe dépasse son arrivée puis revient. Ces effets datent l’interface et retardent l’instant où l’élément se stabilise.
- **Linéaire** : un rythme mécanique, réservé aux mouvements continus (barre de progression, rotation d’un indicateur de chargement).`,
      examples: [
        {
          title: 'Ouvrir une fenêtre : rebondir ou se poser',
          bad: {
            alt: 'Courbe de progression qui dépasse la ligne d’arrivée d’environ 10 % avant de revenir, avec un carré qui parcourt une piste selon cette courbe.',
            ...easingVisual('cubic-bezier(0.34, 1.56, 0.64, 1)', 0.34, 1.56, 0.64, 1, 'ex-back', '#c2410c'),
          },
          badNote: 'La courbe dépasse l’arrivée d’environ 10 % puis revient : un rebond qui date et qui retarde la stabilisation.',
          good: {
            alt: 'Courbe de progression qui monte très vite puis s’aplatit en douceur sur la ligne d’arrivée, avec un carré qui parcourt une piste selon cette courbe.',
            ...easingVisual('cubic-bezier(0.16, 1, 0.3, 1)', 0.16, 1, 0.3, 1, 'ex-expo'),
          },
          goodNote: 'Départ vif, arrivée douce, sans dépassement : l’élément répond tout de suite et se pose.',
        },
      ],
    },
    {
      id: 'materiaux',
      title: 'Quoi animer, et comment',
      body: `\`transform\` et \`opacity\` sont des fondations fiables, pas toute la palette. Choisis la propriété d’après ce que la transition raconte :

- **continuité et relation** : élément partagé, transformations FLIP, View Transitions ;
- **focus et profondeur** : flou, filtre, arrière-plan ou ombre, bornés à une zone ;
- **révélation** : masques, \`clip-path\`, recadrage ;
- **état et retour** : le plus petit changement qui rend la cause et l’effet évidents.

N’empile pas les techniques pour le spectacle : une idée de matière forte suffit.

Évite d’animer à la légère les propriétés qui pilotent la mise en page — \`width\`, \`height\`, \`top\`, \`left\`, les marges : le navigateur recalcule la mise en page à chaque image. Passe par des transformations, la technique FLIP ou la grille. N’active \`will-change\` que pendant une animation connue, et mesure sur l’appareil cible plutôt que de supposer qu’une transformation est forcément fluide.

**Le contenu est visible par défaut.** Une page dont le texte attend un script pour passer de \`opacity: 0\` à visible reste vide si le script échoue ou tarde : le détecteur classe ce défaut en erreur (*content-hidden-at-rest*). L’animation embellit l’arrivée ; elle ne conditionne jamais l’existence du contenu.`,
    },
    {
      id: 'sequences',
      title: 'Un moment signé, pas des effets partout',
      body: `Le plancher de qualité d’impeccable demande **un seul moment signé**, pas des effets dispersés, et pas la même apparition sur chaque section. Ce moment vient du produit et de sa surface : un fondu-montée générique, une carte qui se soulève au survol, une parallaxe ou une révélation au défilement ne constituent pas une idée.

- **Décalage (*stagger*)** : légitime quand une liste apparaît *en tant que liste*. Plafonne le délai total — 40 lignes décalées de 80 ms font attendre la dernière 3,1 s —, et ne transforme pas chaque section de la page en liste décalée.
- **Boucles décoratives** : le détecteur relève le point d’état qui pulse sans donnée vivante derrière (*pulsing dot*), le bandeau qui défile tout seul (*marquee*) et le faux curseur qui clignote dans un titre (*blinking cursor*). Une boucle non essentielle s’arrête quand elle sort de l’écran ou que l’onglet est masqué.
- Le WCAG impose de pouvoir **mettre en pause, arrêter ou masquer** tout contenu qui bouge automatiquement plus de 5 secondes à côté d’autre contenu (critère 2.2.2), et interdit ce qui flashe plus de trois fois par seconde au-delà des seuils de flash (critère 2.3.1).`,
    },
    {
      id: 'reduit',
      title: 'Mouvement réduit : moins, pas rien',
      body: `Chaque animation web a besoin d’un chemin \`prefers-reduced-motion\` **intentionnel**. Pour certaines personnes (troubles vestibulaires, migraines), les grands déplacements, parallaxes et zooms provoquent vertiges ou nausées.

- **Retire ou réduis les déplacements** : glissements, parallaxe, zooms, rotations.
- **Garde l’opacité, la couleur et les changements d’état qui portent du sens** : un fondu court remplace un glissement.
- **Le retour qui confirme une action reste lisible** : une coche, un message « Enregistré ».

Réduire, c’est **moins et plus doux, pas zéro**. L’audit d’impeccable signale la règle globale qui ramène toutes les durées à \`0.01ms\` : elle détruit les retours utiles. Sur iOS, la consigne est la même : un fondu enchaîné à la place de la parallaxe et des grands glissements.

Respecte aussi les préférences de lecture automatique et de son : rien ne démarre en sonore sans accord.`,
      examples: [
        {
          title: 'Après « Enregistrer », en mode mouvement réduit',
          bad: {
            alt: 'Écran de préférences avec deux interrupteurs et un bouton « Enregistrer », sans aucune confirmation visible après l’enregistrement.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">${PREFS}<div class="mk-row" style="--gap:12px"><span class="mk-btn">Enregistrer</span><span class="rm-ok" style="opacity:0"><i data-icon="circle-check" style="--ico:16px"></i>Préférences enregistrées</span></div></div>`,
            css: `.rm-ok { display: inline-flex; align-items: center; gap: 6px; color: #1a6e32; font-weight: 600; font-size: 13px; }`,
          },
          badNote: 'Toutes les animations coupées d’un coup : la confirmation, qui n’apparaissait que par une animation, ne s’affiche plus.',
          good: {
            alt: 'Même écran : à côté du bouton, une coche verte et le message « Préférences enregistrées ».',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">${PREFS}<div class="mk-row" style="--gap:12px"><span class="mk-btn">Enregistrer</span><span class="rm-ok"><i data-icon="circle-check" style="--ico:16px"></i>Préférences enregistrées</span></div></div>`,
            css: `.rm-ok { display: inline-flex; align-items: center; gap: 6px; color: #1a6e32; font-weight: 600; font-size: 13px; animation: rm-fade 200ms ease-out both; }
@keyframes rm-fade { from { opacity: 0; } }`,
          },
          goodNote: 'Le glissement de la confirmation devient un fondu de 200 ms : moins de mouvement, même information.',
        },
      ],
    },
  ],
  rules: [
    { id: 'jobs', front: 'Quand une animation d’interface a-t-elle sa place ?', back: 'Pour accuser réception, rendre lisible un changement d’état, assurer la continuité, diriger l’attention ou incarner l’univers. Sinon, c’est de la dette.' },
    { id: 'feedback', front: 'Durée d’un retour immédiat (appui, case cochée) ?', back: '100 à 150 ms.' },
    { id: 'state', front: 'Durée d’un changement d’état courant (menu, onglet) ?', back: '150 à 300 ms ; en interface produit, la plupart des transitions tiennent entre 150 et 250 ms.' },
    { id: 'overlay', front: 'Durée d’une superposition ou d’une transition de vue ?', back: '300 à 500 ms. 500 à 800 ms seulement pour une entrée signée.' },
    { id: 'exit', front: 'Entrée ou sortie : laquelle est la plus rapide ?', back: 'La sortie. On veut voir arriver un élément, pas le regarder partir.' },
    { id: 'easing', front: 'Quelle courbe pour une arrivée assurée ?', back: 'Une décélération naturelle, par exemple `cubic-bezier(0.16, 1, 0.3, 1)`. Pas de rebond ni d’élastique par réflexe.' },
    { id: 'properties', front: 'Quelles propriétés éviter d’animer à la légère ?', back: '`width`, `height`, `top`, `left` et les marges : elles recalculent la mise en page à chaque image. Préfère `transform` et `opacity`.' },
    { id: 'visible', front: 'Quel est l’état par défaut d’un contenu animé à l’entrée ?', back: 'Visible. L’animation embellit l’arrivée ; elle ne conditionne jamais l’existence du contenu.' },
    { id: 'reduced', front: 'Que faire sous `prefers-reduced-motion: reduce` ?', back: 'Moins et plus doux : retirer les déplacements, garder fondus, couleurs et retours d’état. Jamais tout couper.' },
    { id: 'one-moment', front: 'Combien de moments animés « signés » par page ?', back: 'Un seul, tiré du produit. Pas d’effets dispersés ni la même apparition sur chaque section.' },
    { id: 'stagger', front: 'Quand décaler l’apparition d’éléments ?', back: 'Quand une liste apparaît en tant que liste, avec un délai total plafonné.' },
    { id: 'loops', front: 'Point qui pulse, bandeau qui défile : quand ?', back: 'La pulsation seulement pour une donnée réellement vivante ; le défilement automatique cache la moitié du contenu. Toute boucle non essentielle s’arrête hors écran.' },
  ],
  exercises: [
    {
      id: 'motion-duration-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la durée d’ouverture de ce menu déroulant, puis rejoue l’animation pour juger.',
      visual: {
        alt: 'Bouton « Trier par : pertinence » sous lequel s’ouvre un menu de quatre options, avec une durée d’animation réglable.',
        html: `<div class="mk-pad dd"><span class="mk-btn mk-btn--ghost mk-btn--s">Trier par : pertinence <i data-icon="chevron-down" style="--ico:14px"></i></span><ul class="dd-menu"><li class="on">Pertinence</li><li>Prix croissant</li><li>Prix décroissant</li><li>Nouveautés</li></ul></div>`,
        css: `.dd { min-height: 220px; }
.dd-menu { list-style: none; margin: 6px 0 0; padding: 6px; width: 210px; border: 1px solid #e1e4ea; border-radius: 10px; background: #fff; box-shadow: 0 8px 24px rgb(15 20 35 / 0.12); transform-origin: top left; animation: dd-open var(--v, 900ms) ${EXPO} both; }
.dd-menu li { padding: 8px 10px; border-radius: 6px; }
.dd-menu li.on { background: #eef1f7; font-weight: 600; }
@keyframes dd-open { from { opacity: 0; transform: translateY(-8px) scale(0.96); } }
@media (prefers-reduced-motion: reduce) { .dd-menu { animation-name: dd-fade; } @keyframes dd-fade { from { opacity: 0; } } }`,
      },
      control: 'Durée',
      min: 50,
      max: 1200,
      step: 10,
      initial: 900,
      unit: 'ms',
      target: [150, 300],
      ideal: 200,
      replayable: true,
      explanation: `Un menu déroulant est un **changement d’état courant** : impeccable le place entre **150 et 300 ms**, et la plupart des transitions d’une interface produit tiennent entre 150 et 250 ms.

- Bien en dessous de 150 ms, le mouvement devient à peine perceptible : il ne raconte plus d’où sort le menu.
- Au-delà de 300 ms, la personne attend son menu ; à 900 ms, elle a le temps de se demander si son clic a été pris en compte. Un retour long se perçoit comme de la latence.

La fermeture sera plus rapide encore : on veut voir arriver, pas regarder partir.`,
      takeaway: 'Changement d’état courant : 150 à 300 ms (150–250 ms en produit). Au-delà, l’animation devient de l’attente.',
      sources: ['imp:animate', 'imp:operate'],
    },
    {
      id: 'motion-easing-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle courbe d’animation choisir pour l’ouverture d’un panneau latéral dans une application ?',
      options: [
        {
          id: 'linear',
          visual: {
            alt: 'Courbe en ligne droite : la progression augmente à vitesse constante, avec un carré qui parcourt une piste à vitesse constante.',
            ...easingVisual('linear', 0, 0, 1, 1, 'ch-linear'),
          },
          why: 'Vitesse constante : le panneau démarre et s’arrête net, comme une machine.',
        },
        {
          id: 'ease-in',
          visual: {
            alt: 'Courbe qui reste plate au début puis monte brusquement à la fin, avec un carré qui démarre lentement et finit vite.',
            ...easingVisual('cubic-bezier(0.42, 0, 1, 1)', 0.42, 0, 1, 1, 'ch-in'),
          },
          why: 'Démarrage lent, arrivée brutale : la personne attend au début, puis le panneau percute la fin de sa course.',
        },
        {
          id: 'expo-out',
          visual: {
            alt: 'Courbe qui monte très vite puis s’aplatit en douceur sur la ligne d’arrivée, avec un carré qui part vite et ralentit.',
            ...easingVisual('cubic-bezier(0.16, 1, 0.3, 1)', 0.16, 1, 0.3, 1, 'ch-out'),
          },
          why: 'Départ vif, arrivée en douceur : le panneau répond tout de suite et se pose sans à-coup.',
        },
      ],
      answer: 'expo-out',
      explanation: `Pour une **entrée**, l’élément doit réagir immédiatement puis se poser : c’est une **décélération**. Impeccable recommande une courbe naturelle comme \`cubic-bezier(0.16, 1, 0.3, 1)\` : environ 90 % du trajet est parcouru dans le premier tiers de la durée.

La courbe qui accélère (*ease-in*) n’a parcouru que 16 % du trajet au même moment : elle convient plutôt aux **sorties**. La linéaire est réservée aux mouvements continus, comme une barre de progression.`,
      takeaway: 'Une entrée décélère : départ vif, arrivée douce, par exemple `cubic-bezier(0.16, 1, 0.3, 1)`.',
      sources: ['imp:animate', 'imp:quieter', MATERIAL_SPEED],
    },
    {
      id: 'motion-exit-timeline',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle spécification d’animation convient le mieux à ce panneau de filtres ?',
      options: [
        {
          id: 'slow-exit',
          visual: {
            alt: 'Frise temporelle : ouverture en 250 ms, fermeture en 400 ms.',
            html: timeline(250, 400),
            css: TIMELINE_CSS,
          },
          why: 'La fermeture dure plus longtemps que l’ouverture : une fois la décision prise, la personne regarde encore le panneau partir.',
        },
        {
          id: 'fast-exit',
          visual: {
            alt: 'Frise temporelle : ouverture en 300 ms, fermeture en 200 ms.',
            html: timeline(300, 200),
            css: TIMELINE_CSS,
          },
          why: 'La fermeture est plus courte que l’ouverture : le panneau s’efface dès que la personne a fini.',
        },
      ],
      answer: 'fast-exit',
      explanation: `Impeccable : **la sortie est plus rapide que l’entrée**. À l’ouverture, la personne doit comprendre d’où vient le panneau et ce qu’il contient ; à la fermeture, elle a déjà décidé, et chaque milliseconde de plus est de l’attente.

Les durées restent dans les repères : environ 300 ms pour une superposition qui entre, 200 ms pour sa sortie. Material Design va dans le même sens : une courbe qui décélère pour les éléments qui entrent, une courbe qui accélère pour ceux qui sortent.`,
      takeaway: 'La sortie est plus courte que l’entrée : on montre l’arrivée, on ne fait pas regarder le départ.',
      sources: ['imp:animate', MATERIAL_SPEED],
    },
    {
      id: 'motion-hidden-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Le script d’animation de ces deux pages d’accueil n’a pas pu se charger. Laquelle est construite correctement ?',
      context: 'Capture prise une fois la page chargée, script d’animation bloqué par le réseau.',
      options: [
        {
          id: 'gated',
          visual: {
            alt: 'Page d’accueil d’un atelier de céramique : seul le titre est visible, tout le reste de la page est vide.',
            html: LANDING(true),
            css: LANDING_CSS,
          },
          why: 'Le contenu démarre invisible et attend le script pour apparaître : sans lui, la page reste vide sous le titre.',
        },
        {
          id: 'visible',
          visual: {
            alt: 'Même page avec tout son contenu visible : texte, bouton, photos et adresse.',
            html: LANDING(false),
            css: LANDING_CSS,
          },
          why: 'Le contenu est visible par défaut ; l’animation, si elle se charge, ne fait qu’embellir son arrivée.',
        },
      ],
      answer: 'visible',
      explanation: `C’est un défaut que le détecteur d’impeccable classe en **erreur** (*content-hidden-at-rest*) : une grande part du texte reste invisible après le passage des scripts. Un script bloqué, une erreur JavaScript ou une connexion lente suffisent à livrer une page vide.

La règle : **le contenu est visible dans l’état par défaut**. Le CSS de base affiche tout ; l’animation d’entrée s’ajoute ensuite — par exemple seulement quand une classe posée par le script est présente, et sous \`prefers-reduced-motion: no-preference\`.`,
      takeaway: 'Le contenu est visible par défaut ; l’animation d’entrée l’embellit sans jamais conditionner son existence.',
      sources: ['imp:animate', 'imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'motion-pulse-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel indicateur d’état convient à ce tableau de bord ?',
      context: 'Les chiffres sont recalculés une fois par heure.',
      options: [
        {
          id: 'pulse',
          visual: {
            alt: 'Carte « Ventes du jour » avec, en haut à droite, un point vert qui pulse à côté de la mention « En direct ».',
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><div class="mk-row mk-between"><p class="mk-h3">Ventes du jour</p><span class="pd-live"><span class="pd-dot"></span>En direct</span></div><p class="mk-price" style="font-size:28px">1 284 €</p><p class="mk-small mk-muted">32 commandes · panier moyen 40 €</p></div>`,
            css: `.pd-live { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #1a6e32; }
.pd-dot { width: 8px; height: 8px; border-radius: 50%; background: #1a7f37; outline: 3px solid rgb(26 127 55 / 0.25); animation: pd-pulse 1.6s ease-out 6; }
@keyframes pd-pulse { from { box-shadow: 0 0 0 0 rgb(26 127 55 / 0.6); } to { box-shadow: 0 0 0 9px rgb(26 127 55 / 0); } }`,
          },
          why: 'Le point qui pulse promet du temps réel alors que les chiffres peuvent dater d’une heure : une animation décorative, et trompeuse.',
        },
        {
          id: 'static',
          visual: {
            alt: 'Même carte avec, en haut à droite, une petite horloge et la mention « Mis à jour à 14 h 00 ».',
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><div class="mk-row mk-between"><p class="mk-h3">Ventes du jour</p><span class="mk-row mk-small mk-muted" style="--gap:6px"><i data-icon="clock" style="--ico:14px"></i>Mis à jour à 14 h 00</span></div><p class="mk-price" style="font-size:28px">1 284 €</p><p class="mk-small mk-muted">32 commandes · panier moyen 40 €</p></div>`,
          },
          why: 'Un indicateur statique et précis : on sait exactement de quand datent les chiffres.',
        },
      ],
      answer: 'static',
      explanation: `Le détecteur d’impeccable relève le **point d’état qui pulse** (*pulsing dot*) : il simule une activité en direct. La pulsation se réserve aux indicateurs liés à des données **réellement vivantes** et changeantes ; ailleurs, un indicateur statique clairement libellé est plus honnête, et plus calme.

Une animation en boucle attire l’œil en permanence : elle doit le mériter.`,
      takeaway: 'Ne fais pulser un indicateur que si la donnée est vraiment vivante ; sinon, un libellé statique et précis.',
      sources: ['imp:detector', 'imp:operate'],
    },
    {
      id: 'motion-properties-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Pour animer l’ouverture d’un tiroir latéral, quelles propriétés privilégier ?',
      options: [
        { id: 'transform', label: '`transform` (une translation)', why: 'Déplace le tiroir sans recalculer la mise en page.' },
        { id: 'opacity', label: '`opacity`', why: 'Un fondu qui ne touche pas à la mise en page.' },
        { id: 'width', label: '`width`', why: 'Recalcule la mise en page à chaque image, et le contenu du tiroir se réorganise pendant l’animation.' },
        { id: 'left', label: '`left`', why: 'Pilote la position dans la mise en page : recalcul à chaque image.' },
        { id: 'margin', label: '`margin-left`', why: 'Déplace aussi les éléments voisins : recalcul de mise en page à chaque image.' },
        { id: 'height', label: '`height`', why: 'Même problème que la largeur : la mise en page bouge à chaque image.' },
      ],
      answers: ['transform', 'opacity'],
      explanation: `\`width\`, \`height\`, \`top\`, \`left\` et les marges **pilotent la mise en page** : les animer oblige le navigateur à recalculer la position de nombreux éléments à chaque image, d’où des saccades.

\`transform\` et \`opacity\` sont les fondations fiables. Impeccable nuance : ce ne sont pas les seules propriétés utiles (flou, \`clip-path\`, ombre ont leur place quand ils restent bornés), et il faut mesurer sur l’appareil cible plutôt que de supposer qu’une transformation est forcément fluide.`,
      takeaway: 'Anime `transform` et `opacity` ; évite `width`, `height`, `top`, `left` et les marges, qui recalculent la mise en page.',
      sources: ['imp:animate', 'imp:audit'],
    },
    {
      id: 'motion-reduced-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Une personne a activé « Réduire les animations ». Ton application fait glisser les écrans latéralement et anime une coche après chaque enregistrement. Que fais-tu ?',
      options: [
        { id: 'fade', label: 'Remplacer les glissements par des fondus courts et garder la confirmation d’enregistrement, sans déplacement.', why: 'C’est l’alternative intentionnelle : moins de déplacement, mais le sens et le retour sont conservés.' },
        { id: 'kill', label: 'Ramener toutes les animations et transitions à 0,01 ms avec une règle globale.', why: 'La règle globale détruit aussi les retours utiles ; l’audit d’impeccable la signale.' },
        { id: 'nothing', label: 'Ne rien changer : ces animations sont déjà courtes.', why: 'Un glissement d’écran entier reste un grand déplacement, même court : c’est ce que la préférence demande d’éviter.' },
        { id: 'slower', label: 'Ralentir toutes les animations pour les rendre plus douces.', why: 'Un mouvement plus lent reste plus longtemps à l’écran : c’est l’inverse de ce qui est demandé.' },
      ],
      answer: 'fade',
      explanation: `Impeccable demande pour chaque animation web un chemin \`prefers-reduced-motion\` **intentionnel** : retirer ou réduire le mouvement dans l’espace, tout en gardant l’opacité, la couleur et les changements d’état qui portent du sens.

Le mode réduit, c’est **moins et plus doux, pas zéro** : la confirmation d’une action doit rester lisible. Sur iOS, la consigne est identique : un fondu enchaîné à la place des parallaxes et des grands glissements.`,
      takeaway: 'Mouvement réduit : remplace les déplacements par des fondus courts et garde les retours qui confirment une action.',
      sources: ['imp:animate', 'imp:audit', 'imp:ios', MDN_RM],
    },
    {
      id: 'motion-reduced-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Respecter `prefers-reduced-motion`, c’est supprimer toutes les animations et transitions de l’interface.',
      answer: false,
      explanation: `Le mode réduit demande **moins de mouvement et plus de douceur**, pas l’absence de tout changement visuel. On retire les déplacements (glissements, parallaxes, zooms) mais on garde les fondus, les changements de couleur et surtout les retours qui confirment une action.

Une règle globale qui ramène toutes les durées à quasi zéro peut faire disparaître une confirmation qui n’existait que par une animation : la personne ne sait plus si son action a abouti.`,
      takeaway: 'Mouvement réduit : moins et plus doux, pas zéro. Les retours d’état restent lisibles.',
      sources: ['imp:animate', 'imp:audit', WCAG_233],
    },
    {
      id: 'motion-loading-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Dans une application de gestion, une séquence d’apparition animée à chaque chargement d’écran rend l’outil plus agréable.',
      answer: false,
      explanation: `Dans une surface **Opérer**, la personne est dans son flux : elle veut sa liste, son formulaire, son tableau. Impeccable est explicite : pas de séquence orchestrée au chargement — le produit se charge dans la tâche, personne ne veut le regarder se charger.

Le mouvement y sert l’état, le retour et la continuité, avec des transitions de 150 à 250 ms. Le délice se garde pour des moments précis, pas pour chaque écran.`,
      takeaway: 'En application, pas de chorégraphie au chargement : le mouvement sert l’état et le retour, en 150 à 250 ms.',
      sources: ['imp:operate', 'imp:animate'],
    },
    {
      id: 'motion-landing-hotspot',
      type: 'hotspot',
      difficulty: 1,
      prompt: 'Trouve les trois animations décoratives en boucle sur cette page d’accueil.',
      visual: {
        alt: 'Page d’accueil d’un logiciel de facturation : barre de navigation, pastille « Nouveau » avec un point qui pulse, titre suivi d’un curseur clignotant, bouton d’essai, bandeau de noms de clients qui défile et capture du produit.',
        frame: 'browser',
        html: `<div class="mk-row mk-between lp-nav" data-hotspot="nav"><b>Facturo</b><span class="mk-small mk-muted">Tarifs · Connexion</span></div>
<div class="mk-pad mk-stack" style="--gap:12px">
  <span class="lp-new" data-hotspot="pulse"><span class="lp-dot"></span>Nouveau : export comptable</span>
  <p class="lp-h" data-hotspot="cursor">Vos factures, envoyées avant le café<span class="lp-caret"></span></p>
  <p class="mk-muted">Créez, envoyez et relancez vos factures en quelques clics.</p>
  <span class="mk-btn" data-hotspot="cta" style="align-self:flex-start">Essayer 30 jours</span>
  <div class="lp-logos" data-hotspot="marquee"><div class="lp-track">${[...LOGOS, ...LOGOS].map((l) => `<span>${l}</span>`).join('')}</div></div>
  <div class="mk-img" data-hotspot="shot" style="--ratio:16 / 5;max-height:120px"></div>
</div>`,
        css: `.lp-nav { padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.lp-new { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; padding: 3px 10px; border-radius: 999px; background: #eef1f7; font-size: 12px; font-weight: 600; color: #36405a; }
.lp-dot { width: 8px; height: 8px; border-radius: 50%; background: #1a7f37; outline: 3px solid rgb(26 127 55 / 0.25); animation: lp-pulse 1.6s ease-out 6; }
@keyframes lp-pulse { from { box-shadow: 0 0 0 0 rgb(26 127 55 / 0.6); } to { box-shadow: 0 0 0 9px rgb(26 127 55 / 0); } }
.lp-h { font-size: 22px; font-weight: 700; line-height: 1.2; }
.lp-caret { display: inline-block; width: 3px; height: 1em; margin-inline-start: 4px; vertical-align: -0.12em; background: #1f4fd8; animation: lp-blink 1s steps(1) 8; }
@keyframes lp-blink { 50% { opacity: 0; } }
.lp-logos { overflow: hidden; border-block: 1px solid #eceef2; padding: 8px 0; }
.lp-track { display: flex; gap: 28px; width: max-content; white-space: nowrap; color: #5a6172; font-weight: 600; font-size: 13px; animation: lp-scroll 16s linear 2; }
@keyframes lp-scroll { to { transform: translateX(-50%); } }`,
      },
      hotspots: [
        { id: 'pulse', label: 'Point qui pulse dans la pastille « Nouveau »', correct: true, why: 'Aucune donnée vivante derrière : la pulsation simule une activité pour attirer l’œil.' },
        { id: 'cursor', label: 'Curseur clignotant du titre', correct: true, why: 'Un faux curseur de saisie là où l’on ne peut rien saisir : un costume d’outil de développeur.' },
        { id: 'marquee', label: 'Bandeau de clients qui défile', correct: true, why: 'Le défilement automatique cache une partie des noms à chaque instant et capte l’attention sans la mériter.' },
        { id: 'nav', label: 'Barre de navigation', correct: false, why: 'Statique et claire : rien à corriger.' },
        { id: 'cta', label: 'Bouton « Essayer 30 jours »', correct: false, why: 'Une action nommée, sans effet superflu.' },
        { id: 'shot', label: 'Capture du produit', correct: false, why: 'Une image fixe qui montre le produit.' },
      ],
      explanation: `Trois clichés de mouvement que le détecteur d’impeccable relève :

- **pulsing dot** : un point qui pulse sans donnée réellement vivante ;
- **blinking cursor** : un curseur qui clignote dans un titre, pour simuler une saisie ;
- **marquee** : un contenu qui défile tout seul et cache la moitié de lui-même.

Une boucle doit mériter l’attention qu’elle capte. Et au-delà de 5 secondes de mouvement automatique à côté d’autre contenu, le WCAG exige un moyen de le mettre en pause, de l’arrêter ou de le masquer (critère 2.2.2).`,
      takeaway: 'Pas de boucles décoratives : ni point qui pulse sans donnée vivante, ni faux curseur, ni bandeau qui défile tout seul.',
      sources: ['imp:detector', 'imp:craft-floor', WCAG_222],
    },
    {
      id: 'motion-spec-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Dans cette fiche de spécification, trouve les trois animations à revoir.',
      visual: {
        alt: 'Fiche de spécification des animations d’une application bancaire : six lignes associant un élément à sa propriété animée, sa durée et sa courbe.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:8px">
  <div class="mk-row mk-between"><p class="mk-h3">Animations · application Banque</p><span class="mk-badge">Spécification v3</span></div>
  <div class="sp-row sp-head"><span>Élément</span><span>Animation</span></div>
  <div class="sp-row" data-hotspot="button"><span>Bouton principal, à l’appui</span><code>background-color · 120 ms · ease-out</code></div>
  <div class="sp-row" data-hotspot="drawer"><span>Tiroir de navigation, ouverture</span><code>left: -280px → 0 · 600 ms</code></div>
  <div class="sp-row" data-hotspot="toast"><span>Notification de virement, entrée</span><code>animation: bounce · 900 ms</code></div>
  <div class="sp-row" data-hotspot="menu"><span>Menu « Plus », ouverture</span><code>transform + opacity · 200 ms · cubic-bezier(0.16, 1, 0.3, 1)</code></div>
  <div class="sp-row" data-hotspot="list"><span>Liste des opérations, 40 lignes</span><code>apparition décalée de 80 ms par ligne</code></div>
  <div class="sp-row" data-hotspot="check"><span>Case à cocher, coche</span><code>opacity · 150 ms · conservée en mode réduit</code></div>
</div>`,
        css: `.sp-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 12px; padding: 8px 6px; border-bottom: 1px solid #eceef2; font-size: 13px; align-items: baseline; }
.sp-head { font-size: 12px; font-weight: 700; color: #5a6172; border-bottom-color: #d5d9e2; }
.sp-row code { font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #36405a; }
@media (max-width: 480px) { .sp-row { grid-template-columns: minmax(0, 1fr); gap: 2px; } .sp-head { display: none; } }`,
      },
      hotspots: [
        { id: 'drawer', label: 'Tiroir de navigation', correct: true, why: 'Il anime left, une propriété de mise en page, et dure 600 ms, au-delà des 300 à 500 ms d’une superposition. Une translation de 300 ms environ ferait mieux.' },
        { id: 'toast', label: 'Notification de virement', correct: true, why: 'Un rebond de 900 ms : un effet daté que le détecteur relève, et bien trop long pour une notification.' },
        { id: 'list', label: 'Liste des opérations', correct: true, why: 'Sans plafond, la 40e ligne attend 3,1 s (39 × 80 ms) avant de commencer à apparaître.' },
        { id: 'button', label: 'Bouton principal', correct: false, why: 'Retour d’appui de 120 ms sur la couleur de fond : dans la fourchette d’un retour immédiat.' },
        { id: 'menu', label: 'Menu « Plus »', correct: false, why: 'Transformation et opacité, 200 ms, courbe qui décélère : le réglage recommandé.' },
        { id: 'check', label: 'Case à cocher', correct: false, why: 'Un fondu de 150 ms conservé en mode réduit : le retour reste lisible.' },
      ],
      explanation: `Une fiche de spécification se relit avec trois questions : **quelle propriété**, **quelle durée**, **quelle courbe**.

- Le tiroir anime \`left\`, qui recalcule la mise en page à chaque image, et dépasse la fourchette de 300 à 500 ms d’une superposition.
- La notification rebondit (*bounce*) pendant 900 ms : un effet daté, et une durée de moment signé pour un simple message.
- La liste décale chaque ligne sans plafond : 39 × 80 ms, soit 3,1 s avant que la dernière ligne ne démarre. Plafonne le délai total.`,
      takeaway: 'Relis chaque animation : propriété (transform, opacity), durée (dans sa fourchette), courbe (décélérer, pas rebondir), délai total plafonné.',
      sources: ['imp:animate', 'imp:detector', 'imp:audit'],
    },
    {
      id: 'motion-order-durations',
      type: 'order',
      difficulty: 1,
      prompt: 'Range ces animations de la plus courte à la plus longue durée recommandée.',
      items: [
        { id: 'press', label: 'Retour visuel à l’appui sur un bouton' },
        { id: 'menu', label: 'Ouverture d’un menu déroulant' },
        { id: 'modal', label: 'Ouverture d’une fenêtre modale' },
        { id: 'hero', label: 'Entrée signée de l’illustration d’une page de campagne' },
      ],
      explanation: `Les repères d’impeccable associent la durée à la distance et à l’enjeu :

1. retour immédiat : **100–150 ms** ;
2. changement d’état courant : **150–300 ms** ;
3. superposition ou transition de vue : **300–500 ms** ;
4. entrée délibérément mise en scène : **500–800 ms**.

Plus l’élément parcourt d’espace et plus le changement est important, plus l’animation peut durer — mais jamais au point de faire attendre.`,
      takeaway: 'Appui 100–150 ms, état 150–300 ms, superposition 300–500 ms, entrée signée 500–800 ms.',
      sources: ['imp:animate'],
    },
    {
      id: 'motion-match-material',
      type: 'match',
      difficulty: 3,
      prompt: 'Associe chaque situation à la technique de mouvement qui l’explique le mieux.',
      leftTitle: 'Situation',
      rightTitle: 'Technique',
      pairs: [
        { id: 'shared', left: 'Une vignette d’album s’agrandit en page de détail', right: 'Un élément partagé (View Transitions ou FLIP)' },
        { id: 'depth', left: 'Une fenêtre passe au premier plan', right: 'Un flou ou un assombrissement borné de l’arrière-plan' },
        { id: 'reveal', left: 'Une photo se dévoile dans un article', right: 'Un masque ou un `clip-path` qui découvre l’image' },
        { id: 'state', left: 'Un interrupteur passe à « activé »', right: 'Le plus petit changement : la pastille glisse, la couleur change' },
        { id: 'list', left: 'Une liste de résultats apparaît', right: 'Un court décalage entre les lignes, délai total plafonné' },
      ],
      explanation: `Impeccable demande de choisir la matière du mouvement **d’après ce qu’il communique** :

- **continuité et relation** : l’élément partagé montre que la page de détail *est* la vignette ;
- **focus et profondeur** : le flou ou l’assombrissement de l’arrière-plan place la fenêtre devant ;
- **révélation** : un masque découvre le contenu ;
- **état et retour** : le plus petit changement qui rend la cause et l’effet évidents ;
- **liste** : un décalage, seulement quand une liste apparaît en tant que liste.`,
      takeaway: 'Choisis la technique d’après le message : continuité, profondeur, révélation, état ou liste.',
      sources: ['imp:animate', 'imp:overdrive'],
    },
    {
      id: 'motion-one-moment-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Page d’accueil d’un studio de céramique : quelle stratégie de mouvement adopter ?',
      options: [
        { id: 'focal', label: 'Un seul moment signé, tiré du métier : à l’arrivée, la pièce phare fait un tour sur le tour de potier, puis la page reste calme.', why: 'Un moment unique, propre à ce studio, qu’aucun site voisin ne pourrait reprendre tel quel.' },
        { id: 'sections', label: 'Chaque section apparaît en fondu montant au fil du défilement.', why: 'La même entrée répétée sur chaque section : le plancher de qualité la refuse explicitement.' },
        { id: 'scatter', label: 'Parallaxe sur les photos, compteurs animés, logos qui défilent et cartes qui se soulèvent au survol.', why: 'Des effets dispersés et génériques : aucun ne dit quelque chose du studio.' },
        { id: 'trail', label: 'Un curseur personnalisé qui laisse une traînée colorée sur toute la page.', why: 'Un effet permanent qui gêne la lecture et n’a aucun rapport avec la céramique.' },
      ],
      answer: 'focal',
      explanation: `Le plancher de qualité d’impeccable demande **un seul moment signé**, pas des effets dispersés, et pas la même apparition sur chaque section. Ce moment doit venir du produit : un fondu-montée générique, une parallaxe ou une révélation au défilement ne sont pas une idée.

Ici, le tour de potier est le geste du métier : le montrer une fois, à l’arrivée, suffit à donner du caractère. Le reste de la page reste calme, et le mode réduit remplace la rotation par un simple fondu.`,
      takeaway: 'Un seul moment signé, tiré du produit ; le reste de la page reste calme.',
      sources: ['imp:craft-floor', 'imp:animate'],
    },
  ],
};

export default motion;
