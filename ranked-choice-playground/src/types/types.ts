export interface Politician {
  firstName: string;
  lastName: string;
  majorParty: string;
  minorParty?: string;
  popularity: number;
  photoSvg: string; // Updated field name
}
