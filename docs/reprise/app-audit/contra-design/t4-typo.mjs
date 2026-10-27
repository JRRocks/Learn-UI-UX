import { withStatic, go, seed, C } from './h.mjs';
await withStatic(async ({ browser, url }) => {
  // Desktop: list marker numeric variant + market code breaks + glossary stragglers
  const d = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const dp = await d.newPage();
  await seed(dp, url);
  await go(dp, url, '/apprendre/delight');
  console.log('marker', await dp.evaluate(() => { const li = document.querySelector('.md ol li'); if (!li) return 'no ol'; const m = getComputedStyle(li, '::marker'); return { fvn: m.fontVariantNumeric, ff: m.fontFamily.slice(0, 40), text: li.textContent.slice(0, 30) }; }));
  await go(dp, url, '/cultures', { ms: 800 });
  console.log('market codes', JSON.stringify(await dp.evaluate(() => [...document.querySelectorAll('.market-name code')].map((c) => { const r = document.createRange(); r.selectNodeContents(c); const lines = new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size; return lines > 1 ? `${c.textContent}:${lines} lines (w=${Math.round(c.getBoundingClientRect().width)})` : null; }).filter(Boolean))));
  await go(dp, url, '/ressources/glossaire');
  console.log('glossary stragglers', await dp.evaluate(() => [...document.querySelectorAll('.defs dd')].filter((dd) => { const r = document.createRange(); r.selectNodeContents(dd); const rects = [...r.getClientRects()].filter((x) => x.width > 1); const tops = [...new Set(rects.map((x) => Math.round(x.top)))]; if (tops.length < 2) return false; const lastTop = tops.at(-1); const lastW = rects.filter((x) => Math.round(x.top) === lastTop).reduce((s, x) => s + x.width, 0); const words = dd.textContent.trim().split(/\s+/); return lastW < 90; }).length + ' dd with a short last line (<90px); textWrap=' + getComputedStyle(document.querySelector('.defs dd')).textWrap));
  await d.close();
  // Mobile: atlas title breaking before colon; Commandes intro
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const mp = await m.newPage();
  await seed(mp, url);
  await go(mp, url, '/');
  console.log('colon at line start (home)', JSON.stringify(await mp.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.toc-title, .side-link small, h2, h3, p')) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
      let prevTop = null;
      while ((n = walker.nextNode())) {
        for (let i = 0; i < n.length; i++) {
          if (!':;!?%'.includes(n.data[i])) continue;
          const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); const rc = r.getClientRects()[0]; if (!rc) continue;
          // previous non-space char
          let j = i - 1; while (j >= 0 && /\s/.test(n.data[j])) j--; if (j < 0) continue;
          const r2 = document.createRange(); r2.setStart(n, j); r2.setEnd(n, j + 1); const rp = r2.getClientRects()[0];
          if (rp && rc.top - rp.top > 5) out.push(`«${n.data.slice(Math.max(0, i - 20), i + 15)}»`);
        }
      }
    }
    return out;
  })));
  await go(mp, url, '/ressources/commandes');
  console.log('colon at line start (commandes)', JSON.stringify(await mp.evaluate(() => { const p = document.querySelector('.section > p.muted'); const n = p.firstChild; const i = n.data.indexOf(' :'); const r = document.createRange(); r.setStart(n, i + 1); r.setEnd(n, i + 2); const r2 = document.createRange(); r2.setStart(n, i - 1); r2.setEnd(n, i); return { colonTop: Math.round(r.getClientRects()[0].top), prevTop: Math.round(r2.getClientRects()[0].top) }; })));
  await m.close();
});
