'use client';

import { motion } from 'framer-motion';
import { ProductShowcase } from './ProductShowcase';
import { TrustShowcase } from './TrustShowcase';

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
              <motion.span 
                variants={{
                  hidden: { y: "100%", scale: 0.9, opacity: 0, rotateX: -30, filter: 'blur(5px)' },
                  visible: { 
                    y: "0%", scale: 1, opacity: 1, rotateX: 0, filter: 'blur(0px)', 
                    transition: { type: "spring", stiffness: 90, damping: 15, mass: 1 } 
                  }
                }}
                className="block text-xl sm:text-2xl md:text-3xl font-serif italic text-text-primary/70 drop-shadow-sm mb-2"
              >
                Skip negotiation.
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4 w-full flex justify-center">
              <motion.span 
                variants={{
                  hidden: { y: "120%", scale: 0.8, opacity: 0, rotateX: -40, filter: 'blur(12px)' },
                  visible: { 
                    y: "0%", scale: 1, opacity: 1, rotateX: 0, filter: 'blur(0px)', 
                    transition: { type: "spring", stiffness: 110, damping: 12, mass: 1.1 } 
                  }
                }}
                className="block text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-gradient drop-shadow-md"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Start production.
              </motion.span>
            </div>
          </motion.h2>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Unified Trust Showcase */}
        <TrustShowcase />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />

        {/* Product Showcase */}
        <ProductShowcase />
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
