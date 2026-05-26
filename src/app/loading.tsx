export default function GlobalLoading() {
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
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(255,255,255,0.1)",
          borderTopColor: "var(--accent-primary, #6366f1)",
          borderRadius: "50%",
          animation: "eal-spin 0.8s linear infinite",
        }}
      />
      <p style={{ fontSize: "0.875rem", opacity: 0.6 }}>Loading…</p>
      <style>{`@keyframes eal-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
