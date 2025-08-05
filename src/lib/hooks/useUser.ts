import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
  UserProfileData,
} from "../api/user/user.types";
import {
  getUserProfile,
  updateUserPassword,
  updateUserProfile,
} from "../api/user";

export const useGetUserProfile = () => {
  return useQuery<ApiResponse<UserProfileData>, Error>({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });
};

export const useUpdateUserProfile = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, UpdateUserProfilePayload>({
    mutationKey: ["updateUserProfile"],
    mutationFn: updateUserProfile,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "User Profile Updation Successful",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "User Profile Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useUpdateUserPassword = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, UpdateUserPasswordPayload>({
    mutationKey: ["updateUserProfile"],
    mutationFn: updateUserPassword,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Password Updation Successful",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Password Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
