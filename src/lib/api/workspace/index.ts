import api from "../axios";
import { WorkspaceCreatePayload } from "./workspace.types";

export const createWorkspace = async (payload: WorkspaceCreatePayload) => {
  const response = await api.post("/workspace/create", payload);
  return response.data;
};
