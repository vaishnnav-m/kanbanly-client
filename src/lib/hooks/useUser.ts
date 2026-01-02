import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  NotificationResponse,
  PreferenceResponse,
  UpdatePreferencesPayload,
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
  UserProfileData,
} from "../api/user/user.types";
import {
  getUserNotifications,
  getUserPreferences,
  getUserProfile,
  markAsRead,
  updateUserPassword,
  updateUserPreferences,
  updateUserProfile,
} from "../api/user";
import { AxiosError } from "axios";

export const useGetUserProfile = () => {
  return useQuery<ApiResponse<UserProfileData>, Error>({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });
};

export const useUpdateUserProfile = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    UpdateUserProfilePayload
  >({
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
    onError: (error: AxiosError<{ message: string }>) => {
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

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    UpdateUserPasswordPayload
  >({
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
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Password Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetUserPreferences = () => {
  return useQuery<ApiResponse<PreferenceResponse>, Error>({
    queryKey: ["getUserPreferences"],
    queryFn: getUserPreferences,
  });
};

export const useUpdateUserPreferences = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    UpdatePreferencesPayload
  >({
    mutationKey: ["updateUserPreferences"],
    mutationFn: updateUserPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserPreferences"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Password Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetUserNotifications = () => {
  return useQuery<ApiResponse<NotificationResponse[]>, Error>({
    queryKey: ["getUserNotifications"],
    queryFn: getUserNotifications,
  });
};

export const useMarkAsRead = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<{ message: string }>, string[]>({
    mutationKey: ["markAsRead"],
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserNotifications"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Notification Updation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
