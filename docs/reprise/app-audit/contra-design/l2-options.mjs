import { withStatic, go, seed, C } from './h.mjs';
import { answerCurrent } from '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/design/helpers.mjs';
const measure = () => [...document.querySelectorAll('.option:not(.option--visual)')].filter((o) => o.querySelector('.option-text')).map((o) => {
  const k = o.querySelector('.option-key, .check-box').getBoundingClientRect();
  const t = o.querySelector('.option-text').getBoundingClientRect();
  return { alone: t.top >= k.bottom - 1, h: Math.round(o.getBoundingClientRect().height), textLeft: Math.round(t.left - o.getBoundingClientRect().left), len: o.querySelector('.option-text').textContent.length };
});
await withStatic(async ({ browser, url }) => {
  for (const [name, vp, mob] of [['m390', { width: 390, height: 844 }, true], ['d1366', { width: 1366, height: 900 }, false]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mob, hasTouch: mob });
    const page = await ctx.newPage();
    await seed(page, url);
    for (const t of ['choice', 'multi']) {
      await go(page, url, `/session?mode=type&id=${t}&n=l2-${name}-${t}`, { wait: '.player' });
      let tot = 0, alone = 0, aloneAfter = 0, totAfter = 0; const ex = [];
      for (let k = 0; k < 6; k++) {
        const before = await page.evaluate(measure);
        if (k === 0) await page.screenshot({ path: `${C}/shots/l2-${name}-${t}-q.png` });
        await answerCurrent(page, 1);
        await page.waitForSelector('section.feedback');
        await page.waitForTimeout(150);
        const after = await page.evaluate(measure);
        if (k === 0) { await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(100); await page.screenshot({ path: `${C}/shots/l2-${name}-${t}-a.png` }); }
        tot += before.length; alone += before.filter((x) => x.alone).length; totAfter += after.length; aloneAfter += after.filter((x) => x.alone).length;
        ex.push(before.map((x) => `${x.alone ? 'ALONE' : 'ok'}:${x.h}px:${x.len}c`).join(' ') + '  ⇒ after: ' + after.map((x) => `${x.alone ? 'ALONE' : 'ok'}:${x.h}`).join(' '));
        await page.locator('.task-actions .btn-primary').click();
        await page.waitForTimeout(250);
      }
      console.log(`\n== ${name} ${t}: before validate ${alone}/${tot} options with text under the key; after validate ${aloneAfter}/${totAfter}`);
      console.log('  ' + ex.join('\n  '));
    }
    await ctx.close();
  }
});
