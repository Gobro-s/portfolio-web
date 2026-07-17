"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TRACK_RADIUS = 1.3;

/**
 * 사이클 시각화: 링은 궤도(발견→기획→개발→적용·운영), 고정된 4개의 노드는 각 단계,
 * 궤도를 도는 액센트 구체는 그 사이클을 순환하는 "현재의 작업".
 */
function Cycle() {
  const group = useRef<THREE.Group>(null);
  const runner = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const track = useMemo(() => {
    const geo = new THREE.TorusGeometry(TRACK_RADIUS, 0.02, 8, 96);
    return new THREE.EdgesGeometry(geo, 1);
  }, []);
  const ringB = useMemo(() => {
    const geo = new THREE.TorusGeometry(0.95, 0.015, 8, 96);
    return new THREE.EdgesGeometry(geo, 1);
  }, []);

  const nodes = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return [Math.cos(a) * TRACK_RADIUS, Math.sin(a) * TRACK_RADIUS, 0] as const;
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.14 + mouse.current.x * 0.3;
      group.current.rotation.x = 0.5 + Math.sin(t * 0.1) * 0.15 + mouse.current.y * 0.15;
    }
    if (runner.current) {
      const a = t * 0.5;
      runner.current.position.set(
        Math.cos(a) * TRACK_RADIUS,
        Math.sin(a) * TRACK_RADIUS,
        0
      );
      // 노드를 지날 때마다 살짝 부풀어 각 단계를 "통과"하는 리듬을 만든다
      const pulse = 1 + Math.pow(Math.abs(Math.cos(a * 2)), 8) * 0.5;
      runner.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group} position={[1.7, -0.1, 0]}>
      <lineSegments geometry={track}>
        <lineBasicMaterial color="#e14f2a" transparent opacity={0.75} />
      </lineSegments>
      <lineSegments geometry={ringB} rotation={[0.6, 0.9, 0]}>
        <lineBasicMaterial color="#221d16" transparent opacity={0.22} />
      </lineSegments>

      {nodes.map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#221d16" transparent opacity={0.55} />
        </mesh>
      ))}

      <mesh ref={runner}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial color="#e14f2a" />
      </mesh>
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
      <Cycle />
    </Canvas>
  );
}
