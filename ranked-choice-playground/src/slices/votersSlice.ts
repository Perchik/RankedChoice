import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Voter } from "../models/Voter";
interface VoterState {
  voters: Voter[];
}

const initialState: VoterState = {
  voters: [],
};

const votersSlice = createSlice({
  name: "voters",
  initialState,
  reducers: {
    addVoter(state, action: PayloadAction<Voter>) {
      state.voters.push(action.payload);
    },
    updateVoterPreferences(
      state,
      action: PayloadAction<{
        voterIndex: number;
        preferences: { [candidateName: string]: number };
      }>
    ) {
      const voter = state.voters[action.payload.voterIndex];
      if (voter) {
        voter.preferences = action.payload.preferences;
      }
    },
    setPreferredParty(
      state,
      action: PayloadAction<{ voterIndex: number; preferredParty: string }>
    ) {
      const voter = state.voters[action.payload.voterIndex];
      if (voter) {
        voter.preferredParty = action.payload.preferredParty;
      }
    },
  },
});

export const { addVoter, updateVoterPreferences, setPreferredParty } =
  votersSlice.actions;

export default votersSlice.reducer;
