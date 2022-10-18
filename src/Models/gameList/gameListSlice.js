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
      state.value = selectGameAsync;
    },
  },
});

export const { view } = gameListSlice.actions;

export const gameList = (state) => state.gameList.value;

export default gameListSlice.reducer;
