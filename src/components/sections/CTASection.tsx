'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Star, Lock, ArrowRight, Calendar } from 'lucide-react';
import { GetStartedButton } from '../ui/get-started-button';

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: 'Certified Factories' },
  { Icon: Zap, label: 'AI Powered Quotation' },
  { Icon: Star, label: 'On-Ground Support' },
  { Icon: Lock, label: 'Data Secure & Confidential' },
];

const SOCIAL_PROOF = [
  { value: '200+', label: 'Brands Served' },
  { value: '3,000+', label: 'Orders Completed' },
  { value: '20+', label: 'Years Experience' },
];

export function CTASection() {
  return (
    <section id="cta" className="relative bg-background overflow-hidden py-16 md:py-24 px-6 md:px-12 border-t border-divider">

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Social proof stats — relocated from ClientLogos */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            {SOCIAL_PROOF.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary tracking-tighter">{value}</div>
                <div className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest mt-1 md:mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Onboard for Free
          </p>

          <h2
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tighter mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your factory capacity is reserved.
          </h2>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
            Place orders through Scalular with verified factories, receive instant quotes, and manage production with complete confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30">
            <GetStartedButton
              label="Get Your Instant Quote"
              size="lg"
              href="https://erp.scalular.com/instant-quote"
              target="_blank"
              baseColor="#1d4ed8"
            />

            <GetStartedButton
              label="Book a Strategy Call & Demo"
              size="lg"
              href="https://calendly.com/scalular"
              target="_blank"
              baseColor="#475569"
              icon={<Calendar className="w-4 h-4 md:w-[18px] md:h-[18px] text-white opacity-80" strokeWidth={2.5} />}
            />
          </div>

          {/* Trust badges — FULL OPACITY, not faded */}
          <div className="mt-16 pt-10 border-t border-divider flex flex-wrap justify-center gap-x-6 md:gap-x-10 gap-y-4">
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-xs text-text-secondary font-semibold tracking-wider uppercase">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
