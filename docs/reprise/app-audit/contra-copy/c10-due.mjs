import { withApp, newPage, nav, today, baseState } from './h.mjs';
const t = today();
const st = baseState({
  xp: 20,
  days: { [t]: { xp: 20, answered: 2, correct: 1 } },
  items: { 'renamed-or-deleted-id': { seen: 1, correct: 0, last: 'wrong', lastSeen: t, box: 0, due: t } },
});
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { state: st, hash: '/' });
  console.log('HOME REVIEW:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Révisions' }).innerText()));
  await nav(page, '/entrainement', 500);
  console.log('PRACTICE REVIEW:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Révisions espacées' }).innerText()));
  console.log('PRACTICE MISTAKES:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Mes erreurs' }).innerText()));
  await nav(page, '/session?mode=review', 600);
  console.log('REVIEW SESSION:', JSON.stringify(await page.locator('.page-head').innerText()));
  await nav(page, '/progression', 500);
  console.log('PROGRESS seen + dialog count:', JSON.stringify(await page.locator('dt', { hasText: 'Épreuves vues' }).locator('xpath=..').innerText()));
  await page.getByRole('button', { name: /Effacer ma progression…/ }).click();
  await page.waitForTimeout(200);
  console.log('DIALOG:', JSON.stringify(await page.locator('dialog.dialog p').innerText()));
});
