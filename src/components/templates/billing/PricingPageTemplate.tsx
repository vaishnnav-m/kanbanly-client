import Logo from "@/components/atoms/logo";
import { ThemeToggleButton } from "@/components/molecules/ThemeToggleButton";
import PricingSection from "@/components/organisms/landing-page/PricingSection";
import { checkoutCreationPayload } from "@/lib/api/subscription/subscription.types";

interface PricingPageTemplate {
  onPlanSelection: (data: checkoutCreationPayload) => void;
  isLoading:boolean
}

function PricingPageTemplate({ onPlanSelection,isLoading }: PricingPageTemplate) {
  return (
    <>
      <header className="w-full h-16 px-5 shadow-lg flex items-center justify-between">
        <Logo />
        <ThemeToggleButton />
      </header>
      <main>
        <PricingSection
          onPlanSelection={onPlanSelection}
          buttonLabel="Upgrade Plan"
          isLoading={isLoading}
        />
      </main>
    </>
  );
}

export default PricingPageTemplate;
