/** Reference material for the Ressources tab. Figures come from impeccable's references unless noted. */

export interface CheatGroup {
  title: string;
  source: string;
  rows: [string, string][];
}

export const CHEATSHEET: CheatGroup[] = [
  {
    title: 'Typographie',
    source: 'imp:typeset',
    rows: [
      ['Corps de texte (web)', '≥ 16 px'],
      ['Longueur de ligne', '45–75 caractères'],
      ['Interlignage du corps', '1,5–1,7'],
      ['Resserrement maximal', '−0,04em'],
      ['Titre d’affichage', '≤ 6rem'],
      ['Rapport d’échelle (produit)', '1,125–1,2'],
      ['Écart minimal entre rôles', '≥ 1,25×'],
      ['Texte fonctionnel', '≥ 11 px'],
    ],
  },
  {
    title: 'Contraste (WCAG 2.2 AA)',
    source: 'wcag:contrast',
    rows: [
      ['Texte courant', '4,5:1'],
      ['Grand texte (24 px, ou 18,66 px gras)', '3:1'],
      ['Contrôles, icônes, focus', '3:1'],
      ['Niveau AAA (texte courant)', '7:1'],
    ],
  },
  {
    title: 'Cibles et plateformes',
    source: 'imp:audit',
    rows: [
      ['WCAG 2.5.8 (minimum)', '24 × 24 px'],
      ['Recommandé tactile', '44 × 44 px'],
      ['iOS', '44 × 44 pt'],
      ['Android', '48 × 48 dp, 8 dp d’écart'],
      ['Barre d’onglets iOS', '2–5 sections'],
      ['Barre de navigation Android', '3–5 destinations'],
      ['Corps iOS / plancher', '17 pt / 11 pt'],
    ],
  },
  {
    title: 'Mouvement',
    source: 'imp:animate',
    rows: [
      ['Retour immédiat', '100–150 ms'],
      ['Changement d’état', '150–300 ms'],
      ['Mise en page, panneau, vue', '300–500 ms'],
      ['Entrée signée (rare)', '500–800 ms'],
      ['Transitions en interface produit', '150–250 ms'],
      ['Courbe d’arrivée', 'cubic-bezier(0.16, 1, 0.3, 1)'],
      ['Sortie', 'plus rapide que l’entrée'],
    ],
  },
  {
    title: 'Charge cognitive',
    source: 'imp:critique',
    rows: [
      ['Mémoire de travail', '≈ 4 éléments'],
      ['Options visibles par décision', '≤ 4'],
      ['Navigation de premier niveau', '≤ 5 entrées'],
      ['Actions', '1 principale, 1–2 secondaires'],
      ['Échecs de la check-list', '0–1 faible · 4+ critique'],
    ],
  },
  {
    title: 'Performance',
    source: 'web.dev:cwv',
    rows: [
      ['LCP (affichage du contenu principal)', '< 2,5 s'],
      ['INP (réactivité)', '< 200 ms'],
      ['CLS (stabilité)', '< 0,1'],
      ['Seuil de Doherty', '≈ 400 ms'],
    ],
  },
  {
    title: 'Internationalisation',
    source: 'imp:harden',
    rows: [
      ['Marge pour les traductions', '+30 à 40 %'],
      ['Allemand vs anglais', '≈ +30 %'],
      ['Mise en page RTL', 'propriétés logiques'],
      ['Dates, nombres, pluriels', 'API Intl'],
    ],
  },
  {
    title: 'Critique et audit',
    source: 'imp:critique',
    rows: [
      ['Heuristiques de Nielsen', '10 × 0–4 = /40'],
      ['Bandes', '36+ excellent · 28+ bon · 20+ acceptable'],
      ['Interfaces réelles', 'souvent 20–32/40'],
      ['Audit technique', '5 × 0–4 = /20'],
      ['Sévérité', 'P0 bloquant → P3 finition'],
    ],
  },
];

export const HEURISTICS: { n: number; title: string; text: string }[] = [
  { n: 1, title: 'Visibilité de l’état du système', text: 'Informer à temps de ce qui se passe : chargements, confirmations, progression, position dans la navigation.' },
  { n: 2, title: 'Correspondance avec le monde réel', text: 'Parler la langue des gens, suivre leurs conventions et un ordre naturel.' },
  { n: 3, title: 'Contrôle et liberté', text: 'Des sorties de secours claires : annuler, revenir, fermer, effacer un filtre.' },
  { n: 4, title: 'Cohérence et standards', text: 'Mêmes mots, mêmes actions, mêmes résultats partout ; respecter les conventions des plateformes.' },
  { n: 5, title: 'Prévention des erreurs', text: 'Mieux qu’un bon message d’erreur : une conception qui empêche l’erreur (contraintes, valeurs par défaut, confirmation des actions destructrices).' },
  { n: 6, title: 'Reconnaissance plutôt que rappel', text: 'Rendre visibles les options et l’information utile au lieu d’exiger de s’en souvenir.' },
  { n: 7, title: 'Flexibilité et efficacité', text: 'Des accélérateurs invisibles pour les novices : raccourcis, actions groupées, favoris.' },
  { n: 8, title: 'Esthétique et design minimaliste', text: 'Rien d’inutile ou de rarement nécessaire : chaque élément mérite sa place.' },
  { n: 9, title: 'Reconnaître, diagnostiquer, récupérer', text: 'Des erreurs en langage clair, précises, avec une solution, sans effacer le travail.' },
  { n: 10, title: 'Aide et documentation', text: 'Une aide facile à trouver, centrée sur les tâches, concise, au bon endroit.' },
];

