"use client";
import { Button } from "@/components/atoms/button";
import { AddPlanDialog } from "@/components/organisms/admin/AdminPlansCreationModal";
import { BillingCycle, PlanCard } from "@/components/organisms/admin/PlanCard";
import { PlanCreationPayload } from "@/lib/api/plans/plans.type";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AdminPlansTemplateProps {
  createPlan: (payload: PlanCreationPayload) => void;
}

export const AdminPlansTemplate = ({ createPlan }: AdminPlansTemplateProps) => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => {};
  const handleDelete = (id: string) => {};

  return (
    <div className="flex w-full bg-background">
      <div className="py-6 flex flex-1 flex-col">
        <main className="flex-1">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Plans</h1>
            <Button
              variant="outline"
              className="hover:bg-gray-500/20"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus /> Add Plan
            </Button>
          </div>
          <section className="w-full p-3 md:p-6 lg:py-8 lg:px-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* {PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  billing={billing}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))} */}
            </div>
          </section>
        </main>
      </div>
      <AddPlanDialog
        isOpen={isModalOpen}
        onAdd={createPlan}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
