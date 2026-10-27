import { withApp, newPage } from './h.mjs';
await withApp(async ({ browser, base }) => {
  const page = await newPage(browser, base);
  const r = await page.evaluate(async () => {
    const c = await import('/src/content/index.ts');
    const s = await import('/src/engine/session.ts');
    const tf = c.EXERCISES.filter((e) => e.type === 'truefalse');
    const perModule = c.MODULES.map((m) => [m.id, m.title, c.exercisesOf(m.id).length, m.rules.length]);
    const culture = c.EXERCISES.filter((e) => e.culture || e.module === 'culture').length;
    return {
      total: c.EXERCISES.length,
      tf: tf.length,
      tfTrue: tf.filter((e) => e.answer === true).length,
      tfFalse: tf.filter((e) => e.answer === false).length,
      perModule,
      sizes: s.SESSION_SIZE,
      culture,
      rules: c.RULE_CARDS.length,
      units: [...new Set(c.EXERCISES.filter((e) => e.type === 'slider').map((e) => e.unit))],
    };
  });
  console.log(JSON.stringify({ ...r, perModule: undefined }, null, 0));
  for (const m of r.perModule) console.log(m.join(' | '));
  const min = Math.min(...r.perModule.map((m) => m[2]));
  const max = Math.max(...r.perModule.map((m) => m[2]));
  console.log('module exercise count range', min, max, 'modules over 12:', r.perModule.filter((m) => m[2] > 12).length, '/', r.perModule.length);
});
