import { withStatic, go, seed, C } from './h.mjs';
await withStatic(async ({ browser, url }) => {
  const d = await browser.newContext({ viewport: { width: 1366, height: 900 }, deviceScaleFactor: 2 });
  const dp = await d.newPage();
  await seed(dp, url);
  for (const id of ['accessibility', 'cognitive-load', 'laws', 'layout']) {
    await go(dp, url, '/apprendre/' + id);
    const r = await dp.evaluate(() => { const li = document.querySelector('.lesson-article ol:not(.lesson-toc ol) li, .md ol li'); if (!li) return null; const m = getComputedStyle(li, '::marker'); li.scrollIntoView({ block: 'center' }); return { fvn: m.fontVariantNumeric, text: li.textContent.slice(0, 40) }; });
    console.log(id, JSON.stringify(r));
    if (r) { const el = dp.locator('.md ol').first(); await el.screenshot({ path: `${C}/shots/t5-ol-${id}.png` }); break; }
  }
  await d.close();
});
