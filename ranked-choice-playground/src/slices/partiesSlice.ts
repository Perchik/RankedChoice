import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartyStatus, PartyInteraction } from "../models/Party";

interface PartyState {
  id: string;
  name: string;
  color: string;
  fontColor: string;
  status: PartyStatus;
  interactions: { [key: string]: PartyInteraction };
}

interface PartySliceState {
  parties: PartyState[];
}

const initialState: PartySliceState = {
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
  },
});

export const {
  addParty,
  removeParty,
  updatePartyStatus,
  addInteraction,
  updateInteraction,
  removeInteraction,
} = partiesSlice.actions;

export default partiesSlice.reducer;
