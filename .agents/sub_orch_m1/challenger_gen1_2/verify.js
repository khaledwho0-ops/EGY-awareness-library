const fs = require('fs');

const egyData = fs.readFileSync('src/lib/debunking/egy-data.ts', 'utf8');
const godSystemData = fs.readFileSync('src/types/god-system.ts', 'utf8');

// Verification 1: exactly 130 items in DEFENSE_METHODS
const match = egyData.match(/export const DEFENSE_METHODS: DefenseMethod\[\] = \[([\s\S]*?)\];/);
if (!match) {
  console.log("FAIL: Could not find DEFENSE_METHODS array");
  process.exit(1);
}

// Evaluate the array creation
// It's using ...Array.from({ length: XX })
const lines = match[1].split('\n');
let count = 0;
for (const line of lines) {
  const m = line.match(/length:\s*(\d+)/);
  if (m) {
    count += parseInt(m[1], 10);
  }
}

console.log(`DEFENSE_METHODS count: ${count}`);
if (count === 130) {
  console.log("PASS: DEFENSE_METHODS has exactly 130 items");
} else {
  console.log("FAIL: DEFENSE_METHODS count is not 130");
}

// Verification 2: GodSystemAuditSchema exactly matches 7 layers
const godSystemMatch = godSystemData.match(/export const GodSystemAuditSchema = z\.object\(\{([\s\S]*?)\}\);/);
if (!godSystemMatch) {
  console.log("FAIL: Could not find GodSystemAuditSchema");
  process.exit(1);
}

const objectContent = godSystemMatch[1];
const layerLines = objectContent.split(',').map(s => s.trim()).filter(s => s.length > 0);
console.log(`GodSystemAuditSchema layers count: ${layerLines.length}`);

const expectedLayers = [
  "emotion_strip",
  "provenance_audit",
  "incentive_map",
  "methodological_destruction",
  "fallacy_execution",
  "truth_sandwich",
  "forward_defense"
];

let allLayersMatch = true;
const actualLayers = [];
for (const line of layerLines) {
  const [key, value] = line.split(':').map(s => s.trim());
  actualLayers.push(key);
  if (!expectedLayers.includes(key)) {
    allLayersMatch = false;
  }
  if (value !== "GodSystemLayerSchema") {
    allLayersMatch = false;
  }
}

if (actualLayers.length === 7 && allLayersMatch && expectedLayers.every(l => actualLayers.includes(l))) {
  console.log("PASS: GodSystemAuditSchema exactly matches the 7 layers");
} else {
  console.log("FAIL: GodSystemAuditSchema layers do not match");
  console.log("Expected:", expectedLayers);
  console.log("Actual:", actualLayers);
}
