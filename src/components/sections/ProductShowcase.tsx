'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { GARMENT_CATALOG, GLBModel } from '@/components/3d/GarmentModels';

/* ─── Loader ────────────────────────────────────────────── */
function Loader() {
  return (
    <Html center>
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-50"></div>
    </Html>
  );
}

/* ─── Safe Canvas Wrapper ───────────────────────────────── */
function SafeCanvas({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%', outline: 'none' }}
    >
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </Canvas>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Safely check layout bounds for responsive item heights
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ITEM_HEIGHT = isMobile ? 40 : 55;

  // Auto-play the carousel every 2 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GARMENT_CATALOG.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="relative w-full py-0 md:py-4">
      
      {/* Header - Moved above the display box */}
      <div className="relative w-full max-w-7xl mx-auto px-6 mb-10 z-10 flex items-center justify-center">
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary/80">
          What we manufacture
        </span>
      </div>

      {/* Container inner styling restored */}
      <div 
        className="relative mx-auto w-full max-w-7xl h-[480px] md:h-[550px] flex flex-col-reverse md:flex-row overflow-hidden bg-background/50 rounded-3xl border border-border/50 shadow-xl z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Minimal, crisp top accent bar using brand colors */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-600 to-transparent z-30 opacity-80" />
        
        {/* ── Left Side (Desktop) / Bottom Strip (Mobile): Static List ── */}
        <div className="relative w-full md:w-[45%] h-[30%] md:h-full flex flex-col justify-center md:border-r border-border/50">
          
          <div className="w-full h-full relative overflow-hidden hidden md:flex flex-col items-start justify-center px-6 md:px-12 py-2">
            {/* The list of garments, statically positioned but dynamically sized */}
            {GARMENT_CATALOG.map((entry, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div 
                  key={entry.id} 
                  className={`relative w-full flex items-center cursor-pointer`}
                  style={{ 
                    height: isActive ? '44px' : '24px',
                    opacity: isActive ? 1 : 0.45,
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <h3 
                    className="font-display font-black leading-none uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis w-full"
                    style={{
                      fontSize: isActive ? '32px' : '13px',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-blue-400)',
                      transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  >
                    {entry.name}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Mobile horizontal strip — replaces vertical list below md */}
          <div
            className="flex md:hidden items-center gap-2 overflow-x-auto snap-x snap-mandatory w-full h-full px-4"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {GARMENT_CATALOG.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={entry.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`
                    snap-center shrink-0 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider
                    transition-all duration-300 whitespace-nowrap
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                    ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-text-secondary/60 hover:text-text-primary'
                    }
                  `}
                >
                  {entry.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Side (Desktop) / Top (Mobile): 3D Stage ── */}
        <div className="relative w-full md:w-[55%] h-[70%] md:h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          <SafeCanvas>
            {/* Added key prop bound to url. This forces React to unmount and remount GLBModel + Center, 
                re-evaluating bounding boxes natively from 0 each time, preventing the "Center" offset from drifting across loop boundaries. */}
            <GLBModel key={GARMENT_CATALOG[activeIndex].url} url={GARMENT_CATALOG[activeIndex].url} isActive={true} />
          </SafeCanvas>
        </div>
        
      </div>
    </div>
  );
}
