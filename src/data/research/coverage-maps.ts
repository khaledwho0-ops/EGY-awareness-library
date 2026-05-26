export interface ScopeSectionCoverage {
  id: string;
  title: string;
  status: "implemented" | "mapped" | "partial";
  summary: string;
  appMapping: string;
}

export interface ResearchTaskCoverage {
  task: string;
  status: "implemented" | "mapped" | "partial";
  implementation: string;
}

export const PROJECT_SCOPE_COVERAGE: ScopeSectionCoverage[] = [
  { id: "1", title: "Research Foundation", status: "implemented", summary: "Research question, sub-questions, hypotheses, and sampling strategy are now structured in app data.", appMapping: "Research Protocol panel + protocol-spec dataset." },
  { id: "2", title: "Theory of Change & Causal Logic", status: "implemented", summary: "Logic model concepts and causal mechanisms are reflected through theory datasets and evidence disambiguation patterns.", appMapping: "theory-connections, about evidence surface, exercise science briefs." },
  { id: "3", title: "Operationalized Variables & Instruments", status: "implemented", summary: "Core constructs, instruments, baseline constructs, and score formulas exist as typed schemas and readiness gates.", appMapping: "types/assessment, baseline battery, instrument-readiness." },
  { id: "4", title: "Evaluation Protocol", status: "implemented", summary: "Quantitative, qualitative, usability, expert, and technical evaluation pathways are defined and partially surfaced in supervisor tooling.", appMapping: "Research Protocol panel, governance panel, supervisor analytics." },
  { id: "5", title: "Statistical Analysis Plan", status: "implemented", summary: "Power analysis constants, success criteria, effect-size tooling, and hypothesis analytics are present.", appMapping: "types/assessment, effect-size utilities, supervisor hypotheses section." },
  { id: "6", title: "Ethics & Safety Protocol", status: "implemented", summary: "Guardrails, crisis routing, consent language, non-diagnosis/non-fatwa boundaries, and readiness blockers are built into the workflow.", appMapping: "prompt guardrails, readiness checklist, safety types, governance." },
  { id: "7", title: "KeyHunter Full Specification", status: "implemented", summary: "42-entry KeyHunter registry, data model, and keyword-layer behavior are present.", appMapping: "data/keyhunter/* + prompt/education surfaces." },
  { id: "8", title: "Theoretical Frameworks per MVP", status: "implemented", summary: "All three MVP stacks are captured as structured theory entries.", appMapping: "theory-connections.ts + science briefs." },
  { id: "9", title: "Competitive Analysis", status: "implemented", summary: "Competitor map, positioning matrix, and uniqueness narrative are visible.", appMapping: "About page competitive tab." },
  { id: "10", title: "Scope Control & MoSCoW", status: "mapped", summary: "Scope logic exists conceptually through MVP boundaries, role charters, and defense content, but not as a dedicated UI module.", appMapping: "About mission/contributions + defense library strategy tables." },
  { id: "11", title: "Literature Review Strategy", status: "mapped", summary: "Search protocol, source ladder, and evidence sourcing rules are represented through source registry and protocol surfaces.", appMapping: "source-command-center, trusted sources, defense library standards." },
  { id: "12", title: "Original Contribution Statement", status: "implemented", summary: "Original contribution claims are rendered explicitly.", appMapping: "About contributions tab." },
  { id: "13", title: "Content Production Plan", status: "mapped", summary: "Exercise template and content-production logic exist through structured exercise JSON and prompt/data registries.", appMapping: "exercise datasets, prompt registry, support media, science registry." },
  { id: "14", title: "Timeline & Milestones", status: "implemented", summary: "Measurement and implementation timeline are surfaced as interactive schedule components.", appMapping: "methodology-timeline + protocol schedule + roadmap coverage." },
  { id: "15", title: "COM-B Behavior Change Mapping", status: "implemented", summary: "Barrier-to-intervention mapping across all MVPs is complete as structured data.", appMapping: "data/theory/comb-mapping.ts + visualizer components." },
  { id: "16", title: "Complete Reference Architecture", status: "mapped", summary: "Shared-service architecture, route structure, and cross-MVP integration exist in code, with documentation coverage in the framework map.", appMapping: "API routes, routing libs, shared service layer, framework panel." },
  { id: "17", title: "Baseline, Trust Calibration, Anti-Acceptance", status: "implemented", summary: "Trust calibration constructs, day-0 battery, friction gates, and score formulas are live.", appMapping: "baseline battery, trust-calibration scoring, time-friction gate." },
  { id: "18", title: "17 Non-Exercise Intervention Modes", status: "implemented", summary: "All 17 modes are defined and distributed across the 14-day plan.", appMapping: "intervention-schedule + intervention components." },
  { id: "19", title: "Trusted Source Command System + Top 100 Registry", status: "implemented", summary: "100 trusted sources, freshness audits, metadata checks, and source command center are present.", appMapping: "trusted-sources, source registry UI, source command center." },
  { id: "20", title: "Prompt Operations Library", status: "implemented", summary: "42 prompts, prompt interpolation, and guardrails are implemented.", appMapping: "data/prompts, prompt engine, Prompt Lab page." },
  { id: "21", title: "Free API Architecture", status: "implemented", summary: "API routes exist for evidence, fact-check, archive, NCBI, Islamic sources, NLP, and forensics.", appMapping: "src/app/api/* routes." },
  { id: "22", title: "Open-Source Stack + Integration Plan", status: "mapped", summary: "The shipped codebase already reflects a curated stack; the framework layer now makes that integration legible.", appMapping: "package.json dependencies + framework panel mapping." },
  { id: "23", title: "12 Missed Additions / Full-Marks Quality", status: "implemented", summary: "Governance, source freshness, Arabic gates, export tooling, readiness checks, and expert workflows are present.", appMapping: "governance panel, readiness checklist, source freshness, export tooling." },
  { id: "24", title: "Zero-to-Full Technical Roadmap", status: "mapped", summary: "A buildable roadmap is now represented through the framework coverage layer and implemented build slices.", appMapping: "supervisor framework panel + existing app architecture." },
  { id: "25", title: "MVP Role Charter, Boundaries, Upgrade Definition", status: "implemented", summary: "MVP identities, boundaries, and non-overlap are shown clearly.", appMapping: "About mission/competitive/differentiation + guardrails + role language across hubs." },
  { id: "26", title: "Coverage Audit Against Full Request", status: "implemented", summary: "Explicit coverage tracking is now part of the app documentation layer.", appMapping: "Framework coverage panel + defense/task maps." },
  { id: "27", title: "Real Weekly Execution Calendar", status: "mapped", summary: "Execution rhythm and milestone logic are summarized in the framework layer even where the original text remains external.", appMapping: "Framework panel + methodology timeline." },
  { id: "28", title: "External Readiness Checks and Gating", status: "implemented", summary: "Readiness blockers, expert gates, directory rechecks, and launch gates are active.", appMapping: "governance panel + readiness checklist + supervisor dashboard." },
  { id: "29", title: "Appendix / Reference List", status: "partial", summary: "The app contains many of the core references via theory, media, and source datasets, but not the entire appendix verbatim.", appMapping: "theory-connections, support-media, trusted sources, defense library." },
];

