import type { ModuleContent, SourceRef } from '../../engine/types';

/** French punctuation inside mock markup (the Markdown renderer only handles text fields). */
const fr = (html: string) =>
  html
    .replace(/ ([?!;»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/ :(?=[\s<])/g, ' :')
    .replace(/(\d) (€|%)/g, '$1 $2');

const dp = (slug: string, name: string): SourceRef => ({
  label: `Deceptive Patterns — ${name}`,
  url: `https://www.deceptive.design/types/${slug}`,
});

const RGPD: SourceRef = {
  label: 'RGPD — texte du règlement sur le site de la CNIL (article 4, article 7, considérant 32)',
  url: 'https://www.cnil.fr/fr/reglement-europeen-protection-donnees',
};
const CNIL_REFUS: SourceRef = {
  label: 'CNIL — Cookies : refuser doit être aussi simple qu’accepter (février 2021)',
  url: 'https://www.cnil.fr/fr/cookies-la-cnil-incite-les-organismes-prives-et-publics-auditer-leurs-sites-web-et-applications',
};
const CNIL_GOOGLE_FB: SourceRef = {
  label: 'Deceptive Patterns — La CNIL sanctionne Google (150 M€) et Facebook (60 M€), janvier 2022',
  url: 'https://www.deceptive.design/articles/cookies-the-cnil-fines-google-a-total-of-150-million-euros-and-facebook-60-million-euros-for-non-compliance-with-french-legislation',
};
const CNIL_TIKTOK: SourceRef = {
  label: 'Hunton — CNIL Fines TikTok 5 Million Euros Over Cookie Infringements (janvier 2023)',
  url: 'https://www.hunton.com/privacy-and-cybersecurity-law-blog/cnil-fines-tiktok-5-million-euros-over-cookie-infringements',
};
const PLANET49: SourceRef = {
  label: 'CJUE — Arrêt Planet49 (C-673/17) du 1er octobre 2019, communiqué de presse',
  url: 'https://curia.europa.eu/jcms/upload/docs/application/pdf/2019-10/cp190125fr.pdf',
};
const DSA: SourceRef = {
  label: 'Règlement (UE) 2022/2065 sur les services numériques (DSA), article 25',
  url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32022R2065',
};
const UCPD: SourceRef = {
  label: 'Directive 2005/29/CE sur les pratiques commerciales déloyales, annexe I',
  url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32005L0029',
};
const OMNIBUS: SourceRef = {
  label: 'Directive (UE) 2019/2161 « Omnibus » (avis de consommateurs)',
  url: 'https://eur-lex.europa.eu/eli/dir/2019/2161/oj',
};
const CRD: SourceRef = {
  label: 'Directive 2011/83/UE relative aux droits des consommateurs, article 22',
  url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32011L0083',
};
const INC: SourceRef = {
  label: 'INC — Résilier son contrat en quelques clics (depuis le 1er juin 2023)',
  url: 'https://www.inc-conso.fr/content/vous-pouvez-resilier-votre-contrat-dabonnement-en-quelques-clics',
};
const LINC: SourceRef = {
  label: 'CNIL / LINC — La forme des choix (cahier Innovation et prospective n° 6, 2019)',
  url: 'https://linc.cnil.fr/ip-report-shaping-choices-digital-world',
};

/* ---------- Shared mock pieces ---------- */

const HOTEL_HEAD = `<div class="mk-img" style="--ratio:16/6"></div>
<div class="mk-row mk-between"><p class="mk-h3">Hôtel des Arts · Nantes</p><span class="mk-price">248 €</span></div>`;

const CK_CSS = `.ck-page { padding: 10px; background: #eef1f5; }
.ck { padding: 14px; border-radius: 14px; background: #fff; border: 1px solid #e1e4ea; box-shadow: 0 10px 30px rgb(15 20 35 / 0.16); }
.ck-btn { background: #1f2a44; }
.ck-link { align-self: center; font-size: 13px; font-weight: 600; color: #1f4fd8; text-decoration: underline; }
.ck-faint { align-self: center; font-size: 11px; color: #9aa0ab; text-decoration: underline; }`;

const CK_TEXT = `<p class="mk-h3">Vos choix sur les cookies</p><p class="mk-small">Avec votre accord, nous utilisons des cookies pour mesurer l’audience et afficher des publicités adaptées.</p>`;

const NEWS_PAGE = `<div class="mk-pad mk-stack" style="--gap:8px"><p class="mk-h2">Maison Lin</p><p class="mk-small mk-muted">Linge de maison en lin lavé</p><div class="mk-img" style="--ratio:16/7"></div></div>`;

const newsDialog = (refuse: string, extra = '') =>
  fr(`${NEWS_PAGE}<div class="mk-overlay"><div class="mk-dialog mk-stack mk-center" style="--gap:10px"><p class="mk-h2">-10 % sur votre première commande</p><p class="mk-small mk-muted">Inscrivez-vous à notre lettre d’information.</p><span class="mk-input" style="text-align:start;color:#6b7280">Votre adresse e-mail</span><span class="mk-btn mk-btn--block">J’en profite</span><span class="cs-no">${refuse}</span>${extra}</div></div>`);

const MATTRESS_HEAD = `<div class="mk-img" style="--ratio:16/6"></div><p class="mk-h3">Matelas Aube 140 × 190</p><p><span class="mk-price" style="font-size:20px">389 €</span> <s class="mk-muted">459 €</s></p>`;

const ACCOUNT_HEAD = `<p class="mk-h3">Créer votre compte</p><div class="mk-field"><span class="mk-label">E-mail</span><span class="mk-input">ines.moreau@mail.fr</span></div>`;

const darkPatterns: ModuleContent = {
  id: 'dark-patterns',
  title: 'Design trompeur et éthique',
  category: 'psychologie',
  summary:
    'Reconnaître les motifs trompeurs — fausse urgence, présélection, résiliation obstruée… —, savoir ce qu’en disent le RGPD, la CNIL et le DSA, et concevoir des choix honnêtes.',
  minutes: 13,
  commands: ['clarify', 'critique'],
  sources: ['deceptive', 'cnil:cookies', CNIL_REFUS, RGPD, PLANET49, DSA, UCPD, OMNIBUS, CRD, INC, LINC, CNIL_GOOGLE_FB, CNIL_TIKTOK, 'imp:clarify', 'imp:delight'],
  sections: [
    {
      id: 'definition',
      title: 'Persuader n’est pas tromper',
      body: `Harry Brignull a nommé en 2010 les *dark patterns*, rebaptisés depuis **deceptive patterns** (motifs trompeurs) : des interfaces conçues pour faire faire aux gens ce qu’ils n’auraient pas choisi en connaissance de cause — acheter, s’abonner, partager leurs données.

Ils exploitent les mêmes mécanismes que les lois de l’UX, mais **contre** la personne : l’effet de défaut (présélection), la rareté, la preuve sociale, la peur de manquer, la fatigue. La frontière avec la persuasion se trace avec trois questions :

- **Est-ce vrai ?** Une échéance, un stock, un avis, un prix total vérifiables.
- **Est-ce symétrique ?** Dire non demande-t-il le même effort que dire oui ?
- **La personne serait-elle d’accord si elle voyait tout ?** Si le design ne fonctionne que parce qu’elle ne voit pas, ne lit pas ou se lasse, c’est une tromperie.

Les motifs trompeurs rapportent à court terme et coûtent ensuite : remboursements, désabonnements, réputation — et sanctions, car le droit européen et français en interdit une bonne partie.`,
    },
    {
      id: 'pression',
      title: 'La pression : urgence, rareté, preuve sociale, culpabilité',
      body: `- **Fausse urgence** (*fake urgency*) : une limite de temps inventée — compte à rebours qui repart à zéro, « offre valable aujourd’hui seulement » renouvelée chaque jour. Sous pression, on évalue moins bien. Déclarer faussement qu’un produit ne sera disponible que pendant une période très limitée, pour obtenir une décision immédiate, figure dans la **liste noire** européenne des pratiques commerciales déloyales (directive 2005/29/CE, reprise dans le Code de la consommation).
- **Fausse rareté** (*fake scarcity*) : faux stock bas, fausse forte demande (« Plus que 2 ! », « Très demandé »).
- **Fausse preuve sociale** (*fake social proof*) : faux avis, faux témoignages, faux messages d’activité (« Julie, de Lyon, vient d’acheter… » tirés au hasard). Depuis mai 2022 (directive Omnibus), publier ou commander de faux avis de consommateurs est aussi dans la liste noire.
- **Confirmshaming** : culpabiliser le refus (« Non merci, je préfère payer plein tarif »).

**L’alternative honnête** utilise les mêmes leviers avec des faits : une date de fin réelle (« jusqu’au dimanche 23 h 59 »), un stock réel, des avis vérifiés, un refus formulé de façon neutre (« Non merci »).`,
      examples: [
        {
          title: 'Des preuves vérifiables plutôt qu’une pression',
          bad: {
            alt: 'Fiche d’hôtel avec trois alertes rouges : « Très demandé ! 23 personnes regardent cet hôtel », « Plus qu’une chambre à ce prix ! » et une notification « Julie, de Lyon, vient de réserver ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:9px">${HOTEL_HEAD}<p class="hp-alert"><i data-icon="flame"></i>Très demandé ! 23 personnes regardent cet hôtel</p><p class="hp-alert"><i data-icon="triangle-alert"></i>Plus qu’une chambre à ce prix !</p><div class="mk-toast hp-toast"><i data-icon="user"></i><span>Julie, de Lyon, vient de réserver</span></div><span class="mk-btn mk-btn--block">Réserver</span></div>`),
            css: `.hp-alert { display: flex; align-items: center; gap: 6px; color: #b3261e; font-weight: 700; font-size: 13px; --ico: 16px; }
.hp-toast { font-size: 12px; padding: 8px 12px; --ico: 16px; }`,
          },
          badNote: 'Affluence, dernière chambre, réservation d’une inconnue : trois pressions invérifiables, empilées pour presser la décision.',
          good: {
            alt: 'Même fiche d’hôtel indiquant le prix pour deux nuits taxes comprises, une note de 4,4 sur 5 issue de 1 286 avis de clients ayant séjourné, et l’annulation gratuite jusqu’au 10 novembre.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:9px">${HOTEL_HEAD}<p class="mk-small mk-muted">2 nuits, 2 adultes · taxes et frais compris</p><p class="mk-small hp-ok"><i data-icon="star"></i><span><b>4,4/5</b> · 1 286 avis de clients ayant séjourné</span></p><p class="mk-small hp-ok"><i data-icon="circle-check"></i><span>Annulation gratuite jusqu’au 10 novembre</span></p><span class="mk-btn mk-btn--block">Réserver</span></div>`),
            css: `.hp-ok { display: flex; align-items: center; gap: 6px; --ico: 15px; }
.hp-ok .mk-ico { color: #1f6b3a; }`,
          },
          goodNote: 'Un prix complet, des avis vérifiés, une date d’annulation : de quoi décider sereinement.',
        },
      ],
    },
    {
      id: 'dissimulation',
      title: 'Ce qu’on cache : panier, prix, abonnement, publicités',
      body: `- **Panier piégé** (*sneak into basket*, une forme de *sneaking*) : un produit ou une option ajoutés sans demande — assurance, don, magazine. Brignull cite Sports Direct, qui glissait en 2015 un abonnement à un magazine à 1 £ dans les paniers. Le droit européen exige le **consentement exprès** du consommateur pour tout paiement supplémentaire ; s’il a été déduit d’une option par défaut qu’il fallait refuser, le consommateur a droit au remboursement (directive 2011/83/UE, article 22).
- **Coûts cachés** (*hidden costs*) : des frais révélés à la dernière étape, quand on a déjà investi du temps. Dans une expérience menée sur une billetterie en ligne (Blake et coll., 2021), les acheteurs à qui l’on ne montrait pas les frais d’emblée dépensaient environ 21 % de plus.
- **Abonnement caché** (*hidden subscription*, autrefois *forced continuity*) : un achat ponctuel ou un essai gratuit qui se transforme en paiement récurrent, sans information claire ni rappel.
- **Publicité déguisée** (*disguised ads*) : une publicité qui imite le contenu ou l’interface — le faux bouton « Télécharger », l’article sponsorisé sans mention.
- **Interférence visuelle** (*visual interference*) : une information importante rendue illisible (petite taille, faible contraste) ou noyée dans une interface chaotique.

**L’alternative honnête** : prix total dès la première étape, aucune option payante cochée d’avance, rappel avant la fin d’un essai, publicités signalées comme telles, informations engageantes au moins aussi lisibles que l’argument commercial.`,
      examples: [
        {
          title: 'Le prix après l’essai, aussi lisible que l’offre',
          bad: {
            alt: 'Écran d’essai gratuit d’un service de musique : un gros bouton « Commencer l’essai gratuit » et, dessous, une mention minuscule et très pâle indiquant la reconduction à 14,99 euros par mois.',
            html: fr(`<div class="mk-pad mk-stack mk-center" style="--gap:10px"><p class="mk-h2">Essayez Lumio Musique</p><p>Des millions de titres, sans publicité.</p><span class="mk-btn mk-btn--block">Commencer l’essai gratuit</span><p class="tr-fine">En continuant, vous acceptez qu’à l’issue de la période d’essai de 7 jours l’abonnement soit reconduit automatiquement au tarif de 14,99 € par mois, sauf résiliation.</p></div>`),
            css: `.tr-fine { font-size: 10px; line-height: 1.35; color: #b0b4bd; }`,
          },
          badNote: 'Le prix récurrent n’apparaît que dans une mention minuscule et pâle, sous le bouton.',
          good: {
            alt: 'Même écran où le prix de 14,99 euros par mois après 7 jours est écrit en gras sous le titre, avec un rappel promis 2 jours avant la fin de l’essai et la résiliation en ligne.',
            html: fr(`<div class="mk-pad mk-stack mk-center" style="--gap:10px"><p class="mk-h2">Essayez Lumio Musique</p><p><b>Gratuit pendant 7 jours, puis 14,99 € par mois.</b></p><ul class="tr-list"><li><i data-icon="bell"></i>Rappel par e-mail 2 jours avant la fin de l’essai</li><li><i data-icon="circle-check"></i>Résiliable en ligne à tout moment</li></ul><span class="mk-btn mk-btn--block">Commencer l’essai gratuit</span></div>`),
            css: `.tr-list { list-style: none; padding: 0; margin: 0 auto; display: flex; flex-direction: column; gap: 6px; font-size: 13px; text-align: start; --ico: 16px; }
.tr-list li { display: flex; align-items: center; gap: 8px; }
.tr-list .mk-ico { color: #1f6b3a; }`,
          },
          goodNote: 'Le prix après l’essai est dit d’emblée, un rappel est promis, la sortie est annoncée.',
        },
      ],
    },
    {
      id: 'obstruction',
      title: 'Les freins : résiliation, harcèlement, comparaison, questions pièges',
      body: `- **Résiliation obstruée** (*hard to cancel*, autrefois *roach motel*) : s’abonner en un clic, résilier par téléphone, par courrier ou au bout d’un labyrinthe. En France, depuis le **1er juin 2023**, un contrat qui peut être conclu en ligne doit pouvoir être résilié en ligne, par une fonction gratuite et facile d’accès — la « résiliation en trois clics ».
- **Harcèlement** (*nagging*) : redemander sans cesse ce que la personne a refusé. En 2018, Instagram a réclamé pendant des mois l’activation des notifications, avec « Plus tard » pour seul refus. Chaque interruption est une taxe sur l’attention, jusqu’à ce qu’on cède.
- **Comparaison empêchée** (*comparison prevention*) : prix et caractéristiques présentés de façon incomparable — unités différentes, critères qui changent d’une offre à l’autre, détails cachés — pour orienter vers l’offre la plus chère.
- **Questions pièges** (*trick wording*) : double négation, cases dont le sens alterne, phrases qui disent l’inverse de ce qu’elles semblent dire à la lecture rapide. Ryanair a longtemps caché le refus de son assurance voyage dans la liste des pays de résidence, entre la Lettonie et la Lituanie.
- **Présélection** (*preselection*) : une option avantageuse pour le service, cochée d’avance — on exploite l’effet de défaut et l’inattention.
- **Obstruction** en général : des obstacles posés pour épuiser et faire renoncer.

Le DSA cite trois de ces pratiques parmi celles que la Commission peut encadrer : mettre davantage en avant certains choix, redemander un choix déjà fait, rendre la résiliation plus compliquée que l’inscription.`,
      examples: [
        {
          title: 'Un vrai « non », qui reste un non',
          bad: {
            alt: 'Fenêtre « Activer les notifications ? » promettant de ne manquer aucune promotion, avec un gros bouton « Activer » et un petit lien « Plus tard ».',
            html: fr(`<div class="mk-pad"><div class="nt mk-stack" style="--gap:10px"><i data-icon="bell" style="--ico:28px"></i><p class="mk-h3">Activer les notifications ?</p><p class="mk-small mk-muted">Ne manquez aucune promotion ni aucune nouveauté !</p><span class="mk-btn mk-btn--block">Activer</span><span class="nt-later">Plus tard</span></div></div>`),
            css: `.nt { padding: 18px; border-radius: 16px; border: 1px solid #e1e4ea; text-align: center; align-items: center; }
.nt-later { font-size: 13px; color: #5a6172; }`,
          },
          badNote: '« Plus tard » n’est pas un refus : la question reviendra à la prochaine ouverture.',
          good: {
            alt: 'Fenêtre « Être prévenu quand votre colis part ? » précisant une notification par commande sans publicité, avec deux boutons de même taille « Non merci » et « Activer », et la mention que le réglage est modifiable.',
            html: fr(`<div class="mk-pad"><div class="nt mk-stack" style="--gap:10px"><i data-icon="truck" style="--ico:28px"></i><p class="mk-h3">Être prévenu quand votre colis part ?</p><p class="mk-small mk-muted">Une notification par commande. Pas de publicité.</p><div class="mk-grid" style="--cols:2;--gap:8px;width:100%"><span class="mk-btn mk-btn--ghost">Non merci</span><span class="mk-btn">Activer</span></div><p class="mk-small mk-muted">Modifiable à tout moment dans Réglages.</p></div></div>`),
            css: `.nt { padding: 18px; border-radius: 16px; border: 1px solid #e1e4ea; text-align: center; align-items: center; }`,
          },
          goodNote: 'Un bénéfice précis, un vrai refus de même taille, et un moyen de changer d’avis.',
        },
      ],
    },
    {
      id: 'consentement',
      title: 'Consentement et cookies : ce que dit le droit',
      body: `### Le RGPD
Le consentement est une « manifestation de volonté, **libre, spécifique, éclairée et univoque** », donnée « par une déclaration ou par un acte positif clair » (article 4).

- **Libre** : refuser ne doit pas pénaliser. Subordonner un service à un consentement qui ne lui est pas nécessaire compromet ce caractère libre (article 7).
- **Spécifique** : une case par finalité, pas un accord global noyé dans les conditions générales.
- **Éclairé** : on sait qui collecte, quoi, et pour quoi faire.
- **Univoque** : un acte positif. « Il ne saurait y avoir de consentement en cas de silence, de cases cochées par défaut ou d’inactivité » (considérant 32) ; la Cour de justice de l’UE l’a confirmé pour les cookies (arrêt Planet49, 2019).
- Et « il est aussi simple de retirer que de donner son consentement » (article 7).

### La CNIL et les cookies
« L’utilisateur doit pouvoir accepter ou refuser les cookies avec le même degré de simplicité. » Un bouton « Tout refuser » **au même niveau et au même format** que « Tout accepter » y répond ; un simple bouton « Paramétrer » à côté de « Tout accepter » ne suffit pas. Depuis ses lignes directrices de 2019, poursuivre sa navigation ne vaut plus consentement.

Fin 2021, la CNIL a sanctionné **Google (150 M€)** et **Facebook (60 M€)** : refuser les cookies demandait plusieurs clics, les accepter un seul. **TikTok** a écopé de **5 M€** pour le même motif, entre autres (décision rendue publique en janvier 2023).

### Le DSA
Le règlement sur les services numériques (2022), applicable à toutes les plateformes en ligne depuis le 17 février 2024, interdit à son **article 25** de concevoir, d’organiser ou d’exploiter des interfaces « de façon à tromper ou à manipuler » leurs utilisateurs, ou d’altérer substantiellement leur capacité à prendre des décisions libres et éclairées. Il complète le RGPD et le droit de la consommation, qui continuent de s’appliquer à ce qu’ils couvrent.`,
      examples: [
        {
          title: 'Refuser aussi simplement qu’accepter',
          bad: {
            alt: 'Bandeau de cookies annonçant 214 partenaires et que poursuivre la navigation vaut accord, avec un gros bouton « Accepter et continuer » et un petit lien gris « Paramétrer ».',
            html: fr(`<div class="ck-page"><div class="ck mk-stack" style="--gap:10px"><p class="mk-h3">Nous respectons votre vie privée</p><p class="mk-small">Nous et nos 214 partenaires utilisons des cookies pour personnaliser le contenu et la publicité et mesurer l’audience. En poursuivant votre navigation, vous acceptez leur utilisation.</p><span class="mk-btn mk-btn--block">Accepter et continuer</span><span class="ck-faint">Paramétrer</span></div></div>`),
            css: CK_CSS,
          },
          badNote: 'Accepter en un clic, refuser via un lien pâle puis des réglages — et la navigation présentée comme un accord.',
          good: {
            alt: 'Bandeau de cookies décrivant les finalités, avec deux boutons identiques « Tout refuser » et « Tout accepter », et un lien « Personnaliser mes choix ».',
            html: fr(`<div class="ck-page"><div class="ck mk-stack" style="--gap:10px">${CK_TEXT}<div class="mk-grid" style="--cols:2;--gap:8px"><span class="mk-btn ck-btn">Tout refuser</span><span class="mk-btn ck-btn">Tout accepter</span></div><span class="ck-link">Personnaliser mes choix</span></div></div>`),
            css: CK_CSS,
          },
          goodNote: '« Tout refuser » et « Tout accepter » au même niveau et au même format ; le détail reste accessible.',
        },
      ],
    },
    {
      id: 'concevoir',
      title: 'Concevoir des choix honnêtes',
      body: `Une check-list à passer sur chaque écran où l’entreprise a un intérêt dans la décision :

1. **Symétrie** : dire non coûte le même effort que dire oui — même niveau, même format, même nombre d’étapes.
2. **Défauts neutres** : aucune case cochée d’avance pour une option payante ou un partage de données.
3. **Prix complet d’emblée** : le total, frais compris, dès la première étape.
4. **Mots clairs** : une case, une phrase affirmative ; cocher veut dire oui. Pas de double négation.
5. **Vraies données** : urgence, stock, avis et « populaire » reposent sur des faits vérifiables.
6. **Sortie facile** : résilier par le même canal, avec à peu près le même effort que pour s’abonner ; rappeler la fin d’un essai gratuit.
7. **Un non respecté** : ne pas redemander à chaque visite ; proposer « Ne plus demander ».
8. **Lisibilité égale** : ce qui engage (prix, durée, renouvellement) est au moins aussi lisible que l’argument commercial.

La CNIL défend aussi l’idée de **frictions désirables** (*La forme des choix*, 2019) : ralentir volontairement aux moments qui engagent — partager des données, confirmer un paiement — pour laisser le temps de comprendre. La friction n’est pas l’ennemie ; c’est sa **direction** qui compte : elle doit protéger la personne, pas la piéger.

Impeccable va dans le même sens : ne jamais simuler un travail ni retarder un résultat pour la mise en scène, ne jamais inventer une progression, et traiter avec sérieux tout ce qui touche à la vie privée, au paiement et à la suppression.`,
    },
  ],
  rules: [
    { id: 'definition', front: 'Qu’est-ce qu’un motif trompeur (deceptive pattern) ?', back: 'Une interface qui pousse à une action que la personne n’aurait pas choisie en connaissance de cause, en exploitant ses biais ou en lui cachant l’information.' },
    { id: 'test', front: 'Quelles questions séparent persuasion et tromperie ?', back: 'Est-ce vrai ? Est-ce symétrique (non aussi simple que oui) ? La personne serait-elle d’accord si elle voyait tout ?' },
    { id: 'confirmshaming', front: 'Qu’est-ce que le confirmshaming ?', back: 'Culpabiliser le refus (« Non merci, je préfère payer plein tarif »). Un refus se formule de façon neutre : « Non merci ».' },
    { id: 'urgency', front: 'Fausse urgence : que dit le droit ?', back: 'Annoncer faussement qu’une offre ne dure que très peu de temps pour obtenir une décision immédiate est sur la liste noire européenne des pratiques déloyales.' },
    { id: 'sneak', front: 'Une option payante cochée d’avance dans un panier, c’est permis ?', back: 'Non : tout paiement supplémentaire exige un consentement exprès ; déduit d’une option par défaut, il ouvre droit au remboursement (directive 2011/83/UE, art. 22).' },
    { id: 'hidden-costs', front: 'Comment éviter les coûts cachés ?', back: 'Afficher le prix total, frais compris, dès la première étape du parcours.' },
    { id: 'subscription', front: 'Comment rendre un essai gratuit honnête ?', back: 'Dire d’emblée le prix après l’essai, aussi lisiblement que l’offre, et envoyer un rappel avant la fin.' },
    { id: 'cancel', front: 'Résilier un abonnement pris en ligne : que dit la loi française ?', back: 'Depuis le 1er juin 2023, ce qui peut se souscrire en ligne doit pouvoir se résilier en ligne, par une fonction gratuite et facile d’accès.' },
    { id: 'consent', front: 'Quelles sont les quatre qualités d’un consentement RGPD ?', back: 'Libre, spécifique, éclairé et univoque — exprimé par un acte positif clair.' },
    { id: 'precheck', front: 'Une case cochée par défaut vaut-elle consentement ?', back: 'Non : ni silence, ni case précochée, ni inactivité (considérant 32 du RGPD, arrêt Planet49 de 2019).' },
    { id: 'cookies', front: 'Que demande la CNIL pour le refus des cookies ?', back: 'Refuser aussi simplement qu’accepter : « Tout refuser » au même niveau et au même format que « Tout accepter ». Un « Paramétrer » seul ne suffit pas.' },
    { id: 'fines', front: 'Quelles sanctions la CNIL a-t-elle prononcées pour des refus de cookies trop compliqués ?', back: 'Google 150 M€ et Facebook 60 M€ (fin 2021), TikTok 5 M€ (rendue publique en janvier 2023).' },
    { id: 'dsa', front: 'Que prévoit l’article 25 du DSA ?', back: 'Il interdit aux plateformes en ligne les interfaces qui trompent, manipulent ou altèrent substantiellement les décisions libres et éclairées.' },
    { id: 'nagging', front: 'Comment éviter le harcèlement (nagging) ?', back: 'Offrir un vrai « non » (« Non merci », « Ne plus demander ») et ne pas redemander un choix déjà fait.' },
  ],
  exercises: [
    {
      id: 'dark-patterns-cookie-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Lequel de ces bandeaux respecte l’exigence de la CNIL sur le refus des cookies ?',
      context: 'Site de recettes de cuisine, premier affichage.',
      options: [
        {
          id: 'settings',
          visual: {
            alt: 'Bandeau de cookies avec deux boutons empilés : « Tout accepter » en plein et « Paramétrer » en contour.',
            html: fr(`<div class="ck-page"><div class="ck mk-stack" style="--gap:10px">${CK_TEXT}<span class="mk-btn mk-btn--block ck-btn">Tout accepter</span><span class="mk-btn mk-btn--block mk-btn--ghost">Paramétrer</span></div></div>`),
            css: CK_CSS,
          },
          why: 'Pas de refus au premier niveau : il faut ouvrir les réglages et tout décocher, soit plusieurs clics contre un seul pour accepter. La CNIL juge qu’un « Paramétrer » seul ne suffit pas.',
        },
        {
          id: 'faint',
          visual: {
            alt: 'Bandeau de cookies avec un gros bouton « Tout accepter » et, dessous, un petit lien gris pâle « Tout refuser ».',
            html: fr(`<div class="ck-page"><div class="ck mk-stack" style="--gap:10px">${CK_TEXT}<span class="mk-btn mk-btn--block ck-btn">Tout accepter</span><span class="ck-faint">Tout refuser</span></div></div>`),
            css: CK_CSS,
          },
          why: 'Le refus existe, mais en petit lien pâle face à un gros bouton : il n’est ni au même niveau ni au même format.',
        },
        {
          id: 'equal',
          visual: {
            alt: 'Bandeau de cookies avec deux boutons identiques empilés, « Tout refuser » et « Tout accepter », et un lien « Personnaliser mes choix ».',
            html: fr(`<div class="ck-page"><div class="ck mk-stack" style="--gap:10px">${CK_TEXT}<span class="mk-btn mk-btn--block ck-btn">Tout refuser</span><span class="mk-btn mk-btn--block ck-btn">Tout accepter</span><span class="ck-link">Personnaliser mes choix</span></div></div>`),
            css: CK_CSS,
          },
          why: 'Deux boutons identiques, au même niveau : refuser coûte exactement autant qu’accepter.',
        },
      ],
      answer: 'equal',
      explanation: `La règle française : « L’utilisateur doit pouvoir accepter ou refuser les cookies avec le même degré de simplicité. » La CNIL précise qu’un bouton « Tout refuser » **au même niveau et au même format** que « Tout accepter » y répond, et qu’un simple « Paramétrer » à côté de « Tout accepter » ne suffit pas.

Fin 2021, elle a sanctionné Google (150 M€) et Facebook (60 M€) parce que refuser demandait plusieurs clics quand accepter n’en demandait qu’un. Réduire le refus à un petit lien pâle contourne la règle par l’**interférence visuelle** : le choix existe, mais il est rendu difficile à voir.`,
      takeaway: 'Refuser les cookies doit être aussi simple qu’accepter : « Tout refuser » au même niveau et au même format que « Tout accepter ».',
      sources: [CNIL_REFUS, 'cnil:cookies', CNIL_GOOGLE_FB],
    },
    {
      id: 'dark-patterns-confirmshaming-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle fenêtre d’inscription à la lettre d’information respecte la personne qui refuse ?',
      options: [
        {
          id: 'shame',
          visual: {
            height: 330,
            alt: 'Fenêtre proposant -10 % contre une inscription, avec un bouton « J’en profite » et un lien de refus « Non merci, je préfère payer plein tarif ».',
            html: newsDialog('Non merci, je préfère payer plein tarif'),
            css: `.cs-no { font-size: 13px; color: #3a4152; text-decoration: underline; }`,
          },
          why: 'Le refus est rédigé pour culpabiliser celle ou celui qui le choisit : c’est du confirmshaming.',
        },
        {
          id: 'neutral',
          visual: {
            height: 330,
            alt: 'Même fenêtre avec un lien de refus « Non merci » et la mention « Un e-mail par semaine, désinscription en un clic ».',
            html: newsDialog('Non merci', '<p class="mk-small mk-muted">Un e-mail par semaine, désinscription en un clic.</p>'),
            css: `.cs-no { font-size: 13px; color: #3a4152; text-decoration: underline; }`,
          },
          why: 'Le refus est neutre et la fréquence des envois annoncée : on choisit en connaissance de cause.',
        },
      ],
      answer: 'neutral',
      explanation: `Le **confirmshaming** manipule par la culpabilité ou la honte : l’option de refus est rédigée pour rabaisser qui la choisit. Le site Deceptive Patterns cite un vendeur de trousses de premiers secours dont le lien de refus disait, en substance, « Non, je préfère me vider de mon sang ».

L’offre elle-même n’a rien de trompeur ; c’est la formulation du refus qui l’est. Un refus se rédige de façon neutre et courte : « Non merci ».`,
      takeaway: 'Un refus se formule de façon neutre (« Non merci ») : culpabiliser celui qui dit non est un motif trompeur.',
      sources: [dp('confirmshaming', 'Confirmshaming'), 'imp:clarify'],
    },
    {
      id: 'dark-patterns-urgency-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle fiche produit te donne des informations sur lesquelles tu peux t’appuyer ?',
      context: 'Boutique en ligne de literie, matelas en promotion.',
      options: [
        {
          id: 'pressure',
          visual: {
            alt: 'Fiche de matelas en promotion avec un bandeau rouge « Offre flash : se termine dans 00:09:58 », « Plus que 2 en stock ! » et « 17 personnes regardent ce produit ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:8px">${MATTRESS_HEAD}<div class="ug-timer"><i data-icon="clock"></i><span>Offre flash : se termine dans <b>00:09:58</b></span></div><p class="ug-red"><i data-icon="flame"></i>Plus que 2 en stock !</p><p class="ug-red"><i data-icon="eye"></i>17 personnes regardent ce produit</p><span class="mk-btn mk-btn--block">J’en profite</span></div>`),
            css: `.ug-timer { display: flex; align-items: center; gap: 6px; padding: 8px 10px; border-radius: 8px; background: #b3261e; color: #fff; font-size: 13px; --ico: 16px; }
.ug-timer b { font-variant-numeric: tabular-nums; }
.ug-red { display: flex; align-items: center; gap: 6px; color: #b3261e; font-weight: 700; font-size: 13px; --ico: 15px; }`,
          },
          why: 'Un compte à rebours sans date, un stock et une affluence invérifiables : tout pousse à décider vite, rien n’aide à décider bien.',
        },
        {
          id: 'honest',
          visual: {
            alt: 'Même fiche indiquant « Promotion jusqu’au dimanche 15 novembre, 23 h 59 », « En stock, livré en 5 jours ouvrés » et « 4,6/5, 312 avis d’acheteurs vérifiés ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:8px">${MATTRESS_HEAD}<p class="ug-ok"><i data-icon="calendar"></i><span>Promotion jusqu’au dimanche 15 novembre, 23 h 59</span></p><p class="ug-ok"><i data-icon="truck"></i><span>En stock · livré en 5 jours ouvrés</span></p><p class="ug-ok"><i data-icon="star"></i><span>4,6/5 · 312 avis d’acheteurs vérifiés</span></p><span class="mk-btn mk-btn--block">Ajouter au panier</span></div>`),
            css: `.ug-ok { display: flex; align-items: center; gap: 6px; font-size: 13px; --ico: 15px; }`,
          },
          why: 'Une date de fin réelle, un délai de livraison, des avis vérifiés : la promotion reste attractive, et vérifiable.',
        },
      ],
      answer: 'honest',
      explanation: `**Fausse urgence** et **fausse rareté** exploitent la pression du temps et la peur de manquer : sous pression, on évalue moins bien. Les signes : compte à rebours sans date qui repart à chaque visite, « plus que 2 » permanent, compteurs d’affluence tirés au hasard.

Quand c’est faux, c’est aussi illégal : la directive européenne sur les pratiques commerciales déloyales range parmi les pratiques toujours interdites le fait de déclarer faussement qu’un produit ne sera disponible que très peu de temps pour obtenir une décision immédiate. Une vraie promotion se date.`,
      takeaway: 'Une urgence honnête est datée et vérifiable ; un compte à rebours qui repart ou un stock invérifiable est un motif trompeur.',
      sources: [dp('fake-urgency', 'Fake urgency'), dp('fake-scarcity', 'Fake scarcity'), UCPD],
    },
    {
      id: 'dark-patterns-trick-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Avec quel formulaire sais-tu exactement à quoi tu consens ?',
      options: [
        {
          id: 'trick',
          visual: {
            alt: 'Création de compte avec deux cases : une case cochée d’avance « Ne pas décocher cette case si vous ne souhaitez pas manquer nos offres » et une case vide « Cochez cette case pour ne pas recevoir les offres de nos partenaires ».',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">${ACCOUNT_HEAD}<span class="mk-check mk-check--on tq">Ne pas décocher cette case si vous ne souhaitez pas manquer nos offres.</span><span class="mk-check tq">Cochez cette case pour ne pas recevoir les offres de nos partenaires.</span><span class="mk-btn mk-btn--block">Créer mon compte</span></div>`),
            css: `.tq { align-items: flex-start; font-size: 13px; line-height: 1.4; }
.tq::before { margin-top: 1px; }`,
          },
          why: 'Double négation, sens inversé d’une case à l’autre, case cochée d’avance : il faut relire trois fois pour savoir ce qu’on accepte.',
        },
        {
          id: 'clear',
          visual: {
            alt: 'Création de compte avec deux cases vides : « Recevoir nos offres par e-mail (2 par mois) » et « Recevoir les offres de nos partenaires par e-mail », et la mention que c’est modifiable dans le compte.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">${ACCOUNT_HEAD}<span class="mk-check tq">Recevoir nos offres par e-mail (2 par mois)</span><span class="mk-check tq">Recevoir les offres de nos partenaires par e-mail</span><p class="mk-small mk-muted">Modifiable à tout moment dans votre compte.</p><span class="mk-btn mk-btn--block">Créer mon compte</span></div>`),
            css: `.tq { align-items: flex-start; font-size: 13px; line-height: 1.4; }
.tq::before { margin-top: 1px; }`,
          },
          why: 'Une case par finalité, des phrases affirmatives, rien de coché : cocher veut dire oui.',
        },
      ],
      answer: 'clear',
      explanation: `Les **questions pièges** (*trick wording*) exploitent la lecture en diagonale : la phrase semble dire une chose et en dit une autre. Double négation, sens qui alterne d’une case à l’autre, case précochée — on finit par accepter ce qu’on croyait refuser.

C’est aussi un problème juridique : le RGPD exige un consentement **éclairé** et **univoque**, et une case cochée d’avance ne vaut pas consentement. La règle d’écriture : une case, une finalité, une phrase affirmative, décochée par défaut.`,
      takeaway: 'Une case = une finalité, en phrase affirmative, décochée par défaut : cocher doit toujours vouloir dire oui.',
      sources: [dp('trick-wording', 'Trick wording'), dp('preselection', 'Preselection'), RGPD],
    },
    {
      id: 'dark-patterns-comparison-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sur quelle page peux-tu comparer les trois formules d’un coup d’œil ?',
      context: 'Abonnement à un service de vidéo à la demande, trois formules sans engagement.',
      options: [
        {
          id: 'scrambled',
          visual: {
            alt: 'Trois cartes de formules aux prix exprimés dans trois unités différentes — 1,38 € par semaine, 13,49 € par mois, 239,88 € par an — et aux caractéristiques décrites différemment.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Choisissez votre formule</p><div class="mk-grid" style="--cols:3;--gap:8px"><div class="cp"><b>Essentiel</b><p class="cp-price">1,38 €<small>/semaine</small></p><p class="mk-small">Avec publicités · HD</p></div><div class="cp"><b>Standard</b><p class="cp-price">13,49 €<small>/mois</small></p><p class="mk-small">2 écrans en même temps</p></div><div class="cp"><b>Premium</b><p class="cp-price">239,88 €<small>/an</small></p><p class="mk-small">Qualité maximale · <u>voir conditions</u></p></div></div></div>`),
            css: `.cp { display: flex; flex-direction: column; gap: 4px; padding: 10px 8px; border: 1px solid #dfe3ea; border-radius: 10px; }
.cp { min-width: 0; overflow-wrap: anywhere; }
.cp-price { font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1.2; }
.cp-price small { display: block; font-size: 11px; font-weight: 500; color: #5a6172; }`,
          },
          why: 'Prix à la semaine, au mois et à l’an, caractéristiques décrites sans critères communs : il faut convertir et deviner pour comparer.',
        },
        {
          id: 'aligned',
          visual: {
            alt: 'Tableau comparant les trois formules sur les mêmes lignes : prix par mois (5,99 €, 13,49 €, 19,99 €), publicités, qualité et nombre d’écrans simultanés.',
            html: fr(`<div class="mk-pad mk-stack" style="--gap:10px"><p class="mk-h3">Choisissez votre formule</p><table class="cp-t"><thead><tr><th></th><th>Essentiel</th><th>Standard</th><th>Premium</th></tr></thead><tbody><tr><th>Prix par mois</th><td>5,99 €</td><td>13,49 €</td><td>19,99 €</td></tr><tr><th>Publicités</th><td>Oui</td><td>Non</td><td>Non</td></tr><tr><th>Qualité</th><td>HD</td><td>Full HD</td><td>4K</td></tr><tr><th>Écrans simultanés</th><td>1</td><td>2</td><td>4</td></tr></tbody></table><p class="mk-small mk-muted">Sans engagement, résiliable en ligne.</p></div>`),
            css: `.cp-t { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.cp-t th, .cp-t td { padding: 7px 3px; border-bottom: 1px solid #eceef2; text-align: center; overflow-wrap: anywhere; }
.cp-t th:first-child { width: 34%; }
.cp-t tbody th { text-align: start; font-weight: 600; color: #3a4152; }`,
          },
          why: 'Même unité de prix, mêmes lignes de critères : les différences sautent aux yeux.',
        },
      ],
      answer: 'aligned',
      explanation: `La **comparaison empêchée** (*comparison prevention*) rend la comparaison si pénible qu’on renonce — et qu’on se rabat sur l’offre mise en avant ou la plus chère. Les ficelles : unités différentes (semaine, mois, an), caractéristiques sans critères communs, détails cachés derrière des liens.

Ici, les deux pages décrivent les mêmes offres : 1,38 € par semaine font bien 5,99 € par mois, et 239,88 € par an, 19,99 € par mois. Seule la version recommandée permet de le voir sans calculer. C’est aussi une question de charge cognitive : un tableau côte à côte retient l’information à la place de la personne.`,
      takeaway: 'Présente les offres dans la même unité et selon les mêmes critères : empêcher la comparaison est un motif trompeur.',
      sources: [dp('comparison-prevention', 'Comparison prevention'), 'deceptive'],
    },
    {
      id: 'dark-patterns-checkout-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Ce tunnel d’achat de billet de train cache deux pièges. Trouve-les.',
      context: 'Sur la page de résultats, le billet était annoncé à 29 €.',
      visual: {
        frame: 'browser',
        alt: 'Récapitulatif d’achat d’un billet Paris-Lyon : billet à 29 €, place côté fenêtre gratuite, assurance annulation à 6,90 € cochée d’avance, total de 39,40 € avec une mention minuscule et pâle de frais de service, et un bouton « Payer 39,40 € ».',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
<div><p class="mk-small mk-muted">Étape 3 sur 3 · Récapitulatif</p><p class="mk-h2">Votre voyage</p></div>
<div class="co-trip" data-hotspot="trip"><i data-icon="train-front"></i><div><b>Paris → Lyon</b><p class="mk-small mk-muted">ven. 13 novembre · 07:56 → 09:52 · 1 passager</p></div></div>
<div class="co-lines">
<div class="mk-row mk-between"><span>Billet 2de classe</span><span class="mk-price">29,00 €</span></div>
<div class="mk-row mk-between" data-hotspot="seat"><span>Place côté fenêtre</span><span>Gratuit</span></div>
<div class="mk-row mk-between" data-hotspot="insurance"><span class="mk-check mk-check--on">Assurance annulation Sérénité</span><span class="mk-price">6,90 €</span></div>
</div>
<div class="co-total"><div class="mk-row mk-between mk-strong"><span>Total</span><span class="mk-price">39,40 €</span></div><p class="co-fee" data-hotspot="fees">dont frais de service : 3,50 €</p></div>
<span class="mk-btn mk-btn--block" data-hotspot="pay">Payer 39,40 €</span>
</div>`),
        css: `.co-trip { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #f4f6f9; }
.co-lines { display: flex; flex-direction: column; gap: 8px; }
.co-total { border-top: 1px solid #e3e6ec; padding-top: 10px; }
.co-fee { width: fit-content; margin: 4px 0 0 auto; font-size: 10px; color: #a3a9b5; }`,
      },
      hotspots: [
        { id: 'insurance', label: 'Assurance cochée d’avance', correct: true, why: 'Panier piégé par présélection : une option payante ajoutée sans demande. Tout paiement supplémentaire exige un consentement exprès ; à défaut, le client a droit au remboursement.' },
        { id: 'fees', label: 'Frais de service en petit et en pâle', correct: true, why: 'Coûts cachés et interférence visuelle : 3,50 € de frais découverts au dernier écran, dans une mention presque illisible.' },
        { id: 'trip', label: 'Rappel du trajet', correct: false, why: 'Le rappel du trajet évite d’avoir à retenir ses choix : c’est une bonne pratique.' },
        { id: 'seat', label: 'Place côté fenêtre', correct: false, why: 'Option gratuite, choisie par la personne : rien à redire.' },
        { id: 'pay', label: 'Bouton « Payer 39,40 € »', correct: false, why: 'Le bouton annonce le montant exact : c’est honnête. Le problème est ce que contient ce montant.' },
      ],
      explanation: `Deux motifs trompeurs classiques des tunnels d’achat :

- **Panier piégé par présélection** : l’assurance est cochée d’avance. La directive 2011/83/UE (article 22) impose le consentement exprès du consommateur pour tout paiement supplémentaire ; une option par défaut qu’il faut décocher ne suffit pas et ouvre droit au remboursement.
- **Coûts cachés** : annoncé 29 €, le billet coûte 32,50 € une fois ajoutés les frais révélés au dernier écran, en petit et en pâle. Le prix annoncé au départ doit être le prix payé.

Le rappel du trajet et le bouton qui annonce le montant sont, eux, de bonnes pratiques.`,
      takeaway: 'Aucune option payante cochée d’avance, et un prix total — frais compris — annoncé dès le début du parcours.',
      sources: [dp('sneaking', 'Sneaking'), dp('hidden-costs', 'Hidden costs'), CRD],
    },
    {
      id: 'dark-patterns-cookie-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Dans ce panneau de réglage des cookies, trouve les deux pratiques non conformes.',
      visual: {
        alt: 'Panneau « Vos préférences de cookies » : un texte disant que poursuivre la navigation vaut accord, une ligne de cookies strictement nécessaires toujours actifs, trois interrupteurs déjà activés (mesure d’audience, publicité personnalisée, réseaux sociaux), un lien vers 214 partenaires, et deux boutons « Tout refuser » et « Enregistrer mes choix ».',
        html: fr(`<div class="mk-pad mk-stack" style="--gap:12px">
<p class="mk-h3">Vos préférences de cookies</p>
<p class="mk-small" data-hotspot="intro">Nous utilisons des cookies pour améliorer votre expérience. En poursuivant votre navigation, vous acceptez leur utilisation.</p>
<div class="cs-row" data-hotspot="necessary"><div><b>Strictement nécessaires</b><p class="mk-small mk-muted">Connexion, panier, sécurité</p></div><span class="mk-small mk-muted">Toujours actifs</span></div>
<div data-hotspot="toggles">
<div class="cs-row"><div><b>Mesure d’audience</b><p class="mk-small mk-muted">Statistiques de fréquentation</p></div><span class="mk-toggle mk-toggle--on"></span></div>
<div class="cs-row"><div><b>Publicité personnalisée</b><p class="mk-small mk-muted">Annonces selon vos centres d’intérêt</p></div><span class="mk-toggle mk-toggle--on"></span></div>
<div class="cs-row"><div><b>Réseaux sociaux</b><p class="mk-small mk-muted">Boutons de partage, vidéos intégrées</p></div><span class="mk-toggle mk-toggle--on"></span></div>
</div>
<span class="cs-partners" data-hotspot="partners">Voir la liste de nos 214 partenaires</span>
<div class="mk-grid" style="--cols:2;--gap:8px" data-hotspot="buttons"><span class="mk-btn mk-btn--ghost">Tout refuser</span><span class="mk-btn mk-btn--ghost">Enregistrer mes choix</span></div>
</div>`),
        css: `.cs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid #eceef2; font-size: 13px; }
.cs-partners { align-self: flex-start; font-size: 12px; color: #1f4fd8; text-decoration: underline; }`,
      },
      hotspots: [
        { id: 'intro', label: '« En poursuivant votre navigation, vous acceptez »', correct: true, why: 'Poursuivre la navigation n’est pas un acte positif clair : ce n’est pas un consentement.' },
        { id: 'toggles', label: 'Interrupteurs activés d’avance', correct: true, why: 'Les finalités soumises au consentement sont activées par défaut : comme une case précochée, cela ne vaut pas accord.' },
        { id: 'necessary', label: 'Cookies strictement nécessaires « toujours actifs »', correct: false, why: 'Les cookies indispensables au service (connexion, panier, sécurité) n’exigent pas de consentement : les afficher toujours actifs est correct.' },
        { id: 'partners', label: 'Liste des partenaires', correct: false, why: 'Nommer les destinataires sert le caractère éclairé du consentement : c’est une bonne pratique.' },
        { id: 'buttons', label: 'Boutons « Tout refuser » et « Enregistrer mes choix »', correct: false, why: 'Le refus global est proposé, au même format que l’enregistrement des choix : conforme.' },
      ],
      explanation: `Le RGPD exige un consentement donné par un **acte positif clair**. Deux pratiques le contournent ici :

- **« En poursuivant votre navigation, vous acceptez »** : le silence et l’inactivité ne valent pas consentement (considérant 32), et la CNIL a abandonné cette tolérance dès ses lignes directrices de 2019.
- **Interrupteurs activés d’avance** : c’est l’équivalent d’une case précochée, que la Cour de justice de l’UE a jugée sans valeur pour les cookies (arrêt Planet49, 2019).

Les cookies strictement nécessaires, eux, peuvent rester actifs sans consentement.`,
      takeaway: 'Ni « en poursuivant, vous acceptez », ni interrupteurs activés d’avance : chaque finalité démarre désactivée et s’active par un geste de la personne.',
      sources: [RGPD, PLANET49, 'cnil:cookies', dp('preselection', 'Preselection')],
    },
    {
      id: 'dark-patterns-cancel-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Ce parcours de résiliation cumule les freins. Trouve les trois pratiques trompeuses.',
      context: 'L’abonnement Premium a été souscrit en ligne, en deux clics.',
      visual: {
        frame: 'phone',
        alt: 'Écran « Résilier Premium » sur téléphone : date de fin d’accès, mention des téléchargements retirés, un questionnaire obligatoire de 50 caractères minimum, un gros bouton « Garder Premium », un petit lien pâle « Je préfère perdre toute ma musique » et une consigne d’appeler un numéro surtaxé pour finaliser.',
        html: fr(`<div class="cn">
<div class="mk-row cn-top" style="--gap:4px"><i data-icon="chevron-left"></i><b>Résilier Premium</b></div>
<div class="mk-pad mk-stack" style="--gap:12px">
<p class="mk-small" data-hotspot="date">Votre accès Premium reste actif jusqu’au 30 novembre.</p>
<p class="mk-small" data-hotspot="downloads">Vos titres téléchargés pour l’écoute hors connexion seront retirés à cette date.</p>
<div class="mk-field" data-hotspot="survey"><span class="mk-label">Pourquoi partez-vous ? (obligatoire)</span><span class="mk-input cn-area">Minimum 50 caractères</span></div>
<span class="mk-btn mk-btn--block">Garder Premium</span>
<span class="cn-shame" data-hotspot="shame">Je préfère perdre toute ma musique</span>
<p class="cn-phone" data-hotspot="phone"><i data-icon="phone" style="--ico:14px"></i><span>Pour finaliser, appelez le 0 892 68 12 34 (0,35 € / min), du lundi au vendredi.</span></p>
</div></div>`),
        css: `.cn-top { padding: 10px 14px; border-bottom: 1px solid #eceef2; }
.cn-area { min-height: 64px; color: #6b7280; font-size: 13px; }
.cn-shame { align-self: center; font-size: 11px; color: #a3a9b5; text-decoration: underline; }
.cn-phone { display: flex; gap: 6px; align-items: flex-start; padding: 8px 10px; border-radius: 8px; background: #f4f6f9; font-size: 12px; color: #3a4152; }`,
      },
      hotspots: [
        { id: 'survey', label: 'Questionnaire obligatoire', correct: true, why: 'Obstruction : un texte de 50 caractères minimum, imposé pour épuiser la personne avant qu’elle puisse partir.' },
        { id: 'shame', label: 'Lien « Je préfère perdre toute ma musique »', correct: true, why: 'Confirmshaming et interférence visuelle : la résiliation est un petit lien pâle, rédigé pour culpabiliser.' },
        { id: 'phone', label: 'Finaliser par téléphone surtaxé', correct: true, why: 'Résiliation obstruée : souscrit en ligne, l’abonnement devrait se résilier en ligne, gratuitement — c’est la loi en France depuis le 1er juin 2023.' },
        { id: 'date', label: 'Date de fin d’accès', correct: false, why: 'Indiquer jusqu’à quand l’accès reste actif est une information honnête et utile.' },
        { id: 'downloads', label: 'Téléchargements retirés', correct: false, why: 'Prévenir des effets réels de la résiliation, sans dramatiser, aide à décider.' },
      ],
      explanation: `Le DSA cite, parmi les pratiques à encadrer, le fait de « rendre la procédure de désinscription d’un service plus compliquée que l’inscription à celui-ci ». Ici, trois freins :

- **Obstruction** : un questionnaire obligatoire, avec un minimum de caractères, pour lasser.
- **Confirmshaming et interférence visuelle** : la résiliation n’est qu’un petit lien pâle, formulé pour culpabiliser, face à un gros bouton « Garder Premium ».
- **Résiliation obstruée** : finir par téléphone, sur un numéro surtaxé, alors que l’abonnement se prend en ligne. En France, depuis le 1er juin 2023, ce qui se souscrit en ligne doit pouvoir se résilier en ligne, gratuitement.

Rappeler la date de fin d’accès et ce qui sera retiré relève, au contraire, de l’information honnête.`,
      takeaway: 'Résilier doit être aussi simple que s’abonner : même canal, pas de questionnaire obligatoire, un bouton clair et neutre.',
      sources: [dp('hard-to-cancel', 'Hard to cancel'), dp('obstruction', 'Obstruction'), dp('confirmshaming', 'Confirmshaming'), INC, DSA],
    },
    {
      id: 'dark-patterns-consent-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Laquelle de ces façons de recueillir l’accord pour une lettre d’information respecte le RGPD ?',
      options: [
        { id: 'precheck', label: 'Une case cochée d’avance : « J’accepte de recevoir la lettre d’information ».', why: 'Une case cochée par défaut ne vaut pas consentement (considérant 32).' },
        { id: 'bundled', label: '« En créant un compte, vous acceptez nos conditions générales et l’envoi de notre lettre d’information. »', why: 'Ni spécifique ni libre : l’accord est lié à la création du compte.' },
        { id: 'browse', label: 'Un message : « En poursuivant votre visite, vous acceptez de recevoir nos offres. »', why: 'L’inactivité n’est pas un acte positif clair.' },
        { id: 'optin', label: 'Une case décochée : « Recevoir la lettre d’information (1 e-mail par semaine) », et un lien de désinscription dans chaque e-mail.', why: 'Acte positif, finalité précise, information claire, retrait aussi simple que l’accord.' },
      ],
      answer: 'optin',
      explanation: `Le RGPD définit le consentement comme une manifestation de volonté **libre, spécifique, éclairée et univoque**, exprimée par une déclaration ou un **acte positif clair** (article 4). Chaque version fautive casse un critère :

- la case précochée et la poursuite de la visite ne sont pas des actes positifs (considérant 32 : ni silence, ni case cochée par défaut, ni inactivité) ;
- l’accord noyé dans les conditions générales n’est ni spécifique ni libre.

L’article 7 ajoute : retirer son consentement doit être aussi simple que le donner — d’où le lien de désinscription dans chaque envoi.`,
      takeaway: 'Consentement valide : une case décochée, une finalité précise, une information claire, et un retrait aussi simple que l’accord.',
      sources: [RGPD, PLANET49],
    },
    {
      id: 'dark-patterns-dsa-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Que prévoit l’article 25 du règlement européen sur les services numériques (DSA) ?',
      options: [
        { id: 'ban', label: 'Les plateformes en ligne ne doivent pas concevoir ou exploiter leurs interfaces de façon à tromper ou manipuler leurs utilisateurs, ou à altérer substantiellement leur capacité à décider librement et en connaissance de cause.', why: 'C’est le principe de l’article 25, applicable à toutes les plateformes en ligne depuis le 17 février 2024.' },
        { id: 'three-clicks', label: 'Tout site marchand doit proposer une résiliation en trois clics.', why: 'C’est une règle française (Code de la consommation, en vigueur depuis juin 2023), pas l’article 25 du DSA.' },
        { id: 'timers', label: 'Les comptes à rebours sont interdits sur tous les sites européens.', why: 'Le DSA vise la tromperie, pas un composant : un compte à rebours adossé à une vraie date reste possible.' },
        { id: 'cookies', label: 'Il remplace le RGPD pour les bandeaux de cookies.', why: 'Au contraire : l’article 25 ne s’applique pas aux pratiques déjà couvertes par le RGPD ou par la directive sur les pratiques commerciales déloyales.' },
      ],
      answer: 'ban',
      explanation: `L’article 25 du DSA (règlement (UE) 2022/2065) interdit aux **plateformes en ligne** les interfaces qui trompent, manipulent ou altèrent substantiellement la liberté de décision. La Commission peut en préciser l’application, notamment pour trois pratiques : mettre davantage en avant certains choix, redemander un choix déjà fait, rendre la résiliation plus compliquée que l’inscription.

Il **complète** les textes existants sans les remplacer : pour les cookies, le RGPD et la loi Informatique et Libertés, sous le contrôle de la CNIL ; pour les pratiques commerciales, le droit de la consommation.`,
      takeaway: 'Le DSA (art. 25) interdit aux plateformes les interfaces trompeuses ; il complète le RGPD et le droit de la consommation sans les remplacer.',
      sources: [DSA, INC],
    },
    {
      id: 'dark-patterns-persuasion-choice',
      type: 'choice',
      difficulty: 3,
      context: 'Ton équipe veut faire progresser la part d’abonnements annuels d’une application de méditation (6,99 € par mois, ou 69,90 € par an).',
      prompt: 'Quelle proposition relève de la persuasion honnête ?',
      options: [
        { id: 'saving', label: 'Mettre en avant la formule annuelle avec l’économie réelle : « 69,90 € par an, soit 2 mois offerts par rapport au mensuel ».', why: 'Une économie vraie, chiffrée et vérifiable : on oriente sans tromper.' },
        { id: 'monthly', label: 'Afficher l’annuel en gros comme « 5,83 € / mois », sans préciser que 69,90 € sont prélevés en une fois.', why: 'Le montant réellement prélevé est masqué : interférence visuelle et coûts cachés.' },
        { id: 'scarcity', label: 'Annoncer « Offre réservée aux 100 premiers inscrits » sans aucune limite réelle.', why: 'Fausse rareté : une limite inventée pour presser la décision.' },
        { id: 'shame', label: 'Formuler le refus : « Non merci, je n’ai pas besoin de me détendre ».', why: 'Confirmshaming : on culpabilise celui qui refuse.' },
      ],
      answer: 'saving',
      explanation: `La persuasion honnête utilise les mêmes leviers que la manipulation — mise en avant, cadrage, valeur — mais avec des **informations vraies et complètes**, et un refus qui reste simple et neutre. Le test : la personne serait-elle d’accord si elle voyait tout ?

Ici, l’économie annoncée est réelle et vérifiable : 12 × 6,99 € = 83,88 €, contre 69,90 €, soit 13,98 € d’écart — exactement deux mois. Les autres propositions ne fonctionnent que si la personne ne voit pas le montant prélevé, croit à une limite inventée ou se sent coupable de refuser.`,
      takeaway: 'Persuader honnêtement, c’est mettre en avant une option pour une vraie raison, chiffrée et vérifiable, en laissant le refus simple.',
      sources: ['deceptive', dp('fake-scarcity', 'Fake scarcity'), dp('confirmshaming', 'Confirmshaming')],
    },
    {
      id: 'dark-patterns-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquelles de ces pratiques sont des motifs trompeurs ?',
      options: [
        { id: 'reset', label: 'Un compte à rebours qui repart à zéro à chaque visite.', why: 'Fausse urgence : la limite de temps est inventée.' },
        { id: 'bestseller', label: 'Un badge « Meilleure vente » calculé sur les ventes réelles du mois.', why: 'Preuve sociale fondée sur des faits : honnête.' },
        { id: 'notnow', label: '« Activer les notifications ? Plus tard », seul choix proposé, redemandé chaque semaine.', why: 'Harcèlement : il n’y a pas de vrai non, et la demande revient jusqu’à ce qu’on cède.' },
        { id: 'reminder', label: 'Un e-mail de rappel trois jours avant la fin d’un essai gratuit.', why: 'Bonne pratique : c’est l’inverse d’un abonnement caché.' },
        { id: 'ad', label: 'Une publicité mise en forme comme un résultat de recherche, sans mention « Sponsorisé ».', why: 'Publicité déguisée : on clique en croyant ouvrir un contenu.' },
      ],
      answers: ['reset', 'notnow', 'ad'],
      explanation: `Ce qui sépare ces pratiques n’est pas le composant (badge, notification, e-mail) mais la **vérité** et la **symétrie** :

- un compte à rebours qui repart ment sur le temps ;
- « Plus tard » sans « Jamais » retire le droit de dire non — redemander un choix déjà fait fait partie des pratiques que cite le DSA ;
- une publicité non signalée ment sur la nature du contenu.

Un badge adossé à des ventes réelles et un rappel avant la fin d’un essai aident au contraire à décider.`,
      takeaway: 'Ce n’est pas le composant qui trompe, c’est le mensonge ou l’asymétrie : vérifie que l’information est vraie et que dire non reste libre.',
      sources: [dp('fake-urgency', 'Fake urgency'), dp('nagging', 'Nagging'), dp('disguised-ads', 'Disguised ads'), DSA],
    },
    {
      id: 'dark-patterns-precheck-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Une case « J’accepte de recevoir les offres de nos partenaires » cochée d’avance vaut consentement si la personne ne la décoche pas.',
      answer: false,
      explanation: `Le consentement exige un **acte positif clair**. Le RGPD l’écrit noir sur blanc : « il ne saurait y avoir de consentement en cas de silence, de cases cochées par défaut ou d’inactivité » (considérant 32). La Cour de justice de l’UE l’a confirmé en 2019 pour les cookies (arrêt Planet49).

La présélection exploite l’effet de défaut : beaucoup de gens ne lisent pas ou ne décochent pas. C’est précisément pourquoi elle ne prouve rien de leur volonté.`,
      takeaway: 'Une case cochée d’avance ne vaut jamais consentement : la case part décochée, et c’est la personne qui la coche.',
      sources: [RGPD, PLANET49, dp('preselection', 'Preselection')],
    },
    {
      id: 'dark-patterns-cancel-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'En France, un abonnement qui peut être souscrit en ligne doit pouvoir être résilié en ligne.',
      answer: true,
      explanation: `Depuis le **1er juin 2023**, un contrat qui peut être conclu par voie électronique doit pouvoir être résilié de la même façon, grâce à une fonction **gratuite, facile d’accès et clairement signalée** sur le site ou l’application : la « résiliation en trois clics ». Elle vaut même pour un contrat signé en boutique, dès lors que l’entreprise propose la souscription en ligne.

Cette règle ne supprime pas les préavis ou durées d’engagement prévus au contrat ; elle supprime l’obstacle du canal (lettre recommandée, téléphone).`,
      takeaway: 'Ce qui se souscrit en ligne se résilie en ligne, par une fonction gratuite et visible (France, depuis le 1er juin 2023).',
      sources: [INC, dp('hard-to-cancel', 'Hard to cancel')],
    },
    {
      id: 'dark-patterns-cancel-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range les étapes d’une résiliation en ligne conforme au droit français, de la première à la dernière.',
      items: [
        { id: 'entry', label: 'Ouvrir la fonction « Résilier votre contrat », gratuite et facile d’accès' },
        { id: 'info', label: 'Renseigner les informations demandées' },
        { id: 'recap', label: 'Vérifier le récapitulatif et le valider' },
        { id: 'notify', label: 'Envoyer la notification de résiliation' },
        { id: 'ack', label: 'Recevoir l’accusé de réception, puis la date de fin et les effets de la résiliation' },
      ],
      explanation: `La « résiliation en trois clics » en vigueur depuis le 1er juin 2023 suit ce chemin :

1. Un accès direct à la fonction de résiliation, **gratuite, permanente et facile d’accès**, clairement signalée.
2. Les informations nécessaires (identification, contrat concerné).
3. Un **récapitulatif** à vérifier et valider.
4. La **notification** de la résiliation, par un bouton explicite.
5. Le professionnel confirme la réception, puis informe de la **date de fin** du contrat et de ses effets.

Côté design, chaque étape doit rester sobre : pas de détour, pas de questionnaire obligatoire, pas de contre-offre qui masque le bouton.`,
      takeaway: 'Résiliation en ligne : accès direct et gratuit, informations, récapitulatif, notification, puis accusé de réception et date de fin.',
      sources: [INC],
    },
    {
      id: 'dark-patterns-match',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque motif trompeur à son exemple.',
      leftTitle: 'Motif',
      rightTitle: 'Exemple',
      pairs: [
        { id: 'shame', left: 'Confirmshaming', right: '« Non merci, je n’aime pas les bonnes affaires »' },
        { id: 'sneak', left: 'Panier piégé', right: 'Un don de 2 € ajouté au panier sans demande' },
        { id: 'roach', left: 'Résiliation obstruée', right: 'S’abonner en ligne, résilier par lettre recommandée' },
        { id: 'nag', left: 'Harcèlement', right: '« Activer la localisation ? Plus tard », à chaque ouverture' },
        { id: 'social', left: 'Fausse preuve sociale', right: '« 23 personnes regardent cet hôtel », chiffre tiré au hasard' },
        { id: 'ads', left: 'Publicité déguisée', right: 'Un faux bouton « Télécharger » qui mène à une publicité' },
        { id: 'subscription', left: 'Abonnement caché', right: 'Un « essai à 1 € » qui devient 29,90 € par mois, sans rappel' },
      ],
      explanation: `Les noms viennent de la typologie de Harry Brignull (deceptive.design) :

- **Confirmshaming** : le refus culpabilise.
- **Panier piégé** (*sneak into basket*) : on ajoute sans demander.
- **Résiliation obstruée** (*hard to cancel*) : entrer est facile, sortir est dur.
- **Harcèlement** (*nagging*) : la demande revient jusqu’à ce qu’on cède.
- **Fausse preuve sociale** : une popularité inventée.
- **Publicité déguisée** : la publicité se fait passer pour l’interface ou le contenu.
- **Abonnement caché** : un paiement récurrent qu’on n’a pas vu venir.`,
      takeaway: 'Nommer un motif trompeur, c’est déjà savoir le repérer — et pouvoir argumenter pour le retirer.',
      sources: ['deceptive'],
    },
  ],
};

export default darkPatterns;
