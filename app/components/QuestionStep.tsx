"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/app/data/transporteurs";
import TopBar from "./TopBar";

type Props = {
  question: Question;
  qIndex: number;
  total: number;
  savedVote: string | null;
  onVote: (qId: string, tId: string | null) => void;
  onBack: () => void;
};

export default function QuestionStep({ question, qIndex, total, savedVote, onVote, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(savedVote);
  const progress = Math.round(((qIndex + 1) / (total + 3)) * 100) + 30; // offset for profile+identity steps

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar
        step={`${qIndex + 3} / ${total + 2}`}
        onBack={onBack}
        progress={progress}
      />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 72, paddingBottom: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 0" }}>

          {/* Category badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
              Question {qIndex + 1} sur {total} — {question.label}
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.4, marginBottom: 8 }}>
              {question.text}
            </h2>
            <div className="divider-gold" style={{ width: 40, margin: "16px 0 28px" }} />
          </motion.div>

          {/* Transporteur list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {question.transporteurs.map((t, i) => {
              const isSelected = selected === t.id;
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025 }}
                  onClick={() => setSelected(isSelected ? null : t.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", textAlign: "left",
                    background: isSelected ? "rgba(200,169,110,0.09)" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isSelected ? "var(--gold)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 4, cursor: "pointer",
                    boxShadow: isSelected ? "0 0 16px rgba(200,169,110,0.1)" : "none",
                    transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
                    width: "100%",
                  }}
                >
                  {/* Logo slot */}
                  <div style={{
                    flexShrink: 0, width: 52, height: 36,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 3, overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/${t.logo}`}
                      alt={t.nom}
                      style={{ width: "100%", height: "100%", objectFit: "contain", padding: 5 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>

                  {/* Name + desc */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: isSelected ? "var(--gold2)" : "var(--text)", marginBottom: 2 }}>
                      {t.nom}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.4 }}>
                      {t.description}
                    </div>
                  </div>

                  {/* Check circle */}
                  <div style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                    border: `1.5px solid ${isSelected ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                    background: isSelected ? "var(--gold)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}>
                    {isSelected && (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4.5L3.8 7.5L10 1" stroke="#08080E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Je ne sais pas link */}
          <button
            onClick={() => onVote(question.id, null)}
            style={{ marginTop: 20, background: "none", border: "none", color: "var(--text3)", fontSize: 12, cursor: "pointer", letterSpacing: "0.06em", display: "block", textAlign: "center", width: "100%", padding: "8px" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text2)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}
          >
            Je ne sais pas — passer cette question
          </button>
        </div>
      </div>

      {/* ── STICKY BOTTOM CTA ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        padding: "14px 20px",
        background: "rgba(8,8,14,0.96)", backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(200,169,110,0.1)",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.button
              key={selected ?? "empty"}
              initial={{ opacity: 0.6, y: 4 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => { if (selected) onVote(question.id, selected); }}
              disabled={!selected}
              style={{
                width: "100%", padding: "16px",
                background: selected
                  ? "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)"
                  : "rgba(200,169,110,0.08)",
                border: `1px solid ${selected ? "transparent" : "rgba(200,169,110,0.2)"}`,
                borderRadius: 4,
                color: selected ? "var(--bg)" : "var(--text3)",
                fontSize: 12, fontWeight: selected ? 600 : 400,
                letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: selected ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                boxShadow: selected ? "0 0 24px rgba(200,169,110,0.2)" : "none",
              }}
            >
              {selected
                ? `Valider : ${question.transporteurs.find(t => t.id === selected)?.nom} →`
                : "Sélectionnez un transporteur"}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
