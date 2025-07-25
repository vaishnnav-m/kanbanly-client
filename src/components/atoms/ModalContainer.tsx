import { cn } from "@/lib/utils";
import React from "react";

interface ModalContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContainer = ({
  children,
  className = "",
}: ModalContainerProps) => (
  <div
    className={cn(
      "fixed z-[999] flex flex-col gap-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1C1C1C] rounded-xl shadow-xl max-w-lg w-full p-6",
      className
    )}
    role="dialog"
    aria-modal="true"
  >
    {children}
  </div>
);
