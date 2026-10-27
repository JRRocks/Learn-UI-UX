// sw-1: what does the SW cache after ONE online visit, and does the app open offline afterwards?
// Offline = server drops every connection (affects page and SW alike). Variants: reload, fresh navigation with
// HTTP cache still fresh (<10 min), fresh navigation with HTTP cache gone (CDP clearBrowserCache, CacheStorage kept).
import { chromium, server } from './lib.mjs';
const dist = process.argv[2];
const srv = await server(dist);
const browser = await chromium.launch();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const keys = (page) => page.evaluate(async () => (await caches.keys()).length ? (await (await caches.open((await caches.keys())[0])).keys()).map((r) => new URL(r.url).pathname.split('/').pop() || '(page)') : []);
async function firstVisit(extra = 0) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(srv.base + '#/', { waitUntil: 'load' });
  await page.waitForSelector('#main-title');
  const ctl = await page.evaluate(async () => { await navigator.serviceWorker.ready; for (let i = 0; i < 50 && !navigator.serviceWorker.controller; i++) await new Promise((r) => setTimeout(r, 100)); return Boolean(navigator.serviceWorker.controller); });
  // SPA navigation by hash (no request), like a real first session
  for (const h of ['#/apprendre', '#/apprendre/typography', '#/entrainement', '#/cultures']) { await page.evaluate((h) => (location.hash = h), h); await sleep(600); }
  await sleep(extra);
  return { ctx, page, ctl };
}
const tryOpen = async (page, how) => {
  try {
    if (how === 'reload') await page.reload({ waitUntil: 'load', timeout: 15000 });
    else { await page.goto('about:blank'); await page.goto(srv.base + '#/', { waitUntil: 'load', timeout: 15000 }); }
    const ok = await page.waitForSelector('#main-title', { timeout: 8000 }).then(() => true, () => false);
    return ok ? 'APP OK' : 'loaded but no app: ' + (await page.evaluate(() => document.body.innerText.slice(0, 80)));
  } catch (e) { return 'FAIL ' + e.message.split('\n')[0].slice(0, 90); }
};
try {
  for (const how of ['reload', 'goto-fresh-http-cache', 'goto-after-http-cache-expiry']) {
    await srv.ctl({ down: 0 });
    const { ctx, page, ctl } = await firstVisit();
    const k = await keys(page);
    console.log(`[1st visit] controlled=${ctl} SW cache entries=${k.length}: ${k.join(', ')}`);
    if (how === 'goto-after-http-cache-expiry') { const cdp = await ctx.newCDPSession(page); await cdp.send('Network.clearBrowserCache'); }
    await srv.ctl({ down: 1 });
    console.log(`   offline ${how}: ${await tryOpen(page, how === 'reload' ? 'reload' : 'goto')}`);
    await srv.ctl({ down: 0 });
    await ctx.close();
  }
  // Second online visit, then offline after HTTP cache expiry.
  const { ctx, page } = await firstVisit();
  await page.reload({ waitUntil: 'load' }); await page.waitForSelector('#main-title'); await sleep(1500);
  const k2 = await keys(page);
  console.log(`[2nd visit] SW cache entries=${k2.length}: ${k2.join(', ')}`);
  const cdp = await ctx.newCDPSession(page); await cdp.send('Network.clearBrowserCache');
  await srv.ctl({ down: 1 });
  console.log(`   offline after 2nd visit (HTTP cache expired): ${await tryOpen(page, 'goto')}`);
  await page.evaluate(() => (location.hash = '#/cultures')); await sleep(3000);
  console.log('   offline Cultures tab after 2nd visit:', await page.evaluate(() => document.querySelector('main').innerText.slice(0, 80).replace(/\n/g, ' ')));
  await srv.ctl({ down: 0 });
  await ctx.close();
} finally { await browser.close(); srv.stop(); }
