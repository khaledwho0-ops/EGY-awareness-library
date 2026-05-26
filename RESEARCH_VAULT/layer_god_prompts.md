# PER-LAYER GOD PROMPTS — SHOW IT BUILD PHASE
## 6 Prompts for 6 Layers + Defense Section

---

# 🔴 LAYER 1 GOD PROMPT: الكذب المطلق — THE ABSOLUTE FABRICATION

## WHO YOU ARE
You are a senior creative developer building a section of an Awwwards-quality interactive scrollytelling web experience for the Egyptian Awareness Library (موثوق دوت كوم). You are building **LAYER 1** of the 6-Layer Architecture of Deception — the deepest, most visceral presentation of PURE FABRICATION.

## TECH STACK (NON-NEGOTIABLE)
- **Framework**: Next.js 16 (App Router) — the app already exists at `src/app/six-layers/`
- **3D**: React Three Fiber (R3F) + Three.js — `<Canvas>` is already mounted
- **Shaders**: Raw GLSL via `THREE.ShaderMaterial` and `THREE.RawShaderMaterial`
- **Scroll**: GSAP ScrollTrigger with `pin: true` and `scrub: true`
- **Smooth Scroll**: Lenis (already connected to ScrollTrigger)
- **UI Animation**: Framer Motion (for entry/exit) + GSAP (for scroll-linked)
- **Styling**: Tailwind CSS 4

## WHAT TO BUILD

### A. Particle System Behavior (GLSL)
The shared GPGPU particle system receives a `u_morphTarget` uniform (0 = Hero Sphere, 1 = Layer 1 shape).

**Layer 1 Shape: SHATTERED SPHERE**
```glsl
// In shapes.glsl — the Layer 1 shape function
vec3 getShattered(vec3 seed, float progress) {
    // Start as perfect Fibonacci sphere
    float golden_angle = 2.399963;
    float idx = seed.x * 65536.0;
    float theta = golden_angle * idx;
    float y = 1.0 - (seed.x) * 2.0;
    float radius_at_y = sqrt(1.0 - y * y);
    vec3 sphere = vec3(cos(theta) * radius_at_y, y, sin(theta) * radius_at_y) * 2.0;
    
    // Explosion: add noise-based displacement proportional to scroll progress
    float noise = snoise(sphere * 2.0 + seed * 10.0);
    vec3 explodeDir = normalize(sphere) * noise;
    vec3 shattered = sphere + explodeDir * progress * 3.0;
    
    // At full progress (1.0), particles are scattered 3 units from original position
    return shattered;
}
```

**Particle Behavior Timeline** (mapped to scroll progress 0.0 → 1.0):
- `0.0 – 0.2`: Perfect sphere (inherited from Hero), particles glow white
- `0.2 – 0.5`: Cracks appear — noise displacement increases linearly
- `0.5 – 0.7`: SHATTER — particles explode outward, curl noise adds swirling
- `0.7 – 0.9`: Fragments float in chaotic formation, some dying (life → 0)
- `0.9 – 1.0`: Remaining particles begin drifting toward Layer 2 torus shape

**Mouse Interaction**: Particles REPEL from cursor (inverse square law, force = -2.0 / (dist² + 0.1)). Lies flee from scrutiny.

**Color**: `vec3 color = mix(vec3(1.0), vec3(0.9, 0.15, 0.15), progress);` — white → crimson red

**Bloom**: Increase bloom strength from 0.5 → 1.2 as layer progresses

### B. DOM Content (React + GSAP ScrollTrigger)

**Section Structure**: 300vh total, pinned at 100vh

Create the component `LayerOneSection.tsx`:

