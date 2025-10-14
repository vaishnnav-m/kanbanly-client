import api from "../axios";
import { BaseApiParams } from "../common.types";
import { CreateSprintArgs } from "./sprint.types";

export const createSprint = async (payload: CreateSprintArgs) => {
  const result = await api.post(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints`,
    payload.sprintData
  );
  return result.data;
};

export const getAllSprints = async (payload: BaseApiParams) => {
  const result = await api.get(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints`
  );
  return result.data;
};
