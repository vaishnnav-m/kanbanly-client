import api from "../axios";
import { CreateEpicPayload } from "./epic.types";

export const addEpic = async (payload: CreateEpicPayload) => {
  const response = await api.post(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/epics`,
    {
      title: payload.title,
      ...(payload.description && { description: payload.description }),
      color: payload.color,
    }
  );

  return response.data;
};

export const getAllEpics = async (workspaceId: string, projectId: string) => {
  const response = await api.get(
    `/workspace/${workspaceId}/projects/${projectId}/epics`
  );

  return response.data;
};

export const getEpicById = async (
  workspaceId: string,
  projectId: string,
  epicId: string
) => {
  const response = await api.get(
    `/workspace/${workspaceId}/projects/${projectId}/epics/${epicId}`
  );

  return response.data;
};
