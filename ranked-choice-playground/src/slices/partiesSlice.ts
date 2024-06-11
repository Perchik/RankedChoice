import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Party, PartyInteraction } from "../models/Party";
import { PartyStatus } from "../models/Party";

interface PartyState {
  parties: Party[];
}

const initialState: PartyState = {
  parties: [],
};

const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    addParty: (state, action: PayloadAction<Party>) => {
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
      const toParty = state.parties.find(
        (p) => p.id === action.payload.toPartyId
      );
      if (fromParty && toParty) {
        fromParty.addInteraction(
          toParty,
          action.payload.weight,
          action.payload.opposition
        );
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
      const party = state.parties.find(
        (p) => p.id === action.payload.fromPartyId
      );
      if (party) {
        const interaction = party.interactions.find(
          (i) => i.toParty.id === action.payload.toPartyId
        );
        if (interaction) {
          interaction.weight = action.payload.weight;
          interaction.opposition = action.payload.opposition;
        }
      }
    },
    removeInteraction: (
      state,
      action: PayloadAction<{ fromPartyId: string; toPartyId: string }>
    ) => {
      const party = state.parties.find(
        (p) => p.id === action.payload.fromPartyId
      );
      if (party) {
        party.interactions = party.interactions.filter(
          (i) => i.toParty.id !== action.payload.toPartyId
        );
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
