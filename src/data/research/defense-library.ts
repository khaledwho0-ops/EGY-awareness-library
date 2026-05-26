export interface ParalysisStrategy {
  id: number;
  cluster: "data-decision" | "emotional-motivational" | "planning-cognitive" | "behavioral-social";
  mentalBlock: string;
  strategy: string;
  implementation: string;
}

export interface ExpertImplementation {
  id: number;
  strategy: string;
  implementation: string;
  justification: string;
}

export interface UniversityStandard {
  id: number;
  institution: string;
  application: string;
}

export interface KeywordMatrixEntry {
  keyword: string;
  layer1: string;
  layer2: string;
  layer3: string;
  layer4?: string;
  layer5?: string;
  layer6?: string;
  layer7?: string;
  application?: string;
}

export interface ResearchApplication {
  label: string;
  source: string;
  application: string;
}

export interface IALComponent {
  component: string;
  definition: string;
  metric: string;
}

export interface AuthorityOutreach {
  entity: string;
  whyInterested: string;
  outreachMethod: string;
  pitch: string;
}

export interface PromptStrategy {
  id: number;
  strategy: string;
  application: string;
}

export interface StandardApplication {
  id: number;
  standard: string;
  application: string;
  whyReliable: string;
}

export interface SciencePrinciple {
  id: number;
  principle: string;
  implementation: string;
}

export interface NegativeScienceThreat {
  id: number;
  threatCategory: string;
  failureMode: string;
  mitigationStrategy: string;
}

export interface ReferenceItem {
  title: string;
  creator: string;
  application: string;
  platform?: string;
}

export interface PresentationGuideline {
  strategy: string;
  implementation: string;
}

export interface AntiPattern {
  antiPattern: string;
  whyFatal: string;
  defense: string;
}

export const PARALYSIS_STRATEGIES: ParalysisStrategy[] = [
  { id: 1, cluster: "data-decision", mentalBlock: "Analysis Paralysis", strategy: "Satisficing (Simon 1956)", implementation: 'Source Freeze Date: "Literature search stops April 20. No new papers."' },
  { id: 2, cluster: "data-decision", mentalBlock: "Perfectionism", strategy: "Pre-Mortem (Klein 2007)", implementation: 'Write: "Project failed because I spent 3 months on API design and did not recruit."' },
  { id: 3, cluster: "data-decision", mentalBlock: "Scope Creep", strategy: "MoSCoW Method", implementation: "WON'T list (Sec 10.2) is sacred. Chatbot = Phase 2, not MVP." },
  { id: 4, cluster: "data-decision", mentalBlock: "Imposter Syndrome", strategy: "Evidence Ladder", implementation: "This is Tier C Graduation Project — rigorous process, not Nobel Prize." },
  { id: 5, cluster: "data-decision", mentalBlock: "Decision Fatigue", strategy: "Eisenhower Matrix", implementation: "CSS fixes -> Codex. Human brain -> Recruitment Ethics." },
  { id: 6, cluster: "emotional-motivational", mentalBlock: "Fear of Negative Results", strategy: "Null Hypothesis Sanctity", implementation: 'H0 is valid. "No Effect on Religion Hub" = valuable scientific contribution.' },
  { id: 7, cluster: "emotional-motivational", mentalBlock: "Procrastination", strategy: "Temptation Bundling", implementation: "Listen to assigned Podcasts only while cleaning data or formatting citations." },
  { id: 8, cluster: "emotional-motivational", mentalBlock: "Complexity Bias", strategy: "Oversimplification Check", implementation: "If stat test requires 10-page justification -> wrong test. Use Paired T-Test." },
  { id: 9, cluster: "emotional-motivational", mentalBlock: "Sunk Cost Fallacy", strategy: "Zero-Based Thinking", implementation: "If MIST-20 Arabic fails pilot (Cronbach<0.6), KILL IT. Switch to English." },
  { id: 10, cluster: "emotional-motivational", mentalBlock: "Hindsight Bias", strategy: "Decision Log", implementation: "Log why KeyHunter terms chosen BEFORE seeing user data." },
  { id: 11, cluster: "planning-cognitive", mentalBlock: "Planning Fallacy", strategy: "Reference Class Forecasting", implementation: "Past cohort avg app build = 8 weeks. Plan accordingly." },
  { id: 12, cluster: "planning-cognitive", mentalBlock: "Optimism Bias", strategy: "Murphy's Law Simulation", implementation: "Assume Fact Check API down on Demo Day. Have Static Screenshot Fallback." },
  { id: 13, cluster: "planning-cognitive", mentalBlock: "Groupthink", strategy: "Devil's Advocate Review", implementation: '"If I were an extremist, how would I misuse this Religion Hub card?"' },
  { id: 14, cluster: "planning-cognitive", mentalBlock: "Dunning-Kruger", strategy: "Expert Consultation Mandate", implementation: "Sec 28.8 Gate: No launch until non-researcher expert signs off." },
  { id: 15, cluster: "planning-cognitive", mentalBlock: "Zeigarnik Effect", strategy: "Task Chunking", implementation: '"Build DeepReal" -> 14 daily tasks. Task 1 completion = dopamine hit.' },
  { id: 16, cluster: "planning-cognitive", mentalBlock: "Cognitive Overload", strategy: "External Memory System", implementation: 'GitHub Issues stores all "Future Ideas." Out of brain, onto list.' },
  { id: 17, cluster: "behavioral-social", mentalBlock: "Loss Aversion", strategy: "Reframing", implementation: 'Not "cutting 50 features" -> "protecting integrity of 3 core features"' },
  { id: 18, cluster: "behavioral-social", mentalBlock: "Parkinson's Law", strategy: "Time Boxing", implementation: '"Literature Review 9am-11am ONLY. At 11am, submit what I have."' },
  { id: 19, cluster: "behavioral-social", mentalBlock: "False Consensus", strategy: "User Testing", implementation: "Do not assume UI is intuitive. Think-Aloud Protocol (Sec 4.4) mandatory." },
  { id: 20, cluster: "behavioral-social", mentalBlock: "Negativity Bias", strategy: "Win Journal", implementation: 'Private log: "Got Crossref API key." "Wrote 1 prompt."' },
  { id: 21, cluster: "behavioral-social", mentalBlock: "Paradox of Choice", strategy: "Default Path", implementation: 'Day 1 first click = giant "Start Day 1 Exercise" button. All else secondary.' },
];

