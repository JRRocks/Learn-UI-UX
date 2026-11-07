import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { expandIcons } from '../components/Mock';
import { ALL_MODULES } from '../content/all';
import { ANTIPATTERNS } from '../content/antipatterns';
import { LAB_LOCALES } from '../content/cultures/lab';
import { CULTURE_PAIRS } from '../content/cultures/pairs';
import { CULTURES } from '../content/cultures/profiles';
import { CHEATSHEET, COMMANDS, GLOSSARY, HEURISTICS, PERSONAS, SEVERITY } from '../content/resources';
import { Md, frenchSpacing, openQuotes, parseBlocks } from './markdown';

/** Text as rendered by Md, without its code spans. */
function renderedText(md: string): string {
  return renderToStaticMarkup(createElement(Md, { text: md }))
    .replace(/<code[^>]*>[\s\S]*?<\/code>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&');
}

/** Every string of the content that is shown as text (mock markup and its alternative excluded). */
function texts(v: unknown, where: string, out: [string, string][] = []): [string, string][] {
  if (typeof v === 'string') out.push([where, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => texts(x, `${where}[${i}]`, out));
  else if (v && typeof v === 'object')
    for (const [k, x] of Object.entries(v)) if (!['html', 'css', 'alt', 'url', 'id'].includes(k)) texts(x, `${where}.${k}`, out);
  return out;
}

describe('markdown subset', () => {
  it('splits paragraphs, lists, headings and quotes', () => {
    const blocks = parseBlocks('Intro\nsuite.\n\n- un\n- deux\n\n### Titre\n1. a\n2. b\n> cité');
    expect(blocks).toEqual([
      { kind: 'p', text: 'Intro suite.' },
      { kind: 'ul', items: ['un', 'deux'] },
      { kind: 'h', text: 'Titre' },
      { kind: 'ol', items: ['a', 'b'] },
      { kind: 'quote', text: 'cité' },
    ]);
  });

  it('starts a list right after a paragraph line', () => {
    expect(parseBlocks('Deux règles :\n- une\n- deux')).toEqual([
      { kind: 'p', text: 'Deux règles :' },
      { kind: 'ul', items: ['une', 'deux'] },
    ]);
  });

  it('applies French no-break spacing', () => {
    expect(frenchSpacing('Vrai ? « oui » : «non»')).toBe('Vrai ? « oui » : « non »');
    expect(frenchSpacing('12:30 et https://exemple.fr')).toBe('12:30 et https://exemple.fr');
  });

  it('keeps numeric ranges on one line', () => {
    expect(frenchSpacing('de 36–40 et 1,2–1,5')).toBe('de 36–\u206040 et 1,2–\u20601,5');
    expect(frenchSpacing('avant – après')).toBe('avant – après');
  });

  it('keeps a comparison sign with its number', () => {
    expect(frenchSpacing('≥ 16 px, ≤ 6 rem et < 2,5 s')).toBe('≥\u00A016\u00A0px, ≤\u00A06\u00A0rem et <\u00A02,5\u00A0s');
    expect(frenchSpacing('a < b')).toBe('a < b');
  });

  it('renders italics inside bold and keeps literal asterisks', () => {
    const html = renderToStaticMarkup(createElement(Md, { text: '**Un sur-titre (*kicker*, *eyebrow*) au-dessus d’un titre.** Et **La pastille *eyebrow* du héros** : non.' }));
    expect(html).toContain('<strong>Un sur-titre (<em>kicker</em>, <em>eyebrow</em>) au-dessus d’un titre.</strong>');
    expect(html).toContain('<strong>La pastille <em>eyebrow</em> du héros</strong>');
    expect(renderedText('- le numéro masqué (139****5678) ;\n- surtout, le **numéro ICP**')).toContain('139****5678');
  });

  it('starts headings at the requested level', () => {
    expect(renderToStaticMarkup(createElement(Md, { text: '### Comment adapter', headingLevel: 2 }))).toContain('<h2>Comment adapter</h2>');
  });

  it('keeps a separator dot with what it follows: a wrapped line never starts with « · »', () => {
    expect(frenchSpacing('Doser l’intensité · Comparaison visuelle')).toBe('Doser l’intensité\u00A0· Comparaison visuelle');
    expect(frenchSpacing('Score ·')).toBe('Score\u00A0·');
    expect(frenchSpacing('déjà\u00A0· collé, et 1·2')).toBe('déjà\u00A0· collé, et 1·2');
  });

  it('keeps numbers attached to their unit', () => {
    expect(frenchSpacing('1 280 px, 44 × 44 pt, 18 h 30, 50 % et 75 caractères')).toBe(
      '1\u00A0280\u00A0px, 44\u00A0×\u00A044\u00A0pt, 18\u00A0h\u00A030, 50\u00A0% et 75\u00A0caractères',
    );
    // Not a unit: a word that merely starts like one.
    expect(frenchSpacing('3 points, 2 semaines, 4 heures')).toBe('3 points, 2 semaines, 4 heures');
  });

  it('sets each opening guillemet apart, so that the word it leads to can split at a syllable', () => {
    const html = renderToStaticMarkup(createElement(Md, { text: 'Ajouter une rubrique « Notifications » à l’écran' }));
    expect(html).toContain('<span>«\u202F</span>Notifications\u202F»');
    // The text itself is unchanged.
    expect(renderedText('« un » et « deux »')).toBe('«\u202Fun\u202F» et «\u202Fdeux\u202F»');
    expect(openQuotes('sans guillemet')).toEqual(['sans guillemet']);
    // Before a number, or a phrase in another language (an element of its own already), nothing to split.
    expect(openQuotes('«\u202F12\u202F»')).toEqual(['«\u202F12\u202F»']);
    expect(openQuotes('(«\u202F')).toEqual(['(«\u202F']);
  });
});

describe('content Markdown', () => {
  it('leaves no stray asterisk or backtick in the rendered text', () => {
    const all = [
      ...texts(ALL_MODULES, 'modules'),
      ...texts(CULTURES, 'cultures'),
      ...texts(CULTURE_PAIRS, 'pairs'),
      ...texts(ANTIPATTERNS, 'catalog'),
      ...texts(LAB_LOCALES.map((l) => l.notes), 'lab'),
      ...texts({ CHEATSHEET, COMMANDS, GLOSSARY, HEURISTICS, PERSONAS, SEVERITY }, 'resources'),
    ];
    const stray = all
      .filter(([, t]) => /[*`]/.test(t))
      // Wanted literals: a masked number (139****5678) and USSD codes (*334#).
      .map(([where, t]) => [where, renderedText(t).replace(/\d\*+\d|\*[\d*]+#/g, '')] as const)
      .filter(([, t]) => /[*`]/.test(t))
      .map(([where, t]) => `${where}: ${t.slice(0, 120)}`);
    expect(stray).toEqual([]);
  });
});

describe('mock icons', () => {
  it('expands known icons and keeps classes', () => {
    const out = expandIcons('<i data-icon="search" class="big"></i>');
    expect(out).toContain('<svg class="mk-ico big"');
    expect(out).toContain('aria-hidden="true"');
  });

  it('leaves unknown icons untouched', () => {
    expect(expandIcons('<i data-icon="nope"></i>')).toBe('<i data-icon="nope"></i>');
  });
});
