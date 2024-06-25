export interface OutfitConfiguration {
  collarColor?: string;
  id: string;
  lapelColor: string;
  pocketSquareType: string;
  shirtColor: string;
  suitColor: string;
  tieType: string;
  accessoryColor?: string;
}

export interface ComplexionConfiguration {
  skinColor: string;
  hairColor: string;
  description: string; // Unused, but functions as a comment in the json file.
}