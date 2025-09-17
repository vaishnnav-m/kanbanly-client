"use client";
import PricingPageTemplate from "@/components/templates/billing/PricingPageTemplate";
import { checkoutCreationPayload } from "@/lib/api/subscription/subscription.types";
import { useCreateCheckout } from "@/lib/hooks/useSubscription";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function PricingPage() {
  const toast = useToastMessage();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createCheckout, isPending } = useCreateCheckout({
    onSuccess: (response) => {
      if (!response.data) {
        toast.showError({
          title: "Status Updation Failed",
          description: "Please select the plan again",
          duration: 6000,
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["getUserSubscription"] });

      if (!response.data.url) {
        router.push("/workspaces");
        return;
      }
      window.location.href = response.data.url;
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Plan Selection Error",
        description: errorMessage,
        duration: 6000,
      });
    },
  });

  function handlePlanSelection(data: checkoutCreationPayload) {
    createCheckout(data);
  }

  return (
    <>
      <PricingPageTemplate
        onPlanSelection={handlePlanSelection}
        isLoading={isPending}
      />
    </>
  );
}

export default PricingPage;
