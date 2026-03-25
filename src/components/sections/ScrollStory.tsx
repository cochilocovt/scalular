'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { ScalularGlobe } from '../3d/Globe';
import { ShieldCheck, Zap, Globe, Activity, MapPin } from 'lucide-react';
import { LiquidMetalButton } from '../ui/liquid-metal-button';
import { Button } from '../ui/Button';
import Image from 'next/image';
import logoIcon from '@/assets/logo-icon.png';

const CHAPTERS = [
  {
    id: 'hero',
    region: 'global',
    tag: 'Global Apparel Infrastructure',
    headline: 'Source the world\'s best factories with precision.',
    body: 'Scalular connects high-growth fashion brands to a network of 115+ pre-audited factories across 9 countries — using real-time data to eliminate sourcing chaos.',
    stats: [
      { icon: ShieldCheck, value: '115+', label: 'Vetted factories' },
      { icon: Globe, value: '9',    label: 'Sourcing regions' },
      { icon: Zap, value: '48h',   label: 'Quote turnaround' },
    ],
    hasCTA: true,
  },
  {
    id: 'india',
    region: 'india',
    tag: '🇮🇳 India',
    headline: 'Cotton, knitwear and craft.',
    body: 'India excels in intricate embroidery, sustainable cotton, and premium knitwear. Our 24 partner factories cover sampling to large-scale production with GOTS-certified options.',
    stats: [
      { icon: MapPin, value: '24', label: 'Active partners' },
      { icon: ShieldCheck, value: 'GOTS', label: 'Certified capacity' },
    ],
    hasCTA: false,
  },
  {
    id: 'bangladesh',
    region: 'bangladesh',
    tag: '🇧🇩 Bangladesh',
    headline: 'Volume production, globally compliant.',
    body: 'The world\'s leading destination for high-volume jersey and woven basics. 42 compliance-certified factories delivering at price points that work.',
    stats: [
      { icon: MapPin, value: '42', label: 'Factories' },
      { icon: Zap, value: '45d', label: 'Avg lead time' },
    ],
    hasCTA: false,
  },
  {
    id: 'turkey',
    region: 'turkey',
    tag: '🇹🇷 Turkey',
    headline: 'Speed and premium finish.',
    body: 'Turkish factories combine EU-standard quality with fast turnaround times — critical for brands running tight seasonal windows and elevated collections.',
    stats: [
      { icon: MapPin, value: '18', label: 'Factories' },
      { icon: ShieldCheck, value: 'EU', label: 'Standards compliant' },
    ],
    hasCTA: false,
  },
  {
    id: 'vietnam',
    region: 'vietnam',
    tag: '🇻🇳 Vietnam',
    headline: 'Technical and performance.',
    body: `Vietnam's factories are equipped for the most complex technical specs — outerwear, activewear, and engineered performance garments.`,
    stats: [
      { icon: MapPin, value: '31', label: 'Factories' },
      { icon: Activity, value: 'Bluesign®', label: 'Partner mills' },
    ],
    hasCTA: false,
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x * 15);
    mouseY.set(y * -15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = CHAPTERS.length;
    const idx = Math.min(total - 1, Math.floor(latest * total * 1.05)); // Slight buffer for easier snapping
    if (idx !== activeIdx && idx >= 0) {
      setActiveIdx(idx);
    }
  });

  const chapter = CHAPTERS[activeIdx];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-background" 
      id="regions"
      style={{ height: `${CHAPTERS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_60%_50%,rgba(59,130,246,0.08),rgba(7,17,31,0))]" />

        <div className="absolute inset-0">
          <ScalularGlobe activeRegion={chapter.region ?? 'global'} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/20 to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center pt-24 pointer-events-none">
          <div className="w-full max-w-2xl px-8 md:px-20 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX: mouseY,
                  rotateY: mouseX,
                  transformStyle: 'preserve-3d',
                }}
                className="p-4 rounded-3xl border-none max-w-md relative overflow-visible group cursor-default"
              >
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-blue-400/80">
                      <Image src={logoIcon} alt="Scalular Icon" width={12} height={12} className="w-3 h-3" />
                      {chapter.tag}
                    </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tighter">
                    {chapter.headline}
                  </h2>
                  
                  <p className="text-sm md:text-base text-text-secondary/80 leading-relaxed mb-8 font-medium max-w-[340px]">
                    {chapter.body}
                  </p>
                  
                  {chapter.hasCTA && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4"
                    >
                      <LiquidMetalButton 
                        label="Get Instant Quote" 
                        width={240} // Explicitly wider for the long label
                        onClick={() => window.open('https://app.scalular.com/quote', '_blank')} 
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                const targetScroll = (i / CHAPTERS.length) * (containerRef.current?.offsetHeight ?? 0);
                window.scrollTo({ top: (containerRef.current?.offsetTop ?? 0) + targetScroll, behavior: 'smooth' });
              }}
              className="group relative flex items-center justify-end"
            >
              <span className={`absolute right-6 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 ${i === activeIdx ? 'text-blue-400' : 'text-white/40'}`}>
                {c.id}
              </span>
              <div className={`w-1.5 rounded-full transition-all duration-500 ${
                i === activeIdx
                  ? 'h-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                  : 'h-1.5 bg-white/10 hover:bg-white/30 cursor-pointer'
              }`} />
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary/40"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explore Infrastructure</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
