import { readFileSync, writeFileSync } from 'node:fs';
import { withStatic, go, seed, PROGRESS } from './h.mjs';
import { answerCurrent } from '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/design/helpers.mjs';
const ids = JSON.parse(readFileSync('ids.json', 'utf8'));
const hs = ids.exercises.filter((e) => e.type === 'hotspot').map((e) => e.id);
const base = JSON.parse(PROGRESS);
const results = new Map();
await withStatic(async ({ browser, url }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (let b = 0; b < hs.length; b += 10) {
    const batch = new Set(hs.slice(b, b + 10));
    const items = {};
    for (const id of hs) if (!batch.has(id)) items[id] = { seen: 1, correct: 1, last: 'correct', lastSeen: '2026-10-27', box: 5, due: '2099-12-31' };
    await seed(page, url, JSON.stringify({ ...base, items }));
    await go(page, url, `/session?mode=type&id=hotspot&n=z${b}`, { wait: '.player' });
    for (let k = 0; k < batch.size; k++) {
      if (!(await page.locator('.mock[data-interactive]').count())) break;
      const r = await page.evaluate(() => {
        const host = document.querySelector('.mock[data-interactive]');
        const zs = [...host.shadowRoot.querySelectorAll('[data-hotspot]')].map((el) => { const b = el.getBoundingClientRect(); return { id: el.dataset.hotspot, x: b.left, y: b.top, w: b.width, h: b.height, tag: el.tagName.toLowerCase(), text: el.textContent.trim().slice(0, 30) }; });
        // WCAG 2.5.8 spacing exception: 24px circle centred on each undersized target must not intersect another target or another undersized target's circle.
        const small = (z) => z.w < 24 || z.h < 24;
        const cx = (z) => z.x + z.w / 2, cy = (z) => z.y + z.h / 2;
        const circleHitsRect = (z, o) => { const px = Math.max(o.x, Math.min(cx(z), o.x + o.w)); const py = Math.max(o.y, Math.min(cy(z), o.y + o.h)); return Math.hypot(px - cx(z), py - cy(z)) < 12; };
        for (const z of zs) {
          z.small = small(z);
          z.fails258 = z.small && zs.some((o) => o !== z && (circleHitsRect(z, o) || (small(o) && Math.hypot(cx(z) - cx(o), cy(z) - cy(o)) < 24)));
          // nearest other zone edge distance
          z.gap = Math.min(...zs.filter((o) => o !== z).map((o) => Math.hypot(Math.max(0, o.x - (z.x + z.w), z.x - (o.x + o.w)), Math.max(0, o.y - (z.y + z.h), z.y - (o.y + o.h)))));
        }
        return { ex: document.querySelector('.task-prompt')?.id?.replace('prompt-', ''), zs: zs.map((z) => ({ ...z, x: Math.round(z.x), y: Math.round(z.y), w: Math.round(z.w), h: Math.round(z.h), gap: Math.round(z.gap) })) };
      });
      results.set(r.ex, r.zs);
      await answerCurrent(page, 0);
      await page.waitForSelector('section.feedback');
      await page.locator('.task-actions .btn-primary').click();
      await page.waitForTimeout(250);
    }
    process.stdout.write(`batch ${b}: ${results.size} measured\n`);
  }
  await ctx.close();
});
const all = [...results.entries()].flatMap(([ex, zs]) => zs.map((z) => ({ ex, ...z })));
const under24 = all.filter((z) => z.small);
console.log(`exercises ${results.size}/${hs.length}, zones ${all.length}, side<24: ${under24.length}, height<44: ${all.filter((z) => z.h < 44).length}, fail 2.5.8 spacing: ${all.filter((z) => z.fails258).length}`);
for (const z of under24.sort((a, b) => Math.min(a.w, a.h) - Math.min(b.w, b.h))) console.log(`  ${z.ex} ${z.id} ${z.w}x${z.h} gap=${z.gap}px fails258=${z.fails258} <${z.tag}> «${z.text}»`);
writeFileSync('t2-zones.json', JSON.stringify(Object.fromEntries(results), null, 1));
