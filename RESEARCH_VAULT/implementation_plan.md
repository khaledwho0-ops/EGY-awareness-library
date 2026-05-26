# SHOW IT — The 6-Layer Deception Interactive Experience

## Goal

Build an Awwwards-quality interactive scrollytelling experience that presents the 6-Layer Architecture of Deception research to Egyptian users. The user scrolls down and **descends through 6 layers**, each progressively darker and more complex, with 3D particle morphs, case study reveals, and live statistics.

## The Stack

| Role | Tool | Why |
|------|------|-----|
| **3D Engine** | React Three Fiber (R3F) | Already React/Next.js; declarative 3D |
| **GPU Compute** | GPGPU FBO (Ping-Pong) | 100K+ particles morphing between 6 shapes |
| **Shaders** | Custom GLSL | Curl noise, simplex, procedural shapes |
| **Scroll Animation** | GSAP + ScrollTrigger | Industry standard; scrub-linked reveals |
| **Smooth Scroll** | Lenis | Cinematic scroll feel (lerp: 0.1) |
| **UI Animation** | Framer Motion (already installed) | Micro-interactions, entry/exit |
| **Framework** | Next.js 16 (existing) | App Router, SSR text for SEO |
| **Styling** | Tailwind CSS 4 (existing) | Existing design system |
| **Typography** | Clash Display + Cairo + Amiri (existing fonts) | Arabic + English premium type |
| **Post-Processing** | UnrealBloomPass + Vignette | Cinematic particle glow per layer |

## The Visual Design

### Color Palette Per Layer (60-30-10 Rule)

| Layer | Name | Accent Color | HSL | Background Shift | Emotion |
|-------|------|-------------|-----|-----------------|---------|
| **Hero** | — | White + Gold | `hsl(45, 100%, 60%)` | `hsl(230, 20%, 4%)` | Authority, trust |
| **L1** | الكذب المطلق | Crimson Red | `hsl(0, 90%, 55%)` | `hsl(0, 30%, 5%)` | Danger, deception |
| **L2** | العدسة المنحازة | Amber Gold | `hsl(40, 100%, 55%)` | `hsl(30, 20%, 5%)` | Warning, distortion |
| **L3** | اقتطاع السياق | Electric Purple | `hsl(270, 90%, 60%)` | `hsl(270, 30%, 4%)` | Confusion, loss |
| **L4** | التوقيت المسلّح | Ice Blue | `hsl(200, 100%, 55%)` | `hsl(210, 40%, 3%)` | Cold, calculated |
| **L5** | التطبيق الشرير | Toxic Green | `hsl(140, 100%, 50%)` | `hsl(150, 30%, 3%)` | Poison, corruption |
| **L6** | مصفوفة التلاعب | Magenta → Void | `hsl(300, 100%, 50%)` | `hsl(260, 100%, 1%)` | Abyss, entrapment |

### Particle Shape Morphs Per Layer

| Layer | Shape | GLSL Function | Visual Metaphor |
|-------|-------|--------------|-----------------|
| **Hero** | Fibonacci Sphere | Golden angle distribution | Unity, completeness |
| **L1** | Shattered Sphere → Scattered | Exploded sphere with noise | Lies breaking apart |
| **L2** | Prism / Lens | Torus with axis distortion | Filtering reality |
| **L3** | Puzzle with gaps | Grid with missing chunks | Missing context |
| **L4** | Clock / Spiral | Logarithmic spiral + pulsing | Weaponized time |
| **L5** | DNA Helix → Twisted | Double helix with corruption offset | Corrupted knowledge |
| **L6** | Brain (fBm-folded sphere) | Sulci and gyri via fBm | The captured mind |

### Scroll Journey Structure

```
[HERO SECTION] — 100vh
  Arabic title: "هندسة الخداع — ٦ طبقات"
  English subtitle: "The Architecture of Deception — 6 Layers"
  Particle sphere floating, pulsing gently
  "Scroll to descend ↓"
  
[TRANSITION] — 50vh
  Particles begin scattering, background darkens
  Counter: "39 case studies • 6 layers • 1000+ years of deception"

[LAYER 1] — 200vh (pinned with scrub)
  Left: Particle shape morphs to shattered sphere
  Right: Layer info cards scroll up
    - Layer number + Arabic name
    - Definition
    - Case study mini-cards (Piltdown, Wakefield, Protocols)
    - Damage counter animates up
  Color shifts to crimson

[LAYER 2] — 200vh (pinned with scrub)
  Particles morph to prism/torus
  Case studies: Tobacco, Sugar, Al Jazeera vs Al Arabiya
  Color shifts to amber

[LAYER 3] — 200vh
  Particles morph to puzzle with gaps
  Quran 2:191 analysis (critical piece — full context shown)
  Color shifts to purple

[LAYER 4] — 200vh
  Particles morph to spiral clock
  Comey Letter, WikiLeaks, EGP timing
  Color shifts to ice blue

[LAYER 5] — 200vh
  Particles morph to corrupted DNA helix
  Eugenics, Tuskegee, Cambridge Analytica, MKUltra, Unit 731
  Color shifts to toxic green

[LAYER 6] — 300vh (longest — the deepest layer)
  Particles morph to brain
  ISIS pipeline, QAnon, Anti-vax pipeline
  BITE Model visualization
  Background goes near-black
  Color: magenta → void

[DEFENSE SECTION] — 100vh
  Particles reform into sphere (hope/unity)
  "The Defense Protocol" per-layer table
  CTA: "ابدأ رحلتك" (Start your journey)
  Color returns to gold/white
```

