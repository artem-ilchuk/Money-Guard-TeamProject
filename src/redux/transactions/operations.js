import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { moneyGuardAPI, getTotalBalanceThunk } from "../auth/operations";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await moneyGuardAPI.get("/home");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (body, thunkAPI) => {
    try {
      const { data } = await moneyGuardAPI.post(`/home`, body);
      thunkAPI.dispatch(getTotalBalanceThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, date, type, category, comment, sum }, thunkAPI) => {
    try {
      const { data } = await moneyGuardAPI.patch(`/home/${id}`, {
        date,
        type,
        category,
        comment,
        sum,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      await moneyGuardAPI.delete(`/home/${id}`);
      const { data } = await moneyGuardAPI.get("/home");
      toast.success("Transaction deleted successfully!");
      return data;
    } catch (error) {
      toast.error(`Failed to delete transaction: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
