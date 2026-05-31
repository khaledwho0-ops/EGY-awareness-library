import { z } from "zod";
import { EgyptianContextVectorSchema, EgyptianContextVector } from './egy-data';
import { rotatingGenerateObject } from "./gemini-rotator";

export async function classifyEgyptianContext(claim: string): Promise<EgyptianContextVector> {
  const { object } = await rotatingGenerateObject({
    schema: z.object({
      vector: EgyptianContextVectorSchema
    }),
    prompt: `Classify the following claim into the most appropriate Egyptian context vector.\nClaim: "${claim}"`,
  });

  return object.vector;
}
