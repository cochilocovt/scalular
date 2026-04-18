'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ─── Certifications ──────────── */
const CERTIFICATIONS = [
  { name: 'GOTS', src: '/images/certification_logos/04_GOTS.png', desc: 'Global Organic Textile Standard' },
  { name: 'OEKO-TEX', src: '/images/certification_logos/03_OEKO_TEX_Standard_100.jpg', desc: 'Tested safe for people & environment' },
  { name: 'Fairtrade', src: '/images/certification_logos/16_Fairtrade.png', desc: 'Fair wages & safe conditions' },
  { name: 'ISO 9001', src: '/images/certification_logos/12_SGS_ISO_9001.jpg', desc: 'Quality management certified' },
  { name: 'WRAP', src: '/images/certification_logos/07_WRAP.jpg', desc: 'Ethical factory standards' },
  { name: 'Walt Disney FAMA', src: '/images/certification_logos/01_Walt_Disney_FAMA.jpg', desc: 'Facility and Merchandise Authorization' },
  { name: 'Sedex', src: '/images/certification_logos/02_Sedex.jpg', desc: 'Empowering ethical supply chains' },
  { name: 'Costco Price Club', src: '/images/certification_logos/05_Costco_Price_Club.jpg', desc: 'Supplier audit standard' },
  { name: 'CTPAT', src: '/images/certification_logos/06_CTPAT.jpg', desc: 'Customs-Trade Partnership Against Terrorism' },
  { name: 'Amfori', src: '/images/certification_logos/08_Amfori.jpg', desc: 'Trade with purpose' },
  { name: 'Levi\'s', src: '/images/certification_logos/09_Levis.jpg', desc: 'Terms of Engagement' },
  { name: 'Walmart FCCA', src: '/images/certification_logos/10_Walmart_FCCA.jpg', desc: 'Factory Capability & Capacity Audit' },
  { name: 'Global Recycled Standard', src: '/images/certification_logos/11_Global_Recycled_Standard.jpg', desc: 'Recycled content certified' },
  { name: 'Higg Index', src: '/images/certification_logos/13_Higg_Index.jpg', desc: 'Sustainability measurement' },
  { name: 'BCI', src: '/images/certification_logos/14_BCI_Better_Cotton_Initiative.jpg', desc: 'Better Cotton Initiative' },
  { name: 'VF Corporation', src: '/images/certification_logos/15_VF_Corporation.jpg', desc: 'Global compliance principles' },
];

function CertCard({ cert }: { cert: typeof CERTIFICATIONS[0] }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      className="flex items-center gap-4 w-72 px-4 py-3 mx-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 hover:bg-white hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shrink-0 p-1.5 shadow-sm border border-black/5 overflow-hidden group-hover:shadow-md transition-shadow duration-300">
        <div className="relative w-full h-full">
          <Image src={cert.src} alt={cert.name} fill className="object-contain" sizes="64px" />
        </div>
      </div>
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="text-sm font-bold text-text-primary leading-tight truncate group-hover:text-primary transition-colors">{cert.name}</div>
        <div className="text-[11px] text-text-secondary mt-1 leading-snug line-clamp-2">{cert.desc}</div>
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
        <div className="flex shrink-0">{children}</div>
        {/* Duplicate for seamless loop — hidden from assistive tech */}
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}

export function CertificationsDisplay() {
  return (
    <div className="w-full pt-4 md:pt-6 pb-4 relative">
      {/* Eyebrow label */}
      <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-text-secondary/60 mb-3 px-1">Certified by</p>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        role="region"
        aria-label="Certification partners"
        aria-roledescription="carousel"
      >
        <Marquee speed={35} direction="left">
          {CERTIFICATIONS.map((cert) => (
            <CertCard key={cert.name} cert={cert} />
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
