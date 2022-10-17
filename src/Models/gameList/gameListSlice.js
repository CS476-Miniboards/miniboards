import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGameList } from "./gameListAPI";

const initialState = {
  list: [],
};

export const selectGameAsync = createAsyncThunk(
  "gameList/fetchGameList",
  async () => {
    const response = await fetchGameList();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const gameListSlice = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    view: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = selectGameAsync;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const gameList = (state) => state.gameList.value;

export default gameListSlice.reducer;
