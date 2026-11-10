"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  QUESTIONS_PRO,
  QUESTIONS_CLIENT,
  POINTS_NEGATIFS_PRO,
  POINTS_NEGATIFS_CLIENT,
} from "@/app/data/transporteurs";

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

const GOLD = "#C8A96E";
const GOLD2 = "#E2C98A";
const COLORS = [
  "#C8A96E",
  "#E2C98A",
  "#F0DFB0",
  "#A07840",
  "#8A6030",
  "#6A4820",
  "#D4B07A",
  "#B89050",
  "#9A7040",
  "#7A5030",
  "#5A3820",
  "#C0A060",
];

const CardSection = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      background: "var(--bg2)",
      border: "1px solid rgba(200,169,110,0.15)",
      borderRadius: 4,
      padding: "24px",
      marginBottom: 16,
    }}
  >
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: 4,
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p style={{ fontSize: 12, color: "var(--text3)" }}>{subtitle}</p>
      )}
    </div>
    {children}
  </motion.div>
);

const Empty = () => (
  <p
    style={{
      fontSize: 13,
      color: "var(--text3)",
      textAlign: "center",
      padding: "40px 0",
    }}
  >
    Aucune donnée pour le moment
  </p>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#141420",
        border: "1px solid rgba(200,169,110,0.3)",
        borderRadius: 4,
        padding: "10px 14px",
        maxWidth: 280,
      }}
    >
      <p
        style={{ fontSize: 12, color: GOLD, marginBottom: 6, fontWeight: 500 }}
      >
        {label}
      </p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 13, color: "#F0EDE8", marginBottom: 2 }}>
          <span style={{ color: p.color }}>{p.name}</span> : {p.value}
          {p.payload?.pct !== undefined && ` (${p.payload.pct}%)`}
        </p>
      ))}
    </div>
  );
};

const Medal = ({ rank }: { rank: number }) =>
  rank === 0 ? (
    <span style={{ fontSize: 18 }}>🥇</span>
  ) : rank === 1 ? (
    <span style={{ fontSize: 18 }}>🥈</span>
  ) : rank === 2 ? (
    <span style={{ fontSize: 18 }}>🥉</span>
  ) : (
    <span
      style={{
        fontSize: 12,
        color: "var(--text3)",
        width: 22,
        display: "inline-block",
        textAlign: "center",
      }}
    >
      #{rank + 1}
    </span>
  );

