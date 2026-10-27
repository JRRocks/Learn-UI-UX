import { chromium, devServer, newPage, sleep, exById, text } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const { page, errors } = await newPage(browser);
  await page.goto(srv.url + '#/session?mode=type&id=hotspot');
  await page.waitForSelector('.task-prompt', { timeout: 60000 });
  const id = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  const ex = await exById(page, id);
  for (const h of ex.hotspots.filter((h) => h.correct)) await page.locator(`[data-hotspot="${h.id}"]`).click();
  console.log('count:', await text(page, '.hotspot-count'), '| valider enabled:', await page.isEnabled('.task-actions .btn-primary'));
  await page.evaluate(() => {
    window.__log = [];
    const t0 = performance.now();
    const tick = () => {
      const host = document.querySelector('.hotspot-stage .mock');
      const svg = host?.shadowRoot?.querySelector('.mk-marks');
      const g = svg?.querySelector('g');
      const path = g?.querySelector('path');
      const cs = path ? getComputedStyle(path) : null;
      window.__log.push(`${Math.round(performance.now() - t0)}ms ${g ? g.getAttribute('class') : '-'} anim=${cs ? cs.animationName : '-'} off=${cs ? cs.strokeDashoffset : '-'} len=${path ? path.style.getPropertyValue('--len') : '-'}`);
      if (performance.now() - t0 < 700) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    document.querySelector('.task-actions .btn-primary').click();
  });
  await sleep(1000);
  const log = await page.evaluate(() => window.__log);
  console.log('frames', log.length);
  for (const l of log.slice(0, 8)) console.log('  ', l);
  console.log('  …', log.at(-1));
  console.log('feedback visible:', await page.isVisible('.feedback'), '| marks now:', await page.evaluate(() => document.querySelector('.hotspot-stage .mock')?.shadowRoot?.querySelectorAll('.mk-marks g').length));
  console.log('reduced motion?', await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
  console.log(errors);
} finally {
  await browser.close();
  await srv.close();
}
