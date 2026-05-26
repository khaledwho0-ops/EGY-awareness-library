import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function run() {
  const { POST } = await import("./../../src/app/api/defense/angry-debunkers/route");

  const req = new Request("http://localhost/api/defense/angry-debunkers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "I heard that the local water supply is poisoned and everyone should stop drinking." })
  });

  console.log("Calling POST API with real OpenRouter key...");
  const res = await POST(req);
  console.log("Status:", res.status);
  
  const text = await res.text();
  console.log("Response text:", text);
}

run().catch(console.error);
