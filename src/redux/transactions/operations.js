import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { moneyGuardAPI, getTotalBalanceThunk } from "../auth/operations";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await moneyGuardAPI.get("/transactions");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (body, thunkAPI) => {
    try {
      const { data } = await moneyGuardAPI.post(`/transactions`, body);
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
      const { data } = await moneyGuardAPI.patch(`/transactions/${id}`, {
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
      await moneyGuardAPI.delete(`/transactions/${id}`);
      toast.success("Transaction deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Failed to delete transaction: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
