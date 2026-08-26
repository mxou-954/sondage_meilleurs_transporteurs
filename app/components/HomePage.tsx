"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VOTE_DEADLINE } from "@/app/data/transporteurs";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useCountdown(deadline: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, ready: false });
  useEffect(() => {
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) {
        setT({ d: 0, h: 0, m: 0, s: 0, ready: true });
        return;
      }
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
    fetch("/api/results")
      .then((r) => r.json())
      .then((d) => setCount(d.total))
      .catch(() => {});
  }, []);
  return count;
}

export default function HomePage({ onStart }: { onStart: () => void }) {
  const t = useCountdown(VOTE_DEADLINE);
  const count = useVoterCount();

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      {/**
       * Mon Transporteur Préféré — Élection S1 2026
       *
       * Conçu et développé pour ColisConsult par Maxime Courbeyrette | mcourbeyrette@gmail.com
       * Cabinet expert en appels d'offres transport colis & palettes
       *
       * © 2026 ColisConsult · https://www.colisconsult.com
       * Contact : Matthieu Erly · matthieu@colisconsult.com
       */}
      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(8,8,14,0.8)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 15,
            color: "var(--gold)",
            letterSpacing: "0.12em",
          }}
        >
          Mon transporteur préféré 2026
        </span>
        <a
          href="https://www.colisconsult.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            color: "var(--text3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          By colisconsult.com
        </a>
      </nav>

      {/* ── HERO — exactly 100dvh ── */}
      <section
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(200,169,110,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Top line decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: 1,
            height: 60,
            background: "linear-gradient(to bottom, transparent, var(--gold))",
            marginBottom: 32,
          }}
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 20,
          }}
        >
          1ère Édition · 2026
        </motion.p>

        {/* Trophy */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 16,
            delay: 0.15,
          }}
          style={{
            fontSize: 72,
            lineHeight: 1,
            marginBottom: 28,
            filter: "drop-shadow(0 0 48px rgba(200,169,110,0.55))",
          }}
        >
          🚚🏆
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="serif"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 6rem)",
            lineHeight: 1.0,
            fontWeight: 400,
            marginBottom: 12,
          }}
        >
          <span style={{ color: "var(--text)" }}>Mon transporteur</span>{" "}
          <span className="gold-text" style={{ fontStyle: "italic" }}>
            préféré
          </span>
          <br />
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="divider-gold"
          style={{ width: 80, margin: "20px auto" }}
        />

        {/* Subtitle */}
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{
            maxWidth: 440,
            marginBottom: 36,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "clamp(13px, 2vw, 15px)",
              color: "var(--text2)",
              lineHeight: 1.85,
              textAlign: "center",
            }}
          >
            L&apos;élection du meilleur transporteur par les expéditeurs
            professionnels et par les particuliers e-consommateurs
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 20,
              border: "1px solid rgba(200,169,110,0.2)",
              background: "rgba(200,169,110,0.05)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--text3)",
                letterSpacing: "0.08em",
              }}
            >
              Sondage indépendant par
            </span>
            <a
              href="#colisconsult"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--gold)")
              }
            >
              ColisConsult
            </a>
            <span style={{ fontSize: 10, color: "var(--text3)" }}>↗</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 48px rgba(200,169,110,0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{
            padding: "16px 48px",
            background:
              "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)",
            color: "var(--bg)",
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            marginBottom: 40,
            boxShadow:
              "0 0 32px rgba(200,169,110,0.25), 0 2px 16px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.2s",
          }}
        >
          Participer au vote
        </motion.button>

        {/* ── COUNTDOWN ── */}
        {t.ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            style={{ marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 14,
              }}
            >
              Clôture des votes
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {[
                { v: t.d, l: "JOURS" },
                { v: t.h, l: "HRS" },
                { v: t.m, l: "MIN" },
                { v: t.s, l: "SEC" },
              ].map(({ v, l }, i) => (
                <div
                  key={l}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 14px",
                      background: "rgba(200,169,110,0.08)",
                      border: "1px solid rgba(200,169,110,0.25)",
                      borderRadius: 4,
                      minWidth: 56,
                    }}
                  >
                    <span
                      className="serif"
                      style={{
                        fontSize: 24,
                        fontWeight: 400,
                        lineHeight: 1,
                        color: "var(--gold2)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {pad(v)}
                    </span>
                    <span
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.15em",
                        color: "var(--text3)",
                        marginTop: 4,
                      }}
                    >
                      {l}
                    </span>
                  </div>
                  {i < 3 && (
                    <span
                      style={{
                        color: "var(--gold)",
                        opacity: 0.4,
                        fontSize: 18,
                        fontFamily: "var(--serif)",
                      }}
                    >
                      ·
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── VOTER COUNT ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              animation: "pulse 2s infinite",
              display: "inline-block",
              boxShadow: "0 0 8px #4ade80",
            }}
          />
          <span style={{ fontSize: 13, color: "var(--text2)" }}>
            {count !== null
              ? count === 0
                ? "Soyez le premier à voter"
                : `${count * 2} votant${count > 1 ? "s" : ""}`
              : "Chargement…"}
          </span>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            marginTop: 36,
          }}
        />
      </section>

      {/* ── QUI EST COLISCONSULT ── */}
      <section
        id="colisconsult"
        style={{
          padding: "80px 24px",
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left — texte */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 12,
              }}
            >
              À propos
            </p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Qui est
              <br />
              <em style={{ fontStyle: "italic" }}>ColisConsult ?</em>
            </h2>
            <div
              className="divider-gold"
              style={{ width: 50, marginBottom: 24 }}
            />
            <p
              style={{
                fontSize: 14,
                color: "var(--text2)",
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              ColisConsult est le cabinet de conseil indépendant de référence en
              achat transport colis et palettes en France, fondé en 2005 par
              <a href="https://www.linkedin.com/in/matthieuerly/">
                <strong
                  style={{ color: "var(--text)", textDecoration: "underline" }}
                >
                  {" "}
                  Matthieu Erly
                </strong>
              </a>
              .
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--text2)",
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              Nous accompagnons PME et grands groupes dans la renégociation de
              leurs contrats transport.
            </p>

            <a
              href="https://www.colisconsult.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 10,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 4,
                background: "transparent",
                border: "1px solid rgba(200,169,110,0.25)",
                color: "var(--gold)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.15s",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,169,110,0.06)";
                e.currentTarget.style.borderColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(200,169,110,0.25)";
              }}
            >
              Découvrir ColisConsult →
            </a>
          </motion.div>

          {/* Right — pourquoi ce sondage */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div
              style={{
                padding: "24px",
                background: "var(--bg2)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 10,
                }}
              >
                Pourquoi ce sondage ?
              </p>
              <p
                style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}
              >
                En tant que cabinet indépendant, nous sommes au carrefour des
                transporteurs et de leurs clients. Ce sondage annuel nous permet
                de mesurer la satisfaction réelle du marché — et de partager une
                vision objective avec tous les acteurs du secteur.
              </p>
            </div>

            <div
              style={{
                padding: "24px",
                background: "var(--bg2)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 10,
                }}
              >
                Notre indépendance
              </p>
              <p
                style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}
              >
                Aucun transporteur ne finance ce sondage. Aucun résultat ne peut
                être acheté. Les lauréats sont désignés uniquement par les votes
                des professionnels et expéditeurs.
              </p>
            </div>

            <div
              style={{
                padding: "24px",
                background: "var(--bg2)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 10,
                }}
              >
                Les résultats
              </p>
              <p
                style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}
              >
                Le palmarès est publié{" "}
                <strong style={{ color: "var(--text)" }}>début janvier 2027</strong>{" "}
                et partagé à tous les votants par email. Les résultats détaillés
                sont accessibles gratuitement.
              </p>
            </div>

            <motion.button
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,169,110,0.06)";
                e.currentTarget.style.borderColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(200,169,110,0.25)";
              }}
              rel="noopener noreferrer"
              onClick={onStart}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 4,
                background: "transparent",
                border: "1px solid rgba(200,169,110,0.25)",
                color: "var(--gold)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.15s",
                alignSelf: "flex-start",
              }}
            >
              Participer au vote →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Séparateur */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div className="divider-gold" />
      </div>

      {/* ── PARTENAIRES MÉDIAS ── */}
      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "32px 24px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
        }}
      >
        {/* Partenaires médias */}
        <div>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text3)",
              marginBottom: 16,
            }}
          >
            Partenaires médias
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <a
              href="https://www.strategieslogistique.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.5, transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/strategie_logistique.png"
                alt="Stratégies Logistique"
                style={{ height: 28, width: "auto" }}
              />
            </a>
            {/* Ajoutez d'autres logos ici */}
          </div>
        </div>

        <div
          style={{ width: 40, height: 1, background: "rgba(255,255,255,0.06)" }}
        />

        {/* Branding */}
        <span
          className="serif"
          style={{
            fontSize: 13,
            color: "var(--gold)",
            letterSpacing: "0.12em",
          }}
        >
          COLISCONSULT
        </span>
        <span style={{ fontSize: 11, color: "var(--text3)" }}>
          © 2026 · Tous droits réservés
        </span>

        {/* Liens */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="/mentions-legales"
            style={{ fontSize: 11, color: "var(--text3)" }}
          >
            Mentions légales
          </a>
          <a href="/cgu" style={{ fontSize: 11, color: "var(--text3)" }}>
            CGU
          </a>
          <a
            href="/confidentialite"
            style={{ fontSize: 11, color: "var(--text3)" }}
          >
            Confidentialité
          </a>
          <a
            href="https://fr.linkedin.com/company/colisconsult"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: "var(--text3)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://www.colisconsult.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: "var(--text3)" }}
          >
            colisconsult.com
          </a>
        </div>
      </footer>
    </div>
  );
}
