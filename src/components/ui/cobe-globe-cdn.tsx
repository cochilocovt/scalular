"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"
import { Building2, Briefcase } from "lucide-react"

import { FACTORIES, BUYER_HUBS, SUPPLY_ARCS, OFFICES } from '@/data/factories';

interface GlobeMarker {
  id: string
  location: [number, number]
  region: string
  specialty: string
  color?: string
  isBuyer?: boolean
  isOffice?: boolean
  officeType?: 'hq' | 'office'
  factoryCount?: number
}

interface GlobeArc {
  id: string
  from: [number, number]
  to: [number, number]
}

interface GlobeCdnProps {
  markers?: GlobeMarker[]
  arcs?: GlobeArc[]
  className?: string
  speed?: number
  activeId?: string | null
  onActiveChange?: (id: string | null) => void
}

/* ── Resolved hex colors for COBE WebGL rendering ──────────── */
/* COBE runs on the GPU and cannot resolve CSS var() references, */
/* so we maintain a hex lookup keyed to the CSS variable names.  */
const VAR_TO_HEX: Record<string, string> = {
  'var(--color-blue-400)': '#727cb1',
  'var(--color-blue-700)': '#323959',
  'var(--color-blue-100)': '#eff0f6',
  'var(--color-neutral-700)': '#41413d',
  'var(--color-neutral-900)': '#222220',
  'var(--color-neutral-200)': '#d5d3ca',
  'var(--color-surface-muted)': '#ADACA4',
  'var(--color-primary)': '#171B2E',
  'var(--color-primary-alt)': '#1A1E31',
};

function resolveHex(cssVar: string): string {
  if (cssVar.startsWith('#')) return cssVar;
  return VAR_TO_HEX[cssVar] ?? '#171B2E';
}

/* ── Scalular factory countries (derived from shared data) ──── */
const defaultMarkers: GlobeMarker[] = [
  ...FACTORIES.map(f => ({
    id: f.id,
    location: f.location,
    region: f.name,
    specialty: f.specialty,
    color: resolveHex(f.accentColor),
    factoryCount: f.factoryCount,
  })),
  ...BUYER_HUBS.map(h => ({
    id: h.id,
    location: h.location,
    region: h.name,
    specialty: h.label,
    color: resolveHex(h.accentColor),
    isBuyer: true as const,
  })),
  ...OFFICES.map(o => ({
    id: o.id,
    location: o.location,
    region: o.name,
    specialty: o.label,
    color: o.accentColor,
    isOffice: true as const,
    officeType: o.type,
  })),
];

/* ── Supply chain arcs (factory → buyer hub) ─────────────────── */
const defaultArcs: GlobeArc[] = SUPPLY_ARCS.map(a => ({
  id: a.id,
  from: a.from,
  to: a.to,
}));

