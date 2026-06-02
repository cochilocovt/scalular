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
    id: 'kenya', isoCode: 'ke', flag: '🇰🇪', name: 'Kenya',
    location: [-0.02, 37.90],
    specialty: 'Duty-Free · Volume',
    specialties: ['Duty-Free', 'Volume', 'Woven'],
    certifications: ['WRAP', 'SEDEX'],
    accentColor: 'var(--color-primary-alt)',
    factoryCount: 4,
  },
  {
    id: 'india', isoCode: 'in', flag: '🇮🇳', name: 'India',
    location: [20.59, 78.96],
    specialty: 'Cotton · Knitwear · Embroidery',
    specialties: ['Cotton', 'Knitwear', 'Embroidery', 'Sustainable'],
    certifications: ['WRAP', 'SLCP', 'Brand Audited', 'SEDEX'],
    accentColor: 'var(--color-blue-400)',
    factoryCount: 12,
  },
  {
    id: 'srilanka', isoCode: 'lk', flag: '🇱🇰', name: 'Sri Lanka',
    location: [7.87, 80.77],
    specialty: 'Lingerie · Intimate Apparel',
    specialties: ['Lingerie', 'Activewear', 'Intimate Apparel'],
    certifications: ['WRAP', 'SLCP', 'SEDEX'],
    accentColor: '#0f766e',
    factoryCount: 5,
  },
  {
    id: 'vietnam', isoCode: 'vn', flag: '🇻🇳', name: 'Vietnam',
    location: [14.06, 108.28],
    specialty: 'Technical · Activewear',
    specialties: ['Technical', 'Performance', 'Activewear'],
    certifications: ['WRAP', 'SEDEX', 'SLCP'],
    accentColor: 'var(--color-blue-700)',
    factoryCount: 5,
  },
  {
    id: 'china', isoCode: 'cn', flag: '🇨🇳', name: 'China',
    location: [31.23, 121.47],
    specialty: 'Scale · Technology · Accessories',
    specialties: ['Scale', 'Technology', 'Accessories'],
    certifications: ['WRAP', 'SEDEX', 'BCI'],
    accentColor: '#991b1b',
    factoryCount: 9,
  },
];

/* ── Office locations (Headquarters & Relationship Offices) ── */
export interface Office {
  id: string;
  name: string;
  location: [number, number];
  label: string;
  type: 'hq' | 'office';
  accentColor: string;
}

export const OFFICES: Office[] = [
  {
    id: 'tiruppur',
    name: 'Tiruppur',
    location: [11.1085, 77.3411],
    label: 'Global Headquarters',
    type: 'hq',
    accentColor: '#E0A96D', // Amber/gold for HQ
  },
  {
    id: 'dubai_office',
    name: 'Dubai',
    location: [25.2048, 55.2708],
    label: 'Relationship Office',
    type: 'office',
    accentColor: '#818cf8', // Indigo for Relationship Office
  }
];

/* ── Buyer hub cities ─────────────────────────────────────── */
export const BUYER_HUBS: BuyerHub[] = [
  { id: 'usa',       name: 'New York',  location: [40.71, -74.01],  label: 'Americas Hub', accentColor: 'var(--color-blue-400)' },
  { id: 'canada',    name: 'Toronto',   location: [43.65, -79.38],  label: 'NA Hub',       accentColor: 'var(--color-surface-muted)' },
  { id: 'uk',        name: 'London',    location: [51.51, -0.13],   label: 'Europe Hub',   accentColor: 'var(--color-blue-700)' },
  { id: 'germany',   name: 'Berlin',    location: [52.52, 13.41],   label: 'EU Hub',       accentColor: 'var(--color-primary)' },
  { id: 'australia', name: 'Sydney',    location: [-33.87, 151.21], label: 'APAC Hub',     accentColor: 'var(--color-neutral-700)' },
];

/* ── Supply chain arcs (factory → buyer hub) ──────────────── */
export const SUPPLY_ARCS: SupplyArc[] = [
  // India routes
  { id: 'arc-in-ny', from: [20.59, 78.96], to: [40.71, -74.01] },
  { id: 'arc-in-ld', from: [20.59, 78.96], to: [51.51, -0.13] },
  { id: 'arc-in-to', from: [20.59, 78.96], to: [43.65, -79.38] },
  // Vietnam routes
  { id: 'arc-vn-ny', from: [14.06, 108.28], to: [40.71, -74.01] },
  { id: 'arc-vn-sy', from: [14.06, 108.28], to: [-33.87, 151.21] },
  // China routes
  { id: 'arc-cn-ny', from: [31.23, 121.47], to: [40.71, -74.01] },
  { id: 'arc-cn-sy', from: [31.23, 121.47], to: [-33.87, 151.21] },
  // Sri Lanka routes
  { id: 'arc-lk-db', from: [7.87, 80.77], to: [25.20, 55.27] },
  // Africa Routes
  { id: 'arc-ke-ny', from: [-0.02, 37.90], to: [40.71, -74.01] },
];

/* ── Derived helpers ──────────────────────────────────────── */

/** Lookup factory by id */
export const FACTORY_MAP = Object.fromEntries(FACTORIES.map(f => [f.id, f])) as Record<string, Factory>;

/** Total factory count across all countries */
export const TOTAL_FACTORIES = FACTORIES.reduce((sum, f) => sum + f.factoryCount, 0);

/** All country IDs in display order (West → East) */
export const FACTORY_IDS = FACTORIES.map(f => f.id);
