import { PartyStatus } from "../constants/PartyStatus";

interface PartyInteraction {
  toParty: Party;
  weight: number;
  opposition: boolean;
}

export class Party {
  id: string;
  name: string;
  color: string;
  status: PartyStatus;
  interactions: PartyInteraction[];

  constructor(id: string, name: string, color: string, ordinal: number) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.status = this.getStatusFromOrdinal(ordinal);
    this.interactions = [];
  }

  addInteraction(toParty: Party, weight: number, opposition: boolean = false) {
    this.interactions.push({ toParty, weight, opposition });
  }

  private getStatusFromOrdinal(ordinal: number): PartyStatus {
    switch (ordinal) {
      case 1:
        return PartyStatus.Major;
      case 2:
        return PartyStatus.Minor;
      case 3:
        return PartyStatus.Fringe;
      default:
        return PartyStatus.Independent;
    }
  }
}
