import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const currencySlice = createSlice({
  name: "currency",
  initialState,

  extraReducers: (builder) => builder,
});

export const currencyReducer = currencySlice.reducer;
