'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

interface ScalularGlobeProps {
  activeRegion?: string;
  className?: string;
  onPointClick?: (point: any) => void;
}

// Enhanced marker data with distinct factory vs hub markers
const ALL_PLACES = [
  // Factory locations (supply side) - pulsing rings with distinct colors
  { id: 'india', lat: 20.5937, lng: 78.9629, label: 'India', sub: 'Cotton · Knitwear · Embroidery', isBuyer: false, color: '#F97316', factoryCount: 24 },
  { id: 'bangladesh', lat: 23.685, lng: 90.3563, label: 'Bangladesh', sub: 'Basics · Volume', isBuyer: false, color: '#22C55E', factoryCount: 42 },
  { id: 'turkey', lat: 38.9637, lng: 35.2433, label: 'Turkey', sub: 'Premium Cut & Sew', isBuyer: false, color: '#EF4444', factoryCount: 18 },
  { id: 'vietnam', lat: 14.0583, lng: 108.2772, label: 'Vietnam', sub: 'Technical · Performance', isBuyer: false, color: '#DC2626', factoryCount: 31 },
  { id: 'china', lat: 31.2304, lng: 121.4737, label: 'China', sub: 'Scale · Technology', isBuyer: false, color: '#EAB308', factoryCount: 22 },
  { id: 'pakistan', lat: 30.3753, lng: 69.3451, label: 'Pakistan', sub: 'Denim · Woven', isBuyer: false, color: '#16A34A', factoryCount: 15 },
  { id: 'portugal', lat: 39.3999, lng: -8.2245, label: 'Portugal', sub: 'Luxury · Sustainable', isBuyer: false, color: '#7C3AED', factoryCount: 8 },
  { id: 'morocco', lat: 31.7917, lng: -7.0926, label: 'Morocco', sub: 'EU-Nearshore · Fast Fashion', isBuyer: false, color: '#BE123C', factoryCount: 12 },
  { id: 'srilanka', lat: 7.8731, lng: 80.7718, label: 'Sri Lanka', sub: 'Lingerie · Activewear', isBuyer: false, color: '#0891B2', factoryCount: 14 },
  
  // Buyer hubs (demand side) - diamond/square markers with blue tones
  { id: 'usa', lat: 40.7128, lng: -74.006, label: 'New York', sub: 'Americas Hub', isBuyer: true, color: '#3B82F6' },
  { id: 'uk', lat: 51.5074, lng: -0.1278, label: 'London', sub: 'Europe Hub', isBuyer: true, color: '#6366F1' },
  { id: 'germany', lat: 52.52, lng: 13.405, label: 'Berlin', sub: 'EU Hub', isBuyer: true, color: '#8B5CF6' },
  { id: 'uae', lat: 25.2048, lng: 55.2708, label: 'Dubai', sub: 'MENA Hub', isBuyer: true, color: '#A855F7' },
  { id: 'australia', lat: -33.8688, lng: 151.2093, label: 'Sydney', sub: 'APAC Hub', isBuyer: true, color: '#06B6D4' },
  { id: 'canada', lat: 43.6532, lng: -79.3832, label: 'Toronto', sub: 'NA Hub', isBuyer: true, color: '#14B8A6' },
];

const ARCS = [
  { startLat: 20.5937, startLng: 78.9629, endLat: 40.7128, endLng: -74.006 },
  { startLat: 20.5937, startLng: 78.9629, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 23.685, startLng: 90.3563, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 23.685, startLng: 90.3563, endLat: 40.7128, endLng: -74.006 },
  { startLat: 38.9637, startLng: 35.2433, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 38.9637, startLng: 35.2433, endLat: 52.52, endLng: 13.405 },
  { startLat: 14.0583, startLng: 108.2772, endLat: 40.7128, endLng: -74.006 },
  { startLat: 14.0583, startLng: 108.2772, endLat: -33.8688, endLng: 151.2093 },
  { startLat: 31.2304, startLng: 121.4737, endLat: 40.7128, endLng: -74.006 },
  { startLat: 31.2304, startLng: 121.4737, endLat: -33.8688, endLng: 151.2093 },
  { startLat: 30.3753, startLng: 69.3451, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 39.3999, startLng: -8.2245, endLat: 52.52, endLng: 13.405 },
  { startLat: 31.7917, startLng: -7.0926, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 7.8731, startLng: 80.7718, endLat: 25.2048, endLng: 55.2708 },
  { startLat: 20.5937, startLng: 78.9629, endLat: 43.6532, endLng: -79.3832 },
];

export function ScalularGlobe({ activeRegion = 'global', className, onPointClick }: ScalularGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [countries, setCountries] = useState<any>({ features: [] });

  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Measure container after first paint (getBoundingClientRect returns 0 before layout)
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      } else {
        // Container not yet laid out — retry next frame
        requestAnimationFrame(measure);
      }
    };
    requestAnimationFrame(measure);
  }, []);

  // Load country GeoJSON
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  // Horizontal auto-rotation — runs once on mount, never restarts
  useEffect(() => {
    let animationId: number;

    const setup = () => {
      if (!globeRef.current) { setTimeout(setup, 100); return; }
      const globe = globeRef.current;

      let controls;
      try {
        controls = globe.controls();
        if (!controls) { setTimeout(setup, 100); return; }
      } catch { setTimeout(setup, 100); return; }

      // Use OrbitControls built-in autoRotate — most reliable approach
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;       // degrees per second
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = true;

      // Fixed initial view
      globe.pointOfView({ lat: 20, lng: 5, altitude: 2.0 }, 0);

      // Tick loop so controls.update() is called every frame
      const tick = () => {
        controls.update();
        animationId = requestAnimationFrame(tick);
      };
      animationId = requestAnimationFrame(tick);

      const canvas = globe.renderer().domElement;

      // Pause autoRotate on drag; resume 2 s after pointer released
      const onPointerDown = () => {
        controls.autoRotate = false;
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      };
      const onPointerUp = () => {
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
        resumeTimeout.current = setTimeout(() => {
          controls.autoRotate = true;
        }, 2000);
      };
      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointerup', onPointerUp);

      return () => {
        cancelAnimationFrame(animationId);
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointerup', onPointerUp);
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      };
    };

    const cleanup = setup();
    return () => { if (cleanup) cleanup(); };
  }, []); // runs once on mount

  // Custom rings for factory locations (pulsing rings)
  const factoryRingsData = useMemo(() => 
    ALL_PLACES.filter(d => !d.isBuyer).map(d => ({
      ...d,
      maxRadius: 2.5 + (d.factoryCount || 0) * 0.02, // Larger rings for more factories
    })), []
  );

  // Custom points with distinct styling
  const customPointsData = useMemo(() => 
    ALL_PLACES.map(d => ({
      ...d,
      // Make factory points larger and more prominent
      size: d.isBuyer ? 0.6 : 0.8,
    })), []
  );

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className ?? ''}`}>
      {/* Ambient glow behind globe */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] h-[60%] rounded-full blur-[100px]" style={{ background: 'rgba(59, 130, 246, 0.08)' }} />
        <div className="absolute w-[40%] h-[40%] rounded-full blur-[80px]" style={{ background: 'rgba(139, 92, 246, 0.06)' }} />
      </div>

      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="#3B82F6"
        atmosphereAltitude={0.15}
        showGraticules={false}
        
        // Enhanced country borders
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(30,64,175,0.03)'}
        polygonSideColor={() => 'rgba(59,130,246,0.1)'}
        polygonStrokeColor={() => 'rgba(59,130,246,0.25)'}
        polygonAltitude={0.002}
        
        // Animated arcs connecting factories to hubs
        arcsData={ARCS}
        arcColor={() => ['rgba(99,102,241,0.7)', 'rgba(59,130,246,0.7)']}
        arcDashLength={0.3}
        arcDashGap={1.5}
        arcDashAnimateTime={2500}
        arcsTransitionDuration={800}
        arcStroke={0.6}
        arcAltitudeAutoScale={0.35}
        
        // Factory location rings (pulsing outward)
        ringsData={factoryRingsData}
        ringColor={(d: any) => (t: number) => {
          const color = d.color || '#3B82F6';
          // Convert hex to rgba
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          return `rgba(${r},${g},${b},${(1 - t) * 0.8})`;
        }}
        ringMaxRadius={3}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1200}
        
        // Custom point markers
        pointsData={customPointsData}
        pointColor={(d: any) => d.color || '#3B82F6'}
        pointAltitude={(d: any) => d.isBuyer ? 0.02 : 0.025}
        pointRadius={(d: any) => {
          if (activeRegion === d.id) {
            return d.isBuyer ? 2 : 2.5;
          }
          return d.isBuyer ? 1 : 1.3;
        }}
        pointsMerge={false}
        onPointClick={onPointClick}
        
        // Enhanced tooltips
        pointLabel={(d: any) => `
          <div style="font-family:system-ui,sans-serif;background:rgba(255,255,255,0.97);border:1px solid ${d.color}40;padding:14px 16px;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,0.15),0 0 30px ${d.color}15;min-width:180px;backdrop-filter:blur(10px)">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
              <div style="width:10px;height:10px;border-radius:${d.isBuyer ? '2px' : '50%'};background:${d.color};box-shadow:0 0 12px ${d.color}"></div>
              <div style="font-weight:800;font-size:14px;color:#0F172A;letter-spacing:-0.02em">${d.label}</div>
            </div>
            <div style="font-size:11px;color:${d.color};font-weight:600;margin-bottom:4px">${d.sub}</div>
            ${d.factoryCount ? `<div style="font-size:10px;color:#475569;font-weight:500">${d.factoryCount} certified factories</div>` : ''}
            <div style="font-size:9px;color:#64748B;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;margin-top:8px;padding-top:8px;border-top:1px solid rgba(0,0,0,0.08)">
              ${d.isBuyer ? '📍 Buyer Hub' : '🏭 Sourcing Region'}
            </div>
          </div>
        `}
      />
    </div>
  );
}