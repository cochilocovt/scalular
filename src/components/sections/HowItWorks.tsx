'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { FileText, Users, BarChart, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "1. Submit Requirements",
    description: "Upload your product details, technical specs, volume expectations, and timeline. Our system standardizes your brief for manufacturers."
  },
  {
    icon: <Users className="w-8 h-8 text-secondary" />,
    title: "2. Get Matched",
    description: "We automatically route your brief to pre-vetted factories in our network that specialize in your specific product category and volume."
  },
  {
    icon: <BarChart className="w-8 h-8 text-white" />,
    title: "3. Compare Quotes",
    description: "Receive detailed, standardized quotes within 48 hours. Compare pricing, capabilities, and compliance records side-by-side."
  },
  {
    icon: <PackageCheck className="w-8 h-8 text-primary" />,
    title: "4. Start Production",
    description: "Move confidently toward sampling or mass production. Scalular provides order tracking, QC teams, and factoring services."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto relative z-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
        <p className="text-lg text-text-secondary">A transparent, 4-step workflow designed to reduce chaos and get your products to market faster.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary/10 via-primary/40 to-secondary/10 z-0" />
        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] border-t border-dashed border-white/20 z-0" />
        
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative z-10"
          >
            <Card className="h-full flex flex-col items-start hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#07111F] border border-white/10 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{step.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
