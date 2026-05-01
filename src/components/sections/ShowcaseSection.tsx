'use client';

import { motion } from 'framer-motion';
import { ProductShowcase } from './ProductShowcase';
import { TrustShowcase } from './TrustShowcase';

export function ShowcaseSection() {
  return (
    <section className="relative w-full bg-mesh-gradient py-20 overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section intro */}
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[0.4em] uppercase text-primary mb-4"
          >
            The Scalular Platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tighter leading-tight"
          >
            Simplified.{' '}
            <span className="text-primary">Streamlined.</span>
            <span className="hidden sm:inline"><br /></span>
            Sourced.
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
