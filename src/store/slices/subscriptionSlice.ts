import { Subscription } from "@/lib/api/subscription/subscription.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Subscription = {
  planName: "",
  currentPeriodEnd: null,
  limits: {
    members: "",
    projects: "",
    tasks: "",
    workspaces: "",
  },
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<Subscription>) => {
      state.planName = action.payload.planName;
      state.currentPeriodEnd = action.payload.currentPeriodEnd;
      state.limits = action.payload.limits;
    },
    removeSubscription: (state) => {
      state.planName = "";
      state.currentPeriodEnd = null;
      state.limits.members = "";
      state.limits.projects = "";
      state.limits.tasks = "";
      state.limits.workspaces = "";
    },
  },
});

export const { setSubscription, removeSubscription } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
