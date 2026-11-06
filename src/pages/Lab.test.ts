import { describe, expect, it } from 'vitest';
import { LAB_LOCALES } from '../content/cultures/lab';
import { labelSeparator } from './Lab';

describe('localisation lab', () => {
  it('writes « label: value » the way each language does', () => {
    expect(labelSeparator('fr')).toBe('\u00A0: ');
    expect(labelSeparator('en')).toBe(': ');
    expect(labelSeparator('de')).toBe(': ');
    expect(labelSeparator('ko')).toBe(': ');
    expect(labelSeparator('ar')).toBe(': ');
    expect(labelSeparator('zh-CN')).toBe('：');
    expect(labelSeparator('ja')).toBe('：');
  });

  it('puts a space before the colon in French only', () => {
    const spaced = LAB_LOCALES.filter((l) => /\s:/.test(labelSeparator(l.lang))).map((l) => l.locale);
    expect(spaced).toEqual(['fr-FR']);
  });
});
