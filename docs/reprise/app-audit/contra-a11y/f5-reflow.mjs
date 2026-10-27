import { launch, open, go, seeded, SHOTS } from './lib.mjs';
const b = await launch();
const pages = ['/', '/apprendre', '/apprendre/modes', '/apprendre/typography', '/entrainement', '/cultures', '/cultures/fr', '/cultures/comparer?a=fr&b=cn', '/cultures/paire/adresse-rtl', '/cultures/labo', '/ressources', '/ressources/anti-patterns', '/ressources/critique', '/ressources/commandes', '/ressources/glossaire', '/ressources/liens', '/progression', '/a-propos'];
for (const w of [320, 360, 390]) {
  const { page, context } = await open(b, { width: w, height: 800, storage: seeded() });
  const rows = [];
  for (const p of pages) {
    await go(page, p);
    await page.waitForTimeout(p.startsWith('/cultures') || p.includes('anti-patterns') ? 1200 : 300);
    const r = await page.evaluate((w) => {
      const sw = document.documentElement.scrollWidth;
      if (sw <= w) return { sw };
      // find widest offenders (elements whose right edge exceeds viewport and are not inside a horizontal scroller)
      const offenders = [];
      for (const el of document.querySelectorAll('main *, nav.tabbar *')) {
        const r = el.getBoundingClientRect();
        if (r.right > w + 1 && r.width > 0) {
          let p = el.parentElement, scrolled = false;
          while (p) { const ox = getComputedStyle(p).overflowX; if ((ox === 'auto' || ox === 'scroll' || ox === 'hidden') && p !== document.documentElement && p !== document.body) { scrolled = true; break; } p = p.parentElement; }
          if (!scrolled && !el.closest('.mock')) offenders.push({ el, r });
        }
      }
      // keep the outermost offenders only
      const top = offenders.filter((o) => !offenders.some((p) => p !== o && p.el.contains(o.el) && p.r.right >= o.r.right - 1));
      return { sw, offenders: top.slice(0, 3).map((o) => `${o.el.tagName.toLowerCase()}.${String(o.el.className).split(' ')[0]}${o.el.id ? '#' + o.el.id : ''} w=${Math.round(o.r.width)} right=${Math.round(o.r.right)} "${o.el.textContent.trim().slice(0, 40)}"`) };
    }, w);
    rows.push(`${p.padEnd(32)} scrollWidth=${r.sw}${r.offenders ? '  ' + r.offenders.join(' ; ') : ''}`);
    if (r.sw > w && w === 390) await page.screenshot({ path: `${SHOTS}/f5-${w}-${p.replace(/[^a-z0-9]+/gi, '_')}.png` });
  }
  console.log(`=== width ${w}\n` + rows.filter((r) => !/scrollWidth=(\d+)$/.test(r) || Number(r.match(/scrollWidth=(\d+)/)[1]) > w).join('\n'));
  await context.close();
}
await b.close();
