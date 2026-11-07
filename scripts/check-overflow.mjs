// Reflow check (WCAG 1.4.10): no page may scroll sideways at 320, 360 or 390 px, and the labels
// of the bottom tab bar must not touch. Then every exercise with visual options (their mocks set
// the width of the tiles) is played in a session: measured on the question, then on its correction.
// Then the same with a larger default text size, as a reader sets it in the browser (20, 24 and 32 px
// instead of 16, WCAG 1.4.4), at 320, 360, 390 and 768 px with a mouse (the keyboard hints show):
// every page, two exercises of each format before and after « Valider », the timed challenge and the
// cards. Everywhere, a bar that stays on screen must fit in the room kept for it (scroll-padding),
// or a control reached with Tab could end up under it (WCAG 2.4.11).
// Prints the elements that stick out; exits with 1 if any.
//   npm run check:overflow
//   npm run check:overflow -- 320          → only this width
//   npm run check:overflow -- --pages      → only the pages
//   npm run check:overflow -- --exercises  → only the exercises (with a large text: the challenge and the cards too)
//   npm run check:overflow -- --texte      → only the large text sizes
//   npm run check:overflow -- --sans-texte → only the default text size
import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const asked = args.map(Number).filter(Boolean);
const WIDTHS = asked.length ? asked : [320, 360, 390];
const PAGES = !args.includes('--exercises');
const EXERCISES = !args.includes('--pages');
const DEFAULT_TEXT = !args.includes('--texte');
const LARGE_TEXT = !args.includes('--sans-texte');
/** Default text sizes of the large-text pass, and its widths (768 px: a tablet, or a window beside another). */
const TEXT_SIZES = [20, 24, 32];
const TEXT_WIDTHS = asked.length ? asked : [320, 360, 390, 768];
/** The run the exercises are played in, restored by the session from this tab's storage. */
const RUN = 'overflow';

/** Runs in the page: how far it scrolls sideways, what sticks out, and the bars taller than their room. */
function measure() {
  const vw = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  const tabs = [...document.querySelectorAll('.tabbar a')].map((a) => {
    const r = document.createRange();
    r.selectNodeContents(a);
    const b = r.getBoundingClientRect();
    return [b.left, b.right];
  });
  let touching = 0;
  for (let i = 1; i < tabs.length; i++) if (tabs[i][0] - tabs[i - 1][1] < 4) touching++;
  const culprits = [];
  if (sw > vw) {
    for (const el of document.querySelectorAll('#root *')) {
      const b = el.getBoundingClientRect();
      if (b.right <= vw + 0.5 || !b.width) continue;
      let clipped = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement)
        if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowX)) clipped = true;
      if (clipped || (el.parentElement.getBoundingClientRect().right > vw + 0.5 && !['MAIN', 'HEADER', 'NAV'].includes(el.parentElement.tagName))) continue;
      culprits.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').join('.') : ''} (${Math.round(b.width)} px) « ${el.textContent.trim().slice(0, 50)} »`);
    }
  }
  // Sticky and fixed bars against the scroll padding kept for them at their edge of the screen.
  const root = getComputedStyle(document.documentElement);
  const room = { top: parseFloat(root.scrollPaddingTop) || 0, bottom: parseFloat(root.scrollPaddingBottom) || 0 };
  const bars = [];
  for (const [selector, edge] of [['.topbar', 'top'], ['.player-top', 'top'], ['.task-actions', 'bottom'], ['.tabbar', 'bottom']]) {
    const el = document.querySelector(selector);
    if (!el) continue;
    const cs = getComputedStyle(el);
    const h = el.getBoundingClientRect().height;
    if (cs.display === 'none' || !h || !/sticky|fixed/.test(cs.position)) continue;
    if (h > room[edge] + 0.5) bars.push(`${selector} de ${Math.round(h)} px, ${Math.round(room[edge])} px gardés en ${edge === 'top' ? 'haut' : 'bas'}`);
  }
  return { vw, sw, touching, culprits: [...new Set(culprits)].slice(0, 3), bars };
}

/** Some complete answer to the exercise on screen, through the DOM (a badge toast may lie over a control). */
async function answer(page) {
  await page.evaluate(async () => {
    const task = document.querySelector('article.task');
    const pause = () => new Promise((r) => setTimeout(r, 30));
    task.querySelector('fieldset input')?.click();
    // Hotspots: the zones' buttons are in the mock's shadow root, up to the number asked.
    for (const host of task.querySelectorAll('.hotspot-stage *')) {
      if (!host.shadowRoot) continue;
      for (const button of host.shadowRoot.querySelectorAll('.mk-hit')) {
        const [done, needed] = (task.querySelector('.hotspot-count')?.textContent ?? '0 / 0').split('/').map((s) => Number(s.trim()));
        if (done >= needed) break;
        button.click();
        await pause();
      }
    }
    // Grids: one criterion at a time, each click updating the draft the next one starts from.
    for (const row of task.querySelectorAll('.grid-row')) {
      row.querySelectorAll('.segmented button')[1]?.click();
      await pause();
    }
  });
  const selects = page.locator('article.task .match-table select');
  for (let i = 0, n = await selects.count(); i < n; i++) await selects.nth(i).selectOption({ index: 1 });
}

