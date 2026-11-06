/** Small helpers for interface text in French: plurals and calendar days. */

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

/** `2026-10-27` → « 27 octobre 2026 ». */
export function longDay(key: string): string {
  return first(LONG.format(dayDate(key)));
}

/** `2026-10-27` → « 27 oct. ». */
export function shortDay(key: string): string {
  return first(SHORT.format(dayDate(key)));
}
