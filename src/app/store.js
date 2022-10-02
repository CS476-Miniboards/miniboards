import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Models/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
