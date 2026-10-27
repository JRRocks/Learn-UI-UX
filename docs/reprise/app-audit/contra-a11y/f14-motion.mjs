import { launch, open, go } from './lib.mjs';
const b = await launch();
const pages = ['/apprendre/polish', '/apprendre/motion', '/apprendre/animate', '/ressources/anti-patterns'];
for (const reduce of [true, false]) {
  const { page, context } = await open(b, { reduce });
  for (const p of pages) {
    await go(page, p);
    await page.waitForTimeout(1200);
    const anims = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.mock').forEach((h) => {
        if (!h.shadowRoot) return;
        for (const a of h.shadowRoot.getAnimations()) {
          const t = a.effect?.getTiming?.() ?? {};
          out.push(`${a.animationName ?? a.constructor.name} ${t.duration}ms x${t.iterations} delay=${t.delay}`);
        }
      });
      const app = document.getAnimations().filter((a) => !(a.effect?.target?.getRootNode?.() instanceof ShadowRoot)).map((a) => a.animationName ?? a.transitionProperty);
      return { out, app };
    });
    console.log(`reduce=${reduce} ${p}: mock animations=${anims.out.length} ${JSON.stringify([...new Set(anims.out)])} | app=${JSON.stringify(anims.app)}`);
  }
  await context.close();
}
await b.close();
