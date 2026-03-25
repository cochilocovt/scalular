'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-white-horizontal.png';
import { LiquidMetalButton } from './liquid-metal-button';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 inset-x-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'bg-[#07111F]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Scalular Logo" width={140} height={40} className="h-8 w-auto object-contain" priority />
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
        <Link href="#regions" className="hover:text-white transition-colors">Regions</Link>
        <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
        <Link href="#cta" className="hover:text-white transition-colors">Get a Quote</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="https://app.scalular.com/login" className="hidden md:inline-flex text-sm font-medium text-text-secondary hover:text-white transition-colors">Sign In</Link>
        <LiquidMetalButton label="Get Quote" onClick={() => window.open('https://app.scalular.com/quote', '_blank')} />
      </div>
    </motion.header>
  );
}
