import type { ModuleContent, SourceRef } from '../../engine/types';

const PROXIMITY: SourceRef = { label: 'Laws of UX — Loi de proximité', url: 'https://lawsofux.com/law-of-proximity/' };
const COMMON_REGION: SourceRef = { label: 'Laws of UX — Loi de la région commune', url: 'https://lawsofux.com/law-of-common-region/' };
const WCAG_255: SourceRef = {
  label: 'W3C — Comprendre le critère 2.5.5 (taille des cibles, renforcé)',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html',
};
const NNG_CARDS: SourceRef = { label: 'Nielsen Norman Group — Cards: UI-Component Definition', url: 'https://www.nngroup.com/articles/cards-component/' };

/* ---------- Shared mock pieces ---------- */

const SQUINT_CSS = `.sq { filter: blur(2.6px); }`;

const ADDRESS_FIELDS = [
  ['Prénom et nom', 'Camille Laurent'],
  ['Adresse', '12 rue des Tanneurs'],
  ['Code postal et ville', '69001 Lyon'],
];

const NOTIF = [
  ['Nouvelles commandes', 'Un e-mail à chaque commande passée sur la boutique.', true],
  ['Stock faible', 'Une alerte quand un article passe sous 5 unités.', true],
  ['Avis clients', 'Un résumé hebdomadaire des avis publiés.', false],
] as const;

const ACCOUNT_ROWS = {
  profil: [
    ['Nom', 'Camille Laurent'],
    ['E-mail', 'camille@atelier-laurent.fr'],
  ],
  securite: [
    ['Mot de passe', 'Modifié il y a 3 mois'],
    ['Double authentification', 'Activée'],
  ],
};

/** Account page with explicit spacing: label→value, row→row, space above and below section headings. */
const account = (lv: number, row: number, above: number, below: number) => {
  const rows = (list: string[][]) =>
    list
      .map(([l, v], i) => `<div style="margin-top:${i ? row : 0}px"><p class="mk-small mk-muted">${l}</p><p style="margin-top:${lv}px">${v}</p></div>`)
      .join('');
  return `<div class="mk-pad" style="display:flex;flex-direction:column">
  <p class="mk-h2">Mon compte</p>
  <p class="ac-h" style="margin-top:${above}px;margin-bottom:${below}px">Profil</p>${rows(ACCOUNT_ROWS.profil)}
  <p class="ac-h" style="margin-top:${above}px;margin-bottom:${below}px">Sécurité</p>${rows(ACCOUNT_ROWS.securite)}
</div>`;
};
const ACCOUNT_CSS = `.ac-h { font-size: 15px; font-weight: 700; }`;

const TOOL_ICONS = ['heart', 'bookmark', 'share-2', 'ellipsis'];

const PHONE_KPI_CSS = `
.ph-top { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
.ph-kpi { background: #f4f6f9; border-radius: 10px; padding: 10px 12px; }
.ph-kpi b { display: block; font-size: 20px; }
.mk-tabbar { font-size: 11px; }
`;

