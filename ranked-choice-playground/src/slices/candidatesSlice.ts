import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Candidate } from "../models/Candidate";

interface CandidatesState {
  candidates: { [id: string]: any[] }; // Use `any` to indicate plain objects
}

const initialState: CandidatesState = {
  candidates: {},
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidate: (
      state,
      action: PayloadAction<{ partyId: string; candidate: any }>
    ) => {
      const { partyId, candidate } = action.payload;
      if (!state.candidates[partyId]) {
        state.candidates[partyId] = [];
      }
      state.candidates[partyId].push(candidate);
    },
    updateCandidate: (
      state,
      action: PayloadAction<{
        partyId: string;
        candidateIndex: number;
        candidate: any;
      }>
    ) => {
      const { partyId, candidateIndex, candidate } = action.payload;
      if (state.candidates[partyId]) {
        state.candidates[partyId][candidateIndex] = candidate;
      }
    },
    updateCandidateName: (
      state,
      action: PayloadAction<{
        partyId: string;
        candidateIndex: number;
        fullName: string;
        shortName: string;
      }>
    ) => {
      const { partyId, candidateIndex, fullName, shortName } = action.payload;
      if (state.candidates[partyId]) {
        const candidate = state.candidates[partyId][candidateIndex];
        candidate.fullName = fullName;
        candidate.shortName = shortName;
      }
    },
    removeCandidate: (
      state,
      action: PayloadAction<{ partyId: string; candidateIndex: number }>
    ) => {
      const { partyId, candidateIndex } = action.payload;
      if (state.candidates[partyId]) {
        state.candidates[partyId].splice(candidateIndex, 1);
      }
    },
  },
});

export const {
  addCandidate,
  updateCandidate,
  updateCandidateName,
  removeCandidate,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
