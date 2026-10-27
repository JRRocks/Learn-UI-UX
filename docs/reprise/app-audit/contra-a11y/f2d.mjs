import { launch, open, go, seeded } from './lib.mjs';
const b = await launch();
const FIX = `@media (max-width: 959.98px) { html { scroll-padding-top: 76px; scroll-padding-bottom: calc(65px + env(safe-area-inset-bottom)); } }`;
const { page, context } = await open(b, { width: 390, height: 740, storage: seeded() });
await go(page, '/progression');
await page.addStyleTag({ content: FIX });
const seen = {};
for (let i = 0; i < 60; i++) {
  await page.keyboard.press('Tab'); await page.waitForTimeout(40);
  const p = await page.evaluate(() => {
    const el = document.activeElement; if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect(); let vis = 0, inView = 0; const cov = new Set();
    for (const fx of [0.1, 0.5, 0.9]) for (const fy of [0.1, 0.5, 0.9]) { const x = r.left + r.width * fx, y = r.top + r.height * fy; if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue; inView++; const h = document.elementFromPoint(x, y); if (h && (h === el || el.contains(h))) vis++; else if (h) cov.add(h.tagName + '.' + String(h.className).split(' ')[0] + (h.closest('.tabbar,.topbar') ? '[bar]' : '')); }
    return vis < inView ? `${el.tagName} "${(el.textContent || '').trim().slice(0, 25)}" ${vis}/${inView} cov=${[...cov].join(',')}` : null;
  });
  if (p) seen[p.replace(/ \d+\/\d+/, '')] = p;
}
console.log(Object.values(seen).slice(0, 8).join('\n'));
await context.close();
await b.close();
