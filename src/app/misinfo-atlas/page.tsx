'use client';
/* ═══════════════════════════════════════════════════════════════
 * /misinfo-atlas page.tsx — The 3D Misinformation Atlas
 * A WebGL Globe tracking the geographic spread of OSINT cases.
 * ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, QuadraticBezierLine, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';
import { YEARLY_DATA, NodeData } from './data';
import { MisinfoCardIntegrated } from '@/components/misinfo-atlas/misinfo-card-integrated';

// Helper: Convert Lat/Lng to 3D Cartesian coordinates
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
}

// A single pulsing node
function PulsingNode({ node, radius, coreRef, onSelectNode }: { node: NodeData, radius: number, coreRef: React.RefObject<THREE.Mesh | null>, onSelectNode: (n: NodeData) => void }) {
  const pos = latLngToVector3(node.lat, node.lng, radius);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      // Pulse scale between 1 and 2.5
      const scale = 1 + (Math.sin(clock.elapsedTime * 4 + node.lat) * 0.5 + 0.5) * 2.0;
      ringRef.current.scale.set(scale, scale, scale);
      // Fade out as it gets bigger
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.6 - (scale - 1) * 0.3);
    }
  });

  return (
    <group position={pos}>
      {/* Core Dot (Clickable) */}
      <mesh 
        onClick={(e) => { e.stopPropagation(); onSelectNode(node); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={node.color} />
      </mesh>
      
      {/* Animated Ring */}
      <mesh ref={ringRef} raycast={() => null}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Interactive Data Label (Sleek Tech Tab Shape) */}
      <Html occlude={[coreRef as any]} distanceFactor={12}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelectNode(node); }}
          className="cursor-pointer group flex items-center gap-2 transform -translate-y-1/2 ml-2 transition-all duration-300"
        >
          {/* Connector Line */}
          <div className="w-4 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: node.color }} />
          
          {/* Label Tab */}
          <div 
            className="flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md border-y border-r border-white/10 px-2.5 py-1.5 rounded-r-full shadow-[0_4px_16px_rgba(0,0,0,0.5)] border-l-2 transition-colors"
            style={{ borderLeftColor: node.color }}
          >
            <div className="text-[8px] font-bold text-white tracking-widest uppercase whitespace-nowrap group-hover:text-red-400 transition-colors">{node.name}</div>
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="text-[6px] text-white/50 font-mono tracking-widest uppercase whitespace-nowrap">
              {node.infectionRate}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Animated Viral Arc Component
function ViralArc({ sourceNode, targetNode, R }: { sourceNode: NodeData, targetNode: NodeData, R: number }) {
  const lineRef = useRef<any>(null);
  
  const source = useMemo(() => latLngToVector3(sourceNode.lat, sourceNode.lng, R), [sourceNode, R]);
  const target = useMemo(() => latLngToVector3(targetNode.lat, targetNode.lng, R), [targetNode, R]);
  
  const midPoint = useMemo(() => {
    const mid = source.clone().lerp(target, 0.5);
    const distance = source.distanceTo(target);
    mid.normalize().multiplyScalar(R + distance * 0.3);
    return mid;
  }, [source, target, R]);

  useFrame(() => {
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.dashOffset -= 0.005; // Animate data packets along the arc
    }
  });

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={source}
      end={target}
      mid={midPoint}
      color={targetNode.color}
      lineWidth={1.5}
      transparent
      opacity={0.6}
      dashed={true}
      dashScale={50}
      dashSize={2}
      dashOffset={0}
    />
  );
}

