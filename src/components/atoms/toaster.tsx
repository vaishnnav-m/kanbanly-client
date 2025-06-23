"use client";
import React from "react";
import { ToastItem } from "./toast";
import { useToastContext } from "@/providers/ToastProvider";

export const ToastContainer: React.FC = () => {
  const { toasts } = useToastContext();

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {toasts.map((toast, index) => (
        <ToastItem key={toast.id} toast={toast} index={index} />
      ))}
    </div>
  );
};
