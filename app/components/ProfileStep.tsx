"use client";
import { motion } from "framer-motion";
import { Profile } from "./App";
import TopBar from "./TopBar";

type Props = { onSelect: (p: Profile) => void; onBack: () => void };

export default function ProfileStep({ onSelect, onBack }: Props) {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar step="1 / 3" onBack={onBack} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 600 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", textAlign: "center", marginBottom: 12 }}>
            Étape 1
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 400, textAlign: "center", color: "var(--text)", marginBottom: 8 }}>
            Votre profil
          </h2>
          <div className="divider-gold" style={{ width: 50, margin: "16px auto 12px" }} />
          <p style={{ fontSize: 13, color: "var(--text2)", textAlign: "center", marginBottom: 40 }}>
            Les questions s'adaptent à votre expérience.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {([
              {
                id: "pro" as Profile,
                icon: "💼",
                title: "Professionnel",
                description: "Les votants devront renseigner leur email professionnel.",
              },
              {
                id: "client" as Profile,
                icon: "🙎‍♂️",
                title: "Particulier",
                description: "",
              },
            ] as const).map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(200,169,110,0.12)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(p.id)}
                style={{
                  padding: "32px 28px", textAlign: "left",
                  background: "var(--bg2)", border: "1px solid rgba(200,169,110,0.18)",
                  borderRadius: 4, cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                <div className="serif" style={{ fontSize: 22, color: "var(--text)", marginBottom: 4, fontWeight: 400 }}>{p.title}</div>
                <div className="serif" style={{ fontSize: 14, color: "var(--text)", marginBottom: 4, fontWeight: 400 }}>{p.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