---

## Proposed Changes

### New Dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react lenis
```

---

### New Route: `/six-layers`

#### [NEW] `src/app/six-layers/page.tsx`
The main page component. Server component wrapper that imports the client experience.

#### [NEW] `src/app/six-layers/layout.tsx`  
Custom layout that hides the global Navbar/Footer for full immersive mode. Adds a minimal floating nav.

---

### 3D Scene Components

#### [NEW] `src/components/six-layers/Scene.tsx`
The R3F `<Canvas>` wrapper. Sets up:
- WebGL renderer with `dpr={[1, 2]}`, `antialias: false`
- Camera at z=5
- Post-processing: UnrealBloomPass (strength per layer), Vignette
- EffectComposer from @react-three/postprocessing
- `eventSource` for pointer tracking through DOM overlay

#### [NEW] `src/components/six-layers/ParticleSystem.tsx`
The GPGPU particle engine:
- Ping-pong FBO pattern (2 render targets)
- Position data texture (RGBA = x,y,z,life)
- Velocity data texture
- Simulation shader (curl noise + gravity + per-layer forces)
- Render shader (point sprite with additive blending)
- `useFrame` for simulation tick
- Receives `morphTarget` (0-6) and `scrollProgress` from scroll context

#### [NEW] `src/components/six-layers/shaders/simulation.frag`
GPGPU simulation fragment shader:
- Reads position + velocity from FBO textures
- Computes curl noise forces
- Computes morph target interpolation (mix between shape positions)
- Mouse interaction (attraction/repulsion via inverse square law)
- Writes new position to output FBO

#### [NEW] `src/components/six-layers/shaders/render.vert`
Particle render vertex shader:
- Reads position from FBO texture
- Sets gl_PointSize based on distance + life
- Passes color + life to fragment shader

#### [NEW] `src/components/six-layers/shaders/render.frag`
Particle render fragment shader:
- Soft circle (smoothstep)
- Per-layer color from uniform
- HDR boost for bloom pickup
- Additive blending ready

#### [NEW] `src/components/six-layers/shaders/shapes.glsl`
Shape library — all 7 procedural shapes as pure GLSL functions:
- `getHeroSphere()`, `getShattered()`, `getPrism()`, `getPuzzle()`
- `getSpiral()`, `getDNA()`, `getBrain()`
- Each returns `vec3` position from seed `vec3`

---

### DOM Scroll Components

#### [NEW] `src/components/six-layers/ScrollExperience.tsx`
The scrollytelling DOM layer:
- Uses GSAP ScrollTrigger with `pin: true` per section
- Lenis smooth scroll integration
- Sends `scrollProgress` and `currentLayer` to 3D scene via React context
- Manages background color transitions via CSS custom properties

#### [NEW] `src/components/six-layers/LayerSection.tsx`
Reusable layer section component:
- Layer number + Arabic/English name
- Definition text with stagger reveal
- Case study cards
- Damage counter (GSAP snap animation)
- Receives layer data as props

#### [NEW] `src/components/six-layers/CaseStudyCard.tsx`
Individual case study mini-card:
- Title, layer badge, domain tag
- Damage metrics
- Expand to full detail on click
- Glassmorphism 2.0 styling

#### [NEW] `src/components/six-layers/HeroSection.tsx`
Opening hero with Arabic typography:
- "هندسة الخداع" in Amiri/Cairo, massive clamp() sizing
- Subtitle fades in with stagger
- Scroll indicator pulses
- Particle sphere visible behind via mix-blend-mode: difference

#### [NEW] `src/components/six-layers/DefenseSection.tsx`
Closing section:
- Per-layer defense protocol table
- Particles reform into sphere (hope)
- CTA button with magnetic hover effect
- Color returns to warm gold

#### [NEW] `src/components/six-layers/FloatingNav.tsx`
Minimal floating navigation:
- 6 dots (one per layer) with current layer highlighted
- Click to jump to layer
- Layer name tooltip on hover
- Glassmorphism pill at bottom

---

### Shared Utilities

#### [NEW] `src/components/six-layers/ScrollContext.tsx`
React context providing:
- `scrollProgress: number` (0-1 overall)
- `currentLayer: number` (0-6)
- `layerProgress: number` (0-1 within current layer)
- `mousePosition: {x, y}` (normalized -1 to 1)

#### [NEW] `src/components/six-layers/useLenis.ts`
Custom hook for Lenis setup + GSAP ScrollTrigger sync.

#### [NEW] `src/components/six-layers/data.ts`
Layer data export — all 39 case studies formatted for the UI:
- Titles (Arabic + English)
- Definitions
- Case study arrays with damage metrics
- Color values per layer

---

## Performance Strategy

| Technique | Implementation |
|-----------|---------------|
| **Particle count** | Desktop: 262,144 (512²) · Tablet: 65,536 (256²) · Mobile: 16,384 (128²) |
| **FBO size** | Desktop: 512² · Tablet: 256² · Mobile: 128² |
| **DPR cap** | `Math.min(window.devicePixelRatio, 2)` |
| **Post-processing** | Desktop: Bloom + Vignette · Mobile: None |
| **content-visibility** | `auto` on off-screen layer sections |
| **prefers-reduced-motion** | Disable particles, use static gradient backgrounds |
| **useRef mutation** | Zero `useState` in render loop — all animation via refs |
| **Cleanup** | Dispose ALL textures, geometries, render targets on unmount |

---

## Verification Plan

### Automated Tests
- `npm run build` — ensure no TypeScript/build errors
- `npm run dev` — verify page loads on localhost
- Check WebGL console for errors
- Verify particle count adjusts on resize

### Manual Verification
- Scroll through all 6 layers — smooth transitions
- Check Arabic text renders correctly (RTL)
- Test on Chrome, Firefox, Edge
- Verify mobile fallback (reduced particles, no post-processing)
- Check `prefers-reduced-motion` respects user preference

---

> [!IMPORTANT]
> ## Key Design Decision: Progressive Disclosure
> 
> Each layer starts with just the **number and name**. As the user scrolls through the layer's pinned section:
> 1. First: Definition appears (1-sentence)
> 2. Then: Key statistic counter animates
> 3. Then: Case study cards slide in one by one (stagger)
> 4. Then: The "Egyptian Connection" callout reveals
> 5. Finally: Transition to next layer begins
> 
> This mirrors the research philosophy — **you can't understand Layer 6 until you've experienced Layers 1-5.**

---

## Resolved Design Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| **Arabic font** | `Amiri` for layer NAMES (scholarly gravitas) + `Cairo` for body text (modern readability) + `Clash Display` for English headings | Mixed typography = premium; Amiri evokes classical Islamic scholarship (trust), Cairo is clean for reading |
| **Sound design** | YES — ambient drone per layer, opt-in via "🔊 Enable Audio" button, muted by default | The immersion multiplier is worth it; muted-by-default respects mobile users |
| **Mobile experience** | Reduced particles (16K) + CSS-only gradient backgrounds + preserved scroll animations | Mobile GPU budgets can't handle bloom; CSS gradients with `@property` animation are nearly as beautiful |
| **Route** | `/six-layers` as a SEPARATE route, NOT replacing homepage | The homepage has existing functionality; this is a standalone cinematic experience |

---

## EXPANDED SPECIFICATION — FULL CREATIVE BIBLE DEPLOYMENT

### 1. Custom Cursor System

Every layer changes the cursor to reflect its emotional state.

#### [NEW] `src/components/six-layers/CustomCursor.tsx`

```
- cursor: none on the entire page
- Absolute-positioned div following mouse via lerp(0.08)
- OUTER ring: 40px circle, border only, follows with lerp(0.05) (laggy)
- INNER dot: 8px circle, follows with lerp(0.15) (snappy)
- Per-layer cursor mutation:
  Layer 1: cursor ring turns red, pulses (scale animation)
  Layer 2: cursor becomes a "lens" (half-circle, half-transparent)
  Layer 3: cursor becomes fragmented (3 dots orbiting)
  Layer 4: cursor becomes clock-hand (thin line rotating)
  Layer 5: cursor gets toxic green glow trail (last 5 positions)
  Layer 6: cursor becomes brain-scan crosshair
  Defense: cursor becomes golden shield
