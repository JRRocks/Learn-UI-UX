import type { CulturePair, CultureProfile } from '../../engine/types';
import { useLoad } from '../../lib/useLoad';

/** Market ids and names, available without loading the (heavy) profiles. */
export const CULTURE_NAMES: Record<string, string> = {
  fr: 'France',
  us: 'États-Unis',
  de: 'Allemagne',
  nordics: 'Pays nordiques',
  cn: 'Chine continentale',
  jp: 'Japon',
  kr: 'Corée du Sud',
  in: 'Inde',
  arab: 'Monde arabe (Golfe)',
  br: 'Brésil',
  ke: 'Afrique de l’Est (Kenya)',
  sea: 'Asie du Sud-Est',
};

export interface CultureData {
  profiles: CultureProfile[];
  pairs: CulturePair[];
  byId: Map<string, CultureProfile>;
}

const files = import.meta.glob<{ CULTURES?: CultureProfile[]; CULTURE_PAIRS?: CulturePair[] }>(['./profiles.ts', './pairs.ts']);

/** Profiles and side-by-side pairs live in their own chunk, fetched when the Cultures tab opens. */
export async function loadCultures(): Promise<CultureData> {
  const mods = await Promise.all(Object.values(files).map((load) => load()));
  const profiles = mods.flatMap((m) => m.CULTURES ?? []);
  const pairs = mods.flatMap((m) => m.CULTURE_PAIRS ?? []);
  return { profiles, pairs, byId: new Map(profiles.map((c) => [c.id, c])) };
}

export function useCultures(): CultureData | undefined {
  return useLoad('cultures', loadCultures);
}

export const REGIONS_ORDER = ['Europe', 'Amériques', 'Asie de l’Est', 'Asie du Sud', 'Asie du Sud-Est', 'Moyen-Orient', 'Afrique'];

export const TOPIC_LABEL: Record<string, string> = {
  densite: 'Densité et mise en page',
  couleur: 'Couleurs et symboles',
  typo: 'Écriture et typographie',
  navigation: 'Navigation et plateformes',
  formulaires: 'Formulaires et identité',
  paiement: 'Paiement',
  confiance: 'Confiance',
  ton: 'Langue et ton',
  legal: 'Cadre légal',
  formats: 'Formats',
  mobile: 'Mobile et réseau',
};

export const HOFSTEDE: { key: 'pdi' | 'idv' | 'mas' | 'uai' | 'lto' | 'ivr'; label: string; low: string; high: string; ui: string }[] = [
  {
    key: 'pdi',
    label: 'Distance hiérarchique',
    low: 'Égalitaire',
    high: 'Hiérarchique',
    ui: 'Score élevé : on valorise l’autorité, les certifications, les labels officiels et une structure d’information marquée. Score faible : ton direct, accès libre, peu de mises en scène du statut.',
  },
  {
    key: 'idv',
    label: 'Individualisme',
    low: 'Collectiviste',
    high: 'Individualiste',
    ui: 'Score élevé : personnalisation, bénéfices individuels, « ton espace ». Score faible : preuve sociale, groupe, famille, partage et achats collectifs.',
  },
  {
    key: 'mas',
    label: 'Orientation réussite',
    low: 'Qualité de vie',
    high: 'Compétition',
    ui: 'Score élevé : classements, performance, réussite affichée. Score faible : coopération, bien-être, sobriété des messages.',
  },
  {
    key: 'uai',
    label: 'Contrôle de l’incertitude',
    low: 'Tolérance',
    high: 'Évitement',
    ui: 'Selon Marcus et Gould, un score élevé appelle la simplicité : choix limités, navigation qui évite de se perdre, conséquences annoncées avant d’agir, indices redondants ; un score faible tolère la complexité, le contenu maximal et l’exploration. Paradoxe japonais (92) : la réassurance y passe aussi par une information exhaustive (anshin), d’où des pages denses.',
  },
  {
    key: 'lto',
    label: 'Orientation long terme',
    low: 'Court terme',
    high: 'Long terme',
    ui: 'Score élevé : relation durable, fidélité, contenus pour progresser. Score faible : résultats immédiats, promotions, gratification rapide.',
  },
  {
    key: 'ivr',
    label: 'Indulgence',
    low: 'Retenue',
    high: 'Indulgence',
    ui: 'Dimension ajoutée en 2010, absente du travail de Marcus et Gould : pistes seulement. Score élevé : plaisir, ton léger, ludique. Score faible : sobriété, sérieux, normes plus strictes.',
  },
];
