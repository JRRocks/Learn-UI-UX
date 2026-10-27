import type { CulturePair } from '../../engine/types';

/**
 * The same component designed for two markets, side by side, with every
 * difference explained (« Cultures » tab › Côte à côte).
 */

const ZH = `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif`;
const JA = `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, Meiryo, "Noto Sans JP", "Noto Sans CJK JP", sans-serif`;
const KO = `"Apple SD Gothic Neo", Pretendard, "Malgun Gothic", "Noto Sans KR", "Noto Sans CJK KR", sans-serif`;
const AR = `"Noto Sans Arabic", "IBM Plex Sans Arabic", "Geeza Pro", "Segoe UI", Tahoma, sans-serif`;

const RADIO = (p: string, color: string) => `
.${p}-radio { flex: none; width: 16px; height: 16px; margin-top: 2px; border: 1.5px solid #8b92a1; border-radius: 50%; background: #fff; }
.on > .${p}-radio { border: 5px solid ${color}; }`;

/** Decorative QR-like pattern (25 × 25 modules, not a real code). */
const QR_PATH = 'M0 0h7v1h-7zM8 0h3v1h-3zM14 0h1v1h-1zM16 0h1v1h-1zM18 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h5v1h-5zM16 1h1v1h-1zM18 1h1v1h-1zM24 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h3v1h-3zM12 2h1v1h-1zM14 2h2v1h-2zM18 2h1v1h-1zM20 2h3v1h-3zM24 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM11 3h2v1h-2zM16 3h1v1h-1zM18 3h1v1h-1zM20 3h3v1h-3zM24 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM10 4h1v1h-1zM12 4h1v1h-1zM14 4h2v1h-2zM18 4h1v1h-1zM20 4h3v1h-3zM24 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h4v1h-4zM13 5h1v1h-1zM18 5h1v1h-1zM24 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h7v1h-7zM13 7h4v1h-4zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h2v1h-2zM12 8h3v1h-3zM16 8h1v1h-1zM19 8h1v1h-1zM23 8h1v1h-1zM0 9h1v1h-1zM2 9h1v1h-1zM4 9h2v1h-2zM7 9h2v1h-2zM10 9h1v1h-1zM12 9h8v1h-8zM23 9h1v1h-1zM2 10h2v1h-2zM6 10h1v1h-1zM9 10h6v1h-6zM16 10h1v1h-1zM20 10h1v1h-1zM23 10h2v1h-2zM0 11h1v1h-1zM3 11h1v1h-1zM5 11h1v1h-1zM9 11h3v1h-3zM13 11h1v1h-1zM15 11h1v1h-1zM17 11h2v1h-2zM20 11h3v1h-3zM1 12h4v1h-4zM6 12h2v1h-2zM10 12h1v1h-1zM12 12h6v1h-6zM19 12h1v1h-1zM21 12h4v1h-4zM0 13h6v1h-6zM10 13h1v1h-1zM13 13h3v1h-3zM17 13h3v1h-3zM22 13h3v1h-3zM0 14h3v1h-3zM4 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM10 14h4v1h-4zM17 14h1v1h-1zM19 14h1v1h-1zM23 14h2v1h-2zM1 15h4v1h-4zM9 15h1v1h-1zM12 15h1v1h-1zM15 15h1v1h-1zM18 15h1v1h-1zM20 15h1v1h-1zM23 15h2v1h-2zM0 16h7v1h-7zM12 16h2v1h-2zM15 16h9v1h-9zM8 17h4v1h-4zM14 17h1v1h-1zM16 17h1v1h-1zM20 17h2v1h-2zM0 18h7v1h-7zM8 18h1v1h-1zM11 18h3v1h-3zM15 18h2v1h-2zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h1v1h-1zM24 18h1v1h-1zM0 19h1v1h-1zM6 19h1v1h-1zM9 19h3v1h-3zM13 19h4v1h-4zM20 19h3v1h-3zM24 19h1v1h-1zM0 20h1v1h-1zM2 20h3v1h-3zM6 20h1v1h-1zM10 20h1v1h-1zM15 20h6v1h-6zM22 20h1v1h-1zM0 21h1v1h-1zM2 21h3v1h-3zM6 21h1v1h-1zM10 21h3v1h-3zM14 21h1v1h-1zM19 21h1v1h-1zM21 21h1v1h-1zM23 21h1v1h-1zM0 22h1v1h-1zM2 22h3v1h-3zM6 22h1v1h-1zM10 22h6v1h-6zM17 22h2v1h-2zM23 22h2v1h-2zM0 23h1v1h-1zM6 23h1v1h-1zM10 23h1v1h-1zM14 23h1v1h-1zM16 23h1v1h-1zM19 23h3v1h-3zM23 23h2v1h-2zM0 24h7v1h-7zM8 24h3v1h-3zM12 24h1v1h-1zM18 24h1v1h-1zM22 24h3v1h-3z';

/** Checkout address form, shared by the LTR and RTL versions (prefix `p`). */
const ADDRESS_CSS = (p: string) => `
.${p} { font-size: 13px; }
.${p}-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid #eceef2; }
.${p}-bar p { font-size: 15px; font-weight: 700; }
.${p}-steps { display: flex; justify-content: space-between; padding: 10px 16px 6px; list-style: none; font-size: 12px; color: #5a6172; }
.${p}-steps li { display: flex; align-items: center; gap: 4px; --ico: 14px; }
.${p}-steps .done { color: #0b5d4b; }
.${p}-steps .on { color: #1d2230; font-weight: 700; }
.${p}-prog { height: 4px; margin: 0 16px; border-radius: 2px; background: #eceef2; }
.${p}-prog span { display: block; width: 50%; height: 100%; border-radius: 2px; background: #0b5d4b; }
.${p}-body { display: flex; flex-direction: column; gap: 10px; padding: 14px 16px 16px; }
.${p}-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.${p} .mk-label small { font-weight: 400; color: #5a6172; }
.${p}-tel { display: flex; align-items: center; gap: 8px; --ico: 15px; }
.${p}-tel svg { color: #5a6172; }
.${p}-check { display: flex; align-items: center; gap: 8px; }
.${p}-box { flex: none; display: grid; place-items: center; width: 18px; height: 18px; border-radius: 4px; background: #0b5d4b; color: #fff; --ico: 13px; }
.${p}-cta { min-height: 44px; background: #0b5d4b; }`;

