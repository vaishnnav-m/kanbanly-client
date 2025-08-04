import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import { ITask, TaskCreationArgs } from "../api/task/task.types";
import { createTask, getAllTasks, removeTask } from "../api/task";

export const useCreateTask = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, TaskCreationArgs>({
    mutationFn: createTask,
    mutationKey: ["createTask"],
    onSuccess: () => {
      toast.showSuccess({
        title: "Task Creation Successfull",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Task Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllTasks = (workspaceId: string, projectId: string) => {
  return useQuery<ApiResponse<ITask[]>, Error>({
    queryKey: ["getTasks", workspaceId],
    queryFn: () => getAllTasks({ workspaceId, projectId }),
    enabled: !!workspaceId || !!projectId,
  });
};

export const useRemoveTask = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; projectId: string; taskId: string }
  >({
    mutationFn: removeTask,
    mutationKey: ["removeTask"],
    onSuccess: () => {
      toast.showSuccess({
        title: "Task Deletion Successfull",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Task Deletion Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
