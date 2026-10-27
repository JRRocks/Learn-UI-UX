import type { ModuleContent, SourceRef } from '../../engine/types';

const NNG_TUTORIALS: SourceRef = {
  label: 'Nielsen Norman Group — Onboarding Tutorials vs. Contextual Help',
  url: 'https://www.nngroup.com/articles/onboarding-tutorials/',
};
const NNG_MOBILE_ONBOARDING: SourceRef = {
  label: 'Nielsen Norman Group — Mobile-App Onboarding: An Analysis of Components and Techniques',
  url: 'https://www.nngroup.com/articles/mobile-app-onboarding/',
};
const NNG_MOBILE_TUTORIALS: SourceRef = {
  label: 'Nielsen Norman Group — Mobile Tutorials: Wasted Effort or Efficiency Boost?',
  url: 'https://www.nngroup.com/articles/mobile-tutorials/',
};
const NNG_EMPTY: SourceRef = {
  label: 'Nielsen Norman Group — Designing Empty States in Complex Applications',
  url: 'https://www.nngroup.com/articles/empty-state-interface-design/',
};
const MATERIAL_EMPTY: SourceRef = { label: 'Material Design — Empty states', url: 'https://m2.material.io/design/communication/empty-states.html' };

/* ---------- Shared mock pieces ---------- */

const EMPTY_CSS = `
.onb-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px 12px; text-align: center; }
.onb-ico { color: #8b92a1; }
.onb-link { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }
`;

const FIELD_CSS = `
.onb-f { display: flex; flex-direction: column; gap: 2px; }
.onb-f > span:first-child { font-size: 11.5px; font-weight: 600; }
.onb-f > span:last-child { display: block; min-height: 30px; padding: 5px 8px; border: 1px solid #c3c8d3; border-radius: 6px; color: #8b92a1; font-size: 13px; }
`;

const FIELD = (label: string, value = '') => `<div class="onb-f"><span>${label}</span><span>${value}</span></div>`;

const CRM_HEAD = `<div class="mk-row" style="--gap:8px"><span class="mk-input mk-grow" style="display:flex;align-items:center;gap:8px"><i data-icon="search" style="--ico:16px"></i>Lefèvre</span><span class="onb-chip">Actifs <i data-icon="x" style="--ico:12px"></i></span></div>`;

const CRM_CSS = `${EMPTY_CSS}
.onb-chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 999px; background: #e8eefc; color: #1a3a99; font-size: 13px; font-weight: 600; white-space: nowrap; }
`;

const INVOICES = `<p class="mk-h2">Factures</p>
  <div class="mk-row" style="--gap:8px"><span class="onb-anchor"><span class="mk-btn mk-btn--ghost mk-btn--s"><i data-icon="download" style="--ico:14px"></i>Exporter</span>__TIP__</span><span class="mk-btn mk-btn--s">Nouvelle facture</span></div>
  <ul class="mk-list">
    <li><span class="mk-grow">Atelier Roux</span><span class="mk-price">640,00&nbsp;€</span></li>
    <li><span class="mk-grow">Studio Lumen</span><span class="mk-price">2&#8239;400,00&nbsp;€</span></li>
    <li><span class="mk-grow">Café Merle</span><span class="mk-price">180,00&nbsp;€</span></li>
    <li><span class="mk-grow">Garage Vidal</span><span class="mk-price">1&#8239;150,00&nbsp;€</span></li>
  </ul>`;

const TASKS_CSS = `
.onb-hint { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; background: #eef3fe; color: #1a3a99; font-size: 13px; line-height: 1.35; }
`;

