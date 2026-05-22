"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Profile } from "./App";
import TopBar from "./TopBar";

const FREE = ["gmail","yahoo","hotmail","outlook","live","orange","wanadoo","free","sfr","laposte","icloud","protonmail","tutanota","yopmail","msn","aol","gmx","bbox","numericable","bouygues"];

type Props = {
  profile: Profile;
  onNext: (name: string, email: string, company: string) => void;
  onBack: () => void;
};

export default function IdentityStep({ profile, onNext, onBack }: Props) {
  const isPro = profile === "pro";
  const [name,       setName]    = useState("");
  const [email,      setEmail]   = useState("");
  const [company,    setCompany] = useState("");
  const [error,      setError]   = useState("");
  const [focused,    setFocused] = useState<string | null>(null);
  const [cgu,        setCgu]     = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

  // Load Google script then init button
  useEffect(() => {
    const initGoogle = () => {
      const g = (window as any).google;
      if (!g) return;

      g.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          try {
            const payload = JSON.parse(atob(response.credential.split(".")[1]));
            const n = payload.name ?? "";
            const em = payload.email ?? "";
            setName(n);
            setEmail(em);
            setGoogleReady(true);
            setCgu(true); // ← accepte auto les CGU
          
            // Pour les clients : valide directement
            if (!isPro && n && em) {
              onNext(n, em, "");
            }
          
            // Pour les pros : focus sur entreprise
            if (isPro) {
              setTimeout(() => {
                const input = document.querySelector<HTMLInputElement>('input[autocomplete="organization"]');
                input?.focus();
              }, 150);
            }
          } catch (e) {
            console.error("Google JWT decode error", e);
          }
        },
      });

      const btn = document.getElementById("google-signin-btn");
      if (btn) {
        g.accounts.id.renderButton(btn, {
          theme: "filled_black",
          size: "large",
          width: btn.offsetWidth || 400,
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "center",
        });
      }
    };

    // If script already loaded
    if ((window as any).google?.accounts) {
      initGoogle();
      return;
    }

    // Otherwise inject script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.head.appendChild(script);

    return () => {
      // cleanup
    };
  }, [isPro]);

  const validate = () => {
    if (!cgu)                  { setError("Veuillez accepter les conditions d'utilisation."); return false; }
    if (!name.trim())          { setError("Votre nom est requis."); return false; }
    if (!email.includes("@"))  { setError("Adresse email invalide."); return false; }
    if (isPro) {
      const domain = email.split("@")[1]?.split(".")[0]?.toLowerCase() ?? "";
      if (FREE.includes(domain)) { setError("Utilisez votre email professionnel (pas Gmail, Outlook…)"); return false; }
      if (!company.trim())       { setError("Le nom de votre entreprise est requis."); return false; }
    }
    return true;
  };

  const handleNext = () => { if (validate()) onNext(name.trim(), email.trim(), company.trim()); };

  const fields = [
    { key: "name",  label: "Prénom & Nom", value: name,  onChange: setName,    placeholder: "Marie Dupont",  type: "text" },
    { key: "email", label: isPro ? "Email professionnel" : "Email", value: email, onChange: setEmail, placeholder: isPro ? "marie.dupont@entreprise.com" : "marie@email.com", type: "email" },
    ...(isPro ? [{ key: "company", label: "Entreprise", value: company, onChange: setCompany, placeholder: "Acme SAS, Groupe X…", type: "text" }] : []),
  ];

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar step="3 / 3" onBack={onBack} progress={66} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "88px 20px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 440 }}>

          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", textAlign: "center", marginBottom: 10 }}>
            Étape 3 — {isPro ? "Professionnel" : "Expéditeur"}
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 400, textAlign: "center", color: "var(--text)", marginBottom: 6 }}>
            Qui êtes-vous ?
          </h2>
          <div className="divider-gold" style={{ width: 50, margin: "14px auto 10px" }} />
          <p style={{ fontSize: 13, color: "var(--text2)", textAlign: "center", marginBottom: 24, lineHeight: 1.7 }}>
            {isPro
              ? "Votre email pro garantit l'intégrité du vote — un vote par adresse."
              : "Un vote par adresse email. Vos données ne seront pas revendues."}
          </p>

          {/* ── Google Sign-In button ── */}
          <div style={{ marginBottom: 20 }}>
            {/* Bouton Google rendu par le SDK */}
            <div id="google-signin-btn" style={{ width: "100%", minHeight: 44 }} />

            {/* Séparateur */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em" }}>OU</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            </div>
          </div>

          {/* ── Champs manuels ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Indicateur si Google connecté */}
            {googleReady && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: "10px 14px", borderRadius: 4, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", fontSize: 12, color: "#4ade80", display: "flex", alignItems: "center", gap: 8 }}
              >
                <span>✓</span> Connecté avec Google — vérifiez vos informations ci-dessous
              </motion.div>
            )}

            {fields.map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text2)", marginBottom: 8 }}>
                  {f.label}
                  {f.key === "company" && googleReady && (
                    <span style={{ color: "var(--gold)", marginLeft: 6, fontSize: 10 }}>← à compléter</span>
                  )}
                </label>
                <input
                  type={f.type}
                  value={f.value}
                  onFocus={() => { setFocused(f.key); setError(""); }}
                  onBlur={() => setFocused(null)}
                  onChange={e => { f.onChange(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleNext()}
                  placeholder={f.placeholder}
                  autoComplete={f.key === "email" ? "email" : f.key === "name" ? "name" : "organization"}
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      error && !f.value ? "var(--red)" :
                      f.key === "company" && googleReady && !company ? "var(--gold)" :
                      focused === f.key ? "var(--gold)" :
                      "rgba(255,255,255,0.1)"
                    }`,
                    borderRadius: 4, color: "var(--text)", fontSize: 15,
                    transition: "border-color 0.15s, box-shadow 0.15s",
                    boxShadow: focused === f.key ? "0 0 0 3px rgba(200,169,110,0.1)" : "none",
                  }}
                />
              </div>
            ))}

            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 12, color: "var(--red)", display: "flex", alignItems: "center", gap: 6 }}>
                <span>⚠</span> {error}
              </motion.p>
            )}

            {/* CGU */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                onClick={() => setCgu(!cgu)}
                style={{
                  flexShrink: 0, width: 18, height: 18, borderRadius: 2, marginTop: 1,
                  border: `1.5px solid ${cgu ? "var(--gold)" : "rgba(255,255,255,0.2)"}`,
                  background: cgu ? "var(--gold)" : "transparent",
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {cgu && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#08080E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6, cursor: "pointer" }} onClick={() => setCgu(!cgu)}>
                J'accepte les{" "}
                <a href="/cgu" target="_blank" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="/confidentialite" target="_blank" style={{ color: "var(--gold)", textDecoration: "underline" }}>
                  politique de confidentialité
                </a>.
              </p>
            </div>

            <button
              onClick={handleNext}
              style={{
                marginTop: 8, padding: "16px",
                background: "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)",
                border: "none", borderRadius: 4, color: "var(--bg)",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                cursor: "pointer", boxShadow: "0 0 24px rgba(200,169,110,0.2)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Valider mon vote →
            </button>

            <p style={{ fontSize: 11, textAlign: "center", color: "var(--text3)" }}>
              🔒 Données protégées · Un seul vote par email
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}