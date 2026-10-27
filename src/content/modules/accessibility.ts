import type { ModuleContent, Visual } from '../../engine/types';

const WEBAIM = { label: 'WebAIM — The WebAIM Million (rapport 2026)', url: 'https://webaim.org/projects/million/' };
const USING_ARIA = { label: 'W3C — Using ARIA (première règle d’ARIA)', url: 'https://www.w3.org/TR/using-aria/' };
const EAA = { label: 'EUR-Lex — Directive (UE) 2019/882, Acte européen sur l’accessibilité', url: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj' };
const RGAA_LABELS = { label: 'DINUM — RGAA 4.1.2, critère 11.1 (étiquettes des champs)', url: 'https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.1' };
const ARIA22 = { label: 'W3C — Technique ARIA22 (role="status")', url: 'https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22' };
const IMP_AUDIT_NATIVE = { label: 'impeccable — audit.native.md', url: 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/audit.native.md' };
const U =(slug: string, label: string) => ({ label: `W3C — Comprendre le critère ${label}`, url: `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html` });

/** Lecteur de podcast : commandes en icônes, très pâles ou bien contrastées. */
const player = (strong: boolean): Visual => ({
  alt: strong
    ? 'Lecteur de podcast : titre, barre de progression bleue et cinq commandes en icônes gris foncé, dont un bouton pause noir.'
    : 'Lecteur de podcast : titre, barre de progression gris très clair et cinq commandes en icônes gris très clair sur fond blanc, dont un bouton pause.',
  css: `.pd-bar { height: 6px; border-radius: 3px; background: ${strong ? '#d5dae3' : '#f1f3f6'}; overflow: hidden; }
.pd-bar span { display: block; width: 45%; height: 100%; background: ${strong ? '#1f4fd8' : '#d5dae3'}; }
.pd-ctrl { display: flex; align-items: center; justify-content: space-between; padding: 0 6px; }
.pd-i { width: 44px; height: 44px; display: grid; place-items: center; color: ${strong ? '#3d4559' : '#c3c8d3'}; }
.pd-play { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: ${strong ? '#1d2230' : '#eef0f4'}; color: ${strong ? '#ffffff' : '#c3c8d3'}; }`,
  html: `<div class="mk-pad mk-stack" style="--gap:12px"><div class="mk-row"><div class="mk-img" style="--ratio:1;width:56px"></div><div class="mk-grow"><p class="mk-strong">Les Voix du port</p><p class="mk-small mk-muted">Épisode 214 · 28 min</p></div></div><div class="pd-bar"><span></span></div><div class="mk-row mk-between mk-small mk-muted"><span>12:40</span><span>−15:20</span></div><div class="pd-ctrl"><span class="pd-i"><i data-icon="bookmark" style="--ico:20px"></i></span><span class="pd-i"><i data-icon="chevron-left" style="--ico:26px"></i></span><span class="pd-play"><i data-icon="pause" style="--ico:22px"></i></span><span class="pd-i"><i data-icon="chevron-right" style="--ico:26px"></i></span><span class="pd-i"><i data-icon="share-2" style="--ico:20px"></i></span></div></div>`,
});

/** Formulaire de livraison, avec ou sans étiquettes persistantes. */
const delivery = (labels: boolean): Visual => ({
  alt: labels
    ? 'Formulaire d’adresse de livraison : chaque champ a une étiquette visible au-dessus de sa valeur, les champs facultatifs sont signalés.'
    : 'Formulaire d’adresse de livraison sans étiquettes : les champs remplis n’affichent plus que leur valeur (Lucie Martin, 8 rue Oberkampf, 75011, 06 12 34 56 78), les autres un texte indicatif.',
  css: `.lb-ph { color: #6b7280; } .lb-opt { font-weight: 400; color: #5a6172; }
.mk-grid.lb-row { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); }`,
  html: labels
    ? `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Adresse de livraison</p><div class="mk-field"><span class="mk-label">Nom complet</span><div class="mk-input">Lucie Martin</div></div><div class="mk-field"><span class="mk-label">Adresse</span><div class="mk-input">8 rue Oberkampf</div></div><div class="mk-field"><span class="mk-label">Complément <span class="lb-opt">(facultatif)</span></span><div class="mk-input lb-ph">Bâtiment, étage, code</div></div><div class="mk-grid lb-row" style="--gap:10px"><div class="mk-field"><span class="mk-label">Code postal</span><div class="mk-input">75011</div></div><div class="mk-field"><span class="mk-label">Téléphone</span><div class="mk-input">06 12 34 56 78</div></div></div><span class="mk-btn mk-btn--block">Continuer</span></div>`
    : `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Adresse de livraison</p><div class="mk-input">Lucie Martin</div><div class="mk-input">8 rue Oberkampf</div><div class="mk-input lb-ph">Complément d’adresse</div><div class="mk-grid lb-row" style="--gap:10px"><div class="mk-input">75011</div><div class="mk-input">06 12 34 56 78</div></div><span class="mk-btn mk-btn--block">Continuer</span></div>`,
});

/** Paragraphe de confirmation avec deux liens, soulignés ou non. */
const linksText = (underline: boolean): Visual => ({
  alt: underline
    ? 'Paragraphe de confirmation de séjour avec deux liens en bleu, soulignés.'
    : 'Paragraphe de confirmation de séjour avec deux liens en bleu, non soulignés.',
  css: `.ln { color: #1f4fd8; ${underline ? 'text-decoration: underline; text-underline-offset: 2px;' : 'text-decoration: none;'} }`,
  html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="mk-h3">Votre séjour est confirmé</p><p style="line-height:1.6">Avant de partir, consultez nos <span class="ln">conditions d’annulation</span> : le remboursement est intégral jusqu’à 48 h avant l’arrivée. Pour venir sans voiture, voyez l’<span class="ln">accès en transports en commun</span> depuis la gare d’Annecy.</p></div>`,
});

/** Étape de commande dont le bouton « Continuer » a le focus clavier, visible ou non. */
const focusStep = (visible: boolean): Visual => ({
  alt: visible
    ? 'Étape « Mode de livraison » : deux modes au choix, boutons Retour et Continuer ; le bouton Continuer, qui a le focus clavier, est entouré d’un anneau bleu épais, décalé du bouton.'
    : 'Étape « Mode de livraison » : deux modes au choix, boutons Retour et Continuer ; le bouton Continuer, qui a le focus clavier, s’affiche sans contour particulier.',
  css: `.fo-opt { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid #c7cedb; border-radius: 8px; }
.fo-opt::before { content: ""; width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #8b92a1; flex: none; }
.fo-on { border-color: #1f4fd8; } .fo-on::before { border: 5px solid #1f4fd8; }
.fo-focus { ${visible ? 'outline: 3px solid #1f4fd8; outline-offset: 3px;' : 'outline: none;'} }`,
  html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-small mk-muted">Étape 2 sur 3</p><p class="mk-h3">Mode de livraison</p><div class="fo-opt">Point relais · 3,50 €</div><div class="fo-opt fo-on">À domicile · 5,90 €</div><div class="mk-row" style="justify-content:flex-end;--gap:10px;margin-top:6px"><span class="mk-btn mk-btn--ghost">Retour</span><span class="mk-btn fo-focus">Continuer</span></div></div>`,
});

const accessibility: ModuleContent = {
  id: 'accessibility',
  title: 'Accessibilité et audit',
  category: 'evaluer',
  summary:
    'Appliquer les critères clés des WCAG 2.2 (contraste, clavier, focus, cibles, sémantique, formulaires, annonces) et mener l’audit technique d’impeccable : cinq dimensions notées de 0 à 4, soit un total sur 20.',
  minutes: 12,
  commands: ['audit'],
  sources: ['wcag22', 'wcag:contrast', 'wcag:target', 'imp:audit', IMP_AUDIT_NATIVE, 'imp:critique', WEBAIM, USING_ARIA, EAA],
  sections: [
    {
      id: 'pour',
      title: 'Quatre principes, trois niveaux',
      body: `Les **WCAG 2.2** (Web Content Accessibility Guidelines, W3C, 2023) organisent l’accessibilité autour de quatre principes, souvent résumés par l’acronyme anglais **POUR** :

- **Perceptible** : l’information doit pouvoir être perçue — contraste, alternatives textuelles, sens qui ne dépend pas de la couleur.
- **Utilisable** (*operable*) : tout doit pouvoir s’actionner — clavier, temps suffisant, cibles atteignables.
- **Compréhensible** : le contenu et le fonctionnement sont clairs — étiquettes, erreurs expliquées, comportements prévisibles.
- **Robuste** : le code est interprétable par les technologies d’assistance — HTML sémantique, noms, rôles et états exposés.

Chaque critère a un niveau : **A** (le minimum), **AA** (la cible habituelle, celle que visent la plupart des obligations légales) et **AAA** (renforcé). En Europe, l’Acte européen sur l’accessibilité (directive 2019/882) s’applique depuis le 28 juin 2025 à de nombreux produits et services numériques.

Le problème n’a rien de théorique : dans l’analyse WebAIM 2026 d’un million de pages d’accueil, **95,9 %** présentaient des erreurs détectables automatiquement, et **83,9 %** contenaient du texte au contraste insuffisant.`,
    },
    {
      id: 'perceptible',
      title: 'Perceptible : contraste, couleur, alternatives',
      body: `- **Contraste du texte** (1.4.3, AA) : **4,5:1** pour le texte courant, **3:1** pour le grand texte (24 px, ou 18,7 px en gras). Niveau AAA (1.4.6) : 7:1, et 4,5:1 pour le grand texte. Le ratio ne s’arrondit pas : 4,49:1 échoue.
- **Contraste non textuel** (1.4.11, AA) : **3:1** par rapport aux couleurs adjacentes pour ce qui permet de repérer un composant ou son état (bordure de champ, icône sans texte, indicateur de focus) et pour les éléments graphiques nécessaires à la compréhension (courbes, parts d’un graphique). Les composants désactivés en sont exemptés.
- **Jamais la couleur seule** (1.4.1, A) : un statut, une erreur, un lien se distinguent aussi par un texte, une icône, un soulignement ou un motif.
- **Alternatives textuelles** (1.1.1, A) : une image informative décrit son information ou sa fonction ; une image décorative reçoit un \`alt=""\` pour être ignorée.
- **Agrandissement** (1.4.4, AA) : le texte passe à 200 % sans perte de contenu ni de fonction.
- **Redistribution** (1.4.10, AA) : à 320 px de large — un écran de 1 280 px zoomé à 400 % — le contenu tient sans défilement horizontal, sauf ce qui exige deux dimensions (carte, tableau de données, vidéo).
- **Contenu au survol ou au focus** (1.4.13, AA) : une info-bulle ou un menu qui apparaît au survol ou au focus peut être masqué sans bouger le pointeur ni le focus (touche Échap), peut être survolé sans disparaître, et reste affiché jusqu’à ce que l’on quitte son déclencheur ou qu’on le masque.`,
      examples: [
        {
          title: 'Redistribution à 320 px de large',
          bad: {
            frame: 'phone',
            alt: 'Écran étroit, équivalent à 320 px de large : le texte garde une largeur fixe, ses lignes sont coupées au bord de l’écran et une barre de défilement horizontal apparaît.',
            css: `.rf-view { overflow: hidden; padding: 14px 0 12px 14px; }
.rf-wide { width: 560px; }
.rf-scroll { height: 6px; margin: 12px 14px 0 0; border-radius: 3px; background: #e3e6ec; }
.rf-scroll span { display: block; width: 46%; height: 100%; border-radius: 3px; background: #8b92a1; }`,
            html: `<div class="rf-view"><div class="rf-wide mk-stack" style="--gap:8px"><p class="mk-h3">Conditions d’annulation</p><p style="line-height:1.6">Le remboursement est intégral jusqu’à 48 heures avant l’arrivée, puis de 50 % jusqu’à la veille. Aucun remboursement n’est possible le jour même, sauf en cas de fermeture de la route d’accès.</p></div><div class="rf-scroll"><span></span></div></div>`,
          },
          badNote: 'Chaque ligne oblige à défiler à droite puis à revenir : la lecture devient un supplice.',
          good: {
            frame: 'phone',
            alt: 'Même écran : le texte se redistribue sur la largeur disponible et se lit de haut en bas, sans défilement horizontal.',
            html: `<div class="mk-pad mk-stack" style="--gap:8px"><p class="mk-h3">Conditions d’annulation</p><p style="line-height:1.6">Le remboursement est intégral jusqu’à 48 heures avant l’arrivée, puis de 50 % jusqu’à la veille. Aucun remboursement n’est possible le jour même, sauf en cas de fermeture de la route d’accès.</p></div>`,
          },
          goodNote: 'Le texte suit la largeur : on ne fait défiler que dans un sens.',
        },
      ],
    },
    {
      id: 'utilisable',
      title: 'Utilisable : clavier, focus, cibles, mouvement',
      body: `- **Clavier** (2.1.1 et 2.1.2, A) : tout se fait au clavier, et l’on peut sortir de chaque composant — aucun **piège** où le focus reste bloqué.
- **Ordre et visibilité du focus** (2.4.3, A ; 2.4.7, AA) : le focus suit l’ordre de lecture et se voit toujours. Ne supprime jamais l’\`outline\` sans le remplacer ; \`:focus-visible\` permet de le mettre en forme pour le clavier sans gêner la souris. Depuis WCAG 2.2, l’élément qui a le focus ne doit pas non plus disparaître entièrement sous un bandeau collant (2.4.11, AA).
- **Taille des cibles** (2.5.8, AA, nouveau en 2.2) : au moins **24 × 24 px CSS**, sauf exceptions — cible assez espacée (un cercle de 24 px centré sur elle ne touche aucune autre cible), fonction équivalente ailleurs dans la page, lien dans une phrase, contrôle natif non modifié, présentation essentielle. Pour le tactile, vise **44 × 44** : c’est le seuil sous lequel l’audit d’impeccable signale une cible, et celui du niveau AAA (2.5.5) ; Apple recommande 44 × 44 pt, Material Design 48 × 48 dp.
- **Glissement** (2.5.7, AA, nouveau en 2.2) : ce qui se fait en faisant glisser (curseur de valeur, liste triée par glisser-déposer) se fait aussi d’un seul pointeur sans glisser, par des boutons ou un clic, sauf si le glissement est essentiel.
- **Temps** (2.2.1, A) : un délai imposé peut être désactivé, ajusté ou prolongé.
- **Mouvement** : respecte \`prefers-reduced-motion\` avec une alternative pensée, qui garde l’information du changement d’état — pas un arrêt brutal de toutes les transitions. Rien ne doit clignoter plus de trois fois par seconde, sauf si les flashs restent sous les seuils de flash général et de flash rouge (2.3.1, A) ; le niveau AAA (2.3.2) supprime cette exception.`,
      examples: [
        {
          title: 'Des cibles à la taille du doigt',
          bad: {
            alt: 'Ligne de facture avec trois boutons icônes de 18 px collés les uns aux autres : télécharger, partager, supprimer.',
            css: `.tb-row { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.tb-acts { display: flex; gap: 2px; }
.tb-ico { width: 18px; height: 18px; display: grid; place-items: center; color: #36405a; }`,
            html: `<div class="mk-pad"><div class="tb-row"><div class="mk-grow"><p class="mk-strong">Facture F-118</p><p class="mk-small mk-muted">Atelier Brune · 1 480,00 €</p></div><div class="tb-acts"><span class="tb-ico"><i data-icon="download" style="--ico:16px"></i></span><span class="tb-ico"><i data-icon="share-2" style="--ico:16px"></i></span><span class="tb-ico"><i data-icon="trash" style="--ico:16px"></i></span></div></div></div>`,
          },
          badNote: '18 px séparés de 2 px : sous les 24 px du minimum AA, et la corbeille touche le partage.',
          good: {
            alt: 'Même ligne : les trois icônes restent petites, mais chacune est posée dans une zone tactile de 44 px, légèrement teintée.',
            css: `.tb-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 6px 6px 6px 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.tb-row > .mk-grow { flex: 1 1 150px; padding-block: 4px; }
.tb-acts { display: flex; gap: 4px; margin-inline-start: auto; }
.tb-ico { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 10px; background: #f4f6f9; color: #36405a; }`,
            html: `<div class="mk-pad"><div class="tb-row"><div class="mk-grow"><p class="mk-strong">Facture F-118</p><p class="mk-small mk-muted">Atelier Brune · 1 480,00 €</p></div><div class="tb-acts"><span class="tb-ico"><i data-icon="download" style="--ico:16px"></i></span><span class="tb-ico"><i data-icon="share-2" style="--ico:16px"></i></span><span class="tb-ico"><i data-icon="trash" style="--ico:16px"></i></span></div></div></div>`,
          },
          goodNote: 'L’icône reste discrète ; c’est la zone tactile qui grandit, jusqu’à 44 px.',
        },
      ],
    },
    {
      id: 'comprehensible',
      title: 'Compréhensible et robuste : sémantique, formulaires, annonces',
      body: `- **HTML natif d’abord** : un \`<button>\` apporte gratuitement le focus, l’activation par Entrée et Espace et le rôle annoncé ; une \`<div>\` cliquable n’apporte rien de tout cela. C’est la première règle d’ARIA : si un élément natif fait l’affaire, utilise-le plutôt que de détourner un autre élément avec un rôle.
- **Structure** (1.3.1, A) : ce que la mise en page montre (titres, listes, tableaux, zones) doit exister dans le code. Bonne pratique : des titres hiérarchisés sans saut de niveau (h1 puis h2, pas h1 puis h4) et des **repères** (\`header\`, \`nav\`, \`main\`, \`footer\`) qui permettent au lecteur d’écran de sauter d’une zone à l’autre. Le détecteur d’impeccable signale les niveaux de titre sautés.
- **Étiquettes** (3.3.2, A) : toute saisie attendue a une étiquette ou une instruction ; la liaison de l’étiquette au champ dans le code (\`<label for>\`) relève de 1.3.1 et 4.1.2. La bonne pratique : une étiquette visible et persistante. Un placeholder (le texte indicatif grisé affiché dans le champ vide) n’en est pas une : il disparaît dès qu’on tape.
- **Erreurs** (3.3.1, A ; 3.3.3, AA) : l’erreur est identifiée **en texte**, près du champ, avec une suggestion de correction.
- **Saisie redondante** (3.3.7, A, nouveau en 2.2) : une information déjà donnée dans le même parcours est préremplie ou proposée, sauf si la ressaisir est essentiel ou exigé pour la sécurité.
- **Messages d’état** (4.1.3, AA) : une confirmation ou un compteur mis à jour sans rechargement est annoncé grâce à \`role="status"\` (ou \`aria-live="polite"\`), sans déplacer le focus. \`role="alert"\` est réservé à ce qui est important et urgent.
- **Nom, rôle, valeur** (4.1.2, A) : chaque contrôle sur mesure expose ce qu’il est, son nom et son état (coché, déplié…).
- **Authentification** (3.3.8, AA, nouveau en 2.2) : se connecter ne doit pas imposer de test cognitif (retenir un mot de passe, recopier des caractères) sans alternative. Bloquer le collage ou les gestionnaires de mots de passe fait échouer le critère, sauf autre méthode proposée.`,
      examples: [
        {
          title: 'Une erreur dite en texte',
          bad: {
            alt: 'Champ Code postal contenant 6900, simplement encadré de rouge, sans message.',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><div class="mk-field"><span class="mk-label">Code postal</span><div class="mk-input mk-input--error">6900</div></div><div class="mk-field"><span class="mk-label">Ville</span><div class="mk-input">Lyon</div></div></div>`,
          },
          badNote: 'Seul le rouge signale l’erreur : invisible pour certaines personnes daltoniennes, muette pour un lecteur d’écran, et sans piste de correction.',
          good: {
            alt: 'Même champ encadré de rouge, avec une icône et le message « Le code postal compte 5 chiffres, par exemple 69003. »',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><div class="mk-field"><span class="mk-label">Code postal</span><div class="mk-input mk-input--error">6900</div><p class="mk-error"><i data-icon="circle-alert" style="--ico:13px"></i> Le code postal compte 5 chiffres, par exemple 69003.</p></div><div class="mk-field"><span class="mk-label">Ville</span><div class="mk-input">Lyon</div></div></div>`,
          },
          goodNote: 'Le problème et la correction sont écrits, près du champ, et peuvent être liés à lui pour le lecteur d’écran.',
        },
      ],
    },
    {
      id: 'audit',
      title: 'L’audit en cinq dimensions',
      body: `La commande \`audit\` d’impeccable est un **contrôle technique** : elle mesure ce qui se vérifie dans l’implémentation, là où \`critique\` juge l’expérience. Elle ne corrige rien : elle documente chaque problème et l’oriente vers la commande qui le traitera. Elle note **cinq dimensions de 0 à 4** :

1. **Accessibilité** : contraste, ARIA, clavier, HTML sémantique, textes alternatifs, formulaires, mouvement. 0 = échoue au niveau A, 1 = lacunes majeures, 2 = efforts partiels, 3 = AA presque atteint, 4 = AA pleinement atteint et proche de AAA.
2. **Performance** : recalculs de mise en page en boucle, animations coûteuses, images non optimisées, scripts trop lourds.
3. **Thématisation** : couleurs codées en dur, mode sombre cassé, jetons incohérents.
4. **Responsive** : largeurs fixes, cibles tactiles, gestes cassés au toucher, défilement horizontal, texte agrandi.
5. **Intégrité d’implémentation**, la dimension jugée critique : raccourcis répétés, dérive du design system, contenu décoratif ou trompeur, structure interchangeable avec celle d’un produit sans rapport, vérifiés avec le détecteur. Le rapport commence par ce verdict, réussi ou échoué : l’implémentation forme-t-elle un système propre au produit ?

Le total sur **20** se lit en bandes : **18–20** excellent, **14–17** bon, **10–13** acceptable, **6–9** faible, **0–5** critique. Chaque problème reçoit une sévérité de **P0 à P3**, et une **violation WCAG AA est au moins P1**. Pour chacun : emplacement, catégorie, impact, critère violé, recommandation, commande suggérée.

L’audit relève aussi les **motifs systémiques** (« couleurs codées en dur dans 15 composants »), cite ce qui fonctionne, vérifie ses faux positifs et garde peu de P3 : une longue traîne de détails enterre ce qui compte.

Ces cinq dimensions valent pour le **web**. Pour une appli native (iOS, Android ou les deux), l’audit suit sa variante native : accessibilité (VoiceOver, TalkBack), performance, apparence et thèmes, **conformité à la plateforme** (la dimension critique, dont le verdict ouvre le rapport : appli native ou site porté ?) et adaptabilité (tailles d’écran, orientation, clavier, multifenêtre, pliables). Elle se fait sur le code source, sans détecteur ni outil de navigateur, et une violation des guides de la plateforme y est au moins P1.`,
    },
    {
      id: 'tester-comme-sam',
      title: 'Tester comme Sam',
      body: `Les outils automatiques ne trouvent qu’une partie des problèmes : un détecteur muet est un indice, pas une preuve. Complète toujours par un parcours dans la peau de Sam, le persona qui dépend de l’accessibilité :

1. **Lâche la souris** : fais le parcours principal au clavier, de bout en bout (Tab, Maj+Tab, Entrée, Espace, Échap, flèches).
2. **Écoute** : active VoiceOver ou NVDA et vérifie les noms, les titres, l’ordre de lecture et l’annonce des chargements, succès et erreurs.
3. **Zoome à 200 %**, puis réduis la fenêtre à 320 px de large.
4. **Active la réduction des animations** dans le système, et vérifie que l’interface reste compréhensible.
5. **Retire la couleur** (simulation de daltonisme ou niveaux de gris) : l’information doit survivre.`,
    },
  ],
  rules: [
    { id: 'contrast', front: 'Contraste minimum du texte courant (WCAG AA) ?', back: '4,5:1. Le grand texte (24 px, ou 18,7 px en gras) descend à 3:1 ; 7:1 pour le niveau AAA.' },
    { id: 'non-text', front: 'Quel contraste pour une bordure de champ, une icône sans texte ou un focus ?', back: '3:1 par rapport aux couleurs adjacentes (critère 1.4.11). Les composants désactivés sont exemptés.' },
    { id: 'color', front: 'La couleur peut-elle porter seule une information ?', back: 'Non (1.4.1) : double-la d’un texte, d’une icône, d’un soulignement ou d’un motif.' },
    { id: 'alt', front: 'Quel texte alternatif pour une image décorative ?', back: '`alt=""` : le lecteur d’écran l’ignore. Une image informative décrit son information ou sa fonction.' },
    { id: 'target', front: 'Taille minimale d’une cible selon WCAG 2.2 (AA) ?', back: '24 × 24 px CSS (2.5.8), sauf exceptions (espacement, équivalent, lien dans une phrase, contrôle natif, essentiel). Vise 44 × 44 pour le tactile.' },
    { id: 'focus', front: 'Que dit WCAG du focus clavier ?', back: 'Il doit toujours être visible (2.4.7) et ne pas disparaître sous un bandeau collant (2.4.11). Jamais d’`outline: none` sans remplacement.' },
    { id: 'button', front: 'Bouton codé avec une `div` cliquable : que faire ?', back: 'Utiliser un `<button>` : focus, activation par Entrée et Espace et rôle annoncé sont fournis nativement.' },
    { id: 'label', front: 'Un placeholder peut-il servir d’étiquette ?', back: 'Non : il disparaît à la saisie. Chaque champ a une étiquette visible, persistante et liée.' },
    { id: 'status', front: 'Comment annoncer « Article ajouté au panier » sans déplacer le focus ?', back: 'Avec une région `role="status"` (ou `aria-live="polite"`) : critère 4.1.3.' },
    { id: 'motion', front: 'Comment respecter `prefers-reduced-motion` ?', back: 'Par une alternative pensée qui garde l’information du changement d’état, pas par un arrêt global de toutes les transitions.' },
    { id: 'reflow', front: 'Zoom et redistribution : quelles exigences ?', back: 'Texte agrandi à 200 % sans perte (1.4.4) ; contenu lisible à 320 px de large sans défilement horizontal (1.4.10).' },
    { id: 'audit-dims', front: 'Quelles sont les cinq dimensions de l’audit web d’impeccable ?', back: 'Accessibilité, performance, thématisation, responsive et intégrité d’implémentation, notées de 0 à 4 chacune. En natif, conformité à la plateforme et adaptabilité remplacent intégrité et responsive.' },
    { id: 'audit-bands', front: 'Comment lire un total d’audit sur 20 ?', back: '18–20 excellent, 14–17 bon, 10–13 acceptable, 6–9 faible, 0–5 critique.' },
    { id: 'aa-severity', front: 'Une violation WCAG AA, quelle sévérité ?', back: 'Au moins P1 : à corriger avant la mise en production.' },
  ],
  exercises: [
    {
      id: 'accessibility-icons-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel lecteur rend ses commandes perceptibles par le plus de monde ?',
      context: 'Les commandes n’ont pas de texte visible : seules les icônes indiquent leur fonction.',
      options: [
        { id: 'pale', visual: player(false), why: 'Icônes gris très pâle sur blanc (#c3c8d3, environ 1,7:1) : sous les 3:1 exigés pour une icône porteuse de sens.' },
        { id: 'strong', visual: player(true), why: 'Icônes gris foncé à environ 9,6:1, bouton principal noir, progression en bleu : chaque commande se repère.' },
      ],
      answer: 'strong',
      explanation: `Le critère **1.4.11 (contraste non textuel, AA)** exige **3:1** pour ce qui permet de repérer un composant : bordures de champ, indicateur de focus, et icônes qui portent seules une fonction, comme ici.

Le gris très pâle passe pour « élégant » sur un bon écran, au calme. En plein soleil, avec une basse vision ou un écran bas de gamme, les commandes disparaissent. Seuls échappent à cette règle les composants désactivés et les contrôles natifs que l’auteur n’a pas restylés.`,
      takeaway: 'Une icône qui porte seule une fonction doit contraster à 3:1 au moins avec son fond, comme une bordure de champ ou un focus.',
      sources: [U('non-text-contrast', '1.4.11 (contraste non textuel)'), 'imp:audit'],
    },
    {
      id: 'accessibility-label-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel formulaire reste compréhensible une fois rempli ?',
      options: [
        { id: 'placeholder', visual: delivery(false), why: 'Une fois remplis, les champs ne disent plus ce qu’ils contiennent : « 75011 », est-ce un code postal ou un code d’immeuble ?' },
        { id: 'labels', visual: delivery(true), why: 'Chaque champ garde son étiquette, et les champs facultatifs sont annoncés.' },
      ],
      answer: 'labels',
      explanation: `Un **placeholder**, le texte indicatif affiché dans le champ vide, **n’est pas une étiquette**. Il disparaît dès qu’on tape : pour relire ou corriger, il faut se souvenir de ce que chaque champ demandait. Les lecteurs d’écran ne le restituent pas toujours comme un nom, et il est souvent trop pâle.

Le critère **3.3.2 (A)** demande des étiquettes ou des instructions quand une saisie est attendue. Une étiquette visible, persistante et liée au champ (\`<label for>\`) sert tout le monde : Sam au lecteur d’écran, la personne qui découvre le service et relit sa saisie, celle qui reprend après une interruption.`,
      takeaway: 'Chaque champ a une étiquette visible et persistante ; le placeholder ne sert qu’à donner un exemple.',
      sources: [U('labels-or-instructions', '3.3.2 (étiquettes ou instructions)'), 'imp:clarify'],
    },
    {
      id: 'accessibility-link-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Dans quel paragraphe les liens se repèrent-ils sans dépendre de la couleur ?',
      options: [
        { id: 'color', visual: linksText(false), why: 'Seul le bleu distingue les liens du texte : un écart de 2,4:1 seulement avec le texte voisin, insuffisant pour qui perçoit mal les couleurs.' },
        { id: 'underline', visual: linksText(true), why: 'Le soulignement signale les liens sans dépendre de la perception des couleurs.' },
      ],
      answer: 'underline',
      explanation: `Le critère **1.4.1 (utilisation de la couleur, A)** interdit que la couleur soit le seul moyen de distinguer un élément. Un lien dans un paragraphe doit donc se repérer autrement : soulignement, graisse, icône.

Si tu tiens à ne pas souligner, la technique G183 du W3C demande au moins **3:1** entre la couleur du lien et celle du texte qui l’entoure. Ici, ce bleu et ce gris presque noir n’atteignent que 2,4:1 : souligner reste la solution la plus simple et la plus sûre.`,
      takeaway: 'Dans un texte, souligne les liens ; sans soulignement, il faut au moins 3:1 entre la couleur du lien et celle du texte.',
      sources: [U('use-of-color', '1.4.1 (utilisation de la couleur)'), { label: 'W3C — Technique G183', url: 'https://www.w3.org/WAI/WCAG22/Techniques/general/G183' }],
    },
    {
      id: 'accessibility-focus-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sur quelle version une personne au clavier sait-elle où elle se trouve ?',
      context: 'Sur les deux maquettes, le focus clavier est sur le bouton « Continuer ».',
      options: [
        { id: 'none', visual: focusStep(false), why: 'Rien ne distingue le bouton qui a le focus : la personne au clavier valide sans savoir où elle se trouve.' },
        { id: 'ring', visual: focusStep(true), why: 'Un anneau épais, décalé et bien contrasté montre exactement où l’on est.' },
      ],
      answer: 'ring',
      explanation: `Le critère **2.4.7 (focus visible, AA)** exige que l’élément qui a le focus clavier se voie. Supprimer l’\`outline\` par défaut « parce qu’il est laid » sans le remplacer est l’une des erreurs les plus courantes — et elle rend l’interface inutilisable au clavier.

La bonne pratique : un anneau d’au moins 2 px, contrasté à 3:1 avec ce qui l’entoure, décalé du composant (\`outline-offset\`), appliqué via \`:focus-visible\` pour qu’il apparaisse au clavier sans gêner les clics à la souris.`,
      takeaway: 'Ne supprime jamais l’indicateur de focus sans le remplacer : un anneau contrasté et décalé, appliqué avec `:focus-visible`.',
      sources: [U('focus-visible', '2.4.7 (focus visible)'), 'imp:audit'],
    },
    {
      id: 'accessibility-target-slider',
      type: 'slider',
      difficulty: 2,
      prompt: 'Règle la zone tactile des boutons « Partager » et « Supprimer » de cette liste mobile.',
      visual: {
        alt: 'Ligne de liste de courses avec deux boutons icônes dont la zone tactile, délimitée en pointillés, varie avec le curseur.',
        css: `.tg-row { display: flex; align-items: center; gap: 8px; padding: 8px 8px 8px 12px; border: 1px solid #e1e4ea; border-radius: 12px; }
.tg-acts { display: flex; gap: 4px; }
.tg-btn { width: var(--v, 20px); height: var(--v, 20px); display: grid; place-items: center; border-radius: 8px; background: #eef1f7; outline: 1px dashed #8b92a1; outline-offset: -1px; color: #36405a; flex: none; }`,
        html: `<div class="mk-pad"><div class="tg-row"><div class="mk-grow"><p class="mk-strong">Courses du samedi</p><p class="mk-small mk-muted">12 articles · modifiée hier</p></div><div class="tg-acts"><span class="tg-btn"><i data-icon="share-2" style="--ico:16px"></i></span><span class="tg-btn"><i data-icon="trash" style="--ico:16px"></i></span></div></div></div>`,
      },
      control: 'Zone tactile',
      min: 16,
      max: 72,
      step: 2,
      initial: 20,
      unit: 'px',
      target: [44, 60],
      ideal: 48,
      explanation: `Trois repères à connaître :

- **24 × 24 px CSS** : le minimum du critère 2.5.8 (AA) de WCAG 2.2 — en dessous, la cible échoue, sauf exceptions (espacement suffisant, équivalent ailleurs, lien dans une phrase…).
- **44 × 44** : le seuil sous lequel l’audit d’impeccable signale une cible tactile, celui du niveau AAA (2.5.5) et des recommandations d’Apple (44 × 44 pt).
- **48 × 48 dp** : la recommandation de Material Design.

Pour deux boutons voisins dans une liste tactile, vise **au moins 44 px** de zone : 44 à 48 px suffisent, au-delà chaque ligne s’épaissit et l’écran affiche moins d’éléments. L’icône dessinée peut rester à 16 px : c’est la zone sensible qui doit grandir, pas forcément le dessin.`,
      takeaway: 'Zone tactile : 24 × 24 px au minimum WCAG 2.2 (AA), 44 à 48 px pour un usage confortable au doigt.',
      sources: ['wcag:target', 'imp:audit', 'hig', 'material3'],
    },
    {
      id: 'accessibility-login-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux défauts d’accessibilité de ce formulaire de connexion.',
      visual: {
        frame: 'browser',
        alt: 'Formulaire « Espace client » : un champ affichant en gris le texte « Identifiant client », un champ « Mot de passe » avec la mention « Le copier-coller est désactivé pour votre sécurité », une case cochée « Rester connecté sur cet appareil », un bouton Se connecter et un lien souligné « Mot de passe oublié ? ».',
        css: `.lg { max-width: 420px; margin: 0 auto; }
.lg-ph { color: #6b7280; }
.lg-link { align-self: center; color: #1f4fd8; font-size: 13px; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }`,
        html: `<div class="lg mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h2" data-hotspot="title">Espace client</p>
  <div class="mk-input lg-ph" data-hotspot="id">Identifiant client</div>
  <div class="mk-field" data-hotspot="paste"><span class="mk-label">Mot de passe</span><div class="mk-input">••••••••••</div><span class="mk-help">Le copier-coller est désactivé pour votre sécurité.</span></div>
  <span class="mk-check mk-check--on">Rester connecté sur cet appareil</span>
  <span class="mk-btn mk-btn--block" data-hotspot="submit">Se connecter</span>
  <span class="lg-link" data-hotspot="forgot">Mot de passe oublié ?</span>
</div>`,
      },
      hotspots: [
        { id: 'id', label: 'Champ sans étiquette', correct: true, why: 'Seul un texte indicatif nomme le champ : il disparaît dès la première frappe et n’est pas une étiquette fiable pour un lecteur d’écran. Il faut une étiquette visible (3.3.2), liée au champ dans le code (1.3.1 et 4.1.2).' },
        { id: 'paste', label: 'Collage interdit dans le mot de passe', correct: true, why: 'Bloquer le collage empêche de coller le mot de passe depuis un gestionnaire externe et force à le retenir ou le recopier : échec du critère 3.3.8 (authentification accessible, AA) faute d’alternative.' },
        { id: 'title', label: 'Titre « Espace client »', correct: false, why: 'Un titre clair qui annonce la page.' },
        { id: 'submit', label: 'Bouton « Se connecter »', correct: false, why: 'Verbe explicite, blanc sur bleu à 6,6:1, cible pleine largeur.' },
        { id: 'forgot', label: 'Lien « Mot de passe oublié ? »', correct: false, why: 'Souligné, contrasté, libellé explicite : il se repère sans la couleur.' },
      ],
      explanation: `Deux défauts distincts sont en jeu :

- **L’étiquette** : le critère **3.3.2 (A)** demande une étiquette ou une instruction pour toute saisie, et **1.3.1** et **4.1.2** veulent que le nom du champ lui soit lié dans le code. Le texte indicatif disparaît à la première frappe : le RGAA (critère 11.1) ne le compte pas parmi les étiquettes acceptées, et impeccable le réserve aux exemples.
- **3.3.8 (AA, nouveau en WCAG 2.2)** : se connecter ne doit pas exiger un **test cognitif** — retenir ou recopier un mot de passe — sans alternative. Interdire le collage bloque les personnes qui copient leur mot de passe depuis un gestionnaire externe et les force à le recopier : c’est précisément ce que le critère proscrit, faute d’autre méthode (lien de connexion par e-mail, clé d’accès…).`,
      takeaway: 'Collage interdit au mot de passe : échec de 3.3.8. Texte indicatif seul : refusé comme étiquette (RGAA 11.1). Il faut une étiquette visible et liée, et le collage autorisé.',
      sources: [U('accessible-authentication-minimum', '3.3.8 (authentification accessible)'), U('labels-or-instructions', '3.3.2 (étiquettes ou instructions)'), RGAA_LABELS, 'imp:clarify'],
    },
    {
      id: 'accessibility-orders-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les trois défauts d’accessibilité de ce tableau de commandes.',
      visual: {
        frame: 'browser',
        alt: 'Liste de commandes : titre, bouton Exporter avec icône, champ de recherche avec son étiquette, colonne de cases à cocher à bordure gris très clair, colonnes de données (client et montant), colonne Statut faite de pastilles de couleur verte, orange et rouge, et une pagination en boutons de 16 px espacés de 2 px.',
        css: `.od-wrap { container: od / inline-size; }
.od-table { display: flex; align-items: stretch; }
.od-col { display: flex; flex-direction: column; }
.od-checks { width: 34px; }
.od-main { flex: 1; min-width: 0; }
.od-status { width: 76px; padding-inline-start: 16px; }
.od-cell { height: 38px; display: flex; align-items: center; border-bottom: 1px solid #eceef2; }
.od-head { font-size: 12px; font-weight: 600; color: #5a6172; }
.od-grid { display: grid; grid-template-columns: 56px minmax(0, 1fr) 76px; gap: 8px; width: 100%; }
.od-grid > span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@container od (max-width: 440px) { .od-num { display: none; } .od-grid { grid-template-columns: minmax(0, 1fr) 64px; gap: 6px; } .od-grid > span:not(.od-r) { white-space: normal; } .od-cell:not(.od-head) { height: 44px; } .od-checks { width: 28px; } .od-status { width: 48px; padding-inline-start: 8px; } }
.od-r { text-align: end; font-variant-numeric: tabular-nums; }
.od-box { width: 16px; height: 16px; border: 1.5px solid #e3e6ec; border-radius: 4px; margin-inline-start: 8px; }
.od-dot { width: 12px; height: 12px; border-radius: 50%; margin-inline-start: 12px; }
.od-pages { display: flex; gap: 2px; align-self: center; padding: 6px 10px; }
.od-pages span { width: 16px; height: 16px; display: grid; place-items: center; font-size: 11px; border-radius: 3px; color: #36405a; }
.od-pages .on { background: #1f4fd8; color: #fff; }`,
        html: `<div class="mk-pad mk-stack od-wrap" style="--gap:12px">
  <div class="mk-row mk-between"><p class="mk-h2" data-hotspot="title">Commandes</p><span class="mk-btn mk-btn--ghost mk-btn--s" data-hotspot="export"><i data-icon="download" style="--ico:15px"></i> Exporter</span></div>
  <div class="mk-field" data-hotspot="search"><span class="mk-label">Rechercher une commande</span><div class="mk-input" style="color:#6b7280">N° de commande, client…</div></div>
  <div class="od-table">
    <div class="od-col od-checks" data-hotspot="checks"><span class="od-cell od-head"></span><span class="od-cell"><span class="od-box"></span></span><span class="od-cell"><span class="od-box"></span></span><span class="od-cell"><span class="od-box"></span></span><span class="od-cell"><span class="od-box"></span></span></div>
    <div class="od-col od-main" data-hotspot="info"><div class="od-cell od-head"><div class="od-grid"><span class="od-num">N°</span><span>Client</span><span class="od-r">Montant</span></div></div><div class="od-cell"><div class="od-grid"><span class="od-num">10482</span><span>Léa Martin</span><span class="od-r">64,90 €</span></div></div><div class="od-cell"><div class="od-grid"><span class="od-num">10481</span><span>Hugo Petit</span><span class="od-r">129,00 €</span></div></div><div class="od-cell"><div class="od-grid"><span class="od-num">10480</span><span>Inès Barbier</span><span class="od-r">32,50 €</span></div></div><div class="od-cell"><div class="od-grid"><span class="od-num">10479</span><span>Paul Girard</span><span class="od-r">88,00 €</span></div></div></div>
    <div class="od-col od-status" data-hotspot="status"><span class="od-cell od-head">Statut</span><span class="od-cell"><span class="od-dot" style="background:#2b8a3e"></span></span><span class="od-cell"><span class="od-dot" style="background:#b45309"></span></span><span class="od-cell"><span class="od-dot" style="background:#c42b2b"></span></span><span class="od-cell"><span class="od-dot" style="background:#2b8a3e"></span></span></div>
  </div>
  <div class="od-pages" data-hotspot="pages"><span>‹</span><span class="on">1</span><span>2</span><span>3</span><span>›</span></div>
</div>`,
      },
      hotspots: [
        { id: 'status', label: 'Statuts en pastilles de couleur', correct: true, why: 'Vert, orange, rouge, sans texte ni légende : l’information ne passe que par la couleur (1.4.1). Il faut un libellé : « Expédiée », « En attente », « Annulée ».' },
        { id: 'checks', label: 'Cases à cocher presque invisibles', correct: true, why: 'Bordure #e3e6ec sur blanc, environ 1,3:1 : on ne repère pas le contrôle. Il faut 3:1 au moins (1.4.11).' },
        { id: 'pages', label: 'Pagination minuscule', correct: true, why: 'Des cibles de 16 px séparées de 2 px : sous les 24 × 24 px de 2.5.8, et trop serrées pour profiter de l’exception d’espacement.' },
        { id: 'title', label: 'Titre', correct: false, why: 'Titre clair et contrasté.' },
        { id: 'export', label: 'Bouton « Exporter »', correct: false, why: 'Le libellé « Exporter » et son icône identifient le bouton : sa bordure n’a pas besoin d’atteindre 3:1 (1.4.11), contrairement à celle d’une case à cocher, seul repère du contrôle.' },
        { id: 'search', label: 'Champ de recherche', correct: false, why: 'Étiquette visible et texte indicatif contrasté (4,8:1).' },
        { id: 'info', label: 'Données des commandes', correct: false, why: 'Texte foncé, en-têtes explicites, montants alignés : rien à signaler.' },
      ],
      explanation: `Trois critères différents, trois défauts que l’œil pressé ne voit pas :

- **1.4.1 (A)** : les pastilles de statut ne parlent qu’en couleur — une personne qui distingue mal le rouge du vert peut confondre ces pastilles, et le lecteur d’écran ne lit rien.
- **1.4.11 (AA)** : une case à cocher doit se repérer ; sa bordure doit atteindre 3:1.
- **2.5.8 (AA)** : chaque cible fait au moins 24 × 24 px, ou reste assez isolée pour qu’un cercle de 24 px centré sur elle ne touche aucune autre cible.

C’est le travail de la dimension « Accessibilité » de l’audit : des défauts mesurables, chacun rattaché à un critère.`,
      takeaway: 'Un audit rattache chaque défaut à un critère mesurable : couleur seule (1.4.1), contraste des contrôles (1.4.11), taille des cibles (2.5.8).',
      sources: ['imp:audit', U('use-of-color', '1.4.1 (utilisation de la couleur)'), U('non-text-contrast', '1.4.11 (contraste non textuel)'), 'wcag:target'],
    },
    {
      id: 'accessibility-alt-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Sur la page d’accueil d’un hôtel, une balise `<img>` affiche une photo d’ambiance floue derrière le titre « Réservez votre séjour ». Quel texte alternatif lui donner ?',
      options: [
        { id: 'empty', label: '`alt=""`', why: 'L’image est décorative : un alt vide indique au lecteur d’écran de l’ignorer.' },
        { id: 'photo', label: '`alt="photo"`', why: 'Le lecteur d’écran annonce « photo » sans rien apprendre : du bruit.' },
        { id: 'file', label: '`alt="hero-hotel-1440.jpg"`', why: 'Un nom de fichier n’a aucun sens pour la personne qui écoute.' },
        { id: 'none', label: 'Ne pas mettre d’attribut `alt`', why: 'Sans attribut, beaucoup de lecteurs d’écran lisent le nom du fichier : l’image n’est pas marquée comme décorative.' },
      ],
      answer: 'empty',
      explanation: `Le critère **1.1.1 (A)** demande une alternative textuelle pour toute image **qui porte une information**. Une photo d’ambiance floue, sous un titre qui dit déjà tout, n’en porte pas : elle est **décorative**.

Le bon réglage est un \`alt=""\` (vide, mais présent) : le lecteur d’écran l’ignore. À l’inverse, une image informative — un plan d’accès, un graphique, le logo qui mène à l’accueil — décrit son information ou sa fonction.`,
      takeaway: 'Image décorative : `alt=""`. Image informative : un texte qui dit son information ou sa fonction, jamais un nom de fichier.',
      sources: [U('non-text-content', '1.1.1 (contenu non textuel)'), { label: 'W3C WAI — Images décoratives (tutoriel)', url: 'https://www.w3.org/WAI/tutorials/images/decorative/' }],
    },
    {
      id: 'accessibility-button-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Le bouton « Payer » est codé `<div class="btn">Payer</div>`, avec un écouteur de clic. Que proposes-tu ?',
      options: [
        { id: 'button', label: 'Le remplacer par un vrai `<button>`', why: 'Il apporte nativement le focus clavier, l’activation par Entrée et Espace, et le rôle « bouton » annoncé.' },
        { id: 'role', label: 'Ajouter `role="button"` sur la `div`', why: 'Le rôle est annoncé, mais la div reste hors de l’ordre de tabulation et ne réagit ni à Entrée ni à Espace sans code supplémentaire.' },
        { id: 'tabindex', label: 'Ajouter `tabindex="0"` sur la `div`', why: 'Elle reçoit le focus, mais n’est ni annoncée comme bouton ni activable au clavier.' },
        { id: 'nothing', label: 'Rien : la souris et le doigt fonctionnent', why: 'Les personnes au clavier ou au lecteur d’écran ne peuvent pas payer : c’est un P0.' },
      ],
      answer: 'button',
      explanation: `La **première règle d’ARIA** : si un élément HTML natif a déjà le comportement voulu, utilise-le plutôt que de détourner un autre élément avec un rôle.

Un \`<button>\` sait tout faire seul : il entre dans l’ordre de tabulation, s’active avec Entrée et Espace, est annoncé comme bouton avec son libellé, et se désactive proprement. Reconstruire tout cela sur une \`div\` demande \`role\`, \`tabindex\` et la gestion du clavier — et on finit toujours par oublier quelque chose.`,
      takeaway: 'HTML natif d’abord : un `<button>` pour une action, un lien pour une navigation. ARIA ne sert qu’à combler ce que le HTML ne sait pas dire.',
      sources: [USING_ARIA, 'imp:audit'],
    },
    {
      id: 'accessibility-live-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Sur une boutique, « Ajouter au panier » met à jour le compteur sans recharger la page et affiche « Article ajouté » quelques secondes. Comment annoncer cette confirmation au lecteur d’écran ?',
      options: [
        { id: 'status', label: 'Placer le message dans une région `role="status"` (ou `aria-live="polite"`)', why: 'Le lecteur d’écran annonce le message à la fin de sa phrase en cours, sans interrompre ni déplacer le focus.' },
        { id: 'focus', label: 'Déplacer le focus sur le message de confirmation', why: 'La personne perd sa place dans la liste de produits pour une simple confirmation : un message d’état (4.1.3) s’annonce sans prendre le focus.' },
        { id: 'alert', label: 'Afficher le message dans un élément `role="alert"`', why: 'Le message est annoncé, mais de façon assertive : il coupe la lecture en cours. Pour un message ni important ni urgent, le W3C cite cet usage comme un échec de 4.1.3.' },
        { id: 'label', label: 'Mettre à jour le nom du bouton panier : `aria-label="Panier, 3 articles"`', why: 'Le nouveau nom n’est lu que lorsque le focus revient sur le bouton : au moment de l’ajout, rien n’est annoncé.' },
      ],
      answer: 'status',
      explanation: `Le critère **4.1.3 (messages d’état, AA)** exige qu’un message de statut — succès, résultat, progression — soit exposé par un rôle ou une propriété, pour être annoncé **sans recevoir le focus**.

\`role="status"\` (qui équivaut à une région \`aria-live="polite"\`) attend que le lecteur d’écran ait fini sa phrase, puis annonce « Article ajouté ». La région doit exister avant le message, vide au chargement par exemple : une région créée en même temps que son contenu reste souvent muette.

\`role="alert"\` (assertif) est réservé à ce qui est important et urgent : l’utiliser pour une confirmation banale est même cité par le W3C comme un échec. Déplacer le focus, lui, est un changement de contexte : la personne perd sa place pour une simple confirmation.`,
      takeaway: 'Un message d’état s’annonce par `role="status"` sans déplacer le focus ; `role="alert"` reste réservé à l’urgent.',
      sources: [U('status-messages', '4.1.3 (messages d’état)'), ARIA22, 'imp:harden'],
    },
    {
      id: 'accessibility-target-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Lesquelles de ces cibles respectent le critère 2.5.8 de WCAG 2.2 (taille minimale, AA) ?',
      options: [
        { id: 'big', label: 'Un bouton de 32 × 32 px', why: 'Au-dessus de 24 × 24 px : conforme.' },
        { id: 'inline', label: 'Un lien au milieu d’une phrase, dans un paragraphe', why: 'Exception « en ligne » : sa taille est contrainte par la hauteur de ligne du texte.' },
        { id: 'isolated', label: 'Une icône de 20 × 20 px, isolée, à plus de 24 px de toute autre cible', why: 'Exception d’espacement : un cercle de 24 px centré sur elle ne touche aucune autre cible.' },
        { id: 'tight', label: 'Trois icônes de 16 × 16 px séparées de 2 px', why: 'Trop petites et trop proches : les cercles de 24 px centrés sur chacune se chevauchent.' },
        { id: 'close', label: 'Une croix de 14 × 14 px qui ferme une notification, collée au bouton « Voir »', why: 'Sous 24 px et sans espace : le cercle de 24 px centré sur la croix déborde sur le bouton voisin.' },
      ],
      answers: ['big', 'inline', 'isolated'],
      explanation: `Le critère **2.5.8** fixe **24 × 24 px CSS**, avec cinq exceptions :

- **espacement** : une cible plus petite passe si un cercle de 24 px centré sur elle ne touche aucune autre cible (ni le cercle d’une autre petite cible) ;
- **équivalent** : la même fonction existe ailleurs dans la page avec une cible conforme ;
- **en ligne** : un lien dans une phrase ;
- **contrôle du navigateur** : un contrôle natif dont l’auteur n’a pas modifié la taille ;
- **essentiel** : une présentation imposée (par exemple légalement).

Le critère est un plancher. Pour le tactile, vise 44 × 44.`,
      takeaway: '2.5.8 : 24 × 24 px minimum, sauf cible isolée, équivalent conforme, lien dans une phrase, contrôle natif ou présentation essentielle.',
      sources: ['wcag:target'],
    },
    {
      id: 'accessibility-audit-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque constat d’un audit web à sa dimension.',
      leftTitle: 'Dimension',
      rightTitle: 'Constat',
      pairs: [
        { id: 'a11y', left: 'Accessibilité', right: 'Des champs sans étiquette et un focus invisible' },
        { id: 'perf', left: 'Performance', right: 'Des photos de 3 000 px chargées pour un affichage à 300 px' },
        { id: 'theme', left: 'Thématisation', right: 'Des couleurs codées en dur qui ignorent le thème sombre' },
        { id: 'resp', left: 'Responsive', right: 'Un défilement horizontal à 375 px de large' },
        { id: 'integrity', left: 'Intégrité d’implémentation', right: 'Le même composant recodé différemment sur quinze écrans' },
      ],
      explanation: `L’audit web d’impeccable note chaque dimension de **0 à 4**, pour un total sur **20** :

- **Accessibilité** : contraste, ARIA, clavier, sémantique, textes alternatifs, formulaires, mouvement.
- **Performance** : images non optimisées, animations coûteuses, recalculs de mise en page, poids des scripts.
- **Thématisation** : jetons de design, couleurs codées en dur, mode sombre.
- **Responsive** : largeurs fixes, cibles tactiles, gestes au toucher, défilement horizontal.
- **Intégrité d’implémentation** : dérive du design system et raccourcis répétés, vérifiés avec le détecteur.

Bandes : 18–20 excellent, 14–17 bon, 10–13 acceptable, 6–9 faible, 0–5 critique.`,
      takeaway: 'L’audit web note cinq dimensions sur 4 (accessibilité, performance, thématisation, responsive, intégrité), soit un total sur 20.',
      sources: ['imp:audit'],
    },
    {
      id: 'accessibility-keyboard-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Remets dans l’ordre ce test d’un formulaire de paiement, au clavier et lecteur d’écran allumé.',
      items: [
        { id: 'skip', label: 'Charger la page et appuyer sur Tab : le lien « Aller au contenu » apparaît' },
        { id: 'fields', label: 'Parcourir les champs : chaque focus est visible et suit l’ordre de lecture' },
        { id: 'error', label: 'Valider le formulaire au clavier avec une erreur volontaire' },
        { id: 'announce', label: 'Vérifier que l’erreur est décrite en texte, annoncée, et que le focus mène à elle' },
        { id: 'confirm', label: 'Corriger, payer, puis vérifier que la confirmation est annoncée' },
      ],
      explanation: `Le test suit le parcours réel, et chaque étape vérifie un critère :

1. **Lien d’évitement** : on saute la navigation répétée (2.4.1).
2. **Focus visible et ordonné** (2.4.7, 2.4.3) — et aucun piège (2.1.2).
3. **Soumission au clavier** : tout est actionnable sans souris (2.1.1).
4. **Erreur identifiée en texte** (3.3.1) et rendue perceptible au lecteur d’écran.
5. **Confirmation annoncée** comme message d’état (4.1.3).

Le lecteur d’écran (VoiceOver ou NVDA) révèle en chemin ce que l’œil ne voit pas : noms manquants, ordre de lecture incohérent.`,
      takeaway: 'Teste au clavier, lecteur d’écran allumé, dans l’ordre du parcours : lien d’évitement, focus visible, soumission, erreur annoncée, confirmation annoncée.',
      sources: ['wcag22', 'imp:critique'],
    },
    {
      id: 'accessibility-motion-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Pour respecter `prefers-reduced-motion`, la bonne pratique est de ramener toutes les durées d’animation à 0,01 ms.',
      answer: false,
      explanation: `L’audit d’impeccable signale justement ce réflexe : un arrêt global à 0,01 ms **détruit des retours utiles** — l’ouverture d’un panneau, le déplacement d’un élément, la confirmation d’une action.

Les personnes qui activent ce réglage (troubles vestibulaires, migraines) veulent **moins de mouvement**, pas moins d’information. L’alternative pensée remplace les grands déplacements, zooms et parallaxes par un fondu bref ou un changement d’état net, qui préserve la hiérarchie et le lien de cause à effet. Et aucun mouvement ne doit bloquer le focus, la lecture ou la tâche.`,
      takeaway: 'Avec `prefers-reduced-motion`, remplace les grands mouvements par des transitions sobres ; ne supprime pas l’information du changement d’état.',
      sources: ['imp:audit', 'imp:animate', U('animation-from-interactions', '2.3.3 (animation issue d’interactions)')],
    },
    {
      id: 'accessibility-detector-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Si l’outil d’analyse automatique ne trouve aucune erreur, la page est accessible.',
      answer: false,
      explanation: `Un outil automatique repère ce qui se mesure dans le code : contrastes, attributs manquants, niveaux de titre sautés. Il ne sait pas si un texte alternatif est pertinent, si l’ordre du focus a du sens, si un composant sur mesure se pilote vraiment au clavier.

Impeccable le dit de son propre détecteur : un résultat propre est un **indice, pas une preuve**. L’ampleur des défauts détectables est pourtant énorme — 95,9 % des pages d’accueil en présentaient en 2026 selon WebAIM. Un audit sérieux ajoute toujours un parcours au clavier et au lecteur d’écran.`,
      takeaway: 'Un détecteur muet est un indice, pas une preuve : complète toujours par un test au clavier et au lecteur d’écran.',
      sources: ['imp:polish', 'imp:audit', WEBAIM],
    },
    {
      id: 'accessibility-large-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un titre de 24 px peut se contenter d’un contraste de 3:1 avec son fond (niveau AA).',
      answer: true,
      explanation: `Vrai. Le critère **1.4.3** abaisse l’exigence à **3:1** pour le **grand texte** : au moins 18 pt (24 px), ou 14 pt en gras (environ 18,7 px). Les grands caractères restent lisibles avec moins de contraste.

Attention aux pièges : un texte de 20 px en graisse normale n’est pas « grand » et doit atteindre 4,5:1. Et les ratios ne s’arrondissent pas : 2,99:1 échoue.`,
      takeaway: 'Grand texte (24 px, ou 18,7 px en gras) : 3:1 suffit en AA. Tout le reste du texte : 4,5:1.',
      sources: ['wcag:contrast'],
    },
  ],
};

export default accessibility;
