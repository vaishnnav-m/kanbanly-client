import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  AttachParentArgs,
  AttachSprintPayload,
  ITask,
  ITaskDetails,
  StatusChangingArgs,
  TaskCreationArgs,
  TaskEditArgs,
} from "../api/task/task.types";
import {
  attachParent,
  attachSprint,
  changeStatus,
  createTask,
  editTask,
  getAllSubtasks,
  getAllTasks,
  getOnetask,
  removeTask,
} from "../api/task";
import { AxiosError } from "axios";

export const useCreateTask = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    TaskCreationArgs
  >({
    mutationFn: createTask,
    mutationKey: ["createTask"],
    onSuccess: () => {
      toast.showSuccess({
        title: "Task Creation Successfull",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Task Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllTasks = (
  workspaceId: string,
  projectId: string,
  filters: {
    status?: string;
    priority?: string;
    search?: string;
  }
) => {
  return useQuery<ApiResponse<ITask[]>, Error>({
    queryKey: ["getTasks", workspaceId, projectId, filters],
    queryFn: () => getAllTasks({ workspaceId, projectId, filters }),
    enabled: !!workspaceId || !!projectId,
  });
};

export const useGetAllSubTasks = (
  workspaceId: string,
  projectId: string,
  taskId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<ITask[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<ITask[]>, Error>({
    queryKey: ["getTasks", workspaceId, projectId, taskId],
    queryFn: () => getAllSubtasks({ workspaceId, projectId, taskId }),
    ...options,
  });
};

export const useGetOneTask = (
  workspaceId: string,
  projectId: string,
  taskId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<ITaskDetails>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<ITaskDetails>, Error>({
    queryKey: ["getOnetask", workspaceId, projectId, taskId],
    queryFn: () => getOnetask({ workspaceId, projectId, taskId }),
    ...options,
  });
};

export const useChangeStatus = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    StatusChangingArgs
  >({
    mutationFn: changeStatus,
    mutationKey: ["changeStatus"],
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({
        queryKey: [
          "getOnetask",
          variables.workspaceId,
          variables.projectId,
          variables.taskId,
        ],
      });
      queryClient.invalidateQueries({ queryKey: ["getAllEpics"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Status Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useEditTask = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    TaskEditArgs
  >({
    mutationFn: editTask,
    mutationKey: ["editTask"],
    onSuccess: (response, variables) => {
      toast.showSuccess({
        title: "Task Updated Successfully",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({
        queryKey: [
          "getOnetask",
          variables.workspaceId,
          variables.projectId,
          variables.taskId,
        ],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Task Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useAttachParrent = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    AttachParentArgs
  >({
    mutationKey: ["attachParent"],
    mutationFn: attachParent,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({
        queryKey: [
          "getOnetask",
          variables.workspaceId,
          variables.projectId,
          variables.taskId,
        ],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Failed to attach work item",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useAttachSprint = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    AttachSprintPayload
  >({
    mutationKey: ["attachSprint"],
    mutationFn: attachSprint,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getAllSprints"] });
      queryClient.invalidateQueries({
        queryKey: [
          "getOnetask",
          variables.workspaceId,
          variables.projectId,
          variables.taskId,
        ],
      });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Failed to attach Sprint",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useRemoveTask = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
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
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Task Deletion Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
