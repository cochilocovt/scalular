'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Photo data — curated selection from factory visits ─────────────── */
const PHOTOS = [
  { src: '/images/trust/sewing-floor-blue.jpg', alt: 'Production floor with workers sewing garments', label: 'Sewing Floor' },
  { src: '/images/trust/production-floor-white.jpg', alt: 'Modern factory with quality inspection stations', label: 'Quality Control' },
  { src: '/images/trust/cotton-processing.jpg', alt: 'Raw cotton processing facility', label: 'Cotton Processing' },
  { src: '/images/trust/factory-walkway.jpg', alt: 'Factory supervisor inspecting workstations', label: 'Factory Walk' },
  { src: '/images/trust/fabric-ironing.jpg', alt: 'Fabric cutting and ironing station', label: 'Finishing' },
  { src: '/images/trust/yarn-spinning.jpg', alt: 'Industrial yarn spinning machinery', label: 'Spinning Mills' },
];

const METRICS = [
  { value: '20+', label: 'Years in Apparel' },
  { value: '115+', label: 'Verified Factories' },
  { value: '3,000+', label: 'Orders Delivered' },
];

export function TrustGallery() {
  return (
    <section
      id="gallery"
      className="relative w-full py-6 md:py-20 px-4 md:px-12 lg:px-20 bg-background overflow-hidden min-h-[100svh] md:min-h-0 flex flex-col justify-center md:block"
    >
      {/* ── Section header ─────────────────────────────────── */}
      <div className="max-w-6xl w-full mx-auto mb-5 md:mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3"
        >
          Audited Factory ecosystem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-[28px] leading-[1.1] md:text-5xl font-bold text-text-primary tracking-tighter mb-3 md:mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Real factories. Real people.
          <br className="hidden md:block" />
          <span className="text-text-secondary"> Not AI Photos.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[13px] leading-snug md:text-lg text-text-secondary max-w-xl"
        >
          Every factory in our network is carefully chosen, audited and monitored.
          These are real photos from our partner facilities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 md:mt-6"
        >
          <Link 
            href="/gallery"
            className="inline-flex items-center gap-2 text-[13px] md:text-sm font-bold text-primary hover:text-primary-alt transition-colors group"
          >
            <span className="border-b border-primary/30 group-hover:border-primary transition-colors pb-0.5">
              Explore the Full Gallery
            </span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── Photo grid — compact bento box on mobile, asymmetric on desktop ────────── */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 md:auto-rows-[220px]">
        {/* Large hero image — spans full width on mobile, 2 rows on desktop */}
        <div
          className="col-span-2 h-[160px] md:h-auto md:col-span-7 md:row-span-2 relative rounded-2xl overflow-hidden group"
        >
          <Image
            src={PHOTOS[0].src}
            alt={PHOTOS[0].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 md:bottom-4 left-4 md:left-5 z-10">
            <span className="text-[10px] md:text-xs font-semibold text-white/80 uppercase tracking-wider">{PHOTOS[0].label}</span>
          </div>
          {/* Metric badge */}
          <div className="absolute top-3 md:top-4 right-3 md:right-5 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 shadow-lg">
            <div className="text-lg md:text-2xl font-bold text-text-primary tracking-tight leading-none">{METRICS[0].value}</div>
            <div className="text-[9px] md:text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-0.5">{METRICS[0].label}</div>
          </div>
        </div>

        {/* Top right */}
        <div
          className="col-span-1 h-[110px] md:h-auto md:col-span-5 relative rounded-2xl overflow-hidden group"
        >
          <Image
            src={PHOTOS[1].src}
            alt={PHOTOS[1].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 md:bottom-3 left-3 md:left-4 z-10">
            <span className="text-[10px] md:text-xs font-semibold text-white/80 uppercase tracking-wider">{PHOTOS[1].label}</span>
          </div>
        </div>

        {/* Bottom right */}
        <div
          className="col-span-1 h-[110px] md:h-auto md:col-span-5 relative rounded-2xl overflow-hidden group"
        >
          <Image
            src={PHOTOS[2].src}
            alt={PHOTOS[2].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 md:bottom-3 left-3 md:left-4 z-10">
            <span className="text-[10px] md:text-xs font-semibold text-white/80 uppercase tracking-wider">{PHOTOS[2].label}</span>
          </div>
          {/* Metric badge */}
          <div className="absolute top-2 md:top-3 right-2 md:right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 md:py-2 shadow-lg">
            <div className="text-base md:text-xl font-bold text-text-primary tracking-tight leading-none">{METRICS[1].value}</div>
            <div className="text-[8px] md:text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-0.5">{METRICS[1].label}</div>
          </div>
        </div>

        {/* Second row — three equal columns (Hidden on mobile to save space) */}
        {PHOTOS.slice(3).map((photo, i) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`hidden md:block col-span-1 md:col-span-4 relative rounded-2xl overflow-hidden group`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-4 z-10">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{photo.label}</span>
            </div>
            {i === 2 && (
              <div className="absolute top-3 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <div className="text-xl font-bold text-text-primary tracking-tight leading-none">{METRICS[2].value}</div>
                <div className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-0.5">{METRICS[2].label}</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
