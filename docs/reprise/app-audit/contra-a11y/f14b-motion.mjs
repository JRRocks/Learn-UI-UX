import { launch, open, go } from './lib.mjs';
const b = await launch();
for (const reduce of [true, false]) {
  const { page, context } = await open(b, { reduce });
  for (const p of ['/ressources/anti-patterns', '/apprendre/polish']) {
    await go(page, p);
    await page.waitForFunction(() => document.querySelectorAll('.mock').length > 3, null, { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const anims = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.mock').forEach((h, i) => {
        if (!h.shadowRoot) return;
        for (const a of h.shadowRoot.getAnimations()) {
          const t = a.effect?.getTiming?.() ?? {};
          const css = h.shadowRoot.querySelector('style')?.textContent ?? '';
          out.push(`${a.animationName} ${t.duration}ms x${t.iterations} (mock#${i}, has reduce guard in css: ${/prefers-reduced-motion/.test(css.slice(css.indexOf('.mk-framed')))})`);
        }
      });
      return { n: document.querySelectorAll('.mock').length, out };
    });
    console.log(`reduce=${reduce} ${p}: mocks=${anims.n} ${JSON.stringify([...new Set(anims.out)], null, 0)}`);
  }
  await context.close();
}
await b.close();
