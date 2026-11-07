import { describe, expect, it } from 'vitest';
import { declaresScroll, zoneName } from './Mock';
import { scrollsSideways } from './ScrollRegion';

describe('scrolling boxes in a picture (a11y-final-5)', () => {
  it('finds the mocks that draw a scrolling box, in their CSS or their markup', () => {
    expect(declaresScroll({ css: '.ef-clip { overflow-x: auto; }', html: '<div class="ef-clip"></div>' })).toBe(true);
    expect(declaresScroll({ css: '.ef-row { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }', html: '' })).toBe(true);
    expect(declaresScroll({ html: '<ul style="max-height:80px;overflow-y:scroll"></ul>' })).toBe(true);
    expect(declaresScroll({ css: '.list { overflow: hidden auto; }', html: '' })).toBe(true);
  });

  it('leaves the others alone: their styles are never read', () => {
    expect(declaresScroll({ css: '.card { overflow: hidden; text-overflow: ellipsis; }', html: '<p>Défile</p>' })).toBe(false);
    expect(declaresScroll({ css: '.name { overflow-wrap: anywhere; overflow: clip; }', html: '' })).toBe(false);
    expect(declaresScroll({ html: '<p>Mets <code>overflow</code> à visible.</p>' })).toBe(false);
  });

  it('counts a table region as scrolling only when it really does (1/64 px of text does not)', () => {
    // Comparer at 320 px: a line of text 0.016 px too wide, both widths round to 288.
    expect(scrollsSideways({ scrollWidth: 288, clientWidth: 288 })).toBe(false);
    expect(scrollsSideways({ scrollWidth: 900, clientWidth: 358 })).toBe(true);
  });
});

describe('hotspot zone names (a11y-hotspot-noms)', () => {
  const zone = ({ name, text = '', labels = [] }: { name?: string; text?: string; labels?: string[] }) =>
    ({
      dataset: name === undefined ? {} : { hotspotName: name },
      innerText: text,
      textContent: text,
      querySelectorAll: () => labels.map((l) => ({ getAttribute: (a: string) => (a === 'aria-label' ? l : null) })),
    }) as unknown as HTMLElement;

  it('names a zone after the text it shows', () => {
    expect(zoneName(zone({ text: 'Modifier l’adresse' }), 1)).toBe('Zone 1 : Modifier l’adresse');
  });

  it('names a zone without text after its data-hotspot-name', () => {
    expect(zoneName(zone({ name: 'Croix de fermeture' }), 2)).toBe('Zone 2 : Croix de fermeture');
  });

  it('falls back to the labels of what it holds, then to its number alone', () => {
    expect(zoneName(zone({ labels: ['Panier'] }), 3)).toBe('Zone 3 : Panier');
    expect(zoneName(zone({}), 4)).toBe('Zone 4');
  });
});
