'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { GlobeCdn } from '../ui/cobe-globe-cdn';
import { GetStartedButton } from '../ui/get-started-button';
import { ShieldCheck, Zap, Globe, MapPin, Award } from 'lucide-react';

/* ─── Factory data ─────────────────────────────── */
const FACTORY_DATA: Record<string, {
  flag: string; name: string; factories: number;
  specialties: string[]; certs: string[]; accent: string;
}> = {
  india: { flag: '🇮🇳', name: 'India', factories: 24, specialties: ['Cotton', 'Knitwear', 'Embroidery', 'Sustainable'], certs: ['GOTS', 'OEKO-TEX', 'OCS'], accent: '#F97316' },
  bangladesh: { flag: '🇧🇩', name: 'Bangladesh', factories: 42, specialties: ['Basics', 'Volume Production', 'Jersey', 'Woven'], certs: ['BSCI', 'WRAP', 'ISO 9001'], accent: '#22C55E' },
  turkey: { flag: '🇹🇷', name: 'Turkey', factories: 18, specialties: ['Premium Fashion', 'Speed', 'Cut & Sew'], certs: ['EU Standards', 'SA8000'], accent: '#EF4444' },
  vietnam: { flag: '🇻🇳', name: 'Vietnam', factories: 31, specialties: ['Technical', 'Performance', 'Activewear'], certs: ['Bluesign®', 'Higg Index'], accent: '#DC2626' },
  china: { flag: '🇨🇳', name: 'China', factories: 22, specialties: ['Scale', 'Technology', 'Accessories'], certs: ['ISO 9001', 'OEKO-TEX'], accent: '#EAB308' },
  pakistan: { flag: '🇵🇰', name: 'Pakistan', factories: 15, specialties: ['Denim', 'Woven Basics', 'Cotton'], certs: ['OEKO-TEX', 'GOTS'], accent: '#16A34A' },
  portugal: { flag: '🇵🇹', name: 'Portugal', factories: 8, specialties: ['Luxury', 'Sustainable', 'EU Made'], certs: ['GOTS', 'EU Ecolabel'], accent: '#7C3AED' },
  morocco: { flag: '🇲🇦', name: 'Morocco', factories: 12, specialties: ['EU-Nearshore', 'Fast Fashion', 'Quick Turn'], certs: ['SA8000', 'OEKO-TEX'], accent: '#BE123C' },
  srilanka: { flag: '��🇰', name: 'Sri Lanka', factories: 14, specialties: ['Lingerie', 'Activewear', 'Intimate Apparel'], certs: ['ISO 9001', 'OEKO-TEX'], accent: '#0891B2' },
};

