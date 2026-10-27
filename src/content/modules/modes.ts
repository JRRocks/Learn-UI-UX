import type { ModuleContent, Visual } from '../../engine/types';

/* ---------- Maquettes réutilisées ---------- */

/** Trésorerie d’un club : le monde « registre comptable » joué en costume. */
const LEDGER_COSTUME: Visual = {
  alt: 'Écran de trésorerie dessiné comme une page de registre : papier crème réglé de lignes bleues, marge rouge, écritures en italique sans en-têtes de colonnes, mention « tourner la page ».',
  html: `<div class="led">
  <div class="led-top"><span class="led-title">Grand livre de caisse</span><span class="led-year">Exercice 2026</span></div>
  <div class="led-paper">
    <p class="led-row"><span class="led-d">12 mars</span><span class="led-l">Cotisation annuelle, J. Perrin</span><span class="led-m">40,00</span></p>
    <p class="led-row"><span class="led-d">14 mars</span><span class="led-l">Location de la salle</span><span class="led-m">180,00</span></p>
    <p class="led-row"><span class="led-d">18 mars</span><span class="led-l">Subvention municipale</span><span class="led-m">1 200,00</span></p>
    <p class="led-row"><span class="led-d">21 mars</span><span class="led-l">Ballons de match (x12)</span><span class="led-m">96,50</span></p>
    <p class="led-row led-row--total"><span class="led-d"></span><span class="led-l">À reporter</span><span class="led-m">1 284,50</span></p>
  </div>
  <p class="led-turn">Page 3 sur 12 · tourner la page</p>
</div>`,
  css: `.led { background: #e9dcbc; padding: 14px; font-family: Georgia, "Liberation Serif", serif; color: #2a2f6b; }
.led-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding-bottom: 6px; border-bottom: 3px double #2a2f6b; }
.led-title { font-style: italic; font-size: 19px; }
.led-year { font-style: italic; font-size: 13px; }
.led-paper { position: relative; padding-inline-start: 44px; background: repeating-linear-gradient(#f7f0dc 0 27px, #a9bbe0 27px 28px); }
.led-paper::before { content: ""; position: absolute; inset-block: 0; inset-inline-start: 34px; width: 5px; border-inline: 1px solid #d25a5a; }
.led-row { display: flex; gap: 10px; height: 28px; align-items: flex-end; padding-bottom: 4px; font-style: italic; font-size: 14px; }
.led-row--total { font-weight: 700; }
.led-d { width: 54px; flex: none; }
.led-l { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.led-m { flex: none; padding-inline-end: 6px; }
.led-turn { margin-top: 8px; text-align: end; font-style: italic; font-size: 12px; }`,
};

/** Même écran : composants standard, le monde ne prête que palette, typo, densité et un geste. */
const LEDGER_PRODUCT: Visual = {
  alt: 'Écran de trésorerie avec un bandeau bleu encre, des filtres, un tableau à en-têtes (Date, Libellé, Montant triable) et un solde souligné d’un double filet.',
  html: `<div class="tre">
  <div class="tre-bar"><strong>Trésorerie</strong><span>Basket Club de Vertou</span></div>
  <div class="tre-body">
    <div class="tre-head"><p class="tre-h">Mouvements de mars</p><span class="mk-btn mk-btn--s tre-add"><i data-icon="plus" style="--ico:14px"></i>Ajouter</span></div>
    <div class="tre-filters"><span class="tre-select">Catégorie&nbsp;: toutes <i data-icon="chevron-down" style="--ico:14px"></i></span><span class="tre-chip tre-chip--on">Tout</span><span class="tre-chip">Recettes</span><span class="tre-chip">Dépenses</span></div>
    <table class="tre-table">
      <thead><tr><th>Date</th><th>Libellé</th><th class="num">Montant <i data-icon="chevron-down" style="--ico:12px"></i></th></tr></thead>
      <tbody>
        <tr><td>12/03</td><td>Cotisation, J. Perrin</td><td class="num pos">+40,00&nbsp;€</td></tr>
        <tr><td>14/03</td><td>Location de la salle</td><td class="num neg">−180,00&nbsp;€</td></tr>
        <tr><td>18/03</td><td>Subvention municipale</td><td class="num pos">+1&#8239;200,00&nbsp;€</td></tr>
        <tr><td>21/03</td><td>Ballons de match</td><td class="num neg">−96,50&nbsp;€</td></tr>
      </tbody>
      <tfoot><tr><td colspan="2">Solde au 31&nbsp;mars</td><td class="num"><span class="tre-total">1&#8239;284,50&nbsp;€</span></td></tr></tfoot>
    </table>
  </div>
</div>`,
  css: `.tre { background: #fbf8f1; color: #1f2433; }
.tre-bar { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 10px 16px; background: #1f3a8a; color: #fff; }
.tre-bar span { font-size: 12px; color: #d6def5; }
.tre-body { padding: 14px 16px 16px; }
.tre-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.tre-h { font-size: 16px; font-weight: 700; }
.tre-add { background: #1f3a8a; }
.tre-filters { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 8px; }
.tre-select, .tre-chip { display: inline-flex; align-items: center; gap: 4px; min-height: 28px; padding: 0 10px; border: 1px solid #c9cfdc; border-radius: 6px; background: #fff; font-size: 12px; }
.tre-chip--on { background: #e4e9f7; border-color: #1f3a8a; color: #1f3a8a; font-weight: 600; }
.tre-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.tre-table th { text-align: start; font-size: 12px; font-weight: 600; color: #5a6172; padding: 6px 4px; border-bottom: 1px solid #d9dde6; }
.tre-table td { padding: 7px 4px; border-bottom: 1px solid #eceef2; }
.tre-table .num { text-align: end; font-variant-numeric: tabular-nums; white-space: nowrap; }
.tre-table th.num { display: table-cell; }
.tre-table .pos { color: #2f6b3a; }
.tre-table .neg { color: #9b2c2c; }
.tre-table tfoot td { border-bottom: 0; padding-top: 9px; font-weight: 700; }
.tre-total { border-bottom: 3px double #1f3a8a; padding-bottom: 1px; }`,
};

/** Guide d’entretien d’une maison de couture : le monde envahit la colonne. */
const CARE_INVADED: Visual = {
  alt: 'Page de guide d’entretien en italique centré sur un fond sombre façon photographie, avec des ornements entre les paragraphes et aucune navigation.',
  html: `<div class="arb">
  <p class="arb-logo">ARDENT</p>
  <p class="arb-t">Le soin du cachemire</p>
  <p class="arb-p">Lavez-le à la main dans une eau à trente degrés au plus, avec une lessive pour laine, sans jamais frotter les fibres entre elles.</p>
  <span class="arb-orn"></span>
  <p class="arb-p">Rincez à la même température, puis pressez doucement l’eau hors de la maille, comme on caresse une étoffe précieuse.</p>
  <span class="arb-orn"></span>
</div>`,
  css: `.arb { padding: 26px 22px; text-align: center; color: #b8a99b; background: radial-gradient(120% 90% at 30% 20%, #5a4a40 0%, #2a211d 55%, #171210 100%); font-family: Georgia, "Liberation Serif", serif; }
.arb-logo { letter-spacing: .5em; font-size: 12px; color: #e7dccf; }
.arb-t { margin: 14px 0 12px; font-size: 26px; font-style: italic; color: #efe4d6; }
.arb-p { font-size: 15px; font-style: italic; line-height: 1.45; letter-spacing: .03em; text-align: justify; text-align-last: center; max-width: 30ch; margin-inline: auto; }
.arb-orn { display: block; width: 46px; height: 1px; margin: 14px auto; background: #b8a99b; box-shadow: 0 -4px 0 -0.5px #b8a99b, 0 4px 0 -0.5px #b8a99b; }`,
};

/** Même guide : le monde tient le cadre (en-tête, fond, encadré), la colonne reste calme. */
const CARE_FRAMED: Visual = {
  alt: 'Page de guide d’entretien avec un en-tête noir portant le nom de la maison et la navigation, un fil d’Ariane, un titre, un paragraphe lisible et un encadré sur le séchage.',
  html: `<div class="ard">
  <div class="ard-mast"><span class="ard-word">ARDENT</span><nav class="ard-nav"><span>Collections</span><span class="on">Entretien</span><span>Boutiques</span></nav></div>
  <div class="ard-page">
    <p class="ard-crumb">Entretien › Laine et cachemire</p>
    <p class="ard-h">Laver un pull en cachemire</p>
    <p class="ard-body">Lavez-le à la main, dans une eau à 30&nbsp;°C au plus, avec une lessive pour laine. Ne frottez pas&nbsp;: pressez l’eau à travers les fibres, puis rincez à la même température.</p>
    <p class="ard-note"><strong>Séchage.</strong> À plat sur une serviette, loin d’une source de chaleur. Comptez 24&nbsp;heures.</p>
  </div>
</div>`,
  css: `.ard { background: #f4efe7; color: #231f1c; }
.ard-mast { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px 16px; padding: 12px 18px; background: #141110; color: #f4efe7; }
.ard-word { font-family: Georgia, "Liberation Serif", serif; letter-spacing: .32em; font-size: 15px; }
.ard-nav { display: flex; gap: 14px; font-size: 12px; color: #cfc6bb; }
.ard-nav .on { color: #fff; text-decoration: underline; text-underline-offset: 4px; }
.ard-page { padding: 16px 18px 20px; }
.ard-crumb { font-size: 12px; color: #6b6158; }
.ard-h { margin: 6px 0 8px; font-family: Georgia, "Liberation Serif", serif; font-size: 23px; line-height: 1.2; }
.ard-body { font-size: 15px; line-height: 1.6; max-width: 58ch; }
.ard-note { margin-top: 12px; padding: 10px 12px; max-width: 58ch; font-size: 14px; line-height: 1.5; background: #ebe2d4; border-radius: 8px; }`,
};

/** Navettes vers les îles : l’affiche et son lien décoratif. */
const FERRY_POSTER: Visual = {
  alt: 'Page d’accueil d’une compagnie de navettes maritimes : grand visuel bleu, slogan « L’évasion commence ici » et un petit lien « Découvrir nos traversées ».',
  frame: 'browser',
  html: `<div class="kfb">
  <div class="kfb-nav"><strong>Navettes Kerlan</strong><span><i data-icon="menu" style="--ico:18px"></i></span></div>
  <div class="kfb-hero">
    <p class="kfb-h">L’évasion commence ici.</p>
    <p class="kfb-p">Laissez-vous porter par l’océan.</p>
    <span class="kfb-link">Découvrir nos traversées <i data-icon="arrow-right" style="--ico:14px"></i></span>
  </div>
</div>`,
  css: `.kfb-nav { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; }
.kfb-hero { padding: 54px 20px 40px; color: #fff; background: linear-gradient(180deg, #8ec5d6 0%, #3f8fae 45%, #0f4c6b 100%); }
.kfb-h { font-size: 30px; line-height: 1.1; font-weight: 800; letter-spacing: -0.01em; }
.kfb-p { margin-top: 8px; font-size: 15px; }
.kfb-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 22px; font-size: 13px; text-decoration: underline; text-underline-offset: 3px; }`,
};

