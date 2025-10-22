import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiResponse, BaseApiParams } from "../api/common.types";
import {
  CreateSprintArgs,
  ISprint,
  ISprintResponse,
  UpdateSprintArgs,
} from "../api/sprint/sprint.types";
import {
  completeSprint,
  createSprint,
  deleteSprint,
  getActiveSprint,
  getAllSprints,
  getOneSprint,
  startSprint,
  updateSprint,
} from "../api/sprint";
import { useToastMessage } from "./useToastMessage";

export const useCreateSprint = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, CreateSprintArgs>({
    mutationKey: ["createSprint"],
    mutationFn: createSprint,
    onSuccess: () => {
      toast.showSuccess({
        title: "Sprint Creation Successfull",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getSprints"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Sprint Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllSprints = (params: BaseApiParams) => {
  return useQuery<ApiResponse<ISprintResponse[]>, Error>({
    queryKey: [
      "getSprints",
      params.workspaceId,
      params.projectId,
      params.filters,
    ],
    queryFn: () => getAllSprints(params),
    enabled: !!params.workspaceId || !!params.projectId,
  });
};

export const useGetOneSprint = (
  workspaceId: string,
  projectId: string,
  sprintId: string
) => {
  return useQuery<ApiResponse<ISprint>, Error>({
    queryKey: ["getOneSprint", workspaceId, projectId, sprintId],
    queryFn: () => getOneSprint(workspaceId, projectId, sprintId),
    enabled: !!workspaceId || !!projectId || !!sprintId,
  });
};

export const useUpdateSprint = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, UpdateSprintArgs>({
    mutationKey: ["updateSprint"],
    mutationFn: updateSprint,
    onSuccess: () => {
      toast.showSuccess({
        title: "Sprint Updation Successfull",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getSprints"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Sprint Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useStartSprint = (
  options?: Omit<
    UseMutationOptions<ApiResponse, Error, UpdateSprintArgs>,
    "mutationKey" | "mutationFn" | "onError"
  >
) => {
  const toast = useToastMessage();

  return useMutation<ApiResponse, Error, UpdateSprintArgs>({
    mutationKey: ["startSprint"],
    mutationFn: startSprint,
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Sprint Starting Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
    ...options,
  });
};

export const useGetActiveSprint = (workspaceId: string, projectId: string) => {
  return useQuery<ApiResponse<ISprint>, Error>({
    queryKey: ["getActiveSprint", workspaceId, projectId],
    queryFn: () => getActiveSprint(workspaceId, projectId),
    enabled: !!workspaceId || !!projectId,
  });
};

export const useCompleteSprint = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; projectId: string; sprintId: string }
  >({
    mutationKey: ["completeSprint"],
    mutationFn: completeSprint,
    onSuccess: () => {
      toast.showSuccess({
        title: "Sprint Completed Successfully",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getSprints"] });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({ queryKey: ["getActiveSprint"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Sprint Completion Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useDeleteSprint = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; projectId: string; sprintId: string }
  >({
    mutationKey: ["deleteSprint"],
    mutationFn: deleteSprint,
    onSuccess: () => {
      toast.showSuccess({
        title: "Sprint Deleted Successfully",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getSprints"] });
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      queryClient.invalidateQueries({ queryKey: ["getActiveSprint"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Sprint Deletion Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
