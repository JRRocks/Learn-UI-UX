import type { Source, SourceRef } from '../engine/types';

const IMP = 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/';

const imp = (file: string, label?: string): SourceRef => ({
  label: `impeccable — ${label ?? file}`,
  url: `${IMP}${file}`,
});

/**
 * Named references used across content (`sources: ['imp:typeset', 'nng:heuristics']`). A title quoted
 * untranslated names its language (`lang`); names of people, sites and products need none.
 */
export const SOURCES: Record<string, SourceRef> = {
  // impeccable (Paul Bakaus, Apache-2.0) — https://github.com/pbakaus/impeccable
  'imp:skill': { label: 'impeccable — SKILL (modes, principes)', url: 'https://github.com/pbakaus/impeccable/blob/main/skill/SKILL.src.md' },
  'imp:craft-floor': imp('craft-floor.md'),
  'imp:typeset': imp('typeset.md'),
  'imp:colorize': imp('colorize.md'),
  'imp:layout': imp('layout.md'),
  'imp:animate': imp('animate.md'),
  'imp:delight': imp('delight.md'),
  'imp:overdrive': imp('overdrive.md'),
  'imp:polish': imp('polish.md'),
  'imp:distill': imp('distill.md'),
  'imp:bolder': imp('bolder.md'),
  'imp:quieter': imp('quieter.md'),
  'imp:harden': imp('harden.md'),
  'imp:onboard': imp('onboard.md'),
  'imp:clarify': imp('clarify.md'),
  'imp:adapt': imp('adapt.md'),
  'imp:ios': imp('ios.md'),
  'imp:android': imp('android.md'),
  'imp:optimize': imp('optimize.md'),
  'imp:critique': imp('critique.md', 'critique.md (heuristiques, charge cognitive, personas)'),
  'imp:audit': imp('audit.md'),
  'imp:operate': imp('operate.md'),
  'imp:mode-operate': imp('mode-operate.md'),
  'imp:mode-persuade': imp('mode-persuade.md'),
  'imp:mode-read': imp('mode-read.md'),
  'imp:shape': imp('shape.md'),
  'imp:new-work': imp('new-work.md'),
  'imp:document': imp('document.md'),
  'imp:extract': imp('extract.md'),
  'imp:detector': {
    label: 'impeccable — 62 règles du détecteur d’anti-patterns',
    url: 'https://github.com/pbakaus/impeccable/blob/main/crates/foundation/src/registry.rs',
  },
  'imp:site': { label: 'impeccable.style', url: 'https://impeccable.style' },

  // Références web
  'nng:heuristics': {
    label: 'Nielsen Norman Group — 10 heuristiques d’utilisabilité',
    url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
  },
  'nng:severity': {
    label: 'Nielsen Norman Group — Échelles de sévérité',
    url: 'https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/',
  },
  'wcag22': { label: 'W3C — WCAG 2.2', url: 'https://www.w3.org/TR/WCAG22/' },
  'wcag:contrast': {
    label: 'W3C — Comprendre le critère 1.4.3 (contraste minimum)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
  },
  'wcag:target': {
    label: 'W3C — Comprendre le critère 2.5.8 (taille des cibles)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
  },
  'lawsofux': { label: 'Laws of UX — Jon Yablonski', url: 'https://lawsofux.com/' },
  'deceptive': { label: 'Deceptive Patterns — Harry Brignull', url: 'https://www.deceptive.design/' },
  'web.dev:cwv': { label: 'web.dev — Core Web Vitals', url: 'https://web.dev/articles/vitals' },
  'material:bidi': {
    label: 'Material Design — Bidirectionnalité (RTL)',
    url: 'https://m2.material.io/design/usability/bidirectionality.html',
  },
  'mozilla:rtl': {
    label: 'Mozilla — RTL Guidelines',
    url: 'https://firefox-source-docs.mozilla.org/code-quality/coding-style/rtl_guidelines.html',
    lang: 'en',
  },
  'hig': { label: 'Apple — Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/' },
  'material3': { label: 'Material Design 3', url: 'https://m3.material.io/' },
  'butterick': { label: 'Matthew Butterick — Practical Typography', url: 'https://practicaltypography.com/', lang: 'en' },
  'hofstede': {
    label: 'The Culture Factor (Hofstede) — Country comparison',
    url: 'https://www.theculturefactor.com/country-comparison-tool',
    lang: 'en',
  },
  'marcus2000': {
    label: 'Marcus & Gould (2000) — Crosscurrents: Cultural Dimensions and Global Web UI Design',
    url: 'https://dl.acm.org/doi/10.1145/345190.345238',
    lang: 'en',
  },
  'hall': { label: 'Edward T. Hall — Beyond Culture (1976), contexte fort / faible', lang: 'en', quote: 'Beyond Culture' },
  'cnil:cookies': {
    label: 'CNIL — Refuser les cookies doit être aussi simple qu’accepter',
    url: 'https://www.cnil.fr/fr/refuser-les-cookies-doit-etre-aussi-simple-quaccepter-mise-en-conformite-de-tous-les-organismes',
  },
  'cnil:banners': {
    label: 'CNIL — Bannières cookies trompeuses : mise en demeure (décembre 2024)',
    url: 'https://cnil.fr/fr/bannieres-cookies-trompeuses-la-cnil-met-en-demeure-des-editeurs-de-sites-web',
  },
  'palo-it:china': {
    label: 'PALO IT — The UX design of Chinese and Western apps',
    url: 'https://www.palo-it.com/en/blog/the-ux-design-of-chinese-and-western-apps-why-are-they-so-different',
    lang: 'en',
  },
  'hitabis:japan': {
    label: 'Hitabis — Safety over aesthetics: why Japanese websites are so cluttered',
    url: 'https://www.hitabis.de/en-us/safety-over-aesthetics-why-japanese-websites-are-so-cluttered/',
    lang: 'en',
  },
  'mdn:intl': {
    label: 'MDN — Intl (formats de dates, nombres, pluriels)',
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl',
  },
  'mdn:logical': {
    label: 'MDN — Propriétés logiques CSS',
    url: 'https://developer.mozilla.org/fr/docs/Web/CSS/CSS_logical_properties_and_values',
  },
  'w3c:i18n': { label: 'W3C — Internationalization (i18n) Activity', url: 'https://www.w3.org/International/', lang: 'en' },
  'w3c:clreq': { label: 'W3C — Requirements for Chinese Text Layout', url: 'https://www.w3.org/TR/clreq/', lang: 'en' },
  'w3c:jlreq': { label: 'W3C — Requirements for Japanese Text Layout', url: 'https://www.w3.org/TR/jlreq/', lang: 'en' },
  'w3c:alreq': { label: 'W3C — Arabic & Persian Layout Requirements', url: 'https://www.w3.org/TR/alreq/', lang: 'en' },
  'refactoring-ui': { label: 'Refactoring UI — Adam Wathan & Steve Schoger', url: 'https://www.refactoringui.com/' },
};

