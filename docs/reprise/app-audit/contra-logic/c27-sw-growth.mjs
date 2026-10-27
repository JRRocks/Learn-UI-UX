import { chromium, newPage, sleep, DIR } from './h.mjs';
import { staticServer } from './static.mjs';
const srv = staticServer(DIR + '/dist');
const url = await srv.start();
const browser = await chromium.launch();
const cached = (page) => page.evaluate(async () => (await Promise.all((await caches.keys()).map(async (k) => (await (await caches.open(k)).keys()).map((r) => k + ':' + new URL(r.url).pathname)))).flat());
try {
  const { page, context } = await newPage(browser);
  await page.goto(url + '#/');
  await page.waitForSelector('#main-title', { timeout: 30000 });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await sleep(800);
  await page.reload();
  await page.waitForSelector('#main-title');
  await sleep(1000);
  console.log('[deploy 1] content bundles in cache:', (await cached(page)).filter((c) => /content-/.test(c)));
  // deploy 2: same origin, new hashed content chunk
  srv.setRoot(DIR + '/dist2');
  await page.reload();
  await page.waitForSelector('#main-title');
  await sleep(1500);
  const all = await cached(page);
  console.log('[deploy 2] content bundles in cache:', all.filter((c) => /content-/.test(c)));
  console.log('[deploy 2] manifest/favicon cached?', all.filter((c) => /manifest|favicon/.test(c)));
  console.log('[deploy 2] cache names:', await page.evaluate(() => caches.keys()));
  await context.close();
} finally {
  await browser.close();
  await srv.stop();
}
