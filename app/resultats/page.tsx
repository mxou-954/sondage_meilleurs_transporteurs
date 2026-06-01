"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  QUESTIONS_PRO, QUESTIONS_CLIENT,
  POINTS_NEGATIFS_PRO, POINTS_NEGATIFS_CLIENT,
} from "@/app/data/transporteurs";

type RawResults = Record<string, Record<string, number>>;

type VoteEntry = {
  email: string;
  name?: string;
  company?: string;
  profile?: string;
  votes: Record<string, string>;
  avis?: Record<string, string>;
  pointsNegatifs?: string[];
  timestamp: number;
};

const GOLD   = "#C8A96E";
const GOLD2  = "#E2C98A";
const COLORS = ["#C8A96E","#E2C98A","#F0DFB0","#A07840","#8A6030","#6A4820","#D4B07A","#B89050","#9A7040","#7A5030","#5A3820","#C0A060"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#141420", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 4, padding: "10px 14px" }}>
      <p style={{ fontSize: 12, color: GOLD, marginBottom: 4, fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: 14, color: "#F0EDE8" }}>{payload[0].value} vote{payload[0].value > 1 ? "s" : ""}</p>
      {payload[0].payload.pct !== undefined && (
        <p style={{ fontSize: 11, color: "#A8A4B8" }}>{payload[0].payload.pct}%</p>
      )}
    </div>
  );
};

const CustomPieLabel = ({ cx, cy, midAngle, outerRadius, name, pct }: any) => {
  if (pct < 5) return null;
  const RAD = Math.PI / 180;
  const r = outerRadius + 20;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text x={x} y={y} fill="#A8A4B8" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11}>
      {name} {pct}%
    </text>
  );
};

