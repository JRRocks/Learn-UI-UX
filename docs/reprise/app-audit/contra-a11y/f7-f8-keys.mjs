import { launch, open, go, seeded, missed, focused } from './lib.mjs';
const b = await launch();
const log = [];
// F7a: Blitz, focus on the h1, press "f"
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/session?mode=blitz');
  await page.getByRole('button', { name: /Lancer le chrono/ }).click();
  await page.waitForTimeout(300);
  const f = await focused(page);
  await page.keyboard.press('f');
  await page.waitForTimeout(200);
  const fb = await page.evaluate(() => document.querySelector('.feedback .verdict')?.textContent.trim() ?? null);
  log.push(`F7 blitz: focus=${f.tag}#${f.id} press "f" → feedback=${fb}`);
  // F8b: correction shown, focus "Quitter le défi", Enter
  await page.getByRole('button', { name: 'Quitter le défi' }).focus();
  const h1a = await page.evaluate(() => document.querySelector('h1').textContent.slice(0, 50));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const h1b = await page.evaluate(() => document.querySelector('h1')?.textContent.slice(0, 50));
  log.push(`F8 blitz: Enter on "Quitter le défi" with correction shown → hash=${await page.evaluate(() => location.hash)} h1 "${h1a}" → "${h1b}"`);
  // and with question pending, Enter on Quit
  await page.getByRole('button', { name: 'Quitter le défi' }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  log.push(`   blitz: Enter on "Quitter le défi" with question pending → hash=${await page.evaluate(() => location.hash)}`);
  await context.close();
}
// F7b: Cards, focus on h1, press Space then "1"
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/fiches?module=typography');
  await page.waitForTimeout(300);
  const f = await focused(page);
  const t0 = await page.evaluate(() => document.querySelector('.page-head .muted')?.textContent.slice(0, 20));
  await page.keyboard.press('Space');
  await page.waitForTimeout(150);
  await page.keyboard.press('1');
  await page.waitForTimeout(250);
  const t1 = await page.evaluate(() => document.querySelector('.page-head .muted')?.textContent.slice(0, 20));
  const n = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('learn-ui-ux:v1')).cards).length);
  log.push(`F7 cards: focus=${f.tag}#${f.id} Space then "1" → "${t0}" → "${t1}", cards scheduled=${n}`);
  // F8a: face-down card, Enter on "Arrêter la révision"
  await page.getByRole('button', { name: /Arrêter la révision/ }).focus();
  const shownBefore = await page.evaluate(() => Boolean(document.querySelector('.flashcard-a')));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const st = await page.evaluate(() => ({ hash: location.hash, shown: Boolean(document.querySelector('.flashcard-a')) }));
  log.push(`F8 cards: face-down (shown=${shownBefore}), Enter on "Arrêter la révision" → hash=${st.hash} answerShown=${st.shown}`);
  // after flip, Enter on Arrêter works?
  await page.getByRole('button', { name: /Arrêter la révision/ }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  log.push(`   cards: card shown, Enter on "Arrêter la révision" → hash=${await page.evaluate(() => location.hash)}`);
  await context.close();
}
// F8a bis: space on Arrêter; skip link Enter
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/fiches?module=typography');
  await page.getByRole('button', { name: /Arrêter la révision/ }).focus();
  await page.keyboard.press(' ');
  await page.waitForTimeout(300);
  log.push(`F8 cards: Space on "Arrêter la révision" → hash=${await page.evaluate(() => location.hash)} answerShown=${await page.evaluate(() => Boolean(document.querySelector('.flashcard-a')))}`);
  await context.close();
}
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/fiches?module=typography');
  await page.keyboard.press('Shift+Tab'); // from h1 back to … see
  let f = await focused(page);
  // focus skip link directly
  await page.evaluate(() => document.querySelector('a.skip').focus());
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  f = await focused(page);
  log.push(`F8 cards: Enter on skip link → focus=${f.tag}.${f.cls} answerShown=${await page.evaluate(() => Boolean(document.querySelector('.flashcard-a')))}`);
  await context.close();
}
// F7c: choice exercise: focus on h1, press "2"
{
  const idx = JSON.parse((await import('node:fs')).readFileSync('./ex-index.json', 'utf8'));
  const ch = idx.find((e) => e.type === 'choice' && !e.context);
  const { page, context } = await open(b, { storage: missed([ch.id]) });
  await go(page, '/session?mode=mistakes');
  await page.waitForTimeout(300);
  const f = await focused(page);
  await page.keyboard.press('2');
  await page.waitForTimeout(200);
  const checked = await page.evaluate(() => [...document.querySelectorAll('.options input')].map((i) => (i.checked ? 1 : 0)).join(''));
  log.push(`F7 choice ${ch.id}: focus=${f.tag}#${f.id} press "2" → checked=${checked}`);
  // and with focus on the Quit button
  await page.getByRole('button', { name: 'Quitter la session' }).focus();
  await page.keyboard.press('1');
  await page.waitForTimeout(200);
  log.push(`   focus on "Quitter la session", press "1" → checked=${await page.evaluate(() => [...document.querySelectorAll('.options input')].map((i) => (i.checked ? 1 : 0)).join(''))}`);
  await context.close();
}
// settings available
{
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/progression');
  const s = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('learn-ui-ux:v1')).settings));
  const groups = await page.evaluate(() => [...document.querySelectorAll('.settings .field-label')].map((x) => x.textContent.trim()));
  log.push(`settings keys=${JSON.stringify(s)} UI fields=${JSON.stringify(groups)}`);
  await context.close();
}
console.log(log.join('\n'));
await b.close();
