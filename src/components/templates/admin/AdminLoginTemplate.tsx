"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../atoms/card";
import Form from "../../organisms/Form";
import { LoginPayload } from "@/lib/api/auth/auth.types";
import { FieldConfig } from "@/types/form.types";
import Link from "next/link";
import { LogIn } from "lucide-react";

interface AdminLoginTemplateProps {
  handleLogin: (data: LoginPayload) => void;
  isLoading: boolean;
}

function AdminLoginTemplate({
  handleLogin,
  isLoading,
}: AdminLoginTemplateProps) {
  const className =
    "h-12 border-primary bg-input focus:ring-2 focus:ring-primary transition-all duration-200";

  const loginFields: FieldConfig[] = [
    {
      id: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      className,
      required: true,
    },
    {
      id: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      className:
        "h-12 pr-12 bg-input border-primary focus:ring-2 focus:ring-primary transition-all duration-200",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 pulse-glow">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Admin Access
          </h1>
          <p className="text-white/80 text-lg">
            Sign in to the admin dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-lg bg-[#273444] border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Use your admin credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 bg-log">
            {/* login form */}
            <Form<LoginPayload>
              submitLabel="Sign In"
              isLoading={isLoading}
              fields={loginFields}
              onSubmit={handleLogin}
            />
            {/* Security Notice */}
            <div className="text-center">
              <p className="text-white/60 text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                🔒 This is a secure admin area. All activities are monitored and
                logged.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-white/60 text-sm">
          By signing in, you agree to our{" "}
          <Link
            href="/terms"
            className="text-white hover:text-white/80 underline transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-white hover:text-white/80 underline transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginTemplate;
