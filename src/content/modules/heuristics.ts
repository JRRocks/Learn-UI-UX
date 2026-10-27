import type { GridCriterion, ModuleContent, Visual } from '../../engine/types';

/** Échelle commune des grilles : le barème 0–4 d’impeccable (critique.md). */
const SCALE = { min: 0, max: 4, labels: ['0 — Absent', '1 — Rare', '2 — Partiel', '3 — Bon', '4 — Excellent'] };

const HEURISTICS = [
  'Visibilité de l’état du système',
  'Correspondance avec le monde réel',
  'Contrôle et liberté',
  'Cohérence et standards',
  'Prévention des erreurs',
  'Reconnaissance plutôt que rappel',
  'Flexibilité et efficacité',
  'Esthétique et minimalisme',
  'Reconnaître et corriger les erreurs',
  'Aide et documentation',
];

/** Une ligne de grille : heuristique n (1–10), note de l’expert, justification visible dans la maquette. */
const crit = (n: number, expert: number, why: string): GridCriterion => ({
  id: `h${n}`,
  label: `${n} · ${HEURISTICS[n - 1]}`,
  expert,
  why,
});

const BOOKING: Visual = {
  frame: 'browser',
  alt: 'Réservation de train, étape Passagers : indicateur d’étape et barre de progression, récapitulatif du trajet, bandeau d’erreur en haut du formulaire, champs du passager dont une date de naissance vide et une carte de réduction en code, promotion de location de voiture, bouton vert Ajouter un passager, boutons Réinitialiser et Continuer côte à côte, lien d’aide.',
  css: `.bk { max-width: 560px; margin: 0 auto; }
.bk-top { padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.bk-logo { font-weight: 800; color: #1f4fd8; letter-spacing: -0.01em; }
.bk-back, .bk-link, .bk-help { color: #1f4fd8; font-weight: 600; }
.bk-back { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; align-self: flex-start; }
.bk-bar { height: 6px; border-radius: 3px; background: #e3e6ec; overflow: hidden; }
.bk-bar span { display: block; width: 50%; height: 100%; background: #1f4fd8; }
.bk-trip { padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 10px; background: #f6f7f9; }
.bk-alert { padding: 8px 12px; border-radius: 8px; background: #fdecea; color: #8c1d18; font-weight: 600; font-size: 13px; }
.bk-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border: 1px solid #c7cedb; border-radius: 999px; font-size: 12px; font-weight: 600; }
.bk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; }
.bk-ph { color: #6b7280; }
.bk-help { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; }
.bk-promo { gap: 10px; padding: 10px 12px; border-radius: 10px; background: #fff4d6; color: #5c4400; font-size: 13px; }
.bk-add { align-self: flex-start; padding: 6px 14px; border-radius: 999px; background: #177245; color: #fff; font-size: 13px; font-weight: 500; }`,
  html: `<div class="bk">
  <div class="bk-top mk-row mk-between"><span class="bk-logo">Ligne Bleue</span><span class="mk-small mk-muted">Mon compte</span></div>
  <div class="mk-pad mk-stack" style="--gap:12px">
    <span class="bk-back"><i data-icon="arrow-left" style="--ico:14px"></i> Modifier le trajet</span>
    <div class="mk-stack" style="--gap:6px"><p class="mk-small mk-strong">Étape 2 sur 4 · Passagers</p><div class="bk-bar"><span></span></div></div>
    <div class="bk-trip mk-row"><i data-icon="train-front" style="--ico:20px"></i><div class="mk-grow"><p class="mk-strong">Lyon Part-Dieu → Marseille Saint-Charles</p><p class="mk-small mk-muted">Ven. 14 nov. · 08:04 → 09:46 · 1 adulte</p></div><span class="mk-price">38,00 €</span></div>
    <p class="bk-alert">Erreur V-102 : champ invalide.</p>
    <div class="mk-row mk-between mk-wrap" style="--gap:8px"><p class="mk-h3">Passager 1</p><span class="bk-chip"><i data-icon="user" style="--ico:13px"></i> Remplir avec : Jules D.</span></div>
    <div class="bk-grid">
      <div class="mk-field"><span class="mk-label">Prénom</span><div class="mk-input">Camille</div></div>
      <div class="mk-field"><span class="mk-label">Nom</span><div class="mk-input">Durand</div></div>
      <div class="mk-field"><span class="mk-label">Date de naissance</span><div class="mk-input bk-ph">JJ/MM/AAAA</div></div>
      <div class="mk-field"><span class="mk-label">Carte de réduction</span><div class="mk-input" style="display:flex;align-items:center;justify-content:space-between;gap:8px">CR-AV <i data-icon="chevron-down" style="--ico:14px"></i></div><span class="bk-help"><i data-icon="info" style="--ico:12px"></i> Quelle carte choisir ?</span></div>
    </div>
    <div class="bk-promo mk-row"><i data-icon="car" style="--ico:18px"></i><span class="mk-grow">Location de voiture : −20 % à l’arrivée !</span><span class="mk-strong">Découvrir</span></div>
    <span class="bk-add">+ Ajouter un passager</span>
    <div class="mk-row" style="--gap:8px"><span class="mk-btn">Réinitialiser</span><span class="mk-btn">Continuer</span></div>
    <div class="mk-divider"></div>
    <p class="mk-small"><span class="bk-link">Aide et FAQ</span></p>
  </div>
</div>`,
};

