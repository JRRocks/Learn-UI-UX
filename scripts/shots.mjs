// Visual QA: screenshots every lesson example and exercise of a module.
//   npm run shots -- <module-id | cultures | antipatterns-catalog> [--mobile] [--dark]
// Output: shots/<target>/<NN>-<id>.png (gitignored). Open the PNGs to check the mocks.
import { createRequire } from 'node:module';
import { mkdirSync, rmSync } from 'node:fs';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
if (!target) {
  console.error('Usage: npm run shots -- <module-id | cultures | antipatterns-catalog> [--mobile] [--dark]');
  process.exit(1);
}
const mobile = args.includes('--mobile');
const dark = args.includes('--dark');
const out = `shots/${target}${mobile ? '-mobile' : ''}${dark ? '-dark' : ''}`;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const server = await createServer({ server: { port: 0, host: '127.0.0.1' }, logLevel: 'error', clearScreen: false });
await server.listen();
const { port } = server.httpServer.address();
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1180, height: 900 },
    deviceScaleFactor: mobile ? 2 : 1,
    colorScheme: dark ? 'dark' : 'light',
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`http://127.0.0.1:${port}/#/apercu/${target}`);
  await page.waitForSelector('[data-preview-ready]', { timeout: 60000 });
  const state = await page.getAttribute('[data-preview-ready]', 'data-preview-ready');
  if (state !== 'ok') throw new Error(await page.textContent('[data-preview-ready]'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800); // let correction marks finish drawing
  const items = await page.$$('[data-shot]');
  let n = 0;
  for (const el of items) {
    const id = await el.getAttribute('data-shot');
    n++;
    await el.screenshot({ path: `${out}/${String(n).padStart(2, '0')}-${id}.png` });
  }
  console.log(`${n} captures dans ${out}/`);
  if (errors.length) console.log(`Erreurs dans la page :\n- ${errors.join('\n- ')}`);
} finally {
  await browser.close();
  await server.close();
}