export const DATA_SCIENTIST_STRATEGIES: ExpertImplementation[] = [
  { id: 1, strategy: "API Gateway Pattern", implementation: "`src/app/api/search/route.ts`", justification: "Centralizes rate limiting, caching, key security" },
  { id: 2, strategy: "OpenAlex API", implementation: "Evidence Panel metadata", justification: "Open, 100k/day free, Tier A Source" },
  { id: 3, strategy: "Crossref REST API", implementation: "DOI validation", justification: "Mailto polite pool = higher rate limits" },
  { id: 4, strategy: "Google Fact Check Tools API", implementation: "ClaimReview schema queries", justification: "Only IFCN-signatory fact-check aggregator" },
  { id: 5, strategy: "NCBI E-utilities", implementation: "MH module PubMed abstracts", justification: "Raw data for Research Export Pack" },
  { id: 6, strategy: "Static JSON Fallback", implementation: "`public/data/cache/sources.json`", justification: 'Passes "Airplane Mode Test"' },
  { id: 7, strategy: "Zod Schema Validation", implementation: "TypeScript form validation", justification: "Prevents NaN from text-in-number fields" },
  { id: 8, strategy: "Anonymization Pipeline", implementation: "`hashParticipantId(email)`", justification: "Match Pre/Post without storing PII" },
  { id: 9, strategy: "DuckDB for Analytics", implementation: "In-browser SQL analytics", justification: "Complex queries without server — Privacy by Design" },
  { id: 10, strategy: "Dwell Time Logging", implementation: "`time_on_source_page_ms`", justification: "Distinguishes real AFS from random clicking" },
  { id: 11, strategy: "GDPR/Egypt Law 151", implementation: "Essential session storage only", justification: "University ethics boards scrutinize digital privacy" },
  { id: 12, strategy: "Data Provenance", implementation: "`source_retrieval_timestamp`", justification: '>90 days -> "Info may be stale" warning' },
];

