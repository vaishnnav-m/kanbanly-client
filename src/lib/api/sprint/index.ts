import api from "../axios";
import { CreateSprintArgs } from "./sprint.types";

export const createSprint = async (payload: CreateSprintArgs) => {
  const result = await api.post(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/sprints`,
    payload.sprintData
  );
  return result.data;
};
