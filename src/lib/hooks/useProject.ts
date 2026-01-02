import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import {
  addMember,
  createProject,
  editProject,
  getAllProjects,
  getMembers,
  getOneProject,
  removeProject,
  removeProjectMember,
} from "../api/project";
import {
  IProject,
  ProjectCreationArgs,
  ProjectEditingArgs,
} from "../api/project/project.types";
import { useToastMessage } from "./useToastMessage";
import { WorkspaceMember } from "../api/workspace/workspace.types";
import { AxiosError } from "axios";

export const useCreateProject = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    ProjectCreationArgs
  >({
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
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Project Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllProjects = (
  workspaceId: string,
  filters: {
    search?: string;
    memberCount?: { min?: number; max?: number };
  },
  sorting?: {
    sortBy?: string;
    order?: string;
  },
  limit?: number,
  skip?: number
) => {
  return useQuery<ApiResponse<IProject[]>, Error>({
    queryKey: ["getProjects", workspaceId, filters, sorting, limit, skip],
    queryFn: () =>
      getAllProjects({ workspaceId, filters, sorting, limit, skip }),
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

export const useEditProject = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    ProjectEditingArgs
  >({
    mutationFn: editProject,
    mutationKey: ["editProject"],
    onSuccess: (response, variables) => {
      toast.showSuccess({
        title: "Project Editing Successfull",
        description: response.message,
        duration: 6000,
      });

      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      queryClient.refetchQueries({
        queryKey: ["getOneProject", variables.projectId],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Project Editing Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
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

export const useAddMember = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    { workspaceId: string; projectId: string; data: { email: string } }
  >({
    mutationKey: ["addMember"],
    mutationFn: addMember,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Member added Successfully",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getProjectMembers"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Member adding Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetProjectMembers = (
  workspaceId: string,
  projectId: string,
  search?: string
) => {
  return useQuery<ApiResponse<WorkspaceMember[]>, Error>({
    queryKey: ["getProjectMembers", workspaceId, projectId, search],
    queryFn: () => getMembers(workspaceId, projectId, search),
    enabled: !!workspaceId,
  });
};

export const useRemoveProjectMember = (options?: {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}) => {
  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    { workspaceId: string; projectId: string; memberId: string }
  >({
    mutationKey: ["removeProjectMember"],
    mutationFn: removeProjectMember,
    ...options,
  });
};
