import { POST } from "../../src/app/api/defense/angry-debunkers/route";

const originalFetch = global.fetch;

global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = input.toString();

  // Mock OpenAlex
  if (url.includes("api.openalex.org")) {
    return new Response(JSON.stringify({
      results: [{ title: "Mock Paper", abstract_inverted_index: {}, id: "http://mock" }]
    }), { status: 200 });
  }

  // Mock EuropePMC
  if (url.includes("europepmc/webservices")) {
    return new Response(JSON.stringify({
      resultList: { result: [{ title: "Mock PMC", pmid: "12345" }] }
    }), { status: 200 });
  }

  // Mock Quran
  if (url.includes("api.alquran.cloud")) {
    return new Response(JSON.stringify({
      data: { count: 1 }
    }), { status: 200 });
  }

  // Mock OpenRouter (Llama for classification)
  if (url.includes("openrouter.ai")) {
    return new Response(JSON.stringify({
      id: "chatcmpl-class",
      object: "chat.completion",
      created: 12345,
      model: "meta-llama/llama-3.3-70b-instruct",
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: JSON.stringify({ vector: "Educational Panic" })
        },
        finish_reason: "stop"
      }]
    }), { status: 200 });
  }

  // Mock OpenAI (GPT-4o-mini for Synthesis)
  if (url.includes("api.openai.com")) {
    const jsonStr = JSON.stringify({
      confidence_score: 95,
      egyptian_vector_hit: "Educational Panic",
      negative_science_violation: "Logical Fallacies",
      god_system_7_layer_audit: {
        emotion_strip: { layer_name: "Emotion Strip", audit_result: "Stripped", confidence: 99, passed: true },
        provenance_audit: { layer_name: "Provenance", audit_result: "Checked", confidence: 99, passed: true },
        incentive_map: { layer_name: "Incentive Map", audit_result: "Mapped", confidence: 99, passed: true },
        methodological_destruction: { layer_name: "Methodological Destruction", audit_result: "Destroyed", confidence: 99, passed: true },
        fallacy_execution: { layer_name: "Fallacy Execution", audit_result: "Executed", confidence: 99, passed: true },
        truth_sandwich: { layer_name: "Truth Sandwich", audit_result: "Made", confidence: 99, passed: true },
        forward_defense: { layer_name: "Forward Defense", audit_result: "Defended", confidence: 99, passed: true }
      },
      truth_sandwich: {
        fact_1: "Fact 1",
        myth: "Myth",
        fact_2: "Fact 2"
      }
    });

    return new Response(JSON.stringify({
      id: "chatcmpl-123",
      object: "chat.completion",
      created: 12345,
      model: "gpt-4o-mini",
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: jsonStr
        },
        finish_reason: "stop"
      }]
    }), { status: 200 });
  }

  return originalFetch(input, init);
};

process.env.OPENAI_API_KEY = "mock-key";
process.env.OPENROUTER_API_KEY = "mock-router-key";

async function run() {
  const req = new Request("http://localhost/api/defense/angry-debunkers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "Test Query" })
  });

  const res = await POST(req);
  console.log("Status:", res.status);
  
  const json = await res.json();
  console.log("Response JSON:", JSON.stringify(json, null, 2));

  // Assertions
  const data = json.data;
  if (data) {
    console.log("Keys in data:", Object.keys(data));
  } else {
    console.log("No data object found.");
  }
}

run().catch(console.error);
