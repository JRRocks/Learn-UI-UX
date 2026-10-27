import { chromium, devServer, newPage, sleep, store, text, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
async function setup(page) {
  await page.goto(srv.url + '#/session?mode=type&id=hotspot');
  await page.waitForSelector('.task-prompt', { timeout: 60000 });
  let id = (await page.getAttribute('.task-prompt', 'id')).replace(/^prompt-/, '');
  let ex = await exById(page, id);
  return { id, ex, correct: ex.hotspots.filter((h) => h.correct).map((h) => h.id), wrong: ex.hotspots.filter((h) => !h.correct).map((h) => h.id) };
}
const zone = (page, z) => page.locator(`[data-hotspot="${z}"]`);
try {
  // Scenario A: select all needed zones with Enter, then Enter again on a selected zone to unselect it.
  {
    const { page, errors } = await newPage(browser);
    const { id, correct } = await setup(page);
    console.log('[A] exercise', id, 'needs', correct.length);
    for (const z of correct) {
      await zone(page, z).focus();
      await page.keyboard.press('Enter');
      await sleep(120);
      console.log(`   Enter on ${z}: count=${await text(page, '.hotspot-count').catch(() => '-')} feedback=${await page.isVisible('.feedback')}`);
    }
    await zone(page, correct.at(-1)).focus();
    await page.keyboard.press('Enter');
    await sleep(400);
    console.log('[A] Enter on an already-selected zone -> feedback shown =', await page.isVisible('.feedback'));
    if (await page.isVisible('.feedback')) {
      console.log('   verdict:', await text(page, '.feedback .verdict'));
      console.log('   zones:', (await page.locator('.zones li').allTextContents()).map((t) => t.replace(/\s+/g, ' ').slice(0, 50)));
      console.log('   stored:', JSON.stringify((await store(page)).items[id]));
    }
    console.log('   errors', errors);
    await page.context().close();
  }
  // Scenario B: Space instead of Enter for unselect (control).
  {
    const { page } = await newPage(browser);
    const { correct } = await setup(page);
    for (const z of correct) { await zone(page, z).focus(); await page.keyboard.press('Space'); await sleep(120); }
    await zone(page, correct.at(-1)).focus();
    await page.keyboard.press('Space');
    await sleep(400);
    console.log('[B] Space on selected zone -> feedback shown =', await page.isVisible('.feedback'), '| count', await text(page, '.hotspot-count').catch(() => '-'));
    await page.context().close();
  }
  // Scenario C: quota reached, Enter on another (unselected) zone.
  {
    const { page } = await newPage(browser);
    const { correct, wrong } = await setup(page);
    for (const z of correct) { await zone(page, z).focus(); await page.keyboard.press('Space'); await sleep(120); }
    if (wrong.length) {
      await zone(page, wrong[0]).focus();
      await page.keyboard.press('Enter');
      await sleep(400);
      console.log('[C] quota reached, Enter on another zone -> feedback shown =', await page.isVisible('.feedback'));
    }
    await page.context().close();
  }
  // Scenario D: mouse click on selected zone (control).
  {
    const { page } = await newPage(browser);
    const { correct } = await setup(page);
    for (const z of correct) { await zone(page, z).click(); await sleep(120); }
    await zone(page, correct.at(-1)).click();
    await sleep(300);
    console.log('[D] click on selected zone -> feedback shown =', await page.isVisible('.feedback'), '| count', await text(page, '.hotspot-count').catch(() => '-'));
    await page.context().close();
  }
} finally {
  await browser.close();
  await srv.close();
}
