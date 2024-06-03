import { Party } from "./Party";
import { Voter } from "./Voter";
import { partyIds, parties } from "../constants/PartyData";
import * as fs from "fs";
import { Graph } from "graphlib";
import { parse } from "graphlib-dot";

interface Edge {
  v: string; // ID of the source node
  w: string; // ID of the target node
}

interface EdgeAttributes {
  weight: number;
  opposition?: boolean;
}

class PartyGraph {
  parties: Party[];

  constructor() {
    this.parties = [];
    this.initializeParties();
  }

  // Initializes the parties using the data from partyData.ts
  initializeParties() {
    this.parties = partyIds.map((id) => {
      const partyData = parties[id];
      return new Party(id, partyData.name, partyData.color, partyData.ordinal);
    });
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

  // Adjusts the connectivity (coalition potential) between parties by modifying the weights of their interactions.
  // Higher coalition potential increases the weights, indicating stronger alliances between parties.
  adjustConnectivity(coalitionPotential: number) {
    this.parties.forEach((party) => {
      party.interactions.forEach((interaction) => {
        if (!interaction.opposition) {
          interaction.weight = interaction.weight * coalitionPotential;
        }
      });
    });
  }

  // Returns the list of parties
  getParties() {
    return this.parties;
  }

  // Calculates the election results based on the voters' preferences
  calculateResults(voters: Voter[]): { [partyName: string]: number } {
    const results: { [partyName: string]: number } = {};
    this.parties.forEach((party) => {
      results[party.name] = 0;
    });

    voters.forEach((voter) => {
      const preferredParty = voter.getPreferredParty();
      if (preferredParty) {
        results[preferredParty] += 1;
      }
    });

    return results;
  }

  // Loads the party interactions from a DOT file
  loadFromDot(filePath: string) {
    const dotData = fs.readFileSync(filePath, "utf-8");
    const g = parse(dotData) as Graph;

    g.edges().forEach((edge: Edge) => {
      const fromPartyId = g.node(edge.v).id;
      const toPartyId = g.node(edge.w).id;
      const edgeAttributes = g.edge(edge) as EdgeAttributes;
      const weight = edgeAttributes.weight;
      const opposition = edgeAttributes.opposition || false;
      this.addInteraction(fromPartyId, toPartyId, weight, opposition);
    });
  }
}

export { PartyGraph };
