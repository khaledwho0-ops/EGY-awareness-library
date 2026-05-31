/**
 * ══════════════════════════════════════════════════════════
 *  AI AGENTS TYPE DEFINITIONS — Angry Debunkers Intelligence Network
 * ══════════════════════════════════════════════════════════
 */

export interface AgentProfile {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  avatar: string; // emoji
  specialty: string;
  tools: string[];
}

export interface AgentResult {
  agentId: string;
  findings: string;
  confidence: number; // 0-1
  sources: string[];
  timestamp: number;
}

export interface InvestigationReport {
  claim: string;
  agents: AgentResult[];
  overallVerdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED' | 'PARTIALLY_TRUE';
  verdictExplanation: string;
  layers_detected: string[];
  timestamp: number;
}