export const SEVERITY: { id: string; title: string; text: string }[] = [
  { id: 'P0', title: 'Bloquant', text: 'Empêche d’accomplir la tâche. À corriger immédiatement.' },
  { id: 'P1', title: 'Majeur', text: 'Difficulté importante ou non-conformité WCAG AA. À corriger avant la mise en ligne. Un utilisateur contacterait le support : au moins P1.' },
  { id: 'P2', title: 'Mineur', text: 'Gêne avec contournement possible. Au prochain passage.' },
  { id: 'P3', title: 'Finition', text: 'Sans impact réel. Si le temps le permet.' },
];

export const PERSONAS: { name: string; role: string; text: string; flags: string }[] = [
  {
    name: 'Alex',
    role: 'Expert pressé',
    text: 'Connaît ce type de produit, saute les tutoriels, cherche les raccourcis et les actions groupées.',
    flags: 'Onboarding imposé, pas de clavier, animations lentes, confirmations inutiles.',
  },
  {
    name: 'Jordan',
    role: 'Novice perdu',
    text: 'N’a jamais utilisé ce genre d’outil, lit tout, hésite, prend chaque libellé au pied de la lettre.',
    flags: 'Navigation en icônes seules, jargon, aucune aide visible, pas de confirmation de réussite.',
  },
  {
    name: 'Sam',
    role: 'Dépend de l’accessibilité',
    text: 'Lecteur d’écran, clavier seul, zoom à 200 %, besoin de contrastes suffisants.',
    flags: 'Interactions au clic seulement, focus invisible, sens porté par la couleur seule, champs sans étiquette.',
  },
  {
    name: 'Riley',
    role: 'Testeur de cas limites',
    text: 'Teste les états vides, les textes très longs, les emoji, l’actualisation en plein parcours.',
    flags: 'Échecs silencieux, données perdues, « Aucun résultat » sans aide, comportements incohérents.',
  },
  {
    name: 'Casey',
    role: 'Mobile et distrait',
    text: 'Une main, le pouce, souvent interrompu, parfois en 3G.',
    flags: 'Actions hors de portée du pouce, progression perdue, saisie longue au lieu de choix, petites cibles.',
  },
];

export const COMMANDS: { cmd: string; family: string; when: string }[] = [
  { cmd: 'shape', family: 'Construire', when: 'Avant de coder : cadrer la tâche, les gens, les contraintes, puis le brief.' },
  { cmd: 'init', family: 'Construire', when: 'Une fois par projet : consigner la vérité produit durable dans PRODUCT.md.' },
  { cmd: 'document', family: 'Construire', when: 'Écrire DESIGN.md à partir du code existant.' },
  { cmd: 'extract', family: 'Construire', when: 'Sortir composants et jetons réutilisables vers le design system.' },
  { cmd: 'critique', family: 'Évaluer', when: 'Revue UX notée : hiérarchie, clarté, heuristiques, personas.' },
  { cmd: 'audit', family: 'Évaluer', when: 'Contrôles techniques : accessibilité, performance, thèmes, responsive.' },
  { cmd: 'polish', family: 'Affiner', when: 'Dernière passe avant de livrer : cohérence, états, finitions.' },
  { cmd: 'distill', family: 'Affiner', when: 'L’interface est trop chargée : revenir à l’essentiel.' },
  { cmd: 'bolder', family: 'Affiner', when: 'Une section trop sage : l’amener au niveau d’engagement du reste.' },
  { cmd: 'quieter', family: 'Affiner', when: 'Trop criard ou fatigant : baisser l’intensité sans devenir générique.' },
  { cmd: 'harden', family: 'Affiner', when: 'Prêt pour la production : erreurs, i18n, textes longs, cas limites.' },
  { cmd: 'onboard', family: 'Affiner', when: 'Premier usage, états vides, chemin vers le moment « aha ».' },
  { cmd: 'typeset', family: 'Enrichir', when: 'Polices, hiérarchie, tailles, mesure.' },
  { cmd: 'colorize', family: 'Enrichir', when: 'Introduire une couleur stratégique dans une interface terne.' },
  { cmd: 'layout', family: 'Enrichir', when: 'Espacement, rythme, structure et hiérarchie spatiale.' },
  { cmd: 'animate', family: 'Enrichir', when: 'Ajouter un mouvement qui a un rôle.' },
  { cmd: 'delight', family: 'Enrichir', when: 'Des moments de personnalité, là où ils sont mérités.' },
  { cmd: 'overdrive', family: 'Enrichir', when: 'Des effets techniquement ambitieux, quand le projet les assume.' },
  { cmd: 'clarify', family: 'Corriger', when: 'Libellés, erreurs et textes d’interface flous.' },
  { cmd: 'adapt', family: 'Corriger', when: 'Adapter à un autre écran, appareil ou contexte.' },
  { cmd: 'optimize', family: 'Corriger', when: 'Diagnostiquer et corriger la performance de l’interface.' },
  { cmd: 'live', family: 'Itérer', when: 'Choisir un élément dans le navigateur et itérer sur des variantes.' },
  { cmd: 'generate', family: 'Itérer', when: 'Générer plusieurs variantes d’un élément nommé.' },
];

