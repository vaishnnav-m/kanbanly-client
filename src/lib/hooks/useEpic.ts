import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  addEpic,
  deleteEpic,
  getAllEpics,
  getEpicById,
  updateEpic,
} from "../api/epic";
import { ApiResponse } from "../api/common.types";
import {
  CreateEpicPayload,
  EpicUpdationArgs,
  IEpic,
} from "../api/epic/epic.types";
import { useToastMessage } from "./useToastMessage";
import { AxiosError } from "axios";

// hook to add a new epic
export const useAddEpic = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();

  return useMutation<ApiResponse, Error, CreateEpicPayload>({
    mutationKey: ["addEpic"],
    mutationFn: addEpic,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Success fully deleted",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllEpics"] });
    },
    onError: (error: unknown) => {
      let errorMessage = "Unexpected Error";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.showError({
        title: "Epic creation failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllEpics = (workspaceId: string, projectId: string) => {
  return useQuery<ApiResponse<IEpic[]>, Error>({
    queryKey: ["getAllEpics", workspaceId],
    queryFn: () => getAllEpics(workspaceId, projectId),
    enabled: !!workspaceId || !!projectId,
  });
};

export const useGetEpicById = (
  workspaceId: string,
  projectId: string,
  epicId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<IEpic>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<IEpic>, Error>({
    queryKey: ["getEpicById", workspaceId, projectId, epicId],
    queryFn: () => getEpicById(workspaceId, projectId, epicId),
    ...options,
  });
};

// hook to delete an epic
export const useDeleteEpic = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();

  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; projectId: string; epicId: string }
  >({
    mutationKey: ["deleteEpic"],
    mutationFn: deleteEpic,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Success fully deleted",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllEpics"] });
    },
    onError: (error: unknown) => {
      let errorMessage = "Unexpected Error";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.showError({
        title: "Epic deletion failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useUpdateEpic = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EpicUpdationArgs>({
    mutationFn: updateEpic,
    mutationKey: ["updateEpic"],
    onSuccess: (response, variables) => {
      toast.showSuccess({
        title: "Epic Updated Successfully",
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllEpics"] });
      queryClient.invalidateQueries({
        queryKey: [
          "getEpicById",
          variables.workspaceId,
          variables.projectId,
          variables.epicId,
        ],
      });
    },
    onError: (error: unknown) => {
      let errorMessage = "Unexpected Error";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.showError({
        title: "Epic updation failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
