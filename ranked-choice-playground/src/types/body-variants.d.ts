export type MensBodySVGConfiguration = {
  id: string;
  suitColor?: string;
  shirtColor?: string;
  lapelColor?: string;
  collarColor?: string;
  tieType?: "bowtie" | "tie";
  pocketSquareType?: "type1" | "type2" | "emptypocket" | "none";
  [k: string]: unknown;
};
