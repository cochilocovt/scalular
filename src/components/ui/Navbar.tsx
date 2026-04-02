'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-black-horizontal.png';

const NAV_LINKS = [
  { label: 'Network',    href: '/#regions' },
  { label: 'Services',   href: '/#cta' },
  { label: 'About',      href: '/about' },
  { label: 'Partner',    href: '/partner' },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

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
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Scalular Logo"
            width={140}
            height={40}
            className="h-11 w-auto object-contain transition-all duration-300"
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-primary transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
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
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12), transparent 70%)' }}
            />
            <FileText className="w-4 h-4 relative z-10" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center neu-btn text-text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 inset-x-0 z-40 glass-nav px-6 py-6 flex flex-col gap-4 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-text-primary hover:text-primary transition-colors py-1 border-b border-divider last:border-0"
              >
                {label}
              </Link>
            ))}
            <Link
              href="https://app.scalular.com/login"
              className="text-base font-medium text-text-secondary hover:text-primary transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="https://app.scalular.com/quote"
              target="_blank"
              className="text-base font-bold text-primary py-1"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
