"use client";
import { AdminPlansTemplate } from "@/components/templates/admin/AdminPlansTemplate";
import { EditPlanArgs, PlanCreationPayload } from "@/lib/api/plans/plans.type";
import {
  useCreatePlan,
  useEditPlan,
  useGetAllPlans,
} from "@/lib/hooks/usePlan";

export default function AdminPlansPage() {
  const { data: plansData } = useGetAllPlans();
  const { mutate: createPlan } = useCreatePlan();
  const { mutate: editPlan } = useEditPlan();

  const handlePlanCreation = (payload: PlanCreationPayload) => {
    createPlan(payload);
  };

  const handlePlanEditing = (payload: EditPlanArgs) => {
    editPlan(payload);
  };

  const plans = plansData ? plansData.data : [];

  return (
    <AdminPlansTemplate
      plans={plans}
      createPlan={handlePlanCreation}
      editPlan={handlePlanEditing}
    />
  );
}
