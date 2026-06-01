'use client';
/* ═══════════════════════════════════════════════════════════════
 * ParticleField.tsx — Subtle, elegant particle system
 * 
 * KEY FIX: With additive blending + 65K particles, even alpha
 * 0.1 per particle burns white where they overlap. The solution:
 * - Very low alpha (0.02-0.06 per particle)
 * - Small point sizes (1-4px)
 * - This creates a beautiful nebula/dust effect, not a white blob
 * ═══════════════════════════════════════════════════════════════ */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollContext } from './ScrollContext';

const vertexShader = /* glsl */ `
  uniform float u_time;
  uniform float u_morphProgress;
  uniform float u_pointSize;
  uniform vec2 u_mouse;

  attribute float a_index;
  attribute float a_random;

  varying float v_alpha;
  varying vec3 v_color;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Shapes
  vec3 shapeSphere(float idx, float total) {
    float golden = 2.399963229728653;
    float theta = golden * idx;
    float y = 1.0 - (idx / total) * 2.0;
    float r = sqrt(1.0 - y * y);
    return vec3(cos(theta) * r, y, sin(theta) * r) * 2.2;
  }

  vec3 shapeExploded(float idx, float total, float seed) {
    vec3 s = shapeSphere(idx, total);
    float n = snoise(s * 1.5 + seed * 10.0);
    return s + normalize(s) * n * 2.0;
  }

  vec3 shapeTorus(float idx, float total) {
    float theta = (idx / total) * 6.28318;
    float phi = fract(idx * 0.618) * 6.28318;
    float R = 2.0; float r = 0.55;
    return vec3((R + r*cos(phi))*cos(theta), r*sin(phi), (R + r*cos(phi))*sin(theta));
  }

  vec3 shapeGrid(float idx, float total, float seed) {
    float side = ceil(pow(total, 0.333));
    float x = mod(idx, side)/side - 0.5;
    float y = mod(floor(idx/side), side)/side - 0.5;
    float z = floor(idx/(side*side))/side - 0.5;
    return vec3(x, y, z) * 3.5;
  }

  vec3 shapeSpiral(float idx, float total, float time) {
    float angle = (idx / total) * 31.415;
    float radius = pow(idx / total, 0.5) * 2.8;
    return vec3(cos(angle + time*0.2) * radius, (fract(idx*0.381)-0.5)*0.5, sin(angle + time*0.2) * radius);
  }

  vec3 shapeDNA(float idx, float total) {
    float t = (idx / total) * 18.0;
    float strand = step(0.5, fract(idx * 0.5));
    return vec3(cos(t + strand*3.14159), t*0.35 - 3.0, sin(t + strand*3.14159));
  }

  vec3 shapeBrain(float idx, float total) {
    float theta = (idx / total) * 6.28318;
    float phi = acos(2.0 * fract(idx * 0.618) - 1.0);
    float fbm = sin(theta*8.0)*sin(phi*6.0)*0.12 + sin(theta*16.0)*sin(phi*12.0)*0.06;
    float r = 1.9 + fbm;
    return vec3(r*sin(phi)*cos(theta), r*cos(phi), r*sin(phi)*sin(theta));
  }

  vec3 shapeBlackHole(float idx, float total, float time) {
    // The Zero Freedom Void: Event Horizon, Accretion Disk, and Relativistic Jets
    float t = idx / total; 
    
    // 5% of particles form relativistic jets shooting out from the poles
    if (fract(idx * 0.123) < 0.05) {
       float jetRadius = fract(idx * 0.777) * 0.4;
       float jetAngle = idx * 13.0 + time * 5.0;
       float jetY = (fract(time * 0.8 + idx * 0.512) - 0.5) * 30.0; 
       return vec3(cos(jetAngle)*jetRadius, jetY, sin(jetAngle)*jetRadius);
    }

    // 95% of particles form the Accretion Disk
    // Speed increases exponentially near the event horizon (Keplerian velocity)
    float speed = time * (1.0 + 3.0 / (t + 0.05));
    float angle = t * 400.0 + speed; 
    
    // Event horizon radius = 1.2. Exponentially push particles outward but densely pack the inner ring.
    float radius = 1.4 + pow(t, 2.5) * 12.0; 
    
    // The disk gets extremely thin at the horizon, but thickens further out
    float ySpread = (fract(idx * 3.14159) - 0.5) * pow(t, 1.5) * 4.0; 
    
    // Gravitational lensing/wobble effect using noise
    float wobble = snoise(vec3(cos(angle)*radius, time*0.5, sin(angle)*radius)) * 0.6;

    return vec3(cos(angle) * radius, ySpread + wobble, sin(angle) * radius);
  }

  vec3 shapeChaos(float idx, float total, float time, float seed) {
    // Pure erratic noise-driven positions for the terrifying unknown
    float r = pow(seed, 2.0) * 15.0;
    float nx = snoise(vec3(idx * 0.1, time * 2.0, 0.0));
    float ny = snoise(vec3(0.0, idx * 0.1, time * 2.0));
    float nz = snoise(vec3(time * 2.0, 0.0, idx * 0.1));
    return vec3(nx * r, ny * r, nz * r);
  }

  vec3 getLayerColor(float layer) {
    if (layer < 0.5) return vec3(0.7, 0.75, 1.0);       // Hero: cool blue-white
    if (layer < 1.5) return vec3(0.95, 0.12, 0.12);      // L1: crimson
    if (layer < 2.5) return vec3(1.0, 0.7, 0.0);         // L2: amber
    if (layer < 3.5) return vec3(0.5, 0.2, 0.9);         // L3: purple
    if (layer < 4.5) return vec3(0.05, 0.6, 1.0);        // L4: cyan
    if (layer < 5.5) return vec3(0.0, 0.9, 0.3);         // L5: toxic green
    if (layer < 6.5) return vec3(0.9, 0.0, 0.9);         // L6: magenta
    if (layer < 7.5) return vec3(1.0, 1.0, 1.0);         // L7: harsh white/void (overridden)
    if (layer < 8.5) return vec3(0.3, 0.0, 0.0);         // L8: Dark blood red (overridden)
    return vec3(1.0, 0.82, 0.15);                         // Defense: gold
  }

  void main() {
    float total = PARTICLE_COUNT_FLOAT;
    float idx = a_index;
    float seed = a_random;

    float morphFloor = floor(u_morphProgress);
    float morphFract = fract(u_morphProgress);

    vec3 p0, p1;
    if (morphFloor < 0.5)      p0 = shapeSphere(idx, total);
    else if (morphFloor < 1.5) p0 = shapeExploded(idx, total, seed);
    else if (morphFloor < 2.5) p0 = shapeTorus(idx, total);
    else if (morphFloor < 3.5) p0 = shapeGrid(idx, total, seed);
    else if (morphFloor < 4.5) p0 = shapeSpiral(idx, total, u_time);
    else if (morphFloor < 5.5) p0 = shapeDNA(idx, total);
    else if (morphFloor < 6.5) p0 = shapeBrain(idx, total);
    else if (morphFloor < 7.5) p0 = shapeBlackHole(idx, total, u_time);
    else if (morphFloor < 8.5) p0 = shapeChaos(idx, total, u_time, seed);
    else                       p0 = shapeSphere(idx, total);

    float nm = min(morphFloor + 1.0, 9.0);
    if (nm < 0.5)      p1 = shapeSphere(idx, total);
    else if (nm < 1.5) p1 = shapeExploded(idx, total, seed);
    else if (nm < 2.5) p1 = shapeTorus(idx, total);
    else if (nm < 3.5) p1 = shapeGrid(idx, total, seed);
    else if (nm < 4.5) p1 = shapeSpiral(idx, total, u_time);
    else if (nm < 5.5) p1 = shapeDNA(idx, total);
    else if (nm < 6.5) p1 = shapeBrain(idx, total);
    else if (nm < 7.5) p1 = shapeBlackHole(idx, total, u_time);
    else if (nm < 8.5) p1 = shapeChaos(idx, total, u_time, seed);
    else               p1 = shapeSphere(idx, total);

    vec3 pos = mix(p0, p1, smoothstep(0.0, 1.0, morphFract));

    // Gentle organic drift
    pos += vec3(
      snoise(pos * 0.6 + u_time * 0.12) * 0.04,
      snoise(pos * 0.6 + u_time * 0.12 + 100.0) * 0.04,
      snoise(pos * 0.6 + u_time * 0.12 + 200.0) * 0.04
    );

    // ── INTERACTIVE MOUSE EXPLOSION ──
    vec3 mouseWorld = vec3(u_mouse.x * 6.0, u_mouse.y * 3.5, 0.0); 
    float dMouse = distance(pos.xy, mouseWorld.xy);
    float mouseForce = 0.0;
    
    if (dMouse < 2.0) {
       mouseForce = pow((2.0 - dMouse) / 2.0, 2.5); // Exponential repulsion
       vec3 dir = normalize(vec3(pos.x - mouseWorld.x, pos.y - mouseWorld.y, pos.z - 0.5));
       pos += dir * mouseForce * 3.0; // Blast particles outward
    }

    // Slow rotation
    float a = u_time * 0.06;
    float c = cos(a); float s = sin(a);
    pos = vec3(pos.x*c - pos.z*s, pos.y, pos.x*s + pos.z*c);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // SMALL point size — individual particles, not blobs
    float sz = u_pointSize * (0.4 + seed * 0.3);
    gl_PointSize = sz * (40.0 / -mv.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 8.0);

    // Visible alpha — particles glow through opaque backgrounds
    v_alpha = 0.2 + seed * 0.3;
    v_color = mix(getLayerColor(morphFloor), getLayerColor(nm), smoothstep(0.0, 1.0, morphFract));
    
    // Layer 7 Override: The Black Hole is chaotic Red and Cyan
    if (morphFloor > 6.5 && morphFloor < 7.5) {
        v_color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0), step(0.5, seed));
        v_alpha *= 1.5; // Boost intensity for the black hole
    }
    
    // Layer 8 Override: Terrifying pulsing blood red
    if (morphFloor > 7.5 && morphFloor < 8.5) {
        v_color = mix(vec3(1.0, 0.0, 0.0), vec3(0.2, 0.0, 0.0), step(0.5, fract(u_time * 5.0 + seed)));
        v_alpha *= 2.0;
    }
    
    // ── MOUSE INTERACTION GLOW ──
    if (mouseForce > 0.0) {
        v_alpha += mouseForce * 1.5;
        // Flash hot cyan/white when hit by mouse
        v_color = mix(v_color, vec3(0.5, 1.0, 1.0), mouseForce * 0.8);
    }
  }
`;