export const CULTURE_PAIRS: CulturePair[] = [
  /* ------------------------------------------------------------------ 1. E-commerce home */
  {
    id: 'accueil-ecommerce',
    title: 'Accueil d’une boutique en ligne',
    a: 'us',
    b: 'cn',
    visualA: {
      frame: 'phone',
      lang: 'en',
      alt: 'Accueil d’une boutique américaine : recherche, adresse de livraison, une grande bannière « Fall Sale, up to 40% off outerwear » avec un bouton, quatre catégories en pastilles et deux produits recommandés avec prix et note, beaucoup d’espace.',
      html: `<div class="ush">
  <div class="ush-top"><p class="ush-logo">Harbor &amp; Co.</p><i data-icon="bell"></i></div>
  <div class="ush-pad">
    <span class="ush-search"><i data-icon="search"></i>Search Harbor &amp; Co.</span>
    <p class="ush-deliver"><i data-icon="map-pin"></i>Deliver to Austin 78701</p>
    <div class="ush-hero"><p class="ush-kicker">Fall Sale</p><p class="ush-h">Up to 40% off outerwear</p><span class="ush-btn">Shop the sale</span></div>
    <div class="ush-chips"><span>Women</span><span>Men</span><span>Home</span><span>Kids</span></div>
    <p class="ush-sec"><b>Picked for you</b><span>See all</span></p>
    <div class="ush-cards">
      <div><div class="mk-img ush-ph" style="--g:linear-gradient(160deg,#ddd2c1,#a99272)"><i data-icon="shirt"></i></div><p class="ush-name">Quilted Field Jacket</p><p class="ush-price">$89.00</p><p class="ush-rate"><i data-icon="star"></i>4.6 (1,284)</p></div>
      <div><div class="mk-img ush-ph" style="--g:linear-gradient(160deg,#d0d8e2,#8796ab)"><i data-icon="shirt"></i></div><p class="ush-name">Merino Crew Sweater</p><p class="ush-price">$64.00</p><p class="ush-rate"><i data-icon="star"></i>4.8 (932)</p></div>
    </div>
  </div>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>Home</span><span><i data-icon="search"></i>Search</span><span><i data-icon="heart"></i>Saved</span><span><i data-icon="shopping-bag"></i>Bag</span><span><i data-icon="user"></i>Account</span></div>
</div>`,
      css: `.ush { font-size: 13px; color: #1d2230; }
.ush-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px 6px; }
.ush-logo { font-size: 17px; font-weight: 800; letter-spacing: -0.01em; }
.ush-pad { display: flex; flex-direction: column; gap: 12px; padding: 4px 16px 16px; }
.ush-search { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 10px; background: #f1f3f6; color: #5a6172; --ico: 16px; }
.ush-deliver { display: flex; align-items: center; gap: 6px; margin-top: -4px; font-size: 12px; color: #5a6172; --ico: 14px; }
.ush-hero { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 20px 18px; border-radius: 14px; background: linear-gradient(135deg, #24334d, #3c5476); color: #fff; }
.ush-kicker { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #d7e1f0; }
.ush-h { font-size: 22px; font-weight: 800; line-height: 1.15; }
.ush-btn { margin-top: 6px; padding: 8px 14px; border-radius: 999px; background: #fff; color: #1d2230; font-weight: 700; }
.ush-chips { display: flex; gap: 8px; overflow: hidden; white-space: nowrap; }
.ush-chips span { padding: 6px 12px; border: 1px solid #c7cedb; border-radius: 999px; font-weight: 600; }
.ush-sec { display: flex; align-items: baseline; justify-content: space-between; }
.ush-sec b { font-size: 15px; }
.ush-sec span { color: #1f4fd8; font-weight: 600; }
.ush-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.ush-ph { display: grid; place-items: center; aspect-ratio: 4 / 5; background: var(--g); color: rgb(255 255 255 / 0.8); --ico: 40px; }
.ush-name { margin-top: 6px; font-weight: 600; }
.ush-price { font-weight: 700; }
.ush-rate { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #5a6172; --ico: 12px; }
.ush-rate svg { color: #b45309; fill: currentColor; }
.ush .mk-tabbar > .on { color: #1d2230; font-weight: 700; }`,
    },
    visualB: {
      frame: 'phone',
      lang: 'zh-CN',
      alt: 'Accueil d’une boutique chinoise : recherche avec suggestion et bouton rouge, onglets de catégories, bannière rouge du 11.11 avec remise par tranche, grille de dix raccourcis avec badge « nouveau » et pastille rouge, vente flash avec compte à rebours et quatre produits, flux en cascade de produits avec nombre d’acheteurs, barre d’onglets avec badges rouges.',
      html: `<div class="cnh">
  <div class="cnh-top"><span class="cnh-search"><i data-icon="search"></i><span class="cnh-q">羽绒服女冬季新款</span><i data-icon="camera"></i></span><span class="cnh-go">搜索</span></div>
  <div class="cnh-tabs"><span class="on">推荐</span><span>女装</span><span>手机</span><span>家电</span><span>美妆</span><span>食品</span></div>
  <div class="cnh-banner"><b>双11预售</b><span>跨店每满300减50</span></div>
  <div class="cnh-grid">
    <span><b style="--c:#e11d48"><i data-icon="store"></i></b>超市</span>
    <span><b style="--c:#c2410c"><i data-icon="badge-check"></i></b>特价</span>
    <span><b style="--c:#be185d"><i data-icon="ticket"></i></b>领券<span class="cnh-tag">新</span></span>
    <span><b style="--c:#2563eb"><i data-icon="phone"></i></b>充值</span>
    <span><b style="--c:#7c3aed"><i data-icon="play"></i></b>直播</span>
    <span><b style="--c:#b45309"><i data-icon="utensils"></i></b>外卖</span>
    <span><b style="--c:#0e7490"><i data-icon="plane"></i></b>旅行</span>
    <span><b style="--c:#15803d"><i data-icon="gift"></i></b>签到<span class="cnh-dot"></span></span>
    <span><b style="--c:#a16207"><i data-icon="tag"></i></b>拍卖</span>
    <span><b style="--c:#475569"><i data-icon="layout-grid"></i></b>分类</span>
  </div>
  <div class="cnh-flash">
    <p class="cnh-fh"><b>限时秒杀</b><span class="cnh-timer"><span>02</span>:<span>14</span>:<span>36</span></span><span class="cnh-more">更多</span></p>
    <div class="cnh-items">
      <div><div class="mk-img cnh-ph" style="--g:linear-gradient(160deg,#fbe0d6,#ec9c84)"><i data-icon="shirt"></i></div><p class="cnh-p">¥59</p><s>¥129</s></div>
      <div><div class="mk-img cnh-ph" style="--g:linear-gradient(160deg,#dbe6f6,#94afdc)"><i data-icon="headphones"></i></div><p class="cnh-p">¥129</p><s>¥299</s></div>
      <div><div class="mk-img cnh-ph" style="--g:linear-gradient(160deg,#e3f1e2,#94c98f)"><i data-icon="coffee"></i></div><p class="cnh-p">¥19.9</p><s>¥49</s></div>
      <div><div class="mk-img cnh-ph" style="--g:linear-gradient(160deg,#f6e6c8,#ddb466)"><i data-icon="gift"></i></div><p class="cnh-p">¥89</p><s>¥199</s></div>
    </div>
  </div>
  <div class="cnh-feed">
    <div class="cnh-col">
      <div class="cnh-card"><div class="cnh-pic" style="--h:150px;--g:linear-gradient(160deg,#f4dccd,#d39a80)"></div><p class="cnh-t">加厚羽绒服女2026新款中长款</p><p class="cnh-tags"><span>包邮</span><span>退货包运费</span></p><p class="cnh-pr"><b>¥299</b><small>1.2万人付款</small></p></div>
    </div>
    <div class="cnh-col">
      <div class="cnh-card"><div class="cnh-pic" style="--h:92px;--g:linear-gradient(160deg,#e2e8f0,#a3b1c4)"></div><p class="cnh-t">316不锈钢保温杯</p><p class="cnh-pr"><b>¥39.9</b><small>已售10万+</small></p></div>
      <div class="cnh-card"><div class="cnh-pic" style="--h:64px;--g:linear-gradient(160deg,#f6e7c9,#d8ad62)"></div><p class="cnh-t">每日坚果礼盒 1.5kg</p></div>
    </div>
  </div>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>首页</span><span><i data-icon="play"></i>视频</span><span class="cnh-b"><i data-icon="message-circle"></i>消息<span class="cnh-badge">9</span></span><span class="cnh-b"><i data-icon="shopping-cart"></i>购物车<span class="cnh-badge">3</span></span><span><i data-icon="user"></i>我的</span></div>
</div>`,
      css: `.cnh { font-family: ${ZH}; font-size: 13px; line-height: 1.5; color: #1f2329; background: #f4f5f7; }
.cnh-top { display: flex; align-items: center; gap: 6px; padding: 8px 10px 6px; background: #fff; }
.cnh-search { flex: 1; display: flex; align-items: center; gap: 6px; padding: 4px 10px; border: 1.5px solid #e1251b; border-radius: 999px; color: #5a6172; font-size: 12px; --ico: 14px; }
.cnh-q { flex: 1; }
.cnh-go { padding: 4px 12px; border-radius: 999px; background: #e1251b; color: #fff; font-weight: 700; }
.cnh-tabs { display: flex; gap: 14px; padding: 4px 12px 8px; overflow: hidden; background: #fff; color: #4b5563; font-size: 14px; white-space: nowrap; }
.cnh-tabs .on { color: #1f2329; font-weight: 700; box-shadow: inset 0 -3px 0 #e1251b; }
.cnh-banner { display: flex; align-items: center; gap: 8px; margin: 8px; padding: 10px 12px; border-radius: 10px; background: linear-gradient(90deg, #b8160c, #e1251b); color: #fff; }
.cnh-banner b { flex: none; font-size: 16px; }
.cnh-banner span { font-size: 12px; }
.cnh-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px 2px; margin: 0 6px; padding: 12px 4px 10px; border-radius: 10px; background: #fff; }
.cnh-grid > span { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11.5px; line-height: 1.3; text-align: center; }
.cnh-grid b { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--c); color: #fff; --ico: 18px; }
.cnh-tag { position: absolute; top: -6px; inset-inline-end: 4px; padding: 0 4px; border-radius: 6px 6px 6px 0; background: #d0021b; color: #fff; font-size: 11px; line-height: 15px; }
.cnh-dot { position: absolute; top: 0; inset-inline-end: 14px; width: 8px; height: 8px; border: 1.5px solid #fff; border-radius: 50%; background: #d0021b; }
.cnh-flash { margin: 8px; padding: 8px 10px; border-radius: 10px; background: #fff; }
.cnh-fh { display: flex; align-items: center; gap: 8px; }
.cnh-fh b { color: #d0021b; font-size: 15px; }
.cnh-timer { display: flex; align-items: center; gap: 2px; color: #d0021b; font-size: 12px; font-weight: 700; }
.cnh-timer span { padding: 0 3px; border-radius: 3px; background: #d0021b; color: #fff; font-variant-numeric: tabular-nums; }
.cnh-more { margin-inline-start: auto; font-size: 12px; color: #5a6172; }
.cnh-items { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin-top: 6px; }
.cnh-ph { display: grid; place-items: center; aspect-ratio: 1; background: var(--g); color: rgb(255 255 255 / 0.9); --ico: 24px; }
.cnh-p { margin-top: 2px; color: #d0021b; font-weight: 800; }
.cnh-items s { font-size: 11px; color: #5a6172; }
.cnh-feed { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 8px; padding: 0 8px 10px; }
.cnh-col { display: flex; flex-direction: column; gap: 8px; }
.cnh-card { overflow: hidden; border-radius: 10px; background: #fff; }
.cnh-pic { height: var(--h); background: var(--g); }
.cnh-t { display: -webkit-box; padding: 6px 8px 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: 12.5px; }
.cnh-card > .cnh-t:last-child { padding-bottom: 8px; }
.cnh-tags { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px 8px 0; }
.cnh-tags span { padding: 0 4px; border: 1px solid #f3b4ae; border-radius: 3px; color: #b3261e; font-size: 11px; line-height: 16px; white-space: nowrap; }
.cnh-pr { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 6px; padding: 4px 8px 8px; white-space: nowrap; }
.cnh-pr b { color: #d0021b; font-size: 15px; }
.cnh-pr small { font-size: 11px; color: #5a6172; }
.cnh .mk-tabbar { font-size: 11px; }
.cnh .mk-tabbar > .on { color: #e1251b; }
.cnh-b { position: relative; }
.cnh-badge { position: absolute; top: -4px; inset-inline-start: 55%; min-width: 16px; padding: 0 4px; border-radius: 8px; background: #d0021b; color: #fff; font-size: 11px; line-height: 16px; text-align: center; }`,
    },
    notes: `Deux accueils de boutique pour le même besoin — trouver un produit — et deux logiques opposées.

- **Densité.** L’accueil américain compte cinq blocs et une action principale par bloc. L’accueil chinois aligne plus de vingt points d’entrée sur la même hauteur : l’appli y est un portail où l’on attend tous les services à portée de pouce, et l’écriture chinoise, compacte, loge plus d’information par ligne.
- **Grille d’accès (金刚区).** Dix icônes sur deux lignes, aux libellés de deux caractères, ouvrent les canaux (supermarché, promotions, coupons, live, voyages). Côté américain, quatre catégories en pastilles suffisent.
- **Flux en cascade (瀑布流).** Des cartes de hauteurs variables sur deux colonnes invitent à défiler et à découvrir ; l’accueil américain propose une sélection courte dans une grille régulière.
- **Urgence et promotions.** Vente flash avec compte à rebours, remise « 跨店每满300减50 » (50\u00a0¥ de moins par tranche de 300\u00a0¥, tous vendeurs confondus), pastilles rouges : la fête commerciale du 11.11 structure l’écran. Aux États-Unis, la promotion tient dans une bannière.
- **Preuve sociale.** « 1.2万人付款 » (12\u00a0000 acheteurs) ou « 已售10万+ » (plus de 100\u00a0000 vendus) remplacent la note en étoiles.

### Comment adapter

- Ne traduis pas un accueil : reconstruis-le avec les points d’entrée qu’attend le marché, puis teste-le avec des utilisateurs locaux.
- Dans une version dense, garde la lisibilité : blocs nets, libellés courts, icônes reconnaissables, aucun texte sous 11\u00a0px, contrastes d’au moins 4,5:1.
- Dans une version épurée, une hiérarchie franche et une seule action par bloc ; les promotions restent ponctuelles.
- La densité attendue varie aussi selon l’âge, la catégorie de produits et le modèle économique : ce sont des tendances, pas des règles fixes.`,
  },

  /* ------------------------------------------------------------------ 2. Product page */
  {
    id: 'fiche-produit',
    title: 'Fiche produit',
    a: 'us',
    b: 'jp',
    visualA: {
      frame: 'phone',
      lang: 'en',
      alt: 'Fiche produit américaine d’écouteurs sans fil : grande image, marque, titre court, note 4,5 sur 2 184 avis, prix de 99 dollars, offre de paiement en 4 fois, livraison gratuite jeudi et retours gratuits, un bouton « Add to cart », puis deux sections repliées.',
      html: `<div class="usp">
  <div class="usp-top"><i data-icon="arrow-left"></i><span><i data-icon="share-2"></i><i data-icon="shopping-cart"></i></span></div>
  <div class="mk-img usp-ph"><i data-icon="headphones"></i></div>
  <div class="usp-body">
    <p class="usp-brand">Pulse Audio</p>
    <p class="usp-title">Pulse Buds Pro Wireless Earbuds</p>
    <p class="usp-rate"><span class="usp-stars"><i data-icon="star"></i><i data-icon="star"></i><i data-icon="star"></i><i data-icon="star"></i><i data-icon="star"></i></span>4.5 · 2,184 reviews</p>
    <p class="usp-price">$99.00</p>
    <p class="usp-afford">or 4 interest-free payments of $24.75</p>
    <p class="usp-ship"><i data-icon="truck"></i><span><b>Free delivery Thu, Oct 29</b><br>Free 30-day returns</span></p>
    <span class="mk-btn mk-btn--block usp-cta">Add to cart</span>
    <p class="usp-more"><span>About this item</span><i data-icon="chevron-down"></i></p>
    <p class="usp-more"><span>Specs</span><i data-icon="chevron-down"></i></p>
  </div>
</div>`,
      css: `.usp { font-size: 13px; color: #1d2230; }
.usp-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; }
.usp-top span { display: flex; gap: 14px; }
.usp-ph { display: grid; place-items: center; margin: 0 16px; aspect-ratio: 1; background: linear-gradient(160deg, #eef1f5, #c9d1dc); color: rgb(29 34 48 / 0.35); --ico: 72px; }
.usp-body { display: flex; flex-direction: column; gap: 6px; padding: 14px 16px 18px; }
.usp-brand { font-size: 12px; font-weight: 600; color: #5a6172; }
.usp-title { font-size: 18px; font-weight: 700; line-height: 1.25; }
.usp-rate { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #5a6172; }
.usp-stars { display: flex; color: #b45309; --ico: 13px; }
.usp-stars svg { fill: currentColor; }
.usp-price { margin-top: 4px; font-size: 24px; font-weight: 800; }
.usp-afford { margin-top: -4px; font-size: 12px; color: #5a6172; }
.usp-ship { display: flex; align-items: flex-start; gap: 8px; padding: 10px 0; border-block: 1px solid #eceef2; --ico: 16px; }
.usp-cta { min-height: 46px; background: #1d2230; font-size: 15px; }
.usp-more { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eceef2; font-weight: 600; --ico: 16px; }`,
    },
    visualB: {
      frame: 'phone',
      lang: 'ja',
      alt: 'Fiche produit japonaise des mêmes écouteurs, très dense : bandeau de coupon, badge « classement n° 1 », boutique officielle, long titre chargé de mots-clés, note 4,42 sur 1 284 avis, prix de 8 980 yens taxe incluse avec livraison gratuite, points ×10, tableau livraison, stock, garantie et paiements, deux boutons d’achat, favoris et tableau de caractéristiques.',
      html: `<div class="jpp">
  <div class="jpp-top"><i data-icon="chevron-left"></i><span class="jpp-search"><i data-icon="search"></i>ワイヤレスイヤホン</span><i data-icon="shopping-cart"></i></div>
  <p class="jpp-coupon">クーポン利用で<b>500円OFF</b>・本日23:59まで</p>
  <div class="mk-img jpp-ph"><span class="jpp-rank">ランキング<b>1位</b></span><i data-icon="headphones"></i></div>
  <div class="jpp-body">
    <p class="jpp-shop">ミドリ電機 公式ストア</p>
    <p class="jpp-title">【ランキング1位】完全ワイヤレスイヤホン ノイズキャンセリング Bluetooth 5.3 最大30時間再生 IPX4防水 マイク付き</p>
    <p class="jpp-rate"><i data-icon="star"></i>4.42<span>（1,284件）</span></p>
    <p class="jpp-price"><b>8,980</b>円<small>（税込）</small><span class="jpp-tag">送料無料</span></p>
    <p class="jpp-pt"><span>ポイント10倍</span>期間限定・エントリー不要</p>
    <dl class="jpp-info">
      <div><dt>お届け</dt><dd>14時までのご注文で当日発送<br><b>明日10/28</b>お届け</dd></div>
      <div><dt>在庫</dt><dd>在庫あり</dd></div>
      <div><dt>保証</dt><dd>メーカー保証1年</dd></div>
      <div><dt>支払い</dt><dd>クレジットカード・コンビニ払い・代引き・PayPay</dd></div>
    </dl>
    <div class="jpp-btns"><span class="jpp-cart">カートに入れる</span><span class="jpp-buy">今すぐ買う</span></div>
    <p class="jpp-fav"><i data-icon="heart"></i>お気に入りに追加（2,315）</p>
    <table class="jpp-spec"><tr><th>連続再生</th><td>最大8時間（ケース併用30時間）</td></tr><tr><th>重量</th><td>片耳 約5g</td></tr><tr><th>防水</th><td>IPX4</td></tr></table>
  </div>
</div>`,
      css: `.jpp { font-family: ${JA}; font-size: 12.5px; line-height: 1.55; color: #222; }
.jpp-top { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #bf0000; color: #fff; --ico: 20px; }
.jpp-search { flex: 1; display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 4px; background: #fff; color: #555; font-size: 12px; --ico: 14px; }
.jpp-coupon { padding: 5px 12px; background: #fff4d6; color: #7a4a00; font-size: 12px; text-align: center; }
.jpp-coupon b { margin-inline: 2px; color: #bf0000; font-size: 14px; }
.jpp-ph { position: relative; display: grid; place-items: center; margin: 8px 12px 0; aspect-ratio: 16 / 10; background: linear-gradient(160deg, #f2f4f7, #cfd6e0); color: rgb(34 34 34 / 0.3); --ico: 60px; }
.jpp-rank { position: absolute; top: 8px; inset-inline-start: 8px; display: flex; flex-direction: column; align-items: center; padding: 4px 6px; border-radius: 4px; background: #7a5a00; color: #fff; font-size: 11px; line-height: 1.3; }
.jpp-rank b { font-size: 16px; }
.jpp-body { display: flex; flex-direction: column; gap: 6px; padding: 8px 12px 14px; }
.jpp-shop { font-size: 12px; color: #1a5fb4; }
.jpp-title { font-size: 14px; font-weight: 700; line-height: 1.5; }
.jpp-rate { display: flex; align-items: center; gap: 4px; font-weight: 700; --ico: 14px; }
.jpp-rate svg { color: #b45309; fill: currentColor; }
.jpp-rate span { font-weight: 400; color: #555; }
.jpp-price { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 4px; color: #bf0000; font-weight: 700; }
.jpp-price b { font-size: 24px; }
.jpp-price small { font-size: 11px; font-weight: 400; color: #555; }
.jpp-tag { margin-inline-start: 6px; padding: 0 6px; border: 1px solid #bf0000; border-radius: 3px; font-size: 11px; }
.jpp-pt { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #555; }
.jpp-pt span { padding: 0 6px; border-radius: 3px; background: #bf0000; color: #fff; font-weight: 700; }
.jpp-info { margin: 2px 0; border-top: 1px solid #e5e5e5; }
.jpp-info div { display: grid; grid-template-columns: 52px 1fr; gap: 8px; padding: 5px 0; border-bottom: 1px solid #e5e5e5; }
.jpp-info dt { font-weight: 700; color: #555; }
.jpp-info dd { margin: 0; }
.jpp-info dd b { color: #bf0000; }
.jpp-btns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.jpp-btns span { display: grid; place-items: center; min-height: 42px; border-radius: 6px; font-size: 13px; font-weight: 700; }
.jpp-cart { background: #f5a300; color: #222; }
.jpp-buy { background: #bf0000; color: #fff; }
.jpp-fav { display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 12px; color: #555; --ico: 14px; }
.jpp-spec { width: 100%; border-collapse: collapse; font-size: 12px; }
.jpp-spec th, .jpp-spec td { padding: 4px 6px; border: 1px solid #e0e0e0; text-align: start; vertical-align: top; }
.jpp-spec th { width: 64px; background: #f6f6f6; font-weight: 600; }`,
    },
    notes: `La même paire d’écouteurs, vendue sur deux marchés.

- **Ce qui entoure le prix.** La fiche japonaise rassemble prix taxe incluse (« 税込 », affichage obligatoire depuis avril 2021), livraison gratuite, points, coupon, date de livraison, stock, garantie et moyens de paiement. La fiche américaine montre le prix, l’offre de paiement fractionné et la livraison ; le reste est replié.
- **Pourquoi.** Le contrôle de l’incertitude atteint 92 au Japon contre 46 aux États-Unis : l’exhaustivité rassure (anshin) et l’omission inquiète. Côté américain, une page aérée qui va à l’essentiel inspire confiance.
- **Titre.** Le titre japonais aligne les mots-clés (réduction de bruit, autonomie, étanchéité), comme sur les grandes places de marché ; le titre américain nomme simplement le produit.
- **Actions.** Deux boutons d’achat (« カートに入れる », ajouter au panier, et « 今すぐ買う », acheter maintenant) et les favoris avec leur compteur ; une seule action principale côté américain.
- **Prix.** 8\u00a0980\u00a0yens taxe incluse d’un côté ; 99\u00a0dollars hors taxes de l’autre, la sales tax s’ajoutant au paiement.
- **Signaux d’autorité.** Badge de classement, boutique officielle, tableau de caractéristiques.

### Comment adapter

- Pour le Japon, n’épure pas : structure. Blocs titrés, tableau de caractéristiques et lignes alignées rendent la densité confortable.
- Pour les États-Unis, divulgation progressive : l’essentiel en haut, les détails dans des sections repliables.
- Dans les deux cas, garde le texte en HTML plutôt qu’incrusté dans les images : accessible, traduisible et net à l’agrandissement.`,
  },

  /* ------------------------------------------------------------------ 3. Sign-in */
  {
    id: 'connexion',
    title: 'Écran de connexion',
    a: 'fr',
    b: 'cn',
    visualA: {
      frame: 'browser',
      lang: 'fr',
      alt: 'Page de connexion d’une boutique française : champs adresse e-mail et mot de passe, lien « Mot de passe oublié ? », bouton « Se connecter », puis « Continuer avec Google » et « Continuer avec Apple » et un lien pour créer un compte.',
      html: `<div class="frl">
  <div class="frl-head"><p class="frl-logo">Maison Lumière</p><span>Besoin d’aide&#8239;?</span></div>
  <div class="frl-box">
    <p class="frl-h">Connexion</p>
    <div class="mk-field"><span class="mk-label">Adresse e-mail</span><span class="mk-input">marie.dupont@example.com</span></div>
    <div class="mk-field"><span class="mk-label">Mot de passe</span><span class="mk-input frl-pw"><span>••••••••••</span><i data-icon="eye"></i></span></div>
    <p class="frl-forgot">Mot de passe oublié&#8239;?</p>
    <span class="mk-btn mk-btn--block frl-cta">Se connecter</span>
    <p class="frl-or">ou</p>
    <span class="mk-btn mk-btn--ghost mk-btn--block">Continuer avec Google</span>
    <span class="mk-btn mk-btn--ghost mk-btn--block">Continuer avec Apple</span>
    <p class="frl-new">Nouveau client&#8239;? <u>Créer un compte</u></p>
  </div>
</div>`,
      css: `.frl { padding-bottom: 20px; background: #f6f4f1; font-size: 13px; }
.frl-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid #e7e3dd; background: #fff; }
.frl-logo { font-family: Georgia, "Times New Roman", serif; font-size: 18px; font-weight: 700; letter-spacing: 0.02em; }
.frl-head span { font-size: 12px; color: #5a6172; }
.frl-box { display: flex; flex-direction: column; gap: 10px; width: min(100% - 32px, 340px); margin: 20px auto 0; padding: 20px; border-radius: 12px; background: #fff; box-shadow: 0 1px 3px rgb(0 0 0 / 0.08); }
.frl-h { font-size: 20px; font-weight: 700; }
.frl-pw { display: flex; align-items: center; justify-content: space-between; --ico: 16px; }
.frl-forgot { margin-top: -4px; font-size: 12px; color: #1f4fd8; text-decoration: underline; }
.frl-cta { min-height: 42px; background: #1d2230; }
.frl-or { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #5a6172; }
.frl-or::before, .frl-or::after { content: ""; flex: 1; height: 1px; background: #e3e6ec; }
.frl-new { text-align: center; }`,
    },
    visualB: {
      frame: 'browser',
      lang: 'zh-CN',
      alt: 'Page de connexion d’une boutique chinoise : un QR code à scanner avec l’appli, et un formulaire « connexion par SMS » avec indicatif +86, numéro de mobile, code de vérification à recevoir, case d’accord aux conditions et à la politique de confidentialité non cochée, bouton « se connecter / s’inscrire », mention d’inscription automatique et connexion par WeChat ou Alipay.',
      html: `<div class="cnl">
  <div class="cnl-head"><p class="cnl-logo">优选商城</p><span>欢迎登录</span></div>
  <div class="cnl-box">
    <div class="cnl-qr">
      <p class="cnl-h">扫码登录</p>
      <svg viewBox="-2 -2 29 29" class="cnl-code" aria-hidden="true"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/><path d="${QR_PATH}" fill="#1f2329"/></svg>
      <p class="cnl-hint">打开<b>优选App</b><br>扫一扫登录</p>
    </div>
    <div class="cnl-form">
      <div class="cnl-tabs"><span class="on">短信登录</span><span>密码登录</span></div>
      <div class="cnl-in"><span class="cnl-cc">+86<i data-icon="chevron-down"></i></span><span class="cnl-ph">请输入手机号</span></div>
      <div class="cnl-in"><span class="cnl-ph">请输入验证码</span><span class="cnl-get">获取验证码</span></div>
      <p class="cnl-agree"><span class="cnl-box2"></span><span>我已阅读并同意<a>《用户协议》</a>和<a>《隐私政策》</a></span></p>
      <span class="cnl-cta">登录 / 注册</span>
      <p class="cnl-small">未注册的手机号验证通过后将自动注册</p>
      <p class="cnl-third"><span>其他方式</span><span class="cnl-wx"><i data-icon="message-circle"></i>微信</span><span class="cnl-ali"><i data-icon="wallet"></i>支付宝</span></p>
    </div>
  </div>
</div>`,
      css: `.cnl { padding-bottom: 16px; background: #f4f5f7; font-family: ${ZH}; font-size: 13px; line-height: 1.5; color: #1f2329; }
.cnl-head { display: flex; align-items: baseline; gap: 10px; padding: 12px 18px; border-bottom: 1px solid #e5e7eb; background: #fff; }
.cnl-logo { color: #e1251b; font-size: 20px; font-weight: 800; }
.cnl-head span { font-size: 14px; color: #5a6172; }
.cnl-box { display: flex; flex-wrap: wrap; gap: 16px; margin: 16px; padding: 16px; border-radius: 10px; background: #fff; }
.cnl-qr { flex: 1 0 130px; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border-radius: 8px; background: #f7f8fa; }
.cnl-h { font-size: 15px; font-weight: 700; }
.cnl-code { width: 116px; height: 116px; }
.cnl-hint { font-size: 12px; text-align: center; color: #5a6172; }
.cnl-hint b { color: #d0021b; }
.cnl-form { flex: 1 1 210px; display: flex; flex-direction: column; gap: 10px; }
.cnl-tabs { display: flex; gap: 18px; font-size: 15px; color: #5a6172; }
.cnl-tabs .on { color: #1f2329; font-weight: 700; box-shadow: inset 0 -2px 0 #e1251b; }
.cnl-in { display: flex; align-items: center; gap: 8px; min-height: 38px; padding: 0 10px; border: 1px solid #c7cedb; border-radius: 6px; }
.cnl-cc { display: flex; align-items: center; gap: 2px; padding-inline-end: 8px; border-inline-end: 1px solid #e5e7eb; --ico: 14px; }
.cnl-ph { flex: 1; color: #6b7280; }
.cnl-get { color: #d0021b; font-weight: 600; white-space: nowrap; }
.cnl-agree { display: flex; align-items: flex-start; gap: 6px; font-size: 12px; color: #5a6172; }
.cnl-agree a { color: #1a6dde; white-space: nowrap; }
.cnl-box2 { flex: none; width: 14px; height: 14px; margin-top: 2px; border: 1.5px solid #8b92a1; border-radius: 50%; }
.cnl-cta { display: grid; place-items: center; min-height: 40px; border-radius: 6px; background: #e1251b; color: #fff; font-size: 15px; font-weight: 700; }
.cnl-small { font-size: 12px; color: #5a6172; }
.cnl-third { display: flex; align-items: center; gap: 14px; padding-top: 8px; border-top: 1px solid #eceef2; font-size: 12px; color: #5a6172; }
.cnl-wx, .cnl-ali { display: flex; align-items: center; gap: 4px; color: #1f2329; --ico: 16px; }
.cnl-wx svg { color: #05a052; }
.cnl-ali svg { color: #1a6dde; }`,
    },
    notes: `Deux écrans de connexion sur ordinateur : l’un repose sur l’adresse e-mail, l’autre sur le téléphone.

- **Identifiant.** L’e-mail en France. En Chine, le numéro de mobile : les cartes SIM sont enregistrées à l’identité réelle et le numéro sert d’identifiant universel, l’e-mail beaucoup moins.
- **Preuve.** Un mot de passe d’un côté ; de l’autre, un code reçu par SMS (« 获取验证码 », obtenir le code), sans mot de passe à retenir.
- **Le téléphone comme clé.** Sur ordinateur, on scanne le QR code avec l’appli déjà connectée : la session passe du mobile au poste. L’onglet « 密码登录 » garde le mot de passe en option.
- **Comptes tiers.** Google ou Apple en France ; WeChat (微信) ou Alipay (支付宝) en Chine.
- **Inscription.** Un lien « Créer un compte » séparé en France ; en Chine, le premier code validé crée le compte (« 未注册的手机号验证通过后将自动注册 »).
- **Consentement.** La case « 我已阅读并同意《用户协议》和《隐私政策》 » (j’ai lu et j’accepte l’accord utilisateur et la politique de confidentialité) n’est pas cochée par défaut, comme le veut la loi PIPL de 2021.

### Comment adapter

- En Chine, construis l’authentification autour du téléphone : indicatif +86, bouton de code avec compte à rebours avant renvoi, QR code sur ordinateur, WeChat et Alipay.
- En France, garde l’e-mail, propose une alternative sans mot de passe (lien de connexion, clé d’accès) et ne rends pas le téléphone obligatoire sans raison : le RGPD demande de ne collecter que le nécessaire.
- Dans les deux cas, ne précoche jamais un consentement.`,
  },

  /* ------------------------------------------------------------------ 4. Payment */
  {
    id: 'paiement',
    title: 'Choix du moyen de paiement',
    a: 'de',
    b: 'br',
    visualA: {
      frame: 'phone',
      lang: 'de',
      alt: 'Dernière étape d’une commande allemande : achat sur facture sélectionné, PayPal, prélèvement SEPA et carte de crédit ; récapitulatif avec total de 89,95 € dont TVA à 19 %, rappel des conditions générales et du droit de rétractation, bouton « Zahlungspflichtig bestellen » et label de boutique vérifiée.',
      html: `<div class="dep">
  <div class="dep-bar"><i data-icon="arrow-left"></i><p>Kasse</p><span>Schritt 3 von 3</span></div>
  <div class="dep-body">
    <p class="dep-h">Zahlungsart</p>
    <div class="dep-opt on"><span class="dep-radio"></span><div class="dep-grow"><b>Rechnung</b><small>Bequem in 30 Tagen zahlen</small></div></div>
    <div class="dep-opt"><span class="dep-radio"></span><div class="dep-grow"><b>PayPal</b></div></div>
    <div class="dep-opt"><span class="dep-radio"></span><div class="dep-grow"><b>Lastschrift (SEPA)</b><small>Abbuchung vom Girokonto</small></div></div>
    <div class="dep-opt"><span class="dep-radio"></span><div class="dep-grow"><b>Kreditkarte</b><small>Visa, Mastercard, American Express</small></div></div>
    <div class="dep-sum">
      <p><span>Wanderrucksack Alpin 28&nbsp;L</span><span>89,95&nbsp;€</span></p>
      <p><span>Versand</span><span>kostenlos</span></p>
      <p class="dep-total"><span>Gesamtsumme</span><span>89,95&nbsp;€</span></p>
      <p class="dep-vat"><span>inkl. 19&nbsp;% MwSt.</span><span>14,36&nbsp;€</span></p>
    </div>
    <p class="dep-legal">Es gelten unsere <u>AGB</u>. Informationen zu Ihrem <u>Widerrufsrecht</u> und zum <u>Datenschutz</u>.</p>
    <span class="mk-btn mk-btn--block dep-cta">Zahlungspflichtig bestellen</span>
    <p class="dep-seal"><i data-icon="shield-check"></i>Geprüfter Shop · Käuferschutz bis 2.500&nbsp;€</p>
  </div>
</div>`,
      css: `.dep { font-size: 13px; color: #1d2230; }
.dep-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid #eceef2; }
.dep-bar p { flex: 1; font-size: 15px; font-weight: 700; }
.dep-bar span { font-size: 12px; color: #5a6172; }
.dep-body { display: flex; flex-direction: column; gap: 8px; padding: 14px; }
.dep-h { font-size: 14px; font-weight: 700; }
.dep-opt { display: flex; align-items: flex-start; gap: 10px; padding: 9px 12px; border: 1px solid #dfe3ea; border-radius: 8px; }
.dep-opt.on { border-color: #1d6b3a; background: #f3f8f4; box-shadow: inset 0 0 0 1px #1d6b3a; }
${RADIO('dep', '#1d6b3a')}
.dep-grow { flex: 1; display: flex; flex-direction: column; }
.dep-grow small { font-size: 12px; color: #5a6172; }
.dep-sum { display: flex; flex-direction: column; gap: 3px; margin-top: 4px; padding-top: 10px; border-top: 1px solid #eceef2; }
.dep-sum p { display: flex; justify-content: space-between; gap: 8px; font-variant-numeric: tabular-nums; }
.dep-total { font-size: 15px; font-weight: 700; }
.dep-vat { font-size: 12px; color: #5a6172; }
.dep-legal { font-size: 11px; color: #5a6172; }
.dep-legal u { color: #1d2230; }
.dep-cta { min-height: 46px; background: #1d6b3a; font-size: 15px; }
.dep-seal { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; font-weight: 600; color: #3b4252; --ico: 16px; }
.dep-seal svg { color: #b45309; }`,
    },
    visualB: {
      frame: 'phone',
      lang: 'pt-BR',
      alt: 'Paiement brésilien : Pix sélectionné à R$ 473,10 avec 5 % de remise et approbation immédiate, carte de crédit en 10 mensualités de R$ 49,80 sans intérêts, boleto avec délai de compensation ; champ CPF expliqué (nécessaire à la facture électronique), explication du QR code Pix « copia e cola », bouton « Finalizar compra » et lien vers WhatsApp.',
      html: `<div class="brp">
  <div class="brp-bar"><i data-icon="arrow-left"></i><p>Pagamento</p><i data-icon="lock"></i></div>
  <div class="brp-body">
    <p class="brp-h">Como você prefere pagar?</p>
    <div class="brp-opt on"><span class="brp-radio"></span><div class="brp-grow"><b>Pix</b><small>Aprovação na hora</small><span class="brp-tag">5% de desconto</span></div><span class="brp-amt">R$&nbsp;473,10</span></div>
    <div class="brp-opt"><span class="brp-radio"></span><div class="brp-grow"><b>Cartão de crédito</b><small>em até 10x de R$&nbsp;49,80 sem juros</small></div><span class="brp-amt">R$&nbsp;498,00</span></div>
    <div class="brp-opt"><span class="brp-radio"></span><div class="brp-grow"><b>Boleto bancário</b><small>Aprovação em até 3 dias úteis</small></div><span class="brp-amt">R$&nbsp;498,00</span></div>
    <div class="mk-field"><span class="mk-label">CPF</span><span class="mk-input">123.456.789-09</span><span class="mk-help">Necessário para emitir a nota fiscal</span></div>
    <p class="brp-pix"><i data-icon="qr-code"></i><span>Ao finalizar, você recebe o QR Code e o código <b>Pix Copia e Cola</b>. Ele vale por 30 minutos.</span></p>
    <span class="mk-btn mk-btn--block brp-cta">Finalizar compra</span>
    <p class="brp-zap"><i data-icon="message-circle"></i>Dúvidas? Chame no WhatsApp</p>
  </div>
</div>`,
      css: `.brp { font-size: 13px; color: #1d2230; }
.brp-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #c2410c; color: #fff; --ico: 18px; }
.brp-bar p { flex: 1; font-size: 15px; font-weight: 700; }
.brp-body { display: flex; flex-direction: column; gap: 8px; padding: 14px; }
.brp-h { font-size: 15px; font-weight: 700; }
.brp-opt { display: flex; align-items: flex-start; gap: 10px; padding: 9px 12px; border: 1px solid #dfe3ea; border-radius: 10px; }
.brp-opt.on { border-color: #c2410c; background: #fff7f2; box-shadow: inset 0 0 0 1px #c2410c; }
${RADIO('brp', '#c2410c')}
.brp-grow { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.brp-grow small { font-size: 12px; color: #5a6172; }
.brp-tag { align-self: flex-start; margin-top: 3px; padding: 0 6px; border-radius: 4px; background: #e3f4f1; color: #0f6b61; font-size: 12px; font-weight: 700; }
.brp-amt { font-weight: 700; white-space: nowrap; font-variant-numeric: tabular-nums; }
.brp-pix { display: flex; align-items: flex-start; gap: 8px; padding: 8px 10px; border-radius: 8px; background: #f1f8f6; font-size: 12px; --ico: 18px; }
.brp-pix svg { color: #0f7a6c; }
.brp-cta { min-height: 46px; background: #c2410c; font-size: 15px; }
.brp-zap { display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 600; color: #075e54; }
.brp-zap svg { color: #128c7e; }`,
    },
    notes: `Le même dernier écran de commande, deux cultures du paiement.

- **Moyens de paiement.** Allemagne : facture (on paie après réception), PayPal, prélèvement SEPA, puis la carte. Brésil : Pix (instantané, souvent remisé), carte en mensualités sans intérêts, boleto pour qui n’a pas de carte.
- **Un prix par moyen de paiement.** Au Brésil, le prix Pix (R$\u00a0473,10, soit 5\u00a0% de remise) et la mensualité (10x de R$\u00a049,80) s’affichent à côté de chaque option. En Allemagne, un seul total, avec la TVA incluse détaillée (« inkl. 19\u00a0% MwSt. »).
- **Bouton final.** En Allemagne, le libellé est imposé par la loi (§ 312j BGB) : « Zahlungspflichtig bestellen ». Au Brésil, « Finalizar compra » suffit.
- **Données demandées.** Le Brésil demande le CPF, nécessaire à la facture électronique (nota fiscal), et dit pourquoi. L’Allemagne ne demande pas d’identifiant fiscal au consommateur.
- **Confiance.** Label de boutique vérifiée et liens vers les AGB, le droit de rétractation et la protection des données en Allemagne ; accès direct à WhatsApp au Brésil.

### Comment adapter

- Choisis les moyens de paiement par marché, dans l’ordre d’usage local, plutôt qu’une liste mondiale identique partout.
- Brésil : affiche le prix Pix et la mensualité dès la fiche produit, et annonce le délai de compensation du boleto.
- Allemagne : facture et SEPA en bonne place, mentions légales près du bouton, libellé imposé.`,
  },

  /* ------------------------------------------------------------------ 5. Address form, LTR / RTL */
  {
    id: 'adresse-rtl',
    title: 'Formulaire d’adresse, de gauche à droite et de droite à gauche',
    a: 'fr',
    b: 'arab',
    visualA: {
      frame: 'phone',
      lang: 'fr',
      alt: 'Formulaire d’adresse de livraison français : flèche de retour à gauche, étapes Panier (validé), Livraison, Paiement de gauche à droite avec une barre de progression remplie depuis la gauche, champs prénom, nom, adresse, complément, code postal, ville et téléphone, case cochée à gauche de son texte et bouton « Continuer » avec une flèche vers la droite.',
      html: `<div class="fra">
  <div class="fra-bar"><i data-icon="arrow-left"></i><p>Adresse de livraison</p></div>
  <ol class="fra-steps"><li class="done"><i data-icon="check"></i>Panier</li><li class="on">Livraison</li><li>Paiement</li></ol>
  <div class="fra-prog"><span></span></div>
  <div class="fra-body">
    <div class="fra-two"><div class="mk-field"><span class="mk-label">Prénom</span><span class="mk-input">Marie</span></div><div class="mk-field"><span class="mk-label">Nom</span><span class="mk-input">Dupont</span></div></div>
    <div class="mk-field"><span class="mk-label">Adresse</span><span class="mk-input">12 rue des Lilas</span></div>
    <div class="mk-field"><span class="mk-label">Complément <small>(facultatif)</small></span><span class="mk-input">Bât. B, 3<sup>e</sup> étage</span></div>
    <div class="fra-cp"><div class="mk-field"><span class="mk-label">Code postal</span><span class="mk-input">75011</span></div><div class="mk-field"><span class="mk-label">Ville</span><span class="mk-input">Paris</span></div></div>
    <div class="mk-field"><span class="mk-label">Téléphone</span><span class="mk-input fra-tel"><i data-icon="phone"></i>+33 6 12 34 56 78</span></div>
    <p class="fra-check"><span class="fra-box"><i data-icon="check"></i></span>Adresse de facturation identique</p>
    <span class="mk-btn mk-btn--block fra-cta">Continuer<i data-icon="arrow-right"></i></span>
  </div>
</div>`,
      css: `${ADDRESS_CSS('fra')}
.fra-cp { display: grid; grid-template-columns: 96px 1fr; gap: 8px; }
sup { font-size: 0.7em; line-height: 0; }`,
    },
    visualB: {
      frame: 'phone',
      dir: 'rtl',
      lang: 'ar',
      alt: 'Le même formulaire en arabe, de droite à gauche : flèche de retour à droite, étapes panier (validé), livraison, paiement de droite à gauche avec une barre de progression remplie depuis la droite, champs nom complet, numéro de mobile saisi de gauche à droite, ville, quartier, rue, numéro de bâtiment, code postal et numéro complémentaire, case cochée à droite de son texte et bouton « Continuer » avec une flèche vers la gauche.',
      html: `<div class="ara">
  <div class="ara-bar"><i data-icon="arrow-right"></i><p>عنوان التوصيل</p></div>
  <ol class="ara-steps"><li class="done"><i data-icon="check"></i>السلة</li><li class="on">التوصيل</li><li>الدفع</li></ol>
  <div class="ara-prog"><span></span></div>
  <div class="ara-body">
    <div class="mk-field"><span class="mk-label">الاسم الكامل</span><span class="mk-input">فاطمة الزهراني</span></div>
    <div class="mk-field"><span class="mk-label">رقم الجوال</span><span class="mk-input ara-tel"><i data-icon="phone"></i><bdi dir="ltr">+966 50 123 4567</bdi></span></div>
    <div class="ara-two"><div class="mk-field"><span class="mk-label">المدينة</span><span class="mk-input">الرياض</span></div><div class="mk-field"><span class="mk-label">الحي</span><span class="mk-input">العليا</span></div></div>
    <div class="mk-field"><span class="mk-label">الشارع</span><span class="mk-input">طريق الملك فهد</span></div>
    <div class="ara-three"><div class="mk-field"><span class="mk-label">رقم المبنى</span><span class="mk-input">8228</span></div><div class="mk-field"><span class="mk-label">الرمز البريدي</span><span class="mk-input">12214</span></div><div class="mk-field"><span class="mk-label">الرقم الإضافي</span><span class="mk-input">2121</span></div></div>
    <p class="ara-check"><span class="ara-box"><i data-icon="check"></i></span>حفظ هذا العنوان للطلبات القادمة</p>
    <span class="mk-btn mk-btn--block ara-cta">متابعة<i data-icon="arrow-left"></i></span>
  </div>
</div>`,
      css: `${ADDRESS_CSS('ara')}
.ara { font-family: ${AR}; font-size: 14px; line-height: 1.6; }
.ara .mk-label { font-size: 13px; }
.ara-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.ara-three .mk-label { white-space: nowrap; }`,
    },
    notes: `Le même formulaire d’adresse en français et en arabe : en écriture de droite à gauche, la mise en page se retourne, mais pas tout.

- **Ce qui se miroite.** Le titre et la flèche « retour » (vers la droite en arabe), les étapes qui se lisent de droite à gauche, la barre de progression qui se remplit depuis la droite, l’alignement des libellés, la case à cocher placée à droite de son texte, la flèche du bouton « متابعة » (Continuer) qui pointe vers la gauche.
- **Ce qui ne se miroite pas.** Le numéro de téléphone (+966 50 123 4567) se lit toujours de gauche à droite ; numéro de bâtiment et code postal gardent leurs chiffres dans l’ordre ; la coche reste une coche et l’icône de téléphone n’est pas inversée.
- **Structure locale.** L’adresse saoudienne suit l’adresse nationale : numéro de bâtiment, rue, quartier, ville, code postal à 5\u00a0chiffres et numéro complémentaire ; le nom complet tient dans un seul champ.
- **Typographie.** Police arabe dédiée, corps et interlignage un peu plus généreux, aucun espacement entre les lettres.

### Comment adapter

- Mets \`dir="rtl"\` et \`lang="ar"\` sur la racine, et écris le CSS en propriétés logiques (\`margin-inline-start\`, \`padding-inline\`, \`inset-inline-end\`) : le miroir devient automatique.
- Isole les contenus latins et les numéros (\`dir="ltr"\` sur le champ, \`bdi\`) pour éviter l’affichage « 4567 123 50 966+ ».
- Fixe une règle pour les icônes (directionnelles : oui ; objets, coches, médias, horloges : non) et applique-la partout au lieu de décider à l’œil.
- Choisis un système de chiffres (ici les chiffres occidentaux, courants dans le Golfe) et tiens-t’y.`,
  },

  /* ------------------------------------------------------------------ 6. Cookie banner */
  {
    id: 'cookies',
    title: 'Bandeau cookies',
    a: 'fr',
    b: 'us',
    visualA: {
      frame: 'browser',
      lang: 'fr',
      alt: 'Site d’information français avec un bandeau cookies en bas de page : titre, texte qui annonce 12 partenaires et la possibilité de changer d’avis, lien « Continuer sans accepter » en haut à droite, deux boutons identiques « Tout refuser » et « Tout accepter », et un lien « Personnaliser mes choix ».',
      html: `<div class="frc">
  <div class="frc-page">
    <p class="frc-logo">La Gazette des Lilas</p>
    <p class="frc-nav"><span>Actualités</span><span>Culture</span><span>Sport</span><span>Météo</span></p>
    <div class="mk-img frc-hero"></div>
    <div class="mk-line"></div>
    <div class="mk-line mk-line--m"></div>
  </div>
  <div class="frc-banner">
    <div class="frc-row"><p class="frc-h">Vos choix sur les cookies</p><span class="frc-skip">Continuer sans accepter<i data-icon="arrow-right"></i></span></div>
    <p class="frc-text">Avec votre accord, nous et nos 12&nbsp;partenaires utilisons des cookies pour mesurer l’audience et personnaliser les publicités. Vous pouvez changer d’avis à tout moment depuis la page «&#8239;Gérer mes cookies&#8239;».</p>
    <div class="frc-btns"><span>Tout refuser</span><span>Tout accepter</span></div>
    <p class="frc-custom">Personnaliser mes choix</p>
  </div>
</div>`,
      css: `.frc { font-size: 13px; }
.frc-page { display: flex; flex-direction: column; gap: 10px; padding: 14px 18px 18px; }
.frc-logo { font-family: Georgia, "Times New Roman", serif; font-size: 20px; font-weight: 700; }
.frc-nav { display: flex; gap: 14px; padding-bottom: 8px; border-bottom: 1px solid #e3e6ec; font-weight: 600; color: #3b4252; }
.frc-hero { aspect-ratio: 16 / 6; }
.frc-banner { display: flex; flex-direction: column; gap: 10px; padding: 16px 18px; border-top: 1px solid #d5d9e2; background: #fff; box-shadow: 0 -8px 24px rgb(15 20 35 / 0.12); }
.frc-row { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 6px 12px; }
.frc-h { font-size: 16px; font-weight: 700; }
.frc-skip { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #1f4fd8; text-decoration: underline; --ico: 14px; }
.frc-text { max-width: 62ch; color: #3b4252; }
.frc-btns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.frc-btns span { display: grid; place-items: center; min-height: 42px; border-radius: 8px; background: #1d2230; color: #fff; font-weight: 700; }
.frc-custom { text-align: center; font-weight: 600; color: #1f4fd8; text-decoration: underline; }`,
    },
    visualB: {
      frame: 'browser',
      lang: 'en',
      alt: 'Site d’information américain : pied de page avec le lien « Do Not Sell or Share My Personal Information », et une barre cookies sombre en bas qui informe que poursuivre la navigation vaut accord, avec un bouton « Accept » et un bouton secondaire « Manage preferences ».',
      html: `<div class="usc">
  <div class="usc-page">
    <p class="usc-logo">The Daily Ledger</p>
    <p class="usc-nav"><span>News</span><span>Business</span><span>Sports</span><span>Weather</span></p>
    <div class="mk-img usc-hero"></div>
    <div class="mk-line"></div>
    <div class="mk-line mk-line--m"></div>
    <p class="usc-foot"><span>Privacy Policy</span><span>Terms of Use</span><span>Do Not Sell or Share My Personal Information</span></p>
  </div>
  <div class="usc-banner">
    <p>We use cookies to improve your experience, analyze traffic and personalize ads. By continuing to browse, you agree to our use of cookies. <u>Cookie Policy</u></p>
    <div class="usc-btns"><span class="usc-accept">Accept</span><span class="usc-manage">Manage preferences</span></div>
  </div>
</div>`,
      css: `.usc { font-size: 13px; }
.usc-page { display: flex; flex-direction: column; gap: 10px; padding: 14px 18px 14px; }
.usc-logo { font-family: Georgia, "Times New Roman", serif; font-size: 20px; font-weight: 700; }
.usc-nav { display: flex; gap: 14px; padding-bottom: 8px; border-bottom: 1px solid #e3e6ec; font-weight: 600; color: #3b4252; }
.usc-hero { aspect-ratio: 16 / 6; }
.usc-foot { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 4px; padding-top: 10px; border-top: 1px solid #e3e6ec; font-size: 12px; color: #1f4fd8; text-decoration: underline; }
.usc-banner { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 14px 18px; background: #1d2230; color: #fff; }
.usc-banner p { flex: 1 1 260px; font-size: 12.5px; line-height: 1.5; }
.usc-btns { display: flex; gap: 8px; }
.usc-btns span { display: grid; place-items: center; min-height: 38px; padding: 0 14px; border-radius: 8px; font-weight: 700; white-space: nowrap; }
.usc-accept { background: #fff; color: #1d2230; }
.usc-manage { border: 1px solid rgb(255 255 255 / 0.6); color: #fff; }`,
    },
    notes: `Deux bandeaux de cookies pour deux régimes juridiques.

- **France : consentement préalable.** Le RGPD et les règles de la CNIL imposent de demander l’accord avant de déposer des traceurs non essentiels, et refuser doit être aussi simple qu’accepter : « Tout refuser » et « Tout accepter » ont ici la même taille, la même couleur et le même niveau ; « Continuer sans accepter » est une alternative admise.
- **États-Unis : droit d’opposition.** La plupart des lois d’État fonctionnent en opt-out : le bandeau informe et renvoie aux préférences. La formule « By continuing to browse, you agree » serait irrégulière en Europe. La Californie exige en plus un lien « Do Not Sell or Share My Personal Information » et le respect du signal Global Privacy Control.
- **Sanctions.** La CNIL a infligé 150\u00a0M€ à Google et 60\u00a0M€ à Facebook fin 2021 parce que refuser demandait plusieurs clics contre un seul pour accepter.

### Comment adapter

- Détermine le régime selon la localisation (Union européenne, États américains dotés d’une loi, reste du monde) et affiche le bandeau correspondant : jamais la version américaine en Europe.
- En Europe : boutons équivalents, rien de précoché, choix modifiable à tout moment depuis le pied de page.
- Aux États-Unis : lien d’opposition visible en pied de page, prise en compte de GPC, explications claires sur la vente et le partage des données.`,
  },

  /* ------------------------------------------------------------------ 7. Stock app */
  {
    id: 'bourse',
    title: 'Appli boursière : couleurs de hausse et de baisse',
    a: 'us',
    b: 'cn',
    visualA: {
      frame: 'phone',
      lang: 'en',
      alt: 'Appli boursière américaine : S&P 500 en hausse avec un graphique vert et la variation +0,52 % précédée d’un triangle vers le haut ; liste d’indices où les hausses sont en pastilles vertes et la baisse du Nasdaq en pastille rouge.',
      html: `<div class="uss">
  <div class="uss-top"><p>Markets</p><i data-icon="search"></i></div>
  <div class="uss-tabs"><span class="on">Indices</span><span>Watchlist</span><span>News</span></div>
  <div class="uss-main">
    <p class="uss-name">S&amp;P 500</p>
    <p class="uss-val">5,812.34</p>
    <p class="uss-chg">▲ +30.12 (+0.52%) <span>Today</span></p>
    <svg class="uss-spark" viewBox="0 0 280 70" aria-hidden="true"><line x1="0" y1="46" x2="280" y2="46"/><polyline points="0,50 18,48 36,52 54,46 72,47 90,41 108,44 126,38 144,40 162,33 180,36 198,29 216,31 234,24 252,26 270,19 280,18"/></svg>
    <p class="uss-range"><span class="on">1D</span><span>1W</span><span>1M</span><span>1Y</span><span>5Y</span></p>
  </div>
  <ul class="uss-list">
    <li><span class="uss-n"><b>Dow Jones</b><small>DJI</small></span><span class="uss-v">42,318.07</span><span class="uss-c up">▲ 0.84%</span></li>
    <li><span class="uss-n"><b>Nasdaq</b><small>IXIC</small></span><span class="uss-v">18,402.11</span><span class="uss-c down">▼ 0.31%</span></li>
    <li><span class="uss-n"><b>Russell 2000</b><small>RUT</small></span><span class="uss-v">2,231.55</span><span class="uss-c up">▲ 1.12%</span></li>
  </ul>
  <div class="mk-tabbar"><span class="on"><i data-icon="chart-column"></i>Markets</span><span><i data-icon="list"></i>Watchlist</span><span><i data-icon="wallet"></i>Portfolio</span><span><i data-icon="user"></i>Account</span></div>
</div>`,
      css: `.uss { font-size: 13px; color: #1d2230; }
.uss-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px 4px; }
.uss-top p { font-size: 20px; font-weight: 800; }
.uss-tabs { display: flex; gap: 18px; padding: 4px 16px 0; border-bottom: 1px solid #eceef2; color: #5a6172; font-weight: 600; }
.uss-tabs span { padding-bottom: 8px; }
.uss-tabs .on { color: #1d2230; box-shadow: inset 0 -2px 0 #1d2230; }
.uss-main { padding: 12px 16px 6px; }
.uss-name { font-weight: 600; color: #5a6172; }
.uss-val { font-size: 28px; font-weight: 800; font-variant-numeric: tabular-nums; }
.uss-chg { color: #0a7d3c; font-weight: 700; }
.uss-chg span { font-weight: 400; color: #5a6172; }
.uss-spark { width: 100%; height: 70px; margin-top: 6px; }
.uss-spark line { stroke: #c7cedb; stroke-dasharray: 3 4; }
.uss-spark polyline { fill: none; stroke: #0a7d3c; stroke-width: 2.5; stroke-linejoin: round; }
.uss-range { display: flex; justify-content: space-between; margin-top: 4px; font-size: 12px; font-weight: 600; color: #5a6172; }
.uss-range span { padding: 2px 8px; border-radius: 6px; }
.uss-range .on { background: #e9f5ee; color: #0a7d3c; }
.uss-list { margin: 6px 0 0; padding: 0 16px 8px; list-style: none; }
.uss-list li { display: grid; grid-template-columns: 1fr auto 76px; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid #eceef2; }
.uss-n { display: flex; flex-direction: column; line-height: 1.3; }
.uss-n small { font-size: 11px; color: #5a6172; }
.uss-v { font-variant-numeric: tabular-nums; }
.uss-c { padding: 4px 0; border-radius: 6px; color: #fff; font-weight: 700; text-align: center; font-variant-numeric: tabular-nums; }
.uss-c.up { background: #0a7d3c; }
.uss-c.down { background: #c62828; }`,
    },
    visualB: {
      frame: 'phone',
      lang: 'zh-CN',
      alt: 'Appli boursière chinoise : indice de Shanghai en hausse, affiché en rouge avec un graphique rouge ; liste d’indices avec codes, où les hausses sont en pastilles rouges et les baisses en pastilles vertes.',
      html: `<div class="cns">
  <div class="cns-top"><p>行情</p><i data-icon="search"></i></div>
  <div class="cns-tabs"><span class="on">沪深</span><span>港股</span><span>美股</span><span>自选</span></div>
  <div class="cns-main">
    <p class="cns-name">上证指数 <small>000001</small></p>
    <p class="cns-val">3,412.56</p>
    <p class="cns-chg">+23.05　+0.68%</p>
    <svg class="cns-spark" viewBox="0 0 280 70" aria-hidden="true"><line x1="0" y1="46" x2="280" y2="46"/><polyline points="0,47 18,49 36,45 54,47 72,42 90,44 108,39 126,41 144,36 162,38 180,32 198,34 216,29 234,30 252,25 270,22 280,21"/></svg>
    <p class="cns-range"><span class="on">分时</span><span>日K</span><span>周K</span><span>月K</span></p>
  </div>
  <p class="cns-head"><span>名称</span><span>最新价</span><span>涨跌幅</span></p>
  <ul class="cns-list">
    <li><span class="cns-n"><b>深证成指</b><small>399001</small></span><span class="cns-v up">11,023.40</span><span class="cns-c up">+1.02%</span></li>
    <li><span class="cns-n"><b>创业板指</b><small>399006</small></span><span class="cns-v down">2,268.13</span><span class="cns-c down">-0.45%</span></li>
    <li><span class="cns-n"><b>沪深300</b><small>000300</small></span><span class="cns-v up">4,015.77</span><span class="cns-c up">+0.51%</span></li>
    <li><span class="cns-n"><b>恒生指数</b><small>HSI</small></span><span class="cns-v down">25,610.32</span><span class="cns-c down">-0.83%</span></li>
  </ul>
  <div class="mk-tabbar"><span><i data-icon="house"></i>首页</span><span class="on"><i data-icon="chart-column"></i>行情</span><span><i data-icon="list"></i>自选</span><span><i data-icon="wallet"></i>交易</span><span><i data-icon="user"></i>我的</span></div>
</div>`,
      css: `.cns { font-family: ${ZH}; font-size: 13px; line-height: 1.5; color: #1f2329; }
.cns-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px 4px; }
.cns-top p { font-size: 20px; font-weight: 800; }
.cns-tabs { display: flex; gap: 18px; padding: 4px 16px 0; border-bottom: 1px solid #eceef2; color: #5a6172; font-size: 14px; font-weight: 600; }
.cns-tabs span { padding-bottom: 8px; }
.cns-tabs .on { color: #1f2329; box-shadow: inset 0 -2px 0 #d0021b; }
.cns-main { padding: 12px 16px 6px; }
.cns-name { font-weight: 600; }
.cns-name small { font-size: 12px; font-weight: 400; color: #5a6172; }
.cns-val { color: #d0021b; font-size: 28px; font-weight: 800; font-variant-numeric: tabular-nums; }
.cns-chg { color: #d0021b; font-weight: 700; font-variant-numeric: tabular-nums; }
.cns-spark { width: 100%; height: 70px; margin-top: 6px; }
.cns-spark line { stroke: #c7cedb; stroke-dasharray: 3 4; }
.cns-spark polyline { fill: none; stroke: #d0021b; stroke-width: 2.5; stroke-linejoin: round; }
.cns-range { display: flex; justify-content: space-between; margin-top: 4px; font-size: 12px; font-weight: 600; color: #5a6172; }
.cns-range span { padding: 2px 8px; border-radius: 6px; }
.cns-range .on { background: #fdecec; color: #d0021b; }
.cns-head { display: grid; grid-template-columns: 1fr auto 76px; gap: 10px; padding: 8px 16px 4px; font-size: 12px; color: #5a6172; }
.cns-head span:nth-child(2) { text-align: end; }
.cns-head span:last-child { text-align: center; }
.cns-list { margin: 0; padding: 0 16px 8px; list-style: none; }
.cns-list li { display: grid; grid-template-columns: 1fr auto 76px; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid #eceef2; }
.cns-n { display: flex; flex-direction: column; line-height: 1.3; }
.cns-n small { font-size: 11px; color: #5a6172; }
.cns-v { font-weight: 600; font-variant-numeric: tabular-nums; text-align: end; }
.cns-v.up { color: #d0021b; }
.cns-v.down { color: #0a7d3c; }
.cns-c { padding: 4px 0; border-radius: 4px; color: #fff; font-weight: 700; text-align: center; font-variant-numeric: tabular-nums; }
.cns-c.up { background: #d0021b; }
.cns-c.down { background: #0a7d3c; }
.cns .mk-tabbar > .on { color: #d0021b; }`,
    },
    notes: `La même liste d’indices, et des couleurs qui disent l’inverse.

- **Couleurs inversées.** Aux États-Unis comme en Europe, la hausse est verte et la baisse rouge. En Chine continentale, la hausse est **rouge** — la couleur de la prospérité — et la baisse **verte** ; même logique à Taïwan, et en Corée la baisse est bleue.
- **Conséquence.** Un écran rouge rassure un investisseur chinois et alarme un investisseur américain : une appli internationale qui garde une seule convention trompe une partie de ses utilisateurs.
- **Codes et vocabulaire.** La liste chinoise affiche les codes des indices (000001, 399001) et des en-têtes « 名称 / 最新价 / 涨跌幅 » (nom, dernier cours, variation) ; le graphique se choisit en « 分时 » (séance) ou « 日K » (chandeliers journaliers).
- **Signes.** La version chinoise double la couleur par un signe (+ ou −), la version américaine par des triangles (▲ ▼) : l’information ne repose pas sur la couleur seule.

### Comment adapter

- Fais de la couleur de hausse et de baisse un réglage lié à la région, modifiable par l’utilisateur, plutôt qu’une constante du thème.
- Ne t’appuie jamais sur la couleur seule : signes, flèches et libellés restent lisibles pour les personnes daltoniennes et d’un marché à l’autre.
- Vérifie les contrastes : les rouges et verts vifs des applis financières passent souvent sous 4,5:1 sur fond blanc.`,
  },

  /* ------------------------------------------------------------------ 8. Banking app */
  {
    id: 'banque',
    title: 'Accueil d’une appli bancaire',
    a: 'kr',
    b: 'nordics',
    visualA: {
      frame: 'phone',
      lang: 'ko',
      alt: 'Accueil d’une appli bancaire coréenne dense : cloche avec badge, bannière d’événement, carte du compte courant avec solde de 1 284 500 wons et boutons virement et historique, menu rapide de huit raccourcis, trois avantages du jour (présence quotidienne, change, épargne) et une notification de paiement par carte, barre d’onglets avec pastille.',
      html: `<div class="krb">
  <div class="krb-top"><p class="krb-logo">푸른뱅크</p><span class="krb-icons"><span class="krb-bell"><i data-icon="bell"></i><span>3</span></span><i data-icon="menu"></i></span></div>
  <div class="krb-banner"><span class="krb-tag">이벤트</span><p><b>첫 해외송금 수수료 0원</b><small>11월 30일까지 · 1/5</small></p><i data-icon="chevron-right"></i></div>
  <div class="krb-acct">
    <p class="krb-acct-name">입출금통장<small>123-456-789012</small></p>
    <p class="krb-bal">1,284,500원</p>
    <div class="krb-acct-btns"><span>이체</span><span>내역</span></div>
  </div>
  <div class="krb-menu">
    <span><i data-icon="send"></i>이체</span><span><i data-icon="list"></i>계좌조회</span><span><i data-icon="credit-card"></i>카드</span><span><i data-icon="landmark"></i>대출</span>
    <span><i data-icon="globe"></i>환전</span><span><i data-icon="sprout"></i>적금</span><span><i data-icon="receipt"></i>공과금</span><span><i data-icon="layout-grid"></i>전체메뉴</span>
  </div>
  <div class="krb-sec">
    <p class="krb-h">오늘의 혜택</p>
    <div class="krb-cards"><p><b>출석체크</b><small>매일 10P 적립</small></p><p><b>환전 우대</b><small>수수료 최대 90%</small></p><p><b>정기적금</b><small>최고 연 4.5%</small></p></div>
  </div>
  <p class="krb-noti"><i data-icon="bell"></i><span>카드 결제 12,900원 · 편의점</span><small>방금</small></p>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>홈</span><span class="krb-dot"><i data-icon="gift"></i>혜택</span><span><i data-icon="package"></i>상품</span><span><i data-icon="wallet"></i>자산</span><span><i data-icon="menu"></i>전체</span></div>
</div>`,
      css: `.krb { font-family: ${KO}; font-size: 13px; line-height: 1.5; color: #191f28; background: #f2f4f6; word-break: keep-all; }
.krb-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #fff; }
.krb-logo { color: #0d7a5f; font-size: 17px; font-weight: 800; }
.krb-icons { display: flex; align-items: center; gap: 14px; --ico: 20px; }
.krb-bell { position: relative; display: flex; }
.krb-bell span { position: absolute; top: -5px; inset-inline-end: -7px; min-width: 15px; padding: 0 3px; border-radius: 8px; background: #d0021b; color: #fff; font-size: 11px; line-height: 15px; text-align: center; }
.krb-banner { display: flex; align-items: center; gap: 10px; margin: 8px 10px 0; padding: 10px 12px; border-radius: 12px; background: #e6f4ef; --ico: 16px; }
.krb-tag { flex: none; padding: 0 6px; border-radius: 4px; background: #d0021b; color: #fff; font-size: 11px; font-weight: 700; line-height: 18px; }
.krb-banner p { flex: 1; display: flex; flex-direction: column; line-height: 1.35; }
.krb-banner b { font-size: 14px; }
.krb-banner small { font-size: 11px; color: #4e5968; }
.krb-acct { margin: 8px 10px 0; padding: 14px; border-radius: 14px; background: #0d7a5f; color: #fff; }
.krb-acct-name small { margin-inline-start: 6px; font-size: 11px; opacity: 0.9; }
.krb-bal { margin: 2px 0 10px; font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; }
.krb-acct-btns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.krb-acct-btns span { display: grid; place-items: center; min-height: 34px; border-radius: 8px; background: rgb(255 255 255 / 0.2); font-weight: 700; }
.krb-menu { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px 4px; margin: 8px 10px 0; padding: 12px 4px; border-radius: 14px; background: #fff; }
.krb-menu span { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 12px; --ico: 20px; }
.krb-menu svg { color: #0d7a5f; }
.krb-sec { margin: 8px 10px 0; padding: 10px 12px; border-radius: 14px; background: #fff; }
.krb-h { margin-bottom: 6px; font-size: 14px; font-weight: 700; }
.krb-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.krb-cards p { display: flex; flex-direction: column; padding: 8px; border-radius: 10px; background: #f2f4f6; line-height: 1.35; }
.krb-cards b { font-size: 12.5px; }
.krb-cards small { font-size: 11px; color: #4e5968; }
.krb-noti { display: flex; align-items: center; gap: 8px; margin: 8px 10px 10px; padding: 8px 12px; border-radius: 12px; background: #fff; font-size: 12px; --ico: 15px; }
.krb-noti span { flex: 1; }
.krb-noti small { color: #4e5968; }
.krb .mk-tabbar { font-size: 11px; }
.krb .mk-tabbar > .on { color: #0d7a5f; }
.krb-dot { position: relative; }
.krb-dot::after { content: ""; position: absolute; top: 0; inset-inline-start: 58%; width: 7px; height: 7px; border-radius: 50%; background: #d0021b; }`,
    },
    visualB: {
      frame: 'phone',
      lang: 'sv',
      alt: 'Accueil d’une appli bancaire suédoise épurée : « Hej Anna », solde du compte salaire de 24 350 couronnes, trois actions (Swish, payer, virer), deux prélèvements à venir (loyer, électricité) et le compte d’épargne, beaucoup d’espace et quatre onglets.',
      html: `<div class="seb">
  <div class="seb-top"><p>Hej Anna</p><span class="mk-avatar"></span></div>
  <div class="seb-acct"><p class="seb-name">Lönekonto</p><p class="seb-bal">24&nbsp;350,00&nbsp;kr</p><p class="seb-avail">Tillgängligt belopp</p></div>
  <div class="seb-actions"><span><i data-icon="send"></i>Swisha</span><span><i data-icon="receipt"></i>Betala</span><span><i data-icon="refresh-cw"></i>Överför</span></div>
  <div class="seb-sec">
    <p class="seb-h">Kommande</p>
    <p class="seb-row"><span><b>Hyra</b><small>28 okt</small></span><span>−9&nbsp;450,00&nbsp;kr</span></p>
    <p class="seb-row"><span><b>Elräkning</b><small>30 okt</small></span><span>−612,00&nbsp;kr</span></p>
  </div>
  <div class="seb-sec">
    <p class="seb-h">Sparande</p>
    <p class="seb-row"><span><b>Sparkonto</b><small>Ränta 2,25&nbsp;%</small></span><span>112&nbsp;800,00&nbsp;kr</span></p>
  </div>
  <div class="mk-tabbar"><span class="on"><i data-icon="house"></i>Översikt</span><span><i data-icon="send"></i>Betala</span><span><i data-icon="sprout"></i>Spara</span><span><i data-icon="menu"></i>Mer</span></div>
</div>`,
      css: `.seb { font-size: 14px; color: #1b1f24; }
.seb-top { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px 4px; }
.seb-top p { font-size: 20px; font-weight: 700; }
.seb-acct { padding: 14px 18px 4px; }
.seb-name { font-size: 13px; color: #5a6172; }
.seb-bal { font-size: 30px; font-weight: 700; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.seb-avail { font-size: 12px; color: #5a6172; }
.seb-actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 16px 18px; }
.seb-actions span { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 0; border-radius: 12px; background: #eef2f0; font-size: 13px; font-weight: 600; --ico: 20px; }
.seb-actions svg { color: #1f5c4a; }
.seb-sec { padding: 6px 18px 12px; }
.seb-h { margin-bottom: 2px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #5a6172; }
.seb-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eceef2; font-variant-numeric: tabular-nums; }
.seb-row span:first-child { display: flex; flex-direction: column; line-height: 1.35; }
.seb-row small { font-size: 12px; color: #5a6172; }
.seb .mk-tabbar > .on { color: #1f5c4a; }`,
    },
    notes: `Deux accueils d’appli bancaire : l’un met tout à portée de main, l’autre ne garde que l’essentiel.

- **Densité.** L’accueil coréen superpose bannière d’événement, compte, menu rapide de huit raccourcis, avantages du jour et dernière notification. L’accueil suédois montre un solde, trois actions et les prochains prélèvements.
- **Pourquoi.** Les portails coréens (Naver, Kakao) ont habitué à tout trouver sur un écran et aux mécaniques d’engagement — points de présence quotidienne (출석체크), événements, avantages. En Suède, faible distance hiérarchique, confiance et sobriété : on va droit au solde et aux paiements.
- **Ton.** Un « Hej Anna » familier et personnel côté suédois ; côté coréen, l’écran parle surtout en offres et en avantages (« 오늘의 혜택 », les avantages du jour).
- **Formats.** 1,284,500원 d’un côté ; 24\u00a0350,00\u00a0kr et des dates courtes (« 28 okt ») de l’autre.
- **Contre-exemple.** La densité n’est pas une loi : l’appli coréenne Toss s’est imposée avec une interface épurée, une action par écran.

### Comment adapter

- Pour la Corée, garde le menu rapide et les raccourcis attendus, mais hiérarchise : une zone compte nette, des avantages regroupés, des badges seulement quand ils sont utiles.
- Pour les pays nordiques, résiste à la vente croisée sur l’accueil : solde, Swish, paiements, puis le reste.
- Teste les deux versions avec des utilisateurs locaux plutôt que de supposer.`,
  },
];
