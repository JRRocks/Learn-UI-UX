import type { AntipatternEntry, Visual } from '../engine/types';

/**
 * Catalogue des 62 règles du détecteur d’anti-patterns d’impeccable (registry.rs, v4.8.0),
 * dans l’ordre de `detectorRules.ts`. Descriptions adaptées des descriptions originales ;
 * démonstrations « À éviter / Préférer » pour les règles qui se voient.
 */

const v = (alt: string, html: string, css = '', extra: Partial<Visual> = {}): Visual => ({ alt, html, css, ...extra });

/* ---------- Styles partagés ---------- */

const SLOP_HERO = `.sh { padding: 26px 18px; text-align: center; background: #fff; }
.sh-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; border: 1px solid rgb(124 58 237 / 0.3); background: rgb(124 58 237 / 0.08); color: #6d28d9; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.sh-h { margin-top: 14px; font-size: 30px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; color: #111827; }
.sh-grad { background: linear-gradient(90deg, #7c3aed, #db2777); -webkit-background-clip: text; background-clip: text; color: transparent; }
.sh-p { margin: 12px auto 0; max-width: 34ch; font-size: 14px; line-height: 1.5; color: #5b6170; }
.sh-btn { display: inline-flex; margin-top: 18px; padding: 10px 18px; border-radius: 10px; background: #7c3aed; color: #fff; font-weight: 600; font-size: 14px; }`;

const CLEAN_HERO = `.ch { padding: 26px 18px; background: #fff; }
.ch-h { font-size: 26px; line-height: 1.12; font-weight: 800; letter-spacing: -0.02em; color: #14213d; }
.ch-p { margin-top: 10px; max-width: 40ch; font-size: 14px; line-height: 1.55; color: #4b5262; }
.ch-btn { display: inline-flex; margin-top: 16px; padding: 10px 16px; border-radius: 8px; background: #14532d; color: #fff; font-weight: 600; font-size: 14px; }`;

const PARA_CSS = `.tp { padding: 18px; color: #2a2f3a; }
.tp-h { font-size: 16px; font-weight: 700; margin-bottom: 6px; color: #1d2230; }`;

const RETOURS =
  'Tu disposes de 30 jours après la livraison pour nous renvoyer un article. Le remboursement arrive sur ton moyen de paiement sous 5 jours ouvrés après réception du colis.';

const para = (alt: string, style: string, text = RETOURS, title = 'Retours et remboursements'): Visual =>
  v(alt, `<div class="tp"><p class="tp-h">${title}</p><p style="${style}">${text}</p></div>`, PARA_CSS);

/* ---------- Catalogue ---------- */

