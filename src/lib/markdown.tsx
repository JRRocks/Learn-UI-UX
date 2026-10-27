import { Fragment, type ReactNode } from 'react';

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
    .replace(/(\d) (?=(?:px|pt|dp|sp|ms|s|min|h|ch|em|rem|%|€|Mo|Ko|Go|fps|°|caractères?|mots?|jours?|secondes?|minutes?)(?![\p{L}\d]))/gu, '$1\u00A0');
}

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function inline(text: string, keyPrefix = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(INLINE)) {
    const tok = m[0];
    const at = m.index ?? 0;
    if (at > last) out.push(frenchSpacing(text.slice(last, at)));
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
  if (last < text.length) out.push(frenchSpacing(text.slice(last)));
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

export function Md({ text, className }: { text: string; className?: string }) {
  const blocks = parseBlocks(text);
  return (
    <div className={['md', className].filter(Boolean).join(' ')}>
      {blocks.map((b, i) => {
        const k = `b${i}`;
        switch (b.kind) {
          case 'p':
            return <p key={k}>{inline(b.text, k)}</p>;
          case 'h':
            return <h3 key={k}>{inline(b.text, k)}</h3>;
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
