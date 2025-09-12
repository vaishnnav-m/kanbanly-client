import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import {
  checkoutCreationPayload,
  checkoutCreationResponse,
} from "../api/subscription/subscription.types";
import { createCheckout, verifyCheckoutSession } from "../api/subscription";
import { SubscriptionStatus } from "@/types/status.enum";

export const useCreateCheckout = (
  options?: Omit<
    UseMutationOptions<
      ApiResponse<checkoutCreationResponse>,
      Error,
      checkoutCreationPayload
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<
    ApiResponse<checkoutCreationResponse>,
    Error,
    checkoutCreationPayload
  >({
    mutationKey: ["createCheckout"],
    mutationFn: createCheckout,
    ...options,
  });
};

export const useVerifyCheckoutSession = (sessionId: string) => {
  return useQuery<ApiResponse<{ status: SubscriptionStatus }>, Error>({
    queryKey: ["getOnetask", sessionId],
    queryFn: () => verifyCheckoutSession(sessionId),
  });
};
