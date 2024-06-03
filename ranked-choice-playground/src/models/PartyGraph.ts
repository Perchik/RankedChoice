import { Party } from "./Party";
class PartyGraph {
  parties: Party[];

  constructor() {
    this.parties = [];
  }

  getParties() {
    return this.parties;
  }
}

export { PartyGraph };
