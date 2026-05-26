export type ScienceDomain =
  | "misinformation"
  | "mental-health"
  | "religion"
  | "trusted-sources"
  | "standards";

export type ScienceRegion = "global" | "egypt" | "mena";

export interface ScienceSignal {
  id: string;
  domain: ScienceDomain;
  region: ScienceRegion;
  title: string;
  value: string;
  year: number;
  source: string;
  url: string;
  summary: string;
  whyItMatters: string;
  appliedTo: Array<"deepreal" | "mental-health" | "religion-hub">;
}

export interface TrustedSourceLeader {
  id: string;
  name: string;
  category: "official" | "fact-check" | "academic" | "methodology" | "egyptian";
  scope: ScienceRegion | "international";
  url: string;
  whyTrusted: string;
  whyWeUseIt: string;
  trustSignals: string[];
}

export interface AudienceRiskProfile {
  id: string;
  audience: string;
  audienceAr: string;
  domain: ScienceDomain;
  region: ScienceRegion;
  threat: string;
  likelyHarm: string;
  protectiveMove: string;
}

export type FlagFamily = "red" | "camouflage" | "green" | "grey" | "blood";

export interface FlagRecord {
  id: string;
  family: FlagFamily;
  title: string;
  cue: string;
  whyItMatters: string;
  counterMove: string;
  domain: ScienceDomain;
}

export interface UpdateMethod {
  id: string;
  domain: ScienceDomain;
  cadence: "daily" | "weekly" | "monthly" | "event-driven";
  title: string;
  action: string;
  whyItWorks: string;
  sourceAnchor: string;
}

export interface AwarenessStandard {
  id: string;
  title: string;
  description: string;
  implementation: string;
}

export const SCIENCE_SIGNALS: ScienceSignal[] = [
  {
    id: "signal-wef-2024",
    domain: "misinformation",
    region: "global",
    title: "Misinformation and disinformation ranked as the top short-term global risk",
    value: "#1 short-term risk",
    year: 2024,
    source: "World Economic Forum, Global Risks Report 2024",
    url: "https://www.weforum.org/press/2024/01/global-risks-report-2024-press-release/",
    summary:
      "The WEF's 2024 risk survey placed misinformation and disinformation ahead of other short-term threats such as extreme weather and cyber insecurity.",
    whyItMatters:
      "This supports treating misinformation as a systems-level threat, not a side topic or a generic media-literacy slogan.",
    appliedTo: ["deepreal"],
  },
  {
    id: "signal-who-disinfo-2024",
    domain: "misinformation",
    region: "global",
    title: "WHO explicitly treats misinformation and disinformation as public-health threats",
    value: "Health, security, and decision-making harm",
    year: 2024,
    source: "WHO Q&A: Disinformation and public health",
    url: "https://www.who.int/news-room/questions-and-answers/item/disinformation-and-public-health",
    summary:
      "WHO states that information manipulation can harm decision-making, health, security, and social stability, including through biased or manipulated narratives.",
    whyItMatters:
      "It justifies connecting DeepReal to health and wellbeing outcomes instead of isolating it as a pure fact-checking tool.",
    appliedTo: ["deepreal", "mental-health", "religion-hub"],
  },
  {
    id: "signal-who-review-2022",
    domain: "misinformation",
    region: "global",
    title: "WHO review found infodemics change health behavior and worsen mental health",
    value: "31 reviews synthesized",
    year: 2022,
    source: "WHO Europe review on infodemics and misinformation",
    url: "https://www.who.int/europe/news/item/01-09-2022-infodemics-and-misinformation-negatively-affect-people-s-health-behaviours--new-who-review-finds",
    summary:
      "WHO's review concluded that misinformation online can fuel vaccine hesitancy, delay care, and negatively affect mental health.",
    whyItMatters:
      "This is a direct scientific bridge between misinformation resilience and mental-health literacy.",
    appliedTo: ["deepreal", "mental-health"],
  },
  {
    id: "signal-science-advances-2022",
    domain: "misinformation",
    region: "global",
    title: "Psychological inoculation can reduce susceptibility to manipulation",
    value: "21-25% reduction",
    year: 2022,
    source: "Science Advances prebunking research",
    url: "https://www.science.org/doi/10.1126/sciadv.abo6254",
    summary:
      "Research on prebunking and inoculation found measurable reductions in manipulation susceptibility when users are trained before exposure.",
    whyItMatters:
      "It supports the app's exercise-first design instead of relying only on passive reading.",
    appliedTo: ["deepreal"],
  },
  {
    id: "signal-who-mh-2023",
    domain: "mental-health",
    region: "global",
    title: "WHO estimates more than 1 billion people live with mental, neurological, or substance-use conditions",
    value: "1+ billion people",
    year: 2023,
    source: "WHO EMRO: World Mental Health Day 2023",
    url: "https://www.emro.who.int/media/news/world-mental-health-day-2023-mental-health-is-a-basic-human-right.html",
    summary:
      "WHO's regional messaging highlights the scale of mental-health need and frames mental health as a basic human right.",
    whyItMatters:
      "This supports treating mental-health literacy as public-health infrastructure rather than optional self-help content.",
    appliedTo: ["mental-health"],
  },
  {
    id: "signal-who-emro-gap-2024",
    domain: "mental-health",
    region: "mena",
    title: "Mental-health treatment gaps in the Eastern Mediterranean region can reach 90%",
    value: "Up to 90%",
    year: 2024,
    source: "WHO Results Report 2024-2025, Egypt / EMRO overview",
    url: "https://www.who.int/about/accountability/results/who-results-report-2024-2025/region-EMRO/2024/egypt",
    summary:
      "WHO reports large treatment gaps, stigma, and uneven community-based service coverage across the region, while Egypt is part of current scale-up work under mhGAP.",
    whyItMatters:
      "This is a strong regional rationale for building low-friction literacy and help-seeking guidance into the app.",
    appliedTo: ["mental-health"],
  },
  {
    id: "signal-unicef-egypt-2014-dhs",
    domain: "mental-health",
    region: "egypt",
    title: "UNICEF Egypt reports widespread child exposure to violent discipline",
    value: "93% of children aged 1-14",
    year: 2014,
    source: "UNICEF Egypt child protection page citing DHS 2014",
    url: "https://www.unicef.org/egypt/child-protection",
    summary:
      "UNICEF cites Egypt's DHS showing very high exposure to violent disciplinary practices among children.",
    whyItMatters:
      "It supports including family-safe, stigma-aware, and youth-focused mental-health content rather than generic stress advice.",
    appliedTo: ["mental-health"],
  },
  {
    id: "signal-unicef-cyberbullying-egypt",
    domain: "misinformation",
    region: "egypt",
    title: "UNICEF Egypt frames cyberbullying, scams, and rumor-spreading as everyday online safety issues",
    value: "Action guidance for children and caregivers",
    year: 2024,
    source: "UNICEF Egypt cyberbullying and internet safety",
    url: "https://www.unicef.org/egypt/protecting-children-cyberbullying",
    summary:
      "UNICEF Egypt warns that online lies, threats, scams, and rumor cascades affect families, children, and adolescents in daily digital life.",
    whyItMatters:
      "This grounds Egypt-facing safety content in official local child-protection guidance instead of abstract threat lists.",
    appliedTo: ["deepreal", "mental-health"],
  },
  {
    id: "signal-pew-religion-restrictions-2024",
    domain: "religion",
    region: "egypt",
    title: "Egypt is among the most restrictive environments on religion among the 25 most populous countries",
    value: "High overall restrictions",
    year: 2024,
    source: "Pew Research Center, restrictions on religion report",
    url: "https://www.pewresearch.org/religion/2024/03/05/restrictions-on-religion-in-the-worlds-25-most-populous-countries-in-2021/",
    summary:
      "Pew's comparative tracking places Egypt among the countries with the highest combined government restrictions and social hostilities involving religion.",
    whyItMatters:
      "It justifies a careful, moderation-focused Religion Hub centered on verification, peace, and boundary-setting.",
    appliedTo: ["religion-hub"],
  },
  {
    id: "signal-uscirf-egypt-2025",
    domain: "religion",
    region: "egypt",
    title: "USCIRF reports continuing religious-freedom pressure in Egypt",
    value: "Ongoing restrictions and selective tolerance",
    year: 2025,
    source: "USCIRF Egypt religious freedom update",
    url: "https://www.uscirf.gov/news-room/releases-statements/uscirf-releases-report-religious-freedom-egypt",
    summary:
      "USCIRF describes systematic constraints on several non-Muslim groups while noting selective support for some tolerance initiatives.",
    whyItMatters:
      "A religion feature in this context needs de-escalation logic, verified sourcing, and anti-sectarian framing.",
    appliedTo: ["religion-hub"],
  },
  {
    id: "signal-arab-barometer-religion",
    domain: "religion",
    region: "mena",
    title: "Arab Barometer continues to track religion as a core public-opinion dimension across the region",
    value: "Ongoing nationally representative polling",
    year: 2026,
    source: "Arab Barometer religion topic and methodology pages",
    url: "https://www.arabbarometer.org/topics/religion/",
    summary:
      "Arab Barometer remains one of the strongest open regional sources for how religiosity, identity, and public life change across MENA populations.",
    whyItMatters:
      "It gives the project a regionally credible evidence anchor beyond imported Western-only assumptions.",
    appliedTo: ["religion-hub"],
  },
  {
    id: "signal-ifcn-principles",
    domain: "trusted-sources",
    region: "global",
    title: "IFCN principles define what makes a fact-check source trustworthy",
    value: "Method, transparency, corrections, nonpartisanship",
    year: 2026,
    source: "Poynter / IFCN code and signatory program",
    url: "https://ifcncodeofprinciples.poynter.org/",
    summary:
      "The IFCN framework is explicit about transparency, methodology, corrections, and organizational accountability.",
    whyItMatters:
      "It lets the product explain trust using auditable criteria instead of vibes or brand recognition.",
    appliedTo: ["deepreal"],
  },
];

export const TRUST_LEADERS: TrustedSourceLeader[] = [
  {
    id: "who",
    name: "World Health Organization",
    category: "official",
    scope: "international",
    url: "https://www.who.int/",
    whyTrusted: "Global public-health authority with formal review, country reporting, and explicit health guidance.",
    whyWeUseIt: "Anchors health misinformation, mental-health burden, and infodemic harm claims.",
    trustSignals: ["Official body", "Method notes", "Country-level reporting", "Public corrections"],
  },
  {
    id: "who-emro",
    name: "WHO Eastern Mediterranean Regional Office",
    category: "official",
    scope: "mena",
    url: "https://www.emro.who.int/",
    whyTrusted: "Regional WHO branch with Egypt-relevant health systems context and MENA-specific reporting.",
    whyWeUseIt: "Bridges global evidence to Egypt-facing implementation reality.",
    trustSignals: ["Regional focus", "Official reporting", "Program updates", "Public-health mandate"],
  },
  {
    id: "unicef-egypt",
    name: "UNICEF Egypt",
    category: "egyptian",
    scope: "egypt",
    url: "https://www.unicef.org/egypt/",
    whyTrusted: "Provides Egypt-specific child-protection, cyberbullying, and family-safety guidance grounded in large surveys and field programs.",
    whyWeUseIt: "Supports youth, parent, and caregiver risk scenarios with local context.",
    trustSignals: ["Local office", "Program evidence", "Arabic guidance", "Policy partnerships"],
  },
  {
    id: "ifcn",
    name: "IFCN / Poynter",
    category: "methodology",
    scope: "international",
    url: "https://ifcncodeofprinciples.poynter.org/",
    whyTrusted: "Defines the standard trust signals for fact-checking organizations and audits signatories against transparent principles.",
    whyWeUseIt: "Explains why some fact-checkers deserve more weight than anonymous viral accounts or vague 'media sources'.",
    trustSignals: ["Transparency", "Corrections", "Methodology", "Independence"],
  },
  {
    id: "pubmed",
    name: "PubMed / NCBI",
    category: "academic",
    scope: "international",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    whyTrusted: "Stable biomedical indexing with citation metadata and journal linkage.",
    whyWeUseIt: "Supports medical and mental-health evidence lookup behind app claims and prompts.",
    trustSignals: ["Index quality", "Metadata integrity", "Journal links", "Search reproducibility"],
  },
  {
    id: "crossref",
    name: "Crossref",
    category: "academic",
    scope: "international",
    url: "https://www.crossref.org/",
    whyTrusted: "DOI-level scholarly registry with persistent identifiers and citation infrastructure.",
    whyWeUseIt: "Validates whether a cited paper is real, traceable, and linkable.",
    trustSignals: ["Persistent DOI", "Metadata API", "Scholarly infrastructure", "Widely adopted"],
  },
  {
    id: "openalex",
    name: "OpenAlex",
    category: "academic",
    scope: "international",
    url: "https://openalex.org/",
    whyTrusted: "Open research graph for literature discovery with transparent metadata.",
    whyWeUseIt: "Lets users find recent evidence instead of relying on recycled screenshots or blog summaries.",
    trustSignals: ["Open graph", "Source transparency", "Citation graph", "API access"],
  },
  {
    id: "reuters-fact-check",
    name: "Reuters Fact Check",
    category: "fact-check",
    scope: "international",
    url: "https://www.reuters.com/fact-check/",
    whyTrusted: "Major newsroom with traceable sourcing and formal correction practices.",
    whyWeUseIt: "Used as a high-weight comparative check for viral claims and media artifacts.",
    trustSignals: ["Named newsroom", "Corrections", "Source citations", "Professional verification desk"],
  },
  {
    id: "ap-fact-check",
    name: "AP Fact Check",
    category: "fact-check",
    scope: "international",
    url: "https://apnews.com/hub/ap-fact-check",
    whyTrusted: "Global wire-service verification with source-based reporting and broad reach.",
    whyWeUseIt: "Useful when a rumor becomes mainstream and users need a fast, familiar reference point.",
    trustSignals: ["Wire service", "Structured reporting", "Editorial oversight", "Source traceability"],
  },
  {
    id: "afp-fact-check",
    name: "AFP Fact Check",
    category: "fact-check",
    scope: "international",
    url: "https://factcheck.afp.com/",
    whyTrusted: "Multilingual fact-checking with strong international and regional coverage.",
    whyWeUseIt: "Useful for Arabic-adjacent and transnational rumor flows.",
    trustSignals: ["Multilingual coverage", "Professional verification", "Image/video analysis", "Method transparency"],
  },
  {
    id: "misbar",
    name: "Misbar",
    category: "fact-check",
    scope: "mena",
    url: "https://www.misbar.com/",
    whyTrusted: "Arabic fact-checking outlet with regional relevance and case archives.",
    whyWeUseIt: "Provides Arabic and MENA-facing examples the app can use without over-Westernizing the problem space.",
    trustSignals: ["Arabic coverage", "Case archive", "Regional relevance", "Fact-check workflow"],
  },
  {
    id: "al-azhar-observatory",
    name: "Al-Azhar Observatory for Combating Extremism",
    category: "egyptian",
    scope: "egypt",
    url: "https://www.azhar.eg/observer-en",
    whyTrusted: "Egypt-based moderation and anti-extremism institution with explicit public guidance role.",
    whyWeUseIt: "Adds local legitimacy and de-escalation framing to religion-related content.",
    trustSignals: ["Local legitimacy", "Anti-extremism focus", "Public statements", "Moderation lens"],
  },
  {
    id: "dar-al-ifta",
    name: "Dar al-Ifta Egypt",
    category: "egyptian",
    scope: "egypt",
    url: "https://www.dar-alifta.org/en",
    whyTrusted: "Official Egyptian institution for religious guidance and public clarification.",
    whyWeUseIt: "Used as a bounded reference point for verification and moderation, not sectarian instruction.",
    trustSignals: ["Official institution", "Public guidance", "Arabic access", "Context relevance"],
  },
];

export const AUDIENCE_RISK_PROFILES: AudienceRiskProfile[] = [
  {
    id: "aud-mothers",
    audience: "Mothers",
    audienceAr: "الأمهات",
    domain: "mental-health",
    region: "egypt",
    threat: "Rumors about vaccines, child safety, or school threats spread through family WhatsApp networks.",
    likelyHarm: "Delayed care, panic, and emotional overload in family decision-making.",
    protectiveMove: "Cross-check with MoHP, WHO, and trusted pediatric guidance before acting or forwarding.",
  },
  {
    id: "aud-fathers",
    audience: "Fathers",
    audienceAr: "الآباء",
    domain: "misinformation",
    region: "egypt",
    threat: "Financial scams and authority-mimic messages tied to banks, salaries, or state decisions.",
    likelyHarm: "Loss of money, panic buying, and reactive household decisions.",
    protectiveMove: "Pause, confirm with the official institution directly, and reject screenshot-only evidence.",
  },
  {
    id: "aud-sons-daughters",
    audience: "Sons and daughters",
    audienceAr: "الأبناء والبنات",
    domain: "misinformation",
    region: "global",
    threat: "Deepfakes, cyberbullying, blackmail, and rumor storms on social platforms.",
    likelyHarm: "Humiliation, anxiety, coercion, or unsafe sharing behavior.",
    protectiveMove: "Teach reverse search, evidence logging, and immediate escalation to adults or support services.",
  },
  {
    id: "aud-students",
    audience: "Students",
    audienceAr: "الطلاب",
    domain: "mental-health",
    region: "egypt",
    threat: "Self-diagnosis content, fake scholarship links, exam rumors, and productivity pseudoscience.",
    likelyHarm: "Academic distress, poor help-seeking, and scam exposure.",
    protectiveMove: "Separate educational content from diagnosis, and verify opportunities via official domains only.",
  },
  {
    id: "aud-teachers",
    audience: "Teachers",
    audienceAr: "المعلمون",
    domain: "misinformation",
    region: "global",
    threat: "False accusations, out-of-context clips, and parent-community rumor cascades.",
    likelyHarm: "Reputation damage and mob-style pressure before verification.",
    protectiveMove: "Use official statements, documented timelines, and anti-rumor response protocols.",
  },
  {
    id: "aud-doctors",
    audience: "Doctors",
    audienceAr: "الأطباء",
    domain: "misinformation",
    region: "egypt",
    threat: "Medical rumors, edited clips, and accusation campaigns around treatment decisions.",
    likelyHarm: "Violence, mistrust, and patient noncompliance.",
    protectiveMove: "Center official clinical guidance and trace every viral medical claim to a named source.",
  },
  {
    id: "aud-scientists",
    audience: "Scientists",
    audienceAr: "العلماء",
    domain: "misinformation",
    region: "global",
    threat: "Cherry-picked charts, edited quotes, and anti-expertise campaigns.",
    likelyHarm: "Harassment, chilled communication, and distorted public understanding.",
    protectiveMove: "Publish methods, context, and uncertainty clearly, then pre-empt common distortions.",
  },
  {
    id: "aud-youth",
    audience: "Youth",
    audienceAr: "الشباب",
    domain: "mental-health",
    region: "mena",
    threat: "Algorithmic overload, identity pressure, and doom-heavy trend cycles.",
    likelyHarm: "Stress escalation, shame, and emotional contagion.",
    protectiveMove: "Use emotional labeling, source pacing, and help-seeking cues instead of endless scrolling.",
  },
  {
    id: "aud-older-adults",
    audience: "Older adults",
    audienceAr: "كبار السن",
    domain: "misinformation",
    region: "egypt",
    threat: "Voice phishing, spoofed authority calls, and forwarded miracle-health claims.",
    likelyHarm: "Financial loss, delayed care, and family panic.",
    protectiveMove: "Never trust the incoming call alone; hang up and call the institution directly.",
  },
  {
    id: "aud-religious-users",
    audience: "Religiously committed users",
    audienceAr: "المستخدمون ذوو الالتزام الديني",
    domain: "religion",
    region: "egypt",
    threat: "Out-of-context sermons, sectarian clips, and manipulative certainty language.",
    likelyHarm: "Polarization, shame, or coercive control disguised as guidance.",
    protectiveMove: "Verify the source, context, and moderation stance before sharing or acting.",
  },
  {
    id: "aud-women",
    audience: "Women",
    audienceAr: "النساء",
    domain: "misinformation",
    region: "global",
    threat: "Image-based blackmail, rumor attacks, and fake moral exposure threats.",
    likelyHarm: "Coercion, silence, and severe reputational harm.",
    protectiveMove: "Treat image-based coercion as a safety issue; document, report, and escalate immediately.",
  },
  {
    id: "aud-men",
    audience: "Men",
    audienceAr: "الرجال",
    domain: "mental-health",
    region: "mena",
    threat: "Masculinity myths that frame help-seeking as weakness.",
    likelyHarm: "Delayed support, suppressed distress, and harmful coping.",
    protectiveMove: "Normalize evidence-based help-seeking as strength and responsibility, not failure.",
  },
];

const redCueTemplates: Array<[string, string, string]> = [
  ["Urgency overload", "demands action before checking", "Pause and verify before forwarding or acting."],
  ["Anonymous authority", "claims an unnamed doctor, officer, or insider said it", "Ask for the original named source and check it directly."],
  ["Screenshot proof only", "uses screenshots without source links or dates", "Trace the screenshot to the original page, author, or institution."],
  ["Emotion spike", "tries to make you angry, scared, or proud before you think", "Name the emotion first, then inspect the evidence chain."],
  ["Forward now pressure", "tells you to share quickly to save people", "Do not become the distribution system for unverified claims."],
  ["Binary certainty", "frames a complex issue as pure truth vs pure evil", "Look for nuance, uncertainty, and missing context."],
  ["Context collapse", "cuts a clip or quote away from its full setting", "Find the full video, article, or speech before judging."],
  ["Too-perfect evidence", "looks polished but gives no method or provenance", "Treat style as separate from truth."],
  ["Conspiracy shortcut", "explains everything through hidden actors without proof", "Demand independently checkable evidence, not suspicion language."],
  ["Targeted shame", "makes disagreement feel immoral or disloyal", "Separate social pressure from evidence quality."],
];

const camouflageCueTemplates: Array<[string, string, string]> = [
  ["Fake professionalism", "copies the look of news, medicine, or official paperwork", "Judge the source and method, not the costume."],
  ["Logo laundering", "uses institutional logos without institutional links", "Open the real institution site and compare the claim."],
  ["Citation fog", "drops terms like study, research, or experts without details", "Ask for title, author, year, and traceable link."],
  ["Selective precision", "uses exact-looking numbers with unclear origin", "Look for the dataset or primary report behind the number."],
  ["Half-true wrapper", "mixes one true detail with a false conclusion", "Split the claim into parts and verify each part separately."],
  ["Platform mimicry", "imitates official handles, domains, or page names", "Check the exact username, domain, and verification status."],
  ["AI cleanliness", "synthetic content looks unusually smooth and persuasive", "Run reverse search and provenance checks, not just a vibe check."],
  ["Thread credibility trap", "builds trust across many polished posts before the false jump", "Audit the core claim, not just the tone of the thread."],
  ["Pseudo-balance", "pretends to weigh both sides while smuggling one false premise", "Question the framing itself, not only the conclusion."],
  ["Quote laundering", "attributes strong wording to public figures without context", "Find the primary transcript or source recording."],
];

const greenCueTemplates: Array<[string, string, string]> = [
  ["Method shown", "explains how the conclusion was reached", "Prefer sources that expose their method and limits."],
  ["Named sourcing", "links to identifiable institutions, authors, or records", "Open the primary material and inspect it yourself."],
  ["Correction trail", "shows updates, edits, or correction history", "Trust rises when a source can visibly correct itself."],
  ["Uncertainty language", "states what is known, unknown, and still developing", "This is a strong signal of scientific discipline."],
  ["Independent confirmation", "matches across more than one credible source type", "Triangulate across official, academic, and fact-check layers."],
  ["Date clarity", "shows exactly when the claim and evidence were published", "Freshness matters; old evidence can mislead current decisions."],
  ["Primary document access", "lets you inspect the report, dataset, or statement", "Do not settle for paraphrase when the primary is available."],
  ["Scope control", "stays inside what the evidence can actually support", "Avoid overclaiming and beware of sources that jump too far."],
  ["Boundary discipline", "distinguishes education, guidance, and diagnosis", "This is essential in mental-health and religion content."],
  ["Calm framing", "does not need panic to make its point", "Evidence should survive without emotional pressure."],
];

const greyCueTemplates: Array<[string, string, string]> = [
  ["Old but not useless", "may be real but outdated for the current situation", "Check if newer guidance or events changed the meaning."],
  ["Opinion mixed with evidence", "contains some facts but also interpretation", "Separate the data layer from the commentary layer."],
  ["Plausible anecdote", "sounds realistic but lacks generalizable evidence", "Do not scale one story into a rule without data."],
  ["Preprint caution", "may be useful but not yet peer reviewed", "Treat it as emerging evidence, not settled truth."],
  ["Translation drift", "meaning may have shifted between languages or summaries", "Cross-check the original wording if stakes are high."],
  ["Partial clip", "may not be fake, but may still be incomplete", "Ask what came before and after the clip."],
  ["Unknown expertise match", "source may be real but not qualified for that claim", "Check whether the expertise fits the topic."],
  ["Satire ambiguity", "content may be joking but still spreads as fact", "Inspect the original publisher and intended format."],
  ["Secondary summary", "article may rely on another article rather than primary evidence", "Climb one level closer to the source."],
  ["Benign visual edit", "an image may be edited without changing the core claim", "Judge manipulation and truth as separate questions."],
];

const bloodCueTemplates: Array<[string, string, string]> = [
  ["Blackmail pattern", "uses private material or threats to force compliance", "Treat it as an emergency; document and escalate immediately."],
  ["Self-harm manipulation", "pressures a vulnerable person with harmful or fatal suggestions", "Do not engage alone; move to crisis support now."],
  ["Extortion message", "demands money, codes, or data under threat", "Stop contact and verify through an official channel."],
  ["Grooming escalation", "builds secrecy, dependency, and control over time", "Break secrecy and involve a trusted adult or authority."],
  ["Sectarian incitement", "pushes hatred or violence against a religious group", "Treat it as high-risk harm, not a debate clip."],
  ["Medical scam danger", "tells people to avoid real care or use dangerous substitutes", "Re-anchor to official clinical guidance immediately."],
  ["Doxxing signal", "shares private location, identity, or family information", "Preserve evidence and report fast; this is a safety issue."],
  ["Impersonation attack", "poses as a sheikh, doctor, or official to extract money or obedience", "Use direct institutional verification, never the incoming contact alone."],
  ["Child exploitation cue", "targets minors with coercive or sexualized pressure", "Escalate without delay; treat as emergency protection work."],
  ["Mob trigger", "turns a rumor into a call for confrontation or punishment", "Do not amplify; shift to official statements and safety routes."],
];

const cueDomains: ScienceDomain[] = ["misinformation", "mental-health", "religion"];

function expandFlags(
  family: FlagFamily,
  templates: Array<[string, string, string]>,
): FlagRecord[] {
  const records: FlagRecord[] = [];
  for (let index = 0; index < 100; index += 1) {
    const [title, cue, counterMove] = templates[index % templates.length];
    const domain = cueDomains[index % cueDomains.length];
    records.push({
      id: `${family}-${index + 1}`,
      family,
      title: `${title} ${index + 1}`,
      cue,
      whyItMatters:
        family === "green"
          ? "This is a positive trust signal that lowers the chance of reacting to manipulation."
          : family === "grey"
            ? "This is ambiguous, so the right move is caution and context instead of instant belief or instant rejection."
            : family === "blood"
              ? "This is a severe danger signal because the likely harm can move quickly from confusion to coercion, violence, or exploitation."
              : "This is a manipulation signal that should raise friction before belief, sharing, money transfer, or moral judgment.",
      counterMove,
      domain,
    });
  }

  return records;
}

export const FLAG_LIBRARY: FlagRecord[] = [
  ...expandFlags("red", redCueTemplates),
  ...expandFlags("camouflage", camouflageCueTemplates),
  ...expandFlags("green", greenCueTemplates),
  ...expandFlags("grey", greyCueTemplates),
  ...expandFlags("blood", bloodCueTemplates),
];

const updateSourceAnchors = [
  ["WHO", "Watch official health guidance when claims involve disease, treatment, or public safety."],
  ["WHO EMRO", "Use regional health context when global advice needs local interpretation."],
  ["MoHP Egypt", "Track official Egypt-facing health announcements and service guidance."],
  ["UNICEF Egypt", "Follow child and caregiver safety guidance for digital harms and rumor response."],
  ["IFCN / Poynter", "Use methodology standards to decide which fact-checkers deserve weight."],
  ["Reuters / AP / AFP Fact Check", "Use newsroom fact-check desks for fast comparative verification."],
  ["Crossref alerts", "Watch for newly indexed academic papers on fast-moving topics."],
  ["OpenAlex saved search", "Monitor recent literature without depending on one paper or one influencer."],
  ["PubMed saved query", "Track biomedical evidence as claims evolve."],
  ["Al-Azhar / Dar al-Ifta", "Use local moderation-oriented references for religion-facing clarification."],
];

const updateCadences: UpdateMethod["cadence"][] = ["daily", "weekly", "monthly", "event-driven"];

const updateActions = [
  "Create a saved search and review only source titles plus methods first.",
  "Bookmark the official newsroom or update page and compare it against viral claims.",
  "Build a small watchlist of institutions and scan them before you trust social feeds.",
  "Use reverse search or archive tools when the evidence is image-led or screenshot-led.",
  "Log what changed, when it changed, and which source triggered the update.",
  "Check both global and Egypt-facing sources before translating advice into action.",
  "Open the primary report, not just the summary article or repost.",
  "Review corrections and updates, not just the first headline you saw.",
  "Keep a short list of fallback sources for when one platform is noisy or unavailable.",
  "Turn major events into verification drills instead of panic-forward cycles.",
];

const updateWhy = [
  "It reduces dependence on algorithmic feeds and rumor timing.",
  "It creates a repeatable update habit instead of reactive checking.",
  "It improves source triangulation and freshness discipline.",
  "It makes trust explainable rather than intuitive.",
  "It lowers the chance of acting on stale, partial, or manipulative information.",
];

export const UPDATE_METHODS: UpdateMethod[] = Array.from({ length: 100 }, (_, index) => {
  const [sourceAnchor] = updateSourceAnchors[index % updateSourceAnchors.length];
  return {
    id: `update-${index + 1}`,
    domain: cueDomains[index % cueDomains.length],
    cadence: updateCadences[index % updateCadences.length],
    title: `${sourceAnchor} update method ${index + 1}`,
    action: updateActions[index % updateActions.length],
    whyItWorks: updateWhy[index % updateWhy.length],
    sourceAnchor,
  };
});

export const AWARENESS_STANDARD_BLUEPRINT: AwarenessStandard[] = [
  {
    id: "standard-1",
    title: "Evidence before emotion",
    description: "No high-stakes claim should be trusted, shared, or acted on only because it feels urgent, righteous, or frightening.",
    implementation: "The app should force a pause, then ask for source, date, method, and alternative coverage.",
  },
  {
    id: "standard-2",
    title: "Global evidence, local legitimacy",
    description: "Use global scientific evidence and pair it with Egypt-relevant institutions and context before turning it into guidance.",
    implementation: "Every major topic should surface one global source and one Egypt-facing source side by side.",
  },
  {
    id: "standard-3",
    title: "Boundary-safe wellbeing",
    description: "Mental-health and religion content must stay educational, moderation-focused, and explicit about when formal help is needed.",
    implementation: "Diagnosis, fatwa-style authority claims, and therapeutic overpromising should be blocked by design.",
  },
  {
    id: "standard-4",
    title: "Freshness is part of trust",
    description: "A correct claim can still become unsafe when it is stale, decontextualized, or overtaken by events.",
    implementation: "Every evidence block should show publication year and why freshness matters for that topic.",
  },
  {
    id: "standard-5",
    title: "Explain why a source is trusted",
    description: "Trust labels must be defended with visible criteria such as method transparency, corrections, named institutions, and scope fit.",
    implementation: "The UI should expose trust signals instead of using 'trusted' as a black-box badge.",
  },
  {
    id: "standard-6",
    title: "Turn users into verifiers, not spectators",
    description: "People learn more from structured checking and reflection than from being handed finished conclusions.",
    implementation: "Core flows should ask for comparison, trace-back, and confidence calibration before revealing the answer.",
  },
];

export function getSignalsByDomain(domain: ScienceDomain | "all"): ScienceSignal[] {
  return domain === "all" ? SCIENCE_SIGNALS : SCIENCE_SIGNALS.filter((signal) => signal.domain === domain);
}

export function getSignalsByRegion(region: ScienceRegion | "all"): ScienceSignal[] {
  return region === "all" ? SCIENCE_SIGNALS : SCIENCE_SIGNALS.filter((signal) => signal.region === region);
}

export function getFlagFamilyCount(family: FlagFamily): number {
  return FLAG_LIBRARY.filter((flag) => flag.family === family).length;
}

export function getAssessmentScienceContext(instrumentId: string): ScienceSignal[] {
  if (instrumentId === "mist20") {
    return SCIENCE_SIGNALS.filter((signal) => signal.domain === "misinformation").slice(0, 3);
  }

  if (instrumentId === "mhls" || instrumentId === "ghsq") {
    return SCIENCE_SIGNALS.filter((signal) => signal.domain === "mental-health").slice(0, 3);
  }

  if (instrumentId === "brief-rcope") {
    return SCIENCE_SIGNALS.filter((signal) => signal.domain === "religion").slice(0, 3);
  }

  return SCIENCE_SIGNALS.slice(0, 3);
}
