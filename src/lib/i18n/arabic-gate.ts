/**
 * ARABIC CONDITIONAL RENDERING — Q112
 * Controls visibility of unvalidated Arabic scale translations
 * MHLS: Has approved student Arabic version → show
 * GHSQ: Arabic translation unconfirmed → hide/modify
 * 
 * Framework: §27.2 — Arabic Deployment Gate
 */

export interface ScaleValidationStatus {
  scaleId: string;
  nameEn: string;
  nameAr: string;
  arabicValidated: boolean;
  validationType: "full" | "back_translation" | "pending" | "not_started";
  validatedBy?: string;
  validationDate?: string;
  notes?: string;
}

/**
 * Master registry of scale Arabic validation status
 * Based on §27.2: Arabic Deployment Gate
 */
export const SCALE_VALIDATION_REGISTRY: ScaleValidationStatus[] = [
  {
    scaleId: "mist20",
    nameEn: "MIST-20 (Misinformation Susceptibility)",
    nameAr: "اختبار القابلية للمعلومات المضللة",
    arabicValidated: true,
    validationType: "back_translation",
    validatedBy: "Research team back-translation with expert review",
    validationDate: "2026-03-15",
    notes: "Contextualized for Egyptian news environment — Western political items replaced with MENA equivalents",
  },
  {
    scaleId: "mhls",
    nameEn: "MHLS (Mental Health Literacy Scale)",
    nameAr: "مقياس الثقافة الصحية النفسية",
    arabicValidated: true,
    validationType: "full",
    validatedBy: "Approved student Arabic version exists in literature",
    validationDate: "2025-09-20",
  },
  {
    scaleId: "ghsq",
    nameEn: "GHSQ (General Help-Seeking Questionnaire)",
    nameAr: "استبيان طلب المساعدة العام",
    arabicValidated: false,
    validationType: "pending",
    notes: "Arabic translation not yet validated. Using English version with Arabic instructions. Full validation pending ethics approval.",
  },
  {
    scaleId: "brief-rcope",
    nameEn: "Brief RCOPE (Religious Coping)",
    nameAr: "مقياس التكيف الديني المختصر",
    arabicValidated: true,
    validationType: "full",
    validatedBy: "Pargament validated Arabic version exists",
    validationDate: "2024-11-01",
  },
  {
    scaleId: "sus",
    nameEn: "SUS (System Usability Scale)",
    nameAr: "مقياس قابلية استخدام النظام",
    arabicValidated: true,
    validationType: "back_translation",
    validatedBy: "Standard back-translation process",
    validationDate: "2026-02-01",
  },
  {
    scaleId: "mc-sds",
    nameEn: "MC-SDS (Social Desirability)",
    nameAr: "مقياس الرغبة الاجتماعية",
    arabicValidated: true,
    validationType: "full",
    validatedBy: "Published Arabic validation exists",
    validationDate: "2023-06-01",
  },
];

/**
 * Check if a scale is safe to render in Arabic
 */
export function isArabicSafe(scaleId: string): boolean {
  const scale = SCALE_VALIDATION_REGISTRY.find(s => s.scaleId === scaleId);
  return scale?.arabicValidated ?? false;
}

/**
 * Get the appropriate language for a scale
 * Returns 'ar' if Arabic validated, 'en' otherwise
 */
export function getScaleLanguage(scaleId: string, userLang: 'ar' | 'en'): 'ar' | 'en' {
  if (userLang === 'en') return 'en';
  return isArabicSafe(scaleId) ? 'ar' : 'en';
}

/**
 * Get validation badge info for display
 */
export function getValidationBadge(scaleId: string): {
  label: string;
  color: string;
  bg: string;
} {
  const scale = SCALE_VALIDATION_REGISTRY.find(s => s.scaleId === scaleId);
  if (!scale) return { label: "Unknown", color: "var(--text-muted)", bg: "var(--bg-secondary)" };

  if (scale.arabicValidated) {
    return {
      label: scale.validationType === "full" ? "AR ✓ Full" : "AR ✓ Back-Trans",
      color: "var(--color-success)",
      bg: "rgba(16,185,129,0.1)",
    };
  }
  return {
    label: "AR ⚠ Pending",
    color: "var(--color-warning)",
    bg: "rgba(245,158,11,0.1)",
  };
}
