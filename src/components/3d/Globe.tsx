'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

interface ScalularGlobeProps {
  activeRegion?: string;
  className?: string;
  onPointClick?: (point: any) => void;
}

const ALL_PLACES = [
  { id: 'india', lat: 20.5937, lng: 78.9629, label: 'India', sub: 'Cotton · Knitwear · Embroidery', isBuyer: false },
  { id: 'bangladesh', lat: 23.685, lng: 90.3563, label: 'Bangladesh', sub: 'Basics · Volume', isBuyer: false },
  { id: 'turkey', lat: 38.9637, lng: 35.2433, label: 'Turkey', sub: 'Premium Cut & Sew', isBuyer: false },
  { id: 'vietnam', lat: 14.0583, lng: 108.2772, label: 'Vietnam', sub: 'Technical · Performance', isBuyer: false },
  { id: 'china', lat: 31.2304, lng: 121.4737, label: 'China', sub: 'Scale · Technology', isBuyer: false },
  { id: 'pakistan', lat: 30.3753, lng: 69.3451, label: 'Pakistan', sub: 'Denim · Woven', isBuyer: false },
  { id: 'portugal', lat: 39.3999, lng: -8.2245, label: 'Portugal', sub: 'Luxury · Sustainable', isBuyer: false },
  { id: 'morocco', lat: 31.7917, lng: -7.0926, label: 'Morocco', sub: 'EU-Nearshore · Fast Fashion', isBuyer: false },
  { id: 'srilanka', lat: 7.8731, lng: 80.7718, label: 'Sri Lanka', sub: 'Lingerie · Activewear', isBuyer: false },
  { id: 'usa', lat: 40.7128, lng: -74.006, label: 'New York', sub: 'Americas Hub', isBuyer: true },
  { id: 'uk', lat: 51.5074, lng: -0.1278, label: 'London', sub: 'Europe Hub', isBuyer: true },
  { id: 'germany', lat: 52.52, lng: 13.405, label: 'Berlin', sub: 'EU Hub', isBuyer: true },
  { id: 'uae', lat: 25.2048, lng: 55.2708, label: 'Dubai', sub: 'MENA Hub', isBuyer: true },
  { id: 'australia', lat: -33.8688, lng: 151.2093, label: 'Sydney', sub: 'APAC Hub', isBuyer: true },
  { id: 'canada', lat: 43.6532, lng: -79.3832, label: 'Toronto', sub: 'NA Hub', isBuyer: true },
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
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [countries, setCountries] = useState<any>({ features: [] });

  // Responsive sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Load country GeoJSON
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  // Auto-rotate animation with interaction handling
  useEffect(() => {
    let animationId: number;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver | null = null;
    
    const startRotation = () => {
      if (!globeRef.current) return;
      
      const globe = globeRef.current;
      
      // Get controls - may need to wait for Three.js to initialize
      let controls;
      try {
        controls = globe.controls();
        if (!controls) {
          // Controls not ready yet, try again later
          setTimeout(startRotation, 100);
          return;
        }
      } catch (e) {
        // Globe not fully initialized
        setTimeout(startRotation, 100);
        return;
      }

      // Configure controls
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.enableRotate = true;

      // Animation loop — controls.update() applies autoRotate each frame
      const animate = () => {
        controls.update();
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);

      // Pause auto-rotate on drag, resume 2s after release
      const canvas = globe.renderer().domElement;
      const onPointerDown = () => {
        if (resumeTimer) clearTimeout(resumeTimer);
        controls.autoRotate = false;
      };
      const onPointerUp = () => {
        resumeTimer = setTimeout(() => {
          controls.autoRotate = true;
        }, 2000);
      };
      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointerup', onPointerUp);

      // Set camera position
      globe.pointOfView({ lat: 15, lng: 5, altitude: 2.0 }, 1600);
    };

    // Start rotation setup
    startRotation();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (resumeTimer) clearTimeout(resumeTimer);
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className ?? ''}`}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] h-[60%] rounded-full blur-[90px]" style={{ background: 'rgba(59, 130, 246, 0.1)' }} />
      </div>

      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="#3B82F6"
        atmosphereAltitude={0.2}
        showGraticules={true}
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(0,0,0,0)'}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={() => 'rgba(59,130,246,0.2)'}
        polygonAltitude={0.001}
        arcsData={ARCS}
        arcColor={() => ['rgba(59,130,246,0.85)', 'rgba(30,64,175,0.85)']}
        arcDashLength={0.25}
        arcDashGap={1}
        arcDashAnimateTime={2000}
        arcsTransitionDuration={1000}
        arcStroke={0.5}
        arcAltitudeAutoScale={0.4}
        ringsData={ALL_PLACES.filter(d => !d.isBuyer)}
        ringColor={() => (t: number) => `rgba(59,130,246,${1 - t})`}
        ringMaxRadius={2.8}
        ringPropagationSpeed={2.5}
        ringRepeatPeriod={900}
        pointsData={ALL_PLACES}
        pointColor={(d: any) => d.isBuyer ? '#60A5FA' : '#3B82F6'}
        pointAltitude={0.012}
        pointRadius={(d: any) => activeRegion === d.id ? (d.isBuyer ? 3.8 : 3.5) : (d.isBuyer ? 1.6 : 1.4)}
        pointsMerge={false}
        onPointClick={onPointClick}
        pointLabel={(d: any) => `
          <div style="font-family:system-ui,sans-serif;background:rgba(2,6,23,0.95);border:1px solid rgba(59,130,246,0.25);padding:12px 14px;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.6);min-width:160px">
            <div style="font-weight:800;font-size:13px;color:#F8FAFC;margin-bottom:4px;letter-spacing:-0.02em">${d.label}</div>
            <div style="font-size:11px;color:${d.isBuyer ? '#60A5FA' : '#3B82F6'};display:flex;align-items:center;gap:6px;font-weight:600">
              <span style="width:6px;height:6px;border-radius:50%;background:${d.isBuyer ? '#60A5FA' : '#3B82F6'};display:inline-block;box-shadow:0 0 8px ${d.isBuyer ? '#60A5FA' : '#3B82F6'}"></span>
              <span>${d.sub}</span>
            </div>
          </div>
        `}
      />
    </div>
  );
}