export const UNIVERSAL_RESEARCH_STANDARDS: StandardApplication[] = [
  { id: 1, standard: "Validity (Face Validity)", application: '5 non-expert students review whether verification/help buttons look intuitively useful.', whyReliable: "Saves effort on features users will not trust or understand instinctively." },
  { id: 2, standard: "Validity (Content Validity)", application: "Content Validity Index (CVI) from 3 domain experts; items below threshold are revised or removed.", whyReliable: "Ensures the app teaches the intended constructs rather than generic information." },
  { id: 3, standard: "Validity (Construct Validity)", application: "Convergent/divergent checks tie MIST-20 to trust-calibration constructs but not to social desirability.", whyReliable: "Shows the platform measures awareness constructs, not just test-taking behavior." },
  { id: 4, standard: "Validity (Criterion Validity)", application: "Baseline MIST-20 should predict performance on live viral-hoax recognition tasks.", whyReliable: "Connects survey measures to real-world digital judgment." },
  { id: 5, standard: "Reliability (Test-Retest)", application: "Waitlist control retakes MIST-20 to confirm score stability without intervention.", whyReliable: "Separates true learning effects from simple retest effects." },
  { id: 6, standard: "Reliability (Internal Consistency)", application: "Cronbach alpha is calculated for MHLS and Brief RCOPE and reported transparently.", whyReliable: "Makes instrument weakness visible rather than hiding it." },
  { id: 7, standard: "Reliability (Inter-Rater)", application: "Two coders analyze qualitative feedback against a COM-B codebook.", whyReliable: "Reduces single-researcher interpretation bias." },
  { id: 8, standard: "Objectivity", application: "Automated scoring for MIST-20, MHLS, and related assessment logic.", whyReliable: "Removes arithmetic inconsistency and manual scoring drift." },
  { id: 9, standard: "Falsifiability", application: "Null hypotheses are explicit and must be accepted when p-values fail thresholds.", whyReliable: "The project is built to possibly fail, which protects integrity." },
  { id: 10, standard: "Replicability", application: "Code, anonymized data, and materials are prepared for OSF-style deposit/export.", whyReliable: "Future researchers can inspect, reproduce, and extend the work." },
  { id: 11, standard: "Empirical Evidence", application: "Exercises and evidence panels are grounded in peer-reviewed sources, APIs, and cited registries.", whyReliable: "Prevents fallback to pop-science or motivational filler." },
  { id: 12, standard: "Parsimony", application: "Primary outcomes stay simple: pre/post improvements and clear success thresholds.", whyReliable: "Easier to defend and less vulnerable to statistical overreach." },
  { id: 13, standard: "Ethical Neutrality", application: "Religion Hub is framed as coping psychology, not theology or doctrinal endorsement.", whyReliable: "Protects against sectarian bias and scope drift." },
  { id: 14, standard: "Systematic Review", application: "Literature review is framed through explicit search strategy and source ladder rules.", whyReliable: "Demonstrates breadth and reduces cherry-picking." },
  { id: 15, standard: "Peer Review", application: "Three expert signoffs are required before launch readiness.", whyReliable: "Catches factual, pedagogical, and safety issues before exposure." },
  { id: 16, standard: "Generalizability", application: "Limitations explicitly state student-specific and context-specific boundaries.", whyReliable: "Prevents overclaiming transferability." },
  { id: 17, standard: "Stakeholder Involvement", application: "Think-aloud usability testing includes actual Egyptian students rather than researcher assumptions.", whyReliable: "Improves ecological fit and real usability." },
  { id: 18, standard: "Transparency", application: "Defense/export pack and supervisor analytics expose raw operational metrics.", whyReliable: "Claims can be audited back to underlying logs." },
  { id: 19, standard: "Cultural Competence", application: "Local institutions like Al-Azhar, Dar al-Ifta, MoHP, and EKB are embedded as first-class references.", whyReliable: "Aligns global standards with local legitimacy." },
  { id: 20, standard: "Sustainability", application: "Offline/PWA fallback and static caches preserve function beyond live API availability.", whyReliable: "The artifact remains usable after the semester build window." },
];

export const APPLIED_SCIENCE_PRINCIPLES: SciencePrinciple[] = [
  { id: 1, principle: "Inoculation Theory", implementation: "Every DeepReal exercise includes a weakened manipulation dose followed by refutation." },
  { id: 2, principle: "Mental Health Literacy (Jorm)", implementation: "Mental Health content covers recognition, risk factors, self-help, professional help, and attitudes." },
  { id: 3, principle: "Religious Coping (Pargament)", implementation: "Religion Hub explicitly teaches positive and negative Brief RCOPE patterns." },
  { id: 4, principle: "COM-B Model", implementation: "Exercises and interventions carry COM-B targets in metadata and analysis." },
  { id: 5, principle: "Dual Process Theory", implementation: "Verification friction is used to trigger System 2 before belief acceptance." },
  { id: 6, principle: "SIFT Method", implementation: "DeepReal navigation and prompting are anchored around Stop, Investigate, Find, Trace." },
  { id: 7, principle: "Lateral Reading", implementation: "Source comparison forces cross-source verification, not vertical reading only." },
  { id: 8, principle: "PERMA Model", implementation: "Mental Health exercises target wellbeing pillars like engagement, relationships, and meaning." },
  { id: 9, principle: "Affect Labeling", implementation: 'Emotion Box workflows ask the user to name feelings before proceeding.' },
  { id: 10, principle: "Contact Hypothesis", implementation: "Mental-health scenarios use human narratives rather than abstract pathology labels." },
  { id: 11, principle: "Spiritual Bypass Model", implementation: "Religion Hub includes explicit bypass warnings such as replacing care with ritual only." },
  { id: 12, principle: "Meaning-Making Model", implementation: "Exercises distinguish worldview-level meaning from event-level interpretation." },
  { id: 13, principle: "Gamification Science", implementation: "14-day progression and streak logic reinforce adherence over flat completion bars." },
  { id: 14, principle: "Micro-Learning", implementation: "Content is chunked so exercises remain lightweight and cognitively manageable." },
  { id: 15, principle: "Active Recall", implementation: "Myth Autopsy and verification prompts require guesses before revealing explanations." },
  { id: 16, principle: "Metacognitive Calibration", implementation: "Confidence is logged before feedback, enabling TCE measurement." },
  { id: 17, principle: "Precision Teaching", implementation: "KeyHunter and glossary interactions expose expert terminology on demand." },
  { id: 18, principle: "Behavioral Economics", implementation: "Safer defaults favor saving corrections and discouraging impulsive sharing." },
  { id: 19, principle: "Cognitive Load Theory", implementation: "The UI avoids heavy clutter and unnecessary simultaneous stimuli." },
  { id: 20, principle: "Social Learning Theory", implementation: "Peer/comparison modes model verification as a shared reasoning process." },
];

