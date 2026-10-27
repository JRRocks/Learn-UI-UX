import type { ModuleContent, SourceRef } from '../../engine/types';

/** French punctuation inside mock markup: thin no-break space before ? ! ; » and after «, no-break space before :. */
const fr = (html: string) =>
  html.replace(/ ([?!;»])/g, ' $1').replace(/« /g, '« ').replace(/ :/g, ' :');

const NNG_CONFIRM: SourceRef = {
  label: 'Nielsen Norman Group — Confirmation Dialogs Can Prevent User Errors (If Not Overused)',
  url: 'https://www.nngroup.com/articles/confirmation-dialog/',
};
const NNG_PLACEHOLDER: SourceRef = {
  label: 'Nielsen Norman Group — Placeholders in Form Fields Are Harmful',
  url: 'https://www.nngroup.com/articles/form-design-placeholders/',
};
const NNG_ERRORS: SourceRef = {
  label: 'Nielsen Norman Group — Error-Message Guidelines',
  url: 'https://www.nngroup.com/articles/error-message-guidelines/',
};
const NNG_EMPTY: SourceRef = {
  label: 'Nielsen Norman Group — Designing Empty States in Complex Applications',
  url: 'https://www.nngroup.com/articles/empty-state-interface-design/',
};
const NNG_PROGRESS: SourceRef = {
  label: 'Nielsen Norman Group — Progress Indicators Make a Slow System Less Insufferable',
  url: 'https://www.nngroup.com/articles/progress-indicators/',
};
const WCAG_LINK: SourceRef = {
  label: 'W3C — Comprendre le critère 2.4.4 (fonction du lien selon le contexte)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html',
};
const WCAG_LINK_ONLY: SourceRef = {
  label: 'W3C — Comprendre le critère 2.4.9 (fonction du lien, lien uniquement ; niveau AAA)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html',
};
const WCAG_ERROR: SourceRef = {
  label: 'W3C — Comprendre le critère 3.3.3 (suggestion après une erreur)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html',
};
const CLDR_PLURALS: SourceRef = {
  label: 'Unicode CLDR — Règles de pluriel par langue',
  url: 'https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html',
};

/* ---------- Shared mock pieces ---------- */

const DIALOG_CSS = `
.dl-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 8px; }
.dl-row .mk-ico { color: #5a6172; }
.mk-dialog { width: min(100%, 340px); }
.dl-actions { justify-content: flex-end; flex-wrap: wrap; }
`;

const PROJECTS = `<div class="mk-pad mk-stack" style="--gap:8px">
  <p class="mk-h3">Projets</p>
  <div class="dl-row"><i data-icon="folder"></i>Refonte 2026</div>
  <div class="dl-row"><i data-icon="folder"></i>Catalogue été</div>
  <div class="dl-row"><i data-icon="folder"></i>Site recrutement</div>
  <div class="dl-row"><i data-icon="folder"></i>Rapport annuel</div>
</div>`;

const UPLOAD_CSS = `
.up-file { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 8px; }
.up-err { display: flex; gap: 10px; align-items: flex-start; padding: 10px 12px; border-radius: 8px; background: #fdecea; color: #8a1c14; }
.up-err .mk-ico { color: #b3261e; margin-top: 2px; }
`;

const CONFIRM_CSS = `
.cf { background: #f4f6f9; padding: 12px; }
.cf .mk-dialog { width: 100%; padding: 16px; box-shadow: 0 6px 18px rgb(15 20 35 / 0.12); }
.cf-actions { justify-content: flex-end; flex-wrap: wrap; }
`;

const confirm = (title: string, text: string, buttons: string) =>
  fr(`<div class="cf"><div class="mk-dialog mk-stack" style="--gap:10px">
  <p class="mk-h3">${title}</p>
  <p class="mk-muted">${text}</p>
  <div class="mk-row cf-actions" style="--gap:8px">${buttons}</div>
</div></div>`);

const INBOX_CSS = `
.ib-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px 6px; }
.ib-row { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-bottom: 1px solid #eceef2; }
.ib-row p { line-height: 1.3; }
.ib-av { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; font-size: 13px; font-weight: 700; color: #1f2a44; flex: none; }
.ib-toast { margin: 14px 12px 12px; }
.ib-toast .mk-btn--text { color: #9db8ff; margin-inline-start: auto; }
.ib-shade { position: relative; }
`;

const conv = (initials: string, bg: string, name: string, line: string, time: string) =>
  `<div class="ib-row"><span class="ib-av" style="background:${bg}">${initials}</span><div class="mk-grow"><p class="mk-strong">${name}</p><p class="mk-small mk-muted">${line}</p></div><span class="mk-small mk-muted">${time}</span></div>`;

const SEARCH_CSS = `
.srch { display: flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 12px; border-radius: 10px; background: #f0f2f6; }
.chip { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; border: 1px solid #c3c8d3; }
.chip.on { background: #e8eefc; border-color: #1f4fd8; color: #1f3a8a; }
`;

const LOADING_CSS = `
.ld { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 8px; background: #f4f6f9; }
.spin { width: 18px; height: 18px; border-radius: 50%; border: 2.5px solid #c9d2e1; border-top-color: #1f4fd8; flex: none; }
.ld-num { white-space: nowrap; }
`;

const invoice = (status: string) =>
  fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="mk-row mk-between mk-wrap" style="--gap:4px 10px"><p class="mk-h3">Facture <span class="ld-num">F-2026-0412</span></p><span class="mk-price">1&#8239;280,00&nbsp;€</span></div>
  <p class="mk-small mk-muted">Atelier Morel · échéance le 30 novembre</p>
  <div class="ld"><span class="spin"></span><span>${status}</span></div>
</div>`);

const uxWriting: ModuleContent = {
  id: 'ux-writing',
  title: 'Rédaction UX',
  category: 'corriger',
  summary:
    'Écrire des libellés, erreurs, états vides et confirmations qui disent ce qui se passe et quoi faire ensuite, dans une voix constante et des messages traduisibles.',
  minutes: 11,
  commands: ['clarify'],
  sources: ['imp:clarify', 'imp:craft-floor', 'imp:detector', 'imp:onboard', NNG_CONFIRM, NNG_ERRORS, NNG_PLACEHOLDER, WCAG_LINK_ONLY],
  sections: [
    {
      id: 'materiau',
      title: 'Le texte est un matériau de design',
      body: `Une interface parle à chaque instant : un bouton promet un résultat, une erreur explique une panne, un état vide dit quoi faire ensuite. Le plancher de qualité d’impeccable le résume ainsi : les contrôles **nomment leur action**, les erreurs **nomment le problème et la sortie**.

Avant de réécrire une phrase, lis **tout le parcours** : un libellé isolé ne dit pas s’il contredit l’écran suivant. Repère :

- les noms et verbes ambigus, le jargon interne, les états flous (« Traitement en cours ») ;
- les conséquences, délais ou moyens de récupération qui manquent ;
- les termes et les majuscules qui changent d’un écran à l’autre ;
- les titres, introductions et confirmations qui répètent la même idée ;
- un ton qui ignore le stress, le risque ou l’urgence du moment.

Ne change ni un fait, ni un sens juridique, ni un terme métier sans le faire valider par qui en est responsable : une reformulation plus fluide peut modifier un engagement.

Puis, pour chaque état, décide dans cet ordre : **le fait** dont la personne a besoin maintenant, **l’action** possible ensuite, le **contexte** qui change sa décision, et le **ton** juste. Dis chaque idée une fois : si le titre explique déjà l’état, l’introduction apporte du neuf ou disparaît.

> Le texte final est aussi court que possible, mais jamais au prix du sens ou de la sortie de secours.`,
    },
    {
      id: 'actions',
      title: 'Des actions qui disent ce qu’elles font',
      body: `Un bouton se lit souvent seul, d’un coup d’œil. Son libellé décrit donc **le résultat**, pas le geste :

- **Verbe + objet** quand le résultat n’est pas évident : « Enregistrer le brouillon », « Envoyer la candidature », « Payer 89,00 € ». Pas « Cliquez ici » ni « Appuyez ».
- **Un concept, un mot** : si le produit dit « Archiver » ici, il ne dit pas « Ranger » ailleurs.
- **« Valider »**, l’équivalent français du *Submit* anglais, ne dit pas ce qui va se passer : payer ? envoyer ? enregistrer ? Nomme le résultat à la place.

Pour une **action destructrice**, nomme l’objet et la conséquence : « Supprimer le projet “Refonte 2026” ? Ses 48 fichiers seront supprimés pour toute l’équipe. »

