import { withStatic, go, seed } from './h.mjs';
await withStatic(async ({ browser, url }) => {
  for (const reduced of ['no-preference', 'reduce']) {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: reduced });
    const page = await ctx.newPage();
    await seed(page, url);
    await go(page, url, '/session?mode=type&id=hotspot&n=m2' + reduced, { wait: '.player' });
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
        const gs = [...(host?.shadowRoot?.querySelectorAll('.mk-marks g') ?? [])];
        const st = document.querySelector('.hotspot-stage').getBoundingClientRect();
        window.__log.push(`${Math.round(performance.now() - t0)}ms y=${Math.round(scrollY)} stageBottom=${Math.round(st.bottom)} ` + gs.map((g) => { const p = g.querySelector('path'); const a = p.getAnimations()[0]; return `${g.getAttribute('class')}:${getComputedStyle(p).animationName}:${a ? a.playState + '@' + Math.round(a.currentTime) : 'none'}:off=${getComputedStyle(p).strokeDashoffset}`; }).join(' | '));
        if (performance.now() - t0 < 900) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      document.querySelector('.task-actions .btn-primary').click();
    });
    await page.waitForTimeout(1300);
    const log = await page.evaluate(() => window.__log);
    console.log(`\n== reducedMotion=${reduced} (${log.length} frames)`);
    let prev = '';
    for (const l of log) { const s = l.replace(/^\d+ms /, ''); if (s !== prev) console.log('  ' + l); prev = s; }
    await ctx.close();
  }
});
