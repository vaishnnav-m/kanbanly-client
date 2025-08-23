"use client";
import { AdminPlansTemplate } from "@/components/templates/admin/AdminPlansTemplate";
import { PlanCreationPayload } from "@/lib/api/plans/plans.type";
import { useCreatePlan, useGetAllPlans } from "@/lib/hooks/usePlan";
import React from "react";

export default function AdminPlanCreationPage() {
  const { mutate: createPlan } = useCreatePlan();
  const { data: plansData } = useGetAllPlans();

  const handlePlanCreation = (payload: PlanCreationPayload) => {
    createPlan(payload);
  };

  const plans = plansData ? plansData.data : [];
  console.log(plansData)

  return <AdminPlansTemplate plans={plans} createPlan={handlePlanCreation} />;
}
