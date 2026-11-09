# Épreuves — atelier UI/UX

Une application web pour **devenir meilleur en UI/UX** par la pratique : des leçons courtes,
puis des épreuves corrigées avec **le choix recommandé, le pourquoi et la règle à retenir**.

Le contenu reprend les références de design du projet open source
[impeccable](https://github.com/pbakaus/impeccable) (Paul Bakaus, Apache-2.0) — modes de
visite, plancher de qualité, typographie, couleur, espace, mouvement, rédaction UX,
robustesse, critique heuristique, personas, audit et les 62 règles de son détecteur
d’anti-patterns — enrichies de sources web reconnues (Nielsen Norman Group, WCAG 2.2, Laws of
UX, Deceptive Patterns, Material, Apple HIG, web.dev, MDN, CNIL…). Deux leçons portent sur le
**RGAA**, le référentiel français d’accessibilité. Un volet **Cultures** enseigne les
différences d’interface entre pays (Occident, Chine, Japon, Corée, Inde, monde arabe,
Brésil…) et comment s’y adapter.

L’app s’utilise sur ordinateur comme sur téléphone : dans le navigateur, où elle s’installe
aussi comme une application et fonctionne hors ligne, sous Windows avec un exécutable, et sur
Android avec une APK qui se met à jour depuis GitHub.

## Lancer l’app sur Windows

Téléchargez **[Epreuves.exe](https://github.com/JRRocks/Learn-UI-UX/releases/latest/download/Epreuves.exe)**
et double-cliquez dessus : l’app s’ouvre dans sa propre fenêtre, sans installation ni connexion.
Elle s’arrête quand on ferme la fenêtre, et la progression est retrouvée au lancement suivant.

- Au premier lancement, Windows peut afficher « Windows a protégé votre ordinateur », car
  l’exécutable n’est pas signé : **Informations complémentaires**, puis **Exécuter quand même**.
- La fenêtre est celle d’Edge, de Chrome, de Brave ou de Vivaldi en mode application, sur un
  profil à part (`%LOCALAPPDATA%\Epreuves`) qui garde la progression. Sans aucun de ces
  navigateurs, l’app s’ouvre dans le navigateur par défaut.
- Le fichier tient tout seul (1 Mo) : on peut le ranger n’importe où, l’épingler à la barre des
  tâches ou le copier sur une clé USB.

## Sur un téléphone Android

Depuis le téléphone, téléchargez
**[Epreuves.apk](https://github.com/JRRocks/Learn-UI-UX/releases/download/android/Epreuves.apk)**
(4 Mo) et ouvrez-le : Android propose de l’installer. L’app fonctionne hors connexion.

- La première fois, Android demande d’autoriser l’installation depuis le navigateur (ou l’app
  Fichiers) : **Paramètres**, puis **Autoriser cette source**. Play Protect peut signaler une app
  inconnue : **Plus de détails**, puis **Installer quand même**.
- Une nouvelle version s’installe par-dessus l’ancienne et garde la progression. Désinstaller
  l’app l’efface : **Progression → Exporter ma progression** la sauvegarde avant (Fichiers, Drive,
  envoi au PC…), **Importer une sauvegarde** la rétablit, d’un appareil à l’autre aussi.
- Vérifiée aux formats du Galaxy S25 (360 × 780 px CSS) et du S25 Ultra (412 × 891 px CSS) :
  barres système, encoche, navigation par gestes ou à trois boutons, police du téléphone agrandie,
  thème clair ou sombre.

## Les pages

Sur ordinateur, un rail les range par usage : **Accueil**, puis *Apprendre* (Leçons, Cultures,
Ressources) et *Progresser* (S’entraîner, Progression). Sur téléphone, la barre d’onglets garde
Accueil, Leçons, S’entraîner, Cultures et Progression ; le bouton **Menu** ouvre le plan complet.

| Page | Contenu |
|---|---|
| **Accueil** | Session du jour, révisions et fiches dues, objectif quotidien, série, atlas de maîtrise. |
| **Leçons** | Les leçons rangées en huit grands thèmes : les fondamentaux ; psychologie et éthique ; design visuel ; parcours et contenus ; écrans et plateformes ; accessibilité et RGAA ; méthode (cadrer et évaluer) ; cultures. Chaque thème se travaille (**S’entraîner**) ou s’évalue (**S’évaluer** : 20 épreuves corrigées à la fin, score par leçon). Chaque leçon a ses exemples « À éviter / Préférer », ses règles d’or et ses sources. |
| **S’entraîner** | Session du jour, révisions espacées, mes erreurs, fiches ; puis par thème, par pays (la France, puis les pays étrangers région par région, et les notions communes), par leçon, par format ; défi chrono et examen blanc. |
| **Cultures** | Profils de 12 marchés (conventions, à faire / à éviter, formats, dimensions de Hofstede), questionnaires pays par pays, comparateur de deux marchés, vues côte à côte du même composant, labo de localisation (API `Intl`). |
| **Ressources** | Aide-mémoire chiffré, catalogue des 62 anti-patterns, heuristiques de Nielsen et personas, commandes impeccable, glossaire, sources. |
| **Progression** | Niveau, activité, maîtrise par leçon, badges, historique, réglages, export / import des données. |

## Les formats d’épreuve

- **Mise en situation** : une vraie page, un questionnaire ou un écran d’appli Android, et
  plusieurs curseurs pour en régler les tailles, les espacements et les couleurs ; l’écran est
  ensuite évalué critère par critère (cible de 44 px, contraste de 4,5:1, espace de 8 dp…),
  avec la version experte à comparer.
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
                         # épreuves de chaque format et toutes celles qui portent une unité en toutes
                         # lettres, avant et après « Valider », puis leur bilan, défi chrono, fiches ;
                         # partout, sans plus de trois fins de ligne coupées de suite,
                         # ni mot d’un libellé (élément à ordonner, option, bouton, badge, titre, bilan…)
                         # ni unité en toutes lettres coupés sans trait d’union, ni nombre séparé de son
                         # unité en fin de ligne
                         # (-- --texte : cette passe seule ; -- --sans-texte : sans elle)
npm run check:mocks      # maquettes : texte coupé, superposé, trop petit ou trop pâle
npm run shots -- <id>    # captures de chaque exemple et épreuve d’un module (--mobile, --dark)
npm run exe              # Windows : build puis release/Epreuves.exe, l’app en un seul exécutable
                         # (desktop/ ; le workflow « Application Windows » le publie à chaque push sur main)
npm run apk              # Windows avec Android Studio (JAVA_HOME sur son jbr) : build, Capacitor, puis
                         # android/app/build/outputs/apk/release/app-release.apk, signé par la clé décrite
                         # dans android/keystore.properties, hors du dépôt (« Application Android » publie
                         # l’APK à chaque push sur main avec les secrets ANDROID_KEYSTORE*)
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
si bien que la première page reste légère malgré les 26 leçons et leurs centaines de maquettes.

## Organisation du code

```
src/
  engine/       moteur d’entraînement, sans dépendance à React (types, correction, Leitner, SM-2,
                progression, sessions, badges) + tests
  content/      tout le contenu, en données typées ; index.ts charge chaque leçon à la demande
    order.ts    les grands thèmes et l’ordre des leçons
    modules/    une leçon et ses épreuves par fichier
    cultures/   profils de marchés, comparaisons, labo de localisation
    antipatterns.ts, resources.ts, sources.ts, detectorRules.ts
    validate.ts + content.test.ts   validation automatique du contenu
  components/   rendu des maquettes en Shadow DOM isolé (Mock), lecteurs d’épreuves, correction
  pages/        les écrans
  styles/       jetons de design (OKLCH, clair / sombre), base, composants
scripts/        plugins de build (index du contenu, service worker), contrôles visuels (shots,
                check:mocks, check:overflow), icônes des maquettes, icônes de l’app (npm run icons)
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
