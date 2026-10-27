import { chromium, devServer, newPage, sleep } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  for (const width of [1280, 390]) {
    const { page } = await newPage(browser, { colorScheme: 'light', width, height: 800 });
    await page.goto(srv.url + '#/');
    await page.waitForSelector('#main-title', { timeout: 60000 });
    const btn = page.locator('button.icon-btn[aria-label^="Passer"]:visible').first();
    console.log(`[24 @${width}] OS light -> label:`, await btn.getAttribute('aria-label'));
    await page.emulateMedia({ colorScheme: 'dark' });
    await sleep(300);
    console.log(`[24 @${width}] OS dark -> body bg`, await page.evaluate(() => getComputedStyle(document.body).backgroundColor), '| label:', await btn.getAttribute('aria-label'));
    await btn.click();
    await sleep(300);
    console.log(`[24 @${width}] after 1 click -> data-theme=${await page.evaluate(() => document.documentElement.dataset.theme)} bg=${await page.evaluate(() => getComputedStyle(document.body).backgroundColor)} | label: ${await page.locator('button.icon-btn[aria-label^="Passer"]:visible').first().getAttribute('aria-label')}`);
    await page.context().close();
  }
} finally {
  await browser.close();
  await srv.close();
}
