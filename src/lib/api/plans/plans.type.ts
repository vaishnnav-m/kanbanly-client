export interface IPlan {
  planId: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  workspaceLimit: string;
  projectLimit: string;
  taskLimit: string;
  memberLimit: string;
  features?: string[];
}

export type PlanCreationPayload = Omit<IPlan, "planId">;

export interface EditPlanArgs {
  data: Partial<PlanCreationPayload>;
  planId: string;
}
