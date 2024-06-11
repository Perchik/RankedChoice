export enum PartyStatus {
  Major = 1,
  Minor = 2,
  Fringe = 3,
  Independent = 4,
}

export interface PartyInteraction {
  toParty: Party;
  weight: number;
  opposition: boolean;
}

export class Party {
  id: string;
  name: string;
  color: string;
  fontColor: string;
  status: PartyStatus;
  interactions: PartyInteraction[];

  constructor(
    id: string,
    name: string,
    color: string,
    fontColor: string,
    status: PartyStatus
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.fontColor = fontColor;
    this.status = status;
    this.interactions = [];
  }

  addInteraction(toParty: Party, weight: number, opposition: boolean = false) {
    this.interactions.push({ toParty, weight, opposition });
  }
}