const DASHBOARD: Visual = {
  frame: 'browser',
  alt: 'Tableau de bord d’un logiciel de facturation : recherche avec raccourci clavier, lien Aide, onglets, heure de synchronisation, bandeau « Échec de la synchro (BNK_401) », promotion pour l’offre Pro, quatre tuiles chiffrées avec mini-courbes, vues enregistrées, barre d’actions groupées Relancer, Exporter et Supprimer, tableau de trois factures et notification « Relance envoyée à 2 clients » avec Annuler.',
  css: `.fa { container: fa / inline-size; }
.fa-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.fa-logo { font-weight: 800; letter-spacing: -0.01em; }
.fa-search { flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid #8b92a1; border-radius: 8px; color: #5a6172; font-size: 13px; }
.fa-ph { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
kbd { font: 600 11px/1 ui-monospace, Menlo, monospace; padding: 3px 5px; border: 1px solid #c7cedb; border-bottom-width: 2px; border-radius: 4px; color: #36405a; background: #fff; }
.fa-kbd { background: transparent; color: #fff; border-color: rgb(255 255 255 / 0.6); }
.fa-help { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; color: #1f4fd8; }
.fa-nav { padding: 0 12px; flex-wrap: wrap; }
.fa-nav .mk-tab { white-space: nowrap; }
.fa-alert { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; background: #fdecea; color: #8c1d18; font-size: 13px; font-weight: 600; }
.fa-promo { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #efeafd; color: #3b2a7a; font-size: 13px; }
.fa-kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(112px, 1fr)); gap: 8px; }
.fa-kpi { display: flex; flex-direction: column; gap: 2px; padding: 10px; border: 1px solid #e1e4ea; border-radius: 10px; }
.fa-kpi .mk-ico { color: #1f4fd8; }
.fa-num { font-size: 17px; font-weight: 700; font-variant-numeric: tabular-nums; }
.fa-spark { width: 100%; height: 16px; margin-top: 4px; }
.fa-spark polyline { fill: none; stroke: #8aa4ec; stroke-width: 1.5; }
.fa-views { display: flex; flex-wrap: wrap; gap: 6px; }
.fa-view { padding: 4px 10px; border-radius: 999px; border: 1px solid #c7cedb; font-size: 12px; font-weight: 600; color: #36405a; }
.fa-view--on { background: #1d2230; border-color: #1d2230; color: #fff; }
.fa-view--add { border-style: dashed; color: #1f4fd8; }
.fa-bulk { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; background: #eef3ff; font-size: 13px; }
.fa-table { display: flex; flex-direction: column; font-size: 13px; }
.fa-tr { display: grid; grid-template-columns: 20px 44px minmax(0, 1.3fr) 86px 88px 80px; gap: 8px; align-items: center; padding: 9px 4px; border-bottom: 1px solid #eceef2; }
.fa-th { font-size: 12px; font-weight: 600; color: #5a6172; }
.fa-r { text-align: end; font-variant-numeric: tabular-nums; }
.fa-st { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.fa-st--late { background: #fdecea; color: #8c1d18; }
.fa-st--paid { background: #e6f4ea; color: #1e5e33; }
.fa-toast { align-self: flex-start; font-size: 13px; }
.fa-undo { font-weight: 700; color: #9db4ff; }
@container fa (max-width: 470px) {
  .fa-search { order: 3; flex-basis: 100%; }
  .fa-th { display: none; }
  .fa-tr { grid-template-columns: 20px minmax(0, 1fr) auto; grid-template-areas: "k c s" "k d a"; row-gap: 2px; }
  .c-num { display: none; }
  .c-chk { grid-area: k; } .c-cli { grid-area: c; } .c-due { grid-area: d; color: #5a6172; } .c-amt { grid-area: a; } .c-st { grid-area: s; }
}`,
  html: `<div class="fa">
  <div class="fa-top">
    <span class="fa-logo">Facturo</span>
    <div class="fa-search"><i data-icon="search" style="--ico:15px"></i><span class="fa-ph">Rechercher une facture, un client…</span><kbd>/</kbd></div>
    <span class="fa-help"><i data-icon="info" style="--ico:15px"></i> Aide</span>
  </div>
  <div class="mk-tabs fa-nav"><span class="mk-tab mk-tab--on">Tableau de bord</span><span class="mk-tab">Factures</span><span class="mk-tab">Clients</span><span class="mk-tab">Dépenses</span></div>
  <div class="mk-pad mk-stack" style="--gap:12px">
    <div class="mk-row mk-between mk-wrap" style="--gap:8px">
      <div><p class="mk-h2">Tableau de bord</p><p class="mk-small mk-muted">Synchronisé avec la banque il y a 3 min</p></div>
      <span class="mk-btn mk-btn--s">Nouvelle facture <kbd class="fa-kbd">N</kbd></span>
    </div>
    <p class="fa-alert"><i data-icon="circle-alert" style="--ico:15px"></i> Échec de la synchro (BNK_401).</p>
    <div class="fa-promo"><i data-icon="sparkles" style="--ico:16px"></i><span class="mk-grow">Passez à Facturo Pro : −30 % ce mois-ci</span><span class="mk-strong">Découvrir</span></div>
    <div class="fa-kpis">
      <div class="fa-kpi"><span class="mk-small mk-muted">CA de novembre <i data-icon="info" style="--ico:12px"></i></span><span class="fa-num">12 480 €</span><svg class="fa-spark" viewBox="0 0 60 16" preserveAspectRatio="none"><polyline points="0,13 10,10 20,11 30,6 40,8 50,4 60,5"/></svg></div>
      <div class="fa-kpi"><span class="mk-small mk-muted">En attente</span><span class="fa-num">3 920 €</span><svg class="fa-spark" viewBox="0 0 60 16" preserveAspectRatio="none"><polyline points="0,6 10,8 20,5 30,9 40,7 50,10 60,8"/></svg></div>
      <div class="fa-kpi"><span class="mk-small mk-muted">En retard</span><span class="fa-num">2 440 €</span><svg class="fa-spark" viewBox="0 0 60 16" preserveAspectRatio="none"><polyline points="0,12 10,12 20,9 30,10 40,6 50,7 60,4"/></svg></div>
      <div class="fa-kpi"><span class="mk-small mk-muted">Panier moyen</span><span class="fa-num">640 €</span><svg class="fa-spark" viewBox="0 0 60 16" preserveAspectRatio="none"><polyline points="0,8 10,6 20,9 30,7 40,8 50,6 60,7"/></svg></div>
    </div>
    <div class="fa-views"><span class="fa-view fa-view--on">Toutes</span><span class="fa-view">En retard</span><span class="fa-view">À relancer</span><span class="fa-view fa-view--add">+ Nouvelle vue</span></div>
    <div class="fa-bulk"><span class="mk-strong">2 sélectionnées</span><span class="mk-btn mk-btn--ghost mk-btn--s">Relancer</span><span class="mk-btn mk-btn--ghost mk-btn--s">Exporter</span><span class="mk-btn mk-btn--ghost mk-btn--s">Supprimer</span></div>
    <div class="fa-table">
      <div class="fa-tr fa-th"><span></span><span>N°</span><span>Client</span><span>Échéance</span><span class="fa-r">Montant</span><span>Statut</span></div>
      <div class="fa-tr"><span class="c-chk mk-check mk-check--on"></span><span class="c-num">F-118</span><span class="c-cli">Atelier Brune</span><span class="c-due">12/11/2026</span><span class="c-amt fa-r">1 480,00 €</span><span class="c-st"><span class="fa-st fa-st--late">En retard</span></span></div>
      <div class="fa-tr"><span class="c-chk mk-check mk-check--on"></span><span class="c-num">F-121</span><span class="c-cli">Studio Halo</span><span class="c-due">2026-11-15</span><span class="c-amt fa-r">960,00 €</span><span class="c-st"><span class="fa-st fa-st--late">En retard</span></span></div>
      <div class="fa-tr"><span class="c-chk mk-check"></span><span class="c-num">F-109</span><span class="c-cli">Maison Ota</span><span class="c-due">02/11/2026</span><span class="c-amt fa-r">2 300,00 €</span><span class="c-st"><span class="fa-st fa-st--paid">Payée</span></span></div>
    </div>
    <div class="mk-toast fa-toast"><i data-icon="circle-check" style="--ico:16px"></i><span class="mk-grow">Relance envoyée à 2 clients</span><span class="fa-undo">Annuler</span></div>
  </div>
</div>`,
};

