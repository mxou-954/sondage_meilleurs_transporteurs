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
      { id: "chronopost",    nom: "Chronopost",          logo: "chronopost.png",     pays: "France",    description: "Filiale La Poste, référence J+1 France" },
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
      { id: "chronopost",    nom: "Chronopost",          logo: "chronopost.png",     pays: "France",    description: "Filiale La Poste, référence J+1 France" },
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
export const ANNOUNCE_DATE = "1 juillet 2026";

export const POINTS_NEGATIFS_CLIENT = [
  { id: "suivi-imprecis",      label: "Suivi colis peu fiable ou imprécis" },
  { id: "plage-large",         label: "Plages de livraison trop larges" },
  { id: "retard",              label: "Retard significatif" },
  { id: "colis-perdu",         label: "Colis déclaré perdu" },
  { id: "colis-non-livre",     label: "Colis déclaré livré, mais non livré" },
  { id: "lieu-sur",            label: "Dépôt en \"lieu sûr\" sans accord préalable" },
  { id: "relais-force",        label: "Colis prévu domicile, mais livré dans un relais" },
  { id: "relais-ferme",        label: "Point relais fermé ou saturé" },
  { id: "mauvais-relais",      label: "Livré dans mauvais point relais" },
  { id: "livreur-attitude",    label: "Comportement du livreur" },
  { id: "emballage-degrade",   label: "Emballage livré dégradé" },
  { id: "service-client",      label: "Service client difficile à joindre" },
];

export const POINTS_NEGATIFS_PRO = [
  { id: "interlocuteur",       label: "Interlocuteur commercial peu réactif" },
  { id: "reclamation",         label: "Mauvaise gestion des réclamations" },
  { id: "enlevement",          label: "Problèmes lors des enlèvements" },
  { id: "casse-envoi",         label: "Colis endommagés ou pertes fréquentes" },
  { id: "delais-longs",        label: "Délais de livraison trop longs" },
  { id: "retards",             label: "Retards dans les livraisons" },
  { id: "dedouanement",        label: "Problèmes de dédouanement" },
  { id: "suivi-pro",           label: "Suivi et traçabilité insuffisants" },
  { id: "api-outils",          label: "Outils digitaux / API peu performants" },
  { id: "tarifs-opaques",      label: "Tarifs peu transparents / complexes" },
  { id: "supplements",         label: "Trop de suppléments" },
  { id: "poids-volu",          label: "Impact du poids volumétrique" },
  { id: "facturation-erreur",  label: "Erreurs de facturation récurrentes" },
  { id: "eco-pro",             label: "Manque d'engagement environnemental" },
];