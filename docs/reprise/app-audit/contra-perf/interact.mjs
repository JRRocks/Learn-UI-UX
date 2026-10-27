// Navigation / interaction cost with Long Animation Frames + Event Timing, CPU xN (default 4), variants interleaved.
// Usage: CPU=4 node interact.mjs <dist1,dist2,...> <reps>
import { writeFileSync } from 'node:fs';
import { chromium, server, OBS, med, HERE } from './lib.mjs';
const dists = process.argv[2].split(',');
const reps = Number(process.argv[3] || 3);
const CPU = Number(process.env.CPU || 4);
const srv = await server(dists[0]);
const browser = await chromium.launch();
const R = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function open(dist, hash) {
  await srv.ctl({ root: dist });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR', serviceWorkers: 'block' });
  await ctx.addInitScript(OBS);
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('pageerror', e.message));
  await page.goto(srv.base + hash, { waitUntil: 'load' });
  await page.waitForSelector('#main-title');
  if (CPU > 1) { const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU }); }
  await sleep(1200);
  return { ctx, page };
}
async function measure(page, key, action, wait = 2500) {
  await page.evaluate(() => { window.__m.loaf.length = 0; window.__m.ev.length = 0; window.__t0 = performance.now(); });
  await action();
  await sleep(wait);
  const r = await page.evaluate(() => {
    const t0 = window.__t0, M = window.__m;
    const lo = M.loaf.filter((l) => l.s + l.d >= t0);
    const byId = {};
    for (const e of M.ev) if (e.id && e.s >= t0 - 5) byId[e.id] = Math.max(byId[e.id] || 0, e.d);
    return { loafTotal: lo.reduce((a, l) => a + l.d, 0), loafMax: Math.max(0, ...lo.map((l) => l.d)), busy: lo.length ? Math.round(Math.max(...lo.map((l) => l.s + l.d)) - t0) : 0, inp: Math.max(0, ...Object.values(byId)), n: lo.length };
  });
  (R[key] ??= []).push(r);
  console.log(`${key.padEnd(46)} loafTotal ${String(r.loafTotal).padStart(5)} | max ${String(r.loafMax).padStart(5)} | click→end ${String(r.busy).padStart(5)} | INP ${r.inp}`);
}
try {
  for (let i = 0; i < reps; i++) for (const d of dists) {
    const v = d.split('/').pop();
    { const { ctx, page } = await open(d, '#/apprendre');
      await measure(page, `${v} | Apprendre→craft-floor`, () => page.click('a[href="#/apprendre/craft-floor"]'));
      await page.click('a.back'); await sleep(1500);
      await measure(page, `${v} | Apprendre→culture`, () => page.click('a[href="#/apprendre/culture"]'));
      await ctx.close(); }
    { const { ctx, page } = await open(d, '#/ressources');
      await measure(page, `${v} | Ressources→Anti-patterns`, () => page.click('a[href="#/ressources/anti-patterns"]'), 4000);
      await measure(page, `${v} | Catalogue: thème`, () => page.click('.topbar .icon-btn'));
      await page.click('#ap-q'); await page.keyboard.type('contraste'); await sleep(1500);
      await measure(page, `${v} | Catalogue: effacer recherche`, async () => { await page.keyboard.press('Control+A'); await page.keyboard.press('Backspace'); }, 3000);
      await ctx.close(); }
  }
} finally { await browser.close(); srv.stop(); }
writeFileSync(HERE + `interact-cpu${CPU}-${Date.now()}.json`, JSON.stringify(R, null, 1));
console.log('\nMEDIANS (CPU x' + CPU + ')');
for (const [k, rs] of Object.entries(R)) console.log(`${k.padEnd(46)} loafTotal ${med(rs.map((r) => r.loafTotal))} | click→end ${med(rs.map((r) => r.busy))} | INP ${med(rs.map((r) => r.inp))}`);