const heuristics: ModuleContent = {
  id: 'heuristics',
  title: 'Heuristiques de Nielsen et sévérité',
  category: 'evaluer',
  summary:
    'Inspecter un écran avec les dix heuristiques de Nielsen, le noter de 0 à 4 sans complaisance, lire le total en bandes et classer chaque problème de P0 à P3.',
  minutes: 11,
  commands: ['critique'],
  sources: ['imp:critique', 'nng:heuristics', 'nng:severity', { label: 'Nielsen Norman Group — How to Conduct a Heuristic Evaluation', url: 'https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/' }],
  sections: [
    {
      id: 'dix-heuristiques',
      title: 'Dix heuristiques, un vocabulaire commun',
      body: `Une **heuristique** est une règle empirique : pas une loi, mais un principe qui aide à repérer vite ce qui cloche. Les dix heuristiques de Jakob Nielsen, formulées avec Rolf Molich en 1990 puis affinées en 1994 à partir de l’analyse de 249 problèmes d’utilisabilité, restent la grille d’inspection la plus utilisée.

1. **Visibilité de l’état du système** : l’interface dit ce qui se passe, au bon moment.
2. **Correspondance avec le monde réel** : les mots, les concepts et l’ordre sont ceux de l’utilisateur.
3. **Contrôle et liberté** : une sortie de secours clairement signalée, sans parcours du combattant.
4. **Cohérence et standards** : un même mot, une même action, partout ; les conventions de la plateforme sont respectées.
5. **Prévention des erreurs** : mieux qu’un bon message d’erreur, une conception qui empêche l’erreur.
6. **Reconnaissance plutôt que rappel** : les options sont visibles, rien à mémoriser d’un écran à l’autre.
7. **Flexibilité et efficacité** : des accélérateurs, invisibles pour le novice, qui font gagner du temps aux habitués.
8. **Esthétique et minimalisme** : aucune information hors de propos ne dilue l’essentiel.
9. **Aider à reconnaître, diagnostiquer et corriger les erreurs** : en langage clair, précisément, avec une solution.
10. **Aide et documentation** : facile à trouver, centrée sur la tâche, concise.

Une **évaluation heuristique** est une inspection par des experts, pas un test utilisateur : elle trouve vite beaucoup de problèmes, mais ne remplace pas l’observation de vraies personnes.`,
    },
    {
      id: 'que-verifier',
      title: 'Ce qu’on vérifie, heuristique par heuristique',
      body: `Le guide de notation d’impeccable donne, pour chaque heuristique, une liste de points à contrôler :

- **1 · État du système** : indicateurs de chargement, confirmation des actions (enregistrer, envoyer, supprimer), progression d’un parcours en plusieurs étapes, position dans la navigation, validation des champs en ligne et pas seulement à l’envoi.
- **2 · Monde réel** : vocabulaire familier, ordre logique pour l’utilisateur, icônes et métaphores reconnaissables.
- **3 · Contrôle** : annuler et rétablir, bouton Annuler dans les formulaires et les fenêtres, retour vers un lieu sûr, filtres et sélections faciles à effacer, sortie d’un long parcours.
- **4 · Cohérence** : même terminologie, mêmes actions qui produisent les mêmes résultats, conventions de la plateforme, composants visuellement homogènes.
- **5 · Prévention** : confirmation avant une action destructrice, contraintes (sélecteur de date, liste de choix), valeurs par défaut sûres, libellés sans ambiguïté, enregistrement automatique.
- **6 · Reconnaissance** : options visibles plutôt qu’enfouies, aide contextuelle, autocomplétion, libellés sur les icônes.
- **7 · Flexibilité** : raccourcis clavier, personnalisation, favoris, actions groupées.
- **8 · Minimalisme** : seulement l’information utile à l’étape, hiérarchie nette, couleur et emphase employées avec intention.
- **9 · Erreurs** : langage clair plutôt qu’un code, problème précis (« il manque le @ »), piste de correction, message près du champ, saisie préservée.
- **10 · Aide** : aide cherchable, contextuelle, organisée par tâche, consultable sans quitter l’écran.`,
      examples: [
        {
          title: 'Dire ce qui se passe (heuristique 1)',
          bad: {
            alt: 'Fenêtre d’import de contacts avec un cercle de chargement et le texte « Veuillez patienter… ».',
            css: `.ld-spin { width: 34px; height: 34px; border-radius: 50%; border: 4px solid #e3e6ec; border-top-color: #1f4fd8; margin: 0 auto; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h3">Importer des contacts</p><div class="mk-stack mk-center" style="--gap:10px;padding:14px 0"><div class="ld-spin"></div><p class="mk-muted">Veuillez patienter…</p></div></div>`,
          },
          badNote: 'Combien de temps ? Est-ce bloqué ? Peut-on arrêter ? L’écran ne répond à aucune de ces questions.',
          good: {
            alt: 'Même fenêtre avec le nombre de contacts importés, une barre de progression à 62 %, le temps restant et un bouton Annuler.',
            css: `.ld-bar { height: 8px; border-radius: 4px; background: #e3e6ec; overflow: hidden; } .ld-bar span { display: block; width: 62%; height: 100%; background: #1f4fd8; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h3">Importer des contacts</p><p>Import de <b>1 240 contacts</b> depuis « clients-2026.csv »</p><div class="ld-bar"><span></span></div><div class="mk-row mk-between"><span class="mk-small mk-muted">62 % · environ 20 s restantes</span><span class="mk-btn mk-btn--ghost mk-btn--s">Annuler</span></div></div>`,
          },
          goodNote: 'Ce qui se passe, où on en est, combien de temps encore, et une sortie.',
        },
        {
          title: 'Un message d’erreur qui répare (heuristique 9)',
          bad: {
            alt: 'Formulaire d’inscription avec un bandeau « Saisie invalide. » au-dessus des champs, sans indiquer lequel, et un mot de passe vidé.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-error" style="padding:8px 10px;border-radius:6px;background:#fdecea">Saisie invalide.</p><div class="mk-field"><span class="mk-label">Adresse e-mail</span><div class="mk-input">camille.durand.exemple.fr</div></div><div class="mk-field"><span class="mk-label">Mot de passe</span><div class="mk-input"></div></div><span class="mk-btn" style="align-self:flex-start">Créer mon compte</span></div>`,
          },
          badNote: 'Quel champ ? Quelle erreur ? Quelle correction ? Et le mot de passe a été effacé : tout est à refaire.',
          good: {
            alt: 'Même formulaire : le champ e-mail est encadré en rouge et un message dessous explique qu’il manque le @, avec un exemple.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><div class="mk-field"><span class="mk-label">Adresse e-mail</span><div class="mk-input mk-input--error">camille.durand.exemple.fr</div><p class="mk-error">Il manque le « @ ». Exemple : camille.durand@exemple.fr</p></div><div class="mk-field"><span class="mk-label">Mot de passe</span><div class="mk-input">••••••••••</div></div><span class="mk-btn" style="align-self:flex-start">Créer mon compte</span></div>`,
          },
          goodNote: 'Le problème précis, à côté du champ, avec la correction — et le mot de passe n’est pas effacé.',
        },
      ],
    },
    {
      id: 'noter',
      title: 'Noter de 0 à 4, honnêtement',
      body: `Chaque heuristique reçoit une note de **0 à 4**, sur le même barème :

- **0 — absent** : l’utilisateur devine, se perd ou reste coincé.
- **1 — rare** : quelques cas couverts, la plupart non.
- **2 — partiel** : le parcours principal tient, de vrais manques demeurent.
- **3 — bon** : presque tout est couvert, manques mineurs.
- **4 — excellent** : vraiment excellent, pas seulement « assez bien ».

Le total sur **40** se lit en bandes : **36–40** excellent (finitions seulement), **28–35** bon (des points faibles à reprendre), **20–27** acceptable (des améliorations importantes avant que les gens soient satisfaits), **12–19** faible (refonte majeure de l’expérience), **0–11** critique (inutilisable en l’état). Sois honnête : la plupart des interfaces réelles obtiennent **entre 20 et 32**.

### Quand une heuristique ne s’applique pas

Sur une surface **Persuader** ou **Expérience** (page d’accueil, campagne, portfolio), les heuristiques 7 (flexibilité) et 10 (aide) peuvent être notées **n/a**, avec une ligne de justification ; de même pour toute heuristique qui ne peut réellement pas s’appliquer. Le maximum devient 4 × le nombre d’heuristiques notées — **32** pour deux n/a — et la bande se lit en pourcentage : 90 % et plus excellent, 70 % bon, 50 % acceptable, 30 % faible, en dessous critique. Ainsi 24/32 = 75 % : bon. N’affiche jamais « /40 » sur un ensemble partiel.`,
    },
    {
      id: 'severite',
      title: 'Sévérité : du bloquant à la finition',
      body: `La note d’une heuristique dit **où** l’interface est faible ; la **sévérité** dit **quoi corriger d’abord**. Chaque problème relevé reçoit une priorité :

- **P0 — bloquant** : empêche de terminer la tâche. À corriger immédiatement.
- **P1 — majeur** : difficulté ou confusion importante. À corriger avant la mise en production.
- **P2 — mineur** : agaçant, mais un contournement existe. Au prochain passage.
- **P3 — finition** : sans impact réel sur l’usage. Si le temps le permet.

Tu hésites entre deux niveaux ? Demande-toi : **un utilisateur contacterait-il le support pour ça ?** Si oui, c’est au moins P1.

Le Nielsen Norman Group fonde la sévérité sur trois facteurs : la **fréquence** (combien de gens le rencontrent), l’**impact** (est-ce difficile à surmonter ?) et la **persistance** (une fois, ou à chaque passage ?), plus l’effet sur l’adoption du produit. Il recommande de faire noter la sévérité par plusieurs évaluateurs, chacun de son côté : la note d’un seul n’est pas fiable.

> Ne confonds pas les deux échelles : une heuristique notée 4 est excellente, un problème P0 est le pire de tous.`,
    },
    {
      id: 'mener',
      title: 'Mener l’évaluation',
      body: `- **Plusieurs regards indépendants** : chaque évaluateur inspecte seul, sans voir les notes des autres, puis on consolide. NN/g recommande trois à cinq personnes, environ une à deux heures chacune.
- **Deux passages** : un premier pour comprendre le parcours, un second pour l’inspecter élément par élément.
- **Être précis** : « le bouton Payer », pas « certains éléments ». Dis ce qui ne va pas *et* pourquoi ça gêne, puis propose un correctif concret.
- **Prioriser sans pitié** : trois à cinq problèmes majeurs, classés. Si tout est important, rien ne l’est.
- **Ne pas se laisser ancrer** : impeccable mène la revue de design *avant* de lire les résultats de son détecteur automatique, pour que ceux-ci n’orientent pas le jugement.

Chaque problème retenu suit le même gabarit : **[P?] quoi**, **pourquoi ça compte**, **correctif**, **commande suggérée** — \`clarify\` pour un message flou, \`layout\` pour une hiérarchie confuse, \`adapt\` pour un écran qui casse sur mobile…`,
      examples: [
        {
          title: 'Un constat qu’on peut corriger',
          bad: {
            alt: 'Note de revue : « L’interface pourrait être plus claire et plus moderne. Peut-être revoir les couleurs ? »',
            css: `.nt { padding: 14px; border: 1px solid #e1e4ea; border-radius: 10px; }`,
            html: `<div class="mk-pad"><div class="nt mk-stack" style="--gap:6px"><p class="mk-small mk-muted">Remarque</p><p>L’interface pourrait être plus claire et plus moderne. Peut-être revoir les couleurs ?</p></div></div>`,
          },
          badNote: 'Vague, sans priorité ni piste : personne ne sait quoi faire lundi matin.',
          good: {
            alt: 'Note de revue avec une étiquette P1, le problème précis du bouton Payer hors écran sur mobile, la raison, le correctif et la commande adapt.',
            css: `.nt { padding: 14px; border: 1px solid #e1e4ea; border-radius: 10px; } .nt-p { display: inline-block; padding: 1px 7px; border-radius: 6px; background: #8c1d18; color: #fff; font-size: 12px; font-weight: 700; margin-inline-end: 6px; } code { font: 600 12px ui-monospace, Menlo, monospace; background: #eef1f7; padding: 1px 5px; border-radius: 4px; }`,
            html: `<div class="mk-pad"><div class="nt mk-stack" style="--gap:6px"><p class="mk-strong"><span class="nt-p">P1</span>Le bouton « Payer » sort de l’écran sur mobile</p><p class="mk-small"><b>Pourquoi :</b> sur un écran de 375 px, il faut défiler sous le récapitulatif pour trouver l’action principale.</p><p class="mk-small"><b>Correctif :</b> une barre fixe dans le bas de l’écran avec le total et « Payer ».</p><p class="mk-small"><b>Commande :</b> <code>adapt</code></p></div></div>`,
          },
          goodNote: 'Sévérité, élément nommé, impact, correctif, commande : actionnable tout de suite.',
        },
      ],
    },
  ],
  rules: [
    { id: 'h1', front: 'Que vérifie l’heuristique 1, visibilité de l’état du système ?', back: 'Que l’interface dise toujours ce qui se passe : chargements, confirmations, progression, position dans la navigation, validation en ligne.' },
    { id: 'h3-h5', front: 'Contrôle et liberté (3) ou prévention des erreurs (5) : quelle différence ?', back: 'La 3 offre une sortie et l’annulation après coup ; la 5 empêche l’erreur avant qu’elle n’arrive (contraintes, confirmations, valeurs par défaut sûres).' },
    { id: 'h6', front: 'Reconnaissance plutôt que rappel : un exemple ?', back: 'Afficher le récapitulatif de la commande à l’étape 3 au lieu de redemander un numéro vu à l’étape 1 ; des libellés sous les icônes.' },
    { id: 'h9', front: 'Que contient un bon message d’erreur (heuristique 9) ?', back: 'Le problème en langage clair, précisément situé, et une piste de correction — sans effacer ce que la personne a saisi.' },
    { id: 'scale', front: 'Que vaut un 4 sur le barème 0–4 ?', back: 'Vraiment excellent, pas « assez bien ». Un écran correct mais imparfait vit entre 2 et 3.' },
    { id: 'bands', front: 'Comment lire un total sur 40 ?', back: '36–40 excellent, 28–35 bon, 20–27 acceptable, 12–19 faible, 0–11 critique.' },
    { id: 'typical', front: 'Quel score obtiennent la plupart des interfaces réelles ?', back: 'Entre 20 et 32 sur 40.' },
    { id: 'na', front: 'Quand noter une heuristique « n/a », et comment calculer ?', back: 'Les heuristiques 7 et 10 sur une surface Persuader ou Expérience. Le maximum devient 4 × le nombre d’heuristiques notées et la bande se lit en pourcentage (90/70/50/30).' },
    { id: 'priorities', front: 'Que signifient P0, P1, P2, P3 ?', back: 'P0 bloque la tâche, P1 gêne fortement (à corriger avant la sortie), P2 agace mais se contourne, P3 relève de la finition.' },
    { id: 'support', front: 'Tu hésites entre deux sévérités : quelle question te poser ?', back: '« Un utilisateur contacterait-il le support pour ça ? » Si oui, c’est au moins P1.' },
    { id: 'severity-factors', front: 'Sur quels facteurs NN/g fonde-t-il la sévérité d’un problème ?', back: 'Sa fréquence, son impact et sa persistance, plus son effet sur l’adoption du produit.' },
    { id: 'evaluators', front: 'Combien d’évaluateurs pour une évaluation heuristique ?', back: 'Trois à cinq, chacun seul et sans voir les notes des autres, puis une mise en commun.' },
  ],
  exercises: [
    {
      id: 'heuristics-grid-booking',
      type: 'grid',
      difficulty: 2,
      prompt: 'Note cet écran sur les dix heuristiques de Nielsen.',
      context: 'Étape « Passagers » d’un site de réservation de train, sur ordinateur. La voyageuse vient de cliquer sur Continuer sans renseigner sa date de naissance.',
      visual: BOOKING,
      scale: SCALE,
      criteria: [
        crit(1, 3, 'L’étape « 2 sur 4 », la barre de progression et le récapitulatif du trajet disent où l’on en est. Manque : l’erreur n’apparaît qu’après l’envoi, sans désigner le champ.'),
        crit(2, 2, 'Les libellés sont clairs (Prénom, Date de naissance), mais la carte de réduction s’affiche en code interne : « CR-AV ».'),
        crit(3, 2, 'Le lien « Modifier le trajet » permet de revenir en arrière, mais « Réinitialiser » efface tout sans annulation possible.'),
        crit(4, 2, '« Ajouter un passager » est une pastille verte qui ne ressemble à aucun autre bouton, et « Réinitialiser » emprunte l’apparence de l’action principale.'),
        crit(5, 1, '« Réinitialiser » est collé à « Continuer », avec le même poids : le clic de travers est garanti. La date se tape librement, sans sélecteur ni contrôle en ligne.'),
        crit(6, 3, 'Le trajet reste visible pendant la saisie et un passager enregistré se choisit d’un clic : presque rien à retenir.'),
        crit(7, 2, 'Un seul accélérateur visible : le remplissage avec un passager enregistré.'),
        crit(8, 2, 'Le formulaire est lisible, mais la promotion de location de voiture s’insère au milieu de la saisie.'),
        crit(9, 1, '« Erreur V-102 : champ invalide » : un code, aucun champ désigné, aucune piste de correction.'),
        crit(10, 3, 'Une aide contextuelle « Quelle carte choisir ? » à côté du champ, plus un lien vers l’aide et la FAQ.'),
      ],
      explanation: `Total de l’expert : **21/40**, dans la bande **acceptable** (20–27). Le parcours fonctionne, mais il faut des améliorations importantes avant que les voyageurs soient satisfaits.

Les deux notes à 1 désignent les priorités :

- **Heuristique 9** : le message doit nommer le champ et la correction, à côté du champ — « Indiquez votre date de naissance, par exemple 14/03/1990 ».
- **Heuristique 5** : « Réinitialiser » n’a rien à faire à côté de « Continuer » ; au mieux un lien discret, éloigné de l’action principale.

Chaque note s’appuie sur un élément visible. Un 4 se mérite : rien ici n’est irréprochable, et la plupart des écrans réels vivent entre 2 et 3.`,
      takeaway: 'Note chaque heuristique sur des éléments visibles : les notes de 0 ou 1 désignent les priorités, et le total se lit en bandes (20–27 : acceptable).',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'heuristics-grid-dashboard',
      type: 'grid',
      difficulty: 3,
      prompt: 'Note ce tableau de bord sur les dix heuristiques de Nielsen.',
      context: 'Logiciel de facturation pour indépendants, ouvert chaque jour. L’utilisatrice vient de relancer deux clients en retard de paiement.',
      visual: DASHBOARD,
      scale: SCALE,
      criteria: [
        crit(1, 4, 'Onglet actif, heure de la dernière synchronisation, compteur « 2 sélectionnées » et confirmation « Relance envoyée à 2 clients » : chaque état et chaque action se voient.'),
        crit(2, 3, 'Le vocabulaire est celui d’une indépendante (Relancer, En retard, CA) ; seul le code « BNK_401 » sort de son langage.'),
        crit(3, 3, 'La relance s’annule depuis la notification et les vues changent d’un clic ; rien n’indique en revanche comment sortir de l’échec de synchronisation.'),
        crit(4, 3, 'Composants homogènes, mais les échéances mélangent deux formats de date (12/11/2026 et 2026-11-15) : une déviation ponctuelle.'),
        crit(5, 2, '« Supprimer » est collé à « Relancer » et « Exporter », dans le même style, sur une sélection multiple : une erreur coûteuse reste facile à commettre.'),
        crit(6, 4, 'Navigation libellée, recherche qui annonce ce qu’elle trouve, raccourcis affichés à côté des actions : rien à mémoriser.'),
        crit(7, 4, 'Raccourcis « / » et « N », actions groupées, vues enregistrées et « + Nouvelle vue » : les habituées vont vite sans gêner les novices.'),
        crit(8, 2, 'La liste des factures est claire, mais la promotion Pro et quatre tuiles à mini-courbes décoratives se disputent l’attention.'),
        crit(9, 1, '« Échec de la synchro (BNK_401) » : ni cause compréhensible, ni marche à suivre pour reconnecter la banque.'),
        crit(10, 3, 'L’aide reste accessible en permanence et une infobulle explique le CA ; rien ne montre si l’aide est organisée par tâche.'),
      ],
      explanation: `Total de l’expert : **29/40**, bande **bon** (28–35) : une base solide, avec des points faibles à reprendre.

Les trois 4 sont mérités parce qu’on les **voit** : l’état est toujours affiché, les raccourcis sont écrits à côté des actions, les vues se personnalisent. Une seule déviation (le format de date) suffit en revanche à refuser le 4 en cohérence.

Mais un bon total peut cacher un 1. L’échec de synchronisation bancaire, annoncé par un code sans cause ni solution, est le premier chantier : les utilisatrices écriront au support, c’est donc au moins un **P1**. Un message utile dirait : « Ta banque demande une nouvelle autorisation. Reconnecter le compte ».`,
      takeaway: 'Un 4 se prouve par des éléments visibles ; un bon total n’excuse pas une note de 1 sur une erreur qui enverra les gens au support.',
      sources: ['imp:critique', 'nng:heuristics', 'nng:severity'],
    },
    {
      id: 'heuristics-checkout-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les trois violations d’heuristiques sur cette page de paiement.',
      visual: {
        frame: 'browser',
        alt: 'Page de paiement : lien de retour au panier, un sac à dos à 89 €, trois options de livraison nommées STD-48, EXP-24 et PR-REL, champ de carte avec le message « Erreur 0x80041002 », total de 93,90 €, boutons « Vider le panier » et « Payer 93,90 € » côte à côte et de même style.',
        css: `.ck { max-width: 520px; margin: 0 auto; }
.ck-line { padding: 10px; border: 1px solid #e1e4ea; border-radius: 10px; }
.ck-opt { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border: 1px solid #c7cedb; border-radius: 8px; }
.ck-opt::before { content: ""; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #8b92a1; flex: none; }
.ck-opt--on { border-color: #1f4fd8; box-shadow: inset 0 0 0 1px #1f4fd8; }
.ck-opt--on::before { border: 5px solid #1f4fd8; }
.ck-back { display: inline-flex; align-items: center; gap: 4px; color: #1f4fd8; font-weight: 600; font-size: 13px; align-self: flex-start; }`,
        html: `<div class="ck mk-pad mk-stack" style="--gap:12px">
  <span class="ck-back" data-hotspot="back"><i data-icon="arrow-left" style="--ico:14px"></i> Retour au panier</span>
  <p class="mk-h2">Paiement</p>
  <div class="ck-line mk-row" data-hotspot="line"><div class="mk-img" style="--ratio:1;width:48px"></div><div class="mk-grow"><p class="mk-strong">Sac à dos Alto 28 L</p><p class="mk-small mk-muted">Gris ardoise · Qté 1</p></div><span class="mk-price">89,00 €</span></div>
  <div class="mk-stack" style="--gap:6px" data-hotspot="ship"><p class="mk-label">Livraison</p><div class="ck-opt ck-opt--on"><span class="mk-grow">STD-48</span><span class="mk-price">4,90 €</span></div><div class="ck-opt"><span class="mk-grow">EXP-24</span><span class="mk-price">9,90 €</span></div><div class="ck-opt"><span class="mk-grow">PR-REL</span><span class="mk-price">3,50 €</span></div></div>
  <div class="mk-field" data-hotspot="card"><span class="mk-label">Numéro de carte</span><div class="mk-input mk-input--error">4970 1012 3456</div><p class="mk-error">Erreur 0x80041002</p></div>
  <div class="mk-row mk-between" data-hotspot="total"><span class="mk-strong">Total</span><span class="mk-price" style="font-size:18px">93,90 €</span></div>
  <div class="mk-row" style="--gap:8px"><span class="mk-btn" data-hotspot="empty">Vider le panier</span><span class="mk-btn" data-hotspot="pay">Payer 93,90 €</span></div>
</div>`,
      },
      hotspots: [
        { id: 'ship', label: 'Options de livraison en codes', correct: true, why: 'Heuristique 2 : « STD-48 », « EXP-24 », « PR-REL » sont des codes internes. Le client veut lire « Standard, 48 h », « Express, 24 h », « Point relais ».' },
        { id: 'card', label: 'Erreur « 0x80041002 »', correct: true, why: 'Heuristique 9 : un code hexadécimal ne dit ni le problème ni la solution. Ici : « Le numéro est incomplet : il manque 4 chiffres. »' },
        { id: 'empty', label: '« Vider le panier » collé à « Payer »', correct: true, why: 'Heuristique 5 : une action destructrice, au même poids que l’action principale et juste à côté. Un clic de travers efface le panier.' },
        { id: 'back', label: 'Lien de retour au panier', correct: false, why: 'C’est au contraire une bonne sortie de secours (heuristique 3).' },
        { id: 'line', label: 'Récapitulatif de l’article', correct: false, why: 'Le produit, sa variante et son prix restent visibles pendant le paiement : rien à mémoriser.' },
        { id: 'total', label: 'Total', correct: false, why: 'Le total est clair et cohérent : 89,00 € + 4,90 € de livraison.' },
        { id: 'pay', label: 'Bouton « Payer 93,90 € »', correct: false, why: 'Le bouton principal nomme l’action et le montant : rien à redire.' },
      ],
      explanation: `Trois heuristiques différentes sont violées sur le même écran :

- **2 · Monde réel** : le vocabulaire interne de la logistique fuit dans l’interface.
- **9 · Erreurs** : un code technique remplace le diagnostic et la solution.
- **5 · Prévention** : l’action destructrice est placée et stylée comme l’action principale.

Sur une page de paiement, chacune coûte des ventes. L’erreur de carte, qui empêche de comprendre comment payer, est la plus grave.`,
      takeaway: 'Inspecte chaque élément avec les dix heuristiques en tête : jargon, message cryptique et action destructrice mal placée cohabitent souvent sur un même écran.',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'heuristics-consistency-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les deux violations de l’heuristique 4, cohérence et standards.',
      visual: {
        frame: 'browser',
        alt: 'Page de paramètres du compte : un bandeau « Erreur 0x2F », une section Profil avec un bouton bleu Enregistrer, une section Centres d’intérêt « plusieurs choix possibles » dont deux options rondes sont cochées, une section Notifications avec deux interrupteurs et un bouton vert arrondi « Sauvegarder les préférences », et un lien rouge Supprimer mon compte.',
        css: `.st { max-width: 540px; margin: 0 auto; }
.st-alert { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; background: #fdecea; color: #8c1d18; font-size: 13px; font-weight: 600; }
.st-opts { display: flex; flex-wrap: wrap; gap: 8px 16px; }
.st-radio { display: inline-flex; align-items: center; gap: 8px; }
.st-radio::before { content: ""; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #8b92a1; flex: none; }
.st-radio--on::before { border: 5px solid #1f4fd8; }
.st-save2 { align-self: flex-start; padding: 8px 18px; border-radius: 999px; background: #177245; color: #fff; font-size: 13px; font-weight: 500; }
.st-delete { align-self: flex-start; color: #b3261e; font-weight: 600; font-size: 13px; }`,
        html: `<div class="st mk-pad mk-stack" style="--gap:14px">
  <p class="mk-h2">Paramètres du compte</p>
  <p class="st-alert" data-hotspot="error"><i data-icon="circle-alert" style="--ico:15px"></i> Erreur 0x2F</p>
  <div class="mk-stack" style="--gap:10px"><p class="mk-h3">Profil</p><div class="mk-grid" style="--cols:2;--gap:10px"><div class="mk-field"><span class="mk-label">Nom</span><div class="mk-input">Inès Barbier</div></div><div class="mk-field"><span class="mk-label">Courriel</span><div class="mk-input">ines.b@exemple.fr</div></div></div><span class="mk-btn" style="align-self:flex-start" data-hotspot="save1">Enregistrer</span></div>
  <div class="mk-divider"></div>
  <div class="mk-stack" style="--gap:8px" data-hotspot="interests"><p class="mk-h3">Centres d’intérêt</p><p class="mk-help">Plusieurs choix possibles</p><div class="st-opts"><span class="st-radio st-radio--on">Randonnée</span><span class="st-radio">Escalade</span><span class="st-radio st-radio--on">Trail</span><span class="st-radio">Vélo</span></div></div>
  <div class="mk-divider"></div>
  <div class="mk-stack" style="--gap:10px"><p class="mk-h3">Notifications</p><div class="mk-row mk-between"><span>Lettre hebdomadaire</span><span class="mk-toggle mk-toggle--on"></span></div><div class="mk-row mk-between"><span>Alertes de prix</span><span class="mk-toggle"></span></div><span class="st-save2" data-hotspot="save2">Sauvegarder les préférences</span></div>
  <div class="mk-divider"></div>
  <span class="st-delete" data-hotspot="delete">Supprimer mon compte</span>
</div>`,
      },
      hotspots: [
        { id: 'interests', label: 'Choix multiples en boutons radio', correct: true, why: 'Standard de plateforme trahi : un rond signifie « un seul choix ». Deux ronds cochés dans un même groupe contredisent la convention ; pour plusieurs choix, des cases carrées.' },
        { id: 'save2', label: '« Sauvegarder les préférences » en pastille verte', correct: true, why: 'La même action change de mot (« Enregistrer » / « Sauvegarder ») et d’apparence (bleu rectangulaire / vert arrondi) d’une section à l’autre : l’utilisateur se demande si elles font la même chose.' },
        { id: 'error', label: 'Bandeau « Erreur 0x2F »', correct: false, why: 'Vrai problème, mais il relève de l’heuristique 9 (message cryptique), pas de la cohérence.' },
        { id: 'save1', label: 'Bouton « Enregistrer » du profil', correct: false, why: 'C’est la référence du système : bouton principal standard, verbe clair.' },
        { id: 'delete', label: 'Lien « Supprimer mon compte »', correct: false, why: 'Action destructrice en rouge, isolée sous un séparateur : conforme aux conventions.' },
      ],
      explanation: `L’heuristique 4 couvre deux choses : la **cohérence interne** (mêmes mots, même apparence, même comportement pour la même action) et les **standards externes** (conventions de la plateforme).

- Les boutons radio violent un standard : depuis des décennies, rond = choix unique, carré = choix multiples.
- Le second bouton d’enregistrement viole la cohérence interne : deux verbes et deux styles pour une même action.

Le bandeau d’erreur est un vrai défaut, mais d’une autre heuristique. Savoir **attribuer** un problème à la bonne heuristique rend le diagnostic, et donc le correctif, plus juste.`,
      takeaway: 'Cohérence et standards : même mot et même apparence pour la même action, et respect des conventions (rond = un choix, carré = plusieurs).',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'heuristics-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque heuristique à la bonne pratique qui l’illustre.',
      leftTitle: 'Heuristique',
      rightTitle: 'Bonne pratique',
      pairs: [
        { id: 'h1', left: '1 · Visibilité de l’état du système', right: 'L’éditeur affiche « Enregistré il y a 5 s »' },
        { id: 'h3', left: '3 · Contrôle et liberté', right: 'Un lien « Effacer tous les filtres » au-dessus des résultats' },
        { id: 'h5', left: '5 · Prévention des erreurs', right: 'Le calendrier grise les dates déjà passées' },
        { id: 'h6', left: '6 · Reconnaissance plutôt que rappel', right: 'Un libellé sous chaque icône de la barre d’onglets' },
        { id: 'h7', left: '7 · Flexibilité et efficacité', right: '`Ctrl+K` ouvre une palette de commandes' },
        { id: 'h9', left: '9 · Reconnaître et corriger les erreurs', right: '« Ce fichier fait 12 Mo ; la limite est de 10 Mo. »' },
        { id: 'h10', left: '10 · Aide et documentation', right: 'Un centre d’aide cherchable, organisé par tâche' },
      ],
      explanation: `Chaque pratique répond à une question différente :

- **1** : que se passe-t-il ? → l’état est affiché.
- **3** : comment revenir en arrière ? → une sortie simple.
- **5** : comment éviter l’erreur ? → une contrainte qui la rend impossible.
- **6** : que dois-je retenir ? → rien, tout est sous les yeux.
- **7** : comment aller plus vite ? → un accélérateur pour les habitués.
- **9** : que faire après l’erreur ? → un diagnostic précis.
- **10** : où trouver de l’aide ? → une aide cherchable, pensée par tâche.

Distinguer la 3 de la 5 est classique : la 5 agit **avant** l’erreur, la 3 **après**.`,
      takeaway: 'Rattache chaque problème ou bonne pratique à la question qu’il traite : savoir, sortir, prévenir, reconnaître, accélérer, réparer, être aidé.',
      sources: ['nng:heuristics', 'imp:critique'],
    },
    {
      id: 'heuristics-severity-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces problèmes d’un site de réservation du plus grave (P0) au moins grave (P3).',
      items: [
        { id: 'p0', label: 'Sur Safari iOS, le bouton « Confirmer la réservation » ne réagit pas : impossible de réserver' },
        { id: 'p1', label: 'Rien ne confirme la réservation : des clients réservent deux fois, puis appellent le service client' },
        { id: 'p2', label: 'Le filtre « Prix » se réinitialise au retour à la liste : il faut le régler de nouveau' },
        { id: 'p3', label: 'Les icônes du pied de page n’ont pas toutes la même épaisseur de trait' },
      ],
      explanation: `- **P0 — bloquant** : la tâche est impossible pour toute une partie des clients.
- **P1 — majeur** : la tâche aboutit, mais la confusion pousse des gens à contacter le support — le signe qu’on est au moins en P1.
- **P2 — mineur** : agaçant, mais on s’en sort en réglant le filtre de nouveau.
- **P3 — finition** : aucun impact sur la réservation.

Cet ordre est celui des corrections : on ne peaufine pas des icônes tant qu’une partie des clients ne peut pas réserver.`,
      takeaway: 'P0 bloque la tâche, P1 la rend pénible au point d’appeler le support, P2 agace mais se contourne, P3 est de la finition.',
      sources: ['imp:critique', 'nng:severity'],
    },
    {
      id: 'heuristics-error-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel message aide le mieux à se sortir de l’erreur ?',
      context: 'Une personne joint un justificatif à une note de frais. Le fichier est trop lourd.',
      options: [
        {
          id: 'code',
          visual: {
            alt: 'Zone de dépôt de fichier et message rouge « Échec de l’envoi. Erreur 413. »',
            css: `.up-zone { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 18px; border: 1.5px dashed #8b92a1; border-radius: 10px; color: #5a6172; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Joindre un justificatif</p><div class="up-zone"><i data-icon="upload" style="--ico:22px"></i><p class="mk-small">Glissez un fichier ici ou <a>parcourez</a></p></div><p class="mk-error"><i data-icon="circle-alert" style="--ico:14px"></i> Échec de l’envoi. Erreur 413.</p></div>`,
          },
          why: 'Un code HTTP ne dit rien à l’utilisateur : il ne sait ni pourquoi ça a échoué, ni quoi faire.',
        },
        {
          id: 'clear',
          visual: {
            alt: 'Le fichier devis-mars.pdf de 12 Mo, un message expliquant que la limite est de 10 Mo avec deux solutions, et un bouton pour choisir un autre fichier.',
            css: `.up-file { padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 10px; }
.up-msg { display: flex; gap: 8px; align-items: flex-start; padding: 10px 12px; border-radius: 8px; background: #fdecea; color: #8c1d18; font-size: 13px; font-weight: 600; }
.up-msg .mk-ico { margin-top: 2px; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Joindre un justificatif</p><div class="up-file mk-row"><i data-icon="file-text" style="--ico:20px"></i><div class="mk-grow"><p class="mk-strong">devis-mars.pdf</p><p class="mk-small mk-muted">12 Mo</p></div></div><p class="up-msg"><i data-icon="circle-alert" style="--ico:14px"></i> Ce fichier fait 12 Mo : la limite est de 10 Mo. Compressez-le ou choisissez un autre fichier.</p><span class="mk-btn mk-btn--ghost mk-btn--s" style="align-self:flex-start">Choisir un autre fichier</span></div>`,
          },
          why: 'Le problème (12 Mo), la règle (10 Mo maximum) et deux solutions, avec l’action pour repartir.',
        },
      ],
      answer: 'clear',
      explanation: `L’heuristique 9 demande trois choses à un message d’erreur : un **langage clair** (pas de code), un **problème précis** et une **solution constructive**.

Le code 413 est exact pour un serveur, inutile pour un humain. Le message recommandé nomme le fichier, sa taille, la limite, et propose de repartir sans tout recommencer. Mieux encore, l’heuristique 5 suggère d’annoncer la limite **avant** l’envoi, près de la zone de dépôt.`,
      takeaway: 'Un message d’erreur dit ce qui ne va pas, en clair, et comment s’en sortir ; il ne se contente jamais d’un code.',
      sources: ['imp:critique', 'nng:heuristics', 'imp:clarify'],
    },
    {
      id: 'heuristics-steps-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Dans quel tunnel de commande sais-tu le mieux où tu en es ?',
      options: [
        {
          id: 'flat',
          visual: {
            alt: 'Écran « Vos informations » avec trois champs d’adresse et un bouton Continuer, sans indication d’étape.',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h2">Vos informations</p><div class="mk-field"><span class="mk-label">Adresse</span><div class="mk-input">12 rue des Tanneurs</div></div><div class="mk-grid" style="--cols:2;--gap:10px"><div class="mk-field"><span class="mk-label">Code postal</span><div class="mk-input">67000</div></div><div class="mk-field"><span class="mk-label">Ville</span><div class="mk-input">Strasbourg</div></div></div><span class="mk-btn mk-btn--block">Continuer</span></div>`,
          },
          why: 'Combien d’étapes restent ? Le paiement vient-il après ? Rien ne le dit.',
        },
        {
          id: 'stepper',
          visual: {
            alt: 'Même écran titré « Livraison » sous un indicateur d’étapes : Panier validé, Livraison en cours, Paiement à venir.',
            css: `.sp { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #5a6172; }
.sp-sep { flex: 1; min-width: 12px; height: 2px; background: #e3e6ec; }
.sp-done { display: inline-flex; align-items: center; gap: 4px; color: #1e5e33; }
.sp-cur { color: #1f4fd8; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><div class="sp"><span class="sp-done"><i data-icon="check" style="--ico:14px"></i> Panier</span><span class="sp-sep"></span><span class="sp-cur">2 · Livraison</span><span class="sp-sep"></span><span>3 · Paiement</span></div><p class="mk-h2">Livraison</p><div class="mk-field"><span class="mk-label">Adresse</span><div class="mk-input">12 rue des Tanneurs</div></div><div class="mk-grid" style="--cols:2;--gap:10px"><div class="mk-field"><span class="mk-label">Code postal</span><div class="mk-input">67000</div></div><div class="mk-field"><span class="mk-label">Ville</span><div class="mk-input">Strasbourg</div></div></div><span class="mk-btn mk-btn--block">Continuer vers le paiement</span></div>`,
          },
          why: 'L’étape franchie, l’étape en cours et celle qui reste sont visibles ; le bouton annonce la suite.',
        },
      ],
      answer: 'stepper',
      explanation: `La **progression dans un parcours en plusieurs étapes** fait partie de l’heuristique 1, visibilité de l’état du système. Savoir combien il reste réduit l’abandon : on accepte mieux un effort dont on voit la fin.

La version recommandée combine trois signaux : un indicateur d’étapes, un titre qui nomme l’étape, et un bouton qui annonce la suivante (« Continuer vers le paiement »).`,
      takeaway: 'Dans un parcours en plusieurs étapes, montre où l’on est, ce qui est fait et ce qui reste.',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'heuristics-undo-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel écran te permet de réparer ton erreur ?',
      context: 'Tu viens de supprimer par erreur la conversation « Devis cuisine » dans ta messagerie.',
      options: [
        {
          id: 'silent',
          visual: {
            alt: 'Boîte de réception avec trois conversations restantes, sans aucun message.',
            css: `.ml-row { display: flex; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid #eceef2; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><div class="mk-row mk-between"><p class="mk-h3">Boîte de réception</p><span class="mk-small mk-muted">3 conversations</span></div><div class="ml-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Banque Arpège</p><p class="mk-small mk-muted">Votre relevé d’octobre est disponible</p></div></div><div class="ml-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Léa Martin</p><p class="mk-small mk-muted">Les photos du week-end</p></div></div><div class="ml-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Mairie de Lyon</p><p class="mk-small mk-muted">Rendez-vous confirmé le 3 décembre</p></div></div></div>`,
          },
          why: 'La conversation a disparu sans un mot : pas de confirmation, pas d’annulation. Il faut chercher la corbeille, si elle existe.',
        },
        {
          id: 'undo',
          visual: {
            alt: 'Même boîte de réception avec une notification « Conversation « Devis cuisine » supprimée » et un bouton Annuler.',
            css: `.ml-row { display: flex; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid #eceef2; } .ml-undo { font-weight: 700; color: #9db4ff; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:6px"><div class="mk-row mk-between"><p class="mk-h3">Boîte de réception</p><span class="mk-small mk-muted">3 conversations</span></div><div class="ml-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Banque Arpège</p><p class="mk-small mk-muted">Votre relevé d’octobre est disponible</p></div></div><div class="ml-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Léa Martin</p><p class="mk-small mk-muted">Les photos du week-end</p></div></div><div class="ml-row"><span class="mk-avatar"></span><div class="mk-grow"><p class="mk-strong">Mairie de Lyon</p><p class="mk-small mk-muted">Rendez-vous confirmé le 3 décembre</p></div></div><div class="mk-toast" style="margin-top:8px"><span class="mk-grow">« Devis cuisine » supprimée</span><span class="ml-undo">Annuler</span></div></div>`,
          },
          why: 'L’action est confirmée (heuristique 1) et réversible d’un geste (heuristique 3).',
        },
      ],
      answer: 'undo',
      explanation: `L’heuristique 3, **contrôle et liberté**, demande une « sortie de secours » clairement signalée : les gens se trompent, et doivent pouvoir revenir en arrière sans parcours compliqué.

Pour une action réversible comme celle-ci, l’annulation après coup vaut mieux qu’une confirmation avant chaque suppression : la confirmation ralentit tout le monde et, à force, on clique dessus sans la lire. La notification avec « Annuler » confirme l’action et offre la réparation au même endroit.`,
      takeaway: 'Pour une action réversible, préfère l’annulation après coup à la confirmation préalable : confirme ce qui s’est passé et offre « Annuler ».',
      sources: ['imp:critique', 'nng:heuristics', 'imp:clarify'],
    },
    {
      id: 'heuristics-memory-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle dernière étape demande le moins d’effort de mémoire ?',
      context: 'Demande de retour d’un article sur une boutique en ligne, étape 3 sur 3.',
      options: [
        {
          id: 'recall',
          visual: {
            alt: 'Étape « Confirmez votre demande » qui demande de saisir le numéro de commande vu à l’étape 1 et la référence de l’article vue à l’étape 2.',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-small mk-muted">Retour d’un article · Étape 3 sur 3</p><p class="mk-h3">Confirmez votre demande</p><div class="mk-field"><span class="mk-label">Numéro de commande (indiqué à l’étape 1)</span><div class="mk-input"></div></div><div class="mk-field"><span class="mk-label">Référence de l’article (voir étape 2)</span><div class="mk-input"></div></div><span class="mk-btn mk-btn--block">Envoyer la demande</span></div>`,
          },
          why: 'Il faut se souvenir de deux codes vus plus tôt, ou revenir en arrière les chercher.',
        },
        {
          id: 'recognize',
          visual: {
            alt: 'Même étape avec un récapitulatif : photo et nom de l’article, numéro de commande, motif du retour et conditions de remboursement.',
            css: `.mr-sum { padding: 10px; border: 1px solid #e1e4ea; border-radius: 10px; background: #f6f7f9; }`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-small mk-muted">Retour d’un article · Étape 3 sur 3</p><p class="mk-h3">Confirmez votre demande</p><div class="mr-sum mk-row"><div class="mk-img" style="--ratio:1;width:44px"></div><div class="mk-grow"><p class="mk-strong">Sac à dos Alto 28 L</p><p class="mk-small mk-muted">Commande n° 48213 · Motif : ne convient pas</p></div></div><p class="mk-small">Remboursement de 89,00 € sur la carte utilisée, sous 5 jours après réception.</p><span class="mk-btn mk-btn--block">Envoyer la demande</span></div>`,
          },
          why: 'Tout ce qui a été choisi est rappelé à l’écran : il suffit de reconnaître et de confirmer.',
        },
      ],
      answer: 'recognize',
      explanation: `L’heuristique 6, **reconnaissance plutôt que rappel**, part d’un constat : reconnaître une information affichée coûte beaucoup moins que s’en souvenir. La mémoire de travail est limitée ; chaque code à retenir d’un écran à l’autre est une occasion d’erreur ou d’abandon.

Le système connaît déjà la commande et l’article : les redemander, c’est transférer sa propre mémoire à l’utilisateur. Le récapitulatif lui permet de vérifier d’un coup d’œil, et d’envoyer.`,
      takeaway: 'Ne demande jamais de retenir une information d’un écran à l’autre : affiche-la là où elle sert.',
      sources: ['imp:critique', 'nng:heuristics'],
    },
    {
      id: 'heuristics-band-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Une évaluation sur les dix heuristiques totalise 31/40. Comment la lire ?',
      fixedOrder: true,
      options: [
        { id: 'excellent', label: 'Excellent : quelques finitions, on peut livrer', why: 'La bande excellente commence à 36/40.' },
        { id: 'good', label: 'Bon : une base solide, des points faibles à reprendre', why: '31 tombe dans la bande 28–35.' },
        { id: 'acceptable', label: 'Acceptable : des améliorations importantes sont nécessaires', why: 'Cette bande va de 20 à 27.' },
        { id: 'poor', label: 'Faible : une refonte majeure de l’expérience', why: 'Cette bande va de 12 à 19.' },
      ],
      answer: 'good',
      explanation: `Les bandes du total sur 40 : **36–40** excellent, **28–35** bon, **20–27** acceptable, **12–19** faible, **0–11** critique.

31/40 est un bon score : la plupart des interfaces réelles se situent entre 20 et 32. Le total ne suffit pourtant pas : regarde quelles heuristiques ont tiré la note vers le bas, c’est là que se trouvent les chantiers.`,
      takeaway: 'Sur 40 : 36 et plus excellent, 28–35 bon, 20–27 acceptable, 12–19 faible, moins de 12 critique.',
      sources: ['imp:critique'],
    },
    {
      id: 'heuristics-na-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Comment présenter le score de cette évaluation ?',
      context: 'Tu évalues la page d’accueil d’une campagne. Tu notes les heuristiques 7 et 10 « n/a », et les huit autres totalisent 22 points.',
      options: [
        { id: 'pct', label: '22/32, soit 69 % : acceptable', why: 'Maximum renormalisé (4 × 8 = 32) et bande lue en pourcentage : 69 % est sous le seuil de 70 %.' },
        { id: 'forty', label: '22/40, soit 55 % : acceptable', why: 'Le maximum doit refléter ce qui a été noté. Afficher /40 sur huit heuristiques fausse la lecture.' },
        { id: 'raw', label: '22/32 : bon, puisque 22 dépasse le seuil de 20', why: 'Les seuils bruts (20, 28…) valent pour un total sur 40. Sur 32, on lit le pourcentage.' },
        { id: 'fill', label: 'Mettre 2/4 aux heuristiques 7 et 10 pour garder un total sur 40', why: 'Inventer des notes pour remplir la grille fausse l’évaluation : n/a se justifie et se renormalise.' },
      ],
      answer: 'pct',
      explanation: `Sur une surface **Persuader** ou **Expérience**, les heuristiques 7 (accélérateurs) et 10 (aide) peuvent ne pas s’appliquer. On les note alors **n/a**, avec une ligne de justification, et le maximum devient **4 × le nombre d’heuristiques notées**.

La bande se lit en pourcentage : 90 % et plus excellent, 70 % bon, 50 % acceptable, 30 % faible. Ici 22/32 = 68,75 % : acceptable, juste sous la barre du « bon ». À titre de comparaison, 24/32 = 75 % serait bon.`,
      takeaway: 'Avec des heuristiques n/a, le maximum vaut 4 × le nombre noté, et la bande se lit en pourcentage (70 % = bon).',
      sources: ['imp:critique'],
    },
    {
      id: 'heuristics-support-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle sévérité donner à ce problème ?',
      context: 'Sur un site de billetterie, le code promo est accepté sans aucun message et la réduction n’apparaît qu’au récapitulatif final. Plusieurs clients écrivent au service client pour savoir si leur code a fonctionné.',
      fixedOrder: true,
      options: [
        { id: 'p0', label: 'P0 — bloquant', why: 'La commande aboutit : rien n’empêche de terminer la tâche.' },
        { id: 'p1', label: 'P1 — majeur', why: 'La confusion pousse des clients à contacter le support : c’est le signal d’un P1 au minimum.' },
        { id: 'p2', label: 'P2 — mineur', why: 'Un contournement existe (aller jusqu’au récapitulatif), mais quand des gens écrivent au support, on dépasse la simple gêne.' },
        { id: 'p3', label: 'P3 — finition', why: 'L’impact est réel : doute, appels au support, peut-être des abandons.' },
      ],
      answer: 'p1',
      explanation: `Le guide d’impeccable propose une question pour trancher : **« Un utilisateur contacterait-il le support pour ça ? »** Si oui, c’est au moins P1. Ici, c’est déjà le cas.

Le problème relève de l’heuristique 1 : une action (saisir un code) doit recevoir un retour immédiat. Le correctif tient en une ligne : « Code PRINTEMPS appliqué : −10 € » sous le champ, et le total mis à jour aussitôt.`,
      takeaway: 'Si un problème pousse des gens à contacter le support, c’est au moins un P1 : à corriger avant la mise en production.',
      sources: ['imp:critique', 'nng:severity'],
    },
    {
      id: 'heuristics-typical-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Une interface réelle bien conçue obtient en général 36/40 ou plus aux heuristiques de Nielsen.',
      answer: false,
      explanation: `La plupart des interfaces réelles obtiennent **entre 20 et 32 sur 40**. La bande 36–40 signifie « finitions seulement » : c’est rare.

Le barème réserve le 4 à ce qui est vraiment excellent. Gonfler les notes rend l’évaluation inutile : elle ne dit plus où agir. Une note honnête de 2 ou 3 est une information ; un 4 de complaisance n’en est pas une.`,
      takeaway: 'La plupart des interfaces réelles obtiennent entre 20 et 32 sur 40 : note honnêtement, un 4 doit être mérité.',
      sources: ['imp:critique'],
    },
    {
      id: 'heuristics-evaluators-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Pour une évaluation heuristique fiable, un seul évaluateur expérimenté qui parcourt l’interface une fois suffit.',
      answer: false,
      explanation: `Chaque évaluateur rate des problèmes que d’autres voient. NN/g recommande **trois à cinq évaluateurs**, qui inspectent **chacun de leur côté** (environ une à deux heures) sans voir les notes des autres, puis mettent en commun.

Chacun fait **deux passages** : un pour comprendre le parcours, un pour l’inspecter. Et pour la sévérité, la note d’un seul évaluateur n’est pas fiable ; la moyenne de trois suffit dans la plupart des cas.`,
      takeaway: 'Évaluation heuristique : trois à cinq évaluateurs indépendants, deux passages chacun, puis une mise en commun.',
      sources: [{ label: 'Nielsen Norman Group — How to Conduct a Heuristic Evaluation', url: 'https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/' }, 'nng:severity'],
    },
  ],
};

export default heuristics;
