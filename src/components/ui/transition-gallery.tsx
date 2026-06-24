import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform, useSpring, motion, MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { projects } from '../featured-work';

// --- Custom Texture Loader for CORS ---
export function useLoadTextures(urls: string[]) {
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  
  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    
    Promise.all(
      urls.map((url) => {
        return new Promise<THREE.Texture>((resolve) => {
          loader.load(
            url,
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace;
              resolve(tex);
            },
            undefined,
            () => {
              // fallback
              const canvas = document.createElement('canvas');
              canvas.width = 2; canvas.height = 2;
              const ctx = canvas.getContext('2d');
              if (ctx) { ctx.fillStyle = '#111'; ctx.fillRect(0,0,2,2); }
              const fallback = new THREE.CanvasTexture(canvas);
              fallback.colorSpace = THREE.SRGBColorSpace;
              resolve(fallback);
            }
          );
        });
      })
    ).then((resolved) => {
      if (active) setTextures(resolved);
    });
    
    return () => { active = false; };
  }, [urls]);
  
  return textures;
}

// --- Shader Material ---
const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      time: { value: 0.0 },
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

const NUM_IMAGES = 24; // Lots of small images

function CameraRig() {
  useFrame((state) => {
    // 40 degree elevation view: Camera is at [0, 8, 10], looking down at [0,0,0]
    state.camera.position.lerp(new THREE.Vector3(0, 8, 10), 0.1);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function ScatteredImages({ images, progress }: { images: any[], progress: MotionValue<number> }) {
  // Extract URLs, duplicating to reach NUM_IMAGES
  const urls = useMemo(() => {
    const arr: string[] = [];
    for(let i=0; i<NUM_IMAGES; i++) {
      arr.push(images[i % images.length].image);
    }
    return arr;
  }, [images]);
  
  const textures = useLoadTextures(urls);
  const materials = useMemo(() => Array.from({ length: NUM_IMAGES }, () => createClothMaterial()), []);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  // Base positions scattered around the center text
  const basePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < NUM_IMAGES; i++) {
       // Distribute them in a ring around the center so they don't block the text initially
       // Inner radius 4, Outer radius 12
       const r = 4 + Math.random() * 8; 
       const theta = Math.random() * Math.PI * 2;
       
       const x = Math.cos(theta) * r;
       const z = Math.sin(theta) * r;
       
       // Y variation to add depth
       const y = (Math.random() - 0.5) * 5;
       
       // Angle them to roughly face the camera (which is pitched down ~38 degrees)
       const rotX = -0.67; 
       const rotY = 0;
       // Random 2D tilt (Z-rotation)
       const rotZ = (Math.random() - 0.5) * 1.5;
       
       // Random scale variation
       const scale = 0.8 + Math.random() * 1.2;

       pos.push({ x, y, z, rotX, rotY, rotZ, scale });
    }
    return pos;
  }, []);

  useFrame((state) => {
    const p = progress.get(); // 0 to 1
    // Spread factor: starts at 1, goes up to 10 as you scroll
    const spread = 1 + Math.pow(p, 2.5) * 15;
    const time = state.clock.getElapsedTime();

    meshes.current.forEach((mesh, i) => {
       if (!mesh) return;
       const base = basePositions[i];
       
       // Spread out horizontally and deep on Z
       mesh.position.x = base.x * spread;
       mesh.position.z = base.z * spread;
       
       // Keep images static (no floating or spinning)
       mesh.position.y = base.y;
       mesh.rotation.x = base.rotX;
       mesh.rotation.y = base.rotY;
       mesh.rotation.z = base.rotZ;

       const mat = materials[i];
       if (mat && mat.uniforms) {
          // Fade out as they spread really far (when progress is near 1)
          mat.uniforms.opacity.value = 1 - Math.pow(p, 3);
       }
    });
  });

  // Apply textures and calculate scale only once when textures load, saving massive CPU in useFrame
  useEffect(() => {
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = materials[i];
      const base = basePositions[i];
      if (textures.length > i && textures[i]) {
        if (mat && mat.uniforms) {
          mat.uniforms.map.value = textures[i];
        }
        const aspect = textures[i].image ? textures[i].image.width / textures[i].image.height : 1;
        mesh.scale.set(base.scale * 2 * aspect, base.scale * 2, 1);
      }
    });
  }, [textures, materials, basePositions]);

  return (
    <>
      {basePositions.map((_, i) => (
        <mesh key={i} ref={(el) => (meshes.current[i] = el)}>
          <planeGeometry args={[1, 1]} />
          <primitive object={materials[i]} attach="material" />
        </mesh>
      ))}
    </>
  );
}

export function TransitionGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll for the transition text
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 80,
    mass: 0.1
  });

  const textOpacity = useTransform(smoothProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const textScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-transparent">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* WebGL Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas gl={{ antialias: true, alpha: true }}>
            <CameraRig />
            <ScatteredImages images={projects} progress={smoothProgress} />
          </Canvas>
        </div>

        {/* Cinematic Text Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
          <motion.div 
            style={{ opacity: textOpacity, scale: textScale, willChange: "transform, opacity" }}
            className="flex flex-col items-center justify-center text-center max-w-4xl"
          >
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] text-white drop-shadow-2xl">
              I don't shoot what it looks like, <br/>
              <span className="font-bold italic text-white/90">I shoot what it feels like.</span>
            </h2>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
