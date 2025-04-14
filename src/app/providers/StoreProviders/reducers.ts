import { combineReducers } from "redux";
import { authSlice } from "@/entities";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
