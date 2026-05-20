"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/app/data/transporteurs";

type Votes = Record<string, string>;

export default function DoneStep({ votes, questions, name }: { votes: Votes; questions: Question[]; name: string }) {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShowShare(true), 800); return () => clearTimeout(t); }, []);

  const firstName = name.split(" ")[0] || "";
  const voted = questions.filter(q => votes[q.id]);
  const voteCount = voted.length;

  const siteUrl = "https://vote.colisconsult.com";
  const shareText = `Je viens de voter pour le Best Carrier Award 2026 🏆\nL'élection du meilleur transporteur de l'année par ColisConsult.\nVotez aussi : ${siteUrl}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Best Carrier Award 2026", text: shareText, url: siteUrl });
      } catch {}
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px 40px", textAlign: "center", background: "var(--bg)" }}>

      {/* Nav top */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderBottom: "1px solid rgba(200,169,110,0.08)", background: "rgba(8,8,14,0.9)", backdropFilter: "blur(16px)" }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--gold)", letterSpacing: "0.12em" }}>COLISCONSULT</span>
      </div>

      <motion.div style={{ width: "100%", maxWidth: 480 }}>

        {/* Trophy */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
          style={{ fontSize: 80, lineHeight: 1, marginBottom: 28, filter: "drop-shadow(0 0 56px rgba(200,169,110,0.6))" }}
        >
          🏆
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
            Vote enregistré
          </p>
          <h2 className="serif gold-text" style={{ fontSize: "clamp(2.2rem, 8vw, 4rem)", fontWeight: 400, marginBottom: 12 }}>
            Merci{firstName ? `, ${firstName}` : ""} !
          </h2>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.75, marginBottom: 8 }}>
            Votre vote a bien été enregistré.
          </p>
          <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 32 }}>
            Les résultats seront annoncés le{" "}
            <span style={{ color: "var(--gold2)" }}>10 juillet 2026</span>.
          </p>
        </motion.div>

        {/* Vote recap */}
        {voteCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ width: "100%", marginBottom: 40, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(200,169,110,0.15)" }}
          >
            {voted.map((q, i) => {
              const t = q.transporteurs.find(tr => tr.id === votes[q.id]);
              return (
                <div key={q.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "13px 18px",
                  background: i % 2 === 0 ? "var(--bg2)" : "rgba(255,255,255,0.015)",
                  borderBottom: i < voted.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <span style={{ fontSize: 12, color: "var(--text3)", letterSpacing: "0.04em" }}>{q.label}</span>
                  <span className="serif" style={{ fontSize: 14, color: "var(--gold2)" }}>{t?.nom}</span>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Share section */}
        {showShare && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%" }}>
            <div className="divider-gold" style={{ marginBottom: 28 }} />
            <p style={{ fontSize: 12, color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              Invitez vos contacts à voter
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* LinkedIn */}
              <a
                href={liUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "14px 24px", borderRadius: 4,
                  background: "#0A66C2", color: "white",
                  fontSize: 13, fontWeight: 500, letterSpacing: "0.04em",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Partager sur LinkedIn
              </a>

              {/* Native share (mobile) or copy */}
              {hasNativeShare ? (
                <button
                  onClick={nativeShare}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "14px 24px", borderRadius: 4,
                    background: "transparent", border: "1px solid rgba(200,169,110,0.25)",
                    color: "var(--gold)", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em",
                    cursor: "pointer", transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--goldfade)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  Partager via…
                </button>
              ) : (
                <button
                  onClick={copyLink}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "14px 24px", borderRadius: 4,
                    background: copied ? "rgba(200,169,110,0.12)" : "transparent",
                    border: "1px solid rgba(200,169,110,0.25)",
                    color: copied ? "var(--gold2)" : "var(--gold)",
                    fontSize: 13, fontWeight: 500, letterSpacing: "0.04em",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 8L6 12L14 4"/>
                      </svg>
                      Lien copié !
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                      Copier le lien
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="divider-gold" style={{ margin: "32px auto" }} />

            <a
              href="https://www.colisconsult.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: "var(--text3)", letterSpacing: "0.08em", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}
            >
              Découvrir ColisConsult — Cabinet expert transport →
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
