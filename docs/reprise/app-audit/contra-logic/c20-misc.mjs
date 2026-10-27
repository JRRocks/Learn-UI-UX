import { chromium, devServer, newPage, sleep, store, text, today } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const { page, errors } = await newPage(browser);
  await page.goto(srv.url + '#/');
  await page.waitForSelector('#main-title', { timeout: 60000 });
  // ---- logic-20: SM-2 first review
  const sm = await page.evaluate(async () => {
    const { scheduleCard } = await import('/src/engine/srs.ts');
    const t = '2026-10-27';
    const out = {};
    for (const [label, prev] of [['new', undefined], ['lesson-scheduled {reps0,int0}', { ease: 2.5, interval: 0, reps: 0, due: t }], ['after lapse', scheduleCard({ ease: 2.5, interval: 10, reps: 4, due: t }, 0, t)], ['reps1 int1', { ease: 2.5, interval: 1, reps: 1, due: t }]]) {
      out[label] = { Bien: scheduleCard(prev, 2, t).interval, Facile: scheduleCard(prev, 3, t).interval };
    }
    return out;
  });
  console.log('[20] intervals (days):', JSON.stringify(sm));
  // How are cards scheduled from a lesson? (reps/interval at creation)
  // ---- logic-23: sessions cap
  const cap = await page.evaluate(async () => {
    const { addSession, emptyProgress, normalizeProgress } = await import('/src/engine/progress.ts');
    let s = emptyProgress();
    for (let i = 0; i < 75; i++) s = addSession(s, { id: String(i), at: new Date().toISOString(), kind: 'daily', label: 'x', total: 10, correct: 5, partial: 0, xp: 50, missed: [] });
    return s.sessions.length;
  });
  console.log('[23] after 75 finished sessions, sessions.length =', cap);
  // ---- logic-25: malformed % in hash
  const p2 = await page.context().newPage();
  const errs2 = [];
  p2.on('pageerror', (e) => errs2.push(e.message));
  await p2.goto(srv.url + '#/apprendre/typo%');
  await sleep(2500);
  console.log('[25] boot with "#/apprendre/typo%": #root text =', JSON.stringify(await p2.evaluate(() => document.getElementById('root').innerText.trim())), '| main exists =', await p2.evaluate(() => !!document.getElementById('main')), '| errors =', errs2.slice(0, 2));
  await p2.close();
  await page.evaluate(() => (location.hash = '/apprendre'));
  await sleep(300);
  await page.evaluate(() => (location.hash = '/apprendre/typo%E9'));
  await sleep(500);
  console.log('[25] runtime malformed hash: hash =', await page.evaluate(() => location.hash), '| h1 =', await text(page, 'h1'), '| errors =', errors.slice(-1));
  // ---- logic-24: theme toggle while OS theme changes
  const { page: p3 } = await newPage(browser, { colorScheme: 'light' });
  await p3.goto(srv.url + '#/');
  await p3.waitForSelector('#main-title');
  const label = () => p3.getAttribute('.topbar .icon-btn[aria-label^="Passer"], .rail .icon-btn[aria-label^="Passer"]', 'aria-label');
  console.log('[24] OS light -> toggle label:', await label());
  await p3.emulateMedia({ colorScheme: 'dark' });
  await sleep(300);
  const bg = await p3.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('[24] OS dark -> body bg', bg, '| toggle label:', await label());
  await p3.locator('.rail .icon-btn[aria-label^="Passer"], .topbar .icon-btn[aria-label^="Passer"]').first().click();
  await sleep(300);
  console.log('[24] after one click: data-theme =', await p3.evaluate(() => document.documentElement.dataset.theme), '| body bg', await p3.evaluate(() => getComputedStyle(document.body).backgroundColor), '| label now:', await label());
  // re-render on navigation fixes the label?
  await p3.emulateMedia({ colorScheme: 'light' });
  await p3.click('.rail .icon-btn, .topbar .icon-btn'); // set back... (no-op guard)
  await p3.context().close();
} finally {
  await browser.close();
  await srv.close();
}
