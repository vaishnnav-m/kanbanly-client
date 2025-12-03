import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import { ActivityResponse } from "../api/activity/activity.types";
import { getTaskActivities } from "../api/activity";

export const useGetTaskActivities = (
  workspaceId: string,
  projectId: string,
  taskId: string
) => {
  return useQuery<ApiResponse<ActivityResponse[]>, Error>({
    queryKey: ["getTaskActivities", taskId, projectId, workspaceId],
    queryFn: () => getTaskActivities(workspaceId, projectId, taskId),
  });
};
