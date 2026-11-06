import { describe, expect, it } from 'vitest';
import { pageTitle, parseRoute } from './router';

describe('hash routes', () => {
  it('splits the path and the query', () => {
    const r = parseRoute('#/cultures/comparer?a=fr&b=cn');
    expect(r.path).toEqual(['cultures', 'comparer']);
    expect(r.query.get('b')).toBe('cn');
    expect(parseRoute('').raw).toBe('/');
  });

  it('survives a malformed escape instead of throwing', () => {
    expect(() => parseRoute('#/apprendre/typo%')).not.toThrow();
    expect(parseRoute('#/apprendre/typo%').path).toEqual(['apprendre', 'typo%']);
    expect(parseRoute('#/apprendre/%E9t%C3%A9').path).toEqual(['apprendre', '%E9t%C3%A9']);
    expect(parseRoute('#/cultures/%C3%A9t%C3%A9').path).toEqual(['cultures', 'été']);
  });

  it('names the view first in the document title', () => {
    expect(pageTitle('Page introuvable')).toBe('Page introuvable — Épreuves');
    expect(pageTitle('France', 'Cultures')).toBe('France — Cultures — Épreuves');
  });
});
