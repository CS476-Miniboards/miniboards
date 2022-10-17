import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import gameListReducer from "./gameList/gameListSlice";

const reducers = combineReducers({
  counter: counterReducer,
  gameList: gameListReducer,
});

export const store = configureStore({
  reducer: reducers,
});
