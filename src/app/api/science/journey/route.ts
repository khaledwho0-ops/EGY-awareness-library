import { NextResponse } from "next/server";
import { getJourneyPayload } from "@/lib/science/module-service";

export async function GET() {
  const payload = await getJourneyPayload();
  return NextResponse.json(payload);
}
