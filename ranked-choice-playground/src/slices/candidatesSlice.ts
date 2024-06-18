import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Candidate } from "../models/Candidate";

interface CandidatesState {
  candidates: { [partyId: string]: Candidate[] };
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
      action: PayloadAction<{ partyId: string; candidate: Candidate }>
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
        candidate: Candidate;
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
      action: PayloadAction<{ partyId: string; candidateId: number }>
    ) => {
      const { partyId, candidateId } = action.payload;
      if (state.candidates[partyId]) {
        state.candidates[partyId] = state.candidates[partyId].filter(
          (candidate) => candidate.id !== candidateId
        );
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
