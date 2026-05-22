import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Carrier Award 2026 — ColisConsult",
  description: "L'élection des meilleurs transporteurs par les professionnels du transport. Votez dès maintenant.",
  openGraph: {
    title: "Best Carrier Award 2026",
    description: "Quelle est le meilleur transporteur de l'année ? Votez.",
    type: "website",
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
