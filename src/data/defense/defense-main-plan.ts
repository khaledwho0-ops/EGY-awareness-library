import type {
  BrutalHonesty,
  DemoSegment,
  DoctorAttack,
  DoNotShowItem,
  PowerfulPage,
  RecoveryLine,
  ScenarioCard,
  StressTest,
} from "@/types/defense";

export const EXECUTIVE_LOCK = {
  projectName: "Egyptian Awareness Library (EAL)",
  status: "Defense-ready with honest risks",
  strategy: "Do not show the whole project. Show only the strongest working engines.",
  identity:
    "A 14-day cognitive defense intervention for Egyptian university students targeting misinformation, mental health stigma, and religious manipulation.",
};

export const POWERFUL_PAGES: PowerfulPage[] = [
  {
    id: "deepreal",
    title: "Live Verification Engine",
    route: "/deepreal/exercise/1",
    demoStatus: "Must show live",
    input: "WHO says black seed cures cancer",
    expectedOutput: "0.50 CFS, local-heuristic",
    warning:
      "Arabic local scoring is partial; Arabic UI/RTL works. Use Arabic as local context, but use the English claim for the reliable live scoring proof.",
    proof: [
      "Live verification page tied to real verification routes.",
      "ClaimBuster local fallback exists.",
      "Veracity local fallback exists.",
      "The live-safe proof input already passed with score 0.50 and classification CFS.",
      "This page proves processing, not only presentation.",
    ],
    evidence: {
      pageFile: "src/app/deepreal/exercise/[day]/page.tsx",
      mainComponent: "components/exercises/exercise-engine.tsx",
      supportingComponent: "components/exercises/verification-console.tsx",
      apiRoutes: [
        "/api/search/claimbuster",
        "/api/search/veracity",
        "/api/search/factcheck",
        "/api/islamic/quran",
        "/api/islamic/hadith",
        "/api/islamic/semantic",
      ],
      localLogic: [
        "ClaimBuster local fallback",
        "Veracity local fallback",
        "NLP sentiment route is local",
        "14 DeepReal JSON exercises",
        "42 exercises across 3 hubs",
      ],
      dataFiles: ["src/data/exercises/deepreal/day-01.json and 13 more DeepReal exercise JSON files"],
      storage: ["N/A - not needed"],
      envVariables: ["N/A - no secret needs to be shown on this page"],
      packages: ["N/A - not needed"],
      liveEvidence: [
        "Input used live: WHO says black seed cures cancer",
        "Route used live: POST /api/search/claimbuster",
        "Result: score 0.50",
        "Classification: CFS",
        "Source: local-heuristic",
      ],
    },
    doctorAttackAnswered: ["This is just UI", "APIs are fake", "Show me processing"],
    risk: "Strong page, but do not use Arabic local scoring as the main proof.",
  },
  {
    id: "bad-news",
    title: "Bad News Game / Inoculation Engine",
    route: "/bad-news",
    demoStatus: "Must show live",
    expectedOutput: "Followers and credibility change, scenarios progress, badge/counter movement appears.",
    proof: [
      "useReducer state machine",
      "4 phases: INTRO -> PLAYING -> BADGE_UNLOCK -> GAME_OVER",
      "5 action types",
      "487KB scenario bank",
      "Badges and local progress persistence",
      "Zero API dependency",
      "Zero backend dependency",
      "Offline-safe",
      "Live result: followers reached 74",
    ],
    evidence: {
      pageFile: "src/app/bad-news/page.tsx",
      mainComponent: "src/features/badnews/components/BadNewsGame.tsx",
      supportingComponent: "gameReducer state machine",
      apiRoutes: ["N/A - zero API dependency"],
      localLogic: [
        "4 phases",
        "5 action types",
        "Badges unlock",
        "Followers and credibility counters change from local state",
      ],
      dataFiles: [
        "src/features/badnews/data/scenarios.ts",
        "src/features/badnews/data/badges.ts",
      ],
      storage: ["localStorage key: badnews_progress"],
      envVariables: ["N/A - not needed"],
      packages: ["N/A - not needed"],
      liveEvidence: [
        "Name entered",
        "Game started",
        "Multiple choices made",
        "Followers reached 74",
        "Credibility bar visible",
        "Zero API calls",
        "Demo safety: 10/10",
      ],
    },
    doctorAttackAnswered: ["What works if the internet is down?", "Where is the engineering?", "This is just a game"],
    risk: "Lowest live risk in the whole project.",
  },
  {
    id: "baseline",
    title: "Trust Calibration Battery",
    route: "/baseline",
    demoStatus: "Must show live",
    expectedOutput:
      "Classification buttons, confidence slider, claim progression, local measurement logic.",
    proof: [
      "trust-battery.ts is 639 lines",
      "Calculates TCE, ETS, and CTCS",
      "Uses trilingual claims",
      "localStorage persistence",
      "Zero API dependency",
      "Zero backend dependency",
      "Live classification worked",
    ],
    evidence: {
      pageFile: "src/app/baseline/page.tsx",
      mainComponent: "N/A - not separately verified",
      supportingComponent: "src/lib/scoring/trust-calibration.ts",
      apiRoutes: ["N/A - zero API dependency"],
      localLogic: [
        "TCE = Trust Calibration Error",
        "ETS = Emotion Trigger Susceptibility",
        "CTCS = Comfort-Truth Confusion Score",
      ],
      dataFiles: ["src/data/baseline/trust-battery.ts"],
      storage: ["localStorage key: eal-trust-calibration"],
      envVariables: ["N/A - not needed"],
      packages: ["N/A - not needed"],
      liveEvidence: [
        "Claim classification worked",
        "Confidence slider visible",
        "Classification buttons visible",
        "Next claim progression confirmed",
        "Demo safety: 9/10",
      ],
    },
    doctorAttackAnswered: ["How do you measure impact?", "This is only a form", "What makes this different from a normal awareness website?"],
    risk: "Very safe, but explain the measurement logic fast.",
  },
  {
    id: "supervisor",
    title: "Supervisor Dashboard / Research Export",
    route: "/supervisor",
    demoStatus: "Show if time",
    expectedOutput:
      "Participant count 1, intervention activity 4 correction entries, matched pre/post table, Recharts bar chart, export tab.",
    warning:
      "Do not say database. Say localStorage snapshots plus .runtime/assessments export pipeline.",
    proof: [
      "Reads participant snapshots and assessment files",
      "Uses Recharts",
      "Export tab is visible",
      "No credentials visible on page",
      "Hydration warning exists but is cosmetic only",
    ],
    evidence: {
      pageFile: "src/app/supervisor/page.tsx",
      mainComponent: "components/admin/supervisor-dashboard.tsx",
      supportingComponent: "api/assessment/export/route.ts",
      apiRoutes: ["/api/assessment/export"],
      localLogic: [
        "Reads participant snapshots and assessment files",
        "Dashboard data comes from user interactions and the assessment export pipeline",
      ],
      dataFiles: ["N/A - runtime assessment files are read at runtime"],
      storage: ["localStorage participant snapshots", ".runtime/assessments export"],
      envVariables: ["N/A - not needed"],
      packages: ["Recharts"],
      liveEvidence: [
        "Participant count showed 1",
        "Intervention activity showed 4 correction entries",
        "Matched pre/post table visible",
        "Recharts bar chart rendered",
        "Export tab visible",
        "No passwords exposed",
      ],
    },
    doctorAttackAnswered: ["Where is the dashboard data from?", "Can you export anything useful?", "Where is the database?"],
    risk: "Useful proof page, but not the first page to open.",
  },
  {
    id: "rtl",
    title: "Local Egypt UX Proof",
    route: "NOT VERIFIED",
    demoStatus: "Show if time",
    expectedOutput: "Arabic display works, RTL/LTR switch works, dir changes, Arabic font swap appears.",
    warning:
      "Arabic UI works; the weak point is Arabic local ClaimBuster heuristic scoring, not Arabic display or RTL.",
    proof: [
      "supports en, ar, ar-EG",
      "sets dir attribute",
      "swaps font to Noto Kufi Arabic",
      "stores language in localStorage",
      "RTL/LTR switch passed live",
    ],
    evidence: {
      pageFile: "src/components/shared/rtl-provider.tsx",
      mainComponent: "src/components/shared/rtl-provider.tsx",
      supportingComponent: "N/A - not needed",
      apiRoutes: ["N/A - not needed"],
      localLogic: ["Language state controls dir attribute and Arabic font swap"],
      dataFiles: ["N/A - not needed"],
      storage: ["localStorage key: eal-language"],
      envVariables: ["N/A - not needed"],
      packages: ["N/A - not needed"],
      liveEvidence: [
        "RTL/LTR switch passed live",
        "Arabic display works",
        "Arabic local ClaimBuster heuristic scoring is the weak point, not Arabic UI",
      ],
    },
    doctorAttackAnswered: ["So Arabic does not work?", "How do you handle RTL/LTR?", "Why does local Egyptian relevance matter here?"],
    risk: "Safe UX proof, but do not confuse UI strength with Arabic heuristic scoring strength.",
  },
  {
    id: "themes",
    title: "Dynamic Theme System",
    route: "NOT VERIFIED",
    demoStatus: "Backup demo",
    expectedOutput: "Theme changes instantly; Terracotta Sunset is visible.",
    proof: [
      "16 dynamic themes",
      "data-theme / CSS variable system",
      "Terracotta Sunset confirmed live",
    ],
    evidence: {
      pageFile: "src/app/globals.css",
      mainComponent: "src/components/shared/theme-provider.tsx",
      supportingComponent: "N/A - not needed",
      apiRoutes: ["N/A - not needed"],
      localLogic: ["Theme switching uses data-theme and CSS variables"],
      dataFiles: ["N/A - not needed"],
      storage: ["NOT VERIFIED"],
      envVariables: ["N/A - not needed"],
      packages: ["next-themes"],
      liveEvidence: ["Theme switching passed live", "Terracotta Sunset confirmed live"],
    },
    doctorAttackAnswered: ["Why are you showing colors?", "Is this one of the core engines?", "Does this deserve time in a 5-minute defense?"],
    risk: "Show for 10 seconds max, or skip.",
    timeLimit: "10 seconds max",
  },
];

