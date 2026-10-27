import type { ModuleContent, SourceRef } from '../../engine/types';

/*
 * Contrast ratios quoted below were computed with the WCAG formula of src/engine/grade.ts.
 * Loading thresholds (1 s / 2–10 s / 10 s) come from the two NN/g articles referenced.
 */

const NNG_SKELETON: SourceRef = { label: 'Nielsen Norman Group — Skeleton Screens 101', url: 'https://www.nngroup.com/articles/skeleton-screens/' };
const NNG_PROGRESS: SourceRef = {
  label: 'Nielsen Norman Group — Progress Indicators Make a Slow System Less Insufferable',
  url: 'https://www.nngroup.com/articles/progress-indicators/',
};
const NNG_BUTTON_STATES: SourceRef = {
  label: 'Nielsen Norman Group — Button States: Communicate Interaction',
  url: 'https://www.nngroup.com/articles/button-states-communicate-interaction/',
};
const NNG_EMPTY: SourceRef = {
  label: 'Nielsen Norman Group — Designing Empty States in Complex Applications',
  url: 'https://www.nngroup.com/articles/empty-state-interface-design/',
};
const NNG_FLAT: SourceRef = {
  label: 'Nielsen Norman Group — Flat UI Elements Attract Less Attention and Cause Uncertainty',
  url: 'https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/',
};
const WCAG_FOCUS: SourceRef = {
  label: 'W3C — Comprendre le critère 2.4.13 (apparence du focus)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html',
};
const WCAG_NON_TEXT: SourceRef = {
  label: 'W3C — Comprendre le critère 1.4.11 (contraste du contenu non textuel)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
};
const MDN_POPOVER: SourceRef = { label: 'MDN — API Popover', url: 'https://developer.mozilla.org/fr/docs/Web/API/Popover_API' };
const MDN_SCROLLBAR: SourceRef = { label: 'MDN — scrollbar-color', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/scrollbar-color' };

/* ---------- Shared mock pieces ---------- */

const SPIN_CSS = `
.pol-spin { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgb(255 255 255 / 0.4); border-top-color: #fff; flex: none; animation: pol-rot 0.9s linear infinite; }
.pol-spin--big { width: 32px; height: 32px; border-width: 3px; border-color: #dfe3ea; border-top-color: #1f4fd8; }
@keyframes pol-rot { to { transform: rotate(360deg); } }
`;

/** Invoices page header, shared by both sides of the loading duel. */
const INVOICES_HEAD = `<div class="mk-row mk-between"><p class="mk-h2">Factures</p><span class="mk-btn mk-btn--s"><i data-icon="plus" style="--ico:14px"></i>Nouvelle facture</span></div>
  <div class="mk-tabs"><span class="mk-tab mk-tab--on">Toutes</span><span class="mk-tab">En attente</span><span class="mk-tab">Payées</span></div>`;

const SKELETON_ROW = (a: number, b: number) =>
  `<li><span class="pol-sk pol-sk-av"></span><div class="mk-grow mk-stack" style="--gap:6px"><span class="pol-sk" style="width:${a}%"></span><span class="pol-sk pol-sk--thin" style="width:${b}%"></span></div><span class="pol-sk" style="width:64px"></span></li>`;

const SKELETON_CSS = `
.pol-sk { display: block; height: 10px; border-radius: 5px; background: #e6e9ef; }
.pol-sk--thin { height: 8px; }
.pol-sk-av { width: 28px; height: 28px; border-radius: 50%; flex: none; }
`;

/** Payment summary used by the loading-button duel. */
const PAY_SUMMARY = `<p class="mk-h2">Récapitulatif</p>
  <div class="mk-stack" style="--gap:6px">
    <div class="mk-row mk-between"><span>Abonnement annuel</span><span class="mk-price">79,90&nbsp;€</span></div>
    <div class="mk-row mk-between"><span class="mk-muted">Coffret de bienvenue</span><span class="mk-price">5,00&nbsp;€</span></div>
    <div class="mk-divider"></div>
    <div class="mk-row mk-between"><span class="mk-strong">Total</span><span class="mk-price">84,90&nbsp;€</span></div>
  </div>`;

const PAY_FOOT = `<p class="mk-small mk-muted mk-row" style="--gap:6px;justify-content:center"><i data-icon="lock" style="--ico:12px"></i>Paiement chiffré</p>`;

/** Members table used by the clipped-menu duel. */
const MEMBER_ROWS = `<div class="pol-tr pol-th"><span>Membre</span><span>Rôle</span><span></span></div>
      <div class="pol-tr"><span class="mk-row" style="--gap:8px"><span class="mk-avatar" style="width:24px;height:24px"></span>Inès Belkacem</span><span>Admin</span><span class="pol-more"><i data-icon="ellipsis" style="--ico:16px"></i></span></div>
      <div class="pol-tr"><span class="mk-row" style="--gap:8px"><span class="mk-avatar" style="width:24px;height:24px"></span>Hugo Lambert</span><span>Éditeur</span><span class="pol-more"><i data-icon="ellipsis" style="--ico:16px"></i></span></div>
      <div class="pol-tr pol-tr--open"><span class="mk-row" style="--gap:8px"><span class="mk-avatar" style="width:24px;height:24px"></span>Sacha Nguyen</span><span>Lecteur</span><span class="pol-more pol-more--on"><i data-icon="ellipsis" style="--ico:16px"></i></span>
        <div class="pol-menu"><span>Modifier le rôle</span><span>Renvoyer l’invitation</span><span class="pol-menu-danger">Retirer de l’équipe</span></div>
      </div>
      <div class="pol-tr pol-foot"><span class="mk-small mk-muted">2 invitations en attente</span></div>`;

const MEMBER_CSS = `
.pol-table { position: relative; border: 1px solid #e1e4ea; border-radius: 10px; }
.pol-tr { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 72px 32px; align-items: center; gap: 8px; padding: 9px 12px; border-top: 1px solid #eceef2; }
.pol-th { border-top: 0; font-size: 12px; font-weight: 600; color: #5a6172; }
.pol-foot { background: #f7f8fa; border-radius: 0 0 10px 10px; }
.pol-more { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: #5a6172; }
.pol-more--on { background: #eef1f7; color: #1d2230; }
.pol-menu { position: absolute; z-index: 2; top: 40px; inset-inline-end: 10px; width: 200px; display: flex; flex-direction: column; padding: 6px; background: #fff; border: 1px solid #e1e4ea; border-radius: 10px; box-shadow: 0 10px 28px rgb(15 20 35 / 0.16); }
.pol-menu > span { padding: 8px 10px; border-radius: 6px; }
.pol-menu > span:first-child { background: #f1f3f7; }
.pol-menu-danger { color: #b3261e; }
`;

const polish: ModuleContent = {
  id: 'polish',
  title: 'États et finition',
  category: 'affiner',
  summary:
    'Mener la dernière passe avant la mise en ligne : classer la dérive, trier les défauts du fonctionnel au cosmétique, donner à chaque contrôle tous ses états et finir les surfaces qu’on oublie — sans refondre en douce.',
  minutes: 11,
  commands: ['polish'],
  sources: ['imp:polish', 'imp:operate', 'imp:craft-floor', NNG_SKELETON, NNG_BUTTON_STATES, WCAG_FOCUS],
  sections: [
    {
      id: 'affinage',
      title: 'Polir, c’est affiner — jamais refondre en douce',
      body: `La passe de **finition** (*polish*) est le dernier contrôle qualité avant la mise en ligne. Elle **préserve** l’univers visuel en place, le contenu, le comportement et tout ce qui sort du périmètre demandé.

- Si le concept lui-même est faux, **dis-le** et recommande une refonte (ou une passe *bolder*) au lieu de glisser un remplacement dans la finition. Une refonte déguisée surprend l’équipe, rompt la cohérence avec les écrans voisins et n’a jamais été décidée comme telle.
- Avant de toucher quoi que ce soit, **utilise la fonctionnalité toi-même** aux tailles représentatives (bureau et mobile), avec les états, les longueurs de contenu, les rôles et les modes de saisie que les gens rencontreront vraiment.
- Établis le niveau d’exigence, le temps disponible et ce qui est volontairement inachevé.
- Un résultat du détecteur d’anti-patterns est une **preuve de défaut, pas une preuve de qualité** : un scan propre ne remplace ni le regard sur le rendu ni le parcours réel.
- Demande avant de modifier une affirmation factuelle du contenu.`,
    },
    {
      id: 'derive',
      title: 'Classer la dérive avant de la corriger',
      body: `Commence par établir le système : le DESIGN.md s’il existe, les **jetons** (*tokens* : les valeurs nommées du système — couleurs, espacements, rayons…), les composants partagés et les parcours voisins. Sans système formel, appuie-toi sur les conventions cohérentes du projet.

Chaque écart — la **dérive** — se classe avant d’être corrigé :

- **Jeton manquant** : le système a besoin d’une valeur réutilisable qu’il n’a pas encore.
- **Implémentation ponctuelle** : un composant ou un motif partagé existe et devrait remplacer le code fait main.
- **Décalage conceptuel** : le parcours, l’architecture de l’information ou la hiérarchie diffèrent de zones comparables du produit.
- **Défaut local** : l’implémentation est simplement incomplète ou incohérente.

Corrige la **cause**, au niveau le plus étroit qui convient. Promeus en jeton une valeur vraiment réutilisable, mais ne crée pas d’abstraction système pour une exception locale. Et si un principe structurant ne peut pas se déduire du code, demande.`,
      examples: [
        {
          title: 'Un même rôle, un même composant',
          bad: {
            alt: 'Deux panneaux de réglages, Profil et Facturation, chacun avec un bouton Enregistrer : l’un est un bouton bleu standard, l’autre une pilule verte en capitales avec une ombre.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-card mk-stack" style="--gap:8px">
    <p class="mk-h3">Profil</p>
    <div class="mk-field"><span class="mk-label">Nom affiché</span><span class="mk-input">Camille Moreau</span></div>
    <span class="mk-btn" style="align-self:flex-end">Enregistrer</span>
  </div>
  <div class="mk-card mk-stack" style="--gap:8px">
    <p class="mk-h3">Facturation</p>
    <div class="mk-field"><span class="mk-label">E-mail de facturation</span><span class="mk-input">compta@atelier-moreau.fr</span></div>
    <span class="pol-pill" style="align-self:flex-end">ENREGISTRER</span>
  </div>
</div>`,
            css: `.pol-pill { display: inline-flex; align-items: center; min-height: 34px; padding: 0 20px; border-radius: 999px; background: #0b7a5e; color: #fff; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; box-shadow: 0 4px 10px rgb(11 122 94 / 0.35); }`,
          },
          badNote: 'Deux « Enregistrer », deux composants : forme, couleur, casse et ombre diffèrent. L’un des deux est faux.',
          good: {
            alt: 'Les deux mêmes panneaux de réglages, chacun avec le même bouton bleu Enregistrer.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-card mk-stack" style="--gap:8px">
    <p class="mk-h3">Profil</p>
    <div class="mk-field"><span class="mk-label">Nom affiché</span><span class="mk-input">Camille Moreau</span></div>
    <span class="mk-btn" style="align-self:flex-end">Enregistrer</span>
  </div>
  <div class="mk-card mk-stack" style="--gap:8px">
    <p class="mk-h3">Facturation</p>
    <div class="mk-field"><span class="mk-label">E-mail de facturation</span><span class="mk-input">compta@atelier-moreau.fr</span></div>
    <span class="mk-btn" style="align-self:flex-end">Enregistrer</span>
  </div>
</div>`,
          },
          goodNote: 'Le même rôle utilise le même composant partagé : l’implémentation ponctuelle a été remplacée.',
        },
      ],
    },
    {
      id: 'triage',
      title: 'Trier : le fonctionnel avant le cosmétique',
      body: `Sépare les défauts **fonctionnels** des défauts **cosmétiques**, puis corrige dans cet ordre :

1. **Tâches cassées ou bloquées, pertes de données, états trompeurs, chemins inaccessibles** — un bouton qui ne répond plus, un brouillon perdu, un « Enregistré » affiché alors que rien ne l’est, un parcours impossible au clavier.
2. **États manquants** : chargement, vide, erreur, succès, désactivé, permission.
3. **Parcours, hiérarchie, responsive et dérive du système.**
4. **Incohérences visuelles et de mouvement.**
5. **Nettoyage du code et des assets** : sorties de débogage, code mort, imports inutilisés, styles obsolètes, doublons créés par la finition.

Un état **trompeur** est aussi grave qu’une panne : Nielsen Norman Group décrit le message « Aucun enregistrement » affiché pendant le chargement, puis remplacé par les données — les utilisateurs pressés repartent avant de les voir.

Ne perfectionne pas un coin en laissant le reste sous le même niveau d’exigence : polis **tout le chemin**. L’arrivée, les transitions, les états vides et les chemins de reprise doivent se raccorder, au lieu de se comporter comme des écrans isolés.`,
    },
    {
      id: 'etats-controles',
      title: 'Chaque contrôle a tous ses états',
      body: `Tout composant interactif a un état **par défaut, survol, focus, actif (pressé), désactivé, chargement et erreur** — et un état de **succès** quand l’action aboutit. N’en livre pas la moitié.

- **Survol** : signale que l’élément réagit au pointeur. Il n’existe ni au doigt ni au clavier : l’**affordance** (le signe qu’on peut agir) doit déjà se voir au repos.
- **Focus** : montre où se trouve le clavier. Un contour plutôt qu’un simple changement de couleur, contrasté d’au moins **3:1** avec ce qui l’entoure. Ne le supprime jamais sans le remplacer.
- **Actif** : accuse réception du clic sans délai perceptible (Nielsen Norman Group recommande 100 à 150 ms), sinon on clique deux fois.
- **Désactivé** : indique que l’action n’est pas disponible maintenant — et, si ce n’est pas évident, pourquoi.
- **Chargement** : garde la largeur du bouton, nomme l’opération (« Envoi… ») et bloque la double soumission.
- **Erreur** et **succès** : disent ce qui s’est passé, près de l’élément concerné.

Standardise ce vocabulaire d’états (survol, focus, actif, désactivé, sélectionné, chargement, erreur, avertissement, succès, info) sous forme de jetons sémantiques, et vérifie le contraste du texte, des contrôles et du focus **dans chaque état**. L’accent coloré sert l’action principale, la sélection et les indicateurs d’état — jamais un élément inactif.`,
      examples: [
        {
          title: 'Une fiche d’états complète',
          bad: {
            alt: 'Fiche d’états d’un bouton Envoyer : défaut, survol, focus clavier et pressé sont identiques ; en chargement, le bouton devient un petit rond avec un indicateur.',
            html: `<div class="mk-pad pol-sheet">
  <span class="mk-small mk-muted">Défaut</span><span class="mk-btn">Envoyer</span>
  <span class="mk-small mk-muted">Survol</span><span class="mk-btn">Envoyer</span>
  <span class="mk-small mk-muted">Focus clavier</span><span class="mk-btn">Envoyer</span>
  <span class="mk-small mk-muted">Pressé</span><span class="mk-btn">Envoyer</span>
  <span class="mk-small mk-muted">Désactivé</span><span class="mk-btn mk-btn--disabled">Envoyer</span>
  <span class="mk-small mk-muted">Chargement</span><span class="pol-round"><span class="pol-spin"></span></span>
</div>`,
            css: `.pol-sheet { display: grid; grid-template-columns: max-content max-content; gap: 10px 18px; align-items: center; }
.pol-sheet .mk-btn { min-width: 136px; }
.pol-round { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: #1f4fd8; }
${SPIN_CSS}`,
          },
          badNote: 'Survol, focus et pressé ne se distinguent pas du repos ; en chargement, le bouton rétrécit et perd son libellé.',
          good: {
            alt: 'Fiche d’états d’un bouton Envoyer : survol plus foncé, focus avec un contour décalé, pressé plus sombre, désactivé gris, chargement à largeur constante avec le texte Envoi.',
            html: `<div class="mk-pad pol-sheet">
  <span class="mk-small mk-muted">Défaut</span><span class="mk-btn">Envoyer</span>
  <span class="mk-small mk-muted">Survol</span><span class="mk-btn" style="background:#1a43b8">Envoyer</span>
  <span class="mk-small mk-muted">Focus clavier</span><span class="mk-btn" style="box-shadow:0 0 0 2px #fff,0 0 0 5px #1f4fd8">Envoyer</span>
  <span class="mk-small mk-muted">Pressé</span><span class="mk-btn" style="background:#163a9c;box-shadow:inset 0 2px 4px rgb(0 0 0 / 0.35)">Envoyer</span>
  <span class="mk-small mk-muted">Désactivé</span><span class="mk-btn mk-btn--disabled">Envoyer</span>
  <span class="mk-small mk-muted">Chargement</span><span class="mk-btn"><span class="pol-spin"></span>Envoi…</span>
</div>`,
            css: `.pol-sheet { display: grid; grid-template-columns: max-content max-content; gap: 10px 18px; align-items: center; }
.pol-sheet .mk-btn { min-width: 136px; }
${SPIN_CSS}`,
          },
          goodNote: 'Chaque état se reconnaît ; le focus a un contour décalé ; le chargement garde la largeur et nomme l’opération.',
        },
      ],
    },
    {
      id: 'etats-contenu',
      title: 'Chargement, vide, erreur : dire la vérité',
      body: `Les zones de contenu ont elles aussi leurs états, et chacun doit dire **la vérité** sur ce qui se passe.

- **Chargement** : sous 1 seconde, n’affiche rien — un indicateur qui clignote inquiète plus qu’il ne rassure. Pour une page ou une zone de contenu, préfère un **squelette** (*skeleton*) : des blocs neutres qui reprennent la forme du contenu à venir. On comprend la structure et rien ne saute à l’arrivée des données. Garde le spinner pour un petit module isolé (une carte, une vidéo) et une attente de 2 à 10 secondes. Au-delà de 10 secondes, une barre de progression avec une estimation. Ne fabrique jamais une fausse progression.
- **Vide** : un état vide **enseigne l’interface** — ce qui apparaîtra ici et comment commencer — au lieu d’un simple « Rien ici ». Et il n’apparaît qu’une fois le chargement terminé.
- **Erreur** : ce qui a échoué et comment s’en sortir ; une panne dans un composant ne bloque pas toute l’interface.
- **Succès** : une confirmation brève du résultat ; la conséquence suivante seulement si elle change ce qu’il faut faire.
- **Permission** : ce qui est inaccessible, pourquoi, et comment obtenir l’accès.`,
      examples: [
        {
          title: 'Ne pas annoncer un vide qui n’existe pas',
          bad: {
            alt: 'Boîte de réception en cours de synchronisation qui affiche en même temps le message Aucun message.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2">Boîte de réception</p><span class="mk-small mk-muted mk-row" style="--gap:6px"><i data-icon="refresh-cw" style="--ico:13px"></i>Synchronisation…</span></div>
  <div class="mk-center mk-stack" style="--gap:6px;padding:40px 0">
    <p class="mk-h3">Aucun message</p>
    <p class="mk-small mk-muted">Votre boîte de réception est vide.</p>
  </div>
</div>`,
          },
          badNote: 'Le vide s’affiche pendant le chargement : on conclut qu’il n’y a rien, et on part avant l’arrivée des messages.',
          good: {
            alt: 'Même boîte de réception en cours de synchronisation, avec des lignes de squelette à la place des messages.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2">Boîte de réception</p><span class="mk-small mk-muted mk-row" style="--gap:6px"><i data-icon="refresh-cw" style="--ico:13px"></i>Synchronisation…</span></div>
  <ul class="mk-list">${SKELETON_ROW(48, 80)}${SKELETON_ROW(62, 70)}${SKELETON_ROW(40, 85)}</ul>
</div>`,
            css: SKELETON_CSS,
          },
          goodNote: 'Le squelette dit « ça arrive » et montre la forme des messages ; l’état vide attendra la fin du chargement.',
        },
      ],
    },
    {
      id: 'finitions',
      title: 'Les finitions qu’on oublie',
      body: `Certaines surfaces trahissent une interface « assemblée » plutôt que construite.

- **Les surfaces du navigateur** : la sélection de texte (\`::selection\`), le curseur d’insertion (\`caret-color\`), les barres de défilement (\`scrollbar-color\`), les anneaux de focus, le décalage du soulignement (\`text-underline-offset\`) et les chiffres des tableaux (\`tabular-nums\`) sortent avec les réglages du navigateur, qui n’appartiennent à aucun système de design. Thématise-les depuis la palette : c’est le signal de soin le moins cher. Thématiser n’est pas réinventer : on teinte la barre de défilement native, on ne la remplace pas par un composant maison.
- **Les menus qui débordent** : un menu positionné en absolu dans un ancêtre en \`overflow: hidden\` ou \`overflow: auto\` est coupé net. Utilise \`<dialog>\`, l’API popover, \`position: fixed\` ou un portail pour qu’il s’échappe de son conteneur.
- **Des affordances cohérentes** : même forme de bouton, même vocabulaire de contrôles de formulaire, même famille d’icônes (trait, graisse, taille, alignement optique) d’un écran à l’autre.
- **Les images** : réserve leur place (\`aspect-ratio\`, dimensions) pour éviter les sauts de mise en page, et écris un texte alternatif utile.
- **Le texte** : terminologie, majuscules et ponctuation identiques partout.`,
      examples: [
        {
          title: 'Les surfaces du navigateur, thématisées',
          bad: {
            alt: 'Éditeur de notes au thème sombre avec une sélection de texte bleu clair, un lien bleu vif collé à son soulignement et une barre de défilement claire.',
            html: `<div class="pol-ed">
  <div class="pol-ed-text">
    <p class="pol-ed-h">Compte rendu — atelier du 14 mars</p>
    <p>Les équipes ont validé le nouveau parcours de commande. <span class="pol-sel-bad">Le lancement est prévu le 2 avril, après la recette.</span> Voir la <span class="pol-link-bad">fiche de suivi</span> pour le détail des tâches.</p>
  </div>
  <div class="pol-bar pol-bar--bad"><span></span></div>
</div>`,
            css: `.pol-ed { display: flex; background: #15171d; color: #dfe2ea; border-radius: 10px; min-height: 170px; }
.pol-ed-text { flex: 1; padding: 18px; display: flex; flex-direction: column; gap: 10px; line-height: 1.6; }
.pol-ed-h { font-weight: 700; font-size: 16px; color: #f2f3f7; }
.pol-sel-bad { background: #accef7; color: #15171d; }
.pol-link-bad { color: #3d7bff; text-decoration: underline; text-underline-offset: 1px; }
.pol-bar { width: 14px; flex: none; padding: 4px 3px; }
.pol-bar span { display: block; height: 70px; border-radius: 7px; }
.pol-bar--bad { background: #f1f1f1; border-left: 1px solid #dcdcdc; }
.pol-bar--bad span { background: #c1c1c1; }`,
          },
          badNote: 'Sélection, lien et barre de défilement gardent les réglages du navigateur : trois taches claires dans un thème sombre.',
          good: {
            alt: 'Même éditeur sombre avec une sélection teintée d’ambre, un lien ambre au soulignement décalé et une barre de défilement sombre et discrète.',
            html: `<div class="pol-ed">
  <div class="pol-ed-text">
    <p class="pol-ed-h">Compte rendu — atelier du 14 mars</p>
    <p>Les équipes ont validé le nouveau parcours de commande. <span class="pol-sel-good">Le lancement est prévu le 2 avril, après la recette.</span> Voir la <span class="pol-link-good">fiche de suivi</span> pour le détail des tâches.</p>
  </div>
  <div class="pol-bar"><span></span></div>
</div>`,
            css: `.pol-ed { display: flex; background: #15171d; color: #dfe2ea; border-radius: 10px; min-height: 170px; }
.pol-ed-text { flex: 1; padding: 18px; display: flex; flex-direction: column; gap: 10px; line-height: 1.6; }
.pol-ed-h { font-weight: 700; font-size: 16px; color: #f2f3f7; }
.pol-sel-good { background: rgb(232 170 72 / 0.32); }
.pol-link-good { color: #f0b860; text-decoration: underline; text-decoration-color: rgb(240 184 96 / 0.5); text-underline-offset: 3px; }
.pol-bar { width: 14px; flex: none; padding: 4px 3px; }
.pol-bar span { display: block; height: 70px; border-radius: 7px; background: #3a3f4b; }`,
          },
          goodNote: 'Les mêmes surfaces natives, teintées depuis la palette : rien ne sort du thème, rien n’a été réinventé.',
        },
      ],
    },
    {
      id: 'verifier',
      title: 'Vérifier tout le parcours avant de livrer',
      body: `Refais le parcours complet à la souris, au clavier et au toucher, puis vérifie :

- les largeurs mobile, intermédiaire et large ;
- les états chargement, vide, erreur, succès, désactivé, contenu long et contenu manquant ;
- le zoom, le contraste, le focus, la sémantique et les noms lus par les lecteurs d’écran ;
- la console, les sauts de mise en page, la latence des interactions et le chargement des images ;
- l’accord avec le DESIGN.md, les écrans voisins et le périmètre demandé.

Termine en relisant le **diff** (la différence entre le code avant et après ta passe) : retire les changements accidentels, le code orphelin, les valeurs redondantes et les fichiers temporaires. On ne livre que lorsque la fonctionnalité est complète et finie de façon homogène sur tout le parcours.`,
    },
  ],
  rules: [
    {
      id: 'refine',
      front: 'Que faire si, pendant la finition, tu constates que le concept lui-même est faux ?',
      back: 'Le dire et recommander une refonte, au lieu de glisser un remplacement dans la passe de finition : la finition affine, elle ne remplace pas.',
    },
    {
      id: 'drift',
      front: 'Quelles sont les quatre natures de dérive à distinguer avant de corriger ?',
      back: 'Jeton manquant, implémentation ponctuelle, décalage conceptuel, défaut local. On corrige la cause au niveau le plus étroit qui convient.',
    },
    {
      id: 'triage',
      front: 'Dans quel ordre trier les défauts d’une passe de finition ?',
      back: 'Tâches bloquées, pertes de données, états trompeurs, chemins inaccessibles → états manquants → parcours, hiérarchie, responsive, dérive → visuel et mouvement → nettoyage du code.',
    },
    {
      id: 'states',
      front: 'Quels états chaque composant interactif doit-il avoir ?',
      back: 'Défaut, survol, focus, actif, désactivé, chargement, erreur — et succès quand l’action aboutit.',
    },
    {
      id: 'focus',
      front: 'À quoi doit ressembler un focus clavier ?',
      back: 'Un contour visible d’au moins 2 px, contrasté à 3:1 entre l’état focalisé et l’état normal. Jamais supprimé sans remplacement.',
    },
    {
      id: 'hover',
      front: 'Le survol suffit-il à signaler qu’un élément est cliquable ?',
      back: 'Non : il n’existe ni au doigt ni au clavier. L’affordance doit se voir au repos ; le survol confirme.',
    },
    {
      id: 'loading-button',
      front: 'Que fait un bouton pendant l’envoi ?',
      back: 'Il garde sa largeur, nomme l’opération (« Envoi… ») et refuse un second clic.',
    },
    {
      id: 'skeleton',
      front: 'Rien, squelette, spinner ou barre de progression : comment choisir ?',
      back: 'Rien sous 1 s ; un squelette pour une zone de contenu ; un spinner pour un petit module (2 à 10 s) ; une progression réelle avec estimation au-delà de 10 s.',
    },
    {
      id: 'false-empty',
      front: 'Pourquoi ne jamais afficher « Aucun résultat » pendant un chargement ?',
      back: 'C’est un état trompeur : les gens pressés concluent que c’est vide et partent avant l’arrivée des données.',
    },
    {
      id: 'menus',
      front: 'Pourquoi un menu déroulant se retrouve-t-il coupé ?',
      back: 'Il est positionné dans un ancêtre en `overflow: hidden` ou `auto`. Sors-le du flux : `<dialog>`, `popover`, `position: fixed` ou portail.',
    },
    {
      id: 'surfaces',
      front: 'Quelles surfaces du navigateur thématiser depuis la palette ?',
      back: 'Sélection de texte, curseur d’insertion, barres de défilement, anneaux de focus, décalage du soulignement, chiffres des tableaux — teintés, pas réinventés.',
    },
    {
      id: 'consistency',
      front: 'Le bouton « Enregistrer » a deux apparences dans l’app : que conclure ?',
      back: 'L’une des deux est fausse. Même rôle, même composant, même vocabulaire visuel.',
    },
    {
      id: 'detector',
      front: 'Un scan du détecteur sans alerte prouve-t-il la qualité ?',
      back: 'Non : c’est une preuve de défauts quand il signale, jamais une preuve de qualité. Il faut parcourir le vrai chemin, dans tous ses états.',
    },
  ],
  exercises: [
    {
      id: 'polish-skeleton-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'La liste des factures met environ 3 secondes à charger. Quelle version gère le mieux cette attente ?',
      options: [
        {
          id: 'spinner',
          visual: {
            alt: 'Page Factures dont la zone de liste est vide, avec un indicateur rond qui tourne au centre et le texte Chargement.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  ${INVOICES_HEAD}
  <div class="pol-wait"><span class="pol-spin pol-spin--big"></span><span class="mk-small mk-muted">Chargement…</span></div>
</div>`,
            css: `.pol-wait { min-height: 196px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
${SPIN_CSS}`,
          },
          why: 'Un spinner au milieu de la page ne dit rien de ce qui arrive : la zone paraît vide, puis tout saute quand les données arrivent.',
        },
        {
          id: 'skeleton',
          visual: {
            alt: 'Page Factures dont la liste est remplacée par cinq lignes grises qui reprennent la forme des factures à venir.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  ${INVOICES_HEAD}
  <ul class="mk-list">${SKELETON_ROW(52, 30)}${SKELETON_ROW(40, 24)}${SKELETON_ROW(58, 34)}${SKELETON_ROW(46, 28)}</ul>
</div>`,
            css: SKELETON_CSS,
          },
          why: 'Le squelette reprend la forme des lignes à venir : on comprend la structure, et rien ne saute quand les données arrivent.',
        },
      ],
      answer: 'skeleton',
      explanation: `Pour une zone de contenu entière, un **squelette** — des blocs neutres qui imitent la mise en page à venir — vaut mieux qu’un spinner : il montre que le chargement avance, prépare l’œil à la structure de la page et évite le saut de mise en page à l’arrivée des données.

Le spinner a sa place, mais ailleurs : sur un petit module isolé (une carte, une vidéo) et pour une attente de 2 à 10 secondes. Sous 1 seconde, n’affiche rien ; au-delà de 10 secondes, passe à une barre de progression avec une estimation.`,
      takeaway: 'Pour charger une zone de contenu, un squelette qui reprend sa forme — pas un spinner perdu au milieu de la page.',
      sources: ['imp:operate', NNG_SKELETON, NNG_PROGRESS],
    },
    {
      id: 'polish-loading-button-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'La cliente vient d’appuyer sur le bouton de paiement. Quel état de chargement est le mieux fini ?',
      options: [
        {
          id: 'shrink',
          visual: {
            alt: 'Récapitulatif de commande sur téléphone ; le bouton de paiement est devenu un petit rond bleu avec un indicateur, sans texte.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:14px">
  ${PAY_SUMMARY}
  <span class="pol-round"><span class="pol-spin"></span></span>
  ${PAY_FOOT}
</div>`,
            css: `.pol-round { align-self: center; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: #1f4fd8; }
${SPIN_CSS}`,
          },
          why: 'Le bouton change de taille (la mise en page saute), perd son libellé et ne dit plus ce qui se passe.',
        },
        {
          id: 'stable',
          visual: {
            alt: 'Récapitulatif de commande sur téléphone ; le bouton garde toute sa largeur et affiche un indicateur suivi de Paiement en cours.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:14px">
  ${PAY_SUMMARY}
  <span class="mk-btn mk-btn--block"><span class="pol-spin"></span>Paiement en cours…</span>
  ${PAY_FOOT}
</div>`,
            css: SPIN_CSS,
          },
          why: 'Même largeur, libellé qui nomme l’opération, indicateur discret : on sait que l’appui est pris en compte et on ne réappuie pas.',
        },
      ],
      answer: 'stable',
      explanation: `L’état de **chargement** d’un bouton a trois rôles : confirmer que l’action a été reçue, dire ce qui se passe et empêcher une seconde soumission.

- Garde la **même largeur** : un bouton qui rétrécit fait sauter la mise en page et ressemble soudain à un autre composant.
- **Nomme l’opération** (« Paiement en cours… ») plutôt qu’un indicateur muet.
- **Bloque la double soumission** pendant l’envoi : sans retour visible, beaucoup de gens pensent que leur action n’a pas été enregistrée et recommencent.`,
      takeaway: 'Un bouton en chargement garde sa largeur, nomme l’opération et refuse un second clic.',
      sources: ['imp:polish', 'imp:operate', NNG_BUTTON_STATES, NNG_PROGRESS],
    },
    {
      id: 'polish-clipped-menu-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Le menu d’actions de la dernière ligne est ouvert. Quelle implémentation est correcte ?',
      options: [
        {
          id: 'clipped',
          visual: {
            alt: 'Tableau de trois membres ; le menu ouvert sur la dernière ligne est coupé net par le bord du tableau, juste après sa première action.',
            html: `<div class="mk-pad" style="padding-bottom:120px">
  <div class="pol-table" style="overflow:hidden">
      ${MEMBER_ROWS}
  </div>
</div>`,
            css: MEMBER_CSS,
          },
          why: 'Le menu est positionné dans un conteneur qui masque son débordement (overflow: hidden) : il est coupé au bord du tableau et ses dernières actions sont inaccessibles.',
        },
        {
          id: 'escapes',
          visual: {
            alt: 'Même tableau ; le menu ouvert sur la dernière ligne déborde du tableau et montre ses trois actions, dont Retirer de l’équipe.',
            html: `<div class="mk-pad" style="padding-bottom:120px">
  <div class="pol-table">
      ${MEMBER_ROWS}
  </div>
</div>`,
            css: MEMBER_CSS,
          },
          why: 'Le menu passe au-dessus de tout (popover, position fixe ou portail) : ses trois actions restent visibles et cliquables.',
        },
      ],
      answer: 'escapes',
      explanation: `Un menu positionné en \`absolute\` reste prisonnier du premier ancêtre qui coupe son contenu (\`overflow: hidden\`, \`auto\` ou \`clip\`). Sur la dernière ligne d’un tableau, il est tranché net — et « Retirer de l’équipe » devient introuvable.

Ce défaut ne se voit souvent qu’avec certaines données (la dernière ligne, un tableau court) : il faut ouvrir les menus partout. La correction consiste à sortir la surcouche du conteneur : élément \`<dialog>\`, attribut \`popover\` (qui place l’élément dans la couche supérieure de la page), \`position: fixed\` ou un portail vers la fin du document.`,
      takeaway: 'Un menu, une infobulle ou un popover doit s’échapper de son conteneur : `<dialog>`, `popover`, `position: fixed` ou portail.',
      sources: ['imp:operate', 'imp:detector', MDN_POPOVER],
    },
    {
      id: 'polish-consistency-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Ces deux formulaires viennent de la même application. Lequel est le plus fini ?',
      options: [
        {
          id: 'mixed',
          visual: {
            alt: 'Formulaire Informations personnelles où chaque champ a un style différent : libellé normal, libellé en capitales, libellé en italique, champ encadré, souligné ou en pilule, et deux boutons de formes différentes.',
            html: `<div class="mk-pad mk-stack" style="--gap:14px">
  <p class="mk-h2">Informations personnelles</p>
  <div class="mk-field"><span class="mk-label">Nom complet</span><span class="mk-input">Camille Moreau</span></div>
  <div class="mk-field"><span class="pol-lab-caps">ADRESSE E-MAIL</span><span class="pol-underline">camille@atelier-moreau.fr</span></div>
  <div class="mk-field"><span class="pol-lab-light">numéro de téléphone</span><span class="pol-pill-input">06 12 34 56 78</span></div>
  <div class="mk-row" style="justify-content:flex-end"><span class="pol-btn-square">Annuler</span><span class="pol-btn-pill">Enregistrer</span></div>
</div>`,
            css: `.pol-lab-caps { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; }
.pol-underline { display: block; padding: 6px 0; border-bottom: 2px solid #1d2230; }
.pol-lab-light { font-size: 13px; font-style: italic; color: #5a6172; }
.pol-pill-input { display: block; padding: 8px 14px; border-radius: 999px; background: #eef1f6; }
.pol-btn-square { display: inline-flex; align-items: center; min-height: 36px; padding: 0 14px; border: 2px solid #1d2230; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.pol-btn-pill { display: inline-flex; align-items: center; min-height: 40px; padding: 0 22px; border-radius: 999px; background: #0b7a5e; color: #fff; font-weight: 700; box-shadow: 0 6px 14px rgb(11 122 94 / 0.35); }`,
          },
          why: 'Trois styles de champ, trois traitements de libellé, deux formes de bouton : chaque élément semble venir d’un autre produit.',
        },
        {
          id: 'coherent',
          visual: {
            alt: 'Formulaire Informations personnelles où les trois champs ont le même libellé et le même cadre, avec deux boutons de même forme.',
            html: `<div class="mk-pad mk-stack" style="--gap:14px">
  <p class="mk-h2">Informations personnelles</p>
  <div class="mk-field"><span class="mk-label">Nom complet</span><span class="mk-input">Camille Moreau</span></div>
  <div class="mk-field"><span class="mk-label">Adresse e-mail</span><span class="mk-input">camille@atelier-moreau.fr</span></div>
  <div class="mk-field"><span class="mk-label">Numéro de téléphone</span><span class="mk-input">06 12 34 56 78</span></div>
  <div class="mk-row" style="justify-content:flex-end"><span class="mk-btn mk-btn--ghost">Annuler</span><span class="mk-btn">Enregistrer</span></div>
</div>`,
          },
          why: 'Un seul vocabulaire : mêmes champs, même casse, boutons de la même famille. On lit le contenu au lieu de déchiffrer les composants.',
        },
      ],
      answer: 'coherent',
      explanation: `La cohérence des **affordances** — les signes qui montrent comment agir — rend une interface digne de confiance. Quand un même rôle prend trois formes, l’utilisateur se demande à chaque fois si la différence a un sens.

Impeccable le formule simplement : si le bouton « Enregistrer » a deux apparences à deux endroits, l’un des deux est faux. La passe de finition aligne les rôles identiques sur le même composant partagé, la même casse et la même famille d’icônes.`,
      takeaway: 'Même rôle, même composant : boutons, champs, casse des libellés et icônes restent identiques d’un écran à l’autre.',
      sources: ['imp:operate', 'imp:polish'],
    },
    {
      id: 'polish-defects-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux défauts d’états sur cette page de réglages.',
      visual: {
        alt: 'Page Réglages du compte avec trois onglets, un champ Nom complet, un champ Téléphone à bordure rouge et des boutons Annuler et Enregistrer.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:14px">
  <p class="mk-h2" data-hotspot="title" style="align-self:flex-start">Réglages du compte</p>
  <div class="mk-tabs" style="align-items:center"><span class="mk-tab mk-tab--on">Profil</span><span class="mk-tab">Sécurité</span><span class="pol-tab-loud" data-hotspot="tab">Notifications</span></div>
  <div class="mk-field" data-hotspot="name"><span class="mk-label">Nom complet</span><span class="mk-input">Camille Moreau</span></div>
  <div class="mk-field" data-hotspot="phone"><span class="mk-label">Téléphone</span><span class="mk-input mk-input--error">06 12 34 5</span></div>
  <div class="mk-row" style="justify-content:flex-end"><span class="mk-btn mk-btn--ghost">Annuler</span><span class="mk-btn" data-hotspot="save">Enregistrer</span></div>
</div>`,
        css: `.pol-tab-loud { margin-inline-start: 4px; margin-bottom: 4px; padding: 5px 12px; border-radius: 999px; background: #1f4fd8; color: #fff; font-weight: 600; }`,
      },
      hotspots: [
        {
          id: 'tab',
          label: 'Onglet inactif en couleur pleine',
          correct: true,
          why: 'L’onglet Notifications, inactif, porte l’accent saturé alors que l’onglet actif reste discret : on ne sait plus quelle page est ouverte. L’accent sert la sélection, pas les états inactifs.',
        },
        {
          id: 'phone',
          label: 'Champ en erreur sans message',
          correct: true,
          why: 'Une bordure rouge seule ne dit ni le problème ni la correction, et la couleur seule échappe à une partie des gens. L’état d’erreur a besoin d’un message près du champ.',
        },
        { id: 'title', label: 'Titre de la page', correct: false, why: 'Titre clair, à la bonne taille : rien à corriger.' },
        { id: 'name', label: 'Champ Nom complet', correct: false, why: 'Champ standard avec un libellé persistant : il est fini.' },
        { id: 'save', label: 'Bouton Enregistrer', correct: false, why: 'Bouton principal du système, libellé explicite.' },
      ],
      explanation: `Deux états mal finis, deux façons de tromper :

- **L’accent sur un état inactif** : impeccable proscrit les couleurs pleines sur les éléments inactifs. Ici, l’onglet qui crie le plus fort est justement celui qui n’est pas sélectionné — l’état affiché ment.
- **L’erreur réduite à une couleur** : l’état d’erreur d’un champ dit ce qui ne va pas et comment corriger (« Numéro incomplet : 10 chiffres attendus »), près du champ, et ne repose pas sur la couleur seule.`,
      takeaway: 'L’accent signale la sélection, jamais un élément inactif ; un état d’erreur se lit en mots, pas seulement en rouge.',
      sources: ['imp:operate', 'imp:clarify', 'imp:polish'],
    },
    {
      id: 'polish-priority-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Ce panier présente plusieurs défauts. Clique sur celui à corriger en premier.',
      visual: {
        alt: 'Panier sur téléphone avec deux articles, dont l’un a un titre en capitales et une icône de corbeille pleine, un total, et un bandeau promotionnel sombre posé sur le bouton Payer.',
        frame: 'phone',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2" data-hotspot="title" style="align-self:flex-start">Panier (2)</p>
  <ul class="mk-list">
    <li><span class="mk-img" style="--ratio:1;width:44px;flex:none"></span><div class="mk-grow"><p class="mk-strong" data-hotspot="case">CASQUE ARIA STUDIO</p><p class="mk-small mk-muted">Noir mat · Qté 1</p></div><div class="mk-stack" style="--gap:4px;align-items:flex-end"><span class="mk-price">79,90&nbsp;€</span><span class="mk-muted"><i data-icon="trash" style="--ico:16px"></i></span></div></li>
    <li><span class="mk-img" style="--ratio:1;width:44px;flex:none"></span><div class="mk-grow"><p class="mk-strong">Câble USB-C tressé</p><p class="mk-small mk-muted">2 m · Qté 1</p></div><div class="mk-stack" style="--gap:4px;align-items:flex-end"><span class="mk-price">10,00&nbsp;€</span><span class="pol-icon-odd" data-hotspot="icon"><i data-icon="trash" class="pol-fill" data-stroke="2.6" style="--ico:20px"></i></span></div></li>
  </ul>
  <div class="mk-row mk-between"><span class="mk-strong">Total</span><span class="mk-price">89,90&nbsp;€</span></div>
  <div class="pol-paywrap" data-hotspot="promo">
    <span class="mk-btn mk-btn--block">Payer 89,90&nbsp;€</span>
    <div class="pol-promo"><i data-icon="percent" style="--ico:18px"></i><span class="mk-grow"><strong>−10&nbsp;% sur l’appli</strong><br><span class="mk-small">Code APPLI10 dès la 1re commande</span></span><span class="mk-btn mk-btn--s">Ouvrir</span></div>
  </div>
</div>`,
        css: `.pol-paywrap { position: relative; padding-bottom: 46px; }
.pol-promo { position: absolute; inset-inline: -6px; top: 18px; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: #1d2230; color: #fff; line-height: 1.3; box-shadow: 0 8px 24px rgb(15 20 35 / 0.3); }
.pol-icon-odd { color: #1d2230; }
.pol-fill { fill: currentColor; }`,
      },
      hotspots: [
        {
          id: 'promo',
          label: 'Bandeau qui recouvre le bouton Payer',
          correct: true,
          why: 'Le bandeau promotionnel se pose sur le bouton Payer et ne se ferme pas : la tâche principale est bloquée. C’est le premier niveau du tri, avant toute retouche visuelle.',
        },
        {
          id: 'icon',
          label: 'Icône d’une autre famille',
          correct: false,
          why: 'Défaut réel — une corbeille pleine et épaisse au milieu d’icônes au trait —, mais cosmétique (niveau 4 du tri). Il attendra que l’achat soit possible.',
        },
        {
          id: 'case',
          label: 'Titre d’article en capitales',
          correct: false,
          why: 'Incohérence de casse avec l’autre article : à corriger, mais elle ne gêne pas l’achat.',
        },
        { id: 'title', label: 'Titre du panier', correct: false, why: 'Titre clair qui annonce le nombre d’articles : rien à corriger.' },
      ],
      explanation: `Une passe de finition commence par le **fonctionnel**. L’ordre de tri d’impeccable place en tête les tâches cassées ou bloquées, les pertes de données, les états trompeurs et les chemins inaccessibles.

Ici, l’icône d’une autre famille et la casse incohérente sont de vrais défauts — mais cosmétiques. Tant que personne ne peut appuyer sur « Payer », les corriger ne change rien, ni pour la cliente ni pour la boutique.`,
      takeaway: 'Corrige d’abord ce qui bloque une tâche, perd des données ou trompe sur l’état ; le cosmétique passe après.',
      sources: ['imp:polish', 'imp:detector'],
    },
    {
      id: 'polish-triage-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces défauts relevés pendant une passe de finition, du plus urgent au moins urgent.',
      items: [
        { id: 'blocked', label: 'Après une carte refusée, le bouton « Payer » ne répond plus' },
        { id: 'states', label: 'La liste des commandes n’a ni état de chargement ni état vide' },
        { id: 'drift', label: 'Les Réglages enregistrent automatiquement, alors que tous les autres écrans ont un bouton « Enregistrer »' },
        { id: 'visual', label: 'Deux bleus différents pour les liens et des durées d’animation disparates' },
        { id: 'cleanup', label: 'Des styles orphelins et un `console.log` oublié dans le code' },
      ],
      explanation: `L’ordre de tri d’impeccable va du **fonctionnel** au **cosmétique** :

1. tâches bloquées, pertes de données, états trompeurs, chemins inaccessibles ;
2. états manquants (chargement, vide, erreur, succès, désactivé, permission) ;
3. parcours, hiérarchie, responsive et dérive du système ;
4. incohérences visuelles et de mouvement ;
5. nettoyage du code et des assets.

La logique : on corrige d’abord ce qui empêche d’arriver au bout, puis ce qui laisse dans le flou, puis ce qui désoriente, enfin ce qui gêne seulement l’œil. Le nettoyage ferme la passe pour ne pas laisser de dette derrière soi.`,
      takeaway: 'Tri : bloquant → états manquants → parcours et dérive → visuel et mouvement → nettoyage du code.',
      sources: ['imp:polish'],
    },
    {
      id: 'polish-drift-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque écart relevé à sa nature.',
      leftTitle: 'Écart relevé',
      rightTitle: 'Nature de la dérive',
      pairs: [
        { id: 'token', left: 'Trois écrans codent chacun leur propre orange d’avertissement', right: 'Jeton manquant' },
        { id: 'oneoff', left: 'Une boîte de dialogue faite main reproduit celle du système de design', right: 'Implémentation ponctuelle' },
        { id: 'concept', left: 'La création de devis enchaîne ses étapes dans un autre ordre que la création de factures', right: 'Décalage conceptuel' },
        { id: 'local', left: 'Le bouton « Annuler » de cet écran n’a pas d’état de survol', right: 'Défaut local' },
      ],
      explanation: `Classer la dérive dit **où** corriger :

- **Jeton manquant** : le besoin est réel et récurrent (un orange d’avertissement), mais le système n’a pas la valeur. On crée le jeton et on remplace les trois variantes.
- **Implémentation ponctuelle** : le système possède déjà le composant ; on remplace la copie faite main.
- **Décalage conceptuel** : deux parcours comparables ne suivent pas le même modèle mental — c’est une question de parcours, pas de pixels.
- **Défaut local** : une implémentation incomplète, à corriger sur place.

On corrige ainsi la cause au niveau le plus étroit qui convient : ni rustine locale pour un manque du système, ni abstraction système pour une exception.`,
      takeaway: 'Avant de corriger un écart, classe-le : jeton manquant, implémentation ponctuelle, décalage conceptuel ou défaut local.',
      sources: ['imp:polish'],
    },
    {
      id: 'polish-redesign-choice',
      type: 'choice',
      difficulty: 2,
      context:
        'On te confie la passe de finition de la page de tarifs avant sa mise en ligne. En la parcourant, tu constates que son comparatif en six colonnes est illisible sur mobile : c’est la structure même qui ne fonctionne pas.',
      prompt: 'Que fais-tu ?',
      options: [
        {
          id: 'flag',
          label: 'Je signale le problème de structure, je recommande une refonte de ce comparatif et je polis le reste dans le périmètre.',
          why: 'La finition affine, elle ne remplace pas : le problème de fond est nommé et confié à la bonne démarche.',
        },
        {
          id: 'smuggle',
          label: 'Je refais discrètement le comparatif sous une autre forme pendant la passe de finition.',
          why: 'Une refonte déguisée : elle sort du périmètre, surprend l’équipe et n’a jamais été décidée comme telle.',
        },
        {
          id: 'silent',
          label: 'Je règle les espacements et les couleurs sans rien dire : la structure n’est pas mon sujet.',
          why: 'Le défaut le plus grave resterait invisible pour l’équipe, caché derrière des détails soignés.',
        },
        {
          id: 'animate',
          label: 'J’ajoute des animations au comparatif pour que la finition se remarque.',
          why: 'Impeccable le refuse explicitement : on n’ajoute pas d’animation pour rendre la finition visible.',
        },
      ],
      answer: 'flag',
      explanation: `« La finition est un affinage, jamais une refonte déguisée » : elle **préserve** l’univers visuel, le contenu, le comportement et tout ce qui est hors périmètre. Quand le concept lui-même est faux, la bonne réponse est de **le dire** et de recommander une refonte, plutôt que de glisser un remplacement dans une passe censée affiner.

Se taire n’est pas mieux : le défaut le plus important resterait caché derrière des espacements impeccables.`,
      takeaway: 'Si le concept est faux, dis-le et recommande une refonte ; la finition affine, elle ne remplace jamais en douce.',
      sources: ['imp:polish', 'imp:skill'],
    },
    {
      id: 'polish-loading-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Lesquelles de ces pratiques de chargement sont recommandées ?',
      options: [
        {
          id: 'none',
          label: 'Ne rien afficher quand la réponse arrive en moins d’une seconde',
          why: 'Un indicateur qui clignote une fraction de seconde inquiète plus qu’il ne rassure.',
        },
        {
          id: 'skeleton',
          label: 'Un squelette qui reprend la forme de la liste pendant son chargement',
          why: 'Il montre la structure à venir et évite le saut de mise en page.',
        },
        {
          id: 'named',
          label: 'Nommer l’opération : « Chargement de vos factures… »',
          why: 'Le texte de chargement nomme l’opération réelle et fixe une attente honnête.',
        },
        {
          id: 'fake',
          label: 'Une barre de progression qui avance à rythme fixe, sans lien avec l’avancement réel',
          why: 'Une progression inventée trompe ; quand elle se fige à 99 %, la confiance s’effondre.',
        },
        {
          id: 'blocking',
          label: 'Un spinner plein écran qui masque toute la page pendant l’actualisation d’une seule carte',
          why: 'On bloque toute l’interface pour un seul module : un indicateur local suffit.',
        },
        {
          id: 'false-empty',
          label: 'Afficher « Aucune facture » le temps que les données arrivent',
          why: 'État trompeur : on annonce un vide qui n’existe pas, et les gens pressés repartent avant l’arrivée des données.',
        },
      ],
      answers: ['none', 'skeleton', 'named'],
      explanation: `Un état de chargement doit dire **la vérité** sur ce qui se passe :

- sous 1 seconde, rien ; pour une zone de contenu, un squelette ; pour un petit module, un indicateur local ; au-delà de 10 secondes, une progression réelle avec une estimation ;
- le texte nomme l’opération réelle ;
- on ne fabrique jamais de progression, et on n’affiche pas un faux vide pendant le chargement. Nielsen Norman Group relève que ce « Aucun enregistrement » provisoire fait partir les utilisateurs pressés avant l’arrivée des données.`,
      takeaway: 'Un chargement dit la vérité : rien sous 1 s, squelette pour le contenu, opération nommée, ni fausse progression ni faux vide.',
      sources: ['imp:operate', 'imp:clarify', NNG_SKELETON, NNG_EMPTY],
    },
    {
      id: 'polish-scrollbar-choice',
      type: 'choice',
      difficulty: 3,
      prompt:
        'Dans une application au thème sombre soigné, les barres de défilement restent celles du navigateur : claires et grises. Que fais-tu ?',
      options: [
        {
          id: 'tint',
          label: 'Je les teinte depuis la palette avec `scrollbar-color`, en gardant les barres natives.',
          why: 'Thématiser sans réinventer : la barre garde son comportement natif et s’accorde au thème.',
        },
        {
          id: 'custom',
          label: 'Je les remplace par un composant de défilement JavaScript au style unique.',
          why: 'On réinvente une affordance standard pour le style : molette, clavier, inertie et accessibilité sont à réimplémenter.',
        },
        {
          id: 'hide',
          label: 'Je les masque complètement pour un rendu plus épuré.',
          why: 'On retire l’indice qu’il reste du contenu et la poignée qui permet de s’y déplacer.',
        },
        {
          id: 'leave',
          label: 'Je les laisse telles quelles : c’est le navigateur qui décide.',
          why: 'Ces surfaces font partie du design ; laissées par défaut, elles trahissent une interface assemblée plutôt que construite.',
        },
      ],
      answer: 'tint',
      explanation: `Les **surfaces du navigateur** — sélection de texte, curseur d’insertion, barres de défilement, anneaux de focus, décalage du soulignement, chiffres des tableaux — sortent avec des réglages qui n’appartiennent à aucun système de design. Impeccable demande de les thématiser depuis la palette : c’est le signal de soin le moins cher.

Mais thématiser n’est pas réinventer. Sur une surface d’application, impeccable refuse aussi les affordances standard refaites « pour le style » (barres de défilement maison, contrôles de formulaire étranges, modales non standard). \`scrollbar-color\` teinte la barre native sans toucher à son comportement.`,
      takeaway: 'Thématise les surfaces du navigateur depuis la palette (`scrollbar-color`, `::selection`, `caret-color`…), sans les remplacer par des composants maison.',
      sources: ['imp:craft-floor', 'imp:operate', MDN_SCROLLBAR],
    },
    {
      id: 'polish-detector-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Quand le détecteur d’anti-patterns ne signale plus rien, la passe de finition est terminée.',
      answer: false,
      explanation: `Faux. Pour impeccable, un résultat du détecteur est une **preuve de défaut, pas une preuve de qualité**. Un scan propre ne voit ni un parcours qui ne se raccorde pas, ni un état trompeur, ni un focus perdu après la fermeture d’une fenêtre.

La finition se vérifie en **utilisant** la fonctionnalité : à la souris, au clavier et au toucher, sur mobile et sur grand écran, avec du contenu long, manquant ou traduit, et dans chaque état.`,
      takeaway: 'Un scan propre ne prouve pas la qualité : parcours le vrai chemin, dans tous ses états et à toutes les tailles.',
      sources: ['imp:polish', 'imp:craft-floor'],
    },
    {
      id: 'polish-hover-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un changement de couleur au survol suffit à montrer qu’un élément est cliquable.',
      answer: false,
      explanation: `Faux. Le survol n’existe qu’avec une souris : au doigt et au clavier, il n’y en a pas. Si l’élément ne ressemble à rien de cliquable au repos, une partie des gens ne le découvrira jamais — Nielsen Norman Group a montré que les éléments trop « plats » attirent moins l’attention et créent de l’incertitude.

L’affordance doit se voir **au repos** (forme de bouton, lien souligné, libellé d’action) ; le survol vient en plus, comme confirmation.`,
      takeaway: 'L’affordance se voit au repos ; le survol confirme, il ne révèle pas.',
      sources: ['imp:polish', NNG_BUTTON_STATES, NNG_FLAT],
    },
    {
      id: 'polish-focus-slider',
      type: 'slider',
      difficulty: 2,
      prompt: 'Règle l’épaisseur de l’anneau de focus du champ actif pour qu’on le repère d’un coup d’œil.',
      visual: {
        alt: 'Formulaire de connexion dont le champ e-mail a le focus clavier ; l’épaisseur de son contour varie avec le curseur.',
        html: `<div class="mk-pad mk-stack" style="--gap:14px">
  <p class="mk-h2">Connexion</p>
  <div class="mk-field"><span class="mk-label">Adresse e-mail</span><span class="mk-input pol-focused">camille@atelier-moreau.fr<span class="pol-caret"></span></span></div>
  <div class="mk-field"><span class="mk-label">Mot de passe</span><span class="mk-input">••••••••••</span></div>
  <span class="mk-btn mk-btn--block">Se connecter</span>
</div>`,
        css: `.pol-focused { border-color: #1f4fd8; outline: var(--v, 1px) solid #1f4fd8; outline-offset: 2px; }
.pol-caret { display: inline-block; width: 1.5px; height: 16px; margin-inline-start: 1px; vertical-align: -3px; background: #1d2230; }`,
      },
      control: 'Épaisseur du focus',
      min: 0,
      max: 6,
      step: 0.5,
      initial: 1,
      unit: 'px',
      target: [2, 4],
      ideal: 3,
      explanation: `Le **focus** montre où se trouve le clavier. Un contour de 1 px se confond avec la bordure du champ. WCAG 2.2 (critère 2.4.13, niveau AAA) demande un indicateur au moins aussi grand qu’un contour de **2 px** autour du composant, avec un contraste d’au moins **3:1** entre l’état focalisé et l’état normal.

En pratique, 2 à 3 px légèrement décalés du composant (\`outline-offset\`) restent nets sans l’écraser ; au-delà, l’anneau commence à dominer le formulaire. Et on ne supprime jamais le focus (\`outline: none\`) sans le remplacer.`,
      takeaway: 'Un focus visible : un contour d’au moins 2 px, contrasté à 3:1, décalé du composant — jamais supprimé sans remplacement.',
      sources: [WCAG_FOCUS, WCAG_NON_TEXT, 'imp:polish'],
    },
  ],
};

export default polish;
