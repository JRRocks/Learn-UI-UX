import { chromium, newPage, sleep, DIR } from './h.mjs';
import { staticServer } from './static.mjs';
const srv = staticServer(DIR + '/dist');
const url = await srv.start();
const browser = await chromium.launch();
const swState = (page) => page.evaluate(async () => ({ controlled: !!navigator.serviceWorker.controller, cached: (await Promise.all((await caches.keys()).map(async (k) => (await (await caches.open(k)).keys()).map((r) => k + ':' + new URL(r.url).pathname)))).flat() }));
const view = (page) => page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent ?? null, main: (document.querySelector('main')?.innerText ?? '').slice(0, 60) }));
async function go(page, u) {
  for (let i = 0; i < 3; i++) {
    try { await page.goto(u, { timeout: 15000 }); return true; } catch (e) { await sleep(500); }
  }
  return false;
}
try {
  const { page, context } = await newPage(browser);
  await go(page, url + '#/');
  await page.waitForSelector('#main-title', { timeout: 30000 });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await sleep(1000);
  console.log('[visit 1] SW:', JSON.stringify(await swState(page)));
  await srv.stop();
  try { await page.reload({ timeout: 10000 }); await sleep(1500); console.log('[offline after visit 1] reload ok:', JSON.stringify(await view(page))); }
  catch (e) { console.log('[offline after visit 1] reload failed:', e.message.split('\n')[0]); }
  await sleep(500);
  await srv.start();
  await go(page, 'about:blank');
  await go(page, url + '#/');
  await page.waitForSelector('#main-title', { timeout: 30000 });
  await sleep(1500);
  const s2 = await swState(page);
  console.log('[visit 2] controlled', s2.controlled, '| cached count:', s2.cached.length, '\n   ', s2.cached.map((c) => c.replace(/^epreuves-v1:/, '')).join(' '));
  await srv.stop();
  try { await page.reload({ timeout: 10000 }); await page.waitForSelector('#main-title', { timeout: 10000 }); console.log('[offline after visit 2] reload ok:', JSON.stringify(await view(page))); }
  catch (e) { console.log('[offline after visit 2] reload failed:', e.message.split('\n')[0]); }
  await page.evaluate(() => (location.hash = '/cultures'));
  await sleep(4000);
  console.log('[offline] #/cultures after 4 s:', JSON.stringify(await view(page)));
  await page.evaluate(() => (location.hash = '/ressources/anti-patterns'));
  await sleep(1500);
  console.log('[offline] #/ressources/anti-patterns:', JSON.stringify(await view(page)));
  await context.close();
} finally {
  await browser.close();
  await srv.stop();
}
