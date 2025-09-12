import api from "../axios";
import { checkoutCreationPayload } from "./subscription.types";

export const createCheckout = async ({
  planId,
  billingCycle,
}: checkoutCreationPayload) => {
  const result = await api.post("/subscriptions/create-checkout", {
    planId,
    billingCycle,
  });
  return result.data;
};

export const verifyCheckoutSession = async (sessionId: string) => {
  const result = await api.get(
    `/subscriptions/verify-session?sessionId=${sessionId}`
  );
  return result.data;
};
