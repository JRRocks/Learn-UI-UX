import type { ModuleContent, SourceRef } from '../../engine/types';

/**
 * French typography inside mock markup (the Markdown renderer only handles text fields): thin
 * no-break space before ? ! ; » and after «, no-break space before :, and a number kept with its
 * unit or sign (« 24,90 € », « 82 % », « 35 min », « n° 214 », « × 2 »).
 */
const fr = (html: string) =>
  html
    .replace(/ ([?!;»])/g, '\u202F$1')
    .replace(/« /g, '«\u202F')
    .replace(/ :/g, '\u00A0:')
    .replace(/(\d) (?=(?:€|%|px|min|m)(?![\p{L}\d]))/gu, '$1\u00A0')
    .replace(/(n°|×) (?=\d)/g, '$1\u00A0');

/** Escapes code shown as text in a mock. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const WCAG_TARGET_AAA: SourceRef = {
  label: 'W3C — Comprendre le critère 2.5.5 (taille des cibles, renforcé)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html',
};
const WCAG_REFLOW: SourceRef = {
  label: 'W3C — Comprendre le critère 1.4.10 (redistribution)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',
};
const MDN_POINTER: SourceRef = {
  label: 'MDN — Caractéristique média pointer',
  url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@media/pointer',
};
const MDN_HOVER: SourceRef = {
  label: 'MDN — Caractéristique média hover',
  url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@media/hover',
};
const MDN_ANY_POINTER: SourceRef = {
  label: 'MDN — Caractéristique média any-pointer',
  url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@media/any-pointer',
};
const MDN_ENV: SourceRef = {
  label: 'MDN — env() et les zones sûres',
  url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/env',
};
const MDN_IMAGES: SourceRef = {
  label: 'MDN — Images adaptatives (srcset, sizes, picture)',
  url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Guides/Responsive_images',
};
const HOOBER: SourceRef = {
  label: 'Steven Hoober — How Do Users Really Hold Mobile Devices? (UXmatters, 2013)',
  url: 'https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php',
};

/* ---------- Shared mock pieces ---------- */

const PRODUCT_DESK_CSS = `
.pp-nav { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 7px; padding: 8px 10px; font-size: 9px; border-bottom: 1px solid #e3e6ec; }
.pp-nav b { font-size: 11px; margin-inline-end: 4px; }
.pp-nav span { color: #1f4fd8; }
.pp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px 10px 12px; }
.pp-t { font-size: 11px; font-weight: 700; line-height: 1.25; }
.pp-p { font-size: 10px; font-weight: 700; margin: 2px 0 4px; }
.pp-d { font-size: 8.5px; color: #5a6172; line-height: 1.35; }
.pp-sizes { display: flex; gap: 3px; margin: 6px 0; }
.pp-sizes span { font-size: 8px; border: 1px solid #c3c8d3; border-radius: 3px; padding: 1px 4px; }
.pp-btn { display: inline-block; font-size: 8.5px; font-weight: 600; background: #1f4fd8; color: #fff; padding: 3px 6px; border-radius: 4px; }
`;

const PRODUCT_MOBILE_CSS = `
.pm-bar { display: flex; align-items: center; justify-content: space-between; padding: 0 4px; border-bottom: 1px solid #e3e6ec; }
.pm-ico { width: 44px; height: 44px; display: grid; place-items: center; }
.pm-size { width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid #c3c8d3; border-radius: 8px; font-weight: 600; }
.pm-size.on { border: 2px solid #1d2230; }
.pm-cta { min-height: 48px; }
`;

const TARGETS_CSS = `
.tg-bar { display: flex; align-items: center; justify-content: flex-end; }
.tg-s, .tg-l { position: relative; flex: none; display: grid; place-items: center; }
.tg-s { width: 24px; height: 24px; }
.tg-s .mk-ico { width: 16px; height: 16px; }
.tg-l { width: 44px; height: 44px; border-radius: 10px; background: #f0f2f6; }
.tg-pair { position: relative; display: flex; flex: none; }
.tg-finger { position: absolute; top: 50%; left: 50%; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%; background: rgb(214 120 90 / 0.28); border: 1.5px dashed #b4553a; }
`;

const SAFE_CSS = `
.sa-phone { position: relative; width: min(100%, 300px); margin: 0 auto; border: 7px solid #1a1d24; border-radius: 36px; overflow: hidden; background: #fff; }
.sa-island { position: absolute; top: 9px; left: 50%; width: 86px; height: 24px; margin-left: -43px; border-radius: 14px; background: #0b0c10; z-index: 3; }
.sa-home { position: absolute; bottom: 7px; left: 50%; width: 110px; height: 5px; margin-left: -55px; border-radius: 3px; background: #111; z-index: 3; }
.sa-head { padding: 12px 16px 10px; text-align: center; font-weight: 700; font-size: 16px; border-bottom: 1px solid #e3e6ec; }
.sa-head--safe { padding-top: 48px; }
.sa-row { display: flex; justify-content: space-between; gap: 10px; padding: 10px 16px; border-bottom: 1px solid #eceef2; }
.sa-foot { padding: 8px 12px 3px; border-top: 1px solid #e3e6ec; }
.sa-foot--safe { padding-bottom: 30px; }
`;

const CART_ROWS = `<div class="sa-row"><span>Café en grains, 1 kg</span><span class="mk-price">24,90 €</span></div>
  <div class="sa-row"><span>Filtres papier × 2</span><span class="mk-price">7,80 €</span></div>
  <div class="sa-row"><span>Moulin manuel</span><span class="mk-price">32,10 €</span></div>`;

const NAV_CSS = `
.nv-top { padding: 8px 10px 6px; border-bottom: 1px solid #e3e6ec; }
.nv-logo { font-weight: 800; font-size: 16px; letter-spacing: -0.01em; }
.nv-links { display: flex; flex-wrap: wrap; gap: 2px 9px; margin-top: 4px; font-size: 11px; color: #1f4fd8; }
.nv-bar { display: flex; align-items: center; padding: 0 4px 0 14px; border-bottom: 1px solid #e3e6ec; }
.nv-btn { width: 44px; height: 44px; display: grid; place-items: center; }
`;

const RECIPE = fr(`<div class="mk-img" style="--ratio:16/9"></div>
  <p class="mk-h2">Tarte fine aux poireaux et chèvre</p>
  <p class="mk-muted">35 min · Facile · 4 personnes</p>
  <p style="font-size:16px;line-height:1.5">Une pâte feuilletée, trois poireaux fondus au beurre, un crottin de chèvre et un filet de miel.</p>`);

const TABLE_CSS = `
.tb-wrap { overflow: hidden; }
.tb { border-collapse: collapse; font-size: 11px; white-space: nowrap; }
.tb th, .tb td { padding: 6px 8px; border-bottom: 1px solid #e3e6ec; text-align: start; }
.tb th { font-weight: 600; color: #5a6172; }
.oc { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 10px; }
`;

const order = (n: string, status: string, date: string, items: string, total: string) =>
  `<div class="oc"><div class="mk-row mk-between"><p class="mk-strong">Commande n° ${n}</p><span class="mk-badge">${status}</span></div><p class="mk-small mk-muted">${date} · ${items}</p><p class="mk-price">${total}</p></div>`;

const THUMB_CSS = `
.th-bar { display: flex; align-items: center; gap: 4px; padding: 0 10px 0 0; border-bottom: 1px solid #e3e6ec; }
.th-bar .mk-strong { flex: 1; }
.th-ico { width: 44px; height: 44px; display: grid; place-items: center; }
.th-map { height: 150px; display: grid; place-items: center; color: #c42b2b; background: linear-gradient(135deg, #e5eee0 0 42%, #dde6f1 42% 100%); }
.th-cta { min-height: 48px; }
`;

const BIKE_INFO = fr(`<div class="mk-pad mk-stack" style="--gap:4px">
  <p class="mk-h3">Station Bastille</p>
  <p class="mk-muted">Vélo électrique · batterie 82 % · à 120 m</p>
  <p>0,25 € la minute, déverrouillage 1 €</p>
</div>`);

