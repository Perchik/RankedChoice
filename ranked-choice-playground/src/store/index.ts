import { configureStore } from "@reduxjs/toolkit";
import partiesReducer from "../slices/partiesSlice";
import electionReducer from "../slices/electionSlice";

const store = configureStore({
  reducer: {
    parties: partiesReducer,
    election: electionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
