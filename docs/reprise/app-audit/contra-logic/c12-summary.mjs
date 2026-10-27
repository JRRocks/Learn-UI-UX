import { chromium, devServer, newPage, sleep, store, text, exById, today } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  // ---- logic-12 + 19: real truefalse session, 1 wrong out of 10
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/session?mode=type&id=truefalse');
    await page.waitForSelector('.task-prompt', { timeout: 60000 });
    const total = Number((await text(page, '.player-progress-label .num')).split('/')[1]);
    let wrongId = null;
    for (let i = 0; i < total; i++) {
      const id = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
      const ex = await exById(page, id);
      const right = i !== 0;
      if (!right) wrongId = id;
      await page.keyboard.press(ex.answer === right ? 'v' : 'f');
      await page.keyboard.press('Enter');
      await page.waitForSelector('.feedback');
      await page.keyboard.press('Enter');
      await sleep(80);
    }
    await page.waitForSelector('.summary-score');
    console.log('[19] summary:', await text(page, '.summary-score'), '|', await text(page, '.page-head .muted'));
    console.log('[19] missed item schedule:', wrongId, JSON.stringify((await store(page)).items[wrongId]), 'today =', today());
    // logic-12: open "Revoir la leçon" from the recap, then Back
    await page.locator('.recap details').first().locator('summary').click();
    await page.locator('.recap a:has-text("Revoir la leçon")').first().click();
    await page.waitForFunction(() => location.hash.startsWith('#/apprendre/'));
    await sleep(300);
    await page.goBack();
    await sleep(600);
    const summaryStill = await page.isVisible('.summary-score');
    console.log('[12] after Back: summary still there =', summaryStill, '| new run =', await page.isVisible('.task-prompt'), summaryStill ? '' : await text(page, '.player-progress-label .num'));
    await page.evaluate(() => (location.hash = '/'));
    await page.waitForSelector('a.side-link[href="#/session?mode=review"]');
    console.log('[19] Home Révisions:', await text(page, 'a.side-link[href="#/session?mode=review"]'));
    await page.context().close();
  }
  // ---- logic-12 (exam): finished exam restored from storage, then Back
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/');
    await page.waitForSelector('#main-title', { timeout: 60000 });
    const ids = await page.evaluate(async () => (await import('/src/content/index.ts')).EXERCISES.slice(0, 30).map((e) => e.id));
    const saved = { ids, index: 30, played: ids.map((id, i) => ({ id, verdict: i % 3 ? 'correct' : 'wrong', score: i % 3 ? 1 : 0, xp: i % 3 ? 10 : 1 })) };
    await page.evaluate((s) => sessionStorage.setItem('learn-ui-ux:session:/session?mode=exam', JSON.stringify(s)), saved);
    await page.evaluate(() => (location.hash = '/session?mode=exam'));
    await page.waitForSelector('.summary-score');
    console.log('[12-exam] summary:', await text(page, '.summary-score'), '| corrections listed:', await page.locator('.recap li').count(), '| open details:', await page.locator('.recap details[open]').count());
    await page.locator('.recap details[open] a:has-text("Revoir la leçon")').first().click();
    await sleep(300);
    await page.goBack();
    await sleep(600);
    console.log('[12-exam] after Back: summary =', await page.isVisible('.summary-score'), '| new exam =', await page.isVisible('.task-prompt') ? await text(page, '.player-progress-label .num') : '-');
    await page.context().close();
  }
  // ---- logic-18: session with only correct + partial, no wrong items stored
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/');
    await page.waitForSelector('#main-title', { timeout: 60000 });
    const ids = await page.evaluate(async () => (await import('/src/content/index.ts')).EXERCISES.filter((e) => e.type === 'grid').slice(0, 2).map((e) => e.id));
    const saved = { ids, index: 2, played: [{ id: ids[0], verdict: 'correct', score: 1, xp: 20 }, { id: ids[1], verdict: 'partial', score: 0.6, xp: 8 }] };
    await page.evaluate((s) => sessionStorage.setItem('learn-ui-ux:session:/session?mode=type&id=grid', JSON.stringify(s)), saved);
    await page.evaluate(() => (location.hash = '/session?mode=type&id=grid'));
    await page.waitForSelector('.summary-score');
    console.log('[18] summary:', await text(page, '.summary-score'), '| buttons:', (await page.locator('.btn-row a').allTextContents()).join(' / '));
    await page.click('a:has-text("Refaire mes erreurs")');
    await sleep(400);
    console.log('[18] "Refaire mes erreurs" ->', (await text(page)).slice(0, 90));
    await page.context().close();
  }
} finally {
  await browser.close();
  await srv.close();
}