export const NEGATIVE_SCIENCE_THREATS: NegativeScienceThreat[] = [
  { id: 1, threatCategory: "Type I Error", failureMode: "False positives from multiple comparisons inflate claims of impact.", mitigationStrategy: "Bonferroni-style correction and explicit alpha discipline." },
  { id: 2, threatCategory: "Type II Error", failureMode: "Small samples miss real medium effects.", mitigationStrategy: "Power analysis and inflated sample targets for dropout." },
  { id: 3, threatCategory: "Attrition Bias", failureMode: "Distressed participants drop out, leaving an artificially healthy sample.", mitigationStrategy: "Dropout analysis comparing completers vs non-completers." },
  { id: 4, threatCategory: "Selection Bias", failureMode: "Recruitment over-represents digitally literate or highly motivated students.", mitigationStrategy: "Quota-aware recruitment across faculties/demographics." },
  { id: 5, threatCategory: "Maturation", failureMode: "External stress cycles like exams shift scores independent of the intervention.", mitigationStrategy: "Waitlist control comparison in the same calendar window." },
  { id: 6, threatCategory: "History", failureMode: "Major real-world events distort awareness during the study window.", mitigationStrategy: "Log notable events as contextual covariates." },
  { id: 7, threatCategory: "Instrumentation", failureMode: "Mid-study wording or scoring changes contaminate comparability.", mitigationStrategy: "Build freeze and scoring freeze rules." },
  { id: 8, threatCategory: "Testing Effect", failureMode: "Improvement comes from seeing the same test twice.", mitigationStrategy: "Use control retest behavior to isolate the intervention effect." },
  { id: 9, threatCategory: "Regression to the Mean", failureMode: "Extremely low baselines improve naturally without treatment impact.", mitigationStrategy: "Baseline-aware analysis such as ANCOVA reasoning or adjusted interpretation." },
  { id: 10, threatCategory: "Demand Characteristics", failureMode: "Users perform expected behaviors without truly engaging.", mitigationStrategy: "Dwell time and behavior-depth metrics differentiate shallow from real interaction." },
  { id: 11, threatCategory: "Social Desirability Bias", failureMode: "Participants answer in morally approved ways rather than truthfully.", mitigationStrategy: "MC-SDS covariate and cautious interpretation." },
  { id: 12, threatCategory: "Expectancy Effect", failureMode: "Researcher involvement or social ties bias outcomes.", mitigationStrategy: "Self-administered instruments and reduced live researcher influence." },
  { id: 13, threatCategory: "Hawthorne Effect", failureMode: "Behavior improves only because participants know they are observed.", mitigationStrategy: "Naturalistic home/mobile use rather than lab-only observation." },
  { id: 14, threatCategory: "Low Ecological Validity", failureMode: "The app works in ideal conditions but not on real student devices/connections.", mitigationStrategy: "Low-bandwidth/offline testing and static fallback." },
  { id: 15, threatCategory: "Restriction of Range", failureMode: "Ceiling effects leave no room for improvement.", mitigationStrategy: "Pilot baseline checks and difficulty calibration." },
  { id: 16, threatCategory: "Differential Attrition", failureMode: "Control and intervention groups drop out at different rates.", mitigationStrategy: "Balanced incentives and explicit retention planning." },
  { id: 17, threatCategory: "Novelty Effect", failureMode: "Week 1 engagement is inflated by newness and fades fast.", mitigationStrategy: "Staggered intervention modes and weekly reviews." },
  { id: 18, threatCategory: "Tech Literacy Confound", failureMode: "Low tech comfort depresses learning independently of content quality.", mitigationStrategy: "SUS, usability review, and simplified interaction patterns." },
  { id: 19, threatCategory: "Spillover Effect", failureMode: "Intervention users contaminate the waitlist/control group.", mitigationStrategy: "Explicit do-not-share guidance during the study window." },
  { id: 20, threatCategory: "API Drift", failureMode: "Upstream API changes break the evidence layer during the study/demo.", mitigationStrategy: "Static caches, schema control, and fallback behavior." },
];

