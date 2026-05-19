'use client';

import { ProductShowcase } from './ProductShowcase';
import { TrustShowcase } from './TrustShowcase';
import { TextAnimate } from '@/components/ui/text-animate';

export function ShowcaseSection() {
  return (
    <section id="showcase" className="relative w-full bg-mesh-gradient py-12 overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section intro */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h2
            className="flex flex-col items-center w-full"
            style={{ perspective: "1000px" }}
          >
            <div className="overflow-hidden pb-0 w-full flex justify-center">
              <TextAnimate 
                as="span"
                className="font-display block text-3xl sm:text-4xl md:text-[3.25rem] lg:text-[3.75rem] font-extrabold tracking-tighter text-text-primary/70 drop-shadow-sm mb-0"
                style={{ fontFamily: 'var(--font-display)' }}
                by="word"
                animation="fadeIn"
                duration={1.2}
                stagger={0.2}
              >
                Skip negotiation.
              </TextAnimate>
            </div>
            <div className="overflow-hidden pb-0 w-full flex justify-center -mt-1 md:-mt-2 lg:-mt-3">
              <TextAnimate 
                as="span"
                className="font-display block text-4xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] font-extrabold tracking-tighter leading-[0.9] text-text-primary drop-shadow-md"
                style={{ fontFamily: 'var(--font-display)' }}
                delay={1.4}
                by="word"
                animation="fadeIn"
                duration={1.2}
                stagger={0.2}
              >
                Start production.
              </TextAnimate>
            </div>
          </h2>
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
