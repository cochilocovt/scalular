'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logoIcon from '@/assets/logo-icon.png';
import { GetStartedButton } from './get-started-button';

const NAV_LINKS = [
  { label: 'Network',    href: '/#regions' },
  { label: 'Services',   href: '/#services' },
  { label: 'Gallery',    href: '/gallery' },
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
        className={`fixed top-0 inset-x-0 z-50 flex h-14 items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled ? 'bg-primary/80 backdrop-blur-md shadow-lg border-b border-primary-foreground/5' : 'bg-primary/50 backdrop-blur-sm'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logoIcon}
            alt="Scalular Logo"
            width={40}
            height={40}
            className="h-9 w-9 object-contain transition-all duration-300 group-hover:scale-105"
            priority
            loading="eager"
          />
          <span className="text-primary-foreground text-xl font-light tracking-[0.25em] uppercase" style={{ fontFamily: 'var(--font-brand)' }}>
            Scalular
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-primary-foreground/70">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors duration-200 rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Link
            href="https://app.scalular.com/login"
            className="hidden md:inline-flex text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors duration-200 rounded-sm px-1"
          >
            Sign In
          </Link>
          <div className="hidden sm:block">
            <GetStartedButton
              label="Get Quote"
              href="https://app.scalular.com/quote"
              target="_blank"
              size="sm"
            />
          </div>
          <Link
            href="https://app.scalular.com/quote"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get an instant quote"
            className="sm:hidden relative w-10 h-10 rounded-full flex items-center justify-center border border-primary-foreground/10 bg-primary-foreground/5 hover:bg-primary-foreground/10 cursor-pointer text-primary-foreground/70 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-colors"
          >
            <FileText className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-primary-foreground/10 bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5 flex-shrink-0" /> : <Menu className="w-5 h-5 flex-shrink-0" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 inset-x-0 z-40 bg-primary/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 md:hidden shadow-xl border-t border-primary-foreground/5"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-primary-foreground hover:text-primary-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-colors py-1 border-b border-primary-foreground/10 last:border-0 rounded-sm"
              >
                {label}
              </Link>
            ))}
            <Link
              href="https://app.scalular.com/login"
              className="text-base font-medium text-primary-foreground/70 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-colors py-1 rounded-sm"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="https://app.scalular.com/quote"
              target="_blank"
              className="text-base font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 py-1 rounded-sm"
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