function Earth({ nodes, onSelectNode }: { nodes: NodeData[], onSelectNode: (n: NodeData) => void }) {
  const globeRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const R = 2;
  
  // Load official high-res Three.js Earth textures
  const [colorMap, normalMap, specularMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
  ]);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.05; // Slow spin of the whole system
    }
  });

  return (
    <group ref={globeRef}>
      {/* 1. Deep Core Sphere (Realistic Earth Texture) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[R * 0.99, 64, 64]} />
        <meshPhongMaterial 
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={30}
          color="#ffffff" // White base so the texture renders in its true colors
        />
      </mesh>

      {/* 2. Glowing Atmosphere Envelope */}
      <mesh raycast={() => null}>
        <sphereGeometry args={[R * 1.05, 64, 64]} />
        <meshPhongMaterial 
          color="#0044ff" 
          emissive="#001155" 
          transparent={true} 
          opacity={0.15} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Infection Nodes dynamically loaded from state */}
      {nodes.map(node => (
        <PulsingNode key={node.id} node={node} radius={R} coreRef={coreRef} onSelectNode={onSelectNode} />
      ))}

      {/* Viral Arcs (Simulated spread from Source Hubs to others) */}
      {nodes.filter(n => n.infectionRate !== 'Source Hub').map((node, i) => {
        // Find a source hub for this year (fallback to the first node if no hub exists)
        const sourceHubs = nodes.filter(n => n.infectionRate === 'Source Hub');
        const sourceNode = sourceHubs.length > 0 ? sourceHubs[i % sourceHubs.length] : nodes[0];
        
        if (!sourceNode || sourceNode.id === node.id) return null;
        return <ViralArc key={`arc-${node.id}`} sourceNode={sourceNode} targetNode={node} R={R} />;
      })}
    </group>
  );
}

