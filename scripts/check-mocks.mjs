// Visual QA without screenshots: finds text and controls cut off, or drawn over each other, inside the mocks.
//   npm run check:mocks                      → every module, cultures and the catalog
//   npm run check:mocks -- color layout      → only these targets
// Checks desktop (1180 px) and mobile (390 px) widths. A mock that clips its own
// content (`overflow: hidden`) hides it from the learner: the defect it teaches, or
// the fix it recommends, may simply not be visible. Deliberate truncation (an
// ellipsis being taught, a fold, a scrolling row) shows up too: judge each line.
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const all = [
  ...readdirSync('src/content/modules')
    .filter((f) => f.endsWith('.ts'))
    .map((f) => f.replace(/\.ts$/, '')),
  'cultures',
  'antipatterns-catalog',
];
const asked = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const targets = asked.length ? asked : all;
// Tall viewports: hit-testing (overlaps) needs the whole mock on screen.
const VIEWPORTS = [
  { name: 'bureau', width: 1180, height: 2200 },
  { name: 'mobile', width: 390, height: 2400 },
];

/** Runs in the page: every clipped text run or control, per mock. */
function scan() {
  const clipOf = (el) => {
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (/hidden|clip|auto|scroll/.test(s.overflowX) || /hidden|clip|auto|scroll/.test(s.overflowY)) return p;
    }
    return null;
  };
  const visible = (el) => {
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return false;
    }
    return true;
  };
  // Visually hidden text (sr-only) is meant to be clipped.
  const srOnly = (el) => {
    const r = el.getBoundingClientRect();
    return r.width <= 1 || r.height <= 1;
  };
  const out = [];
  for (const shot of document.querySelectorAll('[data-shot]')) {
    const id = shot.getAttribute('data-shot');
    shot.querySelectorAll('.mock').forEach((host, i) => {
      const root = host.shadowRoot;
      if (!root) return;
      host.scrollIntoView({ block: 'start' }); // hit-testing only works inside the viewport
      const li = host.closest('li[data-right]');
      const cap = host.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
      const where = li
        ? `option ${li.dataset.right === 'true' ? 'recommandée' : 'leurre'} ${[...li.parentElement.children].indexOf(li) + 1}`
        : cap
          ? cap.split(' — ')[0]
          : `visuel ${i + 1}`;
      const found = [];
      // `from`: where the search for a clipping box starts (a control never clips itself).
      const check = (label, rect, owner, from) => {
        if (!rect.width || !rect.height || !visible(owner) || srOnly(owner)) return;
        const clip = from && clipOf(from);
        if (!clip) return;
        const s = getComputedStyle(clip);
        if (s.textOverflow === 'ellipsis') return; // reported once below, as an ellipsis
        const c = clip.getBoundingClientRect();
        const x = Math.round(Math.max(c.left - rect.left, rect.right - c.right));
        const y = Math.round(Math.max(c.top - rect.top, rect.bottom - c.bottom));
        if (x <= 2 && y <= 2) return;
        const scrolls = /auto|scroll/.test(s.overflowX) || /auto|scroll/.test(s.overflowY);
        found.push({ label, x, y, how: scrolls ? 'défile' : 'coupé' });
      };
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      const lines = []; // every rendered line of text, to find texts drawn over each other
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent.replace(/\s+/g, ' ').trim();
        const el = n.parentElement;
        if (!text || !el || el.closest('style, .mk-marks')) continue;
        range.selectNodeContents(n);
        const label = `« ${text.slice(0, 48)}${text.length > 48 ? '…' : ''} »`;
        check(label, range.getBoundingClientRect(), el, el);
        if (!visible(el) || srOnly(el)) continue;
        // Only the visible part of a line can collide (an ellipsis hides the rest).
        const c = clipOf(el)?.getBoundingClientRect();
        for (const line of range.getClientRects()) {
          const r = c
            ? DOMRect.fromRect({
                x: Math.max(line.left, c.left),
                y: Math.max(line.top, c.top),
                width: Math.min(line.right, c.right) - Math.max(line.left, c.left),
                height: Math.min(line.bottom, c.bottom) - Math.max(line.top, c.top),
              })
            : line;
          if (r.width > 2 && r.height > 2) lines.push({ r, label, el });
        }
      }
      for (let a = 0; a < lines.length; a++)
        for (let b = a + 1; b < lines.length; b++) {
          const p = lines[a];
          const q = lines[b];
          if (p.el === q.el) continue;
          const w = Math.min(p.r.right, q.r.right) - Math.max(p.r.left, q.r.left);
          const h = Math.min(p.r.bottom, q.r.bottom) - Math.max(p.r.top, q.r.top);
          // Line boxes of neighbouring lines touch; real collisions cover a good part of a glyph run.
          if (w <= 4 || h <= Math.min(p.r.height, q.r.height) * 0.45) continue;
          // A dialog, toast or tooltip painted over the page hides what is beneath: not a collision.
          const cx = Math.max(p.r.left, q.r.left) + w / 2;
          const cy = Math.max(p.r.top, q.r.top) + h / 2;
          const stack = root.elementsFromPoint(cx, cy);
          const ip = stack.findIndex((e) => e === p.el || e.contains(p.el));
          const iq = stack.findIndex((e) => e === q.el || e.contains(q.el));
          const top = Math.min(ip, iq);
          const bottom = Math.max(ip, iq);
          const covered =
            top >= 0 &&
            stack.slice(top, bottom).some((e) => {
              const cs = getComputedStyle(e);
              const alpha = cs.backgroundColor.match(/[\d.]+(?=\)$)/)?.[0];
              const opaque = cs.backgroundColor !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(cs.backgroundColor) && (!cs.backgroundColor.startsWith('rgba') || Number(alpha) > 0.85);
              return (opaque || cs.backgroundImage !== 'none') && !e.contains(p.el === stack[bottom] ? p.el : q.el);
            });
          if (!covered) found.push({ label: `${p.label} sur ${q.label}`, x: Math.round(w), y: Math.round(h), how: 'chevauchement' });
        }
      root.querySelectorAll('button, input, select, textarea, img, svg.mk-ico').forEach((el) => {
        if (el.closest('.mk-marks')) return;
        const label = el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.textContent.trim().slice(0, 30) || el.tagName.toLowerCase();
        check(`<${el.tagName.toLowerCase()}> ${label}`, el.getBoundingClientRect(), el, el.parentElement);
      });
      // Labels shortened with an ellipsis (other clipping is covered above).
      root.querySelectorAll('*').forEach((el) => {
        const s = getComputedStyle(el);
        if (s.textOverflow !== 'ellipsis' || el.scrollWidth <= el.clientWidth + 2) return;
        if (![...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) return;
        if (!visible(el) || srOnly(el)) return;
        found.push({ label: `« ${el.textContent.replace(/\s+/g, ' ').trim().slice(0, 48)} »`, x: el.scrollWidth - el.clientWidth, y: 0, how: 'points de suspension' });
      });
      if (found.length) out.push({ id, where, found });
    });
  }
  return out;
}