export function GlobeCdn({
  markers = defaultMarkers,
  arcs = defaultArcs,
  className = "",
  speed = 0.003,
  activeId = null,
  onActiveChange,
}: GlobeCdnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markersContainerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastInteractionTime = useRef<number>(0)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)

  // Track current state
  const currentPhiRef = useRef(0)
  const activeMarkerRef = useRef<string | null>(null)
  const activeStartTimeRef = useRef<number>(0)

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    lastInteractionTime.current = Date.now()
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    lastInteractionTime.current = Date.now()
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        lastInteractionTime.current = Date.now()
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    const canvas = canvasRef.current
    const container = containerRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 2.59 // Start exactly at the first marker (China) so arcs show without hover
    let theta = 0.2

    function init() {
      // FIX STRETCH: Get the smaller dimension to keep it square
      const width = container.offsetWidth
      const height = container.offsetHeight
      const size = Math.min(width, height)

      if (size === 0 || globe) return

      // Set canvas and marker container display size
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      if (markersContainerRef.current) {
        markersContainerRef.current.style.width = `${size}px`
        markersContainerRef.current.style.height = `${size}px`
      }

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: size * 2, // internal resolution
        height: size * 2,
        phi: 0,
        theta: 0.2,
        dark: 1,
        diffuse: 0.65,
        mapSamples: 16000,
        mapBrightness: 7,
        baseColor: [0.04, 0.06, 0.12],
        markerColor: [0.35, 0.85, 1.0], // Contrasting cyan dots on the globe
        glowColor: [0.18, 0.42, 0.95],
        markerElevation: 0.02,
        markers: markers.map((m) => ({
          location: m.location,
          size: m.isBuyer ? 0.008 : 0, // size 0 hides the native dot but keeps the anchor coordinate
          id: m.id,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: [0.1, 0.4, 1.0],
        arcWidth: 0.62,
        arcHeight: 0.25,
        opacity: 0.9,
      })

      // Pre-compute 3D vectors for manual coordinate projection
      const markerVectors = markers.map(m => {
        const r = m.location[0] * Math.PI / 180;
        const a = m.location[1] * Math.PI / 180 - Math.PI;
        const o = Math.cos(r);
        return {
          id: m.id,
          vector: [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)]
        }
      });

      function animate() {
        const now = Date.now()

        // Dynamically reduce speed if a country is actively highlighted so it stays visible for ~1.8s
        let currentSpeed = speed
        if (activeMarkerRef.current && (now - activeStartTimeRef.current) < 1800) {
          currentSpeed = 0.00022 // Extreme slow down (crawl), matched to original behavior
        }

        // Handle auto-rotation
        if (now - lastInteractionTime.current > 4000) {
          phi += currentSpeed
        }

        const currentTotalPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const currentTotalTheta = theta + thetaOffsetRef.current + dragOffset.current.theta

        // Dynamic Pulsing Arcs logic
        // Only show arcs that originate from the currently ACTIVE factory.
        // We look at activeMarkerRef.current to avoid 1-frame delays.
        const t = (now % 2000) / 2000;
        let animatedArcs = [] as typeof arcs;

        if (activeMarkerRef.current) {
          const activeMarker = markers.find(m => m.id === activeMarkerRef.current);
          if (activeMarker) {
            animatedArcs = arcs
              .filter(a => a.from[0] === activeMarker.location[0] && a.from[1] === activeMarker.location[1])
              .map(a => {
                // Simulate a pulse by varying color alpha (simulated with grey scale blending if 0-1)
                // Cobe uses [r,g,b] up to 1.
                // Pulse intensifier based on time `t`
                const pulse = Math.sin(t * Math.PI) * 0.8 + 0.2;
                return {
                  id: a.id,
                  from: a.from,
                  to: a.to,
                  color: [0.1 * pulse, 0.4 * pulse, 1 * pulse] // Blueish glowing pulse
                }
              });
          }
        }

        // Dynamic markers for continent highlighting
        let dynamicMarkers = markers.map((m) => ({
          location: m.location,
          size: m.isBuyer ? 0.008 : 0, // keep size 0 for factories so anchor variables are calculated
          id: m.id,
        }))

        if (activeMarkerRef.current) {
          const activeMarker = markers.find(m => m.id === activeMarkerRef.current)
          if (activeMarker) {
            // Find all arcs from this active factory
            const connectedHubCoords = arcs
              .filter(a => a.from[0] === activeMarker.location[0] && a.from[1] === activeMarker.location[1])
              .map(a => a.to)
            
            // Generate deterministic dot clusters for each destination hub
            connectedHubCoords.forEach((coord, i) => {
              // Hub center dot
              dynamicMarkers.push({
                location: coord,
                size: 0.025,
                id: `hub-center-${i}`
              })
              
              // Seed for this specific hub to ensure stable dot positions each frame
              let seed = Math.abs(coord[0] + coord[1])
              const pseudoRandom = () => {
                let x = Math.sin(seed++) * 10000
                return x - Math.floor(x)
              }

              // Create a dense cluster of glowing dots
              for(let j = 0; j < 85; j++) {
                const latOffset = (pseudoRandom() - 0.5) * 28 
                const lonOffset = (pseudoRandom() - 0.5) * 38 
                
                // Keep the cluster somewhat circular around the hub
                if (Math.hypot(latOffset, lonOffset) < 22) {
                    dynamicMarkers.push({
                      location: [coord[0] + latOffset, coord[1] + lonOffset],
                      // Increased sizes for a brighter glow
                      size: 0.009 + pseudoRandom() * 0.012, 
                      id: `glow-cluster-${i}-${j}`,
                    })
                }
              }
            })
          }
        }

        globe!.update({
          phi: currentTotalPhi,
          theta: currentTotalTheta,
          // @ts-ignore: cobe update options typings may not include arcs dynamically but it works at runtime
          arcs: animatedArcs,
          // @ts-ignore
          markers: dynamicMarkers,
        })

        // Manual coordinate projection for markers
        const r_t = Math.cos(currentTotalTheta);
        const a_t = Math.cos(currentTotalPhi);
        const o_t = Math.sin(currentTotalTheta);
        const i_t = Math.sin(currentTotalPhi);

        // Collect projected positions for all markers
        const projectedMarkers: { id: string; x: number; y: number; visible: boolean; isBuyer: boolean }[] = [];

        markerVectors.forEach(({ id, vector: vec }) => {
          const c = a_t * vec[0] + i_t * vec[2];
          const s = i_t * o_t * vec[0] + r_t * vec[1] - a_t * o_t * vec[2];
          
          const x = (c + 1) / 2;
          const y = (-s + 1) / 2;
          // Determine visibility based on sphere math
          const visible = -i_t * r_t * vec[0] + o_t * vec[1] + a_t * r_t * vec[2] >= 0 || c * c + s * s >= 0.64;
          
          const markerData = markers.find(m => m.id === id);
          projectedMarkers.push({ 
            id, 
            x, 
            y, 
            visible,
            isBuyer: markerData?.isBuyer ?? false
          });
        });

        // Collision-aware vertical nudging for hub labels
        // Only process visible hubs to avoid unnecessary work
        const visibleHubs = projectedMarkers.filter(m => m.isBuyer && m.visible);
        
        // Find the active factory if it's visible to act as a static blocker (we don't nudge it)
        const activeFactory = activeId ? projectedMarkers.find(m => m.id === activeId && m.visible) : null;
        
        // Merge them into a single list for collision checking
        const collisionItems = [...visibleHubs] as any[];
        if (activeFactory) {
          collisionItems.push({
            ...activeFactory,
            // Shift its center y upwards slightly to match its visual transform (translateY(-24px) etc.)
            y: activeFactory.y - (30 / size),
            isStatic: true
          });
        }

        // Sort items by y coordinate from top to bottom
        collisionItems.sort((a, b) => a.y - b.y);

        // Badge dimensions in normalized coordinates
        const badgeWidth = isMobile ? (85 / size) : (125 / size);
        const badgeHeight = isMobile ? (26 / size) : (36 / size);
        const nudges: Record<string, number> = {};

        for (let i = 0; i < collisionItems.length; i++) {
          const curr = collisionItems[i];
          if (curr.isStatic) continue; // Static blockers can't be nudged

          let nudgeY = 0;

          // Compare with all elements above it to find any horizontal overlap
          for (let j = 0; j < i; j++) {
            const prev = collisionItems[j];
            
            // Check horizontal overlap
            const horizOverlap = Math.abs(curr.x - prev.x) < badgeWidth;
            if (horizOverlap) {
              const prevNudge = nudges[prev.id] || 0;
              const effectivePrevY = prev.y + prevNudge;
              const currY = curr.y + nudgeY;
              
              // If there's vertical overlap with this pushed element, adjust nudgeY
              if (currY < effectivePrevY + badgeHeight) {
                nudgeY = (effectivePrevY + badgeHeight) - curr.y;
              }
            }
          }

          if (nudgeY > 0) {
            nudges[curr.id] = nudgeY;
          }
        }

        // Apply final positions
        projectedMarkers.forEach(({ id, x, y, visible }) => {
          const el = document.getElementById(`marker-${id}`);
          if (el) {
            const nudge = nudges[id] || 0;
            el.style.left = `${x * 100}%`;
            el.style.top = `${(y + nudge) * 100}%`;
            el.style.setProperty(`--cobe-visible-${id}`, visible ? "1" : "0");
          }
        });

        let closestMarkerId: string | null = null
        let minDistance = 0.2 // Tighter threshold so it only triggers near true center

        markers.forEach(m => {
          if (m.isBuyer) return
          // Marker phi in COBE terms. Cobe phi=0 is at lon=-90, so we add 1.5 * PI
          const markerPhi = (Math.PI * 1.5) - (m.location[1] * Math.PI) / 180
          // Calculate distance between current phi and marker phi
          let diff = (markerPhi - currentTotalPhi) % (Math.PI * 2)
          diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI
          const dist = Math.abs(diff)

          if (dist < minDistance) {
            minDistance = dist
            closestMarkerId = m.id
          }
        })

        if (closestMarkerId !== activeMarkerRef.current) {
          activeMarkerRef.current = closestMarkerId
          activeStartTimeRef.current = Date.now()
          onActiveChange?.(closestMarkerId)
        }

        currentPhiRef.current = currentTotalPhi
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    const ro = new ResizeObserver(() => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (globe) {
        globe.destroy()
        globe = null
      }
      init()
    })
    ro.observe(container)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
      ro.disconnect()
    }
  }, [markers, arcs, speed, onActiveChange])

  /* ── Marker shapes ─────────────────────────────────────────── */

  // Kinetic Weave Marker: 3 intersecting, rotating rings creating a 3D knot illusion
  const renderKineticWeave = (isActive: boolean, baseColor?: string) => {
    const size = isActive ? 22 : 14;
    const strokeWidth = isActive ? 1.5 : 1;
    const color = isActive ? '#7dd3fc' : (baseColor || '#171B2E'); // using primary or cyan
    const glow = isActive 
      ? `0 0 10px ${color}, inset 0 0 6px ${color}` 
      : `0 0 4px ${color}`;

    return (
      <div 
        style={{ 
          width: size, 
          height: size, 
          position: 'relative', 
          perspective: '150px',
          transformStyle: 'preserve-3d',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              border: `${strokeWidth}px solid ${color}`,
              borderRadius: '50%',
              boxShadow: glow,
              transformStyle: 'preserve-3d',
              animation: `weave-ring-${i} ${3 + i * 0.5}s linear infinite`,
              opacity: isActive ? 0.9 : 0.5,
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </div>
    );
  };

  const factories = markers.filter((m) => !m.isBuyer && !m.isOffice)
  const hubs = markers.filter((m) => m.isBuyer && !m.isOffice)
  const offices = markers.filter((m) => m.isOffice)

  return (
    <div ref={containerRef} className={`relative select-none flex items-center justify-center ${className}`}>
      <style>{`
        @keyframes factory-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes hub-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes weave-ring-0 {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(180deg); }
        }
        @keyframes weave-ring-1 {
          0% { transform: rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateY(360deg) rotateZ(180deg); }
        }
        @keyframes weave-ring-2 {
          0% { transform: rotateZ(0deg) rotateX(0deg); }
          100% { transform: rotateZ(360deg) rotateX(180deg); }
        }
      `}</style>

      {/* Wrapper to constrain markers exactly to the canvas dimensions */}
      <div ref={markersContainerRef} style={{ position: "relative", margin: "auto" }}>
        <canvas
          ref={canvasRef}
          onPointerDown={isMobile ? undefined : handlePointerDown}
          style={{
            width: "100%",
            height: "100%",
            cursor: isMobile ? "default" : "grab",
            opacity: 0,
            transition: "opacity 1.2s ease",
            borderRadius: "50%",
            touchAction: isMobile ? "auto" : "none",
            pointerEvents: isMobile ? "none" : "auto",
            display: "block",
          }}
        />

        {/* ── Factory markers: 3D pyramid + specialty card ──────────── */}
        <div className="contents">
        {factories.map((m) => {
          const isActive = activeId === m.id
          return (
            <div
              key={m.id}
              id={`marker-${m.id}`}
              style={{
                position: "absolute",
                transform: "translate(-50%, -100%)",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: 8,
                pointerEvents: "none" as const,
                opacity: `var(--cobe-visible-${m.id}, 0)`,
                filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
                transition: "opacity 0.3s, filter 0.3s",
                zIndex: isActive ? 65 : 30,
              }}
            >
              {/* Factory Marker */}
              <div
                style={{
                  position: "absolute",
                  bottom: -6,
                  animation: "factory-pulse 2.5s ease-in-out infinite",
                }}
              >
                <div style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(56,189,248,0.6))' : 'none', transition: 'filter 0.3s' }}>
                  {renderKineticWeave(isActive, m.color)}
                </div>
              </div>

              {/* Auto-appearing specialty card (only active) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 4 : 6,
                  background: "var(--background)",
                  padding: isMobile ? "3px 6px" : "6px 10px",
                  borderRadius: isMobile ? 4 : 6,
                  boxShadow: "0 4px 12px var(--neu-shadow-dark), 0 0 0 1px var(--glass-border)",
                  whiteSpace: "nowrap" as const,
                  opacity: isActive ? 1 : 0,
                  transform: isActive 
                    ? (m.id === 'srilanka' 
                      ? (isMobile ? "translateY(16px) scale(0.95)" : "translateY(24px) scale(1)") 
                      : (isMobile ? "translateY(-16px) scale(0.95)" : "translateY(-24px) scale(1)")) 
                    : "translateY(-14px) scale(0.95)",
                  transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: m.id === 'srilanka' ? 'auto' : -4,
                      top: m.id === 'srilanka' ? -4 : 'auto',
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: isMobile ? 6 : 8,
                      height: isMobile ? 6 : 8,
                      background: "var(--background)",
                      borderTop: m.id === 'srilanka' ? "1px solid var(--glass-border)" : "none",
                      borderLeft: m.id === 'srilanka' ? "1px solid var(--glass-border)" : "none",
                      borderBottom: m.id === 'srilanka' ? "none" : "1px solid var(--glass-border)",
                      borderRight: m.id === 'srilanka' ? "none" : "1px solid var(--glass-border)",
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: isMobile ? "0.5rem" : "0.6rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  {m.region}
                </span>
              </div>
            </div>
          )
        })}


        {/* ── Buyer hub floating labels ───────────────── */}
        {hubs.map((m) => {
          const activeFactory = factories.find(f => f.id === activeId);
          const isConnected = activeFactory && arcs.some(a =>
            a.from[0] === activeFactory.location[0] && a.from[1] === activeFactory.location[1] &&
            a.to[0] === m.location[0] && a.to[1] === m.location[1]
          );

          return (
            <div
              key={m.id}
              id={`marker-${m.id}`}
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                pointerEvents: "none",
                opacity: `var(--cobe-visible-${m.id}, 0)`,
                filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
                transition: "opacity 0.3s, filter 0.3s",
                zIndex: 40,
              }}
            >
              {/* Conditionally-visible Label inside pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 4 : 8,
                  background: "var(--background)",
                  padding: isMobile ? "3px 6px" : "8px 14px",
                  borderRadius: isMobile ? 5 : 8,
                  boxShadow: isMobile ? "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--glass-border)" : "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--glass-border)",
                  whiteSpace: "nowrap",
                  opacity: isConnected ? 1 : 0,
                  transform: isConnected 
                    ? (isMobile ? "translateY(-10px) scale(0.95)" : "translateY(-20px) scale(1)") 
                    : "translateY(0px) scale(0.9)",
                  transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: isConnected ? "auto" : "none",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: isMobile ? 5 : 8,
                    height: isMobile ? 5 : 8,
                    borderRadius: "50%",
                    background: m.color || "#171B2E",
                    boxShadow: isMobile ? `0 0 6px ${m.color || "#171B2E"}` : `0 0 12px ${m.color || "#171B2E"}`
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: isMobile ? "0.45rem" : "0.65rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {isMobile ? m.region : `${m.region} HUB`}
                </span>
              </div>
            </div>
          )
        })}

        {/* ── Relationship & HQ Offices floating markers ── */}
        {offices.map((m) => {
          const isHQ = m.officeType === 'hq';
          const isActive = activeId === m.id;
          return (
            <div
              key={m.id}
              id={`marker-${m.id}`}
              style={{
                position: "absolute",
                transform: isActive ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none",
                opacity: isActive ? `var(--cobe-visible-${m.id}, 0)` : 0,
                filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
                transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s",
                zIndex: isActive ? 60 : 30,
              }}
            >
              {/* Icon with pulsing background container */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isMobile ? 18 : 32,
                  height: isMobile ? 18 : 32,
                  background: "var(--color-neutral-100)",
                  border: `${isMobile ? 1.5 : 2}px solid ${m.color}`,
                  borderRadius: "50%",
                  boxShadow: isMobile ? `0 0 8px ${m.color}, inset 0 0 4px ${m.color}` : `0 0 16px ${m.color}, inset 0 0 8px ${m.color}`,
                  pointerEvents: "auto",
                }}
              >
                {isHQ ? (
                  <Building2 
                    style={{ 
                      width: isMobile ? 10 : 16, 
                      height: isMobile ? 10 : 16, 
                      color: m.color 
                    }} 
                  />
                ) : (
                  <Briefcase 
                    style={{ 
                      width: isMobile ? 10 : 16, 
                      height: isMobile ? 10 : 16, 
                      color: m.color 
                    }} 
                  />
                )}
              </div>

              {/* Label tag (only shown when active / in center of the globe) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(23, 27, 46, 0.92)",
                  border: "1px solid var(--glass-border)",
                  padding: isMobile ? "2px 5px" : "4px 10px",
                  borderRadius: 5,
                  marginTop: isMobile ? 3 : 6,
                  boxShadow: isMobile ? "0 3px 10px rgba(0, 0, 0, 0.3)" : "0 6px 20px rgba(0, 0, 0, 0.4)",
                  pointerEvents: isActive ? "auto" : "none",
                  opacity: isActive ? 1 : 0,
                  transform: isActive 
                    ? "translateY(0px) scale(1)" 
                    : "translateY(10px) scale(0.9)",
                  transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: isMobile ? "0.45rem" : "0.65rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  {isMobile ? `${m.region} (${isHQ ? 'HQ' : 'OFFICE'})` : m.region}
                </span>
                {!isMobile && (
                  <span
                    style={{
                      fontFamily: "var(--font-family)",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      color: m.color,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                      marginTop: 1,
                    }}
                  >
                    {m.specialty}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  )
}
