import { withStatic, go, seed } from './h.mjs';
import { answerCurrent } from '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/design/helpers.mjs';
const FIX = `
.btn { white-space: normal; max-width: 100%; text-align: center; }
.split, .cheats { grid-template-columns: minmax(0, 1fr); }
@media (min-width: 900px) { .split, .cheats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.select { max-width: 100%; }
.cheat td { white-space: normal; }
.option:not(.option--visual) .option-text { flex: 1 1 0; min-width: 0; }
`;
const routes = ['/entrainement', '/cultures', '/cultures/comparer?a=fr&b=cn', '/ressources/aide-memoire', '/apprendre/craft-floor', '/apprendre/cognitive-load', '/apprendre/color', '/apprendre/polish', '/apprendre/intensity', '/apprendre/harden', '/apprendre/ux-writing', '/apprendre/performance', '/apprendre/accessibility'];
await withStatic(async ({ browser, url }) => {
  for (const width of [360, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true });
    await ctx.addInitScript((css) => { document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }); }, FIX);
    const page = await ctx.newPage();
    await seed(page, url);
    const bad = [];
    for (const r of routes) {
      await go(page, url, r, { ms: 250 });
      const m = await page.evaluate(() => { const de = document.documentElement; return de.scrollWidth > de.clientWidth ? de.scrollWidth : 0; });
      if (m) bad.push(`${r}:${m}`);
    }
    console.log(`with fix @${width}: ${bad.length} overflow ${bad.join(' ')}`);
    // option layout with fix
    await go(page, url, '/session?mode=type&id=choice&n=fx' + width, { wait: '.player' });
    const opt = await page.evaluate(() => [...document.querySelectorAll('.option:not(.option--visual)')].map((o) => { const k = o.querySelector('.option-key').getBoundingClientRect(); const t = o.querySelector('.option-text').getBoundingClientRect(); return `${t.top >= k.bottom - 1 ? 'ALONE' : 'ok'}:${Math.round(o.getBoundingClientRect().height)}`; }));
    await answerCurrent(page, 1);
    await page.waitForSelector('section.feedback');
    const opt2 = await page.evaluate(() => [...document.querySelectorAll('.option:not(.option--visual)')].map((o) => { const k = o.querySelector('.option-key').getBoundingClientRect(); const t = o.querySelector('.option-text').getBoundingClientRect(); const w = o.querySelector('.option-why')?.getBoundingClientRect(); return `${t.top >= k.bottom - 1 ? 'ALONE' : 'ok'}:${Math.round(o.getBoundingClientRect().height)}${w ? ':whyAlignedWithText=' + (Math.abs(w.left + 0 - t.left) < 2) : ''}`; }));
    console.log(`  options with fix @${width}: before ${opt.join(' ')} | after ${opt2.join(' ')}`);
    await ctx.close();
  }
});
