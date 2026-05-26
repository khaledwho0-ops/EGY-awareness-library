"use client";

import { useState, useEffect } from "react";
import { User, LogOut, Shield, X } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  loginAsGuest,
  requestPasswordReset,
  resetPassword,
  seedAdmin,
  type UserProfile,
} from "@/lib/auth";

export function AuthButton() {
  const { t } = useRTL();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    seedAdmin();
    getCurrentUser().then(setUser);
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    // Reload to clear progress state across all components
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => (user ? handleLogout() : setShowModal(true))}
        className="btn-secondary"
        style={{
          padding: "6px 14px",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {user ? (
          <>
            {user.role === "admin" && (
              <Shield size={13} style={{ color: "var(--accent-cta)" }} />
            )}
            <span
              style={{
                maxWidth: 80,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.name.split(" ")[0]}
            </span>
            <LogOut size={13} />
          </>
        ) : (
          <>
            <User size={13} />
            {t({ en: "Login", ar: "تسجيل", arEG: "سجّل" })}
          </>
        )}
      </button>

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onAuth={(nextUser) => {
            setUser(nextUser);
            setShowModal(false);
            // Reload to bind user progress across all components
            window.location.reload();
          }}
        />
      )}
    </>
  );
}

function AuthModal({
  onClose,
  onAuth,
}: {
  onClose: () => void;
  onAuth: (user: UserProfile) => void;
}) {
  const { isRTL, t } = useRTL();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">(
    "login",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [rememberSession, setRememberSession] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [resetPreview, setResetPreview] = useState<{
    token: string;
    expiresAt: string;
  } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const syncNetworkState = () => setIsOffline(!navigator.onLine);
    syncNetworkState();
    window.addEventListener("online", syncNetworkState);
    window.addEventListener("offline", syncNetworkState);
    return () => {
      window.removeEventListener("online", syncNetworkState);
      window.removeEventListener("offline", syncNetworkState);
    };
  }, []);

  const a = isRTL;
  const uiFont = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  const modeLabel = {
    login: t({ en: "Login", ar: "تسجيل الدخول", arEG: "تسجيل الدخول" }),
    register: t({ en: "Create Account", ar: "إنشاء حساب", arEG: "إنشاء حساب" }),
    forgot: t({
      en: "Request Reset Link",
      ar: "طلب رابط إعادة التعيين",
      arEG: "طلب رابط إعادة التعيين",
    }),
    reset: t({ en: "Reset Password", ar: "إعادة تعيين كلمة المرور", arEG: "إعادة تعيين كلمة المرور" }),
  } as const;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid var(--border-primary)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: 14,
    outline: "none",
    direction: dir,
    fontFamily: uiFont,
  };

  const clearFeedback = () => {
    setError("");
    setSuccess("");
  };

  const mapError = (errorCode?: string, retryAfterMinutes?: number) => {
    switch (errorCode) {
      case "ALL_FIELDS_REQUIRED":
        return t({
          en: "All required fields must be filled.",
          ar: "املأ كل الحقول المطلوبة.",
          arEG: "املأ كل الحقول المطلوبة.",
        });
      case "INVALID_EMAIL":
        return t({
          en: "Enter a valid email address.",
          ar: "أدخل بريداً إلكترونياً صحيحاً.",
          arEG: "أدخل بريداً إلكترونياً صحيحاً.",
        });
      case "PASSWORD_TOO_SHORT":
        return t({
          en: "Password must be at least 8 characters.",
          ar: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.",
          arEG: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.",
        });
      case "PASSWORD_MISMATCH":
        return t({
          en: "Passwords do not match.",
          ar: "كلمتا المرور غير متطابقتين.",
          arEG: "كلمتا المرور غير متطابقتين.",
        });
      case "EMAIL_EXISTS":
        return t({
          en: "This email is already registered.",
          ar: "هذا البريد مسجل بالفعل.",
          arEG: "هذا البريد مسجل بالفعل.",
        });
      case "LOCKED_OUT":
        return t({
          en: `Too many attempts. Try again in ${retryAfterMinutes ?? 15} minutes.`,
          ar: `محاولات كثيرة جداً. حاول مرة أخرى بعد ${retryAfterMinutes ?? 15} دقيقة.`,
          arEG: `محاولات كثيرة جداً. حاول مرة أخرى بعد ${retryAfterMinutes ?? 15} دقيقة.`,
        });
      case "RESET_TOKEN_EXPIRED":
        return t({
          en: "Reset code expired. Request a new one.",
          ar: "انتهت صلاحية رمز التعيين. اطلب رمزاً جديداً.",
          arEG: "انتهت صلاحية رمز التعيين. اطلب رمزاً جديداً.",
        });
      case "RESET_TOKEN_INVALID":
        return t({
          en: "Reset code is invalid.",
          ar: "رمز إعادة التعيين غير صالح.",
          arEG: "رمز إعادة التعيين غير صالح.",
        });
      case "INVALID_CREDENTIALS":
      default:
        return t({
          en: "Invalid email or password.",
          ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
          arEG: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        });
    }
  };

  const switchMode = (nextMode: "login" | "register" | "forgot" | "reset") => {
    setMode(nextMode);
    setError("");
    setSuccess("");
    if (nextMode !== "reset") {
      setResetCode("");
      setConfirmPassword("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearFeedback();
    setSubmitting(true);

    try {
      if (mode === "register") {
        const result = await registerUser(name, email, password, adminCode || undefined, {
          persistent: rememberSession,
        });
        if (!result.ok) {
          setError(mapError(result.errorCode, (result as any).retryAfterMinutes));
          return;
        }
        onAuth((result as any).user);
        return;
      }

      if (mode === "login") {
        const result = await loginUser(email, password, {
          persistent: rememberSession,
        });
        if (!result.ok) {
          setError(mapError(result.errorCode, (result as any).retryAfterMinutes));
          return;
        }
        onAuth((result as any).user);
        return;
      }

      if (mode === "forgot") {
        const preview = await requestPasswordReset(email);
        setResetPreview({
          token: preview.previewToken,
          expiresAt: preview.expiresAt,
        });
        setSuccess(
          t({
            en: "If the account exists, a reset link has been issued. In this pilot build, use the preview code below.",
            ar: "إذا كان الحساب موجوداً فقد تم إصدار رابط إعادة تعيين. في هذه النسخة التجريبية استخدم رمز المعاينة بالأسفل.",
            arEG: "إذا كان الحساب موجوداً فقد تم إصدار رابط إعادة تعيين. في هذه النسخة التجريبية استخدم رمز المعاينة بالأسفل.",
          }),
        );
        setMode("reset");
        return;
      }

      const result = await resetPassword(email, resetCode, password, confirmPassword, {
        persistent: rememberSession,
      });
      if (!result.ok) {
        setError(mapError(result.errorCode, (result as any).retryAfterMinutes));
        return;
      }
      onAuth((result as any).user);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10001,
          width: "min(440px, calc(100vw - 32px))",
          borderRadius: 20,
          background: "var(--bg-primary)",
          border: "1px solid var(--border-primary)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
          overflow: "hidden",
          direction: dir,
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(135deg, var(--accent-cta) 0%, var(--accent-deepreal) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <User size={20} style={{ color: "#fff" }} />
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                fontFamily: uiFont,
              }}
            >
              {modeLabel[mode]}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              padding: 6,
              cursor: "pointer",
              color: "#fff",
              display: "flex",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {isOffline && (
            <div
              style={{
                color: "var(--color-warning)",
                fontSize: 12,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(245,158,11,0.1)",
                lineHeight: 1.6,
                fontFamily: uiFont,
              }}
            >
              {t({
                en: "You are offline. Local pilot login still works, but reset-email delivery is simulated only.",
                ar: "أنت غير متصل. تسجيل الدخول المحلي يعمل، لكن إرسال بريد إعادة التعيين هنا محاكاة فقط.",
                arEG: "أنت غير متصل. تسجيل الدخول المحلي يعمل، لكن إرسال بريد إعادة التعيين هنا محاكاة فقط.",
              })}
            </div>
          )}

          {mode === "register" && (
            <input
              type="text"
              placeholder={t({
                en: "Full Name",
                ar: "الاسم الكامل",
                arEG: "الاسم الكامل",
              })}
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder={t({
              en: "Email",
              ar: "البريد الإلكتروني",
              arEG: "البريد الإلكتروني",
            })}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={inputStyle}
          />

          {mode !== "forgot" && (
            <input
              type="password"
              placeholder={t({
                en: mode === "reset" ? "New password" : "Password",
                ar: mode === "reset" ? "كلمة المرور الجديدة" : "كلمة المرور",
                arEG: mode === "reset" ? "كلمة المرور الجديدة" : "كلمة المرور",
              })}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={inputStyle}
            />
          )}

          {mode === "reset" && (
            <>
              <input
                type="text"
                placeholder={t({
                  en: "Reset code",
                  ar: "رمز إعادة التعيين",
                  arEG: "رمز إعادة التعيين",
                })}
                value={resetCode}
                onChange={(event) => setResetCode(event.target.value.toUpperCase())}
                style={inputStyle}
              />
              <input
                type="password"
                placeholder={t({
                  en: "Confirm new password",
                  ar: "تأكيد كلمة المرور الجديدة",
                  arEG: "تأكيد كلمة المرور الجديدة",
                })}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                style={inputStyle}
              />
            </>
          )}

          {mode === "register" && (
            <div>
              <button
                type="button"
                onClick={() => setShowAdmin((current) => !current)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-caption)",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: uiFont,
                }}
              >
                {t({
                  en: "Have an admin code?",
                  ar: "لديك رمز مشرف؟",
                  arEG: "لديك رمز مشرف؟",
                })}
              </button>
              {showAdmin && (
                <input
                  type="text"
                  placeholder={t({
                    en: "Admin code (optional)",
                    ar: "رمز المشرف (اختياري)",
                    arEG: "رمز المشرف (اختياري)",
                  })}
                  value={adminCode}
                  onChange={(event) => setAdminCode(event.target.value)}
                  style={{ ...inputStyle, marginTop: 8 }}
                />
              )}
            </div>
          )}

          {(mode === "login" || mode === "register" || mode === "reset") && (
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "var(--text-muted)",
                cursor: "pointer",
                fontFamily: uiFont,
              }}
            >
              <input
                type="checkbox"
                checked={rememberSession}
                onChange={(event) => setRememberSession(event.target.checked)}
              />
              {t({
                en: "Keep me signed in for 24 hours",
                ar: "ابقني مسجلاً لمدة 24 ساعة",
                arEG: "ابقني مسجلاً لمدة 24 ساعة",
              })}
            </label>
          )}

          {mode === "login" && (
            <button
              type="button"
              onClick={() => {
                clearFeedback();
                setResetPreview(null);
                switchMode("forgot");
              }}
              style={{
                alignSelf: a ? "flex-start" : "flex-end",
                background: "none",
                border: "none",
                color: "var(--accent-cta)",
                fontSize: 12,
                cursor: "pointer",
                padding: 0,
                fontFamily: uiFont,
              }}
            >
              {t({
                en: "Forgot password?",
                ar: "نسيت كلمة المرور؟",
                arEG: "نسيت كلمة المرور؟",
              })}
            </button>
          )}

          {error && (
            <div
              style={{
                color: "var(--color-danger)",
                fontSize: 13,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.1)",
                fontFamily: uiFont,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: "var(--color-success)",
                fontSize: 13,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(34,197,94,0.1)",
                lineHeight: 1.6,
                fontFamily: uiFont,
              }}
            >
              {success}
            </div>
          )}

          {resetPreview && mode === "reset" && (
            <div
              style={{
                fontSize: 12,
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.12)",
                lineHeight: 1.6,
                fontFamily: uiFont,
              }}
            >
              <div
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {t({
                  en: "Pilot reset preview",
                  ar: "معاينة إعادة التعيين التجريبية",
                  arEG: "معاينة إعادة التعيين التجريبية",
                })}
              </div>
              <div style={{ color: "var(--text-muted)" }}>
                {t({
                  en: "Use this preview code now. It expires in 1 hour.",
                  ar: "استخدم رمز المعاينة الآن. تنتهي صلاحيته خلال ساعة.",
                  arEG: "استخدم رمز المعاينة الآن. تنتهي صلاحيته خلال ساعة.",
                })}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--accent-cta)",
                }}
              >
                {resetPreview.token}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: 15,
              opacity: submitting ? 0.7 : 1,
              fontFamily: uiFont,
            }}
          >
            {submitting
              ? t({ en: "Working...", ar: "جارٍ التنفيذ...", arEG: "جارٍ التنفيذ..." })
              : mode === "login"
                ? t({ en: "Login", ar: "دخول", arEG: "دخول" })
                : mode === "register"
                  ? t({ en: "Register", ar: "إنشاء", arEG: "إنشاء" })
                  : mode === "forgot"
                    ? t({
                        en: "Send Reset Link",
                        ar: "إصدار رابط التعيين",
                        arEG: "إصدار رابط التعيين",
                      })
                    : t({
                        en: "Reset Password",
                        ar: "تغيير كلمة المرور",
                        arEG: "تغيير كلمة المرور",
                      })}
          </button>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={async () => {
                const guest = await loginAsGuest({ persistent: rememberSession });
                if (guest.ok) onAuth(guest.user);
              }}
              className="btn-secondary"
              style={{
                flex: 1,
                padding: "12px",
                fontSize: 13,
                fontFamily: uiFont,
              }}
            >
              {t({
                en: "Guest Login",
                ar: "دخول كزائر",
                arEG: "دخول كزائر",
              })}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              clearFeedback();
              setResetPreview(null);
              setConfirmPassword("");
              setResetCode("");
              switchMode(mode === "login" ? "register" : "login");
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-cta)",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: uiFont,
            }}
          >
            {mode === "login"
              ? t({
                  en: "No account? Register now",
                  ar: "ليس لديك حساب؟ سجّل الآن",
                  arEG: "ليس لديك حساب؟ سجّل الآن",
                })
              : t({
                  en: "Have an account? Login",
                  ar: "لديك حساب؟ سجّل دخول",
                  arEG: "لديك حساب؟ سجّل دخول",
                })}
          </button>

          {(mode === "forgot" || mode === "reset") && (
            <button
              type="button"
              onClick={() => {
                clearFeedback();
                switchMode(mode === "forgot" ? "login" : "forgot");
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-caption)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: uiFont,
              }}
            >
              {mode === "forgot"
                ? t({
                    en: "Back to login",
                    ar: "العودة لتسجيل الدخول",
                    arEG: "العودة لتسجيل الدخول",
                  })
                : t({
                    en: "Need a new reset code?",
                    ar: "تحتاج رمزاً جديداً؟",
                    arEG: "تحتاج رمزاً جديداً؟",
                  })}
            </button>
          )}
        </form>
      </div>
    </>
  );
}
