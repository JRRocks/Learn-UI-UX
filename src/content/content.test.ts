import { describe, expect, it } from 'vitest';
import type { AntipatternEntry, CulturePair, CultureProfile, ModuleContent } from '../engine/types';
import { DETECTOR_RULES } from './detectorRules';
import { checkAntipatterns, checkCultures, checkModule } from './validate';

/**
 * Content validation. Run everything with `npm run validate`, or only some modules:
 *   ONLY=color,layout npx vitest run src/content
 */
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};
const only = (env.ONLY ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const files = import.meta.glob<{ default: ModuleContent }>('./modules/*.ts');
const selected = Object.entries(files).filter(([file]) => !only.length || only.some((id) => file.endsWith(`/${id}.ts`)));

const report = (errors: string[]) => (errors.length ? `\n- ${errors.join('\n- ')}\n` : '');

describe('modules', () => {
  for (const [file, load] of selected) {
    it(file.replace('./modules/', ''), async () => {
      const mod = (await load()).default;
      const errors = checkModule(mod, file);
      expect(report(errors)).toBe('');
    });
  }

  it.runIf(!only.length)('ids are unique across all modules', async () => {
    const mods = await Promise.all(Object.values(files).map(async (l) => (await l()).default));
    const seen = new Map<string, string>();
    const errors: string[] = [];
    for (const m of mods)
      for (const e of m.exercises) {
        if (seen.has(e.id)) errors.push(`exercice « ${e.id} » dans ${m.id} et ${seen.get(e.id)}`);
        seen.set(e.id, m.id);
      }
    expect(report(errors)).toBe('');
  });
});

const cultureFiles = import.meta.glob<{ CULTURES?: CultureProfile[]; CULTURE_PAIRS?: CulturePair[] }>(['./cultures/profiles.ts', './cultures/pairs.ts']);

describe.runIf(!only.length || only.includes('cultures'))('cultures', () => {
  it('profiles and pairs', async () => {
    const mods = await Promise.all(Object.values(cultureFiles).map((l) => l()));
    const profiles = mods.flatMap((m) => m.CULTURES ?? []);
    const pairs = mods.flatMap((m) => m.CULTURE_PAIRS ?? []);
    expect(report(checkCultures(profiles, pairs))).toBe('');

    // Exercises tagged with a culture must point to an existing profile.
    if (profiles.length) {
      const ids = new Set(profiles.map((p) => p.id));
      const modsAll = await Promise.all(Object.values(files).map(async (l) => (await l()).default));
      const bad = modsAll.flatMap((m) => m.exercises.filter((e) => e.culture && !ids.has(e.culture)).map((e) => `${e.id} → ${e.culture}`));
      expect(report(bad)).toBe('');
    }
  });
});

const catalog = import.meta.glob<{ ANTIPATTERNS?: AntipatternEntry[] }>('./antipatterns.ts');

describe.runIf(!only.length || only.includes('antipatterns'))('anti-pattern catalog', () => {
  it.runIf(Object.keys(catalog).length > 0)('covers the detector registry', async () => {
    const [load] = Object.values(catalog);
    const list = (await load()).ANTIPATTERNS ?? [];
    expect(report(checkAntipatterns(list, DETECTOR_RULES.map((r) => r.id)))).toBe('');
  });
});
