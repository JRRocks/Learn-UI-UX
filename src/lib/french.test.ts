import { describe, expect, it } from 'vitest';
import { count, longDay, plural, shortDay } from './french';

describe('French plurals', () => {
  it('keeps 0 and 1 singular', () => {
    expect(count(0, 'jour', 'jours')).toBe('0 jour');
    expect(count(1, 'épreuve suivie', 'épreuves suivies')).toBe('1 épreuve suivie');
    expect(count(2, 'seconde restante', 'secondes restantes')).toBe('2 secondes restantes');
    expect(plural(1.5, 'jour', 'jours')).toBe('jour');
  });
});

describe('calendar days', () => {
  it('formats a day key in French without shifting it to UTC', () => {
    expect(longDay('2026-10-27')).toBe('27\u00A0octobre 2026');
    expect(longDay('2026-01-01')).toBe('1er\u00A0janvier 2026');
    expect(shortDay('2026-11-01')).toBe('1er nov.');
    expect(longDay('2026-11-11')).toBe('11\u00A0novembre 2026');
    expect(shortDay('2026-10-27')).toBe('27 oct.');
  });
});
