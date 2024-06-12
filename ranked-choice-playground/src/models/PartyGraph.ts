import { Party, PartyStatus, PartyInteraction } from "./Party";
import { parties as partyData } from "../constants/PartyData";
import store from "../store/index";
import {
  addParty,
  removeParty,
  updatePartyStatus,
  addInteraction,
  updateInteraction,
  removeInteraction,
} from "../slices/partiesSlice";
import { parseConfig } from "../utils/partyGraphParser";

class PartyGraph {
  parties: Party[];

  constructor() {
    this.parties = [];
  }

  // Load configuration from a text string
  loadFromConfig(textData: string) {
    this.parties = [];
    parseConfig(textData, this);
  }

  // Add a party to the graph and dispatch to Redux
  addParty(id: string, status: PartyStatus) {
    let party = this.getPartyById(id);
    if (!party) {
      const data = partyData[id];
      if (data) {
        party = new Party(id, data.name, data.color, data.fontColor, status);
        this.parties.push(party);
        store.dispatch(
          addParty({
            ...party.toPlainObject(),
            interactions: this.convertMapToObject(party.interactions),
          })
        );
      }
    }
  }

  // Update the status of a party
  updatePartyStatus(partyId: string, status: PartyStatus) {
    const party = this.getPartyById(partyId);
    if (party) {
      party.status = status;
      store.dispatch(updatePartyStatus({ partyId, status }));
    }
  }

  // Remove a party and its interactions
  removeParty(partyId: string) {
    this.parties = this.parties.filter((party) => party.id !== partyId);

    // Remove any interactions involving the removed party
    this.parties.forEach((party) => {
      const interactions = party.interactions;
      if (interactions.get(partyId)) {
        interactions.delete(partyId);
        store.dispatch(
          removeInteraction({ fromPartyId: party.id, toPartyId: partyId })
        );
      }
    });

    store.dispatch(removeParty(partyId));
  }

  // Get a party by ID
  getPartyById(id: string): Party | undefined {
    return this.parties.find((party) => party.id === id);
  }

  // Add an interaction between parties
  addInteraction(
    fromPartyId: string,
    toPartyId: string,
    weight: number,
    opposition: boolean = false
  ) {
    if (fromPartyId === toPartyId) return; // Prevent self-interaction

    const fromParty = this.getPartyById(fromPartyId);
    if (fromParty) {
      fromParty.addInteraction(toPartyId, weight, opposition);
      store.dispatch(
        addInteraction({ fromPartyId, toPartyId, weight, opposition })
      );
    }
  }

  // Update an interaction between parties
  updateInteraction(
    fromPartyId: string,
    toPartyId: string,
    weight: number,
    opposition: boolean = false
  ) {
    if (fromPartyId === toPartyId) return; // Prevent self-interaction

    const fromParty = this.getPartyById(fromPartyId);
    if (fromParty) {
      fromParty.addInteraction(toPartyId, weight, opposition);
      store.dispatch(
        updateInteraction({ fromPartyId, toPartyId, weight, opposition })
      );
    }
  }

  // Remove an interaction between parties
  removeInteraction(fromPartyId: string, toPartyId: string) {
    const fromParty = this.getPartyById(fromPartyId);
    if (fromParty && fromParty.interactions.get(toPartyId)) {
      fromParty.interactions.delete(toPartyId);
      store.dispatch(removeInteraction({ fromPartyId, toPartyId }));
    }
  }

  // Check if an interaction exists between parties
  hasInteraction(fromPartyId: string, toPartyId: string): boolean {
    const fromParty = this.getPartyById(fromPartyId);
    return fromParty ? fromParty.interactions.has(toPartyId) : false;
  }

  // Get color by party ID
  getColorById(id: string): string {
    return partyData[id]?.color || "#000000";
  }

  // Convert Map to Object
  private convertMapToObject(map: Map<string, PartyInteraction>): {
    [key: string]: PartyInteraction;
  } {
    return Array.from(map.entries()).reduce(
      (obj, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {} as { [key: string]: PartyInteraction }
    );
  }

  // Get all parties
  getParties() {
    return this.parties.filter((party) => party !== undefined);
  }

  // Update the parties in the graph
  updateParties(newParties: Party[]) {
    this.parties = newParties.filter((party) => party !== undefined);
  }
}

export { PartyGraph };
