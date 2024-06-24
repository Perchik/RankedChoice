export interface OutfitConfiguration {
  id: string;
  suitColor: string;
  shirtColor: string;
  lapelColor: string;
  collarColor?: string;
  tieType: string;
  pocketSquareType: string;
}

export interface ComplexionColor {
  skinColor: string;
  hairColor: string;
  description: string; // Unused, but functions as a comment in the json file.
}

export interface HeadshotConfig {
  skinColor: string;
  hairColor: string;
  hairId: string;
  shirtColor: string;
  suitColor: string;
  lapelColor: string;
  collarColor?: string;
  tieType?: string;
  pocketSquareType?: string;
  outfitId?: string;
  accessoryColor: string;
}

export interface SetHeadshotConfig {
  (params: Partial<HeadshotConfig>): void;
}
