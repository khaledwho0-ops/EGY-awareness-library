const fs = require('fs');
const ts = require('typescript');

const egyDataPath = 'C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/src/lib/debunking/egy-data.ts';
const godSystemPath = 'C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/src/types/god-system.ts';

const egyDataContent = fs.readFileSync(egyDataPath, 'utf8');
const godSystemContent = fs.readFileSync(godSystemPath, 'utf8');

// Use regex to parse out DEFENSE_METHODS
const methodsRegex = /id:\s*"([^"]+)"/g;
let match;
let ids = [];
while ((match = methodsRegex.exec(egyDataContent)) !== null) {
  ids.push(match[1]);
}

const uniqueIds = new Set(ids);
console.log(`Total DEFENSE_METHODS IDs: ${ids.length}`);
console.log(`Unique DEFENSE_METHODS IDs: ${uniqueIds.size}`);

if (ids.length === 130 && uniqueIds.size === 130) {
    console.log("SUCCESS: DEFENSE_METHODS has exactly 130 unique items.");
} else {
    console.log("FAILURE: DEFENSE_METHODS does not have 130 unique items.");
}

const godSystemLayersRegex = /export const GodSystemAuditSchema = z\.object\(\{([\s\S]*?)\}\);/;
const layersMatch = godSystemLayersRegex.exec(godSystemContent);
if (layersMatch) {
    const layersBlock = layersMatch[1];
    const layerNames = layersBlock.split('\n').filter(l => l.includes(':')).map(l => l.trim().split(':')[0]);
    console.log(`GodSystemAuditSchema layers: ${layerNames.length}`);
    console.log(`Layers: ${layerNames.join(', ')}`);
    if (layerNames.length === 7) {
        console.log("SUCCESS: GodSystemAuditSchema exactly matches 7 layers.");
    } else {
        console.log("FAILURE: GodSystemAuditSchema does not have exactly 7 layers.");
    }
} else {
    console.log("FAILURE: Could not parse GodSystemAuditSchema.");
}
