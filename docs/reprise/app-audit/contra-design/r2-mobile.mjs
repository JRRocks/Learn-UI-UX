import { withStatic, go, seed, C, PROGRESS } from './h.mjs';
const cpl = (el) => { const r = document.createRange(); r.selectNodeContents(el); const rects = [...r.getClientRects()].filter((x) => x.width > 2); const lines = new Set(rects.map((x) => Math.round(x.top))); const text = el.textContent.replace(/\s+/g, ' ').trim(); return { lines: lines.size, chars: text.length, cpl: Math.round(text.length / Math.max(1, lines.size)), width: Math.round(el.getBoundingClientRect().width) }; };
await withStatic(async ({ browser, url }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await seed(page, url);
  await go(page, url, '/apprendre');
  const learn = await page.evaluate((f) => { const cpl = eval(f); return { docH: document.documentElement.scrollHeight, rows: document.querySelectorAll('.toc-row').length, sum: [...document.querySelectorAll('.toc-summary')].slice(0, 4).map(cpl), masteryW: Math.round(document.querySelector('.toc-mastery').getBoundingClientRect().width), rowH: [...document.querySelectorAll('.toc-row')].slice(0, 4).map((r) => Math.round(r.getBoundingClientRect().height)) }; }, cpl.toString());
  console.log('learn', JSON.stringify(learn));
  await page.screenshot({ path: `${C}/shots/r2-learn-m.png` });
  await go(page, url, '/apprendre/craft-floor');
  const toc = await page.evaluate(() => ({ tocTop: Math.round(document.querySelector('.lesson-toc').getBoundingClientRect().top + scrollY), docH: document.documentElement.scrollHeight, firstSection: Math.round(document.querySelector('.lesson-section').getBoundingClientRect().top + scrollY), sections: document.querySelectorAll('.lesson-toc li').length, asideTop: Math.round(document.querySelector('.lesson-aside').getBoundingClientRect().top + scrollY), btnRowTop: Math.round(document.querySelector('.lesson-article > .btn-row').getBoundingClientRect().top + scrollY) }));
  console.log('lesson-toc mobile', JSON.stringify(toc));
  // tablet/desktop below 1100
  for (const w of [1024, 1099, 1100]) {
    const c2 = await browser.newContext({ viewport: { width: w, height: 800 } });
    const p2 = await c2.newPage();
    await seed(p2, url);
    await go(p2, url, '/apprendre/craft-floor');
    console.log(`lesson-toc at ${w}`, JSON.stringify(await p2.evaluate(() => ({ tocTop: Math.round(document.querySelector('.lesson-toc').getBoundingClientRect().top + scrollY), docH: document.documentElement.scrollHeight, cols: getComputedStyle(document.querySelector('.lesson')).gridTemplateColumns }))));
    await c2.close();
  }
  await go(page, url, '/');
  console.log('home mobile docH', await page.evaluate(() => ({ docH: document.documentElement.scrollHeight, atlasH: Math.round(document.querySelector('#atlas-title').closest('section').getBoundingClientRect().height) })));
  await seed(page, url, null);
  await go(page, url, '/');
  console.log('home mobile fresh', await page.evaluate(() => ({ docH: document.documentElement.scrollHeight, atlasH: Math.round(document.querySelector('#atlas-title').closest('section').getBoundingClientRect().height), notStarted: [...document.querySelectorAll('.toc-mastery > span:first-child')].filter((s) => /Pas commencé/.test(s.textContent)).length })));
  await seed(page, url);
  await go(page, url, '/progression');
  console.log('progress segmented mobile', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.settings .segmented')].map((s) => { const b = [...s.querySelectorAll('button')]; return { w: Math.round(s.getBoundingClientRect().width), rows: new Set(b.map((x) => Math.round(x.getBoundingClientRect().top))).size, labels: b.map((x) => x.textContent) }; }))));
  await go(page, url, '/ressources/commandes');
  console.log('resources tabs mobile', JSON.stringify(await page.evaluate(() => { const s = document.querySelector('nav.segmented'); const a = [...s.querySelectorAll('a')]; return { w: Math.round(s.getBoundingClientRect().width), h: Math.round(s.getBoundingClientRect().height), rows: new Set(a.map((x) => Math.round(x.getBoundingClientRect().top))).size }; })));
  await page.screenshot({ path: `${C}/shots/r2-res-commandes-m.png` });
  await ctx.close();
  // Desktop segmented
  const d = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const dp = await d.newPage();
  await seed(dp, url);
  await go(dp, url, '/progression');
  console.log('progress segmented desktop', JSON.stringify(await dp.evaluate(() => [...document.querySelectorAll('.settings .segmented')].map((s) => { const btns = [...s.querySelectorAll('button')]; const last = btns.at(-1).getBoundingClientRect(); const b = s.getBoundingClientRect(); return { width: Math.round(b.width), contentRight: Math.round(last.right - b.left), emptyTrack: Math.round(b.right - last.right) }; }))));
  await dp.locator('.settings').screenshot({ path: `${C}/shots/r2-settings-d.png` });
  await d.close();
});
