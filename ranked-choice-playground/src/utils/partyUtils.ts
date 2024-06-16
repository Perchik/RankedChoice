import { PartyStatus, PartyState } from "../models/Party";
import { parties as partyData } from "../constants/PartyData";
import {
  addParty,
  removeParty,
  updatePartyStatus,
  addInteraction,
  setPartyConfiguration,
  updateInteraction,
  removeInteraction,
} from "../slices/partiesSlice";

export const addPartyToStore = (id: string, status: PartyStatus) => {
  const data = partyData[id];
  if (data) {
    const newParty: PartyState = {
      id,
      name: data.name,
      color: data.color,
      fontColor: data.fontColor,
      status,
      interactions: {},
      candidates: [],
    };
    return addParty(newParty);
  }
  throw new Error(`Party data not found for id: ${id}`);
};

export const setPartyConfigurationInStore = (parties: PartyState[]) => {
  return setPartyConfiguration(parties);
};

export const updatePartyStatusInStore = (
  partyId: string,
  status: PartyStatus
) => {
  return updatePartyStatus({ partyId, status });
};

export const removePartyFromStore = (partyId: string) => {
  return removeParty(partyId);
};

export const addInteractionToStore = (
  fromPartyId: string,
  toPartyId: string,
  weight: number,
  opposition: boolean = false
) => {
  return addInteraction({ fromPartyId, toPartyId, weight, opposition });
};

export const updateInteractionInStore = (
  fromPartyId: string,
  toPartyId: string,
  weight: number,
  opposition: boolean = false
) => {
  return updateInteraction({ fromPartyId, toPartyId, weight, opposition });
};

export const removeInteractionFromStore = (
  fromPartyId: string,
  toPartyId: string
) => {
  return removeInteraction({ fromPartyId, toPartyId });
};
