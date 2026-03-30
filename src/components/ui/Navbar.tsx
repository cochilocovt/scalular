'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-white-horizontal.png';
// Theme builder removed: no ThemeToggle or ThemeProvider

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // color picker removed
  // Theme is static: no ThemeProvider or toggle

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Theme is static

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 inset-x-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Scalular Logo"
            width={140}
            height={40}
            className={`h-11 w-auto object-contain transition-all duration-300`}
            priority
            loading="eager"
          />
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link href="#regions" className="hover:text-primary transition-colors duration-200">
            Regions
          </Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors duration-200">
            How it works
          </Link>
          <Link href="#cta" className="hover:text-primary transition-colors duration-200">
            Get a Quote
          </Link>
        </nav>

        {/* Right side controls: Sign In and Get Quote; theme builder removed */}
        <div className="flex items-center gap-3">
          <Link
            href="https://app.scalular.com/login"
            className="hidden md:inline-flex text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="https://app.scalular.com/quote"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get an instant quote"
            className="relative w-10 h-10 rounded-full flex items-center justify-center neu-btn cursor-pointer hover:scale-105 active:scale-95 text-text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18), transparent 70%)' }}
            />
            <FileText className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </motion.header>

      {/* ColorPickerSidebar removed with theme builder */}
    </>
  );
}
