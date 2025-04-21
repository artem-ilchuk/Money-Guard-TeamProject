import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const monoBankAPI = axios.create({
  baseURL: "https://api.monobank.ua/",
});

export const fetchCurrencyRate = async () => {
  const { data } = await monoBankAPI.get("/bank/currency");
  const usd = data;
};