export default function ResultatsPage() {
  const [voters, setVoters] = useState<VoteEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [tab, setTab] = useState<
    "overview" | "pro" | "client" | "negatifs" | "avis" | "timeline"
  >("overview");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPwdError(false);
    try {
      const res = await fetch(`/api/export?pwd=${pwd}`);
      if (res.status === 401) {
        setPwdError(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setVoters(data.voters ?? []);
      setAuthed(true);
    } catch {
      setPwdError(true);
    }
    setLoading(false);
  };

  // ── Computed stats ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    if (!voters.length) return null;

    const pros = voters.filter((v) => v.profile === "pro");
    const clients = voters.filter((v) => v.profile === "client");
    const allTransporteurs = [...QUESTIONS_PRO, ...QUESTIONS_CLIENT].flatMap(
      (q) => q.transporteurs,
    );
    const uniqueT = Array.from(
      new Map(allTransporteurs.map((t) => [t.id, t])).values(),
    );

    // Vote counts par question
    const getVoteCounts = (list: VoteEntry[], questionId: string) => {
      const counts: Record<string, number> = {};
      list.forEach((v) => {
        const vote = v.votes[questionId];
        if (vote) counts[vote] = (counts[vote] ?? 0) + 1;
      });
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      return {
        counts,
        total,
        participation:
          list.length > 0 ? Math.round((total / list.length) * 100) : 0,
      };
    };

    const proVotes = getVoteCounts(pros, QUESTIONS_PRO[0]?.id);
    const clientVotes = getVoteCounts(clients, QUESTIONS_CLIENT[0]?.id);

    // Classement global (fusion pro + client)
    const globalCounts: Record<string, number> = {};
    voters.forEach((v) => {
      Object.values(v.votes).forEach((tId) => {
        globalCounts[tId] = (globalCounts[tId] ?? 0) + 1;
      });
    });
    const globalRanking = uniqueT
      .map((t) => ({
        ...t,
        votes: globalCounts[t.id] ?? 0,
        pct:
          voters.length > 0
            ? Math.round(((globalCounts[t.id] ?? 0) / voters.length) * 100)
            : 0,
      }))
      .filter((t) => t.votes > 0)
      .sort((a, b) => b.votes - a.votes);

    // Avis
    const avisCounts: Record<
      string,
      { good: number; neutral: number; bad: number; total: number }
    > = {};
    voters.forEach((v) => {
      Object.entries(v.avis ?? {}).forEach(([tId, s]) => {
        if (!avisCounts[tId])
          avisCounts[tId] = { good: 0, neutral: 0, bad: 0, total: 0 };
        avisCounts[tId][s as "good" | "neutral" | "bad"]++;
        avisCounts[tId].total++;
      });
    });
    const avisWithRatio = uniqueT
      .filter((t) => avisCounts[t.id]?.total > 0)
      .map((t) => {
        const a = avisCounts[t.id];
        const score =
          a.total > 0 ? Math.round(((a.good - a.bad) / a.total) * 100) : 0;
        return {
          ...t,
          ...a,
          score,
          positivePct: Math.round((a.good / a.total) * 100),
          negativePct: Math.round((a.bad / a.total) * 100),
        };
      })
      .sort((a, b) => b.score - a.score);

    const votantsAvecAvis = voters.filter(
      (v) => v.avis && Object.keys(v.avis).length > 0,
    ).length;
    const avisParticipation =
      voters.length > 0
        ? Math.round((votantsAvecAvis / voters.length) * 100)
        : 0;

    // Points négatifs
    const negCounts = {
      pro: {} as Record<string, number>,
      client: {} as Record<string, number>,
    };
    pros.forEach((v) => {
      (v.pointsNegatifs ?? []).forEach((p) => {
        negCounts.pro[p] = (negCounts.pro[p] ?? 0) + 1;
      });
    });
    clients.forEach((v) => {
      (v.pointsNegatifs ?? []).forEach((p) => {
        negCounts.client[p] = (negCounts.client[p] ?? 0) + 1;
      });
    });

    const negProTotal = Object.values(negCounts.pro).reduce((a, b) => a + b, 0);
    const negClientTotal = Object.values(negCounts.client).reduce(
      (a, b) => a + b,
      0,
    );
    const proAvecNegatifs = pros.filter((v) => v.pointsNegatifs?.length).length;
    const clientAvecNegatifs = clients.filter(
      (v) => v.pointsNegatifs?.length,
    ).length;

    const negProData = POINTS_NEGATIFS_PRO.map((p) => ({
      name: p.label,
      value: negCounts.pro[p.id] ?? 0,
      pct:
        negProTotal > 0
          ? Math.round(((negCounts.pro[p.id] ?? 0) / proAvecNegatifs) * 100)
          : 0,
    }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

    const negClientData = POINTS_NEGATIFS_CLIENT.map((p) => ({
      name: p.label,
      value: negCounts.client[p.id] ?? 0,
      pct:
        negClientTotal > 0
          ? Math.round(
              ((negCounts.client[p.id] ?? 0) / clientAvecNegatifs) * 100,
            )
          : 0,
    }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

    // Timeline (votes par jour)
    const byDay: Record<string, number> = {};
    voters.forEach((v) => {
      const day = new Date(v.timestamp).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      });
      byDay[day] = (byDay[day] ?? 0) + 1;
    });
    const timeline = Object.entries(byDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Profils pie
    const profilePie = [
      { name: "Professionnels", value: pros.length },
      { name: "Particuliers", value: clients.length },
    ].filter((d) => d.value > 0);

    // Score avis pour radar (top 6 transporteurs)
    const radarData = avisWithRatio.slice(0, 6).map((t) => ({
      subject: t.nom,
      score: Math.max(0, t.score + 100) / 2,
    }));

    return {
      total: voters.length,
      pros,
      clients,
      proVotes,
      clientVotes,
      globalRanking,
      avisWithRatio,
      votantsAvecAvis,
      avisParticipation,
      negProData,
      negClientData,
      proAvecNegatifs,
      clientAvecNegatifs,
      profilePie,
      timeline,
      radarData,
      proAvecNegatifsPct:
        pros.length > 0 ? Math.round((proAvecNegatifs / pros.length) * 100) : 0,
      clientAvecNegatifsPct:
        clients.length > 0
          ? Math.round((clientAvecNegatifs / clients.length) * 100)
          : 0,
    };
  }, [voters]);

  // ── Detailed vote data ──────────────────────────────────────────────────────
  const getDetailedVoteData = (list: VoteEntry[], questionId: string) => {
    const allT = [...QUESTIONS_PRO, ...QUESTIONS_CLIENT].flatMap(
      (q) => q.transporteurs,
    );
    const counts: Record<string, number> = {};
    list.forEach((v) => {
      const vote = v.votes[questionId];
      if (vote) counts[vote] = (counts[vote] ?? 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts)
      .map(([tId, value]) => {
        const t = allT.find((t) => t.id === tId);
        return {
          name: t?.nom ?? tId,
          value,
          pct: total > 0 ? Math.round((value / total) * 100) : 0,
        };
      })
      .sort((a, b) => b.value - a.value);
  };

  // ── Auth gate ───────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 380 }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Accès restreint
          </p>
          <h1
            className="serif"
            style={{
              fontSize: "2rem",
              fontWeight: 400,
              color: "var(--text)",
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            Tableau de bord
          </h1>
          <div
            className="divider-gold"
            style={{ width: 50, margin: "14px auto 32px" }}
          />
          <form
            onSubmit={handleAuth}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <input
              type="password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setPwdError(false);
              }}
              placeholder="Mot de passe"
              autoFocus
              style={{
                padding: "14px 16px",
                borderRadius: 4,
                fontSize: 15,
                background: "rgba(255,255,255,0.04)",
                color: "var(--text)",
                border: `1px solid ${pwdError ? "var(--red)" : "rgba(255,255,255,0.1)"}`,
              }}
            />
            {pwdError && (
              <p style={{ fontSize: 12, color: "var(--red)" }}>
                ⚠ Mot de passe incorrect
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                background:
                  "linear-gradient(135deg, var(--gold), var(--gold2))",
                border: "none",
                borderRadius: 4,
                color: "var(--bg)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Chargement…" : "Accéder aux résultats"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!stats)
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--text3)" }}>Aucun vote enregistré</p>
      </div>
    );

  const TABS = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "pro", label: `Professionnels (${stats.pros.length})` },
    { id: "client", label: `Particuliers (${stats.clients.length})` },
    { id: "negatifs", label: "Points négatifs" },
    { id: "avis", label: "Avis" },
    { id: "timeline", label: "Timeline" },
  ] as const;

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
      {/* Nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          background: "rgba(8,8,14,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
        }}
      >
        <span
          className="serif"
          style={{
            fontSize: 15,
            color: "var(--gold)",
            letterSpacing: "0.12em",
          }}
        >
          RÉSULTATS — 2026
        </span>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a
            href={`/api/export?pwd=${pwd}&format=csv`}
            style={{
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.08em",
              textDecoration: "none",
            }}
          >
            ↓ Export JSON
          </a>
          <Link
            href="/"
            style={{
              fontSize: 12,
              color: "var(--text3)",
              letterSpacing: "0.08em",
            }}
          >
            ← Vote
          </Link>
        </div>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}
      >
        {/* ── KPIs ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 10,
            marginBottom: 32,
          }}
        >
          {[
            { label: "Total votants", value: stats.total, sub: "100%" },
            {
              label: "Professionnels",
              value: stats.pros.length,
              sub: `${Math.round((stats.pros.length / stats.total) * 100)}% des votes`,
            },
            {
              label: "Particuliers",
              value: stats.clients.length,
              sub: `${Math.round((stats.clients.length / stats.total) * 100)}% des votes`,
            },
            {
              label: "Ont laissé un avis",
              value: stats.votantsAvecAvis,
              sub: `${stats.avisParticipation}% de participation`,
            },
            {
              label: "Ont répondu aux préoccupations (pro)",
              value: stats.proAvecNegatifs,
              sub: `${stats.proAvecNegatifsPct}% des pros`,
            },
            {
              label: "Ont répondu aux préoccupations (part.)",
              value: stats.clientAvecNegatifs,
              sub: `${stats.clientAvecNegatifsPct}% des particuliers`,
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              style={{
                padding: "18px 16px",
                background: "var(--bg2)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              <div
                className="serif"
                style={{
                  fontSize: 34,
                  color: "var(--gold2)",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "6px 0 4px",
                }}
              >
                {kpi.label}
              </div>
              <div style={{ fontSize: 11, color: "var(--gold)", opacity: 0.7 }}>
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.15s",
                background:
                  tab === t.id
                    ? "linear-gradient(135deg, var(--gold), var(--gold2))"
                    : "rgba(255,255,255,0.04)",
                color: tab === t.id ? "var(--bg)" : "var(--text3)",
                border: `1px solid ${tab === t.id ? "transparent" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Répartition profils */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <CardSection
                title="Répartition profils"
                subtitle={`${stats.total} votants au total`}
              >
                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.profilePie}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${Math.round((percent ?? 0) * 100)}%`
                        }
                        labelLine={false}
                      >
                        {stats.profilePie.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardSection>

              {/* Taux de participation aux sections optionnelles */}
              <CardSection title="Participation aux sections optionnelles">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    paddingTop: 8,
                  }}
                >
                  {[
                    {
                      label: "Avis sur les transporteurs",
                      pct: stats.avisParticipation,
                      n: stats.votantsAvecAvis,
                    },
                    {
                      label: "Préoccupations — Pros",
                      pct: stats.proAvecNegatifsPct,
                      n: stats.proAvecNegatifs,
                    },
                    {
                      label: "Préoccupations — Particuliers",
                      pct: stats.clientAvecNegatifsPct,
                      n: stats.clientAvecNegatifs,
                    },
                  ].map((row) => (
                    <div key={row.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 6,
                        }}
                      >
                        <span style={{ fontSize: 12, color: "var(--text2)" }}>
                          {row.label}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "var(--gold)",
                            fontWeight: 500,
                          }}
                        >
                          {row.pct}%{" "}
                          <span
                            style={{ color: "var(--text3)", fontWeight: 400 }}
                          >
                            ({row.n})
                          </span>
                        </span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 3,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${row.pct}%`,
                            background:
                              "linear-gradient(90deg, var(--gold), var(--gold2))",
                            borderRadius: 3,
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardSection>
            </div>

            {/* Classement global */}
            <CardSection
              title="Classement global"
              subtitle="Votes pros + particuliers confondus — ratio sur total votants"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stats.globalRanking.map((t, i) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      background:
                        i < 3
                          ? "rgba(200,169,110,0.06)"
                          : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i < 3 ? "rgba(200,169,110,0.2)" : "rgba(255,255,255,0.04)"}`,
                      borderRadius: 4,
                    }}
                  >
                    <Medal rank={i} />
                    <span
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: i < 3 ? "var(--gold2)" : "var(--text2)",
                        fontWeight: i < 3 ? 500 : 400,
                      }}
                    >
                      {t.nom}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--text3)",
                        minWidth: 60,
                        textAlign: "right",
                      }}
                    >
                      {t.votes} vote{t.votes > 1 ? "s" : ""}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--gold)",
                        minWidth: 45,
                        textAlign: "right",
                      }}
                    >
                      {t.pct}%
                    </span>
                    <div
                      style={{
                        width: 100,
                        height: 6,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 3,
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${t.pct}%`,
                          background:
                            i === 0
                              ? "linear-gradient(90deg, var(--gold), var(--gold2))"
                              : "rgba(200,169,110,0.4)",
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardSection>

            {/* Radar avis */}
            {stats.radarData.length > 2 && (
              <CardSection
                title="Score net avis — Top transporteurs"
                subtitle="(positifs − négatifs) / total avis · 0 = neutre, 100 = 100% positif"
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={stats.radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#A8A4B8", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        domain={[0, 100]}
                        tick={{ fill: "#6A677A", fontSize: 10 }}
                      />
                      <Radar
                        name="Score net"
                        dataKey="score"
                        stroke={GOLD}
                        fill={GOLD}
                        fillOpacity={0.15}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardSection>
            )}
          </div>
        )}

        {/* ── PRO ── */}
        {tab === "pro" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CardSection
              title={`Transporteur préféré — Professionnels`}
              subtitle={`${stats.proVotes.total} votes / ${stats.pros.length} professionnels · ${stats.proVotes.participation}% de participation`}
            >
              {getDetailedVoteData(stats.pros, QUESTIONS_PRO[0]?.id).length ===
              0 ? (
                <Empty />
              ) : (
                <div
                  style={{
                    height: Math.max(
                      300,
                      getDetailedVoteData(stats.pros, QUESTIONS_PRO[0]?.id)
                        .length * 52,
                    ),
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getDetailedVoteData(
                        stats.pros,
                        QUESTIONS_PRO[0]?.id,
                      )}
                      layout="vertical"
                      margin={{ left: 130, right: 80 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "#A8A4B8", fontSize: 13 }}
                        width={120}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(200,169,110,0.05)" }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {getDetailedVoteData(
                          stats.pros,
                          QUESTIONS_PRO[0]?.id,
                        ).map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              i === 0
                                ? GOLD
                                : i === 1
                                  ? GOLD2
                                  : "rgba(200,169,110,0.3)"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardSection>

            {/* Profil des pros */}
            <CardSection title="Profil des votants professionnels">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12,
                }}
              >
                {[
                  {
                    label: "Ont voté",
                    value: stats.proVotes.total,
                    sub: `${stats.proVotes.participation}% du groupe`,
                  },
                  {
                    label: "Ont laissé un avis",
                    value: stats.pros.filter(
                      (v) => v.avis && Object.keys(v.avis).length > 0,
                    ).length,
                    sub: `${Math.round((stats.pros.filter((v) => v.avis && Object.keys(v.avis).length > 0).length / stats.pros.length) * 100)}% du groupe`,
                  },
                  {
                    label: "Ont répondu aux préoccupations",
                    value: stats.proAvecNegatifs,
                    sub: `${stats.proAvecNegatifsPct}% du groupe`,
                  },
                  {
                    label: "Ont fourni leur entreprise",
                    value: stats.pros.filter((v) => v.company).length,
                    sub: `${Math.round((stats.pros.filter((v) => v.company).length / stats.pros.length) * 100)}% du groupe`,
                  },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    style={{
                      padding: "16px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="serif"
                      style={{
                        fontSize: 28,
                        color: "var(--gold2)",
                        fontWeight: 400,
                      }}
                    >
                      {kpi.value}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: "4px 0",
                      }}
                    >
                      {kpi.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gold)",
                        opacity: 0.7,
                      }}
                    >
                      {kpi.sub}
                    </div>
                  </div>
                ))}
              </div>
            </CardSection>
          </div>
        )}

        {/* ── CLIENT ── */}
        {tab === "client" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CardSection
              title={`Transporteur préféré — Particuliers`}
              subtitle={`${stats.clientVotes.total} votes / ${stats.clients.length} particuliers · ${stats.clientVotes.participation}% de participation`}
            >
              {getDetailedVoteData(stats.clients, QUESTIONS_CLIENT[0]?.id)
                .length === 0 ? (
                <Empty />
              ) : (
                <div
                  style={{
                    height: Math.max(
                      300,
                      getDetailedVoteData(
                        stats.clients,
                        QUESTIONS_CLIENT[0]?.id,
                      ).length * 52,
                    ),
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getDetailedVoteData(
                        stats.clients,
                        QUESTIONS_CLIENT[0]?.id,
                      )}
                      layout="vertical"
                      margin={{ left: 130, right: 80 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "#A8A4B8", fontSize: 13 }}
                        width={120}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(200,169,110,0.05)" }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {getDetailedVoteData(
                          stats.clients,
                          QUESTIONS_CLIENT[0]?.id,
                        ).map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              i === 0
                                ? GOLD
                                : i === 1
                                  ? GOLD2
                                  : "rgba(200,169,110,0.3)"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardSection>
          </div>
        )}

        {/* ── NÉGATIFS ── */}
        {tab === "negatifs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CardSection
              title="Préoccupations — Professionnels"
              subtitle={`${stats.proAvecNegatifs} pros ont répondu (${stats.proAvecNegatifsPct}%) · % calculé sur les répondants`}
            >
              {stats.negProData.length === 0 ? (
                <Empty />
              ) : (
                <div
                  style={{
                    height: Math.max(300, stats.negProData.length * 46),
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.negProData}
                      layout="vertical"
                      margin={{ left: 280, right: 80 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "#A8A4B8", fontSize: 12 }}
                        width={270}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(200,169,110,0.05)" }}
                      />
                      <Bar dataKey="value" fill={GOLD} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardSection>

            <CardSection
              title="Préoccupations — Particuliers"
              subtitle={`${stats.clientAvecNegatifs} particuliers ont répondu (${stats.clientAvecNegatifsPct}%) · % calculé sur les répondants`}
            >
              {stats.negClientData.length === 0 ? (
                <Empty />
              ) : (
                <div
                  style={{
                    height: Math.max(300, stats.negClientData.length * 46),
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.negClientData}
                      layout="vertical"
                      margin={{ left: 280, right: 80 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "#A8A4B8", fontSize: 12 }}
                        width={270}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(200,169,110,0.05)" }}
                      />
                      <Bar dataKey="value" fill={GOLD2} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardSection>
          </div>
        )}

        {/* ── AVIS ── */}
        {tab === "avis" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CardSection
              title="Avis détaillés par transporteur"
              subtitle={`${stats.votantsAvecAvis} votants ont laissé des avis (${stats.avisParticipation}%) · score net = (positifs − négatifs) / total`}
            >
              {stats.avisWithRatio.length === 0 ? (
                <Empty />
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {stats.avisWithRatio.map((t, i) => (
                    <div
                      key={t.id}
                      style={{
                        padding: "12px 16px",
                        background:
                          i % 2 === 0
                            ? "rgba(255,255,255,0.02)"
                            : "transparent",
                        border: "1px solid rgba(255,255,255,0.04)",
                        borderRadius: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            flex: 1,
                            fontSize: 14,
                            color: "var(--text)",
                            fontWeight: 500,
                          }}
                        >
                          {t.nom}
                        </span>
                        <span style={{ fontSize: 11, color: "var(--text3)" }}>
                          {t.total} avis
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color:
                              t.score > 20
                                ? "#4ade80"
                                : t.score < -20
                                  ? "#f87171"
                                  : "var(--gold)",
                            minWidth: 70,
                            textAlign: "right",
                          }}
                        >
                          Score {t.score > 0 ? "+" : ""}
                          {t.score}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          height: 8,
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${t.positivePct}%`,
                            background: "#4ade80",
                            transition: "width 1s",
                          }}
                          title={`😊 ${t.positivePct}%`}
                        />
                        <div
                          style={{
                            width: `${Math.round((t.neutral / t.total) * 100)}%`,
                            background: "#A8A4B8",
                          }}
                          title={`😐 ${Math.round((t.neutral / t.total) * 100)}%`}
                        />
                        <div
                          style={{ flex: 1, background: "#f87171" }}
                          title={`😞 ${t.negativePct}%`}
                        />
                      </div>
                      <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                        <span style={{ fontSize: 11, color: "#4ade80" }}>
                          😊 {t.good} ({t.positivePct}%)
                        </span>
                        <span style={{ fontSize: 11, color: "#A8A4B8" }}>
                          😐 {t.neutral} (
                          {Math.round((t.neutral / t.total) * 100)}%)
                        </span>
                        <span style={{ fontSize: 11, color: "#f87171" }}>
                          😞 {t.bad} ({t.negativePct}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardSection>

            {/* Classement par score net */}
            <CardSection
              title="Classement par score net"
              subtitle="Meilleure réputation en premier"
            >
              <div
                style={{
                  height: Math.max(300, stats.avisWithRatio.length * 44),
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.avisWithRatio.map((t) => ({
                      name: t.nom,
                      score: t.score,
                      fill: t.score >= 0 ? GOLD : "#f87171",
                    }))}
                    layout="vertical"
                    margin={{ left: 130, right: 60 }}
                  >
                    <XAxis
                      type="number"
                      domain={[-100, 100]}
                      tick={{ fill: "#6A677A", fontSize: 11 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "#A8A4B8", fontSize: 13 }}
                      width={120}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />
                    <Bar dataKey="score" radius={4}>
                      {stats.avisWithRatio.map((t, i) => (
                        <Cell key={i} fill={t.score >= 0 ? GOLD : "#f87171"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardSection>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {tab === "timeline" && (
          <CardSection
            title="Votes par jour"
            subtitle="Évolution du nombre de votes dans le temps"
          >
            {stats.timeline.length === 0 ? (
              <Empty />
            ) : (
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.timeline}
                    margin={{ left: 0, right: 20, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#A8A4B8", fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      tick={{ fill: "#6A677A", fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(200,169,110,0.05)" }}
                    />
                    <Bar
                      dataKey="count"
                      name="Votes"
                      fill={GOLD}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Stats timeline */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 10,
                marginTop: 20,
              }}
            >
              {[
                {
                  label: "Meilleur jour",
                  value:
                    stats.timeline.length > 0
                      ? `${Math.max(...stats.timeline.map((d) => d.count))} votes`
                      : "—",
                },
                {
                  label: "Moyenne / jour",
                  value:
                    stats.timeline.length > 0
                      ? `${Math.round(stats.total / stats.timeline.length)} votes`
                      : "—",
                },
                {
                  label: "Jours actifs",
                  value: `${stats.timeline.length} jours`,
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  style={{
                    padding: "14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                >
                  <div
                    className="serif"
                    style={{
                      fontSize: 22,
                      color: "var(--gold2)",
                      fontWeight: 400,
                    }}
                  >
                    {kpi.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginTop: 4,
                    }}
                  >
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </CardSection>
        )}
      </div>
    </div>
  );
}
