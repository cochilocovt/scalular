'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Star, Lock, ArrowRight, Calendar } from 'lucide-react';
import { LiquidMetalButton } from '../ui/liquid-metal-button';

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: 'Pre-audited Factories' },
  { Icon: Zap,         label: '48h Quote Turnaround' },
  { Icon: Star,        label: '200+ Brands Served' },
  { Icon: Lock,        label: 'Data Secure & Private' },
];

export function CTASection() {
  return (
    <section id="cta" className="relative bg-background overflow-hidden py-32 md:py-48 px-6 md:px-12 border-t border-white/5">
      {/* Background layers - Blue Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(59,130,246,0.08),rgba(7,17,31,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(30,64,175,0.04),rgba(7,17,31,0))]" />
      
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-10">
            Global Infrastructure Access
          </div>

          <h2 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter mb-10">
            Ready to <span className="text-gradient">Scale?</span>
          </h2>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            Join the elite fashion brands sourcing through Scalular. Get premium factory access and 48-hour quotes today.
          </p>

          <div className="flex flex-col items-center gap-8">
            <LiquidMetalButton 
              label="Get Your Instant Quote" 
              onClick={() => window.open('https://app.scalular.com/quote', '_blank')} 
            />
            
            <a href="https://calendly.com/scalular" target="_blank" className="inline-flex items-center gap-2 text-blue-400/80 text-sm font-semibold hover:text-blue-400 transition-colors group">
              <Calendar className="w-4 h-4" />
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust badges footer */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-text-secondary font-bold tracking-tight uppercase tracking-[0.1em]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
