import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTransSummary } from "./operations";

const initialState = {
  categories: [],
  summary: { incomeSummary: 0, expenseSummary: 0 },
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

        const incomeItem = action.payload.find(
          (item) => item.category === "Income" || !item.category
        );

        const expenses = action.payload.filter(
          (item) => item.category && item.category !== "Income"
        );

        state.categories = expenses;
        state.summary = {
          incomeSummary: incomeItem?.total || 0,
          expenseSummary: expenses.reduce((sum, item) => sum + item.total, 0),
        };
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
