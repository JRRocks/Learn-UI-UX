import { withApp, newPage, nav, OUT } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const p = await newPage(browser, base, { width: 375, height: 800, hash: '/session?mode=blitz' });
  await p.locator('.page-head .lead').screenshot({ path: `${OUT}/c9-blitz-375.png` });
  const p2 = await newPage(browser, base, { width: 320, height: 800, hash: '/entrainement' });
  await p2.locator('.format', { hasText: 'Examen blanc' }).screenshot({ path: `${OUT}/c9-exam-320.png` });
});