export const UNIVERSITY_STANDARDS: UniversityStandard[] = [
  { id: 1, institution: "Cairo University — CS & AI Bylaws", application: "5-chapter thesis format: Intro, Lit Review, Methodology, Implementation, Conclusion" },
  { id: 2, institution: "Ain Shams — Psychology Ethics", application: "Consent includes ethics ombudsman contact" },
  { id: 3, institution: "AUC — IRB Guidelines", application: "Surveys minimize sensitive identifiable data" },
  { id: 4, institution: "SCU — Postgraduate Bylaws", application: "Supervisor Review Dashboard (Sec 23.11) for mandated approval" },
  { id: 5, institution: "Oxford — Reuters Institute", application: "Source Registry scoring based on Reuters trust pillars" },
  { id: 6, institution: "Cambridge — Pre-Bunking", application: "Inoculation: Warning + Micro-dose + Refutation (Go Viral! pattern)" },
  { id: 7, institution: "Stanford — Civic Online Reasoning", application: "Lateral Reading modeled on SHEG curriculum" },
  { id: 8, institution: "Harvard — Digital Accessibility", application: "WCAG 2.1 AA contrast, alt text required for all images" },
  { id: 9, institution: "MIT — OCW Philosophy", application: "Materials released CC license on OSF" },
  { id: 10, institution: "Al-Azhar — Moderation Observatory", application: "Religion Hub cross-referenced with Al-Azhar anti-extremism statements" },
  { id: 11, institution: "QS Rankings — Research Impact", application: "Project framed as SDG 3 (Health) + SDG 16 (Peace/Justice)" },
  { id: 12, institution: "EKB — Data Usage Policy", application: "References link to EKB Portal (free access for Egyptian students)" },
];

export const CORE_PROJECT_KEYWORDS: KeywordMatrixEntry[] = [
  { keyword: "Use Cases", layer1: "Scenarios, Applications", layer2: "Persona Dev, Edge Cases", layer3: "Negative Path Testing", layer7: 'Generate 3 use cases: WhatsApp verify, exam anxiety, religious video confusion' },
  { keyword: "Use Cases Worldwide", layer1: "Global Trends", layer2: "WEIRD Populations, Cross-Cultural", layer3: '"Global North Default" in UI design', layer7: "Compare deepfake impact: US vs India vs Brazil elections" },
  { keyword: "Use Cases Egypt/MENA", layer1: "Local Context", layer2: "CAPMAS, Misbar Case Files", layer3: '"Uncle on WhatsApp" > algorithmic feeds', layer7: "Provide case study of viral health hoax in Egypt citing Misbar" },
  { keyword: "Demographics", layer1: "Target Audience", layer2: "Stratified Sampling, Intersectionality", layer3: "Gender Digital Divide in Egyptian households", layer7: "Adapt MH card for Egyptian mother vs male student" },
  { keyword: "Deepfake", layer1: "AI-generated video", layer2: "GAN, Diffusion Models, Lip-Sync", layer3: "Cheapfake detection harder than AI deepfakes", layer7: "Describe 3 visual artifacts of AI face swap" },
];

export const SOURCE_STANDARD_KEYWORDS: KeywordMatrixEntry[] = [
  { keyword: "Trusted Sources WW", layer1: "Reliable, Credible", layer2: "IFCN Signatory, Editorial Independence", layer3: "Source vs Platform distinction", layer5: "Authority Bias" },
  { keyword: "Trusted Sources Local", layer1: "Egyptian Institutions", layer2: "Al-Azhar, Dar al-Ifta, MoHP, SIS", layer3: "CAPMAS > press on same topic", layer5: "Censorship vs Curation confusion" },
  { keyword: "Myths Debunkers", layer1: "Fact-Checkers", layer2: "Pre-Bunking Agent, Debiasing", layer3: "Backfire Effect Management", layer5: "Gish Gallop" },
  { keyword: "Standards WW", layer1: "Benchmarks, KPIs", layer2: "ISO 25010, TRL", layer3: 'SCU requires "Practical Application"', layer5: "Grade Inflation" },
  { keyword: "Standards University", layer1: "Grading Rubric", layer2: "Bloom's Taxonomy, DSR Guidelines", layer3: "External Examiner Threat", layer5: "Feature Creep" },
];

