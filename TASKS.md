# Scalular — Remaining Tasks & Handoff

## What Was Built (Completed)

### Phase 1 — Light Mode ✅
| Task | File | Change |
|---|---|---|
| Switch HTML class | `src/app/layout.tsx` | `class="dark"` → `class="light"` |
| Navbar logo | `src/components/ui/Navbar.tsx` | White logo → black horizontal logo |
| ScrollStory dark colors | `src/components/sections/ScrollStory.tsx` | Gradient veil, dot nav, close btn use CSS vars |
| Globe texture + tooltips | `src/components/3d/Globe.tsx` | `earth-blue-marble.jpg`, disabled zoom, white tooltips |
| CTASection tokens | `src/components/sections/CTASection.tsx` | All `blue-*` / `white/5` → semantic tokens |
| LiquidMetalButton contrast | `src/components/ui/liquid-metal-button.tsx` | Text `#666` → `#DDD` |
| Radial timeline tokens | `src/components/ui/radial-orbital-timeline.tsx` | ~15 hardcoded dark values → tokens |
| Button variants | `src/components/ui/Button.tsx` | outline/ghost/secondary use semantic tokens |
| Glass utilities | `src/app/globals.css` | Strengthened shadows, GlowCTAButton CSS animations |

### Phase 2 — Showcase Section ✅
| Task | File | Notes |
|---|---|---|
| 3D garment models | `src/components/3d/GarmentModels.tsx` | 17 procedural garment types, `GARMENT_CATALOG` export |
| Product carousel | `src/components/sections/ProductShowcase.tsx` | 3-item view, Canvas only on active item, auto-advance 4s |
| Certifications grid | `src/components/sections/CertificationsDisplay.tsx` | 12 cert cards, stagger animation, hover lift |
| Client logos marquee | `src/components/sections/ClientLogos.tsx` | Infinite scroll, SVG paths in `public/assets/clients/`, placeholder fallback text |
| Showcase wrapper | `src/components/sections/ShowcaseSection.tsx` | Composes all 3 above |
| page.tsx swap | `src/app/page.tsx` | `ChaosToOrder` → `ShowcaseSection` |

### Phase 3 — Globe + CTA Button ✅
| Task | File | Notes |
|---|---|---|
| Remove globe scale | `src/components/sections/ScrollStory.tsx` | `globeScale` removed, height 260vh → 200vh |
| Disable globe zoom | `src/components/3d/Globe.tsx` | `controls.enableZoom = false` |
| GlowCTAButton | `src/components/ui/GlowCTAButton.tsx` | Rotating conic-gradient border, pulsing glow, ripple |
| Replace in hero | `src/components/sections/ScrollStory.tsx` | `LiquidMetalButton` → `GlowCTAButton` |
| Replace in CTA | `src/components/sections/CTASection.tsx` | `LiquidMetalButton` → `GlowCTAButton` |

### Phase 4 — Multi-Page Structure + Polish ✅
| Task | File | Notes |
|---|---|---|
| Root layout restructure | `src/app/layout.tsx` | Navbar + SharedFooter + SmoothScroll in layout |
| Homepage cleanup | `src/app/page.tsx` | Navbar/footer/SmoothScroll removed (now in layout) |
| Navbar multi-page | `src/components/ui/Navbar.tsx` | About/Partner links, mobile hamburger drawer |
| SharedFooter | `src/components/ui/SharedFooter.tsx` | Multi-column with nav links, address, copyright |
| AnimatedCounter | `src/components/ui/AnimatedCounter.tsx` | Scroll-triggered number animation |
| FAQAccordion | `src/components/ui/FAQAccordion.tsx` | Animated height expand/collapse |
| About page | `src/app/about/page.tsx` | Hero, mission+stats, values, location, CTA |
| Partner page | `src/app/partner/page.tsx` | Hero, benefits, how-it-works, certs, form, FAQ |
| PartnerForm | `src/components/sections/PartnerForm.tsx` | Full form with validation, success state |
| TypeScript build fixes | multiple | `ease` cast, `LucideIcon` type — build passes clean |
| SEO route layouts | `src/app/about/layout.tsx`, `src/app/partner/layout.tsx` | Per-route metadata + OpenGraph |
| CTA link audit | `GlowCTAButton.tsx`, `about/page.tsx` | Added `target` prop; external quote links use `_blank` |
| Lenis anchor scroll | `src/components/ui/SmoothScroll.tsx` | Hash anchor clicks intercepted and routed through Lenis |
| Legacy cleanup | `src/components/sections/` + `src/components/ui/` | 10 unused files deleted |

