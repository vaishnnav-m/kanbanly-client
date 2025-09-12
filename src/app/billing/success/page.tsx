"use client";
import { useVerifyCheckoutSession } from "@/lib/hooks/useSubscription";
import { SubscriptionStatus } from "@/types/status.enum";
import { CheckCircle, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentSuccessPage = () => {
  const params = useSearchParams();
  const sessionId = params.get("session_id") as string;
  const { data } = useVerifyCheckoutSession(sessionId);
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState<SubscriptionStatus>(
    SubscriptionStatus.pending
  );

  useEffect(() => {
    if (data?.data) {
      setCurrentStatus(data?.data?.status);
    }
  }, [data]);

  const getStatusConfig = (status: SubscriptionStatus) => {
    switch (status) {
      case "loading":
        return {
          icon: <Loader2 className="w-16 h-16 animate-spin text-primary" />,
          title: "Verifying Payment",
          message: "Please wait while we confirm your payment...",
          bgGradient: "from-primary/10 to-blue-500/10",
          textColor: "text-primary",
        };
      case "active":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: "Payment Successful!",
          message:
            "Your subscription is now active. Redirecting you to the dashboard...",
          bgGradient: "from-green-500/10 to-emerald-500/10",
          textColor: "text-green-500",
        };
      case "pending":
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500" />,
          title: "Payment Processing",
          message:
            "Your payment is being processed. We'll send you a confirmation email shortly.",
          bgGradient: "from-yellow-500/10 to-orange-500/10",
          textColor: "text-yellow-500",
        };
      case "error":
        return {
          icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
          title: "Payment Verification Failed",
          message:
            "We couldn't verify your payment. Please contact our support team for assistance.",
          bgGradient: "from-red-500/10 to-pink-500/10",
          textColor: "text-red-500",
        };
      default:
        return {
          icon: <Loader2 className="w-16 h-16 animate-spin text-primary" />,
          title: "Processing",
          message: "Please wait...",
          bgGradient: "from-primary/10 to-blue-500/10",
          textColor: "text-primary",
        };
    }
  };

  const config = getStatusConfig(currentStatus);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Status indicator with gradient background */}
          <div
            className={`bg-gradient-to-br ${config.bgGradient} rounded-xl p-8 mb-6 text-center`}
          >
            <div className="flex justify-center mb-4">{config.icon}</div>

            <h1 className={`text-2xl font-bold mb-2 ${config.textColor}`}>
              {config.title}
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {config.message}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Payment Status</span>
              <span className="capitalize font-medium">{currentStatus}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentStatus === "loading"
                    ? "w-1/4 bg-primary animate-pulse"
                    : currentStatus === "pending"
                    ? "w-2/4 bg-yellow-500"
                    : currentStatus === "active"
                    ? "w-full bg-green-500"
                    : "w-1/4 bg-red-500"
                }`}
              ></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            {currentStatus === "active" && (
              <button
                onClick={() => router.replace("/workspaces")}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Continue to Dashboard
              </button>
            )}

            {currentStatus === "error" && (
              <>
                <button className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Contact Support
                </button>
                <button className="w-full bg-muted text-muted-foreground py-3 px-4 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                  Try Again
                </button>
              </>
            )}

            {(currentStatus === "pending" || currentStatus === "loading") && (
              <button className="w-full bg-muted text-muted-foreground py-3 px-4 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                Check Status Later
              </button>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Need help?{" "}
              <button className="text-primary hover:underline font-medium">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
