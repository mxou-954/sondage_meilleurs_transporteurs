"use client";
import { motion } from "framer-motion";
import TopBar from "./TopBar";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const WEBINARS = [
  {
    id: "poids-volumetrique",
    date: "25 juin 2026",
    jour: "Jeudi",
    heure: "11h30",
    titre: "Poids Volumétrique",
    desc: "Comprenez comment le poids volumétrique impacte vos factures transporteurs et comment le négocier efficacement.",
    tags: ["Express", "Fret", "Négociation"],
    link: "https://app.livestorm.co/p/955ef7ae-8e7b-4171-a553-ce4290db02ed",
    badge: "Dans quelques jours",
    badgeColor: "rgba(74,222,128,0.15)",
    badgeBorder: "rgba(74,222,128,0.3)",
    badgeText: "#4ade80",
  },
  {
    id: "ecommerce",
    date: "2 juillet 2026",
    jour: "Jeudi",
    heure: "11h30",
    titre: "Spécial E-commerce",
    desc: "Stratégies transport pour les e-commerçants : réduire les coûts, améliorer les délais et fidéliser vos clients.",
    tags: ["E-commerce", "B2C", "Optimisation"],
    link: "https://app.livestorm.co/p/d7c705cb-fe19-4575-9459-f75dcaa3313e",
    badge: "Inscription ouverte",
    badgeColor: "rgba(200,169,110,0.12)",
    badgeBorder: "rgba(200,169,110,0.3)",
    badgeText: "var(--gold)",
  },
];

export default function WebinarStep({ onNext, onBack }: Props) {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar step="Bonus" onBack={onBack} progress={75} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 560 }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
              Exclusif · Professionnels
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.2, marginBottom: 10 }}>
              Nos prochains webinars
            </h2>
            <div className="divider-gold" style={{ width: 50, margin: "14px auto 0" }} />
          </div>

          {/* Webinar cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
            {WEBINARS.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.12 }}
                style={{
                  padding: "24px", borderRadius: 4,
                  background: "var(--bg2)",
                  border: "1px solid rgba(200,169,110,0.18)",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Subtle glow */}
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                  {/* Date block */}
                  <div style={{ flexShrink: 0, textAlign: "center", padding: "8px 14px", background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 4 }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{w.jour}</div>
                    <div className="serif" style={{ fontSize: 22, color: "var(--gold2)", fontWeight: 400, lineHeight: 1 }}>{w.date.split(" ")[0]}</div>
                    <div style={{ fontSize: 10, color: "var(--text3)", letterSpacing: "0.06em" }}>{w.date.split(" ").slice(1).join(" ")}</div>
                    <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 4, fontWeight: 500 }}>{w.heure}</div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, background: w.badgeColor, border: `1px solid ${w.badgeBorder}`, marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: w.badgeText, letterSpacing: "0.08em" }}>{w.badge}</span>
                    </div>
                    <h3 className="serif" style={{ fontSize: 18, color: "var(--text)", fontWeight: 400, marginBottom: 6, lineHeight: 1.2 }}>
                      {w.titre}
                    </h3>
                    <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.65, marginBottom: 12 }}>
                      {w.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {w.tags.map(tag => (
                        <span key={tag} style={{ padding: "3px 10px", borderRadius: 2, border: "1px solid rgba(200,169,110,0.2)", background: "rgba(200,169,110,0.05)", fontSize: 11, color: "var(--gold)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={w.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "9px 16px", borderRadius: 4,
                        background: "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%)",
                        color: "var(--bg)", fontSize: 11, fontWeight: 600,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      📅 S'inscrire gratuitement
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={onNext}
            style={{
              width: "100%", padding: "16px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4, color: "var(--text3)",
              fontSize: 12, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)"; e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text3)"; }}
          >
            Continuer le vote →
          </button>
        </motion.div>
      </div>
    </div>
  );
}