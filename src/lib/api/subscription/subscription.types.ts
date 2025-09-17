export interface checkoutCreationPayload {
  planId: string;
  billingCycle: string;
}

export interface checkoutCreationResponse {
  url: string;
  sessionId: string;
}

export interface Subscription {
  planName: string;
  currentPeriodEnd: Date | null;
  limits: {
    workspaces: number | string;
    members: number | string;
    projects: number | string;
    tasks: number | string;
  };
}
