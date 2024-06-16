import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartyState, PartyStatus, PartyInteraction } from "../models/Party";

interface PartiesState {
  parties: PartyState[];
}

const initialState: PartiesState = {
  parties: [],
};

const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    addParty: (state, action: PayloadAction<PartyState>) => {
      state.parties.push(action.payload);
    },
    removeParty: (state, action: PayloadAction<string>) => {
      state.parties = state.parties.filter(
        (party) => party.id !== action.payload
      );
    },
    updatePartyStatus: (
      state,
      action: PayloadAction<{ partyId: string; status: PartyStatus }>
    ) => {
      const party = state.parties.find((p) => p.id === action.payload.partyId);
      if (party) {
        party.status = action.payload.status;
      }
    },
    addInteraction: (
      state,
      action: PayloadAction<{
        fromPartyId: string;
        toPartyId: string;
        weight: number;
        opposition: boolean;
      }>
    ) => {
      const fromParty = state.parties.find(
        (p) => p.id === action.payload.fromPartyId
      );
      if (fromParty) {
        fromParty.interactions[action.payload.toPartyId] = {
          toPartyId: action.payload.toPartyId,
          weight: action.payload.weight,
          opposition: action.payload.opposition,
        };
      }
    },
    updateInteraction: (
      state,
      action: PayloadAction<{
        fromPartyId: string;
        toPartyId: string;
        weight: number;
        opposition: boolean;
      }>
    ) => {
      const fromParty = state.parties.find(
        (p) => p.id === action.payload.fromPartyId
      );
      if (fromParty) {
        fromParty.interactions[action.payload.toPartyId] = {
          toPartyId: action.payload.toPartyId,
          weight: action.payload.weight,
          opposition: action.payload.opposition,
        };
      }
    },
    removeInteraction: (
      state,
      action: PayloadAction<{ fromPartyId: string; toPartyId: string }>
    ) => {
      const fromParty = state.parties.find(
        (p) => p.id === action.payload.fromPartyId
      );
      if (fromParty) {
        delete fromParty.interactions[action.payload.toPartyId];
      }
    },
    setPartyConfiguration: (state, action: PayloadAction<PartyState[]>) => {
      state.parties = action.payload;
    },
  },
});

export const {
  addParty,
  removeParty,
  updatePartyStatus,
  addInteraction,
  updateInteraction,
  removeInteraction,
  setPartyConfiguration,
} = partiesSlice.actions;

export default partiesSlice.reducer;
