"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Loop() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const ringA = useMemo(() => {
    const geo = new THREE.TorusGeometry(1.3, 0.02, 8, 96);
    return new THREE.EdgesGeometry(geo, 1);
  }, []);
  const ringB = useMemo(() => {
    const geo = new THREE.TorusGeometry(0.95, 0.015, 8, 96);
    return new THREE.EdgesGeometry(geo, 1);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.14 + mouse.current.x * 0.3;
    group.current.rotation.x = 0.5 + Math.sin(t * 0.1) * 0.15 + mouse.current.y * 0.15;
  });

  return (
    <group ref={group} position={[1.7, -0.1, 0]}>
      <lineSegments geometry={ringA}>
        <lineBasicMaterial color="#d8ff5f" transparent opacity={0.9} />
      </lineSegments>
      <lineSegments geometry={ringB} rotation={[0.6, 0.9, 0]}>
        <lineBasicMaterial color="#f2f0eb" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <Loop />
    </Canvas>
  );
}