export const STRESS_TESTS: StressTest[] = [
  {
    id: 1,
    name: "Arabic health misinformation",
    category: "Verification",
    routeOrApi: "POST /api/search/claimbuster",
    inputAction: "Input: منظمة الصحة العالمية أعلنت إن حبة البركة بتعالج كل أنواع السرطان",
    actualResult:
      "Partial result: score 0.15, classification NFS, source local-heuristic. Reason: local heuristic is English-optimized and does not parse Arabic morphology strongly.",
    status: "PARTIAL",
    defenseLine:
      "Arabic UI/RTL works, but local ClaimBuster fallback scoring is English-optimized unless external API is active.",
  },
  {
    id: 2,
    name: "English health misinformation",
    category: "Verification",
    routeOrApi: "POST /api/search/claimbuster",
    inputAction: "Input: WHO says black seed cures cancer",
    actualResult:
      "Passed with score 0.50, classification CFS, source local-heuristic; detected WHO authority + cures causal language + cancer health topic.",
    status: "PASS",
    defenseLine: "Use this as the live-safe verification proof.",
  },
  {
    id: 3,
    name: "Bad News offline game",
    category: "Inoculation",
    routeOrApi: "/bad-news",
    inputAction: "Enter a name and make multiple choices.",
    actualResult: "Passed. Followers reached 74, credibility bar visible, zero API calls.",
    status: "PASS",
    defenseLine: "This is the safest offline-safe proof page.",
  },
  {
    id: 4,
    name: "Baseline psychometric measurement",
    category: "Measurement",
    routeOrApi: "/baseline",
    inputAction: "Classify one claim and move to the next.",
    actualResult: "Passed. Classification worked, confidence slider visible, next claim progression confirmed.",
    status: "PASS",
    defenseLine: "This proves measurement, not only content display.",
  },
  {
    id: 5,
    name: "Supervisor dashboard",
    category: "Research export",
    routeOrApi: "/supervisor",
    inputAction: "Open dashboard and inspect visible counts and chart.",
    actualResult:
      "Passed. Participant count 1, intervention activity 4 correction entries, matched pre/post table visible, Recharts bar chart rendered, export tab visible.",
    status: "PASS",
    defenseLine: "Use this only after the core engines are proven.",
  },
  {
    id: 6,
    name: "Missing API key fallback",
    category: "Resilience",
    routeOrApi: "Fallback routes",
    inputAction: "Run a missing-key case on fallback-safe flows.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "Fallbacks are part of the demo strategy, not an excuse after failure.",
  },
  {
    id: 7,
    name: "Backend down fallback",
    category: "Resilience",
    routeOrApi: "Fallback routes",
    inputAction: "Run a backend-down case on fallback-safe flows.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "Pilot-ready means honest recovery, not pretending nothing can fail.",
  },
  {
    id: 8,
    name: "Internet-down Bad News",
    category: "Resilience",
    routeOrApi: "/bad-news",
    inputAction: "Run the game with internet down.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "Offline-safe proof survives network loss.",
  },
  {
    id: 9,
    name: "Reverse image search",
    category: "Verification",
    routeOrApi: "/api/search/reverse-image",
    inputAction: "Reverse image test flow.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "Do not over-demo it if the core pages already proved the system.",
  },
  {
    id: 10,
    name: "Hadith / religion search",
    category: "Religion hub",
    routeOrApi: "/api/islamic/hadith",
    inputAction: "Run hadith search flow.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "This supports religious misinformation handling without turning the app into a fatwa engine.",
  },
  {
    id: 11,
    name: "Empty input",
    category: "Validation",
    routeOrApi: "Input validation flows",
    inputAction: "Submit empty input.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "The demo already covers edge-case handling, not only happy paths.",
  },
  {
    id: 12,
    name: "Long input",
    category: "Validation",
    routeOrApi: "Input validation flows",
    inputAction: "Submit long input.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "Stress tests included oversized user input.",
  },
  {
    id: 13,
    name: "Nonsense input",
    category: "Validation",
    routeOrApi: "Input validation flows",
    inputAction: "Submit nonsense input.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "The system was tested against junk input, not only clean text.",
  },
  {
    id: 14,
    name: "Refresh mid-game",
    category: "Persistence",
    routeOrApi: "/bad-news",
    inputAction: "Refresh during gameplay.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "localStorage persistence was live-tested.",
  },
  {
    id: 15,
    name: "RTL/LTR switch",
    category: "Local UX",
    routeOrApi: "Language UI",
    inputAction: "Switch direction and language.",
    actualResult: "Passed.",
    status: "PASS",
    defenseLine: "Arabic UI works; do not confuse that with Arabic heuristic scoring strength.",
  },
  {
    id: 16,
    name: "Impossible 60-second proof challenge",
    category: "Defense strategy",
    routeOrApi: "/deepreal/exercise/1 -> /bad-news -> /baseline",
    inputAction: "Run only the strongest engines inside one minute each.",
    actualResult: "Prepared.",
    status: "PREPARED",
    defenseLine: "The doctor does not need all 35 routes. Only the strongest engines matter.",
  },
];

