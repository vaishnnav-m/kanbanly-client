export interface checkoutCreationPayload {
  planId: string;
  billingCycle: string;
}

export interface checkoutCreationResponse {
  url: string;
  sessionId: string;
}
