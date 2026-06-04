import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.montransporteurprefere.com"),
  title: {
    default: "MonTransporteurPréféré.com | Élection | By ColisConsult",
    template: "%s | Mon Transporteur Préféré",
  },
  description:
    "Votez, en tant que professionnel ou particulier, pour désigner le meilleur transporteur de colis. Choisissez parmi La Poste, Chronopost, Mondial Relay, DHL…",
  keywords: [
    "meilleur transporteur 2026",
    "transporteur préféré France",
    "sondage transporteurs",
    "élection transporteur",
    "DHL UPS FedEx Chronopost Colissimo DPD GLS",
    "transport colis France",
    "comparatif transporteurs",
    "ColisConsult",
    "appel offres transport",
    "logistique France",
    "vote transporteur",
    "best carrier award",
  ],
  authors: [{ name: "ColisConsult", url: "https://www.colisconsult.com" }],
  creator: "ColisConsult",
  publisher: "ColisConsult",
  category: "Transport & Logistique",
  openGraph: {
    title: "Mon Transporteur Préféré — Élection S1 2026",
    description:
      "DHL, UPS, Chronopost, Colissimo, DPD, GLS, Mondial Relay… Lequel mérite le titre ? Votez parmi les professionnels et expéditeurs. Sondage indépendant par ColisConsult.",
    url: "https://www.montransporteurprefere.com",
    siteName: "Mon Transporteur Préféré",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Mon Transporteur Préféré.com | Élection | ColisConsult",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mon Transporteur Préféré.com | Élection | ColisConsult",
    description:
      "Votez pour le meilleur transporteur de l'année. Sondage indépendant par ColisConsult.",
    images: ["/api/og"],
    creator: "@colisconsult",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.montransporteurprefere.com",
  },
  verification: {
    google: "569eacf7f857d990",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script src="https://accounts.google.com/gsi/client" async></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mon Transporteur Préféré",
              url: "https://www.montransporteurprefere.com",
              description:
                "Élection du meilleur transporteur S1 2026 par les professionnels du transport et les expéditeurs. Un sondage indépendant organisé par ColisConsult.",
              publisher: {
                "@type": "Organization",
                name: "ColisConsult",
                url: "https://www.colisconsult.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.colisconsult.com/logo.png",
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.montransporteurprefere.com",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}