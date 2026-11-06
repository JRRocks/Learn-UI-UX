import { describe, expect, it } from 'vitest';
import { digitOf, hasModifier } from './keys';

describe('keyboard shortcuts', () => {
  it('reads digits from the key position on an AZERTY keyboard (logic-8)', () => {
    // Top row without Shift on a French keyboard.
    expect(digitOf({ key: '&', code: 'Digit1' })).toBe(1);
    expect(digitOf({ key: 'é', code: 'Digit2' })).toBe(2);
    expect(digitOf({ key: '"', code: 'Digit3' })).toBe(3);
    expect(digitOf({ key: "'", code: 'Digit4' })).toBe(4);
    // With Shift, or on a QWERTY keyboard.
    expect(digitOf({ key: '2', code: 'Digit2' })).toBe(2);
  });

  it('reads the numeric keypad only with Num Lock on', () => {
    expect(digitOf({ key: '3', code: 'Numpad3' })).toBe(3);
    expect(digitOf({ key: 'PageDown', code: 'Numpad3' })).toBeNull();
  });

  it('falls back to the character, and ignores other keys', () => {
    expect(digitOf({ key: '4', code: '' })).toBe(4);
    expect(digitOf({ key: 'v', code: 'KeyV' })).toBeNull();
    expect(digitOf({ key: 'Enter', code: 'Enter' })).toBeNull();
  });

  it('leaves browser and system shortcuts alone', () => {
    expect(hasModifier({ metaKey: false, ctrlKey: true, altKey: false })).toBe(true);
    expect(hasModifier({ metaKey: false, ctrlKey: false, altKey: false })).toBe(false);
  });
});