const onboarding: ModuleContent = {
  id: 'onboarding',
  title: 'Premier usage et états vides',
  category: 'affiner',
  summary:
    'Amener les nouveaux utilisateurs le plus vite possible au moment qui prouve la valeur du produit, concevoir des états vides qui enseignent, et doser l’aide contextuelle sans l’imposer.',
  minutes: 11,
  commands: ['onboard'],
  sources: ['imp:onboard', 'imp:clarify', 'imp:delight', NNG_TUTORIALS, NNG_MOBILE_ONBOARDING, NNG_MOBILE_TUTORIALS, NNG_EMPTY, MATERIAL_EMPTY],
  sections: [
    {
      id: 'valeur',
      title: 'Le temps jusqu’à la valeur',
      body: `Le travail de l’onboarding n’est pas d’**enseigner le produit** : c’est d’amener la personne, le plus vite possible, au moment qui prouve que le produit vaut son temps — le **moment « aha »**. Pour une application de facturation, c’est envoyer sa première facture ; pour un outil d’équipe, voir un collègue répondre.

Avant de concevoir quoi que ce soit, réponds à trois séries de questions :

1. **Le défi** : que cherchent à accomplir les gens ? Où bloquent-ils, où abandonnent-ils ? Quel moment « aha » viser ?
2. **Les utilisateurs** : débutants, experts ou les deux ? Curieux ou contraints par leur travail ? Cinq minutes ou trente devant eux ? Viennent-ils d’un concurrent ou découvrent-ils la catégorie ?
3. **Le succès** : le minimum à apprendre pour réussir, l’action clé (premier projet, première invitation) et sa mesure (taux d’achèvement, temps jusqu’à la valeur).

Enseigne les **20 %** qui apportent 80 % de la valeur, place les concepts importants en premier et garde les fonctions avancées pour une découverte en contexte.`,
    },
    {
      id: 'principes',
      title: 'Montrer, laisser passer, ne pas infantiliser',
      body: `- **Montre plutôt que dis** : des exemples qui fonctionnent, de vraies fonctions plutôt qu’un mode tutoriel séparé, une chose à la fois.
- **Rends-le facultatif** quand c’est possible : un « Passer » ou « J’explore par moi-même » bien visible, et jamais d’accès au produit bloqué.
- **Le contexte plutôt que la cérémonie** : enseigne une fonction au moment où l’on en a besoin, pas en préambule. Les états vides et les infobulles au point d’usage sont tes meilleurs outils.
- **Respecte l’intelligence** des gens : va à l’essentiel, n’explique pas l’évident, suppose qu’ils connaissent les conventions courantes.

La recherche va dans le même sens. Nielsen Norman Group observe que les tutoriels en « jeu de cartes » du premier lancement (une suite d’écrans à faire défiler) sont souvent passés, vite oubliés, et n’améliorent pas la réussite des tâches. Les gens veulent utiliser le produit tout de suite, même si un peu d’apprentissage préalable leur ferait gagner du temps à terme : c’est le **paradoxe de l’utilisateur actif**. L’aide doit donc venir à eux, dans le produit : celle qui arrive au moment où elle sert (*pull revelation*) marche mieux que celle qu’on pousse hors contexte (*push revelation*).`,
      examples: [
        {
          title: 'Montrer plutôt que dire',
          bad: {
            alt: 'Application de tâches sur téléphone qui s’ouvre sur un écran « Comment ça marche » : quatre consignes numérotées à lire et un bouton J’ai compris.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2">Comment ça marche</p>
  <ol class="mk-stack" style="--gap:8px;font-size:13px">
    <li>Appuyez sur le bouton + en bas de l’écran pour créer une tâche.</li>
    <li>Saisissez un titre, puis choisissez une échéance dans le calendrier.</li>
    <li>Faites glisser une tâche vers la gauche pour la reporter à demain.</li>
    <li>Cochez la case pour marquer la tâche comme terminée.</li>
  </ol>
  <span class="mk-btn mk-btn--block">J’ai compris</span>
</div>`,
          },
          badNote: 'Quatre consignes à mémoriser avant d’avoir touché une seule tâche.',
          good: {
            alt: 'Même application ouverte sur trois tâches d’exemple, avec une indication : « Tâches d’exemple : cochez-en une pour voir ce qui se passe » et un lien Passer.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h2">Aujourd’hui</p>
  <ul class="mk-list">
    <li><span class="mk-check"></span><span class="mk-grow">Rappeler le plombier</span><span class="mk-small mk-muted">10&nbsp;h</span></li>
    <li><span class="mk-check"></span><span class="mk-grow">Envoyer le devis à Mme Roux</span></li>
    <li><span class="mk-check"></span><span class="mk-grow">Acheter du café</span></li>
  </ul>
  <div class="onb-hint"><i data-icon="info" style="--ico:16px"></i><span class="mk-grow">Tâches d’exemple&nbsp;: cochez-en une pour voir ce qui se passe.</span><span class="mk-btn mk-btn--text mk-btn--s">Passer</span></div>
</div>`,
            css: TASKS_CSS,
          },
          goodNote: 'De vraies tâches d’exemple et une seule invitation à agir : on apprend en faisant, et on peut passer.',
        },
      ],
    },
    {
      id: 'premier-parcours',
      title: 'Accueil, compte, concepts, première réussite',
      body: `Un parcours d’accueil se justifie dans peu de cas : le produit a besoin d’informations pour démarrer (créer un compte, vérifier une identité), il s’adapte fortement au contexte de la personne (un objectif, un niveau), ou ses fonctions clés sortent vraiment des conventions. Sinon, laisse les gens apprendre en utilisant. Quand il est justifié, chaque étape a un rôle précis :

- **Écran d’accueil** : une proposition de valeur claire (qu’est-ce que c’est ?), ce qu’on va accomplir, une estimation de temps honnête, et la possibilité de passer.
- **Création de compte** : le **minimum** d’informations (le reste plus tard), la raison d’une demande quand elle n’est pas évidente (pourquoi un téléphone, une date de naissance ?), des valeurs par défaut intelligentes, une connexion via un compte existant quand c’est pertinent.
- **Concepts clés** : **1 à 3**, pas plus, en langage simple, avec des exemples, de préférence à faire plutôt qu’à lire, et un indicateur de progression (« Étape 1 sur 3 »).
- **Première réussite** : guider vers une vraie tâche avec des modèles ou des exemples préremplis, célébrer sans en faire trop, et indiquer clairement la suite.

Dose la célébration selon l’effort et l’enjeu : une première facture envoyée est un jalon qui mérite une confirmation chaleureuse et l’annonce de la suite ; un enregistrement courant appelle une simple confirmation, nette. Et dans un premier usage, rends la prochaine action claire avant d’ajouter de la personnalité.`,
      examples: [
        {
          title: 'Une création de compte minimale',
          bad: {
            alt: 'Formulaire de création de compte sur téléphone avec huit champs : prénom, nom, e-mail, téléphone, date de naissance, entreprise, nombre de salariés et source de découverte.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:8px">
  <p class="mk-h2">Créer votre compte</p>
  ${FIELD('Prénom')}${FIELD('Nom')}${FIELD('E-mail')}${FIELD('Téléphone')}${FIELD('Date de naissance', 'JJ/MM/AAAA')}${FIELD('Entreprise')}${FIELD('Nombre de salariés', 'Choisir…')}${FIELD('Comment nous avez-vous connus&#8239;?', 'Choisir…')}
  <span class="mk-btn mk-btn--block">Créer mon compte</span>
</div>`,
            css: FIELD_CSS,
          },
          badNote: 'Huit questions avant d’avoir vu le produit, dont plusieurs inutiles maintenant : autant de raisons d’abandonner.',
          good: {
            alt: 'Formulaire de création de compte sur téléphone avec deux champs, e-mail et mot de passe, une aide sur la longueur du mot de passe et une note expliquant que le nom de l’activité sera demandé plus tard.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2">Créer votre compte</p>
  <div class="mk-field"><span class="mk-label">E-mail</span><span class="mk-input">nadia.benali@studio-plume.fr</span></div>
  <div class="mk-field"><span class="mk-label">Mot de passe</span><span class="mk-input">••••••••••</span><span class="mk-help">8 caractères minimum</span></div>
  <span class="mk-btn mk-btn--block">Créer mon compte</span>
  <p class="mk-small mk-muted">Vous ajouterez le nom de votre activité au moment de créer votre page de réservation.</p>
</div>`,
          },
          goodNote: 'Le strict nécessaire, une aide au bon endroit, et la promesse honnête de la suite.',
        },
      ],
    },
    {
      id: 'etats-vides',
      title: 'Un état vide est une leçon',
      body: `Un écran vide est souvent le premier contact avec une fonction : c’est une occasion d’onboarding, pas un blanc à laisser. Un bon état vide contient :

- **Ce qui apparaîtra ici** : « Vos projets récents s’afficheront ici. »
- **Pourquoi c’est utile** : « Un projet regroupe les tâches, les fichiers et les échanges d’une même mission. »
- **Comment commencer** : une action directe — « Créer un projet » — ou un modèle.
- **Un repère visuel** : une icône ou une illustration, plutôt que du texte seul sur une page blanche.
- **Une aide contextuelle** : « Besoin d’un coup de main ? Voir le tutoriel de 2 minutes. »

Un état vide dit aussi la **vérité sur le système** : la page a-t-elle fini de charger ? Y a-t-il une erreur ? Nielsen Norman Group décrit les dégâts d’un « Aucun enregistrement » affiché pendant le chargement : les gens pressés repartent avant que les données arrivent.`,
      examples: [
        {
          title: 'Aucun projet… et ensuite ?',
          bad: {
            alt: 'Page Projets vide qui n’affiche que le texte gris « Aucun projet ».',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2">Projets</p><span class="mk-btn mk-btn--ghost mk-btn--s" style="padding:0 8px"><i data-icon="plus" style="--ico:16px"></i></span></div>
  <p class="mk-muted mk-center" style="padding:56px 0">Aucun projet.</p>
</div>`,
          },
          badNote: 'Le vide constate sans rien apprendre : à quoi sert la page, et par où commencer ?',
          good: {
            alt: 'Page Projets vide avec une icône de dossier, le titre « Vos projets s’afficheront ici », une phrase d’explication, les boutons Créer un projet et Partir d’un modèle, et un lien vers un tutoriel de 2 minutes.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:6px">
  <p class="mk-h2">Projets</p>
  <div class="onb-empty">
    <i data-icon="folder" class="onb-ico" style="--ico:32px"></i>
    <p class="mk-h3">Vos projets s’afficheront ici</p>
    <p class="mk-small mk-muted" style="max-width:36ch">Un projet regroupe les tâches, les fichiers et les échanges d’une même mission.</p>
    <div class="mk-row mk-wrap" style="--gap:8px;justify-content:center"><span class="mk-btn mk-btn--s">Créer un projet</span><span class="mk-btn mk-btn--ghost mk-btn--s">Partir d’un modèle</span></div>
    <p class="mk-small"><span class="onb-link">Voir le tutoriel de 2 minutes</span></p>
  </div>
</div>`,
            css: EMPTY_CSS,
          },
          goodNote: 'Ce qui apparaîtra, pourquoi c’est utile, comment commencer — avec un modèle et une aide pour aller plus loin.',
        },
      ],
    },
    {
      id: 'types-vides',
      title: 'Cinq vides, cinq réponses',
      body: `Tous les écrans vides ne racontent pas la même histoire. Distingue :

- **Premier usage** — la fonction n’a jamais servi : mets en avant la valeur, propose un modèle.
- **Vidé par l’utilisateur** — la personne a tout supprimé ou tout terminé volontairement : touche légère, message bref, moyen simple de recréer. Pas de grand discours de bienvenue.
- **Aucun résultat** — une recherche ou un filtre ne renvoie rien : rappelle la requête, propose une autre recherche et l’effacement des filtres.
- **Pas de permission** — le contenu existe mais n’est pas accessible : explique pourquoi et comment obtenir l’accès. Ne prétends pas que c’est vide.
- **Erreur** — le chargement a échoué : explique ce qui s’est passé et propose de réessayer.`,
      examples: [
        {
          title: 'Vidé par l’utilisateur',
          bad: {
            alt: 'Liste de tâches entièrement terminée, avec en bas une section repliée « Terminées aujourd’hui · 12 », qui affiche pourtant le grand message de bienvenue du premier usage : une illustration, un long texte et un bouton Créer ma première tâche.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h2">Aujourd’hui</p>
  <div class="mk-img" style="--ratio:16 / 9"></div>
  <p class="mk-h3 mk-center">Bienvenue dans Tâches&#8239;!</p>
  <p class="mk-small mk-muted mk-center">Les tâches vous aident à organiser votre journée. Commencez par créer votre première tâche, ajoutez-lui une échéance, puis cochez-la une fois terminée.</p>
  <span class="mk-btn mk-btn--block">Créer ma première tâche</span>
  <div class="onb-done"><span>Terminées aujourd’hui · 12</span><i data-icon="chevron-down" style="--ico:16px"></i></div>
</div>`,
            css: `.onb-done { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-top: 10px; border-top: 1px solid #e3e6ec; font-size: 13px; font-weight: 600; color: #5a6172; }`,
          },
          badNote: 'Douze tâches terminées aujourd’hui, et on ressert à la personne la présentation du premier jour.',
          good: {
            alt: 'Même liste de tâches terminée : un message bref « Tout est fait pour aujourd’hui », le nombre de tâches terminées et un petit bouton Ajouter une tâche.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h2">Aujourd’hui</p>
  <div class="onb-empty" style="padding:36px 12px">
    <i data-icon="circle-check" class="onb-ico" style="--ico:28px"></i>
    <p class="mk-h3">Tout est fait pour aujourd’hui</p>
    <p class="mk-small mk-muted">12 tâches terminées</p>
    <span class="mk-btn mk-btn--ghost mk-btn--s">Ajouter une tâche</span>
  </div>
</div>`,
            css: EMPTY_CSS,
          },
          goodNote: 'Une touche légère : le résultat, et un moyen simple de continuer.',
        },
      ],
    },
    {
      id: 'aide-contextuelle',
      title: 'Infobulles, visites guidées, découverte progressive',
      body: `**Infobulles contextuelles** : elles apparaissent au moment pertinent (la première fois qu’on voit la fonction), pointent directement l’élément concerné, donnent une explication brève et son bénéfice, se ferment facilement — avec « Ne plus afficher » — et peuvent offrir un lien « En savoir plus ».

**Annonces de nouveautés** : ce qui change et pourquoi c’est utile, à essayer tout de suite, et refermables.

**Découverte progressive** : enseigne une fonction quand on la rencontre ; un badge « Nouveau » sur ce qui n’a pas encore servi ; la complexité se débloque peu à peu.

**Visites guidées** : réservées aux interfaces complexes, aux changements importants ou aux outils métier. Mets en lumière l’élément (le reste assombri), garde **3 à 7 étapes** au maximum, laisse avancer librement, propose « Passer la visite » et permets de la **rejouer** depuis le menu d’aide. Préfère l’interaction à la lecture passive (cliquer de vrais boutons), le **parcours** aux fonctions (« Créez un projet » plutôt que « Voici le bouton Projet »), et fournis des **données d’exemple** pour que les actions marchent.

**Tutoriels interactifs** : quand il faut vraiment s’exercer, parce que les concepts sont complexes ou inhabituels, ou que l’enjeu est élevé et qu’il vaut mieux se tromper sans risque. Un bac à sable avec des données d’exemple, un objectif clair (« Créez un graphique des ventes par région »), un guidage pas à pas, une validation, et un moment de « diplôme ».

**Aide dans le produit** : une icône \`?\` près des fonctions complexes, des liens « En savoir plus », les raccourcis clavier affichés (⌘K sur le champ de recherche).

**Au clavier et au lecteur d’écran** : une visite ou une annonce reste utilisable sans souris. Le focus (l’élément qui reçoit les frappes du clavier) va dans la bulle, Échap la ferme, puis le focus revient à l’élément d’origine ; dans une fenêtre modale, il reste piégé tant qu’elle est ouverte. Et une infobulle n’est jamais la seule source d’une information indispensable : sur un écran tactile, rien ne la déclenche au survol.`,
    },
    {
      id: 'memoire',
      title: 'Ne montrer qu’une fois, et mesurer',
      body: `- **Mémorise** ce qui a été vu, terminé ou refermé — un simple indicateur stocké en local (\`localStorage\`), ou sur le compte si l’onboarding doit suivre la personne d’un appareil à l’autre — et respecte ces choix. Une infobulle refermée ne revient pas ; l’accueil initial ne se remontre pas à quelqu’un qui revient.
- **Mesure** : taux d’achèvement, points d’abandon, **temps jusqu’à la valeur**. Beaucoup de gens passent l’onboarding ? Il est peut-être trop long ou pas assez utile. Peu le terminent ? Simplifie.
- **Teste avec de vraies personnes** : comprennent-elles après coup ? Font-elles l’action attendue ?

**À éviter** : un long parcours imposé avant d’accéder au produit, les explications évidentes, la même infobulle répétée, toute l’interface bloquée pendant une visite, un mode tutoriel séparé du vrai produit, tout dire d’emblée, un « Passer » caché, et l’accueil initial remontré aux habitués.`,
    },
  ],
  rules: [
    { id: 'job', front: 'Quel est le vrai travail de l’onboarding ?', back: 'Amener la personne le plus vite possible au moment qui prouve que le produit vaut son temps — le moment « aha » —, pas tout lui apprendre.' },
    { id: 'skip', front: 'L’onboarding doit-il être obligatoire ?', back: 'Non, autant que possible : un « Passer » bien visible, et jamais d’accès au produit bloqué.' },
    { id: 'show', front: 'Montrer ou dire ?', back: 'Montrer : de vrais exemples et de vraies fonctions, une chose à la fois, plutôt qu’un tutoriel à lire.' },
    { id: 'concepts', front: 'Combien de concepts présenter au premier lancement ?', back: '1 à 3, avec un indicateur de progression ; le reste se découvre en contexte.' },
    { id: 'account', front: 'Que demander à la création de compte ?', back: 'Le minimum ; le reste plus tard. Explique pourquoi tu demandes une information quand ce n’est pas évident (téléphone, date de naissance…).' },
    { id: 'first-success', front: 'Comment provoquer une première réussite ?', back: 'Guider vers une vraie tâche avec des modèles ou exemples préremplis, célébrer à la mesure de l’enjeu (un jalon, pas chaque clic) et indiquer la suite.' },
    { id: 'empty', front: 'Que doit contenir un état vide ?', back: 'Ce qui apparaîtra ici, pourquoi c’est utile, comment commencer (action ou modèle), un repère visuel et une aide contextuelle.' },
    { id: 'empty-types', front: 'Quels sont les cinq types d’états vides ?', back: 'Premier usage, vidé par l’utilisateur, aucun résultat, pas de permission, erreur de chargement.' },
    { id: 'cleared', front: 'Une personne vient de tout supprimer : quel état vide ?', back: 'Une touche légère : un message bref et un moyen simple de recréer, pas le discours du premier usage.' },
    { id: 'no-results', front: 'Une recherche ne renvoie rien : que proposer ?', back: 'Rappeler la requête et les filtres, suggérer une autre recherche et l’effacement des filtres.' },
    { id: 'tour', front: 'Combien d’étapes pour une visite guidée ?', back: '3 à 7 au maximum, calées sur un parcours, avec « Passer la visite », navigation libre et possibilité de la rejouer.' },
    { id: 'tooltip', front: 'Quand afficher une infobulle d’aide ?', back: 'Au moment pertinent — la première fois qu’on voit la fonction —, pointée sur l’élément, brève, refermable avec « Ne plus afficher ».' },
    { id: 'once', front: 'Comment éviter de remontrer l’onboarding ?', back: 'Mémoriser ce qui a été vu ou refermé et respecter ces choix ; l’aide reste retrouvable, jamais réimposée.' },
    { id: 'skip-rate', front: 'Beaucoup de gens passent ton onboarding : que conclure ?', back: 'Il est peut-être trop long ou pas assez utile. Et si peu le terminent, simplifie.' },
  ],
  exercises: [
    {
      id: 'onboarding-empty-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle page « Équipe » accueille le mieux une personne qui vient de créer son compte ?',
      options: [
        {
          id: 'bare',
          visual: {
            alt: 'Page Équipe avec les en-têtes de colonnes Nom, Rôle et Statut, et en dessous le seul texte gris « Aucune donnée ».',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2">Équipe</p>
  <div class="onb-th"><span>Nom</span><span>Rôle</span><span>Statut</span></div>
  <p class="mk-muted mk-center" style="padding:48px 0">Aucune donnée</p>
</div>`,
            css: `.onb-th { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; padding-bottom: 8px; border-bottom: 1px solid #e3e6ec; font-size: 12px; font-weight: 600; color: #5a6172; }`,
          },
          why: 'Le vide constate sans expliquer : on ne sait ni à quoi sert la page ni comment la remplir.',
        },
        {
          id: 'teaching',
          visual: {
            alt: 'Page Équipe avec une icône, le titre « Les membres de votre équipe apparaîtront ici », une phrase sur leur rôle, les boutons Inviter des collègues et Importer une liste, et un lien sur les rôles.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:6px">
  <p class="mk-h2">Équipe</p>
  <div class="onb-empty">
    <i data-icon="users" class="onb-ico" style="--ico:32px"></i>
    <p class="mk-h3">Les membres de votre équipe apparaîtront ici</p>
    <p class="mk-small mk-muted" style="max-width:38ch">Ils pourront suivre les dossiers et répondre aux clients avec vous.</p>
    <div class="mk-row mk-wrap" style="--gap:8px;justify-content:center"><span class="mk-btn mk-btn--s">Inviter des collègues</span><span class="mk-btn mk-btn--ghost mk-btn--s">Importer une liste</span></div>
    <p class="mk-small"><span class="onb-link">Comment fonctionnent les rôles&#8239;?</span></p>
  </div>
</div>`,
            css: EMPTY_CSS,
          },
          why: 'Il dit ce qui apparaîtra ici, pourquoi c’est utile et comment commencer — avec une seconde voie et une aide pour qui veut en savoir plus.',
        },
      ],
      answer: 'teaching',
      explanation: `Pour une personne qui découvre le produit, l’état vide **est** l’onboarding de cette fonction. « Aucune donnée » constate un fait sans rien apprendre, et ressemble même à une page qui n’a pas fini de charger.

Un état vide complet suit la structure d’impeccable : **ce qui apparaîtra ici**, **pourquoi c’est utile**, **comment commencer** (une action directe, ici doublée d’un import), un **repère visuel** et une **aide contextuelle** pour qui veut aller plus loin.`,
      takeaway: 'Un état vide de premier usage dit ce qui apparaîtra ici, pourquoi c’est utile et comment commencer.',
      sources: ['imp:onboard', NNG_EMPTY],
    },
    {
      id: 'onboarding-first-run-duel',
      type: 'choice',
      difficulty: 1,
      context: 'Application mobile de suivi de budget, juste après l’installation.',
      prompt: 'Quel premier lancement amène le plus vite à la valeur ?',
      options: [
        {
          id: 'carousel',
          visual: {
            alt: 'Premier écran d’un carrousel de présentation en six étapes : illustration, « Bienvenue ! », une liste de fonctions et un bouton Suivant, sans moyen de passer.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-small mk-muted mk-center">Étape 1 sur 6</p>
  <div class="mk-img" style="--ratio:16 / 10"></div>
  <p class="mk-h2 mk-center">Bienvenue&#8239;!</p>
  <p class="mk-small mk-center mk-muted">Suivez vos dépenses, créez des budgets, analysez vos tendances, partagez vos comptes en famille et exportez vos données.</p>
  <div class="onb-dots"><b></b><span></span><span></span><span></span><span></span><span></span></div>
  <span class="mk-btn mk-btn--block">Suivant</span>
</div>`,
            css: `.onb-dots { display: flex; justify-content: center; gap: 6px; }
.onb-dots > * { width: 7px; height: 7px; border-radius: 50%; background: #c3c8d3; }
.onb-dots > b { background: #1f4fd8; }`,
          },
          why: 'Six écrans à lire avant de toucher l’application, sans moyen de passer : on en retiendra peu, et on n’a encore rien accompli.',
        },
        {
          id: 'in-product',
          visual: {
            alt: 'Écran du budget d’octobre avec des catégories d’exemple préremplies et une bulle d’aide pointant le bouton Ajouter une dépense, avec un lien Passer.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="mk-row mk-between"><p class="mk-h2">Octobre</p><span class="mk-badge">Exemple</span></div>
  <div class="mk-stack" style="--gap:4px"><div class="mk-row mk-between mk-small"><span>Courses</span><span>212 / 300&nbsp;€</span></div><div class="onb-bar"><span style="width:70%"></span></div></div>
  <div class="mk-stack" style="--gap:4px"><div class="mk-row mk-between mk-small"><span>Loisirs</span><span>64 / 120&nbsp;€</span></div><div class="onb-bar"><span style="width:53%"></span></div></div>
  <div class="mk-stack" style="--gap:4px"><div class="mk-row mk-between mk-small"><span>Transports</span><span>38 / 90&nbsp;€</span></div><div class="onb-bar"><span style="width:42%"></span></div></div>
  <div class="onb-tip"><span class="mk-grow">Ajoutez votre première dépense&nbsp;: 10&nbsp;secondes suffisent.</span><span class="onb-tip-skip">Passer</span></div>
  <span class="mk-btn mk-btn--block"><i data-icon="plus" style="--ico:16px"></i>Ajouter une dépense</span>
</div>`,
            css: `.onb-bar { height: 8px; border-radius: 4px; background: #e6e9ef; }
.onb-bar > span { display: block; height: 100%; border-radius: 4px; background: #1f4fd8; }
.onb-tip { position: relative; display: flex; align-items: center; gap: 8px; margin-top: 6px; padding: 10px 12px; border-radius: 10px; background: #1d2230; color: #fff; font-size: 13px; line-height: 1.35; }
.onb-tip::after { content: ""; position: absolute; bottom: -6px; left: 50%; margin-left: -6px; border: 6px solid transparent; border-bottom: 0; border-top-color: #1d2230; }
.onb-tip-skip { color: #c7d4ff; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }`,
          },
          why: 'On arrive dans le vrai produit, avec un budget d’exemple et une seule indication au bon endroit — qu’on peut passer.',
        },
      ],
      answer: 'in-product',
      explanation: `Le **temps jusqu’à la valeur** est la mesure qui compte. Un carrousel de présentation **raconte** le produit ; il ne le fait pas utiliser. Nielsen Norman Group a montré que ces tutoriels en « jeu de cartes » sont souvent passés, vite oubliés, et n’améliorent pas la réussite des tâches.

La version recommandée applique les principes d’impeccable : **montrer plutôt que dire** (un vrai budget d’exemple), **le contexte plutôt que la cérémonie** (une indication à l’endroit où l’on agit) et **une sortie visible**.`,
      takeaway: 'Amène les gens dans le vrai produit avec un exemple prérempli et une aide au point d’usage, plutôt qu’un carrousel à lire.',
      sources: ['imp:onboard', NNG_TUTORIALS, NNG_MOBILE_ONBOARDING],
    },
    {
      id: 'onboarding-no-results-duel',
      type: 'choice',
      difficulty: 2,
      context: 'Une commerciale cherche « Lefèvre » dans un CRM qui contient 1 240 clients, avec le filtre « Actifs » appliqué. Aucun client ne correspond.',
      prompt: 'Quel état vide est le plus utile ?',
      options: [
        {
          id: 'first-use',
          visual: {
            alt: 'Recherche « Lefèvre » avec le filtre Actifs ; en dessous, un message de bienvenue « Ajoutez votre premier client » et un bouton Ajouter un client.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  ${CRM_HEAD}
  <div class="onb-empty">
    <i data-icon="users" class="onb-ico" style="--ico:32px"></i>
    <p class="mk-h3">Ajoutez votre premier client</p>
    <p class="mk-small mk-muted" style="max-width:38ch">Les fiches clients centralisent vos contacts, vos devis et vos factures.</p>
    <span class="mk-btn mk-btn--s">Ajouter un client</span>
  </div>
</div>`,
            css: CRM_CSS,
          },
          why: 'Un message de premier usage alors que la base contient 1 240 clients : il laisse croire qu’elle est vide et pousse à créer un doublon.',
        },
        {
          id: 'no-results',
          visual: {
            alt: 'Même recherche ; le message indique qu’aucun client actif ne correspond à « Lefèvre », suggère l’orthographe voisine « Lefebvre », qui donne 2 clients actifs, et propose d’effacer le filtre Actifs.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  ${CRM_HEAD}
  <div class="onb-empty">
    <i data-icon="search" class="onb-ico" style="--ico:28px"></i>
    <p class="mk-h3">Aucun client actif ne correspond à «&#8239;Lefèvre&#8239;»</p>
    <p class="mk-small mk-muted" style="max-width:40ch">Vérifiez l’orthographe, ou élargissez la recherche à tous vos clients.</p>
    <p class="mk-small"><span class="onb-link">Essayer «&#8239;Lefebvre&#8239;»</span> <span class="mk-muted">· 2 clients actifs</span></p>
    <span class="mk-btn mk-btn--ghost mk-btn--s">Effacer le filtre «&#8239;Actifs&#8239;»</span>
  </div>
</div>`,
            css: CRM_CSS,
          },
          why: 'Il rappelle la requête et le filtre, et propose les deux issues utiles : corriger la recherche ou élargir le filtre.',
        },
      ],
      answer: 'no-results',
      explanation: `Un « aucun résultat » n’est pas un **premier usage**. Les confondre est trompeur : la personne croit que la base est vide et risque de créer un doublon.

Impeccable distingue cinq types d’états vides. Pour l’**absence de résultat**, on rappelle la requête et les filtres actifs, on suggère une autre recherche (ici, une orthographe voisine qui donne des résultats) et on propose d’**effacer les filtres** — souvent la vraie cause du vide.`,
      takeaway: 'Aucun résultat : rappelle la requête et les filtres, propose une autre recherche et l’effacement des filtres.',
      sources: ['imp:onboard', 'imp:clarify', NNG_EMPTY],
    },
    {
      id: 'onboarding-tooltip-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Une nouvelle fonction d’export vient d’arriver. Quelle façon de l’annoncer est la mieux conçue ?',
      options: [
        {
          id: 'modal',
          visual: {
            alt: 'Liste de factures recouverte par une fenêtre « Quoi de neuf en octobre » qui énumère cinq nouveautés, avec un seul bouton Fermer.',
            frame: 'browser',
            html: `<div class="onb-scene"><div class="mk-pad mk-stack" style="--gap:10px">${INVOICES.replace('__TIP__', '')}</div>
  <div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:8px">
    <p class="mk-h3">Quoi de neuf en octobre</p>
    <ul class="mk-small" style="display:flex;flex-direction:column;gap:3px"><li>Export des factures en CSV</li><li>Relances automatiques</li><li>Thème sombre</li><li>Douze nouveaux modèles</li><li>Paiement en trois fois</li></ul>
    <span class="mk-btn mk-btn--s" style="align-self:flex-end">Fermer</span>
  </div></div>
</div>`,
            css: `.onb-scene { position: relative; min-height: 230px; }
.onb-anchor { position: relative; }`,
          },
          why: 'Une fenêtre qui interrompt la tâche, annonce cinq choses à la fois loin de l’endroit où elles servent — et risque d’être fermée sans être lue.',
        },
        {
          id: 'tooltip',
          visual: {
            alt: 'Même liste de factures ; une petite bulle pointe le bouton Exporter : badge Nouveau, « Exportez vos factures en CSV pour votre comptable », bouton Essayer et lien Ne plus afficher.',
            frame: 'browser',
            html: `<div class="onb-scene"><div class="mk-pad mk-stack" style="--gap:10px">${INVOICES.replace(
              '__TIP__',
              `<span class="onb-pop"><span class="mk-row mk-between"><span class="onb-new">Nouveau</span><i data-icon="x" style="--ico:14px"></i></span><span>Exportez vos factures en CSV pour votre comptable.</span><span class="mk-row mk-between"><span class="onb-link" style="font-size:12px">Ne plus afficher</span><span class="mk-btn mk-btn--s">Essayer</span></span></span>`,
            )}</div></div>`,
            css: `.onb-scene { position: relative; min-height: 230px; }
.onb-anchor { position: relative; }
.onb-pop { position: absolute; z-index: 2; top: calc(100% + 10px); left: 0; width: 236px; display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 12px; background: #fff; border: 1px solid #d5d9e2; box-shadow: 0 12px 30px rgb(15 20 35 / 0.18); font-size: 13px; line-height: 1.4; white-space: normal; }
.onb-pop::before { content: ""; position: absolute; top: -6px; left: 30px; width: 10px; height: 10px; background: #fff; border-top: 1px solid #d5d9e2; border-left: 1px solid #d5d9e2; transform: rotate(45deg); }
.onb-new { padding: 1px 7px; border-radius: 999px; background: #e8eefc; color: #1a3a99; font-size: 11px; font-weight: 700; }
.onb-link { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }`,
          },
          why: 'Brève, pointée sur le bouton concerné, avec le bénéfice, un essai immédiat et la possibilité de ne plus la voir.',
        },
      ],
      answer: 'tooltip',
      explanation: `Une annonce efficace suit les règles de l’infobulle contextuelle : elle **pointe l’élément** concerné, apparaît au **moment pertinent**, dit le **bénéfice** en une phrase, laisse **essayer tout de suite** et se **referme** facilement — avec « Ne plus afficher ».

La fenêtre « Quoi de neuf » au démarrage est une révélation poussée (*push revelation*) : elle interrompt la tâche, présente l’information hors contexte, et beaucoup de gens la ferment sans la lire.`,
      takeaway: 'Annonce une nouveauté là où elle sert : une infobulle brève, pointée, avec le bénéfice, un essai immédiat et « Ne plus afficher ».',
      sources: ['imp:onboard', NNG_TUTORIALS],
    },
    {
      id: 'onboarding-permission-duel',
      type: 'choice',
      difficulty: 3,
      context: 'Une collaboratrice ouvre le dossier partagé « Budget 2027 », réservé à l’équipe Finance.',
      prompt: 'Quel écran est le plus utile ?',
      options: [
        {
          id: 'fake-empty',
          visual: {
            alt: 'Dossier Budget 2027 qui affiche « Ce dossier est vide » et un bouton Ajouter un fichier.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:6px">
  <p class="mk-small mk-muted">Dossiers partagés › Budget 2027</p>
  <div class="onb-empty">
    <i data-icon="folder" class="onb-ico" style="--ico:32px"></i>
    <p class="mk-h3">Ce dossier est vide</p>
    <p class="mk-small mk-muted">Déposez des fichiers ici pour les partager.</p>
    <span class="mk-btn mk-btn--s"><i data-icon="upload" style="--ico:14px"></i>Ajouter un fichier</span>
  </div>
</div>`,
            css: EMPTY_CSS,
          },
          why: 'Il affirme que le dossier est vide alors qu’il est seulement inaccessible — et invite même à y déposer des fichiers. État trompeur.',
        },
        {
          id: 'denied',
          visual: {
            alt: 'Dossier Budget 2027 qui affiche « Vous n’avez pas accès à ce dossier », explique qu’il est réservé à l’équipe Finance et que Marc Dupuis peut donner l’accès, avec un bouton Demander l’accès.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:6px">
  <p class="mk-small mk-muted">Dossiers partagés › Budget 2027</p>
  <div class="onb-empty">
    <i data-icon="lock" class="onb-ico" style="--ico:30px"></i>
    <p class="mk-h3">Vous n’avez pas accès à ce dossier</p>
    <p class="mk-small mk-muted" style="max-width:40ch">Il est réservé à l’équipe Finance. Son propriétaire, Marc Dupuis, peut vous donner l’accès.</p>
    <span class="mk-btn mk-btn--s">Demander l’accès</span>
    <p class="mk-small"><span class="onb-link">Retour à mes dossiers</span></p>
  </div>
</div>`,
            css: EMPTY_CSS,
          },
          why: 'Il dit la vérité (pas d’accès), pourquoi, qui peut aider, et propose l’action pour obtenir l’accès.',
        },
      ],
      answer: 'denied',
      explanation: `« Pas de permission » est l’un des cinq types d’états vides, et il est tentant de le maquiller en simple vide. Or un vide **trompeur** est pire qu’un refus clair : la personne conclut que le contenu n’existe pas, le recrée ailleurs, ou y dépose des fichiers qu’elle ne pourra plus retrouver.

Impeccable demande d’**expliquer pourquoi** l’accès manque et **comment l’obtenir**. Nommer l’équipe ou le propriétaire et proposer « Demander l’accès » transforme une impasse en démarche.`,
      takeaway: 'Pas de permission : dis-le, explique pourquoi et comment obtenir l’accès. Ne déguise jamais un refus en vide.',
      sources: ['imp:onboard', 'imp:clarify'],
    },
    {
      id: 'onboarding-welcome-hotspot',
      type: 'hotspot',
      difficulty: 1,
      prompt: 'Trouve les trois problèmes de cet écran d’accueil.',
      visual: {
        alt: 'Écran d’accueil d’une application de budget : « Étape 1 sur 9 », une illustration, le titre Bienvenue sur Pécule, une phrase de présentation, une durée de configuration de 2 minutes, un bouton Commencer et un minuscule lien « passer ».',
        frame: 'phone',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-small mk-muted" data-hotspot="steps" style="align-self:center">Étape 1 sur 9</p>
  <div class="mk-img" style="--ratio:16 / 9"></div>
  <p class="mk-h1 mk-center" data-hotspot="title" style="align-self:center">Bienvenue sur Pécule</p>
  <p class="mk-center mk-muted" data-hotspot="pitch">La plateforme nouvelle génération qui révolutionne votre rapport à l’argent.</p>
  <p class="mk-small mk-row" data-hotspot="time" style="--gap:6px;align-self:center"><i data-icon="clock" style="--ico:14px"></i>Configuration&nbsp;: 2 minutes</p>
  <span class="mk-btn mk-btn--block" data-hotspot="cta">Commencer</span>
  <span class="onb-skip" data-hotspot="skip">passer</span>
</div>`,
        css: `.onb-skip { align-self: center; font-size: 10px; color: #c9cdd5; }`,
      },
      hotspots: [
        {
          id: 'steps',
          label: 'Neuf étapes annoncées',
          correct: true,
          why: 'Neuf étapes avant de pouvoir utiliser l’application : un long parcours préalable, qu’impeccable range parmi les erreurs à éviter. Présente 1 à 3 concepts, le reste en contexte.',
        },
        {
          id: 'pitch',
          label: 'Proposition de valeur creuse',
          correct: true,
          why: '« Nouvelle génération », « révolutionne » : on ne sait toujours pas ce que fait l’application. L’accueil doit dire clairement ce qu’est le produit.',
        },
        {
          id: 'skip',
          label: '« Passer » presque invisible',
          correct: true,
          why: 'Minuscule et pâle : le lien existe mais se cache. Impeccable demande une sortie visible.',
        },
        { id: 'title', label: 'Titre de bienvenue', correct: false, why: 'Court et clair : rien à redire.' },
        { id: 'time', label: 'Durée annoncée', correct: false, why: 'Une estimation honnête de l’effort est recommandée sur l’écran d’accueil.' },
        { id: 'cta', label: 'Bouton Commencer', correct: false, why: 'Une action principale nette.' },
      ],
      explanation: `L’écran d’accueil a quatre missions selon impeccable : une **proposition de valeur claire**, ce qu’on va accomplir, une **estimation de temps honnête** et une **option pour passer**.

Ici, la promesse est du jargon marketing — le détecteur d’impeccable range d’ailleurs « nouvelle génération » (*next-generation*) parmi les formules creuses. Neuf étapes avant de pouvoir utiliser le produit, c’est le long parcours préalable qu’impeccable range parmi les erreurs à éviter (1 à 3 concepts suffisent, le reste se découvre en contexte). Et la sortie existe mais se cache : un « Passer » caché figure lui aussi parmi ces erreurs. La durée annoncée, elle, est une bonne pratique.`,
      takeaway: 'Écran d’accueil : ce qu’est le produit en clair, un parcours court, une durée honnête et un « Passer » bien visible.',
      sources: ['imp:onboard', 'imp:detector'],
    },
    {
      id: 'onboarding-reports-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les deux défauts d’aide au premier usage sur cette page de rapports.',
      visual: {
        alt: 'Page Rapports d’un nouveau compte : bouton Importer des données, bandeau d’astuce, onglet Prévisions marqué Nouveau, indicateur Taux de rétention avec une icône d’aide, et un graphique vide marqué « Aucune donnée ».',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between mk-wrap" style="--gap:8px"><p class="mk-h2">Rapports</p><span class="mk-btn mk-btn--s" data-hotspot="import"><i data-icon="upload" style="--ico:14px"></i>Importer des données</span></div>
  <div class="onb-astuce" data-hotspot="tip"><i data-icon="info" style="--ico:16px"></i><span class="mk-grow">Astuce&nbsp;: cliquez sur un bouton pour effectuer une action.</span><i data-icon="x" style="--ico:14px"></i></div>
  <div class="mk-tabs"><span class="mk-tab mk-tab--on">Synthèse</span><span class="mk-tab mk-row" style="--gap:5px" data-hotspot="badge">Prévisions<span class="onb-new">Nouveau</span></span></div>
  <div class="mk-grid" style="--gap:10px">
    <div class="onb-metric"><span class="mk-small mk-muted mk-row" style="--gap:6px">Taux de rétention<span class="onb-help" data-hotspot="help">?</span></span><b>—</b></div>
    <div class="onb-metric"><span class="mk-small mk-muted">Chiffre d’affaires</span><b>—</b></div>
  </div>
  <div class="onb-chart" data-hotspot="empty"><span class="mk-muted">Aucune donnée</span></div>
</div>`,
        css: `.onb-astuce { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; background: #fff7e0; color: #6b4a00; font-size: 13px; }
.mk-tab { padding: 8px 10px; white-space: nowrap; }
.onb-new { padding: 1px 7px; border-radius: 999px; background: #e8eefc; color: #1a3a99; font-size: 11px; font-weight: 700; }
.onb-metric { display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid #e1e4ea; border-radius: 10px; }
.onb-metric b { font-size: 20px; }
.onb-help { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid #5a6172; font-size: 11px; font-weight: 700; color: #36405a; }
.onb-chart { display: grid; place-items: center; min-height: 110px; border: 1px dashed #c3c8d3; border-radius: 10px; }`,
      },
      hotspots: [
        {
          id: 'tip',
          label: 'Astuce qui explique l’évidence',
          correct: true,
          why: 'Elle explique un geste que tout le monde connaît : c’est infantilisant, et ça use l’attention dont les vraies astuces auront besoin.',
        },
        {
          id: 'empty',
          label: 'Graphique vide « Aucune donnée »',
          correct: true,
          why: 'Le vide ne dit ni quels graphiques apparaîtront ici, ni comment les obtenir (importer des données ou partir d’un jeu d’exemple).',
        },
        { id: 'import', label: 'Bouton Importer des données', correct: false, why: 'Un chemin direct vers la tâche clé : exactement ce qu’il faut.' },
        { id: 'help', label: 'Icône d’aide près du taux de rétention', correct: false, why: 'Une aide contextuelle à côté d’une notion complexe : bonne pratique.' },
        { id: 'badge', label: 'Badge Nouveau sur Prévisions', correct: false, why: 'La découverte progressive signale ce qui n’a pas encore servi, sans interrompre.' },
      ],
      explanation: `Deux erreurs d’aide au premier usage, et trois bonnes pratiques à garder :

- **Ne pas infantiliser** : une astuce qui explique comment cliquer sur un bouton dépense l’attention des gens pour rien — et leur apprend à ignorer les astuces suivantes.
- **Un vide qui enseigne** : « Aucune donnée » devrait dire quels graphiques apparaîtront ici et proposer d’importer des données ou de partir d’un jeu d’exemple.

Les trois autres zones sont, elles, de bonnes pratiques : une aide au point d’usage (l’icône \`?\` près d’une notion complexe), un signal de découverte progressive (le badge « Nouveau ») et un chemin direct vers l’action clé (le bouton d’import).`,
      takeaway: 'Aide au premier usage : des vides qui enseignent et des aides au point d’usage — jamais d’explication de l’évidence.',
      sources: ['imp:onboard', NNG_EMPTY],
    },
    {
      id: 'onboarding-tour-slider',
      type: 'slider',
      difficulty: 2,
      context: 'La visite guidée d’un outil de planification doit couvrir un seul parcours : créer un planning, y placer une tâche, inviter l’équipe, publier.',
      prompt: 'Règle le nombre d’étapes de cette visite.',
      visual: {
        alt: 'Visite guidée d’un outil de planification : le bouton Nouveau planning est mis en lumière, le reste de la page assombri, et une bulle ancrée au bouton affiche le compteur « Étape 1 sur N », une rangée de points, le titre Créez votre premier planning, et les boutons Passer la visite et Suivant.',
        html: `<div class="onb-tour">
  <div class="mk-pad mk-stack" style="--gap:12px">
    <div class="mk-row mk-between"><p class="mk-h3">Plannings</p><span class="mk-btn mk-btn--s onb-spot"><i data-icon="plus" style="--ico:14px"></i>Nouveau planning</span></div>
    <div class="onb-days"><span></span><span></span><span></span><span></span><span></span></div>
  </div>
  <div class="onb-bubble">
    <p class="mk-small mk-muted onb-count">Étape 1 sur&nbsp;</p>
    <p class="mk-strong">Créez votre premier planning</p>
    <p class="mk-small">Cliquez sur Nouveau planning, puis choisissez la semaine.</p>
    <div class="onb-dots-n"></div>
    <div class="mk-row mk-between"><span class="mk-btn mk-btn--text mk-btn--s">Passer la visite</span><span class="mk-btn mk-btn--s">Suivant</span></div>
  </div>
</div>`,
        css: `.onb-tour { position: relative; min-height: 250px; }
.onb-days { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.onb-days > span { height: 190px; border-radius: 8px; background: #eef1f6; }
.onb-spot { position: relative; z-index: 1; box-shadow: 0 0 0 4px #fff, 0 0 0 9999px rgb(15 20 35 / 0.45); }
.onb-bubble { position: absolute; z-index: 2; top: 64px; right: 12px; width: min(290px, calc(100% - 24px)); display: flex; flex-direction: column; gap: 8px; padding: 14px; border-radius: 12px; background: #fff; box-shadow: 0 12px 30px rgb(15 20 35 / 0.25); }
.onb-bubble::before { content: ""; position: absolute; top: -6px; right: 64px; width: 12px; height: 12px; background: #fff; transform: rotate(45deg); }
.onb-count { counter-reset: steps var(--n, 12); }
.onb-count::after { content: counter(steps); }
.onb-dots-n { position: relative; width: calc(var(--n, 12) * 12px); max-width: 100%; height: 8px; background: radial-gradient(circle at 6px 4px, #c3c8d3 3px, transparent 3.5px) 0 0 / 12px 8px repeat-x; }
.onb-dots-n::before { content: ""; position: absolute; left: 2px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #1f4fd8; }`,
      },
      control: 'Nombre d’étapes',
      min: 1,
      max: 15,
      step: 1,
      initial: 12,
      unit: '',
      target: [4, 5],
      ideal: 4,
      explanation: `Impeccable limite une visite guidée à **3 à 7 étapes** au maximum. Au-delà, la visite devient une leçon à retenir plutôt qu’un parcours à suivre, et le « 1 sur 12 » annonce un effort qui donne surtout envie de passer.

Dans cette limite, le bon nombre est celui du **parcours** visé, pas celui des fonctions : créer un planning, y placer une tâche, inviter l’équipe, publier — quatre étapes, cinq au plus avec une étape de conclusion. Trois obligerait à sauter ou à fusionner une action ; au-delà de cinq, on ajoute des étapes hors parcours. Le reste se découvre en contexte, et la visite reste facultative (« Passer la visite ») et rejouable depuis l’aide.`,
      takeaway: 'Une visite guidée : 3 à 7 étapes, calées sur un parcours, facultative et rejouable.',
      sources: ['imp:onboard'],
    },
    {
      id: 'onboarding-empty-types-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque situation de vide à la réponse qui lui convient.',
      leftTitle: 'Situation',
      rightTitle: 'Réponse',
      pairs: [
        { id: 'first', left: 'Premier usage : la fonction n’a jamais servi', right: 'Montrer la valeur et proposer un modèle pour démarrer' },
        { id: 'cleared', left: 'Vidé par l’utilisateur : il a tout supprimé volontairement', right: 'Un message bref et un moyen simple de recréer' },
        { id: 'noresults', left: 'Aucun résultat : la recherche ou le filtre ne renvoie rien', right: 'Suggérer une autre requête et effacer les filtres' },
        { id: 'permission', left: 'Pas de permission : le contenu existe mais n’est pas accessible', right: 'Expliquer pourquoi et comment obtenir l’accès' },
        { id: 'error', left: 'Erreur : le chargement a échoué', right: 'Dire ce qui s’est passé et proposer de réessayer' },
      ],
      explanation: `Chaque vide raconte une histoire différente, et la mauvaise réponse est souvent **trompeuse** : un discours de bienvenue à quelqu’un qui vient de tout supprimer, un « aucun élément » alors qu’on n’a simplement pas le droit de voir, un vide affiché à la place d’une erreur de chargement.

L’état vide dit d’abord **la vérité** sur ce qui se passe, puis offre l’action utile pour ce cas précis.`,
      takeaway: 'Premier usage, vidé, aucun résultat, pas de permission, erreur : cinq vides, cinq messages et cinq actions différentes.',
      sources: ['imp:onboard', 'imp:clarify'],
    },
    {
      id: 'onboarding-method-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range les étapes de conception d’un onboarding dans l’ordre.',
      items: [
        { id: 'aha', label: 'Identifier le moment « aha » visé et les endroits où les gens bloquent aujourd’hui' },
        { id: 'users', label: 'Comprendre les utilisateurs : niveau, motivation, temps disponible' },
        { id: 'success', label: 'Définir le succès : l’action clé et la façon de la mesurer' },
        { id: 'design', label: 'Concevoir le chemin le plus court vers cette action' },
        { id: 'test', label: 'Tester avec de vraies personnes : temps jusqu’à la valeur, achèvement, abandons' },
      ],
      explanation: `On ne conçoit pas un onboarding à partir des fonctions à montrer, mais du **résultat** à obtenir. D’abord le défi (le moment « aha », les blocages), puis les gens (leur niveau, leur motivation, leur temps), puis la définition du succès — l’action clé et sa mesure.

Seulement ensuite, on dessine le chemin le plus court vers cette action, et on le **vérifie** avec de vraies personnes : beaucoup de « Passer » signale un parcours trop long ou peu utile ; un faible taux d’achèvement demande de simplifier.`,
      takeaway: 'Défi et moment « aha », utilisateurs, succès mesurable, chemin le plus court, test réel : dans cet ordre.',
      sources: ['imp:onboard'],
    },
    {
      id: 'onboarding-forced-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un bon onboarding oblige chaque nouvel utilisateur à terminer la visite guidée avant d’accéder au produit, pour être sûr qu’il a tout vu.',
      answer: false,
      explanation: `Faux. Impeccable demande de rendre l’onboarding **facultatif** autant que possible : un « Passer » visible, et jamais d’accès au produit bloqué. Les personnes expérimentées n’en ont pas besoin, et les autres retiennent mal ce qu’on leur montre hors contexte.

« Avoir tout vu » n’est d’ailleurs pas l’objectif : l’objectif est d’**atteindre la valeur**. Le reste se découvre au moment où il sert.`,
      takeaway: 'L’onboarding reste facultatif : un « Passer » visible, et jamais d’accès au produit bloqué.',
      sources: ['imp:onboard', NNG_TUTORIALS],
    },
    {
      id: 'onboarding-cleared-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Quand un utilisateur a volontairement supprimé tous ses éléments, il faut lui remontrer l’état vide de premier usage, avec sa présentation complète.',
      answer: false,
      explanation: `Faux. La personne connaît déjà la fonction : elle vient de s’en servir. Lui remontrer la présentation de bienvenue est au mieux inutile, au pire infantilisant.

Pour un vide **choisi par l’utilisateur**, impeccable recommande une **touche légère** : un message bref (« Tout est fait pour aujourd’hui ») et un moyen simple de recréer.`,
      takeaway: 'Vide créé par l’utilisateur : message bref et moyen de recréer, pas le discours du premier usage.',
      sources: ['imp:onboard'],
    },
    {
      id: 'onboarding-aha-choice',
      type: 'choice',
      difficulty: 2,
      context: 'Tu conçois l’onboarding d’une application de facturation pour indépendants.',
      prompt: 'Quel moment « aha » viser en priorité ?',
      options: [
        {
          id: 'invoice',
          label: 'L’envoi de sa première facture à un vrai client',
          why: 'C’est la preuve concrète de la valeur : le produit a fait gagner du temps sur une vraie tâche.',
        },
        { id: 'tour', label: 'La fin de la visite guidée de toutes les fonctions', why: 'Avoir vu des fonctions ne prouve rien : c’est de la cérémonie, pas de la valeur.' },
        { id: 'profile', label: 'Un profil complété à 100 %', why: 'Une étape de configuration, pas un bénéfice : la personne n’a encore rien obtenu.' },
        { id: 'video', label: 'Le visionnage de la vidéo de présentation', why: 'Regarder n’est pas faire : on retient peu d’une présentation hors contexte.' },
      ],
      answer: 'invoice',
      explanation: `Le moment « aha » est celui où la personne **constate** la valeur du produit sur sa propre tâche. Pour un outil de facturation, c’est une facture envoyée — pas une visite terminée, un profil complet ou une vidéo vue.

Une fois ce moment identifié, tout l’onboarding se mesure à une seule question : combien de temps et d’étapes faut-il pour l’atteindre ? Modèles de facture préremplis, client d’exemple et valeurs par défaut servent à raccourcir ce chemin.`,
      takeaway: 'Vise le moment « aha » : une vraie réussite sur la tâche de la personne, pas la consommation de tutoriels.',
      sources: ['imp:onboard'],
    },
    {
      id: 'onboarding-account-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Lesquelles de ces pratiques allègent la création de compte ?',
      options: [
        { id: 'minimal', label: 'Ne demander que l’e-mail et un mot de passe, le reste plus tard', why: 'Le minimum requis : le reste se collecte quand il sert.' },
        {
          id: 'explain',
          label: 'Expliquer pourquoi on demande le numéro de téléphone (double authentification)',
          why: 'Une raison claire lève la méfiance face à une donnée sensible.',
        },
        { id: 'defaults', label: 'Préremplir le fuseau horaire d’après l’appareil, en le laissant modifiable', why: 'Une valeur par défaut intelligente épargne une question.' },
        {
          id: 'qualify',
          label: 'Demander la taille de l’entreprise et le poste avant d’ouvrir l’application',
          why: 'Des questions utiles au marketing, pas à la personne : elles retardent la valeur.',
        },
        {
          id: 'one-page',
          label: 'Afficher tous les champs du profil sur une seule page pour finir plus vite',
          why: 'Plus de champs d’un coup, ce n’est pas plus rapide : c’est plus d’efforts avant la première réussite.',
        },
        {
          id: 'tour',
          label: 'Enchaîner sur une visite guidée obligatoire de dix étapes',
          why: 'Trop longue, imposée, hors contexte : tout ce qu’impeccable demande d’éviter.',
        },
      ],
      answers: ['minimal', 'explain', 'defaults'],
      explanation: `La création de compte d’impeccable tient en quatre principes : **le minimum d’informations** (le reste plus tard), **une explication** pour chaque donnée demandée, des **valeurs par défaut intelligentes**, et une connexion via un compte existant quand c’est pertinent.

Tout ce qui s’ajoute avant une première réussite — questions de qualification, formulaires exhaustifs, visite obligatoire — repousse le moment où la personne constate la valeur du produit.`,
      takeaway: 'Compte minimal : le strict nécessaire, une raison pour chaque donnée, des valeurs par défaut — rien d’autre avant la première réussite.',
      sources: ['imp:onboard'],
    },
    {
      id: 'onboarding-dismiss-choice',
      type: 'choice',
      difficulty: 1,
      context: 'Hier, un utilisateur a refermé l’infobulle « Exportez vos factures en CSV ». Il revient aujourd’hui.',
      prompt: 'Que doit faire l’interface ?',
      options: [
        { id: 'remember', label: 'Ne plus l’afficher : la fermeture a été mémorisée.', why: 'On respecte la décision ; l’information reste retrouvable dans l’aide.' },
        { id: 'again', label: 'La réafficher à chaque visite tant qu’il n’a pas utilisé l’export.', why: 'Répéter une infobulle refermée transforme l’aide en harcèlement.' },
        { id: 'modal', label: 'La remplacer par une fenêtre modale, plus difficile à ignorer.', why: 'On escalade l’interruption au lieu de respecter un choix.' },
        { id: 'reset', label: 'Réinitialiser toutes les infobulles à chaque nouvelle version.', why: 'Tout le monde revoit des aides déjà refermées, même sur les fonctions inchangées.' },
      ],
      answer: 'remember',
      explanation: `Impeccable demande de montrer l’onboarding **une seule fois** : on suit ce qui a été vu ou refermé — un simple indicateur stocké suffit — et on **respecte les refus**. Une infobulle refermée qui revient apprend surtout à refermer les infobulles sans les lire.

Pour que l’aide reste disponible, on la rend **retrouvable** (menu d’aide, liens « En savoir plus »), sans la pousser à nouveau.`,
      takeaway: 'Mémorise ce qui a été vu ou refermé et respecte-le ; l’aide reste retrouvable, jamais réimposée.',
      sources: ['imp:onboard', NNG_TUTORIALS],
    },
  ],
};

export default onboarding;
