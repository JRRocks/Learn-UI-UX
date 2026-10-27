import { withStatic, go, seed, C } from './h.mjs';
await withStatic(async ({ browser, url }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await seed(page, url);
  for (const [name, route] of [['compare', '/cultures/comparer?a=fr&b=cn'], ['commandes', '/ressources/commandes']]) {
    await go(page, url, route, { ms: 800 });
    const info = await page.evaluate(() => [...document.querySelectorAll('.table-scroll')].map((s) => {
      const t = s.querySelector('table'); const th = [...t.querySelectorAll('thead th')].map((h) => { const r = h.getBoundingClientRect(); return `${h.textContent.trim()}@${Math.round(r.left)}-${Math.round(r.right)}`; });
      return { clientW: s.clientWidth, scrollW: s.scrollWidth, tabindex: s.getAttribute('tabindex'), role: s.getAttribute('role'), focusable: s.tabIndex, shadow: getComputedStyle(s).boxShadow, bgimg: getComputedStyle(s).backgroundImage, th };
    }));
    console.log(name, JSON.stringify(info));
    const el = page.locator('.table-scroll').last();
    await el.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${C}/shots/r4-${name}-m.png` });
    // keyboard: can Tab reach the scroller?
    const reach = await page.evaluate(async () => { const s = document.querySelector('.table-scroll'); s.focus(); return document.activeElement === s; });
    console.log(name, 'scroller focusable via focus():', reach);
  }
  await ctx.close();
});
