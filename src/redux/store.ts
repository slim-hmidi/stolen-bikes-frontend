import { configureStore, Action } from "@reduxjs/toolkit";
import rootReducer, { AppState } from "./reducers/rootReducer";
import { ThunkAction } from 'redux-thunk'

const store = configureStore({ reducer: rootReducer })

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const newRootReducer = require('./reducers/rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>

export default store;