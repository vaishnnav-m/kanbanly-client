import api from "../axios";
import { ProjectCreationArgs } from "./project.types";

export const createProject = async (payload: ProjectCreationArgs) => {
  const response = await api.post(
    `/workspace/${payload.workspaceId}/projects`,
    payload.data
  );
  return response.data;
};

export const getAllProjects = async (data: { workspaceId: string }) => {
  const response = await api.get(`/workspace/${data.workspaceId}/projects`);
  return response.data;
};

export const getOneProject = async (data: {
  workspaceId: string;
  projectId: string;
}) => {
  const response = await api.get(
    `/workspace/${data.workspaceId}/projects/${data.projectId}`
  );
  return response.data;
};

export const removeProject = async (data: {
  workspaceId: string;
  projectId: string;
}) => {
  const response = await api.delete(
    `/workspace/${data.workspaceId}/projects/${data.projectId}`
  );
  return response.data;
};
