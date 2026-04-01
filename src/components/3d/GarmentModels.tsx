'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Torus, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface GarmentProps {
  color?: string;
  speed?: number;
}

function useRotation(speed = 0.5) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return ref;
}

/* ─── T-Shirt ───────────────────────────────────────────── */
export function TShirtModel({ color = '#3B82F6' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />;
  return (
    <group ref={ref}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.3]} />
        {mat}
      </mesh>
      {/* Left sleeve */}
      <mesh position={[-0.9, 0.45, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.7, 0.3, 0.28]} />
        {mat}
      </mesh>
      {/* Right sleeve */}
      <mesh position={[0.9, 0.45, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.7, 0.3, 0.28]} />
        {mat}
      </mesh>
      {/* Collar */}
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[0.22, 0.06, 8, 20, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Polo Shirt ──────────────────────────────────────────── */
export function PoloShirtModel({ color = '#10B981' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[-0.85, 0.5, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.6, 0.28, 0.28]} />
        {mat}
      </mesh>
      <mesh position={[0.85, 0.5, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.6, 0.28, 0.28]} />
        {mat}
      </mesh>
      {/* Polo collar */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[0.5, 0.18, 0.15]} />
        {mat}
      </mesh>
      <mesh position={[0, 0.72, 0.08]}>
        <boxGeometry args={[0.12, 0.3, 0.06]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Hoodie ──────────────────────────────────────────────── */
export function HoodieModel({ color = '#8B5CF6' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.8} metalness={0.02} />;
  return (
    <group ref={ref}>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.35, 1.5, 0.38]} />
        {mat}
      </mesh>
      {/* Long sleeves */}
      <mesh position={[-1.0, 0.1, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.75, 0.35, 0.32]} />
        {mat}
      </mesh>
      <mesh position={[1.0, 0.1, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.75, 0.35, 0.32]} />
        {mat}
      </mesh>
      {/* Hood */}
      <mesh position={[0, 1.0, -0.1]}>
        <sphereGeometry args={[0.42, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        {mat}
      </mesh>
      {/* Kangaroo pocket */}
      <mesh position={[0, -0.35, 0.2]}>
        <boxGeometry args={[0.7, 0.35, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Sweatshirt ──────────────────────────────────────────── */
export function SweatshirtModel({ color = '#F59E0B' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.8} metalness={0.02} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.3, 1.5, 0.35]} />
        {mat}
      </mesh>
      <mesh position={[-1.0, 0.15, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.72, 0.33, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[1.0, 0.15, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.72, 0.33, 0.3]} />
        {mat}
      </mesh>
      {/* Ribbed hem */}
      <mesh position={[0, -0.82, 0]}>
        <boxGeometry args={[1.35, 0.12, 0.36]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Jacket ────────────────────────────────────────────── */
export function JacketModel({ color = '#1E293B' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />;
  return (
    <group ref={ref}>
      {/* Main body — two panels (open front) */}
      <mesh position={[-0.32, 0, 0.01]}>
        <boxGeometry args={[0.62, 1.6, 0.32]} />
        {mat}
      </mesh>
      <mesh position={[0.32, 0, 0.01]}>
        <boxGeometry args={[0.62, 1.6, 0.32]} />
        {mat}
      </mesh>
      {/* Back panel */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[1.3, 1.6, 0.26]} />
        {mat}
      </mesh>
      {/* Sleeves */}
      <mesh position={[-1.02, 0.05, 0]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.76, 0.38, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[1.02, 0.05, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.76, 0.38, 0.3]} />
        {mat}
      </mesh>
      {/* Collar */}
      <mesh position={[-0.15, 0.88, 0.08]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.28, 0.28, 0.1]} />
        {mat}
      </mesh>
      <mesh position={[0.15, 0.88, 0.08]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.28, 0.28, 0.1]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Pants ─────────────────────────────────────────────── */
export function PantsModel({ color = '#334155' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.75} metalness={0.05} />;
  return (
    <group ref={ref}>
      {/* Waistband */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[1.1, 0.2, 0.32]} />
        {mat}
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.3, -0.2, 0]}>
        <boxGeometry args={[0.46, 1.8, 0.3]} />
        {mat}
      </mesh>
      {/* Right leg */}
      <mesh position={[0.3, -0.2, 0]}>
        <boxGeometry args={[0.46, 1.8, 0.3]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Shorts ─────────────────────────────────────────────── */
export function ShortsModel({ color = '#0EA5E9' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.75} metalness={0.03} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.1, 0.18, 0.32]} />
        {mat}
      </mesh>
      <mesh position={[-0.3, -0.3, 0]}>
        <boxGeometry args={[0.46, 0.9, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[0.3, -0.3, 0]}>
        <boxGeometry args={[0.46, 0.9, 0.3]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Dress ─────────────────────────────────────────────── */
export function DressModel({ color = '#EC4899' }: GarmentProps) {
  const ref = useRotation();
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const y = t * 2.4 - 1.2;
    const r = 0.35 + t * 0.55;
    points.push(new THREE.Vector2(r, y));
  }
  return (
    <group ref={ref}>
      <mesh>
        <latheGeometry args={[points, 24]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>
      {/* Bodice */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.72, 0.55, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
      {/* Straps */}
      <mesh position={[-0.2, 1.07, 0]}>
        <boxGeometry args={[0.1, 0.22, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
      <mesh position={[0.2, 1.07, 0]}>
        <boxGeometry args={[0.1, 0.22, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
    </group>
  );
}

/* ─── Skirt ─────────────────────────────────────────────── */
export function SkirtModel({ color = '#A855F7' }: GarmentProps) {
  const ref = useRotation();
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const y = t * 1.6 - 1.2;
    const r = 0.3 + t * 0.65;
    points.push(new THREE.Vector2(r, y));
  }
  return (
    <group ref={ref}>
      <mesh>
        <latheGeometry args={[points, 24]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>
      {/* Waistband */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.14, 24]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Joggers ─────────────────────────────────────────────── */
export function JoggersModel({ color = '#64748B' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.8} metalness={0.02} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[1.12, 0.22, 0.34]} />
        {mat}
      </mesh>
      {/* Tapered legs */}
      <mesh position={[-0.28, -0.15, 0]}>
        <cylinderGeometry args={[0.22, 0.16, 1.9, 16]} />
        {mat}
      </mesh>
      <mesh position={[0.28, -0.15, 0]}>
        <cylinderGeometry args={[0.22, 0.16, 1.9, 16]} />
        {mat}
      </mesh>
      {/* Cuffs */}
      <mesh position={[-0.28, -1.12, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.12, 16]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0.28, -1.12, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.12, 16]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Jeans ─────────────────────────────────────────────── */
export function JeansModel({ color = '#1D4ED8' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.6} metalness={0.08} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[1.1, 0.22, 0.32]} />
        {mat}
      </mesh>
      <mesh position={[-0.29, -0.18, 0]}>
        <boxGeometry args={[0.44, 1.85, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[0.29, -0.18, 0]}>
        <boxGeometry args={[0.44, 1.85, 0.3]} />
        {mat}
      </mesh>
      {/* Belt loops */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.82, 0.17]}>
          <boxGeometry args={[0.08, 0.18, 0.04]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Boxers ─────────────────────────────────────────────── */
export function BoxersModel({ color = '#F97316' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.75} metalness={0.02} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.0, 0.18, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[-0.28, -0.22, 0]}>
        <boxGeometry args={[0.42, 0.7, 0.28]} />
        {mat}
      </mesh>
      <mesh position={[0.28, -0.22, 0]}>
        <boxGeometry args={[0.42, 0.7, 0.28]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Boxer Briefs ───────────────────────────────────────── */
export function BoxerBriefsModel({ color = '#059669' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.75} metalness={0.02} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.95, 0.16, 0.3]} />
        {mat}
      </mesh>
      <mesh position={[-0.25, -0.28, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.55, 16]} />
        {mat}
      </mesh>
      <mesh position={[0.25, -0.28, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.55, 16]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Undershirt (tubular) ───────────────────────────────── */
export function UndershirtModel({ color = '#F1F5F9' }: GarmentProps) {
  const ref = useRotation();
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.45, 1.6, 24]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} />
      </mesh>
      {/* Shoulder straps */}
      <mesh position={[-0.2, 0.88, 0]}>
        <boxGeometry args={[0.14, 0.3, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.88, 0]}>
        <boxGeometry args={[0.14, 0.3, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Socks ─────────────────────────────────────────────── */
export function SocksModel({ color = '#94A3B8' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.85} metalness={0.0} />;
  return (
    <group ref={ref} scale={[1.4, 1.4, 1.4]}>
      {/* Leg tube */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.28, 0.25, 1.0, 16]} />
        {mat}
      </mesh>
      {/* Foot */}
      <mesh position={[0.25, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <capsuleGeometry args={[0.22, 0.55, 8, 16]} />
        {mat}
      </mesh>
      {/* Toe cap */}
      <mesh position={[0.62, -0.3, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Sweater ─────────────────────────────────────────────── */
export function SweaterModel({ color = '#D97706' }: GarmentProps) {
  const ref = useRotation();
  const mat = <meshStandardMaterial color={color} roughness={0.9} metalness={0.0} />;
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.3, 1.5, 0.38]} />
        {mat}
      </mesh>
      <mesh position={[-1.0, 0.1, 0]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.7, 0.34, 0.32]} />
        {mat}
      </mesh>
      <mesh position={[1.0, 0.1, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.7, 0.34, 0.32]} />
        {mat}
      </mesh>
      {/* Ribbed collar */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.27, 0.3, 0.22, 24]} />
        {mat}
      </mesh>
    </group>
  );
}

/* ─── Sweater Dress ─────────────────────────────────────── */
export function SweaterDressModel({ color = '#BE185D' }: GarmentProps) {
  const ref = useRotation();
  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const y = t * 2.6 - 1.3;
    const r = 0.38 + t * 0.3;
    points.push(new THREE.Vector2(r, y));
  }
  return (
    <group ref={ref}>
      <mesh>
        <latheGeometry args={[points, 24]} />
        <meshStandardMaterial color={color} roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.22, 24]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* Sleeves */}
      <mesh position={[-0.7, 0.7, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.6, 0.3, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.6, 0.3, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ─── Catalogue ─────────────────────────────────────────── */
export interface GarmentEntry {
  id: string;
  name: string;
  Component: React.ComponentType<GarmentProps>;
  color: string;
  description: string;
  category: string;
}

export const GARMENT_CATALOG: GarmentEntry[] = [
  { id: 'tshirt',         name: 'T-Shirt',           Component: TShirtModel,       color: '#3B82F6', description: 'Classic crew-neck tee in cotton & blends',        category: 'Tops' },
  { id: 'polo',           name: 'Polo Shirt',        Component: PoloShirtModel,    color: '#10B981', description: 'Piqué polo with placket & ribbed collar',          category: 'Tops' },
  { id: 'hoodie',         name: 'Hoodie',            Component: HoodieModel,       color: '#8B5CF6', description: 'Pullover hoodie with kangaroo pocket',             category: 'Tops' },
  { id: 'sweatshirt',     name: 'Sweatshirt',        Component: SweatshirtModel,   color: '#F59E0B', description: 'Fleece sweatshirt with ribbed hem & cuffs',        category: 'Tops' },
  { id: 'jacket',         name: 'Jacket',            Component: JacketModel,       color: '#1E293B', description: 'Structured jacket in woven fabrics',               category: 'Outerwear' },
  { id: 'pants',          name: 'Pants',             Component: PantsModel,        color: '#334155', description: 'Tailored trousers — slim & relaxed fits',          category: 'Bottoms' },
  { id: 'shorts',         name: 'Shorts',            Component: ShortsModel,       color: '#0EA5E9', description: 'Casual & performance shorts',                     category: 'Bottoms' },
  { id: 'dress',          name: 'Dress',             Component: DressModel,        color: '#EC4899', description: 'A-line & shift dresses in woven & knit',           category: 'Dresses' },
  { id: 'skirt',          name: 'Skirt',             Component: SkirtModel,        color: '#A855F7', description: 'A-line, pencil & pleated skirt styles',            category: 'Bottoms' },
  { id: 'boxers',         name: 'Boxers',            Component: BoxersModel,       color: '#F97316', description: 'Woven boxer shorts in cotton poplin',              category: 'Underwear' },
  { id: 'boxer-briefs',   name: 'Boxer Briefs',      Component: BoxerBriefsModel,  color: '#059669', description: 'Stretch boxer briefs with waistband',              category: 'Underwear' },
  { id: 'joggers',        name: 'Joggers',           Component: JoggersModel,      color: '#64748B', description: 'Tapered joggers with elasticated cuffs',           category: 'Bottoms' },
  { id: 'jeans',          name: 'Jeans',             Component: JeansModel,        color: '#1D4ED8', description: 'Denim jeans — slim, straight & relaxed cuts',     category: 'Bottoms' },
  { id: 'undershirt',     name: 'Undershirt',        Component: UndershirtModel,   color: '#CBD5E1', description: 'Tubular undershirt in ribbed cotton',              category: 'Underwear' },
  { id: 'socks',          name: 'Socks',             Component: SocksModel,        color: '#94A3B8', description: 'Crew, ankle & no-show socks in cotton blends',    category: 'Accessories' },
  { id: 'sweater',        name: 'Sweaters',          Component: SweaterModel,      color: '#D97706', description: 'Knit sweaters — crewneck & V-neck styles',        category: 'Tops' },
  { id: 'sweater-dress',  name: 'Sweater Dresses',   Component: SweaterDressModel, color: '#BE185D', description: 'Knit sweater dress with ribbed details',           category: 'Dresses' },
];
