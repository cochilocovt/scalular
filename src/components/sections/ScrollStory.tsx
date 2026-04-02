'use client';

import { useState, useRef } from 'react';
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring, useMotionValueEvent,
} from 'framer-motion';
import { ScalularGlobe } from '../3d/Globe';
import { GlowCTAButton } from '../ui/GlowCTAButton';
import { ShieldCheck, Zap, Globe, X, MapPin, Award } from 'lucide-react';

/* ─── Factory data for glassmorphism cards ─────────────────────────────── */
const FACTORY_DATA: Record<string, {
  flag: string; name: string; factories: number;
  specialties: string[]; certs: string[]; accent: string;
}> = {
  india:      { flag: '🇮🇳', name: 'India',      factories: 24, specialties: ['Cotton', 'Knitwear', 'Embroidery', 'Sustainable'], certs: ['GOTS', 'OEKO-TEX', 'OCS'],       accent: '#F97316' },
  bangladesh: { flag: '🇧🇩', name: 'Bangladesh', factories: 42, specialties: ['Basics', 'Volume Production', 'Jersey', 'Woven'],  certs: ['BSCI', 'WRAP', 'ISO 9001'],     accent: '#22C55E' },
  turkey:     { flag: '🇹🇷', name: 'Turkey',     factories: 18, specialties: ['Premium Fashion', 'Speed', 'Cut & Sew'],           certs: ['EU Standards', 'SA8000'],       accent: '#EF4444' },
  vietnam:    { flag: '🇻🇳', name: 'Vietnam',    factories: 31, specialties: ['Technical', 'Performance', 'Activewear'],          certs: ['Bluesign®', 'Higg Index'],      accent: '#DC2626' },
  china:      { flag: '🇨🇳', name: 'China',      factories: 22, specialties: ['Scale', 'Technology', 'Accessories'],              certs: ['ISO 9001', 'OEKO-TEX'],         accent: '#EAB308' },
  pakistan:   { flag: '🇵🇰', name: 'Pakistan',   factories: 15, specialties: ['Denim', 'Woven Basics', 'Cotton'],                 certs: ['OEKO-TEX', 'GOTS'],             accent: '#16A34A' },
  portugal:   { flag: '🇵🇹', name: 'Portugal',   factories: 8,  specialties: ['Luxury', 'Sustainable', 'EU Made'],               certs: ['GOTS', 'EU Ecolabel'],          accent: '#7C3AED' },
  morocco:    { flag: '🇲🇦', name: 'Morocco',    factories: 12, specialties: ['EU-Nearshore', 'Fast Fashion', 'Quick Turn'],      certs: ['SA8000', 'OEKO-TEX'],           accent: '#BE123C' },
  srilanka:   { flag: '🇱🇰', name: 'Sri Lanka',  factories: 14, specialties: ['Lingerie', 'Activewear', 'Intimate Apparel'],      certs: ['ISO 9001', 'OEKO-TEX'],         accent: '#0891B2' },
};

