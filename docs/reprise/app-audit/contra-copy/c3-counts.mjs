import { withApp, newPage, nav, OUT } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/apprendre/typography' });
  console.log('META:', JSON.stringify(await page.locator('.page-head .meta').innerText()));
  console.log('ASIDE:', JSON.stringify(await page.locator('.lesson-aside .section').innerText()));
  await page.locator('.lesson-aside a', { hasText: 'S’entraîner' }).click();
  await page.waitForTimeout(800);
  console.log('SESSION LABEL:', JSON.stringify(await page.locator('.player-progress-label').innerText()));
  await nav(page, '/entrainement', 600);
  console.log('PRACTICE PAR LECON:', JSON.stringify(await page.locator('section[aria-labelledby=module-title]').innerText()));
  // (b) personas cards twice
  await nav(page, '/apprendre/personas', 600);
  const btn = page.locator('.lesson-aside a', { hasText: 'fiches' });
  console.log('CARDS BTN 1:', JSON.stringify(await btn.innerText()));
  await btn.click();
  await page.waitForTimeout(600);
  let n = 0;
  for (; n < 30; n++) {
    const flip = page.getByRole('button', { name: 'Retourner la fiche' });
    if (!(await flip.count())) break;
    await flip.click();
    await page.getByRole('button', { name: /Bien/ }).click();
    await page.waitForTimeout(60);
  }
  console.log('graded', n, 'END:', JSON.stringify(await page.locator('.page-head').innerText()));
  await nav(page, '/apprendre/personas', 600);
  console.log('CARDS BTN 2:', JSON.stringify(await btn.innerText()));
  await btn.click();
  await page.waitForTimeout(600);
  console.log('SECOND VISIT:', JSON.stringify(await page.locator('.page-head').innerText()));
  // (c) cultures
  await nav(page, '/cultures', 1500);
  console.log('CULTURES LINK:', JSON.stringify(await page.locator('a.side-link', { hasText: 'S’entraîner sur les cultures' }).innerText()));
  await page.locator('a.side-link', { hasText: 'S’entraîner sur les cultures' }).click();
  await page.waitForTimeout(800);
  console.log('CULTURE SESSION:', JSON.stringify(await page.locator('.player-progress-label').innerText()));
  // Practice formats counts vs session size
  await nav(page, '/entrainement', 600);
  console.log('FORMAT duel:', JSON.stringify(await page.locator('li.format').first().innerText()));
});
