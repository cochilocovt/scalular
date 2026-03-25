'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Shield, CheckCircle2, FileText, Activity } from 'lucide-react';

const trustItems = [
  { icon: <Shield className="w-6 h-6 text-primary" />, title: "Pre-vetted Partners", desc: "Rigorous 50-point compliance checks before onboarding." },
  { icon: <CheckCircle2 className="w-6 h-6 text-secondary" />, title: "Capability Matching", desc: "Algorithmic matching based on machinery and past performance." },
  { icon: <Activity className="w-6 h-6 text-primary" />, title: "Clear Communication", desc: "Centralized messaging and standard technical packs." },
  { icon: <FileText className="w-6 h-6 text-secondary" />, title: "Sampling Visibility", desc: "Track sample progress and iteration cycles in real-time." }
];

export function TrustSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-[#07111F]">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Trust on a scale, <br/> built on verification.</h2>
          <p className="text-lg text-text-secondary mb-8">Trust on a sourcing platform comes from visible process, not just glossy visuals. Scalular acts as a compliance dashboard for your entire sourcing flow.</p>
          <div className="space-y-6">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-[#0D1830] to-[#07111F]">
              <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-3xl rounded-full" />
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6 relative z-10">
                <div className="text-white font-medium">Compliance Dashboard</div>
                <div className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> Live Status
                </div>
              </div>
              <div className="space-y-4 relative z-10">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10" />
                      <div>
                        <div className="w-32 h-4 bg-white/20 rounded mb-2" />
                        <div className="w-24 h-3 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
