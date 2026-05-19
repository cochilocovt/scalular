'use client';

import { motion } from 'framer-motion';
import { ProductShowcase } from './ProductShowcase';
import { TrustShowcase } from './TrustShowcase';
import { SpecialText } from '@/components/ui/special-text';

export function ShowcaseSection() {
  return (
    <section id="showcase" className="relative w-full bg-mesh-gradient py-20 overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section intro */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="flex flex-col items-center"
            style={{ perspective: "1000px" }}
          >
            <div className="overflow-hidden pb-2 w-full flex justify-center">
              <SpecialText 
                className="block text-3xl sm:text-4xl md:text-[4rem] lg:text-[4.5rem] font-black tracking-tighter text-text-primary/70 drop-shadow-sm mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
                inView={true}
              >
                Skip negotiation.
              </SpecialText>
            </div>
            <div className="overflow-hidden pb-4 w-full flex justify-center">
              <SpecialText 
                className="block text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5rem] font-black tracking-tighter leading-[0.9] text-text-primary drop-shadow-md"
                style={{ fontFamily: 'var(--font-display)' }}
                inView={true}
                delay={1.5}
              >
                Start production.
              </SpecialText>
            </div>
          </motion.h2>
        </div>

      </div>

      {/* Unified Trust Showcase */}
      <TrustShowcase />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Product Showcase */}
        <ProductShowcase />
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
