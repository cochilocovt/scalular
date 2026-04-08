'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/* ─── Brand config ─────────────────────────────────────────
   Provide SVG files at:
   src/assets/clients/amazon.svg
   src/assets/clients/walmart.svg
   src/assets/clients/disney.svg
   src/assets/clients/gap.svg
   src/assets/clients/levis.svg
   src/assets/clients/reebok.svg

   Until then, styled text fallbacks render automatically.
──────────────────────────────────────────────────────────── */
interface Brand {
  id: string;
  name: string;
  svgPath?: string;
  textStyle?: string;
}

const BRANDS: Brand[] = [
  { id: 'amazon', name: 'amazon', svgPath: '/assets/clients/amazon.svg', textStyle: 'font-bold italic tracking-tighter' },
  { id: 'walmart', name: 'Walmart', svgPath: '/assets/clients/walmart.svg', textStyle: 'font-bold tracking-tight' },
  { id: 'disney', name: 'DISNEY', svgPath: '/assets/clients/disney.svg', textStyle: 'font-bold tracking-widest' },
  { id: 'gap', name: 'GAP', svgPath: '/assets/clients/gap.svg', textStyle: 'font-bold tracking-[0.4em]' },
  { id: 'levis', name: "Levi's", svgPath: '/assets/clients/levis.svg', textStyle: 'font-bold italic' },
  { id: 'reebok', name: 'REEBOK', svgPath: '/assets/clients/reebok.svg', textStyle: 'font-bold tracking-widest' },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center justify-center px-8 shrink-0 group">
      <div className="opacity-30 grayscale group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-500 select-none">
        <span
          className={`text-2xl md:text-3xl text-text-primary ${brand.textStyle}`}
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {brand.name}
        </span>
      </div>
    </div>
  );
}

/* Infinite marquee — duplicates items for seamless loop */
function Marquee({ children, speed = 40 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden w-full relative">
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />

      <motion.div
        className="flex items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {/* Render twice for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <div className="w-full py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-3"
        >
          Trusted By
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-2xl md:text-4xl font-bold text-text-primary tracking-tighter mb-2"
        >
          Brands That Source <span className="text-primary">Smarter</span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-text-secondary text-base max-w-md mx-auto"
        >
          200+ global brands trust Scalular for their apparel sourcing needs.
        </motion.p>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Marquee speed={35}>
          {BRANDS.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </Marquee>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 md:mt-12 px-4"
      >
        {[
          { value: '200+', label: 'Brands Served' },
          { value: '3,000+', label: 'Orders Completed' },
          { value: '20+', label: 'Years Experience' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary tracking-tighter">{value}</div>
            <div className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest mt-1 md:mt-0.5">{label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
