import api from "../axios";

export const getTaskActivities = async (
  workspaceId: string,
  projectId: string,
  taskId: string
) => {
  const result = await api.get(
    `/workspace/${workspaceId}/projects/${projectId}/tasks/${taskId}/activities`
  );
  return result.data;
};
