import { createSlice } from "@reduxjs/toolkit";

const electionSlice = createSlice({
  name: "election",
  initialState: {
    title: "",
    numberOfSeats: 0,
  },
  reducers: {
    setElectionTitle: (state, action) => {
      state.title = action.payload;
    },
    setNumberOfSeats: (state, action) => {
      state.numberOfSeats = action.payload;
    },
  },
});

export const { setElectionTitle, setNumberOfSeats } = electionSlice.actions;
export default electionSlice.reducer;
