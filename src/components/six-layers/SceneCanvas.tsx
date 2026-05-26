'use client';
/* ═══════════════════════════════════════════════════════════════
 * SceneCanvas.tsx — The actual R3F Canvas (dynamically imported)
 * Separated to avoid SSR circular JSON serialization crashes.
 * ═══════════════════════════════════════════════════════════════ */

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { ParticleField } from './ParticleField';

export default function SceneCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <Canvas
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      }}
      camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
      style={{ background: '#000' }}
    >
      <color attach="background" args={['#000']} />
      <Suspense fallback={null}>
        <ParticleField count={isMobile ? 16384 : 65536} />
      </Suspense>
    </Canvas>
  );
}