---

## Remaining Tasks

### HIGH PRIORITY

#### 1. Client Logo SVGs
**Status:** Component built, waiting for user assets
**What to do:**
- User will provide SVG files for: Amazon, Walmart, Disney, Gap, Levi's, Reebok
- Place them at: `public/assets/clients/amazon.svg`, `walmart.svg`, `disney.svg`, `gap.svg`, `levis.svg`, `reebok.svg`
- `ClientLogos.tsx` already references these paths — they'll automatically render when files exist
- Currently shows styled text placeholders (intentional fallback)

**File:** `src/components/sections/ClientLogos.tsx`

---

#### 2. PartnerForm — Wire Up API Submission
**Status:** UI-only (submit just calls `setSubmitted(true)`)
**What to do:**
- Replace the mock submit in `handleSubmit` with a real API call
- Options: Formspree (`https://formspree.io`), EmailJS, Resend, or a custom `/api/partner-apply` route
- Recommended: Next.js API route at `src/app/api/partner-apply/route.ts`

**File:** `src/components/sections/PartnerForm.tsx` (line ~59)
```ts
// Current (mock):
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  setSubmitted(true);  // ← replace with actual POST
};
```

**Skills to use:** `backend-api-design`, `next-api-routes`

---

#### 3. Build Verification
**Status:** Not yet run
**What to do:**
```bash
cd "scalular anti gravity"
npm run build
```
- Fix any TypeScript errors or missing imports
- Most likely issues:
  - `FAQAccordion` prop types (ensure `items` prop matches what `partner/page.tsx` passes)
  - `GlowCTAButton` `href` prop — ensure anchor renders correctly
  - `next/dynamic` usage in `ProductShowcase.tsx` — verify SSR behavior

---

### MEDIUM PRIORITY

#### 4. Stray `.claire` Directory Cleanup
**Status:** Accidentally created during this session
**What to do:**
```bash
rm -rf "/Users/vaibhavtomar/Documents/scalular anti gravity/.claire"
```
A file was accidentally written to `.claire/worktrees/busy-kirch/src/...` instead of `.claude/...`. Safe to delete the entire `.claire` directory.

---

#### 5. QuoteRequest Flow — Link Audit
**Status:** Some CTAs still link to `https://app.scalular.com/quote` (hardcoded)
**What to do:** Verify all CTA buttons that should go to the external app are consistent.
- `GlowCTAButton` with `href="https://app.scalular.com/quote"` — correct, opens in same tab
- About page CTA — ✅ links to `https://app.scalular.com/quote`
- Navbar quote icon — ✅ `target="_blank"` already set
- Consider whether CTAs should open in new tab (`target="_blank"`) or same tab

---

#### 6. SEO + Metadata per Page
**Status:** Only root layout has metadata
**What to do:** Add `export const metadata` to each page:

**`src/app/about/page.tsx`** — add at top (before the `'use client'` directive, or make it a server component with a separate client section):
```ts
export const metadata = {
  title: 'About Scalular | Global Apparel Sourcing',
  description: 'Scalular bridges fashion brands and factories worldwide. 20+ years, 30+ verified factory partners across 9 countries.',
};
```

**`src/app/partner/page.tsx`** — same pattern:
```ts
export const metadata = {
  title: 'Become a Factory Partner | Scalular',
  description: 'Join Scalular\'s verified factory network and connect with 200+ global fashion brands.',
};
```

**Note:** Pages with `'use client'` cannot export metadata directly. Either:
- Remove `'use client'` from page and move interactive bits to child components
- Create a separate `layout.tsx` inside `app/about/` and `app/partner/`

---

#### 7. Scroll-to-Form on Hero CTA (Partner Page)
**Status:** `href="#apply"` is used but smooth scroll may not work with Lenis
**What to do:** Verify Lenis handles anchor `#apply` scroll correctly. If not, add a click handler that calls `lenis.scrollTo('#apply')`.

---

### LOW PRIORITY

#### 8. ProductShowcase — Garment Rendering Polish
**Status:** 3D canvas renders but garment models are procedural/abstract
**What to do (optional):**
- Add subtle environment lighting (`<Environment preset="city" />` from `@react-three/drei`)
- Add soft shadows (`<ContactShadows />` from drei)
- Improve garment silhouettes with beveled edges (`THREE.EdgesGeometry` + outline pass)
- OR: Source real GLB garment models from Sketchfab (free tier available)

