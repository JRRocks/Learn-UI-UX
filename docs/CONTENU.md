# Guide de rédaction du contenu

Tout ce que l’application enseigne est de la **donnée typée** : un fichier par module dans
`src/content/modules/<id>.ts`, les cultures dans `src/content/cultures/`, le catalogue des
anti-patterns dans `src/content/antipatterns.ts`. Le contrat est dans `src/engine/types.ts`.
Le module **`typography.ts` est l’étalon** : même ton, même densité, même exigence.

## Vérifier son travail

```bash
ONLY=color,layout npx vitest run src/content   # validation des modules choisis
npx tsc --noEmit                                # types
npm run shots -- color                          # captures de chaque exemple et épreuve → shots/color/*.png
npm run shots -- color --mobile                 # même chose en largeur mobile
npm run check:mocks -- color                    # textes coupés, superposés, trop petits ou trop pâles (bureau + mobile)
```

Ouvre les captures et regarde-les vraiment : une maquette illisible, qui déborde ou qui ne
montre pas clairement le défaut enseigné est un bug de contenu. `check:mocks` liste ce que
les maquettes masquent (texte coupé, points de suspension, contenu sous la ligne de
flottaison d’un cadre), les textes dessinés les uns sur les autres, le texte fonctionnel
sous 11 px (règle `undersized-ui-text` du détecteur) et le texte sous 4,5:1 (3:1 pour le
grand texte). Un défaut voulu dans une version « À éviter » ou un leurre est normal ; le
même dans une version recommandée ne l’est pas.

## Ton et langue

- Français, tutoiement, phrases courtes. Vocabulaire précis du métier ; un terme technique est
  défini à sa première apparition.
- Apostrophe typographique `’`, guillemets « … ». Les espaces insécables avant `: ; ! ?` sont
  ajoutées automatiquement au rendu : écris des espaces normales.
- Markdown restreint (pas de HTML) : paragraphes, `- ` listes, `1. ` listes, `### ` titres,
  `> ` citations, `**gras**`, `*italique*`, `` `code` ``, `[lien](url)`.
- **Exactitude avant tout** : chaque chiffre (contraste, tailles, durées, seuils) doit être
  juste et sourcé. Les références impeccable sont dans `src/content/sources.ts` (`imp:typeset`…).
  Pour une source web absente de ce fichier, utilise un objet `{ label, url }`.
- Pas de stéréotypes culturels présentés comme des lois : on parle de tendances observées,
  de conventions et de contraintes, avec leurs limites.

## Leçon (module)

- 4 à 7 **sections** : un concept par section, de la règle vers la nuance. Les sections
  reprennent fidèlement les références impeccable du module, enrichies de sources web.
- Au moins **2 sections avec des exemples visuels** « À éviter / Préférer » (`examples`).
- 8 à 14 **règles d’or** (`rules`) : recto = une question, verso = la réponse en une ou deux
  phrases. Elles deviennent des fiches de révision espacée.

## Épreuves

Vise **12 à 16 épreuves par module**, réparties à peu près ainsi :

| Type | Quantité | Usage |
|---|---|---|
| `choice` avec visuels (duel à 2 ou choix à 3–4) | 4+ | « Quel design est le meilleur ? » |
| `hotspot` | 2+ | « Trouve le(s) problème(s) dans cette maquette » |
| `choice` / `multi` textuels | 3+ | Situations, choix de solution, réglages |
| `truefalse` | 2 | Idées reçues |
| `order` | 1 | Priorités, étapes d’une méthode |
| `match` | 1 | Concept ↔ définition, besoin ↔ réglage |
| `slider` | 1 si une propriété continue s’y prête | Calibrer un espacement, une durée, un contraste… |

Difficulté : environ 40 % niveau 1, 40 % niveau 2, 20 % niveau 3.

Chaque épreuve a :

- `prompt` : la question, directe, sans révéler la réponse.
- `explanation` (« Pourquoi ») : 2 à 4 courts paragraphes ou une liste. Explique le
  **mécanisme** (pourquoi ça marche ou échoue chez l’utilisateur), puis la règle.
- `takeaway` (« À retenir ») : la règle en une phrase (≤ 220 caractères).
- `why` sur chaque option / hotspot : pourquoi ce choix est bon ou pas.
- `sources` : au moins une référence.

Règles strictes :

- Les options sont **mélangées à l’affichage** : ne jamais écrire « option A », « à gauche »,
  « la première ». Parle de « la version recommandée », « la version avec les capitales »…
- Les `label` d’options visuelles restent **neutres** (ou absents) : ils ne doivent pas
  trahir la réponse. Le `why` est révélé après coup.
- `hotspot` : 1 à 3 zones correctes **et** au moins 2 leurres (`correct: false`) plausibles.
  Chaque `data-hotspot` du HTML a son entrée dans `hotspots`, et inversement.
- `slider` : la valeur `initial` est **hors** de la cible ; le CSS du visuel lit `var(--n)`
  (nombre brut) ou `var(--v)` (nombre + unité).
- Une épreuve enseigne **une** idée. Pas de piège sur la formulation.

## Maquettes (`Visual`)

Les maquettes représentent **d’autres produits**. Elles sont rendues dans un Shadow DOM isolé,
avec un kit de classes neutres (`src/components/mockKit.ts`) :

- Mise en page : `mk-pad`, `mk-pad-s`, `mk-pad-l`, `mk-stack` (colonne, `--gap`), `mk-row`,
  `mk-between`, `mk-wrap`, `mk-grow`, `mk-grid` (`--cols`), `mk-center`, `mk-divider`.
- Texte : `mk-h1`, `mk-h2`, `mk-h3`, `mk-p`, `mk-small`, `mk-muted`, `mk-strong`, `mk-price`.
- Contrôles : `mk-btn` (+ `--ghost`, `--text`, `--danger`, `--block`, `--s`, `--disabled`),
  `mk-field`, `mk-label`, `mk-help`, `mk-error`, `mk-input` (+ `--error`), `mk-check`
  (+ `--on`), `mk-toggle` (+ `--on`), `mk-tabs`, `mk-tab` (+ `--on`).
- Blocs : `mk-card`, `mk-surface`, `mk-badge`, `mk-avatar`, `mk-img` (`--ratio`), `mk-line`
  (+ `--s`, `--m`), `mk-list`, `mk-toast`, `mk-tabbar` (enfants `span`, `.on`),
  `mk-overlay` + `mk-dialog`.
- Cadres : `frame: 'browser'` (fenêtre de navigateur) ou `frame: 'phone'` (téléphone 320 px).
- Icônes : `<i data-icon="search"></i>` devient une icône Lucide (liste des noms dans
  `src/components/mockIcons.ts`). Taille via `style="--ico:16px"`. **Jamais d’emoji comme
  icône.**
- `css` : styles propres à la maquette (préfixe tes classes, ex. `.cart-…`). Les styles
  inline sont permis pour les démonstrations de valeurs précises.
- Écris du **vrai contenu** réaliste (noms de produits, prix, dates, libellés), pas de lorem
  ipsum. Les maquettes en écriture arabe utilisent `dir: 'rtl'` et `lang: 'ar'`.
- Une maquette tient en largeur dans 320 à 520 px (elle est affichée côte à côte en duel, et
  pleine largeur sur mobile). Évite les hauteurs fixes : laisse le contenu dicter la hauteur.
- `alt` décrit ce que montre la maquette, sans dire laquelle est la bonne.
- Le défaut enseigné doit être **visible à l’œil nu** à la taille d’affichage ; la bonne
  version doit être réellement bonne (contraste, espacements, hiérarchie), pas juste
  « moins pire ».
