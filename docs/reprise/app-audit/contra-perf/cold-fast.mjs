// Cold first visit under Lighthouse-like mobile throttling (CDP: 1.6 Mbit/s, 150 ms RTT, CPU x4), SW blocked.
// Usage: node cold.mjs <distDir>[,<distDir2>...] <runs> <route1,route2>
import { writeFileSync } from 'node:fs';
import { chromium, server, SLOW4G, OBS, med, HERE } from './lib.mjs';
const dists = process.argv[2].split(',');
const runs = Number(process.argv[3] || 3);
const routes = (process.argv[4] || '#/').split(',');
const srv = await server(dists[0]);
const browser = await chromium.launch();
const out = [];
try {
  for (let i = 0; i < runs; i++) for (const d of dists) for (const r of routes) {
    await srv.ctl({ root: d });
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR', serviceWorkers: 'block' });
    await ctx.addInitScript(OBS);
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 60, downloadThroughput: 9e6 / 8, uploadThroughput: 1.5e6 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(srv.base + r, { waitUntil: 'load', timeout: 120000 });
    await page.waitForFunction(() => window.__m.ready, null, { timeout: 120000 });
    await page.waitForTimeout(2500);
    // LCP is finalized on first input; emulate by reading entries now.
    const m = await page.evaluate(() => {
      const res = performance.getEntriesByType('resource').map((e) => ({ n: e.name.split('/').pop().replace(/-[\w-]{8}\./, '.'), s: Math.round(e.startTime), e: Math.round(e.responseEnd), kb: Math.round(e.transferSize / 1024) }));
      const M = window.__m;
      return { fcp: Math.round(M.fcp), lcp: M.lcp.at(-1), ready: M.ready, lt: M.lt, res, title: document.getElementById('main-title')?.textContent?.slice(0, 40) };
    });
    const tag = d.split('/').pop();
    out.push({ dist: tag, route: r, run: i, ...m, errs });
    const js = m.res.filter((x) => /\.(js|css)$/.test(x.n)).map((x) => `${x.n}:${x.s}->${x.e}(${x.kb}k)`).join(' ');
    console.log(`${tag} ${r} #${i} FCP ${m.fcp} ready ${m.ready} LCP ${m.lcp?.t} [${m.lcp?.tag}] LT ${m.lt.map((t) => t.d).join('+')} | ${js}${errs.length ? ' ERR ' + errs.join(';') : ''}`);
    await ctx.close();
  }
} finally { await browser.close(); srv.stop(); }
writeFileSync(HERE + 'cold-fast-' + Date.now() + '.json', JSON.stringify(out, null, 1));
for (const d of dists) for (const r of routes) {
  const rs = out.filter((o) => o.dist === d.split('/').pop() && o.route === r);
  console.log(`MEDIAN ${d.split('/').pop()} ${r}: FCP ${med(rs.map((o) => o.fcp))} ready ${med(rs.map((o) => o.ready))} LCP ${med(rs.map((o) => o.lcp?.t))}`);
}
