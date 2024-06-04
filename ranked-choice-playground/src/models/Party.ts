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

  constructor(id: string, name: string, color: string, status: PartyStatus) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.status = status;
    this.interactions = [];
  }

  addInteraction(toParty: Party, weight: number, opposition: boolean = false) {
    this.interactions.push({ toParty, weight, opposition });
  }
}
