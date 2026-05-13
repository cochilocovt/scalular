'use client';

import { useState, useEffect, useRef } from 'react';
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
function SafeCanvas({ children, isMobileCanvas = false }: { children: React.ReactNode; isMobileCanvas?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: isMobileCanvas ? 'low-power' : 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%', outline: 'none' }}
      dpr={isMobileCanvas ? 1 : undefined}
    >
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} enableRotate={!isMobileCanvas} />
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
  const interactTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Safely check layout bounds for responsive item heights
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play the carousel every 2 seconds when not hovered/paused
  useEffect(() => {
    if (isHovered) return; // Pause on desktop hover OR mobile temporary tap

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GARMENT_CATALOG.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMobileTap = (idx: number) => {
    setActiveIndex(idx);
    
    // Temporarily pause auto-cycle on mobile for 2 seconds
    if (interactTimeoutRef.current) {
      clearTimeout(interactTimeoutRef.current);
    }
    
    setIsHovered(true); // Signal to pause
    
    interactTimeoutRef.current = setTimeout(() => {
      setIsHovered(false); // Resume after 2 seconds
    }, 2000);
  };

  return (
    <div className="relative w-full py-0 md:py-4">
      
      {/* Header - Moved above the display box */}
      <div className="relative w-full max-w-7xl mx-auto px-6 mb-8 md:mb-10 z-10 flex items-center justify-center">
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary/80">
          What we manufacture
        </span>
      </div>

      {/* DESKTOP LAYOUT */}
      <div 
        className="hidden md:flex relative mx-auto w-full max-w-7xl h-[550px] flex-col-reverse md:flex-row overflow-hidden bg-background/50 rounded-3xl border border-border/50 shadow-xl z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Minimal, crisp top accent bar using brand colors */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-600 to-transparent z-30 opacity-80" />
        
        {/* Left Side (Desktop): Static List */}
        <div className="relative w-full md:w-[45%] h-full flex flex-col justify-center border-r border-border/50">
          <div className="w-full h-full relative overflow-hidden flex flex-col items-start justify-center px-12 py-2">
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
        </div>

        {/* Right Side (Desktop): 3D Stage */}
        <div className="relative w-full md:w-[55%] h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          <SafeCanvas isMobileCanvas={false}>
            <GLBModel key={GARMENT_CATALOG[activeIndex].url} url={GARMENT_CATALOG[activeIndex].url} isActive={true} />
          </SafeCanvas>
        </div>
      </div>

      {/* MOBILE LAYOUT (Option A: 2-Column Grid) */}
      <div className="flex md:hidden flex-col w-full px-2 max-w-[400px] mx-auto">
        
        {/* Sticky 3D Viewer */}
        <div className="sticky top-[56px] z-20 w-full h-[300px] flex items-center justify-center -mt-4 bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="w-full h-full pointer-events-none" style={{ touchAction: 'auto' }}>
            <SafeCanvas isMobileCanvas={true}>
              <GLBModel key={GARMENT_CATALOG[activeIndex].url} url={GARMENT_CATALOG[activeIndex].url} isActive={true} />
            </SafeCanvas>
          </div>
        </div>

        {/* 2-Column Grid List */}
        <div className="w-full z-10 pb-8 mt-2 bg-background">
          <div className="grid grid-cols-2 gap-x-2 gap-y-0 relative">
            {GARMENT_CATALOG.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={entry.id}
                  onClick={() => handleMobileTap(idx)}
                  className={`
                    relative w-full h-[44px] flex items-center px-3 text-left
                    transition-colors duration-300 overflow-hidden rounded-md
                    ${isActive ? 'bg-primary/5' : 'bg-transparent'}
                    ${idx === GARMENT_CATALOG.length - 1 && GARMENT_CATALOG.length % 2 !== 0 ? 'col-span-2' : ''}
                  `}
                >
                  {/* Left Accent Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="mobileAccentBar"
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-primary rounded-r-sm"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span 
                    className={`
                      w-full truncate transition-all duration-300
                      ${isActive 
                        ? 'font-black text-primary text-[15px] uppercase tracking-tight ml-2' 
                        : 'font-medium text-text-secondary/60 text-sm uppercase tracking-wider'
                      }
                    `}
                  >
                    {entry.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
