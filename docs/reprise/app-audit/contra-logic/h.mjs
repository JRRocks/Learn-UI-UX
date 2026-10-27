// Contradictor harness (read-only on the project): Vite dev server on a free port + Playwright Chromium.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');
export const ROOT = '/home/user/Learn-UI-UX';
export const DIR = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/contra-logic';
const vite = await import(ROOT + '/node_modules/vite/dist/node/index.js');
export const { createServer, build, preview } = vite;

export async function devServer() {
  const server = await createServer({
    root: ROOT,
    configFile: ROOT + '/vite.config.ts',
    cacheDir: DIR + '/.vite-cache',
    server: { port: 0, host: '127.0.0.1', hmr: false, watch: null },
    logLevel: 'error',
    clearScreen: false,
  });
  await server.listen();
  const { port } = server.httpServer.address();
  return { url: `http://127.0.0.1:${port}/`, close: () => server.close() };
}

export function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export async function newPage(browser, { width = 1280, height = 900, colorScheme = 'light', state = null, session = null } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme, locale: 'fr-FR', acceptDownloads: true });
  if (state || session)
    await context.addInitScript(
      ([s, ss]) => {
        try {
          if (!sessionStorage.getItem('__seeded')) {
            if (s) localStorage.setItem('learn-ui-ux:v1', s);
            if (ss) for (const [k, v] of Object.entries(ss)) sessionStorage.setItem(k, v);
            sessionStorage.setItem('__seeded', '1');
          }
        } catch {}
      },
      [state ? JSON.stringify(state) : null, session],
    );
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()));
  return { context, page, errors };
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const store = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('learn-ui-ux:v1') ?? 'null'));
export const text = async (page, sel = 'main') => ((await page.textContent(sel)) ?? '').replace(/\s+/g, ' ').trim();
export const exById = (page, id) => page.evaluate(async (id) => (await import('/src/content/index.ts')).EXERCISE_BY_ID.get(id), id);
