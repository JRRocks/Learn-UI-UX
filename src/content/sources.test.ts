import { describe, expect, it } from 'vitest';
import type { Source, SourceRef } from '../engine/types';
import { frenchSpacing } from '../lib/markdown';
import { ALL_MODULES } from './all';
import { CULTURES } from './cultures/profiles';
import { CHEATSHEET } from './resources';
import { QUOTED_TITLES, SOURCES, labelParts, quotedParts, resolveSource } from './sources';
import { checkSources } from './validate';

describe('labelParts: only the title of a source is in its own language (a11y-final-8)', () => {
  it('leaves the publisher and a final note in French', () => {
    expect(labelParts('Nielsen Norman Group — Response Times: The 3 Important Limits (Jakob Nielsen)')).toEqual({
      publisher: 'Nielsen Norman Group — ',
      title: 'Response Times: The 3 Important Limits',
      note: ' (Jakob Nielsen)',
    });
    expect(labelParts('Hunton — CNIL fines TikTok 5 million euros (2023)')).toEqual({
      publisher: 'Hunton — ',
      title: 'CNIL fines TikTok 5 million euros',
      note: ' (2023)',
    });
  });

  it('keeps the parentheses inside a title, and splits at the first dash only', () => {
    expect(labelParts('W3C — Internationalization (i18n) Activity')).toEqual({ publisher: 'W3C — ', title: 'Internationalization (i18n) Activity', note: '' });
    expect(labelParts('Marcus & Gould (2000) — Crosscurrents: Cultural Dimensions — and more')).toEqual({
      publisher: 'Marcus & Gould (2000) — ',
      title: 'Crosscurrents: Cultural Dimensions — and more',
      note: '',
    });
  });

  it('reads a label without a publisher as a title', () => {
    expect(labelParts('Practical Typography')).toEqual({ publisher: '', title: 'Practical Typography', note: '' });
  });
});

describe('quotedParts: the part of a label read in the language of the source (a11y-final-8)', () => {
  it('is the title by default', () => {
    expect(quotedParts({ label: 'Cowan (2001) — The magical number 4 in short-term memory', lang: 'en' })).toEqual({
      before: 'Cowan (2001) — ',
      quote: 'The magical number 4 in short-term memory',
      after: '',
    });
    expect(quotedParts({ label: 'Hunton — CNIL Fines TikTok 5 Million Euros Over Cookie Infringements (janvier 2023)', lang: 'en' })).toEqual({
      before: 'Hunton — ',
      quote: 'CNIL Fines TikTok 5 Million Euros Over Cookie Infringements',
      after: ' (janvier 2023)',
    });
  });

  it('is the part the source names when the title alone is not it', () => {
    // A note in the language of the title…
    expect(quotedParts({ label: 'Planalto — Lei Geral de Proteção de Dados (Lei 13.709/2018)', lang: 'pt', quote: 'Lei Geral de Proteção de Dados (Lei 13.709/2018)' })).toEqual({
      before: 'Planalto — ',
      quote: 'Lei Geral de Proteção de Dados (Lei 13.709/2018)',
      after: '',
    });
    // …a publisher in its script, or a title in a French sentence.
    expect(quotedParts({ label: '消費者庁 — 特定商取引法ガイド（通信販売）', lang: 'ja', quote: '消費者庁 — 特定商取引法ガイド（通信販売）' })?.before).toBe('');
    expect(quotedParts(resolveSource('hall'))).toEqual({ before: 'Edward T. Hall — ', quote: 'Beyond Culture', after: ' (1976), contexte fort / faible' });
  });

  it('marks nothing in a French label, or when the part it names is not in the label', () => {
    expect(quotedParts(resolveSource('nng:heuristics'))).toBeNull();
    expect(quotedParts({ label: 'Gesetze im Internet — § 312j BGB (Button-Lösung)', lang: 'de', quote: 'Button-Losung' })).toBeNull();
    expect(quotedParts({ label: 'Gesetze im Internet — § 312j BGB (Button-Lösung)', lang: 'de', quote: '' })).toBeNull();
  });
});

const ALL_SOURCES: Source[] = [
  ...Object.values(SOURCES),
  ...ALL_MODULES.flatMap((m) => [...m.sources, ...m.exercises.flatMap((e) => e.sources ?? [])]),
  ...CULTURES.flatMap((c) => c.sources),
  ...CHEATSHEET.flatMap((g) => [g.source, ...g.rows.flatMap(([, , s]) => (s ? [s] : []))]),
];

/** A source as written in the content: a key stands for its shared reference. */
const written = (s: Source): SourceRef => (typeof s === 'string' ? (SOURCES[s] ?? { label: s }) : s);

