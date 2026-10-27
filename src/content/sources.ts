import type { Source, SourceRef } from '../engine/types';

const IMP = 'https://github.com/pbakaus/impeccable/blob/main/skill/reference/';

const imp = (file: string, label?: string): SourceRef => ({
  label: `impeccable — ${label ?? file}`,
  url: `${IMP}${file}`,
});

/** Named references used across content (`sources: ['imp:typeset', 'nng:heuristics']`). */
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
  },
  'hig': { label: 'Apple — Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/' },
  'material3': { label: 'Material Design 3', url: 'https://m3.material.io/' },
  'butterick': { label: 'Matthew Butterick — Practical Typography', url: 'https://practicaltypography.com/' },
  'hofstede': {
    label: 'The Culture Factor (Hofstede) — Country comparison',
    url: 'https://www.theculturefactor.com/country-comparison-tool',
  },
  'marcus2000': {
    label: 'Marcus & Gould (2000) — Crosscurrents: Cultural Dimensions and Global Web UI Design',
    url: 'https://dl.acm.org/doi/10.1145/345190.345238',
  },
  'hall': { label: 'Edward T. Hall — Beyond Culture (1976), contexte fort / faible' },
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
  },
  'hitabis:japan': {
    label: 'Hitabis — Safety over aesthetics: why Japanese websites are so cluttered',
    url: 'https://www.hitabis.de/en-us/safety-over-aesthetics-why-japanese-websites-are-so-cluttered/',
  },
  'mdn:intl': {
    label: 'MDN — Intl (formats de dates, nombres, pluriels)',
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl',
  },
  'mdn:logical': {
    label: 'MDN — Propriétés logiques CSS',
    url: 'https://developer.mozilla.org/fr/docs/Web/CSS/CSS_logical_properties_and_values',
  },
  'w3c:i18n': { label: 'W3C — Internationalization (i18n) Activity', url: 'https://www.w3.org/International/' },
  'w3c:clreq': { label: 'W3C — Requirements for Chinese Text Layout', url: 'https://www.w3.org/TR/clreq/' },
  'w3c:jlreq': { label: 'W3C — Requirements for Japanese Text Layout', url: 'https://www.w3.org/TR/jlreq/' },
  'w3c:alreq': { label: 'W3C — Arabic & Persian Layout Requirements', url: 'https://www.w3.org/TR/alreq/' },
  'refactoring-ui': { label: 'Refactoring UI — Adam Wathan & Steve Schoger', url: 'https://www.refactoringui.com/' },
};

export function resolveSource(s: Source): SourceRef {
  if (typeof s !== 'string') return s;
  return SOURCES[s] ?? { label: s };
}
