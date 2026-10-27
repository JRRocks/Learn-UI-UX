// Shared helpers for the accessibility audit (read-only on the project).
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');

export const DIR = '/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/app-audit';
export const SHOTS = `${DIR}/shots`;
mkdirSync(SHOTS, { recursive: true });
export const PORT = readFileSync(`${DIR}/port.txt`, 'utf8').trim();
export const BASE = `http://127.0.0.1:${PORT}/`;
const AXE = readFileSync('/tmp/claude-0/-home-user/b68114f8-e0bb-5f0f-a1d5-9d6e23d50819/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');

export const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

export async function launch() {
  return chromium.launch();
}

/** New context + page. `storage` (object) is written to localStorage before the app boots. */
export async function open(browser, { width = 1280, height = 900, dark = false, reduce = false, storage, session, dsf = 1 } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: dsf,
    colorScheme: dark ? 'dark' : 'light',
    reducedMotion: reduce ? 'reduce' : 'no-preference',
    locale: 'fr-FR',
  });
  if (storage || session) {
    await context.addInitScript(
      ([s, ss]) => {
        try {
          if (!sessionStorage.getItem('__seeded')) {
            if (s) localStorage.setItem('learn-ui-ux:v1', JSON.stringify(s));
            if (ss) for (const [k, v] of Object.entries(ss)) sessionStorage.setItem(k, v);
            sessionStorage.setItem('__seeded', '1');
          }
        } catch {}
      },
      [storage ?? null, session ?? null],
    );
  }
  const page = await context.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()));
  return { context, page };
}

export async function go(page, hash, { wait = 'main' } = {}) {
  await page.goto(`${BASE}#${hash}`);
  await page.waitForSelector('#main', { timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
}

/** Navigate inside the SPA without reloading (hash change). */
export async function hash(page, h) {
  await page.evaluate((x) => (window.location.hash = x), h);
  await page.waitForTimeout(500);
}

export async function axe(page, label, opts = {}) {
  const has = await page.evaluate(() => typeof window.axe !== 'undefined');
  if (!has) await page.addScriptTag({ content: AXE });
  const res = await page.evaluate(
    async ([tags, include]) => {
      const r = await window.axe.run(include ? { include } : document, {
        runOnly: { type: 'tag', values: tags },
        resultTypes: ['violations', 'incomplete'],
      });
      const map = (list) =>
        list.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          tags: v.tags.filter((t) => t.startsWith('wcag') || t === 'best-practice'),
          nodes: v.nodes.map((n) => ({
            target: n.target,
            inShadow: n.target.some((t) => Array.isArray(t)),
            html: n.html.slice(0, 220),
            summary: (n.failureSummary || '').slice(0, 400),
            data: n.any?.[0]?.data ?? n.all?.[0]?.data ?? n.none?.[0]?.data ?? null,
          })),
        }));
      return { violations: map(r.violations), incomplete: map(r.incomplete) };
    },
    [TAGS, opts.include ?? null],
  );
  return { label, ...res };
}

/** Compact one-line-per-node report; app chrome vs mock (shadow DOM) separated. */
export function fmt(r, { incomplete = false, mocks = false } = {}) {
  const out = [];
  for (const v of r.violations) {
    const app = v.nodes.filter((n) => !n.inShadow);
    const mk = v.nodes.filter((n) => n.inShadow);
    if (app.length) out.push(`  [VIOL app] ${v.id} (${v.impact}) ${v.tags.join(',')} — ${v.help} × ${app.length}`);
    for (const n of app.slice(0, 6)) out.push(`      ${JSON.stringify(n.target)} ${n.html.replace(/\s+/g, ' ').slice(0, 160)}${n.data ? ' data=' + JSON.stringify(n.data).slice(0, 160) : ''}`);
    if (mk.length && mocks) {
      out.push(`  [VIOL mock] ${v.id} (${v.impact}) × ${mk.length}`);
      for (const n of mk.slice(0, 3)) out.push(`      ${JSON.stringify(n.target)} ${n.html.replace(/\s+/g, ' ').slice(0, 140)}`);
    } else if (mk.length) out.push(`  [viol in mocks: ${v.id} × ${mk.length}]`);
  }
  if (incomplete)
    for (const v of r.incomplete) {
      const app = v.nodes.filter((n) => !n.inShadow);
      if (!app.length) continue;
      out.push(`  [incomplete] ${v.id} — ${v.help} × ${app.length}`);
      for (const n of app.slice(0, 4)) out.push(`      ${JSON.stringify(n.target)} ${n.html.replace(/\s+/g, ' ').slice(0, 140)}${n.data ? ' data=' + JSON.stringify(n.data).slice(0, 200) : ''}`);
    }
  return `${r.label}: ${r.violations.length} violation types\n${out.join('\n')}`;
}

/** Load the app's content modules through Vite (in the page) and return a summary. */
export async function content(page) {
  return page.evaluate(async () => {
    const m = await import('/src/content/index.ts');
    return {
      modules: m.MODULES.map((x) => x.id),
      exercises: m.EXERCISES.map((e) => ({ id: e.id, type: e.type, module: e.module, visual: e.type === 'choice' && e.options.some((o) => o.visual) })),
    };
  });
}

/** Description of the focused element, piercing shadow roots. */
export async function focused(page) {
  return page.evaluate(() => {
    let el = document.activeElement;
    const path = [];
    while (el && el.shadowRoot && el.shadowRoot.activeElement) {
      path.push(el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
      el = el.shadowRoot.activeElement;
    }
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const label = el.getAttribute('aria-label') || (el.labels && el.labels[0] ? el.labels[0].textContent : '') || el.textContent || '';
    // Visible focus: outline on the element, or on an .option tile that wraps a hidden input.
    const tile = el.closest('.option');
    const tcs = tile ? getComputedStyle(tile) : null;
    return {
      path: path.join(' > '),
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      cls: String(el.className || '').slice(0, 60),
      role: el.getAttribute('role') || '',
      type: el.getAttribute('type') || '',
      label: label.replace(/\s+/g, ' ').trim().slice(0, 90),
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
      tileOutline: tcs ? `${tcs.outlineStyle} ${tcs.outlineWidth}` : '',
      boxShadow: cs.boxShadow.slice(0, 80),
      focusVisible: el.matches(':focus-visible'),
      body: el === document.body,
    };
  });
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
