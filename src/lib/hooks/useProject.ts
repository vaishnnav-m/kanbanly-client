import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import { createProject, getAllProjects } from "../api/project";
import { IProject, ProjectCreationArgs } from "../api/project/project.types";
import { useToastMessage } from "./useToastMessage";

export const useCreateProject = () => {
  const toast = useToastMessage();

  return useMutation<ApiResponse, Error, ProjectCreationArgs>({
    mutationFn: createProject,
    mutationKey: ["createProject"],
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Project Creation Successfull",
        description: response.message,
        duration: 6000,
      });
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
