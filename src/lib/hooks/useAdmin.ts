"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {User } from "../api/auth/auth.types";
import { fetchAllUsers, updateUserStatus } from "../api/admin";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";

export const useGetUsers = (
  page: number,
  options?: {
    onSuccess?: (
      response: ApiResponse<{ users: User[]; totalPages: number }>
    ) => void;
    onError?: (error: unknown) => void;
  }
) => {
  return useQuery<ApiResponse<{ users: User[]; totalPages: number }>, Error>({
    queryKey: ["fetchAllUsers", page],
    queryFn: () => fetchAllUsers(page),
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
