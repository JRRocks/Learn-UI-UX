import type { ModuleContent, SourceRef } from '../../engine/types';

const PEAK_END: SourceRef = { label: 'Laws of UX — Règle pic-fin (peak-end rule)', url: 'https://lawsofux.com/peak-end-rule/' };
const KAHNEMAN: SourceRef = {
  label: 'Kahneman, Fredrickson, Schreiber et Redelmeier (1993) — When More Pain Is Preferred to Less: Adding a Better End, Psychological Science',
};

/* ---------- Shared mock pieces ---------- */

/** Confetti pieces: [left %, top %, color, rotation]. Drawn as plain rectangles over the mock. */
const CONFETTI = (
  [
    [8, 10, '#f97316', 20],
    [18, 30, '#1f4fd8', -35],
    [27, 6, '#db2777', 60],
    [38, 22, '#16a34a', 10],
    [47, 4, '#eab308', -20],
    [58, 18, '#7c3aed', 45],
    [68, 8, '#0891b2', -50],
    [79, 26, '#f97316', 30],
    [88, 12, '#16a34a', -10],
    [12, 74, '#eab308', 40],
    [24, 88, '#7c3aed', -25],
    [72, 80, '#db2777', 15],
    [84, 70, '#1f4fd8', -40],
    [92, 90, '#eab308', 55],
  ] as const
)
  .map(([l, t, c, r]) => `<span style="left:${l}%;top:${t}%;background:${c};transform:rotate(${r}deg)"></span>`)
  .join('');

const CONFETTI_CSS = `.cf { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.cf span { position: absolute; width: 9px; height: 4px; border-radius: 1px; }`;

const NOTE = `<p class="mk-small mk-muted">Brouillon · Réunion d’équipe</p>
  <p class="mk-h3">Points à aborder lundi</p>
  <p>Budget du salon, planning des congés, nouveau fournisseur d’emballages…</p>`;

const GLASSES = (n: number) =>
  `<div class="mk-row" style="--gap:6px">${Array.from({ length: 8 }, (_, i) => `<span class="gl${i < n ? ' gl--on' : ''}"></span>`).join('')}</div>`;

const WATER_CSS = `.gl { width: 18px; height: 24px; border: 2px solid #1f4fd8; border-radius: 3px 3px 7px 7px; }
.gl--on { background: #9db8ff; }
.wt { position: relative; min-height: 300px; }`;

const COVER = `<div class="bk-cover"><span>Les Saisons du jardin</span></div>`;

