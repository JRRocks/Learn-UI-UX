/**
 * Base stylesheet injected into every mock's Shadow DOM.
 *
 * Mocks depict OTHER products, so this kit is deliberately neutral (system UI
 * font, plain blue actions) and independent from the app's own design tokens.
 * Authors compose mocks from these classes and add their own CSS per visual.
 */
export const MOCK_KIT = /* css */ `
:host { display: block; color-scheme: light; }
*, *::before, *::after { box-sizing: border-box; }
.mk-root {
  position: relative;
  isolation: isolate;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans", "Microsoft YaHei", "Noto Sans", sans-serif;
  font-size: 14px;
  line-height: 1.45;
  color: #1d2230;
  background: #ffffff;
  text-align: start;
  overflow: hidden;
  border-radius: 10px;
  min-height: var(--mk-min-h, 0);
  -webkit-font-smoothing: antialiased;
}
.mk-root[dir="rtl"] { font-family: system-ui, "Segoe UI", Tahoma, "Noto Sans Arabic", "Geeza Pro", sans-serif; }
h1, h2, h3, h4, p, ul, ol, figure { margin: 0; }
ul, ol { padding-inline-start: 1.2em; }
button, input, select, textarea { font: inherit; color: inherit; }
img, svg { display: block; max-width: 100%; }
a { color: #1f4fd8; }

/* ---------- Frames ---------- */
.mk-browser { border: 1px solid #d5d9e2; border-radius: 10px; overflow: hidden; background: #fff; }
.mk-browser-bar { display: flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; background: #edf0f5; border-bottom: 1px solid #d5d9e2; }
.mk-browser-bar b { width: 8px; height: 8px; border-radius: 50%; background: #c6cbd5; }
.mk-browser-bar span { flex: 1; height: 14px; margin-inline-start: 8px; border-radius: 4px; background: #fff; }
.mk-phone { width: min(100%, 320px); margin-inline: auto; border: 7px solid #1a1d24; border-radius: 30px; overflow: hidden; background: #fff; }
.mk-phone-status { display: flex; justify-content: space-between; align-items: center; height: 24px; padding: 0 18px; font-size: 11px; font-weight: 600; }
.mk-phone-status i { display: inline-block; width: 34px; height: 9px; border-radius: 3px; border: 1.5px solid currentColor; }
.mk-screen { position: relative; }

/* ---------- Layout helpers ---------- */
.mk-pad { padding: 16px; }
.mk-pad-s { padding: 10px; }
.mk-pad-l { padding: 24px; }
.mk-stack { display: flex; flex-direction: column; gap: var(--gap, 12px); }
.mk-row { display: flex; align-items: center; gap: var(--gap, 10px); }
.mk-between { justify-content: space-between; }
.mk-wrap { flex-wrap: wrap; }
.mk-grow { flex: 1; min-width: 0; }
.mk-grid { display: grid; grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr)); gap: var(--gap, 12px); }
.mk-center { text-align: center; }
.mk-divider { height: 1px; background: #e3e6ec; }

/* ---------- Type ---------- */
.mk-h1 { font-size: 24px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em; }
.mk-h2 { font-size: 18px; line-height: 1.25; font-weight: 700; }
.mk-h3 { font-size: 15px; line-height: 1.3; font-weight: 650; }
.mk-p { font-size: 14px; }
.mk-small { font-size: 12px; }
.mk-muted { color: #5a6172; }
.mk-strong { font-weight: 700; }
.mk-price { font-weight: 700; font-variant-numeric: tabular-nums; }

/* ---------- Controls ---------- */
.mk-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-height: 38px; padding: 0 16px; border-radius: 8px; border: 1px solid transparent;
  background: #1f4fd8; color: #fff; font-weight: 600; cursor: default; white-space: nowrap;
}
.mk-btn--ghost { background: #fff; color: #1f2a44; border-color: #c7cedb; }
.mk-btn--text { background: transparent; color: #1f4fd8; padding: 0 6px; }
.mk-btn--danger { background: #c42b2b; }
.mk-btn--block { display: flex; width: 100%; }
.mk-btn--s { min-height: 30px; padding: 0 10px; font-size: 13px; }
.mk-btn[disabled], .mk-btn--disabled { background: #e6e9ef; color: #8b92a1; border-color: transparent; }
.mk-field { display: flex; flex-direction: column; gap: 4px; }
.mk-label { font-size: 13px; font-weight: 600; }
.mk-help { font-size: 12px; color: #5a6172; }
.mk-error { font-size: 12px; color: #b3261e; font-weight: 600; }
.mk-input {
  display: block; width: 100%; min-height: 38px; padding: 8px 10px;
  border: 1px solid #c3c8d3; border-radius: 6px; background: #fff;
}
.mk-input--error { border-color: #b3261e; box-shadow: 0 0 0 1px #b3261e; }
.mk-check { display: inline-flex; align-items: center; gap: 8px; }
.mk-check::before { content: ""; width: 16px; height: 16px; border: 1.5px solid #8b92a1; border-radius: 4px; flex: none; }
.mk-check--on::before { background: #1f4fd8; border-color: #1f4fd8; }
.mk-toggle { width: 36px; height: 20px; border-radius: 999px; background: #c3c8d3; position: relative; flex: none; }
.mk-toggle::after { content: ""; position: absolute; top: 2px; inset-inline-start: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; }
.mk-toggle--on { background: #1f4fd8; }
.mk-toggle--on::after { inset-inline-start: 18px; }
.mk-tabs { display: flex; gap: 4px; border-bottom: 1px solid #e3e6ec; }
.mk-tab { padding: 8px 12px; color: #5a6172; font-weight: 600; }
.mk-tab--on { color: #1d2230; box-shadow: inset 0 -2px 0 #1f4fd8; }

/* ---------- Content blocks ---------- */
.mk-card { background: #fff; border: 1px solid #e1e4ea; border-radius: 12px; padding: 16px; }
.mk-surface { background: #f4f6f9; }
.mk-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #eef1f7; color: #36405a; }
.mk-avatar { width: 32px; height: 32px; border-radius: 50%; background: #c9d2e1; flex: none; }
.mk-img { border-radius: 8px; aspect-ratio: var(--ratio, 4 / 3); background: linear-gradient(160deg, #c8d3e4 0%, #dfe6f0 55%, #eef2f7 100%); }
.mk-line { height: 8px; border-radius: 4px; background: #e2e6ed; }
.mk-line--s { width: 40%; }
.mk-line--m { width: 70%; }
.mk-list { list-style: none; padding: 0; display: flex; flex-direction: column; }
.mk-list > li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #eceef2; }
.mk-toast { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; background: #1f2433; color: #fff; box-shadow: 0 8px 24px rgb(15 20 35 / 0.18); }
.mk-tabbar { display: flex; justify-content: space-around; border-top: 1px solid #e3e6ec; padding: 6px 0 10px; font-size: 10px; color: #5a6172; background: #fff; }
.mk-tabbar > span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.mk-tabbar > .on { color: #1f4fd8; }
.mk-overlay { position: absolute; inset: 0; background: rgb(15 20 35 / 0.45); display: grid; place-items: center; padding: 16px; }
.mk-dialog { background: #fff; border-radius: 14px; padding: 18px; width: min(100%, 300px); box-shadow: 0 18px 48px rgb(15 20 35 / 0.25); }

/* ---------- Icons: <i data-icon="search"></i> becomes an inline Lucide SVG ---------- */
.mk-ico { width: var(--ico, 18px); height: var(--ico, 18px); flex: none; display: inline-block; vertical-align: middle; }

/* ---------- Hotspots ---------- */
[data-hotspot] { border-radius: 4px; outline-offset: 3px; }
:host([data-interactive]) [data-hotspot] { cursor: pointer; }
:host([data-interactive]:not([data-revealed])) [data-hotspot]:hover { outline: 2px dashed rgb(29 34 48 / 0.4); }
[data-hotspot]:focus-visible { outline: 3px solid #2f6be0; }
:host([data-interactive]) [data-hotspot][data-state="picked"],
:host([data-interactive]) [data-hotspot][data-state="picked"]:hover { outline: 3px solid #2f6be0; background-color: rgb(47 107 224 / 0.08); }
:host([data-revealed]) [data-hotspot] { cursor: default; }
:host([data-revealed]) [data-hotspot][data-state="wrong"] { outline: 2px dashed #8d93a3; }

/* Correction marks overlay (drawn after reveal). */
.mk-marks { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; z-index: 50; }
.mk-marks path { fill: none; stroke: var(--mark, #d2401f); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.mk-marks .miss path { stroke-dasharray: 6 5; }
.mk-marks text { font: 700 12px/1 system-ui, sans-serif; fill: #fff; }
.mk-marks circle { fill: var(--mark, #d2401f); }
@media (prefers-reduced-motion: no-preference) {
  .mk-marks .draw path { stroke-dasharray: var(--len) var(--len); stroke-dashoffset: var(--len); animation: mk-draw 520ms cubic-bezier(0.25, 1, 0.5, 1) forwards; }
  .mk-marks .draw.miss path { stroke-dasharray: 6 5; stroke-dashoffset: 0; animation: none; }
}
@keyframes mk-draw { to { stroke-dashoffset: 0; } }
`;
