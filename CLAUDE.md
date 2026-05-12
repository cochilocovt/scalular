@AGENTS.md

# Scalular Landing Page — Codebase Context

## What this is
Marketing landing page for **Scalular** — a B2B apparel sourcing platform. Connects fashion brands to 100+ certified factories across 6 countries. Target audience: non-technical buyers/founders, not engineers.

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
| 3D garments | @react-three/fiber + drei + three | ^9.5 / ^10.7 / ^0.183 |
| 3D models | GLB files (17 garment .glb in public/models/) | — |
| Icons | lucide-react | ^1.6 |
| Class utils | clsx + tailwind-merge | ^2.1 / ^3.5 |
| Display font | Plus Jakarta Sans (Google) | weights 400–800 |
| Body font | Outfit (Google) | weights 300–700 |
| Brand font | Urbanist (Google) | weights 300–400 |

**Installed but unused dependencies** (candidates for removal):
- `gsap` ^3.14.2 — not imported anywhere
- `framer` ^3.0.4 — not imported anywhere
- `react-globe.gl` ^2.37.0 — only in legacy Globe.tsx
- `@radix-ui/react-slot` ^1.2.4 — only in unused shadcn components
- `class-variance-authority` ^0.7.1 — only in unused shadcn components

**Tailwind v4** — uses `@import "tailwindcss"` in globals.css, `@theme inline` block for token mapping, `@utility` for custom utilities. No `tailwind.config.js` — config is inline in CSS.

---

## Directory Structure

