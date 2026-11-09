import type { ModuleContent, SourceRef, Visual } from '../../engine/types';

const RGAA = 'https://accessibilite.numerique.gouv.fr/';

/** Un critère du RGAA 4.1.2, dans la page des critères et tests. */
const C = (n: string, name: string): SourceRef => ({ label: `DINUM — RGAA 4.1.2, critère ${n} (${name})`, url: `${RGAA}methode/criteres-et-tests/#${n}` });

const CRITERIA: SourceRef = { label: 'DINUM — RGAA 4.1.2, Critères et tests', url: `${RGAA}methode/criteres-et-tests/` };
const GLOSSARY: SourceRef = { label: 'DINUM — RGAA 4.1.2, Glossaire', url: `${RGAA}methode/glossaire/` };
const METHOD: SourceRef = { label: 'DINUM — RGAA 4.1.2, Méthode technique : introduction', url: `${RGAA}methode/introduction/` };
const RGAA5: SourceRef = { label: 'DesignGouv (DINUM) — Nouvelle version du RGAA (mars 2026)', url: 'https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/' };
const WCAG22_NEW: SourceRef = { label: 'W3C WAI — What’s New in WCAG 2.2', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/', lang: 'en' };

/** Formulaire « Nous écrire » de la mairie, pour la mise en situation. */
const CONTACT_CSS = `.mr { padding: 16px; }
.mr-card { display: flex; flex-direction: column; gap: 12px; }
.mr-title { font-size: 18px; font-weight: 700; }
.mr-f { display: flex; flex-direction: column; gap: 4px; }
.mr-l { font-size: 13px; font-weight: 600; }
.mr-in { min-height: 40px; padding: 9px 10px; border: 1.5px solid var(--border); border-radius: 6px; background: #ffffff; font-size: 14px; }
.mr-focus { outline: 3px solid var(--focus); outline-offset: 2px; }
.mr-area { min-height: 72px; }
.mr-help { font-size: 13px; color: var(--help); }
.mr-btn { align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px; border-radius: 8px; background: #1d2230; color: #ffffff; font-size: 15px; font-weight: 600; }`;

/** Panneau « Historique » d’un navigateur. */
const historyPanel = (titles: string[], alt: string): Visual => ({
  alt,
  css: `.hp { padding: 14px 16px; }
.hp-h { font-size: 13px; font-weight: 700; color: #36405a; }
.hp-l { margin: 8px 0 0; padding: 0; list-style: none; }
.hp-l li { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid #eceef2; font-size: 14px; }
.hp-l li i { flex: none; color: #5a6172; }`,
  html: `<div class="hp"><p class="hp-h">Historique · aujourd’hui</p><ul class="hp-l">${titles.map((t) => `<li><i data-icon="globe" style="--ico:16px"></i><span>${t}</span></li>`).join('')}</ul></div>`,
});

/** Panneau d’une extension qui liste les titres d’une page, avec leur niveau. */
const outline = (rows: [string, string][], alt: string): Visual => ({
  alt,
  css: `.ol { padding: 14px 16px; }
.ol-h { font-size: 13px; font-weight: 700; color: #36405a; }
.ol-l { margin: 8px 0 0; padding: 0; list-style: none; }
.ol-l li { display: flex; align-items: baseline; gap: 10px; padding: 6px 0; font-size: 14px; }
.ol-n { flex: none; min-width: 26px; padding: 1px 6px; border-radius: 4px; background: #eef1f7; color: #36405a; font-size: 12px; font-weight: 700; text-align: center; }
.ol-2 { padding-inline-start: 18px; }
.ol-3 { padding-inline-start: 36px; }`,
  html: `<div class="ol"><p class="ol-h">Titres de la page</p><ul class="ol-l">${rows.map(([n, t]) => `<li class="ol-${n === 'h1' ? '1' : n === 'h2' ? '2' : '3'}"><span class="ol-n">${n}</span><span>${t}</span></li>`).join('')}</ul></div>`,
});

/** Fréquentation des piscines, deux années : barres distinguées par la seule couleur, ou aussi par un motif et des valeurs. */
const poolChart = (redundant: boolean): Visual => ({
  alt: redundant
    ? 'Graphique en barres de la fréquentation des deux piscines de Mirelac en 2025 et 2026 : barres pleines pour 2025, hachurées pour 2026, chaque barre porte sa valeur, et la légende reprend le motif.'
    : 'Graphique en barres de la fréquentation des deux piscines de Mirelac en 2025 et 2026 : barres vertes pour une année, rouges pour l’autre, légende en pastilles de couleur, sans valeur sur les barres.',
  css: `.pc { padding: 16px; }
.pc-t { font-size: 15px; font-weight: 700; }
.pc-g { display: flex; justify-content: space-around; align-items: flex-end; gap: 24px; height: 150px; margin-top: 12px; padding: 0 8px; border-bottom: 1px solid #868d9c; }
.pc-pair { display: flex; align-items: flex-end; gap: 6px; height: 100%; }
.pc-col { display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 2px; height: 100%; }
.pc-b { width: 34px; border-radius: 4px 4px 0 0; }
.pc-v { font-size: 12px; font-weight: 600; }
.pc-x { display: flex; justify-content: space-around; margin-top: 6px; font-size: 13px; }
.pc-leg { display: flex; gap: 16px; margin-top: 10px; font-size: 13px; }
.pc-leg span { display: inline-flex; align-items: center; gap: 6px; }
.pc-k { width: 14px; height: 14px; border-radius: 3px; }
${
  redundant
    ? `.pc-a { background: #1f4fd8; } .pc-n { background: repeating-linear-gradient(135deg, #1f4fd8 0 3px, #ffffff 3px 6px); box-shadow: inset 0 0 0 2px #1f4fd8; }`
    : `.pc-a { background: #16a34a; } .pc-n { background: #dc2626; }`
}`,
  html: `<div class="pc"><p class="pc-t">Entrées dans les piscines (en milliers)</p><div class="pc-g">${[
    [31, 37],
    [24, 20],
  ]
    .map(
      (pair) =>
        `<div class="pc-pair">${pair
          .map((v, i) => `<span class="pc-col">${redundant ? `<span class="pc-v">${v}</span>` : ''}<span class="pc-b ${i ? 'pc-n' : 'pc-a'}" style="height:${v * 2}%"></span></span>`)
          .join('')}</div>`,
    )
    .join('')}</div><div class="pc-x"><span>Piscine du Lac</span><span>Piscine des Tilleuls</span></div><div class="pc-leg"><span><i class="pc-k pc-a"></i>2025</span><span><i class="pc-k pc-n"></i>2026</span></div></div>`,
});

/** Champs « Nom », « Prénom », « Téléphone » : obligatoires dits par la couleur seule, ou en toutes lettres. */
const requiredForm = (words: boolean): Visual => ({
  alt: words
    ? 'Formulaire d’inscription à la bibliothèque : « Nom (obligatoire) », « Prénom (obligatoire) » et « Téléphone ».'
    : 'Formulaire d’inscription à la bibliothèque : les étiquettes « Nom » et « Prénom » sont écrites en rouge, « Téléphone » en noir, sans autre indication.',
  css: `.rq { padding: 16px; }
.rq-f { display: flex; flex-direction: column; gap: 4px; margin-top: 12px; }
.rq-l { font-size: 13px; font-weight: 600; }
.rq-red { color: #b91c1c; }
.rq-o { font-weight: 400; color: #5a6172; }`,
  html: `<div class="rq"><p class="mk-h3">Inscription à la bibliothèque</p><div class="rq-f"><span class="rq-l${words ? '' : ' rq-red'}">Nom${words ? ' <span class="rq-o">(obligatoire)</span>' : ''}</span><div class="mk-input">Morel</div></div><div class="rq-f"><span class="rq-l${words ? '' : ' rq-red'}">Prénom${words ? ' <span class="rq-o">(obligatoire)</span>' : ''}</span><div class="mk-input">Lina</div></div><div class="rq-f"><span class="rq-l">Téléphone</span><div class="mk-input">06 52 18 47 33</div></div></div>`,
});

const rgaaCriteres: ModuleContent = {
  id: 'rgaa-criteres',
  title: 'Le RGAA en pratique : les critères clés',
  summary:
    'Reconnaître les non-conformités les plus courantes, thématique par thématique — images, couleurs, liens, structure, présentation, formulaires, navigation —, avec le critère du RGAA qui les vérifie et ses cas particuliers.',
  minutes: 15,
  sources: [CRITERIA, GLOSSARY, METHOD, RGAA5, WCAG22_NEW],
  sections: [
    {
      id: 'lire',
      title: 'Lire un critère',
      body: `Chaque critère du RGAA est une **question fermée**, rangée dans l’une des 13 thématiques : « Chaque champ de formulaire a-t-il une étiquette ? » (11.1). Il se vérifie par des **tests** numérotés (11.1.1, 11.1.2…), chacun avec sa **méthodologie** : quoi chercher dans la page, quoi vérifier, quand le test est validé.

Trois réflexes de lecture :

- **« Hors cas particuliers »** renvoie à une liste fermée de situations où le critère devient non applicable. Pour le contraste (3.2), par exemple : un logo, un texte purement décoratif, un composant désactivé.
- **Les mots soulignés** du référentiel renvoient au **glossaire**, qui fait partie de la règle : « image de décoration », « contexte du lien », « titre »… Un test se lit avec ses définitions.
- **Les références** en bas de chaque critère le relient aux WCAG 2.1 et à la norme EN 301 549 : le critère 3.2 correspond au critère WCAG 1.4.3.

Le RGAA 4.1.2 repose sur les WCAG 2.1 : les critères ajoutés par les WCAG 2.2, comme la taille des cibles (2.5.8), n’y figurent pas. Selon la DINUM, le RGAA 5, annoncé pour fin 2026, intégrera les WCAG 2.2. Rien n’empêche de les appliquer dès maintenant : ce sont de bonnes pratiques, simplement pas encore des critères du RGAA.`,
    },
    {
      id: 'images-couleurs',
      title: 'Images et couleurs (thématiques 1 et 3)',
      body: `### Images
- **1.1 et 1.3** : chaque image **porteuse d’information** a une alternative textuelle, et cette alternative est **pertinente** : elle donne l’information, pas la nature de l’image (« Plan d’accès à la mairie annexe », pas « image »).
- **1.2** : chaque **image de décoration** — sans fonction ni information par rapport au contenu qu’elle accompagne — est ignorée des technologies d’assistance. Pour une balise \`<img>\` : \`alt=""\` sans aucun autre attribut qui fournirait une alternative (un \`title\` suffit à échouer), ou \`aria-hidden="true"\`, ou \`role="presentation"\`.
- **1.8** : une **image texte** porteuse d’information est remplacée par du texte stylé quand c’est possible ; un logo fait exception.

### Couleurs
- **3.1** : une information n’est jamais donnée **par la couleur seule**. Une pastille rouge pour « complet » a besoin d’un mot, d’une icône ou d’un motif.
- **3.2** : le **texte** atteint **4,5:1** avec son arrière-plan ; **3:1** suffit pour un texte de **24 px** au moins, ou de **18,5 px en gras** au moins. Un logo, un texte décoratif ou un bouton désactivé en sont exemptés.
- **3.3** : les **composants d’interface** dans leurs différents états (bordure d’un champ, case à cocher, indicateur de sélection) et les **éléments graphiques porteurs d’information** (courbes, parts d’un graphique, icône seule) atteignent **3:1** avec la couleur contiguë.`,
      examples: [
        {
          title: 'Un statut qui ne tient pas qu’à la couleur',
          bad: {
            alt: 'Liste de trois demandes faites à la mairie, chacune précédée d’une pastille de couleur : verte, orange, rouge, sans texte qui dise le statut.',
            css: `.st-l { margin: 0; padding: 0; list-style: none; }
.st-l li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid #eceef2; font-size: 14px; }
.st-d { flex: none; width: 12px; height: 12px; border-radius: 50%; }`,
            html: `<div class="mk-pad"><p class="mk-h3">Mes demandes</p><ul class="st-l" style="margin-top:8px"><li><span class="st-d" style="background:#16a34a"></span>Acte de naissance</li><li><span class="st-d" style="background:#ea580c"></span>Carte de stationnement résident</li><li><span class="st-d" style="background:#dc2626"></span>Inscription au périscolaire</li></ul></div>`,
          },
          badNote: 'Vert, orange, rouge : qui ne distingue pas ces couleurs ne sait pas où en est sa demande (3.1).',
          good: {
            alt: 'Même liste : chaque demande porte en toutes lettres son statut, « Délivrée », « En cours » ou « Refusée », avec une icône.',
            css: `.st-l { margin: 0; padding: 0; list-style: none; }
.st-l li { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 0; border-top: 1px solid #eceef2; font-size: 14px; }
.st-s { display: inline-flex; flex: none; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; }`,
            html: `<div class="mk-pad"><p class="mk-h3">Mes demandes</p><ul class="st-l" style="margin-top:8px"><li><span>Acte de naissance</span><span class="st-s" style="color:#15803d"><i data-icon="circle-check" style="--ico:16px"></i>Délivrée</span></li><li><span>Carte de stationnement résident</span><span class="st-s" style="color:#9a3412"><i data-icon="clock" style="--ico:16px"></i>En cours</span></li><li><span>Inscription au périscolaire</span><span class="st-s" style="color:#b91c1c"><i data-icon="circle-x" style="--ico:16px"></i>Refusée</span></li></ul></div>`,
          },
          goodNote: 'Le statut se lit en mots ; la couleur et l’icône ne font que le renforcer.',
        },
      ],
    },
    {
      id: 'liens-structure',
      title: 'Liens, titres et structure (thématiques 6, 8 et 9)',
      body: `### Liens
- **6.1** : chaque lien est **explicite** : son intitulé seul, ou son intitulé avec son **contexte** (la phrase, le paragraphe, la cellule de tableau où il se trouve…), dit sa fonction et sa destination. « Cliquez ici » passe dans « Pour les horaires d’été, cliquez ici », et échoue seul dans une liste de raccourcis.
- **6.2** : chaque lien a un **intitulé** : un lien icône sans nom accessible échoue.

Un intitulé qui se suffit à lui-même reste le meilleur choix : les lecteurs d’écran proposent la liste des liens de la page, hors de leur contexte.

### Éléments obligatoires
- **8.3 et 8.4** : la langue par défaut est indiquée (\`<html lang="fr">\`) et pertinente ; **8.7** : un passage dans une autre langue la déclare (\`lang="en"\`), sauf les noms propres et les mots passés dans la langue.
- **8.5 et 8.6** : chaque page a un **titre** (\`<title>\`), et ce titre est **pertinent** : il permet de retrouver la page dans l’historique ou dans la liste des onglets. Le sujet de la page d’abord, le nom du site ensuite.

### Structuration
- **9.1** : l’information est structurée par des **titres** dont la hiérarchie est pertinente ; un texte qui n’introduit aucune partie n’est pas un titre.
- **9.2** : la structure du document est cohérente : en-tête, navigation principale, contenu principal et pied de page sont balisés (\`header\`, \`nav\`, \`main\`, \`footer\`).
- **9.3** : chaque liste est une vraie liste (\`ul\`, \`ol\` ou \`dl\`).`,
      examples: [
        {
          title: 'Des raccourcis qui se comprennent seuls',
          bad: {
            alt: 'Bloc « Accès rapides » de la page d’accueil d’une mairie, avec trois liens isolés : « En savoir plus », « Cliquez ici », « Lien ».',
            css: `.ar-l { margin: 8px 0 0; padding: 0; list-style: none; }
.ar-l li { padding: 8px 0; border-top: 1px solid #eceef2; }
.ar-a { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }`,
            html: `<div class="mk-pad"><p class="mk-h3">Accès rapides</p><ul class="ar-l"><li><span class="ar-a">En savoir plus</span></li><li><span class="ar-a">Cliquez ici</span></li><li><span class="ar-a">Lien</span></li></ul></div>`,
          },
          badNote: 'Rien autour ne dit où mènent ces liens : ils échouent au critère 6.1.',
          good: {
            alt: 'Même bloc : « Horaires de la piscine », « Inscription au périscolaire », « Signaler un problème de voirie ».',
            css: `.ar-l { margin: 8px 0 0; padding: 0; list-style: none; }
.ar-l li { padding: 8px 0; border-top: 1px solid #eceef2; }
.ar-a { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }`,
            html: `<div class="mk-pad"><p class="mk-h3">Accès rapides</p><ul class="ar-l"><li><span class="ar-a">Horaires de la piscine</span></li><li><span class="ar-a">Inscription au périscolaire</span></li><li><span class="ar-a">Signaler un problème de voirie</span></li></ul></div>`,
          },
          goodNote: 'Chaque intitulé dit sa destination, même lu seul dans la liste des liens d’un lecteur d’écran.',
        },
      ],
    },
    {
      id: 'presentation',
      title: 'Présentation : focus, zoom, redistribution, espacement (thématique 10)',
      body: `- **10.4** : le texte reste lisible quand la taille des caractères est portée à **200 %** au moins.
- **10.7** : la **prise de focus est visible** : le style natif du navigateur n’est pas supprimé ou dégradé, ou un style défini par l’auteur le remplace. La méthodologie vérifie un contour ou un fond, ou les deux, contrastés à **3:1** au moins.
- **10.11** : tout reste disponible sans défilement horizontal dans une fenêtre de **320 px de large**, pour un contenu qui se lit horizontalement ; sans défilement vertical dans une fenêtre de **256 px de haut**, pour un contenu qui se lit verticalement. Un tableau de données ou une carte font exception.
- **10.12** : le texte reste lisible quand on redéfinit son espacement : interlignage à **1,5** fois la taille du texte, espace après les paragraphes à **2** fois, espacement des lettres à **0,12** fois, des mots à **0,16** fois. Le test applique ces valeurs à toute la page et cherche ce qui se coupe ou se chevauche.
- **10.13** : un contenu qui apparaît au **survol ou au focus** (info-bulle, sous-menu) peut être masqué sans bouger le pointeur ni le focus, peut être survolé sans disparaître, et reste affiché tant qu’on ne l’a pas masqué.
- **10.14** : un contenu révélé par les seules CSS (au survol) se révèle aussi au clavier et avec tout dispositif de pointage.

Pour un designer, 10.11 et 10.12 se préparent dès la maquette : des conteneurs qui grandissent avec leur texte, jamais une hauteur fixe autour d’un libellé.`,
    },
    {
      id: 'formulaires',
      title: 'Formulaires (thématique 11)',
      body: `- **11.1** : chaque champ a une **étiquette**. Le test accepte une balise \`<label for>\` associée, un \`aria-labelledby\`, un \`aria-label\`, un \`title\`, ou un bouton adjacent qui lui sert d’étiquette visible. Un texte indicatif (*placeholder*) n’en fait pas partie.
- **11.2** : l’étiquette est **pertinente** : « Date de naissance », pas « Date ».
- **11.5 et 11.6** : les champs de même nature (les boutons radio d’une même question, les trois parties d’une adresse) sont **regroupés**, et chaque regroupement a une **légende** (\`fieldset\` et \`legend\`).
- **11.9** : l’intitulé de chaque bouton est pertinent : « Envoyer ma demande » plutôt que « OK ».
- **11.10** : le **contrôle de saisie** est pertinent. Avant la validation, chaque champ obligatoire est signalé par une indication visible qui le nomme, ou par l’attribut \`required\` ou \`aria-required="true"\` ; les formats attendus sont annoncés.
- **11.11** : un message d’erreur **suggère** le type et le format attendus : « Date au format jj/mm/aaaa, par exemple 14/07/1990 », pas « Format invalide ».
- **11.13** : les champs qui concernent l’utilisateur (nom, adresse, téléphone…) portent un attribut \`autocomplete\` à la bonne valeur, pour que le navigateur les remplisse.`,
      examples: [
        {
          title: 'Une erreur qui dit comment la corriger',
          bad: {
            alt: 'Champ « Date de naissance » en erreur, contenant 31/14/1990 et bordé de rouge, avec le message « Format invalide ».',
            css: `.er-m { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #b3261e; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><span class="mk-label">Date de naissance</span><div class="mk-input mk-input--error">31/14/1990</div><p class="er-m"><i data-icon="circle-alert" style="--ico:16px"></i>Format invalide</p></div>`,
          },
          badNote: 'On sait qu’il y a une erreur, pas comment la corriger (11.11).',
          good: {
            alt: 'Même champ : le message dit que la date s’écrit jour, mois, année, avec un exemple, 14/07/1990, et rappelle qu’il n’y a que 12 mois.',
            css: `.er-m { display: flex; align-items: flex-start; gap: 6px; font-size: 13px; font-weight: 600; color: #b3261e; }
.er-m i { margin-top: 1px; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><span class="mk-label">Date de naissance</span><div class="mk-input mk-input--error">31/14/1990</div><p class="er-m"><i data-icon="circle-alert" style="--ico:16px"></i><span>Le mois doit être compris entre 01 et 12. Écris la date au format jj/mm/aaaa, par exemple 14/07/1990.</span></p></div>`,
          },
          goodNote: 'Le message nomme le problème et donne le format attendu, avec un exemple.',
        },
      ],
    },
    {
      id: 'navigation-consultation',
      title: 'Navigation, scripts et consultation (thématiques 7, 12 et 13)',
      body: `### Navigation
- **12.1** : chaque ensemble de pages offre **deux systèmes de navigation** au moins, parmi trois : un **menu**, un **plan du site**, un **moteur de recherche**. Le critère est non applicable à un site d’une seule page ou de très peu de pages, et aux pages d’un **processus** (paiement, démarche).
- **12.6 et 12.7** : les zones répétées (en-tête, navigation, contenu principal, pied de page, recherche) peuvent être atteintes ou évitées ; un **lien d’évitement** (« Aller au contenu ») précède le contenu principal, ou un lien d’accès rapide s’affiche à la prise de focus.
- **12.8** : l’**ordre de tabulation** est cohérent avec la lecture ; **12.9** : aucun **piège au clavier**.

### Scripts
- **7.1** : un composant écrit en JavaScript (onglets, accordéon, fenêtre modale) est compatible avec les technologies d’assistance : nom, rôle, état exposés.
- **7.3** : il se contrôle au **clavier** et avec tout dispositif de pointage.
- **7.5** : les **messages de statut** (« Article ajouté », « 3 résultats ») sont restitués sans déplacer le focus.

### Consultation
- **13.1** : chaque **limite de temps** qui modifie le contenu peut être arrêtée, ajustée ou prolongée.
- **13.3** : chaque **document bureautique** en téléchargement a, si nécessaire, une version accessible.
- **13.8** : un **contenu en mouvement** déclenché automatiquement dure 5 secondes au plus, ou peut être arrêté et relancé, ou masqué, ou affiché en entier sans le mouvement.`,
    },
  ],
  rules: [
    { id: 'reading', front: 'Que veut dire « hors cas particuliers » dans un critère du RGAA ?', back: 'Qu’une liste fermée de situations rend le critère non applicable : pour le contraste, un logo, un texte décoratif ou un composant désactivé.' },
    { id: 'decorative', front: 'Comment une `<img>` décorative respecte-t-elle le critère 1.2 ?', back: '`alt=""` sans aucun autre attribut d’alternative (un `title` fait échouer), ou `aria-hidden="true"`, ou `role="presentation"`.' },
    { id: 'contrast', front: 'Quels seuils de contraste fixe le critère 3.2 ?', back: '4,5:1 pour le texte ; 3:1 à partir de 24 px, ou de 18,5 px en gras.' },
    { id: 'components', front: 'Que vérifie le critère 3.3 ?', back: 'Les couleurs des composants d’interface dans leurs états, et des éléments graphiques porteurs d’information : 3:1 au moins avec la couleur contiguë.' },
    { id: 'link', front: 'Quand un lien est-il explicite au sens du critère 6.1 ?', back: 'Quand son intitulé seul, ou avec son contexte (phrase, paragraphe, cellule…), dit sa fonction et sa destination.' },
    { id: 'title', front: 'Quand un titre de page est-il pertinent (critère 8.6) ?', back: 'Quand il permet de retrouver la page dans l’historique ou la liste des onglets : le sujet de la page, puis le nom du site.' },
    { id: 'focus', front: 'Que demande le critère 10.7 ?', back: 'Une prise de focus visible : le style natif conservé, ou un style d’auteur visible. La méthodologie vérifie un contour ou un fond contrastés à 3:1.' },
    { id: 'reflow', front: 'Quelles fenêtres le critère 10.11 utilise-t-il ?', back: '320 px de large pour un contenu qui se lit horizontalement, 256 px de haut pour un contenu qui se lit verticalement : aucun défilement dans l’autre sens.' },
    { id: 'spacing', front: 'Quels espacements le texte doit-il supporter (critère 10.12) ?', back: 'Interlignage à 1,5 fois la taille du texte, 2 fois après les paragraphes, 0,12 fois entre les lettres et 0,16 fois entre les mots, sans perte.' },
    { id: 'required', front: 'Comment signaler un champ obligatoire (critère 11.10) ?', back: 'Avant la validation : une indication visible qui nomme le champ, ou l’attribut `required` ou `aria-required="true"`. Jamais par la seule couleur.' },
    { id: 'error', front: 'Que doit dire un message d’erreur de saisie (critère 11.11) ?', back: 'Le type et le format attendus, si nécessaire avec un exemple : « jj/mm/aaaa, par exemple 14/07/1990 ».' },
    { id: 'nav', front: 'Que demande le critère 12.1 ?', back: 'Deux systèmes de navigation parmi trois : menu, plan du site, moteur de recherche. Non applicable aux pages d’un processus et aux sites de très peu de pages.' },
    { id: 'wcag22', front: 'Les cibles de 24 × 24 px des WCAG 2.2 sont-elles un critère du RGAA 4.1.2 ?', back: 'Non : le RGAA 4.1.2 repose sur les WCAG 2.1. Le RGAA 5, annoncé pour fin 2026, intégrera les WCAG 2.2.' },
  ],
  exercises: [
    {
      id: 'rgaa-criteres-contact-scenario',
      type: 'scenario',
      difficulty: 2,
      context:
        'La mairie de Mirelac refait son formulaire « Nous écrire » avant son audit RGAA. La maquette est élégante : bordures de champ gris perle, texte d’aide gris clair, et un anneau de focus bleu pâle pour rester discret.',
      prompt: 'Règle les couleurs du formulaire pour qu’il passe les critères 3.2, 3.3 et 10.7 du RGAA.',
      visual: {
        alt: 'Formulaire « Nous écrire » de la mairie de Mirelac : champs Nom et prénom, Adresse électronique (qui a le focus, entouré d’un anneau) avec un texte d’aide, Message avec un texte d’aide, et bouton « Envoyer ma demande ». La couleur des bordures de champ, celle des textes d’aide et celle de l’anneau de focus suivent les réglages.',
        css: CONTACT_CSS,
        html: `<div class="mr"><div class="mr-card"><p class="mr-title">Nous écrire</p><div class="mr-f"><span class="mr-l">Nom et prénom</span><div class="mr-in">Camille Rivière</div></div><div class="mr-f"><span class="mr-l">Adresse électronique</span><div class="mr-in mr-focus">camille.riviere@</div><p class="mr-help">Exemple : nom@domaine.fr</p></div><div class="mr-f"><span class="mr-l">Message</span><div class="mr-in mr-area"></div><p class="mr-help">1 000 caractères au plus</p></div><span class="mr-btn">Envoyer ma demande</span></div></div>`,
      },
      controls: [
        { kind: 'ramp', id: 'border', label: 'Couleur des bordures de champ', colors: ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563'], initial: 1, ideal: 3 },
        { kind: 'ramp', id: 'help', label: 'Couleur des textes d’aide', colors: ['#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151'], initial: 1, ideal: 3 },
        { kind: 'ramp', id: 'focus', label: 'Couleur de l’anneau de focus', colors: ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'], initial: 1, ideal: 4 },
      ],
      readouts: [
        { kind: 'contrast', label: 'Bordures de champ', a: 'border', b: '#ffffff' },
        { kind: 'contrast', label: 'Textes d’aide', a: 'help', b: '#ffffff' },
        { kind: 'contrast', label: 'Anneau de focus', a: 'focus', b: '#ffffff' },
      ],
      criteria: [
        {
          id: 'border',
          label: 'Bordures de champ à 3:1 au moins (critère 3.3)',
          check: { kind: 'contrast', a: 'border', b: '#ffffff', min: 3 },
          why: 'Sans fond, la bordure est tout ce qui montre où se trouve le champ : un composant d’interface, qui doit atteindre 3:1 avec la couleur contiguë. Le gris perle #D1D5DB n’offre que 1,47:1 ; #6B7280 atteint 4,83:1.',
        },
        {
          id: 'help',
          label: 'Textes d’aide à 4,5:1 au moins (critère 3.2)',
          check: { kind: 'contrast', a: 'help', b: '#ffffff', min: 4.5 },
          why: 'Un texte de 13 px, sans graisse, doit atteindre 4,5:1 : il est loin des 24 px, ou des 18,5 px en gras, qui autorisent 3:1. #9CA3AF plafonne à 2,53:1.',
        },
        {
          id: 'focus',
          label: 'Anneau de focus à 3:1 au moins (critère 10.7)',
          check: { kind: 'contrast', a: 'focus', b: '#ffffff', min: 3 },
          why: 'La méthodologie du test 10.7.1 vérifie que l’indication de focus est contrastée à 3:1 au moins. Le bleu pâle #93C5FD n’atteint que 1,8:1 : au clavier, on ne sait plus où l’on est. #3B82F6 passe à 3,67:1, #2563EB à 5,16:1.',
        },
      ],
      explanation: `Trois critères du RGAA se jouent sur la couleur d’un formulaire, et aucun ne se juge à l’œil sur l’écran du designer : il faut mesurer.

- **3.3, les composants** : la bordure d’un champ sans fond le rend visible. Elle atteint **3:1** avec le fond.
- **3.2, le texte** : un texte d’aide reste du texte. Sous 24 px (ou 18,5 px en gras), il lui faut **4,5:1**.
- **10.7, le focus** : un anneau « discret » n’en est plus un. La méthodologie demande un contour ou un fond contrastés à **3:1**.

L’élégance tient alors à la forme (rayon, épaisseur, espace), pas à la pâleur.`,
      takeaway: 'Bordures de champ et anneau de focus à 3:1 au moins, texte d’aide à 4,5:1 : sur un formulaire, le RGAA se joue aussi sur la couleur.',
      sources: [C('3.2', 'contraste du texte'), C('3.3', 'contraste des composants'), C('10.7', 'prise de focus visible')],
    },
    {
      id: 'rgaa-criteres-decorative-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Une frise de feuilles purement décorative orne le haut d’un article. Quel code respecte le critère 1.2 ?',
      options: [
        { id: 'empty', label: '`<img src="frise.svg" alt="">`', why: 'Un `alt` vide, sans autre attribut d’alternative : les technologies d’assistance ignorent l’image.' },
        { id: 'title', label: '`<img src="frise.svg" alt="" title="Frise de feuilles d’automne">`', why: 'Le `title` fournit une alternative textuelle : le test 1.2.1 exige que l’image en soit dépourvue.' },
        { id: 'named', label: '`<img src="frise.svg" alt="Frise décorative">`', why: 'Le lecteur d’écran annonce « Frise décorative » : l’image n’est pas ignorée, elle ajoute du bruit.' },
        { id: 'none', label: '`<img src="frise.svg">`', why: 'Sans attribut `alt`, beaucoup de lecteurs d’écran lisent le nom du fichier.' },
      ],
      answer: 'empty',
      explanation: `Le critère 1.2 demande qu’une **image de décoration** — sans fonction ni information par rapport au contenu qu’elle accompagne — soit **ignorée** des technologies d’assistance. Pour une balise \`<img>\`, le test 1.2.1 accepte :

- un attribut \`alt=""\`, **sans aucun autre attribut** qui fournirait une alternative textuelle ;
- ou \`aria-hidden="true"\` ;
- ou \`role="presentation"\`.

Le piège est le \`title\` : il ajoute une infobulle et donne au lecteur d’écran un texte à lire. Une image décorative n’a rien à dire.`,
      takeaway: 'Image décorative : `alt=""` et rien d’autre, ou `aria-hidden="true"`, ou `role="presentation"`. Un `title` suffit à la faire échouer au critère 1.2.',
      sources: [C('1.2', 'images de décoration'), GLOSSARY],
    },
    {
      id: 'rgaa-criteres-links-multi',
      type: 'multi',
      difficulty: 1,
      prompt: 'Ces liens figurent seuls, sans phrase autour, dans le pied de page de la mairie. Lesquels sont explicites au sens du critère 6.1 ?',
      options: [
        { id: 'plan', label: '« Plan du site »', why: 'Il dit seul où il mène.' },
        { id: 'guide', label: '« Télécharger le guide du tri (PDF, 2 Mo) »', why: 'Fonction, document, format et poids : tout y est.' },
        { id: 'horaires', label: '« Horaires et accès de la mairie annexe »', why: 'Explicite sans contexte.' },
        { id: 'ici', label: '« Cliquez ici »', why: 'Sans phrase autour, rien ne dit où il mène.' },
        { id: 'plus', label: '« En savoir plus »', why: 'En savoir plus sur quoi ? Seul, il ne dit pas sa destination.' },
        { id: 'suite', label: '« Suite »', why: 'Sans contexte, l’intitulé ne veut rien dire.' },
      ],
      answers: ['plan', 'guide', 'horaires'],
      explanation: `Un lien est explicite si son **intitulé seul**, ou son intitulé **avec son contexte**, dit sa fonction et sa destination (critère 6.1). Le contexte, selon le glossaire du RGAA, c’est par exemple la phrase, le paragraphe ou la cellule de tableau où se trouve le lien.

Dans un pied de page, ces liens sont seuls : seul l’intitulé compte. « Cliquez ici », « En savoir plus » et « Suite » échouent. Placés dans une phrase qui les éclaire, ils pourraient passer ; mais un lecteur d’écran propose aussi la liste de tous les liens de la page, hors contexte. Un intitulé qui se suffit à lui-même sert tout le monde.`,
      takeaway: 'Un lien est explicite par son intitulé, ou par son intitulé et son contexte. Seul dans un pied de page, « Cliquez ici » ne dit rien.',
      sources: [C('6.1', 'liens explicites'), GLOSSARY],
    },
    {
      id: 'rgaa-criteres-title-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Après une matinée sur le site de la mairie, quel historique montre des titres de page conformes au critère 8.6 ?',
      options: [
        {
          id: 'same',
          visual: historyPanel(
            ['Mairie de Mirelac', 'Mairie de Mirelac', 'Mairie de Mirelac', 'Accueil'],
            'Panneau « Historique » d’un navigateur : quatre pages visitées, dont trois portent le même titre, « Mairie de Mirelac », et une le titre « Accueil ».',
          ),
          why: 'Trois pages au même titre : impossible de retrouver celle de la déchetterie dans l’historique ou les onglets.',
        },
        {
          id: 'specific',
          visual: historyPanel(
            [
              'Horaires de la déchetterie – Mairie de Mirelac',
              'Inscription au périscolaire, étape 2 sur 3 – Mairie de Mirelac',
              'Résultats pour « piscine » – Mairie de Mirelac',
              'Accueil – Mairie de Mirelac',
            ],
            'Panneau « Historique » d’un navigateur : quatre pages visitées, chacune avec son propre titre, le sujet de la page d’abord, puis « Mairie de Mirelac ».',
          ),
          why: 'Le sujet d’abord, le site ensuite : chaque page se retrouve d’un coup d’œil, et l’étape du processus est dite.',
        },
      ],
      answer: 'specific',
      explanation: `Le critère 8.6 juge un titre **pertinent** s’il permet de **retrouver la page dans l’historique de navigation ou dans la liste des onglets**. Un même titre pour tout le site ne distingue rien.

La bonne pratique : le **sujet de la page d’abord**, puis le nom du site. Dans un processus, l’étape fait partie du sujet (« étape 2 sur 3 ») ; dans une recherche, les mots cherchés. C’est aussi ce qu’annonce en premier un lecteur d’écran à l’arrivée sur la page.`,
      takeaway: 'Un titre de page pertinent permet de la retrouver dans l’historique ou les onglets : le sujet d’abord, le nom du site ensuite.',
      sources: [C('8.6', 'titre de page pertinent')],
    },
    {
      id: 'rgaa-criteres-headings-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Une extension liste les titres de la page « Inscription au périscolaire ». Quelle structure respecte le critère 9.1 ?',
      options: [
        {
          id: 'flat',
          visual: outline(
            [
              ['h2', 'Mairie de Mirelac'],
              ['h2', 'Nouveau !'],
              ['h2', 'Inscription au périscolaire'],
              ['h2', 'Pièces à fournir'],
              ['h2', 'Pour les enfants de moins de 6 ans'],
              ['h2', 'Tarifs'],
            ],
            'Liste des titres d’une page : six titres tous de niveau 2, dont le nom du site, le badge « Nouveau ! », le titre de la page et ses parties.',
          ),
          why: 'Tout au même niveau, « Nouveau ! » compris : la structure ne dit plus ce qui dépend de quoi.',
        },
        {
          id: 'nested',
          visual: outline(
            [
              ['h1', 'Inscription au périscolaire'],
              ['h2', 'Qui peut s’inscrire ?'],
              ['h2', 'Pièces à fournir'],
              ['h3', 'Pour les enfants de moins de 6 ans'],
              ['h2', 'Tarifs'],
            ],
            'Liste des titres d’une page : un titre de niveau 1, « Inscription au périscolaire », trois parties de niveau 2, dont « Pièces à fournir » qui contient une sous-partie de niveau 3.',
          ),
          why: 'Un titre principal, des parties, une sous-partie : la hiérarchie suit le contenu.',
        },
      ],
      answer: 'nested',
      explanation: `Le critère 9.1 demande une information **structurée par des titres** dont la **hiérarchie est pertinente**. Les personnes qui utilisent un lecteur d’écran naviguent de titre en titre : la structure leur sert de sommaire.

Dans la version à plat, tout est au même rang : on ne sait pas que « Pour les enfants de moins de 6 ans » précise « Pièces à fournir », et « Nouveau ! », un simple badge, se fait passer pour une partie de la page. La version recommandée annonce le sujet (niveau 1), ses parties (niveau 2) et la sous-partie (niveau 3).`,
      takeaway: 'Les titres forment le sommaire de la page : un sujet, des parties, des sous-parties. Un badge ou un slogan n’est pas un titre.',
      sources: [C('9.1', 'titres'), GLOSSARY],
    },
    {
      id: 'rgaa-criteres-required-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel formulaire signale correctement ses champs obligatoires ?',
      options: [
        { id: 'red', visual: requiredForm(false), why: 'Seule la couleur des étiquettes distingue les champs obligatoires : échec aux critères 3.1 et 11.10.' },
        { id: 'words', visual: requiredForm(true), why: '« (obligatoire) » nomme chaque champ concerné, avant la validation.' },
      ],
      answer: 'words',
      explanation: `Le critère **11.10** demande que les champs obligatoires soient signalés **avant la validation** du formulaire : par une indication visible qui identifie nommément chaque champ, ou par l’attribut \`required\` ou \`aria-required="true"\`.

Ici, la seule différence entre « Nom » et « Téléphone » est la couleur de l’étiquette : une information donnée **par la couleur seule**, qui échoue aussi au critère **3.1**. Écrire « (obligatoire) » dans l’étiquette règle les deux, pour tout le monde : la mention est vue, et lue avec le nom du champ.`,
      takeaway: 'Un champ obligatoire se signale en mots dans son étiquette (« obligatoire »), avant la validation : jamais par la seule couleur.',
      sources: [C('11.10', 'contrôle de saisie'), C('3.1', 'information par la couleur')],
    },
    {
      id: 'rgaa-criteres-chart-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel graphique respecte le critère 3.1 ?',
      options: [
        { id: 'color', visual: poolChart(false), why: 'Vert et rouge, et une légende en pastilles : distinguer 2025 de 2026 suppose de distinguer ces couleurs.' },
        { id: 'pattern', visual: poolChart(true), why: 'Plein pour 2025, hachuré pour 2026, et les valeurs sur les barres : la couleur n’est plus seule à porter l’information.' },
      ],
      answer: 'pattern',
      explanation: `Le critère **3.1** interdit de donner une information **uniquement par la couleur**. Dans un graphique à deux séries, la couleur dit souvent seule quelle barre correspond à quelle année : pour une personne qui confond le rouge et le vert, les deux séries se ressemblent.

La version recommandée ajoute deux indices : un **motif** (plein ou hachuré), repris dans la légende, et la **valeur** sur chaque barre. Les deux barres d’une même piscine gardent la même teinte, et l’écart se lit sans couleur.`,
      takeaway: 'Dans un graphique, une série se reconnaît aussi par un motif, une forme ou une valeur écrite, jamais par la seule couleur.',
      sources: [C('3.1', 'information par la couleur'), C('3.3', 'contraste des éléments graphiques')],
    },
    {
      id: 'rgaa-criteres-home-hotspot',
      type: 'hotspot',
      difficulty: 1,
      context: 'Le diaporama en haut de la page défile tout seul, en boucle, toutes les quatre secondes.',
      prompt: 'Trouve les trois non-conformités de cette page d’accueil de médiathèque.',
      visual: {
        frame: 'browser',
        alt: 'Page d’accueil de la médiathèque de Mirelac : logo, champ de recherche, un diaporama avec ses flèches et ses points, un agenda de trois ateliers précédés de pastilles de couleur, un lien « Voir tout l’agenda » et une note en gris clair sur les inscriptions.',
        css: `.md-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #eceef2; }
.md-logo { font-weight: 800; }
.md-search { display: flex; align-items: center; gap: 6px; min-width: 0; padding: 6px 10px; border: 1px solid #868d9c; border-radius: 6px; font-size: 13px; color: #5a6172; }
.md-body { display: flex; flex-direction: column; gap: 12px; padding: 14px 16px 16px; }
.md-slide { position: relative; display: flex; align-items: flex-end; min-height: 110px; padding: 12px; border-radius: 10px; background: linear-gradient(160deg, #1b3a6b, #2d5a9e); color: #ffffff; }
.md-slide p { font-size: 16px; font-weight: 700; }
.md-dots { position: absolute; top: 10px; right: 12px; display: flex; gap: 5px; }
.md-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgb(255 255 255 / 0.5); }
.md-dots span:first-child { background: #ffffff; }
.md-arrows { position: absolute; bottom: 10px; right: 12px; display: flex; gap: 6px; }
.md-arrows span { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: rgb(255 255 255 / 0.2); }
.md-h { font-size: 15px; font-weight: 700; }
.md-ag { margin: 0; padding: 0; list-style: none; }
.md-ag li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px solid #eceef2; font-size: 14px; }
.md-dot { flex: none; width: 12px; height: 12px; border-radius: 50%; }
.md-link { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; font-size: 14px; }
.md-note { font-size: 13px; color: #9ca3af; }`,
        html: `<div class="md-top"><span class="md-logo" data-hotspot="logo">Médiathèque de Mirelac</span><span class="md-search" data-hotspot="search"><i data-icon="search" style="--ico:14px"></i>Rechercher un livre, un film…</span></div><div class="md-body"><div class="md-slide" data-hotspot="slider" data-hotspot-name="Diaporama"><p>Nuit de la lecture : samedi 23 janvier</p><span class="md-dots"><span></span><span></span><span></span></span><span class="md-arrows"><span><i data-icon="chevron-left" style="--ico:16px"></i></span><span><i data-icon="chevron-right" style="--ico:16px"></i></span></span></div><p class="md-h">Agenda des ateliers</p><ul class="md-ag" data-hotspot="dots"><li><span class="md-dot" style="background:#16a34a"></span>Atelier BD · mercredi 14 h</li><li><span class="md-dot" style="background:#dc2626"></span>Initiation au numérique · jeudi 10 h</li><li><span class="md-dot" style="background:#16a34a"></span>Heure du conte · samedi 11 h</li></ul><span class="md-link" data-hotspot="agenda">Voir tout l’agenda</span><p class="md-note" data-hotspot="note">Inscription obligatoire à l’accueil ou par téléphone.</p></div>`,
      },
      hotspots: [
        { id: 'slider', label: 'Diaporama sans bouton pause', correct: true, why: 'Il défile tout seul, en boucle, au-delà de 5 secondes, et rien ne permet de l’arrêter ou de le masquer : échec au critère 13.8.' },
        { id: 'dots', label: 'Places disponibles dites par la couleur', correct: true, why: 'Vert ou rouge, sans mot ni icône : qui ne distingue pas ces couleurs ne sait pas quel atelier est complet (critère 3.1).' },
        { id: 'note', label: 'Note en gris clair', correct: true, why: '#9CA3AF sur blanc n’offre que 2,53:1 pour un texte de 13 px : il en faut 4,5:1 (critère 3.2).' },
        { id: 'logo', label: 'Nom de la médiathèque', correct: false, why: 'Un texte foncé et contrasté ; un logo serait de toute façon exempté du critère 3.2.' },
        { id: 'search', label: 'Champ de recherche', correct: false, why: 'Bordure et texte contrastés ; le moteur de recherche est l’un des deux systèmes de navigation du critère 12.1.' },
        { id: 'agenda', label: 'Lien « Voir tout l’agenda »', correct: false, why: 'Intitulé explicite, souligné et contrasté.' },
      ],
      explanation: `Trois défauts, deux thématiques :

- **Consultation (13.8)** : un contenu en mouvement déclenché automatiquement dure 5 secondes au plus, ou peut être arrêté et relancé, masqué, ou affiché en entier sans mouvement. Un diaporama sans bouton pause empêche de lire à son rythme, et capte l’attention des personnes qui ont du mal à se concentrer.
- **Couleurs (3.1)** : « complet » ou « places libres » ne peut pas reposer sur une pastille de couleur. Un mot (« Complet ») règle le problème.
- **Couleurs (3.2)** : la note sur l’inscription, information pratique, est en gris trop clair ; il lui faut 4,5:1.`,
      takeaway: 'Un diaporama qui défile seul se met en pause, un statut se dit en mots, et un texte d’information atteint 4,5:1, même en petit.',
      sources: [C('13.8', 'contenus en mouvement'), C('3.1', 'information par la couleur'), C('3.2', 'contraste du texte')],
    },
    {
      id: 'rgaa-criteres-form-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux non-conformités de ce formulaire de demande d’acte, après une première validation.',
      visual: {
        frame: 'browser',
        alt: 'Formulaire de demande d’acte de naissance après une validation : note sur les champs obligatoires, champs Nom de naissance, Date de naissance avec un message d’erreur, Adresse électronique avec une aide, une grande zone de texte vide marquée seulement « Précisez votre demande… », et un bouton « Envoyer la demande ».',
        css: `.fa { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
.fa-t { font-size: 18px; font-weight: 700; }
.fa-n { font-size: 13px; color: #5a6172; }
.fa-f { display: flex; flex-direction: column; gap: 4px; }
.fa-l { font-size: 13px; font-weight: 600; }
.fa-o { font-weight: 400; color: #5a6172; }
.fa-h { font-size: 13px; color: #5a6172; }
.fa-e { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #b3261e; }
.fa-ph { min-height: 64px; color: #6b7280; }
.fa-btn { align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px; border-radius: 8px; background: #1d2230; color: #ffffff; font-weight: 600; }`,
        html: `<div class="fa"><p class="fa-t">Demande d’acte de naissance</p><p class="fa-n" data-hotspot="note">Tous les champs sont obligatoires, sauf mention « (facultatif) ».</p><div class="fa-f" data-hotspot="name"><span class="fa-l">Nom de naissance</span><div class="mk-input">Lemoine</div></div><div class="fa-f" data-hotspot="date"><span class="fa-l">Date de naissance</span><div class="mk-input mk-input--error">31/14/1990</div><p class="fa-e"><i data-icon="circle-alert" style="--ico:16px"></i>Format invalide</p></div><div class="fa-f" data-hotspot="email"><span class="fa-l">Adresse électronique</span><div class="mk-input">c.lemoine@exemple.fr</div><p class="fa-h">Nous y enverrons l’accusé de réception.</p></div><div class="mk-input fa-ph" data-hotspot="message">Précisez votre demande…</div><span class="fa-btn" data-hotspot="submit">Envoyer la demande</span></div>`,
      },
      hotspots: [
        { id: 'date', label: 'Erreur « Format invalide »', correct: true, why: 'Le message ne dit pas le format attendu : il doit le suggérer, par exemple « jj/mm/aaaa, comme 14/07/1990 » (critère 11.11).' },
        { id: 'message', label: 'Zone de texte sans étiquette', correct: true, why: 'Seul un texte indicatif nomme le champ, et il disparaît à la saisie : il faut une étiquette (critère 11.1), pertinente (11.2).' },
        { id: 'note', label: 'Note sur les champs obligatoires', correct: false, why: 'Elle dit, avant la validation, que tous les champs sont obligatoires sauf mention contraire : une indication visible et claire.' },
        { id: 'name', label: 'Champ « Nom de naissance »', correct: false, why: 'Étiquette visible et pertinente.' },
        { id: 'email', label: 'Champ « Adresse électronique »', correct: false, why: 'Étiquette pertinente et une aide utile sous le champ.' },
        { id: 'submit', label: 'Bouton « Envoyer la demande »', correct: false, why: 'Un intitulé qui dit ce que fait le bouton (critère 11.9).' },
      ],
      explanation: `Deux critères de la thématique **Formulaires** échouent :

- **11.11, la suggestion** : « Format invalide » signale l’erreur sans dire comment la corriger. Le message doit suggérer le type et le format attendus, idéalement avec un exemple.
- **11.1, l’étiquette** : un texte indicatif n’est pas une étiquette. Le test 11.1.1 en liste les moyens : \`<label for>\`, \`aria-labelledby\`, \`aria-label\`, \`title\`, ou un bouton adjacent. Une étiquette visible au-dessus de la zone (« Votre demande ») sert à la fois à ceux qui voient et aux lecteurs d’écran.

La note de départ, elle, respecte le critère 11.10 : elle annonce les champs obligatoires avant la validation.`,
      takeaway: 'Un message d’erreur dit le format attendu, avec un exemple ; chaque champ a une vraie étiquette, jamais un simple texte indicatif.',
      sources: [C('11.11', 'suggestions de correction'), C('11.1', 'étiquettes'), C('11.10', 'contrôle de saisie')],
    },
    {
      id: 'rgaa-criteres-nav-choice',
      type: 'choice',
      difficulty: 3,
      context: 'Le site de la mairie compte une soixantaine de pages. Chaque page affiche le même menu principal en haut.',
      prompt: 'Que faut-il ajouter pour respecter le critère 12.1 ?',
      options: [
        { id: 'second', label: 'Un plan du site, ou un moteur de recherche', why: 'Avec le menu, l’un des deux suffit : le test 12.1.1 demande deux systèmes de navigation parmi trois.' },
        { id: 'crumbs', label: 'Un fil d’Ariane sur chaque page', why: 'Utile pour se situer, mais ce n’est pas l’un des trois systèmes que liste le test 12.1.1 : menu, plan du site, moteur de recherche.' },
        { id: 'footer', label: 'Le même menu, répété dans le pied de page', why: 'Deux menus restent un seul système de navigation : il faut un système d’une autre nature.' },
        { id: 'nothing', label: 'Rien : le critère vise seulement les pages d’un processus', why: 'C’est l’inverse : les pages d’un processus sont celles où le critère est non applicable.' },
      ],
      answer: 'second',
      explanation: `Le critère **12.1** demande que chaque ensemble de pages dispose de **deux systèmes de navigation différents** au moins. Le test 12.1.1 en fixe les combinaisons :

- un menu de navigation et un plan du site ;
- un menu de navigation et un moteur de recherche ;
- un moteur de recherche et un plan du site.

Le critère est **non applicable** à un site d’une seule page ou de très peu de pages, toutes atteignables depuis l’accueil, et aux pages d’un **processus** (paiement, démarche), où un menu détournerait de la tâche. Pour un site de soixante pages, un plan du site — l’une des pages obligatoires de l’échantillon d’audit — est souvent le plus simple.`,
      takeaway: 'Critère 12.1 : deux systèmes de navigation parmi menu, plan du site et moteur de recherche ; non applicable dans un processus.',
      sources: [C('12.1', 'deux systèmes de navigation')],
    },
    {
      id: 'rgaa-criteres-reflow-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Dans quelles conditions le critère 10.11 vérifie-t-il qu’une page reste utilisable sans perte ?',
      options: [
        { id: 'w320', label: 'Une fenêtre de 320 px de large, pour un contenu qui se lit horizontalement', why: 'C’est le test 10.11.1 : aucun défilement horizontal.' },
        { id: 'h256', label: 'Une fenêtre de 256 px de haut, pour un contenu qui se lit verticalement', why: 'C’est le test 10.11.2 : aucun défilement vertical.' },
        { id: 'w375', label: 'Une fenêtre de 375 px de large, celle d’un téléphone courant', why: 'Le RGAA fixe 320 px, plus étroit : une page qui passe à 375 px peut encore déborder.' },
        { id: 'zoom', label: 'Un texte agrandi à 200 %', why: 'C’est le critère 10.4, qui porte sur la taille des caractères, pas sur la largeur de la fenêtre.' },
        { id: 'tablet', label: 'Une fenêtre de 1 024 px de large, sur tablette', why: 'Aucun test du critère 10.11 ne porte sur cette largeur.' },
      ],
      answers: ['w320', 'h256'],
      explanation: `Le critère **10.11** porte sur la **redistribution** : les contenus doivent pouvoir s’afficher sans perte d’information ni de fonctionnalité, et sans défilement dans les deux sens.

- **320 px de large** pour un contenu dont le sens de lecture est horizontal, comme le français : rien ne doit obliger à défiler de gauche à droite.
- **256 px de haut** pour un contenu dont le sens de lecture est vertical (certains textes en japonais, par exemple).

Un tableau de données, une carte ou un schéma, qui ont besoin de deux dimensions, font exception. Le zoom du texte à 200 %, lui, relève du critère 10.4.`,
      takeaway: 'Critère 10.11 : aucun défilement horizontal à 320 px de large (texte horizontal), aucun défilement vertical à 256 px de haut (texte vertical).',
      sources: [C('10.11', 'redistribution'), C('10.4', 'agrandissement du texte')],
    },
    {
      id: 'rgaa-criteres-bold-tf',
      type: 'truefalse',
      difficulty: 3,
      prompt: 'Au regard du critère 3.2, un libellé en gras de 19 px peut se contenter d’un contraste de 3:1 avec son fond.',
      answer: true,
      explanation: `Vrai. Le critère **3.2** abaisse le seuil à **3:1** pour deux cas : un texte sans graisse de **24 px** ou plus (test 3.2.3), et un texte **en gras** de **18,5 px** ou plus (test 3.2.4). Un libellé en gras de 19 px entre dans le second.

Attention à la graisse réelle : un texte en demi-gras léger, rendu fin par la police, n’a pas l’effet d’un gras. Et sous 18,5 px en gras, comme sous 24 px sans graisse, le seuil reste 4,5:1.`,
      takeaway: 'Critère 3.2 : 3:1 suffit à partir de 24 px, ou de 18,5 px en gras ; en dessous, 4,5:1.',
      sources: [C('3.2', 'contraste du texte')],
    },
    {
      id: 'rgaa-criteres-targets-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Le RGAA 4.1.2 exige que chaque cible cliquable mesure au moins 24 × 24 px.',
      answer: false,
      explanation: `Faux. La taille minimale des cibles (critère **2.5.8**, niveau AA) est un ajout des **WCAG 2.2**. Le RGAA 4.1.2 repose sur les WCAG 2.1, à travers la norme EN 301 549 V2.1.2 : il n’a pas de critère de taille de cible.

La DINUM annonce que le RGAA 5, prévu pour fin 2026, intégrera les WCAG 2.2. En attendant, des cibles de 24 × 24 px au moins, et de 44 × 44 px au toucher, restent une bonne pratique qui ne coûte rien à adopter dès maintenant.`,
      takeaway: 'La taille des cibles vient des WCAG 2.2 : ce n’est pas un critère du RGAA 4.1.2, mais le RGAA 5 l’intégrera. Applique-la dès maintenant.',
      sources: [RGAA5, WCAG22_NEW, METHOD],
    },
    {
      id: 'rgaa-criteres-spacing-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Range les étapes du test 10.12.1 (espacement du texte) dans l’ordre.',
      items: [
        { id: 'styles', label: 'Appliquer à la page un interlignage de 1,5, 2em après chaque paragraphe, 0,12em entre les lettres et 0,16em entre les mots' },
        { id: 'browse', label: 'Parcourir la page avec ces styles' },
        { id: 'spot', label: 'Repérer les textes coupés, superposés ou masqués, et les fonctions devenues inaccessibles' },
        { id: 'conclude', label: 'Conclure : non conforme dès qu’un contenu ou une fonction est perdu' },
      ],
      explanation: `Le test **10.12.1** simule ce que fait une personne qui agrandit les espacements pour mieux lire, avec une extension ou sa propre feuille de style :

1. **Appliquer** les valeurs du référentiel : \`line-height: 1.5\`, \`margin-bottom: 2em\` sur les paragraphes, \`letter-spacing: 0.12em\`, \`word-spacing: 0.16em\`.
2. **Parcourir** la page.
3. **Repérer** ce qui casse : un libellé tronqué dans un bouton à hauteur fixe, deux lignes qui se chevauchent, un texte masqué par un \`overflow: hidden\`.
4. **Conclure** : il suffit d’un contenu perdu pour que le critère soit non conforme.

Côté design, la parade est simple : des boutons et des conteneurs qui grandissent avec leur texte.`,
      takeaway: 'Test 10.12.1 : appliquer interlignage 1,5, paragraphes 2em, lettres 0,12em, mots 0,16em, puis chercher ce qui se coupe ou se chevauche.',
      sources: [C('10.12', 'espacement du texte')],
    },
    {
      id: 'rgaa-criteres-themes-match',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque situation au critère du RGAA qui la vérifie.',
      leftTitle: 'Situation',
      rightTitle: 'Critère',
      pairs: [
        { id: 'skip', left: 'Un lien « Aller au contenu » en tête de page', right: '12.7 — lien d’évitement' },
        { id: 'deco', left: 'Une frise décorative ignorée par les lecteurs d’écran', right: '1.2 — image de décoration' },
        { id: 'lang', left: 'Une citation en anglais balisée avec `lang="en"`', right: '8.7 — changement de langue' },
        { id: 'title', left: '« Horaires de la piscine – Mirelac » dans l’onglet du navigateur', right: '8.6 — titre de page pertinent' },
        { id: 'auto', left: 'Le navigateur propose ton adresse dans le champ « Adresse »', right: '11.13 — finalité des champs' },
        { id: 'status', left: '« 3 résultats » annoncé par le lecteur d’écran sans déplacer le focus', right: '7.5 — messages de statut' },
      ],
      explanation: `Ces six situations couvrent cinq thématiques du RGAA :

- **Navigation** : le **lien d’évitement** (12.7) permet de sauter l’en-tête et le menu.
- **Images** : une image de **décoration** est ignorée (1.2).
- **Éléments obligatoires** : un **changement de langue** est déclaré (8.7), pour que la synthèse vocale change de voix ; un **titre de page** permet de retrouver la page (8.6).
- **Formulaires** : l’attribut \`autocomplete\` dit la **finalité** du champ (11.13), et le navigateur peut le remplir.
- **Scripts** : un **message de statut** est restitué sans prendre le focus (7.5).`,
      takeaway: '12.7 lien d’évitement, 1.2 image décorative, 8.7 changement de langue, 8.6 titre de page, 11.13 autocomplete, 7.5 messages de statut.',
      sources: [C('12.7', 'lien d’évitement'), C('8.7', 'changement de langue'), C('11.13', 'finalité des champs'), C('7.5', 'messages de statut'), CRITERIA],
    },
  ],
};

export default rgaaCriteres;
