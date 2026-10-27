import type { ModuleContent, Visual } from '../../engine/types';

const HOOBER = {
  label: 'Steven Hoober — How Do Users Really Hold Mobile Devices? (UXmatters, 2013)',
  url: 'https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php',
};
const NNG_PERSONA = { label: 'Nielsen Norman Group — Personas Make Users Memorable', url: 'https://www.nngroup.com/articles/persona/' };

/** Écran d’accueil bancaire, avec ou sans libellés dans la barre d’onglets. */
const bankHome = (labels: boolean): Visual => ({
  frame: 'phone',
  alt: labels
    ? 'Accueil d’une application bancaire : deux soldes et une barre d’onglets dont chaque icône porte un libellé (Accueil, Comptes, Virements, Budget, Profil).'
    : 'Accueil d’une application bancaire : deux soldes et une barre d’onglets faite de cinq icônes sans libellé.',
  css: `.pn-card { padding: 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.pn-amt { font-size: 20px; font-weight: 700; font-variant-numeric: tabular-nums; }
.pn-bar { font-size: 11px; margin-top: 18px; }
.pn-bar > span { min-width: 44px; min-height: 40px; justify-content: center; }`,
  html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h2">Bonjour Lucie</p><div class="pn-card"><p class="mk-small mk-muted">Compte courant</p><p class="pn-amt">1&nbsp;284,50&nbsp;€</p></div><div class="pn-card"><p class="mk-small mk-muted">Livret d’épargne</p><p class="pn-amt">6&nbsp;410,00&nbsp;€</p></div></div>
<div class="mk-tabbar pn-bar"><span class="on"><i data-icon="house" style="--ico:22px"></i>${labels ? 'Accueil' : ''}</span><span><i data-icon="wallet" style="--ico:22px"></i>${labels ? 'Comptes' : ''}</span><span><i data-icon="send" style="--ico:22px"></i>${labels ? 'Virements' : ''}</span><span><i data-icon="chart-column" style="--ico:22px"></i>${labels ? 'Budget' : ''}</span><span><i data-icon="user" style="--ico:22px"></i>${labels ? 'Profil' : ''}</span></div>`,
});

/** Choix d’un créneau de livraison ; l’action de validation est dans l’en-tête ou dans le bas de l’écran. */
const slotPicker = (bottom: boolean): Visual => ({
  frame: 'phone',
  alt: bottom
    ? 'Choix d’un créneau de livraison : liste de créneaux et grand bouton « Valider · 18:00 – 20:00 » fixé dans le bas de l’écran.'
    : 'Choix d’un créneau de livraison : liste de créneaux et petit lien « Valider » dans l’angle de l’en-tête.',
  css: `.sl-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; border-bottom: 1px solid #e3e6ec; }
.sl-ok { font-size: 13px; font-weight: 600; color: #1f4fd8; }
.sl-opt { display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding: 0 12px; border: 1px solid #c7cedb; border-radius: 10px; }
.sl-opt--on { border-color: #1f4fd8; box-shadow: inset 0 0 0 1px #1f4fd8; }
.sl-foot { padding: 12px 14px 14px; border-top: 1px solid #e3e6ec; }
.sl-foot .mk-btn { min-height: 48px; white-space: normal; text-align: center; }`,
  html: `<div class="sl-head"><i data-icon="chevron-left" style="--ico:20px"></i><span class="mk-strong">Livraison</span>${bottom ? '<span style="width:20px"></span>' : '<span class="sl-ok">Valider</span>'}</div>
<div class="mk-pad mk-stack" style="--gap:8px"><p class="mk-h3">Choisir un créneau</p><p class="mk-small mk-muted">Mardi 17 novembre</p><div class="sl-opt"><span>8:00 – 10:00</span><span class="mk-small mk-muted">Gratuit</span></div><div class="sl-opt sl-opt--on"><span class="mk-strong">18:00 – 20:00</span><span class="mk-small mk-muted">Gratuit</span></div><div class="sl-opt"><span>20:00 – 22:00</span><span class="mk-small mk-muted">2,90&nbsp;€</span></div></div>
${bottom ? '<div class="sl-foot"><span class="mk-btn mk-btn--block">Valider · 18:00&nbsp;–&nbsp;20:00</span></div>' : '<div style="height:84px"></div>'}`,
});

const personas: ModuleContent = {
  id: 'personas',
  title: 'Personas de test',
  category: 'evaluer',
  summary:
    'Parcourir une interface dans la peau d’Alex, Jordan, Sam, Riley et Casey, choisir les bons personas selon le type d’écran et rapporter des signaux d’alerte précis.',
  minutes: 10,
  commands: ['critique'],
  sources: ['imp:critique', NNG_PERSONA, HOOBER],
  sections: [
    {
      id: 'pourquoi',
      title: 'Pourquoi tester avec des personas',
      body: `Un seul regard de « directeur artistique » rate des pannes entières : l’expert ne voit pas ce qui perd le novice, et l’évaluateur sur grand écran ne sent pas le pouce qui n’atteint pas le bouton. La critique d’impeccable fait donc parcourir l’interface par **cinq archétypes**, qui exposent chacun d’autres défaillances : Alex, Jordan, Sam, Riley et Casey.

La méthode tient en quatre temps :

1. **Identifier le type d’interface** : tableau de bord, tunnel de commande, formulaire…
2. **Choisir deux ou trois personas** pertinents pour ce type d’interface.
3. **Dérouler l’action principale** dans la peau de chacun.
4. **Noter des signaux d’alerte précis** : l’élément et l’interaction qui cassent, pas une impression générale.

> « Alex : aucun raccourci clavier ; huit clics pour l’action principale ; visite guidée imposée. » plutôt que « Alex aimerait que ce soit plus rapide ».

Ces archétypes servent à **inspecter**. Ils ne remplacent pas les personas issus de la recherche : pour le Nielsen Norman Group, un persona est la description fictive mais réaliste d’un utilisateur type, et il doit s’appuyer sur des données réelles.`,
    },
    {
      id: 'alex-jordan',
      title: 'Alex et Jordan : l’expert pressé, le novice perdu',
      body: `**Alex, l’expert pressé**, connaît les produits du genre, déteste qu’on lui tienne la main, et trouvera un raccourci… ou partira.

- *Comportements* : saute l’onboarding et les instructions, cherche d’emblée les raccourcis clavier, veut sélectionner, éditer par lots et automatiser ; abandonne si c’est lent ou condescendant.
- *Questions de test* : termine-t-il la tâche principale en moins de 60 secondes ? Existe-t-il des raccourcis pour les actions courantes ? Peut-il passer entièrement l’onboarding ? Les fenêtres se ferment-elles avec Échap ? Y a-t-il un chemin expert (raccourcis, actions groupées) ?
- *Signaux d’alerte* : tutoriel imposé ou impossible à passer, action principale inaccessible au clavier, animations lentes qu’on ne peut pas sauter, traitement élément par élément là où le lot serait naturel, confirmations redondantes pour des actions sans risque.

**Jordan, le novice perdu**, n’a jamais utilisé ce type de produit. Il lit tout, hésite avant de cliquer, cherche de l’aide et prend chaque libellé au pied de la lettre.

- *Questions de test* : la première action est-elle évidente en 5 secondes ? Toutes les icônes ont-elles un libellé ? Y a-t-il de l’aide aux moments de décision ? Le vocabulaire suppose-t-il des connaissances ? Un retour ou une annulation est-il possible à chaque étape ?
- *Signaux d’alerte* : navigation en icônes seules, jargon non expliqué, aucune aide visible, étape suivante ambiguë après une action, aucune confirmation que l’action a réussi.`,
      examples: [
        {
          title: 'Une navigation que Jordan comprend',
          bad: bankHome(false),
          badNote: 'Cinq pictogrammes à deviner : Jordan touchera au hasard, ou n’osera pas.',
          good: bankHome(true),
          goodNote: 'Chaque destination est nommée : rien à deviner, rien à mémoriser.',
        },
      ],
    },
    {
      id: 'sam',
      title: 'Sam : l’accessibilité comme condition d’usage',
      body: `**Sam** utilise un lecteur d’écran (VoiceOver, NVDA) et navigue au clavier ; il peut aussi avoir une basse vision, un handicap moteur ou des différences cognitives.

- *Comportements* : parcourt l’interface linéairement avec Tab, s’appuie sur les titres et les noms accessibles, ne voit ni les survols ni les indices purement visuels, a besoin d’un contraste suffisant (au niveau AA : 4,5:1 pour le texte courant, 3:1 pour le grand texte), zoome parfois jusqu’à 200 %.
- *Questions de test* : tout le parcours principal se fait-il au clavier ? Chaque élément interactif reçoit-il un focus visible ? Les images ont-elles un texte alternatif pertinent ? Le contraste atteint-il le niveau AA des WCAG ? Le lecteur d’écran annonce-t-il les changements d’état (chargement, succès, erreur) ?
- *Signaux d’alerte* : interactions à la souris sans alternative au clavier, focus absent ou invisible, sens porté par la seule couleur (rouge = erreur, vert = succès), champs ou boutons sans nom, actions limitées dans le temps sans possibilité de prolonger, composants sur mesure qui cassent la lecture.

Sam n’est pas un cas marginal à traiter en fin de projet : ce qu’il exige (clavier, focus, contraste, annonces) sert aussi la personne en plein soleil, celle qui a un bras dans le plâtre ou celle qui lit vite entre deux tâches. Le module « Accessibilité et audit » détaille les critères.`,
    },
    {
      id: 'riley-casey',
      title: 'Riley et Casey : les cas limites et la vraie vie',
      body: `**Riley, le testeur de cas limites**, sort méthodiquement du chemin idéal : états vides, textes très longs, caractères spéciaux, émojis, texte de droite à gauche, collage depuis un tableur. Il revient en arrière, rafraîchit en plein parcours, ouvre deux onglets.

- *Questions de test* : que se passe-t-il à 0, à 1 000 éléments, avec un texte très long ? Les erreurs laissent-elles l’interface dans un état propre ? L’état survit-il à un rafraîchissement ? Une fonction semble-t-elle marcher alors qu’elle produit un résultat faux ?
- *Signaux d’alerte* : fonctions qui échouent en silence, erreurs qui exposent des détails techniques ou cassent l’interface, états vides inutiles (« Aucun résultat » sans piste), données perdues au rafraîchissement, comportements différents pour des interactions semblables.

**Casey, distrait sur mobile**, tient son téléphone d’une main, en mouvement, souvent interrompu, parfois sur une connexion lente. Les observations de Steven Hoober (2013) le rappellent : 49 % des personnes vues en train de toucher leur écran tenaient leur téléphone d’une seule main.

- *Questions de test* : les actions principales sont-elles dans la zone du pouce, la moitié inférieure de l’écran ? L’état est-il conservé si Casey quitte l’appli et revient ? L’écran tient-il sur une connexion lente ? Les formulaires profitent-ils de l’autocomplétion et de valeurs par défaut ? Les cibles tactiles font-elles au moins 44 × 44 pt ?
- *Signaux d’alerte* : actions importantes placées tout en haut de l’écran, progression perdue à la moindre interruption, longue saisie de texte là où un choix suffirait, ressources lourdes chargées à chaque page, cibles minuscules ou trop serrées.`,
      examples: [
        {
          title: 'Un état vide qui ne laisse pas Riley en plan',
          bad: {
            frame: 'phone',
            alt: 'Recherche « chaussures trail 42 imperméable » suivie du seul texte « Aucun résultat. »',
            html: `<div class="mk-pad mk-stack" style="--gap:14px"><div class="mk-input" style="display:flex;align-items:center;gap:8px"><i data-icon="search" style="--ico:16px"></i>chaussures trail 42 imperméable</div><p class="mk-muted mk-center" style="padding:28px 0">Aucun résultat.</p></div>`,
          },
          badNote: 'Une impasse : pourquoi rien ? Que changer ? L’écran ne le dit pas.',
          good: {
            frame: 'phone',
            alt: 'Même recherche : message expliquant l’absence de résultat, filtres actifs affichés avec une croix, suggestion de 12 résultats sans le filtre Imperméable et bouton Effacer les filtres.',
            css: `.es-chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 999px; background: #eef1f7; font-size: 12px; font-weight: 600; color: #36405a; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><div class="mk-input" style="display:flex;align-items:center;gap:8px"><i data-icon="search" style="--ico:16px"></i>chaussures trail 42 imperméable</div><p class="mk-strong">Aucun modèle ne correspond à tous vos filtres</p><div class="mk-row mk-wrap" style="--gap:6px"><span class="es-chip">Pointure 42 <i data-icon="x" style="--ico:12px"></i></span><span class="es-chip">Imperméable <i data-icon="x" style="--ico:12px"></i></span></div><p class="mk-small">Sans le filtre « Imperméable » : <a>12 modèles en pointure 42</a></p><span class="mk-btn mk-btn--ghost mk-btn--block">Effacer les filtres</span></div>`,
          },
          goodNote: 'Il explique pourquoi, montre les filtres en cause et propose deux sorties.',
        },
        {
          title: 'Le pouce de Casey',
          bad: slotPicker(false),
          badNote: 'Le seul moyen de valider est un petit lien dans l’angle supérieur : difficile à atteindre d’une main.',
          good: slotPicker(true),
          goodNote: 'Un grand bouton dans le bas de l’écran, dans la zone du pouce, qui rappelle le choix.',
        },
      ],
    },
    {
      id: 'choisir',
      title: 'Choisir deux ou trois personas',
      body: `Impeccable sélectionne les personas selon le type d’interface :

- **Page d’accueil, marketing** : Jordan, Riley, Casey — premières impressions, confiance, mobile.
- **Tableau de bord, administration** : Alex, Sam — utilisateurs intensifs, accessibilité.
- **E-commerce, tunnel de commande** : Casey, Riley, Jordan — mobile, cas limites, clarté.
- **Parcours d’onboarding** : Jordan, Casey — confusion, interruptions.
- **Interface riche en données, analytique** : Alex, Sam — efficacité, navigation au clavier.
- **Formulaires, assistants en plusieurs étapes** : Jordan, Sam, Casey — clarté, accessibilité, mobile.

Ce tableau est un point de départ, pas un dogme : si tes utilisateurs réels diffèrent (un outil interne utilisé sur tablette dans un entrepôt, par exemple), c’est le contexte réel qui décide, et un persona propre au projet peut compléter la liste.`,
    },
    {
      id: 'propre-au-projet',
      title: 'Un persona propre au projet',
      body: `Quand le contexte produit (le PRODUCT.md rédigé avec \`init\`) décrit réellement le public, la critique peut ajouter **un ou deux personas spécifiques** :

1. Lire la description du public cible.
2. Repérer l’archétype principal que les cinq personas ne couvrent pas.
3. Le rédiger avec le gabarit : **Profil** (2 ou 3 traits tirés du contexte), **Comportements** (3 ou 4, propres à ce public), **Signaux d’alerte** (3 ou 4 choses qui le feraient décrocher).

La règle est stricte : **on n’invente pas de détails sur le public**. Sans contexte réel, on s’en tient aux cinq archétypes. Un persona fabriqué de toutes pièces (âge, loisirs, applis préférées) donne l’illusion de connaître l’utilisateur et oriente les décisions sur du vide.`,
    },
  ],
  rules: [
    { id: 'alex', front: 'Quels signaux d’alerte guettent Alex, l’expert pressé ?', back: 'Onboarding impossible à passer, action principale inaccessible au clavier, animations lentes non sautables, traitement élément par élément, confirmations inutiles.' },
    { id: 'jordan', front: 'Quels signaux d’alerte font abandonner Jordan, le novice ?', back: 'Icônes sans libellé, jargon non expliqué, aucune aide visible, étape suivante ambiguë, aucune confirmation de succès.' },
    { id: 'sam', front: 'Quels signaux d’alerte excluent Sam ?', back: 'Interactions à la souris seulement, focus invisible, sens porté par la couleur seule, éléments sans nom, délais sans prolongation, composants qui cassent le lecteur d’écran.' },
    { id: 'riley', front: 'Que cherche Riley, le testeur de cas limites ?', back: 'Les échecs silencieux, les erreurs techniques exposées, les états vides inutiles, les données perdues au rafraîchissement et les incohérences entre interactions semblables.' },
    { id: 'casey', front: 'Quels signaux d’alerte gênent Casey, sur mobile et distrait ?', back: 'Actions importantes hors de portée du pouce, progression perdue à l’interruption, saisie libre là où un choix suffit, pages lourdes, cibles minuscules ou serrées.' },
    { id: 'how-many', front: 'Combien de personas par test ?', back: 'Deux ou trois, choisis selon le type d’interface.' },
    { id: 'dashboard', front: 'Tableau de bord ou interface riche en données : quels personas ?', back: 'Alex et Sam : efficacité et accessibilité.' },
    { id: 'checkout', front: 'Tunnel de commande e-commerce : quels personas ?', back: 'Casey, Riley et Jordan : mobile, cas limites, clarté.' },
    { id: 'red-flag', front: 'Comment rédiger un signal d’alerte ?', back: 'En nommant l’élément et l’interaction qui échouent (« le bouton Payer est hors de portée du pouce »), jamais par une impression générale.' },
    { id: 'project', front: 'Quand créer un persona propre au projet ?', back: 'Seulement quand un vrai contexte décrit le public : profil, comportements et signaux d’alerte en sont tirés, sans aucun détail inventé.' },
  ],
  exercises: [
    {
      id: 'personas-input-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Casey réserve d’une main, debout dans le tram. Quel écran lui convient ?',
      options: [
        {
          id: 'typing',
          visual: {
            frame: 'phone',
            alt: 'Prise de rendez-vous dans un salon de coiffure : un champ libre « Date et heure souhaitées » au format JJ/MM/AAAA HH:MM et un champ libre « Coiffeur ou coiffeuse » qui attend un nom complet.',
            css: `.pc-ph { color: #6b7280; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h2">Prendre rendez-vous</p><p class="mk-small mk-muted">Salon Ciseaux d’Or · Coupe et brushing · 45&nbsp;min</p><div class="mk-field"><span class="mk-label">Date et heure souhaitées</span><div class="mk-input pc-ph">JJ/MM/AAAA HH:MM</div><span class="mk-help">Saisissez une date et une heure d’ouverture du salon.</span></div><div class="mk-field"><span class="mk-label">Coiffeur ou coiffeuse</span><div class="mk-input pc-ph">Nom complet</div></div><span class="mk-btn mk-btn--block">Réserver</span></div>`,
          },
          why: 'Casey doit taper une date au bon format, deviner les horaires d’ouverture et écrire un nom : beaucoup de frappe, beaucoup d’erreurs possibles.',
        },
        {
          id: 'chips',
          visual: {
            frame: 'phone',
            alt: 'Même prise de rendez-vous : jours proposés en pastilles, trois créneaux libres en gros boutons et un bouton Réserver qui rappelle le choix.',
            css: `.pc-days { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.pc-day { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 52px; border: 1px solid #c7cedb; border-radius: 10px; font-size: 12px; color: #36405a; }
.pc-day b { font-size: 16px; color: #1d2230; }
.pc-slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.pc-slot { display: grid; place-items: center; min-height: 44px; border: 1px solid #c7cedb; border-radius: 10px; font-weight: 600; }
.pc-on { border-color: #1f4fd8; box-shadow: inset 0 0 0 1px #1f4fd8; color: #1f4fd8; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h2">Prendre rendez-vous</p><p class="mk-small mk-muted">Salon Ciseaux d’Or · Coupe et brushing · 45&nbsp;min</p><p class="mk-label">Jour</p><div class="pc-days"><span class="pc-day pc-on">Auj.<b>12</b></span><span class="pc-day">Ven.<b>13</b></span><span class="pc-day">Sam.<b>14</b></span><span class="pc-day">Mar.<b>17</b></span></div><p class="mk-label">Heure</p><div class="pc-slots"><span class="pc-slot">17:30</span><span class="pc-slot pc-on">18:15</span><span class="pc-slot">19:00</span></div><span class="mk-btn mk-btn--block">Réserver jeudi 12 à 18:15</span></div>`,
          },
          why: 'Deux ou trois touchers sur des cibles larges, parmi des créneaux réellement libres : aucune frappe.',
        },
      ],
      answer: 'chips',
      explanation: `Casey tape le moins possible : d’une main, debout, entre deux arrêts, chaque caractère est une occasion d’erreur. Le signal d’alerte d’impeccable est explicite : **une longue saisie de texte là où un choix suffirait**.

Les pastilles transforment la saisie en sélection : quelques touchers, des cibles larges, aucun format à respecter. Le système connaît déjà les créneaux libres ; c’est à lui de les proposer, pas à Casey de les deviner.`,
      takeaway: 'Sur mobile, remplace la saisie libre par des choix à toucher dès que les valeurs possibles sont connues.',
      sources: ['imp:critique', 'imp:adapt'],
    },
    {
      id: 'personas-confirm-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Jordan vient d’appuyer sur « Envoyer » pour sa première demande de remboursement. Quel écran le rassure ?',
      options: [
        {
          id: 'reset',
          visual: {
            frame: 'phone',
            alt: 'Formulaire « Nouvelle demande de remboursement » vide, avec ses champs et un bouton Envoyer, sans aucun message.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h2">Nouvelle demande de remboursement</p><div class="mk-field"><span class="mk-label">Type de soin</span><div class="mk-input" style="display:flex;align-items:center;justify-content:space-between;gap:8px"><span class="mk-muted">Choisir</span><i data-icon="chevron-down" style="--ico:14px"></i></div></div><div class="mk-field"><span class="mk-label">Montant payé</span><div class="mk-input"></div></div><span class="mk-btn mk-btn--ghost mk-btn--block"><i data-icon="paperclip" style="--ico:15px"></i> Ajouter la facture</span><span class="mk-btn mk-btn--block">Envoyer</span></div>`,
          },
          why: 'Le formulaire s’est vidé sans un mot : la demande est-elle partie, refusée, à refaire ? Jordan ne peut pas le savoir.',
        },
        {
          id: 'done',
          visual: {
            frame: 'phone',
            alt: 'Écran de confirmation : icône de validation, « Demande envoyée », numéro de suivi, délai de réponse par e-mail, bouton Suivre ma demande et lien de retour à l’accueil.',
            css: `.cf-ok { width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; background: #e6f4ea; color: #1e5e33; margin: 8px auto 0; }
.cf-ref { padding: 10px 12px; border-radius: 10px; background: #f6f7f9; font-variant-numeric: tabular-nums; }
.cf-ref b { white-space: nowrap; }`,
            html: `<div class="mk-pad mk-stack mk-center" style="--gap:10px"><span class="cf-ok"><i data-icon="check" style="--ico:26px"></i></span><p class="mk-h2">Demande envoyée</p><p class="cf-ref">Numéro de suivi : <b>R-2026-0412</b></p><p class="mk-small">Vous recevrez une réponse par e&#8209;mail sous 5&nbsp;jours ouvrés.</p><span class="mk-btn mk-btn--block">Suivre ma demande</span><span class="mk-btn mk-btn--text">Retour à l’accueil</span></div>`,
          },
          why: 'Ce qui s’est passé, une preuve (le numéro), le délai, et la suite possible : plus aucune question.',
        },
      ],
      answer: 'done',
      explanation: `Jordan prend chaque écran au pied de la lettre. Après « Envoyer », un formulaire vide peut vouloir dire « c’est parti », « ça n’a pas marché » ou « recommencez ». Il hésitera à renvoyer la demande, ou appellera.

Deux signaux d’alerte de Jordan sont en jeu : **aucune confirmation que l’action a réussi** et **une étape suivante ambiguë**. L’écran recommandé dit ce qui s’est passé, donne une trace (le numéro de suivi), fixe une attente (5 jours ouvrés) et propose la suite.`,
      takeaway: 'Après une action importante, confirme le succès, donne une trace (numéro, délai) et indique la suite.',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'personas-tour-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Alex a déjà utilisé trois outils de ce genre. Quel premier lancement lui convient ?',
      context: 'Premier lancement d’un outil de gestion de tâches en colonnes.',
      options: [
        {
          id: 'forced',
          visual: {
            frame: 'browser',
            alt: 'Tableau de tâches recouvert par une fenêtre « Bienvenue dans Tasko ! Étape 1 sur 7 » avec un unique bouton Suivant, sans croix ni bouton pour passer.',
            css: `.tk-board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.tk-col { padding: 8px; border-radius: 10px; background: #f4f6f9; display: flex; flex-direction: column; gap: 6px; }
.tk-card { padding: 8px; border-radius: 8px; background: #fff; border: 1px solid #e1e4ea; font-size: 12px; }
.tk-wrap { container-type: inline-size; }
@container (max-width: 340px) { .tk-board { grid-template-columns: minmax(0, 1fr); } }
.tk-dots { display: flex; gap: 5px; } .tk-dots span { width: 7px; height: 7px; border-radius: 50%; background: #c7cedb; } .tk-dots .on { background: #1f4fd8; }`,
            html: `<div style="position:relative"><div class="mk-pad mk-stack tk-wrap" style="--gap:10px"><p class="mk-h2">Projet Lancement</p><div class="tk-board"><div class="tk-col"><p class="mk-small mk-strong">À faire</p><div class="tk-card">Brief photographe</div><div class="tk-card">Devis traiteur</div></div><div class="tk-col"><p class="mk-small mk-strong">En cours</p><div class="tk-card">Invitations</div></div><div class="tk-col"><p class="mk-small mk-strong">Fait</p><div class="tk-card">Réserver la salle</div></div></div></div><div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:10px"><p class="mk-small mk-muted">Étape 1 sur 7</p><p class="mk-h3">Bienvenue dans Tasko !</p><p class="mk-small">Découvrons ensemble votre tableau, colonne par colonne.</p><div class="mk-row mk-between"><div class="tk-dots"><span class="on"></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="mk-btn mk-btn--s">Suivant</span></div></div></div></div>`,
          },
          why: 'Sept étapes imposées, sans croix ni « Passer » : Alex est bloqué devant ce qu’il sait déjà faire.',
        },
        {
          id: 'skippable',
          visual: {
            frame: 'browser',
            alt: 'Même tableau, sans fenêtre par-dessus, avec un petit encart « Pour démarrer » (1 sur 4) qui liste deux actions, le raccourci N, l’accès à tous les raccourcis et un lien Masquer.',
            css: `.tk-board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.tk-col { padding: 8px; border-radius: 10px; background: #f4f6f9; display: flex; flex-direction: column; gap: 6px; }
.tk-card { padding: 8px; border-radius: 8px; background: #fff; border: 1px solid #e1e4ea; font-size: 12px; }
.tk-wrap { container-type: inline-size; }
@container (max-width: 340px) { .tk-board { grid-template-columns: minmax(0, 1fr); } }
.tk-start { padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 10px; font-size: 13px; }
kbd { font: 600 11px/1 ui-monospace, Menlo, monospace; padding: 2px 5px; border: 1px solid #c7cedb; border-bottom-width: 2px; border-radius: 4px; color: #36405a; }`,
            html: `<div class="mk-pad mk-stack tk-wrap" style="--gap:10px"><p class="mk-h2">Projet Lancement</p><div class="tk-board"><div class="tk-col"><p class="mk-small mk-strong">À faire</p><div class="tk-card">Brief photographe</div><div class="tk-card">Devis traiteur</div></div><div class="tk-col"><p class="mk-small mk-strong">En cours</p><div class="tk-card">Invitations</div></div><div class="tk-col"><p class="mk-small mk-strong">Fait</p><div class="tk-card">Réserver la salle</div></div></div><div class="tk-start mk-stack" style="--gap:6px"><div class="mk-row mk-between"><span class="mk-strong">Pour démarrer · 1/4</span><span class="mk-btn mk-btn--text mk-btn--s">Masquer</span></div><span class="mk-check mk-check--on">Créer une tâche <kbd>N</kbd></span><span class="mk-check">Inviter l’équipe</span><span class="mk-small mk-muted">Tous les raccourcis : <kbd>?</kbd></span></div></div>`,
          },
          why: 'Le tableau est utilisable d’emblée ; l’aide se masque d’un clic et expose les raccourcis qu’Alex cherche.',
        },
      ],
      answer: 'skippable',
      explanation: `Alex saute tout onboarding. Une visite en sept étapes impossible à fermer, c’est exactement son signal d’alerte : **tutoriel imposé ou impossible à passer**. Il cherchera la croix, puis Échap, puis partira.

L’encart « Pour démarrer » aide sans bloquer : il se masque, montre les raccourcis et laisse le tableau utilisable tout de suite. Jordan, lui, y trouvera ses repères : un bon onboarding sert les deux personas à la fois.`,
      takeaway: 'Un onboarding doit pouvoir se passer : il guide sans bloquer et laisse les habitués aller droit au but.',
      sources: ['imp:critique', 'imp:onboard'],
    },
    {
      id: 'personas-timeout-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sam remplit ce formulaire au clavier avec un lecteur d’écran, plus lentement que la moyenne. Quelle version ne l’exclut pas ?',
      context: 'Déclaration de sinistre en ligne, à la fin d’une longue étape.',
      options: [
        {
          id: 'countdown',
          visual: {
            frame: 'browser',
            alt: 'Formulaire de déclaration de sinistre avec un bandeau « Votre session expire dans 0:45. Les informations non envoyées seront perdues. », sans aucun bouton.',
            css: `.to-banner { display: flex; gap: 8px; align-items: flex-start; padding: 10px 12px; border-radius: 8px; background: #fff4d6; color: #5c4400; font-size: 13px; }
.to-banner .mk-ico { margin-top: 2px; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="to-banner"><i data-icon="clock" style="--ico:15px"></i><span><b>Votre session expire dans 0:45.</b> Les informations non envoyées seront perdues.</span></p><p class="mk-h3">Circonstances du sinistre</p><div class="mk-field"><span class="mk-label">Date du dégât des eaux</span><div class="mk-input">03/11/2026</div></div><div class="mk-field"><span class="mk-label">Pièces touchées</span><div class="mk-input">Cuisine, couloir</div></div><span class="mk-btn" style="align-self:flex-start">Étape suivante</span></div>`,
          },
          why: 'Un compte à rebours sans aucun moyen de prolonger : si Sam n’a pas fini à temps, tout est perdu.',
        },
        {
          id: 'extend',
          visual: {
            frame: 'browser',
            alt: 'Même formulaire avec un bandeau « Votre session expire dans 2 minutes », un bouton « Prolonger de 20 minutes » et la mention que les réponses sont enregistrées.',
            css: `.to-banner { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; padding: 10px 12px; border-radius: 8px; background: #fff4d6; color: #5c4400; font-size: 13px; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><div class="to-banner"><i data-icon="clock" style="--ico:15px"></i><span class="mk-grow"><b>Votre session expire dans 2&nbsp;minutes.</b> Vos réponses sont enregistrées.</span><span class="mk-btn mk-btn--s">Prolonger de 20&nbsp;minutes</span></div><p class="mk-h3">Circonstances du sinistre</p><div class="mk-field"><span class="mk-label">Date du dégât des eaux</span><div class="mk-input">03/11/2026</div></div><div class="mk-field"><span class="mk-label">Pièces touchées</span><div class="mk-input">Cuisine, couloir</div></div><span class="mk-btn" style="align-self:flex-start">Étape suivante</span></div>`,
          },
          why: 'L’avertissement arrive à temps, la prolongation tient en une action et les réponses ne sont pas perdues.',
        },
      ],
      answer: 'extend',
      explanation: `Sam met plus de temps qu’un utilisateur à la souris : il parcourt les champs un par un et écoute chaque libellé. Un compte à rebours sans prolongation l’exclut, et c’est l’un de ses signaux d’alerte : **une action limitée dans le temps sans possibilité de prolonger**.

Les WCAG en font un critère de niveau A (2.2.1) : un délai doit pouvoir être désactivé, ajusté ou prolongé — par exemple en avertissant la personne avant l’expiration et en lui laissant au moins 20 secondes pour prolonger d’un geste simple, au moins dix fois.

Pour que Sam soit réellement averti, son lecteur d’écran doit annoncer l’avertissement (par exemple grâce à \`role="alert"\`), pas seulement l’afficher.`,
      takeaway: 'Tout délai imposé doit pouvoir être prolongé d’un geste simple, avec un avertissement annoncé et sans perte de saisie.',
      sources: ['imp:critique', { label: 'W3C — Comprendre le critère 2.2.1 (délai réglable)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html' }],
    },
    {
      id: 'personas-mobile-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les trois signaux d’alerte pour Casey sur cet écran de location de vélo.',
      visual: {
        frame: 'phone',
        alt: 'Application de location de vélos : en-tête avec un petit lien Valider dans l’angle, carte avec des repères, fiche de la station Bellecour, rangée de quatre très petites icônes serrées, avertissement « Ne quittez pas l’application : la réservation serait annulée », barre d’onglets libellée.',
        css: `.vl-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; border-bottom: 1px solid #e3e6ec; }
.vl-ok { font-size: 12px; font-weight: 600; color: #1f4fd8; }
.vl-map { position: relative; height: 120px; background: linear-gradient(135deg, #dfe8f1 0%, #eef3f7 60%, #e3ece4 100%); }
.vl-road { position: absolute; background: #fff; }
.vl-pin { position: absolute; width: 22px; height: 22px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); background: #1f4fd8; border: 2px solid #fff; }
.vl-station { padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.vl-tiny { display: flex; gap: 2px; }
.vl-tiny span { width: 18px; height: 18px; display: grid; place-items: center; border-radius: 4px; background: #eef1f7; color: #36405a; }
.vl-warn { display: flex; gap: 6px; align-items: flex-start; padding: 8px 10px; border-radius: 8px; background: #fff4d6; color: #5c4400; font-size: 12px; font-weight: 600; }
.vl-tabs { font-size: 11px; }`,
        html: `<div class="vl-head"><span class="mk-strong" data-hotspot="title">Réserver un vélo</span><span class="vl-ok" data-hotspot="validate">Valider</span></div>
<div class="vl-map" data-hotspot="map"><span class="vl-road" style="left:0;right:0;top:52px;height:10px"></span><span class="vl-road" style="top:0;bottom:0;left:120px;width:10px"></span><span class="vl-pin" style="left:96px;top:24px"></span><span class="vl-pin" style="left:190px;top:70px"></span></div>
<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="vl-station" data-hotspot="station"><p class="mk-strong">Station Bellecour</p><p class="mk-small mk-muted">7 vélos dont 3 électriques · à 120&nbsp;m</p></div>
  <div class="mk-row mk-between"><span class="mk-small mk-muted">Options</span><div class="vl-tiny" data-hotspot="tiny"><span><i data-icon="bike" style="--ico:12px"></i></span><span><i data-icon="zap" style="--ico:12px"></i></span><span><i data-icon="lock" style="--ico:12px"></i></span><span><i data-icon="heart" style="--ico:12px"></i></span></div></div>
  <p class="vl-warn" data-hotspot="warn"><i data-icon="triangle-alert" style="--ico:14px"></i> Ne quittez pas l’application : la réservation serait annulée.</p>
</div>
<div class="mk-tabbar vl-tabs" data-hotspot="tabs"><span class="on"><i data-icon="map-pin" style="--ico:20px"></i>Carte</span><span><i data-icon="ticket" style="--ico:20px"></i>Trajets</span><span><i data-icon="user" style="--ico:20px"></i>Profil</span></div>`,
      },
      hotspots: [
        { id: 'validate', label: 'Lien « Valider » dans l’angle de l’en-tête', correct: true, why: 'L’action principale est un petit lien tout en haut de l’écran, loin de la zone du pouce : il faut changer de prise ou utiliser l’autre main.' },
        { id: 'tiny', label: 'Quatre icônes de 18 px collées', correct: true, why: 'Des cibles de 18 px séparées de 2 px : bien en dessous des 44 × 44 pt recommandés, et trop serrées pour un pouce en mouvement.' },
        { id: 'warn', label: '« Ne quittez pas l’application »', correct: true, why: 'Casey change d’appli sans cesse. L’état doit survivre à l’interruption ; un avertissement ne remplace pas la persistance.' },
        { id: 'title', label: 'Titre de l’écran', correct: false, why: 'Le titre dit clairement ce que l’on fait ; c’est le lien Valider, à côté, qui pose problème.' },
        { id: 'map', label: 'Carte', correct: false, why: 'La carte situe les stations d’un coup d’œil : c’est le cœur de la tâche. Elle peut peser lourd, mais rien n’indique ici un chargement lent ; le signal d’alerte serait de la recharger à chaque écran, pas de l’afficher.' },
        { id: 'station', label: 'Fiche de la station', correct: false, why: 'Nom, disponibilité et distance : l’essentiel, lisible en marchant.' },
        { id: 'tabs', label: 'Barre d’onglets', correct: false, why: 'Dans le bas de l’écran, libellée, avec des cibles larges : adaptée à une main.' },
      ],
      explanation: `Trois signaux d’alerte de Casey sur un seul écran :

- **l’action principale hors de portée du pouce** : un petit lien dans l’en-tête, la zone la plus difficile à atteindre d’une main ;
- **des cibles minuscules et serrées** : 18 px séparés de 2 px, loin des 44 × 44 pt recommandés ;
- **une progression perdue à l’interruption** : l’appli avoue qu’elle ne sait pas conserver la réservation.

Le correctif : un bouton « Réserver ce vélo » pleine largeur dans le bas de l’écran, des options en grandes pastilles, et une réservation qui survit à un changement d’appli.`,
      takeaway: 'Pour Casey : action principale dans la zone du pouce, cibles d’au moins 44 × 44 pt, et un état qui survit quand on quitte l’appli.',
      sources: ['imp:critique', HOOBER, 'hig'],
    },
    {
      id: 'personas-jordan-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les deux signaux d’alerte qui feront abandonner Jordan, le novice.',
      visual: {
        frame: 'browser',
        alt: 'Logiciel de gestion de contacts : barre latérale faite de cinq icônes sans libellé, titre Contacts, bouton Importer des contacts, champ de recherche, message d’erreur « Échec du mapping CSV : erreur 422 (champ email_addr non résolu) » et liste de contacts avec un bouton Supprimer sur chaque ligne.',
        css: `.cr { display: flex; align-items: stretch; min-height: 100%; }
.cr-side { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 14px 10px; background: #1d2230; color: #c9d2e1; }
.cr-side .on { color: #fff; }
.cr-err { display: flex; gap: 8px; align-items: flex-start; padding: 8px 12px; border-radius: 8px; background: #fdecea; color: #8c1d18; font-size: 13px; font-weight: 600; }
.cr-err .mk-ico { margin-top: 2px; }
.cr-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #eceef2; }`,
        html: `<div class="cr">
  <div class="cr-side" data-hotspot="sidebar"><i data-icon="house" style="--ico:18px"></i><i class="on" data-icon="users" style="--ico:18px"></i><i data-icon="mail" style="--ico:18px"></i><i data-icon="chart-column" style="--ico:18px"></i><i data-icon="settings" style="--ico:18px"></i></div>
  <div class="mk-grow mk-pad mk-stack" style="--gap:12px">
    <div class="mk-row mk-between mk-wrap" style="--gap:8px"><p class="mk-h2" data-hotspot="title">Contacts</p><span class="mk-btn mk-btn--s" data-hotspot="import"><i data-icon="upload" style="--ico:15px"></i> Importer des contacts</span></div>
    <div class="mk-field" data-hotspot="search"><span class="mk-label">Rechercher un contact</span><div class="mk-input" style="display:flex;align-items:center;gap:6px"><i data-icon="search" style="--ico:15px"></i><span class="mk-muted">Nom, entreprise, e&#8209;mail…</span></div></div>
    <p class="cr-err" data-hotspot="error"><i data-icon="circle-alert" style="--ico:15px"></i> Échec du mapping CSV : erreur 422 (champ email_addr non résolu)</p>
    <div data-hotspot="rows"><div class="cr-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Nadia Benali</p><p class="mk-small mk-muted">Atelier Céramique Sud</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Supprimer</span></div><div class="cr-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Paul Girard</p><p class="mk-small mk-muted">Girard &amp; Fils</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Supprimer</span></div></div>
  </div>
</div>`,
      },
      hotspots: [
        { id: 'sidebar', label: 'Navigation en icônes seules', correct: true, why: 'Cinq pictogrammes sans libellé : Jordan doit deviner où mène chacun, ou n’ose pas cliquer.' },
        { id: 'error', label: 'Message « mapping CSV, erreur 422 »', correct: true, why: 'Jargon technique sans explication : Jordan ne sait ni ce qui a échoué ni quoi faire. Il faudrait : « La colonne des adresses e-mail est introuvable dans votre fichier. Vérifiez qu’elle s’appelle E-mail. »' },
        { id: 'rows', label: 'Suppression ligne par ligne', correct: false, why: 'Vrai problème, mais pour Alex, qui voudrait sélectionner plusieurs contacts d’un coup. Jordan, lui, supprime rarement en masse.' },
        { id: 'title', label: 'Titre de la page', correct: false, why: 'Le titre dit clairement où l’on est.' },
        { id: 'import', label: 'Bouton « Importer des contacts »', correct: false, why: 'Icône et verbe explicite : l’action est compréhensible.' },
        { id: 'search', label: 'Champ de recherche', correct: false, why: 'Étiquette visible et exemple de ce qu’on peut chercher : parfait pour un novice.' },
      ],
      explanation: `Pour Jordan, l’interface doit s’expliquer d’elle-même :

- une **barre latérale en icônes seules** l’oblige à deviner ou à survoler chaque pictogramme ;
- un **message technique** (« mapping », « erreur 422 », « email_addr ») ne lui dit ni ce qui ne va pas, ni quoi faire.

La suppression ligne par ligne est un vrai défaut, mais celui d’Alex. Attribuer chaque signal au bon persona aide à prioriser selon le public réel de l’écran.`,
      takeaway: 'Les signaux d’alerte de Jordan : icônes sans libellé, jargon, aide absente, suite ambiguë, succès non confirmé.',
      sources: ['imp:critique'],
    },
    {
      id: 'personas-match',
      type: 'match',
      difficulty: 3,
      prompt: 'Associe chaque type d’interface aux personas à choisir en priorité.',
      leftTitle: 'Interface',
      rightTitle: 'Personas',
      pairs: [
        { id: 'dashboard', left: 'Tableau de bord d’administration', right: 'Alex et Sam' },
        { id: 'onboarding', left: 'Parcours d’onboarding au premier lancement', right: 'Jordan et Casey' },
        { id: 'wizard', left: 'Formulaire en plusieurs étapes', right: 'Jordan, Sam et Casey' },
        { id: 'landing', left: 'Page d’accueil marketing', right: 'Jordan, Riley et Casey' },
      ],
      explanation: `Le tableau de sélection d’impeccable associe chaque type d’interface aux défaillances les plus probables :

- **Tableau de bord, administration** (et interfaces riches en données) : Alex et Sam — usage intensif, efficacité, navigation au clavier.
- **Onboarding** : Jordan et Casey — confusion et interruptions.
- **Formulaires, assistants** : Jordan, Sam et Casey — clarté, accessibilité, mobile.
- **Page d’accueil, marketing** : Jordan, Riley et Casey — premières impressions, confiance, mobile. Le tunnel de commande e-commerce appelle le même trio, pour d’autres raisons : mobile, cas limites, clarté.

Deux ou trois personas bien choisis valent mieux que cinq survolés.`,
      takeaway: 'Choisis les personas selon le type d’interface : Alex et Sam pour l’administration, Jordan et Casey pour l’onboarding, Jordan, Sam et Casey pour les formulaires.',
      sources: ['imp:critique'],
    },
    {
      id: 'personas-who-alex',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel persona abandonne le premier sur cet écran ?',
      context: 'Il faut archiver les 60 produits de la collection d’hiver.',
      visual: {
        frame: 'browser',
        alt: 'Liste de 142 produits avec un bouton Archiver sur chaque ligne ; une fenêtre de confirmation « Archiver « Bougie Cèdre 220 g » ? » s’ouvre par-dessus.',
        css: `.pa-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #eceef2; }`,
        html: `<div style="position:relative"><div class="mk-pad mk-stack" style="--gap:8px"><div class="mk-row mk-between"><p class="mk-h2">Produits</p><span class="mk-small mk-muted">142 produits</span></div><div class="pa-row"><div class="mk-img" style="--ratio:1;width:36px"></div><div class="mk-grow"><p class="mk-strong">Bougie Cèdre 220&nbsp;g</p><p class="mk-small mk-muted">Hiver 2025 · 24,00&nbsp;€</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Archiver</span></div><div class="pa-row"><div class="mk-img" style="--ratio:1;width:36px"></div><div class="mk-grow"><p class="mk-strong">Bougie Figue noire</p><p class="mk-small mk-muted">Hiver 2025 · 24,00&nbsp;€</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Archiver</span></div><div class="pa-row"><div class="mk-img" style="--ratio:1;width:36px"></div><div class="mk-grow"><p class="mk-strong">Diffuseur Ambre</p><p class="mk-small mk-muted">Hiver 2025 · 32,00&nbsp;€</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Archiver</span></div><div class="pa-row"><div class="mk-img" style="--ratio:1;width:36px"></div><div class="mk-grow"><p class="mk-strong">Savon Verveine</p><p class="mk-small mk-muted">Été 2025 · 9,50&nbsp;€</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Archiver</span></div></div><div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:10px"><p class="mk-h3">Archiver « Bougie Cèdre 220&nbsp;g » ?</p><p class="mk-small mk-muted">Vous pourrez le restaurer depuis les archives.</p><div class="mk-row" style="justify-content:flex-end;--gap:8px"><span class="mk-btn mk-btn--ghost mk-btn--s">Annuler</span><span class="mk-btn mk-btn--s">Archiver</span></div></div></div></div>`,
      },
      options: [
        { id: 'alex', label: 'Alex, l’expert pressé', why: 'Soixante produits un par un, avec une confirmation à chaque fois pour une action réversible : Alex cherche en vain la sélection multiple.' },
        { id: 'jordan', label: 'Jordan, le novice', why: 'Chaque étape est claire et libellée ; la confirmation le rassure plutôt.' },
        { id: 'sam', label: 'Sam, au clavier et au lecteur d’écran', why: 'Rien ici ne signale un défaut d’accès : boutons nommés, dialogue aux actions explicites.' },
        { id: 'riley', label: 'Riley, le testeur de cas limites', why: 'Riley cherchera des cas extrêmes, mais ce n’est pas ce qui bloque cette tâche répétitive.' },
      ],
      answer: 'alex',
      explanation: `Archiver soixante produits un par un, avec une fenêtre de confirmation à chaque fois, cumule deux signaux d’alerte d’Alex : le **traitement élément par élément** là où le lot serait naturel, et la **confirmation redondante** pour une action sans risque, puisqu’on peut restaurer depuis les archives.

Le correctif : des cases à cocher, un filtre par collection, une action groupée « Archiver la sélection », et une annulation après coup plutôt qu’une confirmation préalable.`,
      takeaway: 'Pour Alex : des actions groupées là où le lot est naturel, et pas de confirmation pour une action réversible.',
      sources: ['imp:critique'],
    },
    {
      id: 'personas-who-riley',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel persona débusque ces défauts en premier ?',
      visual: {
        frame: 'phone',
        alt: 'Page de profil : un nom très long coupé net au milieu d’un mot, une adresse elle aussi coupée, et une section « Mes commandes » qui affiche seulement « Aucune donnée. »',
        css: `.rp-card { display: flex; align-items: center; gap: 10px; padding: 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.rp-cut { white-space: nowrap; overflow: hidden; }
.rp-name { font-weight: 700; font-size: 15px; }`,
        html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h2">Mon profil</p><div class="rp-card"><span class="mk-avatar"></span><div class="mk-grow"><p class="rp-name rp-cut">Maximilienne-Éléonore de La Tour d’Auvergne-Lauragais</p><p class="mk-small mk-muted rp-cut">12 bis, chemin des Grandes-Terres-Hautes du Vallon</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Modifier</span></div><p class="mk-h3">Mes commandes</p><p class="mk-muted">Aucune donnée.</p></div>`,
      },
      options: [
        { id: 'riley', label: 'Riley, le testeur de cas limites', why: 'Riley entre exprès des noms très longs et regarde les listes vides : le nom tronqué et « Aucune donnée » sont exactement ses signaux d’alerte.' },
        { id: 'jordan', label: 'Jordan, le novice', why: '« Aucune donnée » le laisserait sans suite, mais c’est Riley qui provoque ces cas en entrant des données extrêmes.' },
        { id: 'alex', label: 'Alex, l’expert pressé', why: 'Alex n’a ni raccourci ni lot à réclamer ici ; ces défauts ne gênent pas sa vitesse.' },
        { id: 'casey', label: 'Casey, sur mobile', why: 'L’écran est sur mobile, mais le défaut vient des données extrêmes, pas de la prise en main.' },
      ],
      answer: 'riley',
      explanation: `Riley teste ce que les maquettes oublient : un nom de plus de 50 caractères, une adresse interminable, un historique vide. L’écran échoue aux deux épreuves : le texte est coupé net, sans points de suspension ni retour à la ligne, et « Aucune donnée » n’explique rien ni ne propose de suite.

Le correctif relève de \`harden\` : laisser le nom passer à la ligne, et transformer l’état vide en invitation, par exemple « Vous n’avez pas encore commandé · Découvrir la boutique ».`,
      takeaway: 'Teste avec des données extrêmes (textes très longs, listes vides, caractères spéciaux) : l’interface doit rester propre et utile.',
      sources: ['imp:critique', 'imp:harden'],
    },
    {
      id: 'personas-sam-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquels de ces signaux d’alerte concernent d’abord Sam ?',
      options: [
        { id: 'drag', label: 'Un classement des tâches au glisser-déposer, sans autre moyen', why: 'Impossible au clavier : Sam ne peut pas réordonner ses tâches.' },
        { id: 'color', label: 'Des statuts « payé » et « en retard » signalés seulement en vert et en rouge', why: 'Le sens porté par la seule couleur échappe aux daltoniens et au lecteur d’écran.' },
        { id: 'name', label: 'Un bouton loupe sans nom accessible', why: 'Le lecteur d’écran annonce « bouton », sans dire lequel.' },
        { id: 'tour', label: 'Une visite guidée impossible à passer', why: 'Signal d’alerte d’Alex, qui veut aller droit au but.' },
        { id: 'top', label: 'Le bouton principal tout en haut d’un écran mobile', why: 'Signal d’alerte de Casey, qui tient son téléphone d’une main.' },
        { id: 'empty', label: 'Un état vide « Aucun résultat » sans suggestion', why: 'Signal d’alerte de Riley : un état vide qui n’aide pas.' },
      ],
      answers: ['drag', 'color', 'name'],
      explanation: `Les signaux d’alerte de Sam portent sur l’**accès** lui-même :

- une interaction **au glisser-déposer seulement** est inutilisable au clavier — et WCAG 2.2 demande en plus une alternative sans glisser pour la souris ou le doigt (2.5.7) ;
- un statut porté **par la seule couleur** échappe aux personnes qui distinguent mal le rouge du vert, et n’est pas restitué par le lecteur d’écran sans texte ;
- un **bouton sans nom accessible** est annoncé « bouton », tout court.

Les trois autres signaux sont réels, mais ils appartiennent à Alex, Casey et Riley.`,
      takeaway: 'Sam a besoin d’un accès complet au clavier, d’informations qui ne dépendent pas de la couleur et d’éléments tous nommés.',
      sources: ['imp:critique', 'wcag22'],
    },
    {
      id: 'personas-riley-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquels de ces signaux d’alerte concernent d’abord Riley ?',
      options: [
        { id: 'silent', label: 'Un message « Enregistré » s’affiche, mais la liste montre toujours l’ancienne valeur', why: 'Une fonction qui semble marcher mais échoue en silence : Riley vérifie ce qui s’est réellement passé, pas seulement le message.' },
        { id: 'refresh', label: 'Un formulaire en trois étapes qui repart de zéro quand on rafraîchit la page', why: 'Riley rafraîchit exprès en plein parcours : des données perdues au rafraîchissement font partie de ses signaux d’alerte.' },
        { id: 'inconsistent', label: 'Supprimer envoie à la corbeille sur un écran, mais efface définitivement sur un autre', why: 'Deux interactions semblables, deux comportements : Riley compare méthodiquement les différentes parties de l’interface.' },
        { id: 'help', label: 'Aucune aide visible au moment de choisir une formule', why: 'Signal d’alerte de Jordan, qui cherche de l’aide à chaque décision.' },
        { id: 'typing', label: 'Un long champ de texte là où trois choix suffiraient', why: 'Signal d’alerte de Casey, qui tape le moins possible.' },
        { id: 'shortcuts', label: 'Aucun raccourci clavier pour les actions courantes', why: 'Signal d’alerte d’Alex, qui veut aller vite.' },
      ],
      answers: ['silent', 'refresh', 'inconsistent'],
      explanation: `Riley sort exprès du chemin idéal, puis vérifie que l’interface fait bien ce qu’elle annonce :

- un « Enregistré » démenti par la liste est un **échec silencieux** : tout semble avoir marché, et l’erreur ne se découvre que plus tard ;
- un formulaire qui se vide au rafraîchissement **perd des données** que la personne croyait acquises ;
- deux boutons Supprimer aux effets différents forment une **incohérence** : on ne peut plus prévoir ce que fera une action.

Les trois autres signaux sont réels, mais ils appartiennent à Jordan, Casey et Alex.`,
      takeaway: 'Riley vérifie que l’interface tient ses promesses : aucun échec silencieux, aucune donnée perdue au rafraîchissement, le même effet pour des actions semblables.',
      sources: ['imp:critique', 'imp:harden'],
    },
    {
      id: 'personas-method-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Remets dans l’ordre la méthode de test par personas.',
      items: [
        { id: 'type', label: 'Identifier le type d’interface (tableau de bord, tunnel de commande…)' },
        { id: 'select', label: 'Choisir deux ou trois personas dans le tableau de sélection' },
        { id: 'walk', label: 'Dérouler l’action principale dans la peau de chacun' },
        { id: 'flags', label: 'Noter les signaux d’alerte précis : élément et interaction qui échouent' },
      ],
      explanation: `La méthode d’impeccable va du général au précis :

1. Le **type d’interface** détermine les défaillances probables.
2. Il guide le **choix de deux ou trois personas**, pas cinq.
3. On **parcourt l’action principale** dans leur peau, pas l’écran en général.
4. On note des **signaux d’alerte nommés** : « le bouton Payer est hors de portée du pouce ».`,
      takeaway: 'Type d’interface, deux ou trois personas, action principale parcourue dans leur peau, signaux d’alerte précis : la méthode tient en quatre temps.',
      sources: ['imp:critique'],
    },
    {
      id: 'personas-invent-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Quand le contexte du projet ne dit rien du public, mieux vaut inventer un persona propre au projet, plausible, que de s’en tenir aux cinq archétypes.',
      answer: false,
      explanation: `Impeccable est explicite : on ne crée un persona propre au projet que lorsque le contexte produit décrit **réellement** le public, et on n’invente aucun détail. Sans contexte, on utilise les cinq archétypes.

Un persona inventé donne une fausse impression de connaître l’utilisateur, et ses détails imaginaires (âge, goûts, applis préférées) orientent les décisions sur du vide. Le Nielsen Norman Group le rappelle : un persona est fictif, mais il doit s’appuyer sur des données sur de vraies personnes.`,
      takeaway: 'Un persona propre au projet se dérive d’un contexte réel ; sans données sur le public, garde les cinq archétypes.',
      sources: ['imp:critique', NNG_PERSONA],
    },
    {
      id: 'personas-five-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Pour un test sérieux, il faut passer chaque écran au crible des cinq personas.',
      answer: false,
      explanation: `Impeccable recommande de choisir **deux ou trois personas** pertinents pour le type d’interface : Alex et Sam pour un tableau de bord, Jordan et Casey pour un onboarding…

Passer les cinq sur chaque écran dilue l’attention et produit des remarques génériques. Mieux vaut deux parcours approfondis, avec des signaux d’alerte précis, que cinq survols.`,
      takeaway: 'Choisis deux ou trois personas selon le type d’interface, et parcours vraiment l’action principale avec chacun.',
      sources: ['imp:critique'],
    },
    {
      id: 'personas-project-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quel persona propre au projet ajouter aux cinq archétypes ?',
      context: 'Extrait du PRODUCT.md : « Utilisateurs : aides à domicile qui notent leurs interventions chez des personnes âgées, sur un téléphone fourni par l’employeur, souvent avec des gants et entre deux bus. Une partie de l’équipe lit difficilement le français écrit. »',
      options: [
        { id: 'derived', label: '« Nadia, aide à domicile » : note ses interventions entre deux bus, avec des gants, et lit difficilement le français ; décroche devant les cibles serrées, les longs textes et la saisie libre', why: 'Profil, comportements et signaux d’alerte sont tous dérivés du contexte : c’est le gabarit appliqué sans rien inventer.' },
        { id: 'casey', label: 'Aucun : Casey, distrait sur mobile, couvre déjà les trajets, les gants et la lecture difficile', why: 'Casey couvre l’usage mobile et distrait, pas les gants ni la lecture difficile : c’est précisément ce que le contexte ajoute.' },
        { id: 'invented', label: '« Nadia, 34 ans, passionnée de yoga, utilise surtout Instagram et préfère les thèmes sombres »', why: 'Âge, loisirs et applis préférées ne figurent pas dans le contexte : on n’invente pas de détails sur le public.' },
        { id: 'manager', label: '« Le directeur d’agence, qui consulte les rapports d’activité chaque semaine sur ordinateur »', why: 'Le contexte ne mentionne pas ce public : on dérive le persona de l’audience décrite, pas d’une hypothèse.' },
      ],
      answer: 'derived',
      explanation: `Le gabarit d’impeccable pour un persona propre au projet : **Profil** (2 ou 3 traits tirés du contexte), **Comportements** (3 ou 4), **Signaux d’alerte** (3 ou 4). On part de la description du public, et on cherche l’archétype principal **que les cinq personas ne couvrent pas**.

Ici, le contexte dépasse Casey. Avec des **gants**, le toucher devient imprécis, voire impossible avec certains modèles : le minimum de 44 × 44 pt, pensé pour un doigt nu, risque de ne plus suffire ; il faut des cibles plus grandes et des gestes simples. Surtout, aucun des cinq archétypes ne couvre la **lecture difficile du français** : elle exige des textes très courts, des icônes libellées et des choix plutôt que de la saisie. Le reste (âge, loisirs) n’est pas dans le contexte : l’ajouter, ce serait inventer.`,
      takeaway: 'Un persona propre au projet comble ce que les cinq archétypes ne couvrent pas, avec des traits tirés du contexte réel.',
      sources: ['imp:critique', NNG_PERSONA],
    },
  ],
};

export default personas;
