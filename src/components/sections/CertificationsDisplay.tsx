'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Leaf, Globe, CheckCircle2, Star, Heart, Factory, Package, Layers, Recycle, Zap } from 'lucide-react';

/* ─── Tier 1: Featured certifications (most recognizable) ──────────── */
const FEATURED = [
  { name: 'GOTS', icon: Leaf, color: '#16A34A', desc: 'Global Organic Textile Standard' },
  { name: 'OEKO-TEX', icon: ShieldCheck, color: '#2563EB', desc: 'Tested safe for people & environment' },
  { name: 'Fairtrade', icon: Heart, color: '#DC2626', desc: 'Fair wages & safe conditions' },
  { name: 'ISO 9001', icon: Package, color: '#6D28D9', desc: 'Quality management certified' },
  { name: 'WRAP', icon: Factory, color: '#9333EA', desc: 'Ethical factory standards' },
];

/* ─── Tier 2: Additional certifications (compact display) ──────────── */
const ADDITIONAL = [
  { name: 'Higg Index', icon: Layers, color: '#0891B2' },
  { name: 'BCI', icon: Recycle, color: '#15803D' },
  { name: 'Sedex', icon: Globe, color: '#7C3AED' },
  { name: 'CTPAT', icon: CheckCircle2, color: '#1D4ED8' },
  { name: 'SGS', icon: Award, color: '#B45309' },
  { name: 'Amfori', icon: Star, color: '#BE185D' },
  { name: 'SA8000', icon: ShieldCheck, color: '#0F766E' },
];

export function CertificationsDisplay() {
  return (
    <div className="w-full py-12 md:py-20">
      {/* Header — center-aligned to match Showcase block */}
      <div className="max-w-3xl mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
        >
          Certified Standards
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-2xl md:text-5xl font-bold text-text-primary tracking-tighter mb-3 md:mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Quality you can verify
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base text-text-secondary max-w-xl mx-auto"
        >
          Every factory in our network holds internationally recognised certifications. We verify them so you don&apos;t have to.
        </motion.p>
      </div>

      {/* ── Tier 1: Featured certifications — prominent row ───────── */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3"
        >
          {FEATURED.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.name}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border hover:border-border-hover transition-colors duration-200"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: cert.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary leading-none">{cert.name}</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">{cert.desc}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Tier 2: Additional certifications — compact inline badges ── */}
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-xs font-medium text-text-secondary/60 mr-1">Also certified:</span>
          {ADDITIONAL.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-hover/50 border border-border/50"
              >
                <Icon className="w-3 h-3" style={{ color: cert.color }} />
                <span className="text-xs font-semibold text-text-secondary">{cert.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
