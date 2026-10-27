import { writeFileSync, readFileSync } from 'node:fs';
import { withApp, newPage, nav, today, baseState, OUT } from './h.mjs';
const t = today();
const seeded = baseState({
  xp: 10,
  days: { [t]: { xp: 10, answered: 1, correct: 1 } },
  items: { 'typo-x': { seen: 1, correct: 1, last: 'correct', lastSeen: t, box: 1, due: t } },
  badges: { 'first-step': t },
  settings: { theme: 'dark', dailyGoal: 100 },
});
const files = {
  pkg: readFileSync('/home/user/Learn-UI-UX/package.json', 'utf8'),
  array: '[1,2,3]',
  number: '42',
  nul: 'null',
  str: '"hello"',
  syntax: '{oops',
};
for (const [k, v] of Object.entries(files)) writeFileSync(`${OUT}/files/${k}.json`, v);
await withApp(async ({ browser, base }) => {
  for (const k of Object.keys(files)) {
    const page = await newPage(browser, base, { state: seeded, hash: '/progression' });
    const before = await page.locator('.page-head .lead').innerText();
    await page.locator('input[type=file]').setInputFiles(`${OUT}/files/${k}.json`);
    await page.waitForTimeout(600);
    const toast = await page.locator('.toasts').innerText().catch(() => '(no toasts)');
    const after = await page.locator('.page-head .lead').innerText();
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('learn-ui-ux:v1')));
    const dialogs = await page.locator('dialog[open]').count();
    console.log(`[${k}] before=${JSON.stringify(before)}\n   toast=${JSON.stringify(toast)}\n   after=${JSON.stringify(after)}\n   stored xp=${stored.xp} items=${Object.keys(stored.items).length} theme=${stored.settings.theme} goal=${stored.settings.dailyGoal} badges=${Object.keys(stored.badges).length} openDialogs=${dialogs}`);
    if (k === 'pkg') await page.screenshot({ path: `${OUT}/c1-after-pkg-import.png` });
    await page.__ctx.close();
  }
  // Valid backup import: does it ask before replacing?
  const page = await newPage(browser, base, { state: seeded, hash: '/progression' });
  const backup = baseState({ xp: 500, items: {} });
  writeFileSync(`${OUT}/files/backup.json`, JSON.stringify(backup));
  await page.locator('input[type=file]').setInputFiles(`${OUT}/files/backup.json`);
  await page.waitForTimeout(600);
  console.log('[valid backup] toast=', JSON.stringify(await page.locator('.toasts').innerText()), 'lead=', JSON.stringify(await page.locator('.page-head .lead').innerText()), 'dialogs=', await page.locator('dialog[open]').count());
  // Copy near the import button
  console.log('DATA FIELD:', JSON.stringify(await page.locator('.field', { hasText: 'Mes données' }).innerText()));
});