const press = (page) => page.evaluate(() => document.querySelector('.task-actions .btn-primary')?.click());

/** A page of `context`, with the browser's default text size at `size` px (16 when omitted). */
async function newPage(context, size) {
  const page = await context.newPage();
  if (size) {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Page.enable');
    await cdp.send('Page.setFontSizes', { fontSizes: { standard: size, fixed: Math.round((size * 13) / 16) } });
  }
  return page;
}

/** Plays `ids` in one « Mes erreurs » run; `check(page, step, id)` measures the question, then the correction. */
async function playRun(context, size, base, ids, check, { answerAll = false } = {}) {
  const run = JSON.stringify({ route: '/session?mode=mistakes', ids, index: 0, played: [], t: Date.now() });
  await context.addInitScript(([key, value]) => sessionStorage.getItem(key) || sessionStorage.setItem(key, value), [`learn-ui-ux:run:${RUN}`, run]);
  const page = await newPage(context, size);
  await page.goto(`${base}#/session?mode=mistakes&run=${RUN}`);
  for (const id of ids) {
    await page.waitForSelector(`[id="prompt-${id}"]`, { timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await check(page, 'question', id);
    if (answerAll) await answer(page);
    else await page.evaluate(() => document.querySelector('.task fieldset input')?.click());
    await press(page);
    await page.waitForSelector('.feedback', { timeout: 30000 });
    await check(page, 'correction', id);
    if (id !== ids.at(-1)) await press(page);
  }
  return page;
}

// No HMR: other authors may be writing content files while the check runs. node_modules may be a
// symlink (git worktrees): allow its real path, or the web fonts are refused and widths are wrong.
const server = await createServer({
  server: { port: 0, host: '127.0.0.1', hmr: false, fs: { allow: [process.cwd(), realpathSync('node_modules')] } },
  logLevel: 'error',
  clearScreen: false,
});
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch();
const phone = (width) => browser.newContext({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true, locale: 'fr-FR' });
let failures = 0;
try {
  const probe = await browser.newPage();
  await probe.goto(`${base}#/`);
  await probe.waitForSelector('#main', { timeout: 60000 });
  const ids = await probe.evaluate(async () => {
    const content = await import('/src/content/index.ts');
    const cultures = await import('/src/content/cultures/index.ts');
    const data = await cultures.loadCultures();
    // Choices between mocks: each tile is as wide as its mock wants unless the grid holds it.
    const visual = [];
    // Large text: for each format, the exercise with the longest word and the one with the most text.
    const formats = {};
    for (const m of content.MODULES)
      for (const e of (await content.loadModule(m.id)).exercises) {
        const isVisual = (e.type === 'choice' || e.type === 'multi') && e.options.some((o) => o.visual);
        if (isVisual) visual.push(e.id);
        const text = JSON.stringify(e, (k, v) => (k === 'html' || k === 'css' || k === 'visual' ? undefined : v));
        const word = Math.max(...text.split(/[\s"\\]+/).map((w) => w.length));
        (formats[isVisual ? 'duel' : e.type] ??= []).push({ id: e.id, word, length: text.length });
      }
    const sample = [];
    for (const list of Object.values(formats))
      for (const key of ['word', 'length']) {
        const top = [...list].sort((a, b) => b[key] - a[key]).find((e) => !sample.includes(e.id));
        if (top) sample.push(top.id);
      }
    return { modules: content.MODULES.map((m) => m.id), cultures: data.profiles.map((c) => c.id), pairs: data.pairs.map((p) => p.id), visual, sample };
  });
  await probe.close();
  const routes = [
    '/', '/apprendre', '/entrainement', '/fiches', '/progression', '/a-propos',
    '/cultures', '/cultures/labo', '/cultures/comparer?a=fr&b=cn',
    ...['aide-memoire', 'anti-patterns', 'critique', 'commandes', 'glossaire', 'liens'].map((t) => `/ressources/${t}`),
    ...ids.modules.map((m) => `/apprendre/${m}`),
    ...ids.cultures.map((c) => `/cultures/${c}`),
    ...ids.pairs.map((p) => `/cultures/paire/${p}`),
  ];
  const fails = (m) => m.sw > m.vw || m.touching || m.bars.length;
  const describe = (m) =>
    [m.sw > m.vw ? `${m.sw} px de large pour ${m.vw}` : '', m.touching ? 'libellés de la barre d’onglets collés' : '', ...m.bars].filter(Boolean).join(' ; ');
  const show = (label, m) => {
    console.log(`✗ ${label} : ${describe(m)}`);
    for (const c of m.culprits) console.log(`    ${c}`);
  };
  const loaded = async (page) => {
    await page.waitForSelector('#main', { timeout: 60000 });
    await page.waitForFunction(() => !document.querySelector('main')?.textContent?.includes('Chargement'), null, { timeout: 30000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
  };

  for (const width of DEFAULT_TEXT && PAGES ? WIDTHS : []) {
    const context = await phone(width);
    const page = await context.newPage();
    let bad = 0;
    for (const route of routes) {
      await page.goto(`${base}?w=${width}#${route}`);
      await loaded(page);
      const m = await page.evaluate(measure);
      if (fails(m)) {
        bad++;
        show(`${width} px ${route}`, m);
      }
    }
    console.log(`${width} px : ${bad ? `${bad} page(s) en défaut` : 'aucun débordement'} sur ${routes.length}.`);
    failures += bad;
    await context.close();
  }
  // The exercises in one « Mes erreurs » run: question, first option, « Valider », correction, next.
  // The page is driven through the DOM: a badge toast may lie over « Valider » for a few seconds.
  for (const width of DEFAULT_TEXT && EXERCISES ? WIDTHS : []) {
    const context = await phone(width);
    let bad = 0;
    const seen = new Set();
    await playRun(context, 0, base, ids.visual, async (page, step, id) => {
      const m = await page.evaluate(measure);
      if (!fails(m)) return;
      if (!seen.has(id)) bad++;
      seen.add(id);
      show(`${width} px épreuve ${id} (${step})`, m);
    });
    console.log(`${width} px : ${bad ? `${bad} épreuve(s) en défaut` : 'aucun débordement'} sur ${ids.visual.length} épreuves à choix visuel, avant et après « Valider ».`);
    failures += bad;
    await context.close();
  }

  // A larger default text size (CDP Page.setFontSizes, as the browser's own setting), with a mouse.
  // Four sizes and widths at a time.
  const configs = [];
  for (const size of LARGE_TEXT ? TEXT_SIZES : []) for (const width of TEXT_WIDTHS) configs.push({ size, width });
  const large = async ({ size, width }) => {
    const context = await browser.newContext({ viewport: { width, height: 800 }, locale: 'fr-FR' });
    const tag = `texte ${size} px, ${width} px`;
    const lines = [];
    let bad = 0;
    const check = async (page, label) => {
      const m = await page.evaluate(measure);
      if (!fails(m)) return;
      bad++;
      lines.push(`✗ ${tag} ${label} : ${describe(m)}`, ...m.culprits.map((c) => `    ${c}`));
    };
    if (PAGES) {
      const page = await newPage(context, size);
      for (const route of routes) {
        await page.goto(`${base}?w=${width}&t=${size}#${route}`);
        await loaded(page);
        await check(page, route);
      }
      await page.close();
    }
    if (EXERCISES) {
      const page = await playRun(context, size, base, ids.sample, (p, step, id) => check(p, `épreuve ${id} (${step})`), { answerAll: true });
      // The timed challenge: its start, then three statements, each before and after the answer.
      await page.goto(`${base}?t=${size}#/session?mode=blitz`);
      await loaded(page);
      await check(page, 'défi chrono');
      await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => /Lancer le chrono/.test(b.textContent))?.click());
      for (let i = 1; i <= 3; i++) {
        await page.waitForSelector('.tf .option:not(:disabled)', { timeout: 30000 });
        await check(page, `défi chrono, affirmation ${i}`);
        await page.evaluate(() => document.querySelector('.tf .option')?.click());
        await page.waitForSelector('.feedback', { timeout: 30000 });
        await check(page, `défi chrono, correction ${i}`);
        await page.evaluate(() => document.querySelector('.task-actions .btn-primary')?.click());
      }
      // The cards: three of them, question then answer.
      await page.goto(`${base}?t=${size}#/fiches`);
      for (let i = 1; i <= 3; i++) {
        await page.waitForSelector('.flashcard', { timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);
        await check(page, `fiche ${i}`);
        await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => /Retourner la fiche/.test(b.textContent))?.click());
        await page.waitForSelector('.flashcard-a', { timeout: 30000 });
        await check(page, `fiche ${i}, réponse`);
        // A click within the settling delay is not a grade: Enter on the button is.
        await page.locator('.grades .btn').first().press('Enter');
      }
    }
    await context.close();
    console.log(lines.length ? lines.join('\n') : `${tag} : aucun débordement.`);
    return bad;
  };
  const queue = [...configs];
  const totals = await Promise.all(
    Array.from({ length: Math.min(4, queue.length) }, async () => {
      let bad = 0;
      while (queue.length) bad += await large(queue.shift());
      return bad;
    }),
  );
  if (configs.length) {
    const bad = totals.reduce((a, b) => a + b, 0);
    console.log(
      `Texte agrandi (${TEXT_SIZES.join(', ')} px ; ${TEXT_WIDTHS.join(', ')} px) : ${bad ? `${bad} écran(s) en défaut` : 'aucun débordement'}${PAGES ? `, ${routes.length} pages` : ''}${EXERCISES ? `, ${ids.sample.length} épreuves, défi chrono et fiches` : ''}.`,
    );
    failures += bad;
  }
} finally {
  await browser.close();
  await server.close();
}
process.exit(failures ? 1 : 0);
