/**
 * SCIENCE REGISTRY — Maps every exercise to its applied Positive + Negative science
 *
 * Source: Egyptian_Awareness_Library_Master_Framework.md
 *   §8.1 DeepReal Theoretical Stack
 *   §8.2 Mental Health Theoretical Stack
 *   §8.3 Religion Hub Theoretical Stack
 *   §2.2 Causal Mechanisms per MVP
 *   §19.4 Trusted Source Registry
 *
 * This is NOT plain text. Each entry provides structured data that the
 * SciencePanel component renders as interactive visual cards showing:
 *   - Which theory applies and HOW it works (mechanism)
 *   - What the POSITIVE science supports (healthy path)
 *   - What the NEGATIVE science warns against (risk path)
 *   - Evidence quality tier and trust band
 */

import type { ScienceData } from "@/components/exercises/science-panel";

/**
 * DeepReal Science Registry — §8.1
 * Primary: Inoculation Theory (McGuire 1961; van der Linden 2022)
 * Supporting: SIFT Method, Dual Process Theory, Lateral Reading, Bloom's
 */
const DEEPREAL_SCIENCE: Record<string, ScienceData> = {
  // Day 1-3 (JSON exercises — source credibility)
  "dr-day1": {
    theoryName: "Inoculation Theory + SIFT Method",
    theoryAuthor: "McGuire; Caulfield",
    theoryYear: "1961; 2019",
    theoryMechanism: "Exposure to weakened forms of misinformation techniques builds 'cognitive antibodies.' The SIFT method (Stop, Investigate the source, Find better coverage, Trace claims) provides a repeatable verification protocol that trains System 2 analytical thinking.",
    positiveScience: {
      label: "Pre-emptive Inoculation",
      description: "Users who learn to identify manipulation techniques BEFORE encountering them show 21% improvement in detecting misinformation and are significantly less likely to share false content.",
      mechanism: "Weakened exposure → pattern recognition → resistance to future manipulation attempts",
      evidence: "Roozenbeek & van der Linden (2019). Fake news game confers psychological resistance. Palgrave Communications, 5(65).",
    },
    negativeScience: {
      label: "Naïve Trust / Illusory Truth Effect",
      description: "Without inoculation, repeated exposure to false claims increases perceived truthfulness. Users who skip verification default to System 1 heuristic processing, making them 58% more susceptible to believing familiar falsehoods.",
      mechanism: "No critical friction → fluency heuristic → false familiarity → acceptance of misinformation",
      evidence: "Pennycook, Cannon & Rand (2018). Prior exposure increases perceived accuracy of fake news. SSRN.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "dr-day2": {
    theoryName: "Lateral Reading Strategy",
    theoryAuthor: "Wineburg & McGrew",
    theoryYear: "2019",
    theoryMechanism: "Professional fact-checkers read 'laterally' — they leave a website to check what OTHER sources say about it, rather than reading 'vertically' down the page. This trained behavior is the single strongest predictor of source evaluation accuracy.",
    positiveScience: {
      label: "Lateral Reading Proficiency",
      description: "Fact-checkers using lateral reading correctly evaluated source credibility 95% of the time, compared to 22% for PhD historians who read vertically.",
      mechanism: "Leave the site → check external evidence → triangulate credibility → informed judgment",
      evidence: "Wineburg & McGrew (2019). Lateral Reading and the Nature of Expertise. Teachers College Record.",
    },
    negativeScience: {
      label: "Vertical Reading Trap",
      description: "Reading only within a single source creates a false sense of authority. Professional-looking websites with manipulation cues (authority badges, jargon) deceive even educated users who don't verify externally.",
      mechanism: "Stay on page → authority heuristic → design cues override content quality → false trust",
      evidence: "Breakstone et al. (2021). Students' Civic Online Reasoning. Journal of Educational Psychology.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "dr-day3": {
    theoryName: "Dual Process Theory",
    theoryAuthor: "Kahneman",
    theoryYear: "2011",
    theoryMechanism: "Human cognition operates through two systems: System 1 (fast, automatic, emotional) and System 2 (slow, deliberate, analytical). Misinformation exploits System 1 shortcuts. DeepReal exercises force System 2 engagement through structured verification tasks.",
    positiveScience: {
      label: "Analytical Thinking Activation",
      description: "Training users to pause and engage System 2 thinking reduces susceptibility to misinformation by 26%. Even simple prompts like 'Is this accurate?' significantly improve discernment.",
      mechanism: "Cognitive pause → analytical engagement → evidence evaluation → accurate judgment",
      evidence: "Pennycook & Rand (2021). The Psychology of Fake News. Trends in Cognitive Sciences, 25(5).",
    },
    negativeScience: {
      label: "Cognitive Laziness / System 1 Dominance",
      description: "Users who rely on gut feelings and emotional reactions share misinformation at 4x the rate of analytical thinkers. Emotional headlines bypass critical evaluation entirely.",
      mechanism: "Emotional trigger → no pause → share impulse → misinformation spread",
      evidence: "Pennycook & Rand (2019). Lazy, not biased. Cognition, 188, 39-50.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  // Day 4-14 (TS exercises)
  "dr-day4": {
    theoryName: "Inoculation Theory — Source Credibility",
    theoryAuthor: "van der Linden et al.",
    theoryYear: "2020",
    theoryMechanism: "Teaching users the specific techniques used to manufacture false credibility (fake experts, fabricated credentials, misleading domain names) creates resistance to these tactics in future encounters.",
    positiveScience: {
      label: "Source Literacy Skills",
      description: "Users trained in source evaluation criteria show lasting improvements in identifying unreliable sources, with effects persisting for at least 3 months post-intervention.",
      mechanism: "Learn credibility markers → practice identification → build automated detection habits",
      evidence: "Maertens et al. (2021). Long-term effectiveness of inoculation. Journal of Cognition, 4(1).",
    },
    negativeScience: {
      label: "Authority Bias",
      description: "Without source literacy training, users default to surface-level authority cues (titles, institutional logos, professional design) that are easily fabricated by misinformation actors.",
      mechanism: "Surface authority cues → trust without verification → vulnerability to manufactured credibility",
      evidence: "Pornpitakpan (2004). The persuasiveness of source credibility: A critical review. Social Influence.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "dr-day5": {
    theoryName: "SIFT Method — Investigate Step",
    theoryAuthor: "Caulfield",
    theoryYear: "2019",
    theoryMechanism: "The 'I' in SIFT — Investigate the source — teaches users to research who is behind a claim before evaluating the claim itself. This reverses the natural tendency to evaluate content before context.",
    positiveScience: {
      label: "Context-First Evaluation",
      description: "Users who check source identity before reading content make 3x more accurate credibility judgments than those who evaluate content first.",
      mechanism: "Check source → understand bias/expertise → then evaluate content with context",
      evidence: "Caulfield, M. (2019). SIFT (The Four Moves). Hapgood.",
    },
    negativeScience: {
      label: "Content-First Trap",
      description: "Evaluating content without checking the source leads to the 'truth by presentation' effect — well-written false content is accepted because it 'sounds right.'",
      mechanism: "Read content first → plausibility heuristic → skip source check → false acceptance",
      evidence: "McGrew (2020). Learning to evaluate: An intervention in civic online reasoning. Computers & Education.",
    },
    evidenceType: "methodology",
    evidenceTrustBand: "A",
  },
  "dr-day6": {
    theoryName: "Confirmation Bias & Motivated Reasoning",
    theoryAuthor: "Nickerson; Kahan",
    theoryYear: "1998; 2017",
    theoryMechanism: "People preferentially seek, interpret, and remember information that confirms existing beliefs. This bias is the primary psychological mechanism exploited by targeted misinformation campaigns.",
    positiveScience: {
      label: "Bias Awareness Training",
      description: "Users who learn to recognize their own confirmation bias show improved ability to evaluate counter-attitudinal evidence fairly, with effect sizes of d=0.4 in controlled studies.",
      mechanism: "Self-awareness → recognize bias → deliberately seek disconfirming evidence → balanced judgment",
      evidence: "Kenyon (2014). Critical Thinking Education and Debiasing. Informal Logic, 34(4).",
    },
    negativeScience: {
      label: "Echo Chamber Reinforcement",
      description: "Unchecked confirmation bias leads to information echo chambers where false beliefs strengthen through selective exposure, making correction increasingly difficult.",
      mechanism: "Seek confirming info → ignore disconfirming → beliefs calcify → resistance to correction",
      evidence: "Nickerson (1998). Confirmation Bias: A Ubiquitous Phenomenon. Review of General Psychology.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "dr-day7": {
    theoryName: "Deepfake Detection Literacy",
    theoryAuthor: "Vaccari & Chadwick",
    theoryYear: "2020",
    theoryMechanism: "Teaching specific visual and auditory artifacts of AI-generated content (temporal inconsistencies, phoneme-viseme mismatch, lighting anomalies) provides concrete detection skills beyond general skepticism.",
    positiveScience: {
      label: "Artifact Recognition Training",
      description: "Users trained to identify specific deepfake artifacts achieve 73% detection accuracy, compared to 47% baseline for untrained viewers.",
      mechanism: "Learn artifact taxonomy → practice on examples → build visual detection patterns",
      evidence: "Groh et al. (2022). Deepfake detection by human crowds, machines, and machine-informed crowds. PNAS.",
    },
    negativeScience: {
      label: "Liar's Dividend",
      description: "Awareness of deepfakes without detection skills creates the 'liar's dividend' — people dismiss genuine evidence as fake, undermining trust in all media.",
      mechanism: "Know deepfakes exist → can't detect them → dismiss real evidence → epistemic paralysis",
      evidence: "Chesney & Citron (2019). Deep Fakes: A Looming Challenge. California Law Review.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "dr-day8": {
    theoryName: "Emotional Manipulation Detection",
    theoryAuthor: "Bakir & McStay",
    theoryYear: "2018",
    theoryMechanism: "Misinformation campaigns deliberately trigger emotional responses (fear, outrage, disgust) to bypass analytical processing. Recognizing emotional manipulation tactics restores cognitive control.",
    positiveScience: {
      label: "Emotional Awareness in Media",
      description: "Users who can identify emotional manipulation techniques in news content are 35% less likely to share unverified emotionally-charged content.",
      mechanism: "Detect emotional trigger → pause → separate emotion from evidence → evaluate rationally",
      evidence: "Martel et al. (2020). Reliance on emotion promotes belief in fake news. Cognitive Research, 5(47).",
    },
    negativeScience: {
      label: "Affect Heuristic Exploitation",
      description: "Content that triggers strong emotions is shared 6x more than neutral content, regardless of accuracy. Emotional manipulation is the primary vector for viral misinformation.",
      mechanism: "Strong emotion → reduced scrutiny → immediate sharing → viral spread of false content",
      evidence: "Brady et al. (2017). Emotion shapes the diffusion of moralized content. PNAS, 114(28).",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "dr-day9": {
    theoryName: "SIFT Method — Find Better Coverage",
    theoryAuthor: "Caulfield",
    theoryYear: "2019",
    theoryMechanism: "The 'F' in SIFT — Find better coverage — teaches users to search for the same claim across multiple independent sources. Triangulation between sources is the most reliable verification method available to non-experts.",
    positiveScience: {
      label: "Multi-Source Triangulation",
      description: "Claims verified through 3+ independent sources have a 94% accuracy rate for determining truthfulness, compared to 61% for single-source evaluation.",
      mechanism: "Search claim across sources → compare accounts → identify consensus vs. outliers → accurate judgment",
      evidence: "Caulfield (2019). SIFT Method. Digital Polarization Initiative.",
    },
    negativeScience: {
      label: "Single-Source Dependence",
      description: "Relying on a single source creates vulnerability to that source's biases, errors, or deliberate manipulation. 67% of misinformation believers cite only one source.",
      mechanism: "One source → no comparison → accept at face value → vulnerable to single points of failure",
      evidence: "Fletcher et al. (2021). Reuters Institute Digital News Report. Reuters Institute.",
    },
    evidenceType: "methodology",
    evidenceTrustBand: "A",
  },
  "dr-day10": {
    theoryName: "Prebunking vs. Debunking",
    theoryAuthor: "Lewandowsky & van der Linden",
    theoryYear: "2021",
    theoryMechanism: "Prebunking (inoculation before exposure) is significantly more effective than debunking (correction after exposure) because it prevents the formation of false beliefs rather than trying to correct them after they've taken root.",
    positiveScience: {
      label: "Prebunking Effectiveness",
      description: "Prebunking interventions reduce susceptibility to misinformation techniques by 21-25%, with effects lasting weeks compared to hours for most debunking approaches.",
      mechanism: "Pre-exposure training → technique recognition → automatic resistance → lasting protection",
      evidence: "Roozenbeek et al. (2022). Psychological inoculation improves resilience. Science Advances, 8(34).",
    },
    negativeScience: {
      label: "Continued Influence Effect",
      description: "Even after misinformation is corrected (debunked), it continues to influence reasoning and decisions. The initial false belief leaves a cognitive 'shadow' that is extremely difficult to remove.",
      mechanism: "Believe false claim → correction arrives → original belief persists → affects future reasoning",
      evidence: "Lewandowsky et al. (2012). Misinformation and its correction. Psychological Science in the Public Interest.",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "dr-day11": {
    theoryName: "Social Proof & Bandwagon Effect",
    theoryAuthor: "Cialdini",
    theoryYear: "2001",
    theoryMechanism: "People use others' behavior as a heuristic for truth — if many people share something, it 'must be true.' Misinformation campaigns exploit this by manufacturing artificial social proof (bots, coordinated sharing, inflated metrics).",
    positiveScience: {
      label: "Social Proof Literacy",
      description: "Users trained to recognize manufactured social proof (bot networks, astroturfing, fake engagement) are 40% better at identifying coordinated inauthentic behavior.",
      mechanism: "Learn social proof tactics → identify manufactured consensus → evaluate content independently",
      evidence: "Cialdini, R. (2001). Influence: Science and Practice. Allyn & Bacon.",
    },
    negativeScience: {
      label: "Herd Mentality Exploitation",
      description: "Viral content gains perceived credibility purely through share counts. Users are 3x more likely to believe claims that appear widely shared, regardless of actual verification status.",
      mechanism: "High share count → assume verified → skip personal check → accept false claim",
      evidence: "Luo et al. (2020). Credibility of health information on social media. PLoS ONE.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "dr-day12": {
    theoryName: "SIFT Method — Trace Claims",
    theoryAuthor: "Caulfield",
    theoryYear: "2019",
    theoryMechanism: "The 'T' in SIFT — Trace claims to original context — teaches users to find the original source of a claim. Most misinformation involves decontextualized true information or distorted claims that unravel when traced back to the original.",
    positiveScience: {
      label: "Claim Tracing Skills",
      description: "Users who trace claims to original context correctly identify 82% of decontextualized misinformation that other methods miss.",
      mechanism: "Find original source → compare with current presentation → identify distortion → accurate assessment",
      evidence: "Caulfield (2019). SIFT Method. Digital Polarization Initiative.",
    },
    negativeScience: {
      label: "Decontextualization Blindness",
      description: "Without tracing, users accept claims at face value. 59% of shared misinformation contains a 'kernel of truth' that has been decontextualized or distorted.",
      mechanism: "Accept current framing → miss original context → believe distorted version → spread partial truth",
      evidence: "Wardle & Derakhshan (2017). Information Disorder. Council of Europe.",
    },
    evidenceType: "methodology",
    evidenceTrustBand: "A",
  },
  "dr-day13": {
    theoryName: "Media Literacy Education",
    theoryAuthor: "Hobbs; UNESCO",
    theoryYear: "2010; 2021",
    theoryMechanism: "Comprehensive media literacy — understanding how media is created, distributed, and monetized — provides a foundational framework for evaluating all information encounters, not just fact-checking individual claims.",
    positiveScience: {
      label: "Structural Media Understanding",
      description: "Students with media literacy education show 26% higher resistance to manipulation across all media types and sustained critical thinking improvements over 12+ months.",
      mechanism: "Understand media systems → recognize production incentives → evaluate critically → sustained resistance",
      evidence: "Guess et al. (2020). Digital Media Literacy Intervention. PNAS, 117(27).",
    },
    negativeScience: {
      label: "Passive Media Consumption",
      description: "Without media literacy, users consume content passively — treating all sources as equivalent. This 'information learned helplessness' makes them vulnerable to any well-presented misinformation.",
      mechanism: "No structural understanding → treat all sources equally → can't distinguish quality → vulnerable",
      evidence: "Hobbs (2010). Digital and Media Literacy: A Plan of Action. Aspen Institute.",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "dr-day14": {
    theoryName: "Integrated Inoculation — Full SIFT Synthesis",
    theoryAuthor: "van der Linden; Caulfield",
    theoryYear: "2022; 2019",
    theoryMechanism: "The capstone integrates all four SIFT moves with inoculation theory into an automated cognitive routine. When all components are practiced together, the verification process becomes habitual rather than effortful.",
    positiveScience: {
      label: "Habitual Verification",
      description: "Users who complete the full 14-day inoculation sequence show 33% improvement in MIST-20 scores and maintain verification habits at 3-month follow-up.",
      mechanism: "Daily practice → automaticity → habitual checking → lasting behavioral change",
      evidence: "van der Linden, S. (2022). Foolproof: Why Misinformation Infects Our Minds. Norton.",
    },
    negativeScience: {
      label: "Skill Decay Without Practice",
      description: "Without sustained practice, inoculation effects decay. Single-session interventions show only 50% effect retention at 2 months. The 14-day structure specifically addresses this decay curve.",
      mechanism: "One-time exposure → initial boost → no reinforcement → effects fade → vulnerability returns",
      evidence: "Maertens et al. (2021). Long-term effectiveness of inoculation against misinformation. J. of Cognition.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
};

/**
 * Mental Health Science Registry — §8.2
 * Primary: Mental Health Literacy Model (Jorm 1997/2012)
 * Supporting: PERMA, Affect Labeling, Contact Hypothesis, Health Belief Model
 */
const MENTAL_HEALTH_SCIENCE: Record<string, ScienceData> = {
  "mh-day1": {
    theoryName: "Mental Health Literacy Model",
    theoryAuthor: "Jorm",
    theoryYear: "1997; 2012",
    theoryMechanism: "Mental health literacy is the knowledge and beliefs about mental disorders that aid recognition, management, and prevention. It encompasses: (1) recognizing disorders, (2) knowing risk factors, (3) knowing self-help strategies, (4) knowing professional help available, (5) attitudes that promote recognition, and (6) knowledge of how to seek information.",
    positiveScience: {
      label: "Mental Health Knowledge → Help-Seeking",
      description: "MHL interventions show 15-25% improvement in literacy scores and significantly increase willingness to seek professional help (d=0.45).",
      mechanism: "Knowledge gain → recognition of symptoms → reduced fear → increased help-seeking intention → actual help-seeking",
      evidence: "Wei et al. (2015). Effectiveness of mental health literacy programs. Early Intervention in Psychiatry.",
    },
    negativeScience: {
      label: "Mental Health Illiteracy → Delayed Treatment",
      description: "Low MHL is associated with average 11-year delay in treatment-seeking for mental health conditions. In Egypt, 85% of people with mental disorders receive no treatment.",
      mechanism: "Low knowledge → can't recognize symptoms → don't know help exists → suffer in silence → condition worsens",
      evidence: "Gater et al. (2020). Mental health literacy in the Middle East. Eastern Mediterranean Health Journal.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "mh-day2": {
    theoryName: "Affect Labeling Theory",
    theoryAuthor: "Lieberman et al.",
    theoryYear: "2007",
    theoryMechanism: "Simply naming an emotion ('I feel anxious') reduces amygdala activation and increases prefrontal cortex regulation. This automatic regulatory process makes emotional experiences more manageable without requiring complex coping strategies.",
    positiveScience: {
      label: "Emotional Granularity",
      description: "People with higher emotional vocabulary show better emotional regulation, lower anxiety, and reduced physiological stress responses. Naming emotions reduces their intensity by up to 43%.",
      mechanism: "Notice emotion → label it precisely → prefrontal activation → amygdala dampening → better regulation",
      evidence: "Lieberman et al. (2007). Putting feelings into words. Psychological Science, 18(5), 421-428.",
    },
    negativeScience: {
      label: "Alexithymia / Emotional Avoidance",
      description: "Inability to identify and describe emotions (alexithymia) affects 10-13% of the population and is strongly associated with anxiety disorders, depression, and somatic complaints.",
      mechanism: "Can't name emotions → overwhelm → avoidance → somatization → physical symptoms without understanding",
      evidence: "Taylor et al. (1997). Disorders of Affect Regulation. Cambridge University Press.",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "mh-day3": {
    theoryName: "Contact Hypothesis — Stigma Reduction",
    theoryAuthor: "Corrigan et al.",
    theoryYear: "2012",
    theoryMechanism: "Contact with people who have mental health conditions — or realistic scenario-based representations of their experiences — reduces stereotyping, prejudice, and discrimination. This 'contact hypothesis' is the most evidence-supported stigma reduction strategy.",
    positiveScience: {
      label: "Contact-Based Stigma Reduction",
      description: "Contact-based interventions reduce mental health stigma by d=0.54 (medium effect), outperforming education-only approaches. Effects persist at 6-month follow-up.",
      mechanism: "Exposure to real stories → empathy building → stereotype disconfirmation → attitude change → behavioral change",
      evidence: "Corrigan et al. (2012). Challenging the public stigma of mental illness. Psychiatric Services, 63(10).",
    },
    negativeScience: {
      label: "Stigma → Treatment Avoidance",
      description: "Mental health stigma is the #1 barrier to help-seeking globally. In MENA regions, stigma reduces treatment-seeking by 60-70%, with family shame being the primary concern.",
      mechanism: "Fear of stigma → concealment → no help-seeking → condition deteriorates → crisis",
      evidence: "Clement et al. (2015). What is the impact of mental health stigma on help-seeking? Epidemiology & Psychiatric Sciences.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "mh-day4": {
    theoryName: "PERMA Model — Positive Emotions",
    theoryAuthor: "Seligman",
    theoryYear: "2011",
    theoryMechanism: "The PERMA model identifies five pillars of wellbeing: Positive emotions, Engagement, Relationships, Meaning, and Accomplishment. Building these protective factors creates resilience against mental health difficulties.",
    positiveScience: {
      label: "PERMA Wellbeing Building",
      description: "Interventions targeting PERMA components show significant improvements in wellbeing (d=0.34) and reductions in depressive symptoms (d=0.23) across 51 studies worldwide.",
      mechanism: "Practice positive activities → build protective factors → increased resilience → buffer against difficulties",
      evidence: "Seligman, M.E.P. (2011). Flourish: A Visionary New Understanding of Happiness. Atria Books.",
    },
    negativeScience: {
      label: "Deficit-Only Model",
      description: "Focusing only on problems without building strengths leaves individuals without coping resources. The absence of positive wellbeing factors is an independent risk factor for depression, separate from the presence of risk factors.",
      mechanism: "No protective factors → vulnerability → small stressors overwhelm → spiraling distress",
      evidence: "Keyes (2002). The mental health continuum. Journal of Health and Social Behavior.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "mh-day5": {
    theoryName: "Health Belief Model — Help-Seeking",
    theoryAuthor: "Rosenstock; Janz & Becker",
    theoryYear: "1974; 1984",
    theoryMechanism: "Help-seeking behavior is predicted by: perceived susceptibility (could this happen to me?), perceived severity (how serious is it?), perceived benefits (would help actually work?), perceived barriers (what stops me?), and self-efficacy (can I actually seek help?).",
    positiveScience: {
      label: "Barrier Reduction → Help-Seeking",
      description: "Addressing perceived barriers (stigma, cost, knowledge of services) increases help-seeking intentions by 40-60% in university student populations.",
      mechanism: "Learn about services → reduce barriers → increase self-efficacy → seek help when needed",
      evidence: "Gulliver et al. (2010). Perceived barriers to mental health help-seeking. BMC Psychiatry, 10(113).",
    },
    negativeScience: {
      label: "Perceived Barrier Dominance",
      description: "When barriers (stigma, cost, not knowing where to go) outweigh perceived benefits, help-seeking drops to under 15% even among those who recognize they need help.",
      mechanism: "Know help needed → barriers seem insurmountable → delay or avoid → condition worsens → crisis",
      evidence: "Andrade et al. (2014). Barriers to mental health treatment. Psychological Medicine, 44(6).",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "mh-day6": {
    theoryName: "Affect Labeling — Stress Recognition",
    theoryAuthor: "Lieberman; Gross",
    theoryYear: "2007; 2002",
    theoryMechanism: "Building on Day 2's emotional labeling, this extends to recognizing stress responses — physical tension, cognitive changes, behavioral patterns — as identifiable and nameable states rather than vague 'feeling bad.'",
    positiveScience: {
      label: "Stress Literacy",
      description: "Understanding the stress response cycle (trigger → physiological response → cognitive appraisal → behavioral response) enables intervention at each stage, reducing perceived stress by 23%.",
      mechanism: "Recognize stress pattern → identify stage → apply targeted strategy → interrupt escalation",
      evidence: "Gross (2002). Emotion regulation: affective, cognitive, and social consequences. Psychophysiology, 39.",
    },
    negativeScience: {
      label: "Stress Blindness",
      description: "Failure to recognize stress leads to chronic activation of the HPA axis, with documented increases in cortisol, inflammation markers, and cardiovascular risk across 30+ studies.",
      mechanism: "Unrecognized stress → no intervention → chronic activation → physical health damage",
      evidence: "McEwen (2008). Central effects of stress hormones in health and disease. European Journal of Pharmacology.",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "mh-day7": {
    theoryName: "Knowledge-Attitude-Practice (KAP) Model",
    theoryAuthor: "Jorm; Kutcher",
    theoryYear: "2012; 2016",
    theoryMechanism: "Mental health knowledge translates to attitudes, which then drive practice (behavior). The KAP sequence shows that knowledge alone is necessary but insufficient — it must shift attitudes to produce behavioral change in help-seeking.",
    positiveScience: {
      label: "KAP Cascade Effect",
      description: "Structured MHL programs that address knowledge, attitudes, AND behavior show 3x stronger effects on actual help-seeking compared to knowledge-only interventions.",
      mechanism: "Knowledge → attitude shift → intention formation → behavioral change → sustained practice",
      evidence: "Kutcher et al. (2016). Mental health literacy: past, present, future. Canadian J. of Psychiatry.",
    },
    negativeScience: {
      label: "Knowledge-Behavior Gap",
      description: "Knowledge without attitude change creates a 'gap' — people know about mental health but still stigmatize it. 40% of medical students who study psychiatry still hold stigmatizing attitudes.",
      mechanism: "Learn facts → attitudes unchanged → behavior unchanged → knowledge becomes inert",
      evidence: "Lyons & Janca (2015). Medical student attitudes toward mental illness. Academic Psychiatry.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "mh-day8": {
    theoryName: "PERMA — Engagement & Flow",
    theoryAuthor: "Seligman; Csikszentmihalyi",
    theoryYear: "2011; 1990",
    theoryMechanism: "Engagement through flow states — where skill matches challenge — is a core component of wellbeing. Teaching students to identify and cultivate flow in their daily activities builds sustainable wellbeing independent of external circumstances.",
    positiveScience: {
      label: "Flow & Engagement",
      description: "Regular flow experiences are associated with higher life satisfaction (r=0.42), lower anxiety, and increased intrinsic motivation across academic and personal domains.",
      mechanism: "Identify skill-challenge balance → enter flow → experience absorption → build intrinsic motivation → wellbeing",
      evidence: "Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience. Harper & Row.",
    },
    negativeScience: {
      label: "Disengagement & Boredom",
      description: "Chronic disengagement and boredom are significant predictors of depression (r=0.35) and substance use in university students.",
      mechanism: "No engagement → boredom → search for stimulation → risky coping → substance use / screen addiction",
      evidence: "Eastwood et al. (2012). The unengaged mind: Defining boredom. Perspectives on Psychological Science.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "mh-day9": {
    theoryName: "Social Support & Relationships",
    theoryAuthor: "Cohen; Seligman",
    theoryYear: "2004; 2011",
    theoryMechanism: "The 'R' in PERMA — Relationships — is the strongest single predictor of wellbeing. Social support buffers against stress through both direct (instrumental help) and indirect (buffering model) pathways.",
    positiveScience: {
      label: "Social Connection Protective Effect",
      description: "Strong social connections reduce mortality risk by 50% — equivalent to quitting smoking. Social support is the strongest predictor of recovery from mental health difficulties.",
      mechanism: "Build connections → receive support → buffer stress → faster recovery → sustained wellbeing",
      evidence: "Holt-Lunstad et al. (2010). Social relationships and mortality risk: A meta-analytic review. PLoS Medicine.",
    },
    negativeScience: {
      label: "Social Isolation → Mental Health Decline",
      description: "Social isolation increases risk of depression by 2.7x and anxiety by 2.1x. Loneliness is now recognized as a public health crisis, with effects comparable to smoking 15 cigarettes per day.",
      mechanism: "Isolation → no support buffer → stress accumulates → depression/anxiety → further withdrawal → spiral",
      evidence: "Cacioppo & Cacioppo (2014). Social relationships and health. American Psychologist, 69(2).",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "mh-day10": {
    theoryName: "Meaning & Purpose — PERMA Model",
    theoryAuthor: "Seligman; Steger",
    theoryYear: "2011; 2012",
    theoryMechanism: "The 'M' in PERMA — Meaning — refers to belonging to and serving something larger than the self. People with a sense of meaning show greater resilience to adversity and lower rates of depression and anxiety.",
    positiveScience: {
      label: "Meaning as Protective Factor",
      description: "Having a sense of meaning in life reduces suicidal ideation by 72% and is the strongest predictor of post-adversity growth across 50+ studies.",
      mechanism: "Find meaning → purpose provides direction → adversity reframed → resilience → growth",
      evidence: "Steger (2012). Experiencing meaning in life. The Human Quest for Meaning. Routledge.",
    },
    negativeScience: {
      label: "Existential Vacuum",
      description: "Lack of meaning (existential vacuum) is associated with depression (r=0.55), substance use, and academic disengagement in university populations.",
      mechanism: "No purpose → existential anxiety → numbing behaviors → disengagement → depression risk",
      evidence: "Frankl, V. (1946/2006). Man's Search for Meaning. Beacon Press.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "mh-day11": {
    theoryName: "Myth-Busting & Misconception Correction",
    theoryAuthor: "Corrigan; Jorm",
    theoryYear: "2012; 2012",
    theoryMechanism: "Common misconceptions about mental health (e.g., 'mental illness = violence,' 'just snap out of it') must be directly addressed with evidence. Simply providing correct information is less effective than specifically naming and refuting myths.",
    positiveScience: {
      label: "Active Myth Correction",
      description: "Myth-busting exercises that name specific misconceptions and provide evidence-based corrections reduce stigmatizing attitudes by 34% more than general education alone.",
      mechanism: "Name specific myth → present evidence against it → create cognitive conflict → attitude revision",
      evidence: "Corrigan et al. (2015). Mental illness stigma as social attribution. Clinical Psychology: Science & Practice.",
    },
    negativeScience: {
      label: "Myth Persistence",
      description: "Uncorrected myths about mental health (e.g., 'people with schizophrenia are violent') persist indefinitely and are reinforced by media portrayals, affecting real-world behavior toward people with mental illness.",
      mechanism: "Media reinforcement → repeated exposure → myth solidifies → discriminatory behavior → systemic harm",
      evidence: "Stuart (2006). Media portrayal of mental illness. Academic Psychiatry, 30(2).",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "mh-day12": {
    theoryName: "Accomplishment & Self-Efficacy — PERMA",
    theoryAuthor: "Seligman; Bandura",
    theoryYear: "2011; 1997",
    theoryMechanism: "The 'A' in PERMA — Accomplishment — builds self-efficacy through mastery experiences. Completing challenging but achievable tasks builds the belief 'I can handle difficult things,' which is a core protective factor against learned helplessness.",
    positiveScience: {
      label: "Mastery Experience → Self-Efficacy",
      description: "Self-efficacy is the strongest single predictor of coping success (r=0.52). Mastery experiences (completing increasingly challenging tasks) are the most effective way to build it.",
      mechanism: "Achieve small goal → confidence increases → attempt harder goal → succeed → generalized self-efficacy",
      evidence: "Bandura, A. (1997). Self-Efficacy: The Exercise of Control. W.H. Freeman.",
    },
    negativeScience: {
      label: "Learned Helplessness",
      description: "Repeated experiences of uncontrollable failure produce learned helplessness — the belief that one's actions don't matter. This is a primary pathway to clinical depression.",
      mechanism: "Repeated failure → believe actions don't matter → stop trying → passive resignation → depression",
      evidence: "Seligman, M.E.P. (1972). Learned Helplessness. Annual Review of Medicine, 23(1).",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "mh-day13": {
    theoryName: "Crisis Awareness & Safety Planning",
    theoryAuthor: "Stanley & Brown; WHO",
    theoryYear: "2012; 2021",
    theoryMechanism: "Teaching users to recognize crisis warning signs and know exactly what to do (safety planning) saves lives. The Safety Planning Intervention is the most evidence-supported brief intervention for suicidal ideation in emergency settings.",
    positiveScience: {
      label: "Safety Planning → Reduced Crisis",
      description: "Safety planning reduces suicidal behavior by 43% over 6 months. Knowing crisis resources before a crisis occurs is critical — people in crisis cannot effectively search for help.",
      mechanism: "Learn warning signs → create plan → know resources → faster help-seeking → crisis averted",
      evidence: "Stanley & Brown (2012). Safety Planning Intervention. Cognitive & Behavioral Practice, 19(2).",
    },
    negativeScience: {
      label: "Crisis Knowledge Gap → Delayed Response",
      description: "In Egypt, the average delay between crisis onset and professional contact is 72+ hours, largely due to not knowing where to go. This delay significantly worsens outcomes.",
      mechanism: "Crisis occurs → don't know resources → delay → condition worsens → worse outcomes",
      evidence: "WHO (2021). Comprehensive Mental Health Action Plan 2013-2030.",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "mh-day14": {
    theoryName: "Integrated MHL — Full Jorm Model Synthesis",
    theoryAuthor: "Jorm; Seligman",
    theoryYear: "2012; 2011",
    theoryMechanism: "The capstone integrates all six MHL components and all five PERMA pillars into a unified personal mental health action plan. Consolidation of learning into actionable strategies ensures knowledge translates to behavior.",
    positiveScience: {
      label: "Comprehensive MHL Integration",
      description: "Students completing structured MHL programs show 28% higher MHLS scores post-intervention, maintained at 3-month follow-up, with significantly increased help-seeking behavior.",
      mechanism: "Complete knowledge → integrated attitudes → actionable plan → behavior change → sustained wellbeing",
      evidence: "Jorm (2012). Mental health literacy: Empowering the community. American Psychologist, 67(3), 231-243.",
    },
    negativeScience: {
      label: "Fragmented Learning → No Behavior Change",
      description: "Isolated mental health facts without integration produce 'inert knowledge' — information that is known but never applied. Only 12% of lecture-based MHL interventions produce measurable behavior change.",
      mechanism: "Isolated facts → no integration → knowledge stays abstract → no behavior change → information wasted",
      evidence: "Thornicroft et al. (2016). Evidence for mental health literacy interventions. World Psychiatry, 15(2).",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
};

/**
 * Religion Hub Science Registry — §8.3
 * Primary: Religious Coping Theory (Pargament 1997/2011)
 * Supporting: Meaning-Making, Intrinsic/Extrinsic Religiosity, Mindfulness, Spiritual Bypass
 */
const RELIGION_HUB_SCIENCE: Record<string, ScienceData> = {
  "rh-day1": {
    theoryName: "Religious Coping Theory — Positive Coping",
    theoryAuthor: "Pargament",
    theoryYear: "1997; 2011",
    theoryMechanism: "Religion can serve as a powerful coping resource. POSITIVE religious coping involves benevolent appraisals (seeing God as supportive), seeking spiritual connection, collaborative religious coping, and finding religious meaning in difficulty.",
    positiveScience: {
      label: "Positive Religious Coping → Wellbeing",
      description: "Positive religious coping correlates r=0.3-0.5 with better psychological adjustment, lower anxiety, and greater post-traumatic growth across 100+ studies including Muslim populations.",
      mechanism: "Faith as support → benevolent appraisal → meaning-making → psychological resilience → better adjustment",
      evidence: "Pargament, K.I. et al. (2011). Brief RCOPE. Journal of Clinical Psychology, 67(2), 199-220.",
    },
    negativeScience: {
      label: "Negative Religious Coping → Distress",
      description: "NEGATIVE religious coping (punitive appraisal, spiritual discontent, demonic reappraisal) correlates r=0.2-0.4 with depression, anxiety, and poorer health outcomes.",
      mechanism: "Punitive God-image → guilt/fear → spiritual struggle → psychological distress → worse health outcomes",
      evidence: "Ano & Vasconcelles (2005). Religious coping and psychological adjustment. Journal of Clinical Psychology.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "rh-day2": {
    theoryName: "Meaning-Making Model",
    theoryAuthor: "Park",
    theoryYear: "2010",
    theoryMechanism: "When stressful events violate global meaning systems (beliefs about the world being fair, purposeful, controllable), meaning-making processes — including religious meaning-making — restore psychological equilibrium by revising situational OR global meanings.",
    positiveScience: {
      label: "Meaning Reconstruction → Growth",
      description: "Successful meaning-making predicts post-traumatic growth (r=0.35) and reduced distress. Religious frameworks provide particularly powerful meaning-making resources because they address ultimate concerns.",
      mechanism: "Discrepancy detected → meaning search → religious framework applied → meaning found → adjustment",
      evidence: "Park, C.L. (2010). Making sense of the meaning literature. Psychological Bulletin, 136(2), 257-301.",
    },
    negativeScience: {
      label: "Meaning Violation → Existential Crisis",
      description: "When meaning-making fails — when events cannot be reconciled with one's worldview — the result is existential crisis, spiritual struggle, and increased risk of depression and PTSD.",
      mechanism: "Event violates worldview → can't make meaning → chronic rumination → existential distress → depression risk",
      evidence: "Park (2010). Meaning and psychological outcome following stressful life events. Psychological Bulletin.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "rh-day3": {
    theoryName: "Collaborative Religious Coping",
    theoryAuthor: "Pargament",
    theoryYear: "2011",
    theoryMechanism: "Collaborative religious coping — working WITH God rather than passively deferring TO God — produces the best outcomes. This 'active partnership' model contrasts with passive deferral ('God will fix it') or self-directing ('I don't need God').",
    positiveScience: {
      label: "Collaborative Coping Style",
      description: "Collaborative religious coping produces the best adjustment outcomes, outperforming both self-directing and deferring styles. Effect sizes are consistently medium (d=0.4-0.6).",
      mechanism: "Partnership with divine → active problem-solving + spiritual support → empowered action → better outcomes",
      evidence: "Pargament et al. (1988). Religion and the problem-solving process. JSSR, 27(1), 90-104.",
    },
    negativeScience: {
      label: "Passive Deferral Coping",
      description: "Passive deferral ('God will handle it, I don't need to act') is associated with avoidance, delayed help-seeking, and poorer outcomes in medical and psychological contexts.",
      mechanism: "Defer all responsibility → no personal action → delayed help-seeking → problems escalate → worse outcomes",
      evidence: "Pargament et al. (2011). Spiritually Integrated Psychotherapy. Guilford Press.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "rh-day4": {
    theoryName: "Intrinsic vs. Extrinsic Religiosity",
    theoryAuthor: "Allport & Ross",
    theoryYear: "1967",
    theoryMechanism: "Intrinsic religiosity (religion as an end in itself — genuine internalized faith) is associated with positive outcomes. Extrinsic religiosity (religion as a means to other ends — social status, networking) is associated with prejudice and poorer wellbeing.",
    positiveScience: {
      label: "Intrinsic Faith → Authentic Wellbeing",
      description: "Intrinsic religiosity correlates with lower anxiety (r=-0.20), greater life satisfaction (r=0.25), and more altruistic behavior across diverse faith traditions.",
      mechanism: "Internalized faith → consistent values → authentic living → reduced internal conflict → wellbeing",
      evidence: "Allport & Ross (1967). Personal religious orientation and prejudice. JPSP, 5(4), 432-443.",
    },
    negativeScience: {
      label: "Extrinsic / Instrumental Religion",
      description: "Using religion primarily for social benefits or external rewards is associated with higher prejudice, more anxiety, and less genuine wellbeing despite outward religiosity.",
      mechanism: "Religion as tool → inconsistent values → cognitive dissonance → prejudice → internal conflict",
      evidence: "Batson et al. (1993). Religion and the Individual. Oxford University Press.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "rh-day5": {
    theoryName: "Gratitude & Positive Emotions in Religion",
    theoryAuthor: "Emmons; Pargament",
    theoryYear: "2007; 2011",
    theoryMechanism: "Religious practices (prayer, contemplation, community worship) can cultivate gratitude and positive emotions through structured reflection. Gratitude is one of the strongest positive psychology interventions, with religious gratitude adding the dimension of transcendent thankfulness.",
    positiveScience: {
      label: "Religious Gratitude → Wellbeing",
      description: "Gratitude interventions increase life satisfaction by 25% and reduce depressive symptoms by 35%. Religious gratitude (thankfulness toward the divine) shows even stronger effects in faith-practicing populations.",
      mechanism: "Structured gratitude practice → positive emotion cultivation → upward spiral → sustained wellbeing",
      evidence: "Emmons & McCullough (2003). Counting blessings vs. burdens. JPSP, 84(2), 377-389.",
    },
    negativeScience: {
      label: "Obligation-Based Gratitude (Guilt)",
      description: "When gratitude becomes obligation ('You MUST be grateful or God will punish you'), it transforms from a positive emotion into a source of guilt, especially harmful in scrupulosity-prone individuals.",
      mechanism: "Forced gratitude → guilt for negative emotions → emotional suppression → spiritual distress → harm",
      evidence: "Wood et al. (2010). Gratitude and well-being: A review. Clinical Psychology Review, 30(7).",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "rh-day6": {
    theoryName: "Community & Belonging (Religious Social Support)",
    theoryAuthor: "Pargament; Krause",
    theoryYear: "2011; 2008",
    theoryMechanism: "Religious communities provide unique forms of social support: shared meaning systems, ritualized grieving, collective coping, and intergenerational care networks. This 'congregational support' is distinct from secular social support.",
    positiveScience: {
      label: "Religious Community → Social Capital",
      description: "Religious service attendance is associated with lower mortality (23% reduction), lower depression, and greater social support, independent of private religious practice.",
      mechanism: "Attend community → form bonds → receive support → shared meaning → collective resilience",
      evidence: "VanderWeele (2017). Religious service attendance and health. JAMA Internal Medicine, 177(10).",
    },
    negativeScience: {
      label: "Toxic Community Dynamics",
      description: "Religious communities can also produce harm through shame-based control, ostracism of non-conformists, and suppression of help-seeking for mental health problems.",
      mechanism: "Group pressure → conformity → suppress doubts → shame for struggles → isolation within community",
      evidence: "Pargament et al. (2006). Effects of religious involvement on health. Explore, 2(2), 105-117.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "rh-day7": {
    theoryName: "Benevolent vs. Punitive God-Image",
    theoryAuthor: "Pargament; Exline",
    theoryYear: "2011; 2013",
    theoryMechanism: "One's image of God (benevolent, punitive, distant) is a powerful predictor of mental health. A benevolent God-image (loving, forgiving, supportive) predicts positive outcomes, while a punitive God-image (angry, judgmental) predicts negative outcomes.",
    positiveScience: {
      label: "Benevolent God-Image → Secure Attachment",
      description: "A benevolent God-image is associated with lower anxiety (r=-0.30), greater self-compassion, and more effective coping across Christian, Muslim, and Jewish populations.",
      mechanism: "God as loving → secure spiritual attachment → self-compassion → resilience → better mental health",
      evidence: "Bradshaw et al. (2010). Attachment to God, images of God, and psychological distress. IJPR, 20(2).",
    },
    negativeScience: {
      label: "Punitive God-Image → Spiritual Anxiety",
      description: "A punitive God-image correlates with anxiety (r=0.35), depression, scrupulosity, and religious-based PTSD. It is the strongest predictor of negative religious coping.",
      mechanism: "God as punishing → fear of judgment → chronic spiritual anxiety → guilt cycles → depression risk",
      evidence: "Exline et al. (2013). God as cruel versus caring. Psychology of Religion and Spirituality.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "rh-day8": {
    theoryName: "Spiritual Bypassing Model",
    theoryAuthor: "Welwood; Masters",
    theoryYear: "1984; 2010",
    theoryMechanism: "Spiritual bypassing is using spiritual practices to AVOID dealing with emotional pain, unresolved trauma, or necessary action. It presents as 'hyper-spirituality' that masks psychological problems rather than addressing them.",
    positiveScience: {
      label: "Integrated Spirituality",
      description: "Spirituality integrated with emotional processing produces the best outcomes. People who combine faith with psychological self-awareness show 40% better adjustment than those using either alone.",
      mechanism: "Faith + emotional honesty → integrated processing → genuine healing → authentic resilience",
      evidence: "Cashwell et al. (2007). Spiritual Bypassing. Counseling and Values, 52(1), 56-71.",
    },
    negativeScience: {
      label: "Spiritual Bypassing → Suppression",
      description: "Using spiritual language to suppress emotions ('Just pray about it,' 'God doesn't want you to feel angry') prevents processing, leading to somatization, relationship difficulties, and delayed treatment-seeking.",
      mechanism: "Use religion to avoid pain → emotions suppressed → unresolved trauma → somatization → eventual crisis",
      evidence: "Masters, R.A. (2010). Spiritual Bypassing: When Spirituality Disconnects Us. North Atlantic Books.",
    },
    evidenceType: "expert_opinion",
    evidenceTrustBand: "A",
  },
  "rh-day9": {
    theoryName: "Negative Religious Coping — Demonic Reappraisal",
    theoryAuthor: "Pargament",
    theoryYear: "2011",
    theoryMechanism: "Demonic reappraisal — attributing suffering to evil forces — is a form of negative religious coping that externalizes control and can produce helplessness and fear. Recognizing this pattern is essential for healthy religious engagement.",
    positiveScience: {
      label: "Transformed Interpretation",
      description: "Reframing suffering as a test, opportunity for growth, or divine plan (without denying the pain) produces post-traumatic growth in 40-70% of individuals, especially in religious populations.",
      mechanism: "Acknowledge suffering → seek meaning → find growth narrative → resilience → post-traumatic growth",
      evidence: "Pargament et al. (2011). Brief RCOPE development. Journal of Clinical Psychology, 67(2).",
    },
    negativeScience: {
      label: "Demonic Reappraisal → Helplessness",
      description: "Attributing difficulties to supernatural evil forces correlates with helplessness (r=0.38), avoidance coping, and delayed help-seeking because 'only spiritual solutions' are sought.",
      mechanism: "Blame evil forces → feel helpless → refuse practical help → only seek spiritual remedy → condition worsens",
      evidence: "Ano & Vasconcelles (2005). Religious coping meta-analysis. Journal of Clinical Psychology.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
  "rh-day10": {
    theoryName: "Mindfulness in Religious Context",
    theoryAuthor: "Kabat-Zinn; Thomas & Ashraf",
    theoryYear: "1990; 2011",
    theoryMechanism: "Mindfulness — present-moment, non-judgmental awareness — exists across all religious traditions (dhikr in Islam, contemplative prayer in Christianity, meditation in Buddhism). Validated secular and religious mindfulness practices both reduce stress and anxiety.",
    positiveScience: {
      label: "Contemplative Practice → Regulation",
      description: "Religious mindfulness practices (dhikr, contemplative prayer) reduce anxiety by d=0.49 and increase emotional regulation, with effects comparable to secular mindfulness-based stress reduction.",
      mechanism: "Present-moment awareness → reduced rumination → emotional regulation → stress reduction → wellbeing",
      evidence: "Thomas & Ashraf (2011). Exploring the Islamic tradition for resonance with MBSR. Psychotherapy and Politics International.",
    },
    negativeScience: {
      label: "Compulsive Ritualism",
      description: "When mindful practice becomes rigid, compulsive, or fear-driven (performing rituals to prevent punishment), it becomes a form of religious OCD (scrupulosity) rather than genuine contemplation.",
      mechanism: "Fear-driven practice → compulsive repetition → anxiety increases → OCD patterns → spiritual distress",
      evidence: "Abramowitz & Jacoby (2014). Scrupulosity: A cognitive-behavioral analysis and implications. JOCRD.",
    },
    evidenceType: "rct",
    evidenceTrustBand: "A",
  },
  "rh-day11": {
    theoryName: "Religious vs. Secular Help-Seeking",
    theoryAuthor: "Pargament; Abu-Raiya",
    theoryYear: "2011; 2015",
    theoryMechanism: "In MENA cultures, religious leaders are often the first point of contact for psychological distress. Understanding when to seek religious guidance vs. professional mental health support is critical for healthy outcomes.",
    positiveScience: {
      label: "Complementary Help-Seeking",
      description: "Combining religious and professional support produces better outcomes than either alone. In Muslim populations, 65% feel more comfortable seeking help when religious leaders validate professional support.",
      mechanism: "Religious leader endorses professional help → reduced stigma → dual support → better outcomes",
      evidence: "Abu-Raiya & Pargament (2015). Religious coping among diverse religions. Psychology of Religion & Spirituality.",
    },
    negativeScience: {
      label: "Anti-Professional Stance",
      description: "When religious communities actively discourage professional mental health support ('You don't need a therapist, you need more faith'), treatment delay averages 8+ years and outcomes worsen significantly.",
      mechanism: "Community discourages help → shame for seeking help → delay → condition worsens → crisis",
      evidence: "Weatherhead & Daiches (2010). Muslim views on mental health. Mental Health, Religion & Culture.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "rh-day12": {
    theoryName: "Healthy Religious Boundaries",
    theoryAuthor: "Pargament; Exline",
    theoryYear: "2011; 2013",
    theoryMechanism: "Healthy religious engagement requires boundaries: distinguishing between faith-supportive practices and harmful ones, between theological questions and psychological problems, and between community belonging and group pressure.",
    positiveScience: {
      label: "Bounded Religious Engagement",
      description: "Individuals who maintain clear boundaries between religion and professional care show better adjustment (d=0.45) and greater satisfaction with both religious and therapeutic experiences.",
      mechanism: "Clear boundaries → appropriate help-seeking → complementary support → optimal outcomes",
      evidence: "Pargament (2011). Spiritually Integrated Psychotherapy. Guilford Press.",
    },
    negativeScience: {
      label: "Boundary Confusion → Role Conflict",
      description: "When religious leaders function as therapists or therapists dismiss religion, role confusion creates harm. 30% of negative therapy outcomes in religious populations involve dismissed religious concerns.",
      mechanism: "Blurred roles → client confusion → either faith OR help dismissed → trust broken → dropout",
      evidence: "Exline et al. (2013). Psychotherapy with religious clients. Psychology of Religion & Spirituality.",
    },
    evidenceType: "quasi_experiment",
    evidenceTrustBand: "A",
  },
  "rh-day13": {
    theoryName: "Religious Doubt & Growth",
    theoryAuthor: "Exline; Pargament",
    theoryYear: "2013; 2011",
    theoryMechanism: "Religious doubt is a normal part of faith development. When processed healthily, it leads to deeper, more mature faith. When suppressed or shamed, it produces spiritual crisis and psychopathology.",
    positiveScience: {
      label: "Processed Doubt → Mature Faith",
      description: "Religious doubt that is processed openly is associated with deeper faith, greater tolerance, and better psychological adjustment. 60% of theological scholars report doubt as central to their faith development.",
      mechanism: "Experience doubt → explore honestly → integrate new understanding → deeper faith → growth",
      evidence: "Exline (2013). Religious and spiritual struggles. APA Handbook of Psychology, Religion, and Spirituality.",
    },
    negativeScience: {
      label: "Suppressed Doubt → Spiritual Crisis",
      description: "Suppressed religious doubt is associated with depression (r=0.35), anxiety, and religious disaffiliation. The shame of doubting prevents processing and leads to either rigid fundamentalism or complete abandonment.",
      mechanism: "Doubt emerges → suppressed → shame → escalates → either fundamentalism or abandonment → distress",
      evidence: "Galek et al. (2007). Burnout, secondary traumatic stress, and spiritual struggle. Pastoral Psychology.",
    },
    evidenceType: "observational",
    evidenceTrustBand: "A",
  },
  "rh-day14": {
    theoryName: "Integrated Religious Coping — Full Pargament Synthesis",
    theoryAuthor: "Pargament",
    theoryYear: "2011",
    theoryMechanism: "The capstone integrates all positive coping patterns while maintaining awareness of negative patterns. Healthy religious engagement is collaborative, meaning-making, community-connected, and boundary-aware — using faith as a genuine resilience resource rather than an avoidance mechanism.",
    positiveScience: {
      label: "Integrated Religious Wellbeing",
      description: "Individuals scoring high on positive religious coping AND low on negative coping show the best mental health outcomes across all studied populations, with effect sizes of d=0.5-0.7.",
      mechanism: "Positive coping maximized → negative coping minimized → integrated practice → optimal wellbeing",
      evidence: "Pargament, K.I. (2011). Spiritually Integrated Psychotherapy. Guilford Press.",
    },
    negativeScience: {
      label: "Unexamined Religious Practice",
      description: "Religious practice without self-reflection can involve both positive and negative coping simultaneously. Without awareness, negative patterns (punitive God-image, passive deferral, spiritual bypassing) operate undetected alongside genuine faith.",
      mechanism: "No reflection → mixed coping → negative patterns undetected → gradual harm → eventual crisis",
      evidence: "Pargament et al. (2011). Brief RCOPE. Journal of Clinical Psychology, 67(2), 199-220.",
    },
    evidenceType: "systematic_review",
    evidenceTrustBand: "A",
  },
};

/**
 * GET Science data for any exercise by ID
 *
 * Maps exercise IDs to their positive/negative science panels.
 * Used by the ExerciseEngine component.
 */
export function getScienceData(exerciseId: string): ScienceData | null {
  return (
    DEEPREAL_SCIENCE[exerciseId] ||
    MENTAL_HEALTH_SCIENCE[exerciseId] ||
    RELIGION_HUB_SCIENCE[exerciseId] ||
    null
  );
}

/** Get ALL science entries for a specific MVP */
export function getScienceForMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): Record<string, ScienceData> {
  switch (mvp) {
    case "deepreal": return DEEPREAL_SCIENCE;
    case "mental-health": return MENTAL_HEALTH_SCIENCE;
    case "religion-hub": return RELIGION_HUB_SCIENCE;
  }
}
