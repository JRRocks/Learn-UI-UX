import { readdirSync } from 'node:fs';
import { createServer } from '/home/user/Learn-UI-UX/node_modules/vite/dist/node/index.js';
const server = await createServer({ root: '/home/user/Learn-UI-UX', server: { middlewareMode: true, hmr: false }, logLevel: 'error', appType: 'custom' });
const stats = {};
let t = 0, f = 0;
const types = {};
const answerPos = {};
for (const file of readdirSync('/home/user/Learn-UI-UX/src/content/modules').filter((x) => x.endsWith('.ts'))) {
  const m = (await server.ssrLoadModule(`/src/content/modules/${file}`)).default;
  for (const e of m.exercises) {
    types[e.type] = (types[e.type] ?? 0) + 1;
    if (e.type === 'truefalse') {
      stats[m.id] = stats[m.id] ?? { vrai: 0, faux: 0 };
      if (e.answer) { stats[m.id].vrai++; t++; } else { stats[m.id].faux++; f++; }
    }
    if (e.type === 'choice' && !e.fixedOrder) {
      const i = e.options.findIndex((o) => o.id === e.answer);
      answerPos[`${e.options.length}:${i}`] = (answerPos[`${e.options.length}:${i}`] ?? 0) + 1;
    }
  }
}
console.log('truefalse', { vrai: t, faux: f });
console.log(stats);
console.log('types', types);
console.log('choice answer position (options:index) — shuffled at display, informative only', answerPos);
await server.close();