/* ─── Glassmorphism country card ───────────────────────────────────────── */
function FactoryCard({ id, onClose }: { id: string; onClose: () => void }) {
  const d = FACTORY_DATA[id];
  if (!d) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.88, y: 20  }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-24 right-6 md:right-10 z-30 w-72 md:w-80 glass-card rounded-2xl p-5 pointer-events-auto"
      style={{ boxShadow: `0 0 40px ${d.accent}22, 0 8px 32px rgba(0,0,0,0.4)` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl leading-none">{d.flag}</span>
          <div>
            <h3 className="text-base font-black text-text-primary leading-tight">{d.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" style={{ color: d.accent }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: d.accent }}>
                Active Sourcing Region
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary bg-black/5 hover:bg-black/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Factory count */}
      <div
        className="rounded-xl p-3 mb-4 flex items-center gap-3"
        style={{ background: `${d.accent}15`, border: `1px solid ${d.accent}30` }}
      >
        <span className="text-4xl font-black leading-none" style={{ color: d.accent }}>
          {d.factories}
        </span>
        <div>
          <div className="text-xs font-bold text-text-primary">Certified Factories</div>
          <div className="text-[10px] text-text-secondary">Available for sourcing</div>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-3">
        <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Specialises in</div>
        <div className="flex flex-wrap gap-1.5">
          {d.specialties.map((s) => (
            <span
              key={s}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${d.accent}18`, color: d.accent, border: `1px solid ${d.accent}30` }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="pt-3 border-t border-divider">
        <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Certifications</div>
        <div className="flex flex-wrap gap-2">
          {d.certs.map((c) => (
            <div key={c} className="flex items-center gap-1">
              <Award className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-bold text-text-secondary">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Futuristic word-by-word text reveal ──────────────────────────────── */
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Stat pill ────────────────────────────────────────────────────────── */
const STATS = [
  { icon: ShieldCheck, value: '115+', label: 'Certified Factories' },
  { icon: Globe,       value: '9',    label: 'Countries' },
  { icon: Zap,         value: 'AI',   label: 'Instant Quote' },
];

/* ─── Main component ───────────────────────────────────────────────────── */
export function ScrollStory() {
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [textActive,  setTextActive]  = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.8 });

  // Globe: full opacity, fades out as hero text appears
  const globeOpacity = useTransform(smooth, [0, 0.55, 0.80, 0.92], [1, 1, 0.8, 0]);
  // No scroll-driven scale — globe stays at fixed size

  // "Click a country" hint fades out at 18%
  const hintOpacity  = useTransform(smooth, [0, 0.15, 0.25], [1, 1, 0]);

  // Hero text: fades in 25–40%, stays, fades out 75–88%
  // Positioned in lower half of the globe
  const textOpacity  = useTransform(smooth, [0.25, 0.40, 0.72, 0.88], [0, 1, 1, 0]);
  const textY        = useTransform(smooth, [0.25, 0.42], [40, 0]);

  // Gradient veil — darker at top, lighter at bottom so text is readable
  const veilOpacity  = useTransform(smooth, [0.22, 0.42], [0, 0.6]);

  // Trigger futuristic word-reveal when text crosses threshold
  useMotionValueEvent(smooth, 'change', (v) => {
    if (v > 0.24 && !textActive) setTextActive(true);
    if (v < 0.20 && textActive) setTextActive(false);
  });

  const handlePointClick = (point: any) => {
    if (point.isBuyer) return;           // only factory countries
    setSelectedId((prev) => prev === point.id ? null : point.id);
  };

  return (
    <div
      ref={containerRef}
      id="regions"
      className="relative w-full bg-background"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* ── Globe layer ─────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: globeOpacity }}
        >
          <ScalularGlobe
            activeRegion="global"
            onPointClick={handlePointClick}
          />
        </motion.div>

        {/* ── Gradient veil so text is readable over globe (stronger at bottom) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: veilOpacity,
            background: 'linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 80%, transparent) 35%, color-mix(in srgb, var(--background) 40%, transparent) 55%, color-mix(in srgb, var(--background) 10%, transparent) 70%, transparent 100%)'
          }}
        />

        {/* ── "Click a country" hint ───────────────────── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary/80">
            Tap a country to see factories
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-[1px] h-10 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </motion.div>

        {/* ── Factory glassmorphism card ────────────────── */}
        <AnimatePresence>
          {selectedId && (
            <FactoryCard
              id={selectedId}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>

        {/* ── Hero text overlay (scroll-driven) — positioned in lower half ─────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh] px-6 text-center pointer-events-none"
        >
          {/* Tag */}
          {textActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-8 pointer-events-auto"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              115+ Certified Factories Worldwide
            </motion.div>
          )}

          {/* Headline — futuristic word-by-word reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-primary leading-[1.05] tracking-tighter max-w-4xl mb-6">
            {textActive && (
              <>
                <WordReveal text="Find Your Factory" delay={0} />
                <br />
                <span className="text-gradient">
                  <WordReveal text="Instantly." delay={0.25} />
                </span>
              </>
            )}
          </h1>

          {/* Subtext */}
          {textActive && (
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mb-10 font-medium pointer-events-auto"
            >
              Stop spending weeks searching for manufacturers you can&apos;t trust.
              Get matched to certified factories — with an instant AI quote, free.
            </motion.p>
          )}

          {/* CTA */}
          {textActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1  }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="relative group pointer-events-auto mb-14"
            >
              <GlowCTAButton
                label="Get Your Free Quote"
                size="lg"
                onClick={() => window.open('https://app.scalular.com/quote', '_blank')}
              />
            </motion.div>
          )}

          {/* Stats row */}
          {textActive && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pointer-events-auto"
            >
              {STATS.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ duration: 0.4, delay: 1.05 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full neu-btn flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-text-primary leading-none">{value}</div>
                    <div className="text-[11px] text-text-secondary font-semibold mt-0.5">{label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ── Right-side dot nav (globe phase only) ──────── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 pointer-events-auto"
        >
          {Object.entries(FACTORY_DATA).map(([id, d]) => (
            <button
              key={id}
              onClick={() => setSelectedId((prev) => prev === id ? null : id)}
              title={d.name}
              className="group flex items-center justify-end gap-2"
            >
              <span className="text-[9px] font-bold tracking-widest uppercase text-text-secondary/0 group-hover:text-text-secondary/60 transition-all duration-200">
                {d.name}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: selectedId === id ? d.accent : 'rgba(0,0,0,0.2)',
                  boxShadow: selectedId === id ? `0 0 8px ${d.accent}` : 'none',
                  width: selectedId === id ? 6 : 5,
                  height: selectedId === id ? 6 : 5,
                }}
              />
            </button>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
