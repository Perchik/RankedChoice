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
    return `${title ? title + " " : ""}${firstName} ${lastName}${suffix ? ", " + suffix : ""}`;
  }

  static generateShortName(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}. ${lastName}`;
  }

  static fromNameComponents(
    title: string,
    firstName: string,
    lastName: string,
    popularity: number,
    inPartyPopularity: number,
    color: string,
    suffix?: string
  ): Candidate {
    const fullName = Candidate.generateFullName(
      title,
      firstName,
      lastName,
      suffix
    );
    const shortName = Candidate.generateShortName(firstName, lastName);
    return new Candidate(
      fullName,
      shortName,
      popularity,
      inPartyPopularity,
      color
    );
  }
}
