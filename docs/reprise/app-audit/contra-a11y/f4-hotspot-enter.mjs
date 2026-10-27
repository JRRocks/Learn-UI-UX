import { launch, open, go, missed, focused } from './lib.mjs';
const b = await launch();
async function run(label, steps) {
  const { page, context } = await open(b, { storage: missed(['modes-operate-hotspot']) });
  await go(page, '/session?mode=mistakes');
  await page.waitForSelector('.mock[data-interactive]');
  await page.waitForTimeout(300);
  const state = async () => page.evaluate(() => ({
    count: document.querySelector('.hotspot-count')?.textContent.replace(/\s+/g, ' ').trim() ?? null,
    feedback: document.querySelectorAll('.feedback').length,
    pressed: [...(document.querySelector('.mock')?.shadowRoot?.querySelectorAll('[data-hotspot]') ?? [])].map((z) => z.getAttribute('aria-pressed') === 'true' ? 1 : 0).join(''),
    hint: document.querySelector('.task-hint')?.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) ?? null,
    stored: (() => { try { const s = JSON.parse(localStorage.getItem('learn-ui-ux:v1')); return s.items['modes-operate-hotspot']; } catch { return null; } })(),
  }));
  const log = [`== ${label}`];
  // Focus first zone via Tab from the h1 (focused at start)
  for (const s of steps) {
    if (s.startsWith('tab')) { const n = Number(s.slice(3)) || 1; for (let i = 0; i < n; i++) await page.keyboard.press('Tab'); }
    else if (s.startsWith('shift')) { await page.keyboard.press('Shift+Tab'); }
    else await page.keyboard.press(s);
    await page.waitForTimeout(250);
    const f = await focused(page);
    const st = await state();
    log.push(`  ${s.padEnd(8)} focus=${f.path ? f.path + '>' : ''}${f.tag}${f.text ? '"' + f.text.slice(0, 30) + '"' : ''} count=${st.count} pressed=${st.pressed} feedback=${st.feedback} item=${JSON.stringify(st.stored)?.slice(0, 80)}`);
  }
  await context.close();
  return log.join('\n');
}
// From the H1: Tab → quit button? Let us look where Tab goes first.
console.log(await run('Enter x2 picks two zones, then Enter on the 2nd (already picked) zone', ['tab1', 'tab1', 'tab1', 'tab1', 'Enter', 'tab1', 'Enter', 'Enter']));
console.log(await run('Same with Space for deselect', ['tab1', 'tab1', 'tab1', 'tab1', 'Enter', 'tab1', 'Enter', ' ']));
console.log(await run('Full, then Enter on an unpicked zone', ['tab1', 'tab1', 'tab1', 'tab1', 'Enter', 'tab1', 'Enter', 'tab1', 'Enter']));
await b.close();