const HERO_CSS = `
.ad-hero { position: relative; display: grid; place-items: center; overflow: hidden; background: linear-gradient(#c2d6ea 0 55%, #93b38d 55% 100%); color: #1d2230; }
.ad-hero::before { content: ""; position: absolute; inset: 22% 0 40% 0; background: #7c95a8; clip-path: polygon(0 100%, 18% 30%, 32% 70%, 52% 0, 70% 60%, 84% 25%, 100% 100%); }
.ad-hero .mk-ico { position: relative; }
.ad-wide { aspect-ratio: 21 / 9; }
.ad-tall { aspect-ratio: 1 / 1; }
`;

const HOTEL_CSS = `
.ht-bar { display: flex; align-items: center; gap: 4px; padding-inline-end: 12px; border-bottom: 1px solid #e3e6ec; }
.ht-ico { width: 44px; height: 44px; display: grid; place-items: center; }
.ht-links { font-size: 11px; }
.ht-links a { text-decoration: none; }
.ht-hover { display: flex; align-items: center; gap: 6px; }
.ht-table { overflow: hidden; }
.ht-table table { border-collapse: collapse; font-size: 12px; white-space: nowrap; }
.ht-table th, .ht-table td { padding: 5px 10px 5px 0; border-bottom: 1px solid #e3e6ec; text-align: start; }
.ht-table th { color: #5a6172; font-weight: 600; }
.ht-foot { padding: 10px 12px 12px; border-top: 1px solid #e3e6ec; }
`;

const CODE_CSS = `
.cd { display: flex; flex-direction: column; gap: 6px; padding: 12px; background: #f6f8fa; font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; font-size: 12.5px; line-height: 1.5; color: #1d2230; }
.cd-b { white-space: pre-wrap; overflow-wrap: anywhere; padding: 6px 8px; border-radius: 6px; background: #fff; border: 1px solid #e3e6ec; }
`;

const block = (id: string, lines: string[]) => `<div class="cd-b" data-hotspot="${id}">${lines.map(esc).join('\n')}</div>`;

