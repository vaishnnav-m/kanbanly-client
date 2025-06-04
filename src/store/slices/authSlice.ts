"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isEmailVerified: boolean;
  isAuthenticated: boolean;
  user: null | { id?: string; name: string; email: string };
}

const initialState: AuthState = {
  isEmailVerified: false,
  isAuthenticated: false,
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
        user: { id: string; name: string; email: string };
        token: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
