import { withApp, newPage, nav, OUT } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/' });
  await page.route(/\/src\/content\/(cultures\/(profiles|pairs)|antipatterns)\.ts/, (r) => r.abort());
  await nav(page, '/cultures', 4000);
  console.log('CULTURES AFTER 4s:', JSON.stringify(await page.locator('#main').innerText()));
  console.log('  role=status count:', await page.locator('#main [role=status]').count(), 'buttons:', await page.locator('#main button').count());
  await nav(page, '/cultures/jp', 2500);
  console.log('CULTURE JP AFTER 2.5s:', JSON.stringify(await page.locator('#main').innerText()));
  await nav(page, '/ressources/anti-patterns', 3000);
  const first = await page.locator('.catalog > li').first().innerText();
  console.log('CATALOG FALLBACK first item:', JSON.stringify(first));
  console.log('CATALOG count line:', JSON.stringify(await page.locator('p[aria-live=polite]').innerText()));
  const descs = await page.locator('.catalog > li > p').count();
  console.log('description paragraphs:', descs);
  await page.screenshot({ path: `${OUT}/c5-catalog-fallback.png` });
  // Navigate away and back: does it retry once unblocked?
  await page.unroute(/\/src\/content\/(cultures\/(profiles|pairs)|antipatterns)\.ts/);
  await nav(page, '/', 500);
  await nav(page, '/cultures', 3000);
  console.log('CULTURES AFTER UNBLOCK + REVISIT:', JSON.stringify((await page.locator('#main').innerText()).slice(0, 80)));
  // Normal load: does the English fallback flash?
  const p2 = await newPage(browser, base, { hash: '/' });
  await p2.route(/\/src\/content\/antipatterns\.ts/, async (r) => { await new Promise((res) => setTimeout(res, 1500)); await r.continue(); });
  await nav(p2, '/ressources/anti-patterns', 300);
  console.log('DURING SLOW LOAD first item:', JSON.stringify(await p2.locator('.catalog > li').first().innerText()));
  await p2.waitForTimeout(2500);
  console.log('AFTER LOAD first item:', JSON.stringify((await p2.locator('.catalog > li').first().innerText()).slice(0, 120)));
});
