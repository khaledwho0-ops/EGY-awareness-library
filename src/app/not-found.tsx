import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary, #0a0a0a)",
        color: "var(--text-primary, #e5e5e5)",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1rem",
          opacity: 0.7,
          marginBottom: "2rem",
        }}
      >
        الصفحة غير موجودة
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "0.5rem",
            color: "var(--text-primary, #e5e5e5)",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          Home / الرئيسية
        </Link>
        <Link
          href="/bad-news"
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            border: "none",
            borderRadius: "0.5rem",
            background: "var(--accent-primary, #6366f1)",
            color: "#fff",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          Bad News Game
        </Link>
      </div>
    </div>
  );
}
