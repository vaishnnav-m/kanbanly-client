"use client";
import SignupTemplate from "@/components/templates/auth/SignupTemplate";
import { SignupPayload } from "@/lib/api/auth/auth.types";
import { useGoogleAuth, useSignup } from "@/lib/hooks/useAuth";
import { useGetSignature, useUploadPicture } from "@/lib/hooks/useCloudinary";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { RootState } from "@/store";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SignupPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
  const { mutate: googleAuth } = useGoogleAuth();
  const { data: cloudinaryResponse } = useGetSignature();
  const cloudinarySignature = cloudinaryResponse?.data;
  const { mutateAsync: uploadPicture } = useUploadPicture();

  const toast = useToastMessage();

  // google login logic
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const token = tokenResponse.access_token;
      googleAuth({ token });
    },
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  // form validation
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

  // signup logic
  const handleSignup = async (values: SignupPayload) => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      let secureUrl = "";
      setErrors({});
      if (selectedFile) {
        if (!cloudinarySignature) {
          toast.showError({
            title: "Uploading failed!",
            description:
              "Failed to fetch signature try again or contact support",
            duration: 6000,
          });
          return;
        }
        const { timeStamp, signature, apiKey, cloudName } = cloudinarySignature;
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timeStamp));
        formData.append("signature", signature);
        formData.append("folder", "avatars");

        const response = await uploadPicture({ cloudName, data: formData });
        if (response.secure_url) secureUrl = response.secure_url;
      }

      const dataToSend: SignupPayload = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.firstName,
        password: values.password,
        phone: values.phone,
        profile: secureUrl,
      };

      signupUser(dataToSend);
    }
  };

  return (
    <main>
      <SignupTemplate
        handleGoogleLogin={handleGoogleLogin}
        handleSignup={handleSignup}
        isLoading={isPending}
        errorMessages={errors}
        setSelectedFile={setSelectedFile}
      />
    </main>
  );
}
