import api from "../axios";
import { LoginPayload, SignupPayload } from "./auth.types";

export const signup = async (payload: SignupPayload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const userLogin = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const googleAuth = async (payload: { token: string }) => {
  const response = await api.post("/auth/google/callback", payload);
  return response.data;
};

export const verifyMagicLink = async (payload: { token: string }) => {
  const response = await api.get(`/auth/verify-email?token=${payload.token}`);
  return response.data;
};

export const resendEmail = async (payload: { email: string }) => {
  const response = await api.get(`/auth/resend-email?email=${payload.email}`);
  return response.data;
};

export const forgotPassword = async (payload: { email: string }) => {
  const response = await api.post("/auth/forgot-password", payload);
  return response.data;
};

export const resetPassword = async (payload: {
  password: string;
  token: string;
}) => {
  const response = await api.patch("/auth/reset-password", payload);
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};

export const adminLogin = async (payload: LoginPayload) => {
  const response = await api.post("/auth/admin/login", payload);
  return response.data;
};

export const adminLogout = async () => {
  const response = await api.get("/auth/admin/logout");
  return response.data;
};
