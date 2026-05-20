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
    id: "pro-express-fr",
    label: "Express France",
    text: "Pour des envois express J+1 en France, quel transporteur recommandez-vous à vos clients ?",
    transporteurs: [
      { id: "chronopost",   nom: "Chronopost",         logo: "chronopost.png",   pays: "France",    description: "Filiale La Poste, référence J+1 France" },
      { id: "dhl",          nom: "DHL Express",         logo: "dhl.png",          pays: "Monde",     description: "Premium fiabilité, fort en B2B" },
      { id: "ups",          nom: "UPS",                 logo: "ups.png",          pays: "USA",       description: "Solide réseau B2B, points relais entreprise" },
      { id: "fedex",        nom: "FedEx",               logo: "fedex.png",        pays: "USA",       description: "Fort en santé, tech et industrie" },
      { id: "dpd",          nom: "DPD",                 logo: "dpd.png",          pays: "France",    description: "Predict temps réel, bon taux 1ère présentation" },
      { id: "gls",          nom: "GLS",                 logo: "gls.png",          pays: "Europe",    description: "Équilibre qualité/prix, réseau EU dense" },
      { id: "tnt",          nom: "TNT / FedEx Freight", logo: "tnt.png",          pays: "Europe",    description: "Couverture Europe, intégration FedEx" },
      { id: "colissimo",    nom: "Colissimo",           logo: "colissimo.png",    pays: "France",    description: "Volume B2C, réseau postal capillaire" },
      { id: "geodis",       nom: "Geodis",              logo: "geodis.png",       pays: "France",    description: "Groupe SNCF, acteur logistique complet" },
      { id: "colis-prive",  nom: "Colis Privé",         logo: "colis-prive.png",  pays: "France",    description: "Challenger agile, tarifs attractifs" },
      { id: "spring",       nom: "Spring / GLS",        logo: "spring.png",       pays: "Europe",    description: "Solutions cross-border e-commerce" },
      { id: "laposte",      nom: "La Poste Colissimo",  logo: "laposte.png",      pays: "France",    description: "Capillarité nationale, suivi fiable" },
    ],
  },
  {
    id: "pro-international",
    label: "Express International",
    text: "Pour des envois à l'international (hors Europe), quel transporteur recommandez-vous ?",
    transporteurs: [
      { id: "dhl-int",      nom: "DHL Express",         logo: "dhl.png",          pays: "Monde",     description: "N°1 mondial, 220 pays, le plus fiable" },
      { id: "fedex-int",    nom: "FedEx International", logo: "fedex.png",        pays: "USA",       description: "Fort USA & Asie, excellent pour docs" },
      { id: "ups-int",      nom: "UPS Worldwide",       logo: "ups.png",          pays: "USA",       description: "Amérique du Nord, dédouanement expert" },
      { id: "tnt-int",      nom: "TNT Express",         logo: "tnt.png",          pays: "Europe",    description: "Solide sur l'Europe élargie" },
      { id: "aramex",       nom: "Aramex",              logo: "aramex.png",       pays: "Moyen-Orient", description: "Référence Moyen-Orient & Afrique" },
      { id: "schenker",     nom: "DB Schenker",         logo: "schenker.png",     pays: "Allemagne", description: "Fret mondial, réseau ferroviaire" },
      { id: "dachser",      nom: "Dachser",             logo: "dachser.png",      pays: "Allemagne", description: "Excellence EU, dense et fiable" },
      { id: "bolloré",      nom: "Bolloré Logistics",   logo: "bollore.png",      pays: "France",    description: "Afrique & solutions sur-mesure" },
      { id: "kuehne",       nom: "Kuehne + Nagel",      logo: "kuehne.png",       pays: "Suisse",    description: "Leader fret aérien & maritime" },
      { id: "panalpina",    nom: "DSV / Panalpina",     logo: "dsv.png",          pays: "Danemark",  description: "Top 3 mondial fret aérien" },
      { id: "ceva",         nom: "CEVA Logistics",      logo: "ceva.png",         pays: "France",    description: "Solutions intégrées multimodales" },
      { id: "geopost",      nom: "GeoPost / DPDgroup",  logo: "geopost.png",     pays: "France",    description: "Réseau EU, 230 pays via partenaires" },
    ],
  },
  {
    id: "pro-b2c",
    label: "Colis B2C / E-commerce",
    text: "Pour un e-commerçant livrant des particuliers en France, quel transporteur est le meilleur ?",
    transporteurs: [
      { id: "colissimo-b2c", nom: "Colissimo",          logo: "colissimo.png",   pays: "France",    description: "N°1 volumes B2C, réseau postal" },
      { id: "dpd-b2c",       nom: "DPD",                logo: "dpd.png",         pays: "France",    description: "Predict, fort taux livraison J+1" },
      { id: "mondial",       nom: "Mondial Relay",       logo: "mondial-relay.png", pays: "France", description: "Leader points relais, coût/colis compétitif" },
      { id: "colprive",      nom: "Colis Privé",         logo: "colis-prive.png", pays: "France",   description: "Challenger, tarifs agressifs" },
      { id: "gls-b2c",       nom: "GLS",                 logo: "gls.png",         pays: "Europe",   description: "Bon rapport qualité/prix" },
      { id: "chrono-b2c",    nom: "Chronopost",          logo: "chronopost.png",  pays: "France",   description: "Express B2C premium" },
      { id: "ups-b2c",       nom: "UPS Access Point",    logo: "ups.png",         pays: "USA",      description: "Réseau points d'accès dense" },
      { id: "fedex-b2c",     nom: "FedEx",               logo: "fedex.png",       pays: "USA",      description: "Livraison résidentielle fiable" },
      { id: "relais-colis",  nom: "Relais Colis",        logo: "relais-colis.png", pays: "France",  description: "Réseau tabac-presse, 5500 points" },
      { id: "pickup",        nom: "Pickup (GLS)",         logo: "pickup.png",      pays: "France",  description: "Réseau relais GLS France" },
      { id: "inpost",        nom: "InPost",               logo: "inpost.png",      pays: "Pologne", description: "Consignes automatiques 24h/24" },
      { id: "amazon-log",    nom: "Amazon Logistics",    logo: "amazon.png",      pays: "USA",      description: "Livraison J même/J+1 pour Prime" },
    ],
  },
  {
    id: "pro-palette",
    label: "Palette & Fret B2B",
    text: "Pour des envois palettisés ou du fret industriel B2B, quel est le meilleur transporteur ?",
    transporteurs: [
      { id: "geodis-p",    nom: "Geodis",               logo: "geodis.png",      pays: "France",    description: "Groupe SNCF, acteur complet France/EU" },
      { id: "dachser-p",   nom: "Dachser",              logo: "dachser.png",     pays: "Allemagne", description: "Excellence allemande, EU très dense" },
      { id: "xpo",         nom: "XPO Logistics",        logo: "xpo.png",         pays: "USA",       description: "Acteur global fret, bons contrats cadre" },
      { id: "schenker-p",  nom: "DB Schenker",          logo: "schenker.png",    pays: "Allemagne", description: "Ferroviaire + routier, fort en EU" },
      { id: "tnt-p",       nom: "TNT Freight",          logo: "tnt.png",         pays: "Europe",    description: "Couverture EU, intégration FedEx Freight" },
      { id: "bolloré-p",   nom: "Bolloré Transport",    logo: "bollore.png",     pays: "France",    description: "Solutions sur-mesure, Afrique" },
      { id: "gefco",       nom: "GEFCO / CEVA",         logo: "gefco.png",       pays: "France",    description: "Automobile & industrie lourde" },
      { id: "kuehne-p",    nom: "Kuehne + Nagel",       logo: "kuehne.png",      pays: "Suisse",    description: "Fret multimodal, solutions intégrées" },
      { id: "norbert",     nom: "Norbert Dentressangle", logo: "norbert.png",    pays: "France",    description: "Transport & logistique Europe" },
      { id: "rhenus",      nom: "Rhenus Logistics",     logo: "rhenus.png",      pays: "Allemagne", description: "Fret partiel et complet EU" },
      { id: "kurier",      nom: "Transports Kuehne",    logo: "kuehne.png",      pays: "Europe",    description: "Réseau routier dense EU" },
      { id: "dsv-p",       nom: "DSV Road",             logo: "dsv.png",         pays: "Danemark",  description: "Top 3 transport routier EU" },
    ],
  },
];

