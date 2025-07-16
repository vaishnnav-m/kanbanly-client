"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../../atoms/button";
import Form from "../../organisms/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../atoms/card";
import { FieldConfig } from "@/types/form.types";
import { LoginPayload } from "@/lib/api/auth/auth.types";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface LoginTemplateProps {
  handleLogin: (values: LoginPayload) => void;
  handleGoogleLogin: () => void;
  isLoading: boolean;
  errorMessage?: string;
}

const LoginTemplate = ({
  handleGoogleLogin,
  handleLogin,
  isLoading,
}: LoginTemplateProps) => {
  const router = useRouter();

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
      onLink: () => router.push("/forgot-password"),
    },
  ];

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

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 pulse-glow">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-white/80 text-lg">login to your account</p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-lg bg-[#273444] border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-2xl text white">Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 bg-log ">
            {/* signup form */}
            <Form<LoginPayload>
              submitLabel="Login"
              isLoading={isLoading}
              fields={loginFields}
              onSubmit={handleLogin}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1  gap-4"
            >
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
              {/* <Button
                variant="outline"
                className="h-12 bg-transparent border-primary border-2 hover:bg-primary hover:text-accent-foreground hover:border-accent transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </Button> */}
            </motion.div>

            <div className="text-center text-sm text-muted-foreground">
              don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up here
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

export default LoginTemplate;
