import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTransSummary, getTransCategories } from "./operations";

const initialState = {
  summary: [],
  categories: [],
  isStatisticsLoading: false,
  isStatisticsError: null,
};

const statsSlice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getTransSummary.fulfilled, (state, action) => {
        state.isStatisticsLoading = false;
        state.summary = action.payload;
      })
      .addCase(getTransCategories.fulfilled, (state, action) => {
        state.isStatisticsLoading = false;
        state.categories = action.payload;
      })
      .addMatcher(
        isAnyOf(getTransSummary.rejected, getTransCategories.rejected),
        (state, action) => {
          state.isStatisticsLoading = false;
          state.isStatisticsError = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(getTransSummary.pending, getTransCategories.pending),
        (state) => {
          state.isStatisticsLoading = true;
          state.isStatisticsError = null;
        }
      );
  },
});

export const statsReducer = statsSlice.reducer;
