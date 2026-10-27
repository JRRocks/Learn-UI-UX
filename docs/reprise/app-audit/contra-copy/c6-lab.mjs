import { withApp, newPage, nav, OUT } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/cultures/labo' });
  const locales = await page.locator('#lab-locale option').evaluateAll((os) => os.map((o) => o.value));
  for (const loc of locales) {
    await page.selectOption('#lab-locale', loc);
    await page.waitForTimeout(250);
    const mock = await page.evaluate(() => {
      const host = [...document.querySelectorAll('.lab .stage *')].find((e) => e.shadowRoot);
      const root = host?.shadowRoot;
      const t = root ? root.textContent.replace(/\s+/g, ' ').trim() : '';
      const alt = host?.getAttribute('aria-label') || root?.querySelector('[role=img]')?.getAttribute('aria-label') || host?.closest('[aria-label]')?.getAttribute('aria-label') || '';
      return { t, alt };
    });
    const colonBits = (mock.t.match(/[^ ]{1,20} : [^ ]{1,20}/g) || []).slice(0, 3);
    const ratio = await page.locator('.lab .section .small.muted').first().innerText();
    console.log(`${loc}: colons=${JSON.stringify(colonBits)} | ratio=${JSON.stringify(ratio)} | alt=${JSON.stringify(mock.alt)}`);
  }
  await page.selectOption('#lab-locale', 'en-US');
  await page.waitForTimeout(300);
  await page.locator('.lab .stage').screenshot({ path: `${OUT}/c6-lab-en-US.png` });
});
