import { chromium, devServer, newPage, sleep, store, text, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const { page, errors } = await newPage(browser);
  await page.goto(srv.url + '#/');
  await page.waitForSelector('#main-title', { timeout: 60000 });
  // Fresh learner clicks "Révisions" (count 0) on Home, then "Mes erreurs" on Practice.
  await page.click('a.side-link[href="#/session?mode=review"]');
  await page.waitForSelector('#main-title');
  console.log('[1] review (empty):', (await text(page)).slice(0, 80));
  await page.evaluate(() => (location.hash = '/entrainement'));
  await page.waitForSelector('a.side-link[href="#/session?mode=mistakes"]');
  await page.click('a.side-link[href="#/session?mode=mistakes"]');
  await sleep(300);
  console.log('[1] mistakes (empty):', (await text(page)).slice(0, 80));
  console.log('[1] sessionStorage keys:', await page.evaluate(() => Object.keys(sessionStorage).map((k) => k + ' = ' + sessionStorage.getItem(k))));
  // Answer a true/false WRONG.
  await page.evaluate(() => (location.hash = '/session?mode=type&id=truefalse'));
  await page.waitForSelector('.task-prompt');
  const id = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  const ex = await exById(page, id);
  await page.click(`label.option:has-text("${ex.answer ? 'Faux' : 'Vrai'}")`);
  await page.click('.task-actions button:has-text("Valider")');
  await page.waitForSelector('.feedback');
  console.log('[2] verdict:', await page.getAttribute('.feedback', 'data-verdict'), id);
  // Home
  await page.evaluate(() => (location.hash = '/'));
  await page.waitForSelector('a.side-link[href="#/session?mode=review"]');
  console.log('[3] home Révisions =', await page.textContent('a.side-link[href="#/session?mode=review"] strong'));
  await page.click('a.side-link[href="#/session?mode=review"]');
  await sleep(400);
  console.log('[4] review now:', (await text(page)).slice(0, 90));
  await page.evaluate(() => (location.hash = '/entrainement'));
  await page.waitForSelector('a.side-link[href="#/session?mode=mistakes"]');
  console.log('[5] practice Mes erreurs count =', await page.textContent('a.side-link[href="#/session?mode=mistakes"] strong'));
  await page.click('a.side-link[href="#/session?mode=mistakes"]');
  await sleep(400);
  console.log('[5] mistakes now:', (await text(page)).slice(0, 90));
  await page.reload();
  await page.waitForSelector('#main-title, .task-prompt');
  await sleep(400);
  console.log('[6] after reload:', (await text(page)).slice(0, 90));
  // Control: a new tab (fresh sessionStorage) shows the exercise.
  const p2 = await page.context().newPage();
  await p2.goto(srv.url + '#/session?mode=mistakes');
  await p2.waitForSelector('#main-title, .task-prompt');
  await sleep(400);
  console.log('[7] new tab mistakes:', (await text(p2)).slice(0, 90));
  console.log('errors:', errors);
} finally {
  await browser.close();
  await srv.close();
}