- Quand la récupération est sûre (archiver, déplacer, masquer), **préfère l’annulation à la confirmation** : exécute l’action et propose « Annuler » quelques secondes. Une confirmation affichée à chaque fois finit par être acceptée par réflexe, sans être lue.
- Quand une confirmation s’impose (suppression définitive, gros paiement), **répète l’action sur le bouton** : « Supprimer le projet » face à « Annuler », jamais « Oui / Non », « OK » ou « Valider ».`,
      examples: [
        {
          title: 'Une confirmation qui dit ce qu’elle confirme',
          bad: {
            alt: 'Boîte de dialogue au-dessus d’une liste de projets : titre « Êtes-vous sûr ? », texte « Cette action est irréversible. », boutons « Non » et « Oui ».',
            height: 330,
            html:
              PROJECTS +
              fr(`<div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:10px">
  <p class="mk-h3">Êtes-vous sûr ?</p>
  <p class="mk-muted">Cette action est irréversible.</p>
  <div class="mk-row dl-actions" style="--gap:8px"><span class="mk-btn mk-btn--ghost mk-btn--s">Non</span><span class="mk-btn mk-btn--s">Oui</span></div>
</div></div>`),
            css: DIALOG_CSS,
          },
          badNote: 'Rien ne dit ce qui sera supprimé : on répond « Oui » par réflexe.',
          good: {
            alt: 'Même liste avec une boîte de dialogue « Supprimer le projet “Refonte 2026” ? », qui précise que 48 fichiers et les commentaires seront supprimés pour toute l’équipe, boutons « Annuler » et « Supprimer le projet ».',
            height: 330,
            html:
              PROJECTS +
              fr(`<div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:10px">
  <p class="mk-h3">Supprimer le projet « Refonte 2026 » ?</p>
  <p class="mk-muted">Ses 48 fichiers et tous les commentaires seront supprimés pour toute l’équipe. Cette action est définitive.</p>
  <div class="mk-row dl-actions" style="--gap:8px"><span class="mk-btn mk-btn--ghost mk-btn--s">Annuler</span><span class="mk-btn mk-btn--danger mk-btn--s">Supprimer le projet</span></div>
</div></div>`),
            css: DIALOG_CSS,
          },
          goodNote: 'L’objet, la conséquence, et l’action répétée sur le bouton.',
        },
      ],
    },
    {
      id: 'formulaires',
      title: 'Formulaires : étiquettes, aide et validation',
      body: `- **Des étiquettes persistantes.** Le texte indicatif (*placeholder*) est un exemple, pas une étiquette : il disparaît à la première lettre, il est souvent trop pâle et il fait croire à un champ déjà rempli. Une fois le formulaire rempli, plus personne ne sait ce que contenait chaque champ.
- **Les exigences avant l’envoi.** Format, longueur et conditions s’affichent avant que la personne se trompe (« 8 caractères minimum, dont un chiffre »), pas seulement dans l’erreur.
- **Dire pourquoi** une information est demandée, seulement quand ce n’est pas évident : « Le livreur t’appelle en cas d’absence » sous un numéro de téléphone.
- **Obligatoire et facultatif** se signalent toujours de la même façon dans tout le produit.
- **Le texte d’aide répond à une question implicite** (quel format ? à quoi ça sert ? qui le verra ?) au lieu de répéter l’étiquette. « Saisissez votre adresse e-mail » sous « Adresse e-mail » n’apprend rien. Le détail rare passe en **divulgation progressive** : l’essentiel reste visible, le reste attend derrière un lien « Détails » ou une section repliable.

