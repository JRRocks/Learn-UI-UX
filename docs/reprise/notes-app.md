# App-level items reported by content fixers (to include in the app-fix phase)
- players.tsx: hotspot zone labels (h.label) rendered without frenchSpacing/MdInline; « Ta sélection : » uses a plain space before the colon (should be U+00A0 via frenchSpacing).
- Preview.tsx: grid criteria c.why rendered as raw text (no MdInline/frenchSpacing); 3-column table overflows on mobile (preview only).
- Mock animations: no generic « Rejouer » control (only SliderPlayer has one); tactile replay depends on hover emulation. Related a11y finding a11y-animations-maquettes (2.2.2).
- Schibsted Grotesk may lack U+202F glyph (fallback font for NNBSP) — cosmetic, verify.
- Mock width at 320px viewport in preview ~190px (heuristics booking « Continuer » clipped). Check real player width at 320px.
- Cultures.tsx: format cells force lang={c.locale}; a value in another language (ke « Heure swahilie » is Swahili in an en-KE cell) needs an optional `lang` on the format item (types.ts CultureProfile.formats[] + Cultures.tsx). Compare page shows formats in <code dir="auto"> without lang → add lang={c.locale}.
- Lesson page (desktop): « À éviter / Préférer » example pairs render ≈230 px wide each (two columns inside the article measure next to the TOC), below the 320 px the authoring guide assumes; mocks get cramped/clipped. Let .example-pair break out of the text measure (full article width) and stack when its container is < ~640 px (container query).
- check:mocks counts a text split by inline spans several times (cosmetic).
