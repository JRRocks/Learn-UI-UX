/** Small helpers for interface text in French: plurals, calendar days and separators. */

/** Between two facts on a line (« 12 min de lecture · 16 épreuves »): a wrapped line never starts with the dot. */
export const SEP = '\u00A0· ';

/**
 * The variants of a format value, « a · b » as the market profiles write them (with a no-break space
 * before the dot or not): « 1,284,500원 · ₩1,284,500 » → « 1,284,500원 », « ₩1,284,500 ».
 */
export function formatVariants(value: string): string[] {
  return value.split(/[ \u00A0]·[ \u00A0]/);
}

const rules = new Intl.PluralRules('fr-FR');

/** The singular for 0 and 1, the plural from 2 (French rules, not English ones). */
export function plural(n: number, one: string, other: string): string {
  return rules.select(n) === 'one' ? one : other;
}

/** « 0 épreuve », « 1 épreuve », « 12 épreuves ». The number never ends a line alone. */
export function count(n: number, one: string, other: string): string {
  return `${n} ${plural(n, one, other)}`;
}

function dayDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  // Built from its parts: `new Date('2026-10-27')` is read as UTC and can show the day before.
  return new Date(y, m - 1, d);
}

const LONG = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
const SHORT = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' });

/** French writes the first day of a month as an ordinal: « 1er janvier ». */
const first = (s: string) => s.replace(/^1(?=\s)/, '1er');

/** `2026-10-27` → « 27 octobre 2026 », the day kept with its month (a line never ends on « 27 »). */
export function longDay(key: string): string {
  return first(LONG.format(dayDate(key))).replace(/^(\d+(?:er)?) /, '$1\u00A0');
}

/** `2026-10-27` → « 27 oct. ». */
export function shortDay(key: string): string {
  return first(SHORT.format(dayDate(key)));
}
