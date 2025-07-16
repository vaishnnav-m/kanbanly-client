"use client";
import ResetPasswordTemplate from "@/components/templates/auth/ResetPasswordTemplate";
import { useResetPassword } from "@/lib/hooks/useAuth";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function page() {
  const { mutate: resetPassword } = useResetPassword();
  const [error, setError] = useState<Record<string, string>>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToastMessage();

  if (!token) {
    router.replace("/login");
    return;
  }

  function handlePasswordReset({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) {
    if (password?.trim()) {
      setError({ password: "Password is required." });
    } else if (password?.trim().length < 6) {
      setError({ password: "Password must be at least 6 characters long." });
    }

    if (!confirmPassword) {
      setError({ confirmPassword: "Confirm Password is required." });
    } else if (password !== confirmPassword) {
      setError({ confirmPassword: "Passwords do not match." });
    }
    if (!token) {
      toast.showError({
        title: "Error in Login",
        description: "token is required!",
        duration: 6000,
      });
      return;
    }
    setError({});
    resetPassword({ password, token });
  }

  return (
    <ResetPasswordTemplate
      handlePasswordReset={handlePasswordReset}
      isLoading={false}
      errorMessages={error}
    />
  );
}

export default page;
