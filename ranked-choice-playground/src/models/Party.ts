interface PartyInteraction {
  toParty: Party;
  weight: number;
  opposition: boolean;
}

export class Party {
  id: string;
  name: string;
  color: string;
  status: "major" | "minor" | "fringe";
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

  private getStatusFromOrdinal(ordinal: number): "major" | "minor" | "fringe" {
    switch (ordinal) {
      case 1:
        return "major";
      case 2:
        return "minor";
      case 3:
        return "fringe";
      default:
        return "fringe";
    }
  }
}
