# Épreuves — atelier UI/UX

Une application web pour **devenir meilleur en UI/UX** par la pratique : des leçons courtes,
puis des épreuves corrigées avec **le choix recommandé, le pourquoi et la règle à retenir**.

Le contenu reprend les références de design du projet open source
[impeccable](https://github.com/pbakaus/impeccable) (Paul Bakaus, Apache-2.0) — modes de
visite, plancher de qualité, typographie, couleur, espace, mouvement, rédaction UX,
robustesse, critique heuristique, personas, audit et les 62 règles de son détecteur
d’anti-patterns — enrichies de sources web reconnues (Nielsen Norman Group, WCAG 2.2, Laws of
UX, Deceptive Patterns, Material, Apple HIG, web.dev, MDN, CNIL…). Un volet **Cultures**
enseigne les différences d’interface entre pays (Occident, Chine, Japon, Corée, Inde, monde
arabe, Brésil…) et comment s’y adapter.

## Les onglets

| Onglet | Contenu |
|---|---|
| **Accueil** | Session du jour, révisions et fiches dues, objectif quotidien, série, atlas de maîtrise. |
| **Apprendre** | Le sommaire des leçons, rangées comme les commandes d’impeccable : fondations, psychologie et éthique, enrichir, affiner, corriger, évaluer, construire, cultures. Chaque leçon a ses exemples « À éviter / Préférer », ses règles d’or et ses sources. |
| **S’entraîner** | Session du jour, révisions espacées, mes erreurs, fiches, entraînement par format ou par leçon, examen blanc. |
| **Cultures** | Profils de 12 marchés (conventions, à faire / à éviter, formats, dimensions de Hofstede), comparateur de deux marchés, vues côte à côte du même composant, labo de localisation (API `Intl`). |
| **Ressources** | Aide-mémoire chiffré, catalogue des 62 anti-patterns, heuristiques de Nielsen et personas, commandes impeccable, glossaire, sources. |
| **Progression** | Niveau, activité, maîtrise par leçon, badges, historique, réglages, export / import des données. |

## Les formats d’épreuve

- **Comparaison visuelle** : deux à quatre maquettes, choisir celle qu’un expert recommanderait.
- **Chasse aux erreurs** : cliquer sur les défauts d’une maquette ; la correction les entoure
  comme un correcteur sur une épreuve d’imprimerie.
- **Calibrage** : régler un interlignage, un contraste (ratio WCAG calculé en direct), une durée
  d’animation, un espacement, puis comparer à la valeur experte.
- **Le bon choix** et **Tout ce qui s’applique** : situations et solutions.
- **Vrai ou faux**, **Mise en ordre**, **Associations**.
- **Grille de critique** : noter un écran sur les 10 heuristiques de Nielsen et comparer sa
  grille à celle d’un expert.
- **Fiches de révision** : les règles d’or de chaque leçon, en répétition espacée (SM-2).

Une épreuve ratée revient en révision le jour même ; chaque réussite espace la suivante, selon
des boîtes de Leitner (1, 3, 7, 16, 35, 90 jours). Tout est utilisable au clavier (1–6 pour
choisir, Entrée pour valider, actifs quand le focus est dans l’épreuve) et au pouce.

## Lancer le projet

```bash
npm install
npm run dev              # serveur de développement
npm test                 # tests du moteur, de l’app et validation de tout le contenu
npm run build            # vérification des types + build de production dans dist/
npm run validate         # types + validation du contenu seulement
npm run check:overflow   # aucune page ni épreuve à choix visuel (question puis correction) ne
                         # défile horizontalement à 320, 360 et 390 px ; puis, texte du navigateur
                         # agrandi à 20, 24 et 32 px (de 320 à 768 px, à la souris) : pages, deux
                         # épreuves de chaque format avant et après « Valider », défi chrono, fiches,
                         # sans plus de trois fins de ligne coupées de suite
                         # (-- --texte : cette passe seule ; -- --sans-texte : sans elle)
npm run check:mocks      # maquettes : texte coupé, superposé, trop petit ou trop pâle
npm run shots -- <id>    # captures de chaque exemple et épreuve d’un module (--mobile, --dark)
```

Node 20.19+ ou 22.12+. Le fichier `.npmrc` active `legacy-peer-deps` (nécessaire avec npm 10
pour certaines dépendances optionnelles de Vite 8).

## Déploiement

Le workflow `.github/workflows/deploy.yml` publie le site sur **GitHub Pages** à chaque push
sur `main`. Pour l’activer : *Settings → Pages → Build and deployment → Source : GitHub
Actions*. Le routage par hash (`#/apprendre/…`) et la base relative font fonctionner l’app
depuis n’importe quel sous-dossier. La progression est stockée dans le navigateur
(`localStorage`) : aucun serveur, aucun compte.

L’app fonctionne hors ligne : à la première visite, le service worker (`src/sw.js`, complété
au build avec la liste des fichiers) met tout en cache ; chaque déploiement installe sa propre
version et nettoie les anciennes. Les leçons se chargent à la demande à partir d’un index léger,
si bien que la première page reste légère malgré les 24 leçons et leurs centaines de maquettes.

## Organisation du code

```
src/
  engine/       moteur d’entraînement, sans dépendance à React (types, correction, Leitner, SM-2,
                progression, sessions, badges) + tests
  content/      tout le contenu, en données typées ; index.ts charge chaque leçon à la demande
    modules/    une leçon et ses épreuves par fichier
    cultures/   profils de marchés, comparaisons, labo de localisation
    antipatterns.ts, resources.ts, sources.ts, detectorRules.ts
    validate.ts + content.test.ts   validation automatique du contenu
  components/   rendu des maquettes en Shadow DOM isolé (Mock), lecteurs d’épreuves, correction
  pages/        les écrans
  styles/       jetons de design (OKLCH, clair / sombre), base, composants
scripts/        plugins de build (index du contenu, service worker), contrôles visuels (shots,
                check:mocks, check:overflow), icônes des maquettes
src/sw.js       service worker (cache hors ligne)
docs/CONTENU.md guide pour écrire de nouvelles leçons et épreuves
```

## Ajouter du contenu

Lis [`docs/CONTENU.md`](docs/CONTENU.md). En bref : crée ou complète un fichier dans
`src/content/modules/`, lance `npm run validate`, puis `npm run shots -- <module>` pour
vérifier chaque maquette à l’œil et `npm run check:mocks -- <module>` pour repérer ce qui
déborde, sur bureau comme sur mobile.

## Crédits et licences

Voir [`NOTICE.md`](NOTICE.md). Contenu adapté d’impeccable (Apache-2.0, copie de la licence
dans `LICENSES/`), icônes Lucide (ISC), polices Schibsted Grotesk et Atkinson Hyperlegible
Mono (SIL OFL).
