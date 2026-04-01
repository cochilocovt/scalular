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
| 3D Globe | react-globe.gl + Three.js | ^2.37 / ^0.183 |
| 3D utilities | @react-three/fiber + drei | ^9.5 / ^10.7 |
| Button shader | @paper-design/shaders | ^0.0.72 |
| Icons | lucide-react | ^1.6 |
| Class utils | clsx + tailwind-merge | ^2.1 / ^3.5 |
| Font | M PLUS Code Latin (Google) | all weights 100–700 |

**Tailwind v4** — uses `@import "tailwindcss"` in globals.css, `@theme inline` block for token mapping, `@utility` for custom utilities. No `tailwind.config.js` — config is inline in CSS.

---

## Directory Structure

```
src/
  app/
    layout.tsx          — Root layout: M PLUS Code Latin font, LIGHT mode default, Navbar + SharedFooter + SmoothScroll
    page.tsx            — Home page: ScrollStory + ShowcaseSection + ScalularServices + CTASection
    globals.css         — ALL theming, CSS vars, Tailwind v4 config, utilities, GlowCTAButton animations
    favicon.ico
    about/
      page.tsx          — About Us page: hero, mission+stats, values, location, CTA
    partner/
      page.tsx          — Become a Partner page: hero, benefits, how-it-works, certs, form, FAQ
  assets/               — Brand logos (PNG)
    logo.png            — Full logo (transparent)
    logo-icon.png       — Icon only (used in globe timeline center)
    logo-white-horizontal.png
    logo-black-horizontal.png — Used in Navbar (light mode)
    logo-white-vertical.png
    logo-black-vertical.png
  components/
    3d/
      Globe.tsx         — ScalularGlobe: react-globe.gl, zoom disabled, blue-marble texture, light-mode tooltips
      GarmentModels.tsx — 17 procedural Three.js garment silhouettes + GARMENT_CATALOG export
    sections/
      ScrollStory.tsx   — Hero: sticky 200vh scroll, 3D globe + scroll-driven text reveal + factory cards + GlowCTAButton
      ShowcaseSection.tsx — Wrapper: "Simplified. Streamlined. Sourced." + ProductShowcase + CertificationsDisplay + ClientLogos
      ProductShowcase.tsx — 3D garment carousel (3-item view, active-only Canvas, auto-advance 4s, touch swipe)
      CertificationsDisplay.tsx — 12 certification cards with stagger animation
      ClientLogos.tsx   — Infinite brand logo marquee (SVGs at public/assets/clients/*.svg — user to provide)
      PartnerForm.tsx   — Factory application form: 17 garment type toggles, 12 cert checkboxes, validation, success state
      ScalularServices.tsx — Services section with RadialOrbitalTimeline
      CTASection.tsx    — Final CTA: GlowCTAButton + Calendly link + trust badges
      (legacy/unused: ChaosToOrder.tsx, Footer.tsx, Hero.tsx, HowItWorks.tsx, OutcomeBlock.tsx, PainSection.tsx, RegionsSection.tsx, SocialProof.tsx, TrustSection.tsx)
    ui/
      Navbar.tsx        — Fixed nav: auto-hide on scroll, glassmorphism on scroll, multi-page links, mobile hamburger drawer
      SharedFooter.tsx  — Shared multi-column footer: logo, tagline, nav columns, address, copyright
      SmoothScroll.tsx  — Lenis smooth scroll wrapper (wraps entire page in root layout)
      GlowCTAButton.tsx — Primary CTA: rotating conic-gradient border, Framer Motion glow pulse, ripple on click
      AnimatedCounter.tsx — Scroll-triggered number animation (useInView + framer-motion animate)
      FAQAccordion.tsx  — Expandable Q&A with AnimatePresence height animation
      radial-orbital-timeline.tsx — Rotating orbital wheel with clickable nodes, lure animation, expand cards
      liquid-metal-button.tsx     — WebGL shader button (kept, no longer primary CTA)
      Button.tsx        — Basic button component
      Card.tsx          — Basic card component
      StatPill.tsx      — Stat display pill
      badge.tsx         — Badge primitive
      ui-button.tsx     — shadcn-style button
      ui-card.tsx       — shadcn-style card (used inside radial timeline)
  lib/
    utils.ts            — cn() helper (clsx + twMerge)
public/
  assets/
    clients/            — Client brand SVGs go here (amazon.svg, walmart.svg, disney.svg, gap.svg, levis.svg, reebok.svg)
```

---

## Routing

Multi-page app with 3 routes:
- `/` — Homepage
- `/about` — About Us
- `/partner` — Become a Partner

Anchor links on homepage: `#regions`, `#cta`.
Navbar links: `/#regions`, `/#cta`, `/about`, `/partner`.

---

## Page Layout — Homepage (top to bottom)

1. **Navbar** — shared via layout.tsx; fixed, hides on scroll down, `glass-nav` on scroll
2. **ScrollStory** (`#regions`) — 200vh sticky scroll: interactive globe hero, factory country cards, scroll-driven headline
3. **ShowcaseSection** — product carousel, certifications grid, client logos marquee
4. **ScalularServices** — min-h-screen: "The Tools to Ship Smarter" + RadialOrbitalTimeline with 8 service nodes
5. **CTASection** (`#cta`) — "Your Factory, Instantly." + GlowCTAButton + Calendly link
6. **SharedFooter** — shared via layout.tsx