/** Même compagnie : le monde du billet de passage porte la recherche de traversée, dès le premier écran. */
const FERRY_SEARCH: Visual = {
  alt: 'Page d’accueil d’une compagnie de navettes maritimes : sur un fond bleu marine, le titre des lignes, puis un formulaire composé comme un billet de passage (Départ, Arrivée, Date, Passagers) dont le talon détachable porte le bouton « Voir les horaires », et le prochain départ.',
  frame: 'browser',
  html: `<div class="kfg">
  <div class="kfg-nav"><strong>Navettes Kerlan</strong><span>Horaires</span><span>Tarifs</span><span>Mon billet</span></div>
  <div class="kfg-hero">
    <p class="kfg-h">Quiberon – Belle-Île, Houat et Hoëdic</p>
    <p class="kfg-p">Toute l’année, jusqu’à 10&nbsp;départs par jour depuis Quiberon.</p>
    <div class="kfg-ticket">
      <p class="kfg-tt">Billet de passage</p>
      <div class="kfg-form">
        <span class="kfg-f"><small>Départ</small>Quiberon</span>
        <span class="kfg-f"><small>Arrivée</small>Le Palais</span>
        <span class="kfg-f"><small>Date</small>13&nbsp;juin</span>
        <span class="kfg-f"><small>Passagers</small>2&nbsp;adultes</span>
      </div>
      <div class="kfg-stub"><span class="mk-btn kfg-btn">Voir les horaires</span></div>
    </div>
    <p class="kfg-next"><i data-icon="clock" style="--ico:14px"></i> Prochain départ 14:15 · 23&nbsp;places restantes</p>
  </div>
</div>`,
  css: `.kfg { background: #0b3a55; color: #fff; }
.kfg-nav { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; padding: 10px 16px; font-size: 13px; color: #d3e5ee; border-bottom: 1px solid #2b5d78; }
.kfg-nav strong { margin-inline-end: auto; font-size: 14px; color: #fff; }
.kfg-hero { padding: 16px 16px 18px; }
.kfg-h { font-size: 22px; line-height: 1.15; font-weight: 800; letter-spacing: -0.01em; }
.kfg-p { margin-top: 4px; font-size: 13px; color: #c9dde7; }
.kfg-ticket { position: relative; margin-top: 14px; border-radius: 10px; background: #fff; color: #0d2f40; }
.kfg-tt { padding: 7px 12px; border-radius: 10px 10px 0 0; background: #f4c542; color: #3b2c00; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.kfg-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(92px, 1fr)); gap: 6px; padding: 10px 12px 12px; }
.kfg-f { display: flex; flex-direction: column; padding: 4px 8px; font-size: 13px; font-weight: 600; border: 1px solid #7c919c; border-radius: 6px; }
.kfg-f small { font-size: 11px; font-weight: 500; color: #4b6470; }
.kfg-stub { position: relative; padding: 12px; border-top: 2px dashed #9db3bf; }
.kfg-stub::before, .kfg-stub::after { content: ""; position: absolute; top: -9px; width: 16px; height: 16px; border-radius: 50%; background: #0b3a55; }
.kfg-stub::before { left: -8px; }
.kfg-stub::after { right: -8px; }
.kfg-btn { display: flex; width: 100%; background: #0b3a55; }
.kfg-next { display: flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 12px; color: #c9dde7; }`,
};

/* ---------- Module ---------- */

