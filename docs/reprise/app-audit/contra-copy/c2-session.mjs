import { withApp, newPage, nav, today, OUT } from './h.mjs';
const t = today();
async function runTF(page, key) {
  await nav(page, `/session?mode=type&id=truefalse&n=${Date.now()}`, 800);
  for (let i = 0; i < 12; i++) {
    const done = await page.locator('h1#main-title').count();
    if (done) break;
    await page.keyboard.press(key);
    await page.waitForTimeout(80);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
  }
}
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/' });
  await runTF(page, 'v');
  console.log('A TITLE:', JSON.stringify(await page.locator('h1#main-title').innerText()));
  console.log('A SCORE:', JSON.stringify(await page.locator('.summary-score').innerText()));
  console.log('A MESSAGE:', JSON.stringify(await page.locator('.page-head p.muted').innerText()));
  const links = await page.locator('.btn-row a').evaluateAll((as) => as.map((a) => `${a.textContent} -> ${a.getAttribute('href')}`));
  console.log('A BUTTONS:', links);
  const st = await page.evaluate(() => JSON.parse(localStorage.getItem('learn-ui-ux:v1')));
  const items = Object.entries(st.items);
  console.log('A ITEMS:', items.map(([id, s]) => `${s.last}/box${s.box}/due=${s.due}`).join(' '));
  console.log('today =', t);
  await nav(page, '/', 600);
  console.log('A HOME REVISIONS:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Révisions' }).innerText()));
  await nav(page, '/entrainement', 600);
  console.log('A PRACTICE REVIEW:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Révisions espacées' }).innerText()));
  await nav(page, `/session?mode=review&n=${Date.now()}`, 800);
  console.log('A REVIEW SESSION label:', JSON.stringify(await page.locator('.player-progress-label').innerText().catch(() => 'none')));

  // Run B: answer F everywhere in a fresh context.
  const p2 = await newPage(browser, base, { hash: '/' });
  await runTF(p2, 'f');
  console.log('B SCORE:', JSON.stringify(await p2.locator('.summary-score').innerText()));
  console.log('B MESSAGE:', JSON.stringify(await p2.locator('.page-head p.muted').innerText()));
  const st2 = await p2.evaluate(() => JSON.parse(localStorage.getItem('learn-ui-ux:v1')));
  console.log('B ITEMS:', Object.entries(st2.items).map(([id, s]) => `${s.last}/box${s.box}/due=${s.due}`).join(' '));
  await p2.screenshot({ path: `${OUT}/c2-summary-B.png` });
});
