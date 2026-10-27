import { writeFileSync } from 'node:fs';
import { chromium, devServer, newPage, sleep, store, text, today, DIR } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
const seeded = {
  version: 1, xp: 1840,
  days: { [today(-1)]: { xp: 120, answered: 10, correct: 8 }, [today()]: { xp: 40, answered: 4, correct: 4 } },
  items: { 'typography-measure-duel': { seen: 2, correct: 2, last: 'correct', lastSeen: today(-1), box: 2, due: today(2) } },
  cards: {}, lessons: { typography: today(-3) }, badges: { 'first-step': today(-3) }, sessions: [], settings: { theme: 'system', dailyGoal: 60 }, records: { blitz: 14 },
};
async function tryImport(file, label) {
  const { page, errors, context } = await newPage(browser, { state: seeded });
  await page.goto(srv.url + '#/progression');
  await page.waitForSelector('#main-title', { timeout: 60000 });
  const before = await text(page, '.page-head .lead');
  await page.setInputFiles('input[type=file]', file);
  await sleep(600);
  const toast = await text(page, '.toasts');
  const after = await text(page, '.page-head .lead');
  const s = await store(page);
  console.log(`[${label}] before: ${before}\n    toast: ${toast}\n    after: ${after}\n    stored xp=${s.xp} records=${JSON.stringify(s.records)} lessons=${JSON.stringify(s.lessons)} items=${Object.keys(s.items).length}`);
  // Go home & reload to see whether the app still renders.
  await page.evaluate(() => (location.hash = '/'));
  await sleep(600);
  console.log(`    home after import: #root children=${await page.evaluate(() => document.getElementById('root').children.length)} h1=${await page.evaluate(() => document.querySelector('h1')?.textContent ?? null)}`);
  await page.reload();
  await sleep(1200);
  console.log(`    after reload: #root children=${await page.evaluate(() => document.getElementById('root').children.length)} h1=${await page.evaluate(() => document.querySelector('h1')?.textContent ?? null)}`);
  console.log('    errors:', errors.slice(0, 3).map((e) => e.slice(0, 140)));
  await context.close();
}
try {
  await tryImport(DIR + '/files/package.json', 'package.json');
  await tryImport(DIR + '/files/array.json', '[]');
  await tryImport(DIR + '/files/null.json', 'null');
  // logic-4: a valid backup with one corrupted entry
  const corrupt = { ...seeded, items: { ...seeded.items, 'typography-measure-duel': null } };
  writeFileSync(DIR + '/files/corrupt-item.json', JSON.stringify(corrupt));
  await tryImport(DIR + '/files/corrupt-item.json', 'items:{x:null}');
  const corruptCard = { ...seeded, cards: { 'typography/r0': null } };
  writeFileSync(DIR + '/files/corrupt-card.json', JSON.stringify(corruptCard));
  await tryImport(DIR + '/files/corrupt-card.json', 'cards:{k:null}');
  // Control: a genuine export round-trip
  writeFileSync(DIR + '/files/genuine.json', JSON.stringify(seeded, null, 2));
  await tryImport(DIR + '/files/genuine.json', 'genuine export');
} finally {
  await browser.close();
  await srv.close();
}
