'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const createLenis = () => {
      // Destroy existing instance if any
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      const isMobile = window.innerWidth < 768;

      const lenis = new Lenis({
        duration: isMobile ? 1.4 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: isMobile ? 1.5 : 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    createLenis();

    // Re-create on resize crossing the 768px boundary (orientation change, tablet docking)
    let wasMobile = window.innerWidth < 768;
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile !== wasMobile) {
        wasMobile = isMobile;
        createLenis();
      }
    };
    window.addEventListener('resize', handleResize);

    // Intercept anchor hash clicks so Lenis handles them smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      
      try {
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        lenisRef.current?.scrollTo(el as HTMLElement, { offset: -80 }); // 80px for fixed navbar
      } catch (err) {
        // Query selector could fail on invalid hash formats like #something!invalid
        return;
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{children}</>;
}
