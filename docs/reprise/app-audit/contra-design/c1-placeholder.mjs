import { withStatic, go, seed, C } from './h.mjs';
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
await withStatic(async ({ browser, url }) => {
  for (const scheme of ['light', 'dark']) {
    for (const forced of [null, 'dark']) {
      if (scheme === 'dark' && forced) continue;
      const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const p = JSON.parse((await import('./h.mjs')).PROGRESS);
      if (forced) p.settings.theme = forced;
      await seed(page, url, JSON.stringify(p));
      await go(page, url, '/ressources/anti-patterns', { ms: 1200 });
      const info = await page.evaluate(() => {
        const i = document.querySelector('#ap-q');
        const toRgb = (c) => { const cv = document.createElement('canvas').getContext('2d'); cv.fillStyle = c; return cv.fillStyle; };
        return { ph: getComputedStyle(i, '::placeholder').color, phOpacity: getComputedStyle(i, '::placeholder').opacity, bg: getComputedStyle(i).backgroundColor, bgHex: toRgb(getComputedStyle(i).backgroundColor), cs: getComputedStyle(i).colorScheme, theme: document.documentElement.dataset.theme ?? 'system' };
      });
      // sample real pixels of the placeholder text
      const box = await page.locator('#ap-q').boundingBox();
      const buf = await page.screenshot({ clip: { x: box.x + 10, y: box.y + 8, width: 200, height: box.height - 16 } });
      const { PNG } = await import('/home/user/Learn-UI-UX/node_modules/pngjs/lib/png.js').catch(() => ({}));
      console.log(`${scheme}${forced ? ' (app theme forced ' + forced + ')' : ''}: placeholder=${info.ph} opacity=${info.phOpacity} bg=${info.bg} (${info.bgHex}) color-scheme=${info.cs} theme=${info.theme}`);
      await page.locator('#ap-q').screenshot({ path: `${C}/shots/c1-${scheme}${forced ? '-forced' : ''}.png` });
      await ctx.close();
    }
  }
});
