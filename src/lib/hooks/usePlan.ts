import { useMutation, useQuery } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import { IPlan, PlanCreationPayload } from "../api/plans/plans.type";
import { createPlan, getAllPlans } from "../api/plans";

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
  });
};

export const useGetAllPlans = () => {
  return useQuery<ApiResponse<IPlan[]>, Error>({
    queryKey: ["getAllPlans"],
    queryFn: getAllPlans,
  });
};
