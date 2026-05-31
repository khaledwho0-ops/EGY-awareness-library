'use client';
/* ═══════════════════════════════════════════════════════════════
 * /misinfo-atlas page.tsx — The 3D Misinformation Atlas
 * Immersive Historical Engine with Cinematic Camera controls
 * ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Stars, Html, QuadraticBezierLine, useTexture, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import Link from 'next/link';
import { HISTORICAL_ERAS, NodeData } from './data';
import { MisinfoCardIntegrated } from '@/components/misinfo-atlas/misinfo-card-integrated';
import { useRTL } from '@/components/shared/rtl-provider';
import { Eye, EyeOff, ShieldAlert, ArrowRight, Play, Crosshair, MapPin, Square, Timer, Globe, Grid, Database } from 'lucide-react';

type ViewMode = 'sphere' | 'echo' | 'pyramid';

// Helper: Convert Lat/Lng to 3D Cartesian coordinates
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
}

// Helper: Calculate Target Position based on View Mode
function getTargetPosition(node: NodeData, mode: ViewMode, radius: number, index: number, totalNodes: number, isInoculated: boolean = false) {
  if (mode === 'echo') {
    if (isInoculated) {
      // Freed node floats towards the center bridging the gaps
      const offsetAngle = (index * 137.5) * (Math.PI / 180);
      const offsetRadius = 1.0 + (index % 3) * 0.2;
      return new THREE.Vector3(Math.cos(offsetAngle) * offsetRadius, (index % 4) * 0.5 - 1, Math.sin(offsetAngle) * offsetRadius);
    } else {
      // 3 polarized clusters
      const cluster = index % 3;
      const angle = (cluster / 3) * Math.PI * 2;
      const clusterRadius = 4.5;
      const clusterCenter = new THREE.Vector3(Math.cos(angle) * clusterRadius, 0, Math.sin(angle) * clusterRadius);
      const offsetAngle = (index * 137.5) * (Math.PI / 180);
      const offsetRadius = (index % 5) * 0.4;
      return clusterCenter.add(new THREE.Vector3(Math.cos(offsetAngle) * offsetRadius, (index % 3) - 1, Math.sin(offsetAngle) * offsetRadius));
    }
  }
  
  if (mode === 'pyramid') {
    // Top-down hierarchy: index 0 is top, others cascade down.
    const level = Math.floor(Math.sqrt(index));
    const y = 3 - level * 1.5;
    const levelRadius = level * 1.2;
    const angle = (index * 137.5) * (Math.PI / 180);
    return new THREE.Vector3(Math.cos(angle) * levelRadius, y, Math.sin(angle) * levelRadius);
  }
  
  return latLngToVector3(node.lat, node.lng, radius);
}

// Animated Bezier Curve for spreading infection
function InfectionArc({ start, end, radius, viewMode, activeColor }: { start: THREE.Vector3, end: THREE.Vector3, radius: number, viewMode: ViewMode, activeColor: string }) {
  const ref = useRef<any>(null);
  const midPoint = useMemo(() => {
    if (viewMode === 'echo') {
      return new THREE.Vector3((start.x + end.x) / 2, Math.max(start.y, end.y) + 0.5, (start.z + end.z) / 2);
    } else if (viewMode === 'pyramid') {
      return new THREE.Vector3((start.x + end.x) / 2, Math.min(start.y, end.y) - 1.0, (start.z + end.z) / 2);
    } else {
      return new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.5);
    }
  }, [start, end, radius, viewMode]);
  
  const isPyramid = viewMode === 'pyramid';

  useFrame((state) => {
    if (ref.current && ref.current.material && !isPyramid) {
      ref.current.material.dashOffset -= state.clock.getDelta() * (viewMode === 'echo' ? 12 : 4);
    }
  });

  return (
    <QuadraticBezierLine 
      ref={ref}
      start={start} 
      end={end} 
      mid={midPoint}
      color={activeColor} 
      lineWidth={isPyramid ? 1.0 : 2.5}
      dashed={!isPyramid}
      dashScale={viewMode === 'echo' ? 15 : 20}
      dashSize={viewMode === 'echo' ? 4 : 4}
      gapSize={viewMode === 'echo' ? 4 : 6}
      opacity={isPyramid ? 0.3 : 0.8}
      transparent
    />
  );
}

// Culmination Event Animation
function PurgeShockwave() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const scale = Math.min(30, ref.current.scale.x + state.clock.getDelta() * 15);
      ref.current.scale.set(scale, scale, scale);
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 1 - (scale / 30));
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={1} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

// A single pulsing node with immersive shockwaves when selected
function PulsingNode({ 
  node, 
  isSelected,
  onSelectNode,
  radius,
  briefingStep,
  allNodes,
  language,
  targetPos,
  viewMode,
  isInoculated
}: { 
  node: NodeData, 
  isSelected: boolean,
  onSelectNode: (n: NodeData) => void,
  radius: number,
  briefingStep: number,
  allNodes: NodeData[],
  language: string,
  targetPos: THREE.Vector3,
  viewMode: ViewMode,
  isInoculated: boolean
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  
  const activeColor = isInoculated ? "#00ffff" : node.color;
  const arcColor = isInoculated ? "#00ffff" : (viewMode === 'pyramid' ? "#00ffff" : "#ff0044");

  // Jump to initial position on mount
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(targetPos);
    }
  }, []);

  // Generate random target nodes for the infection arcs when Step >= 3
  const arcTargets = useMemo(() => {
    if (!isSelected || briefingStep < 3) return [];
    let candidates = [...allNodes].filter(n => n.id !== node.id);
    
    // ECHO CHAMBER RULE: Unless inoculated, only spread within same cluster
    if (viewMode === 'echo' && !isInoculated) {
      const myIndex = allNodes.findIndex(n => n.id === node.id);
      const myCluster = myIndex % 3;
      candidates = candidates.filter(n => allNodes.findIndex(x => x.id === n.id) % 3 === myCluster);
    }

    const shuffled = candidates.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(n => {
      const idx = allNodes.indexOf(n);
      return getTargetPosition(n, viewMode, radius, idx, allNodes.length, isInoculated);
    });
  }, [isSelected, briefingStep, allNodes, radius, node.id, viewMode, isInoculated]);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      // Smoothly fly to target position
      groupRef.current.position.lerp(targetPos, delta * 4);
      
      // Orient the node dynamically based on view mode
      const currentPos = groupRef.current.position;
      if (viewMode === 'echo') {
        groupRef.current.lookAt(new THREE.Vector3(currentPos.x, currentPos.y + 10, currentPos.z));
      } else if (viewMode === 'pyramid') {
        groupRef.current.lookAt(new THREE.Vector3(0, currentPos.y, 0));
      } else {
        groupRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      }
    }

    if (ringRef.current) {
      if (viewMode === 'pyramid') {
        ringRef.current.rotation.y += delta;
        ringRef.current.rotation.x += delta * 0.5;
        const scale = 1 + (Math.sin(clock.elapsedTime * 2 + node.lat) * 0.2);
        ringRef.current.scale.set(scale, scale, scale);
      } else if (viewMode === 'echo') {
        const scale = 1 + Math.max(0, Math.sin(clock.elapsedTime * 4 + node.lat)) * 2.0;
        ringRef.current.scale.set(1, scale, 1);
        ringRef.current.position.z = scale / 2;
      } else {
        const scale = 1 + (Math.sin(clock.elapsedTime * 4 + node.lat) * 0.5 + 0.5) * 1.5;
        ringRef.current.scale.set(scale, scale, 1);
        const material = ringRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = Math.max(0, 0.6 - (scale - 1) * 0.4);
      }
    }

    if (isSelected && shockwaveRef.current) {
      const time = clock.elapsedTime * 1.5;
      const waveScale = 1 + (time % 2) * 8; 
      shockwaveRef.current.scale.set(waveScale, waveScale, viewMode === 'pyramid' ? waveScale : 1);
      const material = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.8 - (waveScale / 8));
    }
  });

  const nodeName = language.startsWith('ar') ? node.nameAr : node.name;

  return (
    <group ref={groupRef}>
      {/* Infection Arcs */}
      {arcTargets.map((target, idx) => {
        const localTarget = groupRef.current ? groupRef.current.worldToLocal(target.clone()) : target.clone().sub(targetPos);
        return <InfectionArc key={`arc-${idx}`} start={new THREE.Vector3(0,0,0)} end={localTarget} radius={radius} viewMode={viewMode} activeColor={arcColor} />;
      })}

      {/* 3 Things Missed: 2. Data Sparkles when highly active */}
      {isSelected && briefingStep >= 2 && !isInoculated && (
        <Sparkles count={50} scale={0.5} size={2} color="#ff3366" speed={0.4} opacity={0.5} />
      )}

      {/* Core Dot (Clickable) */}
      <mesh 
        onClick={(e) => { e.stopPropagation(); onSelectNode(node); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={activeColor} toneMapped={false} />
      </mesh>
      
      {/* Animated Idle (Mutates based on viewMode) */}
      {!isSelected && (
        <mesh ref={ringRef} raycast={() => null} rotation={viewMode === 'echo' ? [Math.PI/2, 0, 0] : [0,0,0]}>
          {viewMode === 'sphere' && <ringGeometry args={[0.025, 0.03, 32]} />}
          {viewMode === 'echo' && <cylinderGeometry args={[0.005, 0.005, 1, 8]} />}
          {viewMode === 'pyramid' && <icosahedronGeometry args={[0.04, 1]} />}
          <meshBasicMaterial color={activeColor} transparent opacity={0.6} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} wireframe={viewMode === 'pyramid'} toneMapped={false} />
        </mesh>
      )}

      {/* Selected Shockwave (Mutates based on viewMode) */}
      {isSelected && (
        <mesh ref={shockwaveRef} raycast={() => null}>
          {viewMode === 'sphere' && <ringGeometry args={[0.03, 0.04, 64]} />}
          {viewMode === 'echo' && <ringGeometry args={[0.03, 0.05, 4]} />}
          {viewMode === 'pyramid' && <torusGeometry args={[0.05, 0.005, 16, 32]} />}
          <meshBasicMaterial color={activeColor} transparent opacity={0.8} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      )}

      {/* Information Gravity Well (Lensing Effect) */}
      {isSelected && !isInoculated && (
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial 
            transmission={1} 
            opacity={1} 
            roughness={0.1} 
            ior={2.0} 
            thickness={1} 
          />
        </mesh>
      )}

      {/* Interactive Data Label */}
      <Html occlude={[]} distanceFactor={8}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelectNode(node); }}
          className={`cursor-pointer group flex items-center gap-2 transform -translate-y-1/2 ml-2 transition-all duration-300 ${isSelected ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="w-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: node.color }} />
          <div 
            className="flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md border-y border-r border-white/10 px-2.5 py-1.5 rounded-r-full shadow-[0_4px_16px_rgba(0,0,0,0.5)] border-l-2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
            style={{ borderLeftColor: node.color }}
          >
            <div className="text-[10px] font-bold text-white tracking-widest uppercase whitespace-nowrap" style={language.startsWith('ar') ? {fontFamily: "'Noto Kufi Arabic', sans-serif"} : {}}>
              {nodeName}
            </div>
          </div>
        </div>
      </Html>

      {/* High Detailed Country HUD overlay (when selected) */}
      {isSelected && (
        <Html position={[0, 0, 0]} center zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 rounded-full border-[1px] border-red-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 border-t-2 border-red-500 rounded-full animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-2 border-b-2 border-white/40 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
              <MapPin className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
            
            <div className="mt-4 bg-black/80 backdrop-blur-xl border border-red-500/30 px-4 py-2 rounded-lg flex flex-col items-center shadow-[0_0_30px_rgba(255,0,0,0.2)]">
              <span className="text-[10px] text-red-500 font-mono tracking-widest uppercase mb-1">
                {language.startsWith('ar') ? "تم قفل الهدف" : "Target Locked"}
              </span>
              <span className="text-sm font-bold text-white tracking-wider" style={language.startsWith('ar') ? {fontFamily: "'Noto Kufi Arabic', sans-serif"} : {}}>
                {nodeName}
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Engine for the whole Earth / Grid / Helix
function CinematicEarth({ 
  nodes, 
  selectedNodeId, 
  briefingStep, 
  onSelectNode, 
  controlsRef, 
  language, 
  globeRef, 
  viewMode,
  inoculatedNodes,
  isEraPurged
}: { 
  nodes: NodeData[], 
  selectedNodeId: string | null, 
  briefingStep: number,
  onSelectNode: (node: NodeData) => void, 
  controlsRef: any,
  language: string,
  globeRef: any,
  viewMode: ViewMode,
  inoculatedNodes: string[],
  isEraPurged: boolean
}) {
  const [earthTexture, bumpMapTexture, specularTexture, cloudsTexture] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  useEffect(() => {
    if (controlsRef.current && selectedNode) {
      const idx = nodes.indexOf(selectedNode);
      const targetPos = getTargetPosition(selectedNode, viewMode, 2, idx, nodes.length);
      
      let worldPos = targetPos.clone();
      if (viewMode === 'sphere' && globeRef.current) {
         worldPos.applyMatrix4(globeRef.current.matrixWorld);
      }
      
      let cameraOffset = new THREE.Vector3();
      if (viewMode === 'echo') {
         cameraOffset = new THREE.Vector3(0, 1.5, 2.5);
      } else if (viewMode === 'pyramid') {
         cameraOffset = new THREE.Vector3(0, 0, 2.5);
      } else {
         if (briefingStep === 1) cameraOffset = worldPos.clone().normalize().multiplyScalar(3.5);
         else if (briefingStep === 2) cameraOffset = worldPos.clone().normalize().multiplyScalar(2.0);
         else cameraOffset = worldPos.clone().normalize().multiplyScalar(4.0);
      }

      const camPos = new THREE.Vector3().addVectors(worldPos, cameraOffset);
      
      controlsRef.current.setLookAt(
        camPos.x, camPos.y, camPos.z,
        worldPos.x, worldPos.y, worldPos.z,
        true
      );
    }
  }, [briefingStep, selectedNode, viewMode]);

  useEffect(() => {
    if (!selectedNode && controlsRef.current) {
      if (viewMode === 'echo') {
         controlsRef.current.setLookAt(0, 5, 5, 0, 0, 0, true);
      } else if (viewMode === 'pyramid') {
         controlsRef.current.setLookAt(0, 0, 8, 0, 0, 0, true);
      } else {
         controlsRef.current.setLookAt(0, 0, 7, 0, 0, 0, true);
      }
    }
  }, [viewMode, selectedNode]);

  return (
    <group>
      {/* 3D Earth (Visible only in sphere mode) */}
      {viewMode === 'sphere' && (
        <group ref={globeRef} position={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <meshPhongMaterial
              map={earthTexture}
              bumpMap={bumpMapTexture}
              bumpScale={0.015}
              specularMap={specularTexture}
              specular={new THREE.Color('grey')}
              shininess={35}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[2.02, 64, 64]} />
            <meshPhongMaterial
              map={cloudsTexture}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/* Pyramid Core Structure */}
      {viewMode === 'pyramid' && !isEraPurged && (
        <group rotation={[0, 0, 0]}>
           <mesh position={[0, -1, 0]}>
              <coneGeometry args={[5, 10, 32, 1, true]} />
              <meshBasicMaterial color={isEraPurged ? "#00ffff" : "#ff0044"} wireframe transparent opacity={0.05} />
           </mesh>
        </group>
      )}

      {isEraPurged && <PurgeShockwave />}

      {nodes.map((node, i) => {
        const isSelected = selectedNodeId === node.id;
        const isInoculated = inoculatedNodes.includes(node.id);
        const targetPos = getTargetPosition(node, viewMode, 2, i, nodes.length, isInoculated);
        
        return (
          <PulsingNode 
            key={node.id} 
            node={node} 
            isSelected={isSelected} 
            onSelectNode={onSelectNode} 
            radius={2}
            briefingStep={briefingStep}
            allNodes={nodes}
            language={language}
            targetPos={targetPos}
            viewMode={viewMode}
            isInoculated={isInoculated}
          />
        );
      })}
    </group>
  );
}

// ──────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ──────────────────────────────────────────────────────────

export default function MisinfoGlobePage() {
  const { isRTL, language, t } = useRTL();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [briefingStep, setBriefingStep] = useState<number>(0);
  const [currentEra, setCurrentEra] = useState<string>("Antiquity & Middle Ages");
  const [showScanners, setShowScanners] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveDelay, setLiveDelay] = useState(6000);
  const [liveIndex, setLiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('sphere');
  const [inoculatedNodes, setInoculatedNodes] = useState<string[]>([]);
  
  const controlsRef = useRef<any>(null);
  const globeRef = useRef<THREE.Group>(null);
  const activeNodes = HISTORICAL_ERAS[currentEra] || [];
  
  // HERD IMMUNITY THRESHOLD: 5 nodes or 30%, whichever is smaller!
  const herdImmunityThreshold = Math.min(5, Math.ceil(activeNodes.length * 0.3));
  const isEraPurged = activeNodes.length > 0 && inoculatedNodes.length >= herdImmunityThreshold;

  // INOCULATION LOGIC: Cure the node when briefing step reaches 3
  useEffect(() => {
    if (selectedNode && briefingStep === 3) {
      setInoculatedNodes(prev => {
        if (!prev.includes(selectedNode.id)) return [...prev, selectedNode.id];
        return prev;
      });
    }
  }, [briefingStep, selectedNode]);

  const handleSelectNode = (node: NodeData) => {
    setSelectedNode(node);
    setBriefingStep(1);
  };

  const handleCloseModal = () => {
    setSelectedNode(null);
    setBriefingStep(0);
    setIsLiveMode(false);
  };

  return (
    <div className="w-screen h-screen bg-[#020205] overflow-hidden relative selection:bg-red-500/30" style={{ direction: isRTL ? 'rtl' : 'ltr', fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "'Inter', sans-serif" }}>
      {/* 1. TOP OVERLAYS */}
      <div className="absolute top-8 left-8 z-50 pointer-events-auto">
        <div className="flex gap-4">
          <Link href="/angry-debunkers" className="btn-primary flex items-center gap-2 bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)] border-none">
            <ShieldAlert size={16} />
            {t({ en: "Launch Angry Debunkers", ar: "إطلاق كاشف التزييف", arEG: "شغل كاشف التزييف" })}
          </Link>
          <Link href="/six-layers" className="glass-card px-4 py-2 text-sm text-slate-300 hover:text-white flex items-center gap-2">
            ← {t({ en: "Return to Matrix", ar: "العودة للمصفوفة", arEG: "ارجع للمصفوفة" })}
          </Link>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-50 pointer-events-auto flex items-center gap-4">
        <div className="glass-card flex items-center p-1 rounded-lg mr-4">
          <button onClick={() => setViewMode('sphere')} className={`p-2 rounded transition-colors ${viewMode === 'sphere' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`} title="Geospatial Sphere">
            <Globe size={18} />
          </button>
          <button onClick={() => setViewMode('echo')} className={`p-2 rounded transition-colors ${viewMode === 'echo' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`} title="Echo Chambers">
            <Grid size={18} />
          </button>
          <button onClick={() => setViewMode('pyramid')} className={`p-2 rounded transition-colors ${viewMode === 'pyramid' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`} title="Outrage Pyramid">
            <Database size={18} />
          </button>
        </div>

        <button 
          onClick={() => {
            setIsLiveMode(!isLiveMode);
            if (!isLiveMode) setLiveIndex(0);
          }}
          className={`glass-card px-4 py-2 flex items-center gap-2 text-sm transition-colors ${isLiveMode ? 'text-red-500 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'text-slate-300 hover:text-white'}`}
        >
          {isLiveMode ? <Square size={16} /> : <Play size={16} />}
          {t({ en: "Run Scenario", ar: "تشغيل السيناريو", arEG: "شغل السيناريو" })}
        </button>

        <button 
          onClick={() => setShowScanners(!showScanners)}
          className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          {showScanners ? <EyeOff size={16} /> : <Eye size={16} />}
          {showScanners 
            ? t({ en: "Hide Threat Feed", ar: "إخفاء التهديدات المباشرة", arEG: "خفي التهديدات المباشرة" }) 
            : t({ en: "Show Threat Feed", ar: "إظهار التهديدات المباشرة", arEG: "أظهر التهديدات المباشرة" })
          }
        </button>
      </div>

      {/* 2. RIGHT SIDEBAR: LIVE THREAT FEED */}
      <div className={`absolute top-0 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} h-full w-[420px] bg-black/60 backdrop-blur-2xl border-slate-800/80 p-6 overflow-y-auto z-40 flex flex-col gap-6 shadow-2xl transition-transform duration-500 ease-in-out ${showScanners ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}>
        <div className="flex items-center gap-3 mb-2 mt-20 border-b border-slate-800 pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
          <h2 className="text-xl font-bold text-slate-100 tracking-widest uppercase" style={!isRTL ? { fontFamily: "'Clash Display', sans-serif" } : {}}>
            {t({ en: "Live Threat Feed", ar: "رادار التهديدات المباشر", arEG: "رادار التهديدات المباشر" })}
          </h2>
        </div>
        
        <MisinfoCardIntegrated 
          title={t({ en: "Fabricated Political Endorsement", ar: "تأييد سياسي ملفق", arEG: "تأييد سياسي ملفق" })}
          excerpt={t({ en: "Viral image spreading on social media appears to show a prominent leader endorsing an extremist group.", ar: "صورة فيروسية تنتشر على وسائل التواصل تظهر قائداً بارزاً يؤيد جماعة متطرفة.", arEG: "صورة فيروسية بتنتشر على السوشيال ميديا بتبين قائد معروف بيأيد جماعة متطرفة." })}
          sourceUrl="telegram.org/anon_leak"
          imageUrl="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop"
          contentId="threat-001"
        />

        <MisinfoCardIntegrated 
          title={t({ en: "Engineered Bank Run Panic", ar: "ذعر مصطنع لسحب الأموال", arEG: "ذعر مصطنع لسحب الفلوس" })}
          excerpt={t({ en: "WARNING: You need to pull all your cash from the banks RIGHT NOW. The government is planning a total freeze.", ar: "تحذير: اسحب كل أموالك من البنوك الآن. الحكومة تخطط لتجميد كامل.", arEG: "تحذير: اسحب كل فلوسك من البنوك دلوقتي حالاً. الحكومة ناوية تجمد كل حاجة." })}
          sourceUrl="whatsapp/forwarded"
          imageUrl="https://images.unsplash.com/photo-1613243555988-441166d4d6fd?q=80&w=800&auto=format&fit=crop"
          contentId="threat-002"
        />
      </div>

      {/* 3. STORYTELLING BRIEFING PANEL */}
      {selectedNode && (
        <div className={`absolute top-1/2 ${isRTL ? 'right-[10%]' : 'left-[10%]'} transform -translate-y-1/2 z-50 w-[460px] glass-card-v2 p-8 shadow-[0_0_80px_rgba(220,38,38,0.15)] animate-in slide-in-from-${isRTL ? 'right' : 'left'}-10 duration-500`}>
          <button 
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <Crosshair className="text-red-500 w-6 h-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase text-gradient-crimson" style={!isRTL ? { fontFamily: "'Clash Display', sans-serif" } : {}}>
              {language.startsWith('ar') ? selectedNode.nameAr : selectedNode.name}
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <div className="text-[10px] text-red-500 uppercase tracking-widest mb-1.5">{t({ en: "Infection Rate", ar: "معدل العدوى", arEG: "معدل الانتشار" })}</div>
                <div className="text-xs text-white/90 bg-red-500/10 inline-block px-3 py-1 rounded border border-red-500/20">{selectedNode.infectionRate}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">{t({ en: "Temporal Log", ar: "السجل الزمني", arEG: "السجل الزمني" })}</div>
                <div className="text-xs text-slate-300 font-mono bg-slate-800 inline-block px-3 py-1 rounded border border-slate-700">
                  {language.startsWith('ar') ? selectedNode.dateAr : selectedNode.date}
                </div>
              </div>
            </div>
            
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-800 rounded-full" />
              
              {/* Step 1: Vector */}
              <div className={`relative transition-opacity duration-500 ${briefingStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full ${briefingStep >= 1 ? 'bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)]' : 'bg-slate-700'}`} />
                <div className="text-[10px] text-red-500 uppercase tracking-widest mb-1">{t({ en: "Primary Vectors", ar: "المتجهات الأساسية", arEG: "المتجهات الأساسية" })}</div>
                <div className="text-sm text-slate-300 leading-relaxed">
                  {language.startsWith('ar') ? selectedNode.casesAr : selectedNode.cases}
                </div>
              </div>

              {/* Step 2: Analysis */}
              {briefingStep >= 2 && (
                <div className="relative animate-in slide-in-from-left-4 fade-in duration-500">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  <div className="text-[10px] text-amber-500 uppercase tracking-widest mb-1">{t({ en: "OSINT Analysis", ar: "تحليل المصادر المفتوحة", arEG: "تحليل المصادر المفتوحة" })}</div>
                  <div className="text-sm text-slate-300 leading-relaxed font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    {language.startsWith('ar') ? selectedNode.explanationAr : selectedNode.explanation}
                  </div>
                </div>
              )}

              {/* Step 3: Impact */}
              {briefingStep >= 3 && (
                <div className="relative animate-in slide-in-from-left-4 fade-in duration-500">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                  <div className="text-[10px] text-violet-400 uppercase tracking-widest mb-1">{t({ en: "Estimated Devastation", ar: "الدمار المقدر", arEG: "حجم الكارثة" })}</div>
                  <div className="text-lg font-bold text-white tracking-wider text-gradient-violet">
                    {language.startsWith('ar') ? selectedNode.estimatedLossAr : selectedNode.estimatedLoss}
                  </div>
                </div>
              )}
            </div>

            {briefingStep < 3 && (
              <button 
                onClick={() => setBriefingStep(prev => prev + 1)}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-4"
              >
                <Play size={16} /> 
                {briefingStep === 1 ? t({ en: "Reveal Analysis", ar: "إظهار التحليل", arEG: "شوف التحليل" }) : t({ en: "Reveal Impact", ar: "إظهار التأثير", arEG: "شوف التأثير" })}
              </button>
            )}
          </div>
        </div>
      )}

      {/* LIVE MODE CONTROL BAR */}
      {isLiveMode && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 glass-card-v2 p-4 px-10 flex items-center gap-8 shadow-[0_0_50px_rgba(220,38,38,0.3)] border-red-500/50 animate-in slide-in-from-bottom-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm" style={!isRTL ? { fontFamily: "'Clash Display', sans-serif" } : {}}>
              {t({ en: "Scenario Auto-Pilot", ar: "الطيار الآلي للسيناريو", arEG: "الطيار الآلي" })}
            </span>
          </div>
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <Timer size={18} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">
              {t({ en: "Delay", ar: "التأخير", arEG: "وقت التأخير" })}
            </span>
            <input 
              type="range" 
              min="3000" 
              max="15000" 
              step="1000" 
              value={liveDelay} 
              onChange={(e) => setLiveDelay(Number(e.target.value))} 
              className="w-48 accent-red-500"
            />
            <span className="text-sm text-white font-mono w-12 font-bold">{liveDelay / 1000}s</span>
          </div>
          
          <button onClick={() => setIsLiveMode(false)} className="text-xs text-slate-400 hover:text-white uppercase tracking-widest border border-white/10 px-6 py-2 rounded bg-white/5 hover:bg-white/10 transition-colors ml-4">
            {t({ en: "Stop Tracking", ar: "إيقاف التتبع", arEG: "وقف التتبع" })}
          </button>
        </div>
      )}

      {/* 4. PREMIUM ERA STEPPER */}
      {!isLiveMode && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-5xl z-20 px-8 pointer-events-auto animate-in fade-in duration-500">
        <div className="glass-card-v2 p-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-[10px] text-red-500 uppercase tracking-widest font-mono mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {t({ en: "Historical Era Navigation", ar: "تصفح الحقب التاريخية", arEG: "تصفح العصور التاريخية" })}
              </div>
              <div className="text-2xl font-bold text-white tracking-widest text-gradient-crimson" style={!isRTL ? { fontFamily: "'Clash Display', sans-serif" } : {}}>
                {currentEra}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                {t({ en: "Active Nodes", ar: "العقد النشطة", arEG: "العقد النشطة" })}
              </div>
              <div className="text-lg text-white font-bold font-mono">
                {activeNodes.length}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center gap-3">
            {Object.keys(HISTORICAL_ERAS).map(era => {
              const isActive = era === currentEra;
              
              return (
                <button
                  key={era}
                  onClick={() => {
                    setCurrentEra(era);
                    setInoculatedNodes([]); // Reset inoculation when scenario changes
                    handleCloseModal();
                  }}
                  className={`relative flex-1 h-14 flex flex-col justify-center items-center rounded-xl border transition-all duration-300 group overflow-hidden
                    ${isActive ? 'bg-red-900/30 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 
                      'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800'}
                  `}
                >
                  <div className={`text-xs tracking-widest transition-colors duration-300 z-10 font-bold uppercase
                    ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}
                  `} style={isRTL ? {fontFamily: "'Noto Kufi Arabic', sans-serif"} : {}}>
                    {era}
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 w-1/2 h-1 bg-red-500 rounded-t-full shadow-[0_-2px_10px_rgba(220,38,38,1)] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* ERA PURGED OVERLAY */}
      {isEraPurged && (
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000 bg-cyan-900/20 backdrop-blur-sm">
          <ShieldAlert size={64} className="text-cyan-400 mb-6 animate-bounce" />
          <h1 className="text-6xl font-bold text-white tracking-widest uppercase text-center drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]" style={isRTL ? {fontFamily: "'Noto Kufi Arabic', sans-serif"} : {fontFamily: "'Clash Display', sans-serif"}}>
            {t({ en: "Scenario Cleared", ar: "تم تطهير السيناريو", arEG: "السيناريو خلص" })}
          </h1>
          <p className="text-xl text-cyan-200 mt-4 tracking-widest font-mono">
            {t({ en: "COGNITIVE IMMUNITY ESTABLISHED", ar: "تم تأسيس المناعة المعرفية", arEG: "تم تأسيس المناعة المعرفية" })}
          </p>
        </div>
      )}

      {/* GLOBAL IMMUNITY HUD */}
      <div className="absolute top-24 left-8 z-50 pointer-events-none w-64 animate-in fade-in slide-in-from-left-10 duration-700">
        <div className="glass-card p-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              {t({ en: "Cognitive Immunity", ar: "المناعة المعرفية", arEG: "المناعة المعرفية" })}
            </span>
            <span className="text-lg font-bold text-white font-mono">
              {activeNodes.length > 0 ? Math.round((inoculatedNodes.length / herdImmunityThreshold) * 100) : 0}%
            </span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
            <div 
              className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-1000"
              style={{ width: `${activeNodes.length > 0 ? (inoculatedNodes.length / herdImmunityThreshold) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5. THE 3D CANVAS & ENGINE */}
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <color attach="background" args={['#010103']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0044" />
        
        <Suspense fallback={null}>
          <CinematicEarth 
            nodes={activeNodes} 
            selectedNodeId={selectedNode?.id || null}
            briefingStep={briefingStep}
            onSelectNode={handleSelectNode} 
            controlsRef={controlsRef}
            language={language}
            globeRef={globeRef}
            viewMode={viewMode}
            inoculatedNodes={inoculatedNodes}
            isEraPurged={isEraPurged}
          />
        </Suspense>
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
        
        {/* AAA POST-PROCESSING */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={isEraPurged ? 3.0 : 1.5} />
          <Vignette eskil={false} offset={0.1} darkness={isEraPurged ? 0.3 : 1.1} />
        </EffectComposer>

        <CameraControls 
          ref={controlsRef}
          maxDistance={12}
          minDistance={3.5}
          dollySpeed={0.5}
          smoothTime={0.8}
        />
      </Canvas>
    </div>
  );
}