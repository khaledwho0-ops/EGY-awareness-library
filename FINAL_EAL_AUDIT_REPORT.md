# 🛡️ EAL: Complete Project Details & Technical Documentation

> **Egyptian Awareness Library — Cognitive Defense System**  
> **Live URL:** https://egyptian-awareness-library.vercel.app  
> **Status:** Production-ready, deployed on Vercel Edge Network

---

## 📋 Project Identity

| Field | Value |
|-------|-------|
| **Full Name** | Egyptian Awareness Library (EAL) |
| **Type** | Digital Behavioral Intervention Platform |
| **Target** | Egyptian university students (18–25) |
| **Sample Size** | N=84 (quasi-experimental pre-post design) |
| **Duration** | 14-day structured intervention |
| **Languages** | Arabic (RTL) + English |
| **Deployment** | Vercel Edge Network (global CDN) |
| **Framework** | Next.js 16 + React 19 + TypeScript |

---

## 🧬 The 3 MVPs (Minimum Viable Products)

### MVP 1: DeepReal Engine
- **Purpose:** Combat financial and political misinformation
- **Method:** Active Inoculation (Prebunking)
- **Theory:** Inoculation Theory (McGuire, 1964; Roozenbeek & van der Linden, 2019)
- **Exercises:** 14 daily exercises (source verification, bias detection, claim analysis)
- **Measurement:** MIST-20 (Misinformation Susceptibility Test)
- **Real-world anchor:** Hoggpool scam (Egypt, 2023), FBC scam (Egypt, 2024)

### MVP 2: Mental Health Hub
- **Purpose:** Reduce mental health stigma and improve psychological awareness
- **Method:** Psychoeducation + guided reflection exercises
- **Theory:** COM-B Model (Michie et al., 2011)
- **Exercises:** 14 daily exercises (stigma reduction, emotional regulation, help-seeking)
- **Measurement:** MHLS (Mental Health Literacy Scale)
- **Real-world anchor:** WHO data — 1 in 4 Egyptians will experience mental health issues

### MVP 3: Religion Hub
- **Purpose:** Counter religious exploitation and extremist recruitment
- **Method:** Critical thinking about religious claims + coping assessment
- **Theory:** Brief RCOPE (Pargament et al., 2011)
- **Exercises:** 14 daily exercises (positive coping, threat identification, boundary setting)
- **Measurement:** Brief RCOPE scale (positive vs negative religious coping)
- **Safety:** Academic perspective only. No fatwas. Disclaimer on every page.

---

## 📊 The Numbers (Hard Data)

| Metric | Value | Source |
|--------|-------|--------|
| Global disinformation economic cost | $78B/year | World Economic Forum, 2024 |
| Egyptian youth internet penetration | 89% | CAPMAS / ITU, 2024 |
| Prebunking effectiveness | 21% reduction in susceptibility | Cambridge University, 2019 |
| Echo chamber rate (global) | 8% trapped in filter bubbles | Reuters Institute, 2024 |
| Gen Z source transparency demand | 80% reject unsourced info | Edelman Trust Barometer |
| Exercises in the platform | 42 (14 days × 3 MVPs) | Platform data |
| API endpoints | 27 | Platform data |
| Color themes | 16 | Platform data |
| Total routes | 55 | Build output |

---

## 🔬 The 8 Behavioral Theories Applied

| # | Theory | Where Applied | Citation |
|---|--------|---------------|----------|
| 1 | **Inoculation Theory** | DeepReal prebunking exercises | McGuire (1964); Roozenbeek & van der Linden (2019) |
| 2 | **COM-B Model** | All 42 exercises tagged with C/O/M | Michie et al., Implementation Science (2011) |
| 3 | **SIFT Method** | DeepReal verification flow | Caulfield, University of Washington (2019) |
| 4 | **Cognitive Load Theory** | Negative UX in Fight-Back module | Sweller, Ed. Psychology Review (1988) |
| 5 | **Self-Determination Theory** | Gamification (XP, streaks, autonomy) | Deci & Ryan, Psychological Inquiry (2000) |
| 6 | **Brief RCOPE** | Religion Hub coping assessment | Pargament et al., J. Clinical Psych (2011) |
| 7 | **MIST-20** | Pre/post misinformation susceptibility | Maertens et al., Behavior Research Methods (2023) |
| 8 | **Elaboration Likelihood Model** | AI Debate Arena processing routes | Petty & Cacioppo (1986) |

---

## 🏗️ Tech Stack & Why