const delight: ModuleContent = {
  id: 'delight',
  title: 'Personnalité et délice',
  category: 'enrichir',
  summary:
    'Révéler le caractère du produit aux moments qui le méritent, proportionner la célébration à l’effort et à la fréquence, et ne jamais ralentir ni brouiller la tâche.',
  minutes: 9,
  commands: ['delight', 'overdrive'],
  sources: ['imp:delight', 'imp:overdrive', 'imp:clarify', 'imp:onboard', 'imp:critique', PEAK_END],
  sections: [
    {
      id: 'definition',
      title: 'Le délice, c’est du caractère au bon moment',
      body: `Le délice n’est pas une couche de fantaisie générique posée sur l’interface. C’est **le caractère du produit, révélé** par une interaction utile, une réponse humaine ou un détail inattendu et soigné.

Le test d’impeccable : le moment doit être **assez spécifique pour qu’un produit voisin ne puisse pas le reprendre tel quel**. Des confettis, une mascotte qui plaisante, un « Youpi ! » se posent n’importe où — c’est bien le signe qu’ils ne disent rien du produit.

Avant d’ajouter quoi que ce soit, écris une **thèse de délice** en une phrase : ce que la personne doit ressentir, et pourquoi ce sentiment appartient à *ce* produit. Puis choisis le plus petit dispositif qui la livre :

- une réponse distinctive à une action qui compte ;
- un langage propre au produit, qui clarifie tout en portant la voix ;
- une transition au comportement matériel reconnaissable ;
- une illustration, un son, une vibration ou un détail ancré dans l’univers du produit ;
- une découverte qui révèle une vraie utilité.

Sur une surface **Opérer** ou **Lire**, la fiabilité porte tout le reste : le délice se concentre sur quelques moments — premier usage, accomplissement, reprise après une erreur, maîtrise.`,
    },
    {
      id: 'moments',
      title: 'Choisir les moments qui le méritent',
      body: `Cherche les moments où une émotion est déjà en jeu :

- un **effort** qui mérite d’être reconnu ;
- une **attente** qui peut devenir informative ;
- un **état vide** ou un **premier usage** qui peut orienter ;
- une **erreur** qui demande de l’empathie ;
- une interaction dont la réponse peut exprimer la marque ;
- une **capacité utile** que l’on aura plaisir à découvrir.

La **règle pic-fin** (*peak-end rule*), issue des travaux de Daniel Kahneman, éclaire ce choix : on juge une expérience surtout d’après son moment le plus intense et d’après sa fin, bien plus que d’après la moyenne de tous ses instants. Soigne donc la fin d’un parcours — confirmation, récapitulatif, suite — et ses pics, négatifs compris.

Et ne fabrique pas de célébration pour un clic ordinaire.`,
    },
    {
      id: 'proportion',
      title: 'Une réponse proportionnée',
      body: `L’intensité d’une célébration suit **l’effort et l’enjeu**, et diminue avec la **fréquence**.

- **Accomplissement** : un jalon majeur peut prendre de l’ampleur ; un enregistrement courant doit simplement paraître certain.
- **Répétition** : la réponse doit rester satisfaisante à la **centième fois**. Une animation charmante au premier essai devient une friction au cinquantième. La variation n’aide que si elle reste cohérente et prévisible.
- **Coût** : pas de dépendance ni de fichier lourd disproportionnés pour un moment.

Une même application peut donc offrir une coche discrète à l’action quotidienne, et un vrai moment — que l’on peut passer — au premier livre publié.`,
      examples: [
        {
          title: 'Enregistrer un brouillon, trente fois par jour',
          bad: {
            alt: 'Éditeur de notes recouvert d’une fenêtre « Bravo ! Votre brouillon a bien été enregistré » entourée de confettis, avec un bouton « Super ! ».',
            height: 230,
            html: `<div class="mk-pad mk-stack nb" style="--gap:8px">${NOTE}<div class="mk-overlay"><div class="mk-dialog mk-center mk-stack" style="--gap:8px"><p class="mk-h2">Bravo !</p><p>Votre brouillon a bien été enregistré.</p><span class="mk-btn">Super !</span></div></div><div class="cf">${CONFETTI}</div></div>`,
            css: `${CONFETTI_CSS} .nb { position: relative; min-height: 230px; }`,
          },
          badNote: 'Une fête et un clic de plus pour une action répétée trente fois par jour : charmant la première fois, pénible ensuite.',
          good: {
            alt: 'Même éditeur avec, en haut à droite, une petite coche verte et la mention « Enregistré à 14 h 32 ».',
            height: 230,
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><div class="mk-row mk-between"><span></span><span class="sv"><i data-icon="check" style="--ico:14px"></i>Enregistré à 14 h 32</span></div>${NOTE}</div>`,
            css: `.sv { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #1a6e32; }`,
          },
          goodNote: 'Une confirmation discrète et certaine, sans interrompre l’écriture.',
        },
      ],
    },
    {
      id: 'limites',
      title: 'Les garde-fous',
      body: `Le délice ne doit jamais :

- **retarder, bloquer ou masquer** la tâche principale ;
- **simuler un travail**, ou retarder la fin pour mettre en scène une animation : une attente montre une progression vraie ou un contexte utile ;
- passer outre les **conventions de la plateforme** ou l’**accessibilité** (lecteur d’écran, clavier, tactile, mouvement réduit, traduction) ;
- ajouter des **affirmations** que personne n’a demandées ;
- jouer un **son** sans consentement, ou en ignorant le mode silencieux ;
- devenir **obligatoire**, **impossible à passer** ou épuisant à la répétition.

**Erreurs et reprises** : commence par le problème et la solution. La chaleur peut réduire le stress ; la **blague** n’a pas sa place quand il s’agit d’**argent**, de **vie privée**, d’une **suppression**, d’une **perte** ou d’un travail bloqué. La consigne d’impeccable tient en une phrase : la chaleur, oui ; la blague, non.`,
      examples: [
        {
          title: 'Un paiement refusé',
          bad: {
            alt: 'Écran de paiement avec un encadré rouge pâle « Oups, votre carte fait la grève ! Elle a sûrement besoin de vacances » et un bouton « Réessayer ».',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Paiement</p><div class="pe"><p class="mk-strong">Oups, votre carte fait la grève !</p><p class="mk-small">Elle a sûrement besoin de vacances. Réessayez plus tard ?</p></div><div class="mk-row mk-between"><span class="mk-small mk-muted">Total</span><span class="mk-price">89,90 €</span></div><span class="mk-btn mk-btn--block">Réessayer</span></div>`,
            css: `.pe { border-radius: 10px; padding: 12px 14px; background: #fdecea; color: #7a1d16; display: flex; flex-direction: column; gap: 2px; }`,
          },
          badNote: 'Une blague sur l’argent au moment où la personne s’inquiète : on ignore si elle a été débitée et quoi faire.',
          good: {
            alt: 'Même écran : encadré « Paiement refusé par votre banque », précisant qu’aucun montant n’a été débité et les solutions, avec deux boutons.',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Paiement</p><div class="pe"><p class="mk-strong mk-row" style="--gap:6px"><i data-icon="circle-alert" style="--ico:16px"></i>Paiement refusé par votre banque</p><p class="mk-small">Aucun montant n’a été débité. Vérifiez le plafond de votre carte, ou utilisez un autre moyen de paiement.</p></div><div class="mk-row mk-between"><span class="mk-small mk-muted">Total</span><span class="mk-price">89,90 €</span></div><span class="mk-btn mk-btn--block">Utiliser une autre carte</span><span class="mk-btn mk-btn--ghost mk-btn--block">Réessayer avec cette carte</span></div>`,
            css: `.pe { border-radius: 10px; padding: 12px 14px; background: #fdecea; color: #7a1d16; display: flex; flex-direction: column; gap: 4px; }`,
          },
          goodNote: 'Le problème, ce qui est rassurant (rien n’a été débité) et deux sorties : chaleureux sans plaisanter.',
        },
      ],
    },
    {
      id: 'voix',
      title: 'La voix du produit, pas la blague générique',
      body: `Le texte utilise **le langage du produit** : ses objets, ses gestes, son public. La fantaisie générique — « Oups ! », « Youpi ! », « On réveille les hamsters » — est pire qu’une clarté neutre : elle n’informe pas et sonne pareil partout.

- **État vide et premier usage** : rends l’action suivante évidente **avant** d’ajouter de la personnalité.
- **Succès** : confirme ce qui a été fait, et la conséquence quand elle change quelque chose pour la suite.
- **Attente** : nomme l’opération réelle ; n’invente jamais de progression.

La voix reste constante ; le ton s’adapte au moment — plus léger pour un jalon, sobre pour une erreur de paiement.`,
      examples: [
        {
          title: 'Un plan de semis vient d’être créé',
          bad: {
            alt: 'Message de succès « Youpi ! C’est fait ! Trop génial, vous êtes au top ! » avec un bouton « OK ».',
            html: `<div class="mk-pad-l mk-stack mk-center" style="--gap:8px"><p class="mk-h1">Youpi ! C’est fait !</p><p class="mk-muted">Trop génial, vous êtes au top !</p><span class="mk-btn" style="align-self:center">OK</span></div>`,
          },
          badNote: 'Enthousiasme générique : on ne sait ni ce qui a été créé, ni ce qui vient ensuite.',
          good: {
            alt: 'Message de succès « Votre plan de semis est prêt » détaillant le nombre de légumes et la date du premier semis, avec un bouton « Voir le calendrier ».',
            html: `<div class="mk-pad-l mk-stack" style="--gap:8px"><p class="mk-h2">Votre plan de semis est prêt</p><p>12 légumes, du radis au potiron. Premier semis en intérieur : <strong>le 3 mars</strong>.</p><p class="mk-small mk-muted">Un rappel arrivera la veille de chaque semis.</p><span class="mk-btn" style="align-self:flex-start;margin-top:4px">Voir le calendrier</span></div>`,
          },
          goodNote: 'Le langage du potager, ce qui a été fait, ce qui vient ensuite : la personnalité passe par la précision.',
        },
      ],
    },
    {
      id: 'au-dela',
      title: 'Découvrir, et dépasser les conventions avec discernement',
      body: `**La découverte** récompense la curiosité **sans cacher une fonction nécessaire** : un raccourci clavier proposé après trois sélections une à une, un geste qui accélère une tâche fréquente. La récompense, c’est l’utilité elle-même.

La commande *overdrive* d’impeccable va plus loin : **pousser une interface au-delà des conventions**, avec discernement. Ce qui est « extraordinaire » dépend du contexte : un système de particules impressionne sur un portfolio et embarrasse sur une page de réglages — mais une page de réglages aux enregistrements instantanés et aux transitions d’état fluides est extraordinaire, elle aussi.

- Propose deux ou trois directions et fais choisir avant de construire.
- **Amélioration progressive** obligatoire : sans l’effet, l’expérience doit rester bonne.
- Vise 60 images par seconde et simplifie sous 50 ; mets en pause ce qui sort de l’écran ; teste sur un appareil de milieu de gamme ; jamais de son sans accord explicite.
- Jamais plusieurs moments extraordinaires en concurrence : la concentration crée l’impact, l’excès crée du bruit.
- Quatre vérifications : l’effet sur quelqu’un qui découvre, le **retrait** (s’en apercevrait-on ?), l’appareil, le contexte.`,
    },
  ],
  rules: [
    { id: 'definition', front: 'Qu’est-ce que le délice en design d’interface ?', back: 'Le caractère du produit révélé par une interaction utile, une réponse humaine ou un détail soigné — pas une couche de fantaisie générique.' },
    { id: 'specific', front: 'Comment savoir si un moment de délice est réussi ?', back: 'Il est assez spécifique pour qu’un produit voisin ne puisse pas le reprendre tel quel.' },
    { id: 'where', front: 'Où concentrer le délice dans une application ?', back: 'Sur quelques moments : premier usage, accomplissement, reprise après une erreur, maîtrise. La fiabilité porte le reste.' },
    { id: 'proportion', front: 'Quelle intensité donner à une célébration ?', back: 'Proportionnelle à l’effort et à l’enjeu, et d’autant plus discrète que l’action est fréquente.' },
    { id: 'hundredth', front: 'Quel test pour une micro-interaction répétée ?', back: 'La centième fois : elle doit rester satisfaisante, jamais lassante ni ralentissante.' },
    { id: 'never-block', front: 'Le délice peut-il retarder la tâche ?', back: 'Jamais : ni retard, ni blocage, ni progression simulée pour mettre en scène une animation.' },
    { id: 'jokes', front: 'Peut-on plaisanter dans un message d’erreur ?', back: 'La chaleur oui, la blague non quand il s’agit d’argent, de vie privée, d’une suppression, d’une perte ou d’un travail bloqué.' },
    { id: 'voice', front: 'Fantaisie générique ou clarté neutre ?', back: 'La clarté neutre. La personnalité passe par le langage du produit, pas par des formules amusantes interchangeables.' },
    { id: 'empty', front: 'Que faire passer en premier dans un état vide ?', back: 'L’action suivante, évidente. La personnalité vient ensuite.' },
    { id: 'peak-end', front: 'Que dit la règle pic-fin ?', back: 'On juge une expérience surtout sur son moment le plus intense et sur sa fin. Soigne l’accomplissement, la reprise et la sortie.' },
    { id: 'discovery', front: 'Qu’est-ce qu’une bonne découverte ?', back: 'Une récompense de la curiosité qui révèle une vraie utilité, sans jamais cacher une fonction nécessaire.' },
    { id: 'sound', front: 'Un son de célébration ?', back: 'Seulement avec l’accord de la personne, et jamais en ignorant le mode silencieux.' },
    { id: 'overdrive', front: 'Pousser une interface au-delà des conventions : à quelles conditions ?', back: 'Un effet adapté au contexte, une version de repli, 60 images par seconde, et un seul moment extraordinaire à la fois.' },
  ],
  exercises: [
    {
      id: 'delight-celebration-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'La personne ajoute un verre d’eau à son suivi, une huitaine de fois par jour. Quelle réponse est la plus juste ?',
      options: [
        {
          id: 'party',
          visual: {
            alt: 'Écran de suivi d’hydratation recouvert d’une fenêtre « Bravo !!! Un verre d’eau de plus ! » entourée de confettis, avec un bouton « Merci ! ».',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack wt" style="--gap:12px"><p class="mk-h2">Hydratation</p><p>6 verres sur 8 aujourd’hui</p>${GLASSES(6)}<div class="mk-overlay"><div class="mk-dialog mk-center mk-stack" style="--gap:8px"><p class="mk-h2">Bravo !!!</p><p>Un verre d’eau de plus ! Continuez comme ça, champion !</p><span class="mk-btn">Merci !</span></div></div><div class="cf">${CONFETTI}</div></div>`,
            css: `${WATER_CSS} ${CONFETTI_CSS}`,
          },
          why: 'Une fête plein écran et un clic de plus, huit fois par jour : la célébration devient une corvée.',
        },
        {
          id: 'quiet',
          visual: {
            alt: 'Même écran : le compteur passe à 6 verres sur 8, une jauge avance et une ligne discrète indique « Verre ajouté à 14 h 10 · Annuler ».',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack wt" style="--gap:12px"><p class="mk-h2">Hydratation</p><p>6 verres sur 8 aujourd’hui</p>${GLASSES(6)}<p class="mk-small mk-row" style="--gap:6px;color:#1a6e32"><i data-icon="check" style="--ico:14px"></i>Verre ajouté à 14 h 10 <span class="mk-btn--text" style="padding:0">Annuler</span></p></div>`,
            css: WATER_CSS,
          },
          why: 'Le compteur et la jauge avancent, une ligne confirme et permet d’annuler : un retour sûr, agréable à la centième fois.',
        },
      ],
      answer: 'quiet',
      explanation: `L’intensité d’une célébration doit être **proportionnelle à l’effort et à l’enjeu**, et diminuer avec la **fréquence**. Ajouter un verre d’eau est une action minuscule, répétée plusieurs fois par jour : elle mérite un retour certain, pas une fête.

Le test d’impeccable : la réponse doit rester satisfaisante **à la centième fois**. Une fenêtre à fermer et des confettis plaisent une fois, puis deviennent une friction. Garde l’ampleur pour les vrais jalons, comme une première semaine où l’objectif est tenu chaque jour.`,
      takeaway: 'Une action fréquente et minime appelle un retour discret et sûr ; la célébration se réserve aux jalons.',
      sources: ['imp:delight', 'imp:onboard'],
    },
    {
      id: 'delight-milestone-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sur une plateforme d’autoédition, une autrice vient de publier son tout premier livre. Quelle réponse choisir ?',
      options: [
        {
          id: 'toast',
          visual: {
            alt: 'Écran d’édition du livre avec, en bas, une petite notification sombre « Modifications enregistrées ».',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-small mk-muted">Les Saisons du jardin · Publication</p><div class="mk-line mk-line--m"></div><div class="mk-line"></div><div class="mk-line mk-line--s"></div><div class="mk-toast" style="align-self:flex-start;margin-top:18px"><i data-icon="check" style="--ico:16px"></i>Modifications enregistrées</div></div>`,
          },
          why: 'Le même message que pour une virgule corrigée : le jalon le plus important de son parcours passe inaperçu.',
        },
        {
          id: 'moment',
          visual: {
            alt: 'Écran dédié : couverture du livre, titre « Votre premier livre est en ligne », phrase indiquant qu’il est disponible, bouton « Voir la page du livre » et lien « Partager le lien ».',
            html: `<div class="mk-pad-l mk-stack" style="--gap:10px">${COVER}<p class="mk-h2">Votre premier livre est en ligne</p><p>« Les Saisons du jardin » est disponible dans les librairies numériques partenaires.</p><div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn">Voir la page du livre</span><span class="mk-btn mk-btn--ghost">Partager le lien</span></div><span class="mk-small mk-muted">Fermer</span></div>`,
            css: `.bk-cover { width: 74px; height: 100px; border-radius: 4px 8px 8px 4px; background: linear-gradient(160deg, #2f4a3a, #14532d); color: #e4efe7; font-size: 11px; font-weight: 700; padding: 10px 8px; display: flex; align-items: flex-end; box-shadow: 0 6px 16px rgb(15 20 35 / 0.18); }`,
          },
          why: 'Un vrai moment, à la hauteur du jalon : le livre, ce qui vient de se passer, les suites utiles, et une sortie libre.',
        },
        {
          id: 'blocking',
          visual: {
            alt: 'Écran sombre plein cadre « FÉLICITATIONS !!! » avec une icône de son activé et un bouton grisé « Passer (dans 8 s) ».',
            html: `<div class="mk-pad-l mk-stack mk-center bl" style="--gap:12px"><span class="bl-snd"><i data-icon="volume-2" style="--ico:16px"></i>Son activé</span><p class="bl-t">FÉLICITATIONS !!!</p><p style="color:#c9d3e6">Préparez-vous à la gloire littéraire…</p><span class="mk-btn mk-btn--disabled" style="align-self:center">Passer (dans 8 s)</span></div>`,
            css: `.bl { background: #1b2a4a; color: #fff; min-height: 220px; justify-content: center; } .bl-snd { display: inline-flex; align-items: center; gap: 6px; align-self: flex-end; font-size: 12px; color: #ffd27a; } .bl-t { font-size: 26px; font-weight: 800; }`,
          },
          why: 'Animation imposée de 8 secondes, son lancé sans accord, aucune information utile : le délice bloque la tâche.',
        },
      ],
      answer: 'moment',
      explanation: `La réponse se **proportionne à l’effort et à l’enjeu**. Publier un premier livre est un jalon rare et important : il mérite plus qu’une notification générique, et impeccable autorise les jalons majeurs à prendre de l’ampleur.

Mais l’ampleur a des garde-fous : le moment ne doit ni bloquer, ni devenir impossible à passer, ni jouer un son sans accord. La version recommandée célèbre avec ce qui compte pour l’autrice — son livre, sa page, le lien à partager — et la laisse partir quand elle veut.`,
      takeaway: 'Un jalon rare mérite un vrai moment, utile et que l’on peut passer ; jamais une animation imposée ni un son sans accord.',
      sources: ['imp:delight', 'imp:onboard'],
    },
    {
      id: 'delight-error-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Trois notes n’ont pas pu être synchronisées. Quel message afficher ?',
      options: [
        {
          id: 'joke',
          visual: {
            alt: 'Bandeau « Oups ! Nos serveurs font une petite sieste… Revenez plus tard ! » au-dessus d’une liste de notes.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><div class="sy"><p class="mk-strong">Oups ! Nos serveurs font une petite sieste…</p><p class="mk-small">Revenez plus tard !</p></div><ul class="mk-list"><li>Liste de courses</li><li>Idées pour l’anniversaire de Jules</li><li>Compte rendu du conseil de classe</li></ul></div>`,
            css: `.sy { background: #fff7e0; color: #7a4a06; border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; }`,
          },
          why: 'Une plaisanterie là où la personne craint de perdre son travail : on ne sait ni quelles notes sont concernées, ni si elles sont à l’abri.',
        },
        {
          id: 'clear',
          visual: {
            alt: 'Bandeau « 3 notes n’ont pas pu être synchronisées », précisant qu’elles restent sur l’appareil, avec un bouton « Réessayer maintenant ».',
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><div class="sy"><p class="mk-strong mk-row" style="--gap:6px"><i data-icon="refresh-cw" style="--ico:15px"></i>3 notes n’ont pas pu être synchronisées</p><p class="mk-small">Elles restent enregistrées sur cet appareil. La synchronisation reprendra dès le retour de la connexion.</p><span class="mk-btn mk-btn--ghost mk-btn--s" style="align-self:flex-start;margin-top:6px">Réessayer maintenant</span></div><ul class="mk-list"><li>Liste de courses</li><li>Idées pour l’anniversaire de Jules</li><li>Compte rendu du conseil de classe</li></ul></div>`,
            css: `.sy { background: #fff7e0; color: #7a4a06; border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; }`,
          },
          why: 'Le problème, ce qui rassure (rien n’est perdu), ce qui va se passer et une action : la chaleur passe par la précision.',
        },
      ],
      answer: 'clear',
      explanation: `Une erreur de synchronisation touche au **risque de perte** : c’est exactement le cas où impeccable écarte la blague. Un message d’erreur commence par **le problème et la reprise** — ce qui a échoué, ce qui est à l’abri, ce que la personne peut faire.

La chaleur reste possible — un ton calme, une information rassurante —, mais la plaisanterie sur des serveurs qui « font la sieste » minimise l’inquiétude et n’aide en rien.`,
      takeaway: 'Erreur ou risque de perte : le problème et la solution d’abord. La chaleur oui, la blague non.',
      sources: ['imp:delight', 'imp:clarify'],
    },
    {
      id: 'delight-empty-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel état vide convient au premier lancement de cette application de course à pied ?',
      options: [
        {
          id: 'whimsy',
          visual: {
            alt: 'Écran « Mes sorties » avec un grand cercle gris, le texte « C’est bien vide par ici… Revenez quand vous aurez couru ! » et aucun bouton.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack mk-center" style="--gap:12px;padding-block:28px"><p class="mk-h3" style="text-align:start">Mes sorties</p><div class="em-ill"></div><p class="mk-strong">C’est bien vide par ici…</p><p class="mk-small mk-muted">Revenez quand vous aurez couru !</p></div>`,
            css: `.em-ill { width: 96px; height: 96px; border-radius: 50%; background: #eef1f5; align-self: center; }`,
          },
          why: 'Une formule amusante mais aucune piste : la personne ne sait pas comment enregistrer sa première sortie.',
        },
        {
          id: 'next-step',
          visual: {
            alt: 'Écran « Mes sorties » : « Aucune sortie enregistrée », une phrase sur ce que mesure l’application, un bouton « Démarrer une sortie » et un lien d’import depuis une montre.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:12px;padding-block:28px"><p class="mk-h3">Mes sorties</p><p class="mk-h2" style="margin-top:12px">Aucune sortie enregistrée</p><p class="mk-muted">Lancez votre première sortie : Foulée mesure la distance, l’allure et le dénivelé.</p><span class="mk-btn mk-btn--block"><i data-icon="play" style="--ico:16px"></i>Démarrer une sortie</span><span class="mk-btn mk-btn--ghost mk-btn--block">Importer depuis ma montre</span></div>`,
          },
          why: 'L’état vide explique ce qui apparaîtra ici et propose l’action suivante, avec une alternative utile.',
        },
      ],
      answer: 'next-step',
      explanation: `Pour un état vide ou un premier usage, impeccable est clair : **rendre l’action suivante évidente avant d’ajouter de la personnalité**. La formule amusante ne remplace pas une piste.

La version recommandée a aussi de la voix — elle parle de sorties, d’allure et de dénivelé, le langage du produit —, mais cette voix sert l’orientation au lieu de la remplacer.`,
      takeaway: 'État vide : d’abord l’action suivante, évidente ; la personnalité vient ensuite, dans le langage du produit.',
      sources: ['imp:delight', 'imp:onboard', 'imp:clarify'],
    },
    {
      id: 'delight-waiting-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'L’export d’un rapport annuel prend une vingtaine de secondes. Que montrer pendant l’attente ?',
      options: [
        { id: 'truthful', label: 'Une progression réelle avec l’étape en cours : « Calcul des totaux par client (3 sur 5) ».', why: 'C’est la consigne d’impeccable : une progression vraie et un contexte utile rendent l’attente informative.' },
        { id: 'quips', label: 'Des phrases amusantes qui changent toutes les trois secondes : « On réveille les hamsters… ».', why: 'De la fantaisie générique : elle n’informe pas et sonne pareil dans n’importe quel produit.' },
        { id: 'fake', label: 'Une barre qui avance à vitesse constante, sans lien avec le traitement réel.', why: 'Une progression inventée trahit la confiance dès qu’elle se bloque à 99 %.' },
        { id: 'flourish', label: 'Une roue qui tourne, puis deux secondes d’animation de succès avant d’ouvrir le fichier.', why: 'Retarder la fin pour mettre en scène une animation : exactement ce que le délice ne doit jamais faire.' },
      ],
      answer: 'truthful',
      explanation: `Une attente peut devenir **informative** : impeccable demande d’y montrer une progression vraie, un contexte utile ou une activité propre au produit — et interdit de **simuler du travail** ou de **retarder la fin** pour placer une animation.

La rédaction suit la même règle : le texte de chargement nomme l’opération réelle et donne une attente honnête ; on n’invente jamais de progression.`,
      takeaway: 'Pendant une attente : une progression vraie et l’étape en cours. Jamais de fausse barre ni de fin retardée pour une animation.',
      sources: ['imp:delight', 'imp:clarify'],
    },
    {
      id: 'delight-hundredth-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Une animation de célébration qui ravit la première fois ravira encore à la centième.',
      answer: false,
      explanation: `La répétition change tout. Ce qui surprend agréablement la première fois devient prévisible, puis lent, puis agaçant — surtout si l’animation retarde la suite ou demande un clic.

Impeccable demande que toute interaction répétée reste **satisfaisante à la centième utilisation**. D’où deux réflexes : réserver les célébrations aux moments rares, et donner aux actions fréquentes un retour bref et certain.`,
      takeaway: 'Teste chaque micro-interaction à la centième fois : ce qui est charmant une fois devient une friction à la répétition.',
      sources: ['imp:delight'],
    },
    {
      id: 'delight-delay-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Retarder d’une seconde l’affichage d’un résultat pour laisser jouer une animation de succès est acceptable si l’animation est réussie.',
      answer: false,
      explanation: `Le premier garde-fou d’impeccable : le délice ne doit jamais **retarder, bloquer ou masquer** la tâche principale. Et pendant une attente, on ne simule pas de travail et on ne retarde pas la fin pour mettre en scène un effet.

Une animation réussie peut accompagner l’arrivée du résultat — en parallèle, interruptible, rapide —, mais elle ne passe jamais devant lui.`,
      takeaway: 'Le délice accompagne la tâche, il ne la retarde jamais : aucune seconde ajoutée pour une animation.',
      sources: ['imp:delight', 'imp:animate'],
    },
    {
      id: 'delight-tasks-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux touches de « délice » qui desservent cette liste de tâches.',
      visual: {
        alt: 'Écran de téléphone d’une liste de tâches : titre et date, jauge de progression, quatre tâches, une astuce, une ligne de synchronisation et un panneau « Bravo ! » avec un bouton grisé « Continuer (5 s) ».',
        frame: 'phone',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div data-hotspot="header"><p class="mk-h2">Aujourd’hui</p><p class="mk-small mk-muted">Mardi 4 mars</p></div>
  <div class="mk-stack" style="--gap:6px" data-hotspot="progress"><div class="mk-row mk-between mk-small"><span>3 tâches sur 5</span><span class="mk-muted">60 %</span></div><div class="pg"><span></span></div></div>
  <ul class="mk-list"><li><span class="mk-check mk-check--on"></span><span class="mk-muted">Appeler le plombier</span></li><li><span class="mk-check mk-check--on"></span><span class="mk-muted">Payer la cantine</span></li><li><span class="mk-check"></span><span>Réserver le train pour Lyon</span></li><li><span class="mk-check"></span><span>Rendre les livres</span></li></ul>
  <p class="tk-tip" data-hotspot="tip">Astuce : faites glisser une tâche vers la gauche pour la reporter à demain.</p>
  <p class="mk-small mk-muted" data-hotspot="sync">Synchronisation… on nourrit les hamsters.</p>
  <div class="tk-sheet mk-stack" style="--gap:8px" data-hotspot="sheet"><p class="mk-h3">Bravo ! Une tâche de moins.</p><p class="mk-small mk-muted">Prenez le temps de savourer ce moment.</p><span class="mk-btn mk-btn--block mk-btn--disabled">Continuer (5 s)</span></div>
</div>`,
        css: `.pg { height: 6px; border-radius: 3px; background: #e6e9ef; } .pg span { display: block; width: 60%; height: 100%; border-radius: 3px; background: #1f4fd8; }
.tk-tip { font-size: 12px; background: #eef3ff; color: #36405a; border-radius: 8px; padding: 8px 10px; }
.tk-sheet { border-radius: 14px; padding: 14px; background: #fff; box-shadow: 0 -4px 20px rgb(15 20 35 / 0.12); border: 1px solid #e1e4ea; }`,
      },
      hotspots: [
        { id: 'sheet', label: 'Panneau « Bravo ! »', correct: true, why: 'Une célébration pour une simple case cochée, avec un bouton bloqué 5 secondes : le délice retarde la tâche et lassera dès la deuxième fois.' },
        { id: 'sync', label: 'Ligne de synchronisation', correct: true, why: 'Une formule amusante à la place de l’information : on ne sait pas si les tâches sont enregistrées ni combien de temps attendre.' },
        { id: 'tip', label: 'Astuce de glissement', correct: false, why: 'Une découverte qui révèle une vraie utilité, au bon endroit : c’est le bon délice.' },
        { id: 'progress', label: 'Jauge de progression', correct: false, why: 'Une progression vraie, sobre et utile.' },
        { id: 'header', label: 'Titre et date', correct: false, why: 'Clair et calme : rien à corriger.' },
      ],
      explanation: `Deux garde-fous d’impeccable sont franchis :

- **Ne jamais retarder ni bloquer la tâche**, et proportionner la célébration à l’effort : cocher une tâche est une action fréquente, qui mérite un retour bref, pas un panneau à attendre.
- **La fantaisie générique est pire qu’une clarté neutre** : une ligne de synchronisation doit dire ce qui se passe.

L’astuce, elle, est un bon exemple de découverte : elle révèle un geste utile sans cacher aucune fonction.`,
      takeaway: 'Le délice ne retarde jamais la tâche et ne remplace jamais l’information ; une bonne découverte révèle une vraie utilité.',
      sources: ['imp:delight', 'imp:clarify'],
    },
    {
      id: 'delight-account-hotspot',
      type: 'hotspot',
      difficulty: 1,
      prompt: 'Trouve les deux endroits où le ton de cette banque en ligne est déplacé.',
      visual: {
        alt: 'Page de paramètres d’une banque en ligne : salutation, réglage des notifications de virement avec la mention « Enregistré », partage de données avec des partenaires, téléchargement des relevés et clôture du compte.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:4px">
  <div data-hotspot="greeting" style="margin-bottom:10px"><p class="mk-h2">Bonjour Camille</p><p class="mk-small mk-muted">Compte courant · Banque Arlette</p></div>
  <div class="ac-row" data-hotspot="notif"><div class="mk-grow"><p class="mk-strong">Virements reçus</p><p class="mk-small mk-muted">Une notification à chaque virement entrant.</p></div><span class="ac-ok"><i data-icon="check" style="--ico:14px"></i>Enregistré</span><span class="mk-toggle mk-toggle--on"></span></div>
  <div class="ac-row" data-hotspot="privacy"><div class="mk-grow"><p class="mk-strong">Partager mes données d’achat avec nos partenaires</p><p class="mk-small mk-muted">Promis, ils sont très sympas !</p></div><span class="mk-toggle"></span></div>
  <div class="ac-row" data-hotspot="statements"><div class="mk-grow"><p class="mk-strong">Relevés de compte</p><p class="mk-small mk-muted">Les 12 derniers mois, en PDF.</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Télécharger</span></div>
  <div class="ac-row" data-hotspot="close"><div class="mk-grow"><p class="mk-strong">Clôturer mon compte</p><p class="mk-small mk-muted">Vous partez déjà ? Notre cœur saigne… contrairement à votre découvert.</p></div><span class="mk-btn mk-btn--danger mk-btn--s">Clôturer</span></div>
</div>`,
        css: `.ac-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-top: 1px solid #eceef2; }
.ac-ok { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #1a6e32; }`,
      },
      hotspots: [
        { id: 'privacy', label: 'Partage des données', correct: true, why: 'Une plaisanterie sur la vie privée, au moment précis où la personne doit décider en connaissance de cause : il faut dire quelles données, à qui et pourquoi.' },
        { id: 'close', label: 'Clôture du compte', correct: true, why: 'Une blague sur une décision engageante et sur l’argent (le découvert) : déplacée et un peu culpabilisante.' },
        { id: 'greeting', label: 'Salutation', correct: false, why: 'Une salutation simple et personnelle : chaleureuse sans rien minimiser.' },
        { id: 'notif', label: 'Notification de virement', correct: false, why: 'Un réglage clair et une confirmation discrète, « Enregistré » : le bon niveau de retour.' },
        { id: 'statements', label: 'Relevés de compte', correct: false, why: 'Factuel et utile : rien à corriger.' },
      ],
      explanation: `La consigne d’impeccable : **traiter sérieusement la vie privée, l’argent, la suppression, la perte et le travail bloqué** — la chaleur est bienvenue, la blague non.

Ici, l’humour tombe sur les deux sujets les plus sensibles de la page : le partage de données personnelles et la clôture d’un compte bancaire. La personnalité de la marque peut vivre ailleurs — dans une salutation, une confirmation bien tournée —, là où elle ne minimise aucun enjeu.`,
      takeaway: 'Pas d’humour sur l’argent, la vie privée, une suppression ou une perte : la chaleur, oui ; la blague, non.',
      sources: ['imp:delight', 'imp:clarify'],
    },
    {
      id: 'delight-intensity-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Dans une application de course à pied, range ces moments du retour le plus discret au plus expressif.',
      items: [
        { id: 'unit', label: 'Passer l’unité de distance des kilomètres aux miles' },
        { id: 'daily', label: 'Terminer sa sortie quotidienne' },
        { id: 'record', label: 'Battre son record personnel sur 10 km' },
        { id: 'marathon', label: 'Terminer son premier marathon' },
      ],
      explanation: `L’intensité suit **l’effort et l’enjeu**, et diminue avec la **fréquence** :

1. un réglage : une confirmation silencieuse suffit ;
2. la sortie quotidienne : un retour satisfaisant mais bref, qui supportera la centième répétition ;
3. un record : un moment plus marqué, rare et mérité ;
4. un premier marathon : un vrai pic émotionnel, qui peut prendre de l’ampleur — sans jamais bloquer ni devenir impossible à passer.`,
      takeaway: 'Plus l’effort et l’enjeu sont grands et l’événement rare, plus la réponse peut être expressive.',
      sources: ['imp:delight', PEAK_END],
    },
    {
      id: 'delight-match-moments',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque moment à la réponse qui lui convient.',
      leftTitle: 'Moment',
      rightTitle: 'Réponse',
      pairs: [
        { id: 'empty', left: 'Premier usage, écran encore vide', right: 'L’action suivante évidente, puis un ton propre au produit' },
        { id: 'wait', left: 'Une attente de vingt secondes', right: 'Une progression réelle et l’étape en cours' },
        { id: 'error', left: 'Un paiement refusé', right: 'Le problème et la solution d’abord, chaleureux sans blague' },
        { id: 'repeat', left: 'Une action répétée cinquante fois par jour', right: 'Un retour bref et certain, identique à chaque fois' },
        { id: 'milestone', left: 'Un jalon rare et important', right: 'Un moment plus ample, que l’on peut passer' },
      ],
      explanation: `Chaque situation émotionnelle a sa réponse, tirée de la commande *delight* :

- **premier usage** : orienter avant de briller ;
- **attente** : informer, jamais simuler ;
- **erreur** : rassurer et réparer, sans plaisanter sur l’argent ;
- **répétition** : un retour qui tient à la centième fois ;
- **jalon** : l’ampleur est permise, le blocage jamais.`,
      takeaway: 'Orienter au premier usage, informer pendant l’attente, réparer après l’erreur, rester bref à la répétition, célébrer les jalons.',
      sources: ['imp:delight', 'imp:clarify'],
    },
    {
      id: 'delight-discovery-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Dans un logiciel de facturation, laquelle de ces « découvertes » récompense vraiment la curiosité ?',
      options: [
        { id: 'shortcut', label: 'Après trois factures sélectionnées une à une, une astuce propose Maj + clic pour sélectionner une plage.', why: 'La découverte révèle une utilité réelle, au moment où elle sert.' },
        { id: 'game', label: 'Dix clics sur le logo lancent un mini-jeu caché.', why: 'Un clin d’œil sans utilité, qui ne dit rien du produit ni du métier.' },
        { id: 'hidden', label: 'L’export comptable n’est accessible que par un raccourci secret, pour récompenser les initiés.', why: 'Cacher une fonction nécessaire est interdit : la découverte ne doit jamais masquer l’indispensable.' },
        { id: 'quote', label: 'Une citation inspirante différente à chaque connexion.', why: 'De la fantaisie générique : agréable une fois, puis bruit de fond.' },
      ],
      answer: 'shortcut',
      explanation: `Impeccable définit la bonne découverte comme une **récompense de la curiosité qui révèle une vraie utilité**, sans **jamais cacher une fonctionnalité nécessaire**.

L’astuce de sélection arrive au moment où la personne fait un geste répétitif, et lui fait gagner du temps : la récompense est l’utilité elle-même. Le mini-jeu et la citation n’apportent rien ; le raccourci secret transforme une fonction indispensable en devinette.`,
      takeaway: 'Une bonne découverte révèle une utilité au moment où elle sert, sans jamais cacher une fonction nécessaire.',
      sources: ['imp:delight'],
    },
    {
      id: 'delight-overdrive-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Sur la page de réglages d’une application de gestion, quelle ambition « au-delà des conventions » est la plus juste ?',
      options: [
        { id: 'optimistic', label: 'Des enregistrements instantanés et optimistes, avec des transitions d’état fluides.', why: 'C’est l’exemple même d’impeccable : sur une page de réglages, l’extraordinaire se sent dans la réactivité.' },
        { id: 'particles', label: 'Un système de particules en arrière-plan qui suit le curseur.', why: 'Impressionnant sur un portfolio, embarrassant sur une page de réglages.' },
        { id: 'cinema', label: 'Une transition cinématographique d’une seconde et demie entre chaque onglet.', why: 'Une mise en scène qui fait attendre à chaque clic : l’inverse d’un outil qui ne fait jamais hésiter.' },
        { id: 'sound', label: 'Un son de validation à chaque bascule, activé par défaut.', why: 'Jamais de son sans accord explicite de la personne.' },
      ],
      answer: 'optimistic',
      explanation: `La commande *overdrive* pousse une interface au-delà des conventions, mais **le contexte décide de ce qui est extraordinaire**. Pour une interface fonctionnelle, l’effet « waouh » est dans la sensation : une réponse instantanée, des états qui s’enchaînent sans saccade, un outil qui n’hésite jamais.

Ses garde-fous restent valables : amélioration progressive, 60 images par seconde, aucun son sans accord, et jamais plusieurs moments extraordinaires en concurrence.`,
      takeaway: 'L’extraordinaire dépend du contexte : sur un outil, il se sent dans la réactivité, pas dans le spectacle.',
      sources: ['imp:overdrive'],
    },
    {
      id: 'delight-thesis-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quelle « thèse de délice » convient à une application de suivi de potager ?',
      options: [
        { id: 'garden', label: 'Quand une récolte est notée, sa parcelle se colore sur le plan du potager et le total de la saison se met à jour : la personne doit sentir son jardin prendre forme au fil des semaines.', why: 'Spécifique au produit et utile : aucun voisin ne pourrait la reprendre telle quelle.' },
        { id: 'confetti', label: 'Ajouter des confettis et des animations amusantes à chaque action pour rendre l’application plus fun.', why: 'Générique et répétitif : la règle de la centième fois l’écarte.' },
        { id: 'mascot', label: 'Une mascotte qui fait une blague différente sur chaque écran.', why: 'De la fantaisie interchangeable, qui finit par gêner la lecture.' },
        { id: 'sounds', label: 'Des sons de célébration à chaque tâche, pour donner de l’énergie.', why: 'Du son sans accord, et une célébration sans proportion avec l’effort.' },
      ],
      answer: 'garden',
      explanation: `Impeccable demande d’écrire une **thèse de délice** en une phrase : ce que la personne doit ressentir, et pourquoi ce sentiment appartient à ce produit. Le test : le moment est-il **assez spécifique pour qu’un produit voisin ne puisse pas le reprendre tel quel** ?

La parcelle qui se colore vient du mécanisme même de l’application (noter une récolte) et de son univers (le plan du potager). Confettis, mascotte et sons pourraient être collés sur n’importe quelle application.`,
      takeaway: 'Une thèse de délice part du mécanisme et de l’univers du produit ; si un voisin peut la copier telle quelle, elle est générique.',
      sources: ['imp:delight'],
    },
    {
      id: 'delight-guardrails-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquelles de ces idées franchissent un garde-fou du délice ?',
      options: [
        { id: 'unskippable', label: 'Une animation de succès de 3 secondes, impossible à passer, à chaque message envoyé', why: 'Obligatoire, impossible à passer et répétée : elle retarde la tâche et épuise.' },
        { id: 'silent-mode', label: 'Un son joué même quand le téléphone est en mode silencieux', why: 'Ignorer le mode silencieux est explicitement exclu.' },
        { id: 'fake-bar', label: 'Une fausse barre de progression pour faire patienter', why: 'Simuler du travail trahit la confiance.' },
        { id: 'first-invoice', label: 'Un message « Votre première facture est partie » discret, à la fin du premier envoi', why: 'Un jalon reconnu avec mesure, sans rien bloquer : c’est du bon délice.' },
        { id: 'haptic', label: 'Une légère vibration à la validation d’un paiement, qui respecte les réglages du téléphone', why: 'Un retour physique bref et respectueux des préférences : acceptable.' },
        { id: 'empty-ill', label: 'Une illustration dans l’état vide, placée après le bouton d’action principal', why: 'L’action vient d’abord, la personnalité ensuite : bon ordre.' },
      ],
      answers: ['unskippable', 'silent-mode', 'fake-bar'],
      explanation: `Les garde-fous d’impeccable : le délice ne doit jamais **retarder ou bloquer** la tâche, devenir **obligatoire ou impossible à passer**, jouer un **son sans consentement ou malgré le mode silencieux**, ni **simuler du travail**.

Les trois autres idées respectent ces limites : un jalon reconnu avec mesure, un retour physique qui suit les réglages, une illustration qui passe après l’action.`,
      takeaway: 'Le délice ne bloque pas, ne s’impose pas, ne fait pas de bruit sans accord et ne simule jamais de travail.',
      sources: ['imp:delight', 'imp:overdrive'],
    },
    {
      id: 'delight-peak-end-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'D’après la règle pic-fin, où investir en priorité dans le parcours de déclaration de sinistre d’une assurance habitation ?',
      options: [
        { id: 'ending', label: 'Dans la fin : un récapitulatif clair, le numéro de dossier, les prochaines étapes et leurs délais, dans un ton humain.', why: 'La fin pèse lourd dans le souvenir : un dossier compris et des étapes connues rassurent après un moment difficile.' },
        { id: 'intro', label: 'Dans une animation d’accueil plus spectaculaire, au tout début du parcours.', why: 'Le début pèse peu dans le souvenir, et le spectacle tombe à plat chez une personne sinistrée.' },
        { id: 'sprinkle', label: 'Dans de petites animations amusantes réparties à chaque étape du formulaire.', why: 'Saupoudrer le parcours ne crée ni pic positif ni bonne fin, et alourdit chaque étape.' },
        { id: 'joke', label: 'Dans une touche d’humour à l’étape de description des dégâts, pour détendre l’atmosphère.', why: 'Plaisanter sur une perte est exactement ce qu’impeccable exclut.' },
      ],
      answer: 'ending',
      explanation: `La **règle pic-fin** (*peak-end rule*), issue des travaux de Daniel Kahneman, dit qu’on juge une expérience surtout d’après son moment le plus intense et d’après sa fin, plus que d’après la moyenne de tous ses instants.

Dans une déclaration de sinistre, le pic est souvent négatif (le dégât lui-même) : on ne peut pas l’effacer, mais on peut soigner la fin. Un récapitulatif clair, un numéro de dossier et des étapes datées transforment le souvenir du parcours. Et comme il s’agit d’une perte, la chaleur passe par le soin, jamais par la blague.`,
      takeaway: 'Le souvenir d’un parcours tient à son pic et à sa fin : soigne la conclusion, surtout quand le moment est difficile.',
      sources: [PEAK_END, KAHNEMAN, 'imp:critique', 'imp:delight'],
    },
  ],
};

export default delight;
