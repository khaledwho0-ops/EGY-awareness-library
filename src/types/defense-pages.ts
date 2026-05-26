export type PageCategory =
  | "Main demo"
  | "Hub"
  | "Exercise"
  | "Dashboard"
  | "Tool/API page"
  | "Static/context"
  | "Risky"
  | "Do-not-show"
  | "Dynamic/token"
  | "Presentation-only"
  | "UX/localization"
  | "Science/research"
  | "Unknown";

export type DemoStatus =
  | "Must show live"
  | "Backup demo"
  | "Explain only"
  | "Do not show live"
  | "Static/context only"
  | "Needs valid token"
  | "Needs API key"
  | "Needs backend"
  | "Needs caution";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type BackendKind =
  | "none"
  | "local-only"
  | "api-backed"
  | "keyless-public"
  | "needs-api-key"
  | "needs-backend";

export interface PageMapEntry {
  route: string;
  title: string;
  pageFile: string;
  category: PageCategory;
  demoStatus: DemoStatus;
  risk: RiskLevel;
  backendKind: BackendKind;
  uiUxFocus: string;
  logicFocus: string;
  backendFocus: string;
  storageFocus: string;
  evidence: string[];
  testSteps: string[];
  doctorAttackAnswered: string[];
  warnings: string[];
  tags: string[];
}

export interface PageTestItem {
  route: string;
  tested: boolean;
}

export interface BackendFocusStats {
  totalApiRoutes: number;
  connectedDemoRelevantRoutes: number;
  safeFallbackRoutes: string[];
  riskyRoutes: string[];
  keylessPublicRoutes: string[];
  backendDependentRoutes: string[];
}
