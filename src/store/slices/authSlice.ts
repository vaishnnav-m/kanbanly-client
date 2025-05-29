"use client"
import { getAuthToken } from "@/lib/utils/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  isAuthenticated: boolean;
  user: null | { id: string; name: string };
}

const token = getAuthToken();

const initialState: AuthState = {
  token: token || "",
  isAuthenticated: !!token,
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
        user: { id: string; name: string };
        token: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
