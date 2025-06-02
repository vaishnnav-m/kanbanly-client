"use client";
import LoginTemplate from "@/componets/templates/LoginTemplate";
import { LoginPayload } from "@/lib/api/auth/auth.types";
import { useLogin } from "@/lib/hooks/useAuth";
import React from "react";

const LoginPage = () => {
  const { mutate: loginUser, isPending, error } = useLogin();
  const handleSignup = (values: LoginPayload) => {
    loginUser(values);
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
