import { launch, open, go, missed, SHOTS } from './lib.mjs';
import { COLOR_JS } from './colorlib.mjs';
const b = await launch();
for (const dark of [false, true]) {
  const { page, context } = await open(b, { width: 1280, height: 900, dark, storage: missed(['heuristics-grid-booking']) });
  await go(page, '/session?mode=mistakes');
  await page.waitForSelector('.grid-row');
  await page.locator('.grid-row').first().locator('button').nth(2).click();
  await page.mouse.move(5, 5);
  await page.evaluate(() => document.querySelector('.task-prompt').focus());
  await page.waitForTimeout(200);
  await page.addScriptTag({ content: COLOR_JS });
  const m = await page.evaluate(() => {
    const g = document.querySelector('.grid-row .segmented');
    const on = g.querySelector('[aria-pressed="true"]');
    const off = g.querySelector('[aria-pressed="false"]');
    const gBg = __bgOf(g); const onBg = __bgOf(on); const offBg = __bgOf(off);
    const onFg = __blend(__rgb(getComputedStyle(on).color), onBg); const offFg = __blend(__rgb(getComputedStyle(off).color), offBg);
    const shadow = getComputedStyle(on).boxShadow;
    const ring = (shadow.match(/(rgb[a]?\([^)]*\)|oklch\([^)]*\)|color\([^)]*\))\s+0px\s+0px\s+0px\s+1px/) || [])[1];
    return {
      pressedBg_vs_groupBg: __ratio(onBg, gBg).toFixed(2),
      pressedText_vs_unpressedText: __ratio(onFg, offFg).toFixed(2),
      ring: ring ? `${ring} → vs group bg ${__ratio(__blend(__rgb(ring), gBg), gBg).toFixed(2)}` : shadow,
      textOn: __ratio(onFg, onBg).toFixed(2), textOff: __ratio(offFg, offBg).toFixed(2),
      weights: `${getComputedStyle(on).fontWeight}/${getComputedStyle(off).fontWeight}`,
    };
  });
  console.log(`dark=${dark}`, JSON.stringify(m));
  await page.locator('.grid-row').first().scrollIntoViewIfNeeded();
  await page.locator('.grid-row').first().screenshot({ path: `${SHOTS}/f11-grid-row-${dark ? 'dark' : 'light'}.png` });
  await context.close();
}
await b.close();