/* ─── Clean, professional country card ───────────────────────────────────────── */
function FactoryCard({ id }: { id: string }) {
  const d = FACTORY_DATA[id];
  if (!d) return null;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as Easing }}
      className="w-full max-w-[340px] bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative z-30"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-3xl leading-none">{d.flag}</span>
            <h3 className="text-xl font-bold text-text-primary leading-none tracking-tight">{d.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin className="w-3.5 h-3.5" />
            <p className="text-[11px] font-bold uppercase tracking-[0.15em]">Sourcing Hub</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black leading-none tracking-tighter" style={{ color: d.accent }}>{d.factories}</div>
          <div className="text-[10px] text-text-secondary font-bold uppercase mt-2 tracking-widest">Facilities</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-3">Specializations</div>
        <div className="flex flex-wrap gap-2">
          {d.specialties.map((s) => (
            <span key={s} className="text-[10px] font-bold px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5 text-text-primary">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-5 border-t border-border/60">
        <div className="flex flex-wrap gap-4">
          {d.certs.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Award className="w-4 h-4 text-text-secondary" />
              <span className="text-[11px] font-bold text-text-secondary tracking-widest uppercase">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const STATS = [
  { icon: ShieldCheck, value: '115+', label: 'Certified Factories' },
  { icon: Globe, value: '9', label: 'Countries' },
  { icon: Zap, value: 'AI', label: 'Instant Quote' },
];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.7, ease: [0.22, 1, 0.36, 1] as Easing }
  })
};

/* ─── Main component ───────────────────────────────────────────────────── */
export function ScrollStory() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const keys = Object.keys(FACTORY_DATA);

  return (
    <div id="regions" className="relative w-full bg-background min-h-screen pt-24 md:pt-32 pb-16 flex flex-col items-center overflow-hidden">

      {/* ── Hero text (Centered) ── */}
      <div className="w-full max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center relative mb-12 md:mb-16">
        <motion.p
          custom={0.1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary mb-5"
        >
          Scale Your Global Production
        </motion.p>

        <motion.h1
          custom={0.25}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tighter mb-6 max-w-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Direct Access to <br />
          <span className="text-primary">World-Class Sourcing.</span>
        </motion.h1>

        <motion.p
          custom={0.4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-10"
        >
          Manage your production lifecycle with AI-driven insights and pre-vetted
          manufacturing partners across 9 global sourcing hubs.
        </motion.p>

        <motion.div
          custom={0.55}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <GetStartedButton
            label="Get Your Instant Quote"
            size="lg"
            href="https://app.scalular.com/quote"
            target="_blank"
          />
        </motion.div>
      </div>

      {/* ── Main Interactive Scene ── */}
      <div className="w-full max-w-screen-2xl mx-auto relative flex flex-col items-center min-h-[500px] md:min-h-[700px]">
        {/* 1. Globe (Strictly Centered) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] as Easing }}
          className="w-full max-w-[400px] md:max-w-[650px] aspect-square relative z-10 flex items-center justify-center shrink-0"
        >
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none opacity-40" />
          <GlobeCdn
            speed={0.0022}
            activeId={selectedId}
            onActiveChange={setSelectedId}
            className="w-full h-full"
          />
        </motion.div>

        {/* Desktop Layout: Absolute Right Side Overlay */}
        <div className="hidden lg:flex absolute top-0 bottom-0 right-0 w-[45%] items-center justify-end pr-8 xl:pr-16 pointer-events-none z-30">
          {/* Pin the items to the right side of the container leaving maximum space for the globe */}
          <div className="flex items-center gap-6 lg:gap-10 xl:gap-16 pointer-events-auto">
            {/* Factory Card */}
            <div className="w-full max-w-[300px] xl:max-w-[340px] shrink-0">
              <AnimatePresence mode="wait">
                {selectedId && <FactoryCard id={selectedId} />}
              </AnimatePresence>
            </div>

            {/* Nav Dots */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col items-start gap-4 xl:gap-5"
              role="tablist"
              aria-label="Sourcing Regions"
            >
              {keys.map(id => {
                const d = FACTORY_DATA[id];
                const isActive = selectedId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedId(id)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="region-card"
                    className="group flex items-center gap-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 py-0.5"
                  >
                    <div
                      className="rounded-full transition-all duration-300 shrink-0"
                      style={{
                        background: isActive ? d.accent : 'var(--border)',
                        boxShadow: isActive ? `0 0 16px ${d.accent}b0` : 'none',
                        width: isActive ? 12 : 8,
                        height: isActive ? 12 : 8,
                      }}
                    />
                    <span className={`text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary/40 group-hover:text-text-secondary'
                      }`}>
                      {d.name}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout: Flow Below Globe */}
        <div className="flex lg:hidden flex-col items-center w-full px-6 -mt-10 md:-mt-16 z-30 pointer-events-auto gap-8 mb-8">
          <div className="w-full flex justify-center min-h-[280px]" id="region-card">
            <AnimatePresence mode="wait">
              {selectedId && <FactoryCard id={selectedId} />}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-wrap justify-center gap-2 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full"
            role="tablist"
            aria-label="Sourcing Regions"
          >
            <div className="w-full text-center text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-1 opacity-60">Sourcing Hubs</div>
            {keys.map(id => {
              const d = FACTORY_DATA[id];
              const isActive = selectedId === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedId(id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="region-card"
                  className="group flex flex-col items-center justify-center gap-2 transition-all duration-300 p-2 min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                >
                  <div
                    className="rounded-full transition-all duration-300 shrink-0"
                    style={{
                      background: isActive ? d.accent : 'var(--border)',
                      boxShadow: isActive ? `0 0 12px ${d.accent}b0` : 'none',
                      width: isActive ? 8 : 6,
                      height: isActive ? 8 : 6,
                    }}
                  />
                  <span className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary/60'
                    }`}>
                    {d.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Stats row below the scene */}
      <motion.div
        custom={1.1}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center items-center gap-6 md:gap-16 mt-12 md:mt-2 relative z-20"
      >
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4 text-left p-2">
            <div className="w-12 h-12 border border-border flex items-center justify-center shrink-0 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="text-2xl font-black text-text-primary leading-none tracking-tighter mb-1.5">{value}</div>
              <div className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.15em]">{label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
