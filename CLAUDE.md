@AGENTS.md

# Scalular Landing Page — Codebase Context

## What this is
Marketing landing page for **Scalular** — a B2B apparel sourcing platform. Connects fashion brands to 115+ certified factories across 9 countries. Target audience: non-technical buyers/founders, not engineers.

**Live app:** `https://app.scalular.com` (quote + login flows link here)

---

## Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.1 |
| UI | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Animation | Framer Motion | ^12.38 |
| Scroll | Lenis (smooth scroll) | ^1.3.20 |
| 3D Globe | cobe (WebGL globe) | ^2.0.1 |
| 3D garments | @react-three/fiber + drei | ^9.5 / ^10.7 |
| 3D models | GLB files (17 garment .glb in public/models/) | — |
| Button shader | @paper-design/shaders | ^0.0.72 |
| Icons | lucide-react | ^1.6 |
| Class utils | clsx + tailwind-merge | ^2.1 / ^3.5 |
| Display font | Plus Jakarta Sans (Google) | weights 400–800 |
| Body font | Outfit (Google) | weights 300–700 |

**Tailwind v4** — uses `@import "tailwindcss"` in globals.css, `@theme inline` block for token mapping, `@utility` for custom utilities. No `tailwind.config.js` — config is inline in CSS.

---

## Directory Structure

```
src/
  app/
    layout.tsx              — Root layout: Plus Jakarta Sans + Outfit fonts, LIGHT mode default, Navbar + SharedFooter + SmoothScroll
    page.tsx                — Home page: ScrollStory + ShowcaseSection + TrustGallery + ScalularServices + CTASection
    globals.css             — ALL design tokens (primitives + semantic), Tailwind v4 @theme inline mapping, glassmorphism/neumorphism utilities, keyframe animations
    favicon.ico
    about/
      layout.tsx            — About page metadata
      page.tsx              — About Us page (client component): hero, mission+stats, values, HQ location, CTA
    partner/
      layout.tsx            — Partner page metadata
      page.tsx              — Become a Partner page (client component): hero, benefits, how-it-works, certs, PartnerForm, FAQ
    terms-and-conditions/
      page.tsx              — Terms & Conditions (server component): legal text, 18 sections
  assets/                   — Brand logos (PNG), imported via @/assets/
    logo.png                — Full logo (transparent)
    logo-icon.png           — Icon only (used in globe orbital center + navbar + footer)
    logo-white-horizontal.png
    logo-black-horizontal.png
    logo-white-vertical.png
    logo-black-vertical.png
  components/
    3d/
      GarmentModels.tsx     — GLBModel loader via useGLTF + GARMENT_CATALOG (17 entries with .glb URLs)
      Globe.tsx             — LEGACY: react-globe.gl (NOT imported by any active page — superseded by cobe-globe-cdn)
    sections/
      ScrollStory.tsx       — Hero: centered COBE globe + rotating headline (5 phrases, 2s interval) + factory cards + region nav dots + stats row
      ShowcaseSection.tsx   — Wrapper: "Simplified. Streamlined. Sourced." heading + CertificationsDisplay + ClientLogos + ProductShowcase
      ProductShowcase.tsx   — 3D garment carousel: scrolling text list (left) + Three.js R3F canvas (right), auto-advance 2s
      CertificationsDisplay.tsx — 16 certification cards in infinite framer-motion marquee (speed 35s)
      ClientLogos.tsx       — 20 brand SVGs in infinite framer-motion marquee (speed 40s, direction right) + stats row
      TrustGallery.tsx      — 6 real factory photos, parallax asymmetric grid, 3 metric badges
      ScalularServices.tsx  — "Everything you need to ship smarter" + RadialOrbitalTimeline with 8 service nodes
      CTASection.tsx        — Final CTA: "Your factory is waiting." + GetStartedButton + Calendly link + 4 trust badges
      PartnerForm.tsx       — Factory partner application form (BOILERPLATE — not wired to a backend): 17 product toggles, 12 cert checkboxes, validation, success state animation
    ui/
      Navbar.tsx            — Fixed dark (bg-primary) nav: auto-hide on scroll down, backdrop-blur on scroll, mobile hamburger drawer
      SharedFooter.tsx      — Dark (bg-primary) multi-column footer: logo, tagline, nav columns (Company/Product/Legal), address, copyright
      SmoothScroll.tsx      — Lenis smooth scroll wrapper (wraps entire page in root layout), anchor click interception
      get-started-button.tsx — PRIMARY CTA: liquid-metal WebGL shader button (@paper-design/shaders), 3D perspective, ripple, optional lamp glow
      cobe-globe-cdn.tsx    — ACTIVE globe: COBE WebGL globe with custom 3D pyramid markers, dynamic pulsing arcs, dot-cluster hub visualization
      radial-orbital-timeline.tsx — Rotating orbital wheel: 8 clickable nodes orbiting center logo, auto-rotate + click-to-expand detail panel
      AnimatedCounter.tsx   — Scroll-triggered number animation (useInView + framer-motion animate)
      FAQAccordion.tsx      — Expandable Q&A: plus/minus icons, AnimatePresence height animation
      liquid-metal-button.tsx — LEGACY WebGL shader button (NOT imported by any active page)
      Button.tsx / Card.tsx / StatPill.tsx / badge.tsx — UNUSED primitives (not imported)
      shadcn-button.tsx / ui-button.tsx / ui-card.tsx — UNUSED shadcn-style wrappers (not imported)
  lib/
    utils.ts                — cn() helper (clsx + twMerge)
public/
  images/
    certification_logos/    — 16 certification PNGs/JPGs (GOTS, OEKO-TEX, Fairtrade, ISO 9001, etc.)
    brand_logos/            — 20 brand SVGs (Amazon, Disney, GAP, Levi's, Walmart, etc.)
    trust/                  — 6 factory photography JPGs (sewing-floor, cotton-processing, etc.)
  models/                   — 17 GLB 3D garment models (tshirt, hoodie, jeans, dress, etc.)
```

