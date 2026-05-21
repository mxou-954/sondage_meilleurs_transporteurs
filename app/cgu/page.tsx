import Link from "next/link";

export const metadata = {
  title: "Conditions Générales d'Utilisation — Best Carrier Award 2026",
};

export default function CGU() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", padding: "80px 24px 60px", fontFamily: "var(--sans)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.12em", textDecoration: "none" }}>
            ← Retour au vote
          </Link>
        </div>

        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
          Règles d'utilisation
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--text)", marginBottom: 8 }}>
          Conditions Générales d'Utilisation
        </h1>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", marginBottom: 48 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 40, color: "var(--text2)", fontSize: 14, lineHeight: 1.85 }}>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              1. Objet et acceptation
            </h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site <strong style={{ color: "var(--text)" }}>vote.colisconsult.com</strong>, opéré par ColisConsult SAS, dans le cadre de l'élection « Best Carrier Award 2026 ».
            </p>
            <p style={{ marginTop: 12 }}>
              En participant au vote, l'utilisateur reconnaît avoir lu, compris et accepté sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous devez vous abstenir d'utiliser le Site.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              2. Description du service
            </h2>
            <p>
              Le Site permet aux professionnels du transport et de la logistique, ainsi qu'aux expéditeurs particuliers, d'exprimer leurs préférences concernant les transporteurs actifs en France et en Europe, dans le cadre d'une enquête d'opinion annuelle organisée par ColisConsult SAS.
            </p>
            <p style={{ marginTop: 12 }}>
              Le vote est ouvert du <strong style={{ color: "var(--text)" }}>1er juin 2026</strong> au <strong style={{ color: "var(--text)" }}>30 juin 2026</strong> inclus. Les résultats seront publiés le <strong style={{ color: "var(--text)" }}>10 juillet 2026</strong>.
            </p>
            <p style={{ marginTop: 12 }}>
              ColisConsult SAS se réserve le droit de prolonger, modifier ou clôturer anticipativement la période de vote sans préavis.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              3. Conditions de participation
            </h2>
            <p>Pour participer au vote, l'utilisateur doit :</p>
            <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Être âgé d'au moins 18 ans ;</li>
              <li>Disposer d'une adresse email valide ;</li>
              <li>Pour le profil « Professionnel » : disposer d'une adresse email professionnelle (adresse rattachée à un domaine d'entreprise, hors fournisseurs de messagerie grand public tels que Gmail, Outlook, Yahoo, etc.) ;</li>
              <li>N'effectuer qu'un seul vote par adresse email — tout vote supplémentaire sera automatiquement rejeté ;</li>
              <li>Exprimer une opinion sincère et personnelle.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              ColisConsult SAS se réserve le droit d'annuler tout vote suspecté d'être frauduleux, automatisé ou coordonné, sans notification préalable.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              4. Nature des résultats
            </h2>
            <p>
              Les résultats publiés sont issus d'une enquête d'opinion volontaire et non représentative au sens statistique du terme. Ils n'ont pas valeur de classement officiel, de certification, de label qualité ou de recommandation commerciale de la part de ColisConsult SAS.
            </p>
            <p style={{ marginTop: 12 }}>
              ColisConsult SAS ne perçoit aucune rémunération de la part des transporteurs dans le cadre de cet événement et garantit la neutralité du processus de vote.
            </p>
            <p style={{ marginTop: 12 }}>
              L'utilisation des marques et logos des transporteurs est réalisée à titre strictement indicatif et informatif, sans implication de partenariat commercial.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              5. Comportement des utilisateurs
            </h2>
            <p>L'utilisateur s'engage à :</p>
            <ul style={{ marginTop: 12, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Ne pas utiliser de moyens automatisés (bots, scripts) pour voter ;</li>
              <li>Ne pas créer plusieurs comptes ou utiliser plusieurs adresses email afin de voter plusieurs fois ;</li>
              <li>Ne pas tenter de compromettre l'intégrité du vote par quelque moyen que ce soit ;</li>
              <li>Fournir des informations sincères et exactes lors de l'inscription.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Tout manquement à ces obligations pourra entraîner l'annulation du ou des votes concernés et, le cas échéant, des poursuites judiciaires.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              6. Données personnelles
            </h2>
            <p>
              La collecte et le traitement de vos données personnelles sont régis par notre{" "}
              <Link href="/confidentialite" style={{ color: "var(--gold)" }}>Politique de confidentialité</Link>,
              conforme au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés.
            </p>
            <p style={{ marginTop: 12 }}>
              Les données collectées (nom, adresse email, entreprise) sont utilisées exclusivement pour garantir l'unicité du vote et, avec votre consentement, pour vous informer des résultats et des actualités de ColisConsult SAS.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              7. Propriété des résultats
            </h2>
            <p>
              Les résultats agrégés et anonymisés du vote sont la propriété de ColisConsult SAS qui se réserve le droit de les publier, diffuser et exploiter à des fins commerciales et marketing, notamment dans le cadre de communications presse, réseaux sociaux et supports publicitaires.
            </p>
            <p style={{ marginTop: 12 }}>
              En participant, l'utilisateur consent à ce que son vote contribue à ces résultats publiés. Aucune donnée nominative ne sera rendue publique.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              8. Disponibilité du service
            </h2>
            <p>
              ColisConsult SAS s'efforce d'assurer la disponibilité du Site mais ne garantit pas un accès ininterrompu. Des interruptions peuvent survenir pour maintenance ou en cas de force majeure.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              9. Modification des CGU
            </h2>
            <p>
              ColisConsult SAS se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications substantielles par tout moyen approprié. La poursuite de l'utilisation du Site après modification vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              10. Droit applicable et litiges
            </h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige relatif à leur interprétation ou exécution, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents du ressort du siège social de ColisConsult SAS seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", fontWeight: 400, marginBottom: 16 }}>
              11. Contact
            </h2>
            <p>
              Pour toute question relative aux présentes CGU :{" "}
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