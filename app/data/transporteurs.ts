export type Transporteur = {
  id: string;
  nom: string;
  logo: string;          // filename in /public/logos/ (e.g. "dhl.png") — empty = placeholder
  pays: string;
  description: string;
};

export type Question = {
  id: string;
  label: string;
  text: string;
  transporteurs: Transporteur[];
};

// ─── QUESTIONS PROFESSIONNELS (4) ───────────────────────────────────────────

export const QUESTIONS_PRO: Question[] = [
  {
    id: "pro-meilleur-transporteur",
    label: "Meilleur transporteur",
    text: "Quel est votre transporteur préféré ? ",
    transporteurs: [
      { id: "chronopost",    nom: "Chronopost",         logo: "chronopost.png",      pays: "France",    description: "Filiale La Poste, référence J+1 France" },
      { id: "dhl",           nom: "DHL Express",         logo: "dhl.png",            pays: "Monde",     description: "Premium fiabilité, fort en B2B" },
      { id: "ups",           nom: "UPS",                 logo: "ups.png",            pays: "USA",       description: "Solide réseau B2B, points relais entreprise" },
      { id: "fedex",         nom: "FedEx",               logo: "fedex.png",          pays: "USA",       description: "Fort en santé, tech et industrie" },
      { id: "dpd",           nom: "DPD",                 logo: "dpd.png",            pays: "France",    description: "Predict temps réel, bon taux 1ère présentation" },
      { id: "gls",           nom: "GLS",                 logo: "gls.png",            pays: "Europe",    description: "Équilibre qualité/prix, réseau EU dense" },
      { id: "colissimo",     nom: "Colissimo",           logo: "colissimo.png",      pays: "France",    description: "Volume B2C, réseau postal capillaire" },
      { id: "colis-prive",   nom: "Colis Privé",         logo: "colis-prive.png",    pays: "France",    description: "Challenger agile, tarifs attractifs" },
      { id: "mondial-relay", nom: "Mondial Relay",       logo: "mondial-relay.png",  pays: "France",    description: "Challenger agile, tarifs attractifs" },
    ],
  },
];

// ─── QUESTIONS CLIENTS / PARTICULIERS (4) ────────────────────────────────────

export const QUESTIONS_CLIENT: Question[] = [
  {
    id: "particulier-meilleur-transporteur",
    label: "Meilleur transporteur",
    text: "Quel est votre transporteur préféré ? ",
    transporteurs: [
      { id: "chronopost",    nom: "Chronopost",         logo: "chronopost.png",      pays: "France",    description: "Filiale La Poste, référence J+1 France" },
      { id: "dhl",           nom: "DHL Express",         logo: "dhl.png",            pays: "Monde",     description: "Premium fiabilité, fort en B2B" },
      { id: "ups",           nom: "UPS",                 logo: "ups.png",            pays: "USA",       description: "Solide réseau B2B, points relais entreprise" },
      { id: "fedex",         nom: "FedEx",               logo: "fedex.png",          pays: "USA",       description: "Fort en santé, tech et industrie" },
      { id: "dpd",           nom: "DPD",                 logo: "dpd.png",            pays: "France",    description: "Predict temps réel, bon taux 1ère présentation" },
      { id: "gls",           nom: "GLS",                 logo: "gls.png",            pays: "Europe",    description: "Équilibre qualité/prix, réseau EU dense" },
      { id: "colissimo",     nom: "Colissimo",           logo: "colissimo.png",      pays: "France",    description: "Volume B2C, réseau postal capillaire" },
      { id: "colis-prive",   nom: "Colis Privé",         logo: "colis-prive.png",    pays: "France",    description: "Challenger agile, tarifs attractifs" },
      { id: "mondial-relay", nom: "Mondial Relay",       logo: "mondial-relay.png",  pays: "France",    description: "Challenger agile, tarifs att" },
    ],
  },
];

export const VOTE_DEADLINE = new Date("2026-06-30T23:59:59");
export const ANNOUNCE_DATE = "10 juillet 2026";

export const POINTS_NEGATIFS_CLIENT = [
  { id: "retard-reception",    label: "Retards de livraison récurrents" },
  { id: "avis-passage",        label: "Avis de passage sans tentative réelle" },
  { id: "suivi-client",        label: "Suivi colis peu fiable ou imprécis" },
  { id: "casse-reception",     label: "Colis endommagés ou perdus à la réception" },
  { id: "plage-large",         label: "Plages de livraison trop larges" },
  { id: "relais-ferme",        label: "Point relais fermé ou saturé" },
  { id: "service-client",      label: "Service client difficile à joindre" },
  { id: "remboursement",       label: "Remboursements lents ou refusés" },
  { id: "retour-complique",    label: "Procédure de retour trop compliquée" },
  { id: "notification",        label: "Notifications de livraison absentes ou tardives" },
  { id: "livreur-attitude",    label: "Comportement du livreur" },
  { id: "consigne-absent",     label: "Dépôt en lieu sûr sans accord préalable" },
];

export const POINTS_NEGATIFS_PRO = [
  { id: "retard-envoi",        label: "Retards d'enlèvement ou de livraison" },
  { id: "tarifs-opaques",      label: "Tarifs peu transparents ou hausses fréquentes" },
  { id: "facturation-erreur",  label: "Erreurs de facturation récurrentes" },
  { id: "poids-volu",          label: "Application abusive du poids volumétrique" },
  { id: "suivi-pro",           label: "Suivi et traçabilité insuffisants" },
  { id: "casse-envoi",         label: "Colis endommagés ou pertes fréquentes" },
  { id: "interlocuteur",       label: "Interlocuteur commercial peu réactif" },
  { id: "api-outils",          label: "Outils digitaux / API peu performants" },
  { id: "reclamation",         label: "Gestion des réclamations trop lente" },
  { id: "contrat-negocia",     label: "Peu de flexibilité en négociation contractuelle" },
  { id: "eco-pro",             label: "Manque d'engagement environnemental" },
  { id: "international-docs",  label: "Complexité des documents douaniers" },
];