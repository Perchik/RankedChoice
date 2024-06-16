import { configureStore } from "@reduxjs/toolkit";
import partiesReducer from "../slices/partiesSlice";
import electionReducer from "../slices/electionSlice";
import candidatesReducer from "../slices/candidatesSlice";

const store = configureStore({
  reducer: {
    parties: partiesReducer,
    election: electionReducer,
    candidates: candidatesReducer,
  },
  // Enable Redux DevTools Extension
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
