"use client";
import React from "react";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

interface VerificationFailedContentProps {
  errorMessage: string;
}

const InvitationFailureTemplate = ({
  errorMessage,
}: VerificationFailedContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      {/* Background decorative elements - retained for consistent aesthetic */}
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
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-red-400">
              Verification Failed!
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              There is a problem join to the workspace.
              <br /> {errorMessage}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default InvitationFailureTemplate;