---

## Routing

Multi-page app with 4 routes:
- `/` — Homepage
- `/about` — About Us
- `/partner` — Become a Partner
- `/terms-and-conditions` — Terms & Conditions

Anchor links on homepage: `#regions`, `#services`, `#cta`.
Navbar links: `/#regions`, `/#services`, `/about`, `/partner`.
Footer links: `/about`, `/partner`, `/#regions`, `/#cta`, `/terms-and-conditions`, plus dead `#` links for Privacy Policy and Contact.

---

## Page Layout — Homepage (top to bottom)

1. **Navbar** — shared via layout.tsx; fixed dark nav (bg-primary), hides on scroll down, backdrop-blur on scroll
2. **ScrollStory** (`#regions`) — centered COBE globe hero, rotating headline, factory country cards, region nav dots, stats row
3. **ShowcaseSection** — section heading + CertificationsDisplay marquee + ClientLogos marquee + ProductShowcase 3D carousel
4. **TrustGallery** — Real factory photography with parallax, asymmetric grid, metric badges
5. **ScalularServices** (`#services`) — "Everything you need to ship smarter" + RadialOrbitalTimeline with 8 service nodes
6. **CTASection** (`#cta`) — "Your factory is waiting." + GetStartedButton + Calendly link + trust badges
7. **SharedFooter** — shared via layout.tsx; dark (bg-primary)

---

## Theme System

**Single static light theme** — `html` has `class="light"` hardcoded in layout.tsx. No runtime theme switching.

The `:root` block in globals.css defines CSS variables directly (no dark/light split). The `@theme inline` block maps CSS vars to Tailwind color utilities.

### Palette

| Role | Token / Utility | Current Value |
|---|---|---|
| Page background | `bg-background` | Warm off-white `#E7E3D1` |
| Surface / Cards | `bg-surface` | Near-white `#f2f1e9` |
| Surface hover | `bg-surface-hover` | `#d5d3ca` |
| Primary text | `text-text-primary` / `text-foreground` | Dark `#222220` via --color-neutral-900 |
| Secondary text | `text-text-secondary` | Muted `#41413d` via --color-neutral-700 |
| Primary (brand) | `text-primary` / `bg-primary` | Deep navy `#171B2E` |
| Accent | `text-accent` / `bg-accent` | Muted blue `#727cb1` |
| Border | `border-border` | `#d5d3ca` via --color-neutral-200 |
| Divider | `border-divider` | `#d5d3ca` |

### Primitive Color Scales
- **Neutral**: 100 `#f2f1e9` → 200 `#d5d3ca` → 400 `#ADACA4` → 700 `#41413d` → 900 `#222220`
- **Blue**: 100 `#eff0f6` → 400 `#727cb1` → 700 `#323959` → 900 `#171B2E`

**Convention**: NEVER hardcode hex colors in components. Always use CSS variable tokens via Tailwind utilities (`bg-primary`, `text-text-secondary`, `border-border`, etc.).

> ⚠️ **Known violation**: Navbar.tsx and SharedFooter.tsx currently use 40+ hardcoded hex values (`#ffffff1a`, `#ffffffb3`, `#ffffff80`, etc.) instead of tokens. These need migration.

### Custom Utilities (defined in globals.css via `@utility`)
- `glass-panel`, `glass-card`, `glass-nav` — glassmorphism with backdrop-blur + border
- `neu-card`, `neu-inset`, `neu-btn`, `neu-btn-active` — neumorphism (defined but unused)
- `bg-mesh-gradient` — multi-radial gradient background
- `bg-noise` — noise overlay (stub)

> ⚠️ **Missing utility**: `text-gradient` is referenced in 11 heading elements across About, Partner, and Terms pages but is NOT defined in globals.css. The text renders as plain unstyled color — no gradient is visible. Needs to be either defined or removed.

---

## Key Components Deep Dive

