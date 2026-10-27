import { withStatic, go, seed, C } from './h.mjs';
import { answerCurrent } from '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/design/helpers.mjs';
const probe = () => {
  const st = document.querySelector('.hotspot-stage').getBoundingClientRect();
  const bar = document.querySelector('.player-top').getBoundingClientRect();
  const zones = document.querySelector('ol.zones')?.getBoundingClientRect();
  const fb = document.querySelector('section.feedback')?.getBoundingClientRect();
  const host = document.querySelector('.hotspot-stage .mock');
  const marks = host?.shadowRoot?.querySelectorAll('.mk-marks g') ?? [];
  const markRects = [...marks].map((g) => { const r = g.getBoundingClientRect(); return { cls: g.getAttribute('class'), top: Math.round(r.top), bottom: Math.round(r.bottom), anims: g.querySelector('path').getAnimations().map((a) => a.playState + '@' + Math.round(a.currentTime ?? -1)).join(',') }; });
  const visible = (r) => r ? Math.max(0, Math.round(Math.min(r.bottom, innerHeight) - Math.max(r.top, bar.bottom))) : null;
  return { t: Math.round(performance.now()), scrollY: Math.round(scrollY), vh: innerHeight, barBottom: Math.round(bar.bottom), stage: [Math.round(st.top), Math.round(st.bottom)], stageVisible: visible(st), zones: zones && [Math.round(zones.top), Math.round(zones.bottom)], zonesVisible: visible(zones), fbTop: fb && Math.round(fb.top), marks: markRects, marksVisible: markRects.filter((m) => m.bottom > bar.bottom && m.top < innerHeight).length };
};
await withStatic(async ({ browser, url }) => {
  for (const [name, vp, mob] of [['desktop-1366x900', { width: 1366, height: 900 }, false], ['desktop-1920x1080', { width: 1920, height: 1080 }, false]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mob, hasTouch: mob, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await seed(page, url);
    for (let run = 0; run < 3; run++) {
      await go(page, url, `/session?mode=type&id=hotspot&n=m1-${name}-${run}`, { wait: '.player' });
      // move to the run-th exercise
      for (let k = 0; k < run; k++) { await answerCurrent(page, 0); await page.waitForSelector('section.feedback'); await page.locator('.task-actions .btn-primary').click(); await page.waitForTimeout(300); }
      const id = await page.evaluate(() => document.querySelector('.task-prompt')?.id);
      await answerCurrent(page, run % 2);
      const samples = [];
      for (const ms of [0, 150, 300, 520, 900, 1500]) { await page.waitForTimeout(ms === 0 ? 0 : ms - (samples.at(-1)?.ms ?? 0)); samples.push({ ms, ...(await page.evaluate(probe)) }); }
      console.log(`\n== ${name} ${id}`);
      for (const s of samples) console.log(`  +${s.ms}ms scrollY=${s.scrollY} stage=${s.stage} stageVis=${s.stageVisible}px zones=${s.zones} zonesVis=${s.zonesVisible} fbTop=${s.fbTop} marksVisible=${s.marksVisible}/${s.marks.length} anims=${s.marks.map((m) => m.anims || '-').join('|')}`);
      if (run === 0) await page.screenshot({ path: `${C}/shots/m1-${name}.png` });
    }
    await ctx.close();
  }
});
