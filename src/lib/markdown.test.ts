import { describe, expect, it } from 'vitest';
import { expandIcons } from '../components/Mock';
import { frenchSpacing, parseBlocks } from './markdown';

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
