import type { ModuleContent, SourceRef, Visual } from '../../engine/types';

/** Paragraphe d’article du curseur d’interlignage. */
const LEAD_PARA =
  'Le soir, la médiathèque du quartier reste ouverte jusqu’à vingt-deux heures. Les étudiants y révisent, des parents y attendent la fin de l’entraînement de foot, et certains viennent simplement lire le journal au calme. Personne n’avait prévu ces usages ; ils sont devenus la raison d’être du lieu.';

/**
 * Miniature d’une page d’article de 896 px de large, réduite à la largeur de la maquette.
 * Tout est en em et 1em (16 px à taille réelle) suit la largeur du conteneur : le nombre
 * de caractères par ligne reste le même sur ordinateur, sur mobile et dans la leçon.
 */
const PAGE_CSS = `.pg { container-type: inline-size; }
.pg-in { font-size: calc(100cqw / 56); padding: 0 2.5em 2.5em; color: #1d2230; }
.pg-bar { display: flex; align-items: baseline; gap: 1.5em; padding: 1em 0; margin-bottom: 2em; border-bottom: 1px solid #e3e6ec; font-size: .875em; color: #5a6172; }
.pg-bar b { margin-inline-end: auto; font-size: 1.15em; color: #1d2230; }
.pg-h { font-size: 2em; line-height: 1.15; font-weight: 700; letter-spacing: -.01em; text-wrap: balance; }
.pg-meta { margin-top: .5em; font-size: .875em; color: #5a6172; }
.pg-p { margin-top: 1em; line-height: 1.5; }
.pg-meta + .pg-p { margin-top: 1.5em; }`;
/** Version mesurée : même page, colonne de lecture limitée (environ 65 caractères par ligne). */
const PAGE_COLUMN = `${PAGE_CSS}
.pg-art { max-width: 50ch; margin-inline: auto; }`;

const page = (site: string, nav: string[], title: string, meta: string, paras: string[]) =>
  `<div class="pg"><div class="pg-in"><div class="pg-bar"><b>${site}</b>${nav.map((n) => `<span>${n}</span>`).join('')}</div><div class="pg-art"><p class="pg-h">${title}</p><p class="pg-meta">${meta}</p>${paras.map((p) => `<p class="pg-p">${p}</p>`).join('')}</div></div></div>`;

const MEETINGS_PAGE = page('Opale', ['Produit', 'Tarifs', 'Blog'], 'Pourquoi nos réunions raccourcissent', 'Camille Roux · 12 mars · 4 min de lecture', [
  'Depuis janvier, aucune réunion de l’équipe produit ne dépasse vingt-cinq minutes. La règle tient en trois points : un ordre du jour envoyé la veille, une personne qui surveille l’heure, et des décisions notées en direct dans le document partagé.',
  'Les sujets qui demandent plus de temps passent par écrit : chacun répond quand il le peut, et la réunion suivante ne sert qu’à trancher. Trois mois plus tard, le temps passé en réunion a baissé d’un tiers, et personne ne réclame le retour du point hebdomadaire d’une heure.',
]);

const BREAD_PAGE = page('Fournil maison', ['Recettes', 'Techniques', 'Matériel'], 'Le pain au levain, pas à pas', 'Recette · 25 min de travail · 18 h au total', [
  'La veille, rafraîchis ton levain avec autant de farine que d’eau, puis laisse-le à température ambiante. Il est prêt quand il a doublé de volume et que sa surface se couvre de petites bulles.',
  'Le lendemain matin, mélange la farine et l’eau, laisse reposer une heure, puis ajoute le levain et le sel. Pendant les trois heures qui suivent, rabats la pâte sur elle-même toutes les demi-heures, sans la pétrir.',
]);

/** Le même grand titre avec une approche donnée ; la taille suit la largeur sur les petits écrans. */
const tracking = (spacing: string, alt: string): Visual => ({
  alt,
  html: `<div class="tk-w"><p class="tk">Planifiez<br>sans friction</p></div>`,
  css: `.tk-w { container-type: inline-size; padding: 28px 20px; }
.tk { font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: min(44px, 14cqw); line-height: 1.05; font-weight: 700; letter-spacing: ${spacing}; color: #1d2230; text-wrap: balance; }`,
});

const LARSON: SourceRef = {
  label: 'Kevin Larson — The Science of Word Recognition (Microsoft Typography)',
  url: 'https://learn.microsoft.com/en-us/typography/develop/word-recognition',
};

const IRRADIATION: SourceRef = {
  label: 'Adam Argyle — Using CSS to fix the irradiation illusion',
  url: 'https://nerdy.dev/adjust-perceived-typepace-weight-for-dark-mode-without-layout-shift',
};

