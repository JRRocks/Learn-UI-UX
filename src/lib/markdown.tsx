import { Fragment, type ReactNode } from 'react';
import { QUOTED_PHRASES, RTL_LANGS } from '../content/quotedPhrases';

/**
 * Minimal, safe Markdown subset used by all content (no raw HTML):
 * paragraphs, `### ` headings, `- ` and `1. ` lists, `> ` quotes,
 * **bold**, *italic*, `code`, [label](url).
 */

/** French typography: no-break spaces before high punctuation and inside guillemets. */
export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([;!?])/g, '\u202F$1')
    .replace(/ :(?=\s|$)/g, '\u00A0:')
    .replace(/«[ \u00A0\u202F]?/g, '«\u202F')
    .replace(/[ \u00A0\u202F]?»/g, '\u202F»')
    // A numeric range (« 36–40 ») must not break after its dash.
    .replace(/(\d)\u2013(?=\d)/g, '$1\u2013\u2060')
    // Keep numbers whole and attached to their unit: « 1 280 px », « 44 × 44 pt », « 18 h 30 ».
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00A0')
    .replace(/(\d) × (?=\d)/g, '$1\u00A0×\u00A0')
    .replace(/(\d) h (?=\d)/g, '$1\u00A0h\u00A0')
    // A comparison stays with its number: « ≥ 16 px », « < 2,5 s ».
    .replace(/([≤≥≈<>±]) (?=\d)/g, '$1\u00A0')
    // A separator dot stays with what it follows: a wrapped line never starts with « · ».
    .replace(/ ·(?=\s|$)/g, '\u00A0·')
    .replace(/(\d) (?=(?:px|pt|dp|sp|ms|s|min|h|ch|em|rem|%|€|Mo|Ko|Go|fps|°|caractères?|mots?|jours?|secondes?|minutes?)(?![\p{L}\d]))/gu, '$1\u00A0');
}

/** The phrases quoted in another language, as they read once spaced, and the language of each. */
const PHRASES = new Map(Object.entries(QUOTED_PHRASES).map(([text, lang]) => [frenchSpacing(text), lang]));
/** All of them, the longest first: a phrase wins over a shorter one inside it. */
const PHRASE = new RegExp(
  [...PHRASES.keys()]
    .sort((a, b) => b.length - a.length)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'gu',
);
/** A character that may start one: most texts have none, and skip the search. */
const MAY_QUOTE = /[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Hangul}\p{sc=Arabic}\u3000-\u303f\u30fc\uff00-\uffef]/u;

/** A text cut around the phrases it quotes in another language (src/content/quotedPhrases.ts). */
export function languageRuns(text: string): { text: string; lang?: string }[] {
  if (!MAY_QUOTE.test(text)) return [{ text }];
  const runs: { text: string; lang?: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(PHRASE)) {
    const at = m.index ?? 0;
    if (at > last) runs.push({ text: text.slice(last, at) });
    runs.push({ text: m[0], lang: PHRASES.get(m[0]) });
    last = at + m[0].length;
  }
  if (last < text.length) runs.push({ text: text.slice(last) });
  return runs;
}

const OPEN_QUOTE = '«\u202F';

/**
 * Each opening guillemet that leads to a word, with its no-break space, in an element of its own. Chrome
 * takes them for the start of that word, and never splits such a word at a syllable: in a narrow box, it
 * broke anywhere instead (« Notificati|ons »). Apart, the word splits with a hyphen (« Notifi-cations »);
 * the no-break space still keeps the guillemet on its line.
 */
export function openQuotes(text: string, keyPrefix = 'q'): ReactNode[] {
  const parts = text.split(/«\u202F(?=\p{L})/u);
  if (parts.length === 1) return [text];
  const out: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i) out.push(<span key={`${keyPrefix}-${i}`}>{OPEN_QUOTE}</span>);
    if (part) out.push(part);
  });
  return out;
}

/**
 * Plain text, without Markdown: French spacing, and each phrase quoted in another language read in that
 * language (WCAG 3.1.2), set apart from the French when it reads right to left.
 */
export function plainText(text: string, keyPrefix = 't'): ReactNode[] {
  return languageRuns(frenchSpacing(text)).flatMap((r, i) =>
    r.lang ? (
      <span key={`${keyPrefix}-${i}`} lang={r.lang} dir={RTL_LANGS.has(r.lang.split('-')[0]) ? 'auto' : undefined}>
        {r.text}
      </span>
    ) : (
      openQuotes(r.text, `${keyPrefix}-${i}`)
    ),
  );
}

