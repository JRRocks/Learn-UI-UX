/**
 * How true/false statements are drawn (tf-balance-1). While most statements of the content are
 * false, answering « faux » to everything passed a « Vrai ou faux » session and most of the timed
 * challenge. Drawing both answers evenly keeps the format honest whatever the content's own balance;
 * once the content is balanced, it still spares the learner a run of ten « faux » by chance.
 */
import { shuffle, type Rng } from '../engine/random';

interface Statement {
  answer: boolean;
}

/**
 * A « Vrai ou faux » session: 40 to 60 % of true statements, as far as the content allows. `yes` and
 * `no` come in the order the session engine ranks them (due first, then new ones); the run is
 * shuffled, so neither the order nor the exact count gives the answers away.
 */
export function evenTrueFalse<T extends Statement>(yes: readonly T[], no: readonly T[], size: number, rng: Rng = Math.random): T[] {
  const n = Math.min(size, yes.length + no.length);
  // 4, 5 or 6 true statements out of 10.
  const want = Math.round(n * (0.4 + 0.2 * rng()));
  const t = Math.min(yes.length, Math.max(want, n - no.length));
  return shuffle([...yes.slice(0, t), ...no.slice(0, n - t)], rng);
}

/** The timed challenge: at each turn « vrai » and « faux » are as likely, while both remain. */
export function alternateTrueFalse<T extends Statement>(items: readonly T[], rng: Rng = Math.random): T[] {
  const yes = shuffle(items.filter((e) => e.answer), rng);
  const no = shuffle(items.filter((e) => !e.answer), rng);
  const out: T[] = [];
  while (yes.length || no.length) {
    const from = yes.length && (!no.length || rng() < 0.5) ? yes : no;
    out.push(from.shift() as T);
  }
  return out;
}
