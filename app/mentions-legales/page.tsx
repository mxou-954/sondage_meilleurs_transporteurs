import Link from "next/link";

export const metadata = {
  title: "Mentions légales — Best Carrier Award 2026",
};

export default function MentionsLegales() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", padding: "80px 24px 60px", fontFamily: "var(--sans)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Nav */}
        <div style={{ marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.12em", textDecoration: "none" }}>
            ← Retour au vote
          </Link>
        </div>

        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
          Informations légales
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--text)", marginBottom: 8 }}>
          Mentions légales
        </h1>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", marginBottom: 48 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 40, color: "var(--text2)", fontSize: 14, lineHeight: 1.85 }}>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              1. Éditeur du site
            </h2>
            <p>Le site <strong style={{ color: "var(--text)" }}>vote.colisconsult.com</strong> (ci-après « le Site ») est édité par :</p>
            <div style={{ marginTop: 16, padding: "20px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 4, lineHeight: 2 }}>
              <strong style={{ color: "var(--text)" }}>ColisConsult SAS</strong><br />
              Siège social : 53 AVENUE CARNOT, 94100 SAINT-MAUR-DES-FOSSES<br />
              SIREN / SIRET : 480234483 / 48023448300042<br />
              Capital social : 49 000,00 €<br />
              RCS : 480 234 483 R.C.S. Creteil<br />
              Email : commercial@colisconsult.com<br />
              Téléphone : +336 27 17 19 31<br />
              Directeur de la publication : Matthieu Erly
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              2. Hébergement
            </h2>
            <div style={{ padding: "20px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 4, lineHeight: 2 }}>
              <strong style={{ color: "var(--text)" }}>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>vercel.com</a>
            </div>
            <p style={{ marginTop: 12 }}>
              La base de données est hébergée par <strong style={{ color: "var(--text)" }}>Upstash Inc.</strong> (Redis serverless), dont les serveurs sont localisés en Europe (région EU-West).
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              3. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce Site (textes, graphismes, logo, iconographie, structure) est la propriété exclusive de ColisConsult SAS et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p style={{ marginTop: 12 }}>
              Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de ColisConsult SAS.
            </p>
            <p style={{ marginTop: 12 }}>
              Les marques et logos des transporteurs présentés dans le cadre du vote (DHL, UPS, FedEx, Chronopost, Colissimo, DPD, GLS, Mondial Relay, Colis Privé, etc.) sont la propriété exclusive de leurs détenteurs respectifs et sont utilisés à titre purement indicatif dans le cadre de cette enquête d'opinion.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              4. Responsabilité
            </h2>
            <p>
              Les résultats publiés sur ce Site sont issus d'une enquête d'opinion non représentative de la population générale. Ils constituent un indicateur de satisfaction et ne peuvent être interprétés comme un classement officiel, un label ou une certification.
            </p>
            <p style={{ marginTop: 12 }}>
              ColisConsult SAS ne saurait être tenu responsable des erreurs ou omissions dans le contenu du Site, ni des dommages directs ou indirects résultant de l'accès ou de l'utilisation du Site.
            </p>
            <p style={{ marginTop: 12 }}>
              ColisConsult SAS se réserve le droit de modifier, corriger ou supprimer tout contenu à tout moment et sans préavis.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              5. Liens hypertextes
            </h2>
            <p>
              Le Site peut contenir des liens vers des sites tiers. ColisConsult SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur disponibilité.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              6. Droit applicable et juridiction
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              7. Contact
            </h2>
            <p>
              Pour toute question relative au Site ou à vos données personnelles :{" "}
              <a href="mailto:commercial@colisconsult.com" style={{ color: "var(--gold)" }}>commercial@colisconsult.com</a>
            </p>
          </section>

          <div style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "var(--text3)" }}>
            Dernière mise à jour : mai 2026
          </div>
        </div>
      </div>
    </div>
  );
}