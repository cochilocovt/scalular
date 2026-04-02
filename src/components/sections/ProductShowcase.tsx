'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GARMENT_CATALOG, type GarmentEntry } from '@/components/3d/GarmentModels';

/* ─── T-Shirt Image Sequence ────────────────────────────── */
const TSHIRT_FRAMES = [
  '/images/tshirt_seq/-01.png',
  '/images/tshirt_seq/-02.png',
  '/images/tshirt_seq/-03.png',
  '/images/tshirt_seq/-04.png',
  '/images/tshirt_seq/-05.png',
  '/images/tshirt_seq/-06.png',
  '/images/tshirt_seq/-07.png',
  '/images/tshirt_seq/-09.png',
  '/images/tshirt_seq/-10.png',
  '/images/tshirt_seq/-11.png',
  '/images/tshirt_seq/-12.png',
  '/images/tshirt_seq/-13.png',
  '/images/tshirt_seq/-14.png',
  '/images/tshirt_seq/-15.png',
  '/images/tshirt_seq/-16.png',
  '/images/tshirt_seq/-17.png',
];

function ImageSequenceViewer({ frames }: { frames: string[] }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const dragRef = useRef(0);
  
  // pre-load images
  useEffect(() => {
    frames.forEach(src => {
      const img = new globalThis.Image();
      img.src = src;
    });
  }, [frames]);

  return (
    <div 
      className="absolute inset-0 cursor-ew-resize"
      onPointerDown={(e) => {
        e.stopPropagation();
        dragRef.current = e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) {
          e.stopPropagation();
          const diff = e.clientX - dragRef.current;
          if (Math.abs(diff) > 10) {
            setFrameIndex((prev) => (prev + (diff > 0 ? 1 : -1) + frames.length) % frames.length);
            dragRef.current = e.clientX;
          }
        }
      }}
    >
      <img 
        src={frames[frameIndex]} 
        alt="Product rotation" 
        className="w-full h-full object-contain pointer-events-none p-2 drop-shadow-2xl" 
        draggable={false}
      />
    </div>
  );
}

/* ─── Lazy 3D scene per garment ─────────────────────────── */
function GarmentScene({ entry }: { entry: GarmentEntry }) {
  const { Component, color } = entry;
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} />
      <Component color={color} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}

/* SSR-safe wrapper */
const GarmentSceneClient = dynamic(() => Promise.resolve(GarmentScene), { ssr: false });

/* ─── Single card ─────────────────────────────────────────── */
function GarmentCard({ entry, isActive }: { entry: GarmentEntry; isActive: boolean }) {
  return (
    <motion.div
      layout
      animate={{ scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.55 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
        isActive ? 'glass-card shadow-xl' : 'glass-panel'
      }`}
      style={{ width: 220, minWidth: 220, border: isActive ? `2px solid var(--primary-border)` : '1px solid var(--glass-border)' }}
    >
      {/* 3D viewport — only mount for active ±1 items */}
      <div className="h-52 w-full relative bg-gradient-to-b from-background to-surface-raised">
        {isActive && entry.id === 'tshirt' && (
          <ImageSequenceViewer frames={TSHIRT_FRAMES} />
        )}
        {isActive && entry.id !== 'tshirt' && (
          <div className="absolute inset-0">
            <GarmentSceneClient entry={entry} />
          </div>
        )}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center text-5xl select-none opacity-30">
            👕
          </div>
        )}
        {/* Category pill */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black tracking-widest uppercase">
          {entry.category}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-black text-text-primary tracking-tight mb-0.5">{entry.name}</h3>
        <p className="text-[11px] text-text-secondary leading-snug">{entry.description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main carousel ─────────────────────────────────────── */
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = GARMENT_CATALOG.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch/drag state
  const dragStartX = useRef(0);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, active]);

  // Visible indices: prev, active, next (3 cards)
  const indices = [
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
  ];

  return (
    <div className="relative w-full py-10">
      {/* Section header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
        >
          Product Range
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter mb-2"
        >
          17 Garment Categories
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-text-secondary text-base max-w-md mx-auto"
        >
          From basics to outerwear — we source every garment type to perfection.
        </motion.p>
      </div>

      {/* Carousel */}
      <div
        className="relative flex items-center justify-center gap-4 px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; setPaused(true); }}
        onTouchEnd={(e) => {
          const diff = dragStartX.current - e.changedTouches[0].clientX;
          if (diff > 40) next();
          else if (diff < -40) prev();
          setPaused(false);
        }}
      >
        {/* Prev button */}
        <button
          onClick={prev}
          className="hidden md:flex w-10 h-10 rounded-full neu-btn items-center justify-center text-text-secondary hover:text-primary shrink-0 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div className="flex items-center gap-4 overflow-visible">
          {indices.map((idx, pos) => (
            <GarmentCard
              key={GARMENT_CATALOG[idx].id}
              entry={GARMENT_CATALOG[idx]}
              isActive={pos === 1}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          className="hidden md:flex w-10 h-10 rounded-full neu-btn items-center justify-center text-text-secondary hover:text-primary shrink-0 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {GARMENT_CATALOG.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? 'var(--primary)' : 'var(--border)',
            }}
          />
        ))}
      </div>

      {/* Name label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest mt-3"
        >
          {GARMENT_CATALOG[active].name}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
