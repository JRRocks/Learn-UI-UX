// Temporary (not committed): dumps the text of all content for cross-module checks.
import { writeFileSync, readdirSync } from 'node:fs';
import { createServer } from '/home/user/Learn-UI-UX/node_modules/vite/dist/node/index.js';

const OUT = process.argv[2];
const server = await createServer({ server: { middlewareMode: true, hmr: false }, logLevel: 'error', appType: 'custom' });
const load = (p) => server.ssrLoadModule(p);
const strip = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
const numbers = [];
const outline = [];
const NUM = /(\d[\d  ,.]*\s?(px|ms|s\b|%|:1|ch|rem|em|pt|dp|Mo|Ko|Mbit|ko|mo|°|fps|caractères|mots|secondes|jours|lignes|éléments|options|clics|colonnes)|\b\d+\s?[×x]\s?\d+|ratio|seuil|≥|≤|WCAG \d|\b\d\.\d\.\d+\b)/i;
const push = (where, text) => {
  const t = strip(text);
  if (!t) return;
  for (const sentence of t.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý«])/)) if (NUM.test(sentence)) numbers.push(`${where} | ${sentence}`);
};
try {
  const files = readdirSync('src/content/modules').filter((f) => f.endsWith('.ts'));
  for (const f of files) {
    const m = (await load(`/src/content/modules/${f}`)).default;
    outline.push(`\n# ${m.id} — ${m.title} (${m.category}, ${m.exercises.length} épreuves, ${m.rules.length} fiches)`);
    outline.push(`Résumé : ${strip(m.summary)}`);
    for (const s of m.sections) {
      outline.push(`## § ${s.id} — ${s.title}`);
      push(`${m.id} § ${s.id}`, s.body);
      for (const e of s.examples ?? []) {
        push(`${m.id} § ${s.id} exemple`, `${e.badNote ?? ''} ${e.goodNote ?? ''}`);
      }
    }
    outline.push('Fiches :');
    for (const r of m.rules) {
      outline.push(`- [${r.id}] ${strip(r.front)} → ${strip(r.back)}`);
      push(`${m.id} fiche ${r.id}`, `${r.front} ${r.back}`);
    }
    outline.push('Épreuves :');
    for (const e of m.exercises) {
      outline.push(`- [${e.id}] (${e.type}) ${strip(e.prompt)} ⇒ À retenir : ${strip(e.takeaway)}`);
      push(`${m.id} ${e.id}`, `${e.prompt} ${e.explanation} ${e.takeaway}`);
      for (const o of e.options ?? []) push(`${m.id} ${e.id} option ${o.id}`, `${o.label ?? ''} ${o.why ?? ''}`);
      for (const h of e.hotspots ?? []) push(`${m.id} ${e.id} zone ${h.id}`, `${h.label} ${h.why}`);
      for (const c of e.criteria ?? []) push(`${m.id} ${e.id} critère ${c.id}`, `${c.label} ${c.why}`);
    }
  }
  const { ANTIPATTERNS } = await load('/src/content/antipatterns.ts');
  for (const a of ANTIPATTERNS) push(`catalogue ${a.id}`, `${a.description} ${a.fix}`);
  const res = await load('/src/content/resources.ts');
  push('ressources', JSON.stringify(res));
  const { CULTURES } = await load('/src/content/cultures/profiles.ts');
  for (const c of CULTURES) {
    push(`profil ${c.id}`, c.summary);
    for (const v of c.conventions ?? []) push(`profil ${c.id} ${v.topic}`, `${v.title} ${v.body}`);
  }
  writeFileSync(`${OUT}/numbers.txt`, numbers.join('\n') + '\n');
  writeFileSync(`${OUT}/outline.txt`, outline.join('\n') + '\n');
  console.log(`${numbers.length} phrases chiffrées, ${outline.length} lignes de plan`);
} finally {
  await server.close();
}
