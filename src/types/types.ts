export interface Article {
  code: string;
  designation: string;
  prix: number;
  unite: string;
}

export interface LigneDevis {
  article: Article;
  quantite: number;
  montant: number;
  ot?: string;
}

export interface OTGroup {
  code: string;
  nom: string;
  lignes: LigneDevis[];
  sousTotal: number;
}

export const typeDevis = [
  "",
  "ALIMENTATION FORFAITAIRE EN AERIEN",
  "ALIMENTATION FORFAITAIRE EN S/T",
  "DEPLACEMENT COMPTEUR AVEC REPRISE DESCENTE / FORFAITAIRE",
  "DEPLACEMENT COMPTEUR SANS REPRISE DESCENTE / FORFAITAIRE",
  "DEPLACEMENT RESEAU ELECTRIQUE NON FORFAITAIRE",
  "REMISE EN ETAT BRANCHEMENT",
  "AUG DE PUISSANCE NON FORFAITAIRE",
  "AUG DE PUISSANCE FORFAITAIRE",
  "PASSAGE MONO -TRIPHASE"
] as const;

export const otTypes = [
  { code: "8536", nom: "BRANCHEMENT AÉRIEN" },
  { code: "8537", nom: "BRANCHEMENT S/T" },
  { code: "8931", nom: "DEMOLITION RESEAU BT" },
  { code: "8530", nom: "CST RÉSEAU BT AÉRIEN" },
  { code: "8531", nom: "CST RÉSEAU BT S/T" },
  { code: "4612", nom: "ENTRETIEN RÉSEAU BT" },
  { code: "4611", nom: "ENTRETIEN RÉSEAU HTA" },
  { code: "8233", nom: "POSTE DE DISTRIBUTION G CIVIL" },
  { code: "8430", nom: "RÉSEAU HTA AÉRIEN" },
  { code: "8431", nom: "RÉSEAU HTA S/T" },
  { code: "8433", nom: "ÉQUIPEMENT POSTE DE DISTRIBUTION" },
  { code: "8933", nom: "DEMOLITION POSTE DE DISTRIBUTION" },
  { code: "8934", nom: "RECUPERATION" },
  { code: "8936", nom: "DEMOLUTION BRANCHEMENT" },
  { code: "8930", nom: "DEMOLITION RESEAU HTA" }
] as const;