/**
 * Titles that the sources written in the content (`{ label, url }` in a lesson, an exercise or a market)
 * quote untranslated, with their language, for the sources that do not name their `lang`: keyed by the
 * title as `labelParts` reads it, with `quote` when the part in that language is not just the title. A
 * title quoted by several sources is declared once. An entry that no source needs any more (its title
 * changed, or its source names its language) fails sources.test.ts.
 */
export const QUOTED_TITLES: Record<string, string | { lang: string; quote: string }> = {
  // English
  'Glassmorphism: Definition and Best Practices': 'en',
  'Modal & Nonmodal Dialogs': 'en',
  'The magical number 4 in short-term memory': 'en',
  'Short-Term Memory and Web Usability': 'en',
  'Response Times: The 3 Important Limits': 'en',
  'Flat vs. Deep Website Hierarchies': 'en',
  'Apparent usability vs. inherent usability': 'en',
  'The Endowed Progress Effect': 'en',
  'When product assortment leads to choice overload': 'en',
  'Guidelines for Visualizing Links': 'en',
  'Jakob’s Law of Internet User Experience': 'en',
  'The influence of design aesthetics in usability testing': 'en',
  'Memory Recognition and Recall in User Interfaces': 'en',
  'Working Memory and External Memory': 'en',
  'Amazon S3 storage classes': 'en',
  'Structuring forms': 'en',
  'Checkout Optimization: 5 Ways to Minimize Form Fields in Checkout': 'en',
  'CNIL Fines TikTok 5 Million Euros Over Cookie Infringements': 'en',
  'The Science of Word Recognition': 'en',
  'Using CSS to fix the irradiation illusion': 'en',
  'Colour blindness': 'en',
  'Dark theme': 'en',
  'Cards: UI-Component Definition': 'en',
  'Speed': 'en',
  'When More Pain Is Preferred to Less: Adding a Better End, Psychological Science': 'en',
  'Skeleton Screens 101': 'en',
  'Progress Indicators Make a Slow System Less Insufferable': 'en',
  'Designing Empty States in Complex Applications': 'en',
  'Button States: Communicate Interaction': 'en',
  'CSS Scrollbars Styling Module Level 1': 'en',
  'Button': 'en',
  'Flat UI Elements Attract Less Attention and Cause Uncertainty': 'en',
  'Progressive Disclosure': 'en',
  'Icon Usability': 'en',
  'Text size in translation': 'en',
  'Error-Message Guidelines': 'en',
  'Flexbox and Truncated Text': 'en',
  'Input Validation Cheat Sheet': 'en',
  '16px or Larger Text Prevents iOS Form Zoom': 'en',
  'Onboarding Tutorials vs. Contextual Help': 'en',
  'Mobile-App Onboarding: An Analysis of Components and Techniques': 'en',
  'Mobile Tutorials: Wasted Effort or Efficiency Boost?': 'en',
  'Empty states': 'en',
  'Placeholders in Form Fields Are Harmful': 'en',
  'Human Interface Guidelines : Alerts': 'en',
  'How Do Users Really Hold Mobile Devices?': 'en',
  'Accessibility': 'en',
  'Typography': 'en',
  'Materials': 'en',
  'Navigation bar': 'en',
  'Build adaptive navigation': 'en',
  'Navigation drawer': 'en',
  'Tab bars': 'en',
  'Button groups': 'en',
  'Floating action button': 'en',
  'Snackbar': 'en',
  'Color': 'en',
  'Type scale tokens': 'en',
  'Sheets': 'en',
  'Popovers': 'en',
  'Best practices for fonts': 'en',
  'Measure performance with the RAIL model': 'en',
  'Cumulative Layout Shift': 'en',
  'Optimize Largest Contentful Paint': 'en',
  'The performance effects of too much lazy loading': 'en',
  'Interaction to Next Paint': 'en',
  'Optimize long tasks': 'en',
  'Rendering performance': 'en',
  'Doherty Threshold': 'en',
  'How to Conduct a Heuristic Evaluation': 'en',
  'The Theory Behind Heuristic Evaluations': 'en',
  'Personas Make Users Memorable': 'en',
  'The WebAIM Million': 'en',
  'Using ARIA': 'en',
  'Localization vs. Internationalization': 'en',
  'Intercultural Communication on Web sites': 'en',
  'Whence differences in value priorities?': 'en',
  'Japanese users prefer dense, busy websites': 'en',
  'Personal names around the world': 'en',
  'CNIL fines TikTok 5 million euros': 'en',
  'Colour connotations': 'en',
  'Faux pas derived from Chinese pronunciation': 'en',
  'Cuckold, « green hat »': 'en',
  'Requirements for Hangul Text Layout and Typography': 'en',
  'Inline markup and bidirectional text in HTML': 'en',
  'UAE weekend change from January 1, 2022': 'en',
  'State and local sales tax rates': 'en',
  'United States customary units': 'en',
  'Secure start': 'en',
  'Mobile carriers make app registration easier with Pass': 'en',
  'PPRO, 2021 Payment Almanac': 'en',
  'California Consumer Privacy Act': 'en',
  'Guidance on Web Accessibility and the ADA': 'en',
  'Fact Sheet: New Rule on the Accessibility of Web Content and Mobile Apps': 'en',
  'Support for the new Saudi Riyal currency sign': 'en',
  'Saudi Arabian Culture: Naming': 'en',
  'M-Pesa now available on *334#': 'en',
  'Data Protection Act 2019': 'en',
  'Confirmation Dialogs Can Prevent User Errors': {
    lang: 'en',
    quote: 'Confirmation Dialogs Can Prevent User Errors (If Not Overused)',
  },
  'Rule of three': { lang: 'en', quote: 'Rule of three (computer programming)' },
  'Cross-Cultural User-Interface Design, cours SIGGRAPH Asia 2010': {
    lang: 'en',
    quote: 'Cross-Cultural User-Interface Design',
  },
  'Personal Information Protection Act (traduction anglaise), art. 22 et 24 : consentements distincts': {
    lang: 'en',
    quote: 'Personal Information Protection Act',
  },
  'Ministry of Consumer Affairs': {
    lang: 'en',
    quote: 'Consumer Protection (E-Commerce) Rules, 2020 — Ministry of Consumer Affairs',
  },
  // English: the names of the patterns, after « Deceptive Patterns — »
  'Confirmshaming': 'en',
  'Fake urgency': 'en',
  'Fake scarcity': 'en',
  'Trick wording': 'en',
  'Preselection': 'en',
  'Comparison prevention': 'en',
  'Sneaking': 'en',
  'Hidden costs': 'en',
  'Hard to cancel': 'en',
  'Obstruction': 'en',
  'Nagging': 'en',
  'Disguised ads': 'en',
  // German, Swedish, Japanese, Portuguese
  'Button-Lösung': 'de',
  'Impressum': 'de',
  'Statistik': 'sv',
  'Du-reformen': 'sv',
  'Om BankID': 'sv',
  '郵便番号検索': 'ja',
  '§ 312j BGB': { lang: 'de', quote: 'Button-Lösung' },
  '§ 312k BGB': { lang: 'de', quote: 'Kündigungsbutton' },
  '§ 5 DDG': { lang: 'de', quote: 'Impressum' },
  '§ 4 PAngV': { lang: 'de', quote: 'Grundpreis' },
  'Dataskyddslagen (2018:218), 3 kap. 10 §': {
    lang: 'sv',
    quote: 'Dataskyddslagen (2018:218), 3 kap. 10 § (personnummer)',
  },
  '総額表示の義務化': { lang: 'ja', quote: '政府広報オンライン — 総額表示の義務化' },
  '総額表示の義務化（2021年4月）': { lang: 'ja', quote: '政府広報オンライン — 総額表示の義務化（2021年4月）' },
  '特定商取引法ガイド（通信販売）': { lang: 'ja', quote: '消費者庁 — 特定商取引法ガイド（通信販売）' },
  'Código de Defesa do Consumidor': {
    lang: 'pt',
    quote: 'Código de Defesa do Consumidor (art. 49, direito de arrependimento)',
  },
  'Lei Geral de Proteção de Dados': { lang: 'pt', quote: 'Lei Geral de Proteção de Dados (Lei 13.709/2018)' },
};

