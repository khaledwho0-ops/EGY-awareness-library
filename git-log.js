import { execSync } from 'child_process';
try {
  const diff = execSync('git log -p -1 src/app/api/defense/angry-debunkers/route.ts').toString();
  console.log(diff);
} catch (e) {
  console.log(e);
}
