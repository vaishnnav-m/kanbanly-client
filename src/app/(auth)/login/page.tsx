"use client";
import LoginTemplate from "@/componets/templates/LoginTemplate";
import { SignupPayload } from "@/lib/api/auth/auth.types";
import { useSignup } from "@/lib/hooks/useAuth";
import React from "react";

const LoginPage = () => {
  const { mutate: signupUser, isPending, error } = useSignup();
  const handleSignup = (values: SignupPayload) => {
    signupUser(values);
  };
  return (
    <main>
      <LoginTemplate
        handleSignup={handleSignup}
        isLoading={isPending}
        errorMessage={error?.message}
      />
    </main>
  );
};

export default LoginPage;
