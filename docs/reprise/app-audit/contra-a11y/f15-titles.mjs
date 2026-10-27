import { launch, open, go, focused } from './lib.mjs';
const b = await launch();
const { page, context } = await open(b);
for (const h of ['/', '/page-inexistante', '/apprendre/lecon-inconnue', '/cultures/xx', '/cultures', '/cultures/fr', '/cultures/labo', '/ressources/glossaire', '/session?mode=blitz', '/session?mode=review', '/apprendre/typography']) {
  await go(page, h);
  await page.waitForTimeout(800);
  console.log(`${h.padEnd(28)} title=«${await page.title()}» h1=«${await page.evaluate(() => document.querySelector('h1')?.textContent.trim().slice(0, 40))}»`);
}
await context.close();
// First visit of Cultures via nav link (fresh page so the culture chunk is not loaded)
for (const [w, sel] of [[1280, '.rail a[href="#/cultures"]'], [390, '.tabbar a[href="#/cultures"]']]) {
  const { page, context } = await open(b, { width: w, height: 800 });
  await go(page, '/');
  await page.focus(sel);
  await page.keyboard.press('Enter');
  const seq = [];
  for (const t of [50, 400, 1500, 3000]) { await page.waitForTimeout(t === 50 ? 50 : t - (seq.length ? [50, 400, 1500][seq.length - 1] : 0)); const f = await focused(page); seq.push(`${t}ms:${f.tag}${f.id ? '#' + f.id : ''}"${f.text.slice(0, 20)}"`); }
  // second visit: go home, then Cultures again
  await page.evaluate(() => (location.hash = '/'));
  await page.waitForTimeout(500);
  await page.focus(sel);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  const f2 = await focused(page);
  console.log(`width ${w}: first visit focus ${seq.join(' ')} | second visit: ${f2.tag}#${f2.id}`);
  await context.close();
}
await b.close();
