export class Party {
  name: string;
  color: string;
  type: "major" | "minor" | "fringe";
  interactions: PartyInteraction[];

  constructor(name: string, color: string, type: "major" | "minor" | "fringe") {
    this.name = name;
    this.color = color;
    this.type = type;
    this.interactions = [];
  }

  addInteraction(toParty: Party, weight: number, opposition: boolean = false) {
    this.interactions.push({ toParty, weight, opposition });
  }
}

interface PartyInteraction {
  toParty: Party;
  weight: number;
  opposition: boolean;
}
