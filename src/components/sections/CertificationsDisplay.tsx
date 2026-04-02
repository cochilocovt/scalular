'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Leaf, Globe, CheckCircle2, Star, Heart, Factory, Package, Layers, Recycle, Zap } from 'lucide-react';

const CERTIFICATIONS = [
  { name: 'GOTS',          icon: Leaf,         color: '#16A34A', desc: 'Global Organic Textile Standard — organic fibre certification' },
  { name: 'OEKO-TEX',      icon: ShieldCheck,  color: '#2563EB', desc: 'Tested for harmful substances — safe for people & environment' },
  { name: 'WRAP',          icon: Factory,      color: '#9333EA', desc: 'Worldwide Responsible Accredited Production — ethical factory standards' },
  { name: 'Fairtrade',     icon: Heart,        color: '#DC2626', desc: 'Fair wages and safe working conditions for all workers' },
  { name: 'Higg Index',    icon: Layers,       color: '#0891B2', desc: 'Social & environmental sustainability performance measurement' },
  { name: 'BCI',           icon: Recycle,      color: '#15803D', desc: 'Better Cotton Initiative — sustainable cotton farming practices' },
  { name: 'Sedex',         icon: Globe,        color: '#7C3AED', desc: 'Supplier ethical data exchange — supply chain transparency' },
  { name: 'CTPAT',         icon: CheckCircle2, color: '#1D4ED8', desc: 'Customs-Trade Partnership Against Terrorism — secure supply chain' },
  { name: 'SGS',           icon: Award,        color: '#B45309', desc: 'Bureau Veritas / SGS quality inspection & testing certification' },
  { name: 'Amfori',        icon: Star,         color: '#BE185D', desc: 'Open trade association for social & environmental responsibility' },
  { name: 'SA8000',        icon: ShieldCheck,  color: '#0F766E', desc: 'Social accountability standard for decent workplace conditions' },
  { name: 'ISO 9001',      icon: Package,      color: '#6D28D9', desc: 'International quality management systems standard' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function CertificationsDisplay() {
  return (
    <div className="w-full py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
        >
          Certified Standards
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter mb-2"
        >
          Quality You Can <span className="text-gradient">Trust</span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-text-secondary text-base max-w-lg mx-auto"
        >
          Every factory in our network is audited and holds internationally recognised certifications.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4"
      >
        {CERTIFICATIONS.map((cert) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.name}
              variants={item}
              whileHover={{ y: -4, boxShadow: `0 12px 32px ${cert.color}20` }}
              className="glass-card rounded-2xl p-4 cursor-default group transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color: cert.color }} />
              </div>
              <div
                className="text-sm font-black tracking-tight mb-1"
                style={{ color: cert.color }}
              >
                {cert.name}
              </div>
              <p className="text-[11px] text-text-secondary leading-snug">{cert.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
