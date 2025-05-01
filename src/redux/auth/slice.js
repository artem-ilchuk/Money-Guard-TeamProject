import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
  editUserName,
  editUserAvatar,
  getTotalBalanceThunk,
  resetPassword,
  changePassword
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
  isRegistering: false,
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
        state.user.balance = action.payload;
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
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetEmailSent = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.resetEmailSent = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordChanged = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordChanged = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
          state.isRegistering = false;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending),
        (state) => {
          state.isAuthLoading = true;
          state.isAuthError = null;
          state.isRegistering = true;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, action) => {
          state.isAuthLoading = false;
          state.isAuthError = action.payload;
          state.isRegistering = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
export const { updateBalance, setAvatarPreview, clearAvatarPreview } =
  authSlice.actions;
