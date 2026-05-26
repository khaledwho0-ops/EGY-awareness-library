const fs = require('fs');
const path = require('path');

const egyDataFile = path.resolve(__dirname, '../../../../src/lib/debunking/egy-data.ts');
const godSystemFile = path.resolve(__dirname, '../../../../src/types/god-system.ts');

function verify() {
  const egyCode = fs.readFileSync(egyDataFile, 'utf8');
  const methodsMatch = egyCode.match(/export const DEFENSE_METHODS: DefenseMethod\[\] = \[([\s\S]*?)\];/);
  
  if (!methodsMatch) {
    console.error("Could not find DEFENSE_METHODS array.");
    return false;
  }
  
  // Quick hack: count `{ id: "` 
  const methodsBlock = methodsMatch[1];
  const items = [...methodsBlock.matchAll(/\{\s*id:\s*"([^"]+)"/g)].map(m => m[1]);
  
  const uniqueItems = new Set(items);
  console.log(`Found ${items.length} items in DEFENSE_METHODS.`);
  console.log(`Unique items: ${uniqueItems.size}`);
  
  if (items.length !== 130 || uniqueItems.size !== 130) {
    console.error("DEFENSE_METHODS count or uniqueness fails!");
    return false;
  }
  
  const godCode = fs.readFileSync(godSystemFile, 'utf8');
  const godMatch = godCode.match(/export const GodSystemAuditSchema = z\.object\(\{([\s\S]*?)\}\);/);
  if (!godMatch) {
    console.error("Could not find GodSystemAuditSchema object.");
    return false;
  }
  
  const godBlock = godMatch[1];
  // extract lines with keys
  const lines = godBlock.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('//'));
  console.log(`Found ${lines.length} layers in GodSystemAuditSchema.`);
  
  if (lines.length !== 7) {
    console.error("GodSystemAuditSchema does not have exactly 7 layers!");
    return false;
  }
  
  console.log("All verifications passed successfully.");
  return true;
}

verify();
