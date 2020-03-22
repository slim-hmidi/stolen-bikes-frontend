import { combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import reportedCaseReducer from "./reportedCases.reducers";
import officerCasesReducer from "./officerCases.reducers";

const rootReducer = combineReducers({
  form: formReducer,
  reportedCaseReducer,
  officerCasesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;