"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

import { FACTORIES, BUYER_HUBS, SUPPLY_ARCS } from '@/data/factories';

interface GlobeMarker {
  id: string
  location: [number, number]
  region: string
  specialty: string
  color?: string
  isBuyer?: boolean
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
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastInteractionTime = useRef<number>(0)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)

  // Track current state
  const currentPhiRef = useRef(0)
  const activeMarkerRef = useRef<string | null>(null)
  const activeStartTimeRef = useRef<number>(0)

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

      // Set canvas display size
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`

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
          size: m.isBuyer ? 0.008 : 0.015,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: [0.1, 0.4, 1.0],
        arcWidth: 0.62,
        arcHeight: 0.25,
        opacity: 0.9,
      })

      function animate() {
        const now = Date.now()

        // Dynamically reduce speed if a country is actively highlighted so it stays visible for ~1.8s
        let currentSpeed = speed
        if (activeMarkerRef.current && (now - activeStartTimeRef.current) < 1800) {
          currentSpeed = speed * 0.1 // Extreme slow down (crawl)
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
          size: m.isBuyer ? 0.008 : 0.015,
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

  // Factory & Hub marker: Factory building silhouette
  const factoryMarkerStyle = (isActive: boolean, baseColor?: string): React.CSSProperties => ({
    width: 14,
    height: 16,
    backgroundColor: isActive ? '#7dd3fc' : (baseColor || '#f4d77b'),
    clipPath: 'polygon(0% 100%, 0% 35%, 15% 35%, 15% 0%, 35% 0%, 35% 35%, 100% 35%, 100% 100%)',
    filter: isActive
      ? 'drop-shadow(0 0 10px rgba(125, 211, 252, 0.9)) drop-shadow(0 0 22px rgba(56, 189, 248, 0.55))'
      : 'drop-shadow(0 0 4px rgba(244, 215, 123, 0.25))',
    transition: 'filter 0.3s ease, background-color 0.3s ease',
  });

  const factories = markers.filter((m) => !m.isBuyer)
  const hubs = markers.filter((m) => m.isBuyer)

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <style>{`
        @keyframes factory-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes hub-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
          margin: "auto",
          display: "block",
        }}
      />

      {/* ── Factory markers: 3D pyramid + specialty card ──────────── */}
      {factories.map((m) => {
        const isActive = activeId === m.id
        return (
          <div
            key={m.id}
            style={{
              position: "absolute",
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: 8,
              pointerEvents: "none" as const,
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: "opacity 0.3s, filter 0.3s",
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
              <div style={factoryMarkerStyle(isActive, "#f4d77b")} />
            </div>

            {/* Auto-appearing specialty card (only active) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "var(--background)",
                padding: "6px 10px",
                borderRadius: 6,
                boxShadow: "0 4px 12px var(--neu-shadow-dark), 0 0 0 1px var(--glass-border)",
                whiteSpace: "nowrap" as const,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(-24px) scale(1)" : "translateY(-14px) scale(0.95)",
                transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 8,
                    height: 8,
                    background: "var(--background)",
                    borderBottom: "1px solid var(--glass-border)",
                    borderRight: "1px solid var(--glass-border)",
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "0.6rem",
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
            style={{
              position: "absolute",
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(center)",
              left: "anchor(center)",
              translate: "-50% -50%",
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
                gap: 8,
                background: "var(--background)",
                padding: "8px 14px",
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--glass-border)",
                whiteSpace: "nowrap",
                opacity: isConnected ? 1 : 0,
                transform: isConnected ? "translateY(-20px) scale(1)" : "translateY(0px) scale(0.9)",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                pointerEvents: isConnected ? "auto" : "none",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: m.color || "#171B2E",
                  boxShadow: `0 0 12px ${m.color || "#171B2E"}`
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {m.region} HUB
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