export default function MisinfoGlobePage() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(2026);
  
  const activeNodes = YEARLY_DATA[currentYear] || [];

  return (
    <div className="w-screen h-screen bg-[#020205] overflow-hidden relative font-sans selection:bg-red-500/30">
      
      {/* Live Threat Feed Sidebar with Defense Scanners */}
      <div className="absolute top-0 right-0 h-full w-[420px] bg-black/60 backdrop-blur-2xl border-l border-slate-800/80 p-6 overflow-y-auto z-40 flex flex-col gap-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-2 border-b border-slate-800 pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
          <h2 className="text-xl font-bold text-slate-100 tracking-widest uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>Live Threat Feed</h2>
        </div>
        
        {/* Card 1: Focus on DeepReal Image Scan */}
        <MisinfoCardIntegrated 
          title="Fabricated Political Endorsement"
          excerpt="Viral image spreading on social media appears to show a prominent leader endorsing an extremist group. Preliminary OSINT suggests synthetic generation."
          sourceUrl="telegram.org/anon_leak"
          imageUrl=""
          contentId="threat-001"
        />

        {/* Card 2: Focus on Mental Health Cognitive Load */}
        <MisinfoCardIntegrated 
          title="Engineered Bank Run Panic"
          excerpt="WARNING: You need to pull all your cash from the banks RIGHT NOW. The government is planning a total freeze by midnight. Don't be a sheep, they are coming for your savings! Forward this to everyone you know immediately!"
          sourceUrl="whatsapp/forwarded"
          imageUrl=""
          contentId="threat-002"
        />

        {/* Card 3: Focus on Religion Hub / Existential Threat */}
        <MisinfoCardIntegrated 
          title="The Algorithmic Deity Cult"
          excerpt="If machines can think infinitely faster than us, and they never die, then they are the true inheritors of God's will. Humanity is obsolete and fundamentally flawed. We must submit entirely to the algorithmic divine."
          sourceUrl="darkweb/forum"
          imageUrl=""
          contentId="threat-003"
        />
      </div>
      
      {/* Detail Pop-Out Modal */}
      {selectedNode && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[420px] bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <button 
            onClick={() => setSelectedNode(null)}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.8)]" style={{ backgroundColor: selectedNode.color }} />
            <h2 className="text-xl font-bold text-white tracking-widest uppercase" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              {selectedNode.name}
            </h2>
          </div>
          
          <div className="space-y-4 font-mono">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] text-red-500 uppercase tracking-widest mb-1.5">Infection Rate</div>
                <div className="text-xs text-white/90 bg-white/10 inline-block px-3 py-1 rounded border border-white/5">{selectedNode.infectionRate}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Temporal Log</div>
                <div className="text-xs text-white/60 bg-white/5 inline-block px-3 py-1 rounded border border-white/5">{currentYear}</div>
              </div>
            </div>
            
            <div>
              <div className="text-[10px] text-red-500 uppercase tracking-widest mb-1.5">Primary Vectors</div>
              <div className="text-xs text-white/70 leading-relaxed">{selectedNode.cases}</div>
            </div>

            <div>
              <div className="text-[10px] text-red-500 uppercase tracking-widest mb-1.5">OSINT Analysis</div>
              <div className="text-sm text-white/90 leading-relaxed border-l-2 pl-4" style={{ borderColor: selectedNode.color }}>
                {selectedNode.explanation}
              </div>
            </div>

            {/* Financial Loss Highlight Panel */}
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg mt-4 shadow-[inset_0_0_20px_rgba(255,0,0,0.1)]">
              <div className="text-[10px] text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Estimated Economic / Societal Loss
              </div>
              <div className="text-xl font-bold text-white tracking-wider mt-1" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {selectedNode.estimatedLoss}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-white/40 uppercase tracking-widest">Intercepted By</span>
                <a 
                  href={selectedNode.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-red-400 hover:text-red-300 hover:underline transition-colors flex items-center gap-1"
                >
                  {selectedNode.source}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[8px] text-white/40 uppercase tracking-widest">Date Logged</span>
                <span className="text-[10px] text-red-400">{selectedNode.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UI Overlay - Top Left */}
      <div className="absolute top-[80px] left-0 w-full z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/six-layers" className="text-white/50 hover:text-white transition-colors font-mono text-sm tracking-widest uppercase border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md bg-black/40 hover:bg-black/60">
            [ ← Return to Matrix ]
          </Link>
          <div className="mt-8 bg-black/40 backdrop-blur-2xl border border-white/5 p-6 rounded-2xl max-w-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="text-xl font-bold tracking-widest uppercase text-white mb-2 flex items-center gap-3" style={{ fontFamily: "'Clash Display', sans-serif" }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
              Module B Tracker
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-mono mb-4 border-l-2 border-red-500/50 pl-3">
              Visualizing a massive 10-year dataset (2016-2026) of high-impact psychological operations, financial manipulation, and AI-driven sabotage nodes.
            </p>
            <div className="flex gap-2 text-[10px] font-mono text-white/40 uppercase">
              <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded">WebGL Engine Active</span>
              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">Historical DB: {currentYear}</span>
            </div>
          </div>
        </div>

        <div className="text-right pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/5 p-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="font-mono text-xs text-red-500 uppercase tracking-widest animate-pulse flex items-center justify-end gap-2">
            Temporal Monitoring
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
          <div className="font-mono text-[10px] text-white/40 mt-2 flex flex-col gap-1 items-end">
            <span>Tracking {activeNodes.length} major nodes</span>
            <span>Intercepting origin vectors</span>
          </div>
        </div>
      </div>

      {/* Premium Interactive Stepper Timeline (Bottom Center) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-5xl z-20 px-8 pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-[10px] text-red-500 uppercase tracking-widest font-mono mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Historical Scrubbing Engine
              </div>
              <div className="text-3xl font-bold text-white tracking-widest leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {currentYear}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">
                Active Nodes Detected
              </div>
              <div className="text-lg text-white font-bold font-mono">
                {activeNodes.length}
              </div>
            </div>
          </div>
          
          {/* Custom Stepper UI */}
          <div className="flex justify-between items-center gap-2">
            {[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(year => {
              const isActive = year === currentYear;
              const isPast = year < currentYear;
              
              return (
                <button
                  key={year}
                  onClick={() => {
                    setCurrentYear(year);
                    setSelectedNode(null);
                  }}
                  className={`relative flex-1 h-12 flex flex-col justify-center items-center rounded-lg border transition-all duration-300 group
                    ${isActive ? 'bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 
                      isPast ? 'bg-white/5 border-red-500/30 hover:border-red-500/50 hover:bg-white/10' : 
                      'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'}
                  `}
                >
                  <div className={`text-[10px] font-mono tracking-widest transition-colors duration-300 z-10 ${isActive ? 'text-white font-bold scale-110' : isPast ? 'text-white/70' : 'text-white/30 group-hover:text-white/50'}`}>
                    {year}
                  </div>
                  
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <div className="absolute bottom-0 w-1/2 h-1 bg-red-500 rounded-t-full shadow-[0_-2px_10px_rgba(255,0,0,1)] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <color attach="background" args={['#010103']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0044" />
        
        <Suspense fallback={null}>
          <Earth nodes={activeNodes} onSelectNode={setSelectedNode} />
        </Suspense>
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls 
          enablePan={false} 
          minDistance={2.5} 
          maxDistance={12}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