```
src/
  app/
    layout.tsx              — Root layout: Plus Jakarta Sans + Outfit + Urbanist fonts, LIGHT mode default, Navbar + SharedFooter + SmoothScroll, skip-to-content a11y link
    page.tsx                — Home page: ScrollStory + ShowcaseSection + TrustGallery + ScalularServices + CTASection
    globals.css             — ALL design tokens (primitives + semantic), Tailwind v4 @theme inline mapping, glassmorphism/neumorphism utilities, keyframe animations, text-gradient utility, CSS marquee animations
    favicon.ico
    about/
      layout.tsx            — About page metadata
      page.tsx              — About Us page (client component): cinematic light→dark scroll transition, hero, cinematic image, mission+stats, why choose us, sustainability, supplier network, global offices (Tiruppur + Dubai), CTA
    gallery/
      page.tsx              — Gallery page (client component): masonry grid, category filters, image+video lightbox with focus trap + keyboard nav
    partner/
      layout.tsx            — Partner page metadata
      page.tsx              — Partner page (client component): cinematic light→dark scroll transition, hero, benefits, social proof counter, 5-step process grid, certifications marquee, factory showcase strip, PartnerForm, FAQ
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
      ScrollStory.tsx       — Hero: centered COBE globe + rotating headline (5 phrases, 2s interval) + factory cards + region nav dots. Data sourced from @/data/factories
      ShowcaseSection.tsx   — Wrapper: "Skip negotiation." + "Start production." heading + TrustShowcase + ProductShowcase
      ProductShowcase.tsx   — 3D garment carousel: scrolling text list (left) + Three.js R3F canvas (right), auto-advance 2s
      TrustShowcase.tsx     — Tabbed logo marquee: 4 categories (Brand Collaborations, Major Importers, Certifications, Stores Catered). CSS marquee animation, layoutId tab indicator
      TrustGallery.tsx      — "Audited Factory ecosystem" — real factory photos ("Not AI Photos"), parallax asymmetric grid, 3 metric badges
      ScalularServices.tsx  — Toggle switch: "For Brands" / "For Factories". Each mode has 8 service nodes + RadialOrbitalTimeline
      CTASection.tsx        — Social proof stats (200+ Brands, 3000+ Orders, 20+ Years) + "Your factory capacity is reserved." + GetStartedButton + Calendly link + 4 trust badges
      PartnerForm.tsx       — Factory partner application form (BOILERPLATE — not wired to a backend): 11 text fields (Factory Name, POC Name, Email, Phone, Website, Street Address, Full Address, City, State, Zip, Country), validation, success state animation. Accepts `darkMode` prop
      CertificationsDisplay.tsx — UNUSED: 16 certification cards in marquee (superseded by TrustShowcase)
      ClientLogos.tsx       — UNUSED: 20 brand SVGs in marquee (superseded by TrustShowcase)
    ui/
      Navbar.tsx            — Fixed dark (bg-primary) nav: auto-hide on scroll down, backdrop-blur on scroll, mobile hamburger drawer. Links: Network, Services, Gallery, About, Partner + Sign In + Get Quote
      SharedFooter.tsx      — Dark (bg-primary) multi-column footer: logo, tagline, nav columns (Company/Product/Legal), address, copyright. All links are live
      SmoothScroll.tsx      — Lenis smooth scroll wrapper (wraps entire page in root layout), anchor click interception
      get-started-button.tsx — PRIMARY CTA: liquid-metal WebGL shader button (@paper-design/shaders), 3D perspective, ripple, optional lamp glow
      cobe-globe-cdn.tsx    — ACTIVE globe: COBE WebGL globe with custom Kinetic Weave SVG markers, dynamic pulsing arcs, dot-cluster hub visualization. Reads marker data from @/data/factories
      radial-orbital-timeline.tsx — Rotating orbital wheel: 8 clickable nodes orbiting center logo, auto-rotate + click-to-expand detail panel
      AnimatedCounter.tsx   — Scroll-triggered number animation (useInView + framer-motion animate)
      FAQAccordion.tsx      — Expandable Q&A: plus/minus icons, AnimatePresence height animation. Accepts `darkMode` prop
      liquid-metal-button.tsx — LEGACY WebGL shader button (NOT imported by any active page)
      Button.tsx / Card.tsx / StatPill.tsx / badge.tsx — UNUSED primitives (not imported)
      shadcn-button.tsx / ui-button.tsx / ui-card.tsx — UNUSED shadcn-style wrappers (not imported)
  data/
    factories.ts            — SHARED single source of truth: Factory[], BuyerHub[], SupplyArc[] interfaces + 6 factories, 6 buyer hubs, 9 supply arcs + derived helpers (FACTORY_MAP, TOTAL_FACTORIES, FACTORY_IDS)
    galleryData.ts          — Gallery page data: GalleryItem[] (12 items: 9 images + 3 videos) + GALLERY_CATEGORIES (6 categories)
  lib/
    utils.ts                — cn() helper (clsx + twMerge)
public/
  images/
    about_us/               — 1 team photo (Uljah-Team-crop-2048x1158.png)
    certification_logos/    — 16 certification PNGs/JPGs (GOTS, OEKO-TEX, Fairtrade, ISO 9001, etc.)
    brand_logos/            — 20 brand SVGs (Amazon, Disney, GAP, Levi's, Walmart, etc.)
    extracted_logos/        — 113 logo images (brand, certification, importer, store logos for TrustShowcase)
    trust/                  — 27 files: factory photography JPGs + 4 videos (.mp4) used across TrustGallery, Gallery, and Partner pages
    certifications/         — Additional certification logo images
    logos/                  — Additional logo images
  models/                   — 17 GLB 3D garment models (tshirt, hoodie, jeans, dress, etc.)
```

---

## Routing

Multi-page app with 5 routes:
- `/` — Homepage
- `/about` — About Us
- `/gallery` — Factory Gallery
- `/partner` — Become a Partner
- `/terms-and-conditions` — Terms & Conditions

Anchor links on homepage: `#regions`, `#services`, `#cta`.
Navbar links: `/#regions`, `/#services`, `/gallery`, `/about`, `/partner` + Sign In (`https://app.scalular.com/login`) + Get Quote (`https://app.scalular.com/quote`).
Footer links: `/about`, `/gallery`, `/partner`, `/#regions`, `/#cta`, `/terms-and-conditions`, `mailto:contactus@scalular.com`.

---

## Page Layout — Homepage (top to bottom)

