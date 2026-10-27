import { chromium, server } from './lib.mjs';
const srv = await server(process.argv[2]);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const hash of ['#/apprendre/craft-floor', '#/apprendre/culture', '#/ressources/anti-patterns']) {
    await page.goto(srv.base + hash); await page.waitForSelector('#main-title'); await page.waitForTimeout(1500);
    console.log(hash, await page.evaluate(() => {
      const texts = [...document.querySelectorAll('.mock')].map((m) => m.shadowRoot?.querySelector('style')?.textContent ?? '');
      const uniq = new Set(texts);
      const kitLen = Math.min(...texts.map((t) => t.length));
      return { mocks: texts.length, distinctStyleTexts: uniq.size, withOwnCss: texts.filter((t) => t.length > kitLen + 5).length, ownCssKB: Math.round(texts.reduce((a, t) => a + t.length - kitLen, 0) / 1024) };
    }));
  }
} finally { await browser.close(); srv.stop(); }
