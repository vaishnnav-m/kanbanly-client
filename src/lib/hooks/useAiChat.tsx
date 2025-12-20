import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import { AIChatPayload } from "../api/ai/ai.types";
import { chatAi } from "../api/ai";
import { useToastMessage } from "./useToastMessage";

export const useChatAi = (
  options: Omit<
    UseMutationOptions<ApiResponse<string>, Error, AIChatPayload>,
    "mutationKey" | "mutationFn" | "onError"
  >
) => {
  const toast = useToastMessage();

  return useMutation<ApiResponse<string>, Error, AIChatPayload>({
    mutationKey: ["chatAi"],
    mutationFn: chatAi,
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Error in generating response",
        description: errorMessage,
        duration: 6000,
      });
    },
    ...options,
  });
};
