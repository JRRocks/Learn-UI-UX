import type { ModuleContent, SourceRef } from '../../engine/types';

/** French punctuation inside mock markup (the Markdown renderer only handles text fields). */
const fr = (html: string) =>
  html
    .replace(/ ([?!;»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/ :(?=[\s<])/g, ' :')
    .replace(/(\d) (€|%)/g, '$1 $2');

const law = (slug: string, name: string): SourceRef => ({
  label: `Laws of UX — ${name}`,
  url: `https://lawsofux.com/${slug}/`,
});

const COWAN: SourceRef = {
  label: 'Cowan (2001) — The magical number 4 in short-term memory',
  url: 'https://doi.org/10.1017/S0140525X01003922',
};
const NNG_STM: SourceRef = {
  label: 'Nielsen Norman Group — Short-Term Memory and Web Usability',
  url: 'https://www.nngroup.com/articles/short-term-memory-and-web-usability/',
};
const NNG_RT: SourceRef = {
  label: 'Nielsen Norman Group — Response Times: The 3 Important Limits',
  url: 'https://www.nngroup.com/articles/response-times-3-important-limits/',
};
const NNG_FLAT: SourceRef = {
  label: 'Nielsen Norman Group — Flat vs. Deep Website Hierarchies',
  url: 'https://www.nngroup.com/articles/flat-vs-deep-hierarchy/',
};
const NNG_JAKOB: SourceRef = {
  label: 'Nielsen Norman Group — Jakob’s Law of Internet User Experience',
  url: 'https://www.nngroup.com/videos/jakobs-law-internet-ux/',
};
const KUROSU: SourceRef = {
  label: 'Kurosu & Kashimura (1995) — Apparent usability vs. inherent usability',
  url: 'https://doi.org/10.1145/223355.223680',
};
const SCHEIBEHENNE: SourceRef = {
  label: 'Scheibehenne, Greifeneder & Todd (2010) — méta-analyse de la surcharge de choix',
  url: 'https://doi.org/10.1086/651235',
};
const ZEIGARNIK_2025: SourceRef = {
  label: 'Ghibellini & Meier (2025) — méta-analyse des effets Zeigarnik et Ovsiankina',
  url: 'https://doi.org/10.1057/s41599-025-05000-w',
};
const NUNES: SourceRef = {
  label: 'Nunes & Drèze (2006) — The Endowed Progress Effect',
  url: 'https://doi.org/10.1086/500480',
};
const WCAG_COLOR: SourceRef = {
  label: 'W3C — Comprendre le critère 1.4.1 (utilisation de la couleur)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
};

/* ---------- Shared mock pieces ---------- */

const PAY_LINES = `<div class="mk-pad mk-stack" style="--gap:10px">
<p class="mk-h3">Chez Nami · Poke &amp; bowls</p>
<div class="mk-row mk-between"><span>Poke saumon avocat</span><span class="mk-price">13,90 €</span></div>
<div class="mk-row mk-between"><span>Thé glacé maison</span><span class="mk-price">3,50 €</span></div>
<div class="mk-row mk-between mk-muted"><span>Livraison</span><span class="mk-price">2,50 €</span></div>
<div class="mk-divider"></div>
<div class="mk-row mk-between mk-strong"><span>Total</span><span class="mk-price">19,90 €</span></div>
</div>`;

const PAY_CSS = `.pay { min-height: 380px; display: flex; flex-direction: column; }
.pay-top { padding: 8px 14px; border-bottom: 1px solid #eceef2; }
.pay-link { font-size: 13px; font-weight: 600; color: #1f4fd8; }
.pay-cta { margin-top: auto; padding: 12px 14px 16px; border-top: 1px solid #eceef2; }
.pay-cta .mk-btn { min-height: 48px; font-size: 16px; }`;

const PHOTO_HEAD = `<div class="mk-img" style="--ratio:2/1"></div>
<div><p class="mk-h3">Calanque de Sormiou</p><p class="mk-small mk-muted">12 août · 4,2 Mo</p></div>`;

const IBAN_CSS = `.iban { padding: 12px; border-radius: 10px; background: #f4f6f9; font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: 0.01em; overflow-wrap: anywhere; }`;

const GRID_ITEMS = [
  ['Lampe Arc', '89 €'],
  ['Vase en grès', '34 €'],
  ['Plaid en laine', '59 €'],
  ['Bougie Figue', '18 €'],
];
const gridMock = (cls: string) =>
  fr(`<div class="mk-pad"><div class="${cls}">${GRID_ITEMS.map(
    ([name, price]) => `<div class="gi"><div class="mk-img" style="--ratio:4/3"></div><p class="gi-cap"><b>${name}</b> · ${price}</p></div>`,
  ).join('')}</div></div>`);

const HELP_TITLE = '<p class="mk-h2">Comment pouvons-nous vous aider ?</p>';

const PLAN_CSS = `.plan { min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 6px; border: 1px solid #dfe3ea; border-radius: 10px; text-align: center; overflow-wrap: anywhere; }
.plan-name { font-weight: 700; font-size: 13.5px; }
.plan-price { font-size: 20px; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1.1; }
.plan-price small { display: block; font-size: 12px; font-weight: 500; color: #5a6172; }
.plan-desc { font-size: 12px; color: #5a6172; min-height: 34px; }
.plan--pick { border: 2px solid #1f4fd8; padding: 11px 5px; box-shadow: 0 6px 18px rgb(31 79 216 / 0.14); }
.plan-badge { background: #1f4fd8; color: #fff; font-size: 11px; padding: 2px 7px; }`;

const plan = (name: string, price: string, desc: string, pick = false) =>
  `<div class="plan${pick ? ' plan--pick' : ''}">${pick ? '<span class="mk-badge plan-badge">Conseillée</span>' : ''}<p class="plan-name">${name}</p><p class="plan-price">${price}<small>/mois</small></p><p class="plan-desc">${desc}</p><span class="mk-btn mk-btn--s${pick ? '' : ' mk-btn--ghost'}">Choisir</span></div>`;

const FIELDS: [string, string][] = [
  ['Prénom', 'Camille'],
  ['Nom', 'Durand'],
  ['E-mail', 'camille.durand@mail.fr'],
  ['Téléphone', '06 12 34 56 78'],
];

const JK_CONTENT = `<div class="mk-pad mk-stack" style="--gap:8px">
<div class="mk-img" style="--ratio:16/6"></div>
<p class="mk-h2">Linge de lit en lin lavé</p>
<p class="mk-small mk-muted">Fabriqué au Portugal · 12 coloris</p>
</div>`;

const JK_CSS = `.jk-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid #e6e9ef; }
.jk-logo { font-weight: 800; letter-spacing: 0.02em; white-space: nowrap; }
.jk-odd .jk-logo { margin-inline-start: auto; }
.jk-cart { display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #5a6172; }
.jk-explore { font-size: 13px; font-weight: 600; color: #1f2a44; }
.jk-search { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; min-height: 34px; padding: 0 10px; border: 1px solid #c3c8d3; border-radius: 999px; color: #5a6172; font-size: 13px; overflow: hidden; white-space: nowrap; }
.jk-icons { display: flex; align-items: center; gap: 12px; }
.jk-bag { position: relative; display: inline-flex; }
.jk-bag b { position: absolute; top: -6px; inset-inline-end: -8px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px; background: #1f4fd8; color: #fff; font-size: 10px; display: grid; place-items: center; }`;

const laws: ModuleContent = {
  id: 'laws',
  title: 'Lois de l’UX',
  category: 'psychologie',
  summary:
    'Savoir ce que prédisent vraiment les lois de l’UX — Fitts, Hick, Jakob, Miller et Cowan, Doherty, Gestalt… —, comment les appliquer, et repérer quand on les cite à tort.',
  minutes: 14,
  commands: ['critique', 'layout', 'distill'],
  sources: [
    'lawsofux',
    'imp:critique',
    'imp:layout',
    'imp:distill',
    COWAN,
    NNG_STM,
    NNG_RT,
    NNG_FLAT,
    KUROSU,
    NUNES,
    ZEIGARNIK_2025,
    SCHEIBEHENNE,
    'wcag:target',
    'hig',
    'material3',
  ],
  sections: [
    {
      id: 'calibre',
      title: 'Des lois, pas toutes du même calibre',
      body: `Les « lois de l’UX » rassemblées par Jon Yablonski (Laws of UX) sont des régularités observées en psychologie, en sciences cognitives ou en ingénierie — pas des lois physiques. Elles n’ont pas toutes la même solidité :

- **Mesurées et robustes** : Fitts (viser une cible), Hick (choisir parmi plusieurs options), Doherty (temps de réponse). Elles prédisent des durées et se vérifient en test.
- **Limites de la perception et de la mémoire** : Miller et sa révision par Cowan, la position sérielle, l’effet Von Restorff, la règle pic-fin, les lois de la Gestalt.
- **Maximes de conception** : Jakob, Tesler, Postel, Occam, Pareto, Parkinson. Ce sont des principes nés de l’expérience, pas des résultats chiffrés.
- **Effets fragiles ou conditionnels** : la surcharge de choix et l’effet Zeigarnik se répliquent mal ; on les cite avec prudence.

Pour chaque loi, retiens trois choses : **ce qu’elle prédit**, **son application concrète**, et **son mauvais usage** le plus courant. Une loi invoquée pour une décision qu’elle ne couvre pas (« 7 entrées maximum, c’est Miller ») est un argument d’autorité, pas une raison.`,
    },
    {
      id: 'viser-choisir',
      title: 'Viser et choisir : Fitts et Hick',
      body: `### Loi de Fitts (1954)
Le temps pour atteindre une cible croît avec sa **distance** et diminue avec sa **taille** — plus exactement, avec le logarithme du rapport entre les deux. Aller vite vers une petite cible produit des erreurs.

- **Application** : l’action principale est large et proche de la main (le pouce sur mobile). Cibles tactiles d’au moins **44 × 44 pt** (Apple) ou **48 × 48 dp** (Material Design) ; le WCAG 2.2 fixe un plancher de 24 × 24 px (niveau AA).
- **L’espacement compte** : des cibles serrées attirent les erreurs. Éloigne « Supprimer » des actions fréquentes : la distance protège aussi.
- **Mauvais usage** : tout agrandir. Si chaque bouton est énorme, aucun n’est plus facile qu’un autre et l’écran perd sa hiérarchie.

### Loi de Hick (Hick 1952, Hyman 1953)
Le temps de décision croît avec le **nombre** et la **complexité** des choix — de façon logarithmique pour des options équiprobables : T = b × log2(n + 1).

- **Application** : quand le temps compte, réduis les options affichées, mets en avant l’option recommandée, découpe une tâche complexe en étapes.
- **Mauvais usage** : simplifier jusqu’à l’abstraction. Enfouir des options dans des sous-menus pour « respecter Hick » ajoute des clics et des décisions. Comme la croissance est logarithmique, une liste plus longue mais bien ordonnée coûte souvent moins cher que trois niveaux de menus : à qualité égale, une hiérarchie profonde est plus difficile à utiliser qu’une hiérarchie plate.`,
      examples: [
        {
          title: 'Des cibles à la taille du doigt',
          bad: {
            alt: 'Fiche photo sur mobile avec quatre icônes d’action de 15 pixels serrées les unes contre les autres, dont la corbeille.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">${PHOTO_HEAD}
<div class="ft-tiny"><i data-icon="share-2"></i><i data-icon="heart"></i><i data-icon="download"></i><i data-icon="trash"></i></div>
</div>`),
            css: `.ft-tiny { display: flex; gap: 4px; color: #3a4152; --ico: 15px; }`,
          },
          badNote: 'Quatre cibles de 15 px collées : on vise au millimètre, et la corbeille touche « Télécharger ».',
          good: {
            alt: 'Même fiche photo avec trois boutons d’action de 44 pixels espacés, et la corbeille isolée à l’autre extrémité.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">${PHOTO_HEAD}
<div class="ft-big"><span><i data-icon="share-2"></i></span><span><i data-icon="heart"></i></span><span><i data-icon="download"></i></span><span class="ft-del"><i data-icon="trash"></i></span></div>
</div>`),
            css: `.ft-big { display: flex; gap: 8px; color: #1f2a44; }
.ft-big span { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 10px; background: #f1f3f7; }
.ft-big .ft-del { margin-inline-start: auto; color: #b3261e; }`,
          },
          goodNote: 'Des cibles de 44 px bien espacées, et la suppression tenue à l’écart des actions fréquentes.',
        },
      ],
    },
    {
      id: 'memoire',
      title: 'Mémoire : de Miller à Cowan',
      body: `George Miller (1956) estimait l’empan de la mémoire immédiate à **7 ± 2** éléments. Nelson Cowan (2001) a révisé ce chiffre : quand on empêche les participants de regrouper ou de répéter, la capacité tourne autour de **4 unités** (*chunks*). C’est la règle retenue par impeccable : **≤ 4 éléments** à considérer en même temps à un point de décision.

- **Segmentation** (*chunking*) : regrouper des éléments en unités de sens augmente ce qu’on retient et ce qu’on vérifie. « 06 12 34 56 78 » se lit en 5 blocs, pas en 10 chiffres ; un IBAN s’affiche par groupes de 4.
- **Reconnaissance plutôt que rappel** : la mémoire de travail est fragile et s’efface en quelques dizaines de secondes. Montre l’information au lieu de demander de la retenir.
- **Position sérielle** : on retient mieux les premiers éléments d’une liste (primauté) et les derniers (récence). Place l’essentiel aux extrémités d’une navigation, le moins important au milieu.

**Le mauvais usage classique** : limiter un menu à 7 entrées « à cause de Miller ». Un menu reste sous les yeux : c’est de la reconnaissance, pas de la mémorisation, et le Nielsen Norman Group qualifie cette limite d’idée reçue. Ce qui compte, c’est le nombre d’options à **peser ensemble** et la clarté des regroupements — d’où les repères d’impeccable : ≤ 4 options visibles à un point de décision, ≤ 5 entrées de navigation de premier niveau, le reste rangé sous des catégories claires.`,
      examples: [
        {
          title: 'Segmenter pour lire et vérifier',
          bad: {
            alt: 'Écran de virement affichant un IBAN de 27 caractères d’un seul bloc, sans espaces.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:8px"><span class="mk-label">IBAN du bénéficiaire</span><p class="iban">FR7630006000011234567890189</p><p class="mk-small mk-muted">Vérifiez l’IBAN avant de valider le virement.</p></div>`),
            css: IBAN_CSS,
          },
          badNote: '27 caractères d’un bloc : impossible de comparer avec un RIB sans perdre sa place.',
          good: {
            alt: 'Même IBAN affiché par groupes de quatre caractères séparés par des espaces.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:8px"><span class="mk-label">IBAN du bénéficiaire</span><p class="iban">FR76 3000 6000 0112 3456 7890 189</p><p class="mk-small mk-muted">Vérifiez l’IBAN avant de valider le virement.</p></div>`),
            css: IBAN_CSS,
          },
          goodNote: 'Des groupes de 4 : on compare bloc par bloc, comme sur un relevé d’identité bancaire.',
        },
      ],
    },
    {
      id: 'gestalt',
      title: 'Voir des groupes : les lois de la Gestalt',
      body: `Au début du XXe siècle, les psychologues de la Gestalt (Wertheimer, Köhler, Koffka) ont décrit comment l’œil organise ce qu’il voit en ensembles. Cinq lois servent tous les jours en interface :

- **Proximité** : des éléments proches sont perçus comme liés. Un libellé est plus près de son champ que du champ précédent ; l’espace entre deux groupes est nettement plus grand que l’espace dans un groupe.
- **Similarité** : ce qui se ressemble (couleur, forme, taille) semble avoir la même fonction. Tous les liens partagent un style ; un texte non cliquable ne doit pas ressembler à un lien.
- **Région commune** : des éléments placés dans une même zone délimitée (fond, bordure) forment un groupe. Une carte suffit ; des cartes imbriquées brouillent la structure.
- **Connexité uniforme** : des éléments reliés visuellement (trait, flèche) paraissent plus liés que des éléments seulement proches. Les étapes d’un indicateur de progression sont reliées par un trait.
- **Prägnanz** (« bonne forme ») : on interprète une figure ambiguë ou complexe sous sa forme la plus simple. Des formes et des icônes simples se comprennent plus vite.

La région commune et la connexité uniforme sont des ajouts plus récents de Stephen Palmer (1992 et 1994). Impeccable en tire une règle pratique : **grouper par le sens, et utiliser la proximité avant d’ajouter des conteneurs ou de la décoration**.`,
      examples: [
        {
          title: 'Une légende appartient à l’image la plus proche',
          bad: {
            alt: 'Grille de quatre produits où chaque légende est à égale distance de son image et de l’image de la rangée suivante.',
            html: gridMock('gr gr--even'),
            css: `.gr { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 12px; }
.gi-cap { font-size: 13px; }
.gr--even { row-gap: 20px; }
.gr--even .gi-cap { margin-top: 20px; }`,
          },
          badNote: 'Chaque légende est aussi près de l’image du dessous que de la sienne.',
          good: {
            alt: 'Même grille où chaque légende est collée à son image et les rangées sont nettement séparées.',
            html: gridMock('gr gr--tight'),
            css: `.gr { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 12px; }
.gi-cap { font-size: 13px; }
.gr--tight { row-gap: 28px; }
.gr--tight .gi-cap { margin-top: 6px; }`,
          },
          goodNote: 'Légende collée à son image, rangées bien séparées : chaque paire se lit seule.',
        },
        {
          title: 'Ce qui se ressemble doit fonctionner pareil',
          bad: {
            alt: 'Paragraphe où une durée de livraison non cliquable est soulignée en bleu, et le vrai lien « Mes commandes » est en gras noir.',
            html: fr(`<div class="mk-pad"><p style="line-height:1.6">Votre colis sera livré <span style="color:#1f4fd8;text-decoration:underline">sous 48 h</span> en point relais. Pour changer d’adresse, rendez-vous dans <b>Mes commandes</b>.</p></div>`),
          },
          badNote: 'Le texte souligné en bleu n’est pas cliquable, et le vrai lien ressemble à de l’emphase.',
          good: {
            alt: 'Même paragraphe où la durée est en gras et le lien « Mes commandes » est bleu et souligné.',
            html: fr(`<div class="mk-pad"><p style="line-height:1.6">Votre colis sera livré <b>sous 48 h</b> en point relais. Pour changer d’adresse, rendez-vous dans <a href="#" style="text-decoration:underline;text-underline-offset:2px">Mes commandes</a>.</p></div>`),
          },
          goodNote: 'Un style pour les liens, un autre pour l’emphase : la fonction se lit à la forme.',
        },
      ],
    },
    {
      id: 'attention-temps',
      title: 'Attirer l’attention et tenir le rythme',
      body: `### Effet Von Restorff (1933)
Parmi des éléments semblables, celui qui **diffère** est le mieux remarqué et retenu. Réserve-le à l’action ou à l’information clé : un seul par écran.

- **Mauvais usages** : tout mettre en avant (plus rien ne ressort) ; compter sur la seule couleur (une personne daltonienne ne voit pas la différence — double-la d’une forme, d’un texte, d’un poids) ; un élément si voyant qu’on le prend pour une publicité.

### Seuil de Doherty (1982)
La productivité s’envole quand le système répond en **moins de 400 ms**, contre 2 secondes admises jusque-là (Doherty et Thadani, IBM).

- **Application** : un retour visuel immédiat (100 à 150 ms selon impeccable), puis le résultat. Au-delà d’une seconde, montre que le travail avance ; au-delà de dix, affiche une progression chiffrée (repères du Nielsen Norman Group : 0,1 s, 1 s, 10 s).
- **Performance perçue** : un squelette de page, un état « en cours » ou un résultat partiel rendent l’attente supportable.
- **Mauvais usage** : Laws of UX note qu’un délai ajouté peut augmenter la valeur perçue. Impeccable l’interdit : ne jamais simuler un travail ni retarder un résultat pour la mise en scène.`,
    },
    {
      id: 'emotion-motivation',
      title: 'Émotion et motivation',
      body: `- **Règle pic-fin** (Kahneman et coll., 1993) : on juge une expérience surtout sur son moment le plus intense et sur sa fin, pas sur la moyenne. Soigne les pics négatifs (erreur, attente, paiement refusé) et l’écran final (confirmation, reçu, étape suivante). Impeccable l’inclut dans toute critique : parcours émotionnel, creux, réassurance aux moments à fort enjeu. Mauvais usage : maquiller une mauvaise expérience par une fin flatteuse — le pic négatif reste.
- **Effet esthétique-utilisabilité** (Kurosu et Kashimura, 1995) : un design soigné est **perçu** comme plus facile à utiliser et rend plus tolérant aux petits défauts. Mauvais usage : en conclure qu’il l’est. En test, l’esthétique masque des problèmes : observe ce que les gens font, pas seulement ce qu’ils en disent.
- **Gradient d’objectif** (Hull, 1932) : on accélère à l’approche du but. Une progression visible (« Étape 2 sur 3 ») motive. Dans une station de lavage, une carte de 10 cases dont 2 déjà tamponnées a été complétée par 34 % des clients, contre 19 % pour une carte vierge de 8 cases — pour le même effort (Nunes et Drèze, 2006). Mauvais usage : une progression qui ment ; impeccable demande de ne jamais inventer une progression.
- **Effet Zeigarnik** (années 1920) : on retiendrait mieux les tâches inachevées. Une méta-analyse de 2025 ne retrouve pas cet avantage de mémoire, mais confirme une tendance robuste à **reprendre** une tâche interrompue (effet Ovsiankina). Application : sauvegarder les brouillons et laisser reprendre là où on s’est arrêté — pas multiplier les tâches « à finir » pour retenir les gens.`,
    },
    {
      id: 'principes',
      title: 'Maximes de conception',
      body: `- **Loi de Jakob** (Jakob Nielsen, 2000) : les gens passent l’essentiel de leur temps sur d’autres sites, et attendent que le tien fonctionne pareil. Suis les conventions : logo qui ramène à l’accueil, panier dans le coin supérieur droit, recherche signalée par une loupe. Pour une refonte, laisse un temps l’accès à l’ancienne version. Mauvais usage : copier aussi les défauts — ou les motifs trompeurs — d’un concurrent au nom de la convention.
- **Loi de Tesler** (conservation de la complexité) : toute tâche a une part de complexité irréductible, portée soit par le système, soit par l’utilisateur. Fais-la porter par le système : autocomplétion d’adresse, détection du type de carte, valeurs par défaut. Mauvais usage : « simplifier » en supprimant un champ dont les gens ont besoin.
- **Loi de Postel** (principe de robustesse, spécification de TCP, 1980) : tolérant dans ce que tu acceptes, rigoureux dans ce que tu renvoies. Accepte « 06 12 34 56 78 », « 06-12-34-56-78 » ou « +33 6 12 34 56 78 », normalise, et affiche un format clair. Mauvais usage : tout accepter en silence, sans limite ni retour.
- **Rasoir d’Occam** : à efficacité égale, choisis la solution qui suppose le moins. Retire un élément tant que la fonction n’en souffre pas. Mauvais usage : retirer les libellés des icônes — le mystère n’est pas du minimalisme, rappelle impeccable.
- **Principe de Pareto** : environ 80 % des effets viennent de 20 % des causes. Concentre l’effort sur les parcours les plus fréquents. Mauvais usage : sacrifier le reste quand il est vital pour certains (accessibilité, cas d’erreur).
- **Loi de Parkinson** (1955) : une tâche s’étire jusqu’à occuper le temps disponible. Raccourcis la tâche — remplissage automatique, paiement express — plutôt que de presser la personne. Mauvais usage : un faux compte à rebours, qui est un motif trompeur.
- **Surcharge de choix** (Toffler, 1970) : trop d’options peut gêner la décision. Mais une méta-analyse de 50 expériences (Scheibehenne et coll., 2010) trouve un effet moyen quasi nul : il apparaît surtout quand les options sont difficiles à comparer et les préférences floues. Le remède est souvent d’aider à comparer — vue côte à côte, filtres, option conseillée — plutôt que de couper.`,
    },
  ],
  rules: [
    { id: 'fitts', front: 'Que prédit la loi de Fitts ?', back: 'Le temps pour atteindre une cible croît avec la distance et diminue avec la taille. Actions fréquentes : grandes et proches ; actions destructives : à l’écart.' },
    { id: 'targets', front: 'Taille minimale d’une cible tactile ?', back: '44 × 44 pt chez Apple, 48 × 48 dp chez Material Design. Le WCAG 2.2 fixe un plancher de 24 × 24 px (niveau AA).' },
    { id: 'hick', front: 'Que prédit la loi de Hick ?', back: 'Le temps de décision croît (de façon logarithmique) avec le nombre et la complexité des choix. Mets en avant l’option recommandée, sans tout enfouir dans des sous-menus.' },
    { id: 'cowan', front: 'Combien d’éléments tient la mémoire de travail ?', back: 'Environ 4 (Cowan, 2001), pas 7 ± 2. Impeccable : ≤ 4 éléments à considérer ensemble à un point de décision.' },
    { id: 'miller-menu', front: 'La loi de Miller limite-t-elle un menu à 7 entrées ?', back: 'Non : un menu se lit, il ne se mémorise pas (reconnaissance). Ce qui compte, c’est de regrouper et de hiérarchiser.' },
    { id: 'jakob', front: 'Que dit la loi de Jakob ?', back: 'Les gens passent l’essentiel de leur temps sur d’autres sites : ils attendent que le tien fonctionne pareil. Suis les conventions.' },
    { id: 'doherty', front: 'Quel temps de réponse vise le seuil de Doherty ?', back: 'Moins de 400 ms. Retour visuel en 100–150 ms ; au-delà d’une seconde, montre que le travail avance.' },
    { id: 'peak-end', front: 'Sur quoi juge-t-on une expérience, selon la règle pic-fin ?', back: 'Sur son moment le plus intense et sur sa fin. Soigne les erreurs, les attentes et l’écran final.' },
    { id: 'restorff', front: 'Comment utiliser l’effet Von Restorff ?', back: 'Un seul élément distinct par écran, pour l’action clé — distinct par la forme ou le texte, pas seulement par la couleur.' },
    { id: 'aesthetic', front: 'Que masque l’effet esthétique-utilisabilité ?', back: 'Un beau design paraît plus utilisable et fait tolérer des défauts. En test, observe les actions, pas seulement les avis.' },
    { id: 'tesler', front: 'Que dit la loi de Tesler ?', back: 'La complexité irréductible ne disparaît pas : le système ou l’utilisateur la porte. Fais-la porter par le système.' },
    { id: 'postel', front: 'Comment appliquer la loi de Postel à un formulaire ?', back: 'Accepte les saisies variées (espaces, tirets, indicatif), normalise-les, et renvoie un format clair.' },
    { id: 'proximity', front: 'Comment rattacher un libellé à son champ ?', back: 'Par la proximité : il doit être nettement plus près de son champ que du champ précédent.' },
    { id: 'fragile', front: 'Surcharge de choix et effet Zeigarnik : quelle confiance leur accorder ?', back: 'Prudence. La surcharge apparaît surtout quand comparer est difficile ; l’avantage de mémoire de Zeigarnik ne se réplique pas, la reprise des tâches interrompues, si.' },
  ],
  exercises: [
    {
      id: 'laws-fitts-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quel écran le paiement est-il le plus facile à déclencher au pouce ?',
      context: 'Application de livraison de repas, téléphone tenu d’une main.',
      options: [
        {
          id: 'corner',
          visual: {
            frame: 'phone',
            alt: 'Panier sur téléphone : « Payer » est un petit lien texte dans le coin supérieur de l’écran, au-dessus du récapitulatif.',
            html: fr(`<div class="pay"><div class="mk-row mk-between pay-top"><span class="mk-row" style="--gap:2px"><i data-icon="chevron-left"></i><b>Panier</b></span><span class="pay-link">Payer</span></div>${PAY_LINES}</div>`),
            css: PAY_CSS,
          },
          why: 'Une petite cible de texte, dans le coin le plus éloigné du pouce : il faut changer de prise ou viser au millimètre.',
        },
        {
          id: 'thumb',
          visual: {
            frame: 'phone',
            alt: 'Même panier avec un bouton « Payer 19,90 € » pleine largeur, haut de 48 pixels, dans la partie inférieure de l’écran.',
            html: fr(`<div class="pay"><div class="mk-row pay-top" style="--gap:2px"><i data-icon="chevron-left"></i><b>Panier</b></div>${PAY_LINES}<div class="pay-cta"><span class="mk-btn mk-btn--block">Payer 19,90 €</span></div></div>`),
            css: PAY_CSS,
          },
          why: 'Une cible pleine largeur de 48 px de haut, là où le pouce repose : rapide et sans erreur.',
        },
      ],
      answer: 'thumb',
      explanation: `La **loi de Fitts** prédit que le temps pour atteindre une cible croît avec sa distance et diminue avec sa taille. Sur un téléphone tenu d’une main, la distance se mesure depuis le pouce : le coin supérieur opposé est la zone la plus difficile à atteindre.

L’écran recommandé joue sur les deux leviers : une cible pleine largeur de 48 px de haut, placée dans la moitié inférieure de l’écran. Le persona « Casey » d’impeccable (mobile, une main, souvent interrompu) signale justement les actions importantes placées hors de portée du pouce.`,
      takeaway: 'Sur mobile, l’action principale est grande (44–48 px de haut au moins) et dans la zone du pouce, pas une petite cible dans un coin éloigné.',
      sources: [law('fittss-law', 'Loi de Fitts'), 'imp:critique', 'hig', 'material3'],
    },
    {
      id: 'laws-target-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la hauteur du bouton d’action principale de cet écran mobile.',
      visual: {
        frame: 'phone',
        alt: 'Fiche de réservation d’un cours de yoga sur téléphone, avec un bouton « Réserver ma place » dont la hauteur varie avec le curseur.',
        html: fr(`<div class="bk"><div class="mk-img" style="--ratio:16/9;border-radius:0"></div>
<div class="mk-pad mk-stack" style="--gap:6px"><p class="mk-h2">Yoga vinyasa</p><p class="mk-small mk-muted">Jeudi 19 novembre · 18 h 30 · Studio Bastille</p><p class="mk-small mk-muted">60 min · Tous niveaux · Avec Inès</p></div>
<div class="bk-cta"><span class="bk-btn">Réserver ma place · 18 €</span></div></div>`),
        css: `.bk { min-height: 400px; display: flex; flex-direction: column; }
.bk-cta { margin-top: auto; padding: 12px 14px 16px; border-top: 1px solid #eceef2; }
.bk-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: var(--v, 26px); border-radius: 10px; background: #1f4fd8; color: #fff; font-weight: 600; font-size: 15px; line-height: 1; overflow: hidden; white-space: nowrap; }`,
      },
      control: 'Hauteur du bouton',
      min: 20,
      max: 80,
      step: 2,
      initial: 26,
      unit: 'px',
      target: [44, 64],
      ideal: 48,
      explanation: `La **loi de Fitts** : plus une cible est grande, plus on l’atteint vite et sans erreur. Les plateformes fixent des minimums : **44 × 44 pt** chez Apple, **48 × 48 dp** chez Material Design. Le WCAG 2.2 pose un plancher de 24 × 24 px (niveau AA) — un minimum légal, pas une cible de confort.

Pour l’action principale, touchée souvent et au pouce, vise environ 48 px. Au-delà d’une soixantaine de pixels, le bouton mange la place du contenu pour un gain de précision faible.`,
      takeaway: 'Action principale tactile : environ 48 px de haut (44 pt minimum chez Apple, 48 dp chez Material), jamais sous les 24 px du WCAG.',
      sources: [law('fittss-law', 'Loi de Fitts'), 'hig', 'material3', 'wcag:target'],
    },
    {
      id: 'laws-hick-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle page d’aide permet de trouver le plus vite la bonne démarche ?',
      context: 'Centre d’aide d’un fournisseur d’énergie. La plupart des visites concernent la facture, le relevé de compteur et le déménagement.',
      options: [
        {
          id: 'wall',
          visual: {
            alt: 'Page d’aide présentant douze tuiles de rubriques identiques en grille : facture, relevé de compteur, déménagement, contrat, paiement…',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">${HELP_TITLE}<div class="help-grid"><span>Facture</span><span>Relevé de compteur</span><span>Déménagement</span><span>Contrat</span><span>Paiement</span><span>Échéancier</span><span>Offres</span><span>Espace client</span><span>Mot de passe</span><span>Coupure</span><span>Réclamation</span><span>Autre demande</span></div></div>`),
            css: `.help-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; }
.help-grid span { min-width: 0; display: flex; align-items: center; justify-content: center; text-align: center; min-height: 52px; padding: 6px; border: 1px solid #d5dae3; border-radius: 8px; font-size: 13px; font-weight: 600; color: #1f2a44; overflow-wrap: anywhere; }`,
          },
          why: 'Douze tuiles de même poids : il faut toutes les lire et les comparer, même pour la démarche la plus courante.',
        },
        {
          id: 'focused',
          visual: {
            alt: 'Page d’aide avec un champ de recherche, trois démarches fréquentes mises en avant et un lien vers toutes les rubriques.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">${HELP_TITLE}<div class="help-search"><i data-icon="search" style="--ico:16px"></i><span>Rechercher : facture, relevé, déménagement…</span></div><p class="mk-small mk-muted mk-strong">Les démarches les plus fréquentes</p><div class="mk-stack" style="--gap:8px"><span class="help-top"><i data-icon="receipt"></i>Comprendre ma facture<i data-icon="chevron-right" class="help-chev"></i></span><span class="help-top"><i data-icon="zap"></i>Transmettre mon relevé<i data-icon="chevron-right" class="help-chev"></i></span><span class="help-top"><i data-icon="truck"></i>Je déménage<i data-icon="chevron-right" class="help-chev"></i></span></div><span class="mk-btn mk-btn--text" style="align-self:flex-start;padding:0;min-height:30px">Voir toutes les rubriques (12)</span></div>`),
            css: `.help-search { display: flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 12px; border: 1px solid #c3c8d3; border-radius: 8px; color: #5a6172; font-size: 13px; }
.help-top { display: flex; align-items: center; gap: 10px; min-height: 46px; padding: 0 12px; border: 1px solid #d5dae3; border-radius: 10px; font-weight: 600; }
.help-chev { margin-inline-start: auto; color: #8b92a1; }`,
          },
          why: 'Les trois démarches les plus fréquentes sont devant, la recherche couvre le reste, et toutes les rubriques restent à un clic.',
        },
      ],
      answer: 'focused',
      explanation: `La **loi de Hick** : le temps de décision croît avec le nombre et la complexité des options. Douze tuiles équivalentes obligent à tout parcourir, même pour les démarches que viennent faire la plupart des visiteurs.

La version recommandée suit les conseils de Laws of UX : mettre en avant les options recommandées et ne pas submerger. Elle ne supprime rien — les douze rubriques restent accessibles — mais épargne une décision à la majorité. C’est l’esprit de la règle d’impeccable : peu d’options visibles à un point de décision (≤ 4), le reste regroupé.`,
      takeaway: 'Mets en avant les quelques options que la majorité cherche et garde le reste à un clic : moins d’options à peser, décision plus rapide.',
      sources: [law('hicks-law', 'Loi de Hick'), 'imp:critique', 'imp:distill'],
    },
    {
      id: 'laws-restorff-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quelle grille tarifaire repères-tu le plus vite la formule conseillée ?',
      options: [
        {
          id: 'flat',
          visual: {
            alt: 'Trois cartes de formules identiques, Solo, Équipe et Entreprise ; la mention « conseillée » figure en petit dans le texte de la carte Équipe.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h3">Choisissez votre formule</p><div class="mk-grid" style="--cols:3;--gap:8px">${plan('Solo', '9 €', '1 personne')}${plan('Équipe', '29 €', '2 à 10 personnes, conseillée')}${plan('Entreprise', '79 €', 'Plus de 10 personnes')}</div></div>`),
            css: PLAN_CSS,
          },
          why: 'Trois cartes identiques : le mot « conseillée » se noie dans le texte, rien n’attire l’œil.',
        },
        {
          id: 'isolated',
          visual: {
            alt: 'Trois cartes de formules ; seule la carte Équipe a une bordure épaisse, un badge « Conseillée » et un bouton plein.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h3">Choisissez votre formule</p><div class="mk-grid" style="--cols:3;--gap:8px">${plan('Solo', '9 €', '1 personne')}${plan('Équipe', '29 €', '2 à 10 personnes', true)}${plan('Entreprise', '79 €', 'Plus de 10 personnes')}</div></div>`),
            css: PLAN_CSS,
          },
          why: 'Une seule carte diffère — bordure, badge écrit, bouton plein : elle se remarque aussitôt, même sans percevoir les couleurs.',
        },
      ],
      answer: 'isolated',
      explanation: `**Effet Von Restorff** (ou effet d’isolement, 1933) : parmi des éléments semblables, celui qui diffère est le mieux remarqué et retenu. La version recommandée isole une seule carte, avec trois signaux redondants : bordure, badge écrit et bouton plein.

Les limites, rappelées par Laws of UX : n’isole qu’un élément à la fois — si tout ressort, plus rien ne ressort — et ne compte jamais sur la couleur seule, que les personnes daltoniennes ou malvoyantes peuvent ne pas percevoir.`,
      takeaway: 'Isole un seul élément clé par écran, avec des signaux redondants (forme, texte, poids), jamais par la seule couleur.',
      sources: [law('von-restorff-effect', 'Effet Von Restorff'), WCAG_COLOR],
    },
    {
      id: 'laws-proximity-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Dans quel formulaire vois-tu sans hésiter à quel champ appartient chaque libellé ?',
      options: [
        {
          id: 'even',
          visual: {
            alt: 'Formulaire de coordonnées où chaque libellé est à égale distance du champ qui le précède et du champ qui le suit.',
            html: fr(`<div class="mk-pad"><p class="mk-h3" style="margin-bottom:14px">Vos coordonnées</p><div class="px-even">${FIELDS.map(([l, v]) => `<span class="mk-label">${l}</span><span class="mk-input">${v}</span>`).join('')}</div></div>`),
            css: `.px-even { display: flex; flex-direction: column; gap: 14px; }`,
          },
          why: 'Chaque libellé flotte à mi-distance entre deux champs : l’œil hésite sur le rattachement.',
        },
        {
          id: 'grouped',
          visual: {
            alt: 'Même formulaire où chaque libellé est collé à son champ et où les paires libellé-champ sont nettement séparées.',
            html: fr(`<div class="mk-pad"><p class="mk-h3" style="margin-bottom:14px">Vos coordonnées</p><div class="px-group">${FIELDS.map(([l, v]) => `<div class="mk-field"><span class="mk-label">${l}</span><span class="mk-input">${v}</span></div>`).join('')}</div></div>`),
            css: `.px-group { display: flex; flex-direction: column; gap: 18px; }
.px-group .mk-field { gap: 5px; }`,
          },
          why: 'Le libellé colle à son champ (5 px) et les paires sont séparées (18 px) : chaque groupe se lit d’un bloc.',
        },
      ],
      answer: 'grouped',
      explanation: `**Loi de proximité** (Gestalt) : des éléments proches sont perçus comme un groupe. Quand l’espace entre un libellé et son champ égale l’espace entre deux paires, la structure disparaît : il faut lire pour comprendre ce que la mise en page devrait dire d’elle-même.

La règle d’impeccable : grouper par le sens et créer un rythme — serré dans un groupe, généreux entre les groupes — avant d’ajouter des bordures ou des conteneurs.`,
      takeaway: 'Un libellé est nettement plus près de son champ que du champ précédent : serré dans le groupe, aéré entre les groupes.',
      sources: [law('law-of-proximity', 'Loi de proximité'), 'imp:layout'],
    },
    {
      id: 'laws-jakob-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quelle boutique trouves-tu ton panier et la recherche sans chercher ?',
      options: [
        {
          id: 'custom',
          visual: {
            frame: 'browser',
            alt: 'En-tête de boutique original : le panier est une icône de colis légendée « Ma malle » placée en tête de barre, la recherche est un simple mot « Explorer », le logo est à l’autre extrémité.',
            html: fr(`<div class="jk-bar jk-odd"><span class="jk-cart"><i data-icon="package"></i>Ma malle</span><span class="jk-explore">Explorer</span><span class="jk-logo">Maison Lin</span></div>${JK_CONTENT}`),
            css: JK_CSS,
          },
          why: 'Le panier devient une « malle » placée là où l’on attend le logo, et la recherche perd sa loupe : tout est à réapprendre.',
        },
        {
          id: 'conventional',
          visual: {
            frame: 'browser',
            alt: 'En-tête de boutique classique : logo en tête de barre, champ de recherche avec loupe au centre, icônes du compte et du panier avec un badge « 2 » à l’autre extrémité.',
            html: fr(`<div class="jk-bar"><span class="jk-logo">Maison Lin</span><span class="jk-search"><i data-icon="search" style="--ico:15px"></i>Rechercher</span><span class="jk-icons"><i data-icon="user"></i><span class="jk-bag"><i data-icon="shopping-bag"></i><b>2</b></span></span></div>${JK_CONTENT}`),
            css: JK_CSS,
          },
          why: 'Logo, recherche avec loupe, compte et panier à leur place habituelle : l’œil trouve tout là où il le cherche.',
        },
      ],
      answer: 'conventional',
      explanation: `**Loi de Jakob** : les gens passent l’essentiel de leur temps sur d’autres sites, et attendent que le tien fonctionne pareil. Chaque convention respectée — logo qui ouvre la barre, loupe pour chercher, panier dans le coin supérieur droit — est une chose qu’ils n’ont pas à apprendre.

Innover sur la navigation coûte de l’attention sans rien apporter. Garde l’originalité pour ce que ton produit fait de différent ; et pour un changement important, laisse un temps l’accès à la version familière.`,
      takeaway: 'Suis les conventions de navigation (logo, recherche, compte, panier) : l’originalité se dépense ailleurs.',
      sources: [law('jakobs-law', 'Loi de Jakob'), NNG_JAKOB],
    },
    {
      id: 'laws-fitts-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux endroits où cet écran va à l’encontre de la loi de Fitts.',
      visual: {
        frame: 'phone',
        alt: 'Écran « Modifier l’adresse » sur téléphone : une petite croix de fermeture, trois champs, puis un bouton « Enregistrer » collé à un bouton rouge « Supprimer ».',
        html: fr(`<div class="ad">
<div class="mk-row mk-between ad-top"><p class="mk-h3" data-hotspot="title">Modifier l’adresse</p><span class="ad-x" data-hotspot="close"><i data-icon="x" style="--ico:14px"></i></span></div>
<div class="mk-pad mk-stack" style="--gap:12px">
<div class="mk-field"><span class="mk-label">Adresse</span><span class="mk-input">14 rue des Lilas</span></div>
<div class="mk-field" data-hotspot="zip"><span class="mk-label">Code postal</span><span class="mk-input">69003</span></div>
<div class="mk-field"><span class="mk-label">Ville</span><span class="mk-input">Lyon</span></div>
</div>
<div class="ad-actions"><span class="mk-btn ad-save" data-hotspot="save">Enregistrer</span><span class="mk-btn mk-btn--danger ad-del" data-hotspot="delete">Supprimer</span></div>
</div>`),
        css: `.ad { min-height: 400px; display: flex; flex-direction: column; }
.ad-top { padding: 10px 14px; border-bottom: 1px solid #eceef2; }
.ad-x { display: inline-flex; color: #5a6172; }
.ad-actions { margin-top: auto; display: flex; gap: 4px; padding: 12px 14px 16px; }
.ad-save { flex: 1; min-height: 46px; }
.ad-del { min-height: 46px; padding: 0 12px; }`,
      },
      hotspots: [
        { id: 'close', label: 'Croix de fermeture de 14 px', correct: true, why: 'Une cible de 14 × 14 px sans zone de toucher élargie : sous le plancher de 24 px du WCAG 2.2 et très loin des 44 pt recommandés.' },
        { id: 'delete', label: '« Supprimer » collé à « Enregistrer »', correct: true, why: 'Une action destructive à 4 px de l’action la plus fréquente : le moindre écart de pouce supprime l’adresse.' },
        { id: 'save', label: 'Bouton « Enregistrer »', correct: false, why: 'Large et dans la zone du pouce : c’est la bonne cible. Le problème est sa voisine.' },
        { id: 'title', label: 'Titre de l’écran', correct: false, why: 'Le titre nomme clairement la tâche : rien à corriger.' },
        { id: 'zip', label: 'Champ « Code postal »', correct: false, why: 'Champ pleine largeur, de hauteur confortable, avec un libellé visible.' },
      ],
      explanation: `La loi de Fitts dit deux choses utiles ici :

- **La taille compte** : une croix de 14 px est une cible minuscule. Elle peut garder un petit dessin, mais sa zone de toucher doit atteindre au moins 44 × 44 pt.
- **L’espacement compte** : Laws of UX recommande des cibles tactiles bien espacées. Une action destructive collée à l’action fréquente attire les touches accidentelles. Éloigne-la, et préfère une possibilité d’annuler à une simple confirmation.`,
      takeaway: 'Cibles tactiles d’au moins 44 px et bien espacées ; les actions destructives se tiennent à l’écart des actions fréquentes.',
      sources: [law('fittss-law', 'Loi de Fitts'), 'wcag:target', 'hig', 'imp:clarify'],
    },
    {
      id: 'laws-misapplied-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Sur cette page d’inscription, trouve les deux éléments où une loi de l’UX est mal appliquée.',
      visual: {
        frame: 'browser',
        alt: 'Étape 2 d’une inscription : une barre de progression, trois formules portant chacune un badge criard de couleur différente, un champ e-mail, un champ téléphone refusé pour cause d’espaces, et un bouton « Continuer ».',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:14px">
<div class="mk-stack" style="--gap:6px" data-hotspot="steps"><div class="mk-row mk-between mk-small"><b>Étape 2 sur 3 · Formule et coordonnées</b><span class="mk-muted">Plus qu’une étape</span></div><div class="su-bar"><span></span></div></div>
<div class="mk-grid" style="--cols:3;--gap:8px" data-hotspot="badges">
<div class="su-plan su-p1"><span class="su-b">Populaire !</span><b>Mensuel</b><span class="mk-small">7,99 €/mois</span></div>
<div class="su-plan su-p2"><span class="su-b">Top prix !</span><b>Annuel</b><span class="mk-small">79 €/an</span></div>
<div class="su-plan su-p3"><span class="su-b">Conseillé !</span><b>Famille</b><span class="mk-small">12,99 €/mois</span></div>
</div>
<div class="mk-field" data-hotspot="email"><span class="mk-label">E-mail</span><span class="mk-input">nora.benali@mail.fr</span></div>
<div class="mk-field" data-hotspot="phone"><span class="mk-label">Téléphone</span><span class="mk-input mk-input--error">06 12 34 56 78</span><span class="mk-error">Format invalide : 10 chiffres, sans espace ni point.</span></div>
<span class="mk-btn mk-btn--block" data-hotspot="cta">Continuer</span>
</div>`),
        css: `.su-bar { height: 6px; border-radius: 3px; background: #e3e6ec; }
.su-bar span { display: block; width: 66%; height: 100%; border-radius: 3px; background: #1f4fd8; }
.su-plan { min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; border-radius: 10px; border: 2px solid; text-align: center; overflow-wrap: anywhere; }
.su-b { max-width: 100%; font-size: 10.5px; font-weight: 800; color: #fff; padding: 2px 6px; border-radius: 999px; }
.su-p1 { border-color: #d92d3a; background: #fff0f0; } .su-p1 .su-b { background: #d92d3a; }
.su-p2 { border-color: #c25e00; background: #fff4e5; } .su-p2 .su-b { background: #c25e00; }
.su-p3 { border-color: #7b3fbf; background: #f6efff; } .su-p3 .su-b { background: #7b3fbf; }`,
      },
      hotspots: [
        { id: 'phone', label: 'Numéro refusé à cause des espaces', correct: true, why: 'Loi de Postel ignorée : le système refuse une saisie parfaitement compréhensible au lieu de retirer les espaces lui-même.' },
        { id: 'badges', label: 'Un badge criard sur chaque formule', correct: true, why: 'Effet Von Restorff annulé : trois éléments mis en avant à égalité, donc aucun ne ressort.' },
        { id: 'steps', label: 'Barre « Étape 2 sur 3 »', correct: false, why: 'Gradient d’objectif bien appliqué : la progression est visible et honnête.' },
        { id: 'email', label: 'Champ e-mail', correct: false, why: 'Libellé visible, valeur lisible : rien à redire.' },
        { id: 'cta', label: 'Bouton « Continuer »', correct: false, why: 'Une seule action principale, large : conforme à Fitts.' },
      ],
      explanation: `- **Loi de Postel** : « sois tolérant dans ce que tu acceptes ». Refuser « 06 12 34 56 78 » pour des espaces fait porter à la personne un travail que le système fait en une ligne : retirer les espaces, puis valider.
- **Effet Von Restorff** : un élément ressort parce qu’il est seul à différer. Trois badges criards sur trois cartes s’annulent ; mets en avant une seule formule, ou aucune.

La barre de progression (gradient d’objectif), le champ e-mail et le bouton pleine largeur (Fitts) sont corrects.`,
      takeaway: 'Normalise les saisies au lieu de les refuser (Postel), et n’isole qu’un élément à la fois (Von Restorff).',
      sources: [law('postels-law', 'Loi de Postel'), law('von-restorff-effect', 'Effet Von Restorff'), law('goal-gradient-effect', 'Effet de gradient d’objectif')],
    },
    {
      id: 'laws-miller-choice',
      type: 'choice',
      difficulty: 2,
      context: 'En revue de design, un collègue propose : « La loi de Miller dit qu’on retient 7 ± 2 éléments. Coupons le menu de la boutique à 7 catégories. »',
      prompt: 'Que lui réponds-tu ?',
      options: [
        { id: 'recognition', label: 'Un menu se lit, il ne se mémorise pas : Miller ne fixe pas sa taille. Regroupons plutôt les catégories sous quelques entrées claires.', why: 'Exact : un menu sollicite la reconnaissance, pas la mémoire. Le vrai levier est la clarté des regroupements.' },
        { id: 'seven', label: 'D’accord : au-delà de 7, les gens oublient les premières entrées.', why: 'Les entrées restent affichées : personne n’a besoin de s’en souvenir.' },
        { id: 'four', label: 'Allons plus loin : 4 entrées au total, puisque Cowan a révisé le chiffre à 4.', why: 'Cowan corrige bien Miller, mais la mémoire de travail ne limite pas un menu visible. Quatre entrées pour toute une boutique deviendraient abstraites.' },
        { id: 'flat', label: 'Gardons les 14 catégories à plat : la longueur d’un menu n’a aucune importance.', why: 'Un menu long n’est pas interdit, mais 14 entrées sans regroupement compliquent le choix (Hick) et le balayage.' },
      ],
      answer: 'recognition',
      explanation: `Miller (1956) parlait de l’empan de la **mémoire immédiate** — ce qu’on retient sans le voir. Un menu, lui, reste sous les yeux : c’est de la **reconnaissance**. Le Nielsen Norman Group range la limite de 7 entrées par menu parmi les idées reçues, et prévient qu’un menu trop court rend les choix abstraits.

Le bon argument n’est pas mémoriel mais décisionnel : des entrées nombreuses et non regroupées ralentissent le choix. D’où le repère d’impeccable : ≤ 5 entrées de premier niveau, le reste rangé sous des catégories claires. Et quand on parle vraiment de mémoire, le chiffre actuel est **environ 4** (Cowan, 2001), pas 7.`,
      takeaway: 'Miller ne fixe pas la taille d’un menu : un menu se reconnaît, il ne se mémorise pas. Regroupe et hiérarchise.',
      sources: [law('millers-law', 'Loi de Miller'), NNG_STM, COWAN, 'imp:critique'],
    },
    {
      id: 'laws-doherty-choice',
      type: 'choice',
      difficulty: 2,
      context: 'La recherche de trajets de ton application de covoiturage met 2 à 3 secondes à répondre.',
      prompt: 'Quelle réponse d’interface est la meilleure pendant cette attente ?',
      options: [
        { id: 'feedback', label: 'Montrer tout de suite que la recherche est lancée (bouton enfoncé, squelette de la liste), puis afficher les trajets dès qu’ils arrivent.', why: 'Un retour en moins de 400 ms garde la personne dans le rythme, et le squelette annonce ce qui vient.' },
        { id: 'nothing', label: 'Ne rien changer à l’écran jusqu’à l’arrivée des résultats.', why: 'Sans retour, au-delà d’une seconde, on se demande si l’appui a été pris en compte, et on tape à nouveau.' },
        { id: 'percent', label: 'Afficher une barre de progression de 0 à 100 %.', why: 'Un pourcentage se justifie au-delà d’une dizaine de secondes ; pour 2 à 3 s, c’est excessif — et inventé si le système ne connaît pas son avancement.' },
        { id: 'delay', label: 'Ajouter une animation de 3 secondes pour que la recherche paraisse plus sérieuse.', why: 'Allonger l’attente pour la mise en scène, c’est simuler un travail : impeccable l’interdit.' },
      ],
      answer: 'feedback',
      explanation: `Le **seuil de Doherty** : l’échange reste productif quand le système répond en moins de **400 ms**. Les repères du Nielsen Norman Group complètent : 0,1 s paraît instantané, 1 s préserve le fil de la pensée, 10 s est la limite de l’attention.

Avec 2 à 3 secondes de calcul, on ne peut pas livrer les trajets en 400 ms — mais on peut **accuser réception** en 400 ms : état enfoncé, squelette de la liste, puis résultats. C’est la performance perçue, sans rien inventer.`,
      takeaway: 'Réponds en moins de 400 ms — au moins par un retour visuel — puis montre que le travail avance si l’attente dépasse une seconde.',
      sources: [law('doherty-threshold', 'Seuil de Doherty'), NNG_RT, 'imp:delight', 'imp:animate'],
    },
    {
      id: 'laws-tesler-choice',
      type: 'choice',
      difficulty: 3,
      context: 'Les tests montrent que le formulaire d’adresse de livraison (six champs) est jugé pénible. Une idée circule : supprimer des champs.',
      prompt: 'Quelle simplification respecte la loi de Tesler ?',
      options: [
        { id: 'autocomplete', label: 'Une recherche d’adresse avec autocomplétion qui remplit rue, code postal et ville, et un champ « Complément » facultatif.', why: 'Le système absorbe la complexité : quelques lettres tapées, et une adresse complète.' },
        { id: 'remove', label: 'Supprimer le champ « Complément d’adresse » (bâtiment, étage, code d’accès).', why: 'La complexité ne disparaît pas : elle ressurgit chez le livreur et chez le client, sous forme de colis non livrés.' },
        { id: 'single', label: 'Un seul grand champ libre « Votre adresse », sans aide.', why: 'Moins de champs, mais toute la structuration repose sur la personne — et sur un système qui devra deviner.' },
        { id: 'steps', label: 'Répartir les six champs sur trois écrans successifs.', why: 'La même saisie, plus deux transitions : l’effort est déplacé, pas réduit.' },
      ],
      answer: 'autocomplete',
      explanation: `La **loi de Tesler**, ou loi de conservation de la complexité : toute tâche a une part de complexité irréductible. Elle ne disparaît pas quand on retire des champs ; elle change de camp. Une livraison a besoin d’une rue, d’un code postal, d’une ville et parfois d’un code d’accès.

La bonne simplification fait porter cette complexité au système : autocomplétion, valeurs déduites, champ facultatif clairement signalé. Larry Tesler défendait l’idée qu’une équipe devrait passer une semaine de plus à simplifier plutôt que d’imposer une minute de plus à des millions de personnes.`,
      takeaway: 'La complexité irréductible ne disparaît pas : fais-la porter par le système (autocomplétion, valeurs par défaut), pas par l’utilisateur.',
      sources: [law('teslers-law', 'Loi de Tesler'), 'imp:distill'],
    },
    {
      id: 'laws-misuse-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquelles de ces décisions invoquent une loi de l’UX à tort ?',
      options: [
        { id: 'miller7', label: 'Couper un menu à 7 entrées « à cause de la loi de Miller ».', why: 'Un menu visible ne se mémorise pas : Miller ne s’applique pas.' },
        { id: 'thumb', label: 'Placer le bouton « Payer » dans la zone du pouce (loi de Fitts).', why: 'Bonne application : une cible proche et large.' },
        { id: 'everything', label: 'Mettre un badge coloré sur chaque offre pour qu’elles soient toutes remarquées (effet Von Restorff).', why: 'L’effet repose sur l’exception : si tout ressort, rien ne ressort.' },
        { id: 'countdown', label: 'Afficher un compte à rebours fictif pour accélérer la décision (loi de Parkinson).', why: 'C’est de la fausse urgence, un motif trompeur. Parkinson invite à raccourcir la tâche, pas à presser la personne.' },
        { id: 'phone', label: 'Accepter un numéro saisi avec des espaces ou des tirets (loi de Postel).', why: 'Bonne application : tolérant en entrée, normalisé en sortie.' },
      ],
      answers: ['miller7', 'everything', 'countdown'],
      explanation: `Une loi de l’UX décrit un mécanisme ; elle ne justifie que les décisions qui agissent sur ce mécanisme.

- **Miller** décrit ce qu’on retient sans le voir — or un menu reste visible.
- **Von Restorff** repose sur l’exception — la multiplier la détruit.
- **Parkinson** dit qu’une tâche s’étire avec le temps disponible : on raccourcit la tâche (remplissage automatique, paiement express), on n’invente pas une échéance.

Fitts et Postel sont, eux, appliqués à bon escient.`,
      takeaway: 'Avant de citer une loi, vérifie qu’elle décrit bien le mécanisme en jeu ; sinon, c’est un argument d’autorité.',
      sources: [law('millers-law', 'Loi de Miller'), law('von-restorff-effect', 'Effet Von Restorff'), law('parkinsons-law', 'Loi de Parkinson'), 'deceptive'],
    },
    {
      id: 'laws-aesthetic-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un design plus esthétique rend une interface réellement plus facile à utiliser.',
      answer: false,
      explanation: `L’**effet esthétique-utilisabilité** porte sur la **perception**. Dans l’étude de Kurosu et Kashimura (Hitachi, 1995), menée sur 26 variantes d’écran de distributeur de billets, l’attrait esthétique était plus fortement lié à la facilité d’usage *perçue* qu’à la facilité réelle.

Conséquence pratique : un beau prototype rend les gens plus tolérants aux petits défauts — et peut masquer des problèmes en test. Mesure ce que les personnes réussissent à faire, pas seulement ce qu’elles déclarent.`,
      takeaway: 'Un beau design paraît plus utilisable sans forcément l’être : en test, observe les actions, pas seulement les avis.',
      sources: [law('aesthetic-usability-effect', 'Effet esthétique-utilisabilité'), KUROSU],
    },
    {
      id: 'laws-choice-overload-tf',
      type: 'truefalse',
      difficulty: 3,
      prompt: 'Plus on propose d’options, moins les gens achètent : la surcharge de choix est un effet universel.',
      answer: false,
      explanation: `L’étude célèbre des confitures (Iyengar et Lepper, 2000) a popularisé l’idée : un stand de 24 variétés attirait plus de monde qu’un stand de 6, mais vendait moins. Pourtant, une méta-analyse de 50 expériences (Scheibehenne, Greifeneder et Todd, 2010) trouve un effet moyen **quasi nul**, avec de fortes variations d’une étude à l’autre.

La surcharge apparaît dans certaines conditions : options difficiles à comparer, préférences floues, absence de repère. Le remède n’est donc pas de couper à l’aveugle, mais d’**aider à choisir** : comparaison côte à côte, filtres, option conseillée.`,
      takeaway: 'La surcharge de choix est conditionnelle : aide à comparer (côte à côte, filtres, option conseillée) plutôt que de couper à l’aveugle.',
      sources: [law('choice-overload', 'Surcharge de choix'), SCHEIBEHENNE],
    },
    {
      id: 'laws-response-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces seuils de temps de réponse, du plus court au plus long.',
      items: [
        { id: 'instant', label: 'Le système paraît réagir instantanément' },
        { id: 'doherty', label: 'L’échange garde un rythme productif (seuil de Doherty)' },
        { id: 'flow', label: 'La personne remarque l’attente, mais garde le fil de sa pensée' },
        { id: 'attention', label: 'L’attention décroche : il faut une progression chiffrée' },
      ],
      explanation: `Les quatre repères à connaître :

1. **0,1 s** : en dessous, la réaction paraît instantanée — c’est la cible des retours visuels (état enfoncé, case cochée).
2. **0,4 s** : le seuil de Doherty (1982) ; en dessous, l’échange garde son rythme et la productivité grimpe.
3. **1 s** : au-delà, on remarque l’attente ; montre que le travail est en cours.
4. **10 s** : au-delà, l’attention part ailleurs ; affiche un pourcentage ou une estimation du temps restant.

Les seuils de 0,1, 1 et 10 secondes sont ceux du Nielsen Norman Group.`,
      takeaway: '0,1 s paraît instantané, 0,4 s garde le rythme, au-delà d’1 s on signale l’activité, au-delà de 10 s on chiffre la progression.',
      sources: [NNG_RT, law('doherty-threshold', 'Seuil de Doherty')],
    },
    {
      id: 'laws-match',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque loi à l’application qui en découle.',
      leftTitle: 'Loi',
      rightTitle: 'Application',
      pairs: [
        { id: 'fitts', left: 'Loi de Fitts', right: 'Bouton principal large, dans la zone du pouce' },
        { id: 'hick', left: 'Loi de Hick', right: 'Trois démarches fréquentes mises en avant, les autres à un clic' },
        { id: 'jakob', left: 'Loi de Jakob', right: 'Le logo ramène à l’accueil, comme partout ailleurs' },
        { id: 'postel', left: 'Loi de Postel', right: 'Accepter « 06 12 34 56 78 » comme « 0612345678 »' },
        { id: 'peak', left: 'Règle pic-fin', right: 'Soigner l’écran de confirmation de commande' },
        { id: 'goal', left: 'Gradient d’objectif', right: 'Indicateur « Étape 2 sur 3 » dans un tunnel d’achat' },
      ],
      explanation: `Chaque loi agit sur un moment précis de l’expérience :

- **Fitts** : viser — taille et distance de la cible.
- **Hick** : choisir — nombre et complexité des options.
- **Jakob** : reconnaître — conventions déjà apprises ailleurs.
- **Postel** : saisir — tolérance en entrée, rigueur en sortie.
- **Pic-fin** : se souvenir — le moment fort et la fin font le souvenir.
- **Gradient d’objectif** : avancer — la motivation monte à l’approche du but.`,
      takeaway: 'Fitts pour viser, Hick pour choisir, Jakob pour reconnaître, Postel pour saisir, pic-fin pour le souvenir, gradient pour avancer.',
      sources: ['lawsofux'],
    },
  ],
};

export default laws;
