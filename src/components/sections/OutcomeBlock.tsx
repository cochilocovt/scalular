'use client';

import { motion } from 'framer-motion';

export function OutcomeBlock() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/10 border border-white/10 p-1 md:p-3 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[#07111F]/80 backdrop-blur-xl" />
        <div className="relative z-10 bg-[#0D1830]/50 rounded-2xl md:rounded-[2rem] p-8 md:p-16 border border-white/5 flex flex-col items-center text-center">
          <div className="text-secondary font-mono text-sm tracking-widest uppercase mb-8">Proven Outcomes</div>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-12 max-w-4xl leading-tight">
             From design brief to factory shortlist in <span className="text-gradient">48 hours</span>.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-12">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">3x</div>
              <div className="text-text-secondary text-sm">Faster quote turnaround</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-text-secondary text-sm">Pre-vetted factory network</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">-40%</div>
              <div className="text-text-secondary text-sm">Reduced sourcing back-and-forth</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
