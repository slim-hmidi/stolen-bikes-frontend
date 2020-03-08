import { combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import bikesReducer from "./bikesReducer";

const rootReducer = combineReducers({
  form: formReducer,
  bikesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;