import { describe, expect, it } from 'vitest';
import type { Source } from '../engine/types';
import { frenchSpacing } from '../lib/markdown';
import { ALL_MODULES } from './all';
import { CULTURES } from './cultures/profiles';
import { SOURCES, labelParts, quotedParts, resolveSource } from './sources';
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
];

describe('source languages (a11y-final-8)', () => {
  it('names the language of the shared references quoted untranslated, and only of those', () => {
    expect(resolveSource('palo-it:china').lang).toBe('en');
    expect(resolveSource('w3c:jlreq').lang).toBe('en');
    // Translated, or names of sites and products: read in French.
    expect(resolveSource('nng:heuristics').lang).toBeUndefined();
    expect(resolveSource('hig').lang).toBeUndefined();
    expect(resolveSource('web.dev:cwv').lang).toBeUndefined();
  });

  it('gives the shared references a well-formed language, and a quote found in their label', () => {
    const errors: string[] = [];
    checkSources(Object.values(SOURCES), 'SOURCES', errors);
    expect(errors).toEqual([]);
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
