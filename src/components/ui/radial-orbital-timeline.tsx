"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
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
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  useEffect(() => {
    let rotationTimer: any;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 170;
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

  return (
    <div
      className="w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-transparent overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-6">

        {/* ── Orbital wheel — left side on desktop ──────────────── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center h-[300px] sm:h-[380px] lg:h-[440px] overflow-visible mb-2 sm:mb-6 lg:mb-0">
          <div className="relative w-[440px] h-[440px] flex-shrink-0 flex items-center justify-center scale-[0.65] sm:scale-[0.85] lg:scale-100 origin-center">
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
                    transition: 'transform 0.7s ease, opacity 0.3s ease',
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

                  {/* Always-visible label */}
                  <div
                    className={`
                    absolute top-13 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[10px] font-bold tracking-wide uppercase
                    transition-all duration-300
                    ${isActive ? 'text-primary' : 'text-text-secondary/70'}
                  `}
                    style={{ marginTop: '4px' }}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>

        {/* ── Detail panel — right side ─────────────────────────── */}
        <div className="w-full lg:w-1/2 flex-1 min-w-0 max-w-md lg:max-w-none">
          {activeItem ? (
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
                className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {activeItem.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed mb-6">
                {activeItem.content}
              </p>

              {/* Related services */}
              {activeItem.relatedIds.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary/60 mb-3">
                    Related Services
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.relatedIds.map((relatedId) => {
                      const relatedItem = timelineData.find(
                        (i) => i.id === relatedId
                      );
                      return (
                        <button
                          key={relatedId}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectNode(relatedId);
                          }}
                        >
                          {relatedItem?.title}
                          <ArrowRight size={10} className="text-primary" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-text-secondary/50">
              <p className="text-sm font-medium">Select a service to learn more</p>
            </div>
          )}
        </div>
      </div>

      {/* Inline keyframes for panel animation */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
