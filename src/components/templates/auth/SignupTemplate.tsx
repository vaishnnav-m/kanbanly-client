"use client";
import Link from "next/link";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/button";
import Form from "../../organisms/Form";
import { Card, CardContent } from "../../atoms/card";
import { FieldConfig } from "@/types/form.types";
import { SignupPayload } from "@/lib/api/auth/auth.types";
import Image from "next/image";
import { Camera, User } from "lucide-react";

interface SignupTemplateProps {
  handleGoogleLogin: () => void;
  handleSignup: (values: SignupPayload) => void;
  isLoading: boolean;
  errorMessages?: Record<string, string>;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const className =
  "h-12 border-primary bg-input focus:ring-2 focus:ring-primary transition-all duration-200";

const signupFields: FieldConfig[] = [
  {
    group: [
      {
        id: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
        className,
      },
      {
        id: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
        className,
      },
    ],
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "text",
    className,
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    className:
      "h-12 pr-12 bg-input border-primary focus:ring-2 focus:ring-primary transition-all duration-200",
  },
  {
    id: "confirmPass",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
    className:
      "h-12 pr-12 bg-input border-primary focus:ring-2 focus:ring-primary transition-all duration-200",
  },
];

const SignupTemplate = ({
  handleGoogleLogin,
  handleSignup,
  isLoading,
  errorMessages,
  setSelectedFile,
}: SignupTemplateProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const imagePreviewUrl = URL.createObjectURL(file);

    setAvatarPreview(imagePreviewUrl);
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decorative elements */}
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

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome Aboard!
          </h1>
          <p className="text-white/80 text-lg">
            Create your account and boost productivity
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-lg bg-[#273444] border-0 shadow-2xl">
          <CardContent className="p-6 space-y-6 bg-log ">
            <div className="flex flex-col items-center gap-4 pb-4 border-b border-purple-500/20">
              <div className="relative group">
                <div className="h-28 w-28 rounded-full ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300 bg-purple-500/10 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <Image
                      width={100}
                      height={100}
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-purple-400" />
                  )}
                </div>

                <label
                  htmlFor="avatarInput"
                  className="absolute bottom-0 right-0 p-2.5 bg-purple-500 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-200 border-4 border-slate-800 transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Camera className="h-4 w-4 text-white" />
                </label>

                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-white">
                  {avatarPreview ? "Profile Photo" : "Add Profile Photo"}
                </p>
                <p className="text-xs text-white/60">
                  Click to upload (max 5MB)
                </p>
              </div>
            </div>
            {/* signup form */}
            <Form<SignupPayload>
              submitLabel="Signup"
              isLoading={isLoading}
              fields={signupFields}
              onSubmit={handleSignup}
              errors={errorMessages}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="h-12 bg-transparent border-primary hover:bg-primary hover:text-accent-foreground hover:border-accent transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-white/60 text-sm">
          By signing in, you agree to our{" "}
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
};

export default SignupTemplate;
