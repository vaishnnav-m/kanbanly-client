"use client";
import ForgotPasswordTemplate from "@/components/templates/auth/ForgotPasswordTemplate";
import { useForgotPassword } from "@/lib/hooks/useAuth";
import React, { useState } from "react";

function page() {
  const [error, setError] = useState<Record<string, string>>();
  const { mutate: sendForgotPassword, isPending: isLoading } =
    useForgotPassword();

  function handleSubmit({ email }: { email: string }) {
    if (!email) {
      setError({ email: "Email is required." });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({ email: "Email address is invalid." });
    }
    setError({});

    sendForgotPassword({ email });
  }

  return (
    <ForgotPasswordTemplate
      handleForgotPassword={handleSubmit}
      isLoading={isLoading}
      errorMessages={error}
    />
  );
}

export default page;
