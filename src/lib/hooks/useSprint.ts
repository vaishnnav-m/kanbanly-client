import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import { CreateSprintArgs } from "../api/sprint/sprint.types";
import { createSprint } from "../api/sprint";
import { useToastMessage } from "./useToastMessage";

export const useCreateSprint = () => {
  const toast = useToastMessage();

  return useMutation<ApiResponse, Error, CreateSprintArgs>({
    mutationKey: ["createSprint"],
    mutationFn: createSprint,
    onSuccess: () => {
      toast.showSuccess({
        title: "Sprint Creation Successfull",
        duration: 6000,
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Sprint Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
