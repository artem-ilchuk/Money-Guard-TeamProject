import { createAsyncThunk } from "@reduxjs/toolkit";
import { moneyGuardAPI, setAuthHeader } from "../auth/operations";

export const getTransSummary = createAsyncThunk(
  "transactions/summary",
  async ({ month, year }, thunkApi) => {
    const storedToken = thunkApi.getState().auth.token;
    if (storedToken) {
      setAuthHeader(storedToken);
    } else {
      return thunkApi.rejectWithValue(
        "Something went wrong. Please try again."
      );
    }
    try {
      const { data } = await moneyGuardAPI.get(`/home?date=${date}`);
      return data.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTransCategories = createAsyncThunk(
  "transactions/categories",
  async (_, thunkApi) => {
    try {
      const { data } = await moneyGuardAPI.get("/home-categories");
      return data.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