1. **Navbar** — shared via layout.tsx; fixed dark nav (bg-primary), hides on scroll down, backdrop-blur on scroll
2. **ScrollStory** (`#regions`) — centered COBE globe hero, rotating headline (Instant Quotes / Competitive Pricing / 30+ Certified Factories / On-Ground Support / Live Order Tracking), factory country cards, region nav dots
3. **ShowcaseSection** — "Skip negotiation. Start production." heading + TrustShowcase (tabbed logo marquee) + ProductShowcase 3D carousel
4. **TrustGallery** — "Audited Factory ecosystem" — real factory photography with parallax, asymmetric grid, metric badges
5. **ScalularServices** (`#services`) — Toggle: "For Brands" / "For Factories" + RadialOrbitalTimeline with 8 service nodes per mode
6. **CTASection** (`#cta`) — Social proof stats + "Your factory capacity is reserved." + GetStartedButton + Calendly "Book a Strategy Call & Demo" link + 4 trust badges
7. **SharedFooter** — shared via layout.tsx; dark (bg-primary)

---

## Page Layout — About (`/about`)

Uses **cinematic light→dark scroll transition** pattern:
1. **Hero (Light)** — Large heading "Where Global Apparel Meets Agile Execution." with gradient text
2. **Cinematic Image Transition** — Team photo that scales/unrounds on scroll
3. **Dark Mode Sections** (all subsequent content on `#0A0F1C` dark background):
   - Mission & Vision — copy + 6-stat animated counter grid
   - Why Choose Us — 4 value cards (On-Ground Support, Factoring, Compliance, Streamlined Lifecycle)
   - Sustainability — 3 cards (Sustainable Sourcing, Ethical Standards, Digital Transformation)
   - Supplier Network — copy + 4 info cards
   - Global Offices — Tiruppur, India (Sourcing HQ) + Dubai, UAE (Corporate LLC)
   - CTA — "Ready to Partner?" + GetStartedButton + Partner link

---

## Page Layout — Partner (`/partner`)

Uses same **cinematic light→dark scroll transition** pattern:
1. **Hero (Light)** — "Grow Your Factory With Global Brands." + Apply Now CTA
2. **Dark Mode Sections**:
   - Benefits — 4 cards (Global Buyer Access, Consistent Volume Orders, Factoring & Payment, Verified Buyer Network)
   - Social Proof Counter Strip — 200+ Brands, 30+ Factories, 10 Countries, 1M+ Pcs/Month
   - How It Works — 5-step grid: Apply → Costing Exercise → Audit → Onboard → Receive Orders
   - Certifications Marquee — 12 cert badges scrolling via CSS animation
   - Factory Showcase Strip — 4 real factory images
   - Application Form (`#apply`) — PartnerForm with darkMode
   - FAQ — 7 questions via FAQAccordion with darkMode

---

## Page Layout — Gallery (`/gallery`)

1. **Hero** — "Real Factories. Real Impact." + description
2. **Category Filters** — 6 buttons: All, Production, Textile, Raw Materials, Finishing, Inspection
3. **Masonry Grid** — Responsive columns (2→3→4), supports images and videos (autoplay, muted, looped)
4. **Lightbox Modal** — Full-screen with focus trap, keyboard navigation (Escape, Tab), caption overlay

---

## Theme System

**Single static light theme** — `html` has `class="light"` hardcoded in layout.tsx. No runtime theme switching. `suppressHydrationWarning` on both `<html>` and `<body>`.

The `:root` block in globals.css defines CSS variables directly (no dark/light split). The `@theme inline` block maps CSS vars to Tailwind color utilities.

### Palette

| Role | Token / Utility | Current Value |
|---|---|---|
| Page background | `bg-background` | Warm off-white `#E7E3D1` |
| Surface / Cards | `bg-surface` | Near-white `#f2f1e9` |
| Surface hover | `bg-surface-hover` | `#d5d3ca` |
| Primary text | `text-text-primary` | `#171B2E` via --color-primary (brand navy) |
| Foreground text | `text-foreground` | `#222220` via --color-neutral-900 |
| Secondary text | `text-text-secondary` | Muted `#41413d` via --color-neutral-700 |
| Primary (brand) | `text-primary` / `bg-primary` | Deep navy `#171B2E` |
| Primary alt | `bg-primary-alt` | Dark navy `#1A1E31` |
| Accent | `text-accent` / `bg-accent` | Muted blue `#727cb1` |
| Border | `border-border` | `#d5d3ca` via --color-neutral-200 |
| Divider | `border-divider` | `#d5d3ca` |

