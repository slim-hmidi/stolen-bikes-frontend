import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form"

const store = configureStore({
  reducer: formReducer
})

export default store;