import api from "../axios";
import { PlanCreationPayload } from "./plans.type";

export const createPlan = async (payload: PlanCreationPayload) => {
  const response = await api.post("/plans/", payload);
  return response.data;
};

export const getAllPlans = async () => {
  const response = await api.get("/plans");
  return response.data;
};
