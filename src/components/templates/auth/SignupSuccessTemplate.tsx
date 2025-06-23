"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../atoms/card";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "../../atoms/button";

const SignupSuccessTemplate = () => {
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
            <Mail className="w-8 h-8 text-primary" /> {/* Mail icon */}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Please Verify Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We've sent a verification link to your email
              <br />
              Please click the link in the email to activate your account.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-log">
          {/* Removed the email input and resend button/timer */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or
              <br />
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-primary"
                // You might want to link this to a support page or contact form
                onClick={() =>
                  alert(
                    "Redirect to contact support page or open a support modal"
                  )
                } // Placeholder for contact support action
              >
                contact support
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignupSuccessTemplate;