/** A source as shown: a key of `SOURCES` resolved, with the language of the title it quotes. */
export function resolveSource(s: Source): SourceRef {
  const ref = typeof s === 'string' ? (SOURCES[s] ?? { label: s }) : s;
  if (ref.lang) return ref;
  const title = labelParts(ref.label).title;
  if (!Object.hasOwn(QUOTED_TITLES, title)) return ref;
  const quoted = QUOTED_TITLES[title];
  return typeof quoted === 'string' ? { ...ref, lang: quoted } : { ...ref, ...quoted };
}

/**
 * A label in three parts: « Publisher — », the title, and a final « (note) ». The publisher and the
 * note are in the page's French; only the title is in the source's `lang`. Without « — », the label
 * is a title.
 */
export function labelParts(label: string): { publisher: string; title: string; note: string } {
  const dash = label.indexOf(' — ');
  const publisher = dash < 0 ? '' : label.slice(0, dash + 3);
  const rest = label.slice(publisher.length);
  const note = /\s\([^()]*\)$/.exec(rest);
  if (!note || note.index === 0) return { publisher, title: rest, note: '' };
  return { publisher, title: rest.slice(0, note.index), note: rest.slice(note.index) };
}

/**
 * The label of a source cut around its part in another language: `quote` when it says which, the
 * title otherwise. Null when the whole label is in the page's French.
 */
export function quotedParts(ref: SourceRef): { before: string; quote: string; after: string } | null {
  if (!ref.lang) return null;
  if (ref.quote === undefined) {
    const { publisher, title, note } = labelParts(ref.label);
    return title ? { before: publisher, quote: title, after: note } : null;
  }
  const at = ref.quote ? ref.label.indexOf(ref.quote) : -1;
  if (at < 0) return null;
  return { before: ref.label.slice(0, at), quote: ref.quote, after: ref.label.slice(at + ref.quote.length) };
}
