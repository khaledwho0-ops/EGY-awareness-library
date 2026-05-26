import { describe, it, expect } from "vitest";
import { withTimeout } from "../src/lib/debunking/workers/api-swarm";
import { classifyEgyptianContext } from "../src/lib/debunking/classifier";
import { EgyptianContextVectorSchema } from "../src/lib/debunking/egy-data";

describe("M2 Backend Orchestrator - Iteration 2 Stress Tests", () => {
  it("should timeout exactly at specified time and not crash", async () => {
    const neverResolvingPromise = new Promise<string>((resolve) => {
      // never resolves
    });

    const start = Date.now();
    try {
      await withTimeout(neverResolvingPromise, 100);
      expect.fail("Should have thrown a timeout error");
    } catch (err: any) {
      const duration = Date.now() - start;
      expect(err.message).toBe("Worker timed out");
      // it should be around 100ms
      expect(duration).toBeGreaterThanOrEqual(90);
      expect(duration).toBeLessThan(500); // giving plenty of margin for CI/local execution
    }
  });

  it("should resolve normally if promise completes before timeout", async () => {
    const fastPromise = new Promise<string>((resolve) => {
      setTimeout(() => resolve("success"), 50);
    });

    const result = await withTimeout(fastPromise, 200);
    expect(result).toBe("success");
  });

  it("should classify an Egyptian claim correctly into a valid vector", async () => {
    const claims = [
      "The government is removing all bread subsidies tomorrow!",
      "A new vaccine for Covid is making people sterile, doctors say.",
      "A mysterious Jinn is causing fires in the village of X.",
      "Fake doctors are selling herbal cures that damage the liver.",
      "Foreign spies are destroying our agriculture.",
      "They are selling our public hospitals to foreign investors."
    ];

    for (const claim of claims) {
      try {
        const vector = await classifyEgyptianContext(claim);
        const parsed = EgyptianContextVectorSchema.safeParse(vector);
        expect(parsed.success, `Claim: "${claim}" failed to parse to valid vector. Received: ${vector}`).toBe(true);
      } catch (err: any) {
         expect.fail(`classifyEgyptianContext threw an error for claim "${claim}": ${err.message}`);
      }
    }
  }, 60000); 
});
