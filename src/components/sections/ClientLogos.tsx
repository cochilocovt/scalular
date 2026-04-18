'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Brand {
  id: string;
  name: string;
  src: string;
}

const BRANDS: Brand[] = [
  { id: 'amazon', name: 'Amazon', src: '/images/brand_logos/amazon.svg' },
  { id: 'beverly-hills-polo-club', name: 'Beverly Hills Polo Club', src: '/images/brand_logos/beverly-hills-polo-club.svg' },
  { id: 'caterpillar', name: 'Caterpillar', src: '/images/brand_logos/caterpillar.svg' },
  { id: 'centric-brands', name: 'Centric Brands', src: '/images/brand_logos/centric-brands.svg' },
  { id: 'copper-denim', name: 'Copper Denim', src: '/images/brand_logos/copper-denim.svg' },
  { id: 'dickies', name: 'Dickies', src: '/images/brand_logos/dickies.svg' },
  { id: 'disney', name: 'Disney', src: '/images/brand_logos/disney.svg' },
  { id: 'dockers', name: 'Dockers', src: '/images/brand_logos/dockers.svg' },
  { id: 'g-iii-apparel', name: 'G-III Apparel', src: '/images/brand_logos/g-iii-apparel.svg' },
  { id: 'gap', name: 'GAP', src: '/images/brand_logos/gap.svg' },
  { id: 'george', name: 'George', src: '/images/brand_logos/george.svg' },
  { id: 'levis', name: "Levi's", src: '/images/brand_logos/levis.svg' },
  { id: 'nautica', name: 'Nautica', src: '/images/brand_logos/nautica.svg' },
  { id: 'perry-ellis', name: 'Perry Ellis', src: '/images/brand_logos/perry-ellis.svg' },
  { id: 'pvh', name: 'PVH', src: '/images/brand_logos/pvh.svg' },
  { id: 'quiksilver', name: 'Quiksilver', src: '/images/brand_logos/quiksilver.svg' },
  { id: 'reebok', name: 'Reebok', src: '/images/brand_logos/reebok.svg' },
  { id: 'rugby-university', name: 'Rugby University', src: '/images/brand_logos/rugby-university.svg' },
  { id: 'true-religion', name: 'True Religion', src: '/images/brand_logos/true-religion.svg' },
  { id: 'walmart', name: 'Walmart', src: '/images/brand_logos/walmart.svg' },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.08 }}
      className="flex items-center justify-center px-8 md:px-12 shrink-0 group cursor-pointer"
    >
      <div className="relative h-10 md:h-14 w-32 md:w-40 transition-all duration-500 select-none drop-shadow-sm group-hover:drop-shadow-xl">
        <Image
          src={brand.src}
          alt={brand.name}
          fill
          className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
          sizes="(min-width: 768px) 160px, 128px"
        />
      </div>
    </motion.div>
  );
}

/* Infinite marquee — duplicates items for seamless loop, pauses on hover */
function Marquee({ children, speed = 60, direction = 'left' }: { children: React.ReactNode; speed?: number; direction?: 'left' | 'right' }) {
  const [paused, setPaused] = useState(false);
  const xAnim = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div
      className="overflow-hidden w-full relative group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />

      <motion.div
        className="flex items-center py-4"
        animate={{ x: paused ? undefined : xAnim }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        style={paused ? { animationPlayState: 'paused' } : undefined}
      >
        {/* Primary track */}
        <div className="flex shrink-0 items-center">{children}</div>
        {/* Duplicate for seamless loop — hidden from assistive tech */}
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <div className="w-full pb-4 md:pb-8 relative">
      {/* Eyebrow label */}
      <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-text-secondary/60 mb-3 mt-4 px-1">Trusted by</p>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        role="region"
        aria-label="Brand partners"
        aria-roledescription="carousel"
      >
        <Marquee speed={40} direction="right">
          {BRANDS.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
