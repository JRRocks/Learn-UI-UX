// Shared helpers: start Vite dev server on a free port + Playwright Chromium. Read-only.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = '/home/user/Learn-UI-UX';
const { createServer } = await import(ROOT + '/node_modules/vite/dist/node/index.js');

export async function withApp(fn) {
  const server = await createServer({ root: ROOT, configFile: ROOT + '/vite.config.ts', server: { port: 0, host: '127.0.0.1', hmr: false, watch: null }, logLevel: 'error', clearScreen: false });
  await server.listen();
  const { port } = server.httpServer.address();
  const base = `http://127.0.0.1:${port}/`;
  const browser = await chromium.launch();
  try {
    return await fn({ browser, base });
  } finally {
    await browser.close();
    await server.close();
  }
}

export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export async function newPage(browser, base, { width = 1280, height = 900, state = null, colorScheme = 'light' } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, colorScheme, locale: 'fr-FR', acceptDownloads: true });
  if (state) await ctx.addInitScript((s) => { try { if (!sessionStorage.getItem('__seeded')) { localStorage.setItem('learn-ui-ux:v1', s); sessionStorage.setItem('__seeded', '1'); } } catch {} }, JSON.stringify(state));
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.__errors = errors;
  await page.goto(base);
  return page;
}

export async function go(page, base, hash) {
  await page.goto(base + '#' + hash);
  await page.waitForTimeout(400);
}
