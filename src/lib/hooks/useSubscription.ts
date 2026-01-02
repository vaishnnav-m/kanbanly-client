import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import {
  checkoutCreationPayload,
  checkoutCreationResponse,
  Subscription,
} from "../api/subscription/subscription.types";
import {
  createCheckout,
  createCustomerPortal,
  getUserSubscription,
  verifyCheckoutSession,
} from "../api/subscription";
import { SubscriptionStatus } from "@/types/status.enum";
import { AxiosError } from "axios";

export const useCreateCheckout = (
  options?: Omit<
    UseMutationOptions<
      ApiResponse<checkoutCreationResponse>,
      AxiosError<{ message: string }>,
      checkoutCreationPayload
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<
    ApiResponse<checkoutCreationResponse>,
    AxiosError<{ message: string }>,
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

export const useGetUserSubscription = (
  options?: Omit<
    UseQueryOptions<ApiResponse<Subscription>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<Subscription>, Error>({
    queryKey: ["getUserSubscription"],
    queryFn: getUserSubscription,
    ...options,
  });
};

export const useCreateCustomerPortal = (
  options?: Omit<
    UseMutationOptions<ApiResponse<checkoutCreationResponse>, AxiosError<{ message: string }>>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<ApiResponse<checkoutCreationResponse>, AxiosError<{ message: string }>>({
    mutationKey: ["createPortal"],
    mutationFn: createCustomerPortal,
    ...options,
  });
};
