import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkspace,
  editWorkspace,
  editWorkspaceMember,
  getAllInvitations,
  getAllWorkspaces,
  getCurrentMember,
  getOneWorkspace,
  getWorkspaceMembers,
  removeInvitation,
  removeWorkspace,
  removeWorkspaceMember,
  sendInvititation,
  verifyInvitation,
} from "../api/workspace";
import {
  EditWorkspaceMember,
  InvitationList,
  IWorkspace,
  SendInvititationArgs,
  WorkspaceCreatePayload,
  WorkspaceEditArgs,
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

export const useEditWorkspace = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, WorkspaceEditArgs>({
    mutationKey: ["editWorkspace"],
    mutationFn: editWorkspace,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Edited",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getOneWorkspace"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Editing Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useRemoveWorkspace = () => {
  const toast = useToastMessage();
  const router = useRouter();

  return useMutation<ApiResponse, Error, { workspaceId: string }>({
    mutationKey: ["removeWorkspace"],
    mutationFn: removeWorkspace,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Deleted",
        description: response.message,
        duration: 6000,
      });
      router.replace("/workspaces");
    },
  });
};

// invitations
export const useSendInvitation = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, SendInvititationArgs>({
    mutationFn: sendInvititation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["getWorkspaceMembers", "getAllInvitations"],
      });
      toast.showSuccess({
        title: "Successfully Sent",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Invitation Failed",
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

export const useWorkspaceInvitations = (workspaceId: string) => {
  return useQuery<ApiResponse<InvitationList[]>, Error>({
    queryKey: ["getAllInvitations", workspaceId],
    queryFn: () => getAllInvitations(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useRemoveInvitation = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; userEmail: string }
  >({
    mutationKey: ["removeInvitation"],
    mutationFn: removeInvitation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllInvitations"],
      });
      toast.showSuccess({
        title: "Successfully Deleted",
        description: response.message,
        duration: 6000,
      });
    },
  });
};

// workspace members
export const useWorkspaceMembers = (
  workspaceId: string,
  page: number,
  search?: string
) => {
  return useQuery<ApiResponse<PaginatedResponse<WorkspaceMember[]>>, Error>({
    queryKey: ["getWorkspaceMembers", workspaceId, page, search],
    queryFn: () => getWorkspaceMembers(workspaceId, page, search),
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

export const useEditWorkspaceMember = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditWorkspaceMember>({
    mutationKey: ["editWorkspaceMember"],
    mutationFn: editWorkspaceMember,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Updated",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getWorkspaceMembers", "getAllInvitations"],
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Member Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useRemoveWorkspaceMember = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    Error,
    { workspaceId: string; memberId: string }
  >({
    mutationKey: ["removeWorkspaceMember"],
    mutationFn: removeWorkspaceMember,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Deleted",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getWorkspaceMembers"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Member Deletion Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
