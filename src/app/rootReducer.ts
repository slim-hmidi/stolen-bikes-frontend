import { combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import reportedCasesReducer from "../features/reportedCases/reportedCasesSlice";
import resolvedCasesReducer from "../features/resolvedCases/resolvedCasesSlice";
import affectedCasesReducer from "../features/affectedCases/affectedCasesSlice";

const rootReducer = combineReducers({
  form: formReducer,
  reportedCases: reportedCasesReducer,
  resolvedCases: resolvedCasesReducer,
  affectedCases: affectedCasesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;