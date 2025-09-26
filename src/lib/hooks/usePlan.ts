import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  EditPlanArgs,
  IPlan,
  PlanCreationPayload,
} from "../api/plans/plans.type";
import { createPlan, deletePlan, editPlan, getAllPlans } from "../api/plans";

export const useCreatePlan = () => {
  const toast = useToastMessage();
  return useMutation<ApiResponse<IPlan>, Error, PlanCreationPayload>({
    mutationKey: ["createPlan"],
    mutationFn: createPlan,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Success fully created",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Plan adding failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllPlans = () => {
  return useQuery<ApiResponse<IPlan[]>, Error>({
    queryKey: ["getAllPlans"],
    queryFn: getAllPlans,
  });
};

export const useEditPlan = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditPlanArgs>({
    mutationKey: ["editPlan"],
    mutationFn: editPlan,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getAllPlans"] });
      toast.showSuccess({
        title: "Success fully edited",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Plan Editing Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useDeletePlan = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, { planId: string }>({
    mutationKey: ["deletePlan"],
    mutationFn: deletePlan,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getAllPlans"] });
      toast.showSuccess({
        title: "Success fully deleted",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Plan deletion failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
