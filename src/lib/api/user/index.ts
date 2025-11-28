import api from "../axios";
import {
  UpdatePreferencesPayload,
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
} from "./user.types";

export const getUserProfile = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const updateUserProfile = async (payload: UpdateUserProfilePayload) => {
  const response = await api.put("/user/me", payload);
  return response.data;
};

export const updateUserPassword = async (
  payload: UpdateUserPasswordPayload
) => {
  const response = await api.patch("/user/me/password", payload);
  return response.data;
};

export const getUserPreferences = async () => {
  const response = await api.get("/user/me/preferences");
  return response.data;
};

export const updateUserPreferences = async (
  payload: UpdatePreferencesPayload
) => {
  const response = await api.put("/user/me/preferences", payload);
  return response.data;
};

export const getUserNotifications = async () => {
  const response = await api.get("/user/me/notifications");
  return response.data;
};

export const markAsRead = async (data: string[]) => {
  const response = await api.patch("/user/me/notifications", data);
  return response.data;
};
