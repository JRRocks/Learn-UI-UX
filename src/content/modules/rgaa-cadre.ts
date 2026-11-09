import type { ModuleContent, SourceRef, Visual } from '../../engine/types';

const RGAA = 'https://accessibilite.numerique.gouv.fr/';

const SCOPE: SourceRef = { label: 'DINUM — RGAA 4.1.2, Rappel du champ d’application', url: `${RGAA}obligations/champ-application/` };
const EVALUATION: SourceRef = { label: 'DINUM — RGAA 4.1.2, Évaluation de la conformité à la norme de référence', url: `${RGAA}obligations/evaluation-conformite/` };
const DECLARATION: SourceRef = { label: 'DINUM — RGAA 4.1.2, Déclaration d’accessibilité', url: `${RGAA}obligations/declaration-accessibilite/` };
const MENTIONS: SourceRef = { label: 'DINUM — RGAA 4.1.2, Mentions et pages obligatoires', url: `${RGAA}obligations/mentions-et-pages-obligatoires/` };
const SCHEMA: SourceRef = { label: 'DINUM — RGAA 4.1.2, Schéma pluriannuel de mise en accessibilité', url: `${RGAA}obligations/schema-pluriannuel/` };
const METHOD: SourceRef = { label: 'DINUM — RGAA 4.1.2, Méthode technique : introduction', url: `${RGAA}methode/introduction/` };
const TEST_ENV: SourceRef = { label: 'DINUM — RGAA 4.1.2, Environnement de test', url: `${RGAA}methode/environnement-de-test/` };
const AUDIT_KIT: SourceRef = { label: 'DINUM — RGAA 4.1.2, Kit d’audit (grille d’évaluation, outil Ara)', url: `${RGAA}ressources/kit-audit/` };
const RGAA5: SourceRef = { label: 'DesignGouv (DINUM) — Nouvelle version du RGAA (mars 2026)', url: 'https://design.numerique.gouv.fr/articles/2026-03-02-rgaa5/' };
const LAW_47: SourceRef = { label: 'Légifrance — Loi n° 2005-102 du 11 février 2005, article 47', url: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037388867' };
const LAW_47_1: SourceRef = { label: 'Légifrance — Loi n° 2005-102 du 11 février 2005, article 47-1 (contrôle par l’Arcom)', url: 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000048050174' };
const DECREE: SourceRef = { label: 'Légifrance — Décret n° 2019-768 du 24 juillet 2019, version en vigueur', url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038811937/' };
const ARCOM: SourceRef = {
  label: 'Arcom — Accessibilité des sites et des services numériques',
  url: 'https://www.arcom.fr/nous-connaitre/nos-missions/garantir-le-pluralisme-et-la-cohesion-sociale/les-droits-des-personnes-handicapees/accessibilite-des-sites-et-des-services-numeriques',
};
const EAA: SourceRef = { label: 'EUR-Lex — Directive (UE) 2019/882, Acte européen sur l’accessibilité', url: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj' };
const EAA_FR: SourceRef = { label: 'Légifrance — Loi n° 2023-171 du 9 mars 2023, article 16 (accessibilité des produits et des services)', url: 'https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000047281814' };
const EAA_DECREE: SourceRef = { label: 'Légifrance — Code de la consommation, article D412-57 (décret n° 2023-931 du 9 octobre 2023)', url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048180389' };
const WCAG22_NEW: SourceRef = { label: 'W3C WAI — What’s New in WCAG 2.2', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/', lang: 'en' };
const DDD: SourceRef = { label: 'Défenseur des droits — Nous contacter', url: 'https://www.defenseurdesdroits.fr/nous-contacter-355' };

/** Pied de page de la page d’accueil d’une agglomération, avec une mention d’accessibilité donnée. */
const FOOTER_CSS = `.ft { padding: 18px 18px 16px; background: #f4f6f9; border-top: 1px solid #e1e4ea; }
.ft-brand { font-size: 15px; font-weight: 700; }
.ft-brand span { font-weight: 400; color: #5a6172; }
.ft-addr { margin-top: 2px; font-size: 12px; color: #5a6172; }
.ft-links { display: flex; flex-wrap: wrap; gap: 6px 16px; margin: 12px 0 0; padding: 0; list-style: none; font-size: 13px; }
.ft-links li { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }
.ft-copy { margin-top: 12px; font-size: 12px; color: #5a6172; }`;

const footer = (mention: string): Visual => ({
  alt: `Pied de page de la page d’accueil de Mirelac Agglomération : adresse, puis les liens Mentions légales, Données personnelles, Plan du site et « ${mention} ».`,
  css: FOOTER_CSS,
  html: `<div class="ft"><p class="ft-brand">Mirelac <span>Agglomération</span></p><p class="ft-addr">Hôtel d’agglomération · 2 place du Lac</p><ul class="ft-links"><li>Mentions légales</li><li>Données personnelles</li><li>Plan du site</li><li>${mention}</li></ul><p class="ft-copy">© 2026 Mirelac Agglomération</p></div>`,
});

/** Page « Accessibilité » d’un site, en miniature lisible. */
const DECL_CSS = `.dc { padding: 16px 18px 20px; }
.dc-crumb { font-size: 12px; color: #5a6172; }
.dc-title { margin-top: 6px; font-size: 20px; line-height: 1.2; font-weight: 700; }
.dc-sec { margin-top: 12px; }
.dc-h { font-size: 13px; font-weight: 700; }
.dc-p { margin-top: 2px; font-size: 13px; line-height: 1.5; }
.dc-lead { margin-top: 10px; }
.dc-a { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }
.dc-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; padding: 6px 12px; border-radius: 999px; background: #e6f4ea; color: #1e6b34; font-size: 13px; font-weight: 700; }`;

/** Échantillon d’audit présenté comme une fiche de plan d’audit. */
const SAMPLE_CSS = `.sp { padding: 16px; }
.sp-h { font-size: 15px; font-weight: 700; }
.sp-sub { margin-top: 2px; font-size: 12px; color: #5a6172; }
.sp-g { margin-top: 12px; font-size: 12px; font-weight: 700; color: #36405a; }
.sp-l { margin: 4px 0 0; padding: 0; list-style: none; }
.sp-l li { padding: 6px 0; border-bottom: 1px solid #eceef2; font-size: 13px; line-height: 1.45; }`;

/** Rubrique « Dérogations » d’une déclaration d’accessibilité. */
const DEROG_CSS = `.dg { padding: 16px; }
.dg-h { font-size: 15px; font-weight: 700; }
.dg-item { margin-top: 10px; padding: 12px 14px; border-radius: 10px; background: #f4f6f9; }
.dg-t { font-size: 13px; font-weight: 700; }
.dg-p { margin-top: 4px; font-size: 13px; line-height: 1.5; }
.dg-k { font-weight: 700; }`;

/** Écran « À propos » d’une application mobile de transports, avec ou sans état de conformité. */
const aboutScreen = (withMention: boolean): Visual => ({
  frame: 'phone',
  alt: withMention
    ? 'Écran « À propos » de l’application Mirelac Mobilités : version 4.2.0, puis les lignes Conditions d’utilisation, Données personnelles, « Accessibilité : partiellement conforme » et Nous contacter.'
    : 'Écran « À propos » de l’application Mirelac Mobilités : version 4.2.0, puis les lignes Conditions d’utilisation, Données personnelles et Nous contacter.',
  css: `.ap-bar { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #e3e6ec; }
.ap-title { font-size: 16px; font-weight: 700; }
.ap-app { display: flex; align-items: center; gap: 12px; padding: 16px; }
.ap-logo { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: #1b3a6b; color: #ffffff; }
.ap-list { margin: 0; padding: 0 16px 12px; list-style: none; }
.ap-list li { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 0; border-top: 1px solid #eceef2; font-size: 14px; }
.ap-list li i { color: #5a6172; }`,
  html: `<div class="ap-bar"><i data-icon="arrow-left" style="--ico:20px"></i><p class="ap-title">À propos</p></div><div class="ap-app"><span class="ap-logo"><i data-icon="bus" style="--ico:22px"></i></span><div><p class="mk-strong">Mirelac Mobilités</p><p class="mk-small mk-muted">Version 4.2.0</p></div></div><ul class="ap-list"><li><span>Conditions d’utilisation</span><i data-icon="chevron-right" style="--ico:16px"></i></li><li><span>Données personnelles</span><i data-icon="chevron-right" style="--ico:16px"></i></li>${withMention ? '<li><span>Accessibilité : partiellement conforme</span><i data-icon="chevron-right" style="--ico:16px"></i></li>' : ''}<li><span>Nous contacter</span><i data-icon="chevron-right" style="--ico:16px"></i></li></ul>`,
});

/** Rubrique « Résultats des tests » d’une déclaration. */
const results = (text: string, alt: string): Visual => ({
  alt,
  css: `.rs { padding: 16px; }
.rs-h { font-size: 15px; font-weight: 700; }
.rs-p { margin-top: 6px; font-size: 14px; line-height: 1.55; }`,
  html: `<div class="rs"><p class="rs-h">Résultats des tests</p><p class="rs-p">${text}</p></div>`,
});

const rgaaCadre: ModuleContent = {
  id: 'rgaa-cadre',
  title: 'Le RGAA : obligations, audit et déclaration',
  summary:
    'Savoir qui doit appliquer le RGAA 4.1.2 et ce que la loi impose — mention, déclaration, schéma pluriannuel, sanctions —, puis mener un audit : échantillon, environnement de test, statuts C, NC, NA et taux de conformité.',
  minutes: 14,
  sources: [LAW_47, LAW_47_1, DECREE, SCOPE, EVALUATION, DECLARATION, MENTIONS, SCHEMA, METHOD, TEST_ENV, AUDIT_KIT, RGAA5, ARCOM, EAA, EAA_FR, EAA_DECREE, WCAG22_NEW],
  sections: [
    {
      id: 'referentiel',
      title: 'Un référentiel, 106 critères',
      body: `Le **RGAA** (référentiel général d’amélioration de l’accessibilité) est édité par la DINUM, la direction interministérielle du numérique. Il traduit une norme en méthode de vérification : un service qui respecte la norme européenne **EN 301 549 V2.1.2** (2018) est conforme à la loi, et cette norme reprend les **50 critères de succès des niveaux A et AA des WCAG 2.1**. Le RGAA dit comment la vérifier, page par page.

- **Version en vigueur : 4.1.2.** La DINUM rédige le RGAA 5, dont la publication est prévue fin 2026 ; elle demande de ne suspendre ni reporter aucun travail en l’attendant.
- **13 thématiques, 106 critères** : images, cadres, couleurs, multimédia, tableaux, liens, scripts, éléments obligatoires, structuration, présentation, formulaires, navigation, consultation.
- Chaque critère est une **question fermée** (« Chaque champ de formulaire a-t-il une étiquette ? »), vérifiée par des **tests** numérotés, 2,5 en moyenne par critère. Chaque test a sa méthodologie, ses cas particuliers et ses correspondances avec les WCAG et la norme EN 301 549.
- Le **glossaire** fait partie du référentiel : « contexte du lien », « titre », « image de décoration »… Un test se lit avec ses définitions.

Ce que le RGAA 4.1.2 ne couvre pas, ou pas encore :

- **Les ajouts des WCAG 2.2** : focus non masqué (2.4.11), mouvements de glissement (2.5.7), taille des cibles (2.5.8), aide cohérente (3.2.6), saisie redondante (3.3.7), authentification accessible (3.3.8). Ce ne sont pas des critères du RGAA 4.1.2 ; selon la DINUM, le RGAA 5 intégrera les WCAG 2.2. À l’inverse, le RGAA vérifie encore la validité du code (critère 8.2, lié au critère 4.1.1 que les WCAG 2.2 ont retiré).
- **Les applications mobiles natives**, les progiciels et le mobilier urbain numérique : la méthode technique du RGAA 4.1 ne les couvre pas ; on y vérifie directement la norme EN 301 549.`,
    },
    {
      id: 'concernes',
      title: 'Qui doit s’y conformer, qui contrôle',
      body: `L’obligation vient de l’**article 47 de la loi n° 2005-102 du 11 février 2005**. Elle vise les services de communication au public en ligne — sites internet, intranets, extranets, applications mobiles, progiciels utilisés par un navigateur ou une application, mobilier urbain numérique — de quatre catégories d’organismes :

1. les personnes morales de droit public : État, collectivités, établissements publics ;
2. les organismes privés délégataires d’une mission de service public, ou créés pour un besoin d’intérêt général et majoritairement financés, contrôlés ou dirigés par des personnes publiques ;
3. les organismes privés créés par les précédents pour un besoin d’intérêt général ;
4. les **entreprises de plus de 250 millions d’euros de chiffre d’affaires** en France, en moyenne sur les trois derniers exercices (décret n° 2019-768, article 2).

En sont exclus les fournisseurs de services de médias audiovisuels, et les organismes privés à but non lucratif qui ne fournissent ni service essentiel au public, ni service destiné aux personnes handicapées.

### Le contrôle
Depuis l’ordonnance du 6 septembre 2023, c’est l’**Arcom** qui contrôle (article 47-1 de la loi). Après un manquement relevé par ses agents assermentés, elle met en demeure, **publiquement**, puis peut sanctionner :

- jusqu’à **50 000 €** pour le non-respect des exigences d’accessibilité elles-mêmes ;
- jusqu’à **25 000 €** pour les autres obligations : mention, déclaration, schéma pluriannuel, plan d’actions, moyen de signalement ;
- de nouveau, si le même manquement perdure **six mois** après la première sanction.

Pour les entreprises du 4°, l’Arcom ne contrôle que ces obligations d’affichage, pas la conformité au RGAA. L’amende ministérielle que prévoyait le décret de 2019 (20 000 €, 2 000 € pour les communes de moins de 5 000 habitants) a été abrogée par le décret n° 2026-816 du 24 août 2026.

### Depuis le 28 juin 2025, un second régime
L’**Acte européen sur l’accessibilité** (directive (UE) 2019/882), transposé par l’article 16 de la loi n° 2023-171 du 9 mars 2023 et le décret n° 2023-931 du 9 octobre 2023, s’applique, à partir du 28 juin 2025, aux services fournis et aux produits mis sur le marché : commerce en ligne, services bancaires aux consommateurs, livres numériques, communications électroniques, transport de voyageurs, accès aux services de médias audiovisuels, et des produits comme les ordinateurs, les liseuses ou les terminaux en libre-service.

- Il vise les entreprises **quelle que soit leur taille**, sauf les **microentreprises** qui fournissent des services : moins de 10 personnes, et un chiffre d’affaires ou un bilan annuel d’au plus 2 millions d’euros.
- Le prestataire publie des informations qui expliquent comment son service répond aux exigences d’accessibilité.

Il ne remplace pas l’article 47 : une boutique en ligne de 60 millions d’euros de chiffre d’affaires n’a ni mention ni déclaration RGAA à publier, mais l’Acte européen lui impose d’être accessible.`,
    },
    {
      id: 'publier',
      title: 'Ce que le site doit publier',
      body: `L’article 47 impose quatre éléments, que le RGAA précise :

- **Une mention sur la page d’accueil**, l’une des trois formules exactes : « Accessibilité : totalement conforme » (tous les critères respectés), « Accessibilité : partiellement conforme » (au moins 50 %), « Accessibilité : non conforme » (moins de 50 %, ou aucun audit en cours de validité). Elle peut être un lien vers la page Accessibilité.
- **Une page « Accessibilité »**, atteignable depuis la page d’accueil et depuis n’importe quelle page ; le RGAA recommande une adresse en \`/accessibilite\`. Elle contient la déclaration, le schéma pluriannuel et le plan d’actions de l’année, ou des liens vers eux.
- **La déclaration d’accessibilité**, selon un modèle imposé : état de conformité, résultats des tests, contenus non accessibles (non-conformités, dérogations, contenus non soumis), date, technologies utilisées, environnement de test, pages vérifiées, **moyen de contact** (adresse électronique ou formulaire) et **voies de recours** vers le Défenseur des droits.
- **Le schéma pluriannuel**, de trois ans au plus : stratégie, référent accessibilité, moyens humains et financiers, formation, clauses dans les marchés, audits prévus. Il se décline en **plans d’actions annuels**.

Pour une application mobile, la déclaration figure sur le site de l’organisme ou avec les informations de téléchargement, et l’état de conformité est indiqué dans l’application.

La déclaration se met à jour à chaque refonte ou modification substantielle, et au plus tard trois ans après sa publication ; pour qui applique la méthode technique, aussi dans les dix-huit mois qui suivent une nouvelle version du référentiel.

Quand une personne signale un défaut, l’organisme accuse réception et répond sous une semaine, ou motive un délai plus long pour une question complexe.`,
      examples: [
        {
          title: 'L’état de conformité dans l’application',
          bad: aboutScreen(false),
          badNote: 'Rien dans l’application ne dit où elle en est : il faudrait aller chercher la déclaration sur un site.',
          good: aboutScreen(true),
          goodNote: 'L’état de conformité est indiqué dans l’application et mène à la déclaration.',
        },
      ],
    },
    {
      id: 'audit',
      title: 'L’audit : échantillon et environnement de test',
      body: `L’audit peut être mené par l’organisme lui-même ou par un tiers ; c’est à l’organisme d’en garantir la fiabilité (prestataire, experts internes formés, audits croisés). La DINUM fournit une grille d’audit et Ara, un outil d’aide à l’audit. Ara n’est pas un test automatique : il faut connaître les 106 critères.

### L’échantillon
Il comprend au moins ces pages, quand elles existent :

- accueil, contact, mentions légales, accessibilité, plan du site, aide, authentification ;
- au moins une page par type de service et par usage principal, **recherche** comprise ;
- au moins un **document téléchargeable** pertinent ;
- **toutes les pages d’un processus** (formulaire en plusieurs étapes, paiement) ;
- des pages d’aspect ou de contenu différents (tableaux de données, vidéos, formulaires) ;
- et des pages **tirées au hasard**, au moins 10 % de l’échantillon.

Les écrans d’une application mobile comptent comme des pages.

### L’environnement de test
Certains critères, ceux des scripts notamment, se vérifient avec des technologies d’assistance. Le RGAA fixe des combinaisons de référence :

- **sur ordinateur** : NVDA (dernière version) et JAWS (version précédente) avec Firefox sous Windows, VoiceOver avec Safari sous macOS ;
- **sur mobile** : TalkBack avec Chrome sous Android, ou VoiceOver avec Safari sous iOS ; pour un site grand public, le RGAA conseille fortement de tester les deux.

Un composant est « compatible avec l’accessibilité » s’il fonctionne pleinement, restitution comprise, sur une combinaison de référence.

Pour un public dont l’équipement est maîtrisé (un intranet, par exemple), on teste sur les configurations réellement utilisées.`,
    },
    {
      id: 'statuts',
      title: 'Tester une page : C, NC, NA',
      body: `Chaque page de l’échantillon est vérifiée sur les critères qui lui sont applicables. La grille d’audit de la DINUM note chaque critère, page par page :

- **C, conforme** : tous les éléments de la page concernés passent les tests du critère ;
- **NC, non conforme** : il suffit d’**un seul élément** en échec ;
- **NA, non applicable** : rien dans la page n’est concerné, ou le seul contenu concerné est exempté, ou il fait l’objet d’une dérogation et propose une alternative accessible ;
- **NT, non testé** : un état provisoire, le temps de l’audit.

Dans un **processus** (démarche, paiement), un critère n’est conforme pour une page que s’il l’est pour toutes les pages du processus.

### Exemptions et dérogations
Certains contenus sont **exemptés** : documents bureautiques publiés avant le 23 septembre 2018 (sauf s’ils servent à une démarche), audio et vidéo préenregistrés publiés avant le 23 septembre 2020, contenus en direct, cartes (si l’information essentielle est fournie sous une forme accessible), contenus de tiers ni financés, ni développés, ni contrôlés par l’organisme, archives non modifiées depuis le 23 septembre 2019…

La **dérogation pour charge disproportionnée** est autre chose. Elle s’invoque au cas par cas, pour un contenu ou une fonctionnalité : jamais pour un critère, et sauf exception justifiée jamais pour tout un service. Le manque de temps, de priorité ou de connaissances ne la justifie pas. Elle figure dans la déclaration, motivée, avec sa durée et, le cas échéant, une alternative accessible ; pour une mission principale de service public, l’alternative est obligatoire. Sans alternative, les critères restent applicables.`,
    },
    {
      id: 'taux',
      title: 'Calculer le taux de conformité',
      body: `Le chiffre qui fixe la mention est le **pourcentage de critères respectés** sur l’ensemble de l’échantillon :

- un critère est **applicable** s’il l’est sur au moins une page ;
- il est **respecté** s’il n’est non conforme sur aucune page ;
- pourcentage = critères respectés ÷ critères applicables.

Exemple : 70 critères applicables, dont 56 respectés partout : 56 ÷ 70 = **80 %**, donc « partiellement conforme ». Un critère en échec sur une seule page ne compte plus comme respecté. Le dénominateur n’est jamais 106 : les critères non applicables sur toutes les pages sortent du calcul.

Le **taux moyen**, moyenne des taux de conformité de chaque page, est facultatif dans la déclaration. Il est souvent plus flatteur : un critère en échec sur une page ne fait baisser que le taux de cette page. Il complète le pourcentage de critères respectés, il ne le remplace jamais.`,
      examples: [
        {
          title: 'Le bon chiffre dans la déclaration',
          bad: results(
            'L’audit réalisé en interne en mars 2026 révèle un taux de conformité de 94 %.',
            'Rubrique « Résultats des tests » d’une déclaration : l’audit de mars 2026 révèle un taux de conformité de 94 %.',
          ),
          badNote: 'Ce 94 % est le taux moyen des pages : il ne dit pas combien de critères sont respectés sur tout le site.',
          good: results(
            'L’audit réalisé en interne en mars 2026 révèle que 62 % des critères RGAA sont respectés. Le taux moyen de conformité du service en ligne s’élève à 94 %.',
            'Rubrique « Résultats des tests » d’une déclaration : 62 % des critères RGAA sont respectés ; le taux moyen de conformité s’élève à 94 %.',
          ),
          goodNote: 'Le pourcentage de critères respectés d’abord, comme le veut le modèle ; le taux moyen, facultatif, le complète.',
        },
      ],
    },
  ],
  rules: [
    { id: 'size', front: 'Combien de critères et de thématiques compte le RGAA 4.1.2 ?', back: '106 critères répartis en 13 thématiques, vérifiés par des tests : 2,5 en moyenne par critère.' },
    { id: 'norm', front: 'Sur quelle norme repose le RGAA 4.1.2 ?', back: 'Sur la norme européenne EN 301 549 V2.1.2, qui reprend les 50 critères de succès A et AA des WCAG 2.1. Les ajouts des WCAG 2.2 n’en font pas partie.' },
    { id: 'who', front: 'Qui doit respecter l’article 47 de la loi de 2005 ?', back: 'Les organismes publics, les organismes privés chargés d’une mission de service public ou d’intérêt général, et les entreprises de plus de 250 millions d’euros de chiffre d’affaires en France.' },
    { id: 'mention', front: 'Quelles mentions possibles sur la page d’accueil ?', back: '« Accessibilité : totalement conforme » (100 %), « partiellement conforme » (au moins 50 %) ou « non conforme » (moins de 50 %, ou pas d’audit valide).' },
    { id: 'declaration', front: 'Que contient une déclaration d’accessibilité ?', back: 'L’état de conformité et les résultats de l’audit, les contenus non accessibles, l’environnement de test, un contact pour signaler un défaut et la voie de recours vers le Défenseur des droits.' },
    { id: 'validity', front: 'Quand mettre à jour la déclaration ?', back: 'À chaque refonte ou modification substantielle, et au plus tard trois ans après sa publication ; dans les dix-huit mois qui suivent une nouvelle version du référentiel.' },
    { id: 'schema', front: 'Qu’est-ce que le schéma pluriannuel ?', back: 'La politique d’accessibilité de l’organisme sur trois ans au plus (référent, moyens, formation, audits), déclinée en plans d’actions annuels publiés.' },
    { id: 'sample', front: 'Quelles pages entrent dans l’échantillon d’audit ?', back: 'Accueil, contact, mentions légales, accessibilité, plan du site, aide, authentification, une page par service, les processus complets, un document, et au moins 10 % de pages tirées au hasard.' },
    { id: 'status', front: 'Quand un critère est-il non conforme sur une page ?', back: 'Dès qu’un seul élément de la page échoue à ses tests. Dans un processus, il n’est conforme que s’il l’est sur toutes les pages du processus.' },
    { id: 'na', front: 'Quand un critère est-il non applicable ?', back: 'Quand rien dans la page n’est concerné, quand le seul contenu concerné est exempté, ou quand il est dérogé avec une alternative accessible.' },
    { id: 'rate', front: 'Comment calculer le pourcentage de critères respectés ?', back: 'Critères respectés sur toutes les pages ÷ critères applicables sur au moins une page. Jamais ÷ 106.' },
    { id: 'derogation', front: 'Que vaut une dérogation pour charge disproportionnée ?', back: 'Elle porte sur un contenu, jamais sur un critère ; le manque de temps ou de connaissances ne la justifie pas. Elle est motivée et datée dans la déclaration, avec une alternative accessible.' },
    { id: 'sanctions', front: 'Quelles sanctions peut prononcer l’Arcom ?', back: 'Après une mise en demeure publique : jusqu’à 50 000 € pour les exigences d’accessibilité, 25 000 € pour les obligations d’affichage, et de nouveau si le manquement dure six mois.' },
    { id: 'eaa', front: 'Que change l’Acte européen sur l’accessibilité depuis le 28 juin 2025 ?', back: 'Des services privés — commerce en ligne, banque, transport, livres numériques… — doivent être accessibles quelle que soit la taille de l’entreprise, sauf les microentreprises de services.' },
  ],
  exercises: [
    {
      id: 'rgaa-cadre-mention-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel pied de page de la page d’accueil affiche la mention exigée ?',
      context: 'L’audit RGAA de Mirelac Agglomération vient d’être publié : 62 % des critères sont respectés.',
      options: [
        { id: 'partial', visual: footer('Accessibilité : partiellement conforme'), why: 'C’est la formule prévue dès que 50 % au moins des critères sont respectés, sans les atteindre tous.' },
        { id: 'non', visual: footer('Accessibilité : non conforme'), why: '« Non conforme » vaut sous 50 % de critères respectés, ou sans audit valide : 62 % donne « partiellement conforme ».' },
        { id: 'percent', visual: footer('Accessibilité : conforme à 62 %'), why: 'Le chiffre est juste, mais la formule n’existe pas : la mention est l’une des trois formules du RGAA ; le pourcentage, lui, va dans la déclaration.' },
        { id: 'link', visual: footer('Accessibilité'), why: 'Un lien vers la page Accessibilité ne suffit pas : l’état de conformité doit se lire sur la page d’accueil.' },
      ],
      answer: 'partial',
      explanation: `La page d’accueil affiche **l’une des trois formules** du RGAA, selon le pourcentage de critères respectés :

- « Accessibilité : totalement conforme » si tous les critères sont respectés ;
- « Accessibilité : partiellement conforme » à partir de 50 % ;
- « Accessibilité : non conforme » sous 50 %, ou sans audit en cours de validité.

Avec 62 %, c’est « partiellement conforme ». La mention peut être un lien vers la page Accessibilité, qui porte la déclaration et le détail des résultats. Son absence est un manquement aux obligations d’affichage que l’Arcom peut sanctionner jusqu’à 25 000 €.`,
      takeaway: 'Sur la page d’accueil : « Accessibilité : totalement, partiellement ou non conforme », selon 100 %, au moins 50 % ou moins de 50 % de critères respectés.',
      sources: [MENTIONS, LAW_47, LAW_47_1],
    },
    {
      id: 'rgaa-cadre-declaration-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle page « Accessibilité » répond aux obligations du RGAA ?',
      options: [
        {
          id: 'vague',
          visual: {
            frame: 'browser',
            alt: 'Page « Accessibilité » : un paragraphe d’engagement en faveur d’un web ouvert à tous, une pastille verte « Site accessible » et un renvoi vers la foire aux questions.',
            css: DECL_CSS,
            html: `<div class="dc"><p class="dc-crumb">Accueil › Accessibilité</p><p class="dc-title">Accessibilité</p><p class="dc-p dc-lead">Mirelac Agglomération s’engage pour un web ouvert à toutes et à tous. Notre site a été conçu dans le respect des normes d’accessibilité et s’améliore en continu.</p><span class="dc-badge"><i data-icon="badge-check" style="--ico:16px"></i>Site accessible</span><p class="dc-p" style="margin-top:12px">Une question ? Consultez notre <span class="dc-a">foire aux questions</span>.</p></div>`,
          },
          why: 'Aucun état de conformité, aucun résultat d’audit, aucun moyen de signaler un défaut, aucune voie de recours : un engagement n’est pas une déclaration.',
        },
        {
          id: 'model',
          visual: {
            frame: 'browser',
            alt: 'Page « Déclaration d’accessibilité » en cinq rubriques : état de conformité (partiellement conforme au RGAA 4.1.2), résultats des tests (62 % des critères respectés), contenus non accessibles, retour d’information et contact avec un formulaire, voies de recours vers le Défenseur des droits.',
            css: DECL_CSS,
            html: `<div class="dc"><p class="dc-crumb">Accueil › Accessibilité</p><p class="dc-title">Déclaration d’accessibilité</p><div class="dc-sec"><p class="dc-h">État de conformité</p><p class="dc-p">Le site de Mirelac Agglomération est <b>partiellement conforme</b> avec le RGAA 4.1.2.</p></div><div class="dc-sec"><p class="dc-h">Résultats des tests</p><p class="dc-p">L’audit interne de mars 2026 révèle que 62 % des critères RGAA sont respectés.</p></div><div class="dc-sec"><p class="dc-h">Contenus non accessibles</p><p class="dc-p">Réservation des salles : erreurs signalées par la seule couleur (critère 3.1).</p></div><div class="dc-sec"><p class="dc-h">Retour d’information et contact</p><p class="dc-p">Un contenu vous est inaccessible ? <span class="dc-a">Signalez-le avec ce formulaire</span>.</p></div><div class="dc-sec"><p class="dc-h">Voies de recours</p><p class="dc-p">Sans réponse satisfaisante, vous pouvez saisir le <span class="dc-a">Défenseur des droits</span>.</p></div></div>`,
          },
          why: 'Elle suit le modèle : état de conformité, résultats, contenus non accessibles, contact et voies de recours.',
        },
      ],
      answer: 'model',
      explanation: `La déclaration d’accessibilité suit un **modèle imposé** par le RGAA. Elle doit permettre à chacun de savoir où en est le site et quoi faire s’il est bloqué :

- l’**état de conformité** et les **résultats des tests** (pourcentage de critères respectés) ;
- les **contenus non accessibles** : non-conformités, dérogations motivées, contenus non soumis à l’obligation ;
- un **moyen de contact** accessible, adresse électronique ou formulaire, pour signaler un défaut ou obtenir une alternative ;
- les **voies de recours** : le Défenseur des droits, si la personne n’obtient pas de réponse satisfaisante.

Une pastille « Site accessible » et une foire aux questions n’apportent rien de tout cela.`,
      takeaway: 'Une déclaration d’accessibilité donne l’état de conformité, les résultats, les contenus non accessibles, un contact pour signaler un défaut et le recours au Défenseur des droits.',
      sources: [DECLARATION, DDD],
    },
    {
      id: 'rgaa-cadre-sample-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel échantillon d’audit respecte le RGAA ?',
      context: 'Deux plans d’audit pour le même site d’agglomération, qui a une page d’aide, un espace famille avec connexion et une inscription au périscolaire en trois étapes.',
      options: [
        {
          id: 'popular',
          visual: {
            alt: 'Plan d’audit de 8 pages : pages les plus visitées (accueil, actualités, agenda des sorties, fiche de la Fête du lac, annuaire des associations, galerie photos), une page de résultats de recherche et l’étape 1 sur 3 de l’inscription au périscolaire.',
            css: SAMPLE_CSS,
            html: `<div class="sp"><p class="sp-h">Échantillon d’audit</p><p class="sp-sub">Mirelac Agglomération · 8 pages</p><p class="sp-g">Pages les plus visitées</p><ul class="sp-l"><li>Accueil · Actualités · Agenda des sorties · Fête du lac (fiche événement) · Annuaire des associations · Galerie photos</li></ul><p class="sp-g">Recherche</p><ul class="sp-l"><li>Résultats pour « déchetterie »</li></ul><p class="sp-g">Démarche</p><ul class="sp-l"><li>Inscription au périscolaire, étape 1 sur 3</li></ul></div>`,
          },
          why: 'Il manque les pages obligatoires (contact, mentions légales, accessibilité, plan du site, aide, connexion), deux étapes du processus, un document et les pages tirées au hasard.',
        },
        {
          id: 'complete',
          visual: {
            alt: 'Plan d’audit de 15 pages et 1 document : sept pages obligatoires (accueil, contact, mentions légales, accessibilité, plan du site, aide, connexion à l’espace famille), trois pages de service, les trois étapes de l’inscription au périscolaire, le guide du tri en PDF et 2 pages tirées au sort.',
            css: SAMPLE_CSS,
            html: `<div class="sp"><p class="sp-h">Échantillon d’audit</p><p class="sp-sub">Mirelac Agglomération · 15 pages et 1 document</p><p class="sp-g">Pages obligatoires</p><ul class="sp-l"><li>Accueil · Contact · Mentions légales · Accessibilité · Plan du site · Aide · Connexion à l’espace famille</li></ul><p class="sp-g">Services</p><ul class="sp-l"><li>Résultats pour « déchetterie » · Actualités · Fête du lac (fiche événement)</li></ul><p class="sp-g">Processus complet</p><ul class="sp-l"><li>Inscription au périscolaire, étapes 1, 2 et 3</li></ul><p class="sp-g">Document</p><ul class="sp-l"><li>Guide du tri (PDF)</li></ul><p class="sp-g">Au hasard</p><ul class="sp-l"><li>2 pages tirées au sort</li></ul></div>`,
          },
          why: 'Pages obligatoires, une page par service dont la recherche, le processus entier, un document et 2 pages au hasard, soit plus de 10 % de l’échantillon.',
        },
      ],
      answer: 'complete',
      explanation: `L’échantillon n’est pas choisi selon l’audience. Le RGAA en fixe le **socle**, quand ces pages existent :

- accueil, contact, mentions légales, accessibilité, plan du site, aide, authentification ;
- au moins une page par type de service, **recherche** comprise, et au moins un **document** téléchargeable ;
- **toutes** les pages d’un processus : une démarche dont on n’audite que l’étape 1 peut bloquer à l’étape 2 ;
- des pages d’aspect différent, puis des pages **tirées au hasard**, au moins 10 % de l’échantillon.

Les pages les plus visitées peuvent guider le choix des pages de service, en plus de ce socle, jamais à sa place.`,
      takeaway: 'Échantillon : pages obligatoires, une page par service et la recherche, les processus entiers, un document, et au moins 10 % de pages tirées au hasard.',
      sources: [EVALUATION, AUDIT_KIT],
    },
    {
      id: 'rgaa-cadre-derogation-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quelle dérogation pour charge disproportionnée est recevable ?',
      context: 'Deux extraits de déclarations d’accessibilité, rubrique « Dérogations ».',
      options: [
        {
          id: 'whole',
          visual: {
            alt: 'Rubrique « Dérogations pour charge disproportionnée » : l’espace famille (inscriptions, paiement de la cantine), parce que le prestataire n’a pas encore livré de version accessible.',
            css: DEROG_CSS,
            html: `<div class="dg"><p class="dg-h">Dérogations pour charge disproportionnée</p><div class="dg-item"><p class="dg-t">Espace famille (inscriptions, paiement de la cantine)</p><p class="dg-p">Notre prestataire n’a pas encore livré de version accessible. Nous vous remercions de votre compréhension.</p></div></div>`,
          },
          why: 'Tout un service, au cœur de la mission, sans justification de coût, sans durée ni alternative : un retard de livraison relève du manque de priorité, pas de la charge disproportionnée.',
        },
        {
          id: 'scoped',
          visual: {
            alt: 'Rubrique « Dérogations pour charge disproportionnée » : la visite virtuelle à 360° de la médiathèque, avec sa justification chiffrée, sa durée jusqu’en juin 2027 et une alternative en texte.',
            css: DEROG_CSS,
            html: `<div class="dg"><p class="dg-h">Dérogations pour charge disproportionnée</p><div class="dg-item"><p class="dg-t">Visite virtuelle à 360° de la médiathèque</p><p class="dg-p"><span class="dg-k">Justification :</span> la rendre accessible coûterait 48 000 €, 60 % du budget numérique annuel, pour 0,4 % des visites du site.</p><p class="dg-p"><span class="dg-k">Durée :</span> jusqu’à la refonte de la visite, prévue en juin 2027.</p><p class="dg-p"><span class="dg-k">Alternative :</span> plan des espaces et description de chaque salle, en texte, sur la page Médiathèque.</p></div></div>`,
          },
          why: 'Un contenu précis, un coût mis en regard de l’usage, une durée et une alternative accessible : tout ce que le RGAA demande.',
        },
      ],
      answer: 'scoped',
      explanation: `La dérogation pour charge disproportionnée s’invoque **au cas par cas, pour un contenu ou une fonctionnalité**. Elle s’apprécie selon la taille, les ressources et la nature de l’organisme, et en comparant le coût au bénéfice pour les personnes handicapées, compte tenu de la fréquence et de la durée d’usage et de l’importance du service.

- **Jamais pour tout un service**, sauf exception justifiée, et jamais par manque de temps, de priorité ou de connaissances.
- **Motivée, datée et listée** dans la déclaration, avec une alternative accessible quand c’est possible ; pour une mission principale de service public, comme les inscriptions à la cantine, l’alternative est obligatoire.

Sans alternative accessible, les critères restent applicables au contenu dérogé : l’audit les note conformes ou non conformes, pas « non applicables ».`,
      takeaway: 'Une dérogation vise un contenu précis, chiffre sa charge, fixe sa durée et propose une alternative ; jamais tout un service, jamais faute de temps.',
      sources: [SCOPE, DECLARATION, EVALUATION],
    },
    {
      id: 'rgaa-cadre-declaration-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Trouve les deux problèmes de cette déclaration d’accessibilité.',
      visual: {
        frame: 'browser',
        alt: 'Déclaration d’accessibilité de l’office de tourisme de Mirelac en six rubriques : état de conformité, résultats des tests, dérogation, environnement de test, retour d’information et contact, voies de recours.',
        css: `.dh { padding: 16px 18px 20px; }
.dh-title { font-size: 20px; line-height: 1.2; font-weight: 700; }
.dh-sec { margin-top: 10px; padding: 6px 4px; }
.dh-h { font-size: 13px; font-weight: 700; }
.dh-p { margin-top: 2px; font-size: 13px; line-height: 1.5; }
.dh-a { color: #1f4fd8; text-decoration: underline; text-underline-offset: 2px; }`,
        html: `<div class="dh">
  <p class="dh-title">Déclaration d’accessibilité</p>
  <div class="dh-sec" data-hotspot="etat"><p class="dh-h">État de conformité</p><p class="dh-p">Le site de l’office de tourisme de Mirelac est totalement conforme avec le RGAA 4.1.2.</p></div>
  <div class="dh-sec" data-hotspot="resultats"><p class="dh-h">Résultats des tests</p><p class="dh-p">L’audit interne de février 2026 révèle que 87 % des critères RGAA sont respectés.</p></div>
  <div class="dh-sec" data-hotspot="derog"><p class="dh-h">Dérogation pour charge disproportionnée</p><p class="dh-p">Visite virtuelle du belvédère : l’adapter coûterait plus que le budget numérique annuel, pour 0,3 % des visites. Jusqu’en juin 2027 ; alternative : description des points de vue en texte.</p></div>
  <div class="dh-sec" data-hotspot="env"><p class="dh-h">Environnement de test</p><p class="dh-p">NVDA et JAWS avec Firefox, VoiceOver avec Safari.</p></div>
  <div class="dh-sec" data-hotspot="contact"><p class="dh-h">Retour d’information et contact</p><p class="dh-p">Pour signaler un défaut d’accessibilité, adressez un courrier à l’office de tourisme, service communication.</p></div>
  <div class="dh-sec" data-hotspot="recours"><p class="dh-h">Voies de recours</p><p class="dh-p">Sans réponse satisfaisante, saisissez le <span class="dh-a">Défenseur des droits</span> : formulaire en ligne, délégué près de chez vous ou courrier gratuit.</p></div>
</div>`,
      },
      hotspots: [
        { id: 'etat', label: 'État « totalement conforme »', correct: true, why: 'Avec 87 % de critères respectés, le site est « partiellement conforme » : « totalement » exige 100 %.' },
        { id: 'contact', label: 'Contact par courrier seulement', correct: true, why: 'Le RGAA demande un mécanisme accessible en ligne, adresse électronique ou formulaire, pour signaler un défaut ou demander une alternative.' },
        { id: 'resultats', label: 'Résultats des tests', correct: false, why: 'Le pourcentage de critères respectés est attendu ici ; c’est lui qui fixe l’état de conformité, pas l’inverse.' },
        { id: 'derog', label: 'Dérogation', correct: false, why: 'Un contenu précis, une charge chiffrée, une durée et une alternative : la dérogation est bien présentée.' },
        { id: 'env', label: 'Environnement de test', correct: false, why: 'Ce sont des combinaisons de référence du RGAA pour l’ordinateur.' },
        { id: 'recours', label: 'Voies de recours', correct: false, why: 'Le recours au Défenseur des droits figure, avec ses trois moyens de le saisir.' },
      ],
      explanation: `Deux rubriques ne tiennent pas :

- **L’état de conformité** découle du pourcentage de critères respectés : 100 % pour « totalement conforme », au moins 50 % pour « partiellement conforme ». Annoncer « totalement conforme » à 87 % trompe les personnes qui comptent sur le site.
- **Le retour d’information** passe par un mécanisme accessible en ligne, adresse électronique ou formulaire. Un courrier postal seul exclut justement les personnes que le site bloque. L’organisme accuse réception et répond sous une semaine, ou motive un délai plus long.

Le recours au Défenseur des droits prend le relais quand ce contact reste sans réponse ou sans solution : les deux rubriques vont ensemble.`,
      takeaway: 'L’état de conformité suit le pourcentage de critères respectés, et le contact passe par une adresse électronique ou un formulaire, pas par un courrier seul.',
      sources: [DECLARATION, MENTIONS],
    },
    {
      id: 'rgaa-cadre-grid-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Dans cet extrait de grille d’audit, trouve les deux statuts mal attribués.',
      visual: {
        alt: 'Extrait de grille d’audit RGAA de Mirelac Agglomération : six constats, chacun avec son critère, sa page, une description et un statut C ou NA.',
        css: `.gr { padding: 14px 16px 16px; }
.gr-title { font-size: 15px; font-weight: 700; }
.gr-sub { margin-top: 2px; font-size: 12px; color: #5a6172; }
.gr-rows { margin-top: 10px; }
.gr-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 6px; border-top: 1px solid #e3e6ec; }
.gr-n { flex: none; width: 38px; font-weight: 700; font-variant-numeric: tabular-nums; }
.gr-b { flex: 1; min-width: 0; }
.gr-pg { font-size: 12px; font-weight: 600; color: #5a6172; }
.gr-f { margin-top: 2px; font-size: 13px; line-height: 1.45; }
.gr-s { flex: none; min-width: 40px; padding: 3px 8px; border-radius: 6px; font-size: 13px; font-weight: 700; text-align: center; }
.gr-c { background: #e6f4ea; color: #1e6b34; }
.gr-na { background: #eef1f7; color: #36405a; }`,
        html: `<div class="gr">
  <p class="gr-title">Grille d’audit · Mirelac Agglomération</p>
  <p class="gr-sub">Extrait : 6 constats sur 15 pages</p>
  <div class="gr-rows">
    <div class="gr-row" data-hotspot="video"><span class="gr-n">4.1</span><div class="gr-b"><p class="gr-pg">Accueil</p><p class="gr-f">Aucune vidéo ni piste audio dans la page.</p></div><span class="gr-s gr-na">NA</span></div>
    <div class="gr-row" data-hotspot="label"><span class="gr-n">11.1</span><div class="gr-b"><p class="gr-pg">Contact</p><p class="gr-f">5 champs sur 6 ont une étiquette ; « Code postal » n’en a aucune.</p></div><span class="gr-s gr-c">C</span></div>
    <div class="gr-row" data-hotspot="title"><span class="gr-n">8.6</span><div class="gr-b"><p class="gr-pg">Plan du site</p><p class="gr-f">Titre de la page : « Plan du site – Mirelac Agglomération ».</p></div><span class="gr-s gr-c">C</span></div>
    <div class="gr-row" data-hotspot="chart"><span class="gr-n">1.1</span><div class="gr-b"><p class="gr-pg">Qualité de l’air</p><p class="gr-f">Graphique dérogé pour charge disproportionnée, sans alternative proposée ; il n’a aucune alternative textuelle.</p></div><span class="gr-s gr-na">NA</span></div>
    <div class="gr-row" data-hotspot="process"><span class="gr-n">12.1</span><div class="gr-b"><p class="gr-pg">Inscription au périscolaire, étape 2</p><p class="gr-f">Ni menu ni moteur de recherche dans le parcours d’inscription.</p></div><span class="gr-s gr-na">NA</span></div>
    <div class="gr-row" data-hotspot="contrast"><span class="gr-n">3.2</span><div class="gr-b"><p class="gr-pg">Accueil</p><p class="gr-f">Texte du bandeau d’alerte à 4,6:1 sur son fond.</p></div><span class="gr-s gr-c">C</span></div>
  </div>
</div>`,
      },
      hotspots: [
        { id: 'label', label: '11.1 noté C avec un champ sans étiquette', correct: true, why: 'Un seul élément en échec suffit : avec « Code postal » sans étiquette, le critère 11.1 est non conforme sur cette page.' },
        { id: 'chart', label: '1.1 noté NA pour un contenu dérogé sans alternative', correct: true, why: 'Une dérogation sans alternative accessible laisse les critères applicables : le graphique sans alternative textuelle rend 1.1 non conforme.' },
        { id: 'video', label: '4.1 noté NA, sans vidéo', correct: false, why: 'Aucun média dans la page : rien n’est concerné, le critère est non applicable.' },
        { id: 'title', label: '8.6 noté C', correct: false, why: 'Ce titre permet de retrouver la page dans l’historique ou les onglets : il est pertinent.' },
        { id: 'process', label: '12.1 noté NA dans un processus', correct: false, why: 'Le RGAA rend le critère 12.1 non applicable aux pages d’un processus, comme ce parcours d’inscription.' },
        { id: 'contrast', label: '3.2 noté C à 4,6:1', correct: false, why: '4,6:1 dépasse le seuil de 4,5:1 du texte courant : conforme.' },
      ],
      explanation: `Deux règles du RGAA se cachent derrière ces statuts :

- **Un seul élément suffit à rendre un critère non conforme** sur une page. Cinq étiquettes sur six, ce n’est pas « presque conforme » : la personne qui ne sait pas quoi saisir dans « Code postal » reste bloquée.
- **Non applicable** a trois motifs seulement : aucun contenu concerné, contenu exempté, ou contenu dérogé **avec** une alternative accessible. Sans alternative, le graphique reste évalué, et il échoue au critère 1.1.

Les autres statuts sont justes, y compris le 12.1 : le RGAA le tient pour non applicable aux pages d’un processus, où un menu détournerait de la démarche.`,
      takeaway: 'Un seul élément en échec rend le critère non conforme ; NA ne vaut que sans contenu concerné, pour un contenu exempté, ou pour un contenu dérogé avec une alternative.',
      sources: [EVALUATION, AUDIT_KIT, { label: 'DINUM — RGAA 4.1.2, critère 12.1 (deux systèmes de navigation)', url: `${RGAA}methode/criteres-et-tests/#12.1` }],
    },
    {
      id: 'rgaa-cadre-scope-multi',
      type: 'multi',
      difficulty: 1,
      prompt: 'Lesquels de ces services doivent respecter l’article 47 de la loi de 2005, et donc publier une déclaration RGAA ?',
      options: [
        { id: 'region', label: 'Le site d’un conseil régional', why: 'Une collectivité est une personne morale de droit public : le site est concerné.' },
        { id: 'intranet', label: 'L’intranet d’un centre hospitalier public', why: 'Les intranets sont des services de communication au public en ligne au sens de la loi, et l’hôpital public est un établissement public.' },
        { id: 'retail', label: 'L’application mobile d’une enseigne qui réalise en moyenne 400 millions d’euros de chiffre d’affaires par an en France', why: 'Au-delà de 250 millions d’euros de chiffre d’affaires en France, une entreprise est concernée, applications mobiles comprises.' },
        { id: 'shop', label: 'La boutique en ligne d’une marque qui réalise 60 millions d’euros de chiffre d’affaires', why: 'Sous le seuil de 250 millions d’euros, l’article 47 ne s’applique pas. L’Acte européen sur l’accessibilité, lui, s’applique à sa boutique depuis le 28 juin 2025.' },
        { id: 'social', label: 'Le compte Instagram d’une mairie', why: 'Selon l’Arcom, les publications sur les réseaux sociaux ne relèvent pas de l’article 47 ; elle encourage tout de même à les rendre accessibles.' },
        { id: 'club', label: 'Le site d’un club de randonnée associatif', why: 'Une association qui ne fournit ni service essentiel au public ni service destiné aux personnes handicapées est exclue.' },
      ],
      answers: ['region', 'intranet', 'retail'],
      explanation: `L’article 47 vise les **services de communication au public en ligne** — sites, intranets, extranets, applications mobiles, progiciels, mobilier urbain numérique — de quatre catégories d’organismes :

- les personnes morales de droit public (État, collectivités, établissements publics) ;
- les organismes privés chargés d’une mission de service public ou créés pour l’intérêt général sous influence publique, et ceux qu’ils créent ;
- les entreprises de plus de **250 millions d’euros** de chiffre d’affaires annuel en France, en moyenne sur trois exercices.

Une petite boutique en ligne n’est pas tenue par l’article 47, mais elle n’est pas libre pour autant : depuis le 28 juin 2025, l’Acte européen sur l’accessibilité couvre le commerce en ligne, sauf pour les microentreprises.`,
      takeaway: 'Article 47 : organismes publics, organismes privés de service public, et entreprises de plus de 250 M€ de chiffre d’affaires en France. Le commerce en ligne relève aussi de l’Acte européen.',
      sources: [SCOPE, LAW_47, ARCOM, EAA],
    },
    {
      id: 'rgaa-cadre-rate-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Quel pourcentage publier, et quelle mention afficher ?',
      context: 'Audit de 15 pages. 74 critères sont applicables sur au moins une page. 51 d’entre eux ne sont non conformes sur aucune page ; les 23 autres sont non conformes sur une page au moins. La moyenne des taux de conformité des 15 pages est de 89 %.',
      options: [
        { id: 'right', label: '69 % des critères respectés : « Accessibilité : partiellement conforme »', why: '51 ÷ 74 = 68,9 % : au moins 50 %, mais pas 100 %.' },
        { id: 'average', label: '89 % : « Accessibilité : partiellement conforme »', why: '89 % est le taux moyen, facultatif : la mention se fonde sur le pourcentage de critères respectés.' },
        { id: 'all', label: '48 % (51 critères sur 106) : « Accessibilité : non conforme »', why: 'Le dénominateur est le nombre de critères applicables, pas les 106 critères du référentiel.' },
        { id: 'strict', label: '69 % : « Accessibilité : non conforme », car seul 100 % est conforme', why: '« Non conforme » vaut sous 50 % ; entre 50 et 99 %, c’est « partiellement conforme ».' },
      ],
      answer: 'right',
      explanation: `Le RGAA calcule le **pourcentage de critères respectés** sur tout l’échantillon :

- au numérateur, les critères qui ne sont **non conformes sur aucune page** : 51 ;
- au dénominateur, les critères **applicables sur au moins une page** : 74 ;
- 51 ÷ 74 = **68,9 %**, arrondi à 69 % : au moins 50 %, donc « partiellement conforme ».

Le **taux moyen** (89 %) est la moyenne des taux de chaque page. Il est plus flatteur, car un critère en échec sur une page n’abaisse que cette page. La déclaration peut le donner en plus, jamais à la place.`,
      takeaway: 'Pourcentage publié = critères sans échec sur aucune page ÷ critères applicables. Le taux moyen des pages est facultatif et ne fixe pas la mention.',
      sources: [EVALUATION, DECLARATION, AUDIT_KIT],
    },
    {
      id: 'rgaa-cadre-validity-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Jusqu’à quand cette déclaration reste-t-elle valable, au plus tard ?',
      context: 'La déclaration a été publiée le 15 mars 2025, après un audit sur le RGAA 4.1.2. Aucune refonte n’est prévue. La DINUM annonce le RGAA 5 pour fin 2026.',
      options: [
        { id: 'three', label: 'Jusqu’au 15 mars 2028, trois ans après sa publication', why: 'La limite de trois ans tombe avant les dix-huit mois qui suivront la sortie du RGAA 5.' },
        { id: 'release', label: 'Jusqu’à la publication du RGAA 5', why: 'Une nouvelle version laisse dix-huit mois pour mettre la déclaration à jour : elle ne l’invalide pas le jour de sa sortie.' },
        { id: 'eighteen', label: 'Dix-huit mois après la publication du RGAA 5, vers mi-2028', why: 'Ce délai joue dans la limite des trois ans après publication, atteinte ici dès mars 2028.' },
        { id: 'forever', label: 'Tant que le site n’est pas refondu', why: 'Sans refonte, la déclaration expire tout de même trois ans après sa publication.' },
      ],
      answer: 'three',
      explanation: `La déclaration se met à jour à **la première** de ces échéances :

- une refonte ou une modification substantielle du site ;
- **trois ans** après sa publication ;
- **dix-huit mois** après la publication d’une nouvelle version du référentiel, pour qui applique la méthode technique.

La DINUM l’a rappelé pour le RGAA 5 : les déclarations faites avant sa publication resteront valables dix-huit mois, dans la limite des trois ans. Ici, trois ans après le 15 mars 2025 tombe en mars 2028, avant les dix-huit mois qui suivront une sortie fin 2026.`,
      takeaway: 'Une déclaration se refait à la première échéance : refonte, trois ans après sa publication, ou dix-huit mois après une nouvelle version du RGAA.',
      sources: [DECLARATION, RGAA5],
    },
    {
      id: 'rgaa-cadre-arcom-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Que peut faire l’Arcom ?',
      context: 'Une enseigne de bricolage réalise en moyenne 640 millions d’euros de chiffre d’affaires par an en France. Sa page d’accueil n’affiche aucune mention d’accessibilité, elle ne publie aucune déclaration, et une association relève de nombreuses non-conformités au RGAA sur son site.',
      options: [
        { id: 'display', label: 'La mettre en demeure publiquement, puis la sanctionner jusqu’à 25 000 € pour l’absence de mention et de déclaration ; la conformité au RGAA d’une entreprise échappe à son contrôle.', why: 'C’est le régime de l’article 47-1 pour les entreprises : seules les obligations d’affichage sont contrôlées par l’Arcom.' },
        { id: 'full', label: 'La sanctionner jusqu’à 50 000 € pour les non-conformités au RGAA.', why: 'Le plafond de 50 000 € vise le non-respect des exigences d’accessibilité par les organismes publics et assimilés, pas par les entreprises.' },
        { id: 'nothing', label: 'Rien : l’article 47 ne concerne que les organismes publics.', why: 'Les entreprises de plus de 250 millions d’euros de chiffre d’affaires en France sont concernées.' },
        { id: 'minister', label: 'Saisir le ministre chargé des personnes handicapées, qui prononcera une amende de 20 000 €.', why: 'Cette amende ministérielle relevait du décret de 2019 ; le décret n° 2026-816 du 24 août 2026 l’a abrogée.' },
      ],
      answer: 'display',
      explanation: `Depuis l’ordonnance du 6 septembre 2023, l’**article 47-1** confie le contrôle à l’Arcom, avec deux périmètres :

- pour les organismes publics et assimilés (1° à 3°) : les exigences d’accessibilité elles-mêmes, jusqu’à **50 000 €**, et les obligations de publication, jusqu’à **25 000 €** ;
- pour les entreprises du 4° : **seulement** les obligations de publication — mention, déclaration, schéma pluriannuel, plan d’actions, moyen de signalement —, jusqu’à **25 000 €**.

Dans tous les cas, l’Arcom met d’abord en demeure, et rend la mise en demeure publique ; elle peut sanctionner de nouveau si le même manquement perdure six mois après la sanction. Si l’enseigne vend en ligne, sa boutique relève en plus de l’Acte européen sur l’accessibilité, un autre régime.`,
      takeaway: 'Face à une entreprise de plus de 250 M€, l’Arcom contrôle la mention, la déclaration et le schéma (jusqu’à 25 000 €), pas la conformité au RGAA.',
      sources: [LAW_47_1, ARCOM, DECREE],
    },
    {
      id: 'rgaa-cadre-self-audit-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Un organisme peut réaliser lui-même l’audit RGAA de son site, sans faire appel à un prestataire.',
      answer: true,
      explanation: `Vrai. Le RGAA prévoit que l’audit soit mené par l’organisme lui-même (**auto-évaluation**) ou par un tiers. C’est à l’organisme de garantir sa fiabilité : prestataire externe, formation d’experts internes, audits croisés…

La DINUM met à disposition une grille d’audit et **Ara**, un outil d’aide à l’audit qui produit aussi le rapport et la déclaration. Ara n’automatise rien : il suppose de bien connaître les 106 critères. La déclaration indique ensuite qui a réalisé l’audit, en interne ou par quelle société.`,
      takeaway: 'L’audit RGAA peut être interne ou externe ; l’organisme répond de sa fiabilité, et la déclaration dit qui l’a mené.',
      sources: [EVALUATION, AUDIT_KIT, DECLARATION],
    },
    {
      id: 'rgaa-cadre-derogation-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Une dérogation pour charge disproportionnée dispense l’organisme de publier une déclaration d’accessibilité.',
      answer: false,
      explanation: `Faux. La dérogation vise un **contenu ou une fonctionnalité**, jamais l’obligation de déclarer. Le RGAA le dit expressément : elle n’exempte pas l’entité de produire une déclaration d’accessibilité.

Au contraire, les contenus dérogés sont **listés dans la déclaration**, avec la justification de la dérogation, sa durée et, le cas échéant, l’alternative accessible proposée. C’est ce qui permet à une personne bloquée de savoir qu’une alternative existe et comment l’obtenir.`,
      takeaway: 'Une dérogation ne dispense jamais de la déclaration : le contenu dérogé y figure, avec sa justification, sa durée et son alternative.',
      sources: [SCOPE, DECLARATION],
    },
    {
      id: 'rgaa-cadre-audit-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Range les étapes d’un audit RGAA dans l’ordre.',
      items: [
        { id: 'sample', label: 'Constituer l’échantillon : pages obligatoires, processus complets, pages tirées au hasard' },
        { id: 'env', label: 'Définir l’environnement de test : navigateurs et technologies d’assistance' },
        { id: 'test', label: 'Tester chaque page sur les critères qui lui sont applicables : C, NC ou NA' },
        { id: 'rate', label: 'Calculer le pourcentage de critères respectés' },
        { id: 'declare', label: 'Publier la déclaration d’accessibilité et mettre à jour la mention en page d’accueil' },
      ],
      explanation: `L’ordre suit la partie « Évaluation de la conformité » du RGAA :

1. **L’échantillon** d’abord : sans lui, on ne sait pas quoi tester.
2. **L’environnement de test** : les combinaisons de navigateurs et de technologies d’assistance sur lesquelles vérifier les composants.
3. **Le test des pages**, critère par critère : conforme, non conforme ou non applicable.
4. **Le calcul** : critères respectés sur toutes les pages ÷ critères applicables.
5. **La déclaration**, phase finale de l’audit, avec la mention qui en découle.

Les non-conformités relevées nourrissent ensuite le plan d’actions de l’année.`,
      takeaway: 'Échantillon, environnement de test, test des pages, calcul du pourcentage, puis déclaration et mention : l’audit finit par la déclaration.',
      sources: [EVALUATION, DECLARATION],
    },
    {
      id: 'rgaa-cadre-docs-match',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque document à ce qu’il contient.',
      leftTitle: 'Document',
      rightTitle: 'Contenu',
      pairs: [
        { id: 'mention', left: 'Mention en page d’accueil', right: 'L’état de conformité en une ligne : totalement, partiellement ou non conforme' },
        { id: 'declaration', left: 'Déclaration d’accessibilité', right: 'Les résultats de l’audit, les contenus non accessibles, le contact et les voies de recours' },
        { id: 'schema', left: 'Schéma pluriannuel', right: 'La politique d’accessibilité sur trois ans au plus : organisation, moyens, référent, formation' },
        { id: 'plan', left: 'Plan d’actions annuel', right: 'Les actions prévues pour l’année en cours, avec le bilan de l’année passée' },
        { id: 'grid', left: 'Grille d’audit', right: 'Le statut de chaque critère, page par page, avec les corrections à apporter' },
      ],
      explanation: `Chaque document a son rôle :

- la **mention** dit, dès la page d’accueil, où en est le site ;
- la **déclaration** détaille le résultat et dit quoi faire si l’on est bloqué ;
- le **schéma pluriannuel** fixe la politique sur trois ans au plus : référent accessibilité, moyens humains et financiers, formation, clauses dans les marchés, audits prévus ;
- le **plan d’actions** décline le schéma pour l’année, bilan de l’année précédente compris ;
- la **grille d’audit**, annexe du rapport, donne à l’équipe le détail des corrections.

La déclaration renvoie au schéma et au plan de l’année en cours.`,
      takeaway: 'Mention : l’état en une ligne. Déclaration : résultats, contenus non accessibles, contact, recours. Schéma : trois ans. Plan : l’année. Grille : le détail des corrections.',
      sources: [MENTIONS, DECLARATION, SCHEMA, AUDIT_KIT],
    },
  ],
};

export default rgaaCadre;
