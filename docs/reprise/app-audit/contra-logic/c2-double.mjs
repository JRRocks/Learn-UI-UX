import { chromium, devServer, newPage, sleep, store, text, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
async function answerRight(page) {
  const id = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  const ex = await exById(page, id);
  await page.click(`label.option:has-text("${ex.answer ? 'Vrai' : 'Faux'}")`);
  await page.click('.task-actions button:has-text("Valider")');
  await page.waitForSelector('.feedback');
  return id;
}
try {
  const { page, errors } = await newPage(browser);
  await page.goto(srv.url + '#/session?mode=type&id=truefalse');
  await page.waitForSelector('.task-prompt', { timeout: 60000 });
  const total = Number((await page.textContent('.player-progress-label .num')).split('/')[1]);
  const id1 = await answerRight(page);
  let s = await store(page);
  console.log('[1] answered', id1, 'xp', s.xp, 'item', JSON.stringify(s.items[id1]));
  // A) Follow "Revoir la leçon" from the correction, then Back.
  await page.click('.feedback a:has-text("Revoir la leçon")');
  await page.waitForFunction(() => location.hash.startsWith('#/apprendre/'));
  await sleep(300);
  await page.goBack();
  await page.waitForSelector('.task-prompt');
  await sleep(300);
  const again = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  console.log('[2] after Back:', again, 'same =', again === id1, '| feedback shown =', await page.isVisible('.feedback'), '| Valider =', await page.isVisible('.task-actions button:has-text("Valider")'), '| counter', await page.textContent('.player-progress-label .num'));
  await answerRight(page);
  s = await store(page);
  console.log('[3] answered again: xp', s.xp, 'item', JSON.stringify(s.items[id1]));
  // B) Reload variant on exercise 2.
  await page.click('.task-actions .btn-primary'); // Épreuve suivante
  await page.waitForSelector('.task-actions button:has-text("Valider")');
  const id2 = await answerRight(page);
  await page.reload();
  await page.waitForSelector('.task-prompt');
  await sleep(300);
  const again2 = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  console.log('[4] after reload:', again2 === id2 ? 'same exercise re-asked' : 'different', '| feedback shown =', await page.isVisible('.feedback'));
  // finish
  await answerRight(page);
  for (let i = 0; i < total + 3; i++) {
    const btn = page.locator('.task-actions .btn-primary');
    const label = await btn.textContent();
    if (/Voir le bilan/.test(label)) { await btn.click(); break; }
    if (/suivante/.test(label)) { await btn.click(); await page.waitForSelector('.task-actions button:has-text("Valider")'); await answerRight(page); }
  }
  await page.waitForSelector('.summary-score');
  console.log('[5] summary:', await text(page, '.summary-score'), '| session size', total, '| recap rows', await page.locator('.recap li').count());
  s = await store(page);
  const rec = s.sessions.at(-1);
  console.log('[6] record total', rec.total, 'correct', rec.correct, 'xp', rec.xp, '| store xp', s.xp);
  console.log('errors', errors);
} finally {
  await browser.close();
  await srv.close();
}
