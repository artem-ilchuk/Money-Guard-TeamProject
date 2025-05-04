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
      const { data } = await moneyGuardAPI.post("/transactions", body);
      thunkAPI.dispatch(getTotalBalanceThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, transaction }, thunkAPI) => {
    try {
      const { date, type, category, comment, sum } = transaction;
      const { data } = await moneyGuardAPI.patch(`/transactions/${id}`, {
        date,
        type,
        category,
        comment,
        sum,
      });
      thunkAPI.dispatch(getTotalBalanceThunk());
      
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
      thunkAPI.dispatch(getTotalBalanceThunk());
      toast.success("Transaction deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Failed to delete transaction: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const copyTransaction = createAsyncThunk(
  "transactions/copyTransaction",
  async (id, thunkAPI) => {
    try {
      const { data: originalTransaction } = await moneyGuardAPI.get(
        `/transactions/${id}`
      );
      const original = originalTransaction.data;
      const transactionCopy = {
        date: original.date,
        type: original.type,
        category: original.category,
        comment: original.comment,
        sum: original.sum,
      };
      const { data } = await moneyGuardAPI.post(
        "/transactions",
        transactionCopy
      );
			thunkAPI.dispatch(getTotalBalanceThunk());
			toast.success("Transaction successfully repeated!");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
