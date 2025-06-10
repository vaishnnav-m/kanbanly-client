"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../atoms/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "../atoms/button";
import Link from "next/link";

const EmailSuccessTemplate = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            {/* Green checkmark for success */}
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-green-400">
              Email Verified Successfully!
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Your email address has been successfully verified.
              <br /> You can now access all features of your account.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-log text-center">
          {/* Button to navigate to workspaces or login */}
          <Link href="/workspaces" passHref>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-md transition-all duration-300">
              Go to Workspaces
            </Button>
          </Link>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              If you are not automatically redirected, please
              <br />
              <Link href="/login" passHref>
                <Button variant="link" className="p-0 h-auto text-xs text-primary">
                  log in here
                </Button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmailSuccessTemplate;