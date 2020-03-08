import { combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import reportedCaseReducer from "./reportedCaseReducer";

const rootReducer = combineReducers({
  form: formReducer,
  reportedCaseReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;