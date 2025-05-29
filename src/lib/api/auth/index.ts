import api from "../axios";
import { SignupPayload } from "./auth.types";

export const signup = async (payload: SignupPayload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};
