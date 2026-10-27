import { chromium, sleep, DIR } from './h.mjs';
import { staticServer } from './static.mjs';
const srv = staticServer(DIR + '/dist');
const url = await srv.start();
const browser = await chromium.launch();
const newCtx = async () => { const c = await browser.newContext({ serviceWorkers: 'block', locale: 'fr-FR', viewport: { width: 1280, height: 900 } }); return { c, page: await c.newPage() }; };
try {
  // logic-5 (prod)
  {
    const { c, page } = await newCtx();
    await page.goto(url + '#/session?mode=type&id=hotspot');
    await page.waitForSelector('.task-prompt', { timeout: 30000 });
    const needed = Number((await page.textContent('.hotspot-count')).split('/')[1]);
    const zones = page.locator('.hotspot-stage [data-hotspot]');
    const picked = [];
    for (let i = 0; i < (await zones.count()) && picked.length < needed; i++) {
      const z = zones.nth(i);
      const before = await page.textContent('.hotspot-count');
      await z.focus();
      await page.keyboard.press('Space');
      await sleep(80);
      if ((await page.textContent('.hotspot-count')) !== before) picked.push(await z.getAttribute('data-hotspot'));
    }
    await page.locator(`.hotspot-stage [data-hotspot="${picked.at(-1)}"]`).focus();
    await page.keyboard.press('Enter');
    await sleep(400);
    console.log(`[prod 5] picked ${picked.length}/${needed}; Enter on a selected zone -> feedback shown = ${await page.isVisible('.feedback')}`);
    await c.close();
  }
  // logic-6 (prod)
  {
    const { c, page } = await newCtx();
    await page.goto(url + '#/session?mode=type&id=order');
    await page.waitForSelector('.order-list', { timeout: 30000 });
    const n = await page.locator('.order-item').count();
    await page.locator('.order-item').nth(n - 2).locator('button[aria-label^="Descendre"]').focus();
    await page.keyboard.press('Enter');
    await sleep(200);
    const act = await page.evaluate(() => document.activeElement === document.body ? 'BODY' : document.activeElement.tagName);
    await page.keyboard.press('Enter');
    await sleep(300);
    console.log(`[prod 6] focus after move to bottom: ${act}; 2nd Enter validated = ${await page.isVisible('.feedback')}`);
    await c.close();
  }
  // logic-7 (prod)
  {
    const { c, page } = await newCtx();
    await page.goto(url + '#/session?mode=type&id=slider');
    await page.waitForSelector('.task-prompt', { timeout: 30000 });
    await page.locator('input[type=range]').focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.feedback');
    const first = await page.getAttribute('.task-prompt', 'id');
    await page.keyboard.down('Enter'); await sleep(500); await page.keyboard.down('Enter'); await page.keyboard.up('Enter');
    await sleep(400);
    console.log(`[prod 7] after held Enter: moved = ${first !== (await page.getAttribute('.task-prompt', 'id'))}, next exercise already corrected = ${await page.isVisible('.feedback')}`);
    await c.close();
  }
} finally {
  await browser.close();
  await srv.stop();
}
