import { withApp, newPage, nav, OUT } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/' });
  await page.clock.install();
  await nav(page, '/session?mode=blitz', 600);
  console.log('INTRO:', JSON.stringify(await page.locator('.page-head').innerText()));
  await page.getByRole('button', { name: /Lancer le chrono/ }).click();
  await page.waitForTimeout(200);
  // Record every render of the summary line via a MutationObserver.
  await page.evaluate(() => {
    window.__seen = [];
    new MutationObserver(() => {
      const el = document.querySelector('.summary-score');
      if (el) {
        const t = el.innerText;
        if (window.__seen[window.__seen.length - 1] !== t) window.__seen.push(t);
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
  });
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('f');
    await page.waitForTimeout(100);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
  }
  await page.clock.runFor(91_000);
  await page.waitForTimeout(500);
  console.log('END:', JSON.stringify(await page.locator('.page-head').innerText()));
  console.log('ALL SUMMARY STATES SEEN:', JSON.stringify(await page.evaluate(() => window.__seen)));
  console.log('STORED RECORD:', JSON.stringify(await page.evaluate(() => JSON.parse(localStorage.getItem('learn-ui-ux:v1')).records)));
  console.log('END BUTTONS:', JSON.stringify(await page.locator('#main .btn-row').innerText()));
  await page.screenshot({ path: `${OUT}/c11-blitz-end.png` });
});
