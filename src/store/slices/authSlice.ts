"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { firstName: string; lastName?: string; email: string };
  role: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  role: "",
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
        role: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user ? action.payload.user : null;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = "";
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;
