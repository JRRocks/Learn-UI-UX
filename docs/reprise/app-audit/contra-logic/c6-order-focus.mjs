import { chromium, devServer, newPage, sleep, store, text } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
const active = (page) => page.evaluate(() => { const a = document.activeElement; return a === document.body ? 'BODY' : `${a.tagName} "${a.getAttribute('aria-label') ?? a.textContent.slice(0, 30)}" disabled=${a.disabled}`; });
try {
  for (const variant of ['bottom-enter', 'top-space', 'middle-enter']) {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/session?mode=type&id=order');
    await page.waitForSelector('.order-list', { timeout: 60000 });
    const n = await page.locator('.order-item').count();
    let btn;
    if (variant === 'bottom-enter') btn = page.locator('.order-item').nth(n - 2).locator('button[aria-label^="Descendre"]');
    if (variant === 'top-space') btn = page.locator('.order-item').nth(1).locator('button[aria-label^="Monter"]');
    if (variant === 'middle-enter') btn = page.locator('.order-item').nth(0).locator('button[aria-label^="Descendre"]');
    await btn.focus();
    const key = variant.endsWith('space') ? 'Space' : 'Enter';
    await page.keyboard.press(key);
    await sleep(200);
    const a1 = await active(page);
    await page.keyboard.press(key);
    await sleep(300);
    console.log(`[${variant}] n=${n} after 1st ${key}: active=${a1} | after 2nd ${key}: feedback shown=${await page.isVisible('.feedback')} active=${await active(page)}`);
    await page.context().close();
  }
} finally {
  await browser.close();
  await srv.close();
}
