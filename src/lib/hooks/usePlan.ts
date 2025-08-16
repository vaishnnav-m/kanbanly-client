import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import { IPlan, PlanCreationPayload } from "../api/plans/plans.type";
import { createPlan } from "../api/plans";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();
  return useMutation<ApiResponse<IPlan>, Error, PlanCreationPayload>({
   mutationKey:["createPlan"],
    mutationFn: createPlan,
    onSuccess: (response) => {
      // queryClient.invalidateQueries({ queryKey: ["fetchAllUsers"] });
      toast.showSuccess({
        title: "Success fully created",
        description: response.message,
        duration: 6000,
      });
    },
  });
};