const layout: ModuleContent = {
  id: 'layout',
  title: 'Espace, grille et rythme',
  category: 'enrichir',
  summary:
    'Grouper par la proximité, rythmer l’espace avec une échelle, ajuster la densité à l’usage et faire évoluer la structure d’un écran à l’autre, cibles tactiles comprises.',
  minutes: 11,
  commands: ['layout', 'distill'],
  sources: ['imp:layout', 'imp:craft-floor', 'imp:distill', 'imp:operate', 'imp:detector', 'wcag:target', PROXIMITY, NNG_CARDS],
  sections: [
    {
      id: 'lecture',
      title: 'Lire avant de ranger : le test du plissement d’yeux',
      body: `La mise en page traduit la **priorité du produit** en ordre de lecture, en groupes, en rythme et en espace utilisable. Diagnostique le problème de structure avant de déplacer des boîtes.

Le **test du plissement d’yeux** (*squint test*) : plisse les yeux, ou floute la capture d’écran. Les détails disparaissent ; il doit rester **l’élément principal, l’élément secondaire et les grands groupes, dans l’ordre**. Si tout se vaut, la hiérarchie ne tient qu’au texte — et personne ne lit avant d’avoir repéré où aller.

Avant de toucher un espacement, formule une **thèse spatiale** :

- le parcours principal, de lecture ou de tâche ;
- ce qui va ensemble et ce qui doit se séparer ;
- l’élément qui mène et ceux qui soutiennent ;
- la densité et le rythme voulus ;
- comment la structure change selon le conteneur, l’écran, le mode de saisie et les contenus extrêmes.

La hiérarchie suit la priorité du produit, pas les réglages par défaut d’un framework. Regarde d’abord le rendu, puis lance le détecteur : il repère des formes connues, mais un scan propre ne prouve ni la hiérarchie ni le rythme.`,
      examples: [
        {
          title: 'Le même écran, vu en plissant les yeux',
          bad: {
            alt: 'Écran flouté d’une application de cours de yoga : quatre tuiles de même taille et de même poids, sans élément dominant.',
            html: `<div class="mk-pad sq"><div class="mk-grid" style="--gap:10px">
  <div class="mk-card mk-stack" style="--gap:6px"><p class="mk-strong">Prochain cours</p><p class="mk-small">Vinyasa · jeudi 18&nbsp;h&nbsp;30</p><span class="mk-btn mk-btn--s mk-btn--ghost">Réserver</span></div>
  <div class="mk-card mk-stack" style="--gap:6px"><p class="mk-strong">Abonnement</p><p class="mk-small">8 séances restantes</p><span class="mk-btn mk-btn--s mk-btn--ghost">Gérer</span></div>
  <div class="mk-card mk-stack" style="--gap:6px"><p class="mk-strong">Messages</p><p class="mk-small">2 non lus</p><span class="mk-btn mk-btn--s mk-btn--ghost">Ouvrir</span></div>
  <div class="mk-card mk-stack" style="--gap:6px"><p class="mk-strong">Boutique</p><p class="mk-small">Tapis, briques, sangles</p><span class="mk-btn mk-btn--s mk-btn--ghost">Voir</span></div>
</div></div>`,
            css: SQUINT_CSS,
          },
          badNote: 'Floutée, la page n’est qu’une grille de blocs égaux : rien ne mène.',
          good: {
            alt: 'Le même contenu flouté, organisé autour d’un grand titre annonçant le prochain cours et d’un bouton plein, suivis d’une liste plus discrète.',
            html: `<div class="mk-pad sq mk-stack" style="--gap:18px">
  <div class="mk-stack" style="--gap:12px"><div class="mk-stack" style="--gap:4px"><p class="mk-h1">Vinyasa, jeudi 18&nbsp;h&nbsp;30</p><p class="mk-muted">Prochain cours · 6 places libres</p></div><span class="mk-btn" style="align-self:flex-start">Réserver ma place</span></div>
  <ul class="mk-list"><li><span class="mk-grow">Abonnement</span><span class="mk-small mk-muted">8 séances</span></li><li><span class="mk-grow">Messages</span><span class="mk-small mk-muted">2 non lus</span></li><li><span class="mk-grow">Boutique</span><span class="mk-small mk-muted">Tapis, briques</span></li></ul>
</div>`,
            css: SQUINT_CSS,
          },
          goodNote: 'Même floutée, on repère le cours à venir, puis le bouton, puis le reste.',
        },
      ],
    },
    {
      id: 'proximite',
      title: 'La proximité avant les conteneurs',
      body: `Des éléments proches sont perçus comme un groupe : c’est la **loi de proximité** de la Gestalt. C’est l’outil de regroupement le plus léger — il ne coûte ni bordure, ni fond, ni ombre.

- **Serré dans un groupe, généreux entre les groupes.** Un libellé est plus près de son champ que du champ précédent ; un titre plus près du contenu qu’il introduit que du bloc d’avant.
- **Un espacement ambigu** — un libellé à égale distance de deux champs — oblige l’œil à deviner ce qui va avec quoi.
- **Le conteneur vient ensuite**, quand la proximité ne suffit pas. Une région commune (fond, bordure) groupe fortement, mais chaque boîte ajoutée alourdit l’écran.

Garde distincts les contenus distincts, sans transformer chaque groupe en composant isolé.`,
      examples: [
        {
          title: 'Un formulaire d’adresse',
          bad: {
            alt: 'Formulaire d’adresse où libellés et champs sont tous séparés par le même espace : chaque libellé flotte entre deux champs.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px">
  <p class="mk-h3">Livraison</p>
  ${ADDRESS_FIELDS.map(([l, v]) => `<span class="mk-label">${l}</span><div class="mk-input">${v}</div>`).join('')}
  <span class="mk-label">Téléphone</span><div class="mk-input">06 12 34 56 78</div>
</div>`,
          },
          badNote: 'Le même écart partout : chaque libellé est aussi proche du champ du dessus que du sien.',
          good: {
            alt: 'Même formulaire : chaque libellé collé à son champ, les champs espacés, et deux groupes « Adresse » et « Contact » nettement séparés.',
            html: `<div class="mk-pad mk-stack" style="--gap:32px">
  <div class="mk-stack" style="--gap:16px"><p class="mk-h3">Adresse de livraison</p>
  ${ADDRESS_FIELDS.map(([l, v]) => `<div class="mk-field"><span class="mk-label">${l}</span><div class="mk-input">${v}</div></div>`).join('')}</div>
  <div class="mk-stack" style="--gap:16px"><p class="mk-h3">Contact</p><div class="mk-field"><span class="mk-label">Téléphone</span><div class="mk-input">06 12 34 56 78</div></div></div>
</div>`,
          },
          goodNote: '4 px entre un libellé et son champ, 16 px entre les champs, 32 px entre les groupes.',
        },
      ],
    },
    {
      id: 'rythme',
      title: 'Rythme : une échelle et des contrastes d’espace',
      body: `Le **rythme** naît du contraste délibéré entre intervalles serrés et intervalles généreux. Une même valeur répétée partout donne le même poids à tout : le détecteur d’impeccable signale cet *espacement monotone* quand une même valeur représente plus de 60 % des espacements relevés, avec trois valeurs distinctes au plus.

- Utilise une **échelle documentée** plutôt que des valeurs au cas par cas. Une base de **4** (4, 8, 12, 16, 24, 32, 48, 64…) offre en général les marches intermédiaires utiles (4 ou 12, par exemple) qu’une base de 8 seule ne permet pas.
- **Plus d’espace au-dessus d’un titre qu’en dessous** : le titre se lie au contenu qu’il introduit. Quand il colle au bloc précédent, chaque section semble légender la précédente (règle *heading-rhythm*).
- Utilise \`gap\` quand l’écart est le même entre tous les frères (les lignes d’une liste, les champs d’un groupe) : la relation est portée par le parent, sans marge parasite après le dernier élément. Pour des écarts différenciés, imbrique des groupes, chacun avec son \`gap\`, ou donne une marge à l’élément qui doit s’écarter.
- Nomme par leur rôle les espacements qui se répètent (\`--space-group\`, \`--space-section\`).

La variation n’est pas un but : la répétition aide à reconnaître, on la rompt quand le contenu ou la priorité change. Et les corrections optiques se font en dernier, après avoir regardé le rendu.`,
      examples: [
        {
          title: 'Une fiche recette',
          bad: {
            alt: 'Fiche recette où titre, métadonnées, intertitres et lignes de liste sont tous séparés par le même espace de 16 px.',
            html: `<div class="mk-pad mk-stack" style="--gap:16px">
  <p class="mk-h2">Velouté de potimarron</p><p class="mk-small mk-muted">4 personnes · 35 min</p>
  <p class="mk-h3">Ingrédients</p><p>1 potimarron de 1 kg</p><p>2 oignons</p><p>50 cl de bouillon de légumes</p>
  <p class="mk-h3">Préparation</p><p>Épluchez et coupez le potimarron en cubes.</p>
</div>`,
          },
          badNote: '16 px partout : les intertitres flottent, la liste se disloque.',
          good: {
            alt: 'Même fiche : métadonnées collées au titre, intertitres précédés d’un grand espace, lignes de liste resserrées.',
            html: `<div class="mk-pad" style="display:flex;flex-direction:column">
  <p class="mk-h2">Velouté de potimarron</p><p class="mk-small mk-muted" style="margin-top:4px">4 personnes · 35 min</p>
  <p class="mk-h3" style="margin-top:32px">Ingrédients</p><div class="mk-stack" style="--gap:8px;margin-top:8px"><p>1 potimarron de 1 kg</p><p>2 oignons</p><p>50 cl de bouillon de légumes</p></div>
  <p class="mk-h3" style="margin-top:32px">Préparation</p><p style="margin-top:8px">Épluchez et coupez le potimarron en cubes.</p>
</div>`,
          },
          goodNote: '4, 8 et 32 px, tous pris dans l’échelle : chaque écart dit une relation, et les sections se lisent d’un coup d’œil.',
        },
      ],
    },
    {
      id: 'cartes',
      title: 'Cartes : le conteneur paresseux',
      body: `Impeccable appelle la carte **le conteneur paresseux** : celui qu’on ajoute par défaut. Une grille de cartes identiques (icône, titre, texte) comme structure de page est un réflexe à refuser.

- **Une carte se justifie** pour un objet autonome, qu’on parcourt et qu’on ouvre d’un clic, avec ses propres actions — surtout quand ses voisines contiennent autre chose (un tableau de bord, un fil d’actualité). Pour **comparer** ou **chercher** parmi des éléments semblables, une liste ou un tableau se lisent mieux (Nielsen Norman Group).
- **Jamais de cartes imbriquées** : une carte dans une carte crée du bruit et une profondeur inutile. Aplatis avec l’espacement, la typographie et des séparateurs.
- **La profondeur** (ombre, élévation) ne sert qu’à clarifier un état ou une hiérarchie. Déclare-la une fois : une bordure *ou* une ombre, pas une bordure fine sous une large ombre.
- **Marge intérieure** : au moins 8 px, idéalement 12 à 16 px, dans tout conteneur bordé ou coloré ; sinon le texte touche le bord (règle *cramped-padding*).
- Dans un carrousel horizontal, garde **le même retrait des deux côtés** : une carte collée au bord, coins coupés, trahit un panneau plus large que sa zone visible (règle *edge-flush-cards*).`,
      examples: [
        {
          title: 'Une page « Équipe »',
          bad: {
            alt: 'Page « Équipe » : une carte qui contient une carte « Membres », qui contient elle-même une carte par personne.',
            html: `<div class="mk-pad"><div class="mk-card mk-stack" style="--gap:10px">
  <p class="mk-h3">Équipe</p>
  <div class="mk-card mk-stack" style="--gap:8px;padding:12px"><p class="mk-strong">Membres</p>
    <div class="mk-card mk-row" style="padding:10px"><span class="mk-avatar"></span><span class="mk-grow">Inès Moreau</span><span class="mk-small mk-muted">Admin</span></div>
    <div class="mk-card mk-row" style="padding:10px"><span class="mk-avatar"></span><span class="mk-grow">Hugo Petit</span><span class="mk-small mk-muted">Membre</span></div>
  </div>
</div></div>`,
          },
          badNote: 'Trois niveaux de bordures emboîtées : du bruit, et des marges qui s’additionnent.',
          good: {
            alt: 'Même page aplatie : un titre, puis une liste de membres séparés par de fins traits.',
            html: `<div class="mk-pad mk-stack" style="--gap:6px">
  <p class="mk-h3">Équipe</p><p class="mk-small mk-muted">2 membres</p>
  <ul class="mk-list"><li><span class="mk-avatar"></span><span class="mk-grow">Inès Moreau</span><span class="mk-small mk-muted">Admin</span></li><li><span class="mk-avatar"></span><span class="mk-grow">Hugo Petit</span><span class="mk-small mk-muted">Membre</span></li></ul>
</div>`,
          },
          goodNote: 'Aucune boîte : un titre, une métadonnée et des séparateurs suffisent.',
        },
      ],
    },
    {
      id: 'densite',
      title: 'La densité suit l’usage',
      body: `La quantité d’information par zone dépend de la **fréquence d’usage**, de la **complexité des décisions** et du **mode** de la surface.

- **Opérer** (outil quotidien, back-office) : structure prévisible, densité stable. Un tableau de nombreuses lignes est légitime quand la personne en a besoin ; la cohérence d’un écran à l’autre vaut mieux que la surprise.
- **Persuader** et **Expérience** : la composition peut être asymétrique, fluide ou volontairement disruptive quand l’univers le justifie.
- **Lire** : une colonne de lecture confortable et une navigation linéaire.

Pour simplifier un écran (commande *distill*) : **une** action principale, peu d’actions secondaires, le reste en divulgation progressive ; un flux vertical plutôt qu’une grille complexe ; un seul alignement ; des cartes retirées quand l’espacement suffit.

Mais simplifier n’est pas amputer : cacher derrière un point d’entrée clair, oui ; retirer ce dont la personne a besoin pour décider, non. Un écran si épuré qu’on ne sait plus quoi faire n’est pas minimaliste, il est obscur.`,
    },
    {
      id: 'responsive',
      title: 'Responsive structurel et cibles tactiles',
      body: `Le responsive se joue sur la **structure**, pas seulement sur la taille : on **réordonne**, on **replie**, on fait **refluer** ou on **révèle** selon ce qui reste important. Une barre latérale devient un menu, un tableau devient une liste, des colonnes s’empilent par ordre de priorité.

- Préfère des composants **sensibles à leur conteneur** (\`@container\`) quand le même composant vit dans des contextes différents.
- Garde l’**ordre du DOM et du focus** cohérent avec l’ordre visuel.
- Teste les extrêmes : textes longs, traductions, zoom, états vides, éléments collants, encoches. Un contenu qui déborde de son conteneur, ou une colonne qui s’étire loin sous la ligne de flottaison pendant que sa voisine flotte dans le vide, sont des défauts de structure.
- Le texte courant ne touche jamais le bord de l’écran : vise au moins 16 px de marge latérale, idéalement 24 à 32 px. Le détecteur signale moins de 12 px sur un écran de 480 px de large ou moins, moins de 16 px au-delà.

**Cibles tactiles.** Une icône peut être petite à l’œil ; sa **zone d’appui**, non. Le WCAG 2.2 (critère 2.5.8, niveau AA) exige au moins **24 × 24 px CSS**, ou un espacement équivalent ; le niveau AAA et les guides de plateformes visent **au moins 44 × 44** (Apple : 44 pt, Material : 48 dp). Agrandis la zone avec du \`padding\` ou un pseudo-élément, sans grossir le dessin.`,
      examples: [
        {
          title: 'Une barre d’outils sur téléphone',
          bad: {
            alt: 'Barre d’outils de lecteur d’articles avec quatre icônes de 16 px serrées à 4 px les unes des autres.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Le retour des tramways</p><p class="mk-small mk-muted">Lecture 6 min</p><div class="mk-row tb" style="--gap:4px">${TOOL_ICONS.map((i) => `<span class="tb-b"><i data-icon="${i}" style="--ico:16px"></i></span>`).join('')}</div><p>Dans vingt villes françaises, le tram redevient l’épine dorsale des transports…</p></div>`,
            css: `.tb { color: #36405a; } .tb-b { display: inline-grid; place-items: center; }`,
          },
          badNote: 'Des cibles de 16 × 16 px collées : un pouce en touche deux à la fois.',
          good: {
            alt: 'Même barre d’outils : les icônes gardent leur dessin de 16 px, mais chacune occupe une zone ronde de 44 px.',
            frame: 'phone',
            html: `<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Le retour des tramways</p><p class="mk-small mk-muted">Lecture 6 min</p><div class="mk-row tb" style="--gap:4px;margin-inline-start:-12px">${TOOL_ICONS.map((i) => `<span class="tb-b"><i data-icon="${i}" style="--ico:16px"></i></span>`).join('')}</div><p>Dans vingt villes françaises, le tram redevient l’épine dorsale des transports…</p></div>`,
            css: `.tb { color: #36405a; } .tb-b { width: 44px; height: 44px; border-radius: 50%; display: inline-grid; place-items: center; background: #f1f3f6; }`,
          },
          goodNote: 'Même dessin de 16 px, zone d’appui de 44 × 44 px : facile à viser, sans alourdir.',
        },
      ],
    },
  ],
  rules: [
    { id: 'squint', front: 'En quoi consiste le test du plissement d’yeux ?', back: 'Flouter l’écran : on doit encore reconnaître l’élément principal, le secondaire et les grands groupes, dans l’ordre.' },
    { id: 'proximity', front: 'Premier outil pour montrer que des éléments vont ensemble ?', back: 'La proximité : serrés dans un groupe, nettement séparés entre groupes. Le conteneur vient seulement si elle ne suffit pas.' },
    { id: 'heading-space', front: 'Plus d’espace au-dessus d’un intertitre qu’en dessous : est-ce suffisant ?', back: 'Non : l’espace au-dessus doit aussi dépasser nettement l’écart entre deux paragraphes, sinon la nouvelle section ne se détache pas.' },
    { id: 'scale', front: 'Quelle échelle d’espacement adopter ?', back: 'Une échelle documentée en base 4 (4, 8, 12, 16, 24, 32, 48…), plutôt que des valeurs au cas par cas.' },
    { id: 'monotonous', front: 'Pourquoi pas 16 px partout ?', back: 'Un intervalle unique donne le même poids à tout : les groupes et le rythme disparaissent.' },
    { id: 'nested', front: 'Une carte dans une carte ?', back: 'Jamais. Aplatis avec l’espacement, la typographie et des séparateurs.' },
    { id: 'cards', front: 'Quand une carte se justifie-t-elle ?', back: 'Pour un objet autonome qu’on parcourt et qu’on ouvre d’un clic, souvent différent de ses voisins. Pour comparer ou chercher parmi des éléments semblables, préfère une liste ou un tableau.' },
    { id: 'padding', front: 'Tu poses un fond coloré derrière un texte : que dois-tu ajouter aussi ?', back: 'Une marge intérieure d’au moins 8 px, idéalement 12 à 16 : le fond dessine un bord, et le texte ne doit pas le toucher.' },
    { id: 'gap', front: '`gap` ou marges sur les enfants ?', back: '`gap` quand tous les frères sont espacés pareil : le parent porte la relation, sans marge parasite au bout. Pour des écarts différents, imbrique des groupes ou ajoute une marge ciblée.' },
    { id: 'density', front: 'Comment choisir la densité d’un écran ?', back: 'Selon la fréquence d’usage, la complexité des décisions et le mode : un outil quotidien peut être dense, une page d’accueil respire.' },
    { id: 'responsive', front: 'Qu’est-ce qu’un responsive structurel ?', back: 'Réordonner, replier, faire refluer ou révéler selon ce qui reste important — pas seulement rétrécir.' },
    { id: 'edge', front: 'Quelle marge latérale pour le texte courant ?', back: 'Vise au moins 16 px, idéalement 24 à 32. Le détecteur signale moins de 12 px sur un écran de 480 px de large ou moins, moins de 16 px au-delà.' },
    { id: 'targets', front: 'La zone d’appui d’une icône doit-elle avoir la taille de son dessin ?', back: 'Non : le dessin peut rester petit. Agrandis la zone avec du `padding` ou un pseudo-élément : 24 × 24 px au moins (WCAG 2.2 AA), idéalement 44 × 44.' },
  ],
  exercises: [
    {
      id: 'layout-proximity-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Dans quelle liste vois-tu immédiatement quelle description va avec quel réglage ?',
      options: [
        {
          id: 'even',
          visual: {
            alt: 'Liste de trois réglages de notifications où titres et descriptions sont tous séparés par le même espace.',
            html: `<div class="mk-pad"><p class="mk-h3" style="margin-bottom:12px">Notifications</p><div class="mk-stack" style="--gap:12px">${NOTIF.map(
              ([t, d, on]) => `<div class="mk-row mk-between"><p class="mk-strong">${t}</p><span class="mk-toggle${on ? ' mk-toggle--on' : ''}"></span></div><p class="mk-small mk-muted">${d}</p>`,
            ).join('')}</div></div>`,
          },
          why: 'Chaque description est à 12 px de son titre et à 12 px du titre suivant : l’œil ne sait pas à quel réglage elle se rattache.',
        },
        {
          id: 'grouped',
          visual: {
            alt: 'Même liste où chaque description est collée à son titre et où les réglages sont nettement espacés.',
            html: `<div class="mk-pad"><p class="mk-h3" style="margin-bottom:16px">Notifications</p><div class="mk-stack" style="--gap:24px">${NOTIF.map(
              ([t, d, on]) => `<div class="mk-row mk-between" style="align-items:flex-start"><div class="mk-stack" style="--gap:4px"><p class="mk-strong">${t}</p><p class="mk-small mk-muted">${d}</p></div><span class="mk-toggle${on ? ' mk-toggle--on' : ''}" style="margin-top:2px"></span></div>`,
            ).join('')}</div></div>`,
          },
          why: '4 px entre un titre et sa description, 24 px entre deux réglages : les groupes se lisent avant les mots.',
        },
      ],
      answer: 'grouped',
      explanation: `La **loi de proximité** dit que des éléments proches sont perçus comme un groupe. Quand l’espace est le même partout, aucun groupe n’émerge : la description flotte à égale distance de deux réglages, et il faut lire pour comprendre.

La version recommandée crée deux intervalles très différents — serré à l’intérieur d’un réglage, généreux entre deux réglages. Aucune bordure ni carte n’est nécessaire : la proximité fait le travail.`,
      takeaway: 'Serré à l’intérieur d’un groupe, généreux entre les groupes : la proximité groupe sans aucun conteneur.',
      sources: ['imp:layout', 'imp:craft-floor', PROXIMITY],
    },
    {
      id: 'layout-heading-slider',
      type: 'slider',
      difficulty: 1,
      prompt: 'Règle l’espace au-dessus de l’intertitre « Retours et remboursements » pour que la nouvelle section se lise d’un coup d’œil.',
      visual: {
        alt: 'Page d’aide avec une section « Livraison » de deux paragraphes, puis un intertitre dont l’espace au-dessus varie avec le curseur.',
        html: `<div class="mk-pad hr">
  <p class="hr-h">Livraison</p>
  <p>Votre colis est préparé sous 24 h, puis remis au transporteur. Vous recevez le numéro de suivi par e-mail.</p>
  <p class="hr-next">Les commandes du week-end partent le lundi matin.</p>
  <p class="hr-h hr-target">Retours et remboursements</p>
  <p>Vous disposez de 30 jours pour retourner un article. Le remboursement suit sous 5 jours ouvrés.</p>
</div>`,
        css: `.hr { display: flex; flex-direction: column; line-height: 1.5; }
.hr-h { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.hr-next { margin-top: 12px; }
.hr-target { margin-top: var(--v, 4px); }`,
      },
      control: 'Espace au-dessus de l’intertitre',
      min: 0,
      max: 72,
      step: 2,
      initial: 4,
      unit: 'px',
      target: [24, 40],
      ideal: 32,
      explanation: `Un intertitre appartient au contenu qu’il **introduit**. Il lui faut donc plus d’espace au-dessus qu’en dessous : ici, 8 px le séparent de son paragraphe, et 12 px séparent deux paragraphes d’une même section.

- De 0 à 8 px, l’intertitre est aussi près, voire plus près, du paragraphe précédent que du sien : il semble le conclure au lieu d’ouvrir une section (règle *heading-rhythm* du détecteur). De 10 à une vingtaine de pixels, la coupure reste à peine plus marquée que l’écart de 12 px entre deux paragraphes.
- Autour de 32 px — quatre fois l’espace sous le titre, près de trois fois l’écart entre paragraphes —, la coupure se voit sans effort.
- Au-delà d’environ 40 px, dans une colonne aussi compacte, les sections se détachent et la page se fragmente.`,
      takeaway: 'Plus d’espace au-dessus d’un titre qu’en dessous, et nettement plus que l’écart entre deux paragraphes.',
      sources: ['imp:craft-floor', 'imp:detector', 'imp:layout'],
    },
    {
      id: 'layout-rhythm-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle page de compte se parcourt le plus facilement ?',
      options: [
        {
          id: 'monotone',
          visual: { alt: 'Page « Mon compte » où tous les éléments, libellés, valeurs et intertitres, sont séparés par 16 px.', html: account(16, 16, 16, 16), css: ACCOUNT_CSS },
          why: 'Le même écart de 16 px partout : libellés, valeurs et sections pèsent pareil, la page se lit comme une liste uniforme.',
        },
        {
          id: 'rhythm',
          visual: { alt: 'Page « Mon compte » : libellés collés à leurs valeurs, lignes espacées, intertitres précédés d’un grand espace.', html: account(4, 16, 32, 8), css: ACCOUNT_CSS },
          why: '4 px entre un libellé et sa valeur, 16 px entre deux lignes, 32 px avant un intertitre et 8 px après : chaque écart dit une relation.',
        },
        {
          id: 'inverted',
          visual: { alt: 'Page « Mon compte » où chaque intertitre est collé au bloc précédent et éloigné de son propre contenu.', html: account(4, 16, 8, 32), css: ACCOUNT_CSS },
          why: 'Les intertitres collent au bloc d’avant (8 px) et s’éloignent de leur contenu (32 px) : « Sécurité » semble conclure la section « Profil ».',
        },
      ],
      answer: 'rhythm',
      explanation: `Le **rythme** vient du contraste entre intervalles serrés et généreux, chacun lié à une relation : un libellé et sa valeur forment un tout, deux lignes d’une section sont voisines, deux sections sont distinctes.

Les deux autres versions échouent différemment : l’espacement monotone efface les groupes (règle *monotonous-spacing*) ; l’espacement inversé rattache chaque intertitre au mauvais bloc (règle *heading-rhythm*).`,
      takeaway: 'Rythme : serré dans un groupe, plus large entre les lignes, généreux avant chaque section — et plus d’espace au-dessus d’un titre qu’en dessous.',
      sources: ['imp:layout', 'imp:craft-floor', 'imp:detector'],
    },
    {
      id: 'layout-nested-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel récapitulatif de commande est le plus clair ?',
      options: [
        {
          id: 'nested',
          visual: {
            alt: 'Récapitulatif de commande dans une carte, qui contient une carte d’articles où chaque article est lui-même une carte, puis une carte de totaux.',
            html: `<div class="mk-pad"><div class="mk-card mk-stack" style="--gap:10px">
  <p class="mk-h3">Récapitulatif</p>
  <div class="mk-card mk-stack" style="--gap:8px;padding:12px">
    <div class="mk-card mk-row mk-between" style="padding:10px"><span>Théière en fonte</span><span class="mk-price">48,00 €</span></div>
    <div class="mk-card mk-row mk-between" style="padding:10px"><span>Thé vert sencha, 100 g</span><span class="mk-price">12,50 €</span></div>
  </div>
  <div class="mk-card mk-stack" style="--gap:4px;padding:12px">
    <div class="mk-row mk-between mk-small"><span>Livraison</span><span>4,90 €</span></div>
    <div class="mk-row mk-between mk-strong"><span>Total</span><span class="mk-price">65,40 €</span></div>
  </div>
</div></div>`,
          },
          why: 'Trois niveaux de cartes emboîtées : les bordures se multiplient, les marges s’additionnent et le total se perd.',
        },
        {
          id: 'flat',
          visual: {
            alt: 'Récapitulatif dans une seule carte : liste d’articles avec séparateurs, puis livraison et total sous un trait.',
            html: `<div class="mk-pad"><div class="mk-card mk-stack" style="--gap:12px">
  <p class="mk-h3">Récapitulatif</p>
  <ul class="mk-list"><li><span class="mk-grow">Théière en fonte</span><span class="mk-price">48,00 €</span></li><li><span class="mk-grow">Thé vert sencha, 100 g</span><span class="mk-price">12,50 €</span></li></ul>
  <div class="mk-stack" style="--gap:6px">
    <div class="mk-row mk-between mk-small mk-muted"><span>Livraison</span><span>4,90 €</span></div>
    <div class="mk-row mk-between" style="font-size:16px;font-weight:700"><span>Total</span><span class="mk-price">65,40 €</span></div>
  </div>
</div></div>`,
          },
          why: 'Une seule carte, des séparateurs et de l’espace : le regard descend des articles au total sans obstacle.',
        },
      ],
      answer: 'flat',
      explanation: `Une carte dans une carte n’apporte aucune information : elle ajoute du bruit visuel, de la profondeur inutile et des marges qui s’empilent. C’est un cliché que le détecteur d’impeccable relève (*nested cards*).

Pour séparer des sous-parties, aplatis : l’**espacement**, la **typographie** (un total plus grand et plus gras) et de **fins séparateurs** suffisent.`,
      takeaway: 'Jamais de cartes imbriquées : sépare les sous-parties par l’espace, la typographie et des séparateurs.',
      sources: ['imp:craft-floor', 'imp:distill', 'imp:detector'],
    },
    {
      id: 'layout-cards-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sur une page de paramètres, chacun des quinze réglages est enfermé dans sa propre carte ombrée. Quelle est la meilleure correction ?',
      options: [
        { id: 'flatten', label: 'Retirer les cartes et grouper les réglages sous des intertitres.', why: 'Les réglages ne sont pas des objets autonomes : la proximité, les intertitres et des séparateurs les organisent sans boîtes.' },
        { id: 'shadow', label: 'Accentuer les ombres pour mieux distinguer les cartes.', why: 'On renforce le bruit au lieu de le retirer : quinze boîtes plus marquées restent quinze boîtes.' },
        { id: 'wrap', label: 'Regrouper les cartes par thème dans de grandes cartes englobantes.', why: 'On crée des cartes imbriquées, que le plancher de qualité refuse toujours.' },
        { id: 'colors', label: 'Donner une couleur de fond différente à chaque carte.', why: 'La couleur décorative n’organise rien et dilue les couleurs qui ont un rôle.' },
      ],
      answer: 'flatten',
      explanation: `Impeccable appelle la carte **le conteneur paresseux**. Un bon test : l’élément est-il un objet autonome, qu’on ouvre d’un clic et qui porte ses propres actions ? Un réglage n’en est pas un : il se règle sur place, au milieu d’éléments semblables. Or, pour des éléments homogènes, une liste se parcourt mieux que des cartes (Nielsen Norman Group).

La commande *distill* le dit simplement : les cartes ne sont pas nécessaires à la mise en page ; l’**espacement** et l’**alignement** suffisent. Groupe les réglages par thème, sous des intertitres, et garde les boîtes pour les vrais objets.`,
      takeaway: 'Une carte se mérite : réserve-la aux objets autonomes et organise le reste par l’espace, les intertitres et les séparateurs.',
      sources: ['imp:craft-floor', 'imp:distill', NNG_CARDS],
    },
    {
      id: 'layout-page-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Trouve les trois défauts de mise en page de cet espace client.',
      visual: {
        alt: 'Page « Mon abonnement » : en-tête, bandeau bleu d’essai gratuit, carte « Facturation », intertitre « Historique des paiements », liste de paiements et bouton « Changer d’offre ».',
        frame: 'browser',
        html: `<div class="mk-pad" style="display:flex;flex-direction:column">
  <div class="mk-row mk-between cs-head" data-hotspot="header"><p class="mk-h2">Mon abonnement</p><span class="mk-small mk-muted">Camille Laurent</span></div>
  <p class="cs-trial" data-hotspot="cramped">Votre essai gratuit se termine dans 3 jours. Ajoutez un moyen de paiement pour continuer.</p>
  <div class="mk-card mk-stack" style="--gap:10px" data-hotspot="nested">
    <p class="mk-strong">Facturation</p>
    <div class="cs-in mk-stack" style="--gap:6px"><p class="mk-small mk-muted">Moyen de paiement</p><div class="cs-in2 mk-row" style="--gap:8px"><i data-icon="credit-card" style="--ico:18px"></i><span>Visa se terminant par 4242</span></div></div>
  </div>
  <p class="cs-h" data-hotspot="heading">Historique des paiements</p>
  <ul class="mk-list" data-hotspot="history"><li><span class="mk-grow">1er mars · Offre Atelier</span><span class="mk-price">19,00 €</span></li><li><span class="mk-grow">1er février · Offre Atelier</span><span class="mk-price">19,00 €</span></li></ul>
  <span class="mk-btn" data-hotspot="cta" style="align-self:flex-start;margin-top:16px">Changer d’offre</span>
</div>`,
        css: `.cs-head { flex-wrap: wrap; row-gap: 2px; }
.cs-head > * { white-space: nowrap; }
.cs-trial { margin: 16px 0; background: #e8f0fe; color: #1a3a7a; padding: 1px 3px; border-radius: 6px; }
.cs-in { border: 1px solid #e1e4ea; border-radius: 10px; padding: 12px; }
.cs-in2 { border: 1px solid #e1e4ea; border-radius: 8px; padding: 8px 10px; box-shadow: 0 1px 3px rgb(15 20 35 / 0.1); }
.cs-h { font-size: 16px; font-weight: 700; margin-top: 4px; margin-bottom: 24px; }`,
      },
      hotspots: [
        { id: 'cramped', label: 'Bandeau d’essai gratuit', correct: true, why: 'Le texte touche presque les bords du fond bleu (1 à 3 px) : il faut au moins 8 px, idéalement 12 à 16 px, dans un conteneur coloré.' },
        { id: 'nested', label: 'Carte « Facturation »', correct: true, why: 'Une carte qui contient un cadre qui contient une carte ombrée : trois niveaux d’emboîtement pour une seule information.' },
        { id: 'heading', label: 'Intertitre « Historique des paiements »', correct: true, why: '4 px au-dessus, 24 px en dessous : l’intertitre colle à la carte précédente et s’éloigne de la liste qu’il introduit.' },
        { id: 'header', label: 'En-tête de page', correct: false, why: 'Titre de page et nom du compte, sans décor : clair et sobre.' },
        { id: 'history', label: 'Liste des paiements', correct: false, why: 'Lignes régulières, montants en chiffres tabulaires, séparateurs fins : rien à corriger.' },
        { id: 'cta', label: 'Bouton « Changer d’offre »', correct: false, why: 'Action nommée, bien détachée de la liste.' },
      ],
      explanation: `Trois règles du détecteur d’impeccable s’appliquent ici :

- **cramped-padding** : du texte collé au bord d’un conteneur coloré ou bordé ; il faut au moins 8 px de marge intérieure, idéalement 12 à 16.
- **nested-cards** : des boîtes dans des boîtes ; on aplatit avec l’espace, la typographie et des séparateurs.
- **heading-rhythm** : un intertitre plus proche du bloc précédent que de son contenu ; on ouvre l’espace au-dessus.`,
      takeaway: 'Marge intérieure de 12–16 px, jamais de cartes imbriquées, et plus d’espace au-dessus d’un titre qu’en dessous.',
      sources: ['imp:detector', 'imp:craft-floor', 'imp:layout'],
    },
    {
      id: 'layout-phone-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux problèmes d’espace sur cet écran de recette mobile.',
      visual: {
        alt: 'Écran de téléphone d’une application de recettes : titre, photo, rangée de quatre petites icônes, paragraphe de préparation et barre d’onglets.',
        frame: 'phone',
        html: `<div class="rc">
  <p class="mk-h3 rc-title" data-hotspot="title">Tarte fine aux pommes</p>
  <div class="mk-img rc-img" data-hotspot="photo" style="--ratio:16 / 9"></div>
  <div class="rc-tools" data-hotspot="tools">${TOOL_ICONS.map((i) => `<i data-icon="${i}" style="--ico:14px"></i>`).join('')}</div>
  <p class="rc-body" data-hotspot="body">Étalez la pâte feuilletée, piquez-la à la fourchette puis disposez les pommes en rosace. Enfournez 25 minutes à 200 °C, jusqu’à ce que les bords soient dorés.</p>
  <div class="mk-tabbar" data-hotspot="tabbar"><span class="on"><i data-icon="house" style="--ico:20px"></i>Accueil</span><span><i data-icon="search" style="--ico:20px"></i>Chercher</span><span><i data-icon="bookmark" style="--ico:20px"></i>Carnet</span><span><i data-icon="user" style="--ico:20px"></i>Profil</span></div>
</div>`,
        css: `.rc-title { padding: 10px 16px 8px; }
.rc-img { margin: 0 16px; }
.rc-tools { display: flex; gap: 4px; padding: 8px 16px; color: #36405a; }
.rc-body { padding: 4px 0 14px; line-height: 1.5; }
.mk-tabbar { font-size: 11px; }`,
      },
      hotspots: [
        { id: 'body', label: 'Paragraphe de préparation', correct: true, why: 'Le texte touche les bords de l’écran : vise au moins 16 px de marge latérale, idéalement 24 à 32 (sur un téléphone, le détecteur signale moins de 12 px).' },
        { id: 'tools', label: 'Rangée d’icônes', correct: true, why: 'Quatre cibles de 14 px espacées de 4 px : bien sous les 24 × 24 px du WCAG 2.2, et difficiles à toucher sans erreur.' },
        { id: 'title', label: 'Titre de la recette', correct: false, why: 'Aligné sur la même marge de 16 px que la photo : cohérent.' },
        { id: 'photo', label: 'Photo', correct: false, why: 'Même retrait que le titre, proportions fixes : rien à corriger.' },
        { id: 'tabbar', label: 'Barre d’onglets', correct: false, why: 'Quatre onglets larges, icône et libellé : des cibles confortables.' },
      ],
      explanation: `Deux contraintes physiques du mobile :

- **Marges latérales** : un texte collé au bord de l’écran se lit mal et paraît coupé. Le détecteur d’impeccable le signale sous 16 px (12 px sur les écrans de 480 px ou moins) et recommande 24 à 32 px.
- **Cibles tactiles** : le WCAG 2.2 exige au moins 24 × 24 px CSS par cible (critère 2.5.8), et 44 × 44 est recommandé. Le dessin peut rester petit : c’est la zone d’appui qu’on agrandit, avec du \`padding\`.`,
      takeaway: 'Sur mobile : vise 16 px de marge latérale (jamais moins de 12), et des zones d’appui d’au moins 24 px, idéalement 44.',
      sources: ['imp:detector', 'wcag:target', 'imp:layout'],
    },
    {
      id: 'layout-density-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Des comptables saisissent des écritures toute la journée dans leur logiciel. Quelle densité pour la liste des écritures ?',
      options: [
        { id: 'dense', label: 'Un tableau compact : colonnes alignées, une trentaine d’écritures à l’écran.', why: 'Usage quotidien et intensif : la densité devient une aide, et la structure stable permet de travailler vite.' },
        { id: 'airy', label: 'De grandes cartes aérées, une écriture par carte, comme sur une page d’accueil.', why: 'Quelques écritures à la fois : on fait défiler sans cesse et on perd la vue d’ensemble.' },
        { id: 'tall', label: 'Des lignes hautes avec avatar et résumé, huit écritures par écran.', why: 'Avatar et résumé n’aident ni à saisir ni à vérifier : avec huit lignes par écran, on défile sans cesse.' },
        { id: 'paged', label: 'Dix écritures par page, avec une pagination, pour rester lisible.', why: 'La liste se morcelle : on tourne les pages au lieu de parcourir et de comparer. La lisibilité vient de l’alignement, pas d’un petit nombre de lignes.' },
      ],
      answer: 'dense',
      explanation: `La densité se choisit selon la **fréquence d’usage**, la **complexité des décisions** et le **mode** de la surface. Un logiciel de comptabilité est une surface *Opérer* : la personne connaît l’outil et veut voir beaucoup, vite.

Impeccable l’autorise explicitement : des tableaux de nombreuses lignes, des panneaux chargés de libellés, quand la personne en a besoin, avec une structure prévisible et stable. L’aération généreuse des pages d’accueil n’est pas la référence ici.`,
      takeaway: 'Densité selon l’usage : un outil quotidien peut être dense et stable ; une page d’accueil respire.',
      sources: ['imp:layout', 'imp:operate'],
    },
    {
      id: 'layout-responsive-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Ce tableau de bord des ventes, conçu pour ordinateur, doit fonctionner sur téléphone. Quelle adaptation est la bonne ?',
      options: [
        {
          id: 'scaled',
          visual: {
            alt: 'Téléphone affichant la version ordinateur rétrécie : barre latérale, trois colonnes de chiffres et un tableau en texte minuscule.',
            frame: 'phone',
            html: `<div class="sc"><div class="sc-side"><b>Ventes</b><span>Accueil</span><span>Commandes</span><span>Produits</span><span>Clients</span></div><div class="sc-main"><b>Aujourd’hui</b><div class="sc-kpis"><span>CA 1 284 €</span><span>32 commandes</span><span>Panier 40 €</span></div><div class="sc-row"><span>N° 2291</span><span>Lyon</span><span>54,00 €</span></div><div class="sc-row"><span>N° 2290</span><span>Lille</span><span>32,50 €</span></div><div class="sc-row"><span>N° 2289</span><span>Nantes</span><span>18,90 €</span></div></div></div>`,
            css: `.sc { display: flex; font-size: 7px; min-height: 230px; } .sc-side { width: 68px; background: #f4f6f9; padding: 8px; display: flex; flex-direction: column; gap: 6px; } .sc-main { flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 6px; } .sc-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; } .sc-kpis span { background: #f4f6f9; padding: 6px 4px; border-radius: 4px; } .sc-row { display: flex; justify-content: space-between; border-bottom: 1px solid #eceef2; padding: 3px 0; }`,
          },
          why: 'Tout est rétréci : un texte de 7 px se lit à peine, et les cibles deviennent minuscules.',
        },
        {
          id: 'structural',
          visual: {
            alt: 'Téléphone affichant une version réorganisée : barre de titre avec menu, chiffre du jour en grand, deux indicateurs, liste des dernières commandes et barre d’onglets.',
            frame: 'phone',
            html: `<div class="ph-top"><i data-icon="menu"></i><b>Ventes</b></div><div class="mk-pad mk-stack" style="--gap:12px"><div class="ph-kpi"><span class="mk-small mk-muted">Chiffre du jour</span><b>1 284 €</b></div><div class="mk-grid" style="--gap:8px"><div class="ph-kpi"><span class="mk-small mk-muted">Commandes</span><b>32</b></div><div class="ph-kpi"><span class="mk-small mk-muted">Panier moyen</span><b>40 €</b></div></div><ul class="mk-list"><li><span class="mk-grow">N° 2291 · Lyon</span><span class="mk-price">54,00 €</span></li><li><span class="mk-grow">N° 2290 · Lille</span><span class="mk-price">32,50 €</span></li></ul></div><div class="mk-tabbar"><span class="on"><i data-icon="house" style="--ico:20px"></i>Accueil</span><span><i data-icon="receipt" style="--ico:20px"></i>Commandes</span><span><i data-icon="package" style="--ico:20px"></i>Produits</span></div>`,
            css: PHONE_KPI_CSS,
          },
          why: 'La barre latérale devient menu et onglets, le chiffre clé passe en tête, les colonnes s’empilent par priorité.',
        },
        {
          id: 'overflow',
          visual: {
            alt: 'Téléphone affichant la version ordinateur en taille normale, coupée sur la droite : on ne voit qu’une partie des colonnes.',
            frame: 'phone',
            html: `<div class="of"><div class="of-side"><b>Ventes</b><span>Accueil</span><span>Commandes</span><span>Produits</span></div><div class="of-main"><b>Aujourd’hui</b><div class="of-kpis"><span>Chiffre d’affaires<br><b>1 284 €</b></span><span>Commandes<br><b>32</b></span><span>Panier moyen<br><b>40 €</b></span></div></div></div>`,
            css: `.of { display: flex; width: 620px; min-height: 230px; } .of-side { width: 150px; background: #f4f6f9; padding: 12px; display: flex; flex-direction: column; gap: 10px; } .of-main { flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 10px; } .of-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } .of-kpis span { background: #f4f6f9; padding: 10px; border-radius: 8px; }`,
          },
          why: 'La mise en page d’ordinateur déborde : la moitié des indicateurs est hors de l’écran, il faudrait défiler à l’horizontale.',
        },
      ],
      answer: 'structural',
      explanation: `Un responsive réussi est **structurel** : on réordonne, on replie, on fait refluer ou on révèle selon ce qui reste important sur un petit écran. Ici, la barre latérale devient un menu et des onglets, l’indicateur principal passe en tête, les colonnes s’empilent.

Rétrécir l’ensemble rend tout illisible ; garder la mise en page d’ordinateur impose un défilement horizontal et cache la moitié du contenu (le WCAG demande qu’un contenu reste utilisable à 320 px de large sans devoir défiler à la fois horizontalement et verticalement).`,
      takeaway: 'Sur petit écran, change la structure — replier, empiler par priorité, révéler — au lieu de rétrécir ou de laisser déborder.',
      sources: ['imp:layout', 'imp:operate', { label: 'W3C — Comprendre le critère 1.4.10 (redistribution)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html' }],
    },
    {
      id: 'layout-scale-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Range ces espacements du plus petit au plus grand, selon la relation qu’ils expriment.',
      items: [
        { id: 'label', label: 'Entre un libellé et son champ' },
        { id: 'fields', label: 'Entre deux champs d’un même groupe' },
        { id: 'groups', label: 'Entre deux groupes de champs' },
        { id: 'sections', label: 'Entre deux sections d’une page' },
      ],
      explanation: `Plus la relation est forte, plus l’espace est petit. Sur une échelle en base 4, cela donne par exemple :

1. un libellé et son champ : 4 à 8 px, ils forment un tout ;
2. deux champs voisins : 12 à 16 px ;
3. deux groupes : 24 à 32 px ;
4. deux sections : 48 px ou plus.

Ces valeurs varient selon la densité du produit ; l’**ordre**, lui, ne change pas.`,
      takeaway: 'Plus la relation est forte, plus l’espace est petit : du libellé collé à son champ jusqu’aux sections de la page.',
      sources: ['imp:layout', 'imp:craft-floor', PROXIMITY],
    },
    {
      id: 'layout-match-symptoms',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque symptôme relevé par le détecteur à sa correction.',
      leftTitle: 'Symptôme',
      rightTitle: 'Correction',
      pairs: [
        { id: 'heading', left: 'Un intertitre colle au paragraphe précédent', right: 'Ouvrir l’espace au-dessus du titre' },
        { id: 'padding', left: 'Du texte touche le bord d’un encadré coloré', right: 'Une marge intérieure de 12 à 16 px' },
        { id: 'nested', left: 'Des cartes dans des cartes', right: 'Aplatir : espace, typographie, séparateurs' },
        { id: 'mono', left: 'Le même espacement de 16 px partout', right: 'Serrer les groupes, espacer les sections' },
        { id: 'flush', left: 'Les cartes d’un carrousel sont coupées au bord', right: 'Le même retrait des deux côtés du défilement' },
        { id: 'overflow', left: 'Un long nom de produit sort de son conteneur', right: 'Laisser le texte passer à la ligne' },
      ],
      explanation: `Chaque règle du détecteur a sa correction structurelle :

- *heading-rhythm* : un titre se lie à ce qu’il introduit ;
- *cramped-padding* : 8 px au minimum, 12 à 16 px idéalement ;
- *nested-cards* : on retire des boîtes au lieu d’en ajouter ;
- *monotonous-spacing* : on crée des contrastes d’espace ;
- *edge-flush-cards* : un panneau plus large que sa zone visible coupe ses cartes ;
- *text-overflow* : un contenu plus large que son conteneur ; on le laisse passer à la ligne ou on contraint sa largeur.`,
      takeaway: 'Chaque défaut d’espace a sa correction : ouvrir au-dessus des titres, marger les encadrés, aplatir, rythmer, aligner les retraits, laisser le texte passer à la ligne.',
      sources: ['imp:detector', 'imp:craft-floor'],
    },
    {
      id: 'layout-whitespace-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'L’espace vide est de l’espace perdu : il vaut toujours mieux le remplir avec plus d’information.',
      answer: false,
      explanation: `L’espace n’est pas du vide : c’est lui qui **groupe** et **sépare**. Sans intervalles différenciés, les éléments se mélangent et la hiérarchie disparaît — il faut lire pour comprendre ce qui va ensemble.

La bonne question n’est pas « plein ou vide » mais « quelle **densité** pour cet usage ». Un outil utilisé toute la journée peut être dense ; une page d’accueil gagne à respirer. Dans les deux cas, l’espace reste structuré par une échelle.`,
      takeaway: 'L’espace groupe et sépare : on ne le remplit pas, on le dose selon l’usage.',
      sources: ['imp:layout', 'imp:distill'],
    },
    {
      id: 'layout-touch-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Une icône dessinée en 16 px impose une zone tactile de 16 px.',
      answer: false,
      explanation: `La **zone d’appui** et le **dessin** sont indépendants. Impeccable demande de garder les cibles utilisables même quand leur marque visible est petite : on agrandit la zone avec du \`padding\` ou un pseudo-élément, sans grossir l’icône.

Le WCAG 2.2 exige au moins **24 × 24 px CSS** par cible (critère 2.5.8, niveau AA), sauf espacement suffisant ; le niveau AAA et les guides d’Apple (44 pt) et de Material (48 dp) visent plus grand.`,
      takeaway: 'Le dessin peut être petit, pas la zone d’appui : au moins 24 × 24 px, idéalement 44 × 44.',
      sources: ['imp:layout', 'wcag:target', WCAG_255],
    },
    {
      id: 'layout-spacing-multi',
      type: 'multi',
      difficulty: 3,
      prompt: 'Lesquels de ces choix d’espacement sont justes ?',
      options: [
        { id: 'scale', label: 'Une échelle documentée : 4, 8, 12, 16, 24, 32, 48', why: 'Juste : une base de 4 offre les marches intermédiaires utiles.' },
        { id: 'gap', label: 'Un `gap` sur la liste plutôt qu’une marge basse sur chaque élément', why: 'Juste : la relation est portée par le parent, sans marge parasite après le dernier élément.' },
        { id: 'heading', label: 'Le même espace au-dessus et au-dessous d’un intertitre', why: 'Faux : le titre doit être plus près de son contenu que du bloc précédent.' },
        { id: 'adhoc', label: 'Des valeurs choisies au cas par cas, 13, 17 ou 22 px, écran par écran', why: 'Faux : des valeurs arbitraires cassent le rythme et la cohérence.' },
        { id: 'padding', label: 'Une marge intérieure de 4 px dans un encadré coloré', why: 'Faux : au moins 8 px, idéalement 12 à 16 px.' },
        { id: 'region', label: 'La proximité d’abord, un conteneur seulement si elle ne suffit pas', why: 'Juste : c’est l’ordre recommandé par impeccable.' },
      ],
      answers: ['scale', 'gap', 'region'],
      explanation: `Les trois bons choix ont un point commun : ils rendent l’espace **systématique** et **porteur de sens**. Une échelle limite les valeurs, \`gap\` exprime la relation entre frères, la proximité groupe avant toute boîte.

Les trois autres sont des défauts classiques : titre à égale distance de deux blocs, valeurs arbitraires, texte coincé contre le bord d’un encadré.`,
      takeaway: 'Une échelle, du `gap` pour une liste régulière, la proximité avant les conteneurs ; jamais de titre à mi-chemin ni de texte collé au bord.',
      sources: ['imp:layout', 'imp:craft-floor', 'imp:detector', COMMON_REGION],
    },
    {
      id: 'layout-distill-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'L’accueil d’une application de réservation de restaurants est trop chargé. Quelle simplification est la plus juste ?',
      options: [
        {
          id: 'grid',
          visual: {
            alt: 'Accueil composé de six tuiles identiques avec icône et libellé : Réserver, Mes réservations, Offres, Parrainage, Aide, Paramètres.',
            html: `<div class="mk-pad mk-stack" style="--gap:12px"><p class="mk-h2">Tablée</p><div class="mk-grid" style="--cols:3;--gap:8px">${[
              ['utensils', 'Réserver'],
              ['calendar', 'Mes réservations'],
              ['percent', 'Offres'],
              ['gift', 'Parrainage'],
              ['info', 'Aide'],
              ['settings', 'Paramètres'],
            ]
              .map(([i, l]) => `<div class="ds-tile"><i data-icon="${i}" style="--ico:20px"></i><span>${l}</span></div>`)
              .join('')}</div></div>`,
            css: `.ds-tile { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; padding: 12px 6px; border: 1px solid #e1e4ea; border-radius: 12px; font-size: 12px; font-weight: 600; color: #36405a; }`,
          },
          why: 'Six actions de même poids : la tâche principale, réserver, ne ressort pas plus que les paramètres.',
        },
        {
          id: 'focused',
          visual: {
            alt: 'Accueil avec une salutation, un grand bouton « Réserver une table », la prochaine réservation suivie d’un lien vers toutes les réservations, et une ligne de liens secondaires dont les paramètres.',
            html: `<div class="mk-pad mk-stack" style="--gap:16px"><div class="mk-stack" style="--gap:10px"><p class="mk-h2">Bonsoir Camille</p><span class="mk-btn mk-btn--block">Réserver une table</span></div><div class="mk-stack" style="--gap:4px"><p class="mk-small mk-muted">Prochaine réservation</p><p class="mk-strong">Jeudi 20&nbsp;h · Le Comptoir, 2 personnes</p><span class="mk-btn--text mk-small" style="padding:0;margin-top:2px;align-self:flex-start">Toutes mes réservations</span></div><div class="mk-row mk-wrap mk-small" style="--gap:14px;row-gap:6px"><span class="mk-btn--text" style="padding:0">Offres</span><span class="mk-btn--text" style="padding:0">Parrainage</span><span class="mk-btn--text" style="padding:0">Aide</span><span class="mk-btn--text" style="padding:0">Paramètres</span></div></div>`,
          },
          why: 'Une action principale, l’information utile juste après, le reste en liens secondaires : simple, sans perdre l’essentiel.',
        },
        {
          id: 'empty',
          visual: {
            alt: 'Accueil réduit à un logo et un unique bouton « Réserver » centré, sans aucune autre information.',
            html: `<div class="mk-pad mk-stack mk-center" style="--gap:18px;padding-block:40px"><p class="mk-h2">Tablée</p><span class="mk-btn" style="align-self:center">Réserver</span></div>`,
          },
          why: 'Trop épuré : la réservation à venir et l’accès à ses réservations ont disparu. Le minimalisme est devenu un mystère.',
        },
      ],
      answer: 'focused',
      explanation: `La commande *distill* d’impeccable demande **une** action principale, peu d’actions secondaires et le reste en divulgation progressive — mais elle met aussi en garde : ne pas retirer une information nécessaire, ne pas simplifier au point de devenir obscur.

La version recommandée garde la réservation à venir (ce qu’on vient vérifier) et relègue le reste en liens. La grille de tuiles égales est le réflexe inverse : elle donne autant de poids aux paramètres qu’à la tâche principale.`,
      takeaway: 'Simplifier : une action principale, l’essentiel visible, le reste en second plan — sans rien retirer dont on a besoin.',
      sources: ['imp:distill', 'imp:craft-floor'],
    },
  ],
};

export default layout;
