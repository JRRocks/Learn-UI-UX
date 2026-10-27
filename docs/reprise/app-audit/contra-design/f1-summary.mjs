import { readFileSync } from 'node:fs';
import { withStatic, go, seed, C } from './h.mjs';
const grids = JSON.parse(readFileSync('grids.json', 'utf8'));
async function playGrid(page, agreeRows) {
  const id = (await page.evaluate(() => document.querySelector('.task-prompt').id)).replace('prompt-', '');
  const g = grids.find((x) => x.id === id);
  const rows = page.locator('.grid-row');
  for (let i = 0; i < g.criteria.length; i++) {
    const e = g.criteria[i].expert;
    const v = i < agreeRows ? e : e <= 2 ? 4 : 0;
    await rows.nth(i).locator('button').nth(v - g.scale.min).click();
  }
  await page.getByRole('button', { name: 'Valider', exact: true }).click();
  await page.waitForSelector('section.feedback');
  const verdict = (await page.locator('.verdict').textContent()).replace(/\s+/g, ' ').trim();
  return { id, verdict };
}
await withStatic(async ({ browser, url }) => {
  for (const [label, plan] of [['correct+partial', [10, 6]], ['partial+partial', [7, 6]]]) {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
    const page = await ctx.newPage();
    await seed(page, url, null); // fresh learner
    await go(page, url, `/session?mode=type&id=grid&n=f1-${label}`, { wait: '.player' });
    const v = [];
    for (const n of plan) { v.push(await playGrid(page, n)); await page.locator('.task-actions .btn-primary').click(); await page.waitForTimeout(300); }
    await page.waitForSelector('.summary-score');
    const s = await page.evaluate(() => ({ score: document.querySelector('.summary-score').textContent.replace(/\s+/g, ' ').trim(), msg: document.querySelector('.page-head p.muted')?.textContent, buttons: [...document.querySelectorAll('.btn-row .btn')].map((b) => `${b.textContent.trim()}[${b.className.includes('primary') ? 'primary' : b.className.split(' ')[1]}]`), scoreFont: getComputedStyle(document.querySelector('.summary-score strong')).fontSize }));
    console.log(`\n== ${label}: verdicts ${JSON.stringify(v)}\n   summary: «${s.score}» (${s.scoreFont}) msg: «${s.msg}»\n   buttons: ${s.buttons.join(' | ')}`);
    await page.screenshot({ path: `${C}/shots/f1-${label}-summary.png` });
    const mistakes = page.getByRole('link', { name: 'Refaire mes erreurs' });
    if (await mistakes.count()) {
      await mistakes.click();
      await page.waitForTimeout(600);
      const after = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent, lead: document.querySelector('.lead')?.textContent, player: !!document.querySelector('.player') }));
      console.log(`   after «Refaire mes erreurs»: h1=«${after.h1}» lead=«${after.lead}» player=${after.player}`);
      await page.screenshot({ path: `${C}/shots/f1-${label}-mistakes.png` });
    }
    await ctx.close();
  }
});