export const ANTIPATTERNS: AntipatternEntry[] = [
  {
    id: 'side-tab',
    name: 'Bordure latérale d’accent',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Une bordure épaisse et colorée sur un seul côté d’une carte : le signe le plus reconnaissable des interfaces générées par IA. Le détecteur la relève sur les cartes aux coins arrondis.',
    fix: 'Utilise un accent plus discret (point, icône, teinte de fond, bordure fine sur tout le pourtour) ou supprime-le. Le plancher de qualité refuse tout trait latéral coloré de plus de 1 px sur les cartes, listes, encadrés et alertes.',
    demo: {
      bad: v(
        'Carte arrondie « Conseil du jour » avec une épaisse bordure violette sur le côté gauche.',
        `<div class="st"><div class="st-c st-c--tab"><b>Conseil du jour</b><span>Relance tes devis non signés après 7 jours : c’est là que la moitié des réponses arrivent.</span></div></div>`,
        `.st { padding: 16px; background: #f6f7f9; }
.st-c { display: flex; flex-direction: column; gap: 4px; padding: 14px; border-radius: 12px; background: #fff; border: 1px solid #e3e6ec; font-size: 14px; line-height: 1.5; color: #4b5262; }
.st-c b { color: #1d2230; }
.st-c--tab { border-left: 4px solid #7c3aed; }`,
      ),
      good: v(
        'Même carte avec une petite icône d’ampoule à côté du titre et une bordure fine sur tout le pourtour.',
        `<div class="st"><div class="st-c"><b><i data-icon="sparkles" style="--ico:16px"></i>Conseil du jour</b><span>Relance tes devis non signés après 7 jours : c’est là que la moitié des réponses arrivent.</span></div></div>`,
        `.st { padding: 16px; background: #f6f7f9; }
.st-c { display: flex; flex-direction: column; gap: 4px; padding: 14px; border-radius: 12px; background: #fff; border: 1px solid #e3e6ec; font-size: 14px; line-height: 1.5; color: #4b5262; }
.st-c b { display: flex; align-items: center; gap: 6px; color: #1d2230; }
.st-c .mk-ico { color: #b45309; }`,
      ),
    },
  },
  {
    id: 'border-accent-on-rounded',
    name: 'Bordure d’accent sur un élément arrondi',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Une bordure d’accent épaisse en haut ou en bas d’une carte aux coins arrondis : la bordure se heurte à l’arrondi et se termine en croissant aux deux coins.',
    fix: 'Retire la bordure ou l’arrondi. Pour distinguer la carte, préfère une teinte de fond, une pastille ou un titre plus fort.',
    demo: {
      bad: v(
        'Carte de formule aux coins arrondis avec une épaisse bordure verte en haut qui se recourbe dans les coins.',
        `<div class="ba"><div class="ba-c ba-c--top"><b>Formule Équipe</b><span class="ba-p">29 € / mois</span><span>5 utilisateurs, relances automatiques</span></div></div>`,
        `.ba { padding: 18px; background: #f6f7f9; }
.ba-c { display: flex; flex-direction: column; gap: 2px; padding: 14px; border-radius: 16px; background: #fff; border: 1px solid #e3e6ec; font-size: 13px; color: #4b5262; }
.ba-c b { font-size: 15px; color: #1d2230; }
.ba-p { font-size: 22px; font-weight: 800; color: #1d2230; }
.ba-c--top { border-top: 6px solid #16a34a; }`,
      ),
      good: v(
        'Même carte de formule sans bordure d’accent, avec une petite pastille « Recommandée » à côté du titre.',
        `<div class="ba"><div class="ba-c"><span class="ba-row"><b>Formule Équipe</b><em>Recommandée</em></span><span class="ba-p">29 € / mois</span><span>5 utilisateurs, relances automatiques</span></div></div>`,
        `.ba { padding: 18px; background: #f6f7f9; }
.ba-c { display: flex; flex-direction: column; gap: 2px; padding: 14px; border-radius: 16px; background: #fff; border: 1px solid #e3e6ec; font-size: 13px; color: #4b5262; }
.ba-c b { font-size: 15px; color: #1d2230; }
.ba-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ba-row em { font-style: normal; font-size: 12px; font-weight: 650; padding: 2px 8px; border-radius: 999px; background: #dcfce7; color: #166534; }
.ba-p { font-size: 22px; font-weight: 800; color: #1d2230; }`,
      ),
    },
  },
  {
    id: 'overused-font',
    name: 'Police surexploitée',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans et Space Grotesk sont employées sur tant de sites qu’elles ne distinguent plus rien. Chaque nouvelle vague d’interfaces générées converge vers la même poignée de polices.',
    fix: 'Choisis une police qui donne une personnalité à l’interface, pour une raison liée au produit. Si le brief impose l’une de ces polices, garde-la et consigne l’exception.',
  },
  {
    id: 'flat-type-hierarchy',
    name: 'Hiérarchie typographique plate',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Les rôles dominants de titre et de corps sont séparés par moins de 1,25× à chaque marche : la hiérarchie des tailles reste plate.',
    fix: 'Ajoute au moins une marche de taille plus franche, et fais travailler la graisse, l’espace et la teinte avec la taille.',
    demo: {
      bad: v(
        'Fiche d’événement où le titre, la date et la description ont des tailles presque identiques.',
        `<div class="fh"><p style="font-size:16px;font-weight:600">Atelier céramique pour débutants</p><p style="font-size:15px;font-weight:600">Samedi 18 avril · 10 h – 13 h</p><p style="font-size:14px;font-weight:500">Trois heures pour tourner ton premier bol, terre et cuisson comprises. 8 places.</p></div>`,
        `.fh { padding: 18px; display: flex; flex-direction: column; gap: 6px; color: #2a2f3a; }`,
      ),
      good: v(
        'Même fiche avec un titre nettement plus grand, la date en gras de taille moyenne et la description plus petite et grisée.',
        `<div class="fh"><p style="font-size:23px;font-weight:750;line-height:1.2;letter-spacing:-0.01em">Atelier céramique pour débutants</p><p style="font-size:15px;font-weight:650;color:#9a3f17">Samedi 18 avril · 10 h – 13 h</p><p style="font-size:14px;line-height:1.55;color:#4b5262">Trois heures pour tourner ton premier bol, terre et cuisson comprises. 8 places.</p></div>`,
        `.fh { padding: 18px; display: flex; flex-direction: column; gap: 6px; color: #1d2230; }`,
      ),
    },
  },
  {
    id: 'gradient-text',
    name: 'Texte en dégradé',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Le texte en dégradé est décoratif plutôt que porteur de sens : un tic courant des interfaces générées, surtout sur les titres et les chiffres clés.',
    fix: 'Mets le texte en couleur unie. L’emphase vient de la graisse ou de la taille.',
    demo: {
      bad: v(
        'Titre « Facturez deux fois plus vite » dont les derniers mots sont en dégradé violet-rose.',
        `<div class="sh"><p class="sh-h">Facturez <span class="sh-grad">deux fois plus vite</span></p><p class="sh-p">Devis, factures et relances au même endroit.</p></div>`,
        SLOP_HERO,
      ),
      good: v(
        'Même titre en couleur unie foncée, les mots importants portés par la graisse.',
        `<div class="ch"><p class="ch-h">Ta facture part le jour du chantier, pas le dimanche soir</p><p class="ch-p">Devis, factures et relances au même endroit.</p></div>`,
        CLEAN_HERO,
      ),
    },
  },
  {
    id: 'ai-color-palette',
    name: 'Palette « IA »',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Les dégradés violets et le cyan sur fond sombre sont les signes les plus reconnaissables des interfaces générées. Un dégradé dans l’une de ces teintes suffit à trahir le réflexe ; une encre néon unie sur fond sombre devient suspecte dès qu’une deuxième teinte de la liste la rejoint.',
    fix: 'Choisis une palette distinctive et intentionnelle, tirée du produit et de son monde plutôt que de la catégorie.',
    demo: {
      bad: v(
        'Bandeau d’accueil d’une pépinière sur un dégradé bleu-violet, texte blanc et bouton blanc.',
        `<div class="ap ap--slop"><p class="ap-h">La nature, réinventée</p><p class="ap-p">Des plantes livrées chez vous, en toute simplicité.</p><span class="ap-btn">Découvrir</span></div>`,
        `.ap { padding: 30px 20px; color: #fff; }
.ap--slop { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.ap-h { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
.ap-p { margin-top: 8px; font-size: 14px; }
.ap-btn { display: inline-flex; margin-top: 16px; padding: 9px 16px; border-radius: 999px; background: #fff; color: #5b3fa0; font-weight: 650; font-size: 14px; }`,
      ),
      good: v(
        'Bandeau d’accueil de la même pépinière en vert sauge et vert sapin, avec la saison des plantations et un bouton terre cuite.',
        `<div class="ap ap--own"><p class="ap-h">Plants de saison, cultivés à Angers</p><p class="ap-p">Tomates anciennes, aromatiques et petits fruits : retrait à la pépinière ou livraison sous 48 h.</p><span class="ap-btn">Voir les plants d’avril</span></div>`,
        `.ap { padding: 30px 20px; }
.ap--own { background: #e9f0e6; color: #1f3a28; }
.ap-h { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
.ap-p { margin-top: 8px; font-size: 14px; line-height: 1.5; color: #35503d; max-width: 42ch; }
.ap-btn { display: inline-flex; margin-top: 16px; padding: 9px 16px; border-radius: 8px; background: #b6532f; color: #fff; font-weight: 650; font-size: 14px; }`,
      ),
    },
  },
  {
    id: 'cream-palette',
    name: 'Palette crème ou beige',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un fond de page crème ou beige chaud est devenu la surface « de bon goût » par défaut des interfaces générées, choisie par réflexe.',
    fix: 'Choisis un fond issu d’une palette délibérée, pas le blanc cassé chaud par sécurité. Si le monde du produit appelle vraiment le papier ou le lin, assume-le pleinement.',
  },
  {
    id: 'nested-cards',
    name: 'Cartes imbriquées',
    family: 'cliche',
    severity: 'avertissement',
    description: 'Des cartes dans des cartes créent du bruit visuel et une profondeur excessive.',
    fix: 'Aplatis la hiérarchie : espacement, typographie et filets séparateurs plutôt que des conteneurs imbriqués.',
    demo: {
      bad: v(
        'Carte « Facture F-2026-031 » contenant deux cartes bordées, elles-mêmes contenant des pastilles encadrées.',
        `<div class="nc"><div class="nc-card"><b>Facture F-2026-031</b><div class="nc-card nc-in"><span>Client</span><div class="nc-card nc-in2">M. Roux, Nantes</div></div><div class="nc-card nc-in"><span>Montant</span><div class="nc-card nc-in2">480,00 €</div></div></div></div>`,
        `.nc { padding: 14px; background: #f6f7f9; }
.nc-card { display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid #dfe3ea; border-radius: 12px; background: #fff; font-size: 13px; box-shadow: 0 4px 12px rgb(15 23 42 / 0.06); }
.nc-in { background: #fafbfc; }
.nc-in span { color: #5a6172; font-size: 12px; }
.nc-in2 { padding: 8px 10px; font-weight: 600; }`,
      ),
      good: v(
        'Même facture dans une seule carte : titre, puis deux lignes séparées par un filet, libellé à gauche et valeur à droite.',
        `<div class="nc"><div class="nc-card"><b>Facture F-2026-031</b><dl class="nc-dl"><div><dt>Client</dt><dd>M. Roux, Nantes</dd></div><div><dt>Montant</dt><dd>480,00 €</dd></div></dl></div></div>`,
        `.nc { padding: 14px; background: #f6f7f9; }
.nc-card { display: flex; flex-direction: column; gap: 6px; padding: 14px; border: 1px solid #dfe3ea; border-radius: 12px; background: #fff; font-size: 13px; }
.nc-dl { margin: 0; }
.nc-dl div { display: flex; justify-content: space-between; gap: 8px; padding: 8px 0; border-top: 1px solid #edf0f3; }
.nc-dl dt { color: #5a6172; }
.nc-dl dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }`,
      ),
    },
  },
  {
    id: 'monotonous-spacing',
    name: 'Espacement monotone',
    family: 'cliche',
    severity: 'avertissement',
    description: 'La même valeur d’espacement partout : aucun rythme, aucune variation.',
    fix: 'Resserre les éléments liés et sépare généreusement les sections.',
    demo: {
      bad: v(
        'Profil d’artisan où titre, sous-titre, coordonnées et section suivante sont tous espacés de la même valeur.',
        `<div class="ms" style="--g:16px"><p class="ms-h">Julien Morel</p><p class="ms-s">Menuisier ébéniste</p><p class="ms-m">Saint-Herblain · 06 12 34 56 78</p><p class="ms-h2">Réalisations récentes</p><p class="ms-m">Escalier en chêne, bibliothèque sur mesure, cuisine en noyer.</p></div>`,
        `.ms { padding: 18px; display: flex; flex-direction: column; gap: var(--g); }
.ms-h { font-size: 19px; font-weight: 750; }
.ms-s { font-size: 14px; color: #4b5262; }
.ms-m { font-size: 13px; color: #5a6172; line-height: 1.5; }
.ms-h2 { font-size: 15px; font-weight: 700; }`,
      ),
      good: v(
        'Même profil où nom, métier et coordonnées sont serrés en un bloc, et la section suivante bien séparée.',
        `<div class="ms"><div class="ms-g"><p class="ms-h">Julien Morel</p><p class="ms-s">Menuisier ébéniste</p><p class="ms-m">Saint-Herblain · 06 12 34 56 78</p></div><div class="ms-g"><p class="ms-h2">Réalisations récentes</p><p class="ms-m">Escalier en chêne, bibliothèque sur mesure, cuisine en noyer.</p></div></div>`,
        `.ms { padding: 18px; display: flex; flex-direction: column; gap: 26px; }
.ms-g { display: flex; flex-direction: column; gap: 3px; }
.ms-h { font-size: 19px; font-weight: 750; }
.ms-s { font-size: 14px; color: #4b5262; }
.ms-m { font-size: 13px; color: #5a6172; line-height: 1.5; }
.ms-h2 { font-size: 15px; font-weight: 700; }`,
      ),
    },
  },
  {
    id: 'bounce-easing',
    name: 'Amorti à rebond ou élastique',
    family: 'cliche',
    severity: 'conseil',
    description:
      'Les courbes à rebond ou élastiques font daté et un peu toc. Les objets réels décélèrent en douceur.',
    fix: 'Utilise une décélération exponentielle (ease-out-quart, -quint ou -expo), par exemple `cubic-bezier(0.16, 1, 0.3, 1)`. Un rebond reste légitime quand le sujet rebondit vraiment, comme une balle.',
    demo: {
      bad: v(
        'Graphique de la progression d’une animation dans le temps : la courbe monte, retombe et rebondit trois fois avant de se stabiliser.',
        `<div class="ez"><p class="ez-t">Amorti « rebond »</p><svg viewBox="0 0 270 120" role="presentation"><path d="M24 104 H258 M24 104 V14" stroke="#c3c8d3" fill="none"/><path d="M24 24 H258" stroke="#e3e6ec" stroke-dasharray="4 4" fill="none"/><path d="M24.0 104.0L29.8 103.6L35.6 102.5L41.4 100.6L47.2 98.0L53.0 94.5L58.8 90.4L64.6 85.5L70.4 79.8L76.2 73.4L82.0 66.2L87.8 58.2L93.6 49.6L99.4 40.1L105.2 29.9L108.1 24.5L113.9 28.9L119.7 33.3L125.5 36.9L131.3 39.8L137.1 42.0L142.9 43.3L148.7 44.0L154.5 43.8L160.3 42.9L166.1 41.3L171.9 38.9L177.7 35.7L183.5 31.8L189.3 27.1L192.2 24.5L198.0 26.2L203.8 27.9L209.6 28.8L215.4 29.0L221.2 28.4L227.0 27.0L232.8 25.0L235.7 24.2L241.5 25.1L247.3 25.2L253.1 24.6L256.0 24.0" stroke="#c42b2b" stroke-width="2.5" fill="none"/></svg><p class="ez-l"><span>temps</span><span>arrivée</span></p></div>`,
        `.ez { padding: 14px 16px; }
.ez-t { font-size: 13px; font-weight: 650; }
.ez svg { width: 100%; height: auto; }
.ez-l { display: flex; justify-content: space-between; font-size: 11px; color: #5a6172; padding: 0 6px; }`,
      ),
      good: v(
        'Même graphique avec une courbe qui monte vite puis ralentit doucement jusqu’à l’arrivée, sans dépasser.',
        `<div class="ez"><p class="ez-t">Sortie exponentielle (ease-out-expo)</p><svg viewBox="0 0 270 120" role="presentation"><path d="M24 104 H258 M24 104 V14" stroke="#c3c8d3" fill="none"/><path d="M24 24 H258" stroke="#e3e6ec" stroke-dasharray="4 4" fill="none"/><path d="M24.0 104.0L29.8 91.3L35.6 80.6L41.4 71.6L47.2 64.0L53.0 57.6L58.8 52.3L64.6 47.8L70.4 44.0L76.2 40.8L82.0 38.1L87.8 35.9L93.6 34.0L99.4 32.4L105.2 31.1L111.0 29.9L116.8 29.0L122.6 28.2L128.4 27.5L134.2 27.0L140.0 26.5L145.8 26.1L151.6 25.8L157.4 25.5L163.2 25.3L169.0 25.1L174.8 24.9L180.6 24.7L186.4 24.6L192.2 24.5L198.0 24.4L203.8 24.4L209.6 24.3L215.4 24.3L221.2 24.2L227.0 24.2L232.8 24.2L238.6 24.1L244.4 24.1L250.2 24.1L256.0 24.0" stroke="#1d6b3c" stroke-width="2.5" fill="none"/></svg><p class="ez-l"><span>temps</span><span>arrivée</span></p></div>`,
        `.ez { padding: 14px 16px; }
.ez-t { font-size: 13px; font-weight: 650; }
.ez svg { width: 100%; height: auto; }
.ez-l { display: flex; justify-content: space-between; font-size: 11px; color: #5a6172; padding: 0 6px; }`,
      ),
    },
  },
  {
    id: 'pulsing-dot',
    name: 'Point d’état pulsant',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'De petits points d’état qui pulsent simulent une activité, pour décorer. La pulsation se réserve aux indicateurs liés à des données réellement en direct et changeantes ; un indicateur fixe et clairement libellé est honnête et plus calme.',
    fix: 'Remplace la pulsation par un point fixe et un libellé précis (« vérifié à 14:02 »). Ne fais pulser que ce qui change vraiment sous les yeux du visiteur.',
    demo: {
      bad: v(
        'Pied de page avec un point vert entouré d’un halo qui pulse et le texte « Tous les systèmes sont opérationnels ».',
        `<div class="pd"><span class="pd-dot pd-dot--pulse"></span><span>Tous les systèmes sont opérationnels</span></div>`,
        `.pd { display: flex; align-items: center; gap: 10px; padding: 22px 18px; font-size: 14px; }
.pd-dot { position: relative; flex: none; width: 9px; height: 9px; border-radius: 50%; background: #22c55e; }
.pd-dot--pulse { box-shadow: 0 0 0 5px rgb(34 197 94 / 0.25); }
@media (prefers-reduced-motion: no-preference) {
  .pd-dot--pulse::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #22c55e; animation: pd-ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite; }
}
@keyframes pd-ping { 75%, 100% { transform: scale(2.6); opacity: 0; } }`,
      ),
      good: v(
        'Même pied de page avec un point vert fixe et le texte « Tous les services fonctionnent · vérifié à 14:02 ».',
        `<div class="pd"><span class="pd-dot"></span><span>Tous les services fonctionnent · vérifié à 14:02</span></div>`,
        `.pd { display: flex; align-items: center; gap: 10px; padding: 22px 18px; font-size: 14px; }
.pd-dot { flex: none; width: 9px; height: 9px; border-radius: 50%; background: #16a34a; }`,
      ),
    },
  },
  {
    id: 'blinking-cursor',
    name: 'Curseur clignotant décoratif',
    family: 'cliche',
    severity: 'conseil',
    description:
      'Un curseur de texte clignotant animé dans un héros ou une page d’accueil simule une saisie là où aucun champ n’existe : il emprunte l’esthétique des outils de développeur comme décor. Les vrais champs dessinent leur propre curseur ; ailleurs, la composition doit tenir l’attention sans fausse invite.',
    fix: 'Supprime le faux curseur. Pour évoquer la saisie, montre un vrai champ utilisable.',
    demo: {
      bad: v(
        'Héros avec le titre « Décrivez votre site » suivi d’un curseur rectangulaire clignotant, sans champ de saisie.',
        `<div class="bc"><p class="bc-h">Décrivez votre site<span class="bc-cur"></span></p><p class="bc-p">Notre IA s’occupe du reste.</p></div>`,
        `.bc { padding: 30px 18px; background: #0f1115; color: #f1f2f4; }
.bc-h { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.bc-cur { display: inline-block; width: 12px; height: 26px; margin-inline-start: 4px; vertical-align: -4px; background: #f1f2f4; }
@media (prefers-reduced-motion: no-preference) { .bc-cur { animation: bc-blink 1s steps(1) infinite; } }
@keyframes bc-blink { 50% { opacity: 0; } }
.bc-p { margin-top: 8px; font-size: 14px; color: #b7bcc6; }`,
      ),
      good: v(
        'Héros avec le titre « Décrivez votre site » et un vrai champ de saisie suivi d’un bouton « Générer une maquette ».',
        `<div class="bc"><p class="bc-h">Décrivez votre site</p><div class="bc-form"><span class="bc-in">Un site pour mon gîte en Ardèche, avec réservations</span><span class="bc-btn">Générer une maquette</span></div></div>`,
        `.bc { padding: 30px 18px; background: #0f1115; color: #f1f2f4; }
.bc-h { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.bc-form { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.bc-in { flex: 1; min-width: 180px; padding: 9px 12px; border-radius: 8px; background: #1c1f26; border: 1px solid #3a3f4b; font-size: 13px; color: #d5d8de; }
.bc-btn { padding: 9px 14px; border-radius: 8px; background: #f1f2f4; color: #0f1115; font-weight: 650; font-size: 13px; }`,
      ),
    },
  },
  {
    id: 'shape-assembled-illustration',
    name: 'Illustration assemblée de formes',
    family: 'cliche',
    severity: 'conseil',
    description:
      'Un grand SVG en ligne qui compose une scène à partir d’un tas de formes primitives se lit comme un clipart provisoire, pas comme une illustration. Icônes, logos et graphiques de données vont bien à leur échelle ; un visuel de la taille d’un héros mérite une vraie illustration, une photographie ou un graphique dessiné avec intention.',
    fix: 'Remplace la scène par une vraie image, une photographie, ou montre le produit lui-même au travail.',
    demo: {
      bad: v(
        'Héros d’une application de suivi de chantier illustré par une scène faite de formes simples : soleil rond, montagnes triangulaires, maison carrée et arbres ronds.',
        `<div class="sa"><p class="sa-h">Vos chantiers, sous contrôle</p><svg viewBox="0 0 300 120" role="presentation"><rect width="300" height="120" fill="#e0f2fe"/><circle cx="250" cy="28" r="16" fill="#fbbf24"/><polygon points="0,110 70,40 140,110" fill="#a5b4fc"/><polygon points="90,110 170,30 250,110" fill="#818cf8"/><rect x="170" y="70" width="48" height="40" fill="#f9a8d4"/><polygon points="164,72 194,48 224,72" fill="#f472b6"/><rect x="188" y="88" width="12" height="22" fill="#9d174d"/><circle cx="60" cy="86" r="14" fill="#34d399"/><rect x="57" y="96" width="6" height="14" fill="#92400e"/><circle cx="262" cy="88" r="12" fill="#34d399"/><rect x="259" y="96" width="6" height="14" fill="#92400e"/><rect y="108" width="300" height="12" fill="#86efac"/></svg></div>`,
        `.sa { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.sa-h { font-size: 22px; font-weight: 800; letter-spacing: -0.01em; }
.sa svg { width: 100%; height: auto; border-radius: 10px; }`,
      ),
      good: v(
        'Même héros montrant le produit : la liste des tâches du chantier « Maison Ferrand » avec photos, statuts et dates.',
        `<div class="sa"><p class="sa-h">Vos chantiers, sous contrôle</p><div class="sa-app"><p class="sa-t">Maison Ferrand · Rezé</p><ul><li><span class="sa-ph"></span><span><b>Dalle du garage coulée</b><small>Photo de K. Benali · hier 16:40</small></span><em class="ok">Fait</em></li><li><span class="sa-ph sa-ph--2"></span><span><b>Pose des menuiseries</b><small>Prévu jeudi · 2 personnes</small></span><em>À venir</em></li></ul></div></div>`,
        `.sa { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.sa-h { font-size: 22px; font-weight: 800; letter-spacing: -0.01em; }
.sa-app { border: 1px solid #dfe3ea; border-radius: 12px; padding: 12px; background: #fff; }
.sa-t { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
.sa-app ul { list-style: none; margin: 0; padding: 0; }
.sa-app li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px solid #edf0f3; font-size: 13px; }
.sa-app li > span:nth-child(2) { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.sa-app small { color: #5a6172; font-size: 12px; }
.sa-ph { flex: none; width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(150deg, #9ca3af, #d6d3cd 60%, #a8a29e); }
.sa-ph--2 { background: linear-gradient(150deg, #cbd5e1, #e7e5e4 55%, #94a3b8); }
.sa-app em { font-style: normal; font-size: 12px; font-weight: 650; padding: 2px 8px; border-radius: 999px; background: #eef1f5; color: #3d4657; }
.sa-app em.ok { background: #dcfce7; color: #166534; }`,
      ),
    },
  },
  {
    id: 'organic-clip-path',
    name: 'Contour organique en clip-path',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Un polygone `clip-path` aux nombreux sommets arbitraires, ou un chemin `path()` courbe, c’est du CSS qui imite un bord déchiré, une tache ou une silhouette. Il se lit comme la version au rabais de l’effet, et remplace souvent une matière produite ou photographique par du code.',
    fix: 'Tire un masque alpha de l’image réelle, ou livre la forme en image détourée. Garde `clip-path` pour la géométrie : coins coupés, diagonales, hexagones.',
  },
  {
    id: 'buried-raster',
    name: 'Image enfouie sous un voile',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Une image de fond sous un dégradé presque opaque, ou une image posée sur un élément à l’opacité quasi nulle, n’atteint jamais l’écran : on voit le voile, et la photo ou la texture produite ne sert que d’alibi.',
    fix: 'Laisse la matière se voir (voile sous 0,9 d’opacité, mode de fusion, opacité perceptible) ou retire le fichier.',
  },
  {
    id: 'hard-offset-shadow',
    name: 'Ombre dure décalée',
    family: 'qualite',
    severity: 'conseil',
    description:
      'Une ombre visible, sans flou, décalée d’au moins 4 px peut appartenir à une direction néobrutaliste voulue. C’est une invitation à vérifier qu’elle correspond au design visé, pas une preuve de génération par IA ni une demande de suppression automatique.',
    fix: 'Hors d’un univers réellement néobrutaliste, passe à une ombre douce, avec décalage et flou. Dans un tel univers, garde-la et marque l’usage voulu avec `data-impeccable-ignore="hard-offset-shadow"`.',
    demo: {
      bad: v(
        'Carte bancaire aux couleurs douces et aux coins très arrondis, portant une ombre noire dure décalée vers le bas et la droite.',
        `<div class="ho"><div class="ho-c ho-c--hard"><span class="ho-l">Compte courant</span><span class="ho-a">2 418,60 €</span><span class="ho-s">Mis à jour il y a 5 min</span></div></div>`,
        `.ho { padding: 22px 20px 26px; background: #f3f6fb; }
.ho-c { display: flex; flex-direction: column; gap: 2px; padding: 16px; border-radius: 16px; background: #fff; }
.ho-c--hard { border: 2px solid #1d2230; box-shadow: 6px 6px 0 #1d2230; }
.ho-l { font-size: 13px; color: #4b5262; }
.ho-a { font-size: 26px; font-weight: 800; font-variant-numeric: tabular-nums; }
.ho-s { font-size: 12px; color: #5a6172; }`,
      ),
      good: v(
        'Même carte bancaire avec une ombre douce et diffuse, cohérente avec l’univers arrondi.',
        `<div class="ho"><div class="ho-c"><span class="ho-l">Compte courant</span><span class="ho-a">2 418,60 €</span><span class="ho-s">Mis à jour il y a 5 min</span></div></div>`,
        `.ho { padding: 22px 20px 26px; background: #f3f6fb; }
.ho-c { display: flex; flex-direction: column; gap: 2px; padding: 16px; border-radius: 16px; background: #fff; box-shadow: 0 6px 18px rgb(15 23 42 / 0.10); }
.ho-l { font-size: 13px; color: #4b5262; }
.ho-a { font-size: 26px; font-weight: 800; font-variant-numeric: tabular-nums; }
.ho-s { font-size: 12px; color: #5a6172; }`,
      ),
    },
  },
  {
    id: 'dark-glow',
    name: 'Halo lumineux coloré',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Les ombres lumineuses colorées, qu’il s’agisse d’un halo chromatique sans décalage (`box-shadow` ou `text-shadow`) sur n’importe quel fond ou de toute ombre colorée floue sur fond sombre, sont le look « cool » par défaut des interfaces générées.',
    fix: 'Utilise des ombres d’élévation neutres et un éclairage discret et motivé.',
    demo: {
      bad: v(
        'Carte sombre « Taux d’ouverture 42 % » entourée d’un halo violet lumineux, avec un bouton qui brille.',
        `<div class="dg"><div class="dg-c dg-c--glow"><span class="dg-l">Taux d’ouverture</span><span class="dg-n">42 %</span><span class="dg-b dg-b--glow">Voir le rapport</span></div></div>`,
        `.dg { padding: 26px 22px; background: #0b0b1a; }
.dg-c { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 16px; border-radius: 14px; background: #161629; color: #e7e5f4; }
.dg-c--glow { box-shadow: 0 0 32px rgb(139 92 246 / 0.55); border: 1px solid rgb(167 139 250 / 0.5); }
.dg-l { font-size: 13px; color: #c4b5fd; }
.dg-n { font-size: 28px; font-weight: 800; }
.dg-b { margin-top: 8px; padding: 7px 12px; border-radius: 8px; background: #7c3aed; color: #fff; font-size: 13px; font-weight: 600; }
.dg-b--glow { box-shadow: 0 0 18px rgb(124 58 237 / 0.8); }`,
      ),
      good: v(
        'Même carte sur fond sombre, détachée par une surface un peu plus claire et une ombre neutre, bouton sans halo.',
        `<div class="dg"><div class="dg-c"><span class="dg-l">Taux d’ouverture</span><span class="dg-n">42 %</span><span class="dg-b">Voir le rapport</span></div></div>`,
        `.dg { padding: 26px 22px; background: #0f1218; }
.dg-c { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 16px; border-radius: 14px; background: #1a1f29; color: #eef0f3; border: 1px solid #2a313d; box-shadow: 0 8px 20px rgb(0 0 0 / 0.35); }
.dg-l { font-size: 13px; color: #aeb6c2; }
.dg-n { font-size: 28px; font-weight: 800; }
.dg-b { margin-top: 8px; padding: 7px 12px; border-radius: 8px; background: #e9c46a; color: #1a1f29; font-size: 13px; font-weight: 650; }`,
      ),
    },
  },
  {
    id: 'radial-halo',
    name: 'Halo radial en fond',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un lavis chromatique en dégradé radial, saturé au centre et qui s’estompe vers le transparent, utilisé comme lueur décorative sur une page sombre. Même tic que les ombres lumineuses, dessiné avec un dégradé au lieu d’une ombre.',
    fix: 'Ancre la surface avec un fond uni, ou très légèrement nuancé.',
    demo: {
      bad: v(
        'Héros sombre avec une grande lueur violette et cyan en dégradé radial derrière le titre.',
        `<div class="rh rh--halo"><p class="rh-h">Votre équipe, enfin alignée</p><p class="rh-p">Objectifs, tâches et comptes rendus au même endroit.</p></div>`,
        `.rh { padding: 40px 20px; color: #f4f4f8; text-align: center; background: #0b0b1a; }
.rh--halo { background: radial-gradient(circle at 50% 45%, rgb(139 92 246 / 0.75) 0%, rgb(34 211 238 / 0.25) 35%, transparent 65%), #0b0b1a; }
.rh-h { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.rh-p { margin-top: 8px; font-size: 14px; color: #c9c9d6; }`,
      ),
      good: v(
        'Même héros sur un fond sombre uni, très légèrement plus clair vers le bas.',
        `<div class="rh"><p class="rh-h">Votre équipe, enfin alignée</p><p class="rh-p">Objectifs, tâches et comptes rendus au même endroit.</p></div>`,
        `.rh { padding: 40px 20px; color: #f4f4f8; text-align: center; background: linear-gradient(180deg, #12141b, #1a1d26); }
.rh-h { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.rh-p { margin-top: 8px; font-size: 14px; color: #c9ccd6; }`,
      ),
    },
  },
  {
    id: 'radial-spotlight-glow',
    name: 'Projecteur radial décoratif',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un dégradé radial de la couleur d’accent qui s’estompe vers le transparent, posé derrière un héros ou une section comme un « projecteur », assez lumineux par rapport à la surface pour flotter comme un nuage au-dessus du texte. Un réflexe décoratif, cousin translucide du halo radial saturé.',
    fix: 'Laisse la surface tenir seule, ou éclaire la composition par un accent de matière délibéré plutôt que par une brume colorée.',
  },
  {
    id: 'marquee',
    name: 'Bandeau défilant automatique',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un contenu qui défile en continu réclame une attention qu’il n’a pas méritée et cache la moitié de son contenu à tout moment.',
    fix: 'Réserve le mouvement à ce qui change et laisse le lecteur avancer à son rythme : une grille fixe se lit en entier. Un défilement automatique de plus de 5 secondes doit pouvoir être mis en pause (WCAG 2.2.2).',
    demo: {
      bad: v(
        'Bandeau de noms de clients qui défile horizontalement en continu, coupé aux deux bords.',
        `<div class="mq"><p class="mq-t">Ils nous font confiance</p><div class="mq-track"><div class="mq-row"><span>Boulangerie Lebrun</span><span>Garage Martineau</span><span>Cabinet Roux</span><span>Fleurs de Loire</span><span>Menuiserie Morel</span><span>Boulangerie Lebrun</span><span>Garage Martineau</span></div></div></div>`,
        `.mq { padding: 18px 0; }
.mq-t { padding: 0 18px 10px; font-size: 13px; font-weight: 650; color: #4b5262; }
.mq-track { overflow: hidden; }
.mq-row { display: flex; gap: 28px; width: max-content; transform: translateX(-60px); font-size: 15px; font-weight: 700; color: #6b7280; white-space: nowrap; }
@media (prefers-reduced-motion: no-preference) { .mq-row { animation: mq-move 9s linear infinite; } }
@keyframes mq-move { from { transform: translateX(0); } to { transform: translateX(-50%); } }`,
      ),
      good: v(
        'Même liste de clients posée en grille fixe, tous les noms visibles.',
        `<div class="mq"><p class="mq-t">Ils nous font confiance</p><div class="mq-grid"><span>Boulangerie Lebrun</span><span>Garage Martineau</span><span>Cabinet Roux</span><span>Fleurs de Loire</span><span>Menuiserie Morel</span><span>Imprimerie Vallet</span></div></div>`,
        `.mq { padding: 18px; }
.mq-t { padding-bottom: 10px; font-size: 13px; font-weight: 650; color: #4b5262; }
.mq-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px 16px; font-size: 14px; font-weight: 700; color: #4b5262; }`,
      ),
    },
  },
  {
    id: 'icon-tile-stack',
    name: 'Tuile d’icône au-dessus du titre',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un petit carré arrondi contenant une icône, posé au-dessus d’un titre : le gabarit universel de la « carte de fonctionnalité » générée. Chaque générateur produit exactement cette forme.',
    fix: 'Place l’icône à côté du titre, ou laisse-la dans le flux sans conteneur.',
    demo: {
      bad: v(
        'Deux blocs de fonctionnalités, chacun avec un carré arrondi violet pâle contenant une icône, empilé au-dessus du titre.',
        `<div class="it"><div class="it-f"><span class="it-tile"><i data-icon="refresh-cw" style="--ico:18px"></i></span><b>Synchronisation bancaire</b><span>Tes relevés arrivent chaque nuit.</span></div><div class="it-f"><span class="it-tile"><i data-icon="send" style="--ico:18px"></i></span><b>Relances automatiques</b><span>Un rappel part à J+7.</span></div></div>`,
        `.it { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 18px; }
.it-f { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #5a6172; }
.it-f b { font-size: 15px; color: #1d2230; }
.it-tile { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #ede9fe, #e0e7ff); color: #6d28d9; }`,
      ),
      good: v(
        'Mêmes fonctionnalités en liste, chaque icône posée à côté de son titre, sans conteneur.',
        `<div class="it"><div class="it-f"><b><i data-icon="refresh-cw" style="--ico:16px"></i>Synchronisation bancaire</b><span>Tes relevés arrivent chaque nuit.</span></div><div class="it-f"><b><i data-icon="send" style="--ico:16px"></i>Relances automatiques</b><span>Un rappel part à J+7.</span></div></div>`,
        `.it { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 18px; }
.it-f { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #5a6172; }
.it-f b { display: flex; align-items: center; gap: 8px; font-size: 15px; color: #1d2230; }
.it-f .mk-ico { color: #14532d; }`,
      ),
    },
  },
  {
    id: 'italic-serif-display',
    name: 'Titre italique à empattements',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un très grand titre en italique à empattements (Fraunces, Recoleta, Playfair, Newsreader en italique) en titre principal du héros a l’air raffiné isolément, mais il est devenu le héros universel des pages d’accueil de startups générées. Le registre éditorial ou magazine peut légitimement le vouloir : juge selon le contexte.',
    fix: 'Passe le titre en romain, ou choisis une police d’affichage sans empattements. Garde l’italique quand le registre éditorial le justifie.',
    demo: {
      bad: v(
        'Héros d’une application de prise de notes avec un très grand titre en italique à empattements.',
        `<div class="is"><p class="is-h is-h--it">L’assistant qui écrit vos comptes rendus</p><p class="is-p">Enregistre la réunion, reçois le compte rendu en 2 minutes.</p></div>`,
        `.is { padding: 26px 18px; }
.is-h { font-size: 32px; line-height: 1.08; color: #1d2230; }
.is-h--it { font-family: "Fraunces", "Playfair Display", Georgia, "Liberation Serif", serif; font-style: italic; font-weight: 500; }
.is-p { margin-top: 10px; font-size: 14px; color: #4b5262; }`,
      ),
      good: v(
        'Même héros avec un titre romain sans empattements, plus compact et gras.',
        `<div class="is"><p class="is-h">L’assistant qui écrit vos comptes rendus</p><p class="is-p">Enregistre la réunion, reçois le compte rendu en 2 minutes.</p></div>`,
        `.is { padding: 26px 18px; }
.is-h { font-size: 28px; line-height: 1.1; font-weight: 800; letter-spacing: -0.02em; color: #1d2230; }
.is-p { margin-top: 10px; font-size: 14px; color: #4b5262; }`,
      ),
    },
  },
  {
    id: 'hero-eyebrow-chip',
    name: 'Pastille « eyebrow » du héros',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un minuscule libellé en capitales espacées posé juste au-dessus d’un très grand titre de héros, ou la même forme rendue en pastille arrondie : c’est désormais le héros SaaS généré par défaut.',
    fix: 'Supprime-le, intègre l’information au titre, ou fais-en un fil d’Ariane de navigation.',
    demo: {
      bad: v(
        'Héros avec une pastille arrondie violette « Nouveau · Facturation IA » en capitales espacées au-dessus d’un grand titre.',
        `<div class="sh"><span class="sh-chip"><i data-icon="sparkles" style="--ico:13px"></i>Nouveau · Facturation IA</span><p class="sh-h">La facturation qui se fait toute seule</p><p class="sh-p">Devis, factures et relances au même endroit.</p></div>`,
        SLOP_HERO,
      ),
      good: v(
        'Même héros sans pastille ; la nouveauté est intégrée dans le titre et précisée dans le texte.',
        `<div class="ch"><p class="ch-h">Tes relances d’impayés partent seules, à J+7</p><p class="ch-p">Nouveau depuis mars : Facturo rédige la relance à partir de ta facture, tu valides en un clic.</p></div>`,
        CLEAN_HERO,
      ),
    },
  },
  {
    id: 'kicker-above-heading',
    name: 'Sur-titre au-dessus d’un titre',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un petit libellé en capitales espacées (ou en petites capitales) posé en bloc juste au-dessus d’un titre est interdit sans exception, répété ou non. Un sur-titre généré ne mérite jamais sa place : le titre porte son propre poids.',
    fix: 'Supprime le libellé et laisse parler le titre. Si ses mots comptent, intègre-les au titre ou au texte.',
    demo: {
      bad: v(
        'Section avec le libellé « NOTRE MÉTHODE » en petites capitales espacées au-dessus du titre « Comment ça marche ».',
        `<div class="kh"><p class="kh-k">NOTRE MÉTHODE</p><p class="kh-h">Comment ça marche</p><p class="kh-p">Tu photographies ton ticket, nous saisissons la dépense.</p></div>`,
        `.kh { padding: 22px 18px; }
.kh-k { font-size: 11px; font-weight: 700; letter-spacing: .18em; color: #0e7490; }
.kh-h { margin-top: 8px; font-size: 22px; font-weight: 750; }
.kh-p { margin-top: 6px; font-size: 14px; color: #4b5262; }`,
      ),
      good: v(
        'Même section sans libellé : le titre dit directement « Photographie ton ticket, la dépense se saisit seule ».',
        `<div class="kh"><p class="kh-h">Photographie ton ticket, la dépense se saisit seule</p><p class="kh-p">Montant, TVA et fournisseur sont lus sur la photo ; tu n’as qu’à vérifier.</p></div>`,
        `.kh { padding: 22px 18px; }
.kh-h { font-size: 22px; font-weight: 750; line-height: 1.2; }
.kh-p { margin-top: 6px; font-size: 14px; color: #4b5262; }`,
      ),
    },
  },
  {
    id: 'numbered-section-labels',
    name: 'Petits numéros de section',
    family: 'cliche',
    severity: 'conseil',
    description:
      'De petits numéros d’index accolés aux titres de section, répétés de section en section, sont un échafaudage éditorial généré : une page qui numérote ses propres chapitres au lieu de mériter sa structure.',
    fix: 'Laisse la hiérarchie, le contenu et le rythme porter la séquence. Garde les numéros quand l’ordre est une information, comme les étapes d’une procédure.',
    demo: {
      bad: v(
        'Page de présentation dont chaque titre de section est précédé d’un petit numéro « 01 », « 02 », « 03 ».',
        `<div class="ns"><p class="ns-r"><span>01</span>Le studio</p><p class="ns-p">Nous dessinons des intérieurs de restaurants depuis 2012.</p><p class="ns-r"><span>02</span>Nos projets</p><p class="ns-p">Quarante salles livrées, de Nantes à Bordeaux.</p><p class="ns-r"><span>03</span>Contact</p></div>`,
        `.ns { padding: 18px; }
.ns-r { display: flex; align-items: baseline; gap: 10px; margin-top: 16px; font-size: 18px; font-weight: 700; }
.ns-r:first-child { margin-top: 0; }
.ns-r span { font-size: 11px; font-weight: 600; color: #9a3f17; letter-spacing: .08em; font-variant-numeric: tabular-nums; }
.ns-p { margin-top: 4px; font-size: 14px; color: #4b5262; }`,
      ),
      good: v(
        'Même page avec des titres de section sans numéros, l’ordre porté par la hiérarchie et l’espace.',
        `<div class="ns"><p class="ns-r">Le studio</p><p class="ns-p">Nous dessinons des intérieurs de restaurants depuis 2012.</p><p class="ns-r">Nos projets</p><p class="ns-p">Quarante salles livrées, de Nantes à Bordeaux.</p><p class="ns-r">Contact</p></div>`,
        `.ns { padding: 18px; }
.ns-r { margin-top: 18px; font-size: 18px; font-weight: 700; }
.ns-r:first-child { margin-top: 0; }
.ns-p { margin-top: 4px; font-size: 14px; color: #4b5262; }`,
      ),
    },
  },
  {
    id: 'em-dash-overuse',
    name: 'Abus de tirets cadratins',
    family: 'cliche',
    severity: 'conseil',
    description:
      'La saturation de tirets cadratins dans le texte courant est un tic de cadence des textes générés. Règle consultative : on emploie ce tiret légitimement, donc elle ne se déclenche qu’en cas de saturation, au moins 8 tirets (— ou --) à une densité proche d’un pour 500 caractères, jamais sur un long article qui en contient quelques-uns.',
    fix: 'Préfère la virgule, les deux-points, le point ou les parenthèses.',
    demo: {
      bad: v(
        'Paragraphe de présentation hachuré de huit tirets cadratins.',
        `<div class="tp"><p class="tp-h">Notre approche</p><p style="font-size:14px;line-height:1.6">Nous croyons à la simplicité — vraiment. Chaque fonction — même la plus petite — est pensée pour vous — artisans, commerçants, indépendants — qui n’avez pas de temps à perdre. Le résultat — une application rapide — fiable — et agréable.</p></div>`,
        PARA_CSS,
      ),
      good: v(
        'Même paragraphe réécrit avec des virgules, des deux-points et des points.',
        `<div class="tp"><p class="tp-h">Notre approche</p><p style="font-size:14px;line-height:1.6">Chaque fonction est pensée pour les artisans, commerçants et indépendants qui n’ont pas de temps à perdre. Le résultat : une application rapide et fiable.</p></div>`,
        PARA_CSS,
      ),
    },
  },
  {
    id: 'marketing-buzzword',
    name: 'Jargon marketing',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Les formules SaaS génériques (streamline, empower, supercharge, world-class, enterprise-grade, next-generation, cutting-edge…) trahissent immédiatement un texte généré. Le détecteur repère ces tournures anglaises ; en français, « boostez », « révolutionnez », « de nouvelle génération » ou « de pointe » trahissent le même réflexe.',
    fix: 'Choisis un verbe et un nom précis qui disent ce que le produit fait littéralement.',
    demo: {
      bad: v(
        'Accroche « Boostez votre productivité grâce à une plateforme de nouvelle génération » et un sous-titre vague.',
        `<div class="ch"><p class="ch-h">Boostez votre productivité grâce à une plateforme de nouvelle génération</p><p class="ch-p">Une solution de pointe pour révolutionner votre gestion.</p></div>`,
        CLEAN_HERO,
      ),
      good: v(
        'Accroche « Tes devis signés deviennent des factures en un clic » et un sous-titre concret.',
        `<div class="ch"><p class="ch-h">Tes devis signés deviennent des factures en un clic</p><p class="ch-p">Les lignes, la TVA et l’acompte sont repris tels quels ; il ne reste qu’à envoyer.</p></div>`,
        CLEAN_HERO,
      ),
    },
  },
  {
    id: 'aphoristic-cadence',
    name: 'Cadence aphoristique',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Trois sections ou plus qui se terminent sur une courte réplique (« X. Pas de Y. », « X. Juste Y. ») ou sur un aphorisme à contraste fabriqué (« Pas une fonctionnalité. Une plateforme. ») sonnent comme une cadence générée, pas comme une voix. Une fois, ça passe ; c’est la répétition qui trahit.',
    fix: 'Termine chaque section par une information utile, et varie la forme et la longueur des phrases.',
    demo: {
      bad: v(
        'Trois arguments qui se terminent chacun par une formule courte du type « Pas de friction. Juste des résultats. ».',
        `<div class="ac"><p><b>Saisie</b> Tes dépenses arrivent seules. Pas de friction. Juste des résultats.</p><p><b>Relances</b> Les impayés sont suivis. Pas de stress. Juste de la sérénité.</p><p><b>Export</b> Ton comptable reçoit tout. Pas un outil. Un partenaire.</p></div>`,
        `.ac { padding: 18px; display: flex; flex-direction: column; gap: 10px; font-size: 14px; line-height: 1.5; color: #3a4150; }
.ac b { display: block; color: #1d2230; }`,
      ),
      good: v(
        'Mêmes trois arguments, chacun terminé par une information précise : horaire, délai, format.',
        `<div class="ac"><p><b>Saisie</b> Tes dépenses arrivent chaque nuit depuis ta banque, classées par catégorie.</p><p><b>Relances</b> Un rappel poli part à J+7, un second à J+21 ; tu peux modifier les textes.</p><p><b>Export</b> Ton comptable reçoit un fichier FEC le 5 de chaque mois.</p></div>`,
        `.ac { padding: 18px; display: flex; flex-direction: column; gap: 10px; font-size: 14px; line-height: 1.5; color: #3a4150; }
.ac b { display: block; color: #1d2230; }`,
      ),
    },
  },
  {
    id: 'oversized-h1',
    name: 'Titre de héros surdimensionné',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Un titre en phrase complète composé en taille d’affichage finit par dominer l’écran et ne laisse place à rien d’autre dans le premier écran. Un titre percutant d’un ou deux mots à cette taille va bien ; le problème, c’est une phrase longue gonflée à l’extrême. Le détecteur vise un h1 d’au moins 72 px et 40 caractères qui occupe une grande part de l’écran.',
    fix: 'Compose les titres longs plus petits, ou resserre le texte.',
    demo: {
      bad: v(
        'Écran de téléphone entièrement occupé par un titre de onze mots en très grand corps ; ni texte ni bouton visibles.',
        `<div class="oh"><p class="oh-h oh-h--big">Gérez toutes vos factures, vos devis et vos relances au même endroit</p></div>`,
        `.oh { padding: 18px 16px 22px; min-height: 300px; }
.oh-h { font-weight: 800; letter-spacing: -0.02em; color: #1d2230; }
.oh-h--big { font-size: 44px; line-height: 1.02; }`,
        { frame: 'phone' },
      ),
      good: v(
        'Même écran avec un titre resserré en taille raisonnable, un texte et un bouton visibles dans le premier écran.',
        `<div class="oh"><p class="oh-h">Factures, devis et relances au même endroit</p><p class="oh-p">Pensé pour les artisans : tout se fait depuis le téléphone, même sur le chantier.</p><span class="mk-btn mk-btn--block">Créer mon premier devis</span></div>`,
        `.oh { padding: 18px 16px 22px; min-height: 300px; display: flex; flex-direction: column; gap: 12px; }
.oh-h { font-size: 28px; line-height: 1.1; font-weight: 800; letter-spacing: -0.02em; color: #1d2230; }
.oh-p { font-size: 15px; line-height: 1.5; color: #4b5262; }`,
        { frame: 'phone' },
      ),
    },
  },
  {
    id: 'extreme-negative-tracking',
    name: 'Approche écrasée',
    family: 'cliche',
    severity: 'avertissement',
    description:
      'Une approche (`letter-spacing`) resserrée au-delà du point où les caractères gardent leur forme coûte en lisibilité. Le détecteur la signale sous −0,07em sur du texte courant et sous −0,09em pour un affichage de 40 px ou plus.',
    fix: 'Resserre optiquement, sans détruire les lettres : le plancher de qualité s’arrête à −0,04em, et −0,02 à −0,03em se lit généralement mieux.',
    demo: {
      bad: v('Grand titre « Planifiez sans friction » dont les lettres se touchent.', `<div class="nt"><p style="letter-spacing:-0.1em">Planifiez sans friction</p></div>`, `.nt { padding: 30px 18px; } .nt p { font-size: 42px; line-height: 1.05; font-weight: 800; }`),
      good: v('Même titre avec un resserrement léger, les lettres restent distinctes.', `<div class="nt"><p style="letter-spacing:-0.02em">Planifiez sans friction</p></div>`, `.nt { padding: 30px 18px; } .nt p { font-size: 42px; line-height: 1.05; font-weight: 800; }`),
    },
  },
  {
    id: 'broken-image',
    name: 'Image cassée ou provisoire',
    family: 'qualite',
    severity: 'avertissement',
    description: 'Des balises `<img>` à `src` vide, absent ou provisoire s’affichent comme des cadres d’image cassée.',
    fix: 'Utilise de vraies images ou des visuels produits, ou retire la balise.',
    demo: {
      bad: v(
        'Fiche de plat dont l’image est un cadre vide en pointillés avec une petite icône et le nom de fichier « plat-du-jour.jpg ».',
        `<div class="bi"><div class="bi-img bi-img--broken"><i data-icon="image" style="--ico:16px"></i><span>plat-du-jour.jpg</span></div><b>Cabillaud, beurre blanc</b><span>Légumes du marché · 18,50 €</span></div>`,
        `.bi { padding: 16px; display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #4b5262; }
.bi b { margin-top: 6px; font-size: 15px; color: #1d2230; }
.bi-img { aspect-ratio: 16 / 9; border-radius: 10px; background: linear-gradient(160deg, #f1efe9 0%, #e2d6c3 45%, #c9b27f 70%, #8a9a6b 100%); }
.bi-img--broken { display: flex; align-items: flex-start; gap: 6px; padding: 8px; background: #fff; border: 1px dashed #b7bcc6; color: #6b7280; font-size: 12px; }`,
      ),
      good: v(
        'Même fiche avec une vraie photographie du plat en tête.',
        `<div class="bi"><div class="bi-img" role="img" aria-label="Photographie du plat"></div><b>Cabillaud, beurre blanc</b><span>Légumes du marché · 18,50 €</span></div>`,
        `.bi { padding: 16px; display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #4b5262; }
.bi b { margin-top: 6px; font-size: 15px; color: #1d2230; }
.bi-img { aspect-ratio: 16 / 9; border-radius: 10px; background: radial-gradient(circle at 45% 55%, #fbfaf6 0 22%, #e9dfc8 23% 30%, transparent 31%), radial-gradient(circle at 60% 48%, #f4efe4 0 14%, transparent 15%), linear-gradient(160deg, #3d4a3a 0%, #6b7a55 55%, #2f3a2c 100%); }`,
      ),
    },
  },
  {
    id: 'script-error',
    name: 'Erreur de script au chargement',
    family: 'qualite',
    severity: 'erreur',
    description:
      'Un script a levé une exception non interceptée, ou n’a pas pu être analysé, pendant le chargement de la page. Un JavaScript cassé tue en silence les révélations, les interactions et le contenu dynamique, et peut laisser l’essentiel de la page invisible.',
    fix: 'Corrige l’erreur avant de juger quoi que ce soit d’autre.',
  },
  {
    id: 'content-hidden-at-rest',
    name: 'Contenu invisible au repos',
    family: 'qualite',
    severity: 'erreur',
    description:
      'Une grande part du texte de la page reste à `opacity: 0` ou en `visibility: hidden`, même après que chaque gestionnaire de révélation a eu sa chance : la signature d’une révélation ratée. Le contenu a bien été livré, mais il ne devient jamais visible.',
    fix: 'Rends le contenu visible par défaut, et laisse JavaScript améliorer son entrée au lieu de conditionner son existence.',
    demo: {
      bad: v(
        'Page dont seule la barre de navigation s’affiche ; le reste est une grande zone blanche.',
        `<div class="hr"><div class="hr-nav"><b>Gîte des Sapins</b><span>Chambres</span><span>Accès</span><span>Réserver</span></div><div class="hr-empty"></div></div>`,
        `.hr-nav { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; padding: 10px 16px; font-size: 13px; border-bottom: 1px solid #e3e6ec; }
.hr-nav b { margin-inline-end: auto; }
.hr-empty { height: 190px; }`,
        { frame: 'browser' },
      ),
      good: v(
        'Même page avec son contenu visible : titre, disponibilités et bouton de réservation.',
        `<div class="hr"><div class="hr-nav"><b>Gîte des Sapins</b><span>Chambres</span><span>Accès</span><span>Réserver</span></div><div class="hr-body"><p class="hr-h">Un gîte de 6 places au-dessus de Lamastre</p><p class="hr-p">Libre du 12 au 19 juillet · 640 € la semaine, ménage compris.</p><span class="mk-btn">Voir les disponibilités</span></div></div>`,
        `.hr-nav { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; padding: 10px 16px; font-size: 13px; border-bottom: 1px solid #e3e6ec; }
.hr-nav b { margin-inline-end: auto; }
.hr-body { height: 190px; padding: 22px 16px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
.hr-h { font-size: 21px; font-weight: 800; line-height: 1.2; }
.hr-p { font-size: 14px; color: #4b5262; }`,
        { frame: 'browser' },
      ),
    },
  },
  {
    id: 'edge-flush-cards',
    name: 'Cartes collées au bord du défilement',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Dans un défilement horizontal ou un panneau d’onglets, les cartes touchent le bord du conteneur au repos tout en gardant une gouttière de l’autre côté : leurs bords et leurs coins arrondis sont coupés. En général, le panneau est plus large que sa zone de découpe.',
    fix: 'Garde une marge intérieure identique des deux côtés.',
    demo: {
      bad: v(
        'Rangée défilante de cartes de recettes dont la première est coupée net contre le bord gauche.',
        `<div class="ef"><p class="ef-t">Recettes de saison</p><div class="ef-clip"><div class="ef-row ef-row--flush"><span class="ef-c"><b>Velouté de potimarron</b>25 min</span><span class="ef-c"><b>Tarte fine aux poireaux</b>40 min</span><span class="ef-c"><b>Crumble pommes-coings</b>50 min</span></div></div></div>`,
        `.ef { padding: 16px 0; }
.ef-t { padding: 0 16px 8px; font-size: 14px; font-weight: 700; }
.ef-clip { overflow: hidden; }
.ef-row { display: flex; gap: 10px; padding: 0 16px; }
.ef-row--flush { margin-inline-start: -30px; }
.ef-c { flex: none; width: 150px; display: flex; flex-direction: column; gap: 2px; padding: 12px; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; font-size: 12px; color: #7c2d12; }
.ef-c b { font-size: 13px; color: #431407; }`,
      ),
      good: v(
        'Même rangée défilante avec la même marge de 16 px à gauche et à droite ; la première carte est entière.',
        `<div class="ef"><p class="ef-t">Recettes de saison</p><div class="ef-clip"><div class="ef-row"><span class="ef-c"><b>Velouté de potimarron</b>25 min</span><span class="ef-c"><b>Tarte fine aux poireaux</b>40 min</span><span class="ef-c"><b>Crumble pommes-coings</b>50 min</span></div></div></div>`,
        `.ef { padding: 16px 0; }
.ef-t { padding: 0 16px 8px; font-size: 14px; font-weight: 700; }
.ef-clip { overflow: hidden; }
.ef-row { display: flex; gap: 10px; padding: 0 16px; }
.ef-c { flex: none; width: 150px; display: flex; flex-direction: column; gap: 2px; padding: 12px; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; font-size: 12px; color: #7c2d12; }
.ef-c b { font-size: 13px; color: #431407; }`,
      ),
    },
  },
  {
    id: 'text-occlusion',
    name: 'Texte masqué par un élément',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Un texte est peint sous un élément opaque ou sous un autre texte, si bien qu’une partie devient illisible : une boîte décorative, une couche empilée ou un élément en ligne au padding débordant se pose sur les mots au lieu de se mettre à côté.',
    fix: 'Donne de la place aux couches qui se chevauchent, ou sors le texte de sous la couche supérieure.',
    demo: {
      bad: v(
        'Fiche produit dont la pastille rouge « −20 % » recouvre le début du nom du produit.',
        `<div class="to"><div class="to-img"></div><div class="to-body"><span class="to-badge to-badge--over">−20 %</span><b>Sac cabas en lin lavé</b><span>Naturel · 39,20 € au lieu de 49 €</span></div></div>`,
        `.to { padding: 16px; }
.to-img { aspect-ratio: 16 / 7; border-radius: 10px; background: linear-gradient(150deg, #e7dfd0, #c9b99b 60%, #a8916b); }
.to-body { position: relative; display: flex; flex-direction: column; gap: 2px; margin-top: 10px; font-size: 13px; color: #4b5262; }
.to-body b { font-size: 15px; color: #1d2230; }
.to-badge { padding: 3px 10px; border-radius: 6px; background: #c42b2b; color: #fff; font-size: 13px; font-weight: 700; }
.to-badge--over { position: absolute; left: -2px; top: -4px; }`,
      ),
      good: v(
        'Même fiche avec la pastille « −20 % » posée sur l’image, le nom du produit entièrement lisible.',
        `<div class="to"><div class="to-img"><span class="to-badge">−20 %</span></div><div class="to-body"><b>Sac cabas en lin lavé</b><span>Naturel · 39,20 € au lieu de 49 €</span></div></div>`,
        `.to { padding: 16px; }
.to-img { aspect-ratio: 16 / 7; border-radius: 10px; padding: 8px; background: linear-gradient(150deg, #e7dfd0, #c9b99b 60%, #a8916b); }
.to-body { display: flex; flex-direction: column; gap: 2px; margin-top: 10px; font-size: 13px; color: #4b5262; }
.to-body b { font-size: 15px; color: #1d2230; }
.to-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; background: #c42b2b; color: #fff; font-size: 13px; font-weight: 700; }`,
      ),
    },
  },
  {
    id: 'first-viewport-column-overflow',
    name: 'Colonne qui étire le premier écran',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Dans une ouverture à plusieurs colonnes, une colonne descend bien au-delà du premier écran pendant que sa voisine y tient : la colonne courte flotte dans le vide et la limite du premier écran tombe au milieu d’une section.',
    fix: 'Équilibre les colonnes, plafonne la plus haute, ou laisse le contenu long continuer sous la rangée d’ouverture.',
  },
  {
    id: 'gray-on-color',
    name: 'Texte gris sur fond coloré',
    family: 'qualite',
    severity: 'avertissement',
    description: 'Un texte gris paraît délavé sur un fond coloré.',
    fix: 'Prends une nuance plus foncée de la couleur du fond, ou un blanc ou quasi-blanc sur un fond foncé.',
    demo: {
      bad: v(
        'Encadré jaune pâle avec un texte gris moyen à peine lisible.',
        `<div class="gy"><div class="gy-b"><b>Livraison en point relais</b><p class="gy-gray">Ton colis t’attend 10 jours ouvrés au point relais choisi. Pense à te munir d’une pièce d’identité.</p></div></div>`,
        `.gy { padding: 16px; }
.gy-b { padding: 14px; border-radius: 10px; background: #fef3c7; font-size: 14px; line-height: 1.5; }
.gy-b b { color: #78350f; }
.gy-gray { margin-top: 4px; color: #9ca3af; }`,
      ),
      good: v(
        'Même encadré avec le texte en brun ambré foncé, tiré de la couleur du fond.',
        `<div class="gy"><div class="gy-b"><b>Livraison en point relais</b><p>Ton colis t’attend 10 jours ouvrés au point relais choisi. Pense à te munir d’une pièce d’identité.</p></div></div>`,
        `.gy { padding: 16px; }
.gy-b { padding: 14px; border-radius: 10px; background: #fef3c7; font-size: 14px; line-height: 1.5; color: #78350f; }
.gy-b p { margin-top: 4px; }`,
      ),
    },
  },
  {
    id: 'low-contrast',
    name: 'Contraste insuffisant',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Le texte n’atteint pas les exigences de contraste WCAG niveau AA : 4,5:1 pour le texte courant, 3:1 pour le grand texte.',
    fix: 'Augmente le contraste entre le texte et son fond, en assombrissant le texte ou en éclaircissant le fond.',
    demo: {
      bad: para('Paragraphe sur les retours en gris clair sur fond blanc, contraste d’environ 2,3:1.', 'font-size:14px;line-height:1.6;color:#a8adb7'),
      good: para('Même paragraphe en gris foncé sur fond blanc, contraste d’environ 7,8:1.', 'font-size:14px;line-height:1.6;color:#4b5262'),
    },
  },
  {
    id: 'line-length',
    name: 'Lignes trop longues',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Au-delà d’environ 80 caractères par ligne, le texte devient difficile à lire : l’œil perd sa place en revenant au début de la ligne suivante. La règle mesure les lignes réellement rendues et se déclenche quand plusieurs d’entre elles sont trop longues.',
    fix: 'Ajoute une largeur maximale de 65 à 75ch aux conteneurs de texte.',
  },
  {
    id: 'cramped-padding',
    name: 'Marge intérieure étriquée',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Le texte est trop près du bord de son conteneur. Deux formes : un élément dont le texte touche presque sa propre bordure, compte tenu de la taille du texte ; un conteneur dont le texte des enfants arrive contre une limite visible (bordure, contour, fond coloré) sans rien pour l’en écarter.',
    fix: 'Ménage au moins 8 px d’espace, idéalement 12 à 16 px, à l’intérieur des conteneurs bordés, entourés ou colorés.',
    demo: {
      bad: v(
        'Encadré bleu pâle bordé dont le texte touche presque la bordure, avec 3 px de marge intérieure.',
        `<div class="cp"><div class="cp-b" style="padding:3px 4px"><b>Paiement en trois fois</b> sans frais dès 150 € d’achat, avec ta carte bancaire.</div></div>`,
        `.cp { padding: 18px; }
.cp-b { border: 1px solid #93c5fd; border-radius: 8px; background: #eff6ff; color: #1e3a8a; font-size: 14px; line-height: 1.5; }`,
      ),
      good: v(
        'Même encadré avec 14 px de marge intérieure ; le texte respire.',
        `<div class="cp"><div class="cp-b" style="padding:12px 14px"><b>Paiement en trois fois</b> sans frais dès 150 € d’achat, avec ta carte bancaire.</div></div>`,
        `.cp { padding: 18px; }
.cp-b { border: 1px solid #93c5fd; border-radius: 8px; background: #eff6ff; color: #1e3a8a; font-size: 14px; line-height: 1.5; }`,
      ),
    },
  },
  {
    id: 'body-text-viewport-edge',
    name: 'Texte collé au bord de l’écran',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Des paragraphes s’affichent contre le bord gauche ou droit de l’écran, sans conteneur qui leur donne une marge horizontale : à moins de 16 px, ou de 12 px sur les écrans de 480 px de large ou moins. Un texte qui dépasse le bord de l’écran est signalé une fois par page comme débordement, en nommant l’élément le plus large.',
    fix: 'Place le contenu dans un conteneur avec au moins 16 px de marge horizontale (idéalement 24 à 32 px), ou une largeur maximale centrée. Pour un débordement, contrains la largeur de l’élément fautif.',
    demo: {
      bad: v(
        'Écran de téléphone dont l’article touche presque les deux bords de l’écran.',
        `<div class="ve" style="padding:14px 3px"><p class="ve-h">Préparer son vélo pour l’hiver</p><p class="ve-p">Commence par l’éclairage : à partir de novembre, tu rouleras souvent de nuit. Vérifie ensuite l’usure des plaquettes et la pression des pneus.</p></div>`,
        `.ve-h { font-size: 19px; font-weight: 750; line-height: 1.2; margin-bottom: 6px; }
.ve-p { font-size: 15px; line-height: 1.55; color: #3a4150; }`,
        { frame: 'phone' },
      ),
      good: v(
        'Même écran avec 20 px de marge de chaque côté de l’article.',
        `<div class="ve" style="padding:14px 20px"><p class="ve-h">Préparer son vélo pour l’hiver</p><p class="ve-p">Commence par l’éclairage : à partir de novembre, tu rouleras souvent de nuit. Vérifie ensuite l’usure des plaquettes et la pression des pneus.</p></div>`,
        `.ve-h { font-size: 19px; font-weight: 750; line-height: 1.2; margin-bottom: 6px; }
.ve-p { font-size: 15px; line-height: 1.55; color: #3a4150; }`,
        { frame: 'phone' },
      ),
    },
  },
  {
    id: 'tight-leading',
    name: 'Interlignage serré',
    family: 'qualite',
    severity: 'avertissement',
    description: 'Un interlignage inférieur à 1,3 fois la taille du texte rend les paragraphes de plusieurs lignes difficiles à lire.',
    fix: 'Utilise 1,5 à 1,7 pour le texte courant, pour que les lignes respirent.',
    demo: {
      bad: para('Paragraphe sur les retours avec un interlignage de 1,1 : les lignes se touchent presque.', 'font-size:15px;line-height:1.1'),
      good: para('Même paragraphe avec un interlignage de 1,6.', 'font-size:15px;line-height:1.6'),
    },
  },
  {
    id: 'skipped-heading',
    name: 'Niveau de titre sauté',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Les niveaux de titre ne doivent pas sauter de marche (un h1 puis un h3 sans h2). Les lecteurs d’écran s’appuient sur la hiérarchie des titres pour naviguer ; sauter un niveau casse le plan du document.',
    fix: 'Choisis le niveau d’après la structure du document, et règle la taille en CSS indépendamment du niveau.',
  },
  {
    id: 'heading-rhythm',
    name: 'Titre collé au bloc précédent',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Un titre se lie au contenu qu’il introduit : l’espace rendu au-dessus de lui devrait dépasser l’espace en dessous. Quand, sur une page, les titres sont aussi près ou plus près du bloc précédent que de leur propre contenu, chaque section semble légender la précédente.',
    fix: 'Ouvre l’espace au-dessus de chaque titre, et resserre celui qui le sépare de son contenu.',
    demo: {
      bad: v(
        'Recette où les intertitres « Pâte » et « Garniture » collent au paragraphe précédent et s’écartent du leur.',
        `<div class="hy"><p class="hy-p">Pour 6 personnes, compte 1 h 15 de préparation et 35 min de cuisson.</p><p class="hy-h">Pâte</p><p class="hy-p">Mélange 250 g de farine, 125 g de beurre froid et une pincée de sel.</p><p class="hy-h">Garniture</p><p class="hy-p">Émince trois poireaux et fais-les fondre 15 min.</p></div>`,
        `.hy { padding: 18px; }
.hy-p { font-size: 14px; line-height: 1.55; color: #3a4150; }
.hy-h { margin: 6px 0 16px; font-size: 16px; font-weight: 700; }`,
      ),
      good: v(
        'Même recette où chaque intertitre a beaucoup d’air au-dessus et colle à son paragraphe.',
        `<div class="hy"><p class="hy-p">Pour 6 personnes, compte 1 h 15 de préparation et 35 min de cuisson.</p><p class="hy-h">Pâte</p><p class="hy-p">Mélange 250 g de farine, 125 g de beurre froid et une pincée de sel.</p><p class="hy-h">Garniture</p><p class="hy-p">Émince trois poireaux et fais-les fondre 15 min.</p></div>`,
        `.hy { padding: 18px; }
.hy-p { font-size: 14px; line-height: 1.55; color: #3a4150; }
.hy-h { margin: 22px 0 4px; font-size: 16px; font-weight: 700; }`,
      ),
    },
  },
  {
    id: 'justified-text',
    name: 'Texte justifié',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Dans une colonne aussi étroite, justifier sans césure étire les espaces entre les mots jusqu’à faire couler des rivières blanches verticales dans le bloc. Les écritures qui justifient sur une grille de caractères ou en allongeant les glyphes (CJK, thaï, arabe) ne sont pas concernées.',
    fix: 'Aligne à gauche, élargis la mesure, ou active `hyphens: auto` si tu dois justifier.',
    demo: {
      bad: v(
        'Colonne étroite de texte justifié sans césure, avec de grands blancs irréguliers entre les mots.',
        `<div class="jt"><p style="text-align:justify">Les établissements recevant du public doivent afficher les consignes d’évacuation à proximité immédiate des issues, accompagnées d’un plan schématique régulièrement actualisé.</p></div>`,
        `.jt { padding: 18px; } .jt p { max-width: 24ch; font-size: 15px; line-height: 1.55; }`,
      ),
      good: v(
        'Même colonne alignée à gauche, espaces réguliers entre les mots.',
        `<div class="jt"><p style="text-align:start">Les établissements recevant du public doivent afficher les consignes d’évacuation à proximité immédiate des issues, accompagnées d’un plan schématique régulièrement actualisé.</p></div>`,
        `.jt { padding: 18px; } .jt p { max-width: 24ch; font-size: 15px; line-height: 1.55; }`,
      ),
    },
  },
  {
    id: 'straggler',
    name: 'Mot seul en fin de paragraphe',
    family: 'qualite',
    severity: 'conseil',
    description: 'La dernière ligne du paragraphe ne contient qu’un mot, ce qui laisse un trou sous le bloc.',
    fix: 'Applique `text-wrap: pretty` au texte courant (Chrome, Safari) pour ramener un mot à côté. Sinon, retouche la dernière phrase ou lie les deux derniers mots par une espace insécable. Garde-le si la coupure est voulue.',
    demo: {
      bad: v(
        'Paragraphe de trois lignes dont la dernière ne contient que le mot « suivant. ».',
        `<div class="sg"><p>Ta commande est préparée le jour même<br>si tu la passes avant 14 h, puis expédiée<br>le jour ouvré suivant.<br>Compte 48 h pour une livraison en France<br>métropolitaine, et 4 jours pour la<br>Corse.</p></div>`,
        `.sg { padding: 18px; } .sg p { font-size: 14px; line-height: 1.6; white-space: nowrap; }`,
      ),
      good: v(
        'Même paragraphe dont la dernière ligne contient plusieurs mots.',
        `<div class="sg"><p>Ta commande est préparée le jour même<br>si tu la passes avant 14 h, puis expédiée<br>le jour ouvré suivant.<br>Compte 48 h pour une livraison en France<br>métropolitaine, et 4 jours<br>pour la Corse.</p></div>`,
        `.sg { padding: 18px; } .sg p { font-size: 14px; line-height: 1.6; white-space: nowrap; }`,
      ),
    },
  },
  {
    id: 'unbalanced-heading',
    name: 'Titre déséquilibré',
    family: 'qualite',
    severity: 'conseil',
    description: 'Ce titre passe à la ligne avec une dernière ligne bien plus courte que la précédente, souvent un mot seul.',
    fix: 'Applique `text-wrap: balance` aux titres pour obtenir des lignes presque égales, ou réécris-le pour qu’il tienne. Garde la coupure si elle porte volontairement un sens.',
    demo: {
      bad: v(
        'Titre sur deux lignes dont la seconde ne contient que le mot « ligne ».',
        `<div class="ub"><p>Déclarer tes revenus de location en<br>ligne</p></div>`,
        `.ub { padding: 22px 18px; } .ub p { font-size: 24px; line-height: 1.15; font-weight: 800; white-space: nowrap; }`,
      ),
      good: v('Même titre réparti sur deux lignes de longueur proche.', `<div class="ub"><p>Déclarer tes revenus<br>de location en ligne</p></div>`, `.ub { padding: 22px 18px; } .ub p { font-size: 24px; line-height: 1.15; font-weight: 800; white-space: nowrap; }`),
    },
  },
  {
    id: 'tiny-text',
    name: 'Texte courant minuscule',
    family: 'qualite',
    severity: 'avertissement',
    description: 'Un texte courant sous 12 px est difficile à lire, surtout sur les écrans haute densité.',
    fix: 'Utilise au moins 14 px pour le contenu courant ; 16 px est l’idéal.',
    demo: {
      bad: para('Paragraphe sur les retours composé en 10 px.', 'font-size:10px;line-height:1.5'),
      good: para('Même paragraphe composé en 16 px.', 'font-size:16px;line-height:1.55'),
    },
  },
  {
    id: 'undersized-ui-text',
    name: 'Texte fonctionnel trop petit',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Le texte interactif ou porteur d’information (liens, boutons, éléments de navigation, libellés, cellules de tableau, métadonnées, horodatages) sous 11 px est un échec de lisibilité, pas un choix de style. Les WCAG ne fixent pas de plancher absolu en pixels, mais 11 px est une limite défendable : en dessous, le texte échoue sur les écrans denses et les petits écrans, et dégrade les zones de lecture et de toucher. Le plancher vaut même dans un pied de page ; seules les mentions légales non interactives ont droit à 10 px. Figurer sur l’échelle de DESIGN.md ne rachète pas une valeur trop petite.',
    fix: 'Remonte ces textes à 11 px au minimum ; si la place manque, allège le contenu plutôt que la taille.',
    demo: {
      bad: v(
        'Liste de virements dont les dates, libellés et montants sont composés en 9 px.',
        `<div class="ux" style="--fs:9px"><p class="ux-h">Derniers virements</p><table><tr><td>03/04</td><td>Loyer avril</td><td class="n">−720,00 €</td></tr><tr><td>02/04</td><td>Remboursement C. Petit</td><td class="n">+35,00 €</td></tr><tr><td>01/04</td><td>Salaire</td><td class="n">+2 140,00 €</td></tr></table><span class="ux-a">Voir tout</span></div>`,
        `.ux { padding: 16px; }
.ux-h { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.ux table { width: 100%; border-collapse: collapse; font-size: var(--fs); }
.ux td { padding: 5px 0; border-bottom: 1px solid #edf0f3; }
.ux .n { text-align: end; font-variant-numeric: tabular-nums; }
.ux-a { display: inline-block; margin-top: 6px; font-size: var(--fs); color: #1f4fd8; }`,
      ),
      good: v(
        'Même liste de virements composée en 13 px.',
        `<div class="ux" style="--fs:13px"><p class="ux-h">Derniers virements</p><table><tr><td>03/04</td><td>Loyer avril</td><td class="n">−720,00 €</td></tr><tr><td>02/04</td><td>Remboursement C. Petit</td><td class="n">+35,00 €</td></tr><tr><td>01/04</td><td>Salaire</td><td class="n">+2 140,00 €</td></tr></table><span class="ux-a">Voir tout</span></div>`,
        `.ux { padding: 16px; }
.ux-h { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.ux table { width: 100%; border-collapse: collapse; font-size: var(--fs); }
.ux td { padding: 5px 0; border-bottom: 1px solid #edf0f3; }
.ux .n { text-align: end; font-variant-numeric: tabular-nums; }
.ux-a { display: inline-block; margin-top: 6px; font-size: var(--fs); color: #1f4fd8; }`,
      ),
    },
  },
  {
    id: 'all-caps-body',
    name: 'Texte courant en capitales',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'De longs passages en capitales se lisent mal : on reconnaît les mots à leur silhouette (ascendantes, descendantes), que les capitales effacent. Seul compte un passage qui se lit comme une phrase, soit 80 caractères ou plus du texte propre d’un élément ; boutons, éléments de navigation et courts libellés en capitales relèvent de la convention et ne déclenchent pas cette règle.',
    fix: 'Réserve les capitales aux libellés courts et aux titres.',
    demo: {
      bad: para('Paragraphe sur les retours entièrement en capitales.', 'font-size:14px;line-height:1.6;text-transform:uppercase'),
      good: para('Même paragraphe en casse normale.', 'font-size:14px;line-height:1.6'),
    },
  },
  {
    id: 'wide-tracking',
    name: 'Approche large sur le texte courant',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Une approche supérieure à 0,05em sur du texte courant défait les groupes naturels de caractères et ralentit la lecture.',
    fix: 'Réserve l’approche large aux courts libellés en capitales.',
    demo: {
      bad: para('Paragraphe sur les retours avec des lettres très espacées (0,12em).', 'font-size:14px;line-height:1.6;letter-spacing:0.12em'),
      good: para('Même paragraphe avec une approche normale.', 'font-size:14px;line-height:1.6'),
    },
  },
  {
    id: 'text-overflow',
    name: 'Contenu qui déborde de son conteneur',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Le contenu s’affiche plus large que son conteneur et ce débordement fait des dégâts : un ancêtre qui découpe le coupe, il chevauche une autre boîte, ou il atteint le bord de l’écran.',
    fix: 'Laisse le texte passer à la ligne (`overflow-wrap: anywhere` pour les adresses et les liens), contrains les largeurs, ou donne à la zone un défilement assumé.',
    demo: {
      bad: v(
        'Carte de contact dont l’adresse e-mail très longue dépasse la bordure droite et se fait couper.',
        `<div class="tx"><div class="tx-c tx-c--clip"><b>Contact facturation</b><span class="tx-mail">comptabilite.fournisseurs@menuiserie-morel-et-fils.fr</span></div></div>`,
        `.tx { padding: 16px; }
.tx-c { max-width: 240px; display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid #dfe3ea; border-radius: 10px; font-size: 13px; }
.tx-c--clip { overflow: hidden; }
.tx-c--clip .tx-mail { white-space: nowrap; }
.tx-mail { color: #1f4fd8; }`,
      ),
      good: v(
        'Même carte où l’adresse e-mail passe à la ligne à l’intérieur de la bordure.',
        `<div class="tx"><div class="tx-c"><b>Contact facturation</b><span class="tx-mail">comptabilite.fournisseurs@menuiserie-morel-et-fils.fr</span></div></div>`,
        `.tx { padding: 16px; }
.tx-c { max-width: 240px; display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid #dfe3ea; border-radius: 10px; font-size: 13px; }
.tx-mail { color: #1f4fd8; overflow-wrap: anywhere; }`,
      ),
    },
  },
  {
    id: 'repeated-container-text',
    name: 'Même texte répété dans un conteneur',
    family: 'qualite',
    severity: 'avertissement',
    description:
      'Le même texte littéral affiché trois fois ou plus, à des endroits structurellement différents d’une même carte ou d’un même panneau : un message redondant, en général un statut ou un libellé câblé dans chaque emplacement d’un gabarit.',
    fix: 'Dis-le une fois, là où il compte le plus.',
    demo: {
      bad: v(
        'Carte de devis où le mot « En attente » apparaît trois fois : en pastille, dans le texte et sur le bouton.',
        `<div class="rc"><div class="rc-c"><div class="rc-top"><b>Devis D-2026-014</b><em>En attente</em></div><p>Statut : En attente</p><span class="mk-btn mk-btn--ghost mk-btn--s">En attente</span></div></div>`,
        `.rc { padding: 16px; }
.rc-c { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; padding: 14px; border: 1px solid #dfe3ea; border-radius: 12px; font-size: 13px; color: #4b5262; }
.rc-top { display: flex; justify-content: space-between; gap: 8px; align-self: stretch; }
.rc-top b { color: #1d2230; font-size: 14px; }
.rc-top em { font-style: normal; font-size: 12px; font-weight: 650; padding: 2px 8px; border-radius: 999px; background: #fef3c7; color: #78350f; }`,
      ),
      good: v(
        'Même carte : le statut « En attente » apparaît une fois en pastille ; le texte dit depuis quand et le bouton propose de relancer.',
        `<div class="rc"><div class="rc-c"><div class="rc-top"><b>Devis D-2026-014</b><em>En attente</em></div><p>Envoyé à Mme Ferrand il y a 9 jours.</p><span class="mk-btn mk-btn--ghost mk-btn--s">Relancer</span></div></div>`,
        `.rc { padding: 16px; }
.rc-c { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; padding: 14px; border: 1px solid #dfe3ea; border-radius: 12px; font-size: 13px; color: #4b5262; }
.rc-top { display: flex; justify-content: space-between; gap: 8px; align-self: stretch; }
.rc-top b { color: #1d2230; font-size: 14px; }
.rc-top em { font-style: normal; font-size: 12px; font-weight: 650; padding: 2px 8px; border-radius: 999px; background: #fef3c7; color: #78350f; }`,
      ),
    },
  },
  {
    id: 'clipped-overflow-container',
    name: 'Élément positionné coupé par son conteneur',
    family: 'qualite',
    severity: 'conseil',
    description:
      'Un conteneur qui découpe son contenu (`overflow: hidden` ou `clip`) autour d’un enfant en position absolue coupe les infobulles, menus et fenêtres contextuelles qui doivent en sortir.',
    fix: 'Laisse le débordement visible, ou sors la couche positionnée de la zone découpée : `<dialog>`, API popover, `position: fixed` ou portail.',
    demo: {
      bad: v(
        'Carte de fichier dont le menu déroulant « Renommer, Dupliquer, Supprimer » est coupé net par le bas de la carte.',
        `<div class="cc"><div class="cc-c cc-c--clip"><div class="cc-row"><b>Plan-cuisine-v3.pdf</b><span class="cc-more"><i data-icon="ellipsis" style="--ico:16px"></i></span></div><span class="cc-meta">2,4 Mo · modifié hier</span><ul class="cc-menu"><li>Renommer</li><li>Dupliquer</li><li class="del">Supprimer</li></ul></div></div>`,
        `.cc { padding: 16px 16px 100px; }
.cc-c { position: relative; padding: 12px; border: 1px solid #dfe3ea; border-radius: 10px; background: #fff; font-size: 13px; }
.cc-c--clip { overflow: hidden; }
.cc-row { display: flex; justify-content: space-between; align-items: center; }
.cc-more { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 6px; background: #eef1f5; }
.cc-meta { color: #5a6172; font-size: 12px; }
.cc-menu { position: absolute; right: 8px; top: 40px; z-index: 2; list-style: none; margin: 0; padding: 4px; width: 140px; background: #fff; border: 1px solid #dfe3ea; border-radius: 8px; box-shadow: 0 8px 20px rgb(15 23 42 / 0.12); }
.cc-menu li { padding: 6px 8px; border-radius: 6px; }
.cc-menu .del { color: #b3261e; }`,
      ),
      good: v(
        'Même carte dont le menu déroulant sort entièrement de la carte, ses trois actions visibles.',
        `<div class="cc"><div class="cc-c"><div class="cc-row"><b>Plan-cuisine-v3.pdf</b><span class="cc-more"><i data-icon="ellipsis" style="--ico:16px"></i></span></div><span class="cc-meta">2,4 Mo · modifié hier</span><ul class="cc-menu"><li>Renommer</li><li>Dupliquer</li><li class="del">Supprimer</li></ul></div></div>`,
        `.cc { padding: 16px 16px 100px; }
.cc-c { position: relative; padding: 12px; border: 1px solid #dfe3ea; border-radius: 10px; background: #fff; font-size: 13px; }
.cc-row { display: flex; justify-content: space-between; align-items: center; }
.cc-more { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 6px; background: #eef1f5; }
.cc-meta { color: #5a6172; font-size: 12px; }
.cc-menu { position: absolute; right: 8px; top: 40px; z-index: 2; list-style: none; margin: 0; padding: 4px; width: 140px; background: #fff; border: 1px solid #dfe3ea; border-radius: 8px; box-shadow: 0 8px 20px rgb(15 23 42 / 0.12); }
.cc-menu li { padding: 6px 8px; border-radius: 6px; }
.cc-menu .del { color: #b3261e; }`,
      ),
    },
  },
  {
    id: 'design-system-font',
    name: 'Police hors de DESIGN.md',
    family: 'qualite',
    severity: 'avertissement',
    description: 'Une police utilisée n’est pas déclarée dans la typographie de DESIGN.md.',
    fix: 'Utilise le système typographique documenté, ou mets DESIGN.md à jour s’il s’agit d’un ajout de marque voulu.',
  },
  {
    id: 'design-system-color',
    name: 'Couleur hors de DESIGN.md',
    family: 'qualite',
    severity: 'conseil',
    description:
      'Une couleur littérale sort de la palette de DESIGN.md et de ses rampes tonales. Ce peut être légitime, mais ce doit être un ajout intentionnel au système, pas une dérive.',
    fix: 'Remplace-la par le jeton documenté le plus proche, ou ajoute-la au système en connaissance de cause.',
  },
  {
    id: 'design-system-radius',
    name: 'Rayon hors de DESIGN.md',
    family: 'qualite',
    severity: 'conseil',
    description: 'Une valeur de `border-radius` sort de l’échelle d’arrondis documentée dans DESIGN.md.',
    fix: 'Utilise un jeton de rayon documenté, ou mets le système à jour si la nouvelle forme est voulue.',
  },
  {
    id: 'design-system-font-size',
    name: 'Taille de police hors de DESIGN.md',
    family: 'qualite',
    severity: 'conseil',
    description: 'Une taille de police littérale sort de l’échelle typographique documentée dans DESIGN.md.',
    fix: 'Utilise une marche documentée, ou mets le système à jour si la nouvelle marche est voulue.',
  },
  {
    id: 'gpt-thin-border-wide-shadow',
    name: 'Carte fantôme : bordure fine et large ombre',
    family: 'cliche',
    severity: 'conseil',
    description:
      'Chaque carte d’une rangée porte une bordure d’un pixel et une large ombre diffuse : une signature récurrente des interfaces générées. Un panneau flottant isolé mérite les deux ; une rangée entière qui les porte trahit un réglage par défaut que personne n’a choisi.',
    fix: 'Sur toute la rangée, engage-toi sur l’un des deux : un bord net ou une élévation douce.',
    demo: {
      bad: v(
        'Trois cartes d’articles de blog, chacune avec une fine bordure grise et une grande ombre diffuse.',
        `<div class="gp"><div class="gp-c gp-c--ghost"><b>Fixer ses tarifs</b><span>6 min</span></div><div class="gp-c gp-c--ghost"><b>Relancer sans gêne</b><span>4 min</span></div><div class="gp-c gp-c--ghost"><b>Choisir son statut</b><span>9 min</span></div></div>`,
        `.gp { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; padding: 20px 16px 30px; background: #fff; }
.gp-c { display: flex; flex-direction: column; gap: 4px; padding: 12px; border-radius: 12px; font-size: 12px; color: #5a6172; background: #fff; }
.gp-c b { font-size: 13px; color: #1d2230; }
.gp-c--ghost { border: 1px solid #e5e7eb; box-shadow: 0 22px 48px -12px rgb(15 23 42 / 0.25); }`,
      ),
      good: v(
        'Mêmes trois cartes portées uniquement par une ombre douce et courte, sans bordure.',
        `<div class="gp"><div class="gp-c"><b>Fixer ses tarifs</b><span>6 min</span></div><div class="gp-c"><b>Relancer sans gêne</b><span>4 min</span></div><div class="gp-c"><b>Choisir son statut</b><span>9 min</span></div></div>`,
        `.gp { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; padding: 20px 16px 30px; background: #f6f7f9; }
.gp-c { display: flex; flex-direction: column; gap: 4px; padding: 12px; border-radius: 12px; font-size: 12px; color: #5a6172; background: #fff; box-shadow: 0 1px 2px rgb(15 23 42 / 0.08), 0 4px 10px rgb(15 23 42 / 0.06); }
.gp-c b { font-size: 13px; color: #1d2230; }`,
      ),
    },
  },
  {
    id: 'repeating-stripes-gradient',
    name: 'Rayures en dégradé répété',
    family: 'cliche',
    severity: 'conseil',
    description: 'Des rayures en dégradé répété utilisées comme décoration de surface : une signature récurrente des interfaces générées.',
    fix: 'Choisis une texture délibérée, tirée du monde du sujet (le store rayé d’une boutique, par exemple), ou laisse la surface unie.',
    demo: {
      bad: v(
        'Bandeau d’inscription à une lettre d’information sur un fond de fines rayures diagonales grises.',
        `<div class="rs rs--stripes"><p class="rs-h">La lettre du jeudi</p><p class="rs-p">Un conseil de gestion par semaine, lu en 3 minutes.</p><span class="rs-btn">S’inscrire</span></div>`,
        `.rs { padding: 26px 18px; }
.rs--stripes { background: repeating-linear-gradient(135deg, #f3f4f6 0 10px, #e5e7eb 10px 12px); }
.rs-h { font-size: 20px; font-weight: 800; }
.rs-p { margin-top: 4px; font-size: 14px; color: #4b5262; }
.rs-btn { display: inline-flex; margin-top: 12px; padding: 8px 14px; border-radius: 8px; background: #1d2230; color: #fff; font-size: 14px; font-weight: 600; }`,
      ),
      good: v('Même bandeau sur une surface unie, légèrement teintée.', `<div class="rs"><p class="rs-h">La lettre du jeudi</p><p class="rs-p">Un conseil de gestion par semaine, lu en 3 minutes.</p><span class="rs-btn">S’inscrire</span></div>`, `.rs { padding: 26px 18px; background: #eef2f7; }
.rs-h { font-size: 20px; font-weight: 800; }
.rs-p { margin-top: 4px; font-size: 14px; color: #4b5262; }
.rs-btn { display: inline-flex; margin-top: 12px; padding: 8px 14px; border-radius: 8px; background: #1d2230; color: #fff; font-size: 14px; font-weight: 600; }`),
    },
  },
  {
    id: 'codex-grid-background',
    name: 'Fond quadrillé décoratif',
    family: 'cliche',
    severity: 'conseil',
    description:
      'Un fond de grille ou de lignes décoratif, dessiné avec de fines couches `linear-gradient` répétées sur une cellule de taille fixe : une signature récurrente des interfaces générées.',
    fix: 'Réserve le quadrillage aux vraies toiles, cartes, plans ou surfaces de mesure ; ailleurs, laisse parler la structure du produit ou une surface unie.',
    demo: {
      bad: v(
        'Héros d’une application de notes sur un fond quadrillé de fines lignes grises, sans rapport avec le produit.',
        `<div class="gb gb--grid"><p class="gb-h">Vos notes, partout avec vous</p><p class="gb-p">Synchronisées sur tous vos appareils.</p></div>`,
        `.gb { padding: 34px 18px; text-align: center; }
.gb--grid { background-color: #fff; background-image: linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px); background-size: 24px 24px; }
.gb-h { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
.gb-p { margin-top: 6px; font-size: 14px; color: #4b5262; }`,
      ),
      good: v('Même héros sur une surface unie.', `<div class="gb"><p class="gb-h">Vos notes, partout avec vous</p><p class="gb-p">Synchronisées sur tous vos appareils.</p></div>`, `.gb { padding: 34px 18px; text-align: center; background: #f7f7f5; }
.gb-h { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
.gb-p { margin-top: 6px; font-size: 14px; color: #4b5262; }`),
    },
  },
  {
    id: 'theater-slop-phrase',
    name: 'Cadrage « théâtre »',
    family: 'cliche',
    severity: 'conseil',
    description:
      'Disqualifier quelque chose en le qualifiant de « théâtre » (« fini le théâtre de la sécurité », « la conformité-théâtre ») est un tic récurrent des textes générés.',
    fix: 'Dis simplement ce que la chose fait ou ne fait pas.',
    demo: {
      bad: v(
        'Accroche « Fini le théâtre de la sécurité. » suivie d’une phrase vague.',
        `<div class="ch"><p class="ch-h">Fini le théâtre de la sécurité.</p><p class="ch-p">Une protection réelle, enfin.</p></div>`,
        CLEAN_HERO,
      ),
      good: v(
        'Accroche qui dit concrètement ce que fait le produit : sauvegarde chiffrée chaque nuit, restauration en un clic.',
        `<div class="ch"><p class="ch-h">Tes fichiers sauvegardés chaque nuit, chiffrés, restaurables en un clic</p><p class="ch-p">Hébergement en France, 30 jours d’historique par fichier.</p></div>`,
        CLEAN_HERO,
      ),
    },
  },
];
