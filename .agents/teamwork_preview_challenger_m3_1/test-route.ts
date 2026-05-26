import { POST } from "../../src/app/api/defense/angry-debunkers/route";

async function run() {
  const req = new Request("http://localhost/api/defense/angry-debunkers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: "I heard that the local water supply is poisoned and everyone should stop drinking." })
  });

  console.log("Calling POST...");
  const res = await POST(req);
  console.log("Status:", res.status);
  
  const json = await res.json();
  console.log("Response:", JSON.stringify(json, null, 2));
}

run().catch(console.error);
