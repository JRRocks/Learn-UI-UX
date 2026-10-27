// Contradictor harness (copy dimension). Read-only on the project.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');
const ROOT = '/home/user/Learn-UI-UX';
const { createServer } = await import(ROOT + '/node_modules/vite/dist/node/index.js');
export const OUT = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/contra-copy';

export async function withApp(fn) {
  const server = await createServer({
    root: ROOT,
    configFile: ROOT + '/vite.config.ts',
    server: { port: 0, host: '127.0.0.1', hmr: false, watch: null },
    logLevel: 'error',
    clearScreen: false,
  });
  await server.listen();
  const { port } = server.httpServer.address();
  const base = `http://127.0.0.1:${port}/`;
  const browser = await chromium.launch();
  try {
    return await fn({ browser, base });
  } finally {
    await browser.close().catch(() => {});
    await server.close();
  }
}

export function today(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return today(new Date(y, m - 1, d + n));
}

export async function newPage(browser, base, { width = 1280, height = 900, state = null, colorScheme = 'light', hash = '/' } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, colorScheme, locale: 'fr-FR', acceptDownloads: true });
  if (state)
    await ctx.addInitScript((s) => {
      try {
        if (!sessionStorage.getItem('__seeded')) {
          localStorage.setItem('learn-ui-ux:v1', s);
          sessionStorage.setItem('__seeded', '1');
        }
      } catch {}
    }, JSON.stringify(state));
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.__errors = errors;
  page.__ctx = ctx;
  await page.goto(base + '#' + hash);
  await page.waitForSelector('#main', { timeout: 90000 });
  await page.waitForTimeout(300);
  return page;
}

export async function nav(page, hash, wait = 500) {
  await page.evaluate((h) => (window.location.hash = h), hash);
  await page.waitForTimeout(wait);
}

export function baseState(extra = {}) {
  const t = today();
  return {
    version: 1,
    xp: 0,
    days: {},
    items: {},
    cards: {},
    lessons: {},
    badges: {},
    sessions: [],
    settings: { theme: 'system', dailyGoal: 60 },
    records: {},
    ...extra,
  };
}
export const text = (page, sel) => page.locator(sel).first().innerText();
