import { createSlice } from "@reduxjs/toolkit";

const electionSlice = createSlice({
  name: "election",
  initialState: {
    details: "",
    numberOfSeats: 0,
  },
  reducers: {
    setElectionDetails: (state, action) => {
      state.details = action.payload;
    },
    setNumberOfSeats: (state, action) => {
      state.numberOfSeats = action.payload;
    },
  },
});

export const { setElectionDetails, setNumberOfSeats } = electionSlice.actions;
export default electionSlice.reducer;
