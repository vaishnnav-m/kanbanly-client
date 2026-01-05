import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createWorkspace,
  editWorkspace,
  editWorkspaceMember,
  getAllInvitations,
  getAllWorkspaces,
  getCurrentMember,
  getDashboardData,
  getOneWorkspace,
  getWorkspaceMembers,
  rejectInvitation,
  removeInvitation,
  removeWorkspace,
  removeWorkspaceMember,
  sendInvititation,
  updateRolePermissions,
  verifyInvitation,
} from "../api/workspace";
import {
  CurrentMemberResponse,
  EditWorkspaceMember,
  IDashboardResponse,
  InvitationList,
  IWorkspace,
  PermissionUpdationArgs,
  SendInvititationArgs,
  WorkspaceCreatePayload,
  WorkspaceEditArgs,
  WorkspaceMember,
} from "../api/workspace/workspace.types";
import { useToastMessage } from "./useToastMessage";
import { useRouter } from "next/navigation";
import { ApiResponse, PaginatedResponse } from "../api/common.types";
import { AxiosError } from "axios";

export const useCreateWorkspace = () => {
  const toast = useToastMessage();
  const router = useRouter();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    WorkspaceCreatePayload
  >({
    mutationFn: createWorkspace,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Created",
        description: response.message,
        duration: 6000,
      });
      router.push("/workspaces");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllWorkspaces = (page?: number, search?: string) => {
  return useQuery<
    ApiResponse<{ workspaces: IWorkspace[]; totalPages: number }>,
    Error
  >({
    queryKey: ["workspaces", page, search],
    queryFn: () => getAllWorkspaces(page, search),
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

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    WorkspaceEditArgs
  >({
    mutationKey: ["editWorkspace"],
    mutationFn: editWorkspace,
    onSuccess: (response, variables) => {
      toast.showSuccess({
        title: "Successfully Edited",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getOneWorkspace", variables.workspaceId],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Editing Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useUpdateRolePermissions = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    PermissionUpdationArgs
  >({
    mutationKey: ["updateRolePermissions"],
    mutationFn: updateRolePermissions,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getOneWorkspace", variables.workspaceId],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Editing Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useRemoveWorkspace = (
  options?: Omit<
    UseMutationOptions<ApiResponse, Error, { workspaceId: string }>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<ApiResponse, Error, { workspaceId: string }>({
    mutationKey: ["removeWorkspace"],
    mutationFn: removeWorkspace,
    ...options,
  });
};

// invitations
export const useSendInvitation = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    SendInvititationArgs
  >({
    mutationFn: sendInvititation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["getWorkspaceMembers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllInvitations"],
      });
      toast.showSuccess({
        title: "Successfully Sent",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
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
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, { token: string }>({
    mutationFn: verifyInvitation,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Veryfied",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserNotifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      router.replace("/workspaces");
    },
  });
};

export const useRejectInvitation = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    { token: string }
  >({
    mutationFn: rejectInvitation,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully Rejected",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserNotifications"],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Rejection Failed",
        description: errorMessage,
        duration: 6000,
      });
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
  return useQuery<ApiResponse<CurrentMemberResponse>, Error>({
    queryKey: ["getCurrentMember", workspaceId],
    queryFn: () => getCurrentMember(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useEditWorkspaceMember = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    EditWorkspaceMember
  >({
    mutationKey: ["editWorkspaceMember"],
    mutationFn: editWorkspaceMember,
    onSuccess: (response, variables) => {
      toast.showSuccess({
        title: "Successfully Updated",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getWorkspaceMembers", variables.workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllInvitations"],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
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
    AxiosError<{ message: string }>,
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
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Workspace Member Deletion Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetDashboardData = (workspaceId: string) => {
  return useQuery<ApiResponse<IDashboardResponse>, Error>({
    queryKey: ["getDashboardData", workspaceId],
    queryFn: () => getDashboardData(workspaceId),
    enabled: !!workspaceId,
  });
};
