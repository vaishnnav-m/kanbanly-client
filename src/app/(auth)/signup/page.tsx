"use client";
import SignupTemplate from "@/componets/templates/SignupTemplate";
import { SignupPayload } from "@/lib/api/auth/auth.types";
import { useSignup } from "@/lib/hooks/useAuth";
import { setCredentials } from "@/store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SignupPage = () => {
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPass?: string;
  }>({});

  const { mutate: signupUser, isPending, data } = useSignup();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      const { isEmailVerified, ...user } = data?.data;
      
      localStorage.setItem("isEmailVerified", isEmailVerified.toString());
      localStorage.setItem("isAuthenticated", "true");

      dispatch(
        setCredentials({
          isEmailVerified,
          isAuthenticated: true,
          user,
        })
      );
    }
  }, [data]);

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
