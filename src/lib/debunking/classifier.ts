import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
import { z } from "zod";
import { EgyptianContextVectorSchema, EgyptianContextVector } from './egy-data';

export async function classifyEgyptianContext(claim: string): Promise<EgyptianContextVector> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required. Please set it in your .env file.');
  }

  const { object } = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: z.object({
      vector: EgyptianContextVectorSchema
    }),
    prompt: `Classify the following claim into the most appropriate Egyptian context vector.\nClaim: "${claim}"`,
  });

  return object.vector;
}

