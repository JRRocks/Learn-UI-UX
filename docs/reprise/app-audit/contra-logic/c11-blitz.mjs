import { chromium, devServer, newPage, sleep, store, text, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
const qid = async (page) => (await page.getAttribute('.task-prompt', 'id')).replace(/^blitz-q-/, '');
async function answer(page, right = true) {
  const ex = await exById(page, await qid(page));
  await page.keyboard.press((ex.answer === right) ? 'v' : 'f');
}
try {
  // ---- logic-11: real-time cadence measurements
  for (const cadence of [800, 2500]) {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/session?mode=blitz');
    await page.waitForSelector('button:has-text("Lancer le chrono")', { timeout: 60000 });
    await page.click('button:has-text("Lancer le chrono")');
    await page.waitForSelector('.task-prompt');
    const t0 = Date.now();
    let waited = 0;
    const N = cadence === 800 ? 20 : 10;
    for (let i = 0; i < N; i++) {
      await sleep(cadence);
      waited += cadence;
      await answer(page, true);
      await sleep(50);
      await page.keyboard.press('Enter'); // next
      await page.waitForSelector('.task-prompt');
    }
    const clock = await text(page, '.player-progress-label .num');
    console.log(`[11] cadence ${cadence} ms x ${N}: time spent waiting on questions = ${(waited / 1000).toFixed(1)} s (wall ${(Date.now() - t0) / 1000} s) -> clock shows ${clock} (expected ≈ ${Math.floor((90 - waited / 1000) / 60)}:${String(Math.round(90 - waited / 1000) % 60).padStart(2, '0')})`);
    await page.context().close();
  }
  // ---- logic-16: Enter on "Quitter le défi" while the correction is shown
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/session?mode=blitz');
    await page.waitForSelector('button:has-text("Lancer le chrono")');
    await page.click('button:has-text("Lancer le chrono")');
    await page.waitForSelector('.task-prompt');
    const q1 = await qid(page);
    await answer(page, true);
    await page.waitForSelector('.feedback');
    await page.locator('button[aria-label="Quitter le défi"]').focus();
    await page.keyboard.press('Enter');
    await sleep(300);
    console.log('[16] Enter on "Quitter le défi" during correction: hash =', await page.evaluate(() => location.hash), '| question changed =', (await qid(page).catch(() => null)) !== q1);
    // Before answering, the X works?
    await page.locator('button[aria-label="Quitter le défi"]').focus();
    await page.keyboard.press('Enter');
    await sleep(300);
    console.log('[16] Enter on "Quitter le défi" while a question waits: hash =', await page.evaluate(() => location.hash));
    await page.context().close();
  }
  // ---- logic-15 + 17: finish a game with fake clock, watch for "nouveau record"
  {
    const { page, context } = await newPage(browser);
    await page.clock.install();
    await page.goto(srv.url + '#/session?mode=blitz');
    await page.waitForSelector('button:has-text("Lancer le chrono")', { timeout: 60000 });
    await page.evaluate(() => {
      window.__seen = new Set();
      new MutationObserver(() => { const el = document.querySelector('.summary-score'); if (el) window.__seen.add(el.textContent); }).observe(document.body, { subtree: true, childList: true, characterData: true });
    });
    console.log('[15] record before =', JSON.stringify((await store(page))?.records ?? {}));
    await page.click('button:has-text("Lancer le chrono")');
    await page.waitForSelector('.task-prompt');
    for (let i = 0; i < 3; i++) {
      await answer(page, true);
      await page.waitForSelector('.feedback');
      await page.keyboard.press('Enter');
      await page.waitForSelector('.task-prompt');
    }
    await page.clock.runFor(92000);
    await page.waitForSelector('.summary-score');
    await sleep(300);
    const s = await store(page);
    console.log('[15] summary texts observed:', JSON.stringify([...(await page.evaluate(() => [...window.__seen]))]));
    console.log('[15] record after =', JSON.stringify(s.records));
    const rec = s.sessions.at(-1);
    console.log(`[17] store xp=${s.xp} | today xp=${Object.values(s.days)[0]?.xp} | blitz session record: ${rec.correct}/${rec.total} xp=${rec.xp}`);
    await page.evaluate(() => (location.hash = '/progression'));
    await page.waitForSelector('#hist-title');
    console.log('[17] history row:', await text(page, 'section[aria-labelledby="hist-title"] tbody tr'));
    await context.close();
  }
} finally {
  await browser.close();
  await srv.close();
}
