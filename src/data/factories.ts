/* ═══════════════════════════════════════════════════════════════
   SCALULAR — SHARED FACTORY & HUB DATA
   Single source of truth for all globe, map, and card components.
   ═══════════════════════════════════════════════════════════════ */

export interface Factory {
  id: string;
  isoCode: string;            // Added for flagcdn.com
  flag: string;
  name: string;
  location: [number, number]; // [latitude, longitude]
  specialty: string;          // Globe tooltip text
  specialties: string[];      // Card detail list
  certifications: string[];   // Card certification badges
  accentColor: string;        // CSS variable reference for theming
  factoryCount: number;
}

export interface BuyerHub {
  id: string;
  name: string;
  location: [number, number];
  label: string;
  accentColor: string;
}

export interface SupplyArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

/* ── Factory countries (ordered West → East) ──────────────── */
export const FACTORIES: Factory[] = [
  {
    id: 'madagascar', isoCode: 'mg', flag: '🇲🇬', name: 'Madagascar',
    location: [-18.76, 46.86],
    specialty: 'Knitwear · Duty-Free',
    specialties: ['Knitwear', 'Duty-Free', 'Apparel'],
    certifications: ['WRAP', 'Sedex'],
    accentColor: 'var(--color-primary)',
    factoryCount: 10,
  },
  {
    id: 'kenya', isoCode: 'ke', flag: '🇰🇪', name: 'Kenya',
    location: [-0.02, 37.90],
    specialty: 'Duty-Free · Volume',
    specialties: ['Duty-Free', 'Volume', 'Woven'],
    certifications: ['WRAP', 'BSCI'],
    accentColor: 'var(--color-primary-alt)',
    factoryCount: 8,
  },
  {
    id: 'ethiopia', isoCode: 'et', flag: '🇪🇹', name: 'Ethiopia',
    location: [9.14, 40.48],
    specialty: 'Sustainable · Duty-Free',
    specialties: ['Sustainable', 'Duty-Free', 'Green Energy'],
    certifications: ['WRAP', 'GOTS'],
    accentColor: 'var(--color-neutral-900)',
    factoryCount: 12,
  },
  {
    id: 'uae', isoCode: 'ae', flag: '🇦🇪', name: 'UAE',
    location: [23.42, 53.84],
    specialty: 'Trading Hub · Quality Control',
    specialties: ['Trading Hub', 'Quality Control', 'Sourcing'],
    certifications: ['ISO 9001'],
    accentColor: 'var(--color-neutral-200)',
    factoryCount: 5,
  },
  {
    id: 'india', isoCode: 'in', flag: '🇮🇳', name: 'India',
    location: [20.59, 78.96],
    specialty: 'Cotton · Knitwear · Embroidery',
    specialties: ['Cotton', 'Knitwear', 'Embroidery', 'Sustainable'],
    certifications: ['GOTS', 'OEKO-TEX', 'OCS'],
    accentColor: 'var(--color-blue-400)',
    factoryCount: 24,
  },
  {
    id: 'srilanka', isoCode: 'lk', flag: '🇱🇰', name: 'Sri Lanka',
    location: [7.87, 80.77],
    specialty: 'Lingerie · Intimate Apparel',
    specialties: ['Lingerie', 'Activewear', 'Intimate Apparel'],
    certifications: ['ISO 9001', 'OEKO-TEX'],
    accentColor: 'var(--color-blue-100)',
    factoryCount: 14,
  },
  {
    id: 'bangladesh', isoCode: 'bd', flag: '🇧🇩', name: 'Bangladesh',
    location: [23.69, 90.36],
    specialty: 'Basics · Volume · Jersey',
    specialties: ['Basics', 'Volume Production', 'Jersey', 'Woven'],
    certifications: ['BSCI', 'WRAP', 'ISO 9001'],
    accentColor: 'var(--color-neutral-700)',
    factoryCount: 42,
  },
  {
    id: 'cambodia', isoCode: 'kh', flag: '🇰🇭', name: 'Cambodia',
    location: [12.56, 104.99],
    specialty: 'Footwear · Outerwear',
    specialties: ['Footwear', 'Outerwear', 'Volume'],
    certifications: ['ILO Better Factories', 'WRAP'],
    accentColor: 'var(--color-blue-700)',
    factoryCount: 18,
  },
  {
    id: 'vietnam', isoCode: 'vn', flag: '🇻🇳', name: 'Vietnam',
    location: [14.06, 108.28],
    specialty: 'Technical · Activewear',
    specialties: ['Technical', 'Performance', 'Activewear'],
    certifications: ['Bluesign®', 'Higg Index'],
    accentColor: 'var(--color-blue-700)',
    factoryCount: 31,
  },
  {
    id: 'china', isoCode: 'cn', flag: '🇨🇳', name: 'China',
    location: [31.23, 121.47],
    specialty: 'Scale · Technology · Accessories',
    specialties: ['Scale', 'Technology', 'Accessories'],
    certifications: ['ISO 9001', 'OEKO-TEX'],
    accentColor: 'var(--color-surface-muted)',
    factoryCount: 22,
  },
];

