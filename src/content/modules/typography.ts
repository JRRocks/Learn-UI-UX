import type { ModuleContent } from '../../engine/types';

const PARA =
  'Une bonne interface se lit avant de se regarder. La typographie porte la hiérarchie, le ton et la lisibilité : quand elle est juste, personne ne la remarque ; quand elle rate, tout le reste paraît approximatif.';

const typography: ModuleContent = {
  id: 'typography',
  title: 'Typographie',
  category: 'enrichir',
  summary:
    'Choisir des rôles typographiques nets, régler la mesure, l’interlignage et l’échelle, et vérifier que le texte tient avec du vrai contenu.',
  minutes: 9,
  commands: ['typeset'],
  sources: ['imp:typeset', 'imp:craft-floor', 'imp:operate', 'imp:detector', 'butterick'],
  sections: [
    {
      id: 'roles',
      title: 'Penser en rôles, pas en tailles',
      body: `La typographie transporte trois choses : l’**information**, la **hiérarchie** et la **voix**. Avant de toucher une taille, liste les rôles dont l’interface a besoin : titre, sous-titre, corps, libellé, métadonnée, donnée chiffrée, code.

- Utilise **le moins de familles et de rôles possible** pour que la hiérarchie soit évidente.
- Combine **taille, graisse, espace et teinte**. Demander à la seule taille de tout faire produit des écarts énormes ou une hiérarchie molle.
- Nomme les rôles par leur fonction (\`title\`, \`label\`, \`meta\`), pas par leur valeur (\`text-18\`).

Sur une surface **Opérer** (application, tableau de bord), une seule famille bien réglée suffit souvent : elle porte titres, boutons, libellés et données. Sur une surface **Persuader** (page d’accueil, campagne), la typo d’affichage peut porter la voix de la marque.`,
      examples: [
        {
          title: 'Une hiérarchie qui se lit sans lire',
          bad: {
            alt: 'Carte où titre, texte et métadonnée ont presque la même taille et la même graisse.',
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><p style="font-size:15px;font-weight:600">Rapport mensuel</p><p style="font-size:14px;font-weight:500">Les ventes ont progressé de 12 % sur le mois, portées par la région Ouest.</p><p style="font-size:13px;font-weight:500">Mis à jour il y a 2 h · Équipe Ventes</p></div>`,
          },
          badNote: 'Trois rôles, trois tailles voisines : l’œil ne sait pas par où entrer.',
          good: {
            alt: 'Même carte avec un titre nettement plus grand et gras, un corps régulier et une métadonnée petite et grisée.',
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><p style="font-size:20px;font-weight:700;letter-spacing:-0.01em">Rapport mensuel</p><p style="font-size:14px;line-height:1.5">Les ventes ont progressé de 12 % sur le mois, portées par la région Ouest.</p><p class="mk-small mk-muted">Mis à jour il y a 2 h · Équipe Ventes</p></div>`,
          },
          goodNote: 'Taille, graisse et teinte travaillent ensemble : un rôle par niveau.',
        },
      ],
    },
    {
      id: 'mesure',
      title: 'Mesure et interlignage',
      body: `La **mesure** est la longueur d’une ligne. Le corps de texte se lit confortablement entre **45 et 75 caractères** par ligne (65–75ch selon le plancher de qualité d’impeccable). Au-delà de ~80 caractères, l’œil perd la ligne suivante en revenant à gauche.

- Fixe une largeur maximale en \`ch\` sur les blocs de texte : \`max-width: 68ch\`.
- **L’interlignage varie avec la mesure** : plus la ligne est longue, plus il faut d’air (1,5 à 1,7 pour un corps courant). En dessous de 1,3, le texte devient pénible.
- Texte clair sur fond sombre : compense sur trois axes — un peu plus d’interlignage, un soupçon d’approche, parfois une graisse de plus.
- Le corps de texte web ne descend pas sous **16 px** (1rem) sans raison ; iOS Safari zoome de force sur les champs en dessous de 16 px.`,
      examples: [
        {
          title: 'Mesure',
          bad: {
            alt: 'Paragraphe qui court sur toute la largeur d’un écran large, lignes très longues.',
            html: `<div class="mk-pad"><p style="font-size:14px;line-height:1.35">${PARA} ${PARA}</p></div>`,
          },
          badNote: 'Plus de 110 caractères par ligne et un interlignage serré.',
          good: {
            alt: 'Même paragraphe limité à une colonne d’environ 60 caractères avec un interlignage aéré.',
            html: `<div class="mk-pad"><p style="font-size:14px;line-height:1.6;max-width:60ch">${PARA}</p></div>`,
          },
          goodNote: 'Une colonne de ~60 caractères, interlignage 1,6.',
        },
      ],
    },
    {
      id: 'echelle',
      title: 'Une échelle, pas une collection de valeurs',
      body: `Une **échelle typographique** relie les tailles par un rapport constant. Le détecteur d’impeccable signale une hiérarchie plate quand titres et corps sont séparés par **moins de 1,25×** à chaque marche.

- **Interface produit** : rapport serré, 1,125 à 1,2 entre les marches ; échelle fixe en \`rem\`, pas de titres fluides qui rétrécissent dans une barre latérale.
- **Pages éditoriales et marketing** : rapport plus franc (1,25 à 1,5) et taille d’affichage qui peut répondre à la largeur avec \`clamp()\`, plafonnée vers **6rem**.
- **Approche (letter-spacing)** : on resserre un titre d’affichage optiquement (−0,01 à −0,03em), jamais au-delà de **−0,04em**. Sur du texte courant, au-delà de +0,05em on ralentit la lecture ; l’espacement large est réservé aux courts libellés en capitales.`,
    },
    {
      id: 'retours-ligne',
      title: 'Retours à la ligne et vrai contenu',
      body: `Une typographie se vérifie **avec le vrai texte**, à chaque point de rupture.

- \`text-wrap: balance\` sur les titres et les blocs courts centrés ; \`text-wrap: pretty\` sur le corps pour éviter le mot orphelin en dernière ligne.
- Un retour forcé dans un titre ne se place qu’entre deux groupes de sens, et se vérifie sur mobile : une coupure qui tombe au milieu d’une ligne de téléphone est pire que l’habillage par défaut.
- Teste les extrêmes : titres longs, traductions (l’allemand rallonge de ~30 %), zoom à 200 %, police de secours.
- Charge seulement les graisses utilisées et prévois une police de repli aux métriques proches pour éviter le texte invisible et les sauts de mise en page.
- Les chiffres en tableau utilisent des **chiffres tabulaires** (\`font-variant-numeric: tabular-nums\`) pour s’aligner en colonne.`,
    },
    {
      id: 'cliches',
      title: 'Les réflexes à refuser',
      body: `Impeccable relève les choix typographiques que les générateurs d’interfaces reproduisent par habitude :

- **Polices surexploitées** comme voix par défaut (Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk) : elles ne sont pas mauvaises, elles ne disent plus rien. Choisis une famille pour une raison.
- **Texte en dégradé** : l’emphase vient de la graisse ou de la taille, pas d’un dégradé.
- **Gros titre italique à empattements** comme héros de page d’accueil : devenu un uniforme de startup.
- **Monospace déguisé** pour faire « technique » : réservé au code, aux données, aux mesures.
- **Texte entièrement en capitales** sur des paragraphes : on reconnaît les mots à leur silhouette, que les capitales effacent.
- **Texte justifié** dans une colonne étroite sans césure : des rivières blanches traversent le bloc.`,
    },
  ],
  rules: [
    { id: 'measure', front: 'Quelle longueur de ligne viser pour un corps de texte ?', back: 'Entre 45 et 75 caractères (65–75ch idéalement). Fixe un `max-width` en `ch`.' },
    { id: 'leading', front: 'Quel interlignage pour un corps de texte courant ?', back: '1,5 à 1,7 — et davantage quand la ligne s’allonge. Jamais sous 1,3.' },
    { id: 'body-size', front: 'Taille plancher du corps de texte sur le web ?', back: '16 px (1rem). En dessous, iOS zoome sur les champs et la lecture souffre.' },
    { id: 'ratio', front: 'Écart minimal entre deux marches de l’échelle pour éviter une hiérarchie plate ?', back: '1,25× au moins quelque part ; en interface produit, des marches de 1,125–1,2 et une graisse qui aide.' },
    { id: 'tracking', front: 'Limite de resserrement de l’approche sur un titre ?', back: '−0,04em au maximum ; −0,02 à −0,03em se lit généralement mieux.' },
    { id: 'roles', front: 'Combien de familles pour une interface produit ?', back: 'Souvent une seule, bien réglée. Une seconde famille doit avoir un rôle qu’elle seule peut tenir.' },
    { id: 'dark', front: 'Texte clair sur fond sombre : que compenser ?', back: 'Un peu plus d’interlignage, un soupçon d’approche et parfois une graisse de plus.' },
    { id: 'numbers', front: 'Comment aligner des montants dans un tableau ?', back: 'Avec des chiffres tabulaires : `font-variant-numeric: tabular-nums`.' },
    { id: 'wrap', front: '`text-wrap: balance` ou `pretty` ?', back: '`balance` pour les titres et blocs courts, `pretty` pour le corps de texte.' },
  ],
  exercises: [
    {
      id: 'typography-measure-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel article est le plus confortable à lire ?',
      context: 'Page d’article sur un écran d’ordinateur portable.',
      options: [
        {
          id: 'wide',
          visual: {
            alt: 'Article dont les lignes courent sur toute la largeur, environ 110 caractères par ligne.',
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="mk-h2">Pourquoi nos réunions raccourcissent</p><p style="line-height:1.45">${PARA} ${PARA}</p></div>`,
          },
          why: 'Les lignes dépassent 100 caractères : l’œil peine à retrouver le début de la ligne suivante.',
        },
        {
          id: 'measured',
          visual: {
            alt: 'Article en colonne d’environ 60 caractères par ligne avec un interlignage aéré.',
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="mk-h2">Pourquoi nos réunions raccourcissent</p><p style="line-height:1.6;max-width:60ch">${PARA}</p></div>`,
          },
          why: 'Une colonne d’environ 60 caractères et un interlignage de 1,6 : la lecture suit sans effort.',
        },
      ],
      answer: 'measured',
      explanation: `La **mesure** (longueur de ligne) conditionne le confort de lecture. Entre **45 et 75 caractères**, l’œil fait des allers-retours courts et retrouve la ligne suivante sans chercher. Au-delà de ~80 caractères, chaque retour à la ligne coûte un effort et on décroche.

Dans la version recommandée, la colonne est limitée (\`max-width: 60ch\`) et l’interlignage passe à 1,6 : plus la ligne est longue, plus il faut d’air entre les lignes.`,
      takeaway: 'Limite le corps de texte à 45–75 caractères par ligne avec `max-width` en `ch`.',
      sources: ['imp:typeset', 'imp:detector'],
    },
    {
      id: 'typography-leading-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle l’interlignage de ce paragraphe pour une lecture confortable.',
      visual: {
        alt: 'Paragraphe de corps de texte dont l’interlignage varie avec le curseur.',
        html: `<div class="mk-pad"><p class="demo">${PARA}</p></div>`,
        css: `.demo { font-size: 15px; max-width: 62ch; line-height: var(--n, 1); }`,
      },
      control: 'Interlignage',
      min: 1,
      max: 2.4,
      step: 0.05,
      initial: 1.05,
      unit: '',
      target: [1.4, 1.75],
      ideal: 1.55,
      explanation: `Pour un corps de texte courant, un interlignage de **1,5 à 1,7** laisse respirer les lignes sans les détacher les unes des autres. En dessous de 1,3, les ascendantes et descendantes se frôlent ; au-delà de 1,9, le paragraphe se délite en lignes isolées.

La bonne valeur dépend aussi de la mesure : une colonne étroite tolère 1,4, une ligne longue réclame davantage.`,
      takeaway: 'Corps de texte : interlignage entre 1,5 et 1,7, à ajuster selon la longueur de ligne.',
      sources: ['imp:typeset', 'imp:detector'],
    },
    {
      id: 'typography-hierarchy-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quelle carte comprends-tu immédiatement ce qui est le plus important ?',
      options: [
        {
          id: 'flat',
          visual: {
            alt: 'Carte de commande où le titre, le statut et la date ont des tailles très proches.',
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><p style="font-size:15px;font-weight:600">Commande n° 48213</p><p style="font-size:14px;font-weight:600">Expédiée — livraison prévue jeudi</p><p style="font-size:13.5px;font-weight:500">Passée le 12 mars · 3 articles · 84,90 €</p></div>`,
          },
          why: 'Les trois lignes se ressemblent : rien ne guide l’œil vers l’information clé (le statut).',
        },
        {
          id: 'clear',
          visual: {
            alt: 'Carte de commande avec un statut en grand et en gras, la référence en petit au-dessus et les détails en gris.',
            html: `<div class="mk-pad mk-stack" style="--gap:4px"><p class="mk-small mk-muted">Commande n° 48213</p><p style="font-size:20px;font-weight:700;letter-spacing:-0.01em">Expédiée</p><p>Livraison prévue jeudi</p><p class="mk-small mk-muted" style="margin-top:6px">Passée le 12 mars · 3 articles · <span class="mk-price">84,90 €</span></p></div>`,
          },
          why: 'Le statut — ce que le client vient chercher — domine ; la référence et les détails reculent.',
        },
      ],
      answer: 'clear',
      explanation: `La hiérarchie doit refléter **la priorité de l’utilisateur**, pas l’ordre des champs en base de données. Ici, la personne veut savoir où en est sa commande : le statut mérite le rôle de titre.

La version recommandée combine plusieurs leviers à la fois — taille (20 px contre 14), graisse (700), teinte (métadonnées grisées) et espace — au lieu de demander à de petites différences de taille de tout porter.`,
      takeaway: 'La hiérarchie suit la priorité de l’utilisateur et combine taille, graisse, teinte et espace.',
      sources: ['imp:typeset', 'imp:layout'],
    },
    {
      id: 'typography-tracking-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel réglage d’approche (letter-spacing) convient à ce grand titre d’accueil ?',
      visual: {
        alt: 'Grand titre « Planifiez sans friction » en 44 pixels, graisse 800.',
        html: `<div class="mk-pad-l"><p style="font-size:44px;line-height:1.05;font-weight:800">Planifiez sans friction</p></div>`,
      },
      options: [
        { id: 'tight', label: '`letter-spacing: -0.02em`', why: 'Un resserrement optique léger : les grandes tailles paraissent trop lâches sans lui.' },
        { id: 'crushed', label: '`letter-spacing: -0.08em`', why: 'Trop serré : les lettres se touchent et perdent leur forme.' },
        { id: 'wide', label: '`letter-spacing: 0.1em`', why: 'L’espacement large convient à de courts libellés en capitales, pas à un titre en bas de casse.' },
        { id: 'none', label: 'Laisser à 0 dans tous les cas', why: 'Acceptable, mais les grands corps gagnent presque toujours à un léger resserrement.' },
      ],
      answer: 'tight',
      explanation: `En grande taille, l’espace entre les lettres paraît proportionnellement plus grand : on **resserre optiquement** les titres d’affichage, typiquement de −0,01 à −0,03em.

Impeccable fixe un plancher à **−0,04em** : au-delà, les caractères perdent leur silhouette et la lisibilité chute (règle *Crushed letter spacing* du détecteur). L’espacement positif est réservé aux libellés courts en capitales.`,
      takeaway: 'Resserre les grands titres de −0,01 à −0,03em, jamais au-delà de −0,04em.',
      sources: ['imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'typography-hotspot-card',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux problèmes typographiques de cette fiche produit.',
      visual: {
        alt: 'Fiche produit de casque audio avec un titre, un texte de description en capitales, un prix et des caractéristiques.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h2" data-hotspot="title">Casque Aria Studio</p>
  <p data-hotspot="caps" style="text-transform:uppercase;font-size:13px">Un son précis et un confort durable grâce à des coussinets à mémoire de forme, une autonomie de quarante heures et une réduction de bruit adaptative qui s’ajuste à votre environnement.</p>
  <p class="mk-price" style="font-size:20px" data-hotspot="price">249,00 €</p>
  <p data-hotspot="specs" style="font-size:9px;color:#7d8494">Bluetooth 5.3 · USB-C · 280 g · Garantie 2 ans</p>
  <span class="mk-btn" data-hotspot="cta" style="align-self:flex-start">Ajouter au panier</span>
</div>`,
      },
      hotspots: [
        { id: 'caps', label: 'Description en capitales', correct: true, why: 'Un paragraphe entier en capitales se lit mal : on reconnaît les mots à leur silhouette (ascendantes, descendantes), que les capitales effacent.' },
        { id: 'specs', label: 'Caractéristiques en 9 px gris clair', correct: true, why: 'Texte fonctionnel sous 11 px et contraste trop faible : illisible sur mobile et pour beaucoup de personnes.' },
        { id: 'title', label: 'Titre produit', correct: false, why: 'Le titre a une taille et une graisse cohérentes avec son rôle.' },
        { id: 'price', label: 'Prix', correct: false, why: 'Prix en chiffres tabulaires, bien mis en avant : rien à corriger.' },
        { id: 'cta', label: 'Bouton d’ajout au panier', correct: false, why: 'Le libellé nomme l’action et le bouton est lisible.' },
      ],
      explanation: `Deux règles du détecteur d’impeccable s’appliquent ici :

- **All-caps body text** : les capitales conviennent aux courts libellés, pas à une phrase de 80 caractères ou plus.
- **Undersized functional text** : un texte porteur d’information sous **11 px** est un échec de lisibilité, pas un choix de style — encore pire en gris clair, qui ne respecte plus le contraste minimum de 4,5:1.`,
      takeaway: 'Pas de paragraphes en capitales, et aucun texte utile sous 11 px.',
      sources: ['imp:detector', 'imp:typeset'],
    },
    {
      id: 'typography-scale-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces tailles d’une échelle typographique produit (rapport 1,2) de la plus petite à la plus grande.',
      items: [
        { id: 'meta', label: 'Métadonnée — 13 px' },
        { id: 'body', label: 'Corps — 16 px' },
        { id: 'h3', label: 'Titre de carte — 19 px' },
        { id: 'h2', label: 'Titre de section — 23 px' },
        { id: 'h1', label: 'Titre de page — 28 px' },
      ],
      explanation: `Une échelle à rapport **1,2** multiplie chaque marche par 1,2 : 16 → 19 → 23 → 28, et 16 ÷ 1,2 ≈ 13 pour la métadonnée. Ce rapport serré convient aux interfaces produit, où de nombreux rôles cohabitent : des écarts trop grands créeraient du bruit.

Pour une page éditoriale ou marketing, on choisirait un rapport plus franc (1,25 à 1,5).`,
      takeaway: 'Une échelle relie les tailles par un rapport constant : 1,125–1,2 en interface produit, plus franc en éditorial.',
      sources: ['imp:operate', 'imp:typeset'],
    },
    {
      id: 'typography-allcaps-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Mettre un paragraphe en capitales le rend plus lisible car les lettres sont plus grandes.',
      answer: false,
      explanation: `C’est l’inverse. On lit en reconnaissant la **silhouette** des mots, formée par les ascendantes (b, d, l) et les descendantes (p, q, g). Les capitales ont toutes la même hauteur : la silhouette disparaît et la lecture ralentit.

Les capitales restent utiles pour de **courts libellés** — un bouton, une étiquette — à condition de leur donner un peu d’approche.`,
      takeaway: 'Les capitales servent aux libellés courts, jamais aux paragraphes.',
      sources: ['imp:detector'],
    },
    {
      id: 'typography-families-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Tu conçois un tableau de bord de suivi logistique. Quelle stratégie typographique adopter ?',
      options: [
        { id: 'one', label: 'Une seule famille sans empattements bien réglée, avec chiffres tabulaires pour les données.', why: 'C’est la recommandation pour une surface Opérer : stabilité, lisibilité et données alignées.' },
        { id: 'display', label: 'Une police d’affichage expressive pour les libellés et les boutons, pour donner du caractère.', why: 'Les polices d’affichage dans les libellés, boutons et données sont explicitement à proscrire en interface produit.' },
        { id: 'three', label: 'Trois familles : une à empattements pour les titres, une sans pour le corps, une monospace pour les libellés.', why: 'Chaque famille ajoutée doit tenir un rôle qu’elle seule peut tenir ; le monospace en libellé est un déguisement « technique ».' },
        { id: 'fluid', label: 'Des titres fluides en `clamp()` qui s’adaptent à la largeur de chaque panneau.', why: 'Une échelle fixe en rem est préférable en interface produit : un titre qui rétrécit dans une barre latérale paraît moins bien.' },
      ],
      answer: 'one',
      explanation: `Un tableau de bord est une surface **Opérer** : la personne vient accomplir une tâche, et la typographie doit disparaître derrière l’information.

Impeccable recommande pour ces surfaces **une seule famille bien réglée**, une **échelle fixe en rem** avec un rapport serré, et les fonctionnalités OpenType utiles aux données (**chiffres tabulaires**). La marque s’exprime dans la précision des détails, pas dans des polices décoratives.`,
      takeaway: 'Interface produit : une famille, une échelle fixe, des chiffres tabulaires pour les données.',
      sources: ['imp:operate', 'imp:typeset'],
    },
    {
      id: 'typography-defaults-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquels de ces choix sont des réflexes typographiques que le plancher de qualité d’impeccable demande de refuser ?',
      options: [
        { id: 'gradient', label: 'Mettre le titre principal en texte dégradé', why: 'Ban explicite : l’emphase vient de la graisse ou de la taille.' },
        { id: 'mono', label: 'Une police monospace pour faire « technique » dans une page marketing', why: 'Le monospace est réservé au code, aux données et aux mesures.' },
        { id: 'tabular', label: 'Des chiffres tabulaires dans une colonne de montants', why: 'C’est une bonne pratique : les montants s’alignent.' },
        { id: 'balance', label: '`text-wrap: balance` sur les titres', why: 'Bonne pratique : des lignes de titre équilibrées.' },
        { id: 'system', label: 'La police système comme voix d’affichage d’une marque', why: 'Refusé : une page à l’identité propre choisit une police dont le caractère correspond à l’intention.' },
      ],
      answers: ['gradient', 'mono', 'system'],
      explanation: `Le **plancher de qualité** d’impeccable liste les réflexes que les générateurs reproduisent faute de décider : texte en dégradé, monospace en costume, police système en voix d’affichage d’une marque.

Les chiffres tabulaires et \`text-wrap: balance\` sont au contraire des finitions recommandées.`,
      takeaway: 'Refuse les réflexes : dégradé sur le texte, monospace-costume, police système comme voix de marque.',
      sources: ['imp:craft-floor'],
    },
    {
      id: 'typography-match-features',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque besoin au réglage CSS qui y répond.',
      leftTitle: 'Besoin',
      rightTitle: 'Réglage',
      pairs: [
        { id: 'measure', left: 'Limiter la longueur des lignes d’un article', right: '`max-width: 68ch`' },
        { id: 'figures', left: 'Aligner des montants en colonne', right: '`font-variant-numeric: tabular-nums`' },
        { id: 'balance', left: 'Équilibrer les lignes d’un titre sur deux lignes', right: '`text-wrap: balance`' },
        { id: 'orphan', left: 'Éviter un mot seul en dernière ligne d’un paragraphe', right: '`text-wrap: pretty`' },
        { id: 'fluid', left: 'Faire varier un titre marketing avec la largeur, entre deux bornes', right: '`font-size: clamp(2.5rem, 6vw, 5rem)`' },
      ],
      explanation: `Chaque réglage répond à un problème précis :

- \`ch\` est l’unité naturelle de la mesure (largeur du « 0 »).
- \`tabular-nums\` donne la même largeur à tous les chiffres.
- \`balance\` égalise les lignes d’un bloc court ; \`pretty\` évite l’orphelin en fin de paragraphe.
- \`clamp()\` borne une taille fluide — utile en marketing, à éviter dans une interface produit dense.`,
      takeaway: 'Mesure en `ch`, chiffres tabulaires, `balance` pour les titres, `pretty` pour le corps, `clamp()` pour l’affichage.',
      sources: ['imp:typeset', 'butterick'],
    },
    {
      id: 'typography-darkmode-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Tu passes un long article en thème sombre (texte clair sur fond sombre). Que faut-il ajuster ?',
      options: [
        { id: 'compensate', label: 'Augmenter légèrement l’interlignage et l’approche, et monter d’une graisse si la police paraît maigre.', why: 'C’est la compensation recommandée sur les trois axes perceptifs.' },
        { id: 'nothing', label: 'Rien : il suffit d’inverser les couleurs.', why: 'Le texte clair sur fond sombre « bave » et paraît plus fin ; une simple inversion fatigue la lecture.' },
        { id: 'white', label: 'Passer le texte en blanc pur sur noir pur pour maximiser le contraste.', why: 'Le contraste extrême du blanc pur sur noir pur provoque un halo à la lecture ; on teinte les deux.' },
        { id: 'smaller', label: 'Réduire la taille du texte, car il paraît plus gros en sombre.', why: 'Le texte clair paraît plutôt plus fin : réduire aggraverait la lisibilité.' },
      ],
      answer: 'compensate',
      explanation: `Le texte clair sur fond sombre est perçu plus fin et ses contours bavent légèrement (irradiation). Impeccable recommande de **compenser sur trois axes** : un peu plus d’interlignage, un soupçon d’approche, et une graisse de plus quand la police le demande.

Un thème sombre se **compose** : on ne retourne pas mécaniquement le thème clair.`,
      takeaway: 'En thème sombre, compense : interlignage, approche et graisse légèrement augmentés.',
      sources: ['imp:typeset', 'imp:colorize'],
    },
    {
      id: 'typography-mobile-size-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la taille du texte de cet article sur téléphone.',
      context: 'Lecture d’un article de blog dans le navigateur d’un téléphone, tenu à bout de bras.',
      visual: {
        alt: 'Écran de téléphone affichant un titre et deux paragraphes dont la taille varie avec le curseur.',
        frame: 'phone',
        html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h2">Le vélo-cargo, un an après</p><p class="art">Douze mois, trois mille kilomètres et deux crevaisons : voici ce que le vélo-cargo a changé dans nos trajets quotidiens, de l’école au marché.</p><p class="art">Le plus surprenant n’est pas la vitesse, mais la régularité : on arrive à l’heure, quel que soit le trafic.</p></div>`,
        css: `.art { font-size: var(--v, 12px); line-height: 1.55; }`,
      },
      control: 'Taille du corps',
      min: 10,
      max: 24,
      step: 1,
      initial: 12,
      unit: 'px',
      target: [16, 19],
      ideal: 17,
      explanation: `Sur le web, le corps de texte ne descend pas sous **16 px** (1rem) sans raison : en dessous, la lecture fatigue vite sur un petit écran, et **iOS Safari zoome de force** dès qu’on touche un champ de saisie plus petit, ce qui casse la mise en page.

Au-delà de 19–20 px sur téléphone, chaque ligne ne porte plus que quelques mots : la mesure devient trop courte et le texte se hache. 16 à 18 px, avec un interlignage autour de 1,5, est le bon compromis — et l’utilisateur doit toujours pouvoir agrandir (zoom, réglages de taille du système).`,
      takeaway: 'Corps de texte sur mobile : 16 px minimum, autour de 16–18 px, et jamais de blocage du zoom.',
      sources: ['imp:typeset', 'imp:harden'],
    },
    {
      id: 'typography-justify-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Dans cette colonne étroite, quel paragraphe se lit le mieux ?',
      context: 'Encadré latéral d’environ 30 caractères de large dans une application de documentation.',
      options: [
        {
          id: 'justified',
          visual: {
            alt: 'Paragraphe justifié dans une colonne étroite, avec de grands blancs irréguliers entre les mots.',
            html: `<div class="mk-pad"><p class="col">Les sauvegardes automatiques interviennent toutes les quinze minutes, conformément à la configuration administrateur sélectionnée.</p></div>`,
            css: `.col { width: 30ch; text-align: justify; hyphens: manual; line-height: 1.5; }`,
          },
          why: 'Sans césure, la justification étire les espaces jusqu’à créer des « rivières » blanches qui coupent la lecture.',
        },
        {
          id: 'ragged',
          visual: {
            alt: 'Même paragraphe aligné à gauche, espaces réguliers et fin de ligne irrégulière.',
            html: `<div class="mk-pad"><p class="col" lang="fr">Les sauvegardes automatiques interviennent toutes les quinze minutes, conformément à la configuration administrateur sélectionnée.</p></div>`,
            css: `.col { width: 30ch; text-align: start; line-height: 1.5; }`,
          },
          why: 'Aligné à gauche, chaque espace garde sa largeur : l’œil enchaîne les mots sans trous.',
        },
      ],
      answer: 'ragged',
      explanation: `La justification répartit l’espace restant de chaque ligne **entre les mots**. Dans une colonne étroite, il y a peu de mots par ligne : les espaces gonflent de façon irrégulière et forment des **rivières** blanches verticales. Le détecteur d’impeccable le signale (*justified text*).

Aligne à gauche (\`text-align: start\`, qui suit aussi le sens d’écriture), élargis la mesure, ou, si la justification est indispensable, active la césure avec \`hyphens: auto\` et un attribut \`lang\` correct. Les écritures qui justifient autrement (chinois, japonais, thaï, arabe) ne sont pas concernées.`,
      takeaway: 'Colonne étroite : aligne à gauche, ou justifie seulement avec `hyphens: auto` et la bonne langue.',
      sources: ['imp:detector', 'butterick'],
    },
    {
      id: 'typography-italic-serif-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Un grand titre en italique à empattements est toujours un cliché à éviter.',
      answer: false,
      explanation: `Pas toujours. Le détecteur d’impeccable signale le titre d’accueil en italique à empattements (type Fraunces, Playfair, Recoleta) parce qu’il est devenu **l’uniforme des pages d’accueil de startups générées par IA** : choisi par réflexe, il ne dit plus rien du produit.

Mais impeccable précise aussi : **« jugez selon le contexte »**. Un magazine, une maison d’édition ou une marque au registre éditorial peuvent légitimement le vouloir — à condition que ce soit une décision qui découle du monde visuel choisi, pas un réflexe. Et une règle d’impeccable passe avant tout : **le brief gagne**.`,
      takeaway: 'Ce qui est à refuser, c’est le réflexe : un titre italique à empattements doit découler d’un choix éditorial assumé.',
      sources: ['imp:detector', 'imp:skill'],
    },
    {
      id: 'typography-real-content-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Avant de valider la typographie d’un écran, quels tests font partie de la vérification recommandée ?',
      options: [
        { id: 'long', label: 'Un titre très long et un nom de 60 caractères', why: 'Les textes extrêmes révèlent débordements et coupures.' },
        { id: 'translation', label: 'La version allemande (environ 30 % plus longue)', why: 'L’expansion des traductions casse les largeurs fixes.' },
        { id: 'zoom', label: 'Le zoom du navigateur à 200 %', why: 'Le texte doit rester lisible et la mise en page tenir.' },
        { id: 'fallback', label: 'La police de secours, si la police web ne charge pas', why: 'Un repli aux métriques proches évite les sauts de mise en page.' },
        { id: 'lorem', label: 'Un lorem ipsum de longueur moyenne, pour juger l’équilibre', why: 'Le faux texte cache justement les cas qui posent problème : on teste avec le vrai contenu.' },
        { id: 'one-size', label: 'Une seule largeur d’écran, celle de la maquette', why: 'Les retours à la ligne changent à chaque largeur : on vérifie à chaque point de rupture.' },
      ],
      answers: ['long', 'translation', 'zoom', 'fallback'],
      explanation: `Impeccable demande de **vérifier la typographie avec le vrai texte, à chaque point de rupture** : titres longs, traductions plus longues, zoom, réglages de taille du système, absence d’une graisse, police de repli.

Le faux texte et une seule largeur d’écran sont précisément ce qui fait passer les défauts inaperçus jusqu’à la mise en ligne.`,
      takeaway: 'Teste la typo avec le vrai contenu, ses extrêmes, ses traductions, le zoom et la police de repli, à chaque largeur.',
      sources: ['imp:typeset', 'imp:harden'],
    },
  ],
};

export default typography;
