'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring } from 'framer-motion';
import { FileText, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoIcon from '@/assets/logo-icon.png';

const NAV_LINKS = [
  { label: 'Network',    href: '/#regions' },
  { label: 'Services',   href: '/#services' },
  { label: 'Gallery',    href: '/gallery' },
  { label: 'About',      href: '/about' },
  { label: 'Partner',    href: '/partner' },
];

interface MagneticLinkProps {
  children: React.ReactNode;
  onHoverStart: () => void;
}

function MagneticLink({ children, onHoverStart }: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Subtle magnetic pull scaled to 22% of displacement
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.22);
    y.set(distanceY * 0.22);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHoverStart}
      style={{ x: springX, y: springY }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

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

  // Identify active label based on pathname matching
  const activeLabel = NAV_LINKS.find(link => {
    if (link.href.startsWith('/#')) {
      return pathname === '/';
    }
    if (link.href === '/') {
      return pathname === '/';
    }
    return pathname === link.href || pathname.startsWith(link.href + '/');
  })?.label || null;

  const currentUnderline = hoveredLabel ?? activeLabel;

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
        <nav 
          className="hidden md:flex items-center gap-2 text-sm font-medium text-primary-foreground/70"
          onMouseLeave={() => setHoveredLabel(null)}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeLabel === label;
            const isHovered = hoveredLabel === label;
            const isHighlighted = hoveredLabel ? isHovered : isActive;
            
            return (
              <MagneticLink
                key={label}
                onHoverStart={() => setHoveredLabel(label)}
              >
                <Link
                  href={href}
                  className={`relative block px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm transition-colors duration-300 ${
                    isHighlighted ? 'text-primary-foreground' : 'text-primary-foreground/50'
                  }`}
                >
                  {label}
                  {currentUnderline === label && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-foreground rounded-full"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                </Link>
              </MagneticLink>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Link
            href="https://erp.scalular.com/login"
            className="relative w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none flex md:inline-flex items-center justify-center border border-primary-foreground/10 md:border-none bg-primary-foreground/5 md:bg-transparent hover:bg-primary-foreground/10 md:hover:bg-transparent text-primary-foreground/70 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-colors text-sm font-medium px-1"
            aria-label="Sign In"
          >
            <span className="hidden md:inline">Sign In</span>
            <User className="w-4 h-4 md:hidden" />
          </Link>
          <Link
            href="https://erp.scalular.com/instant-quote"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md border border-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-[0.98]"
          >
            Get Quote
          </Link>
          <Link
            href="https://erp.scalular.com/instant-quote"
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
              href="https://erp.scalular.com/login"
              className="text-base font-medium text-primary-foreground/70 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 transition-colors py-1 rounded-sm flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
            <Link
              href="https://erp.scalular.com/instant-quote"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm font-semibold text-primary bg-primary-foreground hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 py-2.5 px-4 rounded-full transition-all mt-2 active:scale-[0.98]"
              onClick={() => setMobileOpen(false)}
            >
              Get Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
