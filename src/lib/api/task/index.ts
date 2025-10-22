import api from "../axios";
import {
  AttachParentArgs,
  AttachSprintPayload,
  StatusChangingArgs,
  TaskCreationArgs,
  TaskEditArgs,
} from "./task.types";

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
  filters: { status?: string; priority?: string; search?: string };
}) => {
  const response = await api.get(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks`,
    { params: data.filters }
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

export const getAllSubtasks = async (data: {
  workspaceId: string;
  projectId: string;
  taskId: string;
}) => {
  const response = await api.get(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks/${data.taskId}/sub-tasks`
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

export const editTask = async (payload: TaskEditArgs) => {
  const response = await api.put(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}`,
    payload.data
  );
  return response.data;
};

export const attachParent = async (payload: AttachParentArgs) => {
  const response = await api.patch(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}/attach-parent`,
    payload.data
  );
  return response.data;
};

export const attachSprint = async (payload: AttachSprintPayload) => {
  const response = await api.patch(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}/attach-sprint`,
    { sprintId: payload.sprintId }
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
