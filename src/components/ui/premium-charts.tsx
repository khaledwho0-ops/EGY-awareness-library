"use client";

import { useState, useEffect } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

interface ChartDataItem {
  labelEn: string;
  labelAr: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartDataItem[];
  titleEn: string;
  titleAr: string;
  sourceEn: string;
  sourceAr: string;
  type?: "bar" | "donut";
  height?: number;
  valuePrefix?: string;
  valueSuffix?: string;
}

const COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

export function PremiumChart({ data, titleEn, titleAr, sourceEn, sourceAr, type = "bar", height = 300, valuePrefix = "", valueSuffix = "" }: ChartProps) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Slight delay for entrance animation
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value)) * 1.1; // Add 10% headroom

  return (
    <div className="glass-card" style={{ padding: "var(--space-xl)", position: "relative", overflow: "hidden" }}>
      {/* 1. Feature: Interactive Tooltip & Hover States */}
      {/* 2. Feature: Real-time citation display */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, direction: a ? "rtl" : "ltr" }}>
        <div>
          <h3 style={{ margin: 0, fontFamily: ff, fontSize: 18 }}>{a ? titleAr : titleEn}</h3>
          <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", fontFamily: ff, marginTop: 4 }}>
            {t({ en: "Source: ", ar: "المصدر: ", arEG: "المصدر: " })} {a ? sourceAr : sourceEn}
          </p>
        </div>
      </div>

      <div style={{ height, position: "relative", display: "flex", alignItems: "flex-end", gap: 16, direction: "ltr" }}>
        {type === "bar" && data.map((item, i) => {
          const h = animated ? (item.value / maxValue) * 100 : 0;
          const color = item.color || COLORS[i % COLORS.length];
          const isHovered = activeIdx === i;
          
          return (
            <div 
              key={i} 
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", position: "relative", cursor: "pointer" }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Tooltip */}
              <div style={{
                position: "absolute", top: `calc(${100 - h}% - 40px)`,
                opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.2s ease", background: "var(--bg-elevated)", border: "1px solid var(--border-primary)",
                padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: "bold", zIndex: 10,
                color: color, whiteSpace: "nowrap", pointerEvents: "none"
              }}>
                {valuePrefix}{item.value}{valueSuffix}
              </div>
              
              {/* Bar container */}
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", position: "relative" }}>
                {/* Background Track */}
                <div style={{ position: "absolute", bottom: 0, width: "100%", height: "100%", background: `${color}11`, borderRadius: "8px 8px 0 0" }} />
                
                {/* Fill */}
                <div style={{ 
                  width: "100%", height: `${h}%`, background: `linear-gradient(to top, ${color}33, ${color})`,
                  borderRadius: "8px 8px 0 0", transition: "height 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
                  opacity: activeIdx === null || isHovered ? 1 : 0.4,
                  boxShadow: isHovered ? `0 0 20px ${color}66` : "none"
                }} />
              </div>
              
              {/* Label */}
              <div style={{ marginTop: 12, fontSize: 11, textAlign: "center", color: "var(--text-secondary)", fontFamily: ff, height: 32, display: "flex", alignItems: "center" }}>
                {a ? item.labelAr : item.labelEn}
              </div>
            </div>
          );
        })}

        {type === "donut" && (
           <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
             {/* Simple representation for now, normally would use SVG paths. For pure React we can use stacked div conic-gradients or similar. Using an animated CSS pie chart. */}
             <div style={{
               width: Math.min(height, 250), height: Math.min(height, 250), borderRadius: "50%",
               background: `conic-gradient(${data.map((d,i) => {
                 const prevSum = data.slice(0,i).reduce((acc,curr) => acc + curr.value, 0);
                 const sum = data.reduce((acc,curr) => acc + curr.value, 0);
                 const start = (prevSum / sum) * 100;
                 const end = ((prevSum + d.value) / sum) * 100;
                 return `${d.color || COLORS[i % COLORS.length]} ${start}% ${end}%`;
               }).join(", ")})`,
               position: "relative",
               transform: animated ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-45deg)",
               opacity: animated ? 1 : 0,
               transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)"
             }}>
               <div style={{
                 position: "absolute", inset: "25%", background: "var(--bg-primary)", borderRadius: "50%",
                 display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                 boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
               }}>
                  <strong style={{ fontSize: 24, fontFamily: ff }}>{data.reduce((a,b)=>a+b.value,0)}{valueSuffix}</strong>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{t({ en: "Total", ar: "الإجمالي", arEG: "الإجمالي" })}</span>
               </div>
             </div>
             
             {/* Legend */}
             <div style={{ display: "flex", flexDirection: "column", gap: 12, marginLeft: 32, direction: a ? "rtl" : "ltr" }}>
               {data.map((item, i) => (
                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                   <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color || COLORS[i % COLORS.length] }} />
                   <span style={{ fontSize: 13, fontFamily: ff }}>{a ? item.labelAr : item.labelEn}</span>
                   <strong style={{ fontSize: 13, marginLeft: "auto" }}>{valuePrefix}{item.value}{valueSuffix}</strong>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

export function PremiumTable({ headers, data, titleEn, titleAr, sortable = false }: { headers: {key: string, labelEn: string, labelAr: string}[], data: any[], titleEn: string, titleAr: string, sortable?: boolean }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc'|'desc'} | null>(null);
  
  const sortedData = [...data].sort((aObj, bObj) => {
    if (!sortConfig) return 0;
    const aVal = aObj[sortConfig.key];
    const bVal = bObj[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    if (!sortable) return;
    let direction: 'asc'|'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-primary)", background: "rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: 0, fontFamily: ff, fontSize: 16 }}>{a ? titleAr : titleEn}</h3>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", direction: a ? "rtl" : "ltr", textAlign: a ? "right" : "left" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)" }}>
              {headers.map(h => (
                <th key={h.key} onClick={() => requestSort(h.key)} style={{ padding: "12px 20px", fontSize: 12, color: sortConfig?.key === h.key ? "var(--accent-cta)" : "var(--text-muted)", fontFamily: ff, fontWeight: "normal", borderBottom: "1px solid var(--border-primary)", cursor: sortable ? "pointer" : "default", userSelect: "none" }}>
                  {a ? h.labelAr : h.labelEn}
                  {sortable && sortConfig?.key === h.key && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={i} style={{ borderBottom: i === data.length - 1 ? "none" : "1px solid var(--border-primary)", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {headers.map(h => (
                  <td key={h.key} style={{ padding: "16px 20px", fontSize: 14, fontFamily: ff }}>
                    {row[h.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Premium Feature: Sparkline Micro-chart
export function Sparkline({ data, color = "#3B82F6", width = 100, height = 30 }: { data: number[], color?: string, width?: number, height?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  
  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) * stepX} cy={height - ((data[data.length-1] - min) / range) * height} r={3} fill={color} />
    </svg>
  );
}

// Premium Feature: Radar Chart (Simulated SVG)
export function RadarChart({ data, size = 300, color = "#8B5CF6" }: { data: {label: string, val1: number, val2: number}[], size?: number, color?: string }) {
  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (Math.PI * 2) / data.length;
  
  const getPoint = (val: number, i: number) => {
    const r = (val / 100) * radius;
    const x = center + r * Math.sin(i * angleStep);
    const y = center - r * Math.cos(i * angleStep);
    return `${x},${y}`;
  };

  const poly1 = data.map((d, i) => getPoint(d.val1, i)).join(" ");
  const poly2 = data.map((d, i) => getPoint(d.val2, i)).join(" ");

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size}>
        {/* Background webs */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((level, lvlIdx) => (
          <polygon key={lvlIdx} points={data.map((_, i) => getPoint(level * 100, i)).join(" ")} fill="none" stroke="var(--border-primary)" strokeWidth={1} />
        ))}
        {/* Axes */}
        {data.map((_, i) => {
          const p = getPoint(100, i);
          return <line key={i} x1={center} y1={center} x2={p.split(',')[0]} y2={p.split(',')[1]} stroke="var(--border-primary)" strokeWidth={1} />;
        })}
        {/* Data Polygons */}
        <polygon points={poly1} fill="rgba(107, 114, 128, 0.2)" stroke="#6B7280" strokeWidth={2} />
        <polygon points={poly2} fill={`${color}33`} stroke={color} strokeWidth={2} />
        
        {/* Labels */}
        {data.map((d, i) => {
          const r = radius + 20;
          const x = center + r * Math.sin(i * angleStep);
          const y = center - r * Math.cos(i * angleStep);
          return (
            <text key={i} x={x} y={y} fill="var(--text-secondary)" fontSize={11} textAnchor="middle" dominantBaseline="middle" fontFamily="'Noto Kufi Arabic', sans-serif">
              {d.label}
            </text>
          );
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)" }}>
          <div style={{ width: 12, height: 12, background: "rgba(107, 114, 128, 0.4)", border: "1px solid #6B7280" }} /> Traditional
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)" }}>
          <div style={{ width: 12, height: 12, background: `${color}33`, border: `1px solid ${color}` }} /> DeepReal Protocol
        </div>
      </div>
    </div>
  );
}

// Premium Feature: Heatmap Activity Grid (GitHub style)
export function HeatmapGrid({ days = 60, color = "#10B981" }: { days?: number, color?: string }) {
  const [data] = useState(() => Array.from({length: days}, () => Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0));
  
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, width: "100%", maxWidth: 600 }}>
      {data.map((level, i) => {
        let opacity = 0.1;
        if (level === 1) opacity = 0.4;
        if (level === 2) opacity = 0.7;
        if (level === 3) opacity = 1;
        
        return (
          <div 
            key={i} 
            title={`Activity level: ${level}`}
            style={{ 
              width: 14, height: 14, borderRadius: 2, 
              background: level === 0 ? "rgba(255,255,255,0.05)" : color,
              opacity: level === 0 ? 1 : opacity,
              transition: "transform 0.2s",
              cursor: "crosshair"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        );
      })}
    </div>
  );
}

// Premium Feature: Gauge / Speedometer Chart
export function GaugeChart({ value, max = 100, labelEn, labelAr, color = "#06B6D4" }: { value: number, max?: number, labelEn: string, labelAr: string, color?: string }) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const percentage = (value / max) * 100;
  // A half circle is 180 degrees. Dasharray for half circle stroke.
  const radius = 60;
  const circumference = Math.PI * radius; // Half circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: 200, height: 120, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="150" height="85" viewBox="0 0 150 85">
        <path d="M 15 75 A 60 60 0 0 1 135 75" fill="none" stroke="var(--border-primary)" strokeWidth="16" strokeLinecap="round" />
        <path 
          d="M 15 75 A 60 60 0 0 1 135 75" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>
      <div style={{ position: "absolute", bottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>{value}%</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: ff, marginTop: 4 }}>{a ? labelAr : labelEn}</div>
      </div>
    </div>
  );
}

// Premium Feature: Stacked Area Curve (SVG)
export function StackedAreaChart({ data, width = 300, height = 150 }: { data: number[], width?: number, height?: number }) {
  const min = 0;
  const max = Math.max(...data) * 1.2;
  const range = max - min;
  const stepX = width / (data.length - 1);
  
  const points = data.map((val, i) => `${i * stepX},${height - (val / range) * height}`);
  const pathData = `M 0,${height} L ${points.join(" L ")} L ${width},${height} Z`;

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={pathData} fill="url(#areaGrad)" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 1. Interactive Flowchart/Node Map (SVG)
export function InoculationFlowchart({ isRTL }: { isRTL: boolean }) {
  const { t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  return (
    <div style={{ position: "relative", width: "100%", height: 180, background: "rgba(0,0,0,0.1)", borderRadius: 12, border: "1px solid var(--border-primary)", padding: 20 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <path d="M 60 70 C 150 70, 150 70, 240 70" fill="none" stroke="var(--border-primary)" strokeWidth="2" strokeDasharray="4 4" className="path-anim" />
        <path d="M 240 70 C 330 70, 330 70, 420 70" fill="none" stroke="#10B981" strokeWidth="2" className="path-anim" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
        <div style={{ padding: 12, background: "var(--bg-elevated)", border: "1px solid #EF4444", borderRadius: 8, fontSize: 12, fontFamily: ff, width: 120, textAlign: "center", color: "var(--text-primary)" }}>
          {t({ en: "Exposure", ar: "تعرض لشائعة", arEG: "تعرض لشائعة" })}
        </div>
        <div style={{ padding: 12, background: "var(--bg-elevated)", border: "1px solid #F59E0B", borderRadius: 8, fontSize: 12, fontFamily: ff, width: 120, textAlign: "center", color: "var(--text-primary)" }}>
          {t({ en: "Prebunking (DeepReal)", ar: "تلقيح مسبق (DeepReal)", arEG: "تلقيح مسبق (DeepReal)" })}
        </div>
        <div style={{ padding: 12, background: "var(--bg-elevated)", border: "1px solid #10B981", borderRadius: 8, fontSize: 12, fontFamily: ff, width: 120, textAlign: "center", color: "var(--text-primary)" }}>
          {t({ en: "Cognitive Immunity", ar: "مناعة معرفية", arEG: "مناعة معرفية" })}
        </div>
      </div>
      <style>{`.path-anim { stroke-dashoffset: 100; animation: dash 3s linear infinite; } @keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
}

// 2. A/B Testing 3D Flip Cards
export function ABFlipCard({ titleEn, titleAr, valA, valB, isRTL }: { titleEn: string, titleAr: string, valA: string, valB: string, isRTL: boolean }) {
  const { t } = useRTL();
  const [flipped, setFlipped] = useState(false);
  const a = isRTL;
  return (
    <div style={{ perspective: 1000, width: 200, height: 120, cursor: "pointer" }} onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <div style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.6s", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
        {/* Front (Without EAL) */}
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", background: "rgba(239, 68, 68, 0.1)", border: "1px solid #EF4444", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>{t({ en: "Without Platform", ar: "بدون المنصة", arEG: "بدون المنصة" })}</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#EF4444" }}>{valA}</div>
        </div>
        {/* Back (With EAL) */}
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, transform: "rotateY(180deg)" }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>{t({ en: "With DeepReal", ar: "باستخدام DeepReal", arEG: "باستخدام DeepReal" })}</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#10B981" }}>{valB}</div>
        </div>
      </div>
    </div>
  );
}

// 3. System Architecture Diagram
export function ArchitectureSVG({ isRTL }: { isRTL: boolean }) {
  const { t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  return (
    <div style={{ padding: 24, background: "var(--bg-secondary)", borderRadius: 16, border: "1px solid var(--border-primary)", textAlign: "center" }}>
      <svg width="300" height="150" viewBox="0 0 300 150">
        <rect x="10" y="50" width="80" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" />
        <text x="50" y="75" fill="var(--text-primary)" fontSize="12" textAnchor="middle" fontFamily={ff}>{t({ en: "Next.js UI", ar: "الواجهة", arEG: "الواجهة" })}</text>
        
        <path d="M 90 75 L 130 75" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 4" />
        
        <rect x="130" y="30" width="80" height="90" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" />
        <text x="170" y="55" fill="var(--text-primary)" fontSize="12" textAnchor="middle" fontFamily={ff}>{t({ en: "Logic Core", ar: "المحرك", arEG: "المحرك" })}</text>
        <text x="170" y="75" fill="var(--text-muted)" fontSize="10" textAnchor="middle" fontFamily={ff}>MIST-20</text>
        <text x="170" y="95" fill="var(--text-muted)" fontSize="10" textAnchor="middle" fontFamily={ff}>MHLS</text>
        
        <path d="M 210 75 L 250 75" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 4" />
        
        <circle cx="270" cy="75" r="25" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" />
        <text x="270" y="79" fill="var(--text-primary)" fontSize="12" textAnchor="middle" fontFamily={ff}>DB</text>
      </svg>
    </div>
  );
}

// 4. Pilot Progress Tracker
export function PilotTracker({ isRTL }: { isRTL: boolean }) {
  const { t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  return (
    <div style={{ padding: 24, background: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--border-primary)" }}>
      <h4 style={{ margin: "0 0 16px", fontFamily: ff }}>{t({ en: "N=84 Pilot Timeline", ar: "خط زمني لتقييم العينة (N=84)", arEG: "خط زمني لتقييم العينة (N=84)" })}</h4>
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        <div style={{ position: "absolute", top: 12, left: 0, right: 0, height: 2, background: "var(--border-primary)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 12, left: 0, width: "50%", height: 2, background: "#10B981", zIndex: 1 }} />
        
        {['Baseline', 'Intervention', 'Post-Test'].map((step, i) => (
          <div key={step} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: i < 2 ? "#10B981" : "var(--bg-secondary)", border: `2px solid ${i < 2 ? "#10B981" : "var(--border-primary)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: i < 2 ? "#fff" : "var(--text-muted)", fontSize: 12, fontWeight: "bold" }}>
              {i + 1}
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)", fontFamily: ff }}>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Live User Persona Visualizer
export function PersonaVisualizer({ isRTL }: { isRTL: boolean }) {
  const { t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [role, setRole] = useState<'guest'|'admin'>('guest');
  return (
    <div style={{ padding: 20, border: "1px solid var(--border-primary)", borderRadius: 12, background: "var(--bg-secondary)" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setRole('guest')} style={{ padding: "4px 12px", background: role === 'guest' ? "var(--accent-cta)" : "transparent", color: role === 'guest' ? "#fff" : "var(--text-muted)", border: "1px solid var(--border-primary)", borderRadius: 4, cursor: "pointer", fontFamily: ff }}>{t({ en: "Guest", ar: "زائر", arEG: "زائر" })}</button>
        <button onClick={() => setRole('admin')} style={{ padding: "4px 12px", background: role === 'admin' ? "#EF4444" : "transparent", color: role === 'admin' ? "#fff" : "var(--text-muted)", border: "1px solid var(--border-primary)", borderRadius: 4, cursor: "pointer", fontFamily: ff }}>{t({ en: "Admin", ar: "مشرف", arEG: "مشرف" })}</button>
      </div>
      <div style={{ fontSize: 13, fontFamily: "monospace", color: "var(--text-secondary)", minHeight: 60 }}>
        {role === 'guest' ? 
          "{ permissions: ['read_baseline', 'play_arena'], metrics: 'hidden', intervention: 'active' }" : 
          "{ permissions: ['read_all', 'export_n84_data', 'view_metrics'], panel: 'unlocked' }"}
      </div>
    </div>
  );
}

// 6. Live Terminal Simulation
export function LiveTerminal() {
  const [lines, setLines] = useState<string[]>(['> Initializing DeepReal Engine...']);
  useEffect(() => {
    const cmds = [
      '> Connecting to CAPMAS node...',
      '> Fetching 2024 literacy rates: OK (89%)',
      '> Compiling MIST-20 psychometrics...',
      '> Validating source: Reuters Institute...',
      '> System Ready. Awaiting user input.'
    ];
    let i = 0;
    const int = setInterval(() => {
      if (i < cmds.length) {
        setLines(prev => [...prev, cmds[i]]);
        i++;
      } else {
        clearInterval(int);
      }
    }, 1500);
    return () => clearInterval(int);
  }, []);
  return (
    <div style={{ background: "#000", border: "1px solid #333", borderRadius: 8, padding: 16, fontFamily: "monospace", fontSize: 12, color: "#10B981", height: 150, overflowY: "auto" }}>
      {lines.map((l, i) => <div key={i} style={{ marginBottom: 4 }}>{l}</div>)}
      <span className="blink">_</span>
    </div>
  );
}
