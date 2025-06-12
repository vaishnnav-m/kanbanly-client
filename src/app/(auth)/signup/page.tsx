"use client";
import SignupTemplate from "@/componets/templates/SignupTemplate";
import { SignupPayload } from "@/lib/api/auth/auth.types";
import { useSignup } from "@/lib/hooks/useAuth";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SignupPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/workspaces");
    }
  }, [isAuthenticated, router]);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPass?: string;
  }>({});

  const { mutate: signupUser, isPending } = useSignup();

  const validate = (values: SignupPayload) => {
    const newErrors: typeof errors = {};

    if (!values?.firstName?.trim()) {
      newErrors.firstName = "First Name is required.";
    }

    if (!values?.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!values?.password?.trim()) {
      newErrors.password = "Password is required.";
    } else if (values.password?.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!values?.confirmPass) {
      newErrors.confirmPass = "Confirm Password is required.";
    } else if (values.password !== values.confirmPass) {
      newErrors.confirmPass = "Passwords do not match.";
    }

    if (values?.phone && !/^\d{10}$/.test(values.phone)) {
      newErrors.phone = "Phone number is invalid (must be 10 digits).";
    }

    return newErrors;
  };

  const handleSignup = (values: SignupPayload) => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const { confirmPass, ...dataToSend } = values;
      signupUser(dataToSend);
    }
  };

  return (
    <main>
      <SignupTemplate
        handleSignup={handleSignup}
        isLoading={isPending}
        errorMessages={errors}
      />
    </main>
  );
};

export default SignupPage;
