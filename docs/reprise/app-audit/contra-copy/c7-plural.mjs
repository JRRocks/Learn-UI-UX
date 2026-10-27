import { withApp, newPage, nav, today, baseState, OUT } from './h.mjs';
const t = today();
const st = baseState({
  xp: 10,
  days: { [t]: { xp: 10, answered: 1, correct: 1 } },
  items: { 'x-1': { seen: 1, correct: 1, last: 'correct', lastSeen: t, box: 1, due: t } },
  badges: { 'first-step': t },
});
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { state: st, hash: '/progression' });
  console.log('ACTIVITY:', JSON.stringify(await page.locator('#act-title + p').innerText()));
  console.log('HEATMAP aria:', await page.locator('.heatmap').getAttribute('aria-label'));
  console.log('BADGE:', JSON.stringify(await page.locator('.badge[data-earned] small').first().innerText()));
  console.log('HEAT title sample:', await page.locator('.heatmap i:not([data-future])').last().getAttribute('title'));
  await page.getByRole('button', { name: /Effacer ma progression…/ }).click();
  await page.waitForTimeout(200);
  console.log('DIALOG:', JSON.stringify(await page.locator('dialog.dialog').innerText()));
  await page.keyboard.press('Escape');
  await nav(page, '/', 500);
  console.log('HOME STREAK:', JSON.stringify(await page.locator('#streak-title').locator('xpath=../..').innerText()));
  console.log('HOME STRIP title:', await page.locator('.streak-strip i').last().getAttribute('title'));
  console.log('RAIL:', JSON.stringify(await page.locator('.rail-streak').innerText()));
  // Cards: grade 1 of N as "Bien", others "À revoir"
  await nav(page, '/apprendre/personas', 500);
  await page.locator('.lesson-aside a', { hasText: 'fiches' }).click();
  await page.waitForTimeout(500);
  let i = 0;
  for (; i < 30; i++) {
    const flip = page.getByRole('button', { name: 'Retourner la fiche' });
    if (!(await flip.count())) break;
    await flip.click();
    if (i === 0) console.log('GRADES:', JSON.stringify(await page.locator('.grades').innerText()));
    await page.getByRole('button', { name: i === 0 ? /^Bien/ : /^À revoir/ }).click();
    await page.waitForTimeout(40);
  }
  console.log('CARDS END:', JSON.stringify(await page.locator('.page-head .lead').innerText()));
  // Blitz with fake clock to reach 1 second.
  const p2 = await newPage(browser, base, { hash: '/' });
  await p2.clock.install();
  await nav(p2, '/session?mode=blitz', 600);
  await p2.getByRole('button', { name: /Lancer le chrono/ }).click();
  await p2.clock.runFor(89_000);
  await p2.waitForTimeout(200);
  console.log('BLITZ TIMER aria:', await p2.locator('[role=timer]').getAttribute('aria-label'), '| visible:', JSON.stringify(await p2.locator('.player-progress-label .num').innerText()));
});
