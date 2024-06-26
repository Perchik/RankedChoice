import { partyAlternateColors, partyColors } from "../constants/PartyData";
import { fetchRandomName } from "../services/nameService";
import { getRandomElement, getRandomInt } from "../utils/randomHelpers";

let candidateCounter = 1; // Simple counter to generate unique IDs

export class Candidate {
  id: number;
  fullName: string;
  shortName: string;
  partyId: string;
  popularity: number;
  inPartyPopularity: number;
  partyColor: string;
  personalColor: string;

  constructor(
    id: number,
    fullName: string,
    shortName: string,
    party: string,
    popularity: number,
    inPartyPopularity: number,
    partyColor: string,
    personalColor: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.shortName = shortName;
    this.partyId = party;
    this.popularity = popularity;
    this.inPartyPopularity = inPartyPopularity;
    this.partyColor = partyColor;
    this.personalColor = personalColor;
  }

  static generateFullName(
    title: string,
    firstName: string,
    lastName: string
  ): string {
    return `${title ? title + " " : ""}${firstName} ${lastName}`;
  }

  static generateShortName(party: string, lastName: string): string {
    return `${lastName} [${party.charAt(0).toUpperCase()}] `;
  }

  static async fromRandomComponents(partyId: string): Promise<Candidate> {
    try {
      const { title, firstName, lastName } = await fetchRandomName();
      const fullName = this.generateFullName(title, firstName, lastName);
      const shortName = this.generateShortName(partyId, lastName);
      const popularity = getRandomInt(0, 3);
      const inPartyPopularity = getRandomInt(0, 3);
      const partyColor = partyColors[partyId];
      const personalColor = getRandomElement(partyAlternateColors[partyId]);
      const id = candidateCounter++;
      return new Candidate(
        id,
        fullName,
        shortName,
        partyId,
        popularity,
        inPartyPopularity,
        partyColor,
        personalColor
      );
    } catch (error) {
      console.error("Error generating candidate:", error);
      throw new Error("Failed to generate candidate");
    }
  }
}
