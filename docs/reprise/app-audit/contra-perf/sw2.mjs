// sw-2: return visit with everything in the SW cache but the HTML stale in the HTTP cache, slow or hanging document request.
import { chromium, server, OBS } from './lib.mjs';
const srv = await server(process.argv[2]);
const browser = await chromium.launch();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function visit(page) {
  await page.goto('about:blank');
  const t = Date.now();
  await page.goto(srv.base + '#/', { waitUntil: 'commit', timeout: 60000 }).catch((e) => null);
  const ok = await page.waitForSelector('#main-title', { timeout: 30000 }).then(() => true, () => false);
  return ok ? `app after ${Date.now() - t} ms` : `no app after ${Date.now() - t} ms`;
}
try {
  for (const sw of [true, false]) {
    for (const cond of [{ navDelay: 0, hang: 0 }, { navDelay: 6000, hang: 0 }, { navDelay: 0, hang: 1 }]) {
      await srv.ctl({ navDelay: 0, hang: 0, down: 0 });
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: sw ? 'allow' : 'block' });
      await ctx.addInitScript(OBS);
      const page = await ctx.newPage();
      // two online visits so the SW cache holds the shell
      for (let i = 0; i < 2; i++) { await page.goto('about:blank'); await page.goto(srv.base + '#/', { waitUntil: 'load' }); await page.waitForSelector('#main-title'); if (sw) await page.evaluate(async () => { await navigator.serviceWorker.ready; }); await sleep(800); }
      const n = sw ? await page.evaluate(async () => (await (await caches.open('epreuves-v1')).keys()).length) : 0;
      const cdp = await ctx.newCDPSession(page); await cdp.send('Network.clearBrowserCache'); // HTML no longer fresh (max-age=600 elapsed)
      await srv.ctl(cond);
      console.log(`SW=${sw ? 'on (cache ' + n + ' entries)' : 'off'} navDelay=${cond.navDelay} hang=${cond.hang}: ${await visit(page)}`);
      await srv.ctl({ navDelay: 0, hang: 0 });
      await ctx.close();
    }
  }
} finally { await browser.close(); srv.stop(); }
