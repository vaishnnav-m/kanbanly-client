"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdminAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        isAuthenticated?: boolean;
        isAdminAuthenticated?: boolean;
      }>
    ) => {
      if (action.payload.isAdminAuthenticated) {
        state.isAdminAuthenticated = true;
      }
      if (action.payload.isAuthenticated) {
        state.isAuthenticated = true;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
    logoutAdmin: (state) => {
      state.isAdminAuthenticated = false;
    },
  },
});

export const { setCredentials, logoutUser, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
