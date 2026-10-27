import type { ModuleContent, SourceRef } from '../../engine/types';

/*
 * Contrast ratios quoted below were computed with the WCAG formula of src/engine/grade.ts:
 * #9aa0a6 on #23557a = 3.00:1, #c7dcef on #23557a = 5.62:1, white on #23557a = 7.92:1.
 */

const LAWS_HICK: SourceRef = { label: 'Laws of UX — Loi de Hick', url: 'https://lawsofux.com/hicks-law/' };
const LAWS_RESTORFF: SourceRef = { label: 'Laws of UX — Effet von Restorff (effet d’isolement)', url: 'https://lawsofux.com/von-restorff-effect/' };
const LAWS_TESLER: SourceRef = { label: 'Laws of UX — Loi de Tesler (conservation de la complexité)', url: 'https://lawsofux.com/teslers-law/' };
const NNG_PROGRESSIVE: SourceRef = { label: 'Nielsen Norman Group — Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' };
const NNG_ICONS: SourceRef = { label: 'Nielsen Norman Group — Icon Usability', url: 'https://www.nngroup.com/articles/icon-usability/' };
const SAINT_EX: SourceRef = { label: 'Antoine de Saint-Exupéry — Terre des hommes (1939), chapitre « L’avion »' };

/* ---------- Shared mock pieces ---------- */

const INVOICE_HEAD = `<div class="mk-row" style="--gap:8px"><p class="mk-h2">Facture F-2026-118</p><span class="mk-badge">Brouillon</span></div>
  <p class="mk-small mk-muted">Studio Lumen · 2 400,00&nbsp;€ HT · échéance le 30 novembre</p>`;

const INVOICE_LINES = `<div class="mk-divider"></div>
  <div class="mk-row mk-between"><span>Refonte du site vitrine</span><span class="mk-price">2 000,00&nbsp;€</span></div>
  <div class="mk-row mk-between"><span>Hébergement annuel</span><span class="mk-price">400,00&nbsp;€</span></div>`;

const EDITOR_BODY = `<div class="mk-pad mk-stack" style="--gap:8px">
    <p class="mk-h3">Lettre d’information — novembre</p>
    <p class="mk-muted">Bonjour à toutes et à tous, voici les nouveautés de l’atelier&nbsp;: deux nouveaux cours du soir et une journée portes ouvertes le 22 novembre.</p>
  </div>`;

const EDITOR_CSS = `
.int-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 10px; border-bottom: 1px solid #e3e6ec; background: #f7f8fa; }
.int-ico { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 6px; color: #36405a; }
.int-tool { display: inline-flex; align-items: center; gap: 5px; height: 32px; padding: 0 8px; border-radius: 6px; color: #1d2230; font-weight: 600; font-size: 13px; }
.int-push { margin-inline-start: auto; }
`;

const SERIF = `Charter, 'Bitstream Charter', 'Iowan Old Style', Georgia, serif`;

