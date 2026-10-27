import { launch, open, go, seeded, missed } from './lib.mjs';
const b = await launch();
{
  const { page, context } = await open(b, { width: 640, height: 450, storage: seeded() });
  await go(page, '/progression');
  console.log('topbar h @640:', await page.evaluate(() => Math.round(document.querySelector('.topbar').getBoundingClientRect().height)), 'scroll-padding-top:', await page.evaluate(() => getComputedStyle(document.documentElement).scrollPaddingTop), 'bottom:', await page.evaluate(() => getComputedStyle(document.documentElement).scrollPaddingBottom), 'tabbar h:', await page.evaluate(() => Math.round(document.querySelector('.tabbar').getBoundingClientRect().height)));
  await context.close();
}
// Correction "Sources" links / "Revoir la leçon" at 1280x720 after reveal, Tab forward from the feedback
const idx = JSON.parse((await import('node:fs')).readFileSync('./ex-index.json', 'utf8'));
const withSrc = idx.filter((e) => e.type === 'choice' && e.sources >= 3).slice(0, 3);
for (const ex of withSrc) {
  const { page, context } = await open(b, { width: 1280, height: 720, storage: missed([ex.id]) });
  await go(page, '/session?mode=mistakes');
  await page.evaluate(() => document.querySelector('.options input').click());
  await page.click('.task-actions .btn-primary');
  await page.waitForTimeout(800);
  const res = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab'); await page.waitForTimeout(40);
    const p = await page.evaluate(() => { const el = document.activeElement; if (!el.closest('.feedback')) return null; const r = el.getBoundingClientRect(); let vis = 0, inV = 0; for (const fx of [0.1, 0.5, 0.9]) for (const fy of [0.2, 0.5, 0.8]) { const x = r.left + r.width * fx, y = r.top + r.height * fy; if (y < 0 || y >= innerHeight) continue; inV++; const h = document.elementFromPoint(x, y); if (h && (h === el || el.contains(h))) vis++; } return `${(el.textContent || '').trim().slice(0, 25)} ${vis}/${inV}`; });
    if (p) res.push(p);
  }
  console.log(ex.id, '→', [...new Set(res)].filter((r) => / 0\/[1-9]/.test(r)).join(' | ') || 'none hidden');
  await context.close();
}
await b.close();
