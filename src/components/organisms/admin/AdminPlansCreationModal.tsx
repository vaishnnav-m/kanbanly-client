"use client"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plan } from "./PlanCard";
import { FieldConfig } from "@/types/form.types";
import Form from "../Form";
import { BaseModal } from "@/components/molecules/BaseModal";

const PlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  priceMonthly: z.coerce.number().min(0, "Monthly price must be >= 0"),
  priceYearly: z.coerce.number().min(0, "Yearly price must be >= 0"),
  description: z.string().optional().default(""),
  features: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof PlanSchema>;
  
export function AddPlanDialog({
  onAdd,
  isOpen,
  onClose,
}: {
  onAdd: (plan: Plan) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      name: "",
      priceMonthly: 0,
      priceYearly: 0,
      description: "",
      features: [],
    },
  });

  const className =
    "h-12 border-primary bg-transparent focus:ring-2 focus:ring-primary transition-all duration-200";

  const formFields: FieldConfig[] = [
    {
      id: "name",
      label: "Name",
      placeholder: "Proffosional",
      type: "email",
      className,
      required: true,
    },
    {
      group: [
        {
          id: "priceMonthly",
          type: "number",
          label: "Price (Monthly)",
          className,
        },
        {
          id: "priceYearly",
          type: "number",
          label: "Price (Yearly)",
          className,
        },
      ],
    },
    {
      id: "description",
      label: "Description",
      placeholder: "Short description",
      type: "textarea",
      className,
      required: true,
    },
    {
      id: "features",
      label: "Features",
      placeholder: "Add the features and press enter or comma",
      tagsField: true,
      className,
      required: true,
    },
  ];

  const onSubmit = (values: FormValues) => {
    const features = Array.from(
      new Set((values.features || []).map((s) => s.trim()).filter(Boolean))
    );

    const idBase = values.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const id = `${idBase || "plan"}-${Date.now().toString(36)}`;

    const newPlan: Plan = {
      id,
      name: values.name,
      priceMonthly: values.priceMonthly,
      priceYearly: values.priceYearly,
      description: values.description || "",
      features,
    };

    onAdd(newPlan);
    onClose();
    form.reset();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      text=""
      footer={
        <div className="w-full">
          <button
            className="w-full px-10 py-2 bg-gray-200 dark:bg-transparent dark:border rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      }
    >
      <Form
        fields={formFields}
        onSubmit={onSubmit}
        isLoading={false}
        submitLabel="Add"
      />
    </BaseModal>
  );
}
