import { launch, open, go, missed } from './lib.mjs';
import { COLOR_JS } from './colorlib.mjs';
const b = await launch();
for (const dark of [false, true]) {
  const { page, context } = await open(b, { dark, storage: missed(['modes-tool-landing-choice']) });
  await go(page, '/session?mode=mistakes');
  await page.waitForTimeout(300);
  const ans = await page.evaluate(async () => { const m = await import('/src/content/index.ts'); return m.EXERCISES.find((x) => x.id === 'modes-tool-landing-choice').answer; });
  await page.evaluate((id) => [...document.querySelectorAll('.options input')].find((x) => x.value === id).click(), ans);
  await page.click('.task-actions .btn-primary');
  await page.waitForTimeout(700);
  await page.addScriptTag({ content: COLOR_JS });
  const res = await page.evaluate(() => {
    const opts = [...document.querySelectorAll('.option[data-state="dim"]')];
    return opts.map((opt) => {
      const op = Number(getComputedStyle(opt).opacity);
      const pageBg = __bgOf(opt.parentElement);
      const optBg = __bgOf(opt);
      const r = { opacity: op };
      for (const sel of ['.option-why', '.option-text']) {
        const el = opt.querySelector(sel); if (!el) continue;
        const fg = __rgb(getComputedStyle(el).color);
        const textOnOpt = __blend(fg, __bgOf(el));
        const eff = __blend(textOnOpt, pageBg, op);
        const effBg = __blend(optBg, pageBg, op);
        r[sel] = `${getComputedStyle(el).fontSize} ${getComputedStyle(el).fontWeight} full=${__ratio(textOnOpt, __bgOf(el)).toFixed(2)} dimmed=${__ratio(eff, effBg).toFixed(2)}`;
      }
      return r;
    });
  });
  console.log(`dark=${dark}`, JSON.stringify(res));
  await context.close();
}
await b.close();
