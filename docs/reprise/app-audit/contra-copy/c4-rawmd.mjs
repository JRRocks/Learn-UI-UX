import { withApp, newPage, nav, OUT } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base, { hash: '/ressources/anti-patterns' });
  await page.waitForFunction(() => document.querySelectorAll('.catalog li p').length > 10, null, { timeout: 30000 });
  const raw = await page.locator('.catalog > li').evaluateAll((lis) =>
    lis
      .map((li) => {
        const ps = [...li.querySelectorAll(':scope > p')].map((p) => p.textContent);
        const hits = ps.filter((t) => /`[^`]+`|(^|[\s(])\*[^*\s][^*]*\*/.test(t));
        return hits.length ? `${li.querySelector('code').textContent}: ${hits.map((h) => h.slice(0, 140)).join(' || ')}` : null;
      })
      .filter(Boolean),
  );
  console.log('CATALOG ENTRIES WITH RAW MD:', raw.length);
  for (const r of raw.slice(0, 30)) console.log('  ', r);
  const theater = await page.locator('.catalog > li', { hasText: 'theater' }).first().innerText().catch(() => 'none');
  console.log('THEATER:', JSON.stringify(theater.slice(0, 400)));
  await nav(page, '/ressources/glossaire', 600);
  const gl = await page.locator('dl.defs dd').evaluateAll((dds) => dds.map((d) => d.textContent).filter((t) => /`|\*/.test(t)));
  console.log('GLOSSARY RAW:', gl.length, JSON.stringify(gl));
  // other raw-rendered fields: heuristics/personas/commands/cheatsheet
  await nav(page, '/ressources/critique', 600);
  const cr = await page.locator('dl.defs dd').evaluateAll((dds) => dds.map((d) => d.textContent).filter((t) => /`|\*/.test(t)));
  console.log('CRITIQUE RAW:', cr.length, JSON.stringify(cr));
  await nav(page, '/ressources/commandes', 600);
  const cm = await page.locator('table td').evaluateAll((tds) => tds.map((d) => d.textContent).filter((t) => /`|\*/.test(t)));
  console.log('COMMANDS RAW:', cm.length, JSON.stringify(cm));
  // Lab notes
  for (const loc of ['ko-KR', 'ar-SA', 'ja-JP', 'zh-CN']) {
    await nav(page, '/cultures/labo', 600);
    await page.selectOption('#lab-locale', loc);
    await page.waitForTimeout(300);
    const notes = await page.locator('.lab ul.md li').allInnerTexts();
    console.log(`LAB ${loc} notes with raw md:`, JSON.stringify(notes.filter((n) => /`|\*/.test(n))));
  }
  // Culture detail: ecosystem chips + dims notes rendered raw (Cultures.tsx:215, 480)
  await nav(page, '/cultures', 1500);
  const dd = await page.locator('dl.defs dd').evaluateAll((dds) => dds.map((d) => d.textContent).filter((t) => /`|\*/.test(t)));
  console.log('CULTURES DIMS RAW:', dd.length);
});
