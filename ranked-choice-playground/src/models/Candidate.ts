export class Candidate {
  title: string;
  firstName: string;
  lastName: string;
  party: string;
  popularity: number;
  inPartyPopularity: number;
  color: string;

  constructor(
    title: string = "",
    firstName: string,
    lastName: string,
    party: string,
    popularity: number,
    inPartyPopularity: number,
    color: string
  ) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.party = party;
    this.popularity = popularity;
    this.inPartyPopularity = inPartyPopularity;
    this.color = color;
  }

  getFullName(): string {
    return `${this.title ? this.title + " " : ""}${this.firstName} ${this.lastName}`;
  }
}