// Bold may hold italics (**Un sur-titre (*kicker*)**); a lone run of asterisks (139****5678) stays literal.
const INLINE = /(\*\*(?:[^*]|\*[^*\s][^*]*\*)+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function inline(text: string, keyPrefix = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(INLINE)) {
    const tok = m[0];
    const at = m.index ?? 0;
    if (at > last) out.push(...plainText(text.slice(last, at), `${keyPrefix}-t${n++}`));
    const key = `${keyPrefix}-${n++}`;
    if (tok.startsWith('**')) out.push(<strong key={key}>{inline(tok.slice(2, -2), key)}</strong>);
    else if (tok.startsWith('`')) {
      // Short snippets (`--surface`, `max-width: 50ch`) never break at their hyphens.
      const code = tok.slice(1, -1);
      out.push(
        <code key={key} className={code.length <= 20 ? 'code-short' : undefined}>
          {code}
        </code>,
      );
    } else if (tok.startsWith('[')) {
      const [, label, href] = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok) ?? [];
      const external = /^https?:/.test(href);
      out.push(
        <a key={key} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {inline(label, key)}
        </a>,
      );
    } else out.push(<em key={key}>{inline(tok.slice(1, -1), key)}</em>);
    last = at + tok.length;
  }
  if (last < text.length) out.push(...plainText(text.slice(last), `${keyPrefix}-t${n}`));
  return out;
}

type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'ul' | 'ol'; items: string[] }
  | { kind: 'quote'; text: string };

export function parseBlocks(src: string): Block[] {
  const blocks: Block[] = [];
  const lines = src.replace(/\r/g, '').split('\n');
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ kind: 'p', text: para.join(' ') });
    para = [];
  };
  const last = () => blocks[blocks.length - 1];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    let m: RegExpExecArray | null;
    if ((m = /^#{2,4}\s+(.*)$/.exec(line))) {
      flush();
      blocks.push({ kind: 'h', text: m[1] });
    } else if ((m = /^[-*]\s+(.*)$/.exec(line))) {
      flush();
      const prev = last();
      if (prev?.kind === 'ul') prev.items.push(m[1]);
      else blocks.push({ kind: 'ul', items: [m[1]] });
    } else if ((m = /^\d+[.)]\s+(.*)$/.exec(line))) {
      flush();
      const prev = last();
      if (prev?.kind === 'ol') prev.items.push(m[1]);
      else blocks.push({ kind: 'ol', items: [m[1]] });
    } else if ((m = /^>\s?(.*)$/.exec(line))) {
      flush();
      const prev = last();
      if (prev?.kind === 'quote') prev.text += ` ${m[1]}`;
      else blocks.push({ kind: 'quote', text: m[1] });
    } else {
      const prev = last();
      if (!para.length && (prev?.kind === 'ul' || prev?.kind === 'ol') && /^\s{2,}/.test(raw)) {
        // Indented continuation of a list item.
        prev.items[prev.items.length - 1] += ` ${line}`;
      } else {
        para.push(line);
      }
    }
  }
  flush();
  return blocks;
}

/** `headingLevel` is the level of `### ` headings: one below the heading the text sits under. */
export function Md({ text, className, headingLevel = 3 }: { text: string; className?: string; headingLevel?: 2 | 3 | 4 }) {
  const blocks = parseBlocks(text);
  const H = `h${headingLevel}` as const;
  return (
    <div className={['md', className].filter(Boolean).join(' ')}>
      {blocks.map((b, i) => {
        const k = `b${i}`;
        switch (b.kind) {
          case 'p':
            return <p key={k}>{inline(b.text, k)}</p>;
          case 'h':
            return <H key={k}>{inline(b.text, k)}</H>;
          case 'quote':
            return <blockquote key={k}>{inline(b.text, k)}</blockquote>;
          case 'ul':
          case 'ol': {
            const List = b.kind;
            return (
              <List key={k}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${k}-${j}`)}</li>
                ))}
              </List>
            );
          }
        }
      })}
    </div>
  );
}

/** Inline-only rendering (for short labels that may contain `code` or **bold**). */
export function MdInline({ text }: { text: string }) {
  return <Fragment>{inline(text)}</Fragment>;
}
