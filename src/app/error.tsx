"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[EAL Error Boundary]", error);
  }, [error]);

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
      <div
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
        }}
      >
        ⚠️
      </div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: "1rem",
          opacity: 0.7,
          marginBottom: "1.5rem",
          maxWidth: "400px",
        }}
      >
        حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          fontWeight: 600,
          border: "none",
          borderRadius: "0.5rem",
          background: "var(--accent-primary, #6366f1)",
          color: "#fff",
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Try Again / حاول مرة أخرى
      </button>
    </div>
  );
}