export const DOCTOR_ATTACKS: DoctorAttack[] = [
  {
    id: 1,
    doctorSays: "This is just UI.",
    testing: "Whether there is real logic behind the interface.",
    bestAnswer:
      "Open /deepreal/exercise/1 or /baseline. Both pages prove processing and scoring, not decoration.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["VerificationConsole", "POST /api/search/claimbuster", "0.50 CFS local-heuristic"],
    whatNotToSay: ["It looks modern", "The design is strong"],
  },
  {
    id: 2,
    doctorSays: "Show me something working now.",
    testing: "Whether the demo depends on explanation instead of proof.",
    bestAnswer: "Open /bad-news first if speed matters, or /deepreal/exercise/1 if you want live verification proof.",
    pageToOpen: "/bad-news",
    evidenceToMention: ["Zero API dependency", "Followers reached 74", "Offline-safe"],
    whatNotToSay: ["Imagine this working", "I can explain it instead"],
  },
  {
    id: 3,
    doctorSays: "Where is the backend?",
    testing: "Whether the project has route logic and system depth.",
    bestAnswer:
      "The project has 34 total API routes and 28 connected demo-relevant routes, but I only show the fallback-safe ones live.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["34 total API routes", "28 connected/demo-relevant routes", "ClaimBuster and Veracity fallbacks"],
    whatNotToSay: ["Everything is serverless magic"],
  },
  {
    id: 4,
    doctorSays: "Where is the database?",
    testing: "Whether you understand your actual storage model.",
    bestAnswer:
      "This pilot does not claim a traditional database. The verified pilot storage is localStorage/sessionStorage plus assessment export files.",
    pageToOpen: "/supervisor",
    evidenceToMention: ["localStorage participant snapshots", ".runtime/assessments export", "Export tab visible"],
    whatNotToSay: ["Redis powers it", "We have a full database layer"],
  },
  {
    id: 5,
    doctorSays: "localStorage is not professional.",
    testing: "Whether you can distinguish pilot scope from production claims.",
    bestAnswer:
      "Correct. That is why the honest framing is pilot-ready, not production-ready.",
    pageToOpen: "/baseline",
    evidenceToMention: ["localStorage eal-trust-calibration", "pilot-ready, not production-ready"],
    whatNotToSay: ["It is production-grade auth"],
  },
  {
    id: 6,
    doctorSays: "Your APIs are fake.",
    testing: "Whether you can prove real route usage or fallback behavior.",
    bestAnswer:
      "The safe proof is /deepreal/exercise/1 because it calls real routes and still has local fallback. The live result was 0.50 CFS from local-heuristic.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["POST /api/search/claimbuster", "local fallback", "0.50 CFS"],
    whatNotToSay: ["Trust me, they are real"],
  },
  {
    id: 7,
    doctorSays: "What if API keys are missing?",
    testing: "Failure resilience.",
    bestAnswer:
      "That stress test already passed. Missing API key fallback is part of the verified test set.",
    pageToOpen: "/bad-news",
    evidenceToMention: ["Missing API key fallback passed", "Bad News is zero API", "Baseline is zero API"],
    whatNotToSay: ["That never happens"],
  },
  {
    id: 8,
    doctorSays: "What if the internet is down?",
    testing: "Offline survivability.",
    bestAnswer:
      "Bad News and Baseline still work because they have zero API and zero backend dependency, and internet-down Bad News already passed.",
    pageToOpen: "/bad-news",
    evidenceToMention: ["Internet-down Bad News passed", "offline-safe", "zero API dependency"],
    whatNotToSay: ["Everything works offline"],
  },
  {
    id: 9,
    doctorSays: "Why is the Arabic claim scoring weak?",
    testing: "Whether you hide known weaknesses.",
    bestAnswer:
      "Because the verified local heuristic is English-optimized and does not parse Arabic morphology strongly. I do not hide that.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["Arabic partial test", "0.15 NFS local-heuristic", "English-optimized local heuristic"],
    whatNotToSay: ["Arabic scoring is perfect"],
  },
  {
    id: 10,
    doctorSays: "So Arabic does not work?",
    testing: "Whether you distinguish Arabic UI from Arabic heuristic strength.",
    bestAnswer:
      "Arabic UI and RTL work live. The weak point is Arabic local ClaimBuster heuristic scoring, not Arabic display.",
    pageToOpen: "NOT VERIFIED",
    evidenceToMention: ["rtl-provider.tsx", "en/ar/ar-EG", "dir attribute", "Noto Kufi Arabic"],
    whatNotToSay: ["Arabic is broken"],
  },
  {
    id: 11,
    doctorSays: "This project is too broad.",
    testing: "Whether you can collapse the scope into a clear system.",
    bestAnswer:
      "One vulnerability, three lenses, one measurement system. I only demo one page from each working engine.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["verification", "game-based inoculation", "psychometric measurement", "research export"],
    whatNotToSay: ["It has many features"],
  },
  {
    id: 12,
    doctorSays: "What is the main idea in one sentence?",
    testing: "Clarity under pressure.",
    bestAnswer:
      "Egyptian Awareness Library is a 14-day cognitive defense intervention for Egyptian university students targeting misinformation, mental health stigma, and religious manipulation.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["Executive Lock identity line"],
    whatNotToSay: ["It is just a library"],
  },
  {
    id: 13,
    doctorSays: "Why games in a serious awareness project?",
    testing: "Whether gamification has purpose.",
    bestAnswer:
      "Bad News is not decoration. It is the inoculation engine, and it is the safest offline-safe proof page in the project.",
    pageToOpen: "/bad-news",
    evidenceToMention: ["useReducer state machine", "4 phases", "5 action types", "offline-safe"],
    whatNotToSay: ["It is for fun"],
  },
  {
    id: 14,
    doctorSays: "Why mental health and religion together?",
    testing: "Whether the scope has a coherent local rationale.",
    bestAnswer:
      "The system targets three high-risk local influence channels together: misinformation, mental health stigma, and religious manipulation.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["14-day intervention identity", "three lenses framing"],
    whatNotToSay: ["We added them because they are interesting"],
  },
  {
    id: 15,
    doctorSays: "How does this solve a local Egyptian problem?",
    testing: "Local relevance.",
    bestAnswer:
      "The project is built for Egyptian university students and includes Arabic UI/RTL support, Egyptian context, and religion-sensitive verification routes.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["Arabic context claim", "en/ar/ar-EG support", "/api/islamic/hadith", "/api/islamic/semantic"],
    whatNotToSay: ["It works anywhere so locality does not matter"],
  },
  {
    id: 16,
    doctorSays: "Give me one real user scenario.",
    testing: "Whether the system can be narrated as a concrete flow.",
    bestAnswer:
      "An Egyptian student receives a viral WhatsApp health claim, opens /deepreal/exercise/1, verifies it, sees the classification, and learns to check before sharing.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["WHO says black seed cures cancer", "0.50 CFS", "local fallback"],
    whatNotToSay: ["Imagine a generic user somewhere"],
  },
  {
    id: 17,
    doctorSays: "How do you measure impact?",
    testing: "Measurement depth.",
    bestAnswer:
      "The Baseline battery computes TCE, ETS, and CTCS through local scoring logic and trilingual claims.",
    pageToOpen: "/baseline",
    evidenceToMention: ["TCE", "ETS", "CTCS", "trust-battery.ts 639 lines"],
    whatNotToSay: ["Users feel better"],
  },
  {
    id: 18,
    doctorSays: "Where is dashboard data from?",
    testing: "Source of research output.",
    bestAnswer:
      "From participant snapshots and assessment files surfaced through the supervisor dashboard and export route.",
    pageToOpen: "/supervisor",
    evidenceToMention: ["participant snapshots", "assessment files", "/api/assessment/export"],
    whatNotToSay: ["From the database"],
  },
  {
    id: 19,
    doctorSays: "What is the scientific basis?",
    testing: "Whether claims exceed verified evidence.",
    bestAnswer:
      "The verified live proof on this command center is intervention structure plus measurement logic. Named theory mapping beyond that is NOT VERIFIED in the locked facts for this page.",
    pageToOpen: "/baseline",
    evidenceToMention: ["14-day intervention", "TCE/ETS/CTCS", "measurement proof"],
    whatNotToSay: ["We proved every theory live"],
  },
  {
    id: 20,
    doctorSays: "Is the game copied?",
    testing: "Originality pressure.",
    bestAnswer:
      "What is verified here is the implemented local game engine in this source tree. Any originality claim beyond that is NOT VERIFIED on this page.",
    pageToOpen: "/bad-news",
    evidenceToMention: ["src/features/badnews/components/BadNewsGame.tsx", "gameReducer", "local scenario data"],
    whatNotToSay: ["It is completely original in every dimension"],
  },
  {
    id: 21,
    doctorSays: "How do you handle Arabic?",
    testing: "Arabic system detail.",
    bestAnswer:
      "At the UI layer through en/ar/ar-EG, dir switching, Noto Kufi Arabic, and language persistence. At the local ClaimBuster heuristic level, Arabic is the weak point.",
    pageToOpen: "NOT VERIFIED",
    evidenceToMention: ["rtl-provider.tsx", "eal-language", "Arabic heuristic weakness note"],
    whatNotToSay: ["Arabic is solved end to end"],
  },
  {
    id: 22,
    doctorSays: "How do you handle RTL/LTR?",
    testing: "Layout reliability.",
    bestAnswer:
      "The RTL provider sets the dir attribute and the switch already passed live.",
    pageToOpen: "NOT VERIFIED",
    evidenceToMention: ["rtl-provider.tsx", "dir attribute", "RTL/LTR switch passed live"],
    whatNotToSay: ["It is only CSS magic"],
  },
  {
    id: 23,
    doctorSays: "How do you handle fake images?",
    testing: "Image verification capability.",
    bestAnswer:
      "The verified live-safe proof is reverse image search passed. I do not over-demo forensics unless Docker/FastAPI is running and tested.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["Reverse image search passed", "Do not show forensics live unless tested"],
    whatNotToSay: ["Forensics always works live"],
  },
  {
    id: 24,
    doctorSays: "How do you handle fake claims?",
    testing: "Claim verification mechanism.",
    bestAnswer:
      "Through the verification console routes and local fallbacks, with the live-safe proof on ClaimBuster using the English health claim.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["VerificationConsole", "/api/search/claimbuster", "0.50 CFS"],
    whatNotToSay: ["AI detects fake news automatically"],
  },
  {
    id: 25,
    doctorSays: "How do you handle religious misinformation?",
    testing: "Religion-hub credibility.",
    bestAnswer:
      "The verified routes include /api/islamic/hadith and /api/islamic/semantic, and hadith search already passed in live testing.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["/api/islamic/hadith", "/api/islamic/semantic", "Hadith search passed"],
    whatNotToSay: ["The app issues fatwas"],
  },
  {
    id: 26,
    doctorSays: "How do you handle mental health stigma?",
    testing: "Whether the project only talks about misinformation.",
    bestAnswer:
      "The project identity explicitly includes mental health stigma, and the measurement system proves it is not just a content page cluster.",
    pageToOpen: "/baseline",
    evidenceToMention: ["14-day intervention identity", "Baseline measurement proof"],
    whatNotToSay: ["We solve mental health treatment"],
  },
  {
    id: 27,
    doctorSays: "How do you export results?",
    testing: "Research workflow completeness.",
    bestAnswer:
      "Through the supervisor dashboard export pipeline and /api/assessment/export. Export tab visibility is verified live.",
    pageToOpen: "/supervisor",
    evidenceToMention: ["Export tab visible", "/api/assessment/export", ".runtime/assessments export"],
    whatNotToSay: ["CSV export is fully verified"],
  },
  {
    id: 28,
    doctorSays: "What if the user writes nonsense?",
    testing: "Validation under bad input.",
    bestAnswer:
      "That stress test already passed. Nonsense input is in the verified test set.",
    pageToOpen: "/deepreal/exercise/1",
    evidenceToMention: ["Nonsense input passed", "Empty input passed", "Long input passed"],
    whatNotToSay: ["Users never do that"],
  },
  {
    id: 29,
    doctorSays: "What if the user uploads unsupported media?",
    testing: "Edge-case honesty.",
    bestAnswer:
      "NOT VERIFIED in the locked facts for this command center. I would not use unsupported-media upload as a live defense proof.",
    pageToOpen: "/bad-news",
    evidenceToMention: ["Do not overreach beyond the verified facts"],
    whatNotToSay: ["We fully handle every media type"],
  },
  {
    id: 30,
    doctorSays: "What makes this better than a normal library website?",
    testing: "Core differentiation.",
    bestAnswer:
      "A normal library website lists content. This system proves verification, game-based inoculation, psychometric measurement, and research export through selected working pages.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["selected pages prove different engines", "one vulnerability, three lenses, one measurement system"],
    whatNotToSay: ["It has many pages"],
  },
  {
    id: 31,
    doctorSays: "Why should this get a high grade?",
    testing: "Whether the case is evidence-based instead of emotional.",
    bestAnswer:
      "Because the selected pages prove different engines under live pressure, and the project is framed honestly as pilot-ready, not production-ready.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["DeepReal live proof", "Bad News offline-safe proof", "Baseline measurement proof"],
    whatNotToSay: ["Because we worked hard"],
  },
  {
    id: 32,
    doctorSays: "You have 20 seconds. Convince me.",
    testing: "Compression under pressure.",
    bestAnswer:
      "This is not a normal awareness website. It proves verification, inoculation, measurement, and export through four selected engines.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["final 20-second emergency script"],
    whatNotToSay: ["Let me explain everything from the start"],
  },
  {
    id: 33,
    doctorSays: "Why should I trust your stress tests?",
    testing: "Credibility of verification claims.",
    bestAnswer:
      "Because the command center separates pass, partial, and prepared cases instead of pretending every case passed perfectly.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["15 executed", "14 passed", "1 partial", "Arabic weakness stated explicitly"],
    whatNotToSay: ["All tests passed perfectly"],
  },
  {
    id: 34,
    doctorSays: "Why are you not showing the chatbot?",
    testing: "Whether you know your own demo risk.",
    bestAnswer:
      "Because /chatbot needs at least one AI key verified live and has no local fallback, so it is not a safe defense-first page.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["/api/ai/chat needs at least one AI key", "no local fallback", "do-not-show list"],
    whatNotToSay: ["The chatbot is the main feature"],
  },
  {
    id: 35,
    doctorSays: "Why are you not showing TinEye or Redis?",
    testing: "Whether you overclaim implementation.",
    bestAnswer:
      "Because TinEye is not implemented in source code, and Redis exists in docker-compose but has zero source-code usage in src/.",
    pageToOpen: "/defense-main-plan",
    evidenceToMention: ["TinEye commented out in .env.example", "Redis not used in src/"],
    whatNotToSay: ["TinEye is integrated", "Redis powers the system"],
  },
];

