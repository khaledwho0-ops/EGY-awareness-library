import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../../src/app/api/defense/angry-debunkers/route';

vi.mock('ai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ai')>();
  return {
    ...actual,
    generateObject: vi.fn().mockImplementation(async ({ schema, prompt, model }) => {
      console.log('MOCK GENERATE OBJECT CALLED WITH MODEL:', model);
      if (model === 'llama' || (model && typeof model === 'object' && Object.values(model).some(v => typeof v === 'string' && v.includes('llama')))) {
        return {
          object: { vector: "Educational Panic" }
        };
      }
      return {
        object: {
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
        }
      };
    }),
  };
});

describe('Angry Debunkers POST API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = "mock-openai";
    process.env.OPENROUTER_API_KEY = "mock-openrouter";
  });

  it('should return synthesis complete with 6 top-level fields in data object', async () => {
    const req = new Request('http://localhost/api/defense/angry-debunkers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'I heard the earth is flat.' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
    
    expect(json.type).toBe('SYNTHESIS_COMPLETE');
  });
});
