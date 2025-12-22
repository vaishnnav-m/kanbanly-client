import { IWorkspacePermissions } from "@/lib/api/workspace/workspace.types";
import { getStorageItem } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const workspaceId = getStorageItem("workspaceId") || "";
interface WorkspaceState {
  workspaceId: string;
  memberRole: string;
  permissions: IWorkspacePermissions | null;
}
const initialState: WorkspaceState = {
  workspaceId: workspaceId || "",
  memberRole: "",
  permissions: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceData: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        memberRole?: string;
        permissions?: IWorkspacePermissions;
      }>
    ) => {
      state.workspaceId = action.payload.workspaceId;
      state.memberRole = action.payload?.memberRole
        ? action.payload.memberRole
        : "";
      state.permissions = action.payload.permissions
        ? action.payload.permissions
        : null;
    },
    removeWorkspaceData: (state) => {
      state.workspaceId = "";
      state.memberRole = "";
      state.permissions = null;
    },
  },
});

export const { removeWorkspaceData, setWorkspaceData } = workspaceSlice.actions;
export default workspaceSlice.reducer;
