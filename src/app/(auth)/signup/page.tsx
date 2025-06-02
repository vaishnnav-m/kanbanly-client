"use client";
import SignupTemplate from "@/componets/templates/SignupTemplate";
import { SignupPayload } from "@/lib/api/auth/auth.types";
import { useSignup } from "@/lib/hooks/useAuth";
import React from "react";

const SignupPage = () => {
  const { mutate: signupUser, isPending, error } = useSignup();

  const handleSignup = (values: SignupPayload) => {
    signupUser(values);
  };

  return (
    <main>
      <SignupTemplate
        handleSignup={handleSignup}
        isLoading={isPending}
        errorMessage={error?.message}
      />
    </main>
  );
};

export default SignupPage;
