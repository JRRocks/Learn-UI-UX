import type { CultureProfile } from '../../engine/types';

/**
 * Market profiles shown in the « Cultures » tab: what a designer should know
 * before shipping an interface to each market, with a representative mock.
 * Tendencies, not laws — every profile ends up being checked with local users.
 */

/** French typography for plain-text fields (the summary is not rendered as Markdown). */
const nb = (s: string) =>
  s
    .replace(/ ([;!?»])/g, '\u202f$1')
    .replace(/ :(?=\s|$)/g, '\u00a0:')
    .replace(/« /g, '«\u202f')
    .replace(/ %/g, '\u00a0%');

/**
 * Formats table cells are plain text too: each example stays whole on a narrow screen
 * (no-break spaces, word joiner after a hyphen); only \u00ab \u00b7 \u00bb separates two examples.
 */
const keep = (s: string) =>
  s
    .split(' \u00b7 ')
    .map((x) => x.replace(/ /g, '\u00a0').replace(/-(?=\S)/g, '-\u2060'))
    .join('\u00a0\u00b7 ');

const ZH =`"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif`;
const JA = `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, Meiryo, "Noto Sans JP", "Noto Sans CJK JP", sans-serif`;
const KO = `"Apple SD Gothic Neo", Pretendard, "Malgun Gothic", "Noto Sans KR", "Noto Sans CJK KR", sans-serif`;
const AR = `"Noto Sans Arabic", "IBM Plex Sans Arabic", "Geeza Pro", "Segoe UI", Tahoma, sans-serif`;

/** Shared bits of phone-app chrome (each mock prefixes its own classes). */
const RADIO = (p: string, color: string) => `
.${p}-radio { flex: none; width: 16px; height: 16px; margin-top: 2px; border: 1.5px solid #8b92a1; border-radius: 50%; background: #fff; }
.on > .${p}-radio { border: 5px solid ${color}; }`;

