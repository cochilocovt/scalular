'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  AnimatePresence
} from 'framer-motion';
import {
  Ship, Truck, Plane, Factory, Scissors, Package,
  ClipboardList, Layers, ReceiptText, ScanBarcode, Scale, Ruler,
  Container, Shirt, Landmark, BriefcaseBusiness
} from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/logo-icon.png';

const SUPPLY_ICONS = [
  Ship, Truck, Plane, Factory, Scissors, Package,
  ClipboardList, Layers, ReceiptText, ScanBarcode,
  Scale, Ruler, Container, Shirt, Landmark, BriefcaseBusiness
];

const TOTAL = 64;

function generateCirclePositions(n: number) {
  const outerN = Math.round(n * 0.55);
  const midN   = Math.round(n * 0.30);
  const innerN = n - outerN - midN;
  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < outerN; i++) {
    const angle = (i / outerN) * Math.PI * 2;
    positions.push({ x: Math.cos(angle) * 220, y: Math.sin(angle) * 220 });
  }
  for (let i = 0; i < midN; i++) {
    const angle = (i / midN) * Math.PI * 2 + Math.PI / midN;
    positions.push({ x: Math.cos(angle) * 130, y: Math.sin(angle) * 130 });
  }
  for (let i = 0; i < innerN; i++) {
    const angle = (i / innerN) * Math.PI * 2 + Math.PI / innerN / 2;
    positions.push({ x: Math.cos(angle) * 55, y: Math.sin(angle) * 55 });
  }
  return positions;
}

interface Particle {
  id: number;
  iconIdx: number;
  chaosX: number;
  chaosY: number;
  orderX: number;
  orderY: number;
  floatClass: string;
}

function ParticleItem({
  p,
  smoothConvergence,
}: {
  p: Particle;
  smoothConvergence: any;
}) {
  const Icon = SUPPLY_ICONS[p.iconIdx];

  const x = useTransform(smoothConvergence, [0, 1], [p.chaosX, p.orderX]);
  const y = useTransform(smoothConvergence, [0, 1], [p.chaosY, p.orderY]);
  const opacity = useTransform(smoothConvergence, [0, 0.4, 1], [0.15, 0.4, 0.9]);
  const iconColor = useTransform(
    smoothConvergence,
    [0, 0.6, 1],
    ['#1E40AF', '#3B82F6', '#60A5FA']
  );

  return (
    <motion.div
      className="absolute"
      style={{ x, y, opacity }}
    >
      <div className={p.floatClass}>
        <motion.div 
          style={{ color: iconColor }}
          className="p-2 rounded-lg border-white/5"
        >
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ChaosToOrder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [phase, setPhase] = useState<'chaos' | 'converging' | 'fixed'>('chaos');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawConvergence = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const smoothConvergence = useSpring(rawConvergence, { stiffness: 30, damping: 20, mass: 1 });

  const sectionOpacity = useTransform(scrollYProgress, [0.85, 0.98], [1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0.85, 0.98], [1, 0.96]);

  useEffect(() => {
    const unsub = smoothConvergence.on('change', (v) => {
      if (v < 0.2) setPhase('chaos');
      else if (v < 0.8) setPhase('converging');
      else setPhase('fixed');
    });
    return unsub;
  }, [smoothConvergence]);

  useEffect(() => {
    const circlePos = generateCirclePositions(TOTAL);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setParticles(
      Array.from({ length: TOTAL }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.7;
        return {
          id: i,
          iconIdx: i % SUPPLY_ICONS.length,
          chaosX: Math.cos(angle) * (vw * 0.48) * radius,
          chaosY: Math.sin(angle) * (vh * 0.45) * radius,
          orderX: circlePos[i].x,
          orderY: circlePos[i].y,
          floatClass: `float-${i % 6}`,
        };
      })
    );
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: '220vh' }}
      className="relative z-20"
    >
      <motion.div 
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              smoothConvergence,
              [0, 1],
              [
                'radial-gradient(circle at 50% 50%, rgba(30,64,175,0.06) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
              ]
            ),
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <ParticleItem key={p.id} p={p} smoothConvergence={smoothConvergence} />
          ))}

          <AnimatePresence>
            {phase === 'fixed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="absolute z-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-[60px] animate-pulse" />
                  <div className="bg-slate-950/40 backdrop-blur-xl p-6 rounded-full border border-blue-500/20 shadow-2xl overflow-hidden min-w-[120px] min-h-[120px] flex items-center justify-center">
                    <Image 
                      src={logo} 
                      alt="Scalular Logo" 
                      width={100} 
                      height={100} 
                      className="relative z-10 rounded-full" 
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl pointer-events-none">
          <AnimatePresence mode="wait">
            {phase === 'chaos' && (
              <motion.div
                key="chaos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-text-primary leading-[1.1] mb-6 tracking-tight">
                  Sourcing is<br />
                  <span className="text-primary">a mess.</span>
                </h1>
                <p className="text-base md:text-lg text-text-secondary mb-10 max-w-md mx-auto font-medium">
                  Weeks of emails to strangers, no guarantees, no visibility. There&apos;s a better way.
                </p>
                <div className="flex items-center justify-center gap-2 text-text-secondary/40 text-[10px] font-bold uppercase tracking-[0.2em] animate-bounce">
                  <span>Scroll to Organise</span>
                </div>
              </motion.div>
            )}
            
            {phase === 'fixed' && (
              <motion.div
                key="fixed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-[320px]"
              >
                <h2 className="text-4xl md:text-6xl font-black text-text-primary leading-[1.1] mb-6 tracking-tighter">
                  Scalular <span className="text-gradient">changes that.</span>
                </h2>
                <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto mb-10 font-medium">
                  One place to find, compare, and order from verified factories — worldwide.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 text-blue-500/40 text-[10px] font-bold tracking-[0.3em] uppercase">
                  <span>Explore Our Network</span>
                  <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