export const RESEARCH_TASKS_COVERAGE: ResearchTaskCoverage[] = [
  { task: "Research how misinformation and deepfakes are a worldwide crisis across all fields", status: "implemented", implementation: "global-crisis-data.ts stores worldwide statistics and case studies used by DeepReal." },
  { task: "Research how this crisis appears in Egypt using real data and use cases", status: "implemented", implementation: "Research datasets and trusted local sources prioritize Egyptian and MENA context, with Egypt-focused registry entries and task-map coverage." },
  { task: "Research how the AI era makes the crisis more severe now", status: "implemented", implementation: "Deepfake, voice cloning, and AI manipulation statistics are embedded in crisis data and prompt/science content." },
  { task: "Research massive use cases and stories of people harmed by misinformation or incomplete information", status: "implemented", implementation: "Victim impact profiles, viral fake registries, and crisis case studies cover students, professionals, families, and institutions." },
  { task: "State how those people are in real danger", status: "implemented", implementation: "Impact fields in global crisis data and victim profiles make harm explicit rather than abstract." },
  { task: "Research top most trusted real-time sources worldwide and why to trust them", status: "implemented", implementation: "100-source registry, trust bands, metadata, and source command center operationalize this requirement." },
  { task: "Research most viral fakes worldwide and in Egypt", status: "implemented", implementation: "Viral fakes and source registry surfaces cover this directly." },
  { task: "Research how to invent a new standard based on all those data and use cases", status: "implemented", implementation: "IAL model, TCE, STI, and cross-domain calibration are now documented in the app." },
  { task: "Research how mental health matters and why people suffer from or because of it", status: "implemented", implementation: "Mental-health synthesis, MHLS-based content, and support directories cover this." },
  { task: "Research how religion is very important nowadays exactly", status: "implemented", implementation: "Religion-importance synthesis and Brief RCOPE / meaning-making coverage address this." },
  { task: "Research and apply standards worldwide and locally", status: "implemented", implementation: "Universal standards, university standards, and local/global source logic are now surfaced." },
  { task: "Support all this with real books, podcasts, films, TV, documentaries, and quotes", status: "implemented", implementation: "support-media-registry plus the expanded defense library render books, podcasts, media, and quotes." },
];
