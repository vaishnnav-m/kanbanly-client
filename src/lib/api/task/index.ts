import api from "../axios";
import { StatusChangingArgs, TaskCreationArgs } from "./task.types";

export const createTask = async (payload: TaskCreationArgs) => {
  const response = await api.post(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks`,
    payload.data
  );
  return response.data;
};

export const getAllTasks = async (data: {
  workspaceId: string;
  projectId: string;
}) => {
  const response = await api.get(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks`
  );
  return response.data;
};

export const getOnetask = async (data: {
  workspaceId: string;
  projectId: string;
  taskId: string;
}) => {
  const response = await api.get(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks/${data.taskId}`
  );
  return response.data;
};

export const changeStatus = async (data: StatusChangingArgs) => {
  const response = await api.patch(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks/${data.taskId}/status`,
    data.data
  );
  return response.data;
};

export const removeTask = async (data: {
  workspaceId: string;
  projectId: string;
  taskId: string;
}) => {
  const response = await api.delete(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks/${data.taskId}`
  );
  return response.data;
};
