"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { AddPlanDialog } from "@/components/organisms/admin/AdminPlansCreationModal";
import { BillingCycle, PlanCard } from "@/components/organisms/admin/PlanCard";
import {
  EditPlanArgs,
  IPlan,
  PlanCreationPayload,
} from "@/lib/api/plans/plans.type";

interface AdminPlansTemplateProps {
  createPlan: (payload: PlanCreationPayload) => void;
  editPlan: (payload: EditPlanArgs) => void;
  plans?: IPlan[];
}

export const AdminPlansTemplate = ({
  createPlan,
  editPlan,
  plans = [],
}: AdminPlansTemplateProps) => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<IPlan | null>(null);

  const handleEdit = (plan: IPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const submitEditedTask = (newPlan: Partial<PlanCreationPayload>) => {
    if (editingPlan) {
      editPlan({ data: newPlan, planId: editingPlan.planId });
    }
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div className="flex w-full bg-background">
      <div className="py-6 flex flex-1 flex-col">
        <main className="flex-1 space-y-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Plans</h1>
            <div className="flex gap-3">
              <Button
                onClick={() => setBilling("monthly")}
                className={`${billing === "monthly" && "ring-2"}`}
                variant="outline"
              >
                Monthly
              </Button>
              <Button
                className={`${billing === "yearly" && "ring-2"}`}
                onClick={() => setBilling("yearly")}
                variant="outline"
              >
                Yearly
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              <Plus /> Add Plan
            </Button>
          </div>
          <section className="w-full p-3 md:p-6 lg:py-8 lg:px-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.planId}
                  plan={plan}
                  billing={billing}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
      <AddPlanDialog
        isOpen={isModalOpen}
        onAdd={createPlan}
        onClose={() => setIsModalOpen(false)}
        plan={editingPlan}
        onEdit={submitEditedTask}
      />
    </div>
  );
};
