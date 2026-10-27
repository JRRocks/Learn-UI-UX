import { launch, open, go, missed, SHOTS } from './lib.mjs';
import { COLOR_JS } from './colorlib.mjs';
const b = await launch();
const { page, context } = await open(b, { width: 1280, height: 900, storage: missed(['modes-operate-hotspot']) });
await go(page, '/session?mode=mistakes');
await page.waitForSelector('.mock[data-interactive]');
await page.addScriptTag({ content: COLOR_JS });
// Tab to zone 4, Enter (pick), Tab to zone 5 (focus, unpicked)
for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
await page.waitForTimeout(150);
await page.keyboard.press('Tab');
await page.waitForTimeout(150);
const st = await page.evaluate(() => {
  const root = document.querySelector('.mock').shadowRoot;
  return [...root.querySelectorAll('[data-hotspot]')].map((z) => { const cs = getComputedStyle(z); return { label: z.getAttribute('aria-label'), state: z.dataset.state ?? '', focused: root.activeElement === z, fv: z.matches(':focus-visible'), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off=${cs.outlineOffset}`, bg: cs.backgroundColor }; });
});
console.log(JSON.stringify(st, null, 1));
// Original background of zone 4 before pick (unpick it to read)
const bgInfo = await page.evaluate(() => {
  const root = document.querySelector('.mock').shadowRoot;
  const z = root.querySelectorAll('[data-hotspot]')[3];
  const picked = getComputedStyle(z).backgroundColor;
  const s = z.dataset.state; delete z.dataset.state; const orig = getComputedStyle(z).backgroundColor; z.dataset.state = s;
  const pageBg = __bgOf(z.parentElement);
  return { picked, orig, tintOnWhite: __ratio(__blend(__rgb('rgb(47 107 224 / 0.08)'), [255, 255, 255, 1]), [255, 255, 255, 1]).toFixed(2), outlineVsBg: __ratio(__rgb('#2f6be0'), pageBg).toFixed(2) };
});
console.log(JSON.stringify(bgInfo));
const box = await page.evaluate(() => { const r = document.querySelector('.mock').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
await page.screenshot({ path: `${SHOTS}/f10-picked-vs-focused.png`, clip: box });
await context.close();
await b.close();