export default function ResultatsPage() {
  const [data, setData]     = useState<{ results: RawResults; total: number } | null>(null);
  const [voters, setVoters] = useState<VoteEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]       = useState<"pro" | "client" | "negatifs" | "avis">("pro");
  const [pwd, setPwd]       = useState("");
  const [authed, setAuthed] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const fetchData = async (password: string) => {
    try {
      const [resResults, resExport] = await Promise.all([
        fetch("/api/results"),
        fetch(`/api/export?pwd=${password}`),
      ]);
      if (resExport.status === 401) { setPwdError(true); return; }
      const results = await resResults.json();
      const exp     = await resExport.json();
      setData(results);
      setVoters(exp.voters ?? []);
      setAuthed(true);
    } catch {}
    setLoading(false);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPwdError(false);
    fetchData(pwd);
  };

  // ── Compute stats ──────────────────────────────────────────────────────────

  const proVoters    = voters.filter(v => v.profile === "pro");
  const clientVoters = voters.filter(v => v.profile === "client");

  const getVoteData = (questionId: string, questions: typeof QUESTIONS_PRO) => {
    const q = questions.find(q => q.id === questionId);
    if (!q) return [];
    const raw = data?.results[questionId] ?? {};
    const total = Object.values(raw).reduce((a, b) => a + b, 0);
    return q.transporteurs
      .map(t => ({ name: t.nom, value: raw[t.id] ?? 0, pct: total > 0 ? Math.round((raw[t.id] ?? 0) / total * 100) : 0 }))
      .filter(d => d.value > 0)
      .sort((a, b) => b.value - a.value);
  };

  const getPointsData = (profile: "pro" | "client") => {
    const list = profile === "pro" ? POINTS_NEGATIFS_PRO : POINTS_NEGATIFS_CLIENT;
    const counts: Record<string, number> = {};
    voters.filter(v => v.profile === profile).forEach(v => {
      (v.pointsNegatifs ?? []).forEach(p => { counts[p] = (counts[p] ?? 0) + 1; });
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return list
      .map(p => ({ name: p.label, value: counts[p.id] ?? 0, pct: total > 0 ? Math.round((counts[p.id] ?? 0) / total * 100) : 0 }))
      .filter(d => d.value > 0)
      .sort((a, b) => b.value - a.value);
  };

  const getAvisData = () => {
    const counts: Record<string, { good: number; neutral: number; bad: number }> = {};
    voters.forEach(v => {
      Object.entries(v.avis ?? {}).forEach(([tId, sentiment]) => {
        if (!counts[tId]) counts[tId] = { good: 0, neutral: 0, bad: 0 };
        counts[tId][sentiment as "good" | "neutral" | "bad"]++;
      });
    });
    return Object.entries(counts)
      .map(([tId, c]) => {
        const t = [...QUESTIONS_PRO, ...QUESTIONS_CLIENT]
          .flatMap(q => q.transporteurs).find(t => t.id === tId);
        return { name: t?.nom ?? tId, ...c, total: c.good + c.neutral + c.bad };
      })
      .filter(d => d.total > 0)
      .sort((a, b) => b.good - a.good);
  };

  const proData    = getVoteData(QUESTIONS_PRO[0]?.id,    QUESTIONS_PRO);
  const clientData = getVoteData(QUESTIONS_CLIENT[0]?.id, QUESTIONS_CLIENT);
  const negPro     = getPointsData("pro");
  const negClient  = getPointsData("client");
  const avisData   = getAvisData();

  const profilePie = [
    { name: "Professionnels", value: proVoters.length },
    { name: "Particuliers",   value: clientVoters.length },
  ].filter(d => d.value > 0);

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 380 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", textAlign: "center", marginBottom: 10 }}>
            Accès restreint
          </p>
          <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 400, color: "var(--text)", textAlign: "center", marginBottom: 6 }}>
            Résultats
          </h1>
          <div className="divider-gold" style={{ width: 50, margin: "14px auto 32px" }} />

          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="password"
              value={pwd}
              onChange={e => { setPwd(e.target.value); setPwdError(false); }}
              placeholder="Mot de passe"
              autoFocus
              style={{
                padding: "14px 16px", borderRadius: 4, fontSize: 15,
                background: "rgba(255,255,255,0.04)", color: "var(--text)",
                border: `1px solid ${pwdError ? "var(--red)" : "rgba(255,255,255,0.1)"}`,
              }}
            />
            {pwdError && <p style={{ fontSize: 12, color: "var(--red)" }}>⚠ Mot de passe incorrect</p>}
            <button type="submit" style={{
              padding: "14px",
              background: "linear-gradient(135deg, var(--gold), var(--gold2))",
              border: "none", borderRadius: 4, color: "var(--bg)",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer",
            }}>
              Accéder aux résultats
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "var(--sans)" }}>

      {/* Nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: "rgba(8,8,14,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,169,110,0.1)" }}>
        <span className="serif" style={{ fontSize: 15, color: "var(--gold)", letterSpacing: "0.12em" }}>RÉSULTATS — S1 2026</span>
        <Link href="/" style={{ fontSize: 12, color: "var(--text3)", letterSpacing: "0.08em" }}>← Retour au vote</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 40 }}>
          {[
            { label: "Total votants", value: data?.total ?? 0 },
            { label: "Professionnels", value: proVoters.length },
            { label: "Particuliers", value: clientVoters.length },
            { label: "Avec avis", value: voters.filter(v => v.avis && Object.keys(v.avis).length > 0).length },
            { label: "Avec préoccupations", value: voters.filter(v => v.pointsNegatifs && v.pointsNegatifs.length > 0).length },
          ].map(kpi => (
            <div key={kpi.label} style={{ padding: "20px 20px", background: "var(--bg2)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 4, textAlign: "center" }}>
              <div className="serif" style={{ fontSize: 36, color: "var(--gold2)", fontWeight: 400, lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Répartition profils */}
        {profilePie.length > 0 && (
          <Section title="Répartition des profils">
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={profilePie} cx="50%" cy="50%" outerRadius={100}
                    dataKey="value" labelLine={false} label={CustomPieLabel}>
                    {profilePie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "var(--text2)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Section>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {([
            { id: "pro",      label: "Votes Professionnels" },
            { id: "client",   label: "Votes Particuliers" },
            { id: "negatifs", label: "Points négatifs" },
            { id: "avis",     label: "Avis transporteurs" },
          ] as const).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: "8px 18px", borderRadius: 4, fontSize: 12, fontWeight: 500,
                letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s",
                background: tab === t.id ? "linear-gradient(135deg, var(--gold), var(--gold2))" : "rgba(255,255,255,0.04)",
                color: tab === t.id ? "var(--bg)" : "var(--text3)",
                border: `1px solid ${tab === t.id ? "transparent" : "rgba(255,255,255,0.08)"}`,
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Pro votes */}
        {tab === "pro" && (
          <Section title={`Transporteur préféré — Professionnels (${proVoters.length} votes)`}>
            {proData.length === 0 ? <Empty /> : (
              <div style={{ height: Math.max(300, proData.length * 52) }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={proData} layout="vertical" margin={{ left: 120, right: 60 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#A8A4B8", fontSize: 13 }} width={110} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(200,169,110,0.05)" }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {proData.map((_, i) => <Cell key={i} fill={i === 0 ? GOLD : i === 1 ? GOLD2 : "rgba(200,169,110,0.35)"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Section>
        )}

        {/* Client votes */}
        {tab === "client" && (
          <Section title={`Transporteur préféré — Particuliers (${clientVoters.length} votes)`}>
            {clientData.length === 0 ? <Empty /> : (
              <div style={{ height: Math.max(300, clientData.length * 52) }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clientData} layout="vertical" margin={{ left: 120, right: 60 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#A8A4B8", fontSize: 13 }} width={110} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(200,169,110,0.05)" }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {clientData.map((_, i) => <Cell key={i} fill={i === 0 ? GOLD : i === 1 ? GOLD2 : "rgba(200,169,110,0.35)"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Section>
        )}

        {/* Points négatifs */}
        {tab === "negatifs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Section title={`Préoccupations — Professionnels (${negPro.reduce((a, b) => a + b.value, 0)} réponses)`}>
              {negPro.length === 0 ? <Empty /> : (
                <div style={{ height: Math.max(300, negPro.length * 48) }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={negPro} layout="vertical" margin={{ left: 260, right: 60 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" tick={{ fill: "#A8A4B8", fontSize: 12 }} width={250} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(200,169,110,0.05)" }} />
                      <Bar dataKey="value" fill={GOLD} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Section>

            <Section title={`Préoccupations — Particuliers (${negClient.reduce((a, b) => a + b.value, 0)} réponses)`}>
              {negClient.length === 0 ? <Empty /> : (
                <div style={{ height: Math.max(300, negClient.length * 48) }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={negClient} layout="vertical" margin={{ left: 260, right: 60 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" tick={{ fill: "#A8A4B8", fontSize: 12 }} width={250} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(200,169,110,0.05)" }} />
                      <Bar dataKey="value" fill={GOLD2} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Section>
          </div>
        )}

        {/* Avis */}
        {tab === "avis" && (
          <Section title={`Avis sur les transporteurs (${avisData.length} transporteurs notés)`}>
            {avisData.length === 0 ? <Empty /> : (
              <div style={{ height: Math.max(300, avisData.length * 52) }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={avisData} layout="vertical" margin={{ left: 120, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#A8A4B8", fontSize: 13 }} width={110} />
                    <Tooltip cursor={{ fill: "rgba(200,169,110,0.05)" }} contentStyle={{ background: "#141420", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 4 }} labelStyle={{ color: GOLD }} />
                    <Bar dataKey="good"    name="😊 Positif" stackId="a" fill="#4ade80" />
                    <Bar dataKey="neutral" name="😐 Neutre"  stackId="a" fill="#A8A4B8" />
                    <Bar dataKey="bad"     name="😞 Négatif" stackId="a" fill="#f87171" radius={[0, 4, 4, 0]} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "var(--text2)" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: "var(--bg2)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 4, padding: "24px", marginBottom: 16 }}
    >
      <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
        {title}
      </p>
      {children}
    </motion.div>
  );
}

function Empty() {
  return <p style={{ fontSize: 13, color: "var(--text3)", textAlign: "center", padding: "40px 0" }}>Aucune donnée pour le moment</p>;
}