// Contra-design harness: live project dev server (read-only) + Playwright.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');
export const PROJECT = '/home/user/Learn-UI-UX';
export const C = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/contra-design';
export const DD = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/design';
const vite = await import(PROJECT + '/node_modules/vite/dist/node/index.js');
const react = (await import(PROJECT + '/node_modules/@vitejs/plugin-react/dist/index.js')).default;
export const KEY = 'learn-ui-ux:v1';
export const PROGRESS = readFileSync(DD + '/progress.json', 'utf8');

export async function devServer(cache = '.vite-cache-contra') {
  const server = await vite.createServer({
    configFile: false, root: PROJECT, base: './', cacheDir: C + '/' + cache, plugins: [react()],
    logLevel: 'error', clearScreen: false,
    server: { port: 0, host: '127.0.0.1', hmr: false, watch: null, fs: { allow: [PROJECT] } },
  });
  await server.listen();
  const { port } = server.httpServer.address();
  return { server, url: `http://127.0.0.1:${port}/`, close: () => server.close() };
}
let seq = 0;
export async function settle(page, ms = 500) { await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(ms); }
export async function go(page, base, hash, { wait = 'h1, .player', ms = 500 } = {}) {
  await page.goto(`${base}?v=${++seq}#${hash}`);
  await page.waitForSelector(wait, { timeout: 30000 });
  for (let i = 0; i < 40; i++) { const l = await page.locator('text=Chargement').count(); if (!l) break; await page.waitForTimeout(250); }
  await settle(page, ms);
}
export async function seed(page, base, progress = PROGRESS) {
  await page.goto(base);
  await page.evaluate(([k, v]) => { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); }, [KEY, progress]);
}
export async function withApp(fn) {
  const { url, close } = await devServer();
  const browser = await chromium.launch();
  const origNewContext = browser.newContext.bind(browser);
  browser.newContext = async (opts) => {
    const ctx = await origNewContext(opts);
    // Block everything that is not the local dev server (external links, fonts from CDNs...).
    await ctx.route((u) => !u.href.startsWith(url) && !u.href.startsWith('data:') && !u.href.startsWith('blob:'), (r) => r.abort());
    return ctx;
  };
  try { return await fn({ browser, url }); } finally { await browser.close(); await close(); }
}

// Static server over the production build in ./dist (service workers blocked in contexts).
import { createServer as httpServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
export async function withStatic(fn) {
  const root = C + '/dist';
  const server = httpServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = normalize(join(root, path.endsWith('/') ? path + 'index.html' : path));
    try { const body = await readFile(file); res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' }); res.end(body); }
    catch { res.writeHead(404); res.end('nf'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();
  const orig = browser.newContext.bind(browser);
  browser.newContext = async (opts = {}) => {
    const ctx = await orig({ serviceWorkers: 'block', locale: 'fr-FR', ...opts });
    await ctx.route((u) => !u.href.startsWith(url) && !u.href.startsWith('data:') && !u.href.startsWith('blob:'), (r) => r.abort());
    return ctx;
  };
  try { return await fn({ browser, url }); } finally { await browser.close(); server.close(); }
}
