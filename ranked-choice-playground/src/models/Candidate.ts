import { fetchRandomName } from "../services/nameService";

export class Candidate {
  fullName: string;
  shortName: string;
  popularity: number;
  inPartyPopularity: number;
  color: string;

  constructor(
    fullName: string,
    shortName: string,
    popularity: number,
    inPartyPopularity: number,
    color: string
  ) {
    this.fullName = fullName;
    this.shortName = shortName;
    this.popularity = popularity;
    this.inPartyPopularity = inPartyPopularity;
    this.color = color;
  }

  static generateFullName(
    title: string,
    firstName: string,
    lastName: string,
    suffix?: string
  ): string {
    return `${title ? title + " " : ""}${firstName} ${lastName}${
      suffix ? ", " + suffix : ""
    }`;
  }

  static generateShortName(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}. ${lastName}`;
  }

  static async fromRandomComponents(color: string): Promise<Candidate> {
    const { title, firstName, lastName, suffix } = await fetchRandomName();
    const fullName = Candidate.generateFullName(
      title,
      firstName,
      lastName,
      suffix
    );
    const shortName = Candidate.generateShortName(firstName, lastName);
    const popularity = Math.floor(Math.random() * 5) + 1; // Generate random popularity between 1 and 5
    const inPartyPopularity = Math.floor(Math.random() * 5) + 1; // Generate random in-party popularity between 1 and 5

    return new Candidate(
      fullName,
      shortName,
      popularity,
      inPartyPopularity,
      color
    );
  }
}
