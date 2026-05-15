'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
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
      dpr={isMobileCanvas ? 1.5 : undefined}
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

  /* ── Responsive check ───────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Auto-cycle (desktop + mobile) ──────────────────────── */
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GARMENT_CATALOG.length);
    }, isMobile ? 3000 : 2000);
    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  /* ── Preload next GLB on mobile ─────────────────────────── */
  useEffect(() => {
    if (!isMobile) return;
    const nextIdx = (activeIndex + 1) % GARMENT_CATALOG.length;
    useGLTF.preload(GARMENT_CATALOG[nextIdx].url);
  }, [activeIndex, isMobile]);

  /* ── Mobile thumbnail tap ───────────────────────────────── */
  const handleMobileTap = (idx: number) => {
    setActiveIndex(idx);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    setIsHovered(true);
    interactTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 3000);
  };

  return (
    <div className="relative w-full py-0 md:py-4">

      {/* Header */}
      <div className="relative w-full max-w-7xl mx-auto px-6 mb-8 md:mb-10 z-10 flex items-center justify-center">
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary/80">
          What we manufacture
        </span>
      </div>

      {/* ════════════════════ DESKTOP LAYOUT (unchanged) ════════════════════ */}
      <div
        className="hidden md:flex relative mx-auto w-full max-w-7xl h-[550px] flex-col-reverse md:flex-row overflow-hidden bg-background/50 rounded-3xl border border-border/50 shadow-xl z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-600 to-transparent z-30 opacity-80" />

        {/* Left Side: Static List */}
        <div className="relative w-full md:w-[45%] h-full flex flex-col justify-center border-r border-border/50">
          <div className="w-full h-full relative overflow-hidden flex flex-col items-start justify-center px-12 py-2">
            {GARMENT_CATALOG.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={entry.id}
                  className="relative w-full flex items-center cursor-pointer"
                  style={{
                    height: isActive ? '44px' : '24px',
                    opacity: isActive ? 1 : 0.45,
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <h3
                    className="font-display font-black leading-none uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis w-full"
                    style={{
                      fontSize: isActive ? '32px' : '13px',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-blue-400)',
                      transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                  >
                    {entry.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: 3D Stage */}
        <div className="relative w-full md:w-[55%] h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          <SafeCanvas isMobileCanvas={false}>
            <GLBModel key={GARMENT_CATALOG[activeIndex].url} url={GARMENT_CATALOG[activeIndex].url} isActive={true} />
          </SafeCanvas>
        </div>
      </div>

      {/* ════════════════════ MOBILE LAYOUT (split-screen) ════════════════════ */}
      <div className="block md:hidden w-full">

        {/* ── Sticky 3D Viewer ────────────────────────────────── */}
        <div
          className="sticky top-0 z-20 w-full flex items-center justify-center bg-background"
          style={{ height: '50svh', pointerEvents: 'none' }}
        >
          <SafeCanvas isMobileCanvas={true}>
            <GLBModel
              key={GARMENT_CATALOG[activeIndex].url}
              url={GARMENT_CATALOG[activeIndex].url}
              isActive={true}
            />
          </SafeCanvas>

          {/* Garment name + pagination — anchored to bottom */}
          <div
            className="absolute bottom-2 left-1/2 flex flex-col items-center gap-1.5"
            style={{ transform: 'translateX(-50%)' }}
          >
            <h2
              className="font-display font-bold text-sm uppercase tracking-[0.15em]"
              style={{ color: 'var(--color-primary)', whiteSpace: 'nowrap' }}
            >
              {GARMENT_CATALOG[activeIndex].name}
            </h2>
            <div className="flex items-center gap-1.5">
              {GARMENT_CATALOG.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === activeIndex ? 16 : 5,
                    height: 5,
                    borderRadius: 3,
                    background: 'var(--color-primary)',
                    opacity: i === activeIndex ? 0.9 : 0.2,
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Thumbnail Grid (scrolls with page) ─────────────── */}
        <div className="relative w-full px-3 pb-6 pt-2">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}
          >
            {GARMENT_CATALOG.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.button
                  key={entry.id}
                  onClick={() => handleMobileTap(idx)}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: 12,
                    border: isActive
                      ? '2px solid var(--color-primary)'
                      : '1px solid var(--border)',
                    background: 'var(--background)',
                    opacity: isActive ? 1 : 0.7,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.3s, opacity 0.3s',
                    outline: 'none',
                  }}
                >
                  <img
                    src={`/images/models/${entry.id}.png`}
                    alt={entry.name}
                    loading="lazy"
                    draggable={false}
                    style={{
                      width: '85%',
                      height: '85%',
                      objectFit: 'contain',
                    }}
                  />

                  {/* Garment name label */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 6,
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                      opacity: isActive ? 1 : 0.6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'color 0.3s, opacity 0.3s',
                    }}
                  >
                    {entry.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