const intensity: ModuleContent = {
  id: 'intensity',
  title: 'Doser l’intensité : simplifier, intensifier, adoucir',
  category: 'affiner',
  summary:
    'Retirer ce qui n’a pas sa place, amplifier une section terne sans sortir du système, et calmer une interface criarde sans la rendre générique.',
  minutes: 11,
  commands: ['distill', 'bolder', 'quieter'],
  sources: ['imp:distill', 'imp:bolder', 'imp:quieter', LAWS_HICK, LAWS_RESTORFF, LAWS_TESLER, NNG_PROGRESSIVE, 'refactoring-ui', SAINT_EX],
  sections: [
    {
      id: 'diagnostic',
      title: 'Trois réglages pour un même but',
      body: `Trois commandes d’impeccable règlent l’**intensité** d’une interface existante, sans changer d’univers :

- **Simplifier** (*distill*) : l’écran est encombré. On retire ce qui ne mérite pas sa place — éléments redondants, informations répétées, bruit décoratif, complexité cosmétique.
- **Intensifier** (*bolder*) : une partie paraît terne, timide. On l’amène au niveau de conviction que le reste du système implique déjà.
- **Adoucir** (*quieter*) : l’interface est trop forte, agressive, fatigante. On baisse l’intensité sans perdre la personnalité.

Dans les trois cas, l’identité en place est préservée, et une passe de finition (*polish*) vient ensuite. Avant de choisir, nomme les **sources** du problème :

- encombrement : trop d’éléments, trop de variations (couleurs, polices, tailles), tout visible à la fois, bordures et ombres sans rôle, hiérarchie confuse, fonctions qui s’accumulent ;
- excès : couleurs saturées, contrastes extrêmes partout, trop d’éléments gras, animation en excès, tout en grand ;
- platitude : une section qui n’utilise pas les gestes forts que ses voisines utilisent déjà.`,
    },
    {
      id: 'simplifier',
      title: 'Simplifier : un but, une action principale',
      body: `Commence par l’**essentiel** : quel est l’objectif principal de l’utilisateur sur cet écran ? Il n’y en a qu’**un**. Qu’est-ce qui est nécessaire, qu’est-ce qui est seulement agréable ? Quels sont les 20 % qui apportent 80 % de la valeur ? Attends-toi à dire non à de bonnes idées pour faire de la place à une exécution excellente.

- **Une action principale**, quelques actions secondaires, tout le reste en tertiaire ou masqué. La loi de Hick le rappelle : le temps de décision augmente avec le nombre et la complexité des choix.
- **Divulgation progressive** : montre d’abord l’essentiel et range la complexité derrière des points d’entrée clairs (accordéon, « Options avancées », étape suivante).
- **Budget visuel** : 1 à 2 couleurs plus des neutres, une seule famille de police, 3 à 4 tailles, 2 à 3 graisses, une seule échelle d’espacement.
- **Moins de contenants** : supprime les bordures, ombres et fonds qui ne servent ni la hiérarchie ni la fonction. Pas de carte pour une simple mise en page — l’espacement et l’alignement suffisent — et jamais de cartes imbriquées.
- **Moins d’étapes** : valeurs par défaut intelligentes, édition en place plutôt qu’en fenêtre modale, une étape de moins quand c’est possible.
- **Moins de mots** : coupe le remplissage, pas le sens ; voix active (« Enregistrer » plutôt que « Les modifications seront enregistrées ») ; dis chaque chose une seule fois.

> « Il semble que la perfection soit atteinte non quand il n’y a plus rien à ajouter, mais quand il n’y a plus rien à retrancher. » — Antoine de Saint-Exupéry, *Terre des hommes* (1939)`,
      examples: [
        {
          title: 'Le budget visuel',
          bad: {
            alt: 'Carte d’atelier de céramique mêlant un titre à empattements bordeaux, une date en police à chasse fixe bleu-vert, un prix rouge, un badge jaune, un bouton orange et un lien violet.',
            html: `<div class="mk-pad"><div class="mk-card mk-stack" style="--gap:8px">
  <p style="font-family:${SERIF};font-size:22px;color:#7c2d12;font-weight:700">Atelier céramique</p>
  <p style="font-family:'DejaVu Sans Mono',monospace;font-size:12px;color:#0e7490">SAM. 15/11 — 14H00</p>
  <p style="font-size:15px;font-style:italic;color:#374151">Tournage, émaillage et cuisson : repartez avec deux bols faits main.</p>
  <div class="mk-row mk-between"><span style="font-size:21px;font-weight:800;color:#dc2626">65&nbsp;€</span><span style="background:#fde047;color:#000;font-size:11px;font-weight:800;padding:3px 8px;border-radius:4px">PLUS QUE 3 PLACES</span></div>
  <div class="mk-row mk-between"><span style="color:#7c3aed;text-decoration:underline;font-size:13px">Offrir cet atelier</span><span class="mk-btn" style="background:#ea580c;border-radius:999px">Réserver</span></div>
</div></div>`,
          },
          badNote: 'Trois familles, sept couleurs, six tailles : chaque élément réclame l’attention, aucun ne l’obtient.',
          good: {
            alt: 'Même carte d’atelier avec une seule police, un seul bleu pour les actions, des gris pour les informations secondaires et trois tailles de texte.',
            html: `<div class="mk-pad"><div class="mk-card mk-stack" style="--gap:8px">
  <p class="mk-h2">Atelier céramique</p>
  <p class="mk-small mk-muted">Samedi 15 novembre · 14 h</p>
  <p>Tournage, émaillage et cuisson : repartez avec deux bols faits main.</p>
  <div class="mk-row mk-between"><span class="mk-price" style="font-size:18px">65&nbsp;€</span><span class="mk-small mk-muted">Plus que 3 places</span></div>
  <div class="mk-row mk-between"><span class="mk-btn mk-btn--text">Offrir cet atelier</span><span class="mk-btn">Réserver</span></div>
</div></div>`,
          },
          goodNote: 'Une famille, un bleu d’action plus des neutres, trois tailles, deux graisses : la réservation saute aux yeux.',
        },
      ],
    },
    {
      id: 'pieges',
      title: 'Simplifier sans amputer',
      body: `La simplicité ne consiste pas à retirer des fonctions, mais à retirer les **obstacles** entre les gens et leur but. Chaque élément doit justifier sa présence — et certains la justifient pleinement.

- **Simplicité ≠ amputation** : une fonction dont les gens ont besoin reste accessible, au besoin un niveau plus loin.
- **Mystère ≠ minimalisme** : une rangée d’icônes sans libellé paraît épurée, mais oblige à deviner. Seules quelques icônes sont comprises de presque tous (accueil, impression, loupe de recherche) ; les autres ont besoin d’un mot. Les libellés et les noms accessibles restent obligatoires.
- Ne retire pas l’information nécessaire pour **décider** (frais, délais, conditions).
- Ne supprime pas toute **hiérarchie** : certaines choses doivent ressortir.
- Ne simplifie pas un domaine complexe au-delà de sa complexité réelle. La loi de Tesler (conservation de la complexité) le dit : une part de complexité est irréductible ; elle est assumée soit par le système, soit par l’utilisateur.

Vérifie ensuite que la simplification améliore vraiment l’usage : tâche plus rapide, charge mentale réduite, rien d’indispensable perdu, hiérarchie plus claire. Et **documente** ce que tu as retiré, avec un autre point d’accès si besoin.`,
      examples: [
        {
          title: 'Mystère ou minimalisme',
          bad: {
            alt: 'Application de recettes sur téléphone dont la barre d’onglets ne montre que cinq icônes sans libellé.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h2">Ce soir, on cuisine quoi&#8239;?</p>
  <div class="mk-grid" style="--gap:10px"><div class="mk-stack" style="--gap:4px"><div class="mk-img"></div><p class="mk-small mk-strong">Velouté de potimarron</p></div><div class="mk-stack" style="--gap:4px"><div class="mk-img"></div><p class="mk-small mk-strong">Tarte fine aux poireaux</p></div></div>
</div>
<div class="mk-tabbar"><span class="on"><i data-icon="house" style="--ico:22px"></i></span><span><i data-icon="sparkles" style="--ico:22px"></i></span><span><i data-icon="list" style="--ico:22px"></i></span><span><i data-icon="bookmark" style="--ico:22px"></i></span><span><i data-icon="user" style="--ico:22px"></i></span></div>`,
          },
          badNote: 'Épuré, mais que cachent l’étincelle et la liste ? Il faut toucher pour le savoir.',
          good: {
            alt: 'Même application dont la barre d’onglets associe chaque icône à un libellé : Accueil, Idées, Courses, Favoris, Profil.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h2">Ce soir, on cuisine quoi&#8239;?</p>
  <div class="mk-grid" style="--gap:10px"><div class="mk-stack" style="--gap:4px"><div class="mk-img"></div><p class="mk-small mk-strong">Velouté de potimarron</p></div><div class="mk-stack" style="--gap:4px"><div class="mk-img"></div><p class="mk-small mk-strong">Tarte fine aux poireaux</p></div></div>
</div>
<div class="mk-tabbar"><span class="on"><i data-icon="house" style="--ico:20px"></i>Accueil</span><span><i data-icon="sparkles" style="--ico:20px"></i>Idées</span><span><i data-icon="list" style="--ico:20px"></i>Courses</span><span><i data-icon="bookmark" style="--ico:20px"></i>Favoris</span><span><i data-icon="user" style="--ico:20px"></i>Profil</span></div>`,
          },
          goodNote: 'Le même nombre d’onglets, mais chacun dit ce qu’il ouvre : la simplicité n’a rien coûté en clarté.',
        },
      ],
    },
    {
      id: 'intensifier',
      title: 'Intensifier : un geste décisif, dans le système',
      body: `« Plus audacieux » est presque toujours une demande d’**amplification ciblée** : une section existe, et le reste de la page et son système sont donnés.

- **Le périmètre est souverain** : « tout le reste ne bouge pas » s’entend littéralement. Ne restyle pas les voisines ; n’ajoute ni couleur, ni police, ni rayon, ni ombre, ni primitive que la surface ne possède pas. Si le système ne peut vraiment pas exprimer la direction, demande, en nommant l’ajout précis et son rôle.
- **Pourquoi c’est plat** : une section terne est souvent celle qui n’utilise pas les gestes forts que ses voisines utilisent déjà — la typo d’affichage à pleine puissance, le motif signature, la densité, le rythme.
- **Amplifie ce que le système possède** : la version audacieuse doit ressembler *davantage* à la même marque, pas moins.
- **Engage-toi, puis clarifie** : fais un geste décisif complètement, puis calme tout ce qui l’entoure pour qu’il se lise. Si tout devient plus fort, la section devient plus plate.
- **Donne-lui son rythme** : un pic dans le défilement, un changement de densité ou de cadence.
- **Garde le contenu vrai** : les affirmations restent celles du client.

Le réflexe « plus d’effets » (ombres, dégradés, animations) est le contraire de l’audace : rejette-le d’abord.

**Le test du squelette** : retire le texte de la section et regarde la structure nue. Si elle ne dit plus ce qu’est la section ni pourquoi elle compte, l’audace est dans la taille du texte, pas dans le design.`,
      examples: [
        {
          title: 'Le test du squelette',
          bad: {
            alt: 'Squelette gris d’une section : une barre de titre et trois colonnes identiques de lignes grises.',
            html: `<div class="mk-pad-l mk-stack" style="--gap:16px">
  <span class="int-sk" style="width:40%;height:14px"></span>
  <div class="mk-grid" style="--cols:3;--gap:14px">
    <div class="mk-stack" style="--gap:8px"><span class="int-sk" style="height:18px;width:60%"></span><span class="int-sk"></span><span class="int-sk" style="width:80%"></span></div>
    <div class="mk-stack" style="--gap:8px"><span class="int-sk" style="height:18px;width:60%"></span><span class="int-sk"></span><span class="int-sk" style="width:80%"></span></div>
    <div class="mk-stack" style="--gap:8px"><span class="int-sk" style="height:18px;width:60%"></span><span class="int-sk"></span><span class="int-sk" style="width:80%"></span></div>
  </div>
</div>`,
            css: `.int-sk { display: block; height: 8px; border-radius: 4px; background: #d9dee6; }`,
          },
          badNote: 'Sans le texte, la section est identique à ses voisines : son « audace » ne tenait qu’à des mots plus gros.',
          good: {
            alt: 'Squelette d’une section sur un aplat sombre : un très grand bloc à gauche, une courte ligne à côté, puis deux petits éléments en dessous.',
            html: `<div class="int-band">
  <div class="mk-row" style="--gap:18px;align-items:flex-end">
    <span class="int-sk int-sk--hero"></span>
    <div class="mk-stack mk-grow" style="--gap:8px;padding-bottom:6px"><span class="int-sk int-sk--d"></span><span class="int-sk int-sk--d" style="width:70%"></span></div>
  </div>
  <div class="mk-row" style="--gap:28px"><span class="int-sk int-sk--d" style="width:70px;height:12px"></span><span class="int-sk int-sk--d" style="width:90px;height:12px"></span></div>
</div>`,
            css: `.int-band { display: flex; flex-direction: column; gap: 22px; padding: 26px 24px; background: #1e5b4a; border-radius: 10px; }
.int-sk { display: block; height: 8px; border-radius: 4px; }
.int-sk--hero { width: 46%; height: 64px; border-radius: 8px; background: rgb(255 255 255 / 0.85); flex: none; }
.int-sk--d { background: rgb(255 255 255 / 0.35); }`,
          },
          goodNote: 'Même sans texte, la structure dit ce qui compte : un chiffre géant, un changement de densité, un pic dans le défilement.',
        },
      ],
    },
    {
      id: 'adoucir',
      title: 'Adoucir : baisser le volume avec précision',
      body: `Adoucir demande **plus** de précision qu’intensifier. Le sens dépend du mode : sur une page qui doit convaincre, une palette plus retenue, plus de blanc, plus d’air typographique — le drame baisse sans disparaître ; dans une application, moins de bruit — fonds d’accent, cartes plus plates, moins de couleur et de mouvement.

- **Couleur** : désature (des teintes pleinement saturées vers 70–85 % de saturation), réduis le nombre de couleurs, laisse les **neutres dominer** et garde la couleur pour les accents (la règle des 10 %). Préfère des gris teintés, chauds ou froids, au gris pur. Garde le contraste fort là où il compte.
- **Poids** : baisse les graisses (900 → 600, 700 → 500), allège ou supprime les bordures, augmente l’espace.
- **Effets** : retire dégradés, ombres multiples, lueurs et motifs qui ne servent à rien.
- **Mouvement** : distances plus courtes (10 à 20 px plutôt que 40), une décélération douce (*ease-out*), jamais de rebond ni d’élastique ; supprime les animations sans rôle.
- **Composition** : écarts d’échelle plus faibles, alignement sur la grille, rythme d’espacement régulier.
- **Jamais de gris sur une couleur** : sur un fond coloré, le texte secondaire prend une nuance de cette couleur (ou du blanc en transparence), pas un gris qui paraît sale.`,
      examples: [
        {
          title: 'Une alerte qui informe sans hurler',
          bad: {
            alt: 'Alerte de paiement en retard sur fond rouge vif, texte blanc très gras en capitales avec points d’exclamation, épaisse bordure jaune et halo rouge.',
            html: `<div class="mk-pad"><div class="int-alarm">
  <p class="int-alarm-h">PAIEMENT EN RETARD&#8239;!!!</p>
  <p>LA FACTURE F-2026-097 DE 1 240,00&nbsp;€ AURAIT DÛ ÊTRE RÉGLÉE LE 15 OCTOBRE.</p>
  <span class="int-alarm-btn">RELANCER MAINTENANT</span>
</div></div>`,
            css: `.int-alarm { display: flex; flex-direction: column; gap: 8px; padding: 16px; background: #ff0000; color: #fff; border: 4px solid #ffd400; border-radius: 12px; box-shadow: 0 0 24px 6px rgb(255 0 0 / 0.55); font-weight: 800; }
.int-alarm-h { font-size: 20px; font-weight: 900; letter-spacing: 0.04em; }
.int-alarm-btn { align-self: flex-start; padding: 8px 14px; border-radius: 6px; background: #ffd400; color: #000; font-weight: 900; }`,
          },
          badNote: 'Rouge pur, capitales en 900, bordure épaisse et halo : l’alerte agresse, et toutes les suivantes devront crier plus fort.',
          good: {
            alt: 'Même alerte sur fond rouge très pâle, titre rouge foncé en graisse moyenne, fine bordure, icône d’alerte et bouton secondaire.',
            html: `<div class="mk-pad"><div class="int-calm-alert">
  <i data-icon="circle-alert" style="--ico:20px"></i>
  <div class="mk-stack" style="--gap:6px">
    <p class="int-calm-h">Paiement en retard</p>
    <p>La facture F-2026-097 de 1 240,00&nbsp;€ aurait dû être réglée le 15 octobre.</p>
    <span class="mk-btn mk-btn--ghost mk-btn--s" style="align-self:flex-start">Relancer le client</span>
  </div>
</div></div>`,
            css: `.int-calm-alert { display: flex; gap: 10px; padding: 14px; background: #fdecec; color: #8f1d1d; border: 1px solid #f3c4c4; border-radius: 10px; }
.int-calm-h { font-weight: 600; font-size: 15px; }`,
          },
          goodNote: 'Teinte pâle, rouge foncé en graisse 600, bordure fine : l’urgence reste lisible (7,8:1) sans saturer l’écran.',
        },
      ],
    },
    {
      id: 'calme-generique',
      title: 'Calme ne veut pas dire générique',
      body: `Le piège de l’adoucissement est le **calme générique** : du texte gris sur fond blanc, une seule police sans empattements dans une graisse uniforme, une grille de cartes identiques. C’est de la retenue sans point de vue.

- **Calme ≠ niveaux de gris** : on retire de la couleur, pas toute la couleur.
- **Calme ≠ tout pareil** : la hiérarchie reste nécessaire ; garde quelques **ancres** fortes.
- **Calme ≠ sans caractère** : la personnalité passe par le raffinement — un neutre teinté, un accent bien placé, une typographie juste.
- **Calme ≠ moins utilisable** : les éléments fonctionnels gardent des affordances nettes.

Vérifie à la fin : est-ce toujours fonctionnel ? toujours reconnaissable ? plus agréable à lire longtemps ? La retenue est-elle **présente**, plutôt que l’intention **absente** ?`,
    },
  ],
  rules: [
    { id: 'one-goal', front: 'Combien d’objectifs principaux un écran simplifié doit-il servir ?', back: 'Un seul : une action principale, quelques actions secondaires, le reste en tertiaire ou masqué.' },
    { id: 'budget', front: 'Quel budget visuel vise une simplification ?', back: '1 à 2 couleurs plus des neutres, une famille de police, 3 à 4 tailles, 2 à 3 graisses.' },
    { id: 'disclosure', front: 'Qu’est-ce que la divulgation progressive ?', back: 'Montrer d’abord l’essentiel et ranger la complexité derrière des points d’entrée clairs : accordéon, « Options avancées », étape suivante.' },
    { id: 'not-amputate', front: 'Simplifier, est-ce retirer des fonctions ?', back: 'Non : on retire les obstacles entre l’utilisateur et son but, pas les fonctions dont il a besoin.' },
    { id: 'mystery', front: 'Où passe la limite entre minimalisme et mystère ?', back: 'Dès que l’utilisateur doit deviner — icône sans libellé, action cachée sans indice —, ce n’est plus du minimalisme mais du mystère.' },
    { id: 'saint-ex', front: 'Selon Saint-Exupéry, quand la perfection est-elle atteinte ?', back: 'Non quand il n’y a plus rien à ajouter, mais quand il n’y a plus rien à retrancher (Terre des hommes, 1939).' },
    { id: 'scope', front: 'On te demande une section « plus audacieuse » : que peux-tu modifier ?', back: 'Seulement la cible nommée, avec les moyens du système : ni les voisines, ni nouvelle couleur, police ou primitive sans le demander.' },
    { id: 'commit', front: 'Pourquoi « tout rendre plus fort » échoue-t-il ?', back: 'Si tout monte, rien ne ressort et la section devient plus plate. Un geste décisif, puis du calme autour.' },
    { id: 'skeleton', front: 'Qu’est-ce que le test du squelette ?', back: 'Retirer le texte et regarder la structure nue : si elle ne dit plus pourquoi la section compte, l’audace n’est que dans la taille du texte.' },
    { id: 'desaturate', front: 'Comment adoucir une palette criarde ?', back: 'Désaturer vers 70–85 %, réduire le nombre de couleurs, laisser dominer des neutres teintés et garder la couleur pour les accents.' },
    { id: 'weights', front: 'Comment alléger les graisses sans perdre la hiérarchie ?', back: 'Descendre d’un ou deux crans (900 → 600, 700 → 500) en gardant quelques ancres fortes.' },
    { id: 'gray-on-color', front: 'Texte secondaire sur fond coloré : quelle couleur ?', back: 'Jamais du gris : une nuance de la couleur du fond (ou du blanc en transparence), avec au moins 4,5:1.' },
    { id: 'generic', front: 'À quoi ressemble un calme générique ?', back: 'Du gris sur blanc, une seule graisse partout, une grille de cartes identiques : de la retenue sans point de vue.' },
    { id: 'quiet-motion', front: 'Comment adoucir une animation ?', back: 'Distances plus courtes (10 à 20 px), décélération douce, jamais de rebond ni d’élastique — ou pas d’animation si elle ne sert à rien.' },
  ],
  exercises: [
    {
      id: 'intensity-primary-action-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel en-tête de facture rend l’action suivante la plus évidente ?',
      options: [
        {
          id: 'all-equal',
          visual: {
            alt: 'En-tête de facture en brouillon suivi de six boutons pleins de même taille : Envoyer, Télécharger le PDF, Dupliquer, Modifier, Partager et Supprimer en rouge.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  ${INVOICE_HEAD}
  <div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn mk-btn--s">Envoyer</span><span class="mk-btn mk-btn--s">Télécharger le PDF</span><span class="mk-btn mk-btn--s">Dupliquer</span><span class="mk-btn mk-btn--s">Modifier</span><span class="mk-btn mk-btn--s">Partager</span><span class="mk-btn mk-btn--s mk-btn--danger">Supprimer</span></div>
  ${INVOICE_LINES}
</div>`,
          },
          why: 'Six boutons de même poids : il faut tous les lire pour trouver le bon, et la suppression est aussi visible que l’envoi.',
        },
        {
          id: 'one-primary',
          visual: {
            alt: 'En-tête de facture en brouillon avec un bouton principal Envoyer la facture, un bouton secondaire Télécharger le PDF et un bouton de menu.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  ${INVOICE_HEAD}
  <div class="mk-row mk-wrap" style="--gap:8px"><span class="mk-btn"><i data-icon="send" style="--ico:15px"></i>Envoyer la facture</span><span class="mk-btn mk-btn--ghost">Télécharger le PDF</span><span class="mk-btn mk-btn--ghost" style="padding:0 10px" aria-label="Plus d’actions"><i data-icon="ellipsis"></i></span></div>
  ${INVOICE_LINES}
</div>`,
          },
          why: 'Une action principale évidente, une secondaire, le reste dans un menu : la prochaine étape saute aux yeux.',
        },
      ],
      answer: 'one-primary',
      explanation: `Simplifier, c’est d’abord trouver **le** but de l’écran. Pour une facture en brouillon, c’est l’envoyer. La loi de Hick le rappelle : plus il y a de choix de même poids, plus la décision prend de temps.

Impeccable demande **une action principale**, quelques actions secondaires, et le reste en tertiaire ou masqué. Dupliquer, partager ou supprimer restent disponibles — un clic plus loin, ce qui protège au passage de la suppression accidentelle.`,
      takeaway: 'Un écran, un but : une action principale, quelques secondaires, le reste un niveau plus loin.',
      sources: ['imp:distill', LAWS_HICK],
    },
    {
      id: 'intensity-mystery-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle barre d’outils d’éditeur est la plus simple à prendre en main ?',
      options: [
        {
          id: 'icons',
          visual: {
            alt: 'Éditeur de lettre d’information avec une barre de huit icônes sans libellé.',
            html: `<div class="int-bar"><span class="int-ico"><i data-icon="image"></i></span><span class="int-ico"><i data-icon="paperclip"></i></span><span class="int-ico"><i data-icon="list"></i></span><span class="int-ico"><i data-icon="layout-grid"></i></span><span class="int-ico"><i data-icon="sparkles"></i></span><span class="int-ico"><i data-icon="sliders-horizontal"></i></span><span class="int-ico"><i data-icon="eye"></i></span><span class="int-ico"><i data-icon="send"></i></span></div>
  ${EDITOR_BODY}`,
            css: EDITOR_CSS,
          },
          why: 'Huit icônes sans libellé : l’interface paraît épurée, mais chaque action se devine. C’est du mystère, pas du minimalisme.',
        },
        {
          id: 'labeled',
          visual: {
            alt: 'Même éditeur avec trois outils nommés Image, Fichier et Aperçu, un menu Plus et un bouton Envoyer.',
            html: `<div class="int-bar"><span class="int-tool"><i data-icon="image" style="--ico:16px"></i>Image</span><span class="int-tool"><i data-icon="paperclip" style="--ico:16px"></i>Fichier</span><span class="int-tool"><i data-icon="eye" style="--ico:16px"></i>Aperçu</span><span class="int-tool">Plus<i data-icon="chevron-down" style="--ico:14px"></i></span><span class="mk-btn mk-btn--s int-push">Envoyer</span></div>
  ${EDITOR_BODY}`,
            css: EDITOR_CSS,
          },
          why: 'Moins d’actions visibles, chacune nommée, le reste regroupé dans « Plus » : on comprend sans survoler.',
        },
      ],
      answer: 'labeled',
      explanation: `Retirer les libellés donne une impression de simplicité, mais déplace l’effort vers l’utilisateur : il doit deviner, survoler, se tromper. Impeccable le formule ainsi : **mystère ≠ minimalisme**. Nielsen Norman Group observe que seules quelques icônes sont comprises de presque tous (accueil, impression, loupe de recherche) ; la plupart ont besoin d’un mot.

La vraie simplification réduit le **nombre** d’actions visibles et regroupe les autres, en gardant des noms clairs — et des noms accessibles pour les lecteurs d’écran.`,
      takeaway: 'Une icône sans libellé est une devinette : simplifie en réduisant les actions visibles, pas en retirant les mots.',
      sources: ['imp:distill', NNG_ICONS],
    },
    {
      id: 'intensity-bolder-duel',
      type: 'choice',
      difficulty: 3,
      context:
        'Le site d’un cabinet d’expertise comptable utilise un vert sapin, une police à empattements pour les titres et beaucoup de blanc. On t’a demandé de rendre la section « Chiffres clés » plus audacieuse, sans toucher au reste.',
      prompt: 'Quelle version répond le mieux à la demande ?',
      options: [
        {
          id: 'louder',
          visual: {
            alt: 'Section Chiffres clés sur un dégradé vert, titre blanc en capitales très grasses, trois cartes blanches à ombre portée avec des chiffres orange, violet et vert.',
            html: `<div class="int-loud">
  <p class="int-loud-h">CHIFFRES CLÉS</p>
  <div class="mk-grid" style="--cols:3;--gap:10px">
    <div class="int-loud-card"><b style="color:#ea580c">12 400</b><span>DOSSIERS EN 2025</span></div>
    <div class="int-loud-card"><b style="color:#7c3aed">38</b><span>EXPERTS-COMPTABLES</span></div>
    <div class="int-loud-card"><b style="color:#16a34a">4</b><span>BUREAUX EN BRETAGNE</span></div>
  </div>
</div>`,
            css: `.int-loud { display: flex; flex-direction: column; gap: 14px; padding: 20px; background: linear-gradient(135deg, #1e5b4a, #34c38f); border-radius: 10px; }
.int-loud-h { color: #fff; font-size: 22px; font-weight: 900; letter-spacing: 0.06em; text-shadow: 0 2px 8px rgb(0 0 0 / 0.35); }
.int-loud-card { display: flex; flex-direction: column; gap: 4px; padding: 12px 10px; background: #fff; border-radius: 12px; box-shadow: 0 10px 24px rgb(0 0 0 / 0.3); }
.int-loud-card b { font-size: 24px; font-weight: 900; line-height: 1.1; }
.int-loud-card span { font-size: 10px; font-weight: 800; letter-spacing: 0.04em; color: #36405a; }`,
          },
          why: 'Tout a monté d’un cran — dégradé, ombres, orange et violet inédits, capitales : rien ne domine, et la section ne ressemble plus à la marque.',
        },
        {
          id: 'decisive',
          visual: {
            alt: 'Section Chiffres clés sur fond blanc : un très grand chiffre 12 400 en vert sapin dans la police à empattements, une phrase courte, puis deux chiffres secondaires discrets.',
            html: `<div class="mk-pad-l mk-stack" style="--gap:14px">
  <p class="int-serif-h">Chiffres clés</p>
  <div class="mk-row mk-wrap" style="--gap:6px 16px;align-items:flex-end">
    <b class="int-big">12 400</b>
    <span class="int-big-txt">dossiers traités en 2025, de l’auto-entreprise à la PME.</span>
  </div>
  <div class="mk-divider"></div>
  <div class="mk-row mk-wrap" style="--gap:6px 28px"><p class="int-sub"><b>38</b> experts-comptables</p><p class="int-sub"><b>4</b> bureaux en Bretagne</p></div>
</div>`,
            css: `.int-serif-h { font-family: ${SERIF}; font-size: 20px; color: #1e5b4a; }
.int-big { font-family: ${SERIF}; font-size: 64px; line-height: 0.95; font-weight: 700; color: #1e5b4a; letter-spacing: -0.02em; }
.int-big-txt { max-width: 22ch; padding-bottom: 6px; color: #36405a; }
.int-sub { color: #5b6b62; }
.int-sub b { font-family: ${SERIF}; font-size: 18px; color: #1e5b4a; }`,
          },
          why: 'Un seul geste, complet : le chiffre principal prend la typo à empattements de la marque à pleine taille, et tout le reste se calme pour qu’il se lise.',
        },
      ],
      answer: 'decisive',
      explanation: `« Plus audacieux » ne veut pas dire « plus d’effets ». Impeccable demande d’**amplifier ce que le système possède déjà** — ici la police à empattements et le vert sapin — au lieu d’ajouter des couleurs, des dégradés et des ombres que la marque n’a jamais utilisés.

Le principe clé : **s’engager, puis clarifier**. Un geste décisif fait complètement, puis du calme autour pour qu’il se lise. Si chaque élément devient plus fort, la section devient plus plate : c’est l’effet d’isolement (von Restorff) — on remarque ce qui diffère du reste, pas ce qui crie avec tout le monde.`,
      takeaway: 'Intensifier : un geste décisif avec les moyens du système, puis du calme autour. Si tout monte, rien ne ressort.',
      sources: ['imp:bolder', LAWS_RESTORFF],
    },
    {
      id: 'intensity-gray-on-color-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur quel bandeau le texte secondaire est-il le mieux traité ?',
      options: [
        {
          id: 'gray',
          visual: {
            alt: 'Bandeau bleu d’essai gratuit avec un titre blanc et une phrase secondaire en gris neutre.',
            html: `<div class="mk-pad"><div class="int-banner"><p class="int-banner-t">Votre essai se termine dans 3 jours</p><p style="color:#9aa0a6">Passez à l’offre Pro pour garder vos 12 projets et tout leur historique.</p><span class="int-banner-btn">Choisir une offre</span></div></div>`,
            css: `.int-banner { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; background: #23557a; }
.int-banner-t { color: #fff; font-size: 17px; font-weight: 700; }
.int-banner-btn { align-self: flex-start; margin-top: 4px; padding: 8px 14px; border-radius: 8px; background: #fff; color: #23557a; font-weight: 700; }`,
          },
          why: 'Un gris neutre sur un fond bleu paraît sale et délavé, et son contraste tombe à 3:1, sous le seuil de 4,5:1.',
        },
        {
          id: 'tinted',
          visual: {
            alt: 'Même bandeau bleu avec la phrase secondaire dans un bleu très clair, de la même teinte que le fond.',
            html: `<div class="mk-pad"><div class="int-banner"><p class="int-banner-t">Votre essai se termine dans 3 jours</p><p style="color:#c7dcef">Passez à l’offre Pro pour garder vos 12 projets et tout leur historique.</p><span class="int-banner-btn">Choisir une offre</span></div></div>`,
            css: `.int-banner { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; background: #23557a; }
.int-banner-t { color: #fff; font-size: 17px; font-weight: 700; }
.int-banner-btn { align-self: flex-start; margin-top: 4px; padding: 8px 14px; border-radius: 8px; background: #fff; color: #23557a; font-weight: 700; }`,
          },
          why: 'Le texte secondaire est un bleu très clair de la teinte du fond : il recule sans se salir et reste lisible (5,6:1).',
        },
      ],
      answer: 'tinted',
      explanation: `Sur un fond coloré, un gris neutre se mêle visuellement à la couleur et paraît **sale** ; il manque souvent de contraste, aussi (ici 3:1). Impeccable et *Refactoring UI* donnent la même règle : **jamais de gris sur une couleur**.

Pour faire reculer un texte secondaire sur un fond coloré, choisis une **nuance de la teinte du fond** — plus claire sur fond foncé, plus foncée sur fond clair — ou du blanc en transparence, puis vérifie le contraste : 4,5:1 pour du texte courant.`,
      takeaway: 'Sur un fond coloré, le texte secondaire prend une nuance de cette couleur, jamais un gris — et garde 4,5:1.',
      sources: ['imp:quieter', 'imp:craft-floor', 'refactoring-ui', 'imp:detector'],
    },
    {
      id: 'intensity-generic-quiet-duel',
      type: 'choice',
      difficulty: 3,
      context:
        'Le tableau de bord d’une application de suivi d’énergie était criard : couleurs saturées partout, graisses très fortes. On a demandé une version plus calme.',
      prompt: 'Quelle version réussit l’adoucissement ?',
      options: [
        {
          id: 'generic',
          visual: {
            alt: 'Tableau de bord où tout le texte est gris, de même graisse et presque de même taille, réparti dans quatre cartes identiques.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack int-gen" style="--gap:12px">
  <p>Consommation d’énergie</p>
  <div class="mk-grid" style="--gap:10px">
    <div class="int-gen-card"><span>Octobre</span><span>412 kWh</span></div>
    <div class="int-gen-card"><span>Septembre</span><span>455 kWh</span></div>
    <div class="int-gen-card"><span>Coût estimé</span><span>98&nbsp;€</span></div>
    <div class="int-gen-card"><span>Pic de puissance</span><span>6,2 kVA</span></div>
  </div>
</div>`,
            css: `.int-gen { color: #6b7280; font-weight: 400; }
.int-gen-card { display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; }`,
          },
          why: 'Tout est gris, d’une seule graisse, en cartes identiques : c’est calme, mais plus rien ne guide l’œil ni ne ressemble à un produit.',
        },
        {
          id: 'refined',
          visual: {
            alt: 'Tableau de bord avec la consommation d’octobre en grand, une tendance de −9 % dans un vert-bleu sourd, puis une courte liste de trois données secondaires.',
            frame: 'browser',
            html: `<div class="mk-pad mk-stack int-ref" style="--gap:12px">
  <p class="int-ref-h">Consommation d’énergie</p>
  <div class="mk-stack" style="--gap:2px">
    <span class="int-ref-meta">Octobre</span>
    <b class="int-ref-big">412 kWh</b>
    <span class="int-ref-trend"><i data-icon="trending-down" style="--ico:14px"></i>−9&nbsp;% par rapport à septembre</span>
  </div>
  <ul class="mk-list">
    <li><span class="mk-grow int-ref-meta">Coût estimé</span><b>98&nbsp;€</b></li>
    <li><span class="mk-grow int-ref-meta">Pic de puissance</span><b>6,2 kVA</b></li>
    <li><span class="mk-grow int-ref-meta">Septembre</span><b>455 kWh</b></li>
  </ul>
</div>`,
            css: `.int-ref { color: #1e2a32; }
.int-ref-h { font-size: 15px; font-weight: 600; }
.int-ref-meta { font-size: 13px; color: #56636d; }
.int-ref-big { font-size: 32px; line-height: 1.1; font-weight: 600; letter-spacing: -0.01em; }
.int-ref-trend { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; color: #2b7a6f; }
.int-ref b { font-weight: 600; font-variant-numeric: tabular-nums; }`,
          },
          why: 'Une seule couleur, désaturée, pour la tendance ; des graisses allégées mais une hiérarchie intacte : on voit d’abord la consommation du mois.',
        },
      ],
      answer: 'refined',
      explanation: `Adoucir, ce n’est pas tout éteindre. Impeccable décrit précisément le **calme générique** : texte gris sur blanc, une seule police dans une graisse uniforme, une grille de cartes identiques. On a supprimé le bruit — et le point de vue avec.

La version réussie garde des **ancres** : la donnée principale reste plus grande et plus forte, un seul accent désaturé porte le sens (la tendance), les neutres sont légèrement teintés et les cartes inutiles ont disparu. Calme ≠ niveaux de gris, calme ≠ tout pareil.`,
      takeaway: 'Calme n’est pas générique : moins de couleur et de poids, mais une hiérarchie nette, un accent choisi et des neutres teintés.',
      sources: ['imp:quieter', 'imp:craft-floor'],
    },
    {
      id: 'intensity-clutter-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux sources de complexité inutile dans cette fiche d’abonnement.',
      visual: {
        alt: 'Fiche d’abonnement Offre Équipe avec un badge Active, une phrase d’introduction, un prix mensuel, la date du prochain prélèvement dans trois cadres emboîtés et un bouton Gérer les sièges.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2" data-hotspot="title">Offre Équipe</p><span class="mk-badge">Active</span></div>
  <p class="mk-muted" data-hotspot="redundant">Vous êtes abonné à l’offre Équipe. Votre offre actuelle est l’offre Équipe.</p>
  <p data-hotspot="price" style="align-self:flex-start"><span class="mk-price" style="font-size:22px">49,00&nbsp;€</span> <span class="mk-small mk-muted">par mois · 10 sièges</span></p>
  <div class="int-nest" data-hotspot="nested"><div class="int-nest"><div class="int-nest"><p class="mk-small mk-muted">Prochain prélèvement</p><p class="mk-strong">12 novembre 2026</p></div></div></div>
  <span class="mk-btn" data-hotspot="cta" style="align-self:flex-start">Gérer les sièges</span>
</div>`,
        css: `.int-nest { padding: 10px; border: 1px solid #dfe3ea; border-radius: 12px; background: #fff; box-shadow: 0 2px 6px rgb(15 20 35 / 0.06); }
.int-nest .int-nest { background: #f5f6f9; }
.int-nest .int-nest .int-nest { background: #fff; }`,
      },
      hotspots: [
        {
          id: 'nested',
          label: 'Cartes imbriquées',
          correct: true,
          why: 'Trois cadres emboîtés pour une seule date : bordures, fonds et ombres sans hiérarchie supplémentaire. Un simple espacement suffit.',
        },
        {
          id: 'redundant',
          label: 'Introduction qui répète le titre',
          correct: true,
          why: 'La phrase redit deux fois ce que le titre et le badge disent déjà. Dis chaque chose une seule fois.',
        },
        { id: 'title', label: 'Nom de l’offre', correct: false, why: 'Le titre nomme l’offre : indispensable.' },
        { id: 'price', label: 'Prix mensuel', correct: false, why: 'Une information de décision : elle doit rester bien visible.' },
        { id: 'cta', label: 'Bouton Gérer les sièges', correct: false, why: 'Une action principale claire : c’est exactement ce qu’une simplification cherche à garder.' },
      ],
      explanation: `Deux sources classiques de complexité cosmétique :

- **Les contenants inutiles** : pour impeccable, les cartes imbriquées sont toujours une erreur. Les cadres empilés ajoutent des bordures, des fonds et de la profondeur sans hiérarchie supplémentaire.
- **La redondance** : un texte qui reformule le titre ou répète une information déjà affichée allonge la lecture sans rien apprendre.

Le prix et l’action principale, eux, sont exactement ce qu’une simplification doit **garder** en avant.`,
      takeaway: 'Supprime les contenants qui ne servent ni la hiérarchie ni la fonction, et dis chaque chose une seule fois.',
      sources: ['imp:distill', 'imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'intensity-loud-hotspot',
      type: 'hotspot',
      difficulty: 1,
      prompt: 'Trouve les deux éléments qui rendent ce tableau de bord criard.',
      visual: {
        alt: 'Tableau de bord des ventes avec un sélecteur de dates, une carte de chiffre d’affaires entourée d’un halo violet, une carte de commandes, une rangée d’étiquettes en couleurs vives et un tableau de commandes.',
        frame: 'browser',
        html: `<div class="mk-pad mk-stack" style="--gap:14px">
  <div class="mk-row mk-between"><p class="mk-h2" data-hotspot="title">Ventes de la semaine</p><span class="mk-btn mk-btn--ghost mk-btn--s" data-hotspot="range"><i data-icon="calendar" style="--ico:14px"></i>20–26 oct.</span></div>
  <div class="mk-grid" style="--gap:14px">
    <div class="int-kpi int-glow" data-hotspot="glow"><span class="mk-small mk-muted">Chiffre d’affaires</span><b>48 210&nbsp;€</b></div>
    <div class="int-kpi"><span class="mk-small mk-muted">Commandes</span><b>1 284</b></div>
  </div>
  <div class="mk-row mk-wrap" style="--gap:6px;align-self:flex-start" data-hotspot="tags"><span class="int-tag-loud" style="background:#ff1f1f;color:#fff">EN RETARD (4)</span><span class="int-tag-loud" style="background:#ffe500;color:#000">URGENT (2)</span><span class="int-tag-loud" style="background:#00d26a;color:#000">À EXPÉDIER (9)</span></div>
  <ul class="mk-list" data-hotspot="table">
    <li><span class="mk-grow">Commande 4821 · Lyon</span><span class="mk-price">84,90&nbsp;€</span></li>
    <li><span class="mk-grow">Commande 4822 · Nantes</span><span class="mk-price">129,00&nbsp;€</span></li>
    <li><span class="mk-grow">Commande 4823 · Lille</span><span class="mk-price">42,50&nbsp;€</span></li>
  </ul>
</div>`,
        css: `.int-kpi { display: flex; flex-direction: column; gap: 2px; padding: 12px; border: 1px solid #e1e4ea; border-radius: 10px; }
.int-kpi b { font-size: 22px; font-variant-numeric: tabular-nums; }
.int-glow { border-color: #a855f7; box-shadow: 0 0 22px 5px rgb(168 85 247 / 0.7); }
.int-tag-loud { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 900; letter-spacing: 0.05em; }`,
      },
      hotspots: [
        {
          id: 'glow',
          label: 'Halo violet autour de la carte',
          correct: true,
          why: 'Une lueur colorée sans décalage, purement décorative : elle crie « regarde-moi » sans rien signifier. Une élévation sobre, ou rien, suffit.',
        },
        {
          id: 'tags',
          label: 'Étiquettes en couleurs pures',
          correct: true,
          why: 'Rouge, jaune et vert à pleine saturation, en capitales très grasses : les trois statuts hurlent en même temps et plus aucun ne ressort.',
        },
        { id: 'title', label: 'Titre de la page', correct: false, why: 'Titre sobre et lisible : rien à adoucir.' },
        { id: 'range', label: 'Sélecteur de dates', correct: false, why: 'Bouton secondaire discret, à sa juste place.' },
        { id: 'table', label: 'Liste des commandes', correct: false, why: 'Liste neutre et dense : elle est déjà calme.' },
      ],
      explanation: `Les sources d’intensité les plus fréquentes sont la **saturation** et les **effets** : des étiquettes en couleurs pures et en capitales très grasses se disputent l’attention, une lueur colorée sans décalage autour d’une carte décore sans informer.

Pour adoucir : désature les étiquettes (et garde une couleur forte pour le seul statut vraiment urgent), baisse la graisse, passe en casse normale, et remplace la lueur par une élévation sobre — ou rien du tout. Le titre, les filtres et la liste sont déjà calmes : on ne les touche pas.`,
      takeaway: 'Pour baisser le volume, commence par la saturation et les effets : couleurs pures, capitales très grasses, lueurs.',
      sources: ['imp:quieter', 'imp:detector'],
    },
    {
      id: 'intensity-scope-choice',
      type: 'choice',
      difficulty: 2,
      context:
        'Brief du client : « Rends la section témoignages plus audacieuse. Tout le reste reste tel quel. » Le système de la marque a une seule couleur d’accent (vert sapin), une police à empattements pour les titres et une sans empattements pour le texte.',
      prompt: 'Quelle approche respecte la demande ?',
      options: [
        {
          id: 'amplify',
          label: 'Passer la citation principale dans la police de titre à pleine taille, poser un aplat vert sapin sur cette seule section et réduire les témoignages secondaires.',
          why: 'Elle amplifie ce que le système possède déjà, dans le périmètre, en calmant le reste de la section.',
        },
        {
          id: 'new',
          label: 'Ajouter un dégradé violet et une troisième police manuscrite pour marquer la différence.',
          why: 'Nouvelle couleur et nouvelle police sans demande : la section ne ressemble plus à la marque.',
        },
        {
          id: 'neighbors',
          label: 'Agrandir aussi le héros et le pied de page pour garder l’équilibre de la page.',
          why: 'Hors périmètre : « tout le reste reste tel quel » s’entend littéralement.',
        },
        {
          id: 'effects',
          label: 'Ajouter des ombres portées, des animations au défilement et des badges « Avis vérifié ».',
          why: 'Le réflexe « plus d’effets » est le contraire de l’audace — et le badge ajoute une affirmation que le client n’a pas fournie.',
        },
      ],
      answer: 'amplify',
      explanation: `Le **périmètre est souverain** : on ne touche que la cible nommée, et on n’ajoute ni couleur, ni police, ni primitive que le système ne possède pas. Si le système ne peut vraiment pas exprimer la direction, on **demande**, en nommant l’ajout précis et le rôle qu’il jouerait.

L’audace vient alors de ce que la marque possède déjà, utilisé à pleine puissance — la typo de titre, l’accent en aplat — et du calme créé autour. Le contenu reste vrai : pas de nouvelle affirmation (« Avis vérifié ») sans preuve fournie par le client.`,
      takeaway: 'Intensifier, c’est amplifier les moyens du système dans le périmètre demandé — sans nouvelle couleur, police ou affirmation.',
      sources: ['imp:bolder'],
    },
    {
      id: 'intensity-command-match',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque symptôme à la commande qui y répond.',
      leftTitle: 'Symptôme',
      rightTitle: 'Commande',
      pairs: [
        { id: 'distill', left: 'Neuf actions de même poids et trois encadrés qui répètent la même information', right: 'Simplifier (*distill*)' },
        { id: 'bolder', left: 'La section de lancement se fond dans la page : rien n’y ressort', right: 'Intensifier (*bolder*)' },
        { id: 'quieter', left: 'Couleurs saturées partout, graisses très fortes, animations qui rebondissent', right: 'Adoucir (*quieter*)' },
        { id: 'polish', left: 'Tout est en place, mais il reste des états manquants et des espacements irréguliers avant la mise en ligne', right: 'Finir (*polish*)' },
      ],
      explanation: `Chaque commande règle un problème différent :

- **Simplifier** quand l’écran est encombré : trop d’éléments, de variations, de répétitions.
- **Intensifier** quand une partie est terne alors que le système sait être fort ailleurs.
- **Adoucir** quand l’intensité fatigue : saturation, poids, contrastes et mouvements excessifs.
- **Finir** quand le concept est bon et qu’il reste à combler les états et les incohérences.

Les trois premières passent ensuite la main à une passe de finition.`,
      takeaway: 'Encombré → simplifier ; terne → intensifier ; criard → adoucir ; presque prêt → finir.',
      sources: ['imp:distill', 'imp:bolder', 'imp:quieter', 'imp:polish'],
    },
    {
      id: 'intensity-budget-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquelles de ces décisions relèvent d’une bonne simplification visuelle ?',
      options: [
        { id: 'palette', label: 'Ramener la palette à une couleur d’accent plus des neutres', why: 'C’est le budget recommandé : 1 à 2 couleurs plus des neutres.' },
        { id: 'sizes', label: 'Passer de sept tailles de texte à quatre', why: '3 à 4 tailles suffisent à une hiérarchie claire.' },
        { id: 'cards', label: 'Remplacer des cartes de pure mise en page par de l’espacement et des séparateurs', why: 'Une carte n’est pas nécessaire pour mettre en page : l’espacement et l’alignement suffisent.' },
        { id: 'labels', label: 'Retirer les libellés des champs et ne garder que le texte indicatif', why: 'On sacrifie l’accessibilité et la compréhension : un texte indicatif (placeholder) n’est pas un libellé.' },
        { id: 'weight', label: 'Mettre tout le texte dans la même graisse pour un rendu uniforme', why: 'On supprime la hiérarchie : certaines choses doivent ressortir.' },
        { id: 'fees', label: 'Masquer les frais de livraison jusqu’à la dernière étape pour alléger la fiche produit', why: 'On retire une information nécessaire pour décider — et on prépare une mauvaise surprise.' },
      ],
      answers: ['palette', 'sizes', 'cards'],
      explanation: `La simplification visuelle a un **budget** clair : 1 à 2 couleurs plus des neutres, une famille de police, 3 à 4 tailles, 2 à 3 graisses, et aucun contenant qui ne serve ni la hiérarchie ni la fonction.

Elle a aussi des **limites** : ne pas sacrifier l’accessibilité (les libellés restent), ne pas supprimer toute hiérarchie, ne pas retirer l’information nécessaire pour décider.`,
      takeaway: 'Simplifier : 1–2 couleurs, une famille, 3–4 tailles, 2–3 graisses — sans retirer libellés, hiérarchie ni information utile.',
      sources: ['imp:distill'],
    },
    {
      id: 'intensity-distill-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range les étapes d’une passe de simplification dans l’ordre.',
      items: [
        { id: 'assess', label: 'Repérer les sources de complexité : éléments en trop, variations, bruit, hiérarchie confuse' },
        { id: 'essence', label: 'Nommer le but principal et séparer l’indispensable de l’agréable' },
        { id: 'plan', label: 'Décider ce qui part, ce qui se regroupe et ce qui passe en divulgation progressive' },
        { id: 'simplify', label: 'Simplifier l’architecture, le visuel, la mise en page, les interactions et le texte' },
        { id: 'verify', label: 'Vérifier : tâche plus rapide, charge mentale réduite, rien d’indispensable perdu' },
        { id: 'document', label: 'Documenter ce qui a été retiré et prévoir un autre point d’accès si besoin' },
      ],
      explanation: `La démarche d’impeccable suit cet ordre : **évaluer** (les sources de complexité, puis l’essentiel), **planifier** (but unique, éléments indispensables, divulgation progressive, regroupements), **simplifier** dimension par dimension, **vérifier** que l’usage s’améliore vraiment, puis **documenter** ce qui a été retiré.

Couper avant d’avoir nommé le but, c’est risquer de retirer ce qui comptait. Ne pas vérifier, c’est confondre « moins d’éléments » et « plus simple à utiliser ».`,
      takeaway: 'Évaluer, nommer le but, planifier, simplifier, vérifier, documenter : on coupe après avoir compris, on mesure après avoir coupé.',
      sources: ['imp:distill', NNG_PROGRESSIVE],
    },
    {
      id: 'intensity-saturation-slider',
      type: 'slider',
      difficulty: 2,
      prompt: 'Désature ce bandeau et ces étiquettes pour calmer l’écran sans le rendre gris.',
      visual: {
        alt: 'Bandeau promotionnel rouge et trois commandes avec des étiquettes de statut verte, bleue et orange, dont la saturation varie avec le curseur.',
        html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <div class="int-promo">Soldes d’automne&nbsp;: −20&nbsp;% sur l’atelier jusqu’à dimanche</div>
  <ul class="mk-list">
    <li><span class="mk-grow">Commande 4821 · Lyon</span><span class="int-tag" style="--h:145;--l:28%">Livrée</span></li>
    <li><span class="mk-grow">Commande 4822 · Nantes</span><span class="int-tag" style="--h:215;--l:44%">En transit</span></li>
    <li><span class="mk-grow">Commande 4823 · Lille</span><span class="int-tag" style="--h:25;--l:36%">Retardée</span></li>
  </ul>
</div>`,
        css: `.int-promo { padding: 12px 14px; border-radius: 10px; background: hsl(350 var(--v, 100%) 44%); color: #fff; font-weight: 600; }
.int-tag { padding: 3px 10px; border-radius: 999px; background: hsl(var(--h) var(--v, 100%) var(--l)); color: #fff; font-size: 12px; font-weight: 700; }`,
      },
      control: 'Saturation',
      min: 0,
      max: 100,
      step: 1,
      initial: 100,
      unit: '%',
      target: [70, 85],
      ideal: 78,
      explanation: `Des couleurs pleinement saturées crient toutes en même temps. Impeccable conseille de les ramener vers **70 à 85 %** de saturation : les teintes restent reconnaissables — le vert, le bleu et l’orange gardent leur sens — mais cessent de vibrer.

Descendre beaucoup plus bas fait basculer dans l’autre piège : les statuts deviennent ternes et finissent par se confondre ; à 0 %, tout est gris et la couleur ne porte plus aucune information. Calme ≠ niveaux de gris.`,
      takeaway: 'Pour adoucir une palette, désature vers 70–85 % : la couleur garde son sens sans crier. Pas jusqu’au gris.',
      sources: ['imp:quieter'],
    },
    {
      id: 'intensity-grayscale-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Pour rendre une interface plus calme, le plus sûr est de la passer en niveaux de gris.',
      answer: false,
      explanation: `Faux. Impeccable le dit explicitement : **calme ≠ niveaux de gris**. Retirer toute la couleur supprime aussi l’information qu’elle portait (statuts, sélection, actions) et produit le calme générique : du gris sur blanc, sans point de vue.

On adoucit en **désaturant** (vers 70–85 %), en réduisant le nombre de couleurs et en laissant dominer les neutres, avec un accent réservé à ce qui compte.`,
      takeaway: 'Adoucir, c’est retirer de la couleur, pas toute la couleur.',
      sources: ['imp:quieter'],
    },
    {
      id: 'intensity-louder-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Pour rendre une section plus audacieuse, il faut renforcer chacun de ses éléments.',
      answer: false,
      explanation: `Faux. « Si tout devient plus fort, la section devient plus plate » : quand tous les éléments montent ensemble, les écarts entre eux restent les mêmes et rien ne ressort. L’effet d’isolement (von Restorff) va dans le même sens : on remarque ce qui diffère du reste.

Impeccable demande de **s’engager, puis clarifier** : un geste décisif fait complètement, puis du calme autour pour qu’il se lise.`,
      takeaway: 'Audace = un geste décisif + du calme autour. Tout renforcer aplatit.',
      sources: ['imp:bolder', LAWS_RESTORFF],
    },
    {
      id: 'intensity-skeleton-test-choice',
      type: 'choice',
      difficulty: 3,
      context:
        'Tu as rendu la section « Notre méthode » plus audacieuse en passant ses textes de 16 à 24 px. Tu appliques le test du squelette : sans le texte, ses blocs sont identiques à ceux des sections voisines.',
      prompt: 'Qu’en conclus-tu ?',
      options: [
        {
          id: 'structure',
          label: 'L’audace est dans la taille du texte, pas dans le design : il faut un geste structurel avec les moyens du système (échelle, densité, motif, rythme).',
          why: 'C’est exactement ce que le test révèle : la structure ne dit pas encore pourquoi cette section compte.',
        },
        { id: 'fine', label: 'C’est normal : le texte agrandi suffit à porter l’audace.', why: 'Le test du squelette sert précisément à détecter cette illusion.' },
        {
          id: 'photo',
          label: 'Il faut ajouter une photo décorative pour remplir la structure.',
          why: 'Un emplacement d’image doit tenir un rôle (ancre, preuve), pas servir de décor.',
        },
        {
          id: 'motion',
          label: 'Il faut ajouter une animation d’entrée pour que la section se remarque.',
          why: 'Plus d’effets n’est pas plus d’audace, et la structure n’a toujours pas changé.',
        },
      ],
      answer: 'structure',
      explanation: `Le **test du squelette** consiste à retirer le texte et à regarder la structure nue. Si elle dit encore ce qu’est la section et pourquoi elle compte — par la hiérarchie et les procédés du système —, l’audace est dans le design. Si tout repose sur des mots plus gros, elle ne tient qu’à la taille du texte.

Un emplacement d’image, lui, nomme un **rôle** — une ancre, une preuve — et se remplit avec ce que le sujet possède vraiment, pas avec une photo décorative.`,
      takeaway: 'Test du squelette : sans le texte, la structure doit encore dire ce qu’est la section et pourquoi elle compte.',
      sources: ['imp:bolder'],
    },
  ],
};

export default intensity;