### COBE Globe (`src/components/ui/cobe-globe-cdn.tsx`)
- Uses `cobe` library (lightweight WebGL globe, NOT react-globe.gl)
- 9 factory country markers + 6 buyer hub markers + 15 animated arcs
- Custom 3D spinning pyramid markers (CSS `borderLeft`/`borderRight`/`borderBottom` triangles with `preserve-3d`)
- Dynamic features: pulsing arcs for active factory, 85-dot glowing clusters at destination hubs
- Auto-rotation at configurable speed, pointer drag to manually rotate
- Proximity detection: auto-highlights closest factory to viewport center
- `activeId` / `onActiveChange` props drive FactoryCard display in ScrollStory

### GetStartedButton (`src/components/ui/get-started-button.tsx`)
- Primary CTA button used across all pages
- Liquid-metal WebGL shader via `@paper-design/shaders` (`ShaderMount` + `liquidMetalFragmentShader`)
- 3D perspective CSS transforms with `preserve-3d` layering (Z=10 shader rim, Z=20 dark core, Z=30 text, Z=40 ripples)
- Optional `withLamp` prop adds volumetric spotlight beam above button
- Accepts `href` (renders `<Link>`) or `onClick` (renders `<button>`)
- Sizes: `sm`, `default`, `lg`, `icon`

### GarmentModels (`src/components/3d/GarmentModels.tsx`)
- 17 garment entries loading external `.glb` models via `useGLTF`
- `GARMENT_CATALOG` array of `{ id, name, url, description, category }`
- `GLBModel` component: clones scene, auto-normalizes scale to 1.6 units, auto-rotates
- Preloads first 2 and last model on module load

### RadialOrbitalTimeline (`src/components/ui/radial-orbital-timeline.tsx`)
- `icon` field must be typed as `LucideIcon` (not `React.ElementType`) for TypeScript compatibility
- 8 service nodes orbiting a central logo-icon at radius 200px
- Auto-selects first node on mount (800ms delay)
- Click node: stops rotation, shows detail panel; click background: collapses, resumes rotation
- Uses `setInterval(fn, 50)` for rotation animation

### SmoothScroll (`src/components/ui/SmoothScroll.tsx`)
- Wraps entire app in root `layout.tsx`, initializes Lenis (duration 1.2, custom easing)
- Intercepts anchor `#hash` clicks and uses `lenis.scrollTo()` with -80px offset for fixed navbar
- Framer Motion's `useScroll` works correctly with Lenis

---

## Data Sources

Factory data is currently **duplicated** across 3 files with similar but not identical values:
1. `ScrollStory.tsx` — `FACTORY_DATA` (9 entries: name, flag, factories, specialties, certs, accent color)
2. `cobe-globe-cdn.tsx` — `defaultMarkers` (15 entries: id, location, region, specialty, color, factoryCount)
3. `Globe.tsx` — LEGACY, 15 entries (unused but not deleted)

This should be consolidated into a single shared data file.

---

## TypeScript Gotchas

- **Framer Motion `ease` arrays in `Variants`**: Must cast as `[number, number, number, number]` when used inside a named `Variants` object (not needed for inline `transition={{}}` props). Alternatively cast as `Easing`.
  ```ts
  // Correct approaches:
  transition: { ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  transition: { ease: [0.22, 1, 0.36, 1] as Easing }
  ```
- **Lucide icons in `TimelineItem`**: Use `icon: LucideIcon` not `icon: React.ElementType`
- **R3F Canvas**: Must be wrapped in `SafeCanvas` with `useState(false)` / `useEffect(() => setMounted(true))` pattern to avoid SSR issues (see ProductShowcase.tsx)

---

## Unused / Legacy Files

These exist but are **not imported** by any active route. Safe to delete:
```
src/components/3d/Globe.tsx              ← superseded by cobe-globe-cdn.tsx
src/components/ui/liquid-metal-button.tsx ← superseded by get-started-button.tsx
src/components/ui/Button.tsx             ← unused
src/components/ui/Card.tsx               ← unused
src/components/ui/StatPill.tsx           ← unused
src/components/ui/badge.tsx              ← unused
src/components/ui/shadcn-button.tsx      ← unused
src/components/ui/ui-button.tsx          ← unused
src/components/ui/ui-card.tsx            ← unused
```

Previously deleted legacy section components (no longer in filesystem): ChaosToOrder, Footer, Hero, HowItWorks, OutcomeBlock, PainSection, RegionsSection, SocialProof, TrustSection, demo.

---

## Important Conventions

- All components using hooks/browser APIs need `'use client'` directive
- R3F Canvas components use the `SafeCanvas` mount-guard pattern (not `next/dynamic`)
- Images use `next/image` with `priority`/`loading="eager"` for LCP assets
- Fonts loaded via `next/font/google`: Plus Jakarta Sans (`--font-display`) + Outfit (`--font-sans`)
- `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Tailwind v4: no `tailwind.config.js`, everything configured in `globals.css`
- `@utility` replaces `@layer utilities` in Tailwind v4
- Never hardcode colors — always use CSS variable tokens
- PartnerForm is boilerplate — not connected to any backend service
- Footer "Privacy Policy" and "Contact" links are dead (`href="#"`)
