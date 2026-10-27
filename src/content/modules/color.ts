import type { ModuleContent, SourceRef } from '../../engine/types';

/*
 * Every ratio quoted below was computed with the WCAG formula of src/engine/grade.ts
 * (relative luminance, (L1 + 0.05) / (L2 + 0.05)).
 */

const MATERIAL_DARK: SourceRef = { label: 'Material Design — Dark theme', url: 'https://m2.material.io/design/color/dark-theme.html' };
const CBA: SourceRef = { label: 'Colour Blind Awareness — Colour blindness', url: 'https://www.colourblindawareness.org/colour-blindness/' };
const MDN_OKLCH: SourceRef = { label: 'MDN — oklch()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch' };
const WCAG_141: SourceRef = {
  label: 'W3C — Comprendre le critère 1.4.1 (utilisation de la couleur)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
};
const WCAG_1411: SourceRef = {
  label: 'W3C — Comprendre le critère 1.4.11 (contraste du contenu non textuel)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
};

/* ---------- Shared mock pieces ---------- */

const INVOICES_CSS = `
.fx-kpi { border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 2px; }
.fx-kpi b { font-size: 20px; line-height: 1.1; }
.fx-kpi span { font-size: 12px; }
.fx-chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; }
`;

const CHART_GRID = `<g stroke="#e3e6ec" stroke-width="1"><line x1="8" y1="30" x2="256" y2="30"/><line x1="8" y1="60" x2="256" y2="60"/><line x1="8" y1="90" x2="256" y2="90"/><line x1="8" y1="120" x2="256" y2="120"/></g><g fill="#5a6172" font-size="10"><text x="12" y="144" text-anchor="middle">oct.</text><text x="60" y="144" text-anchor="middle">nov.</text><text x="108" y="144" text-anchor="middle">déc.</text><text x="156" y="144" text-anchor="middle">janv.</text><text x="204" y="144" text-anchor="middle">févr.</text><text x="252" y="144" text-anchor="middle">mars</text></g>`;
const ONLINE = '12,90 60,75 108,80 156,60 204,45 252,35';
const STORE = '12,50 60,55 108,52 156,60 204,64 252,70';

const SHIP_ROWS = (status: [string, string, string]) => `<ul class="mk-list">
    <li><span class="sh-ico sh-ico--1"><i data-icon="package" style="--ico:16px"></i></span><span class="mk-grow">N° 1042 · Lyon</span>${status[0]}</li>
    <li><span class="sh-ico sh-ico--2"><i data-icon="package" style="--ico:16px"></i></span><span class="mk-grow">N° 1043 · Nantes</span>${status[1]}</li>
    <li><span class="sh-ico sh-ico--3"><i data-icon="package" style="--ico:16px"></i></span><span class="mk-grow">N° 1044 · Lille</span>${status[2]}</li>
  </ul>`;

const SHIP_CSS = `
.sh-ico { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; flex: none; }
.sh-st { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.sh-chip { padding: 2px 8px; border-radius: 999px; }
`;

const DASH_BODY = `<div class="mk-row mk-between"><p class="dk-h">Serveurs</p><span class="dk-btn">Nouveau serveur</span></div>
  <div class="dk-card"><div class="mk-row mk-between"><b>api-paris-01</b><span class="dk-ok"><i data-icon="circle-check" style="--ico:14px"></i>En ligne</span></div><p class="dk-meta">Processeur 34 % · mémoire 2,1 / 4 Go</p></div>
  <div class="dk-card"><div class="mk-row mk-between"><b>db-paris-02</b><span class="dk-warn"><i data-icon="triangle-alert" style="--ico:14px"></i>Charge élevée</span></div><p class="dk-meta">Processeur 88 % · mémoire 7,4 / 8 Go</p></div>`;

const DASH_CSS = `
.dk-h { font-size: 18px; font-weight: 700; }
.dk-btn { padding: 6px 12px; border-radius: 8px; font-weight: 600; font-size: 13px; white-space: nowrap; }
.dk-card { border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 4px; }
.dk-ok, .dk-warn { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.dk-meta { font-size: 12px; }
`;

const PRODUCT = `<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="pd-img"></div>
  <div class="mk-row" style="--gap:6px"><span class="pd-badge">Nouveau</span><span class="pd-badge">Livraison offerte</span></div>
  <p class="pd-title">Bouilloire à col de cygne, 0,8 L</p>
  <div class="mk-row pd-stars" style="--gap:2px"><i data-icon="star" style="--ico:14px"></i><i data-icon="star" style="--ico:14px"></i><i data-icon="star" style="--ico:14px"></i><i data-icon="star" style="--ico:14px"></i><i data-icon="star" style="--ico:14px"></i><span class="mk-small" style="margin-inline-start:6px">4,8 · 312 avis</span></div>
  <p class="mk-price pd-price">64,90 €</p>
  <span class="mk-btn pd-buy">Ajouter au panier</span>
  <span class="mk-small pd-link">Guide d’utilisation</span>
</div>`;

