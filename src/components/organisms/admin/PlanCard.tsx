"use client";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { IPlan } from "@/lib/api/plans/plans.type";
import { Check, Pencil, Trash2 } from "lucide-react";

export type BillingCycle = "monthly" | "yearly";

interface PlanCardProps {
  plan: IPlan;
  billing: BillingCycle;
  onEdit: (plan: IPlan) => void;
  onDelete: (id: string) => void;
}

export function PlanCard({ plan, billing, onEdit, onDelete }: PlanCardProps) {
  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const suffix = billing === "monthly" ? "/mo" : "/yr";

  return (
    <Card className="group transition-transform duration-200 hover:-translate-y-0.5 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>{plan.name}</span>
          <span className="text-2xl font-semibold">
            ₹{price}
            <span className="ml-1 text-sm text-muted-foreground">{suffix}</span>
          </span>
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>{plan.workspaceLimit} Workspaces</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>{plan.memberLimit} Members</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>{plan.projectLimit} Projects</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>{plan.taskLimit} Tasks</span>
          </li>

          {plan.features &&
            plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => onEdit(plan)}
          aria-label={`Edit ${plan.name}`}
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(plan.planId)}
          aria-label={`Delete ${plan.name}`}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
