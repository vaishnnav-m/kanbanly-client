"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isEmailVerified: boolean;
  isAuthenticated: boolean;
  user: null | { firstName: string; lastName?: string; email: string };
}

const isEmailVerified = localStorage.getItem("isEmailVerified") === "true";
const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const initialState: AuthState = {
  isEmailVerified,
  isAuthenticated,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        user: { firstName: string; lastName?: string; email: string };
        isEmailVerified: boolean;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isEmailVerified = action.payload.isEmailVerified;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