export const LIVE_SCENARIOS: ScenarioCard[] = [
  {
    title: "Bad Scenario - Do Not Use",
    route: "/chatbot",
    summary: "Dangerous first demo choice.",
    points: [
      "Needs at least one AI key.",
      "No local fallback.",
      "Output can be unpredictable.",
      "Can be slow.",
      "Can fail with all providers failed.",
    ],
  },
  {
    title: "Good Scenario",
    route: "/bad-news",
    summary: "Safe proof when the doctor wants something live immediately.",
    points: [
      "Enter Doctor.",
      "Start the game.",
      "Make 2 choices.",
      "This safely proves the game engine, counters, and persistence.",
    ],
  },
  {
    title: "Ultra Scenario - Egyptian Student Receives Viral Health Misinformation on WhatsApp",
    route: "/deepreal/exercise/1",
    summary: "Best combined local-context plus live-safe verification demo.",
    points: [
      "Arabic context: منظمة الصحة العالمية أعلنت إن حبة البركة بتعالج كل أنواع السرطان",
      "Live scoring input: WHO says black seed cures cancer",
      "Expected: 0.50 CFS, local-heuristic",
      "Flow: student receives claim -> /deepreal/exercise/1 -> ExerciseEngine -> VerificationConsole -> POST /api/search/claimbuster -> external ClaimBuster if key exists or local fallback -> classification output -> student learns check before sharing",
      "Failure recovery: if scoring fails, open /bad-news; if Arabic is challenged, say the local heuristic is English-optimized but Arabic UI/RTL works; if API key is missing, local fallback works; if internet is down, /bad-news and /baseline still work",
    ],
  },
];