// ─── QUESTIONS CLIENTS / PARTICULIERS (4) ────────────────────────────────────

export const QUESTIONS_CLIENT: Question[] = [
  {
    id: "cli-livraison",
    label: "Livraison à domicile",
    text: "Pour recevoir un colis chez vous, quel transporteur offre la meilleure expérience de livraison ?",
    transporteurs: [
      { id: "colissimo-c",  nom: "Colissimo",           logo: "colissimo.png",    pays: "France",  description: "La Poste, suivi en ligne, créneaux" },
      { id: "dpd-c",        nom: "DPD",                  logo: "dpd.png",          pays: "France",  description: "Predict : créneau 1h à l'avance" },
      { id: "chrono-c",     nom: "Chronopost",           logo: "chronopost.png",   pays: "France",  description: "Express, livraison le lendemain" },
      { id: "mondial-c",    nom: "Mondial Relay",        logo: "mondial-relay.png", pays: "France", description: "Points relais proches de chez vous" },
      { id: "ups-c",        nom: "UPS",                  logo: "ups.png",           pays: "USA",    description: "Suivi précis, livraison fiable" },
      { id: "fedex-c",      nom: "FedEx",                logo: "fedex.png",         pays: "USA",    description: "Express, livraison résidentielle" },
      { id: "dhl-c",        nom: "DHL Express",          logo: "dhl.png",           pays: "Monde",  description: "Premium, ponctualité excellente" },
      { id: "colprive-c",   nom: "Colis Privé",          logo: "colis-prive.png",   pays: "France", description: "SMS avant livraison, souriant" },
      { id: "gls-c",        nom: "GLS",                  logo: "gls.png",           pays: "Europe", description: "Réseau dense, bon rapport qualité" },
      { id: "inpost-c",     nom: "InPost",               logo: "inpost.png",        pays: "Pologne", description: "Consignes 24h/24, très pratique" },
      { id: "relais-c",     nom: "Relais Colis",         logo: "relais-colis.png",  pays: "France", description: "Tabac, presse, supérettes" },
      { id: "amazon-c",     nom: "Amazon Logistics",     logo: "amazon.png",        pays: "USA",    description: "Livraison rapide & tracking précis" },
    ],
  },
  {
    id: "cli-retour",
    label: "Retours colis",
    text: "Pour retourner un colis facilement, quel transporteur offre le meilleur service ?",
    transporteurs: [
      { id: "colissimo-r",  nom: "Colissimo",            logo: "colissimo.png",    pays: "France",  description: "Retour en bureau de poste simple" },
      { id: "mondial-r",    nom: "Mondial Relay",        logo: "mondial-relay.png", pays: "France", description: "Dépôt en point relais pratique" },
      { id: "dpd-r",        nom: "DPD",                  logo: "dpd.png",          pays: "France",  description: "Dépôt en point Pickup facile" },
      { id: "ups-r",        nom: "UPS Access Point",     logo: "ups.png",           pays: "USA",    description: "Nombreux points de dépôt" },
      { id: "fedex-r",      nom: "FedEx",                logo: "fedex.png",         pays: "USA",    description: "Dépôt en bureau FedEx" },
      { id: "inpost-r",     nom: "InPost",               logo: "inpost.png",        pays: "Pologne", description: "Consigne 24h/24, sans file" },
      { id: "chrono-r",     nom: "Chronopost",           logo: "chronopost.png",   pays: "France",  description: "Enlèvement à domicile possible" },
      { id: "amazon-r",     nom: "Amazon Logistics",     logo: "amazon.png",        pays: "USA",    description: "QR code, sans emballage parfois" },
      { id: "gls-r",        nom: "GLS",                  logo: "gls.png",           pays: "Europe", description: "Réseau relais dense EU" },
      { id: "relais-r",     nom: "Relais Colis",         logo: "relais-colis.png",  pays: "France", description: "Facile, partout en France" },
      { id: "dhl-r",        nom: "DHL",                  logo: "dhl.png",           pays: "Monde",  description: "Service client réactif" },
      { id: "colprive-r",   nom: "Colis Privé",          logo: "colis-prive.png",   pays: "France", description: "Application mobile pratique" },
    ],
  },
  {
    id: "cli-communication",
    label: "Communication & Suivi",
    text: "Quel transporteur vous tient le mieux informé du suivi de votre colis ?",
    transporteurs: [
      { id: "dpd-s",        nom: "DPD Predict",          logo: "dpd.png",          pays: "France",  description: "Créneau 1h, SMS & email précis" },
      { id: "dhl-s",        nom: "DHL Express",          logo: "dhl.png",           pays: "Monde",  description: "Tracking temps réel, app premium" },
      { id: "amazon-s",     nom: "Amazon Logistics",     logo: "amazon.png",        pays: "USA",    description: "Carte en direct du livreur" },
      { id: "ups-s",        nom: "UPS My Choice",        logo: "ups.png",           pays: "USA",    description: "Personnalisation livraison avancée" },
      { id: "fedex-s",      nom: "FedEx Delivery Manager", logo: "fedex.png",       pays: "USA",    description: "Reprogrammation flexible" },
      { id: "colissimo-s",  nom: "Colissimo",            logo: "colissimo.png",    pays: "France",  description: "App La Poste, suivi multi-colis" },
      { id: "chrono-s",     nom: "Chronopost",           logo: "chronopost.png",   pays: "France",  description: "Notifications proactives" },
      { id: "gls-s",        nom: "GLS",                  logo: "gls.png",           pays: "Europe", description: "Tracking SMS fiable" },
      { id: "inpost-s",     nom: "InPost",               logo: "inpost.png",        pays: "Pologne", description: "Code unique, consigne localisée" },
      { id: "colprive-s",   nom: "Colis Privé",          logo: "colis-prive.png",   pays: "France", description: "SMS avant passage livreur" },
      { id: "mondial-s",    nom: "Mondial Relay",        logo: "mondial-relay.png", pays: "France", description: "Email dès arrivée en relais" },
      { id: "tnt-s",        nom: "TNT",                  logo: "tnt.png",           pays: "Europe", description: "Suivi B2B précis" },
    ],
  },
  {
    id: "cli-service",
    label: "Service Client",
    text: "En cas de problème avec votre colis, quel transporteur a le meilleur service client ?",
    transporteurs: [
      { id: "dhl-sk",       nom: "DHL Express",          logo: "dhl.png",           pays: "Monde",  description: "Réactivité premium, 24h/24" },
      { id: "ups-sk",       nom: "UPS",                  logo: "ups.png",           pays: "USA",    description: "Remboursements rapides, SAV solide" },
      { id: "fedex-sk",     nom: "FedEx",                logo: "fedex.png",         pays: "USA",    description: "Engagement service, bonne résolution" },
      { id: "colissimo-sk", nom: "Colissimo",            logo: "colissimo.png",    pays: "France",  description: "Bureau de poste accessible" },
      { id: "dpd-sk",       nom: "DPD",                  logo: "dpd.png",          pays: "France",  description: "Chat en ligne & téléphone réactif" },
      { id: "chrono-sk",    nom: "Chronopost",           logo: "chronopost.png",   pays: "France",  description: "SAV disponible, suivi rapide" },
      { id: "amazon-sk",    nom: "Amazon Logistics",     logo: "amazon.png",        pays: "USA",    description: "Remboursement immédiat si problème" },
      { id: "mondial-sk",   nom: "Mondial Relay",        logo: "mondial-relay.png", pays: "France", description: "Formulaire en ligne efficace" },
      { id: "gls-sk",       nom: "GLS",                  logo: "gls.png",           pays: "Europe", description: "Service client réactif" },
      { id: "inpost-sk",    nom: "InPost",               logo: "inpost.png",        pays: "Pologne", description: "App mobile, résolution rapide" },
      { id: "colprive-sk",  nom: "Colis Privé",          logo: "colis-prive.png",   pays: "France", description: "Équipe disponible & sympa" },
      { id: "tnt-sk",       nom: "TNT",                  logo: "tnt.png",           pays: "Europe", description: "Suivi réclamation en ligne" },
    ],
  },
];

export const VOTE_DEADLINE = new Date("2026-06-30T23:59:59");
export const ANNOUNCE_DATE = "10 juillet 2026";