const fragmentShader = /* glsl */ `
  varying float v_alpha;
  varying vec3 v_color;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * v_alpha;
    gl_FragColor = vec4(v_color, alpha);
  }
`;

export function ParticleField({ count = 65536 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { stateRef, isAnimationsDisabled } = useScrollContext();

  const { positions, indices, randoms } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const idx = new Float32Array(count);
    const r = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const golden = 2.399963229728653;
      const theta = golden * i;
      const y = 1 - (i / count) * 2;
      const rad = Math.sqrt(1 - y * y);
      p[i*3] = Math.cos(theta) * rad * 2.2;
      p[i*3+1] = y * 2.2;
      p[i*3+2] = Math.sin(theta) * rad * 2.2;
      idx[i] = i;
      r[i] = Math.random();
    }
    return { positions: p, indices: idx, randoms: r };
  }, [count]);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_morphProgress: { value: 0 },
    u_pointSize: { value: 2.0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    
    // TURN OFF button: freeze all particle animations
    if (isAnimationsDisabled) return;
    
    const { currentLayer, mouseX, mouseY } = stateRef.current;
    
    // Smoothly interpolate towards the true DOM layer instead of relying on unreliable overall document height
    matRef.current.uniforms.u_morphProgress.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.u_morphProgress.value,
      currentLayer,
      delta * 2.0 // Smooth transition speed
    );
    
    matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    matRef.current.uniforms.u_mouse.value.set(mouseX, mouseY);
  });

  useEffect(() => () => {
    meshRef.current?.geometry.dispose();
    matRef.current?.dispose();
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-a_index" args={[indices, 1]} />
        <bufferAttribute attach="attributes-a_random" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader.replace('PARTICLE_COUNT_FLOAT', `${count}.0`)}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
