"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { firstName: string; lastName?: string; email: string };
}

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

const initialState: AuthState = {
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
        user?: { firstName: string; lastName?: string; email: string };
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user ? action.payload.user : null;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;
