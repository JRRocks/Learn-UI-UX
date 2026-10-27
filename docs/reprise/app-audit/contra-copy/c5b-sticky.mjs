import { withApp, newPage, nav } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/' });
  let hits = 0;
  await page.route(/\/src\/content\/cultures\/profiles\.ts/, (r) => { hits++; return r.abort(); });
  await nav(page, '/cultures', 2500);
  await page.unroute(/\/src\/content\/cultures\/profiles\.ts/);
  let net = 0;
  page.on('request', (r) => { if (/profiles\.ts/.test(r.url())) net++; });
  const r = await page.evaluate(async () => {
    try { await import('/src/content/cultures/profiles.ts'); return 'ok'; } catch (e) { return 'ERR ' + e.message; }
  });
  console.log('blocked hits', hits, 're-import after unblock:', r, 'network requests on retry:', net);
  await nav(page, '/', 300);
  await nav(page, '/cultures', 2500);
  console.log('after revisit:', JSON.stringify((await page.locator('#main').innerText()).slice(0, 60)), 'net', net);
  await page.reload();
  await page.waitForTimeout(2500);
  console.log('after reload:', JSON.stringify((await page.locator('#main').innerText()).slice(0, 60)));
});
