import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — Best Carrier Award 2026",
};

export default function Confidentialite() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", padding: "80px 24px 60px", fontFamily: "var(--sans)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.12em", textDecoration: "none" }}>
            ← Retour au vote
          </Link>
        </div>

        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
          RGPD & Vie privée
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--text)", marginBottom: 8 }}>
          Politique de confidentialité
        </h1>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", marginBottom: 16 }} />
        <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 48 }}>
          Conforme au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés n°78-17
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, color: "var(--text2)", fontSize: 14, lineHeight: 1.85 }}>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              1. Responsable du traitement
            </h2>
            <div style={{ padding: "20px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 4, lineHeight: 2 }}>
              <strong style={{ color: "var(--text)" }}>ColisConsult SAS</strong><br />
              53 AVENUE CARNOT, 94100 SAINT-MAUR-DES-FOSSES<br />
              Email DPO / Contact RGPD :{" "}
              <a href="mailto:commercial@colisconsult.com" style={{ color: "var(--gold)" }}>commercial@colisconsult.com</a>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              2. Données collectées
            </h2>
            <p>Dans le cadre du vote, nous collectons les données suivantes :</p>
            <div style={{ marginTop: 16, overflow: "hidden", borderRadius: 4, border: "1px solid rgba(200,169,110,0.15)" }}>
              {[
                { donnee: "Prénom & Nom", finalite: "Personnalisation de l'écran de confirmation", base: "Consentement" },
                { donnee: "Adresse email", finalite: "Unicité du vote · Communication des résultats", base: "Consentement" },
                { donnee: "Entreprise (pro)", finalite: "Segmentation des résultats par type d'acteur", base: "Consentement" },
                { donnee: "Profil (pro/client)", finalite: "Adaptation des questions et segmentation", base: "Intérêt légitime" },
                { donnee: "Votes & avis", finalite: "Publication des résultats agrégés et anonymisés", base: "Consentement" },
                { donnee: "Horodatage", finalite: "Contrôle de l'intégrité du vote", base: "Intérêt légitime" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 2fr 1fr",
                  padding: "12px 16px", gap: 12,
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  fontSize: 12,
                }}>
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>{row.donnee}</span>
                  <span style={{ color: "var(--text2)" }}>{row.finalite}</span>
                  <span style={{ color: "var(--gold)", fontSize: 11 }}>{row.base}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: 12, color: "var(--text3)" }}>
              Aucune donnée sensible au sens de l'article 9 du RGPD n'est collectée.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              3. Base légale des traitements
            </h2>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <li><strong style={{ color: "var(--text)" }}>Consentement (art. 6.1.a RGPD)</strong> — vous acceptez expressément les présentes conditions avant de voter. Ce consentement est librement donné, spécifique, éclairé et univoque.</li>
              <li><strong style={{ color: "var(--text)" }}>Intérêt légitime (art. 6.1.f RGPD)</strong> — pour les données techniques nécessaires à la sécurité et à l'intégrité du vote (horodatage, détection des doublons).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              4. Durée de conservation
            </h2>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <li><strong style={{ color: "var(--text)" }}>Données de vote (email, nom, entreprise, votes)</strong> — conservées pendant <strong style={{ color: "var(--text)" }}>12 mois</strong> à compter de la clôture du vote, puis supprimées ou anonymisées.</li>
              <li><strong style={{ color: "var(--text)" }}>Résultats agrégés et anonymisés</strong> — conservés indéfiniment à des fins statistiques et historiques.</li>
              <li><strong style={{ color: "var(--text)" }}>Données de prospection commerciale</strong> (si vous avez accepté d'être recontacté) — conservées pendant <strong style={{ color: "var(--text)" }}>3 ans</strong> à compter du dernier contact.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              5. Destinataires des données
            </h2>
            <p>Vos données sont accessibles uniquement à :</p>
            <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>L'équipe interne de ColisConsult SAS habilitée à la gestion du vote ;</li>
              <li><strong style={{ color: "var(--text)" }}>Vercel Inc.</strong> — hébergeur du site (sous-traitant, encadré par un DPA conforme RGPD) ;</li>
              <li><strong style={{ color: "var(--text)" }}>Upstash Inc.</strong> — hébergeur de la base de données Redis (serveurs EU-West, encadré par des clauses contractuelles types).</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "var(--text)" }}>Vos données ne sont jamais vendues, louées ou cédées à des tiers.</strong> Les transporteurs dont vous évaluez les services n'ont pas accès à vos données individuelles.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              6. Transferts hors UE
            </h2>
            <p>
              Vercel Inc. et Upstash Inc. sont des sociétés américaines. Les transferts de données vers les États-Unis sont encadrés par les <strong style={{ color: "var(--text)" }}>Clauses Contractuelles Types (CCT)</strong> adoptées par la Commission européenne, garantissant un niveau de protection adéquat conformément à l'article 46 du RGPD.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              7. Vos droits
            </h2>
            <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { droit: "Droit d'accès (art. 15)", desc: "Obtenir une copie des données vous concernant." },
                { droit: "Droit de rectification (art. 16)", desc: "Corriger des données inexactes ou incomplètes." },
                { droit: "Droit à l'effacement (art. 17)", desc: "Demander la suppression de vos données (« droit à l'oubli »), sauf obligation légale de conservation." },
                { droit: "Droit à la limitation (art. 18)", desc: "Suspendre temporairement le traitement de vos données." },
                { droit: "Droit à la portabilité (art. 20)", desc: "Recevoir vos données dans un format structuré et lisible par machine." },
                { droit: "Droit d'opposition (art. 21)", desc: "Vous opposer au traitement fondé sur l'intérêt légitime." },
                { droit: "Retrait du consentement", desc: "Retirer votre consentement à tout moment, sans remettre en cause la licéité des traitements antérieurs." },
              ].map((r, i) => (
                <div key={i} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--gold)", marginBottom: 4 }}>{r.droit}</div>
                  <div style={{ fontSize: 13, color: "var(--text2)" }}>{r.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              Pour exercer vos droits, contactez-nous à{" "}
              <a href="mailto:commercial@colisconsult.com" style={{ color: "var(--gold)" }}>commercial@colisconsult.com</a>{" "}
              en joignant une copie de votre pièce d'identité. Nous nous engageons à répondre dans un délai d'un mois (art. 12 RGPD).
            </p>
            <p style={{ marginTop: 12 }}>
              Vous disposez également du droit d'introduire une réclamation auprès de la <strong style={{ color: "var(--text)" }}>CNIL</strong> :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>www.cnil.fr</a>
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              8. Cookies et traceurs
            </h2>
            <p>
              Ce Site n'utilise <strong style={{ color: "var(--text)" }}>aucun cookie de traçage ou publicitaire</strong>. Aucun outil d'analyse de comportement (Google Analytics, etc.) n'est installé.
            </p>
            <p style={{ marginTop: 12 }}>
              Le stockage de l'état de navigation (étapes du tunnel de vote) est réalisé exclusivement en mémoire côté client (React state) et n'est pas persisté après la fermeture de l'onglet.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              9. Sécurité
            </h2>
            <p>ColisConsult SAS met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
            <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Chiffrement en transit via HTTPS (TLS 1.3) ;</li>
              <li>Stockage chiffré au repos dans la base Redis (Upstash, région EU) ;</li>
              <li>Accès restreint aux données par token d'authentification ;</li>
              <li>Un seul vote par adresse email, contrôlé côté serveur.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              10. Modifications
            </h2>
            <p>
              Cette politique peut être mise à jour. En cas de modification substantielle, nous en informerons les utilisateurs par email ou via une notice sur le Site. La date de dernière mise à jour est indiquée en bas de page.
            </p>
          </section>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <Link href="/cgu" style={{ fontSize: 12, color: "var(--gold)" }}>Conditions Générales d'Utilisation</Link>
            <Link href="/mentions-legales" style={{ fontSize: 12, color: "var(--gold)" }}>Mentions légales</Link>
          </div>

          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: -24 }}>
            Dernière mise à jour : mai 2026
          </div>
        </div>
      </div>
    </div>
  );
}