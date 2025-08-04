import api from "../axios";
import {
  SendInvititationArgs,
  WorkspaceCreatePayload,
  WorkspaceEditArgs,
} from "./workspace.types";

export const createWorkspace = async (payload: WorkspaceCreatePayload) => {
  const response = await api.post("/workspace/create", payload);
  return response.data;
};

export const getAllWorkspaces = async () => {
  const response = await api.get("/workspace");
  return response.data;
};

export const getOneWorkspace = async (payload: { workspaceId: string }) => {
  const response = await api.get(`/workspace/${payload.workspaceId}`);
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

export const editWorkspace = async (payload: WorkspaceEditArgs) => {
  const response = await api.put(
    `/workspace/${payload.workspaceId}`,
    payload.data
  );
  return response.data;
};

export const removeWorkspace = async (payload: { workspaceId: string }) => {
  const response = await api.delete(`/workspace/${payload.workspaceId}`);
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

export const getCurrentMember = async (workspaceId: string | null) => {
  const response = await api.get(`/workspace/${workspaceId}/members/me`);
  return response.data;
};
