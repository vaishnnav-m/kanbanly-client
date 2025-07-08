"use client";

import { BaseModal } from "@/components/molecules/BaseModal";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}: ConfirmationModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      text=""
      footer={
        <div className="flex justify-center gap-4 px-4 py-2">
          <button
            className="w-full rounded-md border border-input px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/40 transition"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`w-full rounded-md px-6 py-2 text-sm font-medium text-white shadow transition ${
              isDestructive
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center gap-4 px-6 py-4">
        <div
          className={`rounded-full p-2 ${
            isDestructive
              ? "bg-destructive/20 text-destructive"
              : "bg-primary/20 text-primary"
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </div>
    </BaseModal>
  );
};
