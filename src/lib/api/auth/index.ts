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
