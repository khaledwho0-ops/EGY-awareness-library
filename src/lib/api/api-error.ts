import { NextResponse } from "next/server";

/**
 * Standardized bilingual API error response.
 * All EAL API routes MUST use this for user-visible errors.
 */
export function apiError(
  status: number,
  errorCode: string,
  messageAr: string,
  messageEn: string,
  recoveryAction?: string
) {
  return NextResponse.json(
    {
      ok: false,
      errorCode,
      message: messageAr,
      messageEn,
      ...(recoveryAction && { recoveryAction }),
    },
    { status }
  );
}

/** Common error presets */
export const ERR = {
  missingQuery: () =>
    apiError(400, "MISSING_QUERY", "مطلوب كتابة كلمة البحث.", "Search query is required."),
  notConfigured: (service: string) =>
    apiError(
      503,
      "SERVICE_NOT_CONFIGURED",
      `خدمة ${service} مش متوفرة دلوقتي. جاري الإعداد.`,
      `${service} is not configured yet.`,
      "RETRY_LATER"
    ),
  fetchFailed: (service: string) =>
    apiError(
      500,
      "FETCH_FAILED",
      `حصل مشكلة في جلب البيانات من ${service}. حاول تاني.`,
      `Failed to fetch from ${service}. Please retry.`,
      "RETRY"
    ),
  notFound: (item: string) =>
    apiError(
      404,
      "NOT_FOUND",
      `${item} مش موجود. تأكد من البيانات وحاول تاني.`,
      `${item} not found. Check your input and retry.`
    ),
  invalidPayload: () =>
    apiError(400, "INVALID_PAYLOAD", "البيانات المرسلة غير صحيحة.", "Invalid request payload."),
} as const;
