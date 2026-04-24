'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const TABS = [
  { id: 'collaborations', label: 'Brand Collaborations' },
  { id: 'importers', label: 'Major Importers' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'stores', label: 'Stores Catered' },
];

const EXTRACTED_LOGOS = [
  // Page 6 images distributed across the 4 categories
  // Collaborations
  { id: 'c1', category: 'collaborations', src: '/images/extracted_logos/page6_img1.png', alt: 'Brand Collaboration' },
  { id: 'c2', category: 'collaborations', src: '/images/extracted_logos/page6_img2.jpeg', alt: 'Brand Collaboration' },
  { id: 'c3', category: 'collaborations', src: '/images/extracted_logos/page6_img3.jpeg', alt: 'Brand Collaboration' },
  { id: 'c4', category: 'collaborations', src: '/images/extracted_logos/page6_img4.png', alt: 'Brand Collaboration' },
  { id: 'c5', category: 'collaborations', src: '/images/extracted_logos/page6_img5.jpeg', alt: 'Brand Collaboration' },
  
  // Importers
  { id: 'i1', category: 'importers', src: '/images/extracted_logos/page6_img6.png', alt: 'Major Importer' },
  { id: 'i2', category: 'importers', src: '/images/extracted_logos/page6_img7.png', alt: 'Major Importer' },
  { id: 'i3', category: 'importers', src: '/images/extracted_logos/page6_img8.jpeg', alt: 'Major Importer' },
  { id: 'i4', category: 'importers', src: '/images/extracted_logos/page6_img9.png', alt: 'Major Importer' },

  // Certifications
  { id: 'ce1', category: 'certifications', src: '/images/extracted_logos/page6_img10.png', alt: 'Certification' },
  { id: 'ce2', category: 'certifications', src: '/images/extracted_logos/page6_img11.jpeg', alt: 'Certification' },
  { id: 'ce3', category: 'certifications', src: '/images/extracted_logos/page6_img12.jpeg', alt: 'Certification' },
  { id: 'ce4', category: 'certifications', src: '/images/extracted_logos/page6_img13.png', alt: 'Certification' },
  { id: 'ce5', category: 'certifications', src: '/images/extracted_logos/page6_img14.png', alt: 'Certification' },
  
  // Stores Catered
  { id: 's1', category: 'stores', src: '/images/extracted_logos/page6_img15.png', alt: 'Store Catered' },
  { id: 's2', category: 'stores', src: '/images/extracted_logos/page6_img16.jpeg', alt: 'Store Catered' },
  { id: 's3', category: 'stores', src: '/images/extracted_logos/page6_img17.jpeg', alt: 'Store Catered' },
  { id: 's4', category: 'stores', src: '/images/extracted_logos/page6_img18.png', alt: 'Store Catered' },
];

export function TrustShowcase() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const displayedLogos = EXTRACTED_LOGOS.filter((logo) => logo.category === activeTab);

  return (
    <div className="w-full py-10 md:py-16 relative overflow-hidden">
      {/* Title & Tabs section */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-black tracking-[0.4em] uppercase text-text-secondary/70 mb-4"
        >
          Our Global Footprint
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-5xl font-black text-text-primary tracking-tighter"
        >
          TRUSTED BY{' '}
          <motion.span 
            className="text-gradient inline-block"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ backgroundSize: '200% auto' }}
          >
            LEADERS
          </motion.span>
        </motion.h3>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive ? 'text-background shadow-lg scale-105' : 'text-text-secondary hover:text-text-primary bg-surface/50 hover:bg-surface border border-border/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Marquee Content */}
      <div className="relative w-full max-w-[100vw] overflow-hidden -mx-6 px-6 md:-mx-12 md:px-12">
        {/* Fades for seamless marquee edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex w-full"
          >
            <div 
              className="flex items-center gap-6 md:gap-8 py-4 will-change-transform"
              style={{ 
                animation: 'marquee-left 40s linear infinite',
                width: 'max-content',
                transform: 'translateZ(0)'
              }}
            >
              {/* Duplicate array 6 times for a seamless infinite scroll on wide screens while keeping DOM light */}
              {[...Array(6)].map((_, arrayIdx) => (
                <div key={arrayIdx} className="flex shrink-0 gap-6 md:gap-8">
                  {displayedLogos.map((logo) => (
                    <div
                      key={`${logo.id}-${arrayIdx}`}
                      className="w-32 h-24 md:w-52 md:h-32 relative rounded-xl bg-white border border-border shadow-sm flex items-center justify-center p-4 md:p-6 hover:border-text-secondary hover:shadow-md transition-all duration-300 ease-out group"
                    >
                      <div className="relative w-full h-full transition-all duration-500 ease-out group-hover:scale-105">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 128px, 208px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
