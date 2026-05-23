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
          <div
            className="flex flex-col items-center w-full"
            style={{ perspective: "1000px" }}
          >
            <div className="overflow-hidden pb-0 w-full flex justify-center">
              <TextAnimate
                as="h2"
                className="font-sans block text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter text-text-primary mb-0"
                style={{ fontFamily: 'var(--font-sans)' }}
                by="word"
                animation="fadeIn"
                duration={1.2}
                stagger={0.2}
              >
                SKIP NEGOTIATION.
              </TextAnimate>
            </div>
            <div className="overflow-hidden pb-0 w-full flex justify-center -mt-1 md:-mt-2 lg:-mt-3">
              <TextAnimate
                as="h2"
                className="font-sans block text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter text-text-primary"
                segmentClassName="text-gradient inline-block animate-text-gradient"
                style={{ fontFamily: 'var(--font-sans)' }}
                delay={1.4}
                by="word"
                animation="fadeIn"
                duration={1.2}
                stagger={0.2}
              >
                START PRODUCTION.
              </TextAnimate>
            </div>
          </div>
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
