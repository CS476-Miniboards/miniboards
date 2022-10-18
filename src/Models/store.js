import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameListReducer from "./gameList/gameListSlice";

const reducers = combineReducers({
  gameList: gameListReducer,
});

export const store = configureStore({
  reducer: reducers,
});
