import type { ModuleContent, SourceRef } from '../../engine/types';

/** French punctuation inside mock markup (the Markdown renderer only handles text fields). */
const fr = (html: string) =>
  html
    .replace(/ ([?!;»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/ :(?=[\s<])/g, ' :')
    .replace(/(\d) (?=(?:€|%|h|j|ans|L|Go|m²)(?![\p{L}\d]))/gu, '$1\u00A0');

const LAWS_CL: SourceRef = { label: 'Laws of UX — Charge cognitive', url: 'https://lawsofux.com/cognitive-load/' };
const LAWS_WM: SourceRef = { label: 'Laws of UX — Mémoire de travail', url: 'https://lawsofux.com/working-memory/' };
const LAWS_CHUNK: SourceRef = { label: 'Laws of UX — Segmentation (chunking)', url: 'https://lawsofux.com/chunking/' };
const LAWS_PROX: SourceRef = { label: 'Laws of UX — Loi de proximité', url: 'https://lawsofux.com/law-of-proximity/' };
const COWAN: SourceRef = {
  label: 'Cowan (2001) — The magical number 4 in short-term memory',
  url: 'https://doi.org/10.1017/S0140525X01003922',
};
const NNG_RECALL: SourceRef = {
  label: 'Nielsen Norman Group — Memory Recognition and Recall in User Interfaces',
  url: 'https://www.nngroup.com/articles/recognition-and-recall/',
};
const NNG_EXTERNAL: SourceRef = {
  label: 'Nielsen Norman Group — Working Memory and External Memory',
  url: 'https://www.nngroup.com/articles/working-memory-external-memory/',
};

/* ---------- Shared mock pieces ---------- */

const SHIP_CSS = `.sh-list { display: flex; flex-direction: column; gap: 6px; }
.sh-opt { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid #e1e4ea; border-radius: 8px; font-size: 13px; }
.sh-opt::before { content: ""; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #8b92a1; flex: none; }
.sh-name { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 8px; }
.sh-info { margin-inline-start: auto; color: #5a6172; white-space: nowrap; }
.sh-tag { font-size: 11px; font-weight: 700; font-style: normal; color: #1f6b3a; background: #e3f4e8; padding: 1px 6px; border-radius: 999px; white-space: nowrap; }`;

const ship = (name: string, info: string, tag = '') =>
  `<span class="sh-opt"><span class="sh-name"><b>${name}</b>${tag ? `<em class="sh-tag">${tag}</em>` : ''}</span><span class="sh-info">${info}</span></span>`;

const TB_ITEMS: [string, string][] = [
  ['sparkles', 'Résumer'],
  ['layout-grid', 'Modèles'],
  ['funnel', 'Filtrer'],
  ['sliders-horizontal', 'Réglages'],
  ['share-2', 'Partager'],
  ['bookmark', 'Enregistrer'],
];
const TB_CSS = `.tb { display: grid; grid-template-columns: repeat(auto-fit, minmax(58px, 1fr)); gap: 4px; padding: 6px; border: 1px solid #e1e4ea; border-radius: 10px; background: #f8f9fb; }
.tb span { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-height: 44px; padding: 4px; border-radius: 8px; color: #1f2a44; font-size: 11px; font-weight: 600; }
.tb-doc { line-height: 1.55; }`;
const tbMock = (labels: boolean) =>
  fr(`<div class="mk-pad mk-stack" style="--gap:12px"><div class="tb">${TB_ITEMS.map(
    ([icon, label]) => `<span><i data-icon="${icon}"></i>${labels ? label : ''}</span>`,
  ).join('')}</div><p class="mk-h3">Compte rendu — réunion produit du 12 mars</p><p class="tb-doc mk-small">Décisions : lancement de la version 2.4 le 2 avril ; Léo prépare la note de version, Sarah les captures d’écran.</p></div>`);

const INV_HEAD = `<div class="mk-row mk-between"><p class="mk-h3">Facture F-2026-0412</p><span class="mk-badge">Brouillon</span></div>
<p class="mk-small mk-muted">Atelier Vernier · 1 840,00 € TTC · échéance le 30 novembre</p>`;

const ST_CSS = `.st { display: grid; grid-template-columns: 116px minmax(0, 1fr); min-height: 230px; }
.st-side { display: flex; flex-direction: column; gap: 2px; padding: 12px 8px; background: #f4f6f9; border-inline-end: 1px solid #e3e6ec; }
.st-side span { padding: 6px 10px; border-radius: 6px; font-size: 13px; color: #3a4152; }
.st-side .on { background: #dfe7ff; color: #1a3a9c; font-weight: 700; }
.st-main { padding: 14px; }`;
const ST_SIDE = (active: boolean) =>
  `<div class="st-side"><span>Général</span><span>Utilisateurs</span><span>Facturation</span><span>Banques</span><span${active ? ' class="on"' : ''}>Taxes</span><span>Exports</span></div>`;
const ST_FIELDS = `<div class="mk-field"><span class="mk-label">Taux par défaut</span><span class="mk-input">20 %</span></div><div class="mk-field"><span class="mk-label">Arrondi</span><span class="mk-input">À la ligne</span></div>`;

const cognitiveLoad: ModuleContent = {
  id: 'cognitive-load',
  title: 'Charge cognitive',
  category: 'psychologie',
  summary:
    'Évaluer l’effort mental qu’impose un écran avec la check-list en 8 points d’impeccable, et supprimer la charge inutile : trop d’options, mémoire sollicitée, bruit visuel, jargon, allers-retours.',
  minutes: 11,
  commands: ['critique', 'distill', 'onboard', 'clarify'],
  sources: ['imp:critique', 'imp:distill', 'imp:onboard', 'imp:clarify', 'nng:heuristics', LAWS_CL, LAWS_WM, COWAN, NNG_RECALL, NNG_EXTERNAL],
  sections: [
    {
      id: 'trois-charges',
      title: 'Trois charges, une seule à éliminer',
      body: `La **charge cognitive** est l’effort mental total qu’exige une interface. Surchargée, une personne se trompe, s’agace et part. La théorie de la charge cognitive, lancée par John Sweller à la fin des années 1980 et reprise par impeccable, en distingue trois types :

- **Intrinsèque** : la complexité de la tâche elle-même. Déclarer ses revenus ou configurer un serveur est complexe : tu ne peux pas supprimer cette charge, seulement la **structurer** — découper en étapes, fournir modèles, valeurs par défaut et exemples, regrouper les décisions liées, ne montrer que ce qui sert maintenant.
- **Extrinsèque** : l’effort causé par la conception. Navigation qui oblige à se construire une carte mentale, libellés à deviner, encombrement visuel, motifs incohérents, étapes inutiles entre l’intention et le résultat. C’est du **pur gaspillage** : impeccable demande de l’éliminer sans pitié.
- **Essentielle** (*germane*) : l’effort pour comprendre et apprendre. C’est la **bonne** charge, celle qui mène à la maîtrise. On la soutient : divulgation progressive, motifs cohérents qui récompensent l’apprentissage, retours qui confirment qu’on a compris, prise en main par l’action plutôt que par des murs de texte.

Le travail du designer : ramener l’extrinsèque à zéro, pour laisser la place à la tâche et à l’apprentissage.`,
    },
    {
      id: 'memoire-de-travail',
      title: 'La règle de la mémoire de travail',
      body: `On ne garde qu’**environ 4 éléments** à l’esprit en même temps : c’est la loi de Miller révisée par Cowan (2001). À chaque point de décision, compte les options, actions ou informations distinctes qu’une personne doit considérer **simultanément** :

- **≤ 4** : dans les limites de la mémoire de travail, gérable ;
- **5 à 7** : à la limite ; envisage de regrouper ou de différer une partie ;
- **8 et plus** : surcharge ; les gens sautent des éléments, se trompent de clic ou abandonnent.

Les applications pratiques d’impeccable :

- **Boutons d’action** : 1 principal, 1 à 2 secondaires, le reste regroupé dans un menu.
- **Navigation** : ≤ 5 entrées de premier niveau, le reste rangé sous des catégories claires.
- **Articles longs** : un seul chemin de lecture ; les liens connexes réunis en un bloc à la fin plutôt que semés dans le texte.
- **Barres latérales de documentation** : ≤ 4 choix de même niveau visibles avant de regrouper.
- **Portfolios et galeries** : une décision par écran (quelle œuvre ouvrir), pas filtres, tris et étiquettes en même temps.`,
      examples: [
        {
          title: 'Une décision, quatre options au plus',
          bad: {
            alt: 'Choix du mode de livraison présentant huit options de même poids, du domicile standard au retrait en magasin.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Mode de livraison</p><div class="sh-list">${ship('Domicile standard', '4,90 € · 48 h')}${ship('Domicile express', '9,90 € · 24 h')}${ship('Point relais', '3,50 € · 3 à 5 j')}${ship('Point relais express', '6,90 € · 24 h')}${ship('Consigne automatique', '3,90 € · 3 à 4 j')}${ship('Créneau d’une heure', '5,90 € · 48 h')}${ship('Livraison du soir', '12,90 € · 19 h à 22 h')}${ship('Retrait en magasin', 'Gratuit · dès 2 h')}</div></div>`),
            css: SHIP_CSS,
          },
          badNote: 'Huit options de même poids : au-delà de 7, c’est la surcharge — on compare, on hésite, on abandonne.',
          good: {
            alt: 'Même choix réduit à trois options, la plus choisie signalée, avec un lien vers les cinq autres modes.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Mode de livraison</p><div class="sh-list">${ship('Point relais', '3,50 € · 3 à 5 j', 'Le plus choisi')}${ship('Domicile', '4,90 € · 48 h')}${ship('Retrait en magasin', 'Gratuit · dès 2 h')}</div><span class="mk-btn mk-btn--text" style="align-self:flex-start;padding:0;min-height:28px">Autres modes de livraison (5)</span></div>`),
            css: SHIP_CSS,
          },
          goodNote: 'Trois options courantes, un repère, et les cinq autres à un clic.',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'La check-list en 8 points',
      body: `Impeccable évalue la charge cognitive d’un écran avec huit questions :

1. **Focus unique** : la tâche principale se fait-elle sans éléments concurrents qui distraient ?
2. **Segmentation** : l’information est-elle présentée en groupes digestes (≤ 4 éléments par groupe) ?
3. **Regroupement** : les éléments liés sont-ils groupés visuellement (proximité, bordure, fond commun) ?
4. **Hiérarchie visuelle** : voit-on immédiatement ce qui compte le plus ?
5. **Une chose à la fois** : peut-on se concentrer sur une décision avant de passer à la suivante ?
6. **Choix minimaux** : les décisions sont-elles simplifiées (≤ 4 options visibles à chaque point de décision) ?
7. **Mémoire de travail** : faut-il se souvenir d’une information d’un écran précédent pour agir sur celui-ci ? Attention au sens : ici, un « oui » est un échec.
8. **Divulgation progressive** : la complexité n’apparaît-elle que lorsqu’on en a besoin ?

**Notation** : compte les échecs. **0 ou 1** : charge faible (bien). **2 ou 3** : charge modérée (à traiter bientôt). **4 et plus** : charge élevée (correction critique).

Dans une critique, impeccable demande de signaler les échecs de la check-list **et** chaque point de décision qui affiche plus de 4 options visibles.`,
    },
    {
      id: 'reconnaissance',
      title: 'Reconnaître plutôt que se rappeler',
      body: `La 6e heuristique de Nielsen demande de **minimiser la charge mémoire** : objets, actions et options doivent être visibles ou faciles à retrouver. Reconnaître ce qu’on voit coûte bien moins que se rappeler ce qui est absent, parce que la reconnaissance s’appuie sur des indices.

- **Options visibles**, pas enfouies dans des menus cachés.
- **Aide contextuelle** au moment utile : infobulles, indications sous le champ.
- **Historique et éléments récents**, **autocomplétion** et suggestions.
- **Libellés sur les icônes** : une barre faite d’icônes seules oblige à mémoriser leur sens.
- **Mémoire externe** : panier, tableau de comparaison, récapitulatif — l’interface retient à la place de la personne.

L’échec typique est le **pont de mémoire** : devoir retenir à l’étape 3 un montant, une référence ou un choix vu à l’étape 1. La correction : garder le contexte visible, ou le répéter là où il sert.`,
      examples: [
        {
          title: 'Des icônes qu’on n’a pas à deviner',
          bad: {
            alt: 'Éditeur de documents avec une barre de six icônes sans libellé : étincelles, grille, entonnoir, curseurs, partage, marque-page.',
            html: tbMock(false),
            css: TB_CSS,
          },
          badNote: 'Six icônes sans texte : il faut se rappeler ce que fait chacune, ou survoler pour vérifier.',
          good: {
            alt: 'Même barre où chaque icône porte un libellé : Résumer, Modèles, Filtrer, Réglages, Partager, Enregistrer.',
            html: tbMock(true),
            css: TB_CSS,
          },
          goodNote: 'Chaque icône dit ce qu’elle fait : on reconnaît au lieu de se souvenir.',
        },
      ],
    },
    {
      id: 'violations',
      title: 'Huit violations courantes',
      body: `Impeccable répertorie huit façons courantes de surcharger une personne, chacune avec sa correction :

1. **Le mur d’options** : 10 choix ou plus d’un coup, sans hiérarchie. → Regroupe en catégories, mets en avant l’option recommandée, divulgue progressivement.
2. **Le pont de mémoire** : il faut retenir une information de l’étape 1 pour finir l’étape 3. → Garde le contexte visible ou répète-le là où il sert.
3. **La navigation cachée** : il faut se construire une carte mentale des lieux. → Montre toujours où l’on est : fil d’Ariane, état actif, indicateur de progression.
4. **La barrière du jargon** : un vocabulaire technique ou métier oblige à traduire. → Langage courant ; si un terme est inévitable, définis-le sur place.
5. **Le plancher de bruit visuel** : tout a le même poids, rien ne ressort. → Une hiérarchie nette : un élément principal, 2 à 3 secondaires, tout le reste en retrait.
6. **Le motif incohérent** : des actions semblables fonctionnent différemment selon l’endroit. → Standardise : même type d’action, même type d’interface.
7. **Le multitâche imposé** : lire, décider et naviguer en même temps. → Séquence les étapes : une chose à la fois.
8. **Le changement de contexte** : sauter d’écran en écran, d’onglet en onglet ou de fenêtre en fenêtre pour réunir les informations d’une seule décision. → Rassemble au même endroit ce dont chaque décision a besoin.`,
      examples: [
        {
          title: 'Le plancher de bruit visuel',
          bad: {
            alt: 'Fiche produit d’un sac à dos avec quatre badges colorés, un titre rose, un prix orange, des mentions vertes et bleues en gras et deux boutons pleins de couleurs différentes.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:8px"><div class="mk-row mk-wrap" style="--gap:6px"><span class="nz-b nz-b1">Nouveau</span><span class="nz-b nz-b2">-20 %</span><span class="nz-b nz-b3">Éco-conçu</span><span class="nz-b nz-b4">Top vente</span></div><p class="nz-title">Sac à dos Trek 28 L</p><p class="nz-price">71,92 € <s>89,90 €</s></p><p class="nz-ok">Livraison offerte dès 50 € !</p><p class="nz-info">Garantie 2 ans !</p><div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn" style="background:#c2410c">Ajouter au panier</span><span class="mk-btn" style="background:#1e7a37">Acheter maintenant</span></div></div>`),
            css: `.nz-b { font-size: 11px; font-weight: 800; color: #fff; padding: 2px 8px; border-radius: 999px; }
.nz-b1 { background: #c2255c; } .nz-b2 { background: #c2410c; } .nz-b3 { background: #1e7a37; } .nz-b4 { background: #6741d9; }
.nz-title { font-size: 19px; font-weight: 800; color: #c2255c; }
.nz-price { font-size: 22px; font-weight: 800; color: #c2410c; }
.nz-price s { font-size: 14px; color: #6b7280; }
.nz-ok { font-weight: 800; color: #1e7a37; }
.nz-info { font-weight: 800; color: #1f4fd8; }`,
          },
          badNote: 'Quatre badges, quatre couleurs de texte, deux boutons pleins : tout crie, donc rien ne guide.',
          good: {
            alt: 'Même fiche avec un seul badge discret, un titre sombre, le prix en gras, les mentions regroupées en gris et un seul bouton plein.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:8px"><span class="mk-badge" style="align-self:flex-start">-20 %</span><p class="mk-h2">Sac à dos Trek 28 L</p><p><span class="mk-price" style="font-size:20px">71,92 €</span> <s class="mk-muted">89,90 €</s></p><p class="mk-small mk-muted">Livraison offerte dès 50 € · Garantie 2 ans · Éco-conçu</p><div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn">Ajouter au panier</span><span class="mk-btn mk-btn--ghost">Ajouter aux favoris</span></div></div>`),
          },
          goodNote: 'Un seul élément principal (le bouton « Ajouter au panier »), trois secondaires (titre, prix, favoris), le reste en retrait (badge, mentions).',
        },
      ],
    },
    {
      id: 'divulgation',
      title: 'Divulgation progressive : différer sans cacher',
      body: `La **divulgation progressive** montre ce qui sert maintenant et garde le reste à portée : options avancées repliées, étapes successives, fonctions découvertes en contexte. Elle agit sur les trois charges : elle structure l’intrinsèque, retire de l’extrinsèque et dose l’essentielle.

Ses garde-fous, tirés d’impeccable (*distill*, *onboard*) :

- **Ne cache jamais une information nécessaire à la décision** en cours : un prix, une condition, des frais.
- **Le mystère n’est pas du minimalisme** : simplifier jusqu’au flou ajoute de la charge au lieu d’en retirer.
- **Pas d’étapes pour rien** : séquencer aide quand chaque étape porte une vraie décision ; découper une saisie triviale en écrans multiplie les transitions.
- **Un point d’entrée clair** : un accordéon nommé, un lien « Options avancées », un onglet — jamais un geste caché.
- **En prise en main** : demander le minimum à l’inscription (on collecte le reste plus tard), conduire vite à une première réussite, faire découvrir les fonctions avancées au moment où elles servent.`,
    },
  ],
  rules: [
    { id: 'types', front: 'Quels sont les trois types de charge cognitive ?', back: 'Intrinsèque (la tâche : à structurer), extrinsèque (la conception : à éliminer), essentielle ou germane (l’apprentissage : à soutenir).' },
    { id: 'working-memory', front: 'Combien d’éléments à considérer ensemble à un point de décision ?', back: '≤ 4 : gérable. 5 à 7 : limite, regroupe ou diffère. 8 et plus : surcharge.' },
    { id: 'actions', front: 'Combien de boutons d’action sur un écran ?', back: 'Un principal, un ou deux secondaires, le reste regroupé dans un menu.' },
    { id: 'nav', front: 'Combien d’entrées de navigation de premier niveau ?', back: '≤ 5, le reste rangé sous des catégories claires.' },
    { id: 'score', front: 'Comment noter la check-list de charge cognitive ?', back: 'Compte les échecs sur 8 : 0–1 faible, 2–3 modérée (à traiter bientôt), 4 et plus élevée (correction critique).' },
    { id: 'bridge', front: 'Qu’est-ce qu’un pont de mémoire ?', back: 'Devoir retenir une information d’une étape pour agir à une autre. Garde le contexte visible ou répète-le là où il sert.' },
    { id: 'recognition', front: 'Que demande « reconnaître plutôt que se rappeler » ?', back: 'Des options et informations visibles ou faciles à retrouver : libellés sur les icônes, historique, autocomplétion, récapitulatifs.' },
    { id: 'noise', front: 'Comment sortir du plancher de bruit visuel ?', back: 'Un élément principal, deux ou trois secondaires, tout le reste en retrait.' },
    { id: 'jargon', front: 'Que faire d’un terme métier inévitable ?', back: 'Le définir sur place. Partout ailleurs, langage courant.' },
    { id: 'context', front: 'Comment éviter le changement de contexte ?', back: 'Rassembler au même endroit toutes les informations nécessaires à une décision (tableau comparatif, récapitulatif).' },
    { id: 'sequence', front: 'Comment corriger le multitâche imposé ?', back: 'Séquencer : une décision à la fois, avec une progression visible.' },
    { id: 'disclosure', front: 'Quelle limite pour la divulgation progressive ?', back: 'Ne jamais cacher une information nécessaire à la décision en cours : le mystère n’est pas du minimalisme.' },
  ],
  exercises: [
    {
      id: 'cognitive-load-actions-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quelle barre d’actions sais-tu tout de suite quoi faire ?',
      context: 'Éditeur de factures en ligne, au moment d’envoyer une facture terminée.',
      options: [
        {
          id: 'seven',
          visual: {
            alt: 'Facture en brouillon avec sept boutons de même style : Enregistrer, Aperçu, Dupliquer, Exporter PDF, Envoyer, Imprimer, Supprimer.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">${INV_HEAD}<div class="mk-row mk-wrap" style="--gap:6px"><span class="mk-btn mk-btn--ghost mk-btn--s">Enregistrer</span><span class="mk-btn mk-btn--ghost mk-btn--s">Aperçu</span><span class="mk-btn mk-btn--ghost mk-btn--s">Dupliquer</span><span class="mk-btn mk-btn--ghost mk-btn--s">Exporter PDF</span><span class="mk-btn mk-btn--ghost mk-btn--s">Envoyer</span><span class="mk-btn mk-btn--ghost mk-btn--s">Imprimer</span><span class="mk-btn mk-btn--ghost mk-btn--s">Supprimer</span></div></div>`),
          },
          why: 'Sept boutons de même poids : il faut tous les lire pour trouver l’action principale, et « Supprimer » pèse autant qu’« Envoyer ».',
        },
        {
          id: 'ranked',
          visual: {
            alt: 'Même facture avec un bouton plein « Envoyer la facture », deux boutons secondaires « Enregistrer » et « Aperçu », et un bouton « Plus d’actions ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">${INV_HEAD}<div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn">Envoyer la facture</span><span class="mk-btn mk-btn--ghost">Enregistrer</span><span class="mk-btn mk-btn--ghost">Aperçu</span><span class="mk-btn mk-btn--ghost" title="Plus d’actions"><i data-icon="ellipsis"></i></span></div></div>`),
          },
          why: 'Une action principale, deux secondaires, le reste dans un menu : la décision tient en un coup d’œil.',
        },
      ],
      answer: 'ranked',
      explanation: `À chaque point de décision, compte ce qu’il faut considérer en même temps. Sept actions équivalentes dépassent les quelque 4 éléments que la mémoire de travail gère sans effort : la personne doit balayer, comparer, hésiter.

La règle pratique d’impeccable pour les boutons : **1 principal, 1 à 2 secondaires, le reste regroupé dans un menu**. Les actions rares — dupliquer, imprimer, supprimer — restent accessibles sans peser sur chaque visite.`,
      takeaway: 'Boutons d’action : un principal, un ou deux secondaires, le reste regroupé dans un menu « Plus ».',
      sources: ['imp:critique', 'imp:distill'],
    },
    {
      id: 'cognitive-load-bridge-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Dernière étape d’un virement : quel écran n’exige rien de ta mémoire ?',
      options: [
        {
          id: 'recall',
          visual: {
            alt: 'Étape 3 d’un virement : une consigne demande de vérifier le bénéficiaire et le montant saisis aux étapes précédentes, sans les afficher, puis un champ pour le code SMS et un bouton « Valider ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-small mk-muted">Étape 3 sur 3</p><p class="mk-h2">Confirmer le virement</p><p class="mk-small">Vérifiez le bénéficiaire et le montant saisis aux étapes précédentes, puis validez.</p><div class="mk-field"><span class="mk-label">Code reçu par SMS</span><span class="mk-input">••••••</span></div><span class="mk-btn mk-btn--block">Valider</span></div>`),
          },
          why: 'Il faut se souvenir du bénéficiaire et du montant saisis deux écrans plus tôt — ou revenir en arrière pour les retrouver.',
        },
        {
          id: 'recap',
          visual: {
            alt: 'Étape 3 d’un virement avec un récapitulatif : bénéficiaire Léa Martin, montant 250 euros, motif Loyer novembre, un lien « Modifier », le champ du code SMS et un bouton « Confirmer le virement de 250,00 € ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-small mk-muted">Étape 3 sur 3</p><p class="mk-h2">Vérifier et confirmer</p><div class="vr"><div class="mk-row mk-between"><span class="mk-muted">Bénéficiaire</span><span class="vr-val"><b>Léa Martin</b><span class="vr-iban">FR76 … 0189</span></span></div><div class="mk-row mk-between"><span class="mk-muted">Montant</span><b class="mk-price">250,00 €</b></div><div class="mk-row mk-between"><span class="mk-muted">Motif</span><span>Loyer novembre</span></div><span class="vr-edit">Modifier</span></div><div class="mk-field"><span class="mk-label">Code reçu par SMS</span><span class="mk-input">••••••</span></div><span class="mk-btn mk-btn--block vr-cta">Confirmer le virement de 250,00 €</span></div>`),
            css: `.vr { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 10px; background: #f4f6f9; font-size: 13px; }
.vr-val { display: flex; flex-wrap: wrap; justify-content: flex-end; column-gap: 8px; }
.vr-iban { color: #5a6172; white-space: nowrap; }
.vr-edit { align-self: flex-end; color: #1f4fd8; font-weight: 600; }
.vr-cta { white-space: normal; text-align: center; text-wrap: balance; line-height: 1.25; padding-block: 8px; }`,
          },
          why: 'Tout ce qui fonde la décision est sous les yeux, avec un lien pour corriger : rien à retenir.',
        },
      ],
      answer: 'recap',
      explanation: `C’est le **pont de mémoire** : la personne doit retenir une information de l’étape 1 pour agir à l’étape 3. La mémoire de travail ne garde que quelques éléments, pendant quelques dizaines de secondes ; une interruption suffit à les perdre.

La correction d’impeccable : **garder le contexte visible ou le répéter là où il sert**. Pour une action engageante comme un virement, le récapitulatif sert aussi de vérification — et un bouton qui nomme le montant (« Confirmer le virement de 250,00 € ») lève toute ambiguïté.`,
      takeaway: 'Ne demande jamais de retenir une information d’un écran précédent : répète-la là où la décision se prend.',
      sources: ['imp:critique', 'nng:heuristics', LAWS_WM],
    },
    {
      id: 'cognitive-load-jargon-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel message permet de savoir quoi faire sans rien traduire ?',
      context: 'Service de stockage de photos, au moment d’un envoi qui échoue.',
      options: [
        {
          id: 'jargon',
          visual: {
            alt: 'Message d’erreur intitulé « Erreur 413 : Payload Too Large », mentionnant un quota S3, un identifiant de bucket et l’administrateur, avec un bouton OK.',
            html: fr(`<div class="mk-pad"><div class="er mk-stack" style="--gap:8px"><div class="mk-row" style="--gap:8px"><i data-icon="circle-alert"></i><b>Erreur 413 : Payload Too Large</b></div><p class="mk-small">Quota S3 dépassé (bucket user-2291, 15360/15360 MiB). Upload rejeté. Contactez l’administrateur.</p><span class="mk-btn mk-btn--ghost mk-btn--s" style="align-self:flex-start">OK</span></div></div>`),
            css: `.er { padding: 14px; border-radius: 12px; border: 1px solid #f0c7c3; background: #fdf3f2; }
.er .mk-ico { color: #b3261e; }`,
          },
          why: 'Code technique, nom de service, identifiant interne : il faut traduire avant de comprendre, et « l’administrateur » n’existe pas pour un particulier.',
        },
        {
          id: 'plain',
          visual: {
            alt: 'Message d’erreur intitulé « Votre espace de stockage est plein », expliquant que trois photos n’ont pas été envoyées, avec deux boutons : « Libérer de l’espace » et « Voir les offres ».',
            html: fr(`<div class="mk-pad"><div class="er mk-stack" style="--gap:8px"><div class="mk-row" style="--gap:8px"><i data-icon="circle-alert"></i><b>Votre espace de stockage est plein</b></div><p class="mk-small">Les 3 photos n’ont pas été envoyées : vous utilisez 15 Go sur 15 Go. Libérez de la place, ou passez à 100 Go pour 1,99 € par mois.</p><div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn mk-btn--s">Libérer de l’espace</span><span class="mk-btn mk-btn--ghost mk-btn--s">Voir les offres</span></div></div></div>`),
            css: `.er { padding: 14px; border-radius: 12px; border: 1px solid #f0c7c3; background: #fdf3f2; }
.er .mk-ico { color: #b3261e; }`,
          },
          why: 'Ce qui s’est passé, en mots courants, avec deux façons d’en sortir.',
        },
      ],
      answer: 'plain',
      explanation: `La **barrière du jargon** : un vocabulaire technique ou métier oblige à traduire avant d’agir. C’est une charge **extrinsèque**, née de la conception et non de la tâche. Impeccable demande un langage courant et, si un terme métier est inévitable, sa définition sur place.

Un bon message d’erreur dit ce qui a échoué, pourquoi quand c’est utile, et comment s’en sortir — sans jamais faire d’un code interne le message principal.`,
      takeaway: 'Écris dans la langue de la personne : un terme métier inévitable se définit sur place, un code interne n’est jamais le message.',
      sources: ['imp:critique', 'imp:clarify'],
    },
    {
      id: 'cognitive-load-location-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Dans quel écran sais-tu où tu te trouves ?',
      context: 'Paramètres d’un logiciel de comptabilité, sur trois niveaux de profondeur.',
      options: [
        {
          id: 'lost',
          visual: {
            frame: 'browser',
            alt: 'Écran de paramètres avec une barre latérale de six entrées toutes identiques, un titre générique « Paramètres » et deux champs de taux et d’arrondi.',
            html: fr(`<div class="st">${ST_SIDE(false)}<div class="st-main mk-stack" style="--gap:10px"><p class="mk-h3">Paramètres</p>${ST_FIELDS}</div></div>`),
            css: ST_CSS,
          },
          why: 'Aucune entrée active, un titre générique : impossible de savoir quelle page est affichée sans interpréter son contenu.',
        },
        {
          id: 'located',
          visual: {
            frame: 'browser',
            alt: 'Même écran où l’entrée « Taxes » est surlignée dans la barre latérale, avec un fil d’Ariane « Paramètres › Taxes › TVA » et le titre « TVA ».',
            html: fr(`<div class="st">${ST_SIDE(true)}<div class="st-main mk-stack" style="--gap:10px"><p class="mk-small mk-muted">Paramètres › Taxes › TVA</p><p class="mk-h3">TVA</p>${ST_FIELDS}</div></div>`),
            css: ST_CSS,
          },
          why: 'Entrée active surlignée, fil d’Ariane et titre précis : la position se lit d’un coup d’œil.',
        },
      ],
      answer: 'located',
      explanation: `La **navigation cachée** oblige à se construire une carte mentale des lieux : où suis-je, par où suis-je passé, comment revenir ? C’est de la charge extrinsèque pure.

La correction d’impeccable : **toujours montrer la position actuelle** — fil d’Ariane, état actif, indicateur de progression. C’est aussi l’heuristique n° 1 de Nielsen : la visibilité de l’état du système.`,
      takeaway: 'Montre toujours où l’on est : entrée active, fil d’Ariane, titre précis.',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'cognitive-load-context-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Pour choisir un forfait mobile, quelle page t’évite les allers-retours ?',
      options: [
        {
          id: 'details',
          visual: {
            alt: 'Liste de trois forfaits S, M et L avec seulement leur prix mensuel et un lien « Voir le détail » pour chacun.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Choisissez votre forfait</p><div class="fx-row"><div><b>Forfait S</b><p class="mk-small mk-muted">9,99 €/mois</p></div><span class="fx-link">Voir le détail</span></div><div class="fx-row"><div><b>Forfait M</b><p class="mk-small mk-muted">15,99 €/mois</p></div><span class="fx-link">Voir le détail</span></div><div class="fx-row"><div><b>Forfait L</b><p class="mk-small mk-muted">24,99 €/mois</p></div><span class="fx-link">Voir le détail</span></div></div>`),
            css: `.fx-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 10px; }
.fx-link { color: #1f4fd8; font-weight: 600; font-size: 13px; text-decoration: underline; }`,
          },
          why: 'Les données qui départagent sont dans trois fenêtres de détail : il faut les ouvrir une à une et retenir chaque chiffre pour comparer.',
        },
        {
          id: 'table',
          visual: {
            alt: 'Tableau comparatif des forfaits S, M et L : données en France et en Europe, appels et SMS, prix mensuel, côte à côte.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Choisissez votre forfait</p><table class="fx-t"><thead><tr><th></th><th>S</th><th>M</th><th>L</th></tr></thead><tbody><tr><th>Internet</th><td>20 Go</td><td>100 Go</td><td>250 Go</td></tr><tr><th>En Europe</th><td>5 Go</td><td>15 Go</td><td>30 Go</td></tr><tr><th>Appels et SMS</th><td>Illimités</td><td>Illimités</td><td>Illimités</td></tr><tr><th>Prix</th><td>9,99 €</td><td>15,99 €</td><td>24,99 €</td></tr></tbody></table><p class="mk-small mk-muted">Prix par mois, sans engagement.</p></div>`),
            css: `.fx-t { width: 100%; border-collapse: collapse; font-size: 13px; font-variant-numeric: tabular-nums; }
.fx-t th, .fx-t td { padding: 7px 6px; border-bottom: 1px solid #eceef2; text-align: center; }
.fx-t tbody th { text-align: start; font-weight: 600; color: #3a4152; }
.fx-t thead th { font-size: 14px; }
.fx-t tbody tr:last-child td { font-weight: 700; }`,
          },
          why: 'Les critères qui comptent sont alignés côte à côte : la comparaison se fait sur place.',
        },
      ],
      answer: 'table',
      explanation: `C’est le **changement de contexte** : pour une seule décision, la personne doit passer d’une fenêtre à l’autre et garder en tête ce qu’elle a vu — ce qui sollicite en plus sa mémoire de travail.

La correction d’impeccable : **réunir au même endroit les informations nécessaires à chaque décision**. Un tableau comparatif est une « mémoire externe » : il retient à la place de la personne. Laws of UX recommande d’ailleurs les vues côte à côte dès qu’une comparaison est nécessaire.`,
      takeaway: 'Rassemble sur un même écran ce qu’une décision demande : un tableau comparatif vaut mieux que trois fenêtres de détail.',
      sources: ['imp:critique', NNG_EXTERNAL, { label: 'Laws of UX — Surcharge de choix', url: 'https://lawsofux.com/choice-overload/' }],
    },
    {
      id: 'cognitive-load-grouping-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle l’espace entre les groupes pour que ce formulaire se lise en trois blocs.',
      visual: {
        alt: 'Formulaire d’adresse de livraison en trois groupes — destinataire, adresse, livraison — dont l’espacement entre groupes varie avec le curseur.',
        html: fr(`<div class="mk-pad"><p class="mk-h3" style="margin-bottom:12px">Adresse de livraison</p><div class="gp">
<div class="gp-g"><span class="gp-t">Destinataire</span><div class="mk-field"><span class="mk-label">Prénom et nom</span><span class="mk-input">Hugo Lambert</span></div><div class="mk-field"><span class="mk-label">Téléphone</span><span class="mk-input">06 48 22 19 05</span></div></div>
<div class="gp-g"><span class="gp-t">Adresse</span><div class="mk-field"><span class="mk-label">Rue</span><span class="mk-input">8 avenue Jean-Jaurès</span></div><div class="mk-row" style="--gap:8px;align-items:stretch"><div class="mk-field" style="width:110px"><span class="mk-label">Code postal</span><span class="mk-input">31000</span></div><div class="mk-field mk-grow"><span class="mk-label">Ville</span><span class="mk-input">Toulouse</span></div></div></div>
<div class="gp-g"><span class="gp-t">Livraison</span><div class="mk-field"><span class="mk-label">Instructions pour le livreur</span><span class="mk-input">Code porte 4B21, 2e étage</span></div></div>
</div></div>`),
        css: `.gp { display: flex; flex-direction: column; gap: var(--v, 10px); }
.gp-g { display: flex; flex-direction: column; gap: 10px; }
.gp-t { font-size: 12px; font-weight: 700; color: #5a6172; }
.gp .mk-input { min-height: 34px; padding: 6px 10px; }`,
      },
      control: 'Espace entre les groupes',
      min: 0,
      max: 64,
      step: 2,
      initial: 10,
      unit: 'px',
      target: [20, 40],
      ideal: 28,
      explanation: `Le point **Segmentation** de la check-list d’impeccable demande de présenter l’information en groupes digestes ; le point **Regroupement**, de grouper visuellement ce qui va ensemble — d’abord par la **proximité** (loi de la Gestalt).

Ici, les champs d’un même groupe sont espacés de 10 px. Avec 10 px entre les groupes aussi, le formulaire devient une liste monotone qu’on lit champ par champ. Il faut un écart nettement plus grand que l’espace interne : sur cette maquette, 20 à 40 px font apparaître trois blocs qu’on traite l’un après l’autre. Au-delà, les groupes se détachent au point de sembler appartenir à des écrans différents.`,
      takeaway: 'Segmente par l’espace : serré dans un groupe, nettement plus large entre les groupes.',
      sources: ['imp:critique', 'imp:layout', LAWS_PROX, LAWS_CHUNK],
    },
    {
      id: 'cognitive-load-form-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux sources de charge cognitive inutile dans ce devis d’assurance habitation.',
      visual: {
        frame: 'browser',
        alt: 'Étape 2 d’un devis d’assurance habitation : surface du logement, une question « Souhaitez-vous la PNO ? » avec les choix Oui et Non, une rubrique « Garanties souhaitées » de onze cases à cocher sur deux colonnes, et un bouton « Continuer ».',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:14px">
<div data-hotspot="progress"><p class="mk-small mk-muted">Étape 2 sur 4</p><p class="mk-h2">Votre logement</p></div>
<div class="mk-field" data-hotspot="surface"><span class="mk-label">Surface habitable</span><span class="mk-input" style="max-width:140px">62 m²</span></div>
<div class="mk-field" data-hotspot="pno"><span class="mk-label">Souhaitez-vous la PNO ?</span><div class="mk-row" style="--gap:18px"><span class="ins-radio">Oui</span><span class="ins-radio">Non</span></div></div>
<div class="mk-stack" style="--gap:8px" data-hotspot="options"><span class="mk-label">Garanties souhaitées</span><div class="ins-opts"><span class="mk-check">Dégâts des eaux</span><span class="mk-check">Incendie</span><span class="mk-check">Vol et vandalisme</span><span class="mk-check">Bris de glace</span><span class="mk-check">Objets de valeur</span><span class="mk-check">Appareils nomades</span><span class="mk-check">Équipements extérieurs</span><span class="mk-check">Dommages électriques</span><span class="mk-check">Assistance dépannage</span><span class="mk-check">Protection juridique</span><span class="mk-check">Rééquipement à neuf</span></div></div>
<span class="mk-btn" style="align-self:flex-start" data-hotspot="next">Continuer</span>
</div>`),
        css: `.ins-opts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 12px; font-size: 13px; }
.ins-radio { display: inline-flex; align-items: center; gap: 6px; }
.ins-radio::before { content: ""; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #8b92a1; }`,
      },
      hotspots: [
        { id: 'options', label: 'Onze garanties à plat', correct: true, why: 'Mur d’options : onze choix d’un coup, sans regroupement ni recommandation. Il faut tout lire et décider de chacun.' },
        { id: 'pno', label: 'Question sur « la PNO »', correct: true, why: 'Barrière du jargon : « PNO » (propriétaire non occupant) n’est pas expliqué. La plupart des gens ne savent pas quoi répondre.' },
        { id: 'progress', label: 'Indicateur « Étape 2 sur 4 »', correct: false, why: 'La position dans le parcours est visible : c’est une bonne pratique.' },
        { id: 'surface', label: 'Champ « Surface habitable »', correct: false, why: 'Une question simple, avec son unité : rien à corriger.' },
        { id: 'next', label: 'Bouton « Continuer »', correct: false, why: 'Une seule action principale, clairement nommée.' },
      ],
      explanation: `Deux violations de la liste d’impeccable :

- **Le mur d’options** : onze garanties à plat, sans hiérarchie. Correction : regrouper (« Essentielles », « Utiles selon votre situation », « Options »), recommander un ensemble adapté au logement décrit, et replier le reste derrière « Personnaliser mes garanties ».
- **La barrière du jargon** : « PNO » oblige à traduire. Correction : poser la question en mots courants — « Êtes-vous propriétaire d’un logement que vous n’habitez pas ? » — ou définir le terme sur place.

L’indicateur d’étape, le champ de surface et le bouton sont clairs.`,
      takeaway: 'Au-delà de 4 options à un point de décision, regroupe et recommande ; un sigle métier se remplace ou se définit sur place.',
      sources: ['imp:critique', 'imp:clarify'],
    },
    {
      id: 'cognitive-load-dashboard-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les deux violations de charge cognitive sur cet écran de gestion des commandes.',
      visual: {
        frame: 'browser',
        alt: 'Écran « Commandes » d’une boutique : fil d’Ariane, champ de recherche, quatre indicateurs chiffrés sur fonds rouge, vert, jaune et violet, des onglets de filtre, et une liste de quatre commandes suivies chacune d’une action : un bouton « Expédier », une icône de camion, une icône à trois points, puis un lien « Marquer expédiée ».',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
<div class="mk-row mk-between mk-wrap" style="--gap:8px"><div data-hotspot="crumbs"><p class="mk-small mk-muted">Boutique › Commandes</p><p class="mk-h2">Commandes</p></div><span class="db-search" data-hotspot="search"><i data-icon="search" style="--ico:15px"></i>N° ou client</span></div>
<div class="db-kpis" data-hotspot="kpis"><div class="db-k db-k1"><i data-icon="trending-up"></i><b>128</b><span>Commandes</span></div><div class="db-k db-k2"><i data-icon="euro"></i><b>9 412 €</b><span>Ventes</span></div><div class="db-k db-k3"><i data-icon="truck"></i><b>14</b><span>À expédier</span></div><div class="db-k db-k4"><i data-icon="refresh-cw"></i><b>3</b><span>Retours</span></div></div>
<div class="mk-tabs" data-hotspot="tabs"><span class="mk-tab mk-tab--on">Toutes</span><span class="mk-tab">À expédier</span><span class="mk-tab">Expédiées</span></div>
<div class="db-list" data-hotspot="actions"><div class="db-r"><span><b>#1042</b> · Anaïs Roux</span><span class="mk-btn mk-btn--s">Expédier</span></div><div class="db-r"><span><b>#1043</b> · Karim Haddad</span><span class="db-ic"><i data-icon="truck"></i></span></div><div class="db-r"><span><b>#1044</b> · Julie Morel</span><span class="db-ic"><i data-icon="ellipsis"></i></span></div><div class="db-r"><span><b>#1045</b> · Tom Lefèvre</span><span class="db-link">Marquer expédiée</span></div></div>
</div>`),
        css: `.db-search { display: flex; align-items: center; gap: 6px; min-height: 34px; min-width: 150px; padding: 0 10px; border: 1px solid #c3c8d3; border-radius: 8px; color: #5a6172; font-size: 13px; }
.db-kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(92px, 1fr)); gap: 8px; }
.db-k { display: flex; flex-direction: column; gap: 2px; padding: 10px; border-radius: 10px; font-weight: 700; }
.db-k b { font-size: 20px; font-weight: 800; }
.db-k span { font-size: 12px; }
.db-k1 { background: #ffe0e0; color: #b02020; } .db-k2 { background: #d3f5db; color: #1d6b33; } .db-k3 { background: #fff0c2; color: #8a4b00; } .db-k4 { background: #e7ddff; color: #5531b8; }
.db-list { display: flex; flex-direction: column; }
.db-r { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 46px; padding: 6px 2px; border-bottom: 1px solid #eceef2; font-size: 13px; }
.db-ic { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 6px; color: #3a4152; }
.db-link { color: #1f4fd8; font-weight: 600; font-size: 12px; text-decoration: underline; white-space: nowrap; }
.mk-tab { padding: 8px 10px; font-size: 13px; white-space: nowrap; }`,
      },
      hotspots: [
        { id: 'kpis', label: 'Quatre indicateurs qui crient aussi fort', correct: true, why: 'Plancher de bruit visuel : quatre couleurs vives, même taille, même graisse. Rien ne ressort, pas même les 14 commandes à expédier — la seule donnée qui appelle une action.' },
        { id: 'actions', label: 'Une même action sous quatre formes', correct: true, why: 'Motif incohérent : expédier une commande prend la forme d’un bouton, d’une icône, d’un menu, puis d’un lien. Rien ne s’apprend d’une ligne à l’autre.' },
        { id: 'crumbs', label: 'Fil d’Ariane et titre', correct: false, why: 'La position dans le back-office est claire.' },
        { id: 'search', label: 'Recherche', correct: false, why: 'Un champ de recherche nommé par ce qu’il accepte : utile et clair.' },
        { id: 'tabs', label: 'Onglets de filtre', correct: false, why: 'Trois filtres, l’actif est marqué : conforme.' },
      ],
      explanation: `- **Plancher de bruit visuel** : quand tout a le même poids, rien n’est prioritaire. Correction d’impeccable : un élément principal, deux ou trois secondaires, le reste en retrait — ici, « 14 à expédier » mis en avant, les autres chiffres en neutre.
- **Motif incohérent** : la même action — expédier une commande — change de forme à chaque ligne. Correction : même type d’action, même composant partout.

Le fil d’Ariane, la recherche et les onglets de filtre sont clairs et cohérents.`,
      takeaway: 'Un élément principal par écran, et un même composant pour une même action : la cohérence s’apprend une fois, puis sert partout.',
      sources: ['imp:critique', 'imp:quieter'],
    },
    {
      id: 'cognitive-load-score-choice',
      type: 'choice',
      difficulty: 1,
      fixedOrder: true,
      context: 'Tu passes la check-list en 8 points d’impeccable sur l’écran de réservation d’une salle de sport. Trois points échouent : le focus unique, les choix minimaux et la mémoire de travail.',
      prompt: 'Comment qualifier la charge cognitive de cet écran ?',
      options: [
        { id: 'low', label: 'Faible : c’est bien', why: 'Faible correspond à 0 ou 1 échec.' },
        { id: 'moderate', label: 'Modérée : à traiter bientôt', why: 'Deux ou trois échecs : charge modérée.' },
        { id: 'high', label: 'Élevée : correction critique', why: 'Élevée commence à 4 échecs.' },
        { id: 'unknown', label: 'Impossible à dire sans test utilisateur', why: 'La check-list donne justement un verdict sans test, en comptant les échecs ; un test vérifiera ensuite les corrections.' },
      ],
      answer: 'moderate',
      explanation: `La notation d’impeccable est simple : on compte les échecs. **0 ou 1** = charge faible (bien), **2 ou 3** = modérée (à traiter bientôt), **4 et plus** = élevée (correction critique). Trois échecs : charge modérée.

Les points en échec désignent déjà les corrections : retirer ce qui distrait de la réservation, ramener les options visibles à 4 au plus, et rappeler sur place ce qu’il fallait retenir.`,
      takeaway: 'Check-list de charge cognitive : 0–1 échec = faible, 2–3 = modérée, 4 et plus = élevée (correction critique).',
      sources: ['imp:critique'],
    },
    {
      id: 'cognitive-load-signup-choice',
      type: 'choice',
      difficulty: 3,
      context: 'L’inscription d’une application de course à pied demande 14 champs : e-mail, mot de passe, prénom, puis taille, poids, âge, objectif, allure, fréquence, sports pratiqués, montre connectée, notifications, ville et photo.',
      prompt: 'Quelle approche réduit le mieux la charge, sans perdre d’information utile ?',
      options: [
        { id: 'defer', label: 'Créer le compte avec l’e-mail et le mot de passe, guider vers une première course, puis demander chaque information au moment où elle sert.', why: 'Divulgation progressive : le minimum pour commencer, le reste quand il apporte quelque chose.' },
        { id: 'optional', label: 'Garder les 14 champs sur une page, en marquant 11 d’entre eux « facultatif ».', why: 'Les champs restent visibles : il faut encore les lire et décider de chacun.' },
        { id: 'steps', label: 'Répartir les 14 champs sur 7 écrans de 2 champs.', why: 'Autant de décisions, six transitions de plus — et toujours avant toute réussite.' },
        { id: 'accordion', label: 'Replier les 11 champs de profil dans un accordéon « Plus d’infos », sur la page d’inscription.', why: 'Mieux qu’un mur de champs, mais tout est encore demandé avant que la personne ait vu ce que vaut l’application.' },
      ],
      answer: 'defer',
      explanation: `La **divulgation progressive** consiste à montrer ce qui sert maintenant et à garder le reste pour plus tard. Pour la prise en main, impeccable (*onboard*) précise : demander le **minimum** à l’inscription et collecter le reste ensuite, conduire vite à une **première réussite**, faire découvrir le reste **en contexte**.

L’allure ou la fréquence d’entraînement prennent leur sens après une première course. Les demander d’emblée ajoute onze décisions au moment où la personne ne sait pas encore si l’application en vaut la peine — même repliées dans un accordéon.`,
      takeaway: 'À l’inscription, demande le minimum ; collecte le reste au moment où chaque information sert.',
      sources: ['imp:onboard', 'imp:critique', 'imp:distill'],
    },
    {
      id: 'cognitive-load-checklist-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Quels points de la check-list échouent sur cet écran de paiement ?',
      visual: {
        frame: 'phone',
        alt: 'Écran de paiement sur téléphone : un bandeau promotionnel coloré pour des ventes privées, une ligne qui renvoie au récapitulatif de l’étape précédente pour le montant, quatre moyens de paiement, les champs de carte groupés et un bouton « Payer ».',
        html: fr(`<div class="pm-promo"><i data-icon="flame"></i><span><b>Ventes privées : -50 %</b> sur la déco jusqu’à minuit</span><span class="pm-see">Voir</span></div>
<div class="mk-pad mk-stack" style="--gap:12px">
<p class="mk-small mk-muted">Étape 3 sur 3 · Paiement</p>
<p class="mk-small">Montant : celui indiqué dans votre récapitulatif (étape 2).</p>
<div class="mk-stack" style="--gap:6px"><span class="mk-label">Moyen de paiement</span><div class="pm-m"><span class="on">Carte</span><span>PayPal</span><span>Apple Pay</span><span>Virement</span></div></div>
<div class="mk-stack" style="--gap:8px"><div class="mk-field"><span class="mk-label">Numéro de carte</span><span class="mk-input">4970 1234 5678 9012</span></div><div class="mk-row" style="--gap:8px"><div class="mk-field mk-grow"><span class="mk-label">Expiration</span><span class="mk-input">08/28</span></div><div class="mk-field mk-grow"><span class="mk-label">Cryptogramme</span><span class="mk-input">•••</span></div></div></div>
<span class="mk-btn mk-btn--block">Payer</span>
</div>`),
        css: `.pm-promo { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #c2255c; color: #fff; font-size: 12px; }
.pm-see { margin-inline-start: auto; padding: 4px 10px; border-radius: 999px; background: #fff; color: #c2255c; font-weight: 700; }
.pm-m { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.pm-m span { display: grid; place-items: center; min-height: 38px; border: 1px solid #c3c8d3; border-radius: 8px; font-size: 13px; font-weight: 600; }
.pm-m .on { border: 2px solid #1f4fd8; color: #1f3fae; }`,
      },
      options: [
        { id: 'focus', label: 'Focus unique', why: 'Échec : un bandeau promotionnel invite à quitter le paiement pour d’autres achats.' },
        { id: 'memory', label: 'Mémoire de travail', why: 'Échec : le montant n’est pas affiché, il faut se souvenir du récapitulatif de l’étape précédente.' },
        { id: 'choices', label: 'Choix minimaux', why: 'Réussi : quatre moyens de paiement, c’est la limite recommandée.' },
        { id: 'grouping', label: 'Regroupement', why: 'Réussi : les champs de la carte forment un bloc cohérent.' },
        { id: 'chunking', label: 'Segmentation', why: 'Réussi : l’écran se découpe en petits groupes digestes (moyens de paiement, carte, action).' },
      ],
      answers: ['focus', 'memory'],
      explanation: `Parmi les points proposés, deux échouent. Le bandeau brouille aussi la hiérarchie visuelle, qu’on peut compter comme un troisième échec : avec deux ou trois échecs, la charge est **modérée**, à traiter bientôt.

- **Focus unique** : au moment de payer, rien ne doit concurrencer la tâche. Un bandeau « Ventes privées » invite à partir ailleurs — au pire moment.
- **Mémoire de travail** : l’écran demande de se souvenir du montant vu à l’étape précédente. C’est un pont de mémoire ; le montant doit figurer sur l’écran de paiement, idéalement dans le bouton lui-même (par exemple « Payer 86,40 € »).

Les quatre moyens de paiement, les champs de carte groupés et le découpage de l’écran sont conformes.`,
      takeaway: 'Sur un écran de paiement : aucune distraction concurrente, et le montant à payer toujours sous les yeux.',
      sources: ['imp:critique'],
    },
    {
      id: 'cognitive-load-germane-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Une bonne interface élimine toute charge cognitive.',
      answer: false,
      explanation: `Seule la charge **extrinsèque** — celle que crée une mauvaise conception — est à éliminer. La charge **intrinsèque** vient de la tâche : on la structure (étapes, modèles, valeurs par défaut), on ne la supprime pas. La charge **essentielle** (*germane*) est l’effort d’apprentissage qui mène à la maîtrise : on la soutient.

Vouloir tout supprimer mène à simplifier jusqu’à l’abstraction : on retire des informations utiles à la décision, et l’effort revient ailleurs.`,
      takeaway: 'Élimine la charge extrinsèque, structure l’intrinsèque, soutiens l’essentielle (l’apprentissage).',
      sources: ['imp:critique', LAWS_CL],
    },
    {
      id: 'cognitive-load-steps-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un parcours en plusieurs étapes impose forcément plus de charge cognitive qu’une seule longue page.',
      answer: false,
      explanation: `La charge dépend de ce qu’on doit considérer **en même temps**, pas du nombre d’écrans. Séquencer permet de se concentrer sur une décision avant la suivante : c’est le point « Une chose à la fois » de la check-list d’impeccable, et la correction du « multitâche imposé ».

À deux conditions : chaque étape porte une vraie décision (sinon on ajoute des transitions pour rien), et la progression reste visible (« Étape 2 sur 3 »), avec un récapitulatif pour n’avoir rien à retenir.`,
      takeaway: 'Séquencer réduit la charge quand chaque étape porte une décision et que la progression reste visible.',
      sources: ['imp:critique', 'imp:distill'],
    },
    {
      id: 'cognitive-load-method-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range les étapes d’une évaluation de la charge cognitive d’un écran, de la première à la dernière.',
      items: [
        { id: 'decisions', label: 'Repérer la tâche principale et chaque point de décision de l’écran' },
        { id: 'count', label: 'Compter les options visibles à chaque point de décision' },
        { id: 'checklist', label: 'Passer les 8 points de la check-list en notant chaque échec' },
        { id: 'score', label: 'Compter les échecs et qualifier la charge : faible, modérée ou élevée' },
        { id: 'report', label: 'Signaler les échecs et les points à plus de 4 options, avec l’urgence que donne le verdict' },
      ],
      explanation: `Chaque étape s’appuie sur le résultat de la précédente :

1. **La tâche principale et les points de décision** : la tâche sert de repère au point « Focus unique », et c’est à chaque point de décision que la mémoire de travail est sollicitée.
2. **Les options visibles**, comptées à chacun de ces points : 4 au plus, c’est gérable ; de 5 à 7, c’est la limite ; 8 et plus, la surcharge.
3. **La check-list en 8 points** : le point « Choix minimaux » se juge directement sur ce décompte.
4. **Le verdict** : 0 ou 1 échec, charge faible ; 2 ou 3, modérée ; 4 et plus, élevée.
5. **Le rapport** : impeccable demande de signaler les échecs **et** chaque point de décision à plus de 4 options visibles. Le verdict fixe l’urgence : « à traiter bientôt » ou « correction critique ».`,
      takeaway: 'Points de décision, options visibles, check-list, verdict, rapport : chaque étape de l’évaluation s’appuie sur la précédente.',
      sources: ['imp:critique'],
    },
    {
      id: 'cognitive-load-violations-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque violation à sa correction.',
      leftTitle: 'Violation',
      rightTitle: 'Correction',
      pairs: [
        { id: 'wall', left: 'Mur d’options', right: 'Regrouper par catégories et mettre en avant l’option recommandée' },
        { id: 'bridge', left: 'Pont de mémoire', right: 'Répéter à l’étape 3 le montant saisi à l’étape 1' },
        { id: 'hidden', left: 'Navigation cachée', right: 'Afficher le fil d’Ariane et l’entrée active' },
        { id: 'jargon', left: 'Barrière du jargon', right: 'Définir sur place le terme métier inévitable' },
        { id: 'noise', left: 'Plancher de bruit visuel', right: 'Un élément principal, deux ou trois secondaires, le reste en retrait' },
        { id: 'multitask', left: 'Multitâche imposé', right: 'Séquencer : une décision à la fois' },
      ],
      explanation: `Chaque violation a sa correction type, tirée d’impeccable :

- **Mur d’options** → regrouper, recommander, divulguer progressivement.
- **Pont de mémoire** → garder le contexte visible ou le répéter.
- **Navigation cachée** → montrer la position : fil d’Ariane, état actif, progression.
- **Barrière du jargon** → langage courant, définition sur place.
- **Plancher de bruit visuel** → une hiérarchie nette.
- **Multitâche imposé** → une chose à la fois.

Les deux violations absentes ici — motif incohérent et changement de contexte — se corrigent en standardisant les composants et en réunissant au même endroit les informations d’une décision.`,
      takeaway: 'Regrouper, répéter, situer, traduire, hiérarchiser, séquencer : chaque violation a sa correction type.',
      sources: ['imp:critique'],
    },
  ],
};

export default cognitiveLoad;