export const DEMO_SEGMENTS: DemoSegment[] = [
  {
    window: "0:00-0:20",
    title: "Opening",
    route: "/defense-main-plan",
    actions: [
      "State the project identity immediately.",
      "Do not open random routes.",
    ],
    say:
      "Egyptian Awareness Library is not a normal awareness website. It is a 14-day cognitive defense intervention for Egyptian university students, targeting misinformation, mental health stigma, and religious manipulation - and it measures behavior change.",
  },
  {
    window: "0:20-1:00",
    title: "Live Verification",
    route: "/deepreal/exercise/1",
    actions: [
      "Open /deepreal/exercise/1.",
      "Type WHO says black seed cures cancer.",
      "Use Arabic as local context only, not as the main scoring proof.",
    ],
    say:
      "This is the live verification proof. The verified live result is 0.50 CFS from local-heuristic.",
  },
  {
    window: "1:00-2:00",
    title: "Game Engine Proof",
    route: "/bad-news",
    actions: [
      "Open /bad-news.",
      "Enter Doctor.",
      "Make 2 choices.",
      "Point to followers, credibility, and progression.",
    ],
    say:
      "This is the safest live page because it is a reducer-driven game engine with zero API dependency.",
  },
  {
    window: "2:00-3:00",
    title: "Measurement Proof",
    route: "/baseline",
    actions: [
      "Open /baseline.",
      "Classify one claim.",
      "Adjust the confidence slider.",
      "Move to the next item.",
    ],
    say:
      "This page measures behavior using TCE, ETS, and CTCS. That is why this is not just a content library.",
  },
  {
    window: "3:00-4:00",
    title: "Dashboard + Local UX Proof",
    route: "/supervisor",
    actions: [
      "Open /supervisor.",
      "Show participant count 1.",
      "Show 4 correction entries.",
      "Show the Recharts bar chart and Export tab.",
      "Briefly show Arabic/RTL toggle and theme switch.",
    ],
    say:
      "This proves the research-facing layer and local Egyptian UX support. Do not say database.",
  },
  {
    window: "4:00-4:40",
    title: "Architecture Proof",
    route: "/defense-main-plan",
    actions: [
      "State only the architecture numbers that matter.",
      "Keep it fast and factual.",
    ],
    say:
      "35 page routes, 34 total API routes, 28 connected demo-relevant routes, 42 exercises across 3 hubs, local fallbacks, offline-safe modules, pilot storage through localStorage/sessionStorage and assessment export files, and pilot-ready - not production-ready. CSV export is NOT VERIFIED in the locked facts.",
  },
  {
    window: "4:40-5:00",
    title: "Closing",
    route: "/defense-main-plan",
    actions: [
      "Close on the engine framing.",
      "Do not start new routes here.",
    ],
    say:
      "One vulnerability, three lenses, one measurement system. The strength is not that the project has many pages; the strength is that every selected page proves a different working engine: verification, game-based inoculation, psychometric measurement, and research export.",
  },
];

