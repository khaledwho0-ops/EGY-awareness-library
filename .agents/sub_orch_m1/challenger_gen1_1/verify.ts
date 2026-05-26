import { DEFENSE_METHODS } from "../../../src/lib/debunking/egy-data";
import { GodSystemAuditSchema } from "../../../src/types/god-system";

let errors = [];

if (DEFENSE_METHODS.length !== 130) {
  errors.push(`DEFENSE_METHODS has length ${DEFENSE_METHODS.length}, expected 130`);
} else {
  console.log("DEFENSE_METHODS length is exactly 130.");
}

const godSystemLayers = Object.keys(GodSystemAuditSchema.shape);
const expectedLayers = [
  "emotion_strip",
  "provenance_audit",
  "incentive_map",
  "methodological_destruction",
  "fallacy_execution",
  "truth_sandwich",
  "forward_defense"
];

if (godSystemLayers.length !== 7) {
  errors.push(`GodSystemAuditSchema has ${godSystemLayers.length} layers, expected 7`);
}

for (let layer of expectedLayers) {
  if (!godSystemLayers.includes(layer)) {
    errors.push(`GodSystemAuditSchema is missing layer: ${layer}`);
  }
}

for (let layer of godSystemLayers) {
  if (!expectedLayers.includes(layer)) {
    errors.push(`GodSystemAuditSchema has unexpected layer: ${layer}`);
  }
}

if (errors.length === 0 && godSystemLayers.length === 7) {
  console.log("GodSystemAuditSchema exactly matches the 7 layers.");
}

if (errors.length > 0) {
  console.error("Verification failed:");
  errors.forEach(e => console.error("- " + e));
  process.exit(1);
} else {
  console.log("Verification passed.");
}
