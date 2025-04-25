import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTransSummary } from "./operations";

const initialState = {
  summary: [],
  isStatisticsLoading: false,
  isStatisticsError: null,
};

const statsSlice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getTransSummary.fulfilled, (state, action) => {
        state.isStatisticsLoading = false;
        state.summary = action.payload;
      })
      .addMatcher(isAnyOf(getTransSummary.pending), (state) => {
        state.isStatisticsLoading = true;
        state.isStatisticsError = null;
      })
      .addMatcher(isAnyOf(getTransSummary.rejected), (state, action) => {
        state.isStatisticsLoading = false;
        state.isStatisticsError = action.payload;
      }),
});

export const statsReducer = statsSlice.reducer;
