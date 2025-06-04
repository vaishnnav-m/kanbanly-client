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

export const sendOtp = async () => {
  const response = await api.get("/auth/send-otp");
  return response.data;
};

export const verifyOtp = async (payload: { otp: string }) => {
  const response = await api.post("/auth/verify-otp",payload);
  return response.data;
};
