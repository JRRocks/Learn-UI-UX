import { readFileSync, writeFileSync } from 'node:fs';
import { withStatic as withApp, go, seed, DD } from './h.mjs';
const meta = JSON.parse(readFileSync(DD + '/meta.json', 'utf8'));
const routes = ['/', '/apprendre', '/entrainement', '/session?mode=blitz', '/fiches', '/cultures', '/cultures/labo', '/cultures/comparer?a=fr&b=cn', '/progression', '/a-propos',
  '/ressources/aide-memoire', '/ressources/anti-patterns', '/ressources/critique', '/ressources/commandes', '/ressources/glossaire', '/ressources/liens',
  ...meta.modules.map((m) => '/apprendre/' + m.id), ...Object.keys(meta.cultureNames).map((c) => '/cultures/' + c)];
const out = {};
await withApp(async ({ browser, url }) => {
  for (const width of [360, 390, 768]) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: width < 700, hasTouch: width < 700, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await seed(page, url);
    const bad = [];
    for (const r of routes) {
      await go(page, url, r, { ms: r.includes('anti-patterns') ? 1500 : 250 });
      const m = await page.evaluate(() => {
        const de = document.documentElement;
        const vw = de.clientWidth;
        const sw = de.scrollWidth;
        if (sw <= vw) return null;
        const culprits = [];
        for (const el of document.querySelectorAll('main *')) {
          const b = el.getBoundingClientRect();
          if (b.right <= vw + 0.5 || !b.width) continue;
          let clipped = false;
          for (let p = el.parentElement; p; p = p.parentElement) { if (p === document.body) break; if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowX)) { clipped = true; break; } }
          if (clipped) continue;
          const parentOver = el.parentElement && el.parentElement.getBoundingClientRect().right > vw + 0.5;
          if (!parentOver || el.parentElement.tagName === 'MAIN') culprits.push(el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ').join('.') : '') + (el.id ? '#' + el.id : '') + ' w=' + Math.round(b.width) + ' «' + el.textContent.trim().slice(0, 60) + '»');
        }
        const tab = document.querySelector('.tabbar');
        const tb = tab ? tab.getBoundingClientRect() : null;
        return { sw, vw, iw: innerWidth, vv: visualViewport ? [visualViewport.width, visualViewport.height, visualViewport.scale] : null, tab: tb ? [tb.top, tb.bottom, tb.width, innerHeight] : null, culprits: [...new Set(culprits)].slice(0, 4) };
      });
      if (m) bad.push({ r, ...m });
      process.stdout.write(m ? "X" : ".");
    }
    out[width] = bad;
    console.log(`\n== ${width}px: ${bad.length} of ${routes.length} routes overflow`);
    for (const b of bad) console.log(`${b.r}: sw=${b.sw} vw=${b.vw} iw=${b.iw} vv=${JSON.stringify(b.vv)} tab=${JSON.stringify(b.tab)}\n   ${b.culprits.join('\n   ')}`);
    await ctx.close();
  }
});
writeFileSync('r1-overflow.json', JSON.stringify(out, null, 1));