const responsive: ModuleContent = {
  id: 'responsive',
  title: 'Responsive et adaptation',
  category: 'corriger',
  summary:
    'Repenser une interface pour chaque contexte (écran, mode de saisie, connexion, usage) au lieu de la mettre à l’échelle : mobile d’abord, points de rupture dictés par le contenu, cibles tactiles, zones sûres et images adaptées.',
  minutes: 11,
  commands: ['adapt'],
  sources: ['imp:adapt', 'imp:audit', 'imp:harden', 'imp:operate', 'wcag:target', WCAG_REFLOW, MDN_POINTER, MDN_ANY_POINTER, MDN_IMAGES, HOOBER],
  sections: [
    {
      id: 'repenser',
      title: 'Adapter, c’est repenser',
      body: `Le piège de l’adaptation, c’est de la traiter comme une **mise à l’échelle**. Réduire une page d’ordinateur à la largeur d’un téléphone donne des colonnes écrasées, du texte minuscule et des liens impossibles à toucher. Adapter, c’est **repenser l’expérience** pour le nouveau contexte.

Avant de toucher au CSS, réponds à trois questions :

1. **D’où vient le design ?** Pour quel écran a-t-il été pensé, et avec quelles hypothèses : grand écran, souris, connexion rapide ?
2. **Où va-t-il ?** Appareil, mode de saisie (doigt, souris, clavier, voix), taille et orientation, connexion, usage (un coup d’œil dans le métro ou une session concentrée au bureau), attentes propres à la plateforme.
3. **Qu’est-ce qui casse ?** Ce qui ne tient pas (contenu, navigation), ce qui ne marche pas (survol au doigt, petites cibles), ce qui détonne (un motif d’ordinateur sur mobile, ou l’inverse).

Deux garde-fous : **ne cache jamais une fonction essentielle** sur mobile (si elle compte, elle doit marcher, quitte à changer de forme), et garde **la même architecture d’information** d’un contexte à l’autre, pour qu’on se retrouve partout.`,
      examples: [
        {
          title: 'Une page produit repensée, pas réduite',
          bad: {
            alt: 'Téléphone affichant la page d’ordinateur d’une boutique réduite : menu de sept liens minuscules, deux colonnes, texte et bouton « Ajouter au panier » de quelques pixels.',
            frame: 'phone',
            html: fr(`<div class="pp-nav"><b>Atelier Nomade</b><span>Femme</span><span>Homme</span><span>Sacs</span><span>Nouveautés</span><span>Soldes</span><span>Mon compte</span><span>Panier (2)</span></div>
<div class="pp-cols">
  <div class="mk-img" style="--ratio:3/4"></div>
  <div>
    <p class="pp-t">Sac cabas en toile cirée</p>
    <p class="pp-p">89,00 €</p>
    <p class="pp-d">Toile de coton enduite, anses en cuir végétal, poche intérieure zippée. Fabriqué à Lyon.</p>
    <div class="pp-sizes"><span>S</span><span>M</span><span>L</span></div>
    <span class="pp-btn">Ajouter au panier</span>
  </div>
</div>`),
            css: PRODUCT_DESK_CSS,
          },
          badNote: 'La page d’ordinateur rétrécie : texte de 8 à 11 px, cibles de quelques pixels.',
          good: {
            alt: 'Téléphone affichant la même page repensée : barre avec menu et panier, grande photo, titre lisible, tailles en boutons de 44 pixels et bouton « Ajouter au panier » pleine largeur.',
            frame: 'phone',
            html: fr(`<div class="pm-bar"><span class="pm-ico"><i data-icon="menu"></i></span><b>Atelier Nomade</b><span class="pm-ico"><i data-icon="shopping-bag"></i></span></div>
<div class="mk-img" style="--ratio:4/3;border-radius:0"></div>
<div class="mk-pad mk-stack" style="--gap:10px">
  <div><p class="mk-h2">Sac cabas en toile cirée</p><p class="mk-price" style="font-size:17px">89,00 €</p></div>
  <div class="mk-row" style="--gap:8px"><span class="pm-size">S</span><span class="pm-size on">M</span><span class="pm-size">L</span></div>
  <span class="mk-btn mk-btn--block pm-cta">Ajouter au panier</span>
  <p class="mk-muted">Toile de coton enduite, anses en cuir végétal. Fabriqué à Lyon.</p>
</div>`),
            css: PRODUCT_MOBILE_CSS,
          },
          goodNote: 'Une colonne, l’essentiel d’abord, des cibles faites pour le doigt.',
        },
      ],
    },
    {
      id: 'strategies',
      title: 'Une stratégie par contexte',
      body: `Chaque contexte appelle sa propre stratégie, au-delà de la largeur :

- **Mobile** : une colonne, des blocs empilés et pleine largeur ; navigation au bas de l’écran ou dans un menu ; cibles d’au moins 44 × 44 px ; feuilles qui montent du bas plutôt que des listes déroulantes ; divulgation progressive (onglets, accordéons) ; textes plus concis ; corps de texte de 16 px au moins.
- **Tablette** : deux colonnes, vue maître-détail (la liste et le détail côte à côte), panneaux latéraux ; le tactile **et** le pointeur ; une mise en page qui change avec l’orientation.
- **Ordinateur** : plusieurs colonnes, navigation latérale toujours visible, survol pour l’information secondaire, raccourcis clavier, menus contextuels, glisser-déposer ; une **largeur maximale**, pour ne pas s’étirer sur un écran 4K.
- **Impression** : sans navigation ni éléments interactifs, sauts de page aux endroits logiques, URL complètes affichées, numéros de page et date d’impression.
- **E-mail** : 600 px de large au plus, une seule colonne, CSS en ligne et tableaux de mise en page (pour la compatibilité des logiciels de messagerie), gros boutons plutôt que liens, pas de survol, et des liens vers l’application pour les tâches complexes.

Ne suppose pas qu’un ordinateur est puissant (il peut être ancien ou modeste), ni qu’il n’a pas d’écran tactile : beaucoup en ont un.`,
    },
    {
      id: 'mobile-first',
      title: 'Mobile d’abord, ruptures dictées par le contenu',
      body: `**Mobile d’abord** : écris les styles de base pour le petit écran, puis ajoute la complexité avec des requêtes \`min-width\`. L’inverse (\`max-width\`, « ordinateur d’abord ») impose au mobile une mise en page large qu’il doit ensuite défaire.

**Les points de rupture viennent du contenu**, pas d’une liste d’appareils. Pars de l’étroit, élargis la fenêtre jusqu’à ce que la mise en page casse (lignes trop longues, colonnes trop maigres, vide inutile) et place un point de rupture à cet endroit. Trois suffisent souvent ; impeccable cite 640, 768 et 1024 px comme repères, pas comme une loi.

- \`clamp()\` règle les valeurs fluides (marges, tailles d’affichage) sans multiplier les points de rupture.
- Les **requêtes de conteneur** (\`@container\`) adaptent un composant à la place dont il dispose, pas à la largeur de la fenêtre : la même carte vit dans une colonne étroite ou dans une grille large.
- Dans une interface produit, le responsive est **structurel** : on replie une barre latérale, on transforme un tableau, on change le nombre de colonnes. Une typographie fluide ne remplace pas ces décisions.
- Un seul code pour tous les écrans : pas de site mobile séparé, pas de détection d’appareil par le *user agent*.`,
    },
    {
      id: 'saisie',
      title: 'La saisie compte plus que la taille d’écran',
      body: `**La taille d’écran ne dit pas le mode de saisie** : un ordinateur portable peut être tactile, une tablette peut avoir un clavier et une souris. Interroge directement les capacités :

- \`@media (pointer: coarse)\` (doigt sur un écran tactile) : agrandis les cibles ; \`(pointer: fine)\` (souris, pavé tactile, stylet) : tu peux densifier.
- \`@media (hover: hover)\` : le survol existe, il peut enrichir (aperçu, légère élévation) ; \`(hover: none)\` : tout ce qui passait par le survol doit être visible ou accessible au toucher.

Ces deux requêtes ne décrivent que le mode de saisie **principal**. Sur un portable tactile, c’est le pavé tactile : \`(pointer: fine)\` et \`(hover: hover)\` sont vrais, même quand la personne touche l’écran. Pour savoir si un écran tactile est aussi présent, teste \`(any-pointer: coarse)\` avant de densifier ; \`any-hover\` fait de même pour le survol.

**Rien d’essentiel ne dépend du survol** : au doigt, il n’existe pas. Remplace-le par un **retour au toucher** : un état \`:active\` visible (léger assombrissement, enfoncement) confirme que le doigt a atteint la bonne cible.

**Des cibles faites pour le doigt** : au moins **44 × 44 px** (la recommandation d’impeccable, d’Apple, et du critère WCAG 2.5.5 de niveau AAA), avec de l’espace entre deux cibles. Le minimum du niveau AA (critère 2.5.8) est de 24 × 24 px, ou un espacement suffisant autour d’une cible plus petite : c’est un plancher, pas un objectif. L’icône peut rester petite ; c’est la zone touchable qui compte.

**La zone du pouce** : à une main, le bas de l’écran s’atteint mieux que le haut. Dans l’étude de Steven Hoober (1 333 observations, 2013), parmi les personnes qui touchaient leur écran, 49 % tenaient et touchaient le téléphone d’une seule main, 36 % le tenaient à deux mains mais ne touchaient l’écran que d’une (le plus souvent avec le pouce), et 15 % tapaient des deux pouces. Les prises changent très souvent, parfois en quelques secondes. Place les actions fréquentes à portée de pouce, sans oublier les autres prises.`,
      examples: [
        {
          title: 'Des cibles à la taille du doigt',
          bad: {
            alt: 'Barre d’outils d’un e-mail avec trois icônes de 24 pixels collées les unes aux autres ; un disque en pointillés de la taille d’un doigt en recouvre deux à la fois.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="tg-bar"><span class="tg-pair"><span class="tg-s"><i data-icon="folder"></i></span><span class="tg-s"><i data-icon="trash"></i></span><span class="tg-finger"></span></span><span class="tg-s"><i data-icon="mail"></i></span></div>
  <div><p class="mk-h3">Votre billet pour Lyon</p><p class="mk-small mk-muted">Rail Express · aujourd’hui, 08:12</p></div>
</div>`),
            css: TARGETS_CSS,
          },
          badNote: 'Des zones de 24 px sans espace : le doigt en couvre deux à la fois.',
          good: {
            alt: 'Même barre avec des boutons de 44 pixels espacés de 8 pixels ; le disque de la taille d’un doigt tient dans un seul bouton.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="tg-bar" style="gap:8px"><span class="tg-l"><i data-icon="folder"></i></span><span class="tg-l"><i data-icon="trash"></i><span class="tg-finger"></span></span><span class="tg-l"><i data-icon="mail"></i></span></div>
  <div><p class="mk-h3">Votre billet pour Lyon</p><p class="mk-small mk-muted">Rail Express · aujourd’hui, 08:12</p></div>
</div>`),
            css: TARGETS_CSS,
          },
          goodNote: 'Des zones de 44 px espacées : chaque toucher atteint la bonne action.',
        },
      ],
    },
    {
      id: 'zones-sures',
      title: 'Encoches, barre d’accueil et clavier',
      body: `Les téléphones récents ont des encoches, un îlot pour la caméra, des coins arrondis et une barre d’accueil. Sur le web, la page peut s’étendre sous ces zones si tu le demandes ; elle doit alors en écarter son contenu :

- Ajoute \`viewport-fit=cover\` à la balise meta viewport : la page occupe tout l’écran, y compris sous l’encoche.
- Écarte le contenu interactif avec \`env(safe-area-inset-top)\`, \`-right\`, \`-bottom\` et \`-left\`. Pour une barre fixée au bas de l’écran : \`padding-bottom: max(1rem, env(safe-area-inset-bottom))\`, qui garde 1rem sur les appareils sans barre d’accueil.
- Pense au **paysage** : l’encoche passe sur le côté, les marges latérales deviennent critiques.
- Garde au moins **16 px** dans les champs de formulaire : en dessous, Safari sur iPhone zoome de force au moment de la saisie, ce qui casse la mise en page.`,
      examples: [
        {
          title: 'Laisser de la place à l’îlot et à la barre d’accueil',
          bad: {
            alt: 'Téléphone sans marges sûres : le titre « Mon panier · 3 articles » passe sous l’îlot de la caméra et la barre d’accueil chevauche le bouton « Commander ».',
            html: fr(`<div class="sa-phone"><span class="sa-island"></span>
  <div class="sa-head">Mon panier · 3 articles</div>
  ${CART_ROWS}
  <div style="height:56px"></div>
  <div class="sa-foot"><span class="mk-btn mk-btn--block">Commander · 64,80 €</span></div>
  <span class="sa-home"></span>
</div>`),
            css: SAFE_CSS,
          },
          badNote: 'Le titre sous l’îlot, le bouton sous la barre d’accueil.',
          good: {
            alt: 'Même téléphone avec des marges sûres : le titre est sous l’îlot de la caméra, le bouton « Commander » au-dessus de la barre d’accueil.',
            html: fr(`<div class="sa-phone"><span class="sa-island"></span>
  <div class="sa-head sa-head--safe">Mon panier · 3 articles</div>
  ${CART_ROWS}
  <div style="height:20px"></div>
  <div class="sa-foot sa-foot--safe"><span class="mk-btn mk-btn--block">Commander · 64,80 €</span></div>
  <span class="sa-home"></span>
</div>`),
            css: SAFE_CSS,
          },
          goodNote: '`env(safe-area-inset-*)` écarte le contenu des zones occupées.',
        },
      ],
    },
    {
      id: 'medias',
      title: 'Images et contenus adaptés',
      body: `**Des images à la bonne taille.** \`srcset\` liste les fichiers disponibles avec leur largeur réelle (\`400w\`, \`800w\`, \`1200w\`) ; \`sizes\` dit au navigateur quelle largeur l’image occupera (\`(max-width: 768px) 100vw, 50vw\`). Le navigateur choisit alors le fichier selon la largeur d’affichage **et** la densité de pixels de l’écran.

**Un autre cadrage, pas seulement une autre résolution** : c’est la direction artistique, avec \`<picture>\` et des éléments \`<source media>\`. Un panorama large devient, sur téléphone, un cadrage serré sur le sujet.

- **\`display: none\` n’allège rien** : le balisage caché est livré, et les \`<img>\` qu’il contient sont téléchargées quand même (sauf celles en \`loading="lazy"\`). À utiliser avec parcimonie.
- Charge en différé ce qui est **hors de l’écran**, et sers d’abord le contenu essentiel (amélioration progressive).
- **Tableaux** : sur mobile, chaque ligne devient une carte (\`display: block\` et des étiquettes tirées d’attributs \`data-label\`), ou l’on garde les colonnes clés avec le détail à la demande.
- **Divulgation progressive** : \`<details>\` et \`<summary>\` replient ce qui peut attendre.`,
    },
    {
      id: 'tester',
      title: 'Tester sur de vrais appareils',
      body: `L’émulation des outils de développement suffit pour un premier passage sur la mise en page, mais elle ne reproduit pas :

- le vrai toucher (précision, gestes, défilement) ;
- les limites réelles du processeur et de la mémoire ;
- la latence d’un vrai réseau ;
- le rendu des polices ;
- l’interface du navigateur et l’apparition du clavier.

Teste au minimum sur **un vrai iPhone et un vrai Android**, et sur une tablette si elle fait partie de la cible. Un Android d’entrée de gamme révèle des problèmes de performance qu’aucun simulateur ne montre. Passe aussi en **paysage**, sur plusieurs navigateurs (Safari, Chrome, Firefox, Edge), au clavier, sur un très petit écran (320 px) comme sur un très grand, et avec une connexion bridée.

Sur le très petit écran, vérifie que rien n’oblige à défiler horizontalement : à 320 px de large, c’est le critère WCAG 1.4.10 (redistribution, niveau AA), hors contenus qui exigent deux dimensions, comme un plan ou un schéma. Agrandis aussi le texte à **200 %** (critère 1.4.4, niveau AA) : rien ne doit être coupé ni se chevaucher. Le coupable habituel : une largeur ou une hauteur fixe sur un conteneur de texte.

Pour un **contrôle sur mesure** (curseur, surface à glisser), vérifie au doigt que le glissement va jusqu’au bout, et qu’un balayage qui traverse le contrôle fait défiler la page sans l’activer. Une capture d’écran vérifie une mise en page, jamais un geste : dis ce qui a produit la preuve, et ce qui n’a pas été testé.`,
    },
  ],
  rules: [
    { id: 'adapt', front: 'Adapter une interface au mobile, est-ce la réduire ?', back: 'Non : c’est repenser l’expérience pour le contexte (écran, saisie, connexion, usage), pas mettre les pixels à l’échelle.' },
    { id: 'mobile-first', front: 'Comment écrire un CSS « mobile d’abord » ?', back: 'Des styles de base pour le petit écran, puis des requêtes `min-width` qui ajoutent la complexité.' },
    { id: 'breakpoints', front: 'Où placer un point de rupture ?', back: 'Là où le contenu casse : élargis depuis l’étroit jusqu’à la rupture. Trois points suffisent souvent.' },
    { id: 'input', front: 'Comment savoir si un écran tactile est disponible ?', back: 'Avec `@media (any-pointer: coarse)`. `pointer` et `hover` ne décrivent que le mode de saisie principal (le pavé tactile d’un portable tactile), et la largeur ne dit rien.' },
    { id: 'hover', front: 'Une fonction peut-elle dépendre du survol ?', back: 'Non : au doigt, le survol n’existe pas. Il peut enrichir, jamais conditionner.' },
    { id: 'targets', front: 'Taille minimale d’une cible tactile ?', back: '44 × 44 px, avec de l’espace entre les cibles. Le minimum WCAG AA (24 × 24 px) est un plancher, pas un objectif.' },
    { id: 'thumb', front: 'Où placer les actions fréquentes sur téléphone ?', back: 'À portée de pouce, dans la partie basse de l’écran : à une main, le haut est le plus difficile à atteindre.' },
    { id: 'safe', front: 'Comment éviter l’encoche et la barre d’accueil ?', back: '`viewport-fit=cover`, puis des marges `env(safe-area-inset-*)`, par exemple `max(1rem, env(safe-area-inset-bottom))`.' },
    { id: 'input-size', front: 'Taille minimale du texte d’un champ sur mobile ?', back: '16 px : en dessous, Safari sur iPhone zoome de force au moment de la saisie.' },
    { id: 'srcset', front: '`srcset` et `sizes`, ou `<picture>` ?', back: '`srcset` et `sizes` pour la même image en plusieurs résolutions ; `<picture>` pour changer de cadrage.' },
    { id: 'display-none', front: '`display: none` allège-t-il la page mobile ?', back: 'Non : le contenu caché est livré et ses `<img>` sont téléchargées (sauf en `loading="lazy"`).' },
    { id: 'tables', front: 'Que faire d’un tableau large sur mobile ?', back: 'Chaque ligne devient une carte (`display: block` et `data-label`), ou l’on garde les colonnes clés avec le détail à la demande.' },
    { id: 'hide', front: 'Peut-on retirer une fonction sur mobile pour gagner de la place ?', back: 'Pas une fonction essentielle : elle change de forme (feuille, menu, accordéon), mais elle reste.' },
    { id: 'devices', front: 'L’émulation des outils de développement suffit-elle ?', back: 'Non : teste sur un vrai iPhone et un vrai Android, dont un modèle d’entrée de gamme, en portrait et en paysage.' },
  ],
  exercises: [
    {
      id: 'responsive-nav-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur téléphone, quelle navigation est la mieux adaptée à ce site de recettes ?',
      options: [
        {
          id: 'squeezed',
          visual: {
            alt: 'Téléphone : sous le logo « Saveurs », huit liens de navigation en petits caractères répartis sur plusieurs lignes, puis une recette.',
            frame: 'phone',
            html: fr(`<div class="nv-top"><p class="nv-logo">Saveurs</p><div class="nv-links"><span>Recettes</span><span>Entrées</span><span>Plats</span><span>Desserts</span><span>Végétarien</span><span>Vidéos</span><span>Boutique</span><span>Connexion</span></div></div>
<div class="mk-pad mk-stack" style="--gap:8px">${RECIPE}</div>`),
            css: NAV_CSS,
          },
          why: 'Les huit liens de l’ordinateur, réduits et empilés : de petites cibles serrées qui mangent le haut de l’écran.',
        },
        {
          id: 'rethought',
          visual: {
            alt: 'Téléphone : barre compacte avec le logo « Saveurs », un bouton de recherche et un bouton de menu, puis la même recette.',
            frame: 'phone',
            html: fr(`<div class="nv-bar"><p class="nv-logo">Saveurs</p><span class="mk-grow"></span><span class="nv-btn"><i data-icon="search"></i></span><span class="nv-btn"><i data-icon="menu"></i></span></div>
<div class="mk-pad mk-stack" style="--gap:8px">${RECIPE}</div>`),
            css: NAV_CSS,
          },
          why: 'Une barre compacte : recherche et menu en cibles de 44 px, et le contenu reprend la place.',
        },
      ],
      answer: 'rethought',
      explanation: `Réduire la navigation de l’ordinateur à la largeur d’un téléphone, c’est traiter l’adaptation comme une **mise à l’échelle** : les liens deviennent de petites cibles serrées, difficiles à viser, et repoussent le contenu.

La version recommandée **repense** la navigation : les rubriques passent dans un menu (ou, pour trois à cinq sections clés, dans une barre au bas de l’écran) et la recherche reste visible. Les rubriques restent les mêmes : seule leur forme change, pour qu’on retrouve la même architecture partout.`,
      takeaway: 'Sur mobile, repense la navigation (menu, barre au bas de l’écran) au lieu de réduire celle de l’ordinateur.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-hover-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle correction adopter ?',
      context: 'Sur une grille de produits, les boutons « Ajouter au panier » et « Favori » n’apparaissent qu’au survol de la carte. Des clients sur tablette et sur ordinateur portable tactile ne les trouvent pas.',
      options: [
        {
          id: 'capability',
          label: 'Afficher les boutons en permanence quand `@media (hover: none), (any-pointer: coarse)`',
          why: '`hover: none` couvre les tablettes, dont la saisie principale est le doigt ; `any-pointer: coarse` repère l’écran tactile du portable, dont la saisie principale reste le pavé tactile. Ailleurs, l’apparition au survol reste un confort.',
        },
        { id: 'ua', label: 'Détecter les téléphones avec le *user agent* et n’afficher les boutons que pour eux', why: 'Même sans erreur de détection, seuls les téléphones auraient les boutons : les tablettes et les portables tactiles du scénario restent sans.' },
        { id: 'width', label: 'Afficher les boutons en permanence sous 768 px de largeur', why: 'La largeur ne dit rien du mode de saisie : au-dessus de 768 px, un portable tactile ou une tablette en paysage, touchés au doigt, cachent toujours les boutons.' },
        { id: 'hint', label: 'Ajouter le texte « Survolez une carte pour voir les actions »', why: 'Au doigt, le survol n’existe pas : la consigne est impossible à suivre.' },
      ],
      answer: 'capability',
      explanation: `**La taille d’écran ne dit pas le mode de saisie.** Une tablette peut avoir une souris, un ordinateur portable peut être tactile. Les caractéristiques média interrogent la capacité de l’appareil, mais \`hover\` et \`pointer\` ne décrivent que son mode de saisie **principal**. Sur un portable tactile, c’est le pavé tactile, qui sait survoler : \`(any-pointer: coarse)\` révèle que l’écran tactile est aussi là.

Règle de fond : **rien d’essentiel ne dépend du survol**. Le survol peut enrichir (aperçu, légère élévation) là où il existe ; une action comme « Ajouter au panier » doit rester visible ou atteignable au toucher partout.`,
      takeaway: 'Détecte la saisie (`hover`, `any-pointer`), pas la taille d’écran ; aucune action essentielle ne dépend du survol.',
      sources: ['imp:adapt', MDN_HOVER, MDN_ANY_POINTER],
    },
    {
      id: 'responsive-target-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la taille de la zone touchable de ces boutons d’icône pour un usage au doigt.',
      visual: {
        alt: 'Téléphone affichant un e-mail ; au sommet, quatre boutons d’icône (archiver, supprimer, marquer non lu, plus) dont la zone touchable, en pointillés, varie avec le curseur.',
        frame: 'phone',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:14px">
  <div class="sl-bar"><span class="sl-b"><i data-icon="folder"></i></span><span class="sl-b"><i data-icon="trash"></i></span><span class="sl-b"><i data-icon="mail"></i></span><span class="sl-b"><i data-icon="ellipsis"></i></span></div>
  <div><p class="mk-h3">Votre billet pour Lyon</p><p class="mk-small mk-muted">Rail Express · aujourd’hui, 08:12</p></div>
  <div class="mk-stack" style="--gap:8px"><div class="mk-line"></div><div class="mk-line"></div><div class="mk-line mk-line--m"></div></div>
</div>`),
        css: `.sl-bar { display: flex; align-items: center; justify-content: flex-end; gap: 4px; min-height: 64px; }
.sl-b { width: var(--v, 24px); height: var(--v, 24px); display: grid; place-items: center; flex: none; border-radius: 10px; outline: 1.5px dashed #8b93a5; outline-offset: -1px; }
.sl-b .mk-ico { width: 18px; height: 18px; }`,
      },
      control: 'Zone touchable',
      min: 16,
      max: 64,
      step: 2,
      initial: 24,
      unit: 'px',
      target: [44, 56],
      ideal: 44,
      explanation: `Une cible tactile d’au moins **44 × 44 px** se touche sans viser : c’est la recommandation d’impeccable, d’Apple (44 × 44 pt) et du critère WCAG 2.5.5 (niveau AAA). Android recommande 48 × 48 dp.

La valeur de départ, 24 px, est le **plancher** du niveau AA (critère 2.5.8), pas un objectif. L’icône peut rester à 18 px : c’est la zone touchable qui grandit. Au-delà de 56 px, une barre d’outils prend une place disproportionnée.`,
      takeaway: 'Zone touchable de 44 × 44 px au moins, même autour d’une petite icône ; 24 px n’est qu’un plancher.',
      sources: ['imp:adapt', 'wcag:target', WCAG_TARGET_AAA],
    },
    {
      id: 'responsive-safe-area-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle règle appliquer à la barre ?',
      context: 'Une barre « Commander » est fixée au bas d’une page web. Sur iPhone, elle passe sous la barre d’accueil. La balise meta viewport contient déjà `viewport-fit=cover`.',
      options: [
        { id: 'max', label: '`padding-bottom: max(1rem, env(safe-area-inset-bottom))`', why: 'La marge suit la zone sûre de l’appareil, avec 1rem au minimum sur ceux qui n’ont pas de barre d’accueil.' },
        { id: 'fixed', label: '`padding-bottom: 34px`', why: 'Une valeur copiée d’un modèle : trop sur les appareils sans barre d’accueil, et rien ne garantit qu’elle convienne aux autres ni au paysage.' },
        { id: 'env', label: '`padding-bottom: env(safe-area-inset-bottom)`', why: 'Correct sur iPhone, mais la valeur vaut 0 ailleurs : le bouton colle alors au bord de l’écran.' },
        { id: 'none', label: 'Rien : avec `bottom: 0`, le navigateur s’en charge', why: 'Avec `viewport-fit=cover`, c’est justement à la page d’écarter son contenu des zones occupées.' },
      ],
      answer: 'max',
      explanation: `\`viewport-fit=cover\` étend la page sous l’encoche et la barre d’accueil ; en échange, c’est à elle d’en écarter ses contrôles. Les variables \`env(safe-area-inset-*)\` donnent la taille exacte de ces zones, appareil par appareil et selon l’orientation.

Envelopper la valeur dans \`max(1rem, …)\` garde une marge minimale sur les appareils où l’encart vaut 0. C’est la forme recommandée pour toute barre fixée au bas de l’écran.`,
      takeaway: 'Barre fixée au bas de l’écran : `padding-bottom: max(1rem, env(safe-area-inset-bottom))`, avec `viewport-fit=cover`.',
      sources: ['imp:adapt', MDN_ENV],
    },
    {
      id: 'responsive-mobile-first-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel CSS suit l’approche « mobile d’abord » pour cette grille d’articles ?',
      options: [
        {
          id: 'min',
          label: '`.grille { display: grid; gap: 1rem; }` puis `@media (min-width: 48rem) { .grille { grid-template-columns: 1fr 1fr; } }`',
          why: 'Une colonne par défaut, et une requête `min-width` qui ajoute la deuxième colonne quand la place le permet.',
        },
        {
          id: 'max',
          label: '`.grille { display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr); }` puis `@media (max-width: 767px) { .grille { grid-template-columns: 1fr; } }`',
          why: '« Ordinateur d’abord » : le mobile hérite de la mise en page large, puis doit la défaire.',
        },
        {
          id: 'devices',
          label: 'Une requête par modèle : `@media (min-width: 375px) and (max-width: 414px) { … }` pour certains iPhone, une autre pour les Galaxy…',
          why: 'Courir après les appareils : la liste est sans fin, et le contenu ne casse pas forcément à ces largeurs.',
        },
        {
          id: 'ua',
          label: 'Lire `navigator.userAgent` et charger une feuille de style « mobile » séparée',
          why: 'La détection d’appareil se trompe souvent et oblige à maintenir deux versions du site.',
        },
      ],
      answer: 'min',
      explanation: `**Mobile d’abord** : les styles de base servent le petit écran, et chaque requête \`min-width\` ajoute de la complexité quand la place le permet. Le mobile n’applique que les styles de base, sans rien avoir à défaire.

Le point de rupture (ici 48rem) se choisit **là où le contenu casse** : élargis la fenêtre depuis l’étroit et observe quand une colonne unique devient trop large. Les largeurs d’appareils populaires ne sont pas des points de rupture.`,
      takeaway: 'Styles de base pour le mobile, puis des requêtes `min-width` placées là où le contenu casse.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-table-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel affichage de cet historique de commandes convient le mieux à un téléphone ?',
      options: [
        {
          id: 'table',
          visual: {
            alt: 'Téléphone : tableau de commandes à cinq colonnes (commande, date, articles, total, statut) en petits caractères ; la dernière colonne est coupée par le bord de l’écran.',
            frame: 'phone',
            html: fr(`<div class="mk-pad-s mk-stack" style="--gap:8px"><p class="mk-h3" style="padding:4px 2px">Mes commandes</p>
<div class="tb-wrap"><table class="tb"><thead><tr><th>Commande</th><th>Date</th><th>Articles</th><th>Total</th><th>Statut</th></tr></thead><tbody>
<tr><td>48213</td><td>12/10/2026</td><td>3</td><td>84,90 €</td><td>Expédiée</td></tr>
<tr><td>47950</td><td>28/09/2026</td><td>1</td><td>19,00 €</td><td>Livrée</td></tr>
<tr><td>47102</td><td>03/09/2026</td><td>5</td><td>142,30 €</td><td>Remboursée</td></tr>
</tbody></table></div></div>`),
            css: TABLE_CSS,
          },
          why: 'Le tableau d’ordinateur garde ses cinq colonnes : le texte rapetisse et le statut, l’information clé, est coupé.',
        },
        {
          id: 'cards',
          visual: {
            alt: 'Téléphone : chaque commande est une carte avec son numéro, un badge de statut, la date, le nombre d’articles et le total.',
            frame: 'phone',
            html: fr(`<div class="mk-pad-s mk-stack" style="--gap:8px"><p class="mk-h3" style="padding:4px 2px">Mes commandes</p>
${order('48213', 'Expédiée', '12 octobre 2026', '3 articles', '84,90 €')}
${order('47950', 'Livrée', '28 septembre 2026', '1 article', '19,00 €')}
${order('47102', 'Remboursée', '3 septembre 2026', '5 articles', '142,30 €')}
</div>`),
            css: TABLE_CSS,
          },
          why: 'Chaque ligne devient une carte lisible : le statut est visible d’un coup d’œil et rien n’est coupé.',
        },
      ],
      answer: 'cards',
      explanation: `Un tableau large ne tient pas dans 320 px sans sacrifier quelque chose : la taille du texte, des colonnes, ou un défilement horizontal que personne ne découvre.

Impeccable recommande de **transformer chaque ligne en carte** sur mobile : en CSS, \`display: block\` sur les lignes et les cellules, et des étiquettes tirées d’attributs \`data-label\`. L’autre voie consiste à garder les colonnes clés (numéro, statut, total) et à montrer le détail à la demande.`,
      takeaway: 'Sur mobile, un tableau large devient une liste de cartes, ou ne garde que ses colonnes clés.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-srcset-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quel balisage choisir pour cette image ?',
      context: 'Une photo d’en-tête occupe toute la largeur sur mobile, et la moitié de la page au-delà de 768 px. Tu disposes de trois fichiers : 400, 800 et 1200 px de large, avec le même cadrage.',
      options: [
        {
          id: 'sizes',
          label: '`<img src="vercors-800.jpg" srcset="vercors-400.jpg 400w, vercors-800.jpg 800w, vercors-1200.jpg 1200w" sizes="(max-width: 768px) 100vw, 50vw" alt="…">`',
          why: '`srcset` décrit les fichiers, `sizes` la largeur d’affichage : le navigateur choisit le plus petit fichier suffisant pour l’écran et sa densité.',
        },
        {
          id: 'nosizes',
          label: 'Le même `srcset`, sans l’attribut `sizes`',
          why: 'Sans `sizes`, le navigateur suppose que l’image occupe toute la fenêtre (`100vw`) : sur ordinateur, il vise une image deux fois plus large qu’affichée et télécharge un fichier trop lourd (1200 px au lieu de 800 sur un écran standard de 1 366 px).',
        },
        {
          id: 'single',
          label: '`<img src="vercors-1200.jpg" style="width: 100%" alt="…">` pour tous les écrans',
          why: 'Les écrans qui n’ont besoin que de 400 ou 800 px téléchargent quand même le fichier le plus lourd.',
        },
        {
          id: 'picture',
          label: 'Un `<picture>` avec trois `<source media="…">`, un par largeur d’écran',
          why: '`<picture>` sert à changer de cadrage. Pour une simple question de résolution, des sources choisies par `media` empêchent le navigateur de tenir compte de la densité de l’écran.',
        },
      ],
      answer: 'sizes',
      explanation: `Pour la **même image en plusieurs résolutions**, \`srcset\` liste les fichiers avec leur largeur réelle (descripteurs \`w\`) et \`sizes\` annonce la largeur qu’occupera l’image selon la fenêtre. Le navigateur combine les deux avec la densité de pixels de l’écran pour télécharger le plus petit fichier suffisant.

\`<picture>\` et ses \`<source media>\` répondent à un autre besoin : la **direction artistique**, quand le cadrage doit changer (un panorama sur ordinateur, un plan serré sur téléphone).`,
      takeaway: 'Même image, plusieurs résolutions : `srcset` et `sizes`. Autre cadrage selon l’écran : `<picture>`.',
      sources: ['imp:adapt', 'imp:optimize', MDN_IMAGES],
    },
    {
      id: 'responsive-display-none-tf',
      type: 'truefalse',
      difficulty: 3,
      prompt: 'Masquer un carrousel de photos avec `display: none` sous 768 px évite au téléphone de télécharger ses images.',
      answer: false,
      explanation: `\`display: none\` **masque** l’élément, mais le balisage est livré quand même, et les navigateurs téléchargent les images \`<img>\` qu’il contient. Seules les images en \`loading="lazy"\` attendent d’être affichées.

Si le carrousel n’a pas sa place sur mobile, ne l’envoie pas (amélioration progressive : le contenu essentiel d’abord, les enrichissements pour les grands écrans), ou charge ses images en différé. Impeccable résume : \`display: none\` avec parcimonie, car le contenu caché est quand même téléchargé.`,
      takeaway: '`display: none` cache sans alléger : le contenu masqué est livré et ses images sont téléchargées.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-hide-feature-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Pour alléger l’écran mobile d’une boutique de vêtements, on peut retirer le filtre par taille, qui prend trop de place.',
      answer: false,
      explanation: `Le filtre par taille est **essentiel** dans une boutique de vêtements : sans lui, la personne fait défiler des dizaines d’articles indisponibles dans sa taille, puis abandonne.

Impeccable est explicite : ne cache jamais une fonction essentielle sur mobile ; si elle compte, elle doit marcher. Elle change de **forme** : un bouton « Filtres (2) » qui ouvre une feuille montant du bas de l’écran, par exemple. L’architecture reste la même d’un écran à l’autre.`,
      takeaway: 'Ne retire pas une fonction essentielle sur mobile : change sa forme (feuille, menu, accordéon), pas son existence.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-hotel-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les trois éléments de cette page mobile qui n’ont pas été adaptés au téléphone.',
      visual: {
        alt: 'Téléphone : fiche d’un hôtel à Arles avec bouton retour, photo, note, une ligne de trois liens, une information sur la taxe de séjour, un tableau de tarifs et un bouton « Réserver ».',
        frame: 'phone',
        html: fr(`<div class="ht-bar"><span class="ht-ico" data-hotspot="back"><i data-icon="arrow-left"></i></span><p class="mk-strong">Hôtel des Lices</p></div>
<div class="mk-img" data-hotspot="photo" style="--ratio:16/9;border-radius:0"></div>
<div class="mk-pad mk-stack" style="--gap:10px">
  <div><p class="mk-h3">Hôtel des Lices, Arles</p><p class="mk-small mk-muted">4,6 sur 5 · 312 avis</p></div>
  <p class="ht-links" data-hotspot="links"><a href="#">Modifier les dates</a> · <a href="#">Annuler</a> · <a href="#">Partager</a></p>
  <p class="mk-small ht-hover" data-hotspot="hover"><i data-icon="info" style="--ico:14px"></i><span>Taxe de séjour : survolez l’icône pour voir le détail.</span></p>
  <div class="ht-table" data-hotspot="table"><table><thead><tr><th>Chambre</th><th>Personnes</th><th>Petit-déjeuner</th><th>Prix par nuit</th><th>Annulation</th></tr></thead><tbody><tr><td>Double</td><td>2</td><td>Inclus</td><td>128 €</td><td>Gratuite</td></tr><tr><td>Familiale</td><td>4</td><td>Inclus</td><td>196 €</td><td>Gratuite</td></tr></tbody></table></div>
</div>
<div class="ht-foot" data-hotspot="book"><span class="mk-btn mk-btn--block" style="min-height:48px">Réserver · 128 € la nuit</span></div>`),
        css: HOTEL_CSS,
      },
      hotspots: [
        { id: 'links', label: 'Liens « Modifier · Annuler · Partager »', correct: true, why: 'Trois liens de 11 px collés les uns aux autres : des cibles bien en dessous de 44 px, faciles à confondre au doigt.' },
        { id: 'hover', label: 'Détail au survol', correct: true, why: 'Au doigt, le survol n’existe pas : le détail de la taxe est inaccessible. Il faut l’afficher, ou l’ouvrir au toucher.' },
        { id: 'table', label: 'Tableau des tarifs', correct: true, why: 'Le tableau d’ordinateur est coupé par le bord de l’écran : l’information d’annulation disparaît.' },
        { id: 'back', label: 'Bouton retour', correct: false, why: 'Une cible de 44 px, à l’endroit attendu.' },
        { id: 'photo', label: 'Photo', correct: false, why: 'Pleine largeur et au bon ratio : rien à corriger.' },
        { id: 'book', label: 'Bouton « Réserver »', correct: false, why: 'Pleine largeur, 48 px de haut, à portée de pouce : bien adapté.' },
      ],
      explanation: `Trois réflexes d’ordinateur ont survécu sur cette page :

- **Des cibles trop petites** : des liens de 11 px collés les uns aux autres, quand le doigt réclame 44 × 44 px et de l’espace.
- **Une information au survol** : sur un écran tactile, elle n’existe tout simplement pas.
- **Un tableau large** qui déborde : sur mobile, il devient des cartes, ou ne garde que ses colonnes clés.

Le bouton de réservation, lui, est bien adapté : pleine largeur, assez haut, à portée de pouce.`,
      takeaway: 'Sur mobile, traque les réflexes d’ordinateur : petites cibles, survol, tableaux larges.',
      sources: ['imp:adapt', 'imp:audit'],
    },
    {
      id: 'responsive-css-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les trois règles CSS qui posent problème sur un appareil tactile.',
      visual: {
        alt: 'Extrait de feuille de style en six blocs : une grille automatique, un sous-menu au survol, des images fluides, un bouton d’icône de 28 pixels, des champs en 13 pixels et une barre fixée avec une marge de zone sûre.',
        html: `<div class="cd">
${block('grid', ['.grille {', '  display: grid;', '  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));', '}'])}
${block('hover', ['.menu li:hover > .sous-menu {', '  display: block;', '}'])}
${block('img', ['img {', '  max-width: 100%;', '  height: auto;', '}'])}
${block('icon', ['.bouton-icone {', '  width: 28px;', '  height: 28px;', '}'])}
${block('input', ['input, select {', '  font-size: 13px;', '}'])}
${block('safe', ['.barre-bas {', '  padding-bottom: max(1rem, env(safe-area-inset-bottom));', '}'])}
</div>`,
        css: CODE_CSS,
      },
      hotspots: [
        { id: 'hover', label: 'Sous-menu au survol', correct: true, why: 'Au doigt, le survol n’est qu’émulé, et chaque navigateur le fait à sa façon : le premier toucher ouvre le sous-menu ici, suit le lien là, et le menu se referme mal. Il faut une ouverture explicite (bouton, `details`) ou un menu visible.' },
        { id: 'icon', label: 'Bouton d’icône de 28 px', correct: true, why: 'Sous les 44 × 44 px recommandés : agrandis la zone touchable, quitte à garder l’icône petite.' },
        { id: 'input', label: 'Champs en 13 px', correct: true, why: 'Sous 16 px, Safari sur iPhone zoome de force au moment de la saisie et casse la mise en page.' },
        { id: 'grid', label: 'Grille auto-fit', correct: false, why: 'Une grille qui choisit seule son nombre de colonnes selon la place, sans jamais déborder grâce à `min(16rem, 100%)` : bonne pratique.' },
        { id: 'img', label: 'Images fluides', correct: false, why: 'Les images ne débordent jamais de leur conteneur : bonne pratique.' },
        { id: 'safe', label: 'Marge de zone sûre', correct: false, why: 'La barre s’écarte de la barre d’accueil, avec 1rem au minimum : bonne pratique.' },
      ],
      explanation: `Trois règles supposent une souris et un grand écran :

- **Un sous-menu ouvert au survol** : sur un écran tactile, son ouverture devient imprévisible. Rien d’essentiel ne doit dépendre du survol.
- **Une cible de 28 px** : en dessous des 44 × 44 px qui se touchent sans viser.
- **Des champs en 13 px** : sous 16 px, Safari sur iPhone zoome à la saisie.

Les trois autres blocs sont de bons réflexes : une grille intrinsèque (\`auto-fit\` et \`minmax\`, avec \`min()\` pour ne jamais déborder), des images fluides, et une marge \`env(safe-area-inset-bottom)\` avec un minimum.`,
      takeaway: 'Pas de fonction au survol, des cibles de 44 px, des champs en 16 px : les trois réflexes tactiles à vérifier dans le CSS.',
      sources: ['imp:adapt', 'imp:harden', MDN_HOVER],
    },
    {
      id: 'responsive-contexts-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque contexte à la stratégie d’adaptation qui lui convient.',
      leftTitle: 'Contexte',
      rightTitle: 'Stratégie',
      pairs: [
        { id: 'phone', left: 'Téléphone', right: 'Une colonne, navigation au bas de l’écran ou dans un menu, cibles de 44 px' },
        { id: 'tablet', left: 'Tablette', right: 'Deux colonnes, vue maître-détail, tactile et pointeur' },
        { id: 'desktop', left: 'Ordinateur', right: 'Plusieurs colonnes, navigation latérale visible, raccourcis clavier, largeur maximale' },
        { id: 'print', left: 'Impression', right: 'Sans navigation, sauts de page logiques, URL complètes affichées' },
        { id: 'email', left: 'E-mail', right: '600 px au plus, une colonne, CSS en ligne, gros boutons' },
      ],
      explanation: `Chaque contexte a ses contraintes propres, au-delà de la largeur :

- Le **téléphone** se tient souvent d’une main : une colonne, des cibles larges, la navigation à portée de pouce.
- La **tablette** a la place pour deux colonnes, et sert au doigt comme au pointeur.
- L’**ordinateur** gagne à tout montrer, mais avec une largeur maximale pour ne pas s’étirer.
- Sur **papier**, rien n’est cliquable : on retire la navigation et on écrit les adresses en clair.
- Les **logiciels de messagerie** comprennent mal le CSS moderne : 600 px, une colonne, des styles en ligne.`,
      takeaway: 'Chaque contexte a sa stratégie : téléphone, tablette, ordinateur, impression et e-mail ne se traitent pas de la même façon.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-method-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range les étapes de l’adaptation d’une interface à un nouveau contexte.',
      items: [
        { id: 'contexts', label: 'Diagnostiquer : le contexte d’origine et ses hypothèses, puis le contexte cible (appareil, saisie, connexion, usage)' },
        { id: 'breaks', label: 'Lister ce qui ne tient pas, ne marche pas ou détonne' },
        { id: 'strategy', label: 'Choisir la stratégie : mise en page, interactions, contenu, navigation' },
        { id: 'build', label: 'Implémenter, avec des points de rupture dictés par le contenu' },
        { id: 'test', label: 'Vérifier sur de vrais appareils, en portrait et en paysage' },
      ],
      explanation: `La méthode d’impeccable part du **diagnostic** avant de toucher au code : d’où vient le design et quelles hypothèses il porte, où il va, et ce qui casse en chemin.

Vient ensuite la **stratégie** (mise en page, interactions, contenu, navigation), puis l’implémentation avec des points de rupture placés là où le contenu casse. La vérification se fait sur de vrais appareils : l’émulation rate le toucher, les performances et l’interface du navigateur.`,
      takeaway: 'Diagnostiquer (origine, cible, ruptures), choisir la stratégie, implémenter, puis vérifier sur de vrais appareils.',
      sources: ['imp:adapt'],
    },
    {
      id: 'responsive-thumb-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Laquelle de ces applications de location de vélos se prête le mieux à un usage d’une main ?',
      options: [
        {
          id: 'top',
          visual: {
            alt: 'Téléphone : en-tête avec un bouton retour, le titre « Vélo n° 214 » et un petit lien « Réserver » en haut à droite, puis une carte et les informations de la station.',
            frame: 'phone',
            html: fr(`<div class="th-bar"><span class="th-ico"><i data-icon="arrow-left"></i></span><p class="mk-strong">Vélo n° 214</p><span class="mk-btn mk-btn--text mk-btn--s">Réserver</span></div>
<div class="th-map"><i data-icon="map-pin" style="--ico:30px"></i></div>
${BIKE_INFO}
<div style="height:64px"></div>`),
            css: THUMB_CSS,
          },
          why: 'L’action principale est un petit lien tout en haut de l’écran, hors de portée du pouce : il faut changer de prise pour réserver.',
        },
        {
          id: 'bottom',
          visual: {
            alt: 'Téléphone : même écran, avec un grand bouton « Réserver ce vélo » pleine largeur sous les informations de la station.',
            frame: 'phone',
            html: fr(`<div class="th-bar"><span class="th-ico"><i data-icon="arrow-left"></i></span><p class="mk-strong">Vélo n° 214</p></div>
<div class="th-map"><i data-icon="map-pin" style="--ico:30px"></i></div>
${BIKE_INFO}
<div class="mk-pad" style="padding-top:4px"><span class="mk-btn mk-btn--block th-cta">Réserver ce vélo</span></div>`),
            css: THUMB_CSS,
          },
          why: 'L’action principale est grande et dans la partie basse de l’écran, à portée de pouce.',
        },
      ],
      answer: 'bottom',
      explanation: `À une main, le pouce atteint facilement la **partie basse et centrale** de l’écran ; le haut de l’écran, surtout le coin opposé à la main qui tient le téléphone, oblige à changer de prise. Dans l’étude de Steven Hoober (1 333 observations), 49 % des personnes qui touchaient leur écran le tenaient d’une seule main.

Impeccable demande donc des **commandes à portée de pouce** et des cibles généreuses (44 px au moins). L’action principale, ici « Réserver », mérite un bouton large dans la partie basse ; les commandes rares peuvent rester dans la partie haute.`,
      takeaway: 'Place l’action principale d’un écran mobile dans la partie basse, à portée de pouce, en grand.',
      sources: ['imp:adapt', HOOBER],
    },
    {
      id: 'responsive-art-direction-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sur téléphone, quelle image de couverture sert le mieux cet article ?',
      context: 'Article « Traverser le Vercors à vélo en trois jours ». Sur ordinateur, la photo est un large panorama.',
      options: [
        {
          id: 'wide',
          visual: {
            alt: 'Téléphone : photo panoramique très large, où le cycliste n’est qu’un point au milieu du paysage, au-dessus du titre de l’article.',
            frame: 'phone',
            html: fr(`<div class="ad-hero ad-wide"><i data-icon="bike" style="--ico:20px"></i></div>
<div class="mk-pad mk-stack" style="--gap:6px"><p class="mk-h3">Traverser le Vercors à vélo en trois jours</p><p class="mk-small mk-muted">Carnet de route · 8 min de lecture</p></div>`),
            css: HERO_CSS,
          },
          why: 'Le panorama réduit à 300 px de large : le sujet, le cycliste, devient un point.',
        },
        {
          id: 'crop',
          visual: {
            alt: 'Téléphone : photo carrée recadrée sur le cycliste, qui occupe une grande partie de l’image, au-dessus du titre de l’article.',
            frame: 'phone',
            html: fr(`<div class="ad-hero ad-tall"><i data-icon="bike" style="--ico:96px"></i></div>
<div class="mk-pad mk-stack" style="--gap:6px"><p class="mk-h3">Traverser le Vercors à vélo en trois jours</p><p class="mk-small mk-muted">Carnet de route · 8 min de lecture</p></div>`),
            css: HERO_CSS,
          },
          why: 'Un cadrage serré sur le sujet : l’image garde son sens à la taille du téléphone.',
        },
      ],
      answer: 'crop',
      explanation: `Réduire un panorama à la largeur d’un téléphone garde tout le cadre… et réduit le sujet à quelques pixels. C’est une question de **direction artistique**, pas de résolution : il faut un autre cadrage.

En HTML, \`<picture>\` sert exactement à cela : des \`<source media="…">\` proposent un cadrage serré pour les petits écrans et le panorama pour les grands. Pour la même image en plusieurs tailles, \`srcset\` et \`sizes\` suffisent.`,
      takeaway: 'Quand le cadrage doit changer selon l’écran, utilise `<picture>` (direction artistique), pas une simple réduction.',
      sources: ['imp:adapt', MDN_IMAGES],
    },
    {
      id: 'responsive-devtools-multi',
      type: 'multi',
      difficulty: 1,
      prompt: 'Que l’émulation mobile des outils de développement ne reproduit-elle pas fidèlement ?',
      options: [
        { id: 'touch', label: 'Le vrai toucher : précision du doigt, gestes, défilement', why: 'La souris simule des événements tactiles, pas un doigt qui couvre la cible ni l’inertie d’un défilement.' },
        { id: 'cpu', label: 'Les limites du processeur et de la mémoire d’un téléphone', why: 'Le bridage du processeur est une approximation : un vrai Android d’entrée de gamme se comporte autrement.' },
        { id: 'chrome', label: 'L’interface du navigateur et l’apparition du clavier', why: 'Les barres qui se rétractent et le clavier qui couvre un champ n’existent pas dans l’émulation.' },
        { id: 'fonts', label: 'Le rendu des polices', why: 'Chaque système dessine les caractères à sa façon ; l’émulation garde le rendu de l’ordinateur.' },
        { id: 'width', label: 'La largeur de l’écran et les points de rupture', why: 'C’est justement ce que l’émulation fait bien : un premier passage utile sur la mise en page.' },
        { id: 'dpr', label: 'La densité de pixels annoncée par l’appareil', why: 'Elle est simulée : les images choisies par `srcset` changent bien selon le modèle émulé.' },
      ],
      answers: ['touch', 'cpu', 'chrome', 'fonts'],
      explanation: `L’émulation des outils de développement est utile pour un **premier passage sur la mise en page** : largeur, points de rupture, densité de pixels.

Elle rate en revanche ce qui fait l’expérience réelle : le toucher, les performances d’un appareil modeste, la latence du réseau, le rendu des polices, l’interface du navigateur et le clavier. Teste au minimum sur un vrai iPhone et un vrai Android ; un Android d’entrée de gamme révèle des lenteurs qu’aucun simulateur ne montre.`,
      takeaway: 'L’émulation vérifie la mise en page ; le toucher, les performances, les polices et le clavier se vérifient sur de vrais appareils.',
      sources: ['imp:adapt'],
    },
  ],
};

export default responsive;
