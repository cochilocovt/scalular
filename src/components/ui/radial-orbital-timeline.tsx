"use client";
import { useState, useEffect, useRef } from "react";
import { type LucideIcon } from "lucide-react";
import { motion, AnimatePresence, animate, AnimationPlaybackControls } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo-icon.png";

interface TimelineItem {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const rotationAngleRef = useRef<number>(0);
  useEffect(() => { rotationAngleRef.current = rotationAngle; }, [rotationAngle]);

  const [direction, setDirection] = useState<1 | -1>(1);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Auto-select first node on mount to teach the interaction pattern
  useEffect(() => {
    if (timelineData.length > 0 && activeNodeId === null) {
      const timer = setTimeout(() => {
        setActiveNodeId(timelineData[0].id);
        setAutoRotate(false);
        centerViewOnNode(timelineData[0].id);
      }, 800);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineData]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setActiveNodeId(null);
      setAutoRotate(true);
    }
  };

  const selectNode = (id: number) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
      setAutoRotate(true);
    } else {
      setActiveNodeId(id);
      setAutoRotate(false);
      centerViewOnNode(id);
    }
  };

  // Auto-cycle through services every 5.5 seconds
  useEffect(() => {
    // Only auto-cycle if a node is currently selected
    if (!isDesktop || activeNodeId === null) return;

    const cycleTimer = setInterval(() => {
      const currentIndex = timelineData.findIndex(item => item.id === activeNodeId);
      if (currentIndex === -1) return;
      
      const nextIndex = (currentIndex + 1) % timelineData.length;
      const nextId = timelineData[nextIndex].id;
      
      setActiveNodeId(nextId);
      centerViewOnNode(nextId);
    }, 5500);

    return () => clearInterval(cycleTimer);
  }, [activeNodeId, timelineData, isDesktop]);

  useEffect(() => {
    if (!isDesktop || !autoRotate) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      // ~0.3 degrees per 50ms = 6 degrees/second
      setRotationAngle((prev) => {
        const newAngle = (prev + (delta * 0.006)) % 360;
        return Number(newAngle.toFixed(3));
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoRotate, isDesktop]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetBase = 270 - ((nodeIndex / totalNodes) * 360);

    const current = rotationAngleRef.current;
    const c = current % 360;
    let target = targetBase % 360;
    if (target < 0) target += 360;
    let cPos = c;
    if (cPos < 0) cPos += 360;

    let delta = target - cPos;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const finalTarget = current + delta;

    setDirection(delta > 0 ? -1 : 1);

    if (animationRef.current) animationRef.current.stop();

    animationRef.current = animate(current, finalTarget, {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 1,
      onUpdate: (latest) => setRotationAngle(latest)
    });
  };

  const calculateNodePosition = (index: number, total: number, radius = 170) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const activeItem = timelineData.find((item) => item.id === activeNodeId);

  const textVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 60 : -60,
      opacity: 0,
    })
  };

  return (
    <div
      className="w-full min-h-[320px] lg:min-h-[550px] flex items-center justify-center bg-transparent overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6">

        {/* ── Mobile: Distilled Linear Flow ──────────── */}
        <div className="w-[calc(100%+3rem)] -mx-6 flex lg:hidden flex-col gap-4 px-6 py-8 border-t border-border/30 bg-transparent">
          {timelineData.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex gap-4 p-5 rounded-2xl bg-surface border border-border/50 shadow-sm relative overflow-hidden">
                {/* Subtle highlight in the corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
                
                <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-background border border-border/60 flex items-center justify-center text-primary shadow-inner">
                  <Icon size={20} />
                </div>
                
                <div className="flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-1.5">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Desktop: Orbital wheel — left side ──────────────── */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center h-[440px] overflow-visible">
          <div className="relative w-[440px] h-[440px] flex-shrink-0 flex items-center justify-center origin-center">
            <div
              className="absolute w-full h-full flex items-center justify-center"
              ref={orbitRef}
              style={{ perspective: '1200px' }}
            >
              {/* Central Logo Node */}
              <div className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-md">
              <Image src={logo} alt="Scalular" width={56} height={56} className="rounded-full" loading="eager" />
            </div>

            <div className="absolute w-[340px] h-[340px] rounded-full border border-border opacity-40"></div>
            <div className="absolute w-[340px] h-[340px] rounded-full bg-primary/3 blur-3xl opacity-15"></div>

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isActive = activeNodeId === item.id;
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isActive ? 200 : position.zIndex,
                opacity: isActive ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => { nodeRefs.current[item.id] = el; }}
                  className="absolute cursor-pointer"
                  style={{
                    ...nodeStyle,
                    transition: 'opacity 0.3s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectNode(item.id);
                  }}
                >
                  {/* Node circle */}
                  <div
                    className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    ${isActive
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-surface text-text-primary border-border hover:border-primary/40'
                    }
                    border-2 transition-all duration-300
                    ${isActive ? 'scale-115' : 'hover:scale-110'}
                  `}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Always-visible label with increased spacing */}
                  <div
                    className={`
                    absolute top-[72px] left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[10px] font-bold tracking-wide uppercase
                    transition-all duration-300
                    ${isActive ? 'text-primary' : 'text-text-secondary/70'}
                  `}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>

        {/* ── Detail panel — right side (Desktop Only) ────────────── */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-1 min-w-0 max-w-md lg:max-w-none mt-6 lg:mt-0 flex-col justify-center">
          {activeItem ? (() => {
            return (
              <div
                key={activeItem.id}
                className="animate-in fade-in slide-in-from-right-4 duration-300"
                style={{
                  animation: 'fadeSlideIn 0.35s ease forwards',
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                  {activeItem.category}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {activeItem.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed mb-6 whitespace-pre-line">
                  {activeItem.content}
                </p>
              </div>
            );
          })() : (
            <div className="text-text-secondary/50">
              <p className="text-sm font-medium">Select a service to learn more</p>
            </div>
          )}
        </div>
      </div>

      {/* Inline keyframes for panel animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
