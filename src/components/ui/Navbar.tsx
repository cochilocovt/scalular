'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FileText, Palette } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-white-horizontal.png';
import { ThemeToggle } from './ThemeToggle';
import { ColorPickerSidebar } from './ColorPickerSidebar';
import { useTheme } from './ThemeProvider';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const isLight = theme === 'light';

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
            className={`h-11 w-auto object-contain transition-all duration-300 ${isLight ? 'brightness-0' : 'brightness-100'}`}
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

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Link
            href="https://app.scalular.com/login"
            className="hidden md:inline-flex text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Sign In
          </Link>

          {/* Theme toggle with dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center neu-btn cursor-pointer hover:scale-105 active:scale-95 text-text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {isLight ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {themeDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[90]"
                  onClick={() => setThemeDropdownOpen(false)}
                />
                <div className="absolute right-0 top-12 w-56 glass-card rounded-xl border border-primary/20 py-2 z-[100]">
                  <button
                    onClick={() => {
                      toggle();
                      setThemeDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-sm text-left text-text-secondary hover:text-text-primary hover:bg-white/5 flex items-center gap-3"
                  >
                    {isLight ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    <span>Toggle {isLight ? 'Dark' : 'Light'} Mode</span>
                  </button>
                  <div className="my-1 border-t border-divider" />
                  <button
                    onClick={() => {
                      setColorPickerOpen(true);
                      setThemeDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-sm text-left text-text-secondary hover:text-text-primary hover:bg-white/5 flex items-center gap-3"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Theme Designer</span>
                    <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">NEW</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quote icon button */}
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

      <ColorPickerSidebar isOpen={colorPickerOpen} onClose={() => setColorPickerOpen(false)} />
    </>
  );
}