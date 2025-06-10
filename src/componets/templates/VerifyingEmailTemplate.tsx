"use client";
import React from "react";
import { Smartphone, Radio } from "lucide-react";

const VerifyingEmailLoader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-4 py-8">
      {/* Animated phone with signal waves */}
      <div className="relative">
        {/* Signal waves */}
        <div className="absolute -top-2 -right-2">
          <Radio className="w-4 h-4 text-primary animate-pulse" />
        </div>

        {/* Pulsing rings around phone */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-2 border-accent/40 animate-ping animation-delay-75"></div>
          <div className="absolute inset-4 rounded-full border-2 border-primary/20 animate-ping animation-delay-150"></div>
        </div>

        {/* Phone icon */}
        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg animate-pulse">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Loading text with animated dots */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Verifying Email
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-muted-foreground">Please wait</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default VerifyingEmailLoader;
