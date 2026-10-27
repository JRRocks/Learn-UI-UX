import { chromium, devServer, newPage, sleep, store, text, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
try {
  // (a) lesson "laws": link inside an example mock
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/apprendre/laws');
    await page.waitForSelector('#main-title', { timeout: 60000 });
    await sleep(500);
    const links = await page.evaluate(() => [...document.querySelectorAll('.mock')].flatMap((m) => [...(m.shadowRoot?.querySelectorAll('a[href]') ?? [])].map((a) => a.textContent)));
    console.log('[10a] links inside lesson mocks:', JSON.stringify(links));
    const link = page.locator('.mock a[href]').first();
    if (await link.count()) {
      await link.scrollIntoViewIfNeeded();
      const y = await page.evaluate(() => scrollY);
      await link.click();
      await sleep(400);
      console.log(`[10a] after click: hash="${await page.evaluate(() => location.hash)}" h1=${await text(page, 'h1')} (scrollY before ${y})`);
      await page.goBack();
      await sleep(500);
      console.log(`[10a] after Back: hash="${await page.evaluate(() => location.hash)}" scrollY=${await page.evaluate(() => scrollY)}`);
      // keyboard: is the link tabbable inside a role=img mock?
      const tabbable = await page.evaluate(() => { const a = [...document.querySelectorAll('.mock')].map((m) => m.shadowRoot?.querySelector('a[href]')).find(Boolean); return a ? a.tabIndex : null; });
      console.log('[10a] link tabIndex inside mock:', tabbable);
    }
    await page.context().close();
  }
  // (b) hotspot exercise containing links: after the correction, click a link in the corrected mock
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/');
    await page.waitForSelector('#main-title', { timeout: 60000 });
    const candidates = await page.evaluate(async () => {
      const m = await import('/src/content/index.ts');
      return m.EXERCISES.filter((e) => e.type === 'hotspot' && /<a\s/.test(e.visual.html)).map((e) => ({ id: e.id, module: e.module, needed: e.hotspots.filter((h) => h.correct).map((h) => h.id) }));
    });
    console.log('[10b] hotspot exercises with links:', candidates.map((c) => c.id).join(', '));
    const c = candidates[0];
    if (c) {
      // Make it the only exercise of a module session by trying module sessions until it comes first.
      let found = false;
      for (let k = 0; k < 30 && !found; k++) {
        await page.goto(srv.url + `#/session?mode=module&id=${c.module}&n=${k}`);
        await page.waitForSelector('.task-prompt');
        found = (await page.getAttribute('.task-prompt', 'id')) === `prompt-${c.id}`;
      }
      if (found) {
        for (const z of c.needed) await page.locator(`[data-hotspot="${z}"]`).click();
        await page.click('.task-actions button:has-text("Valider")');
        await page.waitForSelector('.feedback');
        const before = await page.evaluate(() => location.hash);
        const xp1 = (await store(page)).xp;
        await page.locator('.hotspot-stage .mock a[href]').first().click();
        await sleep(400);
        console.log(`[10b] route before click: ${before} | after clicking a link in the corrected mock: "${await page.evaluate(() => location.hash)}" h1=${await text(page, 'h1')}`);
        await page.goBack();
        await sleep(500);
        console.log(`[10b] after Back: same exercise re-asked = ${(await page.getAttribute('.task-prompt', 'id')) === 'prompt-' + c.id} | feedback = ${await page.isVisible('.feedback')} | xp ${xp1}`);
      } else console.log('[10b] could not put the exercise first');
    }
    await page.context().close();
  }
} finally {
  await browser.close();
  await srv.close();
}
