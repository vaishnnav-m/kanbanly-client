"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../atoms/card";
import { motion } from "framer-motion";
import { RefreshCw, Shield } from "lucide-react";
import Form from "../organisms/Form";
import { FieldConfig } from "@/types/form";
import { Button } from "../atoms/button";

const otpFields: FieldConfig[] = [{ id: "otpCode", type: "otp", otpLength: 6 }];

interface VerifyOtpTemplateProps {
  handleOtp: (values: { otpCode: string }) => void;
  handleResendOTP: () => void;
  isSubmitLoading: boolean;
  isResendLoading: boolean;
  errorMessage?: string;
}

const VerifyOtpTemplate = ({
  handleOtp,
  handleResendOTP,
  isSubmitLoading,
  isResendLoading,
  errorMessage,
}: VerifyOtpTemplateProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // decreasing timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // to format the time to show seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
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
      <Card className="backdrop-blur-lg bg-[#273444] border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Verify Your Identity
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-medium text-foreground">
                +1 (555) 123-4567
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-log ">
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in{" "}
                <span className="font-medium text-primary">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <Button
                onClick={handleResendOTP}
                className="bg-transparent hover:bg-transparent text-primary p-0 h-auto font-medium"
                disabled={!canResend}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Code
              </Button>
            )}
          </div>
          <Form<{ otpCode: string }>
            submitLabel="Signup"
            isLoading={isSubmitLoading}
            fields={otpFields}
            onSubmit={handleOtp}
          />
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Didn't receive the code? Check your spam folder or
              <br />
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-primary"
              >
                try a different email
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VerifyOtpTemplate;
