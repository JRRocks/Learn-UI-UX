import { launch, open, go, seeded, missed } from './lib.mjs';
const b = await launch();
const FIX = `@media (max-width: 959.98px) { html { scroll-padding-top: calc(var(--topbar-h, 68px) + 8px); scroll-padding-bottom: calc(57px + 8px + env(safe-area-inset-bottom)); } }
html:has(.shell[data-focus]) { scroll-padding-top: 72px; scroll-padding-bottom: 96px; }`;
const probe = () => {
  let el = document.activeElement; let root = document;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) { root = el.shadowRoot; el = el.shadowRoot.activeElement; }
  if (!el || el === document.body) return { body: true };
  let tgt = el; if (el.classList?.contains('visually-hidden') && el.closest('.option')) tgt = el.closest('.option');
  const r = tgt.getBoundingClientRect(); let vis = 0, inView = 0;
  for (const fx of [0.1, 0.5, 0.9]) for (const fy of [0.1, 0.5, 0.9]) { const x = r.left + r.width * fx, y = r.top + r.height * fy; if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue; inView++; const h = root.elementFromPoint(x, y); if (h && (h === tgt || tgt.contains(h) || (root !== document && h === root.host))) vis++; }
  return { inView, vis, label: (el.getAttribute('aria-label') || tgt.textContent || '').trim().slice(0, 30) };
};
async function walk({ width, height, hash, storage, shift = false, fix, max = 60 }) {
  const { page, context } = await open(b, { width, height, storage });
  await go(page, hash);
  if (fix) await page.addStyleTag({ content: FIX });
  if (shift) { await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.evaluate(() => document.querySelector('.danger-zone button')?.focus()); }
  let hidden = 0, part = 0;
  for (let i = 0; i < max; i++) { await page.keyboard.press(shift ? 'Shift+Tab' : 'Tab'); await page.waitForTimeout(40); const p = await page.evaluate(probe); if (p.body) continue; if (p.inView > 0 && p.vis === 0) hidden++; else if (p.vis < p.inView) part++; }
  await context.close();
  return `hidden=${hidden} partial=${part}`;
}
const S = seeded();
for (const [label, cfg] of [['entrainement 390', { width: 390, height: 740, hash: '/entrainement', storage: S }], ['progression 390', { width: 390, height: 740, hash: '/progression', storage: S }], ['progression 640x450 shift', { width: 640, height: 450, hash: '/progression', storage: S, shift: true }], ['grid 1280x900', { width: 1280, height: 900, hash: '/session?mode=mistakes', storage: missed(['heuristics-grid-booking']) }]]) {
  console.log(`${label}: before ${await walk(cfg)} | with scroll-padding ${await walk({ ...cfg, fix: true })}`);
}
await b.close();
