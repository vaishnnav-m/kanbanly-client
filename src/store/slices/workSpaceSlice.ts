import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function getInitialWorkspaceId() {
  if (typeof window !== undefined) {
    return localStorage.getItem("workspaceId") || "";
  }
  return "";
}

const workspaceId = getInitialWorkspaceId();
interface WorkspaceState {
  workspaceId: string;
}
const initialState: WorkspaceState = {
  workspaceId: workspaceId || "",
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceData: (
      state,
      action: PayloadAction<{ workspaceId: string }>
    ) => {
      state.workspaceId = action.payload.workspaceId;
    },
    removeWorkspaceData: (state) => {
      state.workspaceId = "";
    },
  },
});

export const { removeWorkspaceData, setWorkspaceData } = workspaceSlice.actions;
export default workspaceSlice.reducer;
