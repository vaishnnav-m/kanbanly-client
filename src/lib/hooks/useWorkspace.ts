import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createWorkspace,
  getAllWorkspaces,
  getCurrentMember,
  getOneWorkspace,
  getWorkspaceMembers,
  sendInvititation,
  verifyInvitation,
} from "../api/workspace";
import {
  IWorkspace,
  SendInvititationArgs,
  WorkspaceCreatePayload,
  WorkspaceMember,
} from "../api/workspace/workspace.types";
import { useToastMessage } from "./useToastMessage";
import { useRouter } from "next/navigation";
import { ApiResponse, PaginatedResponse } from "../api/common.types";

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
        title: "Workspace Creation Failed",
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

export const useGetOneWorkspace = (workspaceId: string) => {
  return useQuery<
    ApiResponse<Omit<IWorkspace, "workspaceId" | "slug" | "createdBy">>,
    Error
  >({
    queryKey: ["getOneWorkspace", workspaceId],
    queryFn: () => getOneWorkspace({ workspaceId }),
  });
};

export const useSendInvitation = () => {
  const toast = useToastMessage();
  return useMutation<ApiResponse, Error, SendInvititationArgs>({
    mutationFn: sendInvititation,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Sent",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useVerifyInvitation = () => {
  const toast = useToastMessage();
  const router = useRouter();

  return useMutation<ApiResponse, Error, { token: string }>({
    mutationFn: verifyInvitation,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Veryfied",
        description: response.message,
        duration: 6000,
      });
      router.replace("/workspaces");
    },
  });
};

export const useWorkspaceMembers = (workspaceId: string, page: number) => {
  return useQuery<ApiResponse<PaginatedResponse<WorkspaceMember[]>>, Error>({
    queryKey: ["getWorkspaceMembers", workspaceId],
    queryFn: () => getWorkspaceMembers({ workspaceId }, page),
    enabled: !!workspaceId,
  });
};

export const useGetCurrentMember = (workspaceId: string | null) => {
  return useQuery<ApiResponse<WorkspaceMember>, Error>({
    queryKey: ["getCurrentMember", workspaceId],
    queryFn: () => getCurrentMember(workspaceId),
    enabled: !!workspaceId,
  });
};
