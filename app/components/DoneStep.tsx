"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/app/data/transporteurs";

type Votes = Record<string, string>;

type Props = {
  votes: Votes;
  questions: Question[];
  name: string;
  profile: string;
  alreadyVoted?: boolean;
  onRestartAsClient?: () => void;
  avis?: Record<string, "good" | "neutral" | "bad">;
};

export default function DoneStep({ votes, questions, name, profile, alreadyVoted, onRestartAsClient, avis }: Props) {
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Show popup for pros after 2s
  useEffect(() => {
    if (profile === "pro") {
      const t = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(t);
    }
  }, [profile]);

  const isPro = profile === "pro";
  const firstName = name.split(" ")[0] || "";
  const voted = questions.filter(q => votes[q.id]);

  const siteUrl = "https://vote.colisconsult.com";
  const shareText = `Je viens de voter pour le Best Carrier Award 🏆\nL'élection du meilleur transporteur de l'année par ColisConsult.\nVotez aussi : ${siteUrl}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "Best Carrier Award 2026", text: shareText, url: siteUrl }); } catch {}
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>

      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderBottom: "1px solid rgba(200,169,110,0.08)", background: "rgba(8,8,14,0.9)", backdropFilter: "blur(16px)" }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--gold)", letterSpacing: "0.12em" }}>Mon transporteur préféré</span>
        <span> By ColisConsult</span>
      </div>

      {/* ── LAYOUT: two columns on desktop, stack on mobile ── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 20px 40px",
        gap: 32,
        flexWrap: "wrap",
      }}>

        {/* LEFT — Merci + recap + share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ flex: "1 1 280px", maxWidth: 420, display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Trophy */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
            style={{ fontSize: 64, lineHeight: 1, filter: "drop-shadow(0 0 40px rgba(200,169,110,0.6))" }}
          >
            🏆
          </motion.div>

          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
              {alreadyVoted ? "Déjà voté" : "Vote enregistré"}
            </p>
            <h2 className="serif gold-text" style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", fontWeight: 400, marginBottom: 10 }}>
              Merci{firstName ? `, ${firstName}` : ""} !
            </h2>

            {alreadyVoted ? (
              <div style={{ padding: "12px 16px", borderRadius: 4, background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)" }}>
                <p style={{ fontSize: 13, color: "#e74c3c" }}>⚠ Un vote existe déjà pour cette adresse email.</p>
              </div>
            ) : (
              <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7 }}>
                Résultats annoncés le <span style={{ color: "var(--gold2)" }}>10 juillet 2026</span>.
              </p>
            )}
          </div>

          {/* Recap */}
          {voted.length > 0 && (
            <div style={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(200,169,110,0.15)" }}>
              {voted.map((q, i) => {
                const t = q.transporteurs.find(tr => tr.id === votes[q.id]);
                return (
                  <div key={q.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px",
                    background: i % 2 === 0 ? "var(--bg2)" : "rgba(255,255,255,0.015)",
                    borderBottom: i < voted.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>{q.label}</span>
                    <span className="serif" style={{ fontSize: 13, color: "var(--gold2)" }}>{t?.nom}</span>
                  </div>
                );
              })}
            </div>
          )}
          {/* Avis recap */}
          {avis && Object.keys(avis).length > 0 && (
            <div style={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", marginTop: 8 }}>
              <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text3)" }}>
                  Vos avis
                </span>
              </div>
              {Object.entries(avis).map(([tId, sentiment], i) => {
                const transporteur = questions.flatMap(q => q.transporteurs).find(t => t.id === tId);
                const emoji = sentiment === "good" ? "😊" : sentiment === "neutral" ? "😐" : "😞";
                const entries = Object.entries(avis);
                return (
                  <div key={tId} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 16px",
                    background: i % 2 === 0 ? "var(--bg2)" : "rgba(255,255,255,0.01)",
                    borderBottom: i < entries.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>{transporteur?.nom ?? tId}</span>
                    <span style={{ fontSize: 18 }}>{emoji}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Share */}
          <div>
            <p style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              Invitez vos contacts
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={liUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 4, background: "#0A66C2", color: "white", fontSize: 12, fontWeight: 500, transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

              {hasNativeShare ? (
                <button onClick={nativeShare}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 4, background: "transparent", border: "1px solid rgba(200,169,110,0.25)", color: "var(--gold)", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,169,110,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  Partager
                </button>
              ) : (
                <button onClick={copyLink}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 4, background: copied ? "rgba(200,169,110,0.12)" : "transparent", border: "1px solid rgba(200,169,110,0.25)", color: copied ? "var(--gold2)" : "var(--gold)", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                >
                  {copied ? "✓ Copié !" : "Copier le lien"}
                </button>
              )}
            </div>
          </div>

          <a href="https://www.colisconsult.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.06em", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}
          >
            Découvrir ColisConsult →
          </a>
        </motion.div>

        {/* RIGHT — Calendly CTA (pro only) */}
        {isPro && (
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              flex: "1 1 280px", maxWidth: 360,
              padding: "32px 28px",
              background: "linear-gradient(135deg, rgba(200,169,110,0.08) 0%, rgba(200,169,110,0.04) 100%)",
              border: "1px solid rgba(200,169,110,0.3)",
              borderRadius: 4,
              display: "flex", flexDirection: "column", gap: 20,
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Subtle glow */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
                Pour votre entreprise
              </p>
              <h3 className="serif" style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.3, marginBottom: 12 }}>
                Réduisez vos coûts transport de 3 à 22 %
              </h3>
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.75 }}>
                ColisConsult renégocie vos contrats transporteurs. Paiement <strong style={{ color: "var(--text)" }}>100% au résultat</strong> — vous ne payez que si on vous fait économiser.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--text2)" }}>Audit gratuit et sans engagement</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--text2)" }}>Résultats en 3 à 6 semaines</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--text2)" }}>+200 entreprises accompagnées</span>
              </div>
            </div>

            <a
              href="https://calendly.com/matthieu-erly"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "16px 20px", borderRadius: 4,
                background: "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%)",
                color: "var(--bg)", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "opacity 0.15s, box-shadow 0.15s",
                boxShadow: "0 0 24px rgba(200,169,110,0.25)",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.boxShadow = "0 0 40px rgba(200,169,110,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.boxShadow = "0 0 24px rgba(200,169,110,0.25)"; }}
            >
              📅 Prendre rendez-vous avec Matthieu
            </a>

            <p style={{ fontSize: 11, color: "var(--text3)", textAlign: "center" }}>
              Échange de 30 min · Sans engagement
            </p>
          </motion.div>
        )}
      </div>

      {/* ── POPUP : voter en tant que particulier ── 
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 100 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 101,
                padding: "32px 24px 40px",
                background: "var(--bg2)",
                borderTop: "1px solid rgba(200,169,110,0.25)",
                borderRadius: "16px 16px 0 0",
                maxWidth: 560, margin: "0 auto",
              }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)", margin: "0 auto 24px" }} />

              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10, textAlign: "center" }}>
                Et en tant que particulier ?
              </p>
              <h3 className="serif" style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontWeight: 400, color: "var(--text)", textAlign: "center", marginBottom: 10, lineHeight: 1.3 }}>
                Souhaitez-vous aussi voter<br />en tant qu'expéditeur ?
              </h3>
              <p style={{ fontSize: 13, color: "var(--text2)", textAlign: "center", lineHeight: 1.7, marginBottom: 28 }}>
                Votre expérience personnelle compte aussi. Le vote particulier prend moins d'une minute.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => { setShowPopup(false); onRestartAsClient?.(); }}
                  style={{
                    width: "100%", padding: "16px",
                    background: "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%)",
                    border: "none", borderRadius: 4,
                    color: "var(--bg)", fontSize: 12, fontWeight: 600,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    cursor: "pointer", boxShadow: "0 0 20px rgba(200,169,110,0.2)",
                  }}
                >
                  Oui, voter en tant qu'expéditeur →
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    width: "100%", padding: "14px",
                    background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 4, color: "var(--text3)",
                    fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: "pointer", transition: "border-color 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  Non merci
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    */}
    </div>
  );
}