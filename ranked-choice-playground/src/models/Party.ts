import { Candidate } from "./Candidate";

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
  status: PartyStatus;
  candidates: Candidate[];
  interactions: { [key: string]: PartyInteraction };
}
