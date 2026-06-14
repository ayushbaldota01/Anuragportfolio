import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/* ───────────── Mouse Parallax Rig ───────────── */
function ParallaxRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 0.35,
      0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -0.8 + mouse.current.y * -0.2,
      0.04
    );
    camera.lookAt(0, 0.4, 0);
  });

  return null;
}

/* ───────────── Floating Doorway ───────────── */
function Doorway() {
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle floating / breathing animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = 0.15 + Math.sin(t * 0.8) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.015;
  });

  const pillarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a12"),
        roughness: 0.85,
        metalness: 0.15,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Left Pillar */}
      <mesh position={[-1.05, 0, 0]} material={pillarMat}>
        <boxGeometry args={[0.35, 3.2, 0.45]} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[1.05, 0, 0]} material={pillarMat}>
        <boxGeometry args={[0.35, 3.2, 0.45]} />
      </mesh>
      {/* Top Lintel */}
      <mesh position={[0, 1.6, 0]} material={pillarMat}>
        <boxGeometry args={[2.45, 0.4, 0.45]} />
      </mesh>

      {/* ── The Glowing Portal Plane ── */}
      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[1.75, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={new THREE.Color("#9333ea")}
          emissiveIntensity={4.5}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner edge glow strips (top, left, right) */}
      {/* Left inner strip */}
      <mesh position={[-0.87, 0, 0.05]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#c084fc")}
          emissiveIntensity={8}
          toneMapped={false}
        />
      </mesh>
      {/* Right inner strip */}
      <mesh position={[0.87, 0, 0.05]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#c084fc")}
          emissiveIntensity={8}
          toneMapped={false}
        />
      </mesh>
      {/* Top inner strip */}
      <mesh position={[0, 1.4, 0.05]}>
        <boxGeometry args={[1.76, 0.02, 0.02]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#c084fc")}
          emissiveIntensity={8}
          toneMapped={false}
        />
      </mesh>

      {/* Point light inside the portal */}
      <pointLight
        position={[0, 0.5, 0.6]}
        color="#a855f7"
        intensity={12}
        distance={8}
        decay={2}
      />
      <pointLight
        position={[0, 0, 1.2]}
        color="#7c3aed"
        intensity={6}
        distance={6}
        decay={2}
      />
    </group>
  );
}

/* ───────────── Reflective Floor ───────────── */
function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.45, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        mirror={0.5}
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={60}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050012"
        metalness={0.6}
      />
    </mesh>
  );
}

/* ───────────── Ambient Particles ───────────── */
function FloatingParticles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 5 - 1.5,
      z: (Math.random() - 0.5) * 8,
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      scale: 0.01 + Math.random() * 0.025,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.3,
        p.y + Math.sin(t * p.speed * 0.7 + p.offset) * 0.5,
        p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#c084fc"
        emissive={new THREE.Color("#a855f7")}
        emissiveIntensity={3}
        toneMapped={false}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

/* ───────────── Post-Processing ───────────── */
function PostEffects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.4}
        mipmapBlur
        intensity={2.2}
        radius={0.85}
      />
      <Noise opacity={0.025} />
      <Vignette eskil={false} offset={0.15} darkness={1.15} />
    </EffectComposer>
  );
}

/* ───────────── Scene Composition ───────────── */
function DoorwayScene() {
  return (
    <>
      {/* Minimal ambient so the pillars aren't fully black */}
      <ambientLight intensity={0.06} color="#1a0a2e" />

      {/* Faint fill from above */}
      <directionalLight
        position={[0, 5, 3]}
        intensity={0.15}
        color="#2d1b69"
      />

      <Doorway />
      <ReflectiveFloor />
      <FloatingParticles />
      <ParallaxRig />
      <PostEffects />
    </>
  );
}

/* ───────────── Exported Component ───────────── */
export function HeroDoorway() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ background: "#050014" }}
    >
      <Canvas
        camera={{ position: [0, -0.8, 5.5], fov: 42 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          <DoorwayScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