La **validation** dit ce qui demande de l’attention et comment le corriger, sans accuser : « Ajoute au moins un chiffre » plutôt que « Mot de passe invalide ». Elle se place près du champ et s’annonce aux lecteurs d’écran.`,
      examples: [
        {
          title: 'Des étiquettes qui restent',
          bad: {
            alt: 'Formulaire d’adresse de livraison sans étiquettes : trois champs remplis (un nom, une rue, un code postal) et trois champs avec un texte indicatif gris très pâle.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Adresse de livraison</p>
  <div class="mk-input">Camille Durand</div>
  <div class="mk-input">12 rue des Lilas</div>
  <div class="mk-input fm-ph">Complément d’adresse</div>
  <div class="mk-grid" style="--cols:2;--gap:8px"><div class="mk-input">75011</div><div class="mk-input fm-ph">Ville</div></div>
  <div class="mk-input fm-ph">Téléphone</div>
  <span class="mk-btn mk-btn--block">Continuer</span>
</div>`),
            css: `.fm-ph { color: #a3a8b3; }`,
          },
          badNote: 'Une fois remplis, les champs perdent leur nom ; les indications grises sont à peine lisibles.',
          good: {
            alt: 'Même formulaire avec une étiquette au-dessus de chaque champ et un champ marqué facultatif ; les indications sont écrites sous les étiquettes, hors des champs encore vides : le contenu attendu du complément d’adresse, un exemple de numéro et la raison pour laquelle on le demande.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Adresse de livraison</p>
  <div class="mk-field"><span class="mk-label">Nom complet</span><div class="mk-input">Camille Durand</div></div>
  <div class="mk-field"><span class="mk-label">Adresse</span><div class="mk-input">12 rue des Lilas</div></div>
  <div class="mk-field"><span class="mk-label">Complément d’adresse <span class="fm-opt">(facultatif)</span></span><span class="mk-help">Bâtiment, étage, digicode</span><div class="mk-input"></div></div>
  <div class="mk-grid" style="--cols:2;--gap:8px"><div class="mk-field"><span class="mk-label">Code postal</span><div class="mk-input">75011</div></div><div class="mk-field"><span class="mk-label">Ville</span><div class="mk-input">Paris</div></div></div>
  <div class="mk-field"><span class="mk-label">Téléphone</span><span class="mk-help">Ex. : 06&nbsp;12&nbsp;34&nbsp;56&nbsp;78. Le livreur t’appelle en cas d’absence.</span><div class="mk-input"></div></div>
  <span class="mk-btn mk-btn--block">Continuer vers le paiement</span>
</div>`),
            css: `.fm-opt { font-weight: 400; color: #5a6172; }`,
          },
          goodNote: 'Étiquettes persistantes, exemple et aide hors des champs, toujours visibles : rien ne passe pour une valeur déjà saisie.',
        },
      ],
    },
    {
      id: 'erreurs',
      title: 'Erreurs : quoi, pourquoi, comment s’en sortir',
      body: `Un message d’erreur utile répond à trois questions, dans cet ordre :

1. **Qu’est-ce qui a échoué ?** « Rapport-annuel.pdf n’a pas été envoyé. »
2. **Pourquoi**, quand on le sait et que c’est utile : « Il fait 31 Mo, la limite est de 25 Mo. »
3. **Comment s’en sortir**, ou quelle autre voie reste : « Compresse le PDF ou partage-le par lien. »

- **Pas de code interne en message principal** : « Erreur 413 » n’aide personne. Le code peut figurer en petit, pour le support.
- **Ne promets pas une cause ou une solution que le système ignore** : « Le serveur est en maintenance » est faux si la requête a simplement expiré.
- **N’accuse pas** : « Tu as saisi une date invalide » devient « Indique une date au format JJ/MM/AAAA ».
- **Visible et proche** : le message s’affiche à côté de l’élément en cause, avec un texte et une icône, pas seulement une couleur.
- **Prends au sérieux** la vie privée, le paiement, la suppression, la perte d’accès et le travail bloqué : la chaleur est bienvenue, les blagues non.`,
      examples: [
        {
          title: 'Une erreur qui laisse une sortie',
          bad: {
            alt: 'Envoi d’un fichier « Rapport-annuel.pdf » de 31 Mo, avec un bandeau rouge « Erreur 413 : PAYLOAD_TOO_LARGE ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Ajouter un document</p>
  <div class="up-file"><i data-icon="file-text"></i><span class="mk-grow">Rapport-annuel.pdf</span><span class="mk-small mk-muted">31 Mo</span></div>
  <div class="up-err"><i data-icon="circle-alert"></i><span>Erreur 413 : PAYLOAD_TOO_LARGE</span></div>
</div>`),
            css: UPLOAD_CSS,
          },
          badNote: 'Un code technique : ni la cause en clair, ni la marche à suivre.',
          good: {
            alt: 'Même envoi avec un message qui dit que le fichier n’a pas été envoyé, qu’il dépasse la limite de 25 Mo, comment s’en sortir, deux boutons d’action et le code en petit pour le support.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Ajouter un document</p>
  <div class="up-file"><i data-icon="file-text"></i><span class="mk-grow">Rapport-annuel.pdf</span><span class="mk-small mk-muted">31 Mo</span></div>
  <div class="up-err"><i data-icon="circle-alert"></i><div class="mk-stack" style="--gap:2px"><p class="mk-strong">Rapport-annuel.pdf n’a pas été envoyé</p><p>Il fait 31 Mo ; la limite est de 25 Mo. Compresse le PDF ou partage-le par lien.</p></div></div>
  <div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn mk-btn--s">Choisir un autre fichier</span><span class="mk-btn mk-btn--ghost mk-btn--s">Partager un lien</span></div>
  <p class="mk-small mk-muted">Code pour le support : 413</p>
</div>`),
            css: UPLOAD_CSS,
          },
          goodNote: 'Quoi, pourquoi, comment s’en sortir ; le code reste disponible, en second plan.',
        },
      ],
    },
    {
      id: 'etats',
      title: 'Chargement, vide, succès',
      body: `**Chargement.** Le texte nomme l’opération réelle (« Génération du PDF… ») et donne une attente honnête quand elle compte (« environ 10 secondes »). Montre une progression déterminée quand elle existe ; **n’invente jamais de progression**.

**État vide.** « Aucun élément » ne dit pas *pourquoi* c’est vide. Distingue les cas, car chacun appelle une action différente :

- **Premier usage** : ce qui apparaîtra ici, à quoi ça sert, comment commencer.
- **Aucun résultat** : rappelle la recherche, propose une correction ou une recherche plus large.
- **Filtres** : dis combien de filtres sont actifs et propose de les effacer.
- **Accès refusé** : explique qui a accès et comment le demander.
- **Panne** : ce qui n’a pas pu se charger, et « Réessayer ».

**Succès.** Confirme le résultat (« Virement de 120 € envoyé à Marc »). Mentionne la conséquence suivante seulement si elle change ce que la personne doit faire (« Il arrivera lundi »). Un succès de routine reste bref ; il peut se passer de message quand le changement se voit déjà à l’écran (interrupteur basculé, élément coché).`,
      examples: [
        {
          title: 'Un premier usage qui guide',
          bad: {
            alt: 'Page « Factures » avec un en-tête de tableau vide et la mention grise « Aucune donnée ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2">Factures</p><span class="mk-btn mk-btn--s">Nouvelle</span></div>
  <div class="iv-head"><span>N°</span><span>Client</span><span>Montant</span><span>Statut</span></div>
  <p class="mk-center mk-muted" style="padding:32px 0">Aucune donnée</p>
</div>`),
            css: `.iv-head { display: grid; grid-template-columns: 1fr 2fr 1.2fr 1fr; gap: 8px; padding: 8px 0; border-bottom: 1px solid #e3e6ec; font-size: 12px; font-weight: 600; color: #5a6172; }`,
          },
          badNote: '« Aucune donnée » ne dit ni ce qui apparaîtra ici, ni par où commencer ; « Nouvelle », sans objet, ne dit pas quoi.',
          good: {
            alt: 'Page « Factures » avec une icône de document, le titre « Tes factures apparaîtront ici », une phrase d’explication et deux boutons « Créer une facture » et « Importer un fichier CSV ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2">Factures</p>
  <div class="mk-stack mk-center iv-empty" style="--gap:8px">
    <i data-icon="file-text" style="--ico:28px"></i>
    <p class="mk-h3">Tes factures apparaîtront ici</p>
    <p class="mk-muted">Crée ta première facture en deux minutes, ou importe celles de ton ancien outil.</p>
    <div class="mk-row mk-wrap" style="--gap:8px;justify-content:center"><span class="mk-btn">Créer une facture</span><span class="mk-btn mk-btn--ghost">Importer un fichier CSV</span></div>
  </div>
</div>`),
            css: `.iv-empty { align-items: center; padding: 12px 8px 4px; } .iv-empty .mk-ico { color: #1f4fd8; }`,
          },
          goodNote: 'Ce qui viendra, et deux façons de commencer.',
        },
      ],
    },
    {
      id: 'voix',
      title: 'Une voix constante, un ton qui s’adapte',
      body: `La **voix** est la personnalité du produit : elle reste la même partout. Le **ton** s’adapte au moment : léger pour un premier succès, sobre et précis pour un paiement refusé.

- **Langage simple**, sans aplatir les termes que le public connaît vraiment : les comptables savent ce qu’est un « lettrage », inutile de le remplacer par une périphrase.
- **Terminologie cohérente** : tiens un court glossaire dès que plusieurs personnes écrivent. En interface, on ne varie pas les mots pour le style ; si « projet », « dossier » et « board » désignent la même chose, la personne croit à trois choses différentes.
- **Tu ou vous** : en français, le registre fait partie de la voix. Banques, assurances et administrations vouvoient le plus souvent ; beaucoup d’applications grand public tutoient. Choisis selon ton public, puis **tiens-le partout** : écrans, e-mails, notifications, aide et support.

Le détecteur d’impeccable repère aussi quatre **tics du texte généré**, qui donnent une voix interchangeable. Ses règles de texte lisent l’anglais (*next-generation*, *Not a…*, *compliance theater*) ; seuls les tirets cadratins sont comptés quelle que soit la langue. En français, les mêmes réflexes trahissent le texte :

- le jargon marketing (« nouvelle génération », « révolutionner », « booster ») au lieu d’un verbe et d’un nom qui disent ce que fait le produit ;
- la cadence aphoristique répétée de section en section (« Pas un outil. Un allié. ») : une fois, ça passe ; c’est la répétition qui trahit ;
- le cadrage en « théâtre » (« fini le théâtre de la conformité ») au lieu de dire ce que la chose fait ou ne fait pas ;
- la saturation de tirets cadratins dans le corps du texte : virgules, deux-points et parenthèses font souvent mieux.`,
    },
    {
      id: 'traduction',
      title: 'Lisible par tous, traduisible partout',
      body: `Un texte d’interface sera lu à 200 % de zoom, par un lecteur d’écran, dans d’autres langues, avec des valeurs réelles. Écris pour ces conditions :

- **Des messages complets, pas des fragments concaténés.** \`"Vous avez " + n + " message"\` empêche de réordonner la phrase et d’accorder les mots à la traduction.
- **Des variables nommées et des pluriels gérés** par la bibliothèque d’internationalisation (ICU MessageFormat, \`Intl.PluralRules\`) : le français met 0 et 1 au singulier, l’anglais met 0 au pluriel, le polonais choisit sa forme selon la terminaison du nombre, l’arabe distingue six catégories.
- **De la place pour l’expansion** : une traduction allemande est souvent 30 % plus longue que l’anglais. Pas d’abréviation prématurée, pas de largeur fixe sur un bouton.
- **Des liens qui ont du sens hors contexte** : un lecteur d’écran peut lister tous les liens d’une page, et dix « En savoir plus » y sont indiscernables. Préfère « Consulter les délais de remboursement ».
- **Des noms accessibles** pour les commandes à icône seule. Pour les autres, le nom lu par le lecteur d’écran reprend le libellé visible : un bouton affiché « Envoyer la candidature » ne s’annonce pas « Soumettre ».
- **Un texte alternatif** qui transmet l’information d’une image (vide si elle est décorative), et jamais un message porté par la seule couleur, une icône ou une ponctuation.

Vérifie enfin avec de vrais contenus : noms très longs, montants, dates, pluriels, zoom à 200 %.`,
    },
  ],
  rules: [
    { id: 'label', front: 'Comment écrire le libellé d’un bouton ?', back: 'Un verbe et un objet qui décrivent le résultat quand il n’est pas évident : « Enregistrer le brouillon », « Payer 89,00 € ». Pas de « Cliquez ici » ; « OK » seulement pour refermer un message purement informatif.' },
    { id: 'valider', front: 'Pourquoi éviter « Valider » sur un bouton ?', back: 'C’est le *Submit* français : il ne dit pas ce qui va se passer. Nomme le résultat : « Envoyer la demande », « Payer 89,00 € ».' },
    { id: 'destructive', front: 'Que doit dire une confirmation de suppression ?', back: 'L’objet et la conséquence (« 40 fichiers supprimés définitivement »), et un bouton qui répète l’action : « Vider la corbeille » face à « Annuler ».' },
    { id: 'undo', front: 'Confirmer ou permettre d’annuler ?', back: 'Si la récupération est sûre, agis et propose « Annuler ». Réserve la confirmation aux actions irréversibles ou coûteuses, sinon elle devient un réflexe.' },
    { id: 'placeholder', front: 'Un placeholder peut-il remplacer l’étiquette ?', back: 'Non : il disparaît à la saisie, il est souvent trop pâle et il passe pour une valeur remplie. Étiquette persistante ; le placeholder montre au plus un exemple.' },
    { id: 'error', front: 'À quelles questions répond un message d’erreur ?', back: 'Qu’est-ce qui a échoué, pourquoi (si on le sait et que c’est utile), et comment s’en sortir. Sans accuser, près de l’élément en cause.' },
    { id: 'codes', front: 'Où mettre un code d’erreur interne ?', back: 'Jamais en message principal. En détail secondaire, pour le support.' },
    { id: 'empty', front: 'Que fait un bon état vide ?', back: 'Il distingue sa cause (premier usage, aucun résultat, filtres, accès, panne), l’explique et propose l’action suivante utile.' },
    { id: 'loading', front: 'Qu’est-ce qu’un texte de chargement honnête ?', back: 'Il nomme l’opération réelle et annonce une durée quand l’attente compte. Progression déterminée si elle existe, jamais inventée.' },
    { id: 'help', front: 'À quoi sert un texte d’aide sous un champ ?', back: 'À répondre à une question implicite (format, usage, visibilité), pas à répéter l’étiquette.' },
    { id: 'links', front: 'Pourquoi bannir « Cliquez ici » et « En savoir plus » ?', back: 'Un lien doit avoir du sens hors contexte : les lecteurs d’écran listent les liens seuls. Écris la destination : « Lire les conditions de remboursement ».' },
    { id: 'voice', front: 'Voix ou ton : qu’est-ce qui change selon le moment ?', back: 'Le ton. La voix (personnalité, registre, vocabulaire) reste constante ; le ton devient plus sobre sur une erreur de paiement que sur un succès.' },
    { id: 'tu-vous', front: 'Tu ou vous ?', back: 'Choisis selon ton public et la marque, puis tiens-le partout : écrans, e-mails, notifications, aide.' },
    { id: 'concat', front: 'Pourquoi ne pas concaténer des fragments de phrase ?', back: 'L’ordre des mots, les accords et les pluriels changent selon la langue. Écris des messages complets avec des variables nommées (ICU, `Intl.PluralRules`).' },
  ],
  exercises: [
    {
      id: 'ux-writing-confirm-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Laquelle de ces confirmations protège le mieux contre un vidage de corbeille par erreur ?',
      context: 'Application de stockage de fichiers. La corbeille contient 40 fichiers ; une fois vidée, rien n’est récupérable.',
      options: [
        {
          id: 'vague',
          visual: {
            alt: 'Boîte de dialogue « Êtes-vous sûr ? », texte « Cette action est irréversible. », boutons « Non » et « Oui ».',
            html: confirm('Êtes-vous sûr ?', 'Cette action est irréversible.', '<span class="mk-btn mk-btn--ghost mk-btn--s">Non</span><span class="mk-btn mk-btn--s">Oui</span>'),
            css: CONFIRM_CSS,
          },
          why: 'Rien ne dit ce qui va disparaître ni combien : la seule réponse sensée à « Êtes-vous sûr ? » est « Oui », donnée par réflexe.',
        },
        {
          id: 'ok',
          visual: {
            alt: 'Boîte de dialogue « Vider la corbeille ? », texte sur les 40 fichiers supprimés définitivement, boutons « Annuler » et « OK ».',
            html: confirm('Vider la corbeille ?', 'Les 40 fichiers qu’elle contient seront supprimés définitivement.', '<span class="mk-btn mk-btn--ghost mk-btn--s">Annuler</span><span class="mk-btn mk-btn--s">OK</span>'),
            css: CONFIRM_CSS,
          },
          why: 'Le texte est précis, mais « OK » ne dit pas ce qu’il déclenche : qui lit seulement les boutons valide sans avoir vu la conséquence.',
        },
        {
          id: 'named',
          visual: {
            alt: 'Boîte de dialogue « Vider la corbeille ? », texte sur les 40 fichiers supprimés définitivement, boutons « Annuler » et « Vider la corbeille » en rouge.',
            html: confirm(
              'Vider la corbeille ?',
              'Les 40 fichiers qu’elle contient seront supprimés définitivement.',
              '<span class="mk-btn mk-btn--ghost mk-btn--s">Annuler</span><span class="mk-btn mk-btn--danger mk-btn--s">Vider la corbeille</span>',
            ),
            css: CONFIRM_CSS,
          },
          why: 'Le titre nomme l’action, le texte la conséquence, et le bouton répète l’action : on peut décider en lisant le seul bouton.',
        },
      ],
      answer: 'named',
      explanation: `Une confirmation n’est utile que si elle fait **relire** la décision. Or on répond aux boîtes de dialogue par habitude : face à « Êtes-vous sûr ? », la réponse « Oui » devient automatique, et la boîte ne protège plus de rien.

La version recommandée nomme l’objet (« la corbeille », « 40 fichiers »), la conséquence (« supprimés définitivement ») et **répète l’action sur le bouton**. Beaucoup ne lisent que les boutons : « Vider la corbeille » porte toute la décision, là où « OK » ou « Oui » renvoient au texte qu’on a sauté.

Le bouton destructeur garde sa couleur de danger et n’est pas l’action par défaut.`,
      takeaway: 'Une confirmation nomme l’objet et la conséquence, et son bouton répète l’action : jamais « Oui », « OK » ou « Valider ».',
      sources: ['imp:clarify', NNG_CONFIRM],
    },
    {
      id: 'ux-writing-undo-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle réaction de l’interface convient le mieux quand on archive une conversation ?',
      context: 'Dans cette messagerie, une conversation archivée se retrouve à tout moment dans l’onglet Archives.',
      options: [
        {
          id: 'modal',
          visual: {
            alt: 'Téléphone : liste de conversations recouverte d’une boîte de dialogue « Archiver cette conversation ? » avec les boutons « Annuler » et « Archiver ».',
            frame: 'phone',
            html: fr(`<div class="ib-shade">
  <div class="ib-head"><p class="mk-h2">Messages</p><i data-icon="search"></i></div>
  ${conv('IM', '#f6d7c3', 'Inès Moreau', 'On se retrouve devant le cinéma ?', '18:42')}
  ${conv('GE', '#cfe3d4', 'Groupe escalade', 'Paul : la salle ouvre à 19 h', '17:05')}
  ${conv('PG', '#d6dcf5', 'Paul Girard', 'Merci pour le lien !', 'Hier')}
  ${conv('JR', '#efd9ef', 'Jeanne Roux', 'Photo', 'Lun.')}
  <div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:10px">
    <p class="mk-h3">Archiver cette conversation ?</p>
    <p class="mk-muted">Vous la retrouverez dans l’onglet Archives.</p>
    <div class="mk-row" style="--gap:8px;justify-content:flex-end"><span class="mk-btn mk-btn--ghost">Annuler</span><span class="mk-btn">Archiver</span></div>
  </div></div>
</div>`),
            css: INBOX_CSS,
          },
          why: 'Le texte est clair, mais interrompre pour une action réversible coûte un geste à chaque fois et habitue à confirmer sans lire.',
        },
        {
          id: 'undo',
          visual: {
            alt: 'Téléphone : la conversation a disparu de la liste et un bandeau sombre indique « Conversation avec Inès archivée » avec un bouton « Annuler ».',
            frame: 'phone',
            html: fr(`<div>
  <div class="ib-head"><p class="mk-h2">Messages</p><i data-icon="search"></i></div>
  ${conv('GE', '#cfe3d4', 'Groupe escalade', 'Paul : la salle ouvre à 19 h', '17:05')}
  ${conv('PG', '#d6dcf5', 'Paul Girard', 'Merci pour le lien !', 'Hier')}
  ${conv('JR', '#efd9ef', 'Jeanne Roux', 'Photo', 'Lun.')}
  ${conv('LB', '#f3e6b8', 'Léo Bernard', 'Je te rends le livre jeudi', 'Dim.')}
  <div class="mk-toast ib-toast"><span>Conversation avec Inès archivée</span><span class="mk-btn mk-btn--text mk-btn--s">Annuler</span></div>
</div>`),
            css: INBOX_CSS,
          },
          why: 'L’action s’exécute tout de suite et « Annuler » rattrape l’erreur : la personne garde le contrôle sans être interrompue.',
        },
      ],
      answer: 'undo',
      explanation: `Quand la récupération est sûre (archiver, déplacer, masquer), impeccable recommande de **préférer l’annulation à la confirmation**. La personne agit sans interruption ; si elle s’est trompée, « Annuler » répare l’erreur au moment même où elle la voit.

Une confirmation systématique a un coût caché : à force d’apparaître pour des actions bénignes, elle est acceptée par réflexe. Le jour où elle protège une action vraiment destructrice, plus personne ne la lit. Réserve-la aux actions **irréversibles ou coûteuses**.`,
      takeaway: 'Action réversible : exécute-la et propose « Annuler ». Garde la confirmation pour les actions irréversibles ou coûteuses.',
      sources: ['imp:clarify', NNG_CONFIRM],
    },
    {
      id: 'ux-writing-validation-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel message aide le mieux à corriger le mot de passe refusé ?',
      options: [
        {
          id: 'vague',
          visual: {
            alt: 'Formulaire de création de compte : champ mot de passe encadré de rouge avec le message « Mot de passe non valide. Veuillez recommencer. »',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h3">Créer un compte</p>
  <div class="mk-field"><span class="mk-label">Adresse e-mail</span><div class="mk-input">camille.durand@exemple.fr</div></div>
  <div class="mk-field"><span class="mk-label">Mot de passe</span><div class="mk-input mk-input--error">••••••••</div><span class="mk-error vd-err"><i data-icon="circle-alert" style="--ico:14px"></i>Mot de passe non valide. Veuillez recommencer.</span></div>
  <span class="mk-btn mk-btn--block">Créer mon compte</span>
</div>`),
            css: `.vd-err { display: flex; align-items: center; gap: 6px; }`,
          },
          why: '« Non valide » ne dit ni ce qui manque ni comment corriger, et « recommencer » laisse croire qu’il faut tout ressaisir.',
        },
        {
          id: 'precise',
          visual: {
            alt: 'Même formulaire : la règle « 8 caractères minimum, dont au moins un chiffre » est écrite sous l’étiquette, et le champ en rouge affiche « Ajoutez au moins un chiffre. »',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h3">Créer un compte</p>
  <div class="mk-field"><span class="mk-label">Adresse e-mail</span><div class="mk-input">camille.durand@exemple.fr</div></div>
  <div class="mk-field"><span class="mk-label">Mot de passe</span><span class="mk-help">8 caractères minimum, dont au moins un chiffre.</span><div class="mk-input mk-input--error">••••••••</div><span class="mk-error vd-err"><i data-icon="circle-alert" style="--ico:14px"></i>Ajoutez au moins un chiffre.</span></div>
  <span class="mk-btn mk-btn--block">Créer mon compte</span>
</div>`),
            css: `.vd-err { display: flex; align-items: center; gap: 6px; }`,
          },
          why: 'La règle est visible avant la saisie, et l’erreur dit exactement quoi ajouter, sans accuser.',
        },
      ],
      answer: 'precise',
      explanation: `Une validation utile dit **ce qui demande de l’attention** et **comment le corriger**. « Non valide » oblige à deviner la règle, puis à essayer des combinaisons au hasard.

La version recommandée fait deux choses : elle annonce l’exigence **avant** la saisie (texte d’aide sous l’étiquette) et formule l’erreur comme une **consigne** (« Ajoutez au moins un chiffre »), sans accuser. Le message reste collé au champ, avec une icône en plus de la couleur, et doit être annoncé aux lecteurs d’écran (critères WCAG 3.3.1 et 3.3.3).`,
      takeaway: 'Annonce les exigences avant la saisie et formule l’erreur comme une consigne précise, près du champ, sans accuser.',
      sources: ['imp:clarify', WCAG_ERROR, NNG_ERRORS],
    },
    {
      id: 'ux-writing-empty-filters-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Une recherche filtrée ne renvoie rien. Quel état vide aide le plus ?',
      context: 'Site de petites annonces sur téléphone. Recherche « vélo cargo » avec trois filtres actifs.',
      options: [
        {
          id: 'bare',
          visual: {
            alt: 'Téléphone : champ de recherche « vélo cargo », trois filtres actifs, et sous eux la seule mention grise « Aucun résultat. »',
            frame: 'phone',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="srch"><i data-icon="search" style="--ico:16px"></i>vélo cargo</div>
  <div class="mk-row mk-wrap" style="--gap:6px"><span class="chip on">Électrique</span><span class="chip on">800 € max.</span><span class="chip on">Moins de 5 km</span></div>
  <p class="mk-center mk-muted" style="padding:64px 0">Aucun résultat.</p>
</div>`),
            css: SEARCH_CSS,
          },
          why: '« Aucun résultat » ne dit pas que les filtres en sont la cause, ni quoi faire : on conclut que l’objet n’existe pas, et on part.',
        },
        {
          id: 'guided',
          visual: {
            alt: 'Téléphone : même recherche ; le message dit qu’aucune annonce ne correspond aux 3 filtres, que 14 annonces existent dans un rayon de 20 km, avec les boutons « Élargir à 20 km » et « Effacer les filtres ».',
            frame: 'phone',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="srch"><i data-icon="search" style="--ico:16px"></i>vélo cargo</div>
  <div class="mk-row mk-wrap" style="--gap:6px"><span class="chip on">Électrique</span><span class="chip on">800 € max.</span><span class="chip on">Moins de 5 km</span></div>
  <div class="mk-stack mk-center" style="--gap:8px;padding:14px 4px 6px">
    <p class="mk-h3">Aucune annonce avec ces 3 filtres</p>
    <p class="mk-muted">14 vélos cargo électriques à 800 € maximum sont en vente à moins de 20 km.</p>
    <span class="mk-btn">Élargir à 20 km</span>
    <span class="mk-btn mk-btn--ghost">Effacer les filtres</span>
  </div>
</div>`),
            css: SEARCH_CSS,
          },
          why: 'Le message nomme la cause (3 filtres), montre qu’il existe des annonces un peu plus loin et propose deux actions directes.',
        },
      ],
      answer: 'guided',
      explanation: `Un état vide doit **distinguer sa cause**, car chacune appelle une action différente. Ici, le vide vient des filtres, pas de l’absence d’annonces : le dire évite d’abandonner une recherche qui pouvait aboutir.

La version recommandée explique l’état et offre **l’action suivante utile** : élargir le rayon ou effacer les filtres. Elle chiffre même ce que l’élargissement rapporte, puisque le système le sait. Un premier usage, un accès refusé ou une panne demanderaient chacun un autre message.`,
      takeaway: 'Un état vide dit pourquoi il est vide et propose l’action suivante utile : effacer les filtres, élargir, créer, réessayer.',
      sources: ['imp:clarify', 'imp:onboard', NNG_EMPTY],
    },
    {
      id: 'ux-writing-loading-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'La génération d’une facture en PDF prend environ 5 secondes. Quel texte d’attente afficher ?',
      options: [
        {
          id: 'generic',
          visual: {
            alt: 'Carte de facture avec un indicateur rotatif et le texte « Chargement… »',
            html: invoice('Chargement…'),
            css: LOADING_CSS,
          },
          why: '« Chargement » ne dit ni ce qui se passe ni combien de temps : au bout de quelques secondes, on se demande si c’est bloqué.',
        },
        {
          id: 'cute',
          visual: {
            alt: 'Carte de facture avec un indicateur rotatif et le texte « Un peu de patience, la magie opère ! »',
            html: invoice('Un peu de patience, la magie opère !'),
            css: LOADING_CSS,
          },
          why: 'Le ton se veut sympathique mais n’apprend rien : ni l’opération, ni la durée. Et la blague s’use vite sur un écran vu à chaque facture.',
        },
        {
          id: 'honest',
          visual: {
            alt: 'Carte de facture avec un indicateur rotatif et le texte « Génération du PDF… environ 5 secondes ».',
            html: invoice('Génération du PDF… environ 5 secondes'),
            css: LOADING_CSS,
          },
          why: 'Il nomme l’opération réelle et donne une attente honnête : on sait ce qui se passe et quand s’inquiéter.',
        },
      ],
      answer: 'honest',
      explanation: `Un texte de chargement dit **ce qui se passe vraiment** et fixe une **attente honnête** quand l’attente compte. « Génération du PDF » explique pourquoi ça prend du temps ; « environ 5 secondes » dit quand commencer à s’inquiéter.

De 2 à 9 secondes, une animation en boucle suffit ; à partir de 10 secondes, montre une progression réelle (pourcentage, étapes). Mais **n’invente jamais de progression** : une barre qui avance sans lien avec le travail réel est un mensonge que la personne finit par découvrir.`,
      takeaway: 'Le texte d’attente nomme l’opération réelle et annonce une durée honnête ; jamais de progression inventée.',
      sources: ['imp:clarify', NNG_PROGRESS],
    },
    {
      id: 'ux-writing-success-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel message afficher après ce changement de mot de passe ?',
      context: 'Réglages d’un service de messagerie. Le nouveau mot de passe est enregistré ; par sécurité, le téléphone et la tablette de la personne ont été déconnectés.',
      options: [
        {
          id: 'thanks',
          label: '« Votre mot de passe a bien été modifié avec succès ! Merci de votre vigilance. »',
          why: '« Bien » et « avec succès » disent deux fois la même chose, le remerciement n’apprend rien, et la conséquence qui compte manque : les appareils déconnectés.',
        },
        {
          id: 'bare',
          label: '« Mot de passe modifié. »',
          why: 'Bref et exact, mais il tait la seule conséquence qui change la suite : la personne découvrira plus tard, sans comprendre pourquoi, que son téléphone est déconnecté.',
        },
        {
          id: 'next',
          label: '« Mot de passe modifié. Votre téléphone et votre tablette ont été déconnectés : reconnectez-les avec le nouveau. »',
          why: 'Le résultat, puis la seule conséquence qui change ce que la personne doit faire, avec l’action à mener.',
        },
        {
          id: 'extra',
          label: '« Mot de passe modifié le 27 octobre à 14 h 32 depuis Chrome sur Windows. Pour mieux protéger votre compte, activez la double authentification et consultez nos conseils. »',
          why: 'Long mais à côté : l’heure et le navigateur n’apprennent rien à qui vient d’agir, le conseil peut attendre, et la déconnexion des appareils n’est pas mentionnée.',
        },
      ],
      answer: 'next',
      explanation: `Un message de succès confirme **le résultat obtenu**, puis mentionne la conséquence suivante **seulement si elle change ce que la personne doit faire**. Ici, la déconnexion du téléphone et de la tablette en est une : sans le message, la personne trouvera une session fermée sans savoir pourquoi, et pourra craindre un piratage.

Le reste se retire. « Bien » et « avec succès » disent deux fois la même chose, et un remerciement n’apprend rien : **dis chaque idée une fois**. L’heure, le navigateur ou un conseil de sécurité ne changent rien à la suite immédiate. Sans appareil déconnecté, ce succès de routine tiendrait en trois mots : « Mot de passe modifié ».`,
      takeaway: 'Un succès confirme le résultat, puis la conséquence qui change la suite, et rien d’autre : chaque idée une fois, sans remerciement ni détail inutile.',
      sources: ['imp:clarify'],
    },
    {
      id: 'ux-writing-payment-error-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'La banque d’un client refuse son paiement par carte. Quel message afficher ?',
      options: [
        { id: 'code', label: '« Erreur 402 : CARD_DECLINED »', why: 'Un code interne en message principal : rien sur la cause en clair ni sur la marche à suivre.' },
        { id: 'joke', label: '« Oups ! Votre carte fait grève aujourd’hui. Réessayez plus tard ! »', why: 'Une blague sur un paiement refusé, et une promesse que le système ne peut pas tenir : rien ne dit que la carte passera plus tard.' },
        { id: 'blame', label: '« Paiement refusé. Vérifiez vos informations. »', why: 'Il sous-entend une faute de saisie alors que c’est la banque qui refuse, et ne dit pas quoi vérifier.' },
        {
          id: 'generic',
          label: '« Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer ultérieurement ou contacter notre service client si le problème persiste. »',
          why: 'Long mais générique : il tait la cause connue (le refus de la banque), ne dit pas si un montant a été débité, et pousse à réessayer avec la même carte.',
        },
        {
          id: 'clear',
          label: '« Votre banque a refusé le paiement. Aucun montant n’a été débité. Essayez une autre carte ou contactez votre banque. »',
          why: 'Ce qui a échoué, pourquoi, une information qui rassure (rien n’est débité) et deux façons de s’en sortir.',
        },
      ],
      answer: 'clear',
      explanation: `Un message d’erreur actionnable répond à trois questions : **qu’est-ce qui a échoué** (le paiement), **pourquoi** quand on le sait (la banque l’a refusé), **comment s’en sortir** (autre carte, contacter la banque).

Le paiement fait partie des moments à traiter avec sérieux : la chaleur est bienvenue, les blagues non. Ajouter « Aucun montant n’a été débité » répond à l’inquiétude principale du moment. Enfin, ne promets pas une cause que le système ignore, ne tais pas celle qu’il connaît, et n’accuse pas la personne d’une erreur qu’elle n’a pas commise.`,
      takeaway: 'Une erreur dit ce qui a échoué, pourquoi si c’est utile, et comment s’en sortir, sur un ton sérieux quand l’argent est en jeu.',
      sources: ['imp:clarify', NNG_ERRORS],
    },
    {
      id: 'ux-writing-valider-choice',
      type: 'choice',
      difficulty: 1,
      culture: 'fr',
      prompt: 'Quel libellé donner au bouton principal de ce dernier écran ?',
      context: 'Achat de billets de train : 2 allers Paris → Lyon, 89,00 € au total. Le dernier écran récapitule le trajet et la carte utilisée.',
      options: [
        { id: 'valider', label: '« Valider »', why: 'Le *Submit* français : il ne dit pas que l’on va payer, ni combien.' },
        { id: 'pay', label: '« Payer 89,00 € »', why: 'Il nomme le résultat et le montant : on sait exactement ce que déclenche le bouton.' },
        { id: 'ok', label: '« OK »', why: 'Un acquiescement, pas une action : rien n’indique qu’un paiement va partir.' },
        { id: 'next', label: '« Suivant »', why: 'Trompeur sur le dernier écran : on s’attend à une étape de plus, et l’argent part sans prévenir.' },
        { id: 'confirm', label: '« Confirmer et continuer »', why: 'Deux verbes flous : confirmer quoi ? Et « continuer » annonce une étape de plus, alors que ce bouton déclenche le paiement.' },
      ],
      answer: 'pay',
      explanation: `Un bouton décrit **le résultat**, pas le geste. « Valider », l’équivalent français de *Submit*, est un réflexe très répandu des interfaces francophones : il oblige à relire tout l’écran pour comprendre ce qui va se passer.

« Payer 89,00 € » dit l’action (payer) et son objet (le montant). Au moment d’engager de l’argent, le montant sur le bouton rassure et évite les surprises.`,
      takeaway: 'Remplace « Valider » par le résultat de l’action : « Payer 89,00 € », « Envoyer la demande », « Enregistrer ».',
      sources: ['imp:clarify', 'imp:craft-floor'],
    },
    {
      id: 'ux-writing-plural-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Que recommander à l’équipe pour ce message ?',
      context: 'Le code assemble la notification ainsi : `"Vous avez " + n + " nouveau" + (n > 1 ? "x" : "") + " message" + (n > 1 ? "s" : "")`. L’application va être traduite en anglais, en polonais et en arabe.',
      options: [
        {
          id: 'icu',
          label: 'Un message complet par forme, avec une variable nommée : `{n, plural, =0 {Aucun nouveau message} one {# nouveau message} other {# nouveaux messages}}`',
          why: 'La traduction porte sur des phrases entières, et la bibliothèque choisit la bonne forme selon les règles de chaque langue.',
        },
        {
          id: 'fragments',
          label: 'Extraire chaque fragment (« Vous avez », « nouveau », « message ») dans le fichier de traduction, avec un commentaire qui explique où il s’insère dans la phrase',
          why: 'Même commenté, un fragment ne se traduit pas seul : l’ordre des mots et les accords changent selon la langue, et la phrase ne peut pas être réordonnée.',
        },
        { id: 'parens', label: 'Écrire « Nouveau(x) message(s) : 3 » pour contourner le problème', why: 'Lourd à lire, mal prononcé par les lecteurs d’écran, et cela ne règle rien pour les langues à plusieurs pluriels.' },
        { id: 'plural', label: 'Toujours mettre le pluriel, c’est plus simple', why: 'On obtient « 1 nouveaux messages », et la règle française n’est même pas celle des autres langues.' },
      ],
      answer: 'icu',
      explanation: `Les règles de pluriel varient d’une langue à l’autre : le français met **0 et 1 au singulier**, l’anglais met **0 au pluriel** (« 0 messages »), le polonais choisit sa forme selon la terminaison du nombre, et l’arabe distingue **six catégories**. Une concaténation codée pour le français casse dès qu’on traduit.

La règle d’impeccable : écrire des **messages complets** plutôt que des fragments, et garder les variables structurées pour que les traducteurs puissent réordonner la phrase. Les formats ICU MessageFormat ou \`Intl.PluralRules\` choisissent la forme selon la langue ; le cas \`=0\` permet en plus un vrai texte pour zéro.`,
      takeaway: 'Écris des messages complets avec des variables nommées et des pluriels gérés par la bibliothèque d’internationalisation, jamais des fragments concaténés.',
      sources: ['imp:clarify', 'imp:harden', 'mdn:intl', CLDR_PLURALS],
    },
    {
      id: 'ux-writing-register-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'fr',
      prompt: 'Quel registre adopter pour ces messages ?',
      context: 'Une banque en ligne française tutoie ses clients dans toute son application. L’équipe rédige maintenant les e-mails de sécurité et les messages d’incident de paiement.',
      options: [
        { id: 'keep', label: 'Le tutoiement, comme partout ailleurs, avec un ton plus sobre et plus précis pour ces moments sensibles', why: 'La voix reste la même ; c’est le ton qui s’adapte à la gravité du moment.' },
        { id: 'switch', label: 'Le vouvoiement dans les e-mails de sécurité et les incidents de paiement, pour marquer le sérieux ; le tutoiement partout ailleurs', why: 'Changer de registre au pire moment donne l’impression de parler à une autre entreprise. Le sérieux passe par le ton, pas par le registre.' },
        { id: 'writer', label: 'Au choix de la personne qui rédige chaque message', why: 'C’est ainsi qu’un produit finit par mélanger tu et vous sur un même écran.' },
        { id: 'impersonal', label: 'Uniquement des tournures impersonnelles, pour ne pas avoir à choisir', why: 'Un titre peut être impersonnel (« Paiement refusé »), mais les consignes s’adressent à quelqu’un : il faut un registre.' },
      ],
      answer: 'keep',
      explanation: `En français, le choix entre **tu et vous** fait partie de la **voix** du produit. Les banques, assurances et administrations vouvoient le plus souvent ; beaucoup d’applications grand public tutoient. Les deux se défendent : l’important est de choisir selon le public, puis de **tenir ce choix partout**, application, e-mails, notifications, aide et support.

Ce qui change selon le moment, c’est le **ton** : plus sobre, plus factuel, sans familiarité sur un incident de paiement, mais toujours dans le même registre.`,
      takeaway: 'Tu ou vous : choisis selon ton public, puis tiens-le partout. Le ton s’adapte au moment, pas le registre.',
      sources: ['imp:clarify'],
    },
    {
      id: 'ux-writing-tics-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Lesquelles de ces phrases de page d’accueil sont des tics de texte généré à réécrire ?',
      context: 'Site d’un logiciel de comptabilité pour indépendants.',
      options: [
        { id: 'buzz', label: '« Propulsez votre trésorerie au niveau supérieur avec une solution de pointe. »', why: 'Jargon marketing : « propulser », « au niveau supérieur » et « de pointe » promettent sans dire ce que fait le produit.' },
        { id: 'aphorism', label: '« Pas une appli. Une méthode. », puis « Pas une corvée. Un réflexe. » en fin de chaque section', why: 'La cadence aphoristique répétée de section en section : une fois, ça passe ; c’est la répétition qui trahit le texte généré.' },
        { id: 'theater', label: '« Fini le théâtre administratif. »', why: 'Le cadrage en « théâtre » est un tic : il vaut mieux dire quelles démarches l’outil prend en charge.' },
        { id: 'concrete', label: '« Importez vos relevés bancaires et classez 200 opérations en cinq minutes. »', why: 'Un verbe, un objet, un chiffre : on comprend ce que fait le produit.' },
        { id: 'specific', label: '« Les factures impayées sont relancées automatiquement à J+7, J+15 et J+30. »', why: 'Précis et vérifiable : rien à réécrire.' },
      ],
      answers: ['buzz', 'aphorism', 'theater'],
      explanation: `Le détecteur d’impeccable repère plusieurs **tics de texte généré**. Ses règles lisent l’anglais, mais les mêmes réflexes trahissent un texte français :

- **Jargon marketing** (*streamline*, *empower*, *next-generation*… ; en français « nouvelle génération », « de pointe ») : il remplace ce que le produit fait par une promesse vague.
- **Cadence aphoristique** : trois sections ou plus qui finissent sur une courte réplique (« X. Pas de Y. ») ou un contraste fabriqué (*Not a…*). Une fois, ça passe ; c’est la répétition qui trahit.
- **Cadrage en « théâtre »** (*compliance theater*) : qualifier quelque chose de théâtre au lieu de dire ce qu’il fait ou ne fait pas.

Le remède est toujours le même : **un verbe et un nom précis** qui disent ce que le produit fait littéralement, avec un chiffre quand il existe.`,
      takeaway: 'Remplace le jargon marketing et les formules toutes faites par un verbe et un nom qui disent ce que le produit fait réellement.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'ux-writing-signup-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux textes qui n’aident pas la personne dans ce formulaire d’inscription.',
      visual: {
        alt: 'Formulaire « Créer un compte » : champ adresse e-mail avec un texte d’aide, champ mot de passe avec sa règle, case des conditions d’utilisation avec un lien, case de lettre d’information et bouton « Créer mon compte ».',
        frame: 'browser',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2" data-hotspot="title">Créer un compte</p>
  <div class="mk-field"><span class="mk-label">Adresse e-mail</span><span class="mk-help su-hint" data-hotspot="help">Saisissez une adresse e-mail valide.</span><div class="mk-input">camille.durand@exemple.fr</div></div>
  <div class="mk-field"><span class="mk-label">Mot de passe</span><span class="mk-help su-hint" data-hotspot="pwd">8 caractères minimum, dont au moins un chiffre.</span><div class="mk-input">••••••••••</div></div>
  <p class="mk-check mk-check--on" data-hotspot="terms"><span>J’accepte les conditions d’utilisation. Pour les lire, <a href="#">cliquez ici</a>.</span></p>
  <p class="mk-check" data-hotspot="news"><span>Recevoir la lettre mensuelle (un e-mail par mois, désinscription en un clic)</span></p>
  <span class="mk-btn" data-hotspot="cta" style="align-self:flex-start">Créer mon compte</span>
</div>`),
        css: `.su-hint { margin-block: 6px; }`,
      },
      hotspots: [
        { id: 'help', label: 'Aide sous l’adresse e-mail', correct: true, why: 'Elle répète l’étiquette : « valide » n’apprend rien. La question implicite est « à quoi va servir mon adresse ? » : « Nous l’utilisons uniquement pour vos factures. »' },
        { id: 'terms', label: 'Lien « cliquez ici »', correct: true, why: 'Hors contexte, « cliquez ici » ne dit pas où mène le lien. Le lien doit porter sur « les conditions d’utilisation ».' },
        { id: 'title', label: 'Titre', correct: false, why: 'Il dit clairement ce que l’on est en train de faire.' },
        { id: 'pwd', label: 'Règle du mot de passe', correct: false, why: 'Une bonne aide : elle annonce l’exigence avant la saisie.' },
        { id: 'news', label: 'Case de la lettre d’information', correct: false, why: 'Elle précise la fréquence et la désinscription : la décision est éclairée.' },
        { id: 'cta', label: 'Bouton « Créer mon compte »', correct: false, why: 'Verbe et objet : le résultat est clair.' },
      ],
      explanation: `Deux règles de rédaction sont enfreintes :

- **Le texte d’aide répète l’étiquette** au lieu de répondre à une question implicite. Sous « Adresse e-mail », la vraie question est « à quoi va-t-elle servir ? », ou « qui la verra ? »
- **« Cliquez ici » n’a aucun sens hors contexte.** Un lecteur d’écran qui liste les liens de la page annonce « cliquez ici », sans dire vers quoi ; l’œil qui balaie la page ne trouve pas non plus la destination. Le lien porte sur les mots qui la décrivent : « les conditions d’utilisation ».

Le critère WCAG 2.4.4 (niveau A) tolère un lien éclairé par sa phrase ; impeccable vise plus haut, comme le critère 2.4.9 (niveau AAA) : un lien compréhensible seul.`,
      takeaway: 'Une aide répond à une question implicite (format, usage, visibilité) ; un lien décrit sa destination, jamais « cliquez ici ».',
      sources: ['imp:clarify', WCAG_LINK_ONLY, WCAG_LINK],
    },
    {
      id: 'ux-writing-terms-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les deux lignes qui nuisent à la cohérence de cet écran de réglages.',
      visual: {
        alt: 'Écran « Paramètres de l’espace de travail » avec cinq lignes : nom de l’espace, membres, langue, facturation et une action pour quitter.',
        frame: 'browser',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:6px">
  <p class="mk-h2" data-hotspot="title" style="margin-bottom:6px">Paramètres de l’espace de travail</p>
  <div class="st-row" data-hotspot="name"><div class="mk-grow"><p class="mk-label">Nom de l’espace de travail</p><p class="mk-small mk-muted">Studio Lumen</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Renommer</span></div>
  <div class="st-row" data-hotspot="members"><div class="mk-grow"><p class="mk-label">Membres du workspace</p><p class="mk-small mk-muted">12 personnes</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Inviter</span></div>
  <div class="st-row" data-hotspot="lang"><div class="mk-grow"><p class="mk-label">Langue de l’espace de travail</p><p class="mk-small mk-muted">Français</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Modifier</span></div>
  <div class="st-row" data-hotspot="billing"><div class="mk-grow"><p class="mk-label">Facturation</p><p class="mk-small mk-muted">Formule Équipe · 96&nbsp;€ par&nbsp;mois</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Gérer</span></div>
  <div class="st-row" data-hotspot="leave"><div class="mk-grow"><p class="mk-label">Quitter l’organisation</p><p class="mk-small mk-muted">Vous perdrez l’accès à tous ses projets.</p></div><span class="mk-btn mk-btn--danger mk-btn--s">Quitter</span></div>
</div>`),
        css: `.st-row { display: flex; align-items: center; gap: 12px; padding: 10px 4px; border-bottom: 1px solid #eceef2; }`,
      },
      hotspots: [
        { id: 'members', label: 'Membres du « workspace »', correct: true, why: 'Le même concept change de nom : « workspace » ici, « espace de travail » partout ailleurs.' },
        { id: 'leave', label: 'Quitter « l’organisation »', correct: true, why: 'Troisième nom pour la même chose : on se demande si quitter l’organisation fait sortir de cet espace seulement, ou de tout.' },
        { id: 'title', label: 'Titre', correct: false, why: 'Il pose le terme de référence : « espace de travail ».' },
        { id: 'name', label: 'Nom de l’espace de travail', correct: false, why: 'Terme cohérent, action claire (« Renommer »).' },
        { id: 'lang', label: 'Langue de l’espace de travail', correct: false, why: 'Terme cohérent avec le reste de l’écran.' },
        { id: 'billing', label: 'Facturation', correct: false, why: '« Équipe » est le nom de la formule, pas un autre nom pour l’espace : le contexte le montre.' },
      ],
      explanation: `En interface, **un mot différent signale une chose différente**. Ici, l’espace de travail porte trois noms : « espace de travail », « workspace » et « organisation ». La personne qui veut quitter « Studio Lumen » hésite : l’organisation est-elle cet espace, ou un ensemble plus large ?

On ne varie pas les termes pour éviter une répétition, comme on le ferait dans une rédaction. Choisis un terme, inscris-le dans un **glossaire** partagé et tiens-le partout, jusque dans les e-mails et le centre d’aide.`,
      takeaway: 'Un concept, un mot, partout : varier les termes pour le style fait croire à des choses différentes.',
      sources: ['imp:clarify', 'imp:polish'],
    },
    {
      id: 'ux-writing-short-label-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un libellé de bouton doit tenir en un seul mot pour rester lisible sur mobile.',
      answer: false,
      explanation: `La brièveté n’est utile que si le sens reste. Un verbe seul suffit quand l’objet est évident : « Enregistrer » dans un éditeur, « Envoyer » sous un message. Sinon, il faut le verbe **et** l’objet : « Supprimer » seul laisse deviner quoi (le fichier, le dossier, le compte ?), « Supprimer le projet » se comprend même lu seul, en balayant l’écran.

Sur mobile, un bouton pleine largeur accueille sans peine « Continuer vers le paiement ». La règle d’impeccable : le texte final est **aussi court que possible sans retirer le sens ni la sortie de secours**.`,
      takeaway: 'Un libellé est aussi court que possible, mais il garde l’objet quand le résultat n’est pas évident : « Supprimer le projet », pas « Supprimer ».',
      sources: ['imp:clarify'],
    },
    {
      id: 'ux-writing-humor-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Sur l’écran de suppression définitive d’un compte, une touche d’humour aide à dédramatiser la décision.',
      answer: false,
      explanation: `Supprimer définitivement son compte est une décision lourde : la personne veut savoir ce qui disparaît (projets, historique, abonnement), si un retour en arrière est possible et comment garder une copie de ses données. Une blague à ce moment-là paraît désinvolte et détourne l’attention de ces conséquences.

Impeccable range la suppression, la perte d’accès, le paiement, la vie privée et le travail bloqué parmi les moments à traiter **avec sérieux** : la chaleur est bienvenue (« Vous pouvez d’abord télécharger une copie de vos données »), les blagues non. L’humour peut avoir sa place sur un succès ou un état vide sans enjeu.`,
      takeaway: 'Suppression, perte d’accès, paiement, vie privée : un ton chaleureux mais sérieux, jamais de blague.',
      sources: ['imp:clarify'],
    },
    {
      id: 'ux-writing-error-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range les éléments de ce message d’erreur dans l’ordre où il doit les présenter.',
      context: 'La synchronisation de trois fichiers a échoué parce que l’espace de stockage est plein.',
      items: [
        { id: 'what', label: 'Ce qui a échoué : « 3 fichiers n’ont pas été synchronisés. »' },
        { id: 'why', label: 'Pourquoi : « Ton espace de stockage est plein (15 Go sur 15 Go). »' },
        { id: 'how', label: 'Comment s’en sortir : « Libère de l’espace ou passe à 100 Go. »' },
        { id: 'code', label: 'Le détail pour le support : « Code SYNC-507 »' },
      ],
      explanation: `Un message d’erreur actionnable suit l’ordre des questions que se pose la personne : **qu’est-ce qui a échoué**, **pourquoi** (quand on le sait et que c’est utile), puis **comment s’en sortir**.

Le code technique n’est jamais le message principal : il vient en dernier, en petit, pour le support. Placé en tête, il cache l’information dont la personne a besoin.`,
      takeaway: 'Erreur : ce qui a échoué, pourquoi, comment s’en sortir ; le code technique en dernier, pour le support.',
      sources: ['imp:clarify', NNG_ERRORS],
    },
    {
      id: 'ux-writing-empty-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque situation d’état vide au message qui lui convient.',
      leftTitle: 'Situation',
      rightTitle: 'Message',
      pairs: [
        { id: 'first', left: 'Inscription toute récente', right: 'Tes projets apparaîtront ici. Crée le premier ou pars d’un modèle.' },
        { id: 'search', left: 'Faute de frappe dans la requête', right: 'Aucun résultat pour « facture mrs ». Vérifie l’orthographe ou cherche par montant.' },
        { id: 'filters', left: 'Plusieurs critères cochés à la fois', right: 'Aucune commande avec ces 3 filtres. Effacer les filtres' },
        { id: 'access', left: 'Page réservée à un autre rôle', right: 'Seuls les administrateurs voient la facturation. Demande l’accès à Léa Martin.' },
        { id: 'failure', left: 'Réseau coupé pendant l’ouverture', right: 'Impossible de charger tes messages. Vérifie ta connexion, puis réessaie.' },
      ],
      explanation: `« Aucun élément » couvre cinq situations qui n’appellent pas la même réponse :

- **Premier usage** : ce qui viendra et comment commencer.
- **Recherche sans résultat** : rappeler la requête et proposer une correction.
- **Filtres** : nommer leur rôle et offrir de les effacer.
- **Accès refusé** : dire qui a accès et à qui le demander.
- **Panne** : dire ce qui n’a pas pu se charger et proposer de réessayer.

Confondre ces cas envoie la personne dans la mauvaise direction : créer un projet quand il fallait effacer un filtre, ou réessayer quand il fallait demander un accès.`,
      takeaway: 'Un état vide distingue premier usage, recherche, filtres, accès et panne, et propose l’action qui correspond.',
      sources: ['imp:clarify', 'imp:onboard', NNG_EMPTY],
    },
  ],
};

export default uxWriting;
