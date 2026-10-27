import { launch, open, go, focused } from './lib.mjs';
const b = await launch();
const { page, context } = await open(b);
await go(page, '/cultures/comparer?a=fr&b=cn');
await page.waitForSelector('#cb');
await page.waitForTimeout(400);
await page.focus('#cb');
const log = [];
for (let i = 0; i < 3; i++) {
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(500);
  const f = await focused(page);
  log.push(`ArrowDown #${i + 1}: hash=${await page.evaluate(() => location.hash)} h1="${await page.evaluate(() => document.querySelector('h1').textContent)}" focus=${f.tag}#${f.id}`);
}
console.log(log.join('\n'));
// Does the select stay the same DOM node?
await context.close();
await b.close();
