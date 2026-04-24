'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

export interface GarmentEntry {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

export function GLBModel({ url, isActive = false }: { url: string; isActive?: boolean }) {
  const { scene } = useGLTF(url);
  
  // Clone to safely reuse the same model across different instances if necessary
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    // Auto-normalize the scale of any foreign .glb model
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    if (maxDim > 0) {
      // Force all garments to roughly the same visual footprint (1.6 units)
      const scale = 1.6 / maxDim;
      clone.scale.setScalar(scale);
    }
    
    const isSweaterDress = url.includes('girls_long_sweater');
    const isSweater = url.includes('sweater.glb');

    if (isSweaterDress || isSweater) {
      // The sweater and sweater dress need a complete material override to fix hollow backface culling
      // and dark vertex colors that ruin the texture.
      const uniformFabric = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#789BBD'), // Lighter, softer blue
        roughness: 0.85,    // High roughness for matte fabric
        metalness: 0.05,    // Low metalness
        side: THREE.DoubleSide, // Fixes hollow / see-through meshes
      });

      clone.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.material = uniformFabric;
        }
      });
    } else {
      // For all other garments, retain their original texture maps (normal, bump, etc)
      // but override the base color to a lighter blue, and fix the "shiny plastic" look.
      const brandColor = new THREE.Color('#4A6085');
      clone.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          const processMat = (mat: THREE.Material) => {
            const clonedMat = mat.clone() as THREE.MeshStandardMaterial;
            if ('color' in clonedMat) clonedMat.color = brandColor;
            if ('roughness' in clonedMat) {
              clonedMat.roughness = 0.9;
              clonedMat.roughnessMap = null; // Kill shiny spots from textures
            }
            if ('metalness' in clonedMat) {
              clonedMat.metalness = 0.0;
              clonedMat.metalnessMap = null; // Kill metallic textures
            }
            
            // The shorts have a baked maroon diffuse texture which tints our blue.
            // Removing the base map lets the solid blue color apply cleanly.
            if (url.includes('man_shorts.glb') || url.includes('denim_jacket.glb') || url.includes('blue_jeans_pants.glb')) {
              clonedMat.map = null; // Also clear diffuse maps for denim to ensure pure blue shading if needed
            }
            
            return clonedMat;
          };

          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map(processMat);
          } else {
            mesh.material = processMat(mesh.material);
          }
        }
      });
    }
    
    return clone;
  }, [scene]);

  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (isActive) {
      ref.current.rotation.y += Math.min(delta, 0.05) * 0.35;
    }
  });

  return (
    <group ref={ref}>
      {/* Center component normalizes the position of the model automatically */}
      <Center scale={1.2}>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

export const GARMENT_CATALOG: GarmentEntry[] = [
  { id: 'tshirt',       name: 'T-Shirt',         url: '/models/oversized_t-shirt.glb',       description: 'Classic crew-neck tee in cotton & blends',          category: 'Tops' },
  { id: 'polo',         name: 'Polo Shirt',      url: '/models/t-shirt_polo_lengan_pendek.glb', description: 'Piqué polo with placket & ribbed collar',          category: 'Tops' },
  { id: 'hoodie',       name: 'Hoodie',          url: '/models/hoodie.glb',                  description: 'Pullover hoodie with kangaroo pocket',             category: 'Tops' },
  { id: 'sweatshirt',   name: 'Sweatshirt',      url: '/models/basic_sweatshirt.glb',        description: 'Fleece sweatshirt with ribbed hem & cuffs',        category: 'Tops' },
  { id: 'jacket',       name: 'Jacket',          url: '/models/denim_jacket.glb',            description: 'Structured jacket in woven fabrics',               category: 'Outerwear' },
  { id: 'pants',        name: 'Pants',           url: '/models/pants.glb',                   description: 'Tailored trousers — slim & relaxed fits',          category: 'Bottoms' },
  { id: 'shorts',       name: 'Shorts',          url: '/models/man_shorts.glb',              description: 'Casual & performance shorts',                     category: 'Bottoms' },
  { id: 'dress',        name: 'Dress',           url: '/models/dress.glb',                   description: 'A-line & shift dresses in woven & knit',          category: 'Dresses' },
  { id: 'skirt',        name: 'Skirt',           url: '/models/pleated_skirt.glb',           description: 'A-line, pencil & pleated skirt styles',           category: 'Bottoms' },
  { id: 'boxers',       name: 'Boxers',          url: '/models/white_boxer.glb',             description: 'Woven boxer shorts in cotton poplin',             category: 'Underwear' },
  { id: 'boxer-briefs', name: 'Boxer Briefs',    url: '/models/free_mens_boxer_briefs__low_poly_3d_model.glb', description: 'Stretch boxer briefs with waistband',             category: 'Underwear' },
  { id: 'joggers',      name: 'Joggers',         url: '/models/dillard_darren_joggers.glb',  description: 'Tapered joggers with elasticated cuffs',          category: 'Bottoms' },
  { id: 'jeans',        name: 'Jeans',           url: '/models/blue_jeans_pants.glb',        description: 'Denim jeans — slim, straight & relaxed cuts',     category: 'Bottoms' },
  { id: 'undershirt',   name: 'Undershirt',      url: '/models/contrast_trim_utility_vest__3d_model.glb', description: 'Tubular undershirt in ribbed cotton',             category: 'Underwear' },
  { id: 'socks',        name: 'Socks',           url: '/models/socks_mockup.glb',            description: 'Crew, ankle & no-show socks in cotton blends',    category: 'Accessories' },
  { id: 'sweater',      name: 'Sweaters',        url: '/models/sweater.glb',                 description: 'Knit sweaters — crewneck & V-neck styles',        category: 'Tops' },
  { id: 'sweater-dress',name: 'Sweater Dresses', url: '/models/girls_long_sweater.glb',      description: 'Knit sweater dress with ribbed details',          category: 'Dresses' },
];

// Preload the first few models so the initial render is snappy when the page hits
if (typeof window !== 'undefined') {
  useGLTF.preload(GARMENT_CATALOG[0].url);
  useGLTF.preload(GARMENT_CATALOG[1].url);
  useGLTF.preload(GARMENT_CATALOG[GARMENT_CATALOG.length - 1].url);
}
