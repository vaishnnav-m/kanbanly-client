import api from "../axios";
import {
  SendInvititationArgs,
  WorkspaceCreatePayload,
} from "./workspace.types";

export const createWorkspace = async (payload: WorkspaceCreatePayload) => {
  const response = await api.post("/workspace/create", payload);
  return response.data;
};

export const getAllWorkspaces = async () => {
  const response = await api.get("/workspace");
  return response.data;
};

export const sendInvititation = async ({
  workspaceId,
  data,
}: SendInvititationArgs) => {
  const response = await api.post(
    `/workspace/${workspaceId}/invitations`,
    data
  );
  return response.data;
};

export const verifyInvitation = async (payload: { token: string }) => {
  const response = await api.post(
    `/invitations/workspace/${payload.token}/accept`
  );
  return response.data;
};

export const getWorkspaceMembers = async (
  payload: { workspaceId: string },
  page: number
) => {
  const response = await api.get(
    `/workspace/${payload.workspaceId}/members?page=${page}`
  );
  return response.data;
};
