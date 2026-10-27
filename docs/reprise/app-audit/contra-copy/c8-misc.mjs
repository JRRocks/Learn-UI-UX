import { withApp, newPage, nav, today, baseState, OUT } from './h.mjs';
const t = today();
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/apprendre' });
  console.log('LEARN LEAD:', JSON.stringify(await page.locator('.page-head .lead').innerText()));
  console.log('LEARN GROUPS:', JSON.stringify(await page.locator('.toc-group-head h2').allInnerTexts()));
  console.log('LEARN ROW typography:', JSON.stringify(await page.locator('.toc-row a[href="#/apprendre/typography"] .toc-meta').innerText()));
  await nav(page, '/ressources/commandes', 500);
  console.log('RES CMD typeset:', JSON.stringify(await page.locator('tr', { hasText: 'typeset' }).first().innerText()));
  // labels-1: accessible names of "Lancer" links on Practice
  await nav(page, '/entrainement', 500);
  const names = await page.locator('#main a, #main button').evaluateAll((els) =>
    els.filter((e) => /Lancer/.test(e.textContent)).map((e) => `${e.tagName}:${e.getAttribute('aria-label') ?? e.textContent.trim()}`),
  );
  console.log('LANCER names:', JSON.stringify(names));
  const snap = await page.locator('section[aria-labelledby=culture-title]').ariaSnapshot();
  console.log('CULTURE SECTION ARIA:\n' + snap);
  console.log('PRACTICE FICHES:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Fiches' }).innerText()));
  await nav(page, '/', 500);
  console.log('HOME FICHES:', JSON.stringify(await page.locator('a.side-link', { hasText: 'Fiches' }).innerText()));
  // empty-1: catalog search with no result
  await nav(page, '/ressources/anti-patterns', 1500);
  await page.fill('#ap-q', 'zzzz');
  await page.waitForTimeout(300);
  console.log('CATALOG EMPTY section:', JSON.stringify(await page.locator('#main .section').first().innerText()));
  console.log('catalog items:', await page.locator('.catalog > li').count());
  // date-1 / facts-1 on progress with 61 sessions
  const sessions = Array.from({ length: 75 }, (_, i) => ({ id: String(i), at: new Date().toISOString(), kind: 'daily', label: 'Session du jour', total: 10, correct: 5, partial: 0, xp: 10, missed: [] }));
  const p2 = await newPage(browser, base, { state: baseState({ xp: 750, sessions, days: { [t]: { xp: 40, answered: 4, correct: 4 } }, badges: { 'first-step': t } }), hash: '/progression' });
  console.log('SESSIONS TERMINEES (75 done):', JSON.stringify(await p2.locator('dt', { hasText: 'Sessions terminées' }).locator('xpath=..').innerText()));
  console.log('PROGRESS NIVEAU usage:', JSON.stringify(await p2.locator('.page-head .lead').innerText()), '| table head:', JSON.stringify(await p2.locator('#mastery-title + .table-scroll thead').innerText()), '| first row:', JSON.stringify(await p2.locator('#mastery-title + .table-scroll tbody tr').first().innerText()));
  console.log('BADGE date:', JSON.stringify(await p2.locator('.badge[data-earned] small').first().innerText()));
  // Unknown module title
  await nav(p2, '/session?mode=module&id=nope', 600);
  console.log('UNKNOWN MODULE:', JSON.stringify(await p2.locator('#main').innerText()));
  await nav(p2, '/session?mode=review', 600);
  console.log('EMPTY REVIEW:', JSON.stringify(await p2.locator('#main').innerText()));
});