### Primitive Color Scales
- **Neutral**: 100 `#f2f1e9` → 200 `#d5d3ca` → 400 `#ADACA4` → 700 `#41413d` → 900 `#222220`
- **Blue**: 100 `#eff0f6` → 400 `#727cb1` → 700 `#323959` → 900 `#171B2E`

### Globe-Specific Tokens
- `--globe-primary` `#171B2E`, `--globe-secondary` `#323959`, `--globe-arc` `rgba(50,57,89,0.7)`, `--globe-atmosphere` `#727cb1`, `--globe-ring` `#727cb1`

**Convention**: NEVER hardcode hex colors in homepage components. Always use CSS variable tokens via Tailwind utilities (`bg-primary`, `text-text-secondary`, `border-border`, etc.).

> ⚠️ **Known exception**: About and Partner pages intentionally use hardcoded colors (`#0A0F1C`, `#F4F7FC`, `#0EA5E9`, `#38BDF8`, `#94A3B8`, `#0F172A`) for their cinematic dark-mode sections, as these sections operate outside the light-theme token system.

### Custom Utilities (defined in globals.css via `@utility`)
- `glass-panel`, `glass-card`, `glass-nav` — glassmorphism with backdrop-blur + border
- `neu-card`, `neu-inset`, `neu-btn`, `neu-btn-active` — neumorphism (defined but unused)
- `bg-mesh-gradient` — multi-radial gradient background
- `bg-noise` — noise overlay (stub)
- `text-gradient` — primary-to-blue-400 gradient text (`background-clip: text`)

### CSS Keyframe Animations (globals.css)
- `float`, `float-0` through `float-5` — floating element animations
- `grain` — noise texture animation
- `cta-ripple` — CTA button ripple effect
- `marquee`, `marquee-left`, `marquee-right` — CSS-based marquee scrolling (replacing Framer Motion marquees for performance)

---

## Key Components Deep Dive

### COBE Globe (`src/components/ui/cobe-globe-cdn.tsx`)
- Uses `cobe` library (lightweight WebGL globe, NOT react-globe.gl)
- 6 factory country markers + 6 buyer hub markers + 9 animated arcs (data from `@/data/factories`)
- Custom Kinetic Weave SVG markers (no longer CSS triangle pyramids)
- Dynamic features: pulsing arcs for active factory, dot glowing clusters at destination hubs
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

### ScalularServices (`src/components/sections/ScalularServices.tsx`)
- Dual-mode toggle: "For Brands" (8 services) / "For Factories" (8 services)
- Brands heading: "Everything you need to source, manage, and deliver seamlessly"
- Factories heading: "Everything you need to grow your factory"
- Dynamic subtitle, description, and data array change on toggle
- Both modes render via RadialOrbitalTimeline

### TrustShowcase (`src/components/sections/TrustShowcase.tsx`)
- 4 tabs: Brand Collaborations, Major Importers, Certifications, Stores Catered
- 18 logos from `extracted_logos/` distributed across categories
- CSS-based `marquee-left` animation (not Framer Motion) — 6x array duplication for seamless scroll
- Animated tab indicator via `layoutId="activeTabBg"`

### SmoothScroll (`src/components/ui/SmoothScroll.tsx`)
- Wraps entire app in root `layout.tsx`, initializes Lenis (duration 1.2, custom easing)
- Intercepts anchor `#hash` clicks and uses `lenis.scrollTo()` with -80px offset for fixed navbar
- Framer Motion's `useScroll` works correctly with Lenis

---

## Data Sources

Factory data is consolidated into a single shared source of truth:

**`src/data/factories.ts`** — exports:
- `FACTORIES` — 6 factory countries (Kenya, Dubai, India, Sri Lanka, Vietnam, China) with typed `Factory` interface (id, isoCode, flag, name, location, specialty, specialties, certifications, accentColor, factoryCount)
- `BUYER_HUBS` — 6 buyer hub cities (New York, Toronto, London, Berlin, Dubai, Sydney)
- `SUPPLY_ARCS` — 9 supply chain arcs (factory → buyer hub coordinate pairs)
- `FACTORY_MAP`, `TOTAL_FACTORIES`, `FACTORY_IDS` — derived lookup helpers

Both `ScrollStory.tsx` and `cobe-globe-cdn.tsx` import from this shared file.

**`src/data/galleryData.ts`** — exports:
- `GALLERY_DATA` — 12 gallery items (9 images + 3 videos) with id, type, src, alt, label, category, span
- `GALLERY_CATEGORIES` — 6 categories: All, Production, Textile, Raw Materials, Finishing, Inspection

> ⚠️ **Remaining duplication**: `Globe.tsx` (legacy, unused) still has its own inline data (15 entries). Safe to ignore since the file is not imported.

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
src/components/3d/Globe.tsx                      ← superseded by cobe-globe-cdn.tsx
src/components/sections/CertificationsDisplay.tsx ← superseded by TrustShowcase
src/components/sections/ClientLogos.tsx           ← superseded by TrustShowcase
src/components/ui/liquid-metal-button.tsx         ← superseded by get-started-button.tsx
src/components/ui/Button.tsx                      ← unused
src/components/ui/Card.tsx                        ← unused
src/components/ui/StatPill.tsx                    ← unused
src/components/ui/badge.tsx                       ← unused
src/components/ui/shadcn-button.tsx               ← unused
src/components/ui/ui-button.tsx                   ← unused
src/components/ui/ui-card.tsx                     ← unused
```

Root-level debug/test scripts (not part of app): `check_cobe.js`, `fix_order.js`, `test-cobe.js`

Previously deleted legacy section components (no longer in filesystem): ChaosToOrder, Footer, Hero, HowItWorks, OutcomeBlock, PainSection, RegionsSection, SocialProof, TrustSection, demo.

---

## Important Conventions

- All components using hooks/browser APIs need `'use client'` directive
- R3F Canvas components use the `SafeCanvas` mount-guard pattern (not `next/dynamic`)
- Images use `next/image` with `priority`/`loading="eager"` for LCP assets
- Fonts loaded via `next/font/google`: Plus Jakarta Sans (`--font-display`) + Outfit (`--font-sans`) + Urbanist (`--font-brand`)
- `--font-brand` (Urbanist) is used for the "Scalular" brand name in Navbar and Footer
- `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Tailwind v4: no `tailwind.config.js`, everything configured in `globals.css`
- `@utility` replaces `@layer utilities` in Tailwind v4
- Never hardcode colors in homepage components — always use CSS variable tokens
- PartnerForm is boilerplate — not connected to any backend service (11 text fields, no toggles/checkboxes)
- All `<main>` elements use `id="main-content"` for skip-to-content a11y link in root layout
- CSS marquee animations (`marquee-left`, `marquee-right`) replace Framer Motion marquees for GPU-accelerated performance

### Cinematic Dark-Mode Scroll Pattern (About + Partner pages)
Both pages share a common architectural pattern:
- `useScroll()` + `useTransform()` for scroll-driven opacity/scale transitions
- Fixed background layers with z-index stacking (`z-[-2]` light `#F4F7FC`, `z-[-1]` dark `#0A0F1C`)
- Hero section fades/scales out on scroll, dark content sections have `z-20`
- SVG noise texture overlay on dark background
- Dark card style: `bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm rounded-[2rem]`
- Section labels: `text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9]` with decorative `w-8 h-[2px] bg-[#0EA5E9]` accent line
- Accent color: `#0EA5E9` (sky blue) with secondary `#38BDF8`
- Components accepting `darkMode` prop: PartnerForm, FAQAccordion