export const SCIENCE_DOMAIN_KEYWORDS: KeywordMatrixEntry[] = [
  { keyword: "Psychology", layer1: "Mind, Behavior", layer2: "Cognitive Bias, Motivated Reasoning", layer3: "Naive Realism", layer6: "Psychology ≠ Psychiatry" },
  { keyword: "Physiology", layer1: "Body, Brain", layer2: "Amygdala Hijack, Cortisol", layer3: "Interoception influences emotional labeling", layer6: "Physiology ≠ Psychology" },
  { keyword: "Sociology", layer1: "Society, Norms", layer2: "Social Contagion, Moral Panic", layer3: "Third-Person Effect", layer6: "Sociology ≠ Social Work" },
  { keyword: "Negative Science", layer1: "Falsification", layer2: "Type I/II Error, Confounds", layer3: "File Drawer Problem", layer6: "Negative Science ≠ Bad Science" },
  { keyword: "Positive Science", layer1: "Evidence-Based", layer2: "RCT, Effect Size", layer3: "Replication Crisis awareness", layer6: "Positive Science ≠ Positivism" },
  { keyword: "Applied Science", layer1: "Practical", layer2: "Implementation Science", layer3: "Fidelity vs Adaptation", layer6: "Applied ≠ Basic Research" },
];

export const INTELLIGENCE_KEYWORDS: KeywordMatrixEntry[] = [
  { keyword: "Emotional Intelligence", layer1: "EQ, Empathy", layer2: "Mayer-Salovey Model", layer3: "Meta-Emotion", application: "Emotion Box + Emotional Exercises" },
  { keyword: "Logical Intelligence", layer1: "IQ, Reasoning", layer2: "Deductive vs Inductive", layer3: "Motivated Numeracy", application: "SIFT = applied logical heuristic" },
  { keyword: "Linguistic Intelligence", layer1: "Language, Semantics", layer2: "Pragmatics, Framing", layer3: "Arabic Diglossia (MSA vs Colloquial)", application: "KeyHunter + Arabic Terminology Control" },
  { keyword: "Naturalistic Intelligence", layer1: "Patterns, Systems", layer2: "Systems Thinking", layer3: "Info Ecosystems = invasive species", application: "Source Registry = curated greenhouse" },
  { keyword: "Universal Intelligence", layer1: "g factor", layer2: "Fluid vs Crystallized", layer3: "CRT correlates with g but is trainable", application: "App trains System 2 regardless of baseline" },
  { keyword: "Existential Intelligence", layer1: "Meaning, Purpose", layer2: "Terror Management Theory", layer3: "Existential Anxiety -> conspiracies", application: "Religion Hub Meaning-Making Map" },
  { keyword: "Spatial Intelligence", layer1: "Visualization", layer2: "Mental Rotation, Network Topology", layer3: "Source Mapping debunks local attribution", application: "Cytoscape.js in Admin Dashboard" },
  { keyword: "Interpersonal Intelligence", layer1: "Social Skills", layer2: "Theory of Mind", layer3: "Social Norms Marketing", application: "Peer Pair Review Mode" },
  { keyword: "Practical Intelligence", layer1: "Street Smarts", layer2: "Tacit Knowledge, Heuristics", layer3: "Bricolage in resource-constrained contexts", application: "Trusted Directory Quick Access" },
  { keyword: "Creative Intelligence", layer1: "Divergent Thinking", layer2: "Lateral Thinking", layer3: "Creative Misinformation by scammers", application: "Content Production requires creative scenarios" },
  { keyword: "Human vs AI", layer1: "Automation", layer2: "HITL, Algorithmic Bias", layer3: "Automation Complacency", application: "Prompt Lab = Human+AI; 8-Gate = Human arbiter" },
];

export const MENTAL_HEALTH_SYNTHESIS: ResearchApplication[] = [
  { label: "~25% of Egyptian population has mental/neurological disorders", source: "WHO Egypt", application: "MH MVP Justification" },
  { label: "90% treatment gap due to stigma/lack of awareness", source: "MoHP", application: 'Myth Autopsy Board targets "Depression = Weakness"' },
  { label: "Contact Hypothesis (Corrigan)", source: "Academic", application: "First-person narratives reduce stigma" },
  { label: "Affect Labeling (Lieberman)", source: "Neuroscience", application: 'Emotion Box = typing "I feel…" reduces amygdala activation' },
  { label: "PERMA Model (Seligman)", source: "Positive Psychology", application: "Exercises target Engagement, Relationships, Meaning" },
];

