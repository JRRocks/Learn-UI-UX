import { launch, open, go, missed, focused, AXE } from './lib.mjs';
const b = await launch();
// 1) Count focusables inside mocks across all exercises via preview pages? Use content directly.
{
  const { page, context } = await open(b);
  await go(page, '/');
  const stats = await page.evaluate(async () => {
    const m = await import('/src/content/index.ts');
    const re = /<(a\s[^>]*href|button\b|input\b|select\b|textarea\b|[^>]*\stabindex=)/i;
    const out = [];
    for (const e of m.EXERCISES) {
      const visuals = [];
      if (e.visual) visuals.push(['visual', e.visual]);
      if (e.options) e.options.forEach((o, i) => o.visual && visuals.push([`opt${i}`, o.visual]));
      for (const [where, v] of visuals) {
        const mm = v.html.match(new RegExp(re.source, 'gi'));
        if (mm) out.push({ id: e.id, type: e.type, where, n: mm.length, kinds: [...new Set(mm.map((x) => x.slice(0, 12)))] });
      }
    }
    return out;
  });
  const ex = new Set(stats.map((s) => s.id));
  console.log('exercises whose mocks contain focusable markup:', ex.size, 'mocks:', stats.length);
  console.log(stats.slice(0, 12).map((s) => `${s.id}[${s.where}] ${s.n} ${s.kinds.join('|')}`).join('\n'));
  await context.close();
}
// 2) craft-floor-browser-duel: Tab path and Space effect
{
  const { page, context } = await open(b, { storage: missed(['craft-floor-browser-duel']) });
  await go(page, '/session?mode=mistakes');
  await page.waitForTimeout(400);
  const exists = await page.evaluate(() => document.querySelectorAll('.mock').length);
  console.log('\ncraft-floor-browser-duel mocks:', exists);
  const seq = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab');
    const f = await focused(page);
    seq.push(`${f.path ? f.path + '>' : ''}${f.tag}${f.cls ? '.' + f.cls.split(' ')[0] : ''}${f.text ? '"' + f.text.slice(0, 25) + '"' : ''}`);
  }
  console.log('Tab sequence:', seq.join(' | '));
  // focus first checkbox inside a mock and press space
  const before = await page.evaluate(() => [...document.querySelectorAll('.mock')].map((h) => [...(h.shadowRoot?.querySelectorAll('input[type=checkbox]') ?? [])].map((c) => c.checked)));
  const ok = await page.evaluate(() => { const c = document.querySelector('.mock')?.shadowRoot?.querySelector('input[type=checkbox]'); if (c) { c.focus(); return true; } return false; });
  if (ok) {
    await page.keyboard.press(' ');
    await page.waitForTimeout(200);
    const after = await page.evaluate(() => [...document.querySelectorAll('.mock')].map((h) => [...(h.shadowRoot?.querySelectorAll('input[type=checkbox]') ?? [])].map((c) => c.checked)));
    const chosen = await page.evaluate(() => [...document.querySelectorAll('.options input')].map((i) => i.checked));
    console.log('space on mock checkbox: before', JSON.stringify(before), 'after', JSON.stringify(after), 'options checked', JSON.stringify(chosen));
  }
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['nested-interactive', 'aria-hidden-focus', 'presentation-role-conflict'] })).violations.map((v) => `${v.id} x${v.nodes.length}`));
  console.log('axe:', r.join(', '));
  await context.close();
}
await b.close();
