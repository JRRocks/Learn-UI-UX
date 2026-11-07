import { quotedParts, resolveSource } from '../content/sources';
import type { Source, SourceRef } from '../engine/types';
import { frenchSpacing } from '../lib/markdown';

/** The label, with the title it quotes untranslated in its own language (WCAG 3.1.2). */
function Label({ source }: { source: SourceRef }) {
  const parts = quotedParts(source);
  if (!parts) return <>{frenchSpacing(source.label)}</>;
  return (
    <>
      {frenchSpacing(parts.before)}
      <span lang={source.lang}>{frenchSpacing(parts.quote)}</span>
      {frenchSpacing(parts.after)}
    </>
  );
}

/** A source: a link to it when it has an address. */
export function SourceLink({ source }: { source: Source }) {
  const ref = resolveSource(source);
  return ref.url ? (
    <a href={ref.url} target="_blank" rel="noopener noreferrer">
      <Label source={ref} />
    </a>
  ) : (
    <Label source={ref} />
  );
}

/** The sources of a lesson, an exercise or a market, one per line. */
export function SourceList({ sources, label }: { sources: readonly Source[]; label?: string }) {
  return (
    <ul className="sources" aria-label={label}>
      {sources.map((s, i) => (
        <li key={i}>
          <SourceLink source={s} />
        </li>
      ))}
    </ul>
  );
}
