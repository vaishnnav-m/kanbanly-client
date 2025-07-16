import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Form from "@/components/organisms/Form";
import { FieldConfig } from "@/types/form.types";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface PasswordResetPayload {
  password: string;
  confirmPassword: string;
}

interface ForgotPasswordTemplateProps {
  handlePasswordReset: (values: PasswordResetPayload) => void;
  isLoading: boolean;
  errorMessages?: Record<string, string>;
}

function ForgotPasswordTemplate({
  handlePasswordReset,
  isLoading,
  errorMessages,
}: ForgotPasswordTemplateProps) {
  const router = useRouter();
  const className =
    "h-12 border-primary bg-input focus:ring-2 focus:ring-primary transition-all duration-200";

  const passwordResetFields: FieldConfig[] = [
    {
      id: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      className,
      required: true,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      type: "password",
      className,
      required: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl float-animation"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-48 h-48 bg-primary/15 rounded-full blur-2xl float-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section with icon and main title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 pulse-glow">
            <Lock className="w-8 h-8 text-white" /> {/* Lock icon */}
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Set Your New Password
          </h1>
          <p className="text-white/80 text-lg">
            Please enter and confirm your new password.
          </p>
        </div>

        {/* Password Reset Card */}
        <Card className="backdrop-blur-lg bg-[#273444] border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-2xl text-white">
              Reset Password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your desired new password below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 bg-log">
            {/* Password Reset Form */}
            <Form<PasswordResetPayload>
              submitLabel="Reset Password"
              isLoading={isLoading}
              fields={passwordResetFields} 
              onSubmit={handlePasswordReset}
              errors={errorMessages} 
            />

            {/* Link to go back to login */}
            <div className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <button
                onClick={() => router.push("/login")} 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Back to Login
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Privacy Policy links */}
        <div className="text-center mt-8 text-white/60 text-sm">
          By using this service, you agree to our{" "}
          <button className="text-white hover:text-white/80 underline transition-colors">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-white hover:text-white/80 underline transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordTemplate;
