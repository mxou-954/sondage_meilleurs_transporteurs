"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Question } from "@/app/data/transporteurs";
import TopBar from "./TopBar";

type Avis = Record<string, "good" | "neutral" | "bad">;

type Props = {
  question: Question;
  votedId: string | null;
  onNext: (avis: Avis) => void;
  onSkip: () => void;
  onBack: () => void;
};

const EMOJIS: { key: "good" | "neutral" | "bad"; emoji: string; label: string; color: string }[] = [
  { key: "good",    emoji: "😊", label: "Positif",  color: "rgba(74,222,128,0.15)"  },
  { key: "neutral", emoji: "😐", label: "Neutre",   color: "rgba(200,169,110,0.12)" },
  { key: "bad",     emoji: "😞", label: "Négatif",  color: "rgba(239,68,68,0.12)"   },
];

export default function AvisStep({ question, votedId, onNext, onSkip, onBack }: Props) {
  const [avis, setAvis] = useState<Avis>({});

  // Exclude the one they voted for
  const transporteurs = useMemo(() => {
    return [...question.transporteurs]
      .filter(t => t.id !== votedId)
      .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  }, [question.id, votedId]);

  const toggle = (tId: string, key: "good" | "neutral" | "bad") => {
    setAvis(prev => {
      const next = { ...prev };
      if (next[tId] === key) delete next[tId];
      else next[tId] = key;
      return next;
    });
  };

  const rated = Object.keys(avis).length;

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar step="2 / 3" onBack={onBack} progress={50} />

      {/* Scrollable */}
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
            <h2 className="serif" style={{ fontSize: "clamp(1.3rem, 4vw, 1.9rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.35, marginBottom: 8 }}>
              Donnez votre avis sur d'autres transporteurs
            </h2>
            <div className="divider-gold" style={{ width: 40, margin: "14px 0 6px" }} />
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 28, lineHeight: 1.6 }}>
              Facultatif · Vous pouvez donner votre avis sur un ou plusieurs autres transporteurs.
            </p>
          </motion.div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {transporteurs.map((t, i) => {
              const selected = avis[t.id];
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px",
                    background: selected ? EMOJIS.find(e => e.key === selected)?.color : "rgba(255,255,255,0.025)",
                    border: `1px solid ${selected ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
                    borderRadius: 4,
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  {/* Logo */}
                  <div style={{
                    flexShrink: 0, width: 44, height: 32,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 3, overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/${t.logo}`}
                      alt={t.nom}
                      style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>

                  {/* Name */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.nom}
                    </div>
                  </div>

                  {/* Emoji buttons */}
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    {EMOJIS.map(({ key, emoji, label, color }) => (
                      <button
                        key={key}
                        onClick={() => toggle(t.id, key)}
                        title={label}
                        style={{
                          width: 38, height: 38, borderRadius: 4,
                          border: `1px solid ${selected === key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                          background: selected === key ? color : "transparent",
                          fontSize: 18, cursor: "pointer",
                          transition: "all 0.15s",
                          transform: selected === key ? "scale(1.15)" : "scale(1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                        onMouseEnter={e => { if (selected !== key) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={e => { if (selected !== key) e.currentTarget.style.background = "transparent"; }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
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
              color: "var(--text3)", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "var(--text2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "var(--text3)"; }}
          >
            Passer
          </button>

          <button
            onClick={() => onNext(avis)}
            style={{
              flex: 1, padding: "14px",
              background: rated > 0
                ? "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)"
                : "rgba(200,169,110,0.08)",
              border: `1px solid ${rated > 0 ? "transparent" : "rgba(200,169,110,0.2)"}`,
              borderRadius: 4,
              color: rated > 0 ? "var(--bg)" : "var(--text3)",
              fontSize: 12, fontWeight: rated > 0 ? 600 : 400,
              letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: rated > 0 ? "0 0 24px rgba(200,169,110,0.2)" : "none",
            }}
          >
            {rated > 0 ? `Valider mes avis (${rated}) →` : "Valider mes avis (0) →"}
          </button>
        </div>
      </div>
    </div>
  );
}