const server = await createServer({ server: { port: 0, host: '127.0.0.1', hmr: false }, logLevel: 'error', clearScreen: false });
await server.listen();
const { port } = server.httpServer.address();
const browser = await chromium.launch();
let total = 0;
try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const target of targets) {
      await page.goto('about:blank');
      await page.goto(`http://127.0.0.1:${port}/#/apercu/${target}`);
      await page.waitForSelector('[data-preview-ready]', { timeout: 60000 });
      if ((await page.getAttribute('[data-preview-ready]', 'data-preview-ready')) !== 'ok') {
        console.log(`${target} : ${await page.textContent('[data-preview-ready]')}`);
        continue;
      }
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const res = await page.evaluate(scan);
      for (const r of res) {
        total += r.found.length;
        console.log(`${target} · ${vp.name} · ${r.id} · ${r.where}`);
        for (const f of r.found.slice(0, 6))
          console.log(
            f.how === 'chevauchement'
              ? `    textes superposés (${f.x} × ${f.y} px) : ${f.label}`
              : `    ${f.how}${f.x > 2 ? ` de ${f.x} px en largeur` : ''}${f.y > 2 ? ` de ${f.y} px en hauteur` : ''} : ${f.label}`,
          );
        if (r.found.length > 6) console.log(`    … et ${r.found.length - 6} autre(s)`);
      }
    }
    if (errors.length) console.log(`Erreurs dans la page (${vp.name}) :\n- ${[...new Set(errors)].join('\n- ')}`);
    await page.close();
  }
  console.log(total ? `\n${total} élément(s) coupé(s), masqué(s) ou superposé(s) à examiner.` : 'Aucun élément coupé ni superposé dans les maquettes.');
} finally {
  await browser.close();
  await server.close();
}
