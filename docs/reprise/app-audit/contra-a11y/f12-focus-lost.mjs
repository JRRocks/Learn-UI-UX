import { launch, open, go, seeded, missed, focused } from './lib.mjs';
import { readFileSync } from 'node:fs';
const idx = JSON.parse(readFileSync('./ex-index.json', 'utf8'));
const b = await launch();
const log = [];
// Order: focus the "Monter" of item at position 2 → press Enter
{
  const ord = idx.find((e) => e.type === 'order');
  const { page, context } = await open(b, { storage: missed([ord.id]) });
  await go(page, '/session?mode=mistakes');
  await page.waitForTimeout(300);
  const btn = page.locator('.order-item').nth(1).locator('button').first();
  const label = await btn.getAttribute('aria-label');
  await btn.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  let f = await focused(page);
  log.push(`order ${ord.id}: Enter on ${label} (pos 2→1) → focus=${f.body ? 'BODY' : f.tag + ' ' + f.text}`);
  const live = await page.evaluate(() => [...document.querySelectorAll('[aria-live],[role=status],[role=alert]')].map((e) => `${e.className}:${e.textContent.trim().slice(0, 30)}`));
  log.push(`   live regions: ${JSON.stringify(live)}`);
  await page.keyboard.press('Tab');
  f = await focused(page);
  log.push(`   next Tab → ${f.tag} "${f.text}"`);
  // Monter at position 3 (not reaching top): does focus stay?
  const btn2 = page.locator('.order-item').nth(2).locator('button').first();
  const label2 = await btn2.getAttribute('aria-label');
  await btn2.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  f = await focused(page);
  log.push(`   Enter on ${label2} (pos 3→2) → focus=${f.body ? 'BODY' : f.tag + ' ' + f.text}`);
  await context.close();
}
// Blitz: Enter on "Vrai" button
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/session?mode=blitz');
  await page.getByRole('button', { name: /Lancer le chrono/ }).click();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: /Vrai/ }).focus();
  // Observe live region insertion
  await page.evaluate(() => { window.__mut = []; new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && window.__mut.push(`${n.tagName}.${n.className} live=${n.getAttribute('aria-live')} text="${n.textContent.trim().slice(0, 20)}"`)))).observe(document.querySelector('.task'), { childList: true, subtree: true }); });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  const f = await focused(page);
  log.push(`blitz: Enter on "Vrai" → focus=${f.body ? 'BODY' : f.tag + ' ' + f.text}; inserted=${JSON.stringify(await page.evaluate(() => window.__mut))}`);
  await context.close();
}
// Cards: click / Enter on "Retourner la fiche"
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/fiches?module=typography');
  await page.getByRole('button', { name: 'Retourner la fiche' }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  let f = await focused(page);
  log.push(`cards: Enter on "Retourner la fiche" → focus=${f.body ? 'BODY' : f.tag + ' ' + f.text}`);
  await page.keyboard.press('Tab');
  f = await focused(page);
  log.push(`   next Tab → ${f.tag} "${f.text}"`);
  await context.close();
}
console.log(log.join('\n'));
await b.close();
