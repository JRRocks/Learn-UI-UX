import { withStatic, go, seed } from './h.mjs';
const lines = (sel, max = 8) => {
  const out = [];
  for (const el of [...document.querySelectorAll(sel)].slice(0, max)) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const perLine = new Map();
    let n;
    while ((n = walker.nextNode())) {
      for (let i = 0; i < n.length; i++) {
        const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1);
        const rect = r.getClientRects()[0]; if (!rect) continue;
        const key = Math.round(rect.top / 4);
        perLine.set(key, (perLine.get(key) ?? 0) + 1);
      }
    }
    const counts = [...perLine.entries()].sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    const full = counts.slice(0, -1);
    out.push({ fs: getComputedStyle(el).fontSize, w: Math.round(el.getBoundingClientRect().width), lines: counts.length, full });
  }
  return out;
};
await withStatic(async ({ browser, url }) => {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await seed(page, url);
  await page.addInitScript(() => {});
  for (const [route, sel] of [['/apprendre/craft-floor', '.lesson-section .prose > p'], ['/apprendre/typography', '.lesson-section .prose > p'], ['/a-propos', '.section.prose > p'], ['/cultures', '.defs dd'], ['/ressources/anti-patterns', '.catalog p'], ['/cultures/comparer?a=fr&b=cn', '.dim-note'], ['/ressources/glossaire', '.defs dd']]) {
    await go(page, url, route, { ms: route.includes('anti') ? 1500 : 500 });
    const r = await page.evaluate(lines, sel);
    const all = r.flatMap((x) => x.full);
    all.sort((a, b) => a - b);
    const med = all[Math.floor(all.length / 2)];
    console.log(`${route} ${sel}: ${r.length} blocks, font ${r[0]?.fs}, width ${r[0]?.w}px; full-line chars: min ${all[0]} median ${med} max ${all.at(-1)} (n=${all.length})`);
  }
  await ctx.close();
});
