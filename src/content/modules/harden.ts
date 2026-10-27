import type { ModuleContent, SourceRef } from '../../engine/types';

/*
 * Intl outputs quoted below were checked with Node 22 (ICU): fr-FR compact currency of 987 654 321
 * gives "988 M €" (or "987,7 M €" with maximumFractionDigits: 1); PluralRules('fr').select(0) is "one";
 * PluralRules('ar') has six categories; '😀'.length is 2 and the family emoji is 8 UTF-16 code units.
 */

const W3C_TEXT_SIZE: SourceRef = { label: 'W3C — Text size in translation', url: 'https://www.w3.org/International/articles/article-text-size' };
const NNG_ERRORS: SourceRef = { label: 'Nielsen Norman Group — Error-Message Guidelines', url: 'https://www.nngroup.com/articles/error-message-guidelines/' };
const NNG_PROGRESS: SourceRef = {
  label: 'Nielsen Norman Group — Progress Indicators Make a Slow System Less Insufferable',
  url: 'https://www.nngroup.com/articles/progress-indicators/',
};
const MDN_STATUS: SourceRef = { label: 'MDN — Codes de réponse HTTP', url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status' };
const MDN_MINWIDTH: SourceRef = { label: 'MDN — min-width', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/min-width' };
const MDN_TEXT_OVERFLOW: SourceRef = { label: 'MDN — text-overflow', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/text-overflow' };
const MDN_PLURAL: SourceRef = { label: 'MDN — Intl.PluralRules', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules' };
const MDN_IDEMPOTENT: SourceRef = { label: 'MDN — Idempotent', url: 'https://developer.mozilla.org/fr/docs/Glossary/Idempotent' };
const MDN_POINTER: SourceRef = { label: 'MDN — Évènements de pointeur', url: 'https://developer.mozilla.org/fr/docs/Web/API/Pointer_events' };
const OWASP_VALIDATION: SourceRef = {
  label: 'OWASP — Input Validation Cheat Sheet',
  url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html',
};
const CSS_TRICKS_IOS: SourceRef = {
  label: 'CSS-Tricks — 16px or Larger Text Prevents iOS Form Zoom',
  url: 'https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/',
};
const CSS_TRICKS_FLEX: SourceRef = { label: 'CSS-Tricks — Flexbox and Truncated Text', url: 'https://css-tricks.com/flexbox-truncated-text/' };

/* ---------- Shared mock pieces ---------- */

const TABLE_CSS = `
.har-tr { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) 96px; gap: 10px; align-items: center; padding: 8px 0; border-bottom: 1px solid #eceef2; }
.har-th { font-size: 12px; font-weight: 600; color: #5a6172; }
.har-num { text-align: end; font-variant-numeric: tabular-nums; }
.har-st { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.har-st--ok { background: #e3f3ea; color: #1d6b40; }
.har-st--wait { background: #fdf0dc; color: #8a4b00; }
`;

const KPI_CSS = `
.har-kpi { display: flex; flex-direction: column; gap: 4px; min-width: 0; padding: 12px; border: 1px solid #e1e4ea; border-radius: 10px; }
.har-kpi b { font-size: 22px; line-height: 1.2; font-variant-numeric: tabular-nums; }
`;

const KPI_GRID_CSS = `${KPI_CSS}
.har-kpis { display: flex; flex-wrap: wrap; gap: 10px; }
.har-kpis .har-kpi { flex: 0 0 150px; }
.har-kpis b { font-size: 21px; }
`;

const SEARCH_HEAD = `<span class="mk-input" style="display:flex;align-items:center;gap:8px"><i data-icon="search" style="--ico:16px"></i>Müller</span>
  <div class="har-tr har-th"><span>Client</span><span>Ville</span><span class="har-num">Commandes</span></div>`;

/** Arabic settings list; only the directional icons change between the two versions. */
const AR_SETTINGS = (back: string, chevron: string) => `<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="mk-row" style="--gap:10px"><i data-icon="${back}"></i><p class="mk-h2">الإعدادات</p></div>
  <ul class="mk-list">
    <li><i data-icon="user" style="--ico:18px"></i><span class="mk-grow">الحساب</span><i data-icon="${chevron}" style="--ico:16px"></i></li>
    <li><i data-icon="bell" style="--ico:18px"></i><span class="mk-grow">الإشعارات</span><i data-icon="${chevron}" style="--ico:16px"></i></li>
    <li><i data-icon="languages" style="--ico:18px"></i><span class="mk-grow">اللغة</span><span class="mk-small mk-muted">العربية</span><i data-icon="${chevron}" style="--ico:16px"></i></li>
    <li><i data-icon="lock" style="--ico:18px"></i><span class="mk-grow">الخصوصية</span><i data-icon="${chevron}" style="--ico:16px"></i></li>
  </ul>
</div>`;

/** Arabic conversation list for the RTL duel. */
const AR_CHATS = (back: string) => `<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="mk-row" style="--gap:10px"><i data-icon="${back}"></i><p class="mk-h2">المحادثات</p></div>
  <ul class="mk-list">
    <li><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">سارة العلي</p><p class="mk-small mk-muted">أراك غداً في الاجتماع</p></div><span class="mk-small mk-muted">١٠:٤٥</span></li>
    <li><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">يوسف حداد</p><p class="mk-small mk-muted">تم إرسال الملف</p></div><span class="mk-small mk-muted">٩:٢٠</span></li>
    <li><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">ليلى منصور</p><p class="mk-small mk-muted">شكراً جزيلاً</p></div><span class="mk-small mk-muted">أمس</span></li>
  </ul>
</div>`;

const NOTE_BODY = `<p class="mk-h2">Notes de réunion — lancement</p>
    <p class="mk-muted">Décisions&nbsp;: ouverture des précommandes le 4 novembre, envoi de la lettre d’information la veille, point d’étape le 12.</p>
    <p class="mk-muted">À faire&nbsp;: valider les visuels avec Inès, relire les conditions de vente.</p>`;

const harden: ModuleContent = {
  id: 'harden',
  title: 'Robustesse : cas limites, erreurs, i18n',
  category: 'affiner',
  summary:
    'Rendre une interface prête pour la production : textes extrêmes, grands nombres, erreurs réseau et serveur, traductions, écritures de droite à gauche, formats locaux, double clic et gestes interrompus.',
  minutes: 13,
  commands: ['harden', 'clarify'],
  sources: ['imp:harden', 'imp:clarify', 'mdn:intl', 'mdn:logical', 'w3c:i18n', 'w3c:alreq', W3C_TEXT_SIZE, NNG_ERRORS],
  sections: [
    {
      id: 'vraies-donnees',
      title: 'Les données parfaites n’existent pas',
      body: `Une interface qui ne marche qu’avec des données parfaites n’est pas prête pour la production. Teste-la avec ce que les gens lui feront vraiment subir :

- **Textes extrêmes** : noms de 60 ou 100 caractères, titres sans espace, champ vide ou d’un seul caractère.
- **Caractères spéciaux** : accents, emoji, arabe ou hébreu, chinois, japonais, coréen.
- **Grands nombres** : millions, milliards, montants à 9 chiffres.
- **Beaucoup d’éléments** : 1 000 lignes, 50 options dans une liste — pagination ou défilement virtuel, recherche et filtres ; on ne charge pas 10 000 éléments d’un coup.
- **Aucune donnée** : liste vide, recherche sans résultat, aucune notification — toujours avec une action claire pour avancer.
- **Mauvaises conditions** : hors ligne, connexion lente, délai dépassé, erreurs serveur, actions simultanées.

Les maquettes « parfaites » cachent ces cas ; la vérification consiste à les **provoquer** : coller un nom de 100 caractères, mettre des emoji dans chaque champ, cliquer dix fois de suite sur « Envoyer », couper le réseau, ralentir la connexion, passer l’interface en arabe.`,
      examples: [
        {
          title: 'Une recherche sans résultat',
          bad: {
            alt: 'Recherche de clients « Müller » : sous les en-têtes de colonnes, la zone de résultats reste entièrement blanche.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  ${SEARCH_HEAD}
  <div style="padding:56px 0"></div>
</div>`,
            css: TABLE_CSS,
          },
          badNote: 'Rien ne dit si la recherche est finie, si elle a échoué ou s’il n’y a vraiment personne.',
          good: {
            alt: 'Même recherche : un message indique qu’aucun client ne correspond à « Müller », suggère d’autres critères et propose d’effacer la recherche.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  ${SEARCH_HEAD}
  <div class="mk-center mk-stack" style="--gap:6px;padding:22px 0">
    <p class="mk-h3">Aucun client ne correspond à «&#8239;Müller&#8239;»</p>
    <p class="mk-small mk-muted">Vérifiez l’orthographe, ou cherchez par ville ou par numéro de client.</p>
    <span class="mk-btn mk-btn--ghost mk-btn--s" style="align-self:center">Effacer la recherche</span>
  </div>
</div>`,
            css: TABLE_CSS,
          },
          goodNote: 'Le résultat vide est annoncé, expliqué, et une issue est proposée.',
        },
      ],
    },
    {
      id: 'debordement',
      title: 'Débordement : le texte doit toujours avoir une issue',
      body: `Un texte long a trois issues possibles, à choisir selon le rôle de l’élément :

- **Revenir à la ligne** (par défaut, souvent le meilleur choix) : \`overflow-wrap: break-word\` coupe les mots trop longs (URL, références), \`hyphens: auto\` ajoute des césures quand la langue est déclarée.
- **Tronquer sur une ligne** : \`overflow: hidden\` + \`text-overflow: ellipsis\` + \`white-space: nowrap\`. Le texte complet doit rester accessible ailleurs (infobulle, page de détail).
- **Limiter à quelques lignes** : \`line-clamp\` (avec les préfixes \`-webkit-\` encore nécessaires).

Le piège classique des mises en page flexibles : par défaut, un enfant flex ou grid ne rétrécit pas sous la largeur de son contenu (\`min-width: auto\`). Un nom de fichier sans espace pousse alors les boutons hors du cadre. La correction : \`min-width: 0\` sur l’enfant qui doit rétrécir (et \`min-height: 0\` dans une grille).

- Pas de **largeur fixe** sur un conteneur de texte : les conteneurs grandissent avec leur contenu.
- Ne tronque jamais un **nombre** : « 12 480 3… » devient faux. Préfère une notation compacte — \`Intl.NumberFormat\` avec \`notation: 'compact'\` donne « 988 M € » en français — et garde la valeur exacte accessible.
- Teste le **zoom à 200 %**.
- Sur mobile, les champs de formulaire font au moins **16 px** : en dessous, Safari sur iOS zoome de force sur le champ au focus et casse la mise en page. Le corps de texte suit le même plancher ; 14 px seulement pour du texte vraiment secondaire.`,
      examples: [
        {
          title: 'Un nom de fichier sans fin',
          bad: {
            alt: 'Ligne de fichier dont le nom très long, sans espace, sort de la carte et repousse la taille et le bouton de téléchargement hors du cadre.',
            html: `<div class="mk-pad"><div class="mk-card"><div class="mk-row"><i data-icon="file-text"></i><span class="har-nowrap">Rapport_annuel_2026_version_finale_validée_par_la_direction_v3.pdf</span><span class="mk-small mk-muted">2,4&nbsp;Mo</span><span class="mk-btn mk-btn--ghost mk-btn--s"><i data-icon="download" style="--ico:14px"></i>Télécharger</span></div></div></div>`,
            css: `.har-nowrap { white-space: nowrap; font-weight: 600; }`,
          },
          badNote: 'L’enfant flex refuse de rétrécir sous la largeur de son contenu : tout ce qui suit passe hors champ.',
          good: {
            alt: 'Même ligne : le nom est tronqué par des points de suspension avant l’extension .pdf, et la taille et le bouton restent visibles.',
            html: `<div class="mk-pad"><div class="mk-card"><div class="mk-row mk-wrap" style="--gap:8px 10px"><i data-icon="file-text"></i><span class="har-fname" title="Rapport_annuel_2026_version_finale_validée_par_la_direction_v3.pdf"><span class="har-base">Rapport_annuel_2026_version_finale_validée_par_la_direction_v3</span><span>.pdf</span></span><span class="mk-row" style="--gap:10px;margin-inline-start:auto"><span class="mk-small mk-muted">2,4&nbsp;Mo</span><span class="mk-btn mk-btn--ghost mk-btn--s"><i data-icon="download" style="--ico:14px"></i>Télécharger</span></span></div></div></div>`,
            css: `.har-fname { display: flex; flex: 1 1 150px; min-width: 0; font-weight: 600; }
.har-base { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`,
          },
          goodNote: 'min-width: 0 et une ellipse sur la base du nom : l’extension reste visible, et le nom complet s’affiche en infobulle.',
        },
      ],
    },
    {
      id: 'i18n',
      title: 'Traduire, inverser, écrire autrement',
      body: `**Expansion du texte.** Prévois **30 à 40 %** d’espace en plus pour les traductions ; l’allemand est souvent ~30 % plus long que l’anglais. Les chaînes courtes gonflent le plus : selon les moyennes d’IBM reprises par le W3C, un texte anglais de 10 caractères ou moins peut atteindre deux à trois fois sa longueur une fois traduit. Teste avec la langue la plus longue, évite les largeurs fixes, et écris des messages complets plutôt que des fragments concaténés, pour que les traducteurs puissent réordonner les variables.

**Droite à gauche (RTL).** En arabe et en hébreu, toute la mise en page se met en miroir. Utilise les **propriétés logiques** — \`margin-inline-start\` plutôt que \`margin-left\`, \`padding-inline\`, \`border-inline-end\` — et l’attribut \`dir="rtl"\`. Les icônes directionnelles (flèche retour, chevron « suivant ») se retournent ; une icône sans direction (une cloche, un cadenas) reste telle quelle.

**Écritures arabes** (arabe, persan, ourdou, pachto, kurde) :

- **Conserve le ZWNJ** (U+200C, antiliant sans chasse) : en persan et en kurde, il coupe la liaison cursive à l’intérieur d’un mot composé. Un filtre qui le supprime change l’orthographe, voire le sens.
- **Variantes de lettres** : le persan utilise ی (U+06CC) et ک (U+06A9), l’arabe ي (U+064A) et ك (U+0643). Conserve la forme d’origine, mais traite-les comme **équivalentes** pour la recherche et la validation : refuser l’une bloque les gens dont le clavier envoie l’autre.
- **Chiffres et calendriers** : \`new Intl.NumberFormat('fa-IR').format(1234)\` écrit « ۱٬۲۳۴ », la locale \`ar-SA\` « ١٬٢٣٤ » ; \`Intl.DateTimeFormat\` suit le calendrier persan (hégire solaire) avec \`fa-IR\`, le calendrier hégirien avec \`ar-SA-u-ca-islamic\`.

**Chinois, japonais, coréen (CJK) et emoji** : encodage UTF-8 partout, polices qui couvrent ces écritures, et prudence avec les compteurs de caractères — en JavaScript, \`'😀'.length\` vaut 2, et l’emoji « famille » compte 8 unités pour un seul caractère visible.`,
      examples: [
        {
          title: 'Mettre la mise en page en miroir',
          bad: {
            alt: 'Écran de réglages en arabe dont la mise en page est restée de gauche à droite : flèche retour et icônes à gauche, texte aligné à gauche, chevrons pointant vers la droite.',
            frame: 'phone',
            lang: 'ar',
            dir: 'ltr',
            html: AR_SETTINGS('arrow-left', 'chevron-right'),
          },
          badNote: 'Le texte est traduit, mais la page se lit encore comme en français : départ, alignement et flèches sont inversés.',
          good: {
            alt: 'Même écran de réglages en arabe, en miroir : flèche retour et icônes à droite, texte aligné à droite, chevrons pointant vers la gauche.',
            frame: 'phone',
            lang: 'ar',
            dir: 'rtl',
            html: AR_SETTINGS('arrow-right', 'chevron-left'),
          },
          goodNote: 'L’attribut dir="rtl" et des propriétés logiques retournent la mise en page ; seules les icônes directionnelles changent.',
        },
      ],
    },
    {
      id: 'formats',
      title: 'Dates, nombres, devises et pluriels',
      body: `Les formats changent d’un pays à l’autre ; ne les code jamais à la main.

- **Dates** : le 27 octobre 2026 s’écrit \`10/27/2026\` en \`en-US\`, \`27.10.2026\` en \`de-DE\` et \`27/10/2026\` en \`fr-FR\`. Une date comme 03/04 désigne le 3 avril ou le 4 mars selon le pays.
- **Nombres** : « 1,000 » (anglais) et « 1.000 » (allemand) valent tous deux mille, mais « 1,5 » et « 1.5 » s’inversent. En français, le séparateur des milliers est une espace fine insécable et la décimale une virgule.
- **Devises** : le symbole change de place et d’espacement — « €1,234.56 » en \`en-US\`, « 1.234,56 € » en \`de-DE\`, « 1 234,56 € » en \`fr-FR\`.
- **Pluriels** : \`count !== 1 ? 's' : ''\` ne marche qu’en anglais. L’arabe a **six** catégories de pluriel (zéro, un, deux, quelques, beaucoup, autre) ; le polonais et le russe distinguent « quelques » et « beaucoup » ; en français, les règles CLDR mettent 0 au singulier (« 0 fichier »). Utilise une bibliothèque i18n ou \`Intl.PluralRules\`.

\`Intl.DateTimeFormat\`, \`Intl.NumberFormat\` et \`Intl.PluralRules\` font ce travail à partir de la **locale** — la langue et la région de la personne.`,
    },
    {
      id: 'erreurs',
      title: 'Erreurs : quoi, pourquoi, comment s’en sortir',
      body: `Un message d’erreur utile répond à trois questions : **ce qui a échoué**, **pourquoi** (quand c’est connu et utile), **comment s’en sortir** ou quelle alternative reste. Il ne met pas un code interne en avant, n’accuse pas l’utilisateur, ne promet pas une cause que le système ignore — et **conserve la saisie**.

Chaque réponse du serveur appelle une réaction différente :

- **400** (requête invalide) : les erreurs de validation, près des champs concernés.
- **401** (non authentifié) : renvoyer vers la connexion — en préservant le travail en cours.
- **403** (interdit) : expliquer le refus et comment obtenir l’accès.
- **404** (introuvable) : un état « introuvable » avec une issue.
- **429** (trop de requêtes) : expliquer la limite et quand réessayer.
- **500** (erreur serveur) : un message générique, un bouton « Réessayer », un contact support.

Côté réseau : un message clair, un nouvel essai, un mode hors ligne si l’usage s’y prête, et une gestion des délais dépassés. Une panne locale reste **locale** : un composant en erreur ne bloque pas toute l’interface. Et le reste se dégrade avec grâce : images avec texte alternatif, fonctions essentielles sans JavaScript quand c’est possible, détection des fonctionnalités plutôt que des navigateurs.`,
      examples: [
        {
          title: 'Un message d’erreur qui aide',
          bad: {
            alt: 'Éditeur de notes recouvert d’une fenêtre « Erreur » qui affiche « Une erreur est survenue (code 0x80070057) » et un bouton OK.',
            html: `<div class="har-scene"><div class="mk-pad mk-stack" style="--gap:8px">${NOTE_BODY}</div>
  <div class="mk-overlay"><div class="mk-dialog mk-stack" style="--gap:8px"><p class="mk-h3">Erreur</p><p class="mk-small">Une erreur est survenue (code 0x80070057).</p><span class="mk-btn mk-btn--s" style="align-self:flex-end">OK</span></div></div>
</div>`,
            css: `.har-scene { position: relative; min-height: 210px; }`,
          },
          badNote: 'Rien sur ce qui a échoué, un code interne en guise d’explication, et « OK » comme seule issue : la note est-elle perdue ?',
          good: {
            alt: 'Même éditeur avec un bandeau en tête : « Note non enregistrée. La connexion a été perdue ; votre texte est conservé sur cet appareil » et un bouton Réessayer.',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <div class="har-banner"><i data-icon="wifi" style="--ico:18px"></i><div class="mk-grow"><p class="mk-strong">Note non enregistrée</p><p class="mk-small">La connexion a été perdue&#8239;; votre texte est conservé sur cet appareil.</p></div><span class="mk-btn mk-btn--ghost mk-btn--s">Réessayer</span></div>
  ${NOTE_BODY}
</div>`,
            css: `.har-banner { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #fdf3e3; color: #6b3a00; border: 1px solid #f1d6a8; }`,
          },
          goodNote: 'Ce qui a échoué, pourquoi, ce qui est sauvé et comment réessayer — sans bloquer l’éditeur.',
        },
      ],
    },
    {
      id: 'concurrence',
      title: 'Double clic, gestes interrompus, permissions, validation',
      body: `**Double soumission.** Sur une connexion lente, sans retour visible, les gens recliquent. Désactive le bouton pendant l’envoi en le disant (« Paiement en cours… »), gère les situations de concurrence (*race conditions*), et côté serveur rends l’opération **idempotente** : rejouée deux fois, elle produit le même résultat. Les mises à jour optimistes prévoient un retour arrière si le serveur refuse.

**Gestes interrompus** (curseurs maison, surfaces glissables, bandes de contrôles défilantes). Un second doigt qui se pose laisse le premier glissement garder son pointeur ou se terminer proprement, sans sauter vers le nouveau. Quand le navigateur annule le geste pour faire défiler (\`pointercancel\`), que la capture est perdue (\`lostpointercapture\`), que le pointeur est relâché hors du contrôle ou que la fenêtre perd le focus (\`blur\`), efface l’état de glissement et libère la capture. Le geste suivant doit fonctionner sans recharger.

**Permissions.** Pas le droit de voir, pas le droit de modifier, lecture seule : chaque cas s’affiche clairement, avec sa raison.

**Validation.** Côté client : champs requis, formats (e-mail, téléphone, URL), longueurs, motifs — annoncés **avant** la saisie (« Lettres et chiffres, 100 caractères maximum »), avec la saisie conservée en cas d’erreur. Côté serveur : **toujours**. La validation client sert le confort ; la validation et l’assainissement serveur protègent contre les injections et les abus, avec une limitation du débit.`,
    },
    {
      id: 'tester',
      title: 'Provoquer les cas limites',
      body: `- **À la main** : données extrêmes (très long, très court, vide), autres langues, hors ligne, connexion ralentie (profil 3G), lecteur d’écran, clavier seul, anciens navigateurs, dix clics rapides sur « Envoyer ».
- **Automatiquement** : tests unitaires des cas limites, tests d’intégration des scénarios d’erreur, tests de bout en bout des parcours critiques, régression visuelle, tests d’accessibilité (axe, WAVE).
- **Pour les gestes** : dis ce qui a produit la preuve (fenêtre émulée, toucher synthétique, moteur de rendu, appareil physique) et ce qui n’a pas été testé.

À éviter : supposer une saisie parfaite, ignorer l’internationalisation, des messages génériques (« Une erreur est survenue »), oublier le hors-ligne, ne valider que côté client, des largeurs fixes pour du texte, supposer des textes à la longueur de l’anglais.`,
    },
  ],
  rules: [
    { id: 'expansion', front: 'Quelle marge prévoir pour les traductions ?', back: '30 à 40 % d’espace en plus, avec des conteneurs qui s’adaptent ; l’allemand est souvent ~30 % plus long que l’anglais, et les chaînes courtes gonflent le plus.' },
    { id: 'min-width', front: 'Un texte long pousse les boutons hors d’une rangée flex : que faire ?', back: '`min-width: 0` sur l’enfant flex (et `min-height: 0` en grille) : par défaut, il ne rétrécit pas sous la largeur de son contenu.' },
    { id: 'numbers', front: 'Peut-on tronquer un montant trop long ?', back: "Non : un nombre tronqué devient faux. Notation compacte (`Intl.NumberFormat`, `notation: 'compact'`) et valeur exacte accessible." },
    { id: 'rtl', front: 'Comment préparer une mise en page pour l’arabe ou l’hébreu ?', back: '`dir="rtl"` et propriétés logiques (`margin-inline-start`, `padding-inline`…) ; on retourne les icônes directionnelles.' },
    { id: 'zwnj', front: 'Pourquoi ne jamais supprimer le ZWNJ (U+200C) d’un texte persan ?', back: 'Il coupe la liaison cursive à l’intérieur d’un mot composé : le retirer change l’orthographe, voire le sens.' },
    { id: 'yeh-kaf', front: 'Recherche en persan : que faire des variantes ي/ی et ك/ک ?', back: 'Conserver la forme d’origine en base, mais les traiter comme équivalentes pour la recherche et la validation.' },
    { id: 'intl', front: 'Comment afficher dates, nombres et devises selon la langue ?', back: 'Avec `Intl.DateTimeFormat` et `Intl.NumberFormat` et la locale de l’utilisateur (voire son calendrier), jamais à la main.' },
    { id: 'plural', front: 'Pourquoi un « s » ajouté quand le nombre est différent de 1 ne suffit-il pas ?', back: 'Les pluriels varient : six catégories en arabe, « quelques » et « beaucoup » en polonais, 0 au singulier en français. `Intl.PluralRules` ou une bibliothèque i18n.' },
    { id: 'http', front: '401 ou 403 : quelle différence pour l’interface ?', back: '401 : pas (ou plus) connecté — reconnexion, en gardant le travail. 403 : connecté mais pas autorisé — expliquer et dire comment obtenir l’accès.' },
    { id: 'error-msg', front: 'Que doit dire un message d’erreur ?', back: 'Ce qui a échoué, pourquoi (si c’est connu et utile) et comment s’en sortir — en conservant la saisie.' },
    { id: 'double', front: 'Comment empêcher une double commande ?', back: 'Bouton désactivé avec un état explicite pendant l’envoi, et opération idempotente côté serveur.' },
    { id: 'validation', front: 'La validation côté client suffit-elle ?', back: 'Non : elle sert le confort. La validation et l’assainissement côté serveur sont toujours obligatoires.' },
    { id: 'ios16', front: 'Pourquoi 16 px minimum dans les champs sur mobile ?', back: 'Safari sur iOS zoome de force sur un champ focalisé dont le texte fait moins de 16 px. Et on ne bloque jamais le zoom pour l’éviter.' },
    { id: 'gestures', front: 'Que faire quand un glissement est interrompu ?', back: 'Sur `pointercancel`, `lostpointercapture` ou `blur` : effacer l’état de glissement et libérer la capture, pour que le geste suivant marche sans recharger.' },
  ],
  exercises: [
    {
      id: 'harden-long-name-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Les deux cartes affichent un nom de 60 caractères. Laquelle le gère correctement ?',
      options: [
        {
          id: 'overflow',
          visual: {
            alt: 'Carte de profil dont le nom très long sur une seule ligne sort de la carte et repousse le bouton Suivre hors du cadre.',
            html: `<div class="mk-pad"><div class="mk-card"><div class="mk-row"><span class="mk-avatar" style="width:44px;height:44px"></span><div><p class="mk-strong" style="white-space:nowrap">Maximilian Alexander von Hohenzollern-Sigmaringen-Bergstraße</p><p class="mk-small mk-muted">Architecte · Munich</p></div><span class="mk-btn mk-btn--s">Suivre</span></div><p class="mk-small mk-muted" style="margin-top:10px">128 projets · 2&#8239;400 abonnés</p></div></div>`,
          },
          why: 'Le nom refuse de rétrécir : il sort de la carte et pousse le bouton Suivre hors du cadre.',
        },
        {
          id: 'wraps',
          visual: {
            alt: 'Carte de profil dont le nom très long passe sur plusieurs lignes, avec le bouton Suivre qui reste visible.',
            css: `.har-who { flex: 1 1 150px; min-width: 0; overflow-wrap: anywhere; }`,
            html: `<div class="mk-pad"><div class="mk-card"><div class="mk-row mk-wrap"><span class="mk-avatar" style="width:44px;height:44px"></span><div class="har-who"><p class="mk-strong">Maximilian Alexander von Hohenzollern-Sigmaringen-Bergstraße</p><p class="mk-small mk-muted">Architecte · Munich</p></div><span class="mk-btn mk-btn--s" style="margin-inline-start:auto">Suivre</span></div><p class="mk-small mk-muted" style="margin-top:10px">128 projets · 2&#8239;400 abonnés</p></div></div>`,
          },
          why: 'Le nom revient à la ligne dans l’espace disponible et le bouton reste visible et cliquable.',
        },
      ],
      answer: 'wraps',
      explanation: `Les maquettes utilisent des noms courts comme « Léa Martin » ; la réalité contient des noms de 60 caractères, des noms composés et des titres sans espace. Dans une rangée flex, un enfant ne rétrécit pas sous la largeur de son contenu par défaut (\`min-width: auto\`) : un texte qui ne peut pas revenir à la ligne pousse alors ses voisins dehors.

La version robuste donne \`min-width: 0\` au bloc de texte pour qu’il puisse rétrécir, laisse le nom revenir à la ligne et autorise la rangée à passer à la ligne sur un écran étroit (\`flex-wrap\`). Autre option : limiter le nom à deux lignes avec \`line-clamp\`, le nom complet restant lisible sur le profil.`,
      takeaway: 'Teste avec un nom de 60 caractères : `min-width: 0` sur l’enfant flex, retour à la ligne ou `line-clamp`, jamais de débordement.',
      sources: ['imp:harden', CSS_TRICKS_FLEX, MDN_MINWIDTH],
    },
    {
      id: 'harden-german-duel',
      type: 'choice',
      difficulty: 1,
      context: 'L’application vient d’être traduite en allemand.',
      prompt: 'Quelle fenêtre de confirmation supporte la traduction ?',
      options: [
        {
          id: 'fixed',
          visual: {
            alt: 'Fenêtre en allemand « Änderungen speichern? » dont les deux boutons ont la même largeur fixe : le libellé du bouton principal est coupé après « Änderungen spei ».',
            lang: 'de',
            html: `<div class="mk-pad"><div class="har-dialog">
  <p class="mk-h3">Änderungen speichern?</p>
  <p class="mk-small mk-muted">Du hast ungespeicherte Änderungen an „Quartalsbericht Q3“.</p>
  <div class="mk-row" style="--gap:8px;justify-content:flex-end"><span class="mk-btn mk-btn--ghost har-fixed">Verwerfen</span><span class="mk-btn har-fixed">Änderungen speichern</span></div>
</div></div>`,
            css: `.har-dialog { display: flex; flex-direction: column; gap: 10px; padding: 18px; border: 1px solid #e1e4ea; border-radius: 14px; box-shadow: 0 10px 28px rgb(15 20 35 / 0.12); }
.har-fixed { width: 104px; padding: 0 10px; overflow: hidden; justify-content: flex-start; }`,
          },
          why: 'Les boutons ont une largeur fixe pensée pour l’anglais (« Save changes ») : le libellé allemand est coupé.',
        },
        {
          id: 'fluid',
          visual: {
            alt: 'Même fenêtre en allemand dont les boutons prennent la largeur de leur libellé : « Verwerfen » et « Änderungen speichern » sont entiers.',
            lang: 'de',
            html: `<div class="mk-pad"><div class="har-dialog">
  <p class="mk-h3">Änderungen speichern?</p>
  <p class="mk-small mk-muted">Du hast ungespeicherte Änderungen an „Quartalsbericht Q3“.</p>
  <div class="mk-row mk-wrap" style="--gap:8px;justify-content:flex-end"><span class="mk-btn mk-btn--ghost">Verwerfen</span><span class="mk-btn">Änderungen speichern</span></div>
</div></div>`,
            css: `.har-dialog { display: flex; flex-direction: column; gap: 10px; padding: 18px; border: 1px solid #e1e4ea; border-radius: 14px; box-shadow: 0 10px 28px rgb(15 20 35 / 0.12); }`,
          },
          why: 'Les boutons prennent la largeur de leur libellé et la rangée peut passer à la ligne : la traduction tient.',
        },
      ],
      answer: 'fluid',
      explanation: `« Save » devient « Speichern », « Save changes » devient « Änderungen speichern » : l’allemand est souvent **~30 % plus long** que l’anglais, et les chaînes courtes gonflent proportionnellement le plus. Une largeur fixe calibrée sur la langue source finit toujours par couper un libellé.

Impeccable demande de prévoir **30 à 40 %** d’espace en plus, d’éviter les largeurs fixes sur les conteneurs de texte et de laisser flexbox ou grid s’adapter au contenu : sur un bouton, un \`padding\` plutôt qu’une \`width\`.`,
      takeaway: 'Pas de largeur fixe sur un libellé : prévois 30 à 40 % d’espace pour les traductions et laisse les boutons s’adapter.',
      sources: ['imp:harden', W3C_TEXT_SIZE],
    },
    {
      id: 'harden-amount-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Le chiffre d’affaires annuel d’un client atteint 987 654 321,00 €. Quelle tuile l’affiche correctement ?',
      options: [
        {
          id: 'cut',
          visual: {
            alt: 'Trois tuiles d’indicateurs ; le chiffre d’affaires annuel est coupé par des points de suspension au milieu du nombre.',
            html: `<div class="mk-pad"><div class="har-kpis">
  <div class="har-kpi"><span class="mk-small mk-muted">Chiffre d’affaires annuel</span><b style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">987&#8239;654&#8239;321,00&nbsp;€</b></div>
  <div class="har-kpi"><span class="mk-small mk-muted">Clients actifs</span><b>1&#8239;284</b></div>
  <div class="har-kpi"><span class="mk-small mk-muted">Panier moyen</span><b>54,20&nbsp;€</b></div>
</div></div>`,
            css: KPI_GRID_CSS,
          },
          why: 'Le montant est tronqué au milieu des chiffres : il ne veut plus rien dire, et un lecteur pressé peut retenir un tout autre nombre.',
        },
        {
          id: 'compact',
          visual: {
            alt: 'Trois tuiles d’indicateurs ; le chiffre d’affaires annuel s’affiche « 987,7 M € », avec la valeur exacte en petit en dessous.',
            html: `<div class="mk-pad"><div class="har-kpis">
  <div class="har-kpi"><span class="mk-small mk-muted">Chiffre d’affaires annuel</span><b>987,7&nbsp;M&nbsp;€</b><span class="mk-small mk-muted">987&#8239;654&#8239;321,00&nbsp;€</span></div>
  <div class="har-kpi"><span class="mk-small mk-muted">Clients actifs</span><b>1&#8239;284</b></div>
  <div class="har-kpi"><span class="mk-small mk-muted">Panier moyen</span><b>54,20&nbsp;€</b></div>
</div></div>`,
            css: KPI_GRID_CSS,
          },
          why: 'Notation compacte lisible d’un coup d’œil, valeur exacte juste en dessous : rien n’est perdu.',
        },
      ],
      answer: 'compact',
      explanation: `Un nombre ne se tronque pas comme un texte : couper « 987 654 321 » en « 987 654 3… » change sa valeur, et rien n’indique plus l’ordre de grandeur.

Pour un indicateur, la **notation compacte** de \`Intl.NumberFormat\` (\`notation: 'compact'\`) donne « 988 M € » en français — ou « 987,7 M € » avec une décimale — en respectant la langue de chacun. La valeur exacte reste disponible juste à côté, dans une infobulle ou dans le détail. Dans un tableau, on garde la valeur complète en chiffres tabulaires et on laisse la colonne s’élargir.`,
      takeaway: 'Ne tronque jamais un nombre : notation compacte localisée (`Intl.NumberFormat`) et valeur exacte accessible.',
      sources: ['imp:harden', 'mdn:intl'],
    },
    {
      id: 'harden-partial-failure-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Le graphique des ventes ne parvient pas à se charger. Quelle réaction est la plus robuste ?',
      options: [
        {
          id: 'whole',
          visual: {
            alt: 'Page entièrement remplacée par un message centré « Une erreur est survenue », un code ERR_DASH_500 et un bouton OK.',
            frame: 'browser',
            html: `<div class="har-fatal"><i data-icon="triangle-alert" style="--ico:28px"></i><p class="mk-h3">Une erreur est survenue.</p><p class="mk-small mk-muted">Code&nbsp;: ERR_DASH_500</p><span class="mk-btn mk-btn--ghost mk-btn--s">OK</span></div>`,
            css: `.har-fatal { min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 16px; text-align: center; color: #1d2230; }`,
          },
          why: 'Toute la page disparaît pour une seule panne, avec un code interne en guise d’explication et aucun moyen de réessayer.',
        },
        {
          id: 'local',
          visual: {
            alt: 'Tableau de bord avec deux indicateurs à jour et, à la place du graphique, un encadré « Impossible de charger le graphique des ventes » avec un bouton Réessayer.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2">Tableau de bord</p>
  <div class="mk-grid" style="--gap:10px"><div class="har-kpi"><span class="mk-small mk-muted">Commandes du jour</span><b>86</b></div><div class="har-kpi"><span class="mk-small mk-muted">Panier moyen</span><b>54,20&nbsp;€</b></div></div>
  <div class="har-err"><div class="mk-row" style="--gap:8px"><i data-icon="circle-alert" style="--ico:18px"></i><p class="mk-strong">Impossible de charger le graphique des ventes</p></div><p class="mk-small mk-muted">Le service de statistiques ne répond pas. Les autres données sont à jour.</p><span class="mk-btn mk-btn--ghost mk-btn--s" style="align-self:flex-start"><i data-icon="refresh-cw" style="--ico:14px"></i>Réessayer</span></div>
</div>`,
            css: `${KPI_CSS}
.har-err { display: flex; flex-direction: column; gap: 8px; padding: 14px; border: 1px dashed #c3c8d3; border-radius: 10px; }`,
          },
          why: 'La panne reste dans son encadré : elle dit ce qui a échoué, propose de réessayer, et le reste du tableau de bord reste utilisable.',
        },
      ],
      answer: 'local',
      explanation: `Une erreur doit rester **à la taille de ce qui a échoué**. Remplacer toute la page parce qu’un composant ne répond pas prive l’utilisateur de tout ce qui marchait encore — impeccable range ce réflexe parmi les erreurs à éviter.

Le message suit la structure de la rédaction UX : **ce qui a échoué** (le graphique des ventes), **ce qui reste vrai** (les autres données sont à jour), **comment s’en sortir** (réessayer). Un code interne peut figurer pour le support, jamais comme message principal.`,
      takeaway: 'Une panne reste locale : le composant en erreur dit quoi et propose de réessayer, le reste de l’interface continue de fonctionner.',
      sources: ['imp:harden', 'imp:clarify', NNG_ERRORS],
    },
    {
      id: 'harden-rtl-duel',
      type: 'choice',
      difficulty: 2,
      context: 'Une messagerie vient d’être traduite en arabe (« المحادثات » : les conversations).',
      prompt: 'Quelle version est correctement adaptée à l’arabe ?',
      options: [
        {
          id: 'ltr',
          visual: {
            alt: 'Liste de conversations en arabe disposée comme en français : flèche retour et avatars à gauche, texte aligné à gauche, heures à droite.',
            frame: 'phone',
            lang: 'ar',
            dir: 'ltr',
            html: AR_CHATS('arrow-left'),
          },
          why: 'Le texte est arabe, mais la mise en page est restée celle du français : point de départ, ordre des éléments et flèche retour sont inversés.',
        },
        {
          id: 'rtl',
          visual: {
            alt: 'Liste de conversations en arabe en miroir : flèche retour et avatars à droite, texte aligné à droite, heures à gauche.',
            frame: 'phone',
            lang: 'ar',
            dir: 'rtl',
            html: AR_CHATS('arrow-right'),
          },
          why: 'Toute la mise en page est en miroir : on commence la lecture du bon côté, et la flèche retour pointe dans le sens du retour.',
        },
      ],
      answer: 'rtl',
      explanation: `Traduire en arabe ne suffit pas : l’arabe se lit **de la droite vers la gauche**, et toute la mise en page suit — point de départ de la lecture, ordre des éléments dans une rangée, direction des flèches.

Avec \`dir="rtl"\` sur la racine et des **propriétés logiques** (\`margin-inline-start\`, \`padding-inline\`, \`inset-inline-end\`…) au lieu de \`left\` et \`right\`, la mise en page se retourne d’elle-même. Restent les icônes directionnelles — flèche retour, chevron « suivant » — à retourner explicitement.`,
      takeaway: 'En arabe ou en hébreu, tout se met en miroir : `dir="rtl"`, propriétés logiques, icônes directionnelles retournées.',
      sources: ['imp:harden', 'mdn:logical', 'material:bidi'],
    },
    {
      id: 'harden-overflow-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Ce tableau de commandes a été rempli avec de vraies données. Trouve les deux endroits qui cassent.',
      visual: {
        alt: 'Tableau de quatre commandes avec les colonnes Client, Statut et Montant ; un nom de société très long passe sous l’étiquette de statut et un montant est coupé ; une pagination indique 1 à 4 sur 1 284.',
        frame: 'browser',
        html: `<div class="mk-pad"><div class="mk-stack har-orders" style="--gap:0">
  <div class="har-tr har-th" data-hotspot="header"><span>Client</span><span>Statut</span><span class="har-num">Montant</span></div>
  <div class="har-tr"><span>Léa Martin</span><span><span class="har-st har-st--ok">Payée</span></span><span class="har-num">84,90&nbsp;€</span></div>
  <div class="har-tr"><span style="white-space:nowrap" data-hotspot="client">Société coopérative laitière du Haut-Doubs</span><span><span class="har-st har-st--ok">Payée</span></span><span class="har-num">2&#8239;310,00&nbsp;€</span></div>
  <div class="har-tr"><span>Hugo Petit</span><span data-hotspot="status" style="justify-self:start"><span class="har-st har-st--wait">En attente</span></span><span class="har-num">129,00&nbsp;€</span></div>
  <div class="har-tr"><span>Atelier Nørd</span><span><span class="har-st har-st--ok">Payée</span></span><span class="har-num" data-hotspot="amount" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">12&#8239;480&#8239;350,00&nbsp;€</span></div>
  <p class="mk-small mk-muted" data-hotspot="pager" style="align-self:flex-end;margin-top:10px">1–4 sur 1&#8239;284 commandes</p>
</div></div>`,
        css: `${TABLE_CSS}
.har-orders { max-width: 480px; }
.har-orders .har-tr { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) 84px; }`,
      },
      hotspots: [
        {
          id: 'client',
          label: 'Nom de client qui déborde',
          correct: true,
          why: 'Le nom refuse de passer à la ligne et glisse sous l’étiquette de statut : illisible. Il doit revenir à la ligne, ou être tronqué avec le nom complet accessible.',
        },
        {
          id: 'amount',
          label: 'Montant tronqué',
          correct: true,
          why: 'Le montant est coupé au milieu de ses chiffres : un nombre tronqué devient faux. La colonne doit s’élargir, ou le montant passer en notation compacte avec la valeur exacte accessible.',
        },
        { id: 'header', label: 'En-têtes de colonnes', correct: false, why: 'Courts et alignés sur leurs données : rien à corriger.' },
        { id: 'status', label: 'Étiquette « En attente »', correct: false, why: 'L’étiquette tient dans sa colonne.' },
        {
          id: 'pager',
          label: 'Pagination « 1–4 sur 1 284 »',
          correct: false,
          why: 'C’est la bonne réponse à une longue liste : on ne charge pas 1 284 commandes d’un coup.',
        },
      ],
      explanation: `Deux défauts classiques du vrai contenu :

- **Débordement de texte** : un nom long, sans retour à la ligne possible, envahit la colonne voisine. Le texte doit pouvoir revenir à la ligne (\`overflow-wrap\`), ou être tronqué proprement avec le nom complet accessible.
- **Nombre tronqué** : un montant coupé au milieu de ses chiffres ne signifie plus rien. Les montants ne se tronquent pas ; la colonne s’élargit ou passe en notation compacte.

La pagination, elle, est la réponse attendue à 1 284 commandes.`,
      takeaway: 'Avec du vrai contenu, aucun texte ne déborde sur ses voisins et aucun nombre n’est tronqué.',
      sources: ['imp:harden', 'imp:detector', MDN_TEXT_OVERFLOW],
    },
    {
      id: 'harden-locale-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Ce tableau de bord est affiché en français de France (`fr-FR`).',
      prompt: 'Trouve les trois défauts de localisation.',
      visual: {
        alt: 'Tableau de bord bancaire en français : message de bienvenue, heure de dernière connexion, solde de 12,480.50 €, échéance au 10/30/2026, message « Vous avez 1 messages non lus » et bouton Voir les factures.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between mk-wrap" style="--gap:6px 12px"><p class="mk-h2">Bonjour Camille</p><span class="mk-small mk-muted" data-hotspot="login">Dernière connexion&nbsp;: aujourd’hui à 9&nbsp;h&nbsp;41</span></div>
  <div class="har-pair">
    <div class="har-kpi"><span class="mk-small mk-muted">Solde disponible</span><b data-hotspot="number" style="align-self:flex-start">12,480.50&nbsp;€</b></div>
    <div class="har-kpi"><span class="mk-small mk-muted">Prochaine échéance</span><b data-hotspot="date" style="align-self:flex-start">10/30/2026</b></div>
  </div>
  <p class="mk-row" style="--gap:8px;align-self:flex-start" data-hotspot="plural"><i data-icon="mail" style="--ico:16px"></i>Vous avez 1 messages non lus</p>
  <span class="mk-btn" data-hotspot="cta" style="align-self:flex-start">Voir les factures</span>
</div>`,
        css: `${KPI_CSS}
.har-pair { display: flex; flex-wrap: wrap; gap: 10px; }
.har-pair > .har-kpi { flex: 1 1 150px; }`,
      },
      hotspots: [
        {
          id: 'date',
          label: 'Date au format américain',
          correct: true,
          why: '« 10/30/2026 » suit l’ordre mois/jour/année de l’anglais américain ; en fr-FR, c’est « 30/10/2026 ». Une date comme 03/04 deviendrait même ambiguë.',
        },
        {
          id: 'number',
          label: 'Séparateurs anglais dans un montant',
          correct: true,
          why: 'En français : « 12 480,50 € », espace fine pour les milliers et virgule pour les décimales. Intl.NumberFormat le fait pour toi.',
        },
        {
          id: 'plural',
          label: 'Pluriel fabriqué à la main',
          correct: true,
          why: '« 1 messages » : le « s » a été collé sans règle. Intl.PluralRules ou une bibliothèque i18n choisit la bonne forme.',
        },
        { id: 'login', label: 'Heure de dernière connexion', correct: false, why: '« 9 h 41 » est une écriture française correcte de l’heure.' },
        { id: 'cta', label: 'Bouton « Voir les factures »', correct: false, why: 'Libellé traduit, clair, qui tient dans son bouton.' },
      ],
      explanation: `Ces trois défauts ont la même cause : des formats **codés à la main** pour une seule langue.

- \`Intl.DateTimeFormat('fr-FR')\` écrit la date dans l’ordre jour/mois/année ;
- \`Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })\` donne « 12 480,50 € » ;
- \`Intl.PluralRules\` (ou une bibliothèque i18n) choisit la forme du pluriel selon la langue — en français, 0 et 1 au singulier.

Passer la locale de l’utilisateur à ces API règle d’un coup toutes les langues, y compris celles dont tu ne connais pas les règles.`,
      takeaway: 'Dates, nombres, devises et pluriels passent par `Intl` avec la locale de l’utilisateur, jamais par une concaténation maison.',
      sources: ['imp:harden', 'mdn:intl', MDN_PLURAL],
    },
    {
      id: 'harden-http-match',
      type: 'match',
      difficulty: 3,
      prompt: 'Associe chaque réponse du serveur à la réaction de l’interface.',
      leftTitle: 'Code HTTP',
      rightTitle: 'Réaction de l’interface',
      pairs: [
        { id: '400', left: '400 — requête invalide', right: 'Afficher les erreurs de validation près des champs concernés' },
        { id: '401', left: '401 — non authentifié', right: 'Renvoyer vers la connexion en préservant le travail en cours' },
        { id: '403', left: '403 — accès interdit', right: 'Expliquer le refus et comment obtenir l’accès' },
        { id: '404', left: '404 — introuvable', right: 'Afficher un état « introuvable » avec une issue' },
        { id: '429', left: '429 — trop de requêtes', right: 'Expliquer la limite et indiquer quand réessayer' },
        { id: '500', left: '500 — erreur serveur', right: 'Message générique, bouton « Réessayer » et contact du support' },
      ],
      explanation: `Une seule bannière « Une erreur est survenue » pour tous les cas laisse l’utilisateur sans recours. Chaque famille d’erreur appelle une réponse précise :

- **401** et **403** se ressemblent mais n’ont rien à voir : le premier signifie « on ne sait pas qui vous êtes » (se reconnecter), le second « on sait qui vous êtes, mais vous n’avez pas le droit » (demander l’accès).
- **429** signale une limite de débit : le serveur peut préciser, dans l’en-tête \`Retry-After\`, quand réessayer.
- **500** est une panne côté serveur : l’utilisateur n’y peut rien, sinon réessayer ou contacter le support.`,
      takeaway: 'Chaque code a sa réponse : 400 → champs, 401 → reconnexion, 403 → accès, 404 → introuvable, 429 → patienter, 500 → réessayer.',
      sources: ['imp:harden', MDN_STATUS],
    },
    {
      id: 'harden-double-submit-choice',
      type: 'choice',
      difficulty: 2,
      context: 'Sur une connexion lente, des clients appuient plusieurs fois sur « Payer » et reçoivent deux commandes.',
      prompt: 'Quelle correction est la plus robuste ?',
      options: [
        {
          id: 'disable-idem',
          label: 'Désactiver le bouton pendant l’envoi en affichant « Paiement en cours… », et rendre la requête idempotente côté serveur.',
          why: 'Le retour visible évite le second appui ; l’idempotence garantit qu’une requête rejouée ne crée pas une seconde commande.',
        },
        {
          id: 'warning',
          label: 'Ajouter le texte « N’appuyez qu’une seule fois ! » sous le bouton.',
          why: 'On reporte sur l’utilisateur un défaut du système — et sans retour visible, on réappuie quand même.',
        },
        {
          id: 'confirm',
          label: 'Demander « Êtes-vous sûr ? » dans une fenêtre de confirmation avant chaque paiement.',
          why: 'Une étape de plus pour tout le monde, et le double appui reste possible sur le bouton de confirmation.',
        },
        {
          id: 'hide',
          label: 'Masquer le bouton dès le premier appui, sans autre indication.',
          why: 'Le bouton disparaît sans explication : on croit à une panne, on recharge… et on repaie.',
        },
      ],
      answer: 'disable-idem',
      explanation: `Sans retour visible juste après l’action, la plupart des gens pensent qu’elle n’a pas été prise en compte et recommencent — Nielsen Norman Group relie directement ce comportement aux doubles commandes.

La réponse robuste combine deux couches : **côté interface**, un état de chargement explicite qui empêche le second appui ; **côté serveur**, une opération **idempotente** (rejouée, elle produit le même résultat), parce qu’un double envoi peut aussi venir du réseau ou d’un rechargement de page.`,
      takeaway: 'Contre la double soumission : bouton désactivé avec un état explicite, et opération idempotente côté serveur.',
      sources: ['imp:harden', NNG_PROGRESS, MDN_IDEMPOTENT],
    },
    {
      id: 'harden-validation-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Si le formulaire vérifie l’adresse e-mail côté client, le serveur n’a pas besoin de la revérifier.',
      answer: false,
      explanation: `Faux. La validation côté client sert le **confort** : elle signale l’erreur tout de suite, près du champ. Mais n’importe qui peut contourner le navigateur et envoyer une requête directement au serveur.

La validation et l’assainissement côté **serveur** sont donc **toujours** obligatoires : c’est là qu’on se protège des données invalides, des injections et des abus — avec, en plus, une limitation du débit.`,
      takeaway: 'Valide côté client pour le confort, et toujours côté serveur pour la sécurité.',
      sources: ['imp:harden', OWASP_VALIDATION],
    },
    {
      id: 'harden-plural-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Pour gérer les pluriels d’une interface traduite, il suffit d’ajouter un « s » quand le nombre est différent de 1.',
      answer: false,
      explanation: `Faux, même en français. Les règles de pluriel varient d’une langue à l’autre :

- l’**arabe** a six catégories (zéro, un, deux, quelques, beaucoup, autre) ;
- le **polonais** et le **russe** distinguent « quelques » (2, 3, 4, 22…) et « beaucoup » (5, 11, 100…) ;
- en **français**, les règles CLDR rangent 0 avec 1 : « 0 fichier », là où l’anglais écrit « 0 files » ;
- le **japonais** n’a qu’une seule forme.

\`Intl.PluralRules\` connaît ces règles : \`new Intl.PluralRules('ar').select(2)\` renvoie \`'two'\`. Une bibliothèque i18n s’appuie dessus pour choisir la bonne phrase.`,
      takeaway: 'Les pluriels se gèrent avec `Intl.PluralRules` ou une bibliothèque i18n, jamais avec un « s » conditionnel.',
      sources: ['imp:harden', MDN_PLURAL],
    },
    {
      id: 'harden-input-size-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la taille du texte de ce champ de recherche mobile pour éviter le zoom forcé d’iOS.',
      visual: {
        alt: 'Application de recettes sur téléphone avec un champ de recherche en cours de saisie ; la taille du texte du champ varie avec le curseur.',
        frame: 'phone',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2">Recettes</p>
  <div class="har-search"><i data-icon="search" style="--ico:16px"></i><span class="har-q">tarte aux poi<span class="har-caret"></span></span></div>
  <ul class="mk-list"><li>Tarte aux poireaux et chèvre</li><li>Tarte aux poires bourdaloue</li><li>Tarte aux poivrons rôtis</li></ul>
</div>`,
        css: `.har-search { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 12px; border: 1.5px solid #1f4fd8; border-radius: 10px; color: #5a6172; }
.har-q { font-size: var(--v, 13px); color: #1d2230; }
.har-caret { display: inline-block; width: 1.5px; height: 1.1em; margin-inline-start: 1px; vertical-align: -0.2em; background: #1d2230; }`,
      },
      control: 'Taille du texte du champ',
      min: 11,
      max: 22,
      step: 1,
      initial: 13,
      unit: 'px',
      target: [16, 20],
      ideal: 16,
      explanation: `Safari sur iOS **zoome automatiquement** sur un champ focalisé dont le texte fait 15 px ou moins. La page s’agrandit, la mise en page sort de l’écran, et il faut dézoomer à la main après chaque saisie.

La correction est simple : **16 px minimum** dans les champs sur mobile — le même plancher que le corps de texte. Ne contourne pas le problème en bloquant le zoom de la page (\`maximum-scale=1\`, \`user-scalable=no\`) : selon les navigateurs, tu empêcherais aussi les gens d’agrandir la page quand ils en ont besoin.`,
      takeaway: 'Sur mobile, 16 px minimum dans les champs : en dessous, iOS zoome de force. Ne bloque jamais le zoom pour l’éviter.',
      sources: ['imp:harden', CSS_TRICKS_IOS],
    },
    {
      id: 'harden-arabic-search-choice',
      type: 'choice',
      difficulty: 3,
      context:
        'Dans une application de bibliothèque en persan, une personne tape « كتاب » (livre) avec un clavier arabe. La base contient « کتاب », écrit avec le kaf persan : la recherche ne renvoie rien.',
      prompt: 'Que faut-il faire ?',
      options: [
        {
          id: 'equiv',
          label: 'Conserver la forme d’origine en base, et traiter ك/ک et ي/ی comme équivalents pour la recherche et la validation.',
          why: 'La recherche trouve le livre quel que soit le clavier, et le texte stocké reste fidèle.',
        },
        {
          id: 'convert',
          label: 'Convertir définitivement tous les textes de la base vers les lettres arabes.',
          why: 'On altère le texte persan d’origine ; l’équivalence ne doit servir qu’à la comparaison.',
        },
        {
          id: 'reject',
          label: 'Refuser la saisie et afficher « Caractère invalide ».',
          why: 'On bloque les gens dont le clavier envoie l’autre variante — un défaut du système présenté comme une faute de l’utilisateur.',
        },
        {
          id: 'strip',
          label: 'Supprimer les caractères invisibles et les lettres « inhabituelles » avant de chercher.',
          why: 'On détruit au passage le ZWNJ (U+200C), qui fait partie de l’orthographe persane.',
        },
      ],
      answer: 'equiv',
      explanation: `Le persan et l’arabe partagent un alphabet, mais deux lettres ont des formes Unicode distinctes : **ی** (U+06CC) et **ک** (U+06A9) en persan, **ي** (U+064A) et **ك** (U+0643) en arabe. Selon le clavier utilisé, la même personne peut taper l’une ou l’autre.

Impeccable recommande de **conserver** la forme d’origine en stockage et de **traiter les variantes comme équivalentes** pour la recherche et la validation. Et de ne jamais retirer le ZWNJ (U+200C), l’antiliant qui coupe la liaison cursive à l’intérieur des mots composés persans.`,
      takeaway: 'Écritures arabes : conserve le texte d’origine (ZWNJ compris) et rends ي/ی et ك/ک équivalents pour chercher et valider.',
      sources: ['imp:harden', 'w3c:alreq'],
    },
    {
      id: 'harden-gesture-choice',
      type: 'choice',
      difficulty: 3,
      context:
        'Un curseur de volume fait maison reste « collé » en mode glissement : quand on fait défiler la page en plein geste, la poignée suit ensuite le doigt sans qu’on la touche.',
      prompt: 'Quelle correction s’impose ?',
      options: [
        {
          id: 'cancel',
          label: 'Écouter `pointercancel` et `lostpointercapture` (ainsi que `blur`) pour effacer l’état de glissement et libérer la capture du pointeur.',
          why: 'Chaque fin anormale du geste remet le contrôle dans un état propre ; le geste suivant fonctionne normalement.',
        },
        {
          id: 'block',
          label: 'Bloquer le défilement de toute la page avec `touch-action: none` sur le `body`.',
          why: 'On casse le défilement de toute la page pour masquer le défaut d’un seul composant.',
        },
        {
          id: 'reload',
          label: 'Proposer de recharger la page quand le curseur se bloque.',
          why: 'Le geste suivant doit fonctionner sans rechargement : c’est précisément le critère de réussite.',
        },
        {
          id: 'ignore',
          label: 'Ne rien faire : il suffit de toucher la poignée une seconde fois.',
          why: 'L’état reste incohérent, et le volume change sans qu’on le veuille.',
        },
      ],
      answer: 'cancel',
      explanation: `Un geste peut s’interrompre de plusieurs façons : le navigateur l’annule pour faire défiler (\`pointercancel\`), la capture du pointeur est perdue (\`lostpointercapture\`), le doigt se relâche hors du contrôle, la fenêtre perd le focus (\`blur\`), un second doigt se pose. Si le composant n’écoute que \`pointerup\`, il ne voit jamais la fin du geste et reste en mode glissement.

Impeccable demande, pour chacun de ces cas, d’**effacer l’état de glissement et de libérer la capture**, puis de vérifier que le geste suivant marche sans rechargement — en précisant comment ce comportement a été testé (toucher émulé ou appareil réel).`,
      takeaway: 'Un geste interrompu (`pointercancel`, perte de capture, `blur`) remet le contrôle à zéro : le geste suivant marche sans recharger.',
      sources: ['imp:harden', MDN_POINTER],
    },
    {
      id: 'harden-error-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Range les éléments de ce message d’erreur dans l’ordre où ils doivent se lire.',
      items: [
        { id: 'what', label: 'Ce qui a échoué : « Le paiement n’a pas abouti. »' },
        { id: 'why', label: 'Pourquoi, si c’est connu et utile : « Votre banque a refusé la transaction. »' },
        { id: 'how', label: 'Comment s’en sortir : « Essayez une autre carte ou contactez votre banque. »' },
        { id: 'action', label: 'L’action de reprise : un bouton « Utiliser une autre carte »' },
      ],
      explanation: `Un message d’erreur actionnable répond dans l’ordre à trois questions — **quoi**, **pourquoi**, **comment s’en sortir** — puis met l’action de reprise à portée de main.

- Le **quoi** vient d’abord : c’est le fait dont la personne a besoin maintenant.
- Le **pourquoi** ne figure que s’il est connu et utile ; on ne promet pas une cause que le système ignore.
- Le **comment** transforme l’impasse en prochaine étape. Et la saisie (adresse, panier) reste en place.`,
      takeaway: 'Un message d’erreur : ce qui a échoué, pourquoi (si c’est utile), comment s’en sortir — puis l’action de reprise.',
      sources: ['imp:clarify', NNG_ERRORS],
    },
  ],
};

export default harden;
