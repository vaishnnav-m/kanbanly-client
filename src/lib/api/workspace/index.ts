import api from "../axios";
import {
  EditWorkspaceMember,
  SendInvititationArgs,
  WorkspaceCreatePayload,
  WorkspaceEditArgs,
} from "./workspace.types";

// workspaces
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

// invitations
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

export const getAllInvitations = async (workspaceId: string) => {
  const response = await api.get(`/invitations/workspace/${workspaceId}/`);
  return response.data;
};

export const removeInvitation = async ({
  workspaceId,
  userEmail,
}: {
  workspaceId: string;
  userEmail: string;
}) => {
  const response = await api.delete(
    `/invitations/workspace/${workspaceId}/${userEmail}`
  );
  return response.data;
};

// workspace members
export const getWorkspaceMembers = async (
  workspaceId: string,
  page: number,
  search?: string
) => {
  const response = await api.get(
    `/workspace/${workspaceId}/members?page=${page}&search=${search}`
  );
  return response.data;
};

export const getCurrentMember = async (workspaceId: string | null) => {
  const response = await api.get(`/workspace/${workspaceId}/members/me`);
  return response.data;
};

export const editWorkspaceMember = async (payload: EditWorkspaceMember) => {
  const response = await api.put(
    `/workspace/${payload.workspaceId}/members/`,
    payload.data
  );
  return response.data;
};

export const removeWorkspaceMember = async (payload: {
  workspaceId: string;
  memberId: string;
}) => {
  const response = await api.delete(
    `/workspace/${payload.workspaceId}/members/${payload.memberId}`
  );
  return response.data;
};
