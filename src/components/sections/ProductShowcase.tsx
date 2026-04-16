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
    <div className="relative w-full py-12 md:py-16 bg-gradient-to-br from-background to-neutral-200">
      
      {/* Immersive subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Container - Reduced height per user request */}
      <div 
        className="relative mx-auto w-full max-w-7xl h-[450px] md:h-[550px] flex flex-col md:flex-row overflow-hidden bg-background/50 rounded-3xl border border-border shadow-xl z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* ── Left Side: Scrolling List ── */}
        <div className="relative w-full md:w-[45%] h-1/2 md:h-full flex flex-col justify-center border-r border-border/50">
          
          <div className="absolute top-4 left-6 md:top-8 md:left-12 flex items-center gap-4 z-30 pointer-events-none">
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
              Sourcing Catalog
            </span>
          </div>

          <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
             {/* The anchor point for the scrolling list. */}
             <motion.div 
               className="absolute w-full px-6 md:px-12 pointer-events-auto cursor-pointer"
               style={{ top: `calc(50% - ${ITEM_HEIGHT / 2}px)` }} // perfectly anchors the active item to center
               animate={{ y: -(activeIndex * ITEM_HEIGHT) }}
               transition={{ type: "spring", stiffness: 250, damping: 30 }}
             >
                {/* We render ALL items to ensure the DOM layout maintains total height, fixing the shifting collapse bug! */}
                {GARMENT_CATALOG.map((entry, idx) => {
                  const isActive = idx === activeIndex;
                  const dist = Math.abs(idx - activeIndex);

                  return (
                    <div 
                      key={entry.id} 
                      className={`relative w-full flex items-center ease-out`}
                      style={{ 
                        height: `${ITEM_HEIGHT}px`,
                        // Optimized: pure opacity changes, NO blur filters to maintain 60FPS
                        opacity: isActive ? 1 : Math.max(0.05, 0.45 - dist * 0.08),
                        transition: 'opacity 0.4s ease'
                      }}
                      onClick={() => setActiveIndex(idx)}
                    >
                      <div 
                        className="flex flex-col w-full"
                        style={{ 
                          // Offload scaling to GPU composite pure transforms. Inactive items scale down further.
                          transform: isActive ? 'scale(1.05)' : 'scale(0.85)', 
                          transformOrigin: 'left center', 
                          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                        }}
                      >
                        {/* whitespace-nowrap added to prevent text wrapping from destroying the fixed ITEM_HEIGHT flow */}
                        <h3 
                          className="font-display font-black leading-none uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{
                            // Reduced overall font sizes to allow more items to be visible
                            fontSize: isActive ? 'clamp(2rem, 4vw, 3.25rem)' : 'clamp(1rem, 2vw, 1.5rem)',
                            color: isActive ? 'var(--color-primary)' : 'transparent',
                            WebkitTextStroke: isActive ? 'none' : '1px var(--color-primary)',
                            transition: 'color 0.4s ease, font-size 0.4s ease'
                          }}
                        >
                          {entry.name}
                        </h3>
                        {/* Subheading removed as per user request */}
                      </div>
                    </div>
                  );
                })}
             </motion.div>

             {/* Alpha gradients over the list top & bottom */}
             <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ── Right Side: 3D Stage ── */}
        <div className="relative w-full md:w-[55%] h-1/2 md:h-full flex items-center justify-center">
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
