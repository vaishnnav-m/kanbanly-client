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
  currentPeriodEnd: string | null;
  createdAt: string | null;
  limits: {
    workspaces: number | string;
    members: number | string;
    projects: number | string;
    tasks: number | string;
  };
  price: number;
  billingCycle: "yearly" | "monthly";
}
