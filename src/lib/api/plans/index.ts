import api from "../axios";
import { EditPlanArgs, PlanCreationPayload } from "./plans.type";

export const createPlan = async (payload: PlanCreationPayload) => {
  const response = await api.post("/plans/", payload);
  return response.data;
};

export const getAllPlans = async () => {
  const response = await api.get("/plans");
  return response.data;
};

export const editPlan = async ({ data, planId }: EditPlanArgs) => {
  const response = await api.put(`/plans/${planId}`, data);
  return response.data;
};
