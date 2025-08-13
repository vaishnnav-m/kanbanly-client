"use client";
import { Button } from "@/components/atoms/button";
import { AddPlanDialog } from "@/components/organisms/admin/AdminPlansCreationModal";
import {
  BillingCycle,
  Plan,
  PlanCard,
} from "@/components/organisms/admin/PlanCard";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    priceMonthly: 9,
    priceYearly: 90,
    description: "Essential tools to get started",
    features: ["1 project", "Community support", "Basic analytics"],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 290,
    description: "Advanced features for growing teams",
    features: ["Unlimited projects", "Priority support", "Advanced analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 99,
    priceYearly: 990,
    description: "Custom solutions at scale",
    features: ["Dedicated manager", "SLA", "Custom integrations"],
  },
];

export const AdminPlansTemplate = () => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (data:any) => {
    console.log(data);
  };
  const handleEdit = (id: string) => {};
  const handleDelete = (id: string) => {};

  return (
    <div className="min-h-screen flex w-full bg-background">
      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Plans</h1>
            <Button variant="outline" className="hover:bg-gray-500/20" onClick={() => setIsModalOpen(true)}><Plus/> Add Plan</Button>
          </div>
          <section className="w-full p-3 md:p-6 lg:py-8 lg:px-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
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
        onAdd={handleAdd}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
