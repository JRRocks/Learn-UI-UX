import { launch, open, go, focused } from './lib.mjs';
const b = await launch();
for (const w of [1280, 390]) {
  const { page, context } = await open(b, { width: w, height: 800 });
  await go(page, '/apprendre/typography');
  const links = page.locator('.lesson-toc a');
  const n = await links.count();
  const second = links.nth(1);
  const txt = await second.textContent();
  await second.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  let f = await focused(page);
  const target = await page.evaluate((t) => { const h = [...document.querySelectorAll('.lesson-section h2')].find((x) => x.textContent.trim() === t.trim()); return h ? Math.round(h.getBoundingClientRect().y) : null; }, txt);
  await page.keyboard.press('Tab');
  const f2 = await focused(page);
  console.log(`w=${w} toc links=${n}; Enter on "${txt.trim()}" → section h2 at y=${target}; focus stays on ${f.tag} "${f.text.slice(0, 40)}" (y=${f.rect.y}); next Tab → ${f2.tag} "${f2.text.slice(0, 40)}" y=${f2.rect.y}`);
  await context.close();
}
await b.close();
