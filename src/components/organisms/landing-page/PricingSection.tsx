"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
import { useRouter } from "next/navigation";

const PricingSection = () => {
  const { data: plansData } = useGetAllPlans();
  const [billing, setBilling] = useState("monthly");
  const router = useRouter();

  const plans = plansData ? plansData.data : [];
  function handleBillingCycle() {
    setBilling((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold">
                      {plan.name}
                    </CardTitle>
                    <p className="text-4xl font-bold my-2">
                      {billing === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                      <span className="text-base font-normal text-foreground/60">
                        {billing === "monthly" ? "/mo" : "yr"}
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
                      onClick={() => router.push("/register")}
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
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
        <p className="text-center text-foreground/60 mt-12">
          Payment processing via Stripe/Razorpay will be available soon.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
