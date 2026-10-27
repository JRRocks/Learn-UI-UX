import type { ModuleContent, SourceRef } from '../../engine/types';

/** French punctuation inside mock markup: thin no-break space before ? ! ; » and after «, no-break space before :. */
const fr = (html: string) =>
  html.replace(/ ([?!;»])/g, ' $1').replace(/« /g, '« ').replace(/ :/g, ' :');

const IMP_ADAPT_NATIVE: SourceRef = {
  label: 'impeccable — adapt.native.md (adapter une appli native)',
  url: 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/adapt.native.md',
};
const IMP_AUDIT_NATIVE: SourceRef = {
  label: 'impeccable — audit.native.md',
  url: 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/audit.native.md',
};
const HIG_TABS: SourceRef = { label: 'Apple HIG — Tab bars', url: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars' };
const HIG_TYPE: SourceRef = { label: 'Apple HIG — Typography (tailles par défaut et minimales)', url: 'https://developer.apple.com/design/human-interface-guidelines/typography' };
const HIG_COLOR: SourceRef = { label: 'Apple HIG — Color (couleurs dynamiques du système)', url: 'https://developer.apple.com/design/human-interface-guidelines/color' };
const HIG_SHEETS: SourceRef = { label: 'Apple HIG — Sheets', url: 'https://developer.apple.com/design/human-interface-guidelines/sheets' };
const HIG_MATERIALS: SourceRef = { label: 'Apple HIG — Materials (Liquid Glass)', url: 'https://developer.apple.com/design/human-interface-guidelines/materials' };
const ANDROID_NAV: SourceRef = { label: 'Android Developers — Navigation bar', url: 'https://developer.android.com/develop/ui/compose/components/navigation-bar' };
const ANDROID_ADAPTIVE: SourceRef = {
  label: 'Android Developers — Build adaptive navigation',
  url: 'https://developer.android.com/develop/ui/compose/layouts/adaptive/build-adaptive-navigation',
};
const ANDROID_SIZES: SourceRef = {
  label: 'Android Developers — Classes de taille de fenêtre',
  url: 'https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes',
};
const ANDROID_EDGE: SourceRef = { label: 'Android Developers — Affichage bord à bord', url: 'https://developer.android.com/develop/ui/views/layout/edge-to-edge' };
const ANDROID_BACK: SourceRef = {
  label: 'Android Developers — Retour prédictif',
  url: 'https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture',
};
const ANDROID_TARGETS: SourceRef = { label: 'Google — Accessibilité Android : taille des cibles tactiles', url: 'https://support.google.com/accessibility/android/answer/7101858' };
const M3_TYPE: SourceRef = { label: 'Material Design 3 — Type scale tokens', url: 'https://m3.material.io/styles/typography/type-scale-tokens' };
const M3_SNACKBAR: SourceRef = { label: 'Material Design 3 — Snackbar', url: 'https://m3.material.io/components/snackbar/overview' };
const M3_FAB: SourceRef = { label: 'Material Design 3 — Floating action button', url: 'https://m3.material.io/components/floating-action-button/overview' };

/* ---------- Shared mock pieces ---------- */

const IOS_CSS = `
.io-nb { display: flex; align-items: center; justify-content: space-between; height: 44px; padding: 0 6px; color: #1f4fd8; }
.io-btn { min-width: 44px; height: 44px; display: grid; place-items: center; }
.io-lt { font-size: 28px; line-height: 1.15; font-weight: 700; letter-spacing: -0.01em; padding: 0 16px 10px; }
.io-tabs { display: flex; justify-content: space-around; margin: 8px 10px 10px; padding: 6px 4px; border-radius: 26px; background: #f2f3f6; border: 1px solid #e3e6ec; font-size: 10px; color: #5a6172; }
.io-tabs span { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 44px; }
.io-tabs .on { color: #1f4fd8; }
.io-tabs .act { color: #1f4fd8; }
.io-tabs .act .io-plus { width: 30px; height: 30px; margin-top: -4px; border-radius: 50%; display: grid; place-items: center; background: #1f4fd8; color: #fff; }
.io-card { margin: 0 16px 8px; padding: 12px 14px; border-radius: 12px; background: #f4f6f9; }
.io-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 16px; border-bottom: 1px solid #eceef2; }
`;

const bankBody = fr(`<div class="io-nb"><span></span><span class="io-btn"><i data-icon="user"></i></span></div>
<p class="io-lt">Comptes</p>
<div class="io-card"><p class="mk-small mk-muted">Compte courant</p><p class="mk-price" style="font-size:20px">2 340,18 €</p></div>
<div class="io-card"><p class="mk-small mk-muted">Livret A</p><p class="mk-price" style="font-size:20px">8 120,00 €</p></div>
<div class="io-row"><span>Boulangerie Marceau</span><span class="mk-price">−4,60 €</span></div>
<div class="io-row"><span>Salaire octobre</span><span class="mk-price">+2 180,00 €</span></div>`);

const iosTabs = (items: string) => `<div class="io-tabs">${items}</div>`;

const MUSIC_CSS = `${IOS_CSS}
.mu-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid #eceef2; }
.mu-row .mk-ico { color: #1f4fd8; }
.mu-row .mk-grow + .mk-ico { color: #8b92a1; }
`;

const musicBody = (action: string) =>
  fr(`<div class="io-nb"><span></span>${action}</div>
<p class="io-lt">Bibliothèque</p>
<div class="mu-row"><i data-icon="list"></i><span class="mk-grow">Playlists</span><i data-icon="chevron-right"></i></div>
<div class="mu-row"><i data-icon="user"></i><span class="mk-grow">Artistes</span><i data-icon="chevron-right"></i></div>
<div class="mu-row"><i data-icon="layout-grid"></i><span class="mk-grow">Albums</span><i data-icon="chevron-right"></i></div>
<div class="mu-row"><i data-icon="music"></i><span class="mk-grow">Titres</span><i data-icon="chevron-right"></i></div>`);

const M3_CSS = `
.m3 { position: relative; background: #f8f9ff; color: #1a1c1e; }
.m3-top { display: flex; align-items: center; gap: 4px; height: 56px; padding: 0 4px; }
.m3-top .m3-title { flex: 1; font-size: 20px; line-height: 1.2; font-weight: 500; padding-inline-start: 4px; }
.m3-ib { width: 48px; height: 48px; display: grid; place-items: center; color: #42474e; flex: none; }
.m3-ib .kebab { transform: rotate(90deg); }
.m3-row { display: flex; align-items: center; gap: 14px; min-height: 56px; padding: 6px 16px; }
.m3-row p { line-height: 1.3; }
.m3-fab { position: absolute; right: 16px; bottom: 28px; width: 56px; height: 56px; border-radius: 16px; display: grid; place-items: center; background: #d3e4ff; color: #001d36; box-shadow: 0 3px 6px rgb(0 0 0 / 0.18); }
.m3-handle { height: 22px; display: grid; place-items: center; }
.m3-handle::after { content: ""; width: 108px; height: 4px; border-radius: 2px; background: #1a1c1e; opacity: 0.85; }
.m3-snack { display: flex; align-items: center; gap: 12px; margin: 0 12px; padding: 4px 8px 4px 16px; min-height: 48px; border-radius: 4px; background: #2f3033; color: #f1f0f4; box-shadow: 0 3px 8px rgb(0 0 0 / 0.2); }
.m3-snack b { margin-inline-start: auto; color: #a0cafd; font-weight: 600; padding: 10px 8px; }
.m3-sw { position: relative; width: 52px; height: 32px; border-radius: 16px; background: #00639b; flex: none; }
.m3-sw::after { content: ""; position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; border-radius: 50%; background: #fff; }
.m3-sw.off { background: #e1e2e8; box-shadow: inset 0 0 0 2px #72777f; }
.m3-sw.off::after { top: 8px; right: auto; left: 8px; width: 16px; height: 16px; background: #72777f; }
.ios-sw { position: relative; width: 50px; height: 30px; border-radius: 15px; background: #34c759; flex: none; }
.ios-sw::after { content: ""; position: absolute; top: 2px; right: 2px; width: 26px; height: 26px; border-radius: 50%; background: #fff; box-shadow: 0 2px 4px rgb(0 0 0 / 0.2); }
.ios-sw.off { background: #e5e5ea; }
.ios-sw.off::after { right: auto; left: 2px; }
.ios-back { display: flex; align-items: center; gap: 2px; color: #00639b; font-size: 15px; padding: 0 6px; height: 44px; }
.ios-head { position: relative; display: flex; align-items: center; height: 44px; }
.ios-head .ios-title { position: absolute; left: 0; right: 0; text-align: center; font-weight: 600; pointer-events: none; }
`;

const notifRows = (sw: (on: boolean) => string) =>
  fr(`<div class="m3-row"><div class="mk-grow"><p>Messages</p><p class="mk-small" style="color:#42474e">Nouveaux messages privés</p></div>${sw(true)}</div>
<div class="m3-row"><div class="mk-grow"><p>Mentions</p><p class="mk-small" style="color:#42474e">Quand quelqu’un te cite</p></div>${sw(true)}</div>
<div class="m3-row"><div class="mk-grow"><p>Rappels de rendez-vous</p><p class="mk-small" style="color:#42474e">La veille, à 18 h</p></div>${sw(true)}</div>
<div class="m3-row"><div class="mk-grow"><p>Promotions</p><p class="mk-small" style="color:#42474e">Offres des partenaires</p></div>${sw(false)}</div>`);

const TABLET_CSS = `
.tb-frame { width: 440px; margin: 0 auto; border: 8px solid #1a1d24; border-radius: 18px; overflow: hidden; background: #f8f9ff; color: #1a1c1e; font-size: 12px; }
.tz { container-type: inline-size; }
@container (max-width: 439px) { .tz > * { zoom: 0.9; } }
@container (max-width: 395px) { .tz > * { zoom: 0.8; } }
@container (max-width: 351px) { .tz > * { zoom: 0.72; } }
@container (max-width: 316px) { .tz > * { zoom: 0.63; } }
@container (max-width: 277px) { .tz > * { zoom: 0.56; } }

.tb-screen { display: flex; height: 236px; }
.tb-col { display: flex; flex-direction: column; min-width: 0; }
.tb-list { flex: 1; overflow: hidden; }
.tb-mail { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-bottom: 1px solid #e3e6ec; white-space: nowrap; }
.tb-mail .mk-grow { overflow: hidden; text-overflow: ellipsis; }
.tb-av { width: 22px; height: 22px; border-radius: 50%; flex: none; }
.tb-bar { display: flex; justify-content: space-around; padding: 6px 0 8px; border-top: 1px solid #e3e6ec; font-size: 10px; color: #42474e; }
.tb-bar span, .tb-rail span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.tb-bar .on, .tb-rail .on { color: #00639b; font-weight: 600; }
.tb-rail { width: 64px; flex: none; display: flex; flex-direction: column; align-items: center; gap: 14px; padding-top: 14px; font-size: 10px; color: #42474e; border-inline-end: 1px solid #e3e6ec; }
.tb-detail { flex: 1; padding: 14px 16px; border-inline-start: 1px solid #e3e6ec; background: #fff; }
.tb-h { font-size: 15px; font-weight: 600; padding: 10px 12px 6px; }
.tb-mc { display: flex; align-items: flex-start; gap: 8px; padding: 7px 10px; border-bottom: 1px solid #e3e6ec; }
.tb-mc .tb-av { margin-top: 2px; }
.tb-sub, .tb-mc .mk-strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tb-mc .mk-row { min-width: 0; }
`;

const mail = (bg: string, from: string, subject: string, time: string, on = false) =>
  `<div class="tb-mail"${on ? ' style="background:#e8f0fb"' : ''}><span class="tb-av" style="background:${bg}"></span><span class="mk-strong">${from}</span><span class="mk-grow mk-muted">${subject}</span><span class="mk-muted">${time}</span></div>`;

const mailCompact = (bg: string, from: string, subject: string, time: string, on = false) =>
  `<div class="tb-mc"${on ? ' style="background:#e8f0fb"' : ''}><span class="tb-av" style="background:${bg}"></span><div class="mk-grow"><p class="mk-row mk-between" style="--gap:6px"><span class="mk-strong">${from}</span><span class="mk-muted">${time}</span></p><p class="mk-muted tb-sub">${subject}</p></div></div>`;

const MAILS_COMPACT =
  mailCompact('#f6d7c3', 'Inès Moreau', 'Plans du salon, version finale', '10:42', true) +
  mailCompact('#cfe3d4', 'Atelier Morel', 'Devis n° 2026-118', '09:15') +
  mailCompact('#d6dcf5', 'Paul Girard', 'Photos du week-end', 'Hier') +
  mailCompact('#efd9ef', 'Banque Lumen', 'Votre relevé d’octobre', 'Hier');

const MAILS =
  mail('#f6d7c3', 'Inès Moreau', 'Plans du salon, version finale', '10:42', true) +
  mail('#cfe3d4', 'Atelier Morel', 'Devis n° 2026-118', '09:15') +
  mail('#d6dcf5', 'Paul Girard', 'Photos du week-end', 'Hier') +
  mail('#efd9ef', 'Banque Lumen', 'Votre relevé d’octobre', 'Hier') +
  mail('#f3e6b8', 'Jeanne Roux', 'Réunion de copropriété', 'Lun.');

const IPAD_CSS = `
.ip-frame { width: 440px; margin: 0 auto; border: 8px solid #1a1d24; border-radius: 18px; overflow: hidden; background: #fff; color: #1d2230; font-size: 12px; }
.tz { container-type: inline-size; }
@container (max-width: 439px) { .tz > * { zoom: 0.9; } }
@container (max-width: 395px) { .tz > * { zoom: 0.8; } }
@container (max-width: 351px) { .tz > * { zoom: 0.72; } }
@container (max-width: 316px) { .tz > * { zoom: 0.63; } }
@container (max-width: 277px) { .tz > * { zoom: 0.56; } }

.ip-screen { display: flex; height: 250px; }
.ip-side { width: 120px; flex: none; padding: 12px 8px; background: #f2f2f7; display: flex; flex-direction: column; gap: 2px; }
.ip-side span { display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-radius: 8px; }
.ip-side .on { background: #1f4fd8; color: #fff; }
.ip-list { width: 170px; flex: none; border-inline-end: 1px solid #e3e6ec; overflow: hidden; }
.ip-item { padding: 8px 12px; border-bottom: 1px solid #eceef2; }
.ip-item.on { background: #e8eefc; }
.ip-item p { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ip-detail { flex: 1; padding: 14px 16px; min-width: 0; }
.ip-lt { font-size: 22px; font-weight: 700; padding: 10px 16px 6px; }
.ip-row { display: flex; gap: 10px; padding: 8px 16px; border-bottom: 1px solid #eceef2; white-space: nowrap; }
.ip-row .mk-grow { overflow: hidden; text-overflow: ellipsis; }
.ip-tabs { display: flex; justify-content: space-around; padding: 6px 0 8px; border-top: 1px solid #e3e6ec; font-size: 10px; color: #5a6172; margin-top: auto; }
.ip-tabs span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.ip-tabs .on { color: #1f4fd8; }
`;

const KEYBOARD = `<div class="kb">${['', '', ''].map(() => `<div class="kb-row">${'<span></span>'.repeat(10)}</div>`).join('')}<div class="kb-row kb-last"><span></span><span class="kb-space"></span><span></span></div></div>`;

const CHAT_CSS = `${M3_CSS}
.ch-msgs { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; }
.ch-b { max-width: 78%; padding: 7px 11px; border-radius: 16px; background: #e1e2e8; line-height: 1.35; }
.ch-b.me { align-self: flex-end; background: #00639b; color: #fff; }
.ch-input { display: flex; align-items: center; gap: 8px; padding: 6px 8px 6px 12px; background: #f8f9ff; }
.ch-field { flex: 1; min-height: 40px; display: flex; align-items: center; padding: 0 14px; border-radius: 20px; background: #e7e8ee; }
.ch-send { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: #00639b; color: #fff; flex: none; }
.ch-stack { position: relative; }
.kb { display: grid; gap: 7px; padding: 8px 4px 10px; background: #dfe2e7; }
.kb-row { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; }
.kb-row span { height: 30px; border-radius: 5px; background: #fff; box-shadow: 0 1px 0 rgb(0 0 0 / 0.15); }
.kb-last { grid-template-columns: 1.4fr 5fr 1.4fr; }
.kb-over { position: absolute; left: 0; right: 0; bottom: 0; }
`;

const chatMessages = fr(`<div class="ch-msgs">
  <p class="ch-b">Tu es où ? Le film commence à 20 h 30.</p>
  <p class="ch-b me">Je sors du métro.</p>
  <p class="ch-b">On t’attend devant l’entrée.</p>
</div>`);

const GROUPED_CSS = `${IOS_CSS}
.gp { background: #f2f2f7; padding-bottom: 12px; }
.gp-h { padding: 14px 32px 6px; font-size: 13px; color: #6d6d72; }
.gp-g { margin: 0 16px; border-radius: 12px; background: #fff; overflow: hidden; }
.gp-r { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 14px; border-bottom: 1px solid #e5e5ea; }
.gp-r:last-child { border-bottom: 0; }
.gp-r .mk-ico { color: #8b92a1; }
.cs { padding: 4px 14px 12px; background: #eef0f6; }
.cs-card { display: flex; align-items: center; gap: 12px; margin-top: 10px; padding: 14px; border-radius: 16px; background: #fff; box-shadow: 0 6px 16px rgb(31 42 68 / 0.12); }
.cs-tile { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: #e8eefc; color: #1f4fd8; flex: none; }
.cs-tog { width: 46px; height: 24px; border-radius: 6px; background: #1f4fd8; position: relative; flex: none; }
.cs-tog::after { content: ""; position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; border-radius: 4px; background: #fff; }
.cs-tog.off { background: #c9ced8; }
.cs-tog.off::after { right: auto; left: 3px; }
`;

const WEBPORT_CSS = `${IOS_CSS}
.wp-top { display: flex; align-items: center; gap: 8px; padding: 0 12px 0 4px; height: 48px; border-bottom: 1px solid #e3e6ec; }
.wp-top .mk-strong { flex: 1; }
.wp-hint { margin: 2px 16px 8px; font-size: 12px; color: #5a6172; }
.wp-links { font-size: 11px; padding: 0 16px 8px; }
.wp-links a { text-decoration: none; }
.wp-g { margin: 0 16px 10px; border-radius: 12px; background: #f2f2f7; overflow: hidden; }
.wp-r { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 14px; border-bottom: 1px solid #e5e5ea; }
.wp-r:last-child { border-bottom: 0; }
`;

const platforms: ModuleContent = {
  id: 'platforms',
  title: 'iOS et Android',
  category: 'corriger',
  summary:
    'Concevoir des applis natives qui respectent chaque plateforme : navigation, gestes, cibles, typographie, couleurs et composants d’iOS et d’Android, et la façon de traduire l’un vers l’autre.',
  minutes: 12,
  commands: ['adapt', 'audit'],
  sources: ['imp:ios', 'imp:android', IMP_ADAPT_NATIVE, 'hig', 'material3', HIG_TYPE, HIG_MATERIALS, ANDROID_NAV, ANDROID_ADAPTIVE, ANDROID_SIZES, ANDROID_BACK, ANDROID_TARGETS],
  sections: [
    {
      id: 'natif',
      title: 'Le test de l’appli « portée depuis le web »',
      body: `Sur une application native, les conventions de la plateforme gouvernent **la structure, la navigation et l’interaction**, quel que soit le type d’écran. La marque s’exprime dans la couche que la plateforme laisse libre : la couleur d’accent, la typographie d’affichage, le mouvement, le contenu. Sur Android, Material 3 prévoit ce thème de marque : rôles de couleur, échelle typographique, formes, mouvement.

Impeccable propose un test simple : **un utilisateur aguerri ferait-il confiance à cette appli, ou buterait-il sur des contrôles hors norme ?**

- Sur iPhone, le signe qui trahit, c’est l’appli **« portée depuis le web »** : barre de navigation réinventée, geste de retour maison, boutons en forme de page web, actions cachées derrière un survol qui n’existe pas au doigt.
- Sur Android, c’est **l’appli iOS déguisée** : navigation copiée de l’iPhone, flèche de retour qui ignore le Retour du système, interrupteurs et boîtes de dialogue à la mode iOS.

Pars des composants de la plateforme, et ne t’en écarte que pour une raison dont l’utilisateur te remercierait.

> Attention aux faux amis : sur iOS, la *navigation bar* est la barre du haut (titre, bouton retour) ; sur Android, la *navigation bar* est la barre des destinations au bas de l’écran, à ne pas confondre avec la barre de navigation du système.`,
    },
    {
      id: 'ios-structure',
      title: 'iOS : structure, navigation et cibles',
      body: `- **Zones sûres** : la mise en page reste dans les marges sûres ; aucune commande sous l’encoche, la Dynamic Island, l’indicateur d’accueil ou dans les coins arrondis.
- **Navigation système** : une **barre d’onglets** pour 2 à 5 sections de premier niveau (des sections, jamais des actions), une **pile de navigation** pour descendre dans la hiérarchie, une **feuille** (*sheet*) pour une tâche autonome. Pas de navigation globale maison, pas de métaphores mélangées.
- **Des onglets stables** : la barre reste visible quand on change de section ; un onglet ne se désactive pas quand son contenu manque, la section explique plutôt pourquoi elle est vide. Au-delà de cinq onglets sur iPhone, le système replie le reste dans un onglet « Plus », que les gens remarquent mal.
- **Le retour par le bord reste vivant** : le balayage depuis le bord gauche est un réflexe ; ne le désactive jamais et ne le recouvre pas.
- **Grands titres** sur les écrans de premier niveau, qui se réduisent en titre simple au défilement ; les écrans de détail gardent un titre simple.
- **Cibles de 44 × 44 pt** au minimum, avec de l’espace entre deux cibles voisines.`,
      examples: [
        {
          title: 'Des onglets pour des sections, pas pour des actions',
          bad: {
            alt: 'iPhone, écran « Bibliothèque » d’une appli de musique ; la barre d’onglets mélange des sections (Écouter, Rechercher, Profil) et des actions (Ajouter, Partager).',
            frame: 'phone',
            html:
              musicBody('') +
              iosTabs(
                '<span><i data-icon="play"></i>Écouter</span><span><i data-icon="search"></i>Rechercher</span><span><i data-icon="plus"></i>Ajouter</span><span><i data-icon="share-2"></i>Partager</span><span class="on"><i data-icon="user"></i>Profil</span>',
              ),
            css: MUSIC_CSS,
          },
          badNote: '« Ajouter » et « Partager » sont des actions : on ne sait plus quel onglet mène où.',
          good: {
            alt: 'iPhone, même écran ; la barre d’onglets ne contient que des sections (Écouter, Explorer, Radio, Bibliothèque, Rechercher) et le bouton d’ajout est dans la barre du haut.',
            frame: 'phone',
            html:
              musicBody('<span class="io-btn"><i data-icon="plus"></i></span>') +
              iosTabs(
                '<span><i data-icon="play"></i>Écouter</span><span><i data-icon="layout-grid"></i>Explorer</span><span><i data-icon="volume-2"></i>Radio</span><span class="on"><i data-icon="music"></i>Bibliothèque</span><span><i data-icon="search"></i>Rechercher</span>',
              ),
            css: MUSIC_CSS,
          },
          goodNote: 'Cinq sections dans les onglets ; l’action « Ajouter » vit dans la barre de navigation.',
        },
      ],
    },
    {
      id: 'ios-style',
      title: 'iOS : texte, couleurs, composants et mouvement',
      body: `- **Dynamic Type** : utilise les styles de texte du système (Large Title, Title, Headline, Body, Callout, Subhead, Footnote, Caption) pour que le texte suive la taille de lecture choisie par la personne. Pas de tailles en points figées.
- **San Francisco porte l’interface** : corps, libellés et contrôles en SF Pro ; une police de marque peut apparaître dans les moments d’affichage.
- **Plancher de 11 pt, corps de 17 pt** : c’est la taille du style Body au réglage par défaut (Large Title fait 34 pt, Caption 2 fait 11 pt).
- **Couleurs sémantiques** du système (\`label\`, \`secondaryLabel\`, \`systemBackground\`, \`separator\`, la teinte d’accent) : elles s’adaptent au mode sombre et au contraste renforcé, là où un hexadécimal codé en dur casse. Le **mode sombre** se conçoit et se teste comme une apparence à part entière.
- **Une seule teinte** pour les éléments interactifs ; la décoration n’est pas son rôle.
- **Matériaux système** pour le flou et la transparence sous les barres et les feuilles, pas de verre dépoli fait main. Depuis iOS 26, barres et contrôles flottent sur un matériau translucide, Liquid Glass, que les composants standard reçoivent automatiquement.
- **Contrôles natifs** : interrupteur, contrôle segmenté, stepper, sélecteurs, feuilles d’actions, alertes, menus contextuels, actions de balayage. Les réinventer « pour le style » est la faute native la plus courante.
- **SF Symbols** pour l’iconographie : alignés sur le texte, adaptés à Dynamic Type, déclinés en graisses ; pas de jeu d’icônes web mélangé.
- **Listes groupées** (*inset grouped*) pour tout ce qui ressemble à des réglages, plutôt que des piles de cartes maison.
- **Modalité choisie** : une feuille pour une sous-tâche ciblée qu’on peut fermer, un écran plein pour l’immersion ; « Annuler » et « OK » ou « Ajouter » clairs, et le balayage pour fermer, sauf si des données seraient perdues.
- **Transitions système** : un écran glisse en entrant dans la pile, une feuille monte, la fermeture inverse l’entrée. Avec **Réduire les animations**, un fondu enchaîné remplace la parallaxe et les grands glissements.`,
    },
    {
      id: 'android-structure',
      title: 'Android : navigation, Retour et bord à bord',
      body: `- **Une navigation Material adaptée à la largeur** : une **barre de navigation** au bas de l’écran pour 3 à 5 destinations quand la fenêtre est compacte (moins de 600 dp, un téléphone en portrait) ; un **rail** ou un **tiroir de navigation** quand elle est plus large, notamment en largeur étendue (840 dp et plus, une tablette en paysage). Ne livre jamais telle quelle la barre d’un téléphone sur une tablette.
- **Le Retour système fonctionne toujours** : geste ou bouton, il ramène en arrière ; ne piège jamais la personne et ne détourne pas le geste. Le **Retour prédictif** montre un aperçu de la destination pendant le geste ; intercepter le Retour sans nécessité empêche cette animation.
- **Bord à bord, avec les marges du système** (*insets*) : barre d’état, barre de navigation du système, découpe de l’écran et clavier. Depuis Android 15, une appli qui cible le SDK 35 s’affiche bord à bord par défaut : sans ces marges, son contenu passe sous les barres ou sous le clavier.
- **Une barre d’application supérieure** pour le contexte de l’écran (titre, retour, actions), et un **bouton d’action flottant** (FAB) quand l’écran a une seule action principale.
- **Cibles de 48 × 48 dp**, avec au moins 8 dp entre deux cibles. L’icône peut rester à 24 dp : la zone touchable l’entoure.`,
      examples: [
        {
          title: 'Restructurer pour la tablette, pas étirer',
          bad: {
            alt: 'Tablette Android en paysage : la liste d’e-mails du téléphone s’étire sur toute la largeur et la barre de navigation à quatre destinations s’étale au bas de l’écran.',
            html: fr(`<div class="tz"><div class="tb-frame"><div class="tb-screen"><div class="tb-col" style="flex:1">
  <p class="tb-h">Boîte de réception</p>
  <div class="tb-list">${MAILS}</div>
  <div class="tb-bar"><span class="on"><i data-icon="mail" style="--ico:16px"></i>Courrier</span><span><i data-icon="message-circle" style="--ico:16px"></i>Discussions</span><span><i data-icon="users" style="--ico:16px"></i>Contacts</span><span><i data-icon="calendar" style="--ico:16px"></i>Agenda</span></div>
</div></div></div></div>`),
            css: TABLET_CSS,
          },
          badNote: 'L’interface du téléphone, étirée : des lignes interminables et une barre perdue au bas de l’écran.',
          good: {
            alt: 'Même tablette : un rail de navigation vertical à gauche, la liste d’e-mails au centre et l’e-mail sélectionné ouvert à droite.',
            html: fr(`<div class="tz"><div class="tb-frame"><div class="tb-screen">
  <div class="tb-rail"><span class="on"><i data-icon="mail" style="--ico:16px"></i>Courrier</span><span><i data-icon="message-circle" style="--ico:16px"></i>Discussions</span><span><i data-icon="users" style="--ico:16px"></i>Contacts</span><span><i data-icon="calendar" style="--ico:16px"></i>Agenda</span></div>
  <div class="tb-col" style="flex:1.2"><p class="tb-h">Réception</p><div class="tb-list">${MAILS_COMPACT}</div></div>
  <div class="tb-detail mk-stack" style="--gap:6px"><p class="mk-strong" style="font-size:14px">Plans du salon, version finale</p><p class="mk-small mk-muted">Inès Moreau · 10:42</p><p>Voici la dernière version, avec la bibliothèque déplacée contre le mur nord. Dis-moi si la largeur du passage te va.</p></div>
</div></div></div>`),
            css: TABLET_CSS,
          },
          goodNote: 'Un rail de navigation et une vue maître-détail : la largeur sert à montrer plus.',
        },
      ],
    },
    {
      id: 'android-style',
      title: 'Android : Material 3, du texte au mouvement',
      body: `- **L’échelle typographique Material** : cinq rôles (Display, Headline, Title, Body, Label), chacun en trois tailles (Large, Medium, Small). On associe chaque texte à un rôle au lieu de choisir des tailles écran par écran. Body Large fait 16 sp, Title Large 22 sp, Display Large 57 sp.
- **Roboto** est la police du système ; une police de marque passe par l’échelle typographique, sans sacrifier la lisibilité des libellés et des contrôles.
- **Des unités \`sp\`, jamais des px fixes** : le texte suit le réglage de taille de police du système.
- **Les rôles de couleur** (\`primary\`, \`onPrimary\`, \`primaryContainer\`, \`surface\`, \`outline\`, \`error\`…) se déclinent seuls en thème clair, sombre et contrasté, là où un hexadécimal codé en dur casse. Le **thème sombre** se conçoit, il ne s’obtient pas par inversion.
- **Dynamic Color** (Material You) : depuis Android 12, la palette peut dériver du fond d’écran de la personne ; prévois une palette statique de repli.
- **L’élévation tonale** : une surface plus élevée se distingue par sa teinte (et une ombre là où elle aide), pas par des ombres arbitraires.
- **Les composants Material** : boutons (plein, tonal, contour, texte), FAB, interrupteurs, chips, snackbars, feuilles inférieures (*bottom sheets*), dialogues, barre, rail et tiroir de navigation. On ne porte pas les contrôles iOS et on n’invente pas d’équivalents.
- **Un seul FAB**, pour l’action principale ; jamais de FAB empilés, ni de FAB pour une tâche secondaire.
- **Les snackbars** pour un retour passager, avec une action comme « Annuler » si elle est utile ; un **dialogue** seulement pour une décision qui doit interrompre.
- **Les motifs de mouvement Material** : transformation de conteneur, axe partagé, fondu traversant, avec les courbes et durées standard. Le réglage **Supprimer les animations** est respecté : fondu enchaîné ou coupe franche.`,
    },
    {
      id: 'traduire',
      title: 'Traduire les idiomes, pas les transplanter',
      body: `Passer d’iOS à Android, ou l’inverse, c’est **traduire les idiomes** de l’une dans le vocabulaire de l’autre :

- barre d’onglets → barre de navigation, rail ou tiroir ;
- balayage depuis le bord et chevron de retour → Retour prédictif, par geste ou bouton ;
- interrupteur, contrôle segmenté, sélecteurs système → interrupteur Material, chips ou boutons segmentés, sélecteurs Material ;
- feuille d’actions → feuille inférieure ou dialogue Material ;
- SF Symbols, SF Pro, Dynamic Type → Material Symbols, Roboto, unités sp ;
- couleurs sémantiques et matériaux → rôles de couleur et élévation tonale ;
- transitions système → transformation de conteneur, axe partagé, fondu traversant.

La couche expressive de la marque (intention de la palette, accent typographique, personnalité du mouvement) passe par le système de thème de la plateforme cible.

**Du téléphone à la tablette**, on restructure au lieu d’étirer : classes de taille (iOS) ou de fenêtre (Android), vue maître-détail, barre latérale ou rail. Le multitâche peut donner une fenêtre de largeur téléphone sur une tablette : une mise en page pilotée par ces classes gère ce cas sans effort. **Du web au natif**, on reconstruit avec les conventions de la plateforme au lieu de réagencer la page : navigation native, contrôles natifs, gestes tactiles au lieu du survol, Dynamic Type ou sp au lieu des px.

**Vérifie** sur simulateur ou émulateur pour l’étendue, puis sur de vrais appareils pour la vérité (gestes, fluidité, posture), en mode sombre et avec une grande taille de texte.`,
      examples: [
        {
          title: 'Des contrôles Material sur Android',
          bad: {
            alt: 'Écran Android de réglages des notifications aux allures d’iPhone : bouton retour textuel « ‹ Réglages », titre centré et interrupteurs verts arrondis à la manière d’iOS.',
            frame: 'phone',
            html: fr(`<div class="m3">
  <div class="ios-head"><span class="ios-back"><i data-icon="chevron-left"></i>Réglages</span><span class="ios-title">Notifications</span></div>
  ${notifRows((on) => `<span class="ios-sw${on ? '' : ' off'}"></span>`)}
  <div class="m3-handle"></div>
</div>`),
            css: M3_CSS,
          },
          badNote: 'Un écran d’iPhone transplanté : bouton retour textuel, titre centré, interrupteurs iOS.',
          good: {
            alt: 'Même écran Android en Material 3 : barre d’application avec flèche de retour et titre aligné au début, interrupteurs Material.',
            frame: 'phone',
            html: fr(`<div class="m3">
  <div class="m3-top"><span class="m3-ib"><i data-icon="arrow-left"></i></span><span class="m3-title">Notifications</span></div>
  ${notifRows((on) => `<span class="m3-sw${on ? '' : ' off'}"></span>`)}
  <div class="m3-handle"></div>
</div>`),
            css: M3_CSS,
          },
          goodNote: 'Barre d’application supérieure, interrupteurs Material, Retour système : l’idiome d’Android.',
        },
      ],
    },
  ],
  rules: [
    { id: 'tabs', front: 'Barre d’onglets iOS : combien d’onglets, et pour quoi faire ?', back: '2 à 5 sections de premier niveau, jamais des actions. Une action va dans la barre de navigation ou une barre d’outils.' },
    { id: 'targets', front: 'Taille minimale d’une cible tactile sur iOS et sur Android ?', back: '44 × 44 pt sur iOS ; 48 × 48 dp sur Android, avec au moins 8 dp entre deux cibles.' },
    { id: 'ios-type', front: 'Taille du corps de texte et plancher sur iOS ?', back: 'Body fait 17 pt au réglage par défaut ; rien sous 11 pt. Et des styles Dynamic Type plutôt que des tailles figées.' },
    { id: 'semantic', front: 'Pourquoi des couleurs sémantiques plutôt que des hexadécimaux ?', back: '`label`, `systemBackground` ou les rôles Material s’adaptent au mode sombre et au contraste renforcé ; un hexadécimal codé en dur casse là.' },
    { id: 'ios-back', front: 'Le balayage depuis le bord gauche, sur iOS ?', back: 'C’est le geste de retour : on ne le désactive jamais et on ne le recouvre pas.' },
    { id: 'android-back', front: 'Le Retour système, sur Android ?', back: 'Il fonctionne toujours, par geste ou bouton : on ne piège jamais la personne et on ne détourne pas le geste prédictif.' },
    { id: 'android-nav', front: 'Quelle navigation Android selon la largeur ?', back: 'Barre de navigation (3 à 5 destinations) en largeur compacte ; rail ou tiroir de navigation sur les fenêtres larges.' },
    { id: 'fab', front: 'Combien de FAB par écran ?', back: 'Un seul, pour l’action principale de l’écran. Jamais de FAB empilés ni pour une tâche secondaire.' },
    { id: 'sp', front: 'Quelle unité pour le texte sur Android ?', back: 'Le `sp`, jamais des px fixes : le texte suit le réglage de taille de police du système.' },
    { id: 'snackbar', front: 'Retour passager après une action sur Android ?', back: 'Une snackbar, avec « Annuler » si utile. Un dialogue seulement pour une décision qui doit interrompre.' },
    { id: 'dynamic-color', front: 'Qu’est-ce que Dynamic Color ?', back: 'Depuis Android 12, une palette dérivée du fond d’écran de la personne. Prévois toujours une palette statique de repli.' },
    { id: 'slop', front: 'Quel est le test de l’appli « portée depuis le web » ?', back: 'Un utilisateur aguerri lui ferait-il confiance, ou buterait-il sur des contrôles hors norme : barres réinventées, gestes maison, boutons « web », survol ?' },
    { id: 'tablet', front: 'Passer du téléphone à la tablette ?', back: 'Restructurer, pas étirer : classes de taille, vue maître-détail, barre latérale ou rail de navigation.' },
    { id: 'motion', front: 'Que faire quand « Réduire les animations » est activé ?', back: 'Remplacer la parallaxe et les grands glissements par un fondu enchaîné (ou une coupe franche sur Android).' },
  ],
  exercises: [
    {
      id: 'platforms-ios-tabbar-choice',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quelle barre d’onglets suit les conventions d’iOS pour cette appli bancaire ?',
      options: [
        {
          id: 'sections',
          visual: {
            alt: 'iPhone, écran « Comptes » ; barre d’onglets avec quatre sections : Comptes, Virements, Cartes, Profil.',
            frame: 'phone',
            html:
              bankBody +
              iosTabs(
                '<span class="on"><i data-icon="wallet"></i>Comptes</span><span><i data-icon="send"></i>Virements</span><span><i data-icon="credit-card"></i>Cartes</span><span><i data-icon="user"></i>Profil</span>',
              ),
            css: IOS_CSS,
          },
          why: 'Quatre sections de premier niveau, toujours visibles : on sait à tout moment où l’on est.',
        },
        {
          id: 'action',
          visual: {
            alt: 'iPhone, même écran ; la barre d’onglets contient Comptes, Cartes, un bouton rond « + Virement » au centre, et Profil.',
            frame: 'phone',
            html:
              bankBody +
              iosTabs(
                '<span class="on"><i data-icon="wallet"></i>Comptes</span><span><i data-icon="credit-card"></i>Cartes</span><span class="act"><span class="io-plus"><i data-icon="plus" style="--ico:16px"></i></span>Virement</span><span><i data-icon="user"></i>Profil</span>',
              ),
            css: IOS_CSS,
          },
          why: 'Le bouton central lance une action, pas une section : un onglet doit mener à un endroit, pas déclencher une tâche.',
        },
        {
          id: 'overflow',
          visual: {
            alt: 'iPhone, même écran ; la barre d’onglets affiche Comptes, Virements, Cartes, Épargne et un cinquième onglet « Plus » qui cache les autres sections.',
            frame: 'phone',
            html:
              bankBody +
              iosTabs(
                '<span class="on"><i data-icon="wallet"></i>Comptes</span><span><i data-icon="send"></i>Virements</span><span><i data-icon="credit-card"></i>Cartes</span><span><i data-icon="landmark"></i>Épargne</span><span><i data-icon="ellipsis"></i>Plus</span>',
              ),
            css: IOS_CSS,
          },
          why: 'Trop de sections : le système range les dernières sous « Plus », où les gens les remarquent mal. Mieux vaut regrouper.',
        },
      ],
      answer: 'sections',
      explanation: `Sur iOS, la **barre d’onglets** sert à **naviguer** entre 2 et 5 sections de premier niveau. Les guides d’Apple le disent sans détour : une barre d’onglets n’offre pas d’actions ; une commande qui agit sur l’écran va dans une barre d’outils ou dans la barre de navigation.

Au-delà de cinq onglets, l’iPhone replie le reste sous un onglet « Plus », qui rend ces sections difficiles à trouver : mieux vaut regrouper. La version recommandée garde quatre sections ; le virement se lance depuis la section Virements.`,
      takeaway: 'Barre d’onglets iOS : 2 à 5 sections de premier niveau, jamais des actions, et pas d’onglet « Plus » fourre-tout.',
      sources: ['imp:ios', HIG_TABS],
    },
    {
      id: 'platforms-idioms-match',
      type: 'match',
      difficulty: 2,
      prompt: 'Associe chaque idiome iOS à son équivalent sur Android.',
      leftTitle: 'iOS',
      rightTitle: 'Android',
      pairs: [
        { id: 'tabs', left: 'Barre d’onglets', right: 'Barre de navigation, rail ou tiroir selon la largeur' },
        { id: 'back', left: 'Balayage depuis le bord, chevron de retour', right: 'Retour prédictif, par geste ou bouton' },
        { id: 'sheet', left: 'Feuille d’actions', right: 'Feuille inférieure ou dialogue Material' },
        { id: 'type', left: 'SF Symbols, SF Pro, Dynamic Type', right: 'Material Symbols, Roboto, unités sp' },
        { id: 'color', left: 'Couleurs sémantiques et matériaux', right: 'Rôles de couleur et élévation tonale' },
        { id: 'target', left: 'Cible de 44 × 44 pt', right: 'Cible de 48 × 48 dp' },
      ],
      explanation: `Porter une appli d’une plateforme à l’autre, c’est **traduire les idiomes, pas les transplanter**. Chaque fonction a son équivalent natif : une navigation entre sections, un geste de retour, une feuille d’options, un système d’icônes et de texte, des couleurs qui s’adaptent seules, une taille de cible minimale.

La marque passe d’une plateforme à l’autre par le système de thème (palette, accent typographique, mouvement), pas en copiant les contrôles de la plateforme d’origine.`,
      takeaway: 'Entre iOS et Android, on traduit chaque idiome dans le vocabulaire de la plateforme cible ; seule la marque voyage telle quelle.',
      sources: [IMP_ADAPT_NATIVE, 'imp:ios', 'imp:android'],
    },
    {
      id: 'platforms-android-hotspot',
      type: 'hotspot',
      difficulty: 2,
      prompt: 'Cette appli Android a été portée depuis l’iPhone. Trouve les deux éléments qui trahissent l’origine iOS.',
      visual: {
        alt: 'Écran Android d’une liste de courses : bouton retour textuel « ‹ Listes » avec un titre centré, menu à trois points, articles à cocher, un interrupteur de partage vert et un bouton flottant d’ajout.',
        frame: 'phone',
        html: fr(`<div class="m3" style="min-height:430px">
  <div class="ios-head"><span class="ios-back" data-hotspot="back"><i data-icon="chevron-left"></i>Listes</span><span class="ios-title">Courses</span><span class="m3-ib" data-hotspot="menu" style="margin-left:auto"><i data-icon="ellipsis" class="kebab"></i></span></div>
  <div data-hotspot="list">
    <div class="m3-row"><span class="mk-check mk-check--on"></span><p class="mk-grow">Lait d’avoine</p></div>
    <div class="m3-row"><span class="mk-check"></span><p class="mk-grow">Pommes Golden × 6</p></div>
    <div class="m3-row"><span class="mk-check"></span><p class="mk-grow">Pain de campagne</p></div>
    <div class="m3-row"><span class="mk-check"></span><p class="mk-grow">Lessive</p></div>
  </div>
  <div class="m3-row" data-hotspot="share"><div class="mk-grow"><p>Partager avec Léa</p><p class="mk-small" style="color:#42474e">Elle verra tes modifications en direct</p></div><span class="ios-sw"></span></div>
  <span class="m3-fab" data-hotspot="fab"><i data-icon="plus"></i></span>
  <div class="m3-handle" style="position:absolute;left:0;right:0;bottom:0"></div>
</div>`),
        css: M3_CSS,
      },
      hotspots: [
        { id: 'back', label: 'Bouton retour « ‹ Listes »', correct: true, why: 'Un chevron suivi du titre précédent, avec un titre centré : c’est l’idiome iOS. Sur Android, la barre d’application porte une flèche de retour et un titre aligné au début, et le Retour système fait le reste.' },
        { id: 'share', label: 'Interrupteur vert', correct: true, why: 'Un interrupteur à la forme et au vert d’iOS. Material a son propre interrupteur, que les utilisateurs d’Android reconnaissent.' },
        { id: 'menu', label: 'Menu à trois points', correct: false, why: 'Le menu à débordement vertical est l’idiome Material pour les actions secondaires.' },
        { id: 'list', label: 'Liste à cocher', correct: false, why: 'Des lignes de 56 dp avec des cases à cocher : conforme à Material.' },
        { id: 'fab', label: 'Bouton d’action flottant', correct: false, why: 'Un seul FAB, pour l’action principale (ajouter un article) : exactement son usage.' },
      ],
      explanation: `Le test d’impeccable pour Android : un utilisateur aguerri ferait-il confiance à l’appli ? Le signe le plus courant d’une appli bâclée est **l’appli iOS déguisée** : un bouton retour textuel qui ignore le Retour du système, des interrupteurs et des dialogues à la mode iOS, une navigation copiée de l’iPhone.

Material 3 est la référence : barre d’application supérieure avec flèche de retour, interrupteur Material, FAB pour l’action principale. La marque passe par le thème (couleurs, typographie, formes), pas par les contrôles d’une autre plateforme.`,
      takeaway: 'Sur Android, pas de contrôles iOS : barre d’application Material, interrupteur Material et Retour système.',
      sources: ['imp:android', IMP_ADAPT_NATIVE, ANDROID_BACK],
    },
    {
      id: 'platforms-fab-choice',
      type: 'choice',
      difficulty: 2,
      prompt: 'Comment présenter ces trois actions ?',
      context: 'Un écran Android liste les notes d’un carnet. Trois actions : créer une note (très fréquente), trier la liste, exporter le carnet en PDF.',
      options: [
        { id: 'one', label: 'Un FAB « Nouvelle note », et Trier et Exporter dans la barre d’application supérieure (icône ou menu à débordement)', why: 'Un seul FAB pour l’action principale ; les actions secondaires restent accessibles sans concurrencer la création.' },
        { id: 'three', label: 'Trois FAB empilés, un par action', why: 'Plusieurs FAB se disputent l’attention : aucune action ne ressort plus comme principale.' },
        { id: 'export', label: 'Le FAB pour Exporter, la création dans un menu', why: 'Le FAB est réservé à l’action principale de l’écran, pas à une tâche occasionnelle.' },
        { id: 'navbar', label: 'Une barre de navigation au bas de l’écran avec Créer, Trier et Exporter', why: 'La barre de navigation mène à des destinations ; elle ne déclenche pas d’actions.' },
      ],
      answer: 'one',
      explanation: `Le **bouton d’action flottant** (FAB) représente **l’action principale** d’un écran : ici, créer une note. Material recommande **un seul FAB** : en empiler plusieurs, ou en dépenser un pour une tâche secondaire, efface la hiérarchie qu’il est censé créer.

Les actions secondaires (trier, exporter) vont dans la **barre d’application supérieure**, en icône ou dans le menu à débordement. La barre de navigation, elle, sert à passer d’une destination à une autre.`,
      takeaway: 'Un seul FAB pour l’action principale ; les actions secondaires vont dans la barre d’application supérieure.',
      sources: ['imp:android', M3_FAB],
    },
    {
      id: 'platforms-dynamic-type-tf',
      type: 'truefalse',
      difficulty: 1,
      prompt: 'Sur iOS, figer le corps de texte à 15 pt garantit une mise en page stable : c’est la bonne pratique.',
      answer: false,
      explanation: `Sur iOS, le texte doit suivre **Dynamic Type** : la personne règle sa taille de lecture dans les réglages du système, et les styles de texte (Body, Headline, Caption…) s’adaptent. Une taille figée ignore ce réglage, au détriment de ceux qui ont besoin d’un texte plus grand.

Le style Body fait **17 pt** au réglage par défaut, et rien ne descend sous **11 pt**. La stabilité vient d’une mise en page qui s’adapte (lignes qui se replient, textes qui ne sont pas tronqués), à vérifier avec une grande taille de texte.`,
      takeaway: 'Sur iOS, utilise les styles Dynamic Type (Body à 17 pt par défaut), jamais des tailles figées.',
      sources: ['imp:ios', HIG_TYPE],
    },
    {
      id: 'platforms-snackbar-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Après la suppression d’une conversation, quel retour convient dans cette appli Android ?',
      options: [
        {
          id: 'dialog',
          visual: {
            alt: 'Écran Android de messagerie recouvert d’un dialogue « Conversation supprimée » avec un seul bouton « OK ».',
            frame: 'phone',
            html: fr(`<div class="m3" style="min-height:400px">
  <div class="m3-top"><span class="m3-ib"><i data-icon="menu"></i></span><span class="m3-title">Discussions</span><span class="m3-ib"><i data-icon="search"></i></span></div>
  <div class="m3-row"><span class="mk-avatar" style="background:#cfe3d4"></span><div class="mk-grow"><p class="mk-strong">Groupe escalade</p><p class="mk-small" style="color:#42474e">Paul : la salle ouvre à 19 h</p></div></div>
  <div class="m3-row"><span class="mk-avatar" style="background:#d6dcf5"></span><div class="mk-grow"><p class="mk-strong">Paul Girard</p><p class="mk-small" style="color:#42474e">Merci pour le lien !</p></div></div>
  <div class="m3-row"><span class="mk-avatar" style="background:#efd9ef"></span><div class="mk-grow"><p class="mk-strong">Jeanne Roux</p><p class="mk-small" style="color:#42474e">Photo</p></div></div>
  <div class="mk-overlay" style="background:rgb(0 0 0 / 0.32)"><div class="dg"><p class="dg-t">Conversation supprimée</p><p style="color:#42474e">La conversation avec Inès Moreau a été supprimée.</p><p class="dg-a">OK</p></div></div>
</div>`),
            css: `${M3_CSS} .dg { width: min(100%, 280px); padding: 24px 24px 14px; border-radius: 28px; background: #eef1f8; } .dg-t { font-size: 20px; margin-bottom: 12px; } .dg-a { text-align: end; color: #00639b; font-weight: 600; padding: 14px 8px 4px; }`,
          },
          why: 'Un dialogue interrompt pour une simple information et n’offre aucun moyen d’annuler la suppression.',
        },
        {
          id: 'snackbar',
          visual: {
            alt: 'Même écran Android avec, au bas de l’écran, une barre sombre « Conversation supprimée » et l’action « Annuler ».',
            frame: 'phone',
            html: fr(`<div class="m3" style="min-height:400px">
  <div class="m3-top"><span class="m3-ib"><i data-icon="menu"></i></span><span class="m3-title">Discussions</span><span class="m3-ib"><i data-icon="search"></i></span></div>
  <div class="m3-row"><span class="mk-avatar" style="background:#cfe3d4"></span><div class="mk-grow"><p class="mk-strong">Groupe escalade</p><p class="mk-small" style="color:#42474e">Paul : la salle ouvre à 19 h</p></div></div>
  <div class="m3-row"><span class="mk-avatar" style="background:#d6dcf5"></span><div class="mk-grow"><p class="mk-strong">Paul Girard</p><p class="mk-small" style="color:#42474e">Merci pour le lien !</p></div></div>
  <div class="m3-row"><span class="mk-avatar" style="background:#efd9ef"></span><div class="mk-grow"><p class="mk-strong">Jeanne Roux</p><p class="mk-small" style="color:#42474e">Photo</p></div></div>
  <div style="position:absolute;left:0;right:0;bottom:28px"><div class="m3-snack"><span>Conversation supprimée</span><b>Annuler</b></div></div>
  <div class="m3-handle" style="position:absolute;left:0;right:0;bottom:0"></div>
</div>`),
            css: M3_CSS,
          },
          why: 'Une snackbar confirme sans interrompre, puis disparaît, avec « Annuler » pour rattraper une erreur.',
        },
      ],
      answer: 'snackbar',
      explanation: `Sur Android, la **snackbar** est faite pour le **retour passager** : un message bref au bas de l’écran, avec au plus une action (souvent « Annuler »), qui disparaît seul. La personne continue sans être interrompue.

Le **dialogue** est réservé aux **décisions qui doivent interrompre** : ici, il n’y a rien à décider, et le bouton « OK » ne sert qu’à fermer. En prime, la snackbar offre l’annulation, plus utile qu’une confirmation.`,
      takeaway: 'Retour passager sur Android : une snackbar, avec « Annuler » si utile ; le dialogue est réservé aux décisions qui interrompent.',
      sources: ['imp:android', M3_SNACKBAR],
    },
    {
      id: 'platforms-ipad-duel',
      type: 'choice',
      difficulty: 2,
      prompt: 'Sur iPad en paysage, quelle mise en page convient à cette appli de notes ?',
      options: [
        {
          id: 'stretched',
          visual: {
            alt: 'iPad en paysage : la liste de notes de l’iPhone s’étire sur toute la largeur sous un grand titre, avec une barre d’onglets étalée au bas de l’écran.',
            html: fr(`<div class="tz"><div class="ip-frame"><div class="ip-screen" style="flex-direction:column">
  <p class="ip-lt">Notes</p>
  <div class="ip-row"><span class="mk-strong">Liste de courses</span><span class="mk-grow mk-muted">Lait d’avoine, pommes, pain de campagne, lessive</span><span class="mk-muted">10:42</span></div>
  <div class="ip-row"><span class="mk-strong">Idées cadeaux</span><span class="mk-grow mk-muted">Un livre de cuisine pour Inès, des gants pour Paul</span><span class="mk-muted">Hier</span></div>
  <div class="ip-row"><span class="mk-strong">Réunion de copropriété</span><span class="mk-grow mk-muted">Toiture, ravalement, local à vélos</span><span class="mk-muted">Lun.</span></div>
  <div class="ip-row"><span class="mk-strong">Voyage à Lisbonne</span><span class="mk-grow mk-muted">Vols, quartier de l’Alfama, tram 28</span><span class="mk-muted">Dim.</span></div>
  <div class="ip-tabs"><span class="on"><i data-icon="file-text" style="--ico:16px"></i>Notes</span><span><i data-icon="folder" style="--ico:16px"></i>Dossiers</span><span><i data-icon="search" style="--ico:16px"></i>Rechercher</span></div>
</div></div></div>`),
            css: IPAD_CSS,
          },
          why: 'L’interface de l’iPhone, simplement agrandie : des lignes interminables et tout l’espace perdu.',
        },
        {
          id: 'split',
          visual: {
            alt: 'iPad en paysage : une barre latérale de dossiers, la liste des notes au centre et la note sélectionnée ouverte à droite.',
            html: fr(`<div class="tz"><div class="ip-frame"><div class="ip-screen">
  <div class="ip-side"><span class="on"><i data-icon="file-text" style="--ico:14px"></i>Toutes</span><span><i data-icon="folder" style="--ico:14px"></i>Maison</span><span><i data-icon="folder" style="--ico:14px"></i>Travail</span><span><i data-icon="folder" style="--ico:14px"></i>Voyages</span></div>
  <div class="ip-list">
    <div class="ip-item on"><p class="mk-strong">Liste de courses</p><p class="mk-muted">10:42 · Lait d’avoine, pommes</p></div>
    <div class="ip-item"><p class="mk-strong">Idées cadeaux</p><p class="mk-muted">Hier · Un livre de cuisine</p></div>
    <div class="ip-item"><p class="mk-strong">Réunion de copropriété</p><p class="mk-muted">Lun. · Toiture, ravalement</p></div>
    <div class="ip-item"><p class="mk-strong">Voyage à Lisbonne</p><p class="mk-muted">Dim. · Vols, Alfama</p></div>
  </div>
  <div class="ip-detail mk-stack" style="--gap:6px"><p class="mk-strong" style="font-size:15px">Liste de courses</p><p>Lait d’avoine</p><p>Pommes Golden × 6</p><p>Pain de campagne</p><p>Lessive</p></div>
</div></div></div>`),
            css: IPAD_CSS,
          },
          why: 'Une vue partagée : dossiers, liste et note côte à côte. La largeur sert à montrer plus, pas à étirer.',
        },
      ],
      answer: 'split',
      explanation: `Une interface de téléphone agrandie sur une tablette est **l’échec type** de l’adaptation native : des lignes étirées, de grands vides, et autant d’allers-retours qu’au téléphone.

On **restructure** : les classes de taille (iOS) déclenchent une vue partagée, avec une barre latérale, la liste et le détail côte à côte. Le multitâche peut ensuite rendre à l’appli une fenêtre étroite, de largeur téléphone : une mise en page pilotée par les classes de taille repasse alors d’elle-même à une seule colonne.`,
      takeaway: 'Du téléphone à la tablette, restructure (barre latérale, maître-détail) au lieu d’étirer ; laisse les classes de taille piloter la mise en page.',
      sources: [IMP_ADAPT_NATIVE, 'imp:ios'],
    },
    {
      id: 'platforms-ime-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Le clavier est ouvert dans cette messagerie Android. Quelle version gère correctement l’affichage ?',
      options: [
        {
          id: 'hidden',
          visual: {
            alt: 'Écran Android de discussion : le clavier recouvre le champ de saisie, dont on n’aperçoit qu’un liseré au-dessus des touches.',
            frame: 'phone',
            html: fr(`<div class="m3">
  <div class="m3-top"><span class="m3-ib"><i data-icon="arrow-left"></i></span><span class="m3-title">Inès Moreau</span></div>
  <div class="ch-stack">${chatMessages}
    <div class="ch-input"><span class="ch-field">J’arrive dans 10 min</span><span class="ch-send"><i data-icon="send" style="--ico:18px"></i></span></div>
    <div style="height:129px"></div>
    <div class="kb-over">${KEYBOARD}</div>
  </div>
</div>`),
            css: CHAT_CSS,
          },
          why: 'Le clavier recouvre le champ : on tape à l’aveugle, sans voir son message ni le bouton d’envoi.',
        },
        {
          id: 'inset',
          visual: {
            alt: 'Même écran : le champ de saisie, avec le texte « J’arrive dans 10 min » et le bouton d’envoi, est posé juste au-dessus du clavier.',
            frame: 'phone',
            html: fr(`<div class="m3">
  <div class="m3-top"><span class="m3-ib"><i data-icon="arrow-left"></i></span><span class="m3-title">Inès Moreau</span></div>
  ${chatMessages}
  <div class="ch-input"><span class="ch-field">J’arrive dans 10 min</span><span class="ch-send"><i data-icon="send" style="--ico:18px"></i></span></div>
  ${KEYBOARD}
</div>`),
            css: CHAT_CSS,
          },
          why: 'L’appli applique la marge du clavier : le champ remonte au-dessus des touches, le message reste visible.',
        },
      ],
      answer: 'inset',
      explanation: `Une appli **bord à bord** dessine sous les barres du système et sous le clavier ; c’est à elle d’appliquer les **marges du système** (*window insets*) : barre d’état, barre de navigation, découpe de l’écran et clavier (IME).

Depuis Android 15, une appli qui cible le SDK 35 s’affiche bord à bord par défaut : sans ces marges, le champ de saisie passe sous le clavier et l’on tape à l’aveugle. Avec la marge du clavier, le champ remonte au-dessus des touches.`,
      takeaway: 'Bord à bord sur Android : applique les marges du système (barres, découpe, clavier) pour que rien d’utile ne passe dessous.',
      sources: ['imp:android', ANDROID_EDGE],
    },
    {
      id: 'platforms-webport-hotspot',
      type: 'hotspot',
      difficulty: 3,
      prompt: 'Cette appli iPhone a été « portée depuis le web ». Trouve les trois éléments qui le trahissent.',
      visual: {
        alt: 'Écran iPhone d’une appli de trajets : menu hamburger avec un logo, grand titre « Mes trajets », une consigne de survol, une liste groupée, de petits liens « Modifier | Supprimer » et un interrupteur d’alertes.',
        frame: 'phone',
        html: fr(`<div class="wp-top"><span class="io-btn" data-hotspot="burger"><i data-icon="menu"></i></span><span class="mk-strong">TrajetPlus</span><span class="io-btn"><i data-icon="user"></i></span></div>
<p class="io-lt" data-hotspot="title" style="padding-top:10px">Mes trajets</p>
<p class="wp-hint" data-hotspot="hover">Survolez un trajet pour afficher ses actions.</p>
<div class="wp-g" data-hotspot="list">
  <div class="wp-r"><i data-icon="train-front"></i><span class="mk-grow">Lyon → Grenoble</span><span class="mk-small mk-muted">Ven. 07:42</span></div>
  <div class="wp-r"><i data-icon="bus"></i><span class="mk-grow">Grenoble → Chambéry</span><span class="mk-small mk-muted">Sam. 18:10</span></div>
</div>
<p class="wp-links" data-hotspot="links"><a href="#">Modifier</a> | <a href="#">Supprimer</a> | <a href="#">Partager</a></p>
<div class="wp-g" data-hotspot="alerts"><div class="wp-r"><span class="mk-grow">Alertes de retard</span><span class="ios-sw"></span></div></div>`),
        css: `${WEBPORT_CSS} ${M3_CSS}`,
      },
      hotspots: [
        { id: 'burger', label: 'Menu hamburger', correct: true, why: 'Une navigation globale maison, héritée du site : sur iPhone, les sections de premier niveau vivent dans une barre d’onglets visible.' },
        { id: 'hover', label: 'Consigne de survol', correct: true, why: 'Au doigt, le survol n’existe pas : les actions d’un trajet passent par un balayage, un menu contextuel ou l’écran de détail.' },
        { id: 'links', label: 'Liens « Modifier | Supprimer | Partager »', correct: true, why: 'Des liens web de 11 px collés : des cibles bien en dessous de 44 × 44 pt, et une forme étrangère à iOS.' },
        { id: 'title', label: 'Grand titre', correct: false, why: 'Un grand titre sur un écran de premier niveau : c’est la convention d’iOS.' },
        { id: 'list', label: 'Liste groupée', correct: false, why: 'Une liste groupée avec des lignes de 44 pt : idiome natif.' },
        { id: 'alerts', label: 'Interrupteur d’alertes', correct: false, why: 'Un interrupteur natif dans une liste groupée : rien à corriger.' },
      ],
      explanation: `Le test d’impeccable pour iOS : un utilisateur aguerri ferait-il confiance à l’appli, ou buterait-il sur des contrôles hors norme ? Le signe qui trahit le plus souvent, c’est l’appli **« portée depuis le web »** :

- une **navigation globale réinventée** (menu hamburger) au lieu d’une barre d’onglets ;
- des **affordances au survol**, qui n’existent pas au doigt ;
- des **contrôles en forme de page web** (petits liens séparés par des barres) au lieu de boutons, de menus contextuels ou d’actions de balayage de 44 × 44 pt.

Le grand titre, la liste groupée et l’interrupteur montrent au contraire ce qu’il faut garder : les composants de la plateforme.`,
      takeaway: 'Une appli iOS n’est pas un site réduit : barre d’onglets, contrôles natifs de 44 pt, aucune action au survol.',
      sources: ['imp:ios', IMP_ADAPT_NATIVE, IMP_AUDIT_NATIVE],
    },
    {
      id: 'platforms-reduce-motion-tf',
      type: 'truefalse',
      difficulty: 2,
      prompt: 'Quand « Réduire les animations » est activé, il faut supprimer toute transition : l’écran suivant doit apparaître d’un coup.',
      answer: false,
      explanation: `Le réglage vise les mouvements qui peuvent gêner (parallaxe, grands glissements, zooms), pas tout retour visuel. Sur iOS, la recommandation est de **remplacer** ces mouvements par un **fondu enchaîné** : le changement d’écran reste perceptible, sans déplacement.

Sur Android, le réglage **Supprimer les animations** se respecte par un fondu enchaîné ou une coupe franche. La coupe est donc permise, mais pas obligatoire : ce qui compte, c’est de supprimer le mouvement qui déplace le contenu.`,
      takeaway: 'Réduire les animations : remplace la parallaxe et les grands glissements par un fondu enchaîné, sans forcément tout couper.',
      sources: ['imp:ios', 'imp:android'],
    },
    {
      id: 'platforms-semantic-color-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Quelle correction apporter ?',
      context: 'Une appli iOS code ses couleurs en hexadécimal : texte `#1C1C1E`, fond `#FFFFFF`. En mode sombre, l’écran reste blanc au milieu d’un système sombre, et le réglage « Augmenter le contraste » n’a aucun effet.',
      options: [
        { id: 'semantic', label: 'Utiliser les couleurs sémantiques du système : `label` pour le texte, `systemBackground` pour le fond', why: 'Elles prévoient déjà les variantes claire, sombre et à contraste renforcé, et suivent les évolutions du système.' },
        { id: 'pairs', label: 'Ajouter, écran par écran, un second hexadécimal pour le mode sombre', why: 'Fragile, facile à oublier sur un écran, et le contraste renforcé reste ignoré.' },
        { id: 'light', label: 'Forcer l’apparence claire dans toute l’appli', why: 'Le mode sombre est une apparence à part entière : l’ignorer laisse un écran éblouissant à ceux qui l’ont choisi.' },
        { id: 'black', label: 'Passer tout le texte en noir pur `#000000`', why: 'Plus de contraste en clair, mais un texte invisible le jour où le fond deviendra sombre.' },
      ],
      answer: 'semantic',
      explanation: `Les **couleurs sémantiques** d’iOS sont définies par leur **rôle** (texte principal, fond, séparateur), pas par leur valeur : \`label\` et \`systemBackground\` changent seules entre clair et sombre, et se renforcent quand la personne demande plus de contraste. Un hexadécimal codé en dur reste figé dans tous ces contextes.

Apple recommande d’utiliser les couleurs du système quand c’est possible ; une couleur de marque personnalisée doit fournir elle-même ses variantes claire, sombre et à contraste renforcé.`,
      takeaway: 'Sur iOS, des couleurs par rôle (`label`, `systemBackground`) plutôt que des hexadécimaux : elles suivent le mode sombre et le contraste renforcé.',
      sources: ['imp:ios', HIG_COLOR],
    },
    {
      id: 'platforms-type-scale-order',
      type: 'order',
      difficulty: 2,
      prompt: 'Range ces rôles de l’échelle typographique de Material 3 du plus grand au plus petit (taille Large de chaque rôle).',
      items: [
        { id: 'display', label: 'Display : chiffres clés et accroches très courtes' },
        { id: 'headline', label: 'Headline : titres courts et très visibles' },
        { id: 'title', label: 'Title : titres de sections, de cartes, de barres' },
        { id: 'body', label: 'Body : texte courant' },
        { id: 'label', label: 'Label : texte des boutons, onglets et chips' },
      ],
      explanation: `L’échelle typographique de Material 3 compte cinq rôles, chacun en trois tailles. En taille Large : **Display 57 sp**, **Headline 32 sp**, **Title 22 sp**, **Body 16 sp**, **Label 14 sp**.

On associe chaque texte à un **rôle** au lieu de choisir une taille écran par écran ; les tailles s’expriment en **sp**, pour suivre le réglage de taille de police du système. Une police de marque s’intègre en remplaçant la famille de ces rôles, pas en inventant de nouvelles tailles.`,
      takeaway: 'Material 3 : Display, Headline, Title, Body, Label, en sp ; on choisit un rôle, pas une taille.',
      sources: ['imp:android', M3_TYPE],
    },
    {
      id: 'platforms-sheet-choice',
      type: 'choice',
      difficulty: 3,
      prompt: 'Comment présenter le formulaire de création d’un rappel ?',
      context: 'Appli iOS de tâches. Créer un rappel demande un titre, une date et le choix d’une liste ; c’est une tâche courte et autonome.',
      options: [
        {
          id: 'sheet',
          label: 'Une feuille avec « Annuler » et « Ajouter » dans sa barre, qu’on ferme d’un balayage, avec une confirmation seulement si des données seraient perdues',
          why: 'La feuille est faite pour une sous-tâche autonome : on la remplit, on la ferme, on retrouve l’écran d’origine.',
        },
        { id: 'push', label: 'Pousser un nouvel écran dans la pile de navigation', why: 'La pile sert à descendre dans une hiérarchie de contenus ; créer un rappel n’est pas un niveau de plus.' },
        { id: 'full', label: 'Un écran plein, sans bouton de fermeture tant que le rappel n’est pas enregistré', why: 'Aucune sortie sans valider : la personne se sent piégée. Une feuille garde toujours « Annuler ».' },
        { id: 'alert', label: 'Une alerte du système avec trois champs de saisie', why: 'Une alerte sert à informer ou à faire choisir rapidement, pas à remplir un formulaire.' },
      ],
      answer: 'sheet',
      explanation: `Sur iOS, la modalité se choisit : une **feuille** (*sheet*) pour une sous-tâche ciblée et autonome, un écran plein pour une expérience immersive, la **pile de navigation** pour descendre dans une hiérarchie.

Les guides d’Apple placent « Annuler » au début de la barre de la feuille et le bouton de validation à la fin, et demandent de toujours offrir une sortie sans enregistrer. Le balayage vers le bas ferme la feuille, sauf si des données seraient perdues : on demande alors confirmation.`,
      takeaway: 'Tâche courte et autonome sur iOS : une feuille avec « Annuler » et une validation claire, fermable par balayage.',
      sources: ['imp:ios', HIG_SHEETS],
    },
    {
      id: 'platforms-verify-multi',
      type: 'multi',
      difficulty: 2,
      prompt: 'Lesquelles de ces vérifications font partie de la passe finale d’une appli native ?',
      options: [
        { id: 'sim', label: 'Des captures sur le simulateur iOS ou l’émulateur Android, pour chaque classe d’appareil visée (téléphone, tablette)', why: 'Le simulateur donne l’étendue : toutes les tailles d’écran visées, rapidement.' },
        { id: 'appearance', label: 'Un passage en mode sombre et avec une grande taille de texte', why: 'Les deux révèlent les couleurs codées en dur et les textes tronqués qu’une mise en page figée cache.' },
        { id: 'device', label: 'Les gestes, la fluidité et les performances sur un vrai appareil', why: 'Le matériel donne la vérité : gestes, fréquence d’affichage, posture et performances ne se simulent pas.' },
        { id: 'browser', label: 'Des captures dans un navigateur redimensionné à la largeur d’un iPhone', why: 'Un navigateur ne rend pas une appli native : les captures viennent du simulateur ou d’un appareil.' },
        { id: 'sim-only', label: 'Le simulateur seul, puisqu’il reproduit le matériel', why: 'Il ne reproduit ni les gestes réels, ni la posture, ni les performances : dis toujours d’où vient la preuve.' },
      ],
      answers: ['sim', 'appearance', 'device'],
      explanation: `Impeccable décrit la même passe de vérification pour iOS et Android :

- des **captures depuis le simulateur ou l’émulateur**, jamais depuis un navigateur, pour chaque classe d’appareil visée ;
- le **mode sombre** et une **grande taille de texte** (Dynamic Type, taille de police Android) dans la passe ;
- les **gestes, la fluidité et les performances sur du vrai matériel**.

Les simulateurs donnent l’étendue ; le matériel donne la vérité. Quand une preuve vient d’un simulateur, il faut le dire.`,
      takeaway: 'Vérifie une appli native sur simulateur pour l’étendue, sur appareil pour la vérité, en mode sombre et en grand texte.',
      sources: ['imp:ios', 'imp:android'],
    },
    {
      id: 'platforms-grouped-list-duel',
      type: 'choice',
      difficulty: 1,
      prompt: 'Quel écran de réglages s’intègre le mieux à iOS ?',
      options: [
        {
          id: 'cards',
          visual: {
            alt: 'iPhone : réglages présentés en cartes flottantes séparées, chacune avec une tuile d’icône colorée et un interrupteur rectangulaire maison.',
            frame: 'phone',
            html: fr(`<div class="cs">
  <p class="io-lt" style="padding:6px 0 0">Réglages</p>
  <div class="cs-card"><span class="cs-tile"><i data-icon="bell"></i></span><div class="mk-grow"><p class="mk-strong">Notifications</p><p class="mk-small mk-muted">Rappels et messages</p></div><span class="cs-tog"></span></div>
  <div class="cs-card"><span class="cs-tile"><i data-icon="moon"></i></span><div class="mk-grow"><p class="mk-strong">Mode concentration</p><p class="mk-small mk-muted">Silence de 22 h à 7 h</p></div><span class="cs-tog off"></span></div>
  <div class="cs-card"><span class="cs-tile"><i data-icon="lock"></i></span><div class="mk-grow"><p class="mk-strong">Verrouillage</p><p class="mk-small mk-muted">Face ID</p></div><span class="cs-tog"></span></div>
</div>`),
            css: GROUPED_CSS,
          },
          why: 'Des cartes maison et des interrupteurs inventés : rien ne ressemble à iOS, et chaque réglage coûte plus de place.',
        },
        {
          id: 'grouped',
          visual: {
            alt: 'iPhone : réglages en liste groupée à coins arrondis sur fond gris clair, avec des en-têtes de groupe, des interrupteurs natifs et des chevrons.',
            frame: 'phone',
            html: fr(`<div class="gp">
  <p class="io-lt" style="padding-top:6px">Réglages</p>
  <p class="gp-h">Alertes</p>
  <div class="gp-g">
    <div class="gp-r"><span class="mk-grow">Notifications</span><span class="ios-sw"></span></div>
    <div class="gp-r"><span class="mk-grow">Mode concentration</span><span class="ios-sw off"></span></div>
  </div>
  <p class="gp-h">Sécurité</p>
  <div class="gp-g">
    <div class="gp-r"><span class="mk-grow">Verrouillage</span><span class="mk-muted">Face ID</span><i data-icon="chevron-right"></i></div>
    <div class="gp-r"><span class="mk-grow">Appareils connectés</span><span class="mk-muted">3</span><i data-icon="chevron-right"></i></div>
  </div>
</div>`),
            css: `${GROUPED_CSS} ${M3_CSS}`,
          },
          why: 'Une liste groupée, des interrupteurs natifs et des chevrons : la personne reconnaît ses réglages iOS.',
        },
      ],
      answer: 'grouped',
      explanation: `Pour tout ce qui ressemble à des réglages, iOS a un idiome : la **liste groupée** (*inset grouped*), avec des lignes de 44 pt, des en-têtes de groupe, des **interrupteurs natifs** et des chevrons vers les écrans de détail.

Les piles de cartes maison et les contrôles réinventés « pour le style » sont la faute native la plus courante : ils obligent à réapprendre ce que la personne sait déjà faire, et ne profitent pas des évolutions du système (taille du texte, contraste renforcé, matériaux).`,
      takeaway: 'Réglages sur iOS : une liste groupée avec des contrôles natifs, pas des cartes maison.',
      sources: ['imp:ios', 'hig'],
    },
  ],
};

export default platforms;
