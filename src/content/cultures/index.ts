import type { CulturePair, CultureProfile } from '../../engine/types';

const files = import.meta.glob<{ CULTURES?: CultureProfile[]; CULTURE_PAIRS?: CulturePair[] }>(['./profiles.ts', './pairs.ts'], {
  eager: true,
});

export const CULTURES: CultureProfile[] = Object.values(files).flatMap((f) => f.CULTURES ?? []);
export const CULTURE_PAIRS: CulturePair[] = Object.values(files).flatMap((f) => f.CULTURE_PAIRS ?? []);
export const CULTURE_BY_ID = new Map(CULTURES.map((c) => [c.id, c]));

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
    ui: 'Score élevé : information complète, navigation prévisible, aide, garanties et réassurance visibles. Score faible : exploration, nouveauté, interfaces plus épurées.',
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
    ui: 'Score élevé : plaisir, ton léger, ludique. Score faible : sobriété, sérieux, normes plus strictes.',
  },
];
