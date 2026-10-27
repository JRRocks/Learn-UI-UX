import type { ModuleContent, Visual } from '../../engine/types';

const INIT = { label: 'impeccable — init.md (PRODUCT.md)', url: 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/init.md' };

const CODE_CSS = `.cd { margin: 0; padding: 12px 14px; border-radius: 10px; background: #f6f7f9; border: 1px solid #e1e4ea; font: 12px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; color: #1d2230; white-space: pre-wrap; word-break: break-word; }
.cd .c { color: #5a6172; }
.cd-file { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #5a6172; }`;

const DOC_CSS = `.dm { padding: 14px; border: 1px solid #e1e4ea; border-radius: 10px; display: flex; flex-direction: column; gap: 8px; }
.dm-file { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #5a6172; }
.dm h4 { margin: 4px 0 0; font-size: 15px; font-weight: 700; }
.dm h5 { margin: 2px 0 0; font-size: 13px; font-weight: 700; color: #36405a; }
.dm p { font-size: 13px; }
.dm code { font: 600 12px ui-monospace, Menlo, monospace; background: #eef1f7; padding: 1px 5px; border-radius: 4px; }`;

/** Chat d’ouverture d’un entretien de cadrage. */
const chat = (question: string): Visual => ({
  alt: `Conversation : la personne demande de concevoir l’écran de suivi de commande d’une boutique ; l’assistant répond : « ${question} »`,
  css: `.ch { display: flex; flex-direction: column; gap: 10px; }
.ch-me { align-self: flex-end; max-width: 85%; padding: 10px 12px; border-radius: 14px 14px 4px 14px; background: #1f4fd8; color: #fff; }
.ch-ai { align-self: flex-start; max-width: 92%; padding: 10px 12px; border-radius: 14px 14px 14px 4px; background: #f1f3f6; }`,
  html: `<div class="mk-pad ch"><p class="ch-me">Conçois l’écran de suivi de commande de notre boutique.</p><p class="ch-ai">${question}</p></div>`,
});

/** Appli de réservation de salles : en-tête établi, puis l’écran « Statistiques » ajouté. */
const statsScreen = (inherit: boolean): Visual => ({
  frame: 'browser',
  alt: inherit
    ? 'Appli de réservation de salles : même en-tête blanc à onglets, et un écran Statistiques en cartes blanches à bord fin, chiffres en gris foncé, barres bleues.'
    : 'Appli de réservation de salles : même en-tête blanc à onglets, mais l’écran Statistiques passe sur un fond presque noir, avec des chiffres violets lumineux, des cartes translucides et des libellés en capitales espacées.',
  css: `.rs-top { display: flex; align-items: center; gap: 14px; padding: 0 16px; border-bottom: 1px solid #e3e6ec; }
.rs-logo { font-weight: 800; color: #1f4fd8; }
.rs-tab { padding: 10px 2px; font-size: 13px; font-weight: 600; color: #5a6172; }
.rs-on { color: #1d2230; box-shadow: inset 0 -2px 0 #1f4fd8; }
.rs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
.rs-bars { display: flex; align-items: flex-end; gap: 8px; height: 70px; }
.rs-bars span { flex: 1; border-radius: 4px 4px 0 0; }
.rs-days { display: flex; gap: 8px; font-size: 11px; }
.rs-days span { flex: 1; text-align: center; }
${inherit ? `.rs-body { background: #fff; }
.rs-card { padding: 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.rs-num { font-size: 22px; font-weight: 700; font-variant-numeric: tabular-nums; }
.rs-lab { font-size: 12px; color: #5a6172; }
.rs-bars span { background: #1f4fd8; }
.rs-days { color: #5a6172; }` : `.rs-body { background: linear-gradient(160deg, #0f1222 0%, #1b1640 100%); color: #e9e7ff; }
.rs-card { padding: 12px; border-radius: 16px; background: rgb(255 255 255 / 0.06); border: 1px solid rgb(167 139 250 / 0.35); box-shadow: 0 0 18px rgb(167 139 250 / 0.35); }
.rs-num { font-size: 24px; font-weight: 800; color: #c4b5fd; text-shadow: 0 0 12px rgb(167 139 250 / 0.8); }
.rs-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #a5a8c8; }
.rs-bars span { background: linear-gradient(180deg, #a78bfa, #22d3ee); box-shadow: 0 0 10px rgb(34 211 238 / 0.5); }
.rs-days { color: #a5a8c8; }`}`,
  html: `<div class="rs-top"><span class="rs-logo">Salles</span><span class="rs-tab">Réservations</span><span class="rs-tab">Salles</span><span class="rs-tab rs-on">Statistiques</span></div>
<div class="rs-body mk-pad mk-stack" style="--gap:12px"><p class="mk-h2">Statistiques · novembre</p><div class="rs-grid"><div class="rs-card"><p class="rs-lab">Taux d’occupation</p><p class="rs-num">72 %</p></div><div class="rs-card"><p class="rs-lab">Réservations</p><p class="rs-num">318</p></div><div class="rs-card"><p class="rs-lab">Salle la plus demandée</p><p class="rs-num" style="font-size:17px">Galilée</p></div></div><div class="rs-card"><p class="rs-lab" style="margin-bottom:8px">Occupation par jour</p><div class="rs-bars"><span style="height:55%"></span><span style="height:80%"></span><span style="height:92%"></span><span style="height:74%"></span><span style="height:40%"></span></div><div class="rs-days"><span>Lun.</span><span>Mar.</span><span>Mer.</span><span>Jeu.</span><span>Ven.</span></div></div></div>`,
});

const processModule: ModuleContent = {
  id: 'process',
  title: 'Cadrer et systématiser',
  category: 'construire',
  summary:
    'Cadrer un écran avant de le dessiner, consigner la vérité produit et le système visuel, décider ce qui fait autorité, et choisir la bonne commande d’impeccable pour chaque problème.',
  minutes: 11,
  commands: ['shape', 'init', 'document', 'extract'],
  sources: ['imp:skill', 'imp:shape', INIT, 'imp:new-work', 'imp:document', 'imp:extract', 'imp:polish'],
  sections: [
    {
      id: 'carte',
      title: 'La carte des commandes',
      body: `Impeccable propose **24 commandes**, rangées en six familles. Les connaître, c’est savoir **nommer le problème** avant de le traiter :

- **Construire** : \`shape\` (cadrer l’UX avant le code), \`init\` (consigner la vérité produit dans PRODUCT.md), \`document\` (générer DESIGN.md depuis le code existant), \`extract\` (sortir jetons et composants réutilisables vers le design system). \`craft\` n’est plus qu’un alias déprécié d’une demande de création ordinaire.
- **Évaluer** : \`critique\` (revue UX notée sur les heuristiques, avec personas), \`audit\` (contrôles techniques — accessibilité, performance, responsive — notés sur 20).
- **Affiner** : \`polish\` (passe finale avant la mise en ligne), \`bolder\` (amplifier un design trop sage), \`quieter\` (calmer un design criard ou surstimulant), \`distill\` (ramener à l’essentiel), \`harden\` (erreurs, traductions, cas limites), \`onboard\` (premiers usages, états vides, activation).
- **Enrichir** : \`animate\` (mouvement utile), \`colorize\` (couleur stratégique), \`typeset\` (typographie), \`layout\` (espacement, rythme, hiérarchie), \`delight\` (personnalité, moments mémorables), \`overdrive\` (effets techniques hors norme).
- **Corriger** : \`clarify\` (textes, libellés, messages d’erreur), \`adapt\` (autres écrans et appareils), \`optimize\` (performance).
- **Itérer** : \`live\` (variantes à choisir dans le navigateur), \`generate\` (variantes d’un élément nommé, sans sélection manuelle).

Une revue (\`critique\` ou \`audit\`) se conclut par les commandes à lancer, par ordre de priorité, et se termine par \`polish\` dès qu’il y a des corrections.`,
    },
    {
      id: 'shape',
      title: 'Cadrer avant de dessiner',
      body: `\`shape\` découvre **ce qu’il faut faire et comment ça doit fonctionner**, puis rend un brief confirmé — **jamais de code**.

### L’entretien de découverte

Deux ou trois questions liées par tour, puis on attend les réponses. Un tour suffit par défaut ; un second seulement si les réponses révèlent un manque important. Pas de questionnaire déversé d’un bloc, pas de questions sur ce qui est déjà établi : on affirme la lecture probable et on invite à la corriger.

- **Tour 1 — but, personnes, résultat** : à quoi sert cette surface, quel problème résout-elle ? Qui y arrive, dans quelle situation, dans quel état d’esprit ? Que doit-on y comprendre ou y faire, et à quoi verra-t-on la réussite ? Qu’est-ce qui est vrai ici et qu’un produit voisin ne pourrait pas revendiquer ?
- **Tour 2 — matière, comportement, limites** : quel contenu réel, avec quelles plages (minimum, typique, maximum) ? Quels états comptent (premier usage, vide, chargement, erreur, succès, permissions, débordement, usage expert) ? Quel niveau de fidélité ? Que faut-il ne pas toucher ? Quelles contraintes de plateforme, de performance, d’accessibilité, de traduction ?

On ne demande **jamais de valeurs CSS** ni de choisir parmi des « ambiances » toutes faites : la direction visuelle se décide ensuite.

### Le brief

Le plus court qui suffise : public et situation, résultat attendu et preuves, direction retenue, périmètre et anti-objectifs, états et plages de contenu, interaction et mise en page (l’intention, pas le CSS), contraintes et décisions ouvertes. Trois à cinq puces quand tout est clair. On le fait confirmer, puis on s’arrête.`,
      examples: [
        {
          title: 'Un brief qu’on peut construire',
          bad: {
            alt: 'Brief « Suivi de commande » qui ne contient que des adjectifs : moderne, épuré, premium, couleurs douces, animations fluides, effet waouh.',
            css: `.bf { padding: 14px; border: 1px solid #e1e4ea; border-radius: 10px; } .bf-file { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #5a6172; }`,
            html: `<div class="mk-pad"><div class="bf mk-stack" style="--gap:8px"><p class="bf-file"><i data-icon="file-text" style="--ico:14px"></i> Brief — Suivi de commande</p><p>Un écran moderne et épuré, avec une touche premium. Des couleurs douces, beaucoup d’espace et des animations fluides. Il faut que ça fasse « waouh ».</p></div></div>`,
          },
          badNote: 'Des adjectifs, aucune décision : qui, pour faire quoi, dans quels cas ? Tout reste à inventer.',
          good: {
            alt: 'Brief « Suivi de commande » en cinq lignes : qui, but, états, limites, hors champ.',
            css: `.bf { padding: 14px; border: 1px solid #e1e4ea; border-radius: 10px; } .bf-file { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #5a6172; } .bf p { font-size: 13px; }`,
            html: `<div class="mk-pad"><div class="bf mk-stack" style="--gap:6px"><p class="bf-file"><i data-icon="file-text" style="--ico:14px"></i> Brief — Suivi de commande</p><p><b>Qui :</b> un client qui vient de commander, souvent sur mobile, parfois inquiet d’un retard.</p><p><b>But :</b> savoir en 5 secondes où est le colis et quand il arrive.</p><p><b>États :</b> en préparation, expédié, en retard, livré, adresse introuvable.</p><p><b>Limites :</b> suivi du transporteur mis à jour toutes les heures ; pas de carte en temps réel.</p><p><b>Hors champ :</b> la page panier ne change pas.</p></div></div>`,
          },
          goodNote: 'Public, résultat, états, limites, périmètre : chaque ligne tranche une décision.',
        },
      ],
    },
    {
      id: 'product-md',
      title: 'La vérité produit : PRODUCT.md',
      body: `\`init\` consigne la **vérité produit durable** dans PRODUCT.md : ce qui restera vrai, quel que soit l’écran à concevoir.

- **Ce qui y va** : les utilisateurs, leur situation et leur tâche ; l’objectif du produit et ce que veut dire réussir ; son positionnement (ce qu’un produit voisin ne pourrait pas revendiquer) ; le contexte d’usage ; les capacités et contraintes ; les engagements de marque confirmés (nom, voix, éléments imposés) ; les **preuves disponibles** — contenus, données, témoignages réels — et celles qui manquent ; trois à cinq principes produit ; les besoins d’accessibilité.
- **Ce qui n’y va pas** : palette, typographie, composants, concepts de page ; la stratégie d’une surface (mode de visite, enchaînement des sections, appels à l’action) ; tout témoignage, client, chiffre ou tarif **inventé**.

L’entretien d’\`init\` part de ce que le dépôt révèle déjà, pose au plus trois questions par tour et ne demande ni couleurs, ni polices, ni ambiance. Ce qui n’est pas décidé est noté comme tel, jamais inventé.`,
    },
    {
      id: 'deja-vrai',
      title: 'Décider ce qui est déjà vrai',
      body: `Avant toute nouvelle surface, le parcours de création d’impeccable (*new-work*) établit **ce qui fait autorité** :

- **Refonte** : on garde la vérité produit, le contenu, les fonctions, les contraintes et les engagements de marque ; on **remplace** l’ancien monde visuel au lieu de le polir. L’ancien look renseigne sur le sujet, il ne commande pas le résultat.
- **Monde établi** : on en **hérite**. L’absence de DESIGN.md n’efface pas une identité cohérente déjà présente dans le code : on la documente au lieu d’en inventer une autre.
- **Marque incomplète** : on préserve les éléments confirmés et les traits reconnaissables, puis on étend le système avec l’utilisateur.
- **Aucune autorité visuelle** : on crée un monde avec l’utilisateur.

### Le bon dosage d’invention

- **Étendre une surface existante** (une section, un composant, un état) : on hérite du monde *et* de la composition ; on ne résout que le nouveau contenu, la hiérarchie, les états et le raccord. Un ajout local ne devient jamais un exercice d’identité.
- **Créer une surface entière dans un monde établi** : le système visuel reste fixe ; on explore cinq à sept structures réellement différentes, tirées du contenu, de la tâche et des comportements, avant d’en retenir une.
- **Créer ou remplacer le monde visuel** : là seulement, on cherche une direction visuelle neuve.`,
    },
    {
      id: 'design-md',
      title: 'Systématiser : DESIGN.md, jetons et extraction',
      body: `**DESIGN.md** décrit le système visuel pour que tout nouvel écran reste dans la marque. \`document\` le génère depuis le code existant, ou en pose une version « graine » choisie avec l’utilisateur quand rien n’est encore construit.

- **Les jetons font foi, la prose explique** : un en-tête YAML porte les valeurs (couleurs, typographie, arrondis, espacements, composants), puis jusqu’à huit sections dans un ordre fixe — *Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do’s and Don’ts*.
- **Décrire avant de chiffrer** : « Bleu d’action (#1f4fd8) : boutons principaux et liens, jamais en décoration » plutôt que « blue-800 ». Un nom descriptif, la valeur exacte entre parenthèses, l’usage et la raison.
- **Strictement visuel** : rien de PRODUCT.md n’y est recopié, et aucun composant ni jeton inexistant n’y est inventé.

### Jetons primitifs et sémantiques

Un **jeton primitif** nomme une valeur (\`blue-600: #1f4fd8\`). Un **jeton sémantique** nomme une fonction (\`color-action\`, \`color-text-muted\`, \`space-field-gap\`) et pointe vers un primitif. Les composants consomment les jetons sémantiques ; un thème sombre se contente alors de rebrancher ces rôles sur d’autres primitifs.

### Extraire au bon moment

\`extract\` ne sort un motif vers le design system que s’il revient **au moins trois fois avec la même intention**. L’abstraction prématurée coûte plus cher que la duplication, et deux boutons qui se ressemblent mais servent des intentions différentes restent séparés.`,
      examples: [
        {
          title: 'Nommer par la fonction',
          bad: {
            alt: 'Feuille de style où les composants répètent des valeurs brutes : le même bleu codé deux fois, un bleu presque identique ailleurs, une taille de 13 px et une marge de 15 px isolées.',
            css: CODE_CSS,
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="cd-file"><i data-icon="file-text" style="--ico:14px"></i> styles.css</p><pre class="cd">.btn-primary { background: #1f4fd8; }
.link { color: #1f4fd8; }
.badge-info { background: #2a5bd7; } <span class="c">/* presque le même bleu */</span>
.card-meta { color: #5a6172; font-size: 13px; }
.form-row { margin-bottom: 15px; }</pre></div>`,
          },
          badNote: 'Les valeurs se recopient et dérivent : impossible de changer le bleu d’action en un seul endroit.',
          good: {
            alt: 'Feuille de style en deux couches : des jetons primitifs qui nomment des valeurs, puis des jetons sémantiques qui nomment des rôles, utilisés par les composants.',
            css: CODE_CSS,
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="cd-file"><i data-icon="file-text" style="--ico:14px"></i> tokens.css</p><pre class="cd"><span class="c">/* Primitifs : des valeurs */</span>
--blue-600: #1f4fd8;
--gray-600: #5a6172;
--space-4: 16px;
<span class="c">/* Sémantiques : des rôles */</span>
--color-action: var(--blue-600);
--color-text-muted: var(--gray-600);
--space-field-gap: var(--space-4);

.btn-primary { background: var(--color-action); }</pre></div>`,
          },
          goodNote: 'Le composant demande un rôle, pas une couleur : changer la marque ou le thème se fait en un seul endroit.',
        },
      ],
    },
    {
      id: 'derive',
      title: 'Classer une dérive avant de la corriger',
      body: `Quand un écran s’écarte du système, \`polish\` classe d’abord la dérive, pour la corriger **au niveau le plus étroit qui soit juste** :

- **Jeton manquant** : le système a besoin d’une valeur réutilisable qu’il n’a pas.
- **Implémentation isolée** : un composant ou un motif partagé existe et devrait la remplacer.
- **Décalage de concept** : le parcours, l’architecture de l’information ou la hiérarchie diffèrent des zones comparables du produit.
- **Défaut local** : l’implémentation est simplement incomplète ou incohérente.

Puis on trie : d’abord les tâches bloquées, les pertes de données, les états trompeurs et les parcours inaccessibles ; ensuite les états manquants (chargement, vide, erreur, succès, désactivé) ; puis les dérives de parcours, de hiérarchie, de responsive et de système ; puis les incohérences visuelles et de mouvement ; enfin le ménage dans le code.

\`polish\` affine sans jamais refaire en douce : si le concept lui-même est faux, on le dit et on recommande une refonte.`,
    },
  ],
  rules: [
    { id: 'shape', front: 'Que produit la commande `shape` ?', back: 'Un entretien de découverte puis un brief confirmé. Jamais de code.' },
    { id: 'rounds', front: 'Sur quoi portent les deux tours de questions de `shape` ?', back: 'Tour 1 : but, personnes, résultat. Tour 2, seulement si un manque important apparaît : matière, comportement, limites.' },
    { id: 'never-ask', front: 'Que ne demande-t-on jamais pendant un cadrage ?', back: 'Des valeurs CSS ou un choix entre des « ambiances » toutes faites : la direction visuelle se décide ensuite.' },
    { id: 'product', front: 'Que contient PRODUCT.md ?', back: 'La vérité produit durable : utilisateurs, objectif, positionnement, contexte d’usage, contraintes, engagements de marque, preuves disponibles, accessibilité.' },
    { id: 'not-product', front: 'Qu’est-ce qui n’a rien à faire dans PRODUCT.md ?', back: 'Palette, typographie, composants, stratégie d’une page, et toute preuve inventée (témoignage, client, chiffre).' },
    { id: 'established', front: 'Pas de DESIGN.md, mais une identité cohérente dans le code : que faire ?', back: 'C’est un monde établi : on en hérite et on le documente (`document`), on n’en invente pas un autre.' },
    { id: 'extension', front: 'Une nouvelle section dans une appli existante : quelle part d’invention ?', back: 'Aucune pour l’identité : elle hérite du monde et de la composition. On résout le contenu, la hiérarchie, les états et le raccord.' },
    { id: 'tokens', front: 'Jeton primitif ou jeton sémantique ?', back: 'Le primitif nomme une valeur (`blue-600`), le sémantique nomme un rôle (`color-action`). Les composants consomment les sémantiques ; un thème les rebranche.' },
    { id: 'extract', front: 'Quand extraire un motif dans le design system ?', back: 'Quand il revient au moins trois fois avec la même intention. L’abstraction prématurée coûte plus cher que la duplication.' },
    { id: 'drift', front: 'Quelles sont les quatre catégories de dérive selon `polish` ?', back: 'Jeton manquant, implémentation isolée, décalage de concept, défaut local. On corrige la cause au niveau le plus étroit.' },
    { id: 'commands-refine', front: 'Interface trop chargée, trop criarde, trop sage : quelles commandes ?', back: '`distill` pour ramener à l’essentiel, `quieter` pour calmer, `bolder` pour amplifier.' },
    { id: 'commands-eval', front: '`critique` ou `audit` ?', back: '`critique` juge l’expérience (heuristiques sur 40, personas) ; `audit` mesure l’implémentation (accessibilité, performance, thématisation, responsive, intégrité, sur 20).' },
  ],
  exercises: [
    {
      id: 'process-questions-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle ouverture d’entretien mènera au meilleur écran ?',
      context: 'Tu demandes à un assistant de concevoir l’écran de suivi de commande d’une boutique en ligne. Il ouvre l’entretien de découverte.',
      options: [
        { id: 'style', visual: chat('Avant de commencer : quelle couleur principale veux-tu ? Plutôt une police à empattements ou sans ? Thème clair ou sombre ? Coins arrondis à 8 ou à 12 px ?'), why: 'Des valeurs de style, posées avant de savoir à qui sert l’écran : elles ne changent pas ce qu’il doit faire.' },
        { id: 'purpose', visual: chat('Avant de dessiner : qui ouvre cet écran, et dans quel état d’esprit — juste après l’achat, ou inquiet d’un retard ? Que doit-il comprendre en premier ? À quoi verra-t-on que l’écran fait son travail ?'), why: 'Les trois questions du premier tour : les personnes et leur situation, ce qu’il faut comprendre, et le critère de réussite.' },
      ],
      answer: 'purpose',
      explanation: `Le premier tour de \`shape\` porte sur **le but, les personnes et le résultat** : à quoi sert l’écran, qui y arrive et dans quel état d’esprit, ce qu’il faut y comprendre ou y faire, à quoi on verra la réussite. Ces réponses changent l’écran ; la couleur des boutons, non.

Les questions de style sont doublement à côté : \`shape\` ne demande **jamais de valeurs CSS** ni de choix entre des ambiances toutes faites, et la direction visuelle se décide plus tard, à partir de ce que l’entretien a révélé.`,
      takeaway: 'Ouvre un cadrage par le but, les personnes et le résultat attendu ; jamais par des couleurs, des polices ou des valeurs CSS.',
      sources: ['imp:shape'],
    },
    {
      id: 'process-inherit-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle version de l’écran ajouté respecte ce qui est déjà vrai ?',
      context: 'Une appli de réservation de salles de réunion a une identité sobre et cohérente : fond blanc, cartes à bord fin, bleu pour les actions. On y ajoute un écran « Statistiques ».',
      options: [
        { id: 'new-world', visual: statsScreen(false), why: 'Fond sombre, néons violets, cartes translucides, capitales espacées : l’écran ajouté s’invente une autre identité.' },
        { id: 'inherit', visual: statsScreen(true), why: 'Mêmes cartes, même bleu, même typographie : l’écran prolonge l’appli, et l’effort porte sur les chiffres et leur hiérarchie.' },
      ],
      answer: 'inherit',
      explanation: `L’appli a une identité cohérente : l’écran ajouté en **hérite**. Impeccable est explicite : une section, un composant ou un écran ajouté à une surface établie hérite de son monde visuel, et un ajout local ne devient jamais un exercice d’identité.

La version sombre et néon change tout ce qu’il ne fallait pas toucher : fond, couleurs, matières, typographie. On croit avoir changé d’application. Le vrai travail est ailleurs : choisir les bons chiffres, leur hiérarchie, les états vides et le raccord avec les écrans voisins.`,
      takeaway: 'Un écran ajouté à une appli établie hérite de son monde visuel : on résout le contenu, la hiérarchie et les états, pas l’identité.',
      sources: ['imp:new-work'],
    },
    {
      id: 'process-designmd-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel extrait de DESIGN.md guidera le mieux la conception d’un nouvel écran ?',
      options: [
        {
          id: 'raw',
          visual: {
            alt: 'Extrait de DESIGN.md titré « Color Palette & Roles » : une liste de noms techniques (blue-800, gray-500, red-600) avec leurs valeurs, puis « rounded-lg, shadow-md ».',
            css: DOC_CSS,
            html: `<div class="mk-pad"><div class="dm"><p class="dm-file"><i data-icon="file-text" style="--ico:14px"></i> DESIGN.md</p><h4>Color Palette &amp; Roles</h4><p><code>blue-800</code> : #1f4fd8</p><p><code>gray-500</code> : #5a6172</p><p><code>red-600</code> : #b3261e</p><p><code>rounded-lg</code>, <code>shadow-md</code></p></div></div>`,
          },
          why: 'Des valeurs sans rôle ni usage, des noms de classes bruts et un titre non canonique : rien ne dit quand utiliser quoi.',
        },
        {
          id: 'described',
          visual: {
            alt: 'Extrait de DESIGN.md titré « Colors » : un bleu d’action et une ardoise, chacun avec son nom descriptif, sa valeur entre parenthèses et son usage, puis une règle nommée sur la rareté du bleu.',
            css: DOC_CSS,
            html: `<div class="mk-pad"><div class="dm"><p class="dm-file"><i data-icon="file-text" style="--ico:14px"></i> DESIGN.md</p><h4>Colors</h4><h5>Primary</h5><p><b>Bleu d’action</b> (#1f4fd8) : boutons principaux, liens et focus. Jamais en décoration.</p><h5>Neutral</h5><p><b>Ardoise</b> (#5a6172) : texte secondaire et métadonnées.</p><p><b>La règle de la voix unique.</b> Le bleu d’action reste rare : c’est sa rareté qui le rend visible.</p></div></div>`,
          },
          why: 'Nom descriptif, valeur exacte entre parenthèses, usage, interdit et règle nommée : un nouvel écran sait quoi faire.',
        },
      ],
      answer: 'described',
      explanation: `DESIGN.md sert à ce qu’un nouvel écran — conçu par toi, par un collègue ou par un agent — reste dans la marque. Chaque jeton doit donc dire **ce qu’il est, où il sert et pourquoi** :

- un **nom descriptif** et la **valeur exacte entre parenthèses** : « Bleu d’action (#1f4fd8) » plutôt que « blue-800 » ;
- son **usage** et ses interdits ;
- des **règles nommées**, faciles à citer ;
- les **titres canoniques** du format (« Colors », pas « Color Palette & Roles »), que les outils lisent tels quels.

Les noms de classes bruts (\`rounded-lg\`, \`shadow-md\`) n’apprennent rien : on les traduit en langage descriptif, valeur comprise.`,
      takeaway: 'Dans DESIGN.md, chaque jeton a un nom descriptif, sa valeur exacte, son usage et ses interdits ; jamais de noms de classes bruts.',
      sources: ['imp:document'],
    },
    {
      id: 'process-theme-duel',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quel thème sombre sera le plus simple à maintenir ?',
      options: [
        {
          id: 'overrides',
          visual: {
            alt: 'Feuille de style de thème sombre faite de surcharges composant par composant (bouton, carte, titre, métadonnée, champ), suivie de la mention « et 140 règles de plus ».',
            css: CODE_CSS,
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="cd-file"><i data-icon="file-text" style="--ico:14px"></i> dark.css</p><pre class="cd"><span class="c">/* Thème sombre */</span>
.dark .btn-primary { background: #6d8ff0; }
.dark .card { background: #1c2130; }
.dark .card-title { color: #f2f4f8; }
.dark .meta { color: #a3abbd; }
.dark .input { border-color: #3a4256; }
<span class="c">/* … et 140 règles de plus */</span></pre></div>`,
          },
          why: 'Chaque composant a sa surcharge : le moindre nouveau composant oubliera la sienne, et le thème se délite.',
        },
        {
          id: 'semantic',
          visual: {
            alt: 'Feuille de style où des jetons sémantiques (surface, texte, action) pointent vers des primitifs, et où le thème sombre se contente de les rebrancher en trois lignes.',
            css: CODE_CSS,
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="cd-file"><i data-icon="file-text" style="--ico:14px"></i> tokens.css</p><pre class="cd"><span class="c">/* Primitifs déclarés plus haut : --gray-*, --blue-* */</span>
:root {
  --surface: var(--gray-50);
  --text: var(--gray-900);
  --action: var(--blue-600);
}
[data-theme="dark"] {
  --surface: var(--gray-900);
  --text: var(--gray-50);
  --action: var(--blue-300);
}
.btn-primary { background: var(--action); }</pre></div>`,
          },
          why: 'Les composants ne connaissent que des rôles ; le thème rebranche trois jetons et tout suit, y compris les composants à venir.',
        },
      ],
      answer: 'semantic',
      explanation: `Avec une couche de **jetons sémantiques**, les composants ne connaissent que des rôles (\`--surface\`, \`--text\`, \`--action\`). Le thème sombre consiste alors à **rebrancher ces rôles** sur d’autres primitifs : quelques lignes, et chaque composant suit — y compris ceux qui n’existent pas encore.

Sans cette couche, chaque composant reçoit ses surcharges sombres une par une. Le moindre nouveau bouton oublie sa variante, et le thème se délite. C’est la recommandation d’impeccable : des valeurs primitives, des jetons sémantiques, et des thèmes qui remappent les rôles.`,
      takeaway: 'Les composants consomment des jetons sémantiques ; un thème ne fait que rebrancher ces rôles sur d’autres valeurs primitives.',
      sources: ['imp:colorize', 'imp:extract'],
    },
    {
      id: 'process-drift-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux dérives par rapport au système de cet écran.',
      context: 'Le système de l’appli : cartes à bord fin et coins de 12 px, badges arrondis gris-bleu, titres de carte en 15 px gras.',
      visual: {
        frame: 'browser',
        alt: 'Écran Projets : titre, bouton Nouveau projet, onglets Actifs et Archivés, puis trois cartes. Deux suivent le système ; l’une affiche un badge « EN PAUSE » orange à angles droits, l’autre est une carte à angles vifs, grosse ombre et titre en italique léger.',
        css: `.pj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
.pj-card { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; padding: 14px; }
.pj-pause { display: inline-block; padding: 3px 6px; border-radius: 2px; background: #fff0e6; color: #b54708; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; }
.pj-odd { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; padding: 18px; border-radius: 2px; background: #fff; box-shadow: 0 10px 28px rgb(15 20 35 / 0.22); }
.pj-odd-title { font-size: 18px; font-weight: 300; font-style: italic; }`,
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2" data-hotspot="title">Projets</p><span class="mk-btn mk-btn--s" data-hotspot="new"><i data-icon="plus" style="--ico:15px"></i> Nouveau projet</span></div>
  <div class="mk-tabs" data-hotspot="tabs"><span class="mk-tab mk-tab--on">Actifs</span><span class="mk-tab">Archivés</span></div>
  <div class="pj-grid">
    <div class="mk-card pj-card" data-hotspot="card1"><p class="mk-h3">Refonte du site</p><p class="mk-small mk-muted">Échéance 12 déc. · 8 tâches</p><span class="mk-badge">Actif</span></div>
    <div class="mk-card pj-card"><p class="mk-h3">Application mobile</p><p class="mk-small mk-muted">Échéance 30 janv. · 21 tâches</p><span class="pj-pause" data-hotspot="badge">EN PAUSE</span></div>
    <div class="pj-odd" data-hotspot="card"><p class="pj-odd-title">Catalogue printemps</p><p class="mk-small mk-muted">Échéance 4 mars · 5 tâches</p><span class="mk-badge">Actif</span></div>
  </div>
</div>`,
      },
      hotspots: [
        { id: 'card', label: 'Carte « Catalogue printemps »', correct: true, why: 'Angles vifs, grosse ombre, titre en italique léger : une carte recodée à côté du composant Carte partagé. Implémentation isolée, à remplacer par le composant.' },
        { id: 'badge', label: 'Badge « EN PAUSE »', correct: true, why: 'Capitales, angle droit, orange absent du système : soit il manque un jeton pour ce statut, soit il faut une variante du badge existant.' },
        { id: 'card1', label: 'Carte « Refonte du site »', correct: false, why: 'Elle suit le système : bord fin, coins de 12 px, badge arrondi, titre en 15 px gras.' },
        { id: 'title', label: 'Titre de la page', correct: false, why: 'Le titre de page suit l’échelle typographique de l’appli.' },
        { id: 'new', label: 'Bouton « Nouveau projet »', correct: false, why: 'C’est le bouton principal standard du système.' },
        { id: 'tabs', label: 'Onglets', correct: false, why: 'Composant d’onglets standard, état actif souligné.' },
      ],
      explanation: `Un système se lit dans ce qui se répète : ici, la carte à bord fin et coins de 12 px, le badge arrondi gris-bleu, le titre en 15 px gras. Deux éléments s’en écartent :

- la **carte « Catalogue printemps »** : un composant Carte existe, c’est une **implémentation isolée** — on la remplace par le composant partagé ;
- le badge **« EN PAUSE »** : si le système n’a aucune valeur pour ce statut, c’est un **jeton manquant** à créer ; sinon, une variante du badge à ajouter.

Classer la dérive dit où corriger : dans le système, dans le composant, ou sur place.`,
      takeaway: 'Repère le système dans ce qui se répète, puis classe chaque écart : jeton manquant, implémentation isolée, décalage de concept ou défaut local.',
      sources: ['imp:polish', 'imp:extract'],
    },
    {
      id: 'process-product-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les trois passages qui n’ont rien à faire dans PRODUCT.md.',
      visual: {
        alt: 'Fichier PRODUCT.md d’une application de soins infirmiers, en sept sections : utilisateurs, objectif, direction visuelle, capacités et contraintes, preuves disponibles avec un témoignage « à rédiger pour la démo », page d’accueil, accessibilité.',
        css: `.pm { padding: 14px; border: 1px solid #e1e4ea; border-radius: 10px; display: flex; flex-direction: column; gap: 6px; }
.pm-file { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #5a6172; }
.pm-sec { display: flex; flex-direction: column; gap: 2px; padding: 6px 8px; border-radius: 6px; }
.pm-h { font: 700 12px ui-monospace, Menlo, monospace; color: #36405a; }
.pm-sec p:last-child { font-size: 13px; }`,
        html: `<div class="mk-pad"><div class="pm">
  <p class="pm-file"><i data-icon="file-text" style="--ico:14px"></i> PRODUCT.md</p>
  <div class="pm-sec" data-hotspot="users"><p class="pm-h">## Users</p><p>Infirmières et infirmiers libéraux qui notent leurs soins entre deux visites, sur téléphone, souvent garés devant chez le patient.</p></div>
  <div class="pm-sec" data-hotspot="purpose"><p class="pm-h">## Product Purpose</p><p>Saisir un soin en moins de 30 secondes et préparer la télétransmission du soir.</p></div>
  <div class="pm-sec" data-hotspot="visual"><p class="pm-h">## Visual Direction</p><p>Fond crème, accent vert sauge, titres en serif italique.</p></div>
  <div class="pm-sec" data-hotspot="constraints"><p class="pm-h">## Capabilities and Constraints</p><p>Fonctionne hors connexion ; synchronisation au retour du réseau.</p></div>
  <div class="pm-sec" data-hotspot="proof"><p class="pm-h">## Evidence on Hand</p><p>Témoignage à rédiger pour la démo : « Soignly m’a fait gagner une heure par jour. » — Claire, infirmière à Lyon</p></div>
  <div class="pm-sec" data-hotspot="home"><p class="pm-h">## Homepage</p><p>Héros plein écran, puis trois cartes de fonctionnalités, puis les tarifs.</p></div>
  <div class="pm-sec" data-hotspot="a11y"><p class="pm-h">## Accessibility &amp; Inclusion</p><p>Une partie des soignants agrandit le texte du téléphone : l’interface doit tenir à 200 %.</p></div>
</div></div>`,
      },
      hotspots: [
        { id: 'visual', label: 'Direction visuelle', correct: true, why: 'Couleurs et typographie se décident dans le parcours de création et se consignent dans DESIGN.md ; `init` ne demande même pas ces choix. Seule exception : une contrainte de marque existante que l’utilisateur rend obligatoire.' },
        { id: 'proof', label: 'Témoignage « à rédiger pour la démo »', correct: true, why: 'Une preuve inventée n’est pas une preuve. PRODUCT.md note les preuves réelles, et signale celles qui manquent.' },
        { id: 'home', label: 'Composition de la page d’accueil', correct: true, why: 'C’est la stratégie d’une surface : elle vit dans le brief de cette page, pas dans la vérité du produit.' },
        { id: 'users', label: 'Utilisateurs', correct: false, why: 'Qui, dans quelle situation, pour quelle tâche : exactement ce que PRODUCT.md doit contenir.' },
        { id: 'purpose', label: 'Objectif du produit', correct: false, why: 'Ce que le produit permet et ce que veut dire réussir : vérité produit durable.' },
        { id: 'constraints', label: 'Capacités et contraintes', correct: false, why: 'Une contrainte durable qui orientera chaque écran.' },
        { id: 'a11y', label: 'Accessibilité', correct: false, why: 'Un besoin d’accessibilité propre au public : il a toute sa place.' },
      ],
      explanation: `PRODUCT.md consigne la **vérité produit durable** : utilisateurs, objectif, contexte, contraintes, preuves disponibles, accessibilité. Trois passages débordent :

- la **direction visuelle** relève de DESIGN.md et se décide plus tard, avec l’utilisateur ;
- le **témoignage « à rédiger »** est une preuve inventée : on note plutôt qu’aucun témoignage n’est encore disponible ;
- la **composition de la page d’accueil** est une stratégie de surface, qui vit dans le brief de cette page.

Séparer ces trois niveaux — produit, système visuel, surface — évite qu’une décision locale se fige en vérité générale.`,
      takeaway: 'PRODUCT.md garde la vérité produit (public, but, contexte, contraintes, preuves réelles) ; ni choix visuels, ni stratégie de page, ni preuve inventée.',
      sources: [INIT, 'imp:new-work'],
    },
    {
      id: 'process-commands-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque situation à la commande d’impeccable qui y répond.',
      leftTitle: 'Situation',
      rightTitle: 'Commande',
      pairs: [
        { id: 'distill', left: 'Tout se bat pour l’attention : trop de boutons, d’encadrés et d’options', right: '`distill`' },
        { id: 'quieter', left: 'Couleurs saturées et animations partout : l’écran fatigue', right: '`quieter`' },
        { id: 'bolder', left: 'La page est sage et plate, rien ne retient le regard', right: '`bolder`' },
        { id: 'clarify', left: 'Les messages d’erreur et les libellés sont flous', right: '`clarify`' },
        { id: 'audit', left: 'Vérifier contraste, clavier, performance et responsive avant la mise en ligne, avec un score sur 20', right: '`audit`' },
        { id: 'critique', left: 'Obtenir une revue UX notée sur les heuristiques, avec personas', right: '`critique`' },
        { id: 'harden', left: 'Textes très longs, erreurs réseau, traductions : l’écran casse', right: '`harden`' },
      ],
      explanation: `Chaque commande traite une cause précise :

- \`distill\` retire ce qui ne mérite pas sa place ; \`quieter\` baisse l’intensité sans perdre le caractère ; \`bolder\` fait l’inverse, sur une section qui reste en retrait.
- \`clarify\` réécrit les textes d’interface : actions, erreurs, états vides.
- \`audit\` mesure l’implémentation (cinq dimensions sur 20) ; \`critique\` juge l’expérience (heuristiques sur 40, personas, priorités).
- \`harden\` prépare aux données réelles : textes extrêmes, erreurs, langues.

Toutes passent la main à \`polish\` pour la finition.`,
      takeaway: 'Trop chargé : `distill`. Trop criard : `quieter`. Trop sage : `bolder`. Textes flous : `clarify`. Technique : `audit`. Revue UX : `critique`. Cas réels : `harden`.',
      sources: ['imp:skill', 'imp:distill', 'imp:quieter', 'imp:bolder', 'imp:clarify', 'imp:harden'],
    },
    {
      id: 'process-authority-match',
      type: 'match',
      difficulty: 3,
      prompt: 'Associe chaque situation à ce qui fait autorité pour la suite.',
      leftTitle: 'Situation',
      rightTitle: 'Ce qu’on fait',
      pairs: [
        { id: 'redesign', left: 'Le client demande une refonte complète', right: 'Garder la vérité produit, remplacer le monde visuel' },
        { id: 'established', left: 'Identité cohérente dans le code, mais aucun DESIGN.md', right: 'Hériter de cette identité et la documenter' },
        { id: 'partial', left: 'Seuls le logo et la couleur de marque sont confirmés', right: 'Préserver ces acquis et étendre le système avec l’utilisateur' },
        { id: 'blank', left: 'Projet neuf : ni code, ni charte, ni maquette', right: 'Créer un monde visuel avec l’utilisateur' },
      ],
      explanation: `Le parcours de création d’impeccable commence toujours par **décider ce qui est déjà vrai** :

- **Refonte** : le contenu, les fonctions, les contraintes et les engagements de marque restent ; l’ancien look renseigne, mais on le remplace au lieu de le polir.
- **Monde établi** : un DESIGN.md manquant n’efface pas une identité cohérente dans le code ; on la documente (\`document\`).
- **Marque incomplète** : on garde ce qui est confirmé et reconnaissable, et on complète avec l’utilisateur.
- **Aucune autorité visuelle** : on crée un monde, ensemble.

Le piège classique : traiter un monde établi comme une page blanche parce qu’un fichier manque.`,
      takeaway: 'Avant de créer, décide ce qui fait autorité : refonte, monde établi, marque incomplète ou page blanche n’appellent pas la même démarche.',
      sources: ['imp:new-work', 'imp:document'],
    },
    {
      id: 'process-shape-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Remets dans l’ordre le déroulé de la commande `shape`.',
      items: [
        { id: 'r1', label: 'Premier tour : à quoi sert la surface, qui y arrive, à quoi verra-t-on la réussite' },
        { id: 'r2', label: 'Second tour, si un manque important apparaît : contenu réel, états, limites' },
        { id: 'direction', label: 'Résoudre la direction visuelle quand la surface est nouvelle' },
        { id: 'brief', label: 'Rédiger le brief le plus court qui suffise' },
        { id: 'confirm', label: 'Faire confirmer le brief, puis s’arrêter' },
      ],
      explanation: `\`shape\` va du pourquoi au quoi :

1. **But, personnes, résultat** — les questions qui changent le plus le résultat.
2. **Matière, comportement, limites** — seulement si un manque important subsiste.
3. **Direction visuelle** — pour une surface nouvelle, via le parcours de création.
4. **Brief** — trois à cinq puces quand tout est clair, la structure complète pour un sujet ambigu.
5. **Confirmation, puis arrêt** — \`shape\` n’écrit jamais de code.`,
      takeaway: 'Cadrer : but et personnes, puis matière et limites si besoin, direction, brief court, confirmation — et pas de code.',
      sources: ['imp:shape'],
    },
    {
      id: 'process-second-round-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Après le premier tour, tu connais le but, le public et le résultat attendu. Quand lancer un second tour de questions ?',
      options: [
        { id: 'gap', label: 'Seulement si les réponses révèlent un manque important : contenu réel, états, limites, contraintes', why: 'C’est la règle de `shape` : un tour par défaut, un second pour un manque qui changerait le résultat.' },
        { id: 'always', label: 'Toujours, pour couvrir toutes les questions du modèle', why: 'Déverser un questionnaire complet épuise la personne et noie les vraies décisions.' },
        { id: 'style', label: 'Pour demander la palette et la police préférées', why: '`shape` ne demande jamais de valeurs visuelles : la direction se décide ensuite.' },
        { id: 'never', label: 'Jamais : on passe directement à l’écriture du code', why: '`shape` n’écrit jamais de code ; et un manque important mérite un second tour.' },
      ],
      answer: 'gap',
      explanation: `Le cadrage de \`shape\` avance par tours de **deux ou trois questions liées**. Un seul tour suffit par défaut ; on en ajoute un second **seulement si les réponses révèlent un manque important** — sur le contenu réel et ses plages, les états à prévoir, les limites ou les contraintes.

Ce qui est déjà établi ne se redemande pas : on affirme la lecture probable et on invite à la corriger. Le temps de la personne interrogée est une ressource rare.`,
      takeaway: 'Un tour de deux ou trois questions suffit par défaut ; un second seulement pour combler un manque qui changerait le résultat.',
      sources: ['imp:shape'],
    },
    {
      id: 'process-drift-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Comment classer cette dérive ?',
      context: 'Dans l’écran « Notifications », le bouton « Enregistrer » a été recodé à la main — autre bleu, autre arrondi — alors que le composant Bouton du système existe.',
      options: [
        { id: 'token', label: 'Jeton manquant', why: 'Le système possède déjà tout : le bleu et l’arrondi existent dans le composant Bouton.' },
        { id: 'one-off', label: 'Implémentation isolée', why: 'Un composant partagé existe et doit remplacer la copie faite à la main.' },
        { id: 'concept', label: 'Décalage de concept', why: 'Ni le parcours ni la hiérarchie ne sont en cause, seulement l’implémentation d’un bouton.' },
        { id: 'local', label: 'Défaut local', why: 'Corriger la couleur sur place laisserait une copie qui divergera de nouveau : la cause est l’absence du composant partagé.' },
      ],
      answer: 'one-off',
      explanation: `\`polish\` classe chaque dérive avant de la corriger :

- **jeton manquant** : le système a besoin d’une valeur qu’il n’a pas ;
- **implémentation isolée** : un composant ou un motif partagé existe et doit la remplacer ;
- **décalage de concept** : le parcours ou la hiérarchie diffèrent des zones comparables ;
- **défaut local** : l’implémentation est simplement incomplète ou incohérente.

Ici, retoucher le bleu sur place soignerait le symptôme ; remplacer la copie par le composant partagé soigne la cause, au niveau le plus étroit qui soit juste.`,
      takeaway: 'Avant de corriger une dérive, classe-la : jeton manquant, implémentation isolée, décalage de concept ou défaut local — puis corrige la cause.',
      sources: ['imp:polish'],
    },
    {
      id: 'process-invention-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quelle démarche suivre ?',
      context: 'Une appli de gestion de stock a un monde visuel établi et documenté. On te demande une page entière nouvelle, « Rapports », dont la structure n’est pas encore décidée.',
      options: [
        { id: 'structures', label: 'Garder le système visuel fixe et explorer plusieurs structures réellement différentes, tirées des données et des tâches, avant d’en retenir une', why: 'C’est le cas « surface entière dans un monde établi » : l’identité est réglée, la composition reste à trouver.' },
        { id: 'world', label: 'Lancer un atelier de direction visuelle complet pour donner à la page sa propre identité', why: 'Le monde est établi : on ne rouvre pas l’identité pour une surface qui en hérite.' },
        { id: 'copy', label: 'Recopier la mise en page de la page la plus proche, sans explorer d’autres structures', why: 'Ce serait juste pour étendre une surface existante ; pour une page entière à la structure ouverte, il faut explorer.' },
        { id: 'accent', label: 'Ajouter une couleur d’accent propre aux rapports pour qu’ils se distinguent', why: 'Une nouvelle couleur modifie le système : elle exige l’accord explicite de l’utilisateur, pas une initiative locale.' },
      ],
      answer: 'structures',
      explanation: `Impeccable dose l’invention en trois niveaux :

- **Étendre une surface** (une section, un état) : on hérite du monde et de la composition.
- **Créer une surface entière dans un monde établi** : le système visuel reste fixe, mais on explore cinq à sept structures réellement différentes, tirées du contenu, de la tâche et des comportements, avant d’en retenir une.
- **Créer ou remplacer le monde** : seulement là, on cherche une identité neuve.

« Rapports » est une page entière à la structure ouverte, dans un monde établi : on explore la composition, pas l’identité.`,
      takeaway: 'Dose l’invention : étendre hérite de tout, une surface entière explore sa structure dans le système, seul un nouveau monde réinvente l’identité.',
      sources: ['imp:new-work'],
    },
    {
      id: 'process-tokens-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquelles de ces valeurs méritent de devenir un jeton du système ?',
      options: [
        { id: 'action', label: 'Le bleu des actions principales, présent sur 14 boutons et liens', why: 'Réutilisé partout avec la même intention : c’est le jeton sémantique « action » par excellence.' },
        { id: 'gap', label: 'L’espacement de 16 px entre les champs de tous les formulaires', why: 'Un rythme répété avec la même intention : un jeton d’espacement évite les 15 et 17 px qui dérivent.' },
        { id: 'duration', label: 'La durée de 200 ms des changements d’état, réutilisée partout', why: 'Le mouvement aussi se systématise : une durée partagée garde les transitions cohérentes.' },
        { id: 'gradient', label: 'Le dégradé de l’unique illustration de la page 404', why: 'Utilisé une seule fois : en faire un jeton pollue le système.' },
        { id: 'chart', label: 'Le 13 px d’un seul libellé de graphique, par exception', why: 'Une exception locale ne justifie pas une abstraction du système.' },
      ],
      answers: ['action', 'gap', 'duration'],
      explanation: `\`extract\` pose une règle simple : on n’extrait que ce qui revient **au moins trois fois avec la même intention**, et un jeton doit avoir un **sens** (un rôle), pas seulement une valeur. Créer un jeton pour chaque valeur est un écueil cité explicitement.

\`polish\` le dit à sa façon : on promeut en jeton les valeurs vraiment réutilisables, mais on ne crée pas d’abstraction pour une exception locale. Couleur d’action, rythme d’espacement, durée de transition : oui. Dégradé unique, taille d’exception : non.`,
      takeaway: 'Un jeton naît d’une valeur réutilisée au moins trois fois avec la même intention, et il porte un rôle ; les exceptions restent locales.',
      sources: ['imp:extract', 'imp:polish'],
    },
    {
      id: 'process-extract-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un composant utilisé une seule fois mérite d’entrer dans le design system, pour préparer l’avenir.',
      answer: false,
      explanation: `\`extract\` n’extrait que ce qui revient **au moins trois fois avec la même intention**. Son principe : l’**abstraction prématurée est pire que la duplication**. Un composant généralisé trop tôt fige de mauvaises hypothèses et devient si générique qu’il ne sert plus.

Les systèmes de design grandissent par incréments : on extrait ce qui est clairement réutilisable maintenant, pas tout ce qui pourrait l’être un jour.`,
      takeaway: 'N’extrais un composant ou un jeton qu’à partir de trois usages avec la même intention : l’abstraction prématurée coûte plus que la duplication.',
      sources: ['imp:extract'],
    },
    {
      id: 'process-shape-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Une fois le brief confirmé, la commande `shape` enchaîne sur l’écriture du code.',
      answer: false,
      explanation: `\`shape\` présente le brief, obtient une confirmation (ou un tour de correction), **puis s’arrête** : il n’écrit jamais de code ni de contrat de direction.

Séparer le cadrage de la construction protège la décision : on valide ce qu’il faut faire avant que le temps investi dans le code ne pousse à défendre une mauvaise piste. La construction se lance ensuite, à partir du brief confirmé.`,
      takeaway: '`shape` s’arrête au brief confirmé : cadrer et construire sont deux étapes distinctes.',
      sources: ['imp:shape'],
    },
  ],
};

export default processModule;