export const EMERGENCY_SCRIPTS = [
  {
    duration: "60-second emergency version",
    script: [
      "Egyptian Awareness Library is a 14-day cognitive defense intervention for Egyptian university students.",
      "In one minute I prove three things: live verification on /deepreal/exercise/1, offline-safe inoculation on /bad-news, and psychometric measurement on /baseline.",
      "The system is pilot-ready, not production-ready.",
    ],
  },
  {
    duration: "30-second emergency version",
    script: [
      "This is not a normal awareness website.",
      "It proves verification, inoculation, and measurement through three selected routes.",
      "Pilot-ready, not production-ready.",
    ],
  },
  {
    duration: "20-second emergency version",
    script: [
      "One vulnerability, three lenses, one measurement system.",
      "DeepReal verifies, Bad News inoculates, Baseline measures.",
      "Defense-ready with honest risks.",
    ],
  },
];

export const RECOVERY_LINES: RecoveryLine[] = [
  {
    id: 1,
    trigger: "DeepReal fails",
    line:
      "I am switching from live verification to the safest local engine first, because the project is pilot-ready, not production-ready.",
  },
  {
    id: 2,
    trigger: "ClaimBuster scoring fails",
    line:
      "The verified fallback story is still valid: missing API key fallback passed, and the English local fallback already passed live with 0.50 CFS.",
  },
  {
    id: 3,
    trigger: "Arabic scoring challenged",
    line:
      "Correct. Arabic UI and RTL work, but the local ClaimBuster heuristic is English-optimized unless the external API is active.",
  },
  {
    id: 4,
    trigger: "Bad News fails",
    line:
      "I am moving to Baseline, because that proves the measurement engine with zero API dependency.",
  },
  {
    id: 5,
    trigger: "Baseline fails",
    line:
      "I will show the Bad News engine instead, because it is the lowest-risk local proof page.",
  },
  {
    id: 6,
    trigger: "Dashboard empty",
    line:
      "The dashboard is a secondary proof page. I do not need it to prove the core engines.",
  },
  {
    id: 7,
    trigger: "Internet down",
    line:
      "That is why I rely on /bad-news and /baseline first. Both are verified zero-API pages.",
  },
  {
    id: 8,
    trigger: "Doctor interrupts",
    line:
      "I will compress it to one sentence: verification, inoculation, measurement, and research export through four selected pages.",
  },
  {
    id: 9,
    trigger: "Chatbot requested",
    line:
      "I am not opening /chatbot unless at least one AI key is verified live, because it has no local fallback.",
  },
  {
    id: 10,
    trigger: "TinEye/Redis requested",
    line:
      "TinEye is not implemented in source code, and Redis is not used in src/, so I will not overclaim them in the demo.",
  },
];

