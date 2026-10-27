import { launch, open, go, AXE, focused } from './lib.mjs';
const b = await launch();
const { page, context } = await open(b, { width: 390, height: 740 });
for (const h of ['/ressources/commandes', '/cultures/comparer?a=fr&b=cn']) {
  await go(page, h);
  await page.waitForTimeout(800);
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['scrollable-region-focusable'] })).violations.map((v) => `${v.id}(${v.impact}) x${v.nodes.length} ${v.nodes.map((n) => JSON.stringify(n.target)).join(' ')}`));
  const sc = await page.evaluate(() => [...document.querySelectorAll('.table-scroll')].map((s) => ({ tabindex: s.getAttribute('tabindex'), sw: s.scrollWidth, cw: s.clientWidth, focusables: s.querySelectorAll('a,button,input,select,textarea,[tabindex]').length })));
  // Tab walk: does the scroller receive focus in this Chromium?
  let reached = false;
  await page.evaluate(() => document.querySelector('h1').focus());
  for (let i = 0; i < 40; i++) { await page.keyboard.press('Tab'); const isSc = await page.evaluate(() => document.activeElement?.classList.contains('table-scroll')); if (isSc) { reached = true; break; } }
  console.log(`${h}: axe=${JSON.stringify(r)} scrollers=${JSON.stringify(sc)} reachedByTab=${reached}`);
}
console.log('UA:', await page.evaluate(() => navigator.userAgent));
await context.close();
await b.close();
