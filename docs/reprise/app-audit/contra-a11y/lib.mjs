import { createRequire } from 'node:module';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const require = createRequire('/opt/node-tools/node_modules/x.js');
export const { chromium } = require('playwright');
export const DIR = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit/contra-a11y';
export const SHOTS = `${DIR}/shots`;
mkdirSync(SHOTS, { recursive: true });
export const BASE = readFileSync(`${DIR}/server-url.txt`, 'utf8').trim();
export const AXE = readFileSync('/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
export const launch = () => chromium.launch();
export async function open(browser, { width = 1280, height = 900, dark = false, reduce = false, storage, dsf = 1, hasTouch = false, isMobile = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dsf, colorScheme: dark ? 'dark' : 'light', reducedMotion: reduce ? 'reduce' : 'no-preference', locale: 'fr-FR', hasTouch, isMobile });
  if (storage) {
    await context.addInitScript((s) => { try { if (!sessionStorage.getItem('__seeded')) { localStorage.setItem('learn-ui-ux:v1', JSON.stringify(s)); sessionStorage.setItem('__seeded', '1'); } } catch {} }, storage);
  }
  const page = await context.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  return { context, page };
}
export async function go(page, hash) {
  await page.goto(`${BASE}#${hash}`);
  await page.waitForSelector('#main', { timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
}
export async function focused(page) {
  return page.evaluate(() => {
    let el = document.activeElement; const path = [];
    while (el && el.shadowRoot && el.shadowRoot.activeElement) { path.push(el.tagName.toLowerCase()); el = el.shadowRoot.activeElement; }
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { path: path.join('>'), tag: el.tagName.toLowerCase(), id: el.id, cls: String(el.className?.baseVal ?? el.className ?? '').slice(0, 50), text: (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, body: el === document.body };
  });
}
export const save = (name, data) => writeFileSync(`${DIR}/${name}`, typeof data === 'string' ? data : JSON.stringify(data, null, 2));
export function seeded() {
  const today = new Date(); const key = (d) => d.toISOString().slice(0, 10); const days = {};
  for (let i = 0; i < 20; i += 2) { const d = new Date(today); d.setDate(d.getDate() - i); days[key(d)] = { xp: 20 + i * 5, answered: 5, correct: 3 }; }
  return { version: 1, xp: 640, days, items: {}, lessons: { modes: key(today) }, cards: {}, sessions: [], badges: {}, records: { blitz: 12 }, settings: { theme: 'system', dailyGoal: 60 } };
}
export function missed(ids, base = seeded()) {
  const today = new Date().toISOString().slice(0, 10); const items = {};
  for (const id of ids) items[id] = { seen: 1, correct: 0, last: 'wrong', lastSeen: today, box: 0, due: today };
  return { ...base, items };
}
export async function exIndex(page) {
  return page.evaluate(async () => {
    const m = await import('/src/content/index.ts');
    return m.EXERCISES.map((e) => ({ id: e.id, type: e.type, module: e.module, hotspots: e.type === 'hotspot' ? e.hotspots.length : 0, needed: e.type === 'hotspot' ? e.hotspots.filter((h) => h.correct).length : 0, context: Boolean(e.context), sources: e.sources?.length ?? 0 }));
  });
}
