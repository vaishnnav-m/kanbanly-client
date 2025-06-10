import api from "../axios";
import { ApiResponse, LoginPayload, SignupPayload } from "./auth.types";

export const signup = async (payload: SignupPayload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const userLogin = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const sendOtp = async () => {
  const response = await api.get("/auth/send-otp");
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

export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};
