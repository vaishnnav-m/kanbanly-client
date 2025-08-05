import api from "../axios";
import {
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
