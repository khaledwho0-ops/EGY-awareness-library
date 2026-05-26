const fs = require('fs');
const path = require('path');
const fullData = JSON.parse(fs.readFileSync('badnews-full.json', 'utf8'));

const dir = path.join(__dirname, 'src', 'features', 'badnews', 'data');
fs.mkdirSync(dir, { recursive: true });

// ══════════════════════════════════════════════════════
// badges.ts
// ══════════════════════════════════════════════════════
const badgesTs = `// AUTO-GENERATED from getbadnews.com open-source data
// Do NOT edit manually

export type BadgeId = "IMPERSONATION" | "EMOTION" | "POLARIZATION" | "CONSPIRACY" | "DISCREDIT" | "TROLLING";

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  expandedDescription: string;
  icon: string | null;
}

export const BADGES: Badge[] = ${JSON.stringify(fullData.badges, null, 2)};

export const BADGE_MAP: Record<string, Badge> = {};
BADGES.forEach(b => { BADGE_MAP[b.id] = b; });
`;
fs.writeFileSync(path.join(dir, 'badges.ts'), badgesTs);

// ══════════════════════════════════════════════════════
// scenarios.ts
// ══════════════════════════════════════════════════════
const scenariosTs = `// AUTO-GENERATED from getbadnews.com open-source data
// Do NOT edit manually — 369 scenario nodes

import type { BadgeId } from './badges';

export type CardLayout = "text" | "social-post" | "headline" | "image" | "newspaper" | "dropdown" | "multiplechoice" | "avatar-picker";

export interface SlideContent {
  text: string;
  name: string;
  tagline: string;
  showForwardedTag: boolean;
  image: string | null;
  line1: string;
  line2: string;
}

export interface ChoiceEffects {
  followers: number;
  credibility: number;
  badge?: BadgeId;
  variables: Record<string, string>;
}

export interface Choice {
  id: string;
  text: string;
  slide: SlideContent | null;
  effects: ChoiceEffects;
  goTo: string | null;
}

export interface QuestionData {
  text: string;
  name: string;
  tagline: string;
  showForwardedTag: boolean;
  image: string | null;
  line1: string;
  line2: string;
}

export interface ScenarioNode {
  id: string;
  layout: CardLayout;
  isSlider: boolean;
  storyBadge: string;
  question: QuestionData;
  choices: Choice[];
}

export const SCENARIO_LIST: ScenarioNode[] = ${JSON.stringify(fullData.scenarios, null, 2)};

export const SCENARIOS: Record<string, ScenarioNode> = {};
SCENARIO_LIST.forEach(s => { SCENARIOS[s.id] = s; });

// First node of the game
export const FIRST_NODE_ID = "${fullData.scenarios[0].id}";

// Total node count for verification
export const TOTAL_NODES = ${fullData.scenarios.length};
`;
fs.writeFileSync(path.join(dir, 'scenarios.ts'), scenariosTs);

console.log('Generated badges.ts and scenarios.ts');
console.log('  scenarios.ts contains', fullData.scenarios.length, 'nodes');
