"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { type LucideIcon } from "lucide-react";
import { motion, animate, AnimationPlaybackControls } from "framer-motion";
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

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const [direction, setDirection] = useState<1 | -1>(1);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [prevActiveItem, setPrevActiveItem] = useState<TimelineItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serviceSeenCount = useRef<number>(0);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeItem = timelineData.find((item) => item.id === activeNodeId) || null;

  // Track previous active item for crossfade transitions
  useEffect(() => {
    if (activeItem) {
      if (prevActiveItem && prevActiveItem.id !== activeItem.id) {
        setIsTransitioning(true);
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          setPrevActiveItem(activeItem);
          setIsTransitioning(false);
        }, 280);
      } else if (!prevActiveItem) {
        setPrevActiveItem(activeItem);
      }
    } else {
      setPrevActiveItem(null);
      setIsTransitioning(false);
    }
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem?.id]);

  const getReferenceIndex = useCallback(() => {
    if (activeNodeId === null) return 0;
    const idx = timelineData.findIndex(item => item.id === activeNodeId);
    return idx === -1 ? 0 : idx;
  }, [activeNodeId, timelineData]);

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
      const currentIndex = timelineData.findIndex((item) => item.id === activeNodeId);
      const targetIndex = timelineData.findIndex((item) => item.id === id);
      if (currentIndex !== -1 && targetIndex !== -1) {
        setDirection(targetIndex > currentIndex ? 1 : -1);
      } else {
        setDirection(1);
      }
      setActiveNodeId(id);
      setAutoRotate(false);
      if (!isMobile) {
        centerViewOnNode(id);
      }

      serviceSeenCount.current += 1;
      if (serviceSeenCount.current >= 2 && showOnboarding) {
        setShowOnboarding(false);
      }
    }
  };

  const goToNextService = useCallback(() => {
    if (timelineData.length === 0) return;
    const currentIndex = timelineData.findIndex(item => item.id === activeNodeId);
    let nextIndex = 0;
    if (currentIndex !== -1) {
      nextIndex = (currentIndex + 1) % timelineData.length;
    }
    const nextId = timelineData[nextIndex].id;
    setDirection(1);
    setActiveNodeId(nextId);
    setAutoRotate(false);
    if (!isMobile) {
      centerViewOnNode(nextId);
    }

    serviceSeenCount.current += 1;
    if (serviceSeenCount.current >= 2 && showOnboarding) {
      setShowOnboarding(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNodeId, timelineData, isMobile, showOnboarding]);

  const goToPrevService = useCallback(() => {
    if (timelineData.length === 0) return;
    const currentIndex = timelineData.findIndex(item => item.id === activeNodeId);
    let prevIndex = timelineData.length - 1;
    if (currentIndex !== -1) {
      prevIndex = (currentIndex - 1 + timelineData.length) % timelineData.length;
    }
    const prevId = timelineData[prevIndex].id;
    setDirection(-1);
    setActiveNodeId(prevId);
    setAutoRotate(false);
    if (!isMobile) {
      centerViewOnNode(prevId);
    }

    serviceSeenCount.current += 1;
    if (serviceSeenCount.current >= 2 && showOnboarding) {
      setShowOnboarding(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNodeId, timelineData, isMobile, showOnboarding]);

  // Removed auto-cycle to let the user control navigation by pressing the central logo

  useEffect(() => {
    if (!autoRotate || isMobile) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      // ~0.3 degrees per 50ms = 6 degrees/second
      setRotationAngle((prev) => {
        const newAngle = (prev + (delta * 0.006)) % 360;
        return Number(newAngle.toFixed(3));
      });
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoRotate, isMobile]);

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

  // Determine which text to show: during transition show outgoing, after transition show incoming
  const displayItem = isTransitioning ? prevActiveItem : activeItem;

  return (
    <div
      className="w-full min-h-[320px] lg:min-h-[550px] flex items-center justify-center bg-transparent overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6">

        {/* ── Mobile: Semi-Circle Navigation Arc ──────────── */}
        <div className="w-full flex lg:hidden relative flex-col bg-transparent">
          {/* Content Area — fixed height to prevent layout shifts */}
          <div className="w-full px-6 pt-6 pb-2 h-[190px] flex flex-col justify-start overflow-hidden relative">
            {displayItem ? (
              <div
                key={displayItem.id}
                className="flex flex-col rot-text-enter"
                style={{ willChange: 'transform, opacity' }}
              >
                <h3
                  className="text-2xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {displayItem.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed pr-2 line-clamp-4">
                  {displayItem.content}
                </p>
              </div>
            ) : (
              <div className="text-text-secondary/50 text-sm font-medium my-auto text-center flex flex-col items-center gap-1.5 w-full pointer-events-auto">
                <p className="font-semibold text-text-primary">Press in the center</p>
                <p className="text-xs text-text-secondary/60">to view services, or swipe to explore</p>
              </div>
            )}
          </div>

          {/* Semi-Circle Arc Area */}
          <div 
            className="w-[calc(100%+3rem)] -mx-6 h-[220px] relative mt-2"
            style={{
              background: "radial-gradient(circle 120px at 50% 180px, rgba(56, 189, 248, 0.22) 0%, transparent 80%), radial-gradient(circle 240px at 50% 180px, rgba(37, 99, 235, 0.12) 0%, rgba(23, 27, 46, 0.02) 60%, transparent 100%)",
            }}
          >
            {/* Gesture Detection Overlay */}
            <div
              className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                touchStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null || touchStartY.current === null) return;
                const diffX = e.changedTouches[0].clientX - touchStartX.current;
                const diffY = e.changedTouches[0].clientY - touchStartY.current;
                
                // Only trigger horizontal swipe if horizontal movement is larger than vertical and exceeds threshold
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                  if (diffX < 0) {
                    goToNextService();
                  } else {
                    goToPrevService();
                  }
                }
                touchStartX.current = null;
                touchStartY.current = null;
              }}
            />



            {/* Nodes Group Container */}
            <div className="relative w-full h-full">
              {timelineData.map((item, index) => {
                const activeIndex = getReferenceIndex();
                const isActive = activeNodeId === item.id;
                const Icon = item.icon;

                // Calculate relative wrapping index difference
                let diff = index - activeIndex;
                const total = timelineData.length;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                // Check if visible (active, active-1, active-2, active+1, active+2)
                const isVisible = Math.abs(diff) <= 2;

                // Semi-circle coordinates
                const radius = 135;
                const angleSpacing = 38;
                const angle = 270 + diff * angleSpacing;
                const radian = (angle * Math.PI) / 180;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`
                      absolute w-14 h-14 rounded-full flex items-center justify-center
                      border focus:outline-none focus:ring-2 focus:ring-primary/50
                      rot-node
                      ${isActive
                        ? 'bg-primary text-white border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.35)]'
                        : 'bg-surface text-text-primary border-border hover:border-primary/50'
                      }
                    `}
                    style={{
                      left: "50%",
                      top: "180px",
                      transform: `translate3d(${x}px, ${y}px, 0) scale(${isActive ? 1.15 : 0.9})`,
                      marginLeft: "-28px",
                      marginTop: "-28px",
                      zIndex: isActive ? 50 : 30 - Math.abs(diff),
                      opacity: isVisible ? (isActive ? 1 : (Math.abs(diff) === 1 ? 0.75 : 0.35)) : 0,
                      pointerEvents: isVisible ? 'auto' : 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectNode(item.id);
                    }}
                    aria-label={`Service: ${item.title}`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    <Icon size={isActive ? 24 : 20} />
                  </button>
                );
              })}

              {/* Center Pulsing Hub Button */}
              <div 
                className="absolute z-20 pointer-events-auto"
                style={{
                  left: "50%",
                  top: "180px",
                  transform: "translate3d(-50%, -50%, 0)",
                }}
              >
                <button
                  type="button"
                  className="w-14 h-14 rounded-full border border-border/30 flex items-center justify-center bg-surface/80 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary relative shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextService();
                  }}
                  aria-label="View next service"
                >
                  <Image 
                    src={logo} 
                    alt="Scalular Logo" 
                    width={48} 
                    height={48} 
                    className="rounded-full opacity-90 select-none pointer-events-none" 
                    loading="lazy" 
                  />
                  {/* Onboarding cue — shown until 2 services seen */}
                  {showOnboarding && (
                    <>
                      {/* Spinning crescent arc */}
                      <svg
                        className="absolute -inset-2 pointer-events-none onboard-arc"
                        viewBox="0 0 72 72"
                        fill="none"
                      >
                        <circle
                          cx="36" cy="36" r="33"
                          stroke="url(#arcGrad)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="52 156"
                        />
                        <defs>
                          <linearGradient id="arcGrad" x1="0" y1="0" x2="72" y2="72">
                            <stop offset="0%" stopColor="rgba(56,189,248,0.8)" />
                            <stop offset="100%" stopColor="rgba(37,99,235,0.3)" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Tap finger icon */}
                      <svg
                        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 pointer-events-none onboard-tap-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(56,189,248,0.9)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 13.5V8a2 2 0 0 0-4 0v5.5" />
                        <path d="M14 13.5a2 2 0 0 1 4 0v1.5a6 6 0 0 1-6 6h-1a7 7 0 0 1-7-7V12a2 2 0 0 1 4 0" />
                        <path d="M11 13.5V7a2 2 0 0 0-4 0v6.5" />
                      </svg>
                    </>
                  )}

                  {/* Pulsing halos - Logo Inspired */}
                  {/* Inner Sky Blue */}
                  <div
                    className="absolute -inset-1.5 rounded-full border border-sky-400/50 pointer-events-none pulse-halo-1"
                  />
                  {/* Outer Royal Blue */}
                  <div
                    className="absolute -inset-3 rounded-full border border-blue-500/20 pointer-events-none pulse-halo-2"
                  />
                </button>
              </div>
            </div>
          </div>
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
              <div className="absolute flex flex-col items-center justify-center z-10 gap-1.5">
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer bg-background relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextService();
                  }}
                  animate={{
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image src={logo} alt="Scalular" width={56} height={56} className="rounded-full select-none" loading="eager" />
                  {/* Pulsing halo */}
                  <div
                    className="absolute -inset-1 rounded-full border border-primary/50 pointer-events-none pulse-halo-desktop"
                  />
                </motion.div>
                <div className="text-[9px] text-text-secondary/60 font-semibold tracking-wider uppercase text-center pointer-events-none select-none max-w-[90px] leading-tight mt-1">
                  Press
                </div>
                <div className="text-[8px] text-primary/70 font-medium tracking-normal text-center pointer-events-none select-none max-w-[90px] leading-tight">
                  to view Next
                </div>
              </div>

            <div className="absolute w-[340px] h-[340px] rounded-full border border-border opacity-40"></div>
            <div className="absolute w-[340px] h-[340px] rounded-full bg-primary/3 blur-3xl opacity-15"></div>

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isActive = activeNodeId === item.id;
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
                zIndex: isActive ? 200 : position.zIndex,
                opacity: isActive ? 1 : position.opacity,
                willChange: 'transform, opacity' as const,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => { nodeRefs.current[item.id] = el; }}
                  className="absolute cursor-pointer"
                  style={nodeStyle}
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
              <p className="text-sm font-medium">Press in the center to view services</p>
            </div>
          )}
        </div>
      </div>

      {/* Inline keyframes for panel and pulsing animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Mobile text entry — pure CSS, GPU-composited */
        @keyframes rotTextEnter {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .rot-text-enter {
          animation: rotTextEnter 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        /* Mobile node transitions — all GPU-composited */
        .rot-node {
          will-change: transform, opacity;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.3s ease,
                      border-color 0.2s ease,
                      background-color 0.2s ease;
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Pulsing halos */
        @keyframes pulse-halo-1 {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        @keyframes pulse-halo-2 {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        @keyframes pulse-halo-desktop {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        .pulse-halo-1 {
          animation: pulse-halo-1 2.2s infinite ease-in-out;
          will-change: transform, opacity;
        }
        .pulse-halo-2 {
          animation: pulse-halo-2 2.8s infinite ease-in-out;
          will-change: transform, opacity;
        }
        .pulse-halo-desktop {
          animation: pulse-halo-desktop 2s infinite ease-in-out;
          will-change: transform, opacity;
        }

        /* Spinning crescent arc — slow continuous rotation */
        @keyframes onboard-arc-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .onboard-arc {
          animation: onboard-arc-spin 3s linear infinite;
          will-change: transform;
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Tap icon — gentle bob to draw attention */
        @keyframes onboard-tap-bob {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.9; }
          50%      { transform: translate3d(-1px, -2px, 0) scale(1.1); opacity: 1; }
        }
        .onboard-tap-icon {
          animation: onboard-tap-bob 1.8s ease-in-out infinite;
          will-change: transform, opacity;
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .onboard-arc { animation: none; }
          .onboard-tap-icon { animation: none; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
