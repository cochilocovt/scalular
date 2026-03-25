'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

export function PainSection() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative z-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stop Searching. Start Sourcing.</h2>
        <p className="text-lg text-text-secondary">Traditional apparel manufacturing is a black box. Scalular brings structure, speed, and transparency to every step of the supply chain.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Without Scalular */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full" />
          <div className="text-red-400 font-semibold mb-8 text-xl flex items-center gap-3 relative z-10">
            <XCircle className="w-6 h-6" /> Without Scalular
          </div>
          <ul className="space-y-6 relative z-10">
            {[
              "Endless supplier searching and vetting",
              "Slow 2-3 week quote turnarounds",
              "Low visibility into factory capabilities",
              "High coordination overhead & emails"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-text-secondary mt-1 block w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
                <span className="text-white font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* With Scalular */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#0D1830] border border-secondary/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(34,211,166,0.05)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full" />
          <div className="text-secondary font-semibold mb-8 text-xl flex items-center gap-3 relative z-10">
            <CheckCircle className="w-6 h-6" /> With Scalular
          </div>
          <ul className="space-y-6 relative z-10">
            {[
              "Structured matching with pre-vetted partners",
              "Fast 48-hour quote response cycle",
              "Clear visibility into fit and capability",
              "Centralized sourcing confidence"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-text-secondary mt-1.5 block w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                <span className="text-white font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
