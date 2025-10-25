"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  profile?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdminAuthenticated: false,
  profile: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
      if (action.payload.isAdminAuthenticated) {
        state.isAdminAuthenticated = true;
      }
      if (action.payload.isAuthenticated) {
        state.isAuthenticated = true;
      }
      if (action.payload.profile) {
        state.profile = action.payload.profile;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.profile = "";
    },
    logoutAdmin: (state) => {
      state.isAdminAuthenticated = false;
      state.profile = "";
    },
  },
});

export const { setCredentials, logoutUser, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