```
<section id="layer-1" className="relative min-h-[300vh]">
  {/* Pinned content container */}
  <div ref={pinnedRef} className="sticky top-0 h-screen flex items-center">
    
    {/* LEFT: 3D scene (already rendered by Scene.tsx behind this DOM) */}
    
    {/* RIGHT: Content column */}
    <div className="ml-auto w-[45vw] pr-[5vw] relative z-10">
      
      {/* Phase 1: Layer Number + Name (scroll 0-15%) */}
      <div ref={titleRef}>
        <span className="layer-number">١</span>  {/* Amiri, 200px, Fresnel-glow red */}
        <h2 className="layer-name-ar">الكذب المطلق</h2>  {/* Amiri, clamp(3rem, 6vw, 5rem) */}
        <h3 className="layer-name-en">THE ABSOLUTE FABRICATION</h3>  {/* Clash Display, 0.3em tracking */}
      </div>
      
      {/* Phase 2: Definition (scroll 15-30%) */}
      <p ref={defRef} className="layer-definition">
        Raw, unfiltered deception. No source, no reality. Generated out of thin air 
        by a known liar, hostile state, or AI. Preys on confirmation bias.
      </p>
      {/* Arabic definition below English */}
      <p className="layer-definition-ar" dir="rtl">
        خداع صريح بدون مصدر ولا واقع. يُصنع من العدم بواسطة كاذب معروف أو دولة معادية أو ذكاء اصطناعي.
      </p>
      
      {/* Phase 3: Damage Counters (scroll 30-45%) */}
      <div ref={countersRef} className="counters-grid">
        <Counter target={183} suffix="+" label="حالة تزوير علمي" labelEn="Scientific frauds" />
        <Counter target={10000} suffix="+" label="ورقة مسحوبة" labelEn="Retracted papers" />
        <Counter target={14.5} suffix="%" label="نسبة الأخبار الكاذبة بمصر" labelEn="Egypt misinfo rate" />
      </div>
      
      {/* Phase 4: Case Study Cards (scroll 45-85%) — Horizontal scroll strip */}
      <HorizontalScroll ref={casesRef}>
        <CaseCard id={1} title="Piltdown Man" titleAr="إنسان بلتداون" year={1912} domain="علمي" damage="41 years of fake science" />
        <CaseCard id={2} title="Wakefield MMR" titleAr="لقاح التوحد المزيف" year={1998} domain="طبي" damage="Measles outbreaks worldwide" />
        <CaseCard id={6} title="Protocols of Zion" titleAr="بروتوكولات حكماء صهيون" year={1903} domain="سياسي" damage="Fuel for the Holocaust" />
        <CaseCard id={7} title="Electronic Flies" titleAr="الذباب الإلكتروني" year={2011} domain="مصري" damage="Manufactured consensus" />
        <CaseCard id={9} title="Fabricated Hadith" titleAr="الأحاديث الموضوعة" year="centuries" domain="ديني" damage="Corrupted Islamic scholarship" />
        <CaseCard id={40} title="Antibiotic OTC Crisis" titleAr="كارثة المضادات الحيوية" year={2021} domain="مصري/طبي" damage="53.9% self-medicate" />
        <CaseCard id={42} title="TikTok Health Hakeems" titleAr="حكيم التيكتوك" year={2024} domain="مصري" damage="82M internet users exposed" />
        <CaseCard id={48} title="Egypt Found a Cure" titleAr="مصر اكتشفت العلاج" year={2020} domain="مصري/كوفيد" damage="Eroded all trust" />
        <CaseCard id={55} title="Fake Antibiotic Deaths" titleAr="وفيات أطفال بأدوية مغشوشة" year={2022} domain="مصري/دوائي" damage="Children died" />
        <CaseCard id={60} title="HoggPool Crypto Scam" titleAr="هوج بول - نصب العملات" year={2023} domain="مصري/اقتصادي" damage="$620K stolen" />
        <CaseCard id={10} title="AI Legal Hallucinations" titleAr="هلوسة الذكاء الاصطناعي" year={2023} domain="تقني" damage="Fake citations in courts" />
        <CaseCard id={11} title="Deepfake Election Audio" titleAr="تزييف صوتي انتخابي" year={2024} domain="سياسي/ذكاء" damage="Election interference" />
      </HorizontalScroll>
      
      {/* Phase 5: Egyptian Connection Callout (scroll 85-95%) */}
      <div ref={egyptRef} className="glass-panel glass-red">
        <h4>🇪🇬 الاتصال المصري</h4>
        <p>In Egypt, Layer 1 fabrication kills children (fake antibiotics, 2022), 
        steals savings (HoggPool), and fills the medical vacuum with TikTok charlatans 
        who claim doctorates they never earned — while real doctors are silenced.</p>
      </div>
    </div>
  </div>
</section>
```

