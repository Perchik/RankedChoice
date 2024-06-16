export enum PartyStatus {
  Major = 1,
  Minor = 2,
  Fringe = 3,
  Independent = 4,
}

export interface PartyInteraction {
  toPartyId: string;
  weight: number;
  opposition: boolean;
}

export interface PartyState {
  id: string;
  name: string;
  color: string;
  fontColor: string;
  status: PartyStatus;
  interactions: { [key: string]: PartyInteraction };
}