export const GLOSSARY: { term: string; def: string }[] = [
  { term: 'Affordance', def: 'Ce qu’un élément laisse deviner de son usage : un bouton qui a l’air cliquable, une poignée qui invite à glisser.' },
  { term: 'Anti-pattern', def: 'Une solution courante qui produit plus de problèmes qu’elle n’en résout.' },
  { term: 'Approche (letter-spacing)', def: 'L’espace entre les lettres d’un texte. Se resserre légèrement sur les grands titres, jamais sur l’arabe.' },
  { term: 'Bidirectionnalité (bidi)', def: 'Mélange d’écritures de gauche à droite et de droite à gauche dans un même texte (un e-mail dans une phrase arabe).' },
  { term: 'Charge cognitive', def: 'L’effort mental demandé par une interface. La charge extrinsèque, due au design, est à éliminer.' },
  { term: 'Chiffres tabulaires', def: 'Chiffres de largeur identique, pour aligner des montants en colonne.' },
  { term: 'Contexte fort / faible', def: 'Selon E. T. Hall, la part du sens portée par l’implicite (fort) ou par le message explicite (faible).' },
  { term: 'Core Web Vitals', def: 'Indicateurs de Google : LCP (affichage), INP (réactivité), CLS (stabilité visuelle).' },
  { term: 'Dark pattern', def: 'Interface conçue pour pousser à une décision que la personne n’aurait pas prise en toute connaissance de cause.' },
  { term: 'Design system', def: 'Un ensemble de jetons, composants et règles partagés qui rend une interface cohérente.' },
  { term: 'Divulgation progressive', def: 'Montrer ce qui sert maintenant, révéler le reste à la demande.' },
  { term: 'État vide', def: 'Ce qu’affiche une vue sans contenu : premier usage, aucun résultat, accès refusé, erreur. Une occasion d’orienter.' },
  { term: 'Heuristique', def: 'Une règle d’évaluation générale, comme les 10 heuristiques de Nielsen.' },
  { term: 'Hiérarchie visuelle', def: 'L’ordre dans lequel l’œil parcourt un écran, construit avec la taille, la graisse, la couleur, l’espace et la position.' },
  { term: 'i18n / l10n', def: 'Internationalisation : rendre un produit adaptable. Localisation : l’adapter à un marché précis.' },
  { term: 'Interlignage', def: 'La hauteur de ligne d’un texte (line-height).' },
  { term: 'Jeton (token)', def: 'Une valeur de design nommée : primitive (`blue-600`) ou sémantique (`color-action`).' },
  { term: 'Mesure', def: 'La longueur d’une ligne de texte, idéalement 45 à 75 caractères.' },
  { term: 'Mode de visite', def: 'Dans impeccable : ce que la réussite signifie sur une surface — Persuader, Opérer, Lire ou Expérience.' },
  { term: 'OKLCH', def: 'Un espace colorimétrique où luminosité, chroma et teinte varient de façon prévisible ; pratique pour construire des rampes.' },
  { term: 'Propriétés logiques', def: 'Des propriétés CSS relatives au sens de lecture (`margin-inline-start`) plutôt qu’à la gauche ou la droite.' },
  { term: 'Répétition espacée', def: 'Revoir une notion à intervalles croissants, juste avant de l’oublier.' },
  { term: 'Slop', def: 'Le « tout-venant » des interfaces générées : des choix par défaut que personne n’a décidés.' },
  { term: 'Squelette (skeleton)', def: 'Une silhouette grise du contenu à venir, affichée pendant le chargement.' },
  { term: 'Super-app', def: 'Une application qui regroupe messagerie, paiement et services tiers (WeChat, Alipay, Grab).' },
  { term: 'Test du plissement d’yeux', def: 'Flouter un écran (ou plisser les yeux) pour vérifier que le principal, le secondaire et les groupes se lisent encore.' },
  { term: 'Zone du pouce', def: 'La partie d’un écran de téléphone atteignable à une main, surtout le bas.' },
];
