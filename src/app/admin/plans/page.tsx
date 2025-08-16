"use client";
import { AdminPlansTemplate } from "@/components/templates/admin/AdminPlansTemplate";
import { PlanCreationPayload } from "@/lib/api/plans/plans.type";
import { useCreatePlan } from "@/lib/hooks/usePlan";
import React from "react";

function page() {
  const { mutate: createPlan } = useCreatePlan();

  const handlePlanCreation = (payload: PlanCreationPayload) => {
    console.log("plan page",payload)
    createPlan(payload);
  };

  return <AdminPlansTemplate createPlan={handlePlanCreation} />;
}

export default page;
