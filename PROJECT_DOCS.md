# Scalular Landing Page - Project Documentation

## Project Overview

**Scalular** is a Next.js landing page for a global apparel sourcing platform that helps brands discover, compare, and work with vetted apparel manufacturers.

### Tech Stack
- **Framework**: Next.js 16.2.1 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4 + custom CSS utilities
- **Animations**: Framer Motion, GSAP
- **3D Globe**: react-globe.gl with Three.js
- **Smooth Scroll**: lenis
- **Icons**: Lucide React

---

## Page Structure

The page is a single-page scroll experience with the following sections:

### 1. **ScrollStory (Hero Section)** - `src/components/sections/ScrollStory.tsx`
- Full-screen 3D interactive globe showing global factory locations
- Scroll-driven text reveal animations
- Glassmorphism country cards showing factory details
- Stats display: 115+ factories, 9 countries, AI instant quotes
- CTA button to get free quote

**Key Data**: 9 sourcing regions (India, Bangladesh, Turkey, Vietnam, China, Pakistan, Portugal, Morocco, Sri Lanka) with factory counts, specialties, and certifications.

### 2. **ChaosToOrder** - `src/components/sections/ChaosToOrder.tsx`
- Scroll-triggered animation showing supply chain chaos organizing into order
- 64 floating supply chain icons (ships, trucks, planes, factories, etc.)
- Transition from chaos (scattered) → converging → fixed (logo centered)
- Message transformation from "Sourcing is a mess" to "Scalular changes that"

### 3. **ScalularServices** - `src/components/sections/ScalularServices.tsx`
- Radial orbital timeline with 8 services displayed around a central logo
- Interactive nodes: Instant Quote, Factory-Direct Pricing, Flexible Payments, 115+ Verified Factories, Certified Quality, Full Transparency, On-The-Ground Team, Live Order Updates
- Auto-rotation with click-to-expand functionality
- Related services linking

### 4. **CTASection** - `src/components/sections/CTASection.tsx`
- Final conversion section with headline "Your Factory, Instantly"
- Trust badges: Pre-audited Factories, Instant AI Quote, 200+ Brands Served, Data Secure
- Two CTAs: Get Instant Quote, Book a Strategy Call

### 5. **Footer** - Inline in `page.tsx`
- Logo, navigation links, copyright

---

## Components

### UI Components
| Component | Path | Description |
|-----------|------|-------------|
| Navbar | `src/components/ui/Navbar.tsx` | Fixed header with logo, nav links, theme toggle, quote button |
| ThemeToggle | `src/components/ui/ThemeToggle.tsx` | Dark/light mode switch |
| ThemeProvider | `src/components/ui/ThemeProvider.tsx` | Theme context provider |
| SmoothScroll | `src/components/ui/SmoothScroll.tsx` | Lenis smooth scroll wrapper |
| LiquidMetalButton | `src/components/ui/liquid-metal-button.tsx` | Animated CTA button |
| RadialOrbitalTimeline | `src/components/ui/radial-orbital-timeline.tsx` | Interactive orbital services display |
| Badge | `src/components/ui/badge.tsx` | Status badges |
| Button | `src/components/ui/ui-button.tsx` | Reusable button |
| Card | `src/components/ui/ui-card.tsx` | Glassmorphism card |
| StatPill | `src/components/ui/StatPill.tsx` | Stats display |

### 3D Components
| Component | Path | Description |
|-----------|------|-------------|
| ScalularGlobe | `src/components/3d/Globe.tsx` | Interactive 3D globe with factory/buyer nodes and route arcs |

---

## Design System

### Color Palette (Dark Theme - Default)
- **Background**: `#0D1117` (OLED deep navy)
- **Surface**: `#161B25`
- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#1E40AF` (Dark blue)
- **Accent**: `#F59E0B` (Amber)
- **Text Primary**: `#F8FAFC`
- **Text Secondary**: `#C0D0E0`
- **Divider**: `rgba(255, 255, 255, 0.06)`

### Custom Utilities (globals.css)
- `glass-panel`, `glass-card`, `glass-nav` - Glassmorphism effects
- `neu-card`, `neu-btn`, `neu-inset` - Neumorphic effects
- `text-gradient` - Gradient text effect
- `shadow-orbital`, `bg-gradient-orbital` - Orbital shadows

### Typography
- **Font**: M PLUS Code Latin (Google Fonts)
- Variable weights: 100-700

---

## Assets
Located in `src/assets/`:
- `logo-icon.png` - Icon version
- `logo-black-horizontal.png`, `logo-white-horizontal.png` - Horizontal logos
- `logo-black-vertical.png`, `logo-white-vertical.png` - Vertical logos
- `logo.png` - Main logo

---

## Key Dependencies
```json
{
  "next": "16.2.1",
  "react": "19.2.4",
  "framer-motion": "^12.38.0",
  "react-globe.gl": "^2.37.0",
  "three": "^0.183.2",
  "lenis": "^1.3.20",
  "tailwindcss": "^4"
}
```

---

## Running the Project
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint