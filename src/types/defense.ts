export type DemoStatus =
  | "Must show live"
  | "Show if time"
  | "Backup demo"
  | "Explain only"
  | "Do not show";

export type StressTestStatus = "PASS" | "PARTIAL" | "PREPARED";

export interface EvidenceBlock {
  pageFile: string;
  mainComponent: string;
  supportingComponent: string;
  apiRoutes: string[];
  localLogic: string[];
  dataFiles: string[];
  storage: string[];
  envVariables: string[];
  packages: string[];
  liveEvidence: string[];
}

export interface PowerfulPage {
  id: string;
  title: string;
  route: string;
  demoStatus: DemoStatus;
  input?: string;
  expectedOutput: string;
  warning?: string;
  proof: string[];
  evidence: EvidenceBlock;
  doctorAttackAnswered: string[];
  risk: string;
  timeLimit?: string;
  demoScript60s?: string[];
  bestDefense5s?: string;
  bestDefense15s?: string;
  bestDefense30s?: string;
  failureLadder?: string[];
  whatNotToSay?: string[];
  demoRiskScore?: string;
}

export interface StressTest {
  id: number;
  name: string;
  category: string;
  routeOrApi: string;
  inputAction: string;
  actualResult: string;
  status: StressTestStatus;
  defenseLine: string;
  doctorAttack?: string;
  defense?: string;
  demoSafe?: boolean;
}

export interface DoctorAttack {
  id: number;
  doctorSays: string;
  testing: string;
  risk?: string;
  bestAnswer: string;
  answer15s?: string;
  answer30s?: string;
  pageToOpen: string;
  evidenceToMention: string[];
  whatNotToSay: string[];
  recoveryIfFails?: string;
  finalLine?: string;
}

export interface ScenarioCard {
  title: string;
  route: string;
  summary: string;
  points: string[];
}

export interface UltraScenario {
  title: string;
  route: string;
  whyEgyptian: string[];
  whyDangerous: string[];
  exactInput: string;
  arabicContext: string;
  demoScript90s: string[];
  expectedOutput: string[];
  systemFlow: string;
  sourceEvidence: string[];
  whatThisProves: string[];
  stressVariations: Array<{
    variation: string;
    expected: string;
    tested: string;
  }>;
  failureRecoveryLadder: string[];
  script10s: string;
  script30s: string;
  script60s: string;
  whatNotToSay: string[];
}

export interface DemoSegment {
  window: string;
  title: string;
  route: string;
  actions: string[];
  say: string;
  skipIf?: string;
}

export interface RecoveryLine {
  id: number;
  trigger: string;
  line: string;
}

export interface DoNotShowItem {
  target: string;
  why: string;
}

export interface BrutalHonesty {
  strongestProof: string;
  weakestRisk: string;
  whatNotToShow: string;
  challengeLine: string;
  finalStatus: string;
  whatIsStrong?: string[];
  whatIsLimited?: string[];
}

export interface MemorizeLine {
  id: number;
  line: string;
}

export interface FailureSentence {
  failure: string;
  sentence: string;
}

export interface NeverSayItem {
  neverSay: string;
  sayInstead: string;
}
