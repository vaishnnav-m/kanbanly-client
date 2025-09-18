"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseModal } from "@/components/molecules/BaseModal";
import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Infinity } from "lucide-react";
import { TagInput } from "@/components/molecules/TagInput";
import { IPlan, PlanCreationPayload } from "@/lib/api/plans/plans.type";
import { Textarea } from "@/components/atoms/textarea";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().min(1, "Description is required"),
  monthlyPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ invalid_type_error: "Price must be a number" })
      .nonnegative("Price must be 0 or greater")
  ),
  yearlyPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ invalid_type_error: "Price must be a number" })
      .nonnegative("Price must be 0 or greater")
  ),
  workspaceLimit: z.string().default("Unlimited"),
  memberLimit: z.string().default("Unlimited"),
  projectLimit: z.string().default("Unlimited"),
  taskLimit: z.string().default("Unlimited"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).optional(),
});

// type PlanFormInput = Omit<
//   z.infer<typeof formSchema>,
//   "monthlyPrice" | "yearlyPrice"
// > & {
//   monthlyPrice: string | number;
//   yearlyPrice: string | number;
// };

export function AddPlanDialog({
  onAdd,
  isOpen,
  onClose,
  plan,
  onEdit,
}: {
  onAdd: (plan: PlanCreationPayload) => void;
  isOpen: boolean;
  onClose: () => void;
  plan: IPlan | null;
  onEdit: (plan: Partial<PlanCreationPayload>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      yearlyPrice: undefined,
      monthlyPrice: undefined,
      workspaceLimit: "Unlimited",
      memberLimit: "Unlimited",
      projectLimit: "Unlimited",
      taskLimit: "Unlimited",
      features: [],
    },
  });

  const { dirtyFields } = form.formState;

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description,
        yearlyPrice: plan.yearlyPrice,
        monthlyPrice: plan.monthlyPrice,
        workspaceLimit: plan.workspaceLimit,
        memberLimit: plan.memberLimit,
        projectLimit: plan.projectLimit,
        taskLimit: plan.taskLimit,
        features: plan.features,
      });
    }
  }, [plan, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (plan) {
      const dirtyKeys = Object.keys(dirtyFields) as Array<keyof typeof values>;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editValues = dirtyKeys.reduce((result: any, key) => {
        result[key] = values[key];
        return result;
      }, {} as Partial<PlanCreationPayload>);

      onEdit(editValues);
    } else {
      onAdd(values);
    }
    onClose();
  }

  const UnlimitedField = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
  }) => {
    const handleInfinityClick = () => {
      onChange(value === "Unlimited" ? "" : "Unlimited");
    };

    return (
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent px-5 py-5"
        />
        <button
          type="button"
          onClick={handleInfinityClick}
          className="absolute inset-y-0 right-0 flex items-center px-3 hover:bg-zinc-800 rounded-r-md transition-colors"
        >
          <Infinity
            className={`h-4 w-4 ${
              value === "Unlimited" ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>
    );
  };

  // const options = [
  //   {
  //     title: "Kanban Board",
  //     value: "kanban",
  //   },
  //   {
  //     title: "Agile Workflow",
  //     value: "agile",
  //   },
  // ];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={plan ? "Edit the plan" : "Create New Plan"}
      text=""
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-h-[70vh] overflow-y-auto hide-scrollbar"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Plan name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent px-5 py-5"
                    placeholder="Professional"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Descripiton <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-transparent px-5 py-5"
                    placeholder="Type anything about this plan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="monthlyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Monthly Price <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent px-5 py-5"
                      placeholder="$14"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearlyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Yearly Price <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent px-5 py-5"
                      placeholder="$100"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="workspaceLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Minimum Workspaces <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <UnlimitedField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Unlimited"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memberLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Members Limit <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <UnlimitedField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Unlimited"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Minimum Projects <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <UnlimitedField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Unlimited"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taskLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Minimum Tasks <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <UnlimitedField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Unlimited"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  features
                </FormLabel>
                <FormControl>
                  <TagInput
                    className="border border-input focus-within:border-ring p-5"
                    onTagsChange={field.onChange}
                    value={field.value}
                  />
                  {/* <MultiSelect options={options} value={field.value}/> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              className="hover:bg-zinc-800 bg-transparent"
              type="button"
              variant="outline"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type="submit">{plan ? "Edit" : "Add"}</Button>
          </div>
        </form>
      </Form>
    </BaseModal>
  );
}
