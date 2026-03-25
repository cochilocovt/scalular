'use client';

import { Button } from '@/components/ui/Button';
import { ScalularGlobe } from '../3d/Globe';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity } from 'lucide-react';
import { LiquidMetalButton } from '../ui/liquid-metal-button';
import Image from 'next/image';
import logoIcon from '@/assets/logo-icon.png';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-12 flex flex-col lg:flex-row items-center px-6 md:px-12 overflow-hidden gap-12 max-w-[1600px] mx-auto">
      <div className="flex-1 relative z-10 flex flex-col items-start gap-6 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
        >
          <Image src={logoIcon} alt="Scalular Icon" width={16} height={16} className="w-4 h-4" /> Global Apparel Sourcing Infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
        >
          Source Better Factories <br />
          <span className="text-gradient">Across the World.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl"
        >
          Scalular helps brands discover, compare, and work with vetted apparel manufacturers faster, with more transparency and less sourcing chaos.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="flex flex-wrap items-center gap-6 mt-8"
         >
           <LiquidMetalButton label="Get Instant Quote" onClick={() => window.open('https://app.scalular.com/quote', '_blank')} />
           <Button variant="outline" className="h-11 px-8 rounded-full border-blue-500/30 hover:bg-blue-500/10 text-sm font-semibold">See How It Works</Button>
         </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/5 w-full flex-wrap opacity-60"
        >
          <div className="flex items-center gap-2 text-xs text-text-secondary font-medium tracking-tight h-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 115+ Vetted Factories
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary font-medium tracking-tight h-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 9 Sourcing Regions
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary font-medium tracking-tight h-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> AI-Powered Sourcing
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex-1 w-full h-[500px] lg:h-[700px] self-stretch -mx-8 lg:mx-0 lg:-mr-12"
      >
        <ScalularGlobe />
      </motion.div>
    </section>
  );
}
