'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ShoppingBag, Camera, Settings, Mail } from 'lucide-react';

const SECTIONS = [
  { id: 'regions',  label: 'Network',  Icon: Globe },
  { id: 'showcase', label: 'Products', Icon: ShoppingBag },
  { id: 'gallery',  label: 'Gallery',  Icon: Camera },
  { id: 'services', label: 'Services', Icon: Settings },
  { id: 'cta',      label: 'Contact',  Icon: Mail },
];

export function SectionScrollbar() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Show on scroll, auto-hide after inactivity
  const showAndScheduleHide = useCallback(() => {
    setVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
              showAndScheduleHide();
            }
          });
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [showAndScheduleHide]);

  // Show on scroll events
  useEffect(() => {
    const handleScroll = () => showAndScheduleHide();
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Show initially after a short delay
    const initTimer = setTimeout(() => showAndScheduleHide(), 1500);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showAndScheduleHide]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Use Lenis if available, otherwise native smooth scroll
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showAndScheduleHide();
  };

  return (
    <>
      {/* Reduced motion: no glow animations */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .scrollbar-dot-glow { box-shadow: none !important; }
        }
      `}</style>

      <motion.nav
        aria-label="Page sections"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-45 flex flex-col items-end gap-4 pointer-events-auto"
        style={{ zIndex: 45 }}
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeId === id;

          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full p-1"
              aria-label={`Scroll to ${label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Tooltip label — desktop only */}
              <AnimatePresence>
                {hoveredId === id && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden md:block text-[9px] font-bold uppercase tracking-[0.2em] text-text-primary bg-surface/90 border border-border/60 px-2.5 py-1 rounded-md shadow-sm whitespace-nowrap pointer-events-none"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot */}
              <div
                className="scrollbar-dot-glow rounded-full transition-all duration-300 shrink-0"
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  background: isActive ? 'var(--primary)' : 'var(--border)',
                  boxShadow: isActive ? '0 0 8px var(--primary), 0 0 16px var(--primary-muted)' : 'none',
                }}
              />
            </button>
          );
        })}
      </motion.nav>
    </>
  );
}
