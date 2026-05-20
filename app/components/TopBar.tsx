"use client";

type Props = {
  step?: string;
  onBack?: () => void;
  progress?: number; // 0-100
};

export default function TopBar({ step, onBack, progress }: Props) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(8,8,14,0.9)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(200,169,110,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
        {/* Back button */}
        {onBack ? (
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", color: "var(--text3)",
              fontSize: 12, letterSpacing: "0.08em", cursor: "pointer",
              padding: "6px 0", transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour
          </button>
        ) : <div style={{ width: 60 }} />}

        {/* Brand */}
        <span style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--gold)", letterSpacing: "0.12em" }}>
          Mon transporteur préféré
        </span>

        {/* Step indicator */}
        <div style={{ width: 60, textAlign: "right", fontSize: 11, color: "var(--text3)", letterSpacing: "0.08em" }}>
          {step ?? ""}
        </div>
      </div>

      {/* Progress bar */}
      {progress !== undefined && (
        <div style={{ height: 2, background: "rgba(200,169,110,0.08)" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--gold), var(--gold2))",
            transition: "width 0.5s ease",
          }} />
        </div>
      )}
    </div>
  );
}
