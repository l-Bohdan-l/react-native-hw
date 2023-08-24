import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import logger from "redux-logger";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const middlewares = [logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
