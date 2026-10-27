import { withApp, newPage, nav, OUT } from './h.mjs';
const pages = ['/entrainement', '/session?mode=blitz', '/ressources/commandes', '/ressources/anti-patterns', '/ressources/critique', '/ressources/glossaire', '/ressources/aide-memoire', '/progression', '/', '/cultures', '/cultures/labo', '/apprendre'];
const widths = [320, 360, 375, 390, 414];
await withApp(async ({ browser, base }) => {
  const found = new Map();
  for (const w of widths) {
    const page = await newPage(browser, base, { width: w, height: 800, hash: '/' });
    for (const h of pages) {
      await nav(page, h, h.includes('anti-patterns') || h.includes('cultures') ? 1500 : 500);
      const hits = await page.evaluate(() => {
        const out = [];
        const walker = document.createTreeWalker(document.querySelector('#main'), NodeFilter.SHOW_TEXT);
        let n;
        while ((n = walker.nextNode())) {
          const s = n.data;
          const re = / ([:;?!%»])|(«) /g;
          let m;
          while ((m = re.exec(s))) {
            // index of the punctuation (case 1) or of the char after the space after « (case 2)
            const punct = m[1] ? m.index + 1 : m.index + 2;
            const prev = m[1] ? m.index - 1 : m.index; // char before the space (or « itself)
            if (prev < 0 || punct >= s.length) continue;
            const r = document.createRange();
            r.setStart(n, prev); r.setEnd(n, prev + 1);
            const a = r.getClientRects()[0];
            r.setStart(n, punct); r.setEnd(n, punct + 1);
            const b = r.getClientRects()[0];
            if (!a || !b || a.width === 0) continue;
            if (b.top > a.top + 2) out.push(`${JSON.stringify(s.slice(Math.max(0, prev - 25), punct + 15))}`);
          }
        }
        return out;
      });
      for (const x of hits) {
        const k = `${h} ${x}`;
        if (!found.has(k)) found.set(k, []);
        found.get(k).push(w);
      }
    }
    await page.__ctx.close();
  }
  for (const [k, ws] of found) console.log(ws.join(','), k);
  console.log('total distinct', found.size);
});