export const RELIGION_SYNTHESIS: ResearchApplication[] = [
  { label: '95% of Egyptians: religion is "very important"', source: "Pew Research / Gallup", application: "Religion Hub MVP Justification" },
  { label: "Positive religious coping -> lower suicide ideation", source: "Muslim population studies", application: "Brief RCOPE Positive subscale exercises" },
  { label: "Spiritual Bypassing under-researched in region", source: "Academic gap", application: 'Specific examples: "Do not need therapy, just pray harder"' },
  { label: "Brief RCOPE: r=0.3-0.5 with better adjustment", source: "Pargament 2011", application: "7 positive + 7 negative items taught as distinct categories" },
  { label: "Meaning-Making Model (Park)", source: "Global vs Situational meaning", application: "Exercises distinguish worldview from current event" },
];

export const STANDARDS_SYNTHESIS: ResearchApplication[] = [
  { label: "Worldwide", source: "APA Standards for Ed & Psych Testing", application: "Instrument validity framework" },
  { label: "Local", source: "SCU Bylaws Article 74", application: "Thesis formatting compliance" },
  { label: "Local", source: "EKB Integration Mandate", application: "Free-access references for students" },
  { label: "Hybrid", source: "Expert Review Rubric (Sec 4.3)", application: "Global best practices + local cultural criteria" },
];

export const IAL_MODEL_COMPONENTS: IALComponent[] = [
  { component: "Cross-Domain Calibration", definition: "Overlap between Truth (Misinfo), Self (MH), Meaning (Religion)", metric: "Multi-MVP engagement score" },
  { component: "Trust Calibration Error (TCE)", definition: "Accuracy of confidence in your knowledge", metric: "Confidence Slider vs actual correctness" },
  { component: "Source Triangulation Index (STI)", definition: "How many distinct source types consulted before forming belief", metric: "Source clicks per exercise" },
];

export const AUTHORITY_OUTREACH: AuthorityOutreach[] = [
  { entity: "MoHP — GSMHAT", whyInterested: "They need educational content for mentalhealth.mohp.gov.eg", outreachMethod: 'LinkedIn: "Digital Health Officer"', pitch: "Free evidence-based MH module for students, integrates via link" },
  { entity: "Dar al-Ifta", whyInterested: "Mandate for public guidance, counter-extremism", outreachMethod: 'Official website: "Research & Studies"', pitch: "Tool helping students distinguish positive coping vs spiritual bypassing" },
  { entity: "Misbar", whyInterested: "IFCN signatory, regional fact-checker", outreachMethod: "Twitter/X DM", pitch: "Building student verification project, reference Misbar as top source" },
  { entity: "UNESCO Cairo", whyInterested: "MIL mandate", outreachMethod: 'Email: "Communication & Information" specialist', pitch: "Applied MIL intervention for Egyptian universities, aligning with UNESCO MIL Curriculum" },
  { entity: "IFCN", whyInterested: "Global standards body", outreachMethod: "Apply for membership", pitch: "Student project built to IFCN Code of Principles" },
  { entity: "University Counseling", whyInterested: "Overwhelmed, need scalable triage", outreachMethod: "Direct visit to Director", pitch: "App does not replace counseling, teaches when to seek it, includes center link" },
];

export const PROMPT_ENGINEERING_STRATEGIES: PromptStrategy[] = [
  { id: 1, strategy: "Chain-of-Thought", application: 'Prompt Lab generates step-by-step reasoning: "1. Identify claim. 2. Check fact-checks. 3. Evaluate source expertise."' },
  { id: 2, strategy: "Few-Shot", application: 'KeyHunter includes "Example Outputs" — Reuters verification vs TikTok post' },
  { id: 3, strategy: "Zero-Shot + Role", application: 'Auto-prepend: "Act as neutral, evidence-based information scientist…"' },
  { id: 4, strategy: "Structured Output", application: "Admin tools return JSON: `{claim_veracity_score, evidence_summary, source_trust_band}`" },
  { id: 5, strategy: "Self-Consistency", application: "Admin Dashboard: same prompt 3x with temperature variation -> divergence = flagged" },
  { id: 6, strategy: "Tree of Thoughts", application: "Religion Hub boundary: Path 1: Positive Coping. Path 2: Negative. Path 3: Spiritual Bypassing" },
  { id: 7, strategy: "Negative Prompting", application: '"Do NOT diagnose. Do NOT issue religious ruling. Do NOT cite Wikipedia as primary."' },
  { id: 8, strategy: "RAG Instruction", application: '"Using ONLY the Al-Azhar Observatory text below, answer. If absent: \'Not available in trusted source.\'"' },
  { id: 9, strategy: "Confidence Calibration", application: 'Prompts end with: "Confidence score 0-100 + top 2 factors that could make you wrong"' },
  { id: 10, strategy: "Multi-Lingual Chain", application: 'Step 1: Translate "Catastrophizing" to non-stigmatizing MSA. Step 2: Egyptian exam stress example' },
  { id: 11, strategy: "Persona (COM-B)", application: `Answer as if explaining to a Motivated but Skeptical Egyptian student who believes "mental illness = weakness"` },
  { id: 12, strategy: "Constraint Boxing", application: '8-Gate Check UI: user cannot submit without filling "Exact Claim" + "Evidence Box"' },
];

