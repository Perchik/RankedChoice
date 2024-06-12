export interface PartyInteraction {
  toPartyId: string;
  weight: number;
  opposition: boolean;
}

export enum PartyStatus {
  Major = 1,
  Minor = 2,
  Fringe = 3,
  Independent = 4,
}

export class Party {
  id: string;
  name: string;
  color: string;
  fontColor: string;
  status: PartyStatus;
  interactions: Map<string, PartyInteraction>;

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
    this.interactions = new Map<string, PartyInteraction>();
  }

  addInteraction(
    toPartyId: string,
    weight: number,
    opposition: boolean = false
  ) {
    this.interactions.set(toPartyId, { toPartyId, weight, opposition });
  }

  removeInteraction(toPartyId: string) {
    this.interactions.delete(toPartyId);
  }

  // Convert Party instance to plain object
  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      fontColor: this.fontColor,
      status: this.status,
      interactions: Array.from(this.interactions.entries()).reduce(
        (obj, [key, value]) => {
          obj[key] = value;
          return obj;
        },
        {} as { [key: string]: PartyInteraction }
      ),
    };
  }

  // Create Party instance from plain object
  static fromPlainObject(obj: any) {
    const party = new Party(
      obj.id,
      obj.name,
      obj.color,
      obj.fontColor,
      obj.status
    );
    party.interactions = new Map<string, PartyInteraction>(
      Object.entries(obj.interactions)
    );
    return party;
  }
}
