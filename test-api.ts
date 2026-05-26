import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function testApi() {
  const query = "الفراعنة كائنات فضائية بنوا الأهرامات";
  
  const res = await fetch("http://localhost:3000/api/defense/angry-debunkers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });
  
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

testApi();
