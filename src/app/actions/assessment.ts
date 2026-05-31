"use server";

import { z } from "zod";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || crypto.randomUUID()
);

// Strict validation of the incoming assessment payload
const assessmentSchema = z.object({
  configId: z.string(),
  answers: z.record(z.string(), z.number()),
  scores: z.record(z.string(), z.number()),
  duration: z.number(),
});

export async function submitAssessmentAction(payload: any) {
  try {
    // 1. Validate strictly with Zod
    const data = assessmentSchema.parse(payload);

    // 2. Retrieve existing cryptographically signed JWT if present
    const cookieStore = await cookies();
    const token = cookieStore.get("eal_pilot_session")?.value;
    
    let sessionPayload: any = { assessments: [] };
    if (token) {
      try {
        const { payload: verifiedPayload } = await jwtVerify(token, secret);
        sessionPayload = verifiedPayload;
      } catch (e) {
        // Token invalid or expired, start fresh
      }
    }

    // 3. Append new assessment record
    sessionPayload.assessments.push({
      ...data,
      timestamp: new Date().toISOString()
    });

    // 4. Issue cryptographically signed HTTP-only cookie using jose
    const jwt = await new SignJWT(sessionPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    cookieStore.set("eal_pilot_session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Must be lax or strict
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("[Zero-Trust] Assessment validation failed:", error);
    return { success: false, error: "Invalid assessment data" };
  }
}
