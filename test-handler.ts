import { POST } from "./src/app/api/defense/angry-debunkers/route";
import { NextRequest } from "next/server";

async function run() {
  const req = new Request("http://localhost:3000/api/defense/angry-debunkers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: "الفراعنة كائنات فضائية بنوا الأهرامات" })
  });

  const res = await POST(req);
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

run();
