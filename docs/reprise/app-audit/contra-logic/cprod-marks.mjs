import { chromium, sleep, DIR } from './h.mjs';
import { staticServer } from './static.mjs';
const srv = staticServer(DIR + '/dist');
const url = await srv.start();
const browser = await chromium.launch();
try {
  const c = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 1280, height: 900 } });
  const page = await c.newPage();
  await page.goto(url + '#/session?mode=type&id=hotspot');
  await page.waitForSelector('.task-prompt', { timeout: 30000 });
  const needed = Number((await page.textContent('.hotspot-count')).split('/')[1]);
  const zones = page.locator('.hotspot-stage [data-hotspot]');
  for (let i = 0, n = 0; i < (await zones.count()) && n < needed; i++) {
    const before = await page.textContent('.hotspot-count');
    await zones.nth(i).click({ force: true });
    if ((await page.textContent('.hotspot-count')) !== before) n++;
  }
  await page.evaluate(() => {
    window.__log = [];
    const t0 = performance.now();
    const tick = () => {
      const host = document.querySelector('.hotspot-stage .mock');
      const g = host?.shadowRoot?.querySelector('.mk-marks g');
      const p = g?.querySelector('path');
      window.__log.push(`${Math.round(performance.now() - t0)}ms ${g ? g.getAttribute('class') : '-'} ${p ? getComputedStyle(p).animationName : '-'}`);
      if (performance.now() - t0 < 700) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    document.querySelector('.task-actions .btn-primary').click();
  });
  await sleep(1000);
  const log = await page.evaluate(() => window.__log);
  console.log('[prod 26] states:', [...new Set(log.map((l) => l.split(' ').slice(1).join(' ')))], '| first frames:', log.filter((l) => !l.endsWith('- -')).slice(0, 3));
  await c.close();
} finally {
  await browser.close();
  await srv.stop();
}