export const DO_NOT_SHOW: DoNotShowItem[] = [
  {
    target: "/chatbot unless at least one AI key is verified live",
    why: "Needs at least one AI key and has no local fallback.",
  },
  {
    target: "forensics unless Docker/FastAPI is running and tested",
    why: "Real forensics requires Docker/FastAPI.",
  },
  {
    target: "/prompt-lab",
    why: "Explicitly marked do-not-show live.",
  },
  {
    target: "/defense-qa",
    why: "Explicitly marked do-not-show live.",
  },
  {
    target: "/presentation",
    why: "Explicitly marked do-not-show live.",
  },
  {
    target: "/pricing-presentation",
    why: "Explicitly marked do-not-show live.",
  },
  {
    target: "TinEye",
    why: "Not implemented in source code; variables were commented out in .env.example.",
  },
  {
    target: "Redis",
    why: "Exists in docker-compose but has zero source-code usage in src/.",
  },
  {
    target: "Raw auth files or secrets",
    why: "Do not expose secrets, passwords, admin credentials, or raw auth internals.",
  },
];

export const WHAT_NOT_TO_SAY = [
  "AI detects fake news",
  "Arabic scoring is perfect",
  "It has a database",
  "Redis powers it",
  "TinEye is integrated",
  "Production-ready",
  "It is just a library",
  "It has many features",
  "Everything works offline",
];

export const BRUTAL_HONESTY: BrutalHonesty = {
  strongestProof:
    "The strongest proof is the combination of /deepreal/exercise/1 for live verification, /bad-news for zero-API inoculation, and /baseline for measurable cognitive output.",
  weakestRisk:
    "The weakest risk is Arabic local ClaimBuster heuristic scoring. The verified partial result is 0.15 NFS from local-heuristic because the local heuristic is English-optimized.",
  whatNotToShow:
    "Do not show /chatbot without a verified AI key, do not show forensics without Docker/FastAPI tested, and do not claim TinEye or Redis.",
  challengeLine:
    "If challenged, the honest answer is: pilot-ready, not production-ready, with live-safe fallbacks and explicit weak points.",
  finalStatus: "FINAL STATUS: DEFENSE-READY WITH HONEST RISKS.",
};
