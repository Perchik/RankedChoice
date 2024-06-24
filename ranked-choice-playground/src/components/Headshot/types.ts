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
