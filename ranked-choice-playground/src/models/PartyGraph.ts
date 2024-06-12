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

class PartyGraph {
  parties: Party[];

  constructor() {
    this.parties = [];
  }

  loadFromConfig(textData: string) {
    this.parties = [];
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
          party = new Party(id, data.name, data.color, data.fontColor, status);
          this.parties.push(party);
          store.dispatch(
            addParty({
              ...party.toPlainObject(),
              interactions: Array.from(party.interactions.entries()).reduce(
                (obj, [key, value]) => {
                  obj[key] = value;
                  return obj;
                },
                {} as { [key: string]: PartyInteraction }
              ),
            })
          );
        }
      }
    });
  }

  parseInteraction(line: string) {
    const parts = line.split("->");
    if (parts.length !== 2) return;

    const from = parts[0].trim();
    const [to, weight] = parts[1].trim().split(" ");
    const fromParty = this.getPartyById(from);
    if (fromParty) {
      fromParty.addInteraction(
        to.trim(),
        parseFloat(weight),
        line.includes("opposition")
      );
      store.dispatch(
        addInteraction({
          fromPartyId: from,
          toPartyId: to.trim(),
          weight: parseFloat(weight),
          opposition: line.includes("opposition"),
        })
      );
    }
  }

  getPartyById(id: string): Party | undefined {
    return this.parties.find((party) => party.id === id);
  }

  getColorById(id: string): string {
    return partyData[id]?.color || "#000000";
  }

  initializeInteractions() {
    this.parties.forEach((party) => {
      party.interactions.forEach((interaction) => {
        this.addInteraction(
          party.id,
          interaction.toPartyId,
          interaction.weight,
          interaction.opposition
        );
      });
    });
  }

  addInteraction(
    fromPartyId: string,
    toPartyId: string,
    weight: number,
    opposition: boolean = false
  ) {
    const fromParty = this.getPartyById(fromPartyId);
    if (fromParty) {
      fromParty.addInteraction(toPartyId, weight, opposition);
      store.dispatch(
        addInteraction({ fromPartyId, toPartyId, weight, opposition })
      );
    }
  }

  updateInteraction(
    fromPartyId: string,
    toPartyId: string,
    weight: number,
    opposition: boolean = false
  ) {
    const fromParty = this.getPartyById(fromPartyId);
    if (fromParty) {
      fromParty.addInteraction(toPartyId, weight, opposition);
      store.dispatch(
        updateInteraction({ fromPartyId, toPartyId, weight, opposition })
      );
    }
  }

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

  updatePartyStatus(partyId: string, status: PartyStatus) {
    const party = this.getPartyById(partyId);
    if (party) {
      party.status = status;
      store.dispatch(updatePartyStatus({ partyId, status }));
    }
  }

  adjustConnectivity(coalitionPotential: number) {
    this.parties.forEach((party) => {
      party.interactions.forEach((interaction) => {
        interaction.weight *= coalitionPotential;
        store.dispatch(
          updateInteraction({
            fromPartyId: party.id,
            toPartyId: interaction.toPartyId,
            weight: interaction.weight,
            opposition: interaction.opposition,
          })
        );
      });
    });
  }

  getParties() {
    return this.parties.filter((party) => party !== undefined);
  }

  updateParties(newParties: Party[]) {
    this.parties = newParties.filter((party) => party !== undefined);
    this.initializeInteractions();
  }
}

export { PartyGraph };