**Files:** `src/components/3d/GarmentModels.tsx`, `src/components/sections/ProductShowcase.tsx`
**Skills:** `3d-web-experience`, `mcp__11ac8ae4-165d-46d1-b0da-3c3a3ed56b9c__learn_threejs`

---

#### 9. Mobile UX Polish
**Status:** Basic responsive layout done
**What to do:**
- Verify ProductShowcase carousel touch swipe on mobile (uses `onTouchStart`/`onTouchEnd` — needs testing)
- Verify radial-orbital-timeline on mobile (may overflow on small screens)
- Verify GlowCTAButton tap states on iOS (`:active` doesn't always fire reliably)

---

#### 10. CLAUDE.md Update
**Status:** CLAUDE.md reflects the old single-page architecture
**What to do:** Update `CLAUDE.md` to reflect:
- Multi-page structure (`/`, `/about`, `/partner`)
- Light mode is now default (html class = `light`)
- New components list
- `ChaosToOrder.tsx` is now unused (legacy, can be deleted)
- Root layout includes Navbar, SharedFooter, SmoothScroll

---

#### 11. Delete Legacy Unused Components (Optional)
These files exist but are never rendered. Safe to delete if you want to clean up:
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

## Project Structure (Current State)

```
src/
  app/
    layout.tsx          ← Root: Navbar + SharedFooter + SmoothScroll (light mode)
    page.tsx            ← Home: ScrollStory + ShowcaseSection + ScalularServices + CTASection
    globals.css         ← All theming + GlowCTAButton CSS animations
    about/
      page.tsx          ← About Us page (NEW)
    partner/
      page.tsx          ← Become a Partner page (NEW)
  assets/               ← Brand logos
  components/
    3d/
      Globe.tsx         ← Light mode, zoom disabled
      GarmentModels.tsx ← 17 procedural garment types (NEW)
    sections/
      ScrollStory.tsx   ← Globe hero (no scale zoom, GlowCTAButton)
      ShowcaseSection.tsx ← Wrapper: Product + Certs + Logos (NEW)
      ProductShowcase.tsx ← 3D garment carousel (NEW)
      CertificationsDisplay.tsx ← 12 cert cards (NEW)
      ClientLogos.tsx   ← Brand logo marquee — NEEDS SVG FILES (NEW)
      PartnerForm.tsx   ← Factory application form — NEEDS API (NEW)
      ScalularServices.tsx ← Radial orbital timeline
      CTASection.tsx    ← Final CTA (semantic tokens)
    ui/
      Navbar.tsx        ← Multi-page links, mobile drawer
      SharedFooter.tsx  ← Shared footer (NEW)
      GlowCTAButton.tsx ← Animated CTA button (NEW)
      AnimatedCounter.tsx ← Scroll-triggered counter (NEW)
      FAQAccordion.tsx  ← Expandable Q&A (NEW)
      SmoothScroll.tsx  ← Lenis wrapper
      radial-orbital-timeline.tsx ← Fixed for light mode
      Button.tsx        ← Fixed variants
      liquid-metal-button.tsx ← Fixed contrast (kept, no longer primary CTA)
public/
  assets/
    clients/            ← PUT SVG FILES HERE (amazon.svg, walmart.svg, etc.)
```

---

## Tech Stack Reminders

- **Next.js 16.2.1 App Router** — server components by default, `'use client'` for anything with hooks/browser APIs
- **Tailwind v4** — no `tailwind.config.js`, all config in `globals.css` via `@theme inline` and `@utility`
- **Semantic tokens** — always use `bg-background`, `text-text-primary`, `text-primary`, `border-border`, `bg-surface`, etc. Never hardcode colors
- **Framer Motion 12** — `useInView` is in `framer-motion` (not `framer-motion/react`)
- **`next/dynamic({ ssr: false })`** — required for anything using `window`, Three.js, or react-globe.gl
- **`cn()` helper** — `import { cn } from '@/lib/utils'` for conditional Tailwind classes

---

## Design Tokens Quick Reference

```
bg-background      — page background (white in light mode)
bg-surface         — card/panel background
bg-surface-hover   — hover state for surfaces
text-text-primary  — main text
text-text-secondary — muted/secondary text
text-primary       — brand blue (#3B82F6)
text-accent        — bronze accent (#9E6F43)
border-border      — default borders
border-divider     — section dividers
glass-card         — glassmorphism card utility
glass-nav          — glassmorphism nav utility
text-gradient      — primary→accent gradient text
bg-mesh-gradient   — subtle mesh bg for sections
```