const color: ModuleContent = {
  id: 'color',
  title: 'Couleur et contraste',
  category: 'enrichir',
  summary:
    'Construire une palette par rôles, vérifier les contrastes au calcul près, ne jamais coder une information par la seule couleur et composer un thème sombre au lieu de l’inverser.',
  minutes: 11,
  commands: ['colorize', 'quieter'],
  sources: ['imp:colorize', 'imp:craft-floor', 'imp:quieter', 'imp:operate', 'imp:new-work', 'imp:detector', 'wcag:contrast', 'wcag22', WCAG_141, CBA, MATERIAL_DARK, MDN_OKLCH],
  sections: [
    {
      id: 'roles',
      title: 'Des rôles, pas un nuancier',
      body: `La couleur porte trois choses : la **hiérarchie**, le **sens** et l’**atmosphère**. Avant de choisir une teinte, liste les rôles que l’interface doit tenir :

- **fond et surfaces** : le canevas, puis les surfaces surélevées (menus, panneaux, modales) ;
- **textes** principal et secondaire ;
- **action, focus et sélection** ;
- **bordures et séparateurs** ;
- **états** : succès, avertissement, erreur, information ;
- **données** : catégories ou échelles d’un graphique, quand il y en a.

Chaque couleur reçoit un rôle stable, nommé par sa fonction (\`--color-action\`, \`--color-danger\`) et non par sa valeur (\`--blue-600\`). Un changement de thème remappe alors les rôles sans toucher aux composants.

La **teinte** se choisit d’après le sens du produit et sa direction visuelle, jamais par réflexe de catégorie (« une banque, donc du bleu »). Et une couleur de marque déjà engagée se respecte : coloriser n’est pas remplacer un univers.`,
      examples: [
        {
          title: 'Un nuancier ou des rôles',
          bad: {
            alt: 'Écran de factures : titre violet, trois tuiles de chiffres en turquoise, rose et orange, des statuts colorés au hasard et un bouton d’action grisé.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h3" style="color:#7c3aed">Factures · mars</p><span class="mk-btn mk-btn--s" style="background:#e6e9ef;color:#5a6172">Nouvelle facture</span></div>
  <div class="mk-grid" style="--cols:3;--gap:8px">
    <div class="fx-kpi" style="background:#0e7490;color:#fff"><b>12</b><span>envoyées</span></div>
    <div class="fx-kpi" style="background:#be185d;color:#fff"><b>7</b><span>payées</span></div>
    <div class="fx-kpi" style="background:#c2410c;color:#fff"><b>2</b><span>en retard</span></div>
  </div>
  <ul class="mk-list">
    <li><span class="mk-grow">Atelier Brunet</span><span class="fx-chip" style="background:#ede9fe;color:#5b21b6">Payée</span></li>
    <li><span class="mk-grow">Café des Arts</span><span class="fx-chip" style="background:#dcfce7;color:#166534">En retard</span></li>
    <li><span class="mk-grow">Studio Lumen</span><span class="fx-chip" style="background:#fce7f3;color:#9d174d">Envoyée</span></li>
  </ul>
</div>`,
            css: INVOICES_CSS,
          },
          badNote: 'Cinq teintes vives sans rôle : elles décorent, « En retard » est en vert et l’action principale est grisée.',
          good: {
            alt: 'Même écran : tuiles neutres, chiffre des retards en rouge, statuts avec icône et libellé, bouton d’action bleu.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h3">Factures · mars</p><span class="mk-btn mk-btn--s">Nouvelle facture</span></div>
  <div class="mk-grid" style="--cols:3;--gap:8px">
    <div class="fx-kpi" style="background:#f4f6f9"><b>12</b><span class="mk-muted">envoyées</span></div>
    <div class="fx-kpi" style="background:#f4f6f9"><b>7</b><span class="mk-muted">payées</span></div>
    <div class="fx-kpi" style="background:#f4f6f9;color:#b3261e"><b>2</b><span>en retard</span></div>
  </div>
  <ul class="mk-list">
    <li><span class="mk-grow">Atelier Brunet</span><span class="fx-chip" style="background:#e6f4ea;color:#1a6e32"><i data-icon="circle-check" style="--ico:13px"></i>Payée</span></li>
    <li><span class="mk-grow">Café des Arts</span><span class="fx-chip" style="background:#fdecea;color:#b3261e"><i data-icon="circle-alert" style="--ico:13px"></i>En retard</span></li>
    <li><span class="mk-grow">Studio Lumen</span><span class="fx-chip" style="background:#eef1f7;color:#36405a">Envoyée</span></li>
  </ul>
</div>`,
            css: INVOICES_CSS,
          },
          goodNote: 'Des neutres pour la structure, le bleu pour l’action, le vert et le rouge pour les états, doublés d’une icône.',
        },
      ],
    },
    {
      id: 'dosage',
      title: 'Une stratégie, puis un dosage',
      body: `Avant de toucher une couleur, nomme la **stratégie** : la température émotionnelle, la couleur dominante, l’amplitude de contraste et le **dosage**. Impeccable en distingue quatre :

- **Retenue** : des neutres légèrement teintés et un seul accent. C’est le plancher des surfaces *Opérer* et *Lire* (applications, documentation).
- **Engagée** : une couleur saturée couvre 30 à 60 % de la surface.
- **Palette complète** : 3 ou 4 rôles colorés nommés.
- **Immersion** : la surface *est* la couleur.

Les surfaces *Persuader* et *Expérience* ont le droit aux stratégies audacieuses ; dans une application, l’accent sert l’action principale, la sélection et les états — pas la décoration.

**L’accent tire sa force de sa rareté.** Une couleur qui apparaît partout n’attire plus l’œil nulle part ; laisse la plus forte posséder une région ou un rôle délibéré plutôt que la saupoudrer en petites touches.

La « règle des 10 % » que cite la commande *quieter* (laisser les neutres dominer, l’accent autour de 10 %) est une **heuristique** pour calmer une interface criarde, pas une loi : *colorize* refuse explicitement les pourcentages fixes. Pour calmer une palette, *quieter* propose aussi de baisser la saturation (vers 70–85 %), de réduire le nombre de teintes et de garder le contraste fort là où il compte.`,
    },
    {
      id: 'contraste',
      title: 'Contraste : des seuils et un calcul',
      body: `Le contraste se **calcule** ; il ne s’estime pas à l’œil. Le WCAG 2.2 fixe des minimums (niveau AA) entre une couleur et son fond :

- **Texte courant : 4,5:1** — placeholders et textes d’aide compris.
- **Grand texte : 3:1** — au moins 24 px, ou 18,7 px en gras (18 pt, ou 14 pt gras).
- **Composants d’interface, icônes utiles, indicateurs de focus : 3:1** contre les couleurs voisines (critère 1.4.11).

Le niveau AAA monte à 7:1 pour le texte courant.

Quelques repères sur fond blanc : \`#767676\` est le gris neutre le plus clair qui passe (4,54:1), \`#999999\` n’atteint que 2,85:1. Le blanc sur un vert franc (\`#16a34a\`) ou un orange (\`#f59e0b\`) échoue aussi pour un texte courant : 3,3:1 et 2,2:1.

Vérifie **tous les états** — survol, focus, erreur, désactivé —, le texte posé sur une image, les superpositions et **les deux thèmes**. Le WCAG exempte les composants désactivés et le purement décoratif ; impeccable demande tout de même de contrôler les états désactivés.

Préfère des **couleurs explicites** aux empilements de transparences : avec de l’alpha, le contraste dépend de ce qu’il y a dessous.`,
    },
    {
      id: 'jamais-seule',
      title: 'La couleur ne doit jamais être le seul code',
      body: `Environ **1 homme sur 12** et **1 femme sur 200** perçoivent les couleurs de façon atypique, le plus souvent en confondant le rouge et le vert. Ajoute les écrans en plein soleil, les impressions en noir et blanc, les modes de contraste forcé : une information portée **uniquement** par la couleur est perdue pour une partie du public. C’est le critère 1.4.1 du WCAG (niveau A).

Double toujours la couleur d’un second indice :

- un **texte** (« En retard », « Payée ») ;
- une **icône** ou une **forme** (coche, croix, triangle) ;
- une **position** ou un **motif** (pointillés, hachures) ;
- dans un graphique, des **étiquettes directes** et des écarts de **luminosité** entre les séries, pas seulement de teinte.

Un champ en erreur s’accompagne d’un message qui dit quoi corriger, pas d’un simple liseré rouge. Teste avec le simulateur de daltonisme des outils de développement (Chrome et Firefox en proposent un) et en niveaux de gris.`,
      examples: [
        {
          title: 'Deux séries dans un graphique',
          bad: {
            alt: 'Graphique linéaire de ventes avec deux courbes rouge et verte de même épaisseur qui se croisent, et une légende sous le graphique.',
            html: `<div class="mk-pad mk-stack" style="--gap:8px">
  <p class="mk-h3">Ventes par canal · 6 derniers mois</p>
  <svg viewBox="0 0 320 150" style="width:100%;max-width:380px">${CHART_GRID}<polyline points="${ONLINE}" fill="none" stroke="#d93025" stroke-width="2.5"/><polyline points="${STORE}" fill="none" stroke="#1e8e3e" stroke-width="2.5"/></svg>
  <div class="mk-row mk-small" style="--gap:16px"><span class="mk-row" style="--gap:6px"><b class="lg" style="background:#d93025"></b>En ligne</span><span class="mk-row" style="--gap:6px"><b class="lg" style="background:#1e8e3e"></b>Boutique</span></div>
</div>`,
            css: `.lg { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }`,
          },
          badNote: 'Rouge contre vert, même trait, légende à part : pour qui confond le rouge et le vert, les deux courbes se ressemblent, surtout au croisement.',
          good: {
            alt: 'Même graphique : une courbe bleue continue et une courbe orange en pointillés, chacune étiquetée directement à son extrémité.',
            html: `<div class="mk-pad mk-stack" style="--gap:8px">
  <p class="mk-h3">Ventes par canal · 6 derniers mois</p>
  <svg viewBox="0 0 320 150" style="width:100%;max-width:380px">${CHART_GRID}<polyline points="${ONLINE}" fill="none" stroke="#1f4fd8" stroke-width="2.5"/><polyline points="${STORE}" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-dasharray="6 4"/><text x="262" y="39" font-size="12" font-weight="600" fill="#1f4fd8">En ligne</text><text x="262" y="74" font-size="12" font-weight="600" fill="#c2410c">Boutique</text></svg>
</div>`,
          },
          goodNote: 'Un bleu et un orange, que les daltonismes rouge-vert distinguent bien, un trait continu contre des pointillés et des étiquettes directes : la couleur n’est plus le seul indice.',
        },
      ],
    },
    {
      id: 'gris-sur-couleur',
      title: 'Sur une surface colorée, teinte au lieu de griser',
      body: `Un gris neutre est réglé pour un fond blanc. Posé sur une surface colorée, il paraît **sale et délavé**, et il perd souvent son contraste : c’est la règle *Gray text on colored background* du détecteur d’impeccable, et un point du plancher de qualité.

- Sur une surface **claire et colorée**, prends une nuance **plus foncée de la même teinte** : un brun ambré sur un encart jaune pâle, un vert profond sur un vert tendre.
- Sur une surface **foncée et colorée**, prends une teinte **très claire dérivée du fond**, ou un blanc à peine atténué.
- Ailleurs, ne teinte les neutres que si la teinte de marque crée une vraie cohésion : un gris neutre reste valable quand il sert l’univers.

La même logique vaut pour les bordures et les icônes secondaires posées sur la couleur.`,
      examples: [
        {
          title: 'Un encart d’astuce sur fond jaune pâle',
          bad: {
            alt: 'Encart jaune pâle avec un titre noir et un texte gris clair neutre.',
            html: `<div class="mk-pad"><div class="tip"><p class="tip-t">Astuce de conservation</p><p class="tip-b">Les fraises se gardent deux jours au réfrigérateur : ne les lavez et ne les équeutez qu’au moment de servir.</p></div></div>`,
            css: `.tip { background: #fef3c7; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; } .tip-t { font-weight: 700; color: #1d2230; } .tip-b { color: #9ca3af; }`,
          },
          badNote: 'Gris neutre #9ca3af sur jaune pâle : 2,3:1, et un aspect délavé.',
          good: {
            alt: 'Même encart avec un titre brun foncé et un texte brun ambré, tous deux dérivés de la teinte du fond.',
            html: `<div class="mk-pad"><div class="tip"><p class="tip-t">Astuce de conservation</p><p class="tip-b">Les fraises se gardent deux jours au réfrigérateur : ne les lavez et ne les équeutez qu’au moment de servir.</p></div></div>`,
            css: `.tip { background: #fef3c7; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; } .tip-t { font-weight: 700; color: #5c3a05; } .tip-b { color: #7a4a06; }`,
          },
          goodNote: 'Brun ambré tiré de la teinte du fond : 6,7:1 pour le texte, 9,1:1 pour le titre.',
        },
      ],
    },
    {
      id: 'sombre',
      title: 'Un thème sombre se compose',
      body: `Un thème sombre n’est pas le thème clair inversé. Il se **compose** :

- **Choisis clair ou sombre d’après la scène d’usage** — qui, où, sous quelle lumière —, pas d’après la catégorie (« outil de développeur, donc sombre »).
- **Évite le noir pur** : un gris très sombre (Material Design recommande \`#121212\`) laisse de la place pour étager les surfaces.
- **L’élévation s’éclaircit** : une ombre se voit mal sur fond sombre ; une surface surélevée (carte, menu, modale) devient un peu plus claire que le fond.
- **Désature les accents** : une couleur saturée vibre sur fond sombre ; prends une version plus claire et moins intense de la teinte.
- **Revérifie chaque contraste** : le bleu \`#1f4fd8\` fait 6,6:1 sur blanc, mais 3,2:1 sur noir.

Le détecteur relève aussi les réflexes du « sombre qui fait chic » : lueurs colorées autour des cartes (*glowing shadow accents*), nappes de dégradé radial derrière un titre (*radial halo*, *spotlight glow*), dégradés violets et cyan néon (*AI color palette*). Côté clair, le fond crème ou beige choisi par défaut joue le même rôle de réflexe (*cream palette*).`,
      examples: [
        {
          title: 'Inverser ou composer',
          bad: {
            alt: 'Liste de notes en thème sombre sur fond noir pur : cartes invisibles, métadonnées gris-bleu et lien bleu foncé peu lisibles.',
            html: `<div class="nt mk-pad mk-stack" style="--gap:10px">
  <div class="mk-row mk-between"><p class="mk-h3">Notes</p><span class="nt-link">Tout afficher</span></div>
  <div class="nt-card"><p class="mk-strong">Courses du week-end</p><p class="nt-meta">Modifiée hier · 6 éléments</p></div>
  <div class="nt-card"><p class="mk-strong">Idées cadeau pour Léa</p><p class="nt-meta">Modifiée le 2 mars</p></div>
  <span class="mk-btn" style="align-self:flex-start">Nouvelle note</span>
</div>`,
            css: `.nt { background: #000; color: #fff; } .nt-card { background: #000; border-radius: 12px; padding: 12px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.25); } .nt-meta { color: #5a6172; font-size: 12px; } .nt-link { color: #1f4fd8; font-size: 13px; }`,
          },
          badNote: 'Les couleurs du thème clair, sur noir : cartes invisibles, métadonnées à 3,4:1, lien à 3,2:1.',
          good: {
            alt: 'Même liste sur fond gris très sombre, cartes un peu plus claires, métadonnées gris clair et accent bleu pâle.',
            html: `<div class="nt mk-pad mk-stack" style="--gap:10px">
  <div class="mk-row mk-between"><p class="mk-h3">Notes</p><span class="nt-link">Tout afficher</span></div>
  <div class="nt-card"><p class="mk-strong">Courses du week-end</p><p class="nt-meta">Modifiée hier · 6 éléments</p></div>
  <div class="nt-card"><p class="mk-strong">Idées cadeau pour Léa</p><p class="nt-meta">Modifiée le 2 mars</p></div>
  <span class="mk-btn" style="align-self:flex-start">Nouvelle note</span>
</div>`,
            css: `.nt { background: #131418; color: #e8eaed; } .nt-card { background: #1d1f25; border-radius: 12px; padding: 12px; } .nt-meta { color: #a0a6b1; font-size: 12px; } .nt-link { color: #8ab4f8; font-size: 13px; } .nt .mk-btn { background: #8ab4f8; color: #0b1d3a; }`,
          },
          goodNote: 'Fond gris très sombre, cartes plus claires, accent désaturé : tout passe au-dessus de 6,7:1.',
        },
      ],
    },
    {
      id: 'oklch',
      title: 'Des rampes prévisibles avec OKLCH',
      body: `Pour une nouvelle palette web, impeccable recommande **OKLCH** : \`oklch(L C H)\`, soit la luminosité, la chroma (l’intensité) et la teinte. Sa luminosité est **perceptive** : deux couleurs de même L paraissent aussi claires l’une que l’autre, ce que HSL ne garantit pas. En HSL, \`hsl(60 100% 50%)\` (jaune) et \`hsl(240 100% 50%)\` (bleu) ont la même luminosité nominale, mais contrastent à 1,07:1 et à 8,6:1 avec le blanc.

Pour une rampe, du très clair au très foncé :

- fais varier **L** par pas réguliers ;
- **réduis la chroma près du blanc et du noir** : l’écran n’y affiche pas de couleurs intenses. Pour un bleu (teinte 255), l’espace sRGB n’offre qu’environ 0,014 de chroma à 97 % de luminosité, contre près de 0,19 vers 65 % ;
- garde la teinte stable, quitte à la décaler légèrement si la couleur vire.

Par exemple : \`oklch(97% 0.012 255)\` pour un fond teinté, \`oklch(55% 0.17 255)\` pour l’action, \`oklch(25% 0.07 255)\` pour un texte foncé. Si le projet a déjà un espace colorimétrique, reste dedans.`,
    },
  ],
  rules: [
    { id: 'roles', front: 'Par quoi commencer une palette ?', back: 'Par les rôles : fond et surfaces, textes, action, focus, sélection, bordures, états, données. Pas par un nuancier.' },
    { id: 'strategy', front: 'Quelles sont les quatre stratégies de couleur d’impeccable ?', back: 'Retenue (neutres et un accent), engagée (une couleur sur 30 à 60 % de la surface), palette complète (3–4 rôles), immersion (la surface est la couleur).' },
    { id: 'aa-text', front: 'Contraste minimal d’un texte courant (WCAG AA) ?', back: '4,5:1, placeholders compris. Le grand texte (24 px, ou 18,7 px en gras) descend à 3:1.' },
    { id: 'non-text', front: 'Contraste minimal d’un contrôle, d’une icône utile ou d’un focus ?', back: '3:1 contre les couleurs voisines (critère 1.4.11).' },
    { id: 'lightest-gray', front: 'Quel est le gris neutre le plus clair lisible sur blanc pour du texte courant ?', back: '`#767676` (4,54:1). `#999999` n’atteint que 2,85:1.' },
    { id: 'color-only', front: 'Comment signaler un état sans dépendre de la couleur ?', back: 'Double-la d’un texte, d’une icône, d’une forme ou d’un motif : la couleur ne doit jamais être le seul code (WCAG 1.4.1).' },
    { id: 'gray-on-color', front: 'Texte secondaire sur une surface colorée : quelle couleur ?', back: 'Une nuance dérivée de la teinte du fond (plus foncée sur fond clair, très claire sur fond foncé), jamais un gris neutre.' },
    { id: 'dark', front: 'Comment construire un thème sombre ?', back: 'Le composer : gris très sombre plutôt que noir, surfaces plus claires quand elles s’élèvent, accents désaturés, contrastes revérifiés.' },
    { id: 'accent', front: 'D’où un accent tire-t-il sa force ?', back: 'De sa rareté : réservé à l’action principale, à la sélection et aux états, jamais dépensé en décoration.' },
    { id: 'ten-percent', front: 'Les « 10 % d’accent » sont-ils une règle ?', back: 'Une heuristique de *quieter* pour calmer une interface criarde. *colorize* refuse les pourcentages fixes : le dosage suit la stratégie.' },
    { id: 'hue', front: 'Comment choisir la teinte principale ?', back: 'D’après le sens du produit et sa direction visuelle, jamais par réflexe de catégorie (« finance = bleu »).' },
    { id: 'oklch', front: 'Pourquoi construire une rampe en OKLCH ?', back: 'Sa luminosité est perceptive : des pas réguliers de L paraissent réguliers. On réduit la chroma près du blanc et du noir.' },
    { id: 'alpha', front: 'Couleur translucide ou explicite pour un texte ?', back: 'Explicite : avec l’alpha, le contraste dépend du fond, et il s’effondre sur une surface inattendue.' },
  ],
  exercises: [
    {
      id: 'color-gray-on-color-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quel bandeau le texte secondaire est-il le mieux traité ?',
      context: 'Bandeau d’abonnement d’une jardinerie en ligne, sur fond vert sapin.',
      options: [
        {
          id: 'gray',
          visual: {
            alt: 'Bandeau vert sapin avec un titre blanc, deux lignes de texte secondaire en gris neutre et un bouton blanc.',
            html: `<div class="mk-pad"><div class="gb"><p class="gb-t">Abonnement Potager</p><p class="gb-s">Des graines de saison livrées chaque mois, avec un calendrier de semis adapté à votre région.</p><p class="gb-s mk-small">Sans engagement · dès 9,90 € par mois</p><span class="mk-btn gb-btn">Découvrir</span></div></div>`,
            css: `.gb { background: #0f5f4c; color: #fff; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 8px; } .gb-t { font-size: 18px; font-weight: 700; } .gb-s { color: #9ca3af; } .gb-btn { background: #fff; color: #0f5f4c; align-self: flex-start; margin-top: 4px; }`,
          },
          why: 'Le gris neutre (#9ca3af) n’a que 3,0:1 sur ce vert : il paraît délavé et passe sous le minimum de 4,5:1.',
        },
        {
          id: 'tinted',
          visual: {
            alt: 'Même bandeau vert sapin dont le texte secondaire est un vert très pâle.',
            html: `<div class="mk-pad"><div class="gb"><p class="gb-t">Abonnement Potager</p><p class="gb-s">Des graines de saison livrées chaque mois, avec un calendrier de semis adapté à votre région.</p><p class="gb-s mk-small">Sans engagement · dès 9,90 € par mois</p><span class="mk-btn gb-btn">Découvrir</span></div></div>`,
            css: `.gb { background: #0f5f4c; color: #fff; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 8px; } .gb-t { font-size: 18px; font-weight: 700; } .gb-s { color: #c9eee2; } .gb-btn { background: #fff; color: #0f5f4c; align-self: flex-start; margin-top: 4px; }`,
          },
          why: 'Le texte secondaire est un vert très pâle tiré de la teinte du fond (#c9eee2) : 6,1:1, et il appartient à la surface.',
        },
      ],
      answer: 'tinted',
      explanation: `Un gris neutre est calibré pour un fond blanc. Sur une surface colorée, il se mélange au fond : il paraît terne, presque sale, et son contraste s’effondre — ici 3,0:1, sous le seuil AA de 4,5:1.

La correction d’impeccable : **dériver le texte secondaire de la teinte de la surface**. Sur un fond foncé, une teinte très claire du même vert ; sur un fond clair, une nuance plus foncée. Le texte reste secondaire (moins blanc que le titre) sans perdre en lisibilité.`,
      takeaway: 'Sur une surface colorée, tire le texte secondaire de la teinte du fond ; jamais un gris neutre.',
      sources: ['imp:craft-floor', 'imp:quieter', 'imp:detector'],
    },
    {
      id: 'color-help-text-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle le gris de ce texte d’aide : il doit rester discret, tout en atteignant 4,5:1 sur le fond blanc.',
      visual: {
        alt: 'Champ « Adresse e-mail » avec un exemple grisé dans le champ et un texte d’aide dessous, dont le gris varie avec le curseur.',
        html: `<div class="mk-pad mk-stack" style="--gap:6px"><p class="mk-label">Adresse e-mail</p><div class="mk-input hx-ph">prenom.nom@exemple.fr</div><p class="hx-help">Nous l’utilisons uniquement pour vous envoyer vos reçus.</p></div>`,
        css: `.hx-ph, .hx-help { color: hsl(0 0% var(--v, 72%)); } .hx-help { font-size: 13px; }`,
      },
      control: 'Luminosité du gris',
      min: 10,
      max: 90,
      step: 1,
      initial: 72,
      unit: '%',
      target: [30, 46],
      ideal: 44,
      readout: { kind: 'contrast', background: '#ffffff' },
      explanation: `Le contraste se calcule avec la formule du WCAG, à partir de la luminance relative des deux couleurs. Pour un gris neutre sur blanc, la limite tombe entre deux valeurs voisines : à **46 %** de luminosité (\`#757575\`), le ratio vaut **4,6:1** et le texte passe ; à **47 %** (\`#787878\`), il tombe à **4,4:1** et échoue.

Un texte d’aide doit aussi rester secondaire : en dessous d’environ 30 %, il se rapproche trop du texte principal (\`#1d2230\`) et la hiérarchie s’aplatit. Vers 44 % (\`#707070\`, 4,9:1), tu gardes une marge de sécurité sans perdre la discrétion.

Le texte d’exemple dans le champ (placeholder) obéit à la même règle : c’est du texte, il lui faut 4,5:1.`,
      takeaway: 'Aide et placeholder : au moins 4,5:1. Sur blanc, un gris neutre ne dépasse pas 46 % de luminosité (#757575).',
      sources: ['wcag:contrast', 'imp:craft-floor', 'imp:colorize'],
    },
    {
      id: 'color-only-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux endroits où l’information n’est portée que par la couleur.',
      visual: {
        alt: 'Tableau de bord de déploiements : une barre de disponibilité faite de petits segments colorés, une version avec un badge d’échec, un champ de branche bordé de rouge, un lien et un bouton.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:14px">
  <div class="mk-row mk-between"><p class="mk-h3">Déploiements · boutique-web</p><span class="mk-btn mk-btn--s" data-hotspot="deploy">Déployer</span></div>
  <div class="mk-stack" style="--gap:6px">
    <p class="mk-small mk-muted">Disponibilité, 30 derniers jours</p>
    <div class="dp-bars" data-hotspot="uptime"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class="ko"></span><span></span><span></span><span></span><span></span><span></span><span class="warn"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span class="ko"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
  </div>
  <div class="mk-row mk-between"><span>v2.14.0 · main · il y a 12 min</span><span class="dp-badge" data-hotspot="badge"><i data-icon="circle-x" style="--ico:14px"></i>Échec · 3 tests</span></div>
  <div class="mk-field"><span class="mk-label">Branche à déployer</span><div class="mk-input dp-err" data-hotspot="branch">feature/paiement-</div></div>
  <span class="dp-link" data-hotspot="logs">Voir les journaux de déploiement</span>
</div>`,
        css: `.dp-bars { display: flex; gap: 2px; height: 26px; }
.dp-bars span { flex: 1; border-radius: 2px; background: #2da44e; }
.dp-bars .ko { background: #cf222e; }
.dp-bars .warn { background: #d4a72c; }
.dp-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; background: #fdecea; color: #b3261e; font-size: 12px; font-weight: 600; white-space: nowrap; }
.dp-err { border-color: #cf222e; box-shadow: 0 0 0 1px #cf222e; }
.dp-link { color: #1f4fd8; text-decoration: underline; align-self: flex-start; }`,
      },
      hotspots: [
        { id: 'uptime', label: 'Barre de disponibilité', correct: true, why: 'Vert, ambre et rouge sans légende ni libellé : une personne qui confond le rouge et le vert ne voit pas les incidents, et personne ne sait ce que signifie l’ambre.' },
        { id: 'branch', label: 'Champ « Branche à déployer »', correct: true, why: 'Seul le liseré rouge signale l’erreur : aucun message ne dit ce qui ne va pas (nom de branche incomplet) ni comment corriger.' },
        { id: 'badge', label: 'Badge « Échec · 3 tests »', correct: false, why: 'La couleur est doublée d’une icône et d’un texte explicite : l’information passe sans elle.' },
        { id: 'deploy', label: 'Bouton « Déployer »', correct: false, why: 'Action principale nommée, blanc sur bleu à 6,6:1 : rien à corriger.' },
        { id: 'logs', label: 'Lien vers les journaux', correct: false, why: 'Souligné : il se repère comme lien même sans percevoir le bleu.' },
      ],
      explanation: `Le critère 1.4.1 du WCAG (niveau A) interdit d’utiliser la couleur comme **seul** moyen de transmettre une information. Environ 1 homme sur 12 perçoit mal certaines couleurs, le plus souvent le rouge et le vert — exactement le couple utilisé pour « ça marche » et « ça casse ».

- La barre de disponibilité a besoin d’une légende, d’un libellé par segment (au survol et au focus) ou d’une forme distincte pour les incidents.
- Le champ en erreur a besoin d’un message qui nomme le problème et la correction, idéalement avec une icône.`,
      takeaway: 'Double toujours la couleur d’un texte, d’une icône, d’une forme ou d’un motif.',
      sources: [WCAG_141, CBA, 'imp:colorize'],
    },
    {
      id: 'color-contrast-hotspot',
      type: 'hotspot',
      difficulty: 1,
      prompt: 'Trouve les trois textes dont le contraste est insuffisant.',
      visual: {
        alt: 'Carte d’inscription à une lettre d’information : titre, paragraphe, champ e-mail avec un exemple, bouton orange à texte blanc, une mention sous le bouton et une mention légale.',
        html: `<div class="mk-pad-l mk-stack" style="--gap:12px">
  <p class="mk-h2" data-hotspot="title">La lettre du dimanche</p>
  <p data-hotspot="intro">Chaque semaine, trois idées de balades à moins d’une heure de Lyon, testées par notre équipe.</p>
  <div class="mk-field"><span class="mk-label">E-mail</span><div class="mk-input nl-ph" data-hotspot="placeholder">vous@exemple.fr</div></div>
  <span class="mk-btn nl-btn" data-hotspot="button">S’abonner</span>
  <p class="mk-small nl-meta" data-hotspot="meta">Désinscription en un clic, à tout moment.</p>
  <p class="mk-small mk-muted" data-hotspot="legal">Vos données restent chez nous. <span style="text-decoration:underline">Politique de confidentialité</span></p>
</div>`,
        css: `.nl-ph { color: #b0b0b0; } .nl-btn { background: #f5a524; color: #fff; align-self: flex-start; } .nl-meta { color: #aaaaaa; }`,
      },
      hotspots: [
        { id: 'placeholder', label: 'Exemple dans le champ', correct: true, why: '#b0b0b0 sur blanc : 2,2:1. Un placeholder est du texte : il lui faut 4,5:1.' },
        { id: 'button', label: 'Libellé du bouton', correct: true, why: 'Blanc sur orange vif : 2,0:1. Un texte foncé sur cet orange atteindrait 7,8:1.' },
        { id: 'meta', label: 'Mention sous le bouton', correct: true, why: '#aaaaaa sur blanc : 2,3:1, une information utile rendue presque invisible.' },
        { id: 'title', label: 'Titre', correct: false, why: 'Texte presque noir sur blanc : 15,9:1.' },
        { id: 'intro', label: 'Paragraphe', correct: false, why: 'Même couleur que le titre, 15,9:1 : confortable.' },
        { id: 'legal', label: 'Mention légale', correct: false, why: 'Gris-bleu #5a6172 : 6,2:1. Discret, mais conforme.' },
      ],
      explanation: `Ces trois textes paraissent légers et élégants sur l’écran du designer, mais aucun n’atteint le minimum de 4,5:1 exigé pour du texte courant :

- exemple dans le champ \`#b0b0b0\` : 2,2:1 ;
- blanc sur l’orange du bouton : 2,0:1 ;
- mention \`#aaaaaa\` : 2,3:1.

Le titre et le paragraphe (15,9:1) comme la mention légale (6,2:1) passent. Ne te fie pas à ton écran : calcule chaque paire.`,
      takeaway: 'Calcule chaque paire texte / fond : 4,5:1 pour tout texte courant, placeholders et libellés de boutons compris.',
      sources: ['wcag:contrast', 'imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'color-dark-theme-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel thème sombre est le mieux composé pour ce tableau de bord d’hébergement ?',
      options: [
        {
          id: 'neon',
          visual: {
            alt: 'Tableau de bord sombre avec un halo violet en arrière-plan, un titre cyan lumineux, un bouton en dégradé violet-cyan et des cartes entourées de lueurs cyan.',
            html: `<div class="dk mk-pad mk-stack" style="--gap:12px">${DASH_BODY}</div>`,
            css: `${DASH_CSS}
.dk { background: radial-gradient(circle at 75% 0%, rgb(139 92 246 / 0.55), transparent 60%), #0b0b1f; color: #e2e8f0; }
.dk-h { color: #22d3ee; text-shadow: 0 0 12px #22d3ee; }
.dk-btn { background: linear-gradient(90deg, #7c3aed, #06b6d4); color: #fff; box-shadow: 0 0 18px rgb(124 58 237 / 0.8); }
.dk-card { border: 1px solid rgb(34 211 238 / 0.5); box-shadow: 0 0 16px rgb(34 211 238 / 0.35); background: rgb(15 15 40 / 0.6); }
.dk-ok { color: #22d3ee; } .dk-warn { color: #f0abfc; } .dk-meta { color: #94a3b8; }`,
          },
          why: 'Halo radial violet, lueurs colorées, dégradé violet-cyan : les réflexes que le détecteur relève (dark glow, radial halo, AI color palette). Tout brille, rien ne hiérarchise.',
        },
        {
          id: 'composed',
          visual: {
            alt: 'Même tableau de bord sur un fond gris très sombre, cartes légèrement plus claires, accents pastel et aucune lueur.',
            html: `<div class="dk mk-pad mk-stack" style="--gap:12px">${DASH_BODY}</div>`,
            css: `${DASH_CSS}
.dk { background: #17191e; color: #e6e8ec; }
.dk-btn { background: #9fb8ff; color: #0e1a33; }
.dk-card { background: #22252c; }
.dk-ok { color: #7ee2b8; } .dk-warn { color: #ffb4ab; } .dk-meta { color: #a3a9b5; }`,
          },
          why: 'Surfaces étagées (le fond, puis des cartes un peu plus claires), accents désaturés, aucune lueur : l’œil va aux états et à l’action.',
        },
      ],
      answer: 'composed',
      explanation: `Un thème sombre réussi se **compose** : un fond gris très sombre plutôt que noir, des surfaces surélevées un peu plus claires (une ombre portée se voit mal dans le sombre), des accents moins saturés que sur fond clair, et des contrastes vérifiés un par un — ici, tous à 6,5:1 au moins.

Les lueurs colorées, les nappes de dégradé radial et le couple violet / cyan néon sont devenus la signature des interfaces générées : ils décorent sans rien hiérarchiser, et impeccable les classe parmi les clichés.`,
      takeaway: 'En sombre, étage les surfaces en luminosité et désature les accents ; pas de halos ni de lueurs décoratives.',
      sources: ['imp:colorize', 'imp:detector', MATERIAL_DARK],
    },
    {
      id: 'color-palette-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle palette sert le mieux cet écran de suivi des expéditions ?',
      context: 'Une petite boutique en ligne : chaque matin, la gérante vérifie ses envois et en crée de nouveaux.',
      options: [
        {
          id: 'rainbow',
          visual: {
            alt: 'Liste d’expéditions avec un titre violet, des icônes sur des tuiles orange, violette et turquoise, des statuts tous en rose et un bouton turquoise.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h3" style="color:#7c3aed">Expéditions</p><span class="mk-btn mk-btn--s" style="background:#0e7490">Nouvel envoi</span></div>
  ${SHIP_ROWS(['<span class="sh-st" style="color:#db2777">Livrée</span>', '<span class="sh-st" style="color:#db2777">En retard</span>', '<span class="sh-st" style="color:#db2777">En transit</span>'])}
</div>`,
            css: `${SHIP_CSS} .sh-ico { color: #fff; } .sh-ico--1 { background: #c2410c; } .sh-ico--2 { background: #7c3aed; } .sh-ico--3 { background: #0e7490; }`,
          },
          why: 'Quatre teintes vives sans rôle : l’œil saute d’une tuile à l’autre, et les statuts, tous roses, ne se distinguent plus.',
        },
        {
          id: 'roles',
          visual: {
            alt: 'Liste d’expéditions aux icônes grises sur fond neutre, statuts en pastilles verte, rouge et grise avec icônes, et bouton bleu.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h3">Expéditions</p><span class="mk-btn mk-btn--s">Nouvel envoi</span></div>
  ${SHIP_ROWS([
    '<span class="sh-st sh-chip" style="background:#e6f4ea;color:#1a6e32"><i data-icon="circle-check" style="--ico:13px"></i>Livrée</span>',
    '<span class="sh-st sh-chip" style="background:#fdecea;color:#b3261e"><i data-icon="circle-alert" style="--ico:13px"></i>En retard</span>',
    '<span class="sh-st sh-chip" style="background:#eef1f7;color:#36405a"><i data-icon="truck" style="--ico:13px"></i>En transit</span>',
  ])}
</div>`,
            css: `${SHIP_CSS} .sh-ico { background: #f4f6f9; color: #5a6172; }`,
          },
          why: 'Des neutres pour la structure, le bleu pour l’action, le vert et le rouge pour les états, avec icône et libellé : l’envoi en retard saute aux yeux.',
        },
        {
          id: 'gray',
          visual: {
            alt: 'Liste d’expéditions entièrement grise : icônes, statuts en texte gris et bouton gris clair.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h3">Expéditions</p><span class="mk-btn mk-btn--s" style="background:#e6e9ef;color:#5a6172">Nouvel envoi</span></div>
  ${SHIP_ROWS(['<span class="sh-st mk-muted">Livrée</span>', '<span class="sh-st mk-muted">En retard</span>', '<span class="sh-st mk-muted">En transit</span>'])}
</div>`,
            css: `${SHIP_CSS} .sh-ico { background: #f4f6f9; color: #5a6172; }`,
          },
          why: 'Sans couleur, l’envoi en retard ne ressort pas et l’action principale se confond avec le reste.',
        },
      ],
      answer: 'roles',
      explanation: `Une palette se construit par **rôles** : surfaces et textes neutres, un accent réservé à l’action principale et à la sélection, des couleurs d’état réservées aux états. Chaque couleur dit alors quelque chose, et l’œil va droit à ce qui compte — ici l’envoi en retard et le bouton « Nouvel envoi ».

La version arc-en-ciel décore sans rien signifier ; la version toute grise renonce à la couleur là où elle avait un vrai travail à faire. Plus calme ne veut pas dire sans couleur.`,
      takeaway: 'Donne un rôle à chaque couleur : neutres pour la structure, accent pour l’action et la sélection, couleurs d’état pour les états.',
      sources: ['imp:colorize', 'imp:operate', 'imp:quieter'],
    },
    {
      id: 'color-accent-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quelle fiche produit repères-tu le plus vite le bouton d’achat ?',
      options: [
        {
          id: 'everywhere',
          visual: {
            alt: 'Fiche d’une bouilloire où titre, badges, étoiles, prix, lien, bordure d’image et bouton sont tous orange.',
            html: PRODUCT,
            css: `.pd-img { height: 92px; border-radius: 10px; background: #fff7ed; border: 2px solid #c2410c; }
.pd-badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #c2410c; color: #fff; }
.pd-title { font-size: 16px; font-weight: 700; color: #c2410c; }
.pd-stars { color: #c2410c; } .pd-price { font-size: 18px; color: #c2410c; }
.pd-buy { background: #c2410c; align-self: flex-start; }
.pd-link { color: #c2410c; text-decoration: underline; }`,
          },
          why: 'L’orange est partout — titre, badges, étoiles, prix, lien, bordure : le bouton, de la même couleur, se fond dans le reste.',
        },
        {
          id: 'rare',
          visual: {
            alt: 'Même fiche aux tons neutres, dont seul le bouton « Ajouter au panier » est orange.',
            html: PRODUCT,
            css: `.pd-img { height: 92px; border-radius: 10px; background: linear-gradient(160deg, #d9dee6, #eef1f5); }
.pd-badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #eef1f7; color: #36405a; }
.pd-title { font-size: 16px; font-weight: 700; }
.pd-stars { color: #36405a; } .pd-price { font-size: 18px; }
.pd-buy { background: #c2410c; align-self: flex-start; }
.pd-link { color: #36405a; text-decoration: underline; }`,
          },
          why: 'Les neutres portent la fiche ; l’orange n’apparaît que sur le bouton, qui ressort au premier coup d’œil.',
        },
      ],
      answer: 'rare',
      explanation: `Un accent tire sa force de sa **rareté**. Quand la couleur de l’action principale sert aussi à décorer — titres, icônes, prix, bordures —, elle ne signale plus rien et l’œil doit chercher le bouton.

Garde l’accent pour l’action principale, la sélection et les états. Le reste de l’écran s’appuie sur les neutres, la typographie et l’espace pour sa hiérarchie.`,
      takeaway: 'Réserve la couleur d’accent à l’action principale, à la sélection et aux états ; ne la dépense pas en décoration.',
      sources: ['imp:colorize', 'imp:operate'],
    },
    {
      id: 'color-hue-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Tu crées l’identité d’une application d’épargne pour artisans indépendants. Comment choisir sa teinte principale ?',
      options: [
        { id: 'meaning', label: 'Partir du sens du produit et de son univers (le métier, ses matières, son public), puis éprouver la teinte dans tous ses rôles et contrastes.', why: 'C’est la démarche d’impeccable : la teinte découle du sens du produit et de la direction visuelle, puis passe l’épreuve des rôles et du contraste.' },
        { id: 'blue', label: 'Du bleu : c’est la couleur de la confiance, donc celle de la finance.', why: 'Réflexe de catégorie : il rend le produit interchangeable avec tous ses concurrents.' },
        { id: 'ai', label: 'Un dégradé du violet au cyan, qui fait moderne et technologique.', why: 'C’est la palette la plus reconnaissable des interfaces générées (règle « AI color palette » du détecteur).' },
        { id: 'cream', label: 'Un fond crème et des tons beiges, chaleureux et élégants par défaut.', why: 'Le crème par défaut est devenu le « bon goût » réflexe des interfaces générées (règle « cream palette »).' },
      ],
      answer: 'meaning',
      explanation: `Impeccable demande de choisir la teinte **d’après le sens du produit et la direction visuelle, jamais par association de catégorie**. « Finance = bleu », « écologie = vert », « tech = violet » donnent des produits interchangeables.

Pars de ce qui rend ce produit singulier — ici le monde de l’atelier, ses matières, son public —, puis vérifie la teinte dans chacun de ses rôles (action, surfaces, états) et dans les deux thèmes. Une couleur de marque déjà engagée reste prioritaire : on ne remplace pas un univers sous prétexte de le coloriser.`,
      takeaway: 'Choisis la teinte d’après le sens du produit et son univers, puis éprouve-la dans les rôles et les contrastes.',
      sources: ['imp:colorize', 'imp:detector', 'imp:new-work'],
    },
    {
      id: 'color-ramp-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Tu génères en OKLCH une rampe de neuf nuances de bleu, du très clair au très foncé. Que fais-tu de la chroma ?',
      options: [
        { id: 'taper', label: 'Je la réduis près du blanc et du noir, et la garde plus forte au milieu de la rampe.', why: 'C’est la consigne d’impeccable : l’écran n’affiche pas de couleurs intenses aux extrémités.' },
        { id: 'constant', label: 'Je la garde constante sur toute la rampe : c’est mathématiquement uniforme.', why: 'Aux extrémités, une chroma élevée sort de l’espace affichable : les couleurs sont rognées et les pas deviennent irréguliers.' },
        { id: 'boost', label: 'Je l’augmente près du blanc et du noir pour que ces nuances restent vives.', why: 'C’est l’inverse de ce que permet l’écran : la place disponible en chroma se réduit justement à ces endroits.' },
        { id: 'hsl', label: 'Je passe en HSL : saturation fixe et luminosité par pas de 10 %.', why: 'La luminosité HSL n’est pas perceptive : à 50 %, le jaune contraste à 1,07:1 avec le blanc, le bleu à 8,6:1.' },
      ],
      answer: 'taper',
      explanation: `OKLCH sépare la **luminosité perceptive** (L), la **chroma** (C, l’intensité) et la **teinte** (H). On fait varier L par pas réguliers et l’on obtient des nuances qui paraissent réellement espacées.

Mais l’espace affichable (sRGB) se resserre près du blanc et du noir : pour un bleu, il n’offre qu’environ 0,014 de chroma à 97 % de luminosité, contre près de 0,19 vers 65 %. Impeccable le dit sans détour : réduis la chroma aux extrémités au lieu de la garder élevée pour la beauté du calcul.`,
      takeaway: 'Rampe OKLCH : L par pas réguliers, chroma réduite près du blanc et du noir.',
      sources: ['imp:colorize', MDN_OKLCH],
    },
    {
      id: 'color-aa-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquels de ces textes de 14 px atteignent le minimum AA (4,5:1) ?',
      options: [
        {
          id: 'g767',
          label: 'Gris `#767676` sur blanc',
          visual: { alt: 'Texte gris moyen de 14 px sur fond blanc.', html: `<div class="mk-pad" style="color:#767676">Livraison offerte dès 35 €</div>` },
          why: '4,54:1 : c’est le gris neutre le plus clair qui passe sur blanc.',
        },
        {
          id: 'g999',
          label: 'Gris `#999999` sur blanc',
          visual: { alt: 'Texte gris clair de 14 px sur fond blanc.', html: `<div class="mk-pad" style="color:#999999">Livraison offerte dès 35 €</div>` },
          why: '2,85:1 : un gris « élégant » qui échoue nettement.',
        },
        {
          id: 'blue',
          label: 'Blanc sur bleu `#1f4fd8`',
          visual: { alt: 'Texte blanc de 14 px sur fond bleu.', html: `<div class="mk-pad" style="background:#1f4fd8;color:#fff">Livraison offerte dès 35 €</div>` },
          why: '6,63:1 : confortable.',
        },
        {
          id: 'green',
          label: 'Blanc sur vert `#16a34a`',
          visual: { alt: 'Texte blanc de 14 px sur fond vert.', html: `<div class="mk-pad" style="background:#16a34a;color:#fff">Livraison offerte dès 35 €</div>` },
          why: '3,30:1 : assez pour un grand texte (3:1), pas pour 14 px.',
        },
        {
          id: 'amber',
          label: 'Blanc sur orange `#f59e0b`',
          visual: { alt: 'Texte blanc de 14 px sur fond orange.', html: `<div class="mk-pad" style="background:#f59e0b;color:#fff">Livraison offerte dès 35 €</div>` },
          why: '2,15:1 : échoue même pour un grand texte.',
        },
        {
          id: 'slate',
          label: 'Gris-bleu `#5a6172` sur `#f4f6f9`',
          visual: { alt: 'Texte gris-bleu de 14 px sur un fond gris très clair.', html: `<div class="mk-pad" style="background:#f4f6f9;color:#5a6172">Livraison offerte dès 35 €</div>` },
          why: '5,73:1 : passe, même sur une surface légèrement grise.',
        },
      ],
      answers: ['g767', 'blue', 'slate'],
      explanation: `L’œil se trompe facilement : \`#767676\` paraît clair mais passe de justesse, tandis que le blanc sur vert franc semble lisible et échoue (3,3:1). Seul le calcul tranche.

Pour un texte courant (moins de 24 px, ou moins de 18,7 px en gras), le WCAG AA exige 4,5:1. Le seuil de 3:1 ne vaut que pour les grands textes, les composants d’interface et les icônes utiles.`,
      takeaway: 'Ne juge pas un contraste à l’œil : calcule-le. 4,5:1 pour un texte courant, 3:1 seulement pour un grand texte.',
      sources: ['wcag:contrast', WCAG_1411],
    },
    {
      id: 'color-invert-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Pour obtenir un thème sombre, il suffit d’inverser les couleurs du thème clair.',
      answer: false,
      explanation: `Une inversion mécanique casse presque tout :

- le blanc devient noir pur, qui ne laisse aucune marge pour étager les surfaces ;
- les ombres, qui créaient l’élévation, deviennent invisibles ;
- les accents saturés vibrent sur le fond sombre ;
- des contrastes qui passaient échouent : le bleu \`#1f4fd8\` fait 6,6:1 sur blanc, 3,2:1 sur noir.

Un thème sombre se **compose** : surfaces plus claires à mesure qu’elles s’élèvent, accents désaturés, chaque paire de couleurs revérifiée.`,
      takeaway: 'Un thème sombre se compose — surfaces étagées, accents désaturés, contrastes revérifiés — il ne s’inverse pas.',
      sources: ['imp:colorize', MATERIAL_DARK],
    },
    {
      id: 'color-ten-percent-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'La « règle des 10 % » est une loi : une interface réussie ne consacre jamais plus de 10 % de sa surface à la couleur d’accent.',
      answer: false,
      explanation: `La commande *quieter* d’impeccable cite bien cette proportion — laisser les neutres dominer et garder l’accent autour de 10 % — pour **calmer une interface trop criarde**. C’est une heuristique de correction, pas une loi.

La commande *colorize* refuse explicitement les pourcentages fixes : la stratégie suit le brief et l’univers choisi. Une stratégie *engagée* laisse une couleur saturée couvrir 30 à 60 % de la surface ; une stratégie d’*immersion* fait de la surface la couleur elle-même. Ce qui ne change pas : chaque couleur doit avoir un rôle.`,
      takeaway: 'Les « 10 % d’accent » sont une heuristique pour calmer une interface, pas une loi : le dosage suit la stratégie et le brief.',
      sources: ['imp:quieter', 'imp:colorize', 'imp:new-work'],
    },
    {
      id: 'color-method-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range dans l’ordre les étapes pour coloriser une interface existante.',
      items: [
        { id: 'audit', label: 'Auditer l’existant : couleurs de marque engagées, rôles actuels, échecs de contraste' },
        { id: 'strategy', label: 'Choisir une stratégie : température, couleur dominante, dosage' },
        { id: 'roles', label: 'Définir les rôles : surfaces, textes, action, focus, états, données' },
        { id: 'apply', label: 'Appliquer à l’échelle du système, avec des jetons sémantiques' },
        { id: 'verify', label: 'Vérifier contrastes, indices non colorés et deux thèmes, dans chaque état' },
      ],
      explanation: `C’est la démarche de la commande *colorize* :

1. on **audite** avant de choisir, pour ne pas écraser une marque engagée ;
2. on nomme une **stratégie** avant de toucher une teinte ;
3. on construit des **rôles** plutôt qu’un nuancier ;
4. on les applique au **système** (jetons sémantiques, pas de valeurs isolées) ;
5. on **vérifie** au calcul : contrastes, daltonisme, états, thèmes clair et sombre.`,
      takeaway: 'Auditer, choisir une stratégie, définir les rôles, appliquer au système, vérifier — dans cet ordre.',
      sources: ['imp:colorize'],
    },
    {
      id: 'color-match-needs',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque besoin à la solution couleur qui y répond.',
      leftTitle: 'Besoin',
      rightTitle: 'Solution',
      pairs: [
        { id: 'chart', left: 'Distinguer quatre séries dans un graphique', right: 'Teintes de luminosités distinctes, étiquettes directes ou motifs' },
        { id: 'ongreen', left: 'Texte secondaire sur un bandeau vert sapin', right: 'Un vert très pâle dérivé de la teinte du bandeau' },
        { id: 'ramp', left: 'Une rampe de nuances aux pas réguliers', right: 'OKLCH, chroma réduite près du blanc et du noir' },
        { id: 'elevated', left: 'Une carte surélevée en thème sombre', right: 'Une surface un peu plus claire que le fond' },
        { id: 'error', left: 'Signaler un champ invalide', right: 'Bordure rouge, icône et message qui dit quoi corriger' },
        { id: 'photo', left: 'Un titre lisible sur une photo', right: 'Un voile sombre sous le texte, contraste vérifié sur la zone la plus claire' },
      ],
      explanation: `Chaque problème a sa technique :

- un graphique ne repose jamais sur la seule teinte ;
- sur une surface colorée, le texte secondaire se dérive de la teinte du fond ;
- OKLCH rend les pas de luminosité prévisibles, à condition de réduire la chroma aux extrémités ;
- en sombre, l’élévation passe par la luminosité de la surface, pas par l’ombre ;
- une erreur se dit avec des mots, pas seulement en rouge ;
- sur une image, on vérifie le contraste là où le fond est le plus clair.`,
      takeaway: 'Rôles, teinte dérivée, OKLCH, élévation par la luminosité, indices doublés : chaque besoin a sa réponse.',
      sources: ['imp:colorize', 'imp:craft-floor', WCAG_141],
    },
    {
      id: 'color-alpha-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Ton texte secondaire est défini en `rgba(0, 0, 0, 0.6)` : 5,7:1 sur blanc. Un composant le réutilise sur un bandeau bleu marine `#1e3a8a`. Qu’en conclure ?',
      options: [
        { id: 'explicit', label: 'Le contraste s’effondre : il faut une couleur explicite dérivée de la teinte du bandeau, par exemple un bleu très pâle.', why: 'Sur le marine, le noir à 60 % donne 1,7:1 ; un bleu pâle comme #c7d7fe atteint 7,2:1.' },
        { id: 'same', label: 'Rien : l’opacité garantit le même contraste sur tous les fonds.', why: 'C’est l’inverse : une couleur translucide se mélange au fond. Sur ce marine, elle devient un bleu nuit à 1,7:1.' },
        { id: 'more', label: 'Passer l’opacité à 0,8 règle le problème partout.', why: 'Plus d’opacité rend le texte encore plus sombre : sur un fond foncé, c’est pire.' },
        { id: 'gray', label: 'Le remplacer par un gris opaque `#666666`, qui fait aussi 5,7:1 sur blanc.', why: 'Sur le marine, ce gris ne fait que 1,8:1, avec l’aspect délavé du gris sur couleur.' },
      ],
      answer: 'explicit',
      explanation: `Une couleur translucide n’a pas de contraste propre : elle se **mélange** à ce qu’il y a dessous. \`rgba(0, 0, 0, 0.6)\` donne \`#666666\` sur blanc (5,7:1), mais \`#0c1737\` sur \`#1e3a8a\` : 1,7:1.

Impeccable recommande des **couleurs explicites** plutôt que des empilements de transparences quand l’alpha rend le contraste dépendant du contexte. Sur une surface colorée, dérive le texte secondaire de sa teinte, puis vérifie la paire.`,
      takeaway: 'Pour le texte, préfère des couleurs explicites à l’alpha : la transparence rend le contraste dépendant du fond.',
      sources: ['imp:colorize', 'wcag:contrast'],
    },
  ],
};

export default color;