const modes: ModuleContent = {
  id: 'modes',
  title: 'Les quatre modes de visite',
  category: 'fondations',
  summary:
    'Reconnaître le mode d’une surface (Persuader, Opérer, Lire, Expérience) d’après la réussite de son visiteur, et en déduire la dose d’ambition, ce que le monde visuel a le droit de toucher, et ce qu’un affinage doit préserver.',
  minutes: 13,
  commands: ['shape'],
  sources: ['imp:skill', 'imp:mode-operate', 'imp:mode-persuade', 'imp:mode-read', 'imp:operate', 'imp:new-work', 'lawsofux'],
  sections: [
    {
      id: 'reussite',
      title: 'Le mode nomme la réussite du visiteur',
      body: `Avant de choisir une police ou une couleur, impeccable pose une question : **à quoi ressemble la réussite du visiteur sur cette surface ?** La réponse donne le *mode de visite*, et le mode règle presque tout le reste.

- **Persuader** : le visiteur décide et agit ; ici, le design *est* le produit. Pages d’accueil, marketing, campagnes, tarifs. Il faut gagner l’attention, puis l’action.
- **Opérer** : le visiteur accomplit une tâche. Applications, tableaux de bord, éditeurs, administration, réglages, outils. La lecture en un coup d’œil, la cohérence, les attentes de la plateforme et la vraie scène d’usage passent avant l’expression ; la marque vit dans la précision des détails.
- **Lire** : le visiteur comprend quelque chose. Documentation, articles, guides, aide, journaux des modifications. On structure pour la compréhension, puis on rend la lecture assez agréable pour qu’on ait envie d’y rester.
- **Expérience** : le visiteur est dans l’œuvre elle-même. Portfolios, galeries, vitrines. L’œuvre mène dès le premier écran ; l’interface s’efface.

**L’ambition se dose selon le mode.** En Persuader et en Expérience, engagement total : un travail affirmé, distinct, qui a un point de vue. En Opérer et en Lire, l’ambition se voit dans la **précision et la retenue**, et les modèles d’interface que le visiteur connaît déjà méritent leur place. C’est la [loi de Jakob](https://lawsofux.com/jakobs-law/) : les gens passent l’essentiel de leur temps sur d’autres produits et s’attendent à ce que le tien fonctionne de la même façon.`,
    },
    {
      id: 'surface',
      title: 'Une surface, un mode — pas un produit',
      body: `Le mode se choisit **d’après la surface demandée, pas d’après le produit**, et il ne s’inscrit que dans le brief de cette surface. Un même éditeur de logiciel possède souvent les quatre :

- sa page d’accueil et sa page Tarifs : **Persuader**, même si le produit est un outil ;
- l’application, ses réglages, son tableau de bord : **Opérer** ;
- sa documentation, son centre d’aide, son journal des modifications : **Lire**. L’index de la documentation relève lui aussi du mode Lire, pas du mode Persuader ;
- la galerie des réalisations de ses clients : souvent **Expérience**.

À l’inverse, la documentation d’une maison de couture très expressive relève du mode **Lire**, et doit se lire comme une documentation.

### Les questions qui changent le travail

Avant de construire, deux ou trois questions suffisent, choisies selon le mode :

- **Persuader** : qui doit agir, que doit-il croire, quelles preuves, contenus ou visuels réels justifient cette croyance ?
- **Opérer** : la tâche, les informations, les états importants, la fréquence d’usage, les contraintes.
- **Lire** : la question du lecteur, la matière source, la structure, l’orientation.
- **Expérience** : ce qui mène, comment l’exploration se déroule, quelle interaction ou transition compte.

Dans tous les cas : à quoi ressemble la réussite, ce qui doit rester intact, et ce qui ferait paraître faux un résultat pourtant soigné. Jamais de question sur des valeurs CSS ni de « style » prêt à l’emploi.`,
    },
    {
      id: 'operer',
      title: 'Opérer : d’abord un vrai produit de sa catégorie',
      body: `Sur une surface Opérer, le visiteur vient faire un travail. Quelqu’un qui utilise ce genre d’outil doit **savoir où tout se trouve avant de remarquer l’univers visuel**.

Le *monde* (l’univers visuel retenu pour le produit) ne prête que **quatre choses** : la typographie, la palette, la densité et **un geste signature**. Il ne fournit jamais la mise en page, le modèle de navigation ni les contrôles, qui restent ceux que le visiteur sait déjà utiliser : boutons, onglets, champs, listes déroulantes, filtres, tableaux aux en-têtes triables. Des composants web standard sur le web, les contrôles natifs dans une app.

- **Le costume.** Un monde tiré d’un outil ou d’un instrument (terminal, oscilloscope, tableau de commande, cockpit) revient comme un déguisement de cet outil : barre de touches de fonction, invite de commande, cadran d’instrument, papier réglé de registre à la place d’un tableau. Un écran qu’un ingénieur ne pourrait pas construire avec les composants standard est une image de l’outil, pas l’outil.
- **Le geste signature se nomme concrètement** : l’état des services dessiné comme un plan de métro, un planning composé au rythme des colonnes d’un indicateur horaire. Un monde qui n’apparaît que comme un jeu de couleurs n’a pas encore trouvé son geste.
- **La couleur travaille** : une coque assumée (rail ou en-tête coloré, fond teinté), les états, les séries de données, la sélection. La stratégie par défaut d’un produit reste la *Retenue* (des neutres teintés par le monde et un seul accent), à condition que la couleur y garde ces travaux. Un écran gris neutre avec une seule couleur d’accent, c’est le réglage par défaut de la catégorie sans sa finition, pas de la retenue.

### Ce que la surface produit s’autorise

Souvent une seule famille de caractères, une échelle fixe en rem au rapport serré (1,125 à 1,2), des transitions de 150 à 250 ms, tous les états des composants, des squelettes de chargement plutôt qu’un indicateur au milieu du contenu, des états vides qui enseignent l’interface. Et ce que les pages de marque ne peuvent pas se permettre : les polices système, les navigations standard (barre et menu latéral, fil d’Ariane, onglets, palette de commandes), la densité, la cohérence plutôt que la surprise.

### … et ce qu’elle s’interdit

- les polices d’affichage dans les libellés, les boutons et les données ;
- les affordances standard réinventées pour le style : barres de défilement maison, contrôles de formulaire étranges, modales non standard ;
- le mouvement décoratif, qui ne traduit aucun état ;
- les couleurs lourdes ou les accents saturés sur des états inactifs ;
- un vocabulaire de composants qui change d’un écran à l’autre ;
- la modale comme premier réflexe, avant les solutions en ligne ou progressives.

Le test : nom du produit masqué, l’écran se lit-il comme un produit de sa catégorie ? Le visiteur pourrait-il y faire sa tâche ? Est-il au moins aussi propre que le standard de la catégorie, et plus distinctif ?`,
      examples: [
        {
          title: 'Le monde « registre comptable » sur un écran de trésorerie',
          bad: LEDGER_COSTUME,
          badNote: 'Le registre est rejoué : papier réglé à la place d’un tableau, pas d’en-têtes ni de tri, une pagination à « tourner ».',
          good: LEDGER_PRODUCT,
          goodNote: 'Contrôles standard ; le monde prête la palette encre et papier, la densité et un geste : le double filet sous le solde.',
        },
      ],
    },
    {
      id: 'lire',
      title: 'Lire : le monde tient le cadre, la colonne reste calme',
      body: `Sur une surface Lire, **la question du lecteur mène**. La compréhension et l’orientation restent intactes à chaque étape : une documentation se lit comme une documentation, un guide comme un guide, un article comme un article.

- **Le monde possède le cadre** : l’en-tête, le rail de navigation, le fond, le titre et les ouvertures de section, la façon de composer le code, les tableaux et les encadrés. Là, palette, typographie et geste signature s’engagent pleinement.
- **La colonne de lecture reste calme** : une police de lecture, un vrai contraste, une vraie mesure (sur le web, environ 60 à 75 caractères, corps proche de 16 px), rien qui s’agite derrière le texte. Le monospace sert au code, aux paramètres et aux petits libellés, jamais au texte courant ni aux titres par défaut.
- **Le monde ne fournit jamais l’ordre de lecture** et ne remplace pas la navigation par un dispositif qu’il faudrait apprendre. Code, tableaux, notes et figures gardent les formes que les lecteurs connaissent.
- **Le geste signature est un système**, utilisé là où il se justifie, pas un cadre répété autour de chaque élément.

Les mondes qui se transfèrent le mieux viennent des traditions éditoriales du public : ouvrages de référence, spécimens typographiques, indicateurs horaires, guides de terrain, manuels techniques, appareil critique des ouvrages savants, repères de navigation d’un journal.

Double test. Le lecteur sait-il où il se trouve et où aller ensuite, et lit-il le texte courant sans effort ? Puis, nom masqué : cette documentation pourrait-elle être celle de n’importe quel produit ? Si oui, pousse le cadre plus loin dans le monde. Si la page se lit comme un objet du monde avant de se lire comme un document, le monde a atteint la colonne : ramène-le au cadre.`,
      examples: [
        {
          title: 'Le guide d’entretien d’une maison de couture',
          bad: CARE_INVADED,
          badNote: 'Le monde a atteint la colonne : italique centré, texte justifié sur une image, ornements, aucune navigation.',
          good: CARE_FRAMED,
          goodNote: 'La maison s’exprime dans l’en-tête, le fond et l’encadré ; la colonne garde une police de lecture et une vraie mesure.',
        },
      ],
    },
    {
      id: 'persuader',
      title: 'Persuader et Expérience : le monde peut porter la page',
      body: `Sur ces surfaces, le design est ce que le visiteur juge : le monde peut posséder et structurer la page.

- **Le premier écran d’une page Persuader** rend l’offre compréhensible et désirable, expose **une action claire** et démontre quelque chose que **seul ce produit** peut prouver.
- **L’action est celle de la catégorie, sous sa forme opérante** : la recherche trajet et dates d’une compagnie aérienne, les créneaux libres d’un cabinet médical, l’ajout au panier d’une boutique. Un lien décoratif qui pointe vers elle ailleurs ne compte pas.
- **Le monde porte la page, il n’en fait pas un tableau.** Une façade, un rideau de fer ou un livre peuvent être ce sur quoi la page est construite ; un écran peint en entier comme une affiche, sans partie qui fonctionne, est une image du monde, pas son site. Les liens se lisent comme des liens, le texte comme du texte, l’action reste évidemment cliquable.
- **La matière du monde couvre la page** : elle forme le fond et les grandes surfaces, et sa typographie compose les titres. Un monde réduit à un accent sur un gabarit neutre, c’est le défaut de la catégorie avec un autocollant.
- **Deux pièges effacent la direction** : l’affiche peinte, et la page produit générique (un titre sur un sous-titre et un bouton, une rangée de cartes égales). Un héros scindé, texte d’un côté et produit de l’autre avec une rangée de badges dessous, reste le gabarit, quel que soit le monde qui le peint.
- **On répare une affiche en faisant fonctionner ses parties là où le monde les a mises**, jamais en les rangeant dans une mise en page standard aux couleurs du monde.
- **L’engagement est une profondeur, pas une dispersion** : un geste dominant, soutenu par la matière, la typographie et l’espacement ; le reste se tient tranquille. Plus chargé n’est pas plus audacieux.

En **Expérience**, l’œuvre elle-même mène dès le premier écran et l’interface recule.

### Ce que le monde peut toucher, mode par mode

- **Opérer** : la typographie, la palette, la densité et un geste signature. Sur un écran de travail, plus de monde, c’est un costume.
- **Lire** : tout le cadre, jamais la colonne ni l’ordre de lecture. Un outil, un instrument ou une interface tirés du monde du public y reviennent aussi en costume : on n’en garde que typo, palette, densité et un geste.
- **Persuader et Expérience** : la page entière. Un monde tiré d’un langage d’interface peut même y porter sa grammaire jusqu’à la navigation, aux contrôles et aux états, dans les conventions de la plateforme.

Même logique pour choisir un monde. En Opérer et en Lire, on ne le tire jamais des outils et instruments que le public manipule ; en Persuader et en Expérience, ces outils font partie des pistes trop attendues, et on leur consacre une piste au plus.`,
      examples: [
        {
          title: 'L’action réelle dans le premier écran',
          bad: FERRY_POSTER,
          badNote: 'Une affiche et un lien décoratif : l’action (trouver une traversée) est ailleurs.',
          good: FERRY_SEARCH,
          goodNote: 'Le monde du billet de passage porte la recherche de traversée, qui fonctionne dès le premier écran, avec une preuve : le prochain départ.',
        },
      ],
    },
    {
      id: 'brief',
      title: 'Le brief gagne ; affiner n’est pas refaire',
      body: `Quatre principes encadrent tout travail de conception chez impeccable.

- **Le brief gagne.** Honore l’esthétique, l’époque, les matériaux, les polices et les palettes imposés par le brief, même quand le *détecteur* d’impeccable (l’outil qui analyse le code d’une interface pour y repérer défauts et clichés) les classe parmi les *motifs saturés* : des choix devenus clichés à force d’être produits par réflexe, comme un fond crème ou un titre en italique à empattements. Réorienter un brief clair vers ton propre goût est un échec.
- **Affiner préserve ; refaire remplace.** Affiner garde l’identité en place, le comportement, les textes et tout ce qui sort du périmètre ; demande avant de remplacer un texte factuel ou d’ajouter une affirmation. Refaire garde la vérité du produit, le contenu, les fonctions, les affordances natives et les contraintes, mais traite l’ancien look comme une preuve et un anti-modèle : on choisit un monde de remplacement. Ne coupe jamais la poire en deux en polissant l’apparence qu’on abandonne.
- **L’autorité visuelle est une preuve, pas un nom de fichier.** L’absence de DESIGN.md ne fait pas d’un projet une page blanche : une identité cohérente déjà présente dans le code (tokens, composants, visuels) s’hérite et se documente.
- **Les symboles chargés restent hors du décor.** Le monde d’un sujet n’autorise pas les emblèmes liés au militarisme, au suprémacisme ou aux mouvements de haine comme motifs, badges ou ornements : les rayons du drapeau du Soleil levant, le drapeau de bataille confédéré, les insignes de l’ère nazie et leurs variantes stylisées. Prends les formes neutres de ce monde. Un contenu qui documente un tel symbole comme un fait le montre tel qu’il est.

### La bonne dose d’invention

D’abord, décide de ce qui est déjà vrai : refonte (on remplace le monde), monde établi (on en hérite), marque incomplète (on préserve l’acquis et on l’étend avec le client), aucune autorité visuelle (on crée un monde avec le client). Puis :

- **Étendre une surface existante** : on hérite de son monde et de sa composition, et on ne résout que le nouveau besoin, le contenu, la hiérarchie, les états, l’interaction et la jonction avec l’existant.
- **Créer une surface entière dans un monde établi** : le système visuel reste fixe ; on explore cinq à sept structures nettement différentes, tirées du contenu, de la tâche et des comportements.
- **Créer ou remplacer le monde** : on part du mécanisme propre au produit, de la scène réelle de son public et de son univers culturel, en écartant la page que la catégorie livre toujours, et son contraire prévisible.

Une section, un composant ou un état ajouté dans une surface établie en hérite : ne transforme jamais un ajout local en exercice d’identité.`,
    },
  ],
  rules: [
    { id: 'success', front: 'Que nomme le mode d’une surface ?', back: 'La réussite du visiteur : décider et agir (Persuader), accomplir une tâche (Opérer), comprendre (Lire), être dans l’œuvre (Expérience).' },
    { id: 'surface', front: 'Sur quoi se choisit le mode ?', back: 'Sur la surface, pas sur le produit : la page d’accueil d’un outil relève du mode Persuader, la documentation d’une maison de mode du mode Lire.' },
    { id: 'ambition', front: 'Comment l’ambition varie-t-elle selon le mode ?', back: 'Engagement total en Persuader et Expérience ; précision et retenue en Opérer et Lire, où les modèles d’interface connus méritent leur place.' },
    { id: 'four', front: 'En mode Opérer, que peut prêter l’univers visuel ?', back: 'Quatre choses : typographie, palette, densité, un geste signature. Jamais la mise en page, la navigation ni les contrôles.' },
    { id: 'costume', front: 'Qu’est-ce qu’un « costume » sur un écran de travail ?', back: 'L’interface d’un outil du monde rejouée à l’écran : touches de fonction, invite de commande, cadran, papier de registre. On n’en garde que typo, palette, densité et un geste.' },
    { id: 'grey', front: 'Un écran gris avec une seule couleur d’accent, est-ce de la retenue ?', back: 'Non : c’est le défaut de la catégorie sans sa finition. La Retenue, ce sont des neutres teintés par le monde et un accent, et la couleur y travaille : coque, états, séries de données, sélection.' },
    { id: 'frame', front: 'En mode Lire, où le monde s’exprime-t-il ?', back: 'Dans le cadre : en-tête, rail, fond, ouvertures, code, tableaux, encadrés. La colonne reste calme : police de lecture, vrai contraste, 60 à 75 caractères.' },
    { id: 'action', front: 'Quelle action le premier écran d’une page Persuader doit-il montrer ?', back: 'Celle de la catégorie, sous sa forme opérante : recherche trajet et dates, créneaux libres, ajout au panier. Un lien décoratif ne compte pas.' },
    { id: 'traps', front: 'Quels sont les deux pièges d’une page Persuader ?', back: 'L’affiche peinte sans partie qui fonctionne, et la page générique : titre, sous-titre, bouton, rangée de cartes égales.' },
    { id: 'brief', front: 'Le brief impose un style que le détecteur classe parmi les clichés. Que faire ?', back: 'Honorer le brief. Réorienter un brief clair vers son propre goût est un échec.' },
    { id: 'refine', front: 'Affiner ou refaire : qu’est-ce qui change ?', back: 'Affiner préserve identité, comportement et textes. Refaire garde la vérité du produit et remplace le monde visuel. Jamais de polissage du look abandonné.' },
    { id: 'authority', front: 'Pas de DESIGN.md : le projet est-il vierge ?', back: 'Non. L’autorité visuelle se lit dans le code, les tokens et les composants ; une identité cohérente s’hérite et se documente.' },
    { id: 'symbols', front: 'Un symbole chargé peut-il servir d’ornement si le sujet s’y prête ?', back: 'Non : rayons du Soleil levant, drapeau confédéré, insignes nazis restent hors du décor. On puise dans les formes neutres du monde.' },
    { id: 'local', front: 'Un composant ajouté à une surface existante appelle-t-il une nouvelle identité ?', back: 'Non : il hérite de la surface. Un ajout local n’est jamais un exercice d’identité.' },
  ],
  exercises: [
    {
      id: 'modes-match-surfaces',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque surface au mode qui décrit la réussite de son visiteur.',
      leftTitle: 'Surface',
      rightTitle: 'Mode',
      pairs: [
        { id: 'landing', left: 'La page d’accueil de Facturo, un logiciel de facturation', right: 'Persuader' },
        { id: 'settings', left: 'L’écran « Moyens de paiement » dans l’application Facturo', right: 'Opérer' },
        { id: 'docs', left: 'L’index de la documentation de Facturo', right: 'Lire' },
        { id: 'portfolio', left: 'Le portfolio en ligne d’une photographe de paysage', right: 'Expérience' },
      ],
      explanation: `Le mode se choisit **d’après la surface**, pas d’après le produit ni la marque :

- La page d’accueil d’un outil relève du mode **Persuader** : le visiteur doit décider d’essayer ou d’acheter.
- L’écran de réglage relève du mode **Opérer** : on y accomplit une tâche.
- L’index de la documentation relève du mode **Lire**, pas du mode Persuader : le visiteur y cherche par où commencer et où trouver sa réponse.
- Le portfolio relève du mode **Expérience** : les photographies mènent, l’interface s’efface.`,
      takeaway: 'Choisis le mode d’après la surface et la réussite de son visiteur, pas d’après le produit ou la marque.',
      sources: ['imp:skill'],
    },
    {
      id: 'modes-tool-landing-choice',
      type: 'choice',
      difficulty: 1,
      context:
        'Tu refais la page d’accueil de Relevé, un outil de suivi de chantier utilisé par des artisans. L’équipe produit insiste : « C’est un outil, donc on est en mode Opérer. »',
      prompt: 'Quel mode s’applique à cette page ?',
      options: [
        { id: 'persuade', label: 'Persuader : le visiteur doit décider d’essayer ou d’acheter.', why: 'La page d’accueil d’un outil est une surface de décision : le design y est le produit.' },
        { id: 'operate', label: 'Opérer : le visiteur vient gérer ses chantiers.', why: 'Le mode ne s’hérite pas du produit : on gère ses chantiers dans l’application, qui relève du mode Opérer. Sa page d’accueil s’adresse à qui doit encore décider.' },
        { id: 'read', label: 'Lire : le visiteur vient comprendre le fonctionnement.', why: 'Comprendre sert ici la décision ; c’est la documentation de Relevé qui relèverait du mode Lire.' },
        { id: 'experience', label: 'Expérience : le visiteur vient découvrir l’univers du chantier.', why: 'L’Expérience concerne les surfaces où l’œuvre mène (portfolio, galerie), pas une page qui doit convaincre.' },
      ],
      answer: 'persuade',
      explanation: `impeccable est explicite : on choisit le mode **d’après la surface demandée, pas d’après le produit**. La page d’accueil d’un outil relève du mode Persuader ; l’index de sa documentation, du mode Lire ; l’application elle-même, du mode Opérer.

Concrètement, cette page doit rendre l’offre compréhensible et désirable, exposer une action claire et prouver ce que seul Relevé sait faire, avec un engagement visuel fort qu’un écran de travail ne s’autoriserait pas.`,
      takeaway: 'La page d’accueil d’un outil se conçoit en mode Persuader ; l’outil lui-même, en mode Opérer.',
      sources: ['imp:skill'],
    },
    {
      id: 'modes-persuade-action-duel',
      type: 'choice',
      difficulty: 1,
      context: 'Page d’accueil d’un cabinet de kinésithérapie. La plupart des visiteurs viennent pour prendre rendez-vous.',
      prompt: 'Quel premier écran sert le mieux ces visiteurs ?',
      options: [
        {
          id: 'link',
          visual: {
            alt: 'Premier écran avec une image d’ambiance, le titre « Votre bien-être, notre priorité », un bouton « Découvrir le cabinet » et un lien « Prendre rendez-vous ».',
            frame: 'browser',
            html: `<div class="kin">
  <div class="kin-nav"><strong>Kiné du Parc</strong><span>Le cabinet</span><span>Contact</span></div>
  <div class="kin-main">
    <div class="kin-img"></div>
    <p class="kin-h">Votre bien-être, notre priorité</p>
    <p class="kin-p">Une équipe à votre écoute pour vous accompagner au quotidien.</p>
    <div class="kin-acts"><span class="mk-btn kin-btn">Découvrir le cabinet</span><span class="kin-link">Prendre rendez-vous <i data-icon="arrow-right" style="--ico:14px"></i></span></div>
  </div>
</div>`,
            css: `.kin { color: #1d2a2a; }
.kin-nav { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; padding: 10px 16px; font-size: 13px; }
.kin-nav strong { margin-inline-end: auto; font-size: 14px; }
.kin-main { padding: 0 16px 18px; }
.kin-img { height: 84px; border-radius: 10px; background: linear-gradient(135deg, #cfe3dc 0%, #a9cbbf 50%, #e8f1ed 100%); }
.kin-h { margin-top: 12px; font-size: 21px; line-height: 1.2; font-weight: 750; }
.kin-p { margin-top: 4px; font-size: 13px; color: #4a5a58; }
.kin-acts { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 14px; }
.kin-btn { background: #2c6e5f; }
.kin-link { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: #2c6e5f; text-decoration: underline; text-underline-offset: 3px; }`,
          },
          why: 'Le lien renvoie l’action ailleurs : il faut encore chercher un créneau sur une autre page. Le titre pourrait être celui de n’importe quel cabinet.',
        },
        {
          id: 'slots',
          visual: {
            alt: 'Premier écran avec le titre « Kinésithérapie à Lyon 6e », les conditions (conventionné, carte Vitale) et quatre boutons de créneaux libres, d’« Aujourd’hui 18:15 » à « Jeudi 17:00 ».',
            frame: 'browser',
            html: `<div class="kin">
  <div class="kin-nav"><strong>Kiné du Parc</strong><span>12 rue Duquesne, Lyon 6e</span></div>
  <div class="kin-main">
    <p class="kin-h">Kinésithérapie à Lyon 6e&nbsp;: rééducation, sport, dos</p>
    <p class="kin-p">Conventionné · carte Vitale acceptée · accès de plain-pied</p>
    <p class="kin-lbl">Prochains créneaux disponibles</p>
    <div class="kin-slots"><span class="kin-slot">Aujourd’hui<b>18:15</b></span><span class="kin-slot">Demain<b>08:30</b></span><span class="kin-slot">Demain<b>12:45</b></span><span class="kin-slot">Jeudi<b>17:00</b></span></div>
    <span class="kin-link">Voir tout l’agenda</span>
  </div>
</div>`,
            css: `.kin { color: #1d2a2a; }
.kin-nav { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; padding: 10px 16px; font-size: 13px; color: #4a5a58; }
.kin-nav strong { margin-inline-end: auto; font-size: 14px; color: #1d2a2a; }
.kin-main { padding: 4px 16px 18px; }
.kin-h { font-size: 21px; line-height: 1.2; font-weight: 750; }
.kin-p { margin-top: 4px; font-size: 13px; color: #4a5a58; }
.kin-lbl { margin-top: 14px; font-size: 13px; font-weight: 650; }
.kin-slots { display: grid; grid-template-columns: repeat(auto-fit, minmax(84px, 1fr)); gap: 6px; margin-top: 6px; }
.kin-slot { display: flex; flex-direction: column; align-items: center; padding: 7px 4px; border-radius: 8px; background: #2c6e5f; color: #fff; font-size: 12px; }
.kin-slot b { font-size: 15px; font-variant-numeric: tabular-nums; }
.kin-link { display: inline-block; margin-top: 10px; font-size: 13px; color: #2c6e5f; text-decoration: underline; text-underline-offset: 3px; }`,
          },
          why: 'Les créneaux libres sont l’action de la catégorie sous sa forme opérante : un clic suffit pour réserver.',
        },
      ],
      answer: 'slots',
      explanation: `Sur une surface Persuader, impeccable demande que le premier écran expose **l’action que les visiteurs de la catégorie viennent faire, sous sa forme opérante** : les créneaux libres d’un cabinet, la recherche trajet et dates d’une compagnie aérienne, l’ajout au panier d’une boutique. **Un lien décoratif qui pointe vers elle ailleurs ne compte pas.**

Chaque étape ajoutée entre l’intention et l’action fait décrocher une partie des visiteurs. Les créneaux affichés servent aussi de preuve : ce cabinet a de la disponibilité, et tout de suite.`,
      takeaway: 'En Persuader, mets l’action réelle de la catégorie dans le premier écran, sous sa forme opérante, pas un lien vers elle.',
      sources: ['imp:mode-persuade'],
    },
    {
      id: 'modes-operate-costume-duel',
      type: 'choice',
      difficulty: 1,
      context: 'Supervision des serveurs d’un hébergeur. La direction artistique retenue s’inspire des terminaux informatiques.',
      prompt: 'Quel écran respecte le mieux le mode Opérer ?',
      options: [
        {
          id: 'costume',
          visual: {
            alt: 'Écran noir façon terminal : invite de commande verte, tableau en texte aligné, curseur et barre de touches F1 Aide, F2 Filtrer, F3 Exporter, F10 Quitter.',
            html: `<div class="tty">
  <p class="tty-l"><span class="tty-p">ondine@supervision:~$</span> services --etat</p>
<pre class="tty-out">SERVICE        ÉTAT     P95
auth           DÉGRADÉ  1840 ms
api-paiements  OK       212 ms
file-emails    OK       95 ms
base-clients   OK       38 ms</pre>
  <p class="tty-l"><span class="tty-p">ondine@supervision:~$</span> <span class="tty-cur"></span></p>
  <div class="tty-keys"><span><b>F1</b>Aide</span><span><b>F2</b>Filtrer</span><span><b>F3</b>Exporter</span><span><b>F10</b>Quitter</span></div>
</div>`,
            css: `.tty { background: #0c0f0d; color: #7ee2a0; padding: 14px 14px 0; font: 12px/1.5 "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; }
.tty-p { color: #3fb86b; }
.tty-out { margin: 8px 0; font: inherit; white-space: pre; overflow: hidden; }
.tty-cur { display: inline-block; width: 8px; height: 15px; vertical-align: -3px; background: #7ee2a0; }
.tty-keys { display: flex; flex-wrap: wrap; gap: 4px 12px; margin: 12px -14px 0; padding: 6px 14px; background: #1a2a20; font-size: 12px; }
.tty-keys b { margin-inline-end: 4px; padding: 0 4px; background: #7ee2a0; color: #0c0f0d; }`,
          },
          why: 'Invite de commande et touches de fonction rejouent l’interface d’un terminal : il faut apprendre ce faux outil avant de pouvoir travailler.',
        },
        {
          id: 'product',
          visual: {
            alt: 'Écran de supervision avec un en-tête graphite à onglets, un filtre de région, un champ de recherche et un tableau trié par latence : pastilles d’état « Dégradé » et « Normal », et pour chaque service un petit histogramme de la latence récente.',
            html: `<div class="ond">
  <div class="ond-top"><strong class="ond-brand">Ondine</strong><div class="ond-tabs"><span class="on">Services</span><span>Incidents</span><span>Déploiements</span></div></div>
  <div class="ond-body">
    <div class="ond-tools"><span class="ond-select">Région&nbsp;: Paris-1 <i data-icon="chevron-down" style="--ico:14px"></i></span><span class="ond-search"><i data-icon="search" style="--ico:14px"></i>Filtrer les services</span></div>
    <table class="ond-table">
      <thead><tr><th>Service</th><th>État</th><th class="num">Latence p95 (ms) <i data-icon="chevron-down" style="--ico:12px"></i></th></tr></thead>
      <tbody>
        <tr><td class="mono">auth</td><td><span class="ond-st ond-st--warn">Dégradé</span></td><td class="num"><span class="ond-lat"><span class="ond-spark ond-spark--warn"><span style="height:3px"></span><span style="height:4px"></span><span style="height:3px"></span><span style="height:4px"></span><span style="height:3px"></span><span style="height:9px"></span><span style="height:12px"></span><span style="height:12px"></span></span><span class="mono">1&#8239;840</span></span></td></tr>
        <tr><td class="mono">api-paiements</td><td><span class="ond-st">Normal</span></td><td class="num"><span class="ond-lat"><span class="ond-spark"><span style="height:5px"></span><span style="height:6px"></span><span style="height:5px"></span><span style="height:7px"></span><span style="height:6px"></span><span style="height:5px"></span><span style="height:6px"></span><span style="height:5px"></span></span><span class="mono">212</span></span></td></tr>
        <tr><td class="mono">file-emails</td><td><span class="ond-st">Normal</span></td><td class="num"><span class="ond-lat"><span class="ond-spark"><span style="height:3px"></span><span style="height:4px"></span><span style="height:3px"></span><span style="height:3px"></span><span style="height:4px"></span><span style="height:3px"></span><span style="height:4px"></span><span style="height:3px"></span></span><span class="mono">95</span></span></td></tr>
        <tr><td class="mono">base-clients</td><td><span class="ond-st">Normal</span></td><td class="num"><span class="ond-lat"><span class="ond-spark"><span style="height:2px"></span><span style="height:2px"></span><span style="height:3px"></span><span style="height:2px"></span><span style="height:2px"></span><span style="height:3px"></span><span style="height:2px"></span><span style="height:2px"></span></span><span class="mono">38</span></span></td></tr>
      </tbody>
    </table>
  </div>
</div>`,
            css: `.ond { background: #f5f6f4; color: #14181a; }
.ond-top { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 16px; padding: 0 14px; background: #14181a; color: #c7d0d6; }
.ond-brand { padding: 10px 0; color: #fff; }
.ond-tabs { display: flex; gap: 2px; font-size: 13px; }
.ond-tabs span { padding: 10px 8px; }
.ond-tabs .on { color: #fff; box-shadow: inset 0 -2px 0 #3fb86b; }
.ond-body { padding: 12px 14px 14px; }
.ond-tools { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.ond-select, .ond-search { display: inline-flex; align-items: center; gap: 6px; min-height: 30px; padding: 0 10px; border: 1px solid #c4cbc7; border-radius: 6px; background: #fff; font-size: 12px; }
.ond-search { color: #5b6470; flex: 1; min-width: 130px; }
.ond-table { width: 100%; border-collapse: collapse; font-size: 13px; background: #fff; border: 1px solid #dde2df; border-radius: 8px; }
.ond-table th { text-align: start; padding: 7px 6px; font-size: 12px; font-weight: 600; color: #4c555b; border-bottom: 1px solid #dde2df; }
.ond-table td { padding: 7px 6px; border-bottom: 1px solid #edf0ee; }
.ond-table .num { text-align: end; }
.mono { font-family: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; font-size: 12px; white-space: nowrap; }
.ond-st { display: inline-block; padding: 1px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #e3f4e8; color: #1d6b3c; }
.ond-st--warn { background: #fdf0d5; color: #7a4b00; }
.ond-lat { display: inline-flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 3px 8px; }
.ond-spark { display: inline-flex; align-items: flex-end; gap: 1px; height: 12px; }
.ond-spark > span { width: 3px; background: #2a8a4f; }
.ond-spark--warn > span:nth-last-child(-n+3) { background: #b7791f; }`,
          },
          why: 'Onglets, filtres et tableau triable sont des contrôles standard ; le monde prête la palette graphite et verte, la densité, le monospace des valeurs et un geste : la latence récente en barres serrées, comme un graphique en caractères de terminal.',
        },
      ],
      answer: 'product',
      explanation: `En mode Opérer, l’univers visuel ne prête que **quatre choses** : typographie, palette, densité et un geste signature. Il ne fournit **jamais** la mise en page, la navigation ni les contrôles.

Un monde tiré d’un outil que le public utilise (terminal, oscilloscope, cockpit) revient comme un **costume** : barre de touches de fonction, invite de commande, cadran d’instrument. Le test d’impeccable : un ingénieur pourrait-il construire cet écran avec les composants standard de la plateforme ? Sinon, c’est une image de l’outil, pas l’outil.`,
      takeaway: 'En Opérer, le monde prête typo, palette, densité et un geste signature ; navigation et contrôles restent standard.',
      sources: ['imp:mode-operate'],
    },
    {
      id: 'modes-read-column-duel',
      type: 'choice',
      difficulty: 2,
      context: 'Documentation de l’API d’un service de prévisions marines. Le monde retenu : les cartes marines.',
      prompt: 'Quelle page de documentation sert le mieux son lecteur ?',
      options: [
        {
          id: 'invaded',
          visual: {
            alt: 'Page bleu nuit quadrillée comme une carte, tout en monospace, titre en capitales espacées, une rose des vents avec quatre caps libellés et la requête écrite dans le paragraphe.',
            html: `<div class="alb">
  <div class="alb-rose"><svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="#8fb8d8" stroke-width="1"/><path d="M20 3 L23 20 L20 37 L17 20 Z" fill="#8fb8d8"/><path d="M3 20 L20 17 L37 20 L20 23 Z" fill="none" stroke="#8fb8d8"/></svg><span>Choisissez un cap&nbsp;:<br>N Démarrer · E Houle · S Vent · O Marées</span></div>
  <p class="alb-h">PRÉVISIONS DE HOULE</p>
  <p class="alb-p">Le point d’accès renvoie la hauteur significative, la période et la direction de la houle pour une position donnée, par pas de trois heures, sur sept jours. Requête&nbsp;: GET /v1/houle?lat=47.29&amp;lon=-2.51</p>
</div>`,
            css: `.alb { padding: 16px; color: #8fb8d8; background-color: #0b2236; background-image: linear-gradient(rgb(143 184 216 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(143 184 216 / 0.16) 1px, transparent 1px); background-size: 22px 22px; font: 13px/1.55 "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; }
.alb-rose { display: flex; align-items: center; gap: 10px; font-size: 11px; }
.alb-rose svg { flex: none; }
.alb-h { margin: 16px 0 8px; letter-spacing: .22em; font-size: 15px; color: #e8f0f6; }
.alb-p { max-width: 46ch; }`,
          },
          why: 'Quadrillage, monospace et rose des vents ont envahi la colonne : la page se lit comme une carte avant de se lire comme une documentation, et la navigation est à apprendre.',
        },
        {
          id: 'framed',
          visual: {
            alt: 'Page avec un en-tête bleu nuit traversé de courbes de profondeur et bordé d’une graduation claire et sombre, un rail de navigation où « Houle » est sélectionné, un fil d’Ariane, un titre, un paragraphe en linéale et un bloc de code bleu nuit.',
            html: `<div class="alz">
  <div class="alz-mast"><svg class="alz-iso" viewBox="0 0 320 48" preserveAspectRatio="none" aria-hidden="true"><path d="M0 42 C60 42 100 32 160 28 S250 38 280 42 S312 43 320 43"/><path d="M0 47 C60 47 100 38 160 35 S250 42 280 46 S312 47 320 47"/></svg><strong>Alizé</strong><span>API · v1</span></div>
  <div class="alz-grid">
    <nav class="alz-rail"><span>Démarrer</span><span>Authentification</span><span class="on">Houle</span><span>Vent</span><span>Marées</span></nav>
    <div class="alz-col">
      <p class="alz-crumb">Prévisions › Houle</p>
      <p class="alz-h">Prévisions de houle</p>
      <p class="alz-p">Renvoie la hauteur significative, la période et la direction de la houle pour une position, par pas de 3 heures sur 7 jours.</p>
      <pre class="alz-code"><b>GET</b> /v1/houle?lat=47.29&amp;lon=-2.51</pre>
    </div>
  </div>
</div>`,
            css: `.alz { background: #fff; color: #1c2733; container-type: inline-size; }
.alz-mast { position: relative; display: flex; justify-content: space-between; align-items: baseline; padding: 12px 16px 18px; color: #e8f0f6; background: #0b2236; }
.alz-mast::after { content: ""; position: absolute; inset-inline: 0; bottom: 0; height: 6px; border-block: 1px solid #c9dbe8; background: repeating-linear-gradient(90deg, #c9dbe8 0 12px, #0b2236 12px 24px); }
.alz-iso { position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 6px); fill: none; stroke: #8fb8d8; stroke-width: 1; opacity: .5; }
.alz-iso path { vector-effect: non-scaling-stroke; }
.alz-mast strong, .alz-mast span { position: relative; }
.alz-mast strong { font-size: 16px; letter-spacing: .04em; }
.alz-mast span { font-size: 12px; }
.alz-grid { display: grid; grid-template-columns: minmax(96px, 120px) minmax(0, 1fr); }
.alz-rail { display: flex; flex-direction: column; gap: 2px; padding: 10px 8px; background: #eef3f7; font-size: 12px; color: #3c4b59; }
.alz-rail span { padding: 5px 8px; border-radius: 6px; }
.alz-rail .on { background: #d5e3ee; color: #0b2236; font-weight: 650; }
.alz-col { padding: 12px 16px 16px; min-width: 0; }
.alz-crumb { font-size: 12px; color: #5b6470; }
.alz-h { margin: 4px 0 6px; font-size: 20px; font-weight: 700; line-height: 1.2; }
.alz-p { font-size: 14px; line-height: 1.6; max-width: 62ch; }
.alz-code { margin-top: 10px; padding: 8px 10px; border-radius: 6px; background: #0b2236; color: #e8f0f6; font: 12px/1.5 "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; white-space: pre-wrap; word-break: break-all; }
.alz-code b { color: #8fd3c0; }
@container (max-width: 420px) {
  .alz-grid { grid-template-columns: 1fr; }
  .alz-rail { flex-direction: row; flex-wrap: wrap; }
}`,
          },
          why: 'La carte marine tient l’en-tête (courbes de profondeur, graduation de bordure) et le bloc de code ; la colonne garde une police de lecture, un vrai contraste et une navigation standard.',
        },
      ],
      answer: 'framed',
      explanation: `En mode Lire, **le monde possède le cadre et sert la colonne**. L’en-tête, le rail, le fond, les ouvertures de section et la façon de composer le code portent la palette et le geste signature. La colonne de lecture, elle, reste calme : police de lecture, vrai contraste, rien qui s’agite derrière le texte. À taille réelle, elle tient aussi une vraie mesure (environ 60 à 75 caractères, corps proche de 16 px).

Le monospace est réservé au code, aux paramètres et aux petits libellés. Quand le quadrillage, le monospace et une navigation « boussole » envahissent la colonne, la page se lit comme un objet du monde avant de se lire comme une documentation : il faut ramener le monde au cadre.`,
      takeaway: 'En Lire, engage le monde dans le cadre (en-tête, rail, code) et garde la colonne de lecture calme.',
      sources: ['imp:mode-read'],
    },
    {
      id: 'modes-persuade-traps-choice',
      type: 'choice',
      difficulty: 3,
      context:
        'Page d’accueil du Fournil Lebrun, une boulangerie qui prend désormais les commandes en ligne pour le week-end. Le monde retenu : la devanture de la boutique.',
      prompt: 'Quelle page d’accueil sert le mieux le Fournil, dans le monde retenu ?',
      options: [
        {
          id: 'poster',
          visual: {
            alt: 'Page dessinée comme une devanture : store rayé, enseigne « Fournil Lebrun », vitrine sombre avec un lettrage doré et une porte portant le mot « commander ».',
            html: `<div class="flp">
  <div class="flp-awning"></div>
  <div class="flp-facade">
    <p class="flp-sign">FOURNIL LEBRUN</p>
    <div class="flp-front">
      <div class="flp-window"><p>Pains au levain<br>Viennoiseries<br>Commandes du week-end</p></div>
      <div class="flp-door"><span>commander</span></div>
    </div>
  </div>
</div>`,
            css: `.flp { background: #6b3f2a; }
.flp-awning { height: 30px; background: repeating-linear-gradient(90deg, #f3e7d3 0 18px, #9e2b25 18px 36px); border-bottom: 4px solid #7d221d; }
.flp-facade { padding: 14px 16px 0; }
.flp-sign { padding: 8px; text-align: center; font: 700 20px/1.1 Georgia, "Liberation Serif", serif; letter-spacing: .12em; color: #f0c86a; background: #2d1b12; border: 2px solid #f0c86a; }
.flp-front { display: flex; gap: 10px; margin-top: 12px; align-items: flex-end; }
.flp-window { flex: 1; min-height: 120px; display: grid; place-items: center; padding: 10px; background: linear-gradient(160deg, #3a4b52, #1f2b30); border: 6px solid #3d2418; }
.flp-window p { text-align: center; font: italic 15px/1.5 Georgia, "Liberation Serif", serif; color: #e3c27a; }
.flp-door { width: 64px; height: 150px; display: grid; place-items: center; background: #3d2418; border: 4px solid #2d1b12; border-bottom: 0; }
.flp-door span { font: italic 10px Georgia, "Liberation Serif", serif; color: #c9a86a; transform: rotate(-90deg); }`,
          },
          why: 'Le monde est peint, pas habité : aucune partie ne fonctionne, ni navigation lisible ni action qu’on reconnaît comme cliquable.',
        },
        {
          id: 'template',
          visual: {
            alt: 'Page brun bois sous un store rayé : titre doré centré « Le goût de l’authentique », un sous-titre, un bouton rouge « Découvrir » et trois cartes identiques à icône, encadrées de bois : Pains, Brioches, Gâteaux.',
            html: `<div class="tpl">
  <div class="tpl-awning"></div>
  <div class="tpl-body">
    <p class="tpl-h">Le goût de l’authentique</p>
    <p class="tpl-p">Des produits frais, faits maison, chaque jour.</p>
    <span class="mk-btn tpl-btn">Découvrir</span>
    <div class="tpl-cards">
      <div class="tpl-card"><span class="tpl-ico"><i data-icon="sprout" style="--ico:16px"></i></span><b>Pains</b><span>Cuits chaque matin.</span></div>
      <div class="tpl-card"><span class="tpl-ico"><i data-icon="coffee" style="--ico:16px"></i></span><b>Brioches</b><span>Pur beurre.</span></div>
      <div class="tpl-card"><span class="tpl-ico"><i data-icon="gift" style="--ico:16px"></i></span><b>Gâteaux</b><span>Faits maison.</span></div>
    </div>
  </div>
</div>`,
            css: `.tpl { text-align: center; background: #6b3f2a; }
.tpl-awning { height: 12px; background: repeating-linear-gradient(90deg, #f3e7d3 0 18px, #9e2b25 18px 36px); }
.tpl-body { padding: 20px 14px 18px; }
.tpl-h { font: 700 23px/1.2 Georgia, "Liberation Serif", serif; color: #f0c86a; }
.tpl-p { margin-top: 6px; font-size: 13px; color: #f3e7d3; }
.tpl-btn { margin-top: 12px; background: #9e2b25; }
.tpl-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 18px; }
.tpl-card { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; background: #fbf6ec; border: 3px solid #3d2418; font-size: 12px; color: #6b5a48; }
.tpl-card b { color: #2d1b12; font-size: 13px; }
.tpl-ico { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: #2d1b12; color: #f0c86a; }`,
          },
          why: 'Titre centré, sous-titre, bouton et rangée de cartes égales : même peint aux couleurs de la devanture, c’est le gabarit de la catégorie.',
        },
        {
          id: 'carried',
          visual: {
            alt: 'Page avec un store rayé fin, une enseigne portant le nom et trois liens soulignés, puis une vitrine encadrée de bois avec un formulaire de réservation de pain et un bouton « Réserver pour samedi ».',
            html: `<div class="flc">
  <div class="flc-awning"></div>
  <div class="flc-sign"><strong>Fournil Lebrun</strong><nav><span>Nos pains</span><span>Commander</span><span>Horaires</span></nav></div>
  <div class="flc-window">
    <p class="flc-h">Réservez votre pain pour samedi</p>
    <div class="flc-item"><span>Miche au levain, 1&nbsp;kg</span><b>6,40&nbsp;€</b></div>
    <div class="flc-row"><span class="flc-qty"><i data-icon="minus" style="--ico:14px"></i><b>1</b><i data-icon="plus" style="--ico:14px"></i></span><span class="flc-sel">Retrait samedi, 8&nbsp;h – 13&nbsp;h <i data-icon="chevron-down" style="--ico:14px"></i></span></div>
    <span class="mk-btn mk-btn--block flc-btn">Réserver pour samedi</span>
    <p class="flc-meta">12 rue des Halles, Nantes · paiement au retrait</p>
  </div>
</div>`,
            css: `.flc { background: #6b3f2a; padding-bottom: 14px; }
.flc-awning { height: 12px; background: repeating-linear-gradient(90deg, #f3e7d3 0 18px, #9e2b25 18px 36px); }
.flc-sign { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 4px 12px; padding: 10px 16px; background: #2d1b12; color: #f0c86a; }
.flc-sign strong { font: 700 18px/1.2 Georgia, "Liberation Serif", serif; letter-spacing: .06em; }
.flc-sign nav { display: flex; gap: 12px; font-size: 13px; }
.flc-sign nav span { color: #f6e3b5; text-decoration: underline; text-underline-offset: 3px; }
.flc-window { margin: 12px 14px 0; padding: 14px; background: #fbf6ec; border: 6px solid #3d2418; color: #2d1b12; }
.flc-h { font: 700 19px/1.2 Georgia, "Liberation Serif", serif; }
.flc-item { display: flex; justify-content: space-between; gap: 8px; margin-top: 10px; padding: 8px 0; border-block: 1px solid #e3d6c1; font-size: 14px; }
.flc-item b { font-variant-numeric: tabular-nums; }
.flc-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.flc-qty, .flc-sel { display: inline-flex; align-items: center; gap: 10px; min-height: 34px; padding: 0 10px; border: 1px solid #c9b79c; border-radius: 6px; background: #fff; font-size: 13px; }
.flc-sel { flex: 1; min-width: 150px; justify-content: space-between; }
.flc-btn { margin-top: 10px; background: #9e2b25; }
.flc-meta { margin-top: 8px; font-size: 12px; color: #6b5a48; }`,
          },
          why: 'La devanture porte la page sans l’absorber : l’enseigne sert de navigation lisible, la vitrine accueille une commande qui fonctionne.',
        },
      ],
      answer: 'carried',
      explanation: `impeccable décrit deux extrêmes qui effacent une direction : **l’affiche peinte** (un écran dessiné comme une façade, sans partie qui fonctionne) et **la page produit générique** (un titre au-dessus d’un sous-titre et d’un bouton, une rangée de cartes égales), qui reste un gabarit quel que soit le monde qui la peint.

Entre les deux, **le monde porte la page sans l’absorber** : la navigation posée dans l’enseigne se lit comme des liens, le texte de la vitrine se lit comme du texte, l’action est évidemment cliquable. Et cette action est celle de la catégorie, sous sa forme opérante : réserver son pain pour samedi.`,
      takeaway: 'En Persuader, le monde porte les parties de la page sans les absorber : liens lisibles, texte lisible, action évidente.',
      sources: ['imp:mode-persuade'],
    },
    {
      id: 'modes-operate-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Tableau de bord des stations d’un service de vélos en libre-service. Le monde retenu : la signalétique des stations.',
      prompt: 'Trouve les deux éléments qui sortent du mode Opérer.',
      visual: {
        alt: 'Tableau de bord avec un rail de navigation bleu, un bouton rotatif pour choisir la période, une ligne schématique des stations, une alerte rouge et une liste des stations en italique à empattements.',
        html: `<div class="vel-wrap"><div class="vel">
  <nav class="vel-rail" data-hotspot="rail"><strong>Vélo Rade</strong><span class="on"><i data-icon="map-pin" style="--ico:15px"></i>Stations</span><span><i data-icon="bike" style="--ico:15px"></i>Vélos</span><span><i data-icon="settings" style="--ico:15px"></i>Interventions</span></nav>
  <div class="vel-main">
    <div class="vel-head"><p class="vel-h">Stations</p><div class="vel-period" data-hotspot="knob"><span class="vel-plbl">Période</span><div class="vel-knob"><span class="vel-dial"></span><span class="vel-t vel-t1">J</span><span class="vel-t vel-t2">S</span><span class="vel-t vel-t3">M</span></div></div></div>
    <div class="vel-line" data-hotspot="line"><span class="vel-st vel-st--empty"></span><span class="vel-st"></span><span class="vel-st"></span><span class="vel-st vel-st--full"></span><small>Ligne du port&nbsp;: 4&nbsp;stations</small></div>
    <div class="vel-alert" data-hotspot="alert"><i data-icon="triangle-alert" style="--ico:16px"></i><span>Port de commerce vide depuis 40&nbsp;min</span><b>Planifier un réassort</b></div>
    <ul class="vel-list" data-hotspot="font"><li><span>Port de commerce</span><b>0 / 20</b></li><li><span>Saint-Martin</span><b>7 / 16</b></li><li><span>Capucins</span><b>12 / 24</b></li></ul>
  </div>
</div></div>`,
        css: `.vel { display: grid; grid-template-columns: minmax(92px, 118px) minmax(0, 1fr); background: #f6f8fb; color: #14243a; font-size: 13px; }
.vel-rail { display: flex; flex-direction: column; gap: 4px; padding: 12px 8px; background: #12355b; color: #c9d7ea; }
.vel-rail strong { padding: 0 6px 8px; color: #fff; }
.vel-rail span { display: flex; align-items: center; gap: 6px; padding: 6px; border-radius: 6px; font-size: 12px; }
.vel-rail .on { background: #1f4d80; color: #fff; }
.vel-main { padding: 12px; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.vel-head { display: flex; justify-content: space-between; align-items: center; }
.vel-h { font-size: 17px; font-weight: 700; }
.vel-period { display: flex; align-items: center; gap: 4px; }
.vel-plbl { font-size: 12px; font-weight: 600; color: #4b5a6e; }
.vel-knob { position: relative; width: 70px; height: 58px; }
.vel-dial { position: absolute; left: 17px; top: 18px; width: 36px; height: 36px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, #c5ced9); border: 1px solid #8794a6; }
.vel-dial::after { content: ""; position: absolute; left: 16px; top: 3px; width: 3px; height: 13px; border-radius: 2px; background: #12355b; transform-origin: 1.5px 15px; transform: rotate(-40deg); }
.vel-t { position: absolute; font-size: 11px; line-height: 1; font-weight: 700; color: #4b5a6e; }
.vel-t1 { left: 9px; top: 9px; } .vel-t2 { left: 31px; top: 2px; } .vel-t3 { left: 52px; top: 9px; }
.vel-line { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 8px 10px 22px; background: #fff; border: 1px solid #dfe5ee; border-radius: 8px; }
.vel-line::before { content: ""; position: absolute; left: 16px; right: 16px; top: 15px; height: 4px; border-radius: 2px; background: #12355b; }
.vel-st { position: relative; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 3px solid #12355b; }
.vel-st--empty { border-color: #c42b2b; }
.vel-st--full { background: #12355b; }
.vel-line small { position: absolute; left: 10px; bottom: 4px; font-size: 11px; color: #4b5a6e; }
.vel-alert { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; padding: 8px 10px; border-radius: 8px; background: #fdecea; color: #8a1f17; border: 1px solid #f3c2bc; font-size: 12px; }
.vel-alert b { margin-inline-start: auto; text-decoration: underline; text-underline-offset: 2px; }
.vel-list { list-style: none; padding: 0; margin: 0; font-family: "Playfair Display", Georgia, "Liberation Serif", serif; font-style: italic; font-size: 15px; letter-spacing: .02em; }
.vel-list li { display: flex; justify-content: space-between; padding: 6px 2px; border-bottom: 1px solid #e3e8ef; }
.vel-wrap { container-type: inline-size; }
@container (max-width: 440px) {
  .vel { grid-template-columns: 1fr; }
  .vel-rail { flex-direction: row; flex-wrap: wrap; align-items: center; padding: 8px 10px; }
  .vel-rail strong { padding: 0 8px 0 4px; }
}`,
      },
      hotspots: [
        { id: 'knob', label: 'Bouton rotatif de période', correct: true, why: 'Un contrôle réinventé pour le style : un bouton à tourner remplace des onglets ou un sélecteur que tout le monde sait utiliser.' },
        { id: 'font', label: 'Liste des stations en italique à empattements', correct: true, why: 'Une police choisie pour l’effet (italique à empattements, approche élargie) dans les données d’un tableau de bord : impeccable exclut les polices d’affichage des libellés, boutons et données.' },
        { id: 'rail', label: 'Rail de navigation coloré', correct: false, why: 'Une navigation standard dans une coque colorée : la couleur fait ici un vrai travail.' },
        { id: 'line', label: 'Ligne schématique des stations', correct: false, why: 'C’est le geste signature, tiré de la signalétique : il ajoute une lecture sans remplacer un contrôle.' },
        { id: 'alert', label: 'Alerte rouge « station vide »', correct: false, why: 'Une couleur d’état posée là où elle porte un sens, avec l’action utile à côté.' },
      ],
      explanation: `La surface produit a ses interdits explicites chez impeccable :

- **pas d’affordance standard réinventée pour le style** (barres de défilement maison, contrôles de formulaire étranges, modales non standard). Choisir une période se fait avec des onglets ou un sélecteur, pas avec un cadran ;
- **pas de police d’affichage dans les libellés, boutons et données**, ni de police choisie pour l’effet comme cette italique à empattements à l’approche élargie. Une liste de stations se lit d’un coup d’œil en linéale régulière, avec des chiffres tabulaires.

Le reste est à sa place : coque colorée, couleur d’état porteuse de sens, et un geste signature qui ajoute une lecture de la ligne sans remplacer aucun contrôle.`,
      takeaway: 'En Opérer, contrôles standard et police de lecture pour les données ; le monde prête typo, palette, densité et un geste signature, jamais une police d’affichage ni un contrôle réinventé.',
      sources: ['imp:operate', 'imp:mode-operate'],
    },
    {
      id: 'modes-read-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Documentation de l’API d’un réseau régional de trains. Le monde retenu : l’indicateur horaire imprimé.',
      prompt: 'Trouve les deux éléments qui sortent du mode Lire.',
      visual: {
        alt: 'Page de documentation avec un en-tête vert portant trois horaires, puis une rangée de boutons Quai A à Quai D avec la consigne « Montez sur un quai pour changer de chapitre », un paragraphe en monospace, un exemple de requête et un tableau de paramètres.',
        html: `<div class="rlo">
  <div class="rlo-mast" data-hotspot="mast"><strong>Rail Ouest</strong><span>API des horaires</span><span class="rlo-times">06:12 · 06:42 · 07:12</span></div>
  <div class="rlo-body">
    <div class="rlo-quais" data-hotspot="quai"><span class="rlo-q">Quai A</span><span class="rlo-q rlo-q--on">Quai B</span><span class="rlo-q">Quai C</span><span class="rlo-q">Quai D</span><small>Montez sur un quai pour changer de chapitre</small></div>
    <p class="rlo-h">Rechercher des départs</p>
    <p class="rlo-mono" data-hotspot="mono">Cette requête renvoie les prochains départs d’une gare, triés par heure, avec le quai, le retard estimé et la composition du train.</p>
    <pre class="rlo-code" data-hotspot="code">GET /v2/departs?gare=87471003</pre>
    <table class="rlo-table" data-hotspot="table"><thead><tr><th>Paramètre</th><th>Description</th></tr></thead><tbody><tr><td><code>gare</code></td><td>Code UIC de la gare</td></tr><tr><td><code>limite</code></td><td>Nombre de départs (20 au plus)</td></tr></tbody></table>
  </div>
</div>`,
        css: `.rlo { background: #fff; color: #17211c; }
.rlo-mast { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; padding: 10px 16px; background: #0f3d2e; color: #e6f2ec; font-size: 12px; }
.rlo-mast strong { font-size: 16px; }
.rlo-times { margin-inline-start: auto; font-variant-numeric: tabular-nums; color: #9fd1b9; }
.rlo-body { padding: 12px 16px 16px; display: flex; flex-direction: column; gap: 8px; }
.rlo-quais { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.rlo-q { padding: 4px 8px; border: 1px dashed #7a8a82; font-size: 11px; font-weight: 700; color: #3d4a43; }
.rlo-q--on { background: #f2b33d; border-style: solid; border-color: #b57f12; color: #17211c; }
.rlo-quais small { width: 100%; font-size: 11px; color: #56645c; }
.rlo-h { margin-top: 10px; font-size: 18px; font-weight: 700; }
.rlo-mono { font: 13px/1.6 "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; max-width: 60ch; }
.rlo-code { padding: 8px 10px; border-radius: 6px; background: #0f3d2e; color: #e6f2ec; font: 12px/1.5 "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; white-space: pre-wrap; }
.rlo-table { border-collapse: collapse; font-size: 12px; }
.rlo-table th, .rlo-table td { text-align: start; padding: 5px 8px; border-bottom: 1px solid #e1e7e3; }
.rlo-table th { color: #4b5a52; font-weight: 600; }
.rlo-table code { font-family: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; font-size: 12px; }`,
      },
      hotspots: [
        { id: 'quai', label: 'Sélecteur de « quais »', correct: true, why: 'La navigation est remplacée par un dispositif qu’il faut apprendre : quel chapitre se cache derrière le quai C ?' },
        { id: 'mono', label: 'Paragraphe en monospace', correct: true, why: 'Le texte courant passe en monospace, un costume « technique » : la colonne de lecture perd sa police de lecture.' },
        { id: 'mast', label: 'En-tête aux couleurs du réseau', correct: false, why: 'Le cadre appartient au monde : couleur, horaires en chiffres tabulaires, c’est là qu’il doit s’engager.' },
        { id: 'code', label: 'Exemple de requête en monospace', correct: false, why: 'Le monospace est à sa place dans un bloc de code, composé ici dans la palette du monde.' },
        { id: 'table', label: 'Tableau des paramètres', correct: false, why: 'Une forme standard que tout lecteur de documentation reconnaît.' },
      ],
      explanation: `En mode Lire, **le monde ne fournit jamais l’ordre de lecture** et ne remplace pas la navigation par un dispositif qu’il faudrait apprendre. Et **la colonne reste calme** : le monospace sert au code, aux paramètres et aux petits libellés, jamais au texte courant.

Tout le reste peut, et doit, porter le monde : l’en-tête, la composition du code, les tableaux. Une documentation qui ne s’engage nulle part pourrait appartenir à n’importe quel produit.`,
      takeaway: 'En Lire, le monde habille le cadre et le code ; il ne remplace ni la navigation ni la police de lecture du texte courant.',
      sources: ['imp:mode-read', 'imp:craft-floor'],
    },
    {
      id: 'modes-fashion-docs-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'La documentation d’une maison de couture peut adopter le mode Persuader, puisque la marque vit de son image.',
      answer: false,
      explanation: `Le mode se choisit d’après **la surface**, pas d’après la marque. impeccable cite justement la documentation d’une maison de mode comme exemple de surface **Lire** : le visiteur y vient pour comprendre (entretenir un tissu, connaître les conditions de retour), pas pour être convaincu.

La marque n’en disparaît pas : en mode Lire, son monde possède le cadre (en-tête, rail, fond, ouvertures de section). Seule la colonne de lecture reste calme.`,
      takeaway: 'Une documentation relève du mode Lire, même pour une marque très expressive : son monde s’exprime dans le cadre.',
      sources: ['imp:skill', 'imp:mode-read'],
    },
    {
      id: 'modes-grey-tf',
      type: 'truefalse',
      difficulty: 3,
      prompt: 'Sur un écran de travail (mode Opérer), un fond gris neutre et une seule couleur d’accent, sans autre couleur, sont la meilleure façon de faire preuve de retenue.',
      answer: false,
      explanation: `La retenue d’Opérer porte sur l’expression (pas de police d’affichage dans les libellés, pas d’animation décorative, pas de contrôles réinventés), pas sur l’absence de couleur. impeccable est net : **un écran gris avec une seule couleur d’accent, c’est le réglage par défaut de la catégorie sans sa finition, pas de la retenue.**

Attention au mot : la stratégie de couleur par défaut d’un produit s’appelle bien *Retenue*, mais ce sont des neutres **teintés par le monde** et un seul accent, et la couleur y garde ses travaux. Ce qui échoue, c’est le gris neutre, non teinté, avec l’accent pour seule couleur.

Dans un produit, la couleur fait de vrais travaux : une coque assumée (rail ou en-tête coloré, fond teinté), les couleurs d’état, les séries de données, la sélection. L’accent, lui, reste réservé aux actions principales, à la sélection et aux indicateurs d’état.`,
      takeaway: 'En Opérer, la Retenue, ce sont des neutres teintés par le monde et un accent, et la couleur y travaille (coque, états, données, sélection) : gris neutre plus un accent n’en est pas.',
      sources: ['imp:mode-operate', 'imp:operate'],
    },
    {
      id: 'modes-refine-copy-choice',
      type: 'choice',
      difficulty: 2,
      context:
        'On te demande d’affiner la page Tarifs d’un logiciel de réservation : espacements, hiérarchie, états des boutons. Tu trouves l’accroche un peu plate, et une affirmation, « Adopté par 4 000 restaurants », dont tu ignores la source.',
      prompt: 'Que fais-tu des textes ?',
      options: [
        { id: 'keep-ask', label: 'Tu gardes les textes et tu demandes à l’équipe avant de remplacer l’accroche ou de toucher au chiffre.', why: 'Affiner préserve les textes ; un texte factuel ne se remplace qu’avec l’accord de l’équipe.' },
        { id: 'rewrite', label: 'Tu réécris l’accroche pour la rendre plus percutante, sans toucher au chiffre.', why: 'Réécrire un texte sort du périmètre d’un affinage : propose ta version, puis demande avant de remplacer.' },
        { id: 'delete', label: 'Tu supprimes l’affirmation non sourcée sans prévenir personne.', why: 'Retirer en silence un contenu factuel modifie aussi la vérité du produit sans accord.' },
        { id: 'redesign', label: 'Tu profites de l’occasion pour proposer une nouvelle identité visuelle.', why: 'Un affinage garde l’identité en place ; changer de monde relève d’une refonte décidée explicitement.' },
      ],
      answer: 'keep-ask',
      explanation: `**Affiner préserve** : l’identité en place, le comportement, les textes et tout ce qui sort du périmètre demandé. impeccable demande explicitement de **demander avant de remplacer un texte factuel ou d’ajouter une affirmation**.

Les affirmations commerciales (prix, clients, chiffres, capacités) ne s’inventent jamais : elles viennent de la vérité fournie par l’équipe. Signaler un doute sur une source est utile ; trancher seul ne l’est pas.`,
      takeaway: 'Affiner préserve identité, comportement et textes : demande avant de toucher un texte factuel ou d’ajouter une affirmation.',
      sources: ['imp:skill', 'imp:new-work'],
    },
    {
      id: 'modes-redesign-choice',
      type: 'choice',
      difficulty: 2,
      context: 'Le client rejette l’apparence actuelle de son site de location de vélos et demande une refonte.',
      prompt: 'Quelle approche correspond à une vraie refonte ?',
      options: [
        { id: 'replace', label: 'Garder contenu, fonctions et contraintes, et choisir un nouveau monde visuel, l’ancien look servant d’anti-modèle.', why: 'C’est la définition d’impeccable : refaire remplace l’apparence, pas la vérité du produit.' },
        { id: 'polish', label: 'Garder la palette et les composants actuels, mais les polir : ombres plus douces, coins plus arrondis, espacements revus.', why: 'C’est couper la poire en deux : polir l’apparence que le client vient de rejeter.' },
        { id: 'everything', label: 'Tout repartir de zéro, y compris l’offre, les tarifs et le parcours de réservation, pour marquer la rupture.', why: 'Une refonte remplace le monde visuel ; le contenu, les fonctions et les contraintes restent.' },
        { id: 'mix', label: 'Mélanger ancien et nouveau style, section par section, pour ménager les habitués pendant la transition.', why: 'Deux mondes sur une page ne font aucune direction : un seul monde possède la page.' },
      ],
      answer: 'replace',
      explanation: `**Refaire remplace.** Une refonte conserve la vérité du produit, le contenu, les fonctions, les affordances natives et les contraintes, mais **traite l’ancien look comme une preuve et un anti-modèle** : il dit ce qu’est le sujet, pas ce qu’il doit devenir. On choisit un monde de remplacement, et DESIGN.md est réécrit en conséquence.

Le piège à éviter : couper la poire en deux, c’est-à-dire polir l’apparence qu’on est censé abandonner.`,
      takeaway: 'Une refonte garde la vérité du produit et remplace le monde visuel ; ne polis jamais l’apparence qu’on abandonne.',
      sources: ['imp:skill', 'imp:new-work'],
    },
    {
      id: 'modes-brief-wins-choice',
      type: 'choice',
      difficulty: 2,
      context:
        'Le brief d’une librairie indépendante impose : « titres en italique à empattements, palette crème et bordeaux, esprit catalogue des années 1950 ». Le détecteur signale deux motifs saturés : le titre italique à empattements et la palette crème.',
      prompt: 'Que fais-tu ?',
      options: [
        { id: 'honor', label: 'Tu gardes les choix imposés, exécutés au plus haut niveau, et tu notes l’exception : « brief client ».', why: 'Le brief gagne : il a décidé de cet axe, le détecteur ne fait que le signaler.' },
        { id: 'swap', label: 'Tu remplaces l’italique par une linéale moderne et le crème par du blanc, pour éviter les clichés.', why: 'Réorienter un brief clair vers ton goût, ou vers un rapport propre, est un échec.' },
        { id: 'half', label: 'Tu gardes la palette mais pas l’italique, pour ne laisser qu’un seul cliché.', why: 'Un brief ne se négocie pas morceau par morceau : chaque choix imposé est honoré.' },
        { id: 'faded', label: 'Tu gardes les deux, mais atténués : italique léger, crème presque blanc.', why: 'Atténuer, c’est encore ne pas honorer le brief ; un monde choisi s’exécute avec engagement.' },
      ],
      answer: 'honor',
      explanation: `**Le brief gagne.** impeccable demande d’honorer l’esthétique, l’époque, les matériaux, les polices et les palettes imposés, **même quand ils entrent en conflit avec un avertissement de motif saturé**. Réorienter un brief clair vers son propre goût est un échec.

Les clichés du détecteur décrivent ce qu’on choisit *par réflexe* quand l’axe est libre. Ici, l’axe n’est pas libre : le brief a tranché. Le travail consiste à exécuter ces choix au plus haut niveau, et à consigner l’exception dans la configuration du détecteur avec sa justification.`,
      takeaway: 'Le brief gagne sur les avertissements de cliché : honore ses choix et consigne l’exception, ne les dilue pas.',
      sources: ['imp:skill', { label: 'impeccable — hooks.md (exceptions du détecteur)', url: 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/hooks.md' }],
    },
    {
      id: 'modes-invention-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces demandes de la moins inventive à la plus inventive, selon la part de design à réinventer.',
      items: [
        { id: 'refine', label: 'Resserrer les espacements du formulaire de contact existant' },
        { id: 'extend', label: 'Ajouter une rubrique « Notifications » à l’écran Réglages existant' },
        { id: 'surface', label: 'Créer la page Tarifs d’un site dont l’identité est déjà établie' },
        { id: 'world', label: 'Remplacer l’identité visuelle d’un site dont le client rejette le look' },
      ],
      explanation: `impeccable dose l’invention selon la portée de la demande :

1. **Affiner** un écran existant préserve l’identité, le comportement, les textes et tout ce qui sort du périmètre : seul le point demandé change.
2. **Étendre une surface** hérite de son monde et de sa composition ; on ne résout que le nouveau besoin, ses états et sa jonction avec l’existant.
3. **Créer une surface entière dans un monde établi** garde le système visuel fixe, mais explore plusieurs structures (cinq à sept) tirées du contenu et de la tâche.
4. **Remplacer le monde** repart du mécanisme du produit, de la scène réelle de son public et de son univers culturel.`,
      takeaway: 'L’invention suit la portée de la demande : affiner, étendre une surface, créer une surface dans un monde établi, puis seulement créer ou remplacer le monde.',
      sources: ['imp:new-work', 'imp:skill'],
    },
    {
      id: 'modes-questions-multi',
      type: 'multi',
      difficulty: 1,
      context: 'Tu démarres l’écran de planification des tournées d’une entreprise de livraison (mode Opérer).',
      prompt: 'Quelles questions poses-tu avant de construire ?',
      options: [
        { id: 'task', label: 'Quelle tâche le répartiteur accomplit-il, et à quelle fréquence ?', why: 'La tâche et la fréquence d’usage sont au cœur d’une surface Opérer.' },
        { id: 'states', label: 'Quels états comptent : tournée en retard, chauffeur absent, aucun colis à répartir ?', why: 'Les états importants changent la conception de l’écran.' },
        { id: 'constraints', label: 'Quelles contraintes s’imposent : écran partagé au dépôt, volume de colis, appareils utilisés ?', why: 'Les contraintes réelles de la scène d’usage orientent densité et lisibilité.' },
        { id: 'hex', label: 'Quelle valeur hexadécimale veux-tu pour le bleu principal, et quel arrondi pour les boutons ?', why: 'Jamais de question sur des valeurs CSS : c’est au designer d’en décider.' },
        { id: 'lanes', label: 'Pour cet écran, tu préfères un style minimaliste, brutaliste ou en verre dépoli ?', why: 'Un « style » prêt à l’emploi ne dit rien de la tâche ; impeccable exclut ces questions.' },
        { id: 'proof', label: 'Quelles preuves (avis clients, chiffres clés, logos) feront croire à l’offre ?', why: 'C’est une question de Persuader : sur un écran de travail, on aide à faire, on ne convainc pas.' },
      ],
      answers: ['task', 'states', 'constraints'],
      explanation: `Pour une surface Opérer, impeccable fait porter les questions sur **la tâche, les informations, les états importants, la fréquence et les contraintes**. Dans tous les modes, on demande aussi à quoi ressemble la réussite, ce qui doit rester intact, et ce qui ferait paraître faux un résultat pourtant soigné.

Deux types de questions sont exclus : les **valeurs CSS** et les **« styles » prêts à l’emploi**. Ils transfèrent au client une décision de design sans rien apprendre de son besoin.`,
      takeaway: 'En Opérer, interroge la tâche, les états, la fréquence et les contraintes ; jamais des valeurs CSS ou des styles tout faits.',
      sources: ['imp:new-work', 'imp:shape'],
    },
    {
      id: 'modes-symbols-choice',
      type: 'choice',
      difficulty: 3,
      context:
        'Tu conçois le site d’un festival de cinéma japonais à Paris. Une maquette reçue utilise en fond les rayons du drapeau du Soleil levant, « pour l’ambiance ».',
      prompt: 'Que fais-tu ?',
      options: [
        { id: 'neutral', label: 'Tu retires les rayons et tu puises dans les formes neutres de ce monde.', why: 'C’est la règle : on garde le monde du sujet (affiches de cinéma, typographie des génériques, motifs textiles traditionnels), sans ses emblèmes chargés.' },
        { id: 'keep', label: 'Tu les gardes : le sujet est japonais, le motif est donc légitime.', why: 'Le sujet ne donne pas licence aux emblèmes militaristes ; ce drapeau en est un pour une partie du public.' },
        { id: 'faded', label: 'Tu les gardes, mais en version très pâle, presque invisible.', why: 'Atténuer un symbole chargé ne le neutralise pas : il reste un ornement.' },
        { id: 'footnote', label: 'Tu les gardes en fond, avec une note sur leur histoire en pied de page.', why: 'Documenter un symbole a sa place dans un contenu qui en parle ; en faire le décor d’un festival, non.' },
      ],
      answer: 'neutral',
      explanation: `impeccable pose une règle nette : **les symboles chargés restent hors du décor**. Le monde d’un sujet n’autorise pas les emblèmes liés au militarisme, au suprémacisme ou aux mouvements de haine comme motifs, badges ou ornements, ni leurs variantes stylisées. Le drapeau du Soleil levant, associé à l’impérialisme japonais, blesse notamment en Corée et en Chine.

On puise alors dans les **formes neutres** du même monde. Seule exception : un contenu qui documente le symbole comme un fait, un article d’histoire par exemple, le montre tel qu’il est.`,
      takeaway: 'Aucun emblème militariste ou haineux en décor, même si le sujet s’y prête : prends les formes neutres du même monde.',
      sources: ['imp:skill'],
    },
  ],
};

export default modes;
