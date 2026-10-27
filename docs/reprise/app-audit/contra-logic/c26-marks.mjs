import { chromium, devServer, newPage, sleep, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const { page } = await newPage(browser);
  await page.goto(srv.url + '#/session?mode=type&id=hotspot');
  await page.waitForSelector('.task-prompt', { timeout: 60000 });
  const id = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  const ex = await exById(page, id);
  for (const h of ex.hotspots.filter((h) => h.correct)) await page.locator(`[data-hotspot="${h.id}"]`).click(); // all hits -> animated marks
  await page.evaluate(() => {
    window.__log = [];
    const host = document.querySelector('.hotspot-stage .mock');
    const t0 = performance.now();
    let svgCount = 0, lastSvg = null;
    const tick = () => {
      const svg = host.shadowRoot.querySelector('.mk-marks');
      if (svg && svg !== lastSvg) { svgCount++; lastSvg = svg; }
      const g = host.shadowRoot.querySelector('.mk-marks g');
      const path = g?.querySelector('path');
      const cs = path ? getComputedStyle(path) : null;
      window.__log.push(`${Math.round(performance.now() - t0)}ms ${g ? g.getAttribute('class') : '-'} anim=${cs ? cs.animationName : '-'} dashoffset=${cs ? cs.strokeDashoffset : '-'} svg#${svgCount}`);
      if (performance.now() - t0 < 650) requestAnimationFrame(tick);
    };
    document.querySelector('.task-actions .btn-primary').click();
    requestAnimationFrame(tick);
  });
  await sleep(900);
  const log = await page.evaluate(() => window.__log);
  console.log('[26] frames:', log.length);
  for (const l of log.slice(0, 6)) console.log('   ', l);
  console.log('    …', log.at(-1));
  // Does a reduced-motion-free page ever show a partially drawn path (dashoffset between 0 and len)?
  const partial = log.filter((l) => /draw/.test(l) && !/dashoffset=0px/.test(l));
  console.log('[26] frames with class draw:', log.filter((l) => / hit draw| miss draw/.test(l)).length, '| frames showing a partially drawn loop:', partial.length);
} finally {
  await browser.close();
  await srv.close();
}