const typography: ModuleContent = {
  id: 'typography',
  title: 'Typographie',
  category: 'enrichir',
  summary:
    'Choisir des rôles typographiques nets, régler la mesure, l’interlignage et l’échelle, et vérifier que le texte tient avec du vrai contenu.',
  minutes: 10,
  commands: ['typeset'],
  sources: ['imp:typeset', 'imp:craft-floor', 'imp:operate', 'imp:detector', 'butterick', LARSON, IRRADIATION],
  sections: [
    {
      id: 'roles',
      title: 'Penser en rôles, pas en tailles',
      body: `La typographie transporte trois choses : l’**information**, la **hiérarchie** et la **voix**. Avant de toucher une taille, liste les rôles dont l’interface a besoin : titre, sous-titre, corps, libellé, métadonnée, donnée chiffrée, code.

- Utilise **le moins de familles et de rôles possible** pour que la hiérarchie soit évidente.
- Combine **taille, graisse, espace et teinte**. Demander à la seule taille de tout faire produit des écarts énormes ou une hiérarchie molle.
- Nomme les rôles par leur fonction (\`title\`, \`label\`, \`meta\`), pas par leur valeur (\`text-18\`).
- Un même rôle garde le même réglage sur tous les écrans et dans tous les états.

Sur une surface **Opérer** (application, tableau de bord), une seule famille bien réglée suffit souvent : elle porte titres, boutons, libellés et données. Sur une surface **Persuader** (page d’accueil, campagne), la typo d’affichage peut porter la voix de la marque.

Pour reprendre la typographie d’un écran existant, impeccable suit cet ordre :

1. **Évaluer à l’œil** : rôles, hiérarchie, mesure, cas extrêmes.
2. **Lancer le scan du détecteur**, ensuite seulement, pour que ses constats n’orientent pas ton jugement.
3. **Énoncer le système** : rôles, contrastes entre eux, mesure, polices de référence.
4. **Appliquer** les réglages.
5. **Vérifier sur le rendu**, puis relancer le scan. Un scan propre est un plancher, pas une preuve.`,
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
      body: `La **mesure** est la longueur d’une ligne. Le corps de texte se lit confortablement entre **45 et 75 caractères** par ligne, espaces comprises. Au-delà de ~80 caractères, l’œil peine à retrouver le début de la ligne suivante.

- Fixe une largeur maximale en \`ch\` sur les blocs de texte. \`1ch\` est la largeur du chiffre « 0 », plus large qu’un caractère moyen : une colonne de \`60ch\` contient environ 75 caractères. 45 à 75 caractères correspondent donc à **35 à 60ch environ** selon la police. Pars de \`max-width: 50ch\` (environ 65 caractères), puis compte les caractères rendus.
- Le plancher de qualité d’impeccable annonce « 65–75ch » : lis-le en caractères. Pris en unités \`ch\`, cette fourchette donne 80 à 100 caractères par ligne, au-delà des ~80 que son propre détecteur juge trop longs.
- **L’interlignage varie avec la mesure** : plus la ligne est longue, plus il faut d’air. Pars de 1,5 à 1,7 pour un corps courant, puis règle-le selon la police, la langue et le contraste : ce n’est pas un ratio universel. En dessous de 1,3, le texte devient pénible.
- Sépare les paragraphes par un espace **ou** par un alinéa, pas les deux : combinés, ils marquent deux fois la même frontière.
- Texte clair sur fond sombre : il paraît plus gras qu’il ne l’est (irradiation). Compense sur trois axes : un peu plus d’interlignage, un soupçon d’approche, et une graisse réglée à l’œil, plus forte seulement si une police fine se délite.
- Le corps de texte web ne descend pas sous **16 px** (1rem) sans raison. Les champs de saisie non plus : en dessous de 16 px, iOS Safari zoome quand on les touche.`,
      examples: [
        {
          title: 'Mesure',
          bad: {
            alt: 'Miniature d’une page de recette : sous le titre, le texte court sur toute la largeur de la page.',
            frame: 'browser',
            html: BREAD_PAGE,
            css: PAGE_CSS,
          },
          badNote: 'Plus de 100 caractères par ligne : au bout de chaque ligne, l’œil peine à retrouver la suivante.',
          good: {
            alt: 'Miniature de la même page : le texte tient dans une colonne centrée, avec de larges marges.',
            frame: 'browser',
            html: BREAD_PAGE,
            css: PAGE_COLUMN,
          },
          goodNote: 'Même corps (16 px), même interlignage (1,5), colonne de 50ch : environ 65 caractères par ligne.',
        },
      ],
    },
    {
      id: 'echelle',
      title: 'Une échelle, pas une collection de valeurs',
      body: `Une **échelle typographique** relie les tailles par un rapport constant : avec un rapport de 1,2 et un corps de 16 px, les marches suivantes valent 19, 23 puis 28 px.

- **Interface produit** : rapport serré, 1,125 à 1,2 entre les marches ; échelle fixe en \`rem\`, pas de titres fluides qui rétrécissent dans une barre latérale.
- **Pages éditoriales et marketing** : un contraste plus franc entre les tailles, et une taille d’affichage qui peut répondre à la largeur avec \`clamp()\`, plafonnée à **6rem**.
- Le détecteur d’impeccable juge une hiérarchie **plate** quand aucune marche entre deux rôles voisins n’atteint **1,25×**. Avec des marches de 1,125 à 1,2, la hiérarchie passe donc aussi par la graisse (titres à 600 ou plus pour un corps à 400 : le détecteur n’en fait alors qu’un conseil), ou l’échelle contient au moins un saut de 1,25×, souvent le titre de page.
- **Approche (letter-spacing)** : on resserre un titre d’affichage optiquement (−0,01 à −0,03em), jamais au-delà de **−0,04em**. Sur du texte courant, au-delà de +0,05em on ralentit la lecture ; l’espacement large est réservé aux courts libellés en capitales.`,
    },
    {
      id: 'retours-ligne',
      title: 'Retours à la ligne et vrai contenu',
      body: `Une typographie se vérifie **avec le vrai texte**, à chaque point de rupture.

- \`text-wrap: balance\` sur les titres et les blocs courts centrés ; \`text-wrap: pretty\` sur le corps pour éviter le mot orphelin en dernière ligne.
- Un retour forcé dans un titre ne se place qu’entre deux groupes de sens, et se vérifie sur mobile : une coupure qui tombe au milieu d’une ligne de téléphone est pire que le retour à la ligne automatique.
- Une coupure inégale peut porter du sens : un mot seul pour peser, un vers, une citation. Rends-la volontaire et garde-la rare. C’est pourquoi le détecteur classe le mot seul en fin de paragraphe et le titre déséquilibré en simples conseils : signale les coupures voulues.
- Teste les extrêmes : titres longs, traductions (l’allemand est souvent 30 % plus long que l’anglais), zoom à 200 %, police de secours.
- Charge seulement les graisses utilisées. Prévois une police de repli aux métriques ajustées (\`size-adjust\`) contre les sauts de mise en page, et une stratégie de chargement qui ne masque jamais le texte (\`font-display: swap\` ou \`optional\`).
- Les chiffres en tableau utilisent des **chiffres tabulaires** (\`font-variant-numeric: tabular-nums\`) pour s’aligner en colonne.`,
    },
    {
      id: 'cliches',
      title: 'Les réflexes à refuser',
      body: `Impeccable relève deux familles de défauts. D’abord, les **réflexes de générateur**, que les générateurs d’interfaces reproduisent par habitude :

- **Polices surexploitées** comme voix par défaut (Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk) : elles ne sont pas mauvaises, elles ne disent plus rien. Choisis une famille pour une raison.
- **Texte en dégradé** : l’emphase vient de la graisse ou de la taille, pas d’un dégradé.
- **Gros titre italique à empattements** comme héros de page d’accueil : devenu un uniforme de startup. Un registre éditorial assumé peut le vouloir : impeccable demande de juger selon le contexte.
- **Titre-phrase géant** : une phrase complète en taille d’affichage occupe tout le premier écran. Un titre d’un ou deux mots peut être énorme ; une phrase longue se compose plus petit.
- **Police système comme voix d’affichage** d’une page à l’identité propre : la police installée la plus proche est un échec, pas un repli.
- **Monospace déguisé** pour faire « technique » : réservé au code, aux données, aux mesures.

Ensuite, les **défauts de lisibilité**, quel que soit l’auteur :

- **Texte entièrement en capitales** sur des paragraphes : il se lit 5 à 10 % plus lentement, car on est bien plus entraîné au bas de casse.
- **Texte justifié** dans une colonne étroite sans césure : les espaces s’étirent et des trous irréguliers s’ouvrent entre les mots.`,
    },
  ],
  rules: [
    { id: 'measure', front: 'Quelle longueur de ligne viser pour un corps de texte ?', back: 'Entre 45 et 75 caractères, espaces comprises : environ 35 à 60ch selon la police. Fixe un `max-width` en `ch`, puis compte les caractères rendus.' },
    { id: 'ch', front: 'Combien de caractères tient une colonne de `60ch` ?', back: 'Environ 75 : `1ch` est la largeur du chiffre « 0 », plus large qu’un caractère moyen.' },
    { id: 'leading', front: 'Quel interlignage pour un corps de texte courant ?', back: '1,5 à 1,7 pour commencer, davantage quand la ligne s’allonge, puis à régler selon la police et la langue. Jamais sous 1,3.' },
    { id: 'body-size', front: 'Taille plancher du corps de texte sur le web ?', back: '16 px (1rem) pour le corps. Et des champs de saisie à 16 px au moins, sinon iOS Safari zoome quand on les touche.' },
    { id: 'ratio', front: 'Quel saut de taille l’échelle doit-elle contenir au moins une fois ?', back: '1,25×, sinon le détecteur juge la hiérarchie plate. Avec des marches de 1,125 à 1,2 en interface produit, des titres nettement plus gras que le corps (600 contre 400) portent la hiérarchie.' },
    { id: 'tracking', front: 'Limite de resserrement de l’approche sur un titre ?', back: '−0,04em au maximum ; −0,02 à −0,03em se lit généralement mieux.' },
    { id: 'roles', front: 'Combien de familles pour une interface produit ?', back: 'Souvent une seule, bien réglée. Une seconde famille doit avoir un rôle qu’elle seule peut tenir.' },
    { id: 'dark', front: 'Texte clair sur fond sombre : que compenser ?', back: 'Il paraît plus gras (irradiation) : un peu plus d’interlignage, un soupçon d’approche, et une graisse de plus seulement si une police fine se délite.' },
    { id: 'method', front: 'Pourquoi évaluer la typo à l’œil avant de lancer le détecteur ?', back: 'Pour que ses constats n’orientent pas ton jugement. Un scan propre est un plancher, pas une preuve.' },
    { id: 'numbers', front: 'Comment aligner des montants dans un tableau ?', back: 'Avec des chiffres tabulaires : `font-variant-numeric: tabular-nums`.' },
    { id: 'wrap', front: '`text-wrap: balance` ou `pretty` ?', back: '`balance` pour les titres et blocs courts, `pretty` pour le corps de texte.' },
  ],
  exercises: [
    {
      id: 'typography-measure-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle page d’article sera la plus confortable à lire ?',
      context: 'Deux miniatures de la même page, à la même échelle, telle qu’elle s’affiche sur un écran d’ordinateur portable.',
      options: [
        {
          id: 'wide',
          visual: {
            alt: 'Miniature d’une page d’article : sous le titre, les deux paragraphes courent sur toute la largeur de la page.',
            frame: 'browser',
            html: MEETINGS_PAGE,
            css: PAGE_CSS,
          },
          why: 'Plus de 100 caractères par ligne : au bout de chaque ligne, l’œil doit traverser toute la page pour retrouver le début de la suivante, et il lui arrive de se tromper de ligne.',
        },
        {
          id: 'measured',
          visual: {
            alt: 'Miniature de la même page : le titre et les deux paragraphes tiennent dans une colonne centrée, avec de larges marges.',
            frame: 'browser',
            html: MEETINGS_PAGE,
            css: PAGE_COLUMN,
          },
          why: 'Environ 65 caractères par ligne, avec le même corps et le même interlignage : la lecture suit sans effort.',
        },
      ],
      answer: 'measured',
      explanation: `La **mesure** (longueur de ligne) conditionne le confort de lecture. Entre **45 et 75 caractères**, l’œil fait des allers-retours courts et retrouve la ligne suivante sans chercher. Au-delà de ~80 caractères, chaque retour à la ligne coûte un effort et on décroche.

Les deux pages ont le même texte, le même corps (16 px) et le même interlignage (1,5) : seule la mesure change. La version recommandée limite la colonne à \`max-width: 50ch\`, soit environ 65 caractères, car \`1ch\` (la largeur du « 0 ») est plus large qu’un caractère moyen.`,
      takeaway: 'Limite le corps de texte à 45–75 caractères par ligne : environ 35 à 60ch selon la police, à vérifier sur le rendu.',
      sources: ['imp:typeset', 'imp:detector'],
    },
    {
      id: 'typography-leading-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle l’interlignage de ce paragraphe pour une lecture confortable.',
      visual: {
        alt: 'Paragraphe de corps de texte en 16 px dont l’interlignage varie avec le curseur.',
        html: `<div class="mk-pad"><p class="demo">${LEAD_PARA}</p></div>`,
        css: `.demo { font-size: 16px; max-width: 45ch; line-height: var(--n, 1); }`,
      },
      control: 'Interlignage',
      min: 1,
      max: 2.4,
      step: 0.05,
      initial: 1.05,
      unit: '',
      target: [1.5, 1.75],
      ideal: 1.55,
      explanation: `Pour un corps de texte courant, un interlignage de **1,5 à 1,7** laisse respirer les lignes sans les détacher les unes des autres. En dessous de 1,3, les ascendantes et descendantes se frôlent ; au-delà de 1,9, le paragraphe se délite en lignes isolées.

Ce n’est pas un ratio universel : la bonne valeur dépend de la police, de la langue et de la mesure. Plus la ligne est longue, plus il faut d’air.`,
      takeaway: 'Corps de texte : interlignage entre 1,5 et 1,7, à ajuster selon la police et la longueur de ligne.',
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
            alt: 'Carte de commande avec un statut en grand et en gras, la date de livraison dessous, puis la référence et les détails en petit et en gris.',
            html: `<div class="mk-pad mk-stack" style="--gap:4px"><p style="font-size:20px;font-weight:700;letter-spacing:-0.01em">Expédiée</p><p>Livraison prévue jeudi</p><p class="mk-small mk-muted" style="margin-top:6px">Commande n° 48213 · Passée le 12 mars · 3 articles · <span class="mk-price">84,90 €</span></p></div>`,
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
      context: 'Le même titre en graisse 700, composé dans une police de texte sans empattements, avec quatre approches différentes.',
      options: [
        {
          id: 'tight',
          label: '`letter-spacing: -0.02em`',
          visual: tracking('-0.02em', 'Titre « Planifiez sans friction » en grand et en gras, lettres légèrement resserrées.'),
          why: 'Un resserrement optique léger : en grande taille, l’approche par défaut paraît lâche, et ce réglage la corrige sans que les lettres se touchent.',
        },
        {
          id: 'crushed',
          label: '`letter-spacing: -0.08em`',
          visual: tracking('-0.08em', 'Titre « Planifiez sans friction » en grand et en gras, lettres très resserrées.'),
          why: 'Trop serré : les lettres se touchent (« fi », « ct ») et perdent leur forme.',
        },
        {
          id: 'wide',
          label: '`letter-spacing: 0.1em`',
          visual: tracking('0.1em', 'Titre « Planifiez sans friction » en grand et en gras, lettres très espacées.'),
          why: 'L’espacement large convient à de courts libellés en capitales, pas à un titre en bas de casse : les mots se défont.',
        },
        {
          id: 'none',
          label: '`letter-spacing: 0`',
          visual: tracking('0', 'Titre « Planifiez sans friction » en grand et en gras, approche par défaut de la police.'),
          why: 'L’approche par défaut d’une police de texte est réglée pour les petites tailles : sur un grand titre, elle paraît lâche. Impeccable demande d’ajuster l’approche à la police et à la taille.',
        },
      ],
      answer: 'tight',
      explanation: `En grande taille, l’espace entre les lettres paraît proportionnellement plus grand : on **resserre optiquement** les titres d’affichage, typiquement de −0,01 à −0,03em.

Le plancher de qualité d’impeccable s’arrête à **−0,04em**, et −0,02 à −0,03em se lit généralement mieux. Le détecteur, lui, ne signale l’approche écrasée (*Crushed letter spacing*) qu’au-delà de −0,07em, ou −0,09em à partir de 40 px : un réglage peut donc passer le scan et rester trop serré. L’espacement positif est réservé aux libellés courts en capitales.`,
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
        { id: 'caps', label: 'Description en capitales', correct: true, why: 'Un paragraphe entier en capitales se lit 5 à 10 % plus lentement : on est bien plus entraîné à lire du bas de casse.' },
        { id: 'specs', label: 'Caractéristiques en 9 px gris clair', correct: true, why: 'Texte fonctionnel sous 11 px et contraste trop faible : illisible sur mobile et pour beaucoup de personnes.' },
        { id: 'title', label: 'Titre produit', correct: false, why: 'Le titre a une taille et une graisse cohérentes avec son rôle.' },
        { id: 'price', label: 'Prix', correct: false, why: 'Prix en chiffres tabulaires, bien mis en avant : rien à corriger.' },
        { id: 'cta', label: 'Bouton d’ajout au panier', correct: false, why: 'Le libellé nomme l’action et le bouton est lisible.' },
      ],
      explanation: `Deux règles du détecteur d’impeccable s’appliquent ici :

- **All-caps body text** : les capitales conviennent aux courts libellés, pas à une phrase de 80 caractères ou plus.
- **Undersized functional text** : un texte porteur d’information sous **11 px** est un échec de lisibilité, pas un choix de style — encore pire en gris clair, qui ne respecte plus le contraste minimum de 4,5:1.`,
      takeaway: 'Pas de paragraphes en capitales, et aucun texte utile sous 11 px.',
      sources: ['imp:detector', 'imp:typeset', LARSON],
    },
    {
      id: 'typography-scale-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Le détecteur d’impeccable juge plate la hiérarchie de ton application de gestion. Que fais-tu ?',
      context: 'Échelle de rapport 1,2 : corps à 16 px, titres à 19, 23 et 28 px, tous en graisse 400 comme le corps.',
      options: [
        { id: 'weight', label: 'Garder ces tailles et passer les titres en graisse 600 ou plus.', why: 'Le rapport 1,2 convient à une interface dense ; la graisse sépare désormais les titres du corps, et le détecteur n’en fait plus qu’un conseil.' },
        { id: 'ratio', label: 'Passer toute l’échelle à un rapport de 1,5.', why: 'En interface produit, de nombreux rôles cohabitent : des écarts exagérés créent du bruit.' },
        { id: 'body', label: 'Réduire le corps à 14 px pour creuser l’écart avec les titres.', why: 'Le corps passe sous le plancher de 16 px : on gagne un rapport et on perd la lecture.' },
        { id: 'ignore', label: 'Ignorer le signalement : 1,2 est le rapport conseillé en interface produit.', why: 'Le rapport est juste, mais le constat aussi : à graisse égale, des marches de 1,2 distinguent mal les rôles. Un constat du scan se corrige ou s’explique, il ne s’ignore pas.' },
      ],
      answer: 'weight',
      explanation: `Une échelle relie les tailles par un rapport constant : ici 16 × 1,2 ≈ 19, puis 23, puis 28. En interface produit, impeccable conseille ce rapport serré (**1,125 à 1,2**) : de nombreux rôles cohabitent, et des écarts exagérés créent du bruit.

Son détecteur, lui, juge une hiérarchie **plate** quand aucune marche entre deux rôles voisins n’atteint **1,25×** : 19 ÷ 16, 23 ÷ 19 et 28 ÷ 23 restent tous sous ce seuil. Les deux se réconcilient par la **graisse** : avec des titres à 600 ou plus pour un corps à 400, la taille ne porte plus seule la hiérarchie, et le détecteur rétrograde le constat en simple conseil. Autre issue : donner au titre de page un vrai saut, d’au moins 1,25×.`,
      takeaway: 'Échelle serrée en interface produit, mais pas à graisse égale : la graisse, ou un saut d’au moins 1,25×, porte la hiérarchie.',
      sources: ['imp:operate', 'imp:typeset', 'imp:detector'],
    },
    {
      id: 'typography-allcaps-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Mettre un paragraphe en capitales le rend plus lisible car les lettres sont plus grandes.',
      answer: false,
      explanation: `C’est l’inverse : un paragraphe en capitales se lit **5 à 10 % plus lentement** que le même texte en bas de casse. La raison est l’entraînement : on lit surtout du bas de casse, on y est donc bien plus rapide.

L’explication par la « silhouette » des mots (les ascendantes et descendantes que les capitales effacent), que reprend impeccable, est populaire, mais la recherche sur la lecture l’a abandonnée : on reconnaît un mot à ses lettres.

Les capitales restent utiles pour de **courts libellés** (un bouton, une étiquette), à condition de leur donner un peu d’approche.`,
      takeaway: 'Les capitales servent aux libellés courts, jamais aux paragraphes.',
      sources: ['imp:detector', LARSON],
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
      prompt: 'Lesquels de ces choix typographiques respectent le plancher de qualité d’impeccable ?',
      options: [
        { id: 'gradient', label: 'Mettre le titre principal en texte dégradé', why: 'Réflexe à refuser : l’emphase vient de la graisse ou de la taille, pas d’un dégradé.' },
        { id: 'mono', label: 'Une police monospace pour faire « technique » dans une page marketing', why: 'Réflexe à refuser : le monospace est réservé au code, aux données et aux mesures.' },
        { id: 'tabular', label: 'Des chiffres tabulaires dans une colonne de montants', why: 'Bonne pratique : les montants s’alignent en colonne.' },
        { id: 'balance', label: '`text-wrap: balance` sur les titres', why: 'Bonne pratique : des lignes de titre équilibrées.' },
        { id: 'system', label: 'La police système comme voix d’affichage d’une marque', why: 'Réflexe à refuser : une page à l’identité propre choisit une police dont le caractère correspond à l’intention ; la police installée la plus proche est un échec, pas un repli.' },
      ],
      answers: ['tabular', 'balance'],
      explanation: `Le **plancher de qualité** d’impeccable demande des titres équilibrés et des chiffres réglés pour les données : \`text-wrap: balance\` et les chiffres tabulaires en font partie.

Il liste aussi des réflexes que les générateurs reproduisent faute de décider : texte en dégradé, monospace déguisé, police système en voix d’affichage d’une marque. Ce sont des réglages par défaut de la catégorie, pas des interdits : seul le brief peut en justifier un, jamais l’habitude.`,
      takeaway: 'Équilibre les titres et aligne les chiffres ; refuse les réflexes : dégradé sur le texte, monospace déguisé, police système comme voix de marque.',
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
        { id: 'measure', left: 'Limiter la longueur des lignes d’un article', right: '`max-width: 50ch`' },
        { id: 'figures', left: 'Aligner des montants en colonne', right: '`font-variant-numeric: tabular-nums`' },
        { id: 'balance', left: 'Équilibrer les lignes d’un titre sur deux lignes', right: '`text-wrap: balance`' },
        { id: 'orphan', left: 'Éviter un mot seul en dernière ligne d’un paragraphe', right: '`text-wrap: pretty`' },
        { id: 'fluid', left: 'Faire varier un titre marketing avec la largeur, entre deux bornes', right: '`font-size: clamp(2.5rem, 6vw, 5rem)`' },
      ],
      explanation: `Chaque réglage répond à un problème précis :

- \`ch\` (la largeur du « 0 ») suit la police et sa taille : \`50ch\` donnent environ 65 caractères, car un caractère moyen est plus étroit que le « 0 ».
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
        { id: 'nothing', label: 'Rien : il suffit d’inverser les couleurs.', why: 'Le texte clair déborde optiquement sur le fond sombre (irradiation) : il paraît plus gras et un peu flou. Une simple inversion, sans compensation, fatigue la lecture.' },
        { id: 'white', label: 'Passer le texte en blanc pur sur noir pur pour maximiser le contraste.', why: 'Le contraste extrême du blanc pur sur noir pur provoque un halo à la lecture ; on teinte les deux.' },
        { id: 'smaller', label: 'Réduire la taille du texte, car il paraît plus gros en sombre.', why: 'Réduire la taille nuit à la lecture : l’effet se corrige par l’interlignage, l’approche et la graisse, pas par la taille.' },
      ],
      answer: 'compensate',
      explanation: `Le texte clair **déborde optiquement** sur le fond sombre : c’est l’irradiation, qui fait paraître une zone claire plus grande qu’une zone sombre identique. Les lettres semblent plus grasses et un peu floues.

Impeccable recommande de **compenser sur trois axes** : un peu plus d’interlignage, un soupçon d’approche, et une graisse de plus quand la police le demande, par exemple une police fine qui se délite. Sinon, garde la même graisse : le texte paraît déjà plus gras, et l’on peut même baisser d’un cran, ou réduire le *grade* des polices variables qui ont cet axe (il affine le trait sans changer la largeur des lettres).

Un thème sombre se **compose** : on ne retourne pas mécaniquement le thème clair.`,
      takeaway: 'En thème sombre, compense : un peu plus d’interlignage et d’approche, et une graisse réglée à l’œil selon la police.',
      sources: ['imp:typeset', 'imp:colorize', IRRADIATION],
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
        html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="ttl">Le vélo-cargo, un an après</p><p class="art">Douze mois, trois mille kilomètres et deux crevaisons : voici ce que le vélo-cargo a changé dans nos trajets quotidiens, de l’école au marché.</p><p class="art">Le plus surprenant n’est pas la vitesse, mais la régularité : on arrive à l’heure, quel que soit le trafic.</p></div>`,
        css: `.ttl { font-size: calc(var(--n, 12) * 1.4px); line-height: 1.2; font-weight: 700; }
.art { font-size: var(--v, 12px); line-height: 1.55; }`,
      },
      control: 'Taille du corps',
      min: 10,
      max: 24,
      step: 1,
      initial: 12,
      unit: 'px',
      target: [16, 19],
      ideal: 17,
      explanation: `Sur le web, le corps de texte ne descend pas sous **16 px** (1rem) sans raison : en dessous, la lecture fatigue vite sur un petit écran tenu à bout de bras.

Au-delà de 19–20 px sur téléphone, chaque ligne ne porte plus que quelques mots : la mesure devient trop courte et le texte se hache. 16 à 18 px, avec un interlignage autour de 1,5, est le bon compromis, et l’utilisateur doit toujours pouvoir agrandir (zoom, réglages de taille du système).`,
      takeaway: 'Corps de texte sur mobile : 16 px minimum, autour de 16–18 px, et jamais de blocage du zoom.',
      sources: ['imp:typeset', 'imp:harden'],
    },
    {
      id: 'typography-justify-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Dans cette colonne étroite, quel paragraphe se lit le mieux ?',
      context: 'Encadré latéral étroit, d’une trentaine de caractères par ligne, dans une application de documentation.',
      options: [
        {
          id: 'justified',
          visual: {
            alt: 'Paragraphe justifié dans une colonne étroite, avec de grands blancs irréguliers entre les mots.',
            html: `<div class="mk-pad"><p class="col">Les sauvegardes automatiques interviennent toutes les quinze minutes, conformément à la configuration administrateur sélectionnée. Les copies sont conservées pendant trente jours, puis supprimées définitivement, sauf si un administrateur les archive manuellement.</p></div>`,
            css: `.col { width: min(30ch, 100%); text-align: justify; hyphens: manual; line-height: 1.5; }`,
          },
          why: 'Sans césure, la justification étire les espaces : de grands trous irréguliers s’ouvrent entre les mots et hachent la lecture.',
        },
        {
          id: 'ragged',
          visual: {
            alt: 'Même paragraphe aligné à gauche, espaces réguliers et fin de ligne irrégulière.',
            html: `<div class="mk-pad"><p class="col" lang="fr">Les sauvegardes automatiques interviennent toutes les quinze minutes, conformément à la configuration administrateur sélectionnée. Les copies sont conservées pendant trente jours, puis supprimées définitivement, sauf si un administrateur les archive manuellement.</p></div>`,
            css: `.col { width: min(30ch, 100%); text-align: start; line-height: 1.5; }`,
          },
          why: 'Aligné à gauche, chaque espace garde sa largeur : l’œil enchaîne les mots sans trous.',
        },
      ],
      answer: 'ragged',
      explanation: `La justification répartit l’espace restant de chaque ligne **entre les mots**. Dans une colonne étroite, il y a peu de mots par ligne : les espaces gonflent de façon irrégulière, des trous s’ouvrent entre les mots et, d’une ligne à l’autre, peuvent s’aligner en **rivières** blanches verticales. Le détecteur d’impeccable le signale (*justified text*).

Aligne à gauche (\`text-align: start\`, qui suit aussi le sens d’écriture), élargis la mesure, ou, si la justification est indispensable, active la césure avec \`hyphens: auto\` et un attribut \`lang\` correct. Les écritures qui justifient autrement (chinois, japonais, thaï, arabe) ne sont pas concernées.`,
      takeaway: 'Colonne étroite : aligne à gauche, ou justifie seulement avec `hyphens: auto` et la bonne langue.',
      sources: ['imp:detector', 'butterick'],
    },
    {
      id: 'typography-italic-serif-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Un magazine peut légitimement titrer sa page d’accueil en grand italique à empattements.',
      answer: true,
      explanation: `C’est vrai. Le détecteur d’impeccable signale le titre d’accueil en italique à empattements (type Fraunces, Playfair, Recoleta) parce qu’il est devenu **l’uniforme des pages d’accueil de startups générées par IA** : choisi par réflexe, il ne dit plus rien du produit.

Mais la règle elle-même précise : **« juge selon le contexte »**. Un magazine, une maison d’édition ou une marque au registre éditorial peuvent légitimement le vouloir, à condition que ce soit une décision qui découle du monde visuel choisi, pas un réflexe. Et une règle d’impeccable passe avant tout : **le brief gagne**.`,
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
        { id: 'translation', label: 'La version allemande (souvent 30 % plus longue que l’anglais)', why: 'L’expansion des traductions casse les largeurs fixes.' },
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
    {
      id: 'typography-article-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les trois défauts typographiques de cette page d’article.',
      visual: {
        alt: 'Page d’article d’un journal en ligne : navigation, très grand titre sur plusieurs lignes, ligne d’auteur, chapô, intertitre et paragraphe de texte.',
        frame: 'browser',
        html: `<div class="ar-w"><div class="ar">
  <div class="ar-bar" data-hotspot="nav"><b>Le Quotidien des villes</b><span>Mobilités</span><span>Logement</span><span>Climat</span></div>
  <p class="ar-h1" data-hotspot="title">Comment trois villes moyennes ont doublé la fréquentation de leurs bus en deux ans</p>
  <div class="ar-col">
    <p class="ar-meta" data-hotspot="meta">Par Inès Morel · 14 mars · 6 min de lecture</p>
    <p class="ar-lead" data-hotspot="lead">Des lignes plus simples, un bus toutes les dix minutes et des abonnements moins chers : les recettes sont connues, mais rares sont les villes qui les appliquent toutes à la fois.</p>
    <p class="ar-h2" data-hotspot="subhead">Moins de lignes, plus de passages</p>
    <p class="ar-body" data-hotspot="body">Dans la première, la refonte a commencé par une carte : six lignes directes au lieu d’une vingtaine de tracés qui se croisaient. Les usagers attendent moins, et surtout ils savent quand passe le prochain bus, sans consulter d’horaires.</p>
  </div>
</div></div>`,
        css: `.ar-w { container-type: inline-size; }
.ar { padding: 0 20px 24px; color: #1d2230; }
.ar-bar { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding: 12px 0; margin-bottom: 20px; border-bottom: 1px solid #e3e6ec; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #5a6172; }
.ar-bar b { margin-inline-end: auto; font-size: 14px; font-weight: 700; letter-spacing: 0; text-transform: none; color: #1d2230; }
.ar-h1 { font-size: clamp(30px, 7.5cqw, 72px); line-height: 1.05; font-weight: 800; letter-spacing: -.02em; }
.ar-col { max-width: 50ch; font-size: 16px; }
.ar-meta { margin-top: 14px; font-size: 13px; color: #5a6172; }
.ar-lead { margin-top: 18px; font-size: 17px; line-height: 1.55; letter-spacing: .1em; }
.ar-h2 { margin-top: 24px; font-size: 22px; line-height: 1.25; font-weight: 700; }
.ar-body { margin-top: 10px; line-height: 1.1; }`,
      },
      hotspots: [
        { id: 'title', label: 'Titre-phrase en taille d’affichage', correct: true, why: 'Une phrase de plus de 80 caractères en taille d’affichage domine le premier écran : le titre écrase l’article au lieu de l’annoncer.' },
        { id: 'lead', label: 'Chapô en approche large', correct: true, why: 'Le chapô, paragraphe d’introduction sous le titre, est composé avec une approche de 0,1em : sur des phrases entières, les lettres se détachent et la lecture ralentit. L’approche large est réservée aux courts libellés en capitales.' },
        { id: 'body', label: 'Paragraphe à l’interlignage serré', correct: true, why: 'Un interlignage de 1,1 colle les lignes : l’œil peine à suivre la sienne et glisse sur la voisine.' },
        { id: 'nav', label: 'Navigation en capitales espacées', correct: false, why: 'De courts libellés en capitales : c’est précisément là que l’approche large est à sa place.' },
        { id: 'meta', label: 'Ligne d’auteur et de date', correct: false, why: 'Plus petite et grisée, mais lisible (13 px, contraste de 6:1) : la métadonnée recule sans disparaître.' },
        { id: 'subhead', label: 'Intertitre', correct: false, why: 'Nettement plus grand et plus gras que le corps, sans rivaliser avec le titre : un rôle par niveau.' },
      ],
      explanation: `Trois règles du détecteur d’impeccable s’appliquent ici :

- **Titre de héros surdimensionné** : une phrase complète en taille d’affichage domine le premier écran (le détecteur vise un titre d’au moins 72 px et 40 caractères qui occupe une grande part de l’écran). Un titre d’un ou deux mots peut être énorme ; une phrase longue se compose plus petit, ou se raccourcit.
- **Approche large sur le texte courant** : au-delà de +0,05em, les lettres se détachent et la lecture ralentit. L’espacement large reste aux courts libellés en capitales, comme la navigation.
- **Interlignage serré** : sous 1,3, les lignes se collent. Le corps de texte respire entre 1,5 et 1,7.`,
      takeaway: 'Un titre long se compose plus petit, l’approche large reste aux courts libellés, et le corps garde un interlignage d’au moins 1,5.',
      sources: ['imp:detector', 'imp:typeset'],
    },
    {
      id: 'typography-method-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range dans l’ordre les étapes pour reprendre la typographie d’un écran existant.',
      items: [
        { id: 'assess', label: 'Évaluer à l’œil : rôles, hiérarchie, mesure, cas extrêmes' },
        { id: 'scan', label: 'Lancer le scan du détecteur' },
        { id: 'system', label: 'Énoncer le système : rôles, contrastes, mesure, polices de référence' },
        { id: 'apply', label: 'Appliquer les réglages' },
        { id: 'verify', label: 'Vérifier sur le rendu, puis relancer le scan' },
      ],
      explanation: `Impeccable sépare deux évaluations et les mène dans cet ordre : **d’abord à l’œil**, puis le **scan mécanique**. Lancer le détecteur en premier orienterait ton jugement vers ce qu’il sait mesurer, au détriment de ce qu’il ne voit pas : l’accord des polices avec le produit, par exemple.

Ensuite seulement, on **énonce le système** (rôles, contrastes entre eux, mesure, polices de référence) avant de toucher au CSS, on l’applique, puis on **vérifie sur le rendu**, à chaque largeur, avant de relancer le scan. Un scan propre est un plancher, pas une preuve de bonne typographie.`,
      takeaway: 'Évalue à l’œil avant de scanner, énonce le système avant d’éditer, vérifie sur le rendu : un scan propre est un plancher, pas une preuve.',
      sources: ['imp:typeset'],
    },
  ],
};

export default typography;
