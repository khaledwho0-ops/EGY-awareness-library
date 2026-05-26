"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, isAdmin, seedAdmin } from "@/lib/auth";
import { Shield, Lock } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import SupervisorDashboard from "@/components/admin/supervisor-dashboard";

/**
 * SUPERVISOR REVIEW PAGE — Q117
 * Route: /supervisor
 * Protected admin page — shows access denied for non-admins
 */
export default function SupervisorPage() {
  const [mounted, setMounted] = useState(false);
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  useEffect(() => {
    seedAdmin();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const user = null as any;
  const admin = isAdmin();

  if (!user || !admin) {
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh" }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 560, textAlign: "center" }}>
          <div className="glass-card" style={{ padding: "48px 32px", marginTop: 60 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
            }}>
              <Lock size={32} style={{ color: "#EF4444" }} />
            </div>
            <h1 style={{ fontSize: 24, marginBottom: 12, fontFamily: ff }}>
              {t({ en: "Admin Access Required", ar: "مطلوب صلاحية المشرف", arEG: "مطلوب صلاحية المشرف" })}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 24, fontFamily: ff }}>
              {t({
                en: "The Supervisor Dashboard is restricted to administrators only. Please log in with an admin account to access research operations, cohort analytics, and governance tools.",
                ar: "لوحة المشرف مقيدة بالمشرفين فقط. يرجى تسجيل الدخول بحساب مشرف للوصول إلى عمليات البحث وتحليلات الفوج وأدوات الحوكمة.",
                arEG: "لوحة المشرف مقيدة بالمشرفين فقط. يرجى تسجيل الدخول بحساب مشرف للوصول إلى عمليات البحث وتحليلات الفوج وأدوات الحوكمة.",
              })}
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <div className="glass-card" style={{
                padding: "12px 16px", fontSize: 12, color: "var(--text-muted)",
                lineHeight: 1.6, textAlign: "left", fontFamily: ff,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: "var(--text-primary)" }}>
                  {t({ en: "Admin credentials:", ar: "بيانات المشرف:", arEG: "بيانات المشرف:" })}
                </div>
                <div>{t({ en: "Email:", ar: "البريد:", arEG: "البريد:" })} <code style={{ color: "#EF4444" }}>admin@eal.edu.eg</code></div>
                <div>{t({ en: "Password:", ar: "كلمة المرور:", arEG: "كلمة المرور:" })} <code style={{ color: "#EF4444" }}>EAL2026!</code></div>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="btn-primary no-underline"
              style={{ marginTop: 20, display: "inline-flex", padding: "12px 24px", fontSize: 14, fontFamily: ff }}
            >
              {t({ en: "Go to Dashboard", ar: "الذهاب إلى لوحة المعلومات", arEG: "الذهاب إلى لوحة المعلومات" })}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <SupervisorDashboard />;
}
