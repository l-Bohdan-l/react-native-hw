import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { authSlice } from "./auth/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const middlewares = [logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
