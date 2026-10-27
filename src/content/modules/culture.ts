import type { ModuleContent, SourceRef } from '../../engine/types';

/* ---------- Sources absentes de src/content/sources.ts ---------- */

const S = {
  marcusBeijing: {
    label: 'Outblaze — Aaron Marcus à la conférence User Friendly de Pékin (2007)',
    url: 'https://blog.outblaze.com/?p=44',
  },
  marcusCourse: {
    label: 'Aaron Marcus — Cross-Cultural User-Interface Design, cours SIGGRAPH Asia 2010',
    url: 'https://history.siggraph.org/wp-content/uploads/2025/07/2010-SA_Courses_Marcus_Cross-Cultural-User-Interface-Design-for-Work.pdf',
  },
  w3cL10n: { label: 'W3C — Localization vs. Internationalization', url: 'https://www.w3.org/International/questions/qa-i18n' },
  w3cNames: { label: 'W3C — Personal names around the world', url: 'https://www.w3.org/International/questions/qa-personal-names' },
  w3cTextSize: { label: 'W3C — Text size in translation', url: 'https://www.w3.org/International/articles/article-text-size' },
  w3cBidi: {
    label: 'W3C — Inline markup and bidirectional text in HTML',
    url: 'https://www.w3.org/International/articles/inline-bidi-markup/',
  },
  klreq: { label: 'W3C — Requirements for Hangul Text Layout and Typography', url: 'https://www.w3.org/TR/klreq/' },
  cnnic: {
    label: 'EqualOcean — CNNIC, 43ᵉ rapport sur l’Internet chinois (2019)',
    url: 'https://equalocean.com/news/201903011498-cnnic-publishes-43rd-statistical-report-internet-development',
  },
  lifull: {
    label: 'Boing Boing — Japanese users prefer dense, busy websites (2026, d’après le Japan Times)',
    url: 'https://boingboing.net/2026/01/05/japanese-users-prefer-dense-busy-websites.html',
  },
  colours: { label: 'data.europa.eu — Colour connotations', url: 'https://data.europa.eu/apps/data-visualisation-guide/colour-connotations' },
  koreaStock: {
    label: 'Seoul Economic Daily — le rouge pour la hausse, le bleu pour la baisse (en coréen)',
    url: 'https://m.sedaily.com/article/10901778',
  },
  fauxPas: {
    label: 'Wikipédia — Faux pas derived from Chinese pronunciation',
    url: 'https://en.wikipedia.org/wiki/Faux_pas_derived_from_Chinese_pronunciation',
  },
  greenHat: { label: 'Wikipédia — Cuckold, « green hat »', url: 'https://en.wikipedia.org/wiki/Cuckold#Green_hat' },
  readium: {
    label: 'Readium — Internationalisation et typographie (CJK sans italique)',
    url: 'https://readium.org/css/docs/CSS17-i18n_typography.html',
  },
  textEmphasis: { label: 'MDN — text-emphasis', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/text-emphasis' },
  wordBreak: { label: 'MDN — word-break', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/word-break' },
  hyphens: { label: 'MDN — hyphens', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/hyphens' },
  bdi: { label: 'MDN — l’élément bdi', url: 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/bdi' },
  normalize: {
    label: 'MDN — String.prototype.normalize()',
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/normalize',
  },
  weekInfo: {
    label: 'MDN — Intl.Locale.prototype.getWeekInfo()',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo',
  },
  uaeWeekend: {
    label: 'Gulf News — UAE weekend change from January 1, 2022',
    url: 'https://gulfnews.com/living-in-uae/ask-us/uae-weekend-change-new-weekend-will-come-into-effect-from-january-1-2022-1.1638869146739',
  },
  furigana: {
    label: 'Chrome for Developers — Noms phonétiques japonais et saisie automatique (2026)',
    url: 'https://developer.chrome.com/blog/japanese-phonetic-name-autofill',
  },
  japanPost: { label: 'Japan Post — 郵便番号検索', url: 'https://www.post.japanpost.jp/zipcode/' },
  japanTax: {
    label: '政府広報オンライン — 総額表示の義務化 (2021)',
    url: 'https://www.gov-online.go.jp/article/202104/entry-10238.html',
  },
  indiaCod: {
    label: 'YourStory — Le paiement à la livraison domine encore chez les marques D2C indiennes (2024)',
    url: 'https://yourstory.com/2024/12/d2c-brands-cash-delivery-delivery',
  },
  pix: {
    label: 'Bloomberg Línea — Pix, moyen de paiement le plus utilisé au Brésil (2022)',
    url: 'https://www.bloomberglinea.com/english/two-years-since-launching-pix-is-the-most-used-payment-method-in-brazil/',
  },
  boleto: { label: 'Stripe — Boleto', url: 'https://docs.stripe.com/payments/boleto' },
  viacep: { label: 'ViaCEP — recherche d’adresse par CEP', url: 'https://viacep.com.br/' },
  cnilBilan: {
    label: 'CNIL — Refuser les cookies doit être aussi simple qu’accepter',
    url: 'https://www.cnil.fr/fr/refuser-les-cookies-doit-etre-aussi-simple-quaccepter-bilan-de-la-deuxieme-campagne-de-mises-en',
  },
  tiktok: {
    label: 'Hunton — CNIL fines TikTok 5 million euros (2023)',
    url: 'https://huntonak.com/privacy-and-information-security-law/cnil-fines-tiktok-5-million-euros-over-cookie-infringements',
  },
  toubon: {
    label: 'Légifrance — Loi n° 94-665 du 4 août 1994 (loi Toubon)',
    url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000349929',
  },
  bgb312j: { label: '§ 312j BGB — Button-Lösung', url: 'https://www.gesetze-im-internet.de/bgb/__312j.html' },
  bgb312k: { label: '§ 312k BGB — bouton de résiliation', url: 'https://www.gesetze-im-internet.de/bgb/__312k.html' },
  ddg5: { label: '§ 5 DDG — Impressum', url: 'https://www.gesetze-im-internet.de/ddg/__5.html' },
  itRecht: {
    label: 'IT-Recht Kanzlei — Bestellbutton : « kaufen » ou « bestellen » ?',
    url: 'https://www.it-recht-kanzlei.de/button-kaufen-bestellen.html',
  },
  salesTax: {
    label: 'Tax Foundation — State and local sales tax rates',
    url: 'https://taxfoundation.org/data/all/state/sales-tax-rates/',
  },
  bankid: { label: 'BankID — Statistik', url: 'https://www.bankid.com/en/om-oss/statistik' },
  duReform: { label: 'Wikipédia — Du-reformen', url: 'https://en.wikipedia.org/wiki/Du-reformen' },
  isoWeek: {
    label: 'Wikipédia — Numérotation ISO des semaines',
    url: 'https://fr.wikipedia.org/wiki/Num%C3%A9rotation_ISO_des_semaines',
  },
  mpesa: { label: 'Wikipédia — M-Pesa', url: 'https://en.wikipedia.org/wiki/M-Pesa' },
  ussd: {
    label: 'Safaricom — M-PESA disponible sur *334# (2020)',
    url: 'https://safaricom.co.ke/media-center-landing/press-releases/m-pesa-now-available-on-334',
  },
  daraja: { label: 'Safaricom Daraja — API M-Pesa Express (STK push)', url: 'https://developer.safaricom.co.ke/' },
  idWallets: {
    label: 'Fintech News Singapore — Worldpay Global Payments Report 2024 (portefeuilles en Asie)',
    url: 'https://fintechnews.sg/58718/e-commerce/china-india-and-indonesia-record-highest-digital-wallet-adoption-rates-across-apac/',
  },
  qris: {
    label: 'Bank Indonesia — lancement de QRIS (communiqué du 17 août 2019)',
    url: 'https://www.bi.go.id/id/publikasi/ruang-media/news-release/Pages/SP_216219.aspx',
  },
  qrisOne: {
    label: 'UKM Indonesia — QRIS, un seul QR code pour tous les paiements',
    url: 'https://ukmindonesia.id/baca-deskripsi-posts/qris-satu-qr-code-untuk-semua-pembayaran',
  },
  fischer: {
    label: 'Fischer & Schwartz (2011) — Whence differences in value priorities?',
    url: 'https://cris.huji.ac.il/en/publications/whence-differences-in-value-priorities-individual-cultural-or-art/',
  },
  upi: { label: 'Wikipédia — Unified Payments Interface', url: 'https://en.wikipedia.org/wiki/Unified_Payments_Interface' },
  swish: { label: 'Wikipédia — Swish', url: 'https://en.wikipedia.org/wiki/Swish_(payment)' },
} satisfies Record<string, SourceRef>;

/* ---------- Fragments partagés par plusieurs maquettes ---------- */

const ZH_PARA =
  '城市里的小店正在悄悄改变。越来越多的街坊习惯在手机上下单，由附近的店主亲自送货上门。对老人来说，这意味着不用再提着重物爬楼梯；对店主来说，这是留住老顾客的新办法。我们走访了十二家社区小店，听他们讲述这一年的变化。';

const KO_TEXT = '주문하신 상품이 오늘 밤 12시 전에 출발합니다. 새벽 배송으로 내일 아침 7시 전에 문 앞에 도착해요.';

const culture: ModuleContent = {
  id: 'culture',
  title: 'UI interculturelle',
  category: 'culture',
  summary:
    'Adapter une interface à un marché au-delà de la traduction : grilles de lecture culturelles, densité, couleurs et symboles, écritures, droite à gauche, formats, paiements et obligations légales — et savoir quand tester plutôt que supposer.',
  minutes: 18,
  commands: ['harden', 'clarify'],
  sources: ['imp:harden', 'imp:clarify', 'w3c:i18n', 'marcus2000', 'hofstede', 'hall', 'mdn:intl', 'mdn:logical', 'material:bidi', 'mozilla:rtl', 'w3c:clreq', 'cnil:cookies'],
  sections: [
    {
      id: 'localiser',
      title: 'Localiser n’est pas traduire',
      body: `Quand un produit change de marché, trois chantiers se superposent :

- **Internationalisation** (*i18n* : 18 lettres entre le i et le n) : concevoir le produit pour qu’il puisse s’adapter à n’importe quelle langue ou région sans être réécrit. Textes extraits du code, Unicode partout, formats confiés à \`Intl\`, mises en page qui s’étirent, propriétés CSS logiques.
- **Localisation** (*l10n*) : adapter le produit à une **locale**, c’est-à-dire une langue *et* une région — \`pt-BR\` n’est pas \`pt-PT\`. Traduction, formats de date, de nombre et de monnaie, unités, moyens de paiement, obligations légales.
- **Culturalisation** : adapter le fond — images, symboles, couleurs, exemples, ton, fonctionnalités — pour qu’il soit pertinent et acceptable sur place.

Aaron Marcus, pionnier du design d’interface interculturel, résume le piège : l’approche courante de la localisation se limite à la langue et aux formats d’affichage, alors qu’elle va bien au-delà de la traduction et doit traiter des questions culturelles plus profondes. Il propose de passer en revue cinq composants de toute interface : les **métaphores**, les **modèles mentaux**, la **navigation**, l’**interaction** et l’**apparence**.

Côté rédaction, impeccable demande des messages complets plutôt que des fragments concaténés (l’ordre des mots change d’une langue à l’autre), des variables que le traducteur peut déplacer, et de la place pour l’expansion du texte au lieu d’abréger d’avance.`,
      examples: [
        {
          title: 'Un paiement traduit… mais pas localisé',
          bad: {
            alt: 'Récapitulatif de commande en français avec un champ « Code ZIP », un champ « État » réglé sur Californie, un total de $49.99, une livraison estimée le 10/27/2026 et un bouton « Payer avec Venmo ».',
            css: `.lc .sel{display:flex;justify-content:space-between;align-items:center}`,
            html: `<div class="lc mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Adresse de livraison</p>
  <div class="mk-grid" style="--cols:2;--gap:8px">
    <div class="mk-field"><span class="mk-label">Code ZIP</span><span class="mk-input">94110</span></div>
    <div class="mk-field"><span class="mk-label">État</span><span class="mk-input sel">Californie <i data-icon="chevron-down" style="--ico:14px"></i></span></div>
  </div>
  <div class="mk-divider"></div>
  <div class="mk-row mk-between"><span>Total</span><span class="mk-price">$49.99</span></div>
  <p class="mk-small mk-muted">Livraison estimée le 10/27/2026</p>
  <span class="mk-btn mk-btn--block">Payer avec Venmo</span>
</div>`,
          },
          badNote: 'Traduit mot à mot : code ZIP, État, dollars, date américaine et un moyen de paiement inconnu en France.',
          good: {
            alt: 'Récapitulatif de commande en français avec code postal et ville, un total de 49,99 €, une livraison estimée le mardi 27 octobre, les moyens de paiement Carte bancaire et PayPal et un bouton « Payer 49,99 € ».',
            css: `.lc-pay{display:flex;gap:6px;flex-wrap:wrap}`,
            html: `<div class="lc mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Adresse de livraison</p>
  <div class="mk-grid" style="--cols:2;--gap:8px">
    <div class="mk-field"><span class="mk-label">Code postal</span><span class="mk-input">75011</span></div>
    <div class="mk-field"><span class="mk-label">Ville</span><span class="mk-input">Paris</span></div>
  </div>
  <div class="mk-divider"></div>
  <div class="mk-row mk-between"><span>Total</span><span class="mk-price">49,99&nbsp;€</span></div>
  <p class="mk-small mk-muted">Livraison estimée le mardi 27&nbsp;octobre</p>
  <div class="lc-pay"><span class="mk-badge">Carte bancaire</span><span class="mk-badge">PayPal</span></div>
  <span class="mk-btn mk-btn--block">Payer 49,99&nbsp;€</span>
</div>`,
          },
          goodNote: 'Localisé : champs d’adresse français, prix au format local, date lisible, moyens de paiement courants.',
        },
      ],
    },
    {
      id: 'grilles',
      title: 'Les grilles de lecture culturelles, et leurs limites',
      body: `Deux modèles servent de point de départ pour formuler des hypothèses — pas des certitudes.

### Les dimensions de Hofstede
À partir d’enquêtes menées chez IBM entre 1967 et 1973, puis complétées, Geert Hofstede note les pays sur six dimensions (de 0 à 100 environ) :

- **Distance hiérarchique** : acceptation d’un pouvoir inégalement réparti (Arabie saoudite 95, Chine 80, Suède 31).
- **Individualisme** face au collectivisme (États-Unis 91, Corée du Sud 18, Indonésie 14).
- **Orientation réussite**, dite « masculinité » : compétition, performance (Japon 95, Suède 5).
- **Contrôle de l’incertitude** : besoin de règles et de prévisibilité (Japon 92, France 86, Chine 30).
- **Orientation long terme** (Corée du Sud 100, États-Unis 26).
- **Indulgence**, ajoutée en 2010 (Suède 78, Chine 24).

Marcus et Gould (2000) en ont tiré des hypothèses d’interface pour les cinq dimensions alors publiées :

- **Forte distance hiérarchique** : mettre en avant expertise, certifications et dirigeants ; accès guidé à l’information.
- **Individualisme** : réussite personnelle, arguments tranchés. **Collectivisme** : le groupe, la tradition, des affirmations consensuelles.
- **Orientation réussite** : maîtrise, exploration, compétition. À l’opposé : coopération, tâches rapides, esthétique.
- **Fort contrôle de l’incertitude** : rester simple, annoncer les conséquences d’une action, empêcher l’utilisateur de se perdre, doubler les repères (couleur, forme, texte).
- **Orientation long terme** : valeur pratique, réseau de relations, patience.

### Le contexte selon Hall
L’anthropologue Edward T. Hall oppose les cultures à **contexte fort**, où une grande part du sens passe par l’implicite, la relation et la situation (Japon, Chine, Corée, monde arabe), aux cultures à **contexte faible**, où le message doit tout dire explicitement (États-Unis, Allemagne, pays nordiques). La France se situe souvent entre les deux.

### Les limites
- Ce sont des **moyennes nationales** : elles ne décrivent aucun individu. Une étude portant sur plus de 190 000 personnes (Fischer et Schwartz, 2011) trouve même plus de consensus que de désaccord entre pays sur les priorités de valeurs.
- Les données sont **anciennes** et régulièrement révisées (The Culture Factor publie des valeurs mises à jour).
- Les prédictions **se contredisent** parfois : selon Marcus, un fort contrôle de l’incertitude appelle des écrans simples ; or le Japon (92) a certains des sites les plus denses au monde, précisément pour rassurer.
- Le risque est de **plaquer un stéréotype**. Une grille sert à poser des questions ; seules la recherche et les tests avec des utilisateurs locaux y répondent.`,
    },
    {
      id: 'densite',
      title: 'Densité et hiérarchie : ce que l’Occident appelle « chargé »',
      body: `Ouvre une appli chinoise, japonaise ou coréenne après une appli américaine : la densité saute aux yeux — grilles d’icônes, bannières, badges, plusieurs appels à l’action par écran. Plusieurs explications se cumulent :

- **L’écriture.** Un caractère chinois porte souvent un mot entier : on dit plus en moins de place. Sans capitales ni italique, la hiérarchie passe par la couleur, les cadres et les blocs plutôt que par la typographie.
- **Le mobile d’abord.** 98,6 % des internautes chinois se connectaient déjà sur mobile fin 2018 (CNNIC). Les **super-apps** (WeChat, Alipay, Meituan) sont des portails vers des dizaines de services : la grille d’icônes en tête d’accueil — le 金刚区, « zone King Kong », souvent deux lignes de quatre ou cinq icônes — en est la vitrine.
- **Le besoin de contexte.** Dans une culture à contexte fort, on veut voir l’ensemble avant de décider. Au Japon, la notion d’*anshin* (sentiment de sécurité) pousse à tout montrer : frais de port, délais, points, avis, garanties près du prix. Des designers rapportent que des pages épurées y paraissent « trop *sabishii* » (vides, tristes) ; selon le Japan Times, des versions épurées du portail immobilier LIFULL HOME’S ont fait baisser l’engagement et les conversions, et l’équipe est revenue à la version dense.

### Le contrepoint
Une partie de la densité sert d’abord le **modèle économique** : un portail vend de l’espace à ses services et à ses annonceurs. Et la tendance n’est pas figée : Douyin s’ouvre en plein écran sur une seule vidéo, Naver a recentré son accueil mobile sur la recherche, Mercari reste sobre. Temu et Shein mêlent densité « asiatique » et respiration « occidentale » selon les marchés.

La leçon n’est donc pas « chargé en Asie, épuré en Occident », mais : **montre ce que l’utilisateur a besoin de voir pour décider et avoir confiance, et range-le**. Une interface dense reste lisible si elle est alignée, groupée et hiérarchisée par la couleur et les blocs.`,
      examples: [
        {
          title: 'Fiche produit pour le Japon',
          bad: {
            alt: 'Fiche produit japonaise pour une brosse à dents électrique : une image, le nom, le prix 7 980 yens toutes taxes comprises et un bouton « Ajouter au panier ».',
            frame: 'phone',
            lang: 'ja',
            css: `.jp-name{font-size:15px;font-weight:700;line-height:1.4}
.jp-price{font-size:22px;font-weight:800;color:#bf0000;font-variant-numeric:tabular-nums}
.jp-price span{font-size:11px;font-weight:600;color:#5a6172;margin-inline-start:2px}`,
            html: `<div class="mk-stack" style="--gap:0">
  <div class="mk-img" style="--ratio:4/3;border-radius:0"></div>
  <div class="mk-pad mk-stack" style="--gap:10px">
    <p class="jp-name">電動歯ブラシ プロケア 3</p>
    <p class="jp-price">¥7,980<span>（税込）</span></p>
    <span class="mk-btn mk-btn--block">カートに入れる</span>
  </div>
</div>`,
          },
          badNote: 'Page épurée « à l’occidentale » : le prix seul, sans rien de ce qui rassure avant l’achat.',
          good: {
            alt: 'La même fiche avec la note de 4,6 sur 1 284 avis, le prix toutes taxes comprises, puis un encadré : livraison gratuite dès le lendemain, 1 % de points, retours gratuits sous 30 jours, garantie fabricant d’un an.',
            frame: 'phone',
            lang: 'ja',
            css: `.jp-name{font-size:15px;font-weight:700;line-height:1.4}
.jp-price{font-size:22px;font-weight:800;color:#bf0000;font-variant-numeric:tabular-nums}
.jp-price span{font-size:11px;font-weight:600;color:#5a6172;margin-inline-start:2px}
.jp-rate{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:700}
.jp-rate .mk-ico{--ico:14px;color:#9a6a00}
.jp-rate span{font-weight:500;color:#5a6172}
.jp-facts{list-style:none;padding:8px 10px;margin:0;display:grid;gap:6px;background:#f4f6f9;border-radius:8px;font-size:12px}
.jp-facts li{display:flex;align-items:center;gap:6px}
.jp-facts .mk-ico{--ico:15px;color:#bf0000}`,
            html: `<div class="mk-stack" style="--gap:0">
  <div class="mk-img" style="--ratio:16/9;border-radius:0"></div>
  <div class="mk-pad mk-stack" style="--gap:8px">
    <p class="jp-name">電動歯ブラシ プロケア 3</p>
    <p class="jp-rate"><i data-icon="star"></i>4.6<span>（1,284件のレビュー）</span></p>
    <p class="jp-price">¥7,980<span>（税込）</span></p>
    <ul class="jp-facts">
      <li><i data-icon="truck"></i>送料無料・最短翌日お届け</li>
      <li><i data-icon="sparkles"></i>ポイント1%還元</li>
      <li><i data-icon="refresh-cw"></i>30日間返品無料</li>
      <li><i data-icon="shield-check"></i>メーカー保証1年</li>
    </ul>
    <span class="mk-btn mk-btn--block">カートに入れる</span>
  </div>
</div>`,
          },
          goodNote: 'Avis, livraison, points, retours et garantie près du prix : tout ce qui lève un doute, groupé dans un encadré.',
        },
      ],
    },
    {
      id: 'couleurs',
      title: 'Couleurs, nombres et symboles',
      body: `Une couleur n’a pas de sens universel : elle hérite des conventions du marché.

- **Rouge.** En Chine, le rouge est la couleur de la chance, de la fête et de la prospérité ; les enveloppes rouges (红包) sont devenues un geste numérique. En Bourse, la **hausse s’affiche en rouge et la baisse en vert** en Chine continentale — l’inverse de l’Occident. La Corée du Sud affiche aussi la hausse en rouge, mais la baisse en **bleu**.
- **Blanc.** Couleur de la pureté en Occident, il est associé au **deuil** en Chine : un visuel de fête en noir et blanc y évoque des funérailles.
- **Vert.** Signal de validation chez nous ; en Chine, « porter un chapeau vert » (戴绿帽子) signifie être trompé.
- **Nombres.** Le **4** se prononce presque comme « mort » en chinois (四 *sì* / 死 *sǐ*), en japonais et en coréen : on l’évite pour les étages, les prix, les numéros. Le **8** (八 *bā*, proche de 发 *fā*, « prospérer ») porte chance : les Jeux de Pékin se sont ouverts le 8/8/2008 à 20 h 08.
- **Cadeaux.** Offrir une pendule (送钟 *sòng zhōng*) se prononce comme « accompagner un mourant » (送终).

### Comment s’en servir
- Dans les interfaces de données (Bourse, santé, alertes), **suis la convention locale** et ne fais jamais porter le sens à la seule couleur : ajoute un signe, une flèche ou un libellé (critère WCAG 1.4.1). Si ton produit sert plusieurs marchés, laisse l’utilisateur choisir.
- Pour les visuels et les campagnes, fais **relire images, couleurs, chiffres et cadeaux par des natifs** avant le lancement, surtout autour des fêtes (Nouvel An chinois, Ramadan, Diwali).`,
      examples: [
        {
          title: 'Liste de cotations pour la Chine continentale',
          bad: {
            alt: 'Liste de trois indices boursiers chinois : les variations positives sont sur fond vert, la variation négative sur fond rouge.',
            lang: 'zh-CN',
            css: `.wl-head{padding:12px 14px 4px}
.wl .mk-list{padding:0 14px 6px}
.wl-num{font-variant-numeric:tabular-nums;font-weight:600;min-width:72px;text-align:end}
.wl-chg{min-width:68px;text-align:center;padding:5px 0;border-radius:6px;color:#fff;font-weight:700;font-variant-numeric:tabular-nums}
.up{background:#12803f}.down{background:#d42a2a}
.wl-num.up,.wl-num.down{background:none}.wl-num.up{color:#12803f}.wl-num.down{color:#d42a2a}`,
            html: `<div class="wl">
  <div class="wl-head mk-row mk-between"><span class="mk-strong">自选</span><span class="mk-small mk-muted">最新价 · 涨跌幅</span></div>
  <ul class="mk-list">
    <li><div class="mk-grow"><p class="mk-strong">上证指数</p><p class="mk-small mk-muted">000001</p></div><span class="wl-num up">3312.45</span><span class="wl-chg up">+0.82%</span></li>
    <li><div class="mk-grow"><p class="mk-strong">深证成指</p><p class="mk-small mk-muted">399001</p></div><span class="wl-num down">10512.33</span><span class="wl-chg down">-0.35%</span></li>
    <li><div class="mk-grow"><p class="mk-strong">创业板指</p><p class="mk-small mk-muted">399006</p></div><span class="wl-num up">2156.78</span><span class="wl-chg up">+1.24%</span></li>
  </ul>
</div>`,
          },
          badNote: 'Convention occidentale : un investisseur chinois lit « baisse » dans chaque case verte.',
          good: {
            alt: 'La même liste avec les variations positives sur fond rouge et la variation négative sur fond vert.',
            lang: 'zh-CN',
            css: `.wl-head{padding:12px 14px 4px}
.wl .mk-list{padding:0 14px 6px}
.wl-num{font-variant-numeric:tabular-nums;font-weight:600;min-width:72px;text-align:end}
.wl-chg{min-width:68px;text-align:center;padding:5px 0;border-radius:6px;color:#fff;font-weight:700;font-variant-numeric:tabular-nums}
.up{background:#d42a2a}.down{background:#12803f}
.wl-num.up,.wl-num.down{background:none}.wl-num.up{color:#d42a2a}.wl-num.down{color:#12803f}`,
            html: `<div class="wl">
  <div class="wl-head mk-row mk-between"><span class="mk-strong">自选</span><span class="mk-small mk-muted">最新价 · 涨跌幅</span></div>
  <ul class="mk-list">
    <li><div class="mk-grow"><p class="mk-strong">上证指数</p><p class="mk-small mk-muted">000001</p></div><span class="wl-num up">3312.45</span><span class="wl-chg up">+0.82%</span></li>
    <li><div class="mk-grow"><p class="mk-strong">深证成指</p><p class="mk-small mk-muted">399001</p></div><span class="wl-num down">10512.33</span><span class="wl-chg down">-0.35%</span></li>
    <li><div class="mk-grow"><p class="mk-strong">创业板指</p><p class="mk-small mk-muted">399006</p></div><span class="wl-num up">2156.78</span><span class="wl-chg up">+1.24%</span></li>
  </ul>
</div>`,
          },
          goodNote: 'Hausse en rouge, baisse en vert, et un signe +/− qui ne laisse pas la couleur seule porter le sens.',
        },
      ],
    },
    {
      id: 'ecritures',
      title: 'Écritures et typographie',
      body: `Chaque écriture a ses règles de composition. Un texte traduit dans une maquette pensée pour l’anglais casse rarement là où on l’attend.

### Chinois et japonais
- **Pas d’italique** : les polices chinoises, japonaises et coréennes n’en ont presque jamais, et le navigateur fabrique un faux oblique peu lisible. On met en valeur par la graisse, la couleur ou les **points d’emphase** (\`text-emphasis\`).
- **Interlignage généreux** : les caractères remplissent un carré plein, sans jambages. Les règles de composition du chinois publiées par le W3C situent l’espace entre les lignes entre 50 et 100 % du corps, soit un \`line-height\` de 1,5 à 2.
- **Polices système** (PingFang SC, Microsoft YaHei, Hiragino Sans, Yu Gothic, Noto Sans CJK) ou sous-ensembles : une police complète compte des milliers de caractères et pèse plusieurs mégaoctets.
- **Coupures** : pas d’espace entre les mots, on peut couper entre presque tous les caractères, mais jamais avant une ponctuation fermante (。、）」) — ce sont les règles de *kinsoku*, gérées par la propriété \`line-break\`.

### Coréen
Le coréen **espace ses mots**. Par défaut, le navigateur le coupe pourtant entre deux syllabes, comme du chinois : ajoute \`word-break: keep-all\` pour ne couper qu’aux espaces — jamais sur du chinois ou du japonais, qui n’auraient presque plus de points de coupure.

### Arabe
- Écriture **cursive** : les lettres se lient. Pas d’espacement des lettres (\`letter-spacing\`) — selon le navigateur et la police, il est ignoré ou il sépare des lettres qui doivent se lier —, ni capitales, ni italique au sens latin.
- À corps égal, l’arabe paraît plus petit que le latin et porte des signes au-dessus et au-dessous des lettres : monte la taille et l’interlignage, et choisis une police arabe dédiée (Noto Naskh Arabic, IBM Plex Sans Arabic, Dubai).

### Allemand et expansion du texte
L’allemand est souvent **30 % plus long** que l’anglais, et ses mots composés (*Datenschutzeinstellungen*) ne se coupent pas seuls. Plus un libellé est court, plus l’expansion relative est forte : IBM prévoit une traduction 2 à 3 fois plus longue pour une chaîne de moins de 10 caractères. Prévois 30 à 40 % de marge, aucune largeur fixe sur du texte, et \`hyphens: auto\` — qui ne fonctionne que si l’attribut \`lang\` indique la langue du contenu.`,
      examples: [
        {
          title: 'Mettre en valeur un texte chinois',
          bad: {
            alt: 'Paragraphe chinois à l’interlignage serré dont la phrase importante est en italique synthétique, penchée.',
            lang: 'zh-CN',
            html: `<div class="mk-pad"><p style="font-size:15px;line-height:1.25">您的账户已开通。为保障资金安全，请<i>务必在24小时内完成实名认证</i>，逾期将暂停提现功能。认证只需上传身份证正反面照片，审核通常在5分钟内完成。</p></div>`,
          },
          badNote: 'Faux italique et interlignage de 1,25 : les caractères se déforment et les lignes se collent.',
          good: {
            alt: 'Le même paragraphe avec un interlignage aéré et la phrase importante en gras rouge foncé.',
            lang: 'zh-CN',
            html: `<div class="mk-pad"><p style="font-size:15px;line-height:1.75">您的账户已开通。为保障资金安全，请<strong style="color:#b42318">务必在24小时内完成实名认证</strong>，逾期将暂停提现功能。认证只需上传身份证正反面照片，审核通常在5分钟内完成。</p></div>`,
          },
          goodNote: 'Emphase par la graisse et la couleur, interlignage de 1,75.',
        },
        {
          title: 'Composer un texte arabe',
          bad: {
            alt: 'Message de confirmation de commande en arabe en petit corps, interlignage serré, avec un passage en faux italique.',
            dir: 'rtl',
            lang: 'ar',
            html: `<div class="mk-pad"><p style="font-size:13px;line-height:1.3">تم تأكيد طلبك بنجاح. سيصلك المندوب <i>خلال يومي عمل</i>، ويمكنك متابعة الشحنة من صفحة «طلباتي». يُرجى التأكد من صحة رقم الجوال لتلقي رمز التحقق عند الاستلام.</p></div>`,
          },
          badNote: 'Corps de 13 px, interlignage de 1,3 et faux italique : l’arabe paraît minuscule et penché à contresens.',
          good: {
            alt: 'Le même message en arabe en corps plus grand, avec un interlignage aéré et le délai de livraison en gras.',
            dir: 'rtl',
            lang: 'ar',
            html: `<div class="mk-pad"><p style="font-size:16px;line-height:1.8">تم تأكيد طلبك بنجاح. سيصلك المندوب <strong>خلال يومي عمل</strong>، ويمكنك متابعة الشحنة من صفحة «طلباتي». يُرجى التأكد من صحة رقم الجوال لتلقي رمز التحقق عند الاستلام.</p></div>`,
          },
          goodNote: 'Corps de 16 px, interlignage de 1,8, emphase par la graisse.',
        },
      ],
    },
    {
      id: 'rtl',
      title: 'Écrire de droite à gauche',
      body: `L’arabe, l’hébreu, le persan ou l’ourdou s’écrivent de droite à gauche (*RTL*). Le texte n’est pas le seul à changer de sens : toute la mise en page se **miroite**, car l’œil part de la droite.

### Ce qu’on miroite
- La mise en page : colonne principale, barre latérale, alignement du texte, ordre des onglets et des boutons.
- Ce qui indique un sens de navigation : flèches retour et suivant, chevrons, carrousels, barres de progression des étapes, curseurs.
- Les icônes qui montrent un mouvement ou une ligne de texte (envoyer, liste, retrait).

### Ce qu’on ne miroite pas
- Les **commandes de lecture** (lecture, avance rapide) et la barre de progression d’une vidéo : elles suivent le sens de la bande, pas celui de l’écriture (Material Design).
- Les **horloges** et les flèches circulaires qui tournent dans le sens des aiguilles d’une montre.
- Les **coches**, les **logos**, les icônes symétriques, les **photos**.
- Les **nombres**, numéros de téléphone et références : les chiffres s’écrivent toujours de gauche à droite.

### Dans le code
- Pose \`dir="rtl"\` et \`lang="ar"\` sur la racine : flexbox et grid inversent l’ordre d’eux-mêmes.
- Écris l’espacement avec les **propriétés logiques** : \`margin-inline-start\`, \`padding-inline\`, \`inset-inline-end\`, \`border-inline-start\` plutôt que *left* et *right*.
- Retourne les seules icônes directionnelles, par exemple avec \`[dir="rtl"] .icone-sens { transform: scaleX(-1); }\` — jamais la page entière.
- **Isole les contenus de gauche à droite** insérés dans un texte arabe — numéros, e-mails, références, URL — avec \`<bdi>\`, \`dir="ltr"\`, ou \`dir="auto"\` sur les champs libres. Sinon, l’algorithme bidirectionnel d’Unicode réordonne leurs morceaux : c’est l’un des bugs RTL les plus fréquents.
- Chiffres : \`Intl.NumberFormat('ar-SA')\` produit des chiffres arabes orientaux (١٢٣), \`ar-AE\` des chiffres occidentaux ; laisse la locale décider ou impose le système avec l’extension \`-u-nu-latn\`.`,
      examples: [
        {
          title: 'Une liste de réglages en arabe',
          bad: {
            alt: 'Écran « Réglages » en arabe resté en mise en page de gauche à droite : flèche retour à gauche, icônes à gauche, textes alignés à gauche, chevrons pointant vers la droite.',
            lang: 'ar',
            dir: 'ltr',
            css: `.set-bar{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #e3e6ec;font-weight:700}
.set .mk-list{padding:0 14px}
.set .mk-list .mk-ico{color:#5a6172}
.set-val{color:#5a6172;font-size:13px}`,
            html: `<div class="set">
  <div class="set-bar"><i data-icon="arrow-left"></i><span>الإعدادات</span></div>
  <ul class="mk-list">
    <li><i data-icon="user"></i><span class="mk-grow">الحساب</span><i data-icon="chevron-right"></i></li>
    <li><i data-icon="bell"></i><span class="mk-grow">الإشعارات</span><i data-icon="chevron-right"></i></li>
    <li><i data-icon="credit-card"></i><span class="mk-grow">طرق الدفع</span><i data-icon="chevron-right"></i></li>
    <li><i data-icon="languages"></i><span class="mk-grow">اللغة</span><span class="set-val">العربية</span><i data-icon="chevron-right"></i></li>
  </ul>
</div>`,
          },
          badNote: 'Texte arabe, mise en page restée de gauche à droite : l’œil part de la droite et ne trouve que des chevrons.',
          good: {
            alt: 'Le même écran miroité : flèche retour pointant vers la droite en tête, icônes et textes à droite, chevrons pointant vers la gauche.',
            lang: 'ar',
            dir: 'rtl',
            css: `.set-bar{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #e3e6ec;font-weight:700}
.set .mk-list{padding:0 14px}
.set .mk-list .mk-ico{color:#5a6172}
.set-val{color:#5a6172;font-size:13px}`,
            html: `<div class="set">
  <div class="set-bar"><i data-icon="arrow-right"></i><span>الإعدادات</span></div>
  <ul class="mk-list">
    <li><i data-icon="user"></i><span class="mk-grow">الحساب</span><i data-icon="chevron-left"></i></li>
    <li><i data-icon="bell"></i><span class="mk-grow">الإشعارات</span><i data-icon="chevron-left"></i></li>
    <li><i data-icon="credit-card"></i><span class="mk-grow">طرق الدفع</span><i data-icon="chevron-left"></i></li>
    <li><i data-icon="languages"></i><span class="mk-grow">اللغة</span><span class="set-val">العربية</span><i data-icon="chevron-left"></i></li>
  </ul>
</div>`,
          },
          goodNote: '`dir="rtl"` sur la racine : la ligne s’inverse d’elle-même ; seules les flèches de navigation sont retournées.',
        },
      ],
    },
    {
      id: 'formats',
      title: 'Formats et formulaires',
      body: `Les formats sont la partie la plus mécanique de la localisation — et la plus souvent ratée quand on les code à la main.

- **Dates** : 10/27/2026 aux États-Unis, 27/10/2026 en France, 27.10.2026 en Allemagne, 2026-10-27 en Suède, 2026年10月27日 en Chine et au Japon (où l’ère impériale, Reiwa 8 en 2026, figure encore sur des formulaires officiels). Le calendrier hégirien coexiste avec le grégorien dans le Golfe.
- **Nombres** : 1,234.56 (\`en-US\`), 1.234,56 (\`de-DE\`), 1 234,56 (\`fr-FR\`). L’Inde groupe par lakhs et crores : 1,00,000 (100 000) et 1,00,00,000 (10 millions). La Chine et le Japon comptent par 万 (10 000) : 1.2万 pour 12 000.
- **Monnaies** : symbole avant ou après, espace ou non, décimales ou non (Rp1.250.000 se passe de centimes).
- **Semaines** : elle commence le dimanche aux États-Unis, le lundi en Europe ; le week-end tombe le vendredi et le samedi en Arabie saoudite ; les Suédois planifient en numéros de semaine.

Ne formate jamais à la main : \`Intl.DateTimeFormat\`, \`Intl.NumberFormat\` (avec \`style: 'currency'\` ou \`notation: 'compact'\`), \`Intl.PluralRules\` et \`Intl.RelativeTimeFormat\` connaissent ces règles pour chaque locale.

### Formulaires
- **Noms** : beaucoup de cultures placent le nom de famille d’abord (Chine, Japon, Corée, Hongrie) ; certaines personnes n’ont qu’un nom, d’autres plusieurs. Le W3C conseille un champ « nom complet » quand c’est possible, et de ne pas restreindre les caractères acceptés.
- **Japon** : nom de famille d’abord, lecture du nom en katakana (*furigana*), code postal (〒) qui remplit l’adresse, adresse du plus grand au plus petit ; chiffres et lettres en pleine ou demi-chasse (*zenkaku* / *hankaku*) acceptés et normalisés plutôt que rejetés.
- **Brésil** : le **CPF** (identifiant fiscal, 000.000.000-00) est demandé au paiement ; le **CEP** (00000-000) remplit l’adresse.
- **Suède** : le *personnummer* sert d’identifiant et peut préremplir l’adresse au paiement.
- **Inde** : un champ « point de repère » (*landmark* : « near … ») aide le livreur ; le code postal (*PIN code*) a 6 chiffres.
- **Téléphones** : accepte le format international (+81 90-1234-5678) au lieu de plaquer le masque d’un seul pays.`,
      examples: [
        {
          title: 'Demander un nom',
          bad: {
            alt: 'Formulaire « Créer votre compte » avec deux champs Prénom (小明) et Nom (王) en erreur, et le message « Utilisez uniquement les lettres de A à Z ».',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Créer votre compte</p>
  <div class="mk-grid" style="--cols:2;--gap:8px">
    <div class="mk-field"><span class="mk-label">Prénom</span><span class="mk-input mk-input--error" lang="zh-CN">小明</span></div>
    <div class="mk-field"><span class="mk-label">Nom</span><span class="mk-input mk-input--error" lang="zh-CN">王</span></div>
  </div>
  <p class="mk-error">Utilisez uniquement les lettres de A à Z.</p>
  <span class="mk-btn mk-btn--block">Continuer</span>
</div>`,
          },
          badNote: 'Deux champs imposés et une validation limitée à l’alphabet latin : le client chinois est refusé chez lui.',
          good: {
            alt: 'Formulaire avec un champ « Nom complet » rempli 王小明 et un champ « Comment devons-nous vous appeler ? » rempli 小明.',
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Créer votre compte</p>
  <div class="mk-field"><span class="mk-label">Nom complet</span><span class="mk-input" lang="zh-CN">王小明</span><span class="mk-help">Tel qu’il figure sur vos documents officiels.</span></div>
  <div class="mk-field"><span class="mk-label">Comment devons-nous vous appeler&#8239;?</span><span class="mk-input" lang="zh-CN">小明</span></div>
  <span class="mk-btn mk-btn--block">Continuer</span>
</div>`,
          },
          goodNote: 'Un champ « nom complet » qui accepte toutes les écritures, et un champ pour l’appellation.',
        },
      ],
    },
    {
      id: 'confiance',
      title: 'Paiement, confiance et loi',
      body: `Le dernier écran est celui où la localisation rate le plus cher : un acheteur qui ne trouve pas son moyen de paiement habituel ou un signe de sérieux abandonne.

### Moyens de paiement locaux
- **Chine** : WeChat Pay et Alipay, par QR code.
- **Inde** : UPI (PhonePe, Google Pay, Paytm) et paiement à la livraison — encore environ 46 % des commandes des marques en ligne en 2023-2024.
- **Brésil** : Pix (lancé fin 2020 par la Banque centrale, devenu le moyen le plus utilisé du pays), boleto et paiement en plusieurs fois sans frais (*parcelamento* : « em até 10x sem juros »).
- **Kenya** : M-Pesa. **Indonésie** : portefeuilles (GoPay, OVO, DANA, ShopeePay), QR code national QRIS, compte virtuel, paiement à la livraison.
- **Japon** : paiement en supérette (*konbini*), PayPay. **Allemagne** : PayPal, achat sur facture (*Kauf auf Rechnung*), prélèvement SEPA. **Suède** : Swish, Klarna. **États-Unis** : cartes, Apple Pay, PayPal, paiement fractionné.

### Signaux de confiance
Ce qui rassure varie : l’**Impressum** et les labels vérifiables en Allemagne, les avis et garanties près du prix au Japon, le paiement à la livraison et les retours faciles en Inde, le service client sur WhatsApp au Brésil.

### Obligations légales (exemples)
- **France** : RGPD et règles de la **CNIL** — refuser les cookies doit être aussi simple que les accepter (amendes de 150 M€ pour Google et 60 M€ pour Facebook en décembre 2021, 5 M€ pour TikTok en décembre 2022). La **loi Toubon** (1994) impose le français dans les offres destinées aux consommateurs. L’**Acte européen sur l’accessibilité** s’applique depuis le 28 juin 2025 au commerce en ligne et à la banque.
- **Allemagne** : **Impressum** (mentions légales) ; bouton de commande explicite (« Button-Lösung », § 312j BGB, 2012) : « zahlungspflichtig bestellen » ou une formule aussi claire, sinon le contrat n’est pas conclu ; depuis juillet 2022, bouton « Verträge hier kündigen » pour résilier en ligne (§ 312k BGB).
- **Japon** : prix affichés toutes taxes comprises (総額表示) depuis avril 2021.
- **États-Unis** : prix affichés **hors taxe**, la *sales tax* s’ajoute au paiement ; en Californie, lien « Do Not Sell or Share My Personal Information ».
- **Chine** : un site hébergé en Chine continentale affiche son numéro d’enregistrement **ICP** (备案号) en pied de page.

Ces règles évoluent : vérifie-les avec un juriste local avant chaque lancement.`,
      examples: [
        {
          title: 'Pied de page d’une boutique allemande',
          bad: {
            alt: 'Pied de page en allemand : « Wir akzeptieren » avec Visa et Mastercard, puis les liens Über uns, Kontakt, Instagram.',
            lang: 'de',
            css: `.ft-links{gap:14px;font-size:13px;color:#1f4fd8}`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Wir akzeptieren</p>
  <div class="mk-row" style="--gap:6px"><span class="mk-badge">Visa</span><span class="mk-badge">Mastercard</span></div>
  <div class="mk-divider"></div>
  <div class="mk-row mk-wrap ft-links"><span>Über uns</span><span>Kontakt</span><span>Instagram</span></div>
</div>`,
          },
          badNote: 'Carte seule et aucune mention légale : peu rassurant, et l’absence d’Impressum est une infraction.',
          good: {
            alt: 'Pied de page en allemand : moyens de paiement PayPal, Rechnung, Lastschrift, Kreditkarte ; un label « Geprüfter Shop » noté 4,8 sur 5 ; la mention des prix TTC hors frais de port ; les liens Impressum, Datenschutz, AGB, Widerrufsrecht.',
            lang: 'de',
            css: `.ft-links{gap:14px;font-size:13px;color:#1f4fd8}
.ft-seal{gap:10px;padding:8px 10px;border:1px solid #e1e4ea;border-radius:10px;font-size:13px;line-height:1.35}
.ft-seal .mk-ico{--ico:26px;color:#12803f}`,
            html: `<div class="mk-pad mk-stack" style="--gap:10px">
  <p class="mk-h3">Zahlungsarten</p>
  <div class="mk-row mk-wrap" style="--gap:6px"><span class="mk-badge">PayPal</span><span class="mk-badge">Rechnung</span><span class="mk-badge">Lastschrift</span><span class="mk-badge">Kreditkarte</span></div>
  <div class="mk-row ft-seal"><i data-icon="shield-check"></i><span><strong>Geprüfter Shop</strong><br>4,8/5 aus 12.408 Bewertungen</span></div>
  <p class="mk-small mk-muted">Alle Preise inkl. MwSt., zzgl. Versandkosten</p>
  <div class="mk-divider"></div>
  <div class="mk-row mk-wrap ft-links"><span>Impressum</span><span>Datenschutz</span><span>AGB</span><span>Widerrufsrecht</span></div>
</div>`,
          },
          goodNote: 'Facture et PayPal, label vérifiable, prix TTC annoncés, liens légaux dans chaque pied de page.',
        },
      ],
    },
  ],
  rules: [
    { id: 'localize', front: 'Localiser, est-ce traduire ?', back: 'Non : la traduction n’en est qu’une partie. On adapte aussi formats, paiements, formulaires, images, symboles, ton et obligations légales à la locale (langue + région).' },
    { id: 'i18n-first', front: 'Que préparer dans le code avant de traduire ?', back: 'L’internationalisation : textes extraits et complets, Unicode, formats via `Intl`, mises en page souples (30 à 40 % de marge), propriétés CSS logiques.' },
    { id: 'grids', front: 'À quoi servent les grilles de Hofstede et de Hall ?', back: 'À formuler des hypothèses de design, pas à prédire un utilisateur : ce sont des moyennes nationales anciennes. On vérifie toujours par des tests locaux.' },
    { id: 'density', front: 'Pourquoi tant d’interfaces chinoises ou japonaises sont-elles denses ?', back: 'Écriture compacte, mobile d’abord et super-apps, besoin de contexte (*anshin* au Japon) — et modèle économique des portails. Dense ne veut pas dire désordonné.' },
    { id: 'stock', front: 'Quelle couleur pour une hausse en Bourse en Chine ? Et en Corée du Sud ?', back: 'Rouge en Chine (baisse en vert). En Corée du Sud, hausse rouge et baisse bleue. Double toujours la couleur d’un signe ou d’une flèche.' },
    { id: 'cjk-emphasis', front: 'Comment mettre en valeur un mot en chinois ou en japonais ?', back: 'Par la graisse, la couleur ou les points d’emphase (`text-emphasis`) ; jamais par l’italique, absent des polices CJK.' },
    { id: 'keep-all', front: 'Comment éviter les mots coupés en coréen ?', back: '`word-break: keep-all` : les lignes ne se coupent qu’aux espaces. Jamais sur du chinois ou du japonais.' },
    { id: 'arabic', front: 'Peut-on espacer les lettres d’un texte arabe ?', back: 'Non : l’écriture est cursive, les lettres se lient. Donne plutôt un corps et un interlignage plus généreux.' },
    { id: 'mirror', front: 'En RTL, que ne faut-il pas miroiter ?', back: 'Les commandes de lecture média, les horloges, les coches, les logos, les photos, les nombres et les numéros de téléphone.' },
    { id: 'logical', front: 'Comment écrire un espacement qui marche en LTR comme en RTL ?', back: 'Avec les propriétés logiques (`margin-inline-start`, `padding-inline`, `inset-inline-end`) et `dir="rtl"` sur la racine.' },
    { id: 'bidi', front: 'Pourquoi un numéro de téléphone se mélange-t-il dans un texte arabe ?', back: 'L’algorithme bidirectionnel réordonne ses groupes de chiffres. Isole-le avec `<bdi>` ou `dir="ltr"`.' },
    { id: 'intl', front: 'Comment afficher dates, nombres et prix selon le marché ?', back: 'Avec `Intl` et la bonne locale : `en-IN` donne 1,00,000, `de-DE` 1.234,56 €, `zh-CN` en notation compacte 1.2万.' },
    { id: 'jp-form', front: 'Que demande un formulaire d’inscription japonais ?', back: 'Le nom de famille d’abord, sa lecture en katakana (フリガナ), un code postal qui remplit l’adresse ; la pleine chasse acceptée et normalisée.' },
    { id: 'legal', front: 'Deux obligations à ne pas rater en France et en Allemagne ?', back: 'France : « Tout refuser » aussi simple que « Tout accepter » pour les cookies. Allemagne : bouton final « zahlungspflichtig bestellen » et Impressum.' },
  ],
  exercises: [
    // @@EXERCISES@@
  ],
};

export default culture;