---

## Theme System

**Single static light theme** — `html` has `class="light"` hardcoded in layout.tsx. No runtime theme switching.

The `:root` block in globals.css defines **dark** as the default CSS variables. The `html.light` block overrides them for light mode. Since `class="light"` is always set, the site always renders in light mode.

| Selector | Mode |
|---|---|
| `:root` | Dark defaults (unused in production) |
| `html.light` | **Active** — white background, dark text |

**CSS Variables → Tailwind tokens** via `@theme inline` block. Always use semantic tokens in components:

| Token | Light value |
|---|---|
| `bg-background` | White `#FFFFFF` |
| `bg-surface` | Near-white `#F8FAFC` |
| `bg-surface-hover` | `#F1F5F9` |
| `text-text-primary` | Dark `#0F172A` |
| `text-text-secondary` | Muted `#475569` |
| `text-primary` | Brand blue `#3B82F6` |
| `text-accent` | Bronze `#9E6F43` |
| `border-border` | `#E2E8F0` |
| `border-divider` | `#F1F5F9` |

**NEVER hardcode colors** — always use semantic tokens above. This keeps the codebase theme-ready.

**Custom utilities** (use as Tailwind classes):
- `glass-panel`, `glass-card`, `glass-nav` — glassmorphism with backdrop-blur
- `text-gradient`, `text-gradient-accent` — primary→accent gradient text
- `shadow-glow` — primary glow box-shadow
- `bg-mesh-gradient`, `bg-gradient-orbital`
- `glow-pulse` — pulsing glow animation

---

## Key Components Deep Dive

### Globe (`src/components/3d/Globe.tsx`)
- Uses `react-globe.gl` (dynamically imported, `ssr: false`)
- Texture: `earth-blue-marble.jpg` (works on light backgrounds)
- Zoom disabled: `controls.enableZoom = false`
- 9 factory countries, 6 buyer hubs, 15 animated arcs, pulsing rings
- Tooltips: white background, dark text (light-mode compatible)
- `onPointClick` prop → triggers FactoryCard in ScrollStory

### GlowCTAButton (`src/components/ui/GlowCTAButton.tsx`)
- Primary CTA button (replaces LiquidMetalButton everywhere)
- Rotating conic-gradient border via CSS `@property --glow-angle` + `spin-border` keyframe
- Pulsing box-shadow via Framer Motion
- Ripple on click, arrow slides on hover
- Accepts `href` (renders `<a>`) or `onClick` (renders `<button>`)
- Sizes: `sm`, `md` (default), `lg`

### GarmentModels (`src/components/3d/GarmentModels.tsx`)
- 17 procedural garment components using Three.js geometry primitives
- `GARMENT_CATALOG` array of `{ id, name, Component, color, description, category }`
- Each uses `useFrame` for auto-rotation
- Primitives used: BoxGeometry, CylinderGeometry, LatheGeometry, SphereGeometry, CapsuleGeometry, TorusGeometry

### RadialOrbitalTimeline (`src/components/ui/radial-orbital-timeline.tsx`)
- `icon` field must be typed as `LucideIcon` (not `React.ElementType`) for TypeScript compatibility
- 8 service nodes orbiting a central logo-icon
- Lure system: every 4.2s, randomly shows a node hint
- Click node: expands card, stops rotation; click background: collapses, resumes

### SmoothScroll (`src/components/ui/SmoothScroll.tsx`)
- Wraps entire app in root `layout.tsx`, initializes Lenis duration 1.2
- Framer Motion's `useScroll` works correctly with Lenis

---

## TypeScript Gotchas

- **Framer Motion `ease` arrays in `Variants`**: Must cast as `[number, number, number, number]` when used inside a named `Variants` object (not needed for inline `transition={{}}` props)
  ```ts
  // Correct:
  transition: { ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  ```
- **Lucide icons in `TimelineItem`**: Use `icon: LucideIcon` not `icon: React.ElementType`
- **`next/dynamic({ ssr: false })`**: Required for Globe, GarmentModels/Canvas, and anything using `window`

---

## Unused / Legacy Components

These exist but are **not rendered** anywhere. Safe to delete if cleaning up:
```
src/components/sections/ChaosToOrder.tsx   ← replaced by ShowcaseSection
src/components/sections/Footer.tsx          ← replaced by SharedFooter
src/components/sections/Hero.tsx
src/components/sections/HowItWorks.tsx
src/components/sections/OutcomeBlock.tsx
src/components/sections/PainSection.tsx
src/components/sections/RegionsSection.tsx
src/components/sections/SocialProof.tsx
src/components/sections/TrustSection.tsx
src/components/ui/demo.tsx
```

---

## Important Conventions

- All components using hooks/browser APIs need `'use client'` directive
- Globe and R3F Canvas components are SSR-disabled via `next/dynamic` with `{ ssr: false }`
- Images use `next/image` with `priority`/`loading="eager"` for LCP assets
- Font loaded via `next/font/google`, applied as `--font-sans` CSS variable
- `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Tailwind v4: no `tailwind.config.js`, everything configured in `globals.css`
- `@utility` replaces `@layer utilities` in Tailwind v4
- Never hardcode colors — always use CSS variable tokens
