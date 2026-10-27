import { withApp, newPage, nav } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/' });
  const toasts = [];
  await page.exposeFunction('__toast', (t) => toasts.push(t));
  await page.evaluate(() => new MutationObserver(() => { const el = document.querySelector('.toasts'); if (el && el.innerText) window.__toast(el.innerText); }).observe(document.body, { subtree: true, childList: true }));
  await nav(page, `/session?mode=type&id=truefalse&n=${Date.now()}`, 800);
  for (let i = 0; i < 12; i++) {
    if (await page.locator('h1#main-title').count()) break;
    await page.keyboard.press('f'); await page.waitForTimeout(60);
    await page.keyboard.press('Enter'); await page.waitForTimeout(120);
    await page.keyboard.press('Enter'); await page.waitForTimeout(160);
  }
  await page.waitForTimeout(400);
  console.log('SCORE:', JSON.stringify(await page.locator('.summary-score').innerText()));
  console.log('BADGES:', JSON.stringify(await page.evaluate(() => JSON.parse(localStorage.getItem('learn-ui-ux:v1')).badges)));
  console.log('TOASTS:', JSON.stringify([...new Set(toasts)]));
});
