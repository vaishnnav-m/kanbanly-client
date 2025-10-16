import api from "../axios";
import { BaseApiParams } from "../common.types";
import { CreateSprintArgs, UpdateSprintArgs } from "./sprint.types";

export const createSprint = async (payload: CreateSprintArgs) => {
  const result = await api.post(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints`
  );
  return result.data;
};

export const getAllSprints = async (payload: BaseApiParams) => {
  const result = await api.get(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints`
  );
  return result.data;
};

export const getOneSprint = async (
  workspaceId: string,
  projectId: string,
  sprintId: string
) => {
  const result = await api.get(
    `/workspace/${workspaceId}/projects/${projectId}/sprints/${sprintId}`
  );
  return result.data;
};

export const updateSprint = async (payload: UpdateSprintArgs) => {
  const result = await api.put(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints/${payload.sprintId}`,
    payload.data
  );
  return result.data;
};

export const startSprint = async (payload: UpdateSprintArgs) => {
  const result = await api.put(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints/${payload.sprintId}/start`,
    payload.data
  );
  return result.data;
};

export const getActiveSprint = async (
  workspaceId: string,
  projectId: string
) => {
  const result = await api.get(
    `/workspace/${workspaceId}/projects/${projectId}/sprints/active`
  );
  return result.data;
};
