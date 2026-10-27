import { chromium, devServer, newPage, sleep, store, text, exById } from './h.mjs';
const srv = await devServer();
const browser = await chromium.launch();
const pid = async (page) => (await page.getAttribute('.task-prompt', 'id'))?.replace(/^prompt-/, '');
try {
  // ---- logic-7: Enter auto-repeat / double press
  for (const variant of ['repeat', 'double', 'single']) {
    const { page, errors } = await newPage(browser);
    await page.goto(srv.url + '#/session?mode=type&id=slider');
    await page.waitForSelector('.task-prompt', { timeout: 60000 });
    await page.locator('input[type=range]').focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.feedback');
    const first = await pid(page);
    await page.evaluate(() => { window.__keys = []; window.addEventListener('keydown', (e) => window.__keys.push(`${e.key}${e.repeat ? '(repeat)' : ''}`), true); });
    if (variant === 'repeat') { await page.keyboard.down('Enter'); await sleep(500); await page.keyboard.down('Enter'); await page.keyboard.up('Enter'); }
    if (variant === 'double') { await page.keyboard.press('Enter'); await sleep(120); await page.keyboard.press('Enter'); }
    if (variant === 'single') { await page.keyboard.press('Enter'); }
    await sleep(500);
    const second = await pid(page);
    const fb = await page.isVisible('.feedback');
    const st = (await store(page)).items[second];
    console.log(`[7:${variant}] keys=${JSON.stringify(await page.evaluate(() => window.__keys))} moved ${first} -> ${second} | 2nd already corrected=${fb} ${fb ? await text(page, '.feedback .verdict') : ''} | stored=${JSON.stringify(st)}`);
    await page.context().close();
  }
  // ---- logic-8: AZERTY digits (key "é", code Digit2) on a choice exercise, and Shift+digit control
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/session?mode=type&id=choice');
    await page.waitForSelector('.task-prompt');
    console.log('[8] hint:', await text(page, '.shortcut-hint'));
    const cdp = await page.context().newCDPSession(page);
    const send = async (key, code, text, vk, mods = 0) => {
      await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, text, unmodifiedText: text, windowsVirtualKeyCode: vk, modifiers: mods });
      await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk, modifiers: mods });
    };
    await page.evaluate(() => { window.__k = []; window.addEventListener('keydown', (e) => window.__k.push(`${e.key}/${e.code}`), true); });
    await send('é', 'Digit2', 'é', 50);
    await sleep(200);
    console.log('[8] AZERTY unshifted "2" ->', await page.evaluate(() => window.__k.at(-1)), '| checked options:', await page.locator('input[type=radio]:checked').count(), '| Valider enabled:', await page.isEnabled('.task-actions button:has-text("Valider")'));
    await send('2', 'Digit2', '2', 50, 8 /* shift */);
    await sleep(200);
    console.log('[8] AZERTY Shift+"2" ->', await page.evaluate(() => window.__k.at(-1)), '| checked options:', await page.locator('input[type=radio]:checked').count());
    await page.context().close();
  }
  // ---- logic-8 (cards) + logic-9 + logic-21
  {
    const { page } = await newPage(browser);
    await page.goto(srv.url + '#/fiches');
    await page.waitForSelector('.flashcard', { timeout: 60000 });
    // logic-9: Enter on "Arrêter la révision"
    await page.locator('button:has-text("Arrêter la révision")').focus();
    await page.keyboard.press('Enter');
    await sleep(300);
    console.log('[9] Enter on "Arrêter la révision": hash =', await page.evaluate(() => location.hash), '| answer shown =', await page.isVisible('.flashcard-a'));
    await page.keyboard.press('Enter');
    await sleep(300);
    console.log('[9] second Enter: hash =', await page.evaluate(() => location.hash));
    await page.goto(srv.url + '#/fiches?again=1');
    await page.waitForSelector('.flashcard');
    await page.locator('button:has-text("Arrêter la révision")').focus();
    await page.keyboard.press('Space');
    await sleep(300);
    console.log('[9] Space on "Arrêter la révision": hash =', await page.evaluate(() => location.hash), '| answer shown =', await page.isVisible('.flashcard-a'));
    // logic-8 cards: AZERTY "3" (key ")"? no: '"' on FR AZERTY, code Digit3)
    const cdp = await page.context().newCDPSession(page);
    const before = await text(page, '.page-head .muted');
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: '"', code: 'Digit3', text: '"', windowsVirtualKeyCode: 51 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: '"', code: 'Digit3', windowsVirtualKeyCode: 51 });
    await sleep(300);
    console.log('[8-cards] AZERTY "3": same card =', (await text(page, '.page-head .muted')) === before, '| graded cards =', Object.keys((await store(page))?.cards ?? {}).length);
    // logic-21: double-click on "Retourner la fiche"
    await page.goto(srv.url + '#/fiches?dbl=1');
    await page.waitForSelector('.flashcard');
    const b4 = await text(page, '.page-head .muted');
    const box1 = await page.locator('button:has-text("Retourner la fiche")').boundingBox();
    await page.locator('button:has-text("Retourner la fiche")').dblclick();
    await sleep(400);
    const after = await text(page, '.page-head .muted');
    const s = await store(page);
    console.log('[21] dblclick: moved to next card =', after !== b4, `(${after.slice(0, 12)})`, '| cards graded =', JSON.stringify(Object.values(s?.cards ?? {}).map((c) => `${c.reps}/${c.interval}`)));
    // where are the grade buttons relative to the flip button?
    await page.goto(srv.url + '#/fiches?pos=1');
    await page.waitForSelector('.flashcard');
    const flip = await page.locator('button:has-text("Retourner la fiche")').boundingBox();
    await page.locator('button:has-text("Retourner la fiche")').click();
    await sleep(200);
    const g0 = await page.locator('.grades button').first().boundingBox();
    console.log('[21] flip button box', JSON.stringify(flip), '| "À revoir" box', JSON.stringify(g0));
    await page.context().close();
  }
} finally {
  await browser.close();
  await srv.close();
}
