import { launch, open, go, missed, focused } from './lib.mjs';
const b = await launch();
// Lesson/culture/antipattern mocks with focusables
{
  const { page, context } = await open(b);
  await go(page, '/');
  const stats = await page.evaluate(async () => {
    const m = await import('/src/content/index.ts');
    const re = /<(a\s[^>]*href|button\b|input\b|select\b|textarea\b)/gi;
    let lessonMocks = 0, lessonWith = 0, kinds = new Set();
    for (const mod of m.MODULES) for (const s of mod.sections) for (const e of s.examples ?? []) for (const v of [e.bad, e.good]) {
      if (!v) continue; lessonMocks++; const mm = v.html.match(re); if (mm) { lessonWith++; mm.forEach((x) => kinds.add(x.slice(0, 8))); }
    }
    return { lessonMocks, lessonWith, kinds: [...kinds] };
  });
  console.log('lesson example mocks:', JSON.stringify(stats));
  await context.close();
}
// responsive-hotel-hotspot: before reveal, zone with link inside; after reveal, Enter on link.
for (const id of ['responsive-hotel-hotspot', 'ux-writing-signup-hotspot']) {
  const { page, context } = await open(b, { storage: missed([id, 'modes-operate-hotspot']) });
  await go(page, '/session?mode=mistakes');
  await page.waitForTimeout(300);
  // ensure the current exercise is the target; if not, skip by reading h1 id
  const cur = await page.evaluate(() => document.querySelector('.task-prompt')?.id);
  console.log(`\n${id}: current=${cur}`);
  const links = await page.evaluate(() => [...(document.querySelector('.mock')?.shadowRoot?.querySelectorAll('a[href]') ?? [])].map((a) => ({ t: a.textContent.trim(), inZone: Boolean(a.closest('[data-hotspot]')), href: a.getAttribute('href') })));
  console.log('links in mock:', JSON.stringify(links));
  // pick needed zones by clicking zones that are correct: just pick first N zones via Space then validate with button
  const needed = await page.evaluate(async (exid) => { const m = await import('/src/content/index.ts'); const e = m.EXERCISES.find((x) => x.id === exid); return e.hotspots.filter((h) => h.correct).map((h) => h.id); }, cur.replace('prompt-', ''));
  for (const h of needed) await page.evaluate((h) => document.querySelector('.mock').shadowRoot.querySelector(`[data-hotspot="${h}"]`).click(), h);
  await page.waitForTimeout(150);
  await page.click('.task-actions .btn-primary');
  await page.waitForTimeout(500);
  const hashBefore = await page.evaluate(() => location.hash);
  const h1Before = await page.evaluate(() => document.querySelector('h1')?.textContent.slice(0, 60));
  // focus first link in the mock
  const did = await page.evaluate(() => { const a = document.querySelector('.mock')?.shadowRoot?.querySelector('a[href]'); if (!a) return false; a.focus(); return document.querySelector('.mock').shadowRoot.activeElement === a; });
  const f = await focused(page);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  const hashAfter = await page.evaluate(() => location.hash);
  const h1After = await page.evaluate(() => document.querySelector('h1')?.textContent.slice(0, 60));
  console.log(`focused link=${did} (${f.path}>${f.tag} "${f.text}") Enter → hash ${hashBefore} -> ${hashAfter}; h1 "${h1Before}" -> "${h1After}"`);
  // Also: is the link focusable by Tab before reveal (inside a zone role=button)?
  await context.close();
}
await b.close();
