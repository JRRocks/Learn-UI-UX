import { launch, open, go, seeded } from './lib.mjs';
const b = await launch();
const { page, context } = await open(b, { storage: seeded() });
await go(page, '/');
console.log(await page.locator('.streak-strip').ariaSnapshot());
console.log(await page.evaluate(() => [...document.querySelectorAll('.streak-strip i')].slice(0, 3).map((i) => i.outerHTML).join(' ')));
console.log('nearby text:', await page.evaluate(() => document.querySelector('.streak-strip').previousElementSibling.textContent.replace(/\s+/g, ' ')));
// Is the same per-day data shown anywhere else as text (progression page)?
await go(page, '/progression');
console.log('progression mentions days?', await page.evaluate(() => /14 derniers jours|derniers jours/.test(document.querySelector('main').textContent)), await page.evaluate(() => [...document.querySelectorAll('main h2')].map((h) => h.textContent).join(' | ')));
await context.close();
await b.close();
