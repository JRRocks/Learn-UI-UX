// Mock count, shadow <style> bytes and node counts per page (built app, no throttling).
import { chromium, server } from './lib.mjs';
const srv = await server(process.argv[2]);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const rows = [];
  for (const hash of ['#/apprendre/craft-floor', '#/apprendre/culture', '#/apprendre/typography', '#/ressources/anti-patterns', '#/apprendre/antipatterns', '#/apprendre/color']) {
    await page.goto(srv.base + hash);
    await page.waitForSelector('#main-title');
    await page.waitForTimeout(hash.includes('ressources') ? 1500 : 500);
    rows.push(await page.evaluate((hash) => {
      const mocks = [...document.querySelectorAll('.mock')];
      const styles = mocks.flatMap((m) => [...(m.shadowRoot?.querySelectorAll('style') ?? [])]);
      const styleBytes = styles.reduce((a, st) => a + st.textContent.length, 0);
      const shadowNodes = mocks.reduce((s, m) => s + (m.shadowRoot?.querySelectorAll('*').length ?? 0), 0);
      const inView = mocks.filter((m) => { const r = m.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }).length;
      return { hash, mocks: mocks.length, inFirstViewport: inView, styleTags: styles.length, styleKB: Math.round(styleBytes / 1024), shadowNodes, lightNodes: document.querySelectorAll('*').length, pageHeight: document.documentElement.scrollHeight };
    }, hash));
  }
  console.table(rows);
} finally { await browser.close(); srv.stop(); }
