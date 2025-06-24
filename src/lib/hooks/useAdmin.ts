"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, User } from "../api/auth/auth.types";
import { fetchAllUsers, updateUserStatus } from "../api/admin";
import { useToastMessage } from "./useToastMessage";

export const useGetUsers = (options?: {
  onSuccess?: (response: ApiResponse<User[]>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useQuery<ApiResponse<User[]>, Error>({
    queryKey: ["fetchAllUsers"],
    queryFn: fetchAllUsers,
    ...options,
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();
  return useMutation<ApiResponse<User>, Error, { id: string }>({
    mutationFn: updateUserStatus,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllUsers"] });
      toast.showSuccess({
        title: "Success fully updated",
        description: response.message,
        duration: 6000,
      });
    },
  });
};