export const CULTURES: CultureProfile[] = [
  /* ------------------------------------------------------------------ France */
  {
    id: 'fr',
    name: 'France',
    region: 'Europe',
    locale: 'fr-FR',
    dir: 'ltr',
    context: 'moyen',
    hofstede: { pdi: 68, idv: 71, mas: 43, uai: 86, lto: 63, ivr: 48 },
    summary: nb(
      'Un marché très encadré par le droit et attaché à sa langue : RGPD appliqué de près par la CNIL, mentions légales, loi Toubon, accessibilité désormais exigée de nombreux services privés. Le contrôle de l’incertitude est élevé (86) : on veut connaître frais, délais, droit de rétractation et sécurité du paiement avant de s’engager. Les parcours ménagent le choix — point relais ou domicile, carte bancaire ou paiement en plusieurs fois, refus des cookies aussi simple que l’acceptation. Souvent placée entre contexte faible et fort, la France attend un texte explicite sans être sec, une typographie soignée (espaces insécables, guillemets français, virgule décimale) et un choix assumé entre tu et vous.',
    ),
    ecosystem: ['leboncoin', 'Vinted', 'Doctolib', 'SNCF Connect', 'FranceConnect', 'Cartes Bancaires (CB)', 'Wero', 'Mondial Relay', 'Ameli'],
    conventions: [
      {
        topic: 'legal',
        title: 'Refuser les cookies aussi simplement que les accepter',
        body: `La CNIL exige qu’on puisse refuser aussi facilement qu’accepter : un bouton « Tout refuser » au même niveau que « Tout accepter », ou un lien « Continuer sans accepter » bien visible.

Elle a sanctionné Google (150\u00a0M€) et Facebook (60\u00a0M€) fin 2021 parce qu’un clic suffisait pour accepter et qu’il en fallait plusieurs pour refuser, puis TikTok (5\u00a0M€, sanction rendue publique en janvier 2023) pour la même raison. En décembre 2024, elle a mis en demeure des éditeurs dont les bannières rendaient le refus plus difficile ou trompeur.`,
      },
      {
        topic: 'legal',
        title: 'Mentions légales, CGV et résiliation en trois clics',
        body: `Tout site professionnel publie ses mentions légales (éditeur, hébergeur, contact) ; un site marchand y ajoute ses conditions générales de vente et rappelle le droit de rétractation de 14 jours.

Depuis le 1er juin 2023, un contrat qu’on peut souscrire en ligne doit pouvoir se résilier en ligne, par une fonction gratuite, facile d’accès et permanente (« résiliation en trois clics ») : ne la cache pas au fond de l’espace client.`,
      },
      {
        topic: 'legal',
        title: 'Le français, obligatoire',
        body: `La loi Toubon (1994) impose le français pour présenter, décrire et vendre un produit ou un service aux consommateurs en France, publicité comprise : un slogan ou un libellé étranger s’accompagne de sa traduction.

Au-delà de l’obligation, l’anglicisme gratuit (« checkout », « wishlist ») est moins clair que « paiement » ou « favoris ».`,
      },
      {
        topic: 'legal',
        title: 'Accessibilité exigée, y compris du privé',
        body: `Le RGAA s’impose aux services publics et aux entreprises de plus de 250\u00a0M€ de chiffre d’affaires ; depuis le 28 juin 2025, l’Acte européen sur l’accessibilité couvre aussi de nombreux services privés (commerce en ligne, banque, transport).

Publie une déclaration d’accessibilité et vise le niveau AA des WCAG : l’accessibilité devient une question de conformité, plus seulement de qualité.`,
      },
      {
        topic: 'confiance',
        title: 'Prix TTC et promotions honnêtes',
        body: `Les prix affichés aux particuliers sont toutes taxes comprises. Depuis la directive Omnibus (2022), un prix barré doit être le prix le plus bas pratiqué dans les 30 jours précédant la réduction : un « prix d’origine » gonflé est une pratique commerciale trompeuse.

La même directive oblige à dire si et comment les avis clients sont vérifiés.`,
      },
      {
        topic: 'paiement',
        title: 'Carte bancaire, PayPal, paiement en plusieurs fois',
        body: `La carte bancaire, souvent co-badgée CB, domine, avec PayPal, Apple Pay et Wero (qui a pris la suite de Paylib en 2024). Le paiement en 3 ou 4 fois par carte est courant : s’il existe, montre-le dès la fiche produit avec son coût exact (« sans frais » ou montant des frais).

Prévois l’authentification forte (DSP2) : la validation se fait souvent dans l’application bancaire, et l’utilisateur doit pouvoir revenir au parcours sans perdre son panier.`,
      },
      {
        topic: 'paiement',
        title: 'Point relais ou domicile',
        body: `La livraison en point relais (commerce de proximité, consigne) est une option attendue à côté du domicile, souvent moins chère. Propose une carte ou une liste des points proches avec leurs horaires, et affiche les frais de port dès le panier, pas à la dernière étape.`,
      },
      {
        topic: 'ton',
        title: 'Tu ou vous : choisir et s’y tenir',
        body: `Banques, assurances et administrations vouvoient ; beaucoup d’applications grand public tutoient. Ce qui choque, c’est le mélange : un bouton qui tutoie dans un parcours qui vouvoie. Décide selon le public et la marque, puis inscris-le dans ton guide éditorial.`,
      },
      {
        topic: 'typo',
        title: 'Typographie française',
        body: `Espace insécable avant « : », espace fine insécable avant « ; ! ? » et à l’intérieur des guillemets « », espace fine comme séparateur de milliers et virgule décimale : 1\u202f234,56\u00a0€. Sans espaces insécables, un « ? » ou un « € » se retrouve seul en début de ligne.

\`Intl.NumberFormat('fr-FR')\` produit les bons séparateurs ; l’apostrophe typographique (’) remplace l’apostrophe droite.`,
      },
      {
        topic: 'formats',
        title: 'Dates, heures, téléphones, adresses',
        body: `Date jour/mois/année (27/10/2026), heure sur 24 h (14:30, ou 14 h 30 dans un texte soigné), semaine qui commence le lundi. Téléphone par paires : 06\u00a012\u00a034\u00a056\u00a078, ou +33\u00a06\u00a012\u00a034\u00a056\u00a078 à l’international. Adresse : numéro et rue, puis code postal à 5 chiffres avant la ville.`,
      },
    ],
    adapt: {
      do: [
        'Placer « Tout refuser » au même niveau visuel que « Tout accepter » dans le bandeau cookies',
        'Formater nombres, prix et dates avec `Intl` en `fr-FR` : 1 234,56 € ; 27/10/2026',
        'Proposer la livraison en point relais et afficher les frais de port dès le panier',
        'Ajouter une fonction « Résilier mon contrat » visible pour tout abonnement souscrit en ligne',
        'Mettre des espaces insécables avant « : ; ! ? » et à l’intérieur des guillemets',
        'Choisir le tu ou le vous selon le public et l’appliquer dans tout le parcours',
      ],
      dont: [
        'Ne pas mettre « Tout accepter » en bouton plein et le refus en petit lien gris',
        'Ne pas laisser de libellés commerciaux en anglais sans traduction',
        'Ne pas afficher un prix barré inventé : la référence est le prix le plus bas des 30 derniers jours',
        'Ne pas mélanger tutoiement et vouvoiement dans un même parcours',
        'Ne pas cacher les mentions légales ni la déclaration d’accessibilité',
      ],
    },
    formats: [
      { label: 'Date', value: '27/10/2026' },
      { label: 'Date longue', value: 'mardi 27 octobre 2026' },
      { label: 'Heure', value: '14:30 · 14\u00a0h\u00a030' },
      { label: 'Nombre', value: '1\u202f234\u202f567,89' },
      { label: 'Monnaie', value: '1\u202f234,56\u00a0€' },
      { label: 'Pourcentage', value: '12,5\u00a0%' },
      { label: 'Ordre du nom', value: 'Prénom Nom (Marie Dupont)' },
      { label: 'Adresse', value: '12 rue des Lilas, 75011 Paris' },
      { label: 'Téléphone', value: keep('06 12 34 56 78 · +33 6 12 34 56 78') },
      { label: 'Début de semaine', value: 'lundi' },
    ],
    visual: {
      frame: 'phone',
      lang: 'fr',
      alt: 'Étape « Livraison » d’une boutique française : point relais sélectionné à 3,90 €, livraison à domicile et retrait en magasin, total TTC de 88,80 €, offre de paiement en 4 fois sans frais et moyens de paiement CB, PayPal et Wero.',
      html: `<div class="fr">
  <div class="fr-bar"><i data-icon="arrow-left"></i><p>Livraison</p><span>Étape 2 sur 3</span></div>
  <div class="fr-prog"><span></span></div>
  <div class="fr-body">
    <p class="fr-h">Mode de livraison</p>
    <div class="fr-opt on"><span class="fr-radio"></span><div class="fr-grow"><b>Point relais</b><small>Relais du Marché, Paris&nbsp;11<sup>e</sup></small><small>Disponible jeudi 29&nbsp;octobre</small></div><span class="fr-price">3,90&nbsp;€</span></div>
    <div class="fr-opt"><span class="fr-radio"></span><div class="fr-grow"><b>À domicile</b><small>Livré mercredi 28&nbsp;octobre</small></div><span class="fr-price">5,90&nbsp;€</span></div>
    <div class="fr-opt"><span class="fr-radio"></span><div class="fr-grow"><b>Retrait en magasin</b><small>Paris 11<sup>e</sup> · prêt en 2&nbsp;h</small></div><span class="fr-price">Gratuit</span></div>
    <div class="fr-sum">
      <p><span>Sous-total</span><span>84,90&nbsp;€</span></p>
      <p><span>Livraison</span><span>3,90&nbsp;€</span></p>
      <p class="fr-total"><span>Total TTC</span><span>88,80&nbsp;€</span></p>
    </div>
    <p class="fr-4x"><i data-icon="credit-card"></i>Ou en 4&nbsp;fois sans frais&nbsp;: 4&nbsp;×&nbsp;22,20&nbsp;€</p>
    <span class="mk-btn mk-btn--block fr-cta">Continuer vers le paiement</span>
    <p class="fr-safe"><i data-icon="lock"></i>Paiement sécurisé · CB, Visa, PayPal, Wero</p>
  </div>
</div>`,
      css: `.fr { font-size: 13px; }
.fr-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid #eceef2; }
.fr-bar p { flex: 1; font-size: 15px; font-weight: 700; }
.fr-bar span { font-size: 12px; color: #5a6172; }
.fr-prog { height: 3px; background: #eceef2; }
.fr-prog span { display: block; width: 66%; height: 100%; background: #0b5d4b; }
.fr-body { display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.fr-h { font-size: 14px; font-weight: 700; }
.fr-opt { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border: 1px solid #dfe3ea; border-radius: 10px; }
.fr-opt.on { border-color: #0b5d4b; box-shadow: inset 0 0 0 1px #0b5d4b; background: #f2f8f6; }
${RADIO('fr', '#0b5d4b')}
.fr-grow { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.fr-grow small { font-size: 12px; color: #5a6172; }
.fr-price { font-weight: 700; white-space: nowrap; font-variant-numeric: tabular-nums; }
.fr-sum { display: flex; flex-direction: column; gap: 4px; padding-top: 10px; border-top: 1px solid #eceef2; }
.fr-sum p { display: flex; justify-content: space-between; font-variant-numeric: tabular-nums; }
.fr-sum .fr-total { font-size: 15px; font-weight: 700; }
.fr-4x { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; background: #eef6f3; color: #0b5d4b; font-size: 12px; font-weight: 600; --ico: 16px; }
.fr-cta { background: #0b5d4b; min-height: 44px; }
.fr-safe { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 11px; color: #5a6172; --ico: 13px; }
sup { font-size: 0.7em; line-height: 0; }`,
    },
    sources: [
      'cnil:cookies',
      {
        label: 'CNIL — Bannières cookies trompeuses : mises en demeure (décembre 2024)',
        url: 'https://www.cnil.fr/fr/bannieres-cookies-trompeuses-la-cnil-met-en-demeure-des-editeurs-de-sites-web',
      },
      {
        label: 'Deceptive Patterns — La CNIL sanctionne Google (150 M€) et Facebook (60 M€)',
        url: 'https://www.deceptive.design/articles/cookies-the-cnil-fines-google-a-total-of-150-million-euros-and-facebook-60-million-euros-for-non-compliance-with-french-legislation',
      },
      { label: 'Légifrance — Loi n° 94-665 du 4 août 1994 (loi Toubon)', url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000005616341' },
      { label: 'INC — La résiliation « en 3 clics »', url: 'https://www.inc-conso.fr/content/tout-savoir-sur-la-resiliation-en-3-clics-avec-la-cnafc' },
      {
        label: 'Commission européenne — Acte européen sur l’accessibilité',
        url: 'https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en',
      },
      'mdn:intl',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ United States */
  {
    id: 'us',
    name: 'États-Unis',
    region: 'Amériques',
    locale: 'en-US',
    dir: 'ltr',
    context: 'faible',
    hofstede: { pdi: 40, idv: 91, mas: 62, uai: 46, lto: 26, ivr: 68 },
    summary: nb(
      'Un marché à contexte faible et très individualiste (91) : ton direct et décontracté, parcours en libre-service, personnalisation, pages qui vont droit au but. Les formats sont les plus éloignés de l’Europe — mois avant le jour, horloge de 12 heures, unités impériales, prix affichés hors taxes auxquels la « sales tax » s’ajoute au paiement. Il n’existe pas de loi fédérale générale sur les données : les États, Californie en tête, fixent leurs règles, fondées sur le droit d’opposition plutôt que sur le consentement préalable. L’accessibilité est surtout portée par les procès au titre de l’ADA. On paie par carte de crédit, portefeuille mobile ou paiement fractionné, et le pourboire s’invite dans les applis.',
    ),
    ecosystem: ['Amazon', 'Google', 'Apple Pay', 'PayPal', 'Venmo', 'Cash App', 'Zelle', 'Uber', 'DoorDash', 'Affirm / Klarna / Afterpay'],
    conventions: [
      {
        topic: 'ton',
        title: 'Direct, court, à la deuxième personne',
        body: `Contexte faible : on dit les choses explicitement, avec « you », des contractions et des verbes d’action (« Get started », « Track your order »). Un ton trop formel paraît distant.

L’humour est bienvenu dans un état vide ou un succès, pas dans une erreur de paiement ou une perte de données.`,
      },
      {
        topic: 'densite',
        title: 'Libre-service et personnalisation',
        body: `Individualisme élevé (91) : on valorise le contrôle (filtres, comparaison, retours gratuits), la personnalisation (« Recommended for you ») et les avis détaillés. Les pages respirent : une action principale par écran, le reste replié ou en lien.`,
      },
      {
        topic: 'formats',
        title: 'Mois avant le jour, horloge 12 h',
        body: `10/27/2026 se lit « 27 octobre » ; 04/03/2026 est le 3 avril, pas le 4 mars. Pour un public international, écris le mois en lettres (Oct 27, 2026). Les heures s’écrivent 2:30 PM et la semaine commence le dimanche dans les calendriers.`,
      },
      {
        topic: 'formats',
        title: 'Unités impériales',
        body: `Températures en °F, distances en miles, poids en livres (lb) et onces, tailles en pouces. Une appli météo, sportive ou de livraison doit convertir, pas seulement traduire ; propose le choix d’unités dans les réglages.`,
      },
      {
        topic: 'paiement',
        title: 'Prix hors taxes, taxe au paiement',
        body: `La sales tax varie selon l’État et la commune, et quelques États n’en prélèvent pas au niveau de l’État : les prix affichés sont hors taxes et la taxe s’ajoute au récapitulatif (« Estimated tax »). Calcule-la dès que le code ZIP est connu pour éviter la surprise au dernier écran.`,
      },
      {
        topic: 'paiement',
        title: 'Cartes, portefeuilles et paiement fractionné',
        body: `Cartes de crédit et de débit dominent, avec Apple Pay, Google Pay, PayPal et les paiements entre particuliers (Venmo, Cash App, Zelle). Le paiement fractionné (Affirm, Klarna, Afterpay) s’affiche souvent dès la fiche produit : « or 4 interest-free payments of $24.75 ».`,
      },
      {
        topic: 'paiement',
        title: 'Écrans de pourboire',
        body: `Livraison, VTC, restaurants et cafés proposent un pourboire en pourcentages présélectionnés (15, 18, 20 %). La pratique agace (on parle de « tip fatigue ») : mets « No tip » et « Other » au même niveau que les pourcentages, et indique sur quel montant ils sont calculés.`,
      },
      {
        topic: 'formulaires',
        title: 'Adresses et téléphones',
        body: `Adresse sur une ou deux lignes (numéro et rue, appartement), ville, État dans une liste (50 États, district de Columbia, territoires), code ZIP à 5 chiffres (ou ZIP+4). Le ZIP peut préremplir ville et État. Téléphone au format (555) 123-4567.`,
      },
      {
        topic: 'legal',
        title: 'Lois d’État sur les données',
        body: `Pas de loi fédérale générale : la Californie (CCPA, renforcée par le CPRA) impose un lien « Do Not Sell or Share My Personal Information » (ou « Your Privacy Choices ») et le respect du signal Global Privacy Control ; d’autres États ont adopté des lois proches. Le modèle repose sur l’opposition (opt-out), pas sur le consentement préalable européen.`,
      },
      {
        topic: 'legal',
        title: 'Accessibilité et procès ADA',
        body: `De nombreux tribunaux appliquent l’Americans with Disabilities Act aux sites et applis de commerce : plusieurs milliers de plaintes sont déposées chaque année. Vise au minimum les WCAG 2.1 niveau AA, la norme retenue par la règle fédérale de 2024 (titre II de l’ADA, qui s’impose aux États et aux collectivités locales) et par la plupart des accords conclus après procès, et de préférence les WCAG 2.2 AA.`,
      },
    ],
    adapt: {
      do: [
        'Afficher les prix hors taxes et calculer la taxe dès que le code ZIP est saisi',
        'Écrire le mois en lettres (Oct 27, 2026) quand le public est international',
        'Proposer les unités impériales (°F, miles, lb) avec un réglage pour en changer',
        'Ajouter le lien « Do Not Sell or Share My Personal Information » et respecter le signal GPC',
        'Mettre « No tip » au même niveau que les pourcentages sur un écran de pourboire',
        'Viser les WCAG 2.2 niveau AA pour réduire le risque juridique et élargir l’audience',
      ],
      dont: [
        'Ne pas afficher 04/03/2026 pour dire 4 mars : un Américain lira 3 avril',
        'Ne pas dévoiler taxes et frais de service seulement au dernier écran',
        'Ne pas présélectionner un pourboire élevé sans option « No tip » visible',
        'Ne pas supposer qu’aucune règle de confidentialité ne s’applique : les lois d’État imposent liens et signaux d’opposition',
        'Ne pas donner un ton administratif à des messages courants',
      ],
    },
    formats: [
      { label: 'Date', value: '10/27/2026' },
      { label: 'Date longue', value: 'Tuesday, October 27, 2026' },
      { label: 'Heure', value: '1:30 PM' },
      { label: 'Nombre', value: '1,234,567.89' },
      { label: 'Monnaie (hors taxes)', value: '$1,234.56' },
      { label: 'Ordre du nom', value: 'Jane Smith' },
      { label: 'Adresse', value: '1600 Main St Apt 4B, Springfield, IL 62701' },
      { label: 'Téléphone', value: keep('(555) 123-4567 · +1 555 123 4567') },
      { label: 'Unités', value: keep('°F · miles · lb, oz · in') },
      { label: 'Début de semaine (dimanche)', value: 'Sunday' },
    ],
    visual: {
      frame: 'phone',
      lang: 'en',
      alt: 'Paiement d’une appli de livraison de repas américaine : arrivée prévue 6:45–7:05 PM, sous-total, frais de livraison et de service, taxe estimée, choix du pourboire (No tip, 15 %, 18 % sélectionné, 20 %, Other), Apple Pay et total de 36,52 dollars.',
      html: `<div class="us">
  <div class="us-bar"><i data-icon="arrow-left"></i><p>Checkout</p></div>
  <div class="us-body">
    <div class="us-eta"><i data-icon="clock"></i><div><b>Arrives 6:45–7:05 PM</b><small>1600 Main St, Apt 4B · Leave at door</small></div></div>
    <div>
      <p class="us-h">Order summary</p>
      <p class="us-row"><span>Subtotal (3 items)</span><span>$24.50</span></p>
      <p class="us-row"><span>Delivery fee</span><span>$2.99</span></p>
      <p class="us-row"><span>Service fee</span><span>$2.45</span></p>
      <p class="us-row"><span>Estimated tax</span><span>$2.17</span></p>
      <p class="us-row"><span>Tip</span><span>$4.41</span></p>
    </div>
    <div>
      <p class="us-h">Tip your courier</p>
      <p class="us-help">100% of your tip goes to your courier.</p>
      <div class="us-tips"><span>No tip</span><span>15%<small>$3.68</small></span><span class="on">18%<small>$4.41</small></span><span>20%<small>$4.90</small></span><span>Other</span></div>
    </div>
    <p class="us-row us-pay"><span><i data-icon="wallet"></i>Apple Pay</span><span class="us-change">Change</span></p>
    <p class="us-total"><span>Total</span><span>$36.52</span></p>
    <span class="mk-btn mk-btn--block us-cta">Place order</span>
  </div>
</div>`,
      css: `.us { font-size: 13px; }
.us-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid #eceef2; }
.us-bar p { flex: 1; text-align: center; font-size: 15px; font-weight: 700; margin-inline-end: 28px; }
.us-body { display: flex; flex-direction: column; gap: 12px; padding: 14px; }
.us-eta { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #f6f3ef; }
.us-eta div { display: flex; flex-direction: column; }
.us-eta small { font-size: 12px; color: #5a6172; }
.us-h { margin-bottom: 4px; font-size: 14px; font-weight: 700; }
.us-row { display: flex; justify-content: space-between; padding: 2px 0; font-variant-numeric: tabular-nums; }
.us-help { margin-bottom: 8px; font-size: 12px; color: #5a6172; }
.us-tips { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.us-tips span { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 46px; padding: 4px 2px; border: 1px solid #c7cedb; border-radius: 10px; font-size: 13px; font-weight: 700; line-height: 1.2; text-align: center; }
.us-tips small { font-size: 11px; font-weight: 500; color: #5a6172; }
.us-tips .on { border-color: #1d2230; background: #1d2230; color: #fff; }
.us-tips .on small { color: #dfe3ea; }
.us-pay { padding: 10px 0; border-block: 1px solid #eceef2; }
.us-pay span:first-child { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.us-change { color: #b8331c; font-weight: 600; }
.us-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; }
.us-cta { min-height: 46px; background: #b8331c; font-size: 15px; }`,
    },
    sources: [
      'hofstede',
      'hall',
      'marcus2000',
      'mdn:intl',
      { label: 'California Attorney General — California Consumer Privacy Act (CCPA)', url: 'https://oag.ca.gov/privacy/ccpa' },
      { label: 'ADA.gov — Guidance on Web Accessibility and the ADA', url: 'https://www.ada.gov/resources/web-guidance/' },
      'wcag22',
    ],
  },

  /* ------------------------------------------------------------------ Germany */
  {
    id: 'de',
    name: 'Allemagne',
    region: 'Europe',
    locale: 'de-DE',
    dir: 'ltr',
    context: 'faible',
    hofstede: { pdi: 35, idv: 67, mas: 66, uai: 65, lto: 83, ivr: 40 },
    summary: nb(
      'Un marché qui attend des faits vérifiables, une structure claire et une conformité juridique sans faille : Impressum, déclaration de confidentialité, consentement aux traceurs, bouton de commande au libellé encadré par la loi. Le contexte est faible et le contrôle de l’incertitude assez élevé (65) : on lit les conditions, on compare, on veut connaître délais, frais et droit de rétractation avant d’acheter. Le paiement est une affaire de confiance — achat sur facture, PayPal, prélèvement SEPA — plus que de carte. La langue allonge les textes d’environ 30 % et forme de longs mots composés : les composants doivent l’encaisser.',
    ),
    ecosystem: ['PayPal', 'Klarna', 'Amazon.de', 'Otto', 'Zalando', 'Check24', 'DB Navigator', 'Kleinanzeigen', 'Trusted Shops'],
    conventions: [
      {
        topic: 'legal',
        title: 'Impressum obligatoire',
        body: `Tout site commercial publie un Impressum (§ 5 DDG, ex-§ 5 TMG) : raison sociale, adresse postale, représentant légal, registre du commerce, numéro de TVA, contact rapide. Il doit être facile à trouver et accessible depuis chaque page, d’où le lien « Impressum » dans tous les pieds de page, à côté de « Datenschutz ».`,
      },
      {
        topic: 'legal',
        title: 'Le bouton « Zahlungspflichtig bestellen »',
        body: `Depuis 2012 (§ 312j BGB, « Button-Lösung »), le bouton qui conclut une commande doit dire sans ambiguïté qu’on s’engage à payer : « zahlungspflichtig bestellen » ou une formule équivalente comme « kaufen ». Avec « Weiter » ou « Bestellen », le consommateur n’est pas lié par le contrat.`,
      },
      {
        topic: 'legal',
        title: 'Bouton de résiliation',
        body: `Depuis juillet 2022 (§ 312k BGB), un abonnement qu’on peut conclure en ligne se résilie en ligne, par un bouton bien visible libellé par exemple « Verträge hier kündigen », qui mène à une page de confirmation avec un bouton « jetzt kündigen ».`,
      },
      {
        topic: 'legal',
        title: 'Consentement aux traceurs',
        body: `Le consentement aux cookies (§ 25 TDDDG, ex-TTDSG) suit les mêmes principes qu’en France : rien de précoché, refus aussi accessible que l’acceptation, choix modifiable à tout moment. Le lien « Cookie-Einstellungen » reste dans le pied de page.`,
      },
      {
        topic: 'paiement',
        title: 'Facture, PayPal, prélèvement',
        body: `Beaucoup d’Allemands préfèrent payer après réception : l’achat sur facture (Kauf auf Rechnung, souvent via Klarna), PayPal et le prélèvement SEPA sont attendus, la carte de crédit moins. Une boutique qui ne propose que la carte perd des acheteurs au dernier écran.`,
      },
      {
        topic: 'confiance',
        title: 'Des faits plutôt que des superlatifs',
        body: `On attend des caractéristiques précises, des délais (« Lieferzeit: 1–3 Werktage »), les frais, le droit de rétractation de 14 jours et des labels reconnus (Trusted Shops, TÜV). Ils convainquent davantage que « le meilleur produit du marché ».`,
      },
      {
        topic: 'formats',
        title: 'Prix TTC et prix unitaire',
        body: `Les prix aux consommateurs incluent la TVA (« inkl. MwSt. ») et signalent les frais de port (« zzgl. Versandkosten »). Pour un produit vendu au poids, au volume ou à la longueur, le prix au kilo ou au litre (Grundpreis) figure à côté du prix, comme l’exige la PAngV.`,
      },
      {
        topic: 'formats',
        title: 'Dates, nombres, adresses',
        body: `27.10.2026, 13:30\u00a0Uhr, 1.234,56\u00a0€, semaine ISO qui commence le lundi (« KW 44 »). Adresse : rue puis numéro (Hauptstraße 12), code postal à 5 chiffres avant la ville. Les titres académiques font partie du nom (« Dr. Anna Schmidt ») : prévois un champ « Titel » et une civilité avec « divers » ou « keine Angabe ».`,
      },
      {
        topic: 'typo',
        title: 'Mots composés et textes plus longs',
        body: `L’allemand allonge les textes d’environ 30 % et produit des mots comme « Datenschutzeinstellungen ». Prévois des boutons qui s’élargissent, \`hyphens: auto\` avec \`lang="de"\`, et teste les libellés les plus longs à la plus petite largeur.`,
      },
      {
        topic: 'ton',
        title: 'Sie ou du',
        body: `Le vouvoiement (Sie) reste la norme en banque, assurance, administration et B2B ; beaucoup de marques grand public tutoient (du). Choisis selon le public et n’en change pas en cours de parcours.`,
      },
    ],
    adapt: {
      do: [
        'Libeller le bouton final « Zahlungspflichtig bestellen » (ou « Kaufen »)',
        'Proposer l’achat sur facture, PayPal et le prélèvement SEPA en plus de la carte',
        'Mettre Impressum, Datenschutz, AGB et Widerrufsbelehrung dans le pied de page de chaque page',
        'Afficher « inkl. MwSt. », les frais de port et le prix au kilo ou au litre',
        'Activer `hyphens: auto` avec `lang="de"` et tester des libellés 30 % plus longs',
        'Ajouter un bouton « Verträge hier kündigen » pour les abonnements',
      ],
      dont: [
        'Ne pas écrire « Weiter » ou « Bestellen » sur le bouton qui engage à payer',
        'Ne pas compter sur la seule carte de crédit au paiement',
        'Ne pas remplacer des faits vérifiables par des superlatifs marketing',
        'Ne pas fixer la largeur des boutons d’après la longueur des libellés anglais',
        'Ne pas passer du Sie au du d’un écran à l’autre',
      ],
    },
    formats: [
      { label: 'Date', value: '27.10.2026' },
      { label: 'Date longue', value: 'Dienstag, 27. Oktober 2026' },
      { label: 'Heure', value: keep('13:30 Uhr') },
      { label: 'Nombre', value: '1.234.567,89' },
      { label: 'Monnaie', value: '1.234,56\u00a0€' },
      { label: 'Prix unitaire (Grundpreis)', value: '500 g · 12,90\u00a0€ (25,80\u00a0€/kg)' },
      { label: 'Ordre du nom (avec titre)', value: 'Dr. Anna Schmidt' },
      { label: 'Adresse', value: 'Hauptstraße 12, 10115 Berlin' },
      { label: 'Téléphone', value: keep('030 12345678 · +49 30 12345678') },
      { label: 'Semaine (début le lundi, numéro ISO)', value: keep('Montag · KW 44') },
    ],
    visual: {
      frame: 'browser',
      lang: 'de',
      alt: 'Fiche produit d’une boutique de café allemande : espresso 500 g à 12,90 €, mentions « inkl. MwSt., zzgl. Versandkosten » et prix au kilo, date de torréfaction, délai de livraison, moyens de paiement (facture, PayPal, prélèvement, carte), protection acheteur et pied de page avec Impressum, Datenschutz, AGB et Widerrufsbelehrung.',
      html: `<div class="de">
  <div class="de-head"><span class="de-logo">Röstwerk</span><span class="de-search"><i data-icon="search"></i>Kaffee, Zubehör …</span><i data-icon="user"></i><i data-icon="shopping-cart"></i></div>
  <p class="de-crumbs">Startseite › Kaffee › Espresso</p>
  <div class="de-main">
    <div class="mk-img de-img"><i data-icon="coffee"></i></div>
    <div class="de-info">
      <p class="de-title">Espresso Classico, ganze Bohne, 500&nbsp;g</p>
      <p class="de-rating"><i data-icon="star"></i><i data-icon="star"></i><i data-icon="star"></i><i data-icon="star"></i><i data-icon="star"></i><span>4,8 (1.284 Bewertungen)</span></p>
      <p class="de-price">12,90&nbsp;€</p>
      <p class="de-small">inkl. MwSt., zzgl. <u>Versandkosten</u></p>
      <p class="de-small">Grundpreis: 25,80&nbsp;€ / 1&nbsp;kg</p>
      <ul class="de-facts"><li>Röstdatum: 20.10.2026</li><li>Herkunft: Brasilien, Äthiopien</li><li>Lieferzeit: 1–3 Werktage</li></ul>
      <span class="mk-btn de-cta">In den Warenkorb</span>
      <p class="de-pay">Rechnung · PayPal · Lastschrift · Kreditkarte</p>
    </div>
  </div>
  <div class="de-trust"><span><i data-icon="shield-check"></i>Käuferschutz</span><span><i data-icon="truck"></i>Versandkostenfrei ab 29&nbsp;€</span><span><i data-icon="undo-2"></i>30 Tage Rückgabe</span></div>
  <p class="de-foot"><span>Impressum</span> · <span>Datenschutz</span> · <span>AGB</span> · <span>Widerrufsbelehrung</span> · <span>Versand &amp; Zahlung</span> · <span>Cookie-Einstellungen</span></p>
</div>`,
      css: `.mk-browser { max-width: 520px; margin-inline: auto; }
.de { font-size: 13px; container-type: inline-size; }
.de-head { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid #e3e6ec; }
@container (max-width: 420px) {
  .de-head { flex-wrap: wrap; row-gap: 8px; }
  .de-logo { margin-inline-end: auto; }
  .de-search { order: 3; flex-basis: 100%; }
}
.de-logo { font-size: 17px; font-weight: 800; letter-spacing: -0.01em; color: #5b3a1e; }
.de-search { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; padding: 6px 10px; border: 1px solid #c3c8d3; border-radius: 6px; color: #5a6172; white-space: nowrap; overflow: hidden; --ico: 14px; }
.de-crumbs { padding: 8px 16px 0; font-size: 12px; color: #5a6172; }
.de-main { display: flex; flex-wrap: wrap; gap: 16px; padding: 12px 16px 16px; }
.de-img { flex: 0 0 140px; aspect-ratio: 3 / 4; display: grid; place-items: center; background: linear-gradient(160deg, #7a5233, #3b2414); color: rgb(255 255 255 / 0.6); --ico: 48px; }
.de-info { flex: 1 1 220px; display: flex; flex-direction: column; gap: 3px; }
.de-title { font-size: 15px; font-weight: 700; line-height: 1.3; hyphens: auto; }
.de-rating { display: flex; align-items: center; gap: 1px; color: #b45309; --ico: 13px; }
.de-rating svg { fill: currentColor; }
.de-rating span { margin-inline-start: 6px; font-size: 12px; color: #5a6172; }
.de-price { margin-top: 4px; font-size: 22px; font-weight: 800; }
.de-small { font-size: 12px; color: #5a6172; }
.de-facts { margin: 6px 0; padding-inline-start: 16px; font-size: 12px; }
.de-cta { align-self: flex-start; background: #1d6b3a; }
.de-pay { margin-top: 6px; font-size: 11px; color: #5a6172; }
.de-trust { display: flex; flex-wrap: wrap; gap: 6px 16px; padding: 10px 16px; background: #f4f6f9; font-size: 12px; font-weight: 600; }
.de-trust span { display: flex; align-items: center; gap: 6px; --ico: 15px; }
.de-foot { padding: 10px 16px; border-top: 1px solid #e3e6ec; font-size: 11px; color: #5a6172; }
.de-foot span { white-space: nowrap; }`,
    },
    sources: [
      { label: 'Gesetze im Internet — § 312j BGB (Button-Lösung)', url: 'https://www.gesetze-im-internet.de/bgb/__312j.html' },
      { label: 'Gesetze im Internet — § 312k BGB (Kündigungsbutton)', url: 'https://www.gesetze-im-internet.de/bgb/__312k.html' },
      { label: 'Gesetze im Internet — § 5 DDG (Impressum)', url: 'https://www.gesetze-im-internet.de/ddg/__5.html' },
      { label: 'Gesetze im Internet — § 4 PAngV (Grundpreis)', url: 'https://www.gesetze-im-internet.de/pangv_2022/__4.html' },
      'imp:harden',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ Nordics */
  {
    id: 'nordics',
    name: 'Pays nordiques (Suède en référence)',
    region: 'Europe',
    locale: 'sv-SE',
    dir: 'ltr',
    context: 'faible',
    hofstede: { pdi: 31, idv: 71, mas: 5, uai: 29, lto: 53, ivr: 78 },
    summary: nb(
      'Des interfaces épurées, fonctionnelles et informelles, à l’image de sociétés égalitaires où la confiance dans les institutions est forte : distance hiérarchique faible (31), contrôle de l’incertitude faible (29), orientation « réussite » très faible (5), au profit de la qualité de vie et du consensus. L’identité numérique est centrale : on se connecte et on signe avec BankID (Suède, Norvège) ou MitID (Danemark), et le numéro personnel (personnummer) préremplit l’adresse au paiement. Swish, Vipps MobilePay et la facture remplacent souvent la saisie d’une carte, dans des pays où les espèces ont presque disparu. L’accessibilité et le langage clair sont des attentes, pas des options.',
    ),
    ecosystem: ['BankID (SE, NO)', 'MitID (DK)', 'Swish', 'Vipps MobilePay', 'Klarna', 'Kivra', 'Blocket', 'Spotify'],
    conventions: [
      {
        topic: 'formulaires',
        title: 'Se connecter avec BankID',
        body: `BankID sert à se connecter et à signer dans les banques, les administrations et de nombreux services privés (Suède, Norvège ; MitID au Danemark). Sur ordinateur, on scanne avec l’appli un QR code animé, qui change chaque seconde : il faut être devant l’écran, ce qui complique les fraudes lancées à distance ; sur mobile, l’appli s’ouvre directement.

Pour un service sensible, un simple couple e-mail et mot de passe paraît daté.`,
      },
      {
        topic: 'formulaires',
        title: 'Le personnummer préremplit l’adresse',
        body: `Au paiement, saisir son personnummer (ÅÅMMDD-NNNN ou ÅÅÅÅMMDD-NNNN) suffit pour récupérer l’adresse officielle : c’est rapide et attendu. Dis pourquoi tu le demandes et ne le réaffiche jamais en entier : la loi suédoise protège particulièrement cet identifiant (dataskyddslagen, 3 kap. 10 §).`,
      },
      {
        topic: 'paiement',
        title: 'Swish, Vipps MobilePay, facture',
        body: `Le paiement mobile de compte à compte (Swish en Suède, Vipps MobilePay en Norvège, au Danemark et en Finlande) et la facture à 14 ou 30 jours (Klarna, d’origine suédoise) sont des réflexes. Avec Swish, on valide dans l’appli avec BankID, sans saisir de carte.`,
      },
      {
        topic: 'mobile',
        title: 'Une société presque sans espèces',
        body: `En Suède, beaucoup de commerces n’acceptent plus le liquide : les parcours supposent un smartphone, BankID et Swish. Prévois pourtant une alternative pour les personnes qui n’ont pas BankID (touristes, nouveaux arrivants, personnes âgées).`,
      },
      {
        topic: 'densite',
        title: 'Épuré et fonctionnel',
        body: `Les interfaces privilégient l’essentiel : beaucoup d’air, une typographie lisible, peu d’éléments promotionnels. Une page chargée de bannières, de comptes à rebours et de fenêtres surgissantes paraît insistante, voire suspecte.`,
      },
      {
        topic: 'ton',
        title: 'Égalitaire et informel',
        body: `En Suède, on tutoie (du) tout le monde, administrations et banques comprises, et on dit « Hej » plutôt que « Cher client ». Titres et mise en scène de l’autorité impressionnent peu ; la transparence sur les frais, les délais et les données convainc davantage.`,
      },
      {
        topic: 'formats',
        title: 'Dates ISO et numéros de semaine',
        body: `La Suède écrit les dates 2026-10-27 et planifie en semaines : « vecka 44 » apparaît dans les calendriers, les délais de livraison et les plannings. Affiche le numéro de semaine ISO dans les sélecteurs de date.`,
      },
      {
        topic: 'formats',
        title: 'Nombres et monnaies',
        body: `1\u00a0234,56\u00a0kr en Suède (espace insécable, virgule décimale), heure sur 24 h. Les couronnes suédoise, norvégienne et danoise s’écrivent toutes « kr » : précise la devise (SEK, NOK, DKK) quand un service couvre plusieurs pays.`,
      },
      {
        topic: 'legal',
        title: 'Accessibilité et langage clair',
        body: `La loi suédoise sur l’accessibilité des services numériques publics s’applique depuis 2019, et l’Acte européen sur l’accessibilité couvre le privé depuis juin 2025. La loi sur la langue (2009) demande aux autorités un langage soigné, simple et compréhensible (klarspråk) : un bon réflexe pour tout service.`,
      },
    ],
    adapt: {
      do: [
        'Proposer la connexion et la signature par BankID : QR code sur ordinateur, ouverture de l’appli sur mobile',
        'Ajouter Swish ou Vipps MobilePay et la facture à 30 jours au paiement',
        'Préremplir l’adresse à partir du personnummer en expliquant pourquoi on le demande',
        'Afficher les numéros de semaine ISO dans les calendriers et les délais',
        'Tutoyer et écrire en langage clair, sans jargon',
      ],
      dont: [
        'Ne pas exiger une carte bancaire quand Swish ou la facture suffisent',
        'Ne pas multiplier bannières, comptes à rebours et fenêtres promotionnelles',
        'Ne pas réafficher le personnummer complet après la saisie',
        'Ne pas exclure les personnes sans BankID : garder une autre méthode d’identification',
        'Ne pas écrire 27/10/26 à un public habitué au format ISO 2026-10-27',
      ],
    },
    formats: [
      { label: 'Date', value: '2026-10-27' },
      { label: 'Date longue', value: 'tisdag 27 oktober 2026' },
      { label: 'Numéro de semaine', value: 'vecka 44' },
      { label: 'Heure', value: '13:30' },
      { label: 'Nombre', value: '1\u00a0234\u00a0567,89' },
      { label: 'Monnaie', value: '1\u00a0234,56\u00a0kr' },
      { label: 'Ordre du nom', value: 'Anna Andersson' },
      { label: 'Adresse', value: 'Storgatan 12, 114\u00a051 Stockholm' },
      { label: 'Téléphone', value: '070-123 45 67 · +46 70 123 45 67' },
      { label: 'Personnummer', value: 'ÅÅÅÅMMDD-NNNN' },
      { label: 'Début de semaine', value: 'lundi' },
    ],
    visual: {
      frame: 'phone',
      lang: 'sv',
      alt: 'Caisse d’une boutique suédoise épurée : personnummer saisi et adresse récupérée automatiquement, livraison chez un point relais le 29 octobre (semaine 44), paiement par Swish sélectionné, facture à 30 jours ou carte, total 1 298 couronnes dont TVA.',
      html: `<div class="se">
  <div class="se-bar"><p class="se-logo">lagom hem</p><span>Kassa</span></div>
  <div class="se-body">
    <div>
      <p class="se-h">Dina uppgifter</p>
      <p class="se-label">Personnummer</p>
      <p class="se-input"><span>19850612-••••</span><i data-icon="circle-check"></i></p>
      <div class="se-addr"><b>Anna Andersson</b><span>Storgatan 12, 114&nbsp;51 Stockholm</span><small>Adressen hämtades automatiskt.</small></div>
    </div>
    <div>
      <p class="se-h">Leverans</p>
      <div class="se-opt on"><span class="se-radio"></span><div class="se-grow"><b>Ombud</b><small>Götgatan 45 · tor 29 okt (v. 44)</small></div><span>49&nbsp;kr</span></div>
      <div class="se-opt"><span class="se-radio"></span><div class="se-grow"><b>Hem till dörren</b><small>2026-10-29, <span class="se-nw">kl. 17–21</span></small></div><span>99&nbsp;kr</span></div>
    </div>
    <div>
      <p class="se-h">Betalning</p>
      <div class="se-opt on"><span class="se-radio"></span><div class="se-grow"><b>Swish</b><small>Godkänn med Mobilt BankID</small></div></div>
      <div class="se-opt"><span class="se-radio"></span><div class="se-grow"><b>Faktura</b><small>Betala inom 30 dagar</small></div></div>
      <div class="se-opt"><span class="se-radio"></span><div class="se-grow"><b>Kort</b><small>Visa, Mastercard</small></div></div>
    </div>
    <div>
      <p class="se-total"><span>Att betala</span><b>1&nbsp;298,00&nbsp;kr</b></p>
      <p class="se-vat">varav moms 259,60&nbsp;kr</p>
    </div>
    <span class="mk-btn mk-btn--block se-cta">Betala med Swish</span>
  </div>
</div>`,
      css: `.se { font-size: 13px; color: #1b1f24; }
.se-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #eceef2; }
.se-logo { font-size: 16px; font-weight: 700; letter-spacing: 0.02em; }
.se-bar span { font-size: 12px; color: #5a6172; }
.se-body { display: flex; flex-direction: column; gap: 16px; padding: 16px; }
.se-h { margin-bottom: 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5a6172; }
.se-label { margin-bottom: 4px; font-weight: 600; }
.se-input { display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; border: 1px solid #c3c8d3; border-radius: 8px; font-variant-numeric: tabular-nums; }
.se-input svg { color: #1f7a4d; }
.se-addr { display: flex; flex-direction: column; gap: 1px; margin-top: 8px; padding: 10px 12px; border-radius: 8px; background: #f4f6f8; }
.se-addr small { font-size: 12px; color: #5a6172; }
.se-opt { display: flex; align-items: center; gap: 10px; margin-top: 6px; padding: 10px 12px; border: 1px solid #dfe3ea; border-radius: 8px; }
.se-opt.on { border-color: #1b1f24; box-shadow: inset 0 0 0 1px #1b1f24; }
${RADIO('se', '#1b1f24')}
.se-radio { margin-top: 0; }
.se-grow { flex: 1; display: flex; flex-direction: column; }
.se-grow small { font-size: 12px; color: #5a6172; }
.se-nw { white-space: nowrap; }
.se-total { display: flex; justify-content: space-between; align-items: baseline; font-size: 15px; }
.se-total b { font-size: 18px; }
.se-vat { font-size: 12px; color: #5a6172; text-align: end; }
.se-cta { min-height: 46px; background: #1b1f24; }`,
    },
    sources: [
      { label: 'BankID — Om BankID', url: 'https://www.bankid.com/' },
      { label: 'Swish', url: 'https://www.swish.nu/' },
      'mdn:intl',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ China */
  {
    id: 'cn',
    name: 'Chine continentale',
    region: 'Asie de l’Est',
    locale: 'zh-CN',
    dir: 'ltr',
    context: 'fort',
    hofstede: { pdi: 80, idv: 20, mas: 66, uai: 30, lto: 87, ivr: 24 },
    summary: nb(
      'Un marché mobile d’abord — 98 % des internautes chinois se connectaient depuis un téléphone dès 2018 selon le CNNIC — organisé autour de super-apps (WeChat, Alipay, Meituan) qui regroupent paiement, transport, achats et services publics, souvent sous forme de mini-programmes. Les accueils sont denses : grille d’accès aux services, bannières, pastilles rouges, flux en cascade. Le contexte est fort, la distance hiérarchique élevée (80) et l’individualisme faible (20) : preuve sociale, autorité, garanties officielles et dynamique collective (achats groupés, vente en direct) pèsent dans la décision. L’identité passe par le numéro de mobile, le paiement par QR code, et le rouge porte la fête et la chance.',
    ),
    ecosystem: ['微信 WeChat', '支付宝 Alipay', '淘宝 Taobao / 天猫 Tmall', '京东 JD.com', '拼多多 Pinduoduo', '美团 Meituan', '抖音 Douyin', '小红书 Xiaohongshu', '哔哩哔哩 Bilibili', '高德地图 Amap'],
    conventions: [
      {
        topic: 'densite',
        title: 'Grille de services et flux en cascade',
        body: `L’accueil type empile une grille d’icônes de 4 ou 5 colonnes sur 2 lignes (金刚区, « zone King Kong »), des bannières, puis un flux en cascade (瀑布流) de cartes de hauteurs variables. Cette densité sert la découverte et le modèle de portail.

Elle reste lisible grâce à des blocs nets, des libellés courts de 2 à 4 caractères et des icônes reconnaissables. Elle n’est pas une loi : certaines applis (Douyin, par exemple) misent sur des écrans plus épurés.`,
      },
      {
        topic: 'formulaires',
        title: 'Numéro de mobile et code SMS',
        body: `On s’inscrit et on se connecte avec son numéro de mobile et un code reçu par SMS, ou d’un geste via WeChat, Alipay ou « 本机号码一键登录 » (le numéro de la carte SIM). Les numéros sont enregistrés à l’identité réelle, ce qui en fait l’identifiant naturel ; l’e-mail sert peu.

Sur ordinateur, on scanne un QR code avec l’appli déjà connectée sur le téléphone.`,
      },
      {
        topic: 'paiement',
        title: 'QR codes et portefeuilles',
        body: `WeChat Pay et Alipay dominent ; on paie en scannant ou en présentant un QR code, jusque chez le marchand de rue. Les mini-programmes (小程序) se lancent par un scan ou une recherche, sans installation. Place ces deux portefeuilles en tête ; la carte internationale vient après.`,
      },
      {
        topic: 'couleur',
        title: 'Le rouge de la fête… et de la hausse',
        body: `Le rouge évoque la chance et la prospérité (enveloppes rouges 红包, Nouvel An), d’où son omniprésence dans les promotions. En Bourse, **la hausse est rouge et la baisse verte**, l’inverse de l’Occident.

Le blanc est associé au deuil ; on évite le chapeau vert (allusion à l’infidélité) et le chiffre 4, proche de « mort » à l’oral, tandis que le 8 porte chance.`,
      },
      {
        topic: 'typo',
        title: 'Typographie chinoise',
        body: `Pas d’italique (on souligne par le gras, la couleur ou des points d’emphase), pas d’espaces entre les mots, ponctuation pleine chasse (，。！？) et aucune ponctuation fermante en début de ligne. Interlignage généreux (1,5 à 1,8).

Préfère les polices système (PingFang SC, Microsoft YaHei, Noto Sans CJK) : une police chinoise complète pèse plusieurs mégaoctets.`,
      },
      {
        topic: 'formats',
        title: 'Grands nombres en 万 et 亿',
        body: `On compte par myriades : 1.2万 = 12\u00a0000, 3亿 = 300\u00a0millions. Ventes, vues et abonnés s’écrivent « 已售1.2万件 » (12\u00a0000 vendus). \`Intl.NumberFormat('zh-CN', { notation: 'compact' })\` produit « 1.2万 ».`,
      },
      {
        topic: 'confiance',
        title: 'Preuve sociale et garanties',
        body: `Ventes cumulées, avis avec photos, classements, badges officiels et garanties se placent près du prix, comme « 7天无理由退货 » (retour sans motif sous 7 jours, prévu par la loi sur la protection des consommateurs pour les achats en ligne). La recommandation d’un proche ou d’un influenceur (KOL) pèse plus qu’une promesse de marque.`,
      },
      {
        topic: 'mobile',
        title: 'Social, live et fêtes commerciales',
        body: `On achète en direct (Taobao Live, Douyin), en groupe (Pinduoduo, liens partagés dans WeChat) et pendant les fêtes commerciales (11.11, 618). Pastilles rouges, comptes à rebours et écrans de lancement publicitaires avec bouton « 跳过 » (passer) sont courants : garde-les honnêtes, sans faux minuteur ni fausse rareté.`,
      },
      {
        topic: 'legal',
        title: 'Licence ICP et consentement explicite',
        body: `Un site hébergé en Chine affiche son numéro d’enregistrement ICP (备案号) en pied de page. La loi sur la protection des informations personnelles (PIPL, 2021) exige un consentement explicite : les écrans de connexion montrent une case « 我已阅读并同意 » (j’ai lu et j’accepte) non cochée, avec les liens vers l’accord utilisateur et la politique de confidentialité.`,
      },
    ],
    adapt: {
      do: [
        'Proposer la connexion par numéro et code SMS, par WeChat ou Alipay, et par QR code sur ordinateur',
        'Placer WeChat Pay et Alipay en tête des moyens de paiement',
        'Construire l’accueil autour d’une grille d’accès aux services et d’un flux de découverte',
        'Afficher ventes, avis photo et garanties (retour sous 7 jours) près du prix',
        'Formater les grands nombres en 万 et 亿 avec `Intl` (`zh-CN`, notation compacte)',
        'Utiliser les polices système CJK et un interlignage de 1,5 à 1,8',
      ],
      dont: [
        'Ne pas utiliser le vert pour une hausse dans une appli boursière',
        'Ne pas exiger une adresse e-mail pour créer un compte',
        'Ne pas mettre de texte chinois en italique',
        'Ne pas précocher la case d’accord à la politique de confidentialité',
        'Ne pas charger une police chinoise complète en webfont',
      ],
    },
    formats: [
      { label: 'Date', value: '2026/10/27 · 2026-10-27' },
      { label: 'Date longue', value: '2026年10月27日星期二' },
      { label: 'Heure', value: '13:30 · 下午1:30' },
      { label: 'Nombre', value: '12,345,678.9' },
      { label: 'Grands nombres (12 000 · 350 millions)', value: '1.2万 · 3.5亿' },
      { label: 'Monnaie', value: '¥1,234.56 · 1234.56元' },
      { label: 'Ordre du nom (nom puis prénom, sans espace)', value: '王小明' },
      { label: 'Adresse (du plus grand au plus petit)', value: '上海市浦东新区世纪大道123号 200120' },
      { label: 'Téléphone', value: '139 1234 5678 · +86 139 1234 5678' },
      { label: 'Début de semaine', value: '星期一 (lundi)' },
    ],
    visual: {
      frame: 'phone',
      lang: 'zh-CN',
      alt: 'Accueil d’une super-app chinoise : barre de recherche, rangée « scanner, payer, transports, cartes », grille de dix services avec badge « coupons » et pastille rouge, bannière rouge du 11.11, mini-programmes récents et flux en cascade de cartes de hauteurs différentes, barre d’onglets avec un badge de messages.',
      html: `<div class="cn">
  <div class="cn-head"><span class="cn-loc">上海<i data-icon="chevron-down"></i></span><span class="cn-search"><i data-icon="search"></i>搜索服务、小程序</span><i data-icon="scan-line"></i></div>
  <div class="cn-hero"><span><i data-icon="scan-line"></i>扫一扫</span><span><i data-icon="qr-code"></i>收付款</span><span><i data-icon="bus"></i>出行</span><span><i data-icon="wallet"></i>卡包</span></div>
  <div class="cn-grid">
    <span><b style="--c:#c2410c"><i data-icon="utensils"></i></b>外卖<span class="cn-tag">领券</span></span>
    <span><b style="--c:#2563eb"><i data-icon="car"></i></b>打车</span>
    <span><b style="--c:#e11d48"><i data-icon="film"></i></b>电影</span>
    <span><b style="--c:#b45309"><i data-icon="zap"></i></b>充值</span>
    <span><b style="--c:#7c3aed"><i data-icon="hotel"></i></b>酒店</span>
    <span><b style="--c:#0e7490"><i data-icon="train-front"></i></b>火车票</span>
    <span><b style="--c:#15803d"><i data-icon="stethoscope"></i></b>医疗</span>
    <span><b style="--c:#be185d"><i data-icon="landmark"></i></b>政务</span>
    <span><b style="--c:#a16207"><i data-icon="chart-column"></i></b>理财<span class="cn-dot"></span></span>
    <span><b style="--c:#475569"><i data-icon="layout-grid"></i></b>更多</span>
  </div>
  <div class="cn-banner"><b>双11狂欢</b><span>最高领100元红包</span><span class="cn-go">去领取</span></div>
  <div class="cn-recent"><p>最近使用</p><span>社区团购</span><span>停车缴费</span><span>共享单车</span></div>
  <div class="cn-feed">
    <div class="cn-col">
      <div class="cn-card"><div class="cn-pic" style="--h:128px;--g:linear-gradient(160deg,#f6d8b8,#e2a06f)"></div><p>秋天的第一杯奶茶，五款新品测评</p><p class="cn-meta"><span class="cn-av" style="--a:#e9a98c"></span><span class="cn-user">小鹿吃喝</span><span class="cn-like"><i data-icon="heart"></i>1.2万</span></p></div>
      <div class="cn-card"><div class="cn-pic" style="--h:76px;--g:linear-gradient(160deg,#d3e7da,#8fbfa5)"></div><p>周末去哪儿｜上海秋日徒步路线</p><p class="cn-meta"><span class="cn-av" style="--a:#94c2a8"></span><span class="cn-user">城市漫步</span><span class="cn-like"><i data-icon="heart"></i>3562</span></p></div>
    </div>
    <div class="cn-col">
      <div class="cn-card"><div class="cn-pic" style="--h:84px;--g:linear-gradient(160deg,#dbe4f5,#9db3e0)"></div><p>租房改造：花了不到2000元</p><p class="cn-meta"><span class="cn-av" style="--a:#a9bde6"></span><span class="cn-user">住进小窝</span><span class="cn-like"><i data-icon="heart"></i>8848</span></p></div>
      <div class="cn-card"><div class="cn-pic" style="--h:120px;--g:linear-gradient(160deg,#f3dbe7,#d99ab9)"></div><p>通勤穿搭｜一周不重样</p><p class="cn-meta"><span class="cn-av" style="--a:#e2aac4"></span><span class="cn-user">穿搭日记</span><span class="cn-like"><i data-icon="heart"></i>2.3万</span></p></div>
    </div>
  </div>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>首页</span><span><i data-icon="chart-column"></i>理财</span><span><i data-icon="store"></i>生活</span><span class="cn-msg"><i data-icon="message-circle"></i>消息<span class="cn-badge">3</span></span><span><i data-icon="user"></i>我的</span></div>
</div>`,
      css: `.cn { font-family: ${ZH}; font-size: 13px; line-height: 1.5; color: #1f2329; background: #f4f5f7; }
.cn-head { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #1a6dde; color: #fff; --ico: 20px; }
.cn-loc { display: flex; align-items: center; gap: 2px; font-weight: 600; --ico: 14px; }
.cn-search { flex: 1; display: flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; background: #fff; color: #6b7280; font-size: 12px; --ico: 14px; }
.cn-hero { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 6px 8px 20px; background: #1a6dde; color: #fff; }
.cn-hero span { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 13px; --ico: 26px; }
.cn-grid { position: relative; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px 2px; margin: -12px 6px 0; padding: 14px 4px 12px; border-radius: 12px; background: #fff; }
.cn-grid > span { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11.5px; line-height: 1.3; text-align: center; }
.cn-grid b { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 11px; background: var(--c); color: #fff; --ico: 19px; }
.cn-tag { position: absolute; top: -8px; inset-inline-end: 0; padding: 0 4px; border-radius: 6px 6px 6px 0; background: #d0021b; color: #fff; font-size: 11px; line-height: 16px; }
.cn-dot { position: absolute; top: -2px; inset-inline-end: 12px; width: 8px; height: 8px; border: 1.5px solid #fff; border-radius: 50%; background: #d0021b; }
.cn-banner { display: flex; align-items: center; gap: 8px; margin: 10px 8px 0; padding: 10px 12px; border-radius: 12px; background: linear-gradient(90deg, #b8160c, #d0021b); color: #fff; }
.cn-banner b { flex: none; font-size: 15px; }
.cn-banner span { flex: 1; font-size: 12px; }
.cn-banner .cn-go { flex: none; padding: 2px 10px; border-radius: 999px; background: #ffe7a8; color: #a3290f; font-weight: 700; }
.cn-recent { display: flex; align-items: center; gap: 6px; margin: 10px 8px 0; overflow: hidden; font-size: 12px; white-space: nowrap; }
.cn-recent p { color: #5a6172; }
.cn-recent span { padding: 1px 8px; border: 1px solid #e3e6ec; border-radius: 999px; background: #fff; }
.cn-feed { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 8px; padding: 10px 8px; }
.cn-col { display: flex; flex-direction: column; gap: 8px; }
.cn-card { overflow: hidden; border-radius: 10px; background: #fff; }
.cn-pic { height: var(--h); background: var(--g); }
.cn-card > p:not(.cn-meta) { display: -webkit-box; padding: 6px 8px 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: 12.5px; line-height: 1.45; }
.cn-meta { display: flex; align-items: center; gap: 4px; padding: 6px 8px 8px; font-size: 11px; color: #5a6172; white-space: nowrap; --ico: 12px; }
.cn-user { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.cn-av { flex: none; width: 16px; height: 16px; border-radius: 50%; background: var(--a); }
.cn-like { flex: none; display: flex; align-items: center; gap: 2px; }
.cn .mk-tabbar { font-size: 11px; }
.cn .mk-tabbar > .on { color: #1a6dde; }
.cn-msg { position: relative; }
.cn-badge { position: absolute; top: -4px; inset-inline-start: 55%; min-width: 16px; padding: 0 4px; border-radius: 8px; background: #d0021b; color: #fff; font-size: 11px; line-height: 16px; text-align: center; }`,
    },
    sources: [
      'palo-it:china',
      'w3c:clreq',
      'marcus2000',
      'mdn:intl',
      {
        label: 'DigiChina — Traduction de la loi chinoise sur la protection des informations personnelles (PIPL, 2021)',
        url: 'https://digichina.stanford.edu/work/translation-personal-information-protection-law-of-the-peoples-republic-of-china-effective-nov-1-2021/',
      },
      { label: 'CNNIC — 43e rapport statistique sur le développement d’Internet en Chine (2019)' },
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ Japan */
  {
    id: 'jp',
    name: 'Japon',
    region: 'Asie de l’Est',
    locale: 'ja-JP',
    dir: 'ltr',
    context: 'fort',
    hofstede: { pdi: 54, idv: 46, mas: 95, uai: 92, lto: 88, ivr: 42 },
    summary: nb(
      'Un marché où l’exhaustivité rassure : le contrôle de l’incertitude est très élevé (92), on veut tout savoir avant d’agir et l’omission inquiète. Les sites marchands sont denses — caractéristiques, garanties, frais de port, points, avis et délais près du prix — parce que cette abondance procure un sentiment de sécurité (anshin). Le contexte est fort : politesse codifiée (keigo, honorifique 様), mascottes et illustrations adoucissent la relation. Les formulaires suivent des règles précises (nom de famille d’abord, lecture en katakana, code postal qui remplit l’adresse) et le paiement dépasse la carte : supérette (konbini), QR code, contre-remboursement, programmes de points.',
    ),
    ecosystem: ['LINE', 'PayPay', '楽天 Rakuten', 'Yahoo! JAPAN', 'Amazon.co.jp', 'メルカリ Mercari', 'モバイルSuica', 'コンビニ (7-Eleven, Lawson, FamilyMart)'],
    conventions: [
      {
        topic: 'densite',
        title: 'Tout montrer rassure',
        body: `Pour beaucoup d’utilisateurs japonais, l’exhaustivité est un gage de sérieux (anshin, le sentiment de sécurité) et un site trop vide paraît « sabishii » (triste, désert). Un site immobilier qui avait épuré ses pages a vu l’engagement et les conversions baisser, puis est revenu à la version dense.

Structure l’abondance (blocs titrés, tableaux, onglets) au lieu de la supprimer.`,
      },
      {
        topic: 'formulaires',
        title: 'Nom de famille d’abord, avec sa lecture',
        body: `Les formulaires demandent 姓 (nom) puis 名 (prénom), puis leur lecture en katakana (フリガナ), car un même kanji peut se lire de plusieurs façons. On s’adresse à la personne par son nom suivi de 様 (sama) : « 山田 花子 様 ».`,
      },
      {
        topic: 'formulaires',
        title: 'Code postal d’abord, du plus grand au plus petit',
        body: `On saisit le code postal (〒150-0001), qui remplit préfecture, ville et quartier ; on complète avec le numéro d’îlot et l’immeuble. Accepte les chiffres pleine chasse (１２３) comme demi-chasse (123) et normalise-les au lieu de renvoyer une erreur.`,
      },
      {
        topic: 'paiement',
        title: 'Konbini, QR code et points',
        body: `Au-delà de la carte : paiement en supérette (コンビニ払い) avec un numéro à présenter en caisse, contre-remboursement (代引き), paiement différé, QR codes (PayPay, d払い, 楽天ペイ). Les programmes de points (楽天ポイント, dポイント…) font partie du prix perçu : affiche les points gagnés à côté du prix.`,
      },
      {
        topic: 'legal',
        title: 'Prix TTC et page du vendeur',
        body: `Depuis le 1er avril 2021, le prix affiché doit inclure la taxe à la consommation (総額表示) : « 8,980円（税込） ». Tout site marchand publie une page « 特定商取引法に基づく表記 » (vendeur, adresse, téléphone, prix, frais, délais, retours), l’équivalent des mentions légales.`,
      },
      {
        topic: 'ton',
        title: 'Politesse codifiée',
        body: `Le registre poli (keigo) est la norme : « ご注文ありがとうございます » (merci pour votre commande), excuses formelles en cas d’erreur (« 申し訳ございません »). Un ton familier ou une blague dans un message d’erreur choque. Mascottes (yuru-chara) et illustrations kawaii humanisent sans remplacer la politesse.`,
      },
      {
        topic: 'typo',
        title: 'Typographie japonaise',
        body: `Trois écritures mêlées (kanji, hiragana, katakana) plus l’alphabet latin, pas d’espaces entre les mots, pas d’italique. Les règles de coupure (kinsoku shori) interdisent 「。」, 「、」 ou un petit kana en début de ligne.

Les lectures se notent en \`ruby\` (furigana) ; l’éditorial utilise parfois l’écriture verticale (tategaki). Polices : Hiragino Sans, Yu Gothic, Meiryo, Noto Sans JP.`,
      },
      {
        topic: 'formats',
        title: 'Dates et ère impériale',
        body: `2026年10月27日 ou 2026/10/27 ; les documents officiels utilisent encore l’ère impériale : 2026 = 令和8年 (Reiwa 8). Prévois le choix de l’ère pour les dates de naissance. Les prix en yens n’ont pas de décimales.`,
      },
      {
        topic: 'mobile',
        title: 'LINE et QR codes',
        body: `LINE est la messagerie dominante : comptes officiels de marque, notifications et service client y passent. Le QR code, inventé au Japon (Denso Wave, 1994), sert à ajouter un contact LINE comme à payer.`,
      },
      {
        topic: 'confiance',
        title: 'Classements, garanties, délais près du bouton',
        body: `Badges de classement (ランキング1位), nombre d’avis, garantie du fabricant, politique de retour et promesse de livraison (« 14時までのご注文で当日発送 », expédié le jour même pour une commande avant 14 h) se placent près du bouton d’achat.

Évite pourtant le texte incrusté dans les bannières, fréquent au Japon : inaccessible, intraduisible et flou à l’agrandissement.`,
      },
    ],
    adapt: {
      do: [
        'Demander 姓 puis 名, avec un champ フリガナ en katakana',
        'Remplir l’adresse à partir du code postal (〒) et accepter chiffres pleine et demi-chasse',
        'Afficher les prix « 税込 » (taxe incluse), les frais de port et les points près du prix',
        'Proposer le paiement en konbini, par QR code et le contre-remboursement',
        'Structurer la densité en blocs titrés, tableaux et onglets plutôt que la supprimer',
        'Publier la page « 特定商取引法に基づく表記 »',
      ],
      dont: [
        'Ne pas épurer une page marchande au point de cacher garanties, frais et délais',
        'Ne pas rejeter une saisie en chiffres pleine chasse (１２３)',
        'Ne pas hiérarchiser du texte japonais avec l’italique ou les capitales',
        'Ne pas plaisanter dans un message d’erreur ou de paiement',
        'Ne pas incruster le texte promotionnel dans des images',
      ],
    },
    formats: [
      { label: 'Date', value: '2026/10/27' },
      { label: 'Date longue', value: '2026年10月27日火曜日' },
      { label: 'Ère impériale (Reiwa 8)', value: '令和8年10月27日' },
      { label: 'Heure', value: '13:30 · 午後1時30分' },
      { label: 'Grands nombres (12 000)', value: '1.2万' },
      { label: 'Monnaie (taxe incluse)', value: '8,980円（税込） · ￥8,980' },
      { label: 'Ordre du nom (nom, prénom, honorifique)', value: '山田 花子 様' },
      { label: 'Lecture du nom (furigana)', value: 'ヤマダ ハナコ' },
      { label: 'Adresse (du plus grand au plus petit)', value: '〒150-0001 東京都渋谷区神宮前1-2-3' },
      { label: 'Téléphone', value: '090-1234-5678 · 03-1234-5678' },
      { label: 'Début de semaine', value: '日曜日 (dimanche)' },
    ],
    visual: {
      frame: 'phone',
      lang: 'ja',
      alt: 'Formulaire d’inscription japonais en trois étapes (saisie, confirmation, fin) : badges rouges « obligatoire », nom et prénom séparés puis leur lecture en katakana, code postal avec bouton de remplissage automatique de l’adresse, préfecture, numéro de téléphone saisi en chiffres pleine chasse avec l’aide « demi-chasse ou pleine chasse acceptées ».',
      html: `<div class="jp">
  <div class="jp-bar"><i data-icon="chevron-left"></i><p>会員登録</p></div>
  <ol class="jp-steps"><li class="on"><b>1</b>入力</li><li><b>2</b>確認</li><li><b>3</b>完了</li></ol>
  <div class="jp-body">
    <div><p class="jp-label">お名前<span class="jp-req">必須</span></p><div class="jp-two"><span class="jp-in">山田</span><span class="jp-in">花子</span></div></div>
    <div><p class="jp-label">フリガナ<span class="jp-req">必須</span></p><div class="jp-two"><span class="jp-in">ヤマダ</span><span class="jp-in">ハナコ</span></div></div>
    <div><p class="jp-label">郵便番号<span class="jp-req">必須</span></p><div class="jp-zip"><span class="jp-in">〒 150-0001</span><span class="jp-btn">住所を自動入力</span></div></div>
    <div><p class="jp-label">都道府県<span class="jp-req">必須</span></p><span class="jp-in">東京都<i data-icon="chevron-down"></i></span></div>
    <div><p class="jp-label">市区町村・番地<span class="jp-req">必須</span></p><span class="jp-in">渋谷区神宮前 1-2-3</span></div>
    <div><p class="jp-label">建物名・部屋番号<span class="jp-req jp-opt">任意</span></p><span class="jp-in">さくらハイツ 201</span></div>
    <div><p class="jp-label">電話番号<span class="jp-req">必須</span></p><span class="jp-in">０９０－１２３４－５６７８</span><p class="jp-help">半角・全角どちらでも入力できます</p></div>
    <span class="jp-cta">確認画面へ進む</span>
    <p class="jp-note">※ご入力いただいた個人情報は、プライバシーポリシーに基づき適切に管理いたします。</p>
  </div>
</div>`,
      css: `.jp { font-family: ${JA}; font-size: 13px; line-height: 1.6; color: #222; }
.jp-bar { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid #e5e5e5; }
.jp-bar p { flex: 1; text-align: center; font-size: 15px; font-weight: 700; margin-inline-end: 26px; }
.jp-steps { display: flex; padding: 10px 16px; list-style: none; background: #faf7f2; }
.jp-steps li { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: #6b6b6b; }
.jp-steps b { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: #8a8a8a; color: #fff; font-size: 11px; }
.jp-steps .on { color: #bf0000; font-weight: 700; }
.jp-steps .on b { background: #bf0000; }
.jp-body { display: flex; flex-direction: column; gap: 10px; padding: 12px 16px 16px; }
.jp-label { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-weight: 700; }
.jp-req { padding: 0 5px; border-radius: 3px; background: #bf0000; color: #fff; font-size: 11px; line-height: 18px; }
.jp-req.jp-opt { background: #666; }
.jp-in { display: flex; align-items: center; justify-content: space-between; min-height: 36px; padding: 6px 10px; border: 1px solid #b5b5b5; border-radius: 4px; background: #fff; }
.jp-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.jp-zip { display: flex; gap: 8px; }
.jp-zip .jp-in { flex: 1; }
.jp-btn { display: grid; place-items: center; padding: 0 10px; border: 1px solid #bf0000; border-radius: 4px; color: #bf0000; font-size: 12px; font-weight: 700; white-space: nowrap; }
.jp-help { margin-top: 3px; font-size: 11px; color: #666; }
.jp-cta { display: grid; place-items: center; min-height: 44px; margin-top: 4px; border-radius: 6px; background: #bf0000; color: #fff; font-size: 15px; font-weight: 700; }
.jp-note { font-size: 11px; line-height: 1.6; color: #666; }`,
    },
    sources: [
      'hitabis:japan',
      'w3c:jlreq',
      { label: '政府広報オンライン — 総額表示の義務化（2021年4月）', url: 'https://www.gov-online.go.jp/article/202104/entry-10238.html' },
      { label: '消費者庁 — 特定商取引法ガイド（通信販売）', url: 'https://www.no-trouble.caa.go.jp/what/mailorder/' },
      'mdn:intl',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ South Korea */
  {
    id: 'kr',
    name: 'Corée du Sud',
    region: 'Asie de l’Est',
    locale: 'ko-KR',
    dir: 'ltr',
    context: 'fort',
    hofstede: { pdi: 60, idv: 18, mas: 39, uai: 85, lto: 100, ivr: 29 },
    summary: nb(
      'L’un des marchés les plus connectés au monde, structuré par ses propres plateformes : Naver (recherche, actualités, achats), KakaoTalk, Coupang, Toss. Portails et applis bancaires sont souvent denses — raccourcis, promotions, événements, notifications — même si Toss a montré qu’une interface épurée peut s’imposer. Le contexte est fort, l’orientation long terme maximale (100) et le contrôle de l’incertitude élevé (85) : vérification d’identité par téléphone, avis détaillés et consentements explicites rassurent. La rapidité est une attente forte — on parle de culture « ppalli-ppalli » (vite, vite) : livraison le lendemain ou à l’aube, paiement en un geste, notifications par KakaoTalk.',
    ),
    ecosystem: ['네이버 Naver', '카카오톡 KakaoTalk', '카카오페이 Kakao Pay', '쿠팡 Coupang', '토스 Toss', '배달의민족 Baemin', 'PASS (본인인증)', '네이버페이 Naver Pay', '당근 Karrot'],
    conventions: [
      {
        topic: 'formulaires',
        title: 'Vérification d’identité par téléphone',
        body: `Beaucoup de services exigent un 본인인증 (vérification d’identité) : nom, date de naissance et premier chiffre du numéro de résident, opérateur, numéro de mobile, puis code SMS ou appli PASS des opérateurs.

Depuis décembre 2020, l’ancien certificat public (공인인증서) a perdu son statut privilégié : Kakao, Naver, Toss ou PASS proposent des certificats « simples » (간편인증).`,
      },
      {
        topic: 'densite',
        title: 'Portails denses et raccourcis',
        body: `Les accueils de portail et de banque regroupent recherche, actualités, météo, raccourcis, promotions et événements ; on navigue par icônes et onglets nombreux. Comme en Chine, c’est autant un modèle économique qu’une préférence : Toss a convaincu avec une banque épurée, une action par écran.`,
      },
      {
        topic: 'typo',
        title: 'Espaces et coupure des mots',
        body: `Le coréen sépare les mots par des espaces, mais le navigateur peut couper un mot entre deux syllabes en fin de ligne : \`word-break: keep-all\` garde les mots entiers. Pas d’italique ; polices Pretendard, Apple SD Gothic Neo, Noto Sans KR.`,
      },
      {
        topic: 'paiement',
        title: 'Paiements « simples » et mensualités',
        body: `Naver Pay, Kakao Pay, Toss Pay, Samsung Pay et les cartes locales, souvent réglées en mensualités (할부), dominent ; le virement sur compte virtuel (무통장입금) reste courant. Prévois ces options avant la carte internationale.`,
      },
      {
        topic: 'mobile',
        title: 'Livraison express et KakaoTalk',
        body: `Livraison le lendemain ou à l’aube (새벽배송), suivi en temps réel, notifications transactionnelles par KakaoTalk (알림톡) plutôt que par e-mail. L’e-mail est moins lu : propose KakaoTalk ou le SMS pour les messages importants.`,
      },
      {
        topic: 'couleur',
        title: 'Rouge pour la hausse, bleu pour la baisse',
        body: `Dans les applis financières coréennes, la hausse est rouge et la baisse **bleue**. Appliquer la convention occidentale (vert = hausse) fausse la lecture d’un portefeuille.`,
      },
      {
        topic: 'ton',
        title: 'Niveaux de politesse',
        body: `Les interfaces utilisent la forme polie (해요체 : « 확인해요 ») ou très polie (합쇼체 : « 확인하십시오 ») selon le contexte. Banques et services publics restent formels ; les applis grand public adoptent un ton plus chaleureux (« 송금했어요 », c’est envoyé).`,
      },
      {
        topic: 'confiance',
        title: 'Avis, communautés et classements',
        body: `Avis avec photos, notes et classements pèsent lourd ; blogs et « cafés » Naver servent de référence avant un achat. Affiche des avis détaillés, les réponses du vendeur et des informations de livraison précises.`,
      },
      {
        topic: 'legal',
        title: 'Consentements séparés',
        body: `La loi sur la protection des informations personnelles (개인정보 보호법) pousse à recueillir des consentements distincts : les inscriptions coréennes listent chaque accord (obligatoire, facultatif, marketing) avec une case « 전체 동의 » (tout accepter) et des cases individuelles.`,
      },
      {
        topic: 'formats',
        title: 'Dates, heures et grands nombres',
        body: `2026. 10. 27. (année, mois, jour séparés par des points), 오후 1:30 (horloge 12 h avec 오전/오후), 1,284,500원 ; grands nombres en 만 (10\u00a0000) : 1.2만. Adresse du plus grand au plus petit, adresse routière (도로명주소) depuis 2014 et code postal à 5 chiffres depuis 2015.`,
      },
    ],
    adapt: {
      do: [
        'Prévoir la vérification d’identité par téléphone (PASS) et les certificats simples (Kakao, Naver, Toss)',
        'Appliquer `word-break: keep-all` aux textes coréens',
        'Proposer Naver Pay, Kakao Pay, Toss Pay et le paiement en mensualités',
        'Envoyer les notifications importantes par KakaoTalk ou SMS',
        'Afficher la hausse en rouge et la baisse en bleu dans les données financières',
        'Séparer chaque consentement, avec une case « 전체 동의 »',
      ],
      dont: [
        'Ne pas laisser le navigateur couper les mots coréens en fin de ligne',
        'Ne pas compter sur l’e-mail pour les messages transactionnels',
        'Ne pas regrouper tous les consentements dans une seule case obligatoire',
        'Ne pas appliquer la convention vert = hausse',
        'Ne pas conclure qu’une interface coréenne doit être dense : teste aussi une version épurée',
      ],
    },
    formats: [
      { label: 'Date', value: '2026. 10. 27.' },
      { label: 'Date longue', value: '2026년 10월 27일 화요일' },
      { label: 'Heure (horloge 12 h)', value: '오후 1:30' },
      { label: 'Grands nombres (12 000)', value: '1.2만' },
      { label: 'Monnaie', value: '1,284,500원 · ₩1,284,500' },
      { label: 'Ordre du nom (nom puis prénom)', value: '홍길동' },
      { label: 'Adresse (adresse routière)', value: '서울특별시 마포구 양화로 123 (04036)' },
      { label: 'Téléphone', value: '010-1234-5678' },
      { label: 'Début de semaine', value: '일요일 (dimanche)' },
    ],
    visual: {
      frame: 'phone',
      lang: 'ko',
      alt: 'Écran coréen de vérification d’identité par téléphone : choix de l’opérateur (SKT sélectionné, KT, LG U+, MVNO), nom, date de naissance avec premier chiffre du numéro de résident masqué, numéro de mobile, accord obligatoire coché, bouton « recevoir le code » et alternatives PASS, Kakao, Naver et Toss.',
      html: `<div class="kr">
  <div class="kr-bar"><i data-icon="arrow-left"></i><p>본인인증</p></div>
  <div class="kr-body">
    <p class="kr-title">휴대폰으로 본인인증을<br>진행해 주세요</p>
    <p class="kr-label">통신사</p>
    <div class="kr-carriers"><span class="on">SKT</span><span>KT</span><span>LG U+</span><span>알뜰폰</span></div>
    <p class="kr-label">이름</p>
    <span class="kr-in">홍길동</span>
    <p class="kr-label">생년월일 / 성별</p>
    <div class="kr-rrn"><span class="kr-in">900101</span><b>–</b><span class="kr-in kr-mask">1●●●●●●</span></div>
    <p class="kr-label">휴대폰 번호</p>
    <span class="kr-in">010-1234-5678</span>
    <p class="kr-check"><i data-icon="circle-check"></i>[필수] 본인확인 서비스 이용약관에 모두 동의합니다</p>
    <span class="kr-cta">인증번호 받기</span>
    <p class="kr-alt">다른 방법으로 인증하기</p>
    <div class="kr-easy"><span>PASS</span><span>카카오</span><span>네이버</span><span>토스</span></div>
  </div>
</div>`,
      css: `.kr { font-family: ${KO}; font-size: 14px; line-height: 1.55; color: #191f28; word-break: keep-all; }
.kr-bar { display: flex; align-items: center; gap: 8px; padding: 10px 14px; }
.kr-bar p { flex: 1; text-align: center; font-size: 15px; font-weight: 700; margin-inline-end: 26px; }
.kr-body { display: flex; flex-direction: column; gap: 6px; padding: 6px 20px 18px; }
.kr-title { margin-bottom: 8px; font-size: 20px; font-weight: 700; line-height: 1.4; }
.kr-label { margin-top: 6px; font-size: 13px; color: #4e5968; }
.kr-carriers, .kr-easy { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
.kr-carriers span { display: grid; place-items: center; min-height: 38px; border: 1px solid #d1d6db; border-radius: 8px; font-size: 13px; font-weight: 600; }
.kr-carriers .on { border-color: #1a5fd8; background: #eef4ff; color: #1a5fd8; box-shadow: inset 0 0 0 1px #1a5fd8; }
.kr-in { display: flex; align-items: center; min-height: 40px; padding: 0 4px; border-bottom: 2px solid #d1d6db; font-size: 15px; }
.kr-rrn { display: flex; align-items: center; gap: 8px; }
.kr-rrn .kr-in { flex: 1; }
.kr-mask { letter-spacing: 0.12em; color: #4e5968; }
.kr-check { display: flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 13px; color: #333d4b; --ico: 18px; }
.kr-check svg { color: #1a5fd8; }
.kr-cta { display: grid; place-items: center; min-height: 50px; margin-top: 6px; border-radius: 12px; background: #1a5fd8; color: #fff; font-size: 16px; font-weight: 700; }
.kr-alt { margin-top: 8px; text-align: center; font-size: 13px; color: #4e5968; }
.kr-easy span { display: grid; place-items: center; min-height: 36px; border-radius: 8px; background: #f2f4f6; font-size: 13px; font-weight: 600; }`,
    },
    sources: [
      { label: 'W3C — Requirements for Hangul Text Layout and Typography', url: 'https://www.w3.org/TR/klreq/' },
      { label: 'MDN — word-break (keep-all)', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/word-break' },
      'w3c:i18n',
      'mdn:intl',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ India */
  {
    id: 'in',
    name: 'Inde',
    region: 'Asie du Sud',
    locale: 'en-IN',
    dir: 'ltr',
    context: 'fort',
    hofstede: { pdi: 77, idv: 48, mas: 56, uai: 40, lto: 51, ivr: 26 },
    summary: nb(
      'Un marché immense, mobile d’abord et très divers : 22 langues reconnues par la Constitution, des centaines de millions d’internautes récents sur des smartphones Android d’entrée de gamme, des connexions inégales. L’anglais domine les interfaces urbaines, mais l’hindi, les langues régionales et le « Hinglish » ouvrent les marchés suivants. La distance hiérarchique est élevée (77) et le contexte fort : confiance, recommandation et options de repli (paiement à la livraison, retours faciles) comptent beaucoup. UPI a fait du paiement par QR code ou identifiant un geste quotidien, et les montants se lisent en lakhs et en crores.',
    ),
    ecosystem: ['UPI (PhonePe, Google Pay, Paytm)', 'WhatsApp', 'Flipkart', 'Amazon.in', 'Meesho', 'Swiggy', 'Zomato', 'Jio', 'Aadhaar / DigiLocker', 'IRCTC'],
    conventions: [
      {
        topic: 'paiement',
        title: 'UPI d’abord, paiement à la livraison ensuite',
        body: `UPI (Unified Payments Interface, opéré par la NPCI) permet de payer par QR code ou identifiant (nom@banque) depuis PhonePe, Google Pay ou Paytm, avec un code PIN. Le paiement à la livraison (Cash on Delivery, souvent réglable en UPI à la porte) reste très demandé : c’est un filet de confiance pour un premier achat.`,
      },
      {
        topic: 'paiement',
        title: 'Mensualités sans frais',
        body: `Pour l’électronique et l’électroménager, le crédit sans frais (« No Cost EMI ») s’affiche dès la fiche produit, avec la mensualité. Les montants s’écrivent en roupies, en général sans décimales : ₹1,04,990.`,
      },
      {
        topic: 'formats',
        title: 'Lakh et crore',
        body: `L’Inde groupe les chiffres par deux après le premier millier : 1,00,000 (1 lakh = 100\u00a0000) et 1,00,00,000 (1 crore = 10\u00a0millions). \`Intl.NumberFormat('en-IN')\` produit ce groupement ; la presse écrit « ₹2.5 lakh » ou « ₹10 crore ». Un prix « 104,990 » paraît étranger.`,
      },
      {
        topic: 'ton',
        title: 'Langues et Hinglish',
        body: `Propose au moins l’hindi en plus de l’anglais, puis les langues de tes régions cibles (tamoul, télougou, bengali, marathi…). En 2022, Meesho a ajouté huit langues régionales en choisissant les mots du quotidien plutôt qu’une traduction littérale.

Le « Hinglish » (hindi en caractères latins mêlé d’anglais) est naturel dans les messages et la recherche : « chashma » pour des lunettes.`,
      },
      {
        topic: 'mobile',
        title: 'Applis légères, réseau variable',
        body: `Beaucoup d’utilisateurs ont un téléphone Android d’entrée de gamme, peu d’espace de stockage et un forfait de données à surveiller. Allège l’appli (version « Lite », PWA), compresse les images, prévois des états hors ligne et la reprise des actions interrompues.`,
      },
      {
        topic: 'formulaires',
        title: 'Connexion par OTP, adresse avec repère',
        body: `On se connecte avec son numéro de mobile (+91) et un code à usage unique (OTP), souvent lu automatiquement par l’appli. Les adresses comportent un point de repère (« Landmark: near City Hospital ») et un PIN code à 6 chiffres, car la numérotation des rues est souvent imprécise.

Beaucoup de personnes n’ont pas de nom de famille au sens occidental : un seul champ « Full name » suffit.`,
      },
      {
        topic: 'confiance',
        title: 'Rassurer et rester joignable',
        body: `Retours faciles, « Cash on Delivery available », vendeur vérifié, avis avec photos, et un service client joignable sur WhatsApp. La recommandation d’un proche ou d’un créateur de contenu pèse beaucoup, dans les métropoles comme dans les villes moyennes (« Tier 2/3 »).`,
      },
      {
        topic: 'legal',
        title: 'Mentions obligatoires sur la fiche produit',
        body: `Les règles indiennes sur le commerce en ligne (Consumer Protection (E-Commerce) Rules 2020 et règles de métrologie légale) imposent d’afficher le MRP (prix de vente maximal, toutes taxes comprises), le pays d’origine et les coordonnées du vendeur.`,
      },
      {
        topic: 'couleur',
        title: 'Couleurs et calendrier des fêtes',
        body: `Le safran, le rouge et le jaune sont associés à la fête et au sacré (mariages, Diwali) ; le blanc au deuil dans de nombreuses communautés. Les grandes périodes commerciales suivent les fêtes (Diwali, Navratri, soldes de festival) et varient selon les régions.`,
      },
    ],
    adapt: {
      do: [
        'Proposer UPI (QR code et identifiant) et le paiement à la livraison',
        'Formater les montants avec `Intl.NumberFormat(\'en-IN\')` : ₹1,04,990',
        'Ajouter un champ « Landmark » et le PIN code à 6 chiffres dans les adresses',
        'Proposer l’hindi et les langues régionales, et une recherche qui comprend le Hinglish',
        'Alléger l’appli et les images pour les téléphones d’entrée de gamme et les réseaux lents',
        'Afficher MRP, pays d’origine et coordonnées du vendeur sur la fiche produit',
      ],
      dont: [
        'Ne pas écrire 1,249,900 : le groupement indien donne 12,49,900',
        'Ne pas exiger un nom de famille',
        'Ne pas supposer une connexion rapide et un téléphone haut de gamme',
        'Ne pas réserver le service client à l’e-mail : WhatsApp est attendu',
        'Ne pas traduire mot à mot : préférer les termes du quotidien',
      ],
    },
    formats: [
      { label: 'Date', value: '27/10/2026' },
      { label: 'Date longue', value: 'Tuesday, 27 October 2026' },
      { label: 'Heure', value: '1:30 pm' },
      { label: 'Nombre (groupement indien)', value: '1,23,45,678.9' },
      { label: '1 lakh · 1 crore', value: '1,00,000 · 1,00,00,000' },
      { label: 'Monnaie', value: '₹1,04,990 · ₹12,34,567.00' },
      { label: 'Ordre du nom (champ unique)', value: 'Priya Sharma' },
      { label: 'Adresse (avec repère)', value: 'Flat 302, Shanti Apartments, MG Road, near City Hospital, Pune, Maharashtra 411001' },
      { label: 'Téléphone', value: '+91 98765 43210' },
      { label: 'Début de semaine', value: 'dimanche (CLDR)' },
    ],
    visual: {
      frame: 'phone',
      lang: 'en-IN',
      alt: 'Écran de paiement d’une boutique indienne : bouton de langue « हिंदी », adresse de livraison avec point de repère et PIN code, ordinateur portable au prix barré de ₹1,49,900 vendu ₹1,04,990 toutes taxes comprises, UPI recommandé avec PhonePe, Google Pay et Paytm, mensualités sans frais, carte, net banking et paiement à la livraison.',
      html: `<div class="in">
  <div class="in-bar"><i data-icon="arrow-left"></i><p>Payment</p><span class="in-lang" lang="hi">हिंदी</span></div>
  <div class="in-body">
    <p class="in-addr"><i data-icon="map-pin"></i><span>Deliver to <b>Priya</b> · Pune 411001, near City Hospital</span></p>
    <div class="in-item"><div class="mk-img in-img"><i data-icon="package"></i></div><div><p class="in-name">Laptop 14″ · 16 GB · 512 GB SSD</p><p class="in-mrp">M.R.P. <s>₹1,49,900</s> <b>30% off</b></p><p class="in-price">₹1,04,990</p><small>Inclusive of all taxes</small></div></div>
    <p class="in-h">Recommended</p>
    <div class="in-opts">
      <div class="in-opt on"><span class="in-radio"></span><div class="in-grow"><b>UPI</b><small>Pay by any UPI app</small><div class="in-apps"><span>PhonePe</span><span>Google Pay</span><span>Paytm</span><span>Enter UPI ID</span></div></div></div>
    </div>
    <p class="in-h">More ways to pay</p>
    <div class="in-opts">
      <div class="in-opt"><span class="in-radio"></span><div class="in-grow"><b>EMI</b><small>No Cost EMI from ₹8,750/month</small></div></div>
      <div class="in-opt"><span class="in-radio"></span><div class="in-grow"><b>Credit / Debit card</b></div></div>
      <div class="in-opt"><span class="in-radio"></span><div class="in-grow"><b>Net Banking</b></div></div>
      <div class="in-opt"><span class="in-radio"></span><div class="in-grow"><b>Cash on Delivery</b><small>Pay by cash or UPI at your door</small></div></div>
    </div>
    <span class="mk-btn mk-btn--block in-cta">Pay ₹1,04,990</span>
  </div>
</div>`,
      css: `.in { font-size: 13px; }
.in-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #1f4fae; color: #fff; }
.in-bar p { flex: 1; font-size: 15px; font-weight: 700; }
.in-lang { padding: 1px 10px; border: 1px solid rgb(255 255 255 / 0.7); border-radius: 999px; font-family: "Noto Sans Devanagari", "Nirmala UI", "Kohinoor Devanagari", sans-serif; font-size: 13px; }
.in-body { display: flex; flex-direction: column; gap: 8px; padding: 12px 12px 16px; background: #f3f5f9; }
.in-addr { display: flex; align-items: flex-start; gap: 6px; font-size: 12px; color: #3b4252; --ico: 15px; }
.in-item { display: flex; gap: 10px; padding: 10px; border-radius: 10px; background: #fff; }
.in-img { flex: none; width: 64px; height: 64px; display: grid; place-items: center; background: linear-gradient(160deg, #cfd8e8, #9aaacb); color: rgb(255 255 255 / 0.85); --ico: 28px; }
.in-name { font-weight: 600; }
.in-mrp { font-size: 12px; color: #5a6172; }
.in-mrp b { color: #0a7d3c; white-space: nowrap; }
.in-price { font-size: 18px; font-weight: 800; }
.in-item small { font-size: 11px; color: #5a6172; }
.in-h { margin-top: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #5a6172; }
.in-opts { overflow: hidden; border-radius: 10px; background: #fff; }
.in-opt { display: flex; gap: 10px; padding: 10px 12px; border-bottom: 1px solid #eceef2; }
.in-opt:last-child { border-bottom: 0; }
${RADIO('in', '#1f4fae')}
.in-grow { flex: 1; display: flex; flex-direction: column; }
.in-grow small { font-size: 12px; color: #5a6172; }
.in-apps { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.in-apps span { padding: 2px 8px; border: 1px solid #c7cedb; border-radius: 6px; font-size: 12px; font-weight: 600; }
.in-cta { min-height: 46px; margin-top: 4px; background: #ffc83d; color: #1d2230; font-size: 15px; }`,
    },
    sources: [
      { label: 'NPCI — Unified Payments Interface (UPI)', url: 'https://www.npci.org.in/what-we-do/upi/product-overview' },
      {
        label: 'Indian Television — Meesho ajoute 8 langues régionales (août 2022)',
        url: 'https://indiantelevision.com/mam/meesho-to-strengthen-its-presence-in-the-regional-markets-220812/',
      },
      { label: 'Consumer Protection (E-Commerce) Rules, 2020 — Ministry of Consumer Affairs (Inde)' },
      'mdn:intl',
      'imp:harden',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ Arab world (Gulf) */
  {
    id: 'arab',
    name: 'Monde arabe (pays du Golfe)',
    region: 'Moyen-Orient',
    locale: 'ar-SA',
    dir: 'rtl',
    context: 'fort',
    hofstede: { pdi: 95, idv: 25, mas: 60, uai: 80, lto: 36, ivr: 52 },
    summary: nb(
      'Une contrainte d’écriture avant tout : l’arabe se lit de droite à gauche, ce qui retourne la mise en page, la navigation et les icônes directionnelles — mais pas les nombres, les horloges ni les logos. Dans les pays du Golfe (Arabie saoudite en référence), le contexte est fort et la distance hiérarchique très élevée (95) : relation, respect, autorité des marques et des institutions, images conformes aux normes locales et à la famille. Le marché est très mobile et jeune ; on y paie par carte Mada, Apple Pay, portefeuilles locaux, paiement fractionné (Tabby, Tamara) et encore souvent à la livraison. Le calendrier hégirien, le Ramadan et le week-end vendredi–samedi rythment l’usage.',
    ),
    ecosystem: ['mada', 'Apple Pay', 'stc pay / STC Bank', 'Tabby', 'Tamara', 'noon', 'Amazon.sa', 'Careem', 'HungerStation', 'Absher / Nafath'],
    conventions: [
      {
        topic: 'navigation',
        title: 'Miroiter la mise en page',
        body: `En \`dir="rtl"\`, tout part de la droite : logo et menu à droite, flèche « retour » vers la droite, étapes et barres de progression de droite à gauche, barre latérale de l’autre côté, carrousels qui avancent vers la gauche.

Écris le CSS en propriétés logiques (\`margin-inline-start\`, \`padding-inline\`, \`inset-inline-end\`) : le miroir devient automatique.`,
      },
      {
        topic: 'navigation',
        title: 'Ce qui ne se miroite pas',
        body: `Les nombres et numéros de téléphone gardent leur ordre, comme les horloges, les coches, les logos, les photos et les icônes symétriques. Les commandes de lecture média gardent leur orientation habituelle. Les icônes d’objets (téléphone, caddie) se décident au cas par cas, puis la règle s’applique partout.`,
      },
      {
        topic: 'typo',
        title: 'Typographie arabe',
        body: `L’arabe est cursif : les lettres se lient, donc **jamais d’espacement entre les lettres** (\`letter-spacing\`), pas de capitales ni d’italique au sens latin. On met en valeur par la graisse ou la couleur.

Choisis une police arabe dédiée (Noto Naskh Arabic, IBM Plex Sans Arabic, Dubai…), un corps un peu plus grand et un interlignage plus généreux que pour le latin. Si tu sers aussi le persan ou l’ourdou, préserve l’antiliant sans chasse (ZWNJ, U+200C) et traite ي/ی et ك/ک comme équivalents dans la recherche.`,
      },
      {
        topic: 'formulaires',
        title: 'Bidirectionnalité dans les champs',
        body: `Un numéro de téléphone, un e-mail ou une référence latine dans un texte arabe doit rester lisible : isole-le (\`dir="ltr"\` sur le champ, \`bdi\`, \`unicode-bidi: isolate\`) pour éviter que « +966 50 123 4567 » ne s’affiche « 4567 123 50 966+ ». C’est le défaut le plus fréquent selon les praticiens.

Les adresses saoudiennes suivent l’adresse nationale : numéro de bâtiment, rue, quartier, ville, code postal à 5 chiffres et numéro complémentaire.`,
      },
      {
        topic: 'formats',
        title: 'Chiffres occidentaux ou arabes orientaux',
        body: `Les interfaces du Golfe affichent souvent les chiffres occidentaux (0–9), mais les chiffres arabes orientaux (٠١٢٣٤٥٦٧٨٩) restent courants. \`Intl\` en \`ar-SA\` produit les seconds par défaut (١٬٢٣٤٫٥٦) : choisis explicitement (\`ar-SA-u-nu-latn\` pour les chiffres occidentaux), tiens-t’y dans tout le produit et accepte les deux à la saisie.`,
      },
      {
        topic: 'formats',
        title: 'Deux calendriers, un autre week-end',
        body: `Le calendrier hégirien (Umm al-Qura en Arabie saoudite) coexiste avec le grégorien ; selon la version des données CLDR, le calendrier par défaut de \`ar-SA\` n’est pas le même : précise \`-u-ca-islamic-umalqura\` ou \`-u-ca-gregory\`.

En Arabie saoudite, le week-end tombe le vendredi et le samedi ; les Émirats sont passés au samedi–dimanche en janvier 2022. Délais « en jours ouvrés » et horaires de service en dépendent.`,
      },
      {
        topic: 'paiement',
        title: 'Mada, Apple Pay et paiement fractionné',
        body: `En Arabie saoudite, le réseau de cartes de débit Mada et Apple Pay sont incontournables, avec stc pay, le paiement fractionné (Tabby, Tamara) et le paiement à la livraison. Les prix incluent la TVA (15 % en Arabie saoudite, 5 % aux Émirats).

Le riyal a depuis février 2025 un symbole officiel (encodé dans Unicode 17), encore peu pris en charge par les polices : « ر.س » ou « SAR » restent sûrs.`,
      },
      {
        topic: 'ton',
        title: 'Respect, famille et images',
        body: `Le registre est respectueux ; l’arabe standard moderne (fusha) convient aux contenus formels, le dialecte du Golfe aux messages marketing proches. Les images respectent les normes locales de pudeur et montrent volontiers la famille. Pendant le Ramadan, horaires, offres et parfois thèmes visuels changent.`,
      },
      {
        topic: 'legal',
        title: 'Protection des données',
        body: `L’Arabie saoudite applique pleinement sa loi sur la protection des données personnelles (PDPL) depuis septembre 2024 ; les Émirats ont leur propre loi fédérale. Consentement, finalité et transferts hors du pays sont encadrés.`,
      },
    ],
    adapt: {
      do: [
        'Poser `dir="rtl"` et `lang="ar"` sur la racine et écrire le CSS en propriétés logiques',
        'Miroiter flèches, chevrons, étapes, barres de progression et carrousels',
        'Isoler numéros, e-mails et références latines avec `dir="ltr"` ou `bdi`',
        'Choisir une police arabe dédiée, avec un corps et un interlignage plus généreux',
        'Afficher la date hégirienne à côté de la grégorienne quand c’est utile',
        'Proposer Mada, Apple Pay, le paiement fractionné et le paiement à la livraison',
      ],
      dont: [
        'Ne pas ajouter d’espacement entre les lettres arabes',
        'Ne pas miroiter les nombres, les horloges, les coches ni les logos',
        'Ne pas croire qu’un `text-align: right` suffit à retourner une interface',
        'Ne pas mélanger chiffres occidentaux et arabes orientaux d’un écran à l’autre',
        'Ne pas réutiliser des photos qui ne respectent pas les normes locales',
      ],
    },
    formats: [
      { label: 'Date (chiffres occidentaux)', value: '27/10/2026' },
      { label: 'Date (ar-SA par défaut)', value: '٢٧\u200f/١٠\u200f/٢٠٢٦' },
      { label: 'Date hégirienne (16 joumada al-oula 1448)', value: '١٦ جمادى الأولى ١٤٤٨ هـ' },
      { label: 'Heure (13 h 30, horloge 12 h)', value: '١:٣٠ م' },
      { label: 'Nombre (chiffres arabes orientaux)', value: '١٬٢٣٤٬٥٦٧٫٨٩' },
      { label: 'Monnaie (chiffres occidentaux)', value: '1,234.56 ر.س' },
      { label: 'Téléphone', value: '+966 50 123 4567' },
      { label: 'Adresse nationale', value: 'Bâtiment, rue, quartier, ville, code postal (5 chiffres), numéro complémentaire (4 chiffres)' },
      { label: 'Ordre du nom', value: 'Prénom, prénom du père, nom de famille' },
      { label: 'Week-end', value: 'vendredi–samedi (Arabie saoudite) · samedi–dimanche (Émirats)' },
      { label: 'Début de semaine', value: 'dimanche' },
    ],
    visual: {
      frame: 'phone',
      dir: 'rtl',
      lang: 'ar',
      alt: 'Fiche produit en arabe, de droite à gauche : flèche de retour à droite, parfum oriental 100 ml à 349 riyals au lieu de 420 avec 17 % de remise, TVA incluse, paiement en 4 fois sans frais, livraison demain à Riyad, paiement à la livraison possible, logos Mada, Apple Pay, Tabby et Tamara, boutons d’ajout au panier et d’achat immédiat, barre d’onglets en arabe.',
      html: `<div class="ar">
  <div class="ar-bar"><i data-icon="arrow-right"></i><p>تفاصيل المنتج</p><span class="ar-icons"><i data-icon="share-2"></i><i data-icon="heart"></i></span></div>
  <div class="mk-img ar-img"><span class="ar-badge">الأكثر مبيعًا</span><i data-icon="gift"></i></div>
  <div class="ar-body">
    <p class="ar-brand">دار العود</p>
    <p class="ar-title">عطر عود ملكي، ماء عطر 100 مل</p>
    <p class="ar-rating"><i data-icon="star"></i>4.8 <span>(1,284 تقييم)</span></p>
    <p class="ar-price"><b>349 ر.س</b><s>420 ر.س</s><span class="ar-off">خصم 17%</span></p>
    <p class="ar-vat">السعر شامل ضريبة القيمة المضافة</p>
    <p class="ar-split">أو قسّمها على 4 دفعات بدون فوائد: <b class="ar-nw">87.25 ر.س</b> للدفعة</p>
    <ul class="ar-facts"><li><i data-icon="truck"></i>التوصيل غدًا إلى الرياض</li><li><i data-icon="wallet"></i>الدفع عند الاستلام متاح</li><li><i data-icon="undo-2"></i>إرجاع مجاني خلال 14 يومًا</li></ul>
    <p class="ar-pay"><span>مدى</span><span>Apple Pay</span><span>تابي</span><span>تمارا</span></p>
    <div class="ar-actions"><span class="ar-cta">أضف إلى السلة</span><span class="ar-buy">اشترِ الآن</span></div>
  </div>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>الرئيسية</span><span><i data-icon="layout-grid"></i>الأقسام</span><span><i data-icon="shopping-cart"></i>السلة</span><span><i data-icon="user"></i>حسابي</span></div>
</div>`,
      css: `.ar { font-family: ${AR}; font-size: 14px; line-height: 1.7; color: #1d2230; }
.ar-bar { display: flex; align-items: center; gap: 10px; padding: 8px 14px; }
.ar-bar p { flex: 1; font-size: 15px; font-weight: 700; }
.ar-icons { display: flex; gap: 14px; }
.ar-img { position: relative; display: grid; place-items: center; margin: 0 14px; aspect-ratio: 16 / 10; background: linear-gradient(160deg, #eadcc4, #c49b62); color: rgb(255 255 255 / 0.75); --ico: 56px; }
.ar-badge { position: absolute; top: 10px; inset-inline-start: 10px; padding: 0 10px; border-radius: 999px; background: #7a4b12; color: #fff; font-size: 12px; line-height: 24px; }
.ar-body { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px 14px; }
.ar-brand { font-size: 12px; font-weight: 700; color: #7a4b12; }
.ar-title { font-size: 16px; font-weight: 700; line-height: 1.5; }
.ar-rating { display: flex; align-items: center; gap: 4px; font-weight: 700; --ico: 15px; }
.ar-rating svg { color: #b45309; fill: currentColor; }
.ar-rating span { font-size: 13px; font-weight: 400; color: #5a6172; }
.ar-price { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; }
.ar-price > * { white-space: nowrap; }
.ar-price b { font-size: 22px; }
.ar-price s { font-size: 13px; color: #5a6172; }
.ar-off { padding: 0 6px; border-radius: 4px; background: #fde8e8; color: #b3261e; font-size: 12px; font-weight: 700; }
.ar-vat { margin-top: -4px; font-size: 12px; color: #5a6172; }
.ar-split { padding: 8px 10px; border-radius: 8px; background: #f3f0ea; font-size: 13px; }
.ar-nw { white-space: nowrap; }
.ar-facts { display: flex; flex-direction: column; gap: 4px; padding: 0; list-style: none; font-size: 13px; }
.ar-facts li { display: flex; align-items: center; gap: 8px; --ico: 16px; }
.ar-facts svg { color: #7a4b12; }
.ar-pay { display: flex; flex-wrap: wrap; gap: 6px; }
.ar-pay span { padding: 1px 10px; border: 1px solid #c7cedb; border-radius: 6px; font-size: 12px; font-weight: 700; }
.ar-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 4px; }
.ar-cta, .ar-buy { display: grid; place-items: center; min-height: 44px; border-radius: 10px; font-weight: 700; }
.ar-cta { background: #7a4b12; color: #fff; }
.ar-buy { border: 1.5px solid #7a4b12; color: #7a4b12; }
.ar .mk-tabbar { font-size: 11px; }
.ar .mk-tabbar > .on { color: #7a4b12; }`,
    },
    sources: [
      'material:bidi',
      'mozilla:rtl',
      'w3c:alreq',
      'mdn:logical',
      'mdn:intl',
      'imp:harden',
      { label: 'Unicode — Support for the new Saudi Riyal currency sign (U+20C1)', url: 'https://blog.unicode.org/2025/03/support-for-new-saudi-riyal-currency.html' },
      { label: 'Saudi Post (SPL) — Adresse nationale', url: 'https://splonline.com.sa/en/national-address-1/' },
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ Brazil */
  {
    id: 'br',
    name: 'Brésil',
    region: 'Amériques',
    locale: 'pt-BR',
    dir: 'ltr',
    context: 'fort',
    hofstede: { pdi: 69, idv: 38, mas: 49, uai: 76, lto: 44, ivr: 59 },
    summary: nb(
      'Un marché mobile, social et chaleureux : on parle aux gens comme à des proches (você), le service client passe par WhatsApp et la recommandation compte beaucoup. Le paiement a ses propres règles : Pix, le paiement instantané lancé par la Banque centrale fin 2020, s’est imposé partout ; la carte se règle souvent en plusieurs fois sans intérêts (parcelamento) ; le boleto sert encore ceux qui n’ont pas de carte. Le contrôle de l’incertitude est élevé (76) : prix par moyen de paiement, frais de port calculés d’après le CEP, délais et garanties doivent être clairs avant l’achat, et le CPF est demandé au paiement.',
    ),
    ecosystem: ['Pix', 'WhatsApp', 'Mercado Livre / Mercado Pago', 'Nubank', 'iFood', 'Magalu', 'Shopee', 'PicPay', 'gov.br', 'Reclame Aqui'],
    conventions: [
      {
        topic: 'paiement',
        title: 'Pix partout',
        body: `Pix permet de payer instantanément, à toute heure, en scannant un QR code ou en collant un code « copia e cola » dans l’appli bancaire. Beaucoup de marchands accordent une remise pour Pix (« 5% de desconto no Pix ») : affiche les deux prix côte à côte.`,
      },
      {
        topic: 'paiement',
        title: 'Parcelamento',
        body: `Le paiement par carte en mensualités sans intérêts (« em até 10x sem juros ») est une attente : la mensualité s’affiche sous le prix dès la fiche produit et dans les listes, pas seulement au paiement.`,
      },
      {
        topic: 'paiement',
        title: 'Boleto bancário',
        body: `Le boleto, un titre de paiement réglable en ligne, en agence ou dans une loterie, sert ceux qui n’ont pas de carte ou préfèrent payer comptant. Sa compensation peut prendre jusqu’à 3 jours ouvrés : annonce que la commande attend la confirmation du paiement.`,
      },
      {
        topic: 'formulaires',
        title: 'CPF et CEP',
        body: `Le CPF (numéro d’identification fiscale, 000.000.000-00) est demandé au paiement, car il figure sur la facture électronique (nota fiscal) : explique-le. Le CEP (code postal, 00000-000) remplit rue, quartier, ville et État : demande-le en premier, puis seulement le numéro et le complément.`,
      },
      {
        topic: 'formulaires',
        title: 'Des noms longs',
        body: `Les noms comportent souvent plusieurs prénoms et deux noms de famille, celui de la mère puis celui du père : « Ana Paula Souza Lima ». Prévois un seul champ « Nome completo » assez long, sans limite à 30 caractères.`,
      },
      {
        topic: 'confiance',
        title: 'WhatsApp comme service client',
        body: `Le Brésil vit sur WhatsApp : questions avant achat, suivi de commande et après-vente y passent. Un bouton « Fale com a gente no WhatsApp » rassure davantage qu’un formulaire de contact. La réputation se lit aussi sur Reclame Aqui, la plateforme de réclamations.`,
      },
      {
        topic: 'ton',
        title: 'Chaleureux et proche',
        body: `Le ton est informel et affectueux : « você », prénoms, émojis dans les messages marketing, célébrations (« Seu pedido chegou! »). Les marques parlent comme des personnes ; un ton administratif paraît froid. Reste précis dans les messages d’erreur et de paiement.

Écris en portugais du Brésil : « celular » et « tela », pas « telemóvel » ni « ecrã ».`,
      },
      {
        topic: 'legal',
        title: 'LGPD et droit de rétractation',
        body: `La LGPD (en vigueur depuis 2020), proche du RGPD, encadre les données personnelles. Le Code de défense du consommateur donne 7 jours pour se rétracter d’un achat à distance (direito de arrependimento) : rappelle-le près du bouton d’achat.`,
      },
      {
        topic: 'formats',
        title: 'Réais, dates et téléphones',
        body: `R$\u00a01.234,56 (point pour les milliers, virgule décimale), 27/10/2026, 13:30 ou 13h30, téléphone (11) 91234-5678 avec l’indicatif régional entre parenthèses. La semaine commence le dimanche dans les calendriers.`,
      },
    ],
    adapt: {
      do: [
        'Proposer Pix (QR code et « copia e cola ») et afficher la remise Pix à côté du prix',
        'Afficher la mensualité « em até 10x sem juros » dès la fiche produit',
        'Demander le CEP en premier pour remplir l’adresse, puis le numéro et le complément',
        'Demander le CPF au paiement en expliquant qu’il sert à la nota fiscal',
        'Ajouter un accès au service client sur WhatsApp',
        'Écrire au « você », de façon chaleureuse et directe',
      ],
      dont: [
        'Ne pas réserver le parcelamento à la dernière étape du paiement',
        'Ne pas exiger une carte : Pix et boleto couvrent ceux qui n’en ont pas',
        'Ne pas couper les noms à 30 caractères ni exiger un seul nom de famille',
        'Ne pas oublier le délai de compensation du boleto dans le suivi de commande',
        'Ne pas employer le portugais du Portugal (« telemóvel », « ecrã ») pour un public brésilien',
      ],
    },
    formats: [
      { label: 'Date', value: '27/10/2026' },
      { label: 'Date longue', value: 'terça-feira, 27 de outubro de 2026' },
      { label: 'Heure', value: '13:30 · 13h30' },
      { label: 'Nombre', value: '1.234.567,89' },
      { label: 'Monnaie', value: 'R$\u00a01.234,56' },
      { label: 'Paiement en plusieurs fois', value: '10x de R$\u00a049,80 sem juros' },
      { label: 'Ordre du nom (mère puis père)', value: 'Ana Paula Souza Lima' },
      { label: 'Adresse', value: 'Rua das Flores, 123, apto 45 – Pinheiros, São Paulo – SP, 05422-000' },
      { label: 'CPF · CEP', value: '000.000.000-00 · 00000-000' },
      { label: 'Téléphone', value: '(11) 91234-5678 · +55 11 91234-5678' },
      { label: 'Début de semaine', value: 'domingo (dimanche)' },
    ],
    visual: {
      frame: 'phone',
      lang: 'pt-BR',
      alt: 'Fiche produit brésilienne d’une friteuse sans huile : prix barré R$ 599, prix R$ 498, « em até 10x de R$ 49,80 sem juros », R$ 473,10 au Pix avec 5 % de remise, calcul du port par CEP avec livraison gratuite jeudi 29/10, boutons « Comprar agora » et « Adicionar ao carrinho », lien vers le service client WhatsApp.',
      html: `<div class="br">
  <div class="br-bar"><i data-icon="arrow-left"></i><span class="br-search"><i data-icon="search"></i>Buscar na Casa Viva</span><span class="br-cart"><i data-icon="shopping-cart"></i><span class="br-n">2</span></span></div>
  <div class="mk-img br-img"><i data-icon="utensils"></i></div>
  <div class="br-body">
    <p class="br-title">Fritadeira Elétrica sem Óleo 5&nbsp;L, Inox, 1500&nbsp;W</p>
    <p class="br-rating"><i data-icon="star"></i>4,8 <span>(2.384 avaliações)</span></p>
    <p class="br-old">R$&nbsp;599,00</p>
    <p class="br-price">R$&nbsp;498,00</p>
    <p class="br-parc">em até <b>10x de R$&nbsp;49,80</b> sem juros</p>
    <p class="br-pix"><b>R$&nbsp;473,10</b> no Pix <span class="br-tag">5% de desconto</span></p>
    <div class="br-frete">
      <p class="br-label">Calcular frete e prazo</p>
      <div class="br-cep"><span class="br-in">05422-000</span><span class="br-ok">OK</span></div>
      <p class="br-ship"><i data-icon="truck"></i><span><b>Frete grátis</b> · chega <span class="br-nw">quinta-feira, 29/10</span></span></p>
    </div>
    <span class="mk-btn mk-btn--block br-buy">Comprar agora</span>
    <span class="mk-btn mk-btn--block br-add">Adicionar ao carrinho</span>
    <p class="br-zap"><i data-icon="message-circle"></i>Dúvidas? Fale com a gente no WhatsApp</p>
  </div>
</div>`,
      css: `.br { font-size: 13px; }
.br-bar { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #c2410c; color: #fff; }
.br-search { flex: 1; display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 8px; background: #fff; color: #5a6172; font-size: 12px; --ico: 14px; }
.br-cart { position: relative; display: flex; }
.br-n { position: absolute; top: -6px; inset-inline-end: -8px; min-width: 16px; height: 16px; border-radius: 8px; background: #ffd23f; color: #1d2230; font-size: 11px; font-weight: 700; line-height: 16px; text-align: center; }
.br-img { display: grid; place-items: center; margin: 12px; aspect-ratio: 16 / 10; background: linear-gradient(160deg, #e4e7ec, #aeb6c4); color: rgb(255 255 255 / 0.85); --ico: 56px; }
.br-body { display: flex; flex-direction: column; gap: 4px; padding: 0 14px 14px; }
.br-title { font-size: 15px; font-weight: 600; line-height: 1.35; }
.br-rating { display: flex; align-items: center; gap: 4px; font-weight: 700; --ico: 14px; }
.br-rating svg { color: #b45309; fill: currentColor; }
.br-rating span { font-weight: 400; color: #5a6172; }
.br-old { margin-top: 4px; font-size: 12px; color: #5a6172; text-decoration: line-through; }
.br-price { font-size: 24px; font-weight: 800; line-height: 1.1; }
.br-parc b { color: #0a7d3c; }
.br-pix { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.br-pix b { font-size: 15px; }
.br-tag { padding: 0 6px; border-radius: 4px; background: #e3f4f1; color: #0f6b61; font-size: 12px; font-weight: 700; }
.br-frete { margin-top: 8px; padding: 10px; border: 1px solid #e1e4ea; border-radius: 10px; }
.br-label { margin-bottom: 6px; font-weight: 700; }
.br-cep { display: flex; gap: 6px; }
.br-in { flex: 1; padding: 6px 10px; border: 1px solid #c3c8d3; border-radius: 6px; }
.br-ok { display: grid; place-items: center; padding: 0 14px; border-radius: 6px; background: #1d2230; color: #fff; font-weight: 700; }
.br-nw { white-space: nowrap; }
.br-ship { display: flex; align-items: center; gap: 6px; margin-top: 8px; font-size: 12px; color: #0a7d3c; --ico: 15px; }
.br-buy { margin-top: 8px; background: #c2410c; }
.br-add { background: #fff; color: #c2410c; border-color: #c2410c; }
.br-zap { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 6px; font-weight: 600; color: #075e54; }
.br-zap svg { color: #128c7e; }`,
    },
    sources: [
      { label: 'Banco Central do Brasil — Pix', url: 'https://www.bcb.gov.br/estabilidadefinanceira/pix' },
      { label: 'Planalto — Código de Defesa do Consumidor (art. 49, direito de arrependimento)', url: 'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm' },
      { label: 'Planalto — Lei Geral de Proteção de Dados (Lei 13.709/2018)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm' },
      'mdn:intl',
      'hofstede',
      'hall',
    ],
  },

  /* ------------------------------------------------------------------ East Africa (Kenya) */
  {
    id: 'ke',
    name: 'Afrique de l’Est (Kenya)',
    region: 'Afrique',
    locale: 'en-KE',
    dir: 'ltr',
    context: 'fort',
    summary: nb(
      'La référence mondiale de l’argent mobile : depuis 2007, M-Pesa (Safaricom) permet d’envoyer, recevoir et payer avec un simple téléphone, y compris un téléphone basique via le menu de la carte SIM et les codes USSD. Une interface kényane doit fonctionner sur un Android d’entrée de gamme, avec des données chères et un réseau irrégulier, et s’intégrer aux usages M-Pesa : numéros Paybill et Till, invite de paiement envoyée sur le téléphone (STK push), confirmation par SMS. L’anglais et le swahili coexistent, souvent mêlés ; le commerce passe beaucoup par WhatsApp. Faute de scores Hofstede fiables publiés, appuie-toi sur la recherche utilisateur locale.',
    ),
    ecosystem: ['M-PESA', 'Safaricom', 'Airtel Money', 'Fuliza / M-Shwari', 'WhatsApp', 'Jumia', 'Bolt', 'Glovo', 'eCitizen'],
    conventions: [
      {
        topic: 'paiement',
        title: 'Payer avec M-Pesa',
        body: `Au paiement, l’utilisateur saisit son numéro (07XX ou 01XX), reçoit sur son téléphone une invite M-Pesa (STK push) et la valide avec son code PIN. Prévois aussi le paiement manuel par Paybill (numéro d’entreprise et numéro de compte) ou par Till (« Buy Goods ») pour qui n’a pas reçu l’invite.`,
      },
      {
        topic: 'paiement',
        title: 'Confirmer comme M-Pesa',
        body: `Chaque transaction M-Pesa produit un SMS de confirmation avec un code de transaction. Reprends ce code dans ton reçu et ton suivi de commande : c’est la preuve que les gens connaissent et conservent. Affiche aussi les frais de transaction quand ils existent.`,
      },
      {
        topic: 'mobile',
        title: 'USSD et SMS pour les téléphones basiques',
        body: `Une partie de la population utilise des téléphones basiques : les menus USSD (codes comme *334#, celui de M-Pesa) et les SMS fonctionnent sans Internet. Pour un service essentiel (santé, agriculture, épargne), prévois un canal USSD ou SMS à côté de l’appli.`,
      },
      {
        topic: 'mobile',
        title: 'Léger et hors ligne d’abord',
        body: `Les données sont chères au regard des revenus et la couverture varie : vise une appli légère (PWA, Android Go), des pages qui se chargent sur un réseau lent, un mode hors ligne et la reprise des actions interrompues. Indique la taille des téléchargements.`,
      },
      {
        topic: 'ton',
        title: 'Anglais, swahili et sheng',
        body: `L’anglais et le kiswahili sont langues officielles ; le sheng, argot urbain mêlant swahili et anglais, est courant chez les jeunes. Propose le swahili pour les services grand public et teste les termes : « Lipa na M-PESA » (payer avec M-Pesa) est compris de tous.`,
      },
      {
        topic: 'formats',
        title: 'L’heure swahilie',
        body: `En swahili, les heures se comptent à partir de 6 h, au lever du jour : 7 h du matin se dit « saa moja » (première heure) et 13 h 30 « saa saba na nusu ». Si tu écris l’heure en toutes lettres en swahili, convertis-la ; sinon, affiche-la en chiffres (13:30 ou 1:30 PM).`,
      },
      {
        topic: 'confiance',
        title: 'Lutter contre les arnaques',
        body: `Les fraudes par SMS et appels (faux remboursements M-Pesa) sont fréquentes : n’invite jamais à communiquer le code PIN, affiche le nom du bénéficiaire et le montant avant toute validation, et donne un canal humain identifiable (WhatsApp vérifié, numéro court).`,
      },
      {
        topic: 'formulaires',
        title: 'Numéros et adresses',
        body: `Le numéro de mobile (+254 7XX XXX XXX ou +254 1XX XXX XXX) est l’identifiant principal. Les adresses formelles reposent souvent sur une boîte postale (P.O. Box 12345-00100) : pour livrer, demande un quartier, un point de repère et une position sur la carte.`,
      },
      {
        topic: 'legal',
        title: 'Protection des données',
        body: `Le Data Protection Act de 2019 encadre la collecte et l’usage des données ; le bureau du commissaire (ODPC) instruit les plaintes. Recueille un consentement explicite pour le marketing par SMS et explique pourquoi tu demandes le numéro d’identité.`,
      },
    ],
    adapt: {
      do: [
        'Intégrer M-Pesa avec l’invite STK push et une solution de repli Paybill ou Till',
        'Prévoir un canal USSD ou SMS pour les services essentiels',
        'Alléger l’appli et prévoir un mode hors ligne',
        'Afficher le nom du bénéficiaire et le montant avant toute validation',
        'Proposer l’anglais et le swahili, et tester les termes avec des utilisateurs locaux',
      ],
      dont: [
        'Ne pas exiger une carte bancaire pour payer',
        'Ne jamais demander le code PIN M-Pesa dans l’appli ou par message',
        'Ne pas supposer une connexion 4G permanente ni un téléphone récent',
        'Ne pas traduire littéralement une heure en swahili sans la convertir',
        'Ne pas exiger une adresse postale complète pour livrer',
      ],
    },
    formats: [
      { label: 'Date', value: '27/10/2026' },
      { label: 'Date longue', value: 'Tuesday, 27 October 2026' },
      { label: 'Heure', value: '13:30 · 1:30 pm' },
      { label: 'Heure swahilie (13 h 30)', value: 'saa saba na nusu mchana' },
      { label: 'Nombre', value: '1,234,567.89' },
      { label: 'Monnaie', value: 'KSh 1,250 · KES 1,250.00' },
      { label: 'Téléphone', value: '0712 345 678 · +254 712 345 678' },
      { label: 'Paiement M-Pesa', value: 'Paybill 567890, compte SOKO4821 · Till 123456' },
      { label: 'Code USSD de M-Pesa', value: '*334#' },
      { label: 'Adresse postale', value: 'P.O. Box 12345-00100, Nairobi' },
    ],
    visual: {
      frame: 'phone',
      lang: 'en',
      alt: 'Paiement d’une épicerie en ligne kényane : panier en shillings (sukuma wiki, tomates, farine de maïs, huile) pour 1 250 KSh, option « Lipa na M-PESA » avec le numéro de téléphone, repli par Paybill ; par-dessus, l’invite M-Pesa du téléphone demande de confirmer le paiement à SOKO FRESH LTD avec le code PIN.',
      html: `<div class="ke">
  <div class="ke-bar"><i data-icon="arrow-left"></i><p>Checkout</p><span class="ke-lang">Kiswahili</span></div>
  <div class="ke-body">
    <div>
      <p class="ke-h">Your basket</p>
      <p class="ke-row"><span>Sukuma wiki, 2 bunches</span><span>KSh 60</span></p>
      <p class="ke-row"><span>Nyanya (tomatoes), 1 kg</span><span>KSh 120</span></p>
      <p class="ke-row"><span>Unga (maize flour), 2 kg</span><span>KSh 190</span></p>
      <p class="ke-row"><span>Cooking oil, 3 L</span><span>KSh 880</span></p>
      <p class="ke-row ke-total"><span>Total</span><span>KSh 1,250</span></p>
    </div>
    <div class="ke-opt on"><span class="ke-radio"></span><div class="ke-grow"><b>Lipa na M-PESA</b><small>We’ll send a payment prompt to your phone</small><span class="ke-in">0712 345 678</span></div></div>
    <div class="ke-opt"><span class="ke-radio"></span><div class="ke-grow"><b>Card</b><small>Visa, Mastercard</small></div></div>
    <p class="ke-alt">No prompt? Pay via <b>Paybill 567890</b>, account <b>SOKO4821</b>.</p>
    <span class="mk-btn mk-btn--block ke-cta">Pay KSh 1,250</span>
  </div>
  <div class="mk-overlay"><div class="ke-stk">
    <p>Pay KSh 1,250.00 to SOKO FRESH LTD, account SOKO4821?</p>
    <p class="ke-pin-label">Enter M-PESA PIN:</p>
    <span class="ke-pin">••••</span>
    <p class="ke-btns"><span>Cancel</span><span>OK</span></p>
  </div></div>
</div>`,
      css: `.ke { font-size: 13px; }
.ke-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #0f5132; color: #fff; }
.ke-bar p { flex: 1; font-size: 15px; font-weight: 700; }
.ke-lang { padding: 1px 8px; border: 1px solid rgb(255 255 255 / 0.7); border-radius: 999px; font-size: 12px; }
.ke-body { display: flex; flex-direction: column; gap: 10px; padding: 12px 14px 18px; }
.ke-h { margin-bottom: 4px; font-weight: 700; }
.ke-row { display: flex; justify-content: space-between; padding: 2px 0; font-variant-numeric: tabular-nums; }
.ke-total { margin-top: 4px; padding-top: 6px; border-top: 1px solid #e3e6ec; font-size: 15px; font-weight: 700; }
.ke-opt { display: flex; gap: 10px; padding: 10px 12px; border: 1px solid #dfe3ea; border-radius: 10px; }
.ke-opt.on { border-color: #0f5132; box-shadow: inset 0 0 0 1px #0f5132; }
${RADIO('ke', '#0f5132')}
.ke-grow { flex: 1; display: flex; flex-direction: column; }
.ke-grow small { font-size: 12px; color: #5a6172; }
.ke-in { margin-top: 6px; padding: 7px 10px; border: 1px solid #c3c8d3; border-radius: 6px; font-variant-numeric: tabular-nums; }
.ke-alt { font-size: 12px; color: #5a6172; }
.ke-cta { min-height: 44px; background: #0f5132; }
.ke .mk-overlay { place-items: start center; padding-top: 64px; }
.ke-stk { width: min(100%, 250px); padding: 16px 18px 12px; border-radius: 4px; background: #fff; box-shadow: 0 12px 32px rgb(0 0 0 / 0.3); }
.ke-stk p { font-size: 14px; line-height: 1.45; }
.ke-pin-label { margin-top: 8px; }
.ke-pin { display: block; margin: 4px 0 14px; padding: 2px; border-bottom: 2px solid #0f5132; font-size: 16px; letter-spacing: 0.3em; }
.ke-btns { display: flex; justify-content: flex-end; gap: 22px; color: #0f5132; font-weight: 700; text-transform: uppercase; }`,
    },
    sources: [
      { label: 'Safaricom — M-PESA', url: 'https://www.safaricom.co.ke/main-mpesa' },
      { label: 'The Star (Kenya) — M-Pesa now available on *334# (2020)', url: 'https://www.the-star.co.ke/news/2020-09-10-m-pesa-now-available-on-334-menu' },
      { label: 'Office of the Data Protection Commissioner (Kenya) — Data Protection Act 2019', url: 'https://www.odpc.go.ke/' },
      'mdn:intl',
      'imp:harden',
    ],
  },

  /* ------------------------------------------------------------------ South-East Asia (Indonesia) */
  {
    id: 'sea',
    name: 'Asie du Sud-Est (Indonésie en référence)',
    region: 'Asie du Sud-Est',
    locale: 'id-ID',
    dir: 'ltr',
    context: 'fort',
    hofstede: { pdi: 78, idv: 14, mas: 46, uai: 48, lto: 62, ivr: 38 },
    summary: nb(
      'Un marché presque exclusivement mobile, jeune et très social. Les super-apps Grab et Gojek regroupent transport, livraison et paiement ; les portefeuilles (GoPay, OVO, DANA, ShopeePay) et le QR code national QRIS ont fait reculer les espèces sans les remplacer : paiement à la livraison et virement sur compte virtuel restent courants. Le commerce est gamifié (pièces, jeux, ventes flash, live) et rythmé par les fêtes 9.9, 11.11 et 12.12. La distance hiérarchique est élevée (78) et l’individualisme très faible (14) : famille, communauté et recommandation guident les choix, dans un pays à majorité musulmane où le Ramadan est le grand temps fort.',
    ),
    ecosystem: ['Gojek / GoPay', 'Grab', 'Shopee / ShopeePay', 'Tokopedia', 'TikTok Shop', 'OVO', 'DANA', 'QRIS', 'WhatsApp', 'Traveloka'],
    conventions: [
      {
        topic: 'paiement',
        title: 'QRIS et portefeuilles',
        body: `Depuis le 1er janvier 2020, les QR codes de paiement indonésiens suivent le standard national QRIS (Bank Indonesia) : un même code accepte GoPay, OVO, DANA, ShopeePay et les applis bancaires. Affiche « QRIS » et les portefeuilles acceptés.`,
      },
      {
        topic: 'paiement',
        title: 'Compte virtuel et paiement à la livraison',
        body: `Beaucoup paient par virement sur un compte virtuel (Virtual Account) créé pour la commande, ou à la livraison (COD, « Bayar di Tempat »). Affiche le délai de paiement du compte virtuel et un bouton pour copier le numéro.`,
      },
      {
        topic: 'densite',
        title: 'Commerce gamifié',
        body: `Pièces à collecter (koin), jeux, connexion quotidienne récompensée, ventes flash avec compte à rebours, cashback et live : l’e-commerce est aussi un divertissement. Garde ces mécaniques honnêtes (pas de faux stock ni de faux minuteur) et lisibles.`,
      },
      {
        topic: 'mobile',
        title: 'Super-apps et usage mobile',
        body: `Grab et Gojek concentrent moto-taxi (ojek), VTC, livraison de repas, courses et paiement : on attend une grille de services, un solde de portefeuille visible et un paiement intégré. L’usage est quasi exclusivement mobile, souvent sur Android milieu de gamme.`,
      },
      {
        topic: 'confiance',
        title: 'Recommandation et commerce social',
        body: `Individualisme très faible (14) : on achète sur la recommandation de proches, d’influenceurs ou de vendeurs joints par WhatsApp et Instagram. Avis avec photos, badge de boutique officielle et discussion avec le vendeur intégrée rassurent.`,
      },
      {
        topic: 'ton',
        title: 'Bahasa Indonesia, ton chaleureux',
        body: `Le bahasa Indonesia est la langue commune ; le ton est amical et poli (« Kak » pour s’adresser au client, « Terima kasih »). Les messages marketing aiment l’argot jeune et les émojis ; les messages de paiement restent clairs.`,
      },
      {
        topic: 'formats',
        title: 'Rupiahs, heures et fuseaux',
        body: `Rp1.234.567 (point pour les milliers, sans décimales en pratique), 27/10/2026, heure avec un point et le fuseau : « 13.30 WIB ». L’Indonésie compte trois fuseaux (WIB, WITA, WIT) : précise-le pour une livraison, un vol ou un événement en ligne.`,
      },
      {
        topic: 'formulaires',
        title: 'Noms et adresses',
        body: `Beaucoup d’Indonésiens n’ont qu’un seul nom (comme Soekarno) : un champ « Nama lengkap » unique, sans nom de famille obligatoire. Les adresses mentionnent RT/RW (unités de voisinage), kelurahan et kecamatan ; le numéro de mobile (+62 8…) sert d’identifiant et de canal (code par SMS ou WhatsApp).`,
      },
      {
        topic: 'legal',
        title: 'Données, halal et Ramadan',
        body: `La loi sur la protection des données personnelles (UU PDP, 2022) s’applique pleinement depuis octobre 2024. La certification halal devient progressivement obligatoire pour les produits concernés : affiche-la. Le Ramadan change horaires, offres et logistique avant les congés de Lebaran.`,
      },
    ],
    adapt: {
      do: [
        'Accepter QRIS, les portefeuilles (GoPay, OVO, DANA, ShopeePay), le compte virtuel et le paiement à la livraison',
        'Afficher les prix sans décimales : Rp1.234.567',
        'Préciser le fuseau (WIB, WITA, WIT) dans les horaires de livraison et d’événements',
        'Accepter un seul nom dans « Nama lengkap »',
        'Envoyer codes et notifications par WhatsApp ou SMS',
        'Préparer les temps forts : Ramadan, Lebaran, 9.9, 11.11, 12.12 (Harbolnas)',
      ],
      dont: [
        'Ne pas exiger de nom de famille',
        'Ne pas concevoir d’abord pour ordinateur',
        'Ne pas afficher de faux comptes à rebours ni de faux stocks dans les ventes flash',
        'Ne pas oublier la certification halal sur les produits concernés',
        'Ne pas proposer la carte bancaire comme seul moyen de paiement',
      ],
    },
    formats: [
      { label: 'Date', value: '27/10/2026' },
      { label: 'Date longue', value: 'Selasa, 27 Oktober 2026' },
      { label: 'Heure (avec fuseau)', value: '13.30 WIB' },
      { label: 'Fuseaux', value: 'WIB (UTC+7) · WITA (UTC+8) · WIT (UTC+9)' },
      { label: 'Nombre', value: '1.234.567,89' },
      { label: 'Monnaie (sans décimales)', value: 'Rp1.234.567 · Rp125rb' },
      { label: 'Ordre du nom', value: 'souvent un seul nom (Soekarno)' },
      { label: 'Adresse', value: 'Jl. Melati No. 12, RT 03/RW 05, Kel. Menteng, Kec. Menteng, Jakarta Pusat 10310' },
      { label: 'Téléphone', value: '0812-3456-7890 · +62 812-3456-7890' },
      { label: 'Début de semaine', value: 'Minggu (dimanche)' },
    ],
    visual: {
      frame: 'phone',
      lang: 'id',
      alt: 'Accueil d’une place de marché indonésienne gamifiée : recherche, solde du portefeuille, pièces et bouton de paiement QRIS, bannière 11.11 avec livraison gratuite et cashback, grille de huit raccourcis (livraison gratuite, cashback, pièces du jour, live, recharges et factures, repas, paiement à la livraison), récompenses de connexion quotidienne et vente flash avec compte à rebours et barres « bientôt épuisé ».',
      html: `<div class="id">
  <div class="id-head"><span class="id-search"><i data-icon="search"></i>Cari di Pasar Kita</span><span class="id-ico"><i data-icon="shopping-cart"></i><span class="id-n">3</span></span><span class="id-ico"><i data-icon="message-circle"></i></span></div>
  <div class="id-wallet"><span><small>Saldo</small><b>Rp125.000</b></span><span><small>Koin</small><b>2.350</b></span><span class="id-qris"><i data-icon="scan-line"></i>QRIS</span></div>
  <div class="id-banner"><b>11.11 Big Sale</b><span>Gratis Ongkir + Cashback s.d. 50%</span></div>
  <div class="id-grid">
    <span><b style="--c:#d73211"><i data-icon="truck"></i></b>Gratis Ongkir</span>
    <span><b style="--c:#15803d"><i data-icon="percent"></i></b>Cashback</span>
    <span><b style="--c:#b45309"><i data-icon="gift"></i></b>Koin Harian</span>
    <span><b style="--c:#e11d48"><i data-icon="play"></i></b>Live</span>
    <span><b style="--c:#2563eb"><i data-icon="phone"></i></b>Pulsa &amp; Tagihan</span>
    <span><b style="--c:#c2410c"><i data-icon="utensils"></i></b>Makanan</span>
    <span><b style="--c:#0e7490"><i data-icon="package"></i></b>COD</span>
    <span><b style="--c:#475569"><i data-icon="layout-grid"></i></b>Lainnya</span>
  </div>
  <div class="id-card">
    <p><b>Check-in harian</b> · klaim +25 koin hari ini</p>
    <div class="id-days"><span class="done">+5</span><span class="done">+10</span><span class="today">+25</span><span>+10</span><span>+15</span><span>+20</span><span>+50</span></div>
  </div>
  <div class="id-card">
    <p class="id-flash-h"><b>FLASH SALE</b><span class="id-timer">02:14:09</span><span class="id-more">Lihat semua</span></p>
    <div class="id-items">
      <div><div class="mk-img id-ph" style="--g:linear-gradient(160deg,#fde2c8,#f3a86b)"><i data-icon="shirt"></i></div><p class="id-p">Rp49.000</p><s>Rp99.000</s><span class="id-bar"><span class="id-fill" style="width:82%"></span><span class="id-txt">Segera habis</span></span></div>
      <div><div class="mk-img id-ph" style="--g:linear-gradient(160deg,#dbe7f7,#92b0e0)"><i data-icon="headphones"></i></div><p class="id-p">Rp129.000</p><s>Rp259.000</s><span class="id-bar"><span class="id-fill" style="width:64%"></span><span class="id-txt">Terjual 1,2rb</span></span></div>
      <div><div class="mk-img id-ph" style="--g:linear-gradient(160deg,#dff2e3,#93cfa3)"><i data-icon="coffee"></i></div><p class="id-p">Rp35.000</p><s>Rp60.000</s><span class="id-bar"><span class="id-fill" style="width:40%"></span><span class="id-txt">Terjual 860</span></span></div>
    </div>
  </div>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>Beranda</span><span><i data-icon="play"></i>Live</span><span><i data-icon="ticket"></i>Promo</span><span><i data-icon="bell"></i>Notifikasi</span><span><i data-icon="user"></i>Saya</span></div>
</div>`,
      css: `.id { font-size: 12.5px; color: #1d2230; background: #f3f3f3; }
.id-head { display: flex; align-items: center; gap: 12px; padding: 8px 10px; background: #d73211; color: #fff; --ico: 20px; }
.id-search { flex: 1; display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 4px; background: #fff; color: #5a6172; font-size: 12px; --ico: 14px; }
.id-ico { position: relative; display: flex; }
.id-n { position: absolute; top: -6px; inset-inline-end: -8px; min-width: 16px; height: 16px; border-radius: 8px; background: #fff; color: #b3261e; font-size: 11px; font-weight: 700; line-height: 16px; text-align: center; }
.id-wallet { display: flex; align-items: center; gap: 14px; margin: 8px; padding: 8px 10px; border-radius: 8px; background: #fff; }
.id-wallet > span { display: flex; flex-direction: column; line-height: 1.3; }
.id-wallet small { font-size: 11px; color: #5a6172; }
.id-wallet b { font-size: 13px; }
.id-wallet .id-qris { margin-inline-start: auto; flex-direction: row; align-items: center; gap: 4px; padding: 6px 8px; border-radius: 6px; background: #fdecea; color: #b3261e; font-size: 12px; font-weight: 700; white-space: nowrap; --ico: 15px; }
.id-banner { display: flex; flex-direction: column; margin: 0 8px; padding: 10px 12px; border-radius: 8px; background: linear-gradient(90deg, #a61b11, #d73211); color: #fff; }
.id-banner b { font-size: 15px; }
.id-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px 4px; margin: 8px; padding: 10px 4px; border-radius: 8px; background: #fff; }
.id-grid > span { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11px; line-height: 1.25; text-align: center; }
.id-grid b { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: var(--c); color: #fff; --ico: 18px; }
.id-card { margin: 0 8px 8px; padding: 8px 10px; border-radius: 8px; background: #fff; }
.id-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; margin-top: 6px; }
.id-days span { display: grid; place-items: center; height: 28px; border-radius: 6px; background: #f1f2f4; color: #5a6172; font-size: 11px; font-weight: 700; }
.id-days .done { background: #fdecea; color: #b3261e; }
.id-days .today { background: #d73211; color: #fff; }
.id-flash-h { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.id-flash-h b { color: #d73211; font-size: 14px; letter-spacing: 0.03em; }
.id-timer { padding: 1px 6px; border-radius: 4px; background: #1d2230; color: #fff; font-size: 12px; font-variant-numeric: tabular-nums; }
.id-more { min-width: 0; margin-inline-start: auto; overflow: hidden; text-overflow: ellipsis; font-size: 12px; color: #5a6172; }
.id-items { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 8px; }
.id-ph { display: grid; place-items: center; aspect-ratio: 1; background: var(--g); color: rgb(255 255 255 / 0.9); --ico: 30px; }
.id-p { margin-top: 4px; color: #d73211; font-size: 13px; font-weight: 800; }
.id-items s { font-size: 11px; color: #5a6172; }
.id-bar { position: relative; display: block; height: 16px; margin-top: 4px; overflow: hidden; border-radius: 8px; background: #fde2dd; }
.id-fill { position: absolute; inset-block: 0; inset-inline-start: 0; background: #f4a593; }
.id-txt { position: relative; display: block; overflow: hidden; color: #7a1d0e; font-size: 11px; font-weight: 600; line-height: 16px; text-align: center; white-space: nowrap; text-overflow: ellipsis; }
.id .mk-tabbar { font-size: 11px; }
.id .mk-tabbar > .on { color: #d73211; }`,
    },
    sources: [
      { label: 'Bank Indonesia — Lancement du standard QRIS (17 août 2019)', url: 'https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/SP_216219.aspx' },
      'mdn:intl',
      'marcus2000',
      'hofstede',
      'hall',
    ],
  },
];
