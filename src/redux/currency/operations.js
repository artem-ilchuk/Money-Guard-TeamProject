import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const CURRENCY_KEY = "currencyData";
const ONE_HOUR = 60 * 60 * 1000;

export const monoBankAPI = axios.create({
  baseURL: "https://api.monobank.ua/",
});

export const fetchCurrency = createAsyncThunk(
  "currency/fetchAll",
  async (_, thunkAPI) => {
    const cached = localStorage.getItem(CURRENCY_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.date < ONE_HOUR) {
        return parsed;
      }
    }

    try {
      const response = await axios.get(`${BASE_URL}/bank/currency`);
      const usd = response.data.find(
        (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
      );
      const eur = response.data.find(
        (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
      );

      const allData = {
        date: Date.now(),
        usd: { buy: usd.rateBuy.toFixed(2), sell: usd.rateSell.toFixed(2) },
        euro: { buy: eur.rateBuy.toFixed(2), sell: eur.rateSell.toFixed(2) },
      };

      localStorage.setItem(CURRENCY_KEY, JSON.stringify(allData));
      return allData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrency = createAsyncThunk(
  "currency/fetch",
  async (_, thunkAPI) => {
    try {
      const stored = getCurrencyFromStorage();
      if (stored) return stored;

      const updatedRate = await fetchCurrencyRate();
      saveCurrencyToStorage(updatedRate);
      return updatedRate;
    } catch (error) {
      console.log(error);

      // toast.error(
      //   "Unfortunately, we didn't receive the updated currency rate. Please try again."
      // );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
