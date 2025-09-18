"use client";
import { motion } from "framer-motion";
import { CheckCircle, LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../atoms/card";
import { Button } from "../../atoms/button";
import { useGetAllPlans } from "@/lib/hooks/usePlan";
import { useState } from "react";
import { Switch } from "@/components/atoms/switch";
import { checkoutCreationPayload } from "@/lib/api/subscription/subscription.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PricingSectionProps {
  buttonLabel: string;
  onPlanSelection: (data: checkoutCreationPayload) => void;
  isLoading: boolean;
}

const PricingSection = ({
  buttonLabel,
  onPlanSelection,
  isLoading,
}: PricingSectionProps) => {
  const { data: plansData } = useGetAllPlans();
  const [billing, setBilling] = useState("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState("");

  const currentPlan = useSelector(
    (state: RootState) => state.subscription.planName
  );

  const plans = plansData ? plansData.data : [];
  function handleBillingCycle() {
    setBilling((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  }

  const handlePlanSelection = (planId: string) => {
    setSelectedPlanId(planId);
    onPlanSelection({ billingCycle: billing, planId });
  };

  return (
    <section id="pricing" className="pt-16 md:pt-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto">
            Choose the plan that’s right for you and your team. No hidden fees.
          </p>
          <div className="flex gap-3 mt-3 justify-center">
            <span>monthly</span>
            <Switch
              checked={billing === "yearly"}
              onCheckedChange={handleBillingCycle}
              className="data-[state=checked]:bg-input"
            />
            <span>yearly</span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {plans &&
            plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
              >
                <Card
                  className={`h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    plan.name.toLowerCase() === "professional"
                      ? "border-2 border-primary ring-4 ring-primary/20"
                      : "border-border"
                  }`}
                >
                  {plan.name.toLowerCase() === "professional" && (
                    <div className="bg-primary text-primary-foreground text-sm font-semibold py-1 px-4 rounded-t-md -mb-px text-center w-fit mx-auto relative -top-3">
                      Recommended
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold flex gap-2 items-center justify-center">
                      {plan.name}
                      {plan.name == currentPlan && (
                        <span className="text-sm font-normal text-white/40 mt-2">
                          (Current Plan)
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-4xl font-bold my-2">
                      &#8377;
                      {billing === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                      <span className="text-base font-normal text-foreground/60">
                        {billing === "monthly" ? "/mo" : "/yr"}
                      </span>
                    </p>
                    <CardDescription className="text-foreground/70">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-foreground/80">
                          {plan.workspaceLimit} Workspaces
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-foreground/80">
                          {plan.projectLimit} Projects
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-foreground/80">
                          {plan.taskLimit} Tasks
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-foreground/80">
                          {plan.memberLimit} Members
                        </span>
                      </li>
                      {plan.features &&
                        plan?.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-foreground/80">
                              {feature}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button
                      onClick={() => handlePlanSelection(plan.planId)}
                      size="lg"
                      className={`w-full text-lg ${
                        plan.name.toLowerCase() === "professional"
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "border-primary text-primary hover:bg-primary/10"
                      }`}
                      variant={
                        plan.name.toLowerCase() === "professional"
                          ? "default"
                          : "outline"
                      }
                      disabled={currentPlan == plan.name || isLoading}
                    >
                      {isLoading && selectedPlanId === plan.planId ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        buttonLabel
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
