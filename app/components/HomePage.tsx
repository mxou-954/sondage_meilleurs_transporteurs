"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VOTE_DEADLINE } from "@/app/data/transporteurs";

function pad(n: number) { return String(n).padStart(2, "0"); }

function useCountdown(deadline: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, ready: false });
  useEffect(() => {
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0, ready: true }); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        ready: true,
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [deadline]);
  return t;
}

function useVoterCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/results").then(r => r.json()).then(d => setCount(d.total)).catch(() => {});
  }, []);
  return count;
}

export default function HomePage({ onStart }: { onStart: () => void }) {
  const t     = useCountdown(VOTE_DEADLINE);
  const count = useVoterCount();

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        background: "rgba(8,8,14,0.8)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(200,169,110,0.1)",
      }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--gold)", letterSpacing: "0.12em" }}>
          COLISCONSULT
        </span>
        <a href="https://www.colisconsult.com" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          colisconsult.com
        </a>
      </nav>

      {/* ── HERO — exactly 100dvh ── */}
      <section style={{
        minHeight: "100dvh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 40px",
        position: "relative", overflow: "hidden",
      }}>

        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(200,169,110,0.06) 0%, transparent 70%)",
        }} />

        {/* Top line decoration */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, var(--gold))", marginBottom: 32 }}
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}
        >
          1ère Édition · 2026
        </motion.p>

        {/* Trophy */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.15 }}
          style={{ fontSize: 72, lineHeight: 1, marginBottom: 28, filter: "drop-shadow(0 0 48px rgba(200,169,110,0.55))" }}
        >
          🏆
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="serif"
          style={{ fontSize: "clamp(2.6rem, 8vw, 6rem)", lineHeight: 1.0, fontWeight: 400, marginBottom: 12 }}
        >
          <span style={{ color: "var(--text)" }}>Meilleur</span>{" "}
          <span className="gold-text" style={{ fontStyle: "italic" }}>Transporteur</span>
          <br />
          <span style={{ color: "var(--text)", fontSize: "0.55em", fontWeight: 300, letterSpacing: "0.08em" }}>
            de l&apos;Année 2026
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="divider-gold"
          style={{ width: 80, margin: "20px auto" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "var(--text2)", maxWidth: 420, lineHeight: 1.75, marginBottom: 36 }}
        >
          L&apos;élection par les professionnels du transport et les expéditeurs. Votez par catégorie et distinguez l&apos;excellence.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 48px rgba(200,169,110,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{
            padding: "16px 48px",
            background: "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)",
            color: "var(--bg)", border: "none", borderRadius: 4,
            fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
            cursor: "pointer", marginBottom: 40,
            boxShadow: "0 0 32px rgba(200,169,110,0.25), 0 2px 16px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.2s",
          }}
        >
          Participer au vote
        </motion.button>

        {/* ── COUNTDOWN ── */}
        {t.ready && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
            style={{ marginBottom: 32 }}
          >
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 14 }}>
              Clôture des votes
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
              {[
                { v: t.d, l: "JOURS" },
                { v: t.h, l: "HRS" },
                { v: t.m, l: "MIN" },
                { v: t.s, l: "SEC" },
              ].map(({ v, l }, i) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    padding: "10px 14px",
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    borderRadius: 4, minWidth: 56,
                  }}>
                    <span className="serif" style={{ fontSize: 24, fontWeight: 400, lineHeight: 1, color: "var(--gold2)", letterSpacing: "0.02em" }}>
                      {pad(v)}
                    </span>
                    <span style={{ fontSize: 8, letterSpacing: "0.15em", color: "var(--text3)", marginTop: 4 }}>{l}</span>
                  </div>
                  {i < 3 && <span style={{ color: "var(--gold)", opacity: 0.4, fontSize: 18, fontFamily: "var(--serif)" }}>·</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── VOTER COUNT ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
          <span style={{ fontSize: 13, color: "var(--text2)" }}>
            {count !== null
              ? count === 0
                ? "Soyez le premier à voter"
                : `${count} professionnel${count > 1 ? "s" : ""} ont déjà voté`
              : "Chargement…"}
          </span>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)", marginTop: 36 }}
        />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", textAlign: "center", marginBottom: 12 }}>
          Processus
        </p>
        <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 400, textAlign: "center", color: "var(--text)", marginBottom: 8 }}>
          Comment voter
        </h2>
        <div className="divider-gold" style={{ width: 50, margin: "16px auto 56px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { n: "01", icon: "👤", title: "Votre profil", desc: "Choisissez entre professionnel du transport ou expéditeur. Les questions s'adaptent." },
            { n: "02", icon: "🗳️", title: "4 questions", desc: "Pour chaque catégorie, sélectionnez le transporteur qui vous paraît le meilleur." },
            { n: "03", icon: "🏆", title: "Résultats", desc: "Le palmarès est annoncé le 10 juillet 2026 et partagé à tous les votants." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              style={{
                padding: "32px 28px",
                background: "var(--bg2)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 4, position: "relative",
              }}
            >
              <div className="serif" style={{ position: "absolute", top: 16, right: 20, fontSize: 36, opacity: 0.07, color: "var(--gold)" }}>{s.n}</div>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
              <h3 className="serif" style={{ fontSize: 18, color: "var(--text)", marginBottom: 10, fontWeight: 400 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.75 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <button
            onClick={onStart}
            style={{
              padding: "14px 40px",
              background: "transparent",
              border: "1px solid var(--gold)",
              borderRadius: 4, color: "var(--gold)",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--goldfade)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            Voter maintenant →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "24px", borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center",
      }}>
        <span className="serif" style={{ fontSize: 13, color: "var(--gold)", letterSpacing: "0.12em" }}>COLISCONSULT</span>
        <span style={{ fontSize: 11, color: "var(--text3)" }}>© 2026 · Tous droits réservés</span>
        <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
          <a href="https://www.colisconsult.com/mentions-legales/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "var(--text3)" }}>Mentions légales</a>
          <a href="https://fr.linkedin.com/company/colisconsult" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "var(--text3)" }}>LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
