import { chromium, devServer, newPage, sleep } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  const { page } = await newPage(browser);
  await page.goto(srv.url + '#/a-propos');
  await page.waitForSelector('#main-title', { timeout: 60000 });
  const r = await page.evaluate(async () => {
    const P = await import('/src/engine/progress.ts');
    const B = await import('/src/engine/badges.ts');
    const C = await import('/src/content/index.ts');
    const out = {};
    const s1 = P.normalizeProgress({ version: 1, sessions: [null] });
    try { B.newBadges(s1, { exercises: C.EXERCISES, moduleIds: C.MODULES.map((m) => m.id) }); out.sessionsNull = 'no throw'; } catch (e) { out.sessionsNull = 'throws: ' + e.message; }
    const t = new Date(); const key = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    const s2 = P.normalizeProgress({ version: 1, days: { [key]: 5 } });
    const after = P.recordAttempt(s2, C.EXERCISES[0], { verdict: 'correct', score: 1 }).state;
    out.daysNumber = JSON.stringify(after.days[key]);
    const s3 = P.normalizeProgress({ version: 1, settings: { theme: 'neon', dailyGoal: 'x' } });
    out.settings = JSON.stringify(s3.settings);
    return out;
  });
  console.log(r);
} finally {
  await browser.close();
  await srv.close();
}
