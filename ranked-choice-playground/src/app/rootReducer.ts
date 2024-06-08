import { combineReducers } from "@reduxjs/toolkit";
import electionReducer from "../features/electionSlice";

const rootReducer = combineReducers({
  election: electionReducer,
  // Add other reducers here
});

export default rootReducer;
