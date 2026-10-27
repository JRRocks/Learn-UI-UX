import { launch, open, go, seeded, focused, SHOTS } from './lib.mjs';
const b = await launch();
for (const mode of ['keyboard', 'mouse', 'key-repeat']) {
  const { page, context } = await open(b, { storage: seeded() });
  await go(page, '/progression');
  const trig = page.getByRole('button', { name: /Effacer ma progression…/ });
  const attrs = await page.evaluate(() => [...document.querySelectorAll('dialog button')].map((x) => ({ t: x.textContent.trim(), autofocusAttr: x.hasAttribute('autofocus'), autofocusProp: x.autofocus })));
  if (mode === 'mouse') await trig.click();
  else { await trig.focus(); await page.keyboard.press('Enter'); }
  await page.waitForTimeout(300);
  const f = await focused(page);
  const fv = await page.evaluate(() => document.activeElement.matches(':focus-visible'));
  if (mode === 'keyboard') await page.screenshot({ path: `${SHOTS}/f3-dialog-open.png` });
  let after;
  if (mode === 'key-repeat') {
    // simulate a held Enter: keydown repeat events on the newly focused element
    await page.keyboard.down('Enter');
    await page.waitForTimeout(50);
    await page.keyboard.up('Enter');
  } else {
    await page.keyboard.press('Enter');
  }
  await page.waitForTimeout(300);
  after = await page.evaluate(() => ({ xp: JSON.parse(localStorage.getItem('learn-ui-ux:v1')).xp, open: document.querySelector('dialog').open }));
  console.log(`${mode}: attrs=${JSON.stringify(attrs)} focusAfterOpen=${f.tag}.${f.cls}"${f.text}" focusVisible=${fv} -> after 2nd Enter xp=${after.xp} dialogOpen=${after.open}`);
  await context.close();
}
await b.close();
