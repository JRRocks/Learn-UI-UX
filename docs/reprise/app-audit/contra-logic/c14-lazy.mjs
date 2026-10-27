import { chromium, sleep, DIR } from './h.mjs';
import { staticServer } from './static.mjs';
const srv = staticServer(DIR + '/dist');
const url = await srv.start();
const browser = await chromium.launch();
const view = (page) => page.evaluate(() => (document.querySelector('main')?.innerText ?? '').replace(/\s+/g, ' ').slice(0, 70));
try {
  const context = await browser.newContext({ serviceWorkers: 'block', locale: 'fr-FR' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url + '#/');
  await page.waitForSelector('#main-title', { timeout: 30000 });
  // network blip
  await srv.stop();
  await page.evaluate(() => (location.hash = '/cultures'));
  await sleep(2500);
  console.log('[blip] #/cultures:', await view(page));
  await srv.start();
  const n0 = srv.log.length;
  await page.evaluate(() => (location.hash = '/'));
  await sleep(500);
  await page.evaluate(() => (location.hash = '/cultures'));
  await sleep(5000);
  console.log('[network back, navigate away and back] #/cultures:', await view(page), '| requests since back online:', JSON.stringify(srv.log.slice(n0)));
  // A retry via a fresh import() of the same URL from the page:
  const chunk = (await import('node:fs')).readdirSync(DIR + '/dist/assets').find((f) => f.startsWith('cultures-'));
  const retry = await page.evaluate(async (u) => { try { await import(u); return 'ok'; } catch (e) { return 'fails: ' + e.message.slice(0, 80); } }, url + 'assets/' + chunk);
  console.log('[retry import() of the same chunk URL]:', retry);
  await page.reload();
  await page.waitForSelector('main');
  await sleep(1500);
  console.log('[after full reload] #/cultures:', await view(page));
  console.log('errors:', errors.slice(0, 3));
  await context.close();
} finally {
  await browser.close();
  await srv.stop();
}
