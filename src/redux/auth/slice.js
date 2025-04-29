import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
  editUserName,
  editUserAvatar,
  getTotalBalanceThunk,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    balance: null,
    avatar: null,
  },
  preview: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  isAuthError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.user.balance = action.payload;
    },
    setAvatarPreview: (state, action) => {
      state.preview = action.payload;
    },
    clearAvatarPreview: (state) => {
      state.preview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(getTotalBalanceThunk.fulfilled, (state, action) => {
        state.user.balance = action.payload.balance;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isAuthLoading = true;
        state.isLoggedIn = true;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isAuthLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(editUserName.fulfilled, (state, action) => {
        state.user.name = action.payload.data.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(editUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload.data.avatar;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, action) => {
          state.user.name = action.payload.data.user.name;
          state.user.email = action.payload.data.user.email;
          state.user.balance = action.payload.data.user.balance;
          state.user.avatar = action.payload.data.user.avatar;
          state.token = action.payload.data.accessToken;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending),
        (state) => {
          state.isAuthLoading = true;
          state.isAuthError = null;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, action) => {
          state.isAuthLoading = false;
          state.isAuthError = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
export const { updateBalance, setAvatarPreview, clearAvatarPreview } =
  authSlice.actions;
