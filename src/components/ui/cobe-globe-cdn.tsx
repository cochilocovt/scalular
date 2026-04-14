"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

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

/* ── Scalular factory countries ─────────────────────────────── */
const defaultMarkers: GlobeMarker[] = [
  { id: "india",      location: [20.59, 78.96],   region: "India",       specialty: "Cotton · Knitwear · Embroidery",       color: "#727cb1", factoryCount: 24 },
  { id: "bangladesh", location: [23.69, 90.36],   region: "Bangladesh",  specialty: "Basics · Volume · Jersey",             color: "#41413d", factoryCount: 42 },
  { id: "turkey",     location: [38.96, 35.24],   region: "Turkey",      specialty: "Premium Fashion · Cut & Sew",          color: "#222220", factoryCount: 18 },
  { id: "vietnam",    location: [14.06, 108.28],  region: "Vietnam",     specialty: "Technical · Activewear",               color: "#323959", factoryCount: 31 },
  { id: "china",      location: [31.23, 121.47],  region: "China",       specialty: "Scale · Technology · Accessories",      color: "#ADACA4", factoryCount: 22 },
  { id: "pakistan",    location: [30.38, 69.35],   region: "Pakistan",    specialty: "Denim · Woven Basics",                 color: "#d5d3ca", factoryCount: 15 },
  { id: "portugal",   location: [39.40, -8.22],   region: "Portugal",    specialty: "Luxury · Sustainable · EU Made",        color: "#171B2E", factoryCount: 8 },
  { id: "morocco",    location: [31.79, -7.09],   region: "Morocco",     specialty: "EU-Nearshore · Fast Fashion",           color: "#1A1E31", factoryCount: 12 },
  { id: "srilanka",   location: [7.87, 80.77],    region: "Sri Lanka",   specialty: "Lingerie · Intimate Apparel",           color: "#eff0f6", factoryCount: 14 },
  // Buyer hubs
  { id: "usa",       location: [40.71, -74.01],   region: "New York",    specialty: "Americas Hub",  color: "#727cb1", isBuyer: true },
  { id: "uk",        location: [51.51, -0.13],    region: "London",      specialty: "Europe Hub",    color: "#323959", isBuyer: true },
  { id: "germany",   location: [52.52, 13.41],    region: "Berlin",      specialty: "EU Hub",        color: "#171B2E", isBuyer: true },
  { id: "uae",       location: [25.20, 55.27],    region: "Dubai",       specialty: "MENA Hub",      color: "#1A1E31", isBuyer: true },
  { id: "australia",  location: [-33.87, 151.21], region: "Sydney",      specialty: "APAC Hub",      color: "#41413d", isBuyer: true },
  { id: "canada",    location: [43.65, -79.38],   region: "Toronto",     specialty: "NA Hub",        color: "#ADACA4", isBuyer: true },
]

