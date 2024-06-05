import { Party } from "./Party";
import { PartyStatus } from "../constants/PartyStatus";
import { parties as partyData } from "../constants/PartyData";

interface Interaction {
  from: string;
  to: string;
  weight: number;
  opposition?: boolean;
}

class PartyGraph {
  parties: Party[];
  interactions: Interaction[];

  constructor() {
    this.parties = [];
    this.interactions = [];
  }

  loadFromConfig(textData: string) {
    this.parties = [];
    this.interactions = [];
    const lines = textData
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    lines.forEach((line) => {
      if (line.startsWith("major:")) {
        this.parseParties(line, PartyStatus.Major);
      } else if (line.startsWith("minor:")) {
        this.parseParties(line, PartyStatus.Minor);
      } else if (line.startsWith("fringe:")) {
        this.parseParties(line, PartyStatus.Fringe);
      } else if (line.includes("->")) {
        this.parseInteraction(line);
      }
    });

    this.initializeInteractions();
  }

  parseParties(line: string, status: PartyStatus) {
    const parts = line.split(":");
    if (parts.length !== 2) return;

    const partyIds = parts[1].split(",").map((id) => id.trim());
    partyIds.forEach((id) => {
      let party = this.getPartyById(id);
      if (!party) {
        const data = partyData[id];
        if (data) {
          party = new Party(id, data.name, data.color, status);
          this.parties.push(party);
        }
      }
    });
  }

  parseInteraction(line: string) {
    const parts = line.split("->");
    if (parts.length !== 2) return;

    const from = parts[0].trim();
    const [to, weight] = parts[1].trim().split(" ");
    this.interactions.push({ from, to: to.trim(), weight: parseFloat(weight) });
  }

  getPartyById(id: string): Party | undefined {
    return this.parties.find((party) => party.id === id);
  }

  getColorById(id: string): string {
    return partyData[id]?.color || "#000000";
  }

  // Adds an interaction between two parties by their IDs
  addInteraction(
    fromPartyId: string,
    toPartyId: string,
    weight: number,
    opposition: boolean = false
  ) {
    const fromParty = this.parties.find((party) => party.id === fromPartyId);
    const toParty = this.parties.find((party) => party.id === toPartyId);
    if (fromParty && toParty) {
      fromParty.addInteraction(toParty, weight, opposition);
    }
  }

  // Initializes interactions based on loaded data
  initializeInteractions() {
    this.interactions.forEach((interaction) => {
      this.addInteraction(
        interaction.from,
        interaction.to,
        interaction.weight,
        interaction.opposition || false
      );
    });
  }

  // Returns the list of parties
  getParties() {
    return this.parties.filter((party) => party !== undefined);
  }

  // Adjusts the connectivity (coalition potential) between parties by modifying the weights of their interactions
  adjustConnectivity(coalitionPotential: number) {
    this.parties.forEach((party) => {
      party.interactions.forEach((interaction) => {
        interaction.weight = interaction.weight * coalitionPotential;
      });
    });
  }

  // Method to update the parties in the graph
  updateParties(newParties: Party[]) {
    this.parties = newParties.filter((party) => party !== undefined);
    this.initializeInteractions();
  }
}

export { PartyGraph };
