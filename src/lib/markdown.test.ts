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

  it('keeps numeric ranges on one line', () => {
    expect(frenchSpacing('de 36–40 et 1,2–1,5')).toBe('de 36–\u206040 et 1,2–\u20601,5');
    expect(frenchSpacing('avant – après')).toBe('avant – après');
  });

  it('keeps numbers attached to their unit', () => {
    expect(frenchSpacing('1 280 px, 44 × 44 pt, 18 h 30, 50 % et 75 caractères')).toBe(
      '1\u00A0280\u00A0px, 44\u00A0×\u00A044\u00A0pt, 18\u00A0h\u00A030, 50\u00A0% et 75\u00A0caractères',
    );
    // Not a unit: a word that merely starts like one.
    expect(frenchSpacing('3 points, 2 semaines, 4 heures')).toBe('3 points, 2 semaines, 4 heures');
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
