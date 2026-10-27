import type { ModuleContent } from '../../engine/types';

const craftFloor: ModuleContent = {
  id: 'craft-floor',
  title: 'Le plancher de qualité',
  category: 'fondations',
  summary:
    'Vérifier un rendu sur les points que tout visiteur remarque (contraste, profondeur, espacement, typo, mouvement, états, surfaces du navigateur, texte) et refuser les réflexes de la catégorie, sans oublier que le plancher n’est pas le plafond.',
  minutes: 12,
  commands: ['polish', 'audit'],
  sources: ['imp:craft-floor', 'imp:skill', 'imp:operate', 'wcag:contrast', 'imp:detector'],
  sections: [
    {
      id: 'role',
      title: 'Un plancher, pas une direction',
      body: `Le **plancher de qualité** (*craft floor*) rassemble ce qu’un rendu doit **vérifier** et les réflexes qu’il doit **refuser**. impeccable le fait relire **après** avoir fixé la direction, juste avant toute modification d’interface, même minime, et on construit sans réciter la liste.

- Il **ne choisit jamais la direction** : il tient la mécanique.
- Un brief explicite ou le monde visuel retenu passent avant tout ce qu’il contient, **sauf les lignes marquées comme interdits**. Ton habitude, elle, ne passe jamais avant.
- Chaque vérification porte sur **le résultat construit**, pas sur une intention. On regarde le rendu aux tailles où il sera livré, et on **groupe** les vérifications dans un même regard : on corrige tout ce qu’un regard montre avant de regarder à nouveau, plutôt que de multiplier les captures.

Et une phrase à garder en tête dès maintenant : **le plancher n’est pas le plafond**. Quand tout est au vert, il reste à dépenser la page sur le monde choisi.`,
    },
    {
      id: 'verifier-lecture',
      title: 'Vérifier : contraste, profondeur, espacement, typo',
      body: `- **Contraste** : texte courant et texte indicatif (*placeholder*) à **4,5:1** au moins, grand texte à **3:1** (au sens des WCAG : 24 px et plus, ou environ 18,7 px en gras). Sur une surface colorée, teinte le texte secondaire depuis la couleur du fond ou du premier plan, **jamais en gris**.
- **Profondeur** : une ombre porte un **décalage** et un **flou doux**. Un halo coloré sans décalage est de la décoration, pas de la profondeur.
- **Espacement** : groupes serrés, séparations généreuses, **plus d’espace au-dessus d’un titre qu’en dessous**. On lit les valeurs calculées, pas l’intention.
- **Typographie** : mesure du corps de **65 à 75 caractères**, affichage plafonné à **6rem**, approche jamais sous **−0,04em**, titres équilibrés, marches d’échelle et de graisse évidentes. On fait tourner le vrai texte à chaque point de rupture et on corrige ce qui déborde.`,
      examples: [
        {
          title: 'Texte secondaire sur un fond coloré',
          bad: {
            alt: 'Bandeau vert foncé avec un titre blanc et un texte secondaire gris moyen, peu lisible.',
            html: `<div class="gc"><p class="gc-t">Passez à l’offre Atelier</p><p class="gc-s gc-s--gray">Factures illimitées, relances automatiques et export comptable. 19 € HT par mois, sans engagement.</p><span class="gc-btn">Essayer 30 jours</span></div>`,
            css: `.gc { margin: 14px; padding: 18px; border-radius: 12px; background: #1f5f4a; color: #fff; }
.gc-t { font-size: 18px; font-weight: 700; }
.gc-s { margin-top: 6px; font-size: 14px; line-height: 1.5; color: #cde6da; }
.gc-s--gray { color: #9aa0a6; }
.gc-btn { display: inline-flex; margin-top: 14px; padding: 8px 14px; border-radius: 8px; background: #fff; color: #1f5f4a; font-weight: 650; font-size: 14px; }`,
          },
          badNote: 'Gris #9aa0a6 sur vert : 2,85:1, et un aspect délavé.',
          good: {
            alt: 'Même bandeau avec un texte secondaire vert très pâle, net et lisible.',
            html: `<div class="gc"><p class="gc-t">Passez à l’offre Atelier</p><p class="gc-s">Factures illimitées, relances automatiques et export comptable. 19 € HT par mois, sans engagement.</p><span class="gc-btn">Essayer 30 jours</span></div>`,
            css: `.gc { margin: 14px; padding: 18px; border-radius: 12px; background: #1f5f4a; color: #fff; }
.gc-t { font-size: 18px; font-weight: 700; }
.gc-s { margin-top: 6px; font-size: 14px; line-height: 1.5; color: #cde6da; }
.gc-btn { display: inline-flex; margin-top: 14px; padding: 8px 14px; border-radius: 8px; background: #fff; color: #1f5f4a; font-weight: 650; font-size: 14px; }`,
          },
          goodNote: 'Un vert pâle tiré du fond : 5,70:1, et le texte appartient au bandeau.',
        },
        {
          title: 'L’espace au-dessus d’un titre',
          bad: {
            alt: 'Page d’aide où chaque intertitre est plus proche du paragraphe précédent que du sien.',
            html: `<div class="hs"><p class="hs-p">Ton relevé est importé chaque nuit depuis ta banque. Les opérations apparaissent dans l’onglet Banque dès 6 h.</p><p class="hs-h">Rapprocher une opération</p><p class="hs-p">Choisis l’opération, puis la facture correspondante. Le montant restant dû se met à jour aussitôt.</p><p class="hs-h">Annuler un rapprochement</p><p class="hs-p">Ouvre la facture et choisis « Détacher le paiement ».</p></div>`,
            css: `.hs { padding: 18px; }
.hs-p { font-size: 14px; line-height: 1.55; color: #3a4150; }
.hs-h { margin: 8px 0 18px; font-size: 16px; font-weight: 700; color: #1d2230; }`,
          },
          badNote: '8 px au-dessus, 18 px en dessous : chaque titre semble légender le bloc précédent.',
          good: {
            alt: 'Même page où chaque intertitre a beaucoup d’espace au-dessus et peu en dessous, collé à son paragraphe.',
            html: `<div class="hs"><p class="hs-p">Ton relevé est importé chaque nuit depuis ta banque. Les opérations apparaissent dans l’onglet Banque dès 6 h.</p><p class="hs-h">Rapprocher une opération</p><p class="hs-p">Choisis l’opération, puis la facture correspondante. Le montant restant dû se met à jour aussitôt.</p><p class="hs-h">Annuler un rapprochement</p><p class="hs-p">Ouvre la facture et choisis « Détacher le paiement ».</p></div>`,
            css: `.hs { padding: 18px; }
.hs-p { font-size: 14px; line-height: 1.55; color: #3a4150; }
.hs-h { margin: 26px 0 4px; font-size: 16px; font-weight: 700; color: #1d2230; }`,
          },
          goodNote: '26 px au-dessus, 4 px en dessous : le titre se lie au contenu qu’il introduit.',
        },
      ],
    },
    {
      id: 'verifier-finition',
      title: 'Vérifier : mouvement, états, navigateur, texte, couverture',
      body: `- **Mouvement** : **un seul moment signé**, pas des effets dispersés ni la même entrée sur chaque section. Une sortie exponentielle (*ease-out*) depuis un état par défaut **déjà visible**. La palette dépasse \`transform\` et \`opacity\` : flou, \`backdrop-filter\`, \`clip-path\`, masque et ombre en font partie tant qu’ils restent fluides.
- **États** : survol, désactivé, chargement, erreur, vide. Plus du vrai contenu, des contrôles qui fonctionnent, une composition qui s’adapte et un focus clavier visible.
- **Surfaces du navigateur** : ce que tu n’as pas dessiné porte aussi le design. La sélection de texte, le curseur de saisie, les barres de défilement personnalisées, les anneaux de focus, le décalage du soulignement et les chiffres des données tabulaires sortent avec les réglages par défaut du navigateur, qui n’appartiennent à aucun système. Thématise-les depuis la palette (\`::selection\`, \`caret-color\`, \`accent-color\`, \`scrollbar-color\`, \`:focus-visible\`, \`text-underline-offset\`, \`font-variant-numeric: tabular-nums\`). C’est le signal le moins cher qu’une page a été **construite** plutôt qu’**assemblée**, et celui que les modèles oublient le plus souvent.
- **Texte** : la langue du produit. Les contrôles nomment leur action ; les erreurs nomment le problème et la façon d’en sortir.
- **Couverture** : chaque exigence du brief est présente et se trouve en quelques secondes.`,
      examples: [
        {
          title: 'Les surfaces que tu n’as pas dessinées',
          bad: {
            alt: 'Récapitulatif de commande avec un surlignage de sélection bleu, un lien bleu standard au soulignement serré et un champ entouré d’un anneau de focus bleu par défaut.',
            html: `<div class="bs">
  <p class="bs-h">Commande n° 2041</p>
  <p class="bs-p">Le <span class="bs-sel">retrait à l’atelier</span> est possible du mardi au samedi. <span class="bs-a">Voir les horaires</span></p>
  <table class="bs-t"><tr><td>Service à thé, grès noir</td><td class="n">1 111,00 €</td></tr><tr><td>Assiettes plates (x8)</td><td class="n">288,00 €</td></tr><tr><td>Vase soliflore</td><td class="n">81,10 €</td></tr></table>
  <span class="bs-in">Ajouter une note<span class="bs-caret"></span></span>
</div>`,
            css: `.bs { padding: 16px; display: flex; flex-direction: column; gap: 10px; color: #2b211c; }
.bs-h { font-size: 16px; font-weight: 700; }
.bs-p { font-size: 14px; line-height: 1.6; }
.bs-sel { background: #b4d5fe; }
.bs-a { color: #0000ee; text-decoration: underline; }
.bs-t { border-collapse: collapse; font-size: 14px; }
.bs-t td { padding: 4px 0; border-bottom: 1px solid #eee5df; }
.bs-t .n { text-align: end; padding-inline-start: 16px; white-space: nowrap; }
.bs-in { display: flex; align-items: center; min-height: 36px; padding: 0 10px; border: 1px solid #c9bfb8; border-radius: 6px; color: #6b5f57; font-size: 14px; outline: 2px solid #1a73e8; outline-offset: 0; }
.bs-caret { display: inline-block; width: 1px; height: 18px; margin-inline-start: 2px; background: #000; }`,
          },
          badNote: 'Sélection, lien, focus et curseur : tous sortent avec les réglages par défaut du navigateur.',
          good: {
            alt: 'Même récapitulatif avec une sélection terracotta pâle, un lien terracotta au soulignement décalé, des montants alignés en chiffres tabulaires et un anneau de focus terracotta décalé du champ.',
            html: `<div class="bs">
  <p class="bs-h">Commande n° 2041</p>
  <p class="bs-p">Le <span class="bs-sel">retrait à l’atelier</span> est possible du mardi au samedi. <span class="bs-a">Voir les horaires</span></p>
  <table class="bs-t"><tr><td>Service à thé, grès noir</td><td class="n">1 111,00 €</td></tr><tr><td>Assiettes plates (x8)</td><td class="n">288,00 €</td></tr><tr><td>Vase soliflore</td><td class="n">81,10 €</td></tr></table>
  <span class="bs-in">Ajouter une note<span class="bs-caret"></span></span>
</div>`,
            css: `.bs { padding: 16px; display: flex; flex-direction: column; gap: 10px; color: #2b211c; }
.bs-h { font-size: 16px; font-weight: 700; }
.bs-p { font-size: 14px; line-height: 1.6; }
.bs-sel { background: #f3d3c2; color: #5a230c; }
.bs-a { color: #9a3f17; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.bs-t { border-collapse: collapse; font-size: 14px; font-variant-numeric: tabular-nums; }
.bs-t td { padding: 4px 0; border-bottom: 1px solid #eee5df; }
.bs-t .n { text-align: end; padding-inline-start: 16px; white-space: nowrap; }
.bs-in { display: flex; align-items: center; min-height: 36px; padding: 0 10px; border: 1px solid #b4532a; border-radius: 6px; color: #6b5f57; font-size: 14px; outline: 2px solid #b4532a; outline-offset: 2px; }
.bs-caret { display: inline-block; width: 2px; height: 18px; margin-inline-start: 2px; background: #b4532a; }`,
          },
          goodNote: 'Les mêmes surfaces thématisées depuis la palette terracotta, et des montants en chiffres tabulaires.',
        },
        {
          title: 'Une erreur qui nomme le problème et la sortie',
          bad: {
            alt: 'Écran de paiement avec un message « Une erreur est survenue (code 402) » et un bouton « OK ».',
            html: `<div class="pe"><p class="pe-h">Paiement</p><div class="pe-box"><i data-icon="circle-alert" style="--ico:18px"></i><p>Une erreur est survenue (code 402).</p></div><span class="mk-btn">OK</span></div>`,
            css: `.pe { padding: 16px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.pe-h { font-size: 16px; font-weight: 700; }
.pe-box { display: flex; gap: 10px; align-items: flex-start; padding: 12px; border-radius: 10px; background: #fdecea; color: #8a1f17; border: 1px solid #f3c2bc; font-size: 14px; line-height: 1.5; }`,
          },
          badNote: 'Ni le problème ni la sortie ; le bouton ne dit pas ce qu’il fait.',
          good: {
            alt: 'Écran de paiement avec le message « Paiement refusé par ta banque », la précision que la carte n’a pas été débitée, la marche à suivre et deux boutons nommés.',
            html: `<div class="pe"><p class="pe-h">Paiement</p><div class="pe-box"><i data-icon="circle-alert" style="--ico:18px"></i><p><strong>Paiement refusé par ta banque.</strong> Ta carte n’a pas été débitée. Essaie une autre carte ou réessaie dans quelques minutes.</p></div><div class="pe-acts"><span class="mk-btn">Utiliser une autre carte</span><span class="mk-btn mk-btn--ghost">Réessayer</span></div></div>`,
            css: `.pe { padding: 16px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.pe-h { font-size: 16px; font-weight: 700; }
.pe-box { display: flex; gap: 10px; align-items: flex-start; padding: 12px; border-radius: 10px; background: #fdecea; color: #8a1f17; border: 1px solid #f3c2bc; font-size: 14px; line-height: 1.5; }
.pe-box .mk-ico { margin-top: 1px; }
.pe-acts { display: flex; flex-wrap: wrap; gap: 8px; }`,
          },
          goodNote: 'Le problème, ce qui ne s’est pas passé, et deux sorties nommées par leur action.',
        },
      ],
    },
    {
      id: 'refuser-echafaudages',
      title: 'Refuser : les échafaudages de page',
      body: `Cette liste et la suivante décrivent les **réglages par défaut de la catégorie**, pas des interdits : les mots du brief peuvent en justifier n’importe lequel. Mais y recourir quand l’axe est libre signifie qu’on n’a pas décidé, et le reconnaître veut dire **réécrire l’élément, pas l’adoucir**.

- **Des cartes identiques** (icône, titre, texte) comme structure de page. La carte est le conteneur paresseux ; **des cartes imbriquées sont toujours une erreur**.
- **Le modèle « chiffre héros »** : un gros nombre, un petit libellé, des statistiques d’appoint, une couleur d’accent.
- **Un sur-titre (*kicker*, *eyebrow*) au-dessus d’un titre.** Celui-ci est un **interdit, pas un réglage par défaut** : aucun brief ne le rachète. Le titre porte son propre poids ; supprime le libellé et laisse parler le titre. Si ses mots comptent, fais-les entrer dans le titre ou dans le texte.
- **Des numéros de section** (01 / 02 / 03), sauf si la séquence porte une information dont le lecteur a besoin, comme les étapes d’une installation.
- **Une modale** pour une tâche qui n’exige ni interruption ni focus protégé. Renommer un projet se fait sur place.`,
      examples: [
        {
          title: 'Le sur-titre au-dessus du titre',
          bad: {
            alt: 'Section avec un petit libellé « FONCTIONNALITÉS » en capitales espacées violettes au-dessus du titre « Tout ce qu’il faut pour gérer vos stocks ».',
            html: `<div class="ey"><p class="ey-k">FONCTIONNALITÉS</p><p class="ey-h">Tout ce qu’il faut pour gérer vos stocks</p><p class="ey-p">Suivez vos niveaux de stock, recevez des alertes et exportez vos inventaires.</p></div>`,
            css: `.ey { padding: 22px 18px; }
.ey-k { font-size: 11px; font-weight: 700; letter-spacing: .16em; color: #7c3aed; }
.ey-h { margin-top: 8px; font-size: 22px; line-height: 1.2; font-weight: 750; letter-spacing: -0.01em; }
.ey-p { margin-top: 8px; font-size: 14px; line-height: 1.55; color: #4b5262; }`,
          },
          badNote: 'Le libellé répète ce que la page sait déjà, et le titre reste vague.',
          good: {
            alt: 'Section sans sur-titre, avec le titre « Vos stocks à jour, sans inventaire du dimanche » et un texte précis.',
            html: `<div class="ey"><p class="ey-h">Vos stocks à jour, sans inventaire du dimanche</p><p class="ey-p">Chaque vente en caisse décompte l’article. Une alerte part dès qu’un produit passe sous son seuil.</p></div>`,
            css: `.ey { padding: 22px 18px; }
.ey-h { font-size: 22px; line-height: 1.2; font-weight: 750; letter-spacing: -0.01em; }
.ey-p { margin-top: 8px; font-size: 14px; line-height: 1.55; color: #4b5262; }`,
          },
          goodNote: 'Le titre porte son propre poids, et il dit quelque chose.',
        },
        {
          title: 'La grille de cartes identiques',
          bad: {
            alt: 'Trois cartes identiques avec une tuile d’icône, un titre d’un mot (Rapide, Sécurisé, Simple) et une phrase vague.',
            html: `<div class="ic"><div class="ic-card"><span class="ic-tile"><i data-icon="zap" style="--ico:16px"></i></span><b>Rapide</b><span>Gagnez du temps au quotidien.</span></div><div class="ic-card"><span class="ic-tile"><i data-icon="shield-check" style="--ico:16px"></i></span><b>Sécurisé</b><span>Vos données sont protégées.</span></div><div class="ic-card"><span class="ic-tile"><i data-icon="sparkles" style="--ico:16px"></i></span><b>Simple</b><span>Une prise en main immédiate.</span></div></div>`,
            css: `.ic { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 8px; padding: 16px; }
.ic-card { display: flex; flex-direction: column; gap: 6px; padding: 12px 10px; border: 1px solid #e5e7eb; border-radius: 14px; font-size: 12px; color: #5a6172; }
.ic-card b { font-size: 14px; color: #1d2230; }
.ic-tile { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; background: #ede9fe; color: #6d28d9; }`,
          },
          badNote: 'Trois boîtes interchangeables : la structure vient du gabarit, pas du contenu.',
          good: {
            alt: 'Section avec un titre précis, un extrait de l’écran montrant un virement rapproché d’une facture, et une courte liste de trois faits avec icônes en ligne.',
            html: `<div class="cl"><p class="cl-h">Le rapprochement bancaire se fait tout seul</p><div class="cl-shot"><span>Virement M. Roux</span><b>480,00 €</b><i data-icon="arrow-right" style="--ico:14px"></i><span>Facture F-2026-031</span><em><i data-icon="check" style="--ico:13px"></i>Rapprochée</em></div><ul class="cl-list"><li><i data-icon="file-text" style="--ico:16px"></i>Factures au format Factur-X</li><li><i data-icon="clock" style="--ico:16px"></i>Relance automatique à J+7</li><li><i data-icon="landmark" style="--ico:16px"></i>Plusieurs comptes bancaires</li></ul></div>`,
            css: `.cl { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.cl-h { font-size: 19px; line-height: 1.25; font-weight: 750; }
.cl-shot { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; padding: 10px 12px; border-radius: 10px; background: #f3f6f4; font-size: 13px; }
.cl-shot b { font-variant-numeric: tabular-nums; }
.cl-shot em { display: inline-flex; align-items: center; gap: 4px; font-style: normal; font-size: 12px; font-weight: 650; color: #1d6b3c; background: #e3f4e8; padding: 2px 8px; border-radius: 999px; }
.cl-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
.cl-list li { display: flex; align-items: center; gap: 8px; }
.cl-list .mk-ico { color: #2f6b4f; }`,
          },
          goodNote: 'Le produit au travail, puis trois faits précis ; la forme suit le contenu.',
        },
      ],
    },
    {
      id: 'refuser-surfaces',
      title: 'Refuser : les habitudes de surface',
      body: `- **Le texte en dégradé.** L’emphase vient de la graisse ou de la taille.
- **Le verre et le flou** (*glassmorphism*) comme décoration plutôt que comme effet précis.
- **Une bordure gauche ou droite colorée de plus de 1 px** sur des cartes, éléments de liste, encadrés ou alertes.
- **Les ombres dures décalées** (\`box-shadow: 4px 4px 0\`) hors d’un univers réellement néobrutaliste : l’ombre bloc sans flou est un costume, pas un système de profondeur.
- **Le chrome décoratif** : mini-courbes (*sparklines*), anneaux de progression et rectangles arrondis à ombre douce qui tiennent lieu de contenu.
- **Le monospace en costume** « technique », au lieu de le réserver au code, aux données et aux mesures.
- **Une police système en voix d’affichage** (Impact, Arial Black, la linéale de la plateforme) sur une page à l’identité propre. Choisis et héberge une police dont le caractère correspond ; la police installée la plus proche est un échec, pas un repli.
- **Des glyphes Unicode ou des emoji** à la place d’un système d’icônes. Les icônes se dessinent, depuis une vraie bibliothèque ou en SVG, avec un trait et une graisse cohérents.
- **Des masques géométriques** (cercle, polygone, découpe en dégradé radial) pour imiter le contour organique d’un sujet photographié. Extrais un vrai masque alpha de l’image ou produis un visuel détouré.
- **Clair ou sombre choisi par catégorie** (« un outil de développeur, donc sombre »). Choisis d’après la scène d’usage : qui, où, sous quelle lumière ambiante.`,
      examples: [
        {
          title: 'La bordure latérale colorée',
          bad: {
            alt: 'Alerte arrondie au fond jaune pâle avec une épaisse bordure orange sur le côté gauche.',
            html: `<div class="al-wrap"><div class="al al--stripe"><p><strong>Ton abonnement expire le 30 avril.</strong> Renouvelle-le pour garder l’accès à tes factures.</p><span class="al-a">Renouveler</span></div></div>`,
            css: `.al-wrap { padding: 16px; }
.al { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; padding: 12px 14px; border-radius: 10px; background: #fff7e6; color: #5c3b00; font-size: 14px; line-height: 1.5; }
.al--stripe { border-left: 5px solid #f59e0b; }
.al-a { font-weight: 650; text-decoration: underline; text-underline-offset: 3px; }`,
          },
          badNote: 'Le trait coloré de 5 px sur une carte arrondie : le tic le plus reconnaissable.',
          good: {
            alt: 'Même alerte avec une icône d’avertissement, une fine bordure ambrée sur tout le pourtour et le lien « Renouveler ».',
            html: `<div class="al-wrap"><div class="al"><i data-icon="triangle-alert" style="--ico:18px"></i><p class="mk-grow"><strong>Ton abonnement expire le 30 avril.</strong> Renouvelle-le pour garder l’accès à tes factures.</p><span class="al-a">Renouveler</span></div></div>`,
            css: `.al-wrap { padding: 16px; }
.al { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; padding: 12px 14px; border-radius: 10px; background: #fff7e6; color: #5c3b00; font-size: 14px; line-height: 1.5; border: 1px solid #f0c27a; }
.al .mk-ico { color: #b45309; }
.al-a { font-weight: 650; text-decoration: underline; text-underline-offset: 3px; }`,
          },
          goodNote: 'Une icône et une bordure fine sur tout le pourtour suffisent à signaler l’avertissement.',
        },
        {
          title: 'Des glyphes à la place d’icônes',
          bad: {
            alt: 'Menu de réglages dont les icônes sont des emoji colorés et des caractères Unicode de tailles et de styles différents.',
            html: `<ul class="gl"><li><span class="gl-g">🔔</span>Notifications</li><li><span class="gl-g">🔒</span>Sécurité</li><li><span class="gl-g">💳</span>Paiement</li><li><span class="gl-g gl-g--txt">★</span>Favoris</li><li><span class="gl-g gl-g--txt">✉</span>Messages</li></ul>`,
            css: `.gl { list-style: none; margin: 0; padding: 8px 16px; }
.gl li { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid #eceef2; font-size: 14px; }
.gl-g { width: 20px; text-align: center; font-size: 16px; }
.gl-g--txt { font-size: 18px; color: #1d2230; }`,
          },
          badNote: 'Emoji en couleur et glyphes noirs mélangés : styles, couleurs et tailles optiques incohérents.',
          good: {
            alt: 'Même menu avec des icônes dessinées au trait, toutes de même graisse et de même couleur.',
            html: `<ul class="gl"><li><i data-icon="bell"></i>Notifications</li><li><i data-icon="lock"></i>Sécurité</li><li><i data-icon="credit-card"></i>Paiement</li><li><i data-icon="star"></i>Favoris</li><li><i data-icon="mail"></i>Messages</li></ul>`,
            css: `.gl { list-style: none; margin: 0; padding: 8px 16px; }
.gl li { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid #eceef2; font-size: 14px; }
.gl .mk-ico { color: #3d4657; }`,
          },
          goodNote: 'Une bibliothèque d’icônes : même trait, même graisse, même couleur.',
        },
      ],
    },
    {
      id: 'codex',
      title: 'Les finitions qui trahissent un générateur',
      body: `Un dernier bloc vise des tics précis des générateurs de code :

- **Approche** : elle s’arrête à **−0,04em** ; −0,02 à −0,03em se lit généralement mieux.
- **Une seule élévation** : déclare-la une fois, **bordure ou ombre**. Une bordure de 1 px sous une large ombre douce, c’est la **carte fantôme**.
- **Rayons** : les cartes restent entre **12 et 16 px** ; la pilule (rayon complet) est réservée aux **petits contrôles**.
- **Une vraie illustration, ou aucune** : les scènes SVG façon croquis, les classes \`loose-sketch\` ou \`doodle\` et le grain \`feTurbulence\` font amateur. Cela vise le SVG qui imite une image, jamais le SVG qui fait de la géométrie : formes vectorielles nettes, diagrammes, tracés animés et effets de shader restent des médias de premier plan.
- **Les fonds sont des surfaces**, texturées seulement depuis le monde du sujet. Les rayures en \`repeating-linear-gradient\` et les quadrillages sur deux axes exigent une vraie toile, une carte, un plan ou un outil de mesure dessous.
- **Honnêteté du matériau** : affirmations et configurations viennent de la vérité fournie ; une valeur illustrative s’étiquette honnêtement. Nommer un concept pour le tourner en dérision (« fini le théâtre de la sécurité ») n’est pas une affirmation.`,
      examples: [
        {
          title: 'Une seule élévation',
          bad: {
            alt: 'Trois cartes de chantier, chacune avec une fine bordure grise et une large ombre diffuse.',
            html: `<div class="gh"><div class="gh-card gh-card--ghost"><b>Rénovation cuisine</b><span>Devis envoyé</span></div><div class="gh-card gh-card--ghost"><b>Salle de bain</b><span>En cours</span></div><div class="gh-card gh-card--ghost"><b>Terrasse bois</b><span>Terminé</span></div></div>`,
            css: `.gh { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 12px; padding: 22px 16px 28px; background: #fff; }
.gh-card { display: flex; flex-direction: column; gap: 4px; padding: 12px; border-radius: 12px; font-size: 12px; color: #5a6172; }
.gh-card b { font-size: 13px; color: #1d2230; }
.gh-card--ghost { border: 1px solid #e5e7eb; box-shadow: 0 18px 40px -10px rgb(15 23 42 / 0.22); }`,
          },
          badNote: 'Bordure d’un pixel et large ombre sur chaque carte : la carte fantôme.',
          good: {
            alt: 'Mêmes trois cartes posées sur un fond gris clair, avec une simple bordure et aucune ombre.',
            html: `<div class="gh"><div class="gh-card"><b>Rénovation cuisine</b><span>Devis envoyé</span></div><div class="gh-card"><b>Salle de bain</b><span>En cours</span></div><div class="gh-card"><b>Terrasse bois</b><span>Terminé</span></div></div>`,
            css: `.gh { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 12px; padding: 22px 16px 28px; background: #f3f5f8; }
.gh-card { display: flex; flex-direction: column; gap: 4px; padding: 12px; border-radius: 12px; font-size: 12px; color: #5a6172; background: #fff; border: 1px solid #dfe3ea; }
.gh-card b { font-size: 13px; color: #1d2230; }`,
          },
          goodNote: 'Un bord net sur un fond légèrement teinté : une seule déclaration d’élévation.',
        },
        {
          title: 'Des rayons à leur place',
          bad: {
            alt: 'Carte de commande aux coins très arrondis, avec une pastille d’état, un bandeau en forme de pilule sur deux lignes et un grand bouton en pilule.',
            html: `<div class="rd-wrap"><div class="rd rd--round"><div class="rd-top"><p class="rd-h">Commande n° 2041</p><span class="rd-chip">Expédiée</span></div><p class="rd-band">Livraison prévue demain entre 9 h et 13 h, au point relais Les Halles.</p><span class="rd-btn">Suivre le colis</span></div></div>`,
            css: `.rd-wrap { padding: 16px; background: #f3f5f8; }
.rd { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; padding: 18px; background: #fff; border: 1px solid #dfe3ea; }
.rd--round { border-radius: 34px; }
.rd-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; align-self: stretch; }
.rd-chip { padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 650; background: #e3f4e8; color: #1d6b3c; }
.rd--round .rd-band { border-radius: 999px; padding: 10px 18px; }
.rd--round .rd-btn { border-radius: 999px; padding: 12px 26px; }
.rd-h { font-size: 16px; font-weight: 700; }
.rd-band { font-size: 13px; line-height: 1.45; background: #e8f0fb; color: #1d3c6e; }
.rd-btn { background: #1f4fd8; color: #fff; font-weight: 600; font-size: 14px; }`,
          },
          badNote: 'Rayon de 34 px sur la carte et pilules partout, même sur un bloc de deux lignes.',
          good: {
            alt: 'Même carte avec des coins à 14 px, un bandeau aux coins légèrement arrondis, un bouton à 8 px et une petite pastille d’état en pilule.',
            html: `<div class="rd-wrap"><div class="rd"><div class="rd-top"><p class="rd-h">Commande n° 2041</p><span class="rd-chip">Expédiée</span></div><p class="rd-band">Livraison prévue demain entre 9 h et 13 h, au point relais Les Halles.</p><span class="rd-btn">Suivre le colis</span></div></div>`,
            css: `.rd-wrap { padding: 16px; background: #f3f5f8; }
.rd { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; padding: 18px; background: #fff; border: 1px solid #dfe3ea; border-radius: 14px; }
.rd-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; align-self: stretch; }
.rd-h { font-size: 16px; font-weight: 700; }
.rd-chip { padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 650; background: #e3f4e8; color: #1d6b3c; }
.rd-band { padding: 10px 12px; border-radius: 8px; font-size: 13px; line-height: 1.45; background: #e8f0fb; color: #1d3c6e; }
.rd-btn { padding: 9px 16px; border-radius: 8px; background: #1f4fd8; color: #fff; font-weight: 600; font-size: 14px; }`,
          },
          goodNote: 'Carte à 14 px, bouton à 8 px ; la pilule reste à la petite pastille d’état.',
        },
      ],
    },
    {
      id: 'plafond',
      title: 'Le plancher n’est pas le plafond',
      body: `Un rendu qui passe toutes les vérifications n’est pas encore un bon design : il est seulement **sans défaut mécanique**. impeccable conclut le plancher ainsi : quand tout est au vert, **dépense la page sur le monde choisi** ; et quand tu hésites entre « raffiné » et « engagé », **engage-toi**.

- Le plancher élimine les erreurs que tout le monde remarque ; la direction fait ce que personne d’autre n’aurait fait pour ce produit.
- Un résultat propre mais interchangeable, qu’un produit voisin pourrait reprendre tel quel, n’a pas fini son travail.
- Le détecteur suit la même logique : un rapport vide est une preuve, pas une garantie de qualité visuelle ou d’accessibilité. Il ne remplace pas l’examen du rendu aux tailles utiles.

Autrement dit, le plancher protège le visiteur ; il ne remplace pas une idée.`,
    },
  ],
  rules: [
    { id: 'contrast', front: 'Quel contraste pour le texte courant, les placeholders et le grand texte ?', back: '4,5:1 pour le texte courant et les placeholders, 3:1 pour le grand texte. Sur fond coloré, teinte le texte secondaire, jamais de gris.' },
    { id: 'depth', front: 'Qu’est-ce qui distingue une ombre d’un halo décoratif ?', back: 'L’ombre a un décalage et un flou doux. Un halo coloré sans décalage est de la décoration.' },
    { id: 'heading-space', front: 'Autour d’un titre, où mettre le plus d’espace ?', back: 'Au-dessus : le titre se lie au contenu qu’il introduit, pas au bloc précédent.' },
    { id: 'type-floor', front: 'Quelles sont les trois bornes typographiques du plancher ?', back: 'Mesure du corps de 65 à 75 caractères, affichage plafonné à 6rem, approche jamais sous −0,04em.' },
    { id: 'motion', front: 'Quel mouvement le plancher attend-il ?', back: 'Un seul moment signé, en sortie exponentielle depuis un état déjà visible. Pas la même entrée sur chaque section.' },
    { id: 'browser', front: 'Quelles surfaces du navigateur faut-il thématiser ?', back: 'Sélection, curseur de saisie, barres de défilement, anneaux de focus, décalage du soulignement, chiffres des tableaux.' },
    { id: 'states', front: 'Quels états livrer, et que doit dire une erreur ?', back: 'Survol, désactivé, chargement, erreur, vide, plus le focus clavier. Une erreur nomme le problème et la façon d’en sortir.' },
    { id: 'kicker', front: 'Quel est le seul interdit absolu de la liste « Refuser » ?', back: 'Le sur-titre (kicker, eyebrow) au-dessus d’un titre : aucun brief ne le rachète.' },
    { id: 'stripe', front: 'Bordure latérale colorée : quelle limite ?', back: '1 px au plus sur les cartes, éléments de liste, encadrés et alertes.' },
    { id: 'elevation', front: 'Bordure et ombre sur une même carte ?', back: 'Non : une seule élévation. Une bordure de 1 px sous une large ombre douce, c’est la carte fantôme.' },
    { id: 'radius', front: 'Quels rayons pour les cartes, et pour les pilules ?', back: 'Cartes : 12 à 16 px. La pilule est réservée aux petits contrôles.' },
    { id: 'backgrounds', front: 'Quand un fond rayé ou quadrillé est-il justifié ?', back: 'Seulement sur une vraie toile, une carte, un plan ou un outil de mesure. Ailleurs, une surface unie.' },
    { id: 'theme', front: 'Clair ou sombre : comment choisir ?', back: 'D’après la scène d’usage (qui, où, sous quelle lumière), pas d’après la catégorie du produit.' },
    { id: 'ceiling', front: 'Tout est au vert : la page est-elle finie ?', back: 'Non. Le plancher n’est pas le plafond : dépense la page sur le monde choisi ; entre raffiné et engagé, engage-toi.' },
  ],
  exercises: [
    {
      id: 'craft-floor-placeholder-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la teinte du texte indicatif du champ « Adresse e-mail » pour qu’il soit lisible sans passer pour une vraie saisie.',
      context: 'Le champ « Nom » est déjà rempli : compare les deux.',
      visual: {
        alt: 'Formulaire avec un champ Nom rempli et un champ Adresse e-mail vide dont le texte indicatif change de teinte avec le curseur.',
        html: `<div class="mk-pad mk-stack" style="--gap:14px"><div class="mk-field"><span class="mk-label">Nom</span><span class="mk-input">Camille Martin</span></div><div class="mk-field"><span class="mk-label">Adresse e-mail</span><span class="mk-input ph">prenom.nom@exemple.fr</span></div></div>`,
        css: `.ph { color: hsl(0 0% var(--v, 74%)); }`,
      },
      control: 'Luminosité du texte indicatif',
      min: 10,
      max: 90,
      step: 1,
      initial: 74,
      unit: '%',
      target: [35, 46],
      ideal: 42,
      readout: { kind: 'contrast', background: '#ffffff' },
      explanation: `Le plancher de qualité exige **4,5:1** pour le texte courant **et pour le texte indicatif** (*placeholder*). Le gris très clair qu’on voit partout (environ 1,9:1 au départ) échoue : beaucoup de gens ne le lisent tout simplement pas.

L’autre borne est un risque d’usage : un texte indicatif presque aussi foncé que la vraie saisie (15,9:1 ici) peut passer pour une valeur déjà remplie, et le champ semble complété. Entre environ 7:1 et 4,6:1, il reste lisible et nettement plus clair que « Camille Martin ».

Mieux encore : ne confie pas d’information indispensable au seul texte indicatif, qui disparaît dès qu’on tape. Le libellé reste au-dessus du champ.`,
      takeaway: 'Le texte indicatif vise 4,5:1 au moins, tout en restant nettement plus clair qu’une vraie saisie.',
      sources: ['imp:craft-floor', 'wcag:contrast', { label: 'Nielsen Norman Group — Placeholders in Form Fields Are Harmful', url: 'https://www.nngroup.com/articles/form-design-placeholders/' }],
    },
    {
      id: 'craft-floor-kicker-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle section de tarifs suit le plancher de qualité ?',
      options: [
        {
          id: 'kicker',
          visual: {
            alt: 'Section avec un petit libellé « TARIFS » en capitales espacées au-dessus du titre « Un prix simple, sans engagement », un texte et un bouton.',
            html: `<div class="pk"><p class="pk-k">TARIFS</p><p class="pk-h">Un prix simple, sans engagement</p><p class="pk-p">9 € par mois et par utilisateur, résiliable à tout moment.</p><span class="mk-btn">Commencer l’essai</span></div>`,
            css: `.pk { padding: 22px 18px; display: flex; flex-direction: column; align-items: flex-start; }
.pk-k { font-size: 11px; font-weight: 700; letter-spacing: .18em; color: #1f4fd8; }
.pk-h { margin-top: 8px; font-size: 22px; line-height: 1.2; font-weight: 750; letter-spacing: -0.01em; }
.pk-p { margin: 8px 0 16px; font-size: 14px; color: #4b5262; }`,
          },
          why: 'Le libellé « TARIFS » au-dessus du titre est un sur-titre : un interdit sans exception.',
        },
        {
          id: 'heading',
          visual: {
            alt: 'Section avec le titre « 9 € par mois et par utilisateur, sans engagement », un texte et un bouton.',
            html: `<div class="pk"><p class="pk-h">9 € par mois et par utilisateur, sans engagement</p><p class="pk-p">Résiliable à tout moment, depuis les réglages du compte.</p><span class="mk-btn">Commencer l’essai</span></div>`,
            css: `.pk { padding: 22px 18px; display: flex; flex-direction: column; align-items: flex-start; }
.pk-h { font-size: 22px; line-height: 1.2; font-weight: 750; letter-spacing: -0.01em; }
.pk-p { margin: 8px 0 16px; font-size: 14px; color: #4b5262; }`,
          },
          why: 'Le titre porte l’information elle-même : plus besoin d’annoncer qu’il s’agit des tarifs.',
        },
      ],
      answer: 'heading',
      explanation: `Le sur-titre (*kicker* ou *eyebrow*) est le seul élément de la liste « Refuser » qu’impeccable classe comme **interdit absolu** : aucun brief ne le rachète. Il répète ce que le contexte dit déjà et pousse le titre à rester vague.

La correction n’est pas de rendre le libellé plus discret, mais de **le supprimer et de laisser parler le titre**. Si ses mots comptent, ils entrent dans le titre : ici, le prix lui-même.`,
      takeaway: 'Pas de sur-titre au-dessus d’un titre : supprime-le et fais porter l’information par le titre.',
      sources: ['imp:craft-floor'],
    },
    {
      id: 'craft-floor-stripe-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle liste de notifications marque le mieux les éléments non lus ?',
      options: [
        {
          id: 'stripe',
          visual: {
            alt: 'Liste de notifications où les éléments non lus sont des cartes arrondies avec une épaisse bordure bleue sur le côté gauche.',
            html: `<ul class="nt"><li class="nt-i nt-i--stripe"><b>Facture F-2026-031 payée</b><span>Virement de M. Roux · il y a 5 min</span></li><li class="nt-i nt-i--stripe"><b>Nouveau devis à signer</b><span>Salle de bain Dupuis · il y a 1 h</span></li><li class="nt-i"><b>Relance envoyée</b><span>Facture F-2026-027 · hier</span></li></ul>`,
            css: `.nt { list-style: none; margin: 0; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.nt-i { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border-radius: 10px; background: #fff; border: 1px solid #e3e6ec; font-size: 13px; color: #5a6172; }
.nt-i b { font-size: 14px; color: #1d2230; }
.nt-i--stripe { border-left: 4px solid #1f4fd8; }`,
          },
          why: 'Une bordure gauche de 4 px sur une carte arrondie : le tic le plus reconnaissable des interfaces générées.',
        },
        {
          id: 'dot',
          visual: {
            alt: 'Liste de notifications où les éléments non lus ont un fond bleu très pâle, un titre en gras et un point bleu.',
            html: `<ul class="nt"><li class="nt-i nt-i--new"><span class="nt-dot"></span><div><b>Facture F-2026-031 payée</b><span>Virement de M. Roux · il y a 5 min</span></div></li><li class="nt-i nt-i--new"><span class="nt-dot"></span><div><b>Nouveau devis à signer</b><span>Salle de bain Dupuis · il y a 1 h</span></div></li><li class="nt-i"><span class="nt-dot nt-dot--off"></span><div><b class="nt-read">Relance envoyée</b><span>Facture F-2026-027 · hier</span></div></li></ul>`,
            css: `.nt { list-style: none; margin: 0; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.nt-i { display: flex; gap: 10px; align-items: flex-start; padding: 10px 12px; border-radius: 10px; background: #fff; border: 1px solid #e3e6ec; font-size: 13px; color: #5a6172; }
.nt-i div { display: flex; flex-direction: column; gap: 2px; }
.nt-i b { font-size: 14px; color: #1d2230; }
.nt-i .nt-read { font-weight: 500; }
.nt-i--new { background: #f2f6ff; border-color: #d3def8; }
.nt-dot { flex: none; width: 8px; height: 8px; margin-top: 6px; border-radius: 50%; background: #1f4fd8; }
.nt-dot--off { background: transparent; }`,
          },
          why: 'Point, graisse et teinte de fond signalent le non-lu sans trait latéral.',
        },
      ],
      answer: 'dot',
      explanation: `Le plancher refuse **toute bordure gauche ou droite colorée de plus de 1 px** sur les cartes, éléments de liste, encadrés et alertes. Le détecteur la classe parmi les signes les plus reconnaissables des interfaces générées (règle *side-tab*).

Pour signaler un état, d’autres moyens sont plus précis : un point, une graisse plus forte, une légère teinte de fond, une icône. Ils marquent l’élément entier, pas un de ses bords.`,
      takeaway: 'Pas de trait coloré de plus de 1 px sur le côté d’une carte : marque l’état par un point, la graisse ou la teinte.',
      sources: ['imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'craft-floor-ghost-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle rangée de formules déclare son élévation proprement ?',
      options: [
        {
          id: 'ghost',
          visual: {
            alt: 'Trois cartes de formules Solo, Équipe et Agence, chacune avec une fine bordure grise et une grande ombre diffuse.',
            html: `<div class="pl"><div class="pl-c pl-c--ghost"><b>Solo</b><span class="pl-p">9 €</span><span>1 utilisateur</span></div><div class="pl-c pl-c--ghost"><b>Équipe</b><span class="pl-p">29 €</span><span>5 utilisateurs</span></div><div class="pl-c pl-c--ghost"><b>Agence</b><span class="pl-p">79 €</span><span>20 utilisateurs</span></div></div>`,
            css: `.pl { display: grid; grid-template-columns: repeat(auto-fit, minmax(104px, 1fr)); gap: 12px; padding: 22px 16px 30px; background: #fff; }
.pl-c { display: flex; flex-direction: column; gap: 2px; padding: 12px; border-radius: 12px; font-size: 12px; color: #5a6172; background: #fff; }
.pl-c b { font-size: 14px; color: #1d2230; }
.pl-p { font-size: 20px; font-weight: 750; color: #1d2230; font-variant-numeric: tabular-nums; white-space: nowrap; }
.pl-c--ghost { border: 1px solid #e5e7eb; box-shadow: 0 20px 44px -10px rgb(15 23 42 / 0.24); }`,
          },
          why: 'Chaque carte porte à la fois une bordure d’un pixel et une large ombre diffuse : la « carte fantôme » répétée sur toute la rangée.',
        },
        {
          id: 'border',
          visual: {
            alt: 'Trois cartes de formules posées sur un fond gris clair, avec une simple bordure, la formule Équipe sur un fond bleu très pâle.',
            html: `<div class="pl"><div class="pl-c"><b>Solo</b><span class="pl-p">9 €</span><span>1 utilisateur</span></div><div class="pl-c pl-c--on"><b>Équipe</b><span class="pl-p">29 €</span><span>5 utilisateurs</span></div><div class="pl-c"><b>Agence</b><span class="pl-p">79 €</span><span>20 utilisateurs</span></div></div>`,
            css: `.pl { display: grid; grid-template-columns: repeat(auto-fit, minmax(104px, 1fr)); gap: 12px; padding: 22px 16px 30px; background: #f3f5f8; }
.pl-c { display: flex; flex-direction: column; gap: 2px; padding: 12px; border-radius: 12px; font-size: 12px; color: #5a6172; background: #fff; border: 1px solid #dfe3ea; }
.pl-c b { font-size: 14px; color: #1d2230; }
.pl-p { font-size: 20px; font-weight: 750; color: #1d2230; font-variant-numeric: tabular-nums; white-space: nowrap; }
.pl-c--on { background: #eef3ff; border-color: #9fb6ee; }`,
          },
          why: 'Une seule déclaration d’élévation : un bord net sur un fond teinté. La formule mise en avant se distingue par sa teinte.',
        },
      ],
      answer: 'border',
      explanation: `Le bloc « codex » du plancher demande de **déclarer l’élévation une fois : bordure ou ombre**. Une bordure de 1 px sous une large ombre douce, c’est la **carte fantôme**, une signature récurrente des interfaces générées.

Le détecteur la signale quand elle se répète sur une rangée (au moins trois cartes, ombre floutée sur 32 px ou plus) : un panneau flottant isolé, comme un menu ou une boîte de dialogue, mérite les deux ; une rangée entière qui les porte trahit un réglage par défaut que personne n’a choisi.`,
      takeaway: 'Une seule élévation par carte : un bord net ou une ombre douce, pas les deux sur toute une rangée.',
      sources: ['imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'craft-floor-tint-duel',
      type: 'choice',
      difficulty: 3,
      prompt: 'Sur cette carte d’offre, quel texte secondaire est le mieux réglé ?',
      context: 'Les deux versions dépassent 4,5:1.',
      options: [
        {
          id: 'gray',
          visual: {
            alt: 'Carte bleu soutenu avec un titre blanc et une liste d’avantages en gris neutre clair.',
            html: `<div class="of"><p class="of-t">Offre Pro</p><p class="of-price">29 € par mois</p><ul class="of-l of-l--gray"><li>Factures et devis illimités</li><li>Relances automatiques</li><li>Export pour ton comptable</li></ul></div>`,
            css: `.of { margin: 14px; padding: 18px; border-radius: 14px; background: #23408e; color: #fff; }
.of-t { font-size: 13px; font-weight: 650; }
.of-price { margin-top: 2px; font-size: 24px; font-weight: 800; letter-spacing: -0.01em; }
.of-l { margin: 10px 0 0; padding-inline-start: 18px; font-size: 14px; line-height: 1.7; color: #d2dcf7; }
.of-l--gray { color: #b3b8bf; }`,
          },
          why: 'Le gris neutre passe le contraste (4,79:1) mais paraît terne et sale sur le bleu.',
        },
        {
          id: 'tint',
          visual: {
            alt: 'Même carte avec une liste d’avantages en bleu très pâle, tiré de la couleur du fond.',
            html: `<div class="of"><p class="of-t">Offre Pro</p><p class="of-price">29 € par mois</p><ul class="of-l"><li>Factures et devis illimités</li><li>Relances automatiques</li><li>Export pour ton comptable</li></ul></div>`,
            css: `.of { margin: 14px; padding: 18px; border-radius: 14px; background: #23408e; color: #fff; }
.of-t { font-size: 13px; font-weight: 650; }
.of-price { margin-top: 2px; font-size: 24px; font-weight: 800; letter-spacing: -0.01em; }
.of-l { margin: 10px 0 0; padding-inline-start: 18px; font-size: 14px; line-height: 1.7; color: #d2dcf7; }`,
          },
          why: 'Un bleu pâle tiré du fond (6,98:1) : le texte recule sans se salir et appartient à la carte.',
        },
      ],
      answer: 'tint',
      explanation: `Le contraste minimal est nécessaire, pas suffisant. Le plancher le dit en une ligne : **sur une surface colorée, teinte le texte secondaire depuis la couleur du fond ou du premier plan ; jamais de gris.**

Un gris neutre posé sur une couleur saturée paraît délavé, presque sale, parce que l’œil le compare à la teinte qui l’entoure. Une version très claire de la teinte du fond garde la hiérarchie (le texte reste secondaire) tout en s’intégrant. Le détecteur signale ce cas dans sa règle *Gray text on colored background*.`,
      takeaway: 'Sur un fond coloré, le texte secondaire se teinte du fond ou du premier plan, même quand un gris passerait le contraste.',
      sources: ['imp:craft-floor', 'imp:colorize', 'imp:detector'],
    },
    {
      id: 'craft-floor-heading-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Dans quelle page d’aide les intertitres se rattachent-ils clairement à leur section ?',
      options: [
        {
          id: 'equal',
          visual: {
            alt: 'Page d’aide dont les intertitres ont autant d’espace au-dessus qu’en dessous.',
            html: `<div class="fq"><p class="fq-t">Exporter ta comptabilité</p><p class="fq-p">L’export regroupe tes factures, avoirs et encaissements de la période choisie.</p><p class="fq-h">Choisir le format</p><p class="fq-p">FEC pour ton expert-comptable, CSV pour un tableur.</p><p class="fq-h">Envoyer l’export</p><p class="fq-p">Le fichier part par e-mail ; le lien reste valable 7 jours.</p></div>`,
            css: `.fq { padding: 18px; }
.fq-t { font-size: 19px; font-weight: 750; margin-bottom: 8px; }
.fq-p { font-size: 14px; line-height: 1.55; color: #3a4150; }
.fq-h { margin: 14px 0 14px; font-size: 15px; font-weight: 700; }`,
          },
          why: 'Autant d’espace au-dessus qu’en dessous : l’intertitre flotte entre deux blocs.',
        },
        {
          id: 'above',
          visual: {
            alt: 'Page d’aide dont les intertitres ont nettement plus d’espace au-dessus qu’en dessous.',
            html: `<div class="fq"><p class="fq-t">Exporter ta comptabilité</p><p class="fq-p">L’export regroupe tes factures, avoirs et encaissements de la période choisie.</p><p class="fq-h">Choisir le format</p><p class="fq-p">FEC pour ton expert-comptable, CSV pour un tableur.</p><p class="fq-h">Envoyer l’export</p><p class="fq-p">Le fichier part par e-mail ; le lien reste valable 7 jours.</p></div>`,
            css: `.fq { padding: 18px; }
.fq-t { font-size: 19px; font-weight: 750; margin-bottom: 8px; }
.fq-p { font-size: 14px; line-height: 1.55; color: #3a4150; }
.fq-h { margin: 24px 0 4px; font-size: 15px; font-weight: 700; }`,
          },
          why: 'Beaucoup d’air au-dessus, peu en dessous : chaque intertitre ouvre clairement sa section.',
        },
      ],
      answer: 'above',
      explanation: `Un titre se lie au contenu qu’il introduit. Selon la loi de proximité, l’œil groupe ce qui est proche : si l’intertitre est aussi près du bloc précédent que du sien, il semble légender ce qui précède.

Le plancher demande donc **plus d’espace au-dessus d’un titre qu’en dessous**, avec des groupes serrés et des séparations généreuses. Le détecteur le vérifie sur les valeurs calculées (règle *Heading crowded against the previous block*).`,
      takeaway: 'Mets plus d’espace au-dessus d’un titre qu’en dessous : il appartient au bloc qu’il ouvre.',
      sources: ['imp:craft-floor', 'imp:detector', 'lawsofux'],
    },
    {
      id: 'craft-floor-dashboard-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Tableau de bord d’une boutique de thé en ligne.',
      prompt: 'Trouve les trois réflexes que le plancher de qualité demande de refuser.',
      visual: {
        alt: 'Tableau de bord avec un grand chiffre d’affaires accompagné de statistiques d’appoint, un anneau « Performance 78 % », une liste de raccourcis à emoji, un filtre de période et un tableau des dernières commandes.',
        html: `<div class="td">
  <div class="td-top"><p class="td-h">Bonjour Inès</p><span class="td-filter" data-hotspot="filter"><i data-icon="calendar" style="--ico:14px"></i>7 derniers jours <i data-icon="chevron-down" style="--ico:14px"></i></span></div>
  <div class="td-row">
    <div class="td-hero" data-hotspot="hero"><span class="td-big">12 480 €</span><span class="td-lbl">Chiffre d’affaires</span><div class="td-stats"><span><b>+12 %</b> vs N-1</span><span><b>318</b> commandes</span><span><b>39 €</b> panier</span></div></div>
    <div class="td-ring" data-hotspot="ring"><span class="td-ring-c">78 %</span><span class="td-lbl">Performance</span></div>
  </div>
  <ul class="td-emoji" data-hotspot="emoji"><li>📦 Commandes à préparer</li><li>💬 Messages clients</li><li>⭐ Avis à modérer</li></ul>
  <table class="td-t" data-hotspot="table"><thead><tr><th>Commande</th><th>Client</th><th class="n">Montant</th></tr></thead><tbody><tr><td>#4821</td><td>L. Garnier</td><td class="n">54,90 €</td></tr><tr><td>#4820</td><td>A. Diallo</td><td class="n">23,50 €</td></tr></tbody></table>
</div>`,
        css: `.td { padding: 14px; display: flex; flex-direction: column; gap: 10px; background: #f6f7f9; }
.td-top { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.td-h { font-size: 16px; font-weight: 700; }
.td-filter { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid #cdd3dc; border-radius: 6px; background: #fff; font-size: 12px; }
.td-row { display: flex; gap: 10px; }
.td-hero { flex: 1; min-width: 0; display: flex; flex-direction: column; padding: 12px; border-radius: 12px; background: #fff; box-shadow: 0 6px 18px rgb(15 23 42 / 0.08); border-top: 3px solid #10b981; }
.td-big { font-size: 30px; line-height: 1.05; font-weight: 800; letter-spacing: -0.02em; white-space: nowrap; }
.td-lbl { font-size: 11px; color: #5a6172; }
.td-stats { display: flex; flex-wrap: wrap; gap: 4px 10px; margin-top: 8px; font-size: 11px; color: #5a6172; }
.td-stats b { color: #047857; }
.td-ring { flex: none; width: 104px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px; border-radius: 12px; background: #fff; box-shadow: 0 6px 18px rgb(15 23 42 / 0.08); }
.td-ring-c { display: grid; place-items: center; width: 62px; height: 62px; border-radius: 50%; font-size: 14px; font-weight: 750; background: radial-gradient(closest-side, #fff 76%, transparent 78% 100%), conic-gradient(#10b981 78%, #e5e7eb 0); }
.td-emoji { list-style: none; margin: 0; padding: 4px 12px; border-radius: 12px; background: #fff; font-size: 13px; }
.td-emoji li { padding: 5px 0; }
.td-t { width: 100%; border-collapse: collapse; font-size: 12px; background: #fff; border-radius: 8px; }
.td-t th, .td-t td { padding: 6px 8px; text-align: start; border-bottom: 1px solid #edf0f3; }
.td-t th { color: #5a6172; font-weight: 600; }
.td-t .n { text-align: end; font-variant-numeric: tabular-nums; }`,
      },
      hotspots: [
        { id: 'hero', label: 'Gros chiffre et statistiques d’appoint', correct: true, why: 'Le modèle « chiffre héros » : gros nombre, petit libellé, statistiques d’appoint, accent. Il remplit l’écran sans dire quoi faire.' },
        { id: 'ring', label: 'Anneau « Performance 78 % »', correct: true, why: 'Un anneau de progression qui tient lieu de contenu : 78 % de quoi ? Chrome décoratif.' },
        { id: 'emoji', label: 'Raccourcis à emoji', correct: true, why: 'Des emoji à la place d’un système d’icônes : styles et tailles optiques incohérents.' },
        { id: 'filter', label: 'Filtre de période', correct: false, why: 'Un contrôle standard qui dit ce qu’il filtre.' },
        { id: 'table', label: 'Tableau des dernières commandes', correct: false, why: 'Du vrai contenu, avec des montants en chiffres tabulaires.' },
      ],
      explanation: `Trois réflexes de la liste « Refuser » se cumulent ici :

- **le modèle « chiffre héros »** (gros nombre, petit libellé, statistiques d’appoint, accent) ;
- **le chrome décoratif** : anneaux de progression, mini-courbes et rectangles à ombre douce qui tiennent lieu de contenu ;
- **des glyphes ou emoji** à la place d’un système d’icônes dessinées, au trait et à la graisse cohérents.

Le filtre et le tableau, eux, font leur travail : ils aident la gérante à agir sur ses commandes.`,
      takeaway: 'Refuse le chiffre héros, le chrome décoratif et les emoji-icônes : montre du vrai contenu et des icônes dessinées.',
      sources: ['imp:craft-floor'],
    },
    {
      id: 'craft-floor-form-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Formulaire de demande de congé dans un logiciel RH.',
      prompt: 'Trouve les trois textes qui ne font pas leur travail.',
      visual: {
        alt: 'Formulaire de demande de congé avec deux dates, une erreur sous la date de fin, un texte d’aide, un historique vide et deux boutons.',
        html: `<div class="lv">
  <p class="lv-h">Demande de congé</p>
  <div class="lv-row">
    <div class="mk-field" data-hotspot="start"><span class="mk-label">Date de début</span><span class="mk-input">12/03/2026</span></div>
    <div class="mk-field"><span class="mk-label">Date de fin</span><span class="mk-input mk-input--error">03/03/2026</span><span class="mk-error" data-hotspot="error">Saisie invalide.</span></div>
  </div>
  <p class="mk-help" data-hotspot="help">Les jours posés avant le 31 mai peuvent être reportés.</p>
  <div class="lv-empty" data-hotspot="empty"><p class="lv-eh">Historique</p><p>Aucune donnée.</p></div>
  <div class="lv-acts"><span class="mk-btn mk-btn--ghost" data-hotspot="cancel">Annuler</span><span class="mk-btn" data-hotspot="ok">OK</span></div>
</div>`,
        css: `.lv { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.lv-h { font-size: 17px; font-weight: 700; }
.lv-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
.lv-empty { padding: 12px; border: 1px dashed #c3c8d3; border-radius: 8px; font-size: 13px; color: #5a6172; }
.lv-eh { font-weight: 650; color: #1d2230; margin-bottom: 2px; }
.lv-acts { display: flex; justify-content: flex-end; gap: 8px; }`,
      },
      hotspots: [
        { id: 'error', label: 'Erreur « Saisie invalide. »', correct: true, why: 'Elle ne nomme ni le problème (la fin précède le début) ni la sortie (choisir une date à partir du 12 mars).' },
        { id: 'ok', label: 'Bouton « OK »', correct: true, why: 'Un contrôle nomme son action : « Envoyer la demande ».' },
        { id: 'empty', label: 'Historique « Aucune donnée. »', correct: true, why: 'Un état vide doit enseigner : « Tes demandes apparaîtront ici une fois envoyées. »' },
        { id: 'start', label: 'Champ « Date de début »', correct: false, why: 'Un libellé clair et une valeur au bon format.' },
        { id: 'help', label: 'Texte d’aide sur le report', correct: false, why: 'Une information utile, dite dans la langue du produit.' },
        { id: 'cancel', label: 'Bouton « Annuler »', correct: false, why: 'Le verbe nomme l’action : on comprend ce qui va se passer.' },
      ],
      explanation: `Le plancher traite le texte comme un matériau de design : **la langue du produit**, des **contrôles qui nomment leur action**, des **erreurs qui nomment le problème et la façon d’en sortir**. Et parmi les états à livrer figure l’**état vide**, qui doit apprendre quelque chose plutôt que constater un manque.

Réécrits, ces trois textes deviennent : « La date de fin précède la date de début. Choisis une date à partir du 12 mars. », « Envoyer la demande », et « Tes demandes apparaîtront ici une fois envoyées. »`,
      takeaway: 'Les boutons nomment leur action, les erreurs le problème et la sortie, les états vides ce qui viendra.',
      sources: ['imp:craft-floor', 'imp:operate'],
    },
    {
      id: 'craft-floor-motion-choice',
      type: 'choice',
      difficulty: 2,
      context: 'Page d’accueil d’un logiciel de montage vidéo (mode Persuader). L’équipe veut « du mouvement ».',
      prompt: 'Quelle proposition respecte le plancher de qualité ?',
      options: [
        { id: 'one', label: 'Un seul moment signé : l’aperçu du logiciel se dévoile au chargement, en sortie exponentielle, sur une page déjà visible.', why: 'Un moment unique et pensé, sans conditionner l’affichage du contenu à une animation.' },
        { id: 'every', label: 'Chaque section apparaît en fondu avec un léger glissement quand on fait défiler la page.', why: 'La même entrée sur chaque section : exactement ce que le plancher refuse.' },
        { id: 'bounce', label: 'Les boutons et les cartes rebondissent au survol pour donner de la vie.', why: 'Des effets dispersés, et un amorti élastique qui fait daté.' },
        { id: 'hidden', label: 'Tout le contenu part invisible et apparaît quand le script de révélation s’exécute.', why: 'Si le script échoue, la page reste vide : l’état par défaut doit être visible.' },
      ],
      answer: 'one',
      explanation: `Pour le mouvement, le plancher attend **un seul moment signé**, pas des effets dispersés, et **pas la même entrée sur chaque section**. Ce moment part d’un état par défaut **déjà visible**, avec une **sortie exponentielle** (une décélération franche, comme \`cubic-bezier(0.16, 1, 0.3, 1)\`).

Masquer le contenu en attendant un script est risqué : le détecteur classe « contenu invisible au repos » parmi ses deux règles de sévérité *erreur*. Et les rebonds par réflexe font daté : les objets réels décélèrent en douceur.`,
      takeaway: 'Un seul moment de mouvement signé, en ease-out exponentiel, depuis une page déjà visible.',
      sources: ['imp:craft-floor', 'imp:animate', 'imp:detector'],
    },
    {
      id: 'craft-floor-theme-choice',
      type: 'choice',
      difficulty: 2,
      context:
        'Application de transmissions pour infirmières de nuit, consultée sur tablette dans des couloirs peu éclairés pendant que les patients dorment.',
      prompt: 'Comment choisir entre thème clair et thème sombre ?',
      options: [
        { id: 'scene', label: 'D’après la scène : faible lumière la nuit, près de patients qui dorment, donc un thème sombre et atténué par défaut.', why: 'Le choix part de qui utilise l’écran, où et sous quelle lumière.' },
        { id: 'medical', label: 'Un thème clair, parce que le médical évoque le blanc et l’hygiène.', why: 'C’est un choix par catégorie : il ignore la scène réelle d’usage.' },
        { id: 'pro', label: 'Un thème sombre, parce que les outils professionnels modernes sont sombres.', why: 'Même résultat ici, mais pour une mauvaise raison : l’habitude de la catégorie.' },
        { id: 'brand', label: 'Celui qui met le mieux en valeur la couleur de la marque.', why: 'La marque ne voit pas l’écran à 3 h du matin ; l’infirmière, si.' },
      ],
      answer: 'scene',
      explanation: `Le plancher refuse **le clair ou le sombre choisi par catégorie** (« médical donc blanc », « outil pro donc sombre »). On choisit d’après **la scène d’usage : qui, où, sous quelle lumière ambiante**.

Ici, la scène tranche : un écran très lumineux éblouit dans un couloir sombre et réveille les patients. Un thème sombre atténué sert la tâche. Ce n’est pas la catégorie « outil pro » qui le justifie : la même application utilisée en plein jour en consultation demanderait peut-être l’inverse.`,
      takeaway: 'Choisis clair ou sombre d’après la scène d’usage (qui, où, quelle lumière), jamais d’après la catégorie.',
      sources: ['imp:craft-floor'],
    },
    {
      id: 'craft-floor-earned-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Lesquels de ces choix un brief explicite peut-il légitimement justifier ?',
      options: [
        { id: 'steps', label: 'Des numéros 01, 02, 03 devant les étapes d’une procédure d’installation', why: 'Ici, la séquence porte une information dont le lecteur a besoin.' },
        { id: 'brutal', label: 'Des ombres dures décalées dans un univers néobrutaliste assumé', why: 'Hors de ce monde, c’est un costume ; dans un monde qui l’a choisi, c’est son système de profondeur.' },
        { id: 'glass', label: 'Un effet de verre dépoli précis, demandé par le brief pour un lecteur vidéo', why: 'Le verre est refusé comme décoration, pas comme effet précis et voulu.' },
        { id: 'kicker', label: 'Un sur-titre en capitales espacées au-dessus de chaque titre de section', why: 'C’est le seul interdit absolu : aucun brief ne le rachète.' },
        { id: 'system', label: 'Une police système en titre d’affichage parce qu’elle est déjà installée', why: 'La commodité n’est pas un brief : la police installée la plus proche est un échec, pas un repli.' },
      ],
      answers: ['steps', 'brutal', 'glass'],
      explanation: `Les éléments de la liste « Refuser » sont des **réglages par défaut de la catégorie, pas des interdits** : les mots du brief peuvent en justifier n’importe lequel. Ce qui est refusé, c’est d’y recourir par réflexe quand l’axe est libre.

Deux exceptions de nature différente :

- le **sur-titre** au-dessus d’un titre est un **interdit** : aucun brief ne le rachète ;
- une raison de **commodité** (« elle est déjà installée ») n’est pas un brief. Une police système peut être imposée par le brief, jamais choisie parce qu’elle est là.`,
      takeaway: 'Le brief peut justifier un réflexe de la liste « Refuser », jamais le sur-titre ; la commodité ne vaut pas un brief.',
      sources: ['imp:craft-floor', 'imp:skill'],
    },
    {
      id: 'craft-floor-ceiling-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Une page qui passe toutes les vérifications du plancher de qualité est terminée.',
      answer: false,
      explanation: `Le plancher tient **la mécanique** : contraste, espacement, états, surfaces du navigateur. Il ne choisit jamais la direction. Une page qui le passe est **sans défaut mécanique**, pas encore réussie.

impeccable conclut : quand tout est au vert, **dépense la page sur le monde choisi**, et entre raffiné et engagé, **engage-toi**. Un résultat propre mais interchangeable n’a pas fini son travail.`,
      takeaway: 'Le plancher n’est pas le plafond : une fois tout au vert, engage la page dans son monde.',
      sources: ['imp:craft-floor'],
    },
    {
      id: 'craft-floor-modal-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Pour renommer un projet, une fenêtre modale est le choix le plus sûr.',
      answer: false,
      explanation: `Le plancher refuse **la modale pour une tâche qui n’exige ni interruption ni focus protégé**, et la liste des contraintes produit d’impeccable ajoute : « la modale comme premier réflexe ». Une modale masque le contexte, interrompt et demande un geste de plus pour revenir.

Renommer se fait **sur place** : on clique sur le nom, il devient un champ, Entrée valide, Échap annule. La modale reste utile quand il faut vraiment protéger une décision, comme une suppression définitive.`,
      takeaway: 'Pas de modale par réflexe : épuise d’abord l’édition sur place et la divulgation progressive.',
      sources: ['imp:craft-floor', 'imp:operate', { label: 'Nielsen Norman Group — Modal & Nonmodal Dialogs', url: 'https://www.nngroup.com/articles/modal-nonmodal-dialog/' }],
    },
    {
      id: 'craft-floor-match-values',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque réglage du plancher à sa valeur.',
      leftTitle: 'Réglage',
      rightTitle: 'Valeur',
      pairs: [
        { id: 'body', left: 'Contraste du texte courant et des placeholders', right: '4,5:1 au moins' },
        { id: 'large', left: 'Contraste du grand texte', right: '3:1 au moins' },
        { id: 'measure', left: 'Mesure du corps de texte', right: '65 à 75 caractères' },
        { id: 'display', left: 'Taille maximale d’un titre d’affichage', right: '6rem' },
        { id: 'tracking', left: 'Approche la plus serrée', right: '−0,04em' },
        { id: 'radius', left: 'Rayon des cartes', right: '12 à 16 px' },
      ],
      explanation: `Ces valeurs forment le socle mécanique du plancher :

- **4,5:1** pour le texte courant et les placeholders, **3:1** pour le grand texte (seuils WCAG AA) ;
- **65 à 75 caractères** de mesure pour le corps, un affichage plafonné à **6rem** ;
- une approche qui s’arrête à **−0,04em** (−0,02 à −0,03em se lit souvent mieux) ;
- des cartes entre **12 et 16 px** de rayon, la pilule réservée aux petits contrôles.`,
      takeaway: '4,5:1 et 3:1, 65–75 caractères, 6rem, −0,04em, 12–16 px : le socle chiffré du plancher.',
      sources: ['imp:craft-floor', 'wcag:contrast'],
    },
    {
      id: 'craft-floor-workflow-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces étapes dans l’ordre où impeccable les enchaîne pour une modification d’interface.',
      items: [
        { id: 'direction', label: 'Fixer l’analyse et la direction' },
        { id: 'read', label: 'Relire le plancher de qualité, juste avant d’éditer' },
        { id: 'build', label: 'Construire sans réciter la liste' },
        { id: 'look', label: 'Regarder le rendu aux tailles livrées et grouper les vérifications' },
        { id: 'commit', label: 'Une fois tout au vert, pousser la page vers le monde choisi' },
      ],
      explanation: `Le plancher se lit **après** la direction (il ne la choisit jamais) et **juste avant** toute modification d’interface, même minime. On construit ensuite sans annoncer la liste.

La vérification se fait **sur le rendu**, aux tailles où il sera livré, en groupant les contrôles dans un même regard : on corrige tout ce qu’un regard montre avant de regarder à nouveau. Et quand tout est au vert, le travail continue : le plancher n’est pas le plafond.`,
      takeaway: 'Direction d’abord, plancher juste avant d’éditer, vérification groupée sur le rendu, puis engagement dans le monde.',
      sources: ['imp:skill', 'imp:craft-floor'],
    },
    {
      id: 'craft-floor-browser-duel',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quel panneau de réglages a été construit plutôt qu’assemblé ?',
      options: [
        {
          id: 'default',
          visual: {
            alt: 'Panneau de réglages vert sapin avec des cases à cocher bleues par défaut, un champ entouré d’un anneau de focus bleu et un lien bleu vif souligné.',
            html: `<div class="st st--default"><p class="st-h">Notifications</p><label class="st-c"><input type="checkbox" checked> Nouvelle réservation</label><label class="st-c"><input type="checkbox" checked> Annulation</label><label class="st-c"><input type="checkbox"> Avis client</label><span class="st-in">contact@gite-des-sapins.fr</span><span class="st-a">Voir l’historique des envois</span></div>`,
            css: `.st { padding: 16px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; color: #1e2b24; }
.st-h { font-size: 16px; font-weight: 700; color: #1f4d3a; }
.st-c { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.st-c input { width: 16px; height: 16px; margin: 0; }
.st-in { align-self: stretch; margin-top: 4px; padding: 8px 10px; border: 1px solid #b9c7bf; border-radius: 6px; font-size: 14px; }
.st--default .st-in { outline: 2px solid #1a73e8; }
.st--default .st-a { color: #0000ee; text-decoration: underline; font-size: 14px; }`,
          },
          why: 'Cases à cocher, focus et lien gardent les couleurs par défaut du navigateur, étrangères à la palette verte.',
        },
        {
          id: 'themed',
          visual: {
            alt: 'Même panneau avec des cases à cocher vert sapin, un anneau de focus vert décalé du champ et un lien vert au soulignement fin et décalé.',
            html: `<div class="st st--themed"><p class="st-h">Notifications</p><label class="st-c"><input type="checkbox" checked> Nouvelle réservation</label><label class="st-c"><input type="checkbox" checked> Annulation</label><label class="st-c"><input type="checkbox"> Avis client</label><span class="st-in">contact@gite-des-sapins.fr</span><span class="st-a">Voir l’historique des envois</span></div>`,
            css: `.st { padding: 16px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; color: #1e2b24; }
.st-h { font-size: 16px; font-weight: 700; color: #1f4d3a; }
.st-c { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.st-c input { width: 16px; height: 16px; margin: 0; accent-color: #1f6b4f; }
.st-in { align-self: stretch; margin-top: 4px; padding: 8px 10px; border: 1px solid #1f6b4f; border-radius: 6px; font-size: 14px; }
.st--themed .st-in { outline: 2px solid #1f6b4f; outline-offset: 2px; }
.st--themed .st-a { color: #1f6b4f; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; font-size: 14px; }`,
          },
          why: 'Cases teintées par la couleur d’accent, focus décalé, soulignement réglé : les surfaces du navigateur parlent la langue du produit.',
        },
      ],
      answer: 'themed',
      explanation: `Les **surfaces du navigateur** (cases à cocher, sélection de texte, curseur, barres de défilement, anneaux de focus, soulignement, chiffres des tableaux) sortent avec des réglages par défaut **qui n’appartiennent à aucun système**. Les thématiser depuis la palette est, selon impeccable, **le signal le moins cher qu’une page a été construite plutôt qu’assemblée**, et celui que les modèles oublient le plus souvent.

Quelques propriétés suffisent : \`accent-color\` pour les contrôles natifs, \`:focus-visible\` avec \`outline-offset\`, \`text-underline-offset\` et \`text-decoration-thickness\`, \`::selection\`, \`caret-color\`, \`scrollbar-color\`.`,
      takeaway: 'Thématise les surfaces du navigateur (contrôles natifs, focus, liens, sélection) depuis la palette du produit.',
      sources: ['imp:craft-floor', { label: 'MDN — accent-color', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/accent-color' }],
    },
  ],
};

export default craftFloor;
