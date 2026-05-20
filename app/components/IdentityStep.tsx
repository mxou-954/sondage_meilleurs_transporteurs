"use client";
import { useState } from "react";
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
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [company, setCompany] = useState("");
  const [error,   setError]   = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
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
    { key: "name",    label: "Prénom & Nom",          value: name,    onChange: setName,    placeholder: "Marie Dupont",                   type: "text" },
    { key: "email",   label: isPro ? "Email professionnel" : "Email", value: email, onChange: setEmail, placeholder: isPro ? "marie.dupont@entreprise.com" : "marie@email.com", type: "email" },
    ...(isPro ? [{ key: "company", label: "Entreprise", value: company, onChange: setCompany, placeholder: "Acme SAS, Groupe X…", type: "text" }] : []),
  ];

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar step="2 / 6" onBack={onBack} progress={16} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "88px 20px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 440 }}>

          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", textAlign: "center", marginBottom: 10 }}>
            Étape 2 — {isPro ? "Professionnel" : "Expéditeur"}
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 400, textAlign: "center", color: "var(--text)", marginBottom: 6 }}>
            Qui êtes-vous ?
          </h2>
          <div className="divider-gold" style={{ width: 50, margin: "14px auto 10px" }} />
          <p style={{ fontSize: 13, color: "var(--text2)", textAlign: "center", marginBottom: 36, lineHeight: 1.7 }}>
            {isPro
              ? "Votre email pro garantit l'intégrité du vote — un vote par adresse."
              : "Un vote par adresse email. Vos données ne seront pas revendues."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text2)", marginBottom: 8 }}>
                  {f.label}
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
                    border: `1px solid ${error && !f.value ? "var(--red)" : focused === f.key ? "var(--gold)" : "rgba(255,255,255,0.1)"}`,
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

            <button
              onClick={handleNext}
              style={{
                marginTop: 8, padding: "16px",
                background: "linear-gradient(135deg, var(--gold) 0%, var(--gold2) 60%, var(--gold3) 100%)",
                border: "none", borderRadius: 4, color: "var(--bg)",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                cursor: "pointer", boxShadow: "0 0 24px rgba(200,169,110,0.2)",
                transition: "opacity 0.15s, transform 0.1s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Commencer le vote →
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