/** Words of an English title that a French one hardly holds… */
const ENGLISH = /\b(?:the|of|and|for|to|in|on|with|your|how|why|what|when|is|are|vs|from|by|over|or|do|than|its|into|an|really)\b/i;
/** …and what makes a title French: accents, guillemets, elisions, its common words. */
const FRENCH = /[àâäçéèêëîïôöùûüÿœæ«»]|\b[cdjlns]’|\b(?:le|la|les|des|du|de|et|pour|sur|une?|dans|avec|aux?|par|est|sont|qui|que|ne|pas|ou|ses|son|sa|ce|cette|leurs?)\b/i;

describe('source languages (a11y-final-8)', () => {
  it('names the language of the shared references quoted untranslated, and only of those', () => {
    expect(resolveSource('palo-it:china').lang).toBe('en');
    expect(resolveSource('w3c:jlreq').lang).toBe('en');
    // Translated, or names of sites and products: read in French.
    expect(resolveSource('nng:heuristics').lang).toBeUndefined();
    expect(resolveSource('hig').lang).toBeUndefined();
    expect(resolveSource('web.dev:cwv').lang).toBeUndefined();
  });

  it('gives the titles quoted in the content their language, unless their source names its own', () => {
    expect(resolveSource({ label: 'Nielsen Norman Group — Response Times: The 3 Important Limits' }).lang).toBe('en');
    expect(resolveSource({ label: 'Nielsen Norman Group — Response Times: The 3 Important Limits (Jakob Nielsen)' }).lang).toBe('en');
    expect(quotedParts(resolveSource({ label: 'Cowan (2001) — The magical number 4 in short-term memory' }))?.quote).toBe(
      'The magical number 4 in short-term memory',
    );
    expect(quotedParts(resolveSource({ label: '§ 312j BGB — Button-Lösung' }))).toEqual({ before: '§ 312j BGB — ', quote: 'Button-Lösung', after: '' });
    expect(quotedParts(resolveSource({ label: 'Gesetze im Internet — § 312j BGB (Button-Lösung)' }))).toEqual({
      before: 'Gesetze im Internet — § 312j BGB (',
      quote: 'Button-Lösung',
      after: ')',
    });
    expect(quotedParts(resolveSource({ label: '消費者庁 — 特定商取引法ガイド（通信販売）' }))?.before).toBe('');
    // A translated title; a source that names its language; a title that is not a key of the table.
    expect(resolveSource({ label: 'Laws of UX — Loi de Fitts' }).lang).toBeUndefined();
    expect(resolveSource({ label: 'Nielsen Norman Group — Response Times: The 3 Important Limits', lang: 'en-US' }).lang).toBe('en-US');
    expect(resolveSource({ label: 'Nielsen Norman Group — constructor' }).lang).toBeUndefined();
  });

  it('declares only titles that a source of the content quotes without naming their language', () => {
    const quoted = new Set(ALL_SOURCES.map(written).filter((r) => !r.lang).map((r) => labelParts(r.label).title));
    // A title reworded in the content, or now declared on its source: its entry goes.
    expect(Object.keys(QUOTED_TITLES).filter((t) => !quoted.has(t))).toEqual([]);
  });

  it('gives every source a well-formed language, and a part in it found in its label', () => {
    const resolved = ALL_SOURCES.map(resolveSource);
    const errors: string[] = [];
    checkSources(resolved, 'sources', errors);
    expect(errors).toEqual([]);
    expect(resolved.filter((r) => r.lang && !quotedParts(r)).map((r) => r.label)).toEqual([]);
  });

  it('names the language of every title that reads as English', () => {
    const titles = ALL_SOURCES.map(resolveSource)
      .filter((r) => !r.lang)
      .map((r) => labelParts(r.label).title);
    const unnamed = [...new Set(titles)].filter((t) => /\s/.test(t) && ENGLISH.test(t) && !FRENCH.test(t));
    // Declare it on the source (`lang`, CONTENU.md), or here in QUOTED_TITLES.
    expect(unnamed).toEqual([]);
  });

  it('never changes the text shown: the parts of every label read as the label', () => {
    const changed = ALL_SOURCES.map(resolveSource)
      .filter((r) => {
        const p = quotedParts({ ...r, lang: r.lang ?? 'en' });
        return p && frenchSpacing(p.before) + frenchSpacing(p.quote) + frenchSpacing(p.after) !== frenchSpacing(r.label);
      })
      .map((r) => r.label);
    expect(changed).toEqual([]);
  });
});
