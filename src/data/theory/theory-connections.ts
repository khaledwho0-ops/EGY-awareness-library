/**
 * THEORY CONNECTIONS DATA — §2.2 + §8.1-8.3
 * 
 * All 15 theoretical frameworks with causal mechanisms, evidence citations,
 * and exercise mappings. Turns static framework text into interactive data.
 */

export interface TheoryConnection {
  id: string;
  name: string;
  authors: string;
  year: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  role: "primary" | "pedagogical" | "supporting" | "skill" | "design" | "risk";
  /** Core explanation of the theory */
  description: string;
  /** How the theory works as a causal mechanism (§2.2) */
  causalMechanism: string;
  /** Specific evidence for effectiveness */
  evidence: string;
  /** Key reference citation */
  keyReference: string;
  /** Which exercises operationalize this theory */
  exerciseDays: number[];
  /** How this theory manifests in the exercise design */
  applicationInExercise: string;
  /** What the user should notice changing */
  expectedOutcome: string;
}

export const THEORY_CONNECTIONS: TheoryConnection[] = [
  // ═══════════════════════════════════════════
  // §8.1 DeepReal Theoretical Stack (5)
  // ═══════════════════════════════════════════
  {
    id: "th-dr-01",
    name: "Inoculation Theory",
    authors: "McGuire (1961); van der Linden (2022)",
    year: "1961/2022",
    mvp: "deepreal",
    role: "primary",
    description: "Psychological 'vaccination' against misinformation through exposure to weakened manipulation techniques. Just as biological vaccines expose the body to weakened pathogens, inoculation theory exposes users to weakened forms of manipulation to build cognitive antibodies.",
    causalMechanism: "Exposure to weakened misinformation techniques builds cognitive antibodies; users develop resistance by recognizing manipulation patterns before encountering them in the wild.",
    evidence: "Bad News game: 21% improvement in detecting manipulation techniques (Roozenbeek & van der Linden, 2019). Go Viral!: significant reduction in perceived reliability of COVID misinformation.",
    keyReference: "van der Linden, S. (2022). Foolproof: Why Misinformation Infects Our Minds. Norton.",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    applicationInExercise: "Every DeepReal exercise exposes users to a real or simulated misinformation pattern in a controlled environment, then teaches the specific technique being used.",
    expectedOutcome: "Users develop automatic pattern recognition for manipulation tactics and pause before accepting claims.",
  },
  {
    id: "th-dr-02",
    name: "SIFT Method",
    authors: "Caulfield (2019)",
    year: "2019",
    mvp: "deepreal",
    role: "pedagogical",
    description: "A 4-step fact-checking protocol: Stop, Investigate the source, Find better coverage, Trace claims to their origin. Designed for rapid, practical verification.",
    causalMechanism: "Provides an actionable, memorable verification sequence that converts abstract 'critical thinking' into concrete steps anyone can follow.",
    evidence: "Adopted by major educational institutions. Wineburg & McGrew (2019) showed professional fact-checkers naturally use these lateral reading patterns.",
    keyReference: "Caulfield, M. (2019). SIFT (The Four Moves). Hapgood.",
    exerciseDays: [1, 2, 4, 7, 10],
    applicationInExercise: "Day 1 introduces SIFT as a tutorial. Subsequent exercises require applying specific SIFT steps to real scenarios.",
    expectedOutcome: "Users internalize the SIFT sequence as their default response when encountering suspicious content.",
  },
  {
    id: "th-dr-03",
    name: "Dual Process Theory",
    authors: "Kahneman (2011)",
    year: "2011",
    mvp: "deepreal",
    role: "supporting",
    description: "Explains why misinformation exploits System 1 (fast, intuitive, emotional thinking) and how exercises train System 2 (slow, analytical, deliberate thinking).",
    causalMechanism: "Misinformation thrives by triggering System 1 responses. Exercises train users to recognize System 1 triggers and activate System 2 for verification.",
    evidence: "Extensive cognitive psychology research. Pennycook & Rand (2019) showed that analytical thinking is negatively correlated with belief in fake news.",
    keyReference: "Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus & Giroux.",
    exerciseDays: [3, 5, 8, 11, 14],
    applicationInExercise: "Exercises explicitly label System 1 vs System 2 moments and practice 'stopping' the automatic response.",
    expectedOutcome: "Users recognize when they are using fast thinking inappropriately and consciously switch to analytical mode.",
  },
  {
    id: "th-dr-04",
    name: "Lateral Reading",
    authors: "Wineburg & McGrew (2019)",
    year: "2019",
    mvp: "deepreal",
    role: "skill",
    description: "How professional fact-checkers evaluate sources by reading 'across' the web (checking what other sources say) rather than 'down' one site (reading more of the same source).",
    causalMechanism: "Novices read vertically (deeper into one site), experts read laterally (across sites). Training lateral reading transfers expert behavior to novices.",
    evidence: "Fact-checkers consistently outperformed PhD historians and Stanford students by using lateral reading (Wineburg & McGrew, 2019).",
    keyReference: "Wineburg, S. & McGrew, S. (2019). Lateral Reading and the Nature of Expertise. Teachers College Record.",
    exerciseDays: [2, 6, 9, 12],
    applicationInExercise: "Exercises present a claim and require users to find at least 2 independent sources before making a judgment.",
    expectedOutcome: "Users automatically open new tabs and check multiple sources rather than trusting a single page.",
  },
  {
    id: "th-dr-05",
    name: "Bloom's Taxonomy",
    authors: "Anderson & Krathwohl (2001)",
    year: "2001",
    mvp: "deepreal",
    role: "design",
    description: "Exercises progress from Remember → Understand → Apply → Analyze → Evaluate across the 14-day sequence, ensuring cognitive complexity builds gradually.",
    causalMechanism: "Scaffolded learning from lower to higher cognitive levels ensures mastery at each stage before progressing.",
    evidence: "Foundational educational design framework validated across decades of educational research.",
    keyReference: "Anderson, L.W. & Krathwohl, D.R. (2001). A Taxonomy for Learning. Longman.",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    applicationInExercise: "Days 1-3: Remember/Understand (definitions, concepts). Days 4-7: Apply (use methods). Days 8-11: Analyze (break down claims). Days 12-14: Evaluate (make judgments).",
    expectedOutcome: "Users can independently analyze and evaluate new claims by Day 14, not just recognize familiar examples.",
  },

  // ═══════════════════════════════════════════
  // §8.2 Mental Health Theoretical Stack (5)
  // ═══════════════════════════════════════════
  {
    id: "th-mh-01",
    name: "Mental Health Literacy Model",
    authors: "Jorm (1997, 2012)",
    year: "1997/2012",
    mvp: "mental-health",
    role: "primary",
    description: "Knowledge and beliefs about mental disorders that aid recognition, management, and prevention. Covers: recognition of disorders, knowledge of risk factors, knowledge of self-help, knowledge of professional help, attitudes that promote recognition and help-seeking.",
    causalMechanism: "Knowledge of mental health conditions → recognition of symptoms in self and others → reduced stigma → increased willingness to seek help.",
    evidence: "MHL interventions show 15-25% improvement in literacy scores (Wei et al., 2015 meta-analysis). Jorm's model validated across 10+ countries.",
    keyReference: "Jorm, A.F. (2012). Mental health literacy: Empowering the community. American Psychologist, 67(3), 231-243.",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    applicationInExercise: "Every MH exercise targets at least one of the 6 Jorm literacy domains: recognition, risk factors, self-help, professional help, attitudes, first aid.",
    expectedOutcome: "Users can correctly identify common mental health conditions and know where to seek appropriate help.",
  },
  {
    id: "th-mh-02",
    name: "PERMA Model",
    authors: "Seligman (2011)",
    year: "2011",
    mvp: "mental-health",
    role: "supporting",
    description: "Five pillars of wellbeing: Positive emotions, Engagement, Relationships, Meaning, Accomplishment. Exercises target each pillar.",
    causalMechanism: "Strengthening each PERMA pillar builds overall psychological wellbeing and resilience.",
    evidence: "PERMA model validated across cultures. Interventions targeting PERMA elements show significant wellbeing improvements.",
    keyReference: "Seligman, M.E.P. (2011). Flourish: A Visionary New Understanding. Atria.",
    exerciseDays: [5, 7, 9, 11, 13],
    applicationInExercise: "Selected exercises explicitly target one PERMA element and explain which pillar is being strengthened.",
    expectedOutcome: "Users understand wellbeing as multi-dimensional and can identify which areas they want to strengthen.",
  },
  {
    id: "th-mh-03",
    name: "Affect Labeling Theory",
    authors: "Lieberman et al. (2007)",
    year: "2007",
    mvp: "mental-health",
    role: "supporting",
    description: "Naming emotions reduces amygdala activation and emotional reactivity. Simply putting feelings into words has a regulatory effect.",
    causalMechanism: "Verbal labeling of emotions activates the right ventrolateral prefrontal cortex, which downregulates amygdala response → emotional clarity and reduced reactivity.",
    evidence: "fMRI studies showing amygdala activation decreases when participants label emotional images vs. simply viewing them (Lieberman et al., 2007).",
    keyReference: "Lieberman, M.D. et al. (2007). Putting feelings into words. Psychological Science, 18(5).",
    exerciseDays: [1, 3, 6, 10],
    applicationInExercise: "Emotional awareness exercises ask users to name and describe their feelings precisely rather than using vague terms.",
    expectedOutcome: "Users develop a richer emotional vocabulary and experience reduced emotional overwhelm.",
  },
  {
    id: "th-mh-04",
    name: "Contact Hypothesis / Stigma Reduction",
    authors: "Corrigan et al. (2012)",
    year: "2012",
    mvp: "mental-health",
    role: "supporting",
    description: "Contact with real stories (scenario-based) reduces prejudice toward mental illness. Even vicarious contact through stories can reduce stigma.",
    causalMechanism: "Exposure to personal narratives of people with mental health conditions → increased empathy → reduced stereotyping → reduced social distance.",
    evidence: "Meta-analysis showing contact-based interventions most effective for stigma reduction (Corrigan et al., 2012).",
    keyReference: "Corrigan, P.W. et al. (2012). Challenging the public stigma of mental illness. Psychiatric Services.",
    exerciseDays: [4, 8, 12],
    applicationInExercise: "Stigma reduction scenarios present realistic stories that humanize mental health experiences.",
    expectedOutcome: "Users show reduced social distance and more supportive attitudes toward people with mental health conditions.",
  },
  {
    id: "th-mh-05",
    name: "Health Belief Model",
    authors: "Rosenstock (1974)",
    year: "1974",
    mvp: "mental-health",
    role: "design",
    description: "Help-seeking behavior is influenced by perceived susceptibility, severity, benefits, and barriers. Exercises address each of these.",
    causalMechanism: "Exercises address perceived susceptibility ('this could affect me'), severity ('this matters'), benefits ('help works'), and barriers ('I can access help') → increased help-seeking intention.",
    evidence: "HBM validated across health behaviors. Applied to mental health help-seeking by Gulliver et al. (2010).",
    keyReference: "Rosenstock, I.M. (1974). Historical Origins of the Health Belief Model. Health Education Monographs.",
    exerciseDays: [2, 5, 9, 14],
    applicationInExercise: "Help-seeking exercises explicitly address the four HBM constructs to remove barriers to professional help.",
    expectedOutcome: "Users recognize that help-seeking is a strength, identify accessible resources, and reduce perceived barriers.",
  },

  // ═══════════════════════════════════════════
  // §8.3 Religion Hub Theoretical Stack (5)
  // ═══════════════════════════════════════════
  {
    id: "th-rh-01",
    name: "Religious Coping Theory",
    authors: "Pargament (1997, 2011)",
    year: "1997/2011",
    mvp: "religion-hub",
    role: "primary",
    description: "Religion as a meaning-making resource with two patterns: positive coping (seeking spiritual connection, meaning, comfort) and negative coping (feeling punished by God, questioning faith, interpersonal religious discontent).",
    causalMechanism: "Structured reflection promotes positive coping patterns (seeking connection, meaning, support) while awareness of negative coping patterns (punishment, guilt, abandonment) prevents psychological harm.",
    evidence: "Brief RCOPE: positive coping correlates r=0.3-0.5 with better adjustment. Validated in 100+ studies globally including Muslim populations (Pargament et al., 2011).",
    keyReference: "Pargament, K.I. (2011). Spiritually Integrated Psychotherapy. Guilford Press.",
    exerciseDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    applicationInExercise: "Every RH exercise is grounded in the positive/negative coping distinction. Users practice identifying and strengthening positive patterns.",
    expectedOutcome: "Users can distinguish positive from negative religious coping and consciously choose constructive patterns.",
  },
  {
    id: "th-rh-02",
    name: "Meaning-Making Model",
    authors: "Park (2010)",
    year: "2010",
    mvp: "religion-hub",
    role: "supporting",
    description: "How people use religion to make meaning of stressful events. When situational meaning conflicts with global meaning, people engage in meaning-making processes to restore coherence.",
    causalMechanism: "Stressful events create meaning discrepancy → religion provides framework for reappraisal, benefit-finding, and identity continuity → restored sense of coherence.",
    evidence: "Park's review of 150+ studies confirmed meaning-making as a key mediator between stress and adjustment (Park, 2010).",
    keyReference: "Park, C.L. (2010). Making sense of the meaning literature. Psychological Bulletin, 136(2), 257-301.",
    exerciseDays: [3, 6, 9, 12, 14],
    applicationInExercise: "Meaning-making reflection exercises guide users through structured reappraisal of challenging life events.",
    expectedOutcome: "Users develop healthy meaning-making skills without requiring certainty or eliminating distress.",
  },
  {
    id: "th-rh-03",
    name: "Intrinsic vs. Extrinsic Religiosity",
    authors: "Allport & Ross (1967)",
    year: "1967",
    mvp: "religion-hub",
    role: "supporting",
    description: "Distinguishing genuine spiritual engagement (intrinsic: religion as end) from instrumental religious behavior (extrinsic: religion as means to social/personal goals).",
    causalMechanism: "Awareness of the intrinsic/extrinsic distinction helps users reflect on their motivations and develop more authentic spiritual engagement.",
    evidence: "Allport's framework remains foundational in psychology of religion. Intrinsic religiosity consistently correlates with better mental health outcomes.",
    keyReference: "Allport, G.W. & Ross, J.M. (1967). Personal religious orientation and prejudice. JPSP, 5(4).",
    exerciseDays: [4, 7, 11],
    applicationInExercise: "Exercises help users reflect on whether their religious practices are intrinsically motivated or serving external purposes.",
    expectedOutcome: "Users develop awareness of their religious motivations without judgment, leading to more authentic engagement.",
  },
  {
    id: "th-rh-04",
    name: "Mindfulness-Based Interventions",
    authors: "Kabat-Zinn (1990)",
    year: "1990",
    mvp: "religion-hub",
    role: "skill",
    description: "Contemplative practices validated across religious traditions. Mindful awareness of thoughts, feelings, and spiritual experiences without immediate judgment.",
    causalMechanism: "Present-moment awareness reduces rumination and emotional reactivity → more intentional spiritual engagement → better coping outcomes.",
    evidence: "Extensive evidence base for mindfulness-based interventions across clinical and non-clinical populations.",
    keyReference: "Kabat-Zinn, J. (1990). Full Catastrophe Living. Bantam.",
    exerciseDays: [2, 5, 8, 10, 13],
    applicationInExercise: "Guided contemplative exercises that are compatible with all faith traditions, focusing on awareness rather than doctrine.",
    expectedOutcome: "Users develop contemplative skills that enhance their existing spiritual practices without conflicting with their beliefs.",
  },
  {
    id: "th-rh-05",
    name: "Spiritual Bypass Model",
    authors: "Welwood (1984); Masters (2010)",
    year: "1984/2010",
    mvp: "religion-hub",
    role: "risk",
    description: "Identifying when religious practice is used to avoid psychological work. Spiritual bypassing uses spiritual ideas and practices to sidestep unresolved emotional issues.",
    causalMechanism: "Awareness of spiritual bypassing patterns → recognition of avoidance → willingness to address underlying psychological needs alongside spiritual practice.",
    evidence: "Masters (2010) documented specific bypassing patterns. Clinical literature confirms the importance of addressing spiritual bypassing in therapy.",
    keyReference: "Masters, R.A. (2010). Spiritual Bypassing. North Atlantic Books.",
    exerciseDays: [6, 10, 14],
    applicationInExercise: "Specific exercises help users recognize spiritual bypassing patterns in themselves and others, with compassionate framing.",
    expectedOutcome: "Users can identify when spiritual practices are being used to avoid necessary psychological work.",
  },
];

/**
 * Get all theories for a specific MVP
 */
export function getTheoriesByMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): TheoryConnection[] {
  return THEORY_CONNECTIONS.filter((t) => t.mvp === mvp);
}

/**
 * Get theories relevant to a specific exercise day within an MVP
 */
export function getTheoriesForExercise(mvp: "deepreal" | "mental-health" | "religion-hub", day: number): TheoryConnection[] {
  return THEORY_CONNECTIONS.filter((t) => t.mvp === mvp && t.exerciseDays.includes(day));
}

/**
 * Get the primary theory for an MVP
 */
export function getPrimaryTheory(mvp: "deepreal" | "mental-health" | "religion-hub"): TheoryConnection | undefined {
  return THEORY_CONNECTIONS.find((t) => t.mvp === mvp && t.role === "primary");
}