/* ── Supply chain arcs (factory → buyer hub) ─────────────────── */
const defaultArcs: GlobeArc[] = [
  { id: "arc-in-ny",  from: [20.59, 78.96],   to: [40.71, -74.01] },
  { id: "arc-in-ld",  from: [20.59, 78.96],   to: [51.51, -0.13]  },
  { id: "arc-bd-ld",  from: [23.69, 90.36],   to: [51.51, -0.13]  },
  { id: "arc-bd-ny",  from: [23.69, 90.36],   to: [40.71, -74.01] },
  { id: "arc-tr-ld",  from: [38.96, 35.24],   to: [51.51, -0.13]  },
  { id: "arc-tr-bl",  from: [38.96, 35.24],   to: [52.52, 13.41]  },
  { id: "arc-vn-ny",  from: [14.06, 108.28],  to: [40.71, -74.01] },
  { id: "arc-vn-sy",  from: [14.06, 108.28],  to: [-33.87, 151.21]},
  { id: "arc-cn-ny",  from: [31.23, 121.47],  to: [40.71, -74.01] },
  { id: "arc-cn-sy",  from: [31.23, 121.47],  to: [-33.87, 151.21]},
  { id: "arc-pk-ld",  from: [30.38, 69.35],   to: [51.51, -0.13]  },
  { id: "arc-pt-bl",  from: [39.40, -8.22],   to: [52.52, 13.41]  },
  { id: "arc-ma-ld",  from: [31.79, -7.09],   to: [51.51, -0.13]  },
  { id: "arc-lk-db",  from: [7.87, 80.77],    to: [25.20, 55.27]  },
  { id: "arc-in-to",  from: [20.59, 78.96],   to: [43.65, -79.38] },
]

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
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0.02,
        markers: markers.map((m) => ({
          location: m.location,
          size: m.isBuyer ? 0.008 : 0.015,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: [0, 0, 0],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
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

        globe!.update({
          phi: currentTotalPhi,
          theta: currentTotalTheta,
          // @ts-ignore: cobe update options typings may not include arcs dynamically but it works at runtime
          arcs: animatedArcs,
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

  // Factory & Hub marker: 3D spinning pyramid
  const pyramidFaceStyle = (nth: number, baseColor?: string): React.CSSProperties => {
    const transforms = [
      "rotateY(0deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(120deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(240deg) translateZ(4px) rotateX(19.5deg)",
      "rotateX(-90deg) rotateZ(60deg) translateY(4px)",
    ]
    const defaultColors = ["#171B2E", "#323959", "#41413d", "#222220"]
    const color = baseColor || defaultColors[nth]
    
    // Shading multiplier if baseColor is provided
    const brightness = baseColor ? [0.6, 0.9, 1.1, 0.4] : [1, 1, 1, 1]

    return {
      position: "absolute",
      left: -0.5,
      top: 0,
      width: 0,
      height: 0,
      borderLeft: "6.5px solid transparent",
      borderRight: "6.5px solid transparent",
      borderBottom: `13px solid ${color}`,
      transformOrigin: "center bottom",
      transform: transforms[nth],
      filter: baseColor ? `brightness(${brightness[nth]})` : undefined,
    }
  }

  const factories = markers.filter((m) => !m.isBuyer)
  const hubs = markers.filter((m) => m.isBuyer)

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <style>{`
        @keyframes pyramid-spin {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
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
            {/* Pyramid */}
            <div
              style={{
                width: 12,
                height: 12,
                position: "absolute",
                bottom: -6,
                transformStyle: "preserve-3d" as const,
                animation: "pyramid-spin 4s linear infinite",
              }}
            >
              {[0, 1, 2, 3].map((n) => (
                <div key={n} style={pyramidFaceStyle(n)} />
              ))}
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

      {/* ── Buyer hub markers: colored 3D pyramid with label ───────────────── */}
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
            {/* Pyramid */}
            <div
              style={{
                width: 12,
                height: 12,
                position: "relative",
                transformStyle: "preserve-3d",
                animation: "pyramid-spin 4s linear infinite",
              }}
            >
              {[0, 1, 2, 3].map((n) => (
                <div key={n} style={pyramidFaceStyle(n, m.color || "#171B2E")} />
              ))}
            </div>
            
            {/* Conditionally-visible Label inside pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "var(--background)",
                padding: "6px 10px",
                borderRadius: 6,
                boxShadow: "0 4px 12px var(--neu-shadow-dark), 0 0 0 1px var(--glass-border)",
                whiteSpace: "nowrap",
                opacity: isConnected ? 1 : 0,
                transform: isConnected ? "translateY(-4px) scale(1)" : "translateY(-14px) scale(0.95)",
                transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                pointerEvents: isConnected ? "auto" : "none",
                marginTop: 4,
                position: "relative",
              }}
            >
              {isConnected && (
                <div 
                  style={{
                    position: "absolute",
                    top: -4,
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 8,
                    height: 8,
                    background: "var(--background)",
                    borderTop: "1px solid var(--glass-border)",
                    borderLeft: "1px solid var(--glass-border)",
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  color: m.color || "#171B2E",
                  letterSpacing: "0.06em",
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
