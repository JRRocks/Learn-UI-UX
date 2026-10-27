/**
 * Localisation lab: the same checkout summary rendered for several locales.
 * Strings are written per language; amounts use realistic local price points
 * (psychological pricing differs: $149, ¥19,800, ¥999, ₹12,999…).
 */

export interface LabStrings {
  title: string;
  item: string;
  qty: string;
  subtotal: string;
  shipping: string;
  free: string;
  total: string;
  delivery: string;
  pay: string;
  returns: string;
}

export interface LabLocale {
  locale: string;
  label: string;
  /** Language of the strings below (BCP 47). */
  lang: string;
  dir: 'ltr' | 'rtl';
  currency: string;
  price: number;
  /** Culture profile to link to, if any. */
  culture?: string;
  strings: LabStrings;
  /** What to notice in this locale. */
  notes: string[];
}

const EN: LabStrings = {
  title: 'Your cart',
  item: 'Wireless headphones',
  qty: 'Quantity',
  subtotal: 'Subtotal',
  shipping: 'Shipping',
  free: 'Free',
  total: 'Total',
  delivery: 'Estimated delivery',
  pay: 'Pay now',
  returns: 'Free returns within 30 days',
};

export const LAB_LOCALES: LabLocale[] = [
  {
    locale: 'fr-FR',
    label: 'Français (France)',
    lang: 'fr',
    dir: 'ltr',
    currency: 'EUR',
    price: 129,
    culture: 'fr',
    strings: {
      title: 'Votre panier',
      item: 'Casque sans fil',
      qty: 'Quantité',
      subtotal: 'Sous-total',
      shipping: 'Livraison',
      free: 'Offerte',
      total: 'Total TTC',
      delivery: 'Livraison estimée',
      pay: 'Payer la commande',
      returns: 'Retours gratuits sous 30 jours',
    },
    notes: [
      'Espace fine insécable comme séparateur de milliers et virgule décimale : 1 234,56 €.',
      'Le symbole € se place après le montant, précédé d’une espace insécable.',
      'Prix TTC affichés : en Europe, la TVA est comprise dans le prix montré au consommateur.',
    ],
  },
  {
    locale: 'en-US',
    label: 'English (United States)',
    lang: 'en',
    dir: 'ltr',
    currency: 'USD',
    price: 149,
    culture: 'us',
    strings: { ...EN, total: 'Total before tax' },
    notes: [
      'Prix hors taxes : la sales tax dépend de l’État et s’ajoute au paiement.',
      'Date au format mois/jour/année et horloge sur 12 heures.',
      'La semaine commence le dimanche dans les calendriers.',
    ],
  },
  {
    locale: 'de-DE',
    label: 'Deutsch (Deutschland)',
    lang: 'de',
    dir: 'ltr',
    currency: 'EUR',
    price: 129,
    culture: 'de',
    strings: {
      title: 'Ihr Warenkorb',
      item: 'Kabelloser Kopfhörer',
      qty: 'Menge',
      subtotal: 'Zwischensumme',
      shipping: 'Versand',
      free: 'Kostenlos',
      total: 'Gesamtsumme inkl. MwSt.',
      delivery: 'Voraussichtliche Lieferung',
      pay: 'Zahlungspflichtig bestellen',
      returns: 'Kostenlose Rücksendung innerhalb von 30 Tagen',
    },
    notes: [
      'Le bouton final doit indiquer sans ambiguïté l’obligation de payer (« zahlungspflichtig bestellen »).',
      'Textes nettement plus longs que l’anglais : prévois 30 à 40 % de place en plus.',
      'Point comme séparateur de milliers, virgule décimale : 1.234,56 €.',
    ],
  },
  {
    locale: 'sv-SE',
    label: 'Svenska (Sverige)',
    lang: 'sv',
    dir: 'ltr',
    currency: 'SEK',
    price: 1490,
    culture: 'nordics',
    strings: {
      title: 'Din varukorg',
      item: 'Trådlösa hörlurar',
      qty: 'Antal',
      subtotal: 'Delsumma',
      shipping: 'Frakt',
      free: 'Gratis',
      total: 'Totalt',
      delivery: 'Beräknad leverans',
      pay: 'Betala nu',
      returns: 'Fri retur inom 30 dagar',
    },
    notes: ['Date courte au format ISO : année-mois-jour.', 'La couronne s’écrit après le montant : 1 490 kr.', 'Numéros de semaine très utilisés.'],
  },
  {
    locale: 'zh-CN',
    label: '中文（中国大陆）',
    lang: 'zh-CN',
    dir: 'ltr',
    currency: 'CNY',
    price: 999,
    culture: 'cn',
    strings: {
      title: '购物车',
      item: '无线耳机',
      qty: '数量',
      subtotal: '小计',
      shipping: '运费',
      free: '包邮',
      total: '合计',
      delivery: '预计送达',
      pay: '立即支付',
      returns: '30天无理由退货',
    },
    notes: [
      'Textes très compacts : le même message tient en deux à trois fois moins de caractères.',
      'Pas d’italique en chinois : l’emphase passe par la graisse ou la couleur.',
      'Prix « en 9 » très courants (¥999), le 8 est recherché, le 4 évité.',
    ],
  },
  {
    locale: 'ja-JP',
    label: '日本語（日本）',
    lang: 'ja',
    dir: 'ltr',
    currency: 'JPY',
    price: 19800,
    culture: 'jp',
    strings: {
      title: 'カート',
      item: 'ワイヤレスヘッドホン',
      qty: '数量',
      subtotal: '小計',
      shipping: '送料',
      free: '無料',
      total: '合計（税込）',
      delivery: 'お届け予定日',
      pay: '注文を確定する',
      returns: '30日間返品無料',
    },
    notes: [
      'Le yen n’a pas de décimales : ￥19,800.',
      'Prix taxes comprises (税込) attendus, avec la mention explicite.',
      'Date : 2026年10月27日 ; le bouton nomme l’action de confirmer la commande.',
    ],
  },
  {
    locale: 'ko-KR',
    label: '한국어 (대한민국)',
    lang: 'ko',
    dir: 'ltr',
    currency: 'KRW',
    price: 199000,
    culture: 'kr',
    strings: {
      title: '장바구니',
      item: '무선 헤드폰',
      qty: '수량',
      subtotal: '소계',
      shipping: '배송비',
      free: '무료',
      total: '합계',
      delivery: '도착 예정일',
      pay: '결제하기',
      returns: '30일 이내 무료 반품',
    },
    notes: [
      'Le won n’a pas de décimales : ₩199,000.',
      'Le coréen sépare les mots par des espaces : `word-break: keep-all` évite de couper un mot en fin de ligne.',
    ],
  },
  {
    locale: 'hi-IN',
    label: 'हिन्दी (भारत)',
    lang: 'hi',
    dir: 'ltr',
    currency: 'INR',
    price: 12999,
    culture: 'in',
    strings: {
      title: 'आपका कार्ट',
      item: 'वायरलेस हेडफ़ोन',
      qty: 'मात्रा',
      subtotal: 'उप-योग',
      shipping: 'डिलीवरी',
      free: 'मुफ़्त',
      total: 'कुल',
      delivery: 'अनुमानित डिलीवरी',
      pay: 'अभी भुगतान करें',
      returns: '30 दिनों के भीतर मुफ़्त वापसी',
    },
    notes: [
      'Groupement indien des chiffres : 1,00,000 (un lakh) puis 1,00,00,000 (un crore).',
      'L’écriture devanagari a besoin d’un interlignage plus généreux (matras au-dessus et au-dessous).',
    ],
  },
  {
    locale: 'ar-SA',
    label: 'العربية (السعودية)',
    lang: 'ar',
    dir: 'rtl',
    currency: 'SAR',
    price: 549,
    culture: 'arab',
    strings: {
      title: 'سلة التسوق',
      item: 'سماعات لاسلكية',
      qty: 'الكمية',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      free: 'مجاني',
      total: 'الإجمالي',
      delivery: 'موعد التوصيل المتوقع',
      pay: 'ادفع الآن',
      returns: 'إرجاع مجاني خلال 30 يومًا',
    },
    notes: [
      'Mise en page miroitée : le libellé passe à droite, le montant à gauche, la flèche s’inverse.',
      '`ar-SA` formate par défaut avec les chiffres arabes orientaux (٠١٢٣…) ; beaucoup d’interfaces du Golfe utilisent aussi 0–9.',
      'Pas d’espacement entre les lettres : il casserait la liaison de l’écriture cursive.',
    ],
  },
  {
    locale: 'pt-BR',
    label: 'Português (Brasil)',
    lang: 'pt-BR',
    dir: 'ltr',
    currency: 'BRL',
    price: 799.9,
    culture: 'br',
    strings: {
      title: 'Seu carrinho',
      item: 'Fone de ouvido sem fio',
      qty: 'Quantidade',
      subtotal: 'Subtotal',
      shipping: 'Frete',
      free: 'Grátis',
      total: 'Total',
      delivery: 'Entrega prevista',
      pay: 'Pagar agora',
      returns: 'Devolução grátis em até 30 dias',
    },
    notes: [
      'Montant au format R$ 799,90.',
      'On attend le paiement en plusieurs fois sans frais (« em até 10x sem juros ») et Pix.',
    ],
  },
  {
    locale: 'en-KE',
    label: 'English (Kenya)',
    lang: 'en',
    dir: 'ltr',
    currency: 'KES',
    price: 18999,
    culture: 'ke',
    strings: { ...EN, pay: 'Pay with M-Pesa' },
    notes: ['L’anglais domine les interfaces au Kenya, aux côtés du swahili.', 'Le paiement par M-Pesa est le réflexe : il doit être proposé en premier.'],
  },
  {
    locale: 'id-ID',
    label: 'Bahasa Indonesia',
    lang: 'id',
    dir: 'ltr',
    currency: 'IDR',
    price: 2199000,
    culture: 'sea',
    strings: {
      title: 'Keranjang Anda',
      item: 'Headphone nirkabel',
      qty: 'Jumlah',
      subtotal: 'Subtotal',
      shipping: 'Ongkos kirim',
      free: 'Gratis',
      total: 'Total',
      delivery: 'Perkiraan tiba',
      pay: 'Bayar sekarang',
      returns: 'Gratis retur dalam 30 hari',
    },
    notes: ['Les montants en roupies sont élevés et sans décimales en pratique : Rp 2.199.000.', 'Point comme séparateur de milliers.'],
  },
];
