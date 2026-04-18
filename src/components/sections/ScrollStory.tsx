'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { GlobeCdn } from '../ui/cobe-globe-cdn';
import { GetStartedButton } from '../ui/get-started-button';
import { MapPin, Award } from 'lucide-react';
import { FACTORY_MAP, FACTORY_IDS } from '@/data/factories';

/* ─── Factory data (derived from shared source of truth) ─── */
const FACTORY_DATA = Object.fromEntries(
  Object.entries(FACTORY_MAP).map(([id, f]) => [id, {
    flag: f.flag,
    name: f.name,
    factories: f.factoryCount,
    specialties: f.specialties,
    certs: f.certifications,
    accent: f.accentColor,
  }])
);

/* ─── Compact country card ─────────────────────────────────────────────── */
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
      className="w-full max-w-[180px] xl:max-w-[200px] bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative z-30 flex flex-col items-center text-center"
    >
      <div className="flex flex-col items-center mb-3">
        <span className="text-[2.5rem] leading-[1.1] mb-1 drop-shadow-sm">{d.flag}</span>
        <h3 className="text-lg font-black text-text-primary leading-none tracking-tight">{d.name}</h3>
        <div className="flex items-center gap-1.5 text-text-secondary mt-1.5 opacity-70">
          <MapPin className="w-3 h-3" />
          <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Sourcing Hub</p>
        </div>
      </div>

      <div className="mb-3 mt-1">
        <div className="text-[3.5rem] font-black leading-[0.8] tracking-tighter" style={{ color: d.accent }}>{d.factories}</div>
        <div className="text-[10px] text-text-secondary font-bold uppercase mt-1.5 tracking-[0.25em] opacity-80">Facilities</div>
      </div>

      <div className="w-full pt-3 border-t border-border/60 flex flex-col gap-2">
        {d.certs.map((c) => (
          <div key={c} className="flex items-center justify-center gap-2">
            <Award className="w-3 h-3 text-text-secondary opacity-60" />
            <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">{c}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}



const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.7, ease: [0.22, 1, 0.36, 1] as Easing }
  })
};

const rotatingPhrases = [
  "Instant Quotes",
  "Competitive Pricing",
  "30+ Certified Factories",
  "On-Ground Support",
  "Live Order Tracking",
];

/* ─── Main component ───────────────────────────────────────────────────── */
export function ScrollStory() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const keys = FACTORY_IDS;
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) =>
        prev === rotatingPhrases.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, rotatingPhrases.length]);

  return (
    <div id="regions" className="relative w-full bg-background min-h-screen pt-16 md:pt-20 pb-16 flex flex-col items-center overflow-hidden">

      {/* ── Hero text (Centered) ── */}
      <div className="w-full max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center relative mb-12 md:mb-16">


        <motion.h1
          custom={0.25}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tighter mb-6 max-w-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Direct Access to <br />
          <span className="text-primary inline-grid overflow-hidden w-full py-1 -my-1">
            {rotatingPhrases.map((phrase, index) => {
              const isActive = titleNumber === index;
              const isPrevious = (titleNumber - 1 + rotatingPhrases.length) % rotatingPhrases.length === index;

              return (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? "0%" : isPrevious ? "-100%" : "100%",
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className={`col-start-1 row-start-1 w-full text-center ${isActive ? '' : 'pointer-events-none'}`}
                  aria-hidden={!isActive}
                >
                  {phrase}.
                </motion.span>
              );
            })}
          </span>
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
            withLamp={true}
            className="mt-12 mb-4"
          />
        </motion.div>
      </div>

      {/* ── Main Interactive Scene ── */}
      <div className="w-full max-w-screen-2xl mx-auto relative flex flex-col items-center min-h-[350px] md:min-h-[550px] px-0 lg:px-4 xl:px-16">
        {/* 1. Globe (Strictly Centered) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] as Easing }}
          className="w-full max-w-[280px] md:max-w-[500px] lg:max-w-[700px] aspect-square relative z-10 flex items-center justify-center shrink-0"
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
        <div className="hidden lg:flex absolute top-0 bottom-0 right-0 w-[40%] items-center justify-end pr-8 xl:pr-16 pointer-events-none z-30">
          {/* Narrower Card keeps it completely clear of the centered globe */}
          <div className="flex items-center gap-8 xl:gap-16 pointer-events-auto">
            {/* Factory Card Wrapper */}
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(10px)', x: -20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] as Easing }}
              className="w-full max-w-[180px] xl:max-w-[200px] shrink-0"
            >
              <AnimatePresence mode="wait">
                {selectedId && <FactoryCard id={selectedId} />}
              </AnimatePresence>
            </motion.div>

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
                        boxShadow: isActive ? `0 0 16px color-mix(in srgb, ${d.accent} 69%, transparent)` : 'none',
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
        <div className="flex lg:hidden flex-col items-center w-full px-6 mt-4 md:mt-8 z-30 pointer-events-auto gap-4 mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] as Easing }}
            className="w-full flex justify-center min-h-[200px]" 
            id="region-card"
          >
            <AnimatePresence mode="wait">
              {selectedId && <FactoryCard id={selectedId} />}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-wrap justify-center gap-2 bg-neutral-200/40 backdrop-blur-md p-3 rounded-2xl border border-neutral-200 w-full"
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
                      boxShadow: isActive ? `0 0 12px color-mix(in srgb, ${d.accent} 69%, transparent)` : 'none',
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


    </div>
  );
}
