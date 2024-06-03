export class Candidate {
  name: string;
  primaryParty: string;
  endorsements: string[]; // List of party endorsements. Currently unused.
  popularity: number;
  partyPopularity: number;

  constructor(
    name: string,
    primaryParty: string,
    endorsements: string[],
    popularity: number,
    partyPopularity: number
  ) {
    this.name = name;
    this.primaryParty = primaryParty;
    this.endorsements = endorsements;
    this.popularity = popularity;
    this.partyPopularity = partyPopularity;
  }
}