### C. GSAP Animation Timeline
```javascript
// Inside LayerOneSection.tsx useEffect with gsap.context()
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#layer-1",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    pin: pinnedRef.current,
  }
});

// Phase 1: Title reveal (0% - 15%)
tl.from(titleRef.current.querySelectorAll('.layer-number, .layer-name-ar, .layer-name-en'), {
  y: 80, autoAlpha: 0, stagger: 0.1, duration: 0.15, ease: "expo.out"
}, 0);

// Phase 2: Definition (15% - 30%)
tl.from(defRef.current, {
  y: 40, autoAlpha: 0, duration: 0.15, ease: "expo.out"
}, 0.15);

// Phase 3: Counters (30% - 45%)
tl.from(countersRef.current.children, {
  y: 60, autoAlpha: 0, stagger: 0.05, duration: 0.15, ease: "expo.out"
}, 0.30);
// Counter number animation triggers via IntersectionObserver

// Phase 4: Horizontal case study scroll (45% - 85%)
tl.to(casesRef.current, {
  x: () => -(casesRef.current.scrollWidth - window.innerWidth * 0.45),
  duration: 0.40, ease: "none"
}, 0.45);

// Phase 5: Egyptian callout (85% - 95%)
tl.from(egyptRef.current, {
  y: 60, autoAlpha: 0, filter: "blur(10px)", duration: 0.10, ease: "expo.out"
}, 0.85);

// Phase 6: Exit (95% - 100%) — fade out for transition
tl.to(pinnedRef.current, {
  autoAlpha: 0, duration: 0.05
}, 0.95);
```

### D. Visual Effects

