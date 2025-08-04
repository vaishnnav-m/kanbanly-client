import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import {
  createProject,
  getAllProjects,
  getOneProject,
  removeProject,
} from "../api/project";
import { IProject, ProjectCreationArgs } from "../api/project/project.types";
import { useToastMessage } from "./useToastMessage";
import { useRouter } from "next/router";

export const useCreateProject = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, ProjectCreationArgs>({
    mutationFn: createProject,
    mutationKey: ["createProject"],
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Project Creation Successfull",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Project Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllProjects = (workspaceId: string) => {
  return useQuery<ApiResponse<IProject[]>, Error>({
    queryKey: ["getProjects", workspaceId],
    queryFn: () => getAllProjects({ workspaceId }),
    enabled: !!workspaceId,
  });
};

export const useGetOneProject = (workspaceId: string, projectId: string) => {
  return useQuery<ApiResponse<IProject>, Error>({
    queryKey: ["getOneProject", projectId],
    queryFn: () => getOneProject({ workspaceId, projectId }),
    enabled: !!projectId && !!workspaceId,
  });
};

export const useRemoveProject = (options?: {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; projectId: string }
  >({
    mutationKey: ["removeProject"],
    mutationFn: removeProject,
    ...options,
  });
};
