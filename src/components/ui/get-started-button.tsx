'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";

interface GetStartedButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
  target?: string;
  withLamp?: boolean;
}

export function GetStartedButton({
  label = 'Get Started',
  onClick,
  className,
  size = 'lg',
  href,
  target,
  withLamp = false,
}: GetStartedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes liquid-ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.0, // Switched to blue chrome
              u_shiftBlue: 0.8,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("Failed to load generic shader:", error);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const combinedClick = (e: React.MouseEvent<any>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    if (onClick) onClick();
  };

  const paddingClasses = size === 'lg' ? 'px-7 py-3.5 text-[15px]' : 
                         size === 'sm' ? 'px-5 py-2 text-[13px]' : 
                         size === 'icon' ? 'p-3' : 'px-6 py-3 text-sm';

  const content = (
    <div className="relative flex items-center justify-center gap-2">
      <span className="relative z-20 font-semibold tracking-tight text-white drop-shadow-md">
        {label}
      </span>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-20"
      >
        <ChevronRight size={size === 'sm' ? 16 : 18} strokeWidth={3} className="text-white drop-shadow-md" aria-hidden="true" />
      </motion.div>
    </div>
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const lampGlow = withLamp && (
    <div 
      className="absolute -top-[70px] left-1/2 flex w-[28rem] lg:w-[50rem] -translate-x-1/2 justify-center pointer-events-none z-0"
    >
      {/* 1. Volumetric Spotlight Beam */}
      <motion.div 
        initial={{ opacity: 0.5, width: isDesktop ? "15rem" : "10rem" }}
        whileInView={{ opacity: 1, width: isDesktop ? "50rem" : "24rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute top-[4px] h-[180px]"
        style={{ filter: "blur(6px)" }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(114, 124, 177, 0.45) 0%, transparent 100%)",
            clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0% 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* 2. Inner intense core beam */}
      <motion.div 
        initial={{ opacity: 0.5, width: isDesktop ? "8rem" : "6rem" }}
        whileInView={{ opacity: 1, width: isDesktop ? "38rem" : "18rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute top-[4px] h-[140px]"
        style={{ filter: "blur(4px)" }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(114, 124, 177, 0.3) 0%, transparent 100%)",
            clipPath: "polygon(7.9% 0, 92.1% 0, 100% 100%, 0% 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* 3. The 3D Physical Hardware Glass Tubelight */}
      <motion.div 
        initial={{ width: isDesktop ? "15rem" : "10rem" }}
        whileInView={{ width: isDesktop ? "32rem" : "16rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 flex items-center justify-center h-[6px] rounded-full isolate"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 100%)",
          boxShadow: "0 0 10px rgba(114, 124, 177, 0.5), inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -1px 3px rgba(114, 124, 177, 0.6)",
          maskImage: "linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%)",
        }}
      >
        <div className="w-[98%] h-[2px] bg-white rounded-full opacity-90 blur-[1px] shadow-[0_0_8px_rgba(255,255,255,1)]" />
      </motion.div>
    </div>
  );

  const innerComponent = (
    <div className={cn("relative inline-block w-full max-w-max outline-none isolate", className)}>
      {/* Aceternity Overhead Lamp Glow */}
      {lampGlow}

      {/* 3D Context Container */}
      <div 
        style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <div
          ref={containerRef}
          onClick={combinedClick}
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            cursor: "pointer",
          }}
          className={cn("group rounded-full outline-none block w-full", paddingClasses)}
        >
          {/* Base Invisible Spacer to give the robust, content-driven responsive bounds */}
          <div className="opacity-0 pointer-events-none select-none truncate" aria-hidden="true">
            {content}
          </div>

          {/* Z=30: Content Layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {content}
          </div>

          {/* Z=20: Inner Deep Background Core */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "2px", // Native internal border margin matching the snippet
                borderRadius: "100px",
                background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 1) 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.6), inset 0px 1px 2px rgba(14, 165, 233, 0.2)"
                  : "inset 0px 1px 1px rgba(56, 189, 248, 0.15)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          {/* Z=10: The Interactive Metal Shader Rim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "100px",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(2, 132, 199, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
                  : isHovered
                    ? "0px 0px 0px 1px rgba(14, 165, 233, 0.4), 0px 12px 6px 0px rgba(2, 132, 199, 0.1), 0px 8px 5px 0px rgba(0, 0, 0, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)"
                    : "0px 0px 0px 1px rgba(2, 132, 199, 0.3), 0px 36px 14px 0px rgba(0, 0, 0, 0.02), 0px 20px 12px 0px rgba(0, 0, 0, 0.08), 0px 9px 9px 0px rgba(0, 0, 0, 0.12), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "transparent",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "100px",
                  overflow: "hidden",
                }}
              />
            </div>
          </div>
          
          {/* Z=40: Liquid Drop Ripples */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 40,
              overflow: "hidden",
              borderRadius: "100px",
              pointerEvents: "none",
            }}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                  animation: "liquid-ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        target={target} 
        onClick={onClick} 
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="inline-block outline-none"
      >
        {innerComponent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block appearance-none bg-transparent border-none p-0 outline-none w-full" aria-label={label}>
      {innerComponent}
    </button>
  );
}
