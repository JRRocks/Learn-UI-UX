# Fiche de faits — UI selon les cultures (base commune aux rédacteurs « cultures »)

Ces faits viennent de la recherche initiale. Tu peux en vérifier ou en ajouter avec
WebSearch/WebFetch ; si un fait te paraît douteux et que tu ne peux pas le confirmer, retire-le
ou formule-le avec prudence. Ne présente jamais une tendance comme une loi : on parle de
conventions observées, de contraintes (légales, techniques, d'écriture) et d'attentes
fréquentes, qu'il faut **tester avec des utilisateurs locaux**.

## Identifiants imposés des profils (ne pas en changer)

| id | Nom | locale (Intl) | dir |
|---|---|---|---|
| fr | France | fr-FR | ltr |
| us | États-Unis | en-US | ltr |
| de | Allemagne | de-DE | ltr |
| nordics | Pays nordiques (Suède en référence) | sv-SE | ltr |
| cn | Chine continentale | zh-CN | ltr |
| jp | Japon | ja-JP | ltr |
| kr | Corée du Sud | ko-KR | ltr |
| in | Inde | en-IN | ltr |
| arab | Monde arabe (pays du Golfe) | ar-SA | rtl |
| br | Brésil | pt-BR | ltr |
| ke | Afrique de l'Est (Kenya) | en-KE | ltr |
| sea | Asie du Sud-Est (Indonésie en référence) | id-ID | ltr |

## Hofstede (édition classique 2010 — utiliser exactement ces valeurs)

Ordre : pdi (distance hiérarchique), idv (individualisme), mas (orientation réussite /
« masculinité »), uai (contrôle de l'incertitude), lto (orientation long terme), ivr (indulgence).

- fr : 68, 71, 43, 86, 63, 48
- us : 40, 91, 62, 46, 26, 68
- de : 35, 67, 66, 65, 83, 40
- nordics (Suède) : 31, 71, 5, 29, 53, 78
- cn : 80, 20, 66, 30, 87, 24
- jp : 54, 46, 95, 92, 88, 42
- kr : 60, 18, 39, 85, 100, 29
- in : 77, 48, 56, 40, 51, 26
- arab (Arabie saoudite) : 95, 25, 60, 80, 36, 52
- br : 69, 38, 49, 76, 44, 59
- sea (Indonésie) : 78, 14, 46, 48, 62, 38
- ke : pas de valeurs fiables → omettre `hofstede`.

Avertir : ces scores viennent d'enquêtes sur des employés d'IBM (1967–1973) complétées
ensuite ; The Culture Factor a publié des valeurs révisées pour certains pays ; ce sont des
moyennes nationales qui ne décrivent aucun individu. Marcus & Gould (2000) ont proposé des
implications UI par dimension (ex. forte distance hiérarchique → mise en avant de l'autorité,
des certifications, des hiérarchies d'information marquées ; fort contrôle de l'incertitude →
navigation simple et prévisible, beaucoup d'information, aide, réassurance ; individualisme →
personnalisation, « je », réussites individuelles ; collectivisme → preuve sociale, groupe,
famille). Hall : cultures à contexte fort (Chine, Japon, Corée, monde arabe) vs faible
(États-Unis, Allemagne, Pays nordiques) ; la France est souvent placée entre les deux.

## Densité (Asie de l'Est vs Occident)

- Les interfaces chinoises, japonaises et coréennes sont souvent plus denses. Explications
  avancées : écritures logographiques plus compactes (plus d'information par pixel, peu de
  variations typographiques — pas de capitales, italique inexistant — d'où hiérarchie par la
  couleur, les cadres, les blocs) ; adoption mobile-first (98 % des internautes chinois sur
  mobile en 2018 selon le CNNIC) qui fait de l'app un portail vers de nombreux services
  (« super-app ») ; préférence pour un contexte riche avant de décider.
- Japon : notion d'*anshin* (sentiment de sécurité) — tout montrer rassure, l'omission paraît
  suspecte ; fort contrôle de l'incertitude (92) ; specs, garanties, frais de port, avis
  visibles près du prix. Un site immobilier japonais ayant épuré ses pages a vu l'engagement et
  les conversions baisser et est revenu à la version dense ; des utilisateurs trouvaient les
  sites minimalistes « trop *sabishii* » (trop vides, tristes). Rakuten : version japonaise bien
  plus dense que la version anglaise.
- Contrepoint : une partie de la densité sert le modèle économique (portails, publicité) plus
  qu'une préférence culturelle ; des apps (Douyin, Naver, Mercari) vont vers des interfaces
  plus épurées ; Temu et Shein mélangent densité asiatique et respiration occidentale.

## Chine continentale

- Connexion par numéro de mobile + code SMS, ou via WeChat/Alipay ; l'e-mail est peu utilisé
  pour s'inscrire. Connexion sur ordinateur en scannant un QR code avec l'app.
- QR codes partout (paiement, menus, mini-programmes) ; paiement WeChat Pay / Alipay.
- Super-apps (WeChat, Alipay, Meituan) et mini-programmes (小程序) : services légers sans
  installation, lancés par scan ou recherche.
- Accueil type : grille d'icônes d'accès aux services en tête (appelée 金刚区, « zone King
  Kong », souvent 4–5 colonnes sur 2 lignes), bannières, flux en « cascade » (瀑布流, colonnes
  de cartes de hauteurs variables, ex. Xiaohongshu, Taobao).
- Pastilles rouges de notification (« petits points rouges ») très présentes ; écrans de
  lancement publicitaires avec bouton « passer » et compte à rebours.
- Rouge = chance, prospérité, fête (enveloppes rouges 红包) ; en Bourse, **hausse en rouge,
  baisse en vert** (inverse des conventions occidentales) ; blanc associé au deuil ; éviter le 4
  (homophone de « mort »), le 8 porte chance ; chapeau vert = tabou (infidélité).
- Commerce social et en direct (Taobao Live, Douyin), achats groupés (Pinduoduo), fêtes
  commerciales (11.11, « fête des célibataires »).
- Site web hébergé en Chine : numéro de licence ICP (备案) affiché en pied de page.
- Typo : PingFang SC (Apple), Microsoft YaHei (Windows), Source Han Sans / Noto Sans CJK ;
  pas d'italique (on met en gras, en couleur, ou on utilise des points d'emphase) ; interligne
  plus généreux (~1,5–1,8) ; pas d'espaces entre les mots, ponctuation pleine chasse ; règles
  de coupure (pas de ponctuation fermante en début de ligne). Grands nombres en 万 (10 000) :
  « 1,2万 ». Polices CJK très lourdes (des milliers de glyphes) → sous-ensembles, polices système.

## Japon

- Densité et information complète (voir plus haut), nombreuses bannières, plusieurs CTA,
  colonnes multiples même sur grand mobile, mascottes (*kawaii*, *yuru-chara*), texte parfois
  intégré aux images (nuit à l'accessibilité et à la traduction).
- Formulaires : nom de famille d'abord ; champ de lecture du nom en katakana (*furigana*) ;
  caractères pleine chasse / demi-chasse (*zenkaku* / *hankaku*) — accepter les deux et
  normaliser au lieu de rejeter ; code postal (〒) qui remplit l'adresse ; adresse du plus
  grand au plus petit (préfecture → ville → quartier) ; honorifique 様 (*sama*) après le nom ;
  langage poli (*keigo*).
- Paiement : cartes, paiement en konbini (supérette), contre-remboursement, PayPay (QR),
  LINE Pay ; LINE = messagerie dominante ; Rakuten et Yahoo! Japan = portails.
- Dates : 2026年10月27日 ; ère impériale (Reiwa 8 = 2026) encore utilisée dans des formulaires
  officiels. Annotations de lecture des kanji via `<ruby>`. Écriture verticale (*tategaki*)
  en éditorial. Polices : Hiragino Sans, Yu Gothic, Meiryo, Noto Sans JP.

## Corée du Sud

- Portails denses (Naver : recherche + actualités + shopping ; Daum), KakaoTalk / KakaoPay,
  Coupang (livraison « Rocket »), Toss (finance).
- Vérification d'identité par téléphone (본인인증, appli PASS des opérateurs) très répandue.
- Le coréen met des espaces entre les mots : utiliser `word-break: keep-all` pour ne pas couper
  les mots en fin de ligne. Polices : Pretendard, Apple SD Gothic Neo, Noto Sans KR.

## Inde

- 22 langues officielles reconnues (annexe 8 de la Constitution) ; hindi et anglais très
  utilisés ; « Hinglish » ; montée du vernaculaire (Meesho a ajouté 8 langues en 2022 et une
  navigation guidée par icônes ; recherche par mots courants comme « chasma » pour lunettes).
- Smartphones Android d'entrée de gamme, connexions variables, sensibilité au poids des apps
  et aux données. Connexion par OTP sur le numéro de mobile. WhatsApp comme canal.
- Paiement : UPI (PhonePe, Google Pay, Paytm), cartes, portefeuilles, et **paiement à la
  livraison** (COD) encore très demandé ; signaux de confiance (retours, COD).
- Nombres : système lakh/crore — 1,00,000 (1 lakh = 100 000) et 1,00,00,000 (1 crore =
  10 millions) ; `Intl.NumberFormat('en-IN')` groupe ainsi ; ₹ avant le montant. Adresses avec
  champ « point de repère » (*landmark*, « near … »).

## Monde arabe (Golfe : Arabie saoudite, Émirats)

- Écriture de droite à gauche : on **miroite la mise en page** (navigation, flèches
  retour/suivant, progression, curseurs, icônes directionnelles, position de la barre
  latérale). On **ne miroite pas** : contrôles de lecture média, horloges, coches, logos,
  icônes symétriques, nombres et numéros de téléphone, images photographiques. Cas limites
  débattus : barres de progression de lecture média, icône de volume.
- CSS : propriétés logiques (`margin-inline-start`, `padding-inline`, `inset-inline-end`),
  `dir="rtl"` sur la racine ; gérer la bidirectionnalité (texte latin, numéros, e-mails dans
  du texte arabe) — problème le plus fréquent selon les praticiens.
- Typo : polices arabes dédiées (Noto Naskh/Kufi Arabic, IBM Plex Sans Arabic, Dubai) ; taille
  et interlignage plus généreux ; **jamais d'espacement entre les lettres** (casse la liaison
  cursive) ; pas de capitales ni d'italique au sens latin.
- Chiffres occidentaux (0–9) très courants dans les interfaces du Golfe, chiffres arabes
  orientaux (٠١٢٣) aussi utilisés : formater avec `Intl` selon la locale (`ar-SA` →
  chiffres arabes orientaux par défaut) et laisser le choix si besoin. Calendrier hégirien
  (Umm al-Qura en Arabie saoudite) à côté du grégorien.
- Week-end : vendredi–samedi en Arabie saoudite ; les Émirats sont passés au samedi–dimanche
  en janvier 2022 (vendredi après-midi chômé pour l'administration).
- Ramadan (horaires, offres, modes d'affichage), images respectueuses des normes locales
  (pudeur, famille), dialecte vs arabe standard moderne (*fusha*) selon la cible.
- Paiement : cartes Mada (Arabie saoudite), Apple Pay, STC Pay, contre-remboursement.
- Spécificités de l'écriture arabe (impeccable harden.md) : préserver le ZWNJ (U+200C) en
  persan, traiter ي/ی et ك/ک comme équivalents en recherche, chiffres et calendriers via `Intl`.

## Brésil

- **Pix** (paiement instantané de la Banque centrale, lancé fin 2020) par QR code ou clé
  « copia e cola » ; **boleto bancário** ; **paiement en plusieurs fois** sur carte
  (*parcelamento*, « em até 10x sem juros ») affiché sur la fiche produit.
- **CPF** (identifiant fiscal) demandé au paiement ; **CEP** (code postal) qui remplit l'adresse.
- WhatsApp = canal principal du service client ; ton chaleureux et informel (*você*).
- Formats : R$ 1.234,56 ; 27/10/2026. Mercado Livre, Magalu, Nubank. Loi LGPD (données).

## Allemagne

- **Impressum** obligatoire (mentions légales : société, adresse, représentant, registre,
  n° TVA), **Datenschutzerklärung** (politique de confidentialité), consentement RGPD (DSGVO).
- **Bouton de commande** : la loi (« Button-Lösung », §312j BGB, 2012) exige un libellé
  univoque comme « zahlungspflichtig bestellen » (« commander avec obligation de paiement ») ;
  depuis juillet 2022, un **bouton de résiliation** (« Verträge hier kündigen », §312k BGB)
  pour les abonnements conclus en ligne.
- Attente d'informations factuelles et vérifiables : sceaux (Trusted Shops, TÜV), prix TTC
  (MwSt.) affichés, retours clairs. Paiement : PayPal, **achat sur facture** (*Kauf auf
  Rechnung*), prélèvement SEPA, Klarna ; la carte seule ne suffit pas.
- Mots composés longs → `hyphens: auto` avec `lang="de"` ; textes ~30 % plus longs que
  l'anglais. Vouvoiement (*Sie*) traditionnel ; beaucoup de marques grand public tutoient
  (*du*) : choisir selon l'audience et s'y tenir. Formats : 1.234,56 € ; 27.10.2026 ; 24 h ;
  semaine commençant le lundi.

## France

- RGPD + **CNIL** : refuser les cookies doit être aussi simple que les accepter (bouton
  « Tout refuser » au même niveau que « Tout accepter », ou lien « Continuer sans accepter »).
  Sanctions : Google 150 M€ et Facebook 60 M€ (décisions de décembre 2021), TikTok 5 M€ (2023,
  plusieurs clics pour refuser contre un seul pour accepter). Mise en demeure de décembre 2024
  sur les *dark patterns* des bandeaux.
- **Loi Toubon** (1994) : le français est obligatoire dans les communications commerciales
  destinées aux consommateurs en France. **Mentions légales** obligatoires. Accessibilité :
  RGAA ; l'**Acte européen sur l'accessibilité** s'applique depuis le 28 juin 2025 à de
  nombreux services privés (e-commerce, banque…). Directive Omnibus : un prix barré se réfère
  au prix le plus bas des 30 derniers jours.
- Typographie : espace insécable avant « : ; ! ? », guillemets « », séparateur de milliers =
  espace fine insécable, virgule décimale : 1 234,56 € ; 27/10/2026 ; 14 h 30.
- Tu ou vous : banques, administrations et assurances vouvoient ; beaucoup d'apps grand
  public tutoient. Paiement : Carte Bancaire (CB), PayPal, Wero (a remplacé Paylib en 2024).

## États-Unis

- Contexte faible : ton direct, informel (« you », contractions), autonomie / libre-service,
  personnalisation. Accessibilité : nombreux procès sur le fondement de l'ADA.
- **Prix affichés hors taxes** : la *sales tax* s'ajoute au paiement (inverse de l'UE, prix
  TTC). Cartes de crédit dominantes, Apple Pay, PayPal, Venmo, paiement fractionné (Affirm,
  Klarna, Afterpay) ; écrans de pourboire.
- Unités impériales (°F, miles, livres, pouces) ; date MM/DD/YYYY ; horloge 12 h (AM/PM) ;
  semaine commençant le dimanche ; $1,234.56 ; (555) 123-4567 ; ZIP à 5 chiffres + liste
  des États. Californie (CCPA/CPRA) : lien « Do Not Sell or Share My Personal Information ».

## Pays nordiques (Suède en référence)

- Faible distance hiérarchique, égalitarisme, ton informel, design épuré et fonctionnel,
  confiance élevée, forte culture de l'accessibilité.
- Identification par **BankID** (Suède, Norvège) pour se connecter et signer ; paiement
  Swish (SE), Vipps (NO), MobilePay (DK/FI), Klarna (facture, d'origine suédoise) ;
  *personnummer* qui préremplit l'adresse au paiement.
- Suède : date au format ISO 2026-10-27 ; **numéros de semaine** très utilisés (« vecka 44 »)
  dans les calendriers ; 1 234,56 kr ; semaine commençant le lundi.

## Afrique de l'Est (Kenya)

- **M-Pesa** (Safaricom, 2007) : argent mobile dominant ; numéros *Paybill* / *Till* ;
  invite de paiement poussée sur le téléphone (*STK push*) où l'on saisit son code PIN.
- Menus **USSD** (codes *xxx#) et SMS pour les téléphones basiques ; Android d'entrée de
  gamme ; données chères → apps légères, hors ligne d'abord ; WhatsApp pour le commerce.
- Anglais et swahili ; KES 1,234.00 (KSh).

## Asie du Sud-Est (Indonésie en référence)

- Super-apps **Grab** et **Gojek** ; portefeuilles GoPay, OVO, DANA, ShopeePay ; standard
  national de QR **QRIS** (Bank Indonesia, 2019, obligatoire depuis 2020) ; virement par
  compte virtuel ; paiement à la livraison.
- E-commerce très gamifié (Shopee : pièces, jeux, ventes flash, live), fêtes commerciales
  (9.9, 11.11, 12.12 — « Harbolnas » le 12 décembre en Indonésie), commerce social via
  WhatsApp/Instagram ; usage quasi exclusivement mobile.
- Majorité musulmane : temps forts du Ramadan, mentions halal. Bahasa Indonesia ; Rp 1.234.567
  (sans décimales en pratique) ; 27/10/2026.

## Sources de référence (clés de `src/content/sources.ts`)

`hofstede`, `marcus2000`, `hall`, `palo-it:china`, `hitabis:japan`, `material:bidi`,
`mozilla:rtl`, `mdn:intl`, `mdn:logical`, `w3c:i18n`, `w3c:clreq`, `w3c:jlreq`, `w3c:alreq`,
`cnil:cookies`, `imp:harden`, `imp:clarify`.
