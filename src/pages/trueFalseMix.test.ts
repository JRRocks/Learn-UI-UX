import { describe, expect, it } from 'vitest';
import { seeded } from '../engine/random';
import { alternateTrueFalse, evenTrueFalse } from './trueFalseMix';

const statements = (yes: number, no: number) => [
  ...Array.from({ length: yes }, (_, i) => ({ id: `v${i}`, answer: true })),
  ...Array.from({ length: no }, (_, i) => ({ id: `f${i}`, answer: false })),
];

describe('« Vrai ou faux » session (tf-balance-1)', () => {
  // The content as audited: 7 true statements out of 57.
  const all = statements(7, 50);
  const yes = all.filter((s) => s.answer);
  const no = all.filter((s) => !s.answer);

  it('holds 4 to 6 true statements out of 10: answering « faux » to everything never passes', () => {
    const seen = new Set<number>();
    for (let seed = 1; seed <= 300; seed++) {
      const run = evenTrueFalse(yes, no, 10, seeded(seed));
      expect(run).toHaveLength(10);
      expect(new Set(run.map((s) => s.id)).size).toBe(10);
      const t = run.filter((s) => s.answer).length;
      expect(t).toBeGreaterThanOrEqual(4);
      expect(t).toBeLessThanOrEqual(6);
      seen.add(t);
    }
    // The count itself varies: it gives nothing away.
    expect([...seen].sort()).toEqual([4, 5, 6]);
  });

  it('takes each side in the order the engine ranked it (due first)', () => {
    const run = evenTrueFalse(yes, no, 10, seeded(3));
    const t = run.filter((s) => s.answer).length;
    expect(new Set(run.filter((s) => s.answer).map((s) => s.id))).toEqual(new Set(yes.slice(0, t).map((s) => s.id)));
    expect(new Set(run.filter((s) => !s.answer).map((s) => s.id))).toEqual(new Set(no.slice(0, 10 - t).map((s) => s.id)));
  });

  it('fills up with the other answer when one side runs short', () => {
    const run = evenTrueFalse(statements(2, 0), statements(0, 30), 10, seeded(5));
    expect(run.filter((s) => s.answer)).toHaveLength(2);
    expect(run).toHaveLength(10);
    expect(evenTrueFalse(statements(1, 0), statements(0, 2), 10, seeded(5))).toHaveLength(3);
  });
});

describe('timed challenge order', () => {
  it('draws « vrai » about as often as « faux » while both remain, and keeps every statement once', () => {
    const all = statements(7, 50);
    let early = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const run = alternateTrueFalse(all, seeded(seed));
      expect(run).toHaveLength(57);
      expect(new Set(run.map((s) => s.id)).size).toBe(57);
      early += run.slice(0, 10).filter((s) => s.answer).length;
    }
    // Over the first ten statements (a typical challenge), close to half are true, not 7/57.
    expect(early / 200).toBeGreaterThan(4);
    expect(early / 200).toBeLessThan(6);
  });
});
