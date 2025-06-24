import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../api/auth/auth.types";
import { createWorkspace, getAllWorkspaces } from "../api/workspace";
import {
  IWorkspace,
  WorkspaceCreatePayload,
} from "../api/workspace/workspace.types";
import { useToastMessage } from "./useToastMessage";
import { useRouter } from "next/navigation";

export const useCreateWorkspace = () => {
  const toast = useToastMessage();
  const router = useRouter();

  return useMutation<ApiResponse, Error, WorkspaceCreatePayload>({
    mutationFn: createWorkspace,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Created",
        description: response.message,
        duration: 6000,
      });
      router.push("/workspaces");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Error in Login",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllWorkspaces = () => {
  return useQuery<ApiResponse<IWorkspace[]>, Error>({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
  });
};