export const CURATED_BOOKS: ReferenceItem[] = [
  { title: "Foolproof", creator: "Sander van der Linden", application: "Inoculation Theory primary reference" },
  { title: "Thinking, Fast and Slow", creator: "Daniel Kahneman", application: "Dual Process Theory foundation" },
  { title: "The Misinformation Age", creator: "O'Connor & Weatherall", application: "Epistemology of fake news" },
  { title: "Spiritually Integrated Psychotherapy", creator: "Kenneth Pargament", application: "Religious Coping framework" },
];

export const CURATED_PODCASTS: ReferenceItem[] = [
  { title: "Science Vs", creator: "Podcast", application: "Content inspiration for exercises" },
  { title: "The Psychology Podcast (Kaufman)", creator: "Podcast", application: "MH module grounding" },
  { title: "BBC Trending", creator: "Podcast", application: "Egypt/Global viral case studies" },
];

export const CURATED_MEDIA: ReferenceItem[] = [
  { title: "The Social Dilemma", creator: "Documentary", platform: "Netflix", application: "Algorithmic manipulation awareness" },
  { title: "Coded Bias", creator: "Documentary", platform: "Netflix", application: "AI bias & fairness" },
  { title: "Nothing is Private", creator: "Documentary", platform: "Documentary", application: "Deepfake implications" },
  { title: "The Newsroom S1E1", creator: "TV", platform: "HBO", application: "Information integrity speech" },
];

export const FOUNDATIONAL_QUOTES: ReferenceItem[] = [
  { title: "The greatest enemy of knowledge is not ignorance; it is the illusion of knowledge.", creator: "Stephen Hawking", application: "Confidence Logging exercise" },
  { title: "It is the mark of an educated mind to entertain a thought without accepting it.", creator: "Aristotle", application: "DeepReal Bias Reflection" },
];

export const PRESENTATION_CONFIDENCE_GUIDELINES: PresentationGuideline[] = [
  { strategy: "Elevator Pitch", implementation: "First integrated platform combining misinfo + MH + religion for Egyptian students" },
  { strategy: "Evidence-Based Rhetoric", implementation: "Every claim -> cite specific section & data point" },
  { strategy: "Anticipating Objections", implementation: "Pre-generate 5 hard examiner questions with calm responses" },
  { strategy: "Pause and Breathe", implementation: "Technique before answering tough defense questions" },
  { strategy: "Confidence ≠ Overconfidence", implementation: "Appear competent, not cocky" },
];

export const DEFENSE_ANTI_PATTERNS: AntiPattern[] = [
  { antiPattern: "Promise a cure", whyFatal: "#1 ethical failure in MH apps", defense: "Educational disclaimers everywhere" },
  { antiPattern: "Over-promise, under-deliver", whyFatal: "Examiner will probe claims", defense: "WON'T list protects scope" },
  { antiPattern: "Ignore limitations", whyFatal: "Shows lack of rigor", defense: "Dedicated Limitations section" },
  { antiPattern: "Use Wikipedia as primary", whyFatal: "Kills credibility instantly", defense: "Tier system enforced" },
  { antiPattern: "Skip ethics approval", whyFatal: "Can invalidate entire project", defense: "Pre-Launch Gate (Sec 28)" },
];

export const DEFENSE_CHECKLIST: string[] = [
  "Scope Sec 26 (Coverage Audit) — all items mapped",
  "Sec 28 (Readiness Checks) — all gates passed",
  "Pre-Mortem log — documented",
  "Expert sign-off — 3 signatures obtained",
  "OSF deposit — code, data, materials uploaded",
  "Static Fallback — tested for Demo Day API failures",
  "Airplane Mode Test — PWA functions offline",
  "Dropout Analysis — completers vs dropouts compared",
];
