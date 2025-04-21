import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const slice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) => builder,
});

export const statsReducer = slice.reducer;