1. **Background**: Animated Voronoi crack pattern
   - Create a full-screen `<canvas>` behind the content
   - Draw Voronoi cells with red (#ff3333) edges on black
   - Edges pulse (opacity oscillates with `sin(time * 2.0)`)
   - OR use a GLSL fragment shader for the background

2. **Card Stamps**: Each case study card has a "❌ FABRICATED" watermark
   - CSS `::after` pseudo-element, rotated 15°, red text, opacity 0.08
   - On hover, stamp flashes to opacity 0.3

3. **Scan-line effect on AI cards**: Cards tagged "AI" get:
   ```css
   .ai-card::before {
     background: repeating-linear-gradient(
       0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px
     );
     animation: scanline 3s linear infinite;
   }
   ```

### E. Layer Transition: L1 → L2
- **Mask type**: Circular wipe from center expanding outward
- `clip-path: circle(0% at 50% 50%)` → `circle(150% at 50% 50%)`
- Duration: 800ms, ease: power3.inOut
- As circle expands, L2 amber color bleeds through

### F. Sound
- Ambient: Static noise + distorted radio frequencies, looping
- Volume: 0.15, crossfade from Hero's warm pad
- UI: glass-tap sound on card hover

### G. Styling Colors (CSS Custom Properties)
```css
[data-layer="1"] {
  --layer-accent: hsl(0, 90%, 55%);
  --layer-accent-rgb: 230, 57, 57;
  --layer-bg: hsl(0, 30%, 5%);
  --glass-tint: rgba(255, 50, 50, 0.05);
}
```

---

# 🟡 LAYER 2 GOD PROMPT: العدسة المنحازة — THE BIASED LENS

## CONTEXT
You are building Layer 2 of the same experience. Layer 1 is already built. The scroll continues seamlessly.

## PARTICLE SHAPE: TORUS / PRISM
```glsl
vec3 getPrism(vec3 seed) {
    float theta = seed.x * 6.28318;
    float phi = seed.y * 6.28318;
    float R = 2.0; // Major radius
    float r = 0.6; // Minor radius — slightly fatter than standard torus
    // Add axis distortion to make it feel like a lens, not a donut
    float distort = sin(theta * 3.0) * 0.15;
    return vec3(
        (R + (r + distort) * cos(phi)) * cos(theta),
        (r + distort) * sin(phi),
        (R + (r + distort) * cos(phi)) * sin(theta)
    );
}
```

**Particle Behavior**:
- Shattered fragments from L1 REASSEMBLE into torus
- The torus has a "slit" — particles stream through and change color
- White particles enter one side → amber/gold exit the other (the bias filter visual)
- Mouse creates "lens flare" — particles near cursor get extra brightness
- Chromatic aberration on particles nearest camera

**Color**: `mix(vec3(1.0), vec3(1.0, 0.8, 0.0), progress)` — white → amber gold

## DOM CONTENT

**Case Studies for Layer 2** (12 cards):
| # | Title | Arabic | Year | Domain | Key Damage |
|---|-------|--------|------|--------|------------|
| 1 | Tobacco Industry Playbook | استراتيجية التبغ | 1950s-90s | علمي | "Doubt is our product" |
| 2 | Sugar Industry Bribery | رشوة صناعة السكر | 1967 | علمي | Blamed fat for sugar's damage |
| 3 | Al Jazeera vs Al Arabiya | الجزيرة ضد العربية | 2003+ | إعلامي | Same event, two realities |
| 4 | Fossil Fuel Denial | إنكار الوقود الأحفوري | 1977+ | علمي | $3.6B lobbying |
| 5 | Pharma Publication Bias | تحيز النشر الدوائي | ongoing | طبي | 50% of trials hidden |
| 6 | Social Media Algorithm Bias | تحيز الخوارزميات | 2016+ | تقني | False news 6× faster |
| 41 | "7aga Sa7'na" Culture | ثقافة الحاجة السخنة | ongoing | مصري/طبي | Delays real treatment |
| 50 | WhatsApp Herbal COVID | بروتوكولات واتساب العشبية | 2020 | مصري/كوفيد | Steam burns, delayed care |
| 52 | Battle of Camel Framing | موقعة الجمل - التأطير | 2011 | مصري/سياسي | "Concerned citizens" vs "thugs" |
| 54 | June 30 Crowd-Size War | حرب أعداد ٣٠ يونيو | 2013 | مصري/سياسي | Numbers = political weapon |
| 57 | EGP Float Misinfo | تعويم الجنيه - التضليل | 2024 | مصري/اقتصادي | Panic preceded reality |
| 58 | Ras El-Hekma Dual Narratives | رأس الحكمة - روايتان | 2024 | مصري/اقتصادي | Both sides omit truth |

**Unique Interactive**: Side-by-side comparison layout
- "What They Show" (left column, sharp, well-lit) vs "What They Hide" (right column, blurred, darkened)
- User scrolls → the hidden column gradually de-blurs, revealing what was omitted
- CSS: `filter: blur(8px)` → `blur(0px)` via GSAP scrub

**Counters**: `$3.6B` (lobbying spend), `50%` (hidden trials), `6×` (faster misinfo spread)

**Background**: Barrel-distortion shader — everything subtly warped at edges

**Transition L2→L3**: Diagonal wipe (light through prism)
- `clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%)` → `polygon(0 0, 100% 0, 100% 100%, 0 100%)`

**Colors**:
```css
[data-layer="2"] {
  --layer-accent: hsl(40, 100%, 55%);
  --layer-bg: hsl(30, 20%, 5%);
  --glass-tint: rgba(255, 200, 0, 0.05);
}
```

---

# 🟣 LAYER 3 GOD PROMPT: اقتطاع السياق — DECONTEXTUALIZATION

## PARTICLE SHAPE: PUZZLE WITH GAPS
```glsl
vec3 getPuzzle(vec3 seed, float progress) {
    // Start as ordered grid
    vec3 grid = vec3(
        (seed.x - 0.5) * 4.0,
        (seed.y - 0.5) * 4.0,
        (seed.z - 0.5) * 0.5
    );
    // Remove chunks: particles in certain grid cells vanish
    float cellX = floor(seed.x * 8.0);
    float cellY = floor(seed.y * 8.0);
    float hash = fract(sin(cellX * 127.1 + cellY * 311.7) * 43758.5453);
    // If hash < progress * 0.4, this cell is "missing context"
    float alive = step(progress * 0.4, hash);
    return grid * alive; // Particles at (0,0,0) will be hidden by life=0
}
```

**Behavior**: Grid forms, chunks vanish. Mouse hovering FILLS gaps temporarily.

**DOM CONTENT** — THE CENTERPIECE: Quran 2:191 Interactive

Build an interactive component `ContextRevealer.tsx`:
- Show the verse STRIPPED: "...and kill them wherever you find them..."
- Highlighted in red, isolated, scary
- User drags a "CONTEXT SLIDER" left → right
- At full right: surrounding verses (2:190, 2:191, 2:192, 2:193) appear
- The full passage reveals it's about DEFENSIVE warfare with rules of engagement
- Colors shift from red (alarming) to purple (neutral/scholarly)
- Arabic text in Amiri, English translation below in Inter

**Case Studies**: Quran 2:191, VAERS misuse, Howard Dean Scream, In-Vitro sensationalism, Schizophrenia-as-Jinn, Tawfik Okasha

**Counters**: `6×` (faster spread of decontextualized content)

**Background**: CSS grid with cells dissolving and reappearing

**Colors**:
```css
[data-layer="3"] {
  --layer-accent: hsl(270, 90%, 60%);
  --layer-bg: hsl(270, 30%, 4%);
  --glass-tint: rgba(120, 50, 255, 0.05);
}
```

**Transition L3→L4**: Puzzle-piece dissolve (grid of 64 divs, stagger opacity to 0)

---

# 🔵 LAYER 4 GOD PROMPT: التوقيت المسلّح — WEAPONIZED TIMING

## PARTICLE SHAPE: LOGARITHMIC SPIRAL
```glsl
vec3 getSpiral(vec3 seed, float time) {
    float angle = seed.x * 6.28318 * 5.0;
    float radius = pow(seed.y, 0.6) * 3.5;
    float spiral = angle + log(radius + 1.0) * 2.0;
    vec3 pos = vec3(
        cos(spiral + time * 0.3) * radius,
        (seed.z - 0.5) * 0.3,
        sin(spiral + time * 0.3) * radius
    );
    // Pulse waves from center every 3 seconds
    float pulse = smoothstep(0.0, 0.3, fract(time * 0.33) - (radius / 3.5));
    pos *= 1.0 + pulse * 0.15;
    return pos;
}
```

**Behavior**: Spiral pulses from center outward (clock ticking). Mouse CLICK creates explosion ring.

**DOM CONTENT** — Interactive TIMELINE:
Build `WeaponizedTimeline.tsx`:
- Horizontal timeline spanning 1964 → 2024
- Events plotted as nodes with date labels:
  - 1964: Gulf of Tonkin
  - 2003: Iraqi WMDs
  - 2005: Danish Cartoons (published months before outrage was organized)
  - 2016: Comey Letter (Oct 28, 11 days before election)
  - 2016: WikiLeaks DNC (timed for convention)
  - 2011: Egypt Internet Blackout (Jan 28, peak protests)
  - 2024: EGP Float (preceded by weeks of panic rumors)
- Each node: click → expand card with "TIMING WINDOW" showing when released vs when damage was maximum
- A "What if?" toggle on each: "What if this was released 2 weeks later?" — shows reduced impact

**Counters**: `38%` (EGP devaluation), `11 days` (Comey timing), `5 days` (Egypt blackout)

**Sound**: Ticking clock, subtle (volume 0.05)

**Background**: Concentric SDF rings pulsing from center (GLSL)

**Colors**:
```css
[data-layer="4"] {
  --layer-accent: hsl(200, 100%, 55%);
  --layer-bg: hsl(210, 40%, 3%);
  --glass-tint: rgba(0, 150, 255, 0.05);
}
```

**Transition L4→L5**: Clock-hand radial wipe (`conic-gradient` mask animating from 0deg → 360deg)

---

# 🟢 LAYER 5 GOD PROMPT: التطبيق الشرير — THE EVIL APPLICATION

## PARTICLE SHAPE: DNA DOUBLE HELIX → CORRUPTED
```glsl
vec3 getDNA(vec3 seed, float progress) {
    float t = seed.x * 20.0;
    float r = 1.0;
    vec3 strand1 = vec3(r * cos(t), t * 0.3 - 3.0, r * sin(t));
    vec3 strand2 = vec3(r * cos(t + 3.14159), t * 0.3 - 3.0, r * sin(t + 3.14159));
    vec3 pos = mix(strand1, strand2, step(0.5, seed.y));
    
    // Corruption: twist and break as progress increases
    float corruption = progress * sin(t * 0.5 + progress * 5.0) * 0.8;
    pos.x += corruption;
    pos.z += corruption * 0.5;
    
    return pos;
}
```

**Behavior**: Beautiful helix → TWISTS and corrupts. One strand turns toxic green, other stays white.

**DOM CONTENT**:

**Dual-Use Gallery** `DualUseSlider.tsx`:
- 7 technologies, each with a draggable slider between "GOOD ✓" and "EVIL ✗"
- Nuclear fission: Energy → Weapons
- Genetics: Medicine → Eugenics
- Psychology: Therapy → MKUltra
- Data science: Personalization → Cambridge Analytica
- Surveillance: Security → Oppression
- Medicine: Healing → Tuskegee
- Religion: Comfort → Exploitation

**Case Studies**: Eugenics, Tuskegee (399 men, 40 years), MKUltra (80+ institutions), Unit 731, Cambridge Analytica, Psychiatrist shortage (Egypt), Exploitative Ruqyah, Counterfeit pharma deaths

**Counters**: `399` (Tuskegee victims), `80+` (MKUltra institutions), `53.9%` (Egypt self-medication), `1.44` (psychiatrists per 100K in Egypt)

**Background**: Reaction-Diffusion (Gray-Scott) in toxic green on black — slow organic spread

**Cards**: "Corrupted" hover effect — CSS `transform: translate(random, random)` jitter for 100ms

**Colors**:
```css
[data-layer="5"] {
  --layer-accent: hsl(140, 100%, 50%);
  --layer-bg: hsl(150, 30%, 3%);
  --glass-tint: rgba(0, 255, 80, 0.05);
}
```

**Transition L5→L6**: DNA wave sinusoidal clip (`clip-path: path()` animated)

---

# ⚫ LAYER 6 COMPLEX MULTI-LAYERED GOD PROMPT: مصفوفة التلاعب — THE MATRIX OF MANIPULATION

> [!CAUTION]
> THIS IS THE DEEPEST, MOST COMPLEX LAYER. It has 5 SUB-SECTIONS, each its own pinned scrolling experience. Total: 500vh. This is where all other layers CONVERGE. The visual design must feel oppressive, heavy, inescapable — then release into hope at the Defense section.

## PARTICLE SHAPE: BRAIN (fBm-folded sphere)
```glsl
vec3 getBrain(vec3 seed) {
    float theta = seed.x * 6.28318;
    float phi = acos(2.0 * seed.y - 1.0);
    // fBm surface folding — creates sulci and gyri (brain wrinkles)
    float fbm = sin(theta * 8.0) * sin(phi * 6.0) * 0.15
               + sin(theta * 16.0) * sin(phi * 12.0) * 0.07
               + sin(theta * 32.0) * sin(phi * 24.0) * 0.03;
    float r = 1.8 + fbm;
    vec3 pos = vec3(
        r * sin(phi) * cos(theta),
        r * cos(phi),
        r * sin(phi) * sin(theta)
    );
    return pos;
}
```

**Brain Behavior**:
- DNA from L5 IMPLODES inward → reforms as brain
- Brain PULSES with neural firing: random bright flashes along surface (like synapses)
- Tendrils extend from brain surface (particles at edges drift outward on curl noise)
- Mouse "plugs in" — touching the brain creates a cascade of neural firings (wave of brightness radiating from touch point)
- Post-processing: MAXIMUM bloom (strength 2.0), heavy vignette
- Color: deep magenta `hsl(300, 100%, 50%)` → fading into void black at edges

**Background**: Near-black `hsl(260, 100%, 1%)` — THE VOID

## SUB-SECTION 6A: "آليات الاستهداف" — THE TARGETING MECHANISMS (100vh)

Build `TargetingMechanisms.tsx`:

1. **The Layer 6 Reveal**: Most dramatic text reveal in the entire experience
   - "٦" hologram: LARGEST (300px+), magenta glow, chromatic aberration
   - "مصفوفة التلاعب" — each Arabic character appears THEN GLITCHES (random transform offset for 100ms before settling)
   - Definition: "الطبقة الأعمق. كل الطبقات تتحد. الحقائق نفسها تدفعك أعمق."
   - "The deepest layer. All others combine. The facts push you deeper."

2. **Algorithm Visualization**: `AlgorithmFlow.tsx`
   - Animated SVG flowchart:
   ```
   [User watches video] → [Algorithm notes engagement] → [Recommends similar] → 
   [User watches more] → [Algorithm escalates] → [Content gets more extreme] → 
   [User is radicalized] → [Algorithm has succeeded]
   ```
   - Each node lights up sequentially with stagger animation
   - Arrows are SVG line-drawing (stroke-dasharray animation)

3. **ISIS 7-Stage Pipeline**: `RecruitmentPipeline.tsx`
   - 7 stages as connected nodes:
     1. DISCOVERY (social media browsing)
     2. CURIOSITY (first "alternative" content)
     3. ENGAGEMENT (commenting, sharing)
     4. COMMUNITY (invited to private group)
     5. IDENTITY (given new sense of purpose)
     6. COMMITMENT (asked to do something)
     7. ACTION (radicalized)
   - Each stage expands on hover with Egyptian-specific examples
   - Line connecting them pulses magenta

## SUB-SECTION 6B: "الأهداف" — THE TARGETS (100vh)

Build `TargetDemographics.tsx`:

Horizontal scroll with 4 target demographic cards:

**Card 1: الأمهات — MOTHERS**
- Entry: "Worried about your baby's vaccine?"
- Escalation: Natural parenting → anti-vax → wellness conspiracy
- Egyptian: WhatsApp family group is the delivery vector
- Stat: COVID vaccine hesitancy 20.2% refusal in Egypt

**Card 2: الشباب — YOUNG MEN**
- Entry: "Want to be stronger, richer, more confident?"
- Escalation: Self-improvement → red pill → manosphere → extremism
- Egyptian: Youth unemployment + "no future" narrative
- Stat: 60% of Egypt is under 30

**Card 3: المتألمين روحياً — RELIGIOUSLY TRAUMATIZED**
- Entry: "Your sheikh betrayed you? Here's the REAL Islam..."
- Escalation: Mainstream → disillusionment → radical group → cult
- Egyptian: Exploitative Ruqyah as entry point
- Stat: 78.4% OCD patients attribute symptoms to jinn

**Card 4: المحطمين اقتصادياً — ECONOMICALLY DESPERATE**
- Entry: "The system is rigged. Here's how to really make money..."
- Escalation: Financial advice → crypto schemes → full conspiracy
- Egyptian: EGP crisis, HoggPool victims
- Stat: 38% overnight devaluation (March 2024)

Each card: glassmorphism, magenta accent, pipeline visualization inside

## SUB-SECTION 6C: "المصفوفة المصرية" — THE EGYPTIAN MATRIX (100vh)

Build `EgyptianMatrix.tsx`:

The convergence of ALL Egyptian cases into Layer 6 analysis:

1. **WhatsApp Epidemiology Map**: Visualization of how a single fabricated voice note spreads through a family network
   - Animated network graph: nodes = family members, edges = message forwards
   - Start: 1 node sends → branches exponentially
   - Shows "Aunty Factor" — older female relatives as primary vectors

2. **Dr. Ahmed Okasha Panel**: Hero card
   - Photo placeholder, name in Amiri, his fight against stigma
   - "300+ papers, WPA President, still fighting Layer 6 stigma"
   - The paradox: Al-Azhar agrees with psychiatry but can't compete with TikTok

3. **COVID as L6**: The full matrix visualization
   - Layer 1 (fake cure) + Layer 2 (state propaganda) + Layer 4 (timing) = Layer 6 matrix
   - Visual: 3 streams converging into one overwhelming wave

4. **Arab Spring as L6**: Same platform → liberation AND oppression
   - The Khaled Said page → enabled revolution
   - The same Facebook → enabled industrial disinformation (MERIP 2019)
   - "The techno-utopian myth was falsified"

## SUB-SECTION 6D: "نموذج BITE" — THE BITE MODEL (100vh)

Build `BITEModel.tsx`:

Interactive 4-quadrant visualization (Steven Hassan's BITE Model):

```
┌─────────────────┬─────────────────┐
│   B              │   I              │
│   BEHAVIOR       │   INFORMATION    │
│   CONTROL        │   CONTROL        │
│                  │                  │
│   • Sleep dep    │   • Only "our"   │
│   • Diet rules   │     sources      │
│   • Isolation    │   • Loaded lang  │
│   • Reporting    │   • Thought-     │
│     on others    │     stopping     │
├─────────────────┼─────────────────┤
│   T              │   E              │
│   THOUGHT        │   EMOTIONAL      │
│   CONTROL        │   CONTROL        │
│                  │                  │
│   • Black/white  │   • Fear/guilt   │
│     thinking     │   • Love-bombing │
│   • Us vs them   │   • Phobias of   │
│   • Stop signs   │     leaving      │
│     for doubt    │   • Shunning     │
└─────────────────┴─────────────────┘
```

- Click each quadrant → expands with EGYPTIAN EXAMPLES:
  - B: Exploitative Ruqyah (sleep deprivation, isolation during "treatment")
  - I: Only listen to "our sheikh" (reject psychiatry)
  - T: "Either jinn or you're crazy" (false binary)
  - E: "If you leave treatment, the jinn will return" (phobia of leaving)

## SUB-SECTION 6E: "مشكلة الهروب" — THE ESCAPE PROBLEM (100vh)

Build `EscapeProblem.tsx`:

1. **Backfire Effect Demo**: Interactive
   - Show a false claim
   - Show a correction with evidence
   - Show a visualization of belief STRENGTHENING (not weakening)
   - "This is why Layer 6 is the deepest — facts push victims deeper"
   - Note: recent research challenges the backfire effect — include this nuance

2. **Cognitive Dissonance** (Festinger):
   - Three connected facts that contradict each other
   - User tries to hold all three → the UI literally shakes/vibrates
   - "The mind resolves dissonance by rejecting the newest fact"

3. **What ACTUALLY Works**:
   - Motivational Interviewing: ask questions, don't lecture
   - Street Epistemology: examine HOW they know, not WHAT they know
   - Pre-bunking: inoculate BEFORE exposure
   - CTA: "Understanding is the first step to defense"

## LAYER 6 → DEFENSE TRANSITION
- **Mask**: Neural tendrils creeping BACKWARD (SVG path draw in reverse)
- **Color**: Magenta → fade to warm gold
- **Particles**: Brain dissolves → reforms as golden sphere
- **Sound**: Sub-bass fades → warm strings enter
- **Text**: "You've reached the bottom. Now rise."

## DEFENSE SECTION: "الدرع" — THE SHIELD (200vh)

Build `DefenseSection.tsx`:

1. **Hero moment**: "الدرع" in Amiri, gold, clamp(4rem, 10vw, 8rem)
2. **Subtitle**: "الآن ترى الهندسة. الآن يمكنك الدفاع."
3. **Defense Protocol Table**: 6 rows

| Layer | Attack | Defense |
|-------|--------|---------|
| ١ | Complete fabrication | SIFT: Stop, Investigate, Find, Trace |
| ٢ | Biased lens | Ask: "What are they NOT showing?" |
| ٣ | Stripped context | Always read the FULL source |
| ٤ | Weaponized timing | Ask: "Why NOW? Who benefits from this timing?" |
| ٥ | Evil application | Demand ethical oversight of knowledge use |
| ٦ | The matrix | Build diverse information networks; ask HOW, not WHAT |

4. **Egyptian Resources Panel**: 
   - Fatabyyano (فتبينوا), Matsada'sh (متصدقش), Saheeh Masr (صحيح مصر)
   - Mental health hotline: 08008880700
   - Al-Azhar fatwa line

5. **CTA**: Magnetic button, golden glow, "ابدأ رحلتك" → links to platform homepage
6. **Share buttons**: "شارك هذه التجربة"

**Particle**: Golden sphere, warm glow, additive blending → white-hot center
**Background**: Void → warm dark blue `hsl(230, 30%, 8%)`
**Sound**: Uplifting strings, warmth returns, volume 0.15

---

> [!IMPORTANT]
> ## BUILD ORDER
> 1. Build the shared infrastructure first (Scene, ParticleSystem, ScrollContext, Lenis, GSAP context)
> 2. Build Layer 1 (simplest interaction, proves the pipeline works)
> 3. Build Layers 2-5 (each adds one new technique)
> 4. Build Layer 6 LAST (most complex, 5 sub-sections)
> 5. Build Defense Section
> 6. Polish: transitions, sound, cursor, performance optimization

> [!CAUTION]
> ## PERFORMANCE RULES
> - ZERO `useState` in render loops — useRef + mutation only
> - Pre-allocate ALL vectors outside render loop
> - Dispose ALL Three.js objects on unmount
> - `content-visibility: auto` on off-screen sections
> - Mobile: 16K particles, no bloom, CSS-only backgrounds
> - `prefers-reduced-motion`: static gradients, no particles, no sound
