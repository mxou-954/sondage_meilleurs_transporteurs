"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { POINTS_NEGATIFS_CLIENT, POINTS_NEGATIFS_PRO } from "@/app/data/transporteurs";
import TopBar from "./TopBar";

type Props = {
  onNext: (points: string[]) => void;
  onSkip: () => void;
  onBack: () => void;
  stepLabel: string;
  profile: "pro" | "client";
};

export default function PointsNegatifsStep({ onNext, onSkip, onBack, stepLabel, profile }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const points = profile === "pro" ? POINTS_NEGATIFS_PRO : POINTS_NEGATIFS_CLIENT;
  const maxChoix = profile === "pro" ? 7 : 6;

  const toggle = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= maxChoix) return prev;
      return [...prev, id];
    });
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar step={stepLabel} onBack={onBack} progress={70} />

      <div style={{ flex: 1, overflowY: "auto", paddingTop: 72, paddingBottom: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 0" }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", padding: "4px 12px",
              borderRadius: 20, background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14,
            }}>
              <span style={{ fontSize: 10, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Optionnel
              </span>
            </div>

            {profile === "pro" ? (
              <h2 className="serif" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.4, marginBottom: 8 }}>
                Quels problèmes avez-vous rencontrés avec vos livraisons ?
              </h2>
            ) : (
              <h2 className="serif" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.4, marginBottom: 8 }}>
                Quelles sont vos principales critiques vis-à-vis de vos transporteurs ?
              </h2>
            )}
            <div className="divider-gold" style={{ width: 40, margin: "16px 0 8px" }} />
            <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 24, lineHeight: 1.6 }}>
              Choisissez jusqu'à {maxChoix} points —{" "}
              <span style={{ color: selected.length > 0 ? "var(--gold)" : "var(--text3)", transition: "color 0.15s" }}>
                {selected.length}/{maxChoix} sélectionné{selected.length > 1 ? "s" : ""}
              </span>
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {points.map((p, i) => {
              const isSelected = selected.includes(p.id);
              const isDisabled = !isSelected && selected.length >= maxChoix;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggle(p.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 14, padding: "14px 16px", textAlign: "left",
                    background: isSelected ? "rgba(200,169,110,0.09)" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isSelected ? "var(--gold)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 4,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.35 : 1,
                    boxShadow: isSelected ? "0 0 16px rgba(200,169,110,0.1)" : "none",
                    transition: "all 0.15s", width: "100%",
                  }}
                >
                  <span style={{
                    fontSize: 14,
                    color: isSelected ? "var(--gold2)" : "var(--text)",
                    fontWeight: isSelected ? 500 : 400,
                    lineHeight: 1.4,
                  }}>
                    {p.label}
                  </span>

                  <div style={{
                    flexShrink: 0, width: 20, height: 20, borderRadius: 3,
                    border: `1.5px solid ${isSelected ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                    background: isSelected ? "var(--gold)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}>
                    {isSelected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4.5L3.8 7.5L10 1" stroke="#08080E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky bottom */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        padding: "12px 20px",
        background: "rgba(8,8,14,0.96)", backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(200,169,110,0.1)",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", gap: 10 }}>
          <button
            onClick={onSkip}
            style={{
              flexShrink: 0, padding: "14px 20px", borderRadius: 4,
              background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
              color: "white", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "var(--text2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "var(--text3)"; }}
          >
            Passer
          </button>

          <button
            onClick={() => onNext(selected)}
            style={{
              flex: 1, padding: "14px",
              background: selected.length > 0
                ? "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)"
                : "rgba(200,169,110,0.08)",
              border: `1px solid ${selected.length > 0 ? "transparent" : "rgba(200,169,110,0.2)"}`,
              borderRadius: 4,
              color: selected.length > 0 ? "var(--bg)" : "white",
              fontSize: 12, fontWeight: selected.length > 0 ? 600 : 400,
              letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: selected.length > 0 ? "0 0 24px rgba(200,169,110,0.2)" : "none",
            }}
          >
            {selected.length > 0 ? `Valider (${selected.length}) →` : `Sélectionnez jusqu'à ${maxChoix} points`}
          </button>
        </div>
      </div>
    </div>
  );
}