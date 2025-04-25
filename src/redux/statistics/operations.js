import { createAsyncThunk } from "@reduxjs/toolkit";
import { moneyGuardAPI, setAuthHeader } from "../auth/operations";

export const getTransSummary = createAsyncThunk(
  "transactions/summary",
  async ({ month, year }, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    if (!token) return thunkApi.rejectWithValue("No token");

    setAuthHeader(token);
    const date = `${month}-${year}`;

    try {
      const { data } = await moneyGuardAPI.get(`/summary?date=${date}`);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTransCategories = createAsyncThunk(
  "transactions/categories",
  async (filter, thunkApi) => {
    try {
      const { data } = await moneyGuardAPI.get(`/summary?date${filter}`);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
