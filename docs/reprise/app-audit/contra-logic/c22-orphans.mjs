import { chromium, devServer, newPage, sleep, text, today } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const t = today();
  const state = {
    version: 1, xp: 120, days: { [t]: { xp: 20, answered: 2, correct: 0 } },
    items: { 'old-renamed-tf': { seen: 1, correct: 0, last: 'wrong', lastSeen: t, box: 0, due: t }, 'removed-duel': { seen: 1, correct: 1, last: 'correct', lastSeen: today(-1), box: 1, due: t } },
    cards: { 'gone-module/r9': { ease: 2.5, interval: 1, reps: 1, due: t } },
    lessons: {}, badges: {}, sessions: [], settings: { theme: 'system', dailyGoal: 60 }, records: {},
  };
  const { page } = await newPage(browser, { state });
  await page.goto(srv.url + '#/');
  await page.waitForSelector('a.side-link[href="#/session?mode=review"]', { timeout: 60000 });
  console.log('[22] Home Révisions:', await text(page, 'a.side-link[href="#/session?mode=review"] strong'), '| Home Fiches:', await text(page, 'a.side-link[href="#/fiches"] strong'));
  await page.evaluate(() => (location.hash = '/entrainement'));
  await page.waitForSelector('a.side-link[href="#/session?mode=mistakes"]');
  console.log('[22] Practice Révisions espacées:', await text(page, 'a.side-link[href="#/session?mode=review"] strong'), '| Mes erreurs:', await text(page, 'a.side-link[href="#/session?mode=mistakes"] strong'), '| Fiches:', await text(page, 'a.side-link[href="#/fiches"] strong'));
  await page.evaluate(() => (location.hash = '/session?mode=review'));
  await sleep(400);
  console.log('[22] review session:', (await text(page)).slice(0, 70));
  await page.evaluate(() => (location.hash = '/fiches'));
  await sleep(400);
  console.log('[22] fiches page (due first?):', (await text(page)).slice(0, 90));
  await page.context().close();
} finally {
  await browser.close();
  await srv.close();
}
