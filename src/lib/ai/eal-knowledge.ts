/**
 * EAL Comprehensive Knowledge Base
 * 
 * This file contains all platform data that the chatbot needs to know.
 * It gets injected into AI system prompts for accurate platform-aware responses.
 */

export const EAL_KNOWLEDGE = `
=== EGYPTIAN AWARENESS LIBRARY (EAL) — COMPLETE KNOWLEDGE BASE ===

## IDENTITY & MISSION
The Egyptian Awareness Library (EAL) is the first integrated cognitive defense platform with 3 specialized awareness engines. It's an academic graduation project designed as an evidence-based digital intervention for Egyptian university students aged 18-30.

The platform's tagline: "Evidence-based platform for misinformation resilience, mental health literacy & positive religious coping. 42 exercises × 3 MVPs × 14 days."

Website URL: https://egyptian-awareness-library.vercel.app

## THE THREE ENGINES (MVPs)

### 1. DeepReal — Verification Engine (محرك التحقق)
- Purpose: Teaches users to verify claims and resist misinformation
- Core Question: "Should I believe, doubt, check, or reject this?"
- Methods: SIFT method (Stop, Investigate, Find, Trace), source credibility ranking, deepfake detection, bias identification
- Exercises: 14 exercises over 14 days
  - 5 Source credibility exercises
  - 5 Detection tasks
  - 4 Bias identification scenarios
- Assessment: MIST-20 (Misinformation Susceptibility Test)
- Key Features:
  - Bad News Game (inoculation-based game)
  - DeepReal Game Arena (interactive fact-checking challenges)
  - Source Credibility Ranker
  - 8-Gate Verification Protocol
  - Deepfake Detection Training

### 2. Mental Health — Understanding Engine (محرك الفهم)
- Purpose: Teaches mental health concepts safely, identifies appropriate support
- Core Question: "What is this, what is it not, what is the safest next step?"
- Methods: Affect labeling, stigma reduction, literacy & help-seeking pathways
- Exercises: 14 exercises over 14 days
  - 15 DSM/ICD-aligned term definitions
  - 5 Emotional awareness exercises
  - 4 Stigma reduction scenarios
- Assessment: MHLS (Mental Health Literacy Scale) + GHSQ (General Help-Seeking Questionnaire)
- CRITICAL BOUNDARY: Education only, NOT diagnosis or therapy
- Crisis Resources:
  - Egyptian Mental Health Hotline: 08008880700 (free, 24/7)
  - Befrienders Egypt: 0220816831
  - Ain Shams University Psychological Clinic

### 3. Religion Hub — Meaning Engine (محرك المعنى)
- Purpose: Uses religion as positive coping resource, avoids harmful guilt/bypassing/extremism
- Core Question: "How can religion support wellbeing safely, moderately, without harm?"
- Methods: Positive coping (Pargament, 2011), spiritual bypassing awareness (Masters, 2010), moderation frameworks
- Exercises: 14 exercises over 14 days
  - 7 Positive coping exercises
  - 4 Negative coping scenarios
  - Spiritual bypassing module
- Assessment: Brief RCOPE (Religious Coping Scale)
- Reference Sources: Al-Azhar, Dar al-Ifta guidance frameworks

## VALIDATED PSYCHOMETRIC INSTRUMENTS (6 Total)
1. MIST-20 — Misinformation Susceptibility Test (Maertens et al., 2023) — 20 items
2. MHLS — Mental Health Literacy Scale (O'Connor & Casey, 2015) — 35 items
3. Brief RCOPE — Religious Coping (Pargament et al., 2011) — 14 items
4. GHSQ — General Help-Seeking Questionnaire — 10 items
5. SUS — System Usability Scale — 10 items (post-test only)
6. MC-SDS — Marlowe-Crowne Social Desirability Scale — 13 items

## RESEARCH METHODOLOGY
- Design: Quasi-experimental pre/post with waitlist control
- Sample: N=84 Egyptian university students (age 18-30)
- Groups: Group A (n=42) = All 3 engines; Group B (n=42) = Waitlist control
- Duration: 14 days, 15 minutes/day
- Timeline:
  - Day 0: Baseline Battery (MIST-20, MHLS, Brief RCOPE, GHSQ, MC-SDS)
  - Days 1-14: Daily intervention (exercises across 3 engines)
  - Day 15: Post-test (MIST-20, MHLS, Brief RCOPE, GHSQ, SUS)
- Effect Size Target: d ≥ 0.5 (medium effect)
- Power: G*Power paired t-test, α=0.05, power=0.80

## 5 FALSIFIABLE HYPOTHESES
H1: MIST-20 post-test scores significantly higher than pre-test (p < 0.05)
H2: MHLS post-test scores significantly higher than pre-test (p < 0.05)
H3: Brief RCOPE+ increases, RCOPE− does not increase
H4: Cross-module users improve more than single-module users
H5: SUS usability score ≥ 68 (above average)

## SUCCESS CRITERIA
- Minimum: ≥10% MIST-20 improvement, MHLS d ≥ 0.3, RCOPE+ > RCOPE−
- Target: ≥15% MIST-20 improvement, MHLS d ≥ 0.5, SUS ≥ 68
- Stretch: ≥25% MIST-20 improvement, MHLS d ≥ 0.8, SUS ≥ 80

## THEORETICAL FOUNDATIONS (8 Theories)
1. Inoculation Theory (McGuire, 1964; Roozenbeek & van der Linden, 2019)
2. COM-B Model of Behavior Change (Michie et al., 2011)
3. Cognitive Load Theory (Sweller, 1988)
4. SIFT Method (Caulfield, 2019) — Stop, Investigate, Find, Trace
5. Affect Labeling Research (Lieberman et al., 2007)
6. Brief RCOPE Framework (Pargament et al., 2011)
7. Mental Health Literacy Framework (Jorm, 2000)
8. Stress-Vulnerability Model

## 4 ORIGINAL CONTRIBUTIONS
1. Three-Engine Integration — First platform combining misinformation + mental health + religion
2. Trust Calibration Construct — 5-construct system (TCE, AFS, AOI, ETS, CTCS)
3. Egyptian Context Localization — First Arabic-aware awareness library for Egyptian population
4. 17-Mode Intervention System — Multi-mode behavior change with exercises + micro-interventions

## PLATFORM FEATURES
- 42 Evidence-Based Exercises (14 per engine)
- 42 KeyHunter Entries (7-layer keyword intelligence per topic)
- 42 Guided Prompts (pre-built, evidence-safe prompts)
- 100+ Trusted Sources (scored with 7-criteria rubric)
- 8-Gate Verification Protocol (anti-acceptance training)
- 16 Premium Visual Themes (dark, light, and specialty modes)
- Full bilingual support (English + Arabic + Egyptian Arabic)
- AI Chatbot with 5 modes: General, Fact-Check, Translation, Academic, Mental Health
- Bad News Game (inoculation-based gamification)
- DeepReal Game Arena (interactive challenges)
- Dashboard with 14-day calendar
- Research Analytics Panel

## NAVIGATION STRUCTURE
- Home: / (landing page with 3 engine overview)
- Dashboard: /dashboard (daily progress, exercises, analytics)
- DeepReal: /deepreal (verification engine hub)
- Mental Health: /mental-health (understanding engine hub)
- Religion Hub: /religion-hub (meaning engine hub)
- Chatbot: /chatbot (AI assistant with 5 modes)
- Assessments: /assessment (pre/post psychometric tests)
- Baseline: /baseline (Day 0 trust calibration battery)
- Sources: /sources (100+ trusted sources registry)
- About: /about (mission, contributions, competitive analysis)
- Guide: /guide (user manual + research logic)
- Science Lab: /science (research analytics console)
- Reverse Engineering: /reverse (cognitive defense tactics)
- Fight Back: /fight-back (active defense strategies)
- Onboarding: /onboarding (6-step interactive tour)
- Bad News Game: /bad-news (inoculation game)
- Defense Q&A: /defense-qa (academic defense preparation)
- Philosophy: /philosophy (philosophical foundations)
- Evidence Library: /evidence (evidence base)
- Supervisor: /supervisor (admin panel)
- UX Science: /ux-science (interaction analytics)
- Prompt Lab: /prompt-lab (prompt engineering)

## 10 COGNITIVE DEFENSE LENSES
1. Urgency Detection — Recognizing artificial time pressure
2. Source Evaluation — Assessing credibility systematically
3. Emotional Awareness — Identifying emotional manipulation
4. Bias Recognition — Spotting cognitive biases
5. Evidence Comparison — Comparing claims to evidence
6. Authority Verification — Checking claims of authority
7. Cross-Reference — Multi-source verification
8. Pattern Detection — Recognizing manipulation patterns
9. Context Analysis — Understanding full context
10. Self-Reflection — Monitoring own biases

## TRUST CALIBRATION BATTERY (Day 0)
5 Constructs measured:
- TCE (Trust Calibration Error) — Gap between confidence and accuracy
- AFS (Acceptance Friction Score) — How easily user accepts claims
- AOI (Authority Override Index) — Deference to perceived authority
- ETS (Emotional Trigger Susceptibility) — Emotional content bias
- CTCS (Comfort-Truth Confusion Score) — Comfort ≠ accuracy confusion

## AI CHATBOT MODES
1. General AI (مساعد عام) — General platform questions, Egyptian Arabic support
2. Mental Health (الصحة النفسية) — Psychoeducation with crisis resources
3. Fact Check (تحقق من ادعاء) — Claim analysis with SIFT methodology
4. Academic (أكاديمي/أبحاث) — Research-grade answers with APA citations
5. Translation (ترجمة دقيقة) — Arabic↔English with Egyptian dialect support

## CULTURAL CONTEXT
- Designed for Egyptian university students
- Supports Egyptian Arabic (العامية المصرية) alongside Modern Standard Arabic
- Culturally sensitive to Egyptian family/community dynamics
- Respects Islamic context while promoting moderation
- Addresses mental health stigma in Egyptian society
- References Egyptian institutions: Ain Shams, Cairo University, Al-Azhar

## KEY DIFFERENTIATORS
- Only platform combining 3 domains (misinformation + mental health + religion)
- First Arabic-aware awareness library
- 42+ exercises with evidence validation
- Quasi-experimental research design with N=84
- Egyptian-specific localization
- Multi-provider AI engine (Gemini + Groq + GitHub + HuggingFace)
- 16 premium visual themes
- Complete bilingual RTL support
`;

/**
 * Condensed knowledge snippet for token-constrained prompts
 */
export const EAL_KNOWLEDGE_SHORT = `
EAL (Egyptian Awareness Library) is an evidence-based cognitive defense platform with 3 engines:
1. DeepReal — fact-checking, SIFT method, deepfake detection, source verification
2. Mental Health — psychoeducation, stigma reduction, NOT therapy (crisis: 08008880700)
3. Religion Hub — positive religious coping, moderation, anti-extremism

Key facts: 42 exercises × 14 days × N=84 pilot study × 6 psychometric instruments (MIST-20, MHLS, Brief RCOPE, GHSQ, SUS, MC-SDS) × 8 behavioral theories × Egyptian university students 18-30 × bilingual Arabic/English.

Pages: /dashboard, /deepreal, /mental-health, /religion-hub, /chatbot, /assessment, /baseline, /sources, /about, /guide, /science, /bad-news
`;