/* ── Buyer hub cities ─────────────────────────────────────── */
export const BUYER_HUBS: BuyerHub[] = [
  { id: 'usa',       name: 'New York',  location: [40.71, -74.01],  label: 'Americas Hub', accentColor: 'var(--color-blue-400)' },
  { id: 'canada',    name: 'Toronto',   location: [43.65, -79.38],  label: 'NA Hub',       accentColor: 'var(--color-surface-muted)' },
  { id: 'uk',        name: 'London',    location: [51.51, -0.13],   label: 'Europe Hub',   accentColor: 'var(--color-blue-700)' },
  { id: 'germany',   name: 'Berlin',    location: [52.52, 13.41],   label: 'EU Hub',       accentColor: 'var(--color-primary)' },
  { id: 'uae',       name: 'Dubai',     location: [25.20, 55.27],   label: 'MENA Hub',     accentColor: 'var(--color-primary-alt)' },
  { id: 'australia', name: 'Sydney',    location: [-33.87, 151.21], label: 'APAC Hub',     accentColor: 'var(--color-neutral-700)' },
];

/* ── Supply chain arcs (factory → buyer hub) ──────────────── */
export const SUPPLY_ARCS: SupplyArc[] = [
  // India routes
  { id: 'arc-in-ny', from: [20.59, 78.96], to: [40.71, -74.01] },
  { id: 'arc-in-ld', from: [20.59, 78.96], to: [51.51, -0.13] },
  { id: 'arc-in-to', from: [20.59, 78.96], to: [43.65, -79.38] },
  // Bangladesh routes
  { id: 'arc-bd-ld', from: [23.69, 90.36], to: [51.51, -0.13] },
  { id: 'arc-bd-ny', from: [23.69, 90.36], to: [40.71, -74.01] },
  // Vietnam routes
  { id: 'arc-vn-ny', from: [14.06, 108.28], to: [40.71, -74.01] },
  { id: 'arc-vn-sy', from: [14.06, 108.28], to: [-33.87, 151.21] },
  // China routes
  { id: 'arc-cn-ny', from: [31.23, 121.47], to: [40.71, -74.01] },
  { id: 'arc-cn-sy', from: [31.23, 121.47], to: [-33.87, 151.21] },
  // Sri Lanka routes
  { id: 'arc-lk-db', from: [7.87, 80.77], to: [25.20, 55.27] },
  // Africa Routes
  { id: 'arc-mg-ld', from: [-18.76, 46.86], to: [51.51, -0.13] },
  { id: 'arc-ke-ny', from: [-0.02, 37.90], to: [40.71, -74.01] },
  { id: 'arc-et-db', from: [9.14, 40.48], to: [25.20, 55.27] },
  // Cambodia Routes
  { id: 'arc-kh-ny', from: [12.56, 104.99], to: [40.71, -74.01] },
  { id: 'arc-kh-ld', from: [12.56, 104.99], to: [51.51, -0.13] },
];

/* ── Derived helpers ──────────────────────────────────────── */

/** Lookup factory by id */
export const FACTORY_MAP = Object.fromEntries(FACTORIES.map(f => [f.id, f])) as Record<string, Factory>;

/** Total factory count across all countries */
export const TOTAL_FACTORIES = FACTORIES.reduce((sum, f) => sum + f.factoryCount, 0);

/** All country IDs in display order (West → East) */
export const FACTORY_IDS = FACTORIES.map(f => f.id);
