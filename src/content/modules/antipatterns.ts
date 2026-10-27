import type { ModuleContent } from '../../engine/types';

const antipatterns: ModuleContent = {
  id: 'antipatterns',
  title: 'Anti-patterns et clichés générés',
  category: 'fondations',
  summary:
    'Reconnaître au premier coup d’œil les tics des interfaces générées par IA et les défauts de qualité, à partir des 62 règles du détecteur d’impeccable, puis savoir les corriger sans se tromper de combat.',
  minutes: 13,
  commands: ['critique', 'audit', 'quieter'],
  sources: ['imp:detector', 'imp:craft-floor', 'imp:critique', 'imp:skill', 'imp:typeset', 'imp:animate', 'wcag:contrast'],
  sections: [
    {
      id: 'pourquoi',
      title: 'Pourquoi les interfaces générées se ressemblent',
      body: `Demande une page d’accueil à un générateur d’interfaces : tu obtiendras souvent la même. Une pastille « Nouveau » au-dessus d’un titre géant en dégradé violet, trois cartes à icône, une lueur dans le fond. Aucun de ces choix n’est absurde isolément. Le problème, c’est qu’ils sont **choisis par réflexe** : la moyenne de milliers de pages, pas une décision prise pour ce produit.

impeccable appelle ces tics le *slop* (la bouillie générée) et en a tiré un **détecteur déterministe de 62 règles**, réparties en deux familles égales, qui tourne sans IA ni clé d’API :

- **les clichés** (31 règles) : des choix devenus la signature des interfaces générées, donc de l’absence de décision ;
- **la qualité** (31 règles) : des défauts mesurables qui gênent tout le monde, interface générée ou non (contraste, mesure, débordements, images cassées).

Chaque règle a une **sévérité** : *erreur* (2 règles), *avertissement* (44, le cas par défaut) ou *conseil* (16, une invitation à vérifier). Le catalogue de l’application les détaille une par une.

Le test qui résume tout vient de la critique d’impeccable : **ce design est-il ancré dans ce produit, ou un produit sans rapport pourrait-il le reprendre tel quel ?**`,
    },
    {
      id: 'couleur-lumiere',
      title: 'Couleur et lumière : violet, dégradés, halos',
      body: `- **La palette « IA »** : les dégradés violets et le cyan sur fond sombre sont, selon le détecteur, les signes les plus reconnaissables. Un dégradé dans ces teintes suffit à trahir le réflexe ; une encre néon unie sur fond sombre devient suspecte dès qu’une deuxième teinte de la liste la rejoint.
- **Le texte en dégradé**, surtout sur les titres et les chiffres clés : décoratif, jamais porteur de sens. L’emphase vient de la graisse ou de la taille.
- **Les halos lumineux** : une ombre colorée sans décalage, ou toute ombre colorée floue sur fond sombre. Leurs cousins dessinés en dégradé radial : le **halo** saturé en fond d’une page sombre, et le **projecteur** translucide posé derrière un héros ou une section, qui flotte comme un nuage au-dessus du texte.
- **La palette crème** : le fond beige chaud est devenu la surface « de bon goût » par défaut.

La correction n’est pas « une autre couleur à la mode », mais une palette **tirée du produit et de son monde**, et une lumière motivée : des ombres d’élévation neutres, des surfaces unies ou très légèrement nuancées.`,
      examples: [
        {
          title: 'Le halo violet d’une page sombre',
          bad: {
            alt: 'Page d’accueil sombre d’une application de podcasts avec un grand halo violet et cyan derrière le titre et un bouton entouré d’une lueur violette.',
            html: `<div class="pdb"><p class="pdb-h">Écoutez autrement</p><p class="pdb-p">Tous vos podcasts, réunis et synchronisés.</p><span class="pdb-btn">Commencer</span></div>`,
            css: `.pdb { padding: 40px 20px; text-align: center; color: #f4f4f8; background: radial-gradient(circle at 50% 40%, rgb(139 92 246 / 0.7) 0%, rgb(34 211 238 / 0.22) 38%, transparent 66%), #0b0b1a; }
.pdb-h { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
.pdb-p { margin-top: 8px; font-size: 14px; color: #c9c9d6; }
.pdb-btn { display: inline-flex; margin-top: 18px; padding: 10px 18px; border-radius: 10px; background: #7c3aed; color: #fff; font-weight: 600; font-size: 14px; box-shadow: 0 0 26px rgb(124 58 237 / 0.75); }`,
          },
          badNote: 'Halo radial violet-cyan et bouton lumineux : le décor « cool » par défaut.',
          good: {
            alt: 'Même page sur un fond encre uni, un titre qui nomme une fonction précise, un bouton orange mat et la liste des émissions suivies.',
            html: `<div class="pdg"><p class="pdg-h">Reprenez chaque épisode à la seconde près, sur tous vos appareils</p><span class="pdg-btn">Importer mes abonnements</span><ul class="pdg-l"><li><b>Les Carnets du dimanche</b><span>reprise à 18:42</span></li><li><b>Histoires de quartier</b><span>nouvel épisode</span></li></ul></div>`,
            css: `.pdg { padding: 28px 20px; color: #f3efe8; background: #17181c; }
.pdg-h { font-size: 22px; line-height: 1.2; font-weight: 800; letter-spacing: -0.01em; }
.pdg-btn { display: inline-flex; margin-top: 14px; padding: 9px 16px; border-radius: 8px; background: #e8833a; color: #17181c; font-weight: 700; font-size: 14px; }
.pdg-l { list-style: none; margin: 18px 0 0; padding: 0; font-size: 13px; }
.pdg-l li { display: flex; justify-content: space-between; gap: 8px; padding: 8px 0; border-top: 1px solid #2c2e35; }
.pdg-l span { color: #b9b4ab; }`,
          },
          goodNote: 'Une surface unie, une couleur qui a un rôle, et le produit au travail.',
        },
      ],
    },
    {
      id: 'typo-titres',
      title: 'Typographie : la pastille, le sur-titre et le titre géant',
      body: `- **La pastille *eyebrow* du héros** : un minuscule libellé en capitales espacées, ou une pastille arrondie, juste au-dessus d’un très grand titre. C’est devenu le héros SaaS généré par défaut.
- **Le sur-titre** (*kicker*) au-dessus de n’importe quel titre de section : interdit sans exception par impeccable, répété ou non. Le titre porte son propre poids.
- **Les petits numéros de section** (01, 02, 03) répétés de section en section : une page qui numérote ses chapitres au lieu de laisser la hiérarchie porter sa structure.
- **Le titre italique à empattements** (Fraunces, Recoleta, Playfair) en héros de startup. Le registre éditorial peut le vouloir : juge selon le contexte.
- **Le titre surdimensionné** : une phrase entière en taille d’affichage, qui mange tout le premier écran.
- **L’approche écrasée** : des lettres resserrées jusqu’à se toucher.
- **La hiérarchie plate** : moins de 1,25× entre chaque marche de taille.
- **Les polices surexploitées** : Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk. Elles ne sont pas mauvaises ; elles ne disent simplement plus rien.`,
      examples: [
        {
          title: 'La pastille au-dessus du titre en dégradé',
          bad: {
            alt: 'Héros avec une pastille violette « Nouveau · Planning IA » en capitales espacées, au-dessus d’un grand titre dont une partie est en dégradé violet-rose.',
            html: `<div class="eb"><span class="eb-chip"><i data-icon="sparkles" style="--ico:13px"></i>Nouveau · Planning IA</span><p class="eb-h">Le planning de vos équipes, <span class="eb-grad">enfin intelligent</span></p><p class="eb-p">La solution tout-en-un pour les restaurateurs.</p></div>`,
            css: `.eb { padding: 26px 18px; text-align: center; }
.eb-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; border: 1px solid rgb(124 58 237 / 0.3); background: rgb(124 58 237 / 0.08); color: #6d28d9; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.eb-h { margin-top: 14px; font-size: 28px; line-height: 1.1; font-weight: 800; letter-spacing: -0.03em; }
.eb-grad { background: linear-gradient(90deg, #7c3aed, #db2777); -webkit-background-clip: text; background-clip: text; color: transparent; }
.eb-p { margin-top: 10px; font-size: 14px; color: #5b6170; }`,
          },
          badNote: 'Pastille en capitales, dégradé sur le titre : deux tics, aucune information.',
          good: {
            alt: 'Même héros sans pastille, avec un titre uni qui dit ce que fait le produit et un texte qui précise la nouveauté.',
            html: `<div class="eg"><p class="eg-h">Le planning de la semaine se fait en dix minutes, coupures comprises</p><p class="eg-p">Nouveau&nbsp;: Brigade propose un planning qui respecte les repos de chacun&#8239;; vous n’avez plus qu’à ajuster et publier.</p></div>`,
            css: `.eg { padding: 26px 18px; }
.eg-h { font-size: 24px; line-height: 1.15; font-weight: 800; letter-spacing: -0.02em; color: #1f2a24; }
.eg-p { margin-top: 10px; max-width: 46ch; font-size: 14px; line-height: 1.55; color: #45514a; }`,
          },
          goodNote: 'L’information de la pastille est entrée dans le texte ; le titre porte son propre poids.',
        },
      ],
    },
    {
      id: 'structure-decor',
      title: 'Structure et décor : cartes, bordures, fonds',
      body: `- **La tuile d’icône** : un carré arrondi contenant une icône au-dessus de chaque titre, le gabarit universel de la « carte de fonctionnalité ». Mets l’icône à côté du titre, ou dans le flux.
- **La bordure latérale d’accent** : un trait coloré épais sur un côté d’une carte arrondie, que le détecteur décrit comme le signe le plus reconnaissable des interfaces générées. Sa variante en haut ou en bas se heurte à l’arrondi des coins.
- **Les cartes imbriquées** et **l’espacement monotone** : de la profondeur sans hiérarchie, une répétition sans rythme.
- **La carte fantôme** : bordure d’un pixel et large ombre diffuse sur chaque carte d’une rangée. Choisis l’un ou l’autre.
- **Les rayures et le quadrillage** en fond, sans toile, carte, plan ni outil de mesure dessous.
- **L’illustration assemblée de formes** : soleil rond, montagnes triangulaires, maison carrée. Un héros mérite une vraie image, ou le produit lui-même.

Quelques règles voisines appartiennent à la famille qualité : l’**ombre dure décalée** (un simple conseil, car elle est légitime dans un univers néobrutaliste), le **contour organique tracé en \`clip-path\`** et l’**image enfouie** sous un voile presque opaque.`,
      examples: [
        {
          title: 'La rangée de fonctionnalités',
          bad: {
            alt: 'Section de fonctionnalités : deux cartes avec une tuile d’icône violette au-dessus du titre, et une carte « Nouveau » avec une épaisse bordure violette à gauche.',
            html: `<div class="fb"><div class="fb-grid"><div class="fb-card"><span class="fb-tile"><i data-icon="calendar" style="--ico:18px"></i></span><b>Planning</b><span>Créez vos plannings facilement.</span></div><div class="fb-card"><span class="fb-tile"><i data-icon="users" style="--ico:18px"></i></span><b>Équipe</b><span>Gérez votre équipe en un clic.</span></div></div><div class="fb-new"><b>Nouveau</b><span>Export de paie disponible.</span></div></div>`,
            css: `.fb { padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #f8f9fb; }
.fb-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.fb-card { display: flex; flex-direction: column; gap: 6px; padding: 14px; border-radius: 14px; background: #fff; border: 1px solid #e5e7eb; font-size: 13px; color: #5a6172; }
.fb-card b { font-size: 15px; color: #111827; }
.fb-tile { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #ede9fe, #e0e7ff); color: #6d28d9; }
.fb-new { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; border-left: 4px solid #7c3aed; font-size: 13px; color: #5a6172; }
.fb-new b { color: #111827; }`,
          },
          badNote: 'Tuiles d’icônes empilées sur les titres et trait latéral violet : le gabarit généré.',
          good: {
            alt: 'Même section en liste : chaque fonctionnalité a son icône à côté du titre et une phrase précise ; la nouveauté est signalée par une petite pastille.',
            html: `<ul class="fg"><li><i data-icon="calendar" style="--ico:18px"></i><div><b>Le planning respecte les repos</b><span>11&nbsp;heures entre deux services, deux jours de repos par semaine&nbsp;: Brigade vous prévient avant de publier.</span></div></li><li><i data-icon="users" style="--ico:18px"></i><div><b>Les échanges se règlent entre collègues</b><span>Un serveur propose son service du samedi, un autre l’accepte, vous validez.</span></div></li><li><i data-icon="file-text" style="--ico:18px"></i><div><b>Les heures partent à la paie <em>Nouveau</em></b><span>Export mensuel au format de votre cabinet comptable.</span></div></li></ul>`,
            css: `.fg { list-style: none; margin: 0; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.fg li { display: flex; gap: 10px; align-items: flex-start; }
.fg .mk-ico { margin-top: 2px; color: #1f6b4f; }
.fg div { display: flex; flex-direction: column; gap: 2px; font-size: 13px; line-height: 1.5; color: #45514a; }
.fg b { font-size: 15px; color: #1f2a24; }
.fg em { margin-inline-start: 6px; padding: 1px 7px; border-radius: 999px; font-style: normal; font-size: 11px; font-weight: 650; background: #dcfce7; color: #166534; vertical-align: 2px; }`,
          },
          goodNote: 'Icônes dans le flux, titres qui disent quelque chose, nouveauté en petite pastille.',
        },
      ],
    },
    {
      id: 'mouvement-texte',
      title: 'Mouvement et rédaction',
      body: `Côté mouvement :

- **le rebond et l’élastique** font daté : les objets réels décélèrent en douceur, d’où la sortie exponentielle ;
- **le point qui pulse** simule une activité ; réserve-le aux données réellement en direct ;
- **le curseur clignotant** décoratif simule une saisie là où aucun champ n’existe ;
- **le bandeau défilant** réclame une attention qu’il n’a pas méritée et cache la moitié de son contenu à tout moment.

Côté texte, quatre tics de rédaction :

- **le jargon marketing** : *streamline*, *empower*, *supercharge*, *world-class*… Le détecteur cherche ces tournures anglaises ; « boostez », « révolutionnez », « de nouvelle génération » trahissent le même réflexe en français ;
- **la cadence aphoristique** : trois sections ou plus qui se terminent par « X. Pas de Y. » ou « Pas un outil. Un partenaire. » ;
- **l’abus de tirets cadratins**, signalé seulement en saturation : au moins 8 tirets, environ un pour 500 caractères ;
- **le cadrage « théâtre »** : « fini le théâtre de la sécurité ». Dis ce que la chose fait ou ne fait pas.

Attention : ces règles de rédaction lisent l’anglais (*security theater*, *Not a…*, *Just…*). Sur un texte français, le détecteur ne compte que les tirets cadratins ; le reste, c’est à ton œil de le repérer.`,
      examples: [
        {
          title: 'Le texte d’une page d’accueil',
          bad: {
            alt: 'Bloc de texte marketing : accroche « Révolutionnez la gestion de votre restaurant », puis trois arguments qui finissent chacun par une formule du type « Pas de stress. Juste des résultats. ».',
            html: `<div class="cb"><p class="cb-h">Révolutionnez la gestion de votre restaurant</p><p><b>Planning</b> Vos plannings se font seuls. Pas de stress. Juste des résultats.</p><p><b>Équipe</b> Votre équipe est alignée. Pas de friction. Juste de la sérénité.</p><p><b>Paie</b> Vos heures sont exportées. Pas un outil. Un partenaire.</p></div>`,
            css: `.cb { padding: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; line-height: 1.5; color: #3a4150; }
.cb-h { font-size: 20px; font-weight: 800; line-height: 1.2; color: #1d2230; margin-bottom: 4px; }
.cb b { display: block; color: #1d2230; }`,
          },
          badNote: 'Un verbe creux, puis la même chute trois fois : la cadence trahit le texte généré.',
          good: {
            alt: 'Même bloc réécrit : accroche précise sur le planning de la semaine, et trois arguments qui se terminent par un fait concret.',
            html: `<div class="cb"><p class="cb-h">Le planning de la semaine en dix minutes, repos compris</p><p><b>Planning</b> Brigade propose un planning qui respecte les 11&nbsp;heures de repos entre deux services.</p><p><b>Équipe</b> Les échanges de service se font entre collègues&#8239;; vous validez d’un geste.</p><p><b>Paie</b> Le 1er du mois, les heures partent à votre cabinet comptable.</p></div>`,
            css: `.cb { padding: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; line-height: 1.5; color: #3a4150; }
.cb-h { font-size: 20px; font-weight: 800; line-height: 1.2; color: #1d2230; margin-bottom: 4px; }
.cb b { display: block; color: #1d2230; }`,
          },
          goodNote: 'Des verbes précis et des faits vérifiables, une phrase différente à chaque fois.',
        },
      ],
    },
    {
      id: 'qualite',
      title: 'Les défauts de qualité',
      body: `La famille qualité ne trahit pas un générateur : elle gêne la lecture, l’usage ou l’accès, quelle que soit l’origine de la page.

- **Lecture** : contraste sous 4,5:1 (3:1 pour le grand texte), texte gris sur fond coloré, lignes au-delà d’environ 80 caractères, interlignage sous 1,3, texte courant sous 12 px, texte fonctionnel sous 11 px, passage en capitales de 80 caractères ou plus, approche au-delà de 0,05em sur du texte courant, texte justifié dans une colonne étroite, mot seul en fin de paragraphe, titre déséquilibré.
- **Structure** : niveau de titre sauté, titre collé au bloc précédent, marge intérieure sous 8 px, texte collé au bord de l’écran (moins de 16 px, ou 12 px sur un écran de 480 px de large ou moins), cartes coupées au bord d’un défilement, contenu qui déborde, texte masqué par un élément, colonne qui étire le premier écran, menu coupé par son conteneur, même texte répété trois fois dans une carte.
- **Robustesse** : image cassée, erreur de script au chargement, contenu invisible au repos. Ces deux dernières sont les seules règles de sévérité *erreur*.
- **Système** : police, couleur, rayon ou taille de texte hors de DESIGN.md. Soit une dérive à corriger, soit un ajout à documenter.`,
      examples: [
        {
          title: 'Un encadré d’information',
          bad: {
            alt: 'Encadré turquoise bordé dont le texte gris touche presque la bordure.',
            html: `<div class="qb"><div class="qb-box qb-box--bad"><b>Fermeture annuelle</b> Le restaurant sera fermé du 4 au 18 août. Les réservations reprennent le 19 août à midi.</div></div>`,
            css: `.qb { padding: 18px; }
.qb-box { border: 1px solid #5eb8a8; border-radius: 8px; background: #d9f2ec; font-size: 14px; line-height: 1.5; color: #134e45; }
.qb-box b { display: block; }
.qb-box--bad { padding: 3px 4px; color: #8f989c; }
.qb-box--bad b { color: #134e45; }`,
          },
          badNote: 'Texte gris délavé sur turquoise, et 3 px de marge intérieure.',
          good: {
            alt: 'Même encadré avec le texte en vert sombre tiré du fond et 14 px de marge intérieure.',
            html: `<div class="qb"><div class="qb-box qb-box--good"><b>Fermeture annuelle</b> Le restaurant sera fermé du 4 au 18 août. Les réservations reprennent le 19 août à midi.</div></div>`,
            css: `.qb { padding: 18px; }
.qb-box { border: 1px solid #5eb8a8; border-radius: 8px; background: #d9f2ec; font-size: 14px; line-height: 1.5; color: #134e45; }
.qb-box b { display: block; }
.qb-box--good { padding: 12px 14px; }`,
          },
          goodNote: 'Une teinte sombre du fond, lisible, et assez d’air pour que le texte ne frotte pas la bordure.',
        },
      ],
    },
    {
      id: 'lire-rapport',
      title: 'Lire un rapport sans se tromper de combat',
      body: `- **Juge d’abord sans le rapport.** Examine le rendu (spécificité, hiérarchie) avant de lire les résultats : même déterministe, un rapport oriente le regard.
- **Dans le rapport, commence par les erreurs.** Un script cassé peut laisser l’essentiel de la page invisible : corrige-le avant de juger quoi que ce soit d’autre.
- **Vérifie chaque résultat en contexte.** Le détecteur repère des formes, pas des intentions : le quadrillage d’un éditeur de plans est un faux positif, à consigner avec sa raison.
- **Un avertissement se corrige pour de bon.** Un cliché se réécrit : une pastille rendue plus pâle reste une pastille, et devient en plus illisible. Un défaut de qualité se corrige en réglant la valeur en cause (contraste, interlignage, largeur de ligne) ; une dérive du système se corrige, ou s’ajoute à DESIGN.md si elle est voulue.
- **Un conseil est une invitation à vérifier**, pas une preuve. L’ombre dure décalée est légitime dans un univers néobrutaliste ; un mot seul en fin de paragraphe peut être voulu. Même parmi les avertissements, le titre italique à empattements peut convenir au registre d’un magazine : la règle demande de juger selon le contexte.
- **Le brief gagne, sauf contre un interdit.** Un choix imposé par le brief ou confirmé par l’utilisateur se consigne comme une exception, avec sa raison ; un sur-titre au-dessus d’un titre ne se justifie jamais, même si le brief le demande. On n’ignore jamais une règle pour éviter une vraie correction.
- **Un rapport vide est un indice, pas une preuve.** Il ne remplace ni l’examen du rendu aux tailles utiles, ni la question de fond : ce design pourrait-il appartenir à n’importe quel autre produit ?`,
    },
  ],
  rules: [
    { id: 'slop', front: 'Que désigne le « slop » dans les interfaces ?', back: 'Les tics des interfaces générées : des choix faits par réflexe, devenus si fréquents qu’ils signalent l’absence de décision.' },
    { id: 'test', front: 'Quel est le test de spécificité d’un design ?', back: 'Se demander si un produit sans rapport pourrait le reprendre tel quel. Si oui, le design n’est pas ancré dans ce produit.' },
    { id: 'purple', front: 'Quels tics de couleur le détecteur juge-t-il les plus reconnaissables ?', back: 'Les dégradés violets et le cyan sur fond sombre. Un dégradé dans ces teintes suffit à le signaler.' },
    { id: 'eyebrow', front: 'Que faire d’une pastille ou d’un sur-titre au-dessus d’un grand titre ?', back: 'Le supprimer, intégrer l’information au titre, ou en faire un fil d’Ariane. Jamais l’adoucir.' },
    { id: 'icon-tile', front: 'Comment sortir du gabarit « tuile d’icône au-dessus du titre » ?', back: 'Mettre l’icône à côté du titre, ou la laisser dans le flux sans conteneur.' },
    { id: 'glow', front: 'Par quoi remplacer un halo lumineux coloré ?', back: 'Par des ombres d’élévation neutres et un éclairage discret et motivé.' },
    { id: 'ghost', front: 'Qu’est-ce que la « carte fantôme » ?', back: 'Une bordure d’un pixel plus une large ombre diffuse sur chaque carte d’une rangée. On choisit l’un ou l’autre.' },
    { id: 'copy', front: 'Quels sont les quatre tics de rédaction du détecteur ?', back: 'Le jargon marketing, la cadence aphoristique (« Pas un X. Un Y. »), l’abus de tirets cadratins et le cadrage « théâtre ».' },
    { id: 'errors', front: 'Quelles règles ont la sévérité « erreur » ?', back: 'L’erreur de script au chargement et le contenu invisible au repos. On les corrige avant tout le reste.' },
    { id: 'advisory', front: 'Que signifie une règle de sévérité « conseil » ?', back: 'Une invitation à vérifier, pas une preuve : une ombre dure décalée peut appartenir à un univers néobrutaliste voulu.' },
    { id: 'sizes', front: 'Quelles tailles minimales pour le texte ?', back: 'Texte courant : jamais sous 12 px (14 px au moins, 16 px idéalement). Texte fonctionnel : 11 px ; 10 px pour les seules mentions légales non interactives.' },
    { id: 'caps', front: 'Quand les capitales posent-elles problème ?', back: 'Sur un passage qui se lit comme une phrase : 80 caractères ou plus. Boutons, navigation et courts libellés restent permis.' },
    { id: 'padding', front: 'Quelle marge intérieure pour un conteneur bordé ou coloré ?', back: '8 px au moins, idéalement 12 à 16 px.' },
    { id: 'clean', front: 'Un rapport vide signifie-t-il un design réussi ?', back: 'Non : c’est un indice, pas une preuve. Il faut encore regarder le rendu aux tailles utiles.' },
  ],
  exercises: [
    {
      id: 'antipatterns-saas-hotspot',
      type: 'hotspot',
      difficulty: 1,
      context: 'Page d’accueil de Facturo, un logiciel de facturation pour indépendants.',
      prompt: 'Trouve les trois tics typiques des interfaces générées.',
      visual: {
        alt: 'Page d’accueil avec une barre de navigation, une pastille violette « Nouveau · IA générative », un grand titre en dégradé violet-rose, un sous-titre, un bouton violet entouré d’une lueur et un lien vers une démo.',
        frame: 'browser',
        html: `<div class="ss">
  <div class="ss-nav" data-hotspot="nav"><b>Facturo</b><span>Produit</span><span>Tarifs</span><span>Connexion</span></div>
  <div class="ss-hero">
    <span class="ss-chip" data-hotspot="chip"><i data-icon="sparkles" style="--ico:13px"></i>Nouveau · IA générative</span>
    <p class="ss-h" data-hotspot="gradient">La facturation, réinventée par l’IA</p>
    <p class="ss-p" data-hotspot="sub">Importe tes relevés bancaires&nbsp;: Facturo les rapproche de tes factures et relance les impayés à J+7.</p>
    <div class="ss-acts"><span class="ss-btn" data-hotspot="glow">Essayer gratuitement</span><span class="ss-link" data-hotspot="demo">Voir la démo (2&nbsp;min)</span></div>
  </div>
</div>`,
        css: `.ss-nav { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; padding: 10px 16px; font-size: 13px; }
.ss-nav b { margin-inline-end: auto; font-size: 15px; }
.ss-hero { padding: 22px 18px 28px; text-align: center; }
.ss-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; border: 1px solid rgb(124 58 237 / 0.3); background: rgb(124 58 237 / 0.08); color: #6d28d9; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.ss-h { margin-top: 14px; font-size: 30px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; background: linear-gradient(90deg, #7c3aed, #db2777); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ss-p { margin: 12px auto 0; max-width: 40ch; font-size: 14px; line-height: 1.5; color: #4b5262; }
.ss-acts { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 12px 16px; margin-top: 20px; }
.ss-btn { padding: 10px 18px; border-radius: 10px; background: #7c3aed; color: #fff; font-weight: 600; font-size: 14px; box-shadow: 0 0 24px rgb(124 58 237 / 0.6); }
.ss-link { font-size: 14px; color: #3d2a7a; text-decoration: underline; text-underline-offset: 3px; }`,
      },
      hotspots: [
        { id: 'chip', label: 'Pastille « Nouveau · IA générative »', correct: true, why: 'Le petit libellé en capitales espacées, en pastille, au-dessus d’un grand titre : le héros SaaS généré par défaut.' },
        { id: 'gradient', label: 'Titre en dégradé violet-rose', correct: true, why: 'Texte en dégradé dans les teintes « IA » : décoratif, sans porter aucun sens.' },
        { id: 'glow', label: 'Bouton entouré d’une lueur violette', correct: true, why: 'Un halo coloré sans décalage : de la décoration, pas de la profondeur.' },
        { id: 'nav', label: 'Barre de navigation', correct: false, why: 'Une navigation standard et sobre.' },
        { id: 'sub', label: 'Sous-titre', correct: false, why: 'Le seul texte précis de la page : il dit ce que fait le produit, et quand.' },
        { id: 'demo', label: 'Lien vers la démo', correct: false, why: 'Une action secondaire claire, avec sa durée.' },
      ],
      explanation: `Trois règles du détecteur se cumulent dans ce héros :

- **Hero eyebrow / pill chip** : un minuscule libellé en capitales espacées, ou une pastille, juste au-dessus d’un très grand titre ;
- **Gradient text**, ici en plus dans la **palette « IA »** (violet vers rose) ;
- **Glowing shadow accents** : une ombre colorée sans décalage autour du bouton.

Le correctif n’est pas de les atténuer, mais de réécrire : un titre uni qui dit ce que fait Facturo (le sous-titre le fait déjà), une palette tirée du produit, un bouton sans halo.`,
      takeaway: 'Pastille au-dessus du titre, texte en dégradé violet, bouton lumineux : trois réflexes à réécrire, pas à atténuer.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-features-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Section « fonctionnalités » de la même page d’accueil.',
      prompt: 'Trouve les trois éléments que le détecteur classe parmi les clichés.',
      visual: {
        alt: 'Section avec un petit numéro « 02 » à côté du titre, une phrase d’introduction, deux cartes avec une tuile d’icône au-dessus du titre, une carte « Nouveau » avec une épaisse bordure violette à gauche et un lien.',
        html: `<div class="ft">
  <p class="ft-row"><span class="ft-num" data-hotspot="num">02</span><span class="ft-h" data-hotspot="heading">Ce que Facturo fait pour toi</span></p>
  <p class="ft-intro" data-hotspot="intro">Trois tâches que tu n’auras plus à faire le dimanche soir.</p>
  <div class="ft-grid" data-hotspot="tiles"><div class="ft-card"><span class="ft-tile"><i data-icon="refresh-cw" style="--ico:18px"></i></span><b>Rapprochement</b><span>Relevés et factures associés chaque nuit.</span></div><div class="ft-card"><span class="ft-tile"><i data-icon="send" style="--ico:18px"></i></span><b>Relances</b><span>Un rappel part seul à J+7.</span></div></div>
  <div class="ft-new" data-hotspot="side"><b>Nouveau&nbsp;: export Factur-X</b><span>Un PDF lisible qui contient aussi les données de la facture.</span></div>
  <span class="ft-link" data-hotspot="link">Voir le guide d’import</span>
</div>`,
        css: `.ft { padding: 18px; display: flex; flex-direction: column; gap: 10px; background: #f8f9fb; }
.ft-row { display: flex; align-items: baseline; gap: 10px; }
.ft-num { padding: 4px 6px; margin: -4px -6px; font-size: 12px; font-weight: 700; letter-spacing: .1em; color: #7c3aed; }
.ft-h { font-size: 20px; font-weight: 800; letter-spacing: -0.01em; }
.ft-intro { font-size: 14px; color: #4b5262; }
.ft-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
.ft-card { display: flex; flex-direction: column; gap: 6px; padding: 14px; border-radius: 14px; background: #fff; border: 1px solid #e5e7eb; font-size: 13px; color: #5a6172; }
.ft-card b { font-size: 15px; color: #111827; }
.ft-tile { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #ede9fe, #e0e7ff); color: #6d28d9; }
.ft-new { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; border-left: 4px solid #7c3aed; font-size: 13px; color: #5a6172; }
.ft-new b { color: #111827; }
.ft-link { align-self: flex-start; font-size: 14px; color: #1f4fd8; text-decoration: underline; text-underline-offset: 3px; }`,
      },
      hotspots: [
        { id: 'num', label: 'Petit numéro « 02 »', correct: true, why: 'Un numéro de section qui ne porte aucune information : la page numérote ses chapitres au lieu de laisser la hiérarchie porter sa structure.' },
        { id: 'tiles', label: 'Tuiles d’icônes au-dessus des titres', correct: true, why: 'Le carré arrondi à icône empilé sur chaque titre : le gabarit universel de la carte de fonctionnalité générée.' },
        { id: 'side', label: 'Carte à bordure violette à gauche', correct: true, why: 'Le trait latéral épais sur une carte arrondie, signe le plus reconnaissable des interfaces générées.' },
        { id: 'heading', label: 'Titre de section', correct: false, why: 'Un titre direct, qui parle au lecteur.' },
        { id: 'intro', label: 'Phrase d’introduction', correct: false, why: 'Une phrase concrète, ancrée dans la vie de l’utilisateur.' },
        { id: 'link', label: 'Lien vers le guide d’import', correct: false, why: 'Un libellé qui dit où mène le lien.' },
      ],
      explanation: `Trois règles de la famille cliché :

- **Tiny numbered section labels** : un petit index numérique à côté de chaque titre de section, répété de section en section (règle consultative) ;
- **Icon tile stacked above heading** : le carré arrondi contenant une icône, posé au-dessus du titre ;
- **Side-tab accent border** : la bordure colorée épaisse sur un côté d’une carte arrondie.

Les textes, eux, sont précis : le problème n’est pas le contenu mais l’habillage par défaut. Place les icônes à côté des titres, signale la nouveauté par une petite pastille, et laisse la hiérarchie porter l’ordre des sections.`,
      takeaway: 'Numéros de section, tuiles d’icônes, trait latéral coloré : l’habillage par défaut d’une section générée.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-dashboard-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Statistiques d’un outil d’envoi de lettres d’information. Les chiffres sont recalculés une fois par nuit.',
      prompt: 'Trouve les trois problèmes de cet écran.',
      visual: {
        alt: 'Tableau de bord sombre avec un menu, un indicateur « En direct » à point lumineux, une carte « Taux d’ouverture 42 % » entourée d’un halo violet, une alerte d’envoi en échec et un tableau des campagnes en très petits caractères.',
        html: `<div class="db-wrap"><div class="db">
  <nav class="db-nav" data-hotspot="nav"><b>Envoi</b><span class="on">Statistiques</span><span>Campagnes</span><span>Contacts</span></nav>
  <div class="db-main">
    <div class="db-head"><p class="db-h">Statistiques</p><span class="db-live" data-hotspot="pulse"><span class="db-dot"></span>En direct</span></div>
    <p class="db-sub">Chiffres recalculés chaque nuit · dernière mise à jour&nbsp;: 02:00</p>
    <div class="db-card" data-hotspot="glow"><span>Taux d’ouverture</span><b>42&nbsp;%</b></div>
    <p class="db-fail" data-hotspot="fail"><i data-icon="circle-alert" style="--ico:15px"></i>1 envoi en échec&nbsp;: adresse invalide</p>
    <table class="db-t"><thead><tr><th data-hotspot="sort">Campagne <i data-icon="chevron-down" style="--ico:12px"></i></th><th class="n">Ouvertures</th></tr></thead><tbody data-hotspot="tiny"><tr><td>Lettre de mars</td><td class="n">1&#8239;204</td></tr><tr><td>Soldes d’hiver</td><td class="n">986</td></tr></tbody></table>
  </div>
</div></div>`,
        css: `.db { display: grid; grid-template-columns: minmax(84px, 108px) minmax(0, 1fr); background: #0e0f1a; color: #e6e6ef; font-size: 13px; }
.db-nav { display: flex; flex-direction: column; gap: 4px; padding: 12px 8px; background: #151626; color: #a9abc2; }
.db-nav b { padding: 0 6px 8px; color: #fff; }
.db-nav span { padding: 6px; border-radius: 6px; font-size: 12px; }
.db-nav .on { background: #23243a; color: #fff; }
.db-main { padding: 14px; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.db-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.db-h { font-size: 17px; font-weight: 700; }
.db-live { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #86efac; }
.db-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgb(34 197 94 / 0.25); }
@media (prefers-reduced-motion: no-preference) {
  .db-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #22c55e; animation: db-ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite; }
}
@keyframes db-ping { 75%, 100% { transform: scale(2.6); opacity: 0; } }
.db-sub { margin-top: -6px; font-size: 12px; color: #a9abc2; }
.db-card { display: flex; flex-direction: column; gap: 2px; padding: 14px; border-radius: 12px; background: #1a1b2e; border: 1px solid rgb(167 139 250 / 0.45); box-shadow: 0 0 28px rgb(139 92 246 / 0.55); }
.db-card span { font-size: 12px; color: #c4b5fd; }
.db-card b { font-size: 26px; }
.db-fail { display: flex; align-items: center; gap: 6px; padding: 8px 10px; border-radius: 8px; background: #3a1418; color: #fecaca; font-size: 12px; }
.db-t { width: 100%; border-collapse: collapse; }
.db-t th { text-align: start; padding: 6px 4px; font-size: 12px; font-weight: 600; color: #a9abc2; border-bottom: 1px solid #2a2b40; white-space: nowrap; }
.db-t td { padding: 4px; font-size: 9px; color: #c9cadb; border-bottom: 1px solid #22233a; }
.db-t .n { text-align: end; font-variant-numeric: tabular-nums; }
.db-wrap { container-type: inline-size; }
@container (max-width: 440px) {
  .db { grid-template-columns: 1fr; }
  .db-nav { flex-direction: row; flex-wrap: wrap; align-items: center; padding: 8px 10px; }
  .db-nav b { padding: 0 8px 0 4px; }
}`,
      },
      hotspots: [
        { id: 'pulse', label: 'Point « En direct » qui pulse', correct: true, why: 'La pulsation simule une activité alors que les chiffres datent de 2 h du matin : un indicateur décoratif, et faux.' },
        { id: 'glow', label: 'Carte entourée d’un halo violet', correct: true, why: 'Une ombre colorée floue sur fond sombre : le look « cool » par défaut des interfaces générées.' },
        { id: 'tiny', label: 'Lignes du tableau en 9 px', correct: true, why: 'Du texte fonctionnel sous 11 px : un échec de lisibilité, pas un choix de style.' },
        { id: 'nav', label: 'Menu latéral', correct: false, why: 'Une navigation standard, avec l’élément courant bien marqué.' },
        { id: 'fail', label: 'Alerte « envoi en échec »', correct: false, why: 'Une couleur d’état porteuse de sens, avec la cause du problème.' },
        { id: 'sort', label: 'En-tête de colonne triable', correct: false, why: 'Un contrôle standard qui indique le sens du tri.' },
      ],
      explanation: `Deux clichés et un défaut de qualité :

- **Pulsing status dot** : réserve la pulsation aux indicateurs liés à des données **réellement** en direct. Ici, un libellé fixe (« mis à jour à 02:00 ») est honnête et plus calme ;
- **Glowing shadow accents** : sur fond sombre, toute ombre colorée floue est le réflexe « cool » ; une élévation neutre suffit ;
- **Undersized functional text** : les cellules d’un tableau sont du texte fonctionnel, qui ne descend pas sous **11 px**.`,
      takeaway: 'Pas de pulsation sur des données qui ne bougent pas, pas de halo coloré, et jamais de texte fonctionnel sous 11 px.',
      sources: ['imp:detector'],
    },
    {
      id: 'antipatterns-copy-hotspot',
      type: 'hotspot',
      difficulty: 2,
      context: 'Le texte d’une page de présentation.',
      prompt: 'Trouve les trois tics de rédaction générée.',
      visual: {
        alt: 'Page de présentation avec une accroche « Booste ta productivité grâce à une plateforme de nouvelle génération », une phrase sur l’export des factures, trois arguments qui finissent par des formules courtes, une phrase « Fini le théâtre de la conformité. », un prix et un bouton.',
        html: `<div class="cpy">
  <p class="cpy-h" data-hotspot="buzz">Booste ta productivité grâce à une plateforme de nouvelle génération</p>
  <p class="cpy-fact" data-hotspot="fact">Exporte tes factures en PDF ou au format Factur-X&nbsp;: ton comptable les reçoit le 5 de chaque mois.</p>
  <div class="cpy-args" data-hotspot="cadence"><p><b>Saisie</b> Tes dépenses arrivent seules. Pas de friction. Juste des résultats.</p><p><b>Relances</b> Les impayés sont suivis. Pas de stress. Juste de la sérénité.</p><p><b>Export</b> Ton comptable reçoit tout. Pas un outil. Un partenaire.</p></div>
  <p class="cpy-tag" data-hotspot="theater">Fini le théâtre de la conformité.</p>
  <div class="cpy-buy"><span class="cpy-price" data-hotspot="price">9&nbsp;€ par mois, sans engagement</span><span class="mk-btn" data-hotspot="cta">Créer ma première facture</span></div>
</div>`,
        css: `.cpy { padding: 18px; display: flex; flex-direction: column; gap: 12px; font-size: 14px; line-height: 1.5; color: #3a4150; }
.cpy-h { font-size: 21px; line-height: 1.2; font-weight: 800; color: #1d2230; }
.cpy-args { display: flex; flex-direction: column; gap: 6px; }
.cpy-args b { display: block; color: #1d2230; }
.cpy-tag { font-weight: 700; color: #1d2230; }
.cpy-buy { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; }
.cpy-price { font-weight: 650; color: #1d2230; }`,
      },
      hotspots: [
        { id: 'buzz', label: 'Accroche « Booste… nouvelle génération »', correct: true, why: 'Du jargon marketing : un verbe et un adjectif qui pourraient vendre n’importe quoi.' },
        { id: 'cadence', label: 'Trois arguments à chute en formule', correct: true, why: 'Trois sections qui finissent par « Pas de Y. Juste Z. » : c’est la répétition de la cadence qui trahit le texte généré.' },
        { id: 'theater', label: '« Fini le théâtre de la conformité. »', correct: true, why: 'Disqualifier quelque chose en le traitant de « théâtre » : un tic récurrent, qui ne dit pas ce que fait le produit.' },
        { id: 'fact', label: 'Phrase sur l’export des factures', correct: false, why: 'Précise et vérifiable : un format, un destinataire, une date.' },
        { id: 'price', label: 'Prix et conditions', correct: false, why: 'Une information claire, sans enrobage.' },
        { id: 'cta', label: 'Bouton « Créer ma première facture »', correct: false, why: 'Le libellé nomme l’action et son résultat.' },
      ],
      explanation: `Trois règles de rédaction du détecteur :

- **Marketing buzzword** : le détecteur cherche les tournures anglaises (*supercharge your*, *next-generation*, *cutting-edge*…) ; « booste » et « de nouvelle génération » trahissent le même réflexe en français ;
- **Aphoristic-cadence copy** : une fois, ça passe ; **trois sections ou plus** qui retombent sur « X. Pas de Y. » ou « Pas un outil. Un partenaire. », c’est une cadence, pas une voix ;
- **Theater framing copy** : dire simplement ce que la chose fait ou ne fait pas.

Ces trois règles cherchent des formules anglaises : sur un texte français, le détecteur ne les verra pas, c’est à toi de les repérer. La phrase sur l’export montre la voie : un verbe précis, un format, un destinataire, une date.`,
      takeaway: 'Remplace le jargon, les chutes en formule et le cadrage « théâtre » par des faits précis : verbe, objet, chiffre.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-hero-duel',
      type: 'choice',
      difficulty: 1,
      context: 'Deux propositions de page d’accueil pour Relevé, une application de suivi de chantier pour artisans.',
      prompt: 'Quelle proposition ne pourrait appartenir qu’à ce produit ?',
      options: [
        {
          id: 'generic',
          visual: {
            alt: 'Héros sombre avec un halo violet, une pastille « Propulsé par l’IA », le titre « Le futur de la gestion de chantier » en dégradé et un bouton lumineux « Commencer ».',
            html: `<div class="hg"><span class="hg-chip"><i data-icon="sparkles" style="--ico:13px"></i>Propulsé par l’IA</span><p class="hg-h">Le futur de la <span>gestion de chantier</span></p><p class="hg-p">La plateforme tout-en-un qui révolutionne votre quotidien.</p><span class="hg-btn">Commencer</span></div>`,
            css: `.hg { padding: 34px 18px; text-align: center; color: #f4f4f8; background: radial-gradient(circle at 50% 35%, rgb(139 92 246 / 0.65) 0%, rgb(34 211 238 / 0.2) 40%, transparent 68%), #0b0b1a; }
.hg-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; border: 1px solid rgb(196 181 253 / 0.4); background: rgb(139 92 246 / 0.15); color: #ddd6fe; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.hg-h { margin-top: 14px; font-size: 28px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; }
.hg-h span { background: linear-gradient(90deg, #a78bfa, #22d3ee); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hg-p { margin: 10px auto 0; max-width: 34ch; font-size: 14px; color: #c9c9d6; }
.hg-btn { display: inline-flex; margin-top: 18px; padding: 10px 18px; border-radius: 10px; background: #7c3aed; color: #fff; font-weight: 600; font-size: 14px; box-shadow: 0 0 26px rgb(124 58 237 / 0.7); }`,
          },
          why: 'Halo violet, pastille, dégradé, bouton lumineux et « révolutionne » : on pourrait remplacer « chantier » par « recrutement » sans rien changer d’autre.',
        },
        {
          id: 'specific',
          visual: {
            alt: 'Héros clair avec le titre « Le carnet de chantier qui tient dans la poche du chef d’équipe », un bouton ocre « Essayer 14 jours » et un aperçu d’une réserve photographiée sur le chantier Maison Ferrand.',
            html: `<div class="hs"><p class="hs-h">Le carnet de chantier qui tient dans la poche du chef d’équipe</p><p class="hs-p">Photos, réserves et comptes rendus partagés avec le client le soir même.</p><span class="hs-btn">Essayer 14&nbsp;jours</span><div class="hs-app"><span class="hs-ph"></span><div><b>Réserve n°&nbsp;12 · Maison Ferrand</b><span>Joint de carrelage fissuré, salle de bain · photo de 16:40</span><em>À reprendre</em></div></div></div>`,
            css: `.hs { padding: 26px 18px; background: #f4f4f1; color: #22262b; }
.hs-h { font-size: 23px; line-height: 1.15; font-weight: 800; letter-spacing: -0.02em; }
.hs-p { margin-top: 8px; font-size: 14px; line-height: 1.5; color: #4a4f57; }
.hs-btn { display: inline-flex; margin-top: 14px; padding: 9px 16px; border-radius: 8px; background: #9a6208; color: #fff; font-weight: 700; font-size: 14px; }
.hs-app { display: flex; align-items: flex-start; gap: 10px; margin-top: 18px; padding: 10px; border-radius: 10px; background: #fff; border: 1px solid #dcdcd5; font-size: 12px; }
.hs-app div { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.hs-app b { font-size: 13px; }
.hs-app span { color: #5a5f66; }
.hs-ph { flex: none; width: 42px; height: 42px; border-radius: 8px; background: linear-gradient(150deg, #cfd4d8, #eef0f1 50%, #a9b0b6); }
.hs-app em { align-self: flex-start; margin-top: 4px; font-style: normal; font-weight: 650; padding: 2px 8px; border-radius: 999px; background: #fdf0d5; color: #7a4b00; }`,
          },
          why: 'Le chef d’équipe, la réserve photographiée, le client prévenu le soir : chaque élément vient de ce métier.',
        },
      ],
      answer: 'specific',
      explanation: `La critique d’impeccable commence par une question : **ce design est-il ancré dans ce produit, ou un produit sans rapport pourrait-il le reprendre tel quel ?** Remplace « chantier » par « recrutement » dans la version sombre : rien d’autre ne bouge. C’est la signature du réflexe.

Elle cumule d’ailleurs cinq règles du détecteur (halo radial, pastille eyebrow, texte en dégradé, palette « IA », halo lumineux autour du bouton), plus un « révolutionne » qui relève du jargon marketing. La version claire, elle, montre la scène réelle du produit et l’action qu’on vient y faire.`,
      takeaway: 'Masque le nom du produit : si un produit voisin pouvait reprendre la page telle quelle, elle reste générique.',
      sources: ['imp:critique', 'imp:detector'],
    },
    {
      id: 'antipatterns-icon-tile-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle présentation des avantages évite le gabarit généré ?',
      context: 'Section « Pourquoi adhérer » d’un atelier vélo coopératif.',
      options: [
        {
          id: 'tiles',
          visual: {
            alt: 'Trois cartes d’avantages identiques, chacune avec une tuile d’icône carrée et arrondie au-dessus de son titre.',
            html: `<div class="av"><div class="av-c"><span class="av-t"><i data-icon="settings" style="--ico:18px"></i></span><b>Révision offerte</b><span>Une fois par an.</span></div><div class="av-c"><span class="av-t"><i data-icon="bike" style="--ico:18px"></i></span><b>Prêt d’outils</b><span>Tout l’outillage.</span></div><div class="av-c"><span class="av-t"><i data-icon="users" style="--ico:18px"></i></span><b>Ateliers</b><span>Le samedi.</span></div></div>`,
            css: `.av { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 16px; }
.av-c { display: flex; flex-direction: column; gap: 6px; padding: 12px 10px; border-radius: 14px; border: 1px solid #e5e7eb; font-size: 12px; color: #5a6172; }
.av-c b { font-size: 14px; color: #111827; }
.av-t { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #e0f2fe, #ede9fe); color: #4f46e5; }`,
          },
          why: 'Le carré arrondi à icône au-dessus de chaque titre : la carte de fonctionnalité que tous les générateurs produisent.',
        },
        {
          id: 'inline',
          visual: {
            alt: 'Liste de trois avantages, chacun avec une icône posée à côté du titre et une phrase précise.',
            html: `<ul class="ai"><li><i data-icon="settings" style="--ico:18px"></i><div><b>Une révision complète offerte chaque année</b><span>Freins, transmission et roulements, réglés par un mécanicien.</span></div></li><li><i data-icon="bike" style="--ico:18px"></i><div><b>Tout l’outillage en accès libre</b><span>Pieds d’atelier, dérive-chaîne, clés dynamométriques.</span></div></li><li><i data-icon="users" style="--ico:18px"></i><div><b>Un atelier mécanique le samedi matin</b><span>Apprends à changer une chambre à air en 20&nbsp;minutes.</span></div></li></ul>`,
            css: `.ai { list-style: none; margin: 0; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.ai li { display: flex; gap: 10px; align-items: flex-start; }
.ai .mk-ico { margin-top: 2px; color: #b45309; }
.ai div { display: flex; flex-direction: column; gap: 2px; font-size: 13px; line-height: 1.45; color: #4b5262; }
.ai b { font-size: 14px; color: #1d2230; }`,
          },
          why: 'L’icône accompagne le titre sans conteneur, et chaque avantage dit concrètement ce qu’on obtient.',
        },
      ],
      answer: 'inline',
      explanation: `La règle *Icon tile stacked above heading* décrit le gabarit universel de la carte de fonctionnalité générée : un petit carré arrondi contenant une icône, posé au-dessus du titre. Le détecteur propose deux sorties : **l’icône à côté du titre**, ou **dans le flux sans conteneur**.

La liste permet aussi des titres plus longs et précis, là où trois cartes égales poussent à des titres d’un mot (« Ateliers ») qui ne disent presque rien.`,
      takeaway: 'Pas de tuile d’icône empilée sur le titre : pose l’icône à côté, et laisse le contenu dicter la forme.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-glow-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle carte donne de la profondeur sans tomber dans le cliché ?',
      context: 'Application de billetterie de concerts, thème sombre.',
      options: [
        {
          id: 'glow',
          visual: {
            alt: 'Carte de concert sombre entourée d’un halo rose lumineux, avec un bouton rose qui brille.',
            html: `<div class="gl"><div class="gl-c gl-c--glow"><span class="gl-d">Ce soir · 20:30</span><b>Les Ondes Basses</b><span>Le Ferrailleur, Nantes · 18&nbsp;€</span><span class="gl-b gl-b--glow">Réserver</span></div></div>`,
            css: `.gl { padding: 26px 22px; background: #0d0b14; }
.gl-c { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 16px; border-radius: 14px; background: #17141f; color: #eeeaf5; font-size: 13px; }
.gl-c--glow { border: 1px solid rgb(244 114 182 / 0.5); box-shadow: 0 0 34px rgb(236 72 153 / 0.55); }
.gl-c b { font-size: 19px; }
.gl-d { font-size: 12px; color: #f9a8d4; }
.gl-b { margin-top: 10px; padding: 8px 14px; border-radius: 8px; background: #ec4899; color: #fff; font-weight: 650; }
.gl-b--glow { box-shadow: 0 0 20px rgb(236 72 153 / 0.85); }`,
          },
          why: 'Halo rose sans décalage autour de la carte et du bouton : la lueur « cool » par défaut des interfaces générées.',
        },
        {
          id: 'neutral',
          visual: {
            alt: 'Carte de concert sur fond sombre, détachée par une surface un peu plus claire, une fine bordure et une ombre neutre, avec un bouton jaune mat.',
            html: `<div class="gl"><div class="gl-c"><span class="gl-d">Ce soir · 20:30</span><b>Les Ondes Basses</b><span>Le Ferrailleur, Nantes · 18&nbsp;€</span><span class="gl-b">Réserver</span></div></div>`,
            css: `.gl { padding: 26px 22px; background: #121116; }
.gl-c { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 16px; border-radius: 14px; background: #1f1d26; border: 1px solid #2f2c38; box-shadow: 0 10px 24px rgb(0 0 0 / 0.4); color: #eeeaf5; font-size: 13px; }
.gl-c b { font-size: 19px; }
.gl-d { font-size: 12px; color: #c9c3d6; }
.gl-b { margin-top: 10px; padding: 8px 14px; border-radius: 8px; background: #f2c14e; color: #1f1d26; font-weight: 700; }`,
          },
          why: 'Une surface plus claire et une ombre neutre décalée : la carte se détache, sans décor lumineux.',
        },
      ],
      answer: 'neutral',
      explanation: `La règle *Glowing shadow accents* vise les **ombres colorées lumineuses** : un halo chromatique sans décalage, sur n’importe quel fond, ou toute ombre colorée floue sur fond sombre. C’est le look « cool » par défaut des interfaces générées.

Sur fond sombre, la profondeur vient d’abord de la **surface** (un ton un peu plus clair, une bordure discrète), puis d’une **ombre neutre** avec un décalage et un flou doux. Le plancher de qualité le dit autrement : un halo coloré sans décalage est de la décoration, pas de la profondeur.`,
      takeaway: 'Sur fond sombre, détache avec une surface plus claire et une ombre neutre, jamais avec un halo coloré.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-nested-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel panneau d’abonnement est le plus lisible ?',
      options: [
        {
          id: 'nested',
          visual: {
            alt: 'Panneau « Abonnement » contenant deux cartes bordées et ombrées, elles-mêmes contenant d’autres cadres.',
            html: `<div class="ab"><div class="ab-c"><b class="ab-t">Abonnement</b><div class="ab-c ab-in"><span>Formule</span><div class="ab-c ab-in2"><b>Équipe</b><span>29&nbsp;€&nbsp;/&nbsp;mois</span></div></div><div class="ab-c ab-in"><span>Paiement</span><div class="ab-c ab-in2"><b>Visa&nbsp;••••&nbsp;4821</b><span>Expire 08/27</span></div></div></div></div>`,
            css: `.ab { padding: 14px; background: #f6f7f9; }
.ab-c { display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid #dfe3ea; border-radius: 12px; background: #fff; font-size: 13px; box-shadow: 0 4px 12px rgb(15 23 42 / 0.06); }
.ab-t { font-size: 15px; }
.ab-in { background: #fafbfc; }
.ab-in > span { font-size: 12px; color: #5a6172; }
.ab-in2 { gap: 2px; padding: 8px 10px; }
.ab-in2 span { color: #5a6172; font-size: 12px; }`,
          },
          why: 'Trois niveaux de boîtes pour deux informations : la profondeur n’exprime aucune hiérarchie.',
        },
        {
          id: 'flat',
          visual: {
            alt: 'Panneau « Abonnement » à plat : deux lignes séparées par un filet, chacune avec un libellé, une valeur et un lien « Modifier ».',
            html: `<div class="ab"><div class="ab-c"><b class="ab-t">Abonnement</b><dl class="ab-dl"><div><dt>Formule</dt><dd><b>Équipe</b> · 29&nbsp;€&nbsp;/&nbsp;mois</dd><span>Modifier</span></div><div><dt>Paiement</dt><dd><b>Visa&nbsp;••••&nbsp;4821</b> · expire 08/27</dd><span>Modifier</span></div></dl></div></div>`,
            css: `.ab { padding: 14px; background: #f6f7f9; container-type: inline-size; }
.ab-c { display: flex; flex-direction: column; gap: 6px; padding: 14px; border: 1px solid #dfe3ea; border-radius: 12px; background: #fff; font-size: 13px; }
.ab-t { font-size: 15px; }
.ab-dl { margin: 0; }
.ab-dl div { display: grid; grid-template-columns: 76px minmax(0, 1fr) auto; gap: 8px; align-items: baseline; padding: 10px 0; border-top: 1px solid #edf0f3; }
.ab-dl dt { color: #5a6172; }
.ab-dl dd { margin: 0; }
.ab-dl span { color: #1f4fd8; font-weight: 600; }
@container (max-width: 380px) {
  .ab-dl div { grid-template-columns: minmax(0, 1fr) auto; row-gap: 2px; }
  .ab-dl dd { grid-column: 1 / -1; grid-row: 2; }
}`,
          },
          why: 'Une seule carte ; les filets, l’alignement et la graisse font la hiérarchie.',
        },
      ],
      answer: 'flat',
      explanation: `Des cartes dans des cartes créent du bruit visuel et une profondeur excessive (règle *Nested cards*). Le plancher de qualité est plus net encore : **les cartes imbriquées sont toujours une erreur**.

Pour regrouper des informations à l’intérieur d’une carte, impeccable recommande l’**espacement**, la **typographie** et les **filets séparateurs** : ils structurent sans ajouter de couche.`,
      takeaway: 'Jamais de cartes dans des cartes : groupe avec l’espace, la typographie et des filets.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-grid-duel',
      type: 'choice',
      difficulty: 3,
      prompt: 'Dans lequel de ces deux écrans le fond quadrillé est-il justifié ?',
      options: [
        {
          id: 'hero',
          visual: {
            alt: 'Héros d’un logiciel de gestion de la relation client sur un fond quadrillé de fines lignes grises, avec un titre et un bouton.',
            html: `<div class="gh"><p class="gh-h">Vos clients, enfin organisés</p><p class="gh-p">Contacts, relances et devis au même endroit.</p><span class="mk-btn">Essayer</span></div>`,
            css: `.gh { padding: 34px 18px; text-align: center; background-color: #fff; background-image: linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px); background-size: 24px 24px; }
.gh-h { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
.gh-p { margin: 6px 0 14px; font-size: 14px; color: #4b5262; }`,
          },
          why: 'Le quadrillage ne mesure rien : c’est un décor posé sous un message marketing.',
        },
        {
          id: 'plan',
          visual: {
            alt: 'Éditeur de plan d’appartement : barre d’outils Mur, Porte, Fenêtre, puis une toile quadrillée où sont tracées des pièces cotées, avec l’échelle « 1 carreau = 50 cm ».',
            html: `<div class="pl"><div class="pl-tools"><span class="on">Mur</span><span>Porte</span><span>Fenêtre</span><span class="pl-scale">1 carreau = 50&nbsp;cm</span></div><div class="pl-canvas"><div class="pl-room pl-r1"><span>Séjour<br>12&nbsp;m²</span></div><div class="pl-room pl-r2"><span>Chambre<br>7,5&nbsp;m²</span></div><span class="pl-dim">4,00&nbsp;m</span></div></div>`,
            css: `.pl { background: #fff; }
.pl-tools { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 8px 12px; border-bottom: 1px solid #dfe3ea; font-size: 12px; }
.pl-tools span { padding: 4px 10px; border-radius: 6px; border: 1px solid #cfd5df; }
.pl-tools .on { background: #1f4fd8; border-color: #1f4fd8; color: #fff; }
.pl-tools .pl-scale { margin-inline-start: auto; border: 0; color: #5a6172; }
.pl-canvas { position: relative; height: 160px; background-color: #f8fafc; background-image: linear-gradient(#dbe3ee 1px, transparent 1px), linear-gradient(90deg, #dbe3ee 1px, transparent 1px); background-size: 16px 16px; }
.pl-room { position: absolute; border: 3px solid #1d2230; background: rgb(255 255 255 / 0.6); }
.pl-room span { position: absolute; left: 7px; top: 5px; font-size: 11px; line-height: 1.3; font-weight: 600; white-space: nowrap; }
.pl-r1 { left: 16px; top: 16px; width: 128px; height: 96px; }
.pl-r2 { left: 141px; top: 16px; width: 83px; height: 96px; }
.pl-dim { position: absolute; left: 16px; top: 120px; width: 128px; text-align: center; font-size: 11px; color: #1f4fd8; border-top: 1px solid #1f4fd8; }`,
          },
          why: 'Ici la grille est l’outil : elle donne l’échelle et sert à tracer les murs.',
        },
      ],
      answer: 'plan',
      explanation: `Le plancher de qualité est précis : **les fonds sont des surfaces**, texturées seulement depuis le monde du sujet. Les quadrillages sur deux axes exigent **une vraie toile, une carte, un plan ou un outil de mesure** dessous. La règle *Decorative grid-line background* signale le quadrillage décoratif, tracé en fines couches de \`linear-gradient\` sur une cellule fixe.

Le même motif est donc un tic sous un message marketing, et une fonction dans un éditeur de plans, où chaque carreau correspond à une distance réelle.`,
      takeaway: 'Un quadrillage se justifie s’il sert à mesurer ou à tracer (toile, carte, plan) ; ailleurs, c’est un décor.',
      sources: ['imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'antipatterns-match-rules',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque règle du détecteur à ce qu’elle repère.',
      leftTitle: 'Règle',
      rightTitle: 'Ce qu’elle repère',
      pairs: [
        { id: 'eyebrow', left: 'Pastille eyebrow du héros', right: 'Un minuscule libellé en capitales espacées, nu ou en gélule, posé juste au-dessus d’un titre géant' },
        { id: 'ghost', left: 'Carte fantôme', right: 'Un filet d’un pixel et une large ombre floue, répétés sur tous les blocs d’une rangée' },
        { id: 'halo', left: 'Halo radial', right: 'Une lueur colorée, saturée au centre, qui s’efface vers le transparent sur le fond d’une page sombre' },
        { id: 'cadence', left: 'Cadence aphoristique', right: 'Trois sections ou plus qui retombent sur « X. Pas de Y. »' },
        { id: 'tile', left: 'Tuile d’icône', right: 'Un petit carré arrondi qui encadre un pictogramme, posé au-dessus de chaque titre' },
        { id: 'edge', left: 'Cartes collées au bord', right: 'Dans un défilement horizontal, des blocs rognés d’un côté alors qu’une marge subsiste de l’autre' },
      ],
      explanation: `Chaque règle décrit une forme précise, pas un goût :

- la **pastille eyebrow** et la **tuile d’icône** sont des gabarits de mise en page ;
- la **carte fantôme** et le **halo radial** sont des réflexes de lumière et d’élévation ;
- la **cadence aphoristique** est un tic de rédaction, qui ne compte qu’à partir de trois répétitions ;
- les **cartes collées au bord** sont un défaut de qualité : le panneau défilant est plus large que sa zone de découpe.`,
      takeaway: 'Chaque règle du détecteur repère une forme précise : apprends à la reconnaître pour savoir quoi réécrire.',
      sources: ['imp:detector'],
    },
    {
      id: 'antipatterns-hard-shadow-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Une ombre dure décalée (box-shadow: 4px 4px 0) est toujours une faute à corriger.',
      answer: false,
      explanation: `La règle *Hard offset shadow* est de sévérité **conseil** et rangée dans la famille qualité, pas cliché. Sa description le dit en toutes lettres : une ombre visible, sans flou, décalée d’au moins 4 px **peut appartenir à une direction néobrutaliste voulue** ; c’est une invitation à vérifier, pas une preuve de génération par IA ni une demande de suppression automatique.

Le plancher de qualité la refuse **hors d’un univers réellement néobrutaliste**. Dans un tel univers, on la garde et on marque l’usage voulu avec \`data-impeccable-ignore="hard-offset-shadow"\`.`,
      takeaway: 'L’ombre dure décalée est un conseil : légitime dans un univers néobrutaliste assumé, un costume ailleurs.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-clean-report-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Si le détecteur ne signale plus rien, le design est réussi.',
      answer: false,
      explanation: `impeccable le précise dans sa documentation : un passage du détecteur sans résultat est **un indice, pas une preuve** de qualité visuelle ou d’accessibilité. Il ne remplace pas l’examen du rendu à toutes les tailles utiles.

Le détecteur repère des formes précises. Il ne dit pas si la page sert son visiteur, si la hiérarchie suit la tâche, ni si le design pourrait appartenir à n’importe quel autre produit. Et le plancher de qualité rappelle que, même tout au vert, il reste à engager la page dans son monde.`,
      takeaway: 'Un rapport vide est un indice, pas une preuve : regarde toujours le rendu aux tailles réelles.',
      sources: [{ label: 'impeccable — README (détecteur)', url: 'https://github.com/pbakaus/impeccable#readme' }, 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-emdash-tf',
      type: 'truefalse',
      difficulty: 3,
      prompt: 'Le détecteur signale chaque tiret cadratin présent dans le texte courant.',
      answer: false,
      explanation: `La règle *Em-dash overuse* est **consultative**, précisément parce que les humains emploient ce tiret légitimement. Elle ne se déclenche qu’en cas de **saturation** : au moins **8 tirets cadratins** (— ou --) à une densité proche d’**un pour 500 caractères** de texte courant. Un long article qui en contient quelques-uns ne déclenche rien.

C’est la saturation qui trahit une cadence générée, pas le signe lui-même. Quand elle est là, la virgule, les deux-points, le point ou les parenthèses font souvent mieux le travail.`,
      takeaway: 'Le tiret cadratin n’est signalé qu’en saturation : au moins 8, environ un pour 500 caractères.',
      sources: ['imp:detector'],
    },
    {
      id: 'antipatterns-slop-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquels de ces choix sont des tics typiques des interfaces générées ?',
      options: [
        { id: 'purple', label: 'Un dégradé bleu-violet en fond de la page d’accueil', why: 'La palette « IA » : un dégradé violet suffit à trahir le réflexe.' },
        { id: 'gradient-text', label: 'Un titre principal en texte dégradé', why: 'Décoratif plutôt que porteur de sens, surtout sur les titres et les chiffres clés.' },
        { id: 'tile', label: 'Une tuile d’icône arrondie au-dessus de chaque titre de carte', why: 'Le gabarit universel de la carte de fonctionnalité générée.' },
        { id: 'leading', label: 'Un interlignage de 1,2 sur le texte courant', why: 'Un défaut de qualité (sous 1,3) qui gêne la lecture, que la page soit générée ou non : il ne signale pas un générateur.' },
        { id: 'plan-grid', label: 'Un fond quadrillé sous la toile d’un éditeur de plans', why: 'La grille y sert à mesurer et à tracer : c’est l’exception que prévoit la règle du quadrillage.' },
        { id: 'shadow', label: 'Une ombre neutre, décalée et floue, sous un panneau flottant', why: 'C’est la profondeur que recommande impeccable à la place des halos colorés.' },
      ],
      answers: ['purple', 'gradient-text', 'tile'],
      explanation: `Le dégradé violet, le texte en dégradé et la tuile d’icône au-dessus du titre figurent tous trois parmi les règles de la famille *cliché* du détecteur : des choix devenus si fréquents dans les interfaces générées qu’ils signalent l’absence de décision.

Les trois autres n’en sont pas :

- l’interlignage de 1,2 est un défaut de la famille *qualité* : il gêne la lecture, mais ne trahit aucun générateur ;
- le quadrillage d’un éditeur de plans est l’exception que prévoit la règle, car la grille y mesure quelque chose ;
- l’ombre neutre décalée est justement la profondeur recommandée à la place des halos colorés.`,
      takeaway: 'Dégradé violet, texte en dégradé et tuile d’icône sont des tics générés ; un défaut de lecture ou une grille qui sert à mesurer n’en sont pas.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-severity-choice',
      type: 'choice',
      difficulty: 2,
      context:
        'Le détecteur rend trois résultats sur ta page d’accueil : *Uncaught script error on load* (erreur), *Side-tab accent border* (avertissement) et *Straggler* (conseil).',
      prompt: 'Par quoi commences-tu ?',
      options: [
        { id: 'script', label: 'Par l’erreur de script.', why: 'Un script cassé peut tuer les révélations et laisser une partie de la page invisible : tout le reste en dépend.' },
        { id: 'side', label: 'Par la bordure latérale, le cliché le plus visible.', why: 'Un vrai problème, mais la page doit d’abord fonctionner.' },
        { id: 'straggler', label: 'Par le mot seul en fin de paragraphe, le plus rapide à corriger.', why: 'C’est un simple conseil, qui peut même être voulu.' },
        { id: 'order', label: 'Par l’ordre d’apparition dans la page, de haut en bas.', why: 'L’ordre de la page ne dit rien de la gravité des problèmes.' },
      ],
      answer: 'script',
      explanation: `La description de la règle *Uncaught script error on load* est sans ambiguïté : un JavaScript cassé tue en silence les révélations, les interactions et le contenu dynamique, et peut laisser l’essentiel de la page invisible. **Corrige l’erreur avant de juger quoi que ce soit d’autre.**

Les deux seules règles de sévérité *erreur* (script cassé, contenu invisible au repos) passent en premier. Viennent ensuite les avertissements (ici la bordure latérale, un cliché à réécrire), puis les conseils, qu’on examine au regard de la direction choisie.`,
      takeaway: 'Traite d’abord les erreurs (script cassé, contenu invisible), puis les avertissements, puis les conseils.',
      sources: ['imp:detector'],
    },
    {
      id: 'antipatterns-eyebrow-fix-choice',
      type: 'choice',
      difficulty: 2,
      context: 'Ta page d’accueil affiche une pastille « Nouveau : relances automatiques » en capitales espacées au-dessus du titre principal.',
      prompt: 'Quelle correction choisis-tu ?',
      options: [
        { id: 'integrate', label: 'Supprimer la pastille et faire entrer l’information dans le titre : « Tes relances d’impayés partent seules, à J+7 ».', why: 'C’est la correction proposée par la règle : l’information survit, la forme générée disparaît.' },
        { id: 'soften', label: 'Garder la pastille, mais en gris clair pour qu’elle se fasse discrète.', why: 'Adoucir n’est pas corriger : le gabarit reste, et le texte devient en plus difficile à lire.' },
        { id: 'unpill', label: 'Retirer la forme de pastille, en gardant le libellé en capitales espacées au-dessus du titre.', why: 'Le tic reste : sans sa pastille, c’est la forme de base de la même règle, et un sur-titre au-dessus d’un titre est interdit sans exception.' },
        { id: 'animate', label: 'L’animer légèrement pour qu’elle attire l’œil sans prendre de place.', why: 'Une animation décorative ajoute un tic au tic.' },
      ],
      answer: 'integrate',
      explanation: `La règle *Hero eyebrow / pill chip* propose trois sorties : **supprimer** le libellé, **l’intégrer au titre**, ou en faire un **fil d’Ariane** de navigation. Le plancher de qualité ajoute que reconnaître un réflexe veut dire **réécrire l’élément, pas l’adoucir**.

Retirer seulement la forme de pastille ne suffit pas : il reste un sur-titre en capitales au-dessus du titre, et celui-là est un interdit absolu pour impeccable.`,
      takeaway: 'Une pastille eyebrow se supprime ou entre dans le titre ; l’atténuer ou la transformer en sur-titre ne corrige rien.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'antipatterns-triage-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces étapes du traitement d’un rapport du détecteur dans l’ordre.',
      items: [
        { id: 'errors', label: 'Corriger les erreurs : script cassé, contenu invisible au repos' },
        { id: 'warnings', label: 'Réécrire les éléments signalés en avertissement' },
        { id: 'advisories', label: 'Trancher les conseils selon la direction : corriger, ou consigner l’exception avec sa raison' },
        { id: 'look', label: 'Examiner le rendu aux tailles utiles, puis relancer le détecteur' },
      ],
      explanation: `L’ordre suit la gravité :

1. **Les erreurs** d’abord : une page cassée ou invisible fausse tout le reste du jugement.
2. **Les avertissements** : on réécrit l’élément au lieu de l’adoucir.
3. **Les conseils** : on vérifie s’ils contredisent la direction choisie. Un choix voulu (une ombre dure dans un univers néobrutaliste, une coupure de ligne délibérée) se consigne comme exception, avec la raison.
4. **Le rendu** enfin, aux tailles réelles, puis un nouveau passage du détecteur : un rapport vide ne remplace jamais le regard.`,
      takeaway: 'Erreurs, puis avertissements, puis conseils tranchés selon la direction, et toujours un dernier regard sur le rendu.',
      sources: ['imp:detector', 'imp:layout'],
    },
    {
      id: 'antipatterns-padding-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle la marge intérieure de cet encadré pour que le texte ne frotte plus la bordure.',
      visual: {
        alt: 'Encadré bleu pâle bordé contenant une information sur le paiement en trois fois ; sa marge intérieure varie avec le curseur.',
        html: `<div class="mk-pad"><div class="pad-box"><b>Paiement en trois fois</b> sans frais dès 150 € d’achat, avec ta carte bancaire. Les échéances sont prélevées à 30 et 60 jours.</div></div>`,
        css: `.pad-box { padding: var(--v, 2px); border: 1px solid #93c5fd; border-radius: 8px; background: #eff6ff; color: #1e3a8a; font-size: 14px; line-height: 1.5; }`,
      },
      control: 'Marge intérieure',
      min: 0,
      max: 32,
      step: 1,
      initial: 2,
      unit: 'px',
      target: [12, 16],
      ideal: 14,
      explanation: `La règle *Cramped padding* demande **au moins 8 px**, et **idéalement 12 à 16 px**, d’espace entre le texte et la limite visible d’un conteneur bordé, entouré ou coloré.

En dessous, le texte semble pressé contre la bordure et l’œil a du mal à le séparer du cadre. Bien au-delà, il flotte et l’encadré prend plus de place que son contenu : la plage de 12 à 16 px est celle que recommande la règle.`,
      takeaway: 'Dans un conteneur bordé ou coloré, laisse au moins 8 px, idéalement 12 à 16 px, entre le texte et la bordure.',
      sources: ['imp:detector'],
    },
    {
      id: 'antipatterns-italic-serif-choice',
      type: 'choice',
      difficulty: 3,
      context:
        'Le détecteur signale *Italic serif display headline* sur deux projets : la page d’accueil d’une application de prise de notes, et la une d’un magazine littéraire en ligne.',
      prompt: 'Que fais-tu ?',
      options: [
        { id: 'context', label: 'Corriger l’application (titre romain ou sans empattements) et garder l’italique du magazine, dont le registre éditorial le justifie.', why: 'La règle elle-même demande de juger selon le contexte : le magazine peut vouloir cet italique, la startup le reçoit par défaut.' },
        { id: 'fix-both', label: 'Corriger les deux : un avertissement du détecteur se corrige toujours.', why: 'La description de la règle prévoit l’exception éditoriale : la corriger partout, c’est appliquer la règle sans la lire.' },
        { id: 'keep-both', label: 'Garder les deux : l’italique à empattements est élégant.', why: 'Sur la page de l’application, c’est justement l’uniforme des héros de startups générés.' },
        { id: 'gradient', label: 'Remplacer l’italique par du texte en dégradé dans les deux cas, pour garder de l’emphase.', why: 'On remplace un tic par un autre : l’emphase vient de la graisse ou de la taille.' },
      ],
      answer: 'context',
      explanation: `La règle *Italic serif display headline* décrit un grand titre en italique à empattements (Fraunces, Recoleta, Playfair, Newsreader en italique) qui a l’air raffiné isolément, mais qui est devenu **le héros universel des pages d’accueil de startups générées**. Sa description ajoute : **le registre éditorial ou magazine peut légitimement le vouloir ; juge selon le contexte.**

Un détecteur repère des formes ; c’est toi qui sais si la forme est un réflexe ou un choix. Pour le magazine, on consigne l’exception avec sa raison ; pour l’application, on passe en romain ou à une police d’affichage sans empattements.`,
      takeaway: 'Un même signal n’appelle pas la même réponse partout : juge le contexte avant de corriger, et consigne les exceptions.',
      sources: ['imp:detector', 'imp:typeset'],
    },
  ],
};

export default antipatterns;
