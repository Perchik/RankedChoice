import { configureStore } from "@reduxjs/toolkit";
import partiesReducer from "../slices/partiesSlice";
import electionReducer from "../slices/electionSlice";
import candidatesReducer from "../slices/candidatesSlice";
import votersReducer from "../slices/votersSlice";

const store = configureStore({
  reducer: {
    parties: partiesReducer,
    election: electionReducer,
    candidates: candidatesReducer,
    voters: votersReducer,
  },
  
  // Enable Redux DevTools Extension
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
