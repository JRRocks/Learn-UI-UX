// Reflow check (WCAG 1.4.10): no page may scroll sideways at 320, 360 or 390 px, and the labels
// of the bottom tab bar must not touch. Then every exercise with visual options (their mocks set
// the width of the tiles) is played in a session: measured on the question, then on its correction.
// Prints the elements that stick out; exits with 1 if any.
//   npm run check:overflow
//   npm run check:overflow -- 320          → only this width
//   npm run check:overflow -- --pages      → only the pages
//   npm run check:overflow -- --exercises  → only the exercises
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
/** The run the exercises are played in, restored by the session from this tab's storage. */
const RUN = 'overflow';

/** Runs in the page: how far it scrolls sideways, and what sticks out. */
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
    for (const el of document.querySelectorAll('main *')) {
      const b = el.getBoundingClientRect();
      if (b.right <= vw + 0.5 || !b.width) continue;
      let clipped = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement)
        if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowX)) clipped = true;
      if (clipped || (el.parentElement.getBoundingClientRect().right > vw + 0.5 && el.parentElement.tagName !== 'MAIN')) continue;
      culprits.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').join('.') : ''} (${Math.round(b.width)} px) « ${el.textContent.trim().slice(0, 50)} »`);
    }
  }
  return { vw, sw, touching, culprits: [...new Set(culprits)].slice(0, 3) };
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
    for (const m of content.MODULES)
      for (const e of (await content.loadModule(m.id)).exercises)
        if ((e.type === 'choice' || e.type === 'multi') && e.options.some((o) => o.visual)) visual.push(e.id);
    return { modules: content.MODULES.map((m) => m.id), cultures: data.profiles.map((c) => c.id), pairs: data.pairs.map((p) => p.id), visual };
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
  for (const width of PAGES ? WIDTHS : []) {
    const context = await phone(width);
    const page = await context.newPage();
    let bad = 0;
    for (const route of routes) {
      await page.goto(`${base}?w=${width}#${route}`);
      await page.waitForSelector('#main', { timeout: 60000 });
      await page.waitForFunction(() => !document.querySelector('main')?.textContent?.includes('Chargement'), null, { timeout: 30000 }).catch(() => {});
      await page.evaluate(() => document.fonts.ready);
      const m = await page.evaluate(measure);
      if (m.sw > m.vw || m.touching) {
        bad++;
        console.log(`✗ ${width} px ${route} : ${m.sw > m.vw ? `${m.sw} px de large pour ${m.vw}` : ''}${m.touching ? ' libellés de la barre d’onglets collés' : ''}`);
        for (const c of m.culprits) console.log(`    ${c}`);
      }
    }
    console.log(`${width} px : ${bad ? `${bad} page(s) en défaut` : 'aucun débordement'} sur ${routes.length}.`);
    failures += bad;
    await context.close();
  }
  // The exercises in one « Mes erreurs » run: question, first option, « Valider », correction, next.
  // The page is driven through the DOM: a badge toast may lie over « Valider » for a few seconds.
  const press = (page) => page.evaluate(() => document.querySelector('.task-actions .btn-primary')?.click());
  for (const width of EXERCISES ? WIDTHS : []) {
    const context = await phone(width);
    const run = JSON.stringify({ route: '/session?mode=mistakes', ids: ids.visual, index: 0, played: [], t: Date.now() });
    await context.addInitScript(([key, value]) => sessionStorage.getItem(key) || sessionStorage.setItem(key, value), [`learn-ui-ux:run:${RUN}`, run]);
    const page = await context.newPage();
    await page.goto(`${base}?w=${width}#/session?mode=mistakes&run=${RUN}`);
    let bad = 0;
    for (const id of ids.visual) {
      await page.waitForSelector(`[id="prompt-${id}"]`, { timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const states = [];
      states.push(['question', await page.evaluate(measure)]);
      await page.evaluate(() => document.querySelector('.task fieldset input')?.click());
      await press(page);
      await page.waitForSelector('.feedback', { timeout: 30000 });
      states.push(['correction', await page.evaluate(measure)]);
      const over = states.filter(([, m]) => m.sw > m.vw);
      if (over.length) {
        bad++;
        for (const [step, m] of over) {
          console.log(`✗ ${width} px épreuve ${id} (${step}) : ${m.sw} px de large pour ${m.vw}`);
          for (const c of m.culprits) console.log(`    ${c}`);
        }
      }
      if (id !== ids.visual.at(-1)) await press(page);
    }
    console.log(`${width} px : ${bad ? `${bad} épreuve(s) en défaut` : 'aucun débordement'} sur ${ids.visual.length} épreuves à choix visuel, avant et après « Valider ».`);
    failures += bad;
    await context.close();
  }
} finally {
  await browser.close();
  await server.close();
}
process.exit(failures ? 1 : 0);