| Technology | Why Chosen |
|-----------|-----------|
| **Next.js 16** | SSR for <200ms load + SEO for academic discoverability |
| **React 19** | Component isolation for independent MVP testing |
| **TypeScript** | Type-safety prevents psychometric data corruption |
| **CSS Custom Properties** | 16 dynamic themes for Negative UX experiments |
| **Vercel Edge Network** | Global CDN — works from Cairo to Cambridge |
| **localStorage** | Zero-server architecture for pilot (no backend needed) |
| **RTL Provider** | Full Arabic support with dynamic direction switching |
| **i18n System** | Every UI string is bilingual (Arabic/English) |

---

## 🗺️ Complete Page Map (All 55 Routes)

### Core Pages
| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Entry point, project overview, guided journey |
| Welcome/Anatomy | `/welcome` | Complete project data & scientific breakdown |
| Dashboard | `/dashboard` | User/Admin analytics & progress tracking |
| Onboarding | `/onboarding` | New user introduction flow |

### MVP Pages
| Page | URL | Purpose |
|------|-----|---------|
| DeepReal Hub | `/deepreal` | Misinformation verification center |
| DeepReal Exercise | `/deepreal/exercise/[day]` | 14 daily inoculation exercises |
| DeepReal Game | `/deepreal/game` | Interactive verification game |
| Mental Health Hub | `/mental-health` | Stigma reduction center |
| Mental Health Exercise | `/mental-health/exercise/[day]` | 14 daily mental health exercises |
| Religion Hub | `/religion-hub` | Religious coping center |
| Religion Hub Exercise | `/religion-hub/exercise/[day]` | 14 daily religious coping exercises |

### Assessment & Defense
| Page | URL | Purpose |
|------|-----|---------|
| Baseline | `/baseline` | Pre-intervention MIST-20/MHLS testing |
| Assessment | `/assessment` | Post-intervention measurement |
| Fight Back | `/fight-back` | Cognitive resilience training |

### Science & Transparency
| Page | URL | Purpose |
|------|-----|---------|
| Science Hub | `/science` | Research methodology & standards |
| Sources | `/sources` | Trusted source database |
| Evidence | `/evidence` | Claims linked to evidence |
| Philosophy | `/philosophy` | Project rationale & ethics |
| UX Science | `/ux-science` | UX research methodology |
| Reverse Mode | `/reverse` | How manipulation is constructed |
| Guide | `/guide` | User manual |
| Prompt Lab | `/prompt-lab` | AI prompt testing |
| Supervisor | `/supervisor` | Admin oversight panel |
| Presentation | `/presentation` | Built-in presentation mode |

### API Endpoints (27 total)
- `/api/search/*` — Fact-checking: ClaimBuster, MediaWiki, NCBI, OpenAlex, Semantic Scholar
- `/api/science/*` — Evidence, briefing, game, journey, operations, protocol, report, workflow
- `/api/islamic/*` — Quran, Hadith, Semantic search
- `/api/forensic/*` — Image, Video, Audio, Metadata, C2PA, Health
- `/api/nlp/*` — Arabic NLP, Sentiment analysis

---

## 🔐 User Roles

| Role | Access | Credentials |
|------|--------|-------------|
| **Guest** | Browse, take exercises, see personal progress | Click "Login as Guest" |
| **User** | Full exercises, personal dashboard, baseline tests | Register with email |
| **Admin** | All data, N=84 aggregate, CSV export, supervisor panel | admin@eal.edu.eg / EAL2026! |

---

## 📐 Research Design

```
┌─────────────┐    ┌──────────────────┐    ┌──────────────┐
│  BASELINE   │───>│  14-DAY PROGRAM  │───>│  POST-TEST   │
│  MIST-20    │    │  42 exercises    │    │  MIST-20     │
│  MHLS       │    │  3 MVPs daily    │    │  MHLS        │
│  Brief RCOPE│    │  Gamification    │    │  Brief RCOPE │
└─────────────┘    └──────────────────┘    └──────────────┘
     Pre-test          Intervention           Post-test
                    
     Compare scores: Δ = Post - Pre
     Statistical test: Paired t-test or ANOVA
     Expected effect: ≥15% improvement
```

---

## 🏆 What Makes EAL Unique (The "No One Did That" List)

1. **No one combined all 3 domains** — misinformation + mental health + religion in one platform
2. **No one used MIST-20 in an Egyptian context** — we're the first to apply this psychometric in Arabic
3. **No one built an Autopilot** — our platform can demonstrate itself with one button press
4. **No one applied Negative UX scientifically** — we deliberately stress users to build cognitive resilience
5. **No one tagged every exercise with COM-B** — 42 exercises, each with documented behavioral targets
6. **No one cited every claim** — every statistic on our platform has a hover citation
7. **No one built 16 themes for psychological experiments** — each theme triggers different cognitive processing
8. **No one made it fully bilingual Arabic/English with RTL** — instant language switching, zero reload
