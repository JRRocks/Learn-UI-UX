import { chromium, devServer, newPage, sleep, today } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const state = { version: 1, xp: 1840, days: {}, items: { 'typography-measure-duel': null }, cards: {}, lessons: {}, badges: {}, sessions: [], settings: { theme: 'system', dailyGoal: 60 }, records: {} };
  const { page } = await newPage(browser, { state });
  for (const h of ['/', '/progression', '/entrainement', '/session?mode=daily']) {
    await page.goto('about:blank');
    await page.goto(srv.url + '#' + h);
    await sleep(1200);
    console.log(`[4] corrupted item, ${h}: #root children=${await page.evaluate(() => document.getElementById('root').children.length)} h1=${await page.evaluate(() => document.querySelector('h1')?.textContent?.slice(0, 40) ?? null)}`);
  }
} finally {
  await browser.close();
  await srv.close();
}