- Hover on cards: cursor scales up 2x, text changes to "تفاصيل" (details)
- Hover on CTA: magnetic attraction (GSAP quickTo, 30% pull)
```

### 2. Magnetic Buttons

#### [NEW] `src/components/six-layers/MagneticButton.tsx`

Every CTA and interactive button uses GSAP quickTo for magnetic pull:
- `mousemove`: calculate dx/dy from center, apply 30% attraction
- `mouseleave`: elastic.out(1, 0.3) snap-back
- Click: squash-and-stretch (scaleY: 0.95, scaleX: 1.05 → 100ms → reset)
- Per-layer glow color on hover (text-shadow + box-shadow in layer accent color)

### 3. Text Split Animation System

#### [NEW] `src/components/six-layers/SplitText.tsx`

Uses `Intl.Segmenter` for proper Arabic character segmentation (NOT naive split):
- Arabic text splits by grapheme clusters (handles diacritics correctly)
- English text splits by word or character
- Modes:
  - `word`: each word animates separately (for body text reveals)
  - `char`: each character animates (for hero titles)
  - `line`: each line animates (for definitions)
- Animation: GSAP stagger with y: 60, autoAlpha: 0, ease: "expo.out", stagger: 0.03
- ScrollTrigger integration: reveals on scroll entry

### 4. Scroll Velocity Effects

#### [NEW] `src/components/six-layers/ScrollVelocity.tsx`

Reads Lenis velocity and applies visual effects:
- **Text skew**: large headings apply `scaleY(1 + velocity * 0.1)` when scrolling fast
- **Motion blur**: apply `filter: blur(velocity * 2px)` on fast scroll
- **Particle acceleration**: particles get extra curl noise force proportional to velocity
- Uses `useMotionValue` (Framer Motion) to avoid re-renders

### 5. Glassmorphism 2.0 Design System

All cards, panels, and modals use this system:

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  /* SVG noise overlay for texture */
  position: relative;
}
.glass-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/noise.svg');
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

Per-layer glass tint:
- L1: `rgba(255, 50, 50, 0.05)` — red tint
- L2: `rgba(255, 200, 0, 0.05)` — amber tint
- L3: `rgba(120, 50, 255, 0.05)` — purple tint
- L4: `rgba(0, 150, 255, 0.05)` — blue tint
- L5: `rgba(0, 255, 80, 0.05)` — green tint
- L6: `rgba(255, 0, 255, 0.05)` — magenta tint

### 6. Film Grain Overlay

#### [NEW] `public/noise.svg`

Procedural noise SVG (feTurbulence) for the film-grain look:
```xml
<svg><filter id="n"><feTurbulence baseFrequency="0.8" numOctaves="4" seed="0"/></filter>
<rect width="100%" height="100%" filter="url(#n)" opacity="1"/></svg>
```

Applied via `mix-blend-mode: overlay` at `opacity: 0.04` — subtle grain across entire site.

### 7. Sound Design Per Layer

#### [NEW] `src/components/six-layers/AudioEngine.tsx`

Uses Howler.js for audio management:

| Layer | Ambient Sound | Mood | Duration |
|-------|--------------|------|----------|
| Hero | Low harmonic drone, warm pad | Trust, invitation | Loop |
| L1 | Static noise, distorted radio frequencies | Deception, chaos | Loop |
| L2 | Filtered choir, one-note sustained | Bias, half-truth | Loop |
| L3 | Reversed audio fragments, broken glass | Fragmentation | Loop |
| L4 | Ticking clock, heartbeat bass | Urgency, calculation | Loop |
| L5 | Industrial hum, low brass | Dread, corruption | Loop |
| L6 | Deep sub-bass + neural network chirps | The abyss | Loop |
| Defense | Uplifting strings, warmth returns | Hope, resolution | Loop |

- Crossfade between layers (500ms overlap)
- UI click sounds: subtle glass-tap on card interaction
- Volume: 0.15 (barely audible — ambient, not foreground)
- `prefers-reduced-motion` → disable all audio

### 8. Counter Animation System

#### [NEW] `src/components/six-layers/AnimatedCounter.tsx`

GSAP snap pattern for counting up statistics:
```javascript
gsap.to(counterRef, {
  innerText: targetValue,
  duration: 2.5,
  ease: "power2.out",
  snap: { innerText: 1 },
  scrollTrigger: { trigger: counterRef, start: "top 85%" }
});
```

Per-layer counters from agent research data:
| Layer | Counter | Target | Arabic Label |
|-------|---------|--------|-------------|
| L1 | Scientific frauds documented | 183+ | حالة تزوير علمي موثقة |
| L1 | Retracted papers | 10,000+ | ورقة علمية مسحوبة |
| L2 | Industry lobbying spend | $3.6B | مليار دولار إنفاق ضغط |
| L2 | Unreported drug trials | 50% | من التجارب لا تُنشر |
| L3 | Mis-cited statistics | 6× faster spread | أسرع انتشاراً |
| L4 | EGP parallel market premium | 38% | علاوة السوق السوداء |
| L5 | Tuskegee victims | 399 men | رجل خضع للتجربة |
| L5 | MKUltra institutions | 80+ | مؤسسة شاركت |
| L6 | ISIS foreign fighters | 40,000+ | مقاتل أجنبي |
| L6 | QAnon followers (est.) | millions | متابع |
| Egyptian | Self-medication rate | 53.9% | نسبة التداوي الذاتي |
| Egyptian | Psychiatrists per 100K | 1.44 | طبيب نفسي لكل ١٠٠ ألف |
| Egyptian | Internet users | 82M+ | مستخدم إنترنت مصري |

### 9. Horizontal Scroll Sub-Sections

#### [NEW] `src/components/six-layers/HorizontalScroll.tsx`

For case study galleries within each layer:
- GSAP ScrollTrigger `pin: true` + horizontal `x` translation
- Cards slide horizontally as user scrolls vertically
- Each card is a full case study mini-card (glassmorphism)
- Progress dots at bottom show position in horizontal strip
- Touch-swipe support for mobile (GSAP Draggable)

### 10. Cross-Layer Interaction Matrix Visualization

#### [NEW] `src/components/six-layers/InteractionMatrix.tsx`

A D3.js force-directed network graph showing how the 19+ case studies connect across layers:
- Nodes = case studies (sized by damage metric)
- Edges = cross-layer connections (colored by layer pair)
- Interactive: click a node → highlight all connected layers
- Particle-style rendering: nodes are glowing dots matching their primary layer color
- Appears after Layer 6 in the "See the Full Picture" section

### 11. Per-Layer Voronoi / Reaction-Diffusion Backgrounds

Each layer has a unique CSS/GLSL animated background texture beneath the glass panels:

| Layer | Background Effect | Implementation |
|-------|------------------|----------------|
| Hero | Subtle animated gradient (conic-gradient with @property) | CSS @property --gradient-angle |
| L1 | Voronoi crack pattern (red veins on black) | GLSL fragment shader |
| L2 | Distorted lens effect (barrel distortion) | CSS filter + GLSL |
| L3 | Grid with dissolving cells | CSS grid + GSAP stagger |
| L4 | Concentric ripples from center (timed pulses) | GLSL SDF rings |
| L5 | Reaction-diffusion (Gray-Scott, slow, ominous) | GLSL compute |
| L6 | Neural network firing pattern (random pulses along edges) | Canvas 2D lines + glow |
| Defense | Sunrise gradient (warm bottom → dark top) | CSS linear-gradient transition |

### 12. Fresnel Hologram Effect for Layer Icons

Each layer number (١ through ٦) rendered as a 3D holographic numeral:
- Fresnel edge glow in layer accent color
- Slow rotation (0.5 rad/s)
- Chromatic aberration post-process on the numeral only
- Uses `MeshBasicMaterial` with custom vertex shader for Fresnel

### 13. Mask Transitions Between Layers

Instead of simple fade, each layer transition uses a unique mask:

| Transition | Mask Type | CSS/GSAP |
|------------|----------|----------|
| Hero → L1 | Circular wipe from center (shattering glass) | `clip-path: circle()` animated |
| L1 → L2 | Diagonal wipe (light through prism) | `clip-path: polygon()` |
| L2 → L3 | Puzzle-piece dissolve (random squares) | Grid of divs with stagger opacity |
| L3 → L4 | Clock-hand sweep (radial wipe) | `conic-gradient` mask |
| L4 → L5 | DNA strand wave (sinusoidal clip) | `clip-path: path()` animated |
| L5 → L6 | Neural tendrils creeping (SVG path draw) | `stroke-dasharray` animation |
| L6 → Defense | Light explosion (white flash → fade) | Full-screen white overlay fade |

### 14. Scroll Progress Indicator

#### [NEW] `src/components/six-layers/ScrollProgress.tsx`

- Thin 2px line at the very top of the viewport
- Color changes per layer (accent color)
- `scaleX` transform driven by overall scroll percentage
- Below the line: 6 segment markers (one per layer)
- Current layer name appears next to the progress indicator in small mono text

### 15. Skeleton Loading State

#### [NEW] `src/components/six-layers/SkeletonLoader.tsx`

While WebGL initializes (can take 1-3 seconds):
- Animated gradient skeletons (pulsing `linear-gradient`)
- "INITIALIZING NEURAL CORE..." micro-copy in JetBrains Mono
- Fades out via `AnimatePresence` when Canvas reports ready

---

## EXPANDED CONTENT MAPPING — ALL AGENT RESEARCH DATA

### Layer 1 Case Studies (Total: 15+)

| # | Case Study | Source | Domain |
|---|-----------|--------|--------|
| 1 | Piltdown Man (1912) | Study doc §1 | Scientific |
| 2 | Wakefield MMR (1998) | Study doc §1 | Scientific |
| 3 | Diederik Stapel | Study doc §1 | Scientific |
| 4 | Hwang Woo-suk Stem Cells (2005) | Study doc §1 | Scientific |
| 5 | Jan Hendrik Schön | Study doc §12 | Scientific |
| 6 | Protocols of the Elders of Zion | Study doc §1 | Political |
| 7 | Electronic Flies (الذباب الإلكتروني) | Study doc §1 | Political/Egyptian |
| 8 | Donation of Constantine | Study doc §1 | Religious |
| 9 | Fabricated Hadith (الأحاديث الموضوعة) | Study doc §1 | Religious/Islamic |
| 10 | AI Legal Hallucinations | Study doc §12 | AI/Modern |
| 11 | Deepfake Election Audio | Study doc §12 | AI/Modern |
| 40 | Antibiotic OTC Catastrophe (Egypt) | Agent M1 | Egyptian/Medical |
| 42 | TikTok Health Hakeems (Egypt) | Agent M1 | Egyptian/Medical |
| 48 | "Egypt Found a Cure" COVID (2020) | Agent M3 | Egyptian/Political |
| 55 | Fake-Antibiotic Pediatric Deaths (2022) | Agent M5 | Egyptian/Pharma |
| 60 | HoggPool Crypto Pyramid (2023) | Agent M6 | Egyptian/Economic |

### Layer 2 Case Studies (Total: 12+)

| # | Case Study | Domain |
|---|-----------|--------|
| 1 | Tobacco Industry Playbook | Scientific |
| 2 | Sugar Industry Harvard Bribery (1960s) | Scientific |
| 3 | Al Jazeera vs Al Arabiya | Political/Media |
| 4 | Fossil Fuel Denial ($3.6B) | Scientific |
| 5 | Pharmaceutical Publication Bias | Scientific |
| 6 | Social Media Algorithmic Bias | Tech |
| 41 | "7aga Sa7'na" Folk-Remedy Culture | Egyptian/Medical |
| 50 | Egyptian WhatsApp Herbal COVID Protocols | Egyptian/Medical |
| 52 | Battle of the Camel — Media Framing | Egyptian/Political |
| 54 | June 30 Crowd-Size War | Egyptian/Political |
| 57 | March 2024 EGP Float Misinformation | Egyptian/Economic |
| 58 | Ras El-Hekma Deal — Dual Narratives | Egyptian/Economic |
| 59 | BRICS Membership Misinformation | Egyptian/Economic |

### Layer 3 Case Studies (Total: 8+)

| # | Case Study | Domain |
|---|-----------|--------|
| 1 | Quran 2:191 Decontextualization | Religious/Islamic |
| 2 | In-Vitro Sensationalism | Scientific |
| 3 | VAERS Data Misuse | Scientific/Medical |
| 4 | Howard Dean Scream (2004) | Political |
| 46 | Schizophrenia/Epilepsy as "Jinn" | Egyptian/Religious-Medical |
| 53 | Tawfik Okasha — Faraeen Channel | Egyptian/Media |

### Layer 4 Case Studies (Total: 8+)

| # | Case Study | Domain |
|---|-----------|--------|
| 1 | Comey Letter (Oct 2016) | Political |
| 2 | WikiLeaks DNC Timing | Political |
| 3 | Danish Cartoons Delayed Outrage (2005) | Religious/Political |
| 4 | EGP Timing Attacks | Economic/Egyptian |
| 49 | Dr. Hossam Hosny vs Infodemic | Egyptian/COVID |
| 51 | January 28 Internet Blackout (2011) | Egyptian/Political |
| 57 | Pre-Float Panic Rumors (2024) | Egyptian/Economic |

### Layer 5 Case Studies (Total: 10+)

| # | Case Study | Domain |
|---|-----------|--------|
| 1 | Eugenics / Buck v. Bell (1927) | Scientific |
| 2 | Tuskegee Syphilis Study (1932-1972) | Scientific/Racial |
| 3 | Cambridge Analytica | Tech/Political |
| 4 | MKUltra (80+ institutions) | Scientific/Political |
| 5 | Unit 731 (3,000-12,000 killed) | Scientific/Military |
| 6 | Dual-Use Research Framework | Scientific |
| 44 | Egypt Psychiatrist Shortage → Exploitation | Egyptian/Medical |
| 45 | Exploitative Ruqyah Industry | Egyptian/Religious |
| 56 | Counterfeit Weight-Loss GLP-1 Black Market | Egyptian/Pharma |

### Layer 6 Case Studies (Total: 10+)

| # | Case Study | Domain |
|---|-----------|--------|
| 1 | BITE Model (Cult Control) | Psychological |
| 2 | ISIS 7-Stage Recruitment Pipeline | Radicalization |
| 3 | QAnon Architecture (6 components) | Conspiracy/Tech |
| 4 | Terror Management Theory | Psychological |
| 5 | Anti-Vax Radicalization Pipeline | Medical/Conspiracy |
| 6 | Manosphere Pipeline | Social/Radicalization |
| 43 | WhatsApp Medical-Advice Chains (Egypt) | Egyptian/Family |
| 47 | Dr. Ahmed Okasha — Fighting L6 Stigma | Egyptian/Psychiatry |
| 48 | "Egypt Cure" as L6 Matrix | Egyptian/COVID |

---

## EXPANDED INTERACTION DESIGN PER LAYER

### Layer 1: الكذب المطلق — The Absolute Fabrication

**Duration:** 300vh (pinned with scrub)

**Particle Behavior:**
- Starts as perfect sphere (inherited from Hero)
- At 20% progress: sphere develops cracks (noise displacement increases)
- At 50%: sphere SHATTERS — particles explode outward with curl noise
- At 80%: fragments reassemble but with gaps (missing pieces = lies exposed)
- Mouse interaction: particles REPEL from cursor (lies flee from scrutiny)
- Color: white → crimson red, with additive blending creating orange-white at overlap

**DOM Content Sequence:**
1. Layer number "١" as 3D hologram numeral (Fresnel glow, red)
2. Arabic name "الكذب المطلق" — Amiri font, stagger char reveal (expo.out)
3. English: "THE ABSOLUTE FABRICATION" — Clash Display, letter-spacing: 0.3em
4. Definition text fades in word-by-word (Cairo, weight 300)
5. Horizontal scroll strip: 15 case study cards slide through
6. Damage counter section: 3 counters animate up simultaneously
7. Egyptian connection callout: red glassmorphism card with Egyptian cases
8. Exit: circular mask wipe → Layer 2

**Unique Visual:**
- Background: animated Voronoi crack pattern (red veins pulsing)
- All case study cards have a "❌ FAKE" stamp watermark at 15° rotation
- The "AI GENERATED" badge on relevant cards pulses with a scan-line effect

---

### Layer 2: العدسة المنحازة — The Biased Lens

**Duration:** 300vh (pinned with scrub)

**Particle Behavior:**
- Fragments from L1 REASSEMBLE into a torus/prism shape
- The torus has a "slit" — particles stream through it and come out COLORED differently
- White particles enter → amber/gold particles exit (the bias filter)
- Mouse interaction: cursor creates a "lens flare" effect — particles near cursor get extra brightness
- Subtle chromatic aberration on particles nearest to camera

**DOM Content Sequence:**
1. "٢" hologram (amber glow)
2. "العدسة المنحازة" stagger reveal
3. Side-by-side comparison layout: "What They Show" vs "What They Hide" (two columns)
4. Tobacco playbook timeline: horizontal scroll with dated milestones
5. Al Jazeera vs Al Arabiya: split-screen case study
6. Counters: "$3.6B lobbying", "50% trials unpublished"
7. "Egyptian Lens" callout: EGP dual narratives, folk remedies as biased truth
8. Exit: diagonal wipe (prism light refraction)

**Unique Visual:**
- Background: barrel-distortion shader (everything subtly warped at edges)
- Cards have a "half-visible" design: left half is sharp, right half is blurred
- A literal glass prism 3D object floats above the torus in the scene

---

### Layer 3: اقتطاع السياق — Decontextualization

**Duration:** 300vh (pinned with scrub)

**Particle Behavior:**
- Torus from L2 dissolves into a GRID formation
- Grid chunks start disappearing — particles at certain coordinates vanish
- Remaining particles form a "puzzle with missing pieces"
- Mouse interaction: hovering fills in the gaps temporarily (showing what context looks like)
- Particles at edges jitter/vibrate (unstable without context)

**DOM Content Sequence:**
1. "٣" hologram (electric purple glow)
2. "اقتطاع السياق" stagger reveal
3. Quran 2:191 FULL ANALYSIS: interactive before/after showing verse in isolation vs full passage
4. The "Contextomy" gallery: 5 famous out-of-context quotes with reveal
5. Each card has a "show full context" button that expands to reveal what was hidden
6. Counters: "6× faster spread" (MIT study)
7. Schizophrenia-as-Jinn: the medical decontextualization
8. Exit: puzzle-piece dissolve

**Unique Interactive:**
- The Quran verse section is THE centerpiece — tap each highlighted word to see surrounding context light up
- "Context slider": drag to slide between "stripped" view and "full context" view
- Background: grid pattern with cells dissolving and reappearing

---

### Layer 4: التوقيت المسلّح — Weaponized Timing

**Duration:** 300vh (pinned with scrub)

**Particle Behavior:**
- Grid from L3 forms a LOGARITHMIC SPIRAL (clock/time metaphor)
- Particles pulse in waves from center outward (like a clock ticking)
- Every few seconds, a "shockwave" ripples through the spiral (representing "the moment")
- Mouse interaction: click creates an explosion ring (the "trigger" moment)
- Color: transitions to ice blue with white pulse waves

**DOM Content Sequence:**
1. "٤" hologram (ice blue glow, slowly rotating like a clock)
2. "التوقيت المسلّح" stagger reveal
3. Interactive TIMELINE: horizontal scrollable timeline of weaponized-timing events
   - 1964 Gulf of Tonkin → 2003 WMDs → 2005 Danish Cartoons → 2016 Comey Letter → 2024 EGP Float
4. Each event has a "timing window" visualization showing WHEN it was released vs optimal damage
5. EGP economic timeline: specific dated episodes from agent research
6. The Internet Blackout (Jan 28, 2011): minute-by-minute
7. Exit: clock-hand radial wipe

**Unique Interactive:**
- A ticking clock sound effect (subtle, 0.05 volume)
- The timeline has a "what if?" toggle: "What if this was released 2 weeks later?"
- Background: concentric SDF rings pulsing outward from center

---

### Layer 5: التطبيق الشرير — The Evil Application

**Duration:** 300vh (pinned with scrub)

**Particle Behavior:**
- Spiral from L4 morphs into a DNA DOUBLE HELIX
- Initially perfect — beautiful, scientific, orderly
- As user scrolls: the helix TWISTS, corrupts, breaks apart
- One strand turns toxic green, the other remains white (good science vs evil application)
- Mouse interaction: particles near cursor glow brighter but with a sickly green pulse

**DOM Content Sequence:**
1. "٥" hologram (toxic green, flickering/glitching)
2. "التطبيق الشرير" stagger reveal
3. The Dual-Use Gallery: 7 technologies shown with their good and evil applications side-by-side
4. Tuskegee timeline: 40-year betrayal, year by year
5. MKUltra: the 80+ institutions map (US map with glowing dots)
6. Egyptian section: Psychiatrist shortage as L5 failure, exploitative Ruqyah as L5 abuse
7. Counterfeit pharma: fake antibiotic pediatric deaths (2022)
8. Counters: "399 men (Tuskegee)", "80+ institutions (MKUltra)", "53.9% self-medicate (Egypt)"
9. Exit: DNA wave sinusoidal clip

**Unique Visual:**
- Background: Reaction-Diffusion pattern (Gray-Scott, slow organic spread, toxic green on black)
- Cards have a "corrupted" aesthetic: slight glitch effect on hover (CSS transform jitter)
- The dual-use gallery uses a draggable slider between "GOOD" and "EVIL" application

---

### Layer 6: مصفوفة التلاعب — The Matrix of Manipulation

**Duration:** 500vh (THE LONGEST — the deepest layer, the most content)**

**Particle Behavior:**
- DNA from L5 IMPLODES inward, then RE-FORMS as a BRAIN (fBm-folded sphere)
- The brain pulses with neural-firing patterns (random bright flashes along surface)
- Tendrils extend from the brain (like neural connections reaching out)
- Mouse interaction: cursor "plugs in" — touching the brain creates a neural cascade
- Color: deep magenta → fading into void black at the edges
- Post-processing: maximum bloom, heavy vignette

**DOM Content Sequence (5 sub-sections, each pinned):**

**Sub-section 6A: "The Targeting Mechanisms"** (100vh)
1. "٦" hologram (magenta, largest, with chromatic aberration)
2. "مصفوفة التلاعب" — the most dramatic reveal: each character appears then glitches
3. Definition: "The deepest layer. All others combine. The facts push you deeper."
4. Algorithm visualization: animated flow chart of how recommendation engines work
5. The 7-stage ISIS recruitment pipeline (animated step diagram)

**Sub-section 6B: "The Targets"** (100vh)
6. Horizontal scroll: 4 target demographic cards (Mothers, Young Men, Religiously Traumatized, Economically Desperate)
7. Each card has a "pipeline" visualization: entry point → escalation → capture → dependency
8. Egyptian-specific: WhatsApp family groups as L6 delivery vector

**Sub-section 6C: "The Egyptian Matrix"** (100vh)
9. The full WhatsApp epidemiology from agent research
10. Dr. Ahmed Okasha's fight against L6 stigma
11. COVID misinformation timeline as L6 case study
12. Arab Spring as L6 information ecosystem

**Sub-section 6D: "The BITE Model"** (100vh)
13. Full BITE Model interactive: Behavior, Information, Thought, Emotional Control
14. 4 quadrants, each expanding on click with examples
15. Connect to Egyptian examples (exploitative Ruqyah, economic despair cults)

**Sub-section 6E: "The Escape Problem"** (100vh)
16. "Why facts push you deeper" — Backfire Effect visualization
17. Cognitive Dissonance (Festinger) interactive demo
18. "What ACTUALLY works" — Motivational Interviewing, Street Epistemology
19. CTA: "Understanding is the first step"

**Unique Visual:**
- Background goes NEAR BLACK — `hsl(260, 100%, 1%)` (the void)
- Neural network firing animations (Canvas 2D lines connecting random dots)
- Case study cards appear to "emerge from the dark" — blur-to-focus reveal
- Text uses `mix-blend-mode: difference` over the 3D brain scene
- Everything feels heavier, darker, more oppressive as you scroll deeper

---

### Defense Section: "الدرع" — The Shield

**Duration:** 200vh

**Particle Behavior:**
- Brain from L6 slowly DISSOLVES
- Particles stream back into a PERFECT GOLDEN SPHERE
- The sphere glows warmly — pure, whole, unified
- Golden particles with additive blending creating white-hot center
- Mouse interaction: particles are attracted to cursor gently (hope/connection)

**DOM Content Sequence:**
1. "الدرع" (The Shield) — Amiri, gold, massive
2. "Now you see the architecture. Now you can defend."
3. Per-layer defense protocol table: 6 rows, 3 columns (Layer, Attack, Defense)
4. Egyptian resources: fact-checking organizations, mental health hotlines
5. CTA: "ابدأ رحلتك" (Start Your Journey) — magnetic button, golden glow
6. Share buttons: "Share this experience"

**Unique Visual:**
- Background transitions from void black to warm dark blue (`hsl(230, 30%, 8%)`)
- Gold light rays emanate from center (CSS conic-gradient animated)
- The CTA button has God Rays effect (volumetric light behind it)
- All text returns to warm white — visual relief after the darkness

---

## ADDITIONAL NEW COMPONENTS

### 16. Blur-to-Focus Reveal

#### [NEW] `src/components/six-layers/BlurReveal.tsx`
Content starts at `filter: blur(10px)` and sharpens to `blur(0px)` via GSAP ScrollTrigger scrub.

### 17. Variable Font Animation

Arabic headings use Cairo's weight range (300-900) animated via `font-variation-settings`:
- Weight morphs from 300 → 900 as it enters viewport
- Creates a "materializing" effect for Arabic typography

### 18. Staggered Grid Masonry for Case Studies

#### [NEW] `src/components/six-layers/CaseGrid.tsx`
- Masonry layout for case study overview sections
- GSAP stagger with `from: "edges"` — items cascade from edges to center
- Each card enters with `y: 80, autoAlpha: 0, scale: 0.95`

### 19. SVG Line Drawing for Connections

#### [NEW] `src/components/six-layers/ConnectionLine.tsx`
- SVG paths that "draw themselves" between related case studies
- `stroke-dasharray` + `stroke-dashoffset` animation
- Used in the Cross-Layer Matrix section

### 20. View Transitions API

For navigating between `/six-layers` and other pages:
```css
::view-transition-old(root) {
  animation: fade-out 0.3s ease-in;
}
::view-transition-new(root) {
  animation: fade-in 0.5s ease-out;
}
```

### 21. CSS @property Gradient Animation

Per-layer animated gradient borders on cards:
```css
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
.layer-card {
  border-image: conic-gradient(from var(--border-angle), var(--layer-accent), transparent 30%, var(--layer-accent)) 1;
  animation: border-spin 4s linear infinite;
}
```

### 22. content-visibility Optimization

All off-screen layer sections use:
```css
.layer-section:not(.active) {
  content-visibility: auto;
  contain-intrinsic-size: 0 100vh;
}
```

### 23. Accessibility Layer

| Feature | Implementation |
|---------|---------------|
| `prefers-reduced-motion` | Disable particles, use static gradients, disable sound |
| `aria-hidden` on Canvas | `<canvas aria-hidden="true">` |
| All text in DOM | SSR-rendered, not in WebGL |
| Skip to content | Hidden link bypasses 3D scene |
| Focus indicators | Custom `:focus-visible` with layer accent glow |
| Contrast | `mix-blend-mode: difference` ensures text readable over 3D |
| RTL support | All Arabic text `dir="rtl"` with proper Noto Naskh/Cairo rendering |

### 24. SEO Strategy

| Technique | Implementation |
|-----------|---------------|
| SSR text | All case study content server-rendered in DOM |
| JSON-LD | Structured data for educational content |
| `<noscript>` | Static HTML summary of all 6 layers |
| `<h1>` → `<h2>` | Proper heading hierarchy (one h1: "هندسة الخداع") |
| Meta description | "اكتشف ٦ طبقات الخداع المعلوماتي — من الكذب المطلق إلى مصفوفة التلاعب" |
| OG image | Generated screenshot of the hero with particle sphere |

### 25. Micro-Copy System

| Element | Text (Arabic) | Text (English) |
|---------|--------------|----------------|
| Loading | "جاري تهيئة النواة العصبية..." | "INITIALIZING NEURAL CORE..." |
| Error | "فُقد الاتصال — جاري إعادة الاتصال..." | "Signal Lost — Reconnecting..." |
| Scroll CTA | "انزل إلى العمق ↓" | "DESCEND INTO THE DEPTHS ↓" |
| Layer label format | "٠٠١ / الكذب المطلق" | "001 / THE ABSOLUTE FABRICATION" |
| Audio toggle | "🔊 تفعيل الصوت" | "🔊 ENABLE AUDIO" |
| Card expand | "تفاصيل →" | "DETAILS →" |
| Defense CTA | "ابدأ رحلتك" | "BEGIN YOUR JOURNEY" |
| Footer | "الأنظمة نشطة • القاهرة، مصر — 30.0444°N" | "SYSTEMS NOMINAL • CAIRO, EG — 30.0444°N" |
