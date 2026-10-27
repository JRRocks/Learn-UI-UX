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

const KO_TEXT =
  '주문하신 상품이 물류센터에서 출발했습니다. 새벽 배송으로 내일 아침 7시 전에 문 앞에 도착할 예정이며, 배송이 완료되면 사진으로 알려 드릴게요.';

const culture: ModuleContent = {
  id: 'culture',
  title: 'UI interculturelle',
  category: 'culture',
  summary:
    'Adapter une interface à un marché au-delà de la traduction : grilles de lecture culturelles, densité, couleurs et symboles, écritures, droite à gauche, formats, paiements et obligations légales — et savoir quand tester plutôt que supposer.',
  minutes: 18,
  commands: ['harden', 'clarify'],
  sources: [
    'imp:harden',
    'imp:clarify',
    'w3c:i18n',
    S.w3cL10n,
    S.marcusBeijing,
    'marcus2000',
    S.marcusCourse,
    'hofstede',
    'hall',
    S.fischer,
    'palo-it:china',
    S.cnnic,
    S.lifull,
    'w3c:clreq',
    'w3c:jlreq',
    S.readium,
    S.w3cTextSize,
    'material:bidi',
    'mozilla:rtl',
    'mdn:logical',
    'mdn:intl',
    S.w3cNames,
    'cnil:cookies',
    S.toubon,
    S.bgb312j,
    S.japanTax,
  ],
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
Une partie de la densité sert d’abord le **modèle économique** : un portail vend de l’espace à ses services et à ses annonceurs. Et la tendance n’est pas figée : Douyin s’ouvre en plein écran sur une seule vidéo, Naver a recentré son accueil mobile sur la recherche en 2019, Mercari reste sobre ; Temu et Shein mêlent des codes denses venus de Chine et des mises en page plus aérées.

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
      body: `Chaque écriture a ses règles de composition. Un texte traduit dans une maquette pensée pour l’anglais casse souvent là où on ne l’attend pas.

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
          goodNote: 'La racine passe de droite à gauche : chaque ligne s’inverse d’elle-même ; seules les flèches de navigation sont retournées.',
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
- **Semaines** : la semaine commence le dimanche aux États-Unis, le lundi en Europe ; le week-end tombe le vendredi et le samedi en Arabie saoudite ; les Suédois planifient en numéros de semaine.

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
- **Inde** : UPI (PhonePe, Google Pay, Paytm) et paiement à la livraison — encore environ 46 % des commandes des marques qui vendent en direct (D2C) en 2023-2024.
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
    /* ---------- Chine continentale ---------- */
    {
      id: 'culture-cn-home-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'cn',
      prompt: 'Quelle page d’accueil répond le mieux aux attentes des utilisateurs d’une appli de services de proximité en Chine ?',
      context: 'Une start-up européenne lance en Chine continentale une appli de livraison et de services du quotidien.',
      options: [
        {
          id: 'minimal',
          visual: {
            alt: 'Accueil épuré : le nom de l’appli, un grand titre « Tout ce qu’il faut, livré en 30 minutes », un seul bouton « Commander » et une grande illustration.',
            frame: 'phone',
            lang: 'zh-CN',
            css: `.hm-bar{display:flex;justify-content:space-between;align-items:center;padding:12px 16px}
.hm-logo{font-weight:800;font-size:18px}
.hm-hero{padding:6px 16px 16px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.hm-title{font-size:22px;font-weight:800;line-height:1.3}
.hm-sub{color:#5a6172}
.hm-hero .mk-btn{background:#ffd23f;color:#1d2230}
.hm-img{margin:0 16px 16px;border-radius:12px;aspect-ratio:16/11;background:linear-gradient(160deg,#fff1c2,#ffd23f 60%,#f4b400)}`,
            html: `<div class="hm-bar"><span class="hm-logo">邻家</span><i data-icon="menu"></i></div>
<div class="hm-hero">
  <p class="hm-title">生活所需<br>30分钟送到家</p>
  <p class="hm-sub">外卖、买菜、送药，一个应用全搞定</p>
  <span class="mk-btn">开始点餐</span>
</div>
<div class="hm-img"></div>
<div class="mk-tabbar"><span class="on"><i data-icon="house"></i>首页</span><span><i data-icon="file-text"></i>订单</span><span><i data-icon="user"></i>我的</span></div>`,
          },
          why: 'Un seul service visible : l’utilisateur doit deviner ce que l’appli sait faire et passer par un menu pour le reste.',
        },
        {
          id: 'grid',
          visual: {
            alt: 'Accueil avec la ville et une barre de recherche, une grille de dix icônes de services (repas, supermarché, courses, pharmacie, coursier, fleurs, taxi, hôtel, boissons, tout voir), un bandeau de bienvenue avec réduction et deux cartes de produits.',
            frame: 'phone',
            lang: 'zh-CN',
            css: `.g-top{display:flex;align-items:center;gap:8px;padding:10px 12px 6px}
.g-loc{display:flex;align-items:center;gap:2px;font-weight:700;font-size:13px;white-space:nowrap}
.g-loc .mk-ico{--ico:14px}
.g-search{flex:1;display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;background:#f2f3f5;color:#5a6172;font-size:12px;min-width:0}
.g-search .mk-ico{--ico:14px}
.g-grid{display:grid;grid-template-columns:repeat(5,1fr);row-gap:10px;padding:8px 4px 10px}
.g-cell{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px}
.g-ico{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;color:#fff}
.g-ico .mk-ico{--ico:19px}
.c1{background:#e8590c}.c2{background:#2b8a3e}.c3{background:#1c7ed6}.c4{background:#c2255c}.c5{background:#7048e8}
.g-promo{margin:0 12px;padding:9px 12px;border-radius:12px;background:#fff4d6;display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px}
.g-promo b{color:#c92a2a}
.g-pill{background:#ffd23f;border-radius:999px;padding:3px 10px;font-weight:700;font-size:12px}
.g-feed{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 12px 12px}
.g-card{border-radius:10px;background:#f6f7f9;overflow:hidden;font-size:12px;display:flex;flex-direction:column;gap:2px}
.g-card .mk-img{border-radius:0}
.g-card p{padding:0 8px}
.g-card .g-p{color:#c92a2a;font-weight:800;padding-bottom:8px}
.dot{position:relative}
.dot::after{content:"";position:absolute;top:0;inset-inline-end:6px;width:7px;height:7px;border-radius:50%;background:#e03131}`,
            html: `<div class="g-top"><span class="g-loc"><i data-icon="map-pin"></i>静安区</span><span class="g-search"><i data-icon="search"></i>搜索商家或商品</span></div>
<div class="g-grid">
  <span class="g-cell"><span class="g-ico c1"><i data-icon="utensils"></i></span>外卖</span>
  <span class="g-cell"><span class="g-ico c2"><i data-icon="store"></i></span>超市</span>
  <span class="g-cell"><span class="g-ico c2"><i data-icon="sprout"></i></span>买菜</span>
  <span class="g-cell"><span class="g-ico c3"><i data-icon="pill"></i></span>买药</span>
  <span class="g-cell"><span class="g-ico c1"><i data-icon="bike"></i></span>跑腿</span>
  <span class="g-cell"><span class="g-ico c4"><i data-icon="gift"></i></span>鲜花</span>
  <span class="g-cell"><span class="g-ico c3"><i data-icon="car"></i></span>打车</span>
  <span class="g-cell"><span class="g-ico c5"><i data-icon="hotel"></i></span>酒店</span>
  <span class="g-cell"><span class="g-ico c4"><i data-icon="coffee"></i></span>奶茶</span>
  <span class="g-cell"><span class="g-ico c5"><i data-icon="layout-grid"></i></span>全部</span>
</div>
<div class="g-promo"><span><b>新人专享</b> 满30减15</span><span class="g-pill">领取</span></div>
<div class="g-feed">
  <div class="g-card"><div class="mk-img" style="--ratio:4/3"></div><p>招牌牛肉面</p><p class="g-p">¥22</p></div>
  <div class="g-card"><div class="mk-img" style="--ratio:4/3"></div><p>鲜榨橙汁</p><p class="g-p">¥12</p></div>
</div>
<div class="mk-tabbar"><span class="on"><i data-icon="house"></i>首页</span><span><i data-icon="file-text"></i>订单</span><span class="dot"><i data-icon="message-circle"></i>消息</span><span><i data-icon="user"></i>我的</span></div>`,
          },
          why: 'Recherche, grille d’icônes et promotions : toute l’offre est à un geste, comme dans les super-apps locales.',
        },
      ],
      answer: 'grid',
      explanation: `En Chine, une appli de services est souvent une **super-app** : WeChat, Alipay ou Meituan servent de portail vers des dizaines de services — repas, courses, pharmacie, taxi, hôtel. Les utilisateurs ont l’habitude de voir cette offre d’un coup d’œil dès l’accueil, dans une **grille d’icônes** (le 金刚区, « zone King Kong ») placée sous la recherche et au-dessus des promotions.

L’accueil épuré cache tout derrière un menu : il faut deviner ce que l’appli sait faire. Or l’usage est presque entièrement mobile (98,6 % des internautes chinois dès 2018) et l’écran d’accueil sert de porte d’entrée unique.

La densité n’excuse pas le désordre : icônes alignées, libellés courts, couleurs qui séparent les blocs. Et la convention se vérifie par des tests avec des utilisateurs locaux.`,
      takeaway: 'En Chine, une appli de services montre l’étendue de son offre dès l’accueil (recherche, grille d’icônes, promotions) : dense, mais rangée.',
      sources: ['palo-it:china', S.cnnic],
    },
    {
      id: 'culture-cn-stock-colors',
      type: 'choice',
      difficulty: 1,
      culture: 'cn',
      prompt: 'Laquelle de ces fiches boursières est adaptée à un investisseur en Chine continentale ?',
      options: [
        {
          id: 'green-up',
          visual: {
            alt: 'Fiche de l’indice de Shanghai en hausse de 0,82 % : la valeur, la variation et la courbe montante sont en vert ; la ligne en baisse est en rouge.',
            frame: 'phone',
            lang: 'zh-CN',
            css: `.sk{--up:#12803f;--down:#d42a2a;padding:12px 14px 14px;display:flex;flex-direction:column;gap:8px}
.sk-name{display:flex;align-items:baseline;gap:6px}
.sk-name b{font-size:16px}
.sk-name span{color:#5a6172;font-size:12px}
.sk-val{font-size:30px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.1}
.sk-chg{display:flex;gap:12px;font-weight:700;font-variant-numeric:tabular-nums}
.sk-chart{color:var(--up);width:100%;height:auto}
.sk-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:12px}
.sk-stats span{display:block;color:#5a6172}
.sk-stats b{font-variant-numeric:tabular-nums}
.sk-list{list-style:none;margin:0;padding:0;border-top:1px solid #e3e6ec}
.sk-list li{display:flex;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid #eceef2;font-size:13px}
.sk-list b{font-variant-numeric:tabular-nums}
.u{color:var(--up)}.d{color:var(--down)}`,
            html: `<div class="sk">
  <div class="sk-name"><b>上证指数</b><span>000001</span></div>
  <p class="sk-val u">3312.45</p>
  <div class="sk-chg u"><span>+26.83</span><span>+0.82%</span></div>
  <svg class="sk-chart" viewBox="0 0 280 72" aria-hidden="true"><polyline points="0,58 18,54 36,57 54,49 72,51 90,44 108,46 126,38 144,41 162,33 180,36 198,27 216,30 234,22 252,25 280,14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/></svg>
  <div class="sk-stats"><div><span>今开</span><b class="u">3290.12</b></div><div><span>最高</span><b class="u">3318.06</b></div><div><span>最低</span><b class="d">3284.77</b></div></div>
  <ul class="sk-list">
    <li><span>深证成指</span><b class="d">10512.33 &nbsp;-0.35%</b></li>
    <li><span>创业板指</span><b class="u">2156.78 &nbsp;+1.24%</b></li>
  </ul>
</div>`,
          },
          why: 'Hausse en vert, baisse en rouge : la convention occidentale. Un investisseur chinois lit d’abord « baisse ».',
        },
        {
          id: 'red-up',
          visual: {
            alt: 'La même fiche : la valeur, la variation et la courbe montante sont en rouge ; la ligne en baisse est en vert.',
            frame: 'phone',
            lang: 'zh-CN',
            css: `.sk{--up:#d42a2a;--down:#12803f;padding:12px 14px 14px;display:flex;flex-direction:column;gap:8px}
.sk-name{display:flex;align-items:baseline;gap:6px}
.sk-name b{font-size:16px}
.sk-name span{color:#5a6172;font-size:12px}
.sk-val{font-size:30px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.1}
.sk-chg{display:flex;gap:12px;font-weight:700;font-variant-numeric:tabular-nums}
.sk-chart{color:var(--up);width:100%;height:auto}
.sk-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:12px}
.sk-stats span{display:block;color:#5a6172}
.sk-stats b{font-variant-numeric:tabular-nums}
.sk-list{list-style:none;margin:0;padding:0;border-top:1px solid #e3e6ec}
.sk-list li{display:flex;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid #eceef2;font-size:13px}
.sk-list b{font-variant-numeric:tabular-nums}
.u{color:var(--up)}.d{color:var(--down)}`,
            html: `<div class="sk">
  <div class="sk-name"><b>上证指数</b><span>000001</span></div>
  <p class="sk-val u">3312.45</p>
  <div class="sk-chg u"><span>+26.83</span><span>+0.82%</span></div>
  <svg class="sk-chart" viewBox="0 0 280 72" aria-hidden="true"><polyline points="0,58 18,54 36,57 54,49 72,51 90,44 108,46 126,38 144,41 162,33 180,36 198,27 216,30 234,22 252,25 280,14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/></svg>
  <div class="sk-stats"><div><span>今开</span><b class="u">3290.12</b></div><div><span>最高</span><b class="u">3318.06</b></div><div><span>最低</span><b class="d">3284.77</b></div></div>
  <ul class="sk-list">
    <li><span>深证成指</span><b class="d">10512.33 &nbsp;-0.35%</b></li>
    <li><span>创业板指</span><b class="u">2156.78 &nbsp;+1.24%</b></li>
  </ul>
</div>`,
          },
          why: 'Hausse en rouge, baisse en vert, signes +/− conservés : la convention des marchés chinois.',
        },
      ],
      answer: 'red-up',
      explanation: `Sur les marchés de Chine continentale, **la hausse s’affiche en rouge et la baisse en vert** : le rouge y est la couleur de la richesse et de la prospérité. C’est l’inverse de la convention occidentale.

Une fiche « hausse en vert » se lit à l’envers : l’investisseur voit la couleur de la baisse avant même de lire le chiffre. En finance, cette inversion coûte cher.

Deux précautions complètent la convention :

- ne jamais faire porter le sens à la seule couleur : signe +/−, flèche ou libellé (critère WCAG 1.4.1) ;
- si l’appli sert plusieurs marchés, proposer un réglage « rouge = hausse » ou « vert = hausse ».`,
      takeaway: 'En Chine continentale, la hausse est rouge et la baisse verte : suis la convention du marché et double toujours la couleur d’un signe.',
      sources: [S.colours, 'wcag22'],
    },
    {
      id: 'culture-cn-newyear-hotspot',
      type: 'hotspot',
      difficulty: 3,
      culture: 'cn',
      prompt: 'Une équipe européenne a conçu cette page promotionnelle du Nouvel An chinois. Trouve les trois maladresses culturelles.',
      visual: {
        alt: 'Page promo du Nouvel An : bannière noire et blanche « Cadeaux du Nouvel An », bouton rouge d’enveloppe rouge, trois cadeaux (casquette verte « pour votre mari », pendule rétro « pour les aînés » à 444 ¥, carpe koï « abondance chaque année » à 88 ¥) et un lien de partage par QR code.',
        frame: 'phone',
        lang: 'zh-CN',
        css: `.ny{display:flex;flex-direction:column;gap:10px;padding:0 0 12px}
.ny-banner{padding:18px 16px;background:#1d1d1f;color:#fff;text-align:center;display:flex;flex-direction:column;gap:4px;border-bottom:4px solid #d9d9d9}
.ny-kicker{font-size:12px;letter-spacing:.2em;color:#d0d0d0}
.ny-title{font-size:26px;font-weight:800}
.ny-sub{font-size:13px;color:#e6e6e6}
.ny-red{margin:0 12px;padding:10px 12px;border-radius:12px;background:#d42a2a;color:#fff;display:flex;justify-content:space-between;align-items:center;font-weight:700}
.ny-red > span:first-child{display:flex;align-items:center;gap:6px}
.ny-pill{background:#ffd43b;color:#7a1d00;border-radius:999px;padding:3px 10px;font-size:12px}
.ny-list{display:flex;flex-direction:column;gap:8px;padding:0 12px}
.ny-item{display:flex;gap:10px;align-items:center;padding:8px;border:1px solid #eceef2;border-radius:10px}
.ny-thumb{width:52px;height:52px;border-radius:8px;display:grid;place-items:center;background:#f1f3f5;color:#5a6172;flex:none}
.ny-thumb .mk-ico{--ico:26px}
.ny-thumb--red{background:#e8590c;color:#fff}
.cap{position:relative;width:30px;height:15px;border-radius:15px 15px 3px 3px;background:#2f9e44}
.cap::after{content:"";position:absolute;inset-inline-start:22px;bottom:0;width:16px;height:5px;border-radius:3px;background:#2f9e44}
.ny-tag{font-size:11px;color:#c92a2a;font-weight:700}
.ny-name{font-weight:600}
.ny-price{color:#c92a2a;font-weight:800}
.ny-share{margin:0 12px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;color:#5a6172}`,
        html: `<div class="ny">
  <div class="ny-banner" data-hotspot="banner"><p class="ny-kicker">春节限定</p><p class="ny-title">新春好礼</p><p class="ny-sub">全场满299减50</p></div>
  <div class="ny-red" data-hotspot="hongbao"><span><i data-icon="gift"></i>领取新春红包</span><span class="ny-pill">去领取</span></div>
  <div class="ny-list">
    <div class="ny-item" data-hotspot="hat"><div class="ny-thumb"><span class="cap"></span></div><div><p class="ny-tag">送老公</p><p class="ny-name">绿色棒球帽</p><p class="ny-price">¥129</p></div></div>
    <div class="ny-item" data-hotspot="clock"><div class="ny-thumb"><i data-icon="clock"></i></div><div><p class="ny-tag">送长辈</p><p class="ny-name">复古实木座钟</p><p class="ny-price">¥444</p></div></div>
    <div class="ny-item" data-hotspot="koi"><div class="ny-thumb ny-thumb--red"><i data-icon="sparkles"></i></div><div><p class="ny-tag">年年有余</p><p class="ny-name">锦鲤挂饰</p><p class="ny-price">¥88</p></div></div>
  </div>
  <div class="ny-share" data-hotspot="share"><i data-icon="qr-code"></i>扫码分享给好友</div>
</div>`,
      },
      hotspots: [
        { id: 'banner', label: 'Bannière noire et blanche', correct: true, why: 'Le noir et le blanc évoquent le deuil (les funérailles sont des « affaires blanches », 白事). Le Nouvel An appelle le rouge et l’or.' },
        { id: 'hat', label: 'Casquette verte « pour votre mari »', correct: true, why: '« Porter un chapeau vert » (戴绿帽子) veut dire être trompé : offert à un mari, le cadeau devient une insulte.' },
        { id: 'clock', label: 'Pendule à 444 ¥ « pour les aînés »', correct: true, why: 'Offrir une pendule (送钟) se prononce comme « accompagner un mourant » (送终) ; et 444 répète le 4, homophone de « mort ».' },
        { id: 'hongbao', label: 'Bouton d’enveloppe rouge', correct: false, why: 'Les enveloppes rouges (红包) sont le geste attendu du Nouvel An, en rouge comme il se doit.' },
        { id: 'koi', label: 'Carpe koï à 88 ¥', correct: false, why: '« 年年有余 » joue sur 鱼 (poisson) et 余 (surplus), et 88 est un prix porte-bonheur : bon choix.' },
        { id: 'share', label: 'Partage par QR code', correct: false, why: 'Le QR code est le mode de partage le plus courant en Chine : rien à corriger.' },
      ],
      explanation: `Couleurs, chiffres et cadeaux portent des sens que la traduction ne transmet pas :

- **Couleurs** : rouge et or pour la fête ; le noir et le blanc sont associés au deuil.
- **Homophonies** : 4 (四 *sì*) sonne comme « mort » (死 *sǐ*) ; offrir une pendule (送钟) sonne comme « accompagner un mourant » (送终) ; à l’inverse, 8 et le poisson (鱼, prononcé comme 余, « surplus ») portent chance.
- **Expressions** : un chapeau vert désigne un mari trompé.

Une équipe étrangère ne peut pas deviner ces associations. La seule méthode fiable : faire relire visuels, prix et textes par des natifs avant chaque campagne, surtout autour des fêtes.`,
      takeaway: 'Fais relire couleurs, chiffres, cadeaux et expressions par des natifs : un détail anodin chez toi peut évoquer le deuil ou l’insulte ailleurs.',
      sources: [S.fauxPas, S.greenHat, S.colours],
    },
    {
      id: 'culture-cn-dense-tf',
      type: 'truefalse',
      difficulty: 1,
      culture: 'cn',
      prompt: 'Les utilisateurs chinois préfèrent toujours les interfaces chargées.',
      answer: false,
      explanation: `**Faux** — c’est une tendance, pas une loi.

La densité des applis chinoises a de vraies causes : une écriture compacte, un usage presque entièrement mobile, des super-apps qui donnent accès à des dizaines de services. Mais une partie de cette densité sert d’abord le **modèle économique** : un portail vend de l’espace à ses services et à ses annonceurs.

Les contre-exemples abondent : Douyin s’ouvre en plein écran sur une seule vidéo, la liste de conversations de WeChat reste sobre. Les attentes varient aussi avec l’âge, la ville et la tâche ; un paiement ou un formulaire gagnent à être simples partout.

La bonne question n’est pas « chargé ou épuré ? » mais « que faut-il voir ici pour décider et avoir confiance ? » — et la réponse se teste.`,
      takeaway: 'La densité est une tendance du marché chinois, pas une règle : elle dépend du produit, de la tâche et du modèle économique. Teste avec des utilisateurs locaux.',
      sources: ['palo-it:china'],
    },
    {
      id: 'culture-cn-leading-slider',
      type: 'slider',
      difficulty: 2,
      culture: 'cn',
      prompt: 'Règle l’interlignage de ce paragraphe chinois pour une lecture confortable.',
      visual: {
        alt: 'Paragraphe de corps de texte en chinois dont l’interlignage varie avec le curseur.',
        lang: 'zh-CN',
        html: `<div class="mk-pad"><p class="zh">${ZH_PARA}</p></div>`,
        css: `.zh{font-size:15px;max-width:30em;line-height:var(--n, 1.1)}`,
      },
      control: 'Interlignage',
      min: 1,
      max: 2.6,
      step: 0.05,
      initial: 1.1,
      unit: '',
      target: [1.5, 2],
      ideal: 1.7,
      explanation: `Chaque caractère chinois occupe un **carré plein**, sans les ascendantes et les descendantes qui aèrent naturellement une ligne latine. Avec un interlignage serré, les lignes se collent et l’œil saute de l’une à l’autre.

Les règles de composition du chinois publiées par le W3C situent l’espace entre les lignes entre **50 et 100 % du corps**, soit un \`line-height\` de **1,5 à 2**. Au-delà, la lisibilité ne progresse plus et le paragraphe se délite.

Impeccable le rappelle : l’interlignage se règle selon la police, la largeur et **la langue**, pas avec un ratio universel.`,
      takeaway: 'Pour un corps de texte chinois, vise un interlignage de 1,5 à 2 (environ 1,7) : les caractères pleins et carrés ont besoin d’air entre les lignes.',
      sources: ['w3c:clreq', 'imp:typeset'],
    },
    {
      id: 'culture-cn-market-choice',
      type: 'choice',
      difficulty: 3,
      culture: 'cn',
      prompt: 'Quel marché vise cette page de commande ?',
      visual: {
        alt: 'Page de confirmation de commande en chinois simplifié : adresse à Shanghai avec un numéro de mobile masqué, montant de 128 yuans, choix entre WeChat Pay et Alipay, bouton « Valider la commande » et, en pied de page, un numéro d’enregistrement ICP.',
        frame: 'browser',
        lang: 'zh-CN',
        css: `.cm{display:flex;flex-direction:column;gap:10px}
.cm-addr{padding:10px 12px;border-radius:10px;background:#f4f6f9;display:flex;gap:8px;align-items:flex-start}
.cm-addr .mk-ico{--ico:16px;color:#5a6172;margin-top:2px}
.cm-pay{display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #e1e4ea;border-radius:10px}
.cm-pay--on{border-color:#12803f;box-shadow:0 0 0 1px #12803f}
.cm-wx{color:#12803f}.cm-ali{color:#1c5fd1}
.cm-pay .mk-grow{font-weight:600}
.cm .mk-btn{background:#d42a2a}
.cm-foot{text-align:center;font-size:11px;color:#5a6172}`,
        html: `<div class="cm mk-pad">
  <p class="mk-h2">确认订单</p>
  <div class="cm-addr"><i data-icon="map-pin"></i><div><p class="mk-strong">王小明　139****5678</p><p class="mk-small mk-muted">上海市静安区南京西路888号18楼</p></div></div>
  <div class="mk-row mk-between"><span>商品金额</span><span class="mk-price">¥128.00</span></div>
  <div class="mk-row mk-between"><span>运费</span><span>免运费</span></div>
  <p class="mk-label">支付方式</p>
  <div class="cm-pay cm-pay--on"><i class="cm-wx" data-icon="message-circle"></i><span class="mk-grow">微信支付</span><i class="cm-wx" data-icon="circle-check"></i></div>
  <div class="cm-pay"><i class="cm-ali" data-icon="wallet"></i><span class="mk-grow">支付宝</span></div>
  <span class="mk-btn mk-btn--block">提交订单 ¥128.00</span>
  <p class="cm-foot">© 2026 邻家生活　沪ICP备18034562号-1</p>
</div>`,
      },
      options: [
        { id: 'cn', label: 'Chine continentale', why: 'Yuans, WeChat Pay et Alipay, mobile masqué à la chinoise et surtout le numéro d’enregistrement ICP, propre aux sites hébergés en Chine continentale.' },
        { id: 'tw', label: 'Taïwan', why: 'Taïwan écrit en caractères traditionnels (確認訂單) et paie en dollars de Taïwan (NT$).' },
        { id: 'sg', label: 'Singapour', why: 'Singapour utilise aussi les caractères simplifiés, mais paie en dollars de Singapour (PayNow) et n’a pas d’enregistrement ICP.' },
        { id: 'hk', label: 'Hong Kong', why: 'Hong Kong écrit en caractères traditionnels et paie en dollars de Hong Kong (FPS, Octopus).' },
      ],
      answer: 'cn',
      explanation: `Le chinois simplifié ne suffit pas à désigner un marché : Singapour l’utilise aussi, tandis que Taïwan et Hong Kong écrivent en caractères traditionnels. Ce sont les **conventions** qui tranchent :

- le montant en yuans (¥) ;
- WeChat Pay et Alipay comme moyens de paiement ;
- le numéro de mobile masqué à la chinoise (139****5678) ;
- surtout, le **numéro d’enregistrement ICP** (沪ICP备…) en pied de page, obligatoire pour un site hébergé en Chine continentale.

On ne localise donc pas « en chinois », mais pour une **locale** : \`zh-CN\`, \`zh-TW\`, \`zh-HK\` et \`zh-SG\` n’ont ni la même écriture, ni la même monnaie, ni les mêmes paiements, ni les mêmes obligations.`,
      takeaway: 'Une langue n’est pas un marché : zh-CN, zh-TW, zh-HK et zh-SG diffèrent par l’écriture, la monnaie, les paiements et la loi.',
      sources: ['w3c:i18n', 'palo-it:china'],
    },

    /* ---------- Japon ---------- */
    {
      id: 'culture-jp-furigana-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'jp',
      prompt: 'Quel formulaire d’inscription est adapté au Japon ?',
      options: [
        {
          id: 'western',
          visual: {
            alt: 'Formulaire d’inscription en japonais : prénom, deuxième prénom, nom de famille, adresse écrite de la rue vers la préfecture, puis code postal en dernier.',
            frame: 'phone',
            lang: 'ja',
            css: `.jf{display:flex;flex-direction:column;gap:12px}
.jf .mk-input{min-height:36px;padding:7px 10px}`,
            html: `<div class="jf mk-pad">
  <p class="mk-h2">会員登録</p>
  <div class="mk-field"><span class="mk-label">名（ファーストネーム）</span><span class="mk-input">太郎</span></div>
  <div class="mk-field"><span class="mk-label">ミドルネーム</span><span class="mk-input"></span></div>
  <div class="mk-field"><span class="mk-label">姓（ラストネーム）</span><span class="mk-input">山田</span></div>
  <div class="mk-field"><span class="mk-label">住所</span><span class="mk-input">梅田1-2-3 大阪市北区 大阪府</span></div>
  <div class="mk-field"><span class="mk-label">郵便番号</span><span class="mk-input">530-0001</span></div>
  <span class="mk-btn mk-btn--block">登録する</span>
</div>`,
          },
          why: 'Prénom d’abord, deuxième prénom, aucune lecture du nom, adresse à l’envers : un formulaire occidental traduit.',
        },
        {
          id: 'local',
          visual: {
            alt: 'Formulaire d’inscription en japonais : nom de famille puis prénom, leur lecture en katakana, code postal avec un bouton « Rechercher l’adresse », puis préfecture et ville ; les champs obligatoires portent une étiquette rouge.',
            frame: 'phone',
            lang: 'ja',
            css: `.jf{display:flex;flex-direction:column;gap:12px}
.jf .mk-input{min-height:36px;padding:7px 10px}
.jf-two{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.req{display:inline-block;margin-inline-start:6px;padding:1px 6px;border-radius:4px;background:#c92a2a;color:#fff;font-size:10px;font-weight:700;vertical-align:1px}
.jf-zip{display:flex;gap:8px;align-items:center}
.jf-zip .mk-input{flex:1}`,
            html: `<div class="jf mk-pad">
  <p class="mk-h2">会員登録</p>
  <div class="mk-field"><span class="mk-label">お名前<span class="req">必須</span></span><div class="jf-two"><span class="mk-input">山田</span><span class="mk-input">太郎</span></div></div>
  <div class="mk-field"><span class="mk-label">フリガナ<span class="req">必須</span></span><div class="jf-two"><span class="mk-input">ヤマダ</span><span class="mk-input">タロウ</span></div></div>
  <div class="mk-field"><span class="mk-label">郵便番号<span class="req">必須</span></span><div class="jf-zip"><span class="mk-input">530-0001</span><span class="mk-btn mk-btn--ghost mk-btn--s">住所を検索</span></div></div>
  <div class="mk-field"><span class="mk-label">都道府県・市区町村</span><span class="mk-input">大阪府 大阪市北区梅田</span></div>
  <span class="mk-btn mk-btn--block">登録する</span>
</div>`,
          },
          why: 'Nom de famille d’abord, lecture en katakana, code postal qui remplit l’adresse : le formulaire suit les usages japonais.',
        },
      ],
      answer: 'local',
      explanation: `Un même kanji peut se lire de plusieurs façons : 中田 se lit *Nakata* ou *Nakada*. Les formulaires japonais demandent donc le nom en kanji **et** sa lecture en katakana (フリガナ) : l’entreprise sait comment s’adresser au client au téléphone, trie ses fichiers dans l’ordre japonais et rapproche les virements bancaires, libellés en katakana.

La version recommandée suit aussi l’ordre local — **nom de famille d’abord** (山田 太郎) —, signale les champs obligatoires (必須) et laisse le code postal remplir l’adresse. L’autre inverse l’ordre, ajoute un deuxième prénom, inhabituel au Japon, et oublie la lecture.`,
      takeaway: 'Au Japon, demande le nom de famille d’abord et sa lecture en katakana (フリガナ) : les kanji d’un nom ne disent pas comment il se prononce.',
      sources: [S.furigana, S.w3cNames],
    },
    {
      id: 'culture-jp-fullwidth-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'jp',
      prompt: 'Une cliente japonaise saisit son numéro en caractères pleine chasse. Que doit faire le formulaire ?',
      visual: {
        alt: 'Champ « Numéro de téléphone » en japonais contenant 090-1234-5678 saisi en chiffres pleine chasse, plus larges que des chiffres ordinaires.',
        lang: 'ja',
        html: `<div class="mk-pad"><div class="mk-field" style="max-width:300px"><span class="mk-label">電話番号</span><span class="mk-input">０９０－１２３４－５６７８</span><span class="mk-help">例：090-1234-5678</span></div></div>`,
      },
      options: [
        { id: 'normalize', label: 'L’accepter et le convertir en demi-chasse (`090-1234-5678`) avant de le valider', why: 'L’utilisatrice n’a rien à corriger : le formulaire range lui-même la saisie dans le format attendu.' },
        { id: 'reject', label: 'Afficher « 半角数字で入力してください » (saisissez en chiffres demi-chasse) et bloquer l’envoi', why: 'Message de rejet classique : il bloque l’utilisatrice pour un réglage de son clavier.' },
        { id: 'block', label: 'Empêcher la frappe de tout caractère pleine chasse dans le champ', why: 'La méthode de saisie japonaise compose le texte avant de l’envoyer au champ : bloquer la frappe casse la saisie sans dire pourquoi.' },
        { id: 'raw', label: 'L’enregistrer tel quel', why: 'Les chiffres pleine chasse ne sont pas des chiffres ASCII : recherche, dédoublonnage et envoi de SMS échoueront plus tard.' },
      ],
      answer: 'normalize',
      explanation: `Au Japon, la saisie passe par une **méthode d’entrée (IME)** qui produit des caractères pleine chasse (全角, *zenkaku*) ou demi-chasse (半角, *hankaku*) selon son mode. Pour l’utilisatrice, « ０９０ » et « 090 » sont le même numéro ; pour un formulaire mal conçu, ce sont des caractères différents.

Rejeter la saisie est un travers fréquent des formulaires japonais : on punit l’utilisatrice pour un réglage de son clavier. La bonne pratique est d’**accepter puis normaliser** : \`value.normalize('NFKC')\` convertit les chiffres, les lettres et le tiret pleine chasse en demi-chasse (« ０９０－１２３４ » devient « 090-1234 »). Pense aussi aux faux tirets, comme la marque d’allongement « ー », que NFKC ne convertit pas.`,
      takeaway: 'Au Japon, accepte chiffres et lettres pleine chasse et normalise-les (NFKC) au lieu de rejeter la saisie.',
      sources: [S.normalize, 'imp:harden'],
    },
    {
      id: 'culture-jp-address-order',
      type: 'order',
      difficulty: 2,
      culture: 'jp',
      prompt: 'Range les champs d’une adresse japonaise dans l’ordre où on les saisit.',
      items: [
        { id: 'zip', label: 'Code postal — 〒530-0001' },
        { id: 'pref', label: 'Préfecture — 大阪府' },
        { id: 'city', label: 'Ville et arrondissement — 大阪市北区' },
        { id: 'block', label: 'Quartier et numéros — 梅田1-2-3' },
        { id: 'building', label: 'Immeuble et étage — 梅田ビル 5階' },
      ],
      explanation: `Une adresse japonaise va **du plus grand au plus petit**, à l’inverse de l’usage occidental : préfecture, ville, quartier, numéros d’îlot et de bâtiment, puis immeuble et étage.

Le code postal vient en premier, précédé du symbole 〒 : ses sept chiffres suffisent à retrouver la préfecture, la ville et le quartier. Les formulaires japonais proposent souvent un bouton « 住所を検索 » (rechercher l’adresse) qui remplit ces champs ; il ne reste à saisir que les numéros et l’immeuble.

Copier l’ordre occidental (rue d’abord, code postal à la fin) oblige l’utilisateur à écrire son adresse à l’envers.`,
      takeaway: 'Une adresse japonaise va du plus grand au plus petit — code postal, préfecture, ville, quartier, immeuble — et le code postal remplit le reste.',
      sources: [S.japanPost, S.w3cL10n],
    },
    {
      id: 'culture-jp-type-multi',
      type: 'multi',
      difficulty: 3,
      culture: 'jp',
      prompt: 'Lesquelles de ces pratiques conviennent pour composer du texte japonais à l’écran ?',
      options: [
        { id: 'weight', label: 'Mettre en valeur par la graisse, la couleur ou des points d’emphase (`text-emphasis`)', why: 'Ce sont les moyens d’emphase propres à l’écriture japonaise.' },
        { id: 'leading', label: 'Donner un interlignage généreux, autour de 1,7', why: 'Des caractères pleins et carrés demandent de l’air entre les lignes.' },
        { id: 'system', label: 'S’appuyer sur les polices système (Hiragino Sans, Yu Gothic, Noto Sans JP) ou des sous-ensembles', why: 'Une police japonaise complète couvre des milliers de caractères et pèse plusieurs mégaoctets.' },
        { id: 'italic', label: 'Mettre les termes importants en italique', why: 'Les polices japonaises n’ont pas d’italique : le navigateur fabrique un faux oblique peu lisible.' },
        { id: 'keepall', label: 'Appliquer `word-break: keep-all` pour éviter de couper les mots', why: 'Sans espace entre les mots, keep-all ne laisserait couper qu’aux espaces et à la ponctuation : les lignes déborderaient. C’est un réglage pour le coréen.' },
        { id: 'kinsoku', label: 'Laisser un « 。 » ou un « 、 » commencer une ligne quand la place manque', why: 'Les règles de kinsoku interdisent la ponctuation fermante en début de ligne.' },
      ],
      answers: ['weight', 'leading', 'system'],
      explanation: `Le japonais se compose avec ses propres règles, décrites par le W3C dans *Requirements for Japanese Text Layout* :

- **Pas d’italique** : on souligne par la graisse, la couleur ou les points d’emphase (\`text-emphasis\`).
- **Interlignage généreux**, autour de 1,7.
- **Polices système** ou sous-ensembles : des milliers de caractères pèsent lourd.
- **Coupures** : on peut couper entre presque tous les caractères, mais jamais avant une ponctuation fermante (。、）」) — ce sont les règles de *kinsoku*. \`word-break: keep-all\`, utile en coréen, supprimerait presque tous les points de coupure : les lignes déborderaient.`,
      takeaway: 'Texte japonais : pas d’italique, interlignage généreux, polices système, règles de kinsoku — et jamais `keep-all`, réservé au coréen.',
      sources: ['w3c:jlreq', S.textEmphasis, S.wordBreak, S.readium],
    },
    /* ---------- Corée du Sud ---------- */
    {
      id: 'culture-kr-keepall-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'kr',
      prompt: 'Quelle carte affiche correctement ce texte coréen ?',
      options: [
        {
          id: 'default',
          visual: {
            alt: 'Notification de livraison en coréen dont les lignes se coupent au milieu des mots.',
            frame: 'phone',
            lang: 'ko',
            css: `.kn{padding:14px}
.kn-card{border:1px solid #e1e4ea;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.kn-head{display:flex;align-items:center;gap:6px;font-weight:700;font-size:15px}
.kn-head .mk-ico{color:#1c5fd1}
.kn-text{font-size:16px;line-height:1.6}`,
            html: `<div class="kn"><div class="kn-card">
  <p class="kn-head"><i data-icon="truck"></i>배송 안내</p>
  <p class="kn-text">${KO_TEXT}</p>
  <span class="mk-btn mk-btn--ghost mk-btn--s">배송 조회</span>
</div></div>`,
          },
          why: 'Le navigateur coupe entre deux syllabes : des mots se retrouvent à cheval sur deux lignes.',
        },
        {
          id: 'keepall',
          visual: {
            alt: 'La même notification dont les lignes se coupent uniquement entre les mots.',
            frame: 'phone',
            lang: 'ko',
            css: `.kn{padding:14px}
.kn-card{border:1px solid #e1e4ea;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.kn-head{display:flex;align-items:center;gap:6px;font-weight:700;font-size:15px}
.kn-head .mk-ico{color:#1c5fd1}
.kn-text{font-size:16px;line-height:1.6;word-break:keep-all;overflow-wrap:anywhere}`,
            html: `<div class="kn"><div class="kn-card">
  <p class="kn-head"><i data-icon="truck"></i>배송 안내</p>
  <p class="kn-text">${KO_TEXT}</p>
  <span class="mk-btn mk-btn--ghost mk-btn--s">배송 조회</span>
</div></div>`,
          },
          why: 'Avec word-break: keep-all, la ligne ne se coupe qu’aux espaces : chaque mot reste entier.',
        },
      ],
      answer: 'keepall',
      explanation: `Le coréen **espace ses mots** — plus exactement ses groupes « mot + particules ». Un lecteur coréen attend donc des retours à la ligne aux espaces, comme en français.

Par défaut, les navigateurs traitent pourtant les syllabes hangeul comme des idéogrammes chinois et autorisent une coupure entre deux syllabes : un mot commence sur une ligne et finit sur la suivante, et la lecture bute à chaque fin de ligne.

\`word-break: keep-all\` supprime ces coupures à l’intérieur des mots : la ligne ne se coupe qu’aux espaces. Ajoute \`overflow-wrap: anywhere\` pour les chaînes très longues sans espace (adresses web, références), et réserve ce réglage au coréen.`,
      takeaway: 'En coréen, ajoute `word-break: keep-all` : les lignes ne se coupent qu’aux espaces, comme le lecteur l’attend.',
      sources: [S.wordBreak, S.klreq],
    },
    {
      id: 'culture-kr-stock-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'kr',
      prompt: 'Dans une appli boursière destinée à la Corée du Sud, de quelle couleur s’affiche une baisse de cours ?',
      options: [
        { id: 'blue', label: 'Bleu', why: 'C’est la convention coréenne : hausse en rouge, baisse en bleu.' },
        { id: 'green', label: 'Vert', why: 'Le vert signale la baisse en Chine et la hausse en Occident ; en Corée, il n’a aucun de ces rôles.' },
        { id: 'red', label: 'Rouge', why: 'En Corée du Sud, le rouge signale la hausse, comme en Chine.' },
        { id: 'gray', label: 'Gris', why: 'Le gris sert plutôt à un cours inchangé.' },
      ],
      answer: 'blue',
      explanation: `En Corée du Sud, les applis boursières affichent la **hausse en rouge** et la **baisse en bleu**. Le vert, couleur de la hausse en Occident et de la baisse en Chine, n’y joue aucun de ces rôles.

Trois marchés, trois conventions : vert et rouge en Occident, rouge et vert en Chine, rouge et bleu en Corée. Une palette « Asie » unique serait fausse quelque part : règle les couleurs **par locale**, et double-les toujours d’un signe ou d’une flèche (▲▼).`,
      takeaway: 'En Corée du Sud, la hausse est rouge et la baisse bleue : les conventions de couleur se règlent par marché, pas par continent.',
      sources: [S.koreaStock, S.colours],
    },
    {
      id: 'culture-kr-spaces-tf',
      type: 'truefalse',
      difficulty: 2,
      culture: 'kr',
      prompt: 'Comme le chinois et le japonais, le coréen s’écrit sans espaces entre les mots.',
      answer: false,
      explanation: `**Faux.** Le chinois et le japonais s’écrivent sans espaces entre les mots, mais le coréen moderne **espace ses mots** — plus exactement ses groupes « mot + particules », appelés *eojeol*.

Cette différence change la façon de couper les lignes : en chinois et en japonais, on peut couper entre presque tous les caractères ; en coréen, le lecteur attend des coupures aux espaces, d’où \`word-break: keep-all\`.

Ranger « le CJK » sous une seule règle typographique est donc une erreur : chaque écriture a ses conventions.`,
      takeaway: 'Le coréen espace ses mots, contrairement au chinois et au japonais : il se coupe aux espaces, avec `word-break: keep-all`.',
      sources: [S.klreq, S.wordBreak],
    },

    /* ---------- Inde ---------- */
    {
      id: 'culture-in-price-hotspot',
      type: 'hotspot',
      difficulty: 2,
      culture: 'in',
      prompt: 'Cette fiche produit vise des acheteurs en Inde. Trouve les deux erreurs de localisation.',
      visual: {
        alt: 'Fiche produit en anglais d’un téléviseur 4K : note 4,4, prix ₹149,999 toutes taxes comprises, vérification de livraison par code PIN, livraison gratuite le jeudi 29 octobre, paiement par Visa, Mastercard ou American Express, remplacement sous 10 jours, bouton « Buy now ».',
        frame: 'browser',
        lang: 'en-IN',
        css: `.pp{display:flex;flex-direction:column;gap:9px}
.pp-crumb{font-size:12px;color:#5a6172}
.pp-rate{display:flex;align-items:center;gap:4px;font-size:13px}
.pp-rate .mk-ico{--ico:14px;color:#9a6a00}
.pp-price{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.pp-price b{font-size:26px;font-weight:800;font-variant-numeric:tabular-nums}
.pp-pin{display:flex;align-items:center;gap:8px;font-size:13px}
.pp-pin .mk-input{width:96px;min-height:32px;padding:5px 8px}
.pp-line{display:flex;align-items:center;gap:6px;font-size:13px}
.pp-line .mk-ico{--ico:16px;color:#5a6172}
.pp-buy{background:#f59f00;color:#1d2230;align-self:flex-start;padding:0 28px}`,
        html: `<div class="pp mk-pad">
  <p class="pp-crumb">Electronics › Televisions</p>
  <p class="mk-h2">Aria 55-inch 4K Ultra HD Smart TV</p>
  <p class="pp-rate"><i data-icon="star"></i><b>4.4</b><span class="mk-muted">· 2,318 ratings</span></p>
  <div class="pp-price" data-hotspot="price"><b>₹149,999</b><span class="mk-small mk-muted">Inclusive of all taxes</span></div>
  <div class="pp-pin" data-hotspot="pin"><i data-icon="map-pin" style="--ico:16px"></i><span>Deliver to PIN code</span><span class="mk-input">560001</span><span class="mk-btn mk-btn--text mk-btn--s">Check</span></div>
  <p class="pp-line" data-hotspot="delivery"><i data-icon="truck"></i>FREE delivery by Thu, 29 Oct</p>
  <p class="pp-line" data-hotspot="pay"><i data-icon="credit-card"></i>Pay with Visa · Mastercard · American Express</p>
  <p class="pp-line" data-hotspot="returns"><i data-icon="refresh-cw"></i>10-day replacement</p>
  <span class="mk-btn pp-buy">Buy now</span>
</div>`,
      },
      hotspots: [
        { id: 'price', label: 'Prix ₹149,999', correct: true, why: 'En Inde, les chiffres se groupent en lakhs : ₹1,49,999. Le groupement occidental se lit mal et trahit un site étranger.' },
        { id: 'pay', label: 'Moyens de paiement', correct: true, why: 'Seulement des cartes : ni UPI, ni paiement à la livraison, les deux réflexes des acheteurs indiens.' },
        { id: 'pin', label: 'Vérification par code PIN', correct: false, why: 'Le code postal indien (PIN code, 6 chiffres) sert à vérifier la livraison : c’est la bonne convention.' },
        { id: 'delivery', label: 'Date de livraison', correct: false, why: 'Jour, date puis mois (Thu, 29 Oct) : l’ordre attendu en anglais indien.' },
        { id: 'returns', label: 'Remplacement sous 10 jours', correct: false, why: 'Une politique de retour claire rassure : bon signal de confiance.' },
      ],
      explanation: `Deux conventions indiennes sont ignorées :

- **Le groupement des chiffres** : après le premier millier, l’Inde groupe par deux. 1 lakh = 1,00,000 (100 000) ; 1 crore = 1,00,00,000 (10 millions). Le prix s’écrit donc ₹1,49,999 — \`Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })\` le fait pour toi.
- **Les moyens de paiement** : l’UPI (PhonePe, Google Pay, Paytm) et le **paiement à la livraison** dominent. Selon un rapport de 2024 sur les marques indiennes qui vendent en direct (D2C), le paiement à la livraison représentait encore environ 46 % de leurs commandes, devant l’UPI (environ 40 %).`,
      takeaway: 'En Inde, groupe les grands nombres en lakhs (₹1,49,999) et propose UPI et paiement à la livraison, pas seulement la carte.',
      sources: ['mdn:intl', S.indiaCod, S.upi],
    },
    {
      id: 'culture-in-lakh-choice',
      type: 'choice',
      difficulty: 1,
      culture: 'in',
      prompt: 'Que renvoie `new Intl.NumberFormat(\'en-IN\').format(2500000)` ?',
      options: [
        { id: 'in', label: '`25,00,000`', why: 'Groupement indien : trois chiffres, puis des groupes de deux. 25,00,000 = 25 lakhs = 2,5 millions.' },
        { id: 'us', label: '`2,500,000`', why: 'C’est le groupement de en-US, pas celui de en-IN.' },
        { id: 'de', label: '`2.500.000`', why: 'Le point comme séparateur des milliers, c’est par exemple l’allemand (de-DE).' },
        { id: 'lakh', label: '`25 lakh`', why: 'Intl n’écrit pas le mot par défaut ; en notation compacte, en-IN donne « 25L ».' },
      ],
      answer: 'in',
      explanation: `Le système de numération indien groupe les trois derniers chiffres, puis **par deux** : 1,00,000 (1 lakh, cent mille), 10,00,000 (10 lakhs, un million), 1,00,00,000 (1 crore, dix millions).

Inutile de l’écrire à la main : la locale \`en-IN\` le connaît. Le même nombre donne 2,500,000 en \`en-US\` et 2.500.000 en \`de-DE\` — d’où l’intérêt de toujours passer la locale de l’utilisateur à \`Intl.NumberFormat\`.`,
      takeaway: 'Passe la locale à `Intl` : en-IN groupe par deux après le premier millier (25,00,000 = 25 lakhs = 2,5 millions).',
      sources: ['mdn:intl'],
    },
    {
      id: 'culture-in-market-choice',
      type: 'choice',
      difficulty: 1,
      culture: 'in',
      prompt: 'Quel marché vise cette page de paiement ?',
      visual: {
        alt: 'Page de paiement en anglais : livraison à Pune avec un point de repère « near City Bus Depot », choix entre UPI, carte avec mensualités sans frais et paiement à la livraison, total de ₹1,24,500.',
        frame: 'browser',
        lang: 'en-IN',
        css: `.im{display:flex;flex-direction:column;gap:10px}
.im-addr{padding:10px 12px;background:#f4f6f9;border-radius:10px;font-size:13px}
.im-opt{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e1e4ea;border-radius:10px}
.im-opt--on{border-color:#1f4fd8;box-shadow:0 0 0 1px #1f4fd8}
.im-opt .mk-ico{--ico:20px;color:#36405a}`,
        html: `<div class="im mk-pad">
  <p class="mk-h2">Payment</p>
  <div class="im-addr"><p class="mk-strong">Deliver to Priya Sharma, 411004</p><p class="mk-muted">Flat 302, Shanti Apartments, FC Road, Pune · Landmark: near City Bus Depot</p></div>
  <div class="im-opt im-opt--on"><i data-icon="qr-code"></i><div><p class="mk-strong">UPI</p><p class="mk-small mk-muted">PhonePe, Google Pay, Paytm or any UPI app</p></div></div>
  <div class="im-opt"><i data-icon="credit-card"></i><div><p class="mk-strong">Credit / Debit card</p><p class="mk-small mk-muted">No Cost EMI on select cards</p></div></div>
  <div class="im-opt"><i data-icon="wallet"></i><div><p class="mk-strong">Cash on Delivery</p><p class="mk-small mk-muted">Pay by cash or UPI at your door</p></div></div>
  <div class="mk-row mk-between mk-strong"><span>Order total</span><span>₹1,24,500</span></div>
  <span class="mk-btn mk-btn--block">Pay ₹1,24,500</span>
</div>`,
      },
      options: [
        { id: 'in', label: 'Inde', why: 'Roupies groupées en lakhs, UPI, paiement à la livraison, point de repère et code PIN à 6 chiffres.' },
        { id: 'us', label: 'États-Unis', why: 'Les États-Unis paient en dollars, surtout par carte, et n’utilisent ni l’UPI ni de champ « Landmark ».' },
        { id: 'ke', label: 'Kenya', why: 'Au Kenya, on paie en shillings (KSh), surtout avec M-Pesa.' },
        { id: 'uk', label: 'Royaume-Uni', why: 'Livres sterling, code postal alphanumérique (SW1A 1AA) et cartes bancaires.' },
      ],
      answer: 'in',
      explanation: `L’anglais est partagé par des dizaines de marchés ; ce sont les conventions qui révèlent l’Inde :

- le **groupement en lakhs** du montant (₹1,24,500) ;
- l’**UPI** (PhonePe, Google Pay, Paytm) et le **paiement à la livraison** ;
- le champ **Landmark** (« near … »), un point de repère qui aide le livreur ;
- le **code PIN** à 6 chiffres.

Localiser pour « l’anglais » ne suffit pas : \`en-IN\`, \`en-US\`, \`en-GB\` et \`en-KE\` sont des locales différentes.`,
      takeaway: 'Une langue partagée ne dit pas le marché : monnaie, groupement des chiffres, paiements et champs d’adresse le révèlent.',
      sources: ['mdn:intl', S.upi, S.indiaCod],
    },

    /* ---------- Monde arabe ---------- */
    {
      id: 'culture-arab-rtl-hotspot',
      type: 'hotspot',
      difficulty: 2,
      culture: 'arab',
      prompt: 'Cette appli de vidéo a été passée en arabe. Trouve les trois éléments mal gérés.',
      visual: {
        alt: 'Appli de vidéo en arabe, de droite à gauche : en-tête avec une flèche retour pointant vers la gauche, le titre « Séries du Ramadan » et le logo ; une vidéo dont le bouton de lecture pointe vers la gauche ; une rangée « Continuer à regarder » avec un lien « Tout voir » suivi d’un chevron vers la droite ; une coche « Épisode 2 vu » ; le numéro du service client.',
        frame: 'phone',
        dir: 'rtl',
        lang: 'ar',
        css: `.st{display:flex;flex-direction:column;gap:10px;padding-bottom:14px}
.st-bar{display:flex;align-items:center;gap:10px;padding:10px 14px}
.st-ico{display:inline-flex}
.st-title{flex:1;font-weight:700;font-size:15px}
.st-logo{font-weight:800;color:#6741d9;font-size:15px}
.st-video{margin:0 14px;aspect-ratio:16/9;border-radius:12px;background:linear-gradient(160deg,#2b2350,#6741d9 70%,#9775fa);display:grid;place-items:center}
.st-play{width:52px;height:52px;border-radius:50%;background:#fff;display:grid;place-items:center;color:#1d2230}
.st-play .mk-ico{--ico:22px}
.st-ep{margin:0 14px;font-size:13px;color:#5a6172}
.st-row{display:flex;justify-content:space-between;align-items:center;margin:0 14px}
.st-h{font-weight:700}
.st-more{display:inline-flex;align-items:center;gap:2px;color:#1f4fd8;font-size:13px;font-weight:600}
.st-more .mk-ico{--ico:16px}
.st-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 14px}
.st-done{display:flex;align-items:center;gap:6px;margin:0 14px;font-size:13px;color:#12803f;font-weight:600}
.st-done .mk-ico{--ico:16px}
.st-help{margin:0 14px;font-size:13px;color:#5a6172}`,
        html: `<div class="st">
  <div class="st-bar"><span class="st-ico" data-hotspot="back"><i data-icon="arrow-left"></i></span><span class="st-title">مسلسلات رمضان</span><span class="st-logo" data-hotspot="logo">شاشة</span></div>
  <div class="st-video"><span class="st-play" data-hotspot="play"><i data-icon="play" style="transform:scaleX(-1)"></i></span></div>
  <p class="st-ep">الحلقة 3 · بيت الجدة</p>
  <div class="st-row"><span class="st-h">تابع المشاهدة</span><span class="st-more" data-hotspot="more">عرض الكل<i data-icon="chevron-right"></i></span></div>
  <div class="st-cards"><div class="mk-img" style="--ratio:16/10"></div><div class="mk-img" style="--ratio:16/10"></div></div>
  <p class="st-done" data-hotspot="check"><i data-icon="check"></i>تمت مشاهدة الحلقة 2</p>
  <p class="st-help" data-hotspot="phone">خدمة العملاء: <bdi dir="ltr">+966 11 234 5678</bdi></p>
</div>`,
      },
      hotspots: [
        { id: 'back', label: 'Flèche retour', correct: true, why: 'En RTL, le retour pointe vers la droite, d’où l’on vient. Cette flèche n’a pas été miroitée.' },
        { id: 'more', label: 'Chevron de « Tout voir »', correct: true, why: 'Le chevron qui mène à la suite doit pointer vers la gauche, sens de la lecture en arabe : il n’a pas été miroité.' },
        { id: 'play', label: 'Bouton de lecture', correct: true, why: 'Les commandes de lecture ne se miroitent pas : le triangle doit pointer vers la droite, comme partout.' },
        { id: 'logo', label: 'Logo', correct: false, why: 'Un logo ne se miroite pas : il est resté tel quel, c’est correct.' },
        { id: 'check', label: 'Coche « Épisode 2 vu »', correct: false, why: 'Une coche ne se miroite pas : correct.' },
        { id: 'phone', label: 'Numéro du service client', correct: false, why: 'Le numéro est isolé de gauche à droite : il se lit dans l’ordre, c’est correct.' },
      ],
      explanation: `En arabe, la mise en page se **miroite**, mais pas tout ce qu’elle contient :

- **À miroiter** : ce qui indique un sens de navigation. Le retour pointe vers la droite, le chevron « voir plus » vers la gauche.
- **À laisser tel quel** : les commandes de lecture (le triangle pointe toujours vers la droite : il suit le sens de la bande, pas celui de l’écriture), les coches, les logos et les numéros.

Les deux types d’erreur viennent du même réflexe : retourner les icônes au hasard au lieu de se demander, pour chacune, si elle indique un sens de navigation.`,
      takeaway: 'En RTL, miroite ce qui indique un sens de navigation ; jamais les commandes de lecture, les coches, les logos ni les numéros.',
      sources: ['material:bidi', 'mozilla:rtl'],
    },
    {
      id: 'culture-arab-mirror-multi',
      type: 'multi',
      difficulty: 2,
      culture: 'arab',
      prompt: 'Tu passes une appli en arabe. Coche tout ce qu’il faut miroiter.',
      options: [
        { id: 'back', label: 'La flèche « retour » de l’en-tête', why: 'Elle indique un sens de navigation : en RTL, elle pointe vers la droite.' },
        { id: 'steps', label: 'La barre de progression des étapes du paiement', why: 'La progression suit le sens de lecture : elle avance de la droite vers la gauche.' },
        { id: 'nav', label: 'La position du menu latéral et l’ordre des onglets', why: 'Toute la mise en page se miroite : le menu passe sur le côté droit, le premier onglet aussi.' },
        { id: 'play', label: 'Le bouton de lecture d’une vidéo', why: 'Les commandes de lecture suivent le sens de la bande, pas celui de l’écriture : on ne les miroite pas.' },
        { id: 'clock', label: 'L’icône d’horloge de l’historique', why: 'Une horloge tourne dans le sens des aiguilles d’une montre partout : on ne la miroite pas.' },
        { id: 'phone', label: 'Un numéro de téléphone', why: 'Les chiffres s’écrivent toujours de gauche à droite, même dans un texte arabe.' },
      ],
      answers: ['back', 'steps', 'nav'],
      explanation: `La règle tient en une question : **cet élément indique-t-il un sens de lecture ou de navigation ?**

- Oui → on le miroite : flèches retour et suivant, chevrons, progression des étapes, curseurs, position des menus et ordre des onglets.
- Non → on le laisse : commandes de lecture média, horloges et flèches circulaires qui tournent dans le sens des aiguilles d’une montre, coches, logos, photos, nombres et numéros.

Le temps qui s’écoule se représente de la droite vers la gauche en RTL (une frise, une suite d’étapes) — mais une horloge tourne toujours dans le même sens.`,
      takeaway: 'Miroite la mise en page et ce qui indique un sens de navigation ; laisse la lecture média, les horloges, les coches, les logos et les nombres.',
      sources: ['material:bidi', 'mozilla:rtl'],
    },
    {
      id: 'culture-arab-phone-duel',
      type: 'choice',
      difficulty: 3,
      culture: 'arab',
      prompt: 'Sur quelle carte le numéro du service client s’affiche-t-il correctement ?',
      context: 'Le numéro à afficher est le +966 11 234 5678.',
      options: [
        {
          id: 'raw',
          visual: {
            alt: 'Carte « Service client » en arabe avec la mention « Appelez-nous » suivie du numéro, inséré tel quel dans le texte arabe.',
            dir: 'rtl',
            lang: 'ar',
            css: `.cs{display:flex;flex-direction:column;gap:10px}
.cs-num{font-size:18px;font-weight:700}
.cs .mk-btn{background:#12803f}`,
            html: `<div class="cs mk-pad">
  <p class="mk-h3">خدمة العملاء</p>
  <p class="mk-small mk-muted">نرد على اتصالك من الأحد إلى الخميس.</p>
  <p class="cs-num">اتصل بنا: +966 11 234 5678</p>
  <span class="mk-btn mk-btn--block">اتصل الآن</span>
</div>`,
          },
          why: 'Sans isolement, l’algorithme bidirectionnel range les groupes de chiffres de la droite vers la gauche : le numéro s’affiche dans le désordre, et faux si on le recopie.',
        },
        {
          id: 'isolated',
          visual: {
            alt: 'La même carte où le numéro est isolé dans un élément de gauche à droite au sein du texte arabe.',
            dir: 'rtl',
            lang: 'ar',
            css: `.cs{display:flex;flex-direction:column;gap:10px}
.cs-num{font-size:18px;font-weight:700}
.cs .mk-btn{background:#12803f}`,
            html: `<div class="cs mk-pad">
  <p class="mk-h3">خدمة العملاء</p>
  <p class="mk-small mk-muted">نرد على اتصالك من الأحد إلى الخميس.</p>
  <p class="cs-num">اتصل بنا: <bdi dir="ltr">+966 11 234 5678</bdi></p>
  <span class="mk-btn mk-btn--block">اتصل الآن</span>
</div>`,
          },
          why: 'Le numéro est isolé dans un élément bdi de gauche à droite : il se lit dans l’ordre, au sein du texte arabe.',
        },
      ],
      answer: 'isolated',
      explanation: `Dans un paragraphe arabe, l’**algorithme bidirectionnel d’Unicode** décide de l’ordre d’affichage. Chaque nombre s’écrit bien de gauche à droite, mais les espaces et le « + » qui séparent les groupes prennent la direction du paragraphe : les groupes s’enchaînent alors de la droite vers la gauche, et le numéro s’affiche dans le désordre.

La correction : **isoler** les données qui doivent rester de gauche à droite — numéros, e-mails, adresses web, références de commande — avec \`<bdi dir="ltr">\`, \`<span dir="ltr">\` ou \`unicode-bidi: isolate\`. Dans les formulaires : \`dir="ltr"\` sur un champ de téléphone, \`dir="auto"\` sur un champ libre.

C’est l’un des bugs RTL les plus fréquents, et il ne se voit qu’avec de vrais contenus mixtes.`,
      takeaway: 'Isole les données de gauche à droite (numéros, e-mails, références) dans un texte RTL avec `<bdi>` ou `dir="ltr"`, sinon leurs morceaux se réordonnent.',
      sources: [S.w3cBidi, 'mozilla:rtl', S.bdi],
    },
    {
      id: 'culture-arab-weekend-choice',
      type: 'choice',
      difficulty: 3,
      culture: 'arab',
      prompt: 'Ton appli de livraison propose des créneaux « week-end » en Arabie saoudite. Quels jours couvrent-ils ?',
      options: [
        { id: 'fri-sat', label: 'Vendredi et samedi', why: 'C’est le week-end officiel saoudien depuis 2013.' },
        { id: 'sat-sun', label: 'Samedi et dimanche', why: 'C’est le week-end des Émirats arabes unis depuis janvier 2022, pas celui de l’Arabie saoudite.' },
        { id: 'thu-fri', label: 'Jeudi et vendredi', why: 'C’était le week-end saoudien jusqu’en 2013.' },
        { id: 'sun', label: 'Dimanche seulement', why: 'Le dimanche est un jour ouvré en Arabie saoudite : la semaine de travail va du dimanche au jeudi.' },
      ],
      answer: 'fri-sat',
      explanation: `Le week-end n’est pas universel. En Arabie saoudite, il tombe le **vendredi et le samedi** (depuis 2013 ; auparavant le jeudi et le vendredi), et la semaine de travail commence le dimanche. Les Émirats arabes unis sont passés au **samedi–dimanche** en janvier 2022, avec le vendredi après-midi chômé dans le secteur public.

Pour un calendrier, des créneaux de livraison ou des délais en jours ouvrés, ne code pas le week-end en dur : les données CLDR, exposées dans les navigateurs récents par \`new Intl.Locale('ar-SA').getWeekInfo()\`, donnent le premier jour de la semaine et les jours de week-end de chaque région.`,
      takeaway: 'Ne code pas le week-end en dur : vendredi–samedi en Arabie saoudite, samedi–dimanche aux Émirats depuis 2022. Tire-le des données de la locale.',
      sources: [S.weekInfo, S.uaeWeekend],
    },
    {
      id: 'culture-arab-css-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'arab',
      prompt: 'Ta carte produit doit fonctionner en français et en arabe. Comment écrire l’espace entre l’icône et le texte ?',
      options: [
        { id: 'logical', label: '`margin-inline-start: 12px` sur le texte', why: 'La marge se place au début de la ligne, quel que soit le sens : à gauche en français, à droite en arabe.' },
        { id: 'override', label: '`margin-left: 12px`, puis une règle `[dir="rtl"]` qui remet `margin-left` à 0 et ajoute `margin-right`', why: 'Ça marche, mais chaque règle s’écrit deux fois : la première surcharge oubliée devient un bug.' },
        { id: 'flip', label: '`transform: scaleX(-1)` sur toute la carte en arabe', why: 'Tout est retourné, texte et images compris : le texte devient illisible.' },
        { id: 'left', label: '`margin-left: 12px` : le sens de l’écriture s’occupe du reste', why: 'Une propriété physique ne s’inverse pas : en arabe, la marge reste à gauche, du mauvais côté.' },
      ],
      answer: 'logical',
      explanation: `Les **propriétés logiques** décrivent l’espace par rapport au sens de l’écriture plutôt qu’à l’écran : \`margin-inline-start\` vaut la marge gauche en français et la marge droite en arabe. Avec \`dir="rtl"\` sur la racine, flexbox et grid inversent aussi l’ordre des éléments : une grande partie du miroir se fait sans code supplémentaire.

Impeccable recommande ce réflexe dans toute interface destinée à plusieurs langues : \`margin-inline-start\` plutôt que \`margin-left\`, \`padding-inline\` plutôt que \`padding-left\` et \`padding-right\`, \`border-inline-end\` plutôt que \`border-right\`.`,
      takeaway: 'Écris tes espacements avec les propriétés logiques (`margin-inline-start`, `padding-inline`, `inset-inline-end`) : ils suivent le sens de l’écriture.',
      sources: ['mdn:logical', 'imp:harden'],
    },
    /* ---------- Brésil ---------- */
    {
      id: 'culture-br-checkout-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'br',
      prompt: 'Quel écran de paiement a le plus de chances de convertir au Brésil ?',
      options: [
        {
          id: 'cards',
          visual: {
            alt: 'Écran de paiement en portugais : total de 1 299,90 réais, paiement par carte de crédit en une fois avec numéro de carte, date de validité et code de sécurité.',
            frame: 'phone',
            lang: 'pt-BR',
            css: `.ck{display:flex;flex-direction:column;gap:10px}
.ck-total{display:flex;justify-content:space-between;align-items:baseline;padding:10px 12px;border-radius:10px;background:#f4f6f9}
.ck-total b{font-size:18px;font-variant-numeric:tabular-nums}
.ck-opt{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid #e1e4ea;border-radius:10px}
.ck-opt--on{border-color:#0b7a3b;box-shadow:0 0 0 1px #0b7a3b}
.ck-opt .mk-ico{--ico:20px;color:#36405a;margin-top:1px}
.ck-opt p{line-height:1.35}
.ck .mk-input{min-height:34px;padding:6px 10px}
.ck .mk-btn{background:#0b7a3b}`,
            html: `<div class="ck mk-pad">
  <p class="mk-h2">Pagamento</p>
  <div class="ck-total"><span>Total</span><b>R$ 1.299,90</b></div>
  <div class="ck-opt ck-opt--on"><i data-icon="credit-card"></i><div><p class="mk-strong">Cartão de crédito</p><p class="mk-small mk-muted">Pagamento à vista</p></div></div>
  <div class="mk-field"><span class="mk-label">Número do cartão</span><span class="mk-input">0000 0000 0000 0000</span></div>
  <div class="mk-grid" style="--cols:2;--gap:8px"><div class="mk-field"><span class="mk-label">Validade</span><span class="mk-input">MM/AA</span></div><div class="mk-field"><span class="mk-label">CVV</span><span class="mk-input">123</span></div></div>
  <span class="mk-btn mk-btn--block">Pagar R$ 1.299,90</span>
</div>`,
          },
          why: 'Carte seule, paiement en une fois : ni Pix, ni paiement en plusieurs fois, ni boleto. Une bonne partie des acheteurs s’arrête là.',
        },
        {
          id: 'local',
          visual: {
            alt: 'Écran de paiement en portugais : total de 1 299,90 réais, choix entre Pix avec 5 % de remise, carte en 10 fois sans frais de 129,99 réais et boleto bancaire, champ CPF, bouton « Payer avec Pix ».',
            frame: 'phone',
            lang: 'pt-BR',
            css: `.ck{display:flex;flex-direction:column;gap:10px}
.ck-total{display:flex;justify-content:space-between;align-items:baseline;padding:10px 12px;border-radius:10px;background:#f4f6f9}
.ck-total b{font-size:18px;font-variant-numeric:tabular-nums}
.ck-opt{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid #e1e4ea;border-radius:10px}
.ck-opt--on{border-color:#0b7a3b;box-shadow:0 0 0 1px #0b7a3b}
.ck-opt .mk-ico{--ico:20px;color:#36405a;margin-top:1px}
.ck-opt p{line-height:1.35}
.ck-off{color:#0b7a3b;font-weight:700}
.ck .mk-input{min-height:34px;padding:6px 10px}
.ck .mk-btn{background:#0b7a3b}`,
            html: `<div class="ck mk-pad">
  <p class="mk-h2">Pagamento</p>
  <div class="ck-total"><span>Total</span><b>R$ 1.299,90</b></div>
  <div class="ck-opt ck-opt--on"><i data-icon="qr-code"></i><div><p class="mk-strong">Pix</p><p class="mk-small"><span class="ck-off">5% de desconto</span> · aprovação imediata</p></div></div>
  <div class="ck-opt"><i data-icon="credit-card"></i><div><p class="mk-strong">Cartão de crédito</p><p class="mk-small mk-muted">em até 10x de R$ 129,99 sem juros</p></div></div>
  <div class="ck-opt"><i data-icon="receipt"></i><div><p class="mk-strong">Boleto bancário</p><p class="mk-small mk-muted">Vence em 3 dias úteis</p></div></div>
  <div class="mk-field"><span class="mk-label">CPF</span><span class="mk-input">123.456.789-09</span></div>
  <span class="mk-btn mk-btn--block">Pagar com Pix</span>
</div>`,
          },
          why: 'Pix avec remise, carte en 10 fois sans frais, boleto et CPF : les réflexes du paiement au Brésil.',
        },
      ],
      answer: 'local',
      explanation: `Au Brésil, le paiement a ses propres réflexes :

- **Pix**, lancé fin 2020 par la Banque centrale : paiement instantané par QR code ou par code « copia e cola ». Il est devenu en deux ans le moyen de paiement le plus utilisé du pays, et les boutiques offrent souvent une remise pour l’encourager.
- **Le paiement en plusieurs fois sans frais** (*parcelamento*) : « em até 10x sem juros » s’affiche dès la fiche produit, avec le montant de chaque mensualité.
- **Le boleto bancário** : un bordereau payé en agence, au distributeur ou en ligne avant son échéance.
- **Le CPF** (identifiant fiscal) est demandé au paiement, notamment pour la facture électronique et le boleto.`,
      takeaway: 'Au Brésil, propose Pix, le paiement en plusieurs fois sans frais (« em até 10x sem juros ») et le boleto, et demande le CPF.',
      sources: [S.pix, S.boleto],
    },
    {
      id: 'culture-br-market-choice',
      type: 'choice',
      difficulty: 3,
      culture: 'br',
      prompt: 'Quel marché vise cette fiche produit ?',
      visual: {
        alt: 'Fiche produit en portugais d’une chaussure de course à 349,90 réais, payable en 10 fois sans frais, avec 5 % de remise par Pix, un calcul des frais de port par code postal 01310-100 et une aide sur WhatsApp.',
        frame: 'browser',
        lang: 'pt-BR',
        css: `.bm{display:flex;flex-direction:column;gap:8px}
.bm-price{font-size:26px;font-weight:800;font-variant-numeric:tabular-nums}
.bm-pix{display:inline-flex;align-items:center;gap:6px;color:#0b7a3b;font-weight:700;font-size:13px}
.bm-pix .mk-ico{--ico:16px}
.bm-cep{display:flex;gap:8px;align-items:center}
.bm-cep .mk-input{width:120px;min-height:34px;padding:6px 10px}
.bm-wa{display:flex;align-items:center;gap:6px;font-size:13px;color:#5a6172}
.bm-wa .mk-ico{--ico:16px;color:#0b7a3b}
.bm .mk-btn--block{background:#0b7a3b}`,
        html: `<div class="bm mk-pad">
  <p class="mk-small mk-muted">Esportes › Corrida</p>
  <p class="mk-h2">Tênis de corrida Aero Leve</p>
  <p class="bm-price">R$ 349,90</p>
  <p class="mk-small">em até 10x de R$ 34,99 sem juros</p>
  <p class="bm-pix"><i data-icon="qr-code"></i>5% de desconto no Pix</p>
  <div class="mk-field"><span class="mk-label">Calcular frete</span><div class="bm-cep"><span class="mk-input">01310-100</span><span class="mk-btn mk-btn--ghost mk-btn--s">OK</span></div></div>
  <p class="bm-wa"><i data-icon="message-circle"></i>Dúvidas? Fale com a gente no WhatsApp</p>
  <span class="mk-btn mk-btn--block">Comprar</span>
</div>`,
      },
      options: [
        { id: 'br', label: 'Brésil', why: 'Réais (R$), « 10x sem juros », remise Pix, CEP à 8 chiffres et « tênis » avec un accent circonflexe.' },
        { id: 'pt', label: 'Portugal', why: 'Le Portugal paie en euros (MB WAY, Multibanco), écrit « ténis » et utilise des codes postaux de la forme 1000-001.' },
        { id: 'ao', label: 'Angola', why: 'L’Angola paie en kwanzas (Kz) : ni Pix ni CEP.' },
      ],
      answer: 'br',
      explanation: `Même langue, deux locales : \`pt-BR\` et \`pt-PT\` diffèrent par la monnaie, les paiements, les codes postaux et le vocabulaire.

Ici, tout désigne le Brésil : le prix en **réais** (R$ 349,90), le **parcelamento** (« em até 10x de R$ 34,99 sem juros »), la remise **Pix**, le calcul des frais de port par **CEP** (01310-100) et l’orthographe brésilienne « tênis » (le Portugal écrit « ténis » et dit souvent « sapatilhas »).

Traduire une fois « en portugais » pour les deux pays produit une interface étrangère partout.`,
      takeaway: 'Le portugais du Brésil et celui du Portugal sont deux locales : monnaie, codes postaux, paiements et vocabulaire changent.',
      sources: ['w3c:i18n', S.pix],
    },
    {
      id: 'culture-br-cep-choice',
      type: 'choice',
      difficulty: 1,
      culture: 'br',
      prompt: 'Dans un formulaire de livraison brésilien, quel champ placer en premier pour accélérer la saisie ?',
      options: [
        { id: 'cep', label: 'Le CEP (code postal)', why: 'Huit chiffres qui suffisent à retrouver la rue, le quartier, la ville et l’État : le reste se remplit tout seul.' },
        { id: 'state', label: 'L’État, dans une liste déroulante', why: 'L’État se déduit du CEP : le demander d’abord fait saisir une information que le formulaire pouvait trouver.' },
        { id: 'street', label: 'La rue (logradouro)', why: 'Dans les villes, la rue se déduit du CEP : inutile de la taper.' },
        { id: 'cpf', label: 'Le CPF', why: 'Il est demandé au paiement, mais il ne remplit pas l’adresse.' },
      ],
      answer: 'cep',
      explanation: `Au Brésil, le **CEP** (Código de Endereçamento Postal, 00000-000) est assez précis pour désigner la rue dans les grandes villes. Les formulaires brésiliens le demandent donc **en premier** et remplissent automatiquement la rue (*logradouro*), le quartier (*bairro*), la ville et l’État ; l’utilisateur n’ajoute que le numéro et le complément (appartement, bloc).

Placer le CEP à la fin, comme un code postal occidental, fait saisir à la main ce que la base postale connaît déjà.`,
      takeaway: 'Au Brésil, demande le CEP d’abord : il remplit rue, quartier, ville et État ; il ne reste que le numéro et le complément.',
      sources: [S.viacep],
    },

    /* ---------- France ---------- */
    {
      id: 'culture-fr-cookies-hotspot',
      type: 'hotspot',
      difficulty: 1,
      culture: 'fr',
      prompt: 'Ce bandeau de cookies s’adresse à des visiteurs en France. Trouve les deux défauts que la CNIL sanctionne.',
      visual: {
        alt: 'Site d’actualité avec un bandeau de cookies : un titre, une description des finalités, la phrase « En poursuivant votre navigation, vous acceptez leur utilisation », un lien discret « Personnaliser » à côté d’un bouton « Tout accepter », et un lien vers la politique de confidentialité.',
        frame: 'browser',
        lang: 'fr',
        css: `.ck2{display:flex;flex-direction:column;gap:12px;padding:14px 14px 16px}
.ck2-logo{font-weight:800;font-size:17px;letter-spacing:-.01em}
.ck2-head{font-size:19px;font-weight:700;line-height:1.3}
.ck2-banner{border:1px solid #d5d9e2;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 8px 24px rgb(15 20 35 / .12)}
.ck2-row{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-top:4px}
.ck2-link{font-size:13px;color:#1f4fd8;text-decoration:underline;align-self:flex-start}`,
        html: `<div class="ck2">
  <p class="ck2-logo">L’Écho des Calanques</p>
  <p class="ck2-head">Les marchés de producteurs reviennent tous les samedis matin</p>
  <div class="ck2-banner">
    <p class="mk-h3">Votre vie privée nous importe</p>
    <p class="mk-small" data-hotspot="purposes">Avec nos 214 partenaires, nous utilisons des cookies pour mesurer l’audience et vous proposer des publicités personnalisées.</p>
    <p class="mk-small" data-hotspot="continue">En poursuivant votre navigation, vous acceptez leur utilisation.</p>
    <div class="ck2-row" data-hotspot="buttons"><span class="mk-btn mk-btn--text mk-btn--s">Personnaliser</span><span class="mk-btn">Tout accepter</span></div>
    <span class="ck2-link" data-hotspot="policy">Politique de confidentialité</span>
  </div>
</div>`,
      },
      hotspots: [
        { id: 'buttons', label: 'Boutons « Personnaliser » et « Tout accepter »', correct: true, why: 'Accepter se fait en un clic, refuser oblige à passer par « Personnaliser » : la CNIL exige un refus aussi simple, au même niveau.' },
        { id: 'continue', label: '« En poursuivant votre navigation… »', correct: true, why: 'Poursuivre la navigation ne vaut pas consentement : il faut un acte positif clair.' },
        { id: 'purposes', label: 'Description des finalités', correct: false, why: 'Informer sur les finalités (mesure d’audience, publicité) est requis : rien à corriger.' },
        { id: 'policy', label: 'Lien vers la politique de confidentialité', correct: false, why: 'Le lien vers la politique complète est attendu : correct.' },
      ],
      explanation: `Pour la **CNIL**, refuser les cookies doit être **aussi simple** que les accepter : un bouton « Tout refuser » au même niveau et du même format que « Tout accepter », ou un lien « Continuer sans accepter ». Un « Personnaliser » qui cache le refus derrière plusieurs écrans ne suffit pas.

Et depuis le RGPD, le consentement doit résulter d’un **acte positif clair** : « en poursuivant votre navigation, vous acceptez » n’est plus valable.

Les sanctions sont lourdes : 150 M€ pour Google et 60 M€ pour Facebook (décembre 2021), 5 M€ pour TikTok, qui demandait plusieurs clics pour refuser contre un seul pour accepter (décembre 2022).`,
      takeaway: 'En France, « Tout refuser » doit être aussi simple et visible que « Tout accepter », et poursuivre la navigation ne vaut pas consentement.',
      sources: ['cnil:cookies', S.cnilBilan, S.tiktok],
    },
    {
      id: 'culture-fr-toubon-tf',
      type: 'truefalse',
      difficulty: 2,
      culture: 'fr',
      prompt: 'Une boutique en ligne qui vend à des consommateurs en France peut présenter ses offres et ses conditions uniquement en anglais si sa marque est internationale.',
      answer: false,
      explanation: `**Faux.** La **loi Toubon** (loi n° 94-665 du 4 août 1994) impose l’usage du français dans la désignation, l’offre, la présentation, le mode d’emploi et les conditions de garantie des biens et des services, ainsi que dans les factures et la publicité destinées aux consommateurs en France.

Une traduction peut accompagner le texte français, à condition que la version française soit **aussi lisible, audible ou intelligible**. Les noms de marque échappent en principe à la règle, pas les slogans ni les descriptions.

Pour un produit numérique : parcours d’achat, fiches, conditions générales et e-mails de commande en français.`,
      takeaway: 'En France, la loi Toubon impose le français dans les offres, descriptions et conditions destinées aux consommateurs : une traduction peut s’ajouter, pas remplacer.',
      sources: [S.toubon],
    },
    {
      id: 'culture-fr-format-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'fr',
      prompt: 'Quelle fiche produit est correctement localisée pour la France ?',
      options: [
        {
          id: 'us',
          visual: {
            alt: 'Fiche d’un ordinateur portable : prix €1,249.00, badge « Économisez 15%! », livraison estimée le 10/27/2026, citation entre guillemets anglais.',
            lang: 'fr',
            css: `.fp{display:flex;flex-direction:column;gap:8px}
.fp-row{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.fp-price{font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.fp-badge{background:#fff0f0;color:#b42318;font-weight:700;font-size:12px;padding:2px 8px;border-radius:999px}
.fp-quote{font-size:13px;color:#36405a}`,
            html: `<div class="fp mk-pad">
  <div class="mk-img" style="--ratio:16/9"></div>
  <p class="mk-h3">Ordinateur portable Lumen 14</p>
  <div class="fp-row"><span class="fp-price">€1,249.00</span><span class="fp-badge">Économisez 15%!</span></div>
  <p class="mk-small mk-muted">Livraison estimée le 10/27/2026</p>
  <p class="fp-quote">“Le meilleur rapport qualité-prix de l’année” — Tech Hebdo</p>
  <span class="mk-btn mk-btn--block">Ajouter au panier</span>
</div>`,
          },
          why: 'Formats américains : symbole avant le montant, virgule des milliers, point décimal, date mois/jour, pas d’espace avant « % » et « ! », guillemets anglais.',
        },
        {
          id: 'fr',
          visual: {
            alt: 'La même fiche : prix 1 249,00 €, badge « Économisez 15 % ! », livraison estimée le 27/10/2026, citation entre guillemets français.',
            lang: 'fr',
            css: `.fp{display:flex;flex-direction:column;gap:8px}
.fp-row{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.fp-price{font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.fp-badge{background:#fff0f0;color:#b42318;font-weight:700;font-size:12px;padding:2px 8px;border-radius:999px}
.fp-quote{font-size:13px;color:#36405a}`,
            html: `<div class="fp mk-pad">
  <div class="mk-img" style="--ratio:16/9"></div>
  <p class="mk-h3">Ordinateur portable Lumen 14</p>
  <div class="fp-row"><span class="fp-price">1&#8239;249,00&nbsp;€</span><span class="fp-badge">Économisez 15&nbsp;%&#8239;!</span></div>
  <p class="mk-small mk-muted">Livraison estimée le 27/10/2026</p>
  <p class="fp-quote">«&#8239;Le meilleur rapport qualité-prix de l’année&#8239;» — Tech Hebdo</p>
  <span class="mk-btn mk-btn--block">Ajouter au panier</span>
</div>`,
          },
          why: 'Formats français : 1 249,00 €, date jour/mois, espace insécable avant « % » et « ! », guillemets « ».',
        },
      ],
      answer: 'fr',
      explanation: `La typographie et les formats français ont leurs règles :

- **Montants** : espace fine insécable pour les milliers, virgule décimale, symbole après le montant — 1 249,00 €. C’est exactement ce que produit \`Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })\`.
- **Dates** : jour/mois/année (27/10/2026) ; « 10/27/2026 » se lit comme une date impossible.
- **Ponctuation** : espace insécable avant les deux-points, le point-virgule, les points d’exclamation et d’interrogation et le signe %, guillemets « » avec des espaces fines.

Un format étranger ne bloque pas la lecture, mais il signale un produit traduit à la va-vite — et sème le doute sur le montant réellement débité.`,
      takeaway: 'En France : 1 249,00 € (espace fine, virgule, symbole après), date en 27/10/2026, et une espace insécable avant les deux-points, le point-virgule, « ! », « ? » et « % ».',
      sources: ['mdn:intl', 'butterick'],
    },

    /* ---------- Allemagne ---------- */
    {
      id: 'culture-de-button-hotspot',
      type: 'hotspot',
      difficulty: 3,
      culture: 'de',
      prompt: 'Dernière étape d’une commande sur une boutique allemande. Trouve les deux problèmes.',
      visual: {
        alt: 'Récapitulatif de commande en allemand d’une machine à café : livraison du lundi 2 au mercredi 4 novembre, paiement sur facture, total TTC « €649.00 », mention des conditions générales, bouton « Bestellen » et liens Impressum, Datenschutz, AGB.',
        frame: 'browser',
        lang: 'de',
        css: `.co{display:flex;flex-direction:column;gap:10px}
.co-item{display:flex;gap:10px;align-items:center}
.co-img{width:56px;height:56px;border-radius:8px;background:linear-gradient(160deg,#c8d3e4,#eef2f7);flex:none}
.co-line{display:flex;justify-content:space-between;gap:12px;font-size:14px;padding:2px 0}
.co-total{display:flex;justify-content:space-between;gap:12px;font-weight:700;font-size:15px;padding-top:8px;border-top:1px solid #e3e6ec}
.co-legal{font-size:12px;color:#5a6172}
.co-foot{font-size:12px;color:#5a6172;text-align:center}`,
        html: `<div class="co mk-pad">
  <p class="mk-h2">Bestellübersicht</p>
  <div class="co-item"><div class="co-img"></div><div class="mk-grow"><p class="mk-strong">Kaffeevollautomat Barista S</p><p class="mk-small mk-muted">Menge: 1 · Farbe: Edelstahl</p></div></div>
  <div class="co-line" data-hotspot="delivery"><span>Lieferung</span><span>Mo, 02.11. – Mi, 04.11.</span></div>
  <div class="co-line" data-hotspot="payment"><span>Zahlungsart</span><span>Kauf auf Rechnung</span></div>
  <div class="co-total" data-hotspot="price"><span>Gesamtsumme inkl. MwSt.</span><span>€649.00</span></div>
  <p class="co-legal">Es gelten unsere <a>AGB</a>. Hinweise zum <a>Widerrufsrecht</a>.</p>
  <span class="mk-btn mk-btn--block" data-hotspot="button">Bestellen</span>
  <p class="co-foot" data-hotspot="footer">Impressum · Datenschutz · AGB</p>
</div>`,
      },
      hotspots: [
        { id: 'button', label: 'Bouton « Bestellen »', correct: true, why: '« Bestellen » seul ne dit pas que la commande engage à payer : la loi exige « zahlungspflichtig bestellen » ou une formule aussi claire.' },
        { id: 'price', label: 'Total « €649.00 »', correct: true, why: 'Format anglo-saxon : en Allemagne, le montant s’écrit 649,00 €.' },
        { id: 'delivery', label: 'Délai de livraison', correct: false, why: 'Jours et dates au format allemand (Mo, 02.11.) : correct.' },
        { id: 'payment', label: 'Achat sur facture', correct: false, why: 'Le paiement sur facture est l’un des moyens préférés en Allemagne : bon choix.' },
        { id: 'footer', label: 'Liens Impressum et Datenschutz', correct: false, why: 'Mentions légales et politique de confidentialité accessibles : obligatoire, et c’est fait.' },
      ],
      explanation: `Depuis août 2012, la **« Button-Lösung »** (§ 312j BGB) impose que le bouton qui conclut une commande payante indique sans ambiguïté l’obligation de payer : « **zahlungspflichtig bestellen** », ou une formule aussi claire. « Bestellen » seul, « Weiter » ou « Anmelden » ne suffisent pas — et dans ce cas, **le contrat n’est pas conclu** : le client ne doit rien.

Le total, lui, suit le format allemand : point pour les milliers, virgule décimale, symbole après — 649,00 €, ce que donne \`Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })\`.`,
      takeaway: 'En Allemagne, le bouton final dit « zahlungspflichtig bestellen » (ou aussi clair), sinon pas de contrat ; et les prix s’écrivent 649,00 €.',
      sources: [S.bgb312j, S.itRecht, 'mdn:intl'],
    },
    {
      id: 'culture-de-hyphens-duel',
      type: 'choice',
      difficulty: 2,
      culture: 'de',
      prompt: 'Quelle version de cet écran de réglages supporte la traduction allemande ?',
      options: [
        {
          id: 'fixed',
          visual: {
            alt: 'Écran « Einstellungen » avec trois tuiles de largeur fixe dont les libellés allemands sont tronqués par des points de suspension, et un bouton tronqué lui aussi.',
            lang: 'de',
            css: `.ds{display:flex;flex-direction:column;gap:12px}
.ds-grid{display:grid;grid-template-columns:repeat(3,80px);gap:8px}
.ds-tile{border:1px solid #e1e4ea;border-radius:10px;padding:12px 10px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;min-width:0}
.ds-tile .mk-ico{--ico:20px;color:#1f4fd8}
.ds-tile span{display:block;width:100%;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ds-btn{display:block;width:128px;line-height:38px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`,
            html: `<div class="ds mk-pad">
  <p class="mk-h3">Einstellungen</p>
  <div class="ds-grid">
    <div class="ds-tile"><i data-icon="bell"></i><span>Benachrichtigungen</span></div>
    <div class="ds-tile"><i data-icon="lock"></i><span>Datenschutzeinstellungen</span></div>
    <div class="ds-tile"><i data-icon="credit-card"></i><span>Zahlungsmethoden</span></div>
  </div>
  <span class="mk-btn ds-btn">Änderungen speichern</span>
</div>`,
          },
          why: 'Largeurs fixes pensées pour l’anglais : les mots composés allemands sont tronqués et deviennent illisibles.',
        },
        {
          id: 'flexible',
          visual: {
            alt: 'Le même écran avec des tuiles souples : les libellés allemands se coupent avec un trait d’union sur deux lignes et le bouton s’élargit.',
            lang: 'de',
            css: `.ds{display:flex;flex-direction:column;gap:12px}
.ds-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.ds-tile{border:1px solid #e1e4ea;border-radius:10px;padding:12px 10px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;min-width:0}
.ds-tile .mk-ico{--ico:20px;color:#1f4fd8}
.ds-tile span{font-size:13px;font-weight:600;line-height:1.3;hyphens:auto;overflow-wrap:break-word;max-width:100%}
.ds .mk-btn{align-self:flex-start}`,
            html: `<div class="ds mk-pad">
  <p class="mk-h3">Einstellungen</p>
  <div class="ds-grid">
    <div class="ds-tile"><i data-icon="bell"></i><span>Benachrichtigungen</span></div>
    <div class="ds-tile"><i data-icon="lock"></i><span>Datenschutzeinstellungen</span></div>
    <div class="ds-tile"><i data-icon="credit-card"></i><span>Zahlungsmethoden</span></div>
  </div>
  <span class="mk-btn">Änderungen speichern</span>
</div>`,
          },
          why: 'Largeurs souples, langue déclarée et césure automatique : les mots longs se coupent selon les règles allemandes, rien n’est tronqué.',
        },
      ],
      answer: 'flexible',
      explanation: `L’allemand est en moyenne **30 % plus long** que l’anglais, et bien plus sur les libellés courts : pour une chaîne de moins de 10 caractères, IBM prévoit une traduction 2 à 3 fois plus longue. « Privacy » devient « Datenschutzeinstellungen ».

Trois réglages évitent la troncature :

- pas de largeur fixe sur du texte : laisse les boîtes s’adapter au contenu ;
- \`hyphens: auto\` pour couper les mots longs ;
- l’attribut \`lang="de"\` sur le contenu : sans lui, le navigateur ne sait pas quel dictionnaire de césure utiliser et ne coupe rien.

Impeccable recommande de prévoir 30 à 40 % de place en plus et de tester avec la langue la plus longue — souvent l’allemand.`,
      takeaway: 'Prévois 30 à 40 % de place en plus pour les traductions et laisse le navigateur couper les mots avec `lang` et `hyphens: auto`.',
      sources: ['imp:harden', S.w3cTextSize, S.hyphens],
    },
    {
      id: 'culture-de-legal-multi',
      type: 'multi',
      difficulty: 3,
      culture: 'de',
      prompt: 'Lesquelles de ces exigences sont des obligations légales pour une boutique en ligne allemande qui vend des abonnements à des particuliers ?',
      options: [
        { id: 'impressum', label: 'Un Impressum (mentions légales) facilement accessible depuis chaque page', why: 'Obligation légale (§ 5 DDG) : identité, adresse, contact, registre, numéro de TVA.' },
        { id: 'button', label: 'Un bouton final « zahlungspflichtig bestellen » ou une formule aussi claire', why: 'Obligation légale (§ 312j BGB) : sans elle, le contrat n’est pas conclu.' },
        { id: 'cancel', label: 'Un bouton « Verträge hier kündigen » pour résilier en ligne', why: 'Obligation légale depuis juillet 2022 (§ 312k BGB) pour les abonnements souscrits en ligne.' },
        { id: 'invoice', label: 'Proposer le paiement sur facture (Kauf auf Rechnung)', why: 'Très attendu par les acheteurs allemands, mais pas imposé par la loi.' },
        { id: 'seal', label: 'Afficher un label de confiance comme Trusted Shops', why: 'Rassurant et répandu, mais facultatif.' },
        { id: 'sie', label: 'Vouvoyer le client (« Sie »)', why: 'Une tradition, pas une loi : beaucoup de marques grand public tutoient (« du »).' },
      ],
      answers: ['impressum', 'button', 'cancel'],
      explanation: `Distingue ce que la loi impose de ce que le marché attend :

- **Obligations** : l’**Impressum** (§ 5 DDG), facilement accessible depuis chaque page ; le bouton de commande « zahlungspflichtig bestellen » (§ 312j BGB) ; pour un abonnement souscrit en ligne, un bouton de résiliation « Verträge hier kündigen » menant à une confirmation « jetzt kündigen » (§ 312k BGB, depuis juillet 2022).
- **Attentes fortes, mais facultatives** : le paiement sur facture, les labels comme Trusted Shops, le vouvoiement.

Ignorer une obligation expose à des mises en demeure (*Abmahnungen*) ; ignorer une attente coûte des ventes. Les deux comptent, pas de la même façon.`,
      takeaway: 'Sépare ce que la loi impose (Impressum, bouton de commande, bouton de résiliation) de ce que le marché attend (facture, labels, ton).',
      sources: [S.ddg5, S.bgb312j, S.bgb312k],
    },
    /* ---------- États-Unis ---------- */
    {
      id: 'culture-us-market-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'us',
      prompt: 'Quel marché vise cette page de paiement ?',
      visual: {
        alt: 'Page de paiement en anglais : ville Austin, État Texas, code ZIP 78701 ; sous-total de 89 dollars, taxe de vente estimée de 7,34 dollars, total de 96,34 dollars ; moyens de paiement Apple Pay, PayPal, Venmo et paiement en 4 fois.',
        frame: 'browser',
        lang: 'en-US',
        css: `.um{display:flex;flex-direction:column;gap:10px}
.um .sel{display:flex;justify-content:space-between;align-items:center}
.um .mk-input{min-height:34px;padding:6px 10px}
.um-sum{display:flex;flex-direction:column;gap:4px;padding:10px 12px;background:#f4f6f9;border-radius:10px;font-size:14px}
.um-sum div{display:flex;justify-content:space-between}
.um-sum .t{font-weight:700;padding-top:4px;border-top:1px solid #dfe3ea}
.um-pay{display:flex;flex-wrap:wrap;gap:6px}`,
        html: `<div class="um mk-pad">
  <p class="mk-h2">Checkout</p>
  <div class="mk-grid" style="--cols:3;--gap:8px">
    <div class="mk-field"><span class="mk-label">City</span><span class="mk-input">Austin</span></div>
    <div class="mk-field"><span class="mk-label">State</span><span class="mk-input sel">Texas <i data-icon="chevron-down" style="--ico:14px"></i></span></div>
    <div class="mk-field"><span class="mk-label">ZIP code</span><span class="mk-input">78701</span></div>
  </div>
  <div class="um-sum">
    <div><span>Subtotal</span><span>$89.00</span></div>
    <div><span>Estimated sales tax</span><span>$7.34</span></div>
    <div class="t"><span>Total</span><span>$96.34</span></div>
  </div>
  <div class="um-pay"><span class="mk-badge">Apple Pay</span><span class="mk-badge">PayPal</span><span class="mk-badge">Venmo</span><span class="mk-badge">Pay in 4</span></div>
  <span class="mk-btn mk-btn--block">Place order</span>
</div>`,
      },
      options: [
        { id: 'us', label: 'États-Unis', why: 'ZIP code, État, taxe de vente ajoutée au paiement et Venmo : tout est américain.' },
        { id: 'ca', label: 'Canada', why: 'Le Canada paie aussi en dollars et ajoute les taxes au paiement, mais parle de province et de code postal alphanumérique (A1A 1A1).' },
        { id: 'uk', label: 'Royaume-Uni', why: 'Livres sterling, postcode alphanumérique et TVA incluse dans le prix affiché.' },
        { id: 'au', label: 'Australie', why: 'L’Australie a aussi des États, mais un postcode à 4 chiffres et une TVA (GST) incluse dans le prix affiché.' },
      ],
      answer: 'us',
      explanation: `Plusieurs pays paient en dollars ; ce sont d’autres repères qui désignent les États-Unis :

- le **ZIP code** à 5 chiffres (l’Australie a aussi des États, pas de ZIP) ;
- la **taxe de vente ajoutée au paiement**, après le sous-total : aux États-Unis, les prix s’affichent hors taxe, car le taux dépend de l’État et de la ville ;
- **Venmo** et le paiement en 4 fois, très américains.

Le Canada ajoute aussi les taxes au paiement, mais parle de province et de code postal alphanumérique (A1A 1A1).`,
      takeaway: 'Aux États-Unis : prix hors taxe, taxe de vente ajoutée au paiement, ZIP et État. Ces repères distinguent même deux pays qui paient en dollars.',
      sources: [S.salesTax, 'mdn:intl'],
    },
    {
      id: 'culture-us-tax-tf',
      type: 'truefalse',
      difficulty: 1,
      culture: 'us',
      prompt: 'Aux États-Unis, le prix affiché sur une fiche produit inclut normalement la taxe de vente.',
      answer: false,
      explanation: `**Faux.** Il n’existe pas de taxe de vente fédérale aux États-Unis : chaque État, comté et ville fixe la sienne, et cinq États n’en prélèvent pas au niveau de l’État (Alaska, Delaware, Montana, New Hampshire, Oregon). Le prix affiché est donc **hors taxe**, et la *sales tax* s’ajoute au paiement, une fois l’adresse connue.

C’est l’inverse de l’Union européenne, où le prix affiché au consommateur inclut la TVA. Pour l’interface : aux États-Unis, annonce « plus tax » et une estimation tôt dans le panier ; en Europe, affiche des prix TTC.`,
      takeaway: 'Aux États-Unis, la taxe de vente s’ajoute au paiement selon l’adresse : affiche les prix hors taxe et annonce la taxe tôt dans le panier.',
      sources: [S.salesTax],
    },
    {
      id: 'culture-us-date-choice',
      type: 'choice',
      difficulty: 1,
      culture: 'us',
      prompt: 'Ton appli affiche « 03/04/2026 » à des utilisateurs américains et français. Quelle solution évite les malentendus ?',
      options: [
        { id: 'intl', label: 'Écrire le mois en lettres selon la locale avec `Intl.DateTimeFormat` (« Mar 4, 2026 », « 4 mars 2026 »)', why: 'Le mois en lettres lève toute ambiguïté, et chacun lit sa propre convention.' },
        { id: 'ddmm', label: 'Garder JJ/MM/AAAA partout : c’est le format le plus répandu dans le monde', why: 'Un Américain lira toujours 03/04 comme le 4 mars : l’ambiguïté demeure pour lui.' },
        { id: 'mmdd', label: 'Passer en MM/JJ/AAAA partout, puisque l’appli a été conçue aux États-Unis', why: 'Les utilisateurs français liront le 3 avril : l’ambiguïté change juste de camp.' },
        { id: 'relative', label: 'N’afficher que des dates relatives (« dans 3 jours »)', why: 'Utile pour un fil d’actualité, pas pour une échéance ou un rendez-vous.' },
      ],
      answer: 'intl',
      explanation: `« 03/04/2026 » se lit **4 mars** aux États-Unis (mois/jour) et **3 avril** en France (jour/mois). Aucune des deux lectures n’est fautive : c’est le format tout en chiffres qui est ambigu.

La solution : formater chaque date avec \`Intl.DateTimeFormat\` dans la locale de l’utilisateur, et écrire le mois en lettres quand une erreur coûte cher (rendez-vous, échéance, vol) : « Mar 4, 2026 » en \`en-US\`, « 4 mars 2026 » en \`fr-FR\`. Pour les échanges de données, garde le format ISO 8601 (2026-03-04).`,
      takeaway: 'Une date tout en chiffres est ambiguë entre marchés : formate-la avec `Intl` selon la locale, mois en lettres quand une erreur coûte cher.',
      sources: ['mdn:intl'],
    },

    /* ---------- Pays nordiques ---------- */
    {
      id: 'culture-nordics-bankid-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'nordics',
      prompt: 'Quel écran de connexion convient à une banque en ligne suédoise ?',
      options: [
        {
          id: 'password',
          visual: {
            alt: 'Écran de connexion d’une banque en suédois : adresse e-mail, mot de passe, bouton « Se connecter » et lien « Mot de passe oublié ? ».',
            frame: 'phone',
            lang: 'sv',
            css: `.sb{display:flex;flex-direction:column;gap:12px}
.sb-logo{display:flex;align-items:center;gap:6px;font-weight:800;font-size:16px;color:#0b4f8a}
.sb-logo .mk-ico{--ico:18px}`,
            html: `<div class="sb mk-pad">
  <p class="sb-logo"><i data-icon="landmark"></i>Fjällbanken</p>
  <p class="mk-h2">Logga in</p>
  <div class="mk-field"><span class="mk-label">E-postadress</span><span class="mk-input">anna.lind@exempel.se</span></div>
  <div class="mk-field"><span class="mk-label">Lösenord</span><span class="mk-input">••••••••••</span></div>
  <span class="mk-btn mk-btn--block">Logga in</span>
  <span class="mk-btn mk-btn--text">Glömt lösenordet?</span>
</div>`,
          },
          why: 'E-mail et mot de passe : un secret de plus à retenir et à protéger, alors que presque tous les adultes suédois ont BankID.',
        },
        {
          id: 'bankid',
          visual: {
            alt: 'Écran de connexion de la même banque : « Se connecter avec BankID », consigne d’ouvrir l’appli BankID et de scanner le QR code, un grand QR code, un bouton « Ouvrir BankID sur cet appareil ».',
            frame: 'phone',
            lang: 'sv',
            css: `.sb{display:flex;flex-direction:column;gap:12px}
.sb-logo{display:flex;align-items:center;gap:6px;font-weight:800;font-size:16px;color:#0b4f8a}
.sb-logo .mk-ico{--ico:18px}
.sb-qr{align-self:center;padding:12px;border:1px solid #e1e4ea;border-radius:14px;color:#1d2230}
.sb-qr .mk-ico{--ico:112px}`,
            html: `<div class="sb mk-pad">
  <p class="sb-logo"><i data-icon="landmark"></i>Fjällbanken</p>
  <p class="mk-h2">Logga in med BankID</p>
  <p class="mk-small mk-muted">Öppna BankID-appen och skanna QR-koden.</p>
  <div class="sb-qr"><i data-icon="qr-code" data-stroke="1.5"></i></div>
  <span class="mk-btn mk-btn--block">Öppna BankID på den här enheten</span>
  <span class="mk-btn mk-btn--text">Har du inte BankID?</span>
</div>`,
          },
          why: 'BankID par QR code ou sur l’appareil : l’identification standard en Suède, pour les banques comme pour les services publics.',
        },
      ],
      answer: 'bankid',
      explanation: `En Suède, **BankID** est l’identité numérique de référence : en 2023, 99,4 % des Suédois de 18 à 67 ans en avaient un. On s’en sert pour se connecter à sa banque, à son assurance, aux services publics, et pour signer.

Proposer un e-mail et un mot de passe oblige l’utilisateur à créer un secret de plus, alors qu’il attend le geste habituel : scanner le QR code avec l’appli BankID ou l’ouvrir sur le même appareil. Les voisins ont des systèmes comparables (BankID en Norvège, MitID au Danemark).`,
      takeaway: 'En Suède, l’identification passe par BankID : c’est le standard attendu pour se connecter et signer.',
      sources: [S.bankid],
    },
    {
      id: 'culture-nordics-week-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'nordics',
      prompt: 'Tu adaptes un agenda de réservation pour la Suède. Quel réglage ajouter ?',
      options: [
        { id: 'weeks', label: 'Afficher les numéros de semaine (« v. 44 ») et commencer la semaine le lundi', why: 'Les Suédois planifient volontiers en semaines, et la semaine commence le lundi.' },
        { id: 'sunday', label: 'Commencer la semaine le dimanche', why: 'C’est la convention américaine ; en Suède, la semaine commence le lundi.' },
        { id: 'ampm', label: 'Passer à l’horloge sur 12 heures avec AM/PM', why: 'La Suède utilise l’horloge sur 24 heures.' },
        { id: 'mmdd', label: 'Afficher les dates au format mois/jour', why: 'La Suède écrit les dates au format ISO : 2026-10-27.' },
      ],
      answer: 'weeks',
      explanation: `En Suède, on planifie volontiers **en semaines** : « vecka 44 » désigne la semaine du 26 octobre au 1er novembre 2026. Les agendas affichent le numéro de semaine ISO, et la semaine commence le **lundi**.

Le reste suit la même logique : dates au format ISO (2026-10-27), heures sur 24 h. Les réglages américains — dimanche en tête, AM/PM, mois/jour — y seraient déroutants.`,
      takeaway: 'En Suède, agendas et plannings affichent le numéro de semaine ISO et commencent le lundi ; dates en 2026-10-27, heures sur 24 h.',
      sources: [S.isoWeek, S.weekInfo],
    },
    {
      id: 'culture-nordics-du-tf',
      type: 'truefalse',
      difficulty: 2,
      culture: 'nordics',
      prompt: 'En Suède, une banque doit vouvoyer ses clients (« ni ») pour paraître sérieuse.',
      answer: false,
      explanation: `**Faux.** Depuis la « du-reformen » de la fin des années 1960, le tutoiement (« du ») est la norme en Suède, y compris avec les banques et les administrations. Le vouvoiement (« ni ») y paraît souvent distant, voire étrange.

Ce ton direct va de pair avec une faible distance hiérarchique (31 sur l’échelle de Hofstede). En Allemagne et en France, les banques traditionnelles vouvoient le plus souvent (« Sie », « vous ») : le bon registre dépend du marché, pas d’un réflexe universel de « sérieux ».`,
      takeaway: 'En Suède, le tutoiement (« du ») est la norme, banques et administrations comprises : le ton suit la culture, pas un réflexe de sérieux.',
      sources: [S.duReform, 'hofstede'],
    },

    /* ---------- Afrique de l’Est (Kenya) ---------- */
    {
      id: 'culture-ke-market-choice',
      type: 'choice',
      difficulty: 1,
      culture: 'ke',
      prompt: 'Quel marché vise cette page de paiement ?',
      visual: {
        alt: 'Page de paiement en anglais : total de 2 450 shillings (KSh), paiement M-PESA avec la ligne Safaricom, champ du numéro de téléphone 0712 345 678, consigne de valider l’invite reçue sur le téléphone avec son code PIN, livraison à Westlands, Nairobi, aide sur WhatsApp.',
        frame: 'phone',
        lang: 'en-KE',
        css: `.km{display:flex;flex-direction:column;gap:10px}
.km-total{display:flex;justify-content:space-between;align-items:baseline;padding:10px 12px;border-radius:10px;background:#f4f6f9}
.km-total b{font-size:18px;font-variant-numeric:tabular-nums}
.km-opt{display:flex;gap:10px;align-items:center;padding:10px 12px;border:1px solid #0b7a3b;box-shadow:0 0 0 1px #0b7a3b;border-radius:10px}
.km-opt .mk-ico{--ico:20px;color:#0b7a3b}
.km .mk-btn--block{background:#0b7a3b}
.km-help{display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#5a6172}
.km-help .mk-ico{--ico:14px;margin-top:2px}`,
        html: `<div class="km mk-pad">
  <p class="mk-h2">Checkout</p>
  <div class="km-total"><span>Total</span><b>KSh 2,450</b></div>
  <div class="km-opt"><i data-icon="phone"></i><div><p class="mk-strong">M-PESA</p><p class="mk-small mk-muted">Pay with your Safaricom line</p></div></div>
  <div class="mk-field"><span class="mk-label">M-PESA phone number</span><span class="mk-input">0712 345 678</span></div>
  <p class="mk-small mk-muted">You will get a prompt on your phone. Enter your M-PESA PIN to complete the payment.</p>
  <span class="mk-btn mk-btn--block">Pay KSh 2,450</span>
  <p class="km-help"><i data-icon="message-circle"></i>Delivery to Westlands, Nairobi · Questions? Chat with us on WhatsApp</p>
</div>`,
      },
      options: [
        { id: 'ke', label: 'Kenya', why: 'Shillings kényans (KSh), M-Pesa avec une ligne Safaricom, invite de paiement sur le téléphone, livraison à Nairobi.' },
        { id: 'in', label: 'Inde', why: 'L’Inde paie en roupies (₹), surtout par UPI.' },
        { id: 'ng', label: 'Nigeria', why: 'Le Nigeria paie en nairas (₦), par carte, virement ou portefeuille local ; M-Pesa n’y est pas proposé.' },
        { id: 'za', label: 'Afrique du Sud', why: 'L’Afrique du Sud paie en rands (R), par carte ou virement ; M-Pesa s’y est retiré en 2016.' },
      ],
      answer: 'ke',
      explanation: `Au Kenya, l’argent mobile **M-Pesa**, lancé par Safaricom en 2007, est le moyen de paiement par défaut. Le parcours typique : le client saisit son numéro, reçoit une **invite sur son téléphone** (*STK push*) et la valide avec son code PIN M-Pesa — sans carte.

Les autres indices : le montant en shillings (KSh), le numéro mobile kényan (07…), l’assistance sur WhatsApp.`,
      takeaway: 'Au Kenya, l’argent mobile M-Pesa est le paiement par défaut : propose l’invite sur le téléphone avant la carte.',
      sources: [S.mpesa, S.daraja],
    },
    {
      id: 'culture-ke-mpesa-order',
      type: 'order',
      difficulty: 2,
      culture: 'ke',
      prompt: 'Range les étapes d’un paiement M-Pesa par invite sur le téléphone (STK push).',
      items: [
        { id: 'choose', label: 'Le client choisit M-Pesa et confirme son numéro Safaricom sur le site' },
        { id: 'request', label: 'Le site envoie la demande de paiement à M-Pesa' },
        { id: 'prompt', label: 'Une invite s’affiche sur le téléphone du client, avec le montant et le nom du marchand' },
        { id: 'pin', label: 'Le client saisit son code PIN M-Pesa pour valider' },
        { id: 'confirm', label: 'M-Pesa confirme par SMS et le site affiche la commande comme payée' },
      ],
      explanation: `Avec l’invite M-Pesa (*STK push*, aussi appelée M-Pesa Express), c’est le marchand qui déclenche la demande ; le client n’a qu’à **confirmer avec son code PIN** sur son téléphone. Pas de carte, pas de numéro de compte à recopier.

Pour l’interface, deux moments comptent :

- l’**attente** : un écran « Vérifie ton téléphone » avec le montant, un délai et un bouton pour renvoyer l’invite ;
- le **repli** : si l’invite n’arrive pas, les instructions pour payer depuis le menu M-Pesa (numéro *Paybill* et référence de commande).`,
      takeaway: 'Avec l’invite M-Pesa, le client ne tape que son code PIN : prévois un écran d’attente clair et une solution de repli par Paybill.',
      sources: [S.daraja, S.mpesa],
    },
    {
      id: 'culture-ke-ussd-tf',
      type: 'truefalse',
      difficulty: 1,
      culture: 'ke',
      prompt: 'Au Kenya, un service qui n’a pas d’application pour smartphone ne peut pas toucher les utilisateurs de téléphones basiques.',
      answer: false,
      explanation: `**Faux.** Les menus **USSD** — des codes comme \`*334#\`, qui ouvre le menu M-Pesa depuis 2020 — et les **SMS** fonctionnent sur n’importe quel téléphone, sans connexion Internet. Banques, assureurs, services agricoles et administrations s’en servent pour toucher tout le monde.

Concevoir pour l’USSD, c’est écrire des menus courts et numérotés, peu d’étapes, des libellés compréhensibles sans contexte : une session expire vite. Et pour les applis, rester léger et prévoir un mode hors ligne, car les données mobiles coûtent cher.`,
      takeaway: 'Au Kenya, l’USSD et le SMS touchent tous les téléphones : pense le service au-delà de l’appli, en menus courts et numérotés.',
      sources: [S.ussd, S.mpesa],
    },

    /* ---------- Asie du Sud-Est (Indonésie) ---------- */
    {
      id: 'culture-sea-checkout-duel',
      type: 'choice',
      difficulty: 1,
      culture: 'sea',
      prompt: 'Quel écran de paiement convient à une boutique en ligne indonésienne ?',
      options: [
        {
          id: 'card',
          visual: {
            alt: 'Écran de paiement en indonésien : total de 459 000 roupies et formulaire de carte bancaire seul (numéro, validité, code de sécurité).',
            frame: 'phone',
            lang: 'id',
            css: `.ic{display:flex;flex-direction:column;gap:10px}
.ic-total{display:flex;justify-content:space-between;align-items:baseline;padding:10px 12px;border-radius:10px;background:#f4f6f9}
.ic-total b{font-size:18px;font-variant-numeric:tabular-nums}
.ic .mk-input{min-height:34px;padding:6px 10px}
.ic .mk-btn--block{background:#0b7a3b}`,
            html: `<div class="ic mk-pad">
  <p class="mk-h2">Pembayaran</p>
  <div class="ic-total"><span>Total tagihan</span><b>Rp459.000</b></div>
  <p class="mk-strong">Kartu kredit/debit</p>
  <div class="mk-field"><span class="mk-label">Nomor kartu</span><span class="mk-input">0000 0000 0000 0000</span></div>
  <div class="mk-grid" style="--cols:2;--gap:8px"><div class="mk-field"><span class="mk-label">Masa berlaku</span><span class="mk-input">BB/TT</span></div><div class="mk-field"><span class="mk-label">CVV</span><span class="mk-input">123</span></div></div>
  <span class="mk-btn mk-btn--block">Bayar sekarang</span>
</div>`,
          },
          why: 'Carte seule : en Indonésie, la carte reste minoritaire dans le commerce en ligne.',
        },
        {
          id: 'local',
          visual: {
            alt: 'Écran de paiement en indonésien : total de 459 000 roupies et choix entre portefeuilles (GoPay, OVO, DANA, ShopeePay), QRIS lisible par toute appli bancaire, virement par compte virtuel, paiement à la livraison et carte.',
            frame: 'phone',
            lang: 'id',
            css: `.ic{display:flex;flex-direction:column;gap:10px}
.ic-total{display:flex;justify-content:space-between;align-items:baseline;padding:10px 12px;border-radius:10px;background:#f4f6f9}
.ic-total b{font-size:18px;font-variant-numeric:tabular-nums}
.ic .mk-btn--block{background:#0b7a3b}
.ic-group{display:flex;flex-direction:column;gap:6px}
.ic-opt{display:flex;gap:10px;align-items:center;padding:9px 12px;border:1px solid #e1e4ea;border-radius:10px}
.ic-opt--on{border-color:#0b7a3b;box-shadow:0 0 0 1px #0b7a3b}
.ic-opt .mk-ico{--ico:18px;color:#36405a}
.ic-opt p{line-height:1.3}
.ic-chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:3px}`,
            html: `<div class="ic mk-pad">
  <p class="mk-h2">Pilih metode pembayaran</p>
  <div class="ic-total"><span>Total tagihan</span><b>Rp459.000</b></div>
  <div class="ic-group">
    <div class="ic-opt ic-opt--on"><i data-icon="wallet"></i><div><p class="mk-strong">Dompet digital</p><div class="ic-chips"><span class="mk-badge">GoPay</span><span class="mk-badge">OVO</span><span class="mk-badge">DANA</span><span class="mk-badge">ShopeePay</span></div></div></div>
    <div class="ic-opt"><i data-icon="qr-code"></i><div><p class="mk-strong">QRIS</p><p class="mk-small mk-muted">Scan dari aplikasi bank atau e-wallet apa pun</p></div></div>
    <div class="ic-opt"><i data-icon="landmark"></i><div><p class="mk-strong">Virtual Account</p><p class="mk-small mk-muted">BCA · Mandiri · BNI · BRI</p></div></div>
    <div class="ic-opt"><i data-icon="truck"></i><p class="mk-strong">COD (Bayar di Tempat)</p></div>
    <div class="ic-opt"><i data-icon="credit-card"></i><p class="mk-strong">Kartu kredit/debit</p></div>
  </div>
  <span class="mk-btn mk-btn--block">Bayar Rp459.000</span>
</div>`,
          },
          why: 'Portefeuilles, QRIS, compte virtuel et paiement à la livraison avant la carte : les réflexes de l’acheteur indonésien.',
        },
      ],
      answer: 'local',
      explanation: `En Indonésie, les **portefeuilles électroniques** sont le premier moyen de paiement du commerce en ligne, devant les virements ; la carte reste minoritaire. Les acheteurs attendent :

- leurs portefeuilles : GoPay, OVO, DANA, ShopeePay ;
- **QRIS**, le QR code national, lisible par n’importe quelle appli bancaire ou portefeuille ;
- le virement par **compte virtuel** (*Virtual Account*) de leur banque ;
- le **paiement à la livraison** (COD, *Bayar di Tempat*).`,
      takeaway: 'En Indonésie, mets en avant portefeuilles, QRIS, compte virtuel et paiement à la livraison ; la carte n’est qu’une option parmi d’autres.',
      sources: [S.idWallets, S.qris],
    },
    {
      id: 'culture-sea-price-choice',
      type: 'choice',
      difficulty: 2,
      culture: 'sea',
      prompt: 'Comment afficher un prix de 1 250 000 roupies sur une fiche produit indonésienne ?',
      options: [
        { id: 'local', label: '`Rp1.250.000`', why: 'Point pour les milliers, pas de décimales : le format des boutiques indonésiennes.' },
        { id: 'us', label: '`Rp1,250,000.00`', why: 'Groupement anglo-saxon et centimes : deux erreurs pour un lecteur indonésien.' },
        { id: 'intl', label: '`Rp 1.250.000,00`', why: 'C’est ce que renvoie Intl par défaut en id-ID ; mais les centimes ne servent plus dans le commerce : il faut demander zéro décimale.' },
        { id: 'short', label: '`IDR 1.25M`', why: 'Abréviation anglaise : en indonésien, on abrège avec « jt » (juta, million), par exemple Rp1,25 jt.' },
      ],
      answer: 'local',
      explanation: `La roupie indonésienne s’écrit avec un **point pour les milliers** et une virgule décimale — mais les centimes (*sen*) ne s’emploient plus dans le commerce : les prix s’affichent sans décimales, souvent collés au symbole (Rp1.250.000).

\`Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })\` renvoie par défaut « Rp 1.250.000,00 ». Ajoute \`maximumFractionDigits: 0\` : la locale fournit les séparateurs, à toi d’appliquer l’usage commercial.`,
      takeaway: 'En Indonésie : Rp1.250.000, point pour les milliers et pas de décimales. Règle `Intl` avec `maximumFractionDigits: 0`.',
      sources: ['mdn:intl'],
    },
    {
      id: 'culture-sea-qris-tf',
      type: 'truefalse',
      difficulty: 2,
      culture: 'sea',
      prompt: 'En Indonésie, un marchand doit afficher un QR code différent pour chaque portefeuille (GoPay, OVO, DANA…).',
      answer: false,
      explanation: `**Faux.** **QRIS** (*Quick Response Code Indonesian Standard*), le standard national lancé par Bank Indonesia en août 2019 et appliqué à tout le pays depuis le 1er janvier 2020, rend les QR codes de paiement interopérables : un seul code QRIS, au comptoir ou à l’écran, se paie avec n’importe quelle appli bancaire ou portefeuille compatible.

Pour un parcours de paiement, l’interface s’en trouve simplifiée : un QR code QRIS et la consigne « scanne avec ton appli bancaire ou ton portefeuille », plutôt qu’une mosaïque de logos et de codes.`,
      takeaway: 'En Indonésie, un seul QR code QRIS est accepté par toutes les applis compatibles : propose-le plutôt qu’un code par portefeuille.',
      sources: [S.qris, S.qrisOne],
    },

    /* ---------- Méthode et grilles de lecture ---------- */
    {
      id: 'culture-localize-order',
      type: 'order',
      difficulty: 1,
      prompt: 'Ton équipe veut lancer son appli au Japon. Range les étapes de la localisation.',
      items: [
        { id: 'research', label: 'Étudier le marché : usages, concurrents locaux, paiements, obligations légales' },
        { id: 'i18n', label: 'Internationaliser le code selon ces besoins : textes extraits, Unicode, `Intl`, mises en page souples' },
        { id: 'l10n', label: 'Traduire et adapter contenus, formats et parcours avec des locuteurs natifs' },
        { id: 'test', label: 'Tester les parcours clés avec des utilisateurs japonais, sur leurs appareils' },
        { id: 'measure', label: 'Lancer, mesurer et corriger' },
      ],
      explanation: `Chaque étape s’appuie sur la précédente :

1. L’**étude du marché** dit ce qu’il faudra prendre en charge : écritures, formats, moyens de paiement, obligations, habitudes (furigana, paiement en supérette, densité…).
2. L’**internationalisation** prépare le code à ces besoins : on ne traduit pas un texte écrit en dur, on ne formate pas un prix en yens sans \`Intl\`.
3. La **localisation** (traduction, formats, parcours, images) se fait avec des natifs, sur un code prêt.
4. Les **tests avec des utilisateurs du marché** révèlent ce qu’aucune grille ne prédit.
5. Après le lancement, on **mesure et on corrige** : la localisation est un processus continu, pas une livraison unique.`,
      takeaway: 'Localiser se prépare : étudier le marché, internationaliser le code, adapter avec des natifs, tester sur place, puis mesurer.',
      sources: [S.w3cL10n, S.marcusBeijing],
    },
    {
      id: 'culture-terms-match',
      type: 'match',
      difficulty: 1,
      prompt: 'Associe chaque terme à sa définition.',
      leftTitle: 'Terme',
      rightTitle: 'Définition',
      pairs: [
        { id: 'i18n', left: 'Internationalisation (i18n)', right: 'Concevoir le produit pour qu’il s’adapte à toute langue et toute région sans être réécrit' },
        { id: 'l10n', left: 'Localisation (l10n)', right: 'Adapter le produit à un marché précis : langue, formats, conventions, paiements' },
        { id: 'cult', left: 'Culturalisation', right: 'Adapter le fond — images, symboles, exemples, ton — pour qu’il soit pertinent et acceptable' },
        { id: 'trad', left: 'Traduction', right: 'Transposer les textes d’une langue dans une autre' },
        { id: 'locale', left: 'Locale', right: 'Identifiant langue + région (pt-BR, zh-TW) qui pilote les formats' },
      ],
      explanation: `Ces cinq notions s’emboîtent :

- l’**internationalisation** rend le produit adaptable, une fois pour toutes, dans le code ;
- la **localisation** l’adapte à chaque locale ;
- la **traduction** n’est qu’une partie de la localisation ;
- la **culturalisation** va jusqu’au fond : images, symboles, exemples, ton ;
- la **locale** (\`pt-BR\`, \`zh-TW\`) est l’unité de travail : une langue *et* une région.`,
      takeaway: 'Traduire n’est qu’une partie de la localisation ; l’internationalisation la rend possible, la culturalisation la rend pertinente.',
      sources: [S.w3cL10n, 'w3c:i18n'],
    },
    {
      id: 'culture-hofstede-match',
      type: 'match',
      difficulty: 3,
      prompt: 'Associe chaque tendance culturelle à l’hypothèse d’interface proposée par Marcus et Gould.',
      leftTitle: 'Tendance culturelle',
      rightTitle: 'Hypothèse d’interface',
      pairs: [
        { id: 'pdi', left: 'Forte distance hiérarchique', right: 'Mettre en avant expertise, certifications et dirigeants ; guider l’accès à l’information' },
        { id: 'idv', left: 'Individualisme marqué', right: 'Valoriser la réussite personnelle et les arguments tranchés' },
        { id: 'col', left: 'Collectivisme', right: 'Montrer le groupe, la tradition et des affirmations consensuelles' },
        { id: 'uai', left: 'Fort contrôle de l’incertitude', right: 'Annoncer les conséquences avant l’action et empêcher l’utilisateur de se perdre' },
        { id: 'lto', left: 'Orientation long terme', right: 'Privilégier la valeur pratique et le réseau de relations' },
        { id: 'mas', left: 'Orientation réussite (« masculinité »)', right: 'Proposer maîtrise, exploration et compétition' },
      ],
      explanation: `Marcus et Gould (2000) ont traduit les dimensions de Hofstede en hypothèses d’interface : autorité et certifications pour une forte distance hiérarchique, réussite personnelle pour l’individualisme, groupe et tradition pour le collectivisme, prévention des erreurs pour un fort contrôle de l’incertitude, valeur pratique et relations pour le long terme, maîtrise et compétition pour l’orientation réussite.

Ce sont des **hypothèses**, pas des règles, et le terrain les contredit parfois : le Japon, très attaché au contrôle de l’incertitude, préfère souvent des pages denses et complètes à des pages simples. Sers-t’en pour savoir quoi tester.`,
      takeaway: 'Les dimensions de Hofstede suggèrent des hypothèses de design (autorité, groupe, réassurance…) : à vérifier sur le terrain, jamais à appliquer telles quelles.',
      sources: ['marcus2000', S.marcusCourse, 'hofstede'],
    },
    {
      id: 'culture-payment-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque marché au moyen de paiement local à proposer en priorité, à côté de la carte.',
      leftTitle: 'Marché',
      rightTitle: 'Moyen de paiement réflexe',
      pairs: [
        { id: 'cn', left: 'Chine continentale', right: 'WeChat Pay et Alipay, par QR code' },
        { id: 'in', left: 'Inde', right: 'UPI' },
        { id: 'br', left: 'Brésil', right: 'Pix' },
        { id: 'ke', left: 'Kenya', right: 'M-Pesa' },
        { id: 'de', left: 'Allemagne', right: 'Achat sur facture et PayPal' },
        { id: 'se', left: 'Suède', right: 'Swish et Klarna' },
        { id: 'jp', left: 'Japon', right: 'Paiement en supérette (konbini) et PayPay' },
      ],
      explanation: `Dans chaque marché, un moyen de paiement « réflexe » s’est imposé :

- **Chine** : WeChat Pay et Alipay, par QR code ;
- **Inde** : l’UPI, système de paiement instantané lancé en 2016 ;
- **Brésil** : Pix, lancé par la Banque centrale fin 2020 ;
- **Kenya** : M-Pesa, l’argent mobile de Safaricom (2007) ;
- **Allemagne** : l’achat sur facture et PayPal ;
- **Suède** : Swish (virement instantané par numéro de téléphone) et Klarna ;
- **Japon** : le paiement en supérette (*konbini*) et le QR code PayPay.

Sans le moyen réflexe, la vente se perd au dernier écran, là où l’intention d’achat est la plus forte.`,
      takeaway: 'Chaque marché a son moyen de paiement réflexe : sans lui, le panier s’arrête au dernier écran.',
      sources: [S.upi, S.pix, S.mpesa, S.swish],
    },
    {
      id: 'culture-formats-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque format à la locale qui l’utilise.',
      leftTitle: 'Format',
      rightTitle: 'Locale',
      pairs: [
        { id: 'de', left: '1.234,56 €', right: 'Allemagne (de-DE)' },
        { id: 'fr', left: '1 234,56 €', right: 'France (fr-FR)' },
        { id: 'us', left: '$1,234.56', right: 'États-Unis (en-US)' },
        { id: 'in', left: '₹1,23,456.78', right: 'Inde (en-IN)' },
        { id: 'br', left: 'R$ 1.234,56', right: 'Brésil (pt-BR)' },
        { id: 'se', left: '2026-10-27', right: 'Suède (sv-SE)' },
        { id: 'kr', left: '2026. 10. 27.', right: 'Corée du Sud (ko-KR)' },
      ],
      explanation: `Ces formats sortent tous de \`Intl\` avec la bonne locale :

- \`de-DE\` : point pour les milliers, virgule décimale, symbole après ;
- \`fr-FR\` : espace fine pour les milliers, virgule décimale, symbole après ;
- \`en-US\` : virgule pour les milliers, symbole avant ;
- \`en-IN\` : groupement en lakhs (1,23,456) ;
- \`pt-BR\` : séparateurs comme en allemand, symbole R$ avant ;
- \`sv-SE\` : dates au format ISO (année-mois-jour) ;
- \`ko-KR\` : année, mois et jour séparés par des points.

Le piège n’est pas de les ignorer, mais de les coder à la main.`,
      takeaway: 'Ne fabrique jamais un format à la main : `Intl` connaît les séparateurs, l’ordre et les symboles de chaque locale.',
      sources: ['mdn:intl'],
    },
    {
      id: 'culture-hofstede-limits-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Le score de Hofstede d’un pays permet de prédire les préférences d’un utilisateur de ce pays.',
      answer: false,
      explanation: `**Faux.** Les scores de Hofstede sont des **moyennes nationales**, issues à l’origine d’enquêtes auprès d’employés d’IBM (1967–1973), puis complétées. Ils comparent des populations, pas des personnes : en déduire le profil d’un individu est un sophisme écologique.

À l’intérieur d’un pays, l’âge, la ville, le métier ou l’habitude du numérique font varier les attentes. Une étude portant sur plus de 190 000 personnes (Fischer et Schwartz, 2011) trouve d’ailleurs plus de consensus que de désaccord entre pays sur les priorités de valeurs.

Utilise ces scores pour formuler des hypothèses (« ce marché attendra peut-être plus de réassurance »), puis vérifie-les avec des utilisateurs réels.`,
      takeaway: 'Hofstede décrit des moyennes nationales, pas des personnes : sers-t’en pour poser des hypothèses, puis teste avec des utilisateurs réels.',
      sources: ['hofstede', S.fischer],
    },
    {
      id: 'culture-hall-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Selon Edward T. Hall, que signifie communiquer dans une culture « à contexte fort » ?',
      options: [
        { id: 'implicit', label: 'Une grande part du sens passe par l’implicite : la relation, la situation, le non-dit', why: 'C’est la définition de Hall : le contexte porte une partie du message.' },
        { id: 'explicit', label: 'Tout doit être dit explicitement, de façon directe et détaillée', why: 'C’est l’inverse : la définition du contexte faible.' },
        { id: 'loud', label: 'Les messages doivent être plus visibles : couleurs vives, gros titres', why: 'Hall parle de communication, pas d’intensité visuelle.' },
        { id: 'written', label: 'L’écrit compte davantage que l’oral', why: 'Ce n’est pas le critère de Hall : il s’agit de la part de sens laissée au contexte.' },
      ],
      answer: 'implicit',
      explanation: `Pour l’anthropologue Edward T. Hall, une culture à **contexte fort** fait passer une grande part du sens par l’implicite : la relation entre les personnes, la situation, ce qui n’a pas besoin d’être dit (Japon, Chine, Corée, monde arabe). Une culture à **contexte faible** attend des messages explicites, directs et complets (États-Unis, Allemagne, pays nordiques).

Les hypothèses d’interface qu’on en tire souvent : en contexte fort, montrer la relation et l’environnement (qui est derrière le service, qui l’utilise, ce qu’en disent les autres) et soigner le ton ; en contexte faible, aller droit au but, avec des informations factuelles et du libre-service. À vérifier, comme toute grille, avec des utilisateurs locaux.`,
      takeaway: 'Contexte fort : le sens passe par l’implicite et la relation ; contexte faible : par des messages explicites. Deux hypothèses de ton à tester.',
      sources: ['hall', 'marcus2000'],
    },
  ],
};

export default culture;
