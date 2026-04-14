'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logoIcon from '@/assets/logo-icon.png';

const NAV_LINKS = [
  { label: 'Network',    href: '/#regions' },
  { label: 'Services',   href: '/#services' },
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
          scrolled ? 'bg-primary shadow-lg border-b border-[#ffffff0d]' : 'bg-primary'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logoIcon}
            alt="Scalular Logo"
            width={52}
            height={52}
            className="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-105"
            priority
            loading="eager"
          />
          <span className="text-white text-2xl font-bold tracking-wide font-display mt-0.5">
            Scalular
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#ffffffb3]">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors duration-200 rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Link
            href="https://app.scalular.com/login"
            className="hidden md:inline-flex text-sm font-medium text-[#ffffffb3] hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors duration-200 rounded-sm px-1"
          >
            Sign In
          </Link>
          <Link
            href="https://app.scalular.com/quote"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get an instant quote"
            className="relative w-10 h-10 rounded-full flex items-center justify-center border border-[#ffffff1a] bg-[#ffffff0d] hover:bg-[#ffffff1a] cursor-pointer text-[#ffffffb3] hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] transition-colors"
          >
            <FileText className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-[#ffffff1a] bg-[#ffffff0d] hover:bg-[#ffffff1a] text-[#ffffffb3] hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] transition-colors"
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
            className="fixed top-20 inset-x-0 z-40 bg-primary px-6 py-6 flex flex-col gap-4 md:hidden shadow-xl border-t border-[#ffffff0d]"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-[#ffffff] hover:text-[#ffffffcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] transition-colors py-1 border-b border-[#ffffff1a] last:border-0 rounded-sm"
              >
                {label}
              </Link>
            ))}
            <Link
              href="https://app.scalular.com/login"
              className="text-base font-medium text-[#ffffffb3] hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] transition-colors py-1 rounded-sm"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="https://app.scalular.com/quote"
              target="_blank"
              className="text-base font-bold text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff80] py-1 rounded-sm"
